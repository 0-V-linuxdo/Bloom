// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.95
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
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update.user.js
// ==/UserScript==

/* Bloom++ [20260924] v1.4.95. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var If=Object.defineProperty;var Nf=(t,e)=>{for(var n in e)If(t,n,{get:e[n],enumerable:!0})};var ic={};Nf(ic,{REPO_URL:()=>Pc,Settings:()=>_,VERSION:()=>xt,contextKeyFromUrl:()=>ce,conversationTitle:()=>jn,conversationToken:()=>Rt,currentConversationId:()=>R,hasDraftText:()=>Gt,hasErrorToast:()=>Wt,hasLateIslands:()=>We,init:()=>oc,initSettings:()=>rc,isDocumentInteractive:()=>Bc,isStreaming:()=>K,isUserDraftEmpty:()=>ke,messageCreateTime:()=>Mi,plugins:()=>ae,requestChromeReady:()=>ti,requestIdleReady:()=>Pn,requestShellReady:()=>Qo,setEditorText:()=>le,subscribeHarvest:()=>Et,watchStreamingEdge:()=>ct,whenChromeReady:()=>Jo,whenIdleReady:()=>Zo,whenShellReady:()=>Xo});var ve=new Map,Fo=!1;function Rf(){return document.getElementById("bloom-root")?.shadowRoot??null}function sc(){return document.head??null}function In(){let t=Rf();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Pf()}function Ya(t,e){if(!Fo)return;let n=sc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),In();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,In();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,In()}function k(t,e){let n=ve.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},ve.set(t,n)),Fo&&Ya(t,n)}function Xa(){if(!sc())return!1;Fo=!0;for(let[e,n]of ve)Ya(e,n);return In(),!0}function lc(t){let e=ve.get(t);e&&(e.disabled=!1,Fo&&Ya(t,e))}function cc(t){let e=ve.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),In())}function T(t){let e=ve.get(t);e&&(e.el?.remove(),ve.delete(t),In())}function Pf(){return Array.from(ve.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var M=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function w(t){return t}var Za=new Map;function Nn(t,e){let n=Za.get(t);return n||(n=new Set,Za.set(t,n)),n.add(e),()=>n.delete(e)}function Ke(t,e){let n=Za.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Of="bloompp";function uc(){return new Promise((t,e)=>{let n=indexedDB.open(Of,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function dc(t){try{let e=await uc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function mc(t,e){try{let n=await uc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function rt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function ot(t,e,n){return Math.min(n,Math.max(e,t))}function fc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function pc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function gc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var zo=new M("SettingsStore"),xe="BloomSettings",Bf=100;function jo(t){return t!=null&&typeof t.then=="function"}function Df(t){if(t==null||jo(t))return null;if(rt(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(rt(e)&&!jo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return rt(n)&&!jo(n)?n:null}return null}catch{return null}}function Uo(t){let e=Df(t);if(!e)return null;let n=e.plugins;return!rt(n)||jo(n)||Object.keys(n).length===0?null:e}function Qa(t){return rt(t)?t:null}function Ja(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:rt(t)?Object.keys(t).length===0:!1}function qf(t){return Ja(t)?0:Array.isArray(t)?12+Math.min(t.length,40):rt(t)?12+Math.min(Object.keys(t).length,40):3}function Ve(t){if(!t)return-1;let e=t.plugins;if(!rt(e))return-1;let n=0;for(let r of Object.values(e)){let o=Qa(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=qf(a))}return n}function bc(t){let e=t.plugins;if(!rt(e))return 0;let n=0;for(let r of Object.values(e))Qa(r)?.enabled===!0&&n++;return n}function hc(t){let e=t.map((i,a)=>({bag:i,index:a,score:Ve(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=bc(a.bag)-bc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!rt(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(rt(a))for(let[s,l]of Object.entries(a)){let c=Qa(l);if(!c)continue;if(!rt(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,m]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&m===!0&&(u.enabled=!0);continue}Ja(u[d])&&!Ja(m)&&(u[d]=structuredClone(m))}}}let o=r.Settings;return rt(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Ve(n)}}var Go=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let m=u(d);m!==void 0&&(i[a]=m,s=m);break}}}return rt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){zo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Bf))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(xe,this.plain)}catch{try{GM_setValue(xe,e)}catch(n){zo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(xe,e)}catch{}mc(xe,e).catch(n=>zo.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){zo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){fc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var $f=new M("Settings"),_f={plugins:{}},_=new Go(structuredClone(_f)),Ff=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function zf(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function C(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?Ee(n):{}},get plain(){let n=e.pluginName;return n?_.plain.plugins[n]??{}:{}}};return e}async function jf(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function yc(){let t=Uo(await jf(xe)),e=Uo(await dc(xe)),n=null;try{n=Uo(localStorage.getItem(xe))}catch{n=null}let r=hc([t,e,n]);if(r){let o=r.bag.plugins;o&&(_.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);$f.info("Loaded settings from",i,"richness",r.score,"gm",Ve(t),"idb",Ve(e),"ls",Ve(n))}_.releasePersist(),r&&(r.index!==0||r.score>Ve(t))&&_.persistLoadedBag()}function Ee(t){return _.plain.plugins[t]||(_.plain.plugins[t]={}),_.store.plugins[t]}function vc(t,e){e&&(e.pluginName=t,Ee(t),_.setDefaultGetter(Ff(t),n=>{if(n!=="enabled")return zf(e.def,n)}))}function xc(){return Ee("Settings")}function Ko(){return xc().pinnedPlugins??[]}function Ec(t){return Ko().includes(t)}function wc(t){let e=Ko(),n=e.includes(t);return _.store.plugins.Settings={..._.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function Vo(){return xc().starredPlugins??[]}function Sc(t){return Vo().includes(t)}function Lc(t){let e=Vo(),n=e.includes(t);return _.store.plugins.Settings={..._.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var Wo=new M("PluginManager"),ae={},Mr=new Set;function Tc(t){if(ae[t.name]){Wo.warn("Duplicate plugin",t.name);return}ae[t.name]=t,vc(t.name,t.settings)}function Rn(t){let e=ae[t];if(!e)return!1;if(e.required)return!0;let n=_.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function kc(t){let e=ae[t];if(!e||e.required)return;let n=!Rn(t);Ee(t),_.store.plugins[t].enabled=n,n?Mc(e):Gf(e),Ke("pluginToggle",{name:t,enabled:n})}function Mc(t,e=!1){if(!Mr.has(t.name)&&Rn(t.name))try{t.managedStyle&&lc(t.managedStyle),t.start?.(),Mr.add(t.name),t.settings&&_.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Mr.has(t.name)&&t.onSettingsChange?.()}),e||Wo.debug("Started",t.name)}catch(n){Wo.error("Failed to start",t.name,n)}}function Gf(t){if(Mr.has(t.name)){try{t.stop?.()}catch(e){Wo.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(cc(t.managedStyle),T(t.managedStyle)),Mr.delete(t.name)}}function Cr(t){for(let e of Object.values(ae))(e.startAt??"DOMContentLoaded")===t&&Mc(e)}var Ar=!1,Yo=!1,ts=!1,Ac=[],Hc=[],Ic=[];function es(t){let e=t.splice(0);for(let n of e)n()}function Hr(){Ar||(Ar=!0,es(Ac))}function ns(){Yo||(Yo=!0,Ar||Hr(),es(Hc))}function Nc(){ts||(ts=!0,Ar||Hr(),Yo||ns(),es(Ic))}function Xo(t){Ar?t():Ac.push(t)}function Zo(t){Yo?t():Hc.push(t)}function Jo(t){ts?t():Ic.push(t)}function Qo(){Hr()}function Pn(){Hr(),ns()}function ti(){Nc()}function Cc(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Rc(){await Cc(4e3),Hr(),await Cc(4e3),ns(),Nc()}var S={p:"0-V-linuxdo"},xt="[20260924] v1.4.95",Pc="https://github.com/0-V-linuxdo/Bloom";var Uf={BetterNavigator:1790240385e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789969779e3,ComposerOpacity:1789969779e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789969779e3,InputHistory:1789969779e3,MessageTimestamps:1790230458e3,NoDictation:1789969779e3,NoShareLink:1789969779e3,NoSidebarIdentity:1789969779e3,PromptQueue:1790250799e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789969779e3,WiderChat:1789969779e3};function Oc(t){let e=Uf[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function Kf(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Vf(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function rs(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function We(){return rs()?Kf()||Vf():!1}function Bc(){return We()}var Wf=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Dc=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Yf=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Xf="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Bn(t){return t.id==="bloom-root"||!!t.closest(Xf)}function qc(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function ei(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function os(t){if(!(t instanceof HTMLElement)||!t.isConnected||Bn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&ei(e)?!1:t.getClientRects().length>0}function On(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Zf(){let t=[];for(let e of document.querySelectorAll(Wf))!(e instanceof HTMLElement)||!e.isConnected||Bn(e)||t.push(e);return t}function ni(t){if(!t.isConnected||Bn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Ye(){return Zf().filter(ni)[0]??null}function Dn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Bn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function is(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Bn(n)&&!On(n)&&n.parentElement&&!On(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!On(r)&&!Bn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!On(r.parentElement))return r}return e}function qn(){let t=document.querySelectorAll(Dc);for(let n of t)if(os(n)&&!ei(n)&&qc(n))return n;let e=document.querySelectorAll(Yf);for(let n of e){if(!os(n)||!qc(n)||ei(n))continue;let r=n.querySelector(Dc);return os(r)&&!ei(r)?r:n}return null}function ri(){let t=Ye();if(t){let e=is(t),n=e.parentElement;if(n&&!On(n))return n;if(!On(e))return e}return Dn()}function oi(t){let e=Ye();return e?t.composedPath().includes(e):!1}var ss=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Jf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Qf(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function tp(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function as(t){let e=Qf(t);return e?tp(e)>.55?"light":"dark":null}function ep(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=as(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=as(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=as(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function ii(t){return t==="auto"?ep():t}function np(t){try{let e=getComputedStyle(document.documentElement);for(let n of ss){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function ai(t,e,n){let r=Jf[e];if(n){np(t);for(let o of ss)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of ss)t.style.setProperty(o,r[o])}function $c(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var ls=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
  align-items: center;
  text-align: left;
  margin: 0;
  padding-right: 2.5rem;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  flex: 1;
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

.bloom-settings-title-row {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: var(--text-primary, inherit);
}

.bloom-info-hint {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--text-secondary, #5d5d5d);
  cursor: default;
}

.bloom-info-hint svg {
  width: 1rem;
  height: 1rem;
  pointer-events: none;
}

.bloom-info-hint:hover,
.bloom-info-hint:focus-visible {
  color: var(--text-primary, inherit);
}

.bloom-info-hint-tip {
  display: none;
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: max-content;
  max-width: 16rem;
  padding: 0.375rem 0.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
  background: var(--bg-primary, #fff);
  color: var(--text-primary, inherit);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  text-align: left;
  white-space: normal;
  pointer-events: none;
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.12));
}

.bloom-info-hint:hover .bloom-info-hint-tip,
.bloom-info-hint:focus-visible .bloom-info-hint-tip {
  display: block;
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

.bloom-settings-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 10;
}

.bloom-plugin-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.125rem;
  margin: 0;
  border-bottom: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
}

.bloom-plugin-tab {
  position: relative;
  margin: 0;
  padding: 0.375rem 0.75rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--text-secondary, #5d5d5d);
  font: inherit;
  font-size: 0.8125rem;
  cursor: pointer;
}

.bloom-plugin-tab:hover {
  color: var(--text-primary, inherit);
  background: transparent;
}

.bloom-plugin-tab-active {
  color: var(--text-primary, inherit);
  background: transparent;
}

.bloom-plugin-tab-active::after {
  content: "";
  position: absolute;
  inset-inline: 0.5rem;
  bottom: -1px;
  height: 2px;
  border-radius: 1px;
  background: var(--text-primary, currentColor);
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
`;var op="bloom-root",zt="bloom-rail-item",di="bloom-account-item",Ze="bloom-sidebar-panel",$r="bloom-plugin-dialog",yi="bloom-plugin-layer",mi="bloom-settings-css",ip=2e3,zc=null,ap=null,Te=!1,ms=[],si=null,fi=null,Se=null,ci=null,se=null,Br=null,Ir,$n=0,Dr=0,Nr=0,Rr=null,Pr=null,pi=null,jc=null,Or=null,cs=[],gi=!1,sp=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],lp=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],cp=new Set(["chat","ui","privacy"]),up=10080*60*1e3,vi="",qr="all",Ft="all";function xi(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Gc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function dp(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function mp(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function fp(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function pp(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var gp={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function bp(t){return t.icon||gp[t.name]||xi()}function us(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),ai(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Uc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function bi(){let t="auto",e=ii(t);us(zc,e,!0);let n=document.getElementById(Ze);n instanceof HTMLElement&&us(n,e,!0);let r=document.getElementById($r);r instanceof HTMLElement&&us(r,e,!0);let o=document.getElementById(zt);o instanceof HTMLElement&&Uc(o),Ke("schemeChange",{scheme:e,pref:t})}function Kc(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Vc(){if(k("settings",ls),document.getElementById(mi)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=mi,t.textContent=ls,document.head.appendChild(t)}function hp(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function yp(){for(let t of ms)t();ms=[]}function Wc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function vp(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function gs(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function xp(t){return gs(t).length>0}function ui(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Ep(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=vp(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function wp(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Ep(e,n));let i=Ee(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ms.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??ui(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??ui(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Wc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??ui(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function _c(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Sp(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=Ee(t.name);for(let[n,r]of gs(t)){if(n==="enabled"||r.type===5)continue;let o=ui(r);o!==void 0&&(e[n]=o)}Xc(t)}function Yc(t){t.key==="Escape"&&(!document.getElementById(yi)&&!document.getElementById($r)||(t.stopPropagation(),_n()))}function Lp(){gi||(document.addEventListener("keydown",Yc),gi=!0)}function Tp(){gi&&(document.removeEventListener("keydown",Yc),gi=!1)}function _n(){yp(),Tp(),document.getElementById(yi)?.remove(),document.getElementById($r)?.remove()}function Xc(t){if(_n(),!document.body)return;let e=document.createElement("div");e.id=yi,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Le),e.addEventListener("pointerup",Le),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&_n()});let n=document.createElement("div");n.id=$r,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Le),n.addEventListener("pointerup",Le),n.addEventListener("click",Le);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Gc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),_n()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=_c("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=_c("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=gs(t);if(c.length)for(let[u,d]of c){let m=wp(t.name,u,d);m&&l.appendChild(m)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Sp(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Lp(),bi()}function kp(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=bp(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Sc(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=fp(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let f=Lc(t.name);Ke("pluginStar",{name:t.name,starred:f})}),s.appendChild(c),!t.required){let b=Ec(t.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),f.innerHTML=pp(b),f.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();let h=wc(t.name);Ke("pluginPin",{name:t.name,pinned:h})}),s.appendChild(f)}if(xp(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=mp(),b.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Xc(t)}),s.appendChild(b)}let u=Wc(t.name,Rn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{kc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let m=document.createElement("div");m.className="bloom-card-separator";let g=document.createElement("div");g.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",g.appendChild(p),e.append(n,m,g),e}function Zc(){return Object.values(ae).filter(t=>!t.hidden&&t.name!=="Settings")}function Mp(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<up}function Jc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Mp(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>cp.has(r)):n.includes(e)}function Cp(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Ap(){return vi.trim()?"No plugins match your search.":Ft==="favorites"?"No favorites yet. Star a plugin to see it here.":Ft==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Hp(){let t=Zc();return lp.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Jc(n,e.id)))}function Ip(){if(Or){Or.replaceChildren();for(let t of Hp()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Ft===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Ft=t.id,Xe()}),Or.appendChild(e)}}}function Np(){let t=Zc();if(Ft==="favorites"){let e=new Set(Vo());t=t.filter(n=>e.has(n.name))}else Ft!=="all"&&(t=t.filter(e=>Jc(e,Ft)));return qr==="enabled"&&(t=t.filter(e=>Rn(e.name))),qr==="disabled"&&(t=t.filter(e=>!Rn(e.name))),t}function Xe(){if(!Rr)return;Ip();let t=Np();pi&&(pi.placeholder=`Search ${t.length} plugins...`);let e=t,n=vi.trim().toLowerCase();if(n&&(e=e.filter(r=>Cp(r).includes(n))),Ft==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Ft!=="favorites"){let r=Ko();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Rr.replaceChildren();for(let r of e)Rr.appendChild(kp(r));Pr&&(Pr.hidden=e.length>0,Pr.textContent=Ap())}function Le(t){t.stopPropagation()}function ds(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function bs(){document.getElementById(zt)?.setAttribute("aria-expanded",Te?"true":"false")}function Rp(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function hs(){_n(),vi="",qr="all",Ft="all",document.getElementById(Ze)?.remove(),Te=!1,bs()}function Pp(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Le),e.addEventListener("pointerup",Le),e.addEventListener("click",Le);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=xi();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=dp();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Gc(),d.addEventListener("click",hs),r.appendChild(o),n.appendChild(r);let m=document.createElement("div");m.className="bloom-plugin-tabs",n.appendChild(m);let g=document.createElement("div");g.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{vi=p.value,Xe()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let h of sp){let x=document.createElement("option");x.value=h.value,x.textContent=h.label,b.appendChild(x)}b.value=qr,b.addEventListener("change",()=>{qr=b.value,Xe()}),g.append(p,b),n.appendChild(g);let f=document.createElement("div");f.className="bloom-plugin-list",n.appendChild(f);let E=document.createElement("p");return E.className="bloom-tab-empty",E.hidden=!0,n.appendChild(E),e.append(d,n),Rr=f,Pr=E,pi=p,jc=b,Or=m,Xe(),e}function Op(t){t.classList.add("bloom-rail-dock")}function Bp(){let t=document.getElementById(zt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&ni(t)?t:null}function Dp(){if(document.getElementById(Ze)?.remove(),!document.body)return;let t=Pp(Ze);Op(t),document.body.appendChild(t),Te=!0,_n(),bi(),bs(),Ke("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:xt,dock:"center",rail:!!Bp()})}function ys(){let t=document.getElementById(Ze);if(t instanceof HTMLElement&&t.isConnected&&Rp(t)){hs();return}t?.remove(),Dp()}function qp(){let t=document.createElement("button");return t.type="button",t.id=zt,t.className="bloom-rail-item",t.setAttribute("aria-controls",Ze),t.setAttribute("aria-expanded",Te?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${xi()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ys()}),t}function Fc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function $p(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function _p(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function we(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Qc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=$p(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&we(t,"padding-top",Math.round(i)),Number.isFinite(a)&&we(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));we(n,"width",l),we(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&we(t,"padding-left",u);let d=_p(e,r);if(d){let m=d.getBoundingClientRect(),g=n.getBoundingClientRect(),p=Math.round(m.left-g.right);p>=0&&p<=24&&we(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&we(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&we(t,"gap",Math.round(l))}Uc(t)}function fs(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Fp(){if(Br?.isConnected&&se){se.observe(Br,{childList:!0});return}ps()}function zp(t){if(fs(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function jp(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Nr=0;return}Nr+=1,Dr=Date.now()+Math.min(8e3,250*2**Math.min(Nr,5))})}function Gp(){$n||Date.now()<Dr||($n=requestAnimationFrame(()=>{$n=0,!(Date.now()<Dr)&&(document.getElementById(zt)?.isConnected||hi())}))}function hi(){if(!document.body)return;se?.disconnect();let t=null,e=!1;try{let n=document.getElementById(zt);t=n instanceof HTMLButtonElement?n:qp();let r=Ye(),o=Dn();if(r){let i=is(r),a=i.parentElement;if(fs(i)||a&&fs(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Fc(t),Qc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Fc(t,!0)):t.isConnected&&!ni(t)&&(t.remove(),t=null)}finally{jp(t,e),Fp(),bs()}}function ps(){let t=ri();!t||!zp(t)||Br===t&&se||(se?.disconnect(),Br=t,se=new MutationObserver(()=>{document.getElementById(zt)?.isConnected||Gp()}),se.observe(t,{childList:!0}))}function Up(){hi(),ps(),Ir===void 0&&(Ir=window.setInterval(()=>{let t=document.getElementById(zt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Dr&&hi();else{Nr=0;let e=Ye();e&&Qc(t,e)}ps()},ip))}function Kp(){Ir!==void 0&&(clearInterval(Ir),Ir=void 0),$n&&cancelAnimationFrame($n),$n=0,Dr=0,Nr=0,se?.disconnect(),se=null,Br=null}function Vp(t){ci===t&&Se||(Se?.disconnect(),ci=t,Se=new MutationObserver(()=>{if(!t.isConnected){Se?.disconnect(),Se=null,ci=null;return}tu(t)}),Se.observe(t,{childList:!0}))}function tu(t){if(Vp(t),t.querySelector(`#${di}`))return;let e=document.createElement("button");e.type="button",e.id=di,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${xi()}<span>Bloom++</span>`,e.addEventListener("pointerdown",ds),e.addEventListener("pointerup",ds),e.addEventListener("click",n=>{ds(n),ys()}),t.insertBefore(e,t.firstChild)}function li(){let t=qn();return t?(tu(t),!0):!1}function Wp(t){oi(t)&&(queueMicrotask(li),requestAnimationFrame(()=>{li()}),window.setTimeout(li,60),window.setTimeout(li,180))}function Yp(){fi?.abort();let t=new AbortController;fi=t,document.addEventListener("click",Wp,{signal:t.signal})}function Xp(){fi?.abort(),fi=null,Se?.disconnect(),Se=null,ci=null}function eu(){Pn(),hp(()=>{Vc(),Kc(),hi(),ys()})}var nu=w({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${op}`,`#${zt}`,`#${di}`,`#${Ze}`,`#${yi}`,`#${$r}`,`#${mi}`,"#bloom-menu-panel"],start(){Vc(),Kc(),Up(),Yp(),si?.(),si=$c(bi),bi(),cs=[Nn("pluginToggle",()=>{Te&&Xe()}),Nn("pluginPin",()=>{Te&&Xe()}),Nn("pluginStar",()=>{Te&&Xe()})]},stop(){Kp(),Xp(),si?.(),si=null;for(let t of cs)t();cs=[],hs(),document.getElementById(zt)?.remove(),document.getElementById(di)?.remove(),document.getElementById(mi)?.remove(),zc=null,ap=null,Rr=null,Pr=null,pi=null,jc=null,Or=null,Te=!1}});var Ei='form[data-type="unified-composer"], form.w-full[data-type]',jt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Fn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),ru=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),ou=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Zp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Jp='[contenteditable="false"], button, [role="button"]';function It(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Je(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!It(o)))return o;return null}function iu(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function F(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=iu(t);return!!(Zp.test(n)||/^stop$/i.test(n))}function Nt(){let e=Array.from(document.querySelectorAll(Ei)).find(It);if(e instanceof HTMLElement)return e;let n=Je(document,jt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function it(){let t=Array.from(document.querySelectorAll(jt));return t.find(It)??t[0]??null}function Qp(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Jp);return!!n&&n!==e&&e.contains(n)}function vs(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Qp(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Gt(t){let e=t??it();return e?vs(e,e).replaceAll("\u200B","").trim().length>0:!1}function ke(t){return!Gt(t)}function wi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function au(t){let e=Nt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!It(n))&&t(n))return n;return null}function Me(){let t=Nt(),e=Je(t,Fn)??Je(document,Fn);return e&&!F(e)?e:au(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!F(n);let o=iu(n);return/^(send|send prompt|发送)$/i.test(o)&&!F(n)})}function Qe(){let t=Nt(),e=Je(t,ru,!0)??Je(document,ru,!0);if(e)return e;let n=Je(t,ou)??Je(document,ou);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&It(r)&&F(r))return r}return au(F)}function Ut(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>vs(n,t)).join(`
`):vs(t,t)}function xs(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function le(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),xs(t,n)}var su=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Rt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function ce(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ue(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(su)?.[1]??""}catch{return t.match(su)?.[1]??""}}function R(){return ue(location.pathname)}var du=new M("Harvest"),tg=1500,eg=200,Si=new Set,Li=new Map,Ti=new Map,zn=null,ki=null,_r=null,Kt=0;function ng(){return typeof unsafeWindow<"u"?unsafeWindow:window}function rg(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function og(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function mu(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var ig=/"action"\s*:\s*"(next|continue|variant)"/i;function ag(t,e,n){return!(e!=="POST"||mu(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!ig.test(n))}function sg(t,e){return e!=="GET"||mu(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function lu(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function fu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function lg(t){return typeof t=="string"?fu(t):""}function Es(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Es(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function pu(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function cu(t,e,n){!t||!e||Ti.get(t)!==e&&(Ti.set(t,e),pu(Ti,tg),Ce({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function cg(t,e){let n=e.trim();!t||!n||Li.get(t)!==n&&(Li.set(t,n),pu(Li,eg),Ce({type:"conversation-meta",conversationId:t,title:n}))}function Fr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Fr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&cg(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Es(l.create_time??l.createTime??l.created_at);c&&u&&cu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Es(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&cu(a,s,o),r.mapping&&typeof r.mapping=="object")Fr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Fr(l,o,n+1)}function uu(t,e){if(t)try{Fr(JSON.parse(t),e)}catch{}}function Ce(t){for(let e of Array.from(Si))try{e(t)}catch{}}async function ug(t,e,n){if(n===Kt)try{let r=await t.json();if(n!==Kt)return;Fr(r,e)}catch{}}async function dg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Kt&&Ce({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Kt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let g=fu(c);g&&(o=g,Ce({type:"post-start",conversationId:o,url:""}))}let m=c.split(`
`);c=m.pop()??"";for(let g of m){let p=g.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||uu(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Kt&&uu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Kt&&Ce({type:"post-end",conversationId:o,error:i})}function mg(t,e,n){let r=rg(e),o=og(e,n),i=sg(r,o),a=ag(r,o,n?.body),s=Kt,l="";return a&&(l=lg(n?.body)||lu(r)||ue(r)||R(),Ce({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Kt||!i&&!a)return c;try{let u=c.clone();i?ug(u,lu(r)||R(),s):dg(u,l,!c.ok,s)}catch{a&&Ce({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Kt&&Ce({type:"post-end",conversationId:l,error:!0}),c})}function fg(){if(zn)return;let t=ng();_r=t,zn=t.fetch.bind(t);let e=(n,r)=>mg(zn,n,r);ki=e,t.fetch=e,du.debug("conversation fetch harvest hooked")}function pg(){Kt+=1,!(!zn||!_r)&&(ki&&_r.fetch===ki&&(_r.fetch=zn),zn=null,ki=null,_r=null,du.debug("conversation fetch harvest unhooked"))}function Et(t){return Si.add(t),fg(),()=>{Si.delete(t),Si.size===0&&pg()}}function jn(t){return t?Li.get(t)??"":""}function Mi(t){return t?Ti.get(t)??null:null}var bu=new M("Streaming");function Kr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!It(e))&&(F(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function gg(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&It(t))}function bg(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&It(t))}function hg(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Wt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function K(){if(Qe()||Kr()||hg())return!0;let t=Me();return t&&It(t)&&!F(t)?!1:!!(gg()||bg())}var yg=400,gu=3,rn=new Set,zr,jr=null,ws=null,en=!1,tn=0,He="",Ie="",Ne=!1,Gr=!1,Ur=!1,Vt=!1,Z=null,wt="",nn=!1;function z(){return Vt}function on(){return Ne}function Gn(){return wt}function Ss(){return R()||wt}function hu(){return ce(Rt())}function Ci(t,e){return{streaming:t,contextKey:e,conversationId:Ss()}}function Ls(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function vg(t){return!t||t==="/"||t.startsWith("/g/")}function V(t,e){if(!t||t===e)return!1;let n=ue(Ls(e)||e);return!n||!(t.endsWith("|draft")||vg(Ls(t)))?!1:wt?n===wt:nn}function Ai(){en=!1,tn=0,He="",Ne=!1,Gr=!1,Ur=!1,wt="",nn=!1}function xg(t){for(let e of Array.from(rn))try{e.onFall?.(t)}catch{}}function Eg(t){for(let e of Array.from(rn))try{e.onRise?.(t)}catch{}}function Ae(t){for(let e of Array.from(rn))try{e.onTick?.(t)}catch{}}function wg(t,e){for(let n of Array.from(rn))try{n.onContext?.(t,e)}catch{}}function Sg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&F(n)&&(Ne=!0)}function Lg(t){if(t.type==="post-start"){let n=R();if(!t.conversationId){n||(nn=!0),(!n||n===wt)&&(Vt=!1,Ne=!1);return}if(!(t.conversationId===n||t.conversationId===wt)&&!(!n&&nn))return;wt=t.conversationId,nn=!1,Vt=!1,Ne=!1;return}if(t.type!=="post-end"||!en&&!Z)return;let e=R();t.conversationId&&!(e?t.conversationId===e:t.conversationId===wt)||(Ur=!0,t.error&&(Gr=!0,Z&&(Z.error=!0)))}function Tg(){let t=hu(),e=K();if(Ie&&t&&Ie!==t){let o=Ie;if(!V(o,t))Z=null,Ai(),Vt=e;else{let i=ue(Ls(t));if(i&&!wt&&(wt=i,nn=!1),He===o&&(He=t),Z&&Z.contextKey===o){Z.contextKey=t;let a=Ss();a&&(Z.conversationId=a)}Vt=!1}if(Ie=t,wg(t,o),Vt){Ae(Ci(!1,t));return}}else t&&(Ie=t);if(Vt){if(e){Ae(Ci(!1,t));return}Vt=!1}if(Z)if(e||Z.contextKey!==t)Z=null;else{let o=Z;Z=null,Ai(),xg(o),Ae(Ci(!1,t));return}let n=Ci(e,t);if(e){let o=!en;o&&(Ne=!1,Gr=!1,Ur=!1),en=!0,tn=0,He=t,o&&Eg(n),Ae(n);return}if(!en){Ae(n);return}if(tn+=1,Ur&&(tn=Math.max(tn,gu)),tn<gu){Ae(n);return}if(!(!!He&&He===t)){Ai(),Ae(n);return}Z={contextKey:He||t,conversationId:Ss(),userStopped:Ne,error:Gr||Wt()},Ae(n)}function kg(){zr===void 0&&(en=K(),Ie=hu(),He=en?Ie:"",tn=0,Ne=!1,Gr=!1,Ur=!1,Vt=!1,Z=null,wt="",nn=!1,jr?.abort(),jr=new AbortController,document.addEventListener("click",Sg,{capture:!0,signal:jr.signal}),ws=Et(Lg),zr=setInterval(Tg,yg),bu.debug("watchStreamingEdge started"))}function Mg(){rn.size||(zr!==void 0&&(clearInterval(zr),zr=void 0),jr?.abort(),jr=null,ws?.(),ws=null,Ai(),Ie="",Vt=!1,Z=null,bu.debug("watchStreamingEdge stopped"))}function ct(t){let e=typeof t=="function"?{onFall:t}:t;return rn.add(e),kg(),()=>{rn.delete(e),Mg()}}var yu="bloom-host-icon",Vr="data-bloom-host-rel",Ts="not all",ks=0,vu=0,Cg=400;function xu(t){ks+=1;try{t()}finally{ks-=1}}function Hi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Re(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Eu(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Ag(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Hg(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-vu<Cg||(vu=n,t.appendChild(e))}function Ig(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Hi(n)&&(n.getAttribute(Vr)||n.setAttribute(Vr,n.rel),n.media!==Ts&&(n.media=Ts),n.rel!==yu&&(n.rel=yu))}function Ng(t){for(let e of t.querySelectorAll(`link[${Vr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Vr);n&&(e.rel=n),e.removeAttribute(Vr),e.media===Ts&&e.removeAttribute("media")}}function wu(t,e){let{head:n}=document;!n||!e||xu(()=>{Ig(n,t);let r=Eu(t),{type:o,sizes:i}=Ag(e);r?Hg(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Su(t,e){let{head:n}=document;n&&xu(()=>{Eu(t)?.remove(),Ng(n)})}function Lu(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(ks)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Hi(c.target)&&(a=!0,Re(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Hi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Hi(u)&&u.id!==t&&(a=!0,Re(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Rg=["original","badge","dot","hole","bg"],Mu=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Cu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ii="#FCFCFC",Pg="#111111",Tu="#111111",Og="#ffffff",Bg="#212121",Dg="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",qg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Ni=32,ku=64;function Au(t){return typeof t=="string"&&Rg.includes(t)}function $g(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Ri(t){let e=document.createElement("canvas");e.width=Ni,e.height=Ni;let n=e.getContext("2d");return n?(n.scale(Ni/ku,Ni/ku),t(n),e.toDataURL("image/png")):""}function _g(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function Pi(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Dg);n&&(t.strokeStyle=Pg,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Fg(t,e,n){let r=Cu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Tu,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Tu,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Og,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Wr(t,e){if(t==="original")return e==="wait"?Ri(r=>Pi(r,Ii)):$g(qg[e]);let n=e==="wait"?void 0:Cu[e];return Ri(t==="hole"?r=>Pi(r,n??Ii):t==="bg"?r=>{r.fillStyle=n??Bg,_g(r,0,0,64,64,14),r.fill(),Pi(r,Ii,!1)}:r=>{Pi(r,Ii),e!=="wait"&&Fg(r,e,t==="dot"?"dot":"badge")})}function Hu(t){return{wait:Wr(t,"wait"),rotate:Wr(t,"rotate"),done:Wr(t,"done"),ready:Wr(t,"ready"),error:Wr(t,"error")}}var zg=new M("ChatStateFavicons"),sn="bloom-chat-state-favicon",Ou=["input","beforeinput","cut","paste","compositionend"],Bu=C({style:{type:3,description:"Favicon overlay",options:Mu}}),Yt="",As={wait:"",rotate:"",done:"",ready:"",error:""},Yr="wait",ut=!1,J=!1,D=null,gt="",St="",cn=!0,Di=!1,Un=null,Lt=0,Oi=null,Bi=null,an=null,Cs=null,Kn=null,Pt=!1,Iu=new WeakSet;function jg(){let t=Bu.store.style;return Au(t)?t:"bg"}function Du(){let e=document.querySelector(`link[rel~="icon"]:not(#${sn}), link[data-bloom-host-rel]:not(#${sn})`)?.href;return Re(e)?e:Re(Yt)?Yt:""}function Gg(){let t=document.getElementById(sn);return t instanceof HTMLLinkElement?t:null}function Ug(){if(!Re(Yt)){let t=Du();t&&(Yt=t)}return Re(Yt)?Yt:As.wait}function qu(t){return t==="wait"?Ug():As[t]}function $u(){wu(sn,qu(Yr))}function $(t){let e=qu(t);if(Yr===t){let n=Gg();if(n&&n.getAttribute("href")===e)return}Yr=t,$u()}function Nu(){As=Hu(jg()),$(Yr)}function Hs(){return ce(Rt())}function Is(t,e){!t||!e||t===e||(D===t&&(D=e),gt===t&&(gt=e),St===t&&(St=e))}function Kg(){let t=Hs();if(!(K()||ut||J))return gt="",t;if(gt&&t&&gt!==t)if(V(gt,t))Is(gt,t),gt=t;else return gt="",t;else!gt&&t&&(gt=t);return gt||t}function Ru(t){return!D||!t?!1:D===t?!0:V(D,t)}function _u(){ut=!1,J=!1,D=null,gt=""}function Fu(t){St=t,_u(),cn=!1,Di=!0,$("wait")}function Ms(t){return!t&&cn}function Vg(){if(!Pt)return;let t=Hs();if(St&&t&&St!==t&&!V(St,t)){Fu(t);return}St&&t&&V(St,t)&&Is(St,t),t&&(St=t);let e=K(),n=e&&!z();if(Di){if(z()){$("wait");return}Di=!1}if(z()){$("wait");return}let r=Kg(),o=ke();if(on()&&!e){ut=!1,J=!1,D=null,$(o?"wait":Ms(o)?"ready":"wait");return}if(Wt()&&!e&&ut){$("error"),ut=!1,J=!1,D=null;return}if(n){ut||(cn=!1),ut=!0,J=!1,D=r,$("rotate");return}if(ut)if(!Ru(t))ut=!1,J=!1,D=null;else if(J){ut=!1,J=!0,D=t||r,$("done");return}else{$("rotate");return}if(J)if(D&&t&&!Ru(t))J=!1,D=null;else if(o){D=r||D,$("done");return}else if(Ms(o)){J=!1,$("ready");return}else{J=!1,$("wait");return}D=null,o?$("wait"):Ms(o)?$("ready"):$("wait")}function ln(){Pt&&(Ku(),ju(),Gu(),Vg())}function zu(){if(Kn){for(let t of Ou)Kn.removeEventListener(t,Uu,!0);Kn=null}}function ju(){let t=Nt(),e=t&&t!==document.body?t:null;if(!(Kn===e&&e?.isConnected)&&(zu(),!!e)){Kn=e;for(let n of Ou)Kn.addEventListener(n,Uu,{capture:!0,passive:!0})}}function Gu(){let t=Nt();if(!(an&&Cs===t&&t.isConnected)){if(an?.disconnect(),Cs=t,!t||t===document.body){an=null;return}an=new MutationObserver(()=>qi()),an.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function qi(){if(Pt){if(document.hidden){Lt&&(cancelAnimationFrame(Lt),Lt=0),ln();return}Lt||(Lt=requestAnimationFrame(()=>{Lt=0,Pt&&ln()}))}}function Uu(){Gt()&&(cn=!0),qi()}function Pu(){Gt()&&(cn=!0),qi()}function Wg(){Pt&&(Lt&&(cancelAnimationFrame(Lt),Lt=0),ln())}function Yg(){Pt&&(cn=!1,ln())}function Xg(t){if(!Pt)return;if(t.userStopped){ut=!1,J=!1,D=null,$("wait");return}if(t.error){ut=!1,J=!1,D=null,$("error");return}let e=Hs();if(t.contextKey&&e&&t.contextKey!==e&&!V(t.contextKey,e)){ut=!1,J=!1,D=null,$("wait");return}ut=!1,J=!0,D=e||t.contextKey,$("done")}function Zg(){Pt&&ln()}function Jg(t,e){if(Pt){if(V(e,t)){Is(e,t),St=t,ln();return}Fu(t)}}function Ku(){let t=it();!t||Iu.has(t)||(Iu.add(t),t.addEventListener("input",Pu,{capture:!0,passive:!0}),t.addEventListener("compositionend",Pu,{capture:!0,passive:!0}))}var Vu=w({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Bu,startAt:"DOMContentLoaded",cleanupSelectors:[`#${sn}`],start(){Pt=!0,Yt=Du()||Yt,Nu(),Bi?.disconnect(),Bi=Lu(sn,t=>{Re(t)&&(Yt=t),$u()}),Un?.abort(),Un=new AbortController,window.addEventListener("popstate",qi,{signal:Un.signal}),document.addEventListener("visibilitychange",Wg,{signal:Un.signal}),Ku(),ju(),Gu(),Oi?.(),Oi=ct({onRise:Yg,onFall:Xg,onTick:Zg,onContext:Jg}),ln(),zg.debug("favicon watch started")},stop(){Pt=!1,Lt&&cancelAnimationFrame(Lt),Lt=0,Oi?.(),Oi=null,Un?.abort(),Un=null,zu(),an?.disconnect(),an=null,Cs=null,Bi?.disconnect(),Bi=null,_u(),St="",cn=!0,Di=!1,Yr="wait",Su(sn,Yt)},onSettingsChange:Nu});var Wu=`.bloom-ih-hud {
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
`;var yE=new M("InputHistory"),Ns=/\u200B/g,Yu=10,Xu=500,Zu=100,tb=8,eb=120,nb=2e3,$i=10,_i=C({maxEntries:{type:4,description:"Max stored prompts",min:Yu,max:Xu,default:Zu},history:{type:5,description:"Stored prompts",render:hb},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Rs=new Map,Q=0,Ps="",Xt=!1,Zr=!1,Ds=0,Xr=null,Os,qs=null,Ju=!0;function Ot(){let t=_i.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Qu(t){let e=ot(Number(_i.store.maxEntries??Zu),Yu,Xu);return t.length>e?t.slice(t.length-e):t}function Fi(t){_i.store.entries=Qu(t)}function rb(t){return t.replaceAll(Ns,"").replace(/\n$/,"").trim()}function Bs(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(jt);return n instanceof HTMLElement?n:it()}function ob(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Ut(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(Ns,"").trim().length===0,last:i.toString().replaceAll(Ns,"").trim().length===0}}catch{return{first:!0,last:!0}}}function td(t){clearTimeout(Os),Os=setTimeout(()=>{if(t!==Ds)return;Zr=!1;let e=qs;e&&xs(e,Ju)},eb)}function ed(t,e,n){Zr=!0,qs=t,Ju=n;let r=++Ds;le(t,e,n),td(r)}function ib(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Vn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ab(){document.querySelector(".bloom-ih-hud")?.remove()}function sb(t,e){let n=ib();n.textContent=t;let r=(e.closest("form")??Nt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-tb)}px`,n.classList.add("bloom-ih-hud-on")}function $s(t){let e=rb(t);if(!e)return;let n=Date.now(),r=Rs.get(e);if(r&&n-r<nb)return;Rs.set(e,n);let o=Ot().filter(i=>i!==e);o.push(e),Fi(o),Q=Ot().length,Xt=!1,Vn()}function lb(t,e){let n=Ot();if(!n.length&&t)return;Q>=n.length&&(Ps=Ut(e),Q=n.length);let r=t?Q-1:Q+1;r<0||r>n.length||(Q=r,Xt=!0,ed(e,r===n.length?Ps:n[r],t),r<n.length?sb(`${r+1} / ${n.length}`,e):Vn())}function cb(t){Xt=!1,Vn(),ed(t,Ps,!1),Q=Ot().length}function ub(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Bs(t.target)??Bs(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Xt&&!t.altKey&&!t.shiftKey){cb(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){$s(Ut(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=Ot();if(!r){let i=ob(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||Q<=0)||!n&&Q>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),lb(n,e))}function db(t){if(Bs(t.target)){if(Zr){td(Ds);return}Xt&&(Xt=!1,Vn(),Q=Ot().length)}}function mb(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(jt);n instanceof HTMLElement&&$s(Ut(n))}function fb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Fn);if(!n||!(n instanceof HTMLElement)||F(n))return;let r=it();r&&$s(Ut(r))}function pb(t){if(!(!Xt||Zr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Xt=!1,Vn()}}function gb(){if(Xr)return;Xr=new AbortController;let{signal:t}=Xr,e={capture:!0,signal:t};window.addEventListener("keydown",ub,e),window.addEventListener("input",db,e),window.addEventListener("submit",mb,e),window.addEventListener("click",fb,e),window.addEventListener("pointerdown",pb,e)}function bb(t){let e=Ot().slice();e.splice(t,1),Fi(e),Q>e.length&&(Q=e.length)}function hb(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=Ot().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/$i));n>=l&&(n=l-1);let c=s.slice(n*$i,n*$i+$i);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let f=document.createElement("div");f.className="bloom-ih-list",c.forEach((E,h)=>{let x=i.indexOf(E),mt=Ot().length-1-x,ft=document.createElement("div");ft.className="bloom-ih-item";let X=document.createElement("button");X.type="button",X.className=`bloom-ih-body${r===h?"":" bloom-ih-clamp"}`,X.textContent=E,X.addEventListener("click",()=>{r=r===h?-1:h,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let lt=document.createElement("button");lt.type="button",lt.title="Copy",lt.textContent="C",lt.addEventListener("click",()=>{pc(E)});let yt=document.createElement("button");yt.type="button",yt.title="Delete",yt.textContent="\xD7",yt.addEventListener("click",()=>{bb(mt),o()}),O.append(lt,yt),ft.append(X,O),f.appendChild(ft)}),t.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(f)}let d=document.createElement("div");d.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,o()});let g=document.createElement("span");g.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Fi([]),Q=0,o())}),d.append(m,g,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var nd=w({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:_i,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",Wu),Q=Ot().length,Xt=!1,gb()},stop(){Xr?.abort(),Xr=null,Vn(),ab(),Rs.clear(),clearTimeout(Os),Zr=!1,qs=null,Xt=!1},onSettingsChange(){let t=Ot(),e=Qu(t);e.length!==t.length&&Fi(e),Q>e.length&&(Q=e.length)}});var _s="noShareLink",yb=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],vb=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Fs=C({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function rd(t){return`${t.join(",")}{display:none!important}`}function od(){let t=[];if(Fs.store.hideShareChat!==!1&&t.push(rd(yb)),Fs.store.hideShareProject!==!1&&t.push(rd(vb)),!t.length){T(_s);return}k(_s,t.join(`
`))}var id=w({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Fs,start:od,onSettingsChange:od,stop(){T(_s)}});var ld="noDictation",xb=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Eb=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],cd=C({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function ad(t){return`${t.join(",")}{display:none!important}`}function sd(){let t=[ad(xb)];cd.store.hideDictationSettings!==!1&&t.push(ad(Eb)),k(ld,t.join(`
`))}var ud=w({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:cd,start:sd,onSettingsChange:sd,stop(){T(ld)}});var zs="noSidebarIdentity",Wn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],fd=Wn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),pd=Wn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),wb=[...fd,...pd],Sb=[...fd,...Wn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Lb=Wn.map(t=>`${t} a[href^="mailto:"]`),Tb=Wn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),kb=Wn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Jr=C({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function dd(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Mb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Cb(){return`${kb.join(",")}{margin-block:auto!important}`}function Ab(){return`${Tb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function md(){let t=Jr.store.hideUsername!==!1,e=Jr.store.hideEmail!==!1,n=t&&Jr.store.enlargePlan!==!1,r=t&&Jr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Mb([...Sb,...pd])),o.push(Cb())):o.push(dd(wb))),e&&o.push(dd(Lb)),n&&o.push(Ab()),!o.length){T(zs);return}k(zs,o.join(`
`))}var gd=w({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Jr,start:md,onSettingsChange:md,stop(){T(zs)}});var bd=`#bloom-rt-host {
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
    box-sizing: border-box;
    margin: 0;
    padding: 8px;
    border-radius: 16px;
    color: var(--text-primary, #0d0d0d);
    /* Settings card (--bg-primary). Page --main-surface-primary is #000 in dark. */
    background: var(--bg-primary, #fff);
    border: 1px solid var(--border-xlight, rgba(0, 0, 0, 0.05));
    box-shadow: var(--shadow-long, 0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62));
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
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
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
`;var vd=new M("RecentTopics"),Zn="bloom-rt-host",xd="home",Ed=/^\/c\/([a-z0-9_-]{8,})/i,Ib=/\/c\/([a-z0-9_-]{8,})/i,wd=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Nb=new Set(["Backquote","IntlBackslash"]),Rb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Pb=140,Ob=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),tt=C({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Ob},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),zi=null,ji=null,bt=!1,oo=!1,Qr=!1,Zt=0,un="",Yn=null,to=null,Xn,js=null,Gs=null;function Bb(){let t=Number(tt.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function eo(){let t=tt.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ks(){let t=tt.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Sd(){let t=tt.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Vs(){let t=tt.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ui(t){let e=Bb();return t.length>e?t.slice(0,e):t}function Jt(t){return t===xd}function no(t,e=Pb){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Ws(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Ed)?.[1]??""}catch{return t.match(Ib)?.[1]??""}}function dn(){let t=(location.pathname||"/").match(Ed);if(t?.[1])return t[1];let n=Rt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return xd}function Ys(t){if(Jt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Ws(r.getAttribute("href")||"")!==t)continue;let o=no(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return dn()===t&&e&&!/^ChatGPT$/i.test(e)?no(e,80):""}function Db(t){if(Jt(t))return"New chat";let e=Ks()[t];if(e)return e;let n=jn(t);return n||Ys(t)||"Chat"}function qb(t){return Vs()[t]||""}function $b(t){return Sd()[t]||{}}function Xs(t,e){if(!t||Jt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Ks();n[t]!==e&&(n[t]=e,tt.store.titles=n)}function _b(t){t.type==="conversation-meta"&&(Xs(t.conversationId,t.title),bt&&Jn())}function Fb(t,e){if(!t||Jt(t)||!e)return;let n=Vs();n[t]!==e&&(n[t]=e,tt.store.projects=n)}function zb(t,e){if(!t||Jt(t)||!e.user&&!e.assistant)return;let n=Sd(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,tt.store.previews=n)}function Zs(t){if(!t||Jt(t)&&tt.store.includeHome===!1)return;let e=eo().filter(n=>n!==t);e.unshift(t),tt.store.visits=Ui(e)}function Ki(){let t=tt.store.includeHome!==!1;return Ui(eo().filter(n=>t||!Jt(n))).map(n=>({id:n,title:Db(n),project:qb(n),preview:$b(n)}))}function hd(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return no(o)}catch{return""}}function ro(t){if(!t||Jt(t)||t!==dn())return;let e=Ys(t);e&&Xs(t,e);let n=hd("user"),r=hd("assistant");zb(t,{user:n,assistant:r});let o=Td(t);if(o){let i=Ld(o);i&&Fb(t,i)}}function Js(){let t=Ks(),e=Vs(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Zn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Ws(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=no(c.textContent||"",80);d&&!wd.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let m=Ld(c);m&&e[u]!==m&&(e[u]=m,i=!0)}}catch{}o&&(tt.store.titles=t),i&&(tt.store.projects=e);let a=eo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(tt.store.visits=Ui([...a,...l]))}function Ld(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=no((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!wd.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Td(t){if(Jt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Ws(e.getAttribute("href")||"")===t)return e}catch{}return null}function jb(t){let e=Td(t);if(e){e.click();return}if(Jt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Gb(){let t=dn();un&&un!==t&&ro(un),un=t,Zs(t),Js();let e=Ys(t);e&&Xs(t,e),ro(t)}function Gi(){Xn===void 0&&(Xn=window.setTimeout(()=>{Xn=void 0,Gb()},120))}function Ub(){Yn||(Yn=history.pushState.bind(history),to=history.replaceState.bind(history),history.pushState=function(...e){let n=Yn(...e);return Gi(),n},history.replaceState=function(...e){let n=to(...e);return Gi(),n})}function Kb(){Yn&&(history.pushState=Yn),to&&(history.replaceState=to),Yn=null,to=null}function Vb(t){return Nb.has(t.code)||t.keyCode===192?!0:Rb.has(t.key)}function kd(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Wb(t,e){oo=e,Js(),ro(dn()),bt=!0,Zt=0;try{let n=dn();Zs(n);let r=Ki();r.length>1&&(Zt=t?r.length-1:1)}catch(n){vd.error("Failed to open switcher:",n)}Jn()}function yd(t){let{length:e}=Ki();e&&(Zt=(Zt+(t?-1:1)+e)%e,Jn())}function Qs(){if(!bt)return;let t=Ki()[Zt];bt=!1,oo=!1,Jn(),t&&jb(t.id)}function Md(){bt&&(bt=!1,oo=!1,Jn())}function Yb(t){if(kd(t)){Qr=!0;return}if((t.ctrlKey||Qr)&&!t.altKey&&!t.metaKey&&Vb(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{bt?yd(t.shiftKey):Wb(t.shiftKey,!0)}catch(n){vd.error("Hotkey failed:",n)}return}if(bt){if(t.key==="Escape"){t.preventDefault(),Md();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Qs();return}t.key==="Tab"&&(t.ctrlKey||Qr)&&(t.preventDefault(),yd(t.shiftKey))}}function Xb(t){kd(t)&&(Qr=!1,bt&&oo&&Qs())}function Zb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Gi)}function Jb(t){!bt||(t.target instanceof Element?t.target:null)?.closest(`#${Zn}`)||Md()}function Qb(){document.visibilityState==="hidden"&&ro(dn())}function Us(t=ji){t instanceof HTMLElement&&ai(t,ii("auto"),!0)}function th(){if(!document.body)return null;let t=document.getElementById(Zn);if(t instanceof HTMLElement)return ji=t,Us(t),t;t=document.createElement("div"),t.id=Zn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ji=t,Us(t),t}function Jn(){let t=th();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!bt){e.dataset.visible="false",e.replaceChildren();return}let n=Ki();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Zt>=n.length&&(Zt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Zt?"true":"false",s.setAttribute("aria-selected",a===Zt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Zt=a,Qs()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function eh(){document.getElementById(Zn)?.remove(),ji=null}var Cd=w({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Zn}`],settings:tt,start(){k("recentTopics",bd),un=dn(),Zs(un),Js(),ro(un),js=Et(_b),Ub(),zi=new AbortController;let{signal:t}=zi;window.addEventListener("keydown",Yb,{capture:!0,signal:t}),window.addEventListener("keyup",Xb,{capture:!0,signal:t}),window.addEventListener("popstate",Gi,{signal:t}),document.addEventListener("click",Zb,{capture:!0,signal:t}),document.addEventListener("click",Jb,{signal:t}),document.addEventListener("visibilitychange",Qb,{signal:t}),Gs=Nn("schemeChange",()=>Us())},stop(){zi?.abort(),zi=null,Xn!==void 0&&(clearTimeout(Xn),Xn=void 0),Kb(),js?.(),js=null,Gs?.(),Gs=null,bt=!1,oo=!1,Qr=!1,eh()},onSettingsChange(){let t=Ui(eo());t.length!==eo().length&&(tt.store.visits=t),bt&&Jn()}});var tl="cleaner",nh=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],rh=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],oh=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],ih=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],ah=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],sh=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],mn=C({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Qn(t){return`${t.join(",")}{display:none!important}`}function Ad(){let t=[];if(mn.store.hideDownloadApps!==!1&&t.push(Qn(nh)),mn.store.hideDisclaimer!==!1&&t.push(Qn(rh)),mn.store.hideUpgrade!==!1&&t.push(Qn(oh)),mn.store.hideLockedModels!==!1&&t.push(Qn(ih)),mn.store.hideHomePromo!==!1&&t.push(Qn(ah)),mn.store.hideAds!==!1&&t.push(Qn(sh)),!t.length){T(tl);return}k(tl,t.join(`
`))}var Hd=w({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:mn,start:Ad,onSettingsChange:Ad,stop(){T(tl)}});var Wi=new M("ResponseNotification"),er=C({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:ph},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),el=!1,Vi=null,tr=null,io=null;function lh(){return document.visibilityState==="hidden"||document.hidden}function ch(){return er.store.onlyWhenHidden===!1?!0:lh()}function uh(){let t=jn(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Id(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!tr||tr.state==="closed")&&(tr=new t);let e=tr,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Wi.debug("chime failed",t)}}function dh(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Wi.debug("custom sound failed",e),Id()}}function Nd(){let t=String(er.store.soundUrl||"").trim();t?dh(t):Id()}function mh(){let t="Bloom++",e=`${uh()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Wi.debug("notification failed",n)}}function fh(){ch()&&(er.store.sound!==!1&&Nd(),er.store.browserNotification!==!1&&mh())}function ph(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Nd()),t.appendChild(e),()=>{e.remove()}}var Rd=w({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:er,start(){el=!0,Vi?.(),Vi=ct(t=>{if(!el||t.userStopped||t.error)return;let e=R()||Gn();t.conversationId&&t.conversationId!==e||fh()}),io?.abort(),io=new AbortController,er.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:io.signal}),Wi.debug("watch started")},stop(){el=!1,Vi?.(),Vi=null,io?.abort(),io=null;try{tr?.close()}catch{}tr=null}});var Pd=`#bloom-pq-chip {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: #f4f4f4;
    color: #0d0d0d;
    font: 14px/1.35 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    pointer-events: auto;
    overflow: hidden;
}

html.dark #bloom-pq-chip {
    background: #181716;
    border-color: rgba(255, 255, 255, 0.08);
    color: #fdfdfd;
}

.bloom-pq-head {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 4px 10px 4px 16px;
}

.bloom-pq-toggle {
    appearance: none;
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1 1 auto;
    min-width: 0;
    margin: 0;
    padding: 6px 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
}

.bloom-pq-count {
    flex: none;
    color: #6e6e6e;
    font-weight: 500;
}

html.dark .bloom-pq-count {
    color: #9e9e9e;
}

.bloom-pq-title {
    min-width: 0;
    font-weight: 500;
    color: inherit;
}

.line-clamp-2 {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: normal;
    overflow-wrap: anywhere;
}

.bloom-pq-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    min-height: 36px;
    padding: 4px 4px 4px 8px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.05);
    transition: transform 160ms cubic-bezier(0.2, 0, 0, 1);
}

html.dark .bloom-pq-row {
    background: #2a2928;
}

.bloom-pq-body {
    min-width: 0;
    flex: 1 1 auto;
    cursor: grab;
}

.bloom-pq-text {
    color: inherit;
    font: inherit;
    cursor: grab;
    user-select: none;
}

textarea.bloom-pq-editing {
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    resize: none;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: 1.35;
    caret-color: currentColor;
    cursor: text;
    user-select: text;
    field-sizing: content;
}

#bloom-pq-chip .bloom-pq-editing:focus,
#bloom-pq-chip .bloom-pq-editing:focus-visible {
    outline: none;
    box-shadow: none;
}

.bloom-pq-rail {
    display: flex;
    flex: none;
    align-items: center;
    gap: 2px;
}

.bloom-pq-ico {
    appearance: none;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: #6e6e6e;
    display: grid;
    place-items: center;
    cursor: pointer;
}

.bloom-pq-ico svg {
    width: 16px;
    height: 16px;
    display: block;
}

html.dark .bloom-pq-ico {
    color: #9e9e9e;
}

button.bloom-pq-ico:hover:not(:disabled),
button.bloom-pq-ico:focus-visible:not(:disabled) {
    background: rgba(0, 0, 0, 0.08);
    color: #0d0d0d;
}

html.dark button.bloom-pq-ico:hover:not(:disabled),
html.dark button.bloom-pq-ico:focus-visible:not(:disabled) {
    background: #3f3e3d;
    color: #f5f5f5;
}

button.bloom-pq-ico:disabled {
    cursor: default;
    opacity: 0.45;
}

.bloom-pq-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: min(320px, 46vh);
    padding: 0 8px 8px;
    overflow: auto;
}

.bloom-pq-list[hidden] {
    display: none;
}

.bloom-pq-settling .bloom-pq-row {
    transition: none;
}

.bloom-pq-lift {
    z-index: 10001;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.38);
    transition: none;
    cursor: grabbing;
}

.bloom-pq-lift .bloom-pq-body,
.bloom-pq-lift .bloom-pq-text {
    cursor: grabbing;
}

.bloom-pq-gap {
    flex: none;
    border-radius: 8px;
    pointer-events: none;
}

.bloom-pq-tip {
    position: absolute;
    top: 50%;
    right: 10px;
    z-index: 1;
    max-width: 70%;
    padding: 6px 10px;
    border-radius: 8px;
    background: #2f2f2f;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
    transform: translateY(-50%);
}

.bloom-pq-tip[hidden] {
    display: none;
}

html.dark .bloom-pq-tip {
    background: #242120;
    color: #f5f5f5;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
}

@media (prefers-reduced-motion: reduce) {
    #bloom-pq-chip,
    .bloom-pq-row { transition: none; }
}
`;var qe=new M("PromptQueue"),Qi="bloom-pq-chip",Od="promptQueue",bh=8,hh=50,yh=2e3,vh='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',xh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,Eh=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),nl=C({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),Be=new Map,Bd=0,Dt=!1,Bt="",P="",Qt=!1,ht=!1,_e=!1,B=null,ao=null,Yi=null,Oe,mo,$e=null,N=null,nr=null,Zi=!1,at=null,fn,De=!0,G=!1,j=!1,dt=!1;function de(){return ce(Rt())}function rr(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function wh(t){let e=rr(Ut(t));if(e)return e;if(!Gt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),rr(n.innerText||n.textContent||"")}catch{return""}}function jd(){try{let t=document.querySelectorAll(vh),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Gd(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Ud(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&xh.test(n))return!0}}catch{}return!1}function Ji(){let t=Gn();if(!t)return!1;let e=R();return!e||e===t}function uo(){if(K()||Ji())return!1;let t=jd();if(!t)return!0;if(Gd(t)||Ud(t))return!1;try{if(t.querySelector(Eh)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function Sh(){if(z()||on())return G=!1,!1;if(K()||Ji())return G=!0,!0;let t=jd();return t&&(Gd(t)||Ud(t))?(G=!0,!0):G&&!uo()?!0:(G=!1,!1)}function Kd(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(jt);return n instanceof HTMLElement?n:null}function Dd(t){return Kd(t)??it()}function ta(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Vd(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Lh(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?rr(e.innerText||e.textContent||""):""}catch{return""}}function Th(){return Bd+=1,`pq${Date.now().toString(36)}${Bd.toString(36)}`}function W(t){return Be.get(t)??[]}function Wd(t){return W(t)[0]}function pn(t,e){e.length?Be.set(t,e):Be.delete(t)}function Yd(t){if(!W(t).length){j=!1,dt=!1,P="";return}j=!0,dt=!1,G=!0,P=""}function qd(t){if(!Bt||Bt===t)return;let e=Be.get(Bt);!e?.length||Be.has(t)||V(Bt,t)&&(Be.delete(Bt),Be.set(t,e),P===Bt&&(P=t),B?.key===Bt&&(B.key=t),qe.debug("migrated pending",Bt,"\u2192",t))}function ea(t){let e=de(),n=W(e);if(nl.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),pn(e,n)}else if(n.length>=bh){qe.debug("queue full",e);return}else n.push({id:Th(),text:t,at:Date.now()}),pn(e,n);G=!0,B={key:e,text:t,turns:Vd(),ticks:3};let r=it();r&&le(r,"");try{st()}catch(o){qe.error("chip",o)}qe.debug("queued",e,n.length,t.length)}function Xd(t,e){let n=W(t).filter(r=>r.id!==e);if(pn(t,n),N===e&&(N=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}st()}function il(){nr?.abort(),nr=null}function kh(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function $d(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function Mh(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||N||at)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;nr?.abort();let c=new AbortController;nr=c;let{signal:u}=c,d=!1,m=!1,g=0,p=0,b=0,f=0,E=null,h=[],x=[],mt=()=>{e.classList.add("bloom-pq-settling");for(let y of h)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},ft=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(E?.isConnected?E.before(t):e.append(t)),E?.remove(),E=null,mt(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},X=()=>{Zi=!0;let y=A=>{A.preventDefault(),A.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{Zi=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=$d(h.length,g,p),A=x.length>1?(x[x.length-1].top-x[0].top-x.slice(0,-1).reduce((H,_t)=>H+_t.height,0))/(x.length-1):2,pt=new Array(x.length),vt=x[0]?.top??0;for(let H of y)pt[H]=vt,vt+=x[H].height+A;for(let H=0;H<h.length;H++){if(H===g)continue;let _t=pt[H]-x[H].top;h[H].style.transform=Math.abs(_t)<.5?"":`translate3d(0,${Math.round(_t)}px,0)`}},lt=()=>{let y=W(n).slice();if(g<0||g>=y.length)return;let A=$d(y.length,g,p);if(A.every((H,_t)=>H===_t))return;let pt=A.map(H=>y[H]).filter(Boolean);if(pt.length!==y.length)return;pn(n,pt);let vt=new Map(h.map(H=>[H.dataset.pqId||"",H]));for(let H of pt){let _t=vt.get(H.id);_t&&e.append(_t)}},yt=y=>{if(m)return;m=!0;let A=d;nr===c&&(nr=null),A&&y&&t.isConnected&&lt(),ft(),A&&X(),c.abort()};u.addEventListener("abort",()=>{if(m)return;m=!0;let y=d;ft(),y&&X()});let _o=()=>{d=!0,h.push(...e.querySelectorAll(":scope > .bloom-pq-row")),g=h.indexOf(t),g<0&&(g=h.findIndex(H=>H.dataset.pqId===r)),p=g<0?0:g;let y=t.getBoundingClientRect();b=y.left,f=y.top;let A=getComputedStyle(t);E=document.createElement("div"),E.className="bloom-pq-gap",E.style.height=`${y.height}px`,t.before(E),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=A.color,t.style.font=A.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let pt=e.getBoundingClientRect(),vt=e.scrollTop;x=h.map(H=>{let Wa=(H===t?E:H).getBoundingClientRect(),ac=Wa.top-pt.top+vt;return{top:ac,height:Wa.height,mid:ac+Wa.height/2}})},v=y=>{if(y.pointerId!==a||m||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(_o(),!d||g<0)))return;y.preventDefault(),t.style.left=`${b+(y.clientX-s)}px`,t.style.top=`${f+(y.clientY-l)}px`;let A=e.getBoundingClientRect(),pt=y.clientY-A.top+e.scrollTop,vt=kh(pt,x.map(H=>H.mid));vt!==p&&(p=vt,O())},I=y=>{y.pointerId===a&&yt(!0)};window.addEventListener("pointermove",v,{signal:u}),window.addEventListener("pointerup",I,{signal:u}),window.addEventListener("pointercancel",()=>yt(!1),{signal:u})})}function Ch(){ht=!0,clearTimeout(mo),mo=setTimeout(()=>{ht=!1,mo=void 0},yh)}function Ah(t){if(at)return;let e=de(),n=W(e).find(i=>i.id===t);if(!n)return;let r=it();if(!r)return;let o=n.text;at=t,N===t&&(N=null),il(),st(),clearTimeout(fn),fn=setTimeout(()=>{if(fn=void 0,!Dt||at!==t)return;if(at=null,de()!==e||!W(e).some(a=>a.id===t)){st();return}pn(e,W(e).filter(a=>a.id!==t)),st(),Ch(),le(r,o);let i=Me();i&&!F(i)&&!wi(i)&&(i.click(),ht=!1),Yd(e)},160)}function so(t){if(!Dt||Qt||j||at||K()||de()!==t)return;let e=Wd(t);if(!e){P="";return}if(Wt())return;let n=it();if(!n)return;if(!ke(n)){let o=rr(Ut(n));if(o&&o!==e.text)return}let r=Me();!r||F(r)||wi(r)||(Qt=!0,le(n,e.text),clearTimeout(Oe),Oe=setTimeout(()=>Hh(t,e.id,e.text),hh))}function Hh(t,e,n){Oe=void 0;try{if(!Dt||j||at)return;let r=Wd(t);if(!r||r.id!==e||r.text!==n||K()||de()!==t)return;let o=it();if(!o)return;let i=rr(Ut(o));if(i&&i!==n&&!ke(o))return;i!==n&&le(o,n);let a=Me();if(!a||F(a)||wi(a))return;a.click(),pn(t,W(t).filter(s=>s.id!==e)),st(),Yd(t),qe.debug("drained",t,W(t).length)}finally{Qt=!1}}function rl(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Nt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function ol(){il(),$e?.remove(),$e=null,N=null,De=!0}var Zd="http://www.w3.org/2000/svg";function Ih(){let t=document.createElementNS(Zd,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function lo(t){let e=Ih();for(let n of t){let r=document.createElementNS(Zd,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function co(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&Jd(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function Nh(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${Qi}`)}function Xi(){let t=$e?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function Rh(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function Pe(t,e){if(N!==t)return;if(N=null,e===null){st();return}let n=rr(e),r=de();if(!n){Xd(r,t);return}let o=W(r).find(i=>i.id===t);o&&(o.text=n),st()}function _d(t){at||N!==t&&(N&&Pe(N,Xi()),W(de()).some(e=>e.id===t)&&(N=t,De=!0,st()))}function Jd(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function Fd(t){return N===t?"edit":at===t?"send":"text"}function Ph(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function Oh(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||Ph(l)!==Fd(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",De?"true":"false"),n.hidden=!De;for(let s of e){let l=a.get(s.id);if(Fd(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function st(){if(il(),!Dt||!document.body){ol();return}let t=de(),e=W(t);if(!e.length){ol();return}N&&!e.some(d=>d.id===N)&&(N=null),at&&!e.some(d=>d.id===at)&&(at=null);let n=$e;if(n?.isConnected||(n=document.createElement("div"),n.id=Qi,document.body.appendChild(n),$e=n),Oh(n,e)){rl(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",De?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),De=!De,st()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",De||(c.hidden=!0);let u=null;for(let d of e){let m=document.createElement("div");m.className="bloom-pq-row",m.dataset.pqId=d.id;let g=N===d.id,p=at===d.id;g||(m.setAttribute("role","button"),m.tabIndex=p?-1:0,m.setAttribute("aria-roledescription","sortable"),m.setAttribute("aria-pressed","false"),p&&(m.dataset.pqState="sending",m.setAttribute("aria-disabled","true")));let b=document.createElement("div");b.className="bloom-pq-body";let f;if(g){let h=document.createElement("textarea");h.className="bloom-pq-text bloom-pq-editing",h.value=d.text,h.rows=2,h.spellcheck=!1,h.setAttribute("aria-label","Queued message text"),h.addEventListener("keydown",x=>{x.stopPropagation(),x.key==="Enter"&&!x.shiftKey?(x.preventDefault(),Pe(d.id,h.value)):x.key==="Escape"&&(x.preventDefault(),Pe(d.id,null))}),h.addEventListener("blur",()=>Pe(d.id,h.value)),f=h,u=h}else{let h=document.createElement("span");h.className="bloom-pq-text line-clamp-2",h.textContent=p?"Sending":d.text,p?Jd(h,l,"Sending now"):h.addEventListener("click",x=>{if(Zi){Zi=!1,x.preventDefault(),x.stopPropagation();return}x.preventDefault(),x.stopPropagation(),_d(d.id)}),f=h}b.append(f),m.append(b);let E=document.createElement("div");if(E.className="bloom-pq-rail",g){let h=co("Save",lo(["M20 6 9 17l-5-5"]),()=>{Pe(d.id,f instanceof HTMLTextAreaElement?f.value:Xi())},l),x=co("Cancel",lo(["M18 6 6 18","m6 6 12 12"]),()=>{Pe(d.id,null)},l);E.append(h,x)}else{let h=co("Remove from queue",lo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{N&&N!==d.id&&Pe(N,Xi()),N=N===d.id?null:N,Xd(t,d.id)},l,void 0,p),x=co("Edit queued message",lo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>_d(d.id),l,"Edit",p),mt=co("Send now",lo(["M12 19V5","M6 11 12 5l6 6"]),()=>{N&&N!==d.id&&Pe(N,Xi()),Ah(d.id)},l,"Send now (or Enter on empty composer)",p);E.append(h,x,mt)}m.append(E),!g&&!p&&Mh(m,c,t,d.id),c.append(m)}if(n.append(o,c),rl(n),u){let d=u,m=N;queueMicrotask(()=>{N===m&&d.isConnected&&Rh(d)})}}function Bh(){if(!B)return;B.ticks-=1;let t=W(B.key);if(t.length&&Vd()>B.turns){let e=Lh();if(e&&e===B.text){qe.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),pn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,st();return}}B.ticks<=0&&(B=null)}function na(t){return!Sh()||!Gt(t)?"":wh(t)}function Dh(t){if(!Dt||t.isComposing||t.keyCode===229||t.key!=="Enter"||Nh(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||Qt)return;let e=Dd(t.target)??Dd(document.activeElement);if(!e)return;if(t.altKey||ht){ht=!1,_e=!0,queueMicrotask(()=>{_e=!1});return}let n=na(e);n&&(ta(t),ea(n))}function qh(t){if(!Dt||Qt||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(_e){_e=!1;return}if(ht){ht=!1;return}let e=Kd(t.target);if(!e)return;let n=na(e);n&&(ta(t),ea(n))}function $h(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||F(e))return null;let n=t.closest(Fn);if(n instanceof HTMLElement&&!F(n))return n;let r=Me();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function zd(t){if(!Dt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Qi}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&F(n)||Qt||!$h(e))return;if(ht){ht=!1;return}let r=it();if(!r)return;let o=na(r);o&&(ta(t),ea(o))}function _h(t){if(!Dt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Ei)&&!e.querySelector(jt)||Qt)return;if(_e){_e=!1;return}if(ht){ht=!1;return}let n=it()??e.querySelector(jt);if(!n)return;let r=na(n);r&&(ta(t),ea(r))}var Qd=w({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Od,cleanupSelectors:[`#${Qi}`],settings:nl,start(){Dt=!0;let t=nl.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),Bt=de(),P="",Qt=!1,ht=!1,_e=!1,B=null,G=!z()&&!on()&&(K()||Ji()),j=!1,dt=!1,N=null,at=null,clearTimeout(fn),fn=void 0,k(Od,Pd),ao?.abort(),ao=new AbortController;let{signal:e}=ao,n={capture:!0,signal:e};window.addEventListener("keydown",Dh,n),document.addEventListener("beforeinput",qh,n),document.addEventListener("pointerdown",zd,n),document.addEventListener("click",zd,n),document.addEventListener("submit",_h,n),Yi?.(),Yi=ct({onFall(r){if(Dt){if(r.userStopped||r.error){G=!1,j=!1,dt=!1,P="",st();return}if(!(j&&!dt)){if(j&&dt){if(!uo())return;j=!1,dt=!1,G=!1,P=r.contextKey,so(r.contextKey);return}if(!uo()){qe.debug("unsettled fall; keep queue window");return}G=!1,P=r.contextKey,so(r.contextKey)}}},onRise(){z()||on()||(j&&(dt=!0),G=!0)},onContext(r,o){o&&r&&!V(o,r)&&(G=!1,j=!1,dt=!1,P="",Qt=!1,Oe!==void 0&&(clearTimeout(Oe),Oe=void 0)),qd(r),Bt=r,st()},onTick(r){qd(r.contextKey),Bt=r.contextKey,Bh(),(z()||on())&&(j=!1,dt=!1,G=!1,P=""),j&&(K()||Ji())&&(dt=!0),j&&dt&&uo()&&(j=!1,dt=!1,G=!1,W(r.contextKey).length&&(P=r.contextKey,so(r.contextKey))),!j&&G&&uo()&&(G=!1,!P&&W(r.contextKey).length&&(P=r.contextKey,so(r.contextKey))),!j&&P&&P===r.contextKey&&so(P),W(r.contextKey).length&&!$e?.isConnected?st():$e&&rl($e)}}),st(),qe.debug("watch started")},stop(){Dt=!1,Yi?.(),Yi=null,ao?.abort(),ao=null,clearTimeout(Oe),Oe=void 0,clearTimeout(mo),mo=void 0,clearTimeout(fn),fn=void 0,at=null,Be.clear(),B=null,P="",Qt=!1,ht=!1,_e=!1,G=!1,j=!1,dt=!1,ol()}});var tm=`.bloom-cls {
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
`;var rm=new M("ChatListStatus"),em="chatListStatus",ia="bloom-cls",zh="bloom-cls",jh=1200*1e3,Gh="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",qt=new Map,te=!1,Tt="",me=!1,ar=!1,kt=0,Fe=null,ll=null,or=null,al=null,ra=null,fo=null,ir=!1,ze=new Set;function oa(){return Date.now()}function om(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function fe(t,e,n,r=!0){if(!(!t||!te)){if(e==="idle")qt.delete(t);else{let o=qt.get(t);o&&o.kind===e&&n!=="net"?o.at=oa():qt.set(t,{kind:e,at:oa(),source:n})}r&&Uh({v:1,id:t,kind:e,at:oa()}),gn()}}function Uh(t){try{or?.postMessage(t)}catch{}}function Kh(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||fe(e.id,e.kind,"bc",!1)}function Vh(){let t=oa();for(let[e,n]of qt)n.kind==="streaming"&&t-n.at>jh&&qt.delete(e)}function Wh(){let t=om();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Gh))continue;let o=ue(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function nm(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function sl(t){let e=t.querySelector(`:scope > .${ia}`);return e||null}function cl(){if(!te)return;Vh();let t=R(),e=Wh();Fe?.disconnect();try{for(let n of e){let r=ue(n.getAttribute("href")||"");if(!r||!t||r!==t){sl(n)?.remove();continue}let i=qt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){sl(n)?.remove();continue}let a=sl(n);a||(a=document.createElement("span"),a.className=ia,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(nm("streaming")):i==="error"&&a.appendChild(nm("error")))}}catch(n){rm.debug("paint failed",n)}im()}function gn(){if(te){if(document.hidden){kt&&(cancelAnimationFrame(kt),kt=0),cl();return}kt||(kt=requestAnimationFrame(()=>{kt=0,te&&cl()}))}}function im(){let t=om();if(!(Fe&&ll===t&&t?.isConnected)){if(Fe?.disconnect(),ll=t,!t){Fe=null;return}Fe=new MutationObserver(()=>gn()),Fe.observe(t,{childList:!0,subtree:!0})}}function aa(){return!!(Qe()||Kr())}function Yh(t){return!!(ir||t&&ze.has(t)||!ar&&!z()&&aa())}function Xh(t){if(te){if(t.type==="post-start"){ar=!1,t.conversationId?(ir=!1,ze.add(t.conversationId),me=!0,fe(t.conversationId,"streaming","net")):(ir=!0,me=!0);return}if(t.type==="post-end"){if(ir=!1,t.conversationId){ze.delete(t.conversationId);let e=R(),n=Gn();(e?t.conversationId===e:t.conversationId===n)?fe(t.conversationId,t.error?"error":"done","net"):fe(t.conversationId,"idle","net")}aa()||(me=!1)}}}function Zh(t,e){if(!te)return;if(V(e,t)){gn();return}let n=R();if(Tt&&Tt!==n){ze.delete(Tt);let r=qt.get(Tt);r&&r.kind!=="idle"&&fe(Tt,"idle","local")}ir=!1,me=!1,ar=!0,n&&qt.get(n)?.kind==="streaming"&&qt.get(n)?.source==="local"&&!ze.has(n)&&fe(n,"idle","local"),gn()}function Jh(t){if(!te)return;let e=t.conversationId||R();if(Tt&&e&&Tt!==e){ze.delete(Tt);let r=qt.get(Tt);r&&r.kind!=="idle"&&fe(Tt,"idle","local"),me=!!(e&&ze.has(e))}if(e&&(Tt=e),ar||z()){if(z()||aa()||t.streaming){gn();return}ar=!1}if(Yh(e)&&(t.streaming||aa())){me=!0,e&&fe(e,"streaming","local"),gn();return}me&&(me=!1,e&&fe(e,Wt()?"error":"done","local")),gn()}var am=w({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ia}`],start(){te=!0,k(em,tm);try{or=new BroadcastChannel(zh)}catch{or=null}or?.addEventListener("message",Kh),al=Et(Xh),ra?.(),ra=ct({onTick:Jh,onContext:Zh}),fo?.abort(),fo=new AbortController,document.addEventListener("visibilitychange",()=>{te&&(kt&&(cancelAnimationFrame(kt),kt=0),cl())},{signal:fo.signal}),im(),rm.debug("sidebar status watch started")},stop(){te=!1,kt&&cancelAnimationFrame(kt),kt=0,fo?.abort(),fo=null,Fe?.disconnect(),Fe=null,ll=null,ra?.(),ra=null,al?.(),al=null;try{or?.close()}catch{}or=null,qt.clear(),ze.clear(),ir=!1,me=!1,ar=!1,Tt="",document.querySelectorAll(`.${ia}`).forEach(t=>t.remove()),T(em)}});var lm="widerChat",cm=40,um=96,dm=64,mm=C({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:cm,max:um,default:dm}});function Qh(){return ot(Number(mm.store.width??dm),cm,um)}function sm(){let t=Qh(),e=`min(100%,${t}rem)`;k(lm,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var fm=w({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:mm,start:sm,onSettingsChange:sm,stop(){T(lm)}});var ul="composerOpacity",sr='form[data-type="unified-composer"],form.w-full[data-type]',t0=[`${sr} [class*="corner-superellipse"]`,`${sr} [class*="bg-token-bg-primary"]`,`${sr} [class*="bg-token-main-surface"]`].join(","),e0=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),n0="#thread-bottom-container,#thread-bottom",r0=`${sr} #prompt-textarea,${sr} [contenteditable="true"]`,o0="var(--bg-primary,var(--main-surface-primary,#ffffff))",dl=C({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function i0(){return ot(Number(dl.store.opacity??100),0,100)}function a0(){return ot(Number(dl.store.blur??16),0,40)}function pm(){let t=i0();if(t>=100){T(ul);return}let e=a0(),n=`color-mix(in srgb,${o0} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(ul,`${n0}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${e0}{display:none!important}${sr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${t0}{background-color:${n}!important;background-image:none!important;${r}}${r0}{background-color:transparent!important;background-image:none!important}`)}var gm=w({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:dl,start:pm,onSettingsChange:pm,stop(){T(ul)}});var bm=`#bloom-bn-host {
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

.bloom-bn-emoji {
    flex: none;
    font-size: 1rem;
    line-height: 1;
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

#thread [data-message-id],
#thread [data-testid^="conversation-turn-"] {
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
`;var l0=new M("BetterNavigator"),ml="betterNavigator",xm="bloom-bn-host",xn=60,c0=16,u0=1e3,d0=2.5,m0=.4,ca="\u6B63\u5728\u8F93\u51FA\u2026",bl="Image",f0="\u2753",p0="\u{1F916}",hm=/file_[0-9a-f]+/gi,g0="File",b0="Code",h0=".markdown, .whitespace-pre-wrap",wl=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),y0="img, picture, video, canvas",v0=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,x0=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,vo=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,E0=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,w0=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,S0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,L0=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,T0=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,k0=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,M0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),C0=2e3,A0=40,H0=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,I0=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),N0=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),R0=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),P0=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),ha=C({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),cr=new Map,yo=new Map,ne=new Set,ua=0,$t=!1,ge=!1,lr=!1,je=null,xo=null,yn=null,da=null,et=[],vn="",ma=0,fa=-1,Sl=0,pa="",Mt=0,pe=0,po,go=null,sa=null,fl=null,pl=null,bn=null,hl=null,bo=null,hn=null,ur=null,ho=null;function ya(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function gl(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function O0(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function B0(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)H0.test(O0(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=gl(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||gl(getComputedStyle(t).getPropertyValue("--thread-content-width"))||gl(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function ga(t){try{return!!t.closest(N0)}catch{return!0}}function ym(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function va(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Ll(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function D0(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function la(t,e){if(t){hm.lastIndex=0;for(let n of t.matchAll(hm))e.add(n[0].toLowerCase())}}function q0(t){try{let e=new Set,n=s=>{D0(s)||(la(s.getAttribute("src")||"",e),la(s.getAttribute("srcset")||"",e),la(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&la(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=va(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function $0(t,e){let n=q0(t),r=yo.get(e)??0,o=Math.max(r,n);return o>0&&yo.set(e,o),o>=2?`${bl} x${o}`:bl}function Y(t){return t.replace(/\s+/g," ").trim()}function Em(t,e){let n=t;for(;n&&n!==e;){if(n.matches(R0))return!0;n=n.parentElement}return!1}function ba(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(Em(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(wl);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return Y(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<xn+20;)e.push(Y(r.textContent||""));return Y(e.join(" "))}function Eo(t){let e=Y(t);return e.length<3||e.length>180||vo.test(e)?!1:v0.test(e)?!0:x0.test(e)}function xa(t){let e=Y(t);return e.length<8||e.length>120||/\s/.test(e)||vo.test(e)||Eo(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function _0(t){let e=[],n=i=>{let a=Y(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(Y(s[1])),e.push(Y(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function F0(t){try{return ga(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function Tl(t){let e=Y(t);return!e||kl(e)||xa(e)?!0:Eo(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function z0(t){return!t.length||t.length>4||!t.every(e=>Tl(e))?!1:t.some(e=>vo.test(Y(e))||Eo(e)||xa(e))}function wm(t){try{let e=null,n=0,r=`${wl}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(F0(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=_0(o);if(!i.length||i.length>4||i.join(" ").length>240||!z0(i))continue;let a=i.some(c=>vo.test(Y(c))),s=i.some(c=>Eo(c)||xa(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function j0(t){return wm(t)?g0:""}function G0(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(E0.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function U0(t){try{for(let e of t.querySelectorAll(y0))if(!G0(e))return!0}catch{}return!1}function kl(t){let e=Y(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||L0.test(e)||S0.test(e)?!0:e.length<=24&&(T0.test(e)||vo.test(e))}function K0(t){let e=[],n=new Set,r=o=>{try{if(Em(o,t)||o.closest(wl))return}catch{return}let i=ba(o);!i||n.has(i)||kl(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>xn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(ba(o).length<24)&&(r(o),e.join(" ").length>xn+20))break}}catch{}return Y(e.join(" "))}function V0(t){let e=wm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=Y(i.innerText||i.textContent||"");!a||a.length>xn+20||r.has(a)||Tl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return Y(n.join(" "))}function W0(t,e){let n=[];try{for(let o of t.querySelectorAll(h0)){if(ga(o))continue;let i=ba(o);if(!(!i||e==="assistant"&&kl(i)||Tl(i))&&(n.push(i),n.join(" ").length>xn+20))break}}catch{}let r=Y(n.join(" "));if(e==="user"){let o=V0(t);if(o)return o}return r||(e==="assistant"?K0(t):"")}function Y0(t){return t.length>xn?`${t.slice(0,xn).trimEnd()}\u2026`:t}function vm(t){return k0.test(t)}function X0(t,e,n,r){let o=W0(t,e);if(o)return Y0(o);if(r)return ca;let i=j0(t);if(i)return i;if(Ll(t))return $0(t,va(t));try{if(U0(t))return bl;if(t.querySelector("pre, code"))return b0}catch{}return`Message ${n+1}`}function Z0(){if(ge)return!0;let t=R();return!!(t&&ne.has(t)||!lr&&!z()&&wo())}function wo(){return!!(Qe()||Kr())}function J0(){ua=Date.now()}function Sm(t){ge=!1,t&&ne.delete(t);let e=R();e&&ne.delete(e)}function Q0(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function ty(t){if(Ll(t)||!wo())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!ba(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function Ml(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=Y(e.textContent||"");if(!(n.length>32)&&w0.test(n))return!0}}catch{}return!1}function Lm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function ey(t,e){try{if(Q0(t))return!0;if(!e)return!1;if(ty(t)||Ml(t))return!0}catch{}return!1}function Tm(t){if(!t||wo())return!1;try{if(Ml(t)||Lm(t))return!1;if(t.querySelector(M0)||Ll(t))return!0}catch{}return!1}function ny(t){if(wo()||ua&&Date.now()-ua<C0)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!Tm(e.el)||Sm()}function ry(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(I0)){if(ga(r))continue;let i=va(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(ga(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function oy(){let t=ya();if(!t||t===document.body)return[];let e=ha.store.showAssistant!==!1,n=e&&Z0(),r=ry(t),o=null;if(e)for(let a of r)ym(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=va(a);if(!s)continue;let l=ym(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&Ml(a),d=c&&Lm(a),m=l==="assistant"&&c&&!Tm(a)&&(u||d||n||ey(a,!0)),g=X0(a,l,i.length,m);if(g&&g!==ca){let b=cr.get(s),f=!!b&&(Eo(b)||xa(b));(!b||f||!vm(g)||vm(b))&&g!==b&&cr.set(s,g)}let p=m&&g===ca?ca:cr.get(s)||g;i.push({id:s,el:a,role:l,text:p,live:m})}}catch{}return ny(i),i}function iy(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function km(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function ay(t){return t===window?window.innerHeight:t.clientHeight}function sy(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(P0)}catch{return!1}}function Mm(){po!==void 0&&(clearTimeout(po),po=void 0),go?.classList.remove("bloom-bn-flash"),go=null}function ly(t){Mm(),t.classList.add("bloom-bn-flash"),go=t,po=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),go===t&&(go=null),po=void 0},800)}function yl(t){if(!et.length)return;let e=Math.max(0,Math.min(t,et.length-1));ma=e,xo?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),yn?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),da&&(da.textContent=`${e+1} / ${et.length}`);let n=yn?.children[e];if(n instanceof HTMLElement){let r=yn;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function vl(t){let e=et[t];if(!e?.el.isConnected)return;fa=t,Sl=Date.now()+u0,yl(t);let n=ur??km(e.el),o=Math.abs(e.el.getBoundingClientRect().top-iy())>d0*ay(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),ha.store.jumpEffect!=="none"&&ly(e.el)}function Cl(){if(!$t||!et.length)return;if(Date.now()<Sl&&fa>=0){yl(fa);return}let t=window.innerHeight*m0,e=0;for(let n=0;n<et.length;n++){let r=et[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}yl(e)}function cy(t){let e=km(t);if(ur===e&&ho)return;ho?.(),ur=e;let n=e===window?document:e,r=()=>{Cl(),Al()};n.addEventListener("scroll",r,{passive:!0}),ho=()=>n.removeEventListener("scroll",r)}function uy(t){hn?.disconnect(),hn=null;let e=ur instanceof HTMLElement?ur:null;hn=new IntersectionObserver(()=>Cl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&hn.observe(n.el)}function dy(){if(!document.body)return null;let t=je;if(t?.isConnected)return t;t=document.createElement("div"),t.id=xm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),je=t,xo=e,yn=i,da=o,t}function Cm(){let t=je,e=ya();if(!t||!e||!e.isConnected||et.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=B0(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||A0,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let m=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${m}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Al(){!$t||pe||(pe=requestAnimationFrame(()=>{pe=0,$t&&Cm()}))}function my(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function fy(t){let e=xo,n=yn;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>c0),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=my(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),vl(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?f0:p0;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),vl(o)}),n.appendChild(a)}))}function py(t){xo?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=yn?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function gy(){let t=R();return t===pa?!1:(pa=t,cr.clear(),yo.clear(),et=[],vn="",ma=0,fa=-1,Sl=0,ge&&t&&(ne.add(t),ge=!1),!0)}function by(t){let e=ha.store.showAssistant!==!1?"1":"0";return`${pa}|${e}|${t.map(n=>n.id).join(",")}`}function xl(){if(!$t)return;gy();let t=oy(),e=ya();if(!e||t.length<1){et=t,vn="",je&&(je.hidden=!0),hn?.disconnect(),El();return}dy();let n=by(t);n!==vn?(et=t,vn=n,fy(t),cy(e),uy(t)):(et=t,py(t)),Cm(),Cl(),El()}function ee(){if($t){if(document.hidden){Mt&&(cancelAnimationFrame(Mt),Mt=0),xl();return}Mt||(Mt=requestAnimationFrame(()=>{Mt=0,$t&&xl()}))}}function El(){let t=ya();if(!(bn&&hl===t&&t?.isConnected)){if(bn?.disconnect(),bo?.disconnect(),hl=t,!t||t===document.body){bn=null;return}bn=new MutationObserver(()=>ee()),bn.observe(t,{childList:!0,subtree:!0}),bo=new ResizeObserver(()=>Al()),bo.observe(t)}}function hy(t){if($t){if(t.type==="post-start"){J0(),lr=!1,t.conversationId?(ge=!1,ne.add(t.conversationId)):ge=!0,ee();return}if(t.type==="post-end"){if(ge=!1,t.conversationId)ne.delete(t.conversationId);else{let e=R();e&&ne.delete(e)}ee()}}}function yy(t){if(!$t||!et.length||je?.hidden||t.altKey||t.ctrlKey||t.metaKey||sy(t.target))return;let e=-1;if(t.key==="ArrowDown")e=ma+1;else if(t.key==="ArrowUp")e=ma-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=et.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),vl(Math.max(0,Math.min(e,et.length-1)))}function vy(){Mm(),hn?.disconnect(),hn=null,bn?.disconnect(),bn=null,hl=null,bo?.disconnect(),bo=null,ho?.(),ho=null,ur=null,je?.remove(),je=null,xo=null,yn=null,da=null}var Am=w({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:ml,cleanupSelectors:[`#${xm}`],settings:ha,start(){$t=!0,pa=R(),k(ml,bm),sa=new AbortController;let{signal:t}=sa;window.addEventListener("keydown",yy,{signal:t}),window.addEventListener("popstate",ee,{signal:t}),window.visualViewport?.addEventListener("resize",Al,{signal:t}),document.addEventListener("visibilitychange",()=>{$t&&(Mt&&(cancelAnimationFrame(Mt),Mt=0),pe&&(cancelAnimationFrame(pe),pe=0),xl())},{signal:t}),pl=Et(hy),fl=ct({onTick(){if(z()){ee();return}lr&&!wo()&&(lr=!1),ee()},onFall(e){Sm(e.conversationId),ee()},onContext(e,n){if(!V(n,e)){cr.clear(),yo.clear(),vn="",ge=!1;let r=R();for(let o of[...ne])o!==r&&ne.delete(o);lr=!0}ee()}}),El(),ee(),l0.debug("navigator started")},stop(){$t=!1,Mt&&cancelAnimationFrame(Mt),Mt=0,pe&&cancelAnimationFrame(pe),pe=0,sa?.abort(),sa=null,fl?.(),fl=null,pl?.(),pl=null,ne.clear(),ge=!1,lr=!1,ua=0,vy(),cr.clear(),yo.clear(),et=[],vn="",T(ml)},onSettingsChange(){vn="",ee()}});var Hm=`.bloom-ts {
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
`;function Im(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Nm(t){try{return new Date(t).toISOString()}catch{return""}}var Om=new M("MessageTimestamps"),Rm="messageTimestamps",wa="bloom-ts",Pm=1500,Ey="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",dr=C({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),mr=new Map,Sn=!1,Ct=0,Ge=null,Il=null,Hl=null,Ea=null,So=null,Lo=!1,En=!1;function Bm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Rl(){let t=dr.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Dm(){let t={...Rl()};for(let[n,r]of mr)t[n]=r;let e=Object.keys(t);if(e.length>Pm){let n=e.slice(e.length-Pm),r={};for(let o of n)r[o]=t[o];dr.store.stamps=r;return}dr.store.stamps=t}var wy=gc(Dm,500);function qm(t,e){!t||!e||mr.get(t)===e||(mr.set(t,e),wy(),wn())}function Sy(t){return t?mr.get(t)??Rl()[t]??Mi(t)??null:null}function Ly(t){Sn&&t.type==="message-time"&&qm(t.messageId,t.createTime)}function Ty(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function ky(){let t=Bm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Ey)||e.push(n)}catch{}return e}function My(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Nl(){if(!Sn)return;let t=dr.store.hideOwnMessages===!0,e=dr.store.showDate!==!1,n=K();En&&!z()&&(En=!1),En&&(n?Lo=!1:En=!1);let r=En?!1:n,o=ky();Ge?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=Ty(i),c=i.querySelector(`:scope > .${wa}`);if(t&&l==="user"){c?.remove();return}if(My(i)){c?.remove();return}let u=Sy(s);if(!u&&s&&(r||Lo)&&a>=o.length-2&&(u=Date.now(),qm(s,u)),!u){c?.remove();return}let d=Im(u,e);if(!d){c?.remove();return}let m=c;m||(m=document.createElement("time"),m.className=wa,m.setAttribute("aria-hidden","true"),i.insertBefore(m,i.firstChild)),m.textContent!==d&&(m.textContent=d);let g=Nm(u);g&&m.getAttribute("datetime")!==g&&m.setAttribute("datetime",g)})}catch(i){Om.debug("paint failed",i)}Lo=r,$m()}function wn(){if(Sn){if(document.hidden){Ct&&(cancelAnimationFrame(Ct),Ct=0),Nl();return}Ct||(Ct=requestAnimationFrame(()=>{Ct=0,Sn&&Nl()}))}}function $m(){let t=Bm();if(!(Ge&&Il===t&&t?.isConnected)){if(Ge?.disconnect(),Il=t,!t||t===document.body){Ge=null;return}Ge=new MutationObserver(()=>wn()),Ge.observe(t,{childList:!0,subtree:!0})}}var _m=w({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${wa}`],settings:dr,start(){Sn=!0,k(Rm,Hm);let t=Rl();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&mr.set(e,n);Hl=Et(Ly),Ea?.(),Ea=ct({onTick:wn,onFall:wn,onContext(e,n){V(n,e)||(En=!0,Lo=!1),wn()}}),So?.abort(),So=new AbortController,document.addEventListener("visibilitychange",()=>{Sn&&(Ct&&(cancelAnimationFrame(Ct),Ct=0),Nl())},{signal:So.signal}),$m(),wn(),Om.debug("timestamp watch started")},stop(){Sn=!1,Ct&&cancelAnimationFrame(Ct),Ct=0,So?.abort(),So=null,Ge?.disconnect(),Ge=null,Il=null,Ea?.(),Ea=null,Hl?.(),Hl=null,En=!1,Lo=!1,Dm(),mr.clear(),document.querySelectorAll(`.${wa}`).forEach(t=>t.remove()),T(Rm)},onSettingsChange:wn});var Pl="streamerMode",Cy="filter:blur(6px)!important;transition:filter .2s ease",Ay="filter:none!important",fr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],pr=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function At(t,e){return t.map(n=>`${n} ${e}`)}var Ln=C({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function gr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Cy}}${e?`${r}{${Ay}}`:""}`}function Fm(){let t=[];if(Ln.store.conversations!==!1&&(t.push(gr([...At(pr,'a[href^="/c/"]'),...At(pr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Ln.store.projects!==!1&&(t.push(gr([...At(pr,'a[href*="/project"]'),...At(pr,'a[href*="/g/g-p-"]'),...At(pr,'[data-testid="project-name"]'),...At(pr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Ln.store.headerTitle!==!1&&t.push(gr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Ln.store.accountAvatar!==!1&&t.push(gr([...At(fr,"img"),...At(fr,'[class*="avatar"]'),...At(fr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Ln.store.accountName!==!1&&t.push(gr([...At(fr,".min-w-0 > .truncate"),...At(fr,".min-w-0.flex-1 .truncate")],!1)),Ln.store.accountEmail!==!1&&t.push(gr([...At(fr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){T(Pl);return}k(Pl,t.join(`
`))}var zm=w({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Ln,start:Fm,onSettingsChange:Fm,stop(){T(Pl)}});var jm=`.bloom-gc-panel {
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
}`;var Iy=new M("GreetingCustomizer"),br="greetingCustomizer",Gm="greetingCustomizerUi",To=100,Bl=30,Ny=120,Ry=1e3,Py=50,Oy=40,By=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),ko=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ma=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Dy(t){return!!t?.closest(By)}function Wm(t){return!!(Dy(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Ro(t){try{for(let e of document.querySelectorAll(t))if(!Wm(e))return e}catch{}return null}function Ol(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Ro(e))return e;return t}var Ym=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],nt=C({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Qy},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Ym},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),re=!1,vr=!1,kn=null,La,Mo,hr,Co,Ta=0,Sa=null,yr=null,Ao=null,Ho=null,Io=null,ka=null;function he(){let t=location.pathname||"/";return t==="/"||t===""}function Tn(){let t=nt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Ym.slice()}function No(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Um(t){nt.store.greetings=t.slice(0,Bl)}function Po(){let t=String(nt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function qy(){return nt.store.order==="random"?"random":"sequential"}function $y(){return ot(Number(nt.store.intervalSec??10),1,3600)*1e3}function _y(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Fy(){return!!Ro(Ma)}function Ca(){return!!(Ro(Ma)||Ro(ko))}function zy(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Fy()?Ol(Ma):Ro(ko)?Ol(ko):Ol(Ma),i=e?`${ko}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function jy(t,e){if(t<=0)return 0;if(t===1)return Number(nt.plain.index)!==0&&(nt.store.index=0),Number(nt.plain.lastRandom)!==0&&(nt.store.lastRandom=0),0;let n=Number(nt.plain.index),r=Number(nt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(qy()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return nt.store.index=s,nt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return nt.store.index=i,i}function be(t){if(!re)return;if(!he()){T(br);return}let e=Tn().map(No).filter(Boolean);if(!e.length){T(br);return}let n=jy(e.length,t),r=e[n]??e[0],o=Po()==="manual"&&e.length>1;k(br,zy(_y(r),o)),ka?.()}function Dl(){La!==void 0&&(clearInterval(La),La=void 0)}function ql(){Dl(),!(!re||!he())&&Po()==="interval"&&(Tn().filter(Boolean).length<=1||(La=setInterval(()=>be(!0),$y())))}function $l(){Co!==void 0&&(clearTimeout(Co),Co=void 0),Ta=0}function Km(){if($l(),!re||!he())return;Ta=Oy;let t=()=>{if(Co=void 0,!(!re||!he())){if(Ca()){Po()==="refresh"&&!vr?(vr=!0,be(!0)):be(!1),ql();return}Ta-=1,Ta>0&&(Co=setTimeout(t,Py))}};t()}function _l(){if(kn===!0){Ca()?be(!1):Km();return}kn=!0,vr=!1,Po()==="refresh"?(vr=!0,be(!0)):be(!1),ql(),Ca()||Km()}function Fl(){kn=!1,vr=!1,Dl(),$l(),T(br)}function Aa(){hr===void 0&&(hr=window.setTimeout(()=>{hr=void 0,re&&(he()?_l():kn!==!1&&Fl())},Ny))}function Gy(){yr||(yr=history.pushState.bind(history),Ao=history.replaceState.bind(history),Ho=function(...e){let n=yr(...e);return Aa(),n},Io=function(...e){let n=Ao(...e);return Aa(),n},history.pushState=Ho,history.replaceState=Io)}function Uy(){Ho&&history.pushState===Ho&&yr&&(history.pushState=yr),Io&&history.replaceState===Io&&Ao&&(history.replaceState=Ao),yr=null,Ao=null,Ho=null,Io=null}function Ky(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Aa)}function Vy(t){if(!re||!he()||Po()!=="manual"||Tn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(ko);if(!n||Wm(n))return;let r=window.getSelection?.();r&&String(r).trim()||be(!0)}function Wy(){Mo===void 0&&(Mo=setInterval(()=>{if(!re)return;let t=he();if(t!==(kn===!0)){t?_l():Fl();return}t&&Ca()&&be(!1)},Ry))}function Yy(){Mo!==void 0&&(clearInterval(Mo),Mo=void 0)}function Vm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var Xy="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Zy="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Jy(t,e){let n=No(t);return n?n.length>To?`Keep it to ${To} characters.`:Tn().length+(e?1:0)>Bl?`At most ${Bl} greetings.`:null:"Enter a greeting."}function Qy(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=Tn(),s=Number(nt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=To,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let f=l.querySelector(".bloom-gc-count");f&&(f.textContent=`${No(e).length}/${To}`);let E=l.querySelector(".bloom-gc-error");E&&(E.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${No(e).length}/${To}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=r;let g=document.createElement("div");if(g.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,e="",r="",i()}),g.appendChild(f)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let f=n<0,E=Jy(e,f);if(E){r=E,i();return}let h=No(e),x=Tn().slice();n>=0&&n<x.length?x[n]=h:x.push(h),Um(x),n=-1,e="",r="",i()}),g.appendChild(p),u.append(d,m,g),l.appendChild(u),t.appendChild(l),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",t.appendChild(f);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((f,E)=>{let h=document.createElement("div");h.className="bloom-gc-item",E===s&&(h.dataset.active="true");let x=document.createElement("button");x.type="button",x.className=`bloom-gc-body${o===E?"":" bloom-gc-clamp"}`,x.textContent=f,x.addEventListener("click",()=>{o=o===E?-1:E,i()});let mt=document.createElement("div");mt.className="bloom-gc-item-actions";let ft=Vm("Edit",Xy);ft.addEventListener("click",()=>{n=E,e=f,r="",i()});let X=Vm("Delete",Zy);X.addEventListener("click",()=>{let O=Tn().filter((lt,yt)=>yt!==E);Um(O),n===E?(n=-1,e=""):n>E&&(n-=1),i()}),mt.append(ft,X),h.append(x,mt),b.appendChild(h)}),t.appendChild(b)};return ka=i,i(),()=>{ka===i&&(ka=null),t.replaceChildren()}}var Xm=w({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Gm,settings:nt,start(){re=!0,k(Gm,jm),Gy(),Sa=new AbortController;let{signal:t}=Sa;window.addEventListener("popstate",Aa,{signal:t}),document.addEventListener("click",Ky,{capture:!0,signal:t}),document.addEventListener("click",Vy,{signal:t}),Wy(),kn=null,he()?_l():Fl(),Iy.debug("started")},stop(){re=!1,Sa?.abort(),Sa=null,hr!==void 0&&(clearTimeout(hr),hr=void 0),Dl(),$l(),Yy(),Uy(),T(br),vr=!1,kn=null},onSettingsChange(){re&&(he()?(be(!1),ql()):T(br))}});function tv(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Ha(t){try{return await createImageBitmap(t)}catch{return null}}async function ev(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Ia(t){if(t.startsWith("data:")){let e=tv(t);if(e){let n=await Ha(e);if(n)return n}return ev(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Ha(await e.blob()):null}catch{return null}}var Ra="data-bloom-csi-slot",nv="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",rv=/\bsize-(?:[6-9]|10)\b/,ov=/\b(?:h|w)-(?:[6-9]|10)\b/,iv=/^(plus|pro|free|team|go|business|enterprise)$/i,av=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Na(t){return t.getAttribute("class")||""}function Jm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||rv.test(t)?!0:ov.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function sv(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Qm(e)}function Qm(t){return iv.test(String(t??"").replace(/\s+/g,""))}function oe(t){return!!t?.closest(nv)}function Pa(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Oo(t){let e=Na(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Qm(t.textContent||"")}function Oa(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Bo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function lv(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function tf(t){if(oe(t)||Oa(t)||Bo(t)||Oo(t)||Pa(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function ef(t){return oe(t)||Oa(t)||Bo(t)||Oo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:sv(t.textContent||"")}function nf(t){return oe(t)||Bo(t)||Pa(t)||Oo(t)?!1:Jm(Na(t))||ef(t)?!0:tf(t)}function Zm(t){return!(oe(t)||Pa(t)||Bo(t)||Oo(t)||Oa(t))}function Mn(t,e){let n=Oa(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Bo(n)||Pa(n)||Oo(n));)oe(n)||(r=n),n=n.parentElement;return r}function cv(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||oe(e))continue;if(lv(Na(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Zm(o))){if(nf(o)||Jm(Na(o)))return Mn(o,t)??o;r.push(o)}if(r.length===1)return Mn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Zm(r))return Mn(r,t)??r}}return null}function uv(t){let e=t.querySelectorAll(av);for(let n of e)if(nf(n))return Mn(n,t)??n;return null}function dv(t){for(let e of t.querySelectorAll("span, div, p, i"))if(ef(e))return Mn(e,t)??e;return null}function mv(t){for(let e of t.querySelectorAll("*"))if(tf(e))return Mn(e,t)??e;return null}function rf(t,e){if(oe(t))return null;if(e&&!oe(e)&&t.contains(e)){let n=Mn(e,t);if(n)return n}return cv(t)??uv(t)??dv(t)??mv(t)}function of(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var xr="data-bloom-csi",Ba="data-bloom-csi-orig",Cn=new Set,af=null;function jl(t){af=t}function sf(t){return`url(${JSON.stringify(t)})`}function Da(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Gl(t,e,n){let r=sf(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function lf(t,e=Ra){let n=sf(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function fv(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Er(t){t.removeEventListener("error",zl);let e=t.getAttribute(Ba);t.removeAttribute(xr),t.removeAttribute(Ba),e&&t.getAttribute("src")!==e&&(t.src=e)}function zl(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Cn.add(n),Er(e),af?.()}function cf(t,e){if(!e||Cn.has(e)){Er(t);return}fv(t);let n=t.getAttribute("src")??"";if(t.getAttribute(xr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Ba)&&t.setAttribute(Ba,n);t.setAttribute(xr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",zl),t.addEventListener("error",zl),n!==e&&(t.src=e)}var uf=`/*
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
`;var df=new M("CustomSidebarIdentity"),mf="customSidebarIdentityUi",gf="customSidebarIdentity",gv="bloom-csi-face",bv="bloom-csi-name",wr=Ra,hv=1024,qa=256,bf=24,hf=64,yf=40,Wl=1,Yl=4,Do=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Ul=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],L=C({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Ov},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:bf,max:hf,default:yf},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Hn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function yv(){return String(L.store.displayName??"").trim()}function Fa(t,e,n,r,o){let i=ot(n,Wl,Yl),a=Math.min(t,e)/i,s=ot(r,a/2,Math.max(a/2,t-a/2)),l=ot(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function vv(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Xl(t){let e=Math.min(1,hv/Math.max(t.width,t.height));return vv(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function xv(t,e,n,r){let{side:o,x:i,y:a}=Fa(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=qa,s.height=qa;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,qa,qa);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Ev(t){let e=await Ha(t);if(!e)return null;let n=Xl(e);return e.close(),n}async function Jl(t,e,n,r){let o=await Ia(t);if(!o)return null;let i=xv(o,e,n,r);return o.close(),i}function Ql(){L.store.cropX=.5,L.store.cropY=.5,L.store.cropZoom=1}function ff(){L.store.avatarUrl="",L.store.avatarSource="",Ql()}var pf=0;async function Zl(t){let e=++pf;Ql(),L.store.avatarSource=t;let n=await Jl(t,.5,.5,1);return e!==pf?!1:(n&&(L.store.avatarUrl=n),!!n)}function qo(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Kl(t){let e=qo(t);if(!e)return!1;let n=await Ev(e);return n?Zl(n):!1}var Ht=!1,Sr=!1,Lr=0,za=0,$a=null,Ue=new Map,Tr=null,ye=null,ja=null,ie=null,Ga=null;function Ua(t){let e=String(t??"").trim();if(!e||Cn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function vf(){return Ua(L.store.avatarUrl)??Ua(L.store.avatarSource)}var _a=!1,Vl=new Set;function xf(){let t=Ua(L.store.avatarSource);if(!t?.startsWith("data:image/")||Ua(L.store.avatarUrl)?.startsWith("data:image/")||_a||Vl.has(t))return;_a=!0;let e=Hn(L.store.cropX,.5),n=Hn(L.store.cropY,.5),r=Hn(L.store.cropZoom,1);Jl(t,e,n,r).then(o=>{if(_a=!1,!o){Vl.add(t);return}Ht&&(L.store.avatarUrl=o,Ka())}).catch(()=>{_a=!1,Vl.add(t)})}function An(t,e){return t.map(n=>`${n} ${e}`)}function wv(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Sv(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=wv(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Ef(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||oe(n)||n.closest(".min-w-0")||e.push(n);return e}function Lv(t){let e=Ef(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function tc(){let t=[],e=Ye();e&&t.push(e);let n=Dn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Do.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function wf(t,e){let n=Lv(t);if(n)cf(n,e);else for(let o of Ef(t))Er(o);let r=rf(t,n);for(let o of t.querySelectorAll(`[${wr}]`))o!==r&&o.removeAttribute(wr);r&&r.setAttribute(wr,"")}function Tv(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function kv(t,e){let n=Tv(t);n&&wf(n,e)}function Mv(){for(let t of document.querySelectorAll(`img[${xr}]`))Er(t);for(let t of document.querySelectorAll(`[${wr}]`))t.removeAttribute(wr)}function Cv(){let t=ot(Math.round(Hn(L.store.avatarSize,yf)),bf,hf),e=vf(),n=yv(),r=L.store.applyToMenu!==!1,o=[],i=[...An(Do,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...An(Ul,"> :first-child img"));let a=[...An(Do,".min-w-0 > .truncate"),...An(Do,".min-w-0.flex-1 .truncate")];r&&a.push(...An(Ul,"> :first-child .truncate"));let s=of(wr);o.push(Da([...s.flatMap(l=>An(Do,l))].join(","),t)),o.push(Da(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(Da(s.flatMap(l=>An(Ul,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Gl(i.join(","),e,t)),o.push(Gl("#stage-sidebar-tiny-bar img",e,32)),o.push(lf(e))),n&&o.push(Sv(a,n)),k(gf,o.join(""))}function Av(){let t=vf(),e=tc();for(let n of e)wf(n,t);if(L.store.applyToMenu!==!1){let n=qn();n&&kv(n,t)}for(let n of document.querySelectorAll(`img[${xr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Er(n)}function Ka(){if(!(!Ht||Sr)){Sr=!0;for(let t of Ue.values())t.disconnect();ye?.disconnect(),ie?.disconnect();try{Cv(),Av()}finally{Sr=!1,ec(),Rv(),Tr?.isConnected&&Sf(Tr),xf()}}}function $o(){!Ht||Lr||(Lr=requestAnimationFrame(()=>{Lr=0,Ka()}))}function Hv(){Sr||!Ht||$o()}function Iv(t){if(Ue.has(t))return;let e=new MutationObserver(Hv);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ue.set(t,e)}function Nv(t){Ue.get(t)?.disconnect(),Ue.delete(t)}function ec(){let t=new Set;for(let n of tc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Dn();e&&t.add(e);for(let n of[...Ue.keys()])(!t.has(n)||!n.isConnected)&&Nv(n);for(let n of t)n.isConnected&&Iv(n)}function Rv(){let t=ri();if(!t){ie?.disconnect(),ie=null,ja=null;return}if(ja===t&&ie){ie.observe(t,{childList:!0});return}ie?.disconnect(),ja=t,ie=new MutationObserver(()=>{Sr||!Ht||(ec(),$o())}),ie.observe(t,{childList:!0})}function Sf(t){Tr===t&&ye||(ye?.disconnect(),Tr=t,ye=new MutationObserver(()=>{if(!t.isConnected){ye?.disconnect(),ye=null,Tr=null;return}Sr||!Ht||$o()}),ye.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Lf(t){if(!Ht||L.store.applyToMenu===!1)return;let e=qn();if(e){Sf(e),$o();return}t<=0||requestAnimationFrame(()=>Lf(t-1))}function Tf(t){Ht&&(Ka(),!(tc().length||t<=0)&&(za=requestAnimationFrame(()=>Tf(t-1))))}function Pv(t){Ht&&L.store.applyToMenu!==!1&&(!oi(t)&&!qn()||Lf(10))}function Ov(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let m=document.createElement("div");m.className="bloom-csi-crop";let g=document.createElement("div");g.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,g.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let f=document.createElement("input");f.type="range",f.className="bloom-csi-zoom",f.min=String(Wl),f.max=String(Yl),f.step="0.05",f.setAttribute("aria-label","Zoom");let E=document.createElement("span");E.className="bloom-csi-zoom-val";let h=document.createElement("button");h.type="button",h.className="bloom-csi-btn",h.textContent="Reset",b.append(f,E,h);let x=document.createElement("p");x.className="bloom-csi-hint",x.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",m.append(g,b,x),t.append(u,d,m);function mt(){let v=String(L.store.avatarSource??""),I=String(L.store.avatarUrl??"");return v.startsWith("data:image/")?v:I.startsWith("data:image/")?I:""}function ft(v,I,y){if(!a)return i.x=v,i.y=I,i.zoom=ot(y,Wl,Yl),i;let A=Fa(a.w,a.h,y,v*a.w,I*a.h);return i.x=A.x/a.w,i.y=A.y/a.h,i.zoom=A.z,i}function X(){f.value=String(i.zoom),E.textContent=`${Math.round(i.zoom*100)}%`;let v=a?Fa(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;v&&a&&(p.style.width=`${a.w/v.side*100}%`,p.style.height=`${a.h/v.side*100}%`,p.style.left=`${(.5-v.x/v.side)*100}%`,p.style.top=`${(.5-v.y/v.side)*100}%`)}function O(v=!1){let I=mt(),y=String(L.store.avatarUrl??"").trim(),A=!!I;s.hidden=!y&&!I,(I||y)&&(s.src=I||y),document.activeElement!==l&&(l.value=A?"":y),l.placeholder=A?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",m.hidden=!I,d.hidden=!(e&&/^https?:\/\//.test(y)&&!I),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",I&&(v&&(i.x=Hn(L.store.cropX,.5),i.y=Hn(L.store.cropY,.5),i.zoom=Hn(L.store.cropZoom,1)),p.getAttribute("src")!==I&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},ft(i.x,i.y,i.zoom),X()},p.src=I),X())}function lt(v,I,y,A=!1){ft(v,I,y),X();let pt=mt(),vt=()=>{L.store.cropX=i.x,L.store.cropY=i.y,L.store.cropZoom=i.zoom,pt&&Jl(pt,i.x,i.y,i.zoom).then(H=>{H&&(L.store.avatarUrl=H)})};r&&clearTimeout(r),A?vt():r=setTimeout(vt,80)}function yt(v){L.store.avatarUrl=v;let I=v.trim();if(n&&clearTimeout(n),!I){L.store.avatarSource="",Ql(),e=!1,O(!0);return}if(I.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Ia(I).then(y=>{if(!y)return;let A=Xl(y);y.close(),A&&Zl(A).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(I)){e=!1,L.store.avatarSource="",n=setTimeout(()=>{Ia(I).then(y=>{if(!y){e=!0,O(!0);return}let A=Xl(y);y.close(),A?(e=!1,Zl(A).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,L.store.avatarSource="",O(!0)}u.addEventListener("paste",v=>{qo(v.clipboardData)&&(v.preventDefault(),e=!1,Kl(v.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",v=>{qo(v.dataTransfer)&&v.preventDefault()}),u.addEventListener("drop",v=>{qo(v.dataTransfer)&&(v.preventDefault(),e=!1,Kl(v.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>yt(l.value)),l.addEventListener("paste",v=>{qo(v.clipboardData)&&(v.preventDefault(),e=!1,Kl(v.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",v=>{mt()&&!l.value&&(v.key==="Backspace"||v.key==="Delete")&&(ff(),e=!1,O(!0))}),c.addEventListener("click",()=>{ff(),e=!1,O(!0)}),g.addEventListener("pointerdown",v=>{v.button===0&&(g.setPointerCapture(v.pointerId),o.on=!0,o.px=v.clientX,o.py=v.clientY,o.x=i.x,o.y=i.y)}),g.addEventListener("pointermove",v=>{if(!o.on||!a)return;let I=g.clientWidth;if(!I)return;let{side:y}=Fa(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);ft(o.x-(v.clientX-o.px)*(y/I)/a.w,o.y-(v.clientY-o.py)*(y/I)/a.h,i.zoom),X()}),g.addEventListener("pointerup",()=>{o.on&&(o.on=!1,lt(i.x,i.y,i.zoom,!0))}),g.addEventListener("pointercancel",()=>{o.on=!1}),g.addEventListener("wheel",v=>{v.preventDefault(),lt(i.x,i.y,i.zoom*(v.deltaY<0?1.08:1/1.08))},{passive:!1}),f.addEventListener("input",()=>lt(i.x,i.y,Number(f.value))),f.addEventListener("change",()=>lt(i.x,i.y,Number(f.value),!0)),h.addEventListener("click",()=>lt(.5,.5,1,!0));let _o=()=>O(!1);return Ga=_o,O(!0),()=>{Ga===_o&&(Ga=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var kf=w({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:mf,cleanupSelectors:[`.${gv}`,`.${bv}`],settings:L,start(){Ht=!0,Cn.clear(),jl($o),k(mf,uf),$a=new AbortController,document.addEventListener("click",Pv,{signal:$a.signal}),Tf(40),xf(),df.debug("started")},onSettingsChange(){Cn.clear(),Ga?.(),Ht&&(ec(),Ka())},stop(){Ht=!1,$a?.abort(),$a=null,Lr&&cancelAnimationFrame(Lr),Lr=0,za&&cancelAnimationFrame(za),za=0;for(let t of Ue.values())t.disconnect();Ue.clear(),ye?.disconnect(),ye=null,Tr=null,ie?.disconnect(),ie=null,ja=null,Mv(),T(gf),jl(null),Cn.clear(),df.debug("stopped")}});var kr=new M("Bloom"),Mf=!1,Bv=Date.now(),Dv=[nu,Vu,nd,id,ud,gd,Cd,Hd,Rd,Qd,am,fm,gm,Am,_m,zm,Xm,kf];function Va(t){return new Promise(e=>setTimeout(e,t))}function qv(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function $v(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Af=8e3,Cf=300,_v=250;async function Fv(){if(We())return await Va(Cf),!0;for(;Date.now()-Bv<Af;)if(await Va(_v),We())return await Va(Cf),!0;return We()||rs()}function nc(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function zv(){if(nc())return!0;let t=Date.now()+Af;for(;Date.now()<t;)if(await Va(100),nc())return!0;return nc()}function jv(){try{GM_registerMenuCommand?.("Bloom++ settings",eu)}catch{}}function Gv(){Xo(()=>{Cr("HostShell"),kr.info("host shell",xt)}),Zo(()=>{kr.info("idle ready",xt)}),Jo(()=>{Xa(),Cr("HostReady"),kr.info("chrome ready",xt)})}async function rc(){await yc()}async function oc(){if(Mf)return;Mf=!0;for(let n of Dv)try{Tc(n),Oc(n)}catch(r){kr.error("register failed",n.name,r)}Cr("Init"),jv(),Gv();let t=()=>Cr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await qv(),Xa(),kr.info("styles ready",xt),await $v(),zv().then(n=>{n&&Qo()}),!await Fv()){kr.warn("late islands not detected; starting default plugins",xt),Pn(),ti();return}await Rc()}var Hf=typeof unsafeWindow<"u"?unsafeWindow:window,Uv=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Uv){let t=Hf.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",xt);try{Object.defineProperty(Hf,"Bloom",{value:ic,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}rc().then(()=>oc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
