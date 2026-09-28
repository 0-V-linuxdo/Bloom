// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260928] v1.4.117
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
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update4.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update4.user.js
// ==/UserScript==

/* Bloom++ [20260928] v1.4.117. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Vp=Object.defineProperty;var Yp=(t,e)=>{for(var n in e)Vp(t,n,{get:e[n],enumerable:!0})};var Jc={};Yp(Jc,{REPO_URL:()=>$u,Settings:()=>j,VERSION:()=>Mt,contextKeyFromUrl:()=>fe,conversationChain:()=>Gr,conversationTitle:()=>Yn,conversationToken:()=>_t,currentConversationId:()=>R,ensureConversationChain:()=>Nu,hasDraftText:()=>Qt,hasErrorToast:()=>ee,hasLateIslands:()=>un,init:()=>Zc,initSettings:()=>Xc,isDocumentInteractive:()=>Vu,isDraftLandingPath:()=>$r,isStreaming:()=>W,isUserDraftEmpty:()=>_e,messageCreateTime:()=>Ei,plugins:()=>de,requestChromeReady:()=>Mi,requestIdleReady:()=>Xn,requestShellReady:()=>ki,setEditorText:()=>ge,subscribeHarvest:()=>kt,watchStreamingEdge:()=>ft,whenChromeReady:()=>Li,whenIdleReady:()=>Ti,whenShellReady:()=>Si});var Ae=new Map,si=!1;function Xp(){return document.getElementById("bloom-root")?.shadowRoot??null}function tu(){return document.head??null}function Un(){let t=Xp();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Zp()}function xs(t,e){if(!si)return;let n=tu();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Un();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Un();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Un()}function k(t,e){let n=Ae.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Ae.set(t,n)),si&&xs(t,n)}function Es(){if(!tu())return!1;si=!0;for(let[e,n]of Ae)xs(e,n);return Un(),!0}function eu(t){let e=Ae.get(t);e&&(e.disabled=!1,si&&xs(t,e))}function nu(t){let e=Ae.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Un())}function L(t){let e=Ae.get(t);e&&(e.el?.remove(),Ae.delete(t),Un())}function Zp(){return Array.from(Ae.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var M=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function w(t){return t}var ws=new Map;function Kn(t,e){let n=ws.get(t);return n||(n=new Set,ws.set(t,n)),n.add(e),()=>n.delete(e)}function sn(t,e){let n=ws.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Jp="bloompp";function ru(){return new Promise((t,e)=>{let n=indexedDB.open(Jp,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function ou(t){try{let e=await ru();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function iu(t,e){try{let n=await ru();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function rt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function ot(t,e,n){return Math.min(n,Math.max(e,t))}function au(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function su(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function lu(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var li=new M("SettingsStore"),He="BloomSettings",Qp=100;function ci(t){return t!=null&&typeof t.then=="function"}function tg(t){if(t==null||ci(t))return null;if(rt(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(rt(e)&&!ci(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return rt(n)&&!ci(n)?n:null}return null}catch{return null}}function di(t){let e=tg(t);if(!e)return null;let n=e.plugins;return!rt(n)||ci(n)||Object.keys(n).length===0?null:e}function Ts(t){return rt(t)?t:null}function Ss(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:rt(t)?Object.keys(t).length===0:!1}function eg(t){return Ss(t)?0:Array.isArray(t)?12+Math.min(t.length,40):rt(t)?12+Math.min(Object.keys(t).length,40):3}function ln(t){if(!t)return-1;let e=t.plugins;if(!rt(e))return-1;let n=0;for(let r of Object.values(e)){let o=Ts(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=eg(a))}return n}function cu(t){let e=t.plugins;if(!rt(e))return 0;let n=0;for(let r of Object.values(e))Ts(r)?.enabled===!0&&n++;return n}function uu(t){let e=t.map((i,a)=>({bag:i,index:a,score:ln(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=cu(a.bag)-cu(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!rt(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(rt(a))for(let[s,l]of Object.entries(a)){let c=Ts(l);if(!c)continue;if(!rt(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}Ss(u[d])&&!Ss(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return rt(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:ln(n)}}var ui=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return rt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){li.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Qp))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(He,this.plain)}catch{try{GM_setValue(He,e)}catch(n){li.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(He,e)}catch{}iu(He,e).catch(n=>li.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){li.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){au(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var ng=new M("Settings"),rg={plugins:{}},j=new ui(structuredClone(rg)),og=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function ig(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function C(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?Ie(n):{}},get plain(){let n=e.pluginName;return n?j.plain.plugins[n]??{}:{}}};return e}async function ag(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function du(){let t=di(await ag(He)),e=di(await ou(He)),n=null;try{n=di(localStorage.getItem(He))}catch{n=null}let r=uu([t,e,n]);if(r){let o=r.bag.plugins;o&&(j.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);ng.info("Loaded settings from",i,"richness",r.score,"gm",ln(t),"idb",ln(e),"ls",ln(n))}j.releasePersist(),r&&(r.index!==0||r.score>ln(t))&&j.persistLoadedBag()}function Ie(t){return j.plain.plugins[t]||(j.plain.plugins[t]={}),j.store.plugins[t]}function fu(t,e){e&&(e.pluginName=t,Ie(t),j.setDefaultGetter(og(t),n=>{if(n!=="enabled")return ig(e.def,n)}))}function mu(){return Ie("Settings")}function fi(){return mu().pinnedPlugins??[]}function pu(t){return fi().includes(t)}function gu(t){let e=fi(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function mi(){return mu().starredPlugins??[]}function bu(t){return mi().includes(t)}function hu(t){let e=mi(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var pi=new M("PluginManager"),de={},_r=new Set;function yu(t){if(de[t.name]){pi.warn("Duplicate plugin",t.name);return}de[t.name]=t,fu(t.name,t.settings)}function Wn(t){let e=de[t];if(!e)return!1;if(e.required)return!0;let n=j.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function vu(t){let e=de[t];if(!e||e.required)return;let n=!Wn(t);Ie(t),j.store.plugins[t].enabled=n,n?xu(e):sg(e),sn("pluginToggle",{name:t,enabled:n})}function xu(t,e=!1){if(!_r.has(t.name)&&Wn(t.name))try{t.managedStyle&&eu(t.managedStyle),t.start?.(),_r.add(t.name),t.settings&&j.addPrefixChangeListener(`plugins.${t.name}.`,()=>{_r.has(t.name)&&t.onSettingsChange?.()}),e||pi.debug("Started",t.name)}catch(n){pi.error("Failed to start",t.name,n)}}function sg(t){if(_r.has(t.name)){try{t.stop?.()}catch(e){pi.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(nu(t.managedStyle),L(t.managedStyle)),_r.delete(t.name)}}function qr(t){for(let e of Object.values(de))(e.startAt??"DOMContentLoaded")===t&&xu(e)}var Ls=/\/c\/([a-zA-Z0-9_-]{8,})/i;function $r(t){let e=String(t||"").split(/[?#]/)[0]||"",n=e;try{/^https?:/i.test(e)&&(n=new URL(e).pathname)}catch{}let r=n.replace(/\/$/,"")||"/";return r==="/"||r==="/g"?!0:r.startsWith("/g/")?!Ls.test(r):!1}function lg(){let t=new URLSearchParams(location.search||"");return t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||""}function _t(){let t=ut(location.pathname);if(t)return t;let e=lg();return e||""}function fe(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ut(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Ls)?.[1]??""}catch{return t.match(Ls)?.[1]??""}}function R(){return ut(location.pathname)}var Ms=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i,cg=/[?&](?:num_turns|limit|before|after|before_node|after_node|cursor)=/i;function Cs(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function As(t){return Cs(t)||/\/backend-api\/(?:f\/)?conversation\/(?:init|prepare|resume)(?:[/?#]|$)/i.test(t)?!1:/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)}function Hs(t,e){return e!=="GET"||Cs(t)?!1:Ms.test(t)}function Is(t){return Ms.test(t)&&cg.test(t)}function gi(t){return t.match(Ms)?.[1]??""}function Rs(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Rs(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Fr(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function wu(t){let e=Fr(t);return e?!e.mapping&&Fr(e.conversation)?e.conversation:e:null}function Eu(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function ug(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=Eu(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?Eu(n.text):""}function dg(t){if(Fr(t.metadata)?.is_visually_hidden_from_conversation===!0)return"";let r=Fr(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function fg(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?Rs(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function mg(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null,c=l?dg(l):"",u=l&&typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:l?ug(l):""};u!==o&&(d.alias=o);let f=l?Rs(l.create_time??l.createTime):null;f&&(d.at=f),n.push(d)}o=typeof s.parent=="string"?s.parent:null}return n.reverse(),n}function ks(t){return t.length<=480?t:t.slice(t.length-480)}function Ns(t,e){if(!e.length)return t;if(!t.length)return ks(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(b=>b.id)),m=n.has(e[e.length-1].id),p=e.filter(b=>!f.has(b.id));return ks(m?[...p,...t]:[...t,...p])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return ks([...s,...l,...u,...d])}function pg(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=fg(t,n);return r?mg(n,r):[]}function Ps(t){let e=wu(t);if(!e)return[];let n=e.mapping;return!n||typeof n!="object"||Array.isArray(n)?[]:!(typeof e.current_node=="string"||typeof e.current_node_id=="string"||typeof e.currentNode=="string")&&typeof e.title!="string"?[]:pg(e)}function Su(t,e=""){let n=Fr(t);if(!n)return e;let r=wu(t)??n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function Tu(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var Cu=new M("Harvest"),gg=1500,bg=200,hg=8,bi=new Set,hi=new Map,yi=new Map,vi=new Map,Lu=[],Vn=null,xi=null,jr=null,qt=0,Au=!1;function yg(){return typeof unsafeWindow<"u"?unsafeWindow:window}function vg(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function xg(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var Eg=/"action"\s*:\s*"(next|continue|variant)"/i;function wg(t,e,n){return!(e!=="POST"||!As(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Eg.test(n))}function Hu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Sg(t){return typeof t=="string"?Hu(t):""}function Os(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Os(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Bs(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function ku(t,e,n){!t||!e||yi.get(t)!==e&&(yi.set(t,e),Bs(yi,gg),me({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Tg(t,e){let n=e.trim();!t||!n||hi.get(t)!==n&&(hi.set(t,n),Bs(hi,bg),me({type:"conversation-meta",conversationId:t,title:n}))}function Lg(t,e,n=""){if(n&&Is(n))return;let r=Su(e,t);if(!r)return;let o=Ps(e);if(!o.length)return;let i=vi.get(r)??[],a=Ns(i,o);Tu(i,a)||(vi.set(r,a),Bs(vi,hg),me({type:"conversation-chain",conversationId:r}))}function zr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)zr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Tg(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Os(l.create_time??l.createTime??l.created_at);c&&u&&ku(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Os(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&ku(a,s,o),r.mapping&&typeof r.mapping=="object")zr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&zr(l,o,n+1)}function Mu(t,e){if(t)try{zr(JSON.parse(t),e)}catch{}}function me(t){for(let e of Array.from(bi))try{e(t)}catch{}}async function kg(t,e,n,r){if(n===qt)try{let o=await t.json();if(n!==qt)return;zr(o,e),Lg(e,o,r)}catch{}}async function Mg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===qt&&me({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===qt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=Hu(c);m&&(o=m,me({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let p=m.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||Mu(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===qt&&Mu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===qt&&me({type:"post-end",conversationId:o,error:i})}function Cg(t,e,n){let r=vg(e),o=xg(e,n),i=Hs(r,o),a=wg(r,o,n?.body),s=qt,l="";return a&&(l=Sg(n?.body)||gi(r)||ut(r)||R(),me({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==qt||!i&&!a)return c;try{let u=c.clone();i?kg(u,gi(r)||R(),s,r):Mg(u,l,!c.ok,s)}catch{a&&me({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===qt&&me({type:"post-end",conversationId:l,error:!0}),c})}function Iu(){if(Vn)return;let t=yg();jr=t,Vn=t.fetch.bind(t);let e=(n,r)=>Cg(Vn,n,r);xi=e,t.fetch=e,Cu.debug("conversation fetch harvest hooked")}function Ag(){qt+=1,!(!Vn||!jr)&&(xi&&jr.fetch===xi&&(jr.fetch=Vn),Vn=null,xi=null,jr=null,Cu.debug("conversation fetch harvest unhooked"))}function Hg(){qt+=1,!Au&&Ag()}function Ru(){Au=!0,Iu()}function Nu(t){}function kt(t){return bi.add(t),Iu(),()=>{bi.delete(t),bi.size===0&&Hg()}}function Yn(t){return t?hi.get(t)??"":""}function Ei(t){return t?yi.get(t)??null:null}function Gr(t){return t?vi.get(t)??Lu:Lu}var Ur=!1,wi=!1,Ds=!1,Ou=[],Bu=[],Du=[];function _s(t){let e=t.splice(0);for(let n of e)n()}function Kr(){Ur||(Ur=!0,_s(Ou))}function qs(){wi||(wi=!0,Ur||Kr(),_s(Bu))}function _u(){Ds||(Ds=!0,Ur||Kr(),wi||qs(),_s(Du))}function Si(t){Ur?t():Ou.push(t)}function Ti(t){wi?t():Bu.push(t)}function Li(t){Ds?t():Du.push(t)}function ki(){Kr()}function Xn(){Kr(),qs()}function Mi(){_u()}function Pu(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function qu(){await Pu(4e3),Kr(),await Pu(4e3),qs(),_u()}var S={p:"0-V-linuxdo"},Mt="[20260928] v1.4.117",$u="https://github.com/0-V-linuxdo/Bloom";var Ig={BetterNavigator:1790577403e3,ChatListStatus:1790577403e3,ChatStateFavicons:1790597436e3,Cleaner:1790577403e3,ComposerOpacity:1790577403e3,CustomSidebarIdentity:179060002e4,GreetingCustomizer:1790577403e3,InputHistory:1789858186e3,MessageTimestamps:1790577403e3,NoDictation:1790577403e3,NoShareLink:1790577403e3,NoSidebarIdentity:179060002e4,PromptQueue:179060002e4,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:179060002e4,StreamerMode:1790578442e3,WiderChat:1790577403e3};function Fu(t){let e=Ig[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}var $s=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]',"[data-bloom-profile-chip]"].join(","),Rg=["#stage-slideover-sidebar","#stage-popover-sidebar","[data-app-action-sidebar-scroll]","[data-sidebar-destination]",'[data-testid="desktop-app-shell"]'].join(","),Ci=["#stage-sidebar-tiny-bar","[data-app-navigation-rail]"].join(","),ju='a[href^="/c/"], a[href*="/c/"]',Fs=["#thread-bottom-container","#thread-bottom",'[data-type="unified-composer"]'].join(", "),zu=['form[data-type="unified-composer"]',"form.w-full[data-type]","form:has(#prompt-textarea)",'form:has([data-testid="prompt-textarea"])','form:has(textarea[name="prompt"])',"form:has(#mobile-composer-prompt)",'form:has([data-testid="mobile-composer-prompt"])','[data-type="unified-composer"]'].join(", "),Wr=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]","#mobile-composer-prompt",'[data-testid="mobile-composer-prompt"]','textarea[name="prompt"]','form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]','form[data-type="unified-composer"] [contenteditable="true"]','[contenteditable="true"][role="textbox"]','[data-lexical-editor="true"]','textarea[placeholder*="Ask ChatGPT" i]','textarea[aria-label*="Ask ChatGPT" i]','textarea[aria-label*="Message" i]'].join(", "),lw=["#thread",'[data-testid="conversation-panel"]',"[data-chatgpt-conversation-selection-target]","main"].join(", "),Gu=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]',"[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids]","[data-chatgpt-search-message-ids]"].join(", "),Uu=["[data-message-id]","[data-chatgpt-search-message-ids]"].join(", "),Ai=['#thread section[data-testid^="conversation-turn-"][data-turn="assistant"]','#thread article[data-testid^="conversation-turn-"][data-turn="assistant"]','[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids] [data-message-author-role="assistant"]','[data-chatgpt-search-message-ids] [data-message-author-role="assistant"]','[data-chatgpt-search-message-ids][data-message-author-role="assistant"]','[data-chatgpt-search-message-ids][aria-busy="true"]','[data-message-author-role="assistant"]'].join(", "),Ng="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item, #bloom-bn-host, #bloom-pq-chip, #bloom-rt-host";function cn(t){return!!t.closest(Ng)}function it(t,e=document){try{let n=e.querySelector(t);return n instanceof HTMLElement?n:null}catch{return null}}function Hi(){try{return!!(document.getElementById("stage-slideover-sidebar")||document.getElementById("stage-popover-sidebar")||it(Ci)||it(Rg)||it($s)||it("[data-sidebar-destination]"))}catch{return!1}}function Ku(){try{return!!it(Wr)}catch{return!1}}function Wu(){let t=document.getElementById("stage-slideover-sidebar");if(t instanceof HTMLElement&&t.isConnected&&!cn(t))return t;let e=document.getElementById("stage-popover-sidebar");if(e instanceof HTMLElement&&e.isConnected&&!cn(e))return e;let n=it("[data-app-action-sidebar-scroll]");if(n&&!cn(n)){let a=n.closest("nav")??n.parentElement??n;return a instanceof HTMLElement&&!cn(a)?a:n}let r=it("[data-app-navigation-rail]");if(r&&!cn(r))return r;let o=it("nav");if(o&&!cn(o))return o;let i=it('[data-testid="desktop-app-shell"]');return i&&!cn(i)?i:null}function Ii(){let t=document.getElementById("thread");if(t instanceof HTMLElement&&t.isConnected)return t;let e=it('[data-testid="conversation-panel"]');if(e)return e;let n=it("[data-chatgpt-conversation-selection-target]");return n||it("main")}function js(t){let e=[],n=o=>{o&&!e.includes(o)&&e.push(o)};n(t.getAttribute("data-message-id")),n(t.getAttribute("data-turn-id"));let r=t.getAttribute("data-chatgpt-search-message-ids")||"";for(let o of r.split(/\s+/))n(o);try{n(t.querySelector("[data-message-id]")?.getAttribute("data-message-id")),n(t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id"))}catch{}return e}function Ri(t){let e=js(t);return e[e.length-1]||""}function Re(t){return t instanceof HTMLElement?t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail"):!1}function Pg(){try{return!!document.querySelector('a[href^="/c/"], a[href*="/c/"], a[href^="/g/"]')}catch{return!1}}function Og(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, [data-app-navigation-rail] img, [data-bloom-profile-chip] img, [data-bloom-csi-slot] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function zs(){try{return Ku()||!!document.querySelector(Wr)}catch{return!1}}function un(){return zs()?Pg()||Og()||Hi():!1}function Vu(){return un()}var Us=$s,Yu=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Bg=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Dg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function $t(t){return t.id==="bloom-root"||!!t.closest(Dg)}function Xu(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Ni(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Gs(t){if(!(t instanceof HTMLElement)||!t.isConnected||$t(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Ni(e)?!1:t.getClientRects().length>0}function Yt(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-popover-sidebar"||t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail")||t.hasAttribute("data-app-action-sidebar-scroll")}function _g(t){return t.tagName==="BUTTON"||t.tagName==="A"||t.getAttribute("role")==="button"}function Pi(t){if($t(t))return!1;let e=t.getAttribute("data-testid")||"";if(/profile|account/i.test(e))return!0;let n=`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`;if(/profile|account|账号|账户|头像/i.test(n)||t.querySelector("img, [data-bloom-csi-slot], [data-bloom-profile-chip], [class*='rounded-full']")||t.querySelector(".min-w-0, .truncate"))return!0;let r=(t.textContent||"").replace(/\s+/g,"");return!!(r.length>=1&&r.length<=3&&!/^(plus|pro|free|team|go)$/i.test(r)||/\b(plus|pro|free|team|go|business|enterprise)\b/i.test(r)&&r.length<64)}function dn(t){let e=t,n=t;for(;n&&!$t(n);)_g(n)&&Pi(n)&&(!Yt(n)||Re(n.parentElement))&&(e=n),n=n.parentElement;return e}function Zu(t){let e=Qu(t).filter(Pi);return e.length?(e.sort((n,r)=>{let o=n.getBoundingClientRect(),i=r.getBoundingClientRect();return i.width*i.height-o.width*o.height}),dn(e[0])):null}function Ju(){let t=[];for(let e of document.querySelectorAll(Us))!(e instanceof HTMLElement)||!e.isConnected||$t(e)||t.push(e);return t}function Vr(t){if(!t.isConnected||$t(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Qu(t){let e=[];try{for(let n of t.querySelectorAll('button[aria-haspopup="menu"]'))!(n instanceof HTMLElement)||!n.isConnected||$t(n)||e.push(n)}catch{}return e}function fn(){let t=Ne();if(t){let o=Zu(t);if(o){let i=o.getBoundingClientRect();if(i.width>16&&i.height>8&&i.left>=-20&&i.left<window.innerWidth/2&&i.bottom>0)return o}}let e=Ju().filter(o=>Vr(o)&&Pi(o));if(e[0])return dn(e[0]);let n=Ju().filter(Vr);if(n[0])return dn(n[0]);let r=it("[data-app-navigation-rail]");if(r){let i=Qu(r).filter(a=>{let s=a.getBoundingClientRect();return s.width>16&&s.height>16&&s.left>=0&&s.left<window.innerWidth/3&&s.bottom>0}).find(Pi)??Zu(r);if(i)return dn(i)}return null}function Zn(){for(let t of document.querySelectorAll(Ci)){if(!(t instanceof HTMLElement)||!t.isConnected||$t(t))continue;let e=t.getBoundingClientRect();if(!(e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3))return t}return null}function Ne(){let t=it("[data-app-action-sidebar-scroll]");if(!t)return null;let e=[t.nextElementSibling,t.parentElement?.nextElementSibling];for(let n of e)if(!(!(n instanceof HTMLElement)||!n.isConnected||$t(n))&&n.querySelector('button[aria-haspopup="menu"]')){if(Yt(n))try{if(n.getBoundingClientRect().height>240)continue}catch{continue}return n}return null}function Ks(t){let e=dn(t),n=Ne();if(n&&n.contains(e)){let s=e.parentElement;return s&&s!==n&&s.children.length===1&&!$t(s)&&!Yt(s)&&s.parentElement&&!Yt(s.parentElement)?s:e}let r=e.closest(Ci);if(r instanceof HTMLElement){let s=e;for(;s&&s.parentElement!==r;)s=s.parentElement;if(s&&s.parentElement===r)return s}let o=e,i=e.parentElement;i&&i.children.length===1&&!$t(i)&&!Yt(i)&&i.parentElement&&!Yt(i.parentElement)&&(o=i);let a=o.parentElement;if(a&&!Yt(a)&&!$t(a)&&a.children.length>1){let s=a.getAttribute("class")||"";if(/\bflex\b/.test(s)&&!/flex-col/.test(s)&&a.parentElement&&!Yt(a.parentElement))return a}return o}function Jn(){let t=document.querySelectorAll(Yu);for(let n of t)if(Gs(n)&&!Ni(n)&&Xu(n))return n;let e=document.querySelectorAll(Bg);for(let n of e){if(!Gs(n)||!Xu(n)||Ni(n))continue;let r=n.querySelector(Yu);return Gs(r)&&!Ni(r)?r:n}return null}function Oi(){let t=fn();if(t){let n=Ks(t),r=n.parentElement;if(r&&(!Yt(r)||Re(r)))return r;if(!Yt(n)||Re(n))return n}let e=Ne();return e||Zn()}function Bi(t){let e=fn();return e?t.composedPath().includes(e):!1}var Vs=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],qg={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function $g(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Fg(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Ws(t){let e=$g(t);return e?Fg(e)>.55?"light":"dark":null}function jg(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Ws(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Ws(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Ws(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Di(t){return t==="auto"?jg():t}function zg(t){try{let e=getComputedStyle(document.documentElement);for(let n of Vs){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function _i(t,e,n){let r=qg[e];if(n){zg(t);for(let o of Vs)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Vs)t.style.setProperty(o,r[o])}function td(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Ys=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
  position: relative;
  z-index: 2;
  background: transparent;
  pointer-events: auto !important;
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
`;var Ug="bloom-root",Zt="bloom-rail-item",Gi="bloom-account-item",pn="bloom-sidebar-panel",ro="bloom-plugin-dialog",Zi="bloom-plugin-layer",Ui="bloom-settings-css",Kg=2e3,nd=null,Wg=null,De=!1,tl=[],qi=null,Ki=null,Oe=null,Fi=null,pe=null,to=null,Yr,Qn=0,eo=0,Xr=0,Zr=null,Jr=null,Wi=null,rd=null,Qr=null,Xs=[],Vi=!1,Vg=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Yg=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Xg=new Set(["chat","ui","privacy"]),Zg=10080*60*1e3,Ji="",no="all",Xt="all";function Qi(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function od(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Jg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Qg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function tb(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function eb(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var nb={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function rb(t){return t.icon||nb[t.name]||Qi()}function Zs(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),_i(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function id(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Yi(){let t="auto",e=Di(t);Zs(nd,e,!0);let n=document.getElementById(pn);n instanceof HTMLElement&&Zs(n,e,!0);let r=document.getElementById(ro);r instanceof HTMLElement&&Zs(r,e,!0);let o=document.getElementById(Zt);o instanceof HTMLElement&&id(o),sn("schemeChange",{scheme:e,pref:t})}function ad(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function sd(){if(k("settings",Ys),document.getElementById(Ui)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Ui,t.textContent=Ys,document.head.appendChild(t)}function ob(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function ib(){for(let t of tl)t();tl=[]}function ld(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function ab(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function rl(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function sb(t){return rl(t).length>0}function ji(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function lb(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=ab(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function cb(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(lb(e,n));let i=Ie(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",tl.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??ji(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??ji(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=ld(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??ji(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function ed(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function ub(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=Ie(t.name);for(let[n,r]of rl(t)){if(n==="enabled"||r.type===5)continue;let o=ji(r);o!==void 0&&(e[n]=o)}ud(t)}function cd(t){t.key==="Escape"&&(!document.getElementById(Zi)&&!document.getElementById(ro)||(t.stopPropagation(),tr()))}function db(){Vi||(document.addEventListener("keydown",cd),Vi=!0)}function fb(){Vi&&(document.removeEventListener("keydown",cd),Vi=!1)}function tr(){ib(),fb(),document.getElementById(Zi)?.remove(),document.getElementById(ro)?.remove()}function ud(t){if(tr(),!document.body)return;let e=document.createElement("div");e.id=Zi,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Be),e.addEventListener("pointerup",Be),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&tr()});let n=document.createElement("div");n.id=ro,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Be),n.addEventListener("pointerup",Be),n.addEventListener("click",Be);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=od(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),tr()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=ed("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=ed("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=rl(t);if(c.length)for(let[u,d]of c){let f=cb(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>ub(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),db(),Yi()}function mb(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=rb(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=bu(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=tb(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let g=hu(t.name);sn("pluginStar",{name:t.name,starred:g})}),s.appendChild(c),!t.required){let b=pu(t.name),g=document.createElement("button");g.type="button",g.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,g.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),g.innerHTML=eb(b),g.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();let h=gu(t.name);sn("pluginPin",{name:t.name,pinned:h})}),s.appendChild(g)}if(sb(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=Qg(),b.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),ud(t)}),s.appendChild(b)}let u=ld(t.name,Wn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{vu(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(p),e.append(n,f,m),e}function dd(){return Object.values(de).filter(t=>!t.hidden&&t.name!=="Settings")}function pb(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Zg}function fd(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return pb(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Xg.has(r)):n.includes(e)}function gb(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function bb(){return Ji.trim()?"No plugins match your search.":Xt==="favorites"?"No favorites yet. Star a plugin to see it here.":Xt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function hb(){let t=dd();return Yg.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>fd(n,e.id)))}function yb(){if(Qr){Qr.replaceChildren();for(let t of hb()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Xt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Xt=t.id,mn()}),Qr.appendChild(e)}}}function vb(){let t=dd();if(Xt==="favorites"){let e=new Set(mi());t=t.filter(n=>e.has(n.name))}else Xt!=="all"&&(t=t.filter(e=>fd(e,Xt)));return no==="enabled"&&(t=t.filter(e=>Wn(e.name))),no==="disabled"&&(t=t.filter(e=>!Wn(e.name))),t}function mn(){if(!Zr)return;yb();let t=vb();Wi&&(Wi.placeholder=`Search ${t.length} plugins...`);let e=t,n=Ji.trim().toLowerCase();if(n&&(e=e.filter(r=>gb(r).includes(n))),Xt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Xt!=="favorites"){let r=fi();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Zr.replaceChildren();for(let r of e)Zr.appendChild(mb(r));Jr&&(Jr.hidden=e.length>0,Jr.textContent=bb())}function Be(t){t.stopPropagation()}function Js(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function ol(){document.getElementById(Zt)?.setAttribute("aria-expanded",De?"true":"false")}function xb(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function il(){tr(),Ji="",no="all",Xt="all",document.getElementById(pn)?.remove(),De=!1,ol()}function Eb(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Be),e.addEventListener("pointerup",Be),e.addEventListener("click",Be);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Qi();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Jg();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=od(),d.addEventListener("click",il),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Ji=p.value,mn()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let h of Vg){let x=document.createElement("option");x.value=h.value,x.textContent=h.label,b.appendChild(x)}b.value=no,b.addEventListener("change",()=>{no=b.value,mn()}),m.append(p,b),n.appendChild(m);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let E=document.createElement("p");return E.className="bloom-tab-empty",E.hidden=!0,n.appendChild(E),e.append(d,n),Zr=g,Jr=E,Wi=p,rd=b,Qr=f,mn(),e}function wb(t){t.classList.add("bloom-rail-dock")}function Sb(){let t=document.getElementById(Zt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Vr(t)?t:null}function Tb(){if(document.getElementById(pn)?.remove(),!document.body)return;let t=Eb(pn);wb(t),document.body.appendChild(t),De=!0,tr(),Yi(),ol(),sn("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Mt,dock:"center",rail:!!Sb()})}function al(){let t=document.getElementById(pn);if(t instanceof HTMLElement&&t.isConnected&&xb(t)){il();return}t?.remove(),Tb()}function zi(t){t.style.pointerEvents="auto",t.style.position="relative",t.style.zIndex="2"}function Lb(t){let e=t.parentElement?.closest("button, a, [role='button']");return e instanceof HTMLElement&&e!==t?e:null}function kb(){let t=document.createElement("button");t.type="button",t.id=Zt,t.className="bloom-rail-item",t.setAttribute("aria-controls",pn),t.setAttribute("aria-expanded",De?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Qi()}</span><span>Bloom++</span>`,zi(t);let e=n=>{n.preventDefault(),n.stopPropagation(),typeof n.stopImmediatePropagation=="function"&&n.stopImmediatePropagation(),al()};return t.addEventListener("pointerdown",n=>{n.stopPropagation(),typeof n.stopImmediatePropagation=="function"&&n.stopImmediatePropagation()}),t.addEventListener("click",e),t}function Qs(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Mb(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Cb(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Pe(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function md(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Mb(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Pe(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Pe(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Pe(n,"width",l),Pe(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Pe(t,"padding-left",u);let d=Cb(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),p=Math.round(f.left-m.right);p>=0&&p<=24&&Pe(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Pe(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Pe(t,"gap",Math.round(l))}id(t)}function el(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-popover-sidebar"||t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail")||t.hasAttribute("data-app-action-sidebar-scroll")}function Ab(){if(to?.isConnected&&pe){pe.observe(to,{childList:!0});return}nl()}function Hb(t){if(el(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Ib(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Xr=0;return}Xr+=1,eo=Date.now()+Math.min(8e3,250*2**Math.min(Xr,5))})}function Rb(){Qn||Date.now()<eo||(Qn=requestAnimationFrame(()=>{Qn=0,!(Date.now()<eo)&&(document.getElementById(Zt)?.isConnected||Xi())}))}function Xi(){if(!document.body)return;pe?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Zt);t=n instanceof HTMLButtonElement?n:kb();let r=fn(),o=Zn();if(r){let i=Ks(r),a=i.parentElement,s=!!(a&&Re(a));if(el(i)&&!Re(i)||a&&el(a)&&!s)return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0);let l=Lb(t);l&&(l.before(t),e=!0),zi(t),r.hasAttribute("data-bloom-profile-chip")||r.setAttribute("data-bloom-profile-chip","");let c=(a?.getBoundingClientRect().width??0)>=80,u=(s||Re(i))&&!c;Qs(t,u?!0:void 0),md(t,r)}else if(Ne()){let i=Ne();t.parentElement!==i&&(i.prepend(t),e=!0),zi(t),Qs(t)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),zi(t),Qs(t,!0)):t.isConnected&&!Vr(t)&&(t.remove(),t=null)}finally{Ib(t,e),Ab(),ol()}}function nl(){let t=Oi();!t||!Hb(t)||to===t&&pe||(pe?.disconnect(),to=t,pe=new MutationObserver(()=>{document.getElementById(Zt)?.isConnected||Rb()}),pe.observe(t,{childList:!0}))}function Nb(){Xi(),nl(),Yr===void 0&&(Yr=window.setInterval(()=>{let t=document.getElementById(Zt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=eo&&Xi();else{Xr=0;let e=fn();e&&md(t,e)}nl()},Kg))}function Pb(){Yr!==void 0&&(clearInterval(Yr),Yr=void 0),Qn&&cancelAnimationFrame(Qn),Qn=0,eo=0,Xr=0,pe?.disconnect(),pe=null,to=null}function Ob(t){Fi===t&&Oe||(Oe?.disconnect(),Fi=t,Oe=new MutationObserver(()=>{if(!t.isConnected){Oe?.disconnect(),Oe=null,Fi=null;return}pd(t)}),Oe.observe(t,{childList:!0}))}function pd(t){if(Ob(t),t.querySelector(`#${Gi}`))return;let e=document.createElement("button");e.type="button",e.id=Gi,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Qi()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Js),e.addEventListener("pointerup",Js),e.addEventListener("click",n=>{Js(n),al()}),t.insertBefore(e,t.firstChild)}function $i(){let t=Jn();return t?(pd(t),!0):!1}function Bb(t){Bi(t)&&(queueMicrotask($i),requestAnimationFrame(()=>{$i()}),window.setTimeout($i,60),window.setTimeout($i,180))}function Db(){Ki?.abort();let t=new AbortController;Ki=t,document.addEventListener("click",Bb,{signal:t.signal})}function _b(){Ki?.abort(),Ki=null,Oe?.disconnect(),Oe=null,Fi=null}function gd(){Xn(),ob(()=>{sd(),ad(),Xi(),al()})}var bd=w({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Ug}`,`#${Zt}`,`#${Gi}`,`#${pn}`,`#${Zi}`,`#${ro}`,`#${Ui}`,"#bloom-menu-panel"],start(){sd(),ad(),Nb(),Db(),qi?.(),qi=td(Yi),Yi(),Xs=[Kn("pluginToggle",()=>{De&&mn()}),Kn("pluginPin",()=>{De&&mn()}),Kn("pluginStar",()=>{De&&mn()})]},stop(){Pb(),_b(),qi?.(),qi=null;for(let t of Xs)t();Xs=[],il(),document.getElementById(Zt)?.remove(),document.getElementById(Gi)?.remove(),document.getElementById(Ui)?.remove(),nd=null,Wg=null,Zr=null,Jr=null,Wi=null,rd=null,Qr=null,De=!1}});var ta=zu,Jt=Wr,er=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]','form button[aria-label^="Send" i]','form button[aria-label="Send prompt"]','form button[aria-label="\u53D1\u9001"]','#thread-bottom-container button[aria-label^="Send" i]','#thread-bottom button[aria-label^="Send" i]','form button[type="submit"]'].join(", "),hd=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','button[data-testid*="stop-button" i]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]','form button[aria-label*="Stop streaming" i]','form button[aria-label*="Stop generating" i]','form button[aria-label*="\u505C\u6B62\u751F\u6210"]','form button[aria-label*="\u505C\u6B62\u8F93\u51FA"]','#thread-bottom-container button[aria-label*="Stop streaming" i]','#thread-bottom-container button[aria-label*="Stop generating" i]','#thread-bottom button[aria-label*="Stop streaming" i]','#thread-bottom button[aria-label*="Stop generating" i]'].join(", "),yd=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),qb=/stop streaming|stop generating|停止生成|停止输出|停止响应/,$b='[contenteditable="false"], button, [role="button"]';function vt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function gn(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!vt(o)))return o;return null}function Ed(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function q(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Ed(t);return!!(qb.test(n)||/^stop$/i.test(n))}function Ct(){let e=Array.from(document.querySelectorAll(ta)).find(vt);if(e instanceof HTMLElement)return e;let n=gn(document,Jt),r=n?.closest("form")??n?.closest(Fs)??document.getElementById("thread-bottom-container")??document.getElementById("thread-bottom")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function at(){let t=Array.from(document.querySelectorAll(Jt));return t.find(vt)??t[0]??null}function Fb(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest($b);return!!n&&n!==e&&e.contains(n)}var jb='textarea[name="prompt"], #mobile-composer-prompt, [data-testid="mobile-composer-prompt"]';function oo(t){if(!t)return null;try{let e=t.querySelector(jb);if(e instanceof HTMLTextAreaElement||e instanceof HTMLInputElement)return e}catch{}return null}function vd(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Fb(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function wd(t){return t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement}function xd(t){return!!t?.value.replaceAll("\u200B","").trim()}function Qt(t){let e=t??at();if(e&&Ft(e).replaceAll("\u200B","").trim())return!0;if(t)return!1;let n=Ct();if(n&&n!==document.body&&xd(oo(n)))return!0;let r=document.getElementById("thread-bottom-container")??document.getElementById("thread-bottom");return!!(r&&xd(oo(r)))}function _e(t){return!Qt(t)}function ea(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Sd(t){let e=Ct();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!vt(n))&&t(n))return n;return null}function qe(){let t=Ct(),e=gn(t,er)??gn(document,er);return e&&!q(e)?e:Sd(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!q(n);let o=Ed(n);return/^(send|send prompt|发送)$/i.test(o)&&!q(n)?!0:n.getAttribute("type")==="submit"&&!q(n)})}function bn(){let t=Ct(),e=gn(t,hd,!0)??gn(document,hd,!0);if(e)return e;let n=gn(t,yd)??gn(document,yd);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&vt(r)&&q(r))return r}return Sd(q)}function Ft(t){if(wd(t))return t.value;let e=t.querySelectorAll("p");if(e.length){let a=Array.from(e,s=>vd(s,t)).join(`
`);if(a.replaceAll("\u200B","").trim())return a}let n=vd(t,t);if(n.replaceAll("\u200B","").trim())return n;let r=oo(t);if(r?.value.replaceAll("\u200B","").trim())return r.value;let o=t.closest("form");if(o&&o.contains(t)){let a=oo(o);if(a?.value.replaceAll("\u200B","").trim())return a.value}let i=t.closest(Fs);if(i instanceof HTMLElement){let a=oo(i);if(a&&(i.contains(t)||t.contains(i))&&a.value.replaceAll("\u200B","").trim())return a.value}return n}function sl(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function ge(t,e,n=!1){if(wd(t)){t.focus(),t.value=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"}));try{let i=n?0:e.length;t.setSelectionRange(i,i)}catch{}return}t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),sl(t,n)}var zb=/^(?:pro[\s-]*thinking|thinking|working|configuring|searching(?:\s+the\s+web)?|analyzing|reading|正在思考|思考中|正在工作|配置中|正在配置|搜索中|正在搜索|分析中|正在分析|读取中|正在阅读)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Gb=/^(?:configuring|searching(?:\s+the\s+web)?|analyzing|reading|配置中|正在配置|搜索中|正在搜索|分析中|正在分析|读取中|正在阅读)\b/i;function te(t){let e=String(t??"").replace(/\s+/g," ").trim();if(!e)return!1;if(e.length<=32&&zb.test(e))return!0;if(e.length>64||!Gb.test(e))return!1;let n=e.replace(/(?:…|\.{3})$/,"");return!/[.!?。]/.test(n)}function Ub(t){return te(t.ariaLabel||"")||te(t.text||"")?!!(t.ariaExpanded==="true"||t.ariaBusy==="true"||t.detailsOpen||t.hasSpinner):!1}function Kb(t){try{return!!t.querySelector("svg.animate-spin, .animate-spin")}catch{return!1}}function $e(t){let e=t.closest("details");return Ub({text:t.childElementCount<=4&&t.textContent||"",ariaLabel:t.getAttribute("aria-label")||"",ariaExpanded:t.getAttribute("aria-expanded"),ariaBusy:t.getAttribute("aria-busy"),detailsOpen:e instanceof HTMLDetailsElement&&e.open,hasSpinner:Kb(t)})}var Cd=new M("Streaming");function lo(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!vt(e))&&(q(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Wb(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&vt(t))}function Vb(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&vt(t))}function Yb(){try{return!!document.querySelector(['[data-message-author-role="assistant"][aria-busy="true"]','[data-turn="assistant"][aria-busy="true"]','section[data-testid^="conversation-turn-"][aria-busy="true"]','.result-streaming[aria-busy="true"]',".result-streaming",'[data-chatgpt-search-message-ids][aria-busy="true"]'].join(", "))}catch{return!1}}var Td="#bloom-root, #bloom-bn-host, #bloom-pq-chip, #bloom-rt-host, #bloom-sidebar-panel, #bloom-plugin-layer";function Ld(t){return te(t)}function Ad(t){let e=[];try{if(t instanceof Element&&t.closest(Td))return e;t instanceof HTMLElement&&e.push(t);for(let n of t.querySelectorAll('button, [role="button"], [aria-expanded], summary, [class*="thinking"], [class*="reasoning"]'))n.closest(Td)||e.push(n)}catch{}return e}function kd(t){for(let e of Ad(t))if($e(e))return!0;return!1}function Xb(t){for(let e of Ad(t)){if(Ld(e.getAttribute("aria-label")||""))return!0;if(!(e.childElementCount>4)&&Ld(e.textContent||""))return!0}return!1}function Zb(t){try{let e=t.querySelector(".markdown");return e instanceof HTMLElement?!!(e.innerText||e.textContent||"").replace(/\s+/g," ").trim():!1}catch{return!1}}function Hd(){try{let t=document.querySelectorAll(Ai),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Jb(){try{let t=Hd();if(t&&(kd(t)||!Zb(t)&&Xb(t)))return!0;let e=document.getElementById("thread-bottom-container")??document.getElementById("thread-bottom");if(e&&kd(e))return!0}catch{}return!1}function Qb(){let t=Hd();if(!t)return!1;try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin")){if(e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))continue;let n=e.parentElement;if(!(!vt(e)&&!vt(n)))return!0}}catch{}return!1}function ee(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function W(){if(bn()||lo()||Yb()||Jb()||Qb())return!0;let t=qe();return t&&vt(t)&&!q(t)?!1:!!(Wb()||Vb())}var th=400,Md=3,xn=new Set,yn,io=null,ll=null,vn=!1,hn=0,je="",ze="",be=!1,ao=!1,so=!1,jt=!1,J=null,dt="",Ge=!1;function z(){return jt}function En(){return be}function oa(){return dt}function he(){if(be||jt)return!1;if(Ge&&!R())return!0;if(!dt)return!1;let t=R();return!t||t===dt}function cl(){return R()||dt}function Id(){return fe(_t())}function na(t,e){return{streaming:t,contextKey:e,conversationId:cl()}}function ul(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function eh(t){return $r(t)}function V(t,e){if(!t||t===e)return!1;let n=ut(ul(e)||e);return!n||!(t.endsWith("|draft")||eh(ul(t)))?!1:dt?n===dt:Ge}function ra(){vn=!1,hn=0,je="",be=!1,ao=!1,so=!1,dt="",Ge=!1}function nh(t){for(let e of Array.from(xn))try{e.onFall?.(t)}catch{}}function rh(t){for(let e of Array.from(xn))try{e.onRise?.(t)}catch{}}function Fe(t){for(let e of Array.from(xn))try{e.onTick?.(t)}catch{}}function oh(t,e){for(let n of Array.from(xn))try{n.onContext?.(t,e)}catch{}}function ih(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&q(n)&&(be=!0)}function ah(t){if(t.type==="post-start"){let n=R();if(!t.conversationId){n||(Ge=!0),(!n||n===dt)&&(jt=!1,be=!1),yn!==void 0&&dl();return}if(!(t.conversationId===n||t.conversationId===dt)&&!(!n&&Ge))return;dt=t.conversationId,Ge=!1,jt=!1,be=!1,yn!==void 0&&dl();return}if(t.type!=="post-end"||!vn&&!J)return;let e=R();t.conversationId&&!(e?t.conversationId===e:t.conversationId===dt)||(so=!0,t.error&&(ao=!0,J&&(J.error=!0)))}function dl(){let t=Id(),e=W();if(ze&&t&&ze!==t){let o=ze;if(!V(o,t))J=null,ra(),jt=e;else{let i=ut(ul(t));if(i&&!dt&&(dt=i,Ge=!1),je===o&&(je=t),J&&J.contextKey===o){J.contextKey=t;let a=cl();a&&(J.conversationId=a)}jt=!1}if(ze=t,oh(t,o),jt){Fe(na(!1,t));return}}else t&&(ze=t);if(jt){if(e){Fe(na(!1,t));return}jt=!1}if(J)if(e||J.contextKey!==t)J=null;else{let o=J;J=null,ra(),nh(o),Fe(na(!1,t));return}let n=na(e,t);if(e){let o=!vn;o&&(be=!1,ao=!1,so=!1),vn=!0,hn=0,je=t,o&&rh(n),Fe(n);return}if(!vn){Fe(n);return}if(hn+=1,so&&(hn=Math.max(hn,Md)),hn<Md){Fe(n);return}if(!(!!je&&je===t)){ra(),Fe(n);return}J={contextKey:je||t,conversationId:cl(),userStopped:be,error:ao||ee()},Fe(n)}function sh(){yn===void 0&&(vn=W(),ze=Id(),je=vn?ze:"",hn=0,be=!1,ao=!1,so=!1,jt=!1,J=null,dt="",Ge=!1,io?.abort(),io=new AbortController,document.addEventListener("click",ih,{capture:!0,signal:io.signal}),ll=kt(ah),yn=setInterval(dl,th),Cd.debug("watchStreamingEdge started"))}function lh(){xn.size||(yn!==void 0&&(clearInterval(yn),yn=void 0),io?.abort(),io=null,ll?.(),ll=null,ra(),ze="",jt=!1,J=null,Cd.debug("watchStreamingEdge stopped"))}function ft(t){let e=typeof t=="function"?{onFall:t}:t;return xn.add(e),sh(),()=>{xn.delete(e),lh()}}var Rd="bloom-host-icon",co="data-bloom-host-rel",fl="not all",ml=0,Nd=0,ch=400;function Pd(t){ml+=1;try{t()}finally{ml-=1}}function ia(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Ue(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Od(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function uh(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function dh(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Nd<ch||(Nd=n,t.appendChild(e))}function fh(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||ia(n)&&(n.getAttribute(co)||n.setAttribute(co,n.rel),n.media!==fl&&(n.media=fl),n.rel!==Rd&&(n.rel=Rd))}function mh(t){for(let e of t.querySelectorAll(`link[${co}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(co);n&&(e.rel=n),e.removeAttribute(co),e.media===fl&&e.removeAttribute("media")}}function Bd(t,e){let{head:n}=document;!n||!e||Pd(()=>{fh(n,t);let r=Od(t),{type:o,sizes:i}=uh(e);r?dh(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Dd(t,e){let{head:n}=document;n&&Pd(()=>{Od(t)?.remove(),mh(n)})}function _d(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(ml)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:ia(c.target)&&(a=!0,Ue(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)ia(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)ia(u)&&u.id!==t&&(a=!0,Ue(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var ph=["original","badge","dot","hole","bg"],Fd=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],jd={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},aa="#FCFCFC",gh="#111111",qd="#111111",bh="#ffffff",hh="#212121",yh="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",vh={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},sa=32,$d=64;function zd(t){return typeof t=="string"&&ph.includes(t)}function xh(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function la(t){let e=document.createElement("canvas");e.width=sa,e.height=sa;let n=e.getContext("2d");return n?(n.scale(sa/$d,sa/$d),t(n),e.toDataURL("image/png")):""}function Eh(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ca(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(yh);n&&(t.strokeStyle=gh,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function wh(t,e,n){let r=jd[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=qd,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=qd,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=bh,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function uo(t,e){if(t==="original")return e==="wait"?la(r=>ca(r,aa)):xh(vh[e]);let n=e==="wait"?void 0:jd[e];return la(t==="hole"?r=>ca(r,n??aa):t==="bg"?r=>{r.fillStyle=n??hh,Eh(r,0,0,64,64,14),r.fill(),ca(r,aa,!1)}:r=>{ca(r,aa),e!=="wait"&&wh(r,e,t==="dot"?"dot":"badge")})}function Gd(t){return{wait:uo(t,"wait"),rotate:uo(t,"rotate"),done:uo(t,"done"),ready:uo(t,"ready"),error:uo(t,"error")}}var Sh=new M("ChatStateFavicons"),Sn="bloom-chat-state-favicon",Yd=["input","beforeinput","cut","paste","compositionend"],Xd=C({style:{type:3,description:"Favicon overlay",options:Fd}}),ne="",bl={wait:"",rotate:"",done:"",ready:"",error:""},fo="wait",mt=!1,Q=!1,D=null,xt="",At="",Ln=!0,fa=!1,nr=null,Ht=0,ua=null,da=null,wn=null,gl=null,rr=null,zt=!1,Ud=new WeakSet;function Th(){let t=Xd.store.style;return zd(t)?t:"bg"}function Zd(){let e=document.querySelector(`link[rel~="icon"]:not(#${Sn}), link[data-bloom-host-rel]:not(#${Sn})`)?.href;return Ue(e)?e:Ue(ne)?ne:""}function Lh(){let t=document.getElementById(Sn);return t instanceof HTMLLinkElement?t:null}function kh(){if(!Ue(ne)){let t=Zd();t&&(ne=t)}return Ue(ne)?ne:bl.wait}function Jd(t){return t==="wait"?kh():bl[t]}function Qd(){Bd(Sn,Jd(fo))}function $(t){let e=Jd(t);if(fo===t){let n=Lh();if(n&&n.getAttribute("href")===e)return}fo=t,Qd()}function Kd(){bl=Gd(Th()),$(fo)}function hl(){return fe(_t())}function yl(t,e){!t||!e||t===e||(D===t&&(D=e),xt===t&&(xt=e),At===t&&(At=e))}function Mh(){let t=hl();if(!(W()||he()||mt||Q))return xt="",t;if(xt&&t&&xt!==t)if(V(xt,t))yl(xt,t),xt=t;else return xt="",t;else!xt&&t&&(xt=t);return xt||t}function Wd(t){return!D||!t?!1:D===t?!0:V(D,t)}function tf(){mt=!1,Q=!1,D=null,xt=""}function ef(t){At=t,tf(),Ln=!1,fa=!0,$("wait")}function pl(t){return!t&&Ln}function Ch(){if(!zt)return;let t=hl();if(At&&t&&At!==t&&!V(At,t)){ef(t);return}At&&t&&V(At,t)&&yl(At,t),t&&(At=t);let e=W()||he(),n=e&&!z();if(fa){if(z()){$("wait");return}fa=!1}if(z()){$("wait");return}let r=Mh(),o=_e();if(En()&&!e){mt=!1,Q=!1,D=null,$(o?"wait":pl(o)?"ready":"wait");return}if(ee()&&!e&&mt){$("error"),mt=!1,Q=!1,D=null;return}if(n){mt||(Ln=!1),mt=!0,Q=!1,D=r,$("rotate");return}if(mt)if(!Wd(t))mt=!1,Q=!1,D=null;else if(Q){mt=!1,Q=!0,D=t||r,$("done");return}else{$("rotate");return}if(Q)if(D&&t&&!Wd(t))Q=!1,D=null;else if(o){D=r||D,$("done");return}else if(pl(o)){Q=!1,$("ready");return}else{Q=!1,$("wait");return}D=null,o?$("wait"):pl(o)?$("ready"):$("wait")}function Tn(){zt&&(sf(),rf(),of(),Ch())}function nf(){if(rr){for(let t of Yd)rr.removeEventListener(t,af,!0);rr=null}}function rf(){let t=Ct(),e=t&&t!==document.body?t:null;if(!(rr===e&&e?.isConnected)&&(nf(),!!e)){rr=e;for(let n of Yd)rr.addEventListener(n,af,{capture:!0,passive:!0})}}function of(){let t=Ct();if(!(wn&&gl===t&&t.isConnected)){if(wn?.disconnect(),gl=t,!t||t===document.body){wn=null;return}wn=new MutationObserver(()=>ma()),wn.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function ma(){if(zt){if(document.hidden){Ht&&(cancelAnimationFrame(Ht),Ht=0),Tn();return}Ht||(Ht=requestAnimationFrame(()=>{Ht=0,zt&&Tn()}))}}function af(){Qt()&&(Ln=!0),ma()}function Vd(){Qt()&&(Ln=!0),ma()}function Ah(){zt&&(Ht&&(cancelAnimationFrame(Ht),Ht=0),Tn())}function Hh(){zt&&(Ln=!1,Tn())}function Ih(t){if(!zt)return;if(t.userStopped){mt=!1,Q=!1,D=null,$("wait");return}if(t.error){mt=!1,Q=!1,D=null,$("error");return}let e=hl();if(t.contextKey&&e&&t.contextKey!==e&&!V(t.contextKey,e)){mt=!1,Q=!1,D=null,$("wait");return}mt=!1,Q=!0,D=e||t.contextKey,$("done")}function Rh(){zt&&Tn()}function Nh(t,e){if(zt){if(V(e,t)){yl(e,t),At=t,Tn();return}ef(t)}}function sf(){let t=at();!t||Ud.has(t)||(Ud.add(t),t.addEventListener("input",Vd,{capture:!0,passive:!0}),t.addEventListener("compositionend",Vd,{capture:!0,passive:!0}))}var lf=w({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Xd,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Sn}`],start(){zt=!0,ne=Zd()||ne,Kd(),da?.disconnect(),da=_d(Sn,t=>{Ue(t)&&(ne=t),Qd()}),nr?.abort(),nr=new AbortController,window.addEventListener("popstate",ma,{signal:nr.signal}),document.addEventListener("visibilitychange",Ah,{signal:nr.signal}),sf(),rf(),of(),ua?.(),ua=ft({onRise:Hh,onFall:Ih,onTick:Rh,onContext:Nh}),Tn(),Sh.debug("favicon watch started")},stop(){zt=!1,Ht&&cancelAnimationFrame(Ht),Ht=0,ua?.(),ua=null,nr?.abort(),nr=null,nf(),wn?.disconnect(),wn=null,gl=null,da?.disconnect(),da=null,tf(),At="",Ln=!0,fa=!1,fo="wait",Dd(Sn,ne)},onSettingsChange:Kd});var cf=`.bloom-ih-hud {
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
`;var p1=new M("InputHistory"),vl=/\u200B/g,uf=10,df=500,ff=100,Oh=8,Bh=120,Dh=2e3,pa=10,ga=C({maxEntries:{type:4,description:"Max stored prompts",min:uf,max:df,default:ff},history:{type:5,description:"Stored prompts",render:Jh},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),xl=new Map,tt=0,El="",re=!1,po=!1,Tl=0,mo=null,wl,Ll=null,mf=!0;function Gt(){let t=ga.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function pf(t){let e=ot(Number(ga.store.maxEntries??ff),uf,df);return t.length>e?t.slice(t.length-e):t}function ba(t){ga.store.entries=pf(t)}function _h(t){return t.replaceAll(vl,"").replace(/\n$/,"").trim()}function Sl(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Jt);return n instanceof HTMLElement?n:at()}function qh(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Ft(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(vl,"").trim().length===0,last:i.toString().replaceAll(vl,"").trim().length===0}}catch{return{first:!0,last:!0}}}function gf(t){clearTimeout(wl),wl=setTimeout(()=>{if(t!==Tl)return;po=!1;let e=Ll;e&&sl(e,mf)},Bh)}function bf(t,e,n){po=!0,Ll=t,mf=n;let r=++Tl;ge(t,e,n),gf(r)}function $h(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function or(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Fh(){document.querySelector(".bloom-ih-hud")?.remove()}function jh(t,e){let n=$h();n.textContent=t;let r=(e.closest("form")??Ct()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Oh)}px`,n.classList.add("bloom-ih-hud-on")}function kl(t){let e=_h(t);if(!e)return;let n=Date.now(),r=xl.get(e);if(r&&n-r<Dh)return;xl.set(e,n);let o=Gt().filter(i=>i!==e);o.push(e),ba(o),tt=Gt().length,re=!1,or()}function zh(t,e){let n=Gt();if(!n.length&&t)return;tt>=n.length&&(El=Ft(e),tt=n.length);let r=t?tt-1:tt+1;r<0||r>n.length||(tt=r,re=!0,bf(e,r===n.length?El:n[r],t),r<n.length?jh(`${r+1} / ${n.length}`,e):or())}function Gh(t){re=!1,or(),bf(t,El,!1),tt=Gt().length}function Uh(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Sl(t.target)??Sl(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&re&&!t.altKey&&!t.shiftKey){Gh(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){kl(Ft(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=Gt();if(!r){let i=qh(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||tt<=0)||!n&&tt>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),zh(n,e))}function Kh(t){if(Sl(t.target)){if(po){gf(Tl);return}re&&(re=!1,or(),tt=Gt().length)}}function Wh(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Jt);n instanceof HTMLElement&&kl(Ft(n))}function Vh(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(er);if(!n||!(n instanceof HTMLElement)||q(n))return;let r=at();r&&kl(Ft(r))}function Yh(t){if(!(!re||po)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}re=!1,or()}}function Xh(){if(mo)return;mo=new AbortController;let{signal:t}=mo,e={capture:!0,signal:t};window.addEventListener("keydown",Uh,e),window.addEventListener("input",Kh,e),window.addEventListener("submit",Wh,e),window.addEventListener("click",Vh,e),window.addEventListener("pointerdown",Yh,e)}function Zh(t){let e=Gt().slice();e.splice(t,1),ba(e),tt>e.length&&(tt=e.length)}function Jh(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=Gt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/pa));n>=l&&(n=l-1);let c=s.slice(n*pa,n*pa+pa);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((E,h)=>{let x=i.indexOf(E),bt=Gt().length-1-x,ht=document.createElement("div");ht.className="bloom-ih-item";let Z=document.createElement("button");Z.type="button",Z.className=`bloom-ih-body${r===h?"":" bloom-ih-clamp"}`,Z.textContent=E,Z.addEventListener("click",()=>{r=r===h?-1:h,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let ct=document.createElement("button");ct.type="button",ct.title="Copy",ct.textContent="C",ct.addEventListener("click",()=>{su(E)});let Tt=document.createElement("button");Tt.type="button",Tt.title="Delete",Tt.textContent="\xD7",Tt.addEventListener("click",()=>{Zh(bt),o()}),O.append(ct,Tt),ht.append(Z,O),g.appendChild(ht)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(ba([]),tt=0,o())}),d.append(f,m,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var hf=w({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:ga,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",cf),tt=Gt().length,re=!1,Xh()},stop(){mo?.abort(),mo=null,or(),Fh(),xl.clear(),clearTimeout(wl),po=!1,Ll=null,re=!1},onSettingsChange(){let t=Gt(),e=pf(t);e.length!==t.length&&ba(e),tt>e.length&&(tt=e.length)}});var Ml="noShareLink",Qh=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share"]','button[aria-label="Share chat"]','button[aria-label="\u5206\u4EAB"]'],ty=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Cl=C({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function yf(t){return`${t.join(",")}{display:none!important}`}function vf(){let t=[];if(Cl.store.hideShareChat!==!1&&t.push(yf(Qh)),Cl.store.hideShareProject!==!1&&t.push(yf(ty)),!t.length){L(Ml);return}k(Ml,t.join(`
`))}var xf=w({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Cl,start:vf,onSettingsChange:vf,stop(){L(Ml)}});var Sf="noDictation",ey=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]','form button[aria-label="Dictate button"]','form button[aria-label="Dictate"]','form button[aria-label="Start dictation"]','form button[aria-label="Stop dictation"]','form button[aria-label="Submit dictation"]','form button[aria-label^="Dictate" i]','form button[aria-label="\u542C\u5199"]','form button[aria-label="\u5F00\u59CB\u542C\u5199"]','form button[aria-label="\u505C\u6B62\u542C\u5199"]','form button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form button[data-testid="composer-dictate-button"]','form button[data-testid="dictation-button"]','#thread-bottom-container button[aria-label*="Dictate" i]','#thread-bottom button[aria-label*="Dictate" i]','#thread-bottom-container button[aria-label*="\u542C\u5199"]','#thread-bottom button[aria-label*="\u542C\u5199"]','#thread-bottom-container button[data-testid*="dictat" i]','#thread-bottom button[data-testid*="dictat" i]','[data-type="unified-composer"] button[aria-label*="Dictate" i]','[data-type="unified-composer"] button[aria-label*="\u542C\u5199"]','[data-type="unified-composer"] button[data-testid*="dictat" i]'],ny=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Tf=C({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Ef(t){return`${t.join(",")}{display:none!important}`}function wf(){let t=[Ef(ey)];Tf.store.hideDictationSettings!==!1&&t.push(Ef(ny)),k(Sf,t.join(`
`))}var Lf=w({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Tf,start:wf,onSettingsChange:wf,stop(){L(Sf)}});var Al="noSidebarIdentity",ir=[...Us.split(","),'[data-app-navigation-rail] button[aria-haspopup="menu"]',"[data-bloom-profile-chip]"],Cf=ir.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`,`${t} .min-w-0.flex-col .truncate`,`${t} .min-w-0.flex .truncate`]),Af=ir.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),ry=[...Cf,...Af],oy=[...Cf,...ir.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],iy=ir.map(t=>`${t} a[href^="mailto:"]`),ay=ir.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),sy=ir.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),go=C({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function kf(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function ly(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function cy(){return`${sy.join(",")}{margin-block:auto!important}`}function uy(){return`${ay.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Mf(){let t=go.store.hideUsername!==!1,e=go.store.hideEmail!==!1,n=t&&go.store.enlargePlan!==!1,r=t&&go.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(ly([...oy,...Af])),o.push(cy())):o.push(kf(ry))),e&&o.push(kf(iy)),n&&o.push(uy()),!o.length){L(Al);return}k(Al,o.join(`
`))}var Hf=w({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:go,start:Mf,onSettingsChange:Mf,stop(){L(Al)}});var If=`#bloom-rt-host {
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
`;var Pf=new M("RecentTopics"),lr="bloom-rt-host",Of="home",fy=/\/c\/([a-z0-9_-]{8,})/i,Bf=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,my=new Set(["Backquote","IntlBackslash"]),py=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),gy=140,by=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),et=C({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:by},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),ha=null,ya=null,Et=!1,Eo=!1,bo=!1,oe=0,kn="",ar=null,ho=null,sr,Hl=null,Il=null;function hy(){let t=Number(et.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function yo(){let t=et.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Nl(){let t=et.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Df(){let t=et.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Pl(){let t=et.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function xa(t){let e=hy();return t.length>e?t.slice(0,e):t}function ie(t){return t===Of}function vo(t,e=gy){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Ol(t){if(!t)return"";let e=ut(t);if(e)return e;try{return ut(new URL(t,location.origin).pathname)}catch{return t.match(fy)?.[1]??""}}function Mn(){return ut(location.pathname)||_t()||Of}function Bl(t){if(ie(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Ol(r.getAttribute("href")||"")!==t)continue;let o=vo(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Mn()===t&&e&&!/^ChatGPT$/i.test(e)?vo(e,80):""}function yy(t){if(ie(t))return"New chat";let e=Nl()[t];if(e)return e;let n=Yn(t);return n||Bl(t)||"Chat"}function vy(t){return Pl()[t]||""}function xy(t){return Df()[t]||{}}function Dl(t,e){if(!t||ie(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Nl();n[t]!==e&&(n[t]=e,et.store.titles=n)}function Ey(t){t.type==="conversation-meta"&&(Dl(t.conversationId,t.title),Et&&cr())}function wy(t,e){if(!t||ie(t)||!e)return;let n=Pl();n[t]!==e&&(n[t]=e,et.store.projects=n)}function Sy(t,e){if(!t||ie(t)||!e.user&&!e.assistant)return;let n=Df(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,et.store.previews=n)}function _l(t){if(!t||ie(t)&&et.store.includeHome===!1)return;let e=yo().filter(n=>n!==t);e.unshift(t),et.store.visits=xa(e)}function Ea(){let t=et.store.includeHome!==!1;return xa(yo().filter(n=>t||!ie(n))).map(n=>({id:n,title:yy(n),project:vy(n),preview:xy(n)}))}function Rf(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return vo(o)}catch{return""}}function xo(t){if(!t||ie(t)||t!==Mn())return;let e=Bl(t);e&&Dl(t,e);let n=Rf("user"),r=Rf("assistant");Sy(t,{user:n,assistant:r});let o=qf(t);if(o){let i=_f(o);i&&wy(t,i)}}function ql(){let t=Nl(),e=Pl(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${lr}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Ol(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=vo(c.textContent||"",80);d&&!Bf.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=_f(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(et.store.titles=t),i&&(et.store.projects=e);let a=yo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(et.store.visits=xa([...a,...l]))}function _f(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=vo((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Bf.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href*="/c/"]'))return o;e=e.parentElement}return""}function qf(t){if(ie(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Ol(e.getAttribute("href")||"")===t)return e}catch{}return null}function Ty(t){let e=qf(t);if(e){e.click();return}if(ie(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Ly(){let t=Mn();kn&&kn!==t&&xo(kn),kn=t,_l(t),ql();let e=Bl(t);e&&Dl(t,e),xo(t)}function va(){sr===void 0&&(sr=window.setTimeout(()=>{sr=void 0,Ly()},120))}function ky(){ar||(ar=history.pushState.bind(history),ho=history.replaceState.bind(history),history.pushState=function(...e){let n=ar(...e);return va(),n},history.replaceState=function(...e){let n=ho(...e);return va(),n})}function My(){ar&&(history.pushState=ar),ho&&(history.replaceState=ho),ar=null,ho=null}function Cy(t){return my.has(t.code)||t.keyCode===192?!0:py.has(t.key)}function $f(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Ay(t,e){Eo=e,ql(),xo(Mn()),Et=!0,oe=0;try{let n=Mn();_l(n);let r=Ea();r.length>1&&(oe=t?r.length-1:1)}catch(n){Pf.error("Failed to open switcher:",n)}cr()}function Nf(t){let{length:e}=Ea();e&&(oe=(oe+(t?-1:1)+e)%e,cr())}function $l(){if(!Et)return;let t=Ea()[oe];Et=!1,Eo=!1,cr(),t&&Ty(t.id)}function Ff(){Et&&(Et=!1,Eo=!1,cr())}function Hy(t){if($f(t)){bo=!0;return}if((t.ctrlKey||bo)&&!t.altKey&&!t.metaKey&&Cy(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{Et?Nf(t.shiftKey):Ay(t.shiftKey,!0)}catch(n){Pf.error("Hotkey failed:",n)}return}if(Et){if(t.key==="Escape"){t.preventDefault(),Ff();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),$l();return}t.key==="Tab"&&(t.ctrlKey||bo)&&(t.preventDefault(),Nf(t.shiftKey))}}function Iy(t){$f(t)&&(bo=!1,Et&&Eo&&$l())}function Ry(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href*="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(va)}function Ny(t){!Et||(t.target instanceof Element?t.target:null)?.closest(`#${lr}`)||Ff()}function Py(){document.visibilityState==="hidden"&&xo(Mn())}function Rl(t=ya){t instanceof HTMLElement&&_i(t,Di("auto"),!0)}function Oy(){if(!document.body)return null;let t=document.getElementById(lr);if(t instanceof HTMLElement)return ya=t,Rl(t),t;t=document.createElement("div"),t.id=lr;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ya=t,Rl(t),t}function cr(){let t=Oy();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!Et){e.dataset.visible="false",e.replaceChildren();return}let n=Ea();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}oe>=n.length&&(oe=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===oe?"true":"false",s.setAttribute("aria-selected",a===oe?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{oe=a,$l()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function By(){document.getElementById(lr)?.remove(),ya=null}var jf=w({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${lr}`],settings:et,start(){k("recentTopics",If),kn=Mn(),_l(kn),ql(),xo(kn),Hl=kt(Ey),ky(),ha=new AbortController;let{signal:t}=ha;window.addEventListener("keydown",Hy,{capture:!0,signal:t}),window.addEventListener("keyup",Iy,{capture:!0,signal:t}),window.addEventListener("popstate",va,{signal:t}),document.addEventListener("click",Ry,{capture:!0,signal:t}),document.addEventListener("click",Ny,{signal:t}),document.addEventListener("visibilitychange",Py,{signal:t}),Il=Kn("schemeChange",()=>Rl())},stop(){ha?.abort(),ha=null,sr!==void 0&&(clearTimeout(sr),sr=void 0),My(),Hl?.(),Hl=null,Il?.(),Il=null,Et=!1,Eo=!1,bo=!1,By()},onSettingsChange(){let t=xa(yo());t.length!==yo().length&&(et.store.visits=t),Et&&cr()}});var Fl="cleaner",Dy=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],_y=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs",'#thread-bottom [class*="vt-disclaimer"]',"#thread-bottom .text-token-text-secondary.text-center.text-xs","#thread-bottom .text-token-text-tertiary.text-center.text-xs",'[data-testid="desktop-app-shell"] [class*="disclaimer"]'],qy=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],$y=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Fy=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],jy=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Cn=C({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function ur(t){return`${t.join(",")}{display:none!important}`}function zf(){let t=[];if(Cn.store.hideDownloadApps!==!1&&t.push(ur(Dy)),Cn.store.hideDisclaimer!==!1&&t.push(ur(_y)),Cn.store.hideUpgrade!==!1&&t.push(ur(qy)),Cn.store.hideLockedModels!==!1&&t.push(ur($y)),Cn.store.hideHomePromo!==!1&&t.push(ur(Fy)),Cn.store.hideAds!==!1&&t.push(ur(jy)),!t.length){L(Fl);return}k(Fl,t.join(`
`))}var Gf=w({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Cn,start:zf,onSettingsChange:zf,stop(){L(Fl)}});var Sa=new M("ResponseNotification"),fr=C({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Yy},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),jl=!1,wa=null,dr=null,wo=null;function zy(){return document.visibilityState==="hidden"||document.hidden}function Gy(){return fr.store.onlyWhenHidden===!1?!0:zy()}function Uy(){let t=Yn(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Uf(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!dr||dr.state==="closed")&&(dr=new t);let e=dr,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Sa.debug("chime failed",t)}}function Ky(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Sa.debug("custom sound failed",e),Uf()}}function Kf(){let t=String(fr.store.soundUrl||"").trim();t?Ky(t):Uf()}function Wy(){let t="Bloom++",e=`${Uy()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Sa.debug("notification failed",n)}}function Vy(){Gy()&&(fr.store.sound!==!1&&Kf(),fr.store.browserNotification!==!1&&Wy())}function Yy(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Kf()),t.appendChild(e),()=>{e.remove()}}var Wf=w({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:fr,start(){jl=!0,wa?.(),wa=ft(t=>{if(!jl||t.userStopped||t.error)return;let e=R()||oa();t.conversationId&&t.conversationId!==e||Vy()}),wo?.abort(),wo=new AbortController,fr.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:wo.signal}),Sa.debug("watch started")},stop(){jl=!1,wa?.(),wa=null,wo?.abort(),wo=null;try{dr?.close()}catch{}dr=null}});var Vf=`#bloom-pq-chip {
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
`;var Xe=new M("PromptQueue"),Ma="bloom-pq-chip",Yf="promptQueue",Zy=8,Jy=50,Qy=2e3,t0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),zl=C({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),Ve=new Map,Xf=0,Kt=!1,Ut="",P="",ae=!1,wt=!1,Je=!1,B=null,So=null,Ta=null,We,Co,Ze=null,N=null,mr=null,ka=!1,st=null,An,Ye=!0,U=!1,G=!1,pt=!1;function ye(){return fe(_t())}function pr(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function e0(t){let e=pr(Ft(t));if(e)return e;if(!Qt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),pr(n.innerText||n.textContent||"")}catch{return""}}function Kl(){try{let t=document.querySelectorAll(Ai),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Wl(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Vl(t){try{if($e(t))return!0;let e=!1;for(let n of t.querySelectorAll('button, [role="button"], [aria-expanded], summary, [class*="thinking"]'))if(!(n.childElementCount>4)){if($e(n))return!0;(te(n.getAttribute("aria-label")||"")||te(n.textContent||""))&&(e=!0)}if(e){let n=t.querySelector(".markdown");if(!(n instanceof HTMLElement&&!!(n.innerText||n.textContent||"").replace(/\s+/g," ").trim()))return!0}}catch{}return!1}function Mo(){if(W()||he())return!1;let t=Kl();if(!t)return!0;if(Wl(t)||Vl(t))return!1;try{if(t.querySelector(t0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function n0(){if(z()||En())return U=!1,!1;if(W()||he())return U=!0,!0;let t=Kl();return t&&(Wl(t)||Vl(t))?(U=!0,!0):U&&!Mo()?!0:(U=!1,!1)}function rm(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Jt);return n instanceof HTMLElement?n:null}function Zf(t){return rm(t)??at()}function Ca(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function om(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function r0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?pr(e.innerText||e.textContent||""):""}catch{return""}}function o0(){return Xf+=1,`pq${Date.now().toString(36)}${Xf.toString(36)}`}function Y(t){return Ve.get(t)??[]}function im(t){return Y(t)[0]}function Hn(t,e){e.length?Ve.set(t,e):Ve.delete(t)}function am(t){if(!Y(t).length){G=!1,pt=!1,P="";return}G=!0,pt=!1,U=!0,P=""}function Jf(t){if(!Ut||Ut===t)return;let e=Ve.get(Ut);!e?.length||Ve.has(t)||V(Ut,t)&&(Ve.delete(Ut),Ve.set(t,e),P===Ut&&(P=t),B?.key===Ut&&(B.key=t),Xe.debug("migrated pending",Ut,"\u2192",t))}function Aa(t){let e=ye(),n=Y(e);if(zl.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),Hn(e,n)}else if(n.length>=Zy){Xe.debug("queue full",e);return}else n.push({id:o0(),text:t,at:Date.now()}),Hn(e,n);U=!0,B={key:e,text:t,turns:om(),ticks:3};let r=at();r&&ge(r,"");try{lt()}catch(o){Xe.error("chip",o)}Xe.debug("queued",e,n.length,t.length)}function sm(t,e){let n=Y(t).filter(r=>r.id!==e);if(Hn(t,n),N===e&&(N=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}lt()}function Yl(){mr?.abort(),mr=null}function i0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function Qf(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function a0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||N||st)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;mr?.abort();let c=new AbortController;mr=c;let{signal:u}=c,d=!1,f=!1,m=0,p=0,b=0,g=0,E=null,h=[],x=[],bt=()=>{e.classList.add("bloom-pq-settling");for(let y of h)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},ht=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(E?.isConnected?E.before(t):e.append(t)),E?.remove(),E=null,bt(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},Z=()=>{ka=!0;let y=A=>{A.preventDefault(),A.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{ka=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=Qf(h.length,m,p),A=x.length>1?(x[x.length-1].top-x[0].top-x.slice(0,-1).reduce((H,Vt)=>H+Vt.height,0))/(x.length-1):2,yt=new Array(x.length),Lt=x[0]?.top??0;for(let H of y)yt[H]=Lt,Lt+=x[H].height+A;for(let H=0;H<h.length;H++){if(H===m)continue;let Vt=yt[H]-x[H].top;h[H].style.transform=Math.abs(Vt)<.5?"":`translate3d(0,${Math.round(Vt)}px,0)`}},ct=()=>{let y=Y(n).slice();if(m<0||m>=y.length)return;let A=Qf(y.length,m,p);if(A.every((H,Vt)=>H===Vt))return;let yt=A.map(H=>y[H]).filter(Boolean);if(yt.length!==y.length)return;Hn(n,yt);let Lt=new Map(h.map(H=>[H.dataset.pqId||"",H]));for(let H of yt){let Vt=Lt.get(H.id);Vt&&e.append(Vt)}},Tt=y=>{if(f)return;f=!0;let A=d;mr===c&&(mr=null),A&&y&&t.isConnected&&ct(),ht(),A&&Z(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;ht(),y&&Z()});let ai=()=>{d=!0,h.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=h.indexOf(t),m<0&&(m=h.findIndex(H=>H.dataset.pqId===r)),p=m<0?0:m;let y=t.getBoundingClientRect();b=y.left,g=y.top;let A=getComputedStyle(t);E=document.createElement("div"),E.className="bloom-pq-gap",E.style.height=`${y.height}px`,t.before(E),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=A.color,t.style.font=A.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let yt=e.getBoundingClientRect(),Lt=e.scrollTop;x=h.map(H=>{let vs=(H===t?E:H).getBoundingClientRect(),Qc=vs.top-yt.top+Lt;return{top:Qc,height:vs.height,mid:Qc+vs.height/2}})},v=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(ai(),!d||m<0)))return;y.preventDefault(),t.style.left=`${b+(y.clientX-s)}px`,t.style.top=`${g+(y.clientY-l)}px`;let A=e.getBoundingClientRect(),yt=y.clientY-A.top+e.scrollTop,Lt=i0(yt,x.map(H=>H.mid));Lt!==p&&(p=Lt,O())},I=y=>{y.pointerId===a&&Tt(!0)};window.addEventListener("pointermove",v,{signal:u}),window.addEventListener("pointerup",I,{signal:u}),window.addEventListener("pointercancel",()=>Tt(!1),{signal:u})})}function s0(){wt=!0,clearTimeout(Co),Co=setTimeout(()=>{wt=!1,Co=void 0},Qy)}function l0(t){if(st)return;let e=ye(),n=Y(e).find(i=>i.id===t);if(!n)return;let r=at();if(!r)return;let o=n.text;st=t,N===t&&(N=null),Yl(),lt(),clearTimeout(An),An=setTimeout(()=>{if(An=void 0,!Kt||st!==t)return;if(st=null,ye()!==e||!Y(e).some(a=>a.id===t)){lt();return}Hn(e,Y(e).filter(a=>a.id!==t)),lt(),s0(),ge(r,o);let i=qe();i&&!q(i)&&!ea(i)&&(i.click(),wt=!1),am(e)},160)}function To(t){if(!Kt||ae||G||st||W()||ye()!==t)return;let e=im(t);if(!e){P="";return}if(ee())return;let n=at();if(!n)return;if(!_e(n)){let o=pr(Ft(n));if(o&&o!==e.text)return}let r=qe();!r||q(r)||ea(r)||(ae=!0,ge(n,e.text),clearTimeout(We),We=setTimeout(()=>c0(t,e.id,e.text),Jy))}function c0(t,e,n){We=void 0;try{if(!Kt||G||st)return;let r=im(t);if(!r||r.id!==e||r.text!==n||W()||ye()!==t)return;let o=at();if(!o)return;let i=pr(Ft(o));if(i&&i!==n&&!_e(o))return;i!==n&&ge(o,n);let a=qe();if(!a||q(a)||ea(a))return;a.click(),Hn(t,Y(t).filter(s=>s.id!==e)),lt(),am(t),Xe.debug("drained",t,Y(t).length)}finally{ae=!1}}function Gl(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Ct(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Ul(){Yl(),Ze?.remove(),Ze=null,N=null,Ye=!0}var lm="http://www.w3.org/2000/svg";function u0(){let t=document.createElementNS(lm,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function Lo(t){let e=u0();for(let n of t){let r=document.createElementNS(lm,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function ko(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&cm(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function d0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${Ma}`)}function La(){let t=Ze?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function f0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function Ke(t,e){if(N!==t)return;if(N=null,e===null){lt();return}let n=pr(e),r=ye();if(!n){sm(r,t);return}let o=Y(r).find(i=>i.id===t);o&&(o.text=n),lt()}function tm(t){st||N!==t&&(N&&Ke(N,La()),Y(ye()).some(e=>e.id===t)&&(N=t,Ye=!0,lt()))}function cm(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function em(t){return N===t?"edit":st===t?"send":"text"}function m0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function p0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||m0(l)!==em(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",Ye?"true":"false"),n.hidden=!Ye;for(let s of e){let l=a.get(s.id);if(em(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function lt(){if(Yl(),!Kt||!document.body){Ul();return}let t=ye(),e=Y(t);if(!e.length){Ul();return}N&&!e.some(d=>d.id===N)&&(N=null),st&&!e.some(d=>d.id===st)&&(st=null);let n=Ze;if(n?.isConnected||(n=document.createElement("div"),n.id=Ma,document.body.appendChild(n),Ze=n),p0(n,e)){Gl(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",Ye?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Ye=!Ye,lt()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",Ye||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=N===d.id,p=st===d.id;m||(f.setAttribute("role","button"),f.tabIndex=p?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),p&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let b=document.createElement("div");b.className="bloom-pq-body";let g;if(m){let h=document.createElement("textarea");h.className="bloom-pq-text bloom-pq-editing",h.value=d.text,h.rows=2,h.spellcheck=!1,h.setAttribute("aria-label","Queued message text"),h.addEventListener("keydown",x=>{x.stopPropagation(),x.key==="Enter"&&!x.shiftKey?(x.preventDefault(),Ke(d.id,h.value)):x.key==="Escape"&&(x.preventDefault(),Ke(d.id,null))}),h.addEventListener("blur",()=>Ke(d.id,h.value)),g=h,u=h}else{let h=document.createElement("span");h.className="bloom-pq-text line-clamp-2",h.textContent=p?"Sending":d.text,p?cm(h,l,"Sending now"):h.addEventListener("click",x=>{if(ka){ka=!1,x.preventDefault(),x.stopPropagation();return}x.preventDefault(),x.stopPropagation(),tm(d.id)}),g=h}b.append(g),f.append(b);let E=document.createElement("div");if(E.className="bloom-pq-rail",m){let h=ko("Save",Lo(["M20 6 9 17l-5-5"]),()=>{Ke(d.id,g instanceof HTMLTextAreaElement?g.value:La())},l),x=ko("Cancel",Lo(["M18 6 6 18","m6 6 12 12"]),()=>{Ke(d.id,null)},l);E.append(h,x)}else{let h=ko("Remove from queue",Lo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{N&&N!==d.id&&Ke(N,La()),N=N===d.id?null:N,sm(t,d.id)},l,void 0,p),x=ko("Edit queued message",Lo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>tm(d.id),l,"Edit",p),bt=ko("Send now",Lo(["M12 19V5","M6 11 12 5l6 6"]),()=>{N&&N!==d.id&&Ke(N,La()),l0(d.id)},l,"Send now (or Enter on empty composer)",p);E.append(h,x,bt)}f.append(E),!m&&!p&&a0(f,c,t,d.id),c.append(f)}if(n.append(o,c),Gl(n),u){let d=u,f=N;queueMicrotask(()=>{N===f&&d.isConnected&&f0(d)})}}function g0(){if(!B)return;B.ticks-=1;let t=Y(B.key);if(t.length&&om()>B.turns){let e=r0();if(e&&e===B.text){Xe.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),Hn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,lt();return}}B.ticks<=0&&(B=null)}function Ha(t){return!n0()||!Qt(t)?"":e0(t)}function b0(t){if(!Kt||t.isComposing||t.keyCode===229||t.key!=="Enter"||d0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||ae)return;let e=Zf(t.target)??Zf(document.activeElement);if(!e)return;if(t.altKey||wt){wt=!1,Je=!0,queueMicrotask(()=>{Je=!1});return}let n=Ha(e);n&&(Ca(t),Aa(n))}function h0(t){if(!Kt||ae||!(t instanceof InputEvent)||t.inputType!=="insertParagraph"&&t.inputType!=="insertLineBreak")return;if(Je){Je=!1;return}if(wt){wt=!1;return}let e=rm(t.target);if(!e)return;let n=Ha(e);n&&(Ca(t),Aa(n))}function y0(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||q(e))return null;let n=t.closest(er);if(n instanceof HTMLElement&&!q(n))return n;let r=qe();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function nm(t){if(!Kt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Ma}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&q(n)||ae||!y0(e))return;if(wt){wt=!1;return}let r=at();if(!r)return;let o=Ha(r);o&&(Ca(t),Aa(o))}function v0(t){if(!Kt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(ta)&&!e.querySelector(Jt)||ae)return;if(Je){Je=!1;return}if(wt){wt=!1;return}let n=at()??e.querySelector(Jt);if(!n)return;let r=Ha(n);r&&(Ca(t),Aa(r))}var um=w({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Yf,cleanupSelectors:[`#${Ma}`],settings:zl,start(){Kt=!0;let t=zl.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),Ut=ye(),P="",ae=!1,wt=!1,Je=!1,B=null;let e=Kl();U=!z()&&!En()&&(W()||he()||!!(e&&(Wl(e)||Vl(e)))),G=!1,pt=!1,N=null,st=null,clearTimeout(An),An=void 0,k(Yf,Vf),So?.abort(),So=new AbortController;let{signal:n}=So,r={capture:!0,signal:n};window.addEventListener("keydown",b0,r),document.addEventListener("beforeinput",h0,r),document.addEventListener("pointerdown",nm,r),document.addEventListener("click",nm,r),document.addEventListener("submit",v0,r),Ta?.(),Ta=ft({onFall(o){if(Kt){if(o.userStopped||o.error){U=!1,G=!1,pt=!1,P="",lt();return}if(!(G&&!pt)){if(G&&pt){if(!Mo())return;G=!1,pt=!1,U=!1,P=o.contextKey,To(o.contextKey);return}if(!Mo()){Xe.debug("unsettled fall; keep queue window");return}U=!1,P=o.contextKey,To(o.contextKey)}}},onRise(){z()||En()||(G&&(pt=!0),U=!0)},onContext(o,i){i&&o&&!V(i,o)&&(U=!1,G=!1,pt=!1,P="",ae=!1,We!==void 0&&(clearTimeout(We),We=void 0)),Jf(o),Ut=o,lt()},onTick(o){Jf(o.contextKey),Ut=o.contextKey,g0(),(z()||En())&&(G=!1,pt=!1,U=!1,P=""),G&&(W()||he())&&(pt=!0),G&&pt&&Mo()&&(G=!1,pt=!1,U=!1,Y(o.contextKey).length&&(P=o.contextKey,To(o.contextKey))),!G&&U&&Mo()&&(U=!1,!P&&Y(o.contextKey).length&&(P=o.contextKey,To(o.contextKey))),!G&&P&&P===o.contextKey&&To(P),Y(o.contextKey).length&&!Ze?.isConnected?lt():Ze&&Gl(Ze)}}),lt(),Xe.debug("watch started")},stop(){Kt=!1,Ta?.(),Ta=null,So?.abort(),So=null,clearTimeout(We),We=void 0,clearTimeout(Co),Co=void 0,clearTimeout(An),An=void 0,st=null,Ve.clear(),B=null,P="",ae=!1,wt=!1,Je=!1,U=!1,G=!1,pt=!1,Ul()}});var dm=`.bloom-cls {
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
`;var pm=new M("ChatListStatus"),fm="chatListStatus",Na="bloom-cls",E0="bloom-cls",w0=1200*1e3,S0="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Wt=new Map,se=!1,It="",ve=!1,hr=!1,Rt=0,Qe=null,Jl=null,gr=null,Xl=null,Ia=null,Ao=null,br=!1,tn=new Set;function Ra(){return Date.now()}function gm(){return Wu()||document.querySelector("nav")||null}function xe(t,e,n,r=!0){if(!(!t||!se)){if(e==="idle")Wt.delete(t);else{let o=Wt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ra():Wt.set(t,{kind:e,at:Ra(),source:n})}r&&T0({v:1,id:t,kind:e,at:Ra()}),In()}}function T0(t){try{gr?.postMessage(t)}catch{}}function L0(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||xe(e.id,e.kind,"bc",!1)}function k0(){let t=Ra();for(let[e,n]of Wt)n.kind==="streaming"&&t-n.at>w0&&Wt.delete(e)}function M0(){let t=gm();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll(ju)){if(r.closest(S0))continue;let o=ut(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function mm(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Zl(t){let e=t.querySelector(`:scope > .${Na}`);return e||null}function Ql(){if(!se)return;k0();let t=R(),e=M0();Qe?.disconnect();try{for(let n of e){let r=ut(n.getAttribute("href")||"");if(!r||!t||r!==t){Zl(n)?.remove();continue}let i=Wt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Zl(n)?.remove();continue}let a=Zl(n);a||(a=document.createElement("span"),a.className=Na,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(mm("streaming")):i==="error"&&a.appendChild(mm("error")))}}catch(n){pm.debug("paint failed",n)}bm()}function In(){if(se){if(document.hidden){Rt&&(cancelAnimationFrame(Rt),Rt=0),Ql();return}Rt||(Rt=requestAnimationFrame(()=>{Rt=0,se&&Ql()}))}}function bm(){let t=gm();if(!(Qe&&Jl===t&&t?.isConnected)){if(Qe?.disconnect(),Jl=t,!t){Qe=null;return}Qe=new MutationObserver(()=>In()),Qe.observe(t,{childList:!0,subtree:!0})}}function Pa(){return!!(bn()||lo())}function C0(t){return!!(br||t&&tn.has(t)||!hr&&!z()&&Pa())}function A0(t){if(se){if(t.type==="post-start"){hr=!1,t.conversationId?(br=!1,tn.add(t.conversationId),ve=!0,xe(t.conversationId,"streaming","net")):(br=!0,ve=!0);return}if(t.type==="post-end"){if(br=!1,t.conversationId){tn.delete(t.conversationId);let e=R(),n=oa();(e?t.conversationId===e:t.conversationId===n)?xe(t.conversationId,t.error?"error":"done","net"):xe(t.conversationId,"idle","net")}Pa()||(ve=!1)}}}function H0(t,e){if(!se)return;if(V(e,t)){In();return}let n=R();if(It&&It!==n){tn.delete(It);let r=Wt.get(It);r&&r.kind!=="idle"&&xe(It,"idle","local")}br=!1,ve=!1,hr=!0,n&&Wt.get(n)?.kind==="streaming"&&Wt.get(n)?.source==="local"&&!tn.has(n)&&xe(n,"idle","local"),In()}function I0(t){if(!se)return;let e=t.conversationId||R();if(It&&e&&It!==e){tn.delete(It);let r=Wt.get(It);r&&r.kind!=="idle"&&xe(It,"idle","local"),ve=!!(e&&tn.has(e))}if(e&&(It=e),hr||z()){if(z()||Pa()||t.streaming){In();return}hr=!1}if(C0(e)&&(t.streaming||Pa())){ve=!0,e&&xe(e,"streaming","local"),In();return}ve&&(ve=!1,e&&xe(e,ee()?"error":"done","local")),In()}var hm=w({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Na}`],start(){se=!0,k(fm,dm);try{gr=new BroadcastChannel(E0)}catch{gr=null}gr?.addEventListener("message",L0),Xl=kt(A0),Ia?.(),Ia=ft({onTick:I0,onContext:H0}),Ao?.abort(),Ao=new AbortController,document.addEventListener("visibilitychange",()=>{se&&(Rt&&(cancelAnimationFrame(Rt),Rt=0),Ql())},{signal:Ao.signal}),bm(),pm.debug("sidebar status watch started")},stop(){se=!1,Rt&&cancelAnimationFrame(Rt),Rt=0,Ao?.abort(),Ao=null,Qe?.disconnect(),Qe=null,Jl=null,Ia?.(),Ia=null,Xl?.(),Xl=null;try{gr?.close()}catch{}gr=null,Wt.clear(),tn.clear(),br=!1,ve=!1,hr=!1,It="",document.querySelectorAll(`.${Na}`).forEach(t=>t.remove()),L(fm)}});var vm="widerChat",xm=40,Em=96,wm=64,Sm=C({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:xm,max:Em,default:wm}});function R0(){return ot(Number(Sm.store.width??wm),xm,Em)}function ym(){let t=R0(),e=`min(100%,${t}rem)`;k(vm,`:root,#thread,#thread-bottom-container,#thread-bottom,[data-chatgpt-conversation-selection-target],[data-testid="desktop-app-shell"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var Tm=w({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Sm,start:ym,onSettingsChange:ym,stop(){L(vm)}});var tc="composerOpacity",yr='form[data-type="unified-composer"],form.w-full[data-type],[data-type="unified-composer"]',N0=[`${yr} [class*="corner-superellipse"]`,`${yr} [class*="bg-token-bg-primary"]`,`${yr} [class*="bg-token-main-surface"]`,'form [class*="corner-superellipse"]','#thread-bottom-container [class*="corner-superellipse"]','#thread-bottom [class*="corner-superellipse"]'].join(","),P0=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),O0="#thread-bottom-container,#thread-bottom",B0=`${yr} #prompt-textarea,${yr} [contenteditable="true"],#mobile-composer-prompt,textarea[name="prompt"]`,D0="var(--bg-primary,var(--main-surface-primary,#ffffff))",ec=C({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function _0(){return ot(Number(ec.store.opacity??100),0,100)}function q0(){return ot(Number(ec.store.blur??16),0,40)}function Lm(){let t=_0();if(t>=100){L(tc);return}let e=q0(),n=`color-mix(in srgb,${D0} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(tc,`${O0}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${P0}{display:none!important}${yr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${N0}{background-color:${n}!important;background-image:none!important;${r}}${B0}{background-color:transparent!important;background-image:none!important}`)}var km=w({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:ec,start:Lm,onSettingsChange:Lm,stop(){L(tc)}});var Mm=`#bloom-bn-host {
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
#thread [data-testid^="conversation-turn-"],
[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids],
[data-chatgpt-search-message-ids] {
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
`;var F0=new M("BetterNavigator"),nc="betterNavigator",Nm="bloom-bn-host",On=60,Cm=16,ac=1e3,Am=2400,j0=80,Pm=2.5,z0=.4,Ho="\u6B63\u5728\u8F93\u51FA\u2026",sc="Image",G0="\u2753",U0="\u{1F916}",Hm=/file_[0-9a-f]+/gi,K0="File",W0="Code",V0=".markdown, .whitespace-pre-wrap",mc=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Y0="img, picture, video, canvas",X0=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,Z0=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,$o=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,J0=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Q0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,tv=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,ev=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,nv=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,rv=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),ov=2e3,iv=40,av=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,Om=Gu,sv=["#thread-bottom-container","#thread-bottom","#prompt-textarea","#mobile-composer-prompt","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']",'textarea[name="prompt"]'].join(", "),lv=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),cv=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),xr=C({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),we=new Map,Oo=new Map,le=new Set,Da=0,Ot=!1,Se=!1,vr=!1,en=null,Fo=null,Er=null,_a=null,F=[],Pn="",qa=0,Bo=-1,Do=0,$a="",Pt=0,Ee=0,Io,Ro=null,Oa=null,rc=null,oc=null,Rn=null,lc=null,No=null,Nn=null,Te=null,Po=null,Fa=!1,cc=0;function wr(){return Ii()}function ic(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function uv(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function dv(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-'], [data-chatgpt-search-message-ids]"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)av.test(uv(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=(document.getElementById("thread-bottom-container")??document.getElementById("thread-bottom"))?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"], [data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=ic(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||ic(getComputedStyle(t).getPropertyValue("--thread-content-width"))||ic(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function _o(t){try{return!!t.closest(sv)}catch{return!0}}function Im(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function za(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||Ri(t)||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function pc(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function fv(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Ba(t,e){if(t){Hm.lastIndex=0;for(let n of t.matchAll(Hm))e.add(n[0].toLowerCase())}}function mv(t){try{let e=new Set,n=s=>{fv(s)||(Ba(s.getAttribute("src")||"",e),Ba(s.getAttribute("srcset")||"",e),Ba(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Ba(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=za(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function pv(t,e){let n=mv(t),r=Oo.get(e)??0,o=Math.max(r,n);return o>0&&Oo.set(e,o),o>=2?`${sc} x${o}`:sc}function X(t){return t.replace(/\s+/g," ").trim()}function Bm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(lv))return!0;n=n.parentElement}return!1}function qo(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(Bm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(mc);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return X(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<On+20;)e.push(X(r.textContent||""));return X(e.join(" "))}function jo(t){let e=X(t);return e.length<3||e.length>180||$o.test(e)?!1:X0.test(e)?!0:Z0.test(e)}function Ga(t){let e=X(t);return e.length<8||e.length>120||/\s/.test(e)||$o.test(e)||jo(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function gv(t){let e=[],n=i=>{let a=X(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(X(s[1])),e.push(X(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function bv(t){try{return _o(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function gc(t){let e=X(t);return!e||bc(e)||Ga(e)?!0:jo(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function hv(t){return!t.length||t.length>4||!t.every(e=>gc(e))?!1:t.some(e=>$o.test(X(e))||jo(e)||Ga(e))}function Dm(t){try{let e=null,n=0,r=`${mc}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(bv(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=gv(o);if(!i.length||i.length>4||i.join(" ").length>240||!hv(i))continue;let a=i.some(c=>$o.test(X(c))),s=i.some(c=>jo(c)||Ga(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function yv(t){return Dm(t)?K0:""}function vv(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(J0.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function xv(t){try{for(let e of t.querySelectorAll(Y0))if(!vv(e))return!0}catch{}return!1}function bc(t){let e=X(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||tv.test(e)||Q0.test(e)?!0:e.length<=24&&(ev.test(e)||$o.test(e))}function Ev(t){let e=[],n=new Set,r=o=>{try{if(Bm(o,t)||o.closest(mc))return}catch{return}let i=qo(o);!i||n.has(i)||bc(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>On+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(qo(o).length<24)&&(r(o),e.join(" ").length>On+20))break}}catch{}return X(e.join(" "))}function wv(t){let e=Dm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=X(i.innerText||i.textContent||"");!a||a.length>On+20||r.has(a)||gc(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return X(n.join(" "))}function Sv(t,e){let n=[];try{for(let o of t.querySelectorAll(V0)){if(_o(o))continue;let i=qo(o);if(!(!i||e==="assistant"&&bc(i)||gc(i))&&(n.push(i),n.join(" ").length>On+20))break}}catch{}let r=X(n.join(" "));if(e==="user"){let o=wv(t);if(o)return o}return r||(e==="assistant"?Ev(t):"")}function Tv(t){return t.length>On?`${t.slice(0,On).trimEnd()}\u2026`:t}function Rm(t){return nv.test(t)}function Lv(t,e,n,r){let o=Sv(t,e);if(o)return Tv(o);if(r)return Ho;let i=yv(t);if(i)return i;if(pc(t))return pv(t,za(t));try{if(xv(t))return sc;if(t.querySelector("pre, code"))return W0}catch{}return`Message ${n+1}`}function kv(){if(Se)return!0;let t=R();return!!(t&&le.has(t)||!vr&&!z()&&zo())}function zo(){return!!(bn()||lo())}function Mv(){Da=Date.now()}function _m(t){Se=!1,t&&le.delete(t);let e=R();e&&le.delete(e)}function Cv(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Av(t){if(pc(t)||!zo())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!qo(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function hc(t){try{if($e(t))return!0;for(let e of t.querySelectorAll("span, div, p, button, summary, [aria-expanded]")){if(e.childElementCount>4)continue;if($e(e))return!0;let n=X(e.textContent||"");if(n.length>32||!te(n))continue;let r=t.querySelector(".markdown");if(!(r instanceof HTMLElement&&!!qo(r)))return!0}}catch{}return!1}function qm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function Hv(t,e){try{if(Cv(t))return!0;if(!e)return!1;if(Av(t)||hc(t))return!0}catch{}return!1}function $m(t){if(!t||zo())return!1;try{if(hc(t)||qm(t))return!1;if(t.querySelector(rv)||pc(t))return!0}catch{}return!1}function Iv(t){if(zo()||Da&&Date.now()-Da<ov)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!$m(e.el)||_m()}function Rv(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(Om)){if(_o(r))continue;let i=za(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(_o(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function Nv(t){return js(t)}function Pv(t){let e=xr.store.showAssistant!==!1,n=e&&kv(),r=Rv(t),o=null;if(e)for(let a of r)Im(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=za(a);if(!s)continue;let l=Im(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&hc(a),d=c&&qm(a),f=l==="assistant"&&c&&!$m(a)&&(u||d||n||Hv(a,!0)),m=Lv(a,l,i.length,f);if(m&&m!==Ho){let b=we.get(s),g=!!b&&(jo(b)||Ga(b));(!b||g||!Rm(m)||Rm(b))&&m!==b&&we.set(s,m)}let p=f&&m===Ho?Ho:we.get(s)||m;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return i}function Ov(t){let e=new Map;for(let n of t)if(e.set(n.id,n),!!n.el)for(let r of Nv(n.el))e.set(r,n);return e}function Bv(t,e){if(e)return e.text&&e.text!==Ho&&we.set(t.id,e.text),{...e,id:t.id};let n=we.get(t.id)||(t.alias?we.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message"}}function Dv(t,e){let n=xr.store.showAssistant!==!1,r=Ov(e),o=new Set,i=[];for(let s of t){if(s.role==="assistant"&&!n)continue;let l=r.get(s.id)||(s.alias?r.get(s.alias):void 0),c=Bv(s,l);c.el&&o.add(c.el),i.push(c)}for(let s=0;s<e.length;s++){let l=e[s];if(!l.el||o.has(l.el))continue;let c=i.length;for(let u=s-1;u>=0;u--){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f+1;break}}if(c===i.length)for(let u=s+1;u<e.length;u++){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f;break}}i.splice(c,0,l),o.add(l.el)}let a=-1;for(let s=0;s<i.length;s++)i[s].role==="assistant"&&(a=s);for(let s=0;s<i.length;s++)i[s].live&&s!==a&&(i[s].live=!1);return i}function _v(){let t=wr();if(!t||t===document.body)return[];let e=Pv(t),n=R(),r=n?Gr(n):[],o=r.length?Dv(r,e):e;return Iv(o),o}function Fm(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Ua(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function yc(t){return t===window?window.innerHeight:t.clientHeight}function qv(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(cv)}catch{return!1}}function jm(){Io!==void 0&&(clearTimeout(Io),Io=void 0),Ro?.classList.remove("bloom-bn-flash"),Ro=null}function zm(t){jm(),t.classList.add("bloom-bn-flash"),Ro=t,Io=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Ro===t&&(Ro=null),Io=void 0},800)}function ja(t){if(!F.length)return;let e=Math.max(0,Math.min(t,F.length-1));qa=e,Fo?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),Er?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),_a&&(_a.textContent=`${e+1} / ${F.length}`)}function Gm(t){if(Fa)return;let e=Er?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function uc(t){let e=F[t];if(!e)return;let n=e.el?.isConnected?e.el:Um(e.id);if(!n){jv(t);return}e.el=n,Bo=t,Do=Date.now()+ac,ja(t),Gm(t);let r=Te??Ua(n),i=Math.abs(n.getBoundingClientRect().top-Fm())>Pm*yc(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),xr.store.jumpEffect!=="none"&&zm(n)}function Um(t){let e=wr();if(!e||e===document.body||!t)return null;let n=[t],r=R(),i=(r?Gr(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"], [data-chatgpt-search-message-ids~="${c}"]`)}catch{}if(!s||_o(s))continue;let l=s.closest(Om);return l instanceof HTMLElement?l:s}return null}function vc(){if(Te)return Te;let t=wr();return t?Ua(t):window}function $v(t){let e=vc(),n=yc(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function Fv(t,e){let n=vc();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function jv(t){let e=++cc,n=F[t];if(!n)return;Bo=t,Do=Date.now()+Am+ac,ja(t),Gm(t);let r=-1;for(let l=0;l<F.length;l++)F[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+Am,a=0,s=-1;for(;Date.now()<i;){if(e!==cc||!Ot)return;let l=Um(n.id);if(l){n.el=l,Do=Date.now()+ac;let d=Te??Ua(l),m=Math.abs(l.getBoundingClientRect().top-Fm())>Pm*yc(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),xr.store.jumpEffect!=="none"&&zm(l),Nt();return}let c=vc(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&Fv(o,u))break;$v(o),await new Promise(d=>setTimeout(d,j0))}}function xc(){if(!Ot||!F.length)return;if(Date.now()<Do&&Bo>=0){ja(Bo);return}let t=window.innerHeight*z0,e=0;for(let n=0;n<F.length;n++){let r=F[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}ja(e)}function zv(t){let e=Ua(t);if(Te===e&&Po)return;Po?.(),Te=e;let n=e===window?document:e,r=()=>{xc(),Ec()};n.addEventListener("scroll",r,{passive:!0}),Po=()=>n.removeEventListener("scroll",r)}function Gv(t){Nn?.disconnect(),Nn=null;let e=Te instanceof HTMLElement?Te:null;Nn=new IntersectionObserver(()=>xc(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&Nn.observe(n.el)}function Uv(){if(!document.body)return null;let t=en;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Nm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{Fa=!0}),n.addEventListener("pointerleave",()=>{Fa=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),en=t,Fo=e,Er=i,_a=o,t}function Km(){let t=en,e=wr();if(!t||!e||!e.isConnected||F.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=dv(e),o=document.getElementById("thread-bottom-container")??document.getElementById("thread-bottom"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||iv,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Ec(){!Ot||Ee||(Ee=requestAnimationFrame(()=>{Ee=0,Ot&&Km()}))}function Kv(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Wv(t){let e=Fo,n=Er;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Cm),e.classList.toggle("bloom-bn-fit",t.length>Cm),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Kv(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),uc(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?G0:U0;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),uc(o)}),n.appendChild(a)}))}function Vv(t){Fo?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Er?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Yv(){let t=R();return t===$a?!1:($a=t,we.clear(),Oo.clear(),F=[],Pn="",qa=0,Bo=-1,Do=0,Se&&t&&(le.add(t),Se=!1),!0)}function Xv(t){let e=xr.store.showAssistant!==!1?"1":"0";return`${$a}|${e}|${t.map(n=>n.id).join(",")}`}function dc(){if(!Ot)return;Yv();let t=_v(),e=wr();if(!e||t.length<1){F=t,Pn="",en&&(en.hidden=!0),Nn?.disconnect(),fc();return}Uv();let n=Xv(t);n!==Pn?(F=t,Pn=n,Wv(t),zv(e),Gv(t)):(F=t,Vv(t)),Km(),xc(),fc()}function Nt(){if(Ot){if(document.hidden){Pt&&(cancelAnimationFrame(Pt),Pt=0),dc();return}Pt||(Pt=requestAnimationFrame(()=>{Pt=0,Ot&&dc()}))}}function fc(){let t=wr();if(!(Rn&&lc===t&&t?.isConnected)){if(Rn?.disconnect(),No?.disconnect(),lc=t,!t||t===document.body){Rn=null;return}Rn=new MutationObserver(()=>Nt()),Rn.observe(t,{childList:!0,subtree:!0}),No=new ResizeObserver(()=>Ec()),No.observe(t)}}function Zv(t){if(Ot){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===R())&&Nt();return}if(t.type==="post-start"){Mv(),vr=!1,t.conversationId?(Se=!1,le.add(t.conversationId)):Se=!0,Nt();return}if(t.type==="post-end"){if(Se=!1,t.conversationId)le.delete(t.conversationId);else{let e=R();e&&le.delete(e)}Nt()}}}function Jv(t){if(!Ot||!F.length||en?.hidden||t.altKey||t.ctrlKey||t.metaKey||qv(t.target))return;let e=-1;if(t.key==="ArrowDown")e=qa+1;else if(t.key==="ArrowUp")e=qa-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=F.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),uc(Math.max(0,Math.min(e,F.length-1)))}function Qv(){cc++,jm(),Nn?.disconnect(),Nn=null,Rn?.disconnect(),Rn=null,lc=null,No?.disconnect(),No=null,Po?.(),Po=null,Te=null,Fa=!1,en?.remove(),en=null,Fo=null,Er=null,_a=null}var Wm=w({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:nc,cleanupSelectors:[`#${Nm}`],settings:xr,start(){Ot=!0,$a=R(),k(nc,Mm),Oa=new AbortController;let{signal:t}=Oa;window.addEventListener("keydown",Jv,{signal:t}),window.addEventListener("popstate",Nt,{signal:t}),window.visualViewport?.addEventListener("resize",Ec,{signal:t}),document.addEventListener("visibilitychange",()=>{Ot&&(Pt&&(cancelAnimationFrame(Pt),Pt=0),Ee&&(cancelAnimationFrame(Ee),Ee=0),dc())},{signal:t}),oc=kt(Zv),rc=ft({onTick(){if(z()){Nt();return}vr&&!zo()&&(vr=!1),Nt()},onFall(e){_m(e.conversationId),Nt()},onContext(e,n){if(!V(n,e)){we.clear(),Oo.clear(),Pn="",Se=!1;let r=R();for(let o of[...le])o!==r&&le.delete(o);vr=!0}Nt()}}),fc(),Nt(),F0.debug("navigator started")},stop(){Ot=!1,Pt&&cancelAnimationFrame(Pt),Pt=0,Ee&&cancelAnimationFrame(Ee),Ee=0,Oa?.abort(),Oa=null,rc?.(),rc=null,oc?.(),oc=null,le.clear(),Se=!1,vr=!1,Da=0,Qv(),we.clear(),Oo.clear(),F=[],Pn="",L(nc)},onSettingsChange(){Pn="",Nt()}});var Vm=`.bloom-ts {
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
`;function Ym(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Xm(t){try{return new Date(t).toISOString()}catch{return""}}var Qm=new M("MessageTimestamps"),Zm="messageTimestamps",Wa="bloom-ts",Jm=1500,ex="#thread-bottom-container, #thread-bottom, #prompt-textarea, #mobile-composer-prompt, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer'], textarea[name='prompt']",Sr=C({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Tr=new Map,_n=!1,Bt=0,nn=null,Sc=null,wc=null,Ka=null,Go=null,Uo=!1,Bn=!1;function tp(){return Ii()}function Lc(){let t=Sr.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ep(){let t={...Lc()};for(let[n,r]of Tr)t[n]=r;let e=Object.keys(t);if(e.length>Jm){let n=e.slice(e.length-Jm),r={};for(let o of n)r[o]=t[o];Sr.store.stamps=r;return}Sr.store.stamps=t}var nx=lu(ep,500);function np(t,e){!t||!e||Tr.get(t)===e||(Tr.set(t,e),nx(),Dn())}function rx(t){return t?Tr.get(t)??Lc()[t]??Ei(t)??null:null}function ox(t){_n&&t.type==="message-time"&&np(t.messageId,t.createTime)}function ix(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function ax(){let t=tp();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll(Uu))n.closest(ex)||e.push(n)}catch{}return e}function sx(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Tc(){if(!_n)return;let t=Sr.store.hideOwnMessages===!0,e=Sr.store.showDate!==!1,n=W();Bn&&!z()&&(Bn=!1),Bn&&(n?Uo=!1:Bn=!1);let r=Bn?!1:n,o=ax();nn?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||Ri(i),l=ix(i),c=i.querySelector(`:scope > .${Wa}`);if(t&&l==="user"){c?.remove();return}if(sx(i)){c?.remove();return}let u=rx(s);if(!u&&s&&(r||Uo)&&a>=o.length-2&&(u=Date.now(),np(s,u)),!u){c?.remove();return}let d=Ym(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Wa,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=Xm(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){Qm.debug("paint failed",i)}Uo=r,rp()}function Dn(){if(_n){if(document.hidden){Bt&&(cancelAnimationFrame(Bt),Bt=0),Tc();return}Bt||(Bt=requestAnimationFrame(()=>{Bt=0,_n&&Tc()}))}}function rp(){let t=tp();if(!(nn&&Sc===t&&t?.isConnected)){if(nn?.disconnect(),Sc=t,!t||t===document.body){nn=null;return}nn=new MutationObserver(()=>Dn()),nn.observe(t,{childList:!0,subtree:!0})}}var op=w({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Wa}`],settings:Sr,start(){_n=!0,k(Zm,Vm);let t=Lc();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Tr.set(e,n);wc=kt(ox),Ka?.(),Ka=ft({onTick:Dn,onFall:Dn,onContext(e,n){V(n,e)||(Bn=!0,Uo=!1),Dn()}}),Go?.abort(),Go=new AbortController,document.addEventListener("visibilitychange",()=>{_n&&(Bt&&(cancelAnimationFrame(Bt),Bt=0),Tc())},{signal:Go.signal}),rp(),Dn(),Qm.debug("timestamp watch started")},stop(){_n=!1,Bt&&cancelAnimationFrame(Bt),Bt=0,Go?.abort(),Go=null,nn?.disconnect(),nn=null,Sc=null,Ka?.(),Ka=null,wc?.(),wc=null,Bn=!1,Uo=!1,ep(),Tr.clear(),document.querySelectorAll(`.${Wa}`).forEach(t=>t.remove()),L(Zm)},onSettingsChange:Dn});var kc="streamerMode",lx="filter:blur(6px)!important;transition:filter .2s ease",cx="filter:none!important",rn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','[data-app-navigation-rail] button[aria-haspopup="menu"]',"[data-bloom-profile-chip]"],Lr=["#stage-slideover-sidebar","#stage-popover-sidebar","nav","#stage-sidebar-tiny-bar","[data-app-navigation-rail]","[data-app-action-sidebar-scroll]"];function gt(t,e){return t.map(n=>`${n} ${e}`)}var qn=C({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function kr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${lx}}${e?`${r}{${cx}}`:""}`}function ip(){let t=[];if(qn.store.conversations!==!1&&(t.push(kr([...gt(Lr,'a[href^="/c/"]'),...gt(Lr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),qn.store.projects!==!1&&(t.push(kr([...gt(Lr,'a[href*="/project"]'),...gt(Lr,'a[href*="/g/g-p-"]'),...gt(Lr,'[data-testid="project-name"]'),...gt(Lr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),qn.store.headerTitle!==!1&&t.push(kr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="conversation-title"]','[data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),qn.store.accountAvatar!==!1&&t.push(kr([...gt(rn,"img"),...gt(rn,'[class*="avatar"]'),...gt(rn,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),qn.store.accountName!==!1&&t.push(kr([...gt(rn,".min-w-0 > .truncate"),...gt(rn,".min-w-0.flex-1 .truncate"),...gt(rn,".min-w-0.flex-col .truncate"),...gt(rn,".min-w-0.flex .truncate")],!1)),qn.store.accountEmail!==!1&&t.push(kr([...gt(rn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *,textarea[name="prompt"],#mobile-composer-prompt{filter:none!important}'),!t.length){L(kc);return}k(kc,t.join(`
`))}var ap=w({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:qn,start:ip,onSettingsChange:ip,stop(){L(kc)}});var sp=`.bloom-gc-panel {
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
}`;var dx=new M("GreetingCustomizer"),Mr="greetingCustomizer",lp="greetingCustomizerUi",Ko=100,Cc=30,fx=120,mx=1e3,px=50,gx=40,bx=["#page-header","nav","#stage-slideover-sidebar","#stage-popover-sidebar","#stage-sidebar-tiny-bar","[data-app-navigation-rail]","[data-app-action-sidebar-scroll]","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container","#thread-bottom",'form[data-type="unified-composer"]','[data-type="unified-composer"]','textarea[name="prompt"]',"#mobile-composer-prompt"].join(", "),Wo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ja=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function hx(t){return!!t?.closest(bx)}function fp(t){return!!(hx(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function ti(t){try{for(let e of document.querySelectorAll(t))if(!fp(e))return e}catch{}return null}function Mc(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(ti(e))return e;return t}var mp=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],nt=C({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Nx},greetings:{type:0,description:"Greeting texts",hidden:!0,default:mp},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),ce=!1,Hr=!1,Fn=null,Ya,Vo,Cr,Yo,Xa=0,Va=null,Ar=null,Xo=null,Zo=null,Jo=null,Za=null;function ke(){let t=location.pathname||"/";return t==="/"||t===""}function $n(){let t=nt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):mp.slice()}function Qo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function cp(t){nt.store.greetings=t.slice(0,Cc)}function ei(){let t=String(nt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function yx(){return nt.store.order==="random"?"random":"sequential"}function vx(){return ot(Number(nt.store.intervalSec??10),1,3600)*1e3}function xx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Ex(){return!!ti(Ja)}function Qa(){return!!(ti(Ja)||ti(Wo))}function wx(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Ex()?Mc(Ja):ti(Wo)?Mc(Wo):Mc(Ja),i=e?`${Wo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Sx(t,e){if(t<=0)return 0;if(t===1)return Number(nt.plain.index)!==0&&(nt.store.index=0),Number(nt.plain.lastRandom)!==0&&(nt.store.lastRandom=0),0;let n=Number(nt.plain.index),r=Number(nt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(yx()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return nt.store.index=s,nt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return nt.store.index=i,i}function Le(t){if(!ce)return;if(!ke()){L(Mr);return}let e=$n().map(Qo).filter(Boolean);if(!e.length){L(Mr);return}let n=Sx(e.length,t),r=e[n]??e[0],o=ei()==="manual"&&e.length>1;k(Mr,wx(xx(r),o)),Za?.()}function Ac(){Ya!==void 0&&(clearInterval(Ya),Ya=void 0)}function Hc(){Ac(),!(!ce||!ke())&&ei()==="interval"&&($n().filter(Boolean).length<=1||(Ya=setInterval(()=>Le(!0),vx())))}function Ic(){Yo!==void 0&&(clearTimeout(Yo),Yo=void 0),Xa=0}function up(){if(Ic(),!ce||!ke())return;Xa=gx;let t=()=>{if(Yo=void 0,!(!ce||!ke())){if(Qa()){ei()==="refresh"&&!Hr?(Hr=!0,Le(!0)):Le(!1),Hc();return}Xa-=1,Xa>0&&(Yo=setTimeout(t,px))}};t()}function Rc(){if(Fn===!0){Qa()?Le(!1):up();return}Fn=!0,Hr=!1,ei()==="refresh"?(Hr=!0,Le(!0)):Le(!1),Hc(),Qa()||up()}function Nc(){Fn=!1,Hr=!1,Ac(),Ic(),L(Mr)}function ts(){Cr===void 0&&(Cr=window.setTimeout(()=>{Cr=void 0,ce&&(ke()?Rc():Fn!==!1&&Nc())},fx))}function Tx(){Ar||(Ar=history.pushState.bind(history),Xo=history.replaceState.bind(history),Zo=function(...e){let n=Ar(...e);return ts(),n},Jo=function(...e){let n=Xo(...e);return ts(),n},history.pushState=Zo,history.replaceState=Jo)}function Lx(){Zo&&history.pushState===Zo&&Ar&&(history.pushState=Ar),Jo&&history.replaceState===Jo&&Xo&&(history.replaceState=Xo),Ar=null,Xo=null,Zo=null,Jo=null}function kx(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(ts)}function Mx(t){if(!ce||!ke()||ei()!=="manual"||$n().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Wo);if(!n||fp(n))return;let r=window.getSelection?.();r&&String(r).trim()||Le(!0)}function Cx(){Vo===void 0&&(Vo=setInterval(()=>{if(!ce)return;let t=ke();if(t!==(Fn===!0)){t?Rc():Nc();return}t&&Qa()&&Le(!1)},mx))}function Ax(){Vo!==void 0&&(clearInterval(Vo),Vo=void 0)}function dp(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var Hx="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Ix="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Rx(t,e){let n=Qo(t);return n?n.length>Ko?`Keep it to ${Ko} characters.`:$n().length+(e?1:0)>Cc?`At most ${Cc} greetings.`:null:"Enter a greeting."}function Nx(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=$n(),s=Number(nt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Ko,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let g=l.querySelector(".bloom-gc-count");g&&(g.textContent=`${Qo(e).length}/${Ko}`);let E=l.querySelector(".bloom-gc-error");E&&(E.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Qo(e).length}/${Ko}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let g=document.createElement("button");g.type="button",g.className="bloom-gc-btn",g.textContent="Cancel",g.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(g)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let g=n<0,E=Rx(e,g);if(E){r=E,i();return}let h=Qo(e),x=$n().slice();n>=0&&n<x.length?x[n]=h:x.push(h),cp(x),n=-1,e="",r="",i()}),m.appendChild(p),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let g=document.createElement("p");g.className="bloom-gc-empty",g.textContent="No greetings. The official heading stays.",t.appendChild(g);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((g,E)=>{let h=document.createElement("div");h.className="bloom-gc-item",E===s&&(h.dataset.active="true");let x=document.createElement("button");x.type="button",x.className=`bloom-gc-body${o===E?"":" bloom-gc-clamp"}`,x.textContent=g,x.addEventListener("click",()=>{o=o===E?-1:E,i()});let bt=document.createElement("div");bt.className="bloom-gc-item-actions";let ht=dp("Edit",Hx);ht.addEventListener("click",()=>{n=E,e=g,r="",i()});let Z=dp("Delete",Ix);Z.addEventListener("click",()=>{let O=$n().filter((ct,Tt)=>Tt!==E);cp(O),n===E?(n=-1,e=""):n>E&&(n-=1),i()}),bt.append(ht,Z),h.append(x,bt),b.appendChild(h)}),t.appendChild(b)};return Za=i,i(),()=>{Za===i&&(Za=null),t.replaceChildren()}}var pp=w({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:lp,settings:nt,start(){ce=!0,k(lp,sp),Tx(),Va=new AbortController;let{signal:t}=Va;window.addEventListener("popstate",ts,{signal:t}),document.addEventListener("click",kx,{capture:!0,signal:t}),document.addEventListener("click",Mx,{signal:t}),Cx(),Fn=null,ke()?Rc():Nc(),dx.debug("started")},stop(){ce=!1,Va?.abort(),Va=null,Cr!==void 0&&(clearTimeout(Cr),Cr=void 0),Ac(),Ic(),Ax(),Lx(),L(Mr),Hr=!1,Fn=null},onSettingsChange(){ce&&(ke()?(Le(!1),Hc()):L(Mr))}});function Px(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function es(t){try{return await createImageBitmap(t)}catch{return null}}async function Ox(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function ns(t){if(t.startsWith("data:")){let e=Px(t);if(e){let n=await es(e);if(n)return n}return Ox(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?es(await e.blob()):null}catch{return null}}var os="data-bloom-csi-slot",Bx="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Dx=/\bsize-(?:[6-9]|10)\b/,_x=/\b(?:h|w)-(?:[6-9]|10)\b/,qx=/^(plus|pro|free|team|go|business|enterprise)$/i,$x=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function rs(t){return t.getAttribute("class")||""}function bp(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Dx.test(t)?!0:_x.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Fx(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!hp(e)}function hp(t){return qx.test(String(t??"").replace(/\s+/g,""))}function St(t){return!!t?.closest(Bx)}function is(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function ni(t){let e=rs(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:hp(t.textContent||"")}function as(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function ri(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function yp(t){if(St(t)||as(t)||ri(t)||ni(t)||is(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function vp(t){return St(t)||as(t)||ri(t)||ni(t)||t.querySelector("img, .min-w-0, .truncate")?!1:Fx(t.textContent||"")}function xp(t){return St(t)||ri(t)||is(t)||ni(t)?!1:bp(rs(t))||vp(t)?!0:yp(t)}function gp(t){return!(St(t)||is(t)||ri(t)||ni(t)||as(t))}function on(t,e){let n=as(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(ri(n)||is(n)||ni(n));)St(n)||(r=n),n=n.parentElement;return r}function jx(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||St(e))continue;if(/\bflex\b/.test(rs(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||St(o))){if(o instanceof HTMLImageElement)return on(o,t)??o.parentElement??o;if(gp(o)){if(xp(o)||bp(rs(o)))return on(o,t)??o;r.push(o)}}if(r.length===1)return on(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&gp(r))return on(r,t)??r}}return null}function zx(t){let e=t.querySelectorAll($x);for(let n of e)if(xp(n))return on(n,t)??n;return null}function Gx(t){for(let e of t.querySelectorAll("span, div, p, i"))if(vp(e))return on(e,t)??e;return null}function Ux(t){for(let e of t.querySelectorAll("*"))if(yp(e))return on(e,t)??e;return null}function Ep(t,e){if(St(t))return null;if(e&&!St(e)&&t.contains(e)){let n=on(e,t);if(n)return n}return jx(t)??zx(t)??Gx(t)??Ux(t)}function wp(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Ir="data-bloom-csi",ss="data-bloom-csi-orig",jn=new Set,Sp=null;function Oc(t){Sp=t}function Tp(t){return`url(${JSON.stringify(t)})`}function ls(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Bc(t,e,n){let r=Tp(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Lp(t,e=os){let n=Tp(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function Kx(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Rr(t){t.removeEventListener("error",Pc);let e=t.getAttribute(ss);t.removeAttribute(Ir),t.removeAttribute(ss),e&&t.getAttribute("src")!==e&&(t.src=e)}function Pc(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&jn.add(n),Rr(e),Sp?.()}function kp(t,e){if(!e||jn.has(e)){Rr(t);return}Kx(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Ir)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(ss)&&t.setAttribute(ss,n);t.setAttribute(Ir,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Pc),t.addEventListener("error",Pc),n!==e&&(t.src=e)}var Mp=`/*
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
`;var Cp=new M("CustomSidebarIdentity"),Ap="customSidebarIdentityUi",Rp="customSidebarIdentity",Vx="bloom-csi-face",Yx="bloom-csi-name",Nr=os,$c="data-bloom-profile-chip",Xx=1024,cs=256,Np=24,Pp=64,Op=40,Fc=1,jc=4,zn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]','[data-app-navigation-rail] button[aria-haspopup="menu"]',"[data-bloom-profile-chip]"],Dc=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=C({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:pE},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Np,max:Pp,default:Op},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Gn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Zx(){return String(T.store.displayName??"").trim()}function fs(t,e,n,r,o){let i=ot(n,Fc,jc),a=Math.min(t,e)/i,s=ot(r,a/2,Math.max(a/2,t-a/2)),l=ot(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Jx(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function zc(t){let e=Math.min(1,Xx/Math.max(t.width,t.height));return Jx(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Qx(t,e,n,r){let{side:o,x:i,y:a}=fs(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=cs,s.height=cs;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,cs,cs);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function tE(t){let e=await es(t);if(!e)return null;let n=zc(e);return e.close(),n}async function Uc(t,e,n,r){let o=await ns(t);if(!o)return null;let i=Qx(o,e,n,r);return o.close(),i}function Kc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function Hp(){T.store.avatarUrl="",T.store.avatarSource="",Kc()}var Ip=0;async function Gc(t){let e=++Ip;Kc(),T.store.avatarSource=t;let n=await Uc(t,.5,.5,1);return e!==Ip?!1:(n&&(T.store.avatarUrl=n),!!n)}function oi(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function _c(t){let e=oi(t);if(!e)return!1;let n=await tE(e);return n?Gc(n):!1}var Dt=!1,Pr=!1,Or=0,ms=0,us=null,an=new Map,Br=null,Ce=null,ps=null,ue=null,gs=null;function bs(t){let e=String(t??"").trim();if(!e||jn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function Bp(){return bs(T.store.avatarUrl)??bs(T.store.avatarSource)}var ds=!1,qc=new Set;function Dp(){let t=bs(T.store.avatarSource);if(!t?.startsWith("data:image/")||bs(T.store.avatarUrl)?.startsWith("data:image/")||ds||qc.has(t))return;ds=!0;let e=Gn(T.store.cropX,.5),n=Gn(T.store.cropY,.5),r=Gn(T.store.cropZoom,1);Uc(t,e,n,r).then(o=>{if(ds=!1,!o){qc.add(t);return}Dt&&(T.store.avatarUrl=o,hs())}).catch(()=>{ds=!1,qc.add(t)})}function Me(t,e){return t.map(n=>`${n} ${e}`)}function eE(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function nE(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=eE(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function _p(t){let e=[];for(let n of t.querySelectorAll("img")){if(!(n instanceof HTMLImageElement)||St(n)||n.closest(".truncate"))continue;let r=n.closest(".min-w-0");r instanceof HTMLElement&&!/\bflex\b/.test(r.getAttribute("class")||"")||e.push(n)}return e}function rE(t){let e=_p(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Wc(){let t=[],e=o=>{if(!o||St(o)||!o.isConnected)return;let i=dn(o);St(i)||t.includes(i)||t.push(i)};e(fn());let n=Ne();if(n){let o=n.querySelector("button[aria-haspopup='menu'] .min-w-0, button[aria-haspopup='menu'] .truncate, button[aria-haspopup='menu'] img");e(o)}let r=Zn();if(r&&!t.some(o=>r.contains(o)||o.contains(r))){let o=r.querySelector(zn.join(","))??r.querySelector("button, a, [role='button']")??r;e(o)}return t}function qp(t,e){t.setAttribute($c,"");let n=rE(t);if(n)kp(n,e);else for(let o of _p(t))Rr(o);let r=Ep(t,n);for(let o of t.querySelectorAll(`[${Nr}]`))o!==r&&o.removeAttribute(Nr);r&&r.setAttribute(Nr,"")}function oE(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function iE(t,e){let n=oE(t);n&&qp(n,e)}function aE(){for(let t of document.querySelectorAll(`img[${Ir}]`))Rr(t);for(let t of document.querySelectorAll(`[${Nr}]`))t.removeAttribute(Nr);for(let t of document.querySelectorAll(`[${$c}]`))t.removeAttribute($c)}function sE(){let t=ot(Math.round(Gn(T.store.avatarSize,Op)),Np,Pp),e=Bp(),n=Zx(),r=T.store.applyToMenu!==!1,o=[],i=[...Me(zn,"img"),"#stage-sidebar-tiny-bar img","[data-app-navigation-rail] img"];r&&i.push(...Me(Dc,"> :first-child img"));let a=[...Me(zn,".min-w-0 > .truncate"),...Me(zn,".min-w-0.flex-1 .truncate"),...Me(zn,".min-w-0.flex-col .truncate"),...Me(zn,".min-w-0.flex .truncate")];r&&a.push(...Me(Dc,"> :first-child .truncate"));let s=wp(Nr);o.push(ls([...s.flatMap(l=>Me(zn,l))].join(","),t)),o.push(ls(s.map(l=>`#stage-sidebar-tiny-bar ${l}, [data-app-navigation-rail] ${l}`).join(","),32)),r&&o.push(ls(s.flatMap(l=>Me(Dc,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Bc(i.join(","),e,t)),o.push(Bc("#stage-sidebar-tiny-bar img, [data-app-navigation-rail] img",e,32)),o.push(Lp(e))),n&&o.push(nE(a,n)),k(Rp,o.join(""))}function lE(){let t=Bp(),e=Wc();for(let n of e)qp(n,t);if(T.store.applyToMenu!==!1){let n=Jn();n&&iE(n,t)}for(let n of document.querySelectorAll(`img[${Ir}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Rr(n)}function hs(){if(!(!Dt||Pr)){Pr=!0;for(let t of an.values())t.disconnect();Ce?.disconnect(),ue?.disconnect();try{sE(),lE()}finally{Pr=!1,Vc(),fE(),Br?.isConnected&&$p(Br),Dp()}}}function ii(){!Dt||Or||(Or=requestAnimationFrame(()=>{Or=0,hs()}))}function cE(){Pr||!Dt||ii()}function uE(t){if(an.has(t))return;let e=new MutationObserver(cE);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),an.set(t,e)}function dE(t){an.get(t)?.disconnect(),an.delete(t)}function Vc(){let t=new Set;for(let n of Wc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Zn();e&&t.add(e);for(let n of[...an.keys()])(!t.has(n)||!n.isConnected)&&dE(n);for(let n of t)n.isConnected&&uE(n)}function fE(){let t=Oi();if(!t){ue?.disconnect(),ue=null,ps=null;return}if(ps===t&&ue){ue.observe(t,{childList:!0});return}ue?.disconnect(),ps=t,ue=new MutationObserver(()=>{Pr||!Dt||(Vc(),ii())}),ue.observe(t,{childList:!0})}function $p(t){Br===t&&Ce||(Ce?.disconnect(),Br=t,Ce=new MutationObserver(()=>{if(!t.isConnected){Ce?.disconnect(),Ce=null,Br=null;return}Pr||!Dt||ii()}),Ce.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Fp(t){if(!Dt||T.store.applyToMenu===!1)return;let e=Jn();if(e){$p(e),ii();return}t<=0||requestAnimationFrame(()=>Fp(t-1))}function jp(t){Dt&&(hs(),!(Wc().length||t<=0)&&(ms=requestAnimationFrame(()=>jp(t-1))))}function mE(t){Dt&&T.store.applyToMenu!==!1&&(!Bi(t)&&!Jn()||Fp(10))}function pE(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,m.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let g=document.createElement("input");g.type="range",g.className="bloom-csi-zoom",g.min=String(Fc),g.max=String(jc),g.step="0.05",g.setAttribute("aria-label","Zoom");let E=document.createElement("span");E.className="bloom-csi-zoom-val";let h=document.createElement("button");h.type="button",h.className="bloom-csi-btn",h.textContent="Reset",b.append(g,E,h);let x=document.createElement("p");x.className="bloom-csi-hint",x.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,b,x),t.append(u,d,f);function bt(){let v=String(T.store.avatarSource??""),I=String(T.store.avatarUrl??"");return v.startsWith("data:image/")?v:I.startsWith("data:image/")?I:""}function ht(v,I,y){if(!a)return i.x=v,i.y=I,i.zoom=ot(y,Fc,jc),i;let A=fs(a.w,a.h,y,v*a.w,I*a.h);return i.x=A.x/a.w,i.y=A.y/a.h,i.zoom=A.z,i}function Z(){g.value=String(i.zoom),E.textContent=`${Math.round(i.zoom*100)}%`;let v=a?fs(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;v&&a&&(p.style.width=`${a.w/v.side*100}%`,p.style.height=`${a.h/v.side*100}%`,p.style.left=`${(.5-v.x/v.side)*100}%`,p.style.top=`${(.5-v.y/v.side)*100}%`)}function O(v=!1){let I=bt(),y=String(T.store.avatarUrl??"").trim(),A=!!I;s.hidden=!y&&!I,(I||y)&&(s.src=I||y),document.activeElement!==l&&(l.value=A?"":y),l.placeholder=A?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!I,d.hidden=!(e&&/^https?:\/\//.test(y)&&!I),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",I&&(v&&(i.x=Gn(T.store.cropX,.5),i.y=Gn(T.store.cropY,.5),i.zoom=Gn(T.store.cropZoom,1)),p.getAttribute("src")!==I&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},ht(i.x,i.y,i.zoom),Z()},p.src=I),Z())}function ct(v,I,y,A=!1){ht(v,I,y),Z();let yt=bt(),Lt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,yt&&Uc(yt,i.x,i.y,i.zoom).then(H=>{H&&(T.store.avatarUrl=H)})};r&&clearTimeout(r),A?Lt():r=setTimeout(Lt,80)}function Tt(v){T.store.avatarUrl=v;let I=v.trim();if(n&&clearTimeout(n),!I){T.store.avatarSource="",Kc(),e=!1,O(!0);return}if(I.startsWith("data:image/")){e=!1,n=setTimeout(()=>{ns(I).then(y=>{if(!y)return;let A=zc(y);y.close(),A&&Gc(A).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(I)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{ns(I).then(y=>{if(!y){e=!0,O(!0);return}let A=zc(y);y.close(),A?(e=!1,Gc(A).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",v=>{oi(v.clipboardData)&&(v.preventDefault(),e=!1,_c(v.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",v=>{oi(v.dataTransfer)&&v.preventDefault()}),u.addEventListener("drop",v=>{oi(v.dataTransfer)&&(v.preventDefault(),e=!1,_c(v.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>Tt(l.value)),l.addEventListener("paste",v=>{oi(v.clipboardData)&&(v.preventDefault(),e=!1,_c(v.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",v=>{bt()&&!l.value&&(v.key==="Backspace"||v.key==="Delete")&&(Hp(),e=!1,O(!0))}),c.addEventListener("click",()=>{Hp(),e=!1,O(!0)}),m.addEventListener("pointerdown",v=>{v.button===0&&(m.setPointerCapture(v.pointerId),o.on=!0,o.px=v.clientX,o.py=v.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",v=>{if(!o.on||!a)return;let I=m.clientWidth;if(!I)return;let{side:y}=fs(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);ht(o.x-(v.clientX-o.px)*(y/I)/a.w,o.y-(v.clientY-o.py)*(y/I)/a.h,i.zoom),Z()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,ct(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",v=>{v.preventDefault(),ct(i.x,i.y,i.zoom*(v.deltaY<0?1.08:1/1.08))},{passive:!1}),g.addEventListener("input",()=>ct(i.x,i.y,Number(g.value))),g.addEventListener("change",()=>ct(i.x,i.y,Number(g.value),!0)),h.addEventListener("click",()=>ct(.5,.5,1,!0));let ai=()=>O(!1);return gs=ai,O(!0),()=>{gs===ai&&(gs=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var zp=w({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Ap,cleanupSelectors:[`.${Vx}`,`.${Yx}`],settings:T,start(){Dt=!0,jn.clear(),Oc(ii),k(Ap,Mp),us=new AbortController,document.addEventListener("click",mE,{signal:us.signal}),jp(40),Dp(),Cp.debug("started")},onSettingsChange(){jn.clear(),gs?.(),Dt&&(Vc(),hs())},stop(){Dt=!1,us?.abort(),us=null,Or&&cancelAnimationFrame(Or),Or=0,ms&&cancelAnimationFrame(ms),ms=0;for(let t of an.values())t.disconnect();an.clear(),Ce?.disconnect(),Ce=null,Br=null,ue?.disconnect(),ue=null,ps=null,aE(),L(Rp),Oc(null),jn.clear(),Cp.debug("stopped")}});var Dr=new M("Bloom"),Gp=!1,gE=Date.now(),bE=[bd,lf,hf,xf,Lf,Hf,jf,Gf,Wf,um,hm,Tm,km,Wm,op,ap,pp,zp];function ys(t){return new Promise(e=>setTimeout(e,t))}function hE(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function yE(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Kp=8e3,Up=300,vE=250;async function xE(){if(un())return await ys(Up),!0;for(;Date.now()-gE<Kp;)if(await ys(vE),un())return await ys(Up),!0;return un()||zs()}function Yc(){return Hi()}async function EE(){if(Yc())return!0;let t=Date.now()+Kp;for(;Date.now()<t;)if(await ys(100),Yc())return!0;return Yc()}function wE(){try{GM_registerMenuCommand?.("Bloom++ settings",gd)}catch{}}function SE(){Si(()=>{qr("HostShell"),Dr.info("host shell",Mt)}),Ti(()=>{Dr.info("idle ready",Mt)}),Li(()=>{Es(),qr("HostReady"),Dr.info("chrome ready",Mt)})}async function Xc(){await du()}async function Zc(){if(Gp)return;Gp=!0,Ru();for(let n of bE)try{yu(n),Fu(n)}catch(r){Dr.error("register failed",n.name,r)}qr("Init"),wE(),SE();let t=()=>qr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await hE(),Es(),Dr.info("styles ready",Mt),await yE(),EE().then(n=>{n&&ki()}),!await xE()){Dr.warn("late islands not detected; starting default plugins",Mt),Xn(),Mi();return}await qu()}var Wp=typeof unsafeWindow<"u"?unsafeWindow:window,TE=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||TE){let t=Wp.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Mt);try{Object.defineProperty(Wp,"Bloom",{value:Jc,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Xc().then(()=>Zc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
