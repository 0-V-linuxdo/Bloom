// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.24
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, Recents status, wider thread, message times, streamer blur, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
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
// @grant        GM_notification
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

/* Bloom++ [20260919] v1.4.24. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var us=Object.defineProperty;var fs=(e,t)=>{for(var n in t)us(e,n,{get:t[n],enumerable:!0})};var br={};fs(br,{REPO_URL:()=>Ur,Settings:()=>f,VERSION:()=>P,hasLateIslands:()=>me,init:()=>hr,initSettings:()=>gr,isDocumentInteractive:()=>Vr,plugins:()=>j,requestChromeReady:()=>gn,requestIdleReady:()=>Ae,requestShellReady:()=>pn,whenChromeReady:()=>mn,whenIdleReady:()=>fn,whenShellReady:()=>un});var ee=new Map,en=!1;function ms(){return document.getElementById("bloom-root")?.shadowRoot??null}function ps(){return document.head??null}function ke(){let e=ms();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=gs()}function fo(e,t){if(!en)return;let n=ps();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),ke();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,ke();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,ke()}function x(e,t){let n=ee.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},ee.set(e,n)),en&&fo(e,n)}function yr(){en=!0;for(let[e,t]of ee)fo(e,t);return ke(),!0}function vr(e){let t=ee.get(e);t&&(t.disabled=!1,en&&fo(e,t))}function xr(e){let t=ee.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),ke())}function w(e){let t=ee.get(e);t&&(t.el?.remove(),ee.delete(e),ke())}function gs(){return Array.from(ee.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var E=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function g(e){return e}var mo=new Map;function tn(e,t){let n=mo.get(e);return n||(n=new Set,mo.set(e,n)),n.add(t),()=>n.delete(t)}function fe(e,t){let n=mo.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var hs="bloompp";function wr(){return new Promise((e,t)=>{let n=indexedDB.open(hs,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Er(e){try{let t=await wr();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Sr(e,t){try{let n=await wr();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function ut(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function nn(e,t,n){return Math.min(n,Math.max(t,e))}function Lr(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Tr(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function Cr(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var on=new E("SettingsStore"),te="BloomSettings",bs=100;function an(e){if(ut(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(ut(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return ut(n)?n:null}return null}catch{return null}}var rn=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,d]of this.defaultGetters)if(l.startsWith(c)){let u=l.slice(c.length+1);if(u&&!u.includes(".")){let p=d(u);p!==void 0&&(i[a]=p,s=p);break}}}return ut(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){on.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},bs))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(te,this.plain)}catch{try{GM_setValue(te,t)}catch(n){on.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(te,t)}catch{}Sr(te,t).catch(n=>on.warn("Failed to save settings to IndexedDB:",n))}catch(t){on.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Lr(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var ys=new E("Settings"),vs={plugins:{}},f=new rn(structuredClone(vs)),xs=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function ws(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function y(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(f.store.plugins[n]||(f.store.plugins[n]={}),f.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?f.plain.plugins[n]??{}:{}}};return t}function Es(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function kr(){let e=null;if(e=an(Es(te)),e||(e=an(await Er(te))),!e)try{e=an(localStorage.getItem(te))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(f.plain.plugins=t),ys.debug("Loaded settings")}}function Mr(e,t){t&&(t.pluginName=e,f.plain.plugins[e]||(f.plain.plugins[e]={}),f.setDefaultGetter(xs(e),n=>{if(n!=="enabled")return ws(t.def,n)}))}function Ar(){return f.plain.plugins.Settings||(f.store.plugins.Settings={}),f.store.plugins.Settings}function sn(){return Ar().pinnedPlugins??[]}function Rr(e){return sn().includes(e)}function Pr(e){let t=sn(),n=t.includes(e);return f.store.plugins.Settings={...f.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function ln(){return Ar().starredPlugins??[]}function Hr(e){return ln().includes(e)}function Nr(e){let t=ln(),n=t.includes(e);return f.store.plugins.Settings={...f.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var cn=new E("PluginManager"),j={},ft=new Set;function Br(e){if(j[e.name]){cn.warn("Duplicate plugin",e.name);return}j[e.name]=e,Mr(e.name,e.settings)}function Me(e){let t=j[e];if(!t)return!1;if(t.required)return!0;let n=f.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Dr(e){let t=j[e];if(!t||t.required)return;let n=!Me(e);f.plain.plugins[e]||(f.store.plugins[e]={}),f.store.plugins[e].enabled=n,n?_r(t):Ss(t),fe("pluginToggle",{name:e,enabled:n})}function _r(e,t=!1){if(!ft.has(e.name)&&Me(e.name))try{e.managedStyle&&vr(e.managedStyle),e.start?.(),ft.add(e.name),e.settings&&f.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ft.has(e.name)&&e.onSettingsChange?.()}),t||cn.debug("Started",e.name)}catch(n){cn.error("Failed to start",e.name,n)}}function Ss(e){if(ft.has(e.name)){try{e.stop?.()}catch(t){cn.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(xr(e.managedStyle),w(e.managedStyle)),ft.delete(e.name)}}function mt(e){for(let t of Object.values(j))(t.startAt??"DOMContentLoaded")===e&&_r(t)}var Ir=2,Or="defaultsRev";function qr(){for(let t of Object.values(j))f.plain.plugins[t.name]||(f.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=f.store.plugins.Settings??(f.store.plugins.Settings={});if(e[Or]!==Ir){for(let t of["NoShareLink","NoDictation"]){let n=f.store.plugins[t]??(f.store.plugins[t]={});n.enabled=!1}e[Or]=Ir}}var pt=!1,dn=!1,po=!1,$r=[],Fr=[],Gr=[];function go(e){let t=e.splice(0);for(let n of t)n()}function gt(){pt||(pt=!0,go($r))}function ho(){dn||(dn=!0,pt||gt(),go(Fr))}function zr(){po||(po=!0,pt||gt(),dn||ho(),go(Gr))}function un(e){pt?e():$r.push(e)}function fn(e){dn?e():Fr.push(e)}function mn(e){po?e():Gr.push(e)}function pn(){gt()}function Ae(){gt(),ho()}function gn(){zr()}function jr(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Kr(){await jr(4e3),gt(),await jr(4e3),ho(),zr()}var b={p:"0-V-linuxdo"},P="[20260919] v1.4.24",Ur="https://github.com/0-V-linuxdo/Bloom";function Ls(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Ts(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function bo(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function me(){return bo()?Ls()||Ts():!1}function Vr(){return me()}var Cs=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Wr=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),ks=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Ms="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Pe(e){return e.id==="bloom-root"||!!e.closest(Ms)}function Yr(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function hn(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function yo(e){if(!(e instanceof HTMLElement)||!e.isConnected||Pe(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&hn(t)?!1:e.getClientRects().length>0}function Re(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function As(){let e=[];for(let t of document.querySelectorAll(Cs))!(t instanceof HTMLElement)||!t.isConnected||Pe(t)||e.push(t);return e}function bn(e){if(!e.isConnected||Pe(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function ht(){return As().filter(bn)[0]??null}function vo(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||Pe(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function xo(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!Pe(n)&&!Re(n)&&n.parentElement&&!Re(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!Re(o)&&!Pe(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!Re(o.parentElement))return o}return t}function Jr(){let e=document.querySelectorAll(Wr);for(let n of e)if(yo(n)&&!hn(n)&&Yr(n))return n;let t=document.querySelectorAll(ks);for(let n of t){if(!yo(n)||!Yr(n)||hn(n))continue;let o=n.querySelector(Wr);return yo(o)&&!hn(o)?o:n}return null}function Xr(){let e=ht();if(e){let t=xo(e),n=t.parentElement;if(n&&!Re(n))return n;if(!Re(t))return t}return vo()}function Zr(e){let t=ht();return t?e.composedPath().includes(t):!1}var Eo=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Rs={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#212121","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Ps(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Hs(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function wo(e){let t=Ps(e);return t?Hs(t)>.55?"light":"dark":null}function Ns(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=wo(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=wo(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=wo(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Qr(e){return e==="auto"?Ns():e}function Is(e){try{let t=getComputedStyle(document.documentElement);for(let n of Eo){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function ei(e,t,n){let o=Rs[t];if(n){Is(e);for(let r of Eo)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Eo)e.style.setProperty(r,o[r])}function ti(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var So=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
 * Colors follow chatgpt.com Settings (\`bg-token-bg-primary\`, shadow-long, inverted switch). */

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
  background: var(--sidebar-surface-primary, var(--main-surface-primary, transparent));
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
.bloom-settings-plugin[hidden],
#bloom-sidebar-panel[hidden] {
  display: none !important;
}

