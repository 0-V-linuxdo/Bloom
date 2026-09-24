// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.91
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

/* Bloom++ [20260924] v1.4.91. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Sf=Object.defineProperty;var Lf=(t,e)=>{for(var n in e)Sf(t,n,{get:e[n],enumerable:!0})};var Wl={};Lf(Wl,{REPO_URL:()=>kc,Settings:()=>$,VERSION:()=>ft,contextKeyFromUrl:()=>oe,conversationTitle:()=>Dn,conversationToken:()=>kt,currentConversationId:()=>A,hasDraftText:()=>Bt,hasErrorToast:()=>qt,hasLateIslands:()=>je,init:()=>Vl,initSettings:()=>Kl,isDocumentInteractive:()=>Mc,isStreaming:()=>G,isUserDraftEmpty:()=>Ee,messageCreateTime:()=>vi,plugins:()=>ee,requestChromeReady:()=>Ko,requestIdleReady:()=>Mn,requestShellReady:()=>Uo,setEditorText:()=>re,subscribeHarvest:()=>pt,watchStreamingEdge:()=>ot,whenChromeReady:()=>Go,whenIdleReady:()=>jo,whenShellReady:()=>zo});var pe=new Map,Ro=!1;function Tf(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ql(){return document.head??null}function Tn(){let t=Tf();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=kf()}function $a(t,e){if(!Ro)return;let n=Ql();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Tn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Tn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Tn()}function w(t,e){let n=pe.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},pe.set(t,n)),Ro&&$a(t,n)}function _a(){if(!Ql())return!1;Ro=!0;for(let[e,n]of pe)$a(e,n);return Tn(),!0}function tc(t){let e=pe.get(t);e&&(e.disabled=!1,Ro&&$a(t,e))}function ec(t){let e=pe.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Tn())}function E(t){let e=pe.get(t);e&&(e.el?.remove(),pe.delete(t),Tn())}function kf(){return Array.from(pe.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var qa=new Map;function kn(t,e){let n=qa.get(t);return n||(n=new Set,qa.set(t,n)),n.add(e),()=>n.delete(e)}function Fe(t,e){let n=qa.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Cf="bloompp";function nc(){return new Promise((t,e)=>{let n=indexedDB.open(Cf,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function rc(t){try{let e=await nc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function oc(t,e){try{let n=await nc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function tt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function et(t,e,n){return Math.min(n,Math.max(e,t))}function ic(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function ac(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function sc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Po=new S("SettingsStore"),ge="BloomSettings",Mf=100;function Oo(t){return t!=null&&typeof t.then=="function"}function Af(t){if(t==null||Oo(t))return null;if(tt(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(tt(e)&&!Oo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return tt(n)&&!Oo(n)?n:null}return null}catch{return null}}function Do(t){let e=Af(t);if(!e)return null;let n=e.plugins;return!tt(n)||Oo(n)||Object.keys(n).length===0?null:e}function za(t){return tt(t)?t:null}function Fa(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:tt(t)?Object.keys(t).length===0:!1}function Hf(t){return Fa(t)?0:Array.isArray(t)?12+Math.min(t.length,40):tt(t)?12+Math.min(Object.keys(t).length,40):3}function ze(t){if(!t)return-1;let e=t.plugins;if(!tt(e))return-1;let n=0;for(let r of Object.values(e)){let o=za(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=Hf(a))}return n}function lc(t){let e=t.plugins;if(!tt(e))return 0;let n=0;for(let r of Object.values(e))za(r)?.enabled===!0&&n++;return n}function cc(t){let e=t.map((i,a)=>({bag:i,index:a,score:ze(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=lc(a.bag)-lc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!tt(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(tt(a))for(let[s,c]of Object.entries(a)){let l=za(c);if(!l)continue;if(!tt(r[s])){let d=structuredClone(l);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,m]of Object.entries(l))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&m===!0&&(u.enabled=!0);continue}Fa(u[d])&&!Fa(m)&&(u[d]=structuredClone(m))}}}let o=r.Settings;return tt(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:ze(n)}}var Bo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[l,u]of this.defaultGetters)if(c.startsWith(l)){let d=c.slice(l.length+1);if(d&&!d.includes(".")){let m=u(d);m!==void 0&&(i[a]=m,s=m);break}}}return tt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Po.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Mf))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ge,this.plain)}catch{try{GM_setValue(ge,e)}catch(n){Po.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(ge,e)}catch{}oc(ge,e).catch(n=>Po.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){Po.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){ic(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var If=new S("Settings"),Nf={plugins:{}},$=new Bo(structuredClone(Nf)),Rf=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Pf(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function k(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?be(n):{}},get plain(){let n=e.pluginName;return n?$.plain.plugins[n]??{}:{}}};return e}async function Of(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function uc(){let t=Do(await Of(ge)),e=Do(await rc(ge)),n=null;try{n=Do(localStorage.getItem(ge))}catch{n=null}let r=cc([t,e,n]);if(r){let o=r.bag.plugins;o&&($.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);If.info("Loaded settings from",i,"richness",r.score,"gm",ze(t),"idb",ze(e),"ls",ze(n))}$.releasePersist(),r&&(r.index!==0||r.score>ze(t))&&$.persistLoadedBag()}function be(t){return $.plain.plugins[t]||($.plain.plugins[t]={}),$.store.plugins[t]}function dc(t,e){e&&(e.pluginName=t,be(t),$.setDefaultGetter(Rf(t),n=>{if(n!=="enabled")return Pf(e.def,n)}))}function mc(){return be("Settings")}function $o(){return mc().pinnedPlugins??[]}function fc(t){return $o().includes(t)}function pc(t){let e=$o(),n=e.includes(t);return $.store.plugins.Settings={...$.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function _o(){return mc().starredPlugins??[]}function gc(t){return _o().includes(t)}function bc(t){let e=_o(),n=e.includes(t);return $.store.plugins.Settings={...$.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var qo=new S("PluginManager"),ee={},xr=new Set;function hc(t){if(ee[t.name]){qo.warn("Duplicate plugin",t.name);return}ee[t.name]=t,dc(t.name,t.settings)}function Cn(t){let e=ee[t];if(!e)return!1;if(e.required)return!0;let n=$.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function yc(t){let e=ee[t];if(!e||e.required)return;let n=!Cn(t);be(t),$.store.plugins[t].enabled=n,n?vc(e):Bf(e),Fe("pluginToggle",{name:t,enabled:n})}function vc(t,e=!1){if(!xr.has(t.name)&&Cn(t.name))try{t.managedStyle&&tc(t.managedStyle),t.start?.(),xr.add(t.name),t.settings&&$.addPrefixChangeListener(`plugins.${t.name}.`,()=>{xr.has(t.name)&&t.onSettingsChange?.()}),e||qo.debug("Started",t.name)}catch(n){qo.error("Failed to start",t.name,n)}}function Bf(t){if(xr.has(t.name)){try{t.stop?.()}catch(e){qo.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(ec(t.managedStyle),E(t.managedStyle)),xr.delete(t.name)}}function Er(t){for(let e of Object.values(ee))(e.startAt??"DOMContentLoaded")===t&&vc(e)}var wr=!1,Fo=!1,ja=!1,Ec=[],wc=[],Sc=[];function Ga(t){let e=t.splice(0);for(let n of e)n()}function Sr(){wr||(wr=!0,Ga(Ec))}function Ua(){Fo||(Fo=!0,wr||Sr(),Ga(wc))}function Lc(){ja||(ja=!0,wr||Sr(),Fo||Ua(),Ga(Sc))}function zo(t){wr?t():Ec.push(t)}function jo(t){Fo?t():wc.push(t)}function Go(t){ja?t():Sc.push(t)}function Uo(){Sr()}function Mn(){Sr(),Ua()}function Ko(){Lc()}function xc(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Tc(){await xc(4e3),Sr(),await xc(4e3),Ua(),Lc()}var v={p:"0-V-linuxdo"},ft="[20260924] v1.4.91",kc="https://github.com/0-V-linuxdo/Bloom";var Df={BetterNavigator:1790240385e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789969779e3,ComposerOpacity:1789969779e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789969779e3,InputHistory:1789969779e3,MessageTimestamps:1790230458e3,NoDictation:1789969779e3,NoShareLink:1789969779e3,NoSidebarIdentity:1789969779e3,PromptQueue:1790246384e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789969779e3,WiderChat:1789969779e3};function Cc(t){let e=Df[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function $f(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function _f(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ka(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function je(){return Ka()?$f()||_f():!1}function Mc(){return je()}var qf=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Ac=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Ff=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),zf="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Hn(t){return t.id==="bloom-root"||!!t.closest(zf)}function Hc(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Vo(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Va(t){if(!(t instanceof HTMLElement)||!t.isConnected||Hn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Vo(e)?!1:t.getClientRects().length>0}function An(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function jf(){let t=[];for(let e of document.querySelectorAll(qf))!(e instanceof HTMLElement)||!e.isConnected||Hn(e)||t.push(e);return t}function Wo(t){if(!t.isConnected||Hn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Ge(){return jf().filter(Wo)[0]??null}function In(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Hn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Wa(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Hn(n)&&!An(n)&&n.parentElement&&!An(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!An(r)&&!Hn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!An(r.parentElement))return r}return e}function Nn(){let t=document.querySelectorAll(Ac);for(let n of t)if(Va(n)&&!Vo(n)&&Hc(n))return n;let e=document.querySelectorAll(Ff);for(let n of e){if(!Va(n)||!Hc(n)||Vo(n))continue;let r=n.querySelector(Ac);return Va(r)&&!Vo(r)?r:n}return null}function Yo(){let t=Ge();if(t){let e=Wa(t),n=e.parentElement;if(n&&!An(n))return n;if(!An(e))return e}return In()}function Xo(t){let e=Ge();return e?t.composedPath().includes(e):!1}var Xa=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Gf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Uf(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Kf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Ya(t){let e=Uf(t);return e?Kf(e)>.55?"light":"dark":null}function Vf(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Ya(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Ya(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Ya(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Zo(t){return t==="auto"?Vf():t}function Wf(t){try{let e=getComputedStyle(document.documentElement);for(let n of Xa){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Jo(t,e,n){let r=Gf[e];if(n){Wf(t);for(let o of Xa)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Xa)t.style.setProperty(o,r[o])}function Ic(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Za=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Xf="bloom-root",Pt="bloom-rail-item",ri="bloom-account-item",Ke="bloom-sidebar-panel",Nr="bloom-plugin-dialog",ui="bloom-plugin-layer",oi="bloom-settings-css",Zf=2e3,Pc=null,Jf=null,xe=!1,es=[],Qo=null,ii=null,ye=null,ei=null,ne=null,Ar=null,Lr,Rn=0,Hr=0,Tr=0,kr=null,Cr=null,ai=null,Oc=null,Mr=null,Ja=[],si=!1,Qf=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],tp=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],ep=new Set(["chat","ui","privacy"]),np=10080*60*1e3,di="",Ir="all",Rt="all";function mi(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Bc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function rp(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function op(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function ip(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function ap(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var sp={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function lp(t){return t.icon||sp[t.name]||mi()}function Qa(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Jo(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Dc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function li(){let t="auto",e=Zo(t);Qa(Pc,e,!0);let n=document.getElementById(Ke);n instanceof HTMLElement&&Qa(n,e,!0);let r=document.getElementById(Nr);r instanceof HTMLElement&&Qa(r,e,!0);let o=document.getElementById(Pt);o instanceof HTMLElement&&Dc(o),Fe("schemeChange",{scheme:e,pref:t})}function $c(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function _c(){if(w("settings",Za),document.getElementById(oi)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=oi,t.textContent=Za,document.head.appendChild(t)}function cp(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function up(){for(let t of es)t();es=[]}function qc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function dp(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function os(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function mp(t){return os(t).length>0}function ni(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function fp(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=dp(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function pp(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(fp(e,n));let i=be(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",es.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[e]??ni(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??ni(n)??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),c.textContent=s.value}),a.append(s,c),o.appendChild(a),o}if(n.type===2){let a=qc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??ni(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Nc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function gp(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=be(t.name);for(let[n,r]of os(t)){if(n==="enabled"||r.type===5)continue;let o=ni(r);o!==void 0&&(e[n]=o)}zc(t)}function Fc(t){t.key==="Escape"&&(!document.getElementById(ui)&&!document.getElementById(Nr)||(t.stopPropagation(),Pn()))}function bp(){si||(document.addEventListener("keydown",Fc),si=!0)}function hp(){si&&(document.removeEventListener("keydown",Fc),si=!1)}function Pn(){up(),hp(),document.getElementById(ui)?.remove(),document.getElementById(Nr)?.remove()}function zc(t){if(Pn(),!document.body)return;let e=document.createElement("div");e.id=ui,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",ve),e.addEventListener("pointerup",ve),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Pn()});let n=document.createElement("div");n.id=Nr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",ve),n.addEventListener("pointerup",ve),n.addEventListener("click",ve);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Bc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Pn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Nc("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Nc("Settings","bloom-plugin-dialog-settings"),c=document.createElement("div");c.className="bloom-plugin-dialog-settings-list";let l=os(t);if(l.length)for(let[u,d]of l){let m=pp(t.name,u,d);m&&c.appendChild(m)}if(!c.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",c.appendChild(u)}if(s.appendChild(c),n.appendChild(s),l.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>gp(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),bp(),li()}function yp(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=lp(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let c=gc(t.name),l=document.createElement("button");if(l.type="button",l.className=`bloom-icon-btn bloom-card-star${c?" bloom-card-star-active":""}`,l.setAttribute("aria-label",c?"Remove from favorites":"Add to favorites"),l.innerHTML=ip(c),l.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let p=bc(t.name);Fe("pluginStar",{name:t.name,starred:p})}),s.appendChild(l),!t.required){let g=fc(t.name),p=document.createElement("button");p.type="button",p.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,p.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),p.innerHTML=ap(g),p.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let L=pc(t.name);Fe("pluginPin",{name:t.name,pinned:L})}),s.appendChild(p)}if(mp(t)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${t.name} settings`),g.innerHTML=op(),g.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),zc(t)}),s.appendChild(g)}let u=qc(t.name,Cn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",g=>g.stopPropagation()),d?.addEventListener("change",()=>{yc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=t.description,n.appendChild(g)}let m=document.createElement("div");m.className="bloom-card-separator";let b=document.createElement("div");b.className="bloom-card-footer";let f=document.createElement("div");return f.className="bloom-card-author",f.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",b.appendChild(f),e.append(n,m,b),e}function jc(){return Object.values(ee).filter(t=>!t.hidden&&t.name!=="Settings")}function vp(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<np}function Gc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return vp(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>ep.has(r)):n.includes(e)}function xp(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Ep(){return di.trim()?"No plugins match your search.":Rt==="favorites"?"No favorites yet. Star a plugin to see it here.":Rt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function wp(){let t=jc();return tp.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Gc(n,e.id)))}function Sp(){if(Mr){Mr.replaceChildren();for(let t of wp()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Rt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Rt=t.id,Ue()}),Mr.appendChild(e)}}}function Lp(){let t=jc();if(Rt==="favorites"){let e=new Set(_o());t=t.filter(n=>e.has(n.name))}else Rt!=="all"&&(t=t.filter(e=>Gc(e,Rt)));return Ir==="enabled"&&(t=t.filter(e=>Cn(e.name))),Ir==="disabled"&&(t=t.filter(e=>!Cn(e.name))),t}function Ue(){if(!kr)return;Sp();let t=Lp();ai&&(ai.placeholder=`Search ${t.length} plugins...`);let e=t,n=di.trim().toLowerCase();if(n&&(e=e.filter(r=>xp(r).includes(n))),Rt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Rt!=="favorites"){let r=$o();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),c=o.has(a.name);return s!==c?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}kr.replaceChildren();for(let r of e)kr.appendChild(yp(r));Cr&&(Cr.hidden=e.length>0,Cr.textContent=Ep())}function ve(t){t.stopPropagation()}function ts(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function is(){document.getElementById(Pt)?.setAttribute("aria-expanded",xe?"true":"false")}function Tp(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function as(){Pn(),di="",Ir="all",Rt="all",document.getElementById(Ke)?.remove(),xe=!1,is()}function kp(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",ve),e.addEventListener("pointerup",ve),e.addEventListener("click",ve);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=mi();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let c="Toggle features. Some need a reload. Click the sliders icon to configure.",l=document.createElement("button");l.type="button",l.className="bloom-info-hint",l.setAttribute("aria-label",c),l.innerHTML=rp();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=c,l.appendChild(u),a.append(s,l),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Bc(),d.addEventListener("click",as),r.appendChild(o),n.appendChild(r);let m=document.createElement("div");m.className="bloom-plugin-tabs",n.appendChild(m);let b=document.createElement("div");b.className="bloom-search-bar";let f=document.createElement("input");f.type="search",f.className="bloom-search-input",f.setAttribute("aria-label","Search plugins"),f.placeholder="Search plugins...",f.addEventListener("input",()=>{di=f.value,Ue()});let g=document.createElement("select");g.className="bloom-search-filter",g.setAttribute("aria-label","Filter plugins");for(let L of Qf){let H=document.createElement("option");H.value=L.value,H.textContent=L.label,g.appendChild(H)}g.value=Ir,g.addEventListener("change",()=>{Ir=g.value,Ue()}),b.append(f,g),n.appendChild(b);let p=document.createElement("div");p.className="bloom-plugin-list",n.appendChild(p);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(d,n),kr=p,Cr=T,ai=f,Oc=g,Mr=m,Ue(),e}function Cp(t){t.classList.add("bloom-rail-dock")}function Mp(){let t=document.getElementById(Pt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Wo(t)?t:null}function Ap(){if(document.getElementById(Ke)?.remove(),!document.body)return;let t=kp(Ke);Cp(t),document.body.appendChild(t),xe=!0,Pn(),li(),is(),Fe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:ft,dock:"center",rail:!!Mp()})}function ss(){let t=document.getElementById(Ke);if(t instanceof HTMLElement&&t.isConnected&&Tp(t)){as();return}t?.remove(),Ap()}function Hp(){let t=document.createElement("button");return t.type="button",t.id=Pt,t.className="bloom-rail-item",t.setAttribute("aria-controls",Ke),t.setAttribute("aria-expanded",xe?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${mi()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ss()}),t}function Rc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Ip(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Np(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function he(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Uc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Ip(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&he(t,"padding-top",Math.round(i)),Number.isFinite(a)&&he(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));he(n,"width",c),he(n,"height",Math.max(20,Math.round(s.height)));let l=t.getBoundingClientRect(),u=Math.round(s.left-l.left);u>=0&&u<=40&&he(t,"padding-left",u);let d=Np(e,r);if(d){let m=d.getBoundingClientRect(),b=n.getBoundingClientRect(),f=Math.round(m.left-b.right);f>=0&&f<=24&&he(t,"gap",f)}}else{let s=Number.parseFloat(o.paddingLeft),c=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&he(t,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&he(t,"gap",Math.round(c))}Dc(t)}function ns(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Rp(){if(Ar?.isConnected&&ne){ne.observe(Ar,{childList:!0});return}rs()}function Pp(t){if(ns(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Op(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Tr=0;return}Tr+=1,Hr=Date.now()+Math.min(8e3,250*2**Math.min(Tr,5))})}function Bp(){Rn||Date.now()<Hr||(Rn=requestAnimationFrame(()=>{Rn=0,!(Date.now()<Hr)&&(document.getElementById(Pt)?.isConnected||ci())}))}function ci(){if(!document.body)return;ne?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Pt);t=n instanceof HTMLButtonElement?n:Hp();let r=Ge(),o=In();if(r){let i=Wa(r),a=i.parentElement;if(ns(i)||a&&ns(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Rc(t),Uc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Rc(t,!0)):t.isConnected&&!Wo(t)&&(t.remove(),t=null)}finally{Op(t,e),Rp(),is()}}function rs(){let t=Yo();!t||!Pp(t)||Ar===t&&ne||(ne?.disconnect(),Ar=t,ne=new MutationObserver(()=>{document.getElementById(Pt)?.isConnected||Bp()}),ne.observe(t,{childList:!0}))}function Dp(){ci(),rs(),Lr===void 0&&(Lr=window.setInterval(()=>{let t=document.getElementById(Pt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Hr&&ci();else{Tr=0;let e=Ge();e&&Uc(t,e)}rs()},Zf))}function $p(){Lr!==void 0&&(clearInterval(Lr),Lr=void 0),Rn&&cancelAnimationFrame(Rn),Rn=0,Hr=0,Tr=0,ne?.disconnect(),ne=null,Ar=null}function _p(t){ei===t&&ye||(ye?.disconnect(),ei=t,ye=new MutationObserver(()=>{if(!t.isConnected){ye?.disconnect(),ye=null,ei=null;return}Kc(t)}),ye.observe(t,{childList:!0}))}function Kc(t){if(_p(t),t.querySelector(`#${ri}`))return;let e=document.createElement("button");e.type="button",e.id=ri,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${mi()}<span>Bloom++</span>`,e.addEventListener("pointerdown",ts),e.addEventListener("pointerup",ts),e.addEventListener("click",n=>{ts(n),ss()}),t.insertBefore(e,t.firstChild)}function ti(){let t=Nn();return t?(Kc(t),!0):!1}function qp(t){Xo(t)&&(queueMicrotask(ti),requestAnimationFrame(()=>{ti()}),window.setTimeout(ti,60),window.setTimeout(ti,180))}function Fp(){ii?.abort();let t=new AbortController;ii=t,document.addEventListener("click",qp,{signal:t.signal})}function zp(){ii?.abort(),ii=null,ye?.disconnect(),ye=null,ei=null}function Vc(){Mn(),cp(()=>{_c(),$c(),ci(),ss()})}var Wc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Xf}`,`#${Pt}`,`#${ri}`,`#${Ke}`,`#${ui}`,`#${Nr}`,`#${oi}`,"#bloom-menu-panel"],start(){_c(),$c(),Dp(),Fp(),Qo?.(),Qo=Ic(li),li(),Ja=[kn("pluginToggle",()=>{xe&&Ue()}),kn("pluginPin",()=>{xe&&Ue()}),kn("pluginStar",()=>{xe&&Ue()})]},stop(){$p(),zp(),Qo?.(),Qo=null;for(let t of Ja)t();Ja=[],as(),document.getElementById(Pt)?.remove(),document.getElementById(ri)?.remove(),document.getElementById(oi)?.remove(),Pc=null,Jf=null,kr=null,Cr=null,ai=null,Oc=null,Mr=null,xe=!1}});var fi='form[data-type="unified-composer"], form.w-full[data-type]',Ot=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),On=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Yc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Xc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),jp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Gp='[contenteditable="false"], button, [role="button"]';function Lt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Ve(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Lt(o)))return o;return null}function Zc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function _(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Zc(t);return!!(jp.test(n)||/^stop$/i.test(n))}function Tt(){let e=Array.from(document.querySelectorAll(fi)).find(Lt);if(e instanceof HTMLElement)return e;let n=Ve(document,Ot),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function nt(){let t=Array.from(document.querySelectorAll(Ot));return t.find(Lt)??t[0]??null}function Up(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Gp);return!!n&&n!==e&&e.contains(n)}function ls(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Up(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Bt(t){let e=t??nt();return e?ls(e,e).replaceAll("\u200B","").trim().length>0:!1}function Ee(t){return!Bt(t)}function pi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Jc(t){let e=Tt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Lt(n))&&t(n))return n;return null}function we(){let t=Tt(),e=Ve(t,On)??Ve(document,On);return e&&!_(e)?e:Jc(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!_(n);let o=Zc(n);return/^(send|send prompt|发送)$/i.test(o)&&!_(n)})}function We(){let t=Tt(),e=Ve(t,Yc,!0)??Ve(document,Yc,!0);if(e)return e;let n=Ve(t,Xc)??Ve(document,Xc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Lt(r)&&_(r))return r}return Jc(_)}function Dt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>ls(n,t)).join(`
`):ls(t,t)}function cs(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function re(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),cs(t,n)}var Qc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function kt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=l=>{let u=n.indexOf(l);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(l,u)=>{try{return document.querySelector(l)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function oe(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ie(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Qc)?.[1]??""}catch{return t.match(Qc)?.[1]??""}}function A(){return ie(location.pathname)}var ru=new S("Harvest"),Kp=1500,Vp=200,gi=new Set,bi=new Map,hi=new Map,Bn=null,yi=null,Rr=null,$t=0;function Wp(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Yp(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Xp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function ou(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var Zp=/"action"\s*:\s*"(next|continue|variant)"/i;function Jp(t,e,n){return!(e!=="POST"||ou(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Zp.test(n))}function Qp(t,e){return e!=="GET"||ou(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function tu(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function iu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function tg(t){return typeof t=="string"?iu(t):""}function us(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return us(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function au(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function eu(t,e,n){!t||!e||hi.get(t)!==e&&(hi.set(t,e),au(hi,Kp),Se({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function eg(t,e){let n=e.trim();!t||!n||bi.get(t)!==n&&(bi.set(t,n),au(bi,Vp),Se({type:"conversation-meta",conversationId:t,title:n}))}function Pr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let c of t)Pr(c,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&eg(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let c=i,l=typeof c.id=="string"?c.id:"",u=us(c.create_time??c.createTime??c.created_at);l&&u&&eu(l,u,o)}let a=typeof r.id=="string"?r.id:"",s=us(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&eu(a,s,o),r.mapping&&typeof r.mapping=="object")Pr(r.mapping,o,n+1);else if(n<3)for(let c of Object.values(r))c&&typeof c=="object"&&Pr(c,o,n+1)}function nu(t,e){if(t)try{Pr(JSON.parse(t),e)}catch{}}function Se(t){for(let e of Array.from(gi))try{e(t)}catch{}}async function ng(t,e,n){if(n===$t)try{let r=await t.json();if(n!==$t)return;Pr(r,e)}catch{}}async function rg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===$t&&Se({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),c=new TextDecoder,l="";try{for(;r===$t;){let{done:u,value:d}=await s.read();if(u)break;if(l+=c.decode(d,{stream:!0}),!o){let b=iu(l);b&&(o=b,Se({type:"post-start",conversationId:o,url:""}))}let m=l.split(`
`);l=m.pop()??"";for(let b of m){let f=b.replace(/^data:\s*/,"").trim();!f||f==="[DONE]"||nu(f,o)}/\[DONE\]/.test(l)||/"error"\s*:\s*\{/.test(l)?(/"error"\s*:\s*\{/.test(l)&&(i=!0),l=l.slice(-64)):l.length>16384&&(l=l.slice(-4096))}l&&r===$t&&nu(l.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===$t&&Se({type:"post-end",conversationId:o,error:i})}function og(t,e,n){let r=Yp(e),o=Xp(e,n),i=Qp(r,o),a=Jp(r,o,n?.body),s=$t,c="";return a&&(c=tg(n?.body)||tu(r)||ie(r)||A(),Se({type:"post-start",conversationId:c,url:r})),t(e,n).then(l=>{if(s!==$t||!i&&!a)return l;try{let u=l.clone();i?ng(u,tu(r)||A(),s):rg(u,c,!l.ok,s)}catch{a&&Se({type:"post-end",conversationId:c,error:!l.ok})}return l},l=>{throw a&&s===$t&&Se({type:"post-end",conversationId:c,error:!0}),l})}function ig(){if(Bn)return;let t=Wp();Rr=t,Bn=t.fetch.bind(t);let e=(n,r)=>og(Bn,n,r);yi=e,t.fetch=e,ru.debug("conversation fetch harvest hooked")}function ag(){$t+=1,!(!Bn||!Rr)&&(yi&&Rr.fetch===yi&&(Rr.fetch=Bn),Bn=null,yi=null,Rr=null,ru.debug("conversation fetch harvest unhooked"))}function pt(t){return gi.add(t),ig(),()=>{gi.delete(t),gi.size===0&&ag()}}function Dn(t){return t?bi.get(t)??"":""}function vi(t){return t?hi.get(t)??null:null}var lu=new S("Streaming");function _r(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Lt(e))&&(_(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function sg(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Lt(t))}function lg(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Lt(t))}function cg(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function qt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function G(){if(We()||_r()||cg())return!0;let t=we();return t&&Lt(t)&&!_(t)?!1:!!(sg()||lg())}var ug=400,su=3,Je=new Set,Or,Br=null,ds=null,Xe=!1,Ye=0,Te="",ke="",Ce=!1,Dr=!1,$r=!1,_t=!1,V=null,gt="",Ze=!1;function q(){return _t}function Qe(){return Ce}function $n(){return gt}function ms(){return A()||gt}function cu(){return oe(kt())}function xi(t,e){return{streaming:t,contextKey:e,conversationId:ms()}}function fs(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function dg(t){return!t||t==="/"||t.startsWith("/g/")}function U(t,e){if(!t||t===e)return!1;let n=ie(fs(e)||e);return!n||!(t.endsWith("|draft")||dg(fs(t)))?!1:gt?n===gt:Ze}function Ei(){Xe=!1,Ye=0,Te="",Ce=!1,Dr=!1,$r=!1,gt="",Ze=!1}function mg(t){for(let e of Array.from(Je))try{e.onFall?.(t)}catch{}}function fg(t){for(let e of Array.from(Je))try{e.onRise?.(t)}catch{}}function Le(t){for(let e of Array.from(Je))try{e.onTick?.(t)}catch{}}function pg(t,e){for(let n of Array.from(Je))try{n.onContext?.(t,e)}catch{}}function gg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&_(n)&&(Ce=!0)}function bg(t){if(t.type==="post-start"){let n=A();if(!t.conversationId){n||(Ze=!0),(!n||n===gt)&&(_t=!1,Ce=!1);return}if(!(t.conversationId===n||t.conversationId===gt)&&!(!n&&Ze))return;gt=t.conversationId,Ze=!1,_t=!1,Ce=!1;return}if(t.type!=="post-end"||!Xe&&!V)return;let e=A();t.conversationId&&!(e?t.conversationId===e:t.conversationId===gt)||($r=!0,t.error&&(Dr=!0,V&&(V.error=!0)))}function hg(){let t=cu(),e=G();if(ke&&t&&ke!==t){let o=ke;if(!U(o,t))V=null,Ei(),_t=e;else{let i=ie(fs(t));if(i&&!gt&&(gt=i,Ze=!1),Te===o&&(Te=t),V&&V.contextKey===o){V.contextKey=t;let a=ms();a&&(V.conversationId=a)}_t=!1}if(ke=t,pg(t,o),_t){Le(xi(!1,t));return}}else t&&(ke=t);if(_t){if(e){Le(xi(!1,t));return}_t=!1}if(V)if(e||V.contextKey!==t)V=null;else{let o=V;V=null,Ei(),mg(o),Le(xi(!1,t));return}let n=xi(e,t);if(e){let o=!Xe;o&&(Ce=!1,Dr=!1,$r=!1),Xe=!0,Ye=0,Te=t,o&&fg(n),Le(n);return}if(!Xe){Le(n);return}if(Ye+=1,$r&&(Ye=Math.max(Ye,su)),Ye<su){Le(n);return}if(!(!!Te&&Te===t)){Ei(),Le(n);return}V={contextKey:Te||t,conversationId:ms(),userStopped:Ce,error:Dr||qt()},Le(n)}function yg(){Or===void 0&&(Xe=G(),ke=cu(),Te=Xe?ke:"",Ye=0,Ce=!1,Dr=!1,$r=!1,_t=!1,V=null,gt="",Ze=!1,Br?.abort(),Br=new AbortController,document.addEventListener("click",gg,{capture:!0,signal:Br.signal}),ds=pt(bg),Or=setInterval(hg,ug),lu.debug("watchStreamingEdge started"))}function vg(){Je.size||(Or!==void 0&&(clearInterval(Or),Or=void 0),Br?.abort(),Br=null,ds?.(),ds=null,Ei(),ke="",_t=!1,V=null,lu.debug("watchStreamingEdge stopped"))}function ot(t){let e=typeof t=="function"?{onFall:t}:t;return Je.add(e),yg(),()=>{Je.delete(e),vg()}}var uu="bloom-host-icon",qr="data-bloom-host-rel",ps="not all",gs=0,du=0,xg=400;function mu(t){gs+=1;try{t()}finally{gs-=1}}function wi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Me(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function fu(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Eg(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function wg(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-du<xg||(du=n,t.appendChild(e))}function Sg(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||wi(n)&&(n.getAttribute(qr)||n.setAttribute(qr,n.rel),n.media!==ps&&(n.media=ps),n.rel!==uu&&(n.rel=uu))}function Lg(t){for(let e of t.querySelectorAll(`link[${qr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(qr);n&&(e.rel=n),e.removeAttribute(qr),e.media===ps&&e.removeAttribute("media")}}function pu(t,e){let{head:n}=document;!n||!e||mu(()=>{Sg(n,t);let r=fu(t),{type:o,sizes:i}=Eg(e);r?wg(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function gu(t,e){let{head:n}=document;n&&mu(()=>{fu(t)?.remove(),Lg(n)})}function bu(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(gs)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===t?a=!0:wi(l.target)&&(a=!0,Me(l.target.href)&&(s=l.target.href)));for(let u of l.removedNodes)wi(u)&&u.id===t&&(a=!0);for(let u of l.addedNodes)wi(u)&&u.id!==t&&(a=!0,Me(u.href)&&(s=u.href))}if(!a)return;let c=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),c();return}r||(r=requestAnimationFrame(c))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Tg=["original","badge","dot","hole","bg"],vu=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],xu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Si="#FCFCFC",kg="#111111",hu="#111111",Cg="#ffffff",Mg="#212121",Ag="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Hg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Li=32,yu=64;function Eu(t){return typeof t=="string"&&Tg.includes(t)}function Ig(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Ti(t){let e=document.createElement("canvas");e.width=Li,e.height=Li;let n=e.getContext("2d");return n?(n.scale(Li/yu,Li/yu),t(n),e.toDataURL("image/png")):""}function Ng(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ki(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Ag);n&&(t.strokeStyle=kg,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Rg(t,e,n){let r=xu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=hu,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=hu,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Cg,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Fr(t,e){if(t==="original")return e==="wait"?Ti(r=>ki(r,Si)):Ig(Hg[e]);let n=e==="wait"?void 0:xu[e];return Ti(t==="hole"?r=>ki(r,n??Si):t==="bg"?r=>{r.fillStyle=n??Mg,Ng(r,0,0,64,64,14),r.fill(),ki(r,Si,!1)}:r=>{ki(r,Si),e!=="wait"&&Rg(r,e,t==="dot"?"dot":"badge")})}function wu(t){return{wait:Fr(t,"wait"),rotate:Fr(t,"rotate"),done:Fr(t,"done"),ready:Fr(t,"ready"),error:Fr(t,"error")}}var Pg=new S("ChatStateFavicons"),en="bloom-chat-state-favicon",Cu=["input","beforeinput","cut","paste","compositionend"],Mu=k({style:{type:3,description:"Favicon overlay",options:vu}}),Ft="",ys={wait:"",rotate:"",done:"",ready:"",error:""},zr="wait",it=!1,W=!1,P=null,lt="",bt="",rn=!0,Ai=!1,_n=null,ht=0,Ci=null,Mi=null,tn=null,hs=null,qn=null,Ct=!1,Su=new WeakSet;function Og(){let t=Mu.store.style;return Eu(t)?t:"bg"}function Au(){let e=document.querySelector(`link[rel~="icon"]:not(#${en}), link[data-bloom-host-rel]:not(#${en})`)?.href;return Me(e)?e:Me(Ft)?Ft:""}function Bg(){let t=document.getElementById(en);return t instanceof HTMLLinkElement?t:null}function Dg(){if(!Me(Ft)){let t=Au();t&&(Ft=t)}return Me(Ft)?Ft:ys.wait}function Hu(t){return t==="wait"?Dg():ys[t]}function Iu(){pu(en,Hu(zr))}function D(t){let e=Hu(t);if(zr===t){let n=Bg();if(n&&n.getAttribute("href")===e)return}zr=t,Iu()}function Lu(){ys=wu(Og()),D(zr)}function vs(){return oe(kt())}function xs(t,e){!t||!e||t===e||(P===t&&(P=e),lt===t&&(lt=e),bt===t&&(bt=e))}function $g(){let t=vs();if(!(G()||it||W))return lt="",t;if(lt&&t&&lt!==t)if(U(lt,t))xs(lt,t),lt=t;else return lt="",t;else!lt&&t&&(lt=t);return lt||t}function Tu(t){return!P||!t?!1:P===t?!0:U(P,t)}function Nu(){it=!1,W=!1,P=null,lt=""}function Ru(t){bt=t,Nu(),rn=!1,Ai=!0,D("wait")}function bs(t){return!t&&rn}function _g(){if(!Ct)return;let t=vs();if(bt&&t&&bt!==t&&!U(bt,t)){Ru(t);return}bt&&t&&U(bt,t)&&xs(bt,t),t&&(bt=t);let e=G(),n=e&&!q();if(Ai){if(q()){D("wait");return}Ai=!1}if(q()){D("wait");return}let r=$g(),o=Ee();if(Qe()&&!e){it=!1,W=!1,P=null,D(o?"wait":bs(o)?"ready":"wait");return}if(qt()&&!e&&it){D("error"),it=!1,W=!1,P=null;return}if(n){it||(rn=!1),it=!0,W=!1,P=r,D("rotate");return}if(it)if(!Tu(t))it=!1,W=!1,P=null;else if(W){it=!1,W=!0,P=t||r,D("done");return}else{D("rotate");return}if(W)if(P&&t&&!Tu(t))W=!1,P=null;else if(o){P=r||P,D("done");return}else if(bs(o)){W=!1,D("ready");return}else{W=!1,D("wait");return}P=null,o?D("wait"):bs(o)?D("ready"):D("wait")}function nn(){Ct&&($u(),Ou(),Bu(),_g())}function Pu(){if(qn){for(let t of Cu)qn.removeEventListener(t,Du,!0);qn=null}}function Ou(){let t=Tt(),e=t&&t!==document.body?t:null;if(!(qn===e&&e?.isConnected)&&(Pu(),!!e)){qn=e;for(let n of Cu)qn.addEventListener(n,Du,{capture:!0,passive:!0})}}function Bu(){let t=Tt();if(!(tn&&hs===t&&t.isConnected)){if(tn?.disconnect(),hs=t,!t||t===document.body){tn=null;return}tn=new MutationObserver(()=>Hi()),tn.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Hi(){if(Ct){if(document.hidden){ht&&(cancelAnimationFrame(ht),ht=0),nn();return}ht||(ht=requestAnimationFrame(()=>{ht=0,Ct&&nn()}))}}function Du(){Bt()&&(rn=!0),Hi()}function ku(){Bt()&&(rn=!0),Hi()}function qg(){Ct&&(ht&&(cancelAnimationFrame(ht),ht=0),nn())}function Fg(){Ct&&(rn=!1,nn())}function zg(t){if(!Ct)return;if(t.userStopped){it=!1,W=!1,P=null,D("wait");return}if(t.error){it=!1,W=!1,P=null,D("error");return}let e=vs();if(t.contextKey&&e&&t.contextKey!==e&&!U(t.contextKey,e)){it=!1,W=!1,P=null,D("wait");return}it=!1,W=!0,P=e||t.contextKey,D("done")}function jg(){Ct&&nn()}function Gg(t,e){if(Ct){if(U(e,t)){xs(e,t),bt=t,nn();return}Ru(t)}}function $u(){let t=nt();!t||Su.has(t)||(Su.add(t),t.addEventListener("input",ku,{capture:!0,passive:!0}),t.addEventListener("compositionend",ku,{capture:!0,passive:!0}))}var _u=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Mu,startAt:"DOMContentLoaded",cleanupSelectors:[`#${en}`],start(){Ct=!0,Ft=Au()||Ft,Lu(),Mi?.disconnect(),Mi=bu(en,t=>{Me(t)&&(Ft=t),Iu()}),_n?.abort(),_n=new AbortController,window.addEventListener("popstate",Hi,{signal:_n.signal}),document.addEventListener("visibilitychange",qg,{signal:_n.signal}),$u(),Ou(),Bu(),Ci?.(),Ci=ot({onRise:Fg,onFall:zg,onTick:jg,onContext:Gg}),nn(),Pg.debug("favicon watch started")},stop(){Ct=!1,ht&&cancelAnimationFrame(ht),ht=0,Ci?.(),Ci=null,_n?.abort(),_n=null,Pu(),tn?.disconnect(),tn=null,hs=null,Mi?.disconnect(),Mi=null,Nu(),bt="",rn=!0,Ai=!1,zr="wait",gu(en,Ft)},onSettingsChange:Lu});var qu=`.bloom-ih-hud {
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
`;var sE=new S("InputHistory"),Es=/\u200B/g,Fu=10,zu=500,ju=100,Kg=8,Vg=120,Wg=2e3,Ii=10,Ni=k({maxEntries:{type:4,description:"Max stored prompts",min:Fu,max:zu,default:ju},history:{type:5,description:"Stored prompts",render:cb},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ws=new Map,Y=0,Ss="",zt=!1,Gr=!1,ks=0,jr=null,Ls,Cs=null,Gu=!0;function Mt(){let t=Ni.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Uu(t){let e=et(Number(Ni.store.maxEntries??ju),Fu,zu);return t.length>e?t.slice(t.length-e):t}function Ri(t){Ni.store.entries=Uu(t)}function Yg(t){return t.replaceAll(Es,"").replace(/\n$/,"").trim()}function Ts(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Ot);return n instanceof HTMLElement?n:nt()}function Xg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Dt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(Es,"").trim().length===0,last:i.toString().replaceAll(Es,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ku(t){clearTimeout(Ls),Ls=setTimeout(()=>{if(t!==ks)return;Gr=!1;let e=Cs;e&&cs(e,Gu)},Vg)}function Vu(t,e,n){Gr=!0,Cs=t,Gu=n;let r=++ks;re(t,e,n),Ku(r)}function Zg(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Fn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Jg(){document.querySelector(".bloom-ih-hud")?.remove()}function Qg(t,e){let n=Zg();n.textContent=t;let r=(e.closest("form")??Tt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Kg)}px`,n.classList.add("bloom-ih-hud-on")}function Ms(t){let e=Yg(t);if(!e)return;let n=Date.now(),r=ws.get(e);if(r&&n-r<Wg)return;ws.set(e,n);let o=Mt().filter(i=>i!==e);o.push(e),Ri(o),Y=Mt().length,zt=!1,Fn()}function tb(t,e){let n=Mt();if(!n.length&&t)return;Y>=n.length&&(Ss=Dt(e),Y=n.length);let r=t?Y-1:Y+1;r<0||r>n.length||(Y=r,zt=!0,Vu(e,r===n.length?Ss:n[r],t),r<n.length?Qg(`${r+1} / ${n.length}`,e):Fn())}function eb(t){zt=!1,Fn(),Vu(t,Ss,!1),Y=Mt().length}function nb(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Ts(t.target)??Ts(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&zt&&!t.altKey&&!t.shiftKey){eb(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){Ms(Dt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=Mt();if(!r){let i=Xg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||Y<=0)||!n&&Y>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),tb(n,e))}function rb(t){if(Ts(t.target)){if(Gr){Ku(ks);return}zt&&(zt=!1,Fn(),Y=Mt().length)}}function ob(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Ot);n instanceof HTMLElement&&Ms(Dt(n))}function ib(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(On);if(!n||!(n instanceof HTMLElement)||_(n))return;let r=nt();r&&Ms(Dt(r))}function ab(t){if(!(!zt||Gr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}zt=!1,Fn()}}function sb(){if(jr)return;jr=new AbortController;let{signal:t}=jr,e={capture:!0,signal:t};window.addEventListener("keydown",nb,e),window.addEventListener("input",rb,e),window.addEventListener("submit",ob,e),window.addEventListener("click",ib,e),window.addEventListener("pointerdown",ab,e)}function lb(t){let e=Mt().slice();e.splice(t,1),Ri(e),Y>e.length&&(Y=e.length)}function cb(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=Mt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(p=>p.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/Ii));n>=c&&(n=c-1);let l=s.slice(n*Ii,n*Ii+Ii);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),l.length){let p=document.createElement("div");p.className="bloom-ih-list",l.forEach((T,L)=>{let H=i.indexOf(T),Qt=Mt().length-1-H,Nt=document.createElement("div");Nt.className="bloom-ih-item";let st=document.createElement("button");st.type="button",st.className=`bloom-ih-body${r===L?"":" bloom-ih-clamp"}`,st.textContent=T,st.addEventListener("click",()=>{r=r===L?-1:L,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let mt=document.createElement("button");mt.type="button",mt.title="Copy",mt.textContent="C",mt.addEventListener("click",()=>{ac(T)});let te=document.createElement("button");te.type="button",te.title="Delete",te.textContent="\xD7",te.addEventListener("click",()=>{lb(Qt),o()}),O.append(mt,te),Nt.append(st,O),p.appendChild(Nt)}),t.appendChild(p)}else{let p=document.createElement("p");p.className="bloom-ih-empty",p.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(p)}let d=document.createElement("div");d.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,o()});let b=document.createElement("span");b.textContent=`${n+1} / ${c}`;let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Next",f.disabled=n+1>=c,f.addEventListener("click",()=>{n+=1,o()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Ri([]),Y=0,o())}),d.append(m,b,f,g),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Wu=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Ni,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",qu),Y=Mt().length,zt=!1,sb()},stop(){jr?.abort(),jr=null,Fn(),Jg(),ws.clear(),clearTimeout(Ls),Gr=!1,Cs=null,zt=!1},onSettingsChange(){let t=Mt(),e=Uu(t);e.length!==t.length&&Ri(e),Y>e.length&&(Y=e.length)}});var As="noShareLink",ub=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],db=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Hs=k({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Yu(t){return`${t.join(",")}{display:none!important}`}function Xu(){let t=[];if(Hs.store.hideShareChat!==!1&&t.push(Yu(ub)),Hs.store.hideShareProject!==!1&&t.push(Yu(db)),!t.length){E(As);return}w(As,t.join(`
`))}var Zu=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Hs,start:Xu,onSettingsChange:Xu,stop(){E(As)}});var td="noDictation",mb=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],fb=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],ed=k({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Ju(t){return`${t.join(",")}{display:none!important}`}function Qu(){let t=[Ju(mb)];ed.store.hideDictationSettings!==!1&&t.push(Ju(fb)),w(td,t.join(`
`))}var nd=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:ed,start:Qu,onSettingsChange:Qu,stop(){E(td)}});var Is="noSidebarIdentity",zn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],id=zn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),ad=zn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),pb=[...id,...ad],gb=[...id,...zn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],bb=zn.map(t=>`${t} a[href^="mailto:"]`),hb=zn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),yb=zn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Ur=k({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function rd(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function vb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function xb(){return`${yb.join(",")}{margin-block:auto!important}`}function Eb(){return`${hb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function od(){let t=Ur.store.hideUsername!==!1,e=Ur.store.hideEmail!==!1,n=t&&Ur.store.enlargePlan!==!1,r=t&&Ur.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(vb([...gb,...ad])),o.push(xb())):o.push(rd(pb))),e&&o.push(rd(bb)),n&&o.push(Eb()),!o.length){E(Is);return}w(Is,o.join(`
`))}var sd=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ur,start:od,onSettingsChange:od,stop(){E(Is)}});var ld=`#bloom-rt-host {
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
`;var dd=new S("RecentTopics"),Un="bloom-rt-host",md="home",fd=/^\/c\/([a-z0-9_-]{8,})/i,Sb=/\/c\/([a-z0-9_-]{8,})/i,pd=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Lb=new Set(["Backquote","IntlBackslash"]),Tb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),kb=140,Cb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),X=k({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Cb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Pi=null,Oi=null,ct=!1,Zr=!1,Kr=!1,jt=0,on="",jn=null,Vr=null,Gn,Ns=null,Rs=null;function Mb(){let t=Number(X.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Wr(){let t=X.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Os(){let t=X.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function gd(){let t=X.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Bs(){let t=X.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Di(t){let e=Mb();return t.length>e?t.slice(0,e):t}function Gt(t){return t===md}function Yr(t,e=kb){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Ds(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(fd)?.[1]??""}catch{return t.match(Sb)?.[1]??""}}function an(){let t=(location.pathname||"/").match(fd);if(t?.[1])return t[1];let n=kt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return md}function $s(t){if(Gt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Ds(r.getAttribute("href")||"")!==t)continue;let o=Yr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return an()===t&&e&&!/^ChatGPT$/i.test(e)?Yr(e,80):""}function Ab(t){if(Gt(t))return"New chat";let e=Os()[t];if(e)return e;let n=Dn(t);return n||$s(t)||"Chat"}function Hb(t){return Bs()[t]||""}function Ib(t){return gd()[t]||{}}function _s(t,e){if(!t||Gt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Os();n[t]!==e&&(n[t]=e,X.store.titles=n)}function Nb(t){t.type==="conversation-meta"&&(_s(t.conversationId,t.title),ct&&Kn())}function Rb(t,e){if(!t||Gt(t)||!e)return;let n=Bs();n[t]!==e&&(n[t]=e,X.store.projects=n)}function Pb(t,e){if(!t||Gt(t)||!e.user&&!e.assistant)return;let n=gd(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,X.store.previews=n)}function qs(t){if(!t||Gt(t)&&X.store.includeHome===!1)return;let e=Wr().filter(n=>n!==t);e.unshift(t),X.store.visits=Di(e)}function $i(){let t=X.store.includeHome!==!1;return Di(Wr().filter(n=>t||!Gt(n))).map(n=>({id:n,title:Ab(n),project:Hb(n),preview:Ib(n)}))}function cd(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Yr(o)}catch{return""}}function Xr(t){if(!t||Gt(t)||t!==an())return;let e=$s(t);e&&_s(t,e);let n=cd("user"),r=cd("assistant");Pb(t,{user:n,assistant:r});let o=hd(t);if(o){let i=bd(o);i&&Rb(t,i)}}function Fs(){let t=Os(),e=Bs(),n=[],r=new Set,o=!1,i=!1;try{for(let l of document.querySelectorAll('a[href*="/c/"]')){if(l.closest(`#${Un}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Ds(l.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Yr(l.textContent||"",80);d&&!pd.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let m=bd(l);m&&e[u]!==m&&(e[u]=m,i=!0)}}catch{}o&&(X.store.titles=t),i&&(X.store.projects=e);let a=Wr(),s=new Set(a),c=n.filter(l=>!s.has(l));c.length&&(X.store.visits=Di([...a,...c]))}function bd(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Yr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!pd.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function hd(t){if(Gt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Ds(e.getAttribute("href")||"")===t)return e}catch{}return null}function Ob(t){let e=hd(t);if(e){e.click();return}if(Gt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Bb(){let t=an();on&&on!==t&&Xr(on),on=t,qs(t),Fs();let e=$s(t);e&&_s(t,e),Xr(t)}function Bi(){Gn===void 0&&(Gn=window.setTimeout(()=>{Gn=void 0,Bb()},120))}function Db(){jn||(jn=history.pushState.bind(history),Vr=history.replaceState.bind(history),history.pushState=function(...e){let n=jn(...e);return Bi(),n},history.replaceState=function(...e){let n=Vr(...e);return Bi(),n})}function $b(){jn&&(history.pushState=jn),Vr&&(history.replaceState=Vr),jn=null,Vr=null}function _b(t){return Lb.has(t.code)||t.keyCode===192?!0:Tb.has(t.key)}function yd(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function qb(t,e){Zr=e,Fs(),Xr(an()),ct=!0,jt=0;try{let n=an();qs(n);let r=$i();r.length>1&&(jt=t?r.length-1:1)}catch(n){dd.error("Failed to open switcher:",n)}Kn()}function ud(t){let{length:e}=$i();e&&(jt=(jt+(t?-1:1)+e)%e,Kn())}function zs(){if(!ct)return;let t=$i()[jt];ct=!1,Zr=!1,Kn(),t&&Ob(t.id)}function vd(){ct&&(ct=!1,Zr=!1,Kn())}function Fb(t){if(yd(t)){Kr=!0;return}if((t.ctrlKey||Kr)&&!t.altKey&&!t.metaKey&&_b(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{ct?ud(t.shiftKey):qb(t.shiftKey,!0)}catch(n){dd.error("Hotkey failed:",n)}return}if(ct){if(t.key==="Escape"){t.preventDefault(),vd();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),zs();return}t.key==="Tab"&&(t.ctrlKey||Kr)&&(t.preventDefault(),ud(t.shiftKey))}}function zb(t){yd(t)&&(Kr=!1,ct&&Zr&&zs())}function jb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Bi)}function Gb(t){!ct||(t.target instanceof Element?t.target:null)?.closest(`#${Un}`)||vd()}function Ub(){document.visibilityState==="hidden"&&Xr(an())}function Ps(t=Oi){t instanceof HTMLElement&&Jo(t,Zo("auto"),!0)}function Kb(){if(!document.body)return null;let t=document.getElementById(Un);if(t instanceof HTMLElement)return Oi=t,Ps(t),t;t=document.createElement("div"),t.id=Un;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),Oi=t,Ps(t),t}function Kn(){let t=Kb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!ct){e.dataset.visible="false",e.replaceChildren();return}let n=$i();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}jt>=n.length&&(jt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===jt?"true":"false",s.setAttribute("aria-selected",a===jt?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let l=document.createElement("div");l.className="bloom-rt-project",l.textContent=i.project,s.append(l)}if(i.preview.user||i.preview.assistant){let l=document.createElement("div");if(l.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,l.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,l.append(u)}s.append(l)}s.addEventListener("click",()=>{jt=a,zs()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Vb(){document.getElementById(Un)?.remove(),Oi=null}var xd=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Un}`],settings:X,start(){w("recentTopics",ld),on=an(),qs(on),Fs(),Xr(on),Ns=pt(Nb),Db(),Pi=new AbortController;let{signal:t}=Pi;window.addEventListener("keydown",Fb,{capture:!0,signal:t}),window.addEventListener("keyup",zb,{capture:!0,signal:t}),window.addEventListener("popstate",Bi,{signal:t}),document.addEventListener("click",jb,{capture:!0,signal:t}),document.addEventListener("click",Gb,{signal:t}),document.addEventListener("visibilitychange",Ub,{signal:t}),Rs=kn("schemeChange",()=>Ps())},stop(){Pi?.abort(),Pi=null,Gn!==void 0&&(clearTimeout(Gn),Gn=void 0),$b(),Ns?.(),Ns=null,Rs?.(),Rs=null,ct=!1,Zr=!1,Kr=!1,Vb()},onSettingsChange(){let t=Di(Wr());t.length!==Wr().length&&(X.store.visits=t),ct&&Kn()}});var js="cleaner",Wb=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Yb=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Xb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Zb=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Jb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Qb=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],sn=k({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Vn(t){return`${t.join(",")}{display:none!important}`}function Ed(){let t=[];if(sn.store.hideDownloadApps!==!1&&t.push(Vn(Wb)),sn.store.hideDisclaimer!==!1&&t.push(Vn(Yb)),sn.store.hideUpgrade!==!1&&t.push(Vn(Xb)),sn.store.hideLockedModels!==!1&&t.push(Vn(Zb)),sn.store.hideHomePromo!==!1&&t.push(Vn(Jb)),sn.store.hideAds!==!1&&t.push(Vn(Qb)),!t.length){E(js);return}w(js,t.join(`
`))}var wd=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:sn,start:Ed,onSettingsChange:Ed,stop(){E(js)}});var qi=new S("ResponseNotification"),Yn=k({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:ah},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Gs=!1,_i=null,Wn=null,Jr=null;function th(){return document.visibilityState==="hidden"||document.hidden}function eh(){return Yn.store.onlyWhenHidden===!1?!0:th()}function nh(){let t=Dn(A());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Sd(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!Wn||Wn.state==="closed")&&(Wn=new t);let e=Wn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){qi.debug("chime failed",t)}}function rh(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){qi.debug("custom sound failed",e),Sd()}}function Ld(){let t=String(Yn.store.soundUrl||"").trim();t?rh(t):Sd()}function oh(){let t="Bloom++",e=`${nh()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){qi.debug("notification failed",n)}}function ih(){eh()&&(Yn.store.sound!==!1&&Ld(),Yn.store.browserNotification!==!1&&oh())}function ah(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Ld()),t.appendChild(e),()=>{e.remove()}}var Td=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Yn,start(){Gs=!0,_i?.(),_i=ot(t=>{if(!Gs||t.userStopped||t.error)return;let e=A()||$n();t.conversationId&&t.conversationId!==e||ih()}),Jr?.abort(),Jr=new AbortController,Yn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Jr.signal}),qi.debug("watch started")},stop(){Gs=!1,_i?.(),_i=null,Jr?.abort(),Jr=null;try{Wn?.close()}catch{}Wn=null}});var kd=`#bloom-pq-chip {
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
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
    gap: 6px;
    max-height: min(320px, 46vh);
    overflow: auto;
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
`;var Ne=new S("PromptQueue"),ji="bloom-pq-chip",Cd="promptQueue",Md=80,lh=8,ch=50,uh=2e3,dh='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',mh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,fh=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Us=k({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),Ie=new Map,Ad=0,Ut=!1,At="",I="",Kt=!1,dt=!1,Pe=!1,R=null,Qr=null,Fi=null,He,oo,Re=null,M=null,ae=null,z=!1,F=!1,at=!1;function Oe(){return oe(kt())}function Xn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function ph(t){let e=Xn(Dt(t));if(e)return e;if(!Bt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),Xn(n.innerText||n.textContent||"")}catch{return""}}function Pd(){try{let t=document.querySelectorAll(dh),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Od(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Bd(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&mh.test(n))return!0}}catch{}return!1}function zi(){let t=$n();if(!t)return!1;let e=A();return!e||e===t}function ro(){if(G()||zi())return!1;let t=Pd();if(!t)return!0;if(Od(t)||Bd(t))return!1;try{if(t.querySelector(fh)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function gh(){if(q()||Qe())return z=!1,!1;if(G()||zi())return z=!0,!0;let t=Pd();return t&&(Od(t)||Bd(t))?(z=!0,!0):z&&!ro()?!0:(z=!1,!1)}function Dd(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Ot);return n instanceof HTMLElement?n:null}function Hd(t){return Dd(t)??nt()}function Gi(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function $d(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function bh(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?Xn(e.innerText||e.textContent||""):""}catch{return""}}function hh(){return Ad+=1,`pq${Date.now().toString(36)}${Ad.toString(36)}`}function Z(t){return Ie.get(t)??[]}function _d(t){return Z(t)[0]}function ln(t,e){e.length?Ie.set(t,e):Ie.delete(t)}function qd(t){if(!Z(t).length){F=!1,at=!1,I="";return}F=!0,at=!1,z=!0,I=""}function Id(t){if(!At||At===t)return;let e=Ie.get(At);!e?.length||Ie.has(t)||U(At,t)&&(Ie.delete(At),Ie.set(t,e),I===At&&(I=t),R?.key===At&&(R.key=t),Ne.debug("migrated pending",At,"\u2192",t))}function Ui(t){let e=Oe(),n=Z(e);if(Us.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),ln(e,n)}else if(n.length>=lh){Ne.debug("queue full",e);return}else n.push({id:hh(),text:t,at:Date.now()}),ln(e,n);z=!0,R={key:e,text:t,turns:$d(),ticks:3};let r=nt();r&&re(r,"");try{ut()}catch(o){Ne.error("chip",o)}Ne.debug("queued",e,n.length,t.length)}function Fd(t,e){let n=Z(t).filter(r=>r.id!==e);if(ln(t,n),M===e&&(M=null),!n.length)I===t&&(I=""),R?.key===t&&(R=null);else if(R?.key===t){let r=R.text;n.some(o=>o.text===r)||(R=null)}ut()}function yh(t,e,n){if(!e||e===n)return;let r=Z(t).slice(),o=r.findIndex(s=>s.id===e),i=r.findIndex(s=>s.id===n);if(o<0||i<0)return;let[a]=r.splice(o,1);a&&(r.splice(i,0,a),ln(t,r),ut())}function vh(){dt=!0,clearTimeout(oo),oo=setTimeout(()=>{dt=!1,oo=void 0},uh)}function xh(t){let e=Oe(),n=Z(e).find(a=>a.id===t);if(!n)return;let r=nt();if(!r)return;let o=n.text;ln(e,Z(e).filter(a=>a.id!==t)),M===t&&(M=null),ut(),vh(),re(r,o);let i=we();i&&!_(i)&&!pi(i)&&(i.click(),dt=!1),qd(e)}function to(t){if(!Ut||Kt||F||G()||Oe()!==t)return;let e=_d(t);if(!e){I="";return}if(qt())return;let n=nt();if(!n)return;if(!Ee(n)){let o=Xn(Dt(n));if(o&&o!==e.text)return}let r=we();!r||_(r)||pi(r)||(Kt=!0,re(n,e.text),clearTimeout(He),He=setTimeout(()=>Eh(t,e.id,e.text),ch))}function Eh(t,e,n){He=void 0;try{if(!Ut||F)return;let r=_d(t);if(!r||r.id!==e||r.text!==n||G()||Oe()!==t)return;let o=nt();if(!o)return;let i=Xn(Dt(o));if(i&&i!==n&&!Ee(o))return;i!==n&&re(o,n);let a=we();if(!a||_(a)||pi(a))return;a.click(),ln(t,Z(t).filter(s=>s.id!==e)),ut(),qd(t),Ne.debug("drained",t,Z(t).length)}finally{Kt=!1}}function zd(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="translateX(-50%)";let e=Tt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){t.style.left="50%",t.style.width="min(40rem, calc(100vw - 1rem))",t.style.bottom="6.5rem";return}let o=Math.min(n.width,window.innerWidth-16);t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.width=`${Math.round(Math.max(240,o))}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Ks(){Re?.remove(),Re=null,M=null,ae=null}var Ws="http://www.w3.org/2000/svg";function jd(){let t=document.createElementNS(Ws,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function eo(t){let e=jd();for(let n of t){let r=document.createElementNS(Ws,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function wh(){let t=jd(),e=[[9,5],[15,5],[9,12],[15,12],[9,19],[15,19]];for(let[n,r]of e){let o=document.createElementNS(Ws,"circle");o.setAttribute("cx",String(n)),o.setAttribute("cy",String(r)),o.setAttribute("r","1"),o.setAttribute("fill","currentColor"),t.append(o)}return t}function no(t,e,n,r){let o=document.createElement("button");return o.type="button",o.className="bloom-pq-ico",o.setAttribute("aria-label",t),o.append(e),r&&Gd(o,r,t),o.addEventListener("mousedown",i=>i.preventDefault()),o.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),n()}),o}function Sh(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${ji}`)}function Vs(){let t=Re?.querySelector(".bloom-pq-editing");return t instanceof HTMLElement?t.innerText:null}function Lh(t){t.focus();let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function Ae(t,e){if(M!==t)return;if(M=null,e===null){ut();return}let n=Xn(e),r=Oe();if(!n){Fd(r,t);return}let o=Z(r).find(i=>i.id===t);o&&(o.text=n),ut()}function Nd(t){M!==t&&(M&&Ae(M,Vs()),Z(Oe()).some(e=>e.id===t)&&(M=t,ut()))}function Gd(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function ut(){if(!Ut||!document.body){Ks();return}let t=Oe(),e=Z(t);if(!e.length){Ks();return}M&&!e.some(l=>l.id===M)&&(M=null);let n=Re;n?.isConnected||(n=document.createElement("div"),n.id=ji,document.body.appendChild(n),Re=n),n.replaceChildren();let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("span");i.textContent=`${r} Queued message${r===1?"":"s"}`;let a=document.createElement("span");a.className="bloom-pq-tip",a.hidden=!0,o.append(i,a);let s=document.createElement("div");s.className="bloom-pq-list";let c=null;for(let l of e){let u=document.createElement("div");u.className="bloom-pq-row";let d=M===l.id,m=document.createElement("span");if(m.className=d?"bloom-pq-text bloom-pq-editing":"bloom-pq-text",d)m.textContent=l.text,m.contentEditable="true",m.spellcheck=!1,m.setAttribute("role","textbox"),m.setAttribute("aria-label","Edit queued prompt"),m.addEventListener("keydown",f=>{f.stopPropagation(),f.key==="Enter"?(f.preventDefault(),f.shiftKey||Ae(l.id,m.innerText)):f.key==="Escape"&&(f.preventDefault(),Ae(l.id,null))}),m.addEventListener("blur",()=>Ae(l.id,m.innerText)),c=m;else{let f=l.text.length>Md?`${l.text.slice(0,Md)}\u2026`:l.text;m.textContent=f,m.title=l.text,m.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),Nd(l.id)})}u.append(m);let b=document.createElement("div");if(b.className="bloom-pq-actions",d){let f=no("Save",eo(["M20 6 9 17l-5-5"]),()=>{Ae(l.id,m.innerText)},a),g=no("Cancel",eo(["M18 6 6 18","m6 6 12 12"]),()=>{Ae(l.id,null)},a);b.append(f,g)}else{let f=document.createElement("span");f.className="bloom-pq-ico bloom-pq-grip",f.setAttribute("aria-label","Drag to reorder"),f.draggable=!0,f.append(wh()),Gd(f,a,"Drag to reorder"),f.addEventListener("dragstart",L=>{ae=l.id,L.dataTransfer?.setData("text/plain",l.id),L.dataTransfer&&(L.dataTransfer.effectAllowed="move")}),f.addEventListener("dragend",()=>{ae=null}),u.addEventListener("dragover",L=>{!ae||ae===l.id||(L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move"))}),u.addEventListener("drop",L=>{L.preventDefault();let H=L.dataTransfer?.getData("text/plain")||ae||"";ae=null,yh(t,H,l.id)});let g=no("Remove from queue",eo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{M&&M!==l.id&&Ae(M,Vs()),M=M===l.id?null:M,Fd(t,l.id)},a);g.classList.add("bloom-pq-ico-danger");let p=no("Edit",eo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>Nd(l.id),a),T=no("Send now",eo(["M12 19V5","M6 11 12 5l6 6"]),()=>{M&&M!==l.id&&Ae(M,Vs()),xh(l.id)},a);b.append(f,g,p,T)}u.append(b),s.append(u)}if(n.append(o,s),zd(n),c){let l=c,u=M;queueMicrotask(()=>{M===u&&l.isConnected&&Lh(l)})}}function Th(){if(!R)return;R.ticks-=1;let t=Z(R.key);if(t.length&&$d()>R.turns){let e=bh();if(e&&e===R.text){Ne.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===R.text){n=r;break}n>=0&&t.splice(n,1),ln(R.key,t),!t.length&&I===R.key&&(I=""),R=null,ut();return}}R.ticks<=0&&(R=null)}function Ki(t){return!gh()||!Bt(t)?"":ph(t)}function kh(t){if(!Ut||t.isComposing||t.keyCode===229||t.key!=="Enter"||Sh(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||Kt)return;let e=Hd(t.target)??Hd(document.activeElement);if(!e)return;if(t.altKey||dt){dt=!1,Pe=!0,queueMicrotask(()=>{Pe=!1});return}let n=Ki(e);n&&(Gi(t),Ui(n))}function Ch(t){if(!Ut||Kt||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Pe){Pe=!1;return}if(dt){dt=!1;return}let e=Dd(t.target);if(!e)return;let n=Ki(e);n&&(Gi(t),Ui(n))}function Mh(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||_(e))return null;let n=t.closest(On);if(n instanceof HTMLElement&&!_(n))return n;let r=we();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Rd(t){if(!Ut)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${ji}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&_(n)||Kt||!Mh(e))return;if(dt){dt=!1;return}let r=nt();if(!r)return;let o=Ki(r);o&&(Gi(t),Ui(o))}function Ah(t){if(!Ut)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(fi)&&!e.querySelector(Ot)||Kt)return;if(Pe){Pe=!1;return}if(dt){dt=!1;return}let n=nt()??e.querySelector(Ot);if(!n)return;let r=Ki(n);r&&(Gi(t),Ui(r))}var Ud=y({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Cd,cleanupSelectors:[`#${ji}`],settings:Us,start(){Ut=!0;let t=Us.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),At=Oe(),I="",Kt=!1,dt=!1,Pe=!1,R=null,z=!q()&&!Qe()&&(G()||zi()),F=!1,at=!1,M=null,ae=null,w(Cd,kd),Qr?.abort(),Qr=new AbortController;let{signal:e}=Qr,n={capture:!0,signal:e};window.addEventListener("keydown",kh,n),document.addEventListener("beforeinput",Ch,n),document.addEventListener("pointerdown",Rd,n),document.addEventListener("click",Rd,n),document.addEventListener("submit",Ah,n),Fi?.(),Fi=ot({onFall(r){if(Ut){if(r.userStopped||r.error){z=!1,F=!1,at=!1,I="",ut();return}if(!(F&&!at)){if(F&&at){if(!ro())return;F=!1,at=!1,z=!1,I=r.contextKey,to(r.contextKey);return}if(!ro()){Ne.debug("unsettled fall; keep queue window");return}z=!1,I=r.contextKey,to(r.contextKey)}}},onRise(){q()||Qe()||(F&&(at=!0),z=!0)},onContext(r,o){o&&r&&!U(o,r)&&(z=!1,F=!1,at=!1,I="",Kt=!1,He!==void 0&&(clearTimeout(He),He=void 0)),Id(r),At=r,ut()},onTick(r){Id(r.contextKey),At=r.contextKey,Th(),(q()||Qe())&&(F=!1,at=!1,z=!1,I=""),F&&(G()||zi())&&(at=!0),F&&at&&ro()&&(F=!1,at=!1,z=!1,Z(r.contextKey).length&&(I=r.contextKey,to(r.contextKey))),!F&&z&&ro()&&(z=!1,!I&&Z(r.contextKey).length&&(I=r.contextKey,to(r.contextKey))),!F&&I&&I===r.contextKey&&to(I),Z(r.contextKey).length&&!Re?.isConnected?ut():Re&&zd(Re)}}),ut(),Ne.debug("watch started")},stop(){Ut=!1,Fi?.(),Fi=null,Qr?.abort(),Qr=null,clearTimeout(He),He=void 0,clearTimeout(oo),oo=void 0,Ie.clear(),R=null,I="",Kt=!1,dt=!1,Pe=!1,z=!1,F=!1,at=!1,ae=null,Ks()}});var Kd=`.bloom-cls {
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
`;var Yd=new S("ChatListStatus"),Vd="chatListStatus",Yi="bloom-cls",Ih="bloom-cls",Nh=1200*1e3,Rh="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Ht=new Map,Vt=!1,yt="",se=!1,Qn=!1,vt=0,Be=null,Zs=null,Zn=null,Ys=null,Vi=null,io=null,Jn=!1,De=new Set;function Wi(){return Date.now()}function Xd(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function le(t,e,n,r=!0){if(!(!t||!Vt)){if(e==="idle")Ht.delete(t);else{let o=Ht.get(t);o&&o.kind===e&&n!=="net"?o.at=Wi():Ht.set(t,{kind:e,at:Wi(),source:n})}r&&Ph({v:1,id:t,kind:e,at:Wi()}),cn()}}function Ph(t){try{Zn?.postMessage(t)}catch{}}function Oh(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||le(e.id,e.kind,"bc",!1)}function Bh(){let t=Wi();for(let[e,n]of Ht)n.kind==="streaming"&&t-n.at>Nh&&Ht.delete(e)}function Dh(){let t=Xd();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Rh))continue;let o=ie(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Wd(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Xs(t){let e=t.querySelector(`:scope > .${Yi}`);return e||null}function Js(){if(!Vt)return;Bh();let t=A(),e=Dh();Be?.disconnect();try{for(let n of e){let r=ie(n.getAttribute("href")||"");if(!r||!t||r!==t){Xs(n)?.remove();continue}let i=Ht.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Xs(n)?.remove();continue}let a=Xs(n);a||(a=document.createElement("span"),a.className=Yi,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Wd("streaming")):i==="error"&&a.appendChild(Wd("error")))}}catch(n){Yd.debug("paint failed",n)}Zd()}function cn(){if(Vt){if(document.hidden){vt&&(cancelAnimationFrame(vt),vt=0),Js();return}vt||(vt=requestAnimationFrame(()=>{vt=0,Vt&&Js()}))}}function Zd(){let t=Xd();if(!(Be&&Zs===t&&t?.isConnected)){if(Be?.disconnect(),Zs=t,!t){Be=null;return}Be=new MutationObserver(()=>cn()),Be.observe(t,{childList:!0,subtree:!0})}}function Xi(){return!!(We()||_r())}function $h(t){return!!(Jn||t&&De.has(t)||!Qn&&!q()&&Xi())}function _h(t){if(Vt){if(t.type==="post-start"){Qn=!1,t.conversationId?(Jn=!1,De.add(t.conversationId),se=!0,le(t.conversationId,"streaming","net")):(Jn=!0,se=!0);return}if(t.type==="post-end"){if(Jn=!1,t.conversationId){De.delete(t.conversationId);let e=A(),n=$n();(e?t.conversationId===e:t.conversationId===n)?le(t.conversationId,t.error?"error":"done","net"):le(t.conversationId,"idle","net")}Xi()||(se=!1)}}}function qh(t,e){if(!Vt)return;if(U(e,t)){cn();return}let n=A();if(yt&&yt!==n){De.delete(yt);let r=Ht.get(yt);r&&r.kind!=="idle"&&le(yt,"idle","local")}Jn=!1,se=!1,Qn=!0,n&&Ht.get(n)?.kind==="streaming"&&Ht.get(n)?.source==="local"&&!De.has(n)&&le(n,"idle","local"),cn()}function Fh(t){if(!Vt)return;let e=t.conversationId||A();if(yt&&e&&yt!==e){De.delete(yt);let r=Ht.get(yt);r&&r.kind!=="idle"&&le(yt,"idle","local"),se=!!(e&&De.has(e))}if(e&&(yt=e),Qn||q()){if(q()||Xi()||t.streaming){cn();return}Qn=!1}if($h(e)&&(t.streaming||Xi())){se=!0,e&&le(e,"streaming","local"),cn();return}se&&(se=!1,e&&le(e,qt()?"error":"done","local")),cn()}var Jd=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Yi}`],start(){Vt=!0,w(Vd,Kd);try{Zn=new BroadcastChannel(Ih)}catch{Zn=null}Zn?.addEventListener("message",Oh),Ys=pt(_h),Vi?.(),Vi=ot({onTick:Fh,onContext:qh}),io?.abort(),io=new AbortController,document.addEventListener("visibilitychange",()=>{Vt&&(vt&&(cancelAnimationFrame(vt),vt=0),Js())},{signal:io.signal}),Zd(),Yd.debug("sidebar status watch started")},stop(){Vt=!1,vt&&cancelAnimationFrame(vt),vt=0,io?.abort(),io=null,Be?.disconnect(),Be=null,Zs=null,Vi?.(),Vi=null,Ys?.(),Ys=null;try{Zn?.close()}catch{}Zn=null,Ht.clear(),De.clear(),Jn=!1,se=!1,Qn=!1,yt="",document.querySelectorAll(`.${Yi}`).forEach(t=>t.remove()),E(Vd)}});var tm="widerChat",em=40,nm=96,rm=64,om=k({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:em,max:nm,default:rm}});function zh(){return et(Number(om.store.width??rm),em,nm)}function Qd(){let t=zh(),e=`min(100%,${t}rem)`;w(tm,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var im=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:om,start:Qd,onSettingsChange:Qd,stop(){E(tm)}});var Qs="composerOpacity",tr='form[data-type="unified-composer"],form.w-full[data-type]',jh=[`${tr} [class*="corner-superellipse"]`,`${tr} [class*="bg-token-bg-primary"]`,`${tr} [class*="bg-token-main-surface"]`].join(","),Gh=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Uh="#thread-bottom-container,#thread-bottom",Kh=`${tr} #prompt-textarea,${tr} [contenteditable="true"]`,Vh="var(--bg-primary,var(--main-surface-primary,#ffffff))",tl=k({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Wh(){return et(Number(tl.store.opacity??100),0,100)}function Yh(){return et(Number(tl.store.blur??16),0,40)}function am(){let t=Wh();if(t>=100){E(Qs);return}let e=Yh(),n=`color-mix(in srgb,${Vh} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(Qs,`${Uh}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Gh}{display:none!important}${tr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${jh}{background-color:${n}!important;background-image:none!important;${r}}${Kh}{background-color:transparent!important;background-image:none!important}`)}var sm=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:tl,start:am,onSettingsChange:am,stop(){E(Qs)}});var lm=`#bloom-bn-host {
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
`;var Zh=new S("BetterNavigator"),el="betterNavigator",mm="bloom-bn-host",pn=60,Jh=16,Qh=1e3,t0=2.5,e0=.4,Qi="\u6B63\u5728\u8F93\u51FA\u2026",il="Image",n0="\u2753",r0="\u{1F916}",cm=/file_[0-9a-f]+/gi,o0="File",i0="Code",a0=".markdown, .whitespace-pre-wrap",dl=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),s0="img, picture, video, canvas",l0=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,c0=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,mo=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,u0=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,d0=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,m0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,f0=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,p0=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,g0=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,b0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),h0=2e3,y0=40,v0=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,x0=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),E0=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),w0=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),S0=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),sa=k({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),nr=new Map,uo=new Map,Yt=new Set,ta=0,It=!1,ue=!1,er=!1,$e=null,fo=null,mn=null,ea=null,J=[],fn="",na=0,ra=-1,ml=0,oa="",xt=0,ce=0,ao,so=null,Zi=null,nl=null,rl=null,un=null,al=null,lo=null,dn=null,rr=null,co=null;function la(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function ol(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function L0(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function T0(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)v0.test(L0(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=ol(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||ol(getComputedStyle(t).getPropertyValue("--thread-content-width"))||ol(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function ia(t){try{return!!t.closest(E0)}catch{return!0}}function um(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function ca(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function fl(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function k0(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Ji(t,e){if(t){cm.lastIndex=0;for(let n of t.matchAll(cm))e.add(n[0].toLowerCase())}}function C0(t){try{let e=new Set,n=s=>{k0(s)||(Ji(s.getAttribute("src")||"",e),Ji(s.getAttribute("srcset")||"",e),Ji(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Ji(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let c of s.querySelectorAll("[src], [srcset], [href]"))n(c)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=ca(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function M0(t,e){let n=C0(t),r=uo.get(e)??0,o=Math.max(r,n);return o>0&&uo.set(e,o),o>=2?`${il} x${o}`:il}function K(t){return t.replace(/\s+/g," ").trim()}function fm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(w0))return!0;n=n.parentElement}return!1}function aa(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(fm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(dl);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return K(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<pn+20;)e.push(K(r.textContent||""));return K(e.join(" "))}function po(t){let e=K(t);return e.length<3||e.length>180||mo.test(e)?!1:l0.test(e)?!0:c0.test(e)}function ua(t){let e=K(t);return e.length<8||e.length>120||/\s/.test(e)||mo.test(e)||po(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function A0(t){let e=[],n=i=>{let a=K(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(K(s[1])),e.push(K(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function H0(t){try{return ia(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function pl(t){let e=K(t);return!e||gl(e)||ua(e)?!0:po(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function I0(t){return!t.length||t.length>4||!t.every(e=>pl(e))?!1:t.some(e=>mo.test(K(e))||po(e)||ua(e))}function pm(t){try{let e=null,n=0,r=`${dl}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(H0(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=A0(o);if(!i.length||i.length>4||i.join(" ").length>240||!I0(i))continue;let a=i.some(l=>mo.test(K(l))),s=i.some(l=>po(l)||ua(l)),c=a&&s?3:s?2:1;c>=n&&(e=o,n=c)}return e}catch{return null}}function N0(t){return pm(t)?o0:""}function R0(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(u0.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function P0(t){try{for(let e of t.querySelectorAll(s0))if(!R0(e))return!0}catch{}return!1}function gl(t){let e=K(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||f0.test(e)||m0.test(e)?!0:e.length<=24&&(p0.test(e)||mo.test(e))}function O0(t){let e=[],n=new Set,r=o=>{try{if(fm(o,t)||o.closest(dl))return}catch{return}let i=aa(o);!i||n.has(i)||gl(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>pn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(aa(o).length<24)&&(r(o),e.join(" ").length>pn+20))break}}catch{}return K(e.join(" "))}function B0(t){let e=pm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=K(i.innerText||i.textContent||"");!a||a.length>pn+20||r.has(a)||pl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return K(n.join(" "))}function D0(t,e){let n=[];try{for(let o of t.querySelectorAll(a0)){if(ia(o))continue;let i=aa(o);if(!(!i||e==="assistant"&&gl(i)||pl(i))&&(n.push(i),n.join(" ").length>pn+20))break}}catch{}let r=K(n.join(" "));if(e==="user"){let o=B0(t);if(o)return o}return r||(e==="assistant"?O0(t):"")}function $0(t){return t.length>pn?`${t.slice(0,pn).trimEnd()}\u2026`:t}function dm(t){return g0.test(t)}function _0(t,e,n,r){let o=D0(t,e);if(o)return $0(o);if(r)return Qi;let i=N0(t);if(i)return i;if(fl(t))return M0(t,ca(t));try{if(P0(t))return il;if(t.querySelector("pre, code"))return i0}catch{}return`Message ${n+1}`}function q0(){if(ue)return!0;let t=A();return!!(t&&Yt.has(t)||!er&&!q()&&go())}function go(){return!!(We()||_r())}function F0(){ta=Date.now()}function gm(t){ue=!1,t&&Yt.delete(t);let e=A();e&&Yt.delete(e)}function z0(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function j0(t){if(fl(t)||!go())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!aa(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function bl(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=K(e.textContent||"");if(!(n.length>32)&&d0.test(n))return!0}}catch{}return!1}function bm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function G0(t,e){try{if(z0(t))return!0;if(!e)return!1;if(j0(t)||bl(t))return!0}catch{}return!1}function hm(t){if(!t||go())return!1;try{if(bl(t)||bm(t))return!1;if(t.querySelector(b0)||fl(t))return!0}catch{}return!1}function U0(t){if(go()||ta&&Date.now()-ta<h0)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!hm(e.el)||gm()}function K0(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(x0)){if(ia(r))continue;let i=ca(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(ia(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function V0(){let t=la();if(!t||t===document.body)return[];let e=sa.store.showAssistant!==!1,n=e&&q0(),r=K0(t),o=null;if(e)for(let a of r)um(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=ca(a);if(!s)continue;let c=um(a);if(c!=="user"&&c!=="assistant"||c==="assistant"&&!e)continue;let l=a===o,u=l&&bl(a),d=l&&bm(a),m=c==="assistant"&&l&&!hm(a)&&(u||d||n||G0(a,!0)),b=_0(a,c,i.length,m);if(b&&b!==Qi){let g=nr.get(s),p=!!g&&(po(g)||ua(g));(!g||p||!dm(b)||dm(g))&&b!==g&&nr.set(s,b)}let f=m&&b===Qi?Qi:nr.get(s)||b;i.push({id:s,el:a,role:c,text:f,live:m})}}catch{}return U0(i),i}function W0(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function ym(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function Y0(t){return t===window?window.innerHeight:t.clientHeight}function X0(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(S0)}catch{return!1}}function vm(){ao!==void 0&&(clearTimeout(ao),ao=void 0),so?.classList.remove("bloom-bn-flash"),so=null}function Z0(t){vm(),t.classList.add("bloom-bn-flash"),so=t,ao=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),so===t&&(so=null),ao=void 0},800)}function sl(t){if(!J.length)return;let e=Math.max(0,Math.min(t,J.length-1));na=e,fo?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),mn?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),ea&&(ea.textContent=`${e+1} / ${J.length}`);let n=mn?.children[e];if(n instanceof HTMLElement){let r=mn;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function ll(t){let e=J[t];if(!e?.el.isConnected)return;ra=t,ml=Date.now()+Qh,sl(t);let n=rr??ym(e.el),o=Math.abs(e.el.getBoundingClientRect().top-W0())>t0*Y0(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),sa.store.jumpEffect!=="none"&&Z0(e.el)}function hl(){if(!It||!J.length)return;if(Date.now()<ml&&ra>=0){sl(ra);return}let t=window.innerHeight*e0,e=0;for(let n=0;n<J.length;n++){let r=J[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}sl(e)}function J0(t){let e=ym(t);if(rr===e&&co)return;co?.(),rr=e;let n=e===window?document:e,r=()=>{hl(),yl()};n.addEventListener("scroll",r,{passive:!0}),co=()=>n.removeEventListener("scroll",r)}function Q0(t){dn?.disconnect(),dn=null;let e=rr instanceof HTMLElement?rr:null;dn=new IntersectionObserver(()=>hl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&dn.observe(n.el)}function ty(){if(!document.body)return null;let t=$e;if(t?.isConnected)return t;t=document.createElement("div"),t.id=mm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),$e=t,fo=e,mn=i,ea=o,t}function xm(){let t=$e,e=la();if(!t||!e||!e.isConnected||J.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=T0(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),c=s-a;if(c<96||n.width<160){t.hidden=!0;return}let l=t.offsetWidth||y0,d=n.right-r.right>=l+8?r.right+4:r.right-12-l;d=Math.min(d,n.right-l-8),d=Math.max(8,d);let m=Math.max(8,Math.round(window.innerWidth-d-l));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(c)}px`,t.style.right=`${m}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(c)}px`)}function yl(){!It||ce||(ce=requestAnimationFrame(()=>{ce=0,It&&xm()}))}function ey(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function ny(t){let e=fo,n=mn;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Jh),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=ey(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",l=>{l.preventDefault(),ll(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?n0:r0;let c=document.createElement("span");c.className="bloom-bn-label",c.textContent=r.text,c.title=r.text,a.append(s,c),a.addEventListener("click",l=>{l.preventDefault(),ll(o)}),n.appendChild(a)}))}function ry(t){fo?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=mn?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function oy(){let t=A();return t===oa?!1:(oa=t,nr.clear(),uo.clear(),J=[],fn="",na=0,ra=-1,ml=0,ue&&t&&(Yt.add(t),ue=!1),!0)}function iy(t){let e=sa.store.showAssistant!==!1?"1":"0";return`${oa}|${e}|${t.map(n=>n.id).join(",")}`}function cl(){if(!It)return;oy();let t=V0(),e=la();if(!e||t.length<1){J=t,fn="",$e&&($e.hidden=!0),dn?.disconnect(),ul();return}ty();let n=iy(t);n!==fn?(J=t,fn=n,ny(t),J0(e),Q0(t)):(J=t,ry(t)),xm(),hl(),ul()}function Wt(){if(It){if(document.hidden){xt&&(cancelAnimationFrame(xt),xt=0),cl();return}xt||(xt=requestAnimationFrame(()=>{xt=0,It&&cl()}))}}function ul(){let t=la();if(!(un&&al===t&&t?.isConnected)){if(un?.disconnect(),lo?.disconnect(),al=t,!t||t===document.body){un=null;return}un=new MutationObserver(()=>Wt()),un.observe(t,{childList:!0,subtree:!0}),lo=new ResizeObserver(()=>yl()),lo.observe(t)}}function ay(t){if(It){if(t.type==="post-start"){F0(),er=!1,t.conversationId?(ue=!1,Yt.add(t.conversationId)):ue=!0,Wt();return}if(t.type==="post-end"){if(ue=!1,t.conversationId)Yt.delete(t.conversationId);else{let e=A();e&&Yt.delete(e)}Wt()}}}function sy(t){if(!It||!J.length||$e?.hidden||t.altKey||t.ctrlKey||t.metaKey||X0(t.target))return;let e=-1;if(t.key==="ArrowDown")e=na+1;else if(t.key==="ArrowUp")e=na-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=J.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),ll(Math.max(0,Math.min(e,J.length-1)))}function ly(){vm(),dn?.disconnect(),dn=null,un?.disconnect(),un=null,al=null,lo?.disconnect(),lo=null,co?.(),co=null,rr=null,$e?.remove(),$e=null,fo=null,mn=null,ea=null}var Em=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:el,cleanupSelectors:[`#${mm}`],settings:sa,start(){It=!0,oa=A(),w(el,lm),Zi=new AbortController;let{signal:t}=Zi;window.addEventListener("keydown",sy,{signal:t}),window.addEventListener("popstate",Wt,{signal:t}),window.visualViewport?.addEventListener("resize",yl,{signal:t}),document.addEventListener("visibilitychange",()=>{It&&(xt&&(cancelAnimationFrame(xt),xt=0),ce&&(cancelAnimationFrame(ce),ce=0),cl())},{signal:t}),rl=pt(ay),nl=ot({onTick(){if(q()){Wt();return}er&&!go()&&(er=!1),Wt()},onFall(e){gm(e.conversationId),Wt()},onContext(e,n){if(!U(n,e)){nr.clear(),uo.clear(),fn="",ue=!1;let r=A();for(let o of[...Yt])o!==r&&Yt.delete(o);er=!0}Wt()}}),ul(),Wt(),Zh.debug("navigator started")},stop(){It=!1,xt&&cancelAnimationFrame(xt),xt=0,ce&&cancelAnimationFrame(ce),ce=0,Zi?.abort(),Zi=null,nl?.(),nl=null,rl?.(),rl=null,Yt.clear(),ue=!1,er=!1,ta=0,ly(),nr.clear(),uo.clear(),J=[],fn="",E(el)},onSettingsChange(){fn="",Wt()}});var wm=`.bloom-ts {
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
`;function Sm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Lm(t){try{return new Date(t).toISOString()}catch{return""}}var Cm=new S("MessageTimestamps"),Tm="messageTimestamps",ma="bloom-ts",km=1500,uy="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",or=k({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),ir=new Map,hn=!1,Et=0,_e=null,xl=null,vl=null,da=null,bo=null,ho=!1,gn=!1;function Mm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function wl(){let t=or.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Am(){let t={...wl()};for(let[n,r]of ir)t[n]=r;let e=Object.keys(t);if(e.length>km){let n=e.slice(e.length-km),r={};for(let o of n)r[o]=t[o];or.store.stamps=r;return}or.store.stamps=t}var dy=sc(Am,500);function Hm(t,e){!t||!e||ir.get(t)===e||(ir.set(t,e),dy(),bn())}function my(t){return t?ir.get(t)??wl()[t]??vi(t)??null:null}function fy(t){hn&&t.type==="message-time"&&Hm(t.messageId,t.createTime)}function py(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function gy(){let t=Mm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(uy)||e.push(n)}catch{}return e}function by(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function El(){if(!hn)return;let t=or.store.hideOwnMessages===!0,e=or.store.showDate!==!1,n=G();gn&&!q()&&(gn=!1),gn&&(n?ho=!1:gn=!1);let r=gn?!1:n,o=gy();_e?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",c=py(i),l=i.querySelector(`:scope > .${ma}`);if(t&&c==="user"){l?.remove();return}if(by(i)){l?.remove();return}let u=my(s);if(!u&&s&&(r||ho)&&a>=o.length-2&&(u=Date.now(),Hm(s,u)),!u){l?.remove();return}let d=Sm(u,e);if(!d){l?.remove();return}let m=l;m||(m=document.createElement("time"),m.className=ma,m.setAttribute("aria-hidden","true"),i.insertBefore(m,i.firstChild)),m.textContent!==d&&(m.textContent=d);let b=Lm(u);b&&m.getAttribute("datetime")!==b&&m.setAttribute("datetime",b)})}catch(i){Cm.debug("paint failed",i)}ho=r,Im()}function bn(){if(hn){if(document.hidden){Et&&(cancelAnimationFrame(Et),Et=0),El();return}Et||(Et=requestAnimationFrame(()=>{Et=0,hn&&El()}))}}function Im(){let t=Mm();if(!(_e&&xl===t&&t?.isConnected)){if(_e?.disconnect(),xl=t,!t||t===document.body){_e=null;return}_e=new MutationObserver(()=>bn()),_e.observe(t,{childList:!0,subtree:!0})}}var Nm=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ma}`],settings:or,start(){hn=!0,w(Tm,wm);let t=wl();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&ir.set(e,n);vl=pt(fy),da?.(),da=ot({onTick:bn,onFall:bn,onContext(e,n){U(n,e)||(gn=!0,ho=!1),bn()}}),bo?.abort(),bo=new AbortController,document.addEventListener("visibilitychange",()=>{hn&&(Et&&(cancelAnimationFrame(Et),Et=0),El())},{signal:bo.signal}),Im(),bn(),Cm.debug("timestamp watch started")},stop(){hn=!1,Et&&cancelAnimationFrame(Et),Et=0,bo?.abort(),bo=null,_e?.disconnect(),_e=null,xl=null,da?.(),da=null,vl?.(),vl=null,gn=!1,ho=!1,Am(),ir.clear(),document.querySelectorAll(`.${ma}`).forEach(t=>t.remove()),E(Tm)},onSettingsChange:bn});var Sl="streamerMode",hy="filter:blur(6px)!important;transition:filter .2s ease",yy="filter:none!important",ar=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],sr=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function wt(t,e){return t.map(n=>`${n} ${e}`)}var yn=k({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function lr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${hy}}${e?`${r}{${yy}}`:""}`}function Rm(){let t=[];if(yn.store.conversations!==!1&&(t.push(lr([...wt(sr,'a[href^="/c/"]'),...wt(sr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),yn.store.projects!==!1&&(t.push(lr([...wt(sr,'a[href*="/project"]'),...wt(sr,'a[href*="/g/g-p-"]'),...wt(sr,'[data-testid="project-name"]'),...wt(sr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),yn.store.headerTitle!==!1&&t.push(lr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),yn.store.accountAvatar!==!1&&t.push(lr([...wt(ar,"img"),...wt(ar,'[class*="avatar"]'),...wt(ar,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),yn.store.accountName!==!1&&t.push(lr([...wt(ar,".min-w-0 > .truncate"),...wt(ar,".min-w-0.flex-1 .truncate")],!1)),yn.store.accountEmail!==!1&&t.push(lr([...wt(ar,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){E(Sl);return}w(Sl,t.join(`
`))}var Pm=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:yn,start:Rm,onSettingsChange:Rm,stop(){E(Sl)}});var Om=`.bloom-gc-panel {
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
}`;var xy=new S("GreetingCustomizer"),cr="greetingCustomizer",Bm="greetingCustomizerUi",yo=100,Tl=30,Ey=120,wy=1e3,Sy=50,Ly=40,Ty=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),vo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),ha=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function ky(t){return!!t?.closest(Ty)}function qm(t){return!!(ky(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function ko(t){try{for(let e of document.querySelectorAll(t))if(!qm(e))return e}catch{}return null}function Ll(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(ko(e))return e;return t}var Fm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],Q=k({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:zy},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Fm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Xt=!1,mr=!1,xn=null,pa,xo,ur,Eo,ga=0,fa=null,dr=null,wo=null,So=null,Lo=null,ba=null;function me(){let t=location.pathname||"/";return t==="/"||t===""}function vn(){let t=Q.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Fm.slice()}function To(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Dm(t){Q.store.greetings=t.slice(0,Tl)}function Co(){let t=String(Q.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Cy(){return Q.store.order==="random"?"random":"sequential"}function My(){return et(Number(Q.store.intervalSec??10),1,3600)*1e3}function Ay(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Hy(){return!!ko(ha)}function ya(){return!!(ko(ha)||ko(vo))}function Iy(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Hy()?Ll(ha):ko(vo)?Ll(vo):Ll(ha),i=e?`${vo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Ny(t,e){if(t<=0)return 0;if(t===1)return Number(Q.plain.index)!==0&&(Q.store.index=0),Number(Q.plain.lastRandom)!==0&&(Q.store.lastRandom=0),0;let n=Number(Q.plain.index),r=Number(Q.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Cy()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),c=0;for(;s===a&&c++<10;)s=Math.floor(Math.random()*t);return Q.store.index=s,Q.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return Q.store.index=i,i}function de(t){if(!Xt)return;if(!me()){E(cr);return}let e=vn().map(To).filter(Boolean);if(!e.length){E(cr);return}let n=Ny(e.length,t),r=e[n]??e[0],o=Co()==="manual"&&e.length>1;w(cr,Iy(Ay(r),o)),ba?.()}function kl(){pa!==void 0&&(clearInterval(pa),pa=void 0)}function Cl(){kl(),!(!Xt||!me())&&Co()==="interval"&&(vn().filter(Boolean).length<=1||(pa=setInterval(()=>de(!0),My())))}function Ml(){Eo!==void 0&&(clearTimeout(Eo),Eo=void 0),ga=0}function $m(){if(Ml(),!Xt||!me())return;ga=Ly;let t=()=>{if(Eo=void 0,!(!Xt||!me())){if(ya()){Co()==="refresh"&&!mr?(mr=!0,de(!0)):de(!1),Cl();return}ga-=1,ga>0&&(Eo=setTimeout(t,Sy))}};t()}function Al(){if(xn===!0){ya()?de(!1):$m();return}xn=!0,mr=!1,Co()==="refresh"?(mr=!0,de(!0)):de(!1),Cl(),ya()||$m()}function Hl(){xn=!1,mr=!1,kl(),Ml(),E(cr)}function va(){ur===void 0&&(ur=window.setTimeout(()=>{ur=void 0,Xt&&(me()?Al():xn!==!1&&Hl())},Ey))}function Ry(){dr||(dr=history.pushState.bind(history),wo=history.replaceState.bind(history),So=function(...e){let n=dr(...e);return va(),n},Lo=function(...e){let n=wo(...e);return va(),n},history.pushState=So,history.replaceState=Lo)}function Py(){So&&history.pushState===So&&dr&&(history.pushState=dr),Lo&&history.replaceState===Lo&&wo&&(history.replaceState=wo),dr=null,wo=null,So=null,Lo=null}function Oy(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(va)}function By(t){if(!Xt||!me()||Co()!=="manual"||vn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(vo);if(!n||qm(n))return;let r=window.getSelection?.();r&&String(r).trim()||de(!0)}function Dy(){xo===void 0&&(xo=setInterval(()=>{if(!Xt)return;let t=me();if(t!==(xn===!0)){t?Al():Hl();return}t&&ya()&&de(!1)},wy))}function $y(){xo!==void 0&&(clearInterval(xo),xo=void 0)}function _m(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var _y="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",qy="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Fy(t,e){let n=To(t);return n?n.length>yo?`Keep it to ${yo} characters.`:vn().length+(e?1:0)>Tl?`At most ${Tl} greetings.`:null:"Enter a greeting."}function zy(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=vn(),s=Number(Q.plain.index);t.replaceChildren();let c=document.createElement("div");c.className="bloom-gc-composer";let l=document.createElement("textarea");l.className="bloom-gc-input",l.rows=3,l.maxLength=yo,l.placeholder="New greeting (line breaks ok)",l.value=e,l.addEventListener("input",()=>{e=l.value,r="";let p=c.querySelector(".bloom-gc-count");p&&(p.textContent=`${To(e).length}/${yo}`);let T=c.querySelector(".bloom-gc-error");T&&(T.textContent="")}),c.appendChild(l);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${To(e).length}/${yo}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=r;let b=document.createElement("div");if(b.className="bloom-gc-actions",n>=0){let p=document.createElement("button");p.type="button",p.className="bloom-gc-btn",p.textContent="Cancel",p.addEventListener("click",()=>{n=-1,e="",r="",i()}),b.appendChild(p)}let f=document.createElement("button");if(f.type="button",f.className="bloom-gc-btn bloom-gc-btn-primary",f.textContent=n>=0?"Update":"Add",f.addEventListener("click",()=>{let p=n<0,T=Fy(e,p);if(T){r=T,i();return}let L=To(e),H=vn().slice();n>=0&&n<H.length?H[n]=L:H.push(L),Dm(H),n=-1,e="",r="",i()}),b.appendChild(f),u.append(d,m,b),c.appendChild(u),t.appendChild(c),!a.length){let p=document.createElement("p");p.className="bloom-gc-empty",p.textContent="No greetings. The official heading stays.",t.appendChild(p);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((p,T)=>{let L=document.createElement("div");L.className="bloom-gc-item",T===s&&(L.dataset.active="true");let H=document.createElement("button");H.type="button",H.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,H.textContent=p,H.addEventListener("click",()=>{o=o===T?-1:T,i()});let Qt=document.createElement("div");Qt.className="bloom-gc-item-actions";let Nt=_m("Edit",_y);Nt.addEventListener("click",()=>{n=T,e=p,r="",i()});let st=_m("Delete",qy);st.addEventListener("click",()=>{let O=vn().filter((mt,te)=>te!==T);Dm(O),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),Qt.append(Nt,st),L.append(H,Qt),g.appendChild(L)}),t.appendChild(g)};return ba=i,i(),()=>{ba===i&&(ba=null),t.replaceChildren()}}var zm=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Bm,settings:Q,start(){Xt=!0,w(Bm,Om),Ry(),fa=new AbortController;let{signal:t}=fa;window.addEventListener("popstate",va,{signal:t}),document.addEventListener("click",Oy,{capture:!0,signal:t}),document.addEventListener("click",By,{signal:t}),Dy(),xn=null,me()?Al():Hl(),xy.debug("started")},stop(){Xt=!1,fa?.abort(),fa=null,ur!==void 0&&(clearTimeout(ur),ur=void 0),kl(),Ml(),$y(),Py(),E(cr),mr=!1,xn=null},onSettingsChange(){Xt&&(me()?(de(!1),Cl()):E(cr))}});function jy(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function xa(t){try{return await createImageBitmap(t)}catch{return null}}async function Gy(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Ea(t){if(t.startsWith("data:")){let e=jy(t);if(e){let n=await xa(e);if(n)return n}return Gy(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?xa(await e.blob()):null}catch{return null}}var Sa="data-bloom-csi-slot",Uy="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Ky=/\bsize-(?:[6-9]|10)\b/,Vy=/\b(?:h|w)-(?:[6-9]|10)\b/,Wy=/^(plus|pro|free|team|go|business|enterprise)$/i,Yy=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function wa(t){return t.getAttribute("class")||""}function Gm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Ky.test(t)?!0:Vy.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Xy(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Um(e)}function Um(t){return Wy.test(String(t??"").replace(/\s+/g,""))}function Zt(t){return!!t?.closest(Uy)}function La(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Mo(t){let e=wa(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Um(t.textContent||"")}function Ta(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Ao(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Zy(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Km(t){if(Zt(t)||Ta(t)||Ao(t)||Mo(t)||La(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Vm(t){return Zt(t)||Ta(t)||Ao(t)||Mo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Xy(t.textContent||"")}function Wm(t){return Zt(t)||Ao(t)||La(t)||Mo(t)?!1:Gm(wa(t))||Vm(t)?!0:Km(t)}function jm(t){return!(Zt(t)||La(t)||Ao(t)||Mo(t)||Ta(t))}function En(t,e){let n=Ta(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Ao(n)||La(n)||Mo(n));)Zt(n)||(r=n),n=n.parentElement;return r}function Jy(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Zt(e))continue;if(Zy(wa(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!jm(o))){if(Wm(o)||Gm(wa(o)))return En(o,t)??o;r.push(o)}if(r.length===1)return En(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&jm(r))return En(r,t)??r}}return null}function Qy(t){let e=t.querySelectorAll(Yy);for(let n of e)if(Wm(n))return En(n,t)??n;return null}function tv(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Vm(e))return En(e,t)??e;return null}function ev(t){for(let e of t.querySelectorAll("*"))if(Km(e))return En(e,t)??e;return null}function Ym(t,e){if(Zt(t))return null;if(e&&!Zt(e)&&t.contains(e)){let n=En(e,t);if(n)return n}return Jy(t)??Qy(t)??tv(t)??ev(t)}function Xm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var fr="data-bloom-csi",ka="data-bloom-csi-orig",wn=new Set,Zm=null;function Nl(t){Zm=t}function Jm(t){return`url(${JSON.stringify(t)})`}function Ca(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Rl(t,e,n){let r=Jm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Qm(t,e=Sa){let n=Jm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function nv(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function pr(t){t.removeEventListener("error",Il);let e=t.getAttribute(ka);t.removeAttribute(fr),t.removeAttribute(ka),e&&t.getAttribute("src")!==e&&(t.src=e)}function Il(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&wn.add(n),pr(e),Zm?.()}function tf(t,e){if(!e||wn.has(e)){pr(t);return}nv(t);let n=t.getAttribute("src")??"";if(t.getAttribute(fr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(ka)&&t.setAttribute(ka,n);t.setAttribute(fr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Il),t.addEventListener("error",Il),n!==e&&(t.src=e)}var ef=`/*
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
`;var nf=new S("CustomSidebarIdentity"),rf="customSidebarIdentityUi",sf="customSidebarIdentity",ov="bloom-csi-face",iv="bloom-csi-name",gr=Sa,av=1024,Ma=256,lf=24,cf=64,uf=40,Dl=1,$l=4,Ho=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Pl=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=k({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Lv},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:lf,max:cf,default:uf},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Ln(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function sv(){return String(x.store.displayName??"").trim()}function Ia(t,e,n,r,o){let i=et(n,Dl,$l),a=Math.min(t,e)/i,s=et(r,a/2,Math.max(a/2,t-a/2)),c=et(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:c}}function lv(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function _l(t){let e=Math.min(1,av/Math.max(t.width,t.height));return lv(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function cv(t,e,n,r){let{side:o,x:i,y:a}=Ia(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Ma,s.height=Ma;let c=s.getContext("2d");if(!c)return null;c.imageSmoothingEnabled=!0,c.imageSmoothingQuality="high",c.drawImage(t,i-o/2,a-o/2,o,o,0,0,Ma,Ma);let l=s.toDataURL("image/png");return l.startsWith("data:image/")?l:null}async function uv(t){let e=await xa(t);if(!e)return null;let n=_l(e);return e.close(),n}async function Fl(t,e,n,r){let o=await Ea(t);if(!o)return null;let i=cv(o,e,n,r);return o.close(),i}function zl(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function of(){x.store.avatarUrl="",x.store.avatarSource="",zl()}var af=0;async function ql(t){let e=++af;zl(),x.store.avatarSource=t;let n=await Fl(t,.5,.5,1);return e!==af?!1:(n&&(x.store.avatarUrl=n),!!n)}function Io(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Ol(t){let e=Io(t);if(!e)return!1;let n=await uv(e);return n?ql(n):!1}var St=!1,br=!1,hr=0,Na=0,Aa=null,qe=new Map,yr=null,fe=null,Ra=null,Jt=null,Pa=null;function Oa(t){let e=String(t??"").trim();if(!e||wn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function df(){return Oa(x.store.avatarUrl)??Oa(x.store.avatarSource)}var Ha=!1,Bl=new Set;function mf(){let t=Oa(x.store.avatarSource);if(!t?.startsWith("data:image/")||Oa(x.store.avatarUrl)?.startsWith("data:image/")||Ha||Bl.has(t))return;Ha=!0;let e=Ln(x.store.cropX,.5),n=Ln(x.store.cropY,.5),r=Ln(x.store.cropZoom,1);Fl(t,e,n,r).then(o=>{if(Ha=!1,!o){Bl.add(t);return}St&&(x.store.avatarUrl=o,Ba())}).catch(()=>{Ha=!1,Bl.add(t)})}function Sn(t,e){return t.map(n=>`${n} ${e}`)}function dv(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function mv(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=dv(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function ff(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Zt(n)||n.closest(".min-w-0")||e.push(n);return e}function fv(t){let e=ff(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function jl(){let t=[],e=Ge();e&&t.push(e);let n=In();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Ho.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function pf(t,e){let n=fv(t);if(n)tf(n,e);else for(let o of ff(t))pr(o);let r=Ym(t,n);for(let o of t.querySelectorAll(`[${gr}]`))o!==r&&o.removeAttribute(gr);r&&r.setAttribute(gr,"")}function pv(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function gv(t,e){let n=pv(t);n&&pf(n,e)}function bv(){for(let t of document.querySelectorAll(`img[${fr}]`))pr(t);for(let t of document.querySelectorAll(`[${gr}]`))t.removeAttribute(gr)}function hv(){let t=et(Math.round(Ln(x.store.avatarSize,uf)),lf,cf),e=df(),n=sv(),r=x.store.applyToMenu!==!1,o=[],i=[...Sn(Ho,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Sn(Pl,"> :first-child img"));let a=[...Sn(Ho,".min-w-0 > .truncate"),...Sn(Ho,".min-w-0.flex-1 .truncate")];r&&a.push(...Sn(Pl,"> :first-child .truncate"));let s=Xm(gr);o.push(Ca([...s.flatMap(c=>Sn(Ho,c))].join(","),t)),o.push(Ca(s.map(c=>`#stage-sidebar-tiny-bar ${c}`).join(","),32)),r&&o.push(Ca(s.flatMap(c=>Sn(Pl,`> :first-child ${c}`)).join(","),t)),e&&(o.push(Rl(i.join(","),e,t)),o.push(Rl("#stage-sidebar-tiny-bar img",e,32)),o.push(Qm(e))),n&&o.push(mv(a,n)),w(sf,o.join(""))}function yv(){let t=df(),e=jl();for(let n of e)pf(n,t);if(x.store.applyToMenu!==!1){let n=Nn();n&&gv(n,t)}for(let n of document.querySelectorAll(`img[${fr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||pr(n)}function Ba(){if(!(!St||br)){br=!0;for(let t of qe.values())t.disconnect();fe?.disconnect(),Jt?.disconnect();try{hv(),yv()}finally{br=!1,Gl(),wv(),yr?.isConnected&&gf(yr),mf()}}}function No(){!St||hr||(hr=requestAnimationFrame(()=>{hr=0,Ba()}))}function vv(){br||!St||No()}function xv(t){if(qe.has(t))return;let e=new MutationObserver(vv);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),qe.set(t,e)}function Ev(t){qe.get(t)?.disconnect(),qe.delete(t)}function Gl(){let t=new Set;for(let n of jl())t.add(n),n.parentElement&&t.add(n.parentElement);let e=In();e&&t.add(e);for(let n of[...qe.keys()])(!t.has(n)||!n.isConnected)&&Ev(n);for(let n of t)n.isConnected&&xv(n)}function wv(){let t=Yo();if(!t){Jt?.disconnect(),Jt=null,Ra=null;return}if(Ra===t&&Jt){Jt.observe(t,{childList:!0});return}Jt?.disconnect(),Ra=t,Jt=new MutationObserver(()=>{br||!St||(Gl(),No())}),Jt.observe(t,{childList:!0})}function gf(t){yr===t&&fe||(fe?.disconnect(),yr=t,fe=new MutationObserver(()=>{if(!t.isConnected){fe?.disconnect(),fe=null,yr=null;return}br||!St||No()}),fe.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function bf(t){if(!St||x.store.applyToMenu===!1)return;let e=Nn();if(e){gf(e),No();return}t<=0||requestAnimationFrame(()=>bf(t-1))}function hf(t){St&&(Ba(),!(jl().length||t<=0)&&(Na=requestAnimationFrame(()=>hf(t-1))))}function Sv(t){St&&x.store.applyToMenu!==!1&&(!Xo(t)&&!Nn()||bf(10))}function Lv(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let c=document.createElement("input");c.type="text",c.className="bloom-csi-url",c.spellcheck=!1;let l=document.createElement("button");l.type="button",l.className="bloom-csi-btn",l.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,c,l);let d=document.createElement("p");d.className="bloom-csi-hint";let m=document.createElement("div");m.className="bloom-csi-crop";let b=document.createElement("div");b.className="bloom-csi-stage";let f=document.createElement("img");f.className="bloom-csi-stage-img",f.alt="",f.draggable=!1,b.appendChild(f);let g=document.createElement("div");g.className="bloom-csi-zoom-row";let p=document.createElement("input");p.type="range",p.className="bloom-csi-zoom",p.min=String(Dl),p.max=String($l),p.step="0.05",p.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let L=document.createElement("button");L.type="button",L.className="bloom-csi-btn",L.textContent="Reset",g.append(p,T,L);let H=document.createElement("p");H.className="bloom-csi-hint",H.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",m.append(b,g,H),t.append(u,d,m);function Qt(){let h=String(x.store.avatarSource??""),C=String(x.store.avatarUrl??"");return h.startsWith("data:image/")?h:C.startsWith("data:image/")?C:""}function Nt(h,C,N){if(!a)return i.x=h,i.y=C,i.zoom=et(N,Dl,$l),i;let rt=Ia(a.w,a.h,N,h*a.w,C*a.h);return i.x=rt.x/a.w,i.y=rt.y/a.h,i.zoom=rt.z,i}function st(){p.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let h=a?Ia(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;h&&a&&(f.style.width=`${a.w/h.side*100}%`,f.style.height=`${a.h/h.side*100}%`,f.style.left=`${(.5-h.x/h.side)*100}%`,f.style.top=`${(.5-h.y/h.side)*100}%`)}function O(h=!1){let C=Qt(),N=String(x.store.avatarUrl??"").trim(),rt=!!C;s.hidden=!N&&!C,(C||N)&&(s.src=C||N),document.activeElement!==c&&(c.value=rt?"":N),c.placeholder=rt?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",m.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(N)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(h&&(i.x=Ln(x.store.cropX,.5),i.y=Ln(x.store.cropY,.5),i.zoom=Ln(x.store.cropZoom,1)),f.getAttribute("src")!==C&&(a=null,f.onload=()=>{a={w:f.naturalWidth,h:f.naturalHeight},Nt(i.x,i.y,i.zoom),st()},f.src=C),st())}function mt(h,C,N,rt=!1){Nt(h,C,N),st();let Xl=Qt(),Zl=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,Xl&&Fl(Xl,i.x,i.y,i.zoom).then(Jl=>{Jl&&(x.store.avatarUrl=Jl)})};r&&clearTimeout(r),rt?Zl():r=setTimeout(Zl,80)}function te(h){x.store.avatarUrl=h;let C=h.trim();if(n&&clearTimeout(n),!C){x.store.avatarSource="",zl(),e=!1,O(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Ea(C).then(N=>{if(!N)return;let rt=_l(N);N.close(),rt&&ql(rt).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{Ea(C).then(N=>{if(!N){e=!0,O(!0);return}let rt=_l(N);N.close(),rt?(e=!1,ql(rt).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,x.store.avatarSource="",O(!0)}u.addEventListener("paste",h=>{Io(h.clipboardData)&&(h.preventDefault(),e=!1,Ol(h.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",h=>{Io(h.dataTransfer)&&h.preventDefault()}),u.addEventListener("drop",h=>{Io(h.dataTransfer)&&(h.preventDefault(),e=!1,Ol(h.dataTransfer).then(()=>O(!0)))}),c.addEventListener("change",()=>te(c.value)),c.addEventListener("paste",h=>{Io(h.clipboardData)&&(h.preventDefault(),e=!1,Ol(h.clipboardData).then(()=>O(!0)))}),c.addEventListener("keydown",h=>{Qt()&&!c.value&&(h.key==="Backspace"||h.key==="Delete")&&(of(),e=!1,O(!0))}),l.addEventListener("click",()=>{of(),e=!1,O(!0)}),b.addEventListener("pointerdown",h=>{h.button===0&&(b.setPointerCapture(h.pointerId),o.on=!0,o.px=h.clientX,o.py=h.clientY,o.x=i.x,o.y=i.y)}),b.addEventListener("pointermove",h=>{if(!o.on||!a)return;let C=b.clientWidth;if(!C)return;let{side:N}=Ia(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Nt(o.x-(h.clientX-o.px)*(N/C)/a.w,o.y-(h.clientY-o.py)*(N/C)/a.h,i.zoom),st()}),b.addEventListener("pointerup",()=>{o.on&&(o.on=!1,mt(i.x,i.y,i.zoom,!0))}),b.addEventListener("pointercancel",()=>{o.on=!1}),b.addEventListener("wheel",h=>{h.preventDefault(),mt(i.x,i.y,i.zoom*(h.deltaY<0?1.08:1/1.08))},{passive:!1}),p.addEventListener("input",()=>mt(i.x,i.y,Number(p.value))),p.addEventListener("change",()=>mt(i.x,i.y,Number(p.value),!0)),L.addEventListener("click",()=>mt(.5,.5,1,!0));let Yl=()=>O(!1);return Pa=Yl,O(!0),()=>{Pa===Yl&&(Pa=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var yf=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:rf,cleanupSelectors:[`.${ov}`,`.${iv}`],settings:x,start(){St=!0,wn.clear(),Nl(No),w(rf,ef),Aa=new AbortController,document.addEventListener("click",Sv,{signal:Aa.signal}),hf(40),mf(),nf.debug("started")},onSettingsChange(){wn.clear(),Pa?.(),St&&(Gl(),Ba())},stop(){St=!1,Aa?.abort(),Aa=null,hr&&cancelAnimationFrame(hr),hr=0,Na&&cancelAnimationFrame(Na),Na=0;for(let t of qe.values())t.disconnect();qe.clear(),fe?.disconnect(),fe=null,yr=null,Jt?.disconnect(),Jt=null,Ra=null,bv(),E(sf),Nl(null),wn.clear(),nf.debug("stopped")}});var vr=new S("Bloom"),vf=!1,Tv=Date.now(),kv=[Wc,_u,Wu,Zu,nd,sd,xd,wd,Td,Ud,Jd,im,sm,Em,Nm,Pm,zm,yf];function Da(t){return new Promise(e=>setTimeout(e,t))}function Cv(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function Mv(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Ef=8e3,xf=300,Av=250;async function Hv(){if(je())return await Da(xf),!0;for(;Date.now()-Tv<Ef;)if(await Da(Av),je())return await Da(xf),!0;return je()||Ka()}function Ul(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Iv(){if(Ul())return!0;let t=Date.now()+Ef;for(;Date.now()<t;)if(await Da(100),Ul())return!0;return Ul()}function Nv(){try{GM_registerMenuCommand?.("Bloom++ settings",Vc)}catch{}}function Rv(){zo(()=>{Er("HostShell"),vr.info("host shell",ft)}),jo(()=>{vr.info("idle ready",ft)}),Go(()=>{_a(),Er("HostReady"),vr.info("chrome ready",ft)})}async function Kl(){await uc()}async function Vl(){if(vf)return;vf=!0;for(let n of kv)try{hc(n),Cc(n)}catch(r){vr.error("register failed",n.name,r)}Er("Init"),Nv(),Rv();let t=()=>Er("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Cv(),_a(),vr.info("styles ready",ft),await Mv(),Iv().then(n=>{n&&Uo()}),!await Hv()){vr.warn("late islands not detected; starting default plugins",ft),Mn(),Ko();return}await Tc()}var wf=typeof unsafeWindow<"u"?unsafeWindow:window,Pv=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Pv){let t=wf.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",ft);try{Object.defineProperty(wf,"Bloom",{value:Wl,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Kl().then(()=>Vl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
