// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.97
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

/* Bloom++ [20260924] v1.4.97. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Zm=Object.defineProperty;var Jm=(t,e)=>{for(var n in e)Zm(t,n,{get:e[n],enumerable:!0})};var gc={};Jm(gc,{REPO_URL:()=>Gc,Settings:()=>F,VERSION:()=>xt,contextKeyFromUrl:()=>ce,conversationTitle:()=>Gn,conversationToken:()=>Ot,currentConversationId:()=>R,hasDraftText:()=>Ut,hasErrorToast:()=>Yt,hasLateIslands:()=>Xe,init:()=>pc,initSettings:()=>mc,isDocumentInteractive:()=>Kc,isStreaming:()=>V,isUserDraftEmpty:()=>Ae,messageCreateTime:()=>Oi,plugins:()=>ae,requestChromeReady:()=>ai,requestIdleReady:()=>On,requestShellReady:()=>ii,setEditorText:()=>le,subscribeHarvest:()=>Et,watchStreamingEdge:()=>ct,whenChromeReady:()=>oi,whenIdleReady:()=>ri,whenShellReady:()=>ni});var we=new Map,Vo=!1;function Qm(){return document.getElementById("bloom-root")?.shadowRoot??null}function hc(){return document.head??null}function Rn(){let t=Qm();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=tp()}function es(t,e){if(!Vo)return;let n=hc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Rn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Rn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Rn()}function k(t,e){let n=we.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},we.set(t,n)),Vo&&es(t,n)}function ns(){if(!hc())return!1;Vo=!0;for(let[e,n]of we)es(e,n);return Rn(),!0}function yc(t){let e=we.get(t);e&&(e.disabled=!1,Vo&&es(t,e))}function vc(t){let e=we.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Rn())}function L(t){let e=we.get(t);e&&(e.el?.remove(),we.delete(t),Rn())}function tp(){return Array.from(we.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var M=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function w(t){return t}var rs=new Map;function Nn(t,e){let n=rs.get(t);return n||(n=new Set,rs.set(t,n)),n.add(e),()=>n.delete(e)}function We(t,e){let n=rs.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var ep="bloompp";function xc(){return new Promise((t,e)=>{let n=indexedDB.open(ep,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Ec(t){try{let e=await xc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function wc(t,e){try{let n=await xc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function rt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function ot(t,e,n){return Math.min(n,Math.max(e,t))}function Sc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Tc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Lc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Wo=new M("SettingsStore"),Se="BloomSettings",np=100;function Yo(t){return t!=null&&typeof t.then=="function"}function rp(t){if(t==null||Yo(t))return null;if(rt(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(rt(e)&&!Yo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return rt(n)&&!Yo(n)?n:null}return null}catch{return null}}function Zo(t){let e=rp(t);if(!e)return null;let n=e.plugins;return!rt(n)||Yo(n)||Object.keys(n).length===0?null:e}function is(t){return rt(t)?t:null}function os(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:rt(t)?Object.keys(t).length===0:!1}function op(t){return os(t)?0:Array.isArray(t)?12+Math.min(t.length,40):rt(t)?12+Math.min(Object.keys(t).length,40):3}function Ye(t){if(!t)return-1;let e=t.plugins;if(!rt(e))return-1;let n=0;for(let r of Object.values(e)){let o=is(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=op(a))}return n}function kc(t){let e=t.plugins;if(!rt(e))return 0;let n=0;for(let r of Object.values(e))is(r)?.enabled===!0&&n++;return n}function Mc(t){let e=t.map((i,a)=>({bag:i,index:a,score:Ye(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=kc(a.bag)-kc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!rt(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(rt(a))for(let[s,l]of Object.entries(a)){let c=is(l);if(!c)continue;if(!rt(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}os(u[d])&&!os(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return rt(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Ye(n)}}var Xo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return rt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Wo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},np))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Se,this.plain)}catch{try{GM_setValue(Se,e)}catch(n){Wo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Se,e)}catch{}wc(Se,e).catch(n=>Wo.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){Wo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Sc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var ip=new M("Settings"),ap={plugins:{}},F=new Xo(structuredClone(ap)),sp=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function lp(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function C(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?Te(n):{}},get plain(){let n=e.pluginName;return n?F.plain.plugins[n]??{}:{}}};return e}async function cp(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Cc(){let t=Zo(await cp(Se)),e=Zo(await Ec(Se)),n=null;try{n=Zo(localStorage.getItem(Se))}catch{n=null}let r=Mc([t,e,n]);if(r){let o=r.bag.plugins;o&&(F.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);ip.info("Loaded settings from",i,"richness",r.score,"gm",Ye(t),"idb",Ye(e),"ls",Ye(n))}F.releasePersist(),r&&(r.index!==0||r.score>Ye(t))&&F.persistLoadedBag()}function Te(t){return F.plain.plugins[t]||(F.plain.plugins[t]={}),F.store.plugins[t]}function Ac(t,e){e&&(e.pluginName=t,Te(t),F.setDefaultGetter(sp(t),n=>{if(n!=="enabled")return lp(e.def,n)}))}function Hc(){return Te("Settings")}function Jo(){return Hc().pinnedPlugins??[]}function Ic(t){return Jo().includes(t)}function Rc(t){let e=Jo(),n=e.includes(t);return F.store.plugins.Settings={...F.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function Qo(){return Hc().starredPlugins??[]}function Nc(t){return Qo().includes(t)}function Pc(t){let e=Qo(),n=e.includes(t);return F.store.plugins.Settings={...F.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var ti=new M("PluginManager"),ae={},Ar=new Set;function Oc(t){if(ae[t.name]){ti.warn("Duplicate plugin",t.name);return}ae[t.name]=t,Ac(t.name,t.settings)}function Pn(t){let e=ae[t];if(!e)return!1;if(e.required)return!0;let n=F.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Bc(t){let e=ae[t];if(!e||e.required)return;let n=!Pn(t);Te(t),F.store.plugins[t].enabled=n,n?Dc(e):up(e),We("pluginToggle",{name:t,enabled:n})}function Dc(t,e=!1){if(!Ar.has(t.name)&&Pn(t.name))try{t.managedStyle&&yc(t.managedStyle),t.start?.(),Ar.add(t.name),t.settings&&F.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Ar.has(t.name)&&t.onSettingsChange?.()}),e||ti.debug("Started",t.name)}catch(n){ti.error("Failed to start",t.name,n)}}function up(t){if(Ar.has(t.name)){try{t.stop?.()}catch(e){ti.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(vc(t.managedStyle),L(t.managedStyle)),Ar.delete(t.name)}}function Hr(t){for(let e of Object.values(ae))(e.startAt??"DOMContentLoaded")===t&&Dc(e)}var Ir=!1,ei=!1,as=!1,_c=[],$c=[],Fc=[];function ss(t){let e=t.splice(0);for(let n of e)n()}function Rr(){Ir||(Ir=!0,ss(_c))}function ls(){ei||(ei=!0,Ir||Rr(),ss($c))}function zc(){as||(as=!0,Ir||Rr(),ei||ls(),ss(Fc))}function ni(t){Ir?t():_c.push(t)}function ri(t){ei?t():$c.push(t)}function oi(t){as?t():Fc.push(t)}function ii(){Rr()}function On(){Rr(),ls()}function ai(){zc()}function qc(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function jc(){await qc(4e3),Rr(),await qc(4e3),ls(),zc()}var S={p:"0-V-linuxdo"},xt="[20260924] v1.4.97",Gc="https://github.com/0-V-linuxdo/Bloom";var dp={BetterNavigator:1790254369e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790252301e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function Uc(t){let e=dp[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function fp(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function mp(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function cs(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Xe(){return cs()?fp()||mp():!1}function Kc(){return Xe()}var pp=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Vc=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),gp=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),bp="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Dn(t){return t.id==="bloom-root"||!!t.closest(bp)}function Wc(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function si(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function us(t){if(!(t instanceof HTMLElement)||!t.isConnected||Dn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&si(e)?!1:t.getClientRects().length>0}function Bn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function hp(){let t=[];for(let e of document.querySelectorAll(pp))!(e instanceof HTMLElement)||!e.isConnected||Dn(e)||t.push(e);return t}function li(t){if(!t.isConnected||Dn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Ze(){return hp().filter(li)[0]??null}function qn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Dn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function ds(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Dn(n)&&!Bn(n)&&n.parentElement&&!Bn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!Bn(r)&&!Dn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!Bn(r.parentElement))return r}return e}function _n(){let t=document.querySelectorAll(Vc);for(let n of t)if(us(n)&&!si(n)&&Wc(n))return n;let e=document.querySelectorAll(gp);for(let n of e){if(!us(n)||!Wc(n)||si(n))continue;let r=n.querySelector(Vc);return us(r)&&!si(r)?r:n}return null}function ci(){let t=Ze();if(t){let e=ds(t),n=e.parentElement;if(n&&!Bn(n))return n;if(!Bn(e))return e}return qn()}function ui(t){let e=Ze();return e?t.composedPath().includes(e):!1}var ms=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],yp={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function vp(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function xp(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function fs(t){let e=vp(t);return e?xp(e)>.55?"light":"dark":null}function Ep(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=fs(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=fs(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=fs(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function di(t){return t==="auto"?Ep():t}function wp(t){try{let e=getComputedStyle(document.documentElement);for(let n of ms){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function fi(t,e,n){let r=yp[e];if(n){wp(t);for(let o of ms)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of ms)t.style.setProperty(o,r[o])}function Yc(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var ps=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Tp="bloom-root",jt="bloom-rail-item",hi="bloom-account-item",Qe="bloom-sidebar-panel",Fr="bloom-plugin-dialog",Ti="bloom-plugin-layer",yi="bloom-settings-css",Lp=2e3,Jc=null,kp=null,Ce=!1,ys=[],mi=null,vi=null,ke=null,gi=null,se=null,qr=null,Nr,$n=0,_r=0,Pr=0,Or=null,Br=null,xi=null,Qc=null,Dr=null,gs=[],Ei=!1,Mp=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Cp=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Ap=new Set(["chat","ui","privacy"]),Hp=10080*60*1e3,Li="",$r="all",zt="all";function ki(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function tu(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Ip(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Rp(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Np(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Pp(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Op={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Bp(t){return t.icon||Op[t.name]||ki()}function bs(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),fi(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function eu(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function wi(){let t="auto",e=di(t);bs(Jc,e,!0);let n=document.getElementById(Qe);n instanceof HTMLElement&&bs(n,e,!0);let r=document.getElementById(Fr);r instanceof HTMLElement&&bs(r,e,!0);let o=document.getElementById(jt);o instanceof HTMLElement&&eu(o),We("schemeChange",{scheme:e,pref:t})}function nu(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function ru(){if(k("settings",ps),document.getElementById(yi)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=yi,t.textContent=ps,document.head.appendChild(t)}function Dp(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function qp(){for(let t of ys)t();ys=[]}function ou(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function _p(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Es(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function $p(t){return Es(t).length>0}function bi(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Fp(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=_p(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function zp(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Fp(e,n));let i=Te(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ys.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??bi(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??bi(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=ou(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??bi(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Xc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function jp(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=Te(t.name);for(let[n,r]of Es(t)){if(n==="enabled"||r.type===5)continue;let o=bi(r);o!==void 0&&(e[n]=o)}au(t)}function iu(t){t.key==="Escape"&&(!document.getElementById(Ti)&&!document.getElementById(Fr)||(t.stopPropagation(),Fn()))}function Gp(){Ei||(document.addEventListener("keydown",iu),Ei=!0)}function Up(){Ei&&(document.removeEventListener("keydown",iu),Ei=!1)}function Fn(){qp(),Up(),document.getElementById(Ti)?.remove(),document.getElementById(Fr)?.remove()}function au(t){if(Fn(),!document.body)return;let e=document.createElement("div");e.id=Ti,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Me),e.addEventListener("pointerup",Me),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Fn()});let n=document.createElement("div");n.id=Fr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Me),n.addEventListener("pointerup",Me),n.addEventListener("click",Me);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=tu(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Fn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Xc("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Xc("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Es(t);if(c.length)for(let[u,d]of c){let f=zp(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>jp(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Gp(),wi()}function Kp(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Bp(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Nc(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Np(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let g=Pc(t.name);We("pluginStar",{name:t.name,starred:g})}),s.appendChild(c),!t.required){let b=Ic(t.name),g=document.createElement("button");g.type="button",g.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,g.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),g.innerHTML=Pp(b),g.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();let h=Rc(t.name);We("pluginPin",{name:t.name,pinned:h})}),s.appendChild(g)}if($p(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=Rp(),b.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),au(t)}),s.appendChild(b)}let u=ou(t.name,Pn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{Bc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(p),e.append(n,f,m),e}function su(){return Object.values(ae).filter(t=>!t.hidden&&t.name!=="Settings")}function Vp(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Hp}function lu(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Vp(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Ap.has(r)):n.includes(e)}function Wp(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Yp(){return Li.trim()?"No plugins match your search.":zt==="favorites"?"No favorites yet. Star a plugin to see it here.":zt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Xp(){let t=su();return Cp.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>lu(n,e.id)))}function Zp(){if(Dr){Dr.replaceChildren();for(let t of Xp()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${zt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{zt=t.id,Je()}),Dr.appendChild(e)}}}function Jp(){let t=su();if(zt==="favorites"){let e=new Set(Qo());t=t.filter(n=>e.has(n.name))}else zt!=="all"&&(t=t.filter(e=>lu(e,zt)));return $r==="enabled"&&(t=t.filter(e=>Pn(e.name))),$r==="disabled"&&(t=t.filter(e=>!Pn(e.name))),t}function Je(){if(!Or)return;Zp();let t=Jp();xi&&(xi.placeholder=`Search ${t.length} plugins...`);let e=t,n=Li.trim().toLowerCase();if(n&&(e=e.filter(r=>Wp(r).includes(n))),zt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(zt!=="favorites"){let r=Jo();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Or.replaceChildren();for(let r of e)Or.appendChild(Kp(r));Br&&(Br.hidden=e.length>0,Br.textContent=Yp())}function Me(t){t.stopPropagation()}function hs(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function ws(){document.getElementById(jt)?.setAttribute("aria-expanded",Ce?"true":"false")}function Qp(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Ss(){Fn(),Li="",$r="all",zt="all",document.getElementById(Qe)?.remove(),Ce=!1,ws()}function tg(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Me),e.addEventListener("pointerup",Me),e.addEventListener("click",Me);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=ki();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Ip();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=tu(),d.addEventListener("click",Ss),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Li=p.value,Je()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let h of Mp){let x=document.createElement("option");x.value=h.value,x.textContent=h.label,b.appendChild(x)}b.value=$r,b.addEventListener("change",()=>{$r=b.value,Je()}),m.append(p,b),n.appendChild(m);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let E=document.createElement("p");return E.className="bloom-tab-empty",E.hidden=!0,n.appendChild(E),e.append(d,n),Or=g,Br=E,xi=p,Qc=b,Dr=f,Je(),e}function eg(t){t.classList.add("bloom-rail-dock")}function ng(){let t=document.getElementById(jt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&li(t)?t:null}function rg(){if(document.getElementById(Qe)?.remove(),!document.body)return;let t=tg(Qe);eg(t),document.body.appendChild(t),Ce=!0,Fn(),wi(),ws(),We("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:xt,dock:"center",rail:!!ng()})}function Ts(){let t=document.getElementById(Qe);if(t instanceof HTMLElement&&t.isConnected&&Qp(t)){Ss();return}t?.remove(),rg()}function og(){let t=document.createElement("button");return t.type="button",t.id=jt,t.className="bloom-rail-item",t.setAttribute("aria-controls",Qe),t.setAttribute("aria-expanded",Ce?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${ki()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ts()}),t}function Zc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function ig(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function ag(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Le(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function cu(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=ig(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Le(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Le(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Le(n,"width",l),Le(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Le(t,"padding-left",u);let d=ag(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),p=Math.round(f.left-m.right);p>=0&&p<=24&&Le(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Le(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Le(t,"gap",Math.round(l))}eu(t)}function vs(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function sg(){if(qr?.isConnected&&se){se.observe(qr,{childList:!0});return}xs()}function lg(t){if(vs(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function cg(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Pr=0;return}Pr+=1,_r=Date.now()+Math.min(8e3,250*2**Math.min(Pr,5))})}function ug(){$n||Date.now()<_r||($n=requestAnimationFrame(()=>{$n=0,!(Date.now()<_r)&&(document.getElementById(jt)?.isConnected||Si())}))}function Si(){if(!document.body)return;se?.disconnect();let t=null,e=!1;try{let n=document.getElementById(jt);t=n instanceof HTMLButtonElement?n:og();let r=Ze(),o=qn();if(r){let i=ds(r),a=i.parentElement;if(vs(i)||a&&vs(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Zc(t),cu(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Zc(t,!0)):t.isConnected&&!li(t)&&(t.remove(),t=null)}finally{cg(t,e),sg(),ws()}}function xs(){let t=ci();!t||!lg(t)||qr===t&&se||(se?.disconnect(),qr=t,se=new MutationObserver(()=>{document.getElementById(jt)?.isConnected||ug()}),se.observe(t,{childList:!0}))}function dg(){Si(),xs(),Nr===void 0&&(Nr=window.setInterval(()=>{let t=document.getElementById(jt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=_r&&Si();else{Pr=0;let e=Ze();e&&cu(t,e)}xs()},Lp))}function fg(){Nr!==void 0&&(clearInterval(Nr),Nr=void 0),$n&&cancelAnimationFrame($n),$n=0,_r=0,Pr=0,se?.disconnect(),se=null,qr=null}function mg(t){gi===t&&ke||(ke?.disconnect(),gi=t,ke=new MutationObserver(()=>{if(!t.isConnected){ke?.disconnect(),ke=null,gi=null;return}uu(t)}),ke.observe(t,{childList:!0}))}function uu(t){if(mg(t),t.querySelector(`#${hi}`))return;let e=document.createElement("button");e.type="button",e.id=hi,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${ki()}<span>Bloom++</span>`,e.addEventListener("pointerdown",hs),e.addEventListener("pointerup",hs),e.addEventListener("click",n=>{hs(n),Ts()}),t.insertBefore(e,t.firstChild)}function pi(){let t=_n();return t?(uu(t),!0):!1}function pg(t){ui(t)&&(queueMicrotask(pi),requestAnimationFrame(()=>{pi()}),window.setTimeout(pi,60),window.setTimeout(pi,180))}function gg(){vi?.abort();let t=new AbortController;vi=t,document.addEventListener("click",pg,{signal:t.signal})}function bg(){vi?.abort(),vi=null,ke?.disconnect(),ke=null,gi=null}function du(){On(),Dp(()=>{ru(),nu(),Si(),Ts()})}var fu=w({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Tp}`,`#${jt}`,`#${hi}`,`#${Qe}`,`#${Ti}`,`#${Fr}`,`#${yi}`,"#bloom-menu-panel"],start(){ru(),nu(),dg(),gg(),mi?.(),mi=Yc(wi),wi(),gs=[Nn("pluginToggle",()=>{Ce&&Je()}),Nn("pluginPin",()=>{Ce&&Je()}),Nn("pluginStar",()=>{Ce&&Je()})]},stop(){fg(),bg(),mi?.(),mi=null;for(let t of gs)t();gs=[],Ss(),document.getElementById(jt)?.remove(),document.getElementById(hi)?.remove(),document.getElementById(yi)?.remove(),Jc=null,kp=null,Or=null,Br=null,xi=null,Qc=null,Dr=null,Ce=!1}});var Mi='form[data-type="unified-composer"], form.w-full[data-type]',Gt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),zn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),mu=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),pu=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),hg=/stop streaming|stop generating|停止生成|停止输出|停止响应/,yg='[contenteditable="false"], button, [role="button"]';function Nt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function tn(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Nt(o)))return o;return null}function gu(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function z(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=gu(t);return!!(hg.test(n)||/^stop$/i.test(n))}function Pt(){let e=Array.from(document.querySelectorAll(Mi)).find(Nt);if(e instanceof HTMLElement)return e;let n=tn(document,Gt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function it(){let t=Array.from(document.querySelectorAll(Gt));return t.find(Nt)??t[0]??null}function vg(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(yg);return!!n&&n!==e&&e.contains(n)}function Ls(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&vg(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Ut(t){let e=t??it();return e?Ls(e,e).replaceAll("\u200B","").trim().length>0:!1}function Ae(t){return!Ut(t)}function Ci(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function bu(t){let e=Pt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Nt(n))&&t(n))return n;return null}function He(){let t=Pt(),e=tn(t,zn)??tn(document,zn);return e&&!z(e)?e:bu(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!z(n);let o=gu(n);return/^(send|send prompt|发送)$/i.test(o)&&!z(n)})}function en(){let t=Pt(),e=tn(t,mu,!0)??tn(document,mu,!0);if(e)return e;let n=tn(t,pu)??tn(document,pu);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Nt(r)&&z(r))return r}return bu(z)}function Kt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Ls(n,t)).join(`
`):Ls(t,t)}function ks(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function le(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),ks(t,n)}var hu=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Ot(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function ce(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ue(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(hu)?.[1]??""}catch{return t.match(hu)?.[1]??""}}function R(){return ue(location.pathname)}var Lu=new M("Harvest"),xg=1500,Eg=200,yu=480,wg=8,vu=80,Ai=new Set,Hi=new Map,Ii=new Map,Ri=new Map,xu=[],jn=null,Ni=null,zr=null,Vt=0;function Sg(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Tg(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Lg(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function ku(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var kg=/"action"\s*:\s*"(next|continue|variant)"/i;function Mg(t,e,n){return!(e!=="POST"||ku(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!kg.test(n))}function Cg(t,e){return e!=="GET"||ku(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Eu(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Mu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Ag(t){return typeof t=="string"?Mu(t):""}function Pi(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Pi(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Cs(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function wu(t,e,n){!t||!e||Ii.get(t)!==e&&(Ii.set(t,e),Cs(Ii,xg),de({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Hg(t,e){let n=e.trim();!t||!n||Hi.get(t)!==n&&(Hi.set(t,n),Cs(Hi,Eg),de({type:"conversation-meta",conversationId:t,title:n}))}function Su(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>vu?`${e.slice(0,vu-1)}\u2026`:e:""}function Ig(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=Su(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?Su(n.text):""}function Rg(t){let e=t.metadata;if(e&&typeof e=="object"&&!Array.isArray(e)&&e.is_visually_hidden_from_conversation===!0)return"";let n=t.author,r=n&&typeof n=="object"&&!Array.isArray(n)?n.role:t.role;return r==="user"||r==="assistant"?r:""}function Ng(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?Pi(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function Pg(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null,c=l?Rg(l):"",u=l&&typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:l?Ig(l):""};u!==o&&(d.alias=o),n.push(d)}o=typeof s.parent=="string"?s.parent:null}return n.reverse(),n}function Ms(t){return t.length<=yu?t:t.slice(t.length-yu)}function Og(t,e){if(!e.length)return t;if(!t.length)return Ms(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(b=>b.id)),m=n.has(e[e.length-1].id),p=e.filter(b=>!f.has(b.id));return Ms(m?[...p,...t]:[...t,...p])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return Ms([...s,...l,...u,...d])}function Bg(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}function Dg(t,e){if(!e||typeof e!="object"||Array.isArray(e))return;let n=e;!n.mapping&&n.conversation&&typeof n.conversation=="object"&&!Array.isArray(n.conversation)&&(n=n.conversation);let r=n.mapping;if(!r||typeof r!="object"||Array.isArray(r)||!(typeof n.current_node=="string"||typeof n.current_node_id=="string"||typeof n.currentNode=="string")&&typeof n.title!="string")return;let i=t||(typeof n.conversation_id=="string"?n.conversation_id:"")||(typeof n.conversationId=="string"?n.conversationId:"");if(!i)return;let a=r,s=Ng(n,a);if(!s)return;let l=Pg(a,s);if(!l.length)return;let c=Ri.get(i)??[],u=Og(c,l);Bg(c,u)||(Ri.set(i,u),Cs(Ri,wg),de({type:"conversation-chain",conversationId:i}))}function jr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)jr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Hg(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Pi(l.create_time??l.createTime??l.created_at);c&&u&&wu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Pi(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&wu(a,s,o),r.mapping&&typeof r.mapping=="object")jr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&jr(l,o,n+1)}function Tu(t,e){if(t)try{jr(JSON.parse(t),e)}catch{}}function de(t){for(let e of Array.from(Ai))try{e(t)}catch{}}async function qg(t,e,n){if(n===Vt)try{let r=await t.json();if(n!==Vt)return;jr(r,e),Dg(e,r)}catch{}}async function _g(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Vt&&de({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Vt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=Mu(c);m&&(o=m,de({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let p=m.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||Tu(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Vt&&Tu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Vt&&de({type:"post-end",conversationId:o,error:i})}function $g(t,e,n){let r=Tg(e),o=Lg(e,n),i=Cg(r,o),a=Mg(r,o,n?.body),s=Vt,l="";return a&&(l=Ag(n?.body)||Eu(r)||ue(r)||R(),de({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Vt||!i&&!a)return c;try{let u=c.clone();i?qg(u,Eu(r)||R(),s):_g(u,l,!c.ok,s)}catch{a&&de({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Vt&&de({type:"post-end",conversationId:l,error:!0}),c})}function Fg(){if(jn)return;let t=Sg();zr=t,jn=t.fetch.bind(t);let e=(n,r)=>$g(jn,n,r);Ni=e,t.fetch=e,Lu.debug("conversation fetch harvest hooked")}function zg(){Vt+=1,!(!jn||!zr)&&(Ni&&zr.fetch===Ni&&(zr.fetch=jn),jn=null,Ni=null,zr=null,Lu.debug("conversation fetch harvest unhooked"))}function Et(t){return Ai.add(t),Fg(),()=>{Ai.delete(t),Ai.size===0&&zg()}}function Gn(t){return t?Hi.get(t)??"":""}function Oi(t){return t?Ii.get(t)??null:null}function As(t){return t?Ri.get(t)??xu:xu}var Au=new M("Streaming");function Wr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Nt(e))&&(z(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function jg(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Nt(t))}function Gg(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Nt(t))}function Ug(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Yt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function V(){if(en()||Wr()||Ug())return!0;let t=He();return t&&Nt(t)&&!z(t)?!1:!!(jg()||Gg())}var Kg=400,Cu=3,an=new Set,Gr,Ur=null,Hs=null,rn=!1,nn=0,Re="",Ne="",Pe=!1,Kr=!1,Vr=!1,Wt=!1,J=null,wt="",on=!1;function j(){return Wt}function sn(){return Pe}function Un(){return wt}function Is(){return R()||wt}function Hu(){return ce(Ot())}function Bi(t,e){return{streaming:t,contextKey:e,conversationId:Is()}}function Rs(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Vg(t){return!t||t==="/"||t.startsWith("/g/")}function W(t,e){if(!t||t===e)return!1;let n=ue(Rs(e)||e);return!n||!(t.endsWith("|draft")||Vg(Rs(t)))?!1:wt?n===wt:on}function Di(){rn=!1,nn=0,Re="",Pe=!1,Kr=!1,Vr=!1,wt="",on=!1}function Wg(t){for(let e of Array.from(an))try{e.onFall?.(t)}catch{}}function Yg(t){for(let e of Array.from(an))try{e.onRise?.(t)}catch{}}function Ie(t){for(let e of Array.from(an))try{e.onTick?.(t)}catch{}}function Xg(t,e){for(let n of Array.from(an))try{n.onContext?.(t,e)}catch{}}function Zg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&z(n)&&(Pe=!0)}function Jg(t){if(t.type==="post-start"){let n=R();if(!t.conversationId){n||(on=!0),(!n||n===wt)&&(Wt=!1,Pe=!1);return}if(!(t.conversationId===n||t.conversationId===wt)&&!(!n&&on))return;wt=t.conversationId,on=!1,Wt=!1,Pe=!1;return}if(t.type!=="post-end"||!rn&&!J)return;let e=R();t.conversationId&&!(e?t.conversationId===e:t.conversationId===wt)||(Vr=!0,t.error&&(Kr=!0,J&&(J.error=!0)))}function Qg(){let t=Hu(),e=V();if(Ne&&t&&Ne!==t){let o=Ne;if(!W(o,t))J=null,Di(),Wt=e;else{let i=ue(Rs(t));if(i&&!wt&&(wt=i,on=!1),Re===o&&(Re=t),J&&J.contextKey===o){J.contextKey=t;let a=Is();a&&(J.conversationId=a)}Wt=!1}if(Ne=t,Xg(t,o),Wt){Ie(Bi(!1,t));return}}else t&&(Ne=t);if(Wt){if(e){Ie(Bi(!1,t));return}Wt=!1}if(J)if(e||J.contextKey!==t)J=null;else{let o=J;J=null,Di(),Wg(o),Ie(Bi(!1,t));return}let n=Bi(e,t);if(e){let o=!rn;o&&(Pe=!1,Kr=!1,Vr=!1),rn=!0,nn=0,Re=t,o&&Yg(n),Ie(n);return}if(!rn){Ie(n);return}if(nn+=1,Vr&&(nn=Math.max(nn,Cu)),nn<Cu){Ie(n);return}if(!(!!Re&&Re===t)){Di(),Ie(n);return}J={contextKey:Re||t,conversationId:Is(),userStopped:Pe,error:Kr||Yt()},Ie(n)}function tb(){Gr===void 0&&(rn=V(),Ne=Hu(),Re=rn?Ne:"",nn=0,Pe=!1,Kr=!1,Vr=!1,Wt=!1,J=null,wt="",on=!1,Ur?.abort(),Ur=new AbortController,document.addEventListener("click",Zg,{capture:!0,signal:Ur.signal}),Hs=Et(Jg),Gr=setInterval(Qg,Kg),Au.debug("watchStreamingEdge started"))}function eb(){an.size||(Gr!==void 0&&(clearInterval(Gr),Gr=void 0),Ur?.abort(),Ur=null,Hs?.(),Hs=null,Di(),Ne="",Wt=!1,J=null,Au.debug("watchStreamingEdge stopped"))}function ct(t){let e=typeof t=="function"?{onFall:t}:t;return an.add(e),tb(),()=>{an.delete(e),eb()}}var Iu="bloom-host-icon",Yr="data-bloom-host-rel",Ns="not all",Ps=0,Ru=0,nb=400;function Nu(t){Ps+=1;try{t()}finally{Ps-=1}}function qi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Oe(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Pu(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function rb(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function ob(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Ru<nb||(Ru=n,t.appendChild(e))}function ib(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||qi(n)&&(n.getAttribute(Yr)||n.setAttribute(Yr,n.rel),n.media!==Ns&&(n.media=Ns),n.rel!==Iu&&(n.rel=Iu))}function ab(t){for(let e of t.querySelectorAll(`link[${Yr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Yr);n&&(e.rel=n),e.removeAttribute(Yr),e.media===Ns&&e.removeAttribute("media")}}function Ou(t,e){let{head:n}=document;!n||!e||Nu(()=>{ib(n,t);let r=Pu(t),{type:o,sizes:i}=rb(e);r?ob(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Bu(t,e){let{head:n}=document;n&&Nu(()=>{Pu(t)?.remove(),ab(n)})}function Du(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(Ps)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:qi(c.target)&&(a=!0,Oe(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)qi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)qi(u)&&u.id!==t&&(a=!0,Oe(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var sb=["original","badge","dot","hole","bg"],$u=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Fu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},_i="#FCFCFC",lb="#111111",qu="#111111",cb="#ffffff",ub="#212121",db="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",fb={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},$i=32,_u=64;function zu(t){return typeof t=="string"&&sb.includes(t)}function mb(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Fi(t){let e=document.createElement("canvas");e.width=$i,e.height=$i;let n=e.getContext("2d");return n?(n.scale($i/_u,$i/_u),t(n),e.toDataURL("image/png")):""}function pb(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function zi(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(db);n&&(t.strokeStyle=lb,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function gb(t,e,n){let r=Fu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=qu,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=qu,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=cb,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Xr(t,e){if(t==="original")return e==="wait"?Fi(r=>zi(r,_i)):mb(fb[e]);let n=e==="wait"?void 0:Fu[e];return Fi(t==="hole"?r=>zi(r,n??_i):t==="bg"?r=>{r.fillStyle=n??ub,pb(r,0,0,64,64,14),r.fill(),zi(r,_i,!1)}:r=>{zi(r,_i),e!=="wait"&&gb(r,e,t==="dot"?"dot":"badge")})}function ju(t){return{wait:Xr(t,"wait"),rotate:Xr(t,"rotate"),done:Xr(t,"done"),ready:Xr(t,"ready"),error:Xr(t,"error")}}var bb=new M("ChatStateFavicons"),cn="bloom-chat-state-favicon",Wu=["input","beforeinput","cut","paste","compositionend"],Yu=C({style:{type:3,description:"Favicon overlay",options:$u}}),Xt="",Ds={wait:"",rotate:"",done:"",ready:"",error:""},Zr="wait",ut=!1,Q=!1,D=null,gt="",St="",dn=!0,Ui=!1,Kn=null,Tt=0,ji=null,Gi=null,ln=null,Bs=null,Vn=null,Bt=!1,Gu=new WeakSet;function hb(){let t=Yu.store.style;return zu(t)?t:"bg"}function Xu(){let e=document.querySelector(`link[rel~="icon"]:not(#${cn}), link[data-bloom-host-rel]:not(#${cn})`)?.href;return Oe(e)?e:Oe(Xt)?Xt:""}function yb(){let t=document.getElementById(cn);return t instanceof HTMLLinkElement?t:null}function vb(){if(!Oe(Xt)){let t=Xu();t&&(Xt=t)}return Oe(Xt)?Xt:Ds.wait}function Zu(t){return t==="wait"?vb():Ds[t]}function Ju(){Ou(cn,Zu(Zr))}function _(t){let e=Zu(t);if(Zr===t){let n=yb();if(n&&n.getAttribute("href")===e)return}Zr=t,Ju()}function Uu(){Ds=ju(hb()),_(Zr)}function qs(){return ce(Ot())}function _s(t,e){!t||!e||t===e||(D===t&&(D=e),gt===t&&(gt=e),St===t&&(St=e))}function xb(){let t=qs();if(!(V()||ut||Q))return gt="",t;if(gt&&t&&gt!==t)if(W(gt,t))_s(gt,t),gt=t;else return gt="",t;else!gt&&t&&(gt=t);return gt||t}function Ku(t){return!D||!t?!1:D===t?!0:W(D,t)}function Qu(){ut=!1,Q=!1,D=null,gt=""}function td(t){St=t,Qu(),dn=!1,Ui=!0,_("wait")}function Os(t){return!t&&dn}function Eb(){if(!Bt)return;let t=qs();if(St&&t&&St!==t&&!W(St,t)){td(t);return}St&&t&&W(St,t)&&_s(St,t),t&&(St=t);let e=V(),n=e&&!j();if(Ui){if(j()){_("wait");return}Ui=!1}if(j()){_("wait");return}let r=xb(),o=Ae();if(sn()&&!e){ut=!1,Q=!1,D=null,_(o?"wait":Os(o)?"ready":"wait");return}if(Yt()&&!e&&ut){_("error"),ut=!1,Q=!1,D=null;return}if(n){ut||(dn=!1),ut=!0,Q=!1,D=r,_("rotate");return}if(ut)if(!Ku(t))ut=!1,Q=!1,D=null;else if(Q){ut=!1,Q=!0,D=t||r,_("done");return}else{_("rotate");return}if(Q)if(D&&t&&!Ku(t))Q=!1,D=null;else if(o){D=r||D,_("done");return}else if(Os(o)){Q=!1,_("ready");return}else{Q=!1,_("wait");return}D=null,o?_("wait"):Os(o)?_("ready"):_("wait")}function un(){Bt&&(id(),nd(),rd(),Eb())}function ed(){if(Vn){for(let t of Wu)Vn.removeEventListener(t,od,!0);Vn=null}}function nd(){let t=Pt(),e=t&&t!==document.body?t:null;if(!(Vn===e&&e?.isConnected)&&(ed(),!!e)){Vn=e;for(let n of Wu)Vn.addEventListener(n,od,{capture:!0,passive:!0})}}function rd(){let t=Pt();if(!(ln&&Bs===t&&t.isConnected)){if(ln?.disconnect(),Bs=t,!t||t===document.body){ln=null;return}ln=new MutationObserver(()=>Ki()),ln.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Ki(){if(Bt){if(document.hidden){Tt&&(cancelAnimationFrame(Tt),Tt=0),un();return}Tt||(Tt=requestAnimationFrame(()=>{Tt=0,Bt&&un()}))}}function od(){Ut()&&(dn=!0),Ki()}function Vu(){Ut()&&(dn=!0),Ki()}function wb(){Bt&&(Tt&&(cancelAnimationFrame(Tt),Tt=0),un())}function Sb(){Bt&&(dn=!1,un())}function Tb(t){if(!Bt)return;if(t.userStopped){ut=!1,Q=!1,D=null,_("wait");return}if(t.error){ut=!1,Q=!1,D=null,_("error");return}let e=qs();if(t.contextKey&&e&&t.contextKey!==e&&!W(t.contextKey,e)){ut=!1,Q=!1,D=null,_("wait");return}ut=!1,Q=!0,D=e||t.contextKey,_("done")}function Lb(){Bt&&un()}function kb(t,e){if(Bt){if(W(e,t)){_s(e,t),St=t,un();return}td(t)}}function id(){let t=it();!t||Gu.has(t)||(Gu.add(t),t.addEventListener("input",Vu,{capture:!0,passive:!0}),t.addEventListener("compositionend",Vu,{capture:!0,passive:!0}))}var ad=w({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Yu,startAt:"DOMContentLoaded",cleanupSelectors:[`#${cn}`],start(){Bt=!0,Xt=Xu()||Xt,Uu(),Gi?.disconnect(),Gi=Du(cn,t=>{Oe(t)&&(Xt=t),Ju()}),Kn?.abort(),Kn=new AbortController,window.addEventListener("popstate",Ki,{signal:Kn.signal}),document.addEventListener("visibilitychange",wb,{signal:Kn.signal}),id(),nd(),rd(),ji?.(),ji=ct({onRise:Sb,onFall:Tb,onTick:Lb,onContext:kb}),un(),bb.debug("favicon watch started")},stop(){Bt=!1,Tt&&cancelAnimationFrame(Tt),Tt=0,ji?.(),ji=null,Kn?.abort(),Kn=null,ed(),ln?.disconnect(),ln=null,Bs=null,Gi?.disconnect(),Gi=null,Qu(),St="",dn=!0,Ui=!1,Zr="wait",Bu(cn,Xt)},onSettingsChange:Uu});var sd=`.bloom-ih-hud {
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
`;var WE=new M("InputHistory"),$s=/\u200B/g,ld=10,cd=500,ud=100,Cb=8,Ab=120,Hb=2e3,Vi=10,Wi=C({maxEntries:{type:4,description:"Max stored prompts",min:ld,max:cd,default:ud},history:{type:5,description:"Stored prompts",render:Ub},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Fs=new Map,tt=0,zs="",Zt=!1,Qr=!1,Us=0,Jr=null,js,Ks=null,dd=!0;function Dt(){let t=Wi.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function fd(t){let e=ot(Number(Wi.store.maxEntries??ud),ld,cd);return t.length>e?t.slice(t.length-e):t}function Yi(t){Wi.store.entries=fd(t)}function Ib(t){return t.replaceAll($s,"").replace(/\n$/,"").trim()}function Gs(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Gt);return n instanceof HTMLElement?n:it()}function Rb(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Kt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll($s,"").trim().length===0,last:i.toString().replaceAll($s,"").trim().length===0}}catch{return{first:!0,last:!0}}}function md(t){clearTimeout(js),js=setTimeout(()=>{if(t!==Us)return;Qr=!1;let e=Ks;e&&ks(e,dd)},Ab)}function pd(t,e,n){Qr=!0,Ks=t,dd=n;let r=++Us;le(t,e,n),md(r)}function Nb(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Wn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Pb(){document.querySelector(".bloom-ih-hud")?.remove()}function Ob(t,e){let n=Nb();n.textContent=t;let r=(e.closest("form")??Pt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Cb)}px`,n.classList.add("bloom-ih-hud-on")}function Vs(t){let e=Ib(t);if(!e)return;let n=Date.now(),r=Fs.get(e);if(r&&n-r<Hb)return;Fs.set(e,n);let o=Dt().filter(i=>i!==e);o.push(e),Yi(o),tt=Dt().length,Zt=!1,Wn()}function Bb(t,e){let n=Dt();if(!n.length&&t)return;tt>=n.length&&(zs=Kt(e),tt=n.length);let r=t?tt-1:tt+1;r<0||r>n.length||(tt=r,Zt=!0,pd(e,r===n.length?zs:n[r],t),r<n.length?Ob(`${r+1} / ${n.length}`,e):Wn())}function Db(t){Zt=!1,Wn(),pd(t,zs,!1),tt=Dt().length}function qb(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Gs(t.target)??Gs(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Zt&&!t.altKey&&!t.shiftKey){Db(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){Vs(Kt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=Dt();if(!r){let i=Rb(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||tt<=0)||!n&&tt>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Bb(n,e))}function _b(t){if(Gs(t.target)){if(Qr){md(Us);return}Zt&&(Zt=!1,Wn(),tt=Dt().length)}}function $b(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Gt);n instanceof HTMLElement&&Vs(Kt(n))}function Fb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(zn);if(!n||!(n instanceof HTMLElement)||z(n))return;let r=it();r&&Vs(Kt(r))}function zb(t){if(!(!Zt||Qr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Zt=!1,Wn()}}function jb(){if(Jr)return;Jr=new AbortController;let{signal:t}=Jr,e={capture:!0,signal:t};window.addEventListener("keydown",qb,e),window.addEventListener("input",_b,e),window.addEventListener("submit",$b,e),window.addEventListener("click",Fb,e),window.addEventListener("pointerdown",zb,e)}function Gb(t){let e=Dt().slice();e.splice(t,1),Yi(e),tt>e.length&&(tt=e.length)}function Ub(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=Dt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Vi));n>=l&&(n=l-1);let c=s.slice(n*Vi,n*Vi+Vi);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((E,h)=>{let x=i.indexOf(E),ft=Dt().length-1-x,mt=document.createElement("div");mt.className="bloom-ih-item";let Z=document.createElement("button");Z.type="button",Z.className=`bloom-ih-body${r===h?"":" bloom-ih-clamp"}`,Z.textContent=E,Z.addEventListener("click",()=>{r=r===h?-1:h,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let lt=document.createElement("button");lt.type="button",lt.title="Copy",lt.textContent="C",lt.addEventListener("click",()=>{Tc(E)});let yt=document.createElement("button");yt.type="button",yt.title="Delete",yt.textContent="\xD7",yt.addEventListener("click",()=>{Gb(ft),o()}),O.append(lt,yt),mt.append(Z,O),g.appendChild(mt)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Yi([]),tt=0,o())}),d.append(f,m,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var gd=w({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Wi,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",sd),tt=Dt().length,Zt=!1,jb()},stop(){Jr?.abort(),Jr=null,Wn(),Pb(),Fs.clear(),clearTimeout(js),Qr=!1,Ks=null,Zt=!1},onSettingsChange(){let t=Dt(),e=fd(t);e.length!==t.length&&Yi(e),tt>e.length&&(tt=e.length)}});var Ws="noShareLink",Kb=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Vb=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Ys=C({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function bd(t){return`${t.join(",")}{display:none!important}`}function hd(){let t=[];if(Ys.store.hideShareChat!==!1&&t.push(bd(Kb)),Ys.store.hideShareProject!==!1&&t.push(bd(Vb)),!t.length){L(Ws);return}k(Ws,t.join(`
`))}var yd=w({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Ys,start:hd,onSettingsChange:hd,stop(){L(Ws)}});var Ed="noDictation",Wb=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Yb=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],wd=C({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function vd(t){return`${t.join(",")}{display:none!important}`}function xd(){let t=[vd(Wb)];wd.store.hideDictationSettings!==!1&&t.push(vd(Yb)),k(Ed,t.join(`
`))}var Sd=w({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:wd,start:xd,onSettingsChange:xd,stop(){L(Ed)}});var Xs="noSidebarIdentity",Yn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],kd=Yn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),Md=Yn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Xb=[...kd,...Md],Zb=[...kd,...Yn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Jb=Yn.map(t=>`${t} a[href^="mailto:"]`),Qb=Yn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),th=Yn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),to=C({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Td(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function eh(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function nh(){return`${th.join(",")}{margin-block:auto!important}`}function rh(){return`${Qb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Ld(){let t=to.store.hideUsername!==!1,e=to.store.hideEmail!==!1,n=t&&to.store.enlargePlan!==!1,r=t&&to.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(eh([...Zb,...Md])),o.push(nh())):o.push(Td(Xb))),e&&o.push(Td(Jb)),n&&o.push(rh()),!o.length){L(Xs);return}k(Xs,o.join(`
`))}var Cd=w({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:to,start:Ld,onSettingsChange:Ld,stop(){L(Xs)}});var Ad=`#bloom-rt-host {
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
`;var Rd=new M("RecentTopics"),Jn="bloom-rt-host",Nd="home",Pd=/^\/c\/([a-z0-9_-]{8,})/i,ih=/\/c\/([a-z0-9_-]{8,})/i,Od=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,ah=new Set(["Backquote","IntlBackslash"]),sh=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),lh=140,ch=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),et=C({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:ch},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Xi=null,Zi=null,bt=!1,ao=!1,eo=!1,Jt=0,fn="",Xn=null,no=null,Zn,Zs=null,Js=null;function uh(){let t=Number(et.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function ro(){let t=et.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function tl(){let t=et.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Bd(){let t=et.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function el(){let t=et.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Qi(t){let e=uh();return t.length>e?t.slice(0,e):t}function Qt(t){return t===Nd}function oo(t,e=lh){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function nl(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Pd)?.[1]??""}catch{return t.match(ih)?.[1]??""}}function mn(){let t=(location.pathname||"/").match(Pd);if(t?.[1])return t[1];let n=Ot().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Nd}function rl(t){if(Qt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(nl(r.getAttribute("href")||"")!==t)continue;let o=oo(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return mn()===t&&e&&!/^ChatGPT$/i.test(e)?oo(e,80):""}function dh(t){if(Qt(t))return"New chat";let e=tl()[t];if(e)return e;let n=Gn(t);return n||rl(t)||"Chat"}function fh(t){return el()[t]||""}function mh(t){return Bd()[t]||{}}function ol(t,e){if(!t||Qt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=tl();n[t]!==e&&(n[t]=e,et.store.titles=n)}function ph(t){t.type==="conversation-meta"&&(ol(t.conversationId,t.title),bt&&Qn())}function gh(t,e){if(!t||Qt(t)||!e)return;let n=el();n[t]!==e&&(n[t]=e,et.store.projects=n)}function bh(t,e){if(!t||Qt(t)||!e.user&&!e.assistant)return;let n=Bd(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,et.store.previews=n)}function il(t){if(!t||Qt(t)&&et.store.includeHome===!1)return;let e=ro().filter(n=>n!==t);e.unshift(t),et.store.visits=Qi(e)}function ta(){let t=et.store.includeHome!==!1;return Qi(ro().filter(n=>t||!Qt(n))).map(n=>({id:n,title:dh(n),project:fh(n),preview:mh(n)}))}function Hd(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return oo(o)}catch{return""}}function io(t){if(!t||Qt(t)||t!==mn())return;let e=rl(t);e&&ol(t,e);let n=Hd("user"),r=Hd("assistant");bh(t,{user:n,assistant:r});let o=qd(t);if(o){let i=Dd(o);i&&gh(t,i)}}function al(){let t=tl(),e=el(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Jn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=nl(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=oo(c.textContent||"",80);d&&!Od.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Dd(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(et.store.titles=t),i&&(et.store.projects=e);let a=ro(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(et.store.visits=Qi([...a,...l]))}function Dd(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=oo((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Od.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function qd(t){if(Qt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(nl(e.getAttribute("href")||"")===t)return e}catch{}return null}function hh(t){let e=qd(t);if(e){e.click();return}if(Qt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function yh(){let t=mn();fn&&fn!==t&&io(fn),fn=t,il(t),al();let e=rl(t);e&&ol(t,e),io(t)}function Ji(){Zn===void 0&&(Zn=window.setTimeout(()=>{Zn=void 0,yh()},120))}function vh(){Xn||(Xn=history.pushState.bind(history),no=history.replaceState.bind(history),history.pushState=function(...e){let n=Xn(...e);return Ji(),n},history.replaceState=function(...e){let n=no(...e);return Ji(),n})}function xh(){Xn&&(history.pushState=Xn),no&&(history.replaceState=no),Xn=null,no=null}function Eh(t){return ah.has(t.code)||t.keyCode===192?!0:sh.has(t.key)}function _d(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function wh(t,e){ao=e,al(),io(mn()),bt=!0,Jt=0;try{let n=mn();il(n);let r=ta();r.length>1&&(Jt=t?r.length-1:1)}catch(n){Rd.error("Failed to open switcher:",n)}Qn()}function Id(t){let{length:e}=ta();e&&(Jt=(Jt+(t?-1:1)+e)%e,Qn())}function sl(){if(!bt)return;let t=ta()[Jt];bt=!1,ao=!1,Qn(),t&&hh(t.id)}function $d(){bt&&(bt=!1,ao=!1,Qn())}function Sh(t){if(_d(t)){eo=!0;return}if((t.ctrlKey||eo)&&!t.altKey&&!t.metaKey&&Eh(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{bt?Id(t.shiftKey):wh(t.shiftKey,!0)}catch(n){Rd.error("Hotkey failed:",n)}return}if(bt){if(t.key==="Escape"){t.preventDefault(),$d();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),sl();return}t.key==="Tab"&&(t.ctrlKey||eo)&&(t.preventDefault(),Id(t.shiftKey))}}function Th(t){_d(t)&&(eo=!1,bt&&ao&&sl())}function Lh(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Ji)}function kh(t){!bt||(t.target instanceof Element?t.target:null)?.closest(`#${Jn}`)||$d()}function Mh(){document.visibilityState==="hidden"&&io(mn())}function Qs(t=Zi){t instanceof HTMLElement&&fi(t,di("auto"),!0)}function Ch(){if(!document.body)return null;let t=document.getElementById(Jn);if(t instanceof HTMLElement)return Zi=t,Qs(t),t;t=document.createElement("div"),t.id=Jn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),Zi=t,Qs(t),t}function Qn(){let t=Ch();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!bt){e.dataset.visible="false",e.replaceChildren();return}let n=ta();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Jt>=n.length&&(Jt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Jt?"true":"false",s.setAttribute("aria-selected",a===Jt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Jt=a,sl()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Ah(){document.getElementById(Jn)?.remove(),Zi=null}var Fd=w({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Jn}`],settings:et,start(){k("recentTopics",Ad),fn=mn(),il(fn),al(),io(fn),Zs=Et(ph),vh(),Xi=new AbortController;let{signal:t}=Xi;window.addEventListener("keydown",Sh,{capture:!0,signal:t}),window.addEventListener("keyup",Th,{capture:!0,signal:t}),window.addEventListener("popstate",Ji,{signal:t}),document.addEventListener("click",Lh,{capture:!0,signal:t}),document.addEventListener("click",kh,{signal:t}),document.addEventListener("visibilitychange",Mh,{signal:t}),Js=Nn("schemeChange",()=>Qs())},stop(){Xi?.abort(),Xi=null,Zn!==void 0&&(clearTimeout(Zn),Zn=void 0),xh(),Zs?.(),Zs=null,Js?.(),Js=null,bt=!1,ao=!1,eo=!1,Ah()},onSettingsChange(){let t=Qi(ro());t.length!==ro().length&&(et.store.visits=t),bt&&Qn()}});var ll="cleaner",Hh=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Ih=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Rh=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Nh=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Ph=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Oh=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],pn=C({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function tr(t){return`${t.join(",")}{display:none!important}`}function zd(){let t=[];if(pn.store.hideDownloadApps!==!1&&t.push(tr(Hh)),pn.store.hideDisclaimer!==!1&&t.push(tr(Ih)),pn.store.hideUpgrade!==!1&&t.push(tr(Rh)),pn.store.hideLockedModels!==!1&&t.push(tr(Nh)),pn.store.hideHomePromo!==!1&&t.push(tr(Ph)),pn.store.hideAds!==!1&&t.push(tr(Oh)),!t.length){L(ll);return}k(ll,t.join(`
`))}var jd=w({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:pn,start:zd,onSettingsChange:zd,stop(){L(ll)}});var na=new M("ResponseNotification"),nr=C({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:zh},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),cl=!1,ea=null,er=null,so=null;function Bh(){return document.visibilityState==="hidden"||document.hidden}function Dh(){return nr.store.onlyWhenHidden===!1?!0:Bh()}function qh(){let t=Gn(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Gd(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!er||er.state==="closed")&&(er=new t);let e=er,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){na.debug("chime failed",t)}}function _h(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){na.debug("custom sound failed",e),Gd()}}function Ud(){let t=String(nr.store.soundUrl||"").trim();t?_h(t):Gd()}function $h(){let t="Bloom++",e=`${qh()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){na.debug("notification failed",n)}}function Fh(){Dh()&&(nr.store.sound!==!1&&Ud(),nr.store.browserNotification!==!1&&$h())}function zh(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Ud()),t.appendChild(e),()=>{e.remove()}}var Kd=w({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:nr,start(){cl=!0,ea?.(),ea=ct(t=>{if(!cl||t.userStopped||t.error)return;let e=R()||Un();t.conversationId&&t.conversationId!==e||Fh()}),so?.abort(),so=new AbortController,nr.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:so.signal}),na.debug("watch started")},stop(){cl=!1,ea?.(),ea=null,so?.abort(),so=null;try{er?.close()}catch{}er=null}});var Vd=`#bloom-pq-chip {
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
`;var $e=new M("PromptQueue"),sa="bloom-pq-chip",Wd="promptQueue",Gh=8,Uh=50,Kh=2e3,Vh='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',Wh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,Yh=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),ul=C({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),qe=new Map,Yd=0,_t=!1,qt="",P="",te=!1,ht=!1,ze=!1,B=null,lo=null,ra=null,De,po,Fe=null,N=null,rr=null,ia=!1,at=null,gn,_e=!0,U=!1,G=!1,dt=!1;function fe(){return ce(Ot())}function or(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function Xh(t){let e=or(Kt(t));if(e)return e;if(!Ut(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),or(n.innerText||n.textContent||"")}catch{return""}}function nf(){try{let t=document.querySelectorAll(Vh),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function rf(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function of(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&Wh.test(n))return!0}}catch{}return!1}function aa(){let t=Un();if(!t)return!1;let e=R();return!e||e===t}function mo(){if(V()||aa())return!1;let t=nf();if(!t)return!0;if(rf(t)||of(t))return!1;try{if(t.querySelector(Yh)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function Zh(){if(j()||sn())return U=!1,!1;if(V()||aa())return U=!0,!0;let t=nf();return t&&(rf(t)||of(t))?(U=!0,!0):U&&!mo()?!0:(U=!1,!1)}function af(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Gt);return n instanceof HTMLElement?n:null}function Xd(t){return af(t)??it()}function la(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function sf(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Jh(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?or(e.innerText||e.textContent||""):""}catch{return""}}function Qh(){return Yd+=1,`pq${Date.now().toString(36)}${Yd.toString(36)}`}function Y(t){return qe.get(t)??[]}function lf(t){return Y(t)[0]}function bn(t,e){e.length?qe.set(t,e):qe.delete(t)}function cf(t){if(!Y(t).length){G=!1,dt=!1,P="";return}G=!0,dt=!1,U=!0,P=""}function Zd(t){if(!qt||qt===t)return;let e=qe.get(qt);!e?.length||qe.has(t)||W(qt,t)&&(qe.delete(qt),qe.set(t,e),P===qt&&(P=t),B?.key===qt&&(B.key=t),$e.debug("migrated pending",qt,"\u2192",t))}function ca(t){let e=fe(),n=Y(e);if(ul.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),bn(e,n)}else if(n.length>=Gh){$e.debug("queue full",e);return}else n.push({id:Qh(),text:t,at:Date.now()}),bn(e,n);U=!0,B={key:e,text:t,turns:sf(),ticks:3};let r=it();r&&le(r,"");try{st()}catch(o){$e.error("chip",o)}$e.debug("queued",e,n.length,t.length)}function uf(t,e){let n=Y(t).filter(r=>r.id!==e);if(bn(t,n),N===e&&(N=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}st()}function ml(){rr?.abort(),rr=null}function t0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function Jd(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function e0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||N||at)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;rr?.abort();let c=new AbortController;rr=c;let{signal:u}=c,d=!1,f=!1,m=0,p=0,b=0,g=0,E=null,h=[],x=[],ft=()=>{e.classList.add("bloom-pq-settling");for(let y of h)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},mt=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(E?.isConnected?E.before(t):e.append(t)),E?.remove(),E=null,ft(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},Z=()=>{ia=!0;let y=A=>{A.preventDefault(),A.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{ia=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=Jd(h.length,m,p),A=x.length>1?(x[x.length-1].top-x[0].top-x.slice(0,-1).reduce((H,Ft)=>H+Ft.height,0))/(x.length-1):2,pt=new Array(x.length),vt=x[0]?.top??0;for(let H of y)pt[H]=vt,vt+=x[H].height+A;for(let H=0;H<h.length;H++){if(H===m)continue;let Ft=pt[H]-x[H].top;h[H].style.transform=Math.abs(Ft)<.5?"":`translate3d(0,${Math.round(Ft)}px,0)`}},lt=()=>{let y=Y(n).slice();if(m<0||m>=y.length)return;let A=Jd(y.length,m,p);if(A.every((H,Ft)=>H===Ft))return;let pt=A.map(H=>y[H]).filter(Boolean);if(pt.length!==y.length)return;bn(n,pt);let vt=new Map(h.map(H=>[H.dataset.pqId||"",H]));for(let H of pt){let Ft=vt.get(H.id);Ft&&e.append(Ft)}},yt=y=>{if(f)return;f=!0;let A=d;rr===c&&(rr=null),A&&y&&t.isConnected&&lt(),mt(),A&&Z(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;mt(),y&&Z()});let Ko=()=>{d=!0,h.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=h.indexOf(t),m<0&&(m=h.findIndex(H=>H.dataset.pqId===r)),p=m<0?0:m;let y=t.getBoundingClientRect();b=y.left,g=y.top;let A=getComputedStyle(t);E=document.createElement("div"),E.className="bloom-pq-gap",E.style.height=`${y.height}px`,t.before(E),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=A.color,t.style.font=A.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let pt=e.getBoundingClientRect(),vt=e.scrollTop;x=h.map(H=>{let ts=(H===t?E:H).getBoundingClientRect(),bc=ts.top-pt.top+vt;return{top:bc,height:ts.height,mid:bc+ts.height/2}})},v=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(Ko(),!d||m<0)))return;y.preventDefault(),t.style.left=`${b+(y.clientX-s)}px`,t.style.top=`${g+(y.clientY-l)}px`;let A=e.getBoundingClientRect(),pt=y.clientY-A.top+e.scrollTop,vt=t0(pt,x.map(H=>H.mid));vt!==p&&(p=vt,O())},I=y=>{y.pointerId===a&&yt(!0)};window.addEventListener("pointermove",v,{signal:u}),window.addEventListener("pointerup",I,{signal:u}),window.addEventListener("pointercancel",()=>yt(!1),{signal:u})})}function n0(){ht=!0,clearTimeout(po),po=setTimeout(()=>{ht=!1,po=void 0},Kh)}function r0(t){if(at)return;let e=fe(),n=Y(e).find(i=>i.id===t);if(!n)return;let r=it();if(!r)return;let o=n.text;at=t,N===t&&(N=null),ml(),st(),clearTimeout(gn),gn=setTimeout(()=>{if(gn=void 0,!_t||at!==t)return;if(at=null,fe()!==e||!Y(e).some(a=>a.id===t)){st();return}bn(e,Y(e).filter(a=>a.id!==t)),st(),n0(),le(r,o);let i=He();i&&!z(i)&&!Ci(i)&&(i.click(),ht=!1),cf(e)},160)}function co(t){if(!_t||te||G||at||V()||fe()!==t)return;let e=lf(t);if(!e){P="";return}if(Yt())return;let n=it();if(!n)return;if(!Ae(n)){let o=or(Kt(n));if(o&&o!==e.text)return}let r=He();!r||z(r)||Ci(r)||(te=!0,le(n,e.text),clearTimeout(De),De=setTimeout(()=>o0(t,e.id,e.text),Uh))}function o0(t,e,n){De=void 0;try{if(!_t||G||at)return;let r=lf(t);if(!r||r.id!==e||r.text!==n||V()||fe()!==t)return;let o=it();if(!o)return;let i=or(Kt(o));if(i&&i!==n&&!Ae(o))return;i!==n&&le(o,n);let a=He();if(!a||z(a)||Ci(a))return;a.click(),bn(t,Y(t).filter(s=>s.id!==e)),st(),cf(t),$e.debug("drained",t,Y(t).length)}finally{te=!1}}function dl(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Pt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function fl(){ml(),Fe?.remove(),Fe=null,N=null,_e=!0}var df="http://www.w3.org/2000/svg";function i0(){let t=document.createElementNS(df,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function uo(t){let e=i0();for(let n of t){let r=document.createElementNS(df,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function fo(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&ff(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function a0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${sa}`)}function oa(){let t=Fe?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function s0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function Be(t,e){if(N!==t)return;if(N=null,e===null){st();return}let n=or(e),r=fe();if(!n){uf(r,t);return}let o=Y(r).find(i=>i.id===t);o&&(o.text=n),st()}function Qd(t){at||N!==t&&(N&&Be(N,oa()),Y(fe()).some(e=>e.id===t)&&(N=t,_e=!0,st()))}function ff(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function tf(t){return N===t?"edit":at===t?"send":"text"}function l0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function c0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||l0(l)!==tf(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",_e?"true":"false"),n.hidden=!_e;for(let s of e){let l=a.get(s.id);if(tf(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function st(){if(ml(),!_t||!document.body){fl();return}let t=fe(),e=Y(t);if(!e.length){fl();return}N&&!e.some(d=>d.id===N)&&(N=null),at&&!e.some(d=>d.id===at)&&(at=null);let n=Fe;if(n?.isConnected||(n=document.createElement("div"),n.id=sa,document.body.appendChild(n),Fe=n),c0(n,e)){dl(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",_e?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),_e=!_e,st()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",_e||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=N===d.id,p=at===d.id;m||(f.setAttribute("role","button"),f.tabIndex=p?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),p&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let b=document.createElement("div");b.className="bloom-pq-body";let g;if(m){let h=document.createElement("textarea");h.className="bloom-pq-text bloom-pq-editing",h.value=d.text,h.rows=2,h.spellcheck=!1,h.setAttribute("aria-label","Queued message text"),h.addEventListener("keydown",x=>{x.stopPropagation(),x.key==="Enter"&&!x.shiftKey?(x.preventDefault(),Be(d.id,h.value)):x.key==="Escape"&&(x.preventDefault(),Be(d.id,null))}),h.addEventListener("blur",()=>Be(d.id,h.value)),g=h,u=h}else{let h=document.createElement("span");h.className="bloom-pq-text line-clamp-2",h.textContent=p?"Sending":d.text,p?ff(h,l,"Sending now"):h.addEventListener("click",x=>{if(ia){ia=!1,x.preventDefault(),x.stopPropagation();return}x.preventDefault(),x.stopPropagation(),Qd(d.id)}),g=h}b.append(g),f.append(b);let E=document.createElement("div");if(E.className="bloom-pq-rail",m){let h=fo("Save",uo(["M20 6 9 17l-5-5"]),()=>{Be(d.id,g instanceof HTMLTextAreaElement?g.value:oa())},l),x=fo("Cancel",uo(["M18 6 6 18","m6 6 12 12"]),()=>{Be(d.id,null)},l);E.append(h,x)}else{let h=fo("Remove from queue",uo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{N&&N!==d.id&&Be(N,oa()),N=N===d.id?null:N,uf(t,d.id)},l,void 0,p),x=fo("Edit queued message",uo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>Qd(d.id),l,"Edit",p),ft=fo("Send now",uo(["M12 19V5","M6 11 12 5l6 6"]),()=>{N&&N!==d.id&&Be(N,oa()),r0(d.id)},l,"Send now (or Enter on empty composer)",p);E.append(h,x,ft)}f.append(E),!m&&!p&&e0(f,c,t,d.id),c.append(f)}if(n.append(o,c),dl(n),u){let d=u,f=N;queueMicrotask(()=>{N===f&&d.isConnected&&s0(d)})}}function u0(){if(!B)return;B.ticks-=1;let t=Y(B.key);if(t.length&&sf()>B.turns){let e=Jh();if(e&&e===B.text){$e.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),bn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,st();return}}B.ticks<=0&&(B=null)}function ua(t){return!Zh()||!Ut(t)?"":Xh(t)}function d0(t){if(!_t||t.isComposing||t.keyCode===229||t.key!=="Enter"||a0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||te)return;let e=Xd(t.target)??Xd(document.activeElement);if(!e)return;if(t.altKey||ht){ht=!1,ze=!0,queueMicrotask(()=>{ze=!1});return}let n=ua(e);n&&(la(t),ca(n))}function f0(t){if(!_t||te||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(ze){ze=!1;return}if(ht){ht=!1;return}let e=af(t.target);if(!e)return;let n=ua(e);n&&(la(t),ca(n))}function m0(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||z(e))return null;let n=t.closest(zn);if(n instanceof HTMLElement&&!z(n))return n;let r=He();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function ef(t){if(!_t)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${sa}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&z(n)||te||!m0(e))return;if(ht){ht=!1;return}let r=it();if(!r)return;let o=ua(r);o&&(la(t),ca(o))}function p0(t){if(!_t)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Mi)&&!e.querySelector(Gt)||te)return;if(ze){ze=!1;return}if(ht){ht=!1;return}let n=it()??e.querySelector(Gt);if(!n)return;let r=ua(n);r&&(la(t),ca(r))}var mf=w({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Wd,cleanupSelectors:[`#${sa}`],settings:ul,start(){_t=!0;let t=ul.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),qt=fe(),P="",te=!1,ht=!1,ze=!1,B=null,U=!j()&&!sn()&&(V()||aa()),G=!1,dt=!1,N=null,at=null,clearTimeout(gn),gn=void 0,k(Wd,Vd),lo?.abort(),lo=new AbortController;let{signal:e}=lo,n={capture:!0,signal:e};window.addEventListener("keydown",d0,n),document.addEventListener("beforeinput",f0,n),document.addEventListener("pointerdown",ef,n),document.addEventListener("click",ef,n),document.addEventListener("submit",p0,n),ra?.(),ra=ct({onFall(r){if(_t){if(r.userStopped||r.error){U=!1,G=!1,dt=!1,P="",st();return}if(!(G&&!dt)){if(G&&dt){if(!mo())return;G=!1,dt=!1,U=!1,P=r.contextKey,co(r.contextKey);return}if(!mo()){$e.debug("unsettled fall; keep queue window");return}U=!1,P=r.contextKey,co(r.contextKey)}}},onRise(){j()||sn()||(G&&(dt=!0),U=!0)},onContext(r,o){o&&r&&!W(o,r)&&(U=!1,G=!1,dt=!1,P="",te=!1,De!==void 0&&(clearTimeout(De),De=void 0)),Zd(r),qt=r,st()},onTick(r){Zd(r.contextKey),qt=r.contextKey,u0(),(j()||sn())&&(G=!1,dt=!1,U=!1,P=""),G&&(V()||aa())&&(dt=!0),G&&dt&&mo()&&(G=!1,dt=!1,U=!1,Y(r.contextKey).length&&(P=r.contextKey,co(r.contextKey))),!G&&U&&mo()&&(U=!1,!P&&Y(r.contextKey).length&&(P=r.contextKey,co(r.contextKey))),!G&&P&&P===r.contextKey&&co(P),Y(r.contextKey).length&&!Fe?.isConnected?st():Fe&&dl(Fe)}}),st(),$e.debug("watch started")},stop(){_t=!1,ra?.(),ra=null,lo?.abort(),lo=null,clearTimeout(De),De=void 0,clearTimeout(po),po=void 0,clearTimeout(gn),gn=void 0,at=null,qe.clear(),B=null,P="",te=!1,ht=!1,ze=!1,U=!1,G=!1,dt=!1,fl()}});var pf=`.bloom-cls {
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
`;var hf=new M("ChatListStatus"),gf="chatListStatus",ma="bloom-cls",b0="bloom-cls",h0=1200*1e3,y0="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",$t=new Map,ee=!1,Lt="",me=!1,sr=!1,kt=0,je=null,bl=null,ir=null,pl=null,da=null,go=null,ar=!1,Ge=new Set;function fa(){return Date.now()}function yf(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function pe(t,e,n,r=!0){if(!(!t||!ee)){if(e==="idle")$t.delete(t);else{let o=$t.get(t);o&&o.kind===e&&n!=="net"?o.at=fa():$t.set(t,{kind:e,at:fa(),source:n})}r&&v0({v:1,id:t,kind:e,at:fa()}),hn()}}function v0(t){try{ir?.postMessage(t)}catch{}}function x0(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||pe(e.id,e.kind,"bc",!1)}function E0(){let t=fa();for(let[e,n]of $t)n.kind==="streaming"&&t-n.at>h0&&$t.delete(e)}function w0(){let t=yf();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(y0))continue;let o=ue(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function bf(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function gl(t){let e=t.querySelector(`:scope > .${ma}`);return e||null}function hl(){if(!ee)return;E0();let t=R(),e=w0();je?.disconnect();try{for(let n of e){let r=ue(n.getAttribute("href")||"");if(!r||!t||r!==t){gl(n)?.remove();continue}let i=$t.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){gl(n)?.remove();continue}let a=gl(n);a||(a=document.createElement("span"),a.className=ma,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(bf("streaming")):i==="error"&&a.appendChild(bf("error")))}}catch(n){hf.debug("paint failed",n)}vf()}function hn(){if(ee){if(document.hidden){kt&&(cancelAnimationFrame(kt),kt=0),hl();return}kt||(kt=requestAnimationFrame(()=>{kt=0,ee&&hl()}))}}function vf(){let t=yf();if(!(je&&bl===t&&t?.isConnected)){if(je?.disconnect(),bl=t,!t){je=null;return}je=new MutationObserver(()=>hn()),je.observe(t,{childList:!0,subtree:!0})}}function pa(){return!!(en()||Wr())}function S0(t){return!!(ar||t&&Ge.has(t)||!sr&&!j()&&pa())}function T0(t){if(ee){if(t.type==="post-start"){sr=!1,t.conversationId?(ar=!1,Ge.add(t.conversationId),me=!0,pe(t.conversationId,"streaming","net")):(ar=!0,me=!0);return}if(t.type==="post-end"){if(ar=!1,t.conversationId){Ge.delete(t.conversationId);let e=R(),n=Un();(e?t.conversationId===e:t.conversationId===n)?pe(t.conversationId,t.error?"error":"done","net"):pe(t.conversationId,"idle","net")}pa()||(me=!1)}}}function L0(t,e){if(!ee)return;if(W(e,t)){hn();return}let n=R();if(Lt&&Lt!==n){Ge.delete(Lt);let r=$t.get(Lt);r&&r.kind!=="idle"&&pe(Lt,"idle","local")}ar=!1,me=!1,sr=!0,n&&$t.get(n)?.kind==="streaming"&&$t.get(n)?.source==="local"&&!Ge.has(n)&&pe(n,"idle","local"),hn()}function k0(t){if(!ee)return;let e=t.conversationId||R();if(Lt&&e&&Lt!==e){Ge.delete(Lt);let r=$t.get(Lt);r&&r.kind!=="idle"&&pe(Lt,"idle","local"),me=!!(e&&Ge.has(e))}if(e&&(Lt=e),sr||j()){if(j()||pa()||t.streaming){hn();return}sr=!1}if(S0(e)&&(t.streaming||pa())){me=!0,e&&pe(e,"streaming","local"),hn();return}me&&(me=!1,e&&pe(e,Yt()?"error":"done","local")),hn()}var xf=w({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ma}`],start(){ee=!0,k(gf,pf);try{ir=new BroadcastChannel(b0)}catch{ir=null}ir?.addEventListener("message",x0),pl=Et(T0),da?.(),da=ct({onTick:k0,onContext:L0}),go?.abort(),go=new AbortController,document.addEventListener("visibilitychange",()=>{ee&&(kt&&(cancelAnimationFrame(kt),kt=0),hl())},{signal:go.signal}),vf(),hf.debug("sidebar status watch started")},stop(){ee=!1,kt&&cancelAnimationFrame(kt),kt=0,go?.abort(),go=null,je?.disconnect(),je=null,bl=null,da?.(),da=null,pl?.(),pl=null;try{ir?.close()}catch{}ir=null,$t.clear(),Ge.clear(),ar=!1,me=!1,sr=!1,Lt="",document.querySelectorAll(`.${ma}`).forEach(t=>t.remove()),L(gf)}});var wf="widerChat",Sf=40,Tf=96,Lf=64,kf=C({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Sf,max:Tf,default:Lf}});function M0(){return ot(Number(kf.store.width??Lf),Sf,Tf)}function Ef(){let t=M0(),e=`min(100%,${t}rem)`;k(wf,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var Mf=w({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:kf,start:Ef,onSettingsChange:Ef,stop(){L(wf)}});var yl="composerOpacity",lr='form[data-type="unified-composer"],form.w-full[data-type]',C0=[`${lr} [class*="corner-superellipse"]`,`${lr} [class*="bg-token-bg-primary"]`,`${lr} [class*="bg-token-main-surface"]`].join(","),A0=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),H0="#thread-bottom-container,#thread-bottom",I0=`${lr} #prompt-textarea,${lr} [contenteditable="true"]`,R0="var(--bg-primary,var(--main-surface-primary,#ffffff))",vl=C({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function N0(){return ot(Number(vl.store.opacity??100),0,100)}function P0(){return ot(Number(vl.store.blur??16),0,40)}function Cf(){let t=N0();if(t>=100){L(yl);return}let e=P0(),n=`color-mix(in srgb,${R0} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(yl,`${H0}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${A0}{display:none!important}${lr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${C0}{background-color:${n}!important;background-image:none!important;${r}}${I0}{background-color:transparent!important;background-image:none!important}`)}var Af=w({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:vl,start:Cf,onSettingsChange:Cf,stop(){L(yl)}});var Hf=`#bloom-bn-host {
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

.bloom-bn-ticks.bloom-bn-fit {
    justify-content: space-between;
}

.bloom-bn-fit .bloom-bn-tick {
    flex: 1 1 0;
    height: auto;
    min-height: 3px;
    max-height: calc(0.375rem + 2px);
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
    overscroll-behavior: contain;
    overflow-anchor: none;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--text-secondary, #5d5d5d) 55%, transparent) transparent;
    margin: 0;
    padding: 0;
    list-style: none;
}

.bloom-bn-list::-webkit-scrollbar {
    width: 6px;
}

.bloom-bn-list::-webkit-scrollbar-track {
    background: transparent;
}

.bloom-bn-list::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--text-secondary, #5d5d5d) 55%, transparent);
    border-radius: 999px;
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
`;var B0=new M("BetterNavigator"),xl="betterNavigator",Bf="bloom-bn-host",En=60,If=16,Tl=1e3,Rf=2400,D0=80,Df=2.5,q0=.4,bo="\u6B63\u5728\u8F93\u51FA\u2026",Ll="Image",_0="\u2753",$0="\u{1F916}",Nf=/file_[0-9a-f]+/gi,F0="File",z0="Code",j0=".markdown, .whitespace-pre-wrap",Il=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),G0="img, picture, video, canvas",U0=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,K0=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Lo=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,V0=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,W0=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Y0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,X0=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,Z0=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,J0=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Q0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),ty=2e3,ey=40,ny=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,qf=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),ry=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),oy=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),iy=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),ur=C({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),be=new Map,Eo=new Map,ne=new Set,ha=0,At=!1,he=!1,cr=!1,Ue=null,ko=null,dr=null,ya=null,$=[],xn="",va=0,wo=-1,So=0,xa="",Ct=0,ge=0,ho,yo=null,ga=null,El=null,wl=null,yn=null,kl=null,vo=null,vn=null,ye=null,xo=null,Ea=!1,Ml=0;function fr(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Sl(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function ay(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function sy(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)ny.test(ay(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Sl(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Sl(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Sl(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function To(t){try{return!!t.closest(ry)}catch{return!0}}function Pf(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Ta(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Rl(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function ly(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function ba(t,e){if(t){Nf.lastIndex=0;for(let n of t.matchAll(Nf))e.add(n[0].toLowerCase())}}function cy(t){try{let e=new Set,n=s=>{ly(s)||(ba(s.getAttribute("src")||"",e),ba(s.getAttribute("srcset")||"",e),ba(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&ba(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Ta(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function uy(t,e){let n=cy(t),r=Eo.get(e)??0,o=Math.max(r,n);return o>0&&Eo.set(e,o),o>=2?`${Ll} x${o}`:Ll}function X(t){return t.replace(/\s+/g," ").trim()}function _f(t,e){let n=t;for(;n&&n!==e;){if(n.matches(oy))return!0;n=n.parentElement}return!1}function wa(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(_f(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(Il);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return X(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<En+20;)e.push(X(r.textContent||""));return X(e.join(" "))}function Mo(t){let e=X(t);return e.length<3||e.length>180||Lo.test(e)?!1:U0.test(e)?!0:K0.test(e)}function La(t){let e=X(t);return e.length<8||e.length>120||/\s/.test(e)||Lo.test(e)||Mo(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function dy(t){let e=[],n=i=>{let a=X(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(X(s[1])),e.push(X(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function fy(t){try{return To(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function Nl(t){let e=X(t);return!e||Pl(e)||La(e)?!0:Mo(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function my(t){return!t.length||t.length>4||!t.every(e=>Nl(e))?!1:t.some(e=>Lo.test(X(e))||Mo(e)||La(e))}function $f(t){try{let e=null,n=0,r=`${Il}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(fy(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=dy(o);if(!i.length||i.length>4||i.join(" ").length>240||!my(i))continue;let a=i.some(c=>Lo.test(X(c))),s=i.some(c=>Mo(c)||La(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function py(t){return $f(t)?F0:""}function gy(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(V0.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function by(t){try{for(let e of t.querySelectorAll(G0))if(!gy(e))return!0}catch{}return!1}function Pl(t){let e=X(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||X0.test(e)||Y0.test(e)?!0:e.length<=24&&(Z0.test(e)||Lo.test(e))}function hy(t){let e=[],n=new Set,r=o=>{try{if(_f(o,t)||o.closest(Il))return}catch{return}let i=wa(o);!i||n.has(i)||Pl(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>En+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(wa(o).length<24)&&(r(o),e.join(" ").length>En+20))break}}catch{}return X(e.join(" "))}function yy(t){let e=$f(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=X(i.innerText||i.textContent||"");!a||a.length>En+20||r.has(a)||Nl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return X(n.join(" "))}function vy(t,e){let n=[];try{for(let o of t.querySelectorAll(j0)){if(To(o))continue;let i=wa(o);if(!(!i||e==="assistant"&&Pl(i)||Nl(i))&&(n.push(i),n.join(" ").length>En+20))break}}catch{}let r=X(n.join(" "));if(e==="user"){let o=yy(t);if(o)return o}return r||(e==="assistant"?hy(t):"")}function xy(t){return t.length>En?`${t.slice(0,En).trimEnd()}\u2026`:t}function Of(t){return J0.test(t)}function Ey(t,e,n,r){let o=vy(t,e);if(o)return xy(o);if(r)return bo;let i=py(t);if(i)return i;if(Rl(t))return uy(t,Ta(t));try{if(by(t))return Ll;if(t.querySelector("pre, code"))return z0}catch{}return`Message ${n+1}`}function wy(){if(he)return!0;let t=R();return!!(t&&ne.has(t)||!cr&&!j()&&Co())}function Co(){return!!(en()||Wr())}function Sy(){ha=Date.now()}function Ff(t){he=!1,t&&ne.delete(t);let e=R();e&&ne.delete(e)}function Ty(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Ly(t){if(Rl(t)||!Co())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!wa(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function Ol(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=X(e.textContent||"");if(!(n.length>32)&&W0.test(n))return!0}}catch{}return!1}function zf(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function ky(t,e){try{if(Ty(t))return!0;if(!e)return!1;if(Ly(t)||Ol(t))return!0}catch{}return!1}function jf(t){if(!t||Co())return!1;try{if(Ol(t)||zf(t))return!1;if(t.querySelector(Q0)||Rl(t))return!0}catch{}return!1}function My(t){if(Co()||ha&&Date.now()-ha<ty)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!jf(e.el)||Ff()}function Cy(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(qf)){if(To(r))continue;let i=Ta(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(To(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function Ay(t){let e=[t.getAttribute("data-message-id"),t.getAttribute("data-turn-id"),t.querySelector("[data-message-id]")?.getAttribute("data-message-id"),t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id")],n=[];for(let r of e)r&&!n.includes(r)&&n.push(r);return n}function Hy(t){let e=ur.store.showAssistant!==!1,n=e&&wy(),r=Cy(t),o=null;if(e)for(let a of r)Pf(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Ta(a);if(!s)continue;let l=Pf(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&Ol(a),d=c&&zf(a),f=l==="assistant"&&c&&!jf(a)&&(u||d||n||ky(a,!0)),m=Ey(a,l,i.length,f);if(m&&m!==bo){let b=be.get(s),g=!!b&&(Mo(b)||La(b));(!b||g||!Of(m)||Of(b))&&m!==b&&be.set(s,m)}let p=f&&m===bo?bo:be.get(s)||m;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return i}function Iy(t){let e=new Map;for(let n of t)if(e.set(n.id,n),!!n.el)for(let r of Ay(n.el))e.set(r,n);return e}function Ry(t,e){if(e)return e.text&&e.text!==bo&&be.set(t.id,e.text),{...e,id:t.id};let n=be.get(t.id)||(t.alias?be.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message"}}function Ny(t,e){let n=ur.store.showAssistant!==!1,r=Iy(e),o=new Set,i=[];for(let s of t){if(s.role==="assistant"&&!n)continue;let l=r.get(s.id)||(s.alias?r.get(s.alias):void 0),c=Ry(s,l);c.el&&o.add(c.el),i.push(c)}for(let s=0;s<e.length;s++){let l=e[s];if(!l.el||o.has(l.el))continue;let c=i.length;for(let u=s-1;u>=0;u--){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f+1;break}}if(c===i.length)for(let u=s+1;u<e.length;u++){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f;break}}i.splice(c,0,l),o.add(l.el)}let a=-1;for(let s=0;s<i.length;s++)i[s].role==="assistant"&&(a=s);for(let s=0;s<i.length;s++)i[s].live&&s!==a&&(i[s].live=!1);return i}function Py(){let t=fr();if(!t||t===document.body)return[];let e=Hy(t),n=R(),r=n?As(n):[],o=r.length?Ny(r,e):e;return My(o),o}function Gf(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function ka(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function Bl(t){return t===window?window.innerHeight:t.clientHeight}function Oy(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(iy)}catch{return!1}}function Uf(){ho!==void 0&&(clearTimeout(ho),ho=void 0),yo?.classList.remove("bloom-bn-flash"),yo=null}function Kf(t){Uf(),t.classList.add("bloom-bn-flash"),yo=t,ho=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),yo===t&&(yo=null),ho=void 0},800)}function Sa(t){if(!$.length)return;let e=Math.max(0,Math.min(t,$.length-1));va=e,ko?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),dr?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),ya&&(ya.textContent=`${e+1} / ${$.length}`)}function Vf(t){if(Ea)return;let e=dr?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function Cl(t){let e=$[t];if(!e)return;let n=e.el?.isConnected?e.el:Wf(e.id);if(!n){qy(t);return}e.el=n,wo=t,So=Date.now()+Tl,Sa(t),Vf(t);let r=ye??ka(n),i=Math.abs(n.getBoundingClientRect().top-Gf())>Df*Bl(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),ur.store.jumpEffect!=="none"&&Kf(n)}function Wf(t){let e=fr();if(!e||e===document.body||!t)return null;let n=[t],r=R(),i=(r?As(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"]`)}catch{}if(!s||To(s))continue;let l=s.closest(qf);return l instanceof HTMLElement?l:s}return null}function Dl(){if(ye)return ye;let t=fr();return t?ka(t):window}function By(t){let e=Dl(),n=Bl(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function Dy(t,e){let n=Dl();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function qy(t){let e=++Ml,n=$[t];if(!n)return;wo=t,So=Date.now()+Rf+Tl,Sa(t),Vf(t);let r=-1;for(let l=0;l<$.length;l++)$[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+Rf,a=0,s=-1;for(;Date.now()<i;){if(e!==Ml||!At)return;let l=Wf(n.id);if(l){n.el=l,So=Date.now()+Tl;let d=ye??ka(l),m=Math.abs(l.getBoundingClientRect().top-Gf())>Df*Bl(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),ur.store.jumpEffect!=="none"&&Kf(l),Mt();return}let c=Dl(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&Dy(o,u))break;By(o),await new Promise(d=>setTimeout(d,D0))}}function ql(){if(!At||!$.length)return;if(Date.now()<So&&wo>=0){Sa(wo);return}let t=window.innerHeight*q0,e=0;for(let n=0;n<$.length;n++){let r=$[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Sa(e)}function _y(t){let e=ka(t);if(ye===e&&xo)return;xo?.(),ye=e;let n=e===window?document:e,r=()=>{ql(),_l()};n.addEventListener("scroll",r,{passive:!0}),xo=()=>n.removeEventListener("scroll",r)}function $y(t){vn?.disconnect(),vn=null;let e=ye instanceof HTMLElement?ye:null;vn=new IntersectionObserver(()=>ql(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&vn.observe(n.el)}function Fy(){if(!document.body)return null;let t=Ue;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Bf,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{Ea=!0}),n.addEventListener("pointerleave",()=>{Ea=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Ue=t,ko=e,dr=i,ya=o,t}function Yf(){let t=Ue,e=fr();if(!t||!e||!e.isConnected||$.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=sy(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||ey,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function _l(){!At||ge||(ge=requestAnimationFrame(()=>{ge=0,At&&Yf()}))}function zy(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function jy(t){let e=ko,n=dr;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>If),e.classList.toggle("bloom-bn-fit",t.length>If),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=zy(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Cl(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?_0:$0;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Cl(o)}),n.appendChild(a)}))}function Gy(t){ko?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=dr?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Uy(){let t=R();return t===xa?!1:(xa=t,be.clear(),Eo.clear(),$=[],xn="",va=0,wo=-1,So=0,he&&t&&(ne.add(t),he=!1),!0)}function Ky(t){let e=ur.store.showAssistant!==!1?"1":"0";return`${xa}|${e}|${t.map(n=>n.id).join(",")}`}function Al(){if(!At)return;Uy();let t=Py(),e=fr();if(!e||t.length<1){$=t,xn="",Ue&&(Ue.hidden=!0),vn?.disconnect(),Hl();return}Fy();let n=Ky(t);n!==xn?($=t,xn=n,jy(t),_y(e),$y(t)):($=t,Gy(t)),Yf(),ql(),Hl()}function Mt(){if(At){if(document.hidden){Ct&&(cancelAnimationFrame(Ct),Ct=0),Al();return}Ct||(Ct=requestAnimationFrame(()=>{Ct=0,At&&Al()}))}}function Hl(){let t=fr();if(!(yn&&kl===t&&t?.isConnected)){if(yn?.disconnect(),vo?.disconnect(),kl=t,!t||t===document.body){yn=null;return}yn=new MutationObserver(()=>Mt()),yn.observe(t,{childList:!0,subtree:!0}),vo=new ResizeObserver(()=>_l()),vo.observe(t)}}function Vy(t){if(At){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===R())&&Mt();return}if(t.type==="post-start"){Sy(),cr=!1,t.conversationId?(he=!1,ne.add(t.conversationId)):he=!0,Mt();return}if(t.type==="post-end"){if(he=!1,t.conversationId)ne.delete(t.conversationId);else{let e=R();e&&ne.delete(e)}Mt()}}}function Wy(t){if(!At||!$.length||Ue?.hidden||t.altKey||t.ctrlKey||t.metaKey||Oy(t.target))return;let e=-1;if(t.key==="ArrowDown")e=va+1;else if(t.key==="ArrowUp")e=va-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=$.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Cl(Math.max(0,Math.min(e,$.length-1)))}function Yy(){Ml++,Uf(),vn?.disconnect(),vn=null,yn?.disconnect(),yn=null,kl=null,vo?.disconnect(),vo=null,xo?.(),xo=null,ye=null,Ea=!1,Ue?.remove(),Ue=null,ko=null,dr=null,ya=null}var Xf=w({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:xl,cleanupSelectors:[`#${Bf}`],settings:ur,start(){At=!0,xa=R(),k(xl,Hf),ga=new AbortController;let{signal:t}=ga;window.addEventListener("keydown",Wy,{signal:t}),window.addEventListener("popstate",Mt,{signal:t}),window.visualViewport?.addEventListener("resize",_l,{signal:t}),document.addEventListener("visibilitychange",()=>{At&&(Ct&&(cancelAnimationFrame(Ct),Ct=0),ge&&(cancelAnimationFrame(ge),ge=0),Al())},{signal:t}),wl=Et(Vy),El=ct({onTick(){if(j()){Mt();return}cr&&!Co()&&(cr=!1),Mt()},onFall(e){Ff(e.conversationId),Mt()},onContext(e,n){if(!W(n,e)){be.clear(),Eo.clear(),xn="",he=!1;let r=R();for(let o of[...ne])o!==r&&ne.delete(o);cr=!0}Mt()}}),Hl(),Mt(),B0.debug("navigator started")},stop(){At=!1,Ct&&cancelAnimationFrame(Ct),Ct=0,ge&&cancelAnimationFrame(ge),ge=0,ga?.abort(),ga=null,El?.(),El=null,wl?.(),wl=null,ne.clear(),he=!1,cr=!1,ha=0,Yy(),be.clear(),Eo.clear(),$=[],xn="",L(xl)},onSettingsChange(){xn="",Mt()}});var Zf=`.bloom-ts {
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
`;function Jf(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Qf(t){try{return new Date(t).toISOString()}catch{return""}}var nm=new M("MessageTimestamps"),tm="messageTimestamps",Ca="bloom-ts",em=1500,Zy="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",mr=C({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),pr=new Map,Tn=!1,Ht=0,Ke=null,Fl=null,$l=null,Ma=null,Ao=null,Ho=!1,wn=!1;function rm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function jl(){let t=mr.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function om(){let t={...jl()};for(let[n,r]of pr)t[n]=r;let e=Object.keys(t);if(e.length>em){let n=e.slice(e.length-em),r={};for(let o of n)r[o]=t[o];mr.store.stamps=r;return}mr.store.stamps=t}var Jy=Lc(om,500);function im(t,e){!t||!e||pr.get(t)===e||(pr.set(t,e),Jy(),Sn())}function Qy(t){return t?pr.get(t)??jl()[t]??Oi(t)??null:null}function tv(t){Tn&&t.type==="message-time"&&im(t.messageId,t.createTime)}function ev(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function nv(){let t=rm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Zy)||e.push(n)}catch{}return e}function rv(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function zl(){if(!Tn)return;let t=mr.store.hideOwnMessages===!0,e=mr.store.showDate!==!1,n=V();wn&&!j()&&(wn=!1),wn&&(n?Ho=!1:wn=!1);let r=wn?!1:n,o=nv();Ke?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=ev(i),c=i.querySelector(`:scope > .${Ca}`);if(t&&l==="user"){c?.remove();return}if(rv(i)){c?.remove();return}let u=Qy(s);if(!u&&s&&(r||Ho)&&a>=o.length-2&&(u=Date.now(),im(s,u)),!u){c?.remove();return}let d=Jf(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Ca,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=Qf(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){nm.debug("paint failed",i)}Ho=r,am()}function Sn(){if(Tn){if(document.hidden){Ht&&(cancelAnimationFrame(Ht),Ht=0),zl();return}Ht||(Ht=requestAnimationFrame(()=>{Ht=0,Tn&&zl()}))}}function am(){let t=rm();if(!(Ke&&Fl===t&&t?.isConnected)){if(Ke?.disconnect(),Fl=t,!t||t===document.body){Ke=null;return}Ke=new MutationObserver(()=>Sn()),Ke.observe(t,{childList:!0,subtree:!0})}}var sm=w({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ca}`],settings:mr,start(){Tn=!0,k(tm,Zf);let t=jl();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&pr.set(e,n);$l=Et(tv),Ma?.(),Ma=ct({onTick:Sn,onFall:Sn,onContext(e,n){W(n,e)||(wn=!0,Ho=!1),Sn()}}),Ao?.abort(),Ao=new AbortController,document.addEventListener("visibilitychange",()=>{Tn&&(Ht&&(cancelAnimationFrame(Ht),Ht=0),zl())},{signal:Ao.signal}),am(),Sn(),nm.debug("timestamp watch started")},stop(){Tn=!1,Ht&&cancelAnimationFrame(Ht),Ht=0,Ao?.abort(),Ao=null,Ke?.disconnect(),Ke=null,Fl=null,Ma?.(),Ma=null,$l?.(),$l=null,wn=!1,Ho=!1,om(),pr.clear(),document.querySelectorAll(`.${Ca}`).forEach(t=>t.remove()),L(tm)},onSettingsChange:Sn});var Gl="streamerMode",ov="filter:blur(6px)!important;transition:filter .2s ease",iv="filter:none!important",gr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],br=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function It(t,e){return t.map(n=>`${n} ${e}`)}var Ln=C({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function hr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${ov}}${e?`${r}{${iv}}`:""}`}function lm(){let t=[];if(Ln.store.conversations!==!1&&(t.push(hr([...It(br,'a[href^="/c/"]'),...It(br,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Ln.store.projects!==!1&&(t.push(hr([...It(br,'a[href*="/project"]'),...It(br,'a[href*="/g/g-p-"]'),...It(br,'[data-testid="project-name"]'),...It(br,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Ln.store.headerTitle!==!1&&t.push(hr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Ln.store.accountAvatar!==!1&&t.push(hr([...It(gr,"img"),...It(gr,'[class*="avatar"]'),...It(gr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Ln.store.accountName!==!1&&t.push(hr([...It(gr,".min-w-0 > .truncate"),...It(gr,".min-w-0.flex-1 .truncate")],!1)),Ln.store.accountEmail!==!1&&t.push(hr([...It(gr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){L(Gl);return}k(Gl,t.join(`
`))}var cm=w({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Ln,start:lm,onSettingsChange:lm,stop(){L(Gl)}});var um=`.bloom-gc-panel {
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
}`;var sv=new M("GreetingCustomizer"),yr="greetingCustomizer",dm="greetingCustomizerUi",Io=100,Kl=30,lv=120,cv=1e3,uv=50,dv=40,fv=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Ro=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Na=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function mv(t){return!!t?.closest(fv)}function gm(t){return!!(mv(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function _o(t){try{for(let e of document.querySelectorAll(t))if(!gm(e))return e}catch{}return null}function Ul(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(_o(e))return e;return t}var bm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],nt=C({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Av},greetings:{type:0,description:"Greeting texts",hidden:!0,default:bm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),re=!1,Er=!1,Mn=null,Ha,No,vr,Po,Ia=0,Aa=null,xr=null,Oo=null,Bo=null,Do=null,Ra=null;function xe(){let t=location.pathname||"/";return t==="/"||t===""}function kn(){let t=nt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):bm.slice()}function qo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function fm(t){nt.store.greetings=t.slice(0,Kl)}function $o(){let t=String(nt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function pv(){return nt.store.order==="random"?"random":"sequential"}function gv(){return ot(Number(nt.store.intervalSec??10),1,3600)*1e3}function bv(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function hv(){return!!_o(Na)}function Pa(){return!!(_o(Na)||_o(Ro))}function yv(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=hv()?Ul(Na):_o(Ro)?Ul(Ro):Ul(Na),i=e?`${Ro}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function vv(t,e){if(t<=0)return 0;if(t===1)return Number(nt.plain.index)!==0&&(nt.store.index=0),Number(nt.plain.lastRandom)!==0&&(nt.store.lastRandom=0),0;let n=Number(nt.plain.index),r=Number(nt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(pv()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return nt.store.index=s,nt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return nt.store.index=i,i}function ve(t){if(!re)return;if(!xe()){L(yr);return}let e=kn().map(qo).filter(Boolean);if(!e.length){L(yr);return}let n=vv(e.length,t),r=e[n]??e[0],o=$o()==="manual"&&e.length>1;k(yr,yv(bv(r),o)),Ra?.()}function Vl(){Ha!==void 0&&(clearInterval(Ha),Ha=void 0)}function Wl(){Vl(),!(!re||!xe())&&$o()==="interval"&&(kn().filter(Boolean).length<=1||(Ha=setInterval(()=>ve(!0),gv())))}function Yl(){Po!==void 0&&(clearTimeout(Po),Po=void 0),Ia=0}function mm(){if(Yl(),!re||!xe())return;Ia=dv;let t=()=>{if(Po=void 0,!(!re||!xe())){if(Pa()){$o()==="refresh"&&!Er?(Er=!0,ve(!0)):ve(!1),Wl();return}Ia-=1,Ia>0&&(Po=setTimeout(t,uv))}};t()}function Xl(){if(Mn===!0){Pa()?ve(!1):mm();return}Mn=!0,Er=!1,$o()==="refresh"?(Er=!0,ve(!0)):ve(!1),Wl(),Pa()||mm()}function Zl(){Mn=!1,Er=!1,Vl(),Yl(),L(yr)}function Oa(){vr===void 0&&(vr=window.setTimeout(()=>{vr=void 0,re&&(xe()?Xl():Mn!==!1&&Zl())},lv))}function xv(){xr||(xr=history.pushState.bind(history),Oo=history.replaceState.bind(history),Bo=function(...e){let n=xr(...e);return Oa(),n},Do=function(...e){let n=Oo(...e);return Oa(),n},history.pushState=Bo,history.replaceState=Do)}function Ev(){Bo&&history.pushState===Bo&&xr&&(history.pushState=xr),Do&&history.replaceState===Do&&Oo&&(history.replaceState=Oo),xr=null,Oo=null,Bo=null,Do=null}function wv(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Oa)}function Sv(t){if(!re||!xe()||$o()!=="manual"||kn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Ro);if(!n||gm(n))return;let r=window.getSelection?.();r&&String(r).trim()||ve(!0)}function Tv(){No===void 0&&(No=setInterval(()=>{if(!re)return;let t=xe();if(t!==(Mn===!0)){t?Xl():Zl();return}t&&Pa()&&ve(!1)},cv))}function Lv(){No!==void 0&&(clearInterval(No),No=void 0)}function pm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var kv="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Mv="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Cv(t,e){let n=qo(t);return n?n.length>Io?`Keep it to ${Io} characters.`:kn().length+(e?1:0)>Kl?`At most ${Kl} greetings.`:null:"Enter a greeting."}function Av(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=kn(),s=Number(nt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Io,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let g=l.querySelector(".bloom-gc-count");g&&(g.textContent=`${qo(e).length}/${Io}`);let E=l.querySelector(".bloom-gc-error");E&&(E.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${qo(e).length}/${Io}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let g=document.createElement("button");g.type="button",g.className="bloom-gc-btn",g.textContent="Cancel",g.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(g)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let g=n<0,E=Cv(e,g);if(E){r=E,i();return}let h=qo(e),x=kn().slice();n>=0&&n<x.length?x[n]=h:x.push(h),fm(x),n=-1,e="",r="",i()}),m.appendChild(p),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let g=document.createElement("p");g.className="bloom-gc-empty",g.textContent="No greetings. The official heading stays.",t.appendChild(g);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((g,E)=>{let h=document.createElement("div");h.className="bloom-gc-item",E===s&&(h.dataset.active="true");let x=document.createElement("button");x.type="button",x.className=`bloom-gc-body${o===E?"":" bloom-gc-clamp"}`,x.textContent=g,x.addEventListener("click",()=>{o=o===E?-1:E,i()});let ft=document.createElement("div");ft.className="bloom-gc-item-actions";let mt=pm("Edit",kv);mt.addEventListener("click",()=>{n=E,e=g,r="",i()});let Z=pm("Delete",Mv);Z.addEventListener("click",()=>{let O=kn().filter((lt,yt)=>yt!==E);fm(O),n===E?(n=-1,e=""):n>E&&(n-=1),i()}),ft.append(mt,Z),h.append(x,ft),b.appendChild(h)}),t.appendChild(b)};return Ra=i,i(),()=>{Ra===i&&(Ra=null),t.replaceChildren()}}var hm=w({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:dm,settings:nt,start(){re=!0,k(dm,um),xv(),Aa=new AbortController;let{signal:t}=Aa;window.addEventListener("popstate",Oa,{signal:t}),document.addEventListener("click",wv,{capture:!0,signal:t}),document.addEventListener("click",Sv,{signal:t}),Tv(),Mn=null,xe()?Xl():Zl(),sv.debug("started")},stop(){re=!1,Aa?.abort(),Aa=null,vr!==void 0&&(clearTimeout(vr),vr=void 0),Vl(),Yl(),Lv(),Ev(),L(yr),Er=!1,Mn=null},onSettingsChange(){re&&(xe()?(ve(!1),Wl()):L(yr))}});function Hv(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Ba(t){try{return await createImageBitmap(t)}catch{return null}}async function Iv(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Da(t){if(t.startsWith("data:")){let e=Hv(t);if(e){let n=await Ba(e);if(n)return n}return Iv(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Ba(await e.blob()):null}catch{return null}}var _a="data-bloom-csi-slot",Rv="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Nv=/\bsize-(?:[6-9]|10)\b/,Pv=/\b(?:h|w)-(?:[6-9]|10)\b/,Ov=/^(plus|pro|free|team|go|business|enterprise)$/i,Bv=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function qa(t){return t.getAttribute("class")||""}function vm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Nv.test(t)?!0:Pv.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Dv(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!xm(e)}function xm(t){return Ov.test(String(t??"").replace(/\s+/g,""))}function oe(t){return!!t?.closest(Rv)}function $a(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Fo(t){let e=qa(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:xm(t.textContent||"")}function Fa(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function zo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function qv(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Em(t){if(oe(t)||Fa(t)||zo(t)||Fo(t)||$a(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function wm(t){return oe(t)||Fa(t)||zo(t)||Fo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Dv(t.textContent||"")}function Sm(t){return oe(t)||zo(t)||$a(t)||Fo(t)?!1:vm(qa(t))||wm(t)?!0:Em(t)}function ym(t){return!(oe(t)||$a(t)||zo(t)||Fo(t)||Fa(t))}function Cn(t,e){let n=Fa(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(zo(n)||$a(n)||Fo(n));)oe(n)||(r=n),n=n.parentElement;return r}function _v(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||oe(e))continue;if(qv(qa(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!ym(o))){if(Sm(o)||vm(qa(o)))return Cn(o,t)??o;r.push(o)}if(r.length===1)return Cn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&ym(r))return Cn(r,t)??r}}return null}function $v(t){let e=t.querySelectorAll(Bv);for(let n of e)if(Sm(n))return Cn(n,t)??n;return null}function Fv(t){for(let e of t.querySelectorAll("span, div, p, i"))if(wm(e))return Cn(e,t)??e;return null}function zv(t){for(let e of t.querySelectorAll("*"))if(Em(e))return Cn(e,t)??e;return null}function Tm(t,e){if(oe(t))return null;if(e&&!oe(e)&&t.contains(e)){let n=Cn(e,t);if(n)return n}return _v(t)??$v(t)??Fv(t)??zv(t)}function Lm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var wr="data-bloom-csi",za="data-bloom-csi-orig",An=new Set,km=null;function Ql(t){km=t}function Mm(t){return`url(${JSON.stringify(t)})`}function ja(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function tc(t,e,n){let r=Mm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Cm(t,e=_a){let n=Mm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function jv(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Sr(t){t.removeEventListener("error",Jl);let e=t.getAttribute(za);t.removeAttribute(wr),t.removeAttribute(za),e&&t.getAttribute("src")!==e&&(t.src=e)}function Jl(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&An.add(n),Sr(e),km?.()}function Am(t,e){if(!e||An.has(e)){Sr(t);return}jv(t);let n=t.getAttribute("src")??"";if(t.getAttribute(wr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(za)&&t.setAttribute(za,n);t.setAttribute(wr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Jl),t.addEventListener("error",Jl),n!==e&&(t.src=e)}var Hm=`/*
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
`;var Im=new M("CustomSidebarIdentity"),Rm="customSidebarIdentityUi",Om="customSidebarIdentity",Uv="bloom-csi-face",Kv="bloom-csi-name",Tr=_a,Vv=1024,Ga=256,Bm=24,Dm=64,qm=40,oc=1,ic=4,jo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],ec=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=C({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:dx},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Bm,max:Dm,default:qm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function In(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Wv(){return String(T.store.displayName??"").trim()}function Va(t,e,n,r,o){let i=ot(n,oc,ic),a=Math.min(t,e)/i,s=ot(r,a/2,Math.max(a/2,t-a/2)),l=ot(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Yv(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function ac(t){let e=Math.min(1,Vv/Math.max(t.width,t.height));return Yv(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Xv(t,e,n,r){let{side:o,x:i,y:a}=Va(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Ga,s.height=Ga;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,Ga,Ga);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Zv(t){let e=await Ba(t);if(!e)return null;let n=ac(e);return e.close(),n}async function lc(t,e,n,r){let o=await Da(t);if(!o)return null;let i=Xv(o,e,n,r);return o.close(),i}function cc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function Nm(){T.store.avatarUrl="",T.store.avatarSource="",cc()}var Pm=0;async function sc(t){let e=++Pm;cc(),T.store.avatarSource=t;let n=await lc(t,.5,.5,1);return e!==Pm?!1:(n&&(T.store.avatarUrl=n),!!n)}function Go(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function nc(t){let e=Go(t);if(!e)return!1;let n=await Zv(e);return n?sc(n):!1}var Rt=!1,Lr=!1,kr=0,Wa=0,Ua=null,Ve=new Map,Mr=null,Ee=null,Ya=null,ie=null,Xa=null;function Za(t){let e=String(t??"").trim();if(!e||An.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function _m(){return Za(T.store.avatarUrl)??Za(T.store.avatarSource)}var Ka=!1,rc=new Set;function $m(){let t=Za(T.store.avatarSource);if(!t?.startsWith("data:image/")||Za(T.store.avatarUrl)?.startsWith("data:image/")||Ka||rc.has(t))return;Ka=!0;let e=In(T.store.cropX,.5),n=In(T.store.cropY,.5),r=In(T.store.cropZoom,1);lc(t,e,n,r).then(o=>{if(Ka=!1,!o){rc.add(t);return}Rt&&(T.store.avatarUrl=o,Ja())}).catch(()=>{Ka=!1,rc.add(t)})}function Hn(t,e){return t.map(n=>`${n} ${e}`)}function Jv(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Qv(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Jv(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Fm(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||oe(n)||n.closest(".min-w-0")||e.push(n);return e}function tx(t){let e=Fm(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function uc(){let t=[],e=Ze();e&&t.push(e);let n=qn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(jo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function zm(t,e){let n=tx(t);if(n)Am(n,e);else for(let o of Fm(t))Sr(o);let r=Tm(t,n);for(let o of t.querySelectorAll(`[${Tr}]`))o!==r&&o.removeAttribute(Tr);r&&r.setAttribute(Tr,"")}function ex(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function nx(t,e){let n=ex(t);n&&zm(n,e)}function rx(){for(let t of document.querySelectorAll(`img[${wr}]`))Sr(t);for(let t of document.querySelectorAll(`[${Tr}]`))t.removeAttribute(Tr)}function ox(){let t=ot(Math.round(In(T.store.avatarSize,qm)),Bm,Dm),e=_m(),n=Wv(),r=T.store.applyToMenu!==!1,o=[],i=[...Hn(jo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Hn(ec,"> :first-child img"));let a=[...Hn(jo,".min-w-0 > .truncate"),...Hn(jo,".min-w-0.flex-1 .truncate")];r&&a.push(...Hn(ec,"> :first-child .truncate"));let s=Lm(Tr);o.push(ja([...s.flatMap(l=>Hn(jo,l))].join(","),t)),o.push(ja(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(ja(s.flatMap(l=>Hn(ec,`> :first-child ${l}`)).join(","),t)),e&&(o.push(tc(i.join(","),e,t)),o.push(tc("#stage-sidebar-tiny-bar img",e,32)),o.push(Cm(e))),n&&o.push(Qv(a,n)),k(Om,o.join(""))}function ix(){let t=_m(),e=uc();for(let n of e)zm(n,t);if(T.store.applyToMenu!==!1){let n=_n();n&&nx(n,t)}for(let n of document.querySelectorAll(`img[${wr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Sr(n)}function Ja(){if(!(!Rt||Lr)){Lr=!0;for(let t of Ve.values())t.disconnect();Ee?.disconnect(),ie?.disconnect();try{ox(),ix()}finally{Lr=!1,dc(),cx(),Mr?.isConnected&&jm(Mr),$m()}}}function Uo(){!Rt||kr||(kr=requestAnimationFrame(()=>{kr=0,Ja()}))}function ax(){Lr||!Rt||Uo()}function sx(t){if(Ve.has(t))return;let e=new MutationObserver(ax);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ve.set(t,e)}function lx(t){Ve.get(t)?.disconnect(),Ve.delete(t)}function dc(){let t=new Set;for(let n of uc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=qn();e&&t.add(e);for(let n of[...Ve.keys()])(!t.has(n)||!n.isConnected)&&lx(n);for(let n of t)n.isConnected&&sx(n)}function cx(){let t=ci();if(!t){ie?.disconnect(),ie=null,Ya=null;return}if(Ya===t&&ie){ie.observe(t,{childList:!0});return}ie?.disconnect(),Ya=t,ie=new MutationObserver(()=>{Lr||!Rt||(dc(),Uo())}),ie.observe(t,{childList:!0})}function jm(t){Mr===t&&Ee||(Ee?.disconnect(),Mr=t,Ee=new MutationObserver(()=>{if(!t.isConnected){Ee?.disconnect(),Ee=null,Mr=null;return}Lr||!Rt||Uo()}),Ee.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Gm(t){if(!Rt||T.store.applyToMenu===!1)return;let e=_n();if(e){jm(e),Uo();return}t<=0||requestAnimationFrame(()=>Gm(t-1))}function Um(t){Rt&&(Ja(),!(uc().length||t<=0)&&(Wa=requestAnimationFrame(()=>Um(t-1))))}function ux(t){Rt&&T.store.applyToMenu!==!1&&(!ui(t)&&!_n()||Gm(10))}function dx(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,m.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let g=document.createElement("input");g.type="range",g.className="bloom-csi-zoom",g.min=String(oc),g.max=String(ic),g.step="0.05",g.setAttribute("aria-label","Zoom");let E=document.createElement("span");E.className="bloom-csi-zoom-val";let h=document.createElement("button");h.type="button",h.className="bloom-csi-btn",h.textContent="Reset",b.append(g,E,h);let x=document.createElement("p");x.className="bloom-csi-hint",x.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,b,x),t.append(u,d,f);function ft(){let v=String(T.store.avatarSource??""),I=String(T.store.avatarUrl??"");return v.startsWith("data:image/")?v:I.startsWith("data:image/")?I:""}function mt(v,I,y){if(!a)return i.x=v,i.y=I,i.zoom=ot(y,oc,ic),i;let A=Va(a.w,a.h,y,v*a.w,I*a.h);return i.x=A.x/a.w,i.y=A.y/a.h,i.zoom=A.z,i}function Z(){g.value=String(i.zoom),E.textContent=`${Math.round(i.zoom*100)}%`;let v=a?Va(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;v&&a&&(p.style.width=`${a.w/v.side*100}%`,p.style.height=`${a.h/v.side*100}%`,p.style.left=`${(.5-v.x/v.side)*100}%`,p.style.top=`${(.5-v.y/v.side)*100}%`)}function O(v=!1){let I=ft(),y=String(T.store.avatarUrl??"").trim(),A=!!I;s.hidden=!y&&!I,(I||y)&&(s.src=I||y),document.activeElement!==l&&(l.value=A?"":y),l.placeholder=A?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!I,d.hidden=!(e&&/^https?:\/\//.test(y)&&!I),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",I&&(v&&(i.x=In(T.store.cropX,.5),i.y=In(T.store.cropY,.5),i.zoom=In(T.store.cropZoom,1)),p.getAttribute("src")!==I&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},mt(i.x,i.y,i.zoom),Z()},p.src=I),Z())}function lt(v,I,y,A=!1){mt(v,I,y),Z();let pt=ft(),vt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,pt&&lc(pt,i.x,i.y,i.zoom).then(H=>{H&&(T.store.avatarUrl=H)})};r&&clearTimeout(r),A?vt():r=setTimeout(vt,80)}function yt(v){T.store.avatarUrl=v;let I=v.trim();if(n&&clearTimeout(n),!I){T.store.avatarSource="",cc(),e=!1,O(!0);return}if(I.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Da(I).then(y=>{if(!y)return;let A=ac(y);y.close(),A&&sc(A).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(I)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{Da(I).then(y=>{if(!y){e=!0,O(!0);return}let A=ac(y);y.close(),A?(e=!1,sc(A).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",v=>{Go(v.clipboardData)&&(v.preventDefault(),e=!1,nc(v.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",v=>{Go(v.dataTransfer)&&v.preventDefault()}),u.addEventListener("drop",v=>{Go(v.dataTransfer)&&(v.preventDefault(),e=!1,nc(v.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>yt(l.value)),l.addEventListener("paste",v=>{Go(v.clipboardData)&&(v.preventDefault(),e=!1,nc(v.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",v=>{ft()&&!l.value&&(v.key==="Backspace"||v.key==="Delete")&&(Nm(),e=!1,O(!0))}),c.addEventListener("click",()=>{Nm(),e=!1,O(!0)}),m.addEventListener("pointerdown",v=>{v.button===0&&(m.setPointerCapture(v.pointerId),o.on=!0,o.px=v.clientX,o.py=v.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",v=>{if(!o.on||!a)return;let I=m.clientWidth;if(!I)return;let{side:y}=Va(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);mt(o.x-(v.clientX-o.px)*(y/I)/a.w,o.y-(v.clientY-o.py)*(y/I)/a.h,i.zoom),Z()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,lt(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",v=>{v.preventDefault(),lt(i.x,i.y,i.zoom*(v.deltaY<0?1.08:1/1.08))},{passive:!1}),g.addEventListener("input",()=>lt(i.x,i.y,Number(g.value))),g.addEventListener("change",()=>lt(i.x,i.y,Number(g.value),!0)),h.addEventListener("click",()=>lt(.5,.5,1,!0));let Ko=()=>O(!1);return Xa=Ko,O(!0),()=>{Xa===Ko&&(Xa=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Km=w({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Rm,cleanupSelectors:[`.${Uv}`,`.${Kv}`],settings:T,start(){Rt=!0,An.clear(),Ql(Uo),k(Rm,Hm),Ua=new AbortController,document.addEventListener("click",ux,{signal:Ua.signal}),Um(40),$m(),Im.debug("started")},onSettingsChange(){An.clear(),Xa?.(),Rt&&(dc(),Ja())},stop(){Rt=!1,Ua?.abort(),Ua=null,kr&&cancelAnimationFrame(kr),kr=0,Wa&&cancelAnimationFrame(Wa),Wa=0;for(let t of Ve.values())t.disconnect();Ve.clear(),Ee?.disconnect(),Ee=null,Mr=null,ie?.disconnect(),ie=null,Ya=null,rx(),L(Om),Ql(null),An.clear(),Im.debug("stopped")}});var Cr=new M("Bloom"),Vm=!1,fx=Date.now(),mx=[fu,ad,gd,yd,Sd,Cd,Fd,jd,Kd,mf,xf,Mf,Af,Xf,sm,cm,hm,Km];function Qa(t){return new Promise(e=>setTimeout(e,t))}function px(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function gx(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Ym=8e3,Wm=300,bx=250;async function hx(){if(Xe())return await Qa(Wm),!0;for(;Date.now()-fx<Ym;)if(await Qa(bx),Xe())return await Qa(Wm),!0;return Xe()||cs()}function fc(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function yx(){if(fc())return!0;let t=Date.now()+Ym;for(;Date.now()<t;)if(await Qa(100),fc())return!0;return fc()}function vx(){try{GM_registerMenuCommand?.("Bloom++ settings",du)}catch{}}function xx(){ni(()=>{Hr("HostShell"),Cr.info("host shell",xt)}),ri(()=>{Cr.info("idle ready",xt)}),oi(()=>{ns(),Hr("HostReady"),Cr.info("chrome ready",xt)})}async function mc(){await Cc()}async function pc(){if(Vm)return;Vm=!0;for(let n of mx)try{Oc(n),Uc(n)}catch(r){Cr.error("register failed",n.name,r)}Hr("Init"),vx(),xx();let t=()=>Hr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await px(),ns(),Cr.info("styles ready",xt),await gx(),yx().then(n=>{n&&ii()}),!await hx()){Cr.warn("late islands not detected; starting default plugins",xt),On(),ai();return}await jc()}var Xm=typeof unsafeWindow<"u"?unsafeWindow:window,Ex=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Ex){let t=Xm.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",xt);try{Object.defineProperty(Xm,"Bloom",{value:gc,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}mc().then(()=>pc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
