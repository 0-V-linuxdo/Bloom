// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.62
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, thread outline, message times, streamer blur, custom home greeting, custom sidebar identity, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
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

/* Bloom++ [20260920] v1.4.62. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var cd=Object.defineProperty;var ud=(t,e)=>{for(var n in e)cd(t,n,{get:e[n],enumerable:!0})};var os={};ud(os,{REPO_URL:()=>Ds,Settings:()=>k,VERSION:()=>Q,contextKeyFromUrl:()=>_t,conversationTitle:()=>Ye,conversationToken:()=>et,currentConversationId:()=>R,hasDraftText:()=>mt,hasErrorToast:()=>ft,hasLateIslands:()=>me,init:()=>rs,initSettings:()=>ns,isDocumentInteractive:()=>$s,isStreaming:()=>D,isUserDraftEmpty:()=>Qt,messageCreateTime:()=>yo,plugins:()=>Bt,requestChromeReady:()=>Wr,requestIdleReady:()=>qe,requestShellReady:()=>Vr,setEditorText:()=>$t,subscribeHarvest:()=>nt,watchStreamingEdge:()=>W,whenChromeReady:()=>Kr,whenIdleReady:()=>Ur,whenShellReady:()=>Gr});var Kt=new Map,Ir=!1;function dd(){return document.getElementById("bloom-root")?.shadowRoot??null}function cs(){return document.head??null}function $e(){let t=dd();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=md()}function ci(t,e){if(!Ir)return;let n=cs();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),$e();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,$e();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,$e()}function w(t,e){let n=Kt.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Kt.set(t,n)),Ir&&ci(t,n)}function ui(){if(!cs())return!1;Ir=!0;for(let[e,n]of Kt)ci(e,n);return $e(),!0}function us(t){let e=Kt.get(t);e&&(e.disabled=!1,Ir&&ci(t,e))}function ds(t){let e=Kt.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),$e())}function x(t){let e=Kt.get(t);e&&(e.el?.remove(),Kt.delete(t),$e())}function md(){return Array.from(Kt.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var E=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var di=new Map;function Or(t,e){let n=di.get(t);return n||(n=new Set,di.set(t,n)),n.add(e),()=>n.delete(e)}function de(t,e){let n=di.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var fd="bloompp";function ms(){return new Promise((t,e)=>{let n=indexedDB.open(fd,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function fs(t){try{let e=await ms();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function ps(t,e){try{let n=await ms();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function _e(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function G(t,e,n){return Math.min(n,Math.max(e,t))}function gs(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function bs(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function hs(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Br=new E("SettingsStore"),Vt="BloomSettings",pd=100;function Dr(t){return t!=null&&typeof t.then=="function"}function gd(t){if(t==null||Dr(t))return null;if(_e(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(_e(e)&&!Dr(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return _e(n)&&!Dr(n)?n:null}return null}catch{return null}}function _r(t){let e=gd(t);if(!e)return null;let n=e.plugins;return!_e(n)||Dr(n)||Object.keys(n).length===0?null:e}var $r=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return _e(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Br.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},pd))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Vt,this.plain)}catch{try{GM_setValue(Vt,e)}catch(n){Br.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Vt,e)}catch{}ps(Vt,e).catch(n=>Br.warn("Failed to save settings to IndexedDB:",n))}catch(e){Br.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){gs(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var bd=new E("Settings"),hd={plugins:{}},k=new $r(structuredClone(hd)),yd=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function vd(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function S(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(k.store.plugins[n]||(k.store.plugins[n]={}),k.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?k.plain.plugins[n]??{}:{}}};return e}async function xd(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function ys(){let t=_r(await xd(Vt));if(t||(t=_r(await fs(Vt))),!t)try{t=_r(localStorage.getItem(Vt))}catch{t=null}if(!t)return;let e=t.plugins;e&&(k.plain.plugins=e,bd.debug("Loaded settings"))}function vs(t,e){e&&(e.pluginName=t,k.plain.plugins[t]||(k.plain.plugins[t]={}),k.setDefaultGetter(yd(t),n=>{if(n!=="enabled")return vd(e.def,n)}))}function xs(){return k.plain.plugins.Settings||(k.store.plugins.Settings={}),k.store.plugins.Settings}function Fr(){return xs().pinnedPlugins??[]}function ws(t){return Fr().includes(t)}function Es(t){let e=Fr(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function qr(){return xs().starredPlugins??[]}function Ss(t){return qr().includes(t)}function ks(t){let e=qr(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var jr=new E("PluginManager"),Bt={},Nn=new Set;function Cs(t){if(Bt[t.name]){jr.warn("Duplicate plugin",t.name);return}Bt[t.name]=t,vs(t.name,t.settings)}function Fe(t){let e=Bt[t];if(!e)return!1;if(e.required)return!0;let n=k.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Ms(t){let e=Bt[t];if(!e||e.required)return;let n=!Fe(t);k.plain.plugins[t]||(k.store.plugins[t]={}),k.store.plugins[t].enabled=n,n?As(e):wd(e),de("pluginToggle",{name:t,enabled:n})}function As(t,e=!1){if(!Nn.has(t.name)&&Fe(t.name))try{t.managedStyle&&us(t.managedStyle),t.start?.(),Nn.add(t.name),t.settings&&k.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Nn.has(t.name)&&t.onSettingsChange?.()}),e||jr.debug("Started",t.name)}catch(n){jr.error("Failed to start",t.name,n)}}function wd(t){if(Nn.has(t.name)){try{t.stop?.()}catch(e){jr.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(ds(t.managedStyle),x(t.managedStyle)),Nn.delete(t.name)}}function Hn(t){for(let e of Object.values(Bt))(e.startAt??"DOMContentLoaded")===t&&As(e)}var Ts=2,Ls="defaultsRev";function Ns(){let t=k.plain.plugins.Settings;if(!(!t||t[Ls]===Ts)){for(let e of["NoShareLink","NoDictation"]){let n=k.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[Ls]=Ts}}var Rn=!1,zr=!1,mi=!1,Rs=[],Ps=[],Is=[];function fi(t){let e=t.splice(0);for(let n of e)n()}function Pn(){Rn||(Rn=!0,fi(Rs))}function pi(){zr||(zr=!0,Rn||Pn(),fi(Ps))}function Os(){mi||(mi=!0,Rn||Pn(),zr||pi(),fi(Is))}function Gr(t){Rn?t():Rs.push(t)}function Ur(t){zr?t():Ps.push(t)}function Kr(t){mi?t():Is.push(t)}function Vr(){Pn()}function qe(){Pn(),pi()}function Wr(){Os()}function Hs(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Bs(){await Hs(4e3),Pn(),await Hs(4e3),pi(),Os()}var v={p:"0-V-linuxdo"},Q="[20260920] v1.4.62",Ds="https://github.com/0-V-linuxdo/Bloom";function Ed(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Sd(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function gi(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function me(){return gi()?Ed()||Sd():!1}function $s(){return me()}var kd=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),_s=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Td=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Ld="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function ze(t){return t.id==="bloom-root"||!!t.closest(Ld)}function Fs(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Yr(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function bi(t){if(!(t instanceof HTMLElement)||!t.isConnected||ze(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Yr(e)?!1:t.getClientRects().length>0}function je(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Cd(){let t=[];for(let e of document.querySelectorAll(kd))!(e instanceof HTMLElement)||!e.isConnected||ze(e)||t.push(e);return t}function Xr(t){if(!t.isConnected||ze(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function In(){return Cd().filter(Xr)[0]??null}function hi(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||ze(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function yi(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!ze(n)&&!je(n)&&n.parentElement&&!je(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!je(r)&&!ze(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!je(r.parentElement))return r}return e}function qs(){let t=document.querySelectorAll(_s);for(let n of t)if(bi(n)&&!Yr(n)&&Fs(n))return n;let e=document.querySelectorAll(Td);for(let n of e){if(!bi(n)||!Fs(n)||Yr(n))continue;let r=n.querySelector(_s);return bi(r)&&!Yr(r)?r:n}return null}function js(){let t=In();if(t){let e=yi(t),n=e.parentElement;if(n&&!je(n))return n;if(!je(e))return e}return hi()}function zs(t){let e=In();return e?t.composedPath().includes(e):!1}var xi=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Md={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Ad(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Nd(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function vi(t){let e=Ad(t);return e?Nd(e)>.55?"light":"dark":null}function Hd(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=vi(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=vi(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=vi(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Gs(t){return t==="auto"?Hd():t}function Rd(t){try{let e=getComputedStyle(document.documentElement);for(let n of xi){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Us(t,e,n){let r=Md[e];if(n){Rd(t);for(let o of xi)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of xi)t.style.setProperty(o,r[o])}function Ks(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var wi=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Id="bloom-root",Et="bloom-rail-item",eo="bloom-account-item",pe="bloom-sidebar-panel",zn="bloom-plugin-dialog",lo="bloom-plugin-layer",no="bloom-settings-css",Od=2e3,Ys=null,Bd=null,Zt=!1,Ti=[],Zr=null,ro=null,Yt=null,Qr=null,Dt=null,Fn=null,On,Ge=0,qn=0,Bn=0,Dn=null,$n=null,oo=null,Xs=null,_n=null,Ei=[],io=!1,Dd=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],$d=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],co="",jn="all",Jt="all";function uo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Zs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function _d(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Fd(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function qd(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var jd={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function zd(t){return t.icon||jd[t.name]||uo()}function Si(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Us(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Js(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function ao(){let t="auto",e=Gs(t);Si(Ys,e,!0);let n=document.getElementById(pe);n instanceof HTMLElement&&Si(n,e,!0);let r=document.getElementById(zn);r instanceof HTMLElement&&Si(r,e,!0);let o=document.getElementById(Et);o instanceof HTMLElement&&Js(o),de("schemeChange",{scheme:e,pref:t})}function Qs(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function tl(){if(w("settings",wi),document.getElementById(no)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=no,t.textContent=wi,document.head.appendChild(t)}function Gd(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Ud(){for(let t of Ti)t();Ti=[]}function el(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Kd(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Mi(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Vd(t){return Mi(t).length>0}function to(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Wd(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Kd(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Yd(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Wd(e,n));let i=k.store.plugins[t]??(k.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Ti.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??to(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??to(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=el(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??to(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Vs(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Xd(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=k.store.plugins[t.name]??(k.store.plugins[t.name]={});for(let[n,r]of Mi(t)){if(n==="enabled"||r.type===5)continue;let o=to(r);o!==void 0&&(e[n]=o)}rl(t)}function nl(t){t.key==="Escape"&&(!document.getElementById(lo)&&!document.getElementById(zn)||(t.stopPropagation(),Ue()))}function Zd(){io||(document.addEventListener("keydown",nl),io=!0)}function Jd(){io&&(document.removeEventListener("keydown",nl),io=!1)}function Ue(){Ud(),Jd(),document.getElementById(lo)?.remove(),document.getElementById(zn)?.remove()}function rl(t){if(Ue(),!document.body)return;let e=document.createElement("div");e.id=lo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Xt),e.addEventListener("pointerup",Xt),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Ue()});let n=document.createElement("div");n.id=zn,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Xt),n.addEventListener("pointerup",Xt),n.addEventListener("click",Xt);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Zs(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Ue()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Vs("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Vs("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Mi(t);if(c.length)for(let[u,d]of c){let f=Yd(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Xd(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Zd(),ao()}function Qd(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=zd(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Ss(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Fd(l),c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let m=ks(t.name);de("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let h=ws(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${h?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",h?"Unpin from top":"Pin to top"),m.innerHTML=qd(h),m.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let A=Es(t.name);de("pluginPin",{name:t.name,pinned:A})}),s.appendChild(m)}if(Vd(t)){let h=document.createElement("button");h.type="button",h.className="bloom-icon-btn bloom-card-settings",h.setAttribute("aria-label",`${t.name} settings`),h.innerHTML=_d(),h.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),rl(t)}),s.appendChild(h)}let u=el(t.name,Fe(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",h=>h.stopPropagation()),d?.addEventListener("change",()=>{Ms(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let h=document.createElement("div");h.className="bloom-card-desc",h.textContent=t.description,n.appendChild(h)}let f=document.createElement("div");f.className="bloom-card-separator";let b=document.createElement("div");b.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",b.appendChild(g),e.append(n,f,b),e}function ol(){return Object.values(Bt).filter(t=>!t.hidden&&t.name!=="Settings")}function il(t,e){return e==="all"||e==="favorites"?!0:(t.tags??[]).includes(e)}function tm(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function em(){return co.trim()?"No plugins match your search.":Jt==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function nm(){let t=ol();return $d.filter(e=>e.id==="favorites"||e.id==="all"?!0:t.some(n=>il(n,e.id)))}function rm(){if(_n){_n.replaceChildren();for(let t of nm()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Jt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Jt=t.id,fe()}),_n.appendChild(e)}}}function om(){let t=ol();if(Jt==="favorites"){let e=new Set(qr());t=t.filter(n=>e.has(n.name))}else Jt!=="all"&&(t=t.filter(e=>il(e,Jt)));return jn==="enabled"&&(t=t.filter(e=>Fe(e.name))),jn==="disabled"&&(t=t.filter(e=>!Fe(e.name))),t}function fe(){if(!Dn)return;rm();let t=om();oo&&(oo.placeholder=`Search ${t.length} plugins...`);let e=t,n=co.trim().toLowerCase();if(n&&(e=e.filter(r=>tm(r).includes(n))),Jt!=="favorites"){let r=Fr();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Dn.replaceChildren();for(let r of e)Dn.appendChild(Qd(r));$n&&($n.hidden=e.length>0,$n.textContent=em())}function Xt(t){t.stopPropagation()}function ki(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ai(){document.getElementById(Et)?.setAttribute("aria-expanded",Zt?"true":"false")}function im(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Ni(){Ue(),co="",jn="all",Jt="all",document.getElementById(pe)?.remove(),Zt=!1,Ai()}function am(t){let e=document.createElement("div");e.id=t,e.addEventListener("pointerdown",Xt),e.addEventListener("pointerup",Xt),e.addEventListener("click",Xt);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=uo();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",o.append(i,l);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close"),c.innerHTML=Zs(),c.addEventListener("click",Ni),r.append(o,c),n.appendChild(r);let u=document.createElement("div");u.className="bloom-plugin-tabs",n.appendChild(u);let d=document.createElement("div");d.className="bloom-search-bar";let f=document.createElement("input");f.type="search",f.className="bloom-search-input",f.setAttribute("aria-label","Search plugins"),f.placeholder="Search plugins...",f.addEventListener("input",()=>{co=f.value,fe()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let m of Dd){let T=document.createElement("option");T.value=m.value,T.textContent=m.label,b.appendChild(T)}b.value=jn,b.addEventListener("change",()=>{jn=b.value,fe()}),d.append(f,b),n.appendChild(d);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let h=document.createElement("p");return h.className="bloom-tab-empty",h.hidden=!0,n.appendChild(h),e.appendChild(n),Dn=g,$n=h,oo=f,Xs=b,_n=u,fe(),e}function sm(t){t.classList.add("bloom-rail-dock")}function lm(){let t=document.getElementById(Et);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Xr(t)?t:null}function cm(){if(document.getElementById(pe)?.remove(),!document.body)return;let t=am(pe);sm(t),document.body.appendChild(t),Zt=!0,Ue(),ao(),Ai(),de("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Q,dock:"center",rail:!!lm()})}function Hi(){let t=document.getElementById(pe);if(t instanceof HTMLElement&&t.isConnected&&im(t)){Ni();return}t?.remove(),cm()}function um(){let t=document.createElement("button");return t.type="button",t.id=Et,t.className="bloom-rail-item",t.setAttribute("aria-controls",pe),t.setAttribute("aria-expanded",Zt?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${uo()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Hi()}),t}function Ws(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function dm(t){let e=t.querySelector("img");if(e instanceof HTMLElement){let n=e.getBoundingClientRect();if(n.width>8&&n.height>8)return e}for(let n of t.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let r=n.getBoundingClientRect();if(r.width>8&&r.height>8)return n}return null}function mm(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Wt(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function al(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=dm(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Wt(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Wt(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Wt(n,"width",l),Wt(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Wt(t,"padding-left",u);let d=mm(e,r);if(d){let f=d.getBoundingClientRect(),b=n.getBoundingClientRect(),g=Math.round(f.left-b.right);g>=0&&g<=24&&Wt(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Wt(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Wt(t,"gap",Math.round(l))}Js(t)}function Li(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function fm(){if(Fn?.isConnected&&Dt){Dt.observe(Fn,{childList:!0});return}Ci()}function pm(t){if(Li(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function gm(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Bn=0;return}Bn+=1,qn=Date.now()+Math.min(8e3,250*2**Math.min(Bn,5))})}function bm(){Ge||Date.now()<qn||(Ge=requestAnimationFrame(()=>{Ge=0,!(Date.now()<qn)&&(document.getElementById(Et)?.isConnected||so())}))}function so(){if(!document.body)return;Dt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Et);t=n instanceof HTMLButtonElement?n:um();let r=In(),o=hi();if(r){let i=yi(r),a=i.parentElement;if(Li(i)||a&&Li(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Ws(t),al(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Ws(t,!0)):t.isConnected&&!Xr(t)&&(t.remove(),t=null)}finally{gm(t,e),fm(),Ai()}}function Ci(){let t=js();!t||!pm(t)||Fn===t&&Dt||(Dt?.disconnect(),Fn=t,Dt=new MutationObserver(()=>{document.getElementById(Et)?.isConnected||bm()}),Dt.observe(t,{childList:!0}))}function hm(){so(),Ci(),On===void 0&&(On=window.setInterval(()=>{let t=document.getElementById(Et);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=qn&&so();else{Bn=0;let e=In();e&&al(t,e)}Ci()},Od))}function ym(){On!==void 0&&(clearInterval(On),On=void 0),Ge&&cancelAnimationFrame(Ge),Ge=0,qn=0,Bn=0,Dt?.disconnect(),Dt=null,Fn=null}function vm(t){Qr===t&&Yt||(Yt?.disconnect(),Qr=t,Yt=new MutationObserver(()=>{if(!t.isConnected){Yt?.disconnect(),Yt=null,Qr=null;return}sl(t)}),Yt.observe(t,{childList:!0}))}function sl(t){if(vm(t),t.querySelector(`#${eo}`))return;let e=document.createElement("button");e.type="button",e.id=eo,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${uo()}<span>Bloom++</span>`,e.addEventListener("pointerdown",ki),e.addEventListener("pointerup",ki),e.addEventListener("click",n=>{ki(n),Hi()}),t.insertBefore(e,t.firstChild)}function Jr(){let t=qs();return t?(sl(t),!0):!1}function xm(t){zs(t)&&(queueMicrotask(Jr),requestAnimationFrame(()=>{Jr()}),window.setTimeout(Jr,60),window.setTimeout(Jr,180))}function wm(){ro?.abort();let t=new AbortController;ro=t,document.addEventListener("click",xm,{signal:t.signal})}function Em(){ro?.abort(),ro=null,Yt?.disconnect(),Yt=null,Qr=null}function ll(){qe(),Gd(()=>{tl(),Qs(),so(),Hi()})}var cl=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Id}`,`#${Et}`,`#${eo}`,`#${pe}`,`#${lo}`,`#${zn}`,`#${no}`,"#bloom-menu-panel"],start(){tl(),Qs(),hm(),wm(),Zr?.(),Zr=Ks(ao),ao(),Ei=[Or("pluginToggle",()=>{Zt&&fe()}),Or("pluginPin",()=>{Zt&&fe()}),Or("pluginStar",()=>{Zt&&fe()})]},stop(){ym(),Em(),Zr?.(),Zr=null;for(let t of Ei)t();Ei=[],Ni(),document.getElementById(Et)?.remove(),document.getElementById(eo)?.remove(),document.getElementById(no)?.remove(),Ys=null,Bd=null,Dn=null,$n=null,oo=null,Xs=null,_n=null,Zt=!1}});var mo='form[data-type="unified-composer"], form.w-full[data-type]',St=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Ke=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),ul=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),dl=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Sm=/stop streaming|stop generating|停止生成|停止输出|停止响应/,km='[contenteditable="false"], button, [role="button"]';function ut(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function ge(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!ut(o)))return o;return null}function ml(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function P(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=ml(t);return!!(Sm.test(n)||/^stop$/i.test(n))}function dt(){let e=Array.from(document.querySelectorAll(mo)).find(ut);if(e instanceof HTMLElement)return e;let n=ge(document,St),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function U(){let t=Array.from(document.querySelectorAll(St));return t.find(ut)??t[0]??null}function Tm(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(km);return!!n&&n!==e&&e.contains(n)}function Ri(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Tm(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function mt(t){let e=t??U();return e?Ri(e,e).replaceAll("\u200B","").trim().length>0:!1}function Qt(t){return!mt(t)}function fo(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function fl(t){let e=dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!ut(n))&&t(n))return n;return null}function te(){let t=dt(),e=ge(t,Ke)??ge(document,Ke);return e&&!P(e)?e:fl(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!P(n);let o=ml(n);return/^(send|send prompt|发送)$/i.test(o)&&!P(n)})}function be(){let t=dt(),e=ge(t,ul,!0)??ge(document,ul,!0);if(e)return e;let n=ge(t,dl)??ge(document,dl);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&ut(r)&&P(r))return r}return fl(P)}function tt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Ri(n,t)).join(`
`):Ri(t,t)}function Pi(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function $t(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Pi(t,n)}var pl=/\/c\/([a-zA-Z0-9_-]{8,})/i;function et(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function _t(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function Ve(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(pl)?.[1]??""}catch{return t.match(pl)?.[1]??""}}function R(){let t=Ve(location.pathname);if(t)return t;let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return""}var yl=new E("Harvest"),Lm=1500,Cm=200,po=new Set,go=new Map,bo=new Map,We=null,ho=null,Gn=null,kt=0;function Mm(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Am(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Nm(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function vl(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var Hm=/"action"\s*:\s*"(next|continue|variant)"/i;function Rm(t,e,n){return!(e!=="POST"||vl(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Hm.test(n))}function Pm(t,e){return e!=="GET"||vl(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function gl(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function xl(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Im(t){return typeof t=="string"?xl(t):""}function Ii(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ii(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function wl(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function bl(t,e,n){!t||!e||bo.get(t)!==e&&(bo.set(t,e),wl(bo,Lm),ee({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Om(t,e){let n=e.trim();!t||!n||go.get(t)!==n&&(go.set(t,n),wl(go,Cm),ee({type:"conversation-meta",conversationId:t,title:n}))}function Un(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Un(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Om(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ii(l.create_time??l.createTime??l.created_at);c&&u&&bl(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ii(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&bl(a,s,o),r.mapping&&typeof r.mapping=="object")Un(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Un(l,o,n+1)}function hl(t,e){if(t)try{Un(JSON.parse(t),e)}catch{}}function ee(t){for(let e of Array.from(po))try{e(t)}catch{}}async function Bm(t,e,n){if(n===kt)try{let r=await t.json();if(n!==kt)return;Un(r,e)}catch{}}async function Dm(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===kt&&ee({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===kt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let b=xl(c);b&&(o=b,ee({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let b of f){let g=b.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||hl(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===kt&&hl(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===kt&&ee({type:"post-end",conversationId:o,error:i})}function $m(t,e,n){let r=Am(e),o=Nm(e,n),i=Pm(r,o),a=Rm(r,o,n?.body),s=kt,l="";return a&&(l=Im(n?.body)||gl(r)||Ve(r)||R(),ee({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==kt||!i&&!a)return c;try{let u=c.clone();i?Bm(u,gl(r)||R(),s):Dm(u,l,!c.ok,s)}catch{a&&ee({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===kt&&ee({type:"post-end",conversationId:l,error:!0}),c})}function _m(){if(We)return;let t=Mm();Gn=t,We=t.fetch.bind(t);let e=(n,r)=>$m(We,n,r);ho=e,t.fetch=e,yl.debug("conversation fetch harvest hooked")}function Fm(){kt+=1,!(!We||!Gn)&&(ho&&Gn.fetch===ho&&(Gn.fetch=We),We=null,ho=null,Gn=null,yl.debug("conversation fetch harvest unhooked"))}function nt(t){return po.add(t),_m(),()=>{po.delete(t),po.size===0&&Fm()}}function Ye(t){return t?go.get(t)??"":""}function yo(t){return t?bo.get(t)??null:null}var kl=new E("Streaming");function Jn(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!ut(e))&&(P(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function qm(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&ut(t))}function jm(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&ut(t))}function zm(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function ft(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function D(){if(be()||Jn()||zm())return!0;let t=te();return t&&ut(t)&&!P(t)?!1:!!(qm()||jm())}var Gm=400,El=3,ve=new Set,Vn,Wn=null,Oi=null,ye=!1,he=0,ne="",Tt="",Yn=!1,Xn=!1,Zn=!1;function Tl(){return _t(et())}function Sl(t,e){return{streaming:t,contextKey:e,conversationId:R()}}function X(t,e){if(!t||t===e)return!1;if(t.endsWith("|draft")&&!e.endsWith("|draft"))return!0;try{let n=t.split("|")[0],r=e.split("|")[0],o=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(r).pathname.replace(/\/$/,"")||"/";if((o==="/"||o==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function Bi(){ye=!1,he=0,ne="",Yn=!1,Xn=!1,Zn=!1}function Um(t){for(let e of Array.from(ve))try{e.onFall?.(t)}catch{}}function Km(t){for(let e of Array.from(ve))try{e.onRise?.(t)}catch{}}function Kn(t){for(let e of Array.from(ve))try{e.onTick?.(t)}catch{}}function Vm(t,e){for(let n of Array.from(ve))try{n.onContext?.(t,e)}catch{}}function Wm(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&P(n)&&(Yn=!0)}function Ym(t){t.type==="post-end"&&ye&&(Zn=!0,t.error&&(Xn=!0))}function Xm(){let t=Tl(),e=D();if(Tt&&t&&Tt!==t){if(Vm(t,Tt),!X(Tt,t)){Bi(),Tt=t,Kn(Sl(e,t));return}ne===Tt&&(ne=t)}Tt=t;let n=Sl(e,t);if(e){let i=!ye;i&&(Yn=!1,Xn=!1,Zn=!1),ye=!0,he=0,ne=t,i&&Km(n),Kn(n);return}if(!ye){Kn(n);return}if(he+=1,Zn&&(he=Math.max(he,El)),he<El){Kn(n);return}let r=!!ne&&ne===t,o={contextKey:ne||t,conversationId:R(),userStopped:Yn,error:Xn||ft()};Bi(),r&&Um(o),Kn(n)}function Zm(){Vn===void 0&&(ye=D(),Tt=Tl(),ne=ye?Tt:"",he=0,Yn=!1,Xn=!1,Zn=!1,Wn?.abort(),Wn=new AbortController,document.addEventListener("click",Wm,{capture:!0,signal:Wn.signal}),Oi=nt(Ym),Vn=setInterval(Xm,Gm),kl.debug("watchStreamingEdge started"))}function Jm(){ve.size||(Vn!==void 0&&(clearInterval(Vn),Vn=void 0),Wn?.abort(),Wn=null,Oi?.(),Oi=null,Bi(),Tt="",kl.debug("watchStreamingEdge stopped"))}function W(t){let e=typeof t=="function"?{onFall:t}:t;return ve.add(e),Zm(),()=>{ve.delete(e),Jm()}}var Ll="bloom-host-icon",Qn="data-bloom-host-rel",Di="not all",$i=0,Cl=0,Qm=400;function Ml(t){$i+=1;try{t()}finally{$i-=1}}function vo(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function re(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Al(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function tf(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function ef(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Cl<Qm||(Cl=n,t.appendChild(e))}function nf(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||vo(n)&&(n.getAttribute(Qn)||n.setAttribute(Qn,n.rel),n.media!==Di&&(n.media=Di),n.rel!==Ll&&(n.rel=Ll))}function rf(t){for(let e of t.querySelectorAll(`link[${Qn}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Qn);n&&(e.rel=n),e.removeAttribute(Qn),e.media===Di&&e.removeAttribute("media")}}function Nl(t,e){let{head:n}=document;!n||!e||Ml(()=>{nf(n,t);let r=Al(t),{type:o,sizes:i}=tf(e);r?ef(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Hl(t,e){let{head:n}=document;n&&Ml(()=>{Al(t)?.remove(),rf(n)})}function Rl(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if($i)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:vo(c.target)&&(a=!0,re(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)vo(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)vo(u)&&u.id!==t&&(a=!0,re(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var of=["original","badge","dot","hole","bg"],Ol=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Bl={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},xo="#FCFCFC",af="#111111",Pl="#111111",sf="#ffffff",lf="#212121",cf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",uf={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},wo=32,Il=64;function Dl(t){return typeof t=="string"&&of.includes(t)}function df(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Eo(t){let e=document.createElement("canvas");e.width=wo,e.height=wo;let n=e.getContext("2d");return n?(n.scale(wo/Il,wo/Il),t(n),e.toDataURL("image/png")):""}function mf(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function So(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(cf);n&&(t.strokeStyle=af,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function ff(t,e,n){let r=Bl[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Pl,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Pl,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=sf,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function tr(t,e){if(t==="original")return e==="wait"?Eo(r=>So(r,xo)):df(uf[e]);let n=e==="wait"?void 0:Bl[e];return Eo(t==="hole"?r=>So(r,n??xo):t==="bg"?r=>{r.fillStyle=n??lf,mf(r,0,0,64,64,14),r.fill(),So(r,xo,!1)}:r=>{So(r,xo),e!=="wait"&&ff(r,e,t==="dot"?"dot":"badge")})}function $l(t){return{wait:tr(t,"wait"),rotate:tr(t,"rotate"),done:tr(t,"done"),ready:tr(t,"ready"),error:tr(t,"error")}}var pf=new E("ChatStateFavicons"),Ee="bloom-chat-state-favicon",Gl=["input","beforeinput","cut","paste","compositionend"],Ul=S({style:{type:3,description:"Favicon overlay",options:Ol}}),Ct="",Fi={wait:"",rotate:"",done:"",ready:"",error:""},er="wait",xe=!1,Lt=!1,K=null,rt="",ot="",Se=!0,Xe=null,it=0,ko=null,To=null,we=null,_i=null,Ze=null,gt=!1,_l=new WeakSet;function gf(){let t=Ul.store.style;return Dl(t)?t:"bg"}function Kl(){let e=document.querySelector(`link[rel~="icon"]:not(#${Ee}), link[data-bloom-host-rel]:not(#${Ee})`)?.href;return re(e)?e:re(Ct)?Ct:""}function bf(){let t=document.getElementById(Ee);return t instanceof HTMLLinkElement?t:null}function hf(){if(!re(Ct)){let t=Kl();t&&(Ct=t)}return re(Ct)?Ct:Fi.wait}function Vl(t){return t==="wait"?hf():Fi[t]}function Wl(){Nl(Ee,Vl(er))}function pt(t){let e=Vl(t);if(er===t){let n=bf();if(n&&n.getAttribute("href")===e)return}er=t,Wl()}function Fl(){Fi=$l(gf()),pt(er)}function Yl(){return _t(et())}function qi(t,e){!t||!e||t===e||(K===t&&(K=e),rt===t&&(rt=e),ot===t&&(ot=e))}function yf(){let t=Yl();return D()||xe||Lt?(rt&&t&&rt!==t&&X(rt,t)?(qi(rt,t),rt=t):!rt&&t&&(rt=t),rt||t):(rt="",t)}function ql(t){return!K||!t||K===t?!0:X(K,t)}function Xl(){xe=!1,Lt=!1,K=null,rt=""}function Zl(t){ot=t,Xl(),Se=!1,pt("wait")}function jl(t){return!t&&Se}function vf(){if(!gt)return;let t=Yl();if(ot&&t&&ot!==t&&!X(ot,t)){Zl(t);return}ot&&t&&X(ot,t)&&qi(ot,t),t&&(ot=t);let e=yf(),n=D(),r=Qt();if(ft()&&!n){pt("error"),xe=!1,Lt=!1,K=null;return}if(n){xe||(Se=!1),xe=!0,Lt=!1,K=e,pt("rotate");return}if(xe){let o=ql(e);if(xe=!1,o){Lt=!0,K=e,pt("done");return}Lt=!1,K=null}if(Lt)if(K&&e&&!ql(e))Lt=!1,K=null;else if(r){K=e||K,pt("done");return}else if(jl(r)){Lt=!1,pt("ready");return}else{Lt=!1,pt("wait");return}K=null,r?pt("wait"):jl(r)?pt("ready"):pt("wait")}function oe(){gt&&(nc(),Ql(),tc(),vf())}function Jl(){if(Ze){for(let t of Gl)Ze.removeEventListener(t,ec,!0);Ze=null}}function Ql(){let t=dt(),e=t&&t!==document.body?t:null;if(!(Ze===e&&e?.isConnected)&&(Jl(),!!e)){Ze=e;for(let n of Gl)Ze.addEventListener(n,ec,{capture:!0,passive:!0})}}function tc(){let t=dt();if(!(we&&_i===t&&t.isConnected)){if(we?.disconnect(),_i=t,!t||t===document.body){we=null;return}we=new MutationObserver(()=>Lo()),we.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Lo(){if(gt){if(document.hidden){it&&(cancelAnimationFrame(it),it=0),oe();return}it||(it=requestAnimationFrame(()=>{it=0,gt&&oe()}))}}function ec(){mt()&&(Se=!0),Lo()}function zl(){mt()&&(Se=!0),Lo()}function xf(){gt&&(it&&(cancelAnimationFrame(it),it=0),oe())}function wf(){gt&&(Se=!1,oe())}function Ef(){gt&&oe()}function Sf(){gt&&oe()}function kf(t,e){if(gt){if(X(e,t)){qi(e,t),ot=t,oe();return}Zl(t)}}function nc(){let t=U();!t||_l.has(t)||(_l.add(t),t.addEventListener("input",zl,{capture:!0,passive:!0}),t.addEventListener("compositionend",zl,{capture:!0,passive:!0}))}var rc=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Ul,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Ee}`],start(){gt=!0,Ct=Kl()||Ct,Fl(),To?.disconnect(),To=Rl(Ee,t=>{re(t)&&(Ct=t),Wl()}),Xe?.abort(),Xe=new AbortController,window.addEventListener("popstate",Lo,{signal:Xe.signal}),document.addEventListener("visibilitychange",xf,{signal:Xe.signal}),nc(),Ql(),tc(),ko?.(),ko=W({onRise:wf,onFall:Ef,onTick:Sf,onContext:kf}),oe(),pf.debug("favicon watch started")},stop(){gt=!1,it&&cancelAnimationFrame(it),it=0,ko?.(),ko=null,Xe?.abort(),Xe=null,Jl(),we?.disconnect(),we=null,_i=null,To?.disconnect(),To=null,Xl(),ot="",Se=!0,er="wait",Hl(Ee,Ct)},onSettingsChange:Fl});var oc=`.bloom-ih-hud {
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
`;var R0=new E("InputHistory"),ji=/\u200B/g,ic=10,ac=500,sc=100,Lf=8,Cf=120,Mf=2e3,Co=10,Mo=S({maxEntries:{type:4,description:"Max stored prompts",min:ic,max:ac,default:sc},history:{type:5,description:"Stored prompts",render:zf},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),zi=new Map,$=0,Gi="",Mt=!1,rr=!1,Vi=0,nr=null,Ui,Wi=null,lc=!0;function bt(){let t=Mo.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function cc(t){let e=G(Number(Mo.store.maxEntries??sc),ic,ac);return t.length>e?t.slice(t.length-e):t}function Ao(t){Mo.store.entries=cc(t)}function Af(t){return t.replaceAll(ji,"").replace(/\n$/,"").trim()}function Ki(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(St);return n instanceof HTMLElement?n:U()}function Nf(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!tt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(ji,"").trim().length===0,last:i.toString().replaceAll(ji,"").trim().length===0}}catch{return{first:!0,last:!0}}}function uc(t){clearTimeout(Ui),Ui=setTimeout(()=>{if(t!==Vi)return;rr=!1;let e=Wi;e&&Pi(e,lc)},Cf)}function dc(t,e,n){rr=!0,Wi=t,lc=n;let r=++Vi;$t(t,e,n),uc(r)}function Hf(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Je(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Rf(){document.querySelector(".bloom-ih-hud")?.remove()}function Pf(t,e){let n=Hf();n.textContent=t;let r=(e.closest("form")??dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Lf)}px`,n.classList.add("bloom-ih-hud-on")}function Yi(t){let e=Af(t);if(!e)return;let n=Date.now(),r=zi.get(e);if(r&&n-r<Mf)return;zi.set(e,n);let o=bt().filter(i=>i!==e);o.push(e),Ao(o),$=bt().length,Mt=!1,Je()}function If(t,e){let n=bt();if(!n.length&&t)return;$>=n.length&&(Gi=tt(e),$=n.length);let r=t?$-1:$+1;r<0||r>n.length||($=r,Mt=!0,dc(e,r===n.length?Gi:n[r],t),r<n.length?Pf(`${r+1} / ${n.length}`,e):Je())}function Of(t){Mt=!1,Je(),dc(t,Gi,!1),$=bt().length}function Bf(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Ki(t.target)??Ki(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Mt&&!t.altKey&&!t.shiftKey){Of(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){Yi(tt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=bt();if(!r){let i=Nf(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||$<=0)||!n&&$>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),If(n,e))}function Df(t){if(Ki(t.target)){if(rr){uc(Vi);return}Mt&&(Mt=!1,Je(),$=bt().length)}}function $f(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(St);n instanceof HTMLElement&&Yi(tt(n))}function _f(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Ke);if(!n||!(n instanceof HTMLElement)||P(n))return;let r=U();r&&Yi(tt(r))}function Ff(t){if(!(!Mt||rr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Mt=!1,Je()}}function qf(){if(nr)return;nr=new AbortController;let{signal:t}=nr,e={capture:!0,signal:t};window.addEventListener("keydown",Bf,e),window.addEventListener("input",Df,e),window.addEventListener("submit",$f,e),window.addEventListener("click",_f,e),window.addEventListener("pointerdown",Ff,e)}function jf(t){let e=bt().slice();e.splice(t,1),Ao(e),$>e.length&&($=e.length)}function zf(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=bt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Co));n>=l&&(n=l-1);let c=s.slice(n*Co,n*Co+Co);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((T,A)=>{let B=i.indexOf(T),It=bt().length-1-B,wt=document.createElement("div");wt.className="bloom-ih-item";let Y=document.createElement("button");Y.type="button",Y.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,Y.textContent=T,Y.addEventListener("click",()=>{r=r===A?-1:A,o()});let N=document.createElement("div");N.className="bloom-ih-actions";let J=document.createElement("button");J.type="button",J.title="Copy",J.textContent="C",J.addEventListener("click",()=>{bs(T)});let Ot=document.createElement("button");Ot.type="button",Ot.title="Delete",Ot.textContent="\xD7",Ot.addEventListener("click",()=>{jf(It),o()}),N.append(J,Ot),wt.append(Y,N),m.appendChild(wt)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let b=document.createElement("span");b.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let h=document.createElement("button");h.type="button",h.className="bloom-ih-clear",h.textContent="Clear all",h.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Ao([]),$=0,o())}),d.append(f,b,g,h),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var mc=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Mo,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",oc),$=bt().length,Mt=!1,qf()},stop(){nr?.abort(),nr=null,Je(),Rf(),zi.clear(),clearTimeout(Ui),rr=!1,Wi=null,Mt=!1},onSettingsChange(){let t=bt(),e=cc(t);e.length!==t.length&&Ao(e),$>e.length&&($=e.length)}});var Xi="noShareLink",Gf=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Uf=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Zi=S({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function fc(t){return`${t.join(",")}{display:none!important}`}function pc(){let t=[];if(Zi.store.hideShareChat!==!1&&t.push(fc(Gf)),Zi.store.hideShareProject!==!1&&t.push(fc(Uf)),!t.length){x(Xi);return}w(Xi,t.join(`
`))}var gc=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Zi,start:pc,onSettingsChange:pc,stop(){x(Xi)}});var yc="noDictation",Kf=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Vf=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],vc=S({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function bc(t){return`${t.join(",")}{display:none!important}`}function hc(){let t=[bc(Kf)];vc.store.hideDictationSettings!==!1&&t.push(bc(Vf)),w(yc,t.join(`
`))}var xc=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:vc,start:hc,onSettingsChange:hc,stop(){x(yc)}});var Ji="noSidebarIdentity",Qe=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Sc=Qe.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),kc=Qe.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Wf=[...Sc,...kc],Yf=[...Sc,...Qe.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Xf=Qe.map(t=>`${t} a[href^="mailto:"]`),Zf=Qe.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Jf=Qe.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),or=S({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function wc(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Qf(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function tp(){return`${Jf.join(",")}{margin-block:auto!important}`}function ep(){return`${Zf.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Ec(){let t=or.store.hideUsername!==!1,e=or.store.hideEmail!==!1,n=t&&or.store.enlargePlan!==!1,r=t&&or.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Qf([...Yf,...kc])),o.push(tp())):o.push(wc(Wf))),e&&o.push(wc(Xf)),n&&o.push(ep()),!o.length){x(Ji);return}w(Ji,o.join(`
`))}var Tc=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:or,start:Ec,onSettingsChange:Ec,stop(){x(Ji)}});var Lc=`#bloom-rt-host {
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
`;var Ac=new E("RecentTopics"),nn="bloom-rt-host",Nc="home",Hc=/^\/c\/([a-z0-9_-]{8,})/i,rp=/\/c\/([a-z0-9_-]{8,})/i,Rc=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,op=new Set(["Backquote","IntlBackslash"]),ip=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),ap=140,sp=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),_=S({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:sp},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),No=null,ta=null,Z=!1,ur=!1,ir=!1,At=0,ke="",tn=null,ar=null,en,Qi=null;function lp(){let t=Number(_.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function sr(){let t=_.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function ea(){let t=_.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Pc(){let t=_.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function na(){let t=_.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ro(t){let e=lp();return t.length>e?t.slice(0,e):t}function Nt(t){return t===Nc}function lr(t,e=ap){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function ra(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Hc)?.[1]??""}catch{return t.match(rp)?.[1]??""}}function Te(){let t=(location.pathname||"/").match(Hc);if(t?.[1])return t[1];let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Nc}function oa(t){if(Nt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(ra(r.getAttribute("href")||"")!==t)continue;let o=lr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Te()===t&&e&&!/^ChatGPT$/i.test(e)?lr(e,80):""}function cp(t){if(Nt(t))return"New chat";let e=ea()[t];if(e)return e;let n=Ye(t);return n||oa(t)||"Chat"}function up(t){return na()[t]||""}function dp(t){return Pc()[t]||{}}function ia(t,e){if(!t||Nt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=ea();n[t]!==e&&(n[t]=e,_.store.titles=n)}function mp(t){t.type==="conversation-meta"&&(ia(t.conversationId,t.title),Z&&rn())}function fp(t,e){if(!t||Nt(t)||!e)return;let n=na();n[t]!==e&&(n[t]=e,_.store.projects=n)}function pp(t,e){if(!t||Nt(t)||!e.user&&!e.assistant)return;let n=Pc(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,_.store.previews=n)}function aa(t){if(!t||Nt(t)&&_.store.includeHome===!1)return;let e=sr().filter(n=>n!==t);e.unshift(t),_.store.visits=Ro(e)}function Po(){let t=_.store.includeHome!==!1;return Ro(sr().filter(n=>t||!Nt(n))).map(n=>({id:n,title:cp(n),project:up(n),preview:dp(n)}))}function Cc(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return lr(o)}catch{return""}}function cr(t){if(!t||Nt(t)||t!==Te())return;let e=oa(t);e&&ia(t,e);let n=Cc("user"),r=Cc("assistant");pp(t,{user:n,assistant:r});let o=Oc(t);if(o){let i=Ic(o);i&&fp(t,i)}}function sa(){let t=ea(),e=na(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${nn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=ra(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=lr(c.textContent||"",80);d&&!Rc.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Ic(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(_.store.titles=t),i&&(_.store.projects=e);let a=sr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(_.store.visits=Ro([...a,...l]))}function Ic(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=lr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Rc.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Oc(t){if(Nt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(ra(e.getAttribute("href")||"")===t)return e}catch{}return null}function gp(t){let e=Oc(t);if(e){e.click();return}if(Nt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function bp(){let t=Te();ke&&ke!==t&&cr(ke),ke=t,aa(t),sa();let e=oa(t);e&&ia(t,e),cr(t)}function Ho(){en===void 0&&(en=window.setTimeout(()=>{en=void 0,bp()},120))}function hp(){tn||(tn=history.pushState.bind(history),ar=history.replaceState.bind(history),history.pushState=function(...e){let n=tn(...e);return Ho(),n},history.replaceState=function(...e){let n=ar(...e);return Ho(),n})}function yp(){tn&&(history.pushState=tn),ar&&(history.replaceState=ar),tn=null,ar=null}function vp(t){return op.has(t.code)||t.keyCode===192?!0:ip.has(t.key)}function Bc(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function xp(t,e){ur=e,sa(),cr(Te()),Z=!0,At=0;try{let n=Te();aa(n);let r=Po();r.length>1&&(At=t?r.length-1:1)}catch(n){Ac.error("Failed to open switcher:",n)}rn()}function Mc(t){let{length:e}=Po();e&&(At=(At+(t?-1:1)+e)%e,rn())}function la(){if(!Z)return;let t=Po()[At];Z=!1,ur=!1,rn(),t&&gp(t.id)}function Dc(){Z&&(Z=!1,ur=!1,rn())}function wp(t){if(Bc(t)){ir=!0;return}if((t.ctrlKey||ir)&&!t.altKey&&!t.metaKey&&vp(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{Z?Mc(t.shiftKey):xp(t.shiftKey,!0)}catch(n){Ac.error("Hotkey failed:",n)}return}if(Z){if(t.key==="Escape"){t.preventDefault(),Dc();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),la();return}t.key==="Tab"&&(t.ctrlKey||ir)&&(t.preventDefault(),Mc(t.shiftKey))}}function Ep(t){Bc(t)&&(ir=!1,Z&&ur&&la())}function Sp(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Ho)}function kp(t){!Z||(t.target instanceof Element?t.target:null)?.closest(`#${nn}`)||Dc()}function Tp(){document.visibilityState==="hidden"&&cr(Te())}function Lp(){if(!document.body)return null;let t=document.getElementById(nn);if(t instanceof HTMLElement)return ta=t,t;t=document.createElement("div"),t.id=nn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ta=t,t}function rn(){let t=Lp();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!Z){e.dataset.visible="false",e.replaceChildren();return}let n=Po();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}At>=n.length&&(At=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===At?"true":"false",s.setAttribute("aria-selected",a===At?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{At=a,la()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Cp(){document.getElementById(nn)?.remove(),ta=null}var $c=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${nn}`],settings:_,start(){w("recentTopics",Lc),ke=Te(),aa(ke),sa(),cr(ke),Qi=nt(mp),hp(),No=new AbortController;let{signal:t}=No;window.addEventListener("keydown",wp,{capture:!0,signal:t}),window.addEventListener("keyup",Ep,{capture:!0,signal:t}),window.addEventListener("popstate",Ho,{signal:t}),document.addEventListener("click",Sp,{capture:!0,signal:t}),document.addEventListener("click",kp,{signal:t}),document.addEventListener("visibilitychange",Tp,{signal:t})},stop(){No?.abort(),No=null,en!==void 0&&(clearTimeout(en),en=void 0),yp(),Qi?.(),Qi=null,Z=!1,ur=!1,ir=!1,Cp()},onSettingsChange(){let t=Ro(sr());t.length!==sr().length&&(_.store.visits=t),Z&&rn()}});var ca="cleaner",Mp=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Ap=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Np=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Hp=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Rp=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Pp=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Le=S({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function on(t){return`${t.join(",")}{display:none!important}`}function _c(){let t=[];if(Le.store.hideDownloadApps!==!1&&t.push(on(Mp)),Le.store.hideDisclaimer!==!1&&t.push(on(Ap)),Le.store.hideUpgrade!==!1&&t.push(on(Np)),Le.store.hideLockedModels!==!1&&t.push(on(Hp)),Le.store.hideHomePromo!==!1&&t.push(on(Rp)),Le.store.hideAds!==!1&&t.push(on(Pp)),!t.length){x(ca);return}w(ca,t.join(`
`))}var Fc=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Le,start:_c,onSettingsChange:_c,stop(){x(ca)}});var Oo=new E("ResponseNotification"),sn=S({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Fp},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),ua=!1,Io=null,an=null,dr=null;function Ip(){return document.visibilityState==="hidden"||document.hidden}function Op(){return sn.store.onlyWhenHidden===!1?!0:Ip()}function Bp(){let t=Ye(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function qc(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!an||an.state==="closed")&&(an=new t);let e=an,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Oo.debug("chime failed",t)}}function Dp(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Oo.debug("custom sound failed",e),qc()}}function jc(){let t=String(sn.store.soundUrl||"").trim();t?Dp(t):qc()}function $p(){let t="Bloom++",e=`${Bp()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Oo.debug("notification failed",n)}}function _p(){Op()&&(sn.store.sound!==!1&&jc(),sn.store.browserNotification!==!1&&$p())}function Fp(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>jc()),t.appendChild(e),()=>{e.remove()}}var zc=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:sn,start(){ua=!0,Io?.(),Io=W(t=>{ua&&(t.userStopped||t.error||_p())}),dr?.abort(),dr=new AbortController,sn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:dr.signal}),Oo.debug("watch started")},stop(){ua=!1,Io?.(),Io=null,dr?.abort(),dr=null;try{an?.close()}catch{}an=null}});var Gc=`#bloom-pq-chip {
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
`;var gr=new E("PromptQueue"),ma="bloom-pq-chip",Uc="promptQueue",Kc=80,jp=50,zp=2e3,Xc=S({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),q=new Map,Ft=!1,ht="",F="",ae=!1,yt=!1,O=null,mr=null,Bo=null,pr,fr,ln=null;function cn(){return _t(et())}function un(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function Vc(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(St);return n instanceof HTMLElement?n:U()}function fa(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Zc(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Gp(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?un(e.innerText||e.textContent||""):""}catch{return""}}function Wc(t){if(!ht||ht===t)return;let e=q.get(ht);!e||q.has(t)||X(ht,t)&&(q.delete(ht),q.set(t,e),F===ht&&(F=t),O?.key===ht&&(O.key=t),gr.debug("migrated pending",ht,"\u2192",t))}function pa(t){let e=cn();if(q.get(e)&&Xc.store.replacePending===!1)return;q.set(e,{text:t,at:Date.now()}),O={key:e,text:t,turns:Zc(),ticks:3};let r=U();r&&$t(r,""),ie(),gr.debug("queued",e,t.length)}function Up(t){q.delete(t),F===t&&(F=""),O?.key===t&&(O=null),ie()}function Kp(){yt=!0,clearTimeout(fr),fr=setTimeout(()=>{yt=!1,fr=void 0},zp)}function Vp(){let t=cn(),e=q.get(t);if(!e)return;let n=U();if(!n)return;q.delete(t),F="",ie(),Kp(),$t(n,e.text);let r=te();r&&!P(r)&&!fo(r)&&(r.click(),yt=!1)}function Yc(t){if(!Ft||ae||D()||cn()!==t)return;let e=q.get(t);if(!e){F="";return}if(ft())return;let n=U();if(!n)return;if(!Qt(n)){let o=un(tt(n));if(o&&o!==e.text)return}let r=te();!r||P(r)||fo(r)||(ae=!0,$t(n,e.text),clearTimeout(pr),pr=setTimeout(()=>Wp(t,e.text),jp))}function Wp(t,e){pr=void 0;try{if(!Ft)return;let n=q.get(t);if(!n||n.text!==e||D()||cn()!==t)return;let r=U();if(!r)return;let o=un(tt(r));if(o&&o!==e&&!Qt(r))return;o!==e&&$t(r,e);let i=te();if(!i||P(i)||fo(i))return;i.click(),q.delete(t),F="",ie(),gr.debug("drained",t)}finally{ae=!1}}function Jc(t){let e=dt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function da(){ln?.remove(),ln=null}function ie(){if(!Ft||!document.body){da();return}let t=cn(),e=q.get(t);if(!e){da();return}let n=ln;n?.isConnected||(n=document.createElement("div"),n.id=ma,document.body.appendChild(n),ln=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>Kc?`${e.text.slice(0,Kc)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Vp()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Up(t)}),a.append(s,l),n.append(r,o,a),Jc(n)}function Yp(){if(!O)return;if(O.ticks-=1,q.get(O.key)&&Zc()>O.turns){let e=Gp();if(e&&e===O.text){gr.debug("native send leaked; dropping pending"),q.delete(O.key),F===O.key&&(F=""),O=null,ie();return}}O.ticks<=0&&(O=null)}function Xp(t){if(!Ft||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||ae)return;let e=Vc(t.target)??Vc(document.activeElement);if(!e||!D())return;if(t.altKey||yt){yt=!1;return}if(!mt(e))return;let n=un(tt(e));n&&(fa(t),pa(n))}function Zp(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||P(e))return null;let n=t.closest(Ke);if(n instanceof HTMLElement&&!P(n))return n;let r=te();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Jp(t){if(!Ft)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${ma}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&P(n)||ae||!D()||!Zp(e))return;if(yt){yt=!1;return}let r=U();if(!r||!mt(r))return;let o=un(tt(r));o&&(fa(t),pa(o))}function Qp(t){if(!Ft)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(mo)&&!e.querySelector(St)||ae||!D())return;if(yt){yt=!1;return}let n=U()??e.querySelector(St);if(!n||!mt(n))return;let r=un(tt(n));r&&(fa(t),pa(r))}var Qc=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Uc,cleanupSelectors:[`#${ma}`],settings:Xc,start(){Ft=!0,ht=cn(),F="",ae=!1,yt=!1,O=null,w(Uc,Gc),mr?.abort(),mr=new AbortController;let{signal:t}=mr;window.addEventListener("keydown",Xp,{capture:!0,signal:t}),document.addEventListener("click",Jp,{capture:!0,signal:t}),document.addEventListener("submit",Qp,{capture:!0,signal:t}),Bo?.(),Bo=W({onFall(e){if(Ft){if(e.userStopped||e.error){F="",ie();return}F=e.contextKey,Yc(e.contextKey)}},onContext(e){Wc(e),ht=e,ie()},onTick(e){Wc(e.contextKey),ht=e.contextKey,Yp(),F&&F===e.contextKey&&Yc(F),ln&&Jc(ln)}}),ie(),gr.debug("watch started")},stop(){Ft=!1,Bo?.(),Bo=null,mr?.abort(),mr=null,clearTimeout(pr),pr=void 0,clearTimeout(fr),fr=void 0,q.clear(),O=null,F="",ae=!1,yt=!1,da()}});var tu=`.bloom-cls {
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
`;var ru=new E("ChatListStatus"),eu="chatListStatus",_o="bloom-cls",eg="bloom-cls",ng=1200*1e3,rg="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Ht=new Map,Rt=!1,dn="",qt=!1,at=0,se=null,ha=null,mn=null,ga=null,Do=null,br=null,fn=!1,pn=new Set;function $o(){return Date.now()}function ou(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function Ce(t,e,n,r=!0){if(!(!t||!Rt)){if(e==="idle")Ht.delete(t);else{let o=Ht.get(t);o&&o.kind===e&&n!=="net"?o.at=$o():Ht.set(t,{kind:e,at:$o(),source:n})}r&&og({v:1,id:t,kind:e,at:$o()}),gn()}}function og(t){try{mn?.postMessage(t)}catch{}}function ig(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||Ce(e.id,e.kind,"bc",!1)}function ag(){let t=$o();for(let[e,n]of Ht)n.kind==="streaming"&&t-n.at>ng&&Ht.delete(e)}function sg(){let t=ou();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(rg))continue;let o=Ve(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function nu(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function ba(t){let e=t.querySelector(`:scope > .${_o}`);return e||null}function ya(){if(!Rt)return;ag();let t=R(),e=sg();se?.disconnect();try{for(let n of e){let r=Ve(n.getAttribute("href")||"");if(!r||!t||r!==t){ba(n)?.remove();continue}let i=Ht.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){ba(n)?.remove();continue}let a=ba(n);a||(a=document.createElement("span"),a.className=_o,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(nu("streaming")):i==="error"&&a.appendChild(nu("error")))}}catch(n){ru.debug("paint failed",n)}iu()}function gn(){if(Rt){if(document.hidden){at&&(cancelAnimationFrame(at),at=0),ya();return}at||(at=requestAnimationFrame(()=>{at=0,Rt&&ya()}))}}function iu(){let t=ou();if(!(se&&ha===t&&t?.isConnected)){if(se?.disconnect(),ha=t,!t){se=null;return}se=new MutationObserver(()=>gn()),se.observe(t,{childList:!0,subtree:!0})}}function va(){return!!(be()||Jn())}function lg(t){return!!(fn||t&&pn.has(t)||va())}function cg(t){if(Rt){if(t.type==="post-start"){t.conversationId?(fn=!1,pn.add(t.conversationId),qt=!0,Ce(t.conversationId,"streaming","net")):(fn=!0,qt=!0);return}t.type==="post-end"&&(fn=!1,t.conversationId&&(pn.delete(t.conversationId),Ce(t.conversationId,t.error?"error":"done","net")),va()||(qt=!1))}}function ug(t,e){if(!Rt)return;if(X(e,t)){gn();return}let n=R();if(!(fn||n&&pn.has(n))){if(qt=!1,n&&Ht.get(n)?.kind==="streaming"&&Ht.get(n)?.source==="local"){Ce(n,"idle","local");return}gn()}}function dg(t){if(!Rt)return;let e=t.conversationId||R();if(dn&&e&&dn!==e){let r=Ht.get(dn);r?.kind==="streaming"&&r.source==="local"&&Ce(dn,ft()?"error":"done","local"),qt=!!(e&&pn.has(e))}if(dn=e,lg(e)&&(t.streaming||va())){qt=!0,e&&Ce(e,"streaming","local"),gn();return}qt&&(qt=!1,e&&Ce(e,ft()?"error":"done","local")),gn()}var au=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${_o}`],start(){Rt=!0,w(eu,tu);try{mn=new BroadcastChannel(eg)}catch{mn=null}mn?.addEventListener("message",ig),ga=nt(cg),Do?.(),Do=W({onTick:dg,onContext:ug}),br?.abort(),br=new AbortController,document.addEventListener("visibilitychange",()=>{Rt&&(at&&(cancelAnimationFrame(at),at=0),ya())},{signal:br.signal}),iu(),ru.debug("sidebar status watch started")},stop(){Rt=!1,at&&cancelAnimationFrame(at),at=0,br?.abort(),br=null,se?.disconnect(),se=null,ha=null,Do?.(),Do=null,ga?.(),ga=null;try{mn?.close()}catch{}mn=null,Ht.clear(),pn.clear(),fn=!1,qt=!1,dn="",document.querySelectorAll(`.${_o}`).forEach(t=>t.remove()),x(eu)}});var lu="widerChat",cu=40,uu=96,du=64,mu=S({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:cu,max:uu,default:du}});function mg(){return G(Number(mu.store.width??du),cu,uu)}function su(){let t=mg(),e=`min(100%,${t}rem)`;w(lu,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var fu=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:mu,start:su,onSettingsChange:su,stop(){x(lu)}});var xa="composerOpacity",bn='form[data-type="unified-composer"],form.w-full[data-type]',fg=[`${bn} [class*="corner-superellipse"]`,`${bn} [class*="bg-token-bg-primary"]`,`${bn} [class*="bg-token-main-surface"]`].join(","),pg=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),gg="#thread-bottom-container,#thread-bottom",bg=`${bn} #prompt-textarea,${bn} [contenteditable="true"]`,hg="var(--bg-primary,var(--main-surface-primary,#ffffff))",wa=S({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function yg(){return G(Number(wa.store.opacity??100),0,100)}function vg(){return G(Number(wa.store.blur??16),0,40)}function pu(){let t=yg();if(t>=100){x(xa);return}let e=vg(),n=`color-mix(in srgb,${hg} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(xa,`${gg}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${pg}{display:none!important}${bn}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${fg}{background-color:${n}!important;background-image:none!important;${r}}${bg}{background-color:transparent!important;background-image:none!important}`)}var gu=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:wa,start:pu,onSettingsChange:pu,stop(){x(xa)}});var bu=`#bloom-bn-host {
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
    gap: 0;
    width: 2.5rem;
    max-height: var(--bloom-bn-cap, min(70vh, 28rem));
    padding: 8px 0;
    box-sizing: border-box;
    overflow: hidden;
}

.bloom-bn-tick {
    appearance: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 2.5rem;
    height: calc(1rem + 2px);
    margin: 0;
    padding: 0 0.25rem;
    border: 0;
    background: transparent;
    cursor: pointer;
}

.bloom-bn-tick::after {
    content: "";
    display: block;
    width: 1.25rem;
    height: 2px;
    flex: none;
    border-radius: 0.125rem;
    background: color-mix(in srgb, var(--text-primary, #0d0d0d) 40%, transparent);
    box-shadow: none;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.bloom-bn-tick.bloom-bn-current::after {
    width: 1.75rem;
    height: 2px;
    background: color-mix(in srgb, var(--text-primary, #0d0d0d) 83%, transparent);
    box-shadow: 0 0 3px color-mix(in srgb, var(--text-primary, #0d0d0d) 83%, transparent);
    opacity: 1;
}

.bloom-bn-dense .bloom-bn-tick {
    height: calc(0.375rem + 2px);
}

.bloom-bn-tick-live::after {
    width: 1.25rem;
    height: 0;
    background: none;
    border-radius: 0;
    box-shadow: none;
    border-top: 1px dashed color-mix(in srgb, var(--text-primary, #0d0d0d) 40%, transparent);
    opacity: 1;
}

.bloom-bn-tick-live.bloom-bn-current::after {
    width: 1.75rem;
    height: 0;
    background: none;
    border-top-color: color-mix(in srgb, var(--text-primary, #0d0d0d) 83%, transparent);
    box-shadow: none;
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
`;var wg=new E("BetterNavigator"),Ea="betterNavigator",hu="bloom-bn-host",La=60,Eg=16,Sg=1e3,kg=2.5,Tg=.4,qo="\u6B63\u5728\u8F93\u51FA\u2026",Lg=40,Cg=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,Mg=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Ag=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),Ng=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Ko=S({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),hn=new Map,yn=new Set,vt=!1,Ne=!1,le=null,wr=null,He=null,jo=null,j=[],Re="",zo=0,Go=-1,Ra=0,Uo="",st=0,jt=0,hr,yr=null,Fo=null,Sa=null,ka=null,Me=null,Ca=null,vr=null,Ae=null,vn=null,xr=null;function Vo(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Ta(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function Hg(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function Rg(t){let e=t.getBoundingClientRect(),n=null;try{let i=t.querySelector("[data-message-id]");for(;i&&i!==t;)Cg.test(Hg(i))&&(n=i),i=i.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Ta(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Ta(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Ta(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Pg(t){try{return!!t.closest(Mg)}catch{return!0}}function Ig(t){let e=(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function yu(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(Ag))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(o.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<La+20;)e.push((r.textContent||"").replace(/\s+/g," ").trim());return e.join(" ").replace(/\s+/g," ").trim()}function Og(t,e){try{if(t.querySelector("img, picture, video, canvas"))return"Image";if(t.querySelector("a[download], [class*='attachment']"))return"File";if(t.querySelector("pre, code"))return"Code"}catch{}return`Message ${e+1}`}function Bg(t,e){let n=e==="user"?t.querySelector(".whitespace-pre-wrap")??t:t.querySelector(".markdown")??t;return yu(n)}function Dg(t){return t.length>La?`${t.slice(0,La).trimEnd()}\u2026`:t}function $g(t,e,n,r){let o=Bg(t,e);return o?Dg(o):r?qo:Og(t,n)}function _g(){if(Ne)return!0;let t=R();return!!(t&&yn.has(t)||be()||Jn())}function Fg(t){try{if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming")||t.querySelector("[aria-busy='true'], .result-streaming"))return!0;let e=t.querySelector(".markdown");if((!e||e instanceof HTMLElement&&!yu(e))&&t.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function qg(){let t=Vo();if(!t||t===document.body)return[];let e=Ko.store.showAssistant!==!1,n=e&&_g(),r=[];try{for(let o of t.querySelectorAll("[data-message-id]")){if(Pg(o))continue;let i=o.getAttribute("data-message-id")||"";if(!i)continue;let a=Ig(o);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!e)continue;let s=a==="assistant"&&n&&Fg(o),l=$g(o,a,r.length,s);l&&l!==qo&&l!==hn.get(i)&&hn.set(i,l);let c=s&&l===qo?qo:hn.get(i)||l;r.push({id:i,el:o,role:a,text:c,live:s})}}catch{}return r}function jg(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function vu(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function zg(t){return t===window?window.innerHeight:t.clientHeight}function Gg(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(Ng)}catch{return!1}}function xu(){hr!==void 0&&(clearTimeout(hr),hr=void 0),yr?.classList.remove("bloom-bn-flash"),yr=null}function Ug(t){xu(),t.classList.add("bloom-bn-flash"),yr=t,hr=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),yr===t&&(yr=null),hr=void 0},800)}function Ma(t){if(!j.length)return;let e=Math.max(0,Math.min(t,j.length-1));zo=e,wr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),He?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),jo&&(jo.textContent=`${e+1} / ${j.length}`);let n=He?.children[e];if(n instanceof HTMLElement){let r=He;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function Aa(t){let e=j[t];if(!e?.el.isConnected)return;Go=t,Ra=Date.now()+Sg,Ma(t);let n=vn??vu(e.el),o=Math.abs(e.el.getBoundingClientRect().top-jg())>kg*zg(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),Ko.store.jumpEffect!=="none"&&Ug(e.el)}function Pa(){if(!vt||!j.length)return;if(Date.now()<Ra&&Go>=0){Ma(Go);return}let t=window.innerHeight*Tg,e=0;for(let n=0;n<j.length;n++){let r=j[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Ma(e)}function Kg(t){let e=vu(t);if(vn===e&&xr)return;xr?.(),vn=e;let n=e===window?document:e,r=()=>{Pa(),Ia()};n.addEventListener("scroll",r,{passive:!0}),xr=()=>n.removeEventListener("scroll",r)}function Vg(t){Ae?.disconnect(),Ae=null;let e=vn instanceof HTMLElement?vn:null;Ae=new IntersectionObserver(()=>Pa(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Ae.observe(n.el)}function Wg(){if(!document.body)return null;let t=le;if(t?.isConnected)return t;t=document.createElement("div"),t.id=hu,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),le=t,wr=e,He=i,jo=o,t}function wu(){let t=le,e=Vo();if(!t||!e||!e.isConnected||j.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=Rg(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Lg,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Ia(){!vt||jt||(jt=requestAnimationFrame(()=>{jt=0,vt&&wu()}))}function Yg(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Xg(t){let e=wr,n=He;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Eg),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Yg(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Aa(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=r.role==="user"?"You":"GPT";let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Aa(o)}),n.appendChild(a)}))}function Zg(t){wr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=He?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Jg(){let t=R();return t===Uo?!1:(Uo=t,hn.clear(),j=[],Re="",zo=0,Go=-1,Ra=0,Ne&&t&&(yn.add(t),Ne=!1),!0)}function Qg(t){let e=Ko.store.showAssistant!==!1?"1":"0";return`${Uo}|${e}|${t.map(n=>n.id).join(",")}`}function Na(){if(!vt)return;Jg();let t=qg(),e=Vo();if(!e||t.length<1){j=t,Re="",le&&(le.hidden=!0),Ae?.disconnect(),Ha();return}Wg();let n=Qg(t);n!==Re?(j=t,Re=n,Xg(t),Kg(e),Vg(t)):(j=t,Zg(t)),wu(),Pa(),Ha()}function zt(){if(vt){if(document.hidden){st&&(cancelAnimationFrame(st),st=0),Na();return}st||(st=requestAnimationFrame(()=>{st=0,vt&&Na()}))}}function Ha(){let t=Vo();if(!(Me&&Ca===t&&t?.isConnected)){if(Me?.disconnect(),vr?.disconnect(),Ca=t,!t||t===document.body){Me=null;return}Me=new MutationObserver(()=>zt()),Me.observe(t,{childList:!0,subtree:!0}),vr=new ResizeObserver(()=>Ia()),vr.observe(t)}}function tb(t){if(vt){if(t.type==="post-start"){t.conversationId?(Ne=!1,yn.add(t.conversationId)):Ne=!0,zt();return}if(t.type==="post-end"){if(Ne=!1,t.conversationId)yn.delete(t.conversationId);else{let e=R();e&&yn.delete(e)}zt()}}}function eb(t){if(!vt||!j.length||le?.hidden||t.altKey||t.ctrlKey||t.metaKey||Gg(t.target))return;let e=-1;if(t.key==="ArrowDown")e=zo+1;else if(t.key==="ArrowUp")e=zo-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=j.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Aa(Math.max(0,Math.min(e,j.length-1)))}function nb(){xu(),Ae?.disconnect(),Ae=null,Me?.disconnect(),Me=null,Ca=null,vr?.disconnect(),vr=null,xr?.(),xr=null,vn=null,le?.remove(),le=null,wr=null,He=null,jo=null}var Eu=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Ea,cleanupSelectors:[`#${hu}`],settings:Ko,start(){vt=!0,Uo=R(),w(Ea,bu),Fo=new AbortController;let{signal:t}=Fo;window.addEventListener("keydown",eb,{signal:t}),window.addEventListener("popstate",zt,{signal:t}),window.visualViewport?.addEventListener("resize",Ia,{signal:t}),document.addEventListener("visibilitychange",()=>{vt&&(st&&(cancelAnimationFrame(st),st=0),jt&&(cancelAnimationFrame(jt),jt=0),Na())},{signal:t}),ka=nt(tb),Sa=W({onTick(){zt()},onFall(){zt()},onContext(e,n){X(n,e)||(hn.clear(),Re=""),zt()}}),Ha(),zt(),wg.debug("navigator started")},stop(){vt=!1,st&&cancelAnimationFrame(st),st=0,jt&&cancelAnimationFrame(jt),jt=0,Fo?.abort(),Fo=null,Sa?.(),Sa=null,ka?.(),ka=null,yn.clear(),Ne=!1,nb(),hn.clear(),j=[],Re="",x(Ea)},onSettingsChange(){Re="",zt()}});var Su=`.bloom-ts {
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
`;function ku(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Tu(t){try{return new Date(t).toISOString()}catch{return""}}var Au=new E("MessageTimestamps"),Lu="messageTimestamps",Yo="bloom-ts",Cu=1500,ob="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",xn=S({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),wn=new Map,Ie=!1,lt=0,ce=null,Ba=null,Oa=null,Wo=null,Er=null,Mu=!1;function Nu(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function $a(){let t=xn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Hu(){let t={...$a()};for(let[n,r]of wn)t[n]=r;let e=Object.keys(t);if(e.length>Cu){let n=e.slice(e.length-Cu),r={};for(let o of n)r[o]=t[o];xn.store.stamps=r;return}xn.store.stamps=t}var ib=hs(Hu,500);function Ru(t,e){!t||!e||wn.get(t)===e||(wn.set(t,e),ib(),Pe())}function ab(t){return t?wn.get(t)??$a()[t]??yo(t)??null:null}function sb(t){Ie&&t.type==="message-time"&&Ru(t.messageId,t.createTime)}function lb(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function cb(){let t=Nu();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(ob)||e.push(n)}catch{}return e}function ub(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Da(){if(!Ie)return;let t=xn.store.hideOwnMessages===!0,e=xn.store.showDate!==!1,n=D(),r=cb();ce?.disconnect();try{r.forEach((o,i)=>{let a=o.getAttribute("data-message-id")||"",s=lb(o),l=o.querySelector(`:scope > .${Yo}`);if(t&&s==="user"){l?.remove();return}if(ub(o)){l?.remove();return}let c=ab(a);if(!c&&a&&(n||Mu)&&i>=r.length-2&&(c=Date.now(),Ru(a,c)),!c){l?.remove();return}let u=ku(c,e);if(!u){l?.remove();return}let d=l;d||(d=document.createElement("time"),d.className=Yo,d.setAttribute("aria-hidden","true"),o.insertBefore(d,o.firstChild)),d.textContent!==u&&(d.textContent=u);let f=Tu(c);f&&d.getAttribute("datetime")!==f&&d.setAttribute("datetime",f)})}catch(o){Au.debug("paint failed",o)}Mu=n,Pu()}function Pe(){if(Ie){if(document.hidden){lt&&(cancelAnimationFrame(lt),lt=0),Da();return}lt||(lt=requestAnimationFrame(()=>{lt=0,Ie&&Da()}))}}function Pu(){let t=Nu();if(!(ce&&Ba===t&&t?.isConnected)){if(ce?.disconnect(),Ba=t,!t||t===document.body){ce=null;return}ce=new MutationObserver(()=>Pe()),ce.observe(t,{childList:!0,subtree:!0})}}var Iu=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Yo}`],settings:xn,start(){Ie=!0,w(Lu,Su);let t=$a();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&wn.set(e,n);Oa=nt(sb),Wo?.(),Wo=W({onTick:Pe,onFall:Pe,onContext:Pe}),Er?.abort(),Er=new AbortController,document.addEventListener("visibilitychange",()=>{Ie&&(lt&&(cancelAnimationFrame(lt),lt=0),Da())},{signal:Er.signal}),Pu(),Pe(),Au.debug("timestamp watch started")},stop(){Ie=!1,lt&&cancelAnimationFrame(lt),lt=0,Er?.abort(),Er=null,ce?.disconnect(),ce=null,Ba=null,Wo?.(),Wo=null,Oa?.(),Oa=null,Hu(),wn.clear(),document.querySelectorAll(`.${Yo}`).forEach(t=>t.remove()),x(Lu)},onSettingsChange:Pe});var _a="streamerMode",db="filter:blur(6px)!important;transition:filter .2s ease",mb="filter:none!important",En=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Sn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ct(t,e){return t.map(n=>`${n} ${e}`)}var Oe=S({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function kn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${db}}${e?`${r}{${mb}}`:""}`}function Ou(){let t=[];if(Oe.store.conversations!==!1&&(t.push(kn([...ct(Sn,'a[href^="/c/"]'),...ct(Sn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Oe.store.projects!==!1&&(t.push(kn([...ct(Sn,'a[href*="/project"]'),...ct(Sn,'a[href*="/g/g-p-"]'),...ct(Sn,'[data-testid="project-name"]'),...ct(Sn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Oe.store.headerTitle!==!1&&t.push(kn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Oe.store.accountAvatar!==!1&&t.push(kn([...ct(En,"img"),...ct(En,'[class*="avatar"]'),".bloom-csi-face"],!1)),Oe.store.accountName!==!1&&t.push(kn([...ct(En,".min-w-0 > .truncate"),...ct(En,".min-w-0.flex-1 .truncate"),...ct(En,".bloom-csi-name"),".bloom-csi-name"],!1)),Oe.store.accountEmail!==!1&&t.push(kn([...ct(En,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){x(_a);return}w(_a,t.join(`
`))}var Bu=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Oe,start:Ou,onSettingsChange:Ou,stop(){x(_a)}});var Du=`.bloom-gc-panel {
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
}`;var pb=new E("GreetingCustomizer"),Tn="greetingCustomizer",$u="greetingCustomizerUi",Sr=100,qa=30,gb=120,bb=1e3,hb=50,yb=40,vb=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),kr=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),ti=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function xb(t){return!!t?.closest(vb)}function ju(t){return!!(xb(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Hr(t){try{for(let e of document.querySelectorAll(t))if(!ju(e))return e}catch{}return null}function Fa(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Hr(e))return e;return t}var zu=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],z=S({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Bb},greetings:{type:0,description:"Greeting texts",hidden:!0,default:zu},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Pt=!1,Mn=!1,De=null,Zo,Tr,Ln,Lr,Jo=0,Xo=null,Cn=null,Cr=null,Mr=null,Ar=null,Qo=null;function Ut(){let t=location.pathname||"/";return t==="/"||t===""}function Be(){let t=z.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):zu.slice()}function Nr(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function _u(t){z.store.greetings=t.slice(0,qa)}function Rr(){let t=String(z.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function wb(){return z.store.order==="random"?"random":"sequential"}function Eb(){return G(Number(z.store.intervalSec??10),1,3600)*1e3}function Sb(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function kb(){return!!Hr(ti)}function ei(){return!!(Hr(ti)||Hr(kr))}function Tb(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=kb()?Fa(ti):Hr(kr)?Fa(kr):Fa(ti),i=e?`${kr}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Lb(t,e){if(t<=0)return 0;if(t===1)return Number(z.plain.index)!==0&&(z.store.index=0),Number(z.plain.lastRandom)!==0&&(z.store.lastRandom=0),0;let n=Number(z.plain.index),r=Number(z.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(wb()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return z.store.index=s,z.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return z.store.index=i,i}function Gt(t){if(!Pt)return;if(!Ut()){x(Tn);return}let e=Be().map(Nr).filter(Boolean);if(!e.length){x(Tn);return}let n=Lb(e.length,t),r=e[n]??e[0],o=Rr()==="manual"&&e.length>1;w(Tn,Tb(Sb(r),o)),Qo?.()}function ja(){Zo!==void 0&&(clearInterval(Zo),Zo=void 0)}function za(){ja(),!(!Pt||!Ut())&&Rr()==="interval"&&(Be().filter(Boolean).length<=1||(Zo=setInterval(()=>Gt(!0),Eb())))}function Ga(){Lr!==void 0&&(clearTimeout(Lr),Lr=void 0),Jo=0}function Fu(){if(Ga(),!Pt||!Ut())return;Jo=yb;let t=()=>{if(Lr=void 0,!(!Pt||!Ut())){if(ei()){Rr()==="refresh"&&!Mn?(Mn=!0,Gt(!0)):Gt(!1),za();return}Jo-=1,Jo>0&&(Lr=setTimeout(t,hb))}};t()}function Ua(){if(De===!0){ei()?Gt(!1):Fu();return}De=!0,Mn=!1,Rr()==="refresh"?(Mn=!0,Gt(!0)):Gt(!1),za(),ei()||Fu()}function Ka(){De=!1,Mn=!1,ja(),Ga(),x(Tn)}function ni(){Ln===void 0&&(Ln=window.setTimeout(()=>{Ln=void 0,Pt&&(Ut()?Ua():De!==!1&&Ka())},gb))}function Cb(){Cn||(Cn=history.pushState.bind(history),Cr=history.replaceState.bind(history),Mr=function(...e){let n=Cn(...e);return ni(),n},Ar=function(...e){let n=Cr(...e);return ni(),n},history.pushState=Mr,history.replaceState=Ar)}function Mb(){Mr&&history.pushState===Mr&&Cn&&(history.pushState=Cn),Ar&&history.replaceState===Ar&&Cr&&(history.replaceState=Cr),Cn=null,Cr=null,Mr=null,Ar=null}function Ab(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(ni)}function Nb(t){if(!Pt||!Ut()||Rr()!=="manual"||Be().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(kr);if(!n||ju(n))return;let r=window.getSelection?.();r&&String(r).trim()||Gt(!0)}function Hb(){Tr===void 0&&(Tr=setInterval(()=>{if(!Pt)return;let t=Ut();if(t!==(De===!0)){t?Ua():Ka();return}t&&ei()&&Gt(!1)},bb))}function Rb(){Tr!==void 0&&(clearInterval(Tr),Tr=void 0)}function qu(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var Pb="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Ib="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Ob(t,e){let n=Nr(t);return n?n.length>Sr?`Keep it to ${Sr} characters.`:Be().length+(e?1:0)>qa?`At most ${qa} greetings.`:null:"Enter a greeting."}function Bb(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=Be(),s=Number(z.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Sr,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${Nr(e).length}/${Sr}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Nr(e).length}/${Sr}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let b=document.createElement("div");if(b.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),b.appendChild(m)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let m=n<0,T=Ob(e,m);if(T){r=T,i();return}let A=Nr(e),B=Be().slice();n>=0&&n<B.length?B[n]=A:B.push(A),_u(B),n=-1,e="",r="",i()}),b.appendChild(g),u.append(d,f,b),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let h=document.createElement("div");h.className="bloom-gc-list",a.forEach((m,T)=>{let A=document.createElement("div");A.className="bloom-gc-item",T===s&&(A.dataset.active="true");let B=document.createElement("button");B.type="button",B.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,B.textContent=m,B.addEventListener("click",()=>{o=o===T?-1:T,i()});let It=document.createElement("div");It.className="bloom-gc-item-actions";let wt=qu("Edit",Pb);wt.addEventListener("click",()=>{n=T,e=m,r="",i()});let Y=qu("Delete",Ib);Y.addEventListener("click",()=>{let N=Be().filter((J,Ot)=>Ot!==T);_u(N),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),It.append(wt,Y),A.append(B,It),h.appendChild(A)}),t.appendChild(h)};return Qo=i,i(),()=>{Qo===i&&(Qo=null),t.replaceChildren()}}var Gu=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:$u,settings:z,start(){Pt=!0,w($u,Du),Cb(),Xo=new AbortController;let{signal:t}=Xo;window.addEventListener("popstate",ni,{signal:t}),document.addEventListener("click",Ab,{capture:!0,signal:t}),document.addEventListener("click",Nb,{signal:t}),Hb(),De=null,Ut()?Ua():Ka(),pb.debug("started")},stop(){Pt=!1,Xo?.abort(),Xo=null,Ln!==void 0&&(clearTimeout(Ln),Ln=void 0),ja(),Ga(),Rb(),Mb(),x(Tn),Mn=!1,De=null},onSettingsChange(){Pt&&(Ut()?(Gt(!1),za()):x(Tn))}});var Uu=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Gear-pane crop UI only. Page paint lives in registerStyle(PAGE_STYLE).
 */

