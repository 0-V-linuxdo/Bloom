// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.29
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, Recents status, wider thread, message times, streamer blur, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/assets/logos/app-icon/bloom-icon.svg
// @icon64       https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/assets/logos/app-icon/bloom-icon-64.png
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

/* Bloom++ [20260919] v1.4.29. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var fs=Object.defineProperty;var ms=(e,t)=>{for(var n in t)fs(e,n,{get:t[n],enumerable:!0})};var fr={};ms(fr,{REPO_URL:()=>jr,Settings:()=>f,VERSION:()=>P,hasLateIslands:()=>le,init:()=>ur,initSettings:()=>dr,isDocumentInteractive:()=>Fr,plugins:()=>_,requestChromeReady:()=>fn,requestIdleReady:()=>Le,requestShellReady:()=>un,whenChromeReady:()=>dn,whenIdleReady:()=>cn,whenShellReady:()=>ln});var W=new Map,Zt=!1;function ps(){return document.getElementById("bloom-root")?.shadowRoot??null}function gs(){return document.head??null}function Ee(){let e=ps();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=hs()}function so(e,t){if(!Zt)return;let n=gs();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),Ee();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,Ee();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,Ee()}function v(e,t){let n=W.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},W.set(e,n)),Zt&&so(e,n)}function mr(){Zt=!0;for(let[e,t]of W)so(e,t);return Ee(),!0}function pr(e){let t=W.get(e);t&&(t.disabled=!1,Zt&&so(e,t))}function gr(e){let t=W.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),Ee())}function x(e){let t=W.get(e);t&&(t.el?.remove(),W.delete(e),Ee())}function hs(){return Array.from(W.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var w=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function g(e){return e}var lo=new Map;function Xt(e,t){let n=lo.get(e);return n||(n=new Set,lo.set(e,n)),n.add(t),()=>n.delete(t)}function se(e,t){let n=lo.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var bs="bloompp";function hr(){return new Promise((e,t)=>{let n=indexedDB.open(bs,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function br(e){try{let t=await hr();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function yr(e,t){try{let n=await hr();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function lt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Qt(e,t,n){return Math.min(n,Math.max(t,e))}function vr(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function xr(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function wr(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var en=new w("SettingsStore"),Y="BloomSettings",ys=100;function nn(e){if(lt(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(lt(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return lt(n)?n:null}return null}catch{return null}}var tn=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[d,c]of this.defaultGetters)if(l.startsWith(d)){let u=l.slice(d.length+1);if(u&&!u.includes(".")){let p=c(u);p!==void 0&&(i[a]=p,s=p);break}}}return lt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){en.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},ys))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Y,this.plain)}catch{try{GM_setValue(Y,t)}catch(n){en.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(Y,t)}catch{}yr(Y,t).catch(n=>en.warn("Failed to save settings to IndexedDB:",n))}catch(t){en.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){vr(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var vs=new w("Settings"),xs={plugins:{}},f=new tn(structuredClone(xs)),ws=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Es(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function y(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(f.store.plugins[n]||(f.store.plugins[n]={}),f.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?f.plain.plugins[n]??{}:{}}};return t}function Ss(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Er(){let e=null;if(e=nn(Ss(Y)),e||(e=nn(await br(Y))),!e)try{e=nn(localStorage.getItem(Y))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(f.plain.plugins=t),vs.debug("Loaded settings")}}function Sr(e,t){t&&(t.pluginName=e,f.plain.plugins[e]||(f.plain.plugins[e]={}),f.setDefaultGetter(ws(e),n=>{if(n!=="enabled")return Es(t.def,n)}))}function Lr(){return f.plain.plugins.Settings||(f.store.plugins.Settings={}),f.store.plugins.Settings}function on(){return Lr().pinnedPlugins??[]}function Cr(e){return on().includes(e)}function Tr(e){let t=on(),n=t.includes(e);return f.store.plugins.Settings={...f.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function rn(){return Lr().starredPlugins??[]}function kr(e){return rn().includes(e)}function Mr(e){let t=rn(),n=t.includes(e);return f.store.plugins.Settings={...f.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var an=new w("PluginManager"),_={},ct=new Set;function Rr(e){if(_[e.name]){an.warn("Duplicate plugin",e.name);return}_[e.name]=e,Sr(e.name,e.settings)}function Se(e){let t=_[e];if(!t)return!1;if(t.required)return!0;let n=f.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Nr(e){let t=_[e];if(!t||t.required)return;let n=!Se(e);f.plain.plugins[e]||(f.store.plugins[e]={}),f.store.plugins[e].enabled=n,n?Hr(t):Ls(t),se("pluginToggle",{name:e,enabled:n})}function Hr(e,t=!1){if(!ct.has(e.name)&&Se(e.name))try{e.managedStyle&&pr(e.managedStyle),e.start?.(),ct.add(e.name),e.settings&&f.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ct.has(e.name)&&e.onSettingsChange?.()}),t||an.debug("Started",e.name)}catch(n){an.error("Failed to start",e.name,n)}}function Ls(e){if(ct.has(e.name)){try{e.stop?.()}catch(t){an.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(gr(e.managedStyle),x(e.managedStyle)),ct.delete(e.name)}}function dt(e){for(let t of Object.values(_))(t.startAt??"DOMContentLoaded")===e&&Hr(t)}var Ar=2,Pr="defaultsRev";function Ir(){for(let t of Object.values(_))f.plain.plugins[t.name]||(f.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=f.store.plugins.Settings??(f.store.plugins.Settings={});if(e[Pr]!==Ar){for(let t of["NoShareLink","NoDictation"]){let n=f.store.plugins[t]??(f.store.plugins[t]={});n.enabled=!1}e[Pr]=Ar}}var ut=!1,sn=!1,co=!1,Br=[],Dr=[],_r=[];function uo(e){let t=e.splice(0);for(let n of t)n()}function ft(){ut||(ut=!0,uo(Br))}function fo(){sn||(sn=!0,ut||ft(),uo(Dr))}function $r(){co||(co=!0,ut||ft(),sn||fo(),uo(_r))}function ln(e){ut?e():Br.push(e)}function cn(e){sn?e():Dr.push(e)}function dn(e){co?e():_r.push(e)}function un(){ft()}function Le(){ft(),fo()}function fn(){$r()}function Or(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function qr(){await Or(4e3),ft(),await Or(4e3),fo(),$r()}var b={p:"0-V-linuxdo"},P="[20260919] v1.4.29",jr="https://github.com/0-V-linuxdo/Bloom";function Cs(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Ts(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function mo(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function le(){return mo()?Cs()||Ts():!1}function Fr(){return le()}var ks=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Gr=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Ms=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),As="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Te(e){return e.id==="bloom-root"||!!e.closest(As)}function zr(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function mn(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function po(e){if(!(e instanceof HTMLElement)||!e.isConnected||Te(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&mn(t)?!1:e.getClientRects().length>0}function Ce(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Ps(){let e=[];for(let t of document.querySelectorAll(ks))!(t instanceof HTMLElement)||!t.isConnected||Te(t)||e.push(t);return e}function pn(e){if(!e.isConnected||Te(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function ke(){return Ps().filter(pn)[0]??null}function go(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||Te(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function ho(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!Te(n)&&!Ce(n)&&n.parentElement&&!Ce(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!Ce(o)&&!Te(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!Ce(o.parentElement))return o}return t}function Kr(){let e=document.querySelectorAll(Gr);for(let n of e)if(po(n)&&!mn(n)&&zr(n))return n;let t=document.querySelectorAll(Ms);for(let n of t){if(!po(n)||!zr(n)||mn(n))continue;let o=n.querySelector(Gr);return po(o)&&!mn(o)?o:n}return null}function Ur(){let e=ke();if(e){let t=ho(e),n=t.parentElement;if(n&&!Ce(n))return n;if(!Ce(t))return t}return go()}function Vr(e){let t=ke();return t?e.composedPath().includes(t):!1}var yo=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Rs={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Ns(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Hs(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function bo(e){let t=Ns(e);return t?Hs(t)>.55?"light":"dark":null}function Is(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=bo(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=bo(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=bo(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Wr(e){return e==="auto"?Is():e}function Os(e){try{let t=getComputedStyle(document.documentElement);for(let n of yo){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Yr(e,t,n){let o=Rs[t];if(n){Os(e);for(let r of yo)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of yo)e.style.setProperty(r,o[r])}function Jr(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var vo=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
  background: var(--bloom-rail-surface, var(--bg-primary, var(--sidebar-surface-primary, transparent)));
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
`;var Ds="bloom-root",$="bloom-rail-item",vn="bloom-account-item",de="bloom-sidebar-panel",Et="bloom-plugin-dialog",Tn="bloom-plugin-layer",xn="bloom-settings-css",_s=2e3,$s=y({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Qr=null,qs=null,Q=!1,So=[],gn=null,wn=null,Z=null,bn=null,U=null,vt=null,mt,Me=0,xt=0,pt=0,gt=null,ht=null,En=null,ei=null,bt=null,xo=[],Sn=!1,js=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Fs=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],kn="",wt="all",ee="all";function Mn(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ti(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Gs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function zs(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Ks(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Us={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Vs(e){return e.icon||Us[e.name]||Mn()}function Ws(){return"auto"}function ni(e){let t=e;for(let n=0;n<6&&t&&!Ln(t);n++){let r=getComputedStyle(t).backgroundColor.trim().match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/i);if(r){let i=Number(r[1]),a=Number(r[2]),s=Number(r[3]),l=1;if(r[4]!=null&&(l=String(r[4]).endsWith("%")?Number(r[4])/100:Number(r[4])),l>=.5&&i+a+s>=12)return`rgb(${Math.round(i)}, ${Math.round(a)}, ${Math.round(s)})`}t=t.parentElement}return null}function Ys(){let e=ke();return e?ni(e):null}function wo(e,t,n,o){e&&(e.setAttribute("data-bloom-scheme",t),Yr(e,t,n),o&&(e.style.setProperty("--bg-primary",o),e.style.setProperty("--bloom-rail-surface",o)))}function yt(){let e=Ws(),t=Wr(e),n=e==="auto",o=Ys();wo(Qr,t,n,o);let r=document.getElementById(de);r instanceof HTMLElement&&wo(r,t,n,o);let i=document.getElementById(Et);i instanceof HTMLElement&&wo(i,t,n,o);let a=document.getElementById($);a instanceof HTMLElement&&o&&a.style.setProperty("--bloom-rail-surface",o),se("schemeChange",{scheme:t,pref:e})}function oi(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function ri(){if(v("settings",vo),document.getElementById(xn)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=xn,e.textContent=vo,document.head.appendChild(e)}function Js(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Zs(){for(let e of So)e();So=[]}function ii(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Xs(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function Co(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function Qs(e){return Co(e).length>0}function yn(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function el(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=Xs(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function tl(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(el(t,n));let i=f.store.plugins[e]??(f.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",So.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??yn(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??yn(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=ii(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??yn(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function Zr(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function nl(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=f.store.plugins[e.name]??(f.store.plugins[e.name]={});for(let[n,o]of Co(e)){if(n==="enabled"||o.type===5)continue;let r=yn(o);r!==void 0&&(t[n]=r)}si(e)}function ai(e){e.key==="Escape"&&(!document.getElementById(Tn)&&!document.getElementById(Et)||(e.stopPropagation(),Ae()))}function ol(){Sn||(document.addEventListener("keydown",ai),Sn=!0)}function rl(){Sn&&(document.removeEventListener("keydown",ai),Sn=!1)}function Ae(){Zs(),rl(),document.getElementById(Tn)?.remove(),document.getElementById(Et)?.remove()}function si(e){if(Ae(),!document.body)return;let t=document.createElement("div");t.id=Tn,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",X),t.addEventListener("pointerup",X),t.addEventListener("click",c=>{c.stopPropagation(),c.target===t&&Ae()});let n=document.createElement("div");n.id=Et,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",X),n.addEventListener("pointerup",X),n.addEventListener("click",X);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=ti(),o.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Ae()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let c=document.createElement("p");c.className="bloom-plugin-dialog-sub",c.textContent=e.description,r.appendChild(c)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let c=Zr("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),c.appendChild(u),n.appendChild(c)}let s=Zr("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let d=Co(e);if(d.length)for(let[c,u]of d){let p=tl(e.name,c,u);p&&l.appendChild(p)}if(!l.childElementCount){let c=document.createElement("p");c.className="bloom-dialog-empty",c.textContent="No configurable settings.",l.appendChild(c)}if(s.appendChild(l),n.appendChild(s),d.length){let c=document.createElement("div");c.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>nl(e)),c.appendChild(u),n.appendChild(c)}t.appendChild(n),document.body.appendChild(t),ol(),yt()}function il(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Vs(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=kr(e.name),d=document.createElement("button");if(d.type="button",d.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,d.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),d.innerHTML=zs(l),d.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();let h=Mr(e.name);se("pluginStar",{name:e.name,starred:h})}),s.appendChild(d),!e.required){let m=Cr(e.name),h=document.createElement("button");h.type="button",h.className=`bloom-icon-btn bloom-card-pin${m?" bloom-card-pin-active":""}`,h.setAttribute("aria-label",m?"Unpin from top":"Pin to top"),h.innerHTML=Ks(m),h.addEventListener("click",z=>{z.preventDefault(),z.stopPropagation();let K=Tr(e.name);se("pluginPin",{name:e.name,pinned:K})}),s.appendChild(h)}if(Qs(e)){let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn bloom-card-settings",m.setAttribute("aria-label",`${e.name} settings`),m.innerHTML=Gs(),m.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),si(e)}),s.appendChild(m)}let c=ii(e.name,Se(e.name),!!e.required),u=c.querySelector("input");if(u?.addEventListener("click",m=>m.stopPropagation()),u?.addEventListener("change",()=>{Nr(e.name)}),s.appendChild(c),o.append(r,s),n.appendChild(o),e.description){let m=document.createElement("div");m.className="bloom-card-desc",m.textContent=e.description,n.appendChild(m)}let p=document.createElement("div");p.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let E=document.createElement("div");return E.className="bloom-card-author",E.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(E),t.append(n,p,S),t}function li(){return Object.values(_).filter(e=>!e.hidden&&e.name!=="Settings")}function ci(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function al(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function sl(){return kn.trim()?"No plugins match your search.":ee==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function ll(){let e=li();return Fs.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>ci(n,t.id)))}function cl(){if(bt){bt.replaceChildren();for(let e of ll()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${ee===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{ee=e.id,ce()}),bt.appendChild(t)}}}function dl(){let e=li();if(ee==="favorites"){let t=new Set(rn());e=e.filter(n=>t.has(n.name))}else ee!=="all"&&(e=e.filter(t=>ci(t,ee)));return wt==="enabled"&&(e=e.filter(t=>Se(t.name))),wt==="disabled"&&(e=e.filter(t=>!Se(t.name))),e}function ce(){if(!gt)return;cl();let e=dl();En&&(En.placeholder=`Search ${e.length} plugins...`);let t=e,n=kn.trim().toLowerCase();if(n&&(t=t.filter(o=>al(o).includes(n))),ee!=="favorites"){let o=on();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}gt.replaceChildren();for(let o of t)gt.appendChild(il(o));ht&&(ht.hidden=t.length>0,ht.textContent=sl())}function X(e){e.stopPropagation()}function Eo(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function To(){document.getElementById($)?.setAttribute("aria-expanded",Q?"true":"false")}function ul(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function ko(){Ae(),kn="",wt="all",ee="all",document.getElementById(de)?.remove(),Q=!1,To()}function fl(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",X),t.addEventListener("pointerup",X),t.addEventListener("click",X);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Mn();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=ti(),s.addEventListener("click",ko),o.append(r,s),n.appendChild(o);let l=document.createElement("div");l.className="bloom-section-head";let d=document.createElement("h3");d.textContent="Plugins";let c=document.createElement("p");c.textContent="Turn Bloom++ features on or off. Sliders icon opens options.",l.append(d,c),n.appendChild(l);let u=document.createElement("div");u.className="bloom-plugin-tabs",n.appendChild(u);let p=document.createElement("div");p.className="bloom-search-bar";let S=document.createElement("input");S.type="search",S.className="bloom-search-input",S.setAttribute("aria-label","Search plugins"),S.placeholder="Search plugins...",S.addEventListener("input",()=>{kn=S.value,ce()});let E=document.createElement("select");E.className="bloom-search-filter",E.setAttribute("aria-label","Filter plugins");for(let z of js){let K=document.createElement("option");K.value=z.value,K.textContent=z.label,E.appendChild(K)}E.value=wt,E.addEventListener("change",()=>{wt=E.value,ce()}),p.append(S,E),n.appendChild(p);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let h=document.createElement("p");return h.className="bloom-tab-empty",h.hidden=!0,n.appendChild(h),t.appendChild(n),gt=m,ht=h,En=S,ei=E,bt=u,ce(),t}function ml(e){e.classList.add("bloom-rail-dock")}function pl(){let e=document.getElementById($);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&pn(e)?e:null}function gl(){if(document.getElementById(de)?.remove(),!document.body)return;let e=fl(de);ml(e),document.body.appendChild(e),Q=!0,Ae(),yt(),To(),se("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:P,dock:"center",rail:!!pl()})}function Mo(){let e=document.getElementById(de);if(e instanceof HTMLElement&&e.isConnected&&ul(e)){ko();return}e?.remove(),gl()}function hl(){let e=document.createElement("button");return e.type="button",e.id=$,e.className="bloom-rail-item",e.setAttribute("aria-controls",de),e.setAttribute("aria-expanded",Q?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${Mn()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Mo()}),e}function Xr(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function bl(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function yl(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function J(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function di(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=bl(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&J(e,"padding-top",Math.round(i)),Number.isFinite(a)&&J(e,"padding-bottom",Math.round(a)),o){let l=o.getBoundingClientRect(),d=Math.max(20,Math.round(l.width));J(n,"width",d),J(n,"height",Math.max(20,Math.round(l.height)));let c=e.getBoundingClientRect(),u=Math.round(l.left-c.left);u>=0&&u<=40&&J(e,"padding-left",u);let p=yl(t,o);if(p){let S=p.getBoundingClientRect(),E=n.getBoundingClientRect(),m=Math.round(S.left-E.right);m>=0&&m<=24&&J(e,"gap",m)}}else{let l=Number.parseFloat(r.paddingLeft),d=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(l)&&J(e,"padding-left",Math.round(l)),Number.isFinite(d)&&d>0&&J(e,"gap",Math.round(d))}let s=ni(t);s&&e.style.setProperty("--bloom-rail-surface",s)}function Ln(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function vl(){if(vt?.isConnected&&U){U.observe(vt,{childList:!0});return}Lo()}function xl(e){if(Ln(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function wl(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){pt=0;return}pt+=1,xt=Date.now()+Math.min(8e3,250*2**Math.min(pt,5))})}function El(){Me||Date.now()<xt||(Me=requestAnimationFrame(()=>{Me=0,!(Date.now()<xt)&&(document.getElementById($)?.isConnected||Cn())}))}function Cn(){if(!document.body)return;U?.disconnect();let e=null,t=!1;try{let n=document.getElementById($);e=n instanceof HTMLButtonElement?n:hl();let o=ke(),r=go();if(o){let i=ho(o),a=i.parentElement;if(Ln(i)||a&&Ln(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),Xr(e),di(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),Xr(e,!0)):e.isConnected&&!pn(e)&&(e.remove(),e=null)}finally{wl(e,t),vl(),To()}}function Lo(){let e=Ur();!e||!xl(e)||vt===e&&U||(U?.disconnect(),vt=e,U=new MutationObserver(()=>{document.getElementById($)?.isConnected||El()}),U.observe(e,{childList:!0}))}function Sl(){Cn(),Lo(),mt===void 0&&(mt=window.setInterval(()=>{let e=document.getElementById($);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=xt&&Cn();else{pt=0;let t=ke();t&&di(e,t)}Lo()},_s))}function Ll(){mt!==void 0&&(clearInterval(mt),mt=void 0),Me&&cancelAnimationFrame(Me),Me=0,xt=0,pt=0,U?.disconnect(),U=null,vt=null}function Cl(e){bn===e&&Z||(Z?.disconnect(),bn=e,Z=new MutationObserver(()=>{if(!e.isConnected){Z?.disconnect(),Z=null,bn=null;return}ui(e)}),Z.observe(e,{childList:!0}))}function ui(e){if(Cl(e),e.querySelector(`#${vn}`))return;let t=document.createElement("button");t.type="button",t.id=vn,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${Mn()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Eo),t.addEventListener("pointerup",Eo),t.addEventListener("click",n=>{Eo(n),Mo()}),e.insertBefore(t,e.firstChild)}function hn(){let e=Kr();return e?(ui(e),!0):!1}function Tl(e){Vr(e)&&(queueMicrotask(hn),requestAnimationFrame(()=>{hn()}),window.setTimeout(hn,60),window.setTimeout(hn,180))}function kl(){wn?.abort();let e=new AbortController;wn=e,document.addEventListener("click",Tl,{signal:e.signal})}function Ml(){wn?.abort(),wn=null,Z?.disconnect(),Z=null,bn=null}function fi(){Le(),Js(()=>{ri(),oi(),Cn(),Mo()})}var mi=g({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[b.p],required:!0,hidden:!0,enabledByDefault:!0,settings:$s,startAt:"HostReady",cleanupSelectors:[`#${Ds}`,`#${$}`,`#${vn}`,`#${de}`,`#${Tn}`,`#${Et}`,`#${xn}`,"#bloom-menu-panel"],start(){ri(),oi(),Sl(),kl(),gn?.(),gn=Jr(yt),yt(),xo=[Xt("pluginToggle",()=>{Q&&ce()}),Xt("pluginPin",()=>{Q&&ce()}),Xt("pluginStar",()=>{Q&&ce()})]},stop(){Ll(),Ml(),gn?.(),gn=null;for(let e of xo)e();xo=[],ko(),document.getElementById($)?.remove(),document.getElementById(vn)?.remove(),document.getElementById(xn)?.remove(),Qr=null,qs=null,gt=null,ht=null,En=null,ei=null,bt=null,Q=!1},onSettingsChange:yt});var hi='form[data-type="unified-composer"], form.w-full[data-type]',Pe=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),An=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),pi=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),gi=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Al=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function R(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ue(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!R(r)))return r;return null}function bi(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function M(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=bi(e);return!!(Al.test(n)||/^stop$/i.test(n))}function te(){let t=Array.from(document.querySelectorAll(hi)).find(R);if(t instanceof HTMLElement)return t;let n=ue(document,Pe),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function fe(){let e=Array.from(document.querySelectorAll(Pe));return e.find(R)??e[0]??null}function Ao(){let e=fe();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Pl(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function yi(e){let t=te();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!R(n))&&e(n))return n;return null}function Pn(){let e=te(),t=ue(e,An)??ue(document,An);return t&&!M(t)?t:yi(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!M(n);let r=bi(n);return/^(send|send prompt|发送)$/i.test(r)&&!M(n)})}function Po(){let e=Pn();return!!e&&Pl(e)}function Ro(){let e=te(),t=ue(e,pi,!0)??ue(document,pi,!0);if(t)return t;let n=ue(e,gi)??ue(document,gi);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&R(o)&&M(o))return o}return yi(M)}function Re(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var vi="bloom-host-icon",St="data-bloom-host-rel",No="not all",Ho=0,xi=0,Rl=400;function wi(e){Ho+=1;try{e()}finally{Ho-=1}}function Rn(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Ne(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Ei(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Nl(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Hl(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-xi<Rl||(xi=n,e.appendChild(t))}function Il(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||Rn(n)&&(n.getAttribute(St)||n.setAttribute(St,n.rel),n.media!==No&&(n.media=No),n.rel!==vi&&(n.rel=vi))}function Ol(e){for(let t of e.querySelectorAll(`link[${St}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(St);n&&(t.rel=n),t.removeAttribute(St),t.media===No&&t.removeAttribute("media")}}function Io(e,t){let{head:n}=document;!n||!t||wi(()=>{Il(n,e);let o=Ei(e),{type:r,sizes:i}=Nl(t);o?Hl(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Si(e,t){let{head:n}=document;n&&wi(()=>{Ei(e)?.remove(),Ol(n)})}function Li(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(Ho)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:Rn(l.target)&&(a=!0,Ne(l.target.href)&&(s=l.target.href)));for(let d of l.removedNodes)Rn(d)&&d.id===e&&(a=!0);for(let d of l.addedNodes)Rn(d)&&d.id!==e&&(a=!0,Ne(d.href)&&(s=d.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var Ci=/\/c\/([a-zA-Z0-9_-]{8,})/i;function N(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=d=>{let c=n.indexOf(d);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(d,c)=>{try{return document.querySelector(d)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function He(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Lt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(Ci)?.[1]??""}catch{return e.match(Ci)?.[1]??""}}function Nn(){let e=Lt(location.pathname);if(e)return e;let n=N().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function Bl(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!R(t))&&(M(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Dl(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&R(e))}function _l(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&R(e))}function $l(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function ne(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function H(){if(Ro()||Bl())return!0;let e=Pn();return e&&R(e)&&!M(e)?!1:!!(Dl()||_l()||$l())}var ql=["original","badge","dot","hole","bg"],Mi=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Ai={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Hn="#FCFCFC",jl="#111111",Ti="#111111",Fl="#ffffff",Gl="#212121",zl="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Kl={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},In=32,ki=64;function Pi(e){return typeof e=="string"&&ql.includes(e)}function Ul(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function On(e){let t=document.createElement("canvas");t.width=In,t.height=In;let n=t.getContext("2d");return n?(n.scale(In/ki,In/ki),e(n),t.toDataURL("image/png")):""}function Vl(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function Bn(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(zl);n&&(e.strokeStyle=jl,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Wl(e,t,n){let o=Ai[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Ti,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Ti,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Fl,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Ct(e,t){if(e==="original")return t==="wait"?On(o=>Bn(o,Hn)):Ul(Kl[t]);let n=t==="wait"?void 0:Ai[t];return On(e==="hole"?o=>Bn(o,n??Hn):e==="bg"?o=>{o.fillStyle=n??Gl,Vl(o,0,0,64,64,14),o.fill(),Bn(o,Hn,!1)}:o=>{Bn(o,Hn),t!=="wait"&&Wl(o,t,e==="dot"?"dot":"badge")})}function Ri(e){return{wait:Ct(e,"wait"),rotate:Ct(e,"rotate"),done:Ct(e,"done"),ready:Ct(e,"ready"),error:Ct(e,"error")}}var Yl=new w("ChatStateFavicons"),pe="bloom-chat-state-favicon",Oi=y({style:{type:3,description:"Favicon overlay",options:Mi}}),Oe="",_n={wait:"",rotate:"",done:"",ready:"",error:""},$n="wait",kt=!1,V=!1,I=null,Mt="",At="",Pt=!0,Tt=null,Be=0,Ie,Dn=null,me=null,Oo=null,Rt=!1,Ni=new WeakSet,Jl=400;function Zl(){let e=Oi.store.style;return Pi(e)?e:"bg"}function Xl(){let t=document.querySelector(`link[rel~="icon"]:not(#${pe})`)?.href;return Ne(t)?t:Ne(Oe)?Oe:""}function O(e){if($n===e){let t=document.getElementById(pe);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===_n[e])return}$n=e,Io(pe,_n[e])}function Hi(){_n=Ri(Zl()),O($n)}function Ql(){let e=N(),t=e?He(e):He("");return H()?(!Mt&&t&&(Mt=t),Mt||t):(Mt="",t)}function Bi(){kt=!1,V=!1,I=null,Mt=""}function ec(e){At=e,Bi(),Pt=!1,O("wait")}function Di(){if(!Rt)return;let e=N()||location.pathname;if(At&&e&&At!==e){ec(e);return}e&&(At=e);let t=Ql(),n=H(),o=Ao(),r=Po();if(ne()&&!n){O("error"),kt=!1,V=!1,I=null;return}if(n){kt=!0,V=!1,I=t,O("rotate");return}if(kt){let i=!!I&&!!t&&I===t;if(kt=!1,i){V=!0,I=t,O("done");return}V=!1,I=null}if(V)if(!!(I&&t&&I!==t))V=!1,I=null;else if(o){O("done");return}else if(Pt){V=!1,O("ready");return}else{V=!1,O("wait");return}I=null,O(o?"wait":Pt?"ready":"wait")}function _i(){let e=te();if(!(me&&Oo===e&&e.isConnected)){if(me?.disconnect(),Oo=e,!e||e===document.body){me=null;return}me=new MutationObserver(()=>qn()),me.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function qn(){!Rt||Be||(Be=requestAnimationFrame(()=>{Be=0,Rt&&($i(),_i(),Di())}))}function Ii(){Pt=!0,qn()}function $i(){let e=fe();!e||Ni.has(e)||(Ni.add(e),e.addEventListener("input",Ii,{passive:!0}),e.addEventListener("compositionend",Ii,{passive:!0}))}var qi=g({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Oi,startAt:"DOMContentLoaded",cleanupSelectors:[`#${pe}`],start(){Rt=!0,Oe=Xl()||Oe,Hi(),Dn?.disconnect(),Dn=Li(pe,e=>{Ne(e)&&(Oe=e),Io(pe,_n[$n])}),Tt?.abort(),Tt=new AbortController,window.addEventListener("popstate",qn,{signal:Tt.signal}),$i(),_i(),Ie!==void 0&&clearInterval(Ie),Ie=setInterval(qn,Jl),Di(),Yl.debug("favicon watch started")},stop(){Rt=!1,Be&&cancelAnimationFrame(Be),Be=0,Ie!==void 0&&(clearInterval(Ie),Ie=void 0),Tt?.abort(),Tt=null,me?.disconnect(),me=null,Oo=null,Dn?.disconnect(),Dn=null,Bi(),At="",Pt=!0,Si(pe,Oe)},onSettingsChange:Hi});var ji=`.bloom-ih-hud {
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
`;var Fi=new w("InputHistory"),Bo=/\u200B/g,Gi=10,zi=500,Ki=100,nc=8,oc=120,rc=2e3,jn=10,Fn=y({maxEntries:{type:4,description:"Max stored prompts",min:Gi,max:zi,default:Ki},history:{type:5,description:"Stored prompts",render:vc},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Do=new Map,L=0,_o="",q=!1,Ht=!1,jo=0,Nt=null,$o,Fo=null,Ui=!0;function B(){let e=Fn.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Vi(e){let t=Qt(Number(Fn.store.maxEntries??Ki),Gi,zi);return e.length>t?e.slice(e.length-t):e}function Gn(e){Fn.store.entries=Vi(e)}function ic(e){return e.replaceAll(Bo,"").replace(/\n$/,"").trim()}function qo(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Pe);return n instanceof HTMLElement?n:fe()}function ac(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Re(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Bo,"").trim().length===0,last:i.toString().replaceAll(Bo,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Wi(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Fi.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Yi(e){clearTimeout($o),$o=setTimeout(()=>{if(e!==jo)return;Ht=!1;let t=Fo;t&&Wi(t,Ui)},oc)}function Ji(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ht=!0,Fo=e,Ui=n;let i=++jo;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Fi.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Wi(e,n),Yi(i)}function sc(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function De(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function lc(){document.querySelector(".bloom-ih-hud")?.remove()}function cc(e,t){let n=sc();n.textContent=e;let o=(t.closest("form")??te()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-nc)}px`,n.classList.add("bloom-ih-hud-on")}function Go(e){let t=ic(e);if(!t)return;let n=Date.now(),o=Do.get(t);if(o&&n-o<rc)return;Do.set(t,n);let r=B().filter(i=>i!==t);r.push(t),Gn(r),L=B().length,q=!1,De()}function dc(e,t){let n=B();if(!n.length&&e)return;L>=n.length&&(_o=Re(t),L=n.length);let o=e?L-1:L+1;o<0||o>n.length||(L=o,q=!0,Ji(t,o===n.length?_o:n[o],e),o<n.length?cc(`${o+1} / ${n.length}`,t):De())}function uc(e){q=!1,De(),Ji(e,_o,!1),L=B().length}function fc(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=qo(e.target)??qo(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&q&&!e.altKey&&!e.shiftKey){uc(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Go(Re(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=B();if(!o){let i=ac(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||L<=0)||!n&&L>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),dc(n,t))}function mc(e){if(qo(e.target)){if(Ht){Yi(jo);return}q&&(q=!1,De(),L=B().length)}}function pc(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Pe);n instanceof HTMLElement&&Go(Re(n))}function gc(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(An);if(!n||!(n instanceof HTMLElement)||M(n))return;let o=fe();o&&Go(Re(o))}function hc(e){if(!(!q||Ht)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}q=!1,De()}}function bc(){if(Nt)return;Nt=new AbortController;let{signal:e}=Nt,t={capture:!0,signal:e};window.addEventListener("keydown",fc,t),window.addEventListener("input",mc,t),window.addEventListener("submit",pc,t),window.addEventListener("click",gc,t),window.addEventListener("pointerdown",hc,t)}function yc(e){let t=B().slice();t.splice(e,1),Gn(t),L>t.length&&(L=t.length)}function vc(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=B().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(h=>h.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/jn));n>=l&&(n=l-1);let d=s.slice(n*jn,n*jn+jn);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),d.length){let h=document.createElement("div");h.className="bloom-ih-list",d.forEach((z,K)=>{let ds=i.indexOf(z),us=B().length-1-ds,io=document.createElement("div");io.className="bloom-ih-item";let it=document.createElement("button");it.type="button",it.className=`bloom-ih-body${o===K?"":" bloom-ih-clamp"}`,it.textContent=z,it.addEventListener("click",()=>{o=o===K?-1:K,r()});let ao=document.createElement("div");ao.className="bloom-ih-actions";let at=document.createElement("button");at.type="button",at.title="Copy",at.textContent="C",at.addEventListener("click",()=>{xr(z)});let st=document.createElement("button");st.type="button",st.title="Delete",st.textContent="\xD7",st.addEventListener("click",()=>{yc(us),r()}),ao.append(at,st),io.append(it,ao),h.appendChild(io)}),e.appendChild(h)}else{let h=document.createElement("p");h.className="bloom-ih-empty",h.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(h)}let u=document.createElement("div");u.className="bloom-ih-pager";let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Prev",p.disabled=n<=0,p.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${l}`;let E=document.createElement("button");E.type="button",E.className="bloom-ih-btn",E.textContent="Next",E.disabled=n+1>=l,E.addEventListener("click",()=>{n+=1,r()});let m=document.createElement("button");m.type="button",m.className="bloom-ih-clear",m.textContent="Clear all",m.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Gn([]),L=0,r())}),u.append(p,S,E,m),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Zi=g({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Fn,startAt:"HostReady",managedStyle:"inputHistory",start(){v("inputHistory",ji),L=B().length,q=!1,bc()},stop(){Nt?.abort(),Nt=null,De(),lc(),Do.clear(),clearTimeout($o),Ht=!1,Fo=null,q=!1},onSettingsChange(){let e=B(),t=Vi(e);t.length!==e.length&&Gn(t),L>t.length&&(L=t.length)}});var zo="noShareLink",xc=['button[data-testid="share-chat-button"]'],wc=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Ko=y({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Xi(e){return`${e.join(",")}{display:none!important}`}function Qi(){let e=[];if(Ko.store.hideShareChat!==!1&&e.push(Xi(xc)),Ko.store.hideShareProject!==!1&&e.push(Xi(wc)),!e.length){x(zo);return}v(zo,e.join(`
`))}var ea=g({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ko,start:Qi,onSettingsChange:Qi,stop(){x(zo)}});var oa="noDictation",Ec=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Sc=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],ra=y({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function ta(e){return`${e.join(",")}{display:none!important}`}function na(){let e=[ta(Ec)];ra.store.hideDictationSettings!==!1&&e.push(ta(Sc)),v(oa,e.join(`
`))}var ia=g({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:ra,start:na,onSettingsChange:na,stop(){x(oa)}});var Uo="noSidebarIdentity",Kn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],la=Kn.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Lc=Kn.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Cc=[...la,...Lc],Tc=Kn.map(e=>`${e} a[href^="mailto:"]`),kc=Kn.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),zn=y({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0}});function aa(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Mc(){return`${kc.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function sa(){let e=zn.store.hideUsername!==!1,t=zn.store.hideEmail!==!1,n=e&&zn.store.enlargePlan!==!1,o=[];if(e&&o.push(aa(n?la:Cc)),t&&o.push(aa(Tc)),n&&o.push(Mc()),!o.length){x(Uo);return}v(Uo,o.join(`
`))}var ca=g({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:zn,start:sa,onSettingsChange:sa,stop(){x(Uo)}});var da=`#bloom-rt-host {
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
`;var ma=new w("RecentTopics"),qe="bloom-rt-host",pa="home",ga=/^\/c\/([a-z0-9_-]{8,})/i,Pc=/\/c\/([a-z0-9_-]{8,})/i,ha=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Rc=new Set(["Backquote","IntlBackslash"]),Nc=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Hc=140,Ic=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),C=y({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Ic},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Un=null,Vo=null,A=!1,$t=!1,It=!1,j=0,ge="",_e=null,Ot=null,$e;function Oc(){let e=Number(C.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Bt(){let e=C.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Wo(){let e=C.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ba(){let e=C.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Yo(){let e=C.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Wn(e){let t=Oc();return e.length>t?e.slice(0,t):e}function F(e){return e===pa}function Dt(e,t=Hc){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Jo(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(ga)?.[1]??""}catch{return e.match(Pc)?.[1]??""}}function he(){let e=(location.pathname||"/").match(ga);if(e?.[1])return e[1];let n=N().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return pa}function Zo(e){if(F(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Jo(o.getAttribute("href")||"")!==e)continue;let r=Dt(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return he()===e&&t&&!/^ChatGPT$/i.test(t)?Dt(t,80):""}function Bc(e){return F(e)?"New chat":Wo()[e]||Zo(e)||"Chat"}function Dc(e){return Yo()[e]||""}function _c(e){return ba()[e]||{}}function ya(e,t){if(!e||F(e)||!t)return;let n=Wo();n[e]!==t&&(n[e]=t,C.store.titles=n)}function $c(e,t){if(!e||F(e)||!t)return;let n=Yo();n[e]!==t&&(n[e]=t,C.store.projects=n)}function qc(e,t){if(!e||F(e)||!t.user&&!t.assistant)return;let n=ba(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,C.store.previews=n)}function Xo(e){if(!e||F(e)&&C.store.includeHome===!1)return;let t=Bt().filter(n=>n!==e);t.unshift(e),C.store.visits=Wn(t)}function Yn(){let e=C.store.includeHome!==!1;return Wn(Bt().filter(n=>e||!F(n))).map(n=>({id:n,title:Bc(n),project:Dc(n),preview:_c(n)}))}function ua(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return Dt(r)}catch{return""}}function _t(e){if(!e||F(e)||e!==he())return;let t=Zo(e);t&&ya(e,t);let n=ua("user"),o=ua("assistant");qc(e,{user:n,assistant:o});let r=xa(e);if(r){let i=va(r);i&&$c(e,i)}}function Qo(){let e=Wo(),t=Yo(),n=[],o=new Set,r=!1,i=!1;try{for(let d of document.querySelectorAll('a[href*="/c/"]')){if(d.closest(`#${qe}, #bloom-root, #bloom-sidebar-panel`))continue;let c=Jo(d.getAttribute("href")||"");if(!c||o.has(c))continue;o.add(c),n.push(c);let u=Dt(d.textContent||"",80);u&&!ha.test(u)&&e[c]!==u&&(e[c]=u,r=!0);let p=va(d);p&&t[c]!==p&&(t[c]=p,i=!0)}}catch{}r&&(C.store.titles=e),i&&(C.store.projects=t);let a=Bt(),s=new Set(a),l=n.filter(d=>!s.has(d));l.length&&(C.store.visits=Wn([...a,...l]))}function va(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=Dt((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!ha.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function xa(e){if(F(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Jo(t.getAttribute("href")||"")===e)return t}catch{}return null}function jc(e){let t=xa(e);if(t){t.click();return}if(F(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Fc(){let e=he();ge&&ge!==e&&_t(ge),ge=e,Xo(e),Qo();let t=Zo(e);t&&ya(e,t),_t(e)}function Vn(){$e===void 0&&($e=window.setTimeout(()=>{$e=void 0,Fc()},120))}function Gc(){_e||(_e=history.pushState.bind(history),Ot=history.replaceState.bind(history),history.pushState=function(...t){let n=_e(...t);return Vn(),n},history.replaceState=function(...t){let n=Ot(...t);return Vn(),n})}function zc(){_e&&(history.pushState=_e),Ot&&(history.replaceState=Ot),_e=null,Ot=null}function Kc(e){return Rc.has(e.code)||e.keyCode===192?!0:Nc.has(e.key)}function wa(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Uc(e,t){$t=t,Qo(),_t(he()),A=!0,j=0;try{let n=he();Xo(n);let o=Yn();o.length>1&&(j=e?o.length-1:1)}catch(n){ma.error("Failed to open switcher:",n)}qt()}function fa(e){let{length:t}=Yn();t&&(j=(j+(e?-1:1)+t)%t,qt())}function er(){if(!A)return;let e=Yn()[j];A=!1,$t=!1,qt(),e&&jc(e.id)}function Ea(){A&&(A=!1,$t=!1,qt())}function Vc(e){if(wa(e)){It=!0;return}if((e.ctrlKey||It)&&!e.altKey&&!e.metaKey&&Kc(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{A?fa(e.shiftKey):Uc(e.shiftKey,!0)}catch(n){ma.error("Hotkey failed:",n)}return}if(A){if(e.key==="Escape"){e.preventDefault(),Ea();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),er();return}e.key==="Tab"&&(e.ctrlKey||It)&&(e.preventDefault(),fa(e.shiftKey))}}function Wc(e){wa(e)&&(It=!1,A&&$t&&er())}function Yc(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Vn)}function Jc(e){!A||(e.target instanceof Element?e.target:null)?.closest(`#${qe}`)||Ea()}function Zc(){document.visibilityState==="hidden"&&_t(he())}function Xc(){if(!document.body)return null;let e=document.getElementById(qe);if(e instanceof HTMLElement)return Vo=e,e;e=document.createElement("div"),e.id=qe;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Vo=e,e}function qt(){let e=Xc();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!A){t.dataset.visible="false",t.replaceChildren();return}let n=Yn();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}j>=n.length&&(j=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===j?"true":"false",s.setAttribute("aria-selected",a===j?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let d=document.createElement("div");d.className="bloom-rt-project",d.textContent=i.project,s.append(d)}if(i.preview.user||i.preview.assistant){let d=document.createElement("div");if(d.className="bloom-rt-preview",i.preview.user){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="user",c.textContent=i.preview.user,d.append(c)}if(i.preview.assistant){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="assistant",c.textContent=i.preview.assistant,d.append(c)}s.append(d)}s.addEventListener("click",()=>{j=a,er()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Qc(){document.getElementById(qe)?.remove(),Vo=null}var Sa=g({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${qe}`],settings:C,start(){v("recentTopics",da),ge=he(),Xo(ge),Qo(),_t(ge),Gc(),Un=new AbortController;let{signal:e}=Un;window.addEventListener("keydown",Vc,{capture:!0,signal:e}),window.addEventListener("keyup",Wc,{capture:!0,signal:e}),window.addEventListener("popstate",Vn,{signal:e}),document.addEventListener("click",Yc,{capture:!0,signal:e}),document.addEventListener("click",Jc,{signal:e}),document.addEventListener("visibilitychange",Zc,{signal:e})},stop(){Un?.abort(),Un=null,$e!==void 0&&(clearTimeout($e),$e=void 0),zc(),A=!1,$t=!1,It=!1,Qc()},onSettingsChange(){let e=Wn(Bt());e.length!==Bt().length&&(C.store.visits=e),A&&qt()}});var tr="cleaner",ed=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],td=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],nd=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],od=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],rd=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]'],id=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],be=y({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function je(e){return`${e.join(",")}{display:none!important}`}function La(){let e=[];if(be.store.hideDownloadApps!==!1&&e.push(je(ed)),be.store.hideDisclaimer!==!1&&e.push(je(td)),be.store.hideUpgrade!==!1&&e.push(je(nd)),be.store.hideLockedModels!==!1&&e.push(je(od)),be.store.hideHomePromo!==!1&&e.push(je(rd)),be.store.hideAds!==!1&&e.push(je(id)),!e.length){x(tr);return}v(tr,e.join(`
`))}var Ca=g({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:be,start:La,onSettingsChange:La,stop(){x(tr)}});var Jn=new w("ResponseNotification"),ad=400,sd=3,Ue=y({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:pd},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),nr=!1,xe=!1,ye=0,ve="",Ke=!1,jt="",Fe,Ge=null,ze=null;function Ta(){return He(N())}function ld(){return document.visibilityState==="hidden"||document.hidden}function cd(){return Ue.store.onlyWhenHidden===!1?!0:ld()}function dd(){let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function ka(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!ze||ze.state==="closed")&&(ze=new e);let t=ze,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){Jn.debug("chime failed",e)}}function ud(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){Jn.debug("custom sound failed",t),ka()}}function Ma(){let e=String(Ue.store.soundUrl||"").trim();e?ud(e):ka()}function fd(){let e="Bloom++",t=`${dd()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Jn.debug("notification failed",n)}}function md(){cd()&&(Ue.store.sound!==!1&&Ma(),Ue.store.browserNotification!==!1&&fd())}function pd(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>Ma()),e.appendChild(t),()=>{t.remove()}}function gd(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&M(n)&&(Ke=!0)}function hd(){if(!nr)return;let e=N()||location.pathname;if(jt&&e&&jt!==e){xe=!1,ye=0,ve="",Ke=!1,jt=e;return}jt=e;let t=H(),n=Ta();if(t){xe=!0,ye=0,ve=n;return}if(!xe||(ye+=1,ye<sd))return;let o=!!ve&&ve===n,r=Ke,i=ne();xe=!1,ye=0,Ke=!1,ve="",!(!o||r||i)&&md()}var Aa=g({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Ue,start(){nr=!0,xe=H(),ye=0,ve=xe?Ta():"",Ke=!1,jt=N()||location.pathname,Ge?.abort(),Ge=new AbortController,document.addEventListener("click",gd,{capture:!0,signal:Ge.signal}),Fe!==void 0&&clearInterval(Fe),Fe=setInterval(hd,ad),Ue.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Ge.signal}),Jn.debug("watch started")},stop(){nr=!1,Fe!==void 0&&(clearInterval(Fe),Fe=void 0),Ge?.abort(),Ge=null,xe=!1,ye=0,ve="",Ke=!1;try{ze?.close()}catch{}ze=null}});var Pa=`.bloom-cls {
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
`;var Ia=new w("ChatListStatus"),Ra="chatListStatus",Qn="bloom-cls",yd="bloom-cls",vd=500,xd=1200*1e3,wd="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",re=new Map,ie=!1,We="",Ft=!1,Ve,Je=0,oe=null,rr=null,Ye=null,Ze=null,Zn=null,Gt=null,zt=!1;function Xn(){return Date.now()}function Ed(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Oa(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function Sd(e,t){return!(t!=="POST"||!/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e))}function Ld(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Ba(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Cd(e){return typeof e=="string"?Ba(e):""}function G(e,t,n,o=!0){if(!(!e||!ie)){if(t==="idle")re.delete(e);else{let r=re.get(e);r&&r.kind===t&&n!=="net"?r.at=Xn():re.set(e,{kind:t,at:Xn(),source:n})}o&&Td({v:1,id:e,kind:t,at:Xn()}),eo()}}function Td(e){try{Ye?.postMessage(e)}catch{}}function kd(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||G(t.id,t.kind,"bc",!1)}function Md(){let e=Xn();for(let[t,n]of re)n.kind==="streaming"&&e-n.at>xd&&re.delete(t)}function Ad(){let e=Oa();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(wd))continue;let r=Lt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Na(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function or(e){let t=e.querySelector(`:scope > .${Qn}`);return t||null}function Pd(){if(!ie)return;Md();let e=Nn(),t=Ad();oe?.disconnect();try{for(let n of t){let o=Lt(n.getAttribute("href")||"");if(!o||!e||o!==e){or(n)?.remove();continue}let i=re.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){or(n)?.remove();continue}let a=or(n);a||(a=document.createElement("span"),a.className=Qn,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Na("streaming")):i==="error"&&a.appendChild(Na("error")))}}catch(n){Ia.debug("paint failed",n)}Da()}function eo(){!ie||Je||(Je=requestAnimationFrame(()=>{Je=0,ie&&Pd()}))}function Da(){let e=Oa();if(!(oe&&rr===e&&e?.isConnected)){if(oe?.disconnect(),rr=e,!e){oe=null;return}oe=new MutationObserver(()=>eo()),oe.observe(e,{childList:!0,subtree:!0})}}async function Rd(e,t){let n=t,o=!e.ok,r=e.body;if(!r){n&&G(n,o?"error":"done","net");return}let i=r.getReader(),a=new TextDecoder,s="";try{for(;ie;){let{done:l,value:d}=await i.read();if(l)break;if(s+=a.decode(d,{stream:!0}),!n){let c=Ba(s);c&&(n=c,zt=!1,G(n,"streaming","net"))}/\[DONE\]/.test(s)||/"error"\s*:\s*\{/.test(s)?(/"error"\s*:\s*\{/.test(s)&&(o=!0),s=s.slice(-64)):s.length>8192&&(s=s.slice(-2048))}}catch{o=!0}n&&G(n,o?"error":"done","net")}function Nd(e,t,n){let o=Ld(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=Sd(o,r),a="";return i&&(a=Cd(n?.body)||Lt(o)||Nn(),a?G(a,"streaming","net"):zt=!0),e(t,n).then(s=>{if(!i)return s;try{let l=s.clone();Rd(l,a)}catch{a&&G(a,s.ok?"done":"error","net")}return s},s=>{throw i&&a&&G(a,"error","net"),s})}function Hd(){if(Ze)return;let e=Ed();Gt=e,Ze=e.fetch.bind(e);let t=(n,o)=>Nd(Ze,n,o);Zn=t,e.fetch=t}function Id(){!Ze||!Gt||(Zn&&Gt.fetch===Zn&&(Gt.fetch=Ze),Ze=null,Zn=null,Gt=null)}function Ha(){if(!ie)return;let e=Nn();if(We&&e&&We!==e){let n=re.get(We);n?.kind==="streaming"&&n.source==="local"&&G(We,ne()?"error":"done","local"),Ft=!1}if(We=e,H()){Ft=!0,e&&G(e,"streaming","local"),eo();return}Ft&&(Ft=!1,e&&G(e,ne()?"error":"done","local")),zt=!1,eo()}var _a=g({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Qn}`],start(){ie=!0,v(Ra,Pa);try{Ye=new BroadcastChannel(yd)}catch{Ye=null}Ye?.addEventListener("message",kd),Hd(),Da(),Ve!==void 0&&clearInterval(Ve),Ve=setInterval(Ha,vd),Ha(),Ia.debug("sidebar status watch started")},stop(){ie=!1,Je&&cancelAnimationFrame(Je),Je=0,Ve!==void 0&&(clearInterval(Ve),Ve=void 0),oe?.disconnect(),oe=null,rr=null,Id();try{Ye?.close()}catch{}Ye=null,re.clear(),zt=!1,Ft=!1,We="",document.querySelectorAll(`.${Qn}`).forEach(e=>e.remove()),x(Ra)}});var qa="widerChat",ja=40,Fa=96,Ga=64,za=y({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:ja,max:Fa,default:Ga}});function Od(){return Qt(Number(za.store.width??Ga),ja,Fa)}function $a(){let e=Od();v(qa,`:root{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="--thread-content-max-width"]{--thread-content-max-width:${e}rem!important}[class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:min(100%,${e}rem)!important}`)}var Ka=g({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:za,start:$a,onSettingsChange:$a,stop(){x(qa)}});var Ua=`.bloom-ts {
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
`;function to(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return to(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Va(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Wa(e){try{return new Date(e).toISOString()}catch{return""}}var Qa=new w("MessageTimestamps"),Ya="messageTimestamps",oo="bloom-ts",Ja=1500,Dd="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",tt=y({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),nt=new Map,we=!1,Qe=0,Xe,ae=null,ir=null,et=null,no=null,Kt=null,Za=!1;function _d(){return typeof unsafeWindow<"u"?unsafeWindow:window}function es(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function sr(){let e=tt.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ts(){let e={...sr()};for(let[n,o]of nt)e[n]=o;let t=Object.keys(e);if(t.length>Ja){let n=t.slice(t.length-Ja),o={};for(let r of n)o[r]=e[r];tt.store.stamps=o;return}tt.store.stamps=e}var $d=wr(ts,500);function ar(e,t){!e||!t||nt.get(e)===t||(nt.set(e,t),$d(),Vt())}function qd(e){return e?nt.get(e)??sr()[e]??null:null}function jd(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Fd(e,t){return t!=="GET"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Gd(e,t){return t!=="POST"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function Ut(e,t=0){if(!we||t>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let a of e)Ut(a,t+1);return}let n=e,o=n.message;if(o&&typeof o=="object"&&!Array.isArray(o)){let a=o,s=typeof a.id=="string"?a.id:"",l=to(a.create_time??a.createTime??a.created_at);s&&l&&ar(s,l)}let r=typeof n.id=="string"?n.id:"",i=to(n.create_time??n.createTime??n.created_at);if(r&&i&&(n.author||n.content||n.role||n.create_time||n.createTime)&&ar(r,i),n.mapping&&typeof n.mapping=="object")Ut(n.mapping,t+1);else if(t<3)for(let a of Object.values(n))a&&typeof a=="object"&&Ut(a,t+1)}function Xa(e){if(e)try{Ut(JSON.parse(e))}catch{}}async function zd(e){try{let t=await e.clone().json();Ut(t)}catch{}}async function Kd(e){let t=e.body;if(!t)return;let n=t.getReader(),o=new TextDecoder,r="";try{for(;we;){let{done:i,value:a}=await n.read();if(i)break;r+=o.decode(a,{stream:!0});let s=r.split(`
`);r=s.pop()??"";for(let l of s){let d=l.replace(/^data:\s*/,"").trim();!d||d==="[DONE]"||Xa(d)}r.length>16384&&(r=r.slice(-4096))}r&&Xa(r.replace(/^data:\s*/,""))}catch{}}function Ud(e,t,n){let o=jd(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=Fd(o,r),a=Gd(o,r);return e(t,n).then(s=>{if(i)zd(s);else if(a)try{Kd(s.clone())}catch{}return s})}function Vd(){if(et)return;let e=_d();Kt=e,et=e.fetch.bind(e);let t=(n,o)=>Ud(et,n,o);no=t,e.fetch=t}function Wd(){!et||!Kt||(no&&Kt.fetch===no&&(Kt.fetch=et),et=null,no=null,Kt=null)}function Yd(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Jd(){let e=es();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Dd)||t.push(n)}catch{}return t}function Zd(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Xd(){if(!we)return;let e=tt.store.hideOwnMessages===!0,t=tt.store.showDate!==!1,n=H(),o=Jd();ae?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=Yd(r),l=r.querySelector(`:scope > .${oo}`);if(e&&s==="user"){l?.remove();return}if(Zd(r)){l?.remove();return}let d=qd(a);if(!d&&a&&(n||Za)&&i>=o.length-2&&(d=Date.now(),ar(a,d)),!d){l?.remove();return}let c=Va(d,t);if(!c){l?.remove();return}let u=l;u||(u=document.createElement("time"),u.className=oo,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==c&&(u.textContent=c);let p=Wa(d);p&&u.getAttribute("datetime")!==p&&u.setAttribute("datetime",p)})}catch(r){Qa.debug("paint failed",r)}Za=n,ns()}function Vt(){!we||Qe||(Qe=requestAnimationFrame(()=>{Qe=0,we&&Xd()}))}function ns(){let e=es();if(!(ae&&ir===e&&e?.isConnected)){if(ae?.disconnect(),ir=e,!e||e===document.body){ae=null;return}ae=new MutationObserver(()=>Vt()),ae.observe(e,{childList:!0,subtree:!0})}}var os=g({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${oo}`],settings:tt,start(){we=!0,v(Ya,Ua);let e=sr();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&nt.set(t,n);Vd(),ns(),Xe!==void 0&&clearInterval(Xe),Xe=setInterval(Vt,800),Vt(),Qa.debug("timestamp watch started")},stop(){we=!1,Qe&&cancelAnimationFrame(Qe),Qe=0,Xe!==void 0&&(clearInterval(Xe),Xe=void 0),ae?.disconnect(),ae=null,ir=null,Wd(),ts(),nt.clear(),document.querySelectorAll(`.${oo}`).forEach(e=>e.remove()),x(Ya)},onSettingsChange:Vt});var lr="streamerMode",Qd="filter:blur(6px)!important;transition:filter .2s ease",eu="filter:none!important",Wt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],ot=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function D(e,t){return e.map(n=>`${n} ${t}`)}var rt=y({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0}});function Yt(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${Qd}}${t?`${o}{${eu}}`:""}`}function rs(){let e=[];if(rt.store.conversations!==!1&&e.push(Yt([...D(ot,'a[href^="/c/"]'),...D(ot,'a[href*="/c/"]')])),rt.store.projects!==!1&&e.push(Yt([...D(ot,'a[href*="/project"]'),...D(ot,'a[href*="/g/g-p-"]'),...D(ot,'[data-testid="project-name"]'),...D(ot,'[data-testid="project-link"]')])),rt.store.accountAvatar!==!1&&e.push(Yt([...D(Wt,"img"),...D(Wt,'[class*="avatar"]')],!1)),rt.store.accountName!==!1&&e.push(Yt([...D(Wt,".min-w-0 > .truncate"),...D(Wt,".min-w-0.flex-1 .truncate")],!1)),rt.store.accountEmail!==!1&&e.push(Yt([...D(Wt,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),!e.length){x(lr);return}v(lr,e.join(`
`))}var is=g({name:"StreamerMode",description:"Blur Recents titles, project names, and the account chip while you stream.",authors:[b.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:rt,start:rs,onSettingsChange:rs,stop(){x(lr)}});var Jt=new w("Bloom"),as=!1,tu=Date.now(),nu=[mi,qi,Zi,ea,ia,ca,Sa,Ca,Aa,_a,Ka,os,is];function ro(e){return new Promise(t=>setTimeout(t,e))}function ou(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var ls=8e3,ss=300,ru=250;async function iu(){if(le())return await ro(ss),!0;for(;Date.now()-tu<ls;)if(await ro(ru),le())return await ro(ss),!0;return le()||mo()}function cr(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function au(){if(cr())return!0;let e=Date.now()+ls;for(;Date.now()<e;)if(await ro(100),cr())return!0;return cr()}function su(){try{GM_registerMenuCommand?.("Bloom++ settings",fi)}catch{}}function lu(){ln(()=>{dt("HostShell"),Jt.info("host shell",P)}),cn(()=>{Jt.info("idle ready",P)}),dn(()=>{mr(),dt("HostReady"),Jt.info("chrome ready",P)})}async function dr(){await Er()}async function ur(){if(as)return;as=!0;for(let n of nu)try{Rr(n)}catch(o){Jt.error("register failed",n.name,o)}Ir(),dt("Init"),su(),lu();let e=()=>dt("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await ou(),au().then(n=>{n&&un()}),!await iu()){Jt.warn("late islands not detected; starting default plugins",P),Le(),fn();return}await qr()}var cs=typeof unsafeWindow<"u"?unsafeWindow:window,cu=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||cu){let e=cs.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",P);try{Object.defineProperty(cs,"Bloom",{value:fr,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}dr().then(()=>ur()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
