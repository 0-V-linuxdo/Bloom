// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.90
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

/* Bloom++ [20260924] v1.4.90. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ef=Object.defineProperty;var wf=(t,e)=>{for(var n in e)Ef(t,n,{get:e[n],enumerable:!0})};var Yl={};wf(Yl,{REPO_URL:()=>Cc,Settings:()=>$,VERSION:()=>ft,contextKeyFromUrl:()=>oe,conversationTitle:()=>$n,conversationToken:()=>Ct,currentConversationId:()=>M,hasDraftText:()=>Dt,hasErrorToast:()=>Ft,hasLateIslands:()=>Fe,init:()=>Wl,initSettings:()=>Vl,isDocumentInteractive:()=>Ac,isStreaming:()=>G,isUserDraftEmpty:()=>Ee,messageCreateTime:()=>yi,plugins:()=>ee,requestChromeReady:()=>Uo,requestIdleReady:()=>An,requestShellReady:()=>Go,setEditorText:()=>re,subscribeHarvest:()=>pt,watchStreamingEdge:()=>ot,whenChromeReady:()=>jo,whenIdleReady:()=>zo,whenShellReady:()=>Fo});var pe=new Map,No=!1;function Sf(){return document.getElementById("bloom-root")?.shadowRoot??null}function tc(){return document.head??null}function kn(){let t=Sf();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Lf()}function Da(t,e){if(!No)return;let n=tc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),kn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,kn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,kn()}function S(t,e){let n=pe.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},pe.set(t,n)),No&&Da(t,n)}function $a(){if(!tc())return!1;No=!0;for(let[e,n]of pe)Da(e,n);return kn(),!0}function ec(t){let e=pe.get(t);e&&(e.disabled=!1,No&&Da(t,e))}function nc(t){let e=pe.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),kn())}function w(t){let e=pe.get(t);e&&(e.el?.remove(),pe.delete(t),kn())}function Lf(){return Array.from(pe.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var L=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var _a=new Map;function Cn(t,e){let n=_a.get(t);return n||(n=new Set,_a.set(t,n)),n.add(e),()=>n.delete(e)}function _e(t,e){let n=_a.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Tf="bloompp";function rc(){return new Promise((t,e)=>{let n=indexedDB.open(Tf,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function oc(t){try{let e=await rc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function ic(t,e){try{let n=await rc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function tt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function et(t,e,n){return Math.min(n,Math.max(e,t))}function ac(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function sc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function lc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Ro=new L("SettingsStore"),ge="BloomSettings",kf=100;function Po(t){return t!=null&&typeof t.then=="function"}function Cf(t){if(t==null||Po(t))return null;if(tt(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(tt(e)&&!Po(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return tt(n)&&!Po(n)?n:null}return null}catch{return null}}function Bo(t){let e=Cf(t);if(!e)return null;let n=e.plugins;return!tt(n)||Po(n)||Object.keys(n).length===0?null:e}function Fa(t){return tt(t)?t:null}function qa(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:tt(t)?Object.keys(t).length===0:!1}function Mf(t){return qa(t)?0:Array.isArray(t)?12+Math.min(t.length,40):tt(t)?12+Math.min(Object.keys(t).length,40):3}function qe(t){if(!t)return-1;let e=t.plugins;if(!tt(e))return-1;let n=0;for(let r of Object.values(e)){let o=Fa(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=Mf(a))}return n}function cc(t){let e=t.plugins;if(!tt(e))return 0;let n=0;for(let r of Object.values(e))Fa(r)?.enabled===!0&&n++;return n}function uc(t){let e=t.map((i,a)=>({bag:i,index:a,score:qe(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=cc(a.bag)-cc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!tt(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(tt(a))for(let[s,l]of Object.entries(a)){let c=Fa(l);if(!c)continue;if(!tt(r[s])){let m=structuredClone(c);delete m.defaultsRev,m.enabled!==!0&&delete m.enabled,Object.keys(m).length&&(r[s]=m);continue}let u=r[s];for(let[m,f]of Object.entries(c))if(m!=="defaultsRev"){if(m==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}qa(u[m])&&!qa(f)&&(u[m]=structuredClone(f))}}}let o=r.Settings;return tt(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:qe(n)}}var Oo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let m=l.slice(c.length+1);if(m&&!m.includes(".")){let f=u(m);f!==void 0&&(i[a]=f,s=f);break}}}return tt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Ro.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},kf))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ge,this.plain)}catch{try{GM_setValue(ge,e)}catch(n){Ro.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(ge,e)}catch{}ic(ge,e).catch(n=>Ro.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){Ro.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){ac(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Af=new L("Settings"),Hf={plugins:{}},$=new Oo(structuredClone(Hf)),If=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Nf(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function T(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?be(n):{}},get plain(){let n=e.pluginName;return n?$.plain.plugins[n]??{}:{}}};return e}async function Rf(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function dc(){let t=Bo(await Rf(ge)),e=Bo(await oc(ge)),n=null;try{n=Bo(localStorage.getItem(ge))}catch{n=null}let r=uc([t,e,n]);if(r){let o=r.bag.plugins;o&&($.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);Af.info("Loaded settings from",i,"richness",r.score,"gm",qe(t),"idb",qe(e),"ls",qe(n))}$.releasePersist(),r&&(r.index!==0||r.score>qe(t))&&$.persistLoadedBag()}function be(t){return $.plain.plugins[t]||($.plain.plugins[t]={}),$.store.plugins[t]}function mc(t,e){e&&(e.pluginName=t,be(t),$.setDefaultGetter(If(t),n=>{if(n!=="enabled")return Nf(e.def,n)}))}function fc(){return be("Settings")}function Do(){return fc().pinnedPlugins??[]}function pc(t){return Do().includes(t)}function gc(t){let e=Do(),n=e.includes(t);return $.store.plugins.Settings={...$.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function $o(){return fc().starredPlugins??[]}function bc(t){return $o().includes(t)}function hc(t){let e=$o(),n=e.includes(t);return $.store.plugins.Settings={...$.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var _o=new L("PluginManager"),ee={},xr=new Set;function yc(t){if(ee[t.name]){_o.warn("Duplicate plugin",t.name);return}ee[t.name]=t,mc(t.name,t.settings)}function Mn(t){let e=ee[t];if(!e)return!1;if(e.required)return!0;let n=$.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function vc(t){let e=ee[t];if(!e||e.required)return;let n=!Mn(t);be(t),$.store.plugins[t].enabled=n,n?xc(e):Pf(e),_e("pluginToggle",{name:t,enabled:n})}function xc(t,e=!1){if(!xr.has(t.name)&&Mn(t.name))try{t.managedStyle&&ec(t.managedStyle),t.start?.(),xr.add(t.name),t.settings&&$.addPrefixChangeListener(`plugins.${t.name}.`,()=>{xr.has(t.name)&&t.onSettingsChange?.()}),e||_o.debug("Started",t.name)}catch(n){_o.error("Failed to start",t.name,n)}}function Pf(t){if(xr.has(t.name)){try{t.stop?.()}catch(e){_o.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(nc(t.managedStyle),w(t.managedStyle)),xr.delete(t.name)}}function Er(t){for(let e of Object.values(ee))(e.startAt??"DOMContentLoaded")===t&&xc(e)}var wr=!1,qo=!1,za=!1,wc=[],Sc=[],Lc=[];function ja(t){let e=t.splice(0);for(let n of e)n()}function Sr(){wr||(wr=!0,ja(wc))}function Ga(){qo||(qo=!0,wr||Sr(),ja(Sc))}function Tc(){za||(za=!0,wr||Sr(),qo||Ga(),ja(Lc))}function Fo(t){wr?t():wc.push(t)}function zo(t){qo?t():Sc.push(t)}function jo(t){za?t():Lc.push(t)}function Go(){Sr()}function An(){Sr(),Ga()}function Uo(){Tc()}function Ec(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function kc(){await Ec(4e3),Sr(),await Ec(4e3),Ga(),Tc()}var v={p:"0-V-linuxdo"},ft="[20260924] v1.4.90",Cc="https://github.com/0-V-linuxdo/Bloom";var Of={BetterNavigator:1790240385e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789969779e3,ComposerOpacity:1789969779e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789969779e3,InputHistory:1789969779e3,MessageTimestamps:1790230458e3,NoDictation:1789969779e3,NoShareLink:1789969779e3,NoSidebarIdentity:1789969779e3,PromptQueue:1790244148e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789969779e3,WiderChat:1789969779e3};function Mc(t){let e=Of[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function Bf(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Df(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ua(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Fe(){return Ua()?Bf()||Df():!1}function Ac(){return Fe()}var $f=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Hc=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),_f=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),qf="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function In(t){return t.id==="bloom-root"||!!t.closest(qf)}function Ic(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Ko(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Ka(t){if(!(t instanceof HTMLElement)||!t.isConnected||In(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Ko(e)?!1:t.getClientRects().length>0}function Hn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Ff(){let t=[];for(let e of document.querySelectorAll($f))!(e instanceof HTMLElement)||!e.isConnected||In(e)||t.push(e);return t}function Vo(t){if(!t.isConnected||In(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function ze(){return Ff().filter(Vo)[0]??null}function Nn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||In(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Va(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!In(n)&&!Hn(n)&&n.parentElement&&!Hn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!Hn(r)&&!In(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!Hn(r.parentElement))return r}return e}function Rn(){let t=document.querySelectorAll(Hc);for(let n of t)if(Ka(n)&&!Ko(n)&&Ic(n))return n;let e=document.querySelectorAll(_f);for(let n of e){if(!Ka(n)||!Ic(n)||Ko(n))continue;let r=n.querySelector(Hc);return Ka(r)&&!Ko(r)?r:n}return null}function Wo(){let t=ze();if(t){let e=Va(t),n=e.parentElement;if(n&&!Hn(n))return n;if(!Hn(e))return e}return Nn()}function Yo(t){let e=ze();return e?t.composedPath().includes(e):!1}var Ya=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],zf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function jf(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Gf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Wa(t){let e=jf(t);return e?Gf(e)>.55?"light":"dark":null}function Uf(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Wa(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Wa(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Wa(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Xo(t){return t==="auto"?Uf():t}function Kf(t){try{let e=getComputedStyle(document.documentElement);for(let n of Ya){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Zo(t,e,n){let r=zf[e];if(n){Kf(t);for(let o of Ya)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Ya)t.style.setProperty(o,r[o])}function Nc(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Xa=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Wf="bloom-root",Ot="bloom-rail-item",ni="bloom-account-item",Ge="bloom-sidebar-panel",Nr="bloom-plugin-dialog",ci="bloom-plugin-layer",ri="bloom-settings-css",Yf=2e3,Oc=null,Xf=null,xe=!1,ts=[],Jo=null,oi=null,ye=null,ti=null,ne=null,Ar=null,Lr,Pn=0,Hr=0,Tr=0,kr=null,Cr=null,ii=null,Bc=null,Mr=null,Za=[],ai=!1,Zf=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Jf=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Qf=new Set(["chat","ui","privacy"]),tp=10080*60*1e3,ui="",Ir="all",Pt="all";function di(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Dc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function ep(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function np(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function rp(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function op(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var ip={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function ap(t){return t.icon||ip[t.name]||di()}function Ja(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Zo(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function $c(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function si(){let t="auto",e=Xo(t);Ja(Oc,e,!0);let n=document.getElementById(Ge);n instanceof HTMLElement&&Ja(n,e,!0);let r=document.getElementById(Nr);r instanceof HTMLElement&&Ja(r,e,!0);let o=document.getElementById(Ot);o instanceof HTMLElement&&$c(o),_e("schemeChange",{scheme:e,pref:t})}function _c(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function qc(){if(S("settings",Xa),document.getElementById(ri)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=ri,t.textContent=Xa,document.head.appendChild(t)}function sp(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function lp(){for(let t of ts)t();ts=[]}function Fc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function cp(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function rs(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function up(t){return rs(t).length>0}function ei(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function dp(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=cp(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function mp(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(dp(e,n));let i=be(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ts.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??ei(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??ei(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Fc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??ei(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Rc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function fp(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=be(t.name);for(let[n,r]of rs(t)){if(n==="enabled"||r.type===5)continue;let o=ei(r);o!==void 0&&(e[n]=o)}jc(t)}function zc(t){t.key==="Escape"&&(!document.getElementById(ci)&&!document.getElementById(Nr)||(t.stopPropagation(),On()))}function pp(){ai||(document.addEventListener("keydown",zc),ai=!0)}function gp(){ai&&(document.removeEventListener("keydown",zc),ai=!1)}function On(){lp(),gp(),document.getElementById(ci)?.remove(),document.getElementById(Nr)?.remove()}function jc(t){if(On(),!document.body)return;let e=document.createElement("div");e.id=ci,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",ve),e.addEventListener("pointerup",ve),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&On()});let n=document.createElement("div");n.id=Nr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",ve),n.addEventListener("pointerup",ve),n.addEventListener("click",ve);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Dc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),On()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Rc("Authors"),m=document.createElement("p");m.className="bloom-plugin-dialog-authors",m.textContent=t.authors.join(", "),u.appendChild(m),n.appendChild(u)}let s=Rc("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=rs(t);if(c.length)for(let[u,m]of c){let f=mp(t.name,u,m);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let m=document.createElement("button");m.type="button",m.className="bloom-plugin-dialog-reset",m.textContent="Reset",m.addEventListener("click",()=>fp(t)),u.appendChild(m),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),pp(),si()}function bp(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=ap(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=bc(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=rp(l),c.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let d=hc(t.name);_e("pluginStar",{name:t.name,starred:d})}),s.appendChild(c),!t.required){let g=pc(t.name),d=document.createElement("button");d.type="button",d.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,d.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),d.innerHTML=op(g),d.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();let A=gc(t.name);_e("pluginPin",{name:t.name,pinned:A})}),s.appendChild(d)}if(up(t)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${t.name} settings`),g.innerHTML=np(),g.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),jc(t)}),s.appendChild(g)}let u=Fc(t.name,Mn(t.name),!!t.required),m=u.querySelector("input");if(m?.addEventListener("click",g=>g.stopPropagation()),m?.addEventListener("change",()=>{vc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=t.description,n.appendChild(g)}let f=document.createElement("div");f.className="bloom-card-separator";let b=document.createElement("div");b.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",b.appendChild(p),e.append(n,f,b),e}function Gc(){return Object.values(ee).filter(t=>!t.hidden&&t.name!=="Settings")}function hp(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<tp}function Uc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return hp(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Qf.has(r)):n.includes(e)}function yp(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function vp(){return ui.trim()?"No plugins match your search.":Pt==="favorites"?"No favorites yet. Star a plugin to see it here.":Pt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function xp(){let t=Gc();return Jf.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Uc(n,e.id)))}function Ep(){if(Mr){Mr.replaceChildren();for(let t of xp()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Pt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Pt=t.id,je()}),Mr.appendChild(e)}}}function wp(){let t=Gc();if(Pt==="favorites"){let e=new Set($o());t=t.filter(n=>e.has(n.name))}else Pt!=="all"&&(t=t.filter(e=>Uc(e,Pt)));return Ir==="enabled"&&(t=t.filter(e=>Mn(e.name))),Ir==="disabled"&&(t=t.filter(e=>!Mn(e.name))),t}function je(){if(!kr)return;Ep();let t=wp();ii&&(ii.placeholder=`Search ${t.length} plugins...`);let e=t,n=ui.trim().toLowerCase();if(n&&(e=e.filter(r=>yp(r).includes(n))),Pt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Pt!=="favorites"){let r=Do();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}kr.replaceChildren();for(let r of e)kr.appendChild(bp(r));Cr&&(Cr.hidden=e.length>0,Cr.textContent=vp())}function ve(t){t.stopPropagation()}function Qa(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function os(){document.getElementById(Ot)?.setAttribute("aria-expanded",xe?"true":"false")}function Sp(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function is(){On(),ui="",Ir="all",Pt="all",document.getElementById(Ge)?.remove(),xe=!1,os()}function Lp(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",ve),e.addEventListener("pointerup",ve),e.addEventListener("click",ve);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=di();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=ep();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn bloom-settings-close",m.setAttribute("aria-label","Close"),m.innerHTML=Dc(),m.addEventListener("click",is),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let b=document.createElement("div");b.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{ui=p.value,je()});let g=document.createElement("select");g.className="bloom-search-filter",g.setAttribute("aria-label","Filter plugins");for(let A of Zf){let H=document.createElement("option");H.value=A.value,H.textContent=A.label,g.appendChild(H)}g.value=Ir,g.addEventListener("change",()=>{Ir=g.value,je()}),b.append(p,g),n.appendChild(b);let d=document.createElement("div");d.className="bloom-plugin-list",n.appendChild(d);let E=document.createElement("p");return E.className="bloom-tab-empty",E.hidden=!0,n.appendChild(E),e.append(m,n),kr=d,Cr=E,ii=p,Bc=g,Mr=f,je(),e}function Tp(t){t.classList.add("bloom-rail-dock")}function kp(){let t=document.getElementById(Ot);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Vo(t)?t:null}function Cp(){if(document.getElementById(Ge)?.remove(),!document.body)return;let t=Lp(Ge);Tp(t),document.body.appendChild(t),xe=!0,On(),si(),os(),_e("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:ft,dock:"center",rail:!!kp()})}function as(){let t=document.getElementById(Ge);if(t instanceof HTMLElement&&t.isConnected&&Sp(t)){is();return}t?.remove(),Cp()}function Mp(){let t=document.createElement("button");return t.type="button",t.id=Ot,t.className="bloom-rail-item",t.setAttribute("aria-controls",Ge),t.setAttribute("aria-expanded",xe?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${di()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),as()}),t}function Pc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Ap(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Hp(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function he(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Kc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Ap(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&he(t,"padding-top",Math.round(i)),Number.isFinite(a)&&he(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));he(n,"width",l),he(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&he(t,"padding-left",u);let m=Hp(e,r);if(m){let f=m.getBoundingClientRect(),b=n.getBoundingClientRect(),p=Math.round(f.left-b.right);p>=0&&p<=24&&he(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&he(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&he(t,"gap",Math.round(l))}$c(t)}function es(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Ip(){if(Ar?.isConnected&&ne){ne.observe(Ar,{childList:!0});return}ns()}function Np(t){if(es(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Rp(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Tr=0;return}Tr+=1,Hr=Date.now()+Math.min(8e3,250*2**Math.min(Tr,5))})}function Pp(){Pn||Date.now()<Hr||(Pn=requestAnimationFrame(()=>{Pn=0,!(Date.now()<Hr)&&(document.getElementById(Ot)?.isConnected||li())}))}function li(){if(!document.body)return;ne?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Ot);t=n instanceof HTMLButtonElement?n:Mp();let r=ze(),o=Nn();if(r){let i=Va(r),a=i.parentElement;if(es(i)||a&&es(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Pc(t),Kc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Pc(t,!0)):t.isConnected&&!Vo(t)&&(t.remove(),t=null)}finally{Rp(t,e),Ip(),os()}}function ns(){let t=Wo();!t||!Np(t)||Ar===t&&ne||(ne?.disconnect(),Ar=t,ne=new MutationObserver(()=>{document.getElementById(Ot)?.isConnected||Pp()}),ne.observe(t,{childList:!0}))}function Op(){li(),ns(),Lr===void 0&&(Lr=window.setInterval(()=>{let t=document.getElementById(Ot);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Hr&&li();else{Tr=0;let e=ze();e&&Kc(t,e)}ns()},Yf))}function Bp(){Lr!==void 0&&(clearInterval(Lr),Lr=void 0),Pn&&cancelAnimationFrame(Pn),Pn=0,Hr=0,Tr=0,ne?.disconnect(),ne=null,Ar=null}function Dp(t){ti===t&&ye||(ye?.disconnect(),ti=t,ye=new MutationObserver(()=>{if(!t.isConnected){ye?.disconnect(),ye=null,ti=null;return}Vc(t)}),ye.observe(t,{childList:!0}))}function Vc(t){if(Dp(t),t.querySelector(`#${ni}`))return;let e=document.createElement("button");e.type="button",e.id=ni,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${di()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Qa),e.addEventListener("pointerup",Qa),e.addEventListener("click",n=>{Qa(n),as()}),t.insertBefore(e,t.firstChild)}function Qo(){let t=Rn();return t?(Vc(t),!0):!1}function $p(t){Yo(t)&&(queueMicrotask(Qo),requestAnimationFrame(()=>{Qo()}),window.setTimeout(Qo,60),window.setTimeout(Qo,180))}function _p(){oi?.abort();let t=new AbortController;oi=t,document.addEventListener("click",$p,{signal:t.signal})}function qp(){oi?.abort(),oi=null,ye?.disconnect(),ye=null,ti=null}function Wc(){An(),sp(()=>{qc(),_c(),li(),as()})}var Yc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Wf}`,`#${Ot}`,`#${ni}`,`#${Ge}`,`#${ci}`,`#${Nr}`,`#${ri}`,"#bloom-menu-panel"],start(){qc(),_c(),Op(),_p(),Jo?.(),Jo=Nc(si),si(),Za=[Cn("pluginToggle",()=>{xe&&je()}),Cn("pluginPin",()=>{xe&&je()}),Cn("pluginStar",()=>{xe&&je()})]},stop(){Bp(),qp(),Jo?.(),Jo=null;for(let t of Za)t();Za=[],is(),document.getElementById(Ot)?.remove(),document.getElementById(ni)?.remove(),document.getElementById(ri)?.remove(),Oc=null,Xf=null,kr=null,Cr=null,ii=null,Bc=null,Mr=null,xe=!1}});var mi='form[data-type="unified-composer"], form.w-full[data-type]',Bt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Bn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Xc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Zc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Fp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,zp='[contenteditable="false"], button, [role="button"]';function Tt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Ue(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Tt(o)))return o;return null}function Jc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function _(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Jc(t);return!!(Fp.test(n)||/^stop$/i.test(n))}function kt(){let e=Array.from(document.querySelectorAll(mi)).find(Tt);if(e instanceof HTMLElement)return e;let n=Ue(document,Bt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function nt(){let t=Array.from(document.querySelectorAll(Bt));return t.find(Tt)??t[0]??null}function jp(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(zp);return!!n&&n!==e&&e.contains(n)}function ss(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&jp(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Dt(t){let e=t??nt();return e?ss(e,e).replaceAll("\u200B","").trim().length>0:!1}function Ee(t){return!Dt(t)}function fi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Qc(t){let e=kt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Tt(n))&&t(n))return n;return null}function we(){let t=kt(),e=Ue(t,Bn)??Ue(document,Bn);return e&&!_(e)?e:Qc(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!_(n);let o=Jc(n);return/^(send|send prompt|发送)$/i.test(o)&&!_(n)})}function Ke(){let t=kt(),e=Ue(t,Xc,!0)??Ue(document,Xc,!0);if(e)return e;let n=Ue(t,Zc)??Ue(document,Zc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Tt(r)&&_(r))return r}return Qc(_)}function $t(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>ss(n,t)).join(`
`):ss(t,t)}function ls(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function re(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),ls(t,n)}var tu=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Ct(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function oe(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ie(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(tu)?.[1]??""}catch{return t.match(tu)?.[1]??""}}function M(){return ie(location.pathname)}var ou=new L("Harvest"),Gp=1500,Up=200,pi=new Set,gi=new Map,bi=new Map,Dn=null,hi=null,Rr=null,_t=0;function Kp(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Vp(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Wp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function iu(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var Yp=/"action"\s*:\s*"(next|continue|variant)"/i;function Xp(t,e,n){return!(e!=="POST"||iu(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Yp.test(n))}function Zp(t,e){return e!=="GET"||iu(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function eu(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function au(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Jp(t){return typeof t=="string"?au(t):""}function cs(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return cs(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function su(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function nu(t,e,n){!t||!e||bi.get(t)!==e&&(bi.set(t,e),su(bi,Gp),Se({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Qp(t,e){let n=e.trim();!t||!n||gi.get(t)!==n&&(gi.set(t,n),su(gi,Up),Se({type:"conversation-meta",conversationId:t,title:n}))}function Pr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Pr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Qp(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=cs(l.create_time??l.createTime??l.created_at);c&&u&&nu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=cs(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&nu(a,s,o),r.mapping&&typeof r.mapping=="object")Pr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Pr(l,o,n+1)}function ru(t,e){if(t)try{Pr(JSON.parse(t),e)}catch{}}function Se(t){for(let e of Array.from(pi))try{e(t)}catch{}}async function tg(t,e,n){if(n===_t)try{let r=await t.json();if(n!==_t)return;Pr(r,e)}catch{}}async function eg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===_t&&Se({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===_t;){let{done:u,value:m}=await s.read();if(u)break;if(c+=l.decode(m,{stream:!0}),!o){let b=au(c);b&&(o=b,Se({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let b of f){let p=b.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||ru(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===_t&&ru(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===_t&&Se({type:"post-end",conversationId:o,error:i})}function ng(t,e,n){let r=Vp(e),o=Wp(e,n),i=Zp(r,o),a=Xp(r,o,n?.body),s=_t,l="";return a&&(l=Jp(n?.body)||eu(r)||ie(r)||M(),Se({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==_t||!i&&!a)return c;try{let u=c.clone();i?tg(u,eu(r)||M(),s):eg(u,l,!c.ok,s)}catch{a&&Se({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===_t&&Se({type:"post-end",conversationId:l,error:!0}),c})}function rg(){if(Dn)return;let t=Kp();Rr=t,Dn=t.fetch.bind(t);let e=(n,r)=>ng(Dn,n,r);hi=e,t.fetch=e,ou.debug("conversation fetch harvest hooked")}function og(){_t+=1,!(!Dn||!Rr)&&(hi&&Rr.fetch===hi&&(Rr.fetch=Dn),Dn=null,hi=null,Rr=null,ou.debug("conversation fetch harvest unhooked"))}function pt(t){return pi.add(t),rg(),()=>{pi.delete(t),pi.size===0&&og()}}function $n(t){return t?gi.get(t)??"":""}function yi(t){return t?bi.get(t)??null:null}var cu=new L("Streaming");function _r(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Tt(e))&&(_(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function ig(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Tt(t))}function ag(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Tt(t))}function sg(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Ft(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function G(){if(Ke()||_r()||sg())return!0;let t=we();return t&&Tt(t)&&!_(t)?!1:!!(ig()||ag())}var lg=400,lu=3,Xe=new Set,Or,Br=null,us=null,We=!1,Ve=0,Te="",ke="",Ce=!1,Dr=!1,$r=!1,qt=!1,W=null,gt="",Ye=!1;function q(){return qt}function Ze(){return Ce}function _n(){return gt}function ds(){return M()||gt}function uu(){return oe(Ct())}function vi(t,e){return{streaming:t,contextKey:e,conversationId:ds()}}function ms(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function cg(t){return!t||t==="/"||t.startsWith("/g/")}function U(t,e){if(!t||t===e)return!1;let n=ie(ms(e)||e);return!n||!(t.endsWith("|draft")||cg(ms(t)))?!1:gt?n===gt:Ye}function xi(){We=!1,Ve=0,Te="",Ce=!1,Dr=!1,$r=!1,gt="",Ye=!1}function ug(t){for(let e of Array.from(Xe))try{e.onFall?.(t)}catch{}}function dg(t){for(let e of Array.from(Xe))try{e.onRise?.(t)}catch{}}function Le(t){for(let e of Array.from(Xe))try{e.onTick?.(t)}catch{}}function mg(t,e){for(let n of Array.from(Xe))try{n.onContext?.(t,e)}catch{}}function fg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&_(n)&&(Ce=!0)}function pg(t){if(t.type==="post-start"){let n=M();if(!t.conversationId){n||(Ye=!0),(!n||n===gt)&&(qt=!1,Ce=!1);return}if(!(t.conversationId===n||t.conversationId===gt)&&!(!n&&Ye))return;gt=t.conversationId,Ye=!1,qt=!1,Ce=!1;return}if(t.type!=="post-end"||!We&&!W)return;let e=M();t.conversationId&&!(e?t.conversationId===e:t.conversationId===gt)||($r=!0,t.error&&(Dr=!0,W&&(W.error=!0)))}function gg(){let t=uu(),e=G();if(ke&&t&&ke!==t){let o=ke;if(!U(o,t))W=null,xi(),qt=e;else{let i=ie(ms(t));if(i&&!gt&&(gt=i,Ye=!1),Te===o&&(Te=t),W&&W.contextKey===o){W.contextKey=t;let a=ds();a&&(W.conversationId=a)}qt=!1}if(ke=t,mg(t,o),qt){Le(vi(!1,t));return}}else t&&(ke=t);if(qt){if(e){Le(vi(!1,t));return}qt=!1}if(W)if(e||W.contextKey!==t)W=null;else{let o=W;W=null,xi(),ug(o),Le(vi(!1,t));return}let n=vi(e,t);if(e){let o=!We;o&&(Ce=!1,Dr=!1,$r=!1),We=!0,Ve=0,Te=t,o&&dg(n),Le(n);return}if(!We){Le(n);return}if(Ve+=1,$r&&(Ve=Math.max(Ve,lu)),Ve<lu){Le(n);return}if(!(!!Te&&Te===t)){xi(),Le(n);return}W={contextKey:Te||t,conversationId:ds(),userStopped:Ce,error:Dr||Ft()},Le(n)}function bg(){Or===void 0&&(We=G(),ke=uu(),Te=We?ke:"",Ve=0,Ce=!1,Dr=!1,$r=!1,qt=!1,W=null,gt="",Ye=!1,Br?.abort(),Br=new AbortController,document.addEventListener("click",fg,{capture:!0,signal:Br.signal}),us=pt(pg),Or=setInterval(gg,lg),cu.debug("watchStreamingEdge started"))}function hg(){Xe.size||(Or!==void 0&&(clearInterval(Or),Or=void 0),Br?.abort(),Br=null,us?.(),us=null,xi(),ke="",qt=!1,W=null,cu.debug("watchStreamingEdge stopped"))}function ot(t){let e=typeof t=="function"?{onFall:t}:t;return Xe.add(e),bg(),()=>{Xe.delete(e),hg()}}var du="bloom-host-icon",qr="data-bloom-host-rel",fs="not all",ps=0,mu=0,yg=400;function fu(t){ps+=1;try{t()}finally{ps-=1}}function Ei(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Me(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function pu(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function vg(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function xg(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-mu<yg||(mu=n,t.appendChild(e))}function Eg(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Ei(n)&&(n.getAttribute(qr)||n.setAttribute(qr,n.rel),n.media!==fs&&(n.media=fs),n.rel!==du&&(n.rel=du))}function wg(t){for(let e of t.querySelectorAll(`link[${qr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(qr);n&&(e.rel=n),e.removeAttribute(qr),e.media===fs&&e.removeAttribute("media")}}function gu(t,e){let{head:n}=document;!n||!e||fu(()=>{Eg(n,t);let r=pu(t),{type:o,sizes:i}=vg(e);r?xg(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function bu(t,e){let{head:n}=document;n&&fu(()=>{pu(t)?.remove(),wg(n)})}function hu(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(ps)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Ei(c.target)&&(a=!0,Me(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Ei(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Ei(u)&&u.id!==t&&(a=!0,Me(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Sg=["original","badge","dot","hole","bg"],xu=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Eu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},wi="#FCFCFC",Lg="#111111",yu="#111111",Tg="#ffffff",kg="#212121",Cg="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Mg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Si=32,vu=64;function wu(t){return typeof t=="string"&&Sg.includes(t)}function Ag(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Li(t){let e=document.createElement("canvas");e.width=Si,e.height=Si;let n=e.getContext("2d");return n?(n.scale(Si/vu,Si/vu),t(n),e.toDataURL("image/png")):""}function Hg(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function Ti(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Cg);n&&(t.strokeStyle=Lg,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Ig(t,e,n){let r=Eu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=yu,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=yu,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Tg,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Fr(t,e){if(t==="original")return e==="wait"?Li(r=>Ti(r,wi)):Ag(Mg[e]);let n=e==="wait"?void 0:Eu[e];return Li(t==="hole"?r=>Ti(r,n??wi):t==="bg"?r=>{r.fillStyle=n??kg,Hg(r,0,0,64,64,14),r.fill(),Ti(r,wi,!1)}:r=>{Ti(r,wi),e!=="wait"&&Ig(r,e,t==="dot"?"dot":"badge")})}function Su(t){return{wait:Fr(t,"wait"),rotate:Fr(t,"rotate"),done:Fr(t,"done"),ready:Fr(t,"ready"),error:Fr(t,"error")}}var Ng=new L("ChatStateFavicons"),Qe="bloom-chat-state-favicon",Mu=["input","beforeinput","cut","paste","compositionend"],Au=T({style:{type:3,description:"Favicon overlay",options:xu}}),zt="",hs={wait:"",rotate:"",done:"",ready:"",error:""},zr="wait",it=!1,Y=!1,P=null,lt="",bt="",en=!0,Mi=!1,qn=null,ht=0,ki=null,Ci=null,Je=null,bs=null,Fn=null,Mt=!1,Lu=new WeakSet;function Rg(){let t=Au.store.style;return wu(t)?t:"bg"}function Hu(){let e=document.querySelector(`link[rel~="icon"]:not(#${Qe}), link[data-bloom-host-rel]:not(#${Qe})`)?.href;return Me(e)?e:Me(zt)?zt:""}function Pg(){let t=document.getElementById(Qe);return t instanceof HTMLLinkElement?t:null}function Og(){if(!Me(zt)){let t=Hu();t&&(zt=t)}return Me(zt)?zt:hs.wait}function Iu(t){return t==="wait"?Og():hs[t]}function Nu(){gu(Qe,Iu(zr))}function D(t){let e=Iu(t);if(zr===t){let n=Pg();if(n&&n.getAttribute("href")===e)return}zr=t,Nu()}function Tu(){hs=Su(Rg()),D(zr)}function ys(){return oe(Ct())}function vs(t,e){!t||!e||t===e||(P===t&&(P=e),lt===t&&(lt=e),bt===t&&(bt=e))}function Bg(){let t=ys();if(!(G()||it||Y))return lt="",t;if(lt&&t&&lt!==t)if(U(lt,t))vs(lt,t),lt=t;else return lt="",t;else!lt&&t&&(lt=t);return lt||t}function ku(t){return!P||!t?!1:P===t?!0:U(P,t)}function Ru(){it=!1,Y=!1,P=null,lt=""}function Pu(t){bt=t,Ru(),en=!1,Mi=!0,D("wait")}function gs(t){return!t&&en}function Dg(){if(!Mt)return;let t=ys();if(bt&&t&&bt!==t&&!U(bt,t)){Pu(t);return}bt&&t&&U(bt,t)&&vs(bt,t),t&&(bt=t);let e=G(),n=e&&!q();if(Mi){if(q()){D("wait");return}Mi=!1}if(q()){D("wait");return}let r=Bg(),o=Ee();if(Ze()&&!e){it=!1,Y=!1,P=null,D(o?"wait":gs(o)?"ready":"wait");return}if(Ft()&&!e&&it){D("error"),it=!1,Y=!1,P=null;return}if(n){it||(en=!1),it=!0,Y=!1,P=r,D("rotate");return}if(it)if(!ku(t))it=!1,Y=!1,P=null;else if(Y){it=!1,Y=!0,P=t||r,D("done");return}else{D("rotate");return}if(Y)if(P&&t&&!ku(t))Y=!1,P=null;else if(o){P=r||P,D("done");return}else if(gs(o)){Y=!1,D("ready");return}else{Y=!1,D("wait");return}P=null,o?D("wait"):gs(o)?D("ready"):D("wait")}function tn(){Mt&&(_u(),Bu(),Du(),Dg())}function Ou(){if(Fn){for(let t of Mu)Fn.removeEventListener(t,$u,!0);Fn=null}}function Bu(){let t=kt(),e=t&&t!==document.body?t:null;if(!(Fn===e&&e?.isConnected)&&(Ou(),!!e)){Fn=e;for(let n of Mu)Fn.addEventListener(n,$u,{capture:!0,passive:!0})}}function Du(){let t=kt();if(!(Je&&bs===t&&t.isConnected)){if(Je?.disconnect(),bs=t,!t||t===document.body){Je=null;return}Je=new MutationObserver(()=>Ai()),Je.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Ai(){if(Mt){if(document.hidden){ht&&(cancelAnimationFrame(ht),ht=0),tn();return}ht||(ht=requestAnimationFrame(()=>{ht=0,Mt&&tn()}))}}function $u(){Dt()&&(en=!0),Ai()}function Cu(){Dt()&&(en=!0),Ai()}function $g(){Mt&&(ht&&(cancelAnimationFrame(ht),ht=0),tn())}function _g(){Mt&&(en=!1,tn())}function qg(t){if(!Mt)return;if(t.userStopped){it=!1,Y=!1,P=null,D("wait");return}if(t.error){it=!1,Y=!1,P=null,D("error");return}let e=ys();if(t.contextKey&&e&&t.contextKey!==e&&!U(t.contextKey,e)){it=!1,Y=!1,P=null,D("wait");return}it=!1,Y=!0,P=e||t.contextKey,D("done")}function Fg(){Mt&&tn()}function zg(t,e){if(Mt){if(U(e,t)){vs(e,t),bt=t,tn();return}Pu(t)}}function _u(){let t=nt();!t||Lu.has(t)||(Lu.add(t),t.addEventListener("input",Cu,{capture:!0,passive:!0}),t.addEventListener("compositionend",Cu,{capture:!0,passive:!0}))}var qu=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Au,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Qe}`],start(){Mt=!0,zt=Hu()||zt,Tu(),Ci?.disconnect(),Ci=hu(Qe,t=>{Me(t)&&(zt=t),Nu()}),qn?.abort(),qn=new AbortController,window.addEventListener("popstate",Ai,{signal:qn.signal}),document.addEventListener("visibilitychange",$g,{signal:qn.signal}),_u(),Bu(),Du(),ki?.(),ki=ot({onRise:_g,onFall:qg,onTick:Fg,onContext:zg}),tn(),Ng.debug("favicon watch started")},stop(){Mt=!1,ht&&cancelAnimationFrame(ht),ht=0,ki?.(),ki=null,qn?.abort(),qn=null,Ou(),Je?.disconnect(),Je=null,bs=null,Ci?.disconnect(),Ci=null,Ru(),bt="",en=!0,Mi=!1,zr="wait",bu(Qe,zt)},onSettingsChange:Tu});var Fu=`.bloom-ih-hud {
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
`;var iE=new L("InputHistory"),xs=/\u200B/g,zu=10,ju=500,Gu=100,Gg=8,Ug=120,Kg=2e3,Hi=10,Ii=T({maxEntries:{type:4,description:"Max stored prompts",min:zu,max:ju,default:Gu},history:{type:5,description:"Stored prompts",render:sb},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Es=new Map,X=0,ws="",jt=!1,Gr=!1,Ts=0,jr=null,Ss,ks=null,Uu=!0;function At(){let t=Ii.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ku(t){let e=et(Number(Ii.store.maxEntries??Gu),zu,ju);return t.length>e?t.slice(t.length-e):t}function Ni(t){Ii.store.entries=Ku(t)}function Vg(t){return t.replaceAll(xs,"").replace(/\n$/,"").trim()}function Ls(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Bt);return n instanceof HTMLElement?n:nt()}function Wg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!$t(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(xs,"").trim().length===0,last:i.toString().replaceAll(xs,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Vu(t){clearTimeout(Ss),Ss=setTimeout(()=>{if(t!==Ts)return;Gr=!1;let e=ks;e&&ls(e,Uu)},Ug)}function Wu(t,e,n){Gr=!0,ks=t,Uu=n;let r=++Ts;re(t,e,n),Vu(r)}function Yg(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function zn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Xg(){document.querySelector(".bloom-ih-hud")?.remove()}function Zg(t,e){let n=Yg();n.textContent=t;let r=(e.closest("form")??kt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Gg)}px`,n.classList.add("bloom-ih-hud-on")}function Cs(t){let e=Vg(t);if(!e)return;let n=Date.now(),r=Es.get(e);if(r&&n-r<Kg)return;Es.set(e,n);let o=At().filter(i=>i!==e);o.push(e),Ni(o),X=At().length,jt=!1,zn()}function Jg(t,e){let n=At();if(!n.length&&t)return;X>=n.length&&(ws=$t(e),X=n.length);let r=t?X-1:X+1;r<0||r>n.length||(X=r,jt=!0,Wu(e,r===n.length?ws:n[r],t),r<n.length?Zg(`${r+1} / ${n.length}`,e):zn())}function Qg(t){jt=!1,zn(),Wu(t,ws,!1),X=At().length}function tb(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Ls(t.target)??Ls(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&jt&&!t.altKey&&!t.shiftKey){Qg(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){Cs($t(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=At();if(!r){let i=Wg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||X<=0)||!n&&X>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Jg(n,e))}function eb(t){if(Ls(t.target)){if(Gr){Vu(Ts);return}jt&&(jt=!1,zn(),X=At().length)}}function nb(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Bt);n instanceof HTMLElement&&Cs($t(n))}function rb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Bn);if(!n||!(n instanceof HTMLElement)||_(n))return;let r=nt();r&&Cs($t(r))}function ob(t){if(!(!jt||Gr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}jt=!1,zn()}}function ib(){if(jr)return;jr=new AbortController;let{signal:t}=jr,e={capture:!0,signal:t};window.addEventListener("keydown",tb,e),window.addEventListener("input",eb,e),window.addEventListener("submit",nb,e),window.addEventListener("click",rb,e),window.addEventListener("pointerdown",ob,e)}function ab(t){let e=At().slice();e.splice(t,1),Ni(e),X>e.length&&(X=e.length)}function sb(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=At().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(d=>d.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Hi));n>=l&&(n=l-1);let c=s.slice(n*Hi,n*Hi+Hi);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let d=document.createElement("div");d.className="bloom-ih-list",c.forEach((E,A)=>{let H=i.indexOf(E),Lt=At().length-1-H,Rt=document.createElement("div");Rt.className="bloom-ih-item";let st=document.createElement("button");st.type="button",st.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,st.textContent=E,st.addEventListener("click",()=>{r=r===A?-1:A,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let mt=document.createElement("button");mt.type="button",mt.title="Copy",mt.textContent="C",mt.addEventListener("click",()=>{sc(E)});let te=document.createElement("button");te.type="button",te.title="Delete",te.textContent="\xD7",te.addEventListener("click",()=>{ab(Lt),o()}),O.append(mt,te),Rt.append(st,O),d.appendChild(Rt)}),t.appendChild(d)}else{let d=document.createElement("p");d.className="bloom-ih-empty",d.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(d)}let m=document.createElement("div");m.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let b=document.createElement("span");b.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Ni([]),X=0,o())}),m.append(f,b,p,g),t.appendChild(m)};return o(),()=>{t.replaceChildren()}}var Yu=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Ii,startAt:"HostReady",managedStyle:"inputHistory",start(){S("inputHistory",Fu),X=At().length,jt=!1,ib()},stop(){jr?.abort(),jr=null,zn(),Xg(),Es.clear(),clearTimeout(Ss),Gr=!1,ks=null,jt=!1},onSettingsChange(){let t=At(),e=Ku(t);e.length!==t.length&&Ni(e),X>e.length&&(X=e.length)}});var Ms="noShareLink",lb=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],cb=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],As=T({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Xu(t){return`${t.join(",")}{display:none!important}`}function Zu(){let t=[];if(As.store.hideShareChat!==!1&&t.push(Xu(lb)),As.store.hideShareProject!==!1&&t.push(Xu(cb)),!t.length){w(Ms);return}S(Ms,t.join(`
`))}var Ju=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:As,start:Zu,onSettingsChange:Zu,stop(){w(Ms)}});var ed="noDictation",ub=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],db=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],nd=T({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Qu(t){return`${t.join(",")}{display:none!important}`}function td(){let t=[Qu(ub)];nd.store.hideDictationSettings!==!1&&t.push(Qu(db)),S(ed,t.join(`
`))}var rd=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:nd,start:td,onSettingsChange:td,stop(){w(ed)}});var Hs="noSidebarIdentity",jn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],ad=jn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),sd=jn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),mb=[...ad,...sd],fb=[...ad,...jn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],pb=jn.map(t=>`${t} a[href^="mailto:"]`),gb=jn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),bb=jn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Ur=T({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function od(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function hb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function yb(){return`${bb.join(",")}{margin-block:auto!important}`}function vb(){return`${gb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function id(){let t=Ur.store.hideUsername!==!1,e=Ur.store.hideEmail!==!1,n=t&&Ur.store.enlargePlan!==!1,r=t&&Ur.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(hb([...fb,...sd])),o.push(yb())):o.push(od(mb))),e&&o.push(od(pb)),n&&o.push(vb()),!o.length){w(Hs);return}S(Hs,o.join(`
`))}var ld=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ur,start:id,onSettingsChange:id,stop(){w(Hs)}});var cd=`#bloom-rt-host {
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
`;var md=new L("RecentTopics"),Kn="bloom-rt-host",fd="home",pd=/^\/c\/([a-z0-9_-]{8,})/i,Eb=/\/c\/([a-z0-9_-]{8,})/i,gd=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,wb=new Set(["Backquote","IntlBackslash"]),Sb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Lb=140,Tb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),Z=T({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Tb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Ri=null,Pi=null,ct=!1,Zr=!1,Kr=!1,Gt=0,nn="",Gn=null,Vr=null,Un,Is=null,Ns=null;function kb(){let t=Number(Z.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Wr(){let t=Z.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ps(){let t=Z.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function bd(){let t=Z.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Os(){let t=Z.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Bi(t){let e=kb();return t.length>e?t.slice(0,e):t}function Ut(t){return t===fd}function Yr(t,e=Lb){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Bs(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(pd)?.[1]??""}catch{return t.match(Eb)?.[1]??""}}function rn(){let t=(location.pathname||"/").match(pd);if(t?.[1])return t[1];let n=Ct().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return fd}function Ds(t){if(Ut(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Bs(r.getAttribute("href")||"")!==t)continue;let o=Yr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return rn()===t&&e&&!/^ChatGPT$/i.test(e)?Yr(e,80):""}function Cb(t){if(Ut(t))return"New chat";let e=Ps()[t];if(e)return e;let n=$n(t);return n||Ds(t)||"Chat"}function Mb(t){return Os()[t]||""}function Ab(t){return bd()[t]||{}}function $s(t,e){if(!t||Ut(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Ps();n[t]!==e&&(n[t]=e,Z.store.titles=n)}function Hb(t){t.type==="conversation-meta"&&($s(t.conversationId,t.title),ct&&Vn())}function Ib(t,e){if(!t||Ut(t)||!e)return;let n=Os();n[t]!==e&&(n[t]=e,Z.store.projects=n)}function Nb(t,e){if(!t||Ut(t)||!e.user&&!e.assistant)return;let n=bd(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,Z.store.previews=n)}function _s(t){if(!t||Ut(t)&&Z.store.includeHome===!1)return;let e=Wr().filter(n=>n!==t);e.unshift(t),Z.store.visits=Bi(e)}function Di(){let t=Z.store.includeHome!==!1;return Bi(Wr().filter(n=>t||!Ut(n))).map(n=>({id:n,title:Cb(n),project:Mb(n),preview:Ab(n)}))}function ud(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Yr(o)}catch{return""}}function Xr(t){if(!t||Ut(t)||t!==rn())return;let e=Ds(t);e&&$s(t,e);let n=ud("user"),r=ud("assistant");Nb(t,{user:n,assistant:r});let o=yd(t);if(o){let i=hd(o);i&&Ib(t,i)}}function qs(){let t=Ps(),e=Os(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Kn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Bs(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let m=Yr(c.textContent||"",80);m&&!gd.test(m)&&t[u]!==m&&(t[u]=m,o=!0);let f=hd(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(Z.store.titles=t),i&&(Z.store.projects=e);let a=Wr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(Z.store.visits=Bi([...a,...l]))}function hd(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Yr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!gd.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function yd(t){if(Ut(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Bs(e.getAttribute("href")||"")===t)return e}catch{}return null}function Rb(t){let e=yd(t);if(e){e.click();return}if(Ut(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Pb(){let t=rn();nn&&nn!==t&&Xr(nn),nn=t,_s(t),qs();let e=Ds(t);e&&$s(t,e),Xr(t)}function Oi(){Un===void 0&&(Un=window.setTimeout(()=>{Un=void 0,Pb()},120))}function Ob(){Gn||(Gn=history.pushState.bind(history),Vr=history.replaceState.bind(history),history.pushState=function(...e){let n=Gn(...e);return Oi(),n},history.replaceState=function(...e){let n=Vr(...e);return Oi(),n})}function Bb(){Gn&&(history.pushState=Gn),Vr&&(history.replaceState=Vr),Gn=null,Vr=null}function Db(t){return wb.has(t.code)||t.keyCode===192?!0:Sb.has(t.key)}function vd(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function $b(t,e){Zr=e,qs(),Xr(rn()),ct=!0,Gt=0;try{let n=rn();_s(n);let r=Di();r.length>1&&(Gt=t?r.length-1:1)}catch(n){md.error("Failed to open switcher:",n)}Vn()}function dd(t){let{length:e}=Di();e&&(Gt=(Gt+(t?-1:1)+e)%e,Vn())}function Fs(){if(!ct)return;let t=Di()[Gt];ct=!1,Zr=!1,Vn(),t&&Rb(t.id)}function xd(){ct&&(ct=!1,Zr=!1,Vn())}function _b(t){if(vd(t)){Kr=!0;return}if((t.ctrlKey||Kr)&&!t.altKey&&!t.metaKey&&Db(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{ct?dd(t.shiftKey):$b(t.shiftKey,!0)}catch(n){md.error("Hotkey failed:",n)}return}if(ct){if(t.key==="Escape"){t.preventDefault(),xd();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Fs();return}t.key==="Tab"&&(t.ctrlKey||Kr)&&(t.preventDefault(),dd(t.shiftKey))}}function qb(t){vd(t)&&(Kr=!1,ct&&Zr&&Fs())}function Fb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Oi)}function zb(t){!ct||(t.target instanceof Element?t.target:null)?.closest(`#${Kn}`)||xd()}function jb(){document.visibilityState==="hidden"&&Xr(rn())}function Rs(t=Pi){t instanceof HTMLElement&&Zo(t,Xo("auto"),!0)}function Gb(){if(!document.body)return null;let t=document.getElementById(Kn);if(t instanceof HTMLElement)return Pi=t,Rs(t),t;t=document.createElement("div"),t.id=Kn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),Pi=t,Rs(t),t}function Vn(){let t=Gb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!ct){e.dataset.visible="false",e.replaceChildren();return}let n=Di();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Gt>=n.length&&(Gt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Gt?"true":"false",s.setAttribute("aria-selected",a===Gt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Gt=a,Fs()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Ub(){document.getElementById(Kn)?.remove(),Pi=null}var Ed=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Kn}`],settings:Z,start(){S("recentTopics",cd),nn=rn(),_s(nn),qs(),Xr(nn),Is=pt(Hb),Ob(),Ri=new AbortController;let{signal:t}=Ri;window.addEventListener("keydown",_b,{capture:!0,signal:t}),window.addEventListener("keyup",qb,{capture:!0,signal:t}),window.addEventListener("popstate",Oi,{signal:t}),document.addEventListener("click",Fb,{capture:!0,signal:t}),document.addEventListener("click",zb,{signal:t}),document.addEventListener("visibilitychange",jb,{signal:t}),Ns=Cn("schemeChange",()=>Rs())},stop(){Ri?.abort(),Ri=null,Un!==void 0&&(clearTimeout(Un),Un=void 0),Bb(),Is?.(),Is=null,Ns?.(),Ns=null,ct=!1,Zr=!1,Kr=!1,Ub()},onSettingsChange(){let t=Bi(Wr());t.length!==Wr().length&&(Z.store.visits=t),ct&&Vn()}});var zs="cleaner",Kb=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Vb=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Wb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Yb=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Xb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Zb=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],on=T({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Wn(t){return`${t.join(",")}{display:none!important}`}function wd(){let t=[];if(on.store.hideDownloadApps!==!1&&t.push(Wn(Kb)),on.store.hideDisclaimer!==!1&&t.push(Wn(Vb)),on.store.hideUpgrade!==!1&&t.push(Wn(Wb)),on.store.hideLockedModels!==!1&&t.push(Wn(Yb)),on.store.hideHomePromo!==!1&&t.push(Wn(Xb)),on.store.hideAds!==!1&&t.push(Wn(Zb)),!t.length){w(zs);return}S(zs,t.join(`
`))}var Sd=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:on,start:wd,onSettingsChange:wd,stop(){w(zs)}});var _i=new L("ResponseNotification"),Xn=T({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:oh},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),js=!1,$i=null,Yn=null,Jr=null;function Jb(){return document.visibilityState==="hidden"||document.hidden}function Qb(){return Xn.store.onlyWhenHidden===!1?!0:Jb()}function th(){let t=$n(M());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Ld(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!Yn||Yn.state==="closed")&&(Yn=new t);let e=Yn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){_i.debug("chime failed",t)}}function eh(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){_i.debug("custom sound failed",e),Ld()}}function Td(){let t=String(Xn.store.soundUrl||"").trim();t?eh(t):Ld()}function nh(){let t="Bloom++",e=`${th()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){_i.debug("notification failed",n)}}function rh(){Qb()&&(Xn.store.sound!==!1&&Td(),Xn.store.browserNotification!==!1&&nh())}function oh(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Td()),t.appendChild(e),()=>{e.remove()}}var kd=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Xn,start(){js=!0,$i?.(),$i=ot(t=>{if(!js||t.userStopped||t.error)return;let e=M()||_n();t.conversationId&&t.conversationId!==e||rh()}),Jr?.abort(),Jr=new AbortController,Xn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Jr.signal}),_i.debug("watch started")},stop(){js=!1,$i?.(),$i=null,Jr?.abort(),Jr=null;try{Yn?.close()}catch{}Yn=null}});var Cd=`#bloom-pq-chip {
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

@media (prefers-reduced-motion: reduce) {
    #bloom-pq-chip { transition: none; }
}
`;var Ie=new L("PromptQueue"),zi="bloom-pq-chip",Md="promptQueue",Ad=80,ah=8,sh=50,lh=2e3,ch='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',uh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,dh=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Ks=T({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),He=new Map,Hd=0,Kt=!1,Ht="",I="",Vt=!1,dt=!1,Re=!1,R=null,Qr=null,qi=null,Ae,ro,Ne=null,k=null,ae=null,z=!1,F=!1,at=!1;function cn(){return oe(Ct())}function sn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function mh(t){let e=sn($t(t));if(e)return e;if(!Dt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),sn(n.innerText||n.textContent||"")}catch{return""}}function Pd(){try{let t=document.querySelectorAll(ch),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Od(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Bd(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&uh.test(n))return!0}}catch{}return!1}function Fi(){let t=_n();if(!t)return!1;let e=M();return!e||e===t}function no(){if(G()||Fi())return!1;let t=Pd();if(!t)return!0;if(Od(t)||Bd(t))return!1;try{if(t.querySelector(dh)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function fh(){if(q()||Ze())return z=!1,!1;if(G()||Fi())return z=!0,!0;let t=Pd();return t&&(Od(t)||Bd(t))?(z=!0,!0):z&&!no()?!0:(z=!1,!1)}function Dd(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Bt);return n instanceof HTMLElement?n:null}function Id(t){return Dd(t)??nt()}function ji(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function $d(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function ph(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?sn(e.innerText||e.textContent||""):""}catch{return""}}function gh(){return Hd+=1,`pq${Date.now().toString(36)}${Hd.toString(36)}`}function K(t){return He.get(t)??[]}function _d(t){return K(t)[0]}function ln(t,e){e.length?He.set(t,e):He.delete(t)}function qd(t){if(!K(t).length){F=!1,at=!1,I="";return}F=!0,at=!1,z=!0,I=""}function Nd(t){if(!Ht||Ht===t)return;let e=He.get(Ht);!e?.length||He.has(t)||U(Ht,t)&&(He.delete(Ht),He.set(t,e),I===Ht&&(I=t),R?.key===Ht&&(R.key=t),Ie.debug("migrated pending",Ht,"\u2192",t))}function Gi(t){let e=cn(),n=K(e);if(Ks.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),ln(e,n)}else if(n.length>=ah){Ie.debug("queue full",e);return}else n.push({id:gh(),text:t,at:Date.now()}),ln(e,n);z=!0,R={key:e,text:t,turns:$d(),ticks:3};let r=nt();r&&re(r,"");try{ut()}catch(o){Ie.error("chip",o)}Ie.debug("queued",e,n.length,t.length)}function Vs(t,e){let n=K(t).filter(r=>r.id!==e);if(ln(t,n),k===e&&(k=null),!n.length)I===t&&(I=""),R?.key===t&&(R=null);else if(R?.key===t){let r=R.text;n.some(o=>o.text===r)||(R=null)}ut()}function bh(t,e,n){if(!e||e===n)return;let r=K(t).slice(),o=r.findIndex(s=>s.id===e),i=r.findIndex(s=>s.id===n);if(o<0||i<0)return;let[a]=r.splice(o,1);a&&(r.splice(i,0,a),ln(t,r),ut())}function hh(){dt=!0,clearTimeout(ro),ro=setTimeout(()=>{dt=!1,ro=void 0},lh)}function yh(t){let e=cn(),n=K(e).find(a=>a.id===t);if(!n)return;let r=nt();if(!r)return;let o=n.text;ln(e,K(e).filter(a=>a.id!==t)),k===t&&(k=null),ut(),hh(),re(r,o);let i=we();i&&!_(i)&&!fi(i)&&(i.click(),dt=!1),qd(e)}function to(t){if(!Kt||Vt||F||G()||cn()!==t)return;let e=_d(t);if(!e){I="";return}if(Ft())return;let n=nt();if(!n)return;if(!Ee(n)){let o=sn($t(n));if(o&&o!==e.text)return}let r=we();!r||_(r)||fi(r)||(Vt=!0,re(n,e.text),clearTimeout(Ae),Ae=setTimeout(()=>vh(t,e.id,e.text),sh))}function vh(t,e,n){Ae=void 0;try{if(!Kt||F)return;let r=_d(t);if(!r||r.id!==e||r.text!==n||G()||cn()!==t)return;let o=nt();if(!o)return;let i=sn($t(o));if(i&&i!==n&&!Ee(o))return;i!==n&&re(o,n);let a=we();if(!a||_(a)||fi(a))return;a.click(),ln(t,K(t).filter(s=>s.id!==e)),ut(),qd(t),Ie.debug("drained",t,K(t).length)}finally{Vt=!1}}function Fd(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="translateX(-50%)";let e=kt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){t.style.left="50%",t.style.width="min(40rem, calc(100vw - 1rem))",t.style.bottom="6.5rem";return}let o=Math.min(n.width,window.innerWidth-16);t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.width=`${Math.round(Math.max(240,o))}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Ws(){Ne?.remove(),Ne=null,k=null,ae=null}var Ys="http://www.w3.org/2000/svg";function zd(){let t=document.createElementNS(Ys,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function Gs(t){let e=zd();for(let n of t){let r=document.createElementNS(Ys,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function xh(){let t=zd(),e=[[9,5],[15,5],[9,12],[15,12],[9,19],[15,19]];for(let[n,r]of e){let o=document.createElementNS(Ys,"circle");o.setAttribute("cx",String(n)),o.setAttribute("cy",String(r)),o.setAttribute("r","1"),o.setAttribute("fill","currentColor"),t.append(o)}return t}function Us(t,e,n){let r=document.createElement("button");return r.type="button",r.className="bloom-pq-ico",r.setAttribute("aria-label",t),r.append(e),r.addEventListener("mousedown",o=>o.preventDefault()),r.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),n()}),r}function Eh(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${zi}`)}function eo(){let t=Ne?.querySelector(".bloom-pq-editing");return t instanceof HTMLElement?t.innerText:null}function wh(t){t.focus();let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function an(t,e){if(k!==t)return;if(k=null,e===null){ut();return}let n=sn(e),r=cn();if(!n){Vs(r,t);return}let o=K(r).find(i=>i.id===t);o&&(o.text=n),ut()}function ut(){if(!Kt||!document.body){Ws();return}let t=cn(),e=K(t);if(!e.length){Ws();return}k&&!e.some(s=>s.id===k)&&(k=null);let n=Ne;n?.isConnected||(n=document.createElement("div"),n.id=zi,document.body.appendChild(n),Ne=n),n.replaceChildren();let r=e.length,o=document.createElement("div");o.className="bloom-pq-head",o.textContent=`${r} Queued message${r===1?"":"s"}`;let i=document.createElement("div");i.className="bloom-pq-list";let a=null;for(let s of e){let l=document.createElement("div");l.className="bloom-pq-row";let c=k===s.id,u=document.createElement("span");if(u.className=c?"bloom-pq-text bloom-pq-editing":"bloom-pq-text",c)u.textContent=s.text,u.contentEditable="true",u.spellcheck=!1,u.setAttribute("role","textbox"),u.setAttribute("aria-label","Edit queued prompt"),u.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?(d.preventDefault(),d.shiftKey||an(s.id,u.innerText)):d.key==="Escape"&&(d.preventDefault(),an(s.id,null))}),u.addEventListener("blur",()=>an(s.id,u.innerText)),a=u;else{let d=s.text.length>Ad?`${s.text.slice(0,Ad)}\u2026`:s.text;u.textContent=d,u.title=s.text}l.append(u);let m=document.createElement("div");m.className="bloom-pq-actions";let f=document.createElement("span");f.className="bloom-pq-ico bloom-pq-grip",f.title="Drag to reorder",f.draggable=!0,f.append(xh()),f.addEventListener("dragstart",d=>{ae=s.id,d.dataTransfer?.setData("text/plain",s.id),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}),f.addEventListener("dragend",()=>{ae=null}),l.addEventListener("dragover",d=>{!ae||ae===s.id||(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"))}),l.addEventListener("drop",d=>{d.preventDefault();let E=d.dataTransfer?.getData("text/plain")||ae||"";ae=null,bh(t,E,s.id)});let b=Us("Dismiss queued prompt",Gs(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{k&&k!==s.id&&an(k,eo()),k=k===s.id?null:k,Vs(t,s.id)});b.classList.add("bloom-pq-ico-danger"),b.title="Delete";let p=Us("Edit queued prompt",Gs(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>{if(k===s.id){an(s.id,eo());return}k&&an(k,eo()),K(t).some(d=>d.id===s.id)&&(k=s.id,ut())});c&&p.classList.add("bloom-pq-ico-active");let g=Us("Send now",Gs(["M12 19V5","M6 11 12 5l6 6"]),()=>{let d=s.id;if(k===d){let E=eo();k=null;let A=E===null?s.text:sn(E);if(!A){Vs(t,d);return}let H=K(t).find(Lt=>Lt.id===d);H&&(H.text=A)}else k&&an(k,eo());yh(d)});m.append(f,b,p,g),l.append(m),i.append(l)}if(n.append(o,i),Fd(n),a){let s=a,l=k;queueMicrotask(()=>{k===l&&s.isConnected&&wh(s)})}}function Sh(){if(!R)return;R.ticks-=1;let t=K(R.key);if(t.length&&$d()>R.turns){let e=ph();if(e&&e===R.text){Ie.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===R.text){n=r;break}n>=0&&t.splice(n,1),ln(R.key,t),!t.length&&I===R.key&&(I=""),R=null,ut();return}}R.ticks<=0&&(R=null)}function Ui(t){return!fh()||!Dt(t)?"":mh(t)}function Lh(t){if(!Kt||t.isComposing||t.keyCode===229||t.key!=="Enter"||Eh(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||Vt)return;let e=Id(t.target)??Id(document.activeElement);if(!e)return;if(t.altKey||dt){dt=!1,Re=!0,queueMicrotask(()=>{Re=!1});return}let n=Ui(e);n&&(ji(t),Gi(n))}function Th(t){if(!Kt||Vt||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Re){Re=!1;return}if(dt){dt=!1;return}let e=Dd(t.target);if(!e)return;let n=Ui(e);n&&(ji(t),Gi(n))}function kh(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||_(e))return null;let n=t.closest(Bn);if(n instanceof HTMLElement&&!_(n))return n;let r=we();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Rd(t){if(!Kt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${zi}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&_(n)||Vt||!kh(e))return;if(dt){dt=!1;return}let r=nt();if(!r)return;let o=Ui(r);o&&(ji(t),Gi(o))}function Ch(t){if(!Kt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(mi)&&!e.querySelector(Bt)||Vt)return;if(Re){Re=!1;return}if(dt){dt=!1;return}let n=nt()??e.querySelector(Bt);if(!n)return;let r=Ui(n);r&&(ji(t),Gi(r))}var jd=y({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Md,cleanupSelectors:[`#${zi}`],settings:Ks,start(){Kt=!0;let t=Ks.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),Ht=cn(),I="",Vt=!1,dt=!1,Re=!1,R=null,z=!q()&&!Ze()&&(G()||Fi()),F=!1,at=!1,k=null,ae=null,S(Md,Cd),Qr?.abort(),Qr=new AbortController;let{signal:e}=Qr,n={capture:!0,signal:e};window.addEventListener("keydown",Lh,n),document.addEventListener("beforeinput",Th,n),document.addEventListener("pointerdown",Rd,n),document.addEventListener("click",Rd,n),document.addEventListener("submit",Ch,n),qi?.(),qi=ot({onFall(r){if(Kt){if(r.userStopped||r.error){z=!1,F=!1,at=!1,I="",ut();return}if(!(F&&!at)){if(F&&at){if(!no())return;F=!1,at=!1,z=!1,I=r.contextKey,to(r.contextKey);return}if(!no()){Ie.debug("unsettled fall; keep queue window");return}z=!1,I=r.contextKey,to(r.contextKey)}}},onRise(){q()||Ze()||(F&&(at=!0),z=!0)},onContext(r,o){o&&r&&!U(o,r)&&(z=!1,F=!1,at=!1,I="",Vt=!1,Ae!==void 0&&(clearTimeout(Ae),Ae=void 0)),Nd(r),Ht=r,ut()},onTick(r){Nd(r.contextKey),Ht=r.contextKey,Sh(),(q()||Ze())&&(F=!1,at=!1,z=!1,I=""),F&&(G()||Fi())&&(at=!0),F&&at&&no()&&(F=!1,at=!1,z=!1,K(r.contextKey).length&&(I=r.contextKey,to(r.contextKey))),!F&&z&&no()&&(z=!1,!I&&K(r.contextKey).length&&(I=r.contextKey,to(r.contextKey))),!F&&I&&I===r.contextKey&&to(I),K(r.contextKey).length&&!Ne?.isConnected?ut():Ne&&Fd(Ne)}}),ut(),Ie.debug("watch started")},stop(){Kt=!1,qi?.(),qi=null,Qr?.abort(),Qr=null,clearTimeout(Ae),Ae=void 0,clearTimeout(ro),ro=void 0,He.clear(),R=null,I="",Vt=!1,dt=!1,Re=!1,z=!1,F=!1,at=!1,ae=null,Ws()}});var Gd=`.bloom-cls {
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
`;var Vd=new L("ChatListStatus"),Ud="chatListStatus",Wi="bloom-cls",Ah="bloom-cls",Hh=1200*1e3,Ih="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",It=new Map,Wt=!1,yt="",se=!1,Qn=!1,vt=0,Pe=null,Js=null,Zn=null,Xs=null,Ki=null,oo=null,Jn=!1,Oe=new Set;function Vi(){return Date.now()}function Wd(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function le(t,e,n,r=!0){if(!(!t||!Wt)){if(e==="idle")It.delete(t);else{let o=It.get(t);o&&o.kind===e&&n!=="net"?o.at=Vi():It.set(t,{kind:e,at:Vi(),source:n})}r&&Nh({v:1,id:t,kind:e,at:Vi()}),un()}}function Nh(t){try{Zn?.postMessage(t)}catch{}}function Rh(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||le(e.id,e.kind,"bc",!1)}function Ph(){let t=Vi();for(let[e,n]of It)n.kind==="streaming"&&t-n.at>Hh&&It.delete(e)}function Oh(){let t=Wd();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Ih))continue;let o=ie(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Kd(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Zs(t){let e=t.querySelector(`:scope > .${Wi}`);return e||null}function Qs(){if(!Wt)return;Ph();let t=M(),e=Oh();Pe?.disconnect();try{for(let n of e){let r=ie(n.getAttribute("href")||"");if(!r||!t||r!==t){Zs(n)?.remove();continue}let i=It.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Zs(n)?.remove();continue}let a=Zs(n);a||(a=document.createElement("span"),a.className=Wi,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Kd("streaming")):i==="error"&&a.appendChild(Kd("error")))}}catch(n){Vd.debug("paint failed",n)}Yd()}function un(){if(Wt){if(document.hidden){vt&&(cancelAnimationFrame(vt),vt=0),Qs();return}vt||(vt=requestAnimationFrame(()=>{vt=0,Wt&&Qs()}))}}function Yd(){let t=Wd();if(!(Pe&&Js===t&&t?.isConnected)){if(Pe?.disconnect(),Js=t,!t){Pe=null;return}Pe=new MutationObserver(()=>un()),Pe.observe(t,{childList:!0,subtree:!0})}}function Yi(){return!!(Ke()||_r())}function Bh(t){return!!(Jn||t&&Oe.has(t)||!Qn&&!q()&&Yi())}function Dh(t){if(Wt){if(t.type==="post-start"){Qn=!1,t.conversationId?(Jn=!1,Oe.add(t.conversationId),se=!0,le(t.conversationId,"streaming","net")):(Jn=!0,se=!0);return}if(t.type==="post-end"){if(Jn=!1,t.conversationId){Oe.delete(t.conversationId);let e=M(),n=_n();(e?t.conversationId===e:t.conversationId===n)?le(t.conversationId,t.error?"error":"done","net"):le(t.conversationId,"idle","net")}Yi()||(se=!1)}}}function $h(t,e){if(!Wt)return;if(U(e,t)){un();return}let n=M();if(yt&&yt!==n){Oe.delete(yt);let r=It.get(yt);r&&r.kind!=="idle"&&le(yt,"idle","local")}Jn=!1,se=!1,Qn=!0,n&&It.get(n)?.kind==="streaming"&&It.get(n)?.source==="local"&&!Oe.has(n)&&le(n,"idle","local"),un()}function _h(t){if(!Wt)return;let e=t.conversationId||M();if(yt&&e&&yt!==e){Oe.delete(yt);let r=It.get(yt);r&&r.kind!=="idle"&&le(yt,"idle","local"),se=!!(e&&Oe.has(e))}if(e&&(yt=e),Qn||q()){if(q()||Yi()||t.streaming){un();return}Qn=!1}if(Bh(e)&&(t.streaming||Yi())){se=!0,e&&le(e,"streaming","local"),un();return}se&&(se=!1,e&&le(e,Ft()?"error":"done","local")),un()}var Xd=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Wi}`],start(){Wt=!0,S(Ud,Gd);try{Zn=new BroadcastChannel(Ah)}catch{Zn=null}Zn?.addEventListener("message",Rh),Xs=pt(Dh),Ki?.(),Ki=ot({onTick:_h,onContext:$h}),oo?.abort(),oo=new AbortController,document.addEventListener("visibilitychange",()=>{Wt&&(vt&&(cancelAnimationFrame(vt),vt=0),Qs())},{signal:oo.signal}),Yd(),Vd.debug("sidebar status watch started")},stop(){Wt=!1,vt&&cancelAnimationFrame(vt),vt=0,oo?.abort(),oo=null,Pe?.disconnect(),Pe=null,Js=null,Ki?.(),Ki=null,Xs?.(),Xs=null;try{Zn?.close()}catch{}Zn=null,It.clear(),Oe.clear(),Jn=!1,se=!1,Qn=!1,yt="",document.querySelectorAll(`.${Wi}`).forEach(t=>t.remove()),w(Ud)}});var Jd="widerChat",Qd=40,tm=96,em=64,nm=T({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Qd,max:tm,default:em}});function qh(){return et(Number(nm.store.width??em),Qd,tm)}function Zd(){let t=qh(),e=`min(100%,${t}rem)`;S(Jd,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var rm=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:nm,start:Zd,onSettingsChange:Zd,stop(){w(Jd)}});var tl="composerOpacity",tr='form[data-type="unified-composer"],form.w-full[data-type]',Fh=[`${tr} [class*="corner-superellipse"]`,`${tr} [class*="bg-token-bg-primary"]`,`${tr} [class*="bg-token-main-surface"]`].join(","),zh=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),jh="#thread-bottom-container,#thread-bottom",Gh=`${tr} #prompt-textarea,${tr} [contenteditable="true"]`,Uh="var(--bg-primary,var(--main-surface-primary,#ffffff))",el=T({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Kh(){return et(Number(el.store.opacity??100),0,100)}function Vh(){return et(Number(el.store.blur??16),0,40)}function om(){let t=Kh();if(t>=100){w(tl);return}let e=Vh(),n=`color-mix(in srgb,${Uh} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";S(tl,`${jh}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${zh}{display:none!important}${tr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Fh}{background-color:${n}!important;background-image:none!important;${r}}${Gh}{background-color:transparent!important;background-image:none!important}`)}var im=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:el,start:om,onSettingsChange:om,stop(){w(tl)}});var am=`#bloom-bn-host {
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
`;var Yh=new L("BetterNavigator"),nl="betterNavigator",um="bloom-bn-host",gn=60,Xh=16,Zh=1e3,Jh=2.5,Qh=.4,Ji="\u6B63\u5728\u8F93\u51FA\u2026",al="Image",t0="\u2753",e0="\u{1F916}",sm=/file_[0-9a-f]+/gi,n0="File",r0="Code",o0=".markdown, .whitespace-pre-wrap",ml=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),i0="img, picture, video, canvas",a0=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,s0=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,uo=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,l0=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,c0=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,u0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,d0=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,m0=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,f0=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,p0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),g0=2e3,b0=40,h0=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,y0=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),v0=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),x0=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),E0=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),aa=T({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),nr=new Map,co=new Map,Xt=new Set,Qi=0,Nt=!1,ue=!1,er=!1,Be=null,mo=null,fn=null,ta=null,J=[],pn="",ea=0,na=-1,fl=0,ra="",xt=0,ce=0,io,ao=null,Xi=null,rl=null,ol=null,dn=null,sl=null,so=null,mn=null,rr=null,lo=null;function sa(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function il(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function w0(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function S0(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)h0.test(w0(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=il(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||il(getComputedStyle(t).getPropertyValue("--thread-content-width"))||il(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function oa(t){try{return!!t.closest(v0)}catch{return!0}}function lm(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function la(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function pl(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function L0(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Zi(t,e){if(t){sm.lastIndex=0;for(let n of t.matchAll(sm))e.add(n[0].toLowerCase())}}function T0(t){try{let e=new Set,n=s=>{L0(s)||(Zi(s.getAttribute("src")||"",e),Zi(s.getAttribute("srcset")||"",e),Zi(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Zi(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=la(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function k0(t,e){let n=T0(t),r=co.get(e)??0,o=Math.max(r,n);return o>0&&co.set(e,o),o>=2?`${al} x${o}`:al}function V(t){return t.replace(/\s+/g," ").trim()}function dm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(x0))return!0;n=n.parentElement}return!1}function ia(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(dm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(ml);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return V(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<gn+20;)e.push(V(r.textContent||""));return V(e.join(" "))}function fo(t){let e=V(t);return e.length<3||e.length>180||uo.test(e)?!1:a0.test(e)?!0:s0.test(e)}function ca(t){let e=V(t);return e.length<8||e.length>120||/\s/.test(e)||uo.test(e)||fo(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function C0(t){let e=[],n=i=>{let a=V(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(V(s[1])),e.push(V(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function M0(t){try{return oa(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function gl(t){let e=V(t);return!e||bl(e)||ca(e)?!0:fo(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function A0(t){return!t.length||t.length>4||!t.every(e=>gl(e))?!1:t.some(e=>uo.test(V(e))||fo(e)||ca(e))}function mm(t){try{let e=null,n=0,r=`${ml}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(M0(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=C0(o);if(!i.length||i.length>4||i.join(" ").length>240||!A0(i))continue;let a=i.some(c=>uo.test(V(c))),s=i.some(c=>fo(c)||ca(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function H0(t){return mm(t)?n0:""}function I0(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(l0.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function N0(t){try{for(let e of t.querySelectorAll(i0))if(!I0(e))return!0}catch{}return!1}function bl(t){let e=V(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||d0.test(e)||u0.test(e)?!0:e.length<=24&&(m0.test(e)||uo.test(e))}function R0(t){let e=[],n=new Set,r=o=>{try{if(dm(o,t)||o.closest(ml))return}catch{return}let i=ia(o);!i||n.has(i)||bl(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>gn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(ia(o).length<24)&&(r(o),e.join(" ").length>gn+20))break}}catch{}return V(e.join(" "))}function P0(t){let e=mm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=V(i.innerText||i.textContent||"");!a||a.length>gn+20||r.has(a)||gl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return V(n.join(" "))}function O0(t,e){let n=[];try{for(let o of t.querySelectorAll(o0)){if(oa(o))continue;let i=ia(o);if(!(!i||e==="assistant"&&bl(i)||gl(i))&&(n.push(i),n.join(" ").length>gn+20))break}}catch{}let r=V(n.join(" "));if(e==="user"){let o=P0(t);if(o)return o}return r||(e==="assistant"?R0(t):"")}function B0(t){return t.length>gn?`${t.slice(0,gn).trimEnd()}\u2026`:t}function cm(t){return f0.test(t)}function D0(t,e,n,r){let o=O0(t,e);if(o)return B0(o);if(r)return Ji;let i=H0(t);if(i)return i;if(pl(t))return k0(t,la(t));try{if(N0(t))return al;if(t.querySelector("pre, code"))return r0}catch{}return`Message ${n+1}`}function $0(){if(ue)return!0;let t=M();return!!(t&&Xt.has(t)||!er&&!q()&&po())}function po(){return!!(Ke()||_r())}function _0(){Qi=Date.now()}function fm(t){ue=!1,t&&Xt.delete(t);let e=M();e&&Xt.delete(e)}function q0(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function F0(t){if(pl(t)||!po())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!ia(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function hl(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=V(e.textContent||"");if(!(n.length>32)&&c0.test(n))return!0}}catch{}return!1}function pm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function z0(t,e){try{if(q0(t))return!0;if(!e)return!1;if(F0(t)||hl(t))return!0}catch{}return!1}function gm(t){if(!t||po())return!1;try{if(hl(t)||pm(t))return!1;if(t.querySelector(p0)||pl(t))return!0}catch{}return!1}function j0(t){if(po()||Qi&&Date.now()-Qi<g0)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!gm(e.el)||fm()}function G0(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(y0)){if(oa(r))continue;let i=la(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(oa(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function U0(){let t=sa();if(!t||t===document.body)return[];let e=aa.store.showAssistant!==!1,n=e&&$0(),r=G0(t),o=null;if(e)for(let a of r)lm(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=la(a);if(!s)continue;let l=lm(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&hl(a),m=c&&pm(a),f=l==="assistant"&&c&&!gm(a)&&(u||m||n||z0(a,!0)),b=D0(a,l,i.length,f);if(b&&b!==Ji){let g=nr.get(s),d=!!g&&(fo(g)||ca(g));(!g||d||!cm(b)||cm(g))&&b!==g&&nr.set(s,b)}let p=f&&b===Ji?Ji:nr.get(s)||b;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return j0(i),i}function K0(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function bm(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function V0(t){return t===window?window.innerHeight:t.clientHeight}function W0(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(E0)}catch{return!1}}function hm(){io!==void 0&&(clearTimeout(io),io=void 0),ao?.classList.remove("bloom-bn-flash"),ao=null}function Y0(t){hm(),t.classList.add("bloom-bn-flash"),ao=t,io=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),ao===t&&(ao=null),io=void 0},800)}function ll(t){if(!J.length)return;let e=Math.max(0,Math.min(t,J.length-1));ea=e,mo?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),fn?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),ta&&(ta.textContent=`${e+1} / ${J.length}`);let n=fn?.children[e];if(n instanceof HTMLElement){let r=fn;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function cl(t){let e=J[t];if(!e?.el.isConnected)return;na=t,fl=Date.now()+Zh,ll(t);let n=rr??bm(e.el),o=Math.abs(e.el.getBoundingClientRect().top-K0())>Jh*V0(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),aa.store.jumpEffect!=="none"&&Y0(e.el)}function yl(){if(!Nt||!J.length)return;if(Date.now()<fl&&na>=0){ll(na);return}let t=window.innerHeight*Qh,e=0;for(let n=0;n<J.length;n++){let r=J[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}ll(e)}function X0(t){let e=bm(t);if(rr===e&&lo)return;lo?.(),rr=e;let n=e===window?document:e,r=()=>{yl(),vl()};n.addEventListener("scroll",r,{passive:!0}),lo=()=>n.removeEventListener("scroll",r)}function Z0(t){mn?.disconnect(),mn=null;let e=rr instanceof HTMLElement?rr:null;mn=new IntersectionObserver(()=>yl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&mn.observe(n.el)}function J0(){if(!document.body)return null;let t=Be;if(t?.isConnected)return t;t=document.createElement("div"),t.id=um,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Be=t,mo=e,fn=i,ta=o,t}function ym(){let t=Be,e=sa();if(!t||!e||!e.isConnected||J.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=S0(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||b0,m=n.right-r.right>=c+8?r.right+4:r.right-12-c;m=Math.min(m,n.right-c-8),m=Math.max(8,m);let f=Math.max(8,Math.round(window.innerWidth-m-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function vl(){!Nt||ce||(ce=requestAnimationFrame(()=>{ce=0,Nt&&ym()}))}function Q0(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function ty(t){let e=mo,n=fn;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Xh),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Q0(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),cl(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?t0:e0;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),cl(o)}),n.appendChild(a)}))}function ey(t){mo?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=fn?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function ny(){let t=M();return t===ra?!1:(ra=t,nr.clear(),co.clear(),J=[],pn="",ea=0,na=-1,fl=0,ue&&t&&(Xt.add(t),ue=!1),!0)}function ry(t){let e=aa.store.showAssistant!==!1?"1":"0";return`${ra}|${e}|${t.map(n=>n.id).join(",")}`}function ul(){if(!Nt)return;ny();let t=U0(),e=sa();if(!e||t.length<1){J=t,pn="",Be&&(Be.hidden=!0),mn?.disconnect(),dl();return}J0();let n=ry(t);n!==pn?(J=t,pn=n,ty(t),X0(e),Z0(t)):(J=t,ey(t)),ym(),yl(),dl()}function Yt(){if(Nt){if(document.hidden){xt&&(cancelAnimationFrame(xt),xt=0),ul();return}xt||(xt=requestAnimationFrame(()=>{xt=0,Nt&&ul()}))}}function dl(){let t=sa();if(!(dn&&sl===t&&t?.isConnected)){if(dn?.disconnect(),so?.disconnect(),sl=t,!t||t===document.body){dn=null;return}dn=new MutationObserver(()=>Yt()),dn.observe(t,{childList:!0,subtree:!0}),so=new ResizeObserver(()=>vl()),so.observe(t)}}function oy(t){if(Nt){if(t.type==="post-start"){_0(),er=!1,t.conversationId?(ue=!1,Xt.add(t.conversationId)):ue=!0,Yt();return}if(t.type==="post-end"){if(ue=!1,t.conversationId)Xt.delete(t.conversationId);else{let e=M();e&&Xt.delete(e)}Yt()}}}function iy(t){if(!Nt||!J.length||Be?.hidden||t.altKey||t.ctrlKey||t.metaKey||W0(t.target))return;let e=-1;if(t.key==="ArrowDown")e=ea+1;else if(t.key==="ArrowUp")e=ea-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=J.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),cl(Math.max(0,Math.min(e,J.length-1)))}function ay(){hm(),mn?.disconnect(),mn=null,dn?.disconnect(),dn=null,sl=null,so?.disconnect(),so=null,lo?.(),lo=null,rr=null,Be?.remove(),Be=null,mo=null,fn=null,ta=null}var vm=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:nl,cleanupSelectors:[`#${um}`],settings:aa,start(){Nt=!0,ra=M(),S(nl,am),Xi=new AbortController;let{signal:t}=Xi;window.addEventListener("keydown",iy,{signal:t}),window.addEventListener("popstate",Yt,{signal:t}),window.visualViewport?.addEventListener("resize",vl,{signal:t}),document.addEventListener("visibilitychange",()=>{Nt&&(xt&&(cancelAnimationFrame(xt),xt=0),ce&&(cancelAnimationFrame(ce),ce=0),ul())},{signal:t}),ol=pt(oy),rl=ot({onTick(){if(q()){Yt();return}er&&!po()&&(er=!1),Yt()},onFall(e){fm(e.conversationId),Yt()},onContext(e,n){if(!U(n,e)){nr.clear(),co.clear(),pn="",ue=!1;let r=M();for(let o of[...Xt])o!==r&&Xt.delete(o);er=!0}Yt()}}),dl(),Yt(),Yh.debug("navigator started")},stop(){Nt=!1,xt&&cancelAnimationFrame(xt),xt=0,ce&&cancelAnimationFrame(ce),ce=0,Xi?.abort(),Xi=null,rl?.(),rl=null,ol?.(),ol=null,Xt.clear(),ue=!1,er=!1,Qi=0,ay(),nr.clear(),co.clear(),J=[],pn="",w(nl)},onSettingsChange(){pn="",Yt()}});var xm=`.bloom-ts {
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
`;function Em(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function wm(t){try{return new Date(t).toISOString()}catch{return""}}var Tm=new L("MessageTimestamps"),Sm="messageTimestamps",da="bloom-ts",Lm=1500,ly="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",or=T({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),ir=new Map,yn=!1,Et=0,De=null,El=null,xl=null,ua=null,go=null,bo=!1,bn=!1;function km(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Sl(){let t=or.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Cm(){let t={...Sl()};for(let[n,r]of ir)t[n]=r;let e=Object.keys(t);if(e.length>Lm){let n=e.slice(e.length-Lm),r={};for(let o of n)r[o]=t[o];or.store.stamps=r;return}or.store.stamps=t}var cy=lc(Cm,500);function Mm(t,e){!t||!e||ir.get(t)===e||(ir.set(t,e),cy(),hn())}function uy(t){return t?ir.get(t)??Sl()[t]??yi(t)??null:null}function dy(t){yn&&t.type==="message-time"&&Mm(t.messageId,t.createTime)}function my(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function fy(){let t=km();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(ly)||e.push(n)}catch{}return e}function py(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function wl(){if(!yn)return;let t=or.store.hideOwnMessages===!0,e=or.store.showDate!==!1,n=G();bn&&!q()&&(bn=!1),bn&&(n?bo=!1:bn=!1);let r=bn?!1:n,o=fy();De?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=my(i),c=i.querySelector(`:scope > .${da}`);if(t&&l==="user"){c?.remove();return}if(py(i)){c?.remove();return}let u=uy(s);if(!u&&s&&(r||bo)&&a>=o.length-2&&(u=Date.now(),Mm(s,u)),!u){c?.remove();return}let m=Em(u,e);if(!m){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=da,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==m&&(f.textContent=m);let b=wm(u);b&&f.getAttribute("datetime")!==b&&f.setAttribute("datetime",b)})}catch(i){Tm.debug("paint failed",i)}bo=r,Am()}function hn(){if(yn){if(document.hidden){Et&&(cancelAnimationFrame(Et),Et=0),wl();return}Et||(Et=requestAnimationFrame(()=>{Et=0,yn&&wl()}))}}function Am(){let t=km();if(!(De&&El===t&&t?.isConnected)){if(De?.disconnect(),El=t,!t||t===document.body){De=null;return}De=new MutationObserver(()=>hn()),De.observe(t,{childList:!0,subtree:!0})}}var Hm=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${da}`],settings:or,start(){yn=!0,S(Sm,xm);let t=Sl();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&ir.set(e,n);xl=pt(dy),ua?.(),ua=ot({onTick:hn,onFall:hn,onContext(e,n){U(n,e)||(bn=!0,bo=!1),hn()}}),go?.abort(),go=new AbortController,document.addEventListener("visibilitychange",()=>{yn&&(Et&&(cancelAnimationFrame(Et),Et=0),wl())},{signal:go.signal}),Am(),hn(),Tm.debug("timestamp watch started")},stop(){yn=!1,Et&&cancelAnimationFrame(Et),Et=0,go?.abort(),go=null,De?.disconnect(),De=null,El=null,ua?.(),ua=null,xl?.(),xl=null,bn=!1,bo=!1,Cm(),ir.clear(),document.querySelectorAll(`.${da}`).forEach(t=>t.remove()),w(Sm)},onSettingsChange:hn});var Ll="streamerMode",gy="filter:blur(6px)!important;transition:filter .2s ease",by="filter:none!important",ar=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],sr=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function wt(t,e){return t.map(n=>`${n} ${e}`)}var vn=T({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function lr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${gy}}${e?`${r}{${by}}`:""}`}function Im(){let t=[];if(vn.store.conversations!==!1&&(t.push(lr([...wt(sr,'a[href^="/c/"]'),...wt(sr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),vn.store.projects!==!1&&(t.push(lr([...wt(sr,'a[href*="/project"]'),...wt(sr,'a[href*="/g/g-p-"]'),...wt(sr,'[data-testid="project-name"]'),...wt(sr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),vn.store.headerTitle!==!1&&t.push(lr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),vn.store.accountAvatar!==!1&&t.push(lr([...wt(ar,"img"),...wt(ar,'[class*="avatar"]'),...wt(ar,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),vn.store.accountName!==!1&&t.push(lr([...wt(ar,".min-w-0 > .truncate"),...wt(ar,".min-w-0.flex-1 .truncate")],!1)),vn.store.accountEmail!==!1&&t.push(lr([...wt(ar,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){w(Ll);return}S(Ll,t.join(`
`))}var Nm=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:vn,start:Im,onSettingsChange:Im,stop(){w(Ll)}});var Rm=`.bloom-gc-panel {
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
}`;var yy=new L("GreetingCustomizer"),cr="greetingCustomizer",Pm="greetingCustomizerUi",ho=100,kl=30,vy=120,xy=1e3,Ey=50,wy=40,Sy=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),yo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),ba=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Ly(t){return!!t?.closest(Sy)}function $m(t){return!!(Ly(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function To(t){try{for(let e of document.querySelectorAll(t))if(!$m(e))return e}catch{}return null}function Tl(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(To(e))return e;return t}var _m=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],Q=T({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:qy},greetings:{type:0,description:"Greeting texts",hidden:!0,default:_m},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Zt=!1,mr=!1,En=null,fa,vo,ur,xo,pa=0,ma=null,dr=null,Eo=null,wo=null,So=null,ga=null;function me(){let t=location.pathname||"/";return t==="/"||t===""}function xn(){let t=Q.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):_m.slice()}function Lo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Om(t){Q.store.greetings=t.slice(0,kl)}function ko(){let t=String(Q.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Ty(){return Q.store.order==="random"?"random":"sequential"}function ky(){return et(Number(Q.store.intervalSec??10),1,3600)*1e3}function Cy(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function My(){return!!To(ba)}function ha(){return!!(To(ba)||To(yo))}function Ay(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=My()?Tl(ba):To(yo)?Tl(yo):Tl(ba),i=e?`${yo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Hy(t,e){if(t<=0)return 0;if(t===1)return Number(Q.plain.index)!==0&&(Q.store.index=0),Number(Q.plain.lastRandom)!==0&&(Q.store.lastRandom=0),0;let n=Number(Q.plain.index),r=Number(Q.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Ty()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return Q.store.index=s,Q.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return Q.store.index=i,i}function de(t){if(!Zt)return;if(!me()){w(cr);return}let e=xn().map(Lo).filter(Boolean);if(!e.length){w(cr);return}let n=Hy(e.length,t),r=e[n]??e[0],o=ko()==="manual"&&e.length>1;S(cr,Ay(Cy(r),o)),ga?.()}function Cl(){fa!==void 0&&(clearInterval(fa),fa=void 0)}function Ml(){Cl(),!(!Zt||!me())&&ko()==="interval"&&(xn().filter(Boolean).length<=1||(fa=setInterval(()=>de(!0),ky())))}function Al(){xo!==void 0&&(clearTimeout(xo),xo=void 0),pa=0}function Bm(){if(Al(),!Zt||!me())return;pa=wy;let t=()=>{if(xo=void 0,!(!Zt||!me())){if(ha()){ko()==="refresh"&&!mr?(mr=!0,de(!0)):de(!1),Ml();return}pa-=1,pa>0&&(xo=setTimeout(t,Ey))}};t()}function Hl(){if(En===!0){ha()?de(!1):Bm();return}En=!0,mr=!1,ko()==="refresh"?(mr=!0,de(!0)):de(!1),Ml(),ha()||Bm()}function Il(){En=!1,mr=!1,Cl(),Al(),w(cr)}function ya(){ur===void 0&&(ur=window.setTimeout(()=>{ur=void 0,Zt&&(me()?Hl():En!==!1&&Il())},vy))}function Iy(){dr||(dr=history.pushState.bind(history),Eo=history.replaceState.bind(history),wo=function(...e){let n=dr(...e);return ya(),n},So=function(...e){let n=Eo(...e);return ya(),n},history.pushState=wo,history.replaceState=So)}function Ny(){wo&&history.pushState===wo&&dr&&(history.pushState=dr),So&&history.replaceState===So&&Eo&&(history.replaceState=Eo),dr=null,Eo=null,wo=null,So=null}function Ry(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(ya)}function Py(t){if(!Zt||!me()||ko()!=="manual"||xn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(yo);if(!n||$m(n))return;let r=window.getSelection?.();r&&String(r).trim()||de(!0)}function Oy(){vo===void 0&&(vo=setInterval(()=>{if(!Zt)return;let t=me();if(t!==(En===!0)){t?Hl():Il();return}t&&ha()&&de(!1)},xy))}function By(){vo!==void 0&&(clearInterval(vo),vo=void 0)}function Dm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var Dy="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",$y="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function _y(t,e){let n=Lo(t);return n?n.length>ho?`Keep it to ${ho} characters.`:xn().length+(e?1:0)>kl?`At most ${kl} greetings.`:null:"Enter a greeting."}function qy(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=xn(),s=Number(Q.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=ho,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let d=l.querySelector(".bloom-gc-count");d&&(d.textContent=`${Lo(e).length}/${ho}`);let E=l.querySelector(".bloom-gc-error");E&&(E.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let m=document.createElement("span");m.className="bloom-gc-count",m.textContent=`${Lo(e).length}/${ho}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let b=document.createElement("div");if(b.className="bloom-gc-actions",n>=0){let d=document.createElement("button");d.type="button",d.className="bloom-gc-btn",d.textContent="Cancel",d.addEventListener("click",()=>{n=-1,e="",r="",i()}),b.appendChild(d)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let d=n<0,E=_y(e,d);if(E){r=E,i();return}let A=Lo(e),H=xn().slice();n>=0&&n<H.length?H[n]=A:H.push(A),Om(H),n=-1,e="",r="",i()}),b.appendChild(p),u.append(m,f,b),l.appendChild(u),t.appendChild(l),!a.length){let d=document.createElement("p");d.className="bloom-gc-empty",d.textContent="No greetings. The official heading stays.",t.appendChild(d);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((d,E)=>{let A=document.createElement("div");A.className="bloom-gc-item",E===s&&(A.dataset.active="true");let H=document.createElement("button");H.type="button",H.className=`bloom-gc-body${o===E?"":" bloom-gc-clamp"}`,H.textContent=d,H.addEventListener("click",()=>{o=o===E?-1:E,i()});let Lt=document.createElement("div");Lt.className="bloom-gc-item-actions";let Rt=Dm("Edit",Dy);Rt.addEventListener("click",()=>{n=E,e=d,r="",i()});let st=Dm("Delete",$y);st.addEventListener("click",()=>{let O=xn().filter((mt,te)=>te!==E);Om(O),n===E?(n=-1,e=""):n>E&&(n-=1),i()}),Lt.append(Rt,st),A.append(H,Lt),g.appendChild(A)}),t.appendChild(g)};return ga=i,i(),()=>{ga===i&&(ga=null),t.replaceChildren()}}var qm=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Pm,settings:Q,start(){Zt=!0,S(Pm,Rm),Iy(),ma=new AbortController;let{signal:t}=ma;window.addEventListener("popstate",ya,{signal:t}),document.addEventListener("click",Ry,{capture:!0,signal:t}),document.addEventListener("click",Py,{signal:t}),Oy(),En=null,me()?Hl():Il(),yy.debug("started")},stop(){Zt=!1,ma?.abort(),ma=null,ur!==void 0&&(clearTimeout(ur),ur=void 0),Cl(),Al(),By(),Ny(),w(cr),mr=!1,En=null},onSettingsChange(){Zt&&(me()?(de(!1),Ml()):w(cr))}});function Fy(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function va(t){try{return await createImageBitmap(t)}catch{return null}}async function zy(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function xa(t){if(t.startsWith("data:")){let e=Fy(t);if(e){let n=await va(e);if(n)return n}return zy(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?va(await e.blob()):null}catch{return null}}var wa="data-bloom-csi-slot",jy="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Gy=/\bsize-(?:[6-9]|10)\b/,Uy=/\b(?:h|w)-(?:[6-9]|10)\b/,Ky=/^(plus|pro|free|team|go|business|enterprise)$/i,Vy=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Ea(t){return t.getAttribute("class")||""}function zm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Gy.test(t)?!0:Uy.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Wy(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!jm(e)}function jm(t){return Ky.test(String(t??"").replace(/\s+/g,""))}function Jt(t){return!!t?.closest(jy)}function Sa(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Co(t){let e=Ea(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:jm(t.textContent||"")}function La(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Mo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Yy(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Gm(t){if(Jt(t)||La(t)||Mo(t)||Co(t)||Sa(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Um(t){return Jt(t)||La(t)||Mo(t)||Co(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Wy(t.textContent||"")}function Km(t){return Jt(t)||Mo(t)||Sa(t)||Co(t)?!1:zm(Ea(t))||Um(t)?!0:Gm(t)}function Fm(t){return!(Jt(t)||Sa(t)||Mo(t)||Co(t)||La(t))}function wn(t,e){let n=La(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Mo(n)||Sa(n)||Co(n));)Jt(n)||(r=n),n=n.parentElement;return r}function Xy(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Jt(e))continue;if(Yy(Ea(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Fm(o))){if(Km(o)||zm(Ea(o)))return wn(o,t)??o;r.push(o)}if(r.length===1)return wn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Fm(r))return wn(r,t)??r}}return null}function Zy(t){let e=t.querySelectorAll(Vy);for(let n of e)if(Km(n))return wn(n,t)??n;return null}function Jy(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Um(e))return wn(e,t)??e;return null}function Qy(t){for(let e of t.querySelectorAll("*"))if(Gm(e))return wn(e,t)??e;return null}function Vm(t,e){if(Jt(t))return null;if(e&&!Jt(e)&&t.contains(e)){let n=wn(e,t);if(n)return n}return Xy(t)??Zy(t)??Jy(t)??Qy(t)}function Wm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var fr="data-bloom-csi",Ta="data-bloom-csi-orig",Sn=new Set,Ym=null;function Rl(t){Ym=t}function Xm(t){return`url(${JSON.stringify(t)})`}function ka(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Pl(t,e,n){let r=Xm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Zm(t,e=wa){let n=Xm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function tv(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function pr(t){t.removeEventListener("error",Nl);let e=t.getAttribute(Ta);t.removeAttribute(fr),t.removeAttribute(Ta),e&&t.getAttribute("src")!==e&&(t.src=e)}function Nl(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Sn.add(n),pr(e),Ym?.()}function Jm(t,e){if(!e||Sn.has(e)){pr(t);return}tv(t);let n=t.getAttribute("src")??"";if(t.getAttribute(fr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Ta)&&t.setAttribute(Ta,n);t.setAttribute(fr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Nl),t.addEventListener("error",Nl),n!==e&&(t.src=e)}var Qm=`/*
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
`;var tf=new L("CustomSidebarIdentity"),ef="customSidebarIdentityUi",of="customSidebarIdentity",nv="bloom-csi-face",rv="bloom-csi-name",gr=wa,ov=1024,Ca=256,af=24,sf=64,lf=40,$l=1,_l=4,Ao=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Ol=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=T({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:wv},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:af,max:sf,default:lf},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Tn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function iv(){return String(x.store.displayName??"").trim()}function Ha(t,e,n,r,o){let i=et(n,$l,_l),a=Math.min(t,e)/i,s=et(r,a/2,Math.max(a/2,t-a/2)),l=et(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function av(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function ql(t){let e=Math.min(1,ov/Math.max(t.width,t.height));return av(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function sv(t,e,n,r){let{side:o,x:i,y:a}=Ha(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Ca,s.height=Ca;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,Ca,Ca);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function lv(t){let e=await va(t);if(!e)return null;let n=ql(e);return e.close(),n}async function zl(t,e,n,r){let o=await xa(t);if(!o)return null;let i=sv(o,e,n,r);return o.close(),i}function jl(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function nf(){x.store.avatarUrl="",x.store.avatarSource="",jl()}var rf=0;async function Fl(t){let e=++rf;jl(),x.store.avatarSource=t;let n=await zl(t,.5,.5,1);return e!==rf?!1:(n&&(x.store.avatarUrl=n),!!n)}function Ho(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Bl(t){let e=Ho(t);if(!e)return!1;let n=await lv(e);return n?Fl(n):!1}var St=!1,br=!1,hr=0,Ia=0,Ma=null,$e=new Map,yr=null,fe=null,Na=null,Qt=null,Ra=null;function Pa(t){let e=String(t??"").trim();if(!e||Sn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function cf(){return Pa(x.store.avatarUrl)??Pa(x.store.avatarSource)}var Aa=!1,Dl=new Set;function uf(){let t=Pa(x.store.avatarSource);if(!t?.startsWith("data:image/")||Pa(x.store.avatarUrl)?.startsWith("data:image/")||Aa||Dl.has(t))return;Aa=!0;let e=Tn(x.store.cropX,.5),n=Tn(x.store.cropY,.5),r=Tn(x.store.cropZoom,1);zl(t,e,n,r).then(o=>{if(Aa=!1,!o){Dl.add(t);return}St&&(x.store.avatarUrl=o,Oa())}).catch(()=>{Aa=!1,Dl.add(t)})}function Ln(t,e){return t.map(n=>`${n} ${e}`)}function cv(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function uv(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=cv(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function df(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Jt(n)||n.closest(".min-w-0")||e.push(n);return e}function dv(t){let e=df(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Gl(){let t=[],e=ze();e&&t.push(e);let n=Nn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Ao.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function mf(t,e){let n=dv(t);if(n)Jm(n,e);else for(let o of df(t))pr(o);let r=Vm(t,n);for(let o of t.querySelectorAll(`[${gr}]`))o!==r&&o.removeAttribute(gr);r&&r.setAttribute(gr,"")}function mv(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function fv(t,e){let n=mv(t);n&&mf(n,e)}function pv(){for(let t of document.querySelectorAll(`img[${fr}]`))pr(t);for(let t of document.querySelectorAll(`[${gr}]`))t.removeAttribute(gr)}function gv(){let t=et(Math.round(Tn(x.store.avatarSize,lf)),af,sf),e=cf(),n=iv(),r=x.store.applyToMenu!==!1,o=[],i=[...Ln(Ao,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Ln(Ol,"> :first-child img"));let a=[...Ln(Ao,".min-w-0 > .truncate"),...Ln(Ao,".min-w-0.flex-1 .truncate")];r&&a.push(...Ln(Ol,"> :first-child .truncate"));let s=Wm(gr);o.push(ka([...s.flatMap(l=>Ln(Ao,l))].join(","),t)),o.push(ka(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(ka(s.flatMap(l=>Ln(Ol,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Pl(i.join(","),e,t)),o.push(Pl("#stage-sidebar-tiny-bar img",e,32)),o.push(Zm(e))),n&&o.push(uv(a,n)),S(of,o.join(""))}function bv(){let t=cf(),e=Gl();for(let n of e)mf(n,t);if(x.store.applyToMenu!==!1){let n=Rn();n&&fv(n,t)}for(let n of document.querySelectorAll(`img[${fr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||pr(n)}function Oa(){if(!(!St||br)){br=!0;for(let t of $e.values())t.disconnect();fe?.disconnect(),Qt?.disconnect();try{gv(),bv()}finally{br=!1,Ul(),xv(),yr?.isConnected&&ff(yr),uf()}}}function Io(){!St||hr||(hr=requestAnimationFrame(()=>{hr=0,Oa()}))}function hv(){br||!St||Io()}function yv(t){if($e.has(t))return;let e=new MutationObserver(hv);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),$e.set(t,e)}function vv(t){$e.get(t)?.disconnect(),$e.delete(t)}function Ul(){let t=new Set;for(let n of Gl())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Nn();e&&t.add(e);for(let n of[...$e.keys()])(!t.has(n)||!n.isConnected)&&vv(n);for(let n of t)n.isConnected&&yv(n)}function xv(){let t=Wo();if(!t){Qt?.disconnect(),Qt=null,Na=null;return}if(Na===t&&Qt){Qt.observe(t,{childList:!0});return}Qt?.disconnect(),Na=t,Qt=new MutationObserver(()=>{br||!St||(Ul(),Io())}),Qt.observe(t,{childList:!0})}function ff(t){yr===t&&fe||(fe?.disconnect(),yr=t,fe=new MutationObserver(()=>{if(!t.isConnected){fe?.disconnect(),fe=null,yr=null;return}br||!St||Io()}),fe.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function pf(t){if(!St||x.store.applyToMenu===!1)return;let e=Rn();if(e){ff(e),Io();return}t<=0||requestAnimationFrame(()=>pf(t-1))}function gf(t){St&&(Oa(),!(Gl().length||t<=0)&&(Ia=requestAnimationFrame(()=>gf(t-1))))}function Ev(t){St&&x.store.applyToMenu!==!1&&(!Yo(t)&&!Rn()||pf(10))}function wv(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let m=document.createElement("p");m.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let b=document.createElement("div");b.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,b.appendChild(p);let g=document.createElement("div");g.className="bloom-csi-zoom-row";let d=document.createElement("input");d.type="range",d.className="bloom-csi-zoom",d.min=String($l),d.max=String(_l),d.step="0.05",d.setAttribute("aria-label","Zoom");let E=document.createElement("span");E.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",g.append(d,E,A);let H=document.createElement("p");H.className="bloom-csi-hint",H.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(b,g,H),t.append(u,m,f);function Lt(){let h=String(x.store.avatarSource??""),C=String(x.store.avatarUrl??"");return h.startsWith("data:image/")?h:C.startsWith("data:image/")?C:""}function Rt(h,C,N){if(!a)return i.x=h,i.y=C,i.zoom=et(N,$l,_l),i;let rt=Ha(a.w,a.h,N,h*a.w,C*a.h);return i.x=rt.x/a.w,i.y=rt.y/a.h,i.zoom=rt.z,i}function st(){d.value=String(i.zoom),E.textContent=`${Math.round(i.zoom*100)}%`;let h=a?Ha(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;h&&a&&(p.style.width=`${a.w/h.side*100}%`,p.style.height=`${a.h/h.side*100}%`,p.style.left=`${(.5-h.x/h.side)*100}%`,p.style.top=`${(.5-h.y/h.side)*100}%`)}function O(h=!1){let C=Lt(),N=String(x.store.avatarUrl??"").trim(),rt=!!C;s.hidden=!N&&!C,(C||N)&&(s.src=C||N),document.activeElement!==l&&(l.value=rt?"":N),l.placeholder=rt?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!C,m.hidden=!(e&&/^https?:\/\//.test(N)&&!C),m.textContent=m.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(h&&(i.x=Tn(x.store.cropX,.5),i.y=Tn(x.store.cropY,.5),i.zoom=Tn(x.store.cropZoom,1)),p.getAttribute("src")!==C&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},Rt(i.x,i.y,i.zoom),st()},p.src=C),st())}function mt(h,C,N,rt=!1){Rt(h,C,N),st();let Zl=Lt(),Jl=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,Zl&&zl(Zl,i.x,i.y,i.zoom).then(Ql=>{Ql&&(x.store.avatarUrl=Ql)})};r&&clearTimeout(r),rt?Jl():r=setTimeout(Jl,80)}function te(h){x.store.avatarUrl=h;let C=h.trim();if(n&&clearTimeout(n),!C){x.store.avatarSource="",jl(),e=!1,O(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{xa(C).then(N=>{if(!N)return;let rt=ql(N);N.close(),rt&&Fl(rt).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{xa(C).then(N=>{if(!N){e=!0,O(!0);return}let rt=ql(N);N.close(),rt?(e=!1,Fl(rt).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,x.store.avatarSource="",O(!0)}u.addEventListener("paste",h=>{Ho(h.clipboardData)&&(h.preventDefault(),e=!1,Bl(h.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",h=>{Ho(h.dataTransfer)&&h.preventDefault()}),u.addEventListener("drop",h=>{Ho(h.dataTransfer)&&(h.preventDefault(),e=!1,Bl(h.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>te(l.value)),l.addEventListener("paste",h=>{Ho(h.clipboardData)&&(h.preventDefault(),e=!1,Bl(h.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",h=>{Lt()&&!l.value&&(h.key==="Backspace"||h.key==="Delete")&&(nf(),e=!1,O(!0))}),c.addEventListener("click",()=>{nf(),e=!1,O(!0)}),b.addEventListener("pointerdown",h=>{h.button===0&&(b.setPointerCapture(h.pointerId),o.on=!0,o.px=h.clientX,o.py=h.clientY,o.x=i.x,o.y=i.y)}),b.addEventListener("pointermove",h=>{if(!o.on||!a)return;let C=b.clientWidth;if(!C)return;let{side:N}=Ha(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Rt(o.x-(h.clientX-o.px)*(N/C)/a.w,o.y-(h.clientY-o.py)*(N/C)/a.h,i.zoom),st()}),b.addEventListener("pointerup",()=>{o.on&&(o.on=!1,mt(i.x,i.y,i.zoom,!0))}),b.addEventListener("pointercancel",()=>{o.on=!1}),b.addEventListener("wheel",h=>{h.preventDefault(),mt(i.x,i.y,i.zoom*(h.deltaY<0?1.08:1/1.08))},{passive:!1}),d.addEventListener("input",()=>mt(i.x,i.y,Number(d.value))),d.addEventListener("change",()=>mt(i.x,i.y,Number(d.value),!0)),A.addEventListener("click",()=>mt(.5,.5,1,!0));let Xl=()=>O(!1);return Ra=Xl,O(!0),()=>{Ra===Xl&&(Ra=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var bf=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:ef,cleanupSelectors:[`.${nv}`,`.${rv}`],settings:x,start(){St=!0,Sn.clear(),Rl(Io),S(ef,Qm),Ma=new AbortController,document.addEventListener("click",Ev,{signal:Ma.signal}),gf(40),uf(),tf.debug("started")},onSettingsChange(){Sn.clear(),Ra?.(),St&&(Ul(),Oa())},stop(){St=!1,Ma?.abort(),Ma=null,hr&&cancelAnimationFrame(hr),hr=0,Ia&&cancelAnimationFrame(Ia),Ia=0;for(let t of $e.values())t.disconnect();$e.clear(),fe?.disconnect(),fe=null,yr=null,Qt?.disconnect(),Qt=null,Na=null,pv(),w(of),Rl(null),Sn.clear(),tf.debug("stopped")}});var vr=new L("Bloom"),hf=!1,Sv=Date.now(),Lv=[Yc,qu,Yu,Ju,rd,ld,Ed,Sd,kd,jd,Xd,rm,im,vm,Hm,Nm,qm,bf];function Ba(t){return new Promise(e=>setTimeout(e,t))}function Tv(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function kv(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var vf=8e3,yf=300,Cv=250;async function Mv(){if(Fe())return await Ba(yf),!0;for(;Date.now()-Sv<vf;)if(await Ba(Cv),Fe())return await Ba(yf),!0;return Fe()||Ua()}function Kl(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Av(){if(Kl())return!0;let t=Date.now()+vf;for(;Date.now()<t;)if(await Ba(100),Kl())return!0;return Kl()}function Hv(){try{GM_registerMenuCommand?.("Bloom++ settings",Wc)}catch{}}function Iv(){Fo(()=>{Er("HostShell"),vr.info("host shell",ft)}),zo(()=>{vr.info("idle ready",ft)}),jo(()=>{$a(),Er("HostReady"),vr.info("chrome ready",ft)})}async function Vl(){await dc()}async function Wl(){if(hf)return;hf=!0;for(let n of Lv)try{yc(n),Mc(n)}catch(r){vr.error("register failed",n.name,r)}Er("Init"),Hv(),Iv();let t=()=>Er("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Tv(),$a(),vr.info("styles ready",ft),await kv(),Av().then(n=>{n&&Go()}),!await Mv()){vr.warn("late islands not detected; starting default plugins",ft),An(),Uo();return}await kc()}var xf=typeof unsafeWindow<"u"?unsafeWindow:window,Nv=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Nv){let t=xf.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",ft);try{Object.defineProperty(xf,"Bloom",{value:Yl,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Vl().then(()=>Wl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