.bloom-csi-panel {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.bloom-csi-avatar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
}

.bloom-csi-preview {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    border-radius: 999px;
    object-fit: cover;
    background: var(--bg-secondary, var(--main-surface-secondary, #f9f9f9));
}

.bloom-csi-url {
    flex: 1;
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    height: 32px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.15)));
    background: var(--bg-secondary, var(--main-surface-secondary, #f9f9f9));
    color: var(--text-primary, inherit);
    font: inherit;
    font-size: 0.8125rem;
}

.bloom-csi-url::placeholder {
    color: var(--text-tertiary, #8f8f8f);
}

.bloom-csi-url:focus {
    outline: 2px solid color-mix(in srgb, var(--text-primary, currentColor) 28%, transparent);
    outline-offset: 1px;
}

.bloom-csi-panel .bloom-csi-btn {
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
    flex-shrink: 0;
}

.bloom-csi-panel .bloom-csi-btn:hover:not(:disabled) {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-csi-hint {
    margin: 0;
    font-size: 0.75rem;
    color: var(--text-secondary, #5d5d5d);
}

.bloom-csi-crop {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.bloom-csi-stage {
    position: relative;
    width: 10rem;
    height: 10rem;
    flex-shrink: 0;
    align-self: center;
    overflow: hidden;
    border-radius: 999px;
    cursor: grab;
    touch-action: none;
    background: var(--bg-secondary, var(--main-surface-secondary, #f9f9f9));
    user-select: none;
}

.bloom-csi-stage:active {
    cursor: grabbing;
}

.bloom-csi-stage::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--text-primary, currentColor) 18%, transparent);
    pointer-events: none;
}

.bloom-csi-stage-img {
    position: absolute;
    max-width: none;
    pointer-events: none;
    user-select: none;
}

.bloom-csi-zoom-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
}

.bloom-csi-zoom {
    -webkit-appearance: none;
    appearance: none;
    flex: 1;
    min-width: 0;
    width: 100%;
    height: 16px;
    margin: 0;
    padding: 0;
    background: transparent;
    accent-color: var(--bg-primary-inverted, #fff);
    cursor: pointer;
    pointer-events: auto;
    touch-action: pan-x;
}

.bloom-csi-zoom::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-primary, currentColor) 22%, transparent);
}

.bloom-csi-zoom::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    margin-top: -6px;
    border: 0;
    border-radius: 999px;
    background: var(--bg-primary-inverted, #fff);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--text-primary, currentColor) 18%, transparent);
    cursor: grab;
}

.bloom-csi-zoom:active::-webkit-slider-thumb {
    cursor: grabbing;
}

.bloom-csi-zoom::-moz-range-track {
    height: 4px;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-primary, currentColor) 22%, transparent);
}

