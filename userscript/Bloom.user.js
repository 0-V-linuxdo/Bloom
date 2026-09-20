// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.57
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, thread outline, message times, streamer blur, custom home greeting, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
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

/* Bloom++ [20260920] v1.4.57. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var kd=Object.defineProperty;var Cd=(e,t)=>{for(var n in t)kd(e,n,{get:t[n],enumerable:!0})};var _a={};Cd(_a,{REPO_URL:()=>fs,Settings:()=>b,VERSION:()=>G,contextKeyFromUrl:()=>Ce,conversationTitle:()=>$t,conversationToken:()=>U,currentConversationId:()=>L,hasDraftText:()=>ne,hasErrorToast:()=>oe,hasLateIslands:()=>tt,init:()=>Da,initSettings:()=>Ba,isDocumentInteractive:()=>ps,isStreaming:()=>H,isUserDraftEmpty:()=>je,messageCreateTime:()=>dr,plugins:()=>ue,requestChromeReady:()=>jo,requestIdleReady:()=>Nt,requestShellReady:()=>Fo,setEditorText:()=>ke,subscribeHarvest:()=>V,watchStreamingEdge:()=>$,whenChromeReady:()=>qo,whenIdleReady:()=>$o,whenShellReady:()=>_o});var Oe=new Map,Ao=!1;function Md(){return document.getElementById("bloom-root")?.shadowRoot??null}function $a(){return document.head??null}function At(){let e=Md();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Ad()}function Xr(e,t){if(!Ao)return;let n=$a();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),At();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,At();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,At()}function w(e,t){let n=Oe.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},Oe.set(e,n)),Ao&&Xr(e,n)}function Jr(){if(!$a())return!1;Ao=!0;for(let[t,n]of Oe)Xr(t,n);return At(),!0}function qa(e){let t=Oe.get(e);t&&(t.disabled=!1,Ao&&Xr(e,t))}function Fa(e){let t=Oe.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),At())}function y(e){let t=Oe.get(e);t&&(t.el?.remove(),Oe.delete(e),At())}function Ad(){return Array.from(Oe.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function p(e){return e}var Zr=new Map;function Ho(e,t){let n=Zr.get(e);return n||(n=new Set,Zr.set(e,n)),n.add(t),()=>n.delete(t)}function et(e,t){let n=Zr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Hd="bloompp";function ja(){return new Promise((e,t)=>{let n=indexedDB.open(Hd,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function za(e){try{let t=await ja();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Ga(e,t){try{let n=await ja();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function wn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Te(e,t,n){return Math.min(n,Math.max(t,e))}function Ka(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Ua(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function Va(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var No=new v("SettingsStore"),Be="BloomSettings",Nd=100;function Ro(e){if(wn(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(wn(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return wn(n)?n:null}return null}catch{return null}}var Po=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[l,d]of this.defaultGetters)if(c.startsWith(l)){let u=c.slice(l.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return wn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){No.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Nd))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Be,this.plain)}catch{try{GM_setValue(Be,t)}catch(n){No.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(Be,t)}catch{}Ga(Be,t).catch(n=>No.warn("Failed to save settings to IndexedDB:",n))}catch(t){No.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Ka(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Pd=new v("Settings"),Rd={plugins:{}},b=new Po(structuredClone(Rd)),Id=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Od(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(b.store.plugins[n]||(b.store.plugins[n]={}),b.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?b.plain.plugins[n]??{}:{}}};return t}function Bd(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Wa(){let e=null;if(e=Ro(Bd(Be)),e||(e=Ro(await za(Be))),!e)try{e=Ro(localStorage.getItem(Be))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(b.plain.plugins=t),Pd.debug("Loaded settings")}}function Ya(e,t){t&&(t.pluginName=e,b.plain.plugins[e]||(b.plain.plugins[e]={}),b.setDefaultGetter(Id(e),n=>{if(n!=="enabled")return Od(t.def,n)}))}function Xa(){return b.plain.plugins.Settings||(b.store.plugins.Settings={}),b.store.plugins.Settings}function Io(){return Xa().pinnedPlugins??[]}function Ja(e){return Io().includes(e)}function Za(e){let t=Io(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Oo(){return Xa().starredPlugins??[]}function Qa(e){return Oo().includes(e)}function es(e){let t=Oo(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Bo=new v("PluginManager"),ue={},En=new Set;function os(e){if(ue[e.name]){Bo.warn("Duplicate plugin",e.name);return}ue[e.name]=e,Ya(e.name,e.settings)}function Ht(e){let t=ue[e];if(!t)return!1;if(t.required)return!0;let n=b.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function rs(e){let t=ue[e];if(!t||t.required)return;let n=!Ht(e);b.plain.plugins[e]||(b.store.plugins[e]={}),b.store.plugins[e].enabled=n,n?is(t):Dd(t),et("pluginToggle",{name:e,enabled:n})}function is(e,t=!1){if(!En.has(e.name)&&Ht(e.name))try{e.managedStyle&&qa(e.managedStyle),e.start?.(),En.add(e.name),e.settings&&b.addPrefixChangeListener(`plugins.${e.name}.`,()=>{En.has(e.name)&&e.onSettingsChange?.()}),t||Bo.debug("Started",e.name)}catch(n){Bo.error("Failed to start",e.name,n)}}function Dd(e){if(En.has(e.name)){try{e.stop?.()}catch(t){Bo.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Fa(e.managedStyle),y(e.managedStyle)),En.delete(e.name)}}function Sn(e){for(let t of Object.values(ue))(t.startAt??"DOMContentLoaded")===e&&is(t)}var ts=2,ns="defaultsRev";function as(){for(let t of Object.values(ue))b.plain.plugins[t.name]||(b.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=b.store.plugins.Settings??(b.store.plugins.Settings={});if(e[ns]!==ts){for(let t of["NoShareLink","NoDictation"]){let n=b.store.plugins[t]??(b.store.plugins[t]={});n.enabled=!1}e[ns]=ts}}var Tn=!1,Do=!1,Qr=!1,ls=[],cs=[],ds=[];function ei(e){let t=e.splice(0);for(let n of t)n()}function Ln(){Tn||(Tn=!0,ei(ls))}function ti(){Do||(Do=!0,Tn||Ln(),ei(cs))}function us(){Qr||(Qr=!0,Tn||Ln(),Do||ti(),ei(ds))}function _o(e){Tn?e():ls.push(e)}function $o(e){Do?e():cs.push(e)}function qo(e){Qr?e():ds.push(e)}function Fo(){Ln()}function Nt(){Ln(),ti()}function jo(){us()}function ss(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function ms(){await ss(4e3),Ln(),await ss(4e3),ti(),us()}var h={p:"0-V-linuxdo"},G="[20260920] v1.4.57",fs="https://github.com/0-V-linuxdo/Bloom";function _d(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function $d(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function ni(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function tt(){return ni()?_d()||$d():!1}function ps(){return tt()}var qd=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),gs=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Fd=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),jd="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Rt(e){return e.id==="bloom-root"||!!e.closest(jd)}function bs(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function zo(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function oi(e){if(!(e instanceof HTMLElement)||!e.isConnected||Rt(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&zo(t)?!1:e.getClientRects().length>0}function Pt(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function zd(){let e=[];for(let t of document.querySelectorAll(qd))!(t instanceof HTMLElement)||!t.isConnected||Rt(t)||e.push(t);return e}function Go(e){if(!e.isConnected||Rt(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function kn(){return zd().filter(Go)[0]??null}function ri(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||Rt(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function ii(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!Rt(n)&&!Pt(n)&&n.parentElement&&!Pt(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!Pt(o)&&!Rt(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!Pt(o.parentElement))return o}return t}function hs(){let e=document.querySelectorAll(gs);for(let n of e)if(oi(n)&&!zo(n)&&bs(n))return n;let t=document.querySelectorAll(Fd);for(let n of t){if(!oi(n)||!bs(n)||zo(n))continue;let o=n.querySelector(gs);return oi(o)&&!zo(o)?o:n}return null}function ys(){let e=kn();if(e){let t=ii(e),n=t.parentElement;if(n&&!Pt(n))return n;if(!Pt(t))return t}return ri()}function vs(e){let t=kn();return t?e.composedPath().includes(t):!1}var si=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Gd={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function li(e){return e==="auto"||e==="light"||e==="dark"}function Kd(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Ud(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function ai(e){let t=Kd(e);return t?Ud(t)>.55?"light":"dark":null}function Vd(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=ai(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=ai(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ai(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function xs(e){return e==="auto"?Vd():e}function Wd(e){try{let t=getComputedStyle(document.documentElement);for(let n of si){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function ws(e,t,n){let o=Gd[t];if(n){Wd(e);for(let r of si)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of si)e.style.setProperty(r,o[r])}function Es(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var ci=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Xd="bloom-root",me="bloom-rail-item",Yo="bloom-account-item",ot="bloom-sidebar-panel",Dn="bloom-plugin-dialog",tr="bloom-plugin-layer",Xo="bloom-settings-css",Jd=2e3,Rn=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Ls=null,Zd=null,qe=!1,fi=[],Ko=null,Jo=null,_e=null,Vo=null,Le=null,In=null,Cn,It=0,On=0,Mn=0,An=null,Hn=null,Zo=null,ks=null,Nn=null,di=[],Qo=!1,Qd=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],eu=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],nr="",Bn="all",Fe="all";function or(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Cs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function tu(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function nu(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function ou(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var ru={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function iu(e){return e.icon||ru[e.name]||or()}function Ms(){return li(Rn.store.appearance)?Rn.store.appearance:"auto"}function au(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=Rn.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=Ms(),n.addEventListener("change",()=>{li(n.value)&&(Rn.store.appearance=n.value)}),e.append(t,n),e}function ui(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),ws(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function As(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function Pn(){let e=Ms(),t=xs(e),n=e==="auto";ui(Ls,t,n);let o=document.getElementById(ot);o instanceof HTMLElement&&ui(o,t,n);let r=document.getElementById(Dn);r instanceof HTMLElement&&ui(r,t,n);let i=document.getElementById(me);i instanceof HTMLElement&&As(i),et("schemeChange",{scheme:t,pref:e})}function Hs(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Ns(){if(w("settings",ci),document.getElementById(Xo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Xo,e.textContent=ci,document.head.appendChild(e)}function su(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function lu(){for(let e of fi)e();fi=[]}function Ps(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function cu(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function bi(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function du(e){return bi(e).length>0}function Wo(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function uu(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=cu(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function mu(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(uu(t,n));let i=b.store.plugins[e]??(b.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",fi.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??Wo(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Wo(n)??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),r.appendChild(a),r}if(n.type===2){let a=Ps(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Wo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function Ss(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function fu(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=b.store.plugins[e.name]??(b.store.plugins[e.name]={});for(let[n,o]of bi(e)){if(n==="enabled"||o.type===5)continue;let r=Wo(o);r!==void 0&&(t[n]=r)}Is(e)}function Rs(e){e.key==="Escape"&&(!document.getElementById(tr)&&!document.getElementById(Dn)||(e.stopPropagation(),Ot()))}function pu(){Qo||(document.addEventListener("keydown",Rs),Qo=!0)}function gu(){Qo&&(document.removeEventListener("keydown",Rs),Qo=!1)}function Ot(){lu(),gu(),document.getElementById(tr)?.remove(),document.getElementById(Dn)?.remove()}function Is(e){if(Ot(),!document.body)return;let t=document.createElement("div");t.id=tr,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",$e),t.addEventListener("pointerup",$e),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&Ot()});let n=document.createElement("div");n.id=Dn,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",$e),n.addEventListener("pointerup",$e),n.addEventListener("click",$e);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=Cs(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Ot()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=Ss("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=Ss("Settings","bloom-plugin-dialog-settings"),c=document.createElement("div");c.className="bloom-plugin-dialog-settings-list";let l=bi(e);if(l.length)for(let[d,u]of l){let m=mu(e.name,d,u);m&&c.appendChild(m)}if(!c.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",c.appendChild(d)}if(s.appendChild(c),n.appendChild(s),l.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>fu(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),pu(),Pn()}function bu(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=iu(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let c=Qa(e.name),l=document.createElement("button");if(l.type="button",l.className=`bloom-icon-btn bloom-card-star${c?" bloom-card-star-active":""}`,l.setAttribute("aria-label",c?"Remove from favorites":"Add to favorites"),l.innerHTML=nu(c),l.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let f=es(e.name);et("pluginStar",{name:e.name,starred:f})}),s.appendChild(l),!e.required){let g=Ja(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),f.innerHTML=ou(g),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let q=Za(e.name);et("pluginPin",{name:e.name,pinned:q})}),s.appendChild(f)}if(du(e)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${e.name} settings`),g.innerHTML=tu(),g.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Is(e)}),s.appendChild(g)}let d=Ps(e.name,Ht(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",g=>g.stopPropagation()),u?.addEventListener("change",()=>{rs(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=e.description,n.appendChild(g)}let m=document.createElement("div");m.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let E=document.createElement("div");return E.className="bloom-card-author",E.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(E),t.append(n,m,S),t}function Os(){return Object.values(ue).filter(e=>!e.hidden&&e.name!=="Settings")}function Bs(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function hu(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function yu(){return nr.trim()?"No plugins match your search.":Fe==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function vu(){let e=Os();return eu.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Bs(n,t.id)))}function xu(){if(Nn){Nn.replaceChildren();for(let e of vu()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Fe===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Fe=e.id,nt()}),Nn.appendChild(t)}}}function wu(){let e=Os();if(Fe==="favorites"){let t=new Set(Oo());e=e.filter(n=>t.has(n.name))}else Fe!=="all"&&(e=e.filter(t=>Bs(t,Fe)));return Bn==="enabled"&&(e=e.filter(t=>Ht(t.name))),Bn==="disabled"&&(e=e.filter(t=>!Ht(t.name))),e}function nt(){if(!An)return;xu();let e=wu();Zo&&(Zo.placeholder=`Search ${e.length} plugins...`);let t=e,n=nr.trim().toLowerCase();if(n&&(t=t.filter(o=>hu(o).includes(n))),Fe!=="favorites"){let o=Io();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),c=r.has(a.name);return s!==c?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}An.replaceChildren();for(let o of t)An.appendChild(bu(o));Hn&&(Hn.hidden=t.length>0,Hn.textContent=yu())}function $e(e){e.stopPropagation()}function mi(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function hi(){document.getElementById(me)?.setAttribute("aria-expanded",qe?"true":"false")}function Eu(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function yi(){Ot(),nr="",Bn="all",Fe="all",document.getElementById(ot)?.remove(),qe=!1,hi()}function Su(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",$e),t.addEventListener("pointerup",$e),t.addEventListener("click",$e);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=or();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let c=document.createElement("p");c.className="bloom-settings-sub",c.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,c);let l=document.createElement("button");l.type="button",l.className="bloom-icon-btn",l.setAttribute("aria-label","Close"),l.innerHTML=Cs(),l.addEventListener("click",yi),o.append(r,l),n.appendChild(o),n.appendChild(au());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{nr=m.value,nt()});let S=document.createElement("select");S.className="bloom-search-filter",S.setAttribute("aria-label","Filter plugins");for(let f of Qd){let T=document.createElement("option");T.value=f.value,T.textContent=f.label,S.appendChild(T)}S.value=Bn,S.addEventListener("change",()=>{Bn=S.value,nt()}),u.append(m,S),n.appendChild(u);let E=document.createElement("div");E.className="bloom-plugin-list",n.appendChild(E);let g=document.createElement("p");return g.className="bloom-tab-empty",g.hidden=!0,n.appendChild(g),t.appendChild(n),An=E,Hn=g,Zo=m,ks=S,Nn=d,nt(),t}function Tu(e){e.classList.add("bloom-rail-dock")}function Lu(){let e=document.getElementById(me);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&Go(e)?e:null}function ku(){if(document.getElementById(ot)?.remove(),!document.body)return;let e=Su(ot);Tu(e),document.body.appendChild(e),qe=!0,Ot(),Pn(),hi(),et("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:G,dock:"center",rail:!!Lu()})}function vi(){let e=document.getElementById(ot);if(e instanceof HTMLElement&&e.isConnected&&Eu(e)){yi();return}e?.remove(),ku()}function Cu(){let e=document.createElement("button");return e.type="button",e.id=me,e.className="bloom-rail-item",e.setAttribute("aria-controls",ot),e.setAttribute("aria-expanded",qe?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${or()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),vi()}),e}function Ts(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function Mu(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Au(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function De(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function Ds(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=Mu(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&De(e,"padding-top",Math.round(i)),Number.isFinite(a)&&De(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));De(n,"width",c),De(n,"height",Math.max(20,Math.round(s.height)));let l=e.getBoundingClientRect(),d=Math.round(s.left-l.left);d>=0&&d<=40&&De(e,"padding-left",d);let u=Au(t,o);if(u){let m=u.getBoundingClientRect(),S=n.getBoundingClientRect(),E=Math.round(m.left-S.right);E>=0&&E<=24&&De(e,"gap",E)}}else{let s=Number.parseFloat(r.paddingLeft),c=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&De(e,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&De(e,"gap",Math.round(c))}As(e)}function pi(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Hu(){if(In?.isConnected&&Le){Le.observe(In,{childList:!0});return}gi()}function Nu(e){if(pi(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Pu(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){Mn=0;return}Mn+=1,On=Date.now()+Math.min(8e3,250*2**Math.min(Mn,5))})}function Ru(){It||Date.now()<On||(It=requestAnimationFrame(()=>{It=0,!(Date.now()<On)&&(document.getElementById(me)?.isConnected||er())}))}function er(){if(!document.body)return;Le?.disconnect();let e=null,t=!1;try{let n=document.getElementById(me);e=n instanceof HTMLButtonElement?n:Cu();let o=kn(),r=ri();if(o){let i=ii(o),a=i.parentElement;if(pi(i)||a&&pi(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),Ts(e),Ds(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),Ts(e,!0)):e.isConnected&&!Go(e)&&(e.remove(),e=null)}finally{Pu(e,t),Hu(),hi()}}function gi(){let e=ys();!e||!Nu(e)||In===e&&Le||(Le?.disconnect(),In=e,Le=new MutationObserver(()=>{document.getElementById(me)?.isConnected||Ru()}),Le.observe(e,{childList:!0}))}function Iu(){er(),gi(),Cn===void 0&&(Cn=window.setInterval(()=>{let e=document.getElementById(me);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=On&&er();else{Mn=0;let t=kn();t&&Ds(e,t)}gi()},Jd))}function Ou(){Cn!==void 0&&(clearInterval(Cn),Cn=void 0),It&&cancelAnimationFrame(It),It=0,On=0,Mn=0,Le?.disconnect(),Le=null,In=null}function Bu(e){Vo===e&&_e||(_e?.disconnect(),Vo=e,_e=new MutationObserver(()=>{if(!e.isConnected){_e?.disconnect(),_e=null,Vo=null;return}_s(e)}),_e.observe(e,{childList:!0}))}function _s(e){if(Bu(e),e.querySelector(`#${Yo}`))return;let t=document.createElement("button");t.type="button",t.id=Yo,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${or()}<span>Bloom++</span>`,t.addEventListener("pointerdown",mi),t.addEventListener("pointerup",mi),t.addEventListener("click",n=>{mi(n),vi()}),e.insertBefore(t,e.firstChild)}function Uo(){let e=hs();return e?(_s(e),!0):!1}function Du(e){vs(e)&&(queueMicrotask(Uo),requestAnimationFrame(()=>{Uo()}),window.setTimeout(Uo,60),window.setTimeout(Uo,180))}function _u(){Jo?.abort();let e=new AbortController;Jo=e,document.addEventListener("click",Du,{signal:e.signal})}function $u(){Jo?.abort(),Jo=null,_e?.disconnect(),_e=null,Vo=null}function $s(){Nt(),su(()=>{Ns(),Hs(),er(),vi()})}var qs=p({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[h.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Rn,startAt:"HostReady",cleanupSelectors:[`#${Xd}`,`#${me}`,`#${Yo}`,`#${ot}`,`#${tr}`,`#${Dn}`,`#${Xo}`,"#bloom-menu-panel"],start(){Ns(),Hs(),Iu(),_u(),Ko?.(),Ko=Es(Pn),Pn(),di=[Ho("pluginToggle",()=>{qe&&nt()}),Ho("pluginPin",()=>{qe&&nt()}),Ho("pluginStar",()=>{qe&&nt()})]},stop(){Ou(),$u(),Ko?.(),Ko=null;for(let e of di)e();di=[],yi(),document.getElementById(me)?.remove(),document.getElementById(Yo)?.remove(),document.getElementById(Xo)?.remove(),Ls=null,Zd=null,An=null,Hn=null,Zo=null,ks=null,Nn=null,qe=!1},onSettingsChange:Pn});var rr='form[data-type="unified-composer"], form.w-full[data-type]',fe=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Bt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Fs=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),js=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),qu=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Fu='[contenteditable="false"], button, [role="button"]';function ee(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function rt(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!ee(r)))return r;return null}function zs(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function C(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=zs(e);return!!(qu.test(n)||/^stop$/i.test(n))}function te(){let t=Array.from(document.querySelectorAll(rr)).find(ee);if(t instanceof HTMLElement)return t;let n=rt(document,fe),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function D(){let e=Array.from(document.querySelectorAll(fe));return e.find(ee)??e[0]??null}function ju(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(Fu);return!!n&&n!==t&&t.contains(n)}function xi(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&ju(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function ne(e){let t=e??D();return t?xi(t,t).replaceAll("\u200B","").trim().length>0:!1}function je(e){return!ne(e)}function ir(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Gs(e){let t=te();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!ee(n))&&e(n))return n;return null}function ze(){let e=te(),t=rt(e,Bt)??rt(document,Bt);return t&&!C(t)?t:Gs(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!C(n);let r=zs(n);return/^(send|send prompt|发送)$/i.test(r)&&!C(n)})}function it(){let e=te(),t=rt(e,Fs,!0)??rt(document,Fs,!0);if(t)return t;let n=rt(e,js)??rt(document,js);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&ee(o)&&C(o))return o}return Gs(C)}function K(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>xi(n,e)).join(`
`):xi(e,e)}function wi(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function ke(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),wi(e,n)}var Ks=/\/c\/([a-zA-Z0-9_-]{8,})/i;function U(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=l=>{let d=n.indexOf(l);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(l,d)=>{try{return document.querySelector(l)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Ce(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Dt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(Ks)?.[1]??""}catch{return e.match(Ks)?.[1]??""}}function L(){let e=Dt(location.pathname);if(e)return e;let n=U().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}var Ys=new v("Harvest"),zu=1500,Gu=200,ar=new Set,sr=new Map,lr=new Map,_t=null,cr=null,_n=null,pe=0;function Ku(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Uu(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Vu(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function Xs(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}var Wu=/"action"\s*:\s*"(next|continue|variant)"/i;function Yu(e,t,n){return!(t!=="POST"||Xs(e)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(e)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Wu.test(n))}function Xu(e,t){return t!=="GET"||Xs(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Us(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Js(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Ju(e){return typeof e=="string"?Js(e):""}function Ei(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return Ei(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Zs(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function Vs(e,t,n){!e||!t||lr.get(e)!==t&&(lr.set(e,t),Zs(lr,zu),Ge({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Zu(e,t){let n=t.trim();!e||!n||sr.get(e)!==n&&(sr.set(e,n),Zs(sr,Gu),Ge({type:"conversation-meta",conversationId:e,title:n}))}function $n(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let c of e)$n(c,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&Zu(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let c=i,l=typeof c.id=="string"?c.id:"",d=Ei(c.create_time??c.createTime??c.created_at);l&&d&&Vs(l,d,r)}let a=typeof o.id=="string"?o.id:"",s=Ei(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&Vs(a,s,r),o.mapping&&typeof o.mapping=="object")$n(o.mapping,r,n+1);else if(n<3)for(let c of Object.values(o))c&&typeof c=="object"&&$n(c,r,n+1)}function Ws(e,t){if(e)try{$n(JSON.parse(e),t)}catch{}}function Ge(e){for(let t of Array.from(ar))try{t(e)}catch{}}async function Qu(e,t,n){if(n===pe)try{let o=await e.json();if(n!==pe)return;$n(o,t)}catch{}}async function em(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===pe&&Ge({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),c=new TextDecoder,l="";try{for(;o===pe;){let{done:d,value:u}=await s.read();if(d)break;if(l+=c.decode(u,{stream:!0}),!r){let S=Js(l);S&&(r=S,Ge({type:"post-start",conversationId:r,url:""}))}let m=l.split(`
`);l=m.pop()??"";for(let S of m){let E=S.replace(/^data:\s*/,"").trim();!E||E==="[DONE]"||Ws(E,r)}/\[DONE\]/.test(l)||/"error"\s*:\s*\{/.test(l)?(/"error"\s*:\s*\{/.test(l)&&(i=!0),l=l.slice(-64)):l.length>16384&&(l=l.slice(-4096))}l&&o===pe&&Ws(l.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===pe&&Ge({type:"post-end",conversationId:r,error:i})}function tm(e,t,n){let o=Uu(t),r=Vu(t,n),i=Xu(o,r),a=Yu(o,r,n?.body),s=pe,c="";return a&&(c=Ju(n?.body)||Us(o)||Dt(o)||L(),Ge({type:"post-start",conversationId:c,url:o})),e(t,n).then(l=>{if(s!==pe||!i&&!a)return l;try{let d=l.clone();i?Qu(d,Us(o)||L(),s):em(d,c,!l.ok,s)}catch{a&&Ge({type:"post-end",conversationId:c,error:!l.ok})}return l},l=>{throw a&&s===pe&&Ge({type:"post-end",conversationId:c,error:!0}),l})}function nm(){if(_t)return;let e=Ku();_n=e,_t=e.fetch.bind(e);let t=(n,o)=>tm(_t,n,o);cr=t,e.fetch=t,Ys.debug("conversation fetch harvest hooked")}function om(){pe+=1,!(!_t||!_n)&&(cr&&_n.fetch===cr&&(_n.fetch=_t),_t=null,cr=null,_n=null,Ys.debug("conversation fetch harvest unhooked"))}function V(e){return ar.add(e),nm(),()=>{ar.delete(e),ar.size===0&&om()}}function $t(e){return e?sr.get(e)??"":""}function dr(e){return e?lr.get(e)??null:null}var tl=new v("Streaming");function Un(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!ee(t))&&(C(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function rm(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&ee(e))}function im(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&ee(e))}function am(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function oe(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function H(){if(it()||Un()||am())return!0;let e=ze();return e&&ee(e)&&!C(e)?!1:!!(rm()||im())}var sm=400,Qs=3,lt=new Set,Fn,jn=null,Si=null,st=!1,at=0,Ke="",ge="",zn=!1,Gn=!1,Kn=!1;function nl(){return Ce(U())}function el(e,t){return{streaming:e,contextKey:t,conversationId:L()}}function F(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function Ti(){st=!1,at=0,Ke="",zn=!1,Gn=!1,Kn=!1}function lm(e){for(let t of Array.from(lt))try{t.onFall?.(e)}catch{}}function cm(e){for(let t of Array.from(lt))try{t.onRise?.(e)}catch{}}function qn(e){for(let t of Array.from(lt))try{t.onTick?.(e)}catch{}}function dm(e,t){for(let n of Array.from(lt))try{n.onContext?.(e,t)}catch{}}function um(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&C(n)&&(zn=!0)}function mm(e){e.type==="post-end"&&st&&(Kn=!0,e.error&&(Gn=!0))}function fm(){let e=nl(),t=H();if(ge&&e&&ge!==e){if(dm(e,ge),!F(ge,e)){Ti(),ge=e,qn(el(t,e));return}Ke===ge&&(Ke=e)}ge=e;let n=el(t,e);if(t){let i=!st;i&&(zn=!1,Gn=!1,Kn=!1),st=!0,at=0,Ke=e,i&&cm(n),qn(n);return}if(!st){qn(n);return}if(at+=1,Kn&&(at=Math.max(at,Qs)),at<Qs){qn(n);return}let o=!!Ke&&Ke===e,r={contextKey:Ke||e,conversationId:L(),userStopped:zn,error:Gn||oe()};Ti(),o&&lm(r),qn(n)}function pm(){Fn===void 0&&(st=H(),ge=nl(),Ke=st?ge:"",at=0,zn=!1,Gn=!1,Kn=!1,jn?.abort(),jn=new AbortController,document.addEventListener("click",um,{capture:!0,signal:jn.signal}),Si=V(mm),Fn=setInterval(fm,sm),tl.debug("watchStreamingEdge started"))}function gm(){lt.size||(Fn!==void 0&&(clearInterval(Fn),Fn=void 0),jn?.abort(),jn=null,Si?.(),Si=null,Ti(),ge="",tl.debug("watchStreamingEdge stopped"))}function $(e){let t=typeof e=="function"?{onFall:e}:e;return lt.add(t),pm(),()=>{lt.delete(t),gm()}}var ol="bloom-host-icon",Vn="data-bloom-host-rel",Li="not all",ki=0,rl=0,bm=400;function il(e){ki+=1;try{e()}finally{ki-=1}}function ur(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Ue(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function al(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function hm(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function ym(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-rl<bm||(rl=n,e.appendChild(t))}function vm(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||ur(n)&&(n.getAttribute(Vn)||n.setAttribute(Vn,n.rel),n.media!==Li&&(n.media=Li),n.rel!==ol&&(n.rel=ol))}function xm(e){for(let t of e.querySelectorAll(`link[${Vn}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Vn);n&&(t.rel=n),t.removeAttribute(Vn),t.media===Li&&t.removeAttribute("media")}}function sl(e,t){let{head:n}=document;!n||!t||il(()=>{vm(n,e);let o=al(e),{type:r,sizes:i}=hm(t);o?ym(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function ll(e,t){let{head:n}=document;n&&il(()=>{al(e)?.remove(),xm(n)})}function cl(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(ki)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:ur(l.target)&&(a=!0,Ue(l.target.href)&&(s=l.target.href)));for(let d of l.removedNodes)ur(d)&&d.id===e&&(a=!0);for(let d of l.addedNodes)ur(d)&&d.id!==e&&(a=!0,Ue(d.href)&&(s=d.href))}if(!a)return;let c=()=>{o=0,t(s)};if(document.hidden){o&&(cancelAnimationFrame(o),o=0),c();return}o||(o=requestAnimationFrame(c))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var wm=["original","badge","dot","hole","bg"],ml=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],fl={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},mr="#FCFCFC",Em="#111111",dl="#111111",Sm="#ffffff",Tm="#212121",Lm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",km={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},fr=32,ul=64;function pl(e){return typeof e=="string"&&wm.includes(e)}function Cm(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function pr(e){let t=document.createElement("canvas");t.width=fr,t.height=fr;let n=t.getContext("2d");return n?(n.scale(fr/ul,fr/ul),e(n),t.toDataURL("image/png")):""}function Mm(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function gr(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Lm);n&&(e.strokeStyle=Em,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Am(e,t,n){let o=fl[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=dl,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=dl,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Sm,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Wn(e,t){if(e==="original")return t==="wait"?pr(o=>gr(o,mr)):Cm(km[t]);let n=t==="wait"?void 0:fl[t];return pr(e==="hole"?o=>gr(o,n??mr):e==="bg"?o=>{o.fillStyle=n??Tm,Mm(o,0,0,64,64,14),o.fill(),gr(o,mr,!1)}:o=>{gr(o,mr),t!=="wait"&&Am(o,t,e==="dot"?"dot":"badge")})}function gl(e){return{wait:Wn(e,"wait"),rotate:Wn(e,"rotate"),done:Wn(e,"done"),ready:Wn(e,"ready"),error:Wn(e,"error")}}var Hm=new v("ChatStateFavicons"),ut="bloom-chat-state-favicon",wl=["input","beforeinput","cut","paste","compositionend"],El=x({style:{type:3,description:"Favicon overlay",options:ml}}),he="",Mi={wait:"",rotate:"",done:"",ready:"",error:""},Yn="wait",ct=!1,be=!1,_=null,W="",Y="",mt=!0,qt=null,X=0,br=null,hr=null,dt=null,Ci=null,Ft=null,ie=!1,bl=new WeakSet;function Nm(){let e=El.store.style;return pl(e)?e:"bg"}function Sl(){let t=document.querySelector(`link[rel~="icon"]:not(#${ut}), link[data-bloom-host-rel]:not(#${ut})`)?.href;return Ue(t)?t:Ue(he)?he:""}function Pm(){let e=document.getElementById(ut);return e instanceof HTMLLinkElement?e:null}function Rm(){if(!Ue(he)){let e=Sl();e&&(he=e)}return Ue(he)?he:Mi.wait}function Tl(e){return e==="wait"?Rm():Mi[e]}function Ll(){sl(ut,Tl(Yn))}function re(e){let t=Tl(e);if(Yn===e){let n=Pm();if(n&&n.getAttribute("href")===t)return}Yn=e,Ll()}function hl(){Mi=gl(Nm()),re(Yn)}function kl(){return Ce(U())}function Ai(e,t){!e||!t||e===t||(_===e&&(_=t),W===e&&(W=t),Y===e&&(Y=t))}function Im(){let e=kl();return H()||ct||be?(W&&e&&W!==e&&F(W,e)?(Ai(W,e),W=e):!W&&e&&(W=e),W||e):(W="",e)}function yl(e){return!_||!e||_===e?!0:F(_,e)}function Cl(){ct=!1,be=!1,_=null,W=""}function Ml(e){Y=e,Cl(),mt=!1,re("wait")}function vl(e){return!e&&mt}function Om(){if(!ie)return;let e=kl();if(Y&&e&&Y!==e&&!F(Y,e)){Ml(e);return}Y&&e&&F(Y,e)&&Ai(Y,e),e&&(Y=e);let t=Im(),n=H(),o=je();if(oe()&&!n){re("error"),ct=!1,be=!1,_=null;return}if(n){ct||(mt=!1),ct=!0,be=!1,_=t,re("rotate");return}if(ct){let r=yl(t);if(ct=!1,r){be=!0,_=t,re("done");return}be=!1,_=null}if(be)if(_&&t&&!yl(t))be=!1,_=null;else if(o){_=t||_,re("done");return}else if(vl(o)){be=!1,re("ready");return}else{be=!1,re("wait");return}_=null,o?re("wait"):vl(o)?re("ready"):re("wait")}function Ve(){ie&&(Rl(),Hl(),Nl(),Om())}function Al(){if(Ft){for(let e of wl)Ft.removeEventListener(e,Pl,!0);Ft=null}}function Hl(){let e=te(),t=e&&e!==document.body?e:null;if(!(Ft===t&&t?.isConnected)&&(Al(),!!t)){Ft=t;for(let n of wl)Ft.addEventListener(n,Pl,{capture:!0,passive:!0})}}function Nl(){let e=te();if(!(dt&&Ci===e&&e.isConnected)){if(dt?.disconnect(),Ci=e,!e||e===document.body){dt=null;return}dt=new MutationObserver(()=>yr()),dt.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function yr(){if(ie){if(document.hidden){X&&(cancelAnimationFrame(X),X=0),Ve();return}X||(X=requestAnimationFrame(()=>{X=0,ie&&Ve()}))}}function Pl(){ne()&&(mt=!0),yr()}function xl(){ne()&&(mt=!0),yr()}function Bm(){ie&&(X&&(cancelAnimationFrame(X),X=0),Ve())}function Dm(){ie&&(mt=!1,Ve())}function _m(){ie&&Ve()}function $m(){ie&&Ve()}function qm(e,t){if(ie){if(F(t,e)){Ai(t,e),Y=e,Ve();return}Ml(e)}}function Rl(){let e=D();!e||bl.has(e)||(bl.add(e),e.addEventListener("input",xl,{capture:!0,passive:!0}),e.addEventListener("compositionend",xl,{capture:!0,passive:!0}))}var Il=p({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:El,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ut}`],start(){ie=!0,he=Sl()||he,hl(),hr?.disconnect(),hr=cl(ut,e=>{Ue(e)&&(he=e),Ll()}),qt?.abort(),qt=new AbortController,window.addEventListener("popstate",yr,{signal:qt.signal}),document.addEventListener("visibilitychange",Bm,{signal:qt.signal}),Rl(),Hl(),Nl(),br?.(),br=$({onRise:Dm,onFall:_m,onTick:$m,onContext:qm}),Ve(),Hm.debug("favicon watch started")},stop(){ie=!1,X&&cancelAnimationFrame(X),X=0,br?.(),br=null,qt?.abort(),qt=null,Al(),dt?.disconnect(),dt=null,Ci=null,hr?.disconnect(),hr=null,Cl(),Y="",mt=!0,Yn="wait",ll(ut,he)},onSettingsChange:hl});var Ol=`.bloom-ih-hud {
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
`;var Oh=new v("InputHistory"),Hi=/\u200B/g,Bl=10,Dl=500,_l=100,jm=8,zm=120,Gm=2e3,vr=10,xr=x({maxEntries:{type:4,description:"Max stored prompts",min:Bl,max:Dl,default:_l},history:{type:5,description:"Stored prompts",render:af},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Ni=new Map,N=0,Pi="",ye=!1,Jn=!1,Oi=0,Xn=null,Ri,Bi=null,$l=!0;function ae(){let e=xr.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ql(e){let t=Te(Number(xr.store.maxEntries??_l),Bl,Dl);return e.length>t?e.slice(e.length-t):e}function wr(e){xr.store.entries=ql(e)}function Km(e){return e.replaceAll(Hi,"").replace(/\n$/,"").trim()}function Ii(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(fe);return n instanceof HTMLElement?n:D()}function Um(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!K(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Hi,"").trim().length===0,last:i.toString().replaceAll(Hi,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Fl(e){clearTimeout(Ri),Ri=setTimeout(()=>{if(e!==Oi)return;Jn=!1;let t=Bi;t&&wi(t,$l)},zm)}function jl(e,t,n){Jn=!0,Bi=e,$l=n;let o=++Oi;ke(e,t,n),Fl(o)}function Vm(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function jt(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Wm(){document.querySelector(".bloom-ih-hud")?.remove()}function Ym(e,t){let n=Vm();n.textContent=e;let o=(t.closest("form")??te()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-jm)}px`,n.classList.add("bloom-ih-hud-on")}function Di(e){let t=Km(e);if(!t)return;let n=Date.now(),o=Ni.get(t);if(o&&n-o<Gm)return;Ni.set(t,n);let r=ae().filter(i=>i!==t);r.push(t),wr(r),N=ae().length,ye=!1,jt()}function Xm(e,t){let n=ae();if(!n.length&&e)return;N>=n.length&&(Pi=K(t),N=n.length);let o=e?N-1:N+1;o<0||o>n.length||(N=o,ye=!0,jl(t,o===n.length?Pi:n[o],e),o<n.length?Ym(`${o+1} / ${n.length}`,t):jt())}function Jm(e){ye=!1,jt(),jl(e,Pi,!1),N=ae().length}function Zm(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Ii(e.target)??Ii(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&ye&&!e.altKey&&!e.shiftKey){Jm(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Di(K(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=ae();if(!o){let i=Um(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||N<=0)||!n&&N>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Xm(n,t))}function Qm(e){if(Ii(e.target)){if(Jn){Fl(Oi);return}ye&&(ye=!1,jt(),N=ae().length)}}function ef(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(fe);n instanceof HTMLElement&&Di(K(n))}function tf(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Bt);if(!n||!(n instanceof HTMLElement)||C(n))return;let o=D();o&&Di(K(o))}function nf(e){if(!(!ye||Jn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}ye=!1,jt()}}function of(){if(Xn)return;Xn=new AbortController;let{signal:e}=Xn,t={capture:!0,signal:e};window.addEventListener("keydown",Zm,t),window.addEventListener("input",Qm,t),window.addEventListener("submit",ef,t),window.addEventListener("click",tf,t),window.addEventListener("pointerdown",nf,t)}function rf(e){let t=ae().slice();t.splice(e,1),wr(t),N>t.length&&(N=t.length)}function af(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=ae().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/vr));n>=c&&(n=c-1);let l=s.slice(n*vr,n*vr+vr);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),l.length){let f=document.createElement("div");f.className="bloom-ih-list",l.forEach((T,q)=>{let z=i.indexOf(T),vn=ae().length-1-z,Ct=document.createElement("div");Ct.className="bloom-ih-item";let Ie=document.createElement("button");Ie.type="button",Ie.className=`bloom-ih-body${o===q?"":" bloom-ih-clamp"}`,Ie.textContent=T,Ie.addEventListener("click",()=>{o=o===q?-1:q,r()});let xn=document.createElement("div");xn.className="bloom-ih-actions";let Mt=document.createElement("button");Mt.type="button",Mt.title="Copy",Mt.textContent="C",Mt.addEventListener("click",()=>{Ua(T)});let Qe=document.createElement("button");Qe.type="button",Qe.title="Delete",Qe.textContent="\xD7",Qe.addEventListener("click",()=>{rf(vn),r()}),xn.append(Mt,Qe),Ct.append(Ie,xn),f.appendChild(Ct)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${c}`;let E=document.createElement("button");E.type="button",E.className="bloom-ih-btn",E.textContent="Next",E.disabled=n+1>=c,E.addEventListener("click",()=>{n+=1,r()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(wr([]),N=0,r())}),u.append(m,S,E,g),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var zl=p({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:xr,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Ol),N=ae().length,ye=!1,of()},stop(){Xn?.abort(),Xn=null,jt(),Wm(),Ni.clear(),clearTimeout(Ri),Jn=!1,Bi=null,ye=!1},onSettingsChange(){let e=ae(),t=ql(e);t.length!==e.length&&wr(t),N>t.length&&(N=t.length)}});var _i="noShareLink",sf=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],lf=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],$i=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Gl(e){return`${e.join(",")}{display:none!important}`}function Kl(){let e=[];if($i.store.hideShareChat!==!1&&e.push(Gl(sf)),$i.store.hideShareProject!==!1&&e.push(Gl(lf)),!e.length){y(_i);return}w(_i,e.join(`
`))}var Ul=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:$i,start:Kl,onSettingsChange:Kl,stop(){y(_i)}});var Yl="noDictation",cf=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],df=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Xl=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Vl(e){return`${e.join(",")}{display:none!important}`}function Wl(){let e=[Vl(cf)];Xl.store.hideDictationSettings!==!1&&e.push(Vl(df)),w(Yl,e.join(`
`))}var Jl=p({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Xl,start:Wl,onSettingsChange:Wl,stop(){y(Yl)}});var qi="noSidebarIdentity",zt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],ec=zt.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),tc=zt.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),uf=[...ec,...tc],mf=[...ec,...zt.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],ff=zt.map(e=>`${e} a[href^="mailto:"]`),pf=zt.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),gf=zt.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Zn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Zl(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function bf(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function hf(){return`${gf.join(",")}{margin-block:auto!important}`}function yf(){return`${pf.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Ql(){let e=Zn.store.hideUsername!==!1,t=Zn.store.hideEmail!==!1,n=e&&Zn.store.enlargePlan!==!1,o=e&&Zn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(bf([...mf,...tc])),r.push(hf())):r.push(Zl(uf))),t&&r.push(Zl(ff)),n&&r.push(yf()),!r.length){y(qi);return}w(qi,r.join(`
`))}var nc=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Zn,start:Ql,onSettingsChange:Ql,stop(){y(qi)}});var oc=`#bloom-rt-host {
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
`;var ac=new v("RecentTopics"),Ut="bloom-rt-host",sc="home",lc=/^\/c\/([a-z0-9_-]{8,})/i,xf=/\/c\/([a-z0-9_-]{8,})/i,cc=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,wf=new Set(["Backquote","IntlBackslash"]),Ef=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Sf=140,Tf=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),P=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Tf},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Er=null,ji=null,j=!1,ro=!1,Qn=!1,ve=0,ft="",Gt=null,eo=null,Kt,Fi=null;function Lf(){let e=Number(P.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function to(){let e=P.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function zi(){let e=P.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function dc(){let e=P.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Gi(){let e=P.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Tr(e){let t=Lf();return e.length>t?e.slice(0,t):e}function xe(e){return e===sc}function no(e,t=Sf){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Ki(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(lc)?.[1]??""}catch{return e.match(xf)?.[1]??""}}function pt(){let e=(location.pathname||"/").match(lc);if(e?.[1])return e[1];let n=U().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return sc}function Ui(e){if(xe(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Ki(o.getAttribute("href")||"")!==e)continue;let r=no(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return pt()===e&&t&&!/^ChatGPT$/i.test(t)?no(t,80):""}function kf(e){if(xe(e))return"New chat";let t=zi()[e];if(t)return t;let n=$t(e);return n||Ui(e)||"Chat"}function Cf(e){return Gi()[e]||""}function Mf(e){return dc()[e]||{}}function Vi(e,t){if(!e||xe(e)||!t||/^new chat$/i.test(t.trim()))return;let n=zi();n[e]!==t&&(n[e]=t,P.store.titles=n)}function Af(e){e.type==="conversation-meta"&&(Vi(e.conversationId,e.title),j&&Vt())}function Hf(e,t){if(!e||xe(e)||!t)return;let n=Gi();n[e]!==t&&(n[e]=t,P.store.projects=n)}function Nf(e,t){if(!e||xe(e)||!t.user&&!t.assistant)return;let n=dc(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,P.store.previews=n)}function Wi(e){if(!e||xe(e)&&P.store.includeHome===!1)return;let t=to().filter(n=>n!==e);t.unshift(e),P.store.visits=Tr(t)}function Lr(){let e=P.store.includeHome!==!1;return Tr(to().filter(n=>e||!xe(n))).map(n=>({id:n,title:kf(n),project:Cf(n),preview:Mf(n)}))}function rc(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return no(r)}catch{return""}}function oo(e){if(!e||xe(e)||e!==pt())return;let t=Ui(e);t&&Vi(e,t);let n=rc("user"),o=rc("assistant");Nf(e,{user:n,assistant:o});let r=mc(e);if(r){let i=uc(r);i&&Hf(e,i)}}function Yi(){let e=zi(),t=Gi(),n=[],o=new Set,r=!1,i=!1;try{for(let l of document.querySelectorAll('a[href*="/c/"]')){if(l.closest(`#${Ut}, #bloom-root, #bloom-sidebar-panel`))continue;let d=Ki(l.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=no(l.textContent||"",80);u&&!cc.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=uc(l);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(P.store.titles=e),i&&(P.store.projects=t);let a=to(),s=new Set(a),c=n.filter(l=>!s.has(l));c.length&&(P.store.visits=Tr([...a,...c]))}function uc(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=no((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!cc.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function mc(e){if(xe(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Ki(t.getAttribute("href")||"")===e)return t}catch{}return null}function Pf(e){let t=mc(e);if(t){t.click();return}if(xe(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Rf(){let e=pt();ft&&ft!==e&&oo(ft),ft=e,Wi(e),Yi();let t=Ui(e);t&&Vi(e,t),oo(e)}function Sr(){Kt===void 0&&(Kt=window.setTimeout(()=>{Kt=void 0,Rf()},120))}function If(){Gt||(Gt=history.pushState.bind(history),eo=history.replaceState.bind(history),history.pushState=function(...t){let n=Gt(...t);return Sr(),n},history.replaceState=function(...t){let n=eo(...t);return Sr(),n})}function Of(){Gt&&(history.pushState=Gt),eo&&(history.replaceState=eo),Gt=null,eo=null}function Bf(e){return wf.has(e.code)||e.keyCode===192?!0:Ef.has(e.key)}function fc(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Df(e,t){ro=t,Yi(),oo(pt()),j=!0,ve=0;try{let n=pt();Wi(n);let o=Lr();o.length>1&&(ve=e?o.length-1:1)}catch(n){ac.error("Failed to open switcher:",n)}Vt()}function ic(e){let{length:t}=Lr();t&&(ve=(ve+(e?-1:1)+t)%t,Vt())}function Xi(){if(!j)return;let e=Lr()[ve];j=!1,ro=!1,Vt(),e&&Pf(e.id)}function pc(){j&&(j=!1,ro=!1,Vt())}function _f(e){if(fc(e)){Qn=!0;return}if((e.ctrlKey||Qn)&&!e.altKey&&!e.metaKey&&Bf(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{j?ic(e.shiftKey):Df(e.shiftKey,!0)}catch(n){ac.error("Hotkey failed:",n)}return}if(j){if(e.key==="Escape"){e.preventDefault(),pc();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Xi();return}e.key==="Tab"&&(e.ctrlKey||Qn)&&(e.preventDefault(),ic(e.shiftKey))}}function $f(e){fc(e)&&(Qn=!1,j&&ro&&Xi())}function qf(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Sr)}function Ff(e){!j||(e.target instanceof Element?e.target:null)?.closest(`#${Ut}`)||pc()}function jf(){document.visibilityState==="hidden"&&oo(pt())}function zf(){if(!document.body)return null;let e=document.getElementById(Ut);if(e instanceof HTMLElement)return ji=e,e;e=document.createElement("div"),e.id=Ut;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),ji=e,e}function Vt(){let e=zf();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!j){t.dataset.visible="false",t.replaceChildren();return}let n=Lr();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}ve>=n.length&&(ve=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===ve?"true":"false",s.setAttribute("aria-selected",a===ve?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let l=document.createElement("div");l.className="bloom-rt-project",l.textContent=i.project,s.append(l)}if(i.preview.user||i.preview.assistant){let l=document.createElement("div");if(l.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,l.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,l.append(d)}s.append(l)}s.addEventListener("click",()=>{ve=a,Xi()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Gf(){document.getElementById(Ut)?.remove(),ji=null}var gc=p({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Ut}`],settings:P,start(){w("recentTopics",oc),ft=pt(),Wi(ft),Yi(),oo(ft),Fi=V(Af),If(),Er=new AbortController;let{signal:e}=Er;window.addEventListener("keydown",_f,{capture:!0,signal:e}),window.addEventListener("keyup",$f,{capture:!0,signal:e}),window.addEventListener("popstate",Sr,{signal:e}),document.addEventListener("click",qf,{capture:!0,signal:e}),document.addEventListener("click",Ff,{signal:e}),document.addEventListener("visibilitychange",jf,{signal:e})},stop(){Er?.abort(),Er=null,Kt!==void 0&&(clearTimeout(Kt),Kt=void 0),Of(),Fi?.(),Fi=null,j=!1,ro=!1,Qn=!1,Gf()},onSettingsChange(){let e=Tr(to());e.length!==to().length&&(P.store.visits=e),j&&Vt()}});var Ji="cleaner",Kf=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Uf=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Vf=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Wf=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Yf=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Xf=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],gt=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Wt(e){return`${e.join(",")}{display:none!important}`}function bc(){let e=[];if(gt.store.hideDownloadApps!==!1&&e.push(Wt(Kf)),gt.store.hideDisclaimer!==!1&&e.push(Wt(Uf)),gt.store.hideUpgrade!==!1&&e.push(Wt(Vf)),gt.store.hideLockedModels!==!1&&e.push(Wt(Wf)),gt.store.hideHomePromo!==!1&&e.push(Wt(Yf)),gt.store.hideAds!==!1&&e.push(Wt(Xf)),!e.length){y(Ji);return}w(Ji,e.join(`
`))}var hc=p({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:gt,start:bc,onSettingsChange:bc,stop(){y(Ji)}});var Cr=new v("ResponseNotification"),Xt=x({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:op},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Zi=!1,kr=null,Yt=null,io=null;function Jf(){return document.visibilityState==="hidden"||document.hidden}function Zf(){return Xt.store.onlyWhenHidden===!1?!0:Jf()}function Qf(){let e=$t(L());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function yc(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Yt||Yt.state==="closed")&&(Yt=new e);let t=Yt,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){Cr.debug("chime failed",e)}}function ep(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){Cr.debug("custom sound failed",t),yc()}}function vc(){let e=String(Xt.store.soundUrl||"").trim();e?ep(e):yc()}function tp(){let e="Bloom++",t=`${Qf()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Cr.debug("notification failed",n)}}function np(){Zf()&&(Xt.store.sound!==!1&&vc(),Xt.store.browserNotification!==!1&&tp())}function op(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>vc()),e.appendChild(t),()=>{t.remove()}}var xc=p({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Xt,start(){Zi=!0,kr?.(),kr=$(e=>{Zi&&(e.userStopped||e.error||np())}),io?.abort(),io=new AbortController,Xt.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:io.signal}),Cr.debug("watch started")},stop(){Zi=!1,kr?.(),kr=null,io?.abort(),io=null;try{Yt?.close()}catch{}Yt=null}});var wc=`#bloom-pq-chip {
    position: fixed;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: min(32rem, calc(100vw - 2rem));
    padding: 6px 8px 6px 12px;
    border-radius: 999px;
    border: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
    background: var(--bg-primary, var(--main-surface-primary, #fff));
    color: var(--text-primary, inherit);
    box-shadow: var(--shadow-long, 0 4px 16px rgba(0, 0, 0, 0.12));
    font: 13px/1.3 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    transform: translateX(-50%);
    pointer-events: auto;
}

.bloom-pq-kicker {
    flex: none;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--text-secondary, #5d5d5d);
}

.bloom-pq-text {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-pq-actions {
    display: flex;
    flex: none;
    gap: 2px;
}

.bloom-pq-btn {
    appearance: none;
    height: 28px;
    padding: 0 10px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
}

.bloom-pq-btn:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.06));
}

.bloom-pq-send {
    color: var(--text-primary, inherit);
}

.bloom-pq-x {
    width: 28px;
    padding: 0;
    font-size: 16px;
    line-height: 1;
    color: var(--text-secondary, #5d5d5d);
}

@media (prefers-reduced-motion: reduce) {
    #bloom-pq-chip { transition: none; }
}
`;var co=new v("PromptQueue"),ea="bloom-pq-chip",Ec="promptQueue",Sc=80,ip=50,ap=2e3,Cc=x({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),I=new Map,Me=!1,se="",R="",Ye=!1,le=!1,M=null,ao=null,Mr=null,lo,so,Jt=null;function Zt(){return Ce(U())}function Qt(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function Tc(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(fe);return n instanceof HTMLElement?n:D()}function ta(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function Mc(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function sp(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?Qt(t.innerText||t.textContent||""):""}catch{return""}}function Lc(e){if(!se||se===e)return;let t=I.get(se);!t||I.has(e)||F(se,e)&&(I.delete(se),I.set(e,t),R===se&&(R=e),M?.key===se&&(M.key=e),co.debug("migrated pending",se,"\u2192",e))}function na(e){let t=Zt();if(I.get(t)&&Cc.store.replacePending===!1)return;I.set(t,{text:e,at:Date.now()}),M={key:t,text:e,turns:Mc(),ticks:3};let o=D();o&&ke(o,""),We(),co.debug("queued",t,e.length)}function lp(e){I.delete(e),R===e&&(R=""),M?.key===e&&(M=null),We()}function cp(){le=!0,clearTimeout(so),so=setTimeout(()=>{le=!1,so=void 0},ap)}function dp(){let e=Zt(),t=I.get(e);if(!t)return;let n=D();if(!n)return;I.delete(e),R="",We(),cp(),ke(n,t.text);let o=ze();o&&!C(o)&&!ir(o)&&(o.click(),le=!1)}function kc(e){if(!Me||Ye||H()||Zt()!==e)return;let t=I.get(e);if(!t){R="";return}if(oe())return;let n=D();if(!n)return;if(!je(n)){let r=Qt(K(n));if(r&&r!==t.text)return}let o=ze();!o||C(o)||ir(o)||(Ye=!0,ke(n,t.text),clearTimeout(lo),lo=setTimeout(()=>up(e,t.text),ip))}function up(e,t){lo=void 0;try{if(!Me)return;let n=I.get(e);if(!n||n.text!==t||H()||Zt()!==e)return;let o=D();if(!o)return;let r=Qt(K(o));if(r&&r!==t&&!je(o))return;r!==t&&ke(o,t);let i=ze();if(!i||C(i)||ir(i))return;i.click(),I.delete(e),R="",We(),co.debug("drained",e)}finally{Ye=!1}}function Ac(e){let t=te();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function Qi(){Jt?.remove(),Jt=null}function We(){if(!Me||!document.body){Qi();return}let e=Zt(),t=I.get(e);if(!t){Qi();return}let n=Jt;n?.isConnected||(n=document.createElement("div"),n.id=ea,document.body.appendChild(n),Jt=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>Sc?`${t.text.slice(0,Sc)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),dp()});let c=document.createElement("button");c.type="button",c.className="bloom-pq-btn bloom-pq-x",c.setAttribute("aria-label","Dismiss queued prompt"),c.textContent="\xD7",c.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),lp(e)}),a.append(s,c),n.append(o,r,a),Ac(n)}function mp(){if(!M)return;if(M.ticks-=1,I.get(M.key)&&Mc()>M.turns){let t=sp();if(t&&t===M.text){co.debug("native send leaked; dropping pending"),I.delete(M.key),R===M.key&&(R=""),M=null,We();return}}M.ticks<=0&&(M=null)}function fp(e){if(!Me||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||Ye)return;let t=Tc(e.target)??Tc(document.activeElement);if(!t||!H())return;if(e.altKey||le){le=!1;return}if(!ne(t))return;let n=Qt(K(t));n&&(ta(e),na(n))}function pp(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||C(t))return null;let n=e.closest(Bt);if(n instanceof HTMLElement&&!C(n))return n;let o=ze();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function gp(e){if(!Me)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${ea}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&C(n)||Ye||!H()||!pp(t))return;if(le){le=!1;return}let o=D();if(!o||!ne(o))return;let r=Qt(K(o));r&&(ta(e),na(r))}function bp(e){if(!Me)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(rr)&&!t.querySelector(fe)||Ye||!H())return;if(le){le=!1;return}let n=D()??t.querySelector(fe);if(!n||!ne(n))return;let o=Qt(K(n));o&&(ta(e),na(o))}var Hc=p({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Ec,cleanupSelectors:[`#${ea}`],settings:Cc,start(){Me=!0,se=Zt(),R="",Ye=!1,le=!1,M=null,w(Ec,wc),ao?.abort(),ao=new AbortController;let{signal:e}=ao;window.addEventListener("keydown",fp,{capture:!0,signal:e}),document.addEventListener("click",gp,{capture:!0,signal:e}),document.addEventListener("submit",bp,{capture:!0,signal:e}),Mr?.(),Mr=$({onFall(t){if(Me){if(t.userStopped||t.error){R="",We();return}R=t.contextKey,kc(t.contextKey)}},onContext(t){Lc(t),se=t,We()},onTick(t){Lc(t.contextKey),se=t.contextKey,mp(),R&&R===t.contextKey&&kc(R),Jt&&Ac(Jt)}}),We(),co.debug("watch started")},stop(){Me=!1,Mr?.(),Mr=null,ao?.abort(),ao=null,clearTimeout(lo),lo=void 0,clearTimeout(so),so=void 0,I.clear(),M=null,R="",Ye=!1,le=!1,Qi()}});var Nc=`.bloom-cls {
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
`;var Ic=new v("ChatListStatus"),Pc="chatListStatus",Nr="bloom-cls",yp="bloom-cls",vp=1200*1e3,xp="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",we=new Map,Ee=!1,en="",Ae=!1,J=0,Xe=null,ia=null,tn=null,oa=null,Ar=null,uo=null,nn=!1,on=new Set;function Hr(){return Date.now()}function Oc(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function bt(e,t,n,o=!0){if(!(!e||!Ee)){if(t==="idle")we.delete(e);else{let r=we.get(e);r&&r.kind===t&&n!=="net"?r.at=Hr():we.set(e,{kind:t,at:Hr(),source:n})}o&&wp({v:1,id:e,kind:t,at:Hr()}),rn()}}function wp(e){try{tn?.postMessage(e)}catch{}}function Ep(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||bt(t.id,t.kind,"bc",!1)}function Sp(){let e=Hr();for(let[t,n]of we)n.kind==="streaming"&&e-n.at>vp&&we.delete(t)}function Tp(){let e=Oc();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(xp))continue;let r=Dt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Rc(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function ra(e){let t=e.querySelector(`:scope > .${Nr}`);return t||null}function aa(){if(!Ee)return;Sp();let e=L(),t=Tp();Xe?.disconnect();try{for(let n of t){let o=Dt(n.getAttribute("href")||"");if(!o||!e||o!==e){ra(n)?.remove();continue}let i=we.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){ra(n)?.remove();continue}let a=ra(n);a||(a=document.createElement("span"),a.className=Nr,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Rc("streaming")):i==="error"&&a.appendChild(Rc("error")))}}catch(n){Ic.debug("paint failed",n)}Bc()}function rn(){if(Ee){if(document.hidden){J&&(cancelAnimationFrame(J),J=0),aa();return}J||(J=requestAnimationFrame(()=>{J=0,Ee&&aa()}))}}function Bc(){let e=Oc();if(!(Xe&&ia===e&&e?.isConnected)){if(Xe?.disconnect(),ia=e,!e){Xe=null;return}Xe=new MutationObserver(()=>rn()),Xe.observe(e,{childList:!0,subtree:!0})}}function sa(){return!!(it()||Un())}function Lp(e){return!!(nn||e&&on.has(e)||sa())}function kp(e){if(Ee){if(e.type==="post-start"){e.conversationId?(nn=!1,on.add(e.conversationId),Ae=!0,bt(e.conversationId,"streaming","net")):(nn=!0,Ae=!0);return}e.type==="post-end"&&(nn=!1,e.conversationId&&(on.delete(e.conversationId),bt(e.conversationId,e.error?"error":"done","net")),sa()||(Ae=!1))}}function Cp(e,t){if(!Ee)return;if(F(t,e)){rn();return}let n=L();if(!(nn||n&&on.has(n))){if(Ae=!1,n&&we.get(n)?.kind==="streaming"&&we.get(n)?.source==="local"){bt(n,"idle","local");return}rn()}}function Mp(e){if(!Ee)return;let t=e.conversationId||L();if(en&&t&&en!==t){let o=we.get(en);o?.kind==="streaming"&&o.source==="local"&&bt(en,oe()?"error":"done","local"),Ae=!!(t&&on.has(t))}if(en=t,Lp(t)&&(e.streaming||sa())){Ae=!0,t&&bt(t,"streaming","local"),rn();return}Ae&&(Ae=!1,t&&bt(t,oe()?"error":"done","local")),rn()}var Dc=p({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Nr}`],start(){Ee=!0,w(Pc,Nc);try{tn=new BroadcastChannel(yp)}catch{tn=null}tn?.addEventListener("message",Ep),oa=V(kp),Ar?.(),Ar=$({onTick:Mp,onContext:Cp}),uo?.abort(),uo=new AbortController,document.addEventListener("visibilitychange",()=>{Ee&&(J&&(cancelAnimationFrame(J),J=0),aa())},{signal:uo.signal}),Bc(),Ic.debug("sidebar status watch started")},stop(){Ee=!1,J&&cancelAnimationFrame(J),J=0,uo?.abort(),uo=null,Xe?.disconnect(),Xe=null,ia=null,Ar?.(),Ar=null,oa?.(),oa=null;try{tn?.close()}catch{}tn=null,we.clear(),on.clear(),nn=!1,Ae=!1,en="",document.querySelectorAll(`.${Nr}`).forEach(e=>e.remove()),y(Pc)}});var $c="widerChat",qc=40,Fc=96,jc=64,zc=x({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:qc,max:Fc,default:jc}});function Ap(){return Te(Number(zc.store.width??jc),qc,Fc)}function _c(){let e=Ap(),t=`min(100%,${e}rem)`;w($c,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var Gc=p({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:zc,start:_c,onSettingsChange:_c,stop(){y($c)}});var la="composerOpacity",an='form[data-type="unified-composer"],form.w-full[data-type]',Hp=[`${an} [class*="corner-superellipse"]`,`${an} [class*="bg-token-bg-primary"]`,`${an} [class*="bg-token-main-surface"]`].join(","),Np=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Pp="#thread-bottom-container,#thread-bottom",Rp=`${an} #prompt-textarea,${an} [contenteditable="true"]`,Ip="var(--bg-primary,var(--main-surface-primary,#ffffff))",ca=x({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Op(){return Te(Number(ca.store.opacity??100),0,100)}function Bp(){return Te(Number(ca.store.blur??16),0,40)}function Kc(){let e=Op();if(e>=100){y(la);return}let t=Bp(),n=`color-mix(in srgb,${Ip} ${e}%,transparent)`,o=t>0?`-webkit-backdrop-filter:blur(${t}px)!important;backdrop-filter:blur(${t}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(la,`${Pp}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Np}{display:none!important}${an}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Hp}{background-color:${n}!important;background-image:none!important;${o}}${Rp}{background-color:transparent!important;background-image:none!important}`)}var Uc=p({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[h.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:ca,start:Kc,onSettingsChange:Kc,stop(){y(la)}});var Vc=`#bloom-bn-host {
    position: fixed;
    z-index: 4200;
    width: 2.5rem;
    box-sizing: border-box;
    pointer-events: none;
    transform: translateY(-50%);
    font: 13px/1.35 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    color: var(--text-primary, #0d0d0d);
}

#bloom-bn-host[hidden] {
    display: none !important;
}

.bloom-bn-ticks {
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 4px;
    width: 2.5rem;
    max-height: var(--bloom-bn-cap, min(70vh, 28rem));
    padding: 8px 0;
    box-sizing: border-box;
    overflow: hidden;
}

.bloom-bn-tick {
    appearance: none;
    flex: 0 0 auto;
    width: 2.5rem;
    height: 8px;
    margin: 0;
    padding: 0 0.25rem;
    border: 0;
    background: transparent;
    cursor: pointer;
}

.bloom-bn-tick::after {
    content: "";
    display: block;
    width: 6px;
    height: 2px;
    margin-left: auto;
    border-radius: 999px;
    background: var(--text-tertiary, #8f8f8f);
    opacity: 0.7;
}

.bloom-bn-tick-asst::after {
    width: 10px;
    opacity: 0.45;
}

.bloom-bn-tick.bloom-bn-current::after {
    width: 14px;
    height: 3px;
    background: var(--text-primary, #0d0d0d);
    opacity: 1;
}

.bloom-bn-dense {
    gap: 2px;
}

.bloom-bn-dense .bloom-bn-tick {
    height: 4px;
}

.bloom-bn-dense .bloom-bn-tick::after {
    height: 1px;
}

.bloom-bn-tick-live::after {
    height: 0;
    background: none;
    border-radius: 0;
    border-top: 1px dashed var(--text-tertiary, #8f8f8f);
    opacity: 0.7;
}

.bloom-bn-tick-live.bloom-bn-current::after {
    height: 0;
    background: none;
    border-top-color: var(--text-primary, #0d0d0d);
    opacity: 1;
}

.bloom-bn-dense .bloom-bn-tick-live::after {
    height: 0;
    background: none;
}

.bloom-bn-menu {
    position: absolute;
    top: 50%;
    right: calc(100% + 0.25rem);
    display: flex;
    flex-direction: column;
    width: min(18rem, 70vw);
    max-height: min(70vh, 28rem, var(--bloom-bn-cap, 28rem));
    padding: 0;
    box-sizing: border-box;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate(6px, -50%);
    transition: opacity 0.12s ease, transform 0.12s ease, visibility 0s linear 0.12s;
}

#bloom-bn-host:hover .bloom-bn-menu,
#bloom-bn-host:focus-within .bloom-bn-menu {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translate(0, -50%);
    transition-delay: 0s;
}

.bloom-bn-card {
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: inherit;
    overflow: hidden;
    padding: 0.375rem;
    border-radius: 1.25rem;
    border: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
    background: var(--bg-primary, var(--main-surface-primary, #fff));
    box-shadow: var(--shadow-long, 0 8px 24px rgba(0, 0, 0, 0.12));
}

.bloom-bn-meta {
    flex: none;
    margin: 0;
    padding: 0.25rem 0.625rem 0.375rem;
    font-size: 11px;
    letter-spacing: -0.1px;
    color: var(--text-secondary, #5d5d5d);
}

.bloom-bn-list {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-height: 0;
    overflow: auto;
    margin: 0;
    padding: 0;
    list-style: none;
}

.bloom-bn-item {
    appearance: none;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    width: 100%;
    margin: 0;
    padding: 0.4rem 0.5rem;
    border: 0;
    border-radius: 0.75rem;
    background: transparent;
    color: inherit;
    text-align: start;
    cursor: pointer;
}

.bloom-bn-item:hover,
.bloom-bn-item:focus-visible {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
    outline: none;
}

.bloom-bn-item.bloom-bn-active {
    background: var(--main-surface-secondary, #f4f4f4);
}

.bloom-bn-mark {
    flex: none;
    width: auto;
    min-width: 1.75em;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--text-tertiary, #8f8f8f);
}

.bloom-bn-item.bloom-bn-user .bloom-bn-mark {
    color: var(--text-secondary, #5d5d5d);
}

.bloom-bn-label {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    letter-spacing: -0.2px;
}

#thread [data-message-id] {
    scroll-margin-top: 72px;
}

.bloom-bn-flash {
    outline: 2px solid var(--text-primary, #0d0d0d);
    outline-offset: 4px;
    border-radius: 14px;
}

@media (max-width: 720px) {
    #bloom-bn-host { display: none !important; }
}

@media (prefers-reduced-motion: reduce) {
    .bloom-bn-menu {
        transition: none;
        transform: translate(0, -50%);
    }
    #bloom-bn-host:hover .bloom-bn-menu,
    #bloom-bn-host:focus-within .bloom-bn-menu {
        transform: translate(0, -50%);
    }
    .bloom-bn-flash {
        outline-width: 1px;
    }
    .bloom-bn-tick::after {
        transition: none;
    }
}
`;var _p=new v("BetterNavigator"),da="betterNavigator",Wc="bloom-bn-host",pa=60,$p=16,qp=1e3,Fp=2.5,jp=.4,Rr="\u6B63\u5728\u8F93\u51FA\u2026",zp=40,Gp=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,Kp=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Up=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),Vp=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),_r=x({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),sn=new Map,ln=new Set,ce=!1,vt=!1,Je=null,bo=null,xt=null,Ir=null,O=[],wt="",Or=0,Br=-1,xa=0,Dr="",Z=0,He=0,mo,fo=null,Pr=null,ua=null,ma=null,ht=null,ga=null,po=null,yt=null,cn=null,go=null;function $r(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function fa(e){let t=e.trim();if(!t)return 0;let n=Number.parseFloat(t);return Number.isFinite(n)?t.endsWith("rem")?n*16:n:0}function Wp(e){let t=e.className;return typeof t=="string"?t:e.getAttribute("class")||""}function Yp(e){let t=e.getBoundingClientRect(),n=null;try{let i=e.querySelector("[data-message-id]");for(;i&&i!==e;)Gp.test(Wp(i))&&(n=i),i=i.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let r=n.getBoundingClientRect();if(r.width>160&&r.width<=t.width+8)return r}let o=0;try{o=fa(getComputedStyle(e).getPropertyValue("--thread-content-max-width"))||fa(getComputedStyle(e).getPropertyValue("--thread-content-width"))||fa(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(o>160){let r=Math.min(o,t.width),i=t.left+Math.max(0,(t.width-r)/2);return new DOMRect(i,t.top,r,t.height)}return t}function Xp(e){try{return!!e.closest(Kp)}catch{return!0}}function Jp(e){let t=(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||e.getAttribute("data-turn")||"").toLowerCase();if(t==="user"||t==="assistant")return t;let n=(e.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function Yc(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(r){let i=r.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(Up))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(r.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),o;for(;(o=n.nextNode())&&t.join(" ").length<pa+20;)t.push((o.textContent||"").replace(/\s+/g," ").trim());return t.join(" ").replace(/\s+/g," ").trim()}function Zp(e,t){try{if(e.querySelector("img, picture, video, canvas"))return"Image";if(e.querySelector("a[download], [class*='attachment']"))return"File";if(e.querySelector("pre, code"))return"Code"}catch{}return`Message ${t+1}`}function Qp(e,t){let n=t==="user"?e.querySelector(".whitespace-pre-wrap")??e:e.querySelector(".markdown")??e;return Yc(n)}function eg(e){return e.length>pa?`${e.slice(0,pa).trimEnd()}\u2026`:e}function tg(e,t,n,o){let r=Qp(e,t);return r?eg(r):o?Rr:Zp(e,n)}function ng(){if(vt)return!0;let e=L();return!!(e&&ln.has(e)||it()||Un())}function og(e){try{if(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")||e.querySelector("[aria-busy='true'], .result-streaming"))return!0;let t=e.querySelector(".markdown");if((!t||t instanceof HTMLElement&&!Yc(t))&&e.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function rg(){let e=$r();if(!e||e===document.body)return[];let t=_r.store.showAssistant!==!1,n=t&&ng(),o=[];try{for(let r of e.querySelectorAll("[data-message-id]")){if(Xp(r))continue;let i=r.getAttribute("data-message-id")||"";if(!i)continue;let a=Jp(r);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!t)continue;let s=a==="assistant"&&n&&og(r),c=tg(r,a,o.length,s);c&&c!==Rr&&c!==sn.get(i)&&sn.set(i,c);let l=s&&c===Rr?Rr:sn.get(i)||c;o.push({id:i,el:r,role:a,text:l,live:s})}}catch{}return o}function ig(){let t=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(t,48),88)}function Xc(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let o=getComputedStyle(t).overflowY;if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight+8)return t;t=t.parentElement}return window}function ag(e){return e===window?window.innerHeight:e.clientHeight}function sg(e){let t=e instanceof Element?e:e instanceof Node?e.parentElement:null;if(!t)return!1;try{return!!t.closest(Vp)}catch{return!1}}function Jc(){mo!==void 0&&(clearTimeout(mo),mo=void 0),fo?.classList.remove("bloom-bn-flash"),fo=null}function lg(e){Jc(),e.classList.add("bloom-bn-flash"),fo=e,mo=setTimeout(()=>{e.classList.remove("bloom-bn-flash"),fo===e&&(fo=null),mo=void 0},800)}function ba(e){if(!O.length)return;let t=Math.max(0,Math.min(e,O.length-1));Or=t,bo?.querySelectorAll(".bloom-bn-tick").forEach((o,r)=>{o.classList.toggle("bloom-bn-current",r===t)}),xt?.querySelectorAll(".bloom-bn-item").forEach((o,r)=>{o.classList.toggle("bloom-bn-active",r===t)}),Ir&&(Ir.textContent=`${t+1} / ${O.length}`);let n=xt?.children[t];if(n instanceof HTMLElement){let o=xt;if(o){let r=n.offsetTop-o.clientHeight/2+n.offsetHeight/2;o.scrollTop=Math.max(0,r)}}}function ha(e){let t=O[e];if(!t?.el.isConnected)return;Br=e,xa=Date.now()+qp,ba(e);let n=cn??Xc(t.el),r=Math.abs(t.el.getBoundingClientRect().top-ig())>Fp*ag(n);t.el.scrollIntoView({behavior:r?"auto":"smooth",block:"start"}),_r.store.jumpEffect!=="none"&&lg(t.el)}function wa(){if(!ce||!O.length)return;if(Date.now()<xa&&Br>=0){ba(Br);return}let e=window.innerHeight*jp,t=0;for(let n=0;n<O.length;n++){let o=O[n].el;o.isConnected&&o.getBoundingClientRect().top<=e&&(t=n)}ba(t)}function cg(e){let t=Xc(e);if(cn===t&&go)return;go?.(),cn=t;let n=t===window?document:t,o=()=>{wa(),Ea()};n.addEventListener("scroll",o,{passive:!0}),go=()=>n.removeEventListener("scroll",o)}function dg(e){yt?.disconnect(),yt=null;let t=cn instanceof HTMLElement?cn:null;yt=new IntersectionObserver(()=>wa(),{root:t,threshold:[0,.15,.4,.75,1]});for(let n of e)n.el.isConnected&&yt.observe(n.el)}function ug(){if(!document.body)return null;let e=Je;if(e?.isConnected)return e;e=document.createElement("div"),e.id=Wc,e.className="bloom-bn-host",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Conversation outline"),e.hidden=!0;let t=document.createElement("div");t.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let o=document.createElement("div");o.className="bloom-bn-card";let r=document.createElement("div");r.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",o.append(r,i),n.appendChild(o),e.append(t,n),document.body.appendChild(e),Je=e,bo=t,xt=i,Ir=r,e}function Zc(){let e=Je,t=$r();if(!e||!t||!t.isConnected||O.length<1){e&&(e.hidden=!0);return}let n=t.getBoundingClientRect(),o=Yp(t),r=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,r?r.getBoundingClientRect().top-12:window.innerHeight-8),c=s-a;if(c<96||n.width<160){e.hidden=!0;return}let l=e.offsetWidth||zp,u=n.right-o.right>=l+8?o.right+4:o.right-12-l;u=Math.min(u,n.right-l-8),u=Math.max(8,u);let m=Math.max(8,Math.round(window.innerWidth-u-l));e.hidden=!1,e.style.top=`${Math.round((a+s)/2)}px`,e.style.height="auto",e.style.maxHeight=`${Math.round(c)}px`,e.style.right=`${m}px`,e.style.setProperty("--bloom-bn-cap",`${Math.round(c)}px`)}function Ea(){!ce||He||(He=requestAnimationFrame(()=>{He=0,ce&&Zc()}))}function mg(e){let t=["bloom-bn-tick"];return e.role==="assistant"&&t.push("bloom-bn-tick-asst"),e.live&&t.push("bloom-bn-tick-live"),t.join(" ")}function fg(e){let t=bo,n=xt;!t||!n||(t.replaceChildren(),n.replaceChildren(),t.classList.toggle("bloom-bn-dense",e.length>$p),e.forEach((o,r)=>{let i=document.createElement("button");i.type="button",i.className=mg(o),i.setAttribute("aria-label",`Go to message ${r+1} of ${e.length}`),i.addEventListener("click",l=>{l.preventDefault(),ha(r)}),t.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${o.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=o.role==="user"?"You":"GPT";let c=document.createElement("span");c.className="bloom-bn-label",c.textContent=o.text,c.title=o.text,a.append(s,c),a.addEventListener("click",l=>{l.preventDefault(),ha(r)}),n.appendChild(a)}))}function pg(e){bo?.querySelectorAll(".bloom-bn-tick").forEach((t,n)=>{t.classList.toggle("bloom-bn-tick-live",!!e[n]?.live)}),e.forEach((t,n)=>{let r=xt?.children[n]?.querySelector(".bloom-bn-label");r&&r.textContent!==t.text&&(r.textContent=t.text,r instanceof HTMLElement&&(r.title=t.text))})}function gg(){let e=L();return e===Dr?!1:(Dr=e,sn.clear(),O=[],wt="",Or=0,Br=-1,xa=0,vt&&e&&(ln.add(e),vt=!1),!0)}function bg(e){let t=_r.store.showAssistant!==!1?"1":"0";return`${Dr}|${t}|${e.map(n=>n.id).join(",")}`}function ya(){if(!ce)return;gg();let e=rg(),t=$r();if(!t||e.length<1){O=e,wt="",Je&&(Je.hidden=!0),yt?.disconnect(),va();return}ug();let n=bg(e);n!==wt?(O=e,wt=n,fg(e),cg(t),dg(e)):(O=e,pg(e)),Zc(),wa(),va()}function Ne(){if(ce){if(document.hidden){Z&&(cancelAnimationFrame(Z),Z=0),ya();return}Z||(Z=requestAnimationFrame(()=>{Z=0,ce&&ya()}))}}function va(){let e=$r();if(!(ht&&ga===e&&e?.isConnected)){if(ht?.disconnect(),po?.disconnect(),ga=e,!e||e===document.body){ht=null;return}ht=new MutationObserver(()=>Ne()),ht.observe(e,{childList:!0,subtree:!0}),po=new ResizeObserver(()=>Ea()),po.observe(e)}}function hg(e){if(ce){if(e.type==="post-start"){e.conversationId?(vt=!1,ln.add(e.conversationId)):vt=!0,Ne();return}if(e.type==="post-end"){if(vt=!1,e.conversationId)ln.delete(e.conversationId);else{let t=L();t&&ln.delete(t)}Ne()}}}function yg(e){if(!ce||!O.length||Je?.hidden||e.altKey||e.ctrlKey||e.metaKey||sg(e.target))return;let t=-1;if(e.key==="ArrowDown")t=Or+1;else if(e.key==="ArrowUp")t=Or-1;else if(e.key==="Home")t=0;else if(e.key==="End")t=O.length-1;else if(e.key==="Escape"){document.activeElement?.blur?.();return}else return;e.preventDefault(),ha(Math.max(0,Math.min(t,O.length-1)))}function vg(){Jc(),yt?.disconnect(),yt=null,ht?.disconnect(),ht=null,ga=null,po?.disconnect(),po=null,go?.(),go=null,cn=null,Je?.remove(),Je=null,bo=null,xt=null,Ir=null}var Qc=p({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:da,cleanupSelectors:[`#${Wc}`],settings:_r,start(){ce=!0,Dr=L(),w(da,Vc),Pr=new AbortController;let{signal:e}=Pr;window.addEventListener("keydown",yg,{signal:e}),window.addEventListener("popstate",Ne,{signal:e}),window.visualViewport?.addEventListener("resize",Ea,{signal:e}),document.addEventListener("visibilitychange",()=>{ce&&(Z&&(cancelAnimationFrame(Z),Z=0),He&&(cancelAnimationFrame(He),He=0),ya())},{signal:e}),ma=V(hg),ua=$({onTick(){Ne()},onFall(){Ne()},onContext(t,n){F(n,t)||(sn.clear(),wt=""),Ne()}}),va(),Ne(),_p.debug("navigator started")},stop(){ce=!1,Z&&cancelAnimationFrame(Z),Z=0,He&&cancelAnimationFrame(He),He=0,Pr?.abort(),Pr=null,ua?.(),ua=null,ma?.(),ma=null,ln.clear(),vt=!1,vg(),sn.clear(),O=[],wt="",y(da)},onSettingsChange(){wt="",Ne()}});var ed=`.bloom-ts {
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
`;function td(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function nd(e){try{return new Date(e).toISOString()}catch{return""}}var ad=new v("MessageTimestamps"),od="messageTimestamps",Fr="bloom-ts",rd=1500,wg="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",dn=x({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),un=new Map,St=!1,Q=0,Ze=null,Ta=null,Sa=null,qr=null,ho=null,id=!1;function sd(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ka(){let e=dn.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ld(){let e={...ka()};for(let[n,o]of un)e[n]=o;let t=Object.keys(e);if(t.length>rd){let n=t.slice(t.length-rd),o={};for(let r of n)o[r]=e[r];dn.store.stamps=o;return}dn.store.stamps=e}var Eg=Va(ld,500);function cd(e,t){!e||!t||un.get(e)===t||(un.set(e,t),Eg(),Et())}function Sg(e){return e?un.get(e)??ka()[e]??dr(e)??null:null}function Tg(e){St&&e.type==="message-time"&&cd(e.messageId,e.createTime)}function Lg(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function kg(){let e=sd();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(wg)||t.push(n)}catch{}return t}function Cg(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function La(){if(!St)return;let e=dn.store.hideOwnMessages===!0,t=dn.store.showDate!==!1,n=H(),o=kg();Ze?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=Lg(r),c=r.querySelector(`:scope > .${Fr}`);if(e&&s==="user"){c?.remove();return}if(Cg(r)){c?.remove();return}let l=Sg(a);if(!l&&a&&(n||id)&&i>=o.length-2&&(l=Date.now(),cd(a,l)),!l){c?.remove();return}let d=td(l,t);if(!d){c?.remove();return}let u=c;u||(u=document.createElement("time"),u.className=Fr,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=nd(l);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){ad.debug("paint failed",r)}id=n,dd()}function Et(){if(St){if(document.hidden){Q&&(cancelAnimationFrame(Q),Q=0),La();return}Q||(Q=requestAnimationFrame(()=>{Q=0,St&&La()}))}}function dd(){let e=sd();if(!(Ze&&Ta===e&&e?.isConnected)){if(Ze?.disconnect(),Ta=e,!e||e===document.body){Ze=null;return}Ze=new MutationObserver(()=>Et()),Ze.observe(e,{childList:!0,subtree:!0})}}var ud=p({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Fr}`],settings:dn,start(){St=!0,w(od,ed);let e=ka();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&un.set(t,n);Sa=V(Tg),qr?.(),qr=$({onTick:Et,onFall:Et,onContext:Et}),ho?.abort(),ho=new AbortController,document.addEventListener("visibilitychange",()=>{St&&(Q&&(cancelAnimationFrame(Q),Q=0),La())},{signal:ho.signal}),dd(),Et(),ad.debug("timestamp watch started")},stop(){St=!1,Q&&cancelAnimationFrame(Q),Q=0,ho?.abort(),ho=null,Ze?.disconnect(),Ze=null,Ta=null,qr?.(),qr=null,Sa?.(),Sa=null,ld(),un.clear(),document.querySelectorAll(`.${Fr}`).forEach(e=>e.remove()),y(od)},onSettingsChange:Et});var Ca="streamerMode",Mg="filter:blur(6px)!important;transition:filter .2s ease",Ag="filter:none!important",yo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],mn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function de(e,t){return e.map(n=>`${n} ${t}`)}var Tt=x({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function fn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${Mg}}${t?`${o}{${Ag}}`:""}`}function md(){let e=[];if(Tt.store.conversations!==!1&&(e.push(fn([...de(mn,'a[href^="/c/"]'),...de(mn,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Tt.store.projects!==!1&&(e.push(fn([...de(mn,'a[href*="/project"]'),...de(mn,'a[href*="/g/g-p-"]'),...de(mn,'[data-testid="project-name"]'),...de(mn,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Tt.store.headerTitle!==!1&&e.push(fn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Tt.store.accountAvatar!==!1&&e.push(fn([...de(yo,"img"),...de(yo,'[class*="avatar"]')],!1)),Tt.store.accountName!==!1&&e.push(fn([...de(yo,".min-w-0 > .truncate"),...de(yo,".min-w-0.flex-1 .truncate")],!1)),Tt.store.accountEmail!==!1&&e.push(fn([...de(yo,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){y(Ca);return}w(Ca,e.join(`
`))}var fd=p({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[h.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Tt,start:md,onSettingsChange:md,stop(){y(Ca)}});var pd=`.bloom-gc-panel {
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
}`;var Ng=new v("GreetingCustomizer"),pn="greetingCustomizer",gd="greetingCustomizerUi",vo=100,Aa=30,Pg=120,Rg=1e3,Ig=50,Og=40,Bg=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),xo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ur=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Dg(e){return!!e?.closest(Bg)}function vd(e){return!!(Dg(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function Co(e){try{for(let t of document.querySelectorAll(e))if(!vd(t))return t}catch{}return null}function Ma(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(Co(t))return t;return e}var xd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=x({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Qg},greetings:{type:0,description:"Greeting texts",hidden:!0,default:xd},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Se=!1,hn=!1,kt=null,zr,wo,gn,Eo,Gr=0,jr=null,bn=null,So=null,To=null,Lo=null,Kr=null;function Re(){let e=location.pathname||"/";return e==="/"||e===""}function Lt(){let e=B.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):xd.slice()}function ko(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function bd(e){B.store.greetings=e.slice(0,Aa)}function Mo(){let e=String(B.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function _g(){return B.store.order==="random"?"random":"sequential"}function $g(){return Te(Number(B.store.intervalSec??10),1,3600)*1e3}function qg(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Fg(){return!!Co(Ur)}function Vr(){return!!(Co(Ur)||Co(xo))}function jg(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=Fg()?Ma(Ur):Co(xo)?Ma(xo):Ma(Ur),i=t?`${xo}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function zg(e,t){if(e<=0)return 0;if(e===1)return Number(B.plain.index)!==0&&(B.store.index=0),Number(B.plain.lastRandom)!==0&&(B.store.lastRandom=0),0;let n=Number(B.plain.index),o=Number(B.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(_g()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),c=0;for(;s===a&&c++<10;)s=Math.floor(Math.random()*e);return B.store.index=s,B.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return B.store.index=i,i}function Pe(e){if(!Se)return;if(!Re()){y(pn);return}let t=Lt().map(ko).filter(Boolean);if(!t.length){y(pn);return}let n=zg(t.length,e),o=t[n]??t[0],r=Mo()==="manual"&&t.length>1;w(pn,jg(qg(o),r)),Kr?.()}function Ha(){zr!==void 0&&(clearInterval(zr),zr=void 0)}function Na(){Ha(),!(!Se||!Re())&&Mo()==="interval"&&(Lt().filter(Boolean).length<=1||(zr=setInterval(()=>Pe(!0),$g())))}function Pa(){Eo!==void 0&&(clearTimeout(Eo),Eo=void 0),Gr=0}function hd(){if(Pa(),!Se||!Re())return;Gr=Og;let e=()=>{if(Eo=void 0,!(!Se||!Re())){if(Vr()){Mo()==="refresh"&&!hn?(hn=!0,Pe(!0)):Pe(!1),Na();return}Gr-=1,Gr>0&&(Eo=setTimeout(e,Ig))}};e()}function Ra(){if(kt===!0){Vr()?Pe(!1):hd();return}kt=!0,hn=!1,Mo()==="refresh"?(hn=!0,Pe(!0)):Pe(!1),Na(),Vr()||hd()}function Ia(){kt=!1,hn=!1,Ha(),Pa(),y(pn)}function Wr(){gn===void 0&&(gn=window.setTimeout(()=>{gn=void 0,Se&&(Re()?Ra():kt!==!1&&Ia())},Pg))}function Gg(){bn||(bn=history.pushState.bind(history),So=history.replaceState.bind(history),To=function(...t){let n=bn(...t);return Wr(),n},Lo=function(...t){let n=So(...t);return Wr(),n},history.pushState=To,history.replaceState=Lo)}function Kg(){To&&history.pushState===To&&bn&&(history.pushState=bn),Lo&&history.replaceState===Lo&&So&&(history.replaceState=So),bn=null,So=null,To=null,Lo=null}function Ug(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Wr)}function Vg(e){if(!Se||!Re()||Mo()!=="manual"||Lt().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(xo);if(!n||vd(n))return;let o=window.getSelection?.();o&&String(o).trim()||Pe(!0)}function Wg(){wo===void 0&&(wo=setInterval(()=>{if(!Se)return;let e=Re();if(e!==(kt===!0)){e?Ra():Ia();return}e&&Vr()&&Pe(!1)},Rg))}function Yg(){wo!==void 0&&(clearInterval(wo),wo=void 0)}function yd(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var Xg="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Jg="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Zg(e,t){let n=ko(e);return n?n.length>vo?`Keep it to ${vo} characters.`:Lt().length+(t?1:0)>Aa?`At most ${Aa} greetings.`:null:"Enter a greeting."}function Qg(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=Lt(),s=Number(B.plain.index);e.replaceChildren();let c=document.createElement("div");c.className="bloom-gc-composer";let l=document.createElement("textarea");l.className="bloom-gc-input",l.rows=3,l.maxLength=vo,l.placeholder="New greeting (line breaks ok)",l.value=t,l.addEventListener("input",()=>{t=l.value,o="";let f=c.querySelector(".bloom-gc-count");f&&(f.textContent=`${ko(t).length}/${vo}`);let T=c.querySelector(".bloom-gc-error");T&&(T.textContent="")}),c.appendChild(l);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${ko(t).length}/${vo}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),S.appendChild(f)}let E=document.createElement("button");if(E.type="button",E.className="bloom-gc-btn bloom-gc-btn-primary",E.textContent=n>=0?"Update":"Add",E.addEventListener("click",()=>{let f=n<0,T=Zg(t,f);if(T){o=T,i();return}let q=ko(t),z=Lt().slice();n>=0&&n<z.length?z[n]=q:z.push(q),bd(z),n=-1,t="",o="",i()}),S.appendChild(E),d.append(u,m,S),c.appendChild(d),e.appendChild(c),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((f,T)=>{let q=document.createElement("div");q.className="bloom-gc-item",T===s&&(q.dataset.active="true");let z=document.createElement("button");z.type="button",z.className=`bloom-gc-body${r===T?"":" bloom-gc-clamp"}`,z.textContent=f,z.addEventListener("click",()=>{r=r===T?-1:T,i()});let vn=document.createElement("div");vn.className="bloom-gc-item-actions";let Ct=yd("Edit",Xg);Ct.addEventListener("click",()=>{n=T,t=f,o="",i()});let Ie=yd("Delete",Jg);Ie.addEventListener("click",()=>{let xn=Lt().filter((Mt,Qe)=>Qe!==T);bd(xn),n===T?(n=-1,t=""):n>T&&(n-=1),i()}),vn.append(Ct,Ie),q.append(z,vn),g.appendChild(q)}),e.appendChild(g)};return Kr=i,i(),()=>{Kr===i&&(Kr=null),e.replaceChildren()}}var wd=p({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:gd,settings:B,start(){Se=!0,w(gd,pd),Gg(),jr=new AbortController;let{signal:e}=jr;window.addEventListener("popstate",Wr,{signal:e}),document.addEventListener("click",Ug,{capture:!0,signal:e}),document.addEventListener("click",Vg,{signal:e}),Wg(),kt=null,Re()?Ra():Ia(),Ng.debug("started")},stop(){Se=!1,jr?.abort(),jr=null,gn!==void 0&&(clearTimeout(gn),gn=void 0),Ha(),Pa(),Yg(),Kg(),y(pn),hn=!1,kt=null},onSettingsChange(){Se&&(Re()?(Pe(!1),Na()):y(pn))}});var yn=new v("Bloom"),Ed=!1,eb=Date.now(),tb=[qs,Il,zl,Ul,Jl,nc,gc,hc,xc,Hc,Dc,Gc,Uc,Qc,ud,fd,wd];function Yr(e){return new Promise(t=>setTimeout(t,e))}function nb(){return document.head?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.head&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}function ob(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Td=8e3,Sd=300,rb=250;async function ib(){if(tt())return await Yr(Sd),!0;for(;Date.now()-eb<Td;)if(await Yr(rb),tt())return await Yr(Sd),!0;return tt()||ni()}function Oa(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function ab(){if(Oa())return!0;let e=Date.now()+Td;for(;Date.now()<e;)if(await Yr(100),Oa())return!0;return Oa()}function sb(){try{GM_registerMenuCommand?.("Bloom++ settings",$s)}catch{}}function lb(){_o(()=>{Sn("HostShell"),yn.info("host shell",G)}),$o(()=>{yn.info("idle ready",G)}),qo(()=>{Jr(),Sn("HostReady"),yn.info("chrome ready",G)})}async function Ba(){await Wa()}async function Da(){if(Ed)return;Ed=!0;for(let n of tb)try{os(n)}catch(o){yn.error("register failed",n.name,o)}as(),Sn("Init"),sb(),lb();let e=()=>Sn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await nb(),Jr(),yn.info("styles ready",G),await ob(),ab().then(n=>{n&&Fo()}),!await ib()){yn.warn("late islands not detected; starting default plugins",G),Nt(),jo();return}await ms()}var Ld=typeof unsafeWindow<"u"?unsafeWindow:window,cb=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||cb){let e=Ld.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",G);try{Object.defineProperty(Ld,"Bloom",{value:_a,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Ba().then(()=>Da()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
