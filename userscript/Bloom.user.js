// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.88
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

/* Bloom++ [20260924] v1.4.88. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var ff=Object.defineProperty;var pf=(t,e)=>{for(var n in e)ff(t,n,{get:e[n],enumerable:!0})};var zl={};pf(zl,{REPO_URL:()=>xc,Settings:()=>D,VERSION:()=>ct,contextKeyFromUrl:()=>ee,conversationTitle:()=>Hn,conversationToken:()=>St,currentConversationId:()=>C,hasDraftText:()=>Rt,hasErrorToast:()=>Dt,hasLateIslands:()=>Be,init:()=>Fl,initSettings:()=>ql,isDocumentInteractive:()=>wc,isStreaming:()=>U,isUserDraftEmpty:()=>ye,messageCreateTime:()=>ci,plugins:()=>Jt,requestChromeReady:()=>Bo,requestIdleReady:()=>En,requestShellReady:()=>Oo,setEditorText:()=>te,subscribeHarvest:()=>ut,watchStreamingEdge:()=>et,whenChromeReady:()=>Po,whenIdleReady:()=>Ro,whenShellReady:()=>Io});var de=new Map,So=!1;function gf(){return document.getElementById("bloom-root")?.shadowRoot??null}function Vl(){return document.head??null}function yn(){let t=gf();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=bf()}function Ma(t,e){if(!So)return;let n=Vl();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),yn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,yn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,yn()}function w(t,e){let n=de.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},de.set(t,n)),So&&Ma(t,n)}function Aa(){if(!Vl())return!1;So=!0;for(let[e,n]of de)Ma(e,n);return yn(),!0}function Wl(t){let e=de.get(t);e&&(e.disabled=!1,So&&Ma(t,e))}function Yl(t){let e=de.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),yn())}function E(t){let e=de.get(t);e&&(e.el?.remove(),de.delete(t),yn())}function bf(){return Array.from(de.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var Ha=new Map;function vn(t,e){let n=Ha.get(t);return n||(n=new Set,Ha.set(t,n)),n.add(e),()=>n.delete(e)}function Pe(t,e){let n=Ha.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var hf="bloompp";function Xl(){return new Promise((t,e)=>{let n=indexedDB.open(hf,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Zl(t){try{let e=await Xl();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Jl(t,e){try{let n=await Xl();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function Z(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function J(t,e,n){return Math.min(n,Math.max(e,t))}function Ql(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function tc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function ec(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Lo=new S("SettingsStore"),me="BloomSettings",yf=100;function To(t){return t!=null&&typeof t.then=="function"}function vf(t){if(t==null||To(t))return null;if(Z(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(Z(e)&&!To(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return Z(n)&&!To(n)?n:null}return null}catch{return null}}function Co(t){let e=vf(t);if(!e)return null;let n=e.plugins;return!Z(n)||To(n)||Object.keys(n).length===0?null:e}function Ia(t){return Z(t)?t:null}function Na(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:Z(t)?Object.keys(t).length===0:!1}function xf(t){return Na(t)?0:Array.isArray(t)?12+Math.min(t.length,40):Z(t)?12+Math.min(Object.keys(t).length,40):3}function Oe(t){if(!t)return-1;let e=t.plugins;if(!Z(e))return-1;let n=0;for(let r of Object.values(e)){let o=Ia(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=xf(a))}return n}function nc(t){let e=t.plugins;if(!Z(e))return 0;let n=0;for(let r of Object.values(e))Ia(r)?.enabled===!0&&n++;return n}function rc(t){let e=t.map((i,a)=>({bag:i,index:a,score:Oe(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=nc(a.bag)-nc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!Z(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(Z(a))for(let[s,l]of Object.entries(a)){let c=Ia(l);if(!c)continue;if(!Z(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,m]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&m===!0&&(u.enabled=!0);continue}Na(u[d])&&!Na(m)&&(u[d]=structuredClone(m))}}}let o=r.Settings;return Z(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Oe(n)}}var ko=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let m=u(d);m!==void 0&&(i[a]=m,s=m);break}}}return Z(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Lo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},yf))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(me,this.plain)}catch{try{GM_setValue(me,e)}catch(n){Lo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(me,e)}catch{}Jl(me,e).catch(n=>Lo.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){Lo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Ql(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Ef=new S("Settings"),wf={plugins:{}},D=new ko(structuredClone(wf)),Sf=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Lf(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?fe(n):{}},get plain(){let n=e.pluginName;return n?D.plain.plugins[n]??{}:{}}};return e}async function Tf(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function oc(){let t=Co(await Tf(me)),e=Co(await Zl(me)),n=null;try{n=Co(localStorage.getItem(me))}catch{n=null}let r=rc([t,e,n]);if(r){let o=r.bag.plugins;o&&(D.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);Ef.info("Loaded settings from",i,"richness",r.score,"gm",Oe(t),"idb",Oe(e),"ls",Oe(n))}D.releasePersist(),r&&(r.index!==0||r.score>Oe(t))&&D.persistLoadedBag()}function fe(t){return D.plain.plugins[t]||(D.plain.plugins[t]={}),D.store.plugins[t]}function ic(t,e){e&&(e.pluginName=t,fe(t),D.setDefaultGetter(Sf(t),n=>{if(n!=="enabled")return Lf(e.def,n)}))}function ac(){return fe("Settings")}function Mo(){return ac().pinnedPlugins??[]}function sc(t){return Mo().includes(t)}function lc(t){let e=Mo(),n=e.includes(t);return D.store.plugins.Settings={...D.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function Ao(){return ac().starredPlugins??[]}function cc(t){return Ao().includes(t)}function uc(t){let e=Ao(),n=e.includes(t);return D.store.plugins.Settings={...D.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var Ho=new S("PluginManager"),Jt={},pr=new Set;function dc(t){if(Jt[t.name]){Ho.warn("Duplicate plugin",t.name);return}Jt[t.name]=t,ic(t.name,t.settings)}function xn(t){let e=Jt[t];if(!e)return!1;if(e.required)return!0;let n=D.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function mc(t){let e=Jt[t];if(!e||e.required)return;let n=!xn(t);fe(t),D.store.plugins[t].enabled=n,n?fc(e):kf(e),Pe("pluginToggle",{name:t,enabled:n})}function fc(t,e=!1){if(!pr.has(t.name)&&xn(t.name))try{t.managedStyle&&Wl(t.managedStyle),t.start?.(),pr.add(t.name),t.settings&&D.addPrefixChangeListener(`plugins.${t.name}.`,()=>{pr.has(t.name)&&t.onSettingsChange?.()}),e||Ho.debug("Started",t.name)}catch(n){Ho.error("Failed to start",t.name,n)}}function kf(t){if(pr.has(t.name)){try{t.stop?.()}catch(e){Ho.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Yl(t.managedStyle),E(t.managedStyle)),pr.delete(t.name)}}function gr(t){for(let e of Object.values(Jt))(e.startAt??"DOMContentLoaded")===t&&fc(e)}var br=!1,No=!1,Ra=!1,gc=[],bc=[],hc=[];function Pa(t){let e=t.splice(0);for(let n of e)n()}function hr(){br||(br=!0,Pa(gc))}function Oa(){No||(No=!0,br||hr(),Pa(bc))}function yc(){Ra||(Ra=!0,br||hr(),No||Oa(),Pa(hc))}function Io(t){br?t():gc.push(t)}function Ro(t){No?t():bc.push(t)}function Po(t){Ra?t():hc.push(t)}function Oo(){hr()}function En(){hr(),Oa()}function Bo(){yc()}function pc(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function vc(){await pc(4e3),hr(),await pc(4e3),Oa(),yc()}var v={p:"0-V-linuxdo"},ct="[20260924] v1.4.88",xc="https://github.com/0-V-linuxdo/Bloom";var Cf={BetterNavigator:1790240385e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789969779e3,ComposerOpacity:1789969779e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789969779e3,InputHistory:1789969779e3,MessageTimestamps:1790230458e3,NoDictation:1789969779e3,NoShareLink:1789969779e3,NoSidebarIdentity:1789969779e3,PromptQueue:1790243573e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789969779e3,WiderChat:1789969779e3};function Ec(t){let e=Cf[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function Mf(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Af(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ba(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Be(){return Ba()?Mf()||Af():!1}function wc(){return Be()}var Hf=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Sc=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Nf=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),If="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Sn(t){return t.id==="bloom-root"||!!t.closest(If)}function Lc(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Do(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Da(t){if(!(t instanceof HTMLElement)||!t.isConnected||Sn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Do(e)?!1:t.getClientRects().length>0}function wn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Rf(){let t=[];for(let e of document.querySelectorAll(Hf))!(e instanceof HTMLElement)||!e.isConnected||Sn(e)||t.push(e);return t}function $o(t){if(!t.isConnected||Sn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function De(){return Rf().filter($o)[0]??null}function Ln(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Sn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function $a(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Sn(n)&&!wn(n)&&n.parentElement&&!wn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!wn(r)&&!Sn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!wn(r.parentElement))return r}return e}function Tn(){let t=document.querySelectorAll(Sc);for(let n of t)if(Da(n)&&!Do(n)&&Lc(n))return n;let e=document.querySelectorAll(Nf);for(let n of e){if(!Da(n)||!Lc(n)||Do(n))continue;let r=n.querySelector(Sc);return Da(r)&&!Do(r)?r:n}return null}function _o(){let t=De();if(t){let e=$a(t),n=e.parentElement;if(n&&!wn(n))return n;if(!wn(e))return e}return Ln()}function qo(t){let e=De();return e?t.composedPath().includes(e):!1}var qa=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Pf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Of(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Bf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function _a(t){let e=Of(t);return e?Bf(e)>.55?"light":"dark":null}function Df(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=_a(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=_a(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=_a(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Fo(t){return t==="auto"?Df():t}function $f(t){try{let e=getComputedStyle(document.documentElement);for(let n of qa){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function zo(t,e,n){let r=Pf[e];if(n){$f(t);for(let o of qa)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of qa)t.style.setProperty(o,r[o])}function Tc(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Fa=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var qf="bloom-root",Nt="bloom-rail-item",Vo="bloom-account-item",_e="bloom-sidebar-panel",kr="bloom-plugin-dialog",ti="bloom-plugin-layer",Wo="bloom-settings-css",Ff=2e3,Mc=null,zf=null,he=!1,Ua=[],jo=null,Yo=null,ge=null,Uo=null,Qt=null,Sr=null,yr,kn=0,Lr=0,vr=0,xr=null,Er=null,Xo=null,Ac=null,wr=null,za=[],Zo=!1,jf=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Gf=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Uf=new Set(["chat","ui","privacy"]),Kf=10080*60*1e3,ei="",Tr="all",Ht="all";function ni(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Hc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Vf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Wf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Yf(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Xf(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Zf={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Jf(t){return t.icon||Zf[t.name]||ni()}function ja(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),zo(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Nc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Jo(){let t="auto",e=Fo(t);ja(Mc,e,!0);let n=document.getElementById(_e);n instanceof HTMLElement&&ja(n,e,!0);let r=document.getElementById(kr);r instanceof HTMLElement&&ja(r,e,!0);let o=document.getElementById(Nt);o instanceof HTMLElement&&Nc(o),Pe("schemeChange",{scheme:e,pref:t})}function Ic(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Rc(){if(w("settings",Fa),document.getElementById(Wo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Wo,t.textContent=Fa,document.head.appendChild(t)}function Qf(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function tp(){for(let t of Ua)t();Ua=[]}function Pc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function ep(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Wa(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function np(t){return Wa(t).length>0}function Ko(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function rp(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=ep(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function op(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(rp(e,n));let i=fe(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Ua.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Ko(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Ko(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Pc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Ko(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function kc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function ip(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=fe(t.name);for(let[n,r]of Wa(t)){if(n==="enabled"||r.type===5)continue;let o=Ko(r);o!==void 0&&(e[n]=o)}Bc(t)}function Oc(t){t.key==="Escape"&&(!document.getElementById(ti)&&!document.getElementById(kr)||(t.stopPropagation(),Cn()))}function ap(){Zo||(document.addEventListener("keydown",Oc),Zo=!0)}function sp(){Zo&&(document.removeEventListener("keydown",Oc),Zo=!1)}function Cn(){tp(),sp(),document.getElementById(ti)?.remove(),document.getElementById(kr)?.remove()}function Bc(t){if(Cn(),!document.body)return;let e=document.createElement("div");e.id=ti,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",be),e.addEventListener("pointerup",be),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Cn()});let n=document.createElement("div");n.id=kr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",be),n.addEventListener("pointerup",be),n.addEventListener("click",be);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Hc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Cn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=kc("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=kc("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Wa(t);if(c.length)for(let[u,d]of c){let m=op(t.name,u,d);m&&l.appendChild(m)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>ip(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),ap(),Jo()}function lp(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Jf(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=cc(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Yf(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let p=uc(t.name);Pe("pluginStar",{name:t.name,starred:p})}),s.appendChild(c),!t.required){let b=sc(t.name),p=document.createElement("button");p.type="button",p.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,p.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),p.innerHTML=Xf(b),p.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let M=lc(t.name);Pe("pluginPin",{name:t.name,pinned:M})}),s.appendChild(p)}if(np(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=Wf(),b.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),Bc(t)}),s.appendChild(b)}let u=Pc(t.name,xn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{mc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let m=document.createElement("div");m.className="bloom-card-separator";let f=document.createElement("div");f.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",f.appendChild(g),e.append(n,m,f),e}function Dc(){return Object.values(Jt).filter(t=>!t.hidden&&t.name!=="Settings")}function cp(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Kf}function $c(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return cp(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Uf.has(r)):n.includes(e)}function up(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function dp(){return ei.trim()?"No plugins match your search.":Ht==="favorites"?"No favorites yet. Star a plugin to see it here.":Ht==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function mp(){let t=Dc();return Gf.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>$c(n,e.id)))}function fp(){if(wr){wr.replaceChildren();for(let t of mp()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Ht===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Ht=t.id,$e()}),wr.appendChild(e)}}}function pp(){let t=Dc();if(Ht==="favorites"){let e=new Set(Ao());t=t.filter(n=>e.has(n.name))}else Ht!=="all"&&(t=t.filter(e=>$c(e,Ht)));return Tr==="enabled"&&(t=t.filter(e=>xn(e.name))),Tr==="disabled"&&(t=t.filter(e=>!xn(e.name))),t}function $e(){if(!xr)return;fp();let t=pp();Xo&&(Xo.placeholder=`Search ${t.length} plugins...`);let e=t,n=ei.trim().toLowerCase();if(n&&(e=e.filter(r=>up(r).includes(n))),Ht==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Ht!=="favorites"){let r=Mo();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}xr.replaceChildren();for(let r of e)xr.appendChild(lp(r));Er&&(Er.hidden=e.length>0,Er.textContent=dp())}function be(t){t.stopPropagation()}function Ga(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ya(){document.getElementById(Nt)?.setAttribute("aria-expanded",he?"true":"false")}function gp(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Xa(){Cn(),ei="",Tr="all",Ht="all",document.getElementById(_e)?.remove(),he=!1,Ya()}function bp(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",be),e.addEventListener("pointerup",be),e.addEventListener("click",be);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=ni();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Vf();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Hc(),d.addEventListener("click",Xa),r.appendChild(o),n.appendChild(r);let m=document.createElement("div");m.className="bloom-plugin-tabs",n.appendChild(m);let f=document.createElement("div");f.className="bloom-search-bar";let g=document.createElement("input");g.type="search",g.className="bloom-search-input",g.setAttribute("aria-label","Search plugins"),g.placeholder="Search plugins...",g.addEventListener("input",()=>{ei=g.value,$e()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let M of jf){let N=document.createElement("option");N.value=M.value,N.textContent=M.label,b.appendChild(N)}b.value=Tr,b.addEventListener("change",()=>{Tr=b.value,$e()}),f.append(g,b),n.appendChild(f);let p=document.createElement("div");p.className="bloom-plugin-list",n.appendChild(p);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(d,n),xr=p,Er=T,Xo=g,Ac=b,wr=m,$e(),e}function hp(t){t.classList.add("bloom-rail-dock")}function yp(){let t=document.getElementById(Nt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&$o(t)?t:null}function vp(){if(document.getElementById(_e)?.remove(),!document.body)return;let t=bp(_e);hp(t),document.body.appendChild(t),he=!0,Cn(),Jo(),Ya(),Pe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:ct,dock:"center",rail:!!yp()})}function Za(){let t=document.getElementById(_e);if(t instanceof HTMLElement&&t.isConnected&&gp(t)){Xa();return}t?.remove(),vp()}function xp(){let t=document.createElement("button");return t.type="button",t.id=Nt,t.className="bloom-rail-item",t.setAttribute("aria-controls",_e),t.setAttribute("aria-expanded",he?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${ni()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Za()}),t}function Cc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Ep(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function wp(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function pe(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function _c(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Ep(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&pe(t,"padding-top",Math.round(i)),Number.isFinite(a)&&pe(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));pe(n,"width",l),pe(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&pe(t,"padding-left",u);let d=wp(e,r);if(d){let m=d.getBoundingClientRect(),f=n.getBoundingClientRect(),g=Math.round(m.left-f.right);g>=0&&g<=24&&pe(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&pe(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&pe(t,"gap",Math.round(l))}Nc(t)}function Ka(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Sp(){if(Sr?.isConnected&&Qt){Qt.observe(Sr,{childList:!0});return}Va()}function Lp(t){if(Ka(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Tp(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){vr=0;return}vr+=1,Lr=Date.now()+Math.min(8e3,250*2**Math.min(vr,5))})}function kp(){kn||Date.now()<Lr||(kn=requestAnimationFrame(()=>{kn=0,!(Date.now()<Lr)&&(document.getElementById(Nt)?.isConnected||Qo())}))}function Qo(){if(!document.body)return;Qt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Nt);t=n instanceof HTMLButtonElement?n:xp();let r=De(),o=Ln();if(r){let i=$a(r),a=i.parentElement;if(Ka(i)||a&&Ka(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Cc(t),_c(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Cc(t,!0)):t.isConnected&&!$o(t)&&(t.remove(),t=null)}finally{Tp(t,e),Sp(),Ya()}}function Va(){let t=_o();!t||!Lp(t)||Sr===t&&Qt||(Qt?.disconnect(),Sr=t,Qt=new MutationObserver(()=>{document.getElementById(Nt)?.isConnected||kp()}),Qt.observe(t,{childList:!0}))}function Cp(){Qo(),Va(),yr===void 0&&(yr=window.setInterval(()=>{let t=document.getElementById(Nt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Lr&&Qo();else{vr=0;let e=De();e&&_c(t,e)}Va()},Ff))}function Mp(){yr!==void 0&&(clearInterval(yr),yr=void 0),kn&&cancelAnimationFrame(kn),kn=0,Lr=0,vr=0,Qt?.disconnect(),Qt=null,Sr=null}function Ap(t){Uo===t&&ge||(ge?.disconnect(),Uo=t,ge=new MutationObserver(()=>{if(!t.isConnected){ge?.disconnect(),ge=null,Uo=null;return}qc(t)}),ge.observe(t,{childList:!0}))}function qc(t){if(Ap(t),t.querySelector(`#${Vo}`))return;let e=document.createElement("button");e.type="button",e.id=Vo,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${ni()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Ga),e.addEventListener("pointerup",Ga),e.addEventListener("click",n=>{Ga(n),Za()}),t.insertBefore(e,t.firstChild)}function Go(){let t=Tn();return t?(qc(t),!0):!1}function Hp(t){qo(t)&&(queueMicrotask(Go),requestAnimationFrame(()=>{Go()}),window.setTimeout(Go,60),window.setTimeout(Go,180))}function Np(){Yo?.abort();let t=new AbortController;Yo=t,document.addEventListener("click",Hp,{signal:t.signal})}function Ip(){Yo?.abort(),Yo=null,ge?.disconnect(),ge=null,Uo=null}function Fc(){En(),Qf(()=>{Rc(),Ic(),Qo(),Za()})}var zc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${qf}`,`#${Nt}`,`#${Vo}`,`#${_e}`,`#${ti}`,`#${kr}`,`#${Wo}`,"#bloom-menu-panel"],start(){Rc(),Ic(),Cp(),Np(),jo?.(),jo=Tc(Jo),Jo(),za=[vn("pluginToggle",()=>{he&&$e()}),vn("pluginPin",()=>{he&&$e()}),vn("pluginStar",()=>{he&&$e()})]},stop(){Mp(),Ip(),jo?.(),jo=null;for(let t of za)t();za=[],Xa(),document.getElementById(Nt)?.remove(),document.getElementById(Vo)?.remove(),document.getElementById(Wo)?.remove(),Mc=null,zf=null,xr=null,Er=null,Xo=null,Ac=null,wr=null,he=!1}});var ri='form[data-type="unified-composer"], form.w-full[data-type]',It=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Mn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),jc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Gc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Rp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Pp='[contenteditable="false"], button, [role="button"]';function Et(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function qe(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Et(o)))return o;return null}function Uc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function $(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Uc(t);return!!(Rp.test(n)||/^stop$/i.test(n))}function wt(){let e=Array.from(document.querySelectorAll(ri)).find(Et);if(e instanceof HTMLElement)return e;let n=qe(document,It),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function Q(){let t=Array.from(document.querySelectorAll(It));return t.find(Et)??t[0]??null}function Op(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Pp);return!!n&&n!==e&&e.contains(n)}function Ja(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Op(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Rt(t){let e=t??Q();return e?Ja(e,e).replaceAll("\u200B","").trim().length>0:!1}function ye(t){return!Rt(t)}function oi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Kc(t){let e=wt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Et(n))&&t(n))return n;return null}function ve(){let t=wt(),e=qe(t,Mn)??qe(document,Mn);return e&&!$(e)?e:Kc(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!$(n);let o=Uc(n);return/^(send|send prompt|发送)$/i.test(o)&&!$(n)})}function Fe(){let t=wt(),e=qe(t,jc,!0)??qe(document,jc,!0);if(e)return e;let n=qe(t,Gc)??qe(document,Gc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Et(r)&&$(r))return r}return Kc($)}function Pt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Ja(n,t)).join(`
`):Ja(t,t)}function Qa(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function te(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Qa(t,n)}var Vc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function St(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function ee(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ne(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Vc)?.[1]??""}catch{return t.match(Vc)?.[1]??""}}function C(){return ne(location.pathname)}var Zc=new S("Harvest"),Bp=1500,Dp=200,ii=new Set,ai=new Map,si=new Map,An=null,li=null,Cr=null,Ot=0;function $p(){return typeof unsafeWindow<"u"?unsafeWindow:window}function _p(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function qp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function Jc(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var Fp=/"action"\s*:\s*"(next|continue|variant)"/i;function zp(t,e,n){return!(e!=="POST"||Jc(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Fp.test(n))}function jp(t,e){return e!=="GET"||Jc(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Wc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Qc(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Gp(t){return typeof t=="string"?Qc(t):""}function ts(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return ts(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function tu(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function Yc(t,e,n){!t||!e||si.get(t)!==e&&(si.set(t,e),tu(si,Bp),xe({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Up(t,e){let n=e.trim();!t||!n||ai.get(t)!==n&&(ai.set(t,n),tu(ai,Dp),xe({type:"conversation-meta",conversationId:t,title:n}))}function Mr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Mr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Up(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=ts(l.create_time??l.createTime??l.created_at);c&&u&&Yc(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=ts(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&Yc(a,s,o),r.mapping&&typeof r.mapping=="object")Mr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Mr(l,o,n+1)}function Xc(t,e){if(t)try{Mr(JSON.parse(t),e)}catch{}}function xe(t){for(let e of Array.from(ii))try{e(t)}catch{}}async function Kp(t,e,n){if(n===Ot)try{let r=await t.json();if(n!==Ot)return;Mr(r,e)}catch{}}async function Vp(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Ot&&xe({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Ot;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let f=Qc(c);f&&(o=f,xe({type:"post-start",conversationId:o,url:""}))}let m=c.split(`
`);c=m.pop()??"";for(let f of m){let g=f.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||Xc(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Ot&&Xc(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Ot&&xe({type:"post-end",conversationId:o,error:i})}function Wp(t,e,n){let r=_p(e),o=qp(e,n),i=jp(r,o),a=zp(r,o,n?.body),s=Ot,l="";return a&&(l=Gp(n?.body)||Wc(r)||ne(r)||C(),xe({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Ot||!i&&!a)return c;try{let u=c.clone();i?Kp(u,Wc(r)||C(),s):Vp(u,l,!c.ok,s)}catch{a&&xe({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Ot&&xe({type:"post-end",conversationId:l,error:!0}),c})}function Yp(){if(An)return;let t=$p();Cr=t,An=t.fetch.bind(t);let e=(n,r)=>Wp(An,n,r);li=e,t.fetch=e,Zc.debug("conversation fetch harvest hooked")}function Xp(){Ot+=1,!(!An||!Cr)&&(li&&Cr.fetch===li&&(Cr.fetch=An),An=null,li=null,Cr=null,Zc.debug("conversation fetch harvest unhooked"))}function ut(t){return ii.add(t),Yp(),()=>{ii.delete(t),ii.size===0&&Xp()}}function Hn(t){return t?ai.get(t)??"":""}function ci(t){return t?si.get(t)??null:null}var nu=new S("Streaming");function Rr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Et(e))&&($(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Zp(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Et(t))}function Jp(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Et(t))}function Qp(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Dt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function U(){if(Fe()||Rr()||Qp())return!0;let t=ve();return t&&Et(t)&&!$(t)?!1:!!(Zp()||Jp())}var tg=400,eu=3,Ue=new Set,Ar,Hr=null,es=null,je=!1,ze=0,we="",Se="",Le=!1,Nr=!1,Ir=!1,Bt=!1,G=null,dt="",Ge=!1;function q(){return Bt}function Nn(){return Le}function In(){return dt}function ns(){return C()||dt}function ru(){return ee(St())}function ui(t,e){return{streaming:t,contextKey:e,conversationId:ns()}}function rs(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function eg(t){return!t||t==="/"||t.startsWith("/g/")}function F(t,e){if(!t||t===e)return!1;let n=ne(rs(e)||e);return!n||!(t.endsWith("|draft")||eg(rs(t)))?!1:dt?n===dt:Ge}function di(){je=!1,ze=0,we="",Le=!1,Nr=!1,Ir=!1,dt="",Ge=!1}function ng(t){for(let e of Array.from(Ue))try{e.onFall?.(t)}catch{}}function rg(t){for(let e of Array.from(Ue))try{e.onRise?.(t)}catch{}}function Ee(t){for(let e of Array.from(Ue))try{e.onTick?.(t)}catch{}}function og(t,e){for(let n of Array.from(Ue))try{n.onContext?.(t,e)}catch{}}function ig(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&$(n)&&(Le=!0)}function ag(t){if(t.type==="post-start"){let n=C();if(!t.conversationId){n||(Ge=!0),(!n||n===dt)&&(Bt=!1,Le=!1);return}if(!(t.conversationId===n||t.conversationId===dt)&&!(!n&&Ge))return;dt=t.conversationId,Ge=!1,Bt=!1,Le=!1;return}if(t.type!=="post-end"||!je&&!G)return;let e=C();t.conversationId&&!(e?t.conversationId===e:t.conversationId===dt)||(Ir=!0,t.error&&(Nr=!0,G&&(G.error=!0)))}function sg(){let t=ru(),e=U();if(Se&&t&&Se!==t){let o=Se;if(!F(o,t))G=null,di(),Bt=e;else{let i=ne(rs(t));if(i&&!dt&&(dt=i,Ge=!1),we===o&&(we=t),G&&G.contextKey===o){G.contextKey=t;let a=ns();a&&(G.conversationId=a)}Bt=!1}if(Se=t,og(t,o),Bt){Ee(ui(!1,t));return}}else t&&(Se=t);if(Bt){if(e){Ee(ui(!1,t));return}Bt=!1}if(G)if(e||G.contextKey!==t)G=null;else{let o=G;G=null,di(),ng(o),Ee(ui(!1,t));return}let n=ui(e,t);if(e){let o=!je;o&&(Le=!1,Nr=!1,Ir=!1),je=!0,ze=0,we=t,o&&rg(n),Ee(n);return}if(!je){Ee(n);return}if(ze+=1,Ir&&(ze=Math.max(ze,eu)),ze<eu){Ee(n);return}if(!(!!we&&we===t)){di(),Ee(n);return}G={contextKey:we||t,conversationId:ns(),userStopped:Le,error:Nr||Dt()},Ee(n)}function lg(){Ar===void 0&&(je=U(),Se=ru(),we=je?Se:"",ze=0,Le=!1,Nr=!1,Ir=!1,Bt=!1,G=null,dt="",Ge=!1,Hr?.abort(),Hr=new AbortController,document.addEventListener("click",ig,{capture:!0,signal:Hr.signal}),es=ut(ag),Ar=setInterval(sg,tg),nu.debug("watchStreamingEdge started"))}function cg(){Ue.size||(Ar!==void 0&&(clearInterval(Ar),Ar=void 0),Hr?.abort(),Hr=null,es?.(),es=null,di(),Se="",Bt=!1,G=null,nu.debug("watchStreamingEdge stopped"))}function et(t){let e=typeof t=="function"?{onFall:t}:t;return Ue.add(e),lg(),()=>{Ue.delete(e),cg()}}var ou="bloom-host-icon",Pr="data-bloom-host-rel",os="not all",is=0,iu=0,ug=400;function au(t){is+=1;try{t()}finally{is-=1}}function mi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Te(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function su(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function dg(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function mg(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-iu<ug||(iu=n,t.appendChild(e))}function fg(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||mi(n)&&(n.getAttribute(Pr)||n.setAttribute(Pr,n.rel),n.media!==os&&(n.media=os),n.rel!==ou&&(n.rel=ou))}function pg(t){for(let e of t.querySelectorAll(`link[${Pr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Pr);n&&(e.rel=n),e.removeAttribute(Pr),e.media===os&&e.removeAttribute("media")}}function lu(t,e){let{head:n}=document;!n||!e||au(()=>{fg(n,t);let r=su(t),{type:o,sizes:i}=dg(e);r?mg(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function cu(t,e){let{head:n}=document;n&&au(()=>{su(t)?.remove(),pg(n)})}function uu(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(is)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:mi(c.target)&&(a=!0,Te(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)mi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)mi(u)&&u.id!==t&&(a=!0,Te(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var gg=["original","badge","dot","hole","bg"],fu=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],pu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},fi="#FCFCFC",bg="#111111",du="#111111",hg="#ffffff",yg="#212121",vg="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",xg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},pi=32,mu=64;function gu(t){return typeof t=="string"&&gg.includes(t)}function Eg(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function gi(t){let e=document.createElement("canvas");e.width=pi,e.height=pi;let n=e.getContext("2d");return n?(n.scale(pi/mu,pi/mu),t(n),e.toDataURL("image/png")):""}function wg(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function bi(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(vg);n&&(t.strokeStyle=bg,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Sg(t,e,n){let r=pu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=du,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=du,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=hg,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Or(t,e){if(t==="original")return e==="wait"?gi(r=>bi(r,fi)):Eg(xg[e]);let n=e==="wait"?void 0:pu[e];return gi(t==="hole"?r=>bi(r,n??fi):t==="bg"?r=>{r.fillStyle=n??yg,wg(r,0,0,64,64,14),r.fill(),bi(r,fi,!1)}:r=>{bi(r,fi),e!=="wait"&&Sg(r,e,t==="dot"?"dot":"badge")})}function bu(t){return{wait:Or(t,"wait"),rotate:Or(t,"rotate"),done:Or(t,"done"),ready:Or(t,"ready"),error:Or(t,"error")}}var Lg=new S("ChatStateFavicons"),Ve="bloom-chat-state-favicon",Eu=["input","beforeinput","cut","paste","compositionend"],wu=L({style:{type:3,description:"Favicon overlay",options:fu}}),$t="",ls={wait:"",rotate:"",done:"",ready:"",error:""},Br="wait",nt=!1,K=!1,I=null,it="",mt="",Ye=!0,vi=!1,Rn=null,ft=0,hi=null,yi=null,Ke=null,ss=null,Pn=null,Lt=!1,hu=new WeakSet;function Tg(){let t=wu.store.style;return gu(t)?t:"bg"}function Su(){let e=document.querySelector(`link[rel~="icon"]:not(#${Ve}), link[data-bloom-host-rel]:not(#${Ve})`)?.href;return Te(e)?e:Te($t)?$t:""}function kg(){let t=document.getElementById(Ve);return t instanceof HTMLLinkElement?t:null}function Cg(){if(!Te($t)){let t=Su();t&&($t=t)}return Te($t)?$t:ls.wait}function Lu(t){return t==="wait"?Cg():ls[t]}function Tu(){lu(Ve,Lu(Br))}function O(t){let e=Lu(t);if(Br===t){let n=kg();if(n&&n.getAttribute("href")===e)return}Br=t,Tu()}function yu(){ls=bu(Tg()),O(Br)}function cs(){return ee(St())}function us(t,e){!t||!e||t===e||(I===t&&(I=e),it===t&&(it=e),mt===t&&(mt=e))}function Mg(){let t=cs();if(!(U()||nt||K))return it="",t;if(it&&t&&it!==t)if(F(it,t))us(it,t),it=t;else return it="",t;else!it&&t&&(it=t);return it||t}function vu(t){return!I||!t?!1:I===t?!0:F(I,t)}function ku(){nt=!1,K=!1,I=null,it=""}function Cu(t){mt=t,ku(),Ye=!1,vi=!0,O("wait")}function as(t){return!t&&Ye}function Ag(){if(!Lt)return;let t=cs();if(mt&&t&&mt!==t&&!F(mt,t)){Cu(t);return}mt&&t&&F(mt,t)&&us(mt,t),t&&(mt=t);let e=U(),n=e&&!q();if(vi){if(q()){O("wait");return}vi=!1}if(q()){O("wait");return}let r=Mg(),o=ye();if(Nn()&&!e){nt=!1,K=!1,I=null,O(o?"wait":as(o)?"ready":"wait");return}if(Dt()&&!e&&nt){O("error"),nt=!1,K=!1,I=null;return}if(n){nt||(Ye=!1),nt=!0,K=!1,I=r,O("rotate");return}if(nt)if(!vu(t))nt=!1,K=!1,I=null;else if(K){nt=!1,K=!0,I=t||r,O("done");return}else{O("rotate");return}if(K)if(I&&t&&!vu(t))K=!1,I=null;else if(o){I=r||I,O("done");return}else if(as(o)){K=!1,O("ready");return}else{K=!1,O("wait");return}I=null,o?O("wait"):as(o)?O("ready"):O("wait")}function We(){Lt&&(Iu(),Au(),Hu(),Ag())}function Mu(){if(Pn){for(let t of Eu)Pn.removeEventListener(t,Nu,!0);Pn=null}}function Au(){let t=wt(),e=t&&t!==document.body?t:null;if(!(Pn===e&&e?.isConnected)&&(Mu(),!!e)){Pn=e;for(let n of Eu)Pn.addEventListener(n,Nu,{capture:!0,passive:!0})}}function Hu(){let t=wt();if(!(Ke&&ss===t&&t.isConnected)){if(Ke?.disconnect(),ss=t,!t||t===document.body){Ke=null;return}Ke=new MutationObserver(()=>xi()),Ke.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function xi(){if(Lt){if(document.hidden){ft&&(cancelAnimationFrame(ft),ft=0),We();return}ft||(ft=requestAnimationFrame(()=>{ft=0,Lt&&We()}))}}function Nu(){Rt()&&(Ye=!0),xi()}function xu(){Rt()&&(Ye=!0),xi()}function Hg(){Lt&&(ft&&(cancelAnimationFrame(ft),ft=0),We())}function Ng(){Lt&&(Ye=!1,We())}function Ig(t){if(!Lt)return;if(t.userStopped){nt=!1,K=!1,I=null,O("wait");return}if(t.error){nt=!1,K=!1,I=null,O("error");return}let e=cs();if(t.contextKey&&e&&t.contextKey!==e&&!F(t.contextKey,e)){nt=!1,K=!1,I=null,O("wait");return}nt=!1,K=!0,I=e||t.contextKey,O("done")}function Rg(){Lt&&We()}function Pg(t,e){if(Lt){if(F(e,t)){us(e,t),mt=t,We();return}Cu(t)}}function Iu(){let t=Q();!t||hu.has(t)||(hu.add(t),t.addEventListener("input",xu,{capture:!0,passive:!0}),t.addEventListener("compositionend",xu,{capture:!0,passive:!0}))}var Ru=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:wu,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Ve}`],start(){Lt=!0,$t=Su()||$t,yu(),yi?.disconnect(),yi=uu(Ve,t=>{Te(t)&&($t=t),Tu()}),Rn?.abort(),Rn=new AbortController,window.addEventListener("popstate",xi,{signal:Rn.signal}),document.addEventListener("visibilitychange",Hg,{signal:Rn.signal}),Iu(),Au(),Hu(),hi?.(),hi=et({onRise:Ng,onFall:Ig,onTick:Rg,onContext:Pg}),We(),Lg.debug("favicon watch started")},stop(){Lt=!1,ft&&cancelAnimationFrame(ft),ft=0,hi?.(),hi=null,Rn?.abort(),Rn=null,Mu(),Ke?.disconnect(),Ke=null,ss=null,yi?.disconnect(),yi=null,ku(),mt="",Ye=!0,vi=!1,Br="wait",cu(Ve,$t)},onSettingsChange:yu});var Pu=`.bloom-ih-hud {
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
`;var Wx=new S("InputHistory"),ds=/\u200B/g,Ou=10,Bu=500,Du=100,Bg=8,Dg=120,$g=2e3,Ei=10,wi=L({maxEntries:{type:4,description:"Max stored prompts",min:Ou,max:Bu,default:Du},history:{type:5,description:"Stored prompts",render:Qg},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ms=new Map,V=0,fs="",_t=!1,$r=!1,bs=0,Dr=null,ps,hs=null,$u=!0;function Tt(){let t=wi.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function _u(t){let e=J(Number(wi.store.maxEntries??Du),Ou,Bu);return t.length>e?t.slice(t.length-e):t}function Si(t){wi.store.entries=_u(t)}function _g(t){return t.replaceAll(ds,"").replace(/\n$/,"").trim()}function gs(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(It);return n instanceof HTMLElement?n:Q()}function qg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Pt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(ds,"").trim().length===0,last:i.toString().replaceAll(ds,"").trim().length===0}}catch{return{first:!0,last:!0}}}function qu(t){clearTimeout(ps),ps=setTimeout(()=>{if(t!==bs)return;$r=!1;let e=hs;e&&Qa(e,$u)},Dg)}function Fu(t,e,n){$r=!0,hs=t,$u=n;let r=++bs;te(t,e,n),qu(r)}function Fg(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function On(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function zg(){document.querySelector(".bloom-ih-hud")?.remove()}function jg(t,e){let n=Fg();n.textContent=t;let r=(e.closest("form")??wt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Bg)}px`,n.classList.add("bloom-ih-hud-on")}function ys(t){let e=_g(t);if(!e)return;let n=Date.now(),r=ms.get(e);if(r&&n-r<$g)return;ms.set(e,n);let o=Tt().filter(i=>i!==e);o.push(e),Si(o),V=Tt().length,_t=!1,On()}function Gg(t,e){let n=Tt();if(!n.length&&t)return;V>=n.length&&(fs=Pt(e),V=n.length);let r=t?V-1:V+1;r<0||r>n.length||(V=r,_t=!0,Fu(e,r===n.length?fs:n[r],t),r<n.length?jg(`${r+1} / ${n.length}`,e):On())}function Ug(t){_t=!1,On(),Fu(t,fs,!1),V=Tt().length}function Kg(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=gs(t.target)??gs(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&_t&&!t.altKey&&!t.shiftKey){Ug(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){ys(Pt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=Tt();if(!r){let i=qg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||V<=0)||!n&&V>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Gg(n,e))}function Vg(t){if(gs(t.target)){if($r){qu(bs);return}_t&&(_t=!1,On(),V=Tt().length)}}function Wg(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(It);n instanceof HTMLElement&&ys(Pt(n))}function Yg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Mn);if(!n||!(n instanceof HTMLElement)||$(n))return;let r=Q();r&&ys(Pt(r))}function Xg(t){if(!(!_t||$r)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}_t=!1,On()}}function Zg(){if(Dr)return;Dr=new AbortController;let{signal:t}=Dr,e={capture:!0,signal:t};window.addEventListener("keydown",Kg,e),window.addEventListener("input",Vg,e),window.addEventListener("submit",Wg,e),window.addEventListener("click",Yg,e),window.addEventListener("pointerdown",Xg,e)}function Jg(t){let e=Tt().slice();e.splice(t,1),Si(e),V>e.length&&(V=e.length)}function Qg(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=Tt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(p=>p.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Ei));n>=l&&(n=l-1);let c=s.slice(n*Ei,n*Ei+Ei);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let p=document.createElement("div");p.className="bloom-ih-list",c.forEach((T,M)=>{let N=i.indexOf(T),Xt=Tt().length-1-N,At=document.createElement("div");At.className="bloom-ih-item";let ot=document.createElement("button");ot.type="button",ot.className=`bloom-ih-body${r===M?"":" bloom-ih-clamp"}`,ot.textContent=T,ot.addEventListener("click",()=>{r=r===M?-1:M,o()});let R=document.createElement("div");R.className="bloom-ih-actions";let lt=document.createElement("button");lt.type="button",lt.title="Copy",lt.textContent="C",lt.addEventListener("click",()=>{tc(T)});let Zt=document.createElement("button");Zt.type="button",Zt.title="Delete",Zt.textContent="\xD7",Zt.addEventListener("click",()=>{Jg(Xt),o()}),R.append(lt,Zt),At.append(ot,R),p.appendChild(At)}),t.appendChild(p)}else{let p=document.createElement("p");p.className="bloom-ih-empty",p.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(p)}let d=document.createElement("div");d.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,o()});let f=document.createElement("span");f.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Si([]),V=0,o())}),d.append(m,f,g,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var zu=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:wi,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Pu),V=Tt().length,_t=!1,Zg()},stop(){Dr?.abort(),Dr=null,On(),zg(),ms.clear(),clearTimeout(ps),$r=!1,hs=null,_t=!1},onSettingsChange(){let t=Tt(),e=_u(t);e.length!==t.length&&Si(e),V>e.length&&(V=e.length)}});var vs="noShareLink",tb=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],eb=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],xs=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function ju(t){return`${t.join(",")}{display:none!important}`}function Gu(){let t=[];if(xs.store.hideShareChat!==!1&&t.push(ju(tb)),xs.store.hideShareProject!==!1&&t.push(ju(eb)),!t.length){E(vs);return}w(vs,t.join(`
`))}var Uu=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:xs,start:Gu,onSettingsChange:Gu,stop(){E(vs)}});var Wu="noDictation",nb=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],rb=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Yu=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Ku(t){return`${t.join(",")}{display:none!important}`}function Vu(){let t=[Ku(nb)];Yu.store.hideDictationSettings!==!1&&t.push(Ku(rb)),w(Wu,t.join(`
`))}var Xu=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Yu,start:Vu,onSettingsChange:Vu,stop(){E(Wu)}});var Es="noSidebarIdentity",Bn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Qu=Bn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),td=Bn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),ob=[...Qu,...td],ib=[...Qu,...Bn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],ab=Bn.map(t=>`${t} a[href^="mailto:"]`),sb=Bn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),lb=Bn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),_r=L({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Zu(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function cb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function ub(){return`${lb.join(",")}{margin-block:auto!important}`}function db(){return`${sb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Ju(){let t=_r.store.hideUsername!==!1,e=_r.store.hideEmail!==!1,n=t&&_r.store.enlargePlan!==!1,r=t&&_r.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(cb([...ib,...td])),o.push(ub())):o.push(Zu(ob))),e&&o.push(Zu(ab)),n&&o.push(db()),!o.length){E(Es);return}w(Es,o.join(`
`))}var ed=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:_r,start:Ju,onSettingsChange:Ju,stop(){E(Es)}});var nd=`#bloom-rt-host {
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
`;var id=new S("RecentTopics"),_n="bloom-rt-host",ad="home",sd=/^\/c\/([a-z0-9_-]{8,})/i,fb=/\/c\/([a-z0-9_-]{8,})/i,ld=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,pb=new Set(["Backquote","IntlBackslash"]),gb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),bb=140,hb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),W=L({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:hb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Li=null,Ti=null,at=!1,Ur=!1,qr=!1,qt=0,Xe="",Dn=null,Fr=null,$n,ws=null,Ss=null;function yb(){let t=Number(W.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function zr(){let t=W.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ts(){let t=W.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function cd(){let t=W.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ks(){let t=W.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ci(t){let e=yb();return t.length>e?t.slice(0,e):t}function Ft(t){return t===ad}function jr(t,e=bb){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Cs(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(sd)?.[1]??""}catch{return t.match(fb)?.[1]??""}}function Ze(){let t=(location.pathname||"/").match(sd);if(t?.[1])return t[1];let n=St().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return ad}function Ms(t){if(Ft(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Cs(r.getAttribute("href")||"")!==t)continue;let o=jr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ze()===t&&e&&!/^ChatGPT$/i.test(e)?jr(e,80):""}function vb(t){if(Ft(t))return"New chat";let e=Ts()[t];if(e)return e;let n=Hn(t);return n||Ms(t)||"Chat"}function xb(t){return ks()[t]||""}function Eb(t){return cd()[t]||{}}function As(t,e){if(!t||Ft(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Ts();n[t]!==e&&(n[t]=e,W.store.titles=n)}function wb(t){t.type==="conversation-meta"&&(As(t.conversationId,t.title),at&&qn())}function Sb(t,e){if(!t||Ft(t)||!e)return;let n=ks();n[t]!==e&&(n[t]=e,W.store.projects=n)}function Lb(t,e){if(!t||Ft(t)||!e.user&&!e.assistant)return;let n=cd(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,W.store.previews=n)}function Hs(t){if(!t||Ft(t)&&W.store.includeHome===!1)return;let e=zr().filter(n=>n!==t);e.unshift(t),W.store.visits=Ci(e)}function Mi(){let t=W.store.includeHome!==!1;return Ci(zr().filter(n=>t||!Ft(n))).map(n=>({id:n,title:vb(n),project:xb(n),preview:Eb(n)}))}function rd(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return jr(o)}catch{return""}}function Gr(t){if(!t||Ft(t)||t!==Ze())return;let e=Ms(t);e&&As(t,e);let n=rd("user"),r=rd("assistant");Lb(t,{user:n,assistant:r});let o=dd(t);if(o){let i=ud(o);i&&Sb(t,i)}}function Ns(){let t=Ts(),e=ks(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${_n}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Cs(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=jr(c.textContent||"",80);d&&!ld.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let m=ud(c);m&&e[u]!==m&&(e[u]=m,i=!0)}}catch{}o&&(W.store.titles=t),i&&(W.store.projects=e);let a=zr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(W.store.visits=Ci([...a,...l]))}function ud(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=jr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!ld.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function dd(t){if(Ft(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Cs(e.getAttribute("href")||"")===t)return e}catch{}return null}function Tb(t){let e=dd(t);if(e){e.click();return}if(Ft(t)){location.assign("/");return}location.assign(`/c/${t}`)}function kb(){let t=Ze();Xe&&Xe!==t&&Gr(Xe),Xe=t,Hs(t),Ns();let e=Ms(t);e&&As(t,e),Gr(t)}function ki(){$n===void 0&&($n=window.setTimeout(()=>{$n=void 0,kb()},120))}function Cb(){Dn||(Dn=history.pushState.bind(history),Fr=history.replaceState.bind(history),history.pushState=function(...e){let n=Dn(...e);return ki(),n},history.replaceState=function(...e){let n=Fr(...e);return ki(),n})}function Mb(){Dn&&(history.pushState=Dn),Fr&&(history.replaceState=Fr),Dn=null,Fr=null}function Ab(t){return pb.has(t.code)||t.keyCode===192?!0:gb.has(t.key)}function md(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Hb(t,e){Ur=e,Ns(),Gr(Ze()),at=!0,qt=0;try{let n=Ze();Hs(n);let r=Mi();r.length>1&&(qt=t?r.length-1:1)}catch(n){id.error("Failed to open switcher:",n)}qn()}function od(t){let{length:e}=Mi();e&&(qt=(qt+(t?-1:1)+e)%e,qn())}function Is(){if(!at)return;let t=Mi()[qt];at=!1,Ur=!1,qn(),t&&Tb(t.id)}function fd(){at&&(at=!1,Ur=!1,qn())}function Nb(t){if(md(t)){qr=!0;return}if((t.ctrlKey||qr)&&!t.altKey&&!t.metaKey&&Ab(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{at?od(t.shiftKey):Hb(t.shiftKey,!0)}catch(n){id.error("Hotkey failed:",n)}return}if(at){if(t.key==="Escape"){t.preventDefault(),fd();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Is();return}t.key==="Tab"&&(t.ctrlKey||qr)&&(t.preventDefault(),od(t.shiftKey))}}function Ib(t){md(t)&&(qr=!1,at&&Ur&&Is())}function Rb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ki)}function Pb(t){!at||(t.target instanceof Element?t.target:null)?.closest(`#${_n}`)||fd()}function Ob(){document.visibilityState==="hidden"&&Gr(Ze())}function Ls(t=Ti){t instanceof HTMLElement&&zo(t,Fo("auto"),!0)}function Bb(){if(!document.body)return null;let t=document.getElementById(_n);if(t instanceof HTMLElement)return Ti=t,Ls(t),t;t=document.createElement("div"),t.id=_n;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),Ti=t,Ls(t),t}function qn(){let t=Bb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!at){e.dataset.visible="false",e.replaceChildren();return}let n=Mi();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}qt>=n.length&&(qt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===qt?"true":"false",s.setAttribute("aria-selected",a===qt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{qt=a,Is()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Db(){document.getElementById(_n)?.remove(),Ti=null}var pd=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${_n}`],settings:W,start(){w("recentTopics",nd),Xe=Ze(),Hs(Xe),Ns(),Gr(Xe),ws=ut(wb),Cb(),Li=new AbortController;let{signal:t}=Li;window.addEventListener("keydown",Nb,{capture:!0,signal:t}),window.addEventListener("keyup",Ib,{capture:!0,signal:t}),window.addEventListener("popstate",ki,{signal:t}),document.addEventListener("click",Rb,{capture:!0,signal:t}),document.addEventListener("click",Pb,{signal:t}),document.addEventListener("visibilitychange",Ob,{signal:t}),Ss=vn("schemeChange",()=>Ls())},stop(){Li?.abort(),Li=null,$n!==void 0&&(clearTimeout($n),$n=void 0),Mb(),ws?.(),ws=null,Ss?.(),Ss=null,at=!1,Ur=!1,qr=!1,Db()},onSettingsChange(){let t=Ci(zr());t.length!==zr().length&&(W.store.visits=t),at&&qn()}});var Rs="cleaner",$b=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],_b=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],qb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Fb=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],zb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],jb=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Je=L({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Fn(t){return`${t.join(",")}{display:none!important}`}function gd(){let t=[];if(Je.store.hideDownloadApps!==!1&&t.push(Fn($b)),Je.store.hideDisclaimer!==!1&&t.push(Fn(_b)),Je.store.hideUpgrade!==!1&&t.push(Fn(qb)),Je.store.hideLockedModels!==!1&&t.push(Fn(Fb)),Je.store.hideHomePromo!==!1&&t.push(Fn(zb)),Je.store.hideAds!==!1&&t.push(Fn(jb)),!t.length){E(Rs);return}w(Rs,t.join(`
`))}var bd=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Je,start:gd,onSettingsChange:gd,stop(){E(Rs)}});var Hi=new S("ResponseNotification"),jn=L({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Xb},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ps=!1,Ai=null,zn=null,Kr=null;function Gb(){return document.visibilityState==="hidden"||document.hidden}function Ub(){return jn.store.onlyWhenHidden===!1?!0:Gb()}function Kb(){let t=Hn(C());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function hd(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!zn||zn.state==="closed")&&(zn=new t);let e=zn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Hi.debug("chime failed",t)}}function Vb(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Hi.debug("custom sound failed",e),hd()}}function yd(){let t=String(jn.store.soundUrl||"").trim();t?Vb(t):hd()}function Wb(){let t="Bloom++",e=`${Kb()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Hi.debug("notification failed",n)}}function Yb(){Ub()&&(jn.store.sound!==!1&&yd(),jn.store.browserNotification!==!1&&Wb())}function Xb(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>yd()),t.appendChild(e),()=>{e.remove()}}var vd=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:jn,start(){Ps=!0,Ai?.(),Ai=et(t=>{if(!Ps||t.userStopped||t.error)return;let e=C()||In();t.conversationId&&t.conversationId!==e||Yb()}),Kr?.abort(),Kr=new AbortController,jn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Kr.signal}),Hi.debug("watch started")},stop(){Ps=!1,Ai?.(),Ai=null,Kr?.abort(),Kr=null;try{zn?.close()}catch{}zn=null}});var xd=`#bloom-pq-chip {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 12px 12px 10px;
    border-radius: 18px;
    border: 1px solid var(--border-light, rgba(0, 0, 0, 0.08));
    background: #f4f4f4;
    color: var(--text-primary, #0d0d0d);
    font: 14px/1.35 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    transform: translateX(-50%);
    pointer-events: auto;
}

html.dark #bloom-pq-chip {
    background: #252525;
    border-color: rgba(255, 255, 255, 0.08);
    color: #ececec;
}

.bloom-pq-head {
    padding: 2px 6px 8px;
    font-size: 14px;
    font-weight: 500;
}

.bloom-pq-row {
    display: flex;
    align-items: center;
    gap: 4px;
    min-height: 40px;
    padding: 0 6px 0 12px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.05);
}

html.dark .bloom-pq-row {
    background: #3a3a3a;
}

.bloom-pq-text {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    color: inherit;
    font: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-pq-editing {
    text-overflow: clip;
    caret-color: currentColor;
    cursor: text;
    outline: none;
}

#bloom-pq-chip .bloom-pq-editing:focus,
#bloom-pq-chip .bloom-pq-editing:focus-visible {
    outline: none;
    box-shadow: none;
}

.bloom-pq-actions {
    display: flex;
    flex: none;
    align-items: center;
}

.bloom-pq-ico {
    appearance: none;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text-secondary, #5d5d5d);
    display: grid;
    place-items: center;
    cursor: pointer;
}

.bloom-pq-ico svg {
    width: 15px;
    height: 15px;
    display: block;
}

html.dark .bloom-pq-ico {
    color: #c8c8c8;
}

button.bloom-pq-ico:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.06));
}

html.dark button.bloom-pq-ico:hover {
    background: rgba(255, 255, 255, 0.08);
}

.bloom-pq-grip {
    cursor: default;
    opacity: 0.72;
}

@media (prefers-reduced-motion: reduce) {
    #bloom-pq-chip { transition: none; }
}
`;var Qe=new S("PromptQueue"),Ri="bloom-pq-chip",Ed="promptQueue",wd=80,Jb=50,Qb=2e3,th='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',eh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,nh=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Cd=L({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),H=new Map,zt=!1,kt="",B="",jt=!1,st=!1,Me=!1,z=null,Vr=null,Ni=null,ke,Wr,Ce=null,re=null,rt=!1;function Gn(){return ee(St())}function tn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function rh(t){let e=tn(Pt(t));if(e)return e;if(!Rt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),tn(n.innerText||n.textContent||"")}catch{return""}}function Md(){try{let t=document.querySelectorAll(th),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Ad(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Hd(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&eh.test(n))return!0}}catch{}return!1}function Fs(){let t=In();if(!t)return!1;let e=C();return!e||e===t}function $s(){if(U()||Fs())return!1;let t=Md();if(!t)return!0;if(Ad(t)||Hd(t))return!1;try{if(t.querySelector(nh)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function oh(){if(q()||Nn())return rt=!1,!1;if(U()||Fs())return rt=!0,!0;let t=Md();return t&&(Ad(t)||Hd(t))?(rt=!0,!0):rt&&!$s()?!0:(rt=!1,!1)}function Nd(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(It);return n instanceof HTMLElement?n:null}function Sd(t){return Nd(t)??Q()}function Pi(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Id(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function ih(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?tn(e.innerText||e.textContent||""):""}catch{return""}}function Ld(t){if(!kt||kt===t)return;let e=H.get(kt);!e||H.has(t)||F(kt,t)&&(H.delete(kt),H.set(t,e),B===kt&&(B=t),z?.key===kt&&(z.key=t),Qe.debug("migrated pending",kt,"\u2192",t))}function Oi(t){let e=Gn();if(H.get(e)&&Cd.store.replacePending===!1)return;H.set(e,{text:t,at:Date.now()}),rt=!0,z={key:e,text:t,turns:Id(),ticks:3};let r=Q();r&&te(r,"");try{pt()}catch(o){Qe.error("chip",o)}Qe.debug("queued",e,t.length)}function _s(t){H.delete(t),B===t&&(B=""),z?.key===t&&(z=null),pt()}function ah(){st=!0,clearTimeout(Wr),Wr=setTimeout(()=>{st=!1,Wr=void 0},Qb)}function sh(){let t=Gn(),e=H.get(t);if(!e)return;let n=Q();if(!n)return;H.delete(t),B="",pt(),ah(),te(n,e.text);let r=ve();r&&!$(r)&&!oi(r)&&(r.click(),st=!1)}function Os(t){if(!zt||jt||U()||Gn()!==t)return;let e=H.get(t);if(!e){B="";return}if(Dt())return;let n=Q();if(!n)return;if(!ye(n)){let o=tn(Pt(n));if(o&&o!==e.text)return}let r=ve();!r||$(r)||oi(r)||(jt=!0,te(n,e.text),clearTimeout(ke),ke=setTimeout(()=>lh(t,e.text),Jb))}function lh(t,e){ke=void 0;try{if(!zt)return;let n=H.get(t);if(!n||n.text!==e||U()||Gn()!==t)return;let r=Q();if(!r)return;let o=tn(Pt(r));if(o&&o!==e&&!ye(r))return;o!==e&&te(r,e);let i=ve();if(!i||$(i)||oi(i))return;i.click(),H.delete(t),B="",pt(),Qe.debug("drained",t)}finally{jt=!1}}function Rd(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="translateX(-50%)";let e=wt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){t.style.left="50%",t.style.width="min(40rem, calc(100vw - 1rem))",t.style.bottom="6.5rem";return}let o=Math.min(n.width,window.innerWidth-16);t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.width=`${Math.round(Math.max(240,o))}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function qs(){Ce?.remove(),Ce=null,re=null}var zs="http://www.w3.org/2000/svg";function Pd(){let t=document.createElementNS(zs,"svg");return t.setAttribute("viewBox","0 0 16 16"),t.setAttribute("aria-hidden","true"),t}function Bs(t){let e=Pd(),n=document.createElementNS(zs,"path");return n.setAttribute("d",t),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.35"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),e.append(n),e}function ch(){let t=Pd(),e=[[5.5,4],[10.5,4],[5.5,8],[10.5,8],[5.5,12],[10.5,12]];for(let[n,r]of e){let o=document.createElementNS(zs,"circle");o.setAttribute("cx",String(n)),o.setAttribute("cy",String(r)),o.setAttribute("r","1.05"),o.setAttribute("fill","currentColor"),t.append(o)}return t}function Ds(t,e,n){let r=document.createElement("button");return r.type="button",r.className="bloom-pq-ico",r.setAttribute("aria-label",t),r.append(e),r.addEventListener("mousedown",o=>o.preventDefault()),r.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),n()}),r}function uh(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${Ri}`)}function Td(){let t=Ce?.querySelector(".bloom-pq-editing");return t instanceof HTMLElement?t.innerText:null}function dh(t){t.focus();let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function Ii(t,e){if(re!==t)return;if(re=null,e===null){pt();return}let n=tn(e);if(!n){_s(t);return}let r=H.get(t);r&&(r.text=n),pt()}function pt(){if(!zt||!document.body){qs();return}let t=Gn(),e=H.get(t);if(!e){qs();return}let n=Ce;n?.isConnected||(n=document.createElement("div"),n.id=Ri,document.body.appendChild(n),Ce=n),n.replaceChildren();let r=document.createElement("div");r.className="bloom-pq-head",r.textContent="1 Queued messages";let o=document.createElement("div");o.className="bloom-pq-row";let i=re===t,a=null,s=document.createElement("span");if(s.className=i?"bloom-pq-text bloom-pq-editing":"bloom-pq-text",i)s.textContent=e.text,s.contentEditable="true",s.spellcheck=!1,s.setAttribute("role","textbox"),s.setAttribute("aria-label","Edit queued prompt"),s.addEventListener("keydown",f=>{f.stopPropagation(),f.key==="Enter"?(f.preventDefault(),f.shiftKey||Ii(t,s.innerText)):f.key==="Escape"&&(f.preventDefault(),Ii(t,null))}),s.addEventListener("blur",()=>Ii(t,s.innerText)),a=s;else{let f=e.text.length>wd?`${e.text.slice(0,wd)}\u2026`:e.text;s.textContent=f,s.title=e.text}o.append(s);let l=document.createElement("div");l.className="bloom-pq-actions";let c=document.createElement("span");c.className="bloom-pq-ico bloom-pq-grip",c.title="Only one prompt can wait",c.append(ch());let u=Ds("Dismiss queued prompt",Bs("M3.2 4.2h9.6M6.2 4.2V3.2h3.6v1M4.6 4.2l.6 8.4h5.6l.6-8.4"),()=>{re=null,_s(t)}),d=Ds("Edit queued prompt",Bs("M9.4 3.2l3.4 3.4M3.2 12.8l.7-3.2L10.6 3l3.4 3.4-6.7 6.6z"),()=>{if(re===t){Ii(t,Td());return}H.has(t)&&(re=t,pt())}),m=Ds("Send now",Bs("M8 12.4V3.8M4.6 7.1 8 3.7l3.4 3.4"),()=>{let f=Td();if(f!==null){let g=tn(f);if(re=null,!g){_s(t);return}let b=H.get(t);b&&(b.text=g)}sh()});if(l.append(c,u,d,m),o.append(l),n.append(r,o),Rd(n),a){let f=a;queueMicrotask(()=>{re===t&&f.isConnected&&dh(f)})}}function mh(){if(!z)return;if(z.ticks-=1,H.get(z.key)&&Id()>z.turns){let e=ih();if(e&&e===z.text){Qe.debug("native send leaked; dropping pending"),H.delete(z.key),B===z.key&&(B=""),z=null,pt();return}}z.ticks<=0&&(z=null)}function Bi(t){return!oh()||!Rt(t)?"":rh(t)}function fh(t){if(!zt||t.isComposing||t.keyCode===229||t.key!=="Enter"||uh(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||jt)return;let e=Sd(t.target)??Sd(document.activeElement);if(!e)return;if(t.altKey||st){st=!1,Me=!0,queueMicrotask(()=>{Me=!1});return}let n=Bi(e);n&&(Pi(t),Oi(n))}function ph(t){if(!zt||jt||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Me){Me=!1;return}if(st){st=!1;return}let e=Nd(t.target);if(!e)return;let n=Bi(e);n&&(Pi(t),Oi(n))}function gh(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||$(e))return null;let n=t.closest(Mn);if(n instanceof HTMLElement&&!$(n))return n;let r=ve();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function kd(t){if(!zt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Ri}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&$(n)||jt||!gh(e))return;if(st){st=!1;return}let r=Q();if(!r)return;let o=Bi(r);o&&(Pi(t),Oi(o))}function bh(t){if(!zt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(ri)&&!e.querySelector(It)||jt)return;if(Me){Me=!1;return}if(st){st=!1;return}let n=Q()??e.querySelector(It);if(!n)return;let r=Bi(n);r&&(Pi(t),Oi(r))}var Od=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Ed,cleanupSelectors:[`#${Ri}`],settings:Cd,start(){zt=!0,kt=Gn(),B="",jt=!1,st=!1,Me=!1,z=null,rt=!q()&&!Nn()&&(U()||Fs()),w(Ed,xd),Vr?.abort(),Vr=new AbortController;let{signal:t}=Vr,e={capture:!0,signal:t};window.addEventListener("keydown",fh,e),document.addEventListener("beforeinput",ph,e),document.addEventListener("pointerdown",kd,e),document.addEventListener("click",kd,e),document.addEventListener("submit",bh,e),Ni?.(),Ni=et({onFall(n){if(zt){if(n.userStopped||n.error){rt=!1,B="",pt();return}if(!$s()){Qe.debug("unsettled fall; keep queue window");return}rt=!1,B=n.contextKey,Os(n.contextKey)}},onRise(){q()||Nn()||(rt=!0)},onContext(n,r){r&&n&&!F(r,n)&&(rt=!1,B="",jt=!1,ke!==void 0&&(clearTimeout(ke),ke=void 0)),Ld(n),kt=n,pt()},onTick(n){Ld(n.contextKey),kt=n.contextKey,mh(),rt&&$s()&&(rt=!1,!B&&H.get(n.contextKey)&&(B=n.contextKey,Os(n.contextKey))),B&&B===n.contextKey&&Os(B),H.get(n.contextKey)&&!Ce?.isConnected?pt():Ce&&Rd(Ce)}}),pt(),Qe.debug("watch started")},stop(){zt=!1,Ni?.(),Ni=null,Vr?.abort(),Vr=null,clearTimeout(ke),ke=void 0,clearTimeout(Wr),Wr=void 0,H.clear(),z=null,B="",jt=!1,st=!1,Me=!1,rt=!1,qs()}});var Bd=`.bloom-cls {
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
`;var _d=new S("ChatListStatus"),Dd="chatListStatus",_i="bloom-cls",yh="bloom-cls",vh=1200*1e3,xh="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Ct=new Map,Gt=!1,gt="",oe=!1,Vn=!1,bt=0,Ae=null,Us=null,Un=null,js=null,Di=null,Yr=null,Kn=!1,He=new Set;function $i(){return Date.now()}function qd(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ie(t,e,n,r=!0){if(!(!t||!Gt)){if(e==="idle")Ct.delete(t);else{let o=Ct.get(t);o&&o.kind===e&&n!=="net"?o.at=$i():Ct.set(t,{kind:e,at:$i(),source:n})}r&&Eh({v:1,id:t,kind:e,at:$i()}),en()}}function Eh(t){try{Un?.postMessage(t)}catch{}}function wh(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ie(e.id,e.kind,"bc",!1)}function Sh(){let t=$i();for(let[e,n]of Ct)n.kind==="streaming"&&t-n.at>vh&&Ct.delete(e)}function Lh(){let t=qd();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(xh))continue;let o=ne(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function $d(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Gs(t){let e=t.querySelector(`:scope > .${_i}`);return e||null}function Ks(){if(!Gt)return;Sh();let t=C(),e=Lh();Ae?.disconnect();try{for(let n of e){let r=ne(n.getAttribute("href")||"");if(!r||!t||r!==t){Gs(n)?.remove();continue}let i=Ct.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Gs(n)?.remove();continue}let a=Gs(n);a||(a=document.createElement("span"),a.className=_i,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild($d("streaming")):i==="error"&&a.appendChild($d("error")))}}catch(n){_d.debug("paint failed",n)}Fd()}function en(){if(Gt){if(document.hidden){bt&&(cancelAnimationFrame(bt),bt=0),Ks();return}bt||(bt=requestAnimationFrame(()=>{bt=0,Gt&&Ks()}))}}function Fd(){let t=qd();if(!(Ae&&Us===t&&t?.isConnected)){if(Ae?.disconnect(),Us=t,!t){Ae=null;return}Ae=new MutationObserver(()=>en()),Ae.observe(t,{childList:!0,subtree:!0})}}function qi(){return!!(Fe()||Rr())}function Th(t){return!!(Kn||t&&He.has(t)||!Vn&&!q()&&qi())}function kh(t){if(Gt){if(t.type==="post-start"){Vn=!1,t.conversationId?(Kn=!1,He.add(t.conversationId),oe=!0,ie(t.conversationId,"streaming","net")):(Kn=!0,oe=!0);return}if(t.type==="post-end"){if(Kn=!1,t.conversationId){He.delete(t.conversationId);let e=C(),n=In();(e?t.conversationId===e:t.conversationId===n)?ie(t.conversationId,t.error?"error":"done","net"):ie(t.conversationId,"idle","net")}qi()||(oe=!1)}}}function Ch(t,e){if(!Gt)return;if(F(e,t)){en();return}let n=C();if(gt&&gt!==n){He.delete(gt);let r=Ct.get(gt);r&&r.kind!=="idle"&&ie(gt,"idle","local")}Kn=!1,oe=!1,Vn=!0,n&&Ct.get(n)?.kind==="streaming"&&Ct.get(n)?.source==="local"&&!He.has(n)&&ie(n,"idle","local"),en()}function Mh(t){if(!Gt)return;let e=t.conversationId||C();if(gt&&e&&gt!==e){He.delete(gt);let r=Ct.get(gt);r&&r.kind!=="idle"&&ie(gt,"idle","local"),oe=!!(e&&He.has(e))}if(e&&(gt=e),Vn||q()){if(q()||qi()||t.streaming){en();return}Vn=!1}if(Th(e)&&(t.streaming||qi())){oe=!0,e&&ie(e,"streaming","local"),en();return}oe&&(oe=!1,e&&ie(e,Dt()?"error":"done","local")),en()}var zd=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${_i}`],start(){Gt=!0,w(Dd,Bd);try{Un=new BroadcastChannel(yh)}catch{Un=null}Un?.addEventListener("message",wh),js=ut(kh),Di?.(),Di=et({onTick:Mh,onContext:Ch}),Yr?.abort(),Yr=new AbortController,document.addEventListener("visibilitychange",()=>{Gt&&(bt&&(cancelAnimationFrame(bt),bt=0),Ks())},{signal:Yr.signal}),Fd(),_d.debug("sidebar status watch started")},stop(){Gt=!1,bt&&cancelAnimationFrame(bt),bt=0,Yr?.abort(),Yr=null,Ae?.disconnect(),Ae=null,Us=null,Di?.(),Di=null,js?.(),js=null;try{Un?.close()}catch{}Un=null,Ct.clear(),He.clear(),Kn=!1,oe=!1,Vn=!1,gt="",document.querySelectorAll(`.${_i}`).forEach(t=>t.remove()),E(Dd)}});var Gd="widerChat",Ud=40,Kd=96,Vd=64,Wd=L({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Ud,max:Kd,default:Vd}});function Ah(){return J(Number(Wd.store.width??Vd),Ud,Kd)}function jd(){let t=Ah(),e=`min(100%,${t}rem)`;w(Gd,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var Yd=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Wd,start:jd,onSettingsChange:jd,stop(){E(Gd)}});var Vs="composerOpacity",Wn='form[data-type="unified-composer"],form.w-full[data-type]',Hh=[`${Wn} [class*="corner-superellipse"]`,`${Wn} [class*="bg-token-bg-primary"]`,`${Wn} [class*="bg-token-main-surface"]`].join(","),Nh=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Ih="#thread-bottom-container,#thread-bottom",Rh=`${Wn} #prompt-textarea,${Wn} [contenteditable="true"]`,Ph="var(--bg-primary,var(--main-surface-primary,#ffffff))",Ws=L({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Oh(){return J(Number(Ws.store.opacity??100),0,100)}function Bh(){return J(Number(Ws.store.blur??16),0,40)}function Xd(){let t=Oh();if(t>=100){E(Vs);return}let e=Bh(),n=`color-mix(in srgb,${Ph} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(Vs,`${Ih}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Nh}{display:none!important}${Wn}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Hh}{background-color:${n}!important;background-image:none!important;${r}}${Rh}{background-color:transparent!important;background-image:none!important}`)}var Zd=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ws,start:Xd,onSettingsChange:Xd,stop(){E(Vs)}});var Jd=`#bloom-bn-host {
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
`;var $h=new S("BetterNavigator"),Ys="betterNavigator",nm="bloom-bn-host",sn=60,_h=16,qh=1e3,Fh=2.5,zh=.4,ji="\u6B63\u5728\u8F93\u51FA\u2026",Qs="Image",jh="\u2753",Gh="\u{1F916}",Qd=/file_[0-9a-f]+/gi,Uh="File",Kh="Code",Vh=".markdown, .whitespace-pre-wrap",il=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Wh="img, picture, video, canvas",Yh=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,Xh=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,eo=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,Zh=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Jh=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Qh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,t0=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,e0=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,n0=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,r0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),o0=2e3,i0=40,a0=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,s0=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),l0=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),c0=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),u0=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Zi=L({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Xn=new Map,to=new Map,Kt=new Set,Gi=0,Mt=!1,se=!1,Yn=!1,Ne=null,no=null,on=null,Ui=null,Y=[],an="",Ki=0,Vi=-1,al=0,Wi="",ht=0,ae=0,Xr,Zr=null,Fi=null,Xs=null,Zs=null,nn=null,tl=null,Jr=null,rn=null,Zn=null,Qr=null;function Ji(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Js(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function d0(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function m0(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)a0.test(d0(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Js(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Js(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Js(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Yi(t){try{return!!t.closest(l0)}catch{return!0}}function tm(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Qi(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function sl(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function f0(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function zi(t,e){if(t){Qd.lastIndex=0;for(let n of t.matchAll(Qd))e.add(n[0].toLowerCase())}}function p0(t){try{let e=new Set,n=s=>{f0(s)||(zi(s.getAttribute("src")||"",e),zi(s.getAttribute("srcset")||"",e),zi(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&zi(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Qi(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function g0(t,e){let n=p0(t),r=to.get(e)??0,o=Math.max(r,n);return o>0&&to.set(e,o),o>=2?`${Qs} x${o}`:Qs}function j(t){return t.replace(/\s+/g," ").trim()}function rm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(c0))return!0;n=n.parentElement}return!1}function Xi(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(rm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(il);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return j(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<sn+20;)e.push(j(r.textContent||""));return j(e.join(" "))}function ro(t){let e=j(t);return e.length<3||e.length>180||eo.test(e)?!1:Yh.test(e)?!0:Xh.test(e)}function ta(t){let e=j(t);return e.length<8||e.length>120||/\s/.test(e)||eo.test(e)||ro(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function b0(t){let e=[],n=i=>{let a=j(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(j(s[1])),e.push(j(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function h0(t){try{return Yi(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function ll(t){let e=j(t);return!e||cl(e)||ta(e)?!0:ro(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function y0(t){return!t.length||t.length>4||!t.every(e=>ll(e))?!1:t.some(e=>eo.test(j(e))||ro(e)||ta(e))}function om(t){try{let e=null,n=0,r=`${il}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(h0(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=b0(o);if(!i.length||i.length>4||i.join(" ").length>240||!y0(i))continue;let a=i.some(c=>eo.test(j(c))),s=i.some(c=>ro(c)||ta(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function v0(t){return om(t)?Uh:""}function x0(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(Zh.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function E0(t){try{for(let e of t.querySelectorAll(Wh))if(!x0(e))return!0}catch{}return!1}function cl(t){let e=j(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||t0.test(e)||Qh.test(e)?!0:e.length<=24&&(e0.test(e)||eo.test(e))}function w0(t){let e=[],n=new Set,r=o=>{try{if(rm(o,t)||o.closest(il))return}catch{return}let i=Xi(o);!i||n.has(i)||cl(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>sn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Xi(o).length<24)&&(r(o),e.join(" ").length>sn+20))break}}catch{}return j(e.join(" "))}function S0(t){let e=om(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=j(i.innerText||i.textContent||"");!a||a.length>sn+20||r.has(a)||ll(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return j(n.join(" "))}function L0(t,e){let n=[];try{for(let o of t.querySelectorAll(Vh)){if(Yi(o))continue;let i=Xi(o);if(!(!i||e==="assistant"&&cl(i)||ll(i))&&(n.push(i),n.join(" ").length>sn+20))break}}catch{}let r=j(n.join(" "));if(e==="user"){let o=S0(t);if(o)return o}return r||(e==="assistant"?w0(t):"")}function T0(t){return t.length>sn?`${t.slice(0,sn).trimEnd()}\u2026`:t}function em(t){return n0.test(t)}function k0(t,e,n,r){let o=L0(t,e);if(o)return T0(o);if(r)return ji;let i=v0(t);if(i)return i;if(sl(t))return g0(t,Qi(t));try{if(E0(t))return Qs;if(t.querySelector("pre, code"))return Kh}catch{}return`Message ${n+1}`}function C0(){if(se)return!0;let t=C();return!!(t&&Kt.has(t)||!Yn&&!q()&&oo())}function oo(){return!!(Fe()||Rr())}function M0(){Gi=Date.now()}function im(t){se=!1,t&&Kt.delete(t);let e=C();e&&Kt.delete(e)}function A0(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function H0(t){if(sl(t)||!oo())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Xi(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function ul(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=j(e.textContent||"");if(!(n.length>32)&&Jh.test(n))return!0}}catch{}return!1}function am(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function N0(t,e){try{if(A0(t))return!0;if(!e)return!1;if(H0(t)||ul(t))return!0}catch{}return!1}function sm(t){if(!t||oo())return!1;try{if(ul(t)||am(t))return!1;if(t.querySelector(r0)||sl(t))return!0}catch{}return!1}function I0(t){if(oo()||Gi&&Date.now()-Gi<o0)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!sm(e.el)||im()}function R0(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(s0)){if(Yi(r))continue;let i=Qi(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(Yi(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function P0(){let t=Ji();if(!t||t===document.body)return[];let e=Zi.store.showAssistant!==!1,n=e&&C0(),r=R0(t),o=null;if(e)for(let a of r)tm(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Qi(a);if(!s)continue;let l=tm(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&ul(a),d=c&&am(a),m=l==="assistant"&&c&&!sm(a)&&(u||d||n||N0(a,!0)),f=k0(a,l,i.length,m);if(f&&f!==ji){let b=Xn.get(s),p=!!b&&(ro(b)||ta(b));(!b||p||!em(f)||em(b))&&f!==b&&Xn.set(s,f)}let g=m&&f===ji?ji:Xn.get(s)||f;i.push({id:s,el:a,role:l,text:g,live:m})}}catch{}return I0(i),i}function O0(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function lm(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function B0(t){return t===window?window.innerHeight:t.clientHeight}function D0(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(u0)}catch{return!1}}function cm(){Xr!==void 0&&(clearTimeout(Xr),Xr=void 0),Zr?.classList.remove("bloom-bn-flash"),Zr=null}function $0(t){cm(),t.classList.add("bloom-bn-flash"),Zr=t,Xr=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Zr===t&&(Zr=null),Xr=void 0},800)}function el(t){if(!Y.length)return;let e=Math.max(0,Math.min(t,Y.length-1));Ki=e,no?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),on?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),Ui&&(Ui.textContent=`${e+1} / ${Y.length}`);let n=on?.children[e];if(n instanceof HTMLElement){let r=on;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function nl(t){let e=Y[t];if(!e?.el.isConnected)return;Vi=t,al=Date.now()+qh,el(t);let n=Zn??lm(e.el),o=Math.abs(e.el.getBoundingClientRect().top-O0())>Fh*B0(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),Zi.store.jumpEffect!=="none"&&$0(e.el)}function dl(){if(!Mt||!Y.length)return;if(Date.now()<al&&Vi>=0){el(Vi);return}let t=window.innerHeight*zh,e=0;for(let n=0;n<Y.length;n++){let r=Y[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}el(e)}function _0(t){let e=lm(t);if(Zn===e&&Qr)return;Qr?.(),Zn=e;let n=e===window?document:e,r=()=>{dl(),ml()};n.addEventListener("scroll",r,{passive:!0}),Qr=()=>n.removeEventListener("scroll",r)}function q0(t){rn?.disconnect(),rn=null;let e=Zn instanceof HTMLElement?Zn:null;rn=new IntersectionObserver(()=>dl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&rn.observe(n.el)}function F0(){if(!document.body)return null;let t=Ne;if(t?.isConnected)return t;t=document.createElement("div"),t.id=nm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Ne=t,no=e,on=i,Ui=o,t}function um(){let t=Ne,e=Ji();if(!t||!e||!e.isConnected||Y.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=m0(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||i0,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let m=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${m}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function ml(){!Mt||ae||(ae=requestAnimationFrame(()=>{ae=0,Mt&&um()}))}function z0(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function j0(t){let e=no,n=on;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>_h),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=z0(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),nl(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?jh:Gh;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),nl(o)}),n.appendChild(a)}))}function G0(t){no?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=on?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function U0(){let t=C();return t===Wi?!1:(Wi=t,Xn.clear(),to.clear(),Y=[],an="",Ki=0,Vi=-1,al=0,se&&t&&(Kt.add(t),se=!1),!0)}function K0(t){let e=Zi.store.showAssistant!==!1?"1":"0";return`${Wi}|${e}|${t.map(n=>n.id).join(",")}`}function rl(){if(!Mt)return;U0();let t=P0(),e=Ji();if(!e||t.length<1){Y=t,an="",Ne&&(Ne.hidden=!0),rn?.disconnect(),ol();return}F0();let n=K0(t);n!==an?(Y=t,an=n,j0(t),_0(e),q0(t)):(Y=t,G0(t)),um(),dl(),ol()}function Ut(){if(Mt){if(document.hidden){ht&&(cancelAnimationFrame(ht),ht=0),rl();return}ht||(ht=requestAnimationFrame(()=>{ht=0,Mt&&rl()}))}}function ol(){let t=Ji();if(!(nn&&tl===t&&t?.isConnected)){if(nn?.disconnect(),Jr?.disconnect(),tl=t,!t||t===document.body){nn=null;return}nn=new MutationObserver(()=>Ut()),nn.observe(t,{childList:!0,subtree:!0}),Jr=new ResizeObserver(()=>ml()),Jr.observe(t)}}function V0(t){if(Mt){if(t.type==="post-start"){M0(),Yn=!1,t.conversationId?(se=!1,Kt.add(t.conversationId)):se=!0,Ut();return}if(t.type==="post-end"){if(se=!1,t.conversationId)Kt.delete(t.conversationId);else{let e=C();e&&Kt.delete(e)}Ut()}}}function W0(t){if(!Mt||!Y.length||Ne?.hidden||t.altKey||t.ctrlKey||t.metaKey||D0(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Ki+1;else if(t.key==="ArrowUp")e=Ki-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=Y.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),nl(Math.max(0,Math.min(e,Y.length-1)))}function Y0(){cm(),rn?.disconnect(),rn=null,nn?.disconnect(),nn=null,tl=null,Jr?.disconnect(),Jr=null,Qr?.(),Qr=null,Zn=null,Ne?.remove(),Ne=null,no=null,on=null,Ui=null}var dm=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Ys,cleanupSelectors:[`#${nm}`],settings:Zi,start(){Mt=!0,Wi=C(),w(Ys,Jd),Fi=new AbortController;let{signal:t}=Fi;window.addEventListener("keydown",W0,{signal:t}),window.addEventListener("popstate",Ut,{signal:t}),window.visualViewport?.addEventListener("resize",ml,{signal:t}),document.addEventListener("visibilitychange",()=>{Mt&&(ht&&(cancelAnimationFrame(ht),ht=0),ae&&(cancelAnimationFrame(ae),ae=0),rl())},{signal:t}),Zs=ut(V0),Xs=et({onTick(){if(q()){Ut();return}Yn&&!oo()&&(Yn=!1),Ut()},onFall(e){im(e.conversationId),Ut()},onContext(e,n){if(!F(n,e)){Xn.clear(),to.clear(),an="",se=!1;let r=C();for(let o of[...Kt])o!==r&&Kt.delete(o);Yn=!0}Ut()}}),ol(),Ut(),$h.debug("navigator started")},stop(){Mt=!1,ht&&cancelAnimationFrame(ht),ht=0,ae&&cancelAnimationFrame(ae),ae=0,Fi?.abort(),Fi=null,Xs?.(),Xs=null,Zs?.(),Zs=null,Kt.clear(),se=!1,Yn=!1,Gi=0,Y0(),Xn.clear(),to.clear(),Y=[],an="",E(Ys)},onSettingsChange(){an="",Ut()}});var mm=`.bloom-ts {
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
`;function fm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function pm(t){try{return new Date(t).toISOString()}catch{return""}}var hm=new S("MessageTimestamps"),gm="messageTimestamps",na="bloom-ts",bm=1500,Z0="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Jn=L({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Qn=new Map,un=!1,yt=0,Ie=null,pl=null,fl=null,ea=null,io=null,ao=!1,ln=!1;function ym(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function bl(){let t=Jn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function vm(){let t={...bl()};for(let[n,r]of Qn)t[n]=r;let e=Object.keys(t);if(e.length>bm){let n=e.slice(e.length-bm),r={};for(let o of n)r[o]=t[o];Jn.store.stamps=r;return}Jn.store.stamps=t}var J0=ec(vm,500);function xm(t,e){!t||!e||Qn.get(t)===e||(Qn.set(t,e),J0(),cn())}function Q0(t){return t?Qn.get(t)??bl()[t]??ci(t)??null:null}function ty(t){un&&t.type==="message-time"&&xm(t.messageId,t.createTime)}function ey(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function ny(){let t=ym();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Z0)||e.push(n)}catch{}return e}function ry(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function gl(){if(!un)return;let t=Jn.store.hideOwnMessages===!0,e=Jn.store.showDate!==!1,n=U();ln&&!q()&&(ln=!1),ln&&(n?ao=!1:ln=!1);let r=ln?!1:n,o=ny();Ie?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=ey(i),c=i.querySelector(`:scope > .${na}`);if(t&&l==="user"){c?.remove();return}if(ry(i)){c?.remove();return}let u=Q0(s);if(!u&&s&&(r||ao)&&a>=o.length-2&&(u=Date.now(),xm(s,u)),!u){c?.remove();return}let d=fm(u,e);if(!d){c?.remove();return}let m=c;m||(m=document.createElement("time"),m.className=na,m.setAttribute("aria-hidden","true"),i.insertBefore(m,i.firstChild)),m.textContent!==d&&(m.textContent=d);let f=pm(u);f&&m.getAttribute("datetime")!==f&&m.setAttribute("datetime",f)})}catch(i){hm.debug("paint failed",i)}ao=r,Em()}function cn(){if(un){if(document.hidden){yt&&(cancelAnimationFrame(yt),yt=0),gl();return}yt||(yt=requestAnimationFrame(()=>{yt=0,un&&gl()}))}}function Em(){let t=ym();if(!(Ie&&pl===t&&t?.isConnected)){if(Ie?.disconnect(),pl=t,!t||t===document.body){Ie=null;return}Ie=new MutationObserver(()=>cn()),Ie.observe(t,{childList:!0,subtree:!0})}}var wm=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${na}`],settings:Jn,start(){un=!0,w(gm,mm);let t=bl();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Qn.set(e,n);fl=ut(ty),ea?.(),ea=et({onTick:cn,onFall:cn,onContext(e,n){F(n,e)||(ln=!0,ao=!1),cn()}}),io?.abort(),io=new AbortController,document.addEventListener("visibilitychange",()=>{un&&(yt&&(cancelAnimationFrame(yt),yt=0),gl())},{signal:io.signal}),Em(),cn(),hm.debug("timestamp watch started")},stop(){un=!1,yt&&cancelAnimationFrame(yt),yt=0,io?.abort(),io=null,Ie?.disconnect(),Ie=null,pl=null,ea?.(),ea=null,fl?.(),fl=null,ln=!1,ao=!1,vm(),Qn.clear(),document.querySelectorAll(`.${na}`).forEach(t=>t.remove()),E(gm)},onSettingsChange:cn});var hl="streamerMode",oy="filter:blur(6px)!important;transition:filter .2s ease",iy="filter:none!important",tr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],er=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function vt(t,e){return t.map(n=>`${n} ${e}`)}var dn=L({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function nr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${oy}}${e?`${r}{${iy}}`:""}`}function Sm(){let t=[];if(dn.store.conversations!==!1&&(t.push(nr([...vt(er,'a[href^="/c/"]'),...vt(er,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),dn.store.projects!==!1&&(t.push(nr([...vt(er,'a[href*="/project"]'),...vt(er,'a[href*="/g/g-p-"]'),...vt(er,'[data-testid="project-name"]'),...vt(er,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),dn.store.headerTitle!==!1&&t.push(nr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),dn.store.accountAvatar!==!1&&t.push(nr([...vt(tr,"img"),...vt(tr,'[class*="avatar"]'),...vt(tr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),dn.store.accountName!==!1&&t.push(nr([...vt(tr,".min-w-0 > .truncate"),...vt(tr,".min-w-0.flex-1 .truncate")],!1)),dn.store.accountEmail!==!1&&t.push(nr([...vt(tr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){E(hl);return}w(hl,t.join(`
`))}var Lm=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:dn,start:Sm,onSettingsChange:Sm,stop(){E(hl)}});var Tm=`.bloom-gc-panel {
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
}`;var sy=new S("GreetingCustomizer"),rr="greetingCustomizer",km="greetingCustomizerUi",so=100,vl=30,ly=120,cy=1e3,uy=50,dy=40,my=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),lo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),sa=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function fy(t){return!!t?.closest(my)}function Hm(t){return!!(fy(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function bo(t){try{for(let e of document.querySelectorAll(t))if(!Hm(e))return e}catch{}return null}function yl(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(bo(e))return e;return t}var Nm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],X=L({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Ay},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Nm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Vt=!1,ar=!1,fn=null,oa,co,or,uo,ia=0,ra=null,ir=null,mo=null,fo=null,po=null,aa=null;function ce(){let t=location.pathname||"/";return t==="/"||t===""}function mn(){let t=X.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Nm.slice()}function go(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Cm(t){X.store.greetings=t.slice(0,vl)}function ho(){let t=String(X.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function py(){return X.store.order==="random"?"random":"sequential"}function gy(){return J(Number(X.store.intervalSec??10),1,3600)*1e3}function by(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function hy(){return!!bo(sa)}function la(){return!!(bo(sa)||bo(lo))}function yy(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=hy()?yl(sa):bo(lo)?yl(lo):yl(sa),i=e?`${lo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function vy(t,e){if(t<=0)return 0;if(t===1)return Number(X.plain.index)!==0&&(X.store.index=0),Number(X.plain.lastRandom)!==0&&(X.store.lastRandom=0),0;let n=Number(X.plain.index),r=Number(X.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(py()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return X.store.index=s,X.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return X.store.index=i,i}function le(t){if(!Vt)return;if(!ce()){E(rr);return}let e=mn().map(go).filter(Boolean);if(!e.length){E(rr);return}let n=vy(e.length,t),r=e[n]??e[0],o=ho()==="manual"&&e.length>1;w(rr,yy(by(r),o)),aa?.()}function xl(){oa!==void 0&&(clearInterval(oa),oa=void 0)}function El(){xl(),!(!Vt||!ce())&&ho()==="interval"&&(mn().filter(Boolean).length<=1||(oa=setInterval(()=>le(!0),gy())))}function wl(){uo!==void 0&&(clearTimeout(uo),uo=void 0),ia=0}function Mm(){if(wl(),!Vt||!ce())return;ia=dy;let t=()=>{if(uo=void 0,!(!Vt||!ce())){if(la()){ho()==="refresh"&&!ar?(ar=!0,le(!0)):le(!1),El();return}ia-=1,ia>0&&(uo=setTimeout(t,uy))}};t()}function Sl(){if(fn===!0){la()?le(!1):Mm();return}fn=!0,ar=!1,ho()==="refresh"?(ar=!0,le(!0)):le(!1),El(),la()||Mm()}function Ll(){fn=!1,ar=!1,xl(),wl(),E(rr)}function ca(){or===void 0&&(or=window.setTimeout(()=>{or=void 0,Vt&&(ce()?Sl():fn!==!1&&Ll())},ly))}function xy(){ir||(ir=history.pushState.bind(history),mo=history.replaceState.bind(history),fo=function(...e){let n=ir(...e);return ca(),n},po=function(...e){let n=mo(...e);return ca(),n},history.pushState=fo,history.replaceState=po)}function Ey(){fo&&history.pushState===fo&&ir&&(history.pushState=ir),po&&history.replaceState===po&&mo&&(history.replaceState=mo),ir=null,mo=null,fo=null,po=null}function wy(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(ca)}function Sy(t){if(!Vt||!ce()||ho()!=="manual"||mn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(lo);if(!n||Hm(n))return;let r=window.getSelection?.();r&&String(r).trim()||le(!0)}function Ly(){co===void 0&&(co=setInterval(()=>{if(!Vt)return;let t=ce();if(t!==(fn===!0)){t?Sl():Ll();return}t&&la()&&le(!1)},cy))}function Ty(){co!==void 0&&(clearInterval(co),co=void 0)}function Am(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var ky="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Cy="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function My(t,e){let n=go(t);return n?n.length>so?`Keep it to ${so} characters.`:mn().length+(e?1:0)>vl?`At most ${vl} greetings.`:null:"Enter a greeting."}function Ay(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=mn(),s=Number(X.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=so,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let p=l.querySelector(".bloom-gc-count");p&&(p.textContent=`${go(e).length}/${so}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${go(e).length}/${so}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=r;let f=document.createElement("div");if(f.className="bloom-gc-actions",n>=0){let p=document.createElement("button");p.type="button",p.className="bloom-gc-btn",p.textContent="Cancel",p.addEventListener("click",()=>{n=-1,e="",r="",i()}),f.appendChild(p)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let p=n<0,T=My(e,p);if(T){r=T,i();return}let M=go(e),N=mn().slice();n>=0&&n<N.length?N[n]=M:N.push(M),Cm(N),n=-1,e="",r="",i()}),f.appendChild(g),u.append(d,m,f),l.appendChild(u),t.appendChild(l),!a.length){let p=document.createElement("p");p.className="bloom-gc-empty",p.textContent="No greetings. The official heading stays.",t.appendChild(p);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((p,T)=>{let M=document.createElement("div");M.className="bloom-gc-item",T===s&&(M.dataset.active="true");let N=document.createElement("button");N.type="button",N.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,N.textContent=p,N.addEventListener("click",()=>{o=o===T?-1:T,i()});let Xt=document.createElement("div");Xt.className="bloom-gc-item-actions";let At=Am("Edit",ky);At.addEventListener("click",()=>{n=T,e=p,r="",i()});let ot=Am("Delete",Cy);ot.addEventListener("click",()=>{let R=mn().filter((lt,Zt)=>Zt!==T);Cm(R),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),Xt.append(At,ot),M.append(N,Xt),b.appendChild(M)}),t.appendChild(b)};return aa=i,i(),()=>{aa===i&&(aa=null),t.replaceChildren()}}var Im=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:km,settings:X,start(){Vt=!0,w(km,Tm),xy(),ra=new AbortController;let{signal:t}=ra;window.addEventListener("popstate",ca,{signal:t}),document.addEventListener("click",wy,{capture:!0,signal:t}),document.addEventListener("click",Sy,{signal:t}),Ly(),fn=null,ce()?Sl():Ll(),sy.debug("started")},stop(){Vt=!1,ra?.abort(),ra=null,or!==void 0&&(clearTimeout(or),or=void 0),xl(),wl(),Ty(),Ey(),E(rr),ar=!1,fn=null},onSettingsChange(){Vt&&(ce()?(le(!1),El()):E(rr))}});function Hy(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function ua(t){try{return await createImageBitmap(t)}catch{return null}}async function Ny(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function da(t){if(t.startsWith("data:")){let e=Hy(t);if(e){let n=await ua(e);if(n)return n}return Ny(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?ua(await e.blob()):null}catch{return null}}var fa="data-bloom-csi-slot",Iy="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Ry=/\bsize-(?:[6-9]|10)\b/,Py=/\b(?:h|w)-(?:[6-9]|10)\b/,Oy=/^(plus|pro|free|team|go|business|enterprise)$/i,By=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function ma(t){return t.getAttribute("class")||""}function Pm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Ry.test(t)?!0:Py.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Dy(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Om(e)}function Om(t){return Oy.test(String(t??"").replace(/\s+/g,""))}function Wt(t){return!!t?.closest(Iy)}function pa(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function yo(t){let e=ma(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Om(t.textContent||"")}function ga(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function vo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function $y(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Bm(t){if(Wt(t)||ga(t)||vo(t)||yo(t)||pa(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Dm(t){return Wt(t)||ga(t)||vo(t)||yo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Dy(t.textContent||"")}function $m(t){return Wt(t)||vo(t)||pa(t)||yo(t)?!1:Pm(ma(t))||Dm(t)?!0:Bm(t)}function Rm(t){return!(Wt(t)||pa(t)||vo(t)||yo(t)||ga(t))}function pn(t,e){let n=ga(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(vo(n)||pa(n)||yo(n));)Wt(n)||(r=n),n=n.parentElement;return r}function _y(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Wt(e))continue;if($y(ma(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Rm(o))){if($m(o)||Pm(ma(o)))return pn(o,t)??o;r.push(o)}if(r.length===1)return pn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Rm(r))return pn(r,t)??r}}return null}function qy(t){let e=t.querySelectorAll(By);for(let n of e)if($m(n))return pn(n,t)??n;return null}function Fy(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Dm(e))return pn(e,t)??e;return null}function zy(t){for(let e of t.querySelectorAll("*"))if(Bm(e))return pn(e,t)??e;return null}function _m(t,e){if(Wt(t))return null;if(e&&!Wt(e)&&t.contains(e)){let n=pn(e,t);if(n)return n}return _y(t)??qy(t)??Fy(t)??zy(t)}function qm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var sr="data-bloom-csi",ba="data-bloom-csi-orig",gn=new Set,Fm=null;function kl(t){Fm=t}function zm(t){return`url(${JSON.stringify(t)})`}function ha(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Cl(t,e,n){let r=zm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function jm(t,e=fa){let n=zm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function jy(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function lr(t){t.removeEventListener("error",Tl);let e=t.getAttribute(ba);t.removeAttribute(sr),t.removeAttribute(ba),e&&t.getAttribute("src")!==e&&(t.src=e)}function Tl(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&gn.add(n),lr(e),Fm?.()}function Gm(t,e){if(!e||gn.has(e)){lr(t);return}jy(t);let n=t.getAttribute("src")??"";if(t.getAttribute(sr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(ba)&&t.setAttribute(ba,n);t.setAttribute(sr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Tl),t.addEventListener("error",Tl),n!==e&&(t.src=e)}var Um=`/*
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
`;var Km=new S("CustomSidebarIdentity"),Vm="customSidebarIdentityUi",Xm="customSidebarIdentity",Uy="bloom-csi-face",Ky="bloom-csi-name",cr=fa,Vy=1024,ya=256,Zm=24,Jm=64,Qm=40,Nl=1,Il=4,xo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Ml=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=L({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:dv},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Zm,max:Jm,default:Qm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function hn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Wy(){return String(x.store.displayName??"").trim()}function Ea(t,e,n,r,o){let i=J(n,Nl,Il),a=Math.min(t,e)/i,s=J(r,a/2,Math.max(a/2,t-a/2)),l=J(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Yy(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Rl(t){let e=Math.min(1,Vy/Math.max(t.width,t.height));return Yy(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Xy(t,e,n,r){let{side:o,x:i,y:a}=Ea(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=ya,s.height=ya;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,ya,ya);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Zy(t){let e=await ua(t);if(!e)return null;let n=Rl(e);return e.close(),n}async function Ol(t,e,n,r){let o=await da(t);if(!o)return null;let i=Xy(o,e,n,r);return o.close(),i}function Bl(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function Wm(){x.store.avatarUrl="",x.store.avatarSource="",Bl()}var Ym=0;async function Pl(t){let e=++Ym;Bl(),x.store.avatarSource=t;let n=await Ol(t,.5,.5,1);return e!==Ym?!1:(n&&(x.store.avatarUrl=n),!!n)}function Eo(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Al(t){let e=Eo(t);if(!e)return!1;let n=await Zy(e);return n?Pl(n):!1}var xt=!1,ur=!1,dr=0,wa=0,va=null,Re=new Map,mr=null,ue=null,Sa=null,Yt=null,La=null;function Ta(t){let e=String(t??"").trim();if(!e||gn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function tf(){return Ta(x.store.avatarUrl)??Ta(x.store.avatarSource)}var xa=!1,Hl=new Set;function ef(){let t=Ta(x.store.avatarSource);if(!t?.startsWith("data:image/")||Ta(x.store.avatarUrl)?.startsWith("data:image/")||xa||Hl.has(t))return;xa=!0;let e=hn(x.store.cropX,.5),n=hn(x.store.cropY,.5),r=hn(x.store.cropZoom,1);Ol(t,e,n,r).then(o=>{if(xa=!1,!o){Hl.add(t);return}xt&&(x.store.avatarUrl=o,ka())}).catch(()=>{xa=!1,Hl.add(t)})}function bn(t,e){return t.map(n=>`${n} ${e}`)}function Jy(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Qy(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Jy(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function nf(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Wt(n)||n.closest(".min-w-0")||e.push(n);return e}function tv(t){let e=nf(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Dl(){let t=[],e=De();e&&t.push(e);let n=Ln();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(xo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function rf(t,e){let n=tv(t);if(n)Gm(n,e);else for(let o of nf(t))lr(o);let r=_m(t,n);for(let o of t.querySelectorAll(`[${cr}]`))o!==r&&o.removeAttribute(cr);r&&r.setAttribute(cr,"")}function ev(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function nv(t,e){let n=ev(t);n&&rf(n,e)}function rv(){for(let t of document.querySelectorAll(`img[${sr}]`))lr(t);for(let t of document.querySelectorAll(`[${cr}]`))t.removeAttribute(cr)}function ov(){let t=J(Math.round(hn(x.store.avatarSize,Qm)),Zm,Jm),e=tf(),n=Wy(),r=x.store.applyToMenu!==!1,o=[],i=[...bn(xo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...bn(Ml,"> :first-child img"));let a=[...bn(xo,".min-w-0 > .truncate"),...bn(xo,".min-w-0.flex-1 .truncate")];r&&a.push(...bn(Ml,"> :first-child .truncate"));let s=qm(cr);o.push(ha([...s.flatMap(l=>bn(xo,l))].join(","),t)),o.push(ha(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(ha(s.flatMap(l=>bn(Ml,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Cl(i.join(","),e,t)),o.push(Cl("#stage-sidebar-tiny-bar img",e,32)),o.push(jm(e))),n&&o.push(Qy(a,n)),w(Xm,o.join(""))}function iv(){let t=tf(),e=Dl();for(let n of e)rf(n,t);if(x.store.applyToMenu!==!1){let n=Tn();n&&nv(n,t)}for(let n of document.querySelectorAll(`img[${sr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||lr(n)}function ka(){if(!(!xt||ur)){ur=!0;for(let t of Re.values())t.disconnect();ue?.disconnect(),Yt?.disconnect();try{ov(),iv()}finally{ur=!1,$l(),cv(),mr?.isConnected&&of(mr),ef()}}}function wo(){!xt||dr||(dr=requestAnimationFrame(()=>{dr=0,ka()}))}function av(){ur||!xt||wo()}function sv(t){if(Re.has(t))return;let e=new MutationObserver(av);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Re.set(t,e)}function lv(t){Re.get(t)?.disconnect(),Re.delete(t)}function $l(){let t=new Set;for(let n of Dl())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Ln();e&&t.add(e);for(let n of[...Re.keys()])(!t.has(n)||!n.isConnected)&&lv(n);for(let n of t)n.isConnected&&sv(n)}function cv(){let t=_o();if(!t){Yt?.disconnect(),Yt=null,Sa=null;return}if(Sa===t&&Yt){Yt.observe(t,{childList:!0});return}Yt?.disconnect(),Sa=t,Yt=new MutationObserver(()=>{ur||!xt||($l(),wo())}),Yt.observe(t,{childList:!0})}function of(t){mr===t&&ue||(ue?.disconnect(),mr=t,ue=new MutationObserver(()=>{if(!t.isConnected){ue?.disconnect(),ue=null,mr=null;return}ur||!xt||wo()}),ue.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function af(t){if(!xt||x.store.applyToMenu===!1)return;let e=Tn();if(e){of(e),wo();return}t<=0||requestAnimationFrame(()=>af(t-1))}function sf(t){xt&&(ka(),!(Dl().length||t<=0)&&(wa=requestAnimationFrame(()=>sf(t-1))))}function uv(t){xt&&x.store.applyToMenu!==!1&&(!qo(t)&&!Tn()||af(10))}function dv(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let m=document.createElement("div");m.className="bloom-csi-crop";let f=document.createElement("div");f.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,f.appendChild(g);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let p=document.createElement("input");p.type="range",p.className="bloom-csi-zoom",p.min=String(Nl),p.max=String(Il),p.step="0.05",p.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let M=document.createElement("button");M.type="button",M.className="bloom-csi-btn",M.textContent="Reset",b.append(p,T,M);let N=document.createElement("p");N.className="bloom-csi-hint",N.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",m.append(f,b,N),t.append(u,d,m);function Xt(){let h=String(x.store.avatarSource??""),k=String(x.store.avatarUrl??"");return h.startsWith("data:image/")?h:k.startsWith("data:image/")?k:""}function At(h,k,A){if(!a)return i.x=h,i.y=k,i.zoom=J(A,Nl,Il),i;let tt=Ea(a.w,a.h,A,h*a.w,k*a.h);return i.x=tt.x/a.w,i.y=tt.y/a.h,i.zoom=tt.z,i}function ot(){p.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let h=a?Ea(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;h&&a&&(g.style.width=`${a.w/h.side*100}%`,g.style.height=`${a.h/h.side*100}%`,g.style.left=`${(.5-h.x/h.side)*100}%`,g.style.top=`${(.5-h.y/h.side)*100}%`)}function R(h=!1){let k=Xt(),A=String(x.store.avatarUrl??"").trim(),tt=!!k;s.hidden=!A&&!k,(k||A)&&(s.src=k||A),document.activeElement!==l&&(l.value=tt?"":A),l.placeholder=tt?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",m.hidden=!k,d.hidden=!(e&&/^https?:\/\//.test(A)&&!k),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",k&&(h&&(i.x=hn(x.store.cropX,.5),i.y=hn(x.store.cropY,.5),i.zoom=hn(x.store.cropZoom,1)),g.getAttribute("src")!==k&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},At(i.x,i.y,i.zoom),ot()},g.src=k),ot())}function lt(h,k,A,tt=!1){At(h,k,A),ot();let Gl=Xt(),Ul=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,Gl&&Ol(Gl,i.x,i.y,i.zoom).then(Kl=>{Kl&&(x.store.avatarUrl=Kl)})};r&&clearTimeout(r),tt?Ul():r=setTimeout(Ul,80)}function Zt(h){x.store.avatarUrl=h;let k=h.trim();if(n&&clearTimeout(n),!k){x.store.avatarSource="",Bl(),e=!1,R(!0);return}if(k.startsWith("data:image/")){e=!1,n=setTimeout(()=>{da(k).then(A=>{if(!A)return;let tt=Rl(A);A.close(),tt&&Pl(tt).then(()=>R(!0))})},80);return}if(/^https?:\/\//.test(k)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{da(k).then(A=>{if(!A){e=!0,R(!0);return}let tt=Rl(A);A.close(),tt?(e=!1,Pl(tt).then(()=>R(!0))):(e=!0,R(!0))})},400);return}e=!1,x.store.avatarSource="",R(!0)}u.addEventListener("paste",h=>{Eo(h.clipboardData)&&(h.preventDefault(),e=!1,Al(h.clipboardData).then(()=>R(!0)))}),u.addEventListener("dragover",h=>{Eo(h.dataTransfer)&&h.preventDefault()}),u.addEventListener("drop",h=>{Eo(h.dataTransfer)&&(h.preventDefault(),e=!1,Al(h.dataTransfer).then(()=>R(!0)))}),l.addEventListener("change",()=>Zt(l.value)),l.addEventListener("paste",h=>{Eo(h.clipboardData)&&(h.preventDefault(),e=!1,Al(h.clipboardData).then(()=>R(!0)))}),l.addEventListener("keydown",h=>{Xt()&&!l.value&&(h.key==="Backspace"||h.key==="Delete")&&(Wm(),e=!1,R(!0))}),c.addEventListener("click",()=>{Wm(),e=!1,R(!0)}),f.addEventListener("pointerdown",h=>{h.button===0&&(f.setPointerCapture(h.pointerId),o.on=!0,o.px=h.clientX,o.py=h.clientY,o.x=i.x,o.y=i.y)}),f.addEventListener("pointermove",h=>{if(!o.on||!a)return;let k=f.clientWidth;if(!k)return;let{side:A}=Ea(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);At(o.x-(h.clientX-o.px)*(A/k)/a.w,o.y-(h.clientY-o.py)*(A/k)/a.h,i.zoom),ot()}),f.addEventListener("pointerup",()=>{o.on&&(o.on=!1,lt(i.x,i.y,i.zoom,!0))}),f.addEventListener("pointercancel",()=>{o.on=!1}),f.addEventListener("wheel",h=>{h.preventDefault(),lt(i.x,i.y,i.zoom*(h.deltaY<0?1.08:1/1.08))},{passive:!1}),p.addEventListener("input",()=>lt(i.x,i.y,Number(p.value))),p.addEventListener("change",()=>lt(i.x,i.y,Number(p.value),!0)),M.addEventListener("click",()=>lt(.5,.5,1,!0));let jl=()=>R(!1);return La=jl,R(!0),()=>{La===jl&&(La=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var lf=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Vm,cleanupSelectors:[`.${Uy}`,`.${Ky}`],settings:x,start(){xt=!0,gn.clear(),kl(wo),w(Vm,Um),va=new AbortController,document.addEventListener("click",uv,{signal:va.signal}),sf(40),ef(),Km.debug("started")},onSettingsChange(){gn.clear(),La?.(),xt&&($l(),ka())},stop(){xt=!1,va?.abort(),va=null,dr&&cancelAnimationFrame(dr),dr=0,wa&&cancelAnimationFrame(wa),wa=0;for(let t of Re.values())t.disconnect();Re.clear(),ue?.disconnect(),ue=null,mr=null,Yt?.disconnect(),Yt=null,Sa=null,rv(),E(Xm),kl(null),gn.clear(),Km.debug("stopped")}});var fr=new S("Bloom"),cf=!1,mv=Date.now(),fv=[zc,Ru,zu,Uu,Xu,ed,pd,bd,vd,Od,zd,Yd,Zd,dm,wm,Lm,Im,lf];function Ca(t){return new Promise(e=>setTimeout(e,t))}function pv(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function gv(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var df=8e3,uf=300,bv=250;async function hv(){if(Be())return await Ca(uf),!0;for(;Date.now()-mv<df;)if(await Ca(bv),Be())return await Ca(uf),!0;return Be()||Ba()}function _l(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function yv(){if(_l())return!0;let t=Date.now()+df;for(;Date.now()<t;)if(await Ca(100),_l())return!0;return _l()}function vv(){try{GM_registerMenuCommand?.("Bloom++ settings",Fc)}catch{}}function xv(){Io(()=>{gr("HostShell"),fr.info("host shell",ct)}),Ro(()=>{fr.info("idle ready",ct)}),Po(()=>{Aa(),gr("HostReady"),fr.info("chrome ready",ct)})}async function ql(){await oc()}async function Fl(){if(cf)return;cf=!0;for(let n of fv)try{dc(n),Ec(n)}catch(r){fr.error("register failed",n.name,r)}gr("Init"),vv(),xv();let t=()=>gr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await pv(),Aa(),fr.info("styles ready",ct),await gv(),yv().then(n=>{n&&Oo()}),!await hv()){fr.warn("late islands not detected; starting default plugins",ct),En(),Bo();return}await vc()}var mf=typeof unsafeWindow<"u"?unsafeWindow:window,Ev=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Ev){let t=mf.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",ct);try{Object.defineProperty(mf,"Bloom",{value:zl,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}ql().then(()=>Fl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
