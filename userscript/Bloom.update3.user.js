// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.109
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
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update3.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update3.user.js
// ==/UserScript==

/* Bloom++ [20260924] v1.4.109. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var cp=Object.defineProperty;var up=(t,e)=>{for(var n in e)cp(t,n,{get:e[n],enumerable:!0})};var Tc={};up(Tc,{REPO_URL:()=>mu,Settings:()=>F,VERSION:()=>wt,contextKeyFromUrl:()=>se,conversationChain:()=>Pr,conversationTitle:()=>Bn,conversationToken:()=>Rt,currentConversationId:()=>N,ensureConversationChain:()=>au,hasDraftText:()=>Kt,hasErrorToast:()=>Yt,hasLateIslands:()=>Xe,init:()=>Sc,initSettings:()=>Ec,isDocumentInteractive:()=>gu,isStreaming:()=>W,isUserDraftEmpty:()=>Ae,messageCreateTime:()=>ui,plugins:()=>ae,requestChromeReady:()=>bi,requestIdleReady:()=>Dn,requestShellReady:()=>gi,setEditorText:()=>de,subscribeHarvest:()=>xt,watchStreamingEdge:()=>ct,whenChromeReady:()=>pi,whenIdleReady:()=>mi,whenShellReady:()=>fi});var Ee=new Map,Yo=!1;function dp(){return document.getElementById("bloom-root")?.shadowRoot??null}function kc(){return document.head??null}function Nn(){let t=dp();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=fp()}function os(t,e){if(!Yo)return;let n=kc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Nn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Nn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Nn()}function k(t,e){let n=Ee.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Ee.set(t,n)),Yo&&os(t,n)}function is(){if(!kc())return!1;Yo=!0;for(let[e,n]of Ee)os(e,n);return Nn(),!0}function Cc(t){let e=Ee.get(t);e&&(e.disabled=!1,Yo&&os(t,e))}function Mc(t){let e=Ee.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Nn())}function L(t){let e=Ee.get(t);e&&(e.el?.remove(),Ee.delete(t),Nn())}function fp(){return Array.from(Ee.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var C=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function E(t){return t}var as=new Map;function Rn(t,e){let n=as.get(t);return n||(n=new Set,as.set(t,n)),n.add(e),()=>n.delete(e)}function Ve(t,e){let n=as.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var mp="bloompp";function Ac(){return new Promise((t,e)=>{let n=indexedDB.open(mp,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Hc(t){try{let e=await Ac();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Ic(t,e){try{let n=await Ac();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function rt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function ot(t,e,n){return Math.min(n,Math.max(e,t))}function Nc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Rc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Pc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Xo=new C("SettingsStore"),Se="BloomSettings",pp=100;function Zo(t){return t!=null&&typeof t.then=="function"}function gp(t){if(t==null||Zo(t))return null;if(rt(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(rt(e)&&!Zo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return rt(n)&&!Zo(n)?n:null}return null}catch{return null}}function Qo(t){let e=gp(t);if(!e)return null;let n=e.plugins;return!rt(n)||Zo(n)||Object.keys(n).length===0?null:e}function ls(t){return rt(t)?t:null}function ss(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:rt(t)?Object.keys(t).length===0:!1}function bp(t){return ss(t)?0:Array.isArray(t)?12+Math.min(t.length,40):rt(t)?12+Math.min(Object.keys(t).length,40):3}function Ye(t){if(!t)return-1;let e=t.plugins;if(!rt(e))return-1;let n=0;for(let r of Object.values(e)){let o=ls(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=bp(a))}return n}function Oc(t){let e=t.plugins;if(!rt(e))return 0;let n=0;for(let r of Object.values(e))ls(r)?.enabled===!0&&n++;return n}function Bc(t){let e=t.map((i,a)=>({bag:i,index:a,score:Ye(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=Oc(a.bag)-Oc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!rt(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(rt(a))for(let[s,l]of Object.entries(a)){let c=ls(l);if(!c)continue;if(!rt(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}ss(u[d])&&!ss(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return rt(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Ye(n)}}var Jo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return rt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Xo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},pp))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Se,this.plain)}catch{try{GM_setValue(Se,e)}catch(n){Xo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Se,e)}catch{}Ic(Se,e).catch(n=>Xo.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){Xo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Nc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var hp=new C("Settings"),yp={plugins:{}},F=new Jo(structuredClone(yp)),vp=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function xp(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function M(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?Te(n):{}},get plain(){let n=e.pluginName;return n?F.plain.plugins[n]??{}:{}}};return e}async function wp(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Dc(){let t=Qo(await wp(Se)),e=Qo(await Hc(Se)),n=null;try{n=Qo(localStorage.getItem(Se))}catch{n=null}let r=Bc([t,e,n]);if(r){let o=r.bag.plugins;o&&(F.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);hp.info("Loaded settings from",i,"richness",r.score,"gm",Ye(t),"idb",Ye(e),"ls",Ye(n))}F.releasePersist(),r&&(r.index!==0||r.score>Ye(t))&&F.persistLoadedBag()}function Te(t){return F.plain.plugins[t]||(F.plain.plugins[t]={}),F.store.plugins[t]}function _c(t,e){e&&(e.pluginName=t,Te(t),F.setDefaultGetter(vp(t),n=>{if(n!=="enabled")return xp(e.def,n)}))}function qc(){return Te("Settings")}function ti(){return qc().pinnedPlugins??[]}function $c(t){return ti().includes(t)}function Fc(t){let e=ti(),n=e.includes(t);return F.store.plugins.Settings={...F.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function ei(){return qc().starredPlugins??[]}function zc(t){return ei().includes(t)}function jc(t){let e=ei(),n=e.includes(t);return F.store.plugins.Settings={...F.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var ni=new C("PluginManager"),ae={},Ar=new Set;function Gc(t){if(ae[t.name]){ni.warn("Duplicate plugin",t.name);return}ae[t.name]=t,_c(t.name,t.settings)}function Pn(t){let e=ae[t];if(!e)return!1;if(e.required)return!0;let n=F.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Uc(t){let e=ae[t];if(!e||e.required)return;let n=!Pn(t);Te(t),F.store.plugins[t].enabled=n,n?Kc(e):Ep(e),Ve("pluginToggle",{name:t,enabled:n})}function Kc(t,e=!1){if(!Ar.has(t.name)&&Pn(t.name))try{t.managedStyle&&Cc(t.managedStyle),t.start?.(),Ar.add(t.name),t.settings&&F.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Ar.has(t.name)&&t.onSettingsChange?.()}),e||ni.debug("Started",t.name)}catch(n){ni.error("Failed to start",t.name,n)}}function Ep(t){if(Ar.has(t.name)){try{t.stop?.()}catch(e){ni.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Mc(t.managedStyle),L(t.managedStyle)),Ar.delete(t.name)}}function Hr(t){for(let e of Object.values(ae))(e.startAt??"DOMContentLoaded")===t&&Kc(e)}var Wc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Rt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function se(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function le(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Wc)?.[1]??""}catch{return t.match(Wc)?.[1]??""}}function N(){return le(location.pathname)}var us=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i,Sp=/[?&](?:num_turns|limit|before|after|before_node|after_node|cursor)=/i;function ri(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function ds(t,e){return e!=="GET"||ri(t)?!1:us.test(t)}function fs(t){return us.test(t)&&Sp.test(t)}function oi(t){return t.match(us)?.[1]??""}function ms(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return ms(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Ir(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function Yc(t){let e=Ir(t);return e?!e.mapping&&Ir(e.conversation)?e.conversation:e:null}function Vc(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function Tp(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=Vc(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?Vc(n.text):""}function Lp(t){if(Ir(t.metadata)?.is_visually_hidden_from_conversation===!0)return"";let r=Ir(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function kp(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?ms(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function Cp(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null,c=l?Lp(l):"",u=l&&typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:l?Tp(l):""};u!==o&&(d.alias=o);let f=l?ms(l.create_time??l.createTime):null;f&&(d.at=f),n.push(d)}o=typeof s.parent=="string"?s.parent:null}return n.reverse(),n}function cs(t){return t.length<=480?t:t.slice(t.length-480)}function ps(t,e){if(!e.length)return t;if(!t.length)return cs(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(b=>b.id)),m=n.has(e[e.length-1].id),p=e.filter(b=>!f.has(b.id));return cs(m?[...p,...t]:[...t,...p])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return cs([...s,...l,...u,...d])}function Mp(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=kp(t,n);return r?Cp(n,r):[]}function gs(t){let e=Yc(t);if(!e)return[];let n=e.mapping;return!n||typeof n!="object"||Array.isArray(n)?[]:!(typeof e.current_node=="string"||typeof e.current_node_id=="string"||typeof e.currentNode=="string")&&typeof e.title!="string"?[]:Mp(e)}function Xc(t,e=""){let n=Ir(t);if(!n)return e;let r=Yc(t)??n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function Zc(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var eu=new C("Harvest"),Ap=1500,Hp=200,Ip=8,ii=new Set,ai=new Map,si=new Map,li=new Map,Jc=[],On=null,ci=null,Nr=null,Pt=0,nu=!1;function Np(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Rp(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Pp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var Op=/"action"\s*:\s*"(next|continue|variant)"/i;function Bp(t,e,n){return!(e!=="POST"||ri(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Op.test(n))}function ru(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Dp(t){return typeof t=="string"?ru(t):""}function bs(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return bs(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function hs(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function Qc(t,e,n){!t||!e||si.get(t)!==e&&(si.set(t,e),hs(si,Ap),ce({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function _p(t,e){let n=e.trim();!t||!n||ai.get(t)!==n&&(ai.set(t,n),hs(ai,Hp),ce({type:"conversation-meta",conversationId:t,title:n}))}function qp(t,e,n=""){if(n&&fs(n))return;let r=Xc(e,t);if(!r)return;let o=gs(e);if(!o.length)return;let i=li.get(r)??[],a=ps(i,o);Zc(i,a)||(li.set(r,a),hs(li,Ip),ce({type:"conversation-chain",conversationId:r}))}function Rr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Rr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&_p(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=bs(l.create_time??l.createTime??l.created_at);c&&u&&Qc(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=bs(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&Qc(a,s,o),r.mapping&&typeof r.mapping=="object")Rr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Rr(l,o,n+1)}function tu(t,e){if(t)try{Rr(JSON.parse(t),e)}catch{}}function ce(t){for(let e of Array.from(ii))try{e(t)}catch{}}async function $p(t,e,n,r){if(n===Pt)try{let o=await t.json();if(n!==Pt)return;Rr(o,e),qp(e,o,r)}catch{}}async function Fp(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Pt&&ce({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Pt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=ru(c);m&&(o=m,ce({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let p=m.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||tu(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Pt&&tu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Pt&&ce({type:"post-end",conversationId:o,error:i})}function zp(t,e,n){let r=Rp(e),o=Pp(e,n),i=ds(r,o),a=Bp(r,o,n?.body),s=Pt,l="";return a&&(l=Dp(n?.body)||oi(r)||le(r)||N(),ce({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Pt||!i&&!a)return c;try{let u=c.clone();i?$p(u,oi(r)||N(),s,r):Fp(u,l,!c.ok,s)}catch{a&&ce({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Pt&&ce({type:"post-end",conversationId:l,error:!0}),c})}function ou(){if(On)return;let t=Np();Nr=t,On=t.fetch.bind(t);let e=(n,r)=>zp(On,n,r);ci=e,t.fetch=e,eu.debug("conversation fetch harvest hooked")}function jp(){Pt+=1,!(!On||!Nr)&&(ci&&Nr.fetch===ci&&(Nr.fetch=On),On=null,ci=null,Nr=null,eu.debug("conversation fetch harvest unhooked"))}function Gp(){Pt+=1,!nu&&jp()}function iu(){nu=!0,ou()}function au(t){}function xt(t){return ii.add(t),ou(),()=>{ii.delete(t),ii.size===0&&Gp()}}function Bn(t){return t?ai.get(t)??"":""}function ui(t){return t?si.get(t)??null:null}function Pr(t){return t?li.get(t)??Jc:Jc}var Or=!1,di=!1,ys=!1,lu=[],cu=[],uu=[];function vs(t){let e=t.splice(0);for(let n of e)n()}function Br(){Or||(Or=!0,vs(lu))}function xs(){di||(di=!0,Or||Br(),vs(cu))}function du(){ys||(ys=!0,Or||Br(),di||xs(),vs(uu))}function fi(t){Or?t():lu.push(t)}function mi(t){di?t():cu.push(t)}function pi(t){ys?t():uu.push(t)}function gi(){Br()}function Dn(){Br(),xs()}function bi(){du()}function su(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function fu(){await su(4e3),Br(),await su(4e3),xs(),du()}var S={p:"0-V-linuxdo"},wt="[20260924] v1.4.109",mu="https://github.com/0-V-linuxdo/Bloom";var Up={BetterNavigator:1790264656e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790252301e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function pu(t){let e=Up[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function Kp(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Wp(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function ws(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Xe(){return ws()?Kp()||Wp():!1}function gu(){return Xe()}var Vp=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),bu=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Yp=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Xp="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function qn(t){return t.id==="bloom-root"||!!t.closest(Xp)}function hu(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function hi(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Es(t){if(!(t instanceof HTMLElement)||!t.isConnected||qn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&hi(e)?!1:t.getClientRects().length>0}function _n(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Zp(){let t=[];for(let e of document.querySelectorAll(Vp))!(e instanceof HTMLElement)||!e.isConnected||qn(e)||t.push(e);return t}function yi(t){if(!t.isConnected||qn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Ze(){return Zp().filter(yi)[0]??null}function $n(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||qn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Ss(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!qn(n)&&!_n(n)&&n.parentElement&&!_n(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!_n(r)&&!qn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!_n(r.parentElement))return r}return e}function Fn(){let t=document.querySelectorAll(bu);for(let n of t)if(Es(n)&&!hi(n)&&hu(n))return n;let e=document.querySelectorAll(Yp);for(let n of e){if(!Es(n)||!hu(n)||hi(n))continue;let r=n.querySelector(bu);return Es(r)&&!hi(r)?r:n}return null}function vi(){let t=Ze();if(t){let e=Ss(t),n=e.parentElement;if(n&&!_n(n))return n;if(!_n(e))return e}return $n()}function xi(t){let e=Ze();return e?t.composedPath().includes(e):!1}var Ls=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Jp={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Qp(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function tg(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Ts(t){let e=Qp(t);return e?tg(e)>.55?"light":"dark":null}function eg(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Ts(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Ts(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Ts(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function wi(t){return t==="auto"?eg():t}function ng(t){try{let e=getComputedStyle(document.documentElement);for(let n of Ls){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Ei(t,e,n){let r=Jp[e];if(n){ng(t);for(let o of Ls)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Ls)t.style.setProperty(o,r[o])}function yu(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var ks=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var og="bloom-root",Gt="bloom-rail-item",Ci="bloom-account-item",Qe="bloom-sidebar-panel",Ur="bloom-plugin-dialog",Pi="bloom-plugin-layer",Mi="bloom-settings-css",ig=2e3,wu=null,ag=null,Me=!1,Hs=[],Si=null,Ai=null,ke=null,Li=null,ue=null,zr=null,Dr,zn=0,jr=0,_r=0,qr=null,$r=null,Hi=null,Eu=null,Fr=null,Cs=[],Ii=!1,sg=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],lg=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],cg=new Set(["chat","ui","privacy"]),ug=10080*60*1e3,Oi="",Gr="all",jt="all";function Bi(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Su(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function dg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function fg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function mg(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function pg(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var gg={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function bg(t){return t.icon||gg[t.name]||Bi()}function Ms(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Ei(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Tu(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Ni(){let t="auto",e=wi(t);Ms(wu,e,!0);let n=document.getElementById(Qe);n instanceof HTMLElement&&Ms(n,e,!0);let r=document.getElementById(Ur);r instanceof HTMLElement&&Ms(r,e,!0);let o=document.getElementById(Gt);o instanceof HTMLElement&&Tu(o),Ve("schemeChange",{scheme:e,pref:t})}function Lu(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function ku(){if(k("settings",ks),document.getElementById(Mi)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Mi,t.textContent=ks,document.head.appendChild(t)}function hg(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function yg(){for(let t of Hs)t();Hs=[]}function Cu(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function vg(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Rs(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function xg(t){return Rs(t).length>0}function ki(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function wg(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=vg(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Eg(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(wg(e,n));let i=Te(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Hs.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??ki(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??ki(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Cu(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??ki(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function vu(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Sg(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=Te(t.name);for(let[n,r]of Rs(t)){if(n==="enabled"||r.type===5)continue;let o=ki(r);o!==void 0&&(e[n]=o)}Au(t)}function Mu(t){t.key==="Escape"&&(!document.getElementById(Pi)&&!document.getElementById(Ur)||(t.stopPropagation(),jn()))}function Tg(){Ii||(document.addEventListener("keydown",Mu),Ii=!0)}function Lg(){Ii&&(document.removeEventListener("keydown",Mu),Ii=!1)}function jn(){yg(),Lg(),document.getElementById(Pi)?.remove(),document.getElementById(Ur)?.remove()}function Au(t){if(jn(),!document.body)return;let e=document.createElement("div");e.id=Pi,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Ce),e.addEventListener("pointerup",Ce),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&jn()});let n=document.createElement("div");n.id=Ur,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ce),n.addEventListener("pointerup",Ce),n.addEventListener("click",Ce);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Su(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),jn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=vu("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=vu("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Rs(t);if(c.length)for(let[u,d]of c){let f=Eg(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Sg(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Tg(),Ni()}function kg(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=bg(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=zc(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=mg(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let g=jc(t.name);Ve("pluginStar",{name:t.name,starred:g})}),s.appendChild(c),!t.required){let b=$c(t.name),g=document.createElement("button");g.type="button",g.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,g.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),g.innerHTML=pg(b),g.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let h=Fc(t.name);Ve("pluginPin",{name:t.name,pinned:h})}),s.appendChild(g)}if(xg(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=fg(),b.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),Au(t)}),s.appendChild(b)}let u=Cu(t.name,Pn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{Uc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(p),e.append(n,f,m),e}function Hu(){return Object.values(ae).filter(t=>!t.hidden&&t.name!=="Settings")}function Cg(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<ug}function Iu(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Cg(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>cg.has(r)):n.includes(e)}function Mg(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Ag(){return Oi.trim()?"No plugins match your search.":jt==="favorites"?"No favorites yet. Star a plugin to see it here.":jt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Hg(){let t=Hu();return lg.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Iu(n,e.id)))}function Ig(){if(Fr){Fr.replaceChildren();for(let t of Hg()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${jt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{jt=t.id,Je()}),Fr.appendChild(e)}}}function Ng(){let t=Hu();if(jt==="favorites"){let e=new Set(ei());t=t.filter(n=>e.has(n.name))}else jt!=="all"&&(t=t.filter(e=>Iu(e,jt)));return Gr==="enabled"&&(t=t.filter(e=>Pn(e.name))),Gr==="disabled"&&(t=t.filter(e=>!Pn(e.name))),t}function Je(){if(!qr)return;Ig();let t=Ng();Hi&&(Hi.placeholder=`Search ${t.length} plugins...`);let e=t,n=Oi.trim().toLowerCase();if(n&&(e=e.filter(r=>Mg(r).includes(n))),jt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(jt!=="favorites"){let r=ti();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}qr.replaceChildren();for(let r of e)qr.appendChild(kg(r));$r&&($r.hidden=e.length>0,$r.textContent=Ag())}function Ce(t){t.stopPropagation()}function As(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ps(){document.getElementById(Gt)?.setAttribute("aria-expanded",Me?"true":"false")}function Rg(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Os(){jn(),Oi="",Gr="all",jt="all",document.getElementById(Qe)?.remove(),Me=!1,Ps()}function Pg(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Ce),e.addEventListener("pointerup",Ce),e.addEventListener("click",Ce);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Bi();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=dg();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Su(),d.addEventListener("click",Os),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Oi=p.value,Je()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let h of sg){let x=document.createElement("option");x.value=h.value,x.textContent=h.label,b.appendChild(x)}b.value=Gr,b.addEventListener("change",()=>{Gr=b.value,Je()}),m.append(p,b),n.appendChild(m);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let w=document.createElement("p");return w.className="bloom-tab-empty",w.hidden=!0,n.appendChild(w),e.append(d,n),qr=g,$r=w,Hi=p,Eu=b,Fr=f,Je(),e}function Og(t){t.classList.add("bloom-rail-dock")}function Bg(){let t=document.getElementById(Gt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&yi(t)?t:null}function Dg(){if(document.getElementById(Qe)?.remove(),!document.body)return;let t=Pg(Qe);Og(t),document.body.appendChild(t),Me=!0,jn(),Ni(),Ps(),Ve("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:wt,dock:"center",rail:!!Bg()})}function Bs(){let t=document.getElementById(Qe);if(t instanceof HTMLElement&&t.isConnected&&Rg(t)){Os();return}t?.remove(),Dg()}function _g(){let t=document.createElement("button");return t.type="button",t.id=Gt,t.className="bloom-rail-item",t.setAttribute("aria-controls",Qe),t.setAttribute("aria-expanded",Me?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Bi()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Bs()}),t}function xu(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function qg(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function $g(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Le(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Nu(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=qg(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Le(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Le(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Le(n,"width",l),Le(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Le(t,"padding-left",u);let d=$g(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),p=Math.round(f.left-m.right);p>=0&&p<=24&&Le(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Le(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Le(t,"gap",Math.round(l))}Tu(t)}function Is(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Fg(){if(zr?.isConnected&&ue){ue.observe(zr,{childList:!0});return}Ns()}function zg(t){if(Is(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function jg(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){_r=0;return}_r+=1,jr=Date.now()+Math.min(8e3,250*2**Math.min(_r,5))})}function Gg(){zn||Date.now()<jr||(zn=requestAnimationFrame(()=>{zn=0,!(Date.now()<jr)&&(document.getElementById(Gt)?.isConnected||Ri())}))}function Ri(){if(!document.body)return;ue?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Gt);t=n instanceof HTMLButtonElement?n:_g();let r=Ze(),o=$n();if(r){let i=Ss(r),a=i.parentElement;if(Is(i)||a&&Is(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),xu(t),Nu(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),xu(t,!0)):t.isConnected&&!yi(t)&&(t.remove(),t=null)}finally{jg(t,e),Fg(),Ps()}}function Ns(){let t=vi();!t||!zg(t)||zr===t&&ue||(ue?.disconnect(),zr=t,ue=new MutationObserver(()=>{document.getElementById(Gt)?.isConnected||Gg()}),ue.observe(t,{childList:!0}))}function Ug(){Ri(),Ns(),Dr===void 0&&(Dr=window.setInterval(()=>{let t=document.getElementById(Gt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=jr&&Ri();else{_r=0;let e=Ze();e&&Nu(t,e)}Ns()},ig))}function Kg(){Dr!==void 0&&(clearInterval(Dr),Dr=void 0),zn&&cancelAnimationFrame(zn),zn=0,jr=0,_r=0,ue?.disconnect(),ue=null,zr=null}function Wg(t){Li===t&&ke||(ke?.disconnect(),Li=t,ke=new MutationObserver(()=>{if(!t.isConnected){ke?.disconnect(),ke=null,Li=null;return}Ru(t)}),ke.observe(t,{childList:!0}))}function Ru(t){if(Wg(t),t.querySelector(`#${Ci}`))return;let e=document.createElement("button");e.type="button",e.id=Ci,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Bi()}<span>Bloom++</span>`,e.addEventListener("pointerdown",As),e.addEventListener("pointerup",As),e.addEventListener("click",n=>{As(n),Bs()}),t.insertBefore(e,t.firstChild)}function Ti(){let t=Fn();return t?(Ru(t),!0):!1}function Vg(t){xi(t)&&(queueMicrotask(Ti),requestAnimationFrame(()=>{Ti()}),window.setTimeout(Ti,60),window.setTimeout(Ti,180))}function Yg(){Ai?.abort();let t=new AbortController;Ai=t,document.addEventListener("click",Vg,{signal:t.signal})}function Xg(){Ai?.abort(),Ai=null,ke?.disconnect(),ke=null,Li=null}function Pu(){Dn(),hg(()=>{ku(),Lu(),Ri(),Bs()})}var Ou=E({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${og}`,`#${Gt}`,`#${Ci}`,`#${Qe}`,`#${Pi}`,`#${Ur}`,`#${Mi}`,"#bloom-menu-panel"],start(){ku(),Lu(),Ug(),Yg(),Si?.(),Si=yu(Ni),Ni(),Cs=[Rn("pluginToggle",()=>{Me&&Je()}),Rn("pluginPin",()=>{Me&&Je()}),Rn("pluginStar",()=>{Me&&Je()})]},stop(){Kg(),Xg(),Si?.(),Si=null;for(let t of Cs)t();Cs=[],Os(),document.getElementById(Gt)?.remove(),document.getElementById(Ci)?.remove(),document.getElementById(Mi)?.remove(),wu=null,ag=null,qr=null,$r=null,Hi=null,Eu=null,Fr=null,Me=!1}});var Di='form[data-type="unified-composer"], form.w-full[data-type]',Ut=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Gn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Bu=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Du=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Zg=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Jg='[contenteditable="false"], button, [role="button"]';function Ot(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function tn(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Ot(o)))return o;return null}function _u(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function z(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=_u(t);return!!(Zg.test(n)||/^stop$/i.test(n))}function Bt(){let e=Array.from(document.querySelectorAll(Di)).find(Ot);if(e instanceof HTMLElement)return e;let n=tn(document,Ut),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function it(){let t=Array.from(document.querySelectorAll(Ut));return t.find(Ot)??t[0]??null}function Qg(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Jg);return!!n&&n!==e&&e.contains(n)}function Ds(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Qg(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Kt(t){let e=t??it();return e?Ds(e,e).replaceAll("\u200B","").trim().length>0:!1}function Ae(t){return!Kt(t)}function _i(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function qu(t){let e=Bt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Ot(n))&&t(n))return n;return null}function He(){let t=Bt(),e=tn(t,Gn)??tn(document,Gn);return e&&!z(e)?e:qu(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!z(n);let o=_u(n);return/^(send|send prompt|发送)$/i.test(o)&&!z(n)})}function en(){let t=Bt(),e=tn(t,Bu,!0)??tn(document,Bu,!0);if(e)return e;let n=tn(t,Du)??tn(document,Du);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Ot(r)&&z(r))return r}return qu(z)}function Wt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Ds(n,t)).join(`
`):Ds(t,t)}function _s(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function de(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),_s(t,n)}var Fu=new C("Streaming");function Xr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Ot(e))&&(z(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function tb(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Ot(t))}function eb(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Ot(t))}function nb(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Yt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function W(){if(en()||Xr()||nb())return!0;let t=He();return t&&Ot(t)&&!z(t)?!1:!!(tb()||eb())}var rb=400,$u=3,an=new Set,Kr,Wr=null,qs=null,rn=!1,nn=0,Ne="",Re="",Pe=!1,Vr=!1,Yr=!1,Vt=!1,J=null,Et="",on=!1;function j(){return Vt}function sn(){return Pe}function Un(){return Et}function $s(){return N()||Et}function zu(){return se(Rt())}function qi(t,e){return{streaming:t,contextKey:e,conversationId:$s()}}function Fs(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function ob(t){return!t||t==="/"||t.startsWith("/g/")}function V(t,e){if(!t||t===e)return!1;let n=le(Fs(e)||e);return!n||!(t.endsWith("|draft")||ob(Fs(t)))?!1:Et?n===Et:on}function $i(){rn=!1,nn=0,Ne="",Pe=!1,Vr=!1,Yr=!1,Et="",on=!1}function ib(t){for(let e of Array.from(an))try{e.onFall?.(t)}catch{}}function ab(t){for(let e of Array.from(an))try{e.onRise?.(t)}catch{}}function Ie(t){for(let e of Array.from(an))try{e.onTick?.(t)}catch{}}function sb(t,e){for(let n of Array.from(an))try{n.onContext?.(t,e)}catch{}}function lb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&z(n)&&(Pe=!0)}function cb(t){if(t.type==="post-start"){let n=N();if(!t.conversationId){n||(on=!0),(!n||n===Et)&&(Vt=!1,Pe=!1);return}if(!(t.conversationId===n||t.conversationId===Et)&&!(!n&&on))return;Et=t.conversationId,on=!1,Vt=!1,Pe=!1;return}if(t.type!=="post-end"||!rn&&!J)return;let e=N();t.conversationId&&!(e?t.conversationId===e:t.conversationId===Et)||(Yr=!0,t.error&&(Vr=!0,J&&(J.error=!0)))}function ub(){let t=zu(),e=W();if(Re&&t&&Re!==t){let o=Re;if(!V(o,t))J=null,$i(),Vt=e;else{let i=le(Fs(t));if(i&&!Et&&(Et=i,on=!1),Ne===o&&(Ne=t),J&&J.contextKey===o){J.contextKey=t;let a=$s();a&&(J.conversationId=a)}Vt=!1}if(Re=t,sb(t,o),Vt){Ie(qi(!1,t));return}}else t&&(Re=t);if(Vt){if(e){Ie(qi(!1,t));return}Vt=!1}if(J)if(e||J.contextKey!==t)J=null;else{let o=J;J=null,$i(),ib(o),Ie(qi(!1,t));return}let n=qi(e,t);if(e){let o=!rn;o&&(Pe=!1,Vr=!1,Yr=!1),rn=!0,nn=0,Ne=t,o&&ab(n),Ie(n);return}if(!rn){Ie(n);return}if(nn+=1,Yr&&(nn=Math.max(nn,$u)),nn<$u){Ie(n);return}if(!(!!Ne&&Ne===t)){$i(),Ie(n);return}J={contextKey:Ne||t,conversationId:$s(),userStopped:Pe,error:Vr||Yt()},Ie(n)}function db(){Kr===void 0&&(rn=W(),Re=zu(),Ne=rn?Re:"",nn=0,Pe=!1,Vr=!1,Yr=!1,Vt=!1,J=null,Et="",on=!1,Wr?.abort(),Wr=new AbortController,document.addEventListener("click",lb,{capture:!0,signal:Wr.signal}),qs=xt(cb),Kr=setInterval(ub,rb),Fu.debug("watchStreamingEdge started"))}function fb(){an.size||(Kr!==void 0&&(clearInterval(Kr),Kr=void 0),Wr?.abort(),Wr=null,qs?.(),qs=null,$i(),Re="",Vt=!1,J=null,Fu.debug("watchStreamingEdge stopped"))}function ct(t){let e=typeof t=="function"?{onFall:t}:t;return an.add(e),db(),()=>{an.delete(e),fb()}}var ju="bloom-host-icon",Zr="data-bloom-host-rel",zs="not all",js=0,Gu=0,mb=400;function Uu(t){js+=1;try{t()}finally{js-=1}}function Fi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Oe(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Ku(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function pb(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function gb(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Gu<mb||(Gu=n,t.appendChild(e))}function bb(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Fi(n)&&(n.getAttribute(Zr)||n.setAttribute(Zr,n.rel),n.media!==zs&&(n.media=zs),n.rel!==ju&&(n.rel=ju))}function hb(t){for(let e of t.querySelectorAll(`link[${Zr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Zr);n&&(e.rel=n),e.removeAttribute(Zr),e.media===zs&&e.removeAttribute("media")}}function Wu(t,e){let{head:n}=document;!n||!e||Uu(()=>{bb(n,t);let r=Ku(t),{type:o,sizes:i}=pb(e);r?gb(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Vu(t,e){let{head:n}=document;n&&Uu(()=>{Ku(t)?.remove(),hb(n)})}function Yu(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(js)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Fi(c.target)&&(a=!0,Oe(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Fi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Fi(u)&&u.id!==t&&(a=!0,Oe(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var yb=["original","badge","dot","hole","bg"],Ju=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Qu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},zi="#FCFCFC",vb="#111111",Xu="#111111",xb="#ffffff",wb="#212121",Eb="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Sb={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ji=32,Zu=64;function td(t){return typeof t=="string"&&yb.includes(t)}function Tb(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Gi(t){let e=document.createElement("canvas");e.width=ji,e.height=ji;let n=e.getContext("2d");return n?(n.scale(ji/Zu,ji/Zu),t(n),e.toDataURL("image/png")):""}function Lb(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function Ui(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Eb);n&&(t.strokeStyle=vb,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function kb(t,e,n){let r=Qu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Xu,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Xu,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=xb,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Jr(t,e){if(t==="original")return e==="wait"?Gi(r=>Ui(r,zi)):Tb(Sb[e]);let n=e==="wait"?void 0:Qu[e];return Gi(t==="hole"?r=>Ui(r,n??zi):t==="bg"?r=>{r.fillStyle=n??wb,Lb(r,0,0,64,64,14),r.fill(),Ui(r,zi,!1)}:r=>{Ui(r,zi),e!=="wait"&&kb(r,e,t==="dot"?"dot":"badge")})}function ed(t){return{wait:Jr(t,"wait"),rotate:Jr(t,"rotate"),done:Jr(t,"done"),ready:Jr(t,"ready"),error:Jr(t,"error")}}var Cb=new C("ChatStateFavicons"),cn="bloom-chat-state-favicon",ad=["input","beforeinput","cut","paste","compositionend"],sd=M({style:{type:3,description:"Favicon overlay",options:Ju}}),Xt="",Ks={wait:"",rotate:"",done:"",ready:"",error:""},Qr="wait",ut=!1,Q=!1,D=null,gt="",St="",dn=!0,Vi=!1,Kn=null,Tt=0,Ki=null,Wi=null,ln=null,Us=null,Wn=null,Dt=!1,nd=new WeakSet;function Mb(){let t=sd.store.style;return td(t)?t:"bg"}function ld(){let e=document.querySelector(`link[rel~="icon"]:not(#${cn}), link[data-bloom-host-rel]:not(#${cn})`)?.href;return Oe(e)?e:Oe(Xt)?Xt:""}function Ab(){let t=document.getElementById(cn);return t instanceof HTMLLinkElement?t:null}function Hb(){if(!Oe(Xt)){let t=ld();t&&(Xt=t)}return Oe(Xt)?Xt:Ks.wait}function cd(t){return t==="wait"?Hb():Ks[t]}function ud(){Wu(cn,cd(Qr))}function q(t){let e=cd(t);if(Qr===t){let n=Ab();if(n&&n.getAttribute("href")===e)return}Qr=t,ud()}function rd(){Ks=ed(Mb()),q(Qr)}function Ws(){return se(Rt())}function Vs(t,e){!t||!e||t===e||(D===t&&(D=e),gt===t&&(gt=e),St===t&&(St=e))}function Ib(){let t=Ws();if(!(W()||ut||Q))return gt="",t;if(gt&&t&&gt!==t)if(V(gt,t))Vs(gt,t),gt=t;else return gt="",t;else!gt&&t&&(gt=t);return gt||t}function od(t){return!D||!t?!1:D===t?!0:V(D,t)}function dd(){ut=!1,Q=!1,D=null,gt=""}function fd(t){St=t,dd(),dn=!1,Vi=!0,q("wait")}function Gs(t){return!t&&dn}function Nb(){if(!Dt)return;let t=Ws();if(St&&t&&St!==t&&!V(St,t)){fd(t);return}St&&t&&V(St,t)&&Vs(St,t),t&&(St=t);let e=W(),n=e&&!j();if(Vi){if(j()){q("wait");return}Vi=!1}if(j()){q("wait");return}let r=Ib(),o=Ae();if(sn()&&!e){ut=!1,Q=!1,D=null,q(o?"wait":Gs(o)?"ready":"wait");return}if(Yt()&&!e&&ut){q("error"),ut=!1,Q=!1,D=null;return}if(n){ut||(dn=!1),ut=!0,Q=!1,D=r,q("rotate");return}if(ut)if(!od(t))ut=!1,Q=!1,D=null;else if(Q){ut=!1,Q=!0,D=t||r,q("done");return}else{q("rotate");return}if(Q)if(D&&t&&!od(t))Q=!1,D=null;else if(o){D=r||D,q("done");return}else if(Gs(o)){Q=!1,q("ready");return}else{Q=!1,q("wait");return}D=null,o?q("wait"):Gs(o)?q("ready"):q("wait")}function un(){Dt&&(hd(),pd(),gd(),Nb())}function md(){if(Wn){for(let t of ad)Wn.removeEventListener(t,bd,!0);Wn=null}}function pd(){let t=Bt(),e=t&&t!==document.body?t:null;if(!(Wn===e&&e?.isConnected)&&(md(),!!e)){Wn=e;for(let n of ad)Wn.addEventListener(n,bd,{capture:!0,passive:!0})}}function gd(){let t=Bt();if(!(ln&&Us===t&&t.isConnected)){if(ln?.disconnect(),Us=t,!t||t===document.body){ln=null;return}ln=new MutationObserver(()=>Yi()),ln.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Yi(){if(Dt){if(document.hidden){Tt&&(cancelAnimationFrame(Tt),Tt=0),un();return}Tt||(Tt=requestAnimationFrame(()=>{Tt=0,Dt&&un()}))}}function bd(){Kt()&&(dn=!0),Yi()}function id(){Kt()&&(dn=!0),Yi()}function Rb(){Dt&&(Tt&&(cancelAnimationFrame(Tt),Tt=0),un())}function Pb(){Dt&&(dn=!1,un())}function Ob(t){if(!Dt)return;if(t.userStopped){ut=!1,Q=!1,D=null,q("wait");return}if(t.error){ut=!1,Q=!1,D=null,q("error");return}let e=Ws();if(t.contextKey&&e&&t.contextKey!==e&&!V(t.contextKey,e)){ut=!1,Q=!1,D=null,q("wait");return}ut=!1,Q=!0,D=e||t.contextKey,q("done")}function Bb(){Dt&&un()}function Db(t,e){if(Dt){if(V(e,t)){Vs(e,t),St=t,un();return}fd(t)}}function hd(){let t=it();!t||nd.has(t)||(nd.add(t),t.addEventListener("input",id,{capture:!0,passive:!0}),t.addEventListener("compositionend",id,{capture:!0,passive:!0}))}var yd=E({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:sd,startAt:"DOMContentLoaded",cleanupSelectors:[`#${cn}`],start(){Dt=!0,Xt=ld()||Xt,rd(),Wi?.disconnect(),Wi=Yu(cn,t=>{Oe(t)&&(Xt=t),ud()}),Kn?.abort(),Kn=new AbortController,window.addEventListener("popstate",Yi,{signal:Kn.signal}),document.addEventListener("visibilitychange",Rb,{signal:Kn.signal}),hd(),pd(),gd(),Ki?.(),Ki=ct({onRise:Pb,onFall:Ob,onTick:Bb,onContext:Db}),un(),Cb.debug("favicon watch started")},stop(){Dt=!1,Tt&&cancelAnimationFrame(Tt),Tt=0,Ki?.(),Ki=null,Kn?.abort(),Kn=null,md(),ln?.disconnect(),ln=null,Us=null,Wi?.disconnect(),Wi=null,dd(),St="",dn=!0,Vi=!1,Qr="wait",Vu(cn,Xt)},onSettingsChange:rd});var vd=`.bloom-ih-hud {
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
`;var dE=new C("InputHistory"),Ys=/\u200B/g,xd=10,wd=500,Ed=100,qb=8,$b=120,Fb=2e3,Xi=10,Zi=M({maxEntries:{type:4,description:"Max stored prompts",min:xd,max:wd,default:Ed},history:{type:5,description:"Stored prompts",render:nh},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Xs=new Map,tt=0,Zs="",Zt=!1,eo=!1,tl=0,to=null,Js,el=null,Sd=!0;function _t(){let t=Zi.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Td(t){let e=ot(Number(Zi.store.maxEntries??Ed),xd,wd);return t.length>e?t.slice(t.length-e):t}function Ji(t){Zi.store.entries=Td(t)}function zb(t){return t.replaceAll(Ys,"").replace(/\n$/,"").trim()}function Qs(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Ut);return n instanceof HTMLElement?n:it()}function jb(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Wt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(Ys,"").trim().length===0,last:i.toString().replaceAll(Ys,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ld(t){clearTimeout(Js),Js=setTimeout(()=>{if(t!==tl)return;eo=!1;let e=el;e&&_s(e,Sd)},$b)}function kd(t,e,n){eo=!0,el=t,Sd=n;let r=++tl;de(t,e,n),Ld(r)}function Gb(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Vn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Ub(){document.querySelector(".bloom-ih-hud")?.remove()}function Kb(t,e){let n=Gb();n.textContent=t;let r=(e.closest("form")??Bt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-qb)}px`,n.classList.add("bloom-ih-hud-on")}function nl(t){let e=zb(t);if(!e)return;let n=Date.now(),r=Xs.get(e);if(r&&n-r<Fb)return;Xs.set(e,n);let o=_t().filter(i=>i!==e);o.push(e),Ji(o),tt=_t().length,Zt=!1,Vn()}function Wb(t,e){let n=_t();if(!n.length&&t)return;tt>=n.length&&(Zs=Wt(e),tt=n.length);let r=t?tt-1:tt+1;r<0||r>n.length||(tt=r,Zt=!0,kd(e,r===n.length?Zs:n[r],t),r<n.length?Kb(`${r+1} / ${n.length}`,e):Vn())}function Vb(t){Zt=!1,Vn(),kd(t,Zs,!1),tt=_t().length}function Yb(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Qs(t.target)??Qs(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Zt&&!t.altKey&&!t.shiftKey){Vb(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){nl(Wt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=_t();if(!r){let i=jb(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||tt<=0)||!n&&tt>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Wb(n,e))}function Xb(t){if(Qs(t.target)){if(eo){Ld(tl);return}Zt&&(Zt=!1,Vn(),tt=_t().length)}}function Zb(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Ut);n instanceof HTMLElement&&nl(Wt(n))}function Jb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Gn);if(!n||!(n instanceof HTMLElement)||z(n))return;let r=it();r&&nl(Wt(r))}function Qb(t){if(!(!Zt||eo)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Zt=!1,Vn()}}function th(){if(to)return;to=new AbortController;let{signal:t}=to,e={capture:!0,signal:t};window.addEventListener("keydown",Yb,e),window.addEventListener("input",Xb,e),window.addEventListener("submit",Zb,e),window.addEventListener("click",Jb,e),window.addEventListener("pointerdown",Qb,e)}function eh(t){let e=_t().slice();e.splice(t,1),Ji(e),tt>e.length&&(tt=e.length)}function nh(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=_t().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Xi));n>=l&&(n=l-1);let c=s.slice(n*Xi,n*Xi+Xi);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((w,h)=>{let x=i.indexOf(w),ft=_t().length-1-x,mt=document.createElement("div");mt.className="bloom-ih-item";let Z=document.createElement("button");Z.type="button",Z.className=`bloom-ih-body${r===h?"":" bloom-ih-clamp"}`,Z.textContent=w,Z.addEventListener("click",()=>{r=r===h?-1:h,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let lt=document.createElement("button");lt.type="button",lt.title="Copy",lt.textContent="C",lt.addEventListener("click",()=>{Rc(w)});let yt=document.createElement("button");yt.type="button",yt.title="Delete",yt.textContent="\xD7",yt.addEventListener("click",()=>{eh(ft),o()}),O.append(lt,yt),mt.append(Z,O),g.appendChild(mt)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Ji([]),tt=0,o())}),d.append(f,m,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Cd=E({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Zi,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",vd),tt=_t().length,Zt=!1,th()},stop(){to?.abort(),to=null,Vn(),Ub(),Xs.clear(),clearTimeout(Js),eo=!1,el=null,Zt=!1},onSettingsChange(){let t=_t(),e=Td(t);e.length!==t.length&&Ji(e),tt>e.length&&(tt=e.length)}});var rl="noShareLink",rh=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],oh=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],ol=M({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Md(t){return`${t.join(",")}{display:none!important}`}function Ad(){let t=[];if(ol.store.hideShareChat!==!1&&t.push(Md(rh)),ol.store.hideShareProject!==!1&&t.push(Md(oh)),!t.length){L(rl);return}k(rl,t.join(`
`))}var Hd=E({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:ol,start:Ad,onSettingsChange:Ad,stop(){L(rl)}});var Rd="noDictation",ih=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],ah=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Pd=M({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Id(t){return`${t.join(",")}{display:none!important}`}function Nd(){let t=[Id(ih)];Pd.store.hideDictationSettings!==!1&&t.push(Id(ah)),k(Rd,t.join(`
`))}var Od=E({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Pd,start:Nd,onSettingsChange:Nd,stop(){L(Rd)}});var il="noSidebarIdentity",Yn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],_d=Yn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),qd=Yn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),sh=[..._d,...qd],lh=[..._d,...Yn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],ch=Yn.map(t=>`${t} a[href^="mailto:"]`),uh=Yn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),dh=Yn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),no=M({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Bd(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function fh(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function mh(){return`${dh.join(",")}{margin-block:auto!important}`}function ph(){return`${uh.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Dd(){let t=no.store.hideUsername!==!1,e=no.store.hideEmail!==!1,n=t&&no.store.enlargePlan!==!1,r=t&&no.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(fh([...lh,...qd])),o.push(mh())):o.push(Bd(sh))),e&&o.push(Bd(ch)),n&&o.push(ph()),!o.length){L(il);return}k(il,o.join(`
`))}var $d=E({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:no,start:Dd,onSettingsChange:Dd,stop(){L(il)}});var Fd=`#bloom-rt-host {
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
`;var Gd=new C("RecentTopics"),Jn="bloom-rt-host",Ud="home",Kd=/^\/c\/([a-z0-9_-]{8,})/i,bh=/\/c\/([a-z0-9_-]{8,})/i,Wd=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,hh=new Set(["Backquote","IntlBackslash"]),yh=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),vh=140,xh=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),et=M({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:xh},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Qi=null,ta=null,bt=!1,lo=!1,ro=!1,Jt=0,fn="",Xn=null,oo=null,Zn,al=null,sl=null;function wh(){let t=Number(et.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function io(){let t=et.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function cl(){let t=et.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Vd(){let t=et.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ul(){let t=et.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function na(t){let e=wh();return t.length>e?t.slice(0,e):t}function Qt(t){return t===Ud}function ao(t,e=vh){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function dl(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Kd)?.[1]??""}catch{return t.match(bh)?.[1]??""}}function mn(){let t=(location.pathname||"/").match(Kd);if(t?.[1])return t[1];let n=Rt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Ud}function fl(t){if(Qt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(dl(r.getAttribute("href")||"")!==t)continue;let o=ao(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return mn()===t&&e&&!/^ChatGPT$/i.test(e)?ao(e,80):""}function Eh(t){if(Qt(t))return"New chat";let e=cl()[t];if(e)return e;let n=Bn(t);return n||fl(t)||"Chat"}function Sh(t){return ul()[t]||""}function Th(t){return Vd()[t]||{}}function ml(t,e){if(!t||Qt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=cl();n[t]!==e&&(n[t]=e,et.store.titles=n)}function Lh(t){t.type==="conversation-meta"&&(ml(t.conversationId,t.title),bt&&Qn())}function kh(t,e){if(!t||Qt(t)||!e)return;let n=ul();n[t]!==e&&(n[t]=e,et.store.projects=n)}function Ch(t,e){if(!t||Qt(t)||!e.user&&!e.assistant)return;let n=Vd(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,et.store.previews=n)}function pl(t){if(!t||Qt(t)&&et.store.includeHome===!1)return;let e=io().filter(n=>n!==t);e.unshift(t),et.store.visits=na(e)}function ra(){let t=et.store.includeHome!==!1;return na(io().filter(n=>t||!Qt(n))).map(n=>({id:n,title:Eh(n),project:Sh(n),preview:Th(n)}))}function zd(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return ao(o)}catch{return""}}function so(t){if(!t||Qt(t)||t!==mn())return;let e=fl(t);e&&ml(t,e);let n=zd("user"),r=zd("assistant");Ch(t,{user:n,assistant:r});let o=Xd(t);if(o){let i=Yd(o);i&&kh(t,i)}}function gl(){let t=cl(),e=ul(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Jn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=dl(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=ao(c.textContent||"",80);d&&!Wd.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Yd(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(et.store.titles=t),i&&(et.store.projects=e);let a=io(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(et.store.visits=na([...a,...l]))}function Yd(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=ao((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Wd.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Xd(t){if(Qt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(dl(e.getAttribute("href")||"")===t)return e}catch{}return null}function Mh(t){let e=Xd(t);if(e){e.click();return}if(Qt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Ah(){let t=mn();fn&&fn!==t&&so(fn),fn=t,pl(t),gl();let e=fl(t);e&&ml(t,e),so(t)}function ea(){Zn===void 0&&(Zn=window.setTimeout(()=>{Zn=void 0,Ah()},120))}function Hh(){Xn||(Xn=history.pushState.bind(history),oo=history.replaceState.bind(history),history.pushState=function(...e){let n=Xn(...e);return ea(),n},history.replaceState=function(...e){let n=oo(...e);return ea(),n})}function Ih(){Xn&&(history.pushState=Xn),oo&&(history.replaceState=oo),Xn=null,oo=null}function Nh(t){return hh.has(t.code)||t.keyCode===192?!0:yh.has(t.key)}function Zd(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Rh(t,e){lo=e,gl(),so(mn()),bt=!0,Jt=0;try{let n=mn();pl(n);let r=ra();r.length>1&&(Jt=t?r.length-1:1)}catch(n){Gd.error("Failed to open switcher:",n)}Qn()}function jd(t){let{length:e}=ra();e&&(Jt=(Jt+(t?-1:1)+e)%e,Qn())}function bl(){if(!bt)return;let t=ra()[Jt];bt=!1,lo=!1,Qn(),t&&Mh(t.id)}function Jd(){bt&&(bt=!1,lo=!1,Qn())}function Ph(t){if(Zd(t)){ro=!0;return}if((t.ctrlKey||ro)&&!t.altKey&&!t.metaKey&&Nh(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{bt?jd(t.shiftKey):Rh(t.shiftKey,!0)}catch(n){Gd.error("Hotkey failed:",n)}return}if(bt){if(t.key==="Escape"){t.preventDefault(),Jd();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),bl();return}t.key==="Tab"&&(t.ctrlKey||ro)&&(t.preventDefault(),jd(t.shiftKey))}}function Oh(t){Zd(t)&&(ro=!1,bt&&lo&&bl())}function Bh(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ea)}function Dh(t){!bt||(t.target instanceof Element?t.target:null)?.closest(`#${Jn}`)||Jd()}function _h(){document.visibilityState==="hidden"&&so(mn())}function ll(t=ta){t instanceof HTMLElement&&Ei(t,wi("auto"),!0)}function qh(){if(!document.body)return null;let t=document.getElementById(Jn);if(t instanceof HTMLElement)return ta=t,ll(t),t;t=document.createElement("div"),t.id=Jn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ta=t,ll(t),t}function Qn(){let t=qh();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!bt){e.dataset.visible="false",e.replaceChildren();return}let n=ra();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Jt>=n.length&&(Jt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Jt?"true":"false",s.setAttribute("aria-selected",a===Jt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Jt=a,bl()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function $h(){document.getElementById(Jn)?.remove(),ta=null}var Qd=E({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Jn}`],settings:et,start(){k("recentTopics",Fd),fn=mn(),pl(fn),gl(),so(fn),al=xt(Lh),Hh(),Qi=new AbortController;let{signal:t}=Qi;window.addEventListener("keydown",Ph,{capture:!0,signal:t}),window.addEventListener("keyup",Oh,{capture:!0,signal:t}),window.addEventListener("popstate",ea,{signal:t}),document.addEventListener("click",Bh,{capture:!0,signal:t}),document.addEventListener("click",Dh,{signal:t}),document.addEventListener("visibilitychange",_h,{signal:t}),sl=Rn("schemeChange",()=>ll())},stop(){Qi?.abort(),Qi=null,Zn!==void 0&&(clearTimeout(Zn),Zn=void 0),Ih(),al?.(),al=null,sl?.(),sl=null,bt=!1,lo=!1,ro=!1,$h()},onSettingsChange(){let t=na(io());t.length!==io().length&&(et.store.visits=t),bt&&Qn()}});var hl="cleaner",Fh=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],zh=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],jh=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Gh=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Uh=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Kh=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],pn=M({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function tr(t){return`${t.join(",")}{display:none!important}`}function tf(){let t=[];if(pn.store.hideDownloadApps!==!1&&t.push(tr(Fh)),pn.store.hideDisclaimer!==!1&&t.push(tr(zh)),pn.store.hideUpgrade!==!1&&t.push(tr(jh)),pn.store.hideLockedModels!==!1&&t.push(tr(Gh)),pn.store.hideHomePromo!==!1&&t.push(tr(Uh)),pn.store.hideAds!==!1&&t.push(tr(Kh)),!t.length){L(hl);return}k(hl,t.join(`
`))}var ef=E({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:pn,start:tf,onSettingsChange:tf,stop(){L(hl)}});var ia=new C("ResponseNotification"),nr=M({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Qh},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),yl=!1,oa=null,er=null,co=null;function Wh(){return document.visibilityState==="hidden"||document.hidden}function Vh(){return nr.store.onlyWhenHidden===!1?!0:Wh()}function Yh(){let t=Bn(N());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function nf(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!er||er.state==="closed")&&(er=new t);let e=er,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){ia.debug("chime failed",t)}}function Xh(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){ia.debug("custom sound failed",e),nf()}}function rf(){let t=String(nr.store.soundUrl||"").trim();t?Xh(t):nf()}function Zh(){let t="Bloom++",e=`${Yh()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){ia.debug("notification failed",n)}}function Jh(){Vh()&&(nr.store.sound!==!1&&rf(),nr.store.browserNotification!==!1&&Zh())}function Qh(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>rf()),t.appendChild(e),()=>{e.remove()}}var of=E({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:nr,start(){yl=!0,oa?.(),oa=ct(t=>{if(!yl||t.userStopped||t.error)return;let e=N()||Un();t.conversationId&&t.conversationId!==e||Jh()}),co?.abort(),co=new AbortController,nr.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:co.signal}),ia.debug("watch started")},stop(){yl=!1,oa?.(),oa=null,co?.abort(),co=null;try{er?.close()}catch{}er=null}});var af=`#bloom-pq-chip {
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
`;var $e=new C("PromptQueue"),ua="bloom-pq-chip",sf="promptQueue",e0=8,n0=50,r0=2e3,o0='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',i0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,a0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),vl=M({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),_e=new Map,lf=0,$t=!1,qt="",P="",te=!1,ht=!1,ze=!1,B=null,uo=null,aa=null,De,bo,Fe=null,R=null,rr=null,la=!1,at=null,gn,qe=!0,U=!1,G=!1,dt=!1;function fe(){return se(Rt())}function or(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function s0(t){let e=or(Wt(t));if(e)return e;if(!Kt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),or(n.innerText||n.textContent||"")}catch{return""}}function gf(){try{let t=document.querySelectorAll(o0),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function bf(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function hf(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&i0.test(n))return!0}}catch{}return!1}function ca(){let t=Un();if(!t)return!1;let e=N();return!e||e===t}function go(){if(W()||ca())return!1;let t=gf();if(!t)return!0;if(bf(t)||hf(t))return!1;try{if(t.querySelector(a0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function l0(){if(j()||sn())return U=!1,!1;if(W()||ca())return U=!0,!0;let t=gf();return t&&(bf(t)||hf(t))?(U=!0,!0):U&&!go()?!0:(U=!1,!1)}function yf(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Ut);return n instanceof HTMLElement?n:null}function cf(t){return yf(t)??it()}function da(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function vf(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function c0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?or(e.innerText||e.textContent||""):""}catch{return""}}function u0(){return lf+=1,`pq${Date.now().toString(36)}${lf.toString(36)}`}function Y(t){return _e.get(t)??[]}function xf(t){return Y(t)[0]}function bn(t,e){e.length?_e.set(t,e):_e.delete(t)}function wf(t){if(!Y(t).length){G=!1,dt=!1,P="";return}G=!0,dt=!1,U=!0,P=""}function uf(t){if(!qt||qt===t)return;let e=_e.get(qt);!e?.length||_e.has(t)||V(qt,t)&&(_e.delete(qt),_e.set(t,e),P===qt&&(P=t),B?.key===qt&&(B.key=t),$e.debug("migrated pending",qt,"\u2192",t))}function fa(t){let e=fe(),n=Y(e);if(vl.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),bn(e,n)}else if(n.length>=e0){$e.debug("queue full",e);return}else n.push({id:u0(),text:t,at:Date.now()}),bn(e,n);U=!0,B={key:e,text:t,turns:vf(),ticks:3};let r=it();r&&de(r,"");try{st()}catch(o){$e.error("chip",o)}$e.debug("queued",e,n.length,t.length)}function Ef(t,e){let n=Y(t).filter(r=>r.id!==e);if(bn(t,n),R===e&&(R=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}st()}function El(){rr?.abort(),rr=null}function d0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function df(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function f0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||R||at)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;rr?.abort();let c=new AbortController;rr=c;let{signal:u}=c,d=!1,f=!1,m=0,p=0,b=0,g=0,w=null,h=[],x=[],ft=()=>{e.classList.add("bloom-pq-settling");for(let y of h)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},mt=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(w?.isConnected?w.before(t):e.append(t)),w?.remove(),w=null,ft(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},Z=()=>{la=!0;let y=A=>{A.preventDefault(),A.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{la=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=df(h.length,m,p),A=x.length>1?(x[x.length-1].top-x[0].top-x.slice(0,-1).reduce((H,zt)=>H+zt.height,0))/(x.length-1):2,pt=new Array(x.length),vt=x[0]?.top??0;for(let H of y)pt[H]=vt,vt+=x[H].height+A;for(let H=0;H<h.length;H++){if(H===m)continue;let zt=pt[H]-x[H].top;h[H].style.transform=Math.abs(zt)<.5?"":`translate3d(0,${Math.round(zt)}px,0)`}},lt=()=>{let y=Y(n).slice();if(m<0||m>=y.length)return;let A=df(y.length,m,p);if(A.every((H,zt)=>H===zt))return;let pt=A.map(H=>y[H]).filter(Boolean);if(pt.length!==y.length)return;bn(n,pt);let vt=new Map(h.map(H=>[H.dataset.pqId||"",H]));for(let H of pt){let zt=vt.get(H.id);zt&&e.append(zt)}},yt=y=>{if(f)return;f=!0;let A=d;rr===c&&(rr=null),A&&y&&t.isConnected&&lt(),mt(),A&&Z(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;mt(),y&&Z()});let Vo=()=>{d=!0,h.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=h.indexOf(t),m<0&&(m=h.findIndex(H=>H.dataset.pqId===r)),p=m<0?0:m;let y=t.getBoundingClientRect();b=y.left,g=y.top;let A=getComputedStyle(t);w=document.createElement("div"),w.className="bloom-pq-gap",w.style.height=`${y.height}px`,t.before(w),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=A.color,t.style.font=A.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let pt=e.getBoundingClientRect(),vt=e.scrollTop;x=h.map(H=>{let rs=(H===t?w:H).getBoundingClientRect(),Lc=rs.top-pt.top+vt;return{top:Lc,height:rs.height,mid:Lc+rs.height/2}})},v=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(Vo(),!d||m<0)))return;y.preventDefault(),t.style.left=`${b+(y.clientX-s)}px`,t.style.top=`${g+(y.clientY-l)}px`;let A=e.getBoundingClientRect(),pt=y.clientY-A.top+e.scrollTop,vt=d0(pt,x.map(H=>H.mid));vt!==p&&(p=vt,O())},I=y=>{y.pointerId===a&&yt(!0)};window.addEventListener("pointermove",v,{signal:u}),window.addEventListener("pointerup",I,{signal:u}),window.addEventListener("pointercancel",()=>yt(!1),{signal:u})})}function m0(){ht=!0,clearTimeout(bo),bo=setTimeout(()=>{ht=!1,bo=void 0},r0)}function p0(t){if(at)return;let e=fe(),n=Y(e).find(i=>i.id===t);if(!n)return;let r=it();if(!r)return;let o=n.text;at=t,R===t&&(R=null),El(),st(),clearTimeout(gn),gn=setTimeout(()=>{if(gn=void 0,!$t||at!==t)return;if(at=null,fe()!==e||!Y(e).some(a=>a.id===t)){st();return}bn(e,Y(e).filter(a=>a.id!==t)),st(),m0(),de(r,o);let i=He();i&&!z(i)&&!_i(i)&&(i.click(),ht=!1),wf(e)},160)}function fo(t){if(!$t||te||G||at||W()||fe()!==t)return;let e=xf(t);if(!e){P="";return}if(Yt())return;let n=it();if(!n)return;if(!Ae(n)){let o=or(Wt(n));if(o&&o!==e.text)return}let r=He();!r||z(r)||_i(r)||(te=!0,de(n,e.text),clearTimeout(De),De=setTimeout(()=>g0(t,e.id,e.text),n0))}function g0(t,e,n){De=void 0;try{if(!$t||G||at)return;let r=xf(t);if(!r||r.id!==e||r.text!==n||W()||fe()!==t)return;let o=it();if(!o)return;let i=or(Wt(o));if(i&&i!==n&&!Ae(o))return;i!==n&&de(o,n);let a=He();if(!a||z(a)||_i(a))return;a.click(),bn(t,Y(t).filter(s=>s.id!==e)),st(),wf(t),$e.debug("drained",t,Y(t).length)}finally{te=!1}}function xl(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Bt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function wl(){El(),Fe?.remove(),Fe=null,R=null,qe=!0}var Sf="http://www.w3.org/2000/svg";function b0(){let t=document.createElementNS(Sf,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function mo(t){let e=b0();for(let n of t){let r=document.createElementNS(Sf,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function po(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&Tf(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function h0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${ua}`)}function sa(){let t=Fe?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function y0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function Be(t,e){if(R!==t)return;if(R=null,e===null){st();return}let n=or(e),r=fe();if(!n){Ef(r,t);return}let o=Y(r).find(i=>i.id===t);o&&(o.text=n),st()}function ff(t){at||R!==t&&(R&&Be(R,sa()),Y(fe()).some(e=>e.id===t)&&(R=t,qe=!0,st()))}function Tf(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function mf(t){return R===t?"edit":at===t?"send":"text"}function v0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function x0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||v0(l)!==mf(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",qe?"true":"false"),n.hidden=!qe;for(let s of e){let l=a.get(s.id);if(mf(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function st(){if(El(),!$t||!document.body){wl();return}let t=fe(),e=Y(t);if(!e.length){wl();return}R&&!e.some(d=>d.id===R)&&(R=null),at&&!e.some(d=>d.id===at)&&(at=null);let n=Fe;if(n?.isConnected||(n=document.createElement("div"),n.id=ua,document.body.appendChild(n),Fe=n),x0(n,e)){xl(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",qe?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),qe=!qe,st()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",qe||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=R===d.id,p=at===d.id;m||(f.setAttribute("role","button"),f.tabIndex=p?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),p&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let b=document.createElement("div");b.className="bloom-pq-body";let g;if(m){let h=document.createElement("textarea");h.className="bloom-pq-text bloom-pq-editing",h.value=d.text,h.rows=2,h.spellcheck=!1,h.setAttribute("aria-label","Queued message text"),h.addEventListener("keydown",x=>{x.stopPropagation(),x.key==="Enter"&&!x.shiftKey?(x.preventDefault(),Be(d.id,h.value)):x.key==="Escape"&&(x.preventDefault(),Be(d.id,null))}),h.addEventListener("blur",()=>Be(d.id,h.value)),g=h,u=h}else{let h=document.createElement("span");h.className="bloom-pq-text line-clamp-2",h.textContent=p?"Sending":d.text,p?Tf(h,l,"Sending now"):h.addEventListener("click",x=>{if(la){la=!1,x.preventDefault(),x.stopPropagation();return}x.preventDefault(),x.stopPropagation(),ff(d.id)}),g=h}b.append(g),f.append(b);let w=document.createElement("div");if(w.className="bloom-pq-rail",m){let h=po("Save",mo(["M20 6 9 17l-5-5"]),()=>{Be(d.id,g instanceof HTMLTextAreaElement?g.value:sa())},l),x=po("Cancel",mo(["M18 6 6 18","m6 6 12 12"]),()=>{Be(d.id,null)},l);w.append(h,x)}else{let h=po("Remove from queue",mo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{R&&R!==d.id&&Be(R,sa()),R=R===d.id?null:R,Ef(t,d.id)},l,void 0,p),x=po("Edit queued message",mo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>ff(d.id),l,"Edit",p),ft=po("Send now",mo(["M12 19V5","M6 11 12 5l6 6"]),()=>{R&&R!==d.id&&Be(R,sa()),p0(d.id)},l,"Send now (or Enter on empty composer)",p);w.append(h,x,ft)}f.append(w),!m&&!p&&f0(f,c,t,d.id),c.append(f)}if(n.append(o,c),xl(n),u){let d=u,f=R;queueMicrotask(()=>{R===f&&d.isConnected&&y0(d)})}}function w0(){if(!B)return;B.ticks-=1;let t=Y(B.key);if(t.length&&vf()>B.turns){let e=c0();if(e&&e===B.text){$e.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),bn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,st();return}}B.ticks<=0&&(B=null)}function ma(t){return!l0()||!Kt(t)?"":s0(t)}function E0(t){if(!$t||t.isComposing||t.keyCode===229||t.key!=="Enter"||h0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||te)return;let e=cf(t.target)??cf(document.activeElement);if(!e)return;if(t.altKey||ht){ht=!1,ze=!0,queueMicrotask(()=>{ze=!1});return}let n=ma(e);n&&(da(t),fa(n))}function S0(t){if(!$t||te||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(ze){ze=!1;return}if(ht){ht=!1;return}let e=yf(t.target);if(!e)return;let n=ma(e);n&&(da(t),fa(n))}function T0(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||z(e))return null;let n=t.closest(Gn);if(n instanceof HTMLElement&&!z(n))return n;let r=He();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function pf(t){if(!$t)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${ua}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&z(n)||te||!T0(e))return;if(ht){ht=!1;return}let r=it();if(!r)return;let o=ma(r);o&&(da(t),fa(o))}function L0(t){if(!$t)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Di)&&!e.querySelector(Ut)||te)return;if(ze){ze=!1;return}if(ht){ht=!1;return}let n=it()??e.querySelector(Ut);if(!n)return;let r=ma(n);r&&(da(t),fa(r))}var Lf=E({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:sf,cleanupSelectors:[`#${ua}`],settings:vl,start(){$t=!0;let t=vl.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),qt=fe(),P="",te=!1,ht=!1,ze=!1,B=null,U=!j()&&!sn()&&(W()||ca()),G=!1,dt=!1,R=null,at=null,clearTimeout(gn),gn=void 0,k(sf,af),uo?.abort(),uo=new AbortController;let{signal:e}=uo,n={capture:!0,signal:e};window.addEventListener("keydown",E0,n),document.addEventListener("beforeinput",S0,n),document.addEventListener("pointerdown",pf,n),document.addEventListener("click",pf,n),document.addEventListener("submit",L0,n),aa?.(),aa=ct({onFall(r){if($t){if(r.userStopped||r.error){U=!1,G=!1,dt=!1,P="",st();return}if(!(G&&!dt)){if(G&&dt){if(!go())return;G=!1,dt=!1,U=!1,P=r.contextKey,fo(r.contextKey);return}if(!go()){$e.debug("unsettled fall; keep queue window");return}U=!1,P=r.contextKey,fo(r.contextKey)}}},onRise(){j()||sn()||(G&&(dt=!0),U=!0)},onContext(r,o){o&&r&&!V(o,r)&&(U=!1,G=!1,dt=!1,P="",te=!1,De!==void 0&&(clearTimeout(De),De=void 0)),uf(r),qt=r,st()},onTick(r){uf(r.contextKey),qt=r.contextKey,w0(),(j()||sn())&&(G=!1,dt=!1,U=!1,P=""),G&&(W()||ca())&&(dt=!0),G&&dt&&go()&&(G=!1,dt=!1,U=!1,Y(r.contextKey).length&&(P=r.contextKey,fo(r.contextKey))),!G&&U&&go()&&(U=!1,!P&&Y(r.contextKey).length&&(P=r.contextKey,fo(r.contextKey))),!G&&P&&P===r.contextKey&&fo(P),Y(r.contextKey).length&&!Fe?.isConnected?st():Fe&&xl(Fe)}}),st(),$e.debug("watch started")},stop(){$t=!1,aa?.(),aa=null,uo?.abort(),uo=null,clearTimeout(De),De=void 0,clearTimeout(bo),bo=void 0,clearTimeout(gn),gn=void 0,at=null,_e.clear(),B=null,P="",te=!1,ht=!1,ze=!1,U=!1,G=!1,dt=!1,wl()}});var kf=`.bloom-cls {
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
`;var Af=new C("ChatListStatus"),Cf="chatListStatus",ba="bloom-cls",C0="bloom-cls",M0=1200*1e3,A0="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Ft=new Map,ee=!1,Lt="",me=!1,sr=!1,kt=0,je=null,Ll=null,ir=null,Sl=null,pa=null,ho=null,ar=!1,Ge=new Set;function ga(){return Date.now()}function Hf(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function pe(t,e,n,r=!0){if(!(!t||!ee)){if(e==="idle")Ft.delete(t);else{let o=Ft.get(t);o&&o.kind===e&&n!=="net"?o.at=ga():Ft.set(t,{kind:e,at:ga(),source:n})}r&&H0({v:1,id:t,kind:e,at:ga()}),hn()}}function H0(t){try{ir?.postMessage(t)}catch{}}function I0(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||pe(e.id,e.kind,"bc",!1)}function N0(){let t=ga();for(let[e,n]of Ft)n.kind==="streaming"&&t-n.at>M0&&Ft.delete(e)}function R0(){let t=Hf();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(A0))continue;let o=le(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Mf(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Tl(t){let e=t.querySelector(`:scope > .${ba}`);return e||null}function kl(){if(!ee)return;N0();let t=N(),e=R0();je?.disconnect();try{for(let n of e){let r=le(n.getAttribute("href")||"");if(!r||!t||r!==t){Tl(n)?.remove();continue}let i=Ft.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Tl(n)?.remove();continue}let a=Tl(n);a||(a=document.createElement("span"),a.className=ba,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Mf("streaming")):i==="error"&&a.appendChild(Mf("error")))}}catch(n){Af.debug("paint failed",n)}If()}function hn(){if(ee){if(document.hidden){kt&&(cancelAnimationFrame(kt),kt=0),kl();return}kt||(kt=requestAnimationFrame(()=>{kt=0,ee&&kl()}))}}function If(){let t=Hf();if(!(je&&Ll===t&&t?.isConnected)){if(je?.disconnect(),Ll=t,!t){je=null;return}je=new MutationObserver(()=>hn()),je.observe(t,{childList:!0,subtree:!0})}}function ha(){return!!(en()||Xr())}function P0(t){return!!(ar||t&&Ge.has(t)||!sr&&!j()&&ha())}function O0(t){if(ee){if(t.type==="post-start"){sr=!1,t.conversationId?(ar=!1,Ge.add(t.conversationId),me=!0,pe(t.conversationId,"streaming","net")):(ar=!0,me=!0);return}if(t.type==="post-end"){if(ar=!1,t.conversationId){Ge.delete(t.conversationId);let e=N(),n=Un();(e?t.conversationId===e:t.conversationId===n)?pe(t.conversationId,t.error?"error":"done","net"):pe(t.conversationId,"idle","net")}ha()||(me=!1)}}}function B0(t,e){if(!ee)return;if(V(e,t)){hn();return}let n=N();if(Lt&&Lt!==n){Ge.delete(Lt);let r=Ft.get(Lt);r&&r.kind!=="idle"&&pe(Lt,"idle","local")}ar=!1,me=!1,sr=!0,n&&Ft.get(n)?.kind==="streaming"&&Ft.get(n)?.source==="local"&&!Ge.has(n)&&pe(n,"idle","local"),hn()}function D0(t){if(!ee)return;let e=t.conversationId||N();if(Lt&&e&&Lt!==e){Ge.delete(Lt);let r=Ft.get(Lt);r&&r.kind!=="idle"&&pe(Lt,"idle","local"),me=!!(e&&Ge.has(e))}if(e&&(Lt=e),sr||j()){if(j()||ha()||t.streaming){hn();return}sr=!1}if(P0(e)&&(t.streaming||ha())){me=!0,e&&pe(e,"streaming","local"),hn();return}me&&(me=!1,e&&pe(e,Yt()?"error":"done","local")),hn()}var Nf=E({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ba}`],start(){ee=!0,k(Cf,kf);try{ir=new BroadcastChannel(C0)}catch{ir=null}ir?.addEventListener("message",I0),Sl=xt(O0),pa?.(),pa=ct({onTick:D0,onContext:B0}),ho?.abort(),ho=new AbortController,document.addEventListener("visibilitychange",()=>{ee&&(kt&&(cancelAnimationFrame(kt),kt=0),kl())},{signal:ho.signal}),If(),Af.debug("sidebar status watch started")},stop(){ee=!1,kt&&cancelAnimationFrame(kt),kt=0,ho?.abort(),ho=null,je?.disconnect(),je=null,Ll=null,pa?.(),pa=null,Sl?.(),Sl=null;try{ir?.close()}catch{}ir=null,Ft.clear(),Ge.clear(),ar=!1,me=!1,sr=!1,Lt="",document.querySelectorAll(`.${ba}`).forEach(t=>t.remove()),L(Cf)}});var Pf="widerChat",Of=40,Bf=96,Df=64,_f=M({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Of,max:Bf,default:Df}});function _0(){return ot(Number(_f.store.width??Df),Of,Bf)}function Rf(){let t=_0(),e=`min(100%,${t}rem)`;k(Pf,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var qf=E({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:_f,start:Rf,onSettingsChange:Rf,stop(){L(Pf)}});var Cl="composerOpacity",lr='form[data-type="unified-composer"],form.w-full[data-type]',q0=[`${lr} [class*="corner-superellipse"]`,`${lr} [class*="bg-token-bg-primary"]`,`${lr} [class*="bg-token-main-surface"]`].join(","),$0=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),F0="#thread-bottom-container,#thread-bottom",z0=`${lr} #prompt-textarea,${lr} [contenteditable="true"]`,j0="var(--bg-primary,var(--main-surface-primary,#ffffff))",Ml=M({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function G0(){return ot(Number(Ml.store.opacity??100),0,100)}function U0(){return ot(Number(Ml.store.blur??16),0,40)}function $f(){let t=G0();if(t>=100){L(Cl);return}let e=U0(),n=`color-mix(in srgb,${j0} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(Cl,`${F0}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${$0}{display:none!important}${lr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${q0}{background-color:${n}!important;background-image:none!important;${r}}${z0}{background-color:transparent!important;background-image:none!important}`)}var Ff=E({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ml,start:$f,onSettingsChange:$f,stop(){L(Cl)}});var zf=`#bloom-bn-host {
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
`;var W0=new C("BetterNavigator"),Al="betterNavigator",Vf="bloom-bn-host",wn=60,jf=16,Rl=1e3,Gf=2400,V0=80,Yf=2.5,Y0=.4,yo="\u6B63\u5728\u8F93\u51FA\u2026",Pl="Image",X0="\u2753",Z0="\u{1F916}",Uf=/file_[0-9a-f]+/gi,J0="File",Q0="Code",ty=".markdown, .whitespace-pre-wrap",$l=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),ey="img, picture, video, canvas",ny=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,ry=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Co=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,oy=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,iy=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,ay=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,sy=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,ly=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,cy=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,uy=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),dy=2e3,fy=40,my=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,Xf=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),py=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),gy=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),by=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),ur=M({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),be=new Map,So=new Map,ne=new Set,xa=0,At=!1,he=!1,cr=!1,Ue=null,Mo=null,dr=null,wa=null,$=[],xn="",Ea=0,To=-1,Lo=0,Sa="",Mt=0,ge=0,vo,xo=null,ya=null,Hl=null,Il=null,yn=null,Ol=null,wo=null,vn=null,ye=null,Eo=null,Ta=!1,Bl=0;function fr(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Nl(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function hy(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function yy(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)my.test(hy(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Nl(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Nl(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Nl(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function ko(t){try{return!!t.closest(py)}catch{return!0}}function Kf(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Ca(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Fl(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function vy(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function va(t,e){if(t){Uf.lastIndex=0;for(let n of t.matchAll(Uf))e.add(n[0].toLowerCase())}}function xy(t){try{let e=new Set,n=s=>{vy(s)||(va(s.getAttribute("src")||"",e),va(s.getAttribute("srcset")||"",e),va(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&va(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Ca(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function wy(t,e){let n=xy(t),r=So.get(e)??0,o=Math.max(r,n);return o>0&&So.set(e,o),o>=2?`${Pl} x${o}`:Pl}function X(t){return t.replace(/\s+/g," ").trim()}function Zf(t,e){let n=t;for(;n&&n!==e;){if(n.matches(gy))return!0;n=n.parentElement}return!1}function La(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(Zf(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest($l);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return X(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<wn+20;)e.push(X(r.textContent||""));return X(e.join(" "))}function Ao(t){let e=X(t);return e.length<3||e.length>180||Co.test(e)?!1:ny.test(e)?!0:ry.test(e)}function Ma(t){let e=X(t);return e.length<8||e.length>120||/\s/.test(e)||Co.test(e)||Ao(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function Ey(t){let e=[],n=i=>{let a=X(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(X(s[1])),e.push(X(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function Sy(t){try{return ko(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function zl(t){let e=X(t);return!e||jl(e)||Ma(e)?!0:Ao(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function Ty(t){return!t.length||t.length>4||!t.every(e=>zl(e))?!1:t.some(e=>Co.test(X(e))||Ao(e)||Ma(e))}function Jf(t){try{let e=null,n=0,r=`${$l}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(Sy(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=Ey(o);if(!i.length||i.length>4||i.join(" ").length>240||!Ty(i))continue;let a=i.some(c=>Co.test(X(c))),s=i.some(c=>Ao(c)||Ma(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function Ly(t){return Jf(t)?J0:""}function ky(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(oy.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function Cy(t){try{for(let e of t.querySelectorAll(ey))if(!ky(e))return!0}catch{}return!1}function jl(t){let e=X(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||sy.test(e)||ay.test(e)?!0:e.length<=24&&(ly.test(e)||Co.test(e))}function My(t){let e=[],n=new Set,r=o=>{try{if(Zf(o,t)||o.closest($l))return}catch{return}let i=La(o);!i||n.has(i)||jl(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>wn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(La(o).length<24)&&(r(o),e.join(" ").length>wn+20))break}}catch{}return X(e.join(" "))}function Ay(t){let e=Jf(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=X(i.innerText||i.textContent||"");!a||a.length>wn+20||r.has(a)||zl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return X(n.join(" "))}function Hy(t,e){let n=[];try{for(let o of t.querySelectorAll(ty)){if(ko(o))continue;let i=La(o);if(!(!i||e==="assistant"&&jl(i)||zl(i))&&(n.push(i),n.join(" ").length>wn+20))break}}catch{}let r=X(n.join(" "));if(e==="user"){let o=Ay(t);if(o)return o}return r||(e==="assistant"?My(t):"")}function Iy(t){return t.length>wn?`${t.slice(0,wn).trimEnd()}\u2026`:t}function Wf(t){return cy.test(t)}function Ny(t,e,n,r){let o=Hy(t,e);if(o)return Iy(o);if(r)return yo;let i=Ly(t);if(i)return i;if(Fl(t))return wy(t,Ca(t));try{if(Cy(t))return Pl;if(t.querySelector("pre, code"))return Q0}catch{}return`Message ${n+1}`}function Ry(){if(he)return!0;let t=N();return!!(t&&ne.has(t)||!cr&&!j()&&Ho())}function Ho(){return!!(en()||Xr())}function Py(){xa=Date.now()}function Qf(t){he=!1,t&&ne.delete(t);let e=N();e&&ne.delete(e)}function Oy(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function By(t){if(Fl(t)||!Ho())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!La(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function Gl(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=X(e.textContent||"");if(!(n.length>32)&&iy.test(n))return!0}}catch{}return!1}function tm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function Dy(t,e){try{if(Oy(t))return!0;if(!e)return!1;if(By(t)||Gl(t))return!0}catch{}return!1}function em(t){if(!t||Ho())return!1;try{if(Gl(t)||tm(t))return!1;if(t.querySelector(uy)||Fl(t))return!0}catch{}return!1}function _y(t){if(Ho()||xa&&Date.now()-xa<dy)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!em(e.el)||Qf()}function qy(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(Xf)){if(ko(r))continue;let i=Ca(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(ko(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function $y(t){let e=[t.getAttribute("data-message-id"),t.getAttribute("data-turn-id"),t.querySelector("[data-message-id]")?.getAttribute("data-message-id"),t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id")],n=[];for(let r of e)r&&!n.includes(r)&&n.push(r);return n}function Fy(t){let e=ur.store.showAssistant!==!1,n=e&&Ry(),r=qy(t),o=null;if(e)for(let a of r)Kf(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Ca(a);if(!s)continue;let l=Kf(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&Gl(a),d=c&&tm(a),f=l==="assistant"&&c&&!em(a)&&(u||d||n||Dy(a,!0)),m=Ny(a,l,i.length,f);if(m&&m!==yo){let b=be.get(s),g=!!b&&(Ao(b)||Ma(b));(!b||g||!Wf(m)||Wf(b))&&m!==b&&be.set(s,m)}let p=f&&m===yo?yo:be.get(s)||m;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return i}function zy(t){let e=new Map;for(let n of t)if(e.set(n.id,n),!!n.el)for(let r of $y(n.el))e.set(r,n);return e}function jy(t,e){if(e)return e.text&&e.text!==yo&&be.set(t.id,e.text),{...e,id:t.id};let n=be.get(t.id)||(t.alias?be.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message"}}function Gy(t,e){let n=ur.store.showAssistant!==!1,r=zy(e),o=new Set,i=[];for(let s of t){if(s.role==="assistant"&&!n)continue;let l=r.get(s.id)||(s.alias?r.get(s.alias):void 0),c=jy(s,l);c.el&&o.add(c.el),i.push(c)}for(let s=0;s<e.length;s++){let l=e[s];if(!l.el||o.has(l.el))continue;let c=i.length;for(let u=s-1;u>=0;u--){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f+1;break}}if(c===i.length)for(let u=s+1;u<e.length;u++){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f;break}}i.splice(c,0,l),o.add(l.el)}let a=-1;for(let s=0;s<i.length;s++)i[s].role==="assistant"&&(a=s);for(let s=0;s<i.length;s++)i[s].live&&s!==a&&(i[s].live=!1);return i}function Uy(){let t=fr();if(!t||t===document.body)return[];let e=Fy(t),n=N(),r=n?Pr(n):[],o=r.length?Gy(r,e):e;return _y(o),o}function nm(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Aa(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function Ul(t){return t===window?window.innerHeight:t.clientHeight}function Ky(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(by)}catch{return!1}}function rm(){vo!==void 0&&(clearTimeout(vo),vo=void 0),xo?.classList.remove("bloom-bn-flash"),xo=null}function om(t){rm(),t.classList.add("bloom-bn-flash"),xo=t,vo=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),xo===t&&(xo=null),vo=void 0},800)}function ka(t){if(!$.length)return;let e=Math.max(0,Math.min(t,$.length-1));Ea=e,Mo?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),dr?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),wa&&(wa.textContent=`${e+1} / ${$.length}`)}function im(t){if(Ta)return;let e=dr?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function Dl(t){let e=$[t];if(!e)return;let n=e.el?.isConnected?e.el:am(e.id);if(!n){Yy(t);return}e.el=n,To=t,Lo=Date.now()+Rl,ka(t),im(t);let r=ye??Aa(n),i=Math.abs(n.getBoundingClientRect().top-nm())>Yf*Ul(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),ur.store.jumpEffect!=="none"&&om(n)}function am(t){let e=fr();if(!e||e===document.body||!t)return null;let n=[t],r=N(),i=(r?Pr(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"]`)}catch{}if(!s||ko(s))continue;let l=s.closest(Xf);return l instanceof HTMLElement?l:s}return null}function Kl(){if(ye)return ye;let t=fr();return t?Aa(t):window}function Wy(t){let e=Kl(),n=Ul(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function Vy(t,e){let n=Kl();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function Yy(t){let e=++Bl,n=$[t];if(!n)return;To=t,Lo=Date.now()+Gf+Rl,ka(t),im(t);let r=-1;for(let l=0;l<$.length;l++)$[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+Gf,a=0,s=-1;for(;Date.now()<i;){if(e!==Bl||!At)return;let l=am(n.id);if(l){n.el=l,Lo=Date.now()+Rl;let d=ye??Aa(l),m=Math.abs(l.getBoundingClientRect().top-nm())>Yf*Ul(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),ur.store.jumpEffect!=="none"&&om(l),Ct();return}let c=Kl(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&Vy(o,u))break;Wy(o),await new Promise(d=>setTimeout(d,V0))}}function Wl(){if(!At||!$.length)return;if(Date.now()<Lo&&To>=0){ka(To);return}let t=window.innerHeight*Y0,e=0;for(let n=0;n<$.length;n++){let r=$[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}ka(e)}function Xy(t){let e=Aa(t);if(ye===e&&Eo)return;Eo?.(),ye=e;let n=e===window?document:e,r=()=>{Wl(),Vl()};n.addEventListener("scroll",r,{passive:!0}),Eo=()=>n.removeEventListener("scroll",r)}function Zy(t){vn?.disconnect(),vn=null;let e=ye instanceof HTMLElement?ye:null;vn=new IntersectionObserver(()=>Wl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&vn.observe(n.el)}function Jy(){if(!document.body)return null;let t=Ue;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Vf,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{Ta=!0}),n.addEventListener("pointerleave",()=>{Ta=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Ue=t,Mo=e,dr=i,wa=o,t}function sm(){let t=Ue,e=fr();if(!t||!e||!e.isConnected||$.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=yy(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||fy,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Vl(){!At||ge||(ge=requestAnimationFrame(()=>{ge=0,At&&sm()}))}function Qy(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function tv(t){let e=Mo,n=dr;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>jf),e.classList.toggle("bloom-bn-fit",t.length>jf),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Qy(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Dl(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?X0:Z0;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Dl(o)}),n.appendChild(a)}))}function ev(t){Mo?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=dr?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function nv(){let t=N();return t===Sa?!1:(Sa=t,be.clear(),So.clear(),$=[],xn="",Ea=0,To=-1,Lo=0,he&&t&&(ne.add(t),he=!1),!0)}function rv(t){let e=ur.store.showAssistant!==!1?"1":"0";return`${Sa}|${e}|${t.map(n=>n.id).join(",")}`}function _l(){if(!At)return;nv();let t=Uy(),e=fr();if(!e||t.length<1){$=t,xn="",Ue&&(Ue.hidden=!0),vn?.disconnect(),ql();return}Jy();let n=rv(t);n!==xn?($=t,xn=n,tv(t),Xy(e),Zy(t)):($=t,ev(t)),sm(),Wl(),ql()}function Ct(){if(At){if(document.hidden){Mt&&(cancelAnimationFrame(Mt),Mt=0),_l();return}Mt||(Mt=requestAnimationFrame(()=>{Mt=0,At&&_l()}))}}function ql(){let t=fr();if(!(yn&&Ol===t&&t?.isConnected)){if(yn?.disconnect(),wo?.disconnect(),Ol=t,!t||t===document.body){yn=null;return}yn=new MutationObserver(()=>Ct()),yn.observe(t,{childList:!0,subtree:!0}),wo=new ResizeObserver(()=>Vl()),wo.observe(t)}}function ov(t){if(At){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===N())&&Ct();return}if(t.type==="post-start"){Py(),cr=!1,t.conversationId?(he=!1,ne.add(t.conversationId)):he=!0,Ct();return}if(t.type==="post-end"){if(he=!1,t.conversationId)ne.delete(t.conversationId);else{let e=N();e&&ne.delete(e)}Ct()}}}function iv(t){if(!At||!$.length||Ue?.hidden||t.altKey||t.ctrlKey||t.metaKey||Ky(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Ea+1;else if(t.key==="ArrowUp")e=Ea-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=$.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Dl(Math.max(0,Math.min(e,$.length-1)))}function av(){Bl++,rm(),vn?.disconnect(),vn=null,yn?.disconnect(),yn=null,Ol=null,wo?.disconnect(),wo=null,Eo?.(),Eo=null,ye=null,Ta=!1,Ue?.remove(),Ue=null,Mo=null,dr=null,wa=null}var lm=E({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Al,cleanupSelectors:[`#${Vf}`],settings:ur,start(){At=!0,Sa=N(),k(Al,zf),ya=new AbortController;let{signal:t}=ya;window.addEventListener("keydown",iv,{signal:t}),window.addEventListener("popstate",Ct,{signal:t}),window.visualViewport?.addEventListener("resize",Vl,{signal:t}),document.addEventListener("visibilitychange",()=>{At&&(Mt&&(cancelAnimationFrame(Mt),Mt=0),ge&&(cancelAnimationFrame(ge),ge=0),_l())},{signal:t}),Il=xt(ov),Hl=ct({onTick(){if(j()){Ct();return}cr&&!Ho()&&(cr=!1),Ct()},onFall(e){Qf(e.conversationId),Ct()},onContext(e,n){if(!V(n,e)){be.clear(),So.clear(),xn="",he=!1;let r=N();for(let o of[...ne])o!==r&&ne.delete(o);cr=!0}Ct()}}),ql(),Ct(),W0.debug("navigator started")},stop(){At=!1,Mt&&cancelAnimationFrame(Mt),Mt=0,ge&&cancelAnimationFrame(ge),ge=0,ya?.abort(),ya=null,Hl?.(),Hl=null,Il?.(),Il=null,ne.clear(),he=!1,cr=!1,xa=0,av(),be.clear(),So.clear(),$=[],xn="",L(Al)},onSettingsChange(){xn="",Ct()}});var cm=`.bloom-ts {
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
`;function um(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function dm(t){try{return new Date(t).toISOString()}catch{return""}}var pm=new C("MessageTimestamps"),fm="messageTimestamps",Ia="bloom-ts",mm=1500,lv="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",mr=M({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),pr=new Map,Tn=!1,Ht=0,Ke=null,Xl=null,Yl=null,Ha=null,Io=null,No=!1,En=!1;function gm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Jl(){let t=mr.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function bm(){let t={...Jl()};for(let[n,r]of pr)t[n]=r;let e=Object.keys(t);if(e.length>mm){let n=e.slice(e.length-mm),r={};for(let o of n)r[o]=t[o];mr.store.stamps=r;return}mr.store.stamps=t}var cv=Pc(bm,500);function hm(t,e){!t||!e||pr.get(t)===e||(pr.set(t,e),cv(),Sn())}function uv(t){return t?pr.get(t)??Jl()[t]??ui(t)??null:null}function dv(t){Tn&&t.type==="message-time"&&hm(t.messageId,t.createTime)}function fv(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function mv(){let t=gm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(lv)||e.push(n)}catch{}return e}function pv(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Zl(){if(!Tn)return;let t=mr.store.hideOwnMessages===!0,e=mr.store.showDate!==!1,n=W();En&&!j()&&(En=!1),En&&(n?No=!1:En=!1);let r=En?!1:n,o=mv();Ke?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=fv(i),c=i.querySelector(`:scope > .${Ia}`);if(t&&l==="user"){c?.remove();return}if(pv(i)){c?.remove();return}let u=uv(s);if(!u&&s&&(r||No)&&a>=o.length-2&&(u=Date.now(),hm(s,u)),!u){c?.remove();return}let d=um(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Ia,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=dm(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){pm.debug("paint failed",i)}No=r,ym()}function Sn(){if(Tn){if(document.hidden){Ht&&(cancelAnimationFrame(Ht),Ht=0),Zl();return}Ht||(Ht=requestAnimationFrame(()=>{Ht=0,Tn&&Zl()}))}}function ym(){let t=gm();if(!(Ke&&Xl===t&&t?.isConnected)){if(Ke?.disconnect(),Xl=t,!t||t===document.body){Ke=null;return}Ke=new MutationObserver(()=>Sn()),Ke.observe(t,{childList:!0,subtree:!0})}}var vm=E({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ia}`],settings:mr,start(){Tn=!0,k(fm,cm);let t=Jl();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&pr.set(e,n);Yl=xt(dv),Ha?.(),Ha=ct({onTick:Sn,onFall:Sn,onContext(e,n){V(n,e)||(En=!0,No=!1),Sn()}}),Io?.abort(),Io=new AbortController,document.addEventListener("visibilitychange",()=>{Tn&&(Ht&&(cancelAnimationFrame(Ht),Ht=0),Zl())},{signal:Io.signal}),ym(),Sn(),pm.debug("timestamp watch started")},stop(){Tn=!1,Ht&&cancelAnimationFrame(Ht),Ht=0,Io?.abort(),Io=null,Ke?.disconnect(),Ke=null,Xl=null,Ha?.(),Ha=null,Yl?.(),Yl=null,En=!1,No=!1,bm(),pr.clear(),document.querySelectorAll(`.${Ia}`).forEach(t=>t.remove()),L(fm)},onSettingsChange:Sn});var Ql="streamerMode",gv="filter:blur(6px)!important;transition:filter .2s ease",bv="filter:none!important",gr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],br=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function It(t,e){return t.map(n=>`${n} ${e}`)}var Ln=M({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function hr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${gv}}${e?`${r}{${bv}}`:""}`}function xm(){let t=[];if(Ln.store.conversations!==!1&&(t.push(hr([...It(br,'a[href^="/c/"]'),...It(br,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Ln.store.projects!==!1&&(t.push(hr([...It(br,'a[href*="/project"]'),...It(br,'a[href*="/g/g-p-"]'),...It(br,'[data-testid="project-name"]'),...It(br,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Ln.store.headerTitle!==!1&&t.push(hr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Ln.store.accountAvatar!==!1&&t.push(hr([...It(gr,"img"),...It(gr,'[class*="avatar"]'),...It(gr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Ln.store.accountName!==!1&&t.push(hr([...It(gr,".min-w-0 > .truncate"),...It(gr,".min-w-0.flex-1 .truncate")],!1)),Ln.store.accountEmail!==!1&&t.push(hr([...It(gr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){L(Ql);return}k(Ql,t.join(`
`))}var wm=E({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Ln,start:xm,onSettingsChange:xm,stop(){L(Ql)}});var Em=`.bloom-gc-panel {
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
}`;var yv=new C("GreetingCustomizer"),yr="greetingCustomizer",Sm="greetingCustomizerUi",Ro=100,ec=30,vv=120,xv=1e3,wv=50,Ev=40,Sv=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Po=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ba=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Tv(t){return!!t?.closest(Sv)}function Cm(t){return!!(Tv(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Fo(t){try{for(let e of document.querySelectorAll(t))if(!Cm(e))return e}catch{}return null}function tc(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Fo(e))return e;return t}var Mm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],nt=M({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:$v},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Mm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),re=!1,wr=!1,Cn=null,Ra,Oo,vr,Bo,Pa=0,Na=null,xr=null,Do=null,_o=null,qo=null,Oa=null;function xe(){let t=location.pathname||"/";return t==="/"||t===""}function kn(){let t=nt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Mm.slice()}function $o(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Tm(t){nt.store.greetings=t.slice(0,ec)}function zo(){let t=String(nt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Lv(){return nt.store.order==="random"?"random":"sequential"}function kv(){return ot(Number(nt.store.intervalSec??10),1,3600)*1e3}function Cv(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Mv(){return!!Fo(Ba)}function Da(){return!!(Fo(Ba)||Fo(Po))}function Av(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Mv()?tc(Ba):Fo(Po)?tc(Po):tc(Ba),i=e?`${Po}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Hv(t,e){if(t<=0)return 0;if(t===1)return Number(nt.plain.index)!==0&&(nt.store.index=0),Number(nt.plain.lastRandom)!==0&&(nt.store.lastRandom=0),0;let n=Number(nt.plain.index),r=Number(nt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Lv()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return nt.store.index=s,nt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return nt.store.index=i,i}function ve(t){if(!re)return;if(!xe()){L(yr);return}let e=kn().map($o).filter(Boolean);if(!e.length){L(yr);return}let n=Hv(e.length,t),r=e[n]??e[0],o=zo()==="manual"&&e.length>1;k(yr,Av(Cv(r),o)),Oa?.()}function nc(){Ra!==void 0&&(clearInterval(Ra),Ra=void 0)}function rc(){nc(),!(!re||!xe())&&zo()==="interval"&&(kn().filter(Boolean).length<=1||(Ra=setInterval(()=>ve(!0),kv())))}function oc(){Bo!==void 0&&(clearTimeout(Bo),Bo=void 0),Pa=0}function Lm(){if(oc(),!re||!xe())return;Pa=Ev;let t=()=>{if(Bo=void 0,!(!re||!xe())){if(Da()){zo()==="refresh"&&!wr?(wr=!0,ve(!0)):ve(!1),rc();return}Pa-=1,Pa>0&&(Bo=setTimeout(t,wv))}};t()}function ic(){if(Cn===!0){Da()?ve(!1):Lm();return}Cn=!0,wr=!1,zo()==="refresh"?(wr=!0,ve(!0)):ve(!1),rc(),Da()||Lm()}function ac(){Cn=!1,wr=!1,nc(),oc(),L(yr)}function _a(){vr===void 0&&(vr=window.setTimeout(()=>{vr=void 0,re&&(xe()?ic():Cn!==!1&&ac())},vv))}function Iv(){xr||(xr=history.pushState.bind(history),Do=history.replaceState.bind(history),_o=function(...e){let n=xr(...e);return _a(),n},qo=function(...e){let n=Do(...e);return _a(),n},history.pushState=_o,history.replaceState=qo)}function Nv(){_o&&history.pushState===_o&&xr&&(history.pushState=xr),qo&&history.replaceState===qo&&Do&&(history.replaceState=Do),xr=null,Do=null,_o=null,qo=null}function Rv(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(_a)}function Pv(t){if(!re||!xe()||zo()!=="manual"||kn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Po);if(!n||Cm(n))return;let r=window.getSelection?.();r&&String(r).trim()||ve(!0)}function Ov(){Oo===void 0&&(Oo=setInterval(()=>{if(!re)return;let t=xe();if(t!==(Cn===!0)){t?ic():ac();return}t&&Da()&&ve(!1)},xv))}function Bv(){Oo!==void 0&&(clearInterval(Oo),Oo=void 0)}function km(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var Dv="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",_v="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function qv(t,e){let n=$o(t);return n?n.length>Ro?`Keep it to ${Ro} characters.`:kn().length+(e?1:0)>ec?`At most ${ec} greetings.`:null:"Enter a greeting."}function $v(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=kn(),s=Number(nt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Ro,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let g=l.querySelector(".bloom-gc-count");g&&(g.textContent=`${$o(e).length}/${Ro}`);let w=l.querySelector(".bloom-gc-error");w&&(w.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${$o(e).length}/${Ro}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let g=document.createElement("button");g.type="button",g.className="bloom-gc-btn",g.textContent="Cancel",g.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(g)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let g=n<0,w=qv(e,g);if(w){r=w,i();return}let h=$o(e),x=kn().slice();n>=0&&n<x.length?x[n]=h:x.push(h),Tm(x),n=-1,e="",r="",i()}),m.appendChild(p),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let g=document.createElement("p");g.className="bloom-gc-empty",g.textContent="No greetings. The official heading stays.",t.appendChild(g);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((g,w)=>{let h=document.createElement("div");h.className="bloom-gc-item",w===s&&(h.dataset.active="true");let x=document.createElement("button");x.type="button",x.className=`bloom-gc-body${o===w?"":" bloom-gc-clamp"}`,x.textContent=g,x.addEventListener("click",()=>{o=o===w?-1:w,i()});let ft=document.createElement("div");ft.className="bloom-gc-item-actions";let mt=km("Edit",Dv);mt.addEventListener("click",()=>{n=w,e=g,r="",i()});let Z=km("Delete",_v);Z.addEventListener("click",()=>{let O=kn().filter((lt,yt)=>yt!==w);Tm(O),n===w?(n=-1,e=""):n>w&&(n-=1),i()}),ft.append(mt,Z),h.append(x,ft),b.appendChild(h)}),t.appendChild(b)};return Oa=i,i(),()=>{Oa===i&&(Oa=null),t.replaceChildren()}}var Am=E({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Sm,settings:nt,start(){re=!0,k(Sm,Em),Iv(),Na=new AbortController;let{signal:t}=Na;window.addEventListener("popstate",_a,{signal:t}),document.addEventListener("click",Rv,{capture:!0,signal:t}),document.addEventListener("click",Pv,{signal:t}),Ov(),Cn=null,xe()?ic():ac(),yv.debug("started")},stop(){re=!1,Na?.abort(),Na=null,vr!==void 0&&(clearTimeout(vr),vr=void 0),nc(),oc(),Bv(),Nv(),L(yr),wr=!1,Cn=null},onSettingsChange(){re&&(xe()?(ve(!1),rc()):L(yr))}});function Fv(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function qa(t){try{return await createImageBitmap(t)}catch{return null}}async function zv(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function $a(t){if(t.startsWith("data:")){let e=Fv(t);if(e){let n=await qa(e);if(n)return n}return zv(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?qa(await e.blob()):null}catch{return null}}var za="data-bloom-csi-slot",jv="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Gv=/\bsize-(?:[6-9]|10)\b/,Uv=/\b(?:h|w)-(?:[6-9]|10)\b/,Kv=/^(plus|pro|free|team|go|business|enterprise)$/i,Wv=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Fa(t){return t.getAttribute("class")||""}function Im(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Gv.test(t)?!0:Uv.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Vv(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Nm(e)}function Nm(t){return Kv.test(String(t??"").replace(/\s+/g,""))}function oe(t){return!!t?.closest(jv)}function ja(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function jo(t){let e=Fa(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Nm(t.textContent||"")}function Ga(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Go(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Yv(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Rm(t){if(oe(t)||Ga(t)||Go(t)||jo(t)||ja(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Pm(t){return oe(t)||Ga(t)||Go(t)||jo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Vv(t.textContent||"")}function Om(t){return oe(t)||Go(t)||ja(t)||jo(t)?!1:Im(Fa(t))||Pm(t)?!0:Rm(t)}function Hm(t){return!(oe(t)||ja(t)||Go(t)||jo(t)||Ga(t))}function Mn(t,e){let n=Ga(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Go(n)||ja(n)||jo(n));)oe(n)||(r=n),n=n.parentElement;return r}function Xv(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||oe(e))continue;if(Yv(Fa(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Hm(o))){if(Om(o)||Im(Fa(o)))return Mn(o,t)??o;r.push(o)}if(r.length===1)return Mn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Hm(r))return Mn(r,t)??r}}return null}function Zv(t){let e=t.querySelectorAll(Wv);for(let n of e)if(Om(n))return Mn(n,t)??n;return null}function Jv(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Pm(e))return Mn(e,t)??e;return null}function Qv(t){for(let e of t.querySelectorAll("*"))if(Rm(e))return Mn(e,t)??e;return null}function Bm(t,e){if(oe(t))return null;if(e&&!oe(e)&&t.contains(e)){let n=Mn(e,t);if(n)return n}return Xv(t)??Zv(t)??Jv(t)??Qv(t)}function Dm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Er="data-bloom-csi",Ua="data-bloom-csi-orig",An=new Set,_m=null;function lc(t){_m=t}function qm(t){return`url(${JSON.stringify(t)})`}function Ka(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function cc(t,e,n){let r=qm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function $m(t,e=za){let n=qm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function tx(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Sr(t){t.removeEventListener("error",sc);let e=t.getAttribute(Ua);t.removeAttribute(Er),t.removeAttribute(Ua),e&&t.getAttribute("src")!==e&&(t.src=e)}function sc(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&An.add(n),Sr(e),_m?.()}function Fm(t,e){if(!e||An.has(e)){Sr(t);return}tx(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Er)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Ua)&&t.setAttribute(Ua,n);t.setAttribute(Er,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",sc),t.addEventListener("error",sc),n!==e&&(t.src=e)}var zm=`/*
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
`;var jm=new C("CustomSidebarIdentity"),Gm="customSidebarIdentityUi",Wm="customSidebarIdentity",nx="bloom-csi-face",rx="bloom-csi-name",Tr=za,ox=1024,Wa=256,Vm=24,Ym=64,Xm=40,mc=1,pc=4,Uo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],uc=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=M({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Ex},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Vm,max:Ym,default:Xm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function In(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function ix(){return String(T.store.displayName??"").trim()}function Xa(t,e,n,r,o){let i=ot(n,mc,pc),a=Math.min(t,e)/i,s=ot(r,a/2,Math.max(a/2,t-a/2)),l=ot(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function ax(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function gc(t){let e=Math.min(1,ox/Math.max(t.width,t.height));return ax(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function sx(t,e,n,r){let{side:o,x:i,y:a}=Xa(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Wa,s.height=Wa;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,Wa,Wa);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function lx(t){let e=await qa(t);if(!e)return null;let n=gc(e);return e.close(),n}async function hc(t,e,n,r){let o=await $a(t);if(!o)return null;let i=sx(o,e,n,r);return o.close(),i}function yc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function Um(){T.store.avatarUrl="",T.store.avatarSource="",yc()}var Km=0;async function bc(t){let e=++Km;yc(),T.store.avatarSource=t;let n=await hc(t,.5,.5,1);return e!==Km?!1:(n&&(T.store.avatarUrl=n),!!n)}function Ko(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function dc(t){let e=Ko(t);if(!e)return!1;let n=await lx(e);return n?bc(n):!1}var Nt=!1,Lr=!1,kr=0,Za=0,Va=null,We=new Map,Cr=null,we=null,Ja=null,ie=null,Qa=null;function ts(t){let e=String(t??"").trim();if(!e||An.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function Zm(){return ts(T.store.avatarUrl)??ts(T.store.avatarSource)}var Ya=!1,fc=new Set;function Jm(){let t=ts(T.store.avatarSource);if(!t?.startsWith("data:image/")||ts(T.store.avatarUrl)?.startsWith("data:image/")||Ya||fc.has(t))return;Ya=!0;let e=In(T.store.cropX,.5),n=In(T.store.cropY,.5),r=In(T.store.cropZoom,1);hc(t,e,n,r).then(o=>{if(Ya=!1,!o){fc.add(t);return}Nt&&(T.store.avatarUrl=o,es())}).catch(()=>{Ya=!1,fc.add(t)})}function Hn(t,e){return t.map(n=>`${n} ${e}`)}function cx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function ux(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=cx(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Qm(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||oe(n)||n.closest(".min-w-0")||e.push(n);return e}function dx(t){let e=Qm(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function vc(){let t=[],e=Ze();e&&t.push(e);let n=$n();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Uo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function tp(t,e){let n=dx(t);if(n)Fm(n,e);else for(let o of Qm(t))Sr(o);let r=Bm(t,n);for(let o of t.querySelectorAll(`[${Tr}]`))o!==r&&o.removeAttribute(Tr);r&&r.setAttribute(Tr,"")}function fx(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function mx(t,e){let n=fx(t);n&&tp(n,e)}function px(){for(let t of document.querySelectorAll(`img[${Er}]`))Sr(t);for(let t of document.querySelectorAll(`[${Tr}]`))t.removeAttribute(Tr)}function gx(){let t=ot(Math.round(In(T.store.avatarSize,Xm)),Vm,Ym),e=Zm(),n=ix(),r=T.store.applyToMenu!==!1,o=[],i=[...Hn(Uo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Hn(uc,"> :first-child img"));let a=[...Hn(Uo,".min-w-0 > .truncate"),...Hn(Uo,".min-w-0.flex-1 .truncate")];r&&a.push(...Hn(uc,"> :first-child .truncate"));let s=Dm(Tr);o.push(Ka([...s.flatMap(l=>Hn(Uo,l))].join(","),t)),o.push(Ka(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(Ka(s.flatMap(l=>Hn(uc,`> :first-child ${l}`)).join(","),t)),e&&(o.push(cc(i.join(","),e,t)),o.push(cc("#stage-sidebar-tiny-bar img",e,32)),o.push($m(e))),n&&o.push(ux(a,n)),k(Wm,o.join(""))}function bx(){let t=Zm(),e=vc();for(let n of e)tp(n,t);if(T.store.applyToMenu!==!1){let n=Fn();n&&mx(n,t)}for(let n of document.querySelectorAll(`img[${Er}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Sr(n)}function es(){if(!(!Nt||Lr)){Lr=!0;for(let t of We.values())t.disconnect();we?.disconnect(),ie?.disconnect();try{gx(),bx()}finally{Lr=!1,xc(),xx(),Cr?.isConnected&&ep(Cr),Jm()}}}function Wo(){!Nt||kr||(kr=requestAnimationFrame(()=>{kr=0,es()}))}function hx(){Lr||!Nt||Wo()}function yx(t){if(We.has(t))return;let e=new MutationObserver(hx);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),We.set(t,e)}function vx(t){We.get(t)?.disconnect(),We.delete(t)}function xc(){let t=new Set;for(let n of vc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=$n();e&&t.add(e);for(let n of[...We.keys()])(!t.has(n)||!n.isConnected)&&vx(n);for(let n of t)n.isConnected&&yx(n)}function xx(){let t=vi();if(!t){ie?.disconnect(),ie=null,Ja=null;return}if(Ja===t&&ie){ie.observe(t,{childList:!0});return}ie?.disconnect(),Ja=t,ie=new MutationObserver(()=>{Lr||!Nt||(xc(),Wo())}),ie.observe(t,{childList:!0})}function ep(t){Cr===t&&we||(we?.disconnect(),Cr=t,we=new MutationObserver(()=>{if(!t.isConnected){we?.disconnect(),we=null,Cr=null;return}Lr||!Nt||Wo()}),we.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function np(t){if(!Nt||T.store.applyToMenu===!1)return;let e=Fn();if(e){ep(e),Wo();return}t<=0||requestAnimationFrame(()=>np(t-1))}function rp(t){Nt&&(es(),!(vc().length||t<=0)&&(Za=requestAnimationFrame(()=>rp(t-1))))}function wx(t){Nt&&T.store.applyToMenu!==!1&&(!xi(t)&&!Fn()||np(10))}function Ex(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,m.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let g=document.createElement("input");g.type="range",g.className="bloom-csi-zoom",g.min=String(mc),g.max=String(pc),g.step="0.05",g.setAttribute("aria-label","Zoom");let w=document.createElement("span");w.className="bloom-csi-zoom-val";let h=document.createElement("button");h.type="button",h.className="bloom-csi-btn",h.textContent="Reset",b.append(g,w,h);let x=document.createElement("p");x.className="bloom-csi-hint",x.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,b,x),t.append(u,d,f);function ft(){let v=String(T.store.avatarSource??""),I=String(T.store.avatarUrl??"");return v.startsWith("data:image/")?v:I.startsWith("data:image/")?I:""}function mt(v,I,y){if(!a)return i.x=v,i.y=I,i.zoom=ot(y,mc,pc),i;let A=Xa(a.w,a.h,y,v*a.w,I*a.h);return i.x=A.x/a.w,i.y=A.y/a.h,i.zoom=A.z,i}function Z(){g.value=String(i.zoom),w.textContent=`${Math.round(i.zoom*100)}%`;let v=a?Xa(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;v&&a&&(p.style.width=`${a.w/v.side*100}%`,p.style.height=`${a.h/v.side*100}%`,p.style.left=`${(.5-v.x/v.side)*100}%`,p.style.top=`${(.5-v.y/v.side)*100}%`)}function O(v=!1){let I=ft(),y=String(T.store.avatarUrl??"").trim(),A=!!I;s.hidden=!y&&!I,(I||y)&&(s.src=I||y),document.activeElement!==l&&(l.value=A?"":y),l.placeholder=A?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!I,d.hidden=!(e&&/^https?:\/\//.test(y)&&!I),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",I&&(v&&(i.x=In(T.store.cropX,.5),i.y=In(T.store.cropY,.5),i.zoom=In(T.store.cropZoom,1)),p.getAttribute("src")!==I&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},mt(i.x,i.y,i.zoom),Z()},p.src=I),Z())}function lt(v,I,y,A=!1){mt(v,I,y),Z();let pt=ft(),vt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,pt&&hc(pt,i.x,i.y,i.zoom).then(H=>{H&&(T.store.avatarUrl=H)})};r&&clearTimeout(r),A?vt():r=setTimeout(vt,80)}function yt(v){T.store.avatarUrl=v;let I=v.trim();if(n&&clearTimeout(n),!I){T.store.avatarSource="",yc(),e=!1,O(!0);return}if(I.startsWith("data:image/")){e=!1,n=setTimeout(()=>{$a(I).then(y=>{if(!y)return;let A=gc(y);y.close(),A&&bc(A).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(I)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{$a(I).then(y=>{if(!y){e=!0,O(!0);return}let A=gc(y);y.close(),A?(e=!1,bc(A).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",v=>{Ko(v.clipboardData)&&(v.preventDefault(),e=!1,dc(v.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",v=>{Ko(v.dataTransfer)&&v.preventDefault()}),u.addEventListener("drop",v=>{Ko(v.dataTransfer)&&(v.preventDefault(),e=!1,dc(v.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>yt(l.value)),l.addEventListener("paste",v=>{Ko(v.clipboardData)&&(v.preventDefault(),e=!1,dc(v.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",v=>{ft()&&!l.value&&(v.key==="Backspace"||v.key==="Delete")&&(Um(),e=!1,O(!0))}),c.addEventListener("click",()=>{Um(),e=!1,O(!0)}),m.addEventListener("pointerdown",v=>{v.button===0&&(m.setPointerCapture(v.pointerId),o.on=!0,o.px=v.clientX,o.py=v.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",v=>{if(!o.on||!a)return;let I=m.clientWidth;if(!I)return;let{side:y}=Xa(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);mt(o.x-(v.clientX-o.px)*(y/I)/a.w,o.y-(v.clientY-o.py)*(y/I)/a.h,i.zoom),Z()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,lt(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",v=>{v.preventDefault(),lt(i.x,i.y,i.zoom*(v.deltaY<0?1.08:1/1.08))},{passive:!1}),g.addEventListener("input",()=>lt(i.x,i.y,Number(g.value))),g.addEventListener("change",()=>lt(i.x,i.y,Number(g.value),!0)),h.addEventListener("click",()=>lt(.5,.5,1,!0));let Vo=()=>O(!1);return Qa=Vo,O(!0),()=>{Qa===Vo&&(Qa=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var op=E({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Gm,cleanupSelectors:[`.${nx}`,`.${rx}`],settings:T,start(){Nt=!0,An.clear(),lc(Wo),k(Gm,zm),Va=new AbortController,document.addEventListener("click",wx,{signal:Va.signal}),rp(40),Jm(),jm.debug("started")},onSettingsChange(){An.clear(),Qa?.(),Nt&&(xc(),es())},stop(){Nt=!1,Va?.abort(),Va=null,kr&&cancelAnimationFrame(kr),kr=0,Za&&cancelAnimationFrame(Za),Za=0;for(let t of We.values())t.disconnect();We.clear(),we?.disconnect(),we=null,Cr=null,ie?.disconnect(),ie=null,Ja=null,px(),L(Wm),lc(null),An.clear(),jm.debug("stopped")}});var Mr=new C("Bloom"),ip=!1,Sx=Date.now(),Tx=[Ou,yd,Cd,Hd,Od,$d,Qd,ef,of,Lf,Nf,qf,Ff,lm,vm,wm,Am,op];function ns(t){return new Promise(e=>setTimeout(e,t))}function Lx(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function kx(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var sp=8e3,ap=300,Cx=250;async function Mx(){if(Xe())return await ns(ap),!0;for(;Date.now()-Sx<sp;)if(await ns(Cx),Xe())return await ns(ap),!0;return Xe()||ws()}function wc(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Ax(){if(wc())return!0;let t=Date.now()+sp;for(;Date.now()<t;)if(await ns(100),wc())return!0;return wc()}function Hx(){try{GM_registerMenuCommand?.("Bloom++ settings",Pu)}catch{}}function Ix(){fi(()=>{Hr("HostShell"),Mr.info("host shell",wt)}),mi(()=>{Mr.info("idle ready",wt)}),pi(()=>{is(),Hr("HostReady"),Mr.info("chrome ready",wt)})}async function Ec(){await Dc()}async function Sc(){if(ip)return;ip=!0,iu();for(let n of Tx)try{Gc(n),pu(n)}catch(r){Mr.error("register failed",n.name,r)}Hr("Init"),Hx(),Ix();let t=()=>Hr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Lx(),is(),Mr.info("styles ready",wt),await kx(),Ax().then(n=>{n&&gi()}),!await Mx()){Mr.warn("late islands not detected; starting default plugins",wt),Dn(),bi();return}await fu()}var lp=typeof unsafeWindow<"u"?unsafeWindow:window,Nx=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Nx){let t=lp.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",wt);try{Object.defineProperty(lp,"Bloom",{value:Tc,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Ec().then(()=>Sc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
