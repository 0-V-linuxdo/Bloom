// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.94
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

/* Bloom++ [20260924] v1.4.94. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Sf=Object.defineProperty;var Lf=(t,e)=>{for(var n in e)Sf(t,n,{get:e[n],enumerable:!0})};var Xl={};Lf(Xl,{REPO_URL:()=>Mc,Settings:()=>z,VERSION:()=>bt,contextKeyFromUrl:()=>oe,conversationTitle:()=>Dn,conversationToken:()=>At,currentConversationId:()=>H,hasDraftText:()=>qt,hasErrorToast:()=>zt,hasLateIslands:()=>je,init:()=>Yl,initSettings:()=>Wl,isDocumentInteractive:()=>Ac,isStreaming:()=>Y,isUserDraftEmpty:()=>Ee,messageCreateTime:()=>Ei,plugins:()=>ee,requestChromeReady:()=>Wo,requestIdleReady:()=>Cn,requestShellReady:()=>Vo,setEditorText:()=>re,subscribeHarvest:()=>ht,watchStreamingEdge:()=>ct,whenChromeReady:()=>Ko,whenIdleReady:()=>Uo,whenShellReady:()=>Go});var pe=new Map,Oo=!1;function Tf(){return document.getElementById("bloom-root")?.shadowRoot??null}function tc(){return document.head??null}function Tn(){let t=Tf();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=kf()}function za(t,e){if(!Oo)return;let n=tc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Tn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Tn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Tn()}function L(t,e){let n=pe.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},pe.set(t,n)),Oo&&za(t,n)}function ja(){if(!tc())return!1;Oo=!0;for(let[e,n]of pe)za(e,n);return Tn(),!0}function ec(t){let e=pe.get(t);e&&(e.disabled=!1,Oo&&za(t,e))}function nc(t){let e=pe.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Tn())}function S(t){let e=pe.get(t);e&&(e.el?.remove(),pe.delete(t),Tn())}function kf(){return Array.from(pe.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var T=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function x(t){return t}var Ga=new Map;function kn(t,e){let n=Ga.get(t);return n||(n=new Set,Ga.set(t,n)),n.add(e),()=>n.delete(e)}function Fe(t,e){let n=Ga.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Mf="bloompp";function rc(){return new Promise((t,e)=>{let n=indexedDB.open(Mf,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function oc(t){try{let e=await rc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function ic(t,e){try{let n=await rc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function it(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function at(t,e,n){return Math.min(n,Math.max(e,t))}function ac(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function sc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function lc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Bo=new T("SettingsStore"),ge="BloomSettings",Cf=100;function Do(t){return t!=null&&typeof t.then=="function"}function Af(t){if(t==null||Do(t))return null;if(it(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(it(e)&&!Do(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return it(n)&&!Do(n)?n:null}return null}catch{return null}}function $o(t){let e=Af(t);if(!e)return null;let n=e.plugins;return!it(n)||Do(n)||Object.keys(n).length===0?null:e}function Ka(t){return it(t)?t:null}function Ua(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:it(t)?Object.keys(t).length===0:!1}function Hf(t){return Ua(t)?0:Array.isArray(t)?12+Math.min(t.length,40):it(t)?12+Math.min(Object.keys(t).length,40):3}function ze(t){if(!t)return-1;let e=t.plugins;if(!it(e))return-1;let n=0;for(let r of Object.values(e)){let o=Ka(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=Hf(a))}return n}function cc(t){let e=t.plugins;if(!it(e))return 0;let n=0;for(let r of Object.values(e))Ka(r)?.enabled===!0&&n++;return n}function uc(t){let e=t.map((i,a)=>({bag:i,index:a,score:ze(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=cc(a.bag)-cc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!it(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(it(a))for(let[s,l]of Object.entries(a)){let c=Ka(l);if(!c)continue;if(!it(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,m]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&m===!0&&(u.enabled=!0);continue}Ua(u[d])&&!Ua(m)&&(u[d]=structuredClone(m))}}}let o=r.Settings;return it(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:ze(n)}}var qo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let m=u(d);m!==void 0&&(i[a]=m,s=m);break}}}return it(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Bo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Cf))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ge,this.plain)}catch{try{GM_setValue(ge,e)}catch(n){Bo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(ge,e)}catch{}ic(ge,e).catch(n=>Bo.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){Bo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){ac(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var If=new T("Settings"),Nf={plugins:{}},z=new qo(structuredClone(Nf)),Rf=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Pf(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function k(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?be(n):{}},get plain(){let n=e.pluginName;return n?z.plain.plugins[n]??{}:{}}};return e}async function Of(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function dc(){let t=$o(await Of(ge)),e=$o(await oc(ge)),n=null;try{n=$o(localStorage.getItem(ge))}catch{n=null}let r=uc([t,e,n]);if(r){let o=r.bag.plugins;o&&(z.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);If.info("Loaded settings from",i,"richness",r.score,"gm",ze(t),"idb",ze(e),"ls",ze(n))}z.releasePersist(),r&&(r.index!==0||r.score>ze(t))&&z.persistLoadedBag()}function be(t){return z.plain.plugins[t]||(z.plain.plugins[t]={}),z.store.plugins[t]}function mc(t,e){e&&(e.pluginName=t,be(t),z.setDefaultGetter(Rf(t),n=>{if(n!=="enabled")return Pf(e.def,n)}))}function fc(){return be("Settings")}function _o(){return fc().pinnedPlugins??[]}function pc(t){return _o().includes(t)}function gc(t){let e=_o(),n=e.includes(t);return z.store.plugins.Settings={...z.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function Fo(){return fc().starredPlugins??[]}function bc(t){return Fo().includes(t)}function hc(t){let e=Fo(),n=e.includes(t);return z.store.plugins.Settings={...z.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var zo=new T("PluginManager"),ee={},wr=new Set;function yc(t){if(ee[t.name]){zo.warn("Duplicate plugin",t.name);return}ee[t.name]=t,mc(t.name,t.settings)}function Mn(t){let e=ee[t];if(!e)return!1;if(e.required)return!0;let n=z.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function vc(t){let e=ee[t];if(!e||e.required)return;let n=!Mn(t);be(t),z.store.plugins[t].enabled=n,n?xc(e):Bf(e),Fe("pluginToggle",{name:t,enabled:n})}function xc(t,e=!1){if(!wr.has(t.name)&&Mn(t.name))try{t.managedStyle&&ec(t.managedStyle),t.start?.(),wr.add(t.name),t.settings&&z.addPrefixChangeListener(`plugins.${t.name}.`,()=>{wr.has(t.name)&&t.onSettingsChange?.()}),e||zo.debug("Started",t.name)}catch(n){zo.error("Failed to start",t.name,n)}}function Bf(t){if(wr.has(t.name)){try{t.stop?.()}catch(e){zo.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(nc(t.managedStyle),S(t.managedStyle)),wr.delete(t.name)}}function Sr(t){for(let e of Object.values(ee))(e.startAt??"DOMContentLoaded")===t&&xc(e)}var Lr=!1,jo=!1,Va=!1,wc=[],Sc=[],Lc=[];function Wa(t){let e=t.splice(0);for(let n of e)n()}function Tr(){Lr||(Lr=!0,Wa(wc))}function Ya(){jo||(jo=!0,Lr||Tr(),Wa(Sc))}function Tc(){Va||(Va=!0,Lr||Tr(),jo||Ya(),Wa(Lc))}function Go(t){Lr?t():wc.push(t)}function Uo(t){jo?t():Sc.push(t)}function Ko(t){Va?t():Lc.push(t)}function Vo(){Tr()}function Cn(){Tr(),Ya()}function Wo(){Tc()}function Ec(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function kc(){await Ec(4e3),Tr(),await Ec(4e3),Ya(),Tc()}var E={p:"0-V-linuxdo"},bt="[20260924] v1.4.94",Mc="https://github.com/0-V-linuxdo/Bloom";var Df={BetterNavigator:1790240385e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789969779e3,ComposerOpacity:1789969779e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789969779e3,InputHistory:1789969779e3,MessageTimestamps:1790230458e3,NoDictation:1789969779e3,NoShareLink:1789969779e3,NoSidebarIdentity:1789969779e3,PromptQueue:1790249761e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789969779e3,WiderChat:1789969779e3};function Cc(t){let e=Df[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function qf(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function $f(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Xa(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function je(){return Xa()?qf()||$f():!1}function Ac(){return je()}var _f=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Hc=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Ff=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),zf="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Hn(t){return t.id==="bloom-root"||!!t.closest(zf)}function Ic(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Yo(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Za(t){if(!(t instanceof HTMLElement)||!t.isConnected||Hn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Yo(e)?!1:t.getClientRects().length>0}function An(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function jf(){let t=[];for(let e of document.querySelectorAll(_f))!(e instanceof HTMLElement)||!e.isConnected||Hn(e)||t.push(e);return t}function Xo(t){if(!t.isConnected||Hn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Ge(){return jf().filter(Xo)[0]??null}function In(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Hn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Ja(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Hn(n)&&!An(n)&&n.parentElement&&!An(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!An(r)&&!Hn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!An(r.parentElement))return r}return e}function Nn(){let t=document.querySelectorAll(Hc);for(let n of t)if(Za(n)&&!Yo(n)&&Ic(n))return n;let e=document.querySelectorAll(Ff);for(let n of e){if(!Za(n)||!Ic(n)||Yo(n))continue;let r=n.querySelector(Hc);return Za(r)&&!Yo(r)?r:n}return null}function Zo(){let t=Ge();if(t){let e=Ja(t),n=e.parentElement;if(n&&!An(n))return n;if(!An(e))return e}return In()}function Jo(t){let e=Ge();return e?t.composedPath().includes(e):!1}var ts=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Gf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Uf(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Kf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Qa(t){let e=Uf(t);return e?Kf(e)>.55?"light":"dark":null}function Vf(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Qa(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Qa(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Qa(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Qo(t){return t==="auto"?Vf():t}function Wf(t){try{let e=getComputedStyle(document.documentElement);for(let n of ts){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function ti(t,e,n){let r=Gf[e];if(n){Wf(t);for(let o of ts)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of ts)t.style.setProperty(o,r[o])}function Nc(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var es=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Xf="bloom-root",Bt="bloom-rail-item",ii="bloom-account-item",Ke="bloom-sidebar-panel",Pr="bloom-plugin-dialog",mi="bloom-plugin-layer",ai="bloom-settings-css",Zf=2e3,Oc=null,Jf=null,xe=!1,is=[],ei=null,si=null,ye=null,ri=null,ne=null,Ir=null,kr,Rn=0,Nr=0,Mr=0,Cr=null,Ar=null,li=null,Bc=null,Hr=null,ns=[],ci=!1,Qf=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],tp=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],ep=new Set(["chat","ui","privacy"]),np=10080*60*1e3,fi="",Rr="all",Ot="all";function pi(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Dc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function rp(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function op(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function ip(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function ap(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var sp={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function lp(t){return t.icon||sp[t.name]||pi()}function rs(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),ti(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function qc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function ui(){let t="auto",e=Qo(t);rs(Oc,e,!0);let n=document.getElementById(Ke);n instanceof HTMLElement&&rs(n,e,!0);let r=document.getElementById(Pr);r instanceof HTMLElement&&rs(r,e,!0);let o=document.getElementById(Bt);o instanceof HTMLElement&&qc(o),Fe("schemeChange",{scheme:e,pref:t})}function $c(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function _c(){if(L("settings",es),document.getElementById(ai)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=ai,t.textContent=es,document.head.appendChild(t)}function cp(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function up(){for(let t of is)t();is=[]}function Fc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function dp(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function ls(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function mp(t){return ls(t).length>0}function oi(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function fp(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=dp(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function pp(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(fp(e,n));let i=be(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",is.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??oi(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??oi(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Fc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??oi(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Rc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function gp(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=be(t.name);for(let[n,r]of ls(t)){if(n==="enabled"||r.type===5)continue;let o=oi(r);o!==void 0&&(e[n]=o)}jc(t)}function zc(t){t.key==="Escape"&&(!document.getElementById(mi)&&!document.getElementById(Pr)||(t.stopPropagation(),Pn()))}function bp(){ci||(document.addEventListener("keydown",zc),ci=!0)}function hp(){ci&&(document.removeEventListener("keydown",zc),ci=!1)}function Pn(){up(),hp(),document.getElementById(mi)?.remove(),document.getElementById(Pr)?.remove()}function jc(t){if(Pn(),!document.body)return;let e=document.createElement("div");e.id=mi,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",ve),e.addEventListener("pointerup",ve),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Pn()});let n=document.createElement("div");n.id=Pr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",ve),n.addEventListener("pointerup",ve),n.addEventListener("click",ve);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Dc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Pn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Rc("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Rc("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=ls(t);if(c.length)for(let[u,d]of c){let m=pp(t.name,u,d);m&&l.appendChild(m)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>gp(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),bp(),ui()}function yp(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=lp(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=bc(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=ip(l),c.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();let f=hc(t.name);Fe("pluginStar",{name:t.name,starred:f})}),s.appendChild(c),!t.required){let p=pc(t.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${p?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",p?"Unpin from top":"Pin to top"),f.innerHTML=ap(p),f.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let v=gc(t.name);Fe("pluginPin",{name:t.name,pinned:v})}),s.appendChild(f)}if(mp(t)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn bloom-card-settings",p.setAttribute("aria-label",`${t.name} settings`),p.innerHTML=op(),p.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),jc(t)}),s.appendChild(p)}let u=Fc(t.name,Mn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",p=>p.stopPropagation()),d?.addEventListener("change",()=>{vc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let p=document.createElement("div");p.className="bloom-card-desc",p.textContent=t.description,n.appendChild(p)}let m=document.createElement("div");m.className="bloom-card-separator";let y=document.createElement("div");y.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",y.appendChild(g),e.append(n,m,y),e}function Gc(){return Object.values(ee).filter(t=>!t.hidden&&t.name!=="Settings")}function vp(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<np}function Uc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return vp(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>ep.has(r)):n.includes(e)}function xp(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Ep(){return fi.trim()?"No plugins match your search.":Ot==="favorites"?"No favorites yet. Star a plugin to see it here.":Ot==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function wp(){let t=Gc();return tp.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Uc(n,e.id)))}function Sp(){if(Hr){Hr.replaceChildren();for(let t of wp()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Ot===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Ot=t.id,Ue()}),Hr.appendChild(e)}}}function Lp(){let t=Gc();if(Ot==="favorites"){let e=new Set(Fo());t=t.filter(n=>e.has(n.name))}else Ot!=="all"&&(t=t.filter(e=>Uc(e,Ot)));return Rr==="enabled"&&(t=t.filter(e=>Mn(e.name))),Rr==="disabled"&&(t=t.filter(e=>!Mn(e.name))),t}function Ue(){if(!Cr)return;Sp();let t=Lp();li&&(li.placeholder=`Search ${t.length} plugins...`);let e=t,n=fi.trim().toLowerCase();if(n&&(e=e.filter(r=>xp(r).includes(n))),Ot==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Ot!=="favorites"){let r=_o();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Cr.replaceChildren();for(let r of e)Cr.appendChild(yp(r));Ar&&(Ar.hidden=e.length>0,Ar.textContent=Ep())}function ve(t){t.stopPropagation()}function os(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function cs(){document.getElementById(Bt)?.setAttribute("aria-expanded",xe?"true":"false")}function Tp(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function us(){Pn(),fi="",Rr="all",Ot="all",document.getElementById(Ke)?.remove(),xe=!1,cs()}function kp(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",ve),e.addEventListener("pointerup",ve),e.addEventListener("click",ve);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=pi();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=rp();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Dc(),d.addEventListener("click",us),r.appendChild(o),n.appendChild(r);let m=document.createElement("div");m.className="bloom-plugin-tabs",n.appendChild(m);let y=document.createElement("div");y.className="bloom-search-bar";let g=document.createElement("input");g.type="search",g.className="bloom-search-input",g.setAttribute("aria-label","Search plugins"),g.placeholder="Search plugins...",g.addEventListener("input",()=>{fi=g.value,Ue()});let p=document.createElement("select");p.className="bloom-search-filter",p.setAttribute("aria-label","Filter plugins");for(let v of Qf){let I=document.createElement("option");I.value=v.value,I.textContent=v.label,p.appendChild(I)}p.value=Rr,p.addEventListener("change",()=>{Rr=p.value,Ue()}),y.append(g,p),n.appendChild(y);let f=document.createElement("div");f.className="bloom-plugin-list",n.appendChild(f);let h=document.createElement("p");return h.className="bloom-tab-empty",h.hidden=!0,n.appendChild(h),e.append(d,n),Cr=f,Ar=h,li=g,Bc=p,Hr=m,Ue(),e}function Mp(t){t.classList.add("bloom-rail-dock")}function Cp(){let t=document.getElementById(Bt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Xo(t)?t:null}function Ap(){if(document.getElementById(Ke)?.remove(),!document.body)return;let t=kp(Ke);Mp(t),document.body.appendChild(t),xe=!0,Pn(),ui(),cs(),Fe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:bt,dock:"center",rail:!!Cp()})}function ds(){let t=document.getElementById(Ke);if(t instanceof HTMLElement&&t.isConnected&&Tp(t)){us();return}t?.remove(),Ap()}function Hp(){let t=document.createElement("button");return t.type="button",t.id=Bt,t.className="bloom-rail-item",t.setAttribute("aria-controls",Ke),t.setAttribute("aria-expanded",xe?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${pi()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ds()}),t}function Pc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Ip(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Np(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function he(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Kc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Ip(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&he(t,"padding-top",Math.round(i)),Number.isFinite(a)&&he(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));he(n,"width",l),he(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&he(t,"padding-left",u);let d=Np(e,r);if(d){let m=d.getBoundingClientRect(),y=n.getBoundingClientRect(),g=Math.round(m.left-y.right);g>=0&&g<=24&&he(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&he(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&he(t,"gap",Math.round(l))}qc(t)}function as(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Rp(){if(Ir?.isConnected&&ne){ne.observe(Ir,{childList:!0});return}ss()}function Pp(t){if(as(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Op(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Mr=0;return}Mr+=1,Nr=Date.now()+Math.min(8e3,250*2**Math.min(Mr,5))})}function Bp(){Rn||Date.now()<Nr||(Rn=requestAnimationFrame(()=>{Rn=0,!(Date.now()<Nr)&&(document.getElementById(Bt)?.isConnected||di())}))}function di(){if(!document.body)return;ne?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Bt);t=n instanceof HTMLButtonElement?n:Hp();let r=Ge(),o=In();if(r){let i=Ja(r),a=i.parentElement;if(as(i)||a&&as(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Pc(t),Kc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Pc(t,!0)):t.isConnected&&!Xo(t)&&(t.remove(),t=null)}finally{Op(t,e),Rp(),cs()}}function ss(){let t=Zo();!t||!Pp(t)||Ir===t&&ne||(ne?.disconnect(),Ir=t,ne=new MutationObserver(()=>{document.getElementById(Bt)?.isConnected||Bp()}),ne.observe(t,{childList:!0}))}function Dp(){di(),ss(),kr===void 0&&(kr=window.setInterval(()=>{let t=document.getElementById(Bt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Nr&&di();else{Mr=0;let e=Ge();e&&Kc(t,e)}ss()},Zf))}function qp(){kr!==void 0&&(clearInterval(kr),kr=void 0),Rn&&cancelAnimationFrame(Rn),Rn=0,Nr=0,Mr=0,ne?.disconnect(),ne=null,Ir=null}function $p(t){ri===t&&ye||(ye?.disconnect(),ri=t,ye=new MutationObserver(()=>{if(!t.isConnected){ye?.disconnect(),ye=null,ri=null;return}Vc(t)}),ye.observe(t,{childList:!0}))}function Vc(t){if($p(t),t.querySelector(`#${ii}`))return;let e=document.createElement("button");e.type="button",e.id=ii,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${pi()}<span>Bloom++</span>`,e.addEventListener("pointerdown",os),e.addEventListener("pointerup",os),e.addEventListener("click",n=>{os(n),ds()}),t.insertBefore(e,t.firstChild)}function ni(){let t=Nn();return t?(Vc(t),!0):!1}function _p(t){Jo(t)&&(queueMicrotask(ni),requestAnimationFrame(()=>{ni()}),window.setTimeout(ni,60),window.setTimeout(ni,180))}function Fp(){si?.abort();let t=new AbortController;si=t,document.addEventListener("click",_p,{signal:t.signal})}function zp(){si?.abort(),si=null,ye?.disconnect(),ye=null,ri=null}function Wc(){Cn(),cp(()=>{_c(),$c(),di(),ds()})}var Yc=x({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[E.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Xf}`,`#${Bt}`,`#${ii}`,`#${Ke}`,`#${mi}`,`#${Pr}`,`#${ai}`,"#bloom-menu-panel"],start(){_c(),$c(),Dp(),Fp(),ei?.(),ei=Nc(ui),ui(),ns=[kn("pluginToggle",()=>{xe&&Ue()}),kn("pluginPin",()=>{xe&&Ue()}),kn("pluginStar",()=>{xe&&Ue()})]},stop(){qp(),zp(),ei?.(),ei=null;for(let t of ns)t();ns=[],us(),document.getElementById(Bt)?.remove(),document.getElementById(ii)?.remove(),document.getElementById(ai)?.remove(),Oc=null,Jf=null,Cr=null,Ar=null,li=null,Bc=null,Hr=null,xe=!1}});var gi='form[data-type="unified-composer"], form.w-full[data-type]',Dt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),On=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Xc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Zc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),jp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Gp='[contenteditable="false"], button, [role="button"]';function Mt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Ve(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Mt(o)))return o;return null}function Jc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function j(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Jc(t);return!!(jp.test(n)||/^stop$/i.test(n))}function Ct(){let e=Array.from(document.querySelectorAll(gi)).find(Mt);if(e instanceof HTMLElement)return e;let n=Ve(document,Dt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function st(){let t=Array.from(document.querySelectorAll(Dt));return t.find(Mt)??t[0]??null}function Up(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Gp);return!!n&&n!==e&&e.contains(n)}function ms(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Up(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function qt(t){let e=t??st();return e?ms(e,e).replaceAll("\u200B","").trim().length>0:!1}function Ee(t){return!qt(t)}function bi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Qc(t){let e=Ct();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Mt(n))&&t(n))return n;return null}function we(){let t=Ct(),e=Ve(t,On)??Ve(document,On);return e&&!j(e)?e:Qc(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!j(n);let o=Jc(n);return/^(send|send prompt|发送)$/i.test(o)&&!j(n)})}function We(){let t=Ct(),e=Ve(t,Xc,!0)??Ve(document,Xc,!0);if(e)return e;let n=Ve(t,Zc)??Ve(document,Zc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Mt(r)&&j(r))return r}return Qc(j)}function $t(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>ms(n,t)).join(`
`):ms(t,t)}function fs(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function re(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),fs(t,n)}var tu=/\/c\/([a-zA-Z0-9_-]{8,})/i;function At(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function oe(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ie(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(tu)?.[1]??""}catch{return t.match(tu)?.[1]??""}}function H(){return ie(location.pathname)}var ou=new T("Harvest"),Kp=1500,Vp=200,hi=new Set,yi=new Map,vi=new Map,Bn=null,xi=null,Or=null,_t=0;function Wp(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Yp(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Xp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function iu(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var Zp=/"action"\s*:\s*"(next|continue|variant)"/i;function Jp(t,e,n){return!(e!=="POST"||iu(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Zp.test(n))}function Qp(t,e){return e!=="GET"||iu(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function eu(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function au(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function tg(t){return typeof t=="string"?au(t):""}function ps(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return ps(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function su(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function nu(t,e,n){!t||!e||vi.get(t)!==e&&(vi.set(t,e),su(vi,Kp),Se({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function eg(t,e){let n=e.trim();!t||!n||yi.get(t)!==n&&(yi.set(t,n),su(yi,Vp),Se({type:"conversation-meta",conversationId:t,title:n}))}function Br(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Br(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&eg(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=ps(l.create_time??l.createTime??l.created_at);c&&u&&nu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=ps(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&nu(a,s,o),r.mapping&&typeof r.mapping=="object")Br(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Br(l,o,n+1)}function ru(t,e){if(t)try{Br(JSON.parse(t),e)}catch{}}function Se(t){for(let e of Array.from(hi))try{e(t)}catch{}}async function ng(t,e,n){if(n===_t)try{let r=await t.json();if(n!==_t)return;Br(r,e)}catch{}}async function rg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===_t&&Se({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===_t;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let y=au(c);y&&(o=y,Se({type:"post-start",conversationId:o,url:""}))}let m=c.split(`
`);c=m.pop()??"";for(let y of m){let g=y.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||ru(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===_t&&ru(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===_t&&Se({type:"post-end",conversationId:o,error:i})}function og(t,e,n){let r=Yp(e),o=Xp(e,n),i=Qp(r,o),a=Jp(r,o,n?.body),s=_t,l="";return a&&(l=tg(n?.body)||eu(r)||ie(r)||H(),Se({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==_t||!i&&!a)return c;try{let u=c.clone();i?ng(u,eu(r)||H(),s):rg(u,l,!c.ok,s)}catch{a&&Se({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===_t&&Se({type:"post-end",conversationId:l,error:!0}),c})}function ig(){if(Bn)return;let t=Wp();Or=t,Bn=t.fetch.bind(t);let e=(n,r)=>og(Bn,n,r);xi=e,t.fetch=e,ou.debug("conversation fetch harvest hooked")}function ag(){_t+=1,!(!Bn||!Or)&&(xi&&Or.fetch===xi&&(Or.fetch=Bn),Bn=null,xi=null,Or=null,ou.debug("conversation fetch harvest unhooked"))}function ht(t){return hi.add(t),ig(),()=>{hi.delete(t),hi.size===0&&ag()}}function Dn(t){return t?yi.get(t)??"":""}function Ei(t){return t?vi.get(t)??null:null}var cu=new T("Streaming");function Fr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Mt(e))&&(j(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function sg(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Mt(t))}function lg(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Mt(t))}function cg(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function zt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Y(){if(We()||Fr()||cg())return!0;let t=we();return t&&Mt(t)&&!j(t)?!1:!!(sg()||lg())}var ug=400,lu=3,Je=new Set,Dr,qr=null,gs=null,Xe=!1,Ye=0,Te="",ke="",Me=!1,$r=!1,_r=!1,Ft=!1,J=null,yt="",Ze=!1;function G(){return Ft}function Qe(){return Me}function qn(){return yt}function bs(){return H()||yt}function uu(){return oe(At())}function wi(t,e){return{streaming:t,contextKey:e,conversationId:bs()}}function hs(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function dg(t){return!t||t==="/"||t.startsWith("/g/")}function X(t,e){if(!t||t===e)return!1;let n=ie(hs(e)||e);return!n||!(t.endsWith("|draft")||dg(hs(t)))?!1:yt?n===yt:Ze}function Si(){Xe=!1,Ye=0,Te="",Me=!1,$r=!1,_r=!1,yt="",Ze=!1}function mg(t){for(let e of Array.from(Je))try{e.onFall?.(t)}catch{}}function fg(t){for(let e of Array.from(Je))try{e.onRise?.(t)}catch{}}function Le(t){for(let e of Array.from(Je))try{e.onTick?.(t)}catch{}}function pg(t,e){for(let n of Array.from(Je))try{n.onContext?.(t,e)}catch{}}function gg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&j(n)&&(Me=!0)}function bg(t){if(t.type==="post-start"){let n=H();if(!t.conversationId){n||(Ze=!0),(!n||n===yt)&&(Ft=!1,Me=!1);return}if(!(t.conversationId===n||t.conversationId===yt)&&!(!n&&Ze))return;yt=t.conversationId,Ze=!1,Ft=!1,Me=!1;return}if(t.type!=="post-end"||!Xe&&!J)return;let e=H();t.conversationId&&!(e?t.conversationId===e:t.conversationId===yt)||(_r=!0,t.error&&($r=!0,J&&(J.error=!0)))}function hg(){let t=uu(),e=Y();if(ke&&t&&ke!==t){let o=ke;if(!X(o,t))J=null,Si(),Ft=e;else{let i=ie(hs(t));if(i&&!yt&&(yt=i,Ze=!1),Te===o&&(Te=t),J&&J.contextKey===o){J.contextKey=t;let a=bs();a&&(J.conversationId=a)}Ft=!1}if(ke=t,pg(t,o),Ft){Le(wi(!1,t));return}}else t&&(ke=t);if(Ft){if(e){Le(wi(!1,t));return}Ft=!1}if(J)if(e||J.contextKey!==t)J=null;else{let o=J;J=null,Si(),mg(o),Le(wi(!1,t));return}let n=wi(e,t);if(e){let o=!Xe;o&&(Me=!1,$r=!1,_r=!1),Xe=!0,Ye=0,Te=t,o&&fg(n),Le(n);return}if(!Xe){Le(n);return}if(Ye+=1,_r&&(Ye=Math.max(Ye,lu)),Ye<lu){Le(n);return}if(!(!!Te&&Te===t)){Si(),Le(n);return}J={contextKey:Te||t,conversationId:bs(),userStopped:Me,error:$r||zt()},Le(n)}function yg(){Dr===void 0&&(Xe=Y(),ke=uu(),Te=Xe?ke:"",Ye=0,Me=!1,$r=!1,_r=!1,Ft=!1,J=null,yt="",Ze=!1,qr?.abort(),qr=new AbortController,document.addEventListener("click",gg,{capture:!0,signal:qr.signal}),gs=ht(bg),Dr=setInterval(hg,ug),cu.debug("watchStreamingEdge started"))}function vg(){Je.size||(Dr!==void 0&&(clearInterval(Dr),Dr=void 0),qr?.abort(),qr=null,gs?.(),gs=null,Si(),ke="",Ft=!1,J=null,cu.debug("watchStreamingEdge stopped"))}function ct(t){let e=typeof t=="function"?{onFall:t}:t;return Je.add(e),yg(),()=>{Je.delete(e),vg()}}var du="bloom-host-icon",zr="data-bloom-host-rel",ys="not all",vs=0,mu=0,xg=400;function fu(t){vs+=1;try{t()}finally{vs-=1}}function Li(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Ce(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function pu(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Eg(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function wg(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-mu<xg||(mu=n,t.appendChild(e))}function Sg(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Li(n)&&(n.getAttribute(zr)||n.setAttribute(zr,n.rel),n.media!==ys&&(n.media=ys),n.rel!==du&&(n.rel=du))}function Lg(t){for(let e of t.querySelectorAll(`link[${zr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(zr);n&&(e.rel=n),e.removeAttribute(zr),e.media===ys&&e.removeAttribute("media")}}function gu(t,e){let{head:n}=document;!n||!e||fu(()=>{Sg(n,t);let r=pu(t),{type:o,sizes:i}=Eg(e);r?wg(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function bu(t,e){let{head:n}=document;n&&fu(()=>{pu(t)?.remove(),Lg(n)})}function hu(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(vs)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Li(c.target)&&(a=!0,Ce(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Li(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Li(u)&&u.id!==t&&(a=!0,Ce(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Tg=["original","badge","dot","hole","bg"],xu=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Eu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ti="#FCFCFC",kg="#111111",yu="#111111",Mg="#ffffff",Cg="#212121",Ag="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Hg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ki=32,vu=64;function wu(t){return typeof t=="string"&&Tg.includes(t)}function Ig(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Mi(t){let e=document.createElement("canvas");e.width=ki,e.height=ki;let n=e.getContext("2d");return n?(n.scale(ki/vu,ki/vu),t(n),e.toDataURL("image/png")):""}function Ng(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function Ci(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Ag);n&&(t.strokeStyle=kg,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Rg(t,e,n){let r=Eu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=yu,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=yu,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Mg,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function jr(t,e){if(t==="original")return e==="wait"?Mi(r=>Ci(r,Ti)):Ig(Hg[e]);let n=e==="wait"?void 0:Eu[e];return Mi(t==="hole"?r=>Ci(r,n??Ti):t==="bg"?r=>{r.fillStyle=n??Cg,Ng(r,0,0,64,64,14),r.fill(),Ci(r,Ti,!1)}:r=>{Ci(r,Ti),e!=="wait"&&Rg(r,e,t==="dot"?"dot":"badge")})}function Su(t){return{wait:jr(t,"wait"),rotate:jr(t,"rotate"),done:jr(t,"done"),ready:jr(t,"ready"),error:jr(t,"error")}}var Pg=new T("ChatStateFavicons"),en="bloom-chat-state-favicon",Cu=["input","beforeinput","cut","paste","compositionend"],Au=k({style:{type:3,description:"Favicon overlay",options:xu}}),jt="",ws={wait:"",rotate:"",done:"",ready:"",error:""},Gr="wait",ut=!1,Q=!1,$=null,ft="",vt="",rn=!0,Ii=!1,$n=null,xt=0,Ai=null,Hi=null,tn=null,Es=null,_n=null,Ht=!1,Lu=new WeakSet;function Og(){let t=Au.store.style;return wu(t)?t:"bg"}function Hu(){let e=document.querySelector(`link[rel~="icon"]:not(#${en}), link[data-bloom-host-rel]:not(#${en})`)?.href;return Ce(e)?e:Ce(jt)?jt:""}function Bg(){let t=document.getElementById(en);return t instanceof HTMLLinkElement?t:null}function Dg(){if(!Ce(jt)){let t=Hu();t&&(jt=t)}return Ce(jt)?jt:ws.wait}function Iu(t){return t==="wait"?Dg():ws[t]}function Nu(){gu(en,Iu(Gr))}function F(t){let e=Iu(t);if(Gr===t){let n=Bg();if(n&&n.getAttribute("href")===e)return}Gr=t,Nu()}function Tu(){ws=Su(Og()),F(Gr)}function Ss(){return oe(At())}function Ls(t,e){!t||!e||t===e||($===t&&($=e),ft===t&&(ft=e),vt===t&&(vt=e))}function qg(){let t=Ss();if(!(Y()||ut||Q))return ft="",t;if(ft&&t&&ft!==t)if(X(ft,t))Ls(ft,t),ft=t;else return ft="",t;else!ft&&t&&(ft=t);return ft||t}function ku(t){return!$||!t?!1:$===t?!0:X($,t)}function Ru(){ut=!1,Q=!1,$=null,ft=""}function Pu(t){vt=t,Ru(),rn=!1,Ii=!0,F("wait")}function xs(t){return!t&&rn}function $g(){if(!Ht)return;let t=Ss();if(vt&&t&&vt!==t&&!X(vt,t)){Pu(t);return}vt&&t&&X(vt,t)&&Ls(vt,t),t&&(vt=t);let e=Y(),n=e&&!G();if(Ii){if(G()){F("wait");return}Ii=!1}if(G()){F("wait");return}let r=qg(),o=Ee();if(Qe()&&!e){ut=!1,Q=!1,$=null,F(o?"wait":xs(o)?"ready":"wait");return}if(zt()&&!e&&ut){F("error"),ut=!1,Q=!1,$=null;return}if(n){ut||(rn=!1),ut=!0,Q=!1,$=r,F("rotate");return}if(ut)if(!ku(t))ut=!1,Q=!1,$=null;else if(Q){ut=!1,Q=!0,$=t||r,F("done");return}else{F("rotate");return}if(Q)if($&&t&&!ku(t))Q=!1,$=null;else if(o){$=r||$,F("done");return}else if(xs(o)){Q=!1,F("ready");return}else{Q=!1,F("wait");return}$=null,o?F("wait"):xs(o)?F("ready"):F("wait")}function nn(){Ht&&($u(),Bu(),Du(),$g())}function Ou(){if(_n){for(let t of Cu)_n.removeEventListener(t,qu,!0);_n=null}}function Bu(){let t=Ct(),e=t&&t!==document.body?t:null;if(!(_n===e&&e?.isConnected)&&(Ou(),!!e)){_n=e;for(let n of Cu)_n.addEventListener(n,qu,{capture:!0,passive:!0})}}function Du(){let t=Ct();if(!(tn&&Es===t&&t.isConnected)){if(tn?.disconnect(),Es=t,!t||t===document.body){tn=null;return}tn=new MutationObserver(()=>Ni()),tn.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Ni(){if(Ht){if(document.hidden){xt&&(cancelAnimationFrame(xt),xt=0),nn();return}xt||(xt=requestAnimationFrame(()=>{xt=0,Ht&&nn()}))}}function qu(){qt()&&(rn=!0),Ni()}function Mu(){qt()&&(rn=!0),Ni()}function _g(){Ht&&(xt&&(cancelAnimationFrame(xt),xt=0),nn())}function Fg(){Ht&&(rn=!1,nn())}function zg(t){if(!Ht)return;if(t.userStopped){ut=!1,Q=!1,$=null,F("wait");return}if(t.error){ut=!1,Q=!1,$=null,F("error");return}let e=Ss();if(t.contextKey&&e&&t.contextKey!==e&&!X(t.contextKey,e)){ut=!1,Q=!1,$=null,F("wait");return}ut=!1,Q=!0,$=e||t.contextKey,F("done")}function jg(){Ht&&nn()}function Gg(t,e){if(Ht){if(X(e,t)){Ls(e,t),vt=t,nn();return}Pu(t)}}function $u(){let t=st();!t||Lu.has(t)||(Lu.add(t),t.addEventListener("input",Mu,{capture:!0,passive:!0}),t.addEventListener("compositionend",Mu,{capture:!0,passive:!0}))}var _u=x({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Au,startAt:"DOMContentLoaded",cleanupSelectors:[`#${en}`],start(){Ht=!0,jt=Hu()||jt,Tu(),Hi?.disconnect(),Hi=hu(en,t=>{Ce(t)&&(jt=t),Nu()}),$n?.abort(),$n=new AbortController,window.addEventListener("popstate",Ni,{signal:$n.signal}),document.addEventListener("visibilitychange",_g,{signal:$n.signal}),$u(),Bu(),Du(),Ai?.(),Ai=ct({onRise:Fg,onFall:zg,onTick:jg,onContext:Gg}),nn(),Pg.debug("favicon watch started")},stop(){Ht=!1,xt&&cancelAnimationFrame(xt),xt=0,Ai?.(),Ai=null,$n?.abort(),$n=null,Ou(),tn?.disconnect(),tn=null,Es=null,Hi?.disconnect(),Hi=null,Ru(),vt="",rn=!0,Ii=!1,Gr="wait",bu(en,jt)},onSettingsChange:Tu});var Fu=`.bloom-ih-hud {
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
`;var lE=new T("InputHistory"),Ts=/\u200B/g,zu=10,ju=500,Gu=100,Kg=8,Vg=120,Wg=2e3,Ri=10,Pi=k({maxEntries:{type:4,description:"Max stored prompts",min:zu,max:ju,default:Gu},history:{type:5,description:"Stored prompts",render:cb},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ks=new Map,tt=0,Ms="",Gt=!1,Kr=!1,Hs=0,Ur=null,Cs,Is=null,Uu=!0;function It(){let t=Pi.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ku(t){let e=at(Number(Pi.store.maxEntries??Gu),zu,ju);return t.length>e?t.slice(t.length-e):t}function Oi(t){Pi.store.entries=Ku(t)}function Yg(t){return t.replaceAll(Ts,"").replace(/\n$/,"").trim()}function As(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Dt);return n instanceof HTMLElement?n:st()}function Xg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!$t(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(Ts,"").trim().length===0,last:i.toString().replaceAll(Ts,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Vu(t){clearTimeout(Cs),Cs=setTimeout(()=>{if(t!==Hs)return;Kr=!1;let e=Is;e&&fs(e,Uu)},Vg)}function Wu(t,e,n){Kr=!0,Is=t,Uu=n;let r=++Hs;re(t,e,n),Vu(r)}function Zg(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Fn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Jg(){document.querySelector(".bloom-ih-hud")?.remove()}function Qg(t,e){let n=Zg();n.textContent=t;let r=(e.closest("form")??Ct()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Kg)}px`,n.classList.add("bloom-ih-hud-on")}function Ns(t){let e=Yg(t);if(!e)return;let n=Date.now(),r=ks.get(e);if(r&&n-r<Wg)return;ks.set(e,n);let o=It().filter(i=>i!==e);o.push(e),Oi(o),tt=It().length,Gt=!1,Fn()}function tb(t,e){let n=It();if(!n.length&&t)return;tt>=n.length&&(Ms=$t(e),tt=n.length);let r=t?tt-1:tt+1;r<0||r>n.length||(tt=r,Gt=!0,Wu(e,r===n.length?Ms:n[r],t),r<n.length?Qg(`${r+1} / ${n.length}`,e):Fn())}function eb(t){Gt=!1,Fn(),Wu(t,Ms,!1),tt=It().length}function nb(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=As(t.target)??As(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Gt&&!t.altKey&&!t.shiftKey){eb(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){Ns($t(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=It();if(!r){let i=Xg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||tt<=0)||!n&&tt>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),tb(n,e))}function rb(t){if(As(t.target)){if(Kr){Vu(Hs);return}Gt&&(Gt=!1,Fn(),tt=It().length)}}function ob(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Dt);n instanceof HTMLElement&&Ns($t(n))}function ib(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(On);if(!n||!(n instanceof HTMLElement)||j(n))return;let r=st();r&&Ns($t(r))}function ab(t){if(!(!Gt||Kr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Gt=!1,Fn()}}function sb(){if(Ur)return;Ur=new AbortController;let{signal:t}=Ur,e={capture:!0,signal:t};window.addEventListener("keydown",nb,e),window.addEventListener("input",rb,e),window.addEventListener("submit",ob,e),window.addEventListener("click",ib,e),window.addEventListener("pointerdown",ab,e)}function lb(t){let e=It().slice();e.splice(t,1),Oi(e),tt>e.length&&(tt=e.length)}function cb(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=It().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Ri));n>=l&&(n=l-1);let c=s.slice(n*Ri,n*Ri+Ri);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let f=document.createElement("div");f.className="bloom-ih-list",c.forEach((h,v)=>{let I=i.indexOf(h),R=It().length-1-I,P=document.createElement("div");P.className="bloom-ih-item";let q=document.createElement("button");q.type="button",q.className=`bloom-ih-body${r===v?"":" bloom-ih-clamp"}`,q.textContent=h,q.addEventListener("click",()=>{r=r===v?-1:v,o()});let A=document.createElement("div");A.className="bloom-ih-actions";let N=document.createElement("button");N.type="button",N.title="Copy",N.textContent="C",N.addEventListener("click",()=>{sc(h)});let V=document.createElement("button");V.type="button",V.title="Delete",V.textContent="\xD7",V.addEventListener("click",()=>{lb(R),o()}),A.append(N,V),P.append(q,A),f.appendChild(P)}),t.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(f)}let d=document.createElement("div");d.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,o()});let y=document.createElement("span");y.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let p=document.createElement("button");p.type="button",p.className="bloom-ih-clear",p.textContent="Clear all",p.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Oi([]),tt=0,o())}),d.append(m,y,g,p),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Yu=x({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[E.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Pi,startAt:"HostReady",managedStyle:"inputHistory",start(){L("inputHistory",Fu),tt=It().length,Gt=!1,sb()},stop(){Ur?.abort(),Ur=null,Fn(),Jg(),ks.clear(),clearTimeout(Cs),Kr=!1,Is=null,Gt=!1},onSettingsChange(){let t=It(),e=Ku(t);e.length!==t.length&&Oi(e),tt>e.length&&(tt=e.length)}});var Rs="noShareLink",ub=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],db=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Ps=k({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Xu(t){return`${t.join(",")}{display:none!important}`}function Zu(){let t=[];if(Ps.store.hideShareChat!==!1&&t.push(Xu(ub)),Ps.store.hideShareProject!==!1&&t.push(Xu(db)),!t.length){S(Rs);return}L(Rs,t.join(`
`))}var Ju=x({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[E.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Ps,start:Zu,onSettingsChange:Zu,stop(){S(Rs)}});var ed="noDictation",mb=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],fb=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],nd=k({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Qu(t){return`${t.join(",")}{display:none!important}`}function td(){let t=[Qu(mb)];nd.store.hideDictationSettings!==!1&&t.push(Qu(fb)),L(ed,t.join(`
`))}var rd=x({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:nd,start:td,onSettingsChange:td,stop(){S(ed)}});var Os="noSidebarIdentity",zn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],ad=zn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),sd=zn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),pb=[...ad,...sd],gb=[...ad,...zn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],bb=zn.map(t=>`${t} a[href^="mailto:"]`),hb=zn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),yb=zn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Vr=k({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function od(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function vb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function xb(){return`${yb.join(",")}{margin-block:auto!important}`}function Eb(){return`${hb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function id(){let t=Vr.store.hideUsername!==!1,e=Vr.store.hideEmail!==!1,n=t&&Vr.store.enlargePlan!==!1,r=t&&Vr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(vb([...gb,...sd])),o.push(xb())):o.push(od(pb))),e&&o.push(od(bb)),n&&o.push(Eb()),!o.length){S(Os);return}L(Os,o.join(`
`))}var ld=x({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[E.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Vr,start:id,onSettingsChange:id,stop(){S(Os)}});var cd=`#bloom-rt-host {
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
`;var md=new T("RecentTopics"),Un="bloom-rt-host",fd="home",pd=/^\/c\/([a-z0-9_-]{8,})/i,Sb=/\/c\/([a-z0-9_-]{8,})/i,gd=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Lb=new Set(["Backquote","IntlBackslash"]),Tb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),kb=140,Mb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),et=k({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Mb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Bi=null,Di=null,pt=!1,Qr=!1,Wr=!1,Ut=0,on="",jn=null,Yr=null,Gn,Bs=null,Ds=null;function Cb(){let t=Number(et.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Xr(){let t=et.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function $s(){let t=et.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function bd(){let t=et.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function _s(){let t=et.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function $i(t){let e=Cb();return t.length>e?t.slice(0,e):t}function Kt(t){return t===fd}function Zr(t,e=kb){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Fs(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(pd)?.[1]??""}catch{return t.match(Sb)?.[1]??""}}function an(){let t=(location.pathname||"/").match(pd);if(t?.[1])return t[1];let n=At().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return fd}function zs(t){if(Kt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Fs(r.getAttribute("href")||"")!==t)continue;let o=Zr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return an()===t&&e&&!/^ChatGPT$/i.test(e)?Zr(e,80):""}function Ab(t){if(Kt(t))return"New chat";let e=$s()[t];if(e)return e;let n=Dn(t);return n||zs(t)||"Chat"}function Hb(t){return _s()[t]||""}function Ib(t){return bd()[t]||{}}function js(t,e){if(!t||Kt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=$s();n[t]!==e&&(n[t]=e,et.store.titles=n)}function Nb(t){t.type==="conversation-meta"&&(js(t.conversationId,t.title),pt&&Kn())}function Rb(t,e){if(!t||Kt(t)||!e)return;let n=_s();n[t]!==e&&(n[t]=e,et.store.projects=n)}function Pb(t,e){if(!t||Kt(t)||!e.user&&!e.assistant)return;let n=bd(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,et.store.previews=n)}function Gs(t){if(!t||Kt(t)&&et.store.includeHome===!1)return;let e=Xr().filter(n=>n!==t);e.unshift(t),et.store.visits=$i(e)}function _i(){let t=et.store.includeHome!==!1;return $i(Xr().filter(n=>t||!Kt(n))).map(n=>({id:n,title:Ab(n),project:Hb(n),preview:Ib(n)}))}function ud(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Zr(o)}catch{return""}}function Jr(t){if(!t||Kt(t)||t!==an())return;let e=zs(t);e&&js(t,e);let n=ud("user"),r=ud("assistant");Pb(t,{user:n,assistant:r});let o=yd(t);if(o){let i=hd(o);i&&Rb(t,i)}}function Us(){let t=$s(),e=_s(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Un}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Fs(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Zr(c.textContent||"",80);d&&!gd.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let m=hd(c);m&&e[u]!==m&&(e[u]=m,i=!0)}}catch{}o&&(et.store.titles=t),i&&(et.store.projects=e);let a=Xr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(et.store.visits=$i([...a,...l]))}function hd(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Zr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!gd.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function yd(t){if(Kt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Fs(e.getAttribute("href")||"")===t)return e}catch{}return null}function Ob(t){let e=yd(t);if(e){e.click();return}if(Kt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Bb(){let t=an();on&&on!==t&&Jr(on),on=t,Gs(t),Us();let e=zs(t);e&&js(t,e),Jr(t)}function qi(){Gn===void 0&&(Gn=window.setTimeout(()=>{Gn=void 0,Bb()},120))}function Db(){jn||(jn=history.pushState.bind(history),Yr=history.replaceState.bind(history),history.pushState=function(...e){let n=jn(...e);return qi(),n},history.replaceState=function(...e){let n=Yr(...e);return qi(),n})}function qb(){jn&&(history.pushState=jn),Yr&&(history.replaceState=Yr),jn=null,Yr=null}function $b(t){return Lb.has(t.code)||t.keyCode===192?!0:Tb.has(t.key)}function vd(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function _b(t,e){Qr=e,Us(),Jr(an()),pt=!0,Ut=0;try{let n=an();Gs(n);let r=_i();r.length>1&&(Ut=t?r.length-1:1)}catch(n){md.error("Failed to open switcher:",n)}Kn()}function dd(t){let{length:e}=_i();e&&(Ut=(Ut+(t?-1:1)+e)%e,Kn())}function Ks(){if(!pt)return;let t=_i()[Ut];pt=!1,Qr=!1,Kn(),t&&Ob(t.id)}function xd(){pt&&(pt=!1,Qr=!1,Kn())}function Fb(t){if(vd(t)){Wr=!0;return}if((t.ctrlKey||Wr)&&!t.altKey&&!t.metaKey&&$b(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{pt?dd(t.shiftKey):_b(t.shiftKey,!0)}catch(n){md.error("Hotkey failed:",n)}return}if(pt){if(t.key==="Escape"){t.preventDefault(),xd();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Ks();return}t.key==="Tab"&&(t.ctrlKey||Wr)&&(t.preventDefault(),dd(t.shiftKey))}}function zb(t){vd(t)&&(Wr=!1,pt&&Qr&&Ks())}function jb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(qi)}function Gb(t){!pt||(t.target instanceof Element?t.target:null)?.closest(`#${Un}`)||xd()}function Ub(){document.visibilityState==="hidden"&&Jr(an())}function qs(t=Di){t instanceof HTMLElement&&ti(t,Qo("auto"),!0)}function Kb(){if(!document.body)return null;let t=document.getElementById(Un);if(t instanceof HTMLElement)return Di=t,qs(t),t;t=document.createElement("div"),t.id=Un;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),Di=t,qs(t),t}function Kn(){let t=Kb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!pt){e.dataset.visible="false",e.replaceChildren();return}let n=_i();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Ut>=n.length&&(Ut=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Ut?"true":"false",s.setAttribute("aria-selected",a===Ut?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Ut=a,Ks()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Vb(){document.getElementById(Un)?.remove(),Di=null}var Ed=x({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Un}`],settings:et,start(){L("recentTopics",cd),on=an(),Gs(on),Us(),Jr(on),Bs=ht(Nb),Db(),Bi=new AbortController;let{signal:t}=Bi;window.addEventListener("keydown",Fb,{capture:!0,signal:t}),window.addEventListener("keyup",zb,{capture:!0,signal:t}),window.addEventListener("popstate",qi,{signal:t}),document.addEventListener("click",jb,{capture:!0,signal:t}),document.addEventListener("click",Gb,{signal:t}),document.addEventListener("visibilitychange",Ub,{signal:t}),Ds=kn("schemeChange",()=>qs())},stop(){Bi?.abort(),Bi=null,Gn!==void 0&&(clearTimeout(Gn),Gn=void 0),qb(),Bs?.(),Bs=null,Ds?.(),Ds=null,pt=!1,Qr=!1,Wr=!1,Vb()},onSettingsChange(){let t=$i(Xr());t.length!==Xr().length&&(et.store.visits=t),pt&&Kn()}});var Vs="cleaner",Wb=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Yb=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Xb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Zb=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Jb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Qb=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],sn=k({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Vn(t){return`${t.join(",")}{display:none!important}`}function wd(){let t=[];if(sn.store.hideDownloadApps!==!1&&t.push(Vn(Wb)),sn.store.hideDisclaimer!==!1&&t.push(Vn(Yb)),sn.store.hideUpgrade!==!1&&t.push(Vn(Xb)),sn.store.hideLockedModels!==!1&&t.push(Vn(Zb)),sn.store.hideHomePromo!==!1&&t.push(Vn(Jb)),sn.store.hideAds!==!1&&t.push(Vn(Qb)),!t.length){S(Vs);return}L(Vs,t.join(`
`))}var Sd=x({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[E.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:sn,start:wd,onSettingsChange:wd,stop(){S(Vs)}});var zi=new T("ResponseNotification"),Yn=k({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:ah},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ws=!1,Fi=null,Wn=null,to=null;function th(){return document.visibilityState==="hidden"||document.hidden}function eh(){return Yn.store.onlyWhenHidden===!1?!0:th()}function nh(){let t=Dn(H());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Ld(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!Wn||Wn.state==="closed")&&(Wn=new t);let e=Wn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){zi.debug("chime failed",t)}}function rh(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){zi.debug("custom sound failed",e),Ld()}}function Td(){let t=String(Yn.store.soundUrl||"").trim();t?rh(t):Ld()}function oh(){let t="Bloom++",e=`${nh()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){zi.debug("notification failed",n)}}function ih(){eh()&&(Yn.store.sound!==!1&&Td(),Yn.store.browserNotification!==!1&&oh())}function ah(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Td()),t.appendChild(e),()=>{e.remove()}}var kd=x({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[E.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Yn,start(){Ws=!0,Fi?.(),Fi=ct(t=>{if(!Ws||t.userStopped||t.error)return;let e=H()||qn();t.conversationId&&t.conversationId!==e||ih()}),to?.abort(),to=new AbortController,Yn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:to.signal}),zi.debug("watch started")},stop(){Ws=!1,Fi?.(),Fi=null,to?.abort(),to=null;try{Wn?.close()}catch{}Wn=null}});var Md=`#bloom-pq-chip {
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

button.bloom-pq-ico:hover,
button.bloom-pq-ico:focus-visible {
    background: rgba(0, 0, 0, 0.08);
    color: #0d0d0d;
}

html.dark button.bloom-pq-ico:hover,
html.dark button.bloom-pq-ico:focus-visible {
    background: #3f3e3d;
    color: #f5f5f5;
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

.bloom-pq-placeholder {
    opacity: 0.35;
}

.bloom-pq-overlay {
    z-index: 10001;
    pointer-events: none;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.38);
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
    #bloom-pq-chip { transition: none; }
}
`;var Ne=new T("PromptQueue"),Vi="bloom-pq-chip",Cd="promptQueue",lh=8,ch=50,uh=2e3,dh='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',mh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,fh=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Ys=k({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),Ie=new Map,Ad=0,Vt=!1,Nt="",O="",Wt=!1,gt=!1,Pe=!1,D=null,eo=null,ji=null,He,ao,Re=null,C=null,Xn=null,Ui=!1,Zn=!0,K=!1,U=!1,dt=!1;function Oe(){return oe(At())}function Jn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function ph(t){let e=Jn($t(t));if(e)return e;if(!qt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),Jn(n.innerText||n.textContent||"")}catch{return""}}function Pd(){try{let t=document.querySelectorAll(dh),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Od(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Bd(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&mh.test(n))return!0}}catch{}return!1}function Ki(){let t=qn();if(!t)return!1;let e=H();return!e||e===t}function io(){if(Y()||Ki())return!1;let t=Pd();if(!t)return!0;if(Od(t)||Bd(t))return!1;try{if(t.querySelector(fh)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function gh(){if(G()||Qe())return K=!1,!1;if(Y()||Ki())return K=!0,!0;let t=Pd();return t&&(Od(t)||Bd(t))?(K=!0,!0):K&&!io()?!0:(K=!1,!1)}function Dd(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Dt);return n instanceof HTMLElement?n:null}function Hd(t){return Dd(t)??st()}function Wi(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function qd(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function bh(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?Jn(e.innerText||e.textContent||""):""}catch{return""}}function hh(){return Ad+=1,`pq${Date.now().toString(36)}${Ad.toString(36)}`}function nt(t){return Ie.get(t)??[]}function $d(t){return nt(t)[0]}function ln(t,e){e.length?Ie.set(t,e):Ie.delete(t)}function _d(t){if(!nt(t).length){U=!1,dt=!1,O="";return}U=!0,dt=!1,K=!0,O=""}function Id(t){if(!Nt||Nt===t)return;let e=Ie.get(Nt);!e?.length||Ie.has(t)||X(Nt,t)&&(Ie.delete(Nt),Ie.set(t,e),O===Nt&&(O=t),D?.key===Nt&&(D.key=t),Ne.debug("migrated pending",Nt,"\u2192",t))}function Yi(t){let e=Oe(),n=nt(e);if(Ys.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),ln(e,n)}else if(n.length>=lh){Ne.debug("queue full",e);return}else n.push({id:hh(),text:t,at:Date.now()}),ln(e,n);K=!0,D={key:e,text:t,turns:qd(),ticks:3};let r=st();r&&re(r,"");try{mt()}catch(o){Ne.error("chip",o)}Ne.debug("queued",e,n.length,t.length)}function Fd(t,e){let n=nt(t).filter(r=>r.id!==e);if(ln(t,n),C===e&&(C=null),!n.length)O===t&&(O=""),D?.key===t&&(D=null);else if(D?.key===t){let r=D.text;n.some(o=>o.text===r)||(D=null)}mt()}function zd(){Xn?.abort(),Xn=null,document.querySelectorAll(".bloom-pq-overlay").forEach(t=>t.remove()),document.body?.style.cursor==="grabbing"&&(document.body.style.cursor="")}function yh(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||C)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;Xn?.abort();let c=new AbortController;Xn=c;let{signal:u}=c,d=!1,m=null,y=0,g=0,p=!1,f=()=>{document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")};u.addEventListener("abort",()=>{if(m?.remove(),m=null,t.classList.remove("bloom-pq-placeholder"),f(),d){Ui=!0;let R=P=>{P.preventDefault(),P.stopPropagation()};window.addEventListener("click",R,!0),setTimeout(()=>{Ui=!1,window.removeEventListener("click",R,!0)},0)}p=!0});let h=R=>{if(p)return;let P=Xn===c;P&&(Xn=null);let q=d;if(c.abort(),!q||!R||!P||!t.isConnected)return;let A=nt(n).slice(),N=[...e.querySelectorAll(".bloom-pq-row")].map(fe=>fe.dataset.pqId||""),V=[];for(let fe of N){let b=A.find(M=>M.id===fe);b&&V.push(b)}V.length!==A.length||V.every((fe,b)=>fe.id===A[b]?.id)||(ln(n,V),mt())},v=R=>{if(R.pointerId!==a||p)return;if(!d){if(Math.hypot(R.clientX-s,R.clientY-l)<6)return;d=!0;let N=t.getBoundingClientRect();y=N.left,g=N.top,m=t.cloneNode(!0),m.classList.add("bloom-pq-overlay"),m.style.position="fixed",m.style.left=`${N.left}px`,m.style.top=`${N.top}px`,m.style.width=`${N.width}px`,m.style.margin="0",m.style.zIndex="10001",m.style.pointerEvents="none",document.body.append(m),t.classList.add("bloom-pq-placeholder"),document.body.style.cursor="grabbing"}m&&(m.style.left=`${y+(R.clientX-s)}px`,m.style.top=`${g+(R.clientY-l)}px`);let P=[...e.querySelectorAll(".bloom-pq-row")],q=P.length;for(let N=0;N<P.length;N++){let V=P[N].getBoundingClientRect();if(R.clientY<V.top+V.height/2){q=N;break}}let A=P.indexOf(t);q===A||q===A+1||e.insertBefore(t,P[q]??null)},I=R=>{R.pointerId===a&&h(!0)};window.addEventListener("pointermove",v,{signal:u}),window.addEventListener("pointerup",I,{signal:u}),window.addEventListener("pointercancel",I,{signal:u})})}function vh(){gt=!0,clearTimeout(ao),ao=setTimeout(()=>{gt=!1,ao=void 0},uh)}function xh(t){let e=Oe(),n=nt(e).find(a=>a.id===t);if(!n)return;let r=st();if(!r)return;let o=n.text;ln(e,nt(e).filter(a=>a.id!==t)),C===t&&(C=null),mt(),vh(),re(r,o);let i=we();i&&!j(i)&&!bi(i)&&(i.click(),gt=!1),_d(e)}function no(t){if(!Vt||Wt||U||Y()||Oe()!==t)return;let e=$d(t);if(!e){O="";return}if(zt())return;let n=st();if(!n)return;if(!Ee(n)){let o=Jn($t(n));if(o&&o!==e.text)return}let r=we();!r||j(r)||bi(r)||(Wt=!0,re(n,e.text),clearTimeout(He),He=setTimeout(()=>Eh(t,e.id,e.text),ch))}function Eh(t,e,n){He=void 0;try{if(!Vt||U)return;let r=$d(t);if(!r||r.id!==e||r.text!==n||Y()||Oe()!==t)return;let o=st();if(!o)return;let i=Jn($t(o));if(i&&i!==n&&!Ee(o))return;i!==n&&re(o,n);let a=we();if(!a||j(a)||bi(a))return;a.click(),ln(t,nt(t).filter(s=>s.id!==e)),mt(),_d(t),Ne.debug("drained",t,nt(t).length)}finally{Wt=!1}}function jd(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Ct(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Xs(){zd(),Re?.remove(),Re=null,C=null,Zn=!0}var Gd="http://www.w3.org/2000/svg";function wh(){let t=document.createElementNS(Gd,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function ro(t){let e=wh();for(let n of t){let r=document.createElementNS(Gd,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function oo(t,e,n,r,o){let i=document.createElement("button");return i.type="button",i.className="bloom-pq-ico",i.setAttribute("aria-label",t),i.append(e),r&&Th(i,r,o??t),i.addEventListener("mousedown",a=>a.preventDefault()),i.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),n()}),i}function Sh(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${Vi}`)}function Gi(){let t=Re?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function Lh(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function Ae(t,e){if(C!==t)return;if(C=null,e===null){mt();return}let n=Jn(e),r=Oe();if(!n){Fd(r,t);return}let o=nt(r).find(i=>i.id===t);o&&(o.text=n),mt()}function Nd(t){C!==t&&(C&&Ae(C,Gi()),nt(Oe()).some(e=>e.id===t)&&(C=t,Zn=!0,mt()))}function Th(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function mt(){if(zd(),!Vt||!document.body){Xs();return}let t=Oe(),e=nt(t);if(!e.length){Xs();return}C&&!e.some(d=>d.id===C)&&(C=null);let n=Re;n?.isConnected||(n=document.createElement("div"),n.id=Vi,document.body.appendChild(n),Re=n),n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",Zn?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Zn=!Zn,mt()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",Zn||(c.hidden=!0);let u=null;for(let d of e){let m=document.createElement("div");m.className="bloom-pq-row",m.dataset.pqId=d.id,m.setAttribute("aria-roledescription","sortable");let y=C===d.id,g=document.createElement("div");g.className="bloom-pq-body";let p;if(y){let h=document.createElement("textarea");h.className="bloom-pq-text bloom-pq-editing",h.value=d.text,h.rows=2,h.spellcheck=!1,h.setAttribute("aria-label","Queued message text"),h.addEventListener("keydown",v=>{v.stopPropagation(),v.key==="Enter"&&!v.shiftKey?(v.preventDefault(),Ae(d.id,h.value)):v.key==="Escape"&&(v.preventDefault(),Ae(d.id,null))}),h.addEventListener("blur",()=>Ae(d.id,h.value)),p=h,u=h}else{let h=document.createElement("span");h.className="bloom-pq-text line-clamp-2",h.textContent=d.text,h.addEventListener("click",v=>{if(Ui){Ui=!1,v.preventDefault(),v.stopPropagation();return}v.preventDefault(),v.stopPropagation(),Nd(d.id)}),p=h}g.append(p),m.append(g);let f=document.createElement("div");if(f.className="bloom-pq-rail",y){let h=oo("Save",ro(["M20 6 9 17l-5-5"]),()=>{Ae(d.id,p instanceof HTMLTextAreaElement?p.value:Gi())},l),v=oo("Cancel",ro(["M18 6 6 18","m6 6 12 12"]),()=>{Ae(d.id,null)},l);f.append(h,v)}else{let h=oo("Remove from queue",ro(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{C&&C!==d.id&&Ae(C,Gi()),C=C===d.id?null:C,Fd(t,d.id)},l),v=oo("Edit queued message",ro(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>Nd(d.id),l,"Edit"),I=oo("Send now",ro(["M12 19V5","M6 11 12 5l6 6"]),()=>{C&&C!==d.id&&Ae(C,Gi()),xh(d.id)},l);f.append(h,v,I)}m.append(f),y||yh(m,c,t,d.id),c.append(m)}if(n.append(o,c),jd(n),u){let d=u,m=C;queueMicrotask(()=>{C===m&&d.isConnected&&Lh(d)})}}function kh(){if(!D)return;D.ticks-=1;let t=nt(D.key);if(t.length&&qd()>D.turns){let e=bh();if(e&&e===D.text){Ne.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===D.text){n=r;break}n>=0&&t.splice(n,1),ln(D.key,t),!t.length&&O===D.key&&(O=""),D=null,mt();return}}D.ticks<=0&&(D=null)}function Xi(t){return!gh()||!qt(t)?"":ph(t)}function Mh(t){if(!Vt||t.isComposing||t.keyCode===229||t.key!=="Enter"||Sh(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||Wt)return;let e=Hd(t.target)??Hd(document.activeElement);if(!e)return;if(t.altKey||gt){gt=!1,Pe=!0,queueMicrotask(()=>{Pe=!1});return}let n=Xi(e);n&&(Wi(t),Yi(n))}function Ch(t){if(!Vt||Wt||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Pe){Pe=!1;return}if(gt){gt=!1;return}let e=Dd(t.target);if(!e)return;let n=Xi(e);n&&(Wi(t),Yi(n))}function Ah(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||j(e))return null;let n=t.closest(On);if(n instanceof HTMLElement&&!j(n))return n;let r=we();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Rd(t){if(!Vt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Vi}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&j(n)||Wt||!Ah(e))return;if(gt){gt=!1;return}let r=st();if(!r)return;let o=Xi(r);o&&(Wi(t),Yi(o))}function Hh(t){if(!Vt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(gi)&&!e.querySelector(Dt)||Wt)return;if(Pe){Pe=!1;return}if(gt){gt=!1;return}let n=st()??e.querySelector(Dt);if(!n)return;let r=Xi(n);r&&(Wi(t),Yi(r))}var Ud=x({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[E.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Cd,cleanupSelectors:[`#${Vi}`],settings:Ys,start(){Vt=!0;let t=Ys.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),Nt=Oe(),O="",Wt=!1,gt=!1,Pe=!1,D=null,K=!G()&&!Qe()&&(Y()||Ki()),U=!1,dt=!1,C=null,L(Cd,Md),eo?.abort(),eo=new AbortController;let{signal:e}=eo,n={capture:!0,signal:e};window.addEventListener("keydown",Mh,n),document.addEventListener("beforeinput",Ch,n),document.addEventListener("pointerdown",Rd,n),document.addEventListener("click",Rd,n),document.addEventListener("submit",Hh,n),ji?.(),ji=ct({onFall(r){if(Vt){if(r.userStopped||r.error){K=!1,U=!1,dt=!1,O="",mt();return}if(!(U&&!dt)){if(U&&dt){if(!io())return;U=!1,dt=!1,K=!1,O=r.contextKey,no(r.contextKey);return}if(!io()){Ne.debug("unsettled fall; keep queue window");return}K=!1,O=r.contextKey,no(r.contextKey)}}},onRise(){G()||Qe()||(U&&(dt=!0),K=!0)},onContext(r,o){o&&r&&!X(o,r)&&(K=!1,U=!1,dt=!1,O="",Wt=!1,He!==void 0&&(clearTimeout(He),He=void 0)),Id(r),Nt=r,mt()},onTick(r){Id(r.contextKey),Nt=r.contextKey,kh(),(G()||Qe())&&(U=!1,dt=!1,K=!1,O=""),U&&(Y()||Ki())&&(dt=!0),U&&dt&&io()&&(U=!1,dt=!1,K=!1,nt(r.contextKey).length&&(O=r.contextKey,no(r.contextKey))),!U&&K&&io()&&(K=!1,!O&&nt(r.contextKey).length&&(O=r.contextKey,no(r.contextKey))),!U&&O&&O===r.contextKey&&no(O),nt(r.contextKey).length&&!Re?.isConnected?mt():Re&&jd(Re)}}),mt(),Ne.debug("watch started")},stop(){Vt=!1,ji?.(),ji=null,eo?.abort(),eo=null,clearTimeout(He),He=void 0,clearTimeout(ao),ao=void 0,Ie.clear(),D=null,O="",Wt=!1,gt=!1,Pe=!1,K=!1,U=!1,dt=!1,Xs()}});var Kd=`.bloom-cls {
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
`;var Yd=new T("ChatListStatus"),Vd="chatListStatus",Qi="bloom-cls",Nh="bloom-cls",Rh=1200*1e3,Ph="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Rt=new Map,Yt=!1,Et="",ae=!1,er=!1,wt=0,Be=null,Qs=null,Qn=null,Zs=null,Zi=null,so=null,tr=!1,De=new Set;function Ji(){return Date.now()}function Xd(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function se(t,e,n,r=!0){if(!(!t||!Yt)){if(e==="idle")Rt.delete(t);else{let o=Rt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ji():Rt.set(t,{kind:e,at:Ji(),source:n})}r&&Oh({v:1,id:t,kind:e,at:Ji()}),cn()}}function Oh(t){try{Qn?.postMessage(t)}catch{}}function Bh(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||se(e.id,e.kind,"bc",!1)}function Dh(){let t=Ji();for(let[e,n]of Rt)n.kind==="streaming"&&t-n.at>Rh&&Rt.delete(e)}function qh(){let t=Xd();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Ph))continue;let o=ie(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Wd(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Js(t){let e=t.querySelector(`:scope > .${Qi}`);return e||null}function tl(){if(!Yt)return;Dh();let t=H(),e=qh();Be?.disconnect();try{for(let n of e){let r=ie(n.getAttribute("href")||"");if(!r||!t||r!==t){Js(n)?.remove();continue}let i=Rt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Js(n)?.remove();continue}let a=Js(n);a||(a=document.createElement("span"),a.className=Qi,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Wd("streaming")):i==="error"&&a.appendChild(Wd("error")))}}catch(n){Yd.debug("paint failed",n)}Zd()}function cn(){if(Yt){if(document.hidden){wt&&(cancelAnimationFrame(wt),wt=0),tl();return}wt||(wt=requestAnimationFrame(()=>{wt=0,Yt&&tl()}))}}function Zd(){let t=Xd();if(!(Be&&Qs===t&&t?.isConnected)){if(Be?.disconnect(),Qs=t,!t){Be=null;return}Be=new MutationObserver(()=>cn()),Be.observe(t,{childList:!0,subtree:!0})}}function ta(){return!!(We()||Fr())}function $h(t){return!!(tr||t&&De.has(t)||!er&&!G()&&ta())}function _h(t){if(Yt){if(t.type==="post-start"){er=!1,t.conversationId?(tr=!1,De.add(t.conversationId),ae=!0,se(t.conversationId,"streaming","net")):(tr=!0,ae=!0);return}if(t.type==="post-end"){if(tr=!1,t.conversationId){De.delete(t.conversationId);let e=H(),n=qn();(e?t.conversationId===e:t.conversationId===n)?se(t.conversationId,t.error?"error":"done","net"):se(t.conversationId,"idle","net")}ta()||(ae=!1)}}}function Fh(t,e){if(!Yt)return;if(X(e,t)){cn();return}let n=H();if(Et&&Et!==n){De.delete(Et);let r=Rt.get(Et);r&&r.kind!=="idle"&&se(Et,"idle","local")}tr=!1,ae=!1,er=!0,n&&Rt.get(n)?.kind==="streaming"&&Rt.get(n)?.source==="local"&&!De.has(n)&&se(n,"idle","local"),cn()}function zh(t){if(!Yt)return;let e=t.conversationId||H();if(Et&&e&&Et!==e){De.delete(Et);let r=Rt.get(Et);r&&r.kind!=="idle"&&se(Et,"idle","local"),ae=!!(e&&De.has(e))}if(e&&(Et=e),er||G()){if(G()||ta()||t.streaming){cn();return}er=!1}if($h(e)&&(t.streaming||ta())){ae=!0,e&&se(e,"streaming","local"),cn();return}ae&&(ae=!1,e&&se(e,zt()?"error":"done","local")),cn()}var Jd=x({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Qi}`],start(){Yt=!0,L(Vd,Kd);try{Qn=new BroadcastChannel(Nh)}catch{Qn=null}Qn?.addEventListener("message",Bh),Zs=ht(_h),Zi?.(),Zi=ct({onTick:zh,onContext:Fh}),so?.abort(),so=new AbortController,document.addEventListener("visibilitychange",()=>{Yt&&(wt&&(cancelAnimationFrame(wt),wt=0),tl())},{signal:so.signal}),Zd(),Yd.debug("sidebar status watch started")},stop(){Yt=!1,wt&&cancelAnimationFrame(wt),wt=0,so?.abort(),so=null,Be?.disconnect(),Be=null,Qs=null,Zi?.(),Zi=null,Zs?.(),Zs=null;try{Qn?.close()}catch{}Qn=null,Rt.clear(),De.clear(),tr=!1,ae=!1,er=!1,Et="",document.querySelectorAll(`.${Qi}`).forEach(t=>t.remove()),S(Vd)}});var tm="widerChat",em=40,nm=96,rm=64,om=k({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:em,max:nm,default:rm}});function jh(){return at(Number(om.store.width??rm),em,nm)}function Qd(){let t=jh(),e=`min(100%,${t}rem)`;L(tm,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var im=x({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[E.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:om,start:Qd,onSettingsChange:Qd,stop(){S(tm)}});var el="composerOpacity",nr='form[data-type="unified-composer"],form.w-full[data-type]',Gh=[`${nr} [class*="corner-superellipse"]`,`${nr} [class*="bg-token-bg-primary"]`,`${nr} [class*="bg-token-main-surface"]`].join(","),Uh=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Kh="#thread-bottom-container,#thread-bottom",Vh=`${nr} #prompt-textarea,${nr} [contenteditable="true"]`,Wh="var(--bg-primary,var(--main-surface-primary,#ffffff))",nl=k({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Yh(){return at(Number(nl.store.opacity??100),0,100)}function Xh(){return at(Number(nl.store.blur??16),0,40)}function am(){let t=Yh();if(t>=100){S(el);return}let e=Xh(),n=`color-mix(in srgb,${Wh} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";L(el,`${Kh}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Uh}{display:none!important}${nr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Gh}{background-color:${n}!important;background-image:none!important;${r}}${Vh}{background-color:transparent!important;background-image:none!important}`)}var sm=x({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[E.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:nl,start:am,onSettingsChange:am,stop(){S(el)}});var lm=`#bloom-bn-host {
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
`;var Jh=new T("BetterNavigator"),rl="betterNavigator",mm="bloom-bn-host",pn=60,Qh=16,t0=1e3,e0=2.5,n0=.4,ra="\u6B63\u5728\u8F93\u51FA\u2026",sl="Image",r0="\u2753",o0="\u{1F916}",cm=/file_[0-9a-f]+/gi,i0="File",a0="Code",s0=".markdown, .whitespace-pre-wrap",fl=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),l0="img, picture, video, canvas",c0=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,u0=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,po=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,d0=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,m0=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,f0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,p0=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,g0=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,b0=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,h0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),y0=2e3,v0=40,x0=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,E0=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),w0=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),S0=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),L0=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),da=k({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),or=new Map,fo=new Map,Zt=new Set,oa=0,Pt=!1,ce=!1,rr=!1,qe=null,go=null,mn=null,ia=null,rt=[],fn="",aa=0,sa=-1,pl=0,la="",St=0,le=0,lo,co=null,ea=null,ol=null,il=null,un=null,ll=null,uo=null,dn=null,ir=null,mo=null;function ma(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function al(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function T0(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function k0(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)x0.test(T0(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=al(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||al(getComputedStyle(t).getPropertyValue("--thread-content-width"))||al(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function ca(t){try{return!!t.closest(w0)}catch{return!0}}function um(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function fa(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function gl(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function M0(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function na(t,e){if(t){cm.lastIndex=0;for(let n of t.matchAll(cm))e.add(n[0].toLowerCase())}}function C0(t){try{let e=new Set,n=s=>{M0(s)||(na(s.getAttribute("src")||"",e),na(s.getAttribute("srcset")||"",e),na(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&na(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=fa(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function A0(t,e){let n=C0(t),r=fo.get(e)??0,o=Math.max(r,n);return o>0&&fo.set(e,o),o>=2?`${sl} x${o}`:sl}function Z(t){return t.replace(/\s+/g," ").trim()}function fm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(S0))return!0;n=n.parentElement}return!1}function ua(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(fm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(fl);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return Z(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<pn+20;)e.push(Z(r.textContent||""));return Z(e.join(" "))}function bo(t){let e=Z(t);return e.length<3||e.length>180||po.test(e)?!1:c0.test(e)?!0:u0.test(e)}function pa(t){let e=Z(t);return e.length<8||e.length>120||/\s/.test(e)||po.test(e)||bo(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function H0(t){let e=[],n=i=>{let a=Z(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(Z(s[1])),e.push(Z(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function I0(t){try{return ca(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function bl(t){let e=Z(t);return!e||hl(e)||pa(e)?!0:bo(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function N0(t){return!t.length||t.length>4||!t.every(e=>bl(e))?!1:t.some(e=>po.test(Z(e))||bo(e)||pa(e))}function pm(t){try{let e=null,n=0,r=`${fl}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(I0(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=H0(o);if(!i.length||i.length>4||i.join(" ").length>240||!N0(i))continue;let a=i.some(c=>po.test(Z(c))),s=i.some(c=>bo(c)||pa(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function R0(t){return pm(t)?i0:""}function P0(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(d0.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function O0(t){try{for(let e of t.querySelectorAll(l0))if(!P0(e))return!0}catch{}return!1}function hl(t){let e=Z(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||p0.test(e)||f0.test(e)?!0:e.length<=24&&(g0.test(e)||po.test(e))}function B0(t){let e=[],n=new Set,r=o=>{try{if(fm(o,t)||o.closest(fl))return}catch{return}let i=ua(o);!i||n.has(i)||hl(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>pn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(ua(o).length<24)&&(r(o),e.join(" ").length>pn+20))break}}catch{}return Z(e.join(" "))}function D0(t){let e=pm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=Z(i.innerText||i.textContent||"");!a||a.length>pn+20||r.has(a)||bl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return Z(n.join(" "))}function q0(t,e){let n=[];try{for(let o of t.querySelectorAll(s0)){if(ca(o))continue;let i=ua(o);if(!(!i||e==="assistant"&&hl(i)||bl(i))&&(n.push(i),n.join(" ").length>pn+20))break}}catch{}let r=Z(n.join(" "));if(e==="user"){let o=D0(t);if(o)return o}return r||(e==="assistant"?B0(t):"")}function $0(t){return t.length>pn?`${t.slice(0,pn).trimEnd()}\u2026`:t}function dm(t){return b0.test(t)}function _0(t,e,n,r){let o=q0(t,e);if(o)return $0(o);if(r)return ra;let i=R0(t);if(i)return i;if(gl(t))return A0(t,fa(t));try{if(O0(t))return sl;if(t.querySelector("pre, code"))return a0}catch{}return`Message ${n+1}`}function F0(){if(ce)return!0;let t=H();return!!(t&&Zt.has(t)||!rr&&!G()&&ho())}function ho(){return!!(We()||Fr())}function z0(){oa=Date.now()}function gm(t){ce=!1,t&&Zt.delete(t);let e=H();e&&Zt.delete(e)}function j0(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function G0(t){if(gl(t)||!ho())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!ua(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function yl(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=Z(e.textContent||"");if(!(n.length>32)&&m0.test(n))return!0}}catch{}return!1}function bm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function U0(t,e){try{if(j0(t))return!0;if(!e)return!1;if(G0(t)||yl(t))return!0}catch{}return!1}function hm(t){if(!t||ho())return!1;try{if(yl(t)||bm(t))return!1;if(t.querySelector(h0)||gl(t))return!0}catch{}return!1}function K0(t){if(ho()||oa&&Date.now()-oa<y0)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!hm(e.el)||gm()}function V0(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(E0)){if(ca(r))continue;let i=fa(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(ca(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function W0(){let t=ma();if(!t||t===document.body)return[];let e=da.store.showAssistant!==!1,n=e&&F0(),r=V0(t),o=null;if(e)for(let a of r)um(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=fa(a);if(!s)continue;let l=um(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&yl(a),d=c&&bm(a),m=l==="assistant"&&c&&!hm(a)&&(u||d||n||U0(a,!0)),y=_0(a,l,i.length,m);if(y&&y!==ra){let p=or.get(s),f=!!p&&(bo(p)||pa(p));(!p||f||!dm(y)||dm(p))&&y!==p&&or.set(s,y)}let g=m&&y===ra?ra:or.get(s)||y;i.push({id:s,el:a,role:l,text:g,live:m})}}catch{}return K0(i),i}function Y0(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function ym(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function X0(t){return t===window?window.innerHeight:t.clientHeight}function Z0(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(L0)}catch{return!1}}function vm(){lo!==void 0&&(clearTimeout(lo),lo=void 0),co?.classList.remove("bloom-bn-flash"),co=null}function J0(t){vm(),t.classList.add("bloom-bn-flash"),co=t,lo=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),co===t&&(co=null),lo=void 0},800)}function cl(t){if(!rt.length)return;let e=Math.max(0,Math.min(t,rt.length-1));aa=e,go?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),mn?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),ia&&(ia.textContent=`${e+1} / ${rt.length}`);let n=mn?.children[e];if(n instanceof HTMLElement){let r=mn;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function ul(t){let e=rt[t];if(!e?.el.isConnected)return;sa=t,pl=Date.now()+t0,cl(t);let n=ir??ym(e.el),o=Math.abs(e.el.getBoundingClientRect().top-Y0())>e0*X0(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),da.store.jumpEffect!=="none"&&J0(e.el)}function vl(){if(!Pt||!rt.length)return;if(Date.now()<pl&&sa>=0){cl(sa);return}let t=window.innerHeight*n0,e=0;for(let n=0;n<rt.length;n++){let r=rt[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}cl(e)}function Q0(t){let e=ym(t);if(ir===e&&mo)return;mo?.(),ir=e;let n=e===window?document:e,r=()=>{vl(),xl()};n.addEventListener("scroll",r,{passive:!0}),mo=()=>n.removeEventListener("scroll",r)}function ty(t){dn?.disconnect(),dn=null;let e=ir instanceof HTMLElement?ir:null;dn=new IntersectionObserver(()=>vl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&dn.observe(n.el)}function ey(){if(!document.body)return null;let t=qe;if(t?.isConnected)return t;t=document.createElement("div"),t.id=mm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),qe=t,go=e,mn=i,ia=o,t}function xm(){let t=qe,e=ma();if(!t||!e||!e.isConnected||rt.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=k0(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||v0,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let m=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${m}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function xl(){!Pt||le||(le=requestAnimationFrame(()=>{le=0,Pt&&xm()}))}function ny(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function ry(t){let e=go,n=mn;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Qh),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=ny(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),ul(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?r0:o0;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),ul(o)}),n.appendChild(a)}))}function oy(t){go?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=mn?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function iy(){let t=H();return t===la?!1:(la=t,or.clear(),fo.clear(),rt=[],fn="",aa=0,sa=-1,pl=0,ce&&t&&(Zt.add(t),ce=!1),!0)}function ay(t){let e=da.store.showAssistant!==!1?"1":"0";return`${la}|${e}|${t.map(n=>n.id).join(",")}`}function dl(){if(!Pt)return;iy();let t=W0(),e=ma();if(!e||t.length<1){rt=t,fn="",qe&&(qe.hidden=!0),dn?.disconnect(),ml();return}ey();let n=ay(t);n!==fn?(rt=t,fn=n,ry(t),Q0(e),ty(t)):(rt=t,oy(t)),xm(),vl(),ml()}function Xt(){if(Pt){if(document.hidden){St&&(cancelAnimationFrame(St),St=0),dl();return}St||(St=requestAnimationFrame(()=>{St=0,Pt&&dl()}))}}function ml(){let t=ma();if(!(un&&ll===t&&t?.isConnected)){if(un?.disconnect(),uo?.disconnect(),ll=t,!t||t===document.body){un=null;return}un=new MutationObserver(()=>Xt()),un.observe(t,{childList:!0,subtree:!0}),uo=new ResizeObserver(()=>xl()),uo.observe(t)}}function sy(t){if(Pt){if(t.type==="post-start"){z0(),rr=!1,t.conversationId?(ce=!1,Zt.add(t.conversationId)):ce=!0,Xt();return}if(t.type==="post-end"){if(ce=!1,t.conversationId)Zt.delete(t.conversationId);else{let e=H();e&&Zt.delete(e)}Xt()}}}function ly(t){if(!Pt||!rt.length||qe?.hidden||t.altKey||t.ctrlKey||t.metaKey||Z0(t.target))return;let e=-1;if(t.key==="ArrowDown")e=aa+1;else if(t.key==="ArrowUp")e=aa-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=rt.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),ul(Math.max(0,Math.min(e,rt.length-1)))}function cy(){vm(),dn?.disconnect(),dn=null,un?.disconnect(),un=null,ll=null,uo?.disconnect(),uo=null,mo?.(),mo=null,ir=null,qe?.remove(),qe=null,go=null,mn=null,ia=null}var Em=x({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:rl,cleanupSelectors:[`#${mm}`],settings:da,start(){Pt=!0,la=H(),L(rl,lm),ea=new AbortController;let{signal:t}=ea;window.addEventListener("keydown",ly,{signal:t}),window.addEventListener("popstate",Xt,{signal:t}),window.visualViewport?.addEventListener("resize",xl,{signal:t}),document.addEventListener("visibilitychange",()=>{Pt&&(St&&(cancelAnimationFrame(St),St=0),le&&(cancelAnimationFrame(le),le=0),dl())},{signal:t}),il=ht(sy),ol=ct({onTick(){if(G()){Xt();return}rr&&!ho()&&(rr=!1),Xt()},onFall(e){gm(e.conversationId),Xt()},onContext(e,n){if(!X(n,e)){or.clear(),fo.clear(),fn="",ce=!1;let r=H();for(let o of[...Zt])o!==r&&Zt.delete(o);rr=!0}Xt()}}),ml(),Xt(),Jh.debug("navigator started")},stop(){Pt=!1,St&&cancelAnimationFrame(St),St=0,le&&cancelAnimationFrame(le),le=0,ea?.abort(),ea=null,ol?.(),ol=null,il?.(),il=null,Zt.clear(),ce=!1,rr=!1,oa=0,cy(),or.clear(),fo.clear(),rt=[],fn="",S(rl)},onSettingsChange(){fn="",Xt()}});var wm=`.bloom-ts {
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
`;function Sm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Lm(t){try{return new Date(t).toISOString()}catch{return""}}var Mm=new T("MessageTimestamps"),Tm="messageTimestamps",ba="bloom-ts",km=1500,dy="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",ar=k({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),sr=new Map,hn=!1,Lt=0,$e=null,wl=null,El=null,ga=null,yo=null,vo=!1,gn=!1;function Cm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Ll(){let t=ar.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Am(){let t={...Ll()};for(let[n,r]of sr)t[n]=r;let e=Object.keys(t);if(e.length>km){let n=e.slice(e.length-km),r={};for(let o of n)r[o]=t[o];ar.store.stamps=r;return}ar.store.stamps=t}var my=lc(Am,500);function Hm(t,e){!t||!e||sr.get(t)===e||(sr.set(t,e),my(),bn())}function fy(t){return t?sr.get(t)??Ll()[t]??Ei(t)??null:null}function py(t){hn&&t.type==="message-time"&&Hm(t.messageId,t.createTime)}function gy(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function by(){let t=Cm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(dy)||e.push(n)}catch{}return e}function hy(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Sl(){if(!hn)return;let t=ar.store.hideOwnMessages===!0,e=ar.store.showDate!==!1,n=Y();gn&&!G()&&(gn=!1),gn&&(n?vo=!1:gn=!1);let r=gn?!1:n,o=by();$e?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=gy(i),c=i.querySelector(`:scope > .${ba}`);if(t&&l==="user"){c?.remove();return}if(hy(i)){c?.remove();return}let u=fy(s);if(!u&&s&&(r||vo)&&a>=o.length-2&&(u=Date.now(),Hm(s,u)),!u){c?.remove();return}let d=Sm(u,e);if(!d){c?.remove();return}let m=c;m||(m=document.createElement("time"),m.className=ba,m.setAttribute("aria-hidden","true"),i.insertBefore(m,i.firstChild)),m.textContent!==d&&(m.textContent=d);let y=Lm(u);y&&m.getAttribute("datetime")!==y&&m.setAttribute("datetime",y)})}catch(i){Mm.debug("paint failed",i)}vo=r,Im()}function bn(){if(hn){if(document.hidden){Lt&&(cancelAnimationFrame(Lt),Lt=0),Sl();return}Lt||(Lt=requestAnimationFrame(()=>{Lt=0,hn&&Sl()}))}}function Im(){let t=Cm();if(!($e&&wl===t&&t?.isConnected)){if($e?.disconnect(),wl=t,!t||t===document.body){$e=null;return}$e=new MutationObserver(()=>bn()),$e.observe(t,{childList:!0,subtree:!0})}}var Nm=x({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[E.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ba}`],settings:ar,start(){hn=!0,L(Tm,wm);let t=Ll();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&sr.set(e,n);El=ht(py),ga?.(),ga=ct({onTick:bn,onFall:bn,onContext(e,n){X(n,e)||(gn=!0,vo=!1),bn()}}),yo?.abort(),yo=new AbortController,document.addEventListener("visibilitychange",()=>{hn&&(Lt&&(cancelAnimationFrame(Lt),Lt=0),Sl())},{signal:yo.signal}),Im(),bn(),Mm.debug("timestamp watch started")},stop(){hn=!1,Lt&&cancelAnimationFrame(Lt),Lt=0,yo?.abort(),yo=null,$e?.disconnect(),$e=null,wl=null,ga?.(),ga=null,El?.(),El=null,gn=!1,vo=!1,Am(),sr.clear(),document.querySelectorAll(`.${ba}`).forEach(t=>t.remove()),S(Tm)},onSettingsChange:bn});var Tl="streamerMode",yy="filter:blur(6px)!important;transition:filter .2s ease",vy="filter:none!important",lr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],cr=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function Tt(t,e){return t.map(n=>`${n} ${e}`)}var yn=k({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function ur(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${yy}}${e?`${r}{${vy}}`:""}`}function Rm(){let t=[];if(yn.store.conversations!==!1&&(t.push(ur([...Tt(cr,'a[href^="/c/"]'),...Tt(cr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),yn.store.projects!==!1&&(t.push(ur([...Tt(cr,'a[href*="/project"]'),...Tt(cr,'a[href*="/g/g-p-"]'),...Tt(cr,'[data-testid="project-name"]'),...Tt(cr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),yn.store.headerTitle!==!1&&t.push(ur(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),yn.store.accountAvatar!==!1&&t.push(ur([...Tt(lr,"img"),...Tt(lr,'[class*="avatar"]'),...Tt(lr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),yn.store.accountName!==!1&&t.push(ur([...Tt(lr,".min-w-0 > .truncate"),...Tt(lr,".min-w-0.flex-1 .truncate")],!1)),yn.store.accountEmail!==!1&&t.push(ur([...Tt(lr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){S(Tl);return}L(Tl,t.join(`
`))}var Pm=x({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[E.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:yn,start:Rm,onSettingsChange:Rm,stop(){S(Tl)}});var Om=`.bloom-gc-panel {
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
}`;var Ey=new T("GreetingCustomizer"),dr="greetingCustomizer",Bm="greetingCustomizerUi",xo=100,Ml=30,wy=120,Sy=1e3,Ly=50,Ty=40,ky=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Eo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ea=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function My(t){return!!t?.closest(ky)}function _m(t){return!!(My(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Co(t){try{for(let e of document.querySelectorAll(t))if(!_m(e))return e}catch{}return null}function kl(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Co(e))return e;return t}var Fm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],ot=k({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:jy},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Fm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Jt=!1,pr=!1,xn=null,ya,wo,mr,So,va=0,ha=null,fr=null,Lo=null,To=null,ko=null,xa=null;function de(){let t=location.pathname||"/";return t==="/"||t===""}function vn(){let t=ot.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Fm.slice()}function Mo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Dm(t){ot.store.greetings=t.slice(0,Ml)}function Ao(){let t=String(ot.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Cy(){return ot.store.order==="random"?"random":"sequential"}function Ay(){return at(Number(ot.store.intervalSec??10),1,3600)*1e3}function Hy(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Iy(){return!!Co(Ea)}function wa(){return!!(Co(Ea)||Co(Eo))}function Ny(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Iy()?kl(Ea):Co(Eo)?kl(Eo):kl(Ea),i=e?`${Eo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Ry(t,e){if(t<=0)return 0;if(t===1)return Number(ot.plain.index)!==0&&(ot.store.index=0),Number(ot.plain.lastRandom)!==0&&(ot.store.lastRandom=0),0;let n=Number(ot.plain.index),r=Number(ot.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Cy()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return ot.store.index=s,ot.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return ot.store.index=i,i}function ue(t){if(!Jt)return;if(!de()){S(dr);return}let e=vn().map(Mo).filter(Boolean);if(!e.length){S(dr);return}let n=Ry(e.length,t),r=e[n]??e[0],o=Ao()==="manual"&&e.length>1;L(dr,Ny(Hy(r),o)),xa?.()}function Cl(){ya!==void 0&&(clearInterval(ya),ya=void 0)}function Al(){Cl(),!(!Jt||!de())&&Ao()==="interval"&&(vn().filter(Boolean).length<=1||(ya=setInterval(()=>ue(!0),Ay())))}function Hl(){So!==void 0&&(clearTimeout(So),So=void 0),va=0}function qm(){if(Hl(),!Jt||!de())return;va=Ty;let t=()=>{if(So=void 0,!(!Jt||!de())){if(wa()){Ao()==="refresh"&&!pr?(pr=!0,ue(!0)):ue(!1),Al();return}va-=1,va>0&&(So=setTimeout(t,Ly))}};t()}function Il(){if(xn===!0){wa()?ue(!1):qm();return}xn=!0,pr=!1,Ao()==="refresh"?(pr=!0,ue(!0)):ue(!1),Al(),wa()||qm()}function Nl(){xn=!1,pr=!1,Cl(),Hl(),S(dr)}function Sa(){mr===void 0&&(mr=window.setTimeout(()=>{mr=void 0,Jt&&(de()?Il():xn!==!1&&Nl())},wy))}function Py(){fr||(fr=history.pushState.bind(history),Lo=history.replaceState.bind(history),To=function(...e){let n=fr(...e);return Sa(),n},ko=function(...e){let n=Lo(...e);return Sa(),n},history.pushState=To,history.replaceState=ko)}function Oy(){To&&history.pushState===To&&fr&&(history.pushState=fr),ko&&history.replaceState===ko&&Lo&&(history.replaceState=Lo),fr=null,Lo=null,To=null,ko=null}function By(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Sa)}function Dy(t){if(!Jt||!de()||Ao()!=="manual"||vn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Eo);if(!n||_m(n))return;let r=window.getSelection?.();r&&String(r).trim()||ue(!0)}function qy(){wo===void 0&&(wo=setInterval(()=>{if(!Jt)return;let t=de();if(t!==(xn===!0)){t?Il():Nl();return}t&&wa()&&ue(!1)},Sy))}function $y(){wo!==void 0&&(clearInterval(wo),wo=void 0)}function $m(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var _y="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Fy="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function zy(t,e){let n=Mo(t);return n?n.length>xo?`Keep it to ${xo} characters.`:vn().length+(e?1:0)>Ml?`At most ${Ml} greetings.`:null:"Enter a greeting."}function jy(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=vn(),s=Number(ot.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=xo,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let f=l.querySelector(".bloom-gc-count");f&&(f.textContent=`${Mo(e).length}/${xo}`);let h=l.querySelector(".bloom-gc-error");h&&(h.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Mo(e).length}/${xo}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=r;let y=document.createElement("div");if(y.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,e="",r="",i()}),y.appendChild(f)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let f=n<0,h=zy(e,f);if(h){r=h,i();return}let v=Mo(e),I=vn().slice();n>=0&&n<I.length?I[n]=v:I.push(v),Dm(I),n=-1,e="",r="",i()}),y.appendChild(g),u.append(d,m,y),l.appendChild(u),t.appendChild(l),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",t.appendChild(f);return}let p=document.createElement("div");p.className="bloom-gc-list",a.forEach((f,h)=>{let v=document.createElement("div");v.className="bloom-gc-item",h===s&&(v.dataset.active="true");let I=document.createElement("button");I.type="button",I.className=`bloom-gc-body${o===h?"":" bloom-gc-clamp"}`,I.textContent=f,I.addEventListener("click",()=>{o=o===h?-1:h,i()});let R=document.createElement("div");R.className="bloom-gc-item-actions";let P=$m("Edit",_y);P.addEventListener("click",()=>{n=h,e=f,r="",i()});let q=$m("Delete",Fy);q.addEventListener("click",()=>{let A=vn().filter((N,V)=>V!==h);Dm(A),n===h?(n=-1,e=""):n>h&&(n-=1),i()}),R.append(P,q),v.append(I,R),p.appendChild(v)}),t.appendChild(p)};return xa=i,i(),()=>{xa===i&&(xa=null),t.replaceChildren()}}var zm=x({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[E.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Bm,settings:ot,start(){Jt=!0,L(Bm,Om),Py(),ha=new AbortController;let{signal:t}=ha;window.addEventListener("popstate",Sa,{signal:t}),document.addEventListener("click",By,{capture:!0,signal:t}),document.addEventListener("click",Dy,{signal:t}),qy(),xn=null,de()?Il():Nl(),Ey.debug("started")},stop(){Jt=!1,ha?.abort(),ha=null,mr!==void 0&&(clearTimeout(mr),mr=void 0),Cl(),Hl(),$y(),Oy(),S(dr),pr=!1,xn=null},onSettingsChange(){Jt&&(de()?(ue(!1),Al()):S(dr))}});function Gy(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function La(t){try{return await createImageBitmap(t)}catch{return null}}async function Uy(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Ta(t){if(t.startsWith("data:")){let e=Gy(t);if(e){let n=await La(e);if(n)return n}return Uy(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?La(await e.blob()):null}catch{return null}}var Ma="data-bloom-csi-slot",Ky="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Vy=/\bsize-(?:[6-9]|10)\b/,Wy=/\b(?:h|w)-(?:[6-9]|10)\b/,Yy=/^(plus|pro|free|team|go|business|enterprise)$/i,Xy=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function ka(t){return t.getAttribute("class")||""}function Gm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Vy.test(t)?!0:Wy.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Zy(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Um(e)}function Um(t){return Yy.test(String(t??"").replace(/\s+/g,""))}function Qt(t){return!!t?.closest(Ky)}function Ca(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Ho(t){let e=ka(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Um(t.textContent||"")}function Aa(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Io(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Jy(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Km(t){if(Qt(t)||Aa(t)||Io(t)||Ho(t)||Ca(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Vm(t){return Qt(t)||Aa(t)||Io(t)||Ho(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Zy(t.textContent||"")}function Wm(t){return Qt(t)||Io(t)||Ca(t)||Ho(t)?!1:Gm(ka(t))||Vm(t)?!0:Km(t)}function jm(t){return!(Qt(t)||Ca(t)||Io(t)||Ho(t)||Aa(t))}function En(t,e){let n=Aa(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Io(n)||Ca(n)||Ho(n));)Qt(n)||(r=n),n=n.parentElement;return r}function Qy(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Qt(e))continue;if(Jy(ka(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!jm(o))){if(Wm(o)||Gm(ka(o)))return En(o,t)??o;r.push(o)}if(r.length===1)return En(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&jm(r))return En(r,t)??r}}return null}function tv(t){let e=t.querySelectorAll(Xy);for(let n of e)if(Wm(n))return En(n,t)??n;return null}function ev(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Vm(e))return En(e,t)??e;return null}function nv(t){for(let e of t.querySelectorAll("*"))if(Km(e))return En(e,t)??e;return null}function Ym(t,e){if(Qt(t))return null;if(e&&!Qt(e)&&t.contains(e)){let n=En(e,t);if(n)return n}return Qy(t)??tv(t)??ev(t)??nv(t)}function Xm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var gr="data-bloom-csi",Ha="data-bloom-csi-orig",wn=new Set,Zm=null;function Pl(t){Zm=t}function Jm(t){return`url(${JSON.stringify(t)})`}function Ia(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Ol(t,e,n){let r=Jm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Qm(t,e=Ma){let n=Jm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function rv(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function br(t){t.removeEventListener("error",Rl);let e=t.getAttribute(Ha);t.removeAttribute(gr),t.removeAttribute(Ha),e&&t.getAttribute("src")!==e&&(t.src=e)}function Rl(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&wn.add(n),br(e),Zm?.()}function tf(t,e){if(!e||wn.has(e)){br(t);return}rv(t);let n=t.getAttribute("src")??"";if(t.getAttribute(gr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Ha)&&t.setAttribute(Ha,n);t.setAttribute(gr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Rl),t.addEventListener("error",Rl),n!==e&&(t.src=e)}var ef=`/*
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
`;var nf=new T("CustomSidebarIdentity"),rf="customSidebarIdentityUi",sf="customSidebarIdentity",iv="bloom-csi-face",av="bloom-csi-name",hr=Ma,sv=1024,Na=256,lf=24,cf=64,uf=40,$l=1,_l=4,No=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Bl=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],w=k({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Tv},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:lf,max:cf,default:uf},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Ln(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function lv(){return String(w.store.displayName??"").trim()}function Oa(t,e,n,r,o){let i=at(n,$l,_l),a=Math.min(t,e)/i,s=at(r,a/2,Math.max(a/2,t-a/2)),l=at(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function cv(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Fl(t){let e=Math.min(1,sv/Math.max(t.width,t.height));return cv(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function uv(t,e,n,r){let{side:o,x:i,y:a}=Oa(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Na,s.height=Na;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,Na,Na);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function dv(t){let e=await La(t);if(!e)return null;let n=Fl(e);return e.close(),n}async function jl(t,e,n,r){let o=await Ta(t);if(!o)return null;let i=uv(o,e,n,r);return o.close(),i}function Gl(){w.store.cropX=.5,w.store.cropY=.5,w.store.cropZoom=1}function of(){w.store.avatarUrl="",w.store.avatarSource="",Gl()}var af=0;async function zl(t){let e=++af;Gl(),w.store.avatarSource=t;let n=await jl(t,.5,.5,1);return e!==af?!1:(n&&(w.store.avatarUrl=n),!!n)}function Ro(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Dl(t){let e=Ro(t);if(!e)return!1;let n=await dv(e);return n?zl(n):!1}var kt=!1,yr=!1,vr=0,Ba=0,Ra=null,_e=new Map,xr=null,me=null,Da=null,te=null,qa=null;function $a(t){let e=String(t??"").trim();if(!e||wn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function df(){return $a(w.store.avatarUrl)??$a(w.store.avatarSource)}var Pa=!1,ql=new Set;function mf(){let t=$a(w.store.avatarSource);if(!t?.startsWith("data:image/")||$a(w.store.avatarUrl)?.startsWith("data:image/")||Pa||ql.has(t))return;Pa=!0;let e=Ln(w.store.cropX,.5),n=Ln(w.store.cropY,.5),r=Ln(w.store.cropZoom,1);jl(t,e,n,r).then(o=>{if(Pa=!1,!o){ql.add(t);return}kt&&(w.store.avatarUrl=o,_a())}).catch(()=>{Pa=!1,ql.add(t)})}function Sn(t,e){return t.map(n=>`${n} ${e}`)}function mv(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function fv(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=mv(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function ff(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Qt(n)||n.closest(".min-w-0")||e.push(n);return e}function pv(t){let e=ff(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Ul(){let t=[],e=Ge();e&&t.push(e);let n=In();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(No.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function pf(t,e){let n=pv(t);if(n)tf(n,e);else for(let o of ff(t))br(o);let r=Ym(t,n);for(let o of t.querySelectorAll(`[${hr}]`))o!==r&&o.removeAttribute(hr);r&&r.setAttribute(hr,"")}function gv(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function bv(t,e){let n=gv(t);n&&pf(n,e)}function hv(){for(let t of document.querySelectorAll(`img[${gr}]`))br(t);for(let t of document.querySelectorAll(`[${hr}]`))t.removeAttribute(hr)}function yv(){let t=at(Math.round(Ln(w.store.avatarSize,uf)),lf,cf),e=df(),n=lv(),r=w.store.applyToMenu!==!1,o=[],i=[...Sn(No,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Sn(Bl,"> :first-child img"));let a=[...Sn(No,".min-w-0 > .truncate"),...Sn(No,".min-w-0.flex-1 .truncate")];r&&a.push(...Sn(Bl,"> :first-child .truncate"));let s=Xm(hr);o.push(Ia([...s.flatMap(l=>Sn(No,l))].join(","),t)),o.push(Ia(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(Ia(s.flatMap(l=>Sn(Bl,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Ol(i.join(","),e,t)),o.push(Ol("#stage-sidebar-tiny-bar img",e,32)),o.push(Qm(e))),n&&o.push(fv(a,n)),L(sf,o.join(""))}function vv(){let t=df(),e=Ul();for(let n of e)pf(n,t);if(w.store.applyToMenu!==!1){let n=Nn();n&&bv(n,t)}for(let n of document.querySelectorAll(`img[${gr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||br(n)}function _a(){if(!(!kt||yr)){yr=!0;for(let t of _e.values())t.disconnect();me?.disconnect(),te?.disconnect();try{yv(),vv()}finally{yr=!1,Kl(),Sv(),xr?.isConnected&&gf(xr),mf()}}}function Po(){!kt||vr||(vr=requestAnimationFrame(()=>{vr=0,_a()}))}function xv(){yr||!kt||Po()}function Ev(t){if(_e.has(t))return;let e=new MutationObserver(xv);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),_e.set(t,e)}function wv(t){_e.get(t)?.disconnect(),_e.delete(t)}function Kl(){let t=new Set;for(let n of Ul())t.add(n),n.parentElement&&t.add(n.parentElement);let e=In();e&&t.add(e);for(let n of[..._e.keys()])(!t.has(n)||!n.isConnected)&&wv(n);for(let n of t)n.isConnected&&Ev(n)}function Sv(){let t=Zo();if(!t){te?.disconnect(),te=null,Da=null;return}if(Da===t&&te){te.observe(t,{childList:!0});return}te?.disconnect(),Da=t,te=new MutationObserver(()=>{yr||!kt||(Kl(),Po())}),te.observe(t,{childList:!0})}function gf(t){xr===t&&me||(me?.disconnect(),xr=t,me=new MutationObserver(()=>{if(!t.isConnected){me?.disconnect(),me=null,xr=null;return}yr||!kt||Po()}),me.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function bf(t){if(!kt||w.store.applyToMenu===!1)return;let e=Nn();if(e){gf(e),Po();return}t<=0||requestAnimationFrame(()=>bf(t-1))}function hf(t){kt&&(_a(),!(Ul().length||t<=0)&&(Ba=requestAnimationFrame(()=>hf(t-1))))}function Lv(t){kt&&w.store.applyToMenu!==!1&&(!Jo(t)&&!Nn()||bf(10))}function Tv(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let m=document.createElement("div");m.className="bloom-csi-crop";let y=document.createElement("div");y.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,y.appendChild(g);let p=document.createElement("div");p.className="bloom-csi-zoom-row";let f=document.createElement("input");f.type="range",f.className="bloom-csi-zoom",f.min=String($l),f.max=String(_l),f.step="0.05",f.setAttribute("aria-label","Zoom");let h=document.createElement("span");h.className="bloom-csi-zoom-val";let v=document.createElement("button");v.type="button",v.className="bloom-csi-btn",v.textContent="Reset",p.append(f,h,v);let I=document.createElement("p");I.className="bloom-csi-hint",I.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",m.append(y,p,I),t.append(u,d,m);function R(){let b=String(w.store.avatarSource??""),M=String(w.store.avatarUrl??"");return b.startsWith("data:image/")?b:M.startsWith("data:image/")?M:""}function P(b,M,B){if(!a)return i.x=b,i.y=M,i.zoom=at(B,$l,_l),i;let lt=Oa(a.w,a.h,B,b*a.w,M*a.h);return i.x=lt.x/a.w,i.y=lt.y/a.h,i.zoom=lt.z,i}function q(){f.value=String(i.zoom),h.textContent=`${Math.round(i.zoom*100)}%`;let b=a?Oa(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;b&&a&&(g.style.width=`${a.w/b.side*100}%`,g.style.height=`${a.h/b.side*100}%`,g.style.left=`${(.5-b.x/b.side)*100}%`,g.style.top=`${(.5-b.y/b.side)*100}%`)}function A(b=!1){let M=R(),B=String(w.store.avatarUrl??"").trim(),lt=!!M;s.hidden=!B&&!M,(M||B)&&(s.src=M||B),document.activeElement!==l&&(l.value=lt?"":B),l.placeholder=lt?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",m.hidden=!M,d.hidden=!(e&&/^https?:\/\//.test(B)&&!M),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",M&&(b&&(i.x=Ln(w.store.cropX,.5),i.y=Ln(w.store.cropY,.5),i.zoom=Ln(w.store.cropZoom,1)),g.getAttribute("src")!==M&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},P(i.x,i.y,i.zoom),q()},g.src=M),q())}function N(b,M,B,lt=!1){P(b,M,B),q();let Zl=R(),Jl=()=>{w.store.cropX=i.x,w.store.cropY=i.y,w.store.cropZoom=i.zoom,Zl&&jl(Zl,i.x,i.y,i.zoom).then(Ql=>{Ql&&(w.store.avatarUrl=Ql)})};r&&clearTimeout(r),lt?Jl():r=setTimeout(Jl,80)}function V(b){w.store.avatarUrl=b;let M=b.trim();if(n&&clearTimeout(n),!M){w.store.avatarSource="",Gl(),e=!1,A(!0);return}if(M.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Ta(M).then(B=>{if(!B)return;let lt=Fl(B);B.close(),lt&&zl(lt).then(()=>A(!0))})},80);return}if(/^https?:\/\//.test(M)){e=!1,w.store.avatarSource="",n=setTimeout(()=>{Ta(M).then(B=>{if(!B){e=!0,A(!0);return}let lt=Fl(B);B.close(),lt?(e=!1,zl(lt).then(()=>A(!0))):(e=!0,A(!0))})},400);return}e=!1,w.store.avatarSource="",A(!0)}u.addEventListener("paste",b=>{Ro(b.clipboardData)&&(b.preventDefault(),e=!1,Dl(b.clipboardData).then(()=>A(!0)))}),u.addEventListener("dragover",b=>{Ro(b.dataTransfer)&&b.preventDefault()}),u.addEventListener("drop",b=>{Ro(b.dataTransfer)&&(b.preventDefault(),e=!1,Dl(b.dataTransfer).then(()=>A(!0)))}),l.addEventListener("change",()=>V(l.value)),l.addEventListener("paste",b=>{Ro(b.clipboardData)&&(b.preventDefault(),e=!1,Dl(b.clipboardData).then(()=>A(!0)))}),l.addEventListener("keydown",b=>{R()&&!l.value&&(b.key==="Backspace"||b.key==="Delete")&&(of(),e=!1,A(!0))}),c.addEventListener("click",()=>{of(),e=!1,A(!0)}),y.addEventListener("pointerdown",b=>{b.button===0&&(y.setPointerCapture(b.pointerId),o.on=!0,o.px=b.clientX,o.py=b.clientY,o.x=i.x,o.y=i.y)}),y.addEventListener("pointermove",b=>{if(!o.on||!a)return;let M=y.clientWidth;if(!M)return;let{side:B}=Oa(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);P(o.x-(b.clientX-o.px)*(B/M)/a.w,o.y-(b.clientY-o.py)*(B/M)/a.h,i.zoom),q()}),y.addEventListener("pointerup",()=>{o.on&&(o.on=!1,N(i.x,i.y,i.zoom,!0))}),y.addEventListener("pointercancel",()=>{o.on=!1}),y.addEventListener("wheel",b=>{b.preventDefault(),N(i.x,i.y,i.zoom*(b.deltaY<0?1.08:1/1.08))},{passive:!1}),f.addEventListener("input",()=>N(i.x,i.y,Number(f.value))),f.addEventListener("change",()=>N(i.x,i.y,Number(f.value),!0)),v.addEventListener("click",()=>N(.5,.5,1,!0));let fe=()=>A(!1);return qa=fe,A(!0),()=>{qa===fe&&(qa=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var yf=x({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[E.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:rf,cleanupSelectors:[`.${iv}`,`.${av}`],settings:w,start(){kt=!0,wn.clear(),Pl(Po),L(rf,ef),Ra=new AbortController,document.addEventListener("click",Lv,{signal:Ra.signal}),hf(40),mf(),nf.debug("started")},onSettingsChange(){wn.clear(),qa?.(),kt&&(Kl(),_a())},stop(){kt=!1,Ra?.abort(),Ra=null,vr&&cancelAnimationFrame(vr),vr=0,Ba&&cancelAnimationFrame(Ba),Ba=0;for(let t of _e.values())t.disconnect();_e.clear(),me?.disconnect(),me=null,xr=null,te?.disconnect(),te=null,Da=null,hv(),S(sf),Pl(null),wn.clear(),nf.debug("stopped")}});var Er=new T("Bloom"),vf=!1,kv=Date.now(),Mv=[Yc,_u,Yu,Ju,rd,ld,Ed,Sd,kd,Ud,Jd,im,sm,Em,Nm,Pm,zm,yf];function Fa(t){return new Promise(e=>setTimeout(e,t))}function Cv(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function Av(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Ef=8e3,xf=300,Hv=250;async function Iv(){if(je())return await Fa(xf),!0;for(;Date.now()-kv<Ef;)if(await Fa(Hv),je())return await Fa(xf),!0;return je()||Xa()}function Vl(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Nv(){if(Vl())return!0;let t=Date.now()+Ef;for(;Date.now()<t;)if(await Fa(100),Vl())return!0;return Vl()}function Rv(){try{GM_registerMenuCommand?.("Bloom++ settings",Wc)}catch{}}function Pv(){Go(()=>{Sr("HostShell"),Er.info("host shell",bt)}),Uo(()=>{Er.info("idle ready",bt)}),Ko(()=>{ja(),Sr("HostReady"),Er.info("chrome ready",bt)})}async function Wl(){await dc()}async function Yl(){if(vf)return;vf=!0;for(let n of Mv)try{yc(n),Cc(n)}catch(r){Er.error("register failed",n.name,r)}Sr("Init"),Rv(),Pv();let t=()=>Sr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Cv(),ja(),Er.info("styles ready",bt),await Av(),Nv().then(n=>{n&&Vo()}),!await Iv()){Er.warn("late islands not detected; starting default plugins",bt),Cn(),Wo();return}await kc()}var wf=typeof unsafeWindow<"u"?unsafeWindow:window,Ov=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Ov){let t=wf.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",bt);try{Object.defineProperty(wf,"Bloom",{value:Xl,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Wl().then(()=>Yl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