.bloom-settings-list,
.bloom-settings-plugin {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.bloom-settings-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0 0 6px;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.bloom-settings-mark {
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
  color: var(--icon-primary, inherit);
}

.bloom-settings-mark svg {
  width: 16px;
  height: 16px;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.bloom-settings-sub {
  margin: 0 0 6px;
  font-size: 0.75rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-section-head {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  margin: 0 0 8px;
}

.bloom-section-head h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary, inherit);
}

.bloom-section-head p {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.25rem;
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
  margin: 0 0 10px;
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
  margin: 0 0 10px;
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

.bloom-dialog-titles {
  min-width: 0;
  flex: 1;
}

.bloom-dialog-titles h2 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.bloom-dialog-titles p {
  margin: 2px 0 0;
  font-size: 0.75rem;
  color: var(--text-secondary, #5d5d5d);
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

.bloom-plugin-settings {
  display: flex;
  flex-direction: column;
  overflow: auto;
  min-height: 0;
  gap: 0.75rem;
}

.bloom-plugin-authors {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--text-secondary, #5d5d5d);
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
.bloom-field input[type="text"] {
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

.bloom-field.bloom-field-stack input[type="text"] {
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
`;var Bs="bloom-root",J="bloom-rail-item",En="bloom-account-item",Ie="bloom-sidebar-panel",Sn="bloom-settings-css",Ds=2e3,_s=y({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),xn=null,qs=null,He=!1,re=!1,Mo=[],yn=null,Ln=null,oe=null,wn=null,Y=null,Et=null,bt,Ne=0,St=0,yt=0,Rn=null,Pn=null,vt=null,Tn=null,Cn=null,$=null,xt=null,kn=null,ri=null,wt=null,Lo=[],js=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],$s=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Hn="",Lt="all",ie="all";function Nn(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ni(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Fs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Gs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function zs(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Ks(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Us={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Vs(e){return e.icon||Us[e.name]||Nn()}function Ws(){return"auto"}function To(){let e=Ws(),t=Qr(e);xn&&(xn.setAttribute("data-bloom-scheme",t),ei(xn,t,e==="auto")),fe("schemeChange",{scheme:t,pref:e})}function Tt(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function ii(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function ai(){if(x("settings",So),document.getElementById(Sn)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Sn,e.textContent=So,document.head.appendChild(e)}function Ys(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function si(){for(let e of Mo)e();Mo=[]}function li(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Js(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function Xs(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return Mo.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className=n.type===4||n.type===0?"bloom-field bloom-field-stack":"bloom-field";let r=document.createElement("span");r.className="bloom-field-label",r.textContent=n.description||t,o.appendChild(r);let i=f.store.plugins[e]??(f.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=li(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}if(n.type===0){let a=document.createElement("input");return a.type="text",a.value=String(i[t]??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}return o}function Po(){He=!1,si(),$&&$.replaceChildren(),Tt(Pn,!0),Tt(Rn,!1)}function Zs(e){if(si(),He=!0,Tn&&(Tn.textContent=e.name),Cn&&(Cn.textContent=e.description),$){if($.replaceChildren(),e.authors?.length){let t=document.createElement("p");t.className="bloom-plugin-authors",t.textContent=e.authors.join(", "),$.appendChild(t)}if(e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=Xs(e.name,t,n);o&&$.appendChild(o)}if(!$.querySelector(".bloom-field, .bloom-dialog-empty")){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",$.appendChild(t)}}Tt(Rn,!0),Tt(Pn,!1)}function Qs(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Vs(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Hr(e.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=zs(l),c.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();let h=Nr(e.name);fe("pluginStar",{name:e.name,starred:h})}),s.appendChild(c),!e.required){let m=Rr(e.name),h=document.createElement("button");h.type="button",h.className=`bloom-icon-btn bloom-card-pin${m?" bloom-card-pin-active":""}`,h.setAttribute("aria-label",m?"Unpin from top":"Pin to top"),h.innerHTML=Ks(m),h.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation();let U=Pr(e.name);fe("pluginPin",{name:e.name,pinned:U})}),s.appendChild(h)}if(Js(e)){let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn bloom-card-settings",m.setAttribute("aria-label",`${e.name} settings`),m.innerHTML=Gs(),m.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),Zs(e)}),s.appendChild(m)}let d=li(e.name,Me(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",m=>m.stopPropagation()),u?.addEventListener("change",()=>{Dr(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let m=document.createElement("div");m.className="bloom-card-desc",m.textContent=e.description,n.appendChild(m)}let p=document.createElement("div");p.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let v=document.createElement("div");return v.className="bloom-card-author",v.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(v),t.append(n,p,S),t}function ci(){return Object.values(j).filter(e=>!e.hidden&&e.name!=="Settings")}function di(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function el(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function tl(){return Hn.trim()?"No plugins match your search.":ie==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function nl(){let e=ci();return $s.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>di(n,t.id)))}function ol(){if(wt){wt.replaceChildren();for(let e of nl()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${ie===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{ie=e.id,pe()}),wt.appendChild(t)}}}function rl(){let e=ci();if(ie==="favorites"){let t=new Set(ln());e=e.filter(n=>t.has(n.name))}else ie!=="all"&&(e=e.filter(t=>di(t,ie)));return Lt==="enabled"&&(e=e.filter(t=>Me(t.name))),Lt==="disabled"&&(e=e.filter(t=>!Me(t.name))),e}function pe(){if(!vt)return;ol();let e=rl();kn&&(kn.placeholder=`Search ${e.length} plugins...`);let t=e,n=Hn.trim().toLowerCase();if(n&&(t=t.filter(o=>el(o).includes(n))),ie!=="favorites"){let o=sn();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}vt.replaceChildren();for(let o of t)vt.appendChild(Qs(o));xt&&(xt.hidden=t.length>0,xt.textContent=tl())}function Co(e){e.stopPropagation()}function ko(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function Ho(){document.getElementById(J)?.setAttribute("aria-expanded",re?"true":"false")}function il(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function Mn(){Po(),Hn="",Lt="all",ie="all",document.getElementById(Ie)?.remove(),re=!1,Ho()}function al(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",Co),t.addEventListener("pointerup",Co),t.addEventListener("click",Co);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Nn();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=ni(),s.addEventListener("click",Mn),o.append(r,s),n.appendChild(o);let l=document.createElement("div");l.className="bloom-section-head";let c=document.createElement("h3");c.textContent="Plugins";let d=document.createElement("p");d.textContent="Turn Bloom++ features on or off. Sliders icon opens options.",l.append(c,d),n.appendChild(l);let u=document.createElement("div");u.className="bloom-plugin-tabs",n.appendChild(u);let p=document.createElement("div");p.className="bloom-search-bar";let S=document.createElement("input");S.type="search",S.className="bloom-search-input",S.setAttribute("aria-label","Search plugins"),S.placeholder="Search plugins...",S.addEventListener("input",()=>{Hn=S.value,pe()});let v=document.createElement("select");v.className="bloom-search-filter",v.setAttribute("aria-label","Filter plugins");for(let Q of js){let uo=document.createElement("option");uo.value=Q.value,uo.textContent=Q.label,v.appendChild(uo)}v.value=Lt,v.addEventListener("change",()=>{Lt=v.value,pe()}),p.append(S,v),n.appendChild(p);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let h=document.createElement("p");h.className="bloom-tab-empty",h.hidden=!0,n.appendChild(h);let k=document.createElement("div");k.className="bloom-settings-plugin",Tt(k,!0);let U=document.createElement("div");U.className="bloom-settings-head";let Z=document.createElement("button");Z.type="button",Z.className="bloom-icon-btn",Z.setAttribute("aria-label","Back"),Z.innerHTML=Fs(),Z.addEventListener("click",Po);let dt=document.createElement("div");dt.className="bloom-dialog-titles";let Ce=document.createElement("h2"),V=document.createElement("p");V.className="bloom-settings-sub",dt.append(Ce,V);let q=document.createElement("button");q.type="button",q.className="bloom-icon-btn",q.setAttribute("aria-label","Close"),q.innerHTML=ni(),q.addEventListener("click",Mn),U.append(Z,dt,q);let W=document.createElement("div");return W.className="bloom-plugin-settings",k.append(U,W),t.append(n,k),Rn=n,Pn=k,vt=m,Tn=Ce,Cn=V,$=W,xt=h,kn=S,ri=v,wt=u,pe(),t}function sl(e){e.classList.add("bloom-rail-dock")}function ll(){let e=document.getElementById(J);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&bn(e)?e:null}function cl(){if(document.getElementById(Ie)?.remove(),!document.body)return;let e=al(Ie);sl(e),document.body.appendChild(e),re=!0,Po(),Ho(),fe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:P,dock:"center",rail:!!ll()})}function No(){let e=document.getElementById(Ie);if(e instanceof HTMLElement&&e.isConnected&&il(e)){Mn();return}e?.remove(),cl()}function dl(){let e=document.createElement("button");return e.type="button",e.id=J,e.className="bloom-rail-item",e.setAttribute("aria-controls",Ie),e.setAttribute("aria-expanded",re?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${Nn()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),No()}),e}function oi(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function ul(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function fl(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function ne(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function ui(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=ul(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&ne(e,"padding-top",Math.round(i)),Number.isFinite(a)&&ne(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));ne(n,"width",l),ne(n,"height",Math.max(20,Math.round(s.height)));let c=e.getBoundingClientRect(),d=Math.round(s.left-c.left);d>=0&&d<=40&&ne(e,"padding-left",d);let u=fl(t,o);if(u){let p=u.getBoundingClientRect(),S=n.getBoundingClientRect(),v=Math.round(p.left-S.right);v>=0&&v<=24&&ne(e,"gap",v)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&ne(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&ne(e,"gap",Math.round(l))}}function Ao(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function ml(){if(Et?.isConnected&&Y){Y.observe(Et,{childList:!0});return}Ro()}function pl(e){if(Ao(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function gl(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){yt=0;return}yt+=1,St=Date.now()+Math.min(8e3,250*2**Math.min(yt,5))})}function hl(){Ne||Date.now()<St||(Ne=requestAnimationFrame(()=>{Ne=0,!(Date.now()<St)&&(document.getElementById(J)?.isConnected||An())}))}function An(){if(!document.body)return;Y?.disconnect();let e=null,t=!1;try{let n=document.getElementById(J);e=n instanceof HTMLButtonElement?n:dl();let o=ht(),r=vo();if(o){let i=xo(o),a=i.parentElement;if(Ao(i)||a&&Ao(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),oi(e),ui(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),oi(e,!0)):e.isConnected&&!bn(e)&&(e.remove(),e=null)}finally{gl(e,t),ml(),Ho()}}function Ro(){let e=Xr();!e||!pl(e)||Et===e&&Y||(Y?.disconnect(),Et=e,Y=new MutationObserver(()=>{document.getElementById(J)?.isConnected||hl()}),Y.observe(e,{childList:!0}))}function bl(){An(),Ro(),bt===void 0&&(bt=window.setInterval(()=>{let e=document.getElementById(J);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=St&&An();else{yt=0;let t=ht();t&&ui(e,t)}Ro()},Ds))}function yl(){bt!==void 0&&(clearInterval(bt),bt=void 0),Ne&&cancelAnimationFrame(Ne),Ne=0,St=0,yt=0,Y?.disconnect(),Y=null,Et=null}function vl(e){wn===e&&oe||(oe?.disconnect(),wn=e,oe=new MutationObserver(()=>{if(!e.isConnected){oe?.disconnect(),oe=null,wn=null;return}fi(e)}),oe.observe(e,{childList:!0}))}function fi(e){if(vl(e),e.querySelector(`#${En}`))return;let t=document.createElement("button");t.type="button",t.id=En,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${Nn()}<span>Bloom++</span>`,t.addEventListener("pointerdown",ko),t.addEventListener("pointerup",ko),t.addEventListener("click",n=>{ko(n),No()}),e.insertBefore(t,e.firstChild)}function vn(){let e=Jr();return e?(fi(e),!0):!1}function xl(e){Zr(e)&&(queueMicrotask(vn),requestAnimationFrame(()=>{vn()}),window.setTimeout(vn,60),window.setTimeout(vn,180))}function wl(){Ln?.abort();let e=new AbortController;Ln=e,document.addEventListener("click",xl,{signal:e.signal})}function El(){Ln?.abort(),Ln=null,oe?.disconnect(),oe=null,wn=null}function mi(){Ae(),Ys(()=>{ai(),ii(),An(),No()})}var pi=g({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[b.p],required:!0,hidden:!0,enabledByDefault:!0,settings:_s,startAt:"HostReady",cleanupSelectors:[`#${Bs}`,`#${J}`,`#${En}`,`#${Ie}`,`#${Sn}`,"#bloom-menu-panel"],start(){ai(),ii(),bl(),wl(),yn?.(),yn=ti(To),To(),Lo=[tn("pluginToggle",()=>{re&&!He&&pe()}),tn("pluginPin",()=>{re&&!He&&pe()}),tn("pluginStar",()=>{re&&!He&&pe()})]},stop(){yl(),El(),yn?.(),yn=null;for(let e of Lo)e();Lo=[],Mn(),document.getElementById(J)?.remove(),document.getElementById(En)?.remove(),document.getElementById(Sn)?.remove(),xn=null,qs=null,Rn=null,Pn=null,vt=null,Tn=null,Cn=null,$=null,xt=null,kn=null,ri=null,wt=null,re=!1,He=!1},onSettingsChange:To});var bi='form[data-type="unified-composer"], form.w-full[data-type]',Oe=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),In=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),gi=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),hi=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Sl=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function H(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ge(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!H(r)))return r;return null}function yi(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function A(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=yi(e);return!!(Sl.test(n)||/^stop$/i.test(n))}function ae(){let t=Array.from(document.querySelectorAll(bi)).find(H);if(t instanceof HTMLElement)return t;let n=ge(document,Oe),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function he(){let e=Array.from(document.querySelectorAll(Oe));return e.find(H)??e[0]??null}function Io(){let e=he();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Ll(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function vi(e){let t=ae();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!H(n))&&e(n))return n;return null}function On(){let e=ae(),t=ge(e,In)??ge(document,In);return t&&!A(t)?t:vi(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!A(n);let r=yi(n);return/^(send|send prompt|发送)$/i.test(r)&&!A(n)})}function Oo(){let e=On();return!!e&&Ll(e)}function Bo(){let e=ae(),t=ge(e,gi,!0)??ge(document,gi,!0);if(t)return t;let n=ge(e,hi)??ge(document,hi);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&H(o)&&A(o))return o}return vi(A)}function Be(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var xi="bloom-host-icon",Ct="data-bloom-host-rel",Do="not all",_o=0,wi=0,Tl=400;function Ei(e){_o+=1;try{e()}finally{_o-=1}}function Bn(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function De(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Si(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Cl(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function kl(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-wi<Tl||(wi=n,e.appendChild(t))}function Ml(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||Bn(n)&&(n.getAttribute(Ct)||n.setAttribute(Ct,n.rel),n.media!==Do&&(n.media=Do),n.rel!==xi&&(n.rel=xi))}function Al(e){for(let t of e.querySelectorAll(`link[${Ct}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Ct);n&&(t.rel=n),t.removeAttribute(Ct),t.media===Do&&t.removeAttribute("media")}}function qo(e,t){let{head:n}=document;!n||!t||Ei(()=>{Ml(n,e);let o=Si(e),{type:r,sizes:i}=Cl(t);o?kl(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Li(e,t){let{head:n}=document;n&&Ei(()=>{Si(e)?.remove(),Al(n)})}function Ti(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(_o)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:Bn(l.target)&&(a=!0,De(l.target.href)&&(s=l.target.href)));for(let c of l.removedNodes)Bn(c)&&c.id===e&&(a=!0);for(let c of l.addedNodes)Bn(c)&&c.id!==e&&(a=!0,De(c.href)&&(s=c.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var Ci=/\/c\/([a-zA-Z0-9_-]{8,})/i;function N(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let d=n.indexOf(c);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,d)=>{try{return document.querySelector(c)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function _e(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function kt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(Ci)?.[1]??""}catch{return e.match(Ci)?.[1]??""}}function Dn(){let e=kt(location.pathname);if(e)return e;let n=N().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function Rl(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!H(t))&&(A(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Pl(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&H(e))}function Hl(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&H(e))}function Nl(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function se(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function I(){if(Bo()||Rl())return!0;let e=On();return e&&H(e)&&!A(e)?!1:!!(Pl()||Hl()||Nl())}var Il=["original","badge","dot","hole","bg"],Ai=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Ri={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},_n="#FCFCFC",Ol="#111111",ki="#111111",Bl="#ffffff",Dl="#212121",_l="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ql={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},qn=32,Mi=64;function Pi(e){return typeof e=="string"&&Il.includes(e)}function jl(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function jn(e){let t=document.createElement("canvas");t.width=qn,t.height=qn;let n=t.getContext("2d");return n?(n.scale(qn/Mi,qn/Mi),e(n),t.toDataURL("image/png")):""}function $l(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function $n(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(_l);n&&(e.strokeStyle=Ol,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Fl(e,t,n){let o=Ri[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=ki,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=ki,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Bl,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Mt(e,t){if(e==="original")return t==="wait"?jn(o=>$n(o,_n)):jl(ql[t]);let n=t==="wait"?void 0:Ri[t];return jn(e==="hole"?o=>$n(o,n??_n):e==="bg"?o=>{o.fillStyle=n??Dl,$l(o,0,0,64,64,14),o.fill(),$n(o,_n,!1)}:o=>{$n(o,_n),t!=="wait"&&Fl(o,t,e==="dot"?"dot":"badge")})}function Hi(e){return{wait:Mt(e,"wait"),rotate:Mt(e,"rotate"),done:Mt(e,"done"),ready:Mt(e,"ready"),error:Mt(e,"error")}}var Gl=new E("ChatStateFavicons"),ye="bloom-chat-state-favicon",Bi=y({style:{type:3,description:"Favicon overlay",options:Ai}}),je="",Gn={wait:"",rotate:"",done:"",ready:"",error:""},zn="wait",Rt=!1,X=!1,O=null,Pt="",Ht="",Nt=!0,At=null,$e=0,qe,Fn=null,be=null,jo=null,It=!1,Ni=new WeakSet,zl=400;function Kl(){let e=Bi.store.style;return Pi(e)?e:"badge"}function Ul(){let t=document.querySelector(`link[rel~="icon"]:not(#${ye})`)?.href;return De(t)?t:De(je)?je:""}function B(e){if(zn===e){let t=document.getElementById(ye);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===Gn[e])return}zn=e,qo(ye,Gn[e])}function Ii(){Gn=Hi(Kl()),B(zn)}function Vl(){let e=N(),t=e?_e(e):_e("");return I()?(!Pt&&t&&(Pt=t),Pt||t):(Pt="",t)}function Di(){Rt=!1,X=!1,O=null,Pt=""}function Wl(e){Ht=e,Di(),Nt=!1,B("wait")}function _i(){if(!It)return;let e=N()||location.pathname;if(Ht&&e&&Ht!==e){Wl(e);return}e&&(Ht=e);let t=Vl(),n=I(),o=Io(),r=Oo();if(se()&&!n){B("error"),Rt=!1,X=!1,O=null;return}if(n){Rt=!0,X=!1,O=t,B("rotate");return}if(Rt){let i=!!O&&!!t&&O===t;if(Rt=!1,i){X=!0,O=t,B("done");return}X=!1,O=null}if(X)if(!!(O&&t&&O!==t))X=!1,O=null;else if(o){B("done");return}else if(Nt){X=!1,B("ready");return}else{X=!1,B("wait");return}O=null,B(o?"wait":Nt?"ready":"wait")}function qi(){let e=ae();if(!(be&&jo===e&&e.isConnected)){if(be?.disconnect(),jo=e,!e||e===document.body){be=null;return}be=new MutationObserver(()=>Kn()),be.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Kn(){!It||$e||($e=requestAnimationFrame(()=>{$e=0,It&&(ji(),qi(),_i())}))}function Oi(){Nt=!0,Kn()}function ji(){let e=he();!e||Ni.has(e)||(Ni.add(e),e.addEventListener("input",Oi,{passive:!0}),e.addEventListener("compositionend",Oi,{passive:!0}))}var $i=g({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Bi,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ye}`],start(){It=!0,je=Ul()||je,Ii(),Fn?.disconnect(),Fn=Ti(ye,e=>{De(e)&&(je=e),qo(ye,Gn[zn])}),At?.abort(),At=new AbortController,window.addEventListener("popstate",Kn,{signal:At.signal}),ji(),qi(),qe!==void 0&&clearInterval(qe),qe=setInterval(Kn,zl),_i(),Gl.debug("favicon watch started")},stop(){It=!1,$e&&cancelAnimationFrame($e),$e=0,qe!==void 0&&(clearInterval(qe),qe=void 0),At?.abort(),At=null,be?.disconnect(),be=null,jo=null,Fn?.disconnect(),Fn=null,Di(),Ht="",Nt=!0,Li(ye,je)},onSettingsChange:Ii});var Fi=`.bloom-ih-hud {
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
`;var Gi=new E("InputHistory"),$o=/\u200B/g,zi=10,Ki=500,Ui=100,Jl=8,Xl=120,Zl=2e3,Un=10,Vn=y({maxEntries:{type:4,description:"Max stored prompts",min:zi,max:Ki,default:Ui},history:{type:5,description:"Stored prompts",render:mc},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Fo=new Map,L=0,Go="",F=!1,Bt=!1,Uo=0,Ot=null,zo,Vo=null,Vi=!0;function D(){let e=Vn.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Wi(e){let t=nn(Number(Vn.store.maxEntries??Ui),zi,Ki);return e.length>t?e.slice(e.length-t):e}function Wn(e){Vn.store.entries=Wi(e)}function Ql(e){return e.replaceAll($o,"").replace(/\n$/,"").trim()}function Ko(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Oe);return n instanceof HTMLElement?n:he()}function ec(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Be(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll($o,"").trim().length===0,last:i.toString().replaceAll($o,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Yi(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Gi.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Ji(e){clearTimeout(zo),zo=setTimeout(()=>{if(e!==Uo)return;Bt=!1;let t=Vo;t&&Yi(t,Vi)},Xl)}function Xi(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Bt=!0,Vo=e,Vi=n;let i=++Uo;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Gi.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Yi(e,n),Ji(i)}function tc(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Fe(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function nc(){document.querySelector(".bloom-ih-hud")?.remove()}function oc(e,t){let n=tc();n.textContent=e;let o=(t.closest("form")??ae()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Jl)}px`,n.classList.add("bloom-ih-hud-on")}function Wo(e){let t=Ql(e);if(!t)return;let n=Date.now(),o=Fo.get(t);if(o&&n-o<Zl)return;Fo.set(t,n);let r=D().filter(i=>i!==t);r.push(t),Wn(r),L=D().length,F=!1,Fe()}function rc(e,t){let n=D();if(!n.length&&e)return;L>=n.length&&(Go=Be(t),L=n.length);let o=e?L-1:L+1;o<0||o>n.length||(L=o,F=!0,Xi(t,o===n.length?Go:n[o],e),o<n.length?oc(`${o+1} / ${n.length}`,t):Fe())}function ic(e){F=!1,Fe(),Xi(e,Go,!1),L=D().length}function ac(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Ko(e.target)??Ko(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&F&&!e.altKey&&!e.shiftKey){ic(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Wo(Be(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=D();if(!o){let i=ec(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||L<=0)||!n&&L>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),rc(n,t))}function sc(e){if(Ko(e.target)){if(Bt){Ji(Uo);return}F&&(F=!1,Fe(),L=D().length)}}function lc(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Oe);n instanceof HTMLElement&&Wo(Be(n))}function cc(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(In);if(!n||!(n instanceof HTMLElement)||A(n))return;let o=he();o&&Wo(Be(o))}function dc(e){if(!(!F||Bt)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}F=!1,Fe()}}function uc(){if(Ot)return;Ot=new AbortController;let{signal:e}=Ot,t={capture:!0,signal:e};window.addEventListener("keydown",ac,t),window.addEventListener("input",sc,t),window.addEventListener("submit",lc,t),window.addEventListener("click",cc,t),window.addEventListener("pointerdown",dc,t)}function fc(e){let t=D().slice();t.splice(e,1),Wn(t),L>t.length&&(L=t.length)}function mc(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=D().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(h=>h.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Un));n>=l&&(n=l-1);let c=s.slice(n*Un,n*Un+Un);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),c.length){let h=document.createElement("div");h.className="bloom-ih-list",c.forEach((k,U)=>{let Z=i.indexOf(k),dt=D().length-1-Z,Ce=document.createElement("div");Ce.className="bloom-ih-item";let V=document.createElement("button");V.type="button",V.className=`bloom-ih-body${o===U?"":" bloom-ih-clamp"}`,V.textContent=k,V.addEventListener("click",()=>{o=o===U?-1:U,r()});let q=document.createElement("div");q.className="bloom-ih-actions";let W=document.createElement("button");W.type="button",W.title="Copy",W.textContent="C",W.addEventListener("click",()=>{Tr(k)});let Q=document.createElement("button");Q.type="button",Q.title="Delete",Q.textContent="\xD7",Q.addEventListener("click",()=>{fc(dt),r()}),q.append(W,Q),Ce.append(V,q),h.appendChild(Ce)}),e.appendChild(h)}else{let h=document.createElement("p");h.className="bloom-ih-empty",h.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(h)}let u=document.createElement("div");u.className="bloom-ih-pager";let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Prev",p.disabled=n<=0,p.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${l}`;let v=document.createElement("button");v.type="button",v.className="bloom-ih-btn",v.textContent="Next",v.disabled=n+1>=l,v.addEventListener("click",()=>{n+=1,r()});let m=document.createElement("button");m.type="button",m.className="bloom-ih-clear",m.textContent="Clear all",m.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Wn([]),L=0,r())}),u.append(p,S,v,m),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Zi=g({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Vn,startAt:"HostReady",managedStyle:"inputHistory",start(){x("inputHistory",Fi),L=D().length,F=!1,uc()},stop(){Ot?.abort(),Ot=null,Fe(),nc(),Fo.clear(),clearTimeout(zo),Bt=!1,Vo=null,F=!1},onSettingsChange(){let e=D(),t=Wi(e);t.length!==e.length&&Wn(t),L>t.length&&(L=t.length)}});var Yo="noShareLink",pc=['button[data-testid="share-chat-button"]'],gc=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Jo=y({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Qi(e){return`${e.join(",")}{display:none!important}`}function ea(){let e=[];if(Jo.store.hideShareChat!==!1&&e.push(Qi(pc)),Jo.store.hideShareProject!==!1&&e.push(Qi(gc)),!e.length){w(Yo);return}x(Yo,e.join(`
`))}var ta=g({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Jo,start:ea,onSettingsChange:ea,stop(){w(Yo)}});var ra="noDictation",hc=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],bc=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],ia=y({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function na(e){return`${e.join(",")}{display:none!important}`}function oa(){let e=[na(hc)];ia.store.hideDictationSettings!==!1&&e.push(na(bc)),x(ra,e.join(`
`))}var aa=g({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:ia,start:oa,onSettingsChange:oa,stop(){w(ra)}});var Xo="noSidebarIdentity",Jn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],ca=Jn.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),yc=Jn.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),vc=[...ca,...yc],xc=Jn.map(e=>`${e} a[href^="mailto:"]`),wc=Jn.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Yn=y({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0}});function sa(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Ec(){return`${wc.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function la(){let e=Yn.store.hideUsername!==!1,t=Yn.store.hideEmail!==!1,n=e&&Yn.store.enlargePlan!==!1,o=[];if(e&&o.push(sa(n?ca:vc)),t&&o.push(sa(xc)),n&&o.push(Ec()),!o.length){w(Xo);return}x(Xo,o.join(`
`))}var da=g({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Yn,start:la,onSettingsChange:la,stop(){w(Xo)}});var ua=`#bloom-rt-host {
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
`;var pa=new E("RecentTopics"),Ke="bloom-rt-host",ga="home",ha=/^\/c\/([a-z0-9_-]{8,})/i,Lc=/\/c\/([a-z0-9_-]{8,})/i,ba=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Tc=new Set(["Backquote","IntlBackslash"]),Cc=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),kc=140,Mc=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),T=y({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Mc},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Xn=null,Zo=null,R=!1,Ft=!1,Dt=!1,G=0,ve="",Ge=null,_t=null,ze;function Ac(){let e=Number(T.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function qt(){let e=T.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Qo(){let e=T.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ya(){let e=T.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function er(){let e=T.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Qn(e){let t=Ac();return e.length>t?e.slice(0,t):e}function z(e){return e===ga}function jt(e,t=kc){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function tr(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(ha)?.[1]??""}catch{return e.match(Lc)?.[1]??""}}function xe(){let e=(location.pathname||"/").match(ha);if(e?.[1])return e[1];let n=N().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return ga}function nr(e){if(z(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(tr(o.getAttribute("href")||"")!==e)continue;let r=jt(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return xe()===e&&t&&!/^ChatGPT$/i.test(t)?jt(t,80):""}function Rc(e){return z(e)?"New chat":Qo()[e]||nr(e)||"Chat"}function Pc(e){return er()[e]||""}function Hc(e){return ya()[e]||{}}function va(e,t){if(!e||z(e)||!t)return;let n=Qo();n[e]!==t&&(n[e]=t,T.store.titles=n)}function Nc(e,t){if(!e||z(e)||!t)return;let n=er();n[e]!==t&&(n[e]=t,T.store.projects=n)}function Ic(e,t){if(!e||z(e)||!t.user&&!t.assistant)return;let n=ya(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,T.store.previews=n)}function or(e){if(!e||z(e)&&T.store.includeHome===!1)return;let t=qt().filter(n=>n!==e);t.unshift(e),T.store.visits=Qn(t)}function eo(){let e=T.store.includeHome!==!1;return Qn(qt().filter(n=>e||!z(n))).map(n=>({id:n,title:Rc(n),project:Pc(n),preview:Hc(n)}))}function fa(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return jt(r)}catch{return""}}function $t(e){if(!e||z(e)||e!==xe())return;let t=nr(e);t&&va(e,t);let n=fa("user"),o=fa("assistant");Ic(e,{user:n,assistant:o});let r=wa(e);if(r){let i=xa(r);i&&Nc(e,i)}}function rr(){let e=Qo(),t=er(),n=[],o=new Set,r=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Ke}, #bloom-root, #bloom-sidebar-panel`))continue;let d=tr(c.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=jt(c.textContent||"",80);u&&!ba.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let p=xa(c);p&&t[d]!==p&&(t[d]=p,i=!0)}}catch{}r&&(T.store.titles=e),i&&(T.store.projects=t);let a=qt(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(T.store.visits=Qn([...a,...l]))}function xa(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=jt((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!ba.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function wa(e){if(z(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(tr(t.getAttribute("href")||"")===e)return t}catch{}return null}function Oc(e){let t=wa(e);if(t){t.click();return}if(z(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Bc(){let e=xe();ve&&ve!==e&&$t(ve),ve=e,or(e),rr();let t=nr(e);t&&va(e,t),$t(e)}function Zn(){ze===void 0&&(ze=window.setTimeout(()=>{ze=void 0,Bc()},120))}function Dc(){Ge||(Ge=history.pushState.bind(history),_t=history.replaceState.bind(history),history.pushState=function(...t){let n=Ge(...t);return Zn(),n},history.replaceState=function(...t){let n=_t(...t);return Zn(),n})}function _c(){Ge&&(history.pushState=Ge),_t&&(history.replaceState=_t),Ge=null,_t=null}function qc(e){return Tc.has(e.code)||e.keyCode===192?!0:Cc.has(e.key)}function Ea(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function jc(e,t){Ft=t,rr(),$t(xe()),R=!0,G=0;try{let n=xe();or(n);let o=eo();o.length>1&&(G=e?o.length-1:1)}catch(n){pa.error("Failed to open switcher:",n)}Gt()}function ma(e){let{length:t}=eo();t&&(G=(G+(e?-1:1)+t)%t,Gt())}function ir(){if(!R)return;let e=eo()[G];R=!1,Ft=!1,Gt(),e&&Oc(e.id)}function Sa(){R&&(R=!1,Ft=!1,Gt())}function $c(e){if(Ea(e)){Dt=!0;return}if((e.ctrlKey||Dt)&&!e.altKey&&!e.metaKey&&qc(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{R?ma(e.shiftKey):jc(e.shiftKey,!0)}catch(n){pa.error("Hotkey failed:",n)}return}if(R){if(e.key==="Escape"){e.preventDefault(),Sa();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),ir();return}e.key==="Tab"&&(e.ctrlKey||Dt)&&(e.preventDefault(),ma(e.shiftKey))}}function Fc(e){Ea(e)&&(Dt=!1,R&&Ft&&ir())}function Gc(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Zn)}function zc(e){!R||(e.target instanceof Element?e.target:null)?.closest(`#${Ke}`)||Sa()}function Kc(){document.visibilityState==="hidden"&&$t(xe())}function Uc(){if(!document.body)return null;let e=document.getElementById(Ke);if(e instanceof HTMLElement)return Zo=e,e;e=document.createElement("div"),e.id=Ke;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Zo=e,e}function Gt(){let e=Uc();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!R){t.dataset.visible="false",t.replaceChildren();return}let n=eo();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}G>=n.length&&(G=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===G?"true":"false",s.setAttribute("aria-selected",a===G?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,c.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,c.append(d)}s.append(c)}s.addEventListener("click",()=>{G=a,ir()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Vc(){document.getElementById(Ke)?.remove(),Zo=null}var La=g({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Ke}`],settings:T,start(){x("recentTopics",ua),ve=xe(),or(ve),rr(),$t(ve),Dc(),Xn=new AbortController;let{signal:e}=Xn;window.addEventListener("keydown",$c,{capture:!0,signal:e}),window.addEventListener("keyup",Fc,{capture:!0,signal:e}),window.addEventListener("popstate",Zn,{signal:e}),document.addEventListener("click",Gc,{capture:!0,signal:e}),document.addEventListener("click",zc,{signal:e}),document.addEventListener("visibilitychange",Kc,{signal:e})},stop(){Xn?.abort(),Xn=null,ze!==void 0&&(clearTimeout(ze),ze=void 0),_c(),R=!1,Ft=!1,Dt=!1,Vc()},onSettingsChange(){let e=Qn(qt());e.length!==qt().length&&(T.store.visits=e),R&&Gt()}});var ar="cleaner",Wc=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Yc=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Jc=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Xc=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Zc=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]'],Qc=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],we=y({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Ue(e){return`${e.join(",")}{display:none!important}`}function Ta(){let e=[];if(we.store.hideDownloadApps!==!1&&e.push(Ue(Wc)),we.store.hideDisclaimer!==!1&&e.push(Ue(Yc)),we.store.hideUpgrade!==!1&&e.push(Ue(Jc)),we.store.hideLockedModels!==!1&&e.push(Ue(Xc)),we.store.hideHomePromo!==!1&&e.push(Ue(Zc)),we.store.hideAds!==!1&&e.push(Ue(Qc)),!e.length){w(ar);return}x(ar,e.join(`
`))}var Ca=g({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:we,start:Ta,onSettingsChange:Ta,stop(){w(ar)}});var to=new E("ResponseNotification"),ed=400,td=3,Xe=y({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:ld},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),sr=!1,Le=!1,Ee=0,Se="",Je=!1,zt="",Ve,We=null,Ye=null;function ka(){return _e(N())}function nd(){return document.visibilityState==="hidden"||document.hidden}function od(){return Xe.store.onlyWhenHidden===!1?!0:nd()}function rd(){let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Ma(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Ye||Ye.state==="closed")&&(Ye=new e);let t=Ye,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){to.debug("chime failed",e)}}function id(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){to.debug("custom sound failed",t),Ma()}}function Aa(){let e=String(Xe.store.soundUrl||"").trim();e?id(e):Ma()}function ad(){let e="Bloom++",t=`${rd()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){to.debug("notification failed",n)}}function sd(){od()&&(Xe.store.sound!==!1&&Aa(),Xe.store.browserNotification!==!1&&ad())}function ld(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>Aa()),e.appendChild(t),()=>{t.remove()}}function cd(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&A(n)&&(Je=!0)}function dd(){if(!sr)return;let e=N()||location.pathname;if(zt&&e&&zt!==e){Le=!1,Ee=0,Se="",Je=!1,zt=e;return}zt=e;let t=I(),n=ka();if(t){Le=!0,Ee=0,Se=n;return}if(!Le||(Ee+=1,Ee<td))return;let o=!!Se&&Se===n,r=Je,i=se();Le=!1,Ee=0,Je=!1,Se="",!(!o||r||i)&&sd()}var Ra=g({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Xe,start(){sr=!0,Le=I(),Ee=0,Se=Le?ka():"",Je=!1,zt=N()||location.pathname,We?.abort(),We=new AbortController,document.addEventListener("click",cd,{capture:!0,signal:We.signal}),Ve!==void 0&&clearInterval(Ve),Ve=setInterval(dd,ed),Xe.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:We.signal}),to.debug("watch started")},stop(){sr=!1,Ve!==void 0&&(clearInterval(Ve),Ve=void 0),We?.abort(),We=null,Le=!1,Ee=0,Se="",Je=!1;try{Ye?.close()}catch{}Ye=null}});var Pa=`.bloom-cls {
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
`;var Oa=new E("ChatListStatus"),Ha="chatListStatus",ro="bloom-cls",fd="bloom-cls",md=500,pd=1200*1e3,gd="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",ce=new Map,de=!1,Qe="",Kt=!1,Ze,tt=0,le=null,cr=null,et=null,nt=null,no=null,Ut=null,Vt=!1;function oo(){return Date.now()}function hd(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Ba(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function bd(e,t){return!(t!=="POST"||!/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e))}function yd(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Da(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function vd(e){return typeof e=="string"?Da(e):""}function K(e,t,n,o=!0){if(!(!e||!de)){if(t==="idle")ce.delete(e);else{let r=ce.get(e);r&&r.kind===t&&n!=="net"?r.at=oo():ce.set(e,{kind:t,at:oo(),source:n})}o&&xd({v:1,id:e,kind:t,at:oo()}),io()}}function xd(e){try{et?.postMessage(e)}catch{}}function wd(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||K(t.id,t.kind,"bc",!1)}function Ed(){let e=oo();for(let[t,n]of ce)n.kind==="streaming"&&e-n.at>pd&&ce.delete(t)}function Sd(){let e=Ba();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(gd))continue;let r=kt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Na(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function lr(e){let t=e.querySelector(`:scope > .${ro}`);return t||null}function Ld(){if(!de)return;Ed();let e=Dn(),t=Sd();le?.disconnect();try{for(let n of t){let o=kt(n.getAttribute("href")||"");if(!o||!e||o!==e){lr(n)?.remove();continue}let i=ce.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){lr(n)?.remove();continue}let a=lr(n);a||(a=document.createElement("span"),a.className=ro,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Na("streaming")):i==="error"&&a.appendChild(Na("error")))}}catch(n){Oa.debug("paint failed",n)}_a()}function io(){!de||tt||(tt=requestAnimationFrame(()=>{tt=0,de&&Ld()}))}function _a(){let e=Ba();if(!(le&&cr===e&&e?.isConnected)){if(le?.disconnect(),cr=e,!e){le=null;return}le=new MutationObserver(()=>io()),le.observe(e,{childList:!0,subtree:!0})}}async function Td(e,t){let n=t,o=!e.ok,r=e.body;if(!r){n&&K(n,o?"error":"done","net");return}let i=r.getReader(),a=new TextDecoder,s="";try{for(;de;){let{done:l,value:c}=await i.read();if(l)break;if(s+=a.decode(c,{stream:!0}),!n){let d=Da(s);d&&(n=d,Vt=!1,K(n,"streaming","net"))}/\[DONE\]/.test(s)||/"error"\s*:\s*\{/.test(s)?(/"error"\s*:\s*\{/.test(s)&&(o=!0),s=s.slice(-64)):s.length>8192&&(s=s.slice(-2048))}}catch{o=!0}n&&K(n,o?"error":"done","net")}function Cd(e,t,n){let o=yd(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=bd(o,r),a="";return i&&(a=vd(n?.body)||kt(o)||Dn(),a?K(a,"streaming","net"):Vt=!0),e(t,n).then(s=>{if(!i)return s;try{let l=s.clone();Td(l,a)}catch{a&&K(a,s.ok?"done":"error","net")}return s},s=>{throw i&&a&&K(a,"error","net"),s})}function kd(){if(nt)return;let e=hd();Ut=e,nt=e.fetch.bind(e);let t=(n,o)=>Cd(nt,n,o);no=t,e.fetch=t}function Md(){!nt||!Ut||(no&&Ut.fetch===no&&(Ut.fetch=nt),nt=null,no=null,Ut=null)}function Ia(){if(!de)return;let e=Dn();if(Qe&&e&&Qe!==e){let n=ce.get(Qe);n?.kind==="streaming"&&n.source==="local"&&K(Qe,se()?"error":"done","local"),Kt=!1}if(Qe=e,I()){Kt=!0,e&&K(e,"streaming","local"),io();return}Kt&&(Kt=!1,e&&K(e,se()?"error":"done","local")),Vt=!1,io()}var qa=g({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ro}`],start(){de=!0,x(Ha,Pa);try{et=new BroadcastChannel(fd)}catch{et=null}et?.addEventListener("message",wd),kd(),_a(),Ze!==void 0&&clearInterval(Ze),Ze=setInterval(Ia,md),Ia(),Oa.debug("sidebar status watch started")},stop(){de=!1,tt&&cancelAnimationFrame(tt),tt=0,Ze!==void 0&&(clearInterval(Ze),Ze=void 0),le?.disconnect(),le=null,cr=null,Md();try{et?.close()}catch{}et=null,ce.clear(),Vt=!1,Kt=!1,Qe="",document.querySelectorAll(`.${ro}`).forEach(e=>e.remove()),w(Ha)}});var $a="widerChat",Fa=40,Ga=96,za=64,Ka=y({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Fa,max:Ga,default:za}});function Ad(){return nn(Number(Ka.store.width??za),Fa,Ga)}function ja(){let e=Ad();x($a,`:root{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="--thread-content-max-width"]{--thread-content-max-width:${e}rem!important}[class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:min(100%,${e}rem)!important}`)}var Ua=g({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Ka,start:ja,onSettingsChange:ja,stop(){w($a)}});var Va=`.bloom-ts {
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
`;function ao(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return ao(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Wa(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Ya(e){try{return new Date(e).toISOString()}catch{return""}}var es=new E("MessageTimestamps"),Ja="messageTimestamps",lo="bloom-ts",Xa=1500,Pd="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",at=y({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),st=new Map,Te=!1,rt=0,ot,ue=null,dr=null,it=null,so=null,Wt=null,Za=!1;function Hd(){return typeof unsafeWindow<"u"?unsafeWindow:window}function ts(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function fr(){let e=at.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ns(){let e={...fr()};for(let[n,o]of st)e[n]=o;let t=Object.keys(e);if(t.length>Xa){let n=t.slice(t.length-Xa),o={};for(let r of n)o[r]=e[r];at.store.stamps=o;return}at.store.stamps=e}var Nd=Cr(ns,500);function ur(e,t){!e||!t||st.get(e)===t||(st.set(e,t),Nd(),Jt())}function Id(e){return e?st.get(e)??fr()[e]??null:null}function Od(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Bd(e,t){return t!=="GET"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Dd(e,t){return t!=="POST"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function Yt(e,t=0){if(!Te||t>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let a of e)Yt(a,t+1);return}let n=e,o=n.message;if(o&&typeof o=="object"&&!Array.isArray(o)){let a=o,s=typeof a.id=="string"?a.id:"",l=ao(a.create_time??a.createTime??a.created_at);s&&l&&ur(s,l)}let r=typeof n.id=="string"?n.id:"",i=ao(n.create_time??n.createTime??n.created_at);if(r&&i&&(n.author||n.content||n.role||n.create_time||n.createTime)&&ur(r,i),n.mapping&&typeof n.mapping=="object")Yt(n.mapping,t+1);else if(t<3)for(let a of Object.values(n))a&&typeof a=="object"&&Yt(a,t+1)}function Qa(e){if(e)try{Yt(JSON.parse(e))}catch{}}async function _d(e){try{let t=await e.clone().json();Yt(t)}catch{}}async function qd(e){let t=e.body;if(!t)return;let n=t.getReader(),o=new TextDecoder,r="";try{for(;Te;){let{done:i,value:a}=await n.read();if(i)break;r+=o.decode(a,{stream:!0});let s=r.split(`
`);r=s.pop()??"";for(let l of s){let c=l.replace(/^data:\s*/,"").trim();!c||c==="[DONE]"||Qa(c)}r.length>16384&&(r=r.slice(-4096))}r&&Qa(r.replace(/^data:\s*/,""))}catch{}}function jd(e,t,n){let o=Od(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=Bd(o,r),a=Dd(o,r);return e(t,n).then(s=>{if(i)_d(s);else if(a)try{qd(s.clone())}catch{}return s})}function $d(){if(it)return;let e=Hd();Wt=e,it=e.fetch.bind(e);let t=(n,o)=>jd(it,n,o);so=t,e.fetch=t}function Fd(){!it||!Wt||(so&&Wt.fetch===so&&(Wt.fetch=it),it=null,so=null,Wt=null)}function Gd(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function zd(){let e=ts();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Pd)||t.push(n)}catch{}return t}function Kd(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Ud(){if(!Te)return;let e=at.store.hideOwnMessages===!0,t=at.store.showDate!==!1,n=I(),o=zd();ue?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=Gd(r),l=r.querySelector(`:scope > .${lo}`);if(e&&s==="user"){l?.remove();return}if(Kd(r)){l?.remove();return}let c=Id(a);if(!c&&a&&(n||Za)&&i>=o.length-2&&(c=Date.now(),ur(a,c)),!c){l?.remove();return}let d=Wa(c,t);if(!d){l?.remove();return}let u=l;u||(u=document.createElement("time"),u.className=lo,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let p=Ya(c);p&&u.getAttribute("datetime")!==p&&u.setAttribute("datetime",p)})}catch(r){es.debug("paint failed",r)}Za=n,os()}function Jt(){!Te||rt||(rt=requestAnimationFrame(()=>{rt=0,Te&&Ud()}))}function os(){let e=ts();if(!(ue&&dr===e&&e?.isConnected)){if(ue?.disconnect(),dr=e,!e||e===document.body){ue=null;return}ue=new MutationObserver(()=>Jt()),ue.observe(e,{childList:!0,subtree:!0})}}var rs=g({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${lo}`],settings:at,start(){Te=!0,x(Ja,Va);let e=fr();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&st.set(t,n);$d(),os(),ot!==void 0&&clearInterval(ot),ot=setInterval(Jt,800),Jt(),es.debug("timestamp watch started")},stop(){Te=!1,rt&&cancelAnimationFrame(rt),rt=0,ot!==void 0&&(clearInterval(ot),ot=void 0),ue?.disconnect(),ue=null,dr=null,Fd(),ns(),st.clear(),document.querySelectorAll(`.${lo}`).forEach(e=>e.remove()),w(Ja)},onSettingsChange:Jt});var mr="streamerMode",Vd="filter:blur(6px)!important;transition:filter .2s ease",Wd="filter:none!important",Xt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],lt=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function _(e,t){return e.map(n=>`${n} ${t}`)}var ct=y({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0}});function Zt(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${Vd}}${t?`${o}{${Wd}}`:""}`}function is(){let e=[];if(ct.store.conversations!==!1&&e.push(Zt([..._(lt,'a[href^="/c/"]'),..._(lt,'a[href*="/c/"]')])),ct.store.projects!==!1&&e.push(Zt([..._(lt,'a[href*="/project"]'),..._(lt,'a[href*="/g/g-p-"]'),..._(lt,'[data-testid="project-name"]'),..._(lt,'[data-testid="project-link"]')])),ct.store.accountAvatar!==!1&&e.push(Zt([..._(Xt,"img"),..._(Xt,'[class*="avatar"]')],!1)),ct.store.accountName!==!1&&e.push(Zt([..._(Xt,".min-w-0 > .truncate"),..._(Xt,".min-w-0.flex-1 .truncate")],!1)),ct.store.accountEmail!==!1&&e.push(Zt([..._(Xt,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),!e.length){w(mr);return}x(mr,e.join(`
`))}var as=g({name:"StreamerMode",description:"Blur Recents titles, project names, and the account chip while you stream.",authors:[b.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:ct,start:is,onSettingsChange:is,stop(){w(mr)}});var Qt=new E("Bloom"),ss=!1,Yd=Date.now(),Jd=[pi,$i,Zi,ta,aa,da,La,Ca,Ra,qa,Ua,rs,as];function co(e){return new Promise(t=>setTimeout(t,e))}function Xd(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var cs=8e3,ls=300,Zd=250;async function Qd(){if(me())return await co(ls),!0;for(;Date.now()-Yd<cs;)if(await co(Zd),me())return await co(ls),!0;return me()||bo()}function pr(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function eu(){if(pr())return!0;let e=Date.now()+cs;for(;Date.now()<e;)if(await co(100),pr())return!0;return pr()}function tu(){try{GM_registerMenuCommand?.("Bloom++ settings",mi)}catch{}}function nu(){un(()=>{mt("HostShell"),Qt.info("host shell",P)}),fn(()=>{Qt.info("idle ready",P)}),mn(()=>{yr(),mt("HostReady"),Qt.info("chrome ready",P)})}async function gr(){await kr()}async function hr(){if(ss)return;ss=!0;for(let n of Jd)try{Br(n)}catch(o){Qt.error("register failed",n.name,o)}qr(),mt("Init"),tu(),nu();let e=()=>mt("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Xd(),eu().then(n=>{n&&pn()}),!await Qd()){Qt.warn("late islands not detected; starting default plugins",P),Ae(),gn();return}await Kr()}var ds=typeof unsafeWindow<"u"?unsafeWindow:window,ou=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||ou){let e=ds.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",P);try{Object.defineProperty(ds,"Bloom",{value:br,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}gr().then(()=>hr()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
