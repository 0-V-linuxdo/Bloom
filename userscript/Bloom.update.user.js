// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.86
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

/* Bloom++ [20260924] v1.4.86. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var sf=Object.defineProperty;var lf=(t,e)=>{for(var n in e)sf(t,n,{get:e[n],enumerable:!0})};var $l={};lf($l,{REPO_URL:()=>bc,Settings:()=>B,VERSION:()=>lt,contextKeyFromUrl:()=>te,conversationTitle:()=>Cn,conversationToken:()=>Et,currentConversationId:()=>M,hasDraftText:()=>Nt,hasErrorToast:()=>Bt,hasLateIslands:()=>Pe,init:()=>Dl,initSettings:()=>Bl,isDocumentInteractive:()=>yc,isStreaming:()=>tt,isUserDraftEmpty:()=>be,messageCreateTime:()=>si,plugins:()=>Zt,requestChromeReady:()=>Po,requestIdleReady:()=>vn,requestShellReady:()=>Ro,setEditorText:()=>Qt,subscribeHarvest:()=>ct,watchStreamingEdge:()=>et,whenChromeReady:()=>No,whenIdleReady:()=>Io,whenShellReady:()=>Ho});var ce=new Map,Eo=!1;function cf(){return document.getElementById("bloom-root")?.shadowRoot??null}function jl(){return document.head??null}function bn(){let t=cf();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=uf()}function ka(t,e){if(!Eo)return;let n=jl();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),bn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,bn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,bn()}function w(t,e){let n=ce.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},ce.set(t,n)),Eo&&ka(t,n)}function Ma(){if(!jl())return!1;Eo=!0;for(let[e,n]of ce)ka(e,n);return bn(),!0}function Gl(t){let e=ce.get(t);e&&(e.disabled=!1,Eo&&ka(t,e))}function Ul(t){let e=ce.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),bn())}function E(t){let e=ce.get(t);e&&(e.el?.remove(),ce.delete(t),bn())}function uf(){return Array.from(ce.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var Ca=new Map;function hn(t,e){let n=Ca.get(t);return n||(n=new Set,Ca.set(t,n)),n.add(e),()=>n.delete(e)}function Ne(t,e){let n=Ca.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var df="bloompp";function Kl(){return new Promise((t,e)=>{let n=indexedDB.open(df,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Vl(t){try{let e=await Kl();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Wl(t,e){try{let n=await Kl();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function Y(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function X(t,e,n){return Math.min(n,Math.max(e,t))}function Yl(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Xl(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Zl(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var wo=new S("SettingsStore"),ue="BloomSettings",mf=100;function So(t){return t!=null&&typeof t.then=="function"}function ff(t){if(t==null||So(t))return null;if(Y(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(Y(e)&&!So(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return Y(n)&&!So(n)?n:null}return null}catch{return null}}function To(t){let e=ff(t);if(!e)return null;let n=e.plugins;return!Y(n)||So(n)||Object.keys(n).length===0?null:e}function Ha(t){return Y(t)?t:null}function Aa(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:Y(t)?Object.keys(t).length===0:!1}function pf(t){return Aa(t)?0:Array.isArray(t)?12+Math.min(t.length,40):Y(t)?12+Math.min(Object.keys(t).length,40):3}function Re(t){if(!t)return-1;let e=t.plugins;if(!Y(e))return-1;let n=0;for(let r of Object.values(e)){let o=Ha(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=pf(a))}return n}function Jl(t){let e=t.plugins;if(!Y(e))return 0;let n=0;for(let r of Object.values(e))Ha(r)?.enabled===!0&&n++;return n}function Ql(t){let e=t.map((i,a)=>({bag:i,index:a,score:Re(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=Jl(a.bag)-Jl(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!Y(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(Y(a))for(let[s,l]of Object.entries(a)){let c=Ha(l);if(!c)continue;if(!Y(r[s])){let m=structuredClone(c);delete m.defaultsRev,m.enabled!==!0&&delete m.enabled,Object.keys(m).length&&(r[s]=m);continue}let u=r[s];for(let[m,d]of Object.entries(c))if(m!=="defaultsRev"){if(m==="enabled"){!("enabled"in u)&&d===!0&&(u.enabled=!0);continue}Aa(u[m])&&!Aa(d)&&(u[m]=structuredClone(d))}}}let o=r.Settings;return Y(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Re(n)}}var Lo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let m=l.slice(c.length+1);if(m&&!m.includes(".")){let d=u(m);d!==void 0&&(i[a]=d,s=d);break}}}return Y(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){wo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},mf))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ue,this.plain)}catch{try{GM_setValue(ue,e)}catch(n){wo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(ue,e)}catch{}Wl(ue,e).catch(n=>wo.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){wo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Yl(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var gf=new S("Settings"),bf={plugins:{}},B=new Lo(structuredClone(bf)),hf=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function yf(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?de(n):{}},get plain(){let n=e.pluginName;return n?B.plain.plugins[n]??{}:{}}};return e}async function vf(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function tc(){let t=To(await vf(ue)),e=To(await Vl(ue)),n=null;try{n=To(localStorage.getItem(ue))}catch{n=null}let r=Ql([t,e,n]);if(r){let o=r.bag.plugins;o&&(B.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);gf.info("Loaded settings from",i,"richness",r.score,"gm",Re(t),"idb",Re(e),"ls",Re(n))}B.releasePersist(),r&&(r.index!==0||r.score>Re(t))&&B.persistLoadedBag()}function de(t){return B.plain.plugins[t]||(B.plain.plugins[t]={}),B.store.plugins[t]}function ec(t,e){e&&(e.pluginName=t,de(t),B.setDefaultGetter(hf(t),n=>{if(n!=="enabled")return yf(e.def,n)}))}function nc(){return de("Settings")}function ko(){return nc().pinnedPlugins??[]}function rc(t){return ko().includes(t)}function oc(t){let e=ko(),n=e.includes(t);return B.store.plugins.Settings={...B.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function Mo(){return nc().starredPlugins??[]}function ic(t){return Mo().includes(t)}function ac(t){let e=Mo(),n=e.includes(t);return B.store.plugins.Settings={...B.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var Co=new S("PluginManager"),Zt={},dr=new Set;function sc(t){if(Zt[t.name]){Co.warn("Duplicate plugin",t.name);return}Zt[t.name]=t,ec(t.name,t.settings)}function yn(t){let e=Zt[t];if(!e)return!1;if(e.required)return!0;let n=B.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function lc(t){let e=Zt[t];if(!e||e.required)return;let n=!yn(t);de(t),B.store.plugins[t].enabled=n,n?cc(e):xf(e),Ne("pluginToggle",{name:t,enabled:n})}function cc(t,e=!1){if(!dr.has(t.name)&&yn(t.name))try{t.managedStyle&&Gl(t.managedStyle),t.start?.(),dr.add(t.name),t.settings&&B.addPrefixChangeListener(`plugins.${t.name}.`,()=>{dr.has(t.name)&&t.onSettingsChange?.()}),e||Co.debug("Started",t.name)}catch(n){Co.error("Failed to start",t.name,n)}}function xf(t){if(dr.has(t.name)){try{t.stop?.()}catch(e){Co.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Ul(t.managedStyle),E(t.managedStyle)),dr.delete(t.name)}}function mr(t){for(let e of Object.values(Zt))(e.startAt??"DOMContentLoaded")===t&&cc(e)}var fr=!1,Ao=!1,Ia=!1,dc=[],mc=[],fc=[];function Na(t){let e=t.splice(0);for(let n of e)n()}function pr(){fr||(fr=!0,Na(dc))}function Ra(){Ao||(Ao=!0,fr||pr(),Na(mc))}function pc(){Ia||(Ia=!0,fr||pr(),Ao||Ra(),Na(fc))}function Ho(t){fr?t():dc.push(t)}function Io(t){Ao?t():mc.push(t)}function No(t){Ia?t():fc.push(t)}function Ro(){pr()}function vn(){pr(),Ra()}function Po(){pc()}function uc(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function gc(){await uc(4e3),pr(),await uc(4e3),Ra(),pc()}var v={p:"0-V-linuxdo"},lt="[20260924] v1.4.86",bc="https://github.com/0-V-linuxdo/Bloom";var Ef={BetterNavigator:1790240385e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790242944e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1789973738e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function hc(t){let e=Ef[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function wf(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Sf(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Pa(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Pe(){return Pa()?wf()||Sf():!1}function yc(){return Pe()}var Lf=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),vc=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Tf=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),kf="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function En(t){return t.id==="bloom-root"||!!t.closest(kf)}function xc(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Oo(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Oa(t){if(!(t instanceof HTMLElement)||!t.isConnected||En(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Oo(e)?!1:t.getClientRects().length>0}function xn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Mf(){let t=[];for(let e of document.querySelectorAll(Lf))!(e instanceof HTMLElement)||!e.isConnected||En(e)||t.push(e);return t}function Bo(t){if(!t.isConnected||En(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Oe(){return Mf().filter(Bo)[0]??null}function wn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||En(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Ba(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!En(n)&&!xn(n)&&n.parentElement&&!xn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!xn(r)&&!En(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!xn(r.parentElement))return r}return e}function Sn(){let t=document.querySelectorAll(vc);for(let n of t)if(Oa(n)&&!Oo(n)&&xc(n))return n;let e=document.querySelectorAll(Tf);for(let n of e){if(!Oa(n)||!xc(n)||Oo(n))continue;let r=n.querySelector(vc);return Oa(r)&&!Oo(r)?r:n}return null}function Do(){let t=Oe();if(t){let e=Ba(t),n=e.parentElement;if(n&&!xn(n))return n;if(!xn(e))return e}return wn()}function $o(t){let e=Oe();return e?t.composedPath().includes(e):!1}var $a=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Cf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Af(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Hf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Da(t){let e=Af(t);return e?Hf(e)>.55?"light":"dark":null}function If(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Da(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Da(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Da(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function _o(t){return t==="auto"?If():t}function Nf(t){try{let e=getComputedStyle(document.documentElement);for(let n of $a){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function qo(t,e,n){let r=Cf[e];if(n){Nf(t);for(let o of $a)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of $a)t.style.setProperty(o,r[o])}function Ec(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var _a=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Pf="bloom-root",Ht="bloom-rail-item",Uo="bloom-account-item",De="bloom-sidebar-panel",Sr="bloom-plugin-dialog",Jo="bloom-plugin-layer",Ko="bloom-settings-css",Of=2e3,Lc=null,Bf=null,ge=!1,ja=[],Fo=null,Vo=null,fe=null,jo=null,Jt=null,xr=null,gr,Ln=0,Er=0,br=0,hr=null,yr=null,Wo=null,Tc=null,vr=null,qa=[],Yo=!1,Df=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],$f=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],_f=new Set(["chat","ui","privacy"]),qf=10080*60*1e3,Qo="",wr="all",At="all";function ti(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function kc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Ff(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function zf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function jf(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Gf(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Uf={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Kf(t){return t.icon||Uf[t.name]||ti()}function Fa(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),qo(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Mc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Xo(){let t="auto",e=_o(t);Fa(Lc,e,!0);let n=document.getElementById(De);n instanceof HTMLElement&&Fa(n,e,!0);let r=document.getElementById(Sr);r instanceof HTMLElement&&Fa(r,e,!0);let o=document.getElementById(Ht);o instanceof HTMLElement&&Mc(o),Ne("schemeChange",{scheme:e,pref:t})}function Cc(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Ac(){if(w("settings",_a),document.getElementById(Ko)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Ko,t.textContent=_a,document.head.appendChild(t)}function Vf(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Wf(){for(let t of ja)t();ja=[]}function Hc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Yf(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Ka(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Xf(t){return Ka(t).length>0}function Go(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Zf(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Yf(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Jf(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Zf(e,n));let i=de(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ja.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Go(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Go(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Hc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Go(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function wc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Qf(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=de(t.name);for(let[n,r]of Ka(t)){if(n==="enabled"||r.type===5)continue;let o=Go(r);o!==void 0&&(e[n]=o)}Nc(t)}function Ic(t){t.key==="Escape"&&(!document.getElementById(Jo)&&!document.getElementById(Sr)||(t.stopPropagation(),Tn()))}function tp(){Yo||(document.addEventListener("keydown",Ic),Yo=!0)}function ep(){Yo&&(document.removeEventListener("keydown",Ic),Yo=!1)}function Tn(){Wf(),ep(),document.getElementById(Jo)?.remove(),document.getElementById(Sr)?.remove()}function Nc(t){if(Tn(),!document.body)return;let e=document.createElement("div");e.id=Jo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",pe),e.addEventListener("pointerup",pe),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Tn()});let n=document.createElement("div");n.id=Sr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",pe),n.addEventListener("pointerup",pe),n.addEventListener("click",pe);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=kc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Tn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=wc("Authors"),m=document.createElement("p");m.className="bloom-plugin-dialog-authors",m.textContent=t.authors.join(", "),u.appendChild(m),n.appendChild(u)}let s=wc("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Ka(t);if(c.length)for(let[u,m]of c){let d=Jf(t.name,u,m);d&&l.appendChild(d)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let m=document.createElement("button");m.type="button",m.className="bloom-plugin-dialog-reset",m.textContent="Reset",m.addEventListener("click",()=>Qf(t)),u.appendChild(m),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),tp(),Xo()}function np(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Kf(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=ic(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=jf(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let f=ac(t.name);Ne("pluginStar",{name:t.name,starred:f})}),s.appendChild(c),!t.required){let b=rc(t.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),f.innerHTML=Gf(b),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let C=oc(t.name);Ne("pluginPin",{name:t.name,pinned:C})}),s.appendChild(f)}if(Xf(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=zf(),b.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Nc(t)}),s.appendChild(b)}let u=Hc(t.name,yn(t.name),!!t.required),m=u.querySelector("input");if(m?.addEventListener("click",b=>b.stopPropagation()),m?.addEventListener("change",()=>{lc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let d=document.createElement("div");d.className="bloom-card-separator";let p=document.createElement("div");p.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",p.appendChild(g),e.append(n,d,p),e}function Rc(){return Object.values(Zt).filter(t=>!t.hidden&&t.name!=="Settings")}function rp(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<qf}function Pc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return rp(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>_f.has(r)):n.includes(e)}function op(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function ip(){return Qo.trim()?"No plugins match your search.":At==="favorites"?"No favorites yet. Star a plugin to see it here.":At==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function ap(){let t=Rc();return $f.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Pc(n,e.id)))}function sp(){if(vr){vr.replaceChildren();for(let t of ap()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${At===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{At=t.id,Be()}),vr.appendChild(e)}}}function lp(){let t=Rc();if(At==="favorites"){let e=new Set(Mo());t=t.filter(n=>e.has(n.name))}else At!=="all"&&(t=t.filter(e=>Pc(e,At)));return wr==="enabled"&&(t=t.filter(e=>yn(e.name))),wr==="disabled"&&(t=t.filter(e=>!yn(e.name))),t}function Be(){if(!hr)return;sp();let t=lp();Wo&&(Wo.placeholder=`Search ${t.length} plugins...`);let e=t,n=Qo.trim().toLowerCase();if(n&&(e=e.filter(r=>op(r).includes(n))),At==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(At!=="favorites"){let r=ko();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}hr.replaceChildren();for(let r of e)hr.appendChild(np(r));yr&&(yr.hidden=e.length>0,yr.textContent=ip())}function pe(t){t.stopPropagation()}function za(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Va(){document.getElementById(Ht)?.setAttribute("aria-expanded",ge?"true":"false")}function cp(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Wa(){Tn(),Qo="",wr="all",At="all",document.getElementById(De)?.remove(),ge=!1,Va()}function up(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",pe),e.addEventListener("pointerup",pe),e.addEventListener("click",pe);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=ti();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Ff();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn bloom-settings-close",m.setAttribute("aria-label","Close"),m.innerHTML=kc(),m.addEventListener("click",Wa),r.appendChild(o),n.appendChild(r);let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let p=document.createElement("div");p.className="bloom-search-bar";let g=document.createElement("input");g.type="search",g.className="bloom-search-input",g.setAttribute("aria-label","Search plugins"),g.placeholder="Search plugins...",g.addEventListener("input",()=>{Qo=g.value,Be()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let C of Df){let H=document.createElement("option");H.value=C.value,H.textContent=C.label,b.appendChild(H)}b.value=wr,b.addEventListener("change",()=>{wr=b.value,Be()}),p.append(g,b),n.appendChild(p);let f=document.createElement("div");f.className="bloom-plugin-list",n.appendChild(f);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(m,n),hr=f,yr=T,Wo=g,Tc=b,vr=d,Be(),e}function dp(t){t.classList.add("bloom-rail-dock")}function mp(){let t=document.getElementById(Ht);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Bo(t)?t:null}function fp(){if(document.getElementById(De)?.remove(),!document.body)return;let t=up(De);dp(t),document.body.appendChild(t),ge=!0,Tn(),Xo(),Va(),Ne("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:lt,dock:"center",rail:!!mp()})}function Ya(){let t=document.getElementById(De);if(t instanceof HTMLElement&&t.isConnected&&cp(t)){Wa();return}t?.remove(),fp()}function pp(){let t=document.createElement("button");return t.type="button",t.id=Ht,t.className="bloom-rail-item",t.setAttribute("aria-controls",De),t.setAttribute("aria-expanded",ge?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${ti()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ya()}),t}function Sc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function gp(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function bp(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function me(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Oc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=gp(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&me(t,"padding-top",Math.round(i)),Number.isFinite(a)&&me(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));me(n,"width",l),me(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&me(t,"padding-left",u);let m=bp(e,r);if(m){let d=m.getBoundingClientRect(),p=n.getBoundingClientRect(),g=Math.round(d.left-p.right);g>=0&&g<=24&&me(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&me(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&me(t,"gap",Math.round(l))}Mc(t)}function Ga(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function hp(){if(xr?.isConnected&&Jt){Jt.observe(xr,{childList:!0});return}Ua()}function yp(t){if(Ga(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function vp(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){br=0;return}br+=1,Er=Date.now()+Math.min(8e3,250*2**Math.min(br,5))})}function xp(){Ln||Date.now()<Er||(Ln=requestAnimationFrame(()=>{Ln=0,!(Date.now()<Er)&&(document.getElementById(Ht)?.isConnected||Zo())}))}function Zo(){if(!document.body)return;Jt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Ht);t=n instanceof HTMLButtonElement?n:pp();let r=Oe(),o=wn();if(r){let i=Ba(r),a=i.parentElement;if(Ga(i)||a&&Ga(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Sc(t),Oc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Sc(t,!0)):t.isConnected&&!Bo(t)&&(t.remove(),t=null)}finally{vp(t,e),hp(),Va()}}function Ua(){let t=Do();!t||!yp(t)||xr===t&&Jt||(Jt?.disconnect(),xr=t,Jt=new MutationObserver(()=>{document.getElementById(Ht)?.isConnected||xp()}),Jt.observe(t,{childList:!0}))}function Ep(){Zo(),Ua(),gr===void 0&&(gr=window.setInterval(()=>{let t=document.getElementById(Ht);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Er&&Zo();else{br=0;let e=Oe();e&&Oc(t,e)}Ua()},Of))}function wp(){gr!==void 0&&(clearInterval(gr),gr=void 0),Ln&&cancelAnimationFrame(Ln),Ln=0,Er=0,br=0,Jt?.disconnect(),Jt=null,xr=null}function Sp(t){jo===t&&fe||(fe?.disconnect(),jo=t,fe=new MutationObserver(()=>{if(!t.isConnected){fe?.disconnect(),fe=null,jo=null;return}Bc(t)}),fe.observe(t,{childList:!0}))}function Bc(t){if(Sp(t),t.querySelector(`#${Uo}`))return;let e=document.createElement("button");e.type="button",e.id=Uo,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${ti()}<span>Bloom++</span>`,e.addEventListener("pointerdown",za),e.addEventListener("pointerup",za),e.addEventListener("click",n=>{za(n),Ya()}),t.insertBefore(e,t.firstChild)}function zo(){let t=Sn();return t?(Bc(t),!0):!1}function Lp(t){$o(t)&&(queueMicrotask(zo),requestAnimationFrame(()=>{zo()}),window.setTimeout(zo,60),window.setTimeout(zo,180))}function Tp(){Vo?.abort();let t=new AbortController;Vo=t,document.addEventListener("click",Lp,{signal:t.signal})}function kp(){Vo?.abort(),Vo=null,fe?.disconnect(),fe=null,jo=null}function Dc(){vn(),Vf(()=>{Ac(),Cc(),Zo(),Ya()})}var $c=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Pf}`,`#${Ht}`,`#${Uo}`,`#${De}`,`#${Jo}`,`#${Sr}`,`#${Ko}`,"#bloom-menu-panel"],start(){Ac(),Cc(),Ep(),Tp(),Fo?.(),Fo=Ec(Xo),Xo(),qa=[hn("pluginToggle",()=>{ge&&Be()}),hn("pluginPin",()=>{ge&&Be()}),hn("pluginStar",()=>{ge&&Be()})]},stop(){wp(),kp(),Fo?.(),Fo=null;for(let t of qa)t();qa=[],Wa(),document.getElementById(Ht)?.remove(),document.getElementById(Uo)?.remove(),document.getElementById(Ko)?.remove(),Lc=null,Bf=null,hr=null,yr=null,Wo=null,Tc=null,vr=null,ge=!1}});var ei='form[data-type="unified-composer"], form.w-full[data-type]',It=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),kn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),_c=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),qc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Mp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Cp='[contenteditable="false"], button, [role="button"]';function vt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function $e(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!vt(o)))return o;return null}function Fc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function D(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Fc(t);return!!(Mp.test(n)||/^stop$/i.test(n))}function xt(){let e=Array.from(document.querySelectorAll(ei)).find(vt);if(e instanceof HTMLElement)return e;let n=$e(document,It),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function Z(){let t=Array.from(document.querySelectorAll(It));return t.find(vt)??t[0]??null}function Ap(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Cp);return!!n&&n!==e&&e.contains(n)}function Xa(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Ap(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Nt(t){let e=t??Z();return e?Xa(e,e).replaceAll("\u200B","").trim().length>0:!1}function be(t){return!Nt(t)}function ni(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function zc(t){let e=xt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!vt(n))&&t(n))return n;return null}function he(){let t=xt(),e=$e(t,kn)??$e(document,kn);return e&&!D(e)?e:zc(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!D(n);let o=Fc(n);return/^(send|send prompt|发送)$/i.test(o)&&!D(n)})}function _e(){let t=xt(),e=$e(t,_c,!0)??$e(document,_c,!0);if(e)return e;let n=$e(t,qc)??$e(document,qc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&vt(r)&&D(r))return r}return zc(D)}function Rt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Xa(n,t)).join(`
`):Xa(t,t)}function Za(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function Qt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Za(t,n)}var jc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Et(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function te(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ee(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(jc)?.[1]??""}catch{return t.match(jc)?.[1]??""}}function M(){return ee(location.pathname)}var Vc=new S("Harvest"),Hp=1500,Ip=200,ri=new Set,oi=new Map,ii=new Map,Mn=null,ai=null,Lr=null,Pt=0;function Np(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Rp(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Pp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function Wc(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var Op=/"action"\s*:\s*"(next|continue|variant)"/i;function Bp(t,e,n){return!(e!=="POST"||Wc(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Op.test(n))}function Dp(t,e){return e!=="GET"||Wc(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Gc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Yc(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function $p(t){return typeof t=="string"?Yc(t):""}function Ja(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ja(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Xc(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function Uc(t,e,n){!t||!e||ii.get(t)!==e&&(ii.set(t,e),Xc(ii,Hp),ye({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function _p(t,e){let n=e.trim();!t||!n||oi.get(t)!==n&&(oi.set(t,n),Xc(oi,Ip),ye({type:"conversation-meta",conversationId:t,title:n}))}function Tr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Tr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&_p(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ja(l.create_time??l.createTime??l.created_at);c&&u&&Uc(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ja(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&Uc(a,s,o),r.mapping&&typeof r.mapping=="object")Tr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Tr(l,o,n+1)}function Kc(t,e){if(t)try{Tr(JSON.parse(t),e)}catch{}}function ye(t){for(let e of Array.from(ri))try{e(t)}catch{}}async function qp(t,e,n){if(n===Pt)try{let r=await t.json();if(n!==Pt)return;Tr(r,e)}catch{}}async function Fp(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Pt&&ye({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Pt;){let{done:u,value:m}=await s.read();if(u)break;if(c+=l.decode(m,{stream:!0}),!o){let p=Yc(c);p&&(o=p,ye({type:"post-start",conversationId:o,url:""}))}let d=c.split(`
`);c=d.pop()??"";for(let p of d){let g=p.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||Kc(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Pt&&Kc(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Pt&&ye({type:"post-end",conversationId:o,error:i})}function zp(t,e,n){let r=Rp(e),o=Pp(e,n),i=Dp(r,o),a=Bp(r,o,n?.body),s=Pt,l="";return a&&(l=$p(n?.body)||Gc(r)||ee(r)||M(),ye({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Pt||!i&&!a)return c;try{let u=c.clone();i?qp(u,Gc(r)||M(),s):Fp(u,l,!c.ok,s)}catch{a&&ye({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Pt&&ye({type:"post-end",conversationId:l,error:!0}),c})}function jp(){if(Mn)return;let t=Np();Lr=t,Mn=t.fetch.bind(t);let e=(n,r)=>zp(Mn,n,r);ai=e,t.fetch=e,Vc.debug("conversation fetch harvest hooked")}function Gp(){Pt+=1,!(!Mn||!Lr)&&(ai&&Lr.fetch===ai&&(Lr.fetch=Mn),Mn=null,ai=null,Lr=null,Vc.debug("conversation fetch harvest unhooked"))}function ct(t){return ri.add(t),jp(),()=>{ri.delete(t),ri.size===0&&Gp()}}function Cn(t){return t?oi.get(t)??"":""}function si(t){return t?ii.get(t)??null:null}var Jc=new S("Streaming");function Hr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!vt(e))&&(D(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Up(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&vt(t))}function Kp(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&vt(t))}function Vp(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Bt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function tt(){if(_e()||Hr()||Vp())return!0;let t=he();return t&&vt(t)&&!D(t)?!1:!!(Up()||Kp())}var Wp=400,Zc=3,je=new Set,kr,Mr=null,Qa=null,Fe=!1,qe=0,xe="",Ee="",we=!1,Cr=!1,Ar=!1,Ot=!1,j=null,ut="",ze=!1;function J(){return Ot}function ui(){return we}function An(){return ut}function ts(){return M()||ut}function Qc(){return te(Et())}function li(t,e){return{streaming:t,contextKey:e,conversationId:ts()}}function es(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Yp(t){return!t||t==="/"||t.startsWith("/g/")}function _(t,e){if(!t||t===e)return!1;let n=ee(es(e)||e);return!n||!(t.endsWith("|draft")||Yp(es(t)))?!1:ut?n===ut:ze}function ci(){Fe=!1,qe=0,xe="",we=!1,Cr=!1,Ar=!1,ut="",ze=!1}function Xp(t){for(let e of Array.from(je))try{e.onFall?.(t)}catch{}}function Zp(t){for(let e of Array.from(je))try{e.onRise?.(t)}catch{}}function ve(t){for(let e of Array.from(je))try{e.onTick?.(t)}catch{}}function Jp(t,e){for(let n of Array.from(je))try{n.onContext?.(t,e)}catch{}}function Qp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&D(n)&&(we=!0)}function tg(t){if(t.type==="post-start"){let n=M();if(!t.conversationId){n||(ze=!0),(!n||n===ut)&&(Ot=!1,we=!1);return}if(!(t.conversationId===n||t.conversationId===ut)&&!(!n&&ze))return;ut=t.conversationId,ze=!1,Ot=!1,we=!1;return}if(t.type!=="post-end"||!Fe&&!j)return;let e=M();t.conversationId&&!(e?t.conversationId===e:t.conversationId===ut)||(Ar=!0,t.error&&(Cr=!0,j&&(j.error=!0)))}function eg(){let t=Qc(),e=tt();if(Ee&&t&&Ee!==t){let o=Ee;if(!_(o,t))j=null,ci(),Ot=e;else{let i=ee(es(t));if(i&&!ut&&(ut=i,ze=!1),xe===o&&(xe=t),j&&j.contextKey===o){j.contextKey=t;let a=ts();a&&(j.conversationId=a)}Ot=!1}if(Ee=t,Jp(t,o),Ot){ve(li(!1,t));return}}else t&&(Ee=t);if(Ot){if(e){ve(li(!1,t));return}Ot=!1}if(j)if(e||j.contextKey!==t)j=null;else{let o=j;j=null,ci(),Xp(o),ve(li(!1,t));return}let n=li(e,t);if(e){let o=!Fe;o&&(we=!1,Cr=!1,Ar=!1),Fe=!0,qe=0,xe=t,o&&Zp(n),ve(n);return}if(!Fe){ve(n);return}if(qe+=1,Ar&&(qe=Math.max(qe,Zc)),qe<Zc){ve(n);return}if(!(!!xe&&xe===t)){ci(),ve(n);return}j={contextKey:xe||t,conversationId:ts(),userStopped:we,error:Cr||Bt()},ve(n)}function ng(){kr===void 0&&(Fe=tt(),Ee=Qc(),xe=Fe?Ee:"",qe=0,we=!1,Cr=!1,Ar=!1,Ot=!1,j=null,ut="",ze=!1,Mr?.abort(),Mr=new AbortController,document.addEventListener("click",Qp,{capture:!0,signal:Mr.signal}),Qa=ct(tg),kr=setInterval(eg,Wp),Jc.debug("watchStreamingEdge started"))}function rg(){je.size||(kr!==void 0&&(clearInterval(kr),kr=void 0),Mr?.abort(),Mr=null,Qa?.(),Qa=null,ci(),Ee="",Ot=!1,j=null,Jc.debug("watchStreamingEdge stopped"))}function et(t){let e=typeof t=="function"?{onFall:t}:t;return je.add(e),ng(),()=>{je.delete(e),rg()}}var tu="bloom-host-icon",Ir="data-bloom-host-rel",ns="not all",rs=0,eu=0,og=400;function nu(t){rs+=1;try{t()}finally{rs-=1}}function di(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Se(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function ru(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function ig(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function ag(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-eu<og||(eu=n,t.appendChild(e))}function sg(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||di(n)&&(n.getAttribute(Ir)||n.setAttribute(Ir,n.rel),n.media!==ns&&(n.media=ns),n.rel!==tu&&(n.rel=tu))}function lg(t){for(let e of t.querySelectorAll(`link[${Ir}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Ir);n&&(e.rel=n),e.removeAttribute(Ir),e.media===ns&&e.removeAttribute("media")}}function ou(t,e){let{head:n}=document;!n||!e||nu(()=>{sg(n,t);let r=ru(t),{type:o,sizes:i}=ig(e);r?ag(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function iu(t,e){let{head:n}=document;n&&nu(()=>{ru(t)?.remove(),lg(n)})}function au(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(rs)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:di(c.target)&&(a=!0,Se(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)di(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)di(u)&&u.id!==t&&(a=!0,Se(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var cg=["original","badge","dot","hole","bg"],cu=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],uu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},mi="#FCFCFC",ug="#111111",su="#111111",dg="#ffffff",mg="#212121",fg="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",pg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},fi=32,lu=64;function du(t){return typeof t=="string"&&cg.includes(t)}function gg(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function pi(t){let e=document.createElement("canvas");e.width=fi,e.height=fi;let n=e.getContext("2d");return n?(n.scale(fi/lu,fi/lu),t(n),e.toDataURL("image/png")):""}function bg(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function gi(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(fg);n&&(t.strokeStyle=ug,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function hg(t,e,n){let r=uu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=su,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=su,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=dg,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Nr(t,e){if(t==="original")return e==="wait"?pi(r=>gi(r,mi)):gg(pg[e]);let n=e==="wait"?void 0:uu[e];return pi(t==="hole"?r=>gi(r,n??mi):t==="bg"?r=>{r.fillStyle=n??mg,bg(r,0,0,64,64,14),r.fill(),gi(r,mi,!1)}:r=>{gi(r,mi),e!=="wait"&&hg(r,e,t==="dot"?"dot":"badge")})}function mu(t){return{wait:Nr(t,"wait"),rotate:Nr(t,"rotate"),done:Nr(t,"done"),ready:Nr(t,"ready"),error:Nr(t,"error")}}var yg=new S("ChatStateFavicons"),Ue="bloom-chat-state-favicon",hu=["input","beforeinput","cut","paste","compositionend"],yu=L({style:{type:3,description:"Favicon overlay",options:cu}}),Dt="",as={wait:"",rotate:"",done:"",ready:"",error:""},Rr="wait",nt=!1,G=!1,I=null,ot="",dt="",Ve=!0,yi=!1,Hn=null,mt=0,bi=null,hi=null,Ge=null,is=null,In=null,wt=!1,fu=new WeakSet;function vg(){let t=yu.store.style;return du(t)?t:"bg"}function vu(){let e=document.querySelector(`link[rel~="icon"]:not(#${Ue}), link[data-bloom-host-rel]:not(#${Ue})`)?.href;return Se(e)?e:Se(Dt)?Dt:""}function xg(){let t=document.getElementById(Ue);return t instanceof HTMLLinkElement?t:null}function Eg(){if(!Se(Dt)){let t=vu();t&&(Dt=t)}return Se(Dt)?Dt:as.wait}function xu(t){return t==="wait"?Eg():as[t]}function Eu(){ou(Ue,xu(Rr))}function P(t){let e=xu(t);if(Rr===t){let n=xg();if(n&&n.getAttribute("href")===e)return}Rr=t,Eu()}function pu(){as=mu(vg()),P(Rr)}function ss(){return te(Et())}function ls(t,e){!t||!e||t===e||(I===t&&(I=e),ot===t&&(ot=e),dt===t&&(dt=e))}function wg(){let t=ss();if(!(tt()||nt||G))return ot="",t;if(ot&&t&&ot!==t)if(_(ot,t))ls(ot,t),ot=t;else return ot="",t;else!ot&&t&&(ot=t);return ot||t}function gu(t){return!I||!t?!1:I===t?!0:_(I,t)}function wu(){nt=!1,G=!1,I=null,ot=""}function Su(t){dt=t,wu(),Ve=!1,yi=!0,P("wait")}function os(t){return!t&&Ve}function Sg(){if(!wt)return;let t=ss();if(dt&&t&&dt!==t&&!_(dt,t)){Su(t);return}dt&&t&&_(dt,t)&&ls(dt,t),t&&(dt=t);let e=tt(),n=e&&!J();if(yi){if(J()){P("wait");return}yi=!1}if(J()){P("wait");return}let r=wg(),o=be();if(ui()&&!e){nt=!1,G=!1,I=null,P(o?"wait":os(o)?"ready":"wait");return}if(Bt()&&!e&&nt){P("error"),nt=!1,G=!1,I=null;return}if(n){nt||(Ve=!1),nt=!0,G=!1,I=r,P("rotate");return}if(nt)if(!gu(t))nt=!1,G=!1,I=null;else if(G){nt=!1,G=!0,I=t||r,P("done");return}else{P("rotate");return}if(G)if(I&&t&&!gu(t))G=!1,I=null;else if(o){I=r||I,P("done");return}else if(os(o)){G=!1,P("ready");return}else{G=!1,P("wait");return}I=null,o?P("wait"):os(o)?P("ready"):P("wait")}function Ke(){wt&&(Cu(),Tu(),ku(),Sg())}function Lu(){if(In){for(let t of hu)In.removeEventListener(t,Mu,!0);In=null}}function Tu(){let t=xt(),e=t&&t!==document.body?t:null;if(!(In===e&&e?.isConnected)&&(Lu(),!!e)){In=e;for(let n of hu)In.addEventListener(n,Mu,{capture:!0,passive:!0})}}function ku(){let t=xt();if(!(Ge&&is===t&&t.isConnected)){if(Ge?.disconnect(),is=t,!t||t===document.body){Ge=null;return}Ge=new MutationObserver(()=>vi()),Ge.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function vi(){if(wt){if(document.hidden){mt&&(cancelAnimationFrame(mt),mt=0),Ke();return}mt||(mt=requestAnimationFrame(()=>{mt=0,wt&&Ke()}))}}function Mu(){Nt()&&(Ve=!0),vi()}function bu(){Nt()&&(Ve=!0),vi()}function Lg(){wt&&(mt&&(cancelAnimationFrame(mt),mt=0),Ke())}function Tg(){wt&&(Ve=!1,Ke())}function kg(t){if(!wt)return;if(t.userStopped){nt=!1,G=!1,I=null,P("wait");return}if(t.error){nt=!1,G=!1,I=null,P("error");return}let e=ss();if(t.contextKey&&e&&t.contextKey!==e&&!_(t.contextKey,e)){nt=!1,G=!1,I=null,P("wait");return}nt=!1,G=!0,I=e||t.contextKey,P("done")}function Mg(){wt&&Ke()}function Cg(t,e){if(wt){if(_(e,t)){ls(e,t),dt=t,Ke();return}Su(t)}}function Cu(){let t=Z();!t||fu.has(t)||(fu.add(t),t.addEventListener("input",bu,{capture:!0,passive:!0}),t.addEventListener("compositionend",bu,{capture:!0,passive:!0}))}var Au=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:yu,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Ue}`],start(){wt=!0,Dt=vu()||Dt,pu(),hi?.disconnect(),hi=au(Ue,t=>{Se(t)&&(Dt=t),Eu()}),Hn?.abort(),Hn=new AbortController,window.addEventListener("popstate",vi,{signal:Hn.signal}),document.addEventListener("visibilitychange",Lg,{signal:Hn.signal}),Cu(),Tu(),ku(),bi?.(),bi=et({onRise:Tg,onFall:kg,onTick:Mg,onContext:Cg}),Ke(),yg.debug("favicon watch started")},stop(){wt=!1,mt&&cancelAnimationFrame(mt),mt=0,bi?.(),bi=null,Hn?.abort(),Hn=null,Lu(),Ge?.disconnect(),Ge=null,is=null,hi?.disconnect(),hi=null,wu(),dt="",Ve=!0,yi=!1,Rr="wait",iu(Ue,Dt)},onSettingsChange:pu});var Hu=`.bloom-ih-hud {
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
`;var Gx=new S("InputHistory"),cs=/\u200B/g,Iu=10,Nu=500,Ru=100,Hg=8,Ig=120,Ng=2e3,xi=10,Ei=L({maxEntries:{type:4,description:"Max stored prompts",min:Iu,max:Nu,default:Ru},history:{type:5,description:"Stored prompts",render:Vg},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),us=new Map,U=0,ds="",$t=!1,Or=!1,ps=0,Pr=null,ms,gs=null,Pu=!0;function St(){let t=Ei.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ou(t){let e=X(Number(Ei.store.maxEntries??Ru),Iu,Nu);return t.length>e?t.slice(t.length-e):t}function wi(t){Ei.store.entries=Ou(t)}function Rg(t){return t.replaceAll(cs,"").replace(/\n$/,"").trim()}function fs(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(It);return n instanceof HTMLElement?n:Z()}function Pg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Rt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(cs,"").trim().length===0,last:i.toString().replaceAll(cs,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Bu(t){clearTimeout(ms),ms=setTimeout(()=>{if(t!==ps)return;Or=!1;let e=gs;e&&Za(e,Pu)},Ig)}function Du(t,e,n){Or=!0,gs=t,Pu=n;let r=++ps;Qt(t,e,n),Bu(r)}function Og(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Nn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Bg(){document.querySelector(".bloom-ih-hud")?.remove()}function Dg(t,e){let n=Og();n.textContent=t;let r=(e.closest("form")??xt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Hg)}px`,n.classList.add("bloom-ih-hud-on")}function bs(t){let e=Rg(t);if(!e)return;let n=Date.now(),r=us.get(e);if(r&&n-r<Ng)return;us.set(e,n);let o=St().filter(i=>i!==e);o.push(e),wi(o),U=St().length,$t=!1,Nn()}function $g(t,e){let n=St();if(!n.length&&t)return;U>=n.length&&(ds=Rt(e),U=n.length);let r=t?U-1:U+1;r<0||r>n.length||(U=r,$t=!0,Du(e,r===n.length?ds:n[r],t),r<n.length?Dg(`${r+1} / ${n.length}`,e):Nn())}function _g(t){$t=!1,Nn(),Du(t,ds,!1),U=St().length}function qg(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=fs(t.target)??fs(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&$t&&!t.altKey&&!t.shiftKey){_g(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){bs(Rt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=St();if(!r){let i=Pg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||U<=0)||!n&&U>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),$g(n,e))}function Fg(t){if(fs(t.target)){if(Or){Bu(ps);return}$t&&($t=!1,Nn(),U=St().length)}}function zg(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(It);n instanceof HTMLElement&&bs(Rt(n))}function jg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(kn);if(!n||!(n instanceof HTMLElement)||D(n))return;let r=Z();r&&bs(Rt(r))}function Gg(t){if(!(!$t||Or)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}$t=!1,Nn()}}function Ug(){if(Pr)return;Pr=new AbortController;let{signal:t}=Pr,e={capture:!0,signal:t};window.addEventListener("keydown",qg,e),window.addEventListener("input",Fg,e),window.addEventListener("submit",zg,e),window.addEventListener("click",jg,e),window.addEventListener("pointerdown",Gg,e)}function Kg(t){let e=St().slice();e.splice(t,1),wi(e),U>e.length&&(U=e.length)}function Vg(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=St().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/xi));n>=l&&(n=l-1);let c=s.slice(n*xi,n*xi+xi);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let f=document.createElement("div");f.className="bloom-ih-list",c.forEach((T,C)=>{let H=i.indexOf(T),Yt=St().length-1-H,Ct=document.createElement("div");Ct.className="bloom-ih-item";let rt=document.createElement("button");rt.type="button",rt.className=`bloom-ih-body${r===C?"":" bloom-ih-clamp"}`,rt.textContent=T,rt.addEventListener("click",()=>{r=r===C?-1:C,o()});let N=document.createElement("div");N.className="bloom-ih-actions";let st=document.createElement("button");st.type="button",st.title="Copy",st.textContent="C",st.addEventListener("click",()=>{Xl(T)});let Xt=document.createElement("button");Xt.type="button",Xt.title="Delete",Xt.textContent="\xD7",Xt.addEventListener("click",()=>{Kg(Yt),o()}),N.append(st,Xt),Ct.append(rt,N),f.appendChild(Ct)}),t.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(f)}let m=document.createElement("div");m.className="bloom-ih-pager";let d=document.createElement("button");d.type="button",d.className="bloom-ih-btn",d.textContent="Prev",d.disabled=n<=0,d.addEventListener("click",()=>{n-=1,o()});let p=document.createElement("span");p.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(wi([]),U=0,o())}),m.append(d,p,g,b),t.appendChild(m)};return o(),()=>{t.replaceChildren()}}var $u=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Ei,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Hu),U=St().length,$t=!1,Ug()},stop(){Pr?.abort(),Pr=null,Nn(),Bg(),us.clear(),clearTimeout(ms),Or=!1,gs=null,$t=!1},onSettingsChange(){let t=St(),e=Ou(t);e.length!==t.length&&wi(e),U>e.length&&(U=e.length)}});var hs="noShareLink",Wg=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Yg=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],ys=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function _u(t){return`${t.join(",")}{display:none!important}`}function qu(){let t=[];if(ys.store.hideShareChat!==!1&&t.push(_u(Wg)),ys.store.hideShareProject!==!1&&t.push(_u(Yg)),!t.length){E(hs);return}w(hs,t.join(`
`))}var Fu=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:ys,start:qu,onSettingsChange:qu,stop(){E(hs)}});var Gu="noDictation",Xg=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Zg=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Uu=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function zu(t){return`${t.join(",")}{display:none!important}`}function ju(){let t=[zu(Xg)];Uu.store.hideDictationSettings!==!1&&t.push(zu(Zg)),w(Gu,t.join(`
`))}var Ku=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Uu,start:ju,onSettingsChange:ju,stop(){E(Gu)}});var vs="noSidebarIdentity",Rn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Yu=Rn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),Xu=Rn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Jg=[...Yu,...Xu],Qg=[...Yu,...Rn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],tb=Rn.map(t=>`${t} a[href^="mailto:"]`),eb=Rn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),nb=Rn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Br=L({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Vu(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function rb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function ob(){return`${nb.join(",")}{margin-block:auto!important}`}function ib(){return`${eb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Wu(){let t=Br.store.hideUsername!==!1,e=Br.store.hideEmail!==!1,n=t&&Br.store.enlargePlan!==!1,r=t&&Br.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(rb([...Qg,...Xu])),o.push(ob())):o.push(Vu(Jg))),e&&o.push(Vu(tb)),n&&o.push(ib()),!o.length){E(vs);return}w(vs,o.join(`
`))}var Zu=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Br,start:Wu,onSettingsChange:Wu,stop(){E(vs)}});var Ju=`#bloom-rt-host {
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
`;var ed=new S("RecentTopics"),Bn="bloom-rt-host",nd="home",rd=/^\/c\/([a-z0-9_-]{8,})/i,sb=/\/c\/([a-z0-9_-]{8,})/i,od=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,lb=new Set(["Backquote","IntlBackslash"]),cb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),ub=140,db=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),K=L({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:db},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Si=null,Li=null,it=!1,zr=!1,Dr=!1,_t=0,We="",Pn=null,$r=null,On,xs=null,Es=null;function mb(){let t=Number(K.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function _r(){let t=K.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ss(){let t=K.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function id(){let t=K.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ls(){let t=K.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ki(t){let e=mb();return t.length>e?t.slice(0,e):t}function qt(t){return t===nd}function qr(t,e=ub){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Ts(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(rd)?.[1]??""}catch{return t.match(sb)?.[1]??""}}function Ye(){let t=(location.pathname||"/").match(rd);if(t?.[1])return t[1];let n=Et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return nd}function ks(t){if(qt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Ts(r.getAttribute("href")||"")!==t)continue;let o=qr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ye()===t&&e&&!/^ChatGPT$/i.test(e)?qr(e,80):""}function fb(t){if(qt(t))return"New chat";let e=Ss()[t];if(e)return e;let n=Cn(t);return n||ks(t)||"Chat"}function pb(t){return Ls()[t]||""}function gb(t){return id()[t]||{}}function Ms(t,e){if(!t||qt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Ss();n[t]!==e&&(n[t]=e,K.store.titles=n)}function bb(t){t.type==="conversation-meta"&&(Ms(t.conversationId,t.title),it&&Dn())}function hb(t,e){if(!t||qt(t)||!e)return;let n=Ls();n[t]!==e&&(n[t]=e,K.store.projects=n)}function yb(t,e){if(!t||qt(t)||!e.user&&!e.assistant)return;let n=id(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,K.store.previews=n)}function Cs(t){if(!t||qt(t)&&K.store.includeHome===!1)return;let e=_r().filter(n=>n!==t);e.unshift(t),K.store.visits=ki(e)}function Mi(){let t=K.store.includeHome!==!1;return ki(_r().filter(n=>t||!qt(n))).map(n=>({id:n,title:fb(n),project:pb(n),preview:gb(n)}))}function Qu(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return qr(o)}catch{return""}}function Fr(t){if(!t||qt(t)||t!==Ye())return;let e=ks(t);e&&Ms(t,e);let n=Qu("user"),r=Qu("assistant");yb(t,{user:n,assistant:r});let o=sd(t);if(o){let i=ad(o);i&&hb(t,i)}}function As(){let t=Ss(),e=Ls(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Bn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Ts(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let m=qr(c.textContent||"",80);m&&!od.test(m)&&t[u]!==m&&(t[u]=m,o=!0);let d=ad(c);d&&e[u]!==d&&(e[u]=d,i=!0)}}catch{}o&&(K.store.titles=t),i&&(K.store.projects=e);let a=_r(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(K.store.visits=ki([...a,...l]))}function ad(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=qr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!od.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function sd(t){if(qt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Ts(e.getAttribute("href")||"")===t)return e}catch{}return null}function vb(t){let e=sd(t);if(e){e.click();return}if(qt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function xb(){let t=Ye();We&&We!==t&&Fr(We),We=t,Cs(t),As();let e=ks(t);e&&Ms(t,e),Fr(t)}function Ti(){On===void 0&&(On=window.setTimeout(()=>{On=void 0,xb()},120))}function Eb(){Pn||(Pn=history.pushState.bind(history),$r=history.replaceState.bind(history),history.pushState=function(...e){let n=Pn(...e);return Ti(),n},history.replaceState=function(...e){let n=$r(...e);return Ti(),n})}function wb(){Pn&&(history.pushState=Pn),$r&&(history.replaceState=$r),Pn=null,$r=null}function Sb(t){return lb.has(t.code)||t.keyCode===192?!0:cb.has(t.key)}function ld(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Lb(t,e){zr=e,As(),Fr(Ye()),it=!0,_t=0;try{let n=Ye();Cs(n);let r=Mi();r.length>1&&(_t=t?r.length-1:1)}catch(n){ed.error("Failed to open switcher:",n)}Dn()}function td(t){let{length:e}=Mi();e&&(_t=(_t+(t?-1:1)+e)%e,Dn())}function Hs(){if(!it)return;let t=Mi()[_t];it=!1,zr=!1,Dn(),t&&vb(t.id)}function cd(){it&&(it=!1,zr=!1,Dn())}function Tb(t){if(ld(t)){Dr=!0;return}if((t.ctrlKey||Dr)&&!t.altKey&&!t.metaKey&&Sb(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{it?td(t.shiftKey):Lb(t.shiftKey,!0)}catch(n){ed.error("Hotkey failed:",n)}return}if(it){if(t.key==="Escape"){t.preventDefault(),cd();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Hs();return}t.key==="Tab"&&(t.ctrlKey||Dr)&&(t.preventDefault(),td(t.shiftKey))}}function kb(t){ld(t)&&(Dr=!1,it&&zr&&Hs())}function Mb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Ti)}function Cb(t){!it||(t.target instanceof Element?t.target:null)?.closest(`#${Bn}`)||cd()}function Ab(){document.visibilityState==="hidden"&&Fr(Ye())}function ws(t=Li){t instanceof HTMLElement&&qo(t,_o("auto"),!0)}function Hb(){if(!document.body)return null;let t=document.getElementById(Bn);if(t instanceof HTMLElement)return Li=t,ws(t),t;t=document.createElement("div"),t.id=Bn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),Li=t,ws(t),t}function Dn(){let t=Hb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!it){e.dataset.visible="false",e.replaceChildren();return}let n=Mi();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}_t>=n.length&&(_t=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===_t?"true":"false",s.setAttribute("aria-selected",a===_t?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{_t=a,Hs()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Ib(){document.getElementById(Bn)?.remove(),Li=null}var ud=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Bn}`],settings:K,start(){w("recentTopics",Ju),We=Ye(),Cs(We),As(),Fr(We),xs=ct(bb),Eb(),Si=new AbortController;let{signal:t}=Si;window.addEventListener("keydown",Tb,{capture:!0,signal:t}),window.addEventListener("keyup",kb,{capture:!0,signal:t}),window.addEventListener("popstate",Ti,{signal:t}),document.addEventListener("click",Mb,{capture:!0,signal:t}),document.addEventListener("click",Cb,{signal:t}),document.addEventListener("visibilitychange",Ab,{signal:t}),Es=hn("schemeChange",()=>ws())},stop(){Si?.abort(),Si=null,On!==void 0&&(clearTimeout(On),On=void 0),wb(),xs?.(),xs=null,Es?.(),Es=null,it=!1,zr=!1,Dr=!1,Ib()},onSettingsChange(){let t=ki(_r());t.length!==_r().length&&(K.store.visits=t),it&&Dn()}});var Is="cleaner",Nb=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Rb=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Pb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Ob=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Bb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Db=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Xe=L({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function $n(t){return`${t.join(",")}{display:none!important}`}function dd(){let t=[];if(Xe.store.hideDownloadApps!==!1&&t.push($n(Nb)),Xe.store.hideDisclaimer!==!1&&t.push($n(Rb)),Xe.store.hideUpgrade!==!1&&t.push($n(Pb)),Xe.store.hideLockedModels!==!1&&t.push($n(Ob)),Xe.store.hideHomePromo!==!1&&t.push($n(Bb)),Xe.store.hideAds!==!1&&t.push($n(Db)),!t.length){E(Is);return}w(Is,t.join(`
`))}var md=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Xe,start:dd,onSettingsChange:dd,stop(){E(Is)}});var Ai=new S("ResponseNotification"),qn=L({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Gb},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ns=!1,Ci=null,_n=null,jr=null;function $b(){return document.visibilityState==="hidden"||document.hidden}function _b(){return qn.store.onlyWhenHidden===!1?!0:$b()}function qb(){let t=Cn(M());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function fd(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!_n||_n.state==="closed")&&(_n=new t);let e=_n,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Ai.debug("chime failed",t)}}function Fb(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Ai.debug("custom sound failed",e),fd()}}function pd(){let t=String(qn.store.soundUrl||"").trim();t?Fb(t):fd()}function zb(){let t="Bloom++",e=`${qb()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Ai.debug("notification failed",n)}}function jb(){_b()&&(qn.store.sound!==!1&&pd(),qn.store.browserNotification!==!1&&zb())}function Gb(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>pd()),t.appendChild(e),()=>{e.remove()}}var gd=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:qn,start(){Ns=!0,Ci?.(),Ci=et(t=>{if(!Ns||t.userStopped||t.error)return;let e=M()||An();t.conversationId&&t.conversationId!==e||jb()}),jr?.abort(),jr=new AbortController,qn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:jr.signal}),Ai.debug("watch started")},stop(){Ns=!1,Ci?.(),Ci=null,jr?.abort(),jr=null;try{_n?.close()}catch{}_n=null}});var bd=`#bloom-pq-chip {
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

.bloom-pq-text,
.bloom-pq-edit {
    min-width: 0;
    flex: 1 1 auto;
    color: inherit;
    font: inherit;
}

.bloom-pq-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-pq-edit {
    height: 28px;
    padding: 0;
    border: 0;
    background: transparent;
    outline: none;
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
`;var Kr=new S("PromptQueue"),Ds="bloom-pq-chip",hd="promptQueue",yd=80,Kb=50,Vb=2e3,Wb='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',Yb=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,Ld=L({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),O=new Map,Ft=!1,Lt="",F="",zt=!1,at=!1,ke=!1,q=null,Gr=null,Hi=null,Le,Ur,Ze=null,Te=null;function Fn(){return te(Et())}function Je(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function Xb(t){let e=Je(Rt(t));if(e)return e;if(!Nt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),Je(n.innerText||n.textContent||"")}catch{return""}}function Zb(){try{let t=document.querySelectorAll(Wb),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Jb(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Qb(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&Yb.test(n))return!0}}catch{}return!1}function th(){let t=An();if(!t)return!1;let e=M();return!e||e===t}function eh(){if(J()||ui())return!1;if(tt()||th())return!0;let t=Zb();return t?!!(Jb(t)||Qb(t)):!1}function Td(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(It);return n instanceof HTMLElement?n:null}function vd(t){return Td(t)??Z()}function Ni(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function kd(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function nh(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?Je(e.innerText||e.textContent||""):""}catch{return""}}function xd(t){if(!Lt||Lt===t)return;let e=O.get(Lt);!e||O.has(t)||_(Lt,t)&&(O.delete(Lt),O.set(t,e),F===Lt&&(F=t),q?.key===Lt&&(q.key=t),Kr.debug("migrated pending",Lt,"\u2192",t))}function Ri(t){let e=Fn();if(O.get(e)&&Ld.store.replacePending===!1)return;O.set(e,{text:t,at:Date.now()}),q={key:e,text:t,turns:kd(),ticks:3};let r=Z();r&&Qt(r,""),Tt(),Kr.debug("queued",e,t.length)}function Os(t){O.delete(t),F===t&&(F=""),q?.key===t&&(q=null),Tt()}function rh(){at=!0,clearTimeout(Ur),Ur=setTimeout(()=>{at=!1,Ur=void 0},Vb)}function oh(){let t=Fn(),e=O.get(t);if(!e)return;let n=Z();if(!n)return;O.delete(t),F="",Tt(),rh(),Qt(n,e.text);let r=he();r&&!D(r)&&!ni(r)&&(r.click(),at=!1)}function Ed(t){if(!Ft||zt||tt()||Fn()!==t)return;let e=O.get(t);if(!e){F="";return}if(Bt())return;let n=Z();if(!n)return;if(!be(n)){let o=Je(Rt(n));if(o&&o!==e.text)return}let r=he();!r||D(r)||ni(r)||(zt=!0,Qt(n,e.text),clearTimeout(Le),Le=setTimeout(()=>ih(t,e.text),Kb))}function ih(t,e){Le=void 0;try{if(!Ft)return;let n=O.get(t);if(!n||n.text!==e||tt()||Fn()!==t)return;let r=Z();if(!r)return;let o=Je(Rt(r));if(o&&o!==e&&!be(r))return;o!==e&&Qt(r,e);let i=he();if(!i||D(i)||ni(i))return;i.click(),O.delete(t),F="",Tt(),Kr.debug("drained",t)}finally{zt=!1}}function ah(){let t=xt();if(!t||t===document.body)return null;let n=(t.querySelector('[class*="corner-superellipse"]')??t).getBoundingClientRect();return n.width<160||n.height<16?null:n}function Md(t){let e=ah();if(!e){t.style.left="50%",t.style.width="min(48rem, calc(100vw - 1rem))",t.style.bottom="6.5rem";return}let n=Math.min(e.width,window.innerWidth-16);t.style.left=`${Math.round(e.left+e.width/2)}px`,t.style.width=`${Math.round(n)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-e.top+8))}px`}function Bs(){Ze?.remove(),Ze=null,Te=null}var $s="http://www.w3.org/2000/svg";function Cd(){let t=document.createElementNS($s,"svg");return t.setAttribute("viewBox","0 0 16 16"),t.setAttribute("aria-hidden","true"),t}function Rs(t){let e=Cd(),n=document.createElementNS($s,"path");return n.setAttribute("d",t),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.35"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),e.append(n),e}function sh(){let t=Cd(),e=[[5.5,4],[10.5,4],[5.5,8],[10.5,8],[5.5,12],[10.5,12]];for(let[n,r]of e){let o=document.createElementNS($s,"circle");o.setAttribute("cx",String(n)),o.setAttribute("cy",String(r)),o.setAttribute("r","1.05"),o.setAttribute("fill","currentColor"),t.append(o)}return t}function Ps(t,e,n){let r=document.createElement("button");return r.type="button",r.className="bloom-pq-ico",r.setAttribute("aria-label",t),r.append(e),r.addEventListener("mousedown",o=>o.preventDefault()),r.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),n()}),r}function wd(){let t=Ze?.querySelector("input.bloom-pq-edit");return t instanceof HTMLInputElement?t.value:null}function Ii(t,e){if(Te!==t)return;if(Te=null,e===null){Tt();return}let n=Je(e);if(!n){Os(t);return}let r=O.get(t);r&&(r.text=n),Tt()}function Tt(){if(!Ft||!document.body){Bs();return}let t=Fn(),e=O.get(t);if(!e){Bs();return}let n=Ze;n?.isConnected||(n=document.createElement("div"),n.id=Ds,document.body.appendChild(n),Ze=n),n.replaceChildren();let r=document.createElement("div");r.className="bloom-pq-head",r.textContent="1 Queued messages";let o=document.createElement("div");o.className="bloom-pq-row";let i=Te===t,a=null;if(i){let d=document.createElement("input");d.type="text",d.className="bloom-pq-edit",d.value=e.text,d.setAttribute("aria-label","Edit queued prompt"),d.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?(p.preventDefault(),Ii(t,d.value)):p.key==="Escape"&&(p.preventDefault(),Ii(t,null))}),d.addEventListener("blur",()=>Ii(t,d.value)),o.append(d),a=d}else{let d=document.createElement("span");d.className="bloom-pq-text";let p=e.text.length>yd?`${e.text.slice(0,yd)}\u2026`:e.text;d.textContent=p,d.title=e.text,o.append(d)}let s=document.createElement("div");s.className="bloom-pq-actions";let l=document.createElement("span");l.className="bloom-pq-ico bloom-pq-grip",l.title="Only one prompt can wait",l.append(sh());let c=Ps("Dismiss queued prompt",Rs("M3.2 4.2h9.6M6.2 4.2V3.2h3.6v1M4.6 4.2l.6 8.4h5.6l.6-8.4"),()=>{Te=null,Os(t)}),u=Ps("Edit queued prompt",Rs("M9.4 3.2l3.4 3.4M3.2 12.8l.7-3.2L10.6 3l3.4 3.4-6.7 6.6z"),()=>{if(Te===t){Ii(t,wd());return}O.has(t)&&(Te=t,Tt())}),m=Ps("Send now",Rs("M8 12.4V3.8M4.6 7.1 8 3.7l3.4 3.4"),()=>{let d=wd();if(d!==null){let p=Je(d);if(Te=null,!p){Os(t);return}let g=O.get(t);g&&(g.text=p)}oh()});s.append(l,c,u,m),o.append(s),n.append(r,o),Md(n),a&&a.focus()}function lh(){if(!q)return;if(q.ticks-=1,O.get(q.key)&&kd()>q.turns){let e=nh();if(e&&e===q.text){Kr.debug("native send leaked; dropping pending"),O.delete(q.key),F===q.key&&(F=""),q=null,Tt();return}}q.ticks<=0&&(q=null)}function Pi(t){return!eh()||!Nt(t)?"":Xb(t)}function ch(t){if(!Ft||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||zt)return;let e=vd(t.target)??vd(document.activeElement);if(!e)return;if(t.altKey||at){at=!1,ke=!0,queueMicrotask(()=>{ke=!1});return}let n=Pi(e);n&&(Ni(t),Ri(n))}function uh(t){if(!Ft||zt||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(ke){ke=!1;return}if(at){at=!1;return}let e=Td(t.target);if(!e)return;let n=Pi(e);n&&(Ni(t),Ri(n))}function dh(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||D(e))return null;let n=t.closest(kn);if(n instanceof HTMLElement&&!D(n))return n;let r=he();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Sd(t){if(!Ft)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Ds}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&D(n)||zt||!dh(e))return;if(at){at=!1;return}let r=Z();if(!r)return;let o=Pi(r);o&&(Ni(t),Ri(o))}function mh(t){if(!Ft)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(ei)&&!e.querySelector(It)||zt)return;if(ke){ke=!1;return}if(at){at=!1;return}let n=Z()??e.querySelector(It);if(!n)return;let r=Pi(n);r&&(Ni(t),Ri(r))}var Ad=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:hd,cleanupSelectors:[`#${Ds}`],settings:Ld,start(){Ft=!0,Lt=Fn(),F="",zt=!1,at=!1,ke=!1,q=null,w(hd,bd),Gr?.abort(),Gr=new AbortController;let{signal:t}=Gr,e={capture:!0,signal:t};window.addEventListener("keydown",ch,e),document.addEventListener("beforeinput",uh,e),document.addEventListener("pointerdown",Sd,e),document.addEventListener("click",Sd,e),document.addEventListener("submit",mh,e),Hi?.(),Hi=et({onFall(n){if(Ft){if(n.userStopped||n.error){F="",Tt();return}F=n.contextKey,Ed(n.contextKey)}},onContext(n,r){r&&n&&!_(r,n)&&(F="",zt=!1,Le!==void 0&&(clearTimeout(Le),Le=void 0)),xd(n),Lt=n,Tt()},onTick(n){xd(n.contextKey),Lt=n.contextKey,lh(),F&&F===n.contextKey&&Ed(F),Ze&&Md(Ze)}}),Tt(),Kr.debug("watch started")},stop(){Ft=!1,Hi?.(),Hi=null,Gr?.abort(),Gr=null,clearTimeout(Le),Le=void 0,clearTimeout(Ur),Ur=void 0,O.clear(),q=null,F="",zt=!1,at=!1,ke=!1,Bs()}});var Hd=`.bloom-cls {
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
`;var Rd=new S("ChatListStatus"),Id="chatListStatus",Di="bloom-cls",ph="bloom-cls",gh=1200*1e3,bh="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",kt=new Map,jt=!1,ft="",ne=!1,Gn=!1,pt=0,Me=null,Fs=null,zn=null,_s=null,Oi=null,Vr=null,jn=!1,Ce=new Set;function Bi(){return Date.now()}function Pd(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function re(t,e,n,r=!0){if(!(!t||!jt)){if(e==="idle")kt.delete(t);else{let o=kt.get(t);o&&o.kind===e&&n!=="net"?o.at=Bi():kt.set(t,{kind:e,at:Bi(),source:n})}r&&hh({v:1,id:t,kind:e,at:Bi()}),Qe()}}function hh(t){try{zn?.postMessage(t)}catch{}}function yh(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||re(e.id,e.kind,"bc",!1)}function vh(){let t=Bi();for(let[e,n]of kt)n.kind==="streaming"&&t-n.at>gh&&kt.delete(e)}function xh(){let t=Pd();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(bh))continue;let o=ee(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Nd(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function qs(t){let e=t.querySelector(`:scope > .${Di}`);return e||null}function zs(){if(!jt)return;vh();let t=M(),e=xh();Me?.disconnect();try{for(let n of e){let r=ee(n.getAttribute("href")||"");if(!r||!t||r!==t){qs(n)?.remove();continue}let i=kt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){qs(n)?.remove();continue}let a=qs(n);a||(a=document.createElement("span"),a.className=Di,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Nd("streaming")):i==="error"&&a.appendChild(Nd("error")))}}catch(n){Rd.debug("paint failed",n)}Od()}function Qe(){if(jt){if(document.hidden){pt&&(cancelAnimationFrame(pt),pt=0),zs();return}pt||(pt=requestAnimationFrame(()=>{pt=0,jt&&zs()}))}}function Od(){let t=Pd();if(!(Me&&Fs===t&&t?.isConnected)){if(Me?.disconnect(),Fs=t,!t){Me=null;return}Me=new MutationObserver(()=>Qe()),Me.observe(t,{childList:!0,subtree:!0})}}function $i(){return!!(_e()||Hr())}function Eh(t){return!!(jn||t&&Ce.has(t)||!Gn&&!J()&&$i())}function wh(t){if(jt){if(t.type==="post-start"){Gn=!1,t.conversationId?(jn=!1,Ce.add(t.conversationId),ne=!0,re(t.conversationId,"streaming","net")):(jn=!0,ne=!0);return}if(t.type==="post-end"){if(jn=!1,t.conversationId){Ce.delete(t.conversationId);let e=M(),n=An();(e?t.conversationId===e:t.conversationId===n)?re(t.conversationId,t.error?"error":"done","net"):re(t.conversationId,"idle","net")}$i()||(ne=!1)}}}function Sh(t,e){if(!jt)return;if(_(e,t)){Qe();return}let n=M();if(ft&&ft!==n){Ce.delete(ft);let r=kt.get(ft);r&&r.kind!=="idle"&&re(ft,"idle","local")}jn=!1,ne=!1,Gn=!0,n&&kt.get(n)?.kind==="streaming"&&kt.get(n)?.source==="local"&&!Ce.has(n)&&re(n,"idle","local"),Qe()}function Lh(t){if(!jt)return;let e=t.conversationId||M();if(ft&&e&&ft!==e){Ce.delete(ft);let r=kt.get(ft);r&&r.kind!=="idle"&&re(ft,"idle","local"),ne=!!(e&&Ce.has(e))}if(e&&(ft=e),Gn||J()){if(J()||$i()||t.streaming){Qe();return}Gn=!1}if(Eh(e)&&(t.streaming||$i())){ne=!0,e&&re(e,"streaming","local"),Qe();return}ne&&(ne=!1,e&&re(e,Bt()?"error":"done","local")),Qe()}var Bd=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Di}`],start(){jt=!0,w(Id,Hd);try{zn=new BroadcastChannel(ph)}catch{zn=null}zn?.addEventListener("message",yh),_s=ct(wh),Oi?.(),Oi=et({onTick:Lh,onContext:Sh}),Vr?.abort(),Vr=new AbortController,document.addEventListener("visibilitychange",()=>{jt&&(pt&&(cancelAnimationFrame(pt),pt=0),zs())},{signal:Vr.signal}),Od(),Rd.debug("sidebar status watch started")},stop(){jt=!1,pt&&cancelAnimationFrame(pt),pt=0,Vr?.abort(),Vr=null,Me?.disconnect(),Me=null,Fs=null,Oi?.(),Oi=null,_s?.(),_s=null;try{zn?.close()}catch{}zn=null,kt.clear(),Ce.clear(),jn=!1,ne=!1,Gn=!1,ft="",document.querySelectorAll(`.${Di}`).forEach(t=>t.remove()),E(Id)}});var $d="widerChat",_d=40,qd=96,Fd=64,zd=L({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:_d,max:qd,default:Fd}});function Th(){return X(Number(zd.store.width??Fd),_d,qd)}function Dd(){let t=Th(),e=`min(100%,${t}rem)`;w($d,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var jd=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:zd,start:Dd,onSettingsChange:Dd,stop(){E($d)}});var js="composerOpacity",Un='form[data-type="unified-composer"],form.w-full[data-type]',kh=[`${Un} [class*="corner-superellipse"]`,`${Un} [class*="bg-token-bg-primary"]`,`${Un} [class*="bg-token-main-surface"]`].join(","),Mh=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Ch="#thread-bottom-container,#thread-bottom",Ah=`${Un} #prompt-textarea,${Un} [contenteditable="true"]`,Hh="var(--bg-primary,var(--main-surface-primary,#ffffff))",Gs=L({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Ih(){return X(Number(Gs.store.opacity??100),0,100)}function Nh(){return X(Number(Gs.store.blur??16),0,40)}function Gd(){let t=Ih();if(t>=100){E(js);return}let e=Nh(),n=`color-mix(in srgb,${Hh} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(js,`${Ch}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Mh}{display:none!important}${Un}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${kh}{background-color:${n}!important;background-image:none!important;${r}}${Ah}{background-color:transparent!important;background-image:none!important}`)}var Ud=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Gs,start:Gd,onSettingsChange:Gd,stop(){E(js)}});var Kd=`#bloom-bn-host {
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
`;var Ph=new S("BetterNavigator"),Us="betterNavigator",Xd="bloom-bn-host",on=60,Oh=16,Bh=1e3,Dh=2.5,$h=.4,Fi="\u6B63\u5728\u8F93\u51FA\u2026",Ys="Image",_h="\u2753",qh="\u{1F916}",Vd=/file_[0-9a-f]+/gi,Fh="File",zh="Code",jh=".markdown, .whitespace-pre-wrap",el=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Gh="img, picture, video, canvas",Uh=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,Kh=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Qr=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,Vh=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Wh=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Yh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,Xh=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,Zh=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,Jh=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Qh=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),t0=2e3,e0=40,n0=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,r0=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),o0=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),i0=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),a0=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Yi=L({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Vn=new Map,Jr=new Map,Ut=new Set,zi=0,Mt=!1,ie=!1,Kn=!1,Ae=null,to=null,nn=null,ji=null,V=[],rn="",Gi=0,Ui=-1,nl=0,Ki="",gt=0,oe=0,Wr,Yr=null,_i=null,Ks=null,Vs=null,tn=null,Xs=null,Xr=null,en=null,Wn=null,Zr=null;function Xi(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Ws(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function s0(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function l0(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)n0.test(s0(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Ws(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Ws(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Ws(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Vi(t){try{return!!t.closest(o0)}catch{return!0}}function Wd(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Zi(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function rl(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function c0(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function qi(t,e){if(t){Vd.lastIndex=0;for(let n of t.matchAll(Vd))e.add(n[0].toLowerCase())}}function u0(t){try{let e=new Set,n=s=>{c0(s)||(qi(s.getAttribute("src")||"",e),qi(s.getAttribute("srcset")||"",e),qi(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&qi(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Zi(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function d0(t,e){let n=u0(t),r=Jr.get(e)??0,o=Math.max(r,n);return o>0&&Jr.set(e,o),o>=2?`${Ys} x${o}`:Ys}function z(t){return t.replace(/\s+/g," ").trim()}function Zd(t,e){let n=t;for(;n&&n!==e;){if(n.matches(i0))return!0;n=n.parentElement}return!1}function Wi(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(Zd(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(el);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return z(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<on+20;)e.push(z(r.textContent||""));return z(e.join(" "))}function eo(t){let e=z(t);return e.length<3||e.length>180||Qr.test(e)?!1:Uh.test(e)?!0:Kh.test(e)}function Ji(t){let e=z(t);return e.length<8||e.length>120||/\s/.test(e)||Qr.test(e)||eo(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function m0(t){let e=[],n=i=>{let a=z(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(z(s[1])),e.push(z(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function f0(t){try{return Vi(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function ol(t){let e=z(t);return!e||il(e)||Ji(e)?!0:eo(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function p0(t){return!t.length||t.length>4||!t.every(e=>ol(e))?!1:t.some(e=>Qr.test(z(e))||eo(e)||Ji(e))}function Jd(t){try{let e=null,n=0,r=`${el}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(f0(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=m0(o);if(!i.length||i.length>4||i.join(" ").length>240||!p0(i))continue;let a=i.some(c=>Qr.test(z(c))),s=i.some(c=>eo(c)||Ji(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function g0(t){return Jd(t)?Fh:""}function b0(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(Vh.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function h0(t){try{for(let e of t.querySelectorAll(Gh))if(!b0(e))return!0}catch{}return!1}function il(t){let e=z(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||Xh.test(e)||Yh.test(e)?!0:e.length<=24&&(Zh.test(e)||Qr.test(e))}function y0(t){let e=[],n=new Set,r=o=>{try{if(Zd(o,t)||o.closest(el))return}catch{return}let i=Wi(o);!i||n.has(i)||il(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>on+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Wi(o).length<24)&&(r(o),e.join(" ").length>on+20))break}}catch{}return z(e.join(" "))}function v0(t){let e=Jd(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=z(i.innerText||i.textContent||"");!a||a.length>on+20||r.has(a)||ol(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return z(n.join(" "))}function x0(t,e){let n=[];try{for(let o of t.querySelectorAll(jh)){if(Vi(o))continue;let i=Wi(o);if(!(!i||e==="assistant"&&il(i)||ol(i))&&(n.push(i),n.join(" ").length>on+20))break}}catch{}let r=z(n.join(" "));if(e==="user"){let o=v0(t);if(o)return o}return r||(e==="assistant"?y0(t):"")}function E0(t){return t.length>on?`${t.slice(0,on).trimEnd()}\u2026`:t}function Yd(t){return Jh.test(t)}function w0(t,e,n,r){let o=x0(t,e);if(o)return E0(o);if(r)return Fi;let i=g0(t);if(i)return i;if(rl(t))return d0(t,Zi(t));try{if(h0(t))return Ys;if(t.querySelector("pre, code"))return zh}catch{}return`Message ${n+1}`}function S0(){if(ie)return!0;let t=M();return!!(t&&Ut.has(t)||!Kn&&!J()&&no())}function no(){return!!(_e()||Hr())}function L0(){zi=Date.now()}function Qd(t){ie=!1,t&&Ut.delete(t);let e=M();e&&Ut.delete(e)}function T0(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function k0(t){if(rl(t)||!no())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Wi(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function al(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=z(e.textContent||"");if(!(n.length>32)&&Wh.test(n))return!0}}catch{}return!1}function tm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function M0(t,e){try{if(T0(t))return!0;if(!e)return!1;if(k0(t)||al(t))return!0}catch{}return!1}function em(t){if(!t||no())return!1;try{if(al(t)||tm(t))return!1;if(t.querySelector(Qh)||rl(t))return!0}catch{}return!1}function C0(t){if(no()||zi&&Date.now()-zi<t0)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!em(e.el)||Qd()}function A0(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(r0)){if(Vi(r))continue;let i=Zi(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(Vi(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function H0(){let t=Xi();if(!t||t===document.body)return[];let e=Yi.store.showAssistant!==!1,n=e&&S0(),r=A0(t),o=null;if(e)for(let a of r)Wd(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Zi(a);if(!s)continue;let l=Wd(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&al(a),m=c&&tm(a),d=l==="assistant"&&c&&!em(a)&&(u||m||n||M0(a,!0)),p=w0(a,l,i.length,d);if(p&&p!==Fi){let b=Vn.get(s),f=!!b&&(eo(b)||Ji(b));(!b||f||!Yd(p)||Yd(b))&&p!==b&&Vn.set(s,p)}let g=d&&p===Fi?Fi:Vn.get(s)||p;i.push({id:s,el:a,role:l,text:g,live:d})}}catch{}return C0(i),i}function I0(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function nm(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function N0(t){return t===window?window.innerHeight:t.clientHeight}function R0(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(a0)}catch{return!1}}function rm(){Wr!==void 0&&(clearTimeout(Wr),Wr=void 0),Yr?.classList.remove("bloom-bn-flash"),Yr=null}function P0(t){rm(),t.classList.add("bloom-bn-flash"),Yr=t,Wr=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Yr===t&&(Yr=null),Wr=void 0},800)}function Zs(t){if(!V.length)return;let e=Math.max(0,Math.min(t,V.length-1));Gi=e,to?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),nn?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),ji&&(ji.textContent=`${e+1} / ${V.length}`);let n=nn?.children[e];if(n instanceof HTMLElement){let r=nn;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function Js(t){let e=V[t];if(!e?.el.isConnected)return;Ui=t,nl=Date.now()+Bh,Zs(t);let n=Wn??nm(e.el),o=Math.abs(e.el.getBoundingClientRect().top-I0())>Dh*N0(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),Yi.store.jumpEffect!=="none"&&P0(e.el)}function sl(){if(!Mt||!V.length)return;if(Date.now()<nl&&Ui>=0){Zs(Ui);return}let t=window.innerHeight*$h,e=0;for(let n=0;n<V.length;n++){let r=V[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Zs(e)}function O0(t){let e=nm(t);if(Wn===e&&Zr)return;Zr?.(),Wn=e;let n=e===window?document:e,r=()=>{sl(),ll()};n.addEventListener("scroll",r,{passive:!0}),Zr=()=>n.removeEventListener("scroll",r)}function B0(t){en?.disconnect(),en=null;let e=Wn instanceof HTMLElement?Wn:null;en=new IntersectionObserver(()=>sl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&en.observe(n.el)}function D0(){if(!document.body)return null;let t=Ae;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Xd,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Ae=t,to=e,nn=i,ji=o,t}function om(){let t=Ae,e=Xi();if(!t||!e||!e.isConnected||V.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=l0(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||e0,m=n.right-r.right>=c+8?r.right+4:r.right-12-c;m=Math.min(m,n.right-c-8),m=Math.max(8,m);let d=Math.max(8,Math.round(window.innerWidth-m-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${d}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function ll(){!Mt||oe||(oe=requestAnimationFrame(()=>{oe=0,Mt&&om()}))}function $0(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function _0(t){let e=to,n=nn;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Oh),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=$0(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Js(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?_h:qh;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Js(o)}),n.appendChild(a)}))}function q0(t){to?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=nn?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function F0(){let t=M();return t===Ki?!1:(Ki=t,Vn.clear(),Jr.clear(),V=[],rn="",Gi=0,Ui=-1,nl=0,ie&&t&&(Ut.add(t),ie=!1),!0)}function z0(t){let e=Yi.store.showAssistant!==!1?"1":"0";return`${Ki}|${e}|${t.map(n=>n.id).join(",")}`}function Qs(){if(!Mt)return;F0();let t=H0(),e=Xi();if(!e||t.length<1){V=t,rn="",Ae&&(Ae.hidden=!0),en?.disconnect(),tl();return}D0();let n=z0(t);n!==rn?(V=t,rn=n,_0(t),O0(e),B0(t)):(V=t,q0(t)),om(),sl(),tl()}function Gt(){if(Mt){if(document.hidden){gt&&(cancelAnimationFrame(gt),gt=0),Qs();return}gt||(gt=requestAnimationFrame(()=>{gt=0,Mt&&Qs()}))}}function tl(){let t=Xi();if(!(tn&&Xs===t&&t?.isConnected)){if(tn?.disconnect(),Xr?.disconnect(),Xs=t,!t||t===document.body){tn=null;return}tn=new MutationObserver(()=>Gt()),tn.observe(t,{childList:!0,subtree:!0}),Xr=new ResizeObserver(()=>ll()),Xr.observe(t)}}function j0(t){if(Mt){if(t.type==="post-start"){L0(),Kn=!1,t.conversationId?(ie=!1,Ut.add(t.conversationId)):ie=!0,Gt();return}if(t.type==="post-end"){if(ie=!1,t.conversationId)Ut.delete(t.conversationId);else{let e=M();e&&Ut.delete(e)}Gt()}}}function G0(t){if(!Mt||!V.length||Ae?.hidden||t.altKey||t.ctrlKey||t.metaKey||R0(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Gi+1;else if(t.key==="ArrowUp")e=Gi-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=V.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Js(Math.max(0,Math.min(e,V.length-1)))}function U0(){rm(),en?.disconnect(),en=null,tn?.disconnect(),tn=null,Xs=null,Xr?.disconnect(),Xr=null,Zr?.(),Zr=null,Wn=null,Ae?.remove(),Ae=null,to=null,nn=null,ji=null}var im=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Us,cleanupSelectors:[`#${Xd}`],settings:Yi,start(){Mt=!0,Ki=M(),w(Us,Kd),_i=new AbortController;let{signal:t}=_i;window.addEventListener("keydown",G0,{signal:t}),window.addEventListener("popstate",Gt,{signal:t}),window.visualViewport?.addEventListener("resize",ll,{signal:t}),document.addEventListener("visibilitychange",()=>{Mt&&(gt&&(cancelAnimationFrame(gt),gt=0),oe&&(cancelAnimationFrame(oe),oe=0),Qs())},{signal:t}),Vs=ct(j0),Ks=et({onTick(){if(J()){Gt();return}Kn&&!no()&&(Kn=!1),Gt()},onFall(e){Qd(e.conversationId),Gt()},onContext(e,n){if(!_(n,e)){Vn.clear(),Jr.clear(),rn="",ie=!1;let r=M();for(let o of[...Ut])o!==r&&Ut.delete(o);Kn=!0}Gt()}}),tl(),Gt(),Ph.debug("navigator started")},stop(){Mt=!1,gt&&cancelAnimationFrame(gt),gt=0,oe&&cancelAnimationFrame(oe),oe=0,_i?.abort(),_i=null,Ks?.(),Ks=null,Vs?.(),Vs=null,Ut.clear(),ie=!1,Kn=!1,zi=0,U0(),Vn.clear(),Jr.clear(),V=[],rn="",E(Us)},onSettingsChange(){rn="",Gt()}});var am=`.bloom-ts {
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
`;function sm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function lm(t){try{return new Date(t).toISOString()}catch{return""}}var dm=new S("MessageTimestamps"),cm="messageTimestamps",ta="bloom-ts",um=1500,V0="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Yn=L({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Xn=new Map,ln=!1,bt=0,He=null,ul=null,cl=null,Qi=null,ro=null,oo=!1,an=!1;function mm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ml(){let t=Yn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function fm(){let t={...ml()};for(let[n,r]of Xn)t[n]=r;let e=Object.keys(t);if(e.length>um){let n=e.slice(e.length-um),r={};for(let o of n)r[o]=t[o];Yn.store.stamps=r;return}Yn.store.stamps=t}var W0=Zl(fm,500);function pm(t,e){!t||!e||Xn.get(t)===e||(Xn.set(t,e),W0(),sn())}function Y0(t){return t?Xn.get(t)??ml()[t]??si(t)??null:null}function X0(t){ln&&t.type==="message-time"&&pm(t.messageId,t.createTime)}function Z0(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function J0(){let t=mm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(V0)||e.push(n)}catch{}return e}function Q0(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function dl(){if(!ln)return;let t=Yn.store.hideOwnMessages===!0,e=Yn.store.showDate!==!1,n=tt();an&&!J()&&(an=!1),an&&(n?oo=!1:an=!1);let r=an?!1:n,o=J0();He?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=Z0(i),c=i.querySelector(`:scope > .${ta}`);if(t&&l==="user"){c?.remove();return}if(Q0(i)){c?.remove();return}let u=Y0(s);if(!u&&s&&(r||oo)&&a>=o.length-2&&(u=Date.now(),pm(s,u)),!u){c?.remove();return}let m=sm(u,e);if(!m){c?.remove();return}let d=c;d||(d=document.createElement("time"),d.className=ta,d.setAttribute("aria-hidden","true"),i.insertBefore(d,i.firstChild)),d.textContent!==m&&(d.textContent=m);let p=lm(u);p&&d.getAttribute("datetime")!==p&&d.setAttribute("datetime",p)})}catch(i){dm.debug("paint failed",i)}oo=r,gm()}function sn(){if(ln){if(document.hidden){bt&&(cancelAnimationFrame(bt),bt=0),dl();return}bt||(bt=requestAnimationFrame(()=>{bt=0,ln&&dl()}))}}function gm(){let t=mm();if(!(He&&ul===t&&t?.isConnected)){if(He?.disconnect(),ul=t,!t||t===document.body){He=null;return}He=new MutationObserver(()=>sn()),He.observe(t,{childList:!0,subtree:!0})}}var bm=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ta}`],settings:Yn,start(){ln=!0,w(cm,am);let t=ml();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Xn.set(e,n);cl=ct(X0),Qi?.(),Qi=et({onTick:sn,onFall:sn,onContext(e,n){_(n,e)||(an=!0,oo=!1),sn()}}),ro?.abort(),ro=new AbortController,document.addEventListener("visibilitychange",()=>{ln&&(bt&&(cancelAnimationFrame(bt),bt=0),dl())},{signal:ro.signal}),gm(),sn(),dm.debug("timestamp watch started")},stop(){ln=!1,bt&&cancelAnimationFrame(bt),bt=0,ro?.abort(),ro=null,He?.disconnect(),He=null,ul=null,Qi?.(),Qi=null,cl?.(),cl=null,an=!1,oo=!1,fm(),Xn.clear(),document.querySelectorAll(`.${ta}`).forEach(t=>t.remove()),E(cm)},onSettingsChange:sn});var fl="streamerMode",ty="filter:blur(6px)!important;transition:filter .2s ease",ey="filter:none!important",Zn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Jn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ht(t,e){return t.map(n=>`${n} ${e}`)}var cn=L({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Qn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${ty}}${e?`${r}{${ey}}`:""}`}function hm(){let t=[];if(cn.store.conversations!==!1&&(t.push(Qn([...ht(Jn,'a[href^="/c/"]'),...ht(Jn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),cn.store.projects!==!1&&(t.push(Qn([...ht(Jn,'a[href*="/project"]'),...ht(Jn,'a[href*="/g/g-p-"]'),...ht(Jn,'[data-testid="project-name"]'),...ht(Jn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),cn.store.headerTitle!==!1&&t.push(Qn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),cn.store.accountAvatar!==!1&&t.push(Qn([...ht(Zn,"img"),...ht(Zn,'[class*="avatar"]'),...ht(Zn,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),cn.store.accountName!==!1&&t.push(Qn([...ht(Zn,".min-w-0 > .truncate"),...ht(Zn,".min-w-0.flex-1 .truncate")],!1)),cn.store.accountEmail!==!1&&t.push(Qn([...ht(Zn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){E(fl);return}w(fl,t.join(`
`))}var ym=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:cn,start:hm,onSettingsChange:hm,stop(){E(fl)}});var vm=`.bloom-gc-panel {
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
}`;var ry=new S("GreetingCustomizer"),tr="greetingCustomizer",xm="greetingCustomizerUi",io=100,gl=30,oy=120,iy=1e3,ay=50,sy=40,ly=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),ao=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),ia=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function cy(t){return!!t?.closest(ly)}function Lm(t){return!!(cy(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function po(t){try{for(let e of document.querySelectorAll(t))if(!Lm(e))return e}catch{}return null}function pl(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(po(e))return e;return t}var Tm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],W=L({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Ty},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Tm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Kt=!1,rr=!1,dn=null,na,so,er,lo,ra=0,ea=null,nr=null,co=null,uo=null,mo=null,oa=null;function se(){let t=location.pathname||"/";return t==="/"||t===""}function un(){let t=W.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Tm.slice()}function fo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Em(t){W.store.greetings=t.slice(0,gl)}function go(){let t=String(W.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function uy(){return W.store.order==="random"?"random":"sequential"}function dy(){return X(Number(W.store.intervalSec??10),1,3600)*1e3}function my(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function fy(){return!!po(ia)}function aa(){return!!(po(ia)||po(ao))}function py(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=fy()?pl(ia):po(ao)?pl(ao):pl(ia),i=e?`${ao}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function gy(t,e){if(t<=0)return 0;if(t===1)return Number(W.plain.index)!==0&&(W.store.index=0),Number(W.plain.lastRandom)!==0&&(W.store.lastRandom=0),0;let n=Number(W.plain.index),r=Number(W.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(uy()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return W.store.index=s,W.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return W.store.index=i,i}function ae(t){if(!Kt)return;if(!se()){E(tr);return}let e=un().map(fo).filter(Boolean);if(!e.length){E(tr);return}let n=gy(e.length,t),r=e[n]??e[0],o=go()==="manual"&&e.length>1;w(tr,py(my(r),o)),oa?.()}function bl(){na!==void 0&&(clearInterval(na),na=void 0)}function hl(){bl(),!(!Kt||!se())&&go()==="interval"&&(un().filter(Boolean).length<=1||(na=setInterval(()=>ae(!0),dy())))}function yl(){lo!==void 0&&(clearTimeout(lo),lo=void 0),ra=0}function wm(){if(yl(),!Kt||!se())return;ra=sy;let t=()=>{if(lo=void 0,!(!Kt||!se())){if(aa()){go()==="refresh"&&!rr?(rr=!0,ae(!0)):ae(!1),hl();return}ra-=1,ra>0&&(lo=setTimeout(t,ay))}};t()}function vl(){if(dn===!0){aa()?ae(!1):wm();return}dn=!0,rr=!1,go()==="refresh"?(rr=!0,ae(!0)):ae(!1),hl(),aa()||wm()}function xl(){dn=!1,rr=!1,bl(),yl(),E(tr)}function sa(){er===void 0&&(er=window.setTimeout(()=>{er=void 0,Kt&&(se()?vl():dn!==!1&&xl())},oy))}function by(){nr||(nr=history.pushState.bind(history),co=history.replaceState.bind(history),uo=function(...e){let n=nr(...e);return sa(),n},mo=function(...e){let n=co(...e);return sa(),n},history.pushState=uo,history.replaceState=mo)}function hy(){uo&&history.pushState===uo&&nr&&(history.pushState=nr),mo&&history.replaceState===mo&&co&&(history.replaceState=co),nr=null,co=null,uo=null,mo=null}function yy(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(sa)}function vy(t){if(!Kt||!se()||go()!=="manual"||un().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(ao);if(!n||Lm(n))return;let r=window.getSelection?.();r&&String(r).trim()||ae(!0)}function xy(){so===void 0&&(so=setInterval(()=>{if(!Kt)return;let t=se();if(t!==(dn===!0)){t?vl():xl();return}t&&aa()&&ae(!1)},iy))}function Ey(){so!==void 0&&(clearInterval(so),so=void 0)}function Sm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var wy="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Sy="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Ly(t,e){let n=fo(t);return n?n.length>io?`Keep it to ${io} characters.`:un().length+(e?1:0)>gl?`At most ${gl} greetings.`:null:"Enter a greeting."}function Ty(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=un(),s=Number(W.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=io,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let f=l.querySelector(".bloom-gc-count");f&&(f.textContent=`${fo(e).length}/${io}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let m=document.createElement("span");m.className="bloom-gc-count",m.textContent=`${fo(e).length}/${io}`;let d=document.createElement("span");d.className="bloom-gc-error",d.textContent=r;let p=document.createElement("div");if(p.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,e="",r="",i()}),p.appendChild(f)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let f=n<0,T=Ly(e,f);if(T){r=T,i();return}let C=fo(e),H=un().slice();n>=0&&n<H.length?H[n]=C:H.push(C),Em(H),n=-1,e="",r="",i()}),p.appendChild(g),u.append(m,d,p),l.appendChild(u),t.appendChild(l),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",t.appendChild(f);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((f,T)=>{let C=document.createElement("div");C.className="bloom-gc-item",T===s&&(C.dataset.active="true");let H=document.createElement("button");H.type="button",H.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,H.textContent=f,H.addEventListener("click",()=>{o=o===T?-1:T,i()});let Yt=document.createElement("div");Yt.className="bloom-gc-item-actions";let Ct=Sm("Edit",wy);Ct.addEventListener("click",()=>{n=T,e=f,r="",i()});let rt=Sm("Delete",Sy);rt.addEventListener("click",()=>{let N=un().filter((st,Xt)=>Xt!==T);Em(N),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),Yt.append(Ct,rt),C.append(H,Yt),b.appendChild(C)}),t.appendChild(b)};return oa=i,i(),()=>{oa===i&&(oa=null),t.replaceChildren()}}var km=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:xm,settings:W,start(){Kt=!0,w(xm,vm),by(),ea=new AbortController;let{signal:t}=ea;window.addEventListener("popstate",sa,{signal:t}),document.addEventListener("click",yy,{capture:!0,signal:t}),document.addEventListener("click",vy,{signal:t}),xy(),dn=null,se()?vl():xl(),ry.debug("started")},stop(){Kt=!1,ea?.abort(),ea=null,er!==void 0&&(clearTimeout(er),er=void 0),bl(),yl(),Ey(),hy(),E(tr),rr=!1,dn=null},onSettingsChange(){Kt&&(se()?(ae(!1),hl()):E(tr))}});function ky(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function la(t){try{return await createImageBitmap(t)}catch{return null}}async function My(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function ca(t){if(t.startsWith("data:")){let e=ky(t);if(e){let n=await la(e);if(n)return n}return My(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?la(await e.blob()):null}catch{return null}}var da="data-bloom-csi-slot",Cy="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Ay=/\bsize-(?:[6-9]|10)\b/,Hy=/\b(?:h|w)-(?:[6-9]|10)\b/,Iy=/^(plus|pro|free|team|go|business|enterprise)$/i,Ny=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function ua(t){return t.getAttribute("class")||""}function Cm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Ay.test(t)?!0:Hy.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Ry(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Am(e)}function Am(t){return Iy.test(String(t??"").replace(/\s+/g,""))}function Vt(t){return!!t?.closest(Cy)}function ma(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function bo(t){let e=ua(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Am(t.textContent||"")}function fa(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function ho(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Py(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Hm(t){if(Vt(t)||fa(t)||ho(t)||bo(t)||ma(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Im(t){return Vt(t)||fa(t)||ho(t)||bo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Ry(t.textContent||"")}function Nm(t){return Vt(t)||ho(t)||ma(t)||bo(t)?!1:Cm(ua(t))||Im(t)?!0:Hm(t)}function Mm(t){return!(Vt(t)||ma(t)||ho(t)||bo(t)||fa(t))}function mn(t,e){let n=fa(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(ho(n)||ma(n)||bo(n));)Vt(n)||(r=n),n=n.parentElement;return r}function Oy(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Vt(e))continue;if(Py(ua(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Mm(o))){if(Nm(o)||Cm(ua(o)))return mn(o,t)??o;r.push(o)}if(r.length===1)return mn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Mm(r))return mn(r,t)??r}}return null}function By(t){let e=t.querySelectorAll(Ny);for(let n of e)if(Nm(n))return mn(n,t)??n;return null}function Dy(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Im(e))return mn(e,t)??e;return null}function $y(t){for(let e of t.querySelectorAll("*"))if(Hm(e))return mn(e,t)??e;return null}function Rm(t,e){if(Vt(t))return null;if(e&&!Vt(e)&&t.contains(e)){let n=mn(e,t);if(n)return n}return Oy(t)??By(t)??Dy(t)??$y(t)}function Pm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var or="data-bloom-csi",pa="data-bloom-csi-orig",fn=new Set,Om=null;function wl(t){Om=t}function Bm(t){return`url(${JSON.stringify(t)})`}function ga(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Sl(t,e,n){let r=Bm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Dm(t,e=da){let n=Bm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function _y(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function ir(t){t.removeEventListener("error",El);let e=t.getAttribute(pa);t.removeAttribute(or),t.removeAttribute(pa),e&&t.getAttribute("src")!==e&&(t.src=e)}function El(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&fn.add(n),ir(e),Om?.()}function $m(t,e){if(!e||fn.has(e)){ir(t);return}_y(t);let n=t.getAttribute("src")??"";if(t.getAttribute(or)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(pa)&&t.setAttribute(pa,n);t.setAttribute(or,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",El),t.addEventListener("error",El),n!==e&&(t.src=e)}var _m=`/*
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
`;var qm=new S("CustomSidebarIdentity"),Fm="customSidebarIdentityUi",Gm="customSidebarIdentity",Fy="bloom-csi-face",zy="bloom-csi-name",ar=da,jy=1024,ba=256,Um=24,Km=64,Vm=40,Ml=1,Cl=4,yo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Ll=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=L({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:sv},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Um,max:Km,default:Vm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function gn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Gy(){return String(x.store.displayName??"").trim()}function va(t,e,n,r,o){let i=X(n,Ml,Cl),a=Math.min(t,e)/i,s=X(r,a/2,Math.max(a/2,t-a/2)),l=X(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Uy(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Al(t){let e=Math.min(1,jy/Math.max(t.width,t.height));return Uy(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Ky(t,e,n,r){let{side:o,x:i,y:a}=va(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=ba,s.height=ba;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,ba,ba);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Vy(t){let e=await la(t);if(!e)return null;let n=Al(e);return e.close(),n}async function Il(t,e,n,r){let o=await ca(t);if(!o)return null;let i=Ky(o,e,n,r);return o.close(),i}function Nl(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function zm(){x.store.avatarUrl="",x.store.avatarSource="",Nl()}var jm=0;async function Hl(t){let e=++jm;Nl(),x.store.avatarSource=t;let n=await Il(t,.5,.5,1);return e!==jm?!1:(n&&(x.store.avatarUrl=n),!!n)}function vo(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Tl(t){let e=vo(t);if(!e)return!1;let n=await Vy(e);return n?Hl(n):!1}var yt=!1,sr=!1,lr=0,xa=0,ha=null,Ie=new Map,cr=null,le=null,Ea=null,Wt=null,wa=null;function Sa(t){let e=String(t??"").trim();if(!e||fn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function Wm(){return Sa(x.store.avatarUrl)??Sa(x.store.avatarSource)}var ya=!1,kl=new Set;function Ym(){let t=Sa(x.store.avatarSource);if(!t?.startsWith("data:image/")||Sa(x.store.avatarUrl)?.startsWith("data:image/")||ya||kl.has(t))return;ya=!0;let e=gn(x.store.cropX,.5),n=gn(x.store.cropY,.5),r=gn(x.store.cropZoom,1);Il(t,e,n,r).then(o=>{if(ya=!1,!o){kl.add(t);return}yt&&(x.store.avatarUrl=o,La())}).catch(()=>{ya=!1,kl.add(t)})}function pn(t,e){return t.map(n=>`${n} ${e}`)}function Wy(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Yy(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Wy(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Xm(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Vt(n)||n.closest(".min-w-0")||e.push(n);return e}function Xy(t){let e=Xm(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Rl(){let t=[],e=Oe();e&&t.push(e);let n=wn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(yo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function Zm(t,e){let n=Xy(t);if(n)$m(n,e);else for(let o of Xm(t))ir(o);let r=Rm(t,n);for(let o of t.querySelectorAll(`[${ar}]`))o!==r&&o.removeAttribute(ar);r&&r.setAttribute(ar,"")}function Zy(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Jy(t,e){let n=Zy(t);n&&Zm(n,e)}function Qy(){for(let t of document.querySelectorAll(`img[${or}]`))ir(t);for(let t of document.querySelectorAll(`[${ar}]`))t.removeAttribute(ar)}function tv(){let t=X(Math.round(gn(x.store.avatarSize,Vm)),Um,Km),e=Wm(),n=Gy(),r=x.store.applyToMenu!==!1,o=[],i=[...pn(yo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...pn(Ll,"> :first-child img"));let a=[...pn(yo,".min-w-0 > .truncate"),...pn(yo,".min-w-0.flex-1 .truncate")];r&&a.push(...pn(Ll,"> :first-child .truncate"));let s=Pm(ar);o.push(ga([...s.flatMap(l=>pn(yo,l))].join(","),t)),o.push(ga(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(ga(s.flatMap(l=>pn(Ll,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Sl(i.join(","),e,t)),o.push(Sl("#stage-sidebar-tiny-bar img",e,32)),o.push(Dm(e))),n&&o.push(Yy(a,n)),w(Gm,o.join(""))}function ev(){let t=Wm(),e=Rl();for(let n of e)Zm(n,t);if(x.store.applyToMenu!==!1){let n=Sn();n&&Jy(n,t)}for(let n of document.querySelectorAll(`img[${or}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||ir(n)}function La(){if(!(!yt||sr)){sr=!0;for(let t of Ie.values())t.disconnect();le?.disconnect(),Wt?.disconnect();try{tv(),ev()}finally{sr=!1,Pl(),iv(),cr?.isConnected&&Jm(cr),Ym()}}}function xo(){!yt||lr||(lr=requestAnimationFrame(()=>{lr=0,La()}))}function nv(){sr||!yt||xo()}function rv(t){if(Ie.has(t))return;let e=new MutationObserver(nv);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ie.set(t,e)}function ov(t){Ie.get(t)?.disconnect(),Ie.delete(t)}function Pl(){let t=new Set;for(let n of Rl())t.add(n),n.parentElement&&t.add(n.parentElement);let e=wn();e&&t.add(e);for(let n of[...Ie.keys()])(!t.has(n)||!n.isConnected)&&ov(n);for(let n of t)n.isConnected&&rv(n)}function iv(){let t=Do();if(!t){Wt?.disconnect(),Wt=null,Ea=null;return}if(Ea===t&&Wt){Wt.observe(t,{childList:!0});return}Wt?.disconnect(),Ea=t,Wt=new MutationObserver(()=>{sr||!yt||(Pl(),xo())}),Wt.observe(t,{childList:!0})}function Jm(t){cr===t&&le||(le?.disconnect(),cr=t,le=new MutationObserver(()=>{if(!t.isConnected){le?.disconnect(),le=null,cr=null;return}sr||!yt||xo()}),le.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Qm(t){if(!yt||x.store.applyToMenu===!1)return;let e=Sn();if(e){Jm(e),xo();return}t<=0||requestAnimationFrame(()=>Qm(t-1))}function tf(t){yt&&(La(),!(Rl().length||t<=0)&&(xa=requestAnimationFrame(()=>tf(t-1))))}function av(t){yt&&x.store.applyToMenu!==!1&&(!$o(t)&&!Sn()||Qm(10))}function sv(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let m=document.createElement("p");m.className="bloom-csi-hint";let d=document.createElement("div");d.className="bloom-csi-crop";let p=document.createElement("div");p.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,p.appendChild(g);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let f=document.createElement("input");f.type="range",f.className="bloom-csi-zoom",f.min=String(Ml),f.max=String(Cl),f.step="0.05",f.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let C=document.createElement("button");C.type="button",C.className="bloom-csi-btn",C.textContent="Reset",b.append(f,T,C);let H=document.createElement("p");H.className="bloom-csi-hint",H.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",d.append(p,b,H),t.append(u,m,d);function Yt(){let h=String(x.store.avatarSource??""),k=String(x.store.avatarUrl??"");return h.startsWith("data:image/")?h:k.startsWith("data:image/")?k:""}function Ct(h,k,A){if(!a)return i.x=h,i.y=k,i.zoom=X(A,Ml,Cl),i;let Q=va(a.w,a.h,A,h*a.w,k*a.h);return i.x=Q.x/a.w,i.y=Q.y/a.h,i.zoom=Q.z,i}function rt(){f.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let h=a?va(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;h&&a&&(g.style.width=`${a.w/h.side*100}%`,g.style.height=`${a.h/h.side*100}%`,g.style.left=`${(.5-h.x/h.side)*100}%`,g.style.top=`${(.5-h.y/h.side)*100}%`)}function N(h=!1){let k=Yt(),A=String(x.store.avatarUrl??"").trim(),Q=!!k;s.hidden=!A&&!k,(k||A)&&(s.src=k||A),document.activeElement!==l&&(l.value=Q?"":A),l.placeholder=Q?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",d.hidden=!k,m.hidden=!(e&&/^https?:\/\//.test(A)&&!k),m.textContent=m.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",k&&(h&&(i.x=gn(x.store.cropX,.5),i.y=gn(x.store.cropY,.5),i.zoom=gn(x.store.cropZoom,1)),g.getAttribute("src")!==k&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},Ct(i.x,i.y,i.zoom),rt()},g.src=k),rt())}function st(h,k,A,Q=!1){Ct(h,k,A),rt();let ql=Yt(),Fl=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,ql&&Il(ql,i.x,i.y,i.zoom).then(zl=>{zl&&(x.store.avatarUrl=zl)})};r&&clearTimeout(r),Q?Fl():r=setTimeout(Fl,80)}function Xt(h){x.store.avatarUrl=h;let k=h.trim();if(n&&clearTimeout(n),!k){x.store.avatarSource="",Nl(),e=!1,N(!0);return}if(k.startsWith("data:image/")){e=!1,n=setTimeout(()=>{ca(k).then(A=>{if(!A)return;let Q=Al(A);A.close(),Q&&Hl(Q).then(()=>N(!0))})},80);return}if(/^https?:\/\//.test(k)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{ca(k).then(A=>{if(!A){e=!0,N(!0);return}let Q=Al(A);A.close(),Q?(e=!1,Hl(Q).then(()=>N(!0))):(e=!0,N(!0))})},400);return}e=!1,x.store.avatarSource="",N(!0)}u.addEventListener("paste",h=>{vo(h.clipboardData)&&(h.preventDefault(),e=!1,Tl(h.clipboardData).then(()=>N(!0)))}),u.addEventListener("dragover",h=>{vo(h.dataTransfer)&&h.preventDefault()}),u.addEventListener("drop",h=>{vo(h.dataTransfer)&&(h.preventDefault(),e=!1,Tl(h.dataTransfer).then(()=>N(!0)))}),l.addEventListener("change",()=>Xt(l.value)),l.addEventListener("paste",h=>{vo(h.clipboardData)&&(h.preventDefault(),e=!1,Tl(h.clipboardData).then(()=>N(!0)))}),l.addEventListener("keydown",h=>{Yt()&&!l.value&&(h.key==="Backspace"||h.key==="Delete")&&(zm(),e=!1,N(!0))}),c.addEventListener("click",()=>{zm(),e=!1,N(!0)}),p.addEventListener("pointerdown",h=>{h.button===0&&(p.setPointerCapture(h.pointerId),o.on=!0,o.px=h.clientX,o.py=h.clientY,o.x=i.x,o.y=i.y)}),p.addEventListener("pointermove",h=>{if(!o.on||!a)return;let k=p.clientWidth;if(!k)return;let{side:A}=va(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Ct(o.x-(h.clientX-o.px)*(A/k)/a.w,o.y-(h.clientY-o.py)*(A/k)/a.h,i.zoom),rt()}),p.addEventListener("pointerup",()=>{o.on&&(o.on=!1,st(i.x,i.y,i.zoom,!0))}),p.addEventListener("pointercancel",()=>{o.on=!1}),p.addEventListener("wheel",h=>{h.preventDefault(),st(i.x,i.y,i.zoom*(h.deltaY<0?1.08:1/1.08))},{passive:!1}),f.addEventListener("input",()=>st(i.x,i.y,Number(f.value))),f.addEventListener("change",()=>st(i.x,i.y,Number(f.value),!0)),C.addEventListener("click",()=>st(.5,.5,1,!0));let _l=()=>N(!1);return wa=_l,N(!0),()=>{wa===_l&&(wa=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var ef=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Fm,cleanupSelectors:[`.${Fy}`,`.${zy}`],settings:x,start(){yt=!0,fn.clear(),wl(xo),w(Fm,_m),ha=new AbortController,document.addEventListener("click",av,{signal:ha.signal}),tf(40),Ym(),qm.debug("started")},onSettingsChange(){fn.clear(),wa?.(),yt&&(Pl(),La())},stop(){yt=!1,ha?.abort(),ha=null,lr&&cancelAnimationFrame(lr),lr=0,xa&&cancelAnimationFrame(xa),xa=0;for(let t of Ie.values())t.disconnect();Ie.clear(),le?.disconnect(),le=null,cr=null,Wt?.disconnect(),Wt=null,Ea=null,Qy(),E(Gm),wl(null),fn.clear(),qm.debug("stopped")}});var ur=new S("Bloom"),nf=!1,lv=Date.now(),cv=[$c,Au,$u,Fu,Ku,Zu,ud,md,gd,Ad,Bd,jd,Ud,im,bm,ym,km,ef];function Ta(t){return new Promise(e=>setTimeout(e,t))}function uv(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function dv(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var of=8e3,rf=300,mv=250;async function fv(){if(Pe())return await Ta(rf),!0;for(;Date.now()-lv<of;)if(await Ta(mv),Pe())return await Ta(rf),!0;return Pe()||Pa()}function Ol(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function pv(){if(Ol())return!0;let t=Date.now()+of;for(;Date.now()<t;)if(await Ta(100),Ol())return!0;return Ol()}function gv(){try{GM_registerMenuCommand?.("Bloom++ settings",Dc)}catch{}}function bv(){Ho(()=>{mr("HostShell"),ur.info("host shell",lt)}),Io(()=>{ur.info("idle ready",lt)}),No(()=>{Ma(),mr("HostReady"),ur.info("chrome ready",lt)})}async function Bl(){await tc()}async function Dl(){if(nf)return;nf=!0;for(let n of cv)try{sc(n),hc(n)}catch(r){ur.error("register failed",n.name,r)}mr("Init"),gv(),bv();let t=()=>mr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await uv(),Ma(),ur.info("styles ready",lt),await dv(),pv().then(n=>{n&&Ro()}),!await fv()){ur.warn("late islands not detected; starting default plugins",lt),vn(),Po();return}await gc()}var af=typeof unsafeWindow<"u"?unsafeWindow:window,hv=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||hv){let t=af.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",lt);try{Object.defineProperty(af,"Bloom",{value:$l,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Bl().then(()=>Dl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