.bloom-csi-zoom::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: 0;
    border-radius: 999px;
    background: var(--bg-primary-inverted, #fff);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--text-primary, currentColor) 18%, transparent);
    cursor: grab;
}

.bloom-csi-zoom-val {
    flex-shrink: 0;
    min-width: 2.75rem;
    text-align: right;
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    color: var(--text-secondary, #5d5d5d);
}
`;var Ku=new E("CustomSidebarIdentity"),Vu="customSidebarIdentityUi",Ju="customSidebarIdentity",$b="bloom-csi-face",_b="bloom-csi-name",Fb=1024,ri=256,Qu=24,td=64,ed=40,Ya=1,Xa=4,ue=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]'],Va=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],C=S({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty keeps the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Xb},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Qu,max:td,default:ed},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function oi(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function qb(){return String(C.store.displayName??"").trim()}function ii(t,e,n,r,o){let i=G(n,Ya,Xa),a=Math.min(t,e)/i,s=G(r,a/2,Math.max(a/2,t-a/2)),l=G(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}async function nd(t){try{return await createImageBitmap(t)}catch{return null}}async function Za(t){try{let e=await fetch(t,t.startsWith("data:")?void 0:{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?nd(await e.blob()):null}catch{return null}}function jb(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Ja(t){let e=Math.min(1,Fb/Math.max(t.width,t.height));return jb(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function zb(t,e,n,r){let{side:o,x:i,y:a}=ii(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=ri,s.height=ri;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,ri,ri);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Gb(t){let e=await nd(t);if(!e)return null;let n=Ja(e);return e.close(),n}async function rd(t,e,n,r){let o=await Za(t);if(!o)return null;let i=zb(o,e,n,r);return o.close(),i}function ts(){C.store.cropX=.5,C.store.cropY=.5,C.store.cropZoom=1}function Wu(){C.store.avatarUrl="",C.store.avatarSource="",ts()}var Yu=0;async function Qa(t){let e=++Yu;ts(),C.store.avatarSource=t;let n=await rd(t,.5,.5,1);return e!==Yu?!1:(n&&(C.store.avatarUrl=n),!!n)}function Pr(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Wa(t){let e=Pr(t);if(!e)return!1;let n=await Gb(e);return n?Qa(n):!1}var ai=!1,si=null;function Ub(){let t=String(C.store.avatarUrl??"").trim();if(!t)return null;if(t.startsWith("data:image/"))return t;try{let{protocol:e}=new URL(t);if(e==="https:"||e==="http:")return t}catch{return null}return null}function xt(t,e){return t.map(n=>`${n} ${e}`)}function Kb(t){return`url(${JSON.stringify(t)})`}function Vb(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Xu(t,e){return`${t}{width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;border-radius:999px!important;object-fit:cover!important;flex-shrink:0!important}`}function Wb(t,e){let n=t.join(","),r=Kb(e),o=t.map(i=>`${i}:not(img)`).join(",");return[`${n}{content:${r}!important;background-image:${r}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important;object-fit:cover!important;border-radius:999px!important}`,`${o}{position:relative!important;overflow:hidden!important}`,`${o}::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${r}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important}`].join("")}function Yb(t,e){let n=t.join(","),r=Vb(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Zu(){if(!ai)return;let t=G(Math.round(oi(C.store.avatarSize,ed)),Qu,td),e=Ub(),n=qb(),r=C.store.applyToMenu!==!1,o=[],i=[...xt(ue,"img"),...xt(ue,'[class*="rounded-full"]'),...xt(ue,'[class*="avatar"]'),"#stage-sidebar-tiny-bar img",'#stage-sidebar-tiny-bar [class*="rounded-full"]'],a=[...xt(ue,".min-w-0 > .truncate"),...xt(ue,".min-w-0.flex-1 .truncate")];r&&(i.push(...xt(Va,"> :first-child img"),...xt(Va,"> :first-child [class*='rounded-full']")),a.push(...xt(Va,"> :first-child .truncate"))),o.push(Xu([...xt(ue,"img"),...xt(ue,'[class*="rounded-full"]'),...xt(ue,'[class*="avatar"]')].join(","),t)),o.push(Xu("#stage-sidebar-tiny-bar img,#stage-sidebar-tiny-bar [class*='rounded-full']",32)),e&&o.push(Wb(i,e)),n&&o.push(Yb(a,n)),w(Ju,o.join(""))}function Xb(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let b=document.createElement("div");b.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,b.appendChild(g);let h=document.createElement("div");h.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(Ya),m.max=String(Xa),m.step="0.05",m.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",h.append(m,T,A);let B=document.createElement("p");B.className="bloom-csi-hint",B.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(b,h,B),t.append(u,d,f);function It(){let p=String(C.store.avatarSource??""),L=String(C.store.avatarUrl??"");return p.startsWith("data:image/")?p:L.startsWith("data:image/")?L:""}function wt(p,L,M){if(!a)return i.x=p,i.y=L,i.zoom=G(M,Ya,Xa),i;let V=ii(a.w,a.h,M,p*a.w,L*a.h);return i.x=V.x/a.w,i.y=V.y/a.h,i.zoom=V.z,i}function Y(){m.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let p=a?ii(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;p&&a&&(g.style.width=`${a.w/p.side*100}%`,g.style.height=`${a.h/p.side*100}%`,g.style.left=`${(.5-p.x/p.side)*100}%`,g.style.top=`${(.5-p.y/p.side)*100}%`)}function N(p=!1){let L=It(),M=String(C.store.avatarUrl??"").trim(),V=!!L;s.hidden=!M&&!L,(L||M)&&(s.src=L||M),document.activeElement!==l&&(l.value=V?"":M),l.placeholder=V?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!L,d.hidden=!(e&&/^https?:\/\//.test(M)&&!L),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",L&&(p&&(i.x=oi(C.store.cropX,.5),i.y=oi(C.store.cropY,.5),i.zoom=oi(C.store.cropZoom,1)),g.getAttribute("src")!==L&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},wt(i.x,i.y,i.zoom),Y()},g.src=L),Y())}function J(p,L,M,V=!1){wt(p,L,M),Y();let as=It(),ss=()=>{C.store.cropX=i.x,C.store.cropY=i.y,C.store.cropZoom=i.zoom,as&&rd(as,i.x,i.y,i.zoom).then(ls=>{ls&&(C.store.avatarUrl=ls)})};r&&clearTimeout(r),V?ss():r=setTimeout(ss,80)}function Ot(p){C.store.avatarUrl=p;let L=p.trim();if(n&&clearTimeout(n),!L){C.store.avatarSource="",ts(),e=!1,N(!0);return}if(L.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Za(L).then(M=>{if(!M)return;let V=Ja(M);M.close(),V&&Qa(V).then(()=>N(!0))})},80);return}if(/^https?:\/\//.test(L)){e=!1,C.store.avatarSource="",n=setTimeout(()=>{Za(L).then(M=>{if(!M){e=!0,N(!0);return}let V=Ja(M);M.close(),V?(e=!1,Qa(V).then(()=>N(!0))):(e=!0,N(!0))})},400);return}e=!1,C.store.avatarSource="",N(!0)}u.addEventListener("paste",p=>{Pr(p.clipboardData)&&(p.preventDefault(),e=!1,Wa(p.clipboardData).then(()=>N(!0)))}),u.addEventListener("dragover",p=>{Pr(p.dataTransfer)&&p.preventDefault()}),u.addEventListener("drop",p=>{Pr(p.dataTransfer)&&(p.preventDefault(),e=!1,Wa(p.dataTransfer).then(()=>N(!0)))}),l.addEventListener("change",()=>Ot(l.value)),l.addEventListener("paste",p=>{Pr(p.clipboardData)&&(p.preventDefault(),e=!1,Wa(p.clipboardData).then(()=>N(!0)))}),l.addEventListener("keydown",p=>{It()&&!l.value&&(p.key==="Backspace"||p.key==="Delete")&&(Wu(),e=!1,N(!0))}),c.addEventListener("click",()=>{Wu(),e=!1,N(!0)}),b.addEventListener("pointerdown",p=>{p.button===0&&(b.setPointerCapture(p.pointerId),o.on=!0,o.px=p.clientX,o.py=p.clientY,o.x=i.x,o.y=i.y)}),b.addEventListener("pointermove",p=>{if(!o.on||!a)return;let L=b.clientWidth;if(!L)return;let{side:M}=ii(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);wt(o.x-(p.clientX-o.px)*(M/L)/a.w,o.y-(p.clientY-o.py)*(M/L)/a.h,i.zoom),Y()}),b.addEventListener("pointerup",()=>{o.on&&(o.on=!1,J(i.x,i.y,i.zoom,!0))}),b.addEventListener("pointercancel",()=>{o.on=!1}),b.addEventListener("wheel",p=>{p.preventDefault(),J(i.x,i.y,i.zoom*(p.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>J(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>J(i.x,i.y,Number(m.value),!0)),A.addEventListener("click",()=>J(.5,.5,1,!0));let is=()=>N(!1);return si=is,N(!0),()=>{si===is&&(si=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var od=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Vu,cleanupSelectors:[`.${$b}`,`.${_b}`],settings:C,start(){ai=!0,w(Vu,Uu),Zu(),Ku.debug("started")},onSettingsChange(){si?.(),ai&&Zu()},stop(){ai=!1,x(Ju),Ku.debug("stopped")}});var An=new E("Bloom"),id=!1,Zb=Date.now(),Jb=[cl,rc,mc,gc,xc,Tc,$c,Fc,zc,Qc,au,fu,gu,Eu,Iu,Bu,Gu,od];function li(t){return new Promise(e=>setTimeout(e,t))}function Qb(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function th(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var sd=8e3,ad=300,eh=250;async function nh(){if(me())return await li(ad),!0;for(;Date.now()-Zb<sd;)if(await li(eh),me())return await li(ad),!0;return me()||gi()}function es(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function rh(){if(es())return!0;let t=Date.now()+sd;for(;Date.now()<t;)if(await li(100),es())return!0;return es()}function oh(){try{GM_registerMenuCommand?.("Bloom++ settings",ll)}catch{}}function ih(){Gr(()=>{Hn("HostShell"),An.info("host shell",Q)}),Ur(()=>{An.info("idle ready",Q)}),Kr(()=>{ui(),Hn("HostReady"),An.info("chrome ready",Q)})}async function ns(){await ys()}async function rs(){if(id)return;id=!0;for(let n of Jb)try{Cs(n)}catch(r){An.error("register failed",n.name,r)}Ns(),Hn("Init"),oh(),ih();let t=()=>Hn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Qb(),ui(),An.info("styles ready",Q),await th(),rh().then(n=>{n&&Vr()}),!await nh()){An.warn("late islands not detected; starting default plugins",Q),qe(),Wr();return}await Bs()}var ld=typeof unsafeWindow<"u"?unsafeWindow:window,ah=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||ah){let t=ld.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Q);try{Object.defineProperty(ld,"Bloom",{value:os,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}ns().then(()=>rs()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
