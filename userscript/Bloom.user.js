// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.40
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

/* Bloom++ [20260919] v1.4.40. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var bl=Object.defineProperty;var yl=(e,t)=>{for(var n in t)bl(e,n,{get:t[n],enumerable:!0})};var oi={};yl(oi,{REPO_URL:()=>Ni,Settings:()=>g,VERSION:()=>O,contextKeyFromUrl:()=>se,conversationTitle:()=>Ms,conversationToken:()=>R,currentConversationId:()=>le,hasDraftText:()=>Ge,hasLateIslands:()=>be,init:()=>ni,initSettings:()=>ti,isDocumentInteractive:()=>Hi,isUserDraftEmpty:()=>Ut,messageCreateTime:()=>As,plugins:()=>F,requestChromeReady:()=>qn,requestIdleReady:()=>_e,requestShellReady:()=>jn,setEditorText:()=>io,subscribeHarvest:()=>ct,whenChromeReady:()=>$n,whenIdleReady:()=>_n,whenShellReady:()=>Dn});var Q=new Map,Mn=!1;function vl(){return document.getElementById("bloom-root")?.shadowRoot??null}function xl(){return document.head??null}function Oe(){let e=vl();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=wl()}function jo(e,t){if(!Mn)return;let n=xl();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),Oe();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,Oe();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,Oe()}function S(e,t){let n=Q.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},Q.set(e,n)),Mn&&jo(e,n)}function ri(){Mn=!0;for(let[e,t]of Q)jo(e,t);return Oe(),!0}function ii(e){let t=Q.get(e);t&&(t.disabled=!1,Mn&&jo(e,t))}function ai(e){let t=Q.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),Oe())}function b(e){let t=Q.get(e);t&&(t.el?.remove(),Q.delete(e),Oe())}function wl(){return Array.from(Q.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var x=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var qo=new Map;function An(e,t){let n=qo.get(e);return n||(n=new Set,qo.set(e,n)),n.add(t),()=>n.delete(t)}function he(e,t){let n=qo.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var El="bloompp";function si(){return new Promise((e,t)=>{let n=indexedDB.open(El,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function li(e){try{let t=await si();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function ci(e,t){try{let n=await si();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function At(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Be(e,t,n){return Math.min(n,Math.max(t,e))}function di(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function ui(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function mi(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Pn=new x("SettingsStore"),ee="BloomSettings",Sl=100;function Nn(e){if(At(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(At(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return At(n)?n:null}return null}catch{return null}}var Rn=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[d,c]of this.defaultGetters)if(l.startsWith(d)){let u=l.slice(d.length+1);if(u&&!u.includes(".")){let m=c(u);m!==void 0&&(i[a]=m,s=m);break}}}return At(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Pn.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Sl))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ee,this.plain)}catch{try{GM_setValue(ee,t)}catch(n){Pn.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(ee,t)}catch{}ci(ee,t).catch(n=>Pn.warn("Failed to save settings to IndexedDB:",n))}catch(t){Pn.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){di(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Ll=new x("Settings"),Tl={plugins:{}},g=new Rn(structuredClone(Tl)),Cl=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function kl(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function w(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(g.store.plugins[n]||(g.store.plugins[n]={}),g.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?g.plain.plugins[n]??{}:{}}};return t}function Ml(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function fi(){let e=null;if(e=Nn(Ml(ee)),e||(e=Nn(await li(ee))),!e)try{e=Nn(localStorage.getItem(ee))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(g.plain.plugins=t),Ll.debug("Loaded settings")}}function pi(e,t){t&&(t.pluginName=e,g.plain.plugins[e]||(g.plain.plugins[e]={}),g.setDefaultGetter(Cl(e),n=>{if(n!=="enabled")return kl(t.def,n)}))}function gi(){return g.plain.plugins.Settings||(g.store.plugins.Settings={}),g.store.plugins.Settings}function Hn(){return gi().pinnedPlugins??[]}function hi(e){return Hn().includes(e)}function bi(e){let t=Hn(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function In(){return gi().starredPlugins??[]}function yi(e){return In().includes(e)}function vi(e){let t=In(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var On=new x("PluginManager"),F={},Pt=new Set;function Ei(e){if(F[e.name]){On.warn("Duplicate plugin",e.name);return}F[e.name]=e,pi(e.name,e.settings)}function De(e){let t=F[e];if(!t)return!1;if(t.required)return!0;let n=g.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Si(e){let t=F[e];if(!t||t.required)return;let n=!De(e);g.plain.plugins[e]||(g.store.plugins[e]={}),g.store.plugins[e].enabled=n,n?Li(t):Al(t),he("pluginToggle",{name:e,enabled:n})}function Li(e,t=!1){if(!Pt.has(e.name)&&De(e.name))try{e.managedStyle&&ii(e.managedStyle),e.start?.(),Pt.add(e.name),e.settings&&g.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Pt.has(e.name)&&e.onSettingsChange?.()}),t||On.debug("Started",e.name)}catch(n){On.error("Failed to start",e.name,n)}}function Al(e){if(Pt.has(e.name)){try{e.stop?.()}catch(t){On.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(ai(e.managedStyle),b(e.managedStyle)),Pt.delete(e.name)}}function Rt(e){for(let t of Object.values(F))(t.startAt??"DOMContentLoaded")===e&&Li(t)}var xi=2,wi="defaultsRev";function Ti(){for(let t of Object.values(F))g.plain.plugins[t.name]||(g.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=g.store.plugins.Settings??(g.store.plugins.Settings={});if(e[wi]!==xi){for(let t of["NoShareLink","NoDictation"]){let n=g.store.plugins[t]??(g.store.plugins[t]={});n.enabled=!1}e[wi]=xi}}var Nt=!1,Bn=!1,Fo=!1,ki=[],Mi=[],Ai=[];function zo(e){let t=e.splice(0);for(let n of t)n()}function Ht(){Nt||(Nt=!0,zo(ki))}function Go(){Bn||(Bn=!0,Nt||Ht(),zo(Mi))}function Pi(){Fo||(Fo=!0,Nt||Ht(),Bn||Go(),zo(Ai))}function Dn(e){Nt?e():ki.push(e)}function _n(e){Bn?e():Mi.push(e)}function $n(e){Fo?e():Ai.push(e)}function jn(){Ht()}function _e(){Ht(),Go()}function qn(){Pi()}function Ci(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Ri(){await Ci(4e3),Ht(),await Ci(4e3),Go(),Pi()}var y={p:"0-V-linuxdo"},O="[20260919] v1.4.40",Ni="https://github.com/0-V-linuxdo/Bloom";function Pl(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Rl(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Ko(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function be(){return Ko()?Pl()||Rl():!1}function Hi(){return be()}var Nl=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Ii=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Hl=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Il="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function je(e){return e.id==="bloom-root"||!!e.closest(Il)}function Oi(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Fn(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Uo(e){if(!(e instanceof HTMLElement)||!e.isConnected||je(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Fn(t)?!1:e.getClientRects().length>0}function $e(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Ol(){let e=[];for(let t of document.querySelectorAll(Nl))!(t instanceof HTMLElement)||!t.isConnected||je(t)||e.push(t);return e}function zn(e){if(!e.isConnected||je(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function It(){return Ol().filter(zn)[0]??null}function Vo(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||je(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Wo(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!je(n)&&!$e(n)&&n.parentElement&&!$e(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!$e(o)&&!je(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!$e(o.parentElement))return o}return t}function Bi(){let e=document.querySelectorAll(Ii);for(let n of e)if(Uo(n)&&!Fn(n)&&Oi(n))return n;let t=document.querySelectorAll(Hl);for(let n of t){if(!Uo(n)||!Oi(n)||Fn(n))continue;let o=n.querySelector(Ii);return Uo(o)&&!Fn(o)?o:n}return null}function Di(){let e=It();if(e){let t=Wo(e),n=t.parentElement;if(n&&!$e(n))return n;if(!$e(t))return t}return Vo()}function _i(e){let t=It();return t?e.composedPath().includes(t):!1}var Xo=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Bl={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Jo(e){return e==="auto"||e==="light"||e==="dark"}function Dl(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function _l(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Yo(e){let t=Dl(e);return t?_l(t)>.55?"light":"dark":null}function $l(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Yo(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Yo(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Yo(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function $i(e){return e==="auto"?$l():e}function jl(e){try{let t=getComputedStyle(document.documentElement);for(let n of Xo){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function ji(e,t,n){let o=Bl[t];if(n){jl(e);for(let r of Xo)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Xo)e.style.setProperty(r,o[r])}function qi(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Zo=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Fl="bloom-root",z="bloom-rail-item",Wn="bloom-account-item",ve="bloom-sidebar-panel",Kt="bloom-plugin-dialog",eo="bloom-plugin-layer",Yn="bloom-settings-css",zl=2e3,qt=w({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Gi=null,Gl=null,re=!1,nr=[],Gn=null,Xn=null,ne=null,Un=null,W=null,Ft=null,Ot,qe=0,zt=0,Bt=0,Dt=null,_t=null,Jn=null,Ki=null,$t=null,Qo=[],Zn=!1,Kl=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Ul=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],to="",Gt="all",ie="all";function no(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Ui(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Vl(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Wl(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Yl(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Xl={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Jl(e){return e.icon||Xl[e.name]||no()}function Vi(){return Jo(qt.store.appearance)?qt.store.appearance:"auto"}function Zl(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=qt.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=Vi(),n.addEventListener("change",()=>{Jo(n.value)&&(qt.store.appearance=n.value)}),e.append(t,n),e}function er(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),ji(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function Wi(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function jt(){let e=Vi(),t=$i(e),n=e==="auto";er(Gi,t,n);let o=document.getElementById(ve);o instanceof HTMLElement&&er(o,t,n);let r=document.getElementById(Kt);r instanceof HTMLElement&&er(r,t,n);let i=document.getElementById(z);i instanceof HTMLElement&&Wi(i),he("schemeChange",{scheme:t,pref:e})}function Yi(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Xi(){if(S("settings",Zo),document.getElementById(Yn)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Yn,e.textContent=Zo,document.head.appendChild(e)}function Ql(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function ec(){for(let e of nr)e();nr=[]}function Ji(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function tc(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function ir(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function nc(e){return ir(e).length>0}function Vn(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function oc(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=tc(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function rc(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(oc(t,n));let i=g.store.plugins[e]??(g.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",nr.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??Vn(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Vn(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=Ji(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Vn(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function Fi(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function ic(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=g.store.plugins[e.name]??(g.store.plugins[e.name]={});for(let[n,o]of ir(e)){if(n==="enabled"||o.type===5)continue;let r=Vn(o);r!==void 0&&(t[n]=r)}Qi(e)}function Zi(e){e.key==="Escape"&&(!document.getElementById(eo)&&!document.getElementById(Kt)||(e.stopPropagation(),Fe()))}function ac(){Zn||(document.addEventListener("keydown",Zi),Zn=!0)}function sc(){Zn&&(document.removeEventListener("keydown",Zi),Zn=!1)}function Fe(){ec(),sc(),document.getElementById(eo)?.remove(),document.getElementById(Kt)?.remove()}function Qi(e){if(Fe(),!document.body)return;let t=document.createElement("div");t.id=eo,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",oe),t.addEventListener("pointerup",oe),t.addEventListener("click",c=>{c.stopPropagation(),c.target===t&&Fe()});let n=document.createElement("div");n.id=Kt,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",oe),n.addEventListener("pointerup",oe),n.addEventListener("click",oe);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=Ui(),o.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Fe()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let c=document.createElement("p");c.className="bloom-plugin-dialog-sub",c.textContent=e.description,r.appendChild(c)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let c=Fi("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),c.appendChild(u),n.appendChild(c)}let s=Fi("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let d=ir(e);if(d.length)for(let[c,u]of d){let m=rc(e.name,c,u);m&&l.appendChild(m)}if(!l.childElementCount){let c=document.createElement("p");c.className="bloom-dialog-empty",c.textContent="No configurable settings.",l.appendChild(c)}if(s.appendChild(l),n.appendChild(s),d.length){let c=document.createElement("div");c.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>ic(e)),c.appendChild(u),n.appendChild(c)}t.appendChild(n),document.body.appendChild(t),ac(),jt()}function lc(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Jl(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=yi(e.name),d=document.createElement("button");if(d.type="button",d.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,d.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),d.innerHTML=Wl(l),d.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();let f=vi(e.name);he("pluginStar",{name:e.name,starred:f})}),s.appendChild(d),!e.required){let p=hi(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${p?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",p?"Unpin from top":"Pin to top"),f.innerHTML=Yl(p),f.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();let A=bi(e.name);he("pluginPin",{name:e.name,pinned:A})}),s.appendChild(f)}if(nc(e)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn bloom-card-settings",p.setAttribute("aria-label",`${e.name} settings`),p.innerHTML=Vl(),p.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Qi(e)}),s.appendChild(p)}let c=Ji(e.name,De(e.name),!!e.required),u=c.querySelector("input");if(u?.addEventListener("click",p=>p.stopPropagation()),u?.addEventListener("change",()=>{Si(e.name)}),s.appendChild(c),o.append(r,s),n.appendChild(o),e.description){let p=document.createElement("div");p.className="bloom-card-desc",p.textContent=e.description,n.appendChild(p)}let m=document.createElement("div");m.className="bloom-card-separator";let v=document.createElement("div");v.className="bloom-card-footer";let L=document.createElement("div");return L.className="bloom-card-author",L.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",v.appendChild(L),t.append(n,m,v),t}function ea(){return Object.values(F).filter(e=>!e.hidden&&e.name!=="Settings")}function ta(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function cc(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function dc(){return to.trim()?"No plugins match your search.":ie==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function uc(){let e=ea();return Ul.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>ta(n,t.id)))}function mc(){if($t){$t.replaceChildren();for(let e of uc()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${ie===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{ie=e.id,ye()}),$t.appendChild(t)}}}function fc(){let e=ea();if(ie==="favorites"){let t=new Set(In());e=e.filter(n=>t.has(n.name))}else ie!=="all"&&(e=e.filter(t=>ta(t,ie)));return Gt==="enabled"&&(e=e.filter(t=>De(t.name))),Gt==="disabled"&&(e=e.filter(t=>!De(t.name))),e}function ye(){if(!Dt)return;mc();let e=fc();Jn&&(Jn.placeholder=`Search ${e.length} plugins...`);let t=e,n=to.trim().toLowerCase();if(n&&(t=t.filter(o=>cc(o).includes(n))),ie!=="favorites"){let o=Hn();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}Dt.replaceChildren();for(let o of t)Dt.appendChild(lc(o));_t&&(_t.hidden=t.length>0,_t.textContent=dc())}function oe(e){e.stopPropagation()}function tr(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function ar(){document.getElementById(z)?.setAttribute("aria-expanded",re?"true":"false")}function pc(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function sr(){Fe(),to="",Gt="all",ie="all",document.getElementById(ve)?.remove(),re=!1,ar()}function gc(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",oe),t.addEventListener("pointerup",oe),t.addEventListener("click",oe);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=no();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,l);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn",d.setAttribute("aria-label","Close"),d.innerHTML=Ui(),d.addEventListener("click",sr),o.append(r,d),n.appendChild(o),n.appendChild(Zl());let c=document.createElement("div");c.className="bloom-plugin-tabs",n.appendChild(c);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{to=m.value,ye()});let v=document.createElement("select");v.className="bloom-search-filter",v.setAttribute("aria-label","Filter plugins");for(let f of Kl){let E=document.createElement("option");E.value=f.value,E.textContent=f.label,v.appendChild(E)}v.value=Gt,v.addEventListener("change",()=>{Gt=v.value,ye()}),u.append(m,v),n.appendChild(u);let L=document.createElement("div");L.className="bloom-plugin-list",n.appendChild(L);let p=document.createElement("p");return p.className="bloom-tab-empty",p.hidden=!0,n.appendChild(p),t.appendChild(n),Dt=L,_t=p,Jn=m,Ki=v,$t=c,ye(),t}function hc(e){e.classList.add("bloom-rail-dock")}function bc(){let e=document.getElementById(z);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&zn(e)?e:null}function yc(){if(document.getElementById(ve)?.remove(),!document.body)return;let e=gc(ve);hc(e),document.body.appendChild(e),re=!0,Fe(),jt(),ar(),he("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:O,dock:"center",rail:!!bc()})}function lr(){let e=document.getElementById(ve);if(e instanceof HTMLElement&&e.isConnected&&pc(e)){sr();return}e?.remove(),yc()}function vc(){let e=document.createElement("button");return e.type="button",e.id=z,e.className="bloom-rail-item",e.setAttribute("aria-controls",ve),e.setAttribute("aria-expanded",re?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${no()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),lr()}),e}function zi(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function xc(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function wc(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function te(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function na(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=xc(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&te(e,"padding-top",Math.round(i)),Number.isFinite(a)&&te(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));te(n,"width",l),te(n,"height",Math.max(20,Math.round(s.height)));let d=e.getBoundingClientRect(),c=Math.round(s.left-d.left);c>=0&&c<=40&&te(e,"padding-left",c);let u=wc(t,o);if(u){let m=u.getBoundingClientRect(),v=n.getBoundingClientRect(),L=Math.round(m.left-v.right);L>=0&&L<=24&&te(e,"gap",L)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&te(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&te(e,"gap",Math.round(l))}Wi(e)}function or(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Ec(){if(Ft?.isConnected&&W){W.observe(Ft,{childList:!0});return}rr()}function Sc(e){if(or(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Lc(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){Bt=0;return}Bt+=1,zt=Date.now()+Math.min(8e3,250*2**Math.min(Bt,5))})}function Tc(){qe||Date.now()<zt||(qe=requestAnimationFrame(()=>{qe=0,!(Date.now()<zt)&&(document.getElementById(z)?.isConnected||Qn())}))}function Qn(){if(!document.body)return;W?.disconnect();let e=null,t=!1;try{let n=document.getElementById(z);e=n instanceof HTMLButtonElement?n:vc();let o=It(),r=Vo();if(o){let i=Wo(o),a=i.parentElement;if(or(i)||a&&or(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),zi(e),na(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),zi(e,!0)):e.isConnected&&!zn(e)&&(e.remove(),e=null)}finally{Lc(e,t),Ec(),ar()}}function rr(){let e=Di();!e||!Sc(e)||Ft===e&&W||(W?.disconnect(),Ft=e,W=new MutationObserver(()=>{document.getElementById(z)?.isConnected||Tc()}),W.observe(e,{childList:!0}))}function Cc(){Qn(),rr(),Ot===void 0&&(Ot=window.setInterval(()=>{let e=document.getElementById(z);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=zt&&Qn();else{Bt=0;let t=It();t&&na(e,t)}rr()},zl))}function kc(){Ot!==void 0&&(clearInterval(Ot),Ot=void 0),qe&&cancelAnimationFrame(qe),qe=0,zt=0,Bt=0,W?.disconnect(),W=null,Ft=null}function Mc(e){Un===e&&ne||(ne?.disconnect(),Un=e,ne=new MutationObserver(()=>{if(!e.isConnected){ne?.disconnect(),ne=null,Un=null;return}oa(e)}),ne.observe(e,{childList:!0}))}function oa(e){if(Mc(e),e.querySelector(`#${Wn}`))return;let t=document.createElement("button");t.type="button",t.id=Wn,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${no()}<span>Bloom++</span>`,t.addEventListener("pointerdown",tr),t.addEventListener("pointerup",tr),t.addEventListener("click",n=>{tr(n),lr()}),e.insertBefore(t,e.firstChild)}function Kn(){let e=Bi();return e?(oa(e),!0):!1}function Ac(e){_i(e)&&(queueMicrotask(Kn),requestAnimationFrame(()=>{Kn()}),window.setTimeout(Kn,60),window.setTimeout(Kn,180))}function Pc(){Xn?.abort();let e=new AbortController;Xn=e,document.addEventListener("click",Ac,{signal:e.signal})}function Rc(){Xn?.abort(),Xn=null,ne?.disconnect(),ne=null,Un=null}function ra(){_e(),Ql(()=>{Xi(),Yi(),Qn(),lr()})}var ia=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[y.p],required:!0,hidden:!0,enabledByDefault:!0,settings:qt,startAt:"HostReady",cleanupSelectors:[`#${Fl}`,`#${z}`,`#${Wn}`,`#${ve}`,`#${eo}`,`#${Kt}`,`#${Yn}`,"#bloom-menu-panel"],start(){Xi(),Yi(),Cc(),Pc(),Gn?.(),Gn=qi(jt),jt(),Qo=[An("pluginToggle",()=>{re&&ye()}),An("pluginPin",()=>{re&&ye()}),An("pluginStar",()=>{re&&ye()})]},stop(){kc(),Rc(),Gn?.(),Gn=null;for(let e of Qo)e();Qo=[],sr(),document.getElementById(z)?.remove(),document.getElementById(Wn)?.remove(),document.getElementById(Yn)?.remove(),Gi=null,Gl=null,Dt=null,_t=null,Jn=null,Ki=null,$t=null,re=!1},onSettingsChange:jt});var la='form[data-type="unified-composer"], form.w-full[data-type]',ze=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),oo=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),aa=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),sa=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Nc=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Hc='[contenteditable="false"], button, [role="button"]';function B(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function xe(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!B(r)))return r;return null}function ca(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function H(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=ca(e);return!!(Nc.test(n)||/^stop$/i.test(n))}function ae(){let t=Array.from(document.querySelectorAll(la)).find(B);if(t instanceof HTMLElement)return t;let n=xe(document,ze),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function we(){let e=Array.from(document.querySelectorAll(ze));return e.find(B)??e[0]??null}function Ic(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(Hc);return!!n&&n!==t&&t.contains(n)}function cr(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&Ic(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function Ge(e){let t=e??we();return t?cr(t,t).replaceAll("\u200B","").trim().length>0:!1}function Ut(e){return!Ge(e)}function Oc(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function da(e){let t=ae();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!B(n))&&e(n))return n;return null}function ro(){let e=ae(),t=xe(e,oo)??xe(document,oo);return t&&!H(t)?t:da(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!H(n);let r=ca(n);return/^(send|send prompt|发送)$/i.test(r)&&!H(n)})}function dr(){let e=ro();return!!e&&Oc(e)}function ur(){let e=ae(),t=xe(e,aa,!0)??xe(document,aa,!0);if(t)return t;let n=xe(e,sa)??xe(document,sa);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&B(o)&&H(o))return o}return da(H)}function Ke(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>cr(n,e)).join(`
`):cr(e,e)}function mr(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function io(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),mr(e,n)}var ua="bloom-host-icon",Vt="data-bloom-host-rel",fr="not all",pr=0,ma=0,Bc=400;function fa(e){pr+=1;try{e()}finally{pr-=1}}function ao(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Ue(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function pa(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Dc(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function _c(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-ma<Bc||(ma=n,e.appendChild(t))}function $c(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||ao(n)&&(n.getAttribute(Vt)||n.setAttribute(Vt,n.rel),n.media!==fr&&(n.media=fr),n.rel!==ua&&(n.rel=ua))}function jc(e){for(let t of e.querySelectorAll(`link[${Vt}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Vt);n&&(t.rel=n),t.removeAttribute(Vt),t.media===fr&&t.removeAttribute("media")}}function gr(e,t){let{head:n}=document;!n||!t||fa(()=>{$c(n,e);let o=pa(e),{type:r,sizes:i}=Dc(t);o?_c(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function ga(e,t){let{head:n}=document;n&&fa(()=>{pa(e)?.remove(),jc(n)})}function ha(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(pr)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:ao(l.target)&&(a=!0,Ue(l.target.href)&&(s=l.target.href)));for(let d of l.removedNodes)ao(d)&&d.id===e&&(a=!0);for(let d of l.addedNodes)ao(d)&&d.id!==e&&(a=!0,Ue(d.href)&&(s=d.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var ba=/\/c\/([a-zA-Z0-9_-]{8,})/i;function R(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=d=>{let c=n.indexOf(d);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(d,c)=>{try{return document.querySelector(d)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function se(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Ee(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(ba)?.[1]??""}catch{return e.match(ba)?.[1]??""}}function le(){let e=Ee(location.pathname);if(e)return e;let n=R().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function qc(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!B(t))&&(H(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Fc(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&B(e))}function zc(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&B(e))}function Gc(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function ce(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function D(){if(ur()||qc()||Gc())return!0;let e=ro();return e&&B(e)&&!H(e)?!1:!!(Fc()||zc())}var Kc=["original","badge","dot","hole","bg"],xa=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],wa={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},so="#FCFCFC",Uc="#111111",ya="#111111",Vc="#ffffff",Wc="#212121",Yc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Xc={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},lo=32,va=64;function Ea(e){return typeof e=="string"&&Kc.includes(e)}function Jc(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function co(e){let t=document.createElement("canvas");t.width=lo,t.height=lo;let n=t.getContext("2d");return n?(n.scale(lo/va,lo/va),e(n),t.toDataURL("image/png")):""}function Zc(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function uo(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Yc);n&&(e.strokeStyle=Uc,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Qc(e,t,n){let o=wa[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=ya,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=ya,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Vc,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Wt(e,t){if(e==="original")return t==="wait"?co(o=>uo(o,so)):Jc(Xc[t]);let n=t==="wait"?void 0:wa[t];return co(e==="hole"?o=>uo(o,n??so):e==="bg"?o=>{o.fillStyle=n??Wc,Zc(o,0,0,64,64,14),o.fill(),uo(o,so,!1)}:o=>{uo(o,so),t!=="wait"&&Qc(o,t,e==="dot"?"dot":"badge")})}function Sa(e){return{wait:Wt(e,"wait"),rotate:Wt(e,"rotate"),done:Wt(e,"done"),ready:Wt(e,"ready"),error:Wt(e,"error")}}var ed=new x("ChatStateFavicons"),Le="bloom-chat-state-favicon",Ma=w({style:{type:3,description:"Favicon overlay",options:xa}}),Ye="",fo={wait:"",rotate:"",done:"",ready:"",error:""},po="wait",We=!1,Y=!1,_=null,Xt="",Jt="",Qt=!0,Yt=null,Xe=0,Ve,mo=null,Se=null,hr=null,Zt=!1,La=new WeakSet,td=400;function nd(){let e=Ma.store.style;return Ea(e)?e:"bg"}function od(){let t=document.querySelector(`link[rel~="icon"]:not(#${Le})`)?.href;return Ue(t)?t:Ue(Ye)?Ye:""}function $(e){if(po===e){let t=document.getElementById(Le);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===fo[e])return}po=e,gr(Le,fo[e])}function Ta(){fo=Sa(nd()),$(po)}function rd(){let e=R(),t=e?se(e):se("");return D()?(!Xt&&t&&(Xt=t),Xt||t):(Xt="",t)}function Aa(){We=!1,Y=!1,_=null,Xt=""}function id(e){Jt=e,Aa(),Qt=!1,$("wait")}function Ca(e,t){return!e&&Qt&&!t}function Pa(){if(!Zt)return;let e=R()||location.pathname;if(Jt&&e&&Jt!==e){id(e);return}e&&(Jt=e);let t=rd(),n=D(),o=Ut(),r=dr();if(ce()&&!n){$("error"),We=!1,Y=!1,_=null;return}if(n){We||(Qt=!1),We=!0,Y=!1,_=t,$("rotate");return}if(We){let i=!!_&&!!t&&_===t;if(We=!1,i){Y=!0,_=t,$("done");return}Y=!1,_=null}if(Y)if(!!(_&&t&&_!==t))Y=!1,_=null;else if(o){$("done");return}else if(Ca(o,r)){Y=!1,$("ready");return}else{Y=!1,$("wait");return}_=null,o?$("wait"):Ca(o,r)?$("ready"):$("wait")}function Ra(){let e=ae();if(!(Se&&hr===e&&e.isConnected)){if(Se?.disconnect(),hr=e,!e||e===document.body){Se=null;return}Se=new MutationObserver(()=>go()),Se.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function go(){!Zt||Xe||(Xe=requestAnimationFrame(()=>{Xe=0,Zt&&(Na(),Ra(),Pa())}))}function ka(){Ge()&&(Qt=!0),go()}function Na(){let e=we();!e||La.has(e)||(La.add(e),e.addEventListener("input",ka,{passive:!0}),e.addEventListener("compositionend",ka,{passive:!0}))}var Ha=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Ma,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Le}`],start(){Zt=!0,Ye=od()||Ye,Ta(),mo?.disconnect(),mo=ha(Le,e=>{Ue(e)&&(Ye=e),gr(Le,fo[po])}),Yt?.abort(),Yt=new AbortController,window.addEventListener("popstate",go,{signal:Yt.signal}),Na(),Ra(),Ve!==void 0&&clearInterval(Ve),Ve=setInterval(go,td),Pa(),ed.debug("favicon watch started")},stop(){Zt=!1,Xe&&cancelAnimationFrame(Xe),Xe=0,Ve!==void 0&&(clearInterval(Ve),Ve=void 0),Yt?.abort(),Yt=null,Se?.disconnect(),Se=null,hr=null,mo?.disconnect(),mo=null,Aa(),Jt="",Qt=!0,ga(Le,Ye)},onSettingsChange:Ta});var Ia=`.bloom-ih-hud {
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
`;var rp=new x("InputHistory"),br=/\u200B/g,Oa=10,Ba=500,Da=100,sd=8,ld=120,cd=2e3,ho=10,bo=w({maxEntries:{type:4,description:"Max stored prompts",min:Oa,max:Ba,default:Da},history:{type:5,description:"Stored prompts",render:Ld},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),yr=new Map,T=0,vr="",G=!1,tn=!1,Er=0,en=null,xr,Sr=null,_a=!0;function j(){let e=bo.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $a(e){let t=Be(Number(bo.store.maxEntries??Da),Oa,Ba);return e.length>t?e.slice(e.length-t):e}function yo(e){bo.store.entries=$a(e)}function dd(e){return e.replaceAll(br,"").replace(/\n$/,"").trim()}function wr(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(ze);return n instanceof HTMLElement?n:we()}function ud(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Ke(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(br,"").trim().length===0,last:i.toString().replaceAll(br,"").trim().length===0}}catch{return{first:!0,last:!0}}}function ja(e){clearTimeout(xr),xr=setTimeout(()=>{if(e!==Er)return;tn=!1;let t=Sr;t&&mr(t,_a)},ld)}function qa(e,t,n){tn=!0,Sr=e,_a=n;let o=++Er;io(e,t,n),ja(o)}function md(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Je(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function fd(){document.querySelector(".bloom-ih-hud")?.remove()}function pd(e,t){let n=md();n.textContent=e;let o=(t.closest("form")??ae()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-sd)}px`,n.classList.add("bloom-ih-hud-on")}function Lr(e){let t=dd(e);if(!t)return;let n=Date.now(),o=yr.get(t);if(o&&n-o<cd)return;yr.set(t,n);let r=j().filter(i=>i!==t);r.push(t),yo(r),T=j().length,G=!1,Je()}function gd(e,t){let n=j();if(!n.length&&e)return;T>=n.length&&(vr=Ke(t),T=n.length);let o=e?T-1:T+1;o<0||o>n.length||(T=o,G=!0,qa(t,o===n.length?vr:n[o],e),o<n.length?pd(`${o+1} / ${n.length}`,t):Je())}function hd(e){G=!1,Je(),qa(e,vr,!1),T=j().length}function bd(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=wr(e.target)??wr(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&G&&!e.altKey&&!e.shiftKey){hd(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Lr(Ke(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=j();if(!o){let i=ud(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||T<=0)||!n&&T>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),gd(n,t))}function yd(e){if(wr(e.target)){if(tn){ja(Er);return}G&&(G=!1,Je(),T=j().length)}}function vd(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(ze);n instanceof HTMLElement&&Lr(Ke(n))}function xd(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(oo);if(!n||!(n instanceof HTMLElement)||H(n))return;let o=we();o&&Lr(Ke(o))}function wd(e){if(!(!G||tn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}G=!1,Je()}}function Ed(){if(en)return;en=new AbortController;let{signal:e}=en,t={capture:!0,signal:e};window.addEventListener("keydown",bd,t),window.addEventListener("input",yd,t),window.addEventListener("submit",vd,t),window.addEventListener("click",xd,t),window.addEventListener("pointerdown",wd,t)}function Sd(e){let t=j().slice();t.splice(e,1),yo(t),T>t.length&&(T=t.length)}function Ld(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=j().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/ho));n>=l&&(n=l-1);let d=s.slice(n*ho,n*ho+ho);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),d.length){let f=document.createElement("div");f.className="bloom-ih-list",d.forEach((E,A)=>{let N=i.indexOf(E),kt=j().length-1-N,He=document.createElement("div");He.className="bloom-ih-item";let Z=document.createElement("button");Z.type="button",Z.className=`bloom-ih-body${o===A?"":" bloom-ih-clamp"}`,Z.textContent=E,Z.addEventListener("click",()=>{o=o===A?-1:A,r()});let Mt=document.createElement("div");Mt.className="bloom-ih-actions";let Ie=document.createElement("button");Ie.type="button",Ie.title="Copy",Ie.textContent="C",Ie.addEventListener("click",()=>{ui(E)});let ge=document.createElement("button");ge.type="button",ge.title="Delete",ge.textContent="\xD7",ge.addEventListener("click",()=>{Sd(kt),r()}),Mt.append(Ie,ge),He.append(Z,Mt),f.appendChild(He)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let v=document.createElement("span");v.textContent=`${n+1} / ${l}`;let L=document.createElement("button");L.type="button",L.className="bloom-ih-btn",L.textContent="Next",L.disabled=n+1>=l,L.addEventListener("click",()=>{n+=1,r()});let p=document.createElement("button");p.type="button",p.className="bloom-ih-clear",p.textContent="Clear all",p.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(yo([]),T=0,r())}),u.append(m,v,L,p),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Fa=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:bo,startAt:"HostReady",managedStyle:"inputHistory",start(){S("inputHistory",Ia),T=j().length,G=!1,Ed()},stop(){en?.abort(),en=null,Je(),fd(),yr.clear(),clearTimeout(xr),tn=!1,Sr=null,G=!1},onSettingsChange(){let e=j(),t=$a(e);t.length!==e.length&&yo(t),T>t.length&&(T=t.length)}});var Tr="noShareLink",Td=['button[data-testid="share-chat-button"]'],Cd=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Cr=w({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function za(e){return`${e.join(",")}{display:none!important}`}function Ga(){let e=[];if(Cr.store.hideShareChat!==!1&&e.push(za(Td)),Cr.store.hideShareProject!==!1&&e.push(za(Cd)),!e.length){b(Tr);return}S(Tr,e.join(`
`))}var Ka=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[y.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Cr,start:Ga,onSettingsChange:Ga,stop(){b(Tr)}});var Wa="noDictation",kd=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Md=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Ya=w({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Ua(e){return`${e.join(",")}{display:none!important}`}function Va(){let e=[Ua(kd)];Ya.store.hideDictationSettings!==!1&&e.push(Ua(Md)),S(Wa,e.join(`
`))}var Xa=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ya,start:Va,onSettingsChange:Va,stop(){b(Wa)}});var kr="noSidebarIdentity",Ze=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Mr=Ze.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),es=Ze.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Ad=[...Mr,...es],Ja=[...Mr,...Ze.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Pd=Ze.map(e=>`${e} a[href^="mailto:"]`),Rd=Ze.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Nd=Ze.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),nn=w({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Za(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Hd(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Id(){return`${Nd.join(",")}{margin-block:auto!important}`}function Od(){return`${Rd.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Qa(){let e=nn.store.hideUsername!==!1,t=nn.store.hideEmail!==!1,n=e&&nn.store.enlargePlan!==!1,o=e&&nn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(Hd(n?Ja:[...Ja,...es])),r.push(Id())):r.push(Za(n?Mr:Ad))),t&&r.push(Za(Pd)),n&&r.push(Od()),!r.length){b(kr);return}S(kr,r.join(`
`))}var ts=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[y.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:nn,start:Qa,onSettingsChange:Qa,stop(){b(kr)}});var ns=`#bloom-rt-host {
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
`;var is=new x("RecentTopics"),tt="bloom-rt-host",as="home",ss=/^\/c\/([a-z0-9_-]{8,})/i,Dd=/\/c\/([a-z0-9_-]{8,})/i,ls=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,_d=new Set(["Backquote","IntlBackslash"]),$d=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),jd=140,qd=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),C=w({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:qd},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),vo=null,Ar=null,I=!1,cn=!1,on=!1,K=0,Te="",Qe=null,rn=null,et;function Fd(){let e=Number(C.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function an(){let e=C.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Pr(){let e=C.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function cs(){let e=C.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Rr(){let e=C.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function wo(e){let t=Fd();return e.length>t?e.slice(0,t):e}function U(e){return e===as}function sn(e,t=jd){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Nr(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(ss)?.[1]??""}catch{return e.match(Dd)?.[1]??""}}function Ce(){let e=(location.pathname||"/").match(ss);if(e?.[1])return e[1];let n=R().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return as}function Hr(e){if(U(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Nr(o.getAttribute("href")||"")!==e)continue;let r=sn(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ce()===e&&t&&!/^ChatGPT$/i.test(t)?sn(t,80):""}function zd(e){return U(e)?"New chat":Pr()[e]||Hr(e)||"Chat"}function Gd(e){return Rr()[e]||""}function Kd(e){return cs()[e]||{}}function ds(e,t){if(!e||U(e)||!t)return;let n=Pr();n[e]!==t&&(n[e]=t,C.store.titles=n)}function Ud(e,t){if(!e||U(e)||!t)return;let n=Rr();n[e]!==t&&(n[e]=t,C.store.projects=n)}function Vd(e,t){if(!e||U(e)||!t.user&&!t.assistant)return;let n=cs(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,C.store.previews=n)}function Ir(e){if(!e||U(e)&&C.store.includeHome===!1)return;let t=an().filter(n=>n!==e);t.unshift(e),C.store.visits=wo(t)}function Eo(){let e=C.store.includeHome!==!1;return wo(an().filter(n=>e||!U(n))).map(n=>({id:n,title:zd(n),project:Gd(n),preview:Kd(n)}))}function os(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return sn(r)}catch{return""}}function ln(e){if(!e||U(e)||e!==Ce())return;let t=Hr(e);t&&ds(e,t);let n=os("user"),o=os("assistant");Vd(e,{user:n,assistant:o});let r=ms(e);if(r){let i=us(r);i&&Ud(e,i)}}function Or(){let e=Pr(),t=Rr(),n=[],o=new Set,r=!1,i=!1;try{for(let d of document.querySelectorAll('a[href*="/c/"]')){if(d.closest(`#${tt}, #bloom-root, #bloom-sidebar-panel`))continue;let c=Nr(d.getAttribute("href")||"");if(!c||o.has(c))continue;o.add(c),n.push(c);let u=sn(d.textContent||"",80);u&&!ls.test(u)&&e[c]!==u&&(e[c]=u,r=!0);let m=us(d);m&&t[c]!==m&&(t[c]=m,i=!0)}}catch{}r&&(C.store.titles=e),i&&(C.store.projects=t);let a=an(),s=new Set(a),l=n.filter(d=>!s.has(d));l.length&&(C.store.visits=wo([...a,...l]))}function us(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=sn((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!ls.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function ms(e){if(U(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Nr(t.getAttribute("href")||"")===e)return t}catch{}return null}function Wd(e){let t=ms(e);if(t){t.click();return}if(U(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Yd(){let e=Ce();Te&&Te!==e&&ln(Te),Te=e,Ir(e),Or();let t=Hr(e);t&&ds(e,t),ln(e)}function xo(){et===void 0&&(et=window.setTimeout(()=>{et=void 0,Yd()},120))}function Xd(){Qe||(Qe=history.pushState.bind(history),rn=history.replaceState.bind(history),history.pushState=function(...t){let n=Qe(...t);return xo(),n},history.replaceState=function(...t){let n=rn(...t);return xo(),n})}function Jd(){Qe&&(history.pushState=Qe),rn&&(history.replaceState=rn),Qe=null,rn=null}function Zd(e){return _d.has(e.code)||e.keyCode===192?!0:$d.has(e.key)}function fs(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Qd(e,t){cn=t,Or(),ln(Ce()),I=!0,K=0;try{let n=Ce();Ir(n);let o=Eo();o.length>1&&(K=e?o.length-1:1)}catch(n){is.error("Failed to open switcher:",n)}dn()}function rs(e){let{length:t}=Eo();t&&(K=(K+(e?-1:1)+t)%t,dn())}function Br(){if(!I)return;let e=Eo()[K];I=!1,cn=!1,dn(),e&&Wd(e.id)}function ps(){I&&(I=!1,cn=!1,dn())}function eu(e){if(fs(e)){on=!0;return}if((e.ctrlKey||on)&&!e.altKey&&!e.metaKey&&Zd(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{I?rs(e.shiftKey):Qd(e.shiftKey,!0)}catch(n){is.error("Hotkey failed:",n)}return}if(I){if(e.key==="Escape"){e.preventDefault(),ps();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Br();return}e.key==="Tab"&&(e.ctrlKey||on)&&(e.preventDefault(),rs(e.shiftKey))}}function tu(e){fs(e)&&(on=!1,I&&cn&&Br())}function nu(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(xo)}function ou(e){!I||(e.target instanceof Element?e.target:null)?.closest(`#${tt}`)||ps()}function ru(){document.visibilityState==="hidden"&&ln(Ce())}function iu(){if(!document.body)return null;let e=document.getElementById(tt);if(e instanceof HTMLElement)return Ar=e,e;e=document.createElement("div"),e.id=tt;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Ar=e,e}function dn(){let e=iu();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!I){t.dataset.visible="false",t.replaceChildren();return}let n=Eo();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}K>=n.length&&(K=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===K?"true":"false",s.setAttribute("aria-selected",a===K?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let d=document.createElement("div");d.className="bloom-rt-project",d.textContent=i.project,s.append(d)}if(i.preview.user||i.preview.assistant){let d=document.createElement("div");if(d.className="bloom-rt-preview",i.preview.user){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="user",c.textContent=i.preview.user,d.append(c)}if(i.preview.assistant){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="assistant",c.textContent=i.preview.assistant,d.append(c)}s.append(d)}s.addEventListener("click",()=>{K=a,Br()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function au(){document.getElementById(tt)?.remove(),Ar=null}var gs=h({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${tt}`],settings:C,start(){S("recentTopics",ns),Te=Ce(),Ir(Te),Or(),ln(Te),Xd(),vo=new AbortController;let{signal:e}=vo;window.addEventListener("keydown",eu,{capture:!0,signal:e}),window.addEventListener("keyup",tu,{capture:!0,signal:e}),window.addEventListener("popstate",xo,{signal:e}),document.addEventListener("click",nu,{capture:!0,signal:e}),document.addEventListener("click",ou,{signal:e}),document.addEventListener("visibilitychange",ru,{signal:e})},stop(){vo?.abort(),vo=null,et!==void 0&&(clearTimeout(et),et=void 0),Jd(),I=!1,cn=!1,on=!1,au()},onSettingsChange(){let e=wo(an());e.length!==an().length&&(C.store.visits=e),I&&dn()}});var Dr="cleaner",su=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],lu=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],cu=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],du=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],uu=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]'],mu=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],ke=w({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function nt(e){return`${e.join(",")}{display:none!important}`}function hs(){let e=[];if(ke.store.hideDownloadApps!==!1&&e.push(nt(su)),ke.store.hideDisclaimer!==!1&&e.push(nt(lu)),ke.store.hideUpgrade!==!1&&e.push(nt(cu)),ke.store.hideLockedModels!==!1&&e.push(nt(du)),ke.store.hideHomePromo!==!1&&e.push(nt(uu)),ke.store.hideAds!==!1&&e.push(nt(mu)),!e.length){b(Dr);return}S(Dr,e.join(`
`))}var bs=h({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ke,start:hs,onSettingsChange:hs,stop(){b(Dr)}});var So=new x("ResponseNotification"),fu=400,pu=3,st=w({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:wu},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),_r=!1,Pe=!1,Me=0,Ae="",at=!1,un="",ot,rt=null,it=null;function ys(){return se(R())}function gu(){return document.visibilityState==="hidden"||document.hidden}function hu(){return st.store.onlyWhenHidden===!1?!0:gu()}function bu(){let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function vs(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!it||it.state==="closed")&&(it=new e);let t=it,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){So.debug("chime failed",e)}}function yu(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){So.debug("custom sound failed",t),vs()}}function xs(){let e=String(st.store.soundUrl||"").trim();e?yu(e):vs()}function vu(){let e="Bloom++",t=`${bu()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){So.debug("notification failed",n)}}function xu(){hu()&&(st.store.sound!==!1&&xs(),st.store.browserNotification!==!1&&vu())}function wu(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>xs()),e.appendChild(t),()=>{t.remove()}}function Eu(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&H(n)&&(at=!0)}function Su(){if(!_r)return;let e=R()||location.pathname;if(un&&e&&un!==e){Pe=!1,Me=0,Ae="",at=!1,un=e;return}un=e;let t=D(),n=ys();if(t){Pe=!0,Me=0,Ae=n;return}if(!Pe||(Me+=1,Me<pu))return;let o=!!Ae&&Ae===n,r=at,i=ce();Pe=!1,Me=0,at=!1,Ae="",!(!o||r||i)&&xu()}var ws=h({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:st,start(){_r=!0,Pe=D(),Me=0,Ae=Pe?ys():"",at=!1,un=R()||location.pathname,rt?.abort(),rt=new AbortController,document.addEventListener("click",Eu,{capture:!0,signal:rt.signal}),ot!==void 0&&clearInterval(ot),ot=setInterval(Su,fu),st.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:rt.signal}),So.debug("watch started")},stop(){_r=!1,ot!==void 0&&(clearInterval(ot),ot=void 0),rt?.abort(),rt=null,Pe=!1,Me=0,Ae="",at=!1;try{it?.close()}catch{}it=null}});var Ls=new x("Harvest"),Lu=1500,Tu=200,Lo=new Set,To=new Map,Co=new Map,lt=null,ko=null,mn=null;function Cu(){return typeof unsafeWindow<"u"?unsafeWindow:window}function ku(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Mu(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function Ts(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}function Au(e,t){return t!=="POST"||Ts(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function Pu(e,t){return t!=="GET"||Ts(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Cs(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Ru(e){return typeof e=="string"?Cs(e):""}function $r(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return $r(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function ks(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function Es(e,t,n){!e||!t||Co.get(e)!==t&&(Co.set(e,t),ks(Co,Lu),de({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Nu(e,t){let n=t.trim();!e||!n||To.get(e)!==n&&(To.set(e,n),ks(To,Tu),de({type:"conversation-meta",conversationId:e,title:n}))}function fn(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let l of e)fn(l,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&Nu(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,d=typeof l.id=="string"?l.id:"",c=$r(l.create_time??l.createTime??l.created_at);d&&c&&Es(d,c,r)}let a=typeof o.id=="string"?o.id:"",s=$r(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&Es(a,s,r),o.mapping&&typeof o.mapping=="object")fn(o.mapping,r,n+1);else if(n<3)for(let l of Object.values(o))l&&typeof l=="object"&&fn(l,r,n+1)}function Ss(e,t){if(e)try{fn(JSON.parse(e),t)}catch{}}function de(e){for(let t of Array.from(Lo))try{t(e)}catch{}}async function Hu(e,t){try{let n=await e.json();fn(n,t)}catch{}}async function Iu(e,t,n){let o=t,r=n,i=e.body;if(!i){de({type:"post-end",conversationId:o,error:r});return}let a=i.getReader(),s=new TextDecoder,l="";try{for(;;){let{done:d,value:c}=await a.read();if(d)break;if(l+=s.decode(c,{stream:!0}),!o){let m=Cs(l);m&&(o=m,de({type:"post-start",conversationId:o,url:""}))}let u=l.split(`
`);l=u.pop()??"";for(let m of u){let v=m.replace(/^data:\s*/,"").trim();v&&v!=="[DONE]"&&Ss(v,o)}/\[DONE\]/.test(l)||/"error"\s*:\s*\{/.test(l)?(/"error"\s*:\s*\{/.test(l)&&(r=!0),l=l.slice(-64)):l.length>16384&&(l=l.slice(-4096))}l&&Ss(l.replace(/^data:\s*/,""),o)}catch{r=!0}de({type:"post-end",conversationId:o,error:r})}function Ou(e,t,n){let o=ku(t),r=Mu(t,n),i=Pu(o,r),a=Au(o,r),s="";return a&&(s=Ru(n?.body)||Ee(o)||le(),de({type:"post-start",conversationId:s,url:o})),e(t,n).then(l=>{if(!i&&!a)return l;try{let d=l.clone();i?Hu(d,Ee(o)||le()):Iu(d,s,!l.ok)}catch{a&&de({type:"post-end",conversationId:s,error:!l.ok})}return l},l=>{throw a&&de({type:"post-end",conversationId:s,error:!0}),l})}function Bu(){if(lt)return;let e=Cu();mn=e,lt=e.fetch.bind(e);let t=(n,o)=>Ou(lt,n,o);ko=t,e.fetch=t,Ls.debug("conversation fetch harvest hooked")}function Du(){!lt||!mn||(ko&&mn.fetch===ko&&(mn.fetch=lt),lt=null,ko=null,mn=null,Ls.debug("conversation fetch harvest unhooked"))}function ct(e){return Lo.add(e),Bu(),()=>{Lo.delete(e),Lo.size===0&&Du()}}function Ms(e){return e?To.get(e)??"":""}function As(e){return e?Co.get(e)??null:null}var Ps=`.bloom-cls {
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
`;var Is=new x("ChatListStatus"),Rs="chatListStatus",Ao="bloom-cls",$u="bloom-cls",ju=500,qu=1200*1e3,Fu="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",me=new Map,fe=!1,ut="",pn=!1,dt,ft=0,ue=null,Fr=null,mt=null,jr=null,pt=!1;function Mo(){return Date.now()}function Os(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function gt(e,t,n,o=!0){if(!(!e||!fe)){if(t==="idle")me.delete(e);else{let r=me.get(e);r&&r.kind===t&&n!=="net"?r.at=Mo():me.set(e,{kind:t,at:Mo(),source:n})}o&&zu({v:1,id:e,kind:t,at:Mo()}),Po()}}function zu(e){try{mt?.postMessage(e)}catch{}}function Gu(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||gt(t.id,t.kind,"bc",!1)}function Ku(){let e=Mo();for(let[t,n]of me)n.kind==="streaming"&&e-n.at>qu&&me.delete(t)}function Uu(){let e=Os();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(Fu))continue;let r=Ee(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Ns(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function qr(e){let t=e.querySelector(`:scope > .${Ao}`);return t||null}function Vu(){if(!fe)return;Ku();let e=le(),t=Uu();ue?.disconnect();try{for(let n of t){let o=Ee(n.getAttribute("href")||"");if(!o||!e||o!==e){qr(n)?.remove();continue}let i=me.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){qr(n)?.remove();continue}let a=qr(n);a||(a=document.createElement("span"),a.className=Ao,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Ns("streaming")):i==="error"&&a.appendChild(Ns("error")))}}catch(n){Is.debug("paint failed",n)}Bs()}function Po(){!fe||ft||(ft=requestAnimationFrame(()=>{ft=0,fe&&Vu()}))}function Bs(){let e=Os();if(!(ue&&Fr===e&&e?.isConnected)){if(ue?.disconnect(),Fr=e,!e){ue=null;return}ue=new MutationObserver(()=>Po()),ue.observe(e,{childList:!0,subtree:!0})}}function Wu(e){if(fe){if(e.type==="post-start"){e.conversationId?(pt=!1,gt(e.conversationId,"streaming","net")):pt=!0;return}e.type==="post-end"&&(pt=!1,e.conversationId&&gt(e.conversationId,e.error?"error":"done","net"))}}function Hs(){if(!fe)return;let e=le();if(ut&&e&&ut!==e){let n=me.get(ut);n?.kind==="streaming"&&n.source==="local"&&gt(ut,ce()?"error":"done","local"),pn=!1}if(ut=e,D()){pn=!0,e&&gt(e,"streaming","local"),Po();return}pn&&(pn=!1,e&&gt(e,ce()?"error":"done","local")),pt=!1,Po()}var Ds=h({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ao}`],start(){fe=!0,S(Rs,Ps);try{mt=new BroadcastChannel($u)}catch{mt=null}mt?.addEventListener("message",Gu),jr=ct(Wu),Bs(),dt!==void 0&&clearInterval(dt),dt=setInterval(Hs,ju),Hs(),Is.debug("sidebar status watch started")},stop(){fe=!1,ft&&cancelAnimationFrame(ft),ft=0,dt!==void 0&&(clearInterval(dt),dt=void 0),ue?.disconnect(),ue=null,Fr=null,jr?.(),jr=null;try{mt?.close()}catch{}mt=null,me.clear(),pt=!1,pn=!1,ut="",document.querySelectorAll(`.${Ao}`).forEach(e=>e.remove()),b(Rs)}});var $s="widerChat",js=40,qs=96,Fs=64,zs=w({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:js,max:qs,default:Fs}});function Yu(){return Be(Number(zs.store.width??Fs),js,qs)}function _s(){let e=Yu();S($s,`:root{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="--thread-content-max-width"]{--thread-content-max-width:${e}rem!important}[class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:min(100%,${e}rem)!important}`)}var Gs=h({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:zs,start:_s,onSettingsChange:_s,stop(){b($s)}});var Ks=`.bloom-ts {
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
`;function Us(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Vs(e){try{return new Date(e).toISOString()}catch{return""}}var Js=new x("MessageTimestamps"),Ws="messageTimestamps",Ro="bloom-ts",Ys=1500,Ju="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",yt=w({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),vt=new Map,xt=!1,bt=0,ht,pe=null,Gr=null,zr=null,Xs=!1;function Zs(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Kr(){let e=yt.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Qs(){let e={...Kr()};for(let[n,o]of vt)e[n]=o;let t=Object.keys(e);if(t.length>Ys){let n=t.slice(t.length-Ys),o={};for(let r of n)o[r]=e[r];yt.store.stamps=o;return}yt.store.stamps=e}var Zu=mi(Qs,500);function el(e,t){!e||!t||vt.get(e)===t||(vt.set(e,t),Zu(),gn())}function Qu(e){return e?vt.get(e)??Kr()[e]??null:null}function em(e){xt&&e.type==="message-time"&&el(e.messageId,e.createTime)}function tm(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function nm(){let e=Zs();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Ju)||t.push(n)}catch{}return t}function om(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function rm(){if(!xt)return;let e=yt.store.hideOwnMessages===!0,t=yt.store.showDate!==!1,n=D(),o=nm();pe?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=tm(r),l=r.querySelector(`:scope > .${Ro}`);if(e&&s==="user"){l?.remove();return}if(om(r)){l?.remove();return}let d=Qu(a);if(!d&&a&&(n||Xs)&&i>=o.length-2&&(d=Date.now(),el(a,d)),!d){l?.remove();return}let c=Us(d,t);if(!c){l?.remove();return}let u=l;u||(u=document.createElement("time"),u.className=Ro,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==c&&(u.textContent=c);let m=Vs(d);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){Js.debug("paint failed",r)}Xs=n,tl()}function gn(){!xt||bt||(bt=requestAnimationFrame(()=>{bt=0,xt&&rm()}))}function tl(){let e=Zs();if(!(pe&&Gr===e&&e?.isConnected)){if(pe?.disconnect(),Gr=e,!e||e===document.body){pe=null;return}pe=new MutationObserver(()=>gn()),pe.observe(e,{childList:!0,subtree:!0})}}var nl=h({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ro}`],settings:yt,start(){xt=!0,S(Ws,Ks);let e=Kr();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&vt.set(t,n);zr=ct(em),tl(),ht!==void 0&&clearInterval(ht),ht=setInterval(gn,800),gn(),Js.debug("timestamp watch started")},stop(){xt=!1,bt&&cancelAnimationFrame(bt),bt=0,ht!==void 0&&(clearInterval(ht),ht=void 0),pe?.disconnect(),pe=null,Gr=null,zr?.(),zr=null,Qs(),vt.clear(),document.querySelectorAll(`.${Ro}`).forEach(e=>e.remove()),b(Ws)},onSettingsChange:gn});var Ur="streamerMode",im="filter:blur(6px)!important;transition:filter .2s ease",am="filter:none!important",hn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],wt=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function q(e,t){return e.map(n=>`${n} ${t}`)}var Et=w({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0}});function bn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${im}}${t?`${o}{${am}}`:""}`}function ol(){let e=[];if(Et.store.conversations!==!1&&e.push(bn([...q(wt,'a[href^="/c/"]'),...q(wt,'a[href*="/c/"]')])),Et.store.projects!==!1&&e.push(bn([...q(wt,'a[href*="/project"]'),...q(wt,'a[href*="/g/g-p-"]'),...q(wt,'[data-testid="project-name"]'),...q(wt,'[data-testid="project-link"]')])),Et.store.accountAvatar!==!1&&e.push(bn([...q(hn,"img"),...q(hn,'[class*="avatar"]')],!1)),Et.store.accountName!==!1&&e.push(bn([...q(hn,".min-w-0 > .truncate"),...q(hn,".min-w-0.flex-1 .truncate")],!1)),Et.store.accountEmail!==!1&&e.push(bn([...q(hn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),!e.length){b(Ur);return}S(Ur,e.join(`
`))}var rl=h({name:"StreamerMode",description:"Blur Recents titles, project names, and the account chip while you stream.",authors:[y.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Et,start:ol,onSettingsChange:ol,stop(){b(Ur)}});var il=`.bloom-gc-panel {
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
}`;var lm=new x("GreetingCustomizer"),St="greetingCustomizer",al="greetingCustomizerUi",yn=100,Vr=30,cm=120,dm=1e3,um=50,mm=40,fm=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog"].join(", "),vn=["h1.text-page-header",'h1[class*="text-page-header"]',"[data-splash-headline-option] h1",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Wr=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function pm(e){return!!e?.closest(fm)}function dl(e){return!!(pm(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function Bo(e){try{for(let t of document.querySelectorAll(e))if(!dl(t))return t}catch{}return null}var ul=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],k=w({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Pm},greetings:{type:0,description:"Greeting texts",hidden:!0,default:ul},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),V=!1,Ct=!1,Ne=null,Ho,xn,Lt,wn,Io=0,No=null,Tt=null,En=null,Sn=null,Ln=null,Oo=null;function J(){let e=location.pathname||"/";return e==="/"||e===""}function Re(){let e=k.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):ul.slice()}function Tn(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function sl(e){k.store.greetings=e.slice(0,Vr)}function Cn(){let e=String(k.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function gm(){return k.store.order==="random"?"random":"sequential"}function hm(){return Be(Number(k.store.intervalSec??10),1,3600)*1e3}function bm(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function ym(){return!!Bo(Wr)}function Do(){return!!(Bo(Wr)||Bo(vn))}function vm(e,t){let n=["font-size:0!important","line-height:0!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=ym()||!Bo(vn)?Wr:vn,i=t?`${vn}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function xm(e,t){if(e<=0)return 0;if(e===1)return Number(k.plain.index)!==0&&(k.store.index=0),Number(k.plain.lastRandom)!==0&&(k.store.lastRandom=0),0;let n=Number(k.plain.index),o=Number(k.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(gm()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*e);return k.store.index=s,k.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return k.store.index=i,i}function X(e){if(!V)return;if(!J()){b(St);return}let t=Re().map(Tn).filter(Boolean);if(!t.length){b(St);return}let n=xm(t.length,e),o=t[n]??t[0],r=Cn()==="manual"&&t.length>1;S(St,vm(bm(o),r)),Oo?.()}function Yr(){Ho!==void 0&&(clearInterval(Ho),Ho=void 0)}function Xr(){Yr(),!(!V||!J())&&Cn()==="interval"&&(Re().filter(Boolean).length<=1||(Ho=setInterval(()=>X(!0),hm())))}function Jr(){wn!==void 0&&(clearTimeout(wn),wn=void 0),Io=0}function ll(){if(Jr(),!V||!J())return;Io=mm;let e=()=>{if(wn=void 0,!(!V||!J())){if(Do()){Cn()==="refresh"&&!Ct?(Ct=!0,X(!0)):X(!1),Xr();return}Io-=1,Io>0&&(wn=setTimeout(e,um))}};e()}function Zr(){if(Ne===!0){Do()?X(!1):ll();return}Ne=!0,Ct=!1,Cn()==="refresh"?(Ct=!0,X(!0)):X(!1),Xr(),Do()||ll()}function Qr(){Ne=!1,Ct=!1,Yr(),Jr(),b(St)}function _o(){Lt===void 0&&(Lt=window.setTimeout(()=>{Lt=void 0,V&&(J()?Zr():Ne!==!1&&Qr())},cm))}function wm(){Tt||(Tt=history.pushState.bind(history),En=history.replaceState.bind(history),Sn=function(...t){let n=Tt(...t);return _o(),n},Ln=function(...t){let n=En(...t);return _o(),n},history.pushState=Sn,history.replaceState=Ln)}function Em(){Sn&&history.pushState===Sn&&Tt&&(history.pushState=Tt),Ln&&history.replaceState===Ln&&En&&(history.replaceState=En),Tt=null,En=null,Sn=null,Ln=null}function Sm(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(_o)}function Lm(e){if(!V||!J()||Cn()!=="manual"||Re().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(vn);if(!n||dl(n))return;let o=window.getSelection?.();o&&String(o).trim()||X(!0)}function Tm(){xn===void 0&&(xn=setInterval(()=>{if(!V)return;let e=J();if(e!==(Ne===!0)){e?Zr():Qr();return}e&&Do()&&X(!1)},dm))}function Cm(){xn!==void 0&&(clearInterval(xn),xn=void 0)}function cl(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var km="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Mm="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Am(e,t){let n=Tn(e);return n?n.length>yn?`Keep it to ${yn} characters.`:Re().length+(t?1:0)>Vr?`At most ${Vr} greetings.`:null:"Enter a greeting."}function Pm(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=Re(),s=Number(k.plain.index);e.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let d=document.createElement("textarea");d.className="bloom-gc-input",d.rows=3,d.maxLength=yn,d.placeholder="New greeting (line breaks ok)",d.value=t,d.addEventListener("input",()=>{t=d.value,o="";let f=l.querySelector(".bloom-gc-count");f&&(f.textContent=`${Tn(t).length}/${yn}`);let E=l.querySelector(".bloom-gc-error");E&&(E.textContent="")}),l.appendChild(d);let c=document.createElement("div");c.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${Tn(t).length}/${yn}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let v=document.createElement("div");if(v.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),v.appendChild(f)}let L=document.createElement("button");if(L.type="button",L.className="bloom-gc-btn bloom-gc-btn-primary",L.textContent=n>=0?"Update":"Add",L.addEventListener("click",()=>{let f=n<0,E=Am(t,f);if(E){o=E,i();return}let A=Tn(t),N=Re().slice();n>=0&&n<N.length?N[n]=A:N.push(A),sl(N),n=-1,t="",o="",i()}),v.appendChild(L),c.append(u,m,v),l.appendChild(c),e.appendChild(l),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let p=document.createElement("div");p.className="bloom-gc-list",a.forEach((f,E)=>{let A=document.createElement("div");A.className="bloom-gc-item",E===s&&(A.dataset.active="true");let N=document.createElement("button");N.type="button",N.className=`bloom-gc-body${r===E?"":" bloom-gc-clamp"}`,N.textContent=f,N.addEventListener("click",()=>{r=r===E?-1:E,i()});let kt=document.createElement("div");kt.className="bloom-gc-item-actions";let He=cl("Edit",km);He.addEventListener("click",()=>{n=E,t=f,o="",i()});let Z=cl("Delete",Mm);Z.addEventListener("click",()=>{let Mt=Re().filter((Ie,ge)=>ge!==E);sl(Mt),n===E?(n=-1,t=""):n>E&&(n-=1),i()}),kt.append(He,Z),A.append(N,kt),p.appendChild(A)}),e.appendChild(p)};return Oo=i,i(),()=>{Oo===i&&(Oo=null),e.replaceChildren()}}var ml=h({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:al,settings:k,start(){V=!0,S(al,il),wm(),No=new AbortController;let{signal:e}=No;window.addEventListener("popstate",_o,{signal:e}),document.addEventListener("click",Sm,{capture:!0,signal:e}),document.addEventListener("click",Lm,{signal:e}),Tm(),Ne=null,J()?Zr():Qr(),lm.debug("started")},stop(){V=!1,No?.abort(),No=null,Lt!==void 0&&(clearTimeout(Lt),Lt=void 0),Yr(),Jr(),Cm(),Em(),b(St),Ct=!1,Ne=null},onSettingsChange(){V&&(J()?(X(!1),Xr()):b(St))}});var kn=new x("Bloom"),fl=!1,Rm=Date.now(),Nm=[ia,Ha,Fa,Ka,Xa,ts,gs,bs,ws,Ds,Gs,nl,rl,ml];function $o(e){return new Promise(t=>setTimeout(t,e))}function Hm(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var gl=8e3,pl=300,Im=250;async function Om(){if(be())return await $o(pl),!0;for(;Date.now()-Rm<gl;)if(await $o(Im),be())return await $o(pl),!0;return be()||Ko()}function ei(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Bm(){if(ei())return!0;let e=Date.now()+gl;for(;Date.now()<e;)if(await $o(100),ei())return!0;return ei()}function Dm(){try{GM_registerMenuCommand?.("Bloom++ settings",ra)}catch{}}function _m(){Dn(()=>{Rt("HostShell"),kn.info("host shell",O)}),_n(()=>{kn.info("idle ready",O)}),$n(()=>{ri(),Rt("HostReady"),kn.info("chrome ready",O)})}async function ti(){await fi()}async function ni(){if(fl)return;fl=!0;for(let n of Nm)try{Ei(n)}catch(o){kn.error("register failed",n.name,o)}Ti(),Rt("Init"),Dm(),_m();let e=()=>Rt("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Hm(),Bm().then(n=>{n&&jn()}),!await Om()){kn.warn("late islands not detected; starting default plugins",O),_e(),qn();return}await Ri()}var hl=typeof unsafeWindow<"u"?unsafeWindow:window,$m=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||$m){let e=hl.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",O);try{Object.defineProperty(hl,"Bloom",{value:oi,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}ti().then(()=>ni()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
