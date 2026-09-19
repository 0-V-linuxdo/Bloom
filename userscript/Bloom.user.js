// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.42
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

/* Bloom++ [20260919] v1.4.42. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var wl=Object.defineProperty;var El=(e,t)=>{for(var n in t)wl(e,n,{get:t[n],enumerable:!0})};var ci={};El(ci,{REPO_URL:()=>_i,Settings:()=>g,VERSION:()=>O,contextKeyFromUrl:()=>ce,conversationTitle:()=>ot,conversationToken:()=>N,currentConversationId:()=>z,hasDraftText:()=>Ue,hasLateIslands:()=>ve,init:()=>li,initSettings:()=>si,isDocumentInteractive:()=>$i,isUserDraftEmpty:()=>Xt,messageCreateTime:()=>Co,plugins:()=>F,requestChromeReady:()=>zn,requestIdleReady:()=>je,requestShellReady:()=>Gn,setEditorText:()=>lo,subscribeHarvest:()=>me,whenChromeReady:()=>Fn,whenIdleReady:()=>qn,whenShellReady:()=>jn});var te=new Map,Nn=!1;function Sl(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ll(){return document.head??null}function De(){let e=Sl();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Tl()}function zo(e,t){if(!Nn)return;let n=Ll();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),De();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,De();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,De()}function L(e,t){let n=te.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},te.set(e,n)),Nn&&zo(e,n)}function di(){Nn=!0;for(let[e,t]of te)zo(e,t);return De(),!0}function ui(e){let t=te.get(e);t&&(t.disabled=!1,Nn&&zo(e,t))}function mi(e){let t=te.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),De())}function y(e){let t=te.get(e);t&&(t.el?.remove(),te.delete(e),De())}function Tl(){return Array.from(te.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var w=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var Ko=new Map;function Hn(e,t){let n=Ko.get(e);return n||(n=new Set,Ko.set(e,n)),n.add(t),()=>n.delete(t)}function ye(e,t){let n=Ko.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Cl="bloompp";function fi(){return new Promise((e,t)=>{let n=indexedDB.open(Cl,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function pi(e){try{let t=await fi();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function gi(e,t){try{let n=await fi();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function Rt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function _e(e,t,n){return Math.min(n,Math.max(t,e))}function hi(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function bi(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function yi(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Rn=new w("SettingsStore"),ne="BloomSettings",kl=100;function On(e){if(Rt(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(Rt(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return Rt(n)?n:null}return null}catch{return null}}var In=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[l,d]of this.defaultGetters)if(c.startsWith(l)){let u=c.slice(l.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return Rt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Rn.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},kl))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ne,this.plain)}catch{try{GM_setValue(ne,t)}catch(n){Rn.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(ne,t)}catch{}gi(ne,t).catch(n=>Rn.warn("Failed to save settings to IndexedDB:",n))}catch(t){Rn.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){hi(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Ml=new w("Settings"),Al={plugins:{}},g=new In(structuredClone(Al)),Pl=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Nl(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function E(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(g.store.plugins[n]||(g.store.plugins[n]={}),g.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?g.plain.plugins[n]??{}:{}}};return t}function Hl(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function vi(){let e=null;if(e=On(Hl(ne)),e||(e=On(await pi(ne))),!e)try{e=On(localStorage.getItem(ne))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(g.plain.plugins=t),Ml.debug("Loaded settings")}}function xi(e,t){t&&(t.pluginName=e,g.plain.plugins[e]||(g.plain.plugins[e]={}),g.setDefaultGetter(Pl(e),n=>{if(n!=="enabled")return Nl(t.def,n)}))}function wi(){return g.plain.plugins.Settings||(g.store.plugins.Settings={}),g.store.plugins.Settings}function Bn(){return wi().pinnedPlugins??[]}function Ei(e){return Bn().includes(e)}function Si(e){let t=Bn(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Dn(){return wi().starredPlugins??[]}function Li(e){return Dn().includes(e)}function Ti(e){let t=Dn(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var _n=new w("PluginManager"),F={},It=new Set;function Mi(e){if(F[e.name]){_n.warn("Duplicate plugin",e.name);return}F[e.name]=e,xi(e.name,e.settings)}function $e(e){let t=F[e];if(!t)return!1;if(t.required)return!0;let n=g.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Ai(e){let t=F[e];if(!t||t.required)return;let n=!$e(e);g.plain.plugins[e]||(g.store.plugins[e]={}),g.store.plugins[e].enabled=n,n?Pi(t):Rl(t),ye("pluginToggle",{name:e,enabled:n})}function Pi(e,t=!1){if(!It.has(e.name)&&$e(e.name))try{e.managedStyle&&ui(e.managedStyle),e.start?.(),It.add(e.name),e.settings&&g.addPrefixChangeListener(`plugins.${e.name}.`,()=>{It.has(e.name)&&e.onSettingsChange?.()}),t||_n.debug("Started",e.name)}catch(n){_n.error("Failed to start",e.name,n)}}function Rl(e){if(It.has(e.name)){try{e.stop?.()}catch(t){_n.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(mi(e.managedStyle),y(e.managedStyle)),It.delete(e.name)}}function Ot(e){for(let t of Object.values(F))(t.startAt??"DOMContentLoaded")===e&&Pi(t)}var Ci=2,ki="defaultsRev";function Ni(){for(let t of Object.values(F))g.plain.plugins[t.name]||(g.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=g.store.plugins.Settings??(g.store.plugins.Settings={});if(e[ki]!==Ci){for(let t of["NoShareLink","NoDictation"]){let n=g.store.plugins[t]??(g.store.plugins[t]={});n.enabled=!1}e[ki]=Ci}}var Bt=!1,$n=!1,Uo=!1,Ri=[],Ii=[],Oi=[];function Vo(e){let t=e.splice(0);for(let n of t)n()}function Dt(){Bt||(Bt=!0,Vo(Ri))}function Wo(){$n||($n=!0,Bt||Dt(),Vo(Ii))}function Bi(){Uo||(Uo=!0,Bt||Dt(),$n||Wo(),Vo(Oi))}function jn(e){Bt?e():Ri.push(e)}function qn(e){$n?e():Ii.push(e)}function Fn(e){Uo?e():Oi.push(e)}function Gn(){Dt()}function je(){Dt(),Wo()}function zn(){Bi()}function Hi(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Di(){await Hi(4e3),Dt(),await Hi(4e3),Wo(),Bi()}var v={p:"0-V-linuxdo"},O="[20260919] v1.4.42",_i="https://github.com/0-V-linuxdo/Bloom";function Il(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Ol(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Yo(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function ve(){return Yo()?Il()||Ol():!1}function $i(){return ve()}var Bl=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),ji=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Dl=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),_l="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Fe(e){return e.id==="bloom-root"||!!e.closest(_l)}function qi(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Kn(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Xo(e){if(!(e instanceof HTMLElement)||!e.isConnected||Fe(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Kn(t)?!1:e.getClientRects().length>0}function qe(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function $l(){let e=[];for(let t of document.querySelectorAll(Bl))!(t instanceof HTMLElement)||!t.isConnected||Fe(t)||e.push(t);return e}function Un(e){if(!e.isConnected||Fe(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function _t(){return $l().filter(Un)[0]??null}function Jo(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||Fe(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Zo(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!Fe(n)&&!qe(n)&&n.parentElement&&!qe(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!qe(o)&&!Fe(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!qe(o.parentElement))return o}return t}function Fi(){let e=document.querySelectorAll(ji);for(let n of e)if(Xo(n)&&!Kn(n)&&qi(n))return n;let t=document.querySelectorAll(Dl);for(let n of t){if(!Xo(n)||!qi(n)||Kn(n))continue;let o=n.querySelector(ji);return Xo(o)&&!Kn(o)?o:n}return null}function Gi(){let e=_t();if(e){let t=Zo(e),n=t.parentElement;if(n&&!qe(n))return n;if(!qe(t))return t}return Jo()}function zi(e){let t=_t();return t?e.composedPath().includes(t):!1}var er=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],jl={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function tr(e){return e==="auto"||e==="light"||e==="dark"}function ql(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Fl(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Qo(e){let t=ql(e);return t?Fl(t)>.55?"light":"dark":null}function Gl(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Qo(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Qo(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Qo(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Ki(e){return e==="auto"?Gl():e}function zl(e){try{let t=getComputedStyle(document.documentElement);for(let n of er){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Ui(e,t,n){let o=jl[t];if(n){zl(e);for(let r of er)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of er)e.style.setProperty(r,o[r])}function Vi(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var nr=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Ul="bloom-root",G="bloom-rail-item",Jn="bloom-account-item",we="bloom-sidebar-panel",Yt="bloom-plugin-dialog",oo="bloom-plugin-layer",Zn="bloom-settings-css",Vl=2e3,Kt=E({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Xi=null,Wl=null,ae=!1,ar=[],Vn=null,Qn=null,re=null,Yn=null,X=null,Ut=null,$t,Ge=0,Vt=0,jt=0,qt=null,Ft=null,eo=null,Ji=null,Gt=null,or=[],to=!1,Yl=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Xl=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],ro="",Wt="all",se="all";function io(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Zi(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Jl(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Zl(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Ql(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var ec={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function tc(e){return e.icon||ec[e.name]||io()}function Qi(){return tr(Kt.store.appearance)?Kt.store.appearance:"auto"}function nc(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=Kt.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=Qi(),n.addEventListener("change",()=>{tr(n.value)&&(Kt.store.appearance=n.value)}),e.append(t,n),e}function rr(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),Ui(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function ea(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function zt(){let e=Qi(),t=Ki(e),n=e==="auto";rr(Xi,t,n);let o=document.getElementById(we);o instanceof HTMLElement&&rr(o,t,n);let r=document.getElementById(Yt);r instanceof HTMLElement&&rr(r,t,n);let i=document.getElementById(G);i instanceof HTMLElement&&ea(i),ye("schemeChange",{scheme:t,pref:e})}function ta(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function na(){if(L("settings",nr),document.getElementById(Zn)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Zn,e.textContent=nr,document.head.appendChild(e)}function oc(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function rc(){for(let e of ar)e();ar=[]}function oa(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function ic(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function cr(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function ac(e){return cr(e).length>0}function Xn(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function sc(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=ic(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function lc(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(sc(t,n));let i=g.store.plugins[e]??(g.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ar.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??Xn(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Xn(n)??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),r.appendChild(a),r}if(n.type===2){let a=oa(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Xn(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function Wi(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function cc(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=g.store.plugins[e.name]??(g.store.plugins[e.name]={});for(let[n,o]of cr(e)){if(n==="enabled"||o.type===5)continue;let r=Xn(o);r!==void 0&&(t[n]=r)}ia(e)}function ra(e){e.key==="Escape"&&(!document.getElementById(oo)&&!document.getElementById(Yt)||(e.stopPropagation(),ze()))}function dc(){to||(document.addEventListener("keydown",ra),to=!0)}function uc(){to&&(document.removeEventListener("keydown",ra),to=!1)}function ze(){rc(),uc(),document.getElementById(oo)?.remove(),document.getElementById(Yt)?.remove()}function ia(e){if(ze(),!document.body)return;let t=document.createElement("div");t.id=oo,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",ie),t.addEventListener("pointerup",ie),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&ze()});let n=document.createElement("div");n.id=Yt,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",ie),n.addEventListener("pointerup",ie),n.addEventListener("click",ie);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=Zi(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),ze()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=Wi("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=Wi("Settings","bloom-plugin-dialog-settings"),c=document.createElement("div");c.className="bloom-plugin-dialog-settings-list";let l=cr(e);if(l.length)for(let[d,u]of l){let m=lc(e.name,d,u);m&&c.appendChild(m)}if(!c.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",c.appendChild(d)}if(s.appendChild(c),n.appendChild(s),l.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>cc(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),dc(),zt()}function mc(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=tc(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let c=Li(e.name),l=document.createElement("button");if(l.type="button",l.className=`bloom-icon-btn bloom-card-star${c?" bloom-card-star-active":""}`,l.setAttribute("aria-label",c?"Remove from favorites":"Add to favorites"),l.innerHTML=Zl(c),l.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();let f=Ti(e.name);ye("pluginStar",{name:e.name,starred:f})}),s.appendChild(l),!e.required){let p=Ei(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${p?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",p?"Unpin from top":"Pin to top"),f.innerHTML=Ql(p),f.addEventListener("click",S=>{S.preventDefault(),S.stopPropagation();let A=Si(e.name);ye("pluginPin",{name:e.name,pinned:A})}),s.appendChild(f)}if(ac(e)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn bloom-card-settings",p.setAttribute("aria-label",`${e.name} settings`),p.innerHTML=Jl(),p.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),ia(e)}),s.appendChild(p)}let d=oa(e.name,$e(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",p=>p.stopPropagation()),u?.addEventListener("change",()=>{Ai(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let p=document.createElement("div");p.className="bloom-card-desc",p.textContent=e.description,n.appendChild(p)}let m=document.createElement("div");m.className="bloom-card-separator";let x=document.createElement("div");x.className="bloom-card-footer";let b=document.createElement("div");return b.className="bloom-card-author",b.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",x.appendChild(b),t.append(n,m,x),t}function aa(){return Object.values(F).filter(e=>!e.hidden&&e.name!=="Settings")}function sa(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function fc(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function pc(){return ro.trim()?"No plugins match your search.":se==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function gc(){let e=aa();return Xl.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>sa(n,t.id)))}function hc(){if(Gt){Gt.replaceChildren();for(let e of gc()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${se===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{se=e.id,xe()}),Gt.appendChild(t)}}}function bc(){let e=aa();if(se==="favorites"){let t=new Set(Dn());e=e.filter(n=>t.has(n.name))}else se!=="all"&&(e=e.filter(t=>sa(t,se)));return Wt==="enabled"&&(e=e.filter(t=>$e(t.name))),Wt==="disabled"&&(e=e.filter(t=>!$e(t.name))),e}function xe(){if(!qt)return;hc();let e=bc();eo&&(eo.placeholder=`Search ${e.length} plugins...`);let t=e,n=ro.trim().toLowerCase();if(n&&(t=t.filter(o=>fc(o).includes(n))),se!=="favorites"){let o=Bn();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),c=r.has(a.name);return s!==c?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}qt.replaceChildren();for(let o of t)qt.appendChild(mc(o));Ft&&(Ft.hidden=t.length>0,Ft.textContent=pc())}function ie(e){e.stopPropagation()}function ir(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function dr(){document.getElementById(G)?.setAttribute("aria-expanded",ae?"true":"false")}function yc(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function ur(){ze(),ro="",Wt="all",se="all",document.getElementById(we)?.remove(),ae=!1,dr()}function vc(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",ie),t.addEventListener("pointerup",ie),t.addEventListener("click",ie);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=io();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let c=document.createElement("p");c.className="bloom-settings-sub",c.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,c);let l=document.createElement("button");l.type="button",l.className="bloom-icon-btn",l.setAttribute("aria-label","Close"),l.innerHTML=Zi(),l.addEventListener("click",ur),o.append(r,l),n.appendChild(o),n.appendChild(nc());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{ro=m.value,xe()});let x=document.createElement("select");x.className="bloom-search-filter",x.setAttribute("aria-label","Filter plugins");for(let f of Yl){let S=document.createElement("option");S.value=f.value,S.textContent=f.label,x.appendChild(S)}x.value=Wt,x.addEventListener("change",()=>{Wt=x.value,xe()}),u.append(m,x),n.appendChild(u);let b=document.createElement("div");b.className="bloom-plugin-list",n.appendChild(b);let p=document.createElement("p");return p.className="bloom-tab-empty",p.hidden=!0,n.appendChild(p),t.appendChild(n),qt=b,Ft=p,eo=m,Ji=x,Gt=d,xe(),t}function xc(e){e.classList.add("bloom-rail-dock")}function wc(){let e=document.getElementById(G);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&Un(e)?e:null}function Ec(){if(document.getElementById(we)?.remove(),!document.body)return;let e=vc(we);xc(e),document.body.appendChild(e),ae=!0,ze(),zt(),dr(),ye("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:O,dock:"center",rail:!!wc()})}function mr(){let e=document.getElementById(we);if(e instanceof HTMLElement&&e.isConnected&&yc(e)){ur();return}e?.remove(),Ec()}function Sc(){let e=document.createElement("button");return e.type="button",e.id=G,e.className="bloom-rail-item",e.setAttribute("aria-controls",we),e.setAttribute("aria-expanded",ae?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${io()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),mr()}),e}function Yi(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function Lc(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Tc(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function oe(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function la(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=Lc(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&oe(e,"padding-top",Math.round(i)),Number.isFinite(a)&&oe(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));oe(n,"width",c),oe(n,"height",Math.max(20,Math.round(s.height)));let l=e.getBoundingClientRect(),d=Math.round(s.left-l.left);d>=0&&d<=40&&oe(e,"padding-left",d);let u=Tc(t,o);if(u){let m=u.getBoundingClientRect(),x=n.getBoundingClientRect(),b=Math.round(m.left-x.right);b>=0&&b<=24&&oe(e,"gap",b)}}else{let s=Number.parseFloat(r.paddingLeft),c=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&oe(e,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&oe(e,"gap",Math.round(c))}ea(e)}function sr(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Cc(){if(Ut?.isConnected&&X){X.observe(Ut,{childList:!0});return}lr()}function kc(e){if(sr(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Mc(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){jt=0;return}jt+=1,Vt=Date.now()+Math.min(8e3,250*2**Math.min(jt,5))})}function Ac(){Ge||Date.now()<Vt||(Ge=requestAnimationFrame(()=>{Ge=0,!(Date.now()<Vt)&&(document.getElementById(G)?.isConnected||no())}))}function no(){if(!document.body)return;X?.disconnect();let e=null,t=!1;try{let n=document.getElementById(G);e=n instanceof HTMLButtonElement?n:Sc();let o=_t(),r=Jo();if(o){let i=Zo(o),a=i.parentElement;if(sr(i)||a&&sr(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),Yi(e),la(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),Yi(e,!0)):e.isConnected&&!Un(e)&&(e.remove(),e=null)}finally{Mc(e,t),Cc(),dr()}}function lr(){let e=Gi();!e||!kc(e)||Ut===e&&X||(X?.disconnect(),Ut=e,X=new MutationObserver(()=>{document.getElementById(G)?.isConnected||Ac()}),X.observe(e,{childList:!0}))}function Pc(){no(),lr(),$t===void 0&&($t=window.setInterval(()=>{let e=document.getElementById(G);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=Vt&&no();else{jt=0;let t=_t();t&&la(e,t)}lr()},Vl))}function Nc(){$t!==void 0&&(clearInterval($t),$t=void 0),Ge&&cancelAnimationFrame(Ge),Ge=0,Vt=0,jt=0,X?.disconnect(),X=null,Ut=null}function Hc(e){Yn===e&&re||(re?.disconnect(),Yn=e,re=new MutationObserver(()=>{if(!e.isConnected){re?.disconnect(),re=null,Yn=null;return}ca(e)}),re.observe(e,{childList:!0}))}function ca(e){if(Hc(e),e.querySelector(`#${Jn}`))return;let t=document.createElement("button");t.type="button",t.id=Jn,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${io()}<span>Bloom++</span>`,t.addEventListener("pointerdown",ir),t.addEventListener("pointerup",ir),t.addEventListener("click",n=>{ir(n),mr()}),e.insertBefore(t,e.firstChild)}function Wn(){let e=Fi();return e?(ca(e),!0):!1}function Rc(e){zi(e)&&(queueMicrotask(Wn),requestAnimationFrame(()=>{Wn()}),window.setTimeout(Wn,60),window.setTimeout(Wn,180))}function Ic(){Qn?.abort();let e=new AbortController;Qn=e,document.addEventListener("click",Rc,{signal:e.signal})}function Oc(){Qn?.abort(),Qn=null,re?.disconnect(),re=null,Yn=null}function da(){je(),oc(()=>{na(),ta(),no(),mr()})}var ua=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Kt,startAt:"HostReady",cleanupSelectors:[`#${Ul}`,`#${G}`,`#${Jn}`,`#${we}`,`#${oo}`,`#${Yt}`,`#${Zn}`,"#bloom-menu-panel"],start(){na(),ta(),Pc(),Ic(),Vn?.(),Vn=Vi(zt),zt(),or=[Hn("pluginToggle",()=>{ae&&xe()}),Hn("pluginPin",()=>{ae&&xe()}),Hn("pluginStar",()=>{ae&&xe()})]},stop(){Nc(),Oc(),Vn?.(),Vn=null;for(let e of or)e();or=[],ur(),document.getElementById(G)?.remove(),document.getElementById(Jn)?.remove(),document.getElementById(Zn)?.remove(),Xi=null,Wl=null,qt=null,Ft=null,eo=null,Ji=null,Gt=null,ae=!1},onSettingsChange:zt});var pa='form[data-type="unified-composer"], form.w-full[data-type]',Ke=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),ao=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),ma=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),fa=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Bc=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Dc='[contenteditable="false"], button, [role="button"]';function B(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function Ee(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!B(r)))return r;return null}function ga(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function I(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=ga(e);return!!(Bc.test(n)||/^stop$/i.test(n))}function le(){let t=Array.from(document.querySelectorAll(pa)).find(B);if(t instanceof HTMLElement)return t;let n=Ee(document,Ke),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function Se(){let e=Array.from(document.querySelectorAll(Ke));return e.find(B)??e[0]??null}function _c(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(Dc);return!!n&&n!==t&&t.contains(n)}function fr(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&_c(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function Ue(e){let t=e??Se();return t?fr(t,t).replaceAll("\u200B","").trim().length>0:!1}function Xt(e){return!Ue(e)}function $c(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function ha(e){let t=le();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!B(n))&&e(n))return n;return null}function so(){let e=le(),t=Ee(e,ao)??Ee(document,ao);return t&&!I(t)?t:ha(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!I(n);let r=ga(n);return/^(send|send prompt|发送)$/i.test(r)&&!I(n)})}function pr(){let e=so();return!!e&&$c(e)}function gr(){let e=le(),t=Ee(e,ma,!0)??Ee(document,ma,!0);if(t)return t;let n=Ee(e,fa)??Ee(document,fa);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&B(o)&&I(o))return o}return ha(I)}function Ve(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>fr(n,e)).join(`
`):fr(e,e)}function hr(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function lo(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),hr(e,n)}var ba="bloom-host-icon",Jt="data-bloom-host-rel",br="not all",yr=0,ya=0,jc=400;function va(e){yr+=1;try{e()}finally{yr-=1}}function co(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function We(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function xa(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function qc(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Fc(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-ya<jc||(ya=n,e.appendChild(t))}function Gc(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||co(n)&&(n.getAttribute(Jt)||n.setAttribute(Jt,n.rel),n.media!==br&&(n.media=br),n.rel!==ba&&(n.rel=ba))}function zc(e){for(let t of e.querySelectorAll(`link[${Jt}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Jt);n&&(t.rel=n),t.removeAttribute(Jt),t.media===br&&t.removeAttribute("media")}}function vr(e,t){let{head:n}=document;!n||!t||va(()=>{Gc(n,e);let o=xa(e),{type:r,sizes:i}=qc(t);o?Fc(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function wa(e,t){let{head:n}=document;n&&va(()=>{xa(e)?.remove(),zc(n)})}function Ea(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(yr)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===e?a=!0:co(c.target)&&(a=!0,We(c.target.href)&&(s=c.target.href)));for(let l of c.removedNodes)co(l)&&l.id===e&&(a=!0);for(let l of c.addedNodes)co(l)&&l.id!==e&&(a=!0,We(l.href)&&(s=l.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var Sa=/\/c\/([a-zA-Z0-9_-]{8,})/i;function N(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=l=>{let d=n.indexOf(l);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(l,d)=>{try{return document.querySelector(l)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function ce(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Ye(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(Sa)?.[1]??""}catch{return e.match(Sa)?.[1]??""}}function z(){let e=Ye(location.pathname);if(e)return e;let n=N().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function Kc(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!B(t))&&(I(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Uc(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&B(e))}function Vc(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&B(e))}function Wc(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function de(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function D(){if(gr()||Kc()||Wc())return!0;let e=so();return e&&B(e)&&!I(e)?!1:!!(Uc()||Vc())}var Yc=["original","badge","dot","hole","bg"],Ca=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],ka={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},uo="#FCFCFC",Xc="#111111",La="#111111",Jc="#ffffff",Zc="#212121",Qc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ed={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},mo=32,Ta=64;function Ma(e){return typeof e=="string"&&Yc.includes(e)}function td(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function fo(e){let t=document.createElement("canvas");t.width=mo,t.height=mo;let n=t.getContext("2d");return n?(n.scale(mo/Ta,mo/Ta),e(n),t.toDataURL("image/png")):""}function nd(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function po(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Qc);n&&(e.strokeStyle=Xc,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function od(e,t,n){let o=ka[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=La,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=La,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Jc,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Zt(e,t){if(e==="original")return t==="wait"?fo(o=>po(o,uo)):td(ed[t]);let n=t==="wait"?void 0:ka[t];return fo(e==="hole"?o=>po(o,n??uo):e==="bg"?o=>{o.fillStyle=n??Zc,nd(o,0,0,64,64,14),o.fill(),po(o,uo,!1)}:o=>{po(o,uo),t!=="wait"&&od(o,t,e==="dot"?"dot":"badge")})}function Aa(e){return{wait:Zt(e,"wait"),rotate:Zt(e,"rotate"),done:Zt(e,"done"),ready:Zt(e,"ready"),error:Zt(e,"error")}}var rd=new w("ChatStateFavicons"),Te="bloom-chat-state-favicon",Ia=E({style:{type:3,description:"Favicon overlay",options:Ca}}),Ze="",ho={wait:"",rotate:"",done:"",ready:"",error:""},bo="wait",Je=!1,J=!1,_=null,en="",tn="",on=!0,Qt=null,Qe=0,Xe,go=null,Le=null,xr=null,nn=!1,Pa=new WeakSet,id=400;function ad(){let e=Ia.store.style;return Ma(e)?e:"bg"}function sd(){let t=document.querySelector(`link[rel~="icon"]:not(#${Te})`)?.href;return We(t)?t:We(Ze)?Ze:""}function $(e){if(bo===e){let t=document.getElementById(Te);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===ho[e])return}bo=e,vr(Te,ho[e])}function Na(){ho=Aa(ad()),$(bo)}function ld(){let e=N(),t=e?ce(e):ce("");return D()?(!en&&t&&(en=t),en||t):(en="",t)}function Oa(){Je=!1,J=!1,_=null,en=""}function cd(e){tn=e,Oa(),on=!1,$("wait")}function Ha(e,t){return!e&&on&&!t}function Ba(){if(!nn)return;let e=N()||location.pathname;if(tn&&e&&tn!==e){cd(e);return}e&&(tn=e);let t=ld(),n=D(),o=Xt(),r=pr();if(de()&&!n){$("error"),Je=!1,J=!1,_=null;return}if(n){Je||(on=!1),Je=!0,J=!1,_=t,$("rotate");return}if(Je){let i=!!_&&!!t&&_===t;if(Je=!1,i){J=!0,_=t,$("done");return}J=!1,_=null}if(J)if(!!(_&&t&&_!==t))J=!1,_=null;else if(o){$("done");return}else if(Ha(o,r)){J=!1,$("ready");return}else{J=!1,$("wait");return}_=null,o?$("wait"):Ha(o,r)?$("ready"):$("wait")}function Da(){let e=le();if(!(Le&&xr===e&&e.isConnected)){if(Le?.disconnect(),xr=e,!e||e===document.body){Le=null;return}Le=new MutationObserver(()=>yo()),Le.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function yo(){!nn||Qe||(Qe=requestAnimationFrame(()=>{Qe=0,nn&&(_a(),Da(),Ba())}))}function Ra(){Ue()&&(on=!0),yo()}function _a(){let e=Se();!e||Pa.has(e)||(Pa.add(e),e.addEventListener("input",Ra,{passive:!0}),e.addEventListener("compositionend",Ra,{passive:!0}))}var $a=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Ia,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Te}`],start(){nn=!0,Ze=sd()||Ze,Na(),go?.disconnect(),go=Ea(Te,e=>{We(e)&&(Ze=e),vr(Te,ho[bo])}),Qt?.abort(),Qt=new AbortController,window.addEventListener("popstate",yo,{signal:Qt.signal}),_a(),Da(),Xe!==void 0&&clearInterval(Xe),Xe=setInterval(yo,id),Ba(),rd.debug("favicon watch started")},stop(){nn=!1,Qe&&cancelAnimationFrame(Qe),Qe=0,Xe!==void 0&&(clearInterval(Xe),Xe=void 0),Qt?.abort(),Qt=null,Le?.disconnect(),Le=null,xr=null,go?.disconnect(),go=null,Oa(),tn="",on=!0,wa(Te,Ze)},onSettingsChange:Na});var ja=`.bloom-ih-hud {
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
`;var cp=new w("InputHistory"),wr=/\u200B/g,qa=10,Fa=500,Ga=100,ud=8,md=120,fd=2e3,vo=10,xo=E({maxEntries:{type:4,description:"Max stored prompts",min:qa,max:Fa,default:Ga},history:{type:5,description:"Stored prompts",render:Md},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Er=new Map,T=0,Sr="",K=!1,an=!1,Cr=0,rn=null,Lr,kr=null,za=!0;function j(){let e=xo.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ka(e){let t=_e(Number(xo.store.maxEntries??Ga),qa,Fa);return e.length>t?e.slice(e.length-t):e}function wo(e){xo.store.entries=Ka(e)}function pd(e){return e.replaceAll(wr,"").replace(/\n$/,"").trim()}function Tr(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Ke);return n instanceof HTMLElement?n:Se()}function gd(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Ve(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(wr,"").trim().length===0,last:i.toString().replaceAll(wr,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ua(e){clearTimeout(Lr),Lr=setTimeout(()=>{if(e!==Cr)return;an=!1;let t=kr;t&&hr(t,za)},md)}function Va(e,t,n){an=!0,kr=e,za=n;let o=++Cr;lo(e,t,n),Ua(o)}function hd(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function et(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function bd(){document.querySelector(".bloom-ih-hud")?.remove()}function yd(e,t){let n=hd();n.textContent=e;let o=(t.closest("form")??le()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-ud)}px`,n.classList.add("bloom-ih-hud-on")}function Mr(e){let t=pd(e);if(!t)return;let n=Date.now(),o=Er.get(t);if(o&&n-o<fd)return;Er.set(t,n);let r=j().filter(i=>i!==t);r.push(t),wo(r),T=j().length,K=!1,et()}function vd(e,t){let n=j();if(!n.length&&e)return;T>=n.length&&(Sr=Ve(t),T=n.length);let o=e?T-1:T+1;o<0||o>n.length||(T=o,K=!0,Va(t,o===n.length?Sr:n[o],e),o<n.length?yd(`${o+1} / ${n.length}`,t):et())}function xd(e){K=!1,et(),Va(e,Sr,!1),T=j().length}function wd(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Tr(e.target)??Tr(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&K&&!e.altKey&&!e.shiftKey){xd(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Mr(Ve(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=j();if(!o){let i=gd(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||T<=0)||!n&&T>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),vd(n,t))}function Ed(e){if(Tr(e.target)){if(an){Ua(Cr);return}K&&(K=!1,et(),T=j().length)}}function Sd(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Ke);n instanceof HTMLElement&&Mr(Ve(n))}function Ld(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(ao);if(!n||!(n instanceof HTMLElement)||I(n))return;let o=Se();o&&Mr(Ve(o))}function Td(e){if(!(!K||an)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}K=!1,et()}}function Cd(){if(rn)return;rn=new AbortController;let{signal:e}=rn,t={capture:!0,signal:e};window.addEventListener("keydown",wd,t),window.addEventListener("input",Ed,t),window.addEventListener("submit",Sd,t),window.addEventListener("click",Ld,t),window.addEventListener("pointerdown",Td,t)}function kd(e){let t=j().slice();t.splice(e,1),wo(t),T>t.length&&(T=t.length)}function Md(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=j().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/vo));n>=c&&(n=c-1);let l=s.slice(n*vo,n*vo+vo);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),l.length){let f=document.createElement("div");f.className="bloom-ih-list",l.forEach((S,A)=>{let R=i.indexOf(S),Nt=j().length-1-R,Oe=document.createElement("div");Oe.className="bloom-ih-item";let ee=document.createElement("button");ee.type="button",ee.className=`bloom-ih-body${o===A?"":" bloom-ih-clamp"}`,ee.textContent=S,ee.addEventListener("click",()=>{o=o===A?-1:A,r()});let Ht=document.createElement("div");Ht.className="bloom-ih-actions";let Be=document.createElement("button");Be.type="button",Be.title="Copy",Be.textContent="C",Be.addEventListener("click",()=>{bi(S)});let be=document.createElement("button");be.type="button",be.title="Delete",be.textContent="\xD7",be.addEventListener("click",()=>{kd(Nt),r()}),Ht.append(Be,be),Oe.append(ee,Ht),f.appendChild(Oe)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let x=document.createElement("span");x.textContent=`${n+1} / ${c}`;let b=document.createElement("button");b.type="button",b.className="bloom-ih-btn",b.textContent="Next",b.disabled=n+1>=c,b.addEventListener("click",()=>{n+=1,r()});let p=document.createElement("button");p.type="button",p.className="bloom-ih-clear",p.textContent="Clear all",p.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(wo([]),T=0,r())}),u.append(m,x,b,p),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Wa=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:xo,startAt:"HostReady",managedStyle:"inputHistory",start(){L("inputHistory",ja),T=j().length,K=!1,Cd()},stop(){rn?.abort(),rn=null,et(),bd(),Er.clear(),clearTimeout(Lr),an=!1,kr=null,K=!1},onSettingsChange(){let e=j(),t=Ka(e);t.length!==e.length&&wo(t),T>t.length&&(T=t.length)}});var Ar="noShareLink",Ad=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Pd=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Pr=E({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Ya(e){return`${e.join(",")}{display:none!important}`}function Xa(){let e=[];if(Pr.store.hideShareChat!==!1&&e.push(Ya(Ad)),Pr.store.hideShareProject!==!1&&e.push(Ya(Pd)),!e.length){y(Ar);return}L(Ar,e.join(`
`))}var Ja=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Pr,start:Xa,onSettingsChange:Xa,stop(){y(Ar)}});var es="noDictation",Nd=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Hd=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],ts=E({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Za(e){return`${e.join(",")}{display:none!important}`}function Qa(){let e=[Za(Nd)];ts.store.hideDictationSettings!==!1&&e.push(Za(Hd)),L(es,e.join(`
`))}var ns=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:ts,start:Qa,onSettingsChange:Qa,stop(){y(es)}});var Nr="noSidebarIdentity",tt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Hr=tt.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),as=tt.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Rd=[...Hr,...as],os=[...Hr,...tt.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Id=tt.map(e=>`${e} a[href^="mailto:"]`),Od=tt.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Bd=tt.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),sn=E({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function rs(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Dd(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function _d(){return`${Bd.join(",")}{margin-block:auto!important}`}function $d(){return`${Od.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function is(){let e=sn.store.hideUsername!==!1,t=sn.store.hideEmail!==!1,n=e&&sn.store.enlargePlan!==!1,o=e&&sn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(Dd(n?os:[...os,...as])),r.push(_d())):r.push(rs(n?Hr:Rd))),t&&r.push(rs(Id)),n&&r.push($d()),!r.length){y(Nr);return}L(Nr,r.join(`
`))}var ss=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:sn,start:is,onSettingsChange:is,stop(){y(Nr)}});var us=new w("Harvest"),jd=1500,qd=200,Eo=new Set,So=new Map,Lo=new Map,nt=null,To=null,ln=null,U=0;function Fd(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Gd(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function zd(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function ms(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}function Kd(e,t){return t!=="POST"||ms(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function Ud(e,t){return t!=="GET"||ms(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function ls(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function fs(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Vd(e){return typeof e=="string"?fs(e):""}function Rr(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return Rr(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function ps(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function cs(e,t,n){!e||!t||Lo.get(e)!==t&&(Lo.set(e,t),ps(Lo,jd),ue({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Wd(e,t){let n=t.trim();!e||!n||So.get(e)!==n&&(So.set(e,n),ps(So,qd),ue({type:"conversation-meta",conversationId:e,title:n}))}function cn(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let c of e)cn(c,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&Wd(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let c=i,l=typeof c.id=="string"?c.id:"",d=Rr(c.create_time??c.createTime??c.created_at);l&&d&&cs(l,d,r)}let a=typeof o.id=="string"?o.id:"",s=Rr(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&cs(a,s,r),o.mapping&&typeof o.mapping=="object")cn(o.mapping,r,n+1);else if(n<3)for(let c of Object.values(o))c&&typeof c=="object"&&cn(c,r,n+1)}function ds(e,t){if(e)try{cn(JSON.parse(e),t)}catch{}}function ue(e){for(let t of Array.from(Eo))try{t(e)}catch{}}async function Yd(e,t,n){if(n===U)try{let o=await e.json();if(n!==U)return;cn(o,t)}catch{}}async function Xd(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===U&&ue({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),c=new TextDecoder,l="";try{for(;o===U;){let{done:d,value:u}=await s.read();if(d)break;if(l+=c.decode(u,{stream:!0}),!r){let x=fs(l);x&&(r=x,ue({type:"post-start",conversationId:r,url:""}))}let m=l.split(`
`);l=m.pop()??"";for(let x of m){let b=x.replace(/^data:\s*/,"").trim();!b||b==="[DONE]"||ds(b,r)}/\[DONE\]/.test(l)||/"error"\s*:\s*\{/.test(l)?(/"error"\s*:\s*\{/.test(l)&&(i=!0),l=l.slice(-64)):l.length>16384&&(l=l.slice(-4096))}l&&o===U&&ds(l.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===U&&ue({type:"post-end",conversationId:r,error:i})}function Jd(e,t,n){let o=Gd(t),r=zd(t,n),i=Ud(o,r),a=Kd(o,r),s=U,c="";return a&&(c=Vd(n?.body)||ls(o)||Ye(o)||z(),ue({type:"post-start",conversationId:c,url:o})),e(t,n).then(l=>{if(s!==U||!i&&!a)return l;try{let d=l.clone();i?Yd(d,ls(o)||z(),s):Xd(d,c,!l.ok,s)}catch{a&&ue({type:"post-end",conversationId:c,error:!l.ok})}return l},l=>{throw a&&s===U&&ue({type:"post-end",conversationId:c,error:!0}),l})}function Zd(){if(nt)return;let e=Fd();ln=e,nt=e.fetch.bind(e);let t=(n,o)=>Jd(nt,n,o);To=t,e.fetch=t,us.debug("conversation fetch harvest hooked")}function Qd(){U+=1,!(!nt||!ln)&&(To&&ln.fetch===To&&(ln.fetch=nt),nt=null,To=null,ln=null,us.debug("conversation fetch harvest unhooked"))}function me(e){return Eo.add(e),Zd(),()=>{Eo.delete(e),Eo.size===0&&Qd()}}function ot(e){return e?So.get(e)??"":""}function Co(e){return e?Lo.get(e)??null:null}var gs=`#bloom-rt-host {
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
`;var ys=new w("RecentTopics"),at="bloom-rt-host",vs="home",xs=/^\/c\/([a-z0-9_-]{8,})/i,tu=/\/c\/([a-z0-9_-]{8,})/i,ws=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,nu=new Set(["Backquote","IntlBackslash"]),ou=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),ru=140,iu=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),C=E({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:iu},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),ko=null,Or=null,H=!1,gn=!1,dn=!1,V=0,Ce="",rt=null,un=null,it,Ir=null;function au(){let e=Number(C.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function mn(){let e=C.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Br(){let e=C.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Es(){let e=C.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Dr(){let e=C.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Ao(e){let t=au();return e.length>t?e.slice(0,t):e}function W(e){return e===vs}function fn(e,t=ru){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function _r(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(xs)?.[1]??""}catch{return e.match(tu)?.[1]??""}}function ke(){let e=(location.pathname||"/").match(xs);if(e?.[1])return e[1];let n=N().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return vs}function $r(e){if(W(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(_r(o.getAttribute("href")||"")!==e)continue;let r=fn(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return ke()===e&&t&&!/^ChatGPT$/i.test(t)?fn(t,80):""}function su(e){if(W(e))return"New chat";let t=Br()[e];if(t)return t;let n=ot(e);return n||$r(e)||"Chat"}function lu(e){return Dr()[e]||""}function cu(e){return Es()[e]||{}}function jr(e,t){if(!e||W(e)||!t||/^new chat$/i.test(t.trim()))return;let n=Br();n[e]!==t&&(n[e]=t,C.store.titles=n)}function du(e){e.type==="conversation-meta"&&(jr(e.conversationId,e.title),H&&st())}function uu(e,t){if(!e||W(e)||!t)return;let n=Dr();n[e]!==t&&(n[e]=t,C.store.projects=n)}function mu(e,t){if(!e||W(e)||!t.user&&!t.assistant)return;let n=Es(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,C.store.previews=n)}function qr(e){if(!e||W(e)&&C.store.includeHome===!1)return;let t=mn().filter(n=>n!==e);t.unshift(e),C.store.visits=Ao(t)}function Po(){let e=C.store.includeHome!==!1;return Ao(mn().filter(n=>e||!W(n))).map(n=>({id:n,title:su(n),project:lu(n),preview:cu(n)}))}function hs(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return fn(r)}catch{return""}}function pn(e){if(!e||W(e)||e!==ke())return;let t=$r(e);t&&jr(e,t);let n=hs("user"),o=hs("assistant");mu(e,{user:n,assistant:o});let r=Ls(e);if(r){let i=Ss(r);i&&uu(e,i)}}function Fr(){let e=Br(),t=Dr(),n=[],o=new Set,r=!1,i=!1;try{for(let l of document.querySelectorAll('a[href*="/c/"]')){if(l.closest(`#${at}, #bloom-root, #bloom-sidebar-panel`))continue;let d=_r(l.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=fn(l.textContent||"",80);u&&!ws.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=Ss(l);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(C.store.titles=e),i&&(C.store.projects=t);let a=mn(),s=new Set(a),c=n.filter(l=>!s.has(l));c.length&&(C.store.visits=Ao([...a,...c]))}function Ss(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=fn((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!ws.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function Ls(e){if(W(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(_r(t.getAttribute("href")||"")===e)return t}catch{}return null}function fu(e){let t=Ls(e);if(t){t.click();return}if(W(e)){location.assign("/");return}location.assign(`/c/${e}`)}function pu(){let e=ke();Ce&&Ce!==e&&pn(Ce),Ce=e,qr(e),Fr();let t=$r(e);t&&jr(e,t),pn(e)}function Mo(){it===void 0&&(it=window.setTimeout(()=>{it=void 0,pu()},120))}function gu(){rt||(rt=history.pushState.bind(history),un=history.replaceState.bind(history),history.pushState=function(...t){let n=rt(...t);return Mo(),n},history.replaceState=function(...t){let n=un(...t);return Mo(),n})}function hu(){rt&&(history.pushState=rt),un&&(history.replaceState=un),rt=null,un=null}function bu(e){return nu.has(e.code)||e.keyCode===192?!0:ou.has(e.key)}function Ts(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function yu(e,t){gn=t,Fr(),pn(ke()),H=!0,V=0;try{let n=ke();qr(n);let o=Po();o.length>1&&(V=e?o.length-1:1)}catch(n){ys.error("Failed to open switcher:",n)}st()}function bs(e){let{length:t}=Po();t&&(V=(V+(e?-1:1)+t)%t,st())}function Gr(){if(!H)return;let e=Po()[V];H=!1,gn=!1,st(),e&&fu(e.id)}function Cs(){H&&(H=!1,gn=!1,st())}function vu(e){if(Ts(e)){dn=!0;return}if((e.ctrlKey||dn)&&!e.altKey&&!e.metaKey&&bu(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{H?bs(e.shiftKey):yu(e.shiftKey,!0)}catch(n){ys.error("Hotkey failed:",n)}return}if(H){if(e.key==="Escape"){e.preventDefault(),Cs();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Gr();return}e.key==="Tab"&&(e.ctrlKey||dn)&&(e.preventDefault(),bs(e.shiftKey))}}function xu(e){Ts(e)&&(dn=!1,H&&gn&&Gr())}function wu(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Mo)}function Eu(e){!H||(e.target instanceof Element?e.target:null)?.closest(`#${at}`)||Cs()}function Su(){document.visibilityState==="hidden"&&pn(ke())}function Lu(){if(!document.body)return null;let e=document.getElementById(at);if(e instanceof HTMLElement)return Or=e,e;e=document.createElement("div"),e.id=at;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Or=e,e}function st(){let e=Lu();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!H){t.dataset.visible="false",t.replaceChildren();return}let n=Po();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}V>=n.length&&(V=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===V?"true":"false",s.setAttribute("aria-selected",a===V?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let l=document.createElement("div");l.className="bloom-rt-project",l.textContent=i.project,s.append(l)}if(i.preview.user||i.preview.assistant){let l=document.createElement("div");if(l.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,l.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,l.append(d)}s.append(l)}s.addEventListener("click",()=>{V=a,Gr()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Tu(){document.getElementById(at)?.remove(),Or=null}var ks=h({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${at}`],settings:C,start(){L("recentTopics",gs),Ce=ke(),qr(Ce),Fr(),pn(Ce),Ir=me(du),gu(),ko=new AbortController;let{signal:e}=ko;window.addEventListener("keydown",vu,{capture:!0,signal:e}),window.addEventListener("keyup",xu,{capture:!0,signal:e}),window.addEventListener("popstate",Mo,{signal:e}),document.addEventListener("click",wu,{capture:!0,signal:e}),document.addEventListener("click",Eu,{signal:e}),document.addEventListener("visibilitychange",Su,{signal:e})},stop(){ko?.abort(),ko=null,it!==void 0&&(clearTimeout(it),it=void 0),hu(),Ir?.(),Ir=null,H=!1,gn=!1,dn=!1,Tu()},onSettingsChange(){let e=Ao(mn());e.length!==mn().length&&(C.store.visits=e),H&&st()}});var zr="cleaner",Cu=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],ku=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Mu=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Au=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Pu=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Nu=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Me=E({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function lt(e){return`${e.join(",")}{display:none!important}`}function Ms(){let e=[];if(Me.store.hideDownloadApps!==!1&&e.push(lt(Cu)),Me.store.hideDisclaimer!==!1&&e.push(lt(ku)),Me.store.hideUpgrade!==!1&&e.push(lt(Mu)),Me.store.hideLockedModels!==!1&&e.push(lt(Au)),Me.store.hideHomePromo!==!1&&e.push(lt(Pu)),Me.store.hideAds!==!1&&e.push(lt(Nu)),!e.length){y(zr);return}L(zr,e.join(`
`))}var As=h({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Me,start:Ms,onSettingsChange:Ms,stop(){y(zr)}});var No=new w("ResponseNotification"),Hu=400,Ru=3,ft=E({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:ju},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Kr=!1,Ne=!1,Ae=0,Pe="",mt=!1,hn="",ct,dt=null,ut=null;function Ps(){return ce(N())}function Iu(){return document.visibilityState==="hidden"||document.hidden}function Ou(){return ft.store.onlyWhenHidden===!1?!0:Iu()}function Bu(){let e=ot(z());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function Ns(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!ut||ut.state==="closed")&&(ut=new e);let t=ut,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){No.debug("chime failed",e)}}function Du(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){No.debug("custom sound failed",t),Ns()}}function Hs(){let e=String(ft.store.soundUrl||"").trim();e?Du(e):Ns()}function _u(){let e="Bloom++",t=`${Bu()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){No.debug("notification failed",n)}}function $u(){Ou()&&(ft.store.sound!==!1&&Hs(),ft.store.browserNotification!==!1&&_u())}function ju(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>Hs()),e.appendChild(t),()=>{t.remove()}}function qu(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&I(n)&&(mt=!0)}function Fu(){if(!Kr)return;let e=N()||location.pathname;if(hn&&e&&hn!==e){Ne=!1,Ae=0,Pe="",mt=!1,hn=e;return}hn=e;let t=D(),n=Ps();if(t){Ne=!0,Ae=0,Pe=n;return}if(!Ne||(Ae+=1,Ae<Ru))return;let o=!!Pe&&Pe===n,r=mt,i=de();Ne=!1,Ae=0,mt=!1,Pe="",!(!o||r||i)&&$u()}var Rs=h({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ft,start(){Kr=!0,Ne=D(),Ae=0,Pe=Ne?Ps():"",mt=!1,hn=N()||location.pathname,dt?.abort(),dt=new AbortController,document.addEventListener("click",qu,{capture:!0,signal:dt.signal}),ct!==void 0&&clearInterval(ct),ct=setInterval(Fu,Hu),ft.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:dt.signal}),No.debug("watch started")},stop(){Kr=!1,ct!==void 0&&(clearInterval(ct),ct=void 0),dt?.abort(),dt=null,Ne=!1,Ae=0,Pe="",mt=!1;try{ut?.close()}catch{}ut=null}});var Is=`.bloom-cls {
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
`;var _s=new w("ChatListStatus"),Os="chatListStatus",Ro="bloom-cls",zu="bloom-cls",Ku=500,Uu=1200*1e3,Vu="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",pe=new Map,ge=!1,gt="",bn=!1,pt,bt=0,fe=null,Wr=null,ht=null,Ur=null,yt=!1;function Ho(){return Date.now()}function $s(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function vt(e,t,n,o=!0){if(!(!e||!ge)){if(t==="idle")pe.delete(e);else{let r=pe.get(e);r&&r.kind===t&&n!=="net"?r.at=Ho():pe.set(e,{kind:t,at:Ho(),source:n})}o&&Wu({v:1,id:e,kind:t,at:Ho()}),Io()}}function Wu(e){try{ht?.postMessage(e)}catch{}}function Yu(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||vt(t.id,t.kind,"bc",!1)}function Xu(){let e=Ho();for(let[t,n]of pe)n.kind==="streaming"&&e-n.at>Uu&&pe.delete(t)}function Ju(){let e=$s();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(Vu))continue;let r=Ye(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Bs(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function Vr(e){let t=e.querySelector(`:scope > .${Ro}`);return t||null}function Zu(){if(!ge)return;Xu();let e=z(),t=Ju();fe?.disconnect();try{for(let n of t){let o=Ye(n.getAttribute("href")||"");if(!o||!e||o!==e){Vr(n)?.remove();continue}let i=pe.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Vr(n)?.remove();continue}let a=Vr(n);a||(a=document.createElement("span"),a.className=Ro,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Bs("streaming")):i==="error"&&a.appendChild(Bs("error")))}}catch(n){_s.debug("paint failed",n)}js()}function Io(){!ge||bt||(bt=requestAnimationFrame(()=>{bt=0,ge&&Zu()}))}function js(){let e=$s();if(!(fe&&Wr===e&&e?.isConnected)){if(fe?.disconnect(),Wr=e,!e){fe=null;return}fe=new MutationObserver(()=>Io()),fe.observe(e,{childList:!0,subtree:!0})}}function Qu(e){if(ge){if(e.type==="post-start"){e.conversationId?(yt=!1,vt(e.conversationId,"streaming","net")):yt=!0;return}e.type==="post-end"&&(yt=!1,e.conversationId&&vt(e.conversationId,e.error?"error":"done","net"))}}function Ds(){if(!ge)return;let e=z();if(gt&&e&&gt!==e){let n=pe.get(gt);n?.kind==="streaming"&&n.source==="local"&&vt(gt,de()?"error":"done","local"),bn=!1}if(gt=e,D()){bn=!0,e&&vt(e,"streaming","local"),Io();return}bn&&(bn=!1,e&&vt(e,de()?"error":"done","local")),yt=!1,Io()}var qs=h({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ro}`],start(){ge=!0,L(Os,Is);try{ht=new BroadcastChannel(zu)}catch{ht=null}ht?.addEventListener("message",Yu),Ur=me(Qu),js(),pt!==void 0&&clearInterval(pt),pt=setInterval(Ds,Ku),Ds(),_s.debug("sidebar status watch started")},stop(){ge=!1,bt&&cancelAnimationFrame(bt),bt=0,pt!==void 0&&(clearInterval(pt),pt=void 0),fe?.disconnect(),fe=null,Wr=null,Ur?.(),Ur=null;try{ht?.close()}catch{}ht=null,pe.clear(),yt=!1,bn=!1,gt="",document.querySelectorAll(`.${Ro}`).forEach(e=>e.remove()),y(Os)}});var Gs="widerChat",zs=40,Ks=96,Us=64,Vs=E({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:zs,max:Ks,default:Us}});function em(){return _e(Number(Vs.store.width??Us),zs,Ks)}function Fs(){let e=em(),t=`min(100%,${e}rem)`;L(Gs,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var Ws=h({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Vs,start:Fs,onSettingsChange:Fs,stop(){y(Gs)}});var Ys=`.bloom-ts {
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
`;function Xs(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Js(e){try{return new Date(e).toISOString()}catch{return""}}var tl=new w("MessageTimestamps"),Zs="messageTimestamps",Oo="bloom-ts",Qs=1500,nm="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Et=E({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),St=new Map,Lt=!1,wt=0,xt,he=null,Xr=null,Yr=null,el=!1;function nl(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Jr(){let e=Et.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ol(){let e={...Jr()};for(let[n,o]of St)e[n]=o;let t=Object.keys(e);if(t.length>Qs){let n=t.slice(t.length-Qs),o={};for(let r of n)o[r]=e[r];Et.store.stamps=o;return}Et.store.stamps=e}var om=yi(ol,500);function rl(e,t){!e||!t||St.get(e)===t||(St.set(e,t),om(),yn())}function rm(e){return e?St.get(e)??Jr()[e]??Co(e)??null:null}function im(e){Lt&&e.type==="message-time"&&rl(e.messageId,e.createTime)}function am(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function sm(){let e=nl();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(nm)||t.push(n)}catch{}return t}function lm(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function cm(){if(!Lt)return;let e=Et.store.hideOwnMessages===!0,t=Et.store.showDate!==!1,n=D(),o=sm();he?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=am(r),c=r.querySelector(`:scope > .${Oo}`);if(e&&s==="user"){c?.remove();return}if(lm(r)){c?.remove();return}let l=rm(a);if(!l&&a&&(n||el)&&i>=o.length-2&&(l=Date.now(),rl(a,l)),!l){c?.remove();return}let d=Xs(l,t);if(!d){c?.remove();return}let u=c;u||(u=document.createElement("time"),u.className=Oo,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=Js(l);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){tl.debug("paint failed",r)}el=n,il()}function yn(){!Lt||wt||(wt=requestAnimationFrame(()=>{wt=0,Lt&&cm()}))}function il(){let e=nl();if(!(he&&Xr===e&&e?.isConnected)){if(he?.disconnect(),Xr=e,!e||e===document.body){he=null;return}he=new MutationObserver(()=>yn()),he.observe(e,{childList:!0,subtree:!0})}}var al=h({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Oo}`],settings:Et,start(){Lt=!0,L(Zs,Ys);let e=Jr();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&St.set(t,n);Yr=me(im),il(),xt!==void 0&&clearInterval(xt),xt=setInterval(yn,800),yn(),tl.debug("timestamp watch started")},stop(){Lt=!1,wt&&cancelAnimationFrame(wt),wt=0,xt!==void 0&&(clearInterval(xt),xt=void 0),he?.disconnect(),he=null,Xr=null,Yr?.(),Yr=null,ol(),St.clear(),document.querySelectorAll(`.${Oo}`).forEach(e=>e.remove()),y(Zs)},onSettingsChange:yn});var Zr="streamerMode",dm="filter:blur(6px)!important;transition:filter .2s ease",um="filter:none!important",vn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Tt=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function q(e,t){return e.map(n=>`${n} ${t}`)}var He=E({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Ct(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${dm}}${t?`${o}{${um}}`:""}`}function sl(){let e=[];if(He.store.conversations!==!1&&(e.push(Ct([...q(Tt,'a[href^="/c/"]'),...q(Tt,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),He.store.projects!==!1&&(e.push(Ct([...q(Tt,'a[href*="/project"]'),...q(Tt,'a[href*="/g/g-p-"]'),...q(Tt,'[data-testid="project-name"]'),...q(Tt,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),He.store.headerTitle!==!1&&e.push(Ct(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),He.store.accountAvatar!==!1&&e.push(Ct([...q(vn,"img"),...q(vn,'[class*="avatar"]')],!1)),He.store.accountName!==!1&&e.push(Ct([...q(vn,".min-w-0 > .truncate"),...q(vn,".min-w-0.flex-1 .truncate")],!1)),He.store.accountEmail!==!1&&e.push(Ct([...q(vn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){y(Zr);return}L(Zr,e.join(`
`))}var ll=h({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:He,start:sl,onSettingsChange:sl,stop(){y(Zr)}});var cl=`.bloom-gc-panel {
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
}`;var fm=new w("GreetingCustomizer"),kt="greetingCustomizer",dl="greetingCustomizerUi",xn=100,ei=30,pm=120,gm=1e3,hm=50,bm=40,ym=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),wn=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),jo=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function vm(e){return!!e?.closest(ym)}function pl(e){return!!(vm(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function Mn(e){try{for(let t of document.querySelectorAll(e))if(!pl(t))return t}catch{}return null}function Qr(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(Mn(t))return t;return e}var gl=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],k=E({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Om},greetings:{type:0,description:"Greeting texts",hidden:!0,default:gl},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Y=!1,Pt=!1,Ie=null,Do,En,Mt,Sn,_o=0,Bo=null,At=null,Ln=null,Tn=null,Cn=null,$o=null;function Q(){let e=location.pathname||"/";return e==="/"||e===""}function Re(){let e=k.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):gl.slice()}function kn(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function ul(e){k.store.greetings=e.slice(0,ei)}function An(){let e=String(k.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function xm(){return k.store.order==="random"?"random":"sequential"}function wm(){return _e(Number(k.store.intervalSec??10),1,3600)*1e3}function Em(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Sm(){return!!Mn(jo)}function qo(){return!!(Mn(jo)||Mn(wn))}function Lm(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=Sm()?Qr(jo):Mn(wn)?Qr(wn):Qr(jo),i=t?`${wn}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Tm(e,t){if(e<=0)return 0;if(e===1)return Number(k.plain.index)!==0&&(k.store.index=0),Number(k.plain.lastRandom)!==0&&(k.store.lastRandom=0),0;let n=Number(k.plain.index),o=Number(k.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(xm()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),c=0;for(;s===a&&c++<10;)s=Math.floor(Math.random()*e);return k.store.index=s,k.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return k.store.index=i,i}function Z(e){if(!Y)return;if(!Q()){y(kt);return}let t=Re().map(kn).filter(Boolean);if(!t.length){y(kt);return}let n=Tm(t.length,e),o=t[n]??t[0],r=An()==="manual"&&t.length>1;L(kt,Lm(Em(o),r)),$o?.()}function ti(){Do!==void 0&&(clearInterval(Do),Do=void 0)}function ni(){ti(),!(!Y||!Q())&&An()==="interval"&&(Re().filter(Boolean).length<=1||(Do=setInterval(()=>Z(!0),wm())))}function oi(){Sn!==void 0&&(clearTimeout(Sn),Sn=void 0),_o=0}function ml(){if(oi(),!Y||!Q())return;_o=bm;let e=()=>{if(Sn=void 0,!(!Y||!Q())){if(qo()){An()==="refresh"&&!Pt?(Pt=!0,Z(!0)):Z(!1),ni();return}_o-=1,_o>0&&(Sn=setTimeout(e,hm))}};e()}function ri(){if(Ie===!0){qo()?Z(!1):ml();return}Ie=!0,Pt=!1,An()==="refresh"?(Pt=!0,Z(!0)):Z(!1),ni(),qo()||ml()}function ii(){Ie=!1,Pt=!1,ti(),oi(),y(kt)}function Fo(){Mt===void 0&&(Mt=window.setTimeout(()=>{Mt=void 0,Y&&(Q()?ri():Ie!==!1&&ii())},pm))}function Cm(){At||(At=history.pushState.bind(history),Ln=history.replaceState.bind(history),Tn=function(...t){let n=At(...t);return Fo(),n},Cn=function(...t){let n=Ln(...t);return Fo(),n},history.pushState=Tn,history.replaceState=Cn)}function km(){Tn&&history.pushState===Tn&&At&&(history.pushState=At),Cn&&history.replaceState===Cn&&Ln&&(history.replaceState=Ln),At=null,Ln=null,Tn=null,Cn=null}function Mm(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Fo)}function Am(e){if(!Y||!Q()||An()!=="manual"||Re().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(wn);if(!n||pl(n))return;let o=window.getSelection?.();o&&String(o).trim()||Z(!0)}function Pm(){En===void 0&&(En=setInterval(()=>{if(!Y)return;let e=Q();if(e!==(Ie===!0)){e?ri():ii();return}e&&qo()&&Z(!1)},gm))}function Nm(){En!==void 0&&(clearInterval(En),En=void 0)}function fl(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var Hm="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Rm="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Im(e,t){let n=kn(e);return n?n.length>xn?`Keep it to ${xn} characters.`:Re().length+(t?1:0)>ei?`At most ${ei} greetings.`:null:"Enter a greeting."}function Om(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=Re(),s=Number(k.plain.index);e.replaceChildren();let c=document.createElement("div");c.className="bloom-gc-composer";let l=document.createElement("textarea");l.className="bloom-gc-input",l.rows=3,l.maxLength=xn,l.placeholder="New greeting (line breaks ok)",l.value=t,l.addEventListener("input",()=>{t=l.value,o="";let f=c.querySelector(".bloom-gc-count");f&&(f.textContent=`${kn(t).length}/${xn}`);let S=c.querySelector(".bloom-gc-error");S&&(S.textContent="")}),c.appendChild(l);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${kn(t).length}/${xn}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let x=document.createElement("div");if(x.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),x.appendChild(f)}let b=document.createElement("button");if(b.type="button",b.className="bloom-gc-btn bloom-gc-btn-primary",b.textContent=n>=0?"Update":"Add",b.addEventListener("click",()=>{let f=n<0,S=Im(t,f);if(S){o=S,i();return}let A=kn(t),R=Re().slice();n>=0&&n<R.length?R[n]=A:R.push(A),ul(R),n=-1,t="",o="",i()}),x.appendChild(b),d.append(u,m,x),c.appendChild(d),e.appendChild(c),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let p=document.createElement("div");p.className="bloom-gc-list",a.forEach((f,S)=>{let A=document.createElement("div");A.className="bloom-gc-item",S===s&&(A.dataset.active="true");let R=document.createElement("button");R.type="button",R.className=`bloom-gc-body${r===S?"":" bloom-gc-clamp"}`,R.textContent=f,R.addEventListener("click",()=>{r=r===S?-1:S,i()});let Nt=document.createElement("div");Nt.className="bloom-gc-item-actions";let Oe=fl("Edit",Hm);Oe.addEventListener("click",()=>{n=S,t=f,o="",i()});let ee=fl("Delete",Rm);ee.addEventListener("click",()=>{let Ht=Re().filter((Be,be)=>be!==S);ul(Ht),n===S?(n=-1,t=""):n>S&&(n-=1),i()}),Nt.append(Oe,ee),A.append(R,Nt),p.appendChild(A)}),e.appendChild(p)};return $o=i,i(),()=>{$o===i&&($o=null),e.replaceChildren()}}var hl=h({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:dl,settings:k,start(){Y=!0,L(dl,cl),Cm(),Bo=new AbortController;let{signal:e}=Bo;window.addEventListener("popstate",Fo,{signal:e}),document.addEventListener("click",Mm,{capture:!0,signal:e}),document.addEventListener("click",Am,{signal:e}),Pm(),Ie=null,Q()?ri():ii(),fm.debug("started")},stop(){Y=!1,Bo?.abort(),Bo=null,Mt!==void 0&&(clearTimeout(Mt),Mt=void 0),ti(),oi(),Nm(),km(),y(kt),Pt=!1,Ie=null},onSettingsChange(){Y&&(Q()?(Z(!1),ni()):y(kt))}});var Pn=new w("Bloom"),bl=!1,Bm=Date.now(),Dm=[ua,$a,Wa,Ja,ns,ss,ks,As,Rs,qs,Ws,al,ll,hl];function Go(e){return new Promise(t=>setTimeout(t,e))}function _m(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var vl=8e3,yl=300,$m=250;async function jm(){if(ve())return await Go(yl),!0;for(;Date.now()-Bm<vl;)if(await Go($m),ve())return await Go(yl),!0;return ve()||Yo()}function ai(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function qm(){if(ai())return!0;let e=Date.now()+vl;for(;Date.now()<e;)if(await Go(100),ai())return!0;return ai()}function Fm(){try{GM_registerMenuCommand?.("Bloom++ settings",da)}catch{}}function Gm(){jn(()=>{Ot("HostShell"),Pn.info("host shell",O)}),qn(()=>{Pn.info("idle ready",O)}),Fn(()=>{di(),Ot("HostReady"),Pn.info("chrome ready",O)})}async function si(){await vi()}async function li(){if(bl)return;bl=!0;for(let n of Dm)try{Mi(n)}catch(o){Pn.error("register failed",n.name,o)}Ni(),Ot("Init"),Fm(),Gm();let e=()=>Ot("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await _m(),qm().then(n=>{n&&Gn()}),!await jm()){Pn.warn("late islands not detected; starting default plugins",O),je(),zn();return}await Di()}var xl=typeof unsafeWindow<"u"?unsafeWindow:window,zm=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||zm){let e=xl.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",O);try{Object.defineProperty(xl,"Bloom",{value:ci,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}si().then(()=>li()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
