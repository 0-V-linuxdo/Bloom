// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.92
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

/* Bloom++ [20260924] v1.4.92. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var kf=Object.defineProperty;var Mf=(t,e)=>{for(var n in e)kf(t,n,{get:e[n],enumerable:!0})};var Xl={};Mf(Xl,{REPO_URL:()=>Cc,Settings:()=>q,VERSION:()=>pt,contextKeyFromUrl:()=>ie,conversationTitle:()=>qn,conversationToken:()=>Mt,currentConversationId:()=>A,hasDraftText:()=>Dt,hasErrorToast:()=>Ft,hasLateIslands:()=>Ge,init:()=>Yl,initSettings:()=>Wl,isDocumentInteractive:()=>Hc,isStreaming:()=>G,isUserDraftEmpty:()=>we,messageCreateTime:()=>xi,plugins:()=>ne,requestChromeReady:()=>Vo,requestIdleReady:()=>An,requestShellReady:()=>Ko,setEditorText:()=>oe,subscribeHarvest:()=>gt,watchStreamingEdge:()=>ot,whenChromeReady:()=>Uo,whenIdleReady:()=>Go,whenShellReady:()=>jo});var ge=new Map,Po=!1;function Cf(){return document.getElementById("bloom-root")?.shadowRoot??null}function ec(){return document.head??null}function kn(){let t=Cf();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Af()}function $a(t,e){if(!Po)return;let n=ec();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),kn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,kn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,kn()}function w(t,e){let n=ge.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},ge.set(t,n)),Po&&$a(t,n)}function _a(){if(!ec())return!1;Po=!0;for(let[e,n]of ge)$a(e,n);return kn(),!0}function nc(t){let e=ge.get(t);e&&(e.disabled=!1,Po&&$a(t,e))}function rc(t){let e=ge.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),kn())}function E(t){let e=ge.get(t);e&&(e.el?.remove(),ge.delete(t),kn())}function Af(){return Array.from(ge.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var Fa=new Map;function Mn(t,e){let n=Fa.get(t);return n||(n=new Set,Fa.set(t,n)),n.add(e),()=>n.delete(e)}function ze(t,e){let n=Fa.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Hf="bloompp";function oc(){return new Promise((t,e)=>{let n=indexedDB.open(Hf,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function ic(t){try{let e=await oc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function ac(t,e){try{let n=await oc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function tt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function et(t,e,n){return Math.min(n,Math.max(e,t))}function sc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function lc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function cc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Oo=new S("SettingsStore"),be="BloomSettings",If=100;function Bo(t){return t!=null&&typeof t.then=="function"}function Nf(t){if(t==null||Bo(t))return null;if(tt(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(tt(e)&&!Bo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return tt(n)&&!Bo(n)?n:null}return null}catch{return null}}function qo(t){let e=Nf(t);if(!e)return null;let n=e.plugins;return!tt(n)||Bo(n)||Object.keys(n).length===0?null:e}function ja(t){return tt(t)?t:null}function za(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:tt(t)?Object.keys(t).length===0:!1}function Rf(t){return za(t)?0:Array.isArray(t)?12+Math.min(t.length,40):tt(t)?12+Math.min(Object.keys(t).length,40):3}function je(t){if(!t)return-1;let e=t.plugins;if(!tt(e))return-1;let n=0;for(let r of Object.values(e)){let o=ja(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=Rf(a))}return n}function uc(t){let e=t.plugins;if(!tt(e))return 0;let n=0;for(let r of Object.values(e))ja(r)?.enabled===!0&&n++;return n}function dc(t){let e=t.map((i,a)=>({bag:i,index:a,score:je(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=uc(a.bag)-uc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!tt(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(tt(a))for(let[s,c]of Object.entries(a)){let l=ja(c);if(!l)continue;if(!tt(r[s])){let d=structuredClone(l);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,m]of Object.entries(l))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&m===!0&&(u.enabled=!0);continue}za(u[d])&&!za(m)&&(u[d]=structuredClone(m))}}}let o=r.Settings;return tt(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:je(n)}}var Do=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[l,u]of this.defaultGetters)if(c.startsWith(l)){let d=c.slice(l.length+1);if(d&&!d.includes(".")){let m=u(d);m!==void 0&&(i[a]=m,s=m);break}}}return tt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Oo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},If))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(be,this.plain)}catch{try{GM_setValue(be,e)}catch(n){Oo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(be,e)}catch{}ac(be,e).catch(n=>Oo.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){Oo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){sc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Pf=new S("Settings"),Of={plugins:{}},q=new Do(structuredClone(Of)),Bf=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Df(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function T(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?he(n):{}},get plain(){let n=e.pluginName;return n?q.plain.plugins[n]??{}:{}}};return e}async function qf(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function mc(){let t=qo(await qf(be)),e=qo(await ic(be)),n=null;try{n=qo(localStorage.getItem(be))}catch{n=null}let r=dc([t,e,n]);if(r){let o=r.bag.plugins;o&&(q.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);Pf.info("Loaded settings from",i,"richness",r.score,"gm",je(t),"idb",je(e),"ls",je(n))}q.releasePersist(),r&&(r.index!==0||r.score>je(t))&&q.persistLoadedBag()}function he(t){return q.plain.plugins[t]||(q.plain.plugins[t]={}),q.store.plugins[t]}function fc(t,e){e&&(e.pluginName=t,he(t),q.setDefaultGetter(Bf(t),n=>{if(n!=="enabled")return Df(e.def,n)}))}function pc(){return he("Settings")}function $o(){return pc().pinnedPlugins??[]}function gc(t){return $o().includes(t)}function bc(t){let e=$o(),n=e.includes(t);return q.store.plugins.Settings={...q.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function _o(){return pc().starredPlugins??[]}function hc(t){return _o().includes(t)}function yc(t){let e=_o(),n=e.includes(t);return q.store.plugins.Settings={...q.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var Fo=new S("PluginManager"),ne={},Er=new Set;function vc(t){if(ne[t.name]){Fo.warn("Duplicate plugin",t.name);return}ne[t.name]=t,fc(t.name,t.settings)}function Cn(t){let e=ne[t];if(!e)return!1;if(e.required)return!0;let n=q.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function xc(t){let e=ne[t];if(!e||e.required)return;let n=!Cn(t);he(t),q.store.plugins[t].enabled=n,n?Ec(e):$f(e),ze("pluginToggle",{name:t,enabled:n})}function Ec(t,e=!1){if(!Er.has(t.name)&&Cn(t.name))try{t.managedStyle&&nc(t.managedStyle),t.start?.(),Er.add(t.name),t.settings&&q.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Er.has(t.name)&&t.onSettingsChange?.()}),e||Fo.debug("Started",t.name)}catch(n){Fo.error("Failed to start",t.name,n)}}function $f(t){if(Er.has(t.name)){try{t.stop?.()}catch(e){Fo.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(rc(t.managedStyle),E(t.managedStyle)),Er.delete(t.name)}}function wr(t){for(let e of Object.values(ne))(e.startAt??"DOMContentLoaded")===t&&Ec(e)}var Sr=!1,zo=!1,Ga=!1,Sc=[],Lc=[],Tc=[];function Ua(t){let e=t.splice(0);for(let n of e)n()}function Lr(){Sr||(Sr=!0,Ua(Sc))}function Ka(){zo||(zo=!0,Sr||Lr(),Ua(Lc))}function kc(){Ga||(Ga=!0,Sr||Lr(),zo||Ka(),Ua(Tc))}function jo(t){Sr?t():Sc.push(t)}function Go(t){zo?t():Lc.push(t)}function Uo(t){Ga?t():Tc.push(t)}function Ko(){Lr()}function An(){Lr(),Ka()}function Vo(){kc()}function wc(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Mc(){await wc(4e3),Lr(),await wc(4e3),Ka(),kc()}var v={p:"0-V-linuxdo"},pt="[20260924] v1.4.92",Cc="https://github.com/0-V-linuxdo/Bloom";var _f={BetterNavigator:1790240385e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789969779e3,ComposerOpacity:1789969779e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789969779e3,InputHistory:1789969779e3,MessageTimestamps:1790230458e3,NoDictation:1789969779e3,NoShareLink:1789969779e3,NoSidebarIdentity:1789969779e3,PromptQueue:179024675e4,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789969779e3,WiderChat:1789969779e3};function Ac(t){let e=_f[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function Ff(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function zf(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Va(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Ge(){return Va()?Ff()||zf():!1}function Hc(){return Ge()}var jf=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Ic=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Gf=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Uf="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function In(t){return t.id==="bloom-root"||!!t.closest(Uf)}function Nc(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Wo(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Wa(t){if(!(t instanceof HTMLElement)||!t.isConnected||In(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Wo(e)?!1:t.getClientRects().length>0}function Hn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Kf(){let t=[];for(let e of document.querySelectorAll(jf))!(e instanceof HTMLElement)||!e.isConnected||In(e)||t.push(e);return t}function Yo(t){if(!t.isConnected||In(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Ue(){return Kf().filter(Yo)[0]??null}function Nn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||In(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Ya(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!In(n)&&!Hn(n)&&n.parentElement&&!Hn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!Hn(r)&&!In(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!Hn(r.parentElement))return r}return e}function Rn(){let t=document.querySelectorAll(Ic);for(let n of t)if(Wa(n)&&!Wo(n)&&Nc(n))return n;let e=document.querySelectorAll(Gf);for(let n of e){if(!Wa(n)||!Nc(n)||Wo(n))continue;let r=n.querySelector(Ic);return Wa(r)&&!Wo(r)?r:n}return null}function Xo(){let t=Ue();if(t){let e=Ya(t),n=e.parentElement;if(n&&!Hn(n))return n;if(!Hn(e))return e}return Nn()}function Zo(t){let e=Ue();return e?t.composedPath().includes(e):!1}var Za=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Vf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Wf(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Yf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Xa(t){let e=Wf(t);return e?Yf(e)>.55?"light":"dark":null}function Xf(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Xa(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Xa(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Xa(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Jo(t){return t==="auto"?Xf():t}function Zf(t){try{let e=getComputedStyle(document.documentElement);for(let n of Za){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Qo(t,e,n){let r=Vf[e];if(n){Zf(t);for(let o of Za)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Za)t.style.setProperty(o,r[o])}function Rc(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Ja=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Qf="bloom-root",Ot="bloom-rail-item",oi="bloom-account-item",Ve="bloom-sidebar-panel",Rr="bloom-plugin-dialog",di="bloom-plugin-layer",ii="bloom-settings-css",tp=2e3,Bc=null,ep=null,Ee=!1,ns=[],ti=null,ai=null,ve=null,ni=null,re=null,Hr=null,Tr,Pn=0,Ir=0,kr=0,Mr=null,Cr=null,si=null,Dc=null,Ar=null,Qa=[],li=!1,np=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],rp=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],op=new Set(["chat","ui","privacy"]),ip=10080*60*1e3,mi="",Nr="all",Pt="all";function fi(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function qc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function ap(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function sp(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function lp(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function cp(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var up={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function dp(t){return t.icon||up[t.name]||fi()}function ts(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Qo(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function $c(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function ci(){let t="auto",e=Jo(t);ts(Bc,e,!0);let n=document.getElementById(Ve);n instanceof HTMLElement&&ts(n,e,!0);let r=document.getElementById(Rr);r instanceof HTMLElement&&ts(r,e,!0);let o=document.getElementById(Ot);o instanceof HTMLElement&&$c(o),ze("schemeChange",{scheme:e,pref:t})}function _c(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Fc(){if(w("settings",Ja),document.getElementById(ii)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=ii,t.textContent=Ja,document.head.appendChild(t)}function mp(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function fp(){for(let t of ns)t();ns=[]}function zc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function pp(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function is(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function gp(t){return is(t).length>0}function ri(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function bp(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=pp(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function hp(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(bp(e,n));let i=he(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ns.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[e]??ri(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??ri(n)??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),c.textContent=s.value}),a.append(s,c),o.appendChild(a),o}if(n.type===2){let a=zc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??ri(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Pc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function yp(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=he(t.name);for(let[n,r]of is(t)){if(n==="enabled"||r.type===5)continue;let o=ri(r);o!==void 0&&(e[n]=o)}Gc(t)}function jc(t){t.key==="Escape"&&(!document.getElementById(di)&&!document.getElementById(Rr)||(t.stopPropagation(),On()))}function vp(){li||(document.addEventListener("keydown",jc),li=!0)}function xp(){li&&(document.removeEventListener("keydown",jc),li=!1)}function On(){fp(),xp(),document.getElementById(di)?.remove(),document.getElementById(Rr)?.remove()}function Gc(t){if(On(),!document.body)return;let e=document.createElement("div");e.id=di,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",xe),e.addEventListener("pointerup",xe),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&On()});let n=document.createElement("div");n.id=Rr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",xe),n.addEventListener("pointerup",xe),n.addEventListener("click",xe);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=qc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),On()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Pc("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Pc("Settings","bloom-plugin-dialog-settings"),c=document.createElement("div");c.className="bloom-plugin-dialog-settings-list";let l=is(t);if(l.length)for(let[u,d]of l){let m=hp(t.name,u,d);m&&c.appendChild(m)}if(!c.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",c.appendChild(u)}if(s.appendChild(c),n.appendChild(s),l.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>yp(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),vp(),ci()}function Ep(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=dp(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let c=hc(t.name),l=document.createElement("button");if(l.type="button",l.className=`bloom-icon-btn bloom-card-star${c?" bloom-card-star-active":""}`,l.setAttribute("aria-label",c?"Remove from favorites":"Add to favorites"),l.innerHTML=lp(c),l.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let p=yc(t.name);ze("pluginStar",{name:t.name,starred:p})}),s.appendChild(l),!t.required){let g=gc(t.name),p=document.createElement("button");p.type="button",p.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,p.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),p.innerHTML=cp(g),p.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation();let k=bc(t.name);ze("pluginPin",{name:t.name,pinned:k})}),s.appendChild(p)}if(gp(t)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${t.name} settings`),g.innerHTML=sp(),g.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),Gc(t)}),s.appendChild(g)}let u=zc(t.name,Cn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",g=>g.stopPropagation()),d?.addEventListener("change",()=>{xc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=t.description,n.appendChild(g)}let m=document.createElement("div");m.className="bloom-card-separator";let b=document.createElement("div");b.className="bloom-card-footer";let f=document.createElement("div");return f.className="bloom-card-author",f.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",b.appendChild(f),e.append(n,m,b),e}function Uc(){return Object.values(ne).filter(t=>!t.hidden&&t.name!=="Settings")}function wp(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<ip}function Kc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return wp(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>op.has(r)):n.includes(e)}function Sp(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Lp(){return mi.trim()?"No plugins match your search.":Pt==="favorites"?"No favorites yet. Star a plugin to see it here.":Pt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Tp(){let t=Uc();return rp.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Kc(n,e.id)))}function kp(){if(Ar){Ar.replaceChildren();for(let t of Tp()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Pt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Pt=t.id,Ke()}),Ar.appendChild(e)}}}function Mp(){let t=Uc();if(Pt==="favorites"){let e=new Set(_o());t=t.filter(n=>e.has(n.name))}else Pt!=="all"&&(t=t.filter(e=>Kc(e,Pt)));return Nr==="enabled"&&(t=t.filter(e=>Cn(e.name))),Nr==="disabled"&&(t=t.filter(e=>!Cn(e.name))),t}function Ke(){if(!Mr)return;kp();let t=Mp();si&&(si.placeholder=`Search ${t.length} plugins...`);let e=t,n=mi.trim().toLowerCase();if(n&&(e=e.filter(r=>Sp(r).includes(n))),Pt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Pt!=="favorites"){let r=$o();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),c=o.has(a.name);return s!==c?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Mr.replaceChildren();for(let r of e)Mr.appendChild(Ep(r));Cr&&(Cr.hidden=e.length>0,Cr.textContent=Lp())}function xe(t){t.stopPropagation()}function es(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function as(){document.getElementById(Ot)?.setAttribute("aria-expanded",Ee?"true":"false")}function Cp(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function ss(){On(),mi="",Nr="all",Pt="all",document.getElementById(Ve)?.remove(),Ee=!1,as()}function Ap(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",xe),e.addEventListener("pointerup",xe),e.addEventListener("click",xe);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=fi();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let c="Toggle features. Some need a reload. Click the sliders icon to configure.",l=document.createElement("button");l.type="button",l.className="bloom-info-hint",l.setAttribute("aria-label",c),l.innerHTML=ap();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=c,l.appendChild(u),a.append(s,l),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=qc(),d.addEventListener("click",ss),r.appendChild(o),n.appendChild(r);let m=document.createElement("div");m.className="bloom-plugin-tabs",n.appendChild(m);let b=document.createElement("div");b.className="bloom-search-bar";let f=document.createElement("input");f.type="search",f.className="bloom-search-input",f.setAttribute("aria-label","Search plugins"),f.placeholder="Search plugins...",f.addEventListener("input",()=>{mi=f.value,Ke()});let g=document.createElement("select");g.className="bloom-search-filter",g.setAttribute("aria-label","Filter plugins");for(let k of np){let H=document.createElement("option");H.value=k.value,H.textContent=k.label,g.appendChild(H)}g.value=Nr,g.addEventListener("change",()=>{Nr=g.value,Ke()}),b.append(f,g),n.appendChild(b);let p=document.createElement("div");p.className="bloom-plugin-list",n.appendChild(p);let L=document.createElement("p");return L.className="bloom-tab-empty",L.hidden=!0,n.appendChild(L),e.append(d,n),Mr=p,Cr=L,si=f,Dc=g,Ar=m,Ke(),e}function Hp(t){t.classList.add("bloom-rail-dock")}function Ip(){let t=document.getElementById(Ot);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Yo(t)?t:null}function Np(){if(document.getElementById(Ve)?.remove(),!document.body)return;let t=Ap(Ve);Hp(t),document.body.appendChild(t),Ee=!0,On(),ci(),as(),ze("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:pt,dock:"center",rail:!!Ip()})}function ls(){let t=document.getElementById(Ve);if(t instanceof HTMLElement&&t.isConnected&&Cp(t)){ss();return}t?.remove(),Np()}function Rp(){let t=document.createElement("button");return t.type="button",t.id=Ot,t.className="bloom-rail-item",t.setAttribute("aria-controls",Ve),t.setAttribute("aria-expanded",Ee?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${fi()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ls()}),t}function Oc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Pp(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Op(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function ye(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Vc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Pp(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&ye(t,"padding-top",Math.round(i)),Number.isFinite(a)&&ye(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));ye(n,"width",c),ye(n,"height",Math.max(20,Math.round(s.height)));let l=t.getBoundingClientRect(),u=Math.round(s.left-l.left);u>=0&&u<=40&&ye(t,"padding-left",u);let d=Op(e,r);if(d){let m=d.getBoundingClientRect(),b=n.getBoundingClientRect(),f=Math.round(m.left-b.right);f>=0&&f<=24&&ye(t,"gap",f)}}else{let s=Number.parseFloat(o.paddingLeft),c=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&ye(t,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&ye(t,"gap",Math.round(c))}$c(t)}function rs(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Bp(){if(Hr?.isConnected&&re){re.observe(Hr,{childList:!0});return}os()}function Dp(t){if(rs(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function qp(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){kr=0;return}kr+=1,Ir=Date.now()+Math.min(8e3,250*2**Math.min(kr,5))})}function $p(){Pn||Date.now()<Ir||(Pn=requestAnimationFrame(()=>{Pn=0,!(Date.now()<Ir)&&(document.getElementById(Ot)?.isConnected||ui())}))}function ui(){if(!document.body)return;re?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Ot);t=n instanceof HTMLButtonElement?n:Rp();let r=Ue(),o=Nn();if(r){let i=Ya(r),a=i.parentElement;if(rs(i)||a&&rs(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Oc(t),Vc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Oc(t,!0)):t.isConnected&&!Yo(t)&&(t.remove(),t=null)}finally{qp(t,e),Bp(),as()}}function os(){let t=Xo();!t||!Dp(t)||Hr===t&&re||(re?.disconnect(),Hr=t,re=new MutationObserver(()=>{document.getElementById(Ot)?.isConnected||$p()}),re.observe(t,{childList:!0}))}function _p(){ui(),os(),Tr===void 0&&(Tr=window.setInterval(()=>{let t=document.getElementById(Ot);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Ir&&ui();else{kr=0;let e=Ue();e&&Vc(t,e)}os()},tp))}function Fp(){Tr!==void 0&&(clearInterval(Tr),Tr=void 0),Pn&&cancelAnimationFrame(Pn),Pn=0,Ir=0,kr=0,re?.disconnect(),re=null,Hr=null}function zp(t){ni===t&&ve||(ve?.disconnect(),ni=t,ve=new MutationObserver(()=>{if(!t.isConnected){ve?.disconnect(),ve=null,ni=null;return}Wc(t)}),ve.observe(t,{childList:!0}))}function Wc(t){if(zp(t),t.querySelector(`#${oi}`))return;let e=document.createElement("button");e.type="button",e.id=oi,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${fi()}<span>Bloom++</span>`,e.addEventListener("pointerdown",es),e.addEventListener("pointerup",es),e.addEventListener("click",n=>{es(n),ls()}),t.insertBefore(e,t.firstChild)}function ei(){let t=Rn();return t?(Wc(t),!0):!1}function jp(t){Zo(t)&&(queueMicrotask(ei),requestAnimationFrame(()=>{ei()}),window.setTimeout(ei,60),window.setTimeout(ei,180))}function Gp(){ai?.abort();let t=new AbortController;ai=t,document.addEventListener("click",jp,{signal:t.signal})}function Up(){ai?.abort(),ai=null,ve?.disconnect(),ve=null,ni=null}function Yc(){An(),mp(()=>{Fc(),_c(),ui(),ls()})}var Xc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Qf}`,`#${Ot}`,`#${oi}`,`#${Ve}`,`#${di}`,`#${Rr}`,`#${ii}`,"#bloom-menu-panel"],start(){Fc(),_c(),_p(),Gp(),ti?.(),ti=Rc(ci),ci(),Qa=[Mn("pluginToggle",()=>{Ee&&Ke()}),Mn("pluginPin",()=>{Ee&&Ke()}),Mn("pluginStar",()=>{Ee&&Ke()})]},stop(){Fp(),Up(),ti?.(),ti=null;for(let t of Qa)t();Qa=[],ss(),document.getElementById(Ot)?.remove(),document.getElementById(oi)?.remove(),document.getElementById(ii)?.remove(),Bc=null,ep=null,Mr=null,Cr=null,si=null,Dc=null,Ar=null,Ee=!1}});var pi='form[data-type="unified-composer"], form.w-full[data-type]',Bt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Bn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Zc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Jc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Kp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Vp='[contenteditable="false"], button, [role="button"]';function Tt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function We(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Tt(o)))return o;return null}function Qc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function $(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Qc(t);return!!(Kp.test(n)||/^stop$/i.test(n))}function kt(){let e=Array.from(document.querySelectorAll(pi)).find(Tt);if(e instanceof HTMLElement)return e;let n=We(document,Bt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function nt(){let t=Array.from(document.querySelectorAll(Bt));return t.find(Tt)??t[0]??null}function Wp(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Vp);return!!n&&n!==e&&e.contains(n)}function cs(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Wp(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Dt(t){let e=t??nt();return e?cs(e,e).replaceAll("\u200B","").trim().length>0:!1}function we(t){return!Dt(t)}function gi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function tu(t){let e=kt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Tt(n))&&t(n))return n;return null}function Se(){let t=kt(),e=We(t,Bn)??We(document,Bn);return e&&!$(e)?e:tu(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!$(n);let o=Qc(n);return/^(send|send prompt|发送)$/i.test(o)&&!$(n)})}function Ye(){let t=kt(),e=We(t,Zc,!0)??We(document,Zc,!0);if(e)return e;let n=We(t,Jc)??We(document,Jc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Tt(r)&&$(r))return r}return tu($)}function qt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>cs(n,t)).join(`
`):cs(t,t)}function us(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function oe(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),us(t,n)}var eu=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Mt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=l=>{let u=n.indexOf(l);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(l,u)=>{try{return document.querySelector(l)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function ie(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ae(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(eu)?.[1]??""}catch{return t.match(eu)?.[1]??""}}function A(){return ae(location.pathname)}var iu=new S("Harvest"),Yp=1500,Xp=200,bi=new Set,hi=new Map,yi=new Map,Dn=null,vi=null,Pr=null,$t=0;function Zp(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Jp(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Qp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function au(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var tg=/"action"\s*:\s*"(next|continue|variant)"/i;function eg(t,e,n){return!(e!=="POST"||au(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!tg.test(n))}function ng(t,e){return e!=="GET"||au(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function nu(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function su(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function rg(t){return typeof t=="string"?su(t):""}function ds(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return ds(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function lu(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function ru(t,e,n){!t||!e||yi.get(t)!==e&&(yi.set(t,e),lu(yi,Yp),Le({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function og(t,e){let n=e.trim();!t||!n||hi.get(t)!==n&&(hi.set(t,n),lu(hi,Xp),Le({type:"conversation-meta",conversationId:t,title:n}))}function Or(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let c of t)Or(c,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&og(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let c=i,l=typeof c.id=="string"?c.id:"",u=ds(c.create_time??c.createTime??c.created_at);l&&u&&ru(l,u,o)}let a=typeof r.id=="string"?r.id:"",s=ds(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&ru(a,s,o),r.mapping&&typeof r.mapping=="object")Or(r.mapping,o,n+1);else if(n<3)for(let c of Object.values(r))c&&typeof c=="object"&&Or(c,o,n+1)}function ou(t,e){if(t)try{Or(JSON.parse(t),e)}catch{}}function Le(t){for(let e of Array.from(bi))try{e(t)}catch{}}async function ig(t,e,n){if(n===$t)try{let r=await t.json();if(n!==$t)return;Or(r,e)}catch{}}async function ag(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===$t&&Le({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),c=new TextDecoder,l="";try{for(;r===$t;){let{done:u,value:d}=await s.read();if(u)break;if(l+=c.decode(d,{stream:!0}),!o){let b=su(l);b&&(o=b,Le({type:"post-start",conversationId:o,url:""}))}let m=l.split(`
`);l=m.pop()??"";for(let b of m){let f=b.replace(/^data:\s*/,"").trim();!f||f==="[DONE]"||ou(f,o)}/\[DONE\]/.test(l)||/"error"\s*:\s*\{/.test(l)?(/"error"\s*:\s*\{/.test(l)&&(i=!0),l=l.slice(-64)):l.length>16384&&(l=l.slice(-4096))}l&&r===$t&&ou(l.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===$t&&Le({type:"post-end",conversationId:o,error:i})}function sg(t,e,n){let r=Jp(e),o=Qp(e,n),i=ng(r,o),a=eg(r,o,n?.body),s=$t,c="";return a&&(c=rg(n?.body)||nu(r)||ae(r)||A(),Le({type:"post-start",conversationId:c,url:r})),t(e,n).then(l=>{if(s!==$t||!i&&!a)return l;try{let u=l.clone();i?ig(u,nu(r)||A(),s):ag(u,c,!l.ok,s)}catch{a&&Le({type:"post-end",conversationId:c,error:!l.ok})}return l},l=>{throw a&&s===$t&&Le({type:"post-end",conversationId:c,error:!0}),l})}function lg(){if(Dn)return;let t=Zp();Pr=t,Dn=t.fetch.bind(t);let e=(n,r)=>sg(Dn,n,r);vi=e,t.fetch=e,iu.debug("conversation fetch harvest hooked")}function cg(){$t+=1,!(!Dn||!Pr)&&(vi&&Pr.fetch===vi&&(Pr.fetch=Dn),Dn=null,vi=null,Pr=null,iu.debug("conversation fetch harvest unhooked"))}function gt(t){return bi.add(t),lg(),()=>{bi.delete(t),bi.size===0&&cg()}}function qn(t){return t?hi.get(t)??"":""}function xi(t){return t?yi.get(t)??null:null}var uu=new S("Streaming");function _r(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Tt(e))&&($(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function ug(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Tt(t))}function dg(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Tt(t))}function mg(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Ft(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function G(){if(Ye()||_r()||mg())return!0;let t=Se();return t&&Tt(t)&&!$(t)?!1:!!(ug()||dg())}var fg=400,cu=3,Qe=new Set,Br,Dr=null,ms=null,Ze=!1,Xe=0,ke="",Me="",Ce=!1,qr=!1,$r=!1,_t=!1,V=null,bt="",Je=!1;function _(){return _t}function tn(){return Ce}function $n(){return bt}function fs(){return A()||bt}function du(){return ie(Mt())}function Ei(t,e){return{streaming:t,contextKey:e,conversationId:fs()}}function ps(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function pg(t){return!t||t==="/"||t.startsWith("/g/")}function U(t,e){if(!t||t===e)return!1;let n=ae(ps(e)||e);return!n||!(t.endsWith("|draft")||pg(ps(t)))?!1:bt?n===bt:Je}function wi(){Ze=!1,Xe=0,ke="",Ce=!1,qr=!1,$r=!1,bt="",Je=!1}function gg(t){for(let e of Array.from(Qe))try{e.onFall?.(t)}catch{}}function bg(t){for(let e of Array.from(Qe))try{e.onRise?.(t)}catch{}}function Te(t){for(let e of Array.from(Qe))try{e.onTick?.(t)}catch{}}function hg(t,e){for(let n of Array.from(Qe))try{n.onContext?.(t,e)}catch{}}function yg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&$(n)&&(Ce=!0)}function vg(t){if(t.type==="post-start"){let n=A();if(!t.conversationId){n||(Je=!0),(!n||n===bt)&&(_t=!1,Ce=!1);return}if(!(t.conversationId===n||t.conversationId===bt)&&!(!n&&Je))return;bt=t.conversationId,Je=!1,_t=!1,Ce=!1;return}if(t.type!=="post-end"||!Ze&&!V)return;let e=A();t.conversationId&&!(e?t.conversationId===e:t.conversationId===bt)||($r=!0,t.error&&(qr=!0,V&&(V.error=!0)))}function xg(){let t=du(),e=G();if(Me&&t&&Me!==t){let o=Me;if(!U(o,t))V=null,wi(),_t=e;else{let i=ae(ps(t));if(i&&!bt&&(bt=i,Je=!1),ke===o&&(ke=t),V&&V.contextKey===o){V.contextKey=t;let a=fs();a&&(V.conversationId=a)}_t=!1}if(Me=t,hg(t,o),_t){Te(Ei(!1,t));return}}else t&&(Me=t);if(_t){if(e){Te(Ei(!1,t));return}_t=!1}if(V)if(e||V.contextKey!==t)V=null;else{let o=V;V=null,wi(),gg(o),Te(Ei(!1,t));return}let n=Ei(e,t);if(e){let o=!Ze;o&&(Ce=!1,qr=!1,$r=!1),Ze=!0,Xe=0,ke=t,o&&bg(n),Te(n);return}if(!Ze){Te(n);return}if(Xe+=1,$r&&(Xe=Math.max(Xe,cu)),Xe<cu){Te(n);return}if(!(!!ke&&ke===t)){wi(),Te(n);return}V={contextKey:ke||t,conversationId:fs(),userStopped:Ce,error:qr||Ft()},Te(n)}function Eg(){Br===void 0&&(Ze=G(),Me=du(),ke=Ze?Me:"",Xe=0,Ce=!1,qr=!1,$r=!1,_t=!1,V=null,bt="",Je=!1,Dr?.abort(),Dr=new AbortController,document.addEventListener("click",yg,{capture:!0,signal:Dr.signal}),ms=gt(vg),Br=setInterval(xg,fg),uu.debug("watchStreamingEdge started"))}function wg(){Qe.size||(Br!==void 0&&(clearInterval(Br),Br=void 0),Dr?.abort(),Dr=null,ms?.(),ms=null,wi(),Me="",_t=!1,V=null,uu.debug("watchStreamingEdge stopped"))}function ot(t){let e=typeof t=="function"?{onFall:t}:t;return Qe.add(e),Eg(),()=>{Qe.delete(e),wg()}}var mu="bloom-host-icon",Fr="data-bloom-host-rel",gs="not all",bs=0,fu=0,Sg=400;function pu(t){bs+=1;try{t()}finally{bs-=1}}function Si(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Ae(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function gu(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Lg(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Tg(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-fu<Sg||(fu=n,t.appendChild(e))}function kg(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Si(n)&&(n.getAttribute(Fr)||n.setAttribute(Fr,n.rel),n.media!==gs&&(n.media=gs),n.rel!==mu&&(n.rel=mu))}function Mg(t){for(let e of t.querySelectorAll(`link[${Fr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Fr);n&&(e.rel=n),e.removeAttribute(Fr),e.media===gs&&e.removeAttribute("media")}}function bu(t,e){let{head:n}=document;!n||!e||pu(()=>{kg(n,t);let r=gu(t),{type:o,sizes:i}=Lg(e);r?Tg(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function hu(t,e){let{head:n}=document;n&&pu(()=>{gu(t)?.remove(),Mg(n)})}function yu(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(bs)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===t?a=!0:Si(l.target)&&(a=!0,Ae(l.target.href)&&(s=l.target.href)));for(let u of l.removedNodes)Si(u)&&u.id===t&&(a=!0);for(let u of l.addedNodes)Si(u)&&u.id!==t&&(a=!0,Ae(u.href)&&(s=u.href))}if(!a)return;let c=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),c();return}r||(r=requestAnimationFrame(c))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Cg=["original","badge","dot","hole","bg"],Eu=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],wu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Li="#FCFCFC",Ag="#111111",vu="#111111",Hg="#ffffff",Ig="#212121",Ng="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Rg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Ti=32,xu=64;function Su(t){return typeof t=="string"&&Cg.includes(t)}function Pg(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function ki(t){let e=document.createElement("canvas");e.width=Ti,e.height=Ti;let n=e.getContext("2d");return n?(n.scale(Ti/xu,Ti/xu),t(n),e.toDataURL("image/png")):""}function Og(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function Mi(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Ng);n&&(t.strokeStyle=Ag,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Bg(t,e,n){let r=wu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=vu,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=vu,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Hg,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function zr(t,e){if(t==="original")return e==="wait"?ki(r=>Mi(r,Li)):Pg(Rg[e]);let n=e==="wait"?void 0:wu[e];return ki(t==="hole"?r=>Mi(r,n??Li):t==="bg"?r=>{r.fillStyle=n??Ig,Og(r,0,0,64,64,14),r.fill(),Mi(r,Li,!1)}:r=>{Mi(r,Li),e!=="wait"&&Bg(r,e,t==="dot"?"dot":"badge")})}function Lu(t){return{wait:zr(t,"wait"),rotate:zr(t,"rotate"),done:zr(t,"done"),ready:zr(t,"ready"),error:zr(t,"error")}}var Dg=new S("ChatStateFavicons"),nn="bloom-chat-state-favicon",Au=["input","beforeinput","cut","paste","compositionend"],Hu=T({style:{type:3,description:"Favicon overlay",options:Eu}}),zt="",vs={wait:"",rotate:"",done:"",ready:"",error:""},jr="wait",it=!1,W=!1,P=null,lt="",ht="",on=!0,Hi=!1,_n=null,yt=0,Ci=null,Ai=null,en=null,ys=null,Fn=null,Ct=!1,Tu=new WeakSet;function qg(){let t=Hu.store.style;return Su(t)?t:"bg"}function Iu(){let e=document.querySelector(`link[rel~="icon"]:not(#${nn}), link[data-bloom-host-rel]:not(#${nn})`)?.href;return Ae(e)?e:Ae(zt)?zt:""}function $g(){let t=document.getElementById(nn);return t instanceof HTMLLinkElement?t:null}function _g(){if(!Ae(zt)){let t=Iu();t&&(zt=t)}return Ae(zt)?zt:vs.wait}function Nu(t){return t==="wait"?_g():vs[t]}function Ru(){bu(nn,Nu(jr))}function D(t){let e=Nu(t);if(jr===t){let n=$g();if(n&&n.getAttribute("href")===e)return}jr=t,Ru()}function ku(){vs=Lu(qg()),D(jr)}function xs(){return ie(Mt())}function Es(t,e){!t||!e||t===e||(P===t&&(P=e),lt===t&&(lt=e),ht===t&&(ht=e))}function Fg(){let t=xs();if(!(G()||it||W))return lt="",t;if(lt&&t&&lt!==t)if(U(lt,t))Es(lt,t),lt=t;else return lt="",t;else!lt&&t&&(lt=t);return lt||t}function Mu(t){return!P||!t?!1:P===t?!0:U(P,t)}function Pu(){it=!1,W=!1,P=null,lt=""}function Ou(t){ht=t,Pu(),on=!1,Hi=!0,D("wait")}function hs(t){return!t&&on}function zg(){if(!Ct)return;let t=xs();if(ht&&t&&ht!==t&&!U(ht,t)){Ou(t);return}ht&&t&&U(ht,t)&&Es(ht,t),t&&(ht=t);let e=G(),n=e&&!_();if(Hi){if(_()){D("wait");return}Hi=!1}if(_()){D("wait");return}let r=Fg(),o=we();if(tn()&&!e){it=!1,W=!1,P=null,D(o?"wait":hs(o)?"ready":"wait");return}if(Ft()&&!e&&it){D("error"),it=!1,W=!1,P=null;return}if(n){it||(on=!1),it=!0,W=!1,P=r,D("rotate");return}if(it)if(!Mu(t))it=!1,W=!1,P=null;else if(W){it=!1,W=!0,P=t||r,D("done");return}else{D("rotate");return}if(W)if(P&&t&&!Mu(t))W=!1,P=null;else if(o){P=r||P,D("done");return}else if(hs(o)){W=!1,D("ready");return}else{W=!1,D("wait");return}P=null,o?D("wait"):hs(o)?D("ready"):D("wait")}function rn(){Ct&&(_u(),Du(),qu(),zg())}function Bu(){if(Fn){for(let t of Au)Fn.removeEventListener(t,$u,!0);Fn=null}}function Du(){let t=kt(),e=t&&t!==document.body?t:null;if(!(Fn===e&&e?.isConnected)&&(Bu(),!!e)){Fn=e;for(let n of Au)Fn.addEventListener(n,$u,{capture:!0,passive:!0})}}function qu(){let t=kt();if(!(en&&ys===t&&t.isConnected)){if(en?.disconnect(),ys=t,!t||t===document.body){en=null;return}en=new MutationObserver(()=>Ii()),en.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Ii(){if(Ct){if(document.hidden){yt&&(cancelAnimationFrame(yt),yt=0),rn();return}yt||(yt=requestAnimationFrame(()=>{yt=0,Ct&&rn()}))}}function $u(){Dt()&&(on=!0),Ii()}function Cu(){Dt()&&(on=!0),Ii()}function jg(){Ct&&(yt&&(cancelAnimationFrame(yt),yt=0),rn())}function Gg(){Ct&&(on=!1,rn())}function Ug(t){if(!Ct)return;if(t.userStopped){it=!1,W=!1,P=null,D("wait");return}if(t.error){it=!1,W=!1,P=null,D("error");return}let e=xs();if(t.contextKey&&e&&t.contextKey!==e&&!U(t.contextKey,e)){it=!1,W=!1,P=null,D("wait");return}it=!1,W=!0,P=e||t.contextKey,D("done")}function Kg(){Ct&&rn()}function Vg(t,e){if(Ct){if(U(e,t)){Es(e,t),ht=t,rn();return}Ou(t)}}function _u(){let t=nt();!t||Tu.has(t)||(Tu.add(t),t.addEventListener("input",Cu,{capture:!0,passive:!0}),t.addEventListener("compositionend",Cu,{capture:!0,passive:!0}))}var Fu=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Hu,startAt:"DOMContentLoaded",cleanupSelectors:[`#${nn}`],start(){Ct=!0,zt=Iu()||zt,ku(),Ai?.disconnect(),Ai=yu(nn,t=>{Ae(t)&&(zt=t),Ru()}),_n?.abort(),_n=new AbortController,window.addEventListener("popstate",Ii,{signal:_n.signal}),document.addEventListener("visibilitychange",jg,{signal:_n.signal}),_u(),Du(),qu(),Ci?.(),Ci=ot({onRise:Gg,onFall:Ug,onTick:Kg,onContext:Vg}),rn(),Dg.debug("favicon watch started")},stop(){Ct=!1,yt&&cancelAnimationFrame(yt),yt=0,Ci?.(),Ci=null,_n?.abort(),_n=null,Bu(),en?.disconnect(),en=null,ys=null,Ai?.disconnect(),Ai=null,Pu(),ht="",on=!0,Hi=!1,jr="wait",hu(nn,zt)},onSettingsChange:ku});var zu=`.bloom-ih-hud {
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
`;var dE=new S("InputHistory"),ws=/\u200B/g,ju=10,Gu=500,Uu=100,Yg=8,Xg=120,Zg=2e3,Ni=10,Ri=T({maxEntries:{type:4,description:"Max stored prompts",min:ju,max:Gu,default:Uu},history:{type:5,description:"Stored prompts",render:mb},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Ss=new Map,Y=0,Ls="",jt=!1,Ur=!1,Ms=0,Gr=null,Ts,Cs=null,Ku=!0;function At(){let t=Ri.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Vu(t){let e=et(Number(Ri.store.maxEntries??Uu),ju,Gu);return t.length>e?t.slice(t.length-e):t}function Pi(t){Ri.store.entries=Vu(t)}function Jg(t){return t.replaceAll(ws,"").replace(/\n$/,"").trim()}function ks(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Bt);return n instanceof HTMLElement?n:nt()}function Qg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!qt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(ws,"").trim().length===0,last:i.toString().replaceAll(ws,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Wu(t){clearTimeout(Ts),Ts=setTimeout(()=>{if(t!==Ms)return;Ur=!1;let e=Cs;e&&us(e,Ku)},Xg)}function Yu(t,e,n){Ur=!0,Cs=t,Ku=n;let r=++Ms;oe(t,e,n),Wu(r)}function tb(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function zn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function eb(){document.querySelector(".bloom-ih-hud")?.remove()}function nb(t,e){let n=tb();n.textContent=t;let r=(e.closest("form")??kt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Yg)}px`,n.classList.add("bloom-ih-hud-on")}function As(t){let e=Jg(t);if(!e)return;let n=Date.now(),r=Ss.get(e);if(r&&n-r<Zg)return;Ss.set(e,n);let o=At().filter(i=>i!==e);o.push(e),Pi(o),Y=At().length,jt=!1,zn()}function rb(t,e){let n=At();if(!n.length&&t)return;Y>=n.length&&(Ls=qt(e),Y=n.length);let r=t?Y-1:Y+1;r<0||r>n.length||(Y=r,jt=!0,Yu(e,r===n.length?Ls:n[r],t),r<n.length?nb(`${r+1} / ${n.length}`,e):zn())}function ob(t){jt=!1,zn(),Yu(t,Ls,!1),Y=At().length}function ib(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=ks(t.target)??ks(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&jt&&!t.altKey&&!t.shiftKey){ob(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){As(qt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=At();if(!r){let i=Qg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||Y<=0)||!n&&Y>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),rb(n,e))}function ab(t){if(ks(t.target)){if(Ur){Wu(Ms);return}jt&&(jt=!1,zn(),Y=At().length)}}function sb(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Bt);n instanceof HTMLElement&&As(qt(n))}function lb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Bn);if(!n||!(n instanceof HTMLElement)||$(n))return;let r=nt();r&&As(qt(r))}function cb(t){if(!(!jt||Ur)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}jt=!1,zn()}}function ub(){if(Gr)return;Gr=new AbortController;let{signal:t}=Gr,e={capture:!0,signal:t};window.addEventListener("keydown",ib,e),window.addEventListener("input",ab,e),window.addEventListener("submit",sb,e),window.addEventListener("click",lb,e),window.addEventListener("pointerdown",cb,e)}function db(t){let e=At().slice();e.splice(t,1),Pi(e),Y>e.length&&(Y=e.length)}function mb(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=At().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(p=>p.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/Ni));n>=c&&(n=c-1);let l=s.slice(n*Ni,n*Ni+Ni);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),l.length){let p=document.createElement("div");p.className="bloom-ih-list",l.forEach((L,k)=>{let H=i.indexOf(L),mt=At().length-1-H,Rt=document.createElement("div");Rt.className="bloom-ih-item";let st=document.createElement("button");st.type="button",st.className=`bloom-ih-body${r===k?"":" bloom-ih-clamp"}`,st.textContent=L,st.addEventListener("click",()=>{r=r===k?-1:k,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let ft=document.createElement("button");ft.type="button",ft.title="Copy",ft.textContent="C",ft.addEventListener("click",()=>{lc(L)});let ee=document.createElement("button");ee.type="button",ee.title="Delete",ee.textContent="\xD7",ee.addEventListener("click",()=>{db(mt),o()}),O.append(ft,ee),Rt.append(st,O),p.appendChild(Rt)}),t.appendChild(p)}else{let p=document.createElement("p");p.className="bloom-ih-empty",p.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(p)}let d=document.createElement("div");d.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,o()});let b=document.createElement("span");b.textContent=`${n+1} / ${c}`;let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Next",f.disabled=n+1>=c,f.addEventListener("click",()=>{n+=1,o()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Pi([]),Y=0,o())}),d.append(m,b,f,g),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Xu=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Ri,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",zu),Y=At().length,jt=!1,ub()},stop(){Gr?.abort(),Gr=null,zn(),eb(),Ss.clear(),clearTimeout(Ts),Ur=!1,Cs=null,jt=!1},onSettingsChange(){let t=At(),e=Vu(t);e.length!==t.length&&Pi(e),Y>e.length&&(Y=e.length)}});var Hs="noShareLink",fb=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],pb=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Is=T({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Zu(t){return`${t.join(",")}{display:none!important}`}function Ju(){let t=[];if(Is.store.hideShareChat!==!1&&t.push(Zu(fb)),Is.store.hideShareProject!==!1&&t.push(Zu(pb)),!t.length){E(Hs);return}w(Hs,t.join(`
`))}var Qu=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Is,start:Ju,onSettingsChange:Ju,stop(){E(Hs)}});var nd="noDictation",gb=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],bb=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],rd=T({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function td(t){return`${t.join(",")}{display:none!important}`}function ed(){let t=[td(gb)];rd.store.hideDictationSettings!==!1&&t.push(td(bb)),w(nd,t.join(`
`))}var od=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:rd,start:ed,onSettingsChange:ed,stop(){E(nd)}});var Ns="noSidebarIdentity",jn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],sd=jn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),ld=jn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),hb=[...sd,...ld],yb=[...sd,...jn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],vb=jn.map(t=>`${t} a[href^="mailto:"]`),xb=jn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Eb=jn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Kr=T({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function id(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function wb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Sb(){return`${Eb.join(",")}{margin-block:auto!important}`}function Lb(){return`${xb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function ad(){let t=Kr.store.hideUsername!==!1,e=Kr.store.hideEmail!==!1,n=t&&Kr.store.enlargePlan!==!1,r=t&&Kr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(wb([...yb,...ld])),o.push(Sb())):o.push(id(hb))),e&&o.push(id(vb)),n&&o.push(Lb()),!o.length){E(Ns);return}w(Ns,o.join(`
`))}var cd=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Kr,start:ad,onSettingsChange:ad,stop(){E(Ns)}});var ud=`#bloom-rt-host {
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
`;var fd=new S("RecentTopics"),Kn="bloom-rt-host",pd="home",gd=/^\/c\/([a-z0-9_-]{8,})/i,kb=/\/c\/([a-z0-9_-]{8,})/i,bd=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Mb=new Set(["Backquote","IntlBackslash"]),Cb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Ab=140,Hb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),X=T({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Hb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Oi=null,Bi=null,ct=!1,Jr=!1,Vr=!1,Gt=0,an="",Gn=null,Wr=null,Un,Rs=null,Ps=null;function Ib(){let t=Number(X.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Yr(){let t=X.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Bs(){let t=X.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function hd(){let t=X.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ds(){let t=X.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function qi(t){let e=Ib();return t.length>e?t.slice(0,e):t}function Ut(t){return t===pd}function Xr(t,e=Ab){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function qs(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(gd)?.[1]??""}catch{return t.match(kb)?.[1]??""}}function sn(){let t=(location.pathname||"/").match(gd);if(t?.[1])return t[1];let n=Mt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return pd}function $s(t){if(Ut(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(qs(r.getAttribute("href")||"")!==t)continue;let o=Xr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return sn()===t&&e&&!/^ChatGPT$/i.test(e)?Xr(e,80):""}function Nb(t){if(Ut(t))return"New chat";let e=Bs()[t];if(e)return e;let n=qn(t);return n||$s(t)||"Chat"}function Rb(t){return Ds()[t]||""}function Pb(t){return hd()[t]||{}}function _s(t,e){if(!t||Ut(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Bs();n[t]!==e&&(n[t]=e,X.store.titles=n)}function Ob(t){t.type==="conversation-meta"&&(_s(t.conversationId,t.title),ct&&Vn())}function Bb(t,e){if(!t||Ut(t)||!e)return;let n=Ds();n[t]!==e&&(n[t]=e,X.store.projects=n)}function Db(t,e){if(!t||Ut(t)||!e.user&&!e.assistant)return;let n=hd(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,X.store.previews=n)}function Fs(t){if(!t||Ut(t)&&X.store.includeHome===!1)return;let e=Yr().filter(n=>n!==t);e.unshift(t),X.store.visits=qi(e)}function $i(){let t=X.store.includeHome!==!1;return qi(Yr().filter(n=>t||!Ut(n))).map(n=>({id:n,title:Nb(n),project:Rb(n),preview:Pb(n)}))}function dd(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Xr(o)}catch{return""}}function Zr(t){if(!t||Ut(t)||t!==sn())return;let e=$s(t);e&&_s(t,e);let n=dd("user"),r=dd("assistant");Db(t,{user:n,assistant:r});let o=vd(t);if(o){let i=yd(o);i&&Bb(t,i)}}function zs(){let t=Bs(),e=Ds(),n=[],r=new Set,o=!1,i=!1;try{for(let l of document.querySelectorAll('a[href*="/c/"]')){if(l.closest(`#${Kn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=qs(l.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Xr(l.textContent||"",80);d&&!bd.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let m=yd(l);m&&e[u]!==m&&(e[u]=m,i=!0)}}catch{}o&&(X.store.titles=t),i&&(X.store.projects=e);let a=Yr(),s=new Set(a),c=n.filter(l=>!s.has(l));c.length&&(X.store.visits=qi([...a,...c]))}function yd(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Xr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!bd.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function vd(t){if(Ut(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(qs(e.getAttribute("href")||"")===t)return e}catch{}return null}function qb(t){let e=vd(t);if(e){e.click();return}if(Ut(t)){location.assign("/");return}location.assign(`/c/${t}`)}function $b(){let t=sn();an&&an!==t&&Zr(an),an=t,Fs(t),zs();let e=$s(t);e&&_s(t,e),Zr(t)}function Di(){Un===void 0&&(Un=window.setTimeout(()=>{Un=void 0,$b()},120))}function _b(){Gn||(Gn=history.pushState.bind(history),Wr=history.replaceState.bind(history),history.pushState=function(...e){let n=Gn(...e);return Di(),n},history.replaceState=function(...e){let n=Wr(...e);return Di(),n})}function Fb(){Gn&&(history.pushState=Gn),Wr&&(history.replaceState=Wr),Gn=null,Wr=null}function zb(t){return Mb.has(t.code)||t.keyCode===192?!0:Cb.has(t.key)}function xd(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function jb(t,e){Jr=e,zs(),Zr(sn()),ct=!0,Gt=0;try{let n=sn();Fs(n);let r=$i();r.length>1&&(Gt=t?r.length-1:1)}catch(n){fd.error("Failed to open switcher:",n)}Vn()}function md(t){let{length:e}=$i();e&&(Gt=(Gt+(t?-1:1)+e)%e,Vn())}function js(){if(!ct)return;let t=$i()[Gt];ct=!1,Jr=!1,Vn(),t&&qb(t.id)}function Ed(){ct&&(ct=!1,Jr=!1,Vn())}function Gb(t){if(xd(t)){Vr=!0;return}if((t.ctrlKey||Vr)&&!t.altKey&&!t.metaKey&&zb(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{ct?md(t.shiftKey):jb(t.shiftKey,!0)}catch(n){fd.error("Hotkey failed:",n)}return}if(ct){if(t.key==="Escape"){t.preventDefault(),Ed();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),js();return}t.key==="Tab"&&(t.ctrlKey||Vr)&&(t.preventDefault(),md(t.shiftKey))}}function Ub(t){xd(t)&&(Vr=!1,ct&&Jr&&js())}function Kb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Di)}function Vb(t){!ct||(t.target instanceof Element?t.target:null)?.closest(`#${Kn}`)||Ed()}function Wb(){document.visibilityState==="hidden"&&Zr(sn())}function Os(t=Bi){t instanceof HTMLElement&&Qo(t,Jo("auto"),!0)}function Yb(){if(!document.body)return null;let t=document.getElementById(Kn);if(t instanceof HTMLElement)return Bi=t,Os(t),t;t=document.createElement("div"),t.id=Kn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),Bi=t,Os(t),t}function Vn(){let t=Yb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!ct){e.dataset.visible="false",e.replaceChildren();return}let n=$i();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Gt>=n.length&&(Gt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Gt?"true":"false",s.setAttribute("aria-selected",a===Gt?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let l=document.createElement("div");l.className="bloom-rt-project",l.textContent=i.project,s.append(l)}if(i.preview.user||i.preview.assistant){let l=document.createElement("div");if(l.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,l.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,l.append(u)}s.append(l)}s.addEventListener("click",()=>{Gt=a,js()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Xb(){document.getElementById(Kn)?.remove(),Bi=null}var wd=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Kn}`],settings:X,start(){w("recentTopics",ud),an=sn(),Fs(an),zs(),Zr(an),Rs=gt(Ob),_b(),Oi=new AbortController;let{signal:t}=Oi;window.addEventListener("keydown",Gb,{capture:!0,signal:t}),window.addEventListener("keyup",Ub,{capture:!0,signal:t}),window.addEventListener("popstate",Di,{signal:t}),document.addEventListener("click",Kb,{capture:!0,signal:t}),document.addEventListener("click",Vb,{signal:t}),document.addEventListener("visibilitychange",Wb,{signal:t}),Ps=Mn("schemeChange",()=>Os())},stop(){Oi?.abort(),Oi=null,Un!==void 0&&(clearTimeout(Un),Un=void 0),Fb(),Rs?.(),Rs=null,Ps?.(),Ps=null,ct=!1,Jr=!1,Vr=!1,Xb()},onSettingsChange(){let t=qi(Yr());t.length!==Yr().length&&(X.store.visits=t),ct&&Vn()}});var Gs="cleaner",Zb=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Jb=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Qb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],th=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],eh=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],nh=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],ln=T({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Wn(t){return`${t.join(",")}{display:none!important}`}function Sd(){let t=[];if(ln.store.hideDownloadApps!==!1&&t.push(Wn(Zb)),ln.store.hideDisclaimer!==!1&&t.push(Wn(Jb)),ln.store.hideUpgrade!==!1&&t.push(Wn(Qb)),ln.store.hideLockedModels!==!1&&t.push(Wn(th)),ln.store.hideHomePromo!==!1&&t.push(Wn(eh)),ln.store.hideAds!==!1&&t.push(Wn(nh)),!t.length){E(Gs);return}w(Gs,t.join(`
`))}var Ld=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:ln,start:Sd,onSettingsChange:Sd,stop(){E(Gs)}});var Fi=new S("ResponseNotification"),Xn=T({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:ch},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Us=!1,_i=null,Yn=null,Qr=null;function rh(){return document.visibilityState==="hidden"||document.hidden}function oh(){return Xn.store.onlyWhenHidden===!1?!0:rh()}function ih(){let t=qn(A());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Td(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!Yn||Yn.state==="closed")&&(Yn=new t);let e=Yn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Fi.debug("chime failed",t)}}function ah(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Fi.debug("custom sound failed",e),Td()}}function kd(){let t=String(Xn.store.soundUrl||"").trim();t?ah(t):Td()}function sh(){let t="Bloom++",e=`${ih()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Fi.debug("notification failed",n)}}function lh(){oh()&&(Xn.store.sound!==!1&&kd(),Xn.store.browserNotification!==!1&&sh())}function ch(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>kd()),t.appendChild(e),()=>{e.remove()}}var Md=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Xn,start(){Us=!0,_i?.(),_i=ot(t=>{if(!Us||t.userStopped||t.error)return;let e=A()||$n();t.conversationId&&t.conversationId!==e||lh()}),Qr?.abort(),Qr=new AbortController,Xn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Qr.signal}),Fi.debug("watch started")},stop(){Us=!1,_i?.(),_i=null,Qr?.abort(),Qr=null;try{Yn?.close()}catch{}Yn=null}});var Cd=`#bloom-pq-chip {
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
    pointer-events: auto;
}

html.dark #bloom-pq-chip {
    background: #252525;
    border-color: rgba(255, 255, 255, 0.08);
    color: #ececec;
}

.bloom-pq-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 2px 6px 8px;
    font-size: 14px;
    font-weight: 500;
}

.bloom-pq-row {
    position: relative;
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
    cursor: text;
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
    width: 16px;
    height: 16px;
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

button.bloom-pq-ico-danger:hover,
button.bloom-pq-ico-danger:focus-visible {
    color: var(--text-error, var(--text-token-text-error, #f93a37));
    background: color-mix(in srgb, var(--text-error, #f93a37) 12%, transparent);
}

button.bloom-pq-ico-active,
button.bloom-pq-ico-active:hover {
    background: rgba(0, 0, 0, 0.06);
    color: var(--text-primary, #0d0d0d);
}

html.dark button.bloom-pq-ico-active,
html.dark button.bloom-pq-ico-active:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ececec;
}

.bloom-pq-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: min(320px, 46vh);
    overflow: auto;
}

.bloom-pq-dragging {
    opacity: 0.35;
}

.bloom-pq-row.bloom-pq-drop-before::before,
.bloom-pq-row.bloom-pq-drop-after::after {
    content: "";
    position: absolute;
    left: 8px;
    right: 8px;
    height: 2px;
    border-radius: 1px;
    background: var(--text-primary, #0d0d0d);
    pointer-events: none;
}

.bloom-pq-row.bloom-pq-drop-before::before {
    top: -2px;
}

.bloom-pq-row.bloom-pq-drop-after::after {
    bottom: -2px;
}

.bloom-pq-grip {
    cursor: grab;
    opacity: 0.72;
}

.bloom-pq-grip:active {
    cursor: grabbing;
}

.bloom-pq-tip {
    flex: none;
    max-width: 46%;
    padding: 5px 10px;
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
}

.bloom-pq-tip[hidden] {
    display: none;
}

html.dark .bloom-pq-tip {
    background: #1f1f1f;
    color: #f5f5f5;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
}

@media (prefers-reduced-motion: reduce) {
    #bloom-pq-chip { transition: none; }
}
`;var Re=new S("PromptQueue"),Gi="bloom-pq-chip",Ad="promptQueue",Hd=80,dh=8,mh=50,fh=2e3,ph='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',gh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,bh=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Vs=T({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),Ne=new Map,Id=0,Vt=!1,Ht="",I="",Wt=!1,dt=!1,Pe=!1,R=null,to=null,zi=null,Ie,io,Kt=null,C=null,se=null,Oe=null,Nd="application/x-bloom-pq",z=!1,F=!1,at=!1;function Be(){return ie(Mt())}function Zn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function hh(t){let e=Zn(qt(t));if(e)return e;if(!Dt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),Zn(n.innerText||n.textContent||"")}catch{return""}}function Dd(){try{let t=document.querySelectorAll(ph),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function qd(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function $d(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&gh.test(n))return!0}}catch{}return!1}function ji(){let t=$n();if(!t)return!1;let e=A();return!e||e===t}function oo(){if(G()||ji())return!1;let t=Dd();if(!t)return!0;if(qd(t)||$d(t))return!1;try{if(t.querySelector(bh)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function yh(){if(_()||tn())return z=!1,!1;if(G()||ji())return z=!0,!0;let t=Dd();return t&&(qd(t)||$d(t))?(z=!0,!0):z&&!oo()?!0:(z=!1,!1)}function _d(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Bt);return n instanceof HTMLElement?n:null}function Rd(t){return _d(t)??nt()}function Ui(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Fd(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function vh(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?Zn(e.innerText||e.textContent||""):""}catch{return""}}function xh(){return Id+=1,`pq${Date.now().toString(36)}${Id.toString(36)}`}function Z(t){return Ne.get(t)??[]}function zd(t){return Z(t)[0]}function cn(t,e){e.length?Ne.set(t,e):Ne.delete(t)}function jd(t){if(!Z(t).length){F=!1,at=!1,I="";return}F=!0,at=!1,z=!0,I=""}function Pd(t){if(!Ht||Ht===t)return;let e=Ne.get(Ht);!e?.length||Ne.has(t)||U(Ht,t)&&(Ne.delete(Ht),Ne.set(t,e),I===Ht&&(I=t),R?.key===Ht&&(R.key=t),Re.debug("migrated pending",Ht,"\u2192",t))}function Ki(t){let e=Be(),n=Z(e);if(Vs.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),cn(e,n)}else if(n.length>=dh){Re.debug("queue full",e);return}else n.push({id:xh(),text:t,at:Date.now()}),cn(e,n);z=!0,R={key:e,text:t,turns:Fd(),ticks:3};let r=nt();r&&oe(r,"");try{ut()}catch(o){Re.error("chip",o)}Re.debug("queued",e,n.length,t.length)}function Gd(t,e){let n=Z(t).filter(r=>r.id!==e);if(cn(t,n),C===e&&(C=null),!n.length)I===t&&(I=""),R?.key===t&&(R=null);else if(R?.key===t){let r=R.text;n.some(o=>o.text===r)||(R=null)}ut()}function Eh(t,e,n){let r=Z(t).slice(),o=r.findIndex(s=>s.id===e);if(o<0||n<0)return;let i=n;if(i>o&&(i-=1),i===o||i<0||i>r.length-1)return;let[a]=r.splice(o,1);a&&(r.splice(i,0,a),cn(t,r),ut())}function Ks(t){Oe=null,t?.querySelectorAll(".bloom-pq-drop-before, .bloom-pq-drop-after").forEach(e=>{e.classList.remove("bloom-pq-drop-before","bloom-pq-drop-after")})}function wh(t,e){if(Oe===e)return;Oe=e,t.querySelectorAll(".bloom-pq-drop-before, .bloom-pq-drop-after").forEach(r=>{r.classList.remove("bloom-pq-drop-before","bloom-pq-drop-after")});let n=t.querySelectorAll(".bloom-pq-row");n.length&&(e>=n.length?n[n.length-1].classList.add("bloom-pq-drop-after"):n[e].classList.add("bloom-pq-drop-before"))}function Sh(){dt=!0,clearTimeout(io),io=setTimeout(()=>{dt=!1,io=void 0},fh)}function Lh(t){let e=Be(),n=Z(e).find(a=>a.id===t);if(!n)return;let r=nt();if(!r)return;let o=n.text;cn(e,Z(e).filter(a=>a.id!==t)),C===t&&(C=null),ut(),Sh(),oe(r,o);let i=Se();i&&!$(i)&&!gi(i)&&(i.click(),dt=!1),jd(e)}function eo(t){if(!Vt||Wt||F||G()||Be()!==t)return;let e=zd(t);if(!e){I="";return}if(Ft())return;let n=nt();if(!n)return;if(!we(n)){let o=Zn(qt(n));if(o&&o!==e.text)return}let r=Se();!r||$(r)||gi(r)||(Wt=!0,oe(n,e.text),clearTimeout(Ie),Ie=setTimeout(()=>Th(t,e.id,e.text),mh))}function Th(t,e,n){Ie=void 0;try{if(!Vt||F)return;let r=zd(t);if(!r||r.id!==e||r.text!==n||G()||Be()!==t)return;let o=nt();if(!o)return;let i=Zn(qt(o));if(i&&i!==n&&!we(o))return;i!==n&&oe(o,n);let a=Se();if(!a||$(a)||gi(a))return;a.click(),cn(t,Z(t).filter(s=>s.id!==e)),ut(),jd(t),Re.debug("drained",t,Z(t).length)}finally{Wt=!1}}function Ud(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=kt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Ws(){Kt?.remove(),Kt=null,C=null,se=null,Oe=null}var Xs="http://www.w3.org/2000/svg";function Kd(){let t=document.createElementNS(Xs,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function no(t){let e=Kd();for(let n of t){let r=document.createElementNS(Xs,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function kh(){let t=Kd(),e=[[9,5],[15,5],[9,12],[15,12],[9,19],[15,19]];for(let[n,r]of e){let o=document.createElementNS(Xs,"circle");o.setAttribute("cx",String(n)),o.setAttribute("cy",String(r)),o.setAttribute("r","1"),o.setAttribute("fill","currentColor"),t.append(o)}return t}function ro(t,e,n,r){let o=document.createElement("button");return o.type="button",o.className="bloom-pq-ico",o.setAttribute("aria-label",t),o.append(e),r&&Vd(o,r,t),o.addEventListener("mousedown",i=>i.preventDefault()),o.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),n()}),o}function Mh(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${Gi}`)}function Ys(){let t=Kt?.querySelector(".bloom-pq-editing");return t instanceof HTMLElement?t.innerText:null}function Ch(t){t.focus();let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function He(t,e){if(C!==t)return;if(C=null,e===null){ut();return}let n=Zn(e),r=Be();if(!n){Gd(r,t);return}let o=Z(r).find(i=>i.id===t);o&&(o.text=n),ut()}function Od(t){C!==t&&(C&&He(C,Ys()),Z(Be()).some(e=>e.id===t)&&(C=t,ut()))}function Vd(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function ut(){if(!Vt||!document.body){Ws();return}let t=Be(),e=Z(t);if(!e.length){Ws();return}C&&!e.some(l=>l.id===C)&&(C=null);let n=Kt;n?.isConnected||(n=document.createElement("div"),n.id=Gi,document.body.appendChild(n),Kt=n),n.replaceChildren();let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("span");i.textContent=`${r} Queued message${r===1?"":"s"}`;let a=document.createElement("span");a.className="bloom-pq-tip",a.hidden=!0,o.append(i,a);let s=document.createElement("div");s.className="bloom-pq-list";let c=null;for(let l of e){let u=document.createElement("div");u.className="bloom-pq-row";let d=C===l.id,m=document.createElement("span");if(m.className=d?"bloom-pq-text bloom-pq-editing":"bloom-pq-text",d)m.textContent=l.text,m.contentEditable="true",m.spellcheck=!1,m.setAttribute("role","textbox"),m.setAttribute("aria-label","Edit queued prompt"),m.addEventListener("keydown",f=>{f.stopPropagation(),f.key==="Enter"?(f.preventDefault(),f.shiftKey||He(l.id,m.innerText)):f.key==="Escape"&&(f.preventDefault(),He(l.id,null))}),m.addEventListener("blur",()=>He(l.id,m.innerText)),c=m;else{let f=l.text.length>Hd?`${l.text.slice(0,Hd)}\u2026`:l.text;m.textContent=f,m.title=l.text,m.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),Od(l.id)})}u.append(m);let b=document.createElement("div");if(b.className="bloom-pq-actions",d){let f=ro("Save",no(["M20 6 9 17l-5-5"]),()=>{He(l.id,m.innerText)},a),g=ro("Cancel",no(["M18 6 6 18","m6 6 12 12"]),()=>{He(l.id,null)},a);b.append(f,g)}else{let f=document.createElement("span");f.className="bloom-pq-ico bloom-pq-grip",f.setAttribute("aria-label","Drag to reorder"),f.draggable=!0,f.append(kh()),Vd(f,a,"Drag to reorder"),f.addEventListener("dragstart",k=>{se=l.id,Oe=null,k.dataTransfer?.setData(Nd,l.id),k.dataTransfer&&(k.dataTransfer.effectAllowed="move");let H=u.getBoundingClientRect();k.dataTransfer?.setDragImage(u,Math.max(0,k.clientX-H.left),Math.max(0,k.clientY-H.top));let mt=u;setTimeout(()=>{se===l.id&&mt.isConnected&&mt.classList.add("bloom-pq-dragging")},0)}),f.addEventListener("dragend",()=>{se=null;let k=Kt?.querySelector(".bloom-pq-list")??null;Ks(k),Kt?.querySelectorAll(".bloom-pq-dragging").forEach(H=>H.classList.remove("bloom-pq-dragging"))});let g=ro("Remove from queue",no(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{C&&C!==l.id&&He(C,Ys()),C=C===l.id?null:C,Gd(t,l.id)},a);g.classList.add("bloom-pq-ico-danger");let p=ro("Edit",no(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>Od(l.id),a),L=ro("Send now",no(["M12 19V5","M6 11 12 5l6 6"]),()=>{C&&C!==l.id&&He(C,Ys()),Lh(l.id)},a);b.append(f,g,p,L)}u.append(b),s.append(u)}if(s.addEventListener("dragover",l=>{if(!se)return;l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move");let u=[...s.querySelectorAll(".bloom-pq-row")],d=u.length;for(let m=0;m<u.length;m++){let b=u[m].getBoundingClientRect();if(l.clientY<b.top+b.height/2){d=m;break}}wh(s,d)}),s.addEventListener("drop",l=>{l.preventDefault();let u=l.dataTransfer?.getData(Nd)||se||"",d=Oe;se=null,Ks(s),!(d===null||!u)&&Eh(t,u,d)}),s.addEventListener("dragleave",l=>{let u=l.relatedTarget;u instanceof Node&&s.contains(u)||Ks(s)}),n.append(o,s),Ud(n),c){let l=c,u=C;queueMicrotask(()=>{C===u&&l.isConnected&&Ch(l)})}}function Ah(){if(!R)return;R.ticks-=1;let t=Z(R.key);if(t.length&&Fd()>R.turns){let e=vh();if(e&&e===R.text){Re.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===R.text){n=r;break}n>=0&&t.splice(n,1),cn(R.key,t),!t.length&&I===R.key&&(I=""),R=null,ut();return}}R.ticks<=0&&(R=null)}function Vi(t){return!yh()||!Dt(t)?"":hh(t)}function Hh(t){if(!Vt||t.isComposing||t.keyCode===229||t.key!=="Enter"||Mh(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||Wt)return;let e=Rd(t.target)??Rd(document.activeElement);if(!e)return;if(t.altKey||dt){dt=!1,Pe=!0,queueMicrotask(()=>{Pe=!1});return}let n=Vi(e);n&&(Ui(t),Ki(n))}function Ih(t){if(!Vt||Wt||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Pe){Pe=!1;return}if(dt){dt=!1;return}let e=_d(t.target);if(!e)return;let n=Vi(e);n&&(Ui(t),Ki(n))}function Nh(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||$(e))return null;let n=t.closest(Bn);if(n instanceof HTMLElement&&!$(n))return n;let r=Se();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Bd(t){if(!Vt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Gi}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&$(n)||Wt||!Nh(e))return;if(dt){dt=!1;return}let r=nt();if(!r)return;let o=Vi(r);o&&(Ui(t),Ki(o))}function Rh(t){if(!Vt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(pi)&&!e.querySelector(Bt)||Wt)return;if(Pe){Pe=!1;return}if(dt){dt=!1;return}let n=nt()??e.querySelector(Bt);if(!n)return;let r=Vi(n);r&&(Ui(t),Ki(r))}var Wd=y({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Ad,cleanupSelectors:[`#${Gi}`],settings:Vs,start(){Vt=!0;let t=Vs.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),Ht=Be(),I="",Wt=!1,dt=!1,Pe=!1,R=null,z=!_()&&!tn()&&(G()||ji()),F=!1,at=!1,C=null,se=null,Oe=null,w(Ad,Cd),to?.abort(),to=new AbortController;let{signal:e}=to,n={capture:!0,signal:e};window.addEventListener("keydown",Hh,n),document.addEventListener("beforeinput",Ih,n),document.addEventListener("pointerdown",Bd,n),document.addEventListener("click",Bd,n),document.addEventListener("submit",Rh,n),zi?.(),zi=ot({onFall(r){if(Vt){if(r.userStopped||r.error){z=!1,F=!1,at=!1,I="",ut();return}if(!(F&&!at)){if(F&&at){if(!oo())return;F=!1,at=!1,z=!1,I=r.contextKey,eo(r.contextKey);return}if(!oo()){Re.debug("unsettled fall; keep queue window");return}z=!1,I=r.contextKey,eo(r.contextKey)}}},onRise(){_()||tn()||(F&&(at=!0),z=!0)},onContext(r,o){o&&r&&!U(o,r)&&(z=!1,F=!1,at=!1,I="",Wt=!1,Ie!==void 0&&(clearTimeout(Ie),Ie=void 0)),Pd(r),Ht=r,ut()},onTick(r){Pd(r.contextKey),Ht=r.contextKey,Ah(),(_()||tn())&&(F=!1,at=!1,z=!1,I=""),F&&(G()||ji())&&(at=!0),F&&at&&oo()&&(F=!1,at=!1,z=!1,Z(r.contextKey).length&&(I=r.contextKey,eo(r.contextKey))),!F&&z&&oo()&&(z=!1,!I&&Z(r.contextKey).length&&(I=r.contextKey,eo(r.contextKey))),!F&&I&&I===r.contextKey&&eo(I),Z(r.contextKey).length&&!Kt?.isConnected?ut():Kt&&Ud(Kt)}}),ut(),Re.debug("watch started")},stop(){Vt=!1,zi?.(),zi=null,to?.abort(),to=null,clearTimeout(Ie),Ie=void 0,clearTimeout(io),io=void 0,Ne.clear(),R=null,I="",Wt=!1,dt=!1,Pe=!1,z=!1,F=!1,at=!1,se=null,Oe=null,Ws()}});var Yd=`.bloom-cls {
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
`;var Jd=new S("ChatListStatus"),Xd="chatListStatus",Xi="bloom-cls",Oh="bloom-cls",Bh=1200*1e3,Dh="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",It=new Map,Yt=!1,vt="",le=!1,tr=!1,xt=0,De=null,Qs=null,Jn=null,Zs=null,Wi=null,ao=null,Qn=!1,qe=new Set;function Yi(){return Date.now()}function Qd(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ce(t,e,n,r=!0){if(!(!t||!Yt)){if(e==="idle")It.delete(t);else{let o=It.get(t);o&&o.kind===e&&n!=="net"?o.at=Yi():It.set(t,{kind:e,at:Yi(),source:n})}r&&qh({v:1,id:t,kind:e,at:Yi()}),un()}}function qh(t){try{Jn?.postMessage(t)}catch{}}function $h(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ce(e.id,e.kind,"bc",!1)}function _h(){let t=Yi();for(let[e,n]of It)n.kind==="streaming"&&t-n.at>Bh&&It.delete(e)}function Fh(){let t=Qd();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Dh))continue;let o=ae(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Zd(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Js(t){let e=t.querySelector(`:scope > .${Xi}`);return e||null}function tl(){if(!Yt)return;_h();let t=A(),e=Fh();De?.disconnect();try{for(let n of e){let r=ae(n.getAttribute("href")||"");if(!r||!t||r!==t){Js(n)?.remove();continue}let i=It.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Js(n)?.remove();continue}let a=Js(n);a||(a=document.createElement("span"),a.className=Xi,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Zd("streaming")):i==="error"&&a.appendChild(Zd("error")))}}catch(n){Jd.debug("paint failed",n)}tm()}function un(){if(Yt){if(document.hidden){xt&&(cancelAnimationFrame(xt),xt=0),tl();return}xt||(xt=requestAnimationFrame(()=>{xt=0,Yt&&tl()}))}}function tm(){let t=Qd();if(!(De&&Qs===t&&t?.isConnected)){if(De?.disconnect(),Qs=t,!t){De=null;return}De=new MutationObserver(()=>un()),De.observe(t,{childList:!0,subtree:!0})}}function Zi(){return!!(Ye()||_r())}function zh(t){return!!(Qn||t&&qe.has(t)||!tr&&!_()&&Zi())}function jh(t){if(Yt){if(t.type==="post-start"){tr=!1,t.conversationId?(Qn=!1,qe.add(t.conversationId),le=!0,ce(t.conversationId,"streaming","net")):(Qn=!0,le=!0);return}if(t.type==="post-end"){if(Qn=!1,t.conversationId){qe.delete(t.conversationId);let e=A(),n=$n();(e?t.conversationId===e:t.conversationId===n)?ce(t.conversationId,t.error?"error":"done","net"):ce(t.conversationId,"idle","net")}Zi()||(le=!1)}}}function Gh(t,e){if(!Yt)return;if(U(e,t)){un();return}let n=A();if(vt&&vt!==n){qe.delete(vt);let r=It.get(vt);r&&r.kind!=="idle"&&ce(vt,"idle","local")}Qn=!1,le=!1,tr=!0,n&&It.get(n)?.kind==="streaming"&&It.get(n)?.source==="local"&&!qe.has(n)&&ce(n,"idle","local"),un()}function Uh(t){if(!Yt)return;let e=t.conversationId||A();if(vt&&e&&vt!==e){qe.delete(vt);let r=It.get(vt);r&&r.kind!=="idle"&&ce(vt,"idle","local"),le=!!(e&&qe.has(e))}if(e&&(vt=e),tr||_()){if(_()||Zi()||t.streaming){un();return}tr=!1}if(zh(e)&&(t.streaming||Zi())){le=!0,e&&ce(e,"streaming","local"),un();return}le&&(le=!1,e&&ce(e,Ft()?"error":"done","local")),un()}var em=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Xi}`],start(){Yt=!0,w(Xd,Yd);try{Jn=new BroadcastChannel(Oh)}catch{Jn=null}Jn?.addEventListener("message",$h),Zs=gt(jh),Wi?.(),Wi=ot({onTick:Uh,onContext:Gh}),ao?.abort(),ao=new AbortController,document.addEventListener("visibilitychange",()=>{Yt&&(xt&&(cancelAnimationFrame(xt),xt=0),tl())},{signal:ao.signal}),tm(),Jd.debug("sidebar status watch started")},stop(){Yt=!1,xt&&cancelAnimationFrame(xt),xt=0,ao?.abort(),ao=null,De?.disconnect(),De=null,Qs=null,Wi?.(),Wi=null,Zs?.(),Zs=null;try{Jn?.close()}catch{}Jn=null,It.clear(),qe.clear(),Qn=!1,le=!1,tr=!1,vt="",document.querySelectorAll(`.${Xi}`).forEach(t=>t.remove()),E(Xd)}});var rm="widerChat",om=40,im=96,am=64,sm=T({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:om,max:im,default:am}});function Kh(){return et(Number(sm.store.width??am),om,im)}function nm(){let t=Kh(),e=`min(100%,${t}rem)`;w(rm,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var lm=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:sm,start:nm,onSettingsChange:nm,stop(){E(rm)}});var el="composerOpacity",er='form[data-type="unified-composer"],form.w-full[data-type]',Vh=[`${er} [class*="corner-superellipse"]`,`${er} [class*="bg-token-bg-primary"]`,`${er} [class*="bg-token-main-surface"]`].join(","),Wh=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Yh="#thread-bottom-container,#thread-bottom",Xh=`${er} #prompt-textarea,${er} [contenteditable="true"]`,Zh="var(--bg-primary,var(--main-surface-primary,#ffffff))",nl=T({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Jh(){return et(Number(nl.store.opacity??100),0,100)}function Qh(){return et(Number(nl.store.blur??16),0,40)}function cm(){let t=Jh();if(t>=100){E(el);return}let e=Qh(),n=`color-mix(in srgb,${Zh} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(el,`${Yh}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Wh}{display:none!important}${er}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Vh}{background-color:${n}!important;background-image:none!important;${r}}${Xh}{background-color:transparent!important;background-image:none!important}`)}var um=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:nl,start:cm,onSettingsChange:cm,stop(){E(el)}});var dm=`#bloom-bn-host {
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
`;var e0=new S("BetterNavigator"),rl="betterNavigator",gm="bloom-bn-host",gn=60,n0=16,r0=1e3,o0=2.5,i0=.4,ta="\u6B63\u5728\u8F93\u51FA\u2026",sl="Image",a0="\u2753",s0="\u{1F916}",mm=/file_[0-9a-f]+/gi,l0="File",c0="Code",u0=".markdown, .whitespace-pre-wrap",fl=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),d0="img, picture, video, canvas",m0=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,f0=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,fo=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,p0=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,g0=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,b0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,h0=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,y0=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,v0=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,x0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),E0=2e3,w0=40,S0=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,L0=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),T0=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),k0=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),M0=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),la=T({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),rr=new Map,mo=new Map,Zt=new Set,ea=0,Nt=!1,de=!1,nr=!1,$e=null,po=null,fn=null,na=null,J=[],pn="",ra=0,oa=-1,pl=0,ia="",Et=0,ue=0,so,lo=null,Ji=null,ol=null,il=null,dn=null,ll=null,co=null,mn=null,or=null,uo=null;function ca(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function al(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function C0(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function A0(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)S0.test(C0(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=al(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||al(getComputedStyle(t).getPropertyValue("--thread-content-width"))||al(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function aa(t){try{return!!t.closest(T0)}catch{return!0}}function fm(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function ua(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function gl(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function H0(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Qi(t,e){if(t){mm.lastIndex=0;for(let n of t.matchAll(mm))e.add(n[0].toLowerCase())}}function I0(t){try{let e=new Set,n=s=>{H0(s)||(Qi(s.getAttribute("src")||"",e),Qi(s.getAttribute("srcset")||"",e),Qi(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Qi(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let c of s.querySelectorAll("[src], [srcset], [href]"))n(c)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=ua(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function N0(t,e){let n=I0(t),r=mo.get(e)??0,o=Math.max(r,n);return o>0&&mo.set(e,o),o>=2?`${sl} x${o}`:sl}function K(t){return t.replace(/\s+/g," ").trim()}function bm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(k0))return!0;n=n.parentElement}return!1}function sa(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(bm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(fl);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return K(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<gn+20;)e.push(K(r.textContent||""));return K(e.join(" "))}function go(t){let e=K(t);return e.length<3||e.length>180||fo.test(e)?!1:m0.test(e)?!0:f0.test(e)}function da(t){let e=K(t);return e.length<8||e.length>120||/\s/.test(e)||fo.test(e)||go(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function R0(t){let e=[],n=i=>{let a=K(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(K(s[1])),e.push(K(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function P0(t){try{return aa(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function bl(t){let e=K(t);return!e||hl(e)||da(e)?!0:go(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function O0(t){return!t.length||t.length>4||!t.every(e=>bl(e))?!1:t.some(e=>fo.test(K(e))||go(e)||da(e))}function hm(t){try{let e=null,n=0,r=`${fl}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(P0(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=R0(o);if(!i.length||i.length>4||i.join(" ").length>240||!O0(i))continue;let a=i.some(l=>fo.test(K(l))),s=i.some(l=>go(l)||da(l)),c=a&&s?3:s?2:1;c>=n&&(e=o,n=c)}return e}catch{return null}}function B0(t){return hm(t)?l0:""}function D0(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(p0.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function q0(t){try{for(let e of t.querySelectorAll(d0))if(!D0(e))return!0}catch{}return!1}function hl(t){let e=K(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||h0.test(e)||b0.test(e)?!0:e.length<=24&&(y0.test(e)||fo.test(e))}function $0(t){let e=[],n=new Set,r=o=>{try{if(bm(o,t)||o.closest(fl))return}catch{return}let i=sa(o);!i||n.has(i)||hl(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>gn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(sa(o).length<24)&&(r(o),e.join(" ").length>gn+20))break}}catch{}return K(e.join(" "))}function _0(t){let e=hm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=K(i.innerText||i.textContent||"");!a||a.length>gn+20||r.has(a)||bl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return K(n.join(" "))}function F0(t,e){let n=[];try{for(let o of t.querySelectorAll(u0)){if(aa(o))continue;let i=sa(o);if(!(!i||e==="assistant"&&hl(i)||bl(i))&&(n.push(i),n.join(" ").length>gn+20))break}}catch{}let r=K(n.join(" "));if(e==="user"){let o=_0(t);if(o)return o}return r||(e==="assistant"?$0(t):"")}function z0(t){return t.length>gn?`${t.slice(0,gn).trimEnd()}\u2026`:t}function pm(t){return v0.test(t)}function j0(t,e,n,r){let o=F0(t,e);if(o)return z0(o);if(r)return ta;let i=B0(t);if(i)return i;if(gl(t))return N0(t,ua(t));try{if(q0(t))return sl;if(t.querySelector("pre, code"))return c0}catch{}return`Message ${n+1}`}function G0(){if(de)return!0;let t=A();return!!(t&&Zt.has(t)||!nr&&!_()&&bo())}function bo(){return!!(Ye()||_r())}function U0(){ea=Date.now()}function ym(t){de=!1,t&&Zt.delete(t);let e=A();e&&Zt.delete(e)}function K0(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function V0(t){if(gl(t)||!bo())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!sa(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function yl(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=K(e.textContent||"");if(!(n.length>32)&&g0.test(n))return!0}}catch{}return!1}function vm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function W0(t,e){try{if(K0(t))return!0;if(!e)return!1;if(V0(t)||yl(t))return!0}catch{}return!1}function xm(t){if(!t||bo())return!1;try{if(yl(t)||vm(t))return!1;if(t.querySelector(x0)||gl(t))return!0}catch{}return!1}function Y0(t){if(bo()||ea&&Date.now()-ea<E0)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!xm(e.el)||ym()}function X0(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(L0)){if(aa(r))continue;let i=ua(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(aa(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function Z0(){let t=ca();if(!t||t===document.body)return[];let e=la.store.showAssistant!==!1,n=e&&G0(),r=X0(t),o=null;if(e)for(let a of r)fm(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=ua(a);if(!s)continue;let c=fm(a);if(c!=="user"&&c!=="assistant"||c==="assistant"&&!e)continue;let l=a===o,u=l&&yl(a),d=l&&vm(a),m=c==="assistant"&&l&&!xm(a)&&(u||d||n||W0(a,!0)),b=j0(a,c,i.length,m);if(b&&b!==ta){let g=rr.get(s),p=!!g&&(go(g)||da(g));(!g||p||!pm(b)||pm(g))&&b!==g&&rr.set(s,b)}let f=m&&b===ta?ta:rr.get(s)||b;i.push({id:s,el:a,role:c,text:f,live:m})}}catch{}return Y0(i),i}function J0(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Em(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function Q0(t){return t===window?window.innerHeight:t.clientHeight}function ty(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(M0)}catch{return!1}}function wm(){so!==void 0&&(clearTimeout(so),so=void 0),lo?.classList.remove("bloom-bn-flash"),lo=null}function ey(t){wm(),t.classList.add("bloom-bn-flash"),lo=t,so=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),lo===t&&(lo=null),so=void 0},800)}function cl(t){if(!J.length)return;let e=Math.max(0,Math.min(t,J.length-1));ra=e,po?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),fn?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),na&&(na.textContent=`${e+1} / ${J.length}`);let n=fn?.children[e];if(n instanceof HTMLElement){let r=fn;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function ul(t){let e=J[t];if(!e?.el.isConnected)return;oa=t,pl=Date.now()+r0,cl(t);let n=or??Em(e.el),o=Math.abs(e.el.getBoundingClientRect().top-J0())>o0*Q0(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),la.store.jumpEffect!=="none"&&ey(e.el)}function vl(){if(!Nt||!J.length)return;if(Date.now()<pl&&oa>=0){cl(oa);return}let t=window.innerHeight*i0,e=0;for(let n=0;n<J.length;n++){let r=J[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}cl(e)}function ny(t){let e=Em(t);if(or===e&&uo)return;uo?.(),or=e;let n=e===window?document:e,r=()=>{vl(),xl()};n.addEventListener("scroll",r,{passive:!0}),uo=()=>n.removeEventListener("scroll",r)}function ry(t){mn?.disconnect(),mn=null;let e=or instanceof HTMLElement?or:null;mn=new IntersectionObserver(()=>vl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&mn.observe(n.el)}function oy(){if(!document.body)return null;let t=$e;if(t?.isConnected)return t;t=document.createElement("div"),t.id=gm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),$e=t,po=e,fn=i,na=o,t}function Sm(){let t=$e,e=ca();if(!t||!e||!e.isConnected||J.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=A0(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),c=s-a;if(c<96||n.width<160){t.hidden=!0;return}let l=t.offsetWidth||w0,d=n.right-r.right>=l+8?r.right+4:r.right-12-l;d=Math.min(d,n.right-l-8),d=Math.max(8,d);let m=Math.max(8,Math.round(window.innerWidth-d-l));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(c)}px`,t.style.right=`${m}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(c)}px`)}function xl(){!Nt||ue||(ue=requestAnimationFrame(()=>{ue=0,Nt&&Sm()}))}function iy(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function ay(t){let e=po,n=fn;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>n0),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=iy(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",l=>{l.preventDefault(),ul(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?a0:s0;let c=document.createElement("span");c.className="bloom-bn-label",c.textContent=r.text,c.title=r.text,a.append(s,c),a.addEventListener("click",l=>{l.preventDefault(),ul(o)}),n.appendChild(a)}))}function sy(t){po?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=fn?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function ly(){let t=A();return t===ia?!1:(ia=t,rr.clear(),mo.clear(),J=[],pn="",ra=0,oa=-1,pl=0,de&&t&&(Zt.add(t),de=!1),!0)}function cy(t){let e=la.store.showAssistant!==!1?"1":"0";return`${ia}|${e}|${t.map(n=>n.id).join(",")}`}function dl(){if(!Nt)return;ly();let t=Z0(),e=ca();if(!e||t.length<1){J=t,pn="",$e&&($e.hidden=!0),mn?.disconnect(),ml();return}oy();let n=cy(t);n!==pn?(J=t,pn=n,ay(t),ny(e),ry(t)):(J=t,sy(t)),Sm(),vl(),ml()}function Xt(){if(Nt){if(document.hidden){Et&&(cancelAnimationFrame(Et),Et=0),dl();return}Et||(Et=requestAnimationFrame(()=>{Et=0,Nt&&dl()}))}}function ml(){let t=ca();if(!(dn&&ll===t&&t?.isConnected)){if(dn?.disconnect(),co?.disconnect(),ll=t,!t||t===document.body){dn=null;return}dn=new MutationObserver(()=>Xt()),dn.observe(t,{childList:!0,subtree:!0}),co=new ResizeObserver(()=>xl()),co.observe(t)}}function uy(t){if(Nt){if(t.type==="post-start"){U0(),nr=!1,t.conversationId?(de=!1,Zt.add(t.conversationId)):de=!0,Xt();return}if(t.type==="post-end"){if(de=!1,t.conversationId)Zt.delete(t.conversationId);else{let e=A();e&&Zt.delete(e)}Xt()}}}function dy(t){if(!Nt||!J.length||$e?.hidden||t.altKey||t.ctrlKey||t.metaKey||ty(t.target))return;let e=-1;if(t.key==="ArrowDown")e=ra+1;else if(t.key==="ArrowUp")e=ra-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=J.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),ul(Math.max(0,Math.min(e,J.length-1)))}function my(){wm(),mn?.disconnect(),mn=null,dn?.disconnect(),dn=null,ll=null,co?.disconnect(),co=null,uo?.(),uo=null,or=null,$e?.remove(),$e=null,po=null,fn=null,na=null}var Lm=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:rl,cleanupSelectors:[`#${gm}`],settings:la,start(){Nt=!0,ia=A(),w(rl,dm),Ji=new AbortController;let{signal:t}=Ji;window.addEventListener("keydown",dy,{signal:t}),window.addEventListener("popstate",Xt,{signal:t}),window.visualViewport?.addEventListener("resize",xl,{signal:t}),document.addEventListener("visibilitychange",()=>{Nt&&(Et&&(cancelAnimationFrame(Et),Et=0),ue&&(cancelAnimationFrame(ue),ue=0),dl())},{signal:t}),il=gt(uy),ol=ot({onTick(){if(_()){Xt();return}nr&&!bo()&&(nr=!1),Xt()},onFall(e){ym(e.conversationId),Xt()},onContext(e,n){if(!U(n,e)){rr.clear(),mo.clear(),pn="",de=!1;let r=A();for(let o of[...Zt])o!==r&&Zt.delete(o);nr=!0}Xt()}}),ml(),Xt(),e0.debug("navigator started")},stop(){Nt=!1,Et&&cancelAnimationFrame(Et),Et=0,ue&&cancelAnimationFrame(ue),ue=0,Ji?.abort(),Ji=null,ol?.(),ol=null,il?.(),il=null,Zt.clear(),de=!1,nr=!1,ea=0,my(),rr.clear(),mo.clear(),J=[],pn="",E(rl)},onSettingsChange(){pn="",Xt()}});var Tm=`.bloom-ts {
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
`;function km(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Mm(t){try{return new Date(t).toISOString()}catch{return""}}var Hm=new S("MessageTimestamps"),Cm="messageTimestamps",fa="bloom-ts",Am=1500,py="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",ir=T({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),ar=new Map,yn=!1,wt=0,_e=null,wl=null,El=null,ma=null,ho=null,yo=!1,bn=!1;function Im(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Ll(){let t=ir.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Nm(){let t={...Ll()};for(let[n,r]of ar)t[n]=r;let e=Object.keys(t);if(e.length>Am){let n=e.slice(e.length-Am),r={};for(let o of n)r[o]=t[o];ir.store.stamps=r;return}ir.store.stamps=t}var gy=cc(Nm,500);function Rm(t,e){!t||!e||ar.get(t)===e||(ar.set(t,e),gy(),hn())}function by(t){return t?ar.get(t)??Ll()[t]??xi(t)??null:null}function hy(t){yn&&t.type==="message-time"&&Rm(t.messageId,t.createTime)}function yy(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function vy(){let t=Im();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(py)||e.push(n)}catch{}return e}function xy(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Sl(){if(!yn)return;let t=ir.store.hideOwnMessages===!0,e=ir.store.showDate!==!1,n=G();bn&&!_()&&(bn=!1),bn&&(n?yo=!1:bn=!1);let r=bn?!1:n,o=vy();_e?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",c=yy(i),l=i.querySelector(`:scope > .${fa}`);if(t&&c==="user"){l?.remove();return}if(xy(i)){l?.remove();return}let u=by(s);if(!u&&s&&(r||yo)&&a>=o.length-2&&(u=Date.now(),Rm(s,u)),!u){l?.remove();return}let d=km(u,e);if(!d){l?.remove();return}let m=l;m||(m=document.createElement("time"),m.className=fa,m.setAttribute("aria-hidden","true"),i.insertBefore(m,i.firstChild)),m.textContent!==d&&(m.textContent=d);let b=Mm(u);b&&m.getAttribute("datetime")!==b&&m.setAttribute("datetime",b)})}catch(i){Hm.debug("paint failed",i)}yo=r,Pm()}function hn(){if(yn){if(document.hidden){wt&&(cancelAnimationFrame(wt),wt=0),Sl();return}wt||(wt=requestAnimationFrame(()=>{wt=0,yn&&Sl()}))}}function Pm(){let t=Im();if(!(_e&&wl===t&&t?.isConnected)){if(_e?.disconnect(),wl=t,!t||t===document.body){_e=null;return}_e=new MutationObserver(()=>hn()),_e.observe(t,{childList:!0,subtree:!0})}}var Om=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${fa}`],settings:ir,start(){yn=!0,w(Cm,Tm);let t=Ll();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&ar.set(e,n);El=gt(hy),ma?.(),ma=ot({onTick:hn,onFall:hn,onContext(e,n){U(n,e)||(bn=!0,yo=!1),hn()}}),ho?.abort(),ho=new AbortController,document.addEventListener("visibilitychange",()=>{yn&&(wt&&(cancelAnimationFrame(wt),wt=0),Sl())},{signal:ho.signal}),Pm(),hn(),Hm.debug("timestamp watch started")},stop(){yn=!1,wt&&cancelAnimationFrame(wt),wt=0,ho?.abort(),ho=null,_e?.disconnect(),_e=null,wl=null,ma?.(),ma=null,El?.(),El=null,bn=!1,yo=!1,Nm(),ar.clear(),document.querySelectorAll(`.${fa}`).forEach(t=>t.remove()),E(Cm)},onSettingsChange:hn});var Tl="streamerMode",Ey="filter:blur(6px)!important;transition:filter .2s ease",wy="filter:none!important",sr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],lr=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function St(t,e){return t.map(n=>`${n} ${e}`)}var vn=T({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function cr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Ey}}${e?`${r}{${wy}}`:""}`}function Bm(){let t=[];if(vn.store.conversations!==!1&&(t.push(cr([...St(lr,'a[href^="/c/"]'),...St(lr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),vn.store.projects!==!1&&(t.push(cr([...St(lr,'a[href*="/project"]'),...St(lr,'a[href*="/g/g-p-"]'),...St(lr,'[data-testid="project-name"]'),...St(lr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),vn.store.headerTitle!==!1&&t.push(cr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),vn.store.accountAvatar!==!1&&t.push(cr([...St(sr,"img"),...St(sr,'[class*="avatar"]'),...St(sr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),vn.store.accountName!==!1&&t.push(cr([...St(sr,".min-w-0 > .truncate"),...St(sr,".min-w-0.flex-1 .truncate")],!1)),vn.store.accountEmail!==!1&&t.push(cr([...St(sr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){E(Tl);return}w(Tl,t.join(`
`))}var Dm=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:vn,start:Bm,onSettingsChange:Bm,stop(){E(Tl)}});var qm=`.bloom-gc-panel {
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
}`;var Ly=new S("GreetingCustomizer"),ur="greetingCustomizer",$m="greetingCustomizerUi",vo=100,Ml=30,Ty=120,ky=1e3,My=50,Cy=40,Ay=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),xo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),ya=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Hy(t){return!!t?.closest(Ay)}function jm(t){return!!(Hy(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Mo(t){try{for(let e of document.querySelectorAll(t))if(!jm(e))return e}catch{}return null}function kl(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Mo(e))return e;return t}var Gm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],Q=T({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Ky},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Gm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Jt=!1,fr=!1,En=null,ga,Eo,dr,wo,ba=0,pa=null,mr=null,So=null,Lo=null,To=null,ha=null;function fe(){let t=location.pathname||"/";return t==="/"||t===""}function xn(){let t=Q.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Gm.slice()}function ko(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function _m(t){Q.store.greetings=t.slice(0,Ml)}function Co(){let t=String(Q.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Iy(){return Q.store.order==="random"?"random":"sequential"}function Ny(){return et(Number(Q.store.intervalSec??10),1,3600)*1e3}function Ry(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Py(){return!!Mo(ya)}function va(){return!!(Mo(ya)||Mo(xo))}function Oy(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Py()?kl(ya):Mo(xo)?kl(xo):kl(ya),i=e?`${xo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function By(t,e){if(t<=0)return 0;if(t===1)return Number(Q.plain.index)!==0&&(Q.store.index=0),Number(Q.plain.lastRandom)!==0&&(Q.store.lastRandom=0),0;let n=Number(Q.plain.index),r=Number(Q.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Iy()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),c=0;for(;s===a&&c++<10;)s=Math.floor(Math.random()*t);return Q.store.index=s,Q.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return Q.store.index=i,i}function me(t){if(!Jt)return;if(!fe()){E(ur);return}let e=xn().map(ko).filter(Boolean);if(!e.length){E(ur);return}let n=By(e.length,t),r=e[n]??e[0],o=Co()==="manual"&&e.length>1;w(ur,Oy(Ry(r),o)),ha?.()}function Cl(){ga!==void 0&&(clearInterval(ga),ga=void 0)}function Al(){Cl(),!(!Jt||!fe())&&Co()==="interval"&&(xn().filter(Boolean).length<=1||(ga=setInterval(()=>me(!0),Ny())))}function Hl(){wo!==void 0&&(clearTimeout(wo),wo=void 0),ba=0}function Fm(){if(Hl(),!Jt||!fe())return;ba=Cy;let t=()=>{if(wo=void 0,!(!Jt||!fe())){if(va()){Co()==="refresh"&&!fr?(fr=!0,me(!0)):me(!1),Al();return}ba-=1,ba>0&&(wo=setTimeout(t,My))}};t()}function Il(){if(En===!0){va()?me(!1):Fm();return}En=!0,fr=!1,Co()==="refresh"?(fr=!0,me(!0)):me(!1),Al(),va()||Fm()}function Nl(){En=!1,fr=!1,Cl(),Hl(),E(ur)}function xa(){dr===void 0&&(dr=window.setTimeout(()=>{dr=void 0,Jt&&(fe()?Il():En!==!1&&Nl())},Ty))}function Dy(){mr||(mr=history.pushState.bind(history),So=history.replaceState.bind(history),Lo=function(...e){let n=mr(...e);return xa(),n},To=function(...e){let n=So(...e);return xa(),n},history.pushState=Lo,history.replaceState=To)}function qy(){Lo&&history.pushState===Lo&&mr&&(history.pushState=mr),To&&history.replaceState===To&&So&&(history.replaceState=So),mr=null,So=null,Lo=null,To=null}function $y(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(xa)}function _y(t){if(!Jt||!fe()||Co()!=="manual"||xn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(xo);if(!n||jm(n))return;let r=window.getSelection?.();r&&String(r).trim()||me(!0)}function Fy(){Eo===void 0&&(Eo=setInterval(()=>{if(!Jt)return;let t=fe();if(t!==(En===!0)){t?Il():Nl();return}t&&va()&&me(!1)},ky))}function zy(){Eo!==void 0&&(clearInterval(Eo),Eo=void 0)}function zm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var jy="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Gy="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Uy(t,e){let n=ko(t);return n?n.length>vo?`Keep it to ${vo} characters.`:xn().length+(e?1:0)>Ml?`At most ${Ml} greetings.`:null:"Enter a greeting."}function Ky(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=xn(),s=Number(Q.plain.index);t.replaceChildren();let c=document.createElement("div");c.className="bloom-gc-composer";let l=document.createElement("textarea");l.className="bloom-gc-input",l.rows=3,l.maxLength=vo,l.placeholder="New greeting (line breaks ok)",l.value=e,l.addEventListener("input",()=>{e=l.value,r="";let p=c.querySelector(".bloom-gc-count");p&&(p.textContent=`${ko(e).length}/${vo}`);let L=c.querySelector(".bloom-gc-error");L&&(L.textContent="")}),c.appendChild(l);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${ko(e).length}/${vo}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=r;let b=document.createElement("div");if(b.className="bloom-gc-actions",n>=0){let p=document.createElement("button");p.type="button",p.className="bloom-gc-btn",p.textContent="Cancel",p.addEventListener("click",()=>{n=-1,e="",r="",i()}),b.appendChild(p)}let f=document.createElement("button");if(f.type="button",f.className="bloom-gc-btn bloom-gc-btn-primary",f.textContent=n>=0?"Update":"Add",f.addEventListener("click",()=>{let p=n<0,L=Uy(e,p);if(L){r=L,i();return}let k=ko(e),H=xn().slice();n>=0&&n<H.length?H[n]=k:H.push(k),_m(H),n=-1,e="",r="",i()}),b.appendChild(f),u.append(d,m,b),c.appendChild(u),t.appendChild(c),!a.length){let p=document.createElement("p");p.className="bloom-gc-empty",p.textContent="No greetings. The official heading stays.",t.appendChild(p);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((p,L)=>{let k=document.createElement("div");k.className="bloom-gc-item",L===s&&(k.dataset.active="true");let H=document.createElement("button");H.type="button",H.className=`bloom-gc-body${o===L?"":" bloom-gc-clamp"}`,H.textContent=p,H.addEventListener("click",()=>{o=o===L?-1:L,i()});let mt=document.createElement("div");mt.className="bloom-gc-item-actions";let Rt=zm("Edit",jy);Rt.addEventListener("click",()=>{n=L,e=p,r="",i()});let st=zm("Delete",Gy);st.addEventListener("click",()=>{let O=xn().filter((ft,ee)=>ee!==L);_m(O),n===L?(n=-1,e=""):n>L&&(n-=1),i()}),mt.append(Rt,st),k.append(H,mt),g.appendChild(k)}),t.appendChild(g)};return ha=i,i(),()=>{ha===i&&(ha=null),t.replaceChildren()}}var Um=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:$m,settings:Q,start(){Jt=!0,w($m,qm),Dy(),pa=new AbortController;let{signal:t}=pa;window.addEventListener("popstate",xa,{signal:t}),document.addEventListener("click",$y,{capture:!0,signal:t}),document.addEventListener("click",_y,{signal:t}),Fy(),En=null,fe()?Il():Nl(),Ly.debug("started")},stop(){Jt=!1,pa?.abort(),pa=null,dr!==void 0&&(clearTimeout(dr),dr=void 0),Cl(),Hl(),zy(),qy(),E(ur),fr=!1,En=null},onSettingsChange(){Jt&&(fe()?(me(!1),Al()):E(ur))}});function Vy(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Ea(t){try{return await createImageBitmap(t)}catch{return null}}async function Wy(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function wa(t){if(t.startsWith("data:")){let e=Vy(t);if(e){let n=await Ea(e);if(n)return n}return Wy(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Ea(await e.blob()):null}catch{return null}}var La="data-bloom-csi-slot",Yy="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Xy=/\bsize-(?:[6-9]|10)\b/,Zy=/\b(?:h|w)-(?:[6-9]|10)\b/,Jy=/^(plus|pro|free|team|go|business|enterprise)$/i,Qy=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Sa(t){return t.getAttribute("class")||""}function Vm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Xy.test(t)?!0:Zy.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function tv(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Wm(e)}function Wm(t){return Jy.test(String(t??"").replace(/\s+/g,""))}function Qt(t){return!!t?.closest(Yy)}function Ta(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Ao(t){let e=Sa(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Wm(t.textContent||"")}function ka(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Ho(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function ev(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Ym(t){if(Qt(t)||ka(t)||Ho(t)||Ao(t)||Ta(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Xm(t){return Qt(t)||ka(t)||Ho(t)||Ao(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:tv(t.textContent||"")}function Zm(t){return Qt(t)||Ho(t)||Ta(t)||Ao(t)?!1:Vm(Sa(t))||Xm(t)?!0:Ym(t)}function Km(t){return!(Qt(t)||Ta(t)||Ho(t)||Ao(t)||ka(t))}function wn(t,e){let n=ka(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Ho(n)||Ta(n)||Ao(n));)Qt(n)||(r=n),n=n.parentElement;return r}function nv(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Qt(e))continue;if(ev(Sa(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Km(o))){if(Zm(o)||Vm(Sa(o)))return wn(o,t)??o;r.push(o)}if(r.length===1)return wn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Km(r))return wn(r,t)??r}}return null}function rv(t){let e=t.querySelectorAll(Qy);for(let n of e)if(Zm(n))return wn(n,t)??n;return null}function ov(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Xm(e))return wn(e,t)??e;return null}function iv(t){for(let e of t.querySelectorAll("*"))if(Ym(e))return wn(e,t)??e;return null}function Jm(t,e){if(Qt(t))return null;if(e&&!Qt(e)&&t.contains(e)){let n=wn(e,t);if(n)return n}return nv(t)??rv(t)??ov(t)??iv(t)}function Qm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var pr="data-bloom-csi",Ma="data-bloom-csi-orig",Sn=new Set,tf=null;function Pl(t){tf=t}function ef(t){return`url(${JSON.stringify(t)})`}function Ca(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Ol(t,e,n){let r=ef(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function nf(t,e=La){let n=ef(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function av(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function gr(t){t.removeEventListener("error",Rl);let e=t.getAttribute(Ma);t.removeAttribute(pr),t.removeAttribute(Ma),e&&t.getAttribute("src")!==e&&(t.src=e)}function Rl(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Sn.add(n),gr(e),tf?.()}function rf(t,e){if(!e||Sn.has(e)){gr(t);return}av(t);let n=t.getAttribute("src")??"";if(t.getAttribute(pr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Ma)&&t.setAttribute(Ma,n);t.setAttribute(pr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Rl),t.addEventListener("error",Rl),n!==e&&(t.src=e)}var of=`/*
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
`;var af=new S("CustomSidebarIdentity"),sf="customSidebarIdentityUi",uf="customSidebarIdentity",lv="bloom-csi-face",cv="bloom-csi-name",br=La,uv=1024,Aa=256,df=24,mf=64,ff=40,$l=1,_l=4,Io=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Bl=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=T({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Cv},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:df,max:mf,default:ff},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Tn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function dv(){return String(x.store.displayName??"").trim()}function Na(t,e,n,r,o){let i=et(n,$l,_l),a=Math.min(t,e)/i,s=et(r,a/2,Math.max(a/2,t-a/2)),c=et(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:c}}function mv(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Fl(t){let e=Math.min(1,uv/Math.max(t.width,t.height));return mv(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function fv(t,e,n,r){let{side:o,x:i,y:a}=Na(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Aa,s.height=Aa;let c=s.getContext("2d");if(!c)return null;c.imageSmoothingEnabled=!0,c.imageSmoothingQuality="high",c.drawImage(t,i-o/2,a-o/2,o,o,0,0,Aa,Aa);let l=s.toDataURL("image/png");return l.startsWith("data:image/")?l:null}async function pv(t){let e=await Ea(t);if(!e)return null;let n=Fl(e);return e.close(),n}async function jl(t,e,n,r){let o=await wa(t);if(!o)return null;let i=fv(o,e,n,r);return o.close(),i}function Gl(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function lf(){x.store.avatarUrl="",x.store.avatarSource="",Gl()}var cf=0;async function zl(t){let e=++cf;Gl(),x.store.avatarSource=t;let n=await jl(t,.5,.5,1);return e!==cf?!1:(n&&(x.store.avatarUrl=n),!!n)}function No(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Dl(t){let e=No(t);if(!e)return!1;let n=await pv(e);return n?zl(n):!1}var Lt=!1,hr=!1,yr=0,Ra=0,Ha=null,Fe=new Map,vr=null,pe=null,Pa=null,te=null,Oa=null;function Ba(t){let e=String(t??"").trim();if(!e||Sn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function pf(){return Ba(x.store.avatarUrl)??Ba(x.store.avatarSource)}var Ia=!1,ql=new Set;function gf(){let t=Ba(x.store.avatarSource);if(!t?.startsWith("data:image/")||Ba(x.store.avatarUrl)?.startsWith("data:image/")||Ia||ql.has(t))return;Ia=!0;let e=Tn(x.store.cropX,.5),n=Tn(x.store.cropY,.5),r=Tn(x.store.cropZoom,1);jl(t,e,n,r).then(o=>{if(Ia=!1,!o){ql.add(t);return}Lt&&(x.store.avatarUrl=o,Da())}).catch(()=>{Ia=!1,ql.add(t)})}function Ln(t,e){return t.map(n=>`${n} ${e}`)}function gv(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function bv(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=gv(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function bf(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Qt(n)||n.closest(".min-w-0")||e.push(n);return e}function hv(t){let e=bf(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Ul(){let t=[],e=Ue();e&&t.push(e);let n=Nn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Io.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function hf(t,e){let n=hv(t);if(n)rf(n,e);else for(let o of bf(t))gr(o);let r=Jm(t,n);for(let o of t.querySelectorAll(`[${br}]`))o!==r&&o.removeAttribute(br);r&&r.setAttribute(br,"")}function yv(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function vv(t,e){let n=yv(t);n&&hf(n,e)}function xv(){for(let t of document.querySelectorAll(`img[${pr}]`))gr(t);for(let t of document.querySelectorAll(`[${br}]`))t.removeAttribute(br)}function Ev(){let t=et(Math.round(Tn(x.store.avatarSize,ff)),df,mf),e=pf(),n=dv(),r=x.store.applyToMenu!==!1,o=[],i=[...Ln(Io,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Ln(Bl,"> :first-child img"));let a=[...Ln(Io,".min-w-0 > .truncate"),...Ln(Io,".min-w-0.flex-1 .truncate")];r&&a.push(...Ln(Bl,"> :first-child .truncate"));let s=Qm(br);o.push(Ca([...s.flatMap(c=>Ln(Io,c))].join(","),t)),o.push(Ca(s.map(c=>`#stage-sidebar-tiny-bar ${c}`).join(","),32)),r&&o.push(Ca(s.flatMap(c=>Ln(Bl,`> :first-child ${c}`)).join(","),t)),e&&(o.push(Ol(i.join(","),e,t)),o.push(Ol("#stage-sidebar-tiny-bar img",e,32)),o.push(nf(e))),n&&o.push(bv(a,n)),w(uf,o.join(""))}function wv(){let t=pf(),e=Ul();for(let n of e)hf(n,t);if(x.store.applyToMenu!==!1){let n=Rn();n&&vv(n,t)}for(let n of document.querySelectorAll(`img[${pr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||gr(n)}function Da(){if(!(!Lt||hr)){hr=!0;for(let t of Fe.values())t.disconnect();pe?.disconnect(),te?.disconnect();try{Ev(),wv()}finally{hr=!1,Kl(),kv(),vr?.isConnected&&yf(vr),gf()}}}function Ro(){!Lt||yr||(yr=requestAnimationFrame(()=>{yr=0,Da()}))}function Sv(){hr||!Lt||Ro()}function Lv(t){if(Fe.has(t))return;let e=new MutationObserver(Sv);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Fe.set(t,e)}function Tv(t){Fe.get(t)?.disconnect(),Fe.delete(t)}function Kl(){let t=new Set;for(let n of Ul())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Nn();e&&t.add(e);for(let n of[...Fe.keys()])(!t.has(n)||!n.isConnected)&&Tv(n);for(let n of t)n.isConnected&&Lv(n)}function kv(){let t=Xo();if(!t){te?.disconnect(),te=null,Pa=null;return}if(Pa===t&&te){te.observe(t,{childList:!0});return}te?.disconnect(),Pa=t,te=new MutationObserver(()=>{hr||!Lt||(Kl(),Ro())}),te.observe(t,{childList:!0})}function yf(t){vr===t&&pe||(pe?.disconnect(),vr=t,pe=new MutationObserver(()=>{if(!t.isConnected){pe?.disconnect(),pe=null,vr=null;return}hr||!Lt||Ro()}),pe.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function vf(t){if(!Lt||x.store.applyToMenu===!1)return;let e=Rn();if(e){yf(e),Ro();return}t<=0||requestAnimationFrame(()=>vf(t-1))}function xf(t){Lt&&(Da(),!(Ul().length||t<=0)&&(Ra=requestAnimationFrame(()=>xf(t-1))))}function Mv(t){Lt&&x.store.applyToMenu!==!1&&(!Zo(t)&&!Rn()||vf(10))}function Cv(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let c=document.createElement("input");c.type="text",c.className="bloom-csi-url",c.spellcheck=!1;let l=document.createElement("button");l.type="button",l.className="bloom-csi-btn",l.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,c,l);let d=document.createElement("p");d.className="bloom-csi-hint";let m=document.createElement("div");m.className="bloom-csi-crop";let b=document.createElement("div");b.className="bloom-csi-stage";let f=document.createElement("img");f.className="bloom-csi-stage-img",f.alt="",f.draggable=!1,b.appendChild(f);let g=document.createElement("div");g.className="bloom-csi-zoom-row";let p=document.createElement("input");p.type="range",p.className="bloom-csi-zoom",p.min=String($l),p.max=String(_l),p.step="0.05",p.setAttribute("aria-label","Zoom");let L=document.createElement("span");L.className="bloom-csi-zoom-val";let k=document.createElement("button");k.type="button",k.className="bloom-csi-btn",k.textContent="Reset",g.append(p,L,k);let H=document.createElement("p");H.className="bloom-csi-hint",H.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",m.append(b,g,H),t.append(u,d,m);function mt(){let h=String(x.store.avatarSource??""),M=String(x.store.avatarUrl??"");return h.startsWith("data:image/")?h:M.startsWith("data:image/")?M:""}function Rt(h,M,N){if(!a)return i.x=h,i.y=M,i.zoom=et(N,$l,_l),i;let rt=Na(a.w,a.h,N,h*a.w,M*a.h);return i.x=rt.x/a.w,i.y=rt.y/a.h,i.zoom=rt.z,i}function st(){p.value=String(i.zoom),L.textContent=`${Math.round(i.zoom*100)}%`;let h=a?Na(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;h&&a&&(f.style.width=`${a.w/h.side*100}%`,f.style.height=`${a.h/h.side*100}%`,f.style.left=`${(.5-h.x/h.side)*100}%`,f.style.top=`${(.5-h.y/h.side)*100}%`)}function O(h=!1){let M=mt(),N=String(x.store.avatarUrl??"").trim(),rt=!!M;s.hidden=!N&&!M,(M||N)&&(s.src=M||N),document.activeElement!==c&&(c.value=rt?"":N),c.placeholder=rt?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",m.hidden=!M,d.hidden=!(e&&/^https?:\/\//.test(N)&&!M),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",M&&(h&&(i.x=Tn(x.store.cropX,.5),i.y=Tn(x.store.cropY,.5),i.zoom=Tn(x.store.cropZoom,1)),f.getAttribute("src")!==M&&(a=null,f.onload=()=>{a={w:f.naturalWidth,h:f.naturalHeight},Rt(i.x,i.y,i.zoom),st()},f.src=M),st())}function ft(h,M,N,rt=!1){Rt(h,M,N),st();let Jl=mt(),Ql=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,Jl&&jl(Jl,i.x,i.y,i.zoom).then(tc=>{tc&&(x.store.avatarUrl=tc)})};r&&clearTimeout(r),rt?Ql():r=setTimeout(Ql,80)}function ee(h){x.store.avatarUrl=h;let M=h.trim();if(n&&clearTimeout(n),!M){x.store.avatarSource="",Gl(),e=!1,O(!0);return}if(M.startsWith("data:image/")){e=!1,n=setTimeout(()=>{wa(M).then(N=>{if(!N)return;let rt=Fl(N);N.close(),rt&&zl(rt).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(M)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{wa(M).then(N=>{if(!N){e=!0,O(!0);return}let rt=Fl(N);N.close(),rt?(e=!1,zl(rt).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,x.store.avatarSource="",O(!0)}u.addEventListener("paste",h=>{No(h.clipboardData)&&(h.preventDefault(),e=!1,Dl(h.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",h=>{No(h.dataTransfer)&&h.preventDefault()}),u.addEventListener("drop",h=>{No(h.dataTransfer)&&(h.preventDefault(),e=!1,Dl(h.dataTransfer).then(()=>O(!0)))}),c.addEventListener("change",()=>ee(c.value)),c.addEventListener("paste",h=>{No(h.clipboardData)&&(h.preventDefault(),e=!1,Dl(h.clipboardData).then(()=>O(!0)))}),c.addEventListener("keydown",h=>{mt()&&!c.value&&(h.key==="Backspace"||h.key==="Delete")&&(lf(),e=!1,O(!0))}),l.addEventListener("click",()=>{lf(),e=!1,O(!0)}),b.addEventListener("pointerdown",h=>{h.button===0&&(b.setPointerCapture(h.pointerId),o.on=!0,o.px=h.clientX,o.py=h.clientY,o.x=i.x,o.y=i.y)}),b.addEventListener("pointermove",h=>{if(!o.on||!a)return;let M=b.clientWidth;if(!M)return;let{side:N}=Na(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Rt(o.x-(h.clientX-o.px)*(N/M)/a.w,o.y-(h.clientY-o.py)*(N/M)/a.h,i.zoom),st()}),b.addEventListener("pointerup",()=>{o.on&&(o.on=!1,ft(i.x,i.y,i.zoom,!0))}),b.addEventListener("pointercancel",()=>{o.on=!1}),b.addEventListener("wheel",h=>{h.preventDefault(),ft(i.x,i.y,i.zoom*(h.deltaY<0?1.08:1/1.08))},{passive:!1}),p.addEventListener("input",()=>ft(i.x,i.y,Number(p.value))),p.addEventListener("change",()=>ft(i.x,i.y,Number(p.value),!0)),k.addEventListener("click",()=>ft(.5,.5,1,!0));let Zl=()=>O(!1);return Oa=Zl,O(!0),()=>{Oa===Zl&&(Oa=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Ef=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:sf,cleanupSelectors:[`.${lv}`,`.${cv}`],settings:x,start(){Lt=!0,Sn.clear(),Pl(Ro),w(sf,of),Ha=new AbortController,document.addEventListener("click",Mv,{signal:Ha.signal}),xf(40),gf(),af.debug("started")},onSettingsChange(){Sn.clear(),Oa?.(),Lt&&(Kl(),Da())},stop(){Lt=!1,Ha?.abort(),Ha=null,yr&&cancelAnimationFrame(yr),yr=0,Ra&&cancelAnimationFrame(Ra),Ra=0;for(let t of Fe.values())t.disconnect();Fe.clear(),pe?.disconnect(),pe=null,vr=null,te?.disconnect(),te=null,Pa=null,xv(),E(uf),Pl(null),Sn.clear(),af.debug("stopped")}});var xr=new S("Bloom"),wf=!1,Av=Date.now(),Hv=[Xc,Fu,Xu,Qu,od,cd,wd,Ld,Md,Wd,em,lm,um,Lm,Om,Dm,Um,Ef];function qa(t){return new Promise(e=>setTimeout(e,t))}function Iv(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function Nv(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Lf=8e3,Sf=300,Rv=250;async function Pv(){if(Ge())return await qa(Sf),!0;for(;Date.now()-Av<Lf;)if(await qa(Rv),Ge())return await qa(Sf),!0;return Ge()||Va()}function Vl(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Ov(){if(Vl())return!0;let t=Date.now()+Lf;for(;Date.now()<t;)if(await qa(100),Vl())return!0;return Vl()}function Bv(){try{GM_registerMenuCommand?.("Bloom++ settings",Yc)}catch{}}function Dv(){jo(()=>{wr("HostShell"),xr.info("host shell",pt)}),Go(()=>{xr.info("idle ready",pt)}),Uo(()=>{_a(),wr("HostReady"),xr.info("chrome ready",pt)})}async function Wl(){await mc()}async function Yl(){if(wf)return;wf=!0;for(let n of Hv)try{vc(n),Ac(n)}catch(r){xr.error("register failed",n.name,r)}wr("Init"),Bv(),Dv();let t=()=>wr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Iv(),_a(),xr.info("styles ready",pt),await Nv(),Ov().then(n=>{n&&Ko()}),!await Pv()){xr.warn("late islands not detected; starting default plugins",pt),An(),Vo();return}await Mc()}var Tf=typeof unsafeWindow<"u"?unsafeWindow:window,qv=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||qv){let t=Tf.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",pt);try{Object.defineProperty(Tf,"Bloom",{value:Xl,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Wl().then(()=>Yl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
