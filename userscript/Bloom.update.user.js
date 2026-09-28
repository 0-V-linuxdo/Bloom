// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260928] v1.4.113
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

/* Bloom++ [20260928] v1.4.113. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Fp=Object.defineProperty;var jp=(t,e)=>{for(var n in e)Fp(t,n,{get:e[n],enumerable:!0})};var Uc={};jp(Uc,{REPO_URL:()=>Pu,Settings:()=>j,VERSION:()=>Tt,contextKeyFromUrl:()=>de,conversationChain:()=>jr,conversationTitle:()=>Wn,conversationToken:()=>_t,currentConversationId:()=>R,draftText:()=>ro,ensureConversationChain:()=>ku,hasDraftText:()=>Jt,hasErrorToast:()=>te,hasLateIslands:()=>rn,init:()=>Gc,initSettings:()=>zc,isDocumentInteractive:()=>zu,isStreaming:()=>V,isUserDraftEmpty:()=>Oe,messageCreateTime:()=>wi,plugins:()=>ue,requestChromeReady:()=>Ci,requestIdleReady:()=>Vn,requestShellReady:()=>ki,setEditorText:()=>ge,subscribeHarvest:()=>St,watchStreamingEdge:()=>ft,whenChromeReady:()=>Mi,whenIdleReady:()=>Li,whenShellReady:()=>Ti});var Me=new Map,si=!1;function zp(){return document.getElementById("bloom-root")?.shadowRoot??null}function Wc(){return document.head??null}function zn(){let t=zp();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Gp()}function xs(t,e){if(!si)return;let n=Wc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),zn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,zn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,zn()}function M(t,e){let n=Me.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Me.set(t,n)),si&&xs(t,n)}function Es(){if(!Wc())return!1;si=!0;for(let[e,n]of Me)xs(e,n);return zn(),!0}function Vc(t){let e=Me.get(t);e&&(e.disabled=!1,si&&xs(t,e))}function Yc(t){let e=Me.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),zn())}function L(t){let e=Me.get(t);e&&(e.el?.remove(),Me.delete(t),zn())}function Gp(){return Array.from(Me.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var k=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function w(t){return t}var ws=new Map;function Gn(t,e){let n=ws.get(t);return n||(n=new Set,ws.set(t,n)),n.add(e),()=>n.delete(e)}function tn(t,e){let n=ws.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Up="bloompp";function Xc(){return new Promise((t,e)=>{let n=indexedDB.open(Up,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Zc(t){try{let e=await Xc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Jc(t,e){try{let n=await Xc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function it(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function at(t,e,n){return Math.min(n,Math.max(e,t))}function Qc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function tu(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function eu(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var li=new k("SettingsStore"),ke="BloomSettings",Kp=100;function ci(t){return t!=null&&typeof t.then=="function"}function Wp(t){if(t==null||ci(t))return null;if(it(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(it(e)&&!ci(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return it(n)&&!ci(n)?n:null}return null}catch{return null}}function di(t){let e=Wp(t);if(!e)return null;let n=e.plugins;return!it(n)||ci(n)||Object.keys(n).length===0?null:e}function Ts(t){return it(t)?t:null}function Ss(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:it(t)?Object.keys(t).length===0:!1}function Vp(t){return Ss(t)?0:Array.isArray(t)?12+Math.min(t.length,40):it(t)?12+Math.min(Object.keys(t).length,40):3}function en(t){if(!t)return-1;let e=t.plugins;if(!it(e))return-1;let n=0;for(let r of Object.values(e)){let o=Ts(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=Vp(a))}return n}function nu(t){let e=t.plugins;if(!it(e))return 0;let n=0;for(let r of Object.values(e))Ts(r)?.enabled===!0&&n++;return n}function ru(t){let e=t.map((i,a)=>({bag:i,index:a,score:en(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=nu(a.bag)-nu(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!it(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(it(a))for(let[s,l]of Object.entries(a)){let c=Ts(l);if(!c)continue;if(!it(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}Ss(u[d])&&!Ss(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return it(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:en(n)}}var ui=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return it(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){li.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Kp))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ke,this.plain)}catch{try{GM_setValue(ke,e)}catch(n){li.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(ke,e)}catch{}Jc(ke,e).catch(n=>li.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){li.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Qc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Yp=new k("Settings"),Xp={plugins:{}},j=new ui(structuredClone(Xp)),Zp=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Jp(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function C(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?Ce(n):{}},get plain(){let n=e.pluginName;return n?j.plain.plugins[n]??{}:{}}};return e}async function Qp(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function ou(){let t=di(await Qp(ke)),e=di(await Zc(ke)),n=null;try{n=di(localStorage.getItem(ke))}catch{n=null}let r=ru([t,e,n]);if(r){let o=r.bag.plugins;o&&(j.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);Yp.info("Loaded settings from",i,"richness",r.score,"gm",en(t),"idb",en(e),"ls",en(n))}j.releasePersist(),r&&(r.index!==0||r.score>en(t))&&j.persistLoadedBag()}function Ce(t){return j.plain.plugins[t]||(j.plain.plugins[t]={}),j.store.plugins[t]}function iu(t,e){e&&(e.pluginName=t,Ce(t),j.setDefaultGetter(Zp(t),n=>{if(n!=="enabled")return Jp(e.def,n)}))}function au(){return Ce("Settings")}function fi(){return au().pinnedPlugins??[]}function su(t){return fi().includes(t)}function lu(t){let e=fi(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function mi(){return au().starredPlugins??[]}function cu(t){return mi().includes(t)}function uu(t){let e=mi(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var pi=new k("PluginManager"),ue={},Dr=new Set;function du(t){if(ue[t.name]){pi.warn("Duplicate plugin",t.name);return}ue[t.name]=t,iu(t.name,t.settings)}function Un(t){let e=ue[t];if(!e)return!1;if(e.required)return!0;let n=j.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function fu(t){let e=ue[t];if(!e||e.required)return;let n=!Un(t);Ce(t),j.store.plugins[t].enabled=n,n?mu(e):tg(e),tn("pluginToggle",{name:t,enabled:n})}function mu(t,e=!1){if(!Dr.has(t.name)&&Un(t.name))try{t.managedStyle&&Vc(t.managedStyle),t.start?.(),Dr.add(t.name),t.settings&&j.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Dr.has(t.name)&&t.onSettingsChange?.()}),e||pi.debug("Started",t.name)}catch(n){pi.error("Failed to start",t.name,n)}}function tg(t){if(Dr.has(t.name)){try{t.stop?.()}catch(e){pi.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Yc(t.managedStyle),L(t.managedStyle)),Dr.delete(t.name)}}function _r(t){for(let e of Object.values(ue))(e.startAt??"DOMContentLoaded")===t&&mu(e)}var pu=/\/c\/([a-zA-Z0-9_-]{8,})/i;function _t(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function de(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function fe(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(pu)?.[1]??""}catch{return t.match(pu)?.[1]??""}}function R(){return fe(location.pathname)}var Ms=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i,eg=/[?&](?:num_turns|limit|before|after|before_node|after_node|cursor)=/i;function gi(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function ks(t,e){return e!=="GET"||gi(t)?!1:Ms.test(t)}function Cs(t){return Ms.test(t)&&eg.test(t)}function bi(t){return t.match(Ms)?.[1]??""}function As(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return As(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function qr(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function bu(t){let e=qr(t);return e?!e.mapping&&qr(e.conversation)?e.conversation:e:null}function gu(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function ng(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=gu(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?gu(n.text):""}function rg(t){if(qr(t.metadata)?.is_visually_hidden_from_conversation===!0)return"";let r=qr(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function og(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?As(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function ig(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null,c=l?rg(l):"",u=l&&typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:l?ng(l):""};u!==o&&(d.alias=o);let f=l?As(l.create_time??l.createTime):null;f&&(d.at=f),n.push(d)}o=typeof s.parent=="string"?s.parent:null}return n.reverse(),n}function Ls(t){return t.length<=480?t:t.slice(t.length-480)}function Hs(t,e){if(!e.length)return t;if(!t.length)return Ls(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(b=>b.id)),m=n.has(e[e.length-1].id),p=e.filter(b=>!f.has(b.id));return Ls(m?[...p,...t]:[...t,...p])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return Ls([...s,...l,...u,...d])}function ag(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=og(t,n);return r?ig(n,r):[]}function Is(t){let e=bu(t);if(!e)return[];let n=e.mapping;return!n||typeof n!="object"||Array.isArray(n)?[]:!(typeof e.current_node=="string"||typeof e.current_node_id=="string"||typeof e.currentNode=="string")&&typeof e.title!="string"?[]:ag(e)}function hu(t,e=""){let n=qr(t);if(!n)return e;let r=bu(t)??n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function yu(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var wu=new k("Harvest"),sg=1500,lg=200,cg=8,hi=new Set,yi=new Map,vi=new Map,xi=new Map,vu=[],Kn=null,Ei=null,$r=null,qt=0,Su=!1;function ug(){return typeof unsafeWindow<"u"?unsafeWindow:window}function dg(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function fg(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var mg=/"action"\s*:\s*"(next|continue|variant)"/i;function pg(t,e,n){return!(e!=="POST"||gi(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!mg.test(n))}function Tu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function gg(t){return typeof t=="string"?Tu(t):""}function Rs(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Rs(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Ns(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function xu(t,e,n){!t||!e||vi.get(t)!==e&&(vi.set(t,e),Ns(vi,sg),me({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function bg(t,e){let n=e.trim();!t||!n||yi.get(t)!==n&&(yi.set(t,n),Ns(yi,lg),me({type:"conversation-meta",conversationId:t,title:n}))}function hg(t,e,n=""){if(n&&Cs(n))return;let r=hu(e,t);if(!r)return;let o=Is(e);if(!o.length)return;let i=xi.get(r)??[],a=Hs(i,o);yu(i,a)||(xi.set(r,a),Ns(xi,cg),me({type:"conversation-chain",conversationId:r}))}function Fr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Fr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&bg(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Rs(l.create_time??l.createTime??l.created_at);c&&u&&xu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Rs(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&xu(a,s,o),r.mapping&&typeof r.mapping=="object")Fr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Fr(l,o,n+1)}function Eu(t,e){if(t)try{Fr(JSON.parse(t),e)}catch{}}function me(t){for(let e of Array.from(hi))try{e(t)}catch{}}async function yg(t,e,n,r){if(n===qt)try{let o=await t.json();if(n!==qt)return;Fr(o,e),hg(e,o,r)}catch{}}async function vg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===qt&&me({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===qt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=Tu(c);m&&(o=m,me({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let p=m.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||Eu(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===qt&&Eu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===qt&&me({type:"post-end",conversationId:o,error:i})}function xg(t,e,n){let r=dg(e),o=fg(e,n),i=ks(r,o),a=pg(r,o,n?.body),s=qt,l="";return a&&(l=gg(n?.body)||bi(r)||fe(r)||R(),me({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==qt||!i&&!a)return c;try{let u=c.clone();i?yg(u,bi(r)||R(),s,r):vg(u,l,!c.ok,s)}catch{a&&me({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===qt&&me({type:"post-end",conversationId:l,error:!0}),c})}function Lu(){if(Kn)return;let t=ug();$r=t,Kn=t.fetch.bind(t);let e=(n,r)=>xg(Kn,n,r);Ei=e,t.fetch=e,wu.debug("conversation fetch harvest hooked")}function Eg(){qt+=1,!(!Kn||!$r)&&(Ei&&$r.fetch===Ei&&($r.fetch=Kn),Kn=null,Ei=null,$r=null,wu.debug("conversation fetch harvest unhooked"))}function wg(){qt+=1,!Su&&Eg()}function Mu(){Su=!0,Lu()}function ku(t){}function St(t){return hi.add(t),Lu(),()=>{hi.delete(t),hi.size===0&&wg()}}function Wn(t){return t?yi.get(t)??"":""}function wi(t){return t?vi.get(t)??null:null}function jr(t){return t?xi.get(t)??vu:vu}var zr=!1,Si=!1,Ps=!1,Au=[],Hu=[],Iu=[];function Os(t){let e=t.splice(0);for(let n of e)n()}function Gr(){zr||(zr=!0,Os(Au))}function Bs(){Si||(Si=!0,zr||Gr(),Os(Hu))}function Ru(){Ps||(Ps=!0,zr||Gr(),Si||Bs(),Os(Iu))}function Ti(t){zr?t():Au.push(t)}function Li(t){Si?t():Hu.push(t)}function Mi(t){Ps?t():Iu.push(t)}function ki(){Gr()}function Vn(){Gr(),Bs()}function Ci(){Ru()}function Cu(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Nu(){await Cu(4e3),Gr(),await Cu(4e3),Bs(),Ru()}var S={p:"0-V-linuxdo"},Tt="[20260928] v1.4.113",Pu="https://github.com/0-V-linuxdo/Bloom";var Sg={BetterNavigator:1790577403e3,ChatListStatus:1790577403e3,ChatStateFavicons:1790233382e3,Cleaner:1790577403e3,ComposerOpacity:1790577403e3,CustomSidebarIdentity:1790578442e3,GreetingCustomizer:1790577403e3,InputHistory:1789858186e3,MessageTimestamps:1790577403e3,NoDictation:1790577403e3,NoShareLink:1790577403e3,NoSidebarIdentity:1790578442e3,PromptQueue:1790577403e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790578442e3,StreamerMode:1790578442e3,WiderChat:1790577403e3};function Ou(t){let e=Sg[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}var Ds=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Tg=["#stage-slideover-sidebar","#stage-popover-sidebar","[data-app-action-sidebar-scroll]",'[data-testid="desktop-app-shell"]'].join(","),Ai=["#stage-sidebar-tiny-bar","[data-app-navigation-rail]"].join(","),Bu='a[href^="/c/"], a[href*="/c/"]',Du=['form[data-type="unified-composer"]','[data-type="unified-composer"]',"form.w-full[data-type]","form:has(#prompt-textarea)",'form:has([data-testid="prompt-textarea"])','form:has(textarea[name="prompt"])',"form:has(#mobile-composer-prompt)",'form:has([data-testid="mobile-composer-prompt"])',"#thread-bottom-container form","#thread-bottom form"].join(", "),Ur=['textarea[name="prompt"]',"#mobile-composer-prompt",'[data-testid="mobile-composer-prompt"]',"[data-mobile-composer-prompt]","textarea#prompt-textarea",'textarea[data-testid="prompt-textarea"]',"#prompt-textarea",'[data-testid="prompt-textarea"]','form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]','[contenteditable="true"][role="textbox"]'].join(", "),tw=["#thread",'[data-testid="conversation-panel"]',"[data-chatgpt-conversation-selection-target]","main"].join(", "),_u=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]',"[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids]","[data-chatgpt-search-message-ids]"].join(", "),qu=["[data-message-id]","[data-chatgpt-search-message-ids]"].join(", "),$u=['#thread section[data-testid^="conversation-turn-"][data-turn="assistant"]','#thread article[data-testid^="conversation-turn-"][data-turn="assistant"]','[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids] [data-message-author-role="assistant"]','[data-chatgpt-search-message-ids] [data-message-author-role="assistant"]','[data-chatgpt-search-message-ids][data-message-author-role="assistant"]','[data-message-author-role="assistant"]'].join(", "),Lg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item, #bloom-bn-host, #bloom-pq-chip, #bloom-rt-host";function nn(t){return!!t.closest(Lg)}function st(t,e=document){try{let n=e.querySelector(t);return n instanceof HTMLElement?n:null}catch{return null}}function Hi(){try{return!!(document.getElementById("stage-slideover-sidebar")||document.getElementById("stage-popover-sidebar")||st(Ai)||st(Tg)||st(Ds)||st("[data-sidebar-destination]"))}catch{return!1}}function Fu(){try{return!!st(Ur)}catch{return!1}}function ju(){let t=document.getElementById("stage-slideover-sidebar");if(t instanceof HTMLElement&&t.isConnected&&!nn(t))return t;let e=document.getElementById("stage-popover-sidebar");if(e instanceof HTMLElement&&e.isConnected&&!nn(e))return e;let n=st("[data-app-action-sidebar-scroll]");if(n&&!nn(n)){let a=n.closest("nav")??n.parentElement??n;return a instanceof HTMLElement&&!nn(a)?a:n}let r=st("[data-app-navigation-rail]");if(r&&!nn(r))return r;let o=st("nav");if(o&&!nn(o))return o;let i=st('[data-testid="desktop-app-shell"]');return i&&!nn(i)?i:null}function Ii(){let t=document.getElementById("thread");if(t instanceof HTMLElement&&t.isConnected)return t;let e=st('[data-testid="conversation-panel"]');if(e)return e;let n=st("[data-chatgpt-conversation-selection-target]");return n||st("main")}function _s(t){let e=[],n=o=>{o&&!e.includes(o)&&e.push(o)};n(t.getAttribute("data-message-id")),n(t.getAttribute("data-turn-id"));let r=t.getAttribute("data-chatgpt-search-message-ids")||"";for(let o of r.split(/\s+/))n(o);try{n(t.querySelector("[data-message-id]")?.getAttribute("data-message-id")),n(t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id"))}catch{}return e}function Ri(t){let e=_s(t);return e[e.length-1]||""}function Ae(t){return t instanceof HTMLElement?t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail"):!1}function Mg(){try{return!!document.querySelector('a[href^="/c/"], a[href*="/c/"], a[href^="/g/"]')}catch{return!1}}function kg(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, [data-app-navigation-rail] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function qs(){try{return Fu()||!!document.querySelector(Ur)}catch{return!1}}function rn(){return qs()?Mg()||kg()||Hi():!1}function zu(){return rn()}var Fs=Ds,Gu=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Cg=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Ag="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function $t(t){return t.id==="bloom-root"||!!t.closest(Ag)}function Uu(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Ni(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function $s(t){if(!(t instanceof HTMLElement)||!t.isConnected||$t(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Ni(e)?!1:t.getClientRects().length>0}function Yt(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-popover-sidebar"||t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail")||t.hasAttribute("data-app-action-sidebar-scroll")}function Hg(t){return t.tagName==="BUTTON"||t.tagName==="A"||t.getAttribute("role")==="button"}function Pi(t){if($t(t))return!1;let e=t.getAttribute("data-testid")||"";if(/profile|account/i.test(e))return!0;let n=`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`;if(/profile|account|账号|账户|头像/i.test(n)||t.querySelector("img, [data-bloom-csi-slot], [data-bloom-profile-chip], [class*='rounded-full']")||t.querySelector(".min-w-0, .truncate"))return!0;let r=(t.textContent||"").replace(/\s+/g,"");return!!(r.length>=1&&r.length<=3&&!/^(plus|pro|free|team|go)$/i.test(r)||/\b(plus|pro|free|team|go|business|enterprise)\b/i.test(r)&&r.length<64)}function on(t){let e=t,n=t;for(;n&&!$t(n);)Hg(n)&&Pi(n)&&(!Yt(n)||Ae(n.parentElement))&&(e=n),n=n.parentElement;return e}function Ku(t){let e=Vu(t).filter(Pi);return e.length?(e.sort((n,r)=>{let o=n.getBoundingClientRect(),i=r.getBoundingClientRect();return i.width*i.height-o.width*o.height}),on(e[0])):null}function Wu(){let t=[];for(let e of document.querySelectorAll(Fs))!(e instanceof HTMLElement)||!e.isConnected||$t(e)||t.push(e);return t}function Kr(t){if(!t.isConnected||$t(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Vu(t){let e=[];try{for(let n of t.querySelectorAll('button[aria-haspopup="menu"]'))!(n instanceof HTMLElement)||!n.isConnected||$t(n)||e.push(n)}catch{}return e}function an(){let t=He();if(t){let o=Ku(t);if(o){let i=o.getBoundingClientRect();if(i.width>16&&i.height>8&&i.left>=-20&&i.left<window.innerWidth/2&&i.bottom>0)return o}}let e=Wu().filter(o=>Kr(o)&&Pi(o));if(e[0])return on(e[0]);let n=Wu().filter(Kr);if(n[0])return on(n[0]);let r=st("[data-app-navigation-rail]");if(r){let i=Vu(r).filter(a=>{let s=a.getBoundingClientRect();return s.width>16&&s.height>16&&s.left>=0&&s.left<window.innerWidth/3&&s.bottom>0}).find(Pi)??Ku(r);if(i)return on(i)}return null}function Yn(){for(let t of document.querySelectorAll(Ai)){if(!(t instanceof HTMLElement)||!t.isConnected||$t(t))continue;let e=t.getBoundingClientRect();if(!(e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3))return t}return null}function He(){let t=st("[data-app-action-sidebar-scroll]");if(!t)return null;let e=[t.nextElementSibling,t.parentElement?.nextElementSibling];for(let n of e)if(!(!(n instanceof HTMLElement)||!n.isConnected||$t(n))&&n.querySelector('button[aria-haspopup="menu"]')){if(Yt(n))try{if(n.getBoundingClientRect().height>240)continue}catch{continue}return n}return null}function js(t){let e=on(t),n=He();if(n&&n.contains(e)){let s=e.parentElement;return s&&s!==n&&s.children.length===1&&!$t(s)&&!Yt(s)&&s.parentElement&&!Yt(s.parentElement)?s:e}let r=e.closest(Ai);if(r instanceof HTMLElement){let s=e;for(;s&&s.parentElement!==r;)s=s.parentElement;if(s&&s.parentElement===r)return s}let o=e,i=e.parentElement;i&&i.children.length===1&&!$t(i)&&!Yt(i)&&i.parentElement&&!Yt(i.parentElement)&&(o=i);let a=o.parentElement;if(a&&!Yt(a)&&!$t(a)&&a.children.length>1){let s=a.getAttribute("class")||"";if(/\bflex\b/.test(s)&&!/flex-col/.test(s)&&a.parentElement&&!Yt(a.parentElement))return a}return o}function Xn(){let t=document.querySelectorAll(Gu);for(let n of t)if($s(n)&&!Ni(n)&&Uu(n))return n;let e=document.querySelectorAll(Cg);for(let n of e){if(!$s(n)||!Uu(n)||Ni(n))continue;let r=n.querySelector(Gu);return $s(r)&&!Ni(r)?r:n}return null}function Oi(){let t=an();if(t){let n=js(t),r=n.parentElement;if(r&&(!Yt(r)||Ae(r)))return r;if(!Yt(n)||Ae(n))return n}let e=He();return e||Yn()}function Bi(t){let e=an();return e?t.composedPath().includes(e):!1}var Gs=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Ig={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Rg(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Ng(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function zs(t){let e=Rg(t);return e?Ng(e)>.55?"light":"dark":null}function Pg(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=zs(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=zs(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=zs(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Di(t){return t==="auto"?Pg():t}function Og(t){try{let e=getComputedStyle(document.documentElement);for(let n of Gs){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function _i(t,e,n){let r=Ig[e];if(n){Og(t);for(let o of Gs)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Gs)t.style.setProperty(o,r[o])}function Yu(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Us=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Dg="bloom-root",Zt="bloom-rail-item",Gi="bloom-account-item",ln="bloom-sidebar-panel",eo="bloom-plugin-dialog",Zi="bloom-plugin-layer",Ui="bloom-settings-css",_g=2e3,Zu=null,qg=null,Pe=!1,Xs=[],qi=null,Ki=null,Re=null,Fi=null,pe=null,Jr=null,Wr,Zn=0,Qr=0,Vr=0,Yr=null,Xr=null,Wi=null,Ju=null,Zr=null,Ks=[],Vi=!1,$g=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Fg=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],jg=new Set(["chat","ui","privacy"]),zg=10080*60*1e3,Ji="",to="all",Xt="all";function Qi(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Qu(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Gg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Ug(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Kg(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Wg(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Vg={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Yg(t){return t.icon||Vg[t.name]||Qi()}function Ws(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),_i(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function td(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Yi(){let t="auto",e=Di(t);Ws(Zu,e,!0);let n=document.getElementById(ln);n instanceof HTMLElement&&Ws(n,e,!0);let r=document.getElementById(eo);r instanceof HTMLElement&&Ws(r,e,!0);let o=document.getElementById(Zt);o instanceof HTMLElement&&td(o),tn("schemeChange",{scheme:e,pref:t})}function ed(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function nd(){if(M("settings",Us),document.getElementById(Ui)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Ui,t.textContent=Us,document.head.appendChild(t)}function Xg(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Zg(){for(let t of Xs)t();Xs=[]}function rd(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Jg(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Qs(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Qg(t){return Qs(t).length>0}function ji(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function tb(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Jg(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function eb(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(tb(e,n));let i=Ce(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Xs.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??ji(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??ji(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=rd(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??ji(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Xu(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function nb(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=Ce(t.name);for(let[n,r]of Qs(t)){if(n==="enabled"||r.type===5)continue;let o=ji(r);o!==void 0&&(e[n]=o)}id(t)}function od(t){t.key==="Escape"&&(!document.getElementById(Zi)&&!document.getElementById(eo)||(t.stopPropagation(),Jn()))}function rb(){Vi||(document.addEventListener("keydown",od),Vi=!0)}function ob(){Vi&&(document.removeEventListener("keydown",od),Vi=!1)}function Jn(){Zg(),ob(),document.getElementById(Zi)?.remove(),document.getElementById(eo)?.remove()}function id(t){if(Jn(),!document.body)return;let e=document.createElement("div");e.id=Zi,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Ne),e.addEventListener("pointerup",Ne),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Jn()});let n=document.createElement("div");n.id=eo,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ne),n.addEventListener("pointerup",Ne),n.addEventListener("click",Ne);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Qu(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Jn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Xu("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Xu("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Qs(t);if(c.length)for(let[u,d]of c){let f=eb(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>nb(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),rb(),Yi()}function ib(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Yg(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=cu(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Kg(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let g=uu(t.name);tn("pluginStar",{name:t.name,starred:g})}),s.appendChild(c),!t.required){let b=su(t.name),g=document.createElement("button");g.type="button",g.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,g.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),g.innerHTML=Wg(b),g.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();let h=lu(t.name);tn("pluginPin",{name:t.name,pinned:h})}),s.appendChild(g)}if(Qg(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=Ug(),b.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),id(t)}),s.appendChild(b)}let u=rd(t.name,Un(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{fu(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(p),e.append(n,f,m),e}function ad(){return Object.values(ue).filter(t=>!t.hidden&&t.name!=="Settings")}function ab(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<zg}function sd(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return ab(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>jg.has(r)):n.includes(e)}function sb(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function lb(){return Ji.trim()?"No plugins match your search.":Xt==="favorites"?"No favorites yet. Star a plugin to see it here.":Xt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function cb(){let t=ad();return Fg.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>sd(n,e.id)))}function ub(){if(Zr){Zr.replaceChildren();for(let t of cb()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Xt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Xt=t.id,sn()}),Zr.appendChild(e)}}}function db(){let t=ad();if(Xt==="favorites"){let e=new Set(mi());t=t.filter(n=>e.has(n.name))}else Xt!=="all"&&(t=t.filter(e=>sd(e,Xt)));return to==="enabled"&&(t=t.filter(e=>Un(e.name))),to==="disabled"&&(t=t.filter(e=>!Un(e.name))),t}function sn(){if(!Yr)return;ub();let t=db();Wi&&(Wi.placeholder=`Search ${t.length} plugins...`);let e=t,n=Ji.trim().toLowerCase();if(n&&(e=e.filter(r=>sb(r).includes(n))),Xt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Xt!=="favorites"){let r=fi();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Yr.replaceChildren();for(let r of e)Yr.appendChild(ib(r));Xr&&(Xr.hidden=e.length>0,Xr.textContent=lb())}function Ne(t){t.stopPropagation()}function Vs(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function tl(){document.getElementById(Zt)?.setAttribute("aria-expanded",Pe?"true":"false")}function fb(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function el(){Jn(),Ji="",to="all",Xt="all",document.getElementById(ln)?.remove(),Pe=!1,tl()}function mb(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Ne),e.addEventListener("pointerup",Ne),e.addEventListener("click",Ne);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Qi();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Gg();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Qu(),d.addEventListener("click",el),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Ji=p.value,sn()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let h of $g){let x=document.createElement("option");x.value=h.value,x.textContent=h.label,b.appendChild(x)}b.value=to,b.addEventListener("change",()=>{to=b.value,sn()}),m.append(p,b),n.appendChild(m);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let E=document.createElement("p");return E.className="bloom-tab-empty",E.hidden=!0,n.appendChild(E),e.append(d,n),Yr=g,Xr=E,Wi=p,Ju=b,Zr=f,sn(),e}function pb(t){t.classList.add("bloom-rail-dock")}function gb(){let t=document.getElementById(Zt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Kr(t)?t:null}function bb(){if(document.getElementById(ln)?.remove(),!document.body)return;let t=mb(ln);pb(t),document.body.appendChild(t),Pe=!0,Jn(),Yi(),tl(),tn("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Tt,dock:"center",rail:!!gb()})}function nl(){let t=document.getElementById(ln);if(t instanceof HTMLElement&&t.isConnected&&fb(t)){el();return}t?.remove(),bb()}function zi(t){t.style.pointerEvents="auto",t.style.position="relative",t.style.zIndex="2"}function hb(t){let e=t.parentElement?.closest("button, a, [role='button']");return e instanceof HTMLElement&&e!==t?e:null}function yb(){let t=document.createElement("button");t.type="button",t.id=Zt,t.className="bloom-rail-item",t.setAttribute("aria-controls",ln),t.setAttribute("aria-expanded",Pe?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Qi()}</span><span>Bloom++</span>`,zi(t);let e=n=>{n.preventDefault(),n.stopPropagation(),typeof n.stopImmediatePropagation=="function"&&n.stopImmediatePropagation(),nl()};return t.addEventListener("pointerdown",n=>{n.stopPropagation(),typeof n.stopImmediatePropagation=="function"&&n.stopImmediatePropagation()}),t.addEventListener("click",e),t}function Ys(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function vb(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function xb(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Ie(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function ld(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=vb(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Ie(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Ie(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Ie(n,"width",l),Ie(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Ie(t,"padding-left",u);let d=xb(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),p=Math.round(f.left-m.right);p>=0&&p<=24&&Ie(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Ie(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Ie(t,"gap",Math.round(l))}td(t)}function Zs(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-popover-sidebar"||t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail")||t.hasAttribute("data-app-action-sidebar-scroll")}function Eb(){if(Jr?.isConnected&&pe){pe.observe(Jr,{childList:!0});return}Js()}function wb(t){if(Zs(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Sb(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Vr=0;return}Vr+=1,Qr=Date.now()+Math.min(8e3,250*2**Math.min(Vr,5))})}function Tb(){Zn||Date.now()<Qr||(Zn=requestAnimationFrame(()=>{Zn=0,!(Date.now()<Qr)&&(document.getElementById(Zt)?.isConnected||Xi())}))}function Xi(){if(!document.body)return;pe?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Zt);t=n instanceof HTMLButtonElement?n:yb();let r=an(),o=Yn();if(r){let i=js(r),a=i.parentElement,s=!!(a&&Ae(a));if(Zs(i)&&!Ae(i)||a&&Zs(a)&&!s)return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0);let l=hb(t);l&&(l.before(t),e=!0),zi(t);let c=(a?.getBoundingClientRect().width??0)>=80,u=(s||Ae(i))&&!c;Ys(t,u?!0:void 0),ld(t,r)}else if(He()){let i=He();t.parentElement!==i&&(i.prepend(t),e=!0),zi(t),Ys(t)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),zi(t),Ys(t,!0)):t.isConnected&&!Kr(t)&&(t.remove(),t=null)}finally{Sb(t,e),Eb(),tl()}}function Js(){let t=Oi();!t||!wb(t)||Jr===t&&pe||(pe?.disconnect(),Jr=t,pe=new MutationObserver(()=>{document.getElementById(Zt)?.isConnected||Tb()}),pe.observe(t,{childList:!0}))}function Lb(){Xi(),Js(),Wr===void 0&&(Wr=window.setInterval(()=>{let t=document.getElementById(Zt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Qr&&Xi();else{Vr=0;let e=an();e&&ld(t,e)}Js()},_g))}function Mb(){Wr!==void 0&&(clearInterval(Wr),Wr=void 0),Zn&&cancelAnimationFrame(Zn),Zn=0,Qr=0,Vr=0,pe?.disconnect(),pe=null,Jr=null}function kb(t){Fi===t&&Re||(Re?.disconnect(),Fi=t,Re=new MutationObserver(()=>{if(!t.isConnected){Re?.disconnect(),Re=null,Fi=null;return}cd(t)}),Re.observe(t,{childList:!0}))}function cd(t){if(kb(t),t.querySelector(`#${Gi}`))return;let e=document.createElement("button");e.type="button",e.id=Gi,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Qi()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Vs),e.addEventListener("pointerup",Vs),e.addEventListener("click",n=>{Vs(n),nl()}),t.insertBefore(e,t.firstChild)}function $i(){let t=Xn();return t?(cd(t),!0):!1}function Cb(t){Bi(t)&&(queueMicrotask($i),requestAnimationFrame(()=>{$i()}),window.setTimeout($i,60),window.setTimeout($i,180))}function Ab(){Ki?.abort();let t=new AbortController;Ki=t,document.addEventListener("click",Cb,{signal:t.signal})}function Hb(){Ki?.abort(),Ki=null,Re?.disconnect(),Re=null,Fi=null}function ud(){Vn(),Xg(()=>{nd(),ed(),Xi(),nl()})}var dd=w({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Dg}`,`#${Zt}`,`#${Gi}`,`#${ln}`,`#${Zi}`,`#${eo}`,`#${Ui}`,"#bloom-menu-panel"],start(){nd(),ed(),Lb(),Ab(),qi?.(),qi=Yu(Yi),Yi(),Ks=[Gn("pluginToggle",()=>{Pe&&sn()}),Gn("pluginPin",()=>{Pe&&sn()}),Gn("pluginStar",()=>{Pe&&sn()})]},stop(){Mb(),Hb(),qi?.(),qi=null;for(let t of Ks)t();Ks=[],el(),document.getElementById(Zt)?.remove(),document.getElementById(Gi)?.remove(),document.getElementById(Ui)?.remove(),Zu=null,qg=null,Yr=null,Xr=null,Wi=null,Ju=null,Zr=null,Pe=!1}});var no=Du,jt=Ur,Qn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]','form button[aria-label^="Send" i]','form button[aria-label="Send prompt"]','form button[aria-label="\u53D1\u9001"]','#thread-bottom-container button[aria-label^="Send" i]','#thread-bottom button[aria-label^="Send" i]','form button[type="submit"]'].join(", "),fd=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','button[data-testid*="stop-button" i]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]','form button[aria-label*="Stop streaming" i]','form button[aria-label*="Stop generating" i]','form button[aria-label*="\u505C\u6B62\u751F\u6210"]','form button[aria-label*="\u505C\u6B62\u8F93\u51FA"]','#thread-bottom-container button[aria-label*="Stop streaming" i]','#thread-bottom-container button[aria-label*="Stop generating" i]','#thread-bottom button[aria-label*="Stop streaming" i]','#thread-bottom button[aria-label*="Stop generating" i]'].join(", "),md=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Ib=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Rb='[contenteditable="false"], button, [role="button"]',rl=['textarea[name="prompt"]',"#mobile-composer-prompt",'[data-testid="mobile-composer-prompt"]',"textarea#prompt-textarea",'textarea[data-testid="prompt-textarea"]'].join(", "),Nb=[no,'[data-type="unified-composer"]',"#thread-bottom-container","#thread-bottom"].join(", ");function Lt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function cn(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Lt(o)))return o;return null}function bd(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function q(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=bd(t);return!!(Ib.test(n)||/^stop$/i.test(n))}function un(t){return t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement}function dn(t){if(!t)return null;if(t instanceof HTMLElement&&un(t))return t;try{for(let e of t.querySelectorAll(rl))if(e instanceof HTMLTextAreaElement||e instanceof HTMLInputElement)return e}catch{}return null}function Ft(t){return t.replaceAll("\u200B","").trim().length>0}function Pb(t){if(!t)return null;let e=t.closest(Nb)??t.closest("form")??t.parentElement;return!(e instanceof HTMLElement)||e===document.body||e===document.documentElement?null:e}function dt(){let t=Array.from(document.querySelectorAll(no)),e=t.find(Lt);if(e instanceof HTMLElement)return e;let n=t.find(i=>i instanceof HTMLElement&&i.isConnected);if(n instanceof HTMLElement)return n;let o=dn(document)??cn(document,jt);return Pb(o)??document.body}function Ob(){let t=document.activeElement;if(!(t instanceof HTMLElement))return null;if(un(t))return t;let e=t.closest(rl);if(e instanceof HTMLElement&&un(e))return e;let n=t.closest(jt);if(!(n instanceof HTMLElement))return null;let r=dn(n);return r&&Ft(r.value)?r:n}function Bb(t){return t.filter(e=>!t.some(n=>n!==e&&e.contains(n)))}function W(){let t=Ob();if(t)return t;let e=[];try{e=Array.from(document.querySelectorAll(rl)).filter(l=>l instanceof HTMLTextAreaElement||l instanceof HTMLInputElement)}catch{}let n=e.filter(Lt),r=(n.length?n:e).find(l=>un(l)&&Ft(l.value));if(r)return r;if(n[0])return n[0];let o=Array.from(document.querySelectorAll(jt)),i=o.filter(Lt),a=Bb(i.length?i:o);return a.find(l=>Ft(Q(l)))??a[0]??e[0]??null}function Db(t,e){if(!t||t===e||!e.contains(t))return!1;if(t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement||t.closest("textarea, input"))return!0;let n=t.closest(Rb);return!!n&&n!==e&&e.contains(n)}function pd(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Db(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Q(t){if(un(t))return t.value;let e=dn(t);if(e&&Ft(e.value))return e.value;let n=t.querySelectorAll("p");if(n.length){let o=Array.from(n,i=>pd(i,t)).join(`
`);if(Ft(o))return o}let r=pd(t,t);return Ft(r)?r:e?.value??""}function ro(t){if(t){let r=Q(t);if(Ft(r))return r;let o=dt();if(o&&o!==document.body&&(o.contains(t)||t.contains(o))){let i=Q(o);return Ft(i)?i:dn(o)?.value??""}return""}let e=W();if(e){let r=Q(e);if(Ft(r))return r}let n=dt();if(n){let r=Q(n);if(Ft(r))return r}return dn(document)?.value??""}function Jt(t){return Ft(t?Q(t):ro())}function Oe(t){return!Jt(t)}function ta(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function hd(t){let e=dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Lt(n))&&t(n))return n;return null}function Be(){let t=dt(),e=cn(t,Qn)??cn(document,Qn);return e&&!q(e)?e:hd(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!q(n);let o=bd(n);return/^(send|send prompt|发送)$/i.test(o)&&!q(n)?!0:n.getAttribute("type")==="submit"&&!q(n)})}function fn(){let t=dt(),e=cn(t,fd,!0)??cn(document,fd,!0);if(e)return e;let n=cn(t,md)??cn(document,md);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Lt(r)&&q(r))return r}return hd(q)}function ol(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function _b(t,e,n){t.focus(),t.value=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"}));try{let r=n?0:e.length;t.setSelectionRange(r,r)}catch{}}function gd(t,e,n){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),ol(t,n)}function qb(t,e){if(t.isContentEditable&&t!==e&&!(e&&t.contains(e)))return t;try{for(let n of t.querySelectorAll('[contenteditable="true"]'))if(n!==e&&!(e&&(n.contains(e)||e.contains(n))))return n}catch{}return null}function ge(t,e,n=!1){let r=un(t)?t:dn(t)??dn(dt()),o=un(t)?null:qb(t,r);if(o&&gd(o,e,n),r){_b(r,e,n);return}gd(t,e,n)}var vd=new k("Streaming");function lo(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Lt(e))&&(q(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function $b(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Lt(t))}function Fb(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Lt(t))}function jb(){try{return!!document.querySelector(['[data-message-author-role="assistant"][aria-busy="true"]','.result-streaming[aria-busy="true"]','[data-chatgpt-search-message-ids][aria-busy="true"]','[data-chatgpt-search-message-ids][data-message-author-role="assistant"][aria-busy="true"]','[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids][aria-busy="true"]'].join(", "))}catch{return!1}}function te(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function V(){if(fn()||lo()||jb())return!0;let t=Be();return t&&Lt(t)&&!q(t)?!1:!!($b()||Fb())}var zb=400,yd=3,bn=new Set,oo,io=null,il=null,pn=!1,mn=0,_e="",qe="",$e=!1,ao=!1,so=!1,Qt=!1,tt=null,Mt="",gn=!1;function z(){return Qt}function hn(){return $e}function tr(){return Mt}function al(){return R()||Mt}function xd(){return de(_t())}function ea(t,e){return{streaming:t,contextKey:e,conversationId:al()}}function sl(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Gb(t){return!t||t==="/"||t.startsWith("/g/")}function Y(t,e){if(!t||t===e)return!1;let n=fe(sl(e)||e);return!n||!(t.endsWith("|draft")||Gb(sl(t)))?!1:Mt?n===Mt:gn}function na(){pn=!1,mn=0,_e="",$e=!1,ao=!1,so=!1,Mt="",gn=!1}function Ub(t){for(let e of Array.from(bn))try{e.onFall?.(t)}catch{}}function Kb(t){for(let e of Array.from(bn))try{e.onRise?.(t)}catch{}}function De(t){for(let e of Array.from(bn))try{e.onTick?.(t)}catch{}}function Wb(t,e){for(let n of Array.from(bn))try{n.onContext?.(t,e)}catch{}}function Vb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&q(n)&&($e=!0)}function Yb(t){if(t.type==="post-start"){let n=R();if(!t.conversationId){n||(gn=!0),(!n||n===Mt)&&(Qt=!1,$e=!1);return}if(!(t.conversationId===n||t.conversationId===Mt)&&!(!n&&gn))return;Mt=t.conversationId,gn=!1,Qt=!1,$e=!1;return}if(t.type!=="post-end"||!pn&&!tt)return;let e=R();t.conversationId&&!(e?t.conversationId===e:t.conversationId===Mt)||(so=!0,t.error&&(ao=!0,tt&&(tt.error=!0)))}function Xb(){let t=xd(),e=V();if(qe&&t&&qe!==t){let o=qe;if(!Y(o,t))tt=null,na(),Qt=e;else{let i=fe(sl(t));if(i&&!Mt&&(Mt=i,gn=!1),_e===o&&(_e=t),tt&&tt.contextKey===o){tt.contextKey=t;let a=al();a&&(tt.conversationId=a)}Qt=!1}if(qe=t,Wb(t,o),Qt){De(ea(!1,t));return}}else t&&(qe=t);if(Qt){if(e){De(ea(!1,t));return}Qt=!1}if(tt)if(e||tt.contextKey!==t)tt=null;else{let o=tt;tt=null,na(),Ub(o),De(ea(!1,t));return}let n=ea(e,t);if(e){let o=!pn;o&&($e=!1,ao=!1,so=!1),pn=!0,mn=0,_e=t,o&&Kb(n),De(n);return}if(!pn){De(n);return}if(mn+=1,so&&(mn=Math.max(mn,yd)),mn<yd){De(n);return}if(!(!!_e&&_e===t)){na(),De(n);return}tt={contextKey:_e||t,conversationId:al(),userStopped:$e,error:ao||te()},De(n)}function Zb(){oo===void 0&&(pn=V(),qe=xd(),_e=pn?qe:"",mn=0,$e=!1,ao=!1,so=!1,Qt=!1,tt=null,Mt="",gn=!1,io?.abort(),io=new AbortController,document.addEventListener("click",Vb,{capture:!0,signal:io.signal}),il=St(Yb),oo=setInterval(Xb,zb),vd.debug("watchStreamingEdge started"))}function Jb(){bn.size||(oo!==void 0&&(clearInterval(oo),oo=void 0),io?.abort(),io=null,il?.(),il=null,na(),qe="",Qt=!1,tt=null,vd.debug("watchStreamingEdge stopped"))}function ft(t){let e=typeof t=="function"?{onFall:t}:t;return bn.add(e),Zb(),()=>{bn.delete(e),Jb()}}var Ed="bloom-host-icon",co="data-bloom-host-rel",ll="not all",cl=0,wd=0,Qb=400;function Sd(t){cl+=1;try{t()}finally{cl-=1}}function ra(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Fe(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Td(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function th(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function eh(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-wd<Qb||(wd=n,t.appendChild(e))}function nh(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||ra(n)&&(n.getAttribute(co)||n.setAttribute(co,n.rel),n.media!==ll&&(n.media=ll),n.rel!==Ed&&(n.rel=Ed))}function rh(t){for(let e of t.querySelectorAll(`link[${co}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(co);n&&(e.rel=n),e.removeAttribute(co),e.media===ll&&e.removeAttribute("media")}}function Ld(t,e){let{head:n}=document;!n||!e||Sd(()=>{nh(n,t);let r=Td(t),{type:o,sizes:i}=th(e);r?eh(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Md(t,e){let{head:n}=document;n&&Sd(()=>{Td(t)?.remove(),rh(n)})}function kd(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(cl)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:ra(c.target)&&(a=!0,Fe(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)ra(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)ra(u)&&u.id!==t&&(a=!0,Fe(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var oh=["original","badge","dot","hole","bg"],Hd=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Id={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},oa="#FCFCFC",ih="#111111",Cd="#111111",ah="#ffffff",sh="#212121",lh="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ch={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ia=32,Ad=64;function Rd(t){return typeof t=="string"&&oh.includes(t)}function uh(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function aa(t){let e=document.createElement("canvas");e.width=ia,e.height=ia;let n=e.getContext("2d");return n?(n.scale(ia/Ad,ia/Ad),t(n),e.toDataURL("image/png")):""}function dh(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function sa(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(lh);n&&(t.strokeStyle=ih,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function fh(t,e,n){let r=Id[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Cd,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Cd,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=ah,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function uo(t,e){if(t==="original")return e==="wait"?aa(r=>sa(r,oa)):uh(ch[e]);let n=e==="wait"?void 0:Id[e];return aa(t==="hole"?r=>sa(r,n??oa):t==="bg"?r=>{r.fillStyle=n??sh,dh(r,0,0,64,64,14),r.fill(),sa(r,oa,!1)}:r=>{sa(r,oa),e!=="wait"&&fh(r,e,t==="dot"?"dot":"badge")})}function Nd(t){return{wait:uo(t,"wait"),rotate:uo(t,"rotate"),done:uo(t,"done"),ready:uo(t,"ready"),error:uo(t,"error")}}var mh=new k("ChatStateFavicons"),vn="bloom-chat-state-favicon",_d=["input","beforeinput","cut","paste","compositionend"],qd=C({style:{type:3,description:"Favicon overlay",options:Hd}}),ee="",fl={wait:"",rotate:"",done:"",ready:"",error:""},fo="wait",mt=!1,et=!1,D=null,yt="",kt="",En=!0,ua=!1,er=null,Ct=0,la=null,ca=null,yn=null,dl=null,nr=null,zt=!1,Pd=new WeakSet;function ph(){let t=qd.store.style;return Rd(t)?t:"bg"}function $d(){let e=document.querySelector(`link[rel~="icon"]:not(#${vn}), link[data-bloom-host-rel]:not(#${vn})`)?.href;return Fe(e)?e:Fe(ee)?ee:""}function gh(){let t=document.getElementById(vn);return t instanceof HTMLLinkElement?t:null}function bh(){if(!Fe(ee)){let t=$d();t&&(ee=t)}return Fe(ee)?ee:fl.wait}function Fd(t){return t==="wait"?bh():fl[t]}function jd(){Ld(vn,Fd(fo))}function $(t){let e=Fd(t);if(fo===t){let n=gh();if(n&&n.getAttribute("href")===e)return}fo=t,jd()}function Od(){fl=Nd(ph()),$(fo)}function ml(){return de(_t())}function pl(t,e){!t||!e||t===e||(D===t&&(D=e),yt===t&&(yt=e),kt===t&&(kt=e))}function hh(){let t=ml();if(!(V()||mt||et))return yt="",t;if(yt&&t&&yt!==t)if(Y(yt,t))pl(yt,t),yt=t;else return yt="",t;else!yt&&t&&(yt=t);return yt||t}function Bd(t){return!D||!t?!1:D===t?!0:Y(D,t)}function zd(){mt=!1,et=!1,D=null,yt=""}function Gd(t){kt=t,zd(),En=!1,ua=!0,$("wait")}function ul(t){return!t&&En}function yh(){if(!zt)return;let t=ml();if(kt&&t&&kt!==t&&!Y(kt,t)){Gd(t);return}kt&&t&&Y(kt,t)&&pl(kt,t),t&&(kt=t);let e=V(),n=e&&!z();if(ua){if(z()){$("wait");return}ua=!1}if(z()){$("wait");return}let r=hh(),o=Oe();if(hn()&&!e){mt=!1,et=!1,D=null,$(o?"wait":ul(o)?"ready":"wait");return}if(te()&&!e&&mt){$("error"),mt=!1,et=!1,D=null;return}if(n){mt||(En=!1),mt=!0,et=!1,D=r,$("rotate");return}if(mt)if(!Bd(t))mt=!1,et=!1,D=null;else if(et){mt=!1,et=!0,D=t||r,$("done");return}else{$("rotate");return}if(et)if(D&&t&&!Bd(t))et=!1,D=null;else if(o){D=r||D,$("done");return}else if(ul(o)){et=!1,$("ready");return}else{et=!1,$("wait");return}D=null,o?$("wait"):ul(o)?$("ready"):$("wait")}function xn(){zt&&(Yd(),Kd(),Wd(),yh())}function Ud(){if(nr){for(let t of _d)nr.removeEventListener(t,Vd,!0);nr=null}}function Kd(){let t=dt(),e=W(),n=t&&t!==document.body?t:e;if(!(nr===n&&n?.isConnected)&&(Ud(),!!n)){nr=n;for(let r of _d)nr.addEventListener(r,Vd,{capture:!0,passive:!0})}}function Wd(){let t=dt(),e=t&&t!==document.body?t:W();if(!(yn&&dl===e&&e?.isConnected)){if(yn?.disconnect(),dl=e,!e||e===document.body){yn=null;return}yn=new MutationObserver(()=>da()),yn.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function da(){if(zt){if(document.hidden){Ct&&(cancelAnimationFrame(Ct),Ct=0),xn();return}Ct||(Ct=requestAnimationFrame(()=>{Ct=0,zt&&xn()}))}}function Vd(t){let e=t?.target instanceof HTMLElement?t.target:null;(Jt(e)||Jt())&&(En=!0),da()}function Dd(){Jt()&&(En=!0),da()}function vh(){zt&&(Ct&&(cancelAnimationFrame(Ct),Ct=0),xn())}function xh(){zt&&(En=!1,xn())}function Eh(t){if(!zt)return;if(t.userStopped){mt=!1,et=!1,D=null,$("wait");return}if(t.error){mt=!1,et=!1,D=null,$("error");return}let e=ml();if(t.contextKey&&e&&t.contextKey!==e&&!Y(t.contextKey,e)){mt=!1,et=!1,D=null,$("wait");return}mt=!1,et=!0,D=e||t.contextKey,$("done")}function wh(){zt&&xn()}function Sh(t,e){if(zt){if(Y(e,t)){pl(e,t),kt=t,xn();return}Gd(t)}}function Yd(){let t=W();!t||Pd.has(t)||(Pd.add(t),t.addEventListener("input",Dd,{capture:!0,passive:!0}),t.addEventListener("compositionend",Dd,{capture:!0,passive:!0}))}var Xd=w({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:qd,startAt:"DOMContentLoaded",cleanupSelectors:[`#${vn}`],start(){zt=!0,ee=$d()||ee,Od(),ca?.disconnect(),ca=kd(vn,t=>{Fe(t)&&(ee=t),jd()}),er?.abort(),er=new AbortController,window.addEventListener("popstate",da,{signal:er.signal}),document.addEventListener("visibilitychange",vh,{signal:er.signal}),Yd(),Kd(),Wd(),la?.(),la=ft({onRise:xh,onFall:Eh,onTick:wh,onContext:Sh}),xn(),mh.debug("favicon watch started")},stop(){zt=!1,Ct&&cancelAnimationFrame(Ct),Ct=0,la?.(),la=null,er?.abort(),er=null,Ud(),yn?.disconnect(),yn=null,dl=null,ca?.disconnect(),ca=null,zd(),kt="",En=!0,ua=!1,fo="wait",Md(vn,ee)},onSettingsChange:Od});var Zd=`.bloom-ih-hud {
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
`;var e1=new k("InputHistory"),gl=/\u200B/g,Jd=10,Qd=500,tf=100,Lh=8,Mh=120,kh=2e3,fa=10,ma=C({maxEntries:{type:4,description:"Max stored prompts",min:Jd,max:Qd,default:tf},history:{type:5,description:"Stored prompts",render:jh},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),bl=new Map,nt=0,hl="",ne=!1,po=!1,xl=0,mo=null,yl,El=null,ef=!0;function Gt(){let t=ma.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function nf(t){let e=at(Number(ma.store.maxEntries??tf),Jd,Qd);return t.length>e?t.slice(t.length-e):t}function pa(t){ma.store.entries=nf(t)}function Ch(t){return t.replaceAll(gl,"").replace(/\n$/,"").trim()}function vl(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(jt);return n instanceof HTMLElement?n:W()}function Ah(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Q(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(gl,"").trim().length===0,last:i.toString().replaceAll(gl,"").trim().length===0}}catch{return{first:!0,last:!0}}}function rf(t){clearTimeout(yl),yl=setTimeout(()=>{if(t!==xl)return;po=!1;let e=El;e&&ol(e,ef)},Mh)}function of(t,e,n){po=!0,El=t,ef=n;let r=++xl;ge(t,e,n),rf(r)}function Hh(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function rr(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Ih(){document.querySelector(".bloom-ih-hud")?.remove()}function Rh(t,e){let n=Hh();n.textContent=t;let r=(e.closest("form")??dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Lh)}px`,n.classList.add("bloom-ih-hud-on")}function wl(t){let e=Ch(t);if(!e)return;let n=Date.now(),r=bl.get(e);if(r&&n-r<kh)return;bl.set(e,n);let o=Gt().filter(i=>i!==e);o.push(e),pa(o),nt=Gt().length,ne=!1,rr()}function Nh(t,e){let n=Gt();if(!n.length&&t)return;nt>=n.length&&(hl=Q(e),nt=n.length);let r=t?nt-1:nt+1;r<0||r>n.length||(nt=r,ne=!0,of(e,r===n.length?hl:n[r],t),r<n.length?Rh(`${r+1} / ${n.length}`,e):rr())}function Ph(t){ne=!1,rr(),of(t,hl,!1),nt=Gt().length}function Oh(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=vl(t.target)??vl(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&ne&&!t.altKey&&!t.shiftKey){Ph(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){wl(Q(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=Gt();if(!r){let i=Ah(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||nt<=0)||!n&&nt>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Nh(n,e))}function Bh(t){if(vl(t.target)){if(po){rf(xl);return}ne&&(ne=!1,rr(),nt=Gt().length)}}function Dh(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(jt);n instanceof HTMLElement&&wl(Q(n))}function _h(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Qn);if(!n||!(n instanceof HTMLElement)||q(n))return;let r=W();r&&wl(Q(r))}function qh(t){if(!(!ne||po)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}ne=!1,rr()}}function $h(){if(mo)return;mo=new AbortController;let{signal:t}=mo,e={capture:!0,signal:t};window.addEventListener("keydown",Oh,e),window.addEventListener("input",Bh,e),window.addEventListener("submit",Dh,e),window.addEventListener("click",_h,e),window.addEventListener("pointerdown",qh,e)}function Fh(t){let e=Gt().slice();e.splice(t,1),pa(e),nt>e.length&&(nt=e.length)}function jh(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=Gt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/fa));n>=l&&(n=l-1);let c=s.slice(n*fa,n*fa+fa);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((E,h)=>{let x=i.indexOf(E),gt=Gt().length-1-x,bt=document.createElement("div");bt.className="bloom-ih-item";let J=document.createElement("button");J.type="button",J.className=`bloom-ih-body${r===h?"":" bloom-ih-clamp"}`,J.textContent=E,J.addEventListener("click",()=>{r=r===h?-1:h,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let ut=document.createElement("button");ut.type="button",ut.title="Copy",ut.textContent="C",ut.addEventListener("click",()=>{tu(E)});let Et=document.createElement("button");Et.type="button",Et.title="Delete",Et.textContent="\xD7",Et.addEventListener("click",()=>{Fh(gt),o()}),O.append(ut,Et),bt.append(J,O),g.appendChild(bt)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(pa([]),nt=0,o())}),d.append(f,m,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var af=w({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:ma,startAt:"HostReady",managedStyle:"inputHistory",start(){M("inputHistory",Zd),nt=Gt().length,ne=!1,$h()},stop(){mo?.abort(),mo=null,rr(),Ih(),bl.clear(),clearTimeout(yl),po=!1,El=null,ne=!1},onSettingsChange(){let t=Gt(),e=nf(t);e.length!==t.length&&pa(e),nt>e.length&&(nt=e.length)}});var Sl="noShareLink",zh=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share"]','button[aria-label="Share chat"]','button[aria-label="\u5206\u4EAB"]'],Gh=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Tl=C({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function sf(t){return`${t.join(",")}{display:none!important}`}function lf(){let t=[];if(Tl.store.hideShareChat!==!1&&t.push(sf(zh)),Tl.store.hideShareProject!==!1&&t.push(sf(Gh)),!t.length){L(Sl);return}M(Sl,t.join(`
`))}var cf=w({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Tl,start:lf,onSettingsChange:lf,stop(){L(Sl)}});var ff="noDictation",Uh=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]','form button[aria-label="Dictate button"]','form button[aria-label="Dictate"]','form button[aria-label="Start dictation"]','form button[aria-label="Stop dictation"]','form button[aria-label="Submit dictation"]','form button[aria-label^="Dictate" i]','form button[aria-label="\u542C\u5199"]','form button[aria-label="\u5F00\u59CB\u542C\u5199"]','form button[aria-label="\u505C\u6B62\u542C\u5199"]','form button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form button[data-testid="composer-dictate-button"]','form button[data-testid="dictation-button"]'],Kh=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],mf=C({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function uf(t){return`${t.join(",")}{display:none!important}`}function df(){let t=[uf(Uh)];mf.store.hideDictationSettings!==!1&&t.push(uf(Kh)),M(ff,t.join(`
`))}var pf=w({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:mf,start:df,onSettingsChange:df,stop(){L(ff)}});var Ll="noSidebarIdentity",or=[...Fs.split(","),'[data-app-navigation-rail] button[aria-haspopup="menu"]',"[data-bloom-profile-chip]"],hf=or.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),yf=or.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Wh=[...hf,...yf],Vh=[...hf,...or.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Yh=or.map(t=>`${t} a[href^="mailto:"]`),Xh=or.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Zh=or.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),go=C({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function gf(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Jh(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Qh(){return`${Zh.join(",")}{margin-block:auto!important}`}function t0(){return`${Xh.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function bf(){let t=go.store.hideUsername!==!1,e=go.store.hideEmail!==!1,n=t&&go.store.enlargePlan!==!1,r=t&&go.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Jh([...Vh,...yf])),o.push(Qh())):o.push(gf(Wh))),e&&o.push(gf(Yh)),n&&o.push(t0()),!o.length){L(Ll);return}M(Ll,o.join(`
`))}var vf=w({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:go,start:bf,onSettingsChange:bf,stop(){L(Ll)}});var xf=`#bloom-rt-host {
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
`;var Sf=new k("RecentTopics"),sr="bloom-rt-host",Tf="home",Lf=/^\/c\/([a-z0-9_-]{8,})/i,n0=/\/c\/([a-z0-9_-]{8,})/i,Mf=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,r0=new Set(["Backquote","IntlBackslash"]),o0=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),i0=140,a0=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),rt=C({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:a0},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),ga=null,ba=null,vt=!1,Eo=!1,bo=!1,re=0,wn="",ir=null,ho=null,ar,Ml=null,kl=null;function s0(){let t=Number(rt.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function yo(){let t=rt.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Al(){let t=rt.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function kf(){let t=rt.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Hl(){let t=rt.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ya(t){let e=s0();return t.length>e?t.slice(0,e):t}function oe(t){return t===Tf}function vo(t,e=i0){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Il(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Lf)?.[1]??""}catch{return t.match(n0)?.[1]??""}}function Sn(){let t=(location.pathname||"/").match(Lf);if(t?.[1])return t[1];let n=_t().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Tf}function Rl(t){if(oe(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Il(r.getAttribute("href")||"")!==t)continue;let o=vo(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Sn()===t&&e&&!/^ChatGPT$/i.test(e)?vo(e,80):""}function l0(t){if(oe(t))return"New chat";let e=Al()[t];if(e)return e;let n=Wn(t);return n||Rl(t)||"Chat"}function c0(t){return Hl()[t]||""}function u0(t){return kf()[t]||{}}function Nl(t,e){if(!t||oe(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Al();n[t]!==e&&(n[t]=e,rt.store.titles=n)}function d0(t){t.type==="conversation-meta"&&(Nl(t.conversationId,t.title),vt&&lr())}function f0(t,e){if(!t||oe(t)||!e)return;let n=Hl();n[t]!==e&&(n[t]=e,rt.store.projects=n)}function m0(t,e){if(!t||oe(t)||!e.user&&!e.assistant)return;let n=kf(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,rt.store.previews=n)}function Pl(t){if(!t||oe(t)&&rt.store.includeHome===!1)return;let e=yo().filter(n=>n!==t);e.unshift(t),rt.store.visits=ya(e)}function va(){let t=rt.store.includeHome!==!1;return ya(yo().filter(n=>t||!oe(n))).map(n=>({id:n,title:l0(n),project:c0(n),preview:u0(n)}))}function Ef(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return vo(o)}catch{return""}}function xo(t){if(!t||oe(t)||t!==Sn())return;let e=Rl(t);e&&Nl(t,e);let n=Ef("user"),r=Ef("assistant");m0(t,{user:n,assistant:r});let o=Af(t);if(o){let i=Cf(o);i&&f0(t,i)}}function Ol(){let t=Al(),e=Hl(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${sr}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Il(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=vo(c.textContent||"",80);d&&!Mf.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Cf(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(rt.store.titles=t),i&&(rt.store.projects=e);let a=yo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(rt.store.visits=ya([...a,...l]))}function Cf(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=vo((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Mf.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Af(t){if(oe(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Il(e.getAttribute("href")||"")===t)return e}catch{}return null}function p0(t){let e=Af(t);if(e){e.click();return}if(oe(t)){location.assign("/");return}location.assign(`/c/${t}`)}function g0(){let t=Sn();wn&&wn!==t&&xo(wn),wn=t,Pl(t),Ol();let e=Rl(t);e&&Nl(t,e),xo(t)}function ha(){ar===void 0&&(ar=window.setTimeout(()=>{ar=void 0,g0()},120))}function b0(){ir||(ir=history.pushState.bind(history),ho=history.replaceState.bind(history),history.pushState=function(...e){let n=ir(...e);return ha(),n},history.replaceState=function(...e){let n=ho(...e);return ha(),n})}function h0(){ir&&(history.pushState=ir),ho&&(history.replaceState=ho),ir=null,ho=null}function y0(t){return r0.has(t.code)||t.keyCode===192?!0:o0.has(t.key)}function Hf(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function v0(t,e){Eo=e,Ol(),xo(Sn()),vt=!0,re=0;try{let n=Sn();Pl(n);let r=va();r.length>1&&(re=t?r.length-1:1)}catch(n){Sf.error("Failed to open switcher:",n)}lr()}function wf(t){let{length:e}=va();e&&(re=(re+(t?-1:1)+e)%e,lr())}function Bl(){if(!vt)return;let t=va()[re];vt=!1,Eo=!1,lr(),t&&p0(t.id)}function If(){vt&&(vt=!1,Eo=!1,lr())}function x0(t){if(Hf(t)){bo=!0;return}if((t.ctrlKey||bo)&&!t.altKey&&!t.metaKey&&y0(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{vt?wf(t.shiftKey):v0(t.shiftKey,!0)}catch(n){Sf.error("Hotkey failed:",n)}return}if(vt){if(t.key==="Escape"){t.preventDefault(),If();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Bl();return}t.key==="Tab"&&(t.ctrlKey||bo)&&(t.preventDefault(),wf(t.shiftKey))}}function E0(t){Hf(t)&&(bo=!1,vt&&Eo&&Bl())}function w0(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ha)}function S0(t){!vt||(t.target instanceof Element?t.target:null)?.closest(`#${sr}`)||If()}function T0(){document.visibilityState==="hidden"&&xo(Sn())}function Cl(t=ba){t instanceof HTMLElement&&_i(t,Di("auto"),!0)}function L0(){if(!document.body)return null;let t=document.getElementById(sr);if(t instanceof HTMLElement)return ba=t,Cl(t),t;t=document.createElement("div"),t.id=sr;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ba=t,Cl(t),t}function lr(){let t=L0();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!vt){e.dataset.visible="false",e.replaceChildren();return}let n=va();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}re>=n.length&&(re=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===re?"true":"false",s.setAttribute("aria-selected",a===re?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{re=a,Bl()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function M0(){document.getElementById(sr)?.remove(),ba=null}var Rf=w({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${sr}`],settings:rt,start(){M("recentTopics",xf),wn=Sn(),Pl(wn),Ol(),xo(wn),Ml=St(d0),b0(),ga=new AbortController;let{signal:t}=ga;window.addEventListener("keydown",x0,{capture:!0,signal:t}),window.addEventListener("keyup",E0,{capture:!0,signal:t}),window.addEventListener("popstate",ha,{signal:t}),document.addEventListener("click",w0,{capture:!0,signal:t}),document.addEventListener("click",S0,{signal:t}),document.addEventListener("visibilitychange",T0,{signal:t}),kl=Gn("schemeChange",()=>Cl())},stop(){ga?.abort(),ga=null,ar!==void 0&&(clearTimeout(ar),ar=void 0),h0(),Ml?.(),Ml=null,kl?.(),kl=null,vt=!1,Eo=!1,bo=!1,M0()},onSettingsChange(){let t=ya(yo());t.length!==yo().length&&(rt.store.visits=t),vt&&lr()}});var Dl="cleaner",k0=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],C0=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs",'#thread-bottom [class*="vt-disclaimer"]','[data-testid="desktop-app-shell"] [class*="disclaimer"]'],A0=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],H0=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],I0=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],R0=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Tn=C({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function cr(t){return`${t.join(",")}{display:none!important}`}function Nf(){let t=[];if(Tn.store.hideDownloadApps!==!1&&t.push(cr(k0)),Tn.store.hideDisclaimer!==!1&&t.push(cr(C0)),Tn.store.hideUpgrade!==!1&&t.push(cr(A0)),Tn.store.hideLockedModels!==!1&&t.push(cr(H0)),Tn.store.hideHomePromo!==!1&&t.push(cr(I0)),Tn.store.hideAds!==!1&&t.push(cr(R0)),!t.length){L(Dl);return}M(Dl,t.join(`
`))}var Pf=w({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Tn,start:Nf,onSettingsChange:Nf,stop(){L(Dl)}});var Ea=new k("ResponseNotification"),dr=C({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:q0},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),_l=!1,xa=null,ur=null,wo=null;function N0(){return document.visibilityState==="hidden"||document.hidden}function P0(){return dr.store.onlyWhenHidden===!1?!0:N0()}function O0(){let t=Wn(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Of(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!ur||ur.state==="closed")&&(ur=new t);let e=ur,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Ea.debug("chime failed",t)}}function B0(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Ea.debug("custom sound failed",e),Of()}}function Bf(){let t=String(dr.store.soundUrl||"").trim();t?B0(t):Of()}function D0(){let t="Bloom++",e=`${O0()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Ea.debug("notification failed",n)}}function _0(){P0()&&(dr.store.sound!==!1&&Bf(),dr.store.browserNotification!==!1&&D0())}function q0(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Bf()),t.appendChild(e),()=>{e.remove()}}var Df=w({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:dr,start(){_l=!0,xa?.(),xa=ft(t=>{if(!_l||t.userStopped||t.error)return;let e=R()||tr();t.conversationId&&t.conversationId!==e||_0()}),wo?.abort(),wo=new AbortController,dr.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:wo.signal}),Ea.debug("watch started")},stop(){_l=!1,xa?.(),xa=null,wo?.abort(),wo=null;try{ur?.close()}catch{}ur=null}});var _f=`#bloom-pq-chip {
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
`;var Ke=new k("PromptQueue"),Ma="bloom-pq-chip",qf="promptQueue",F0=8,j0=50,z0=2e3,G0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,U0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),ql=C({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),Ge=new Map,$f=0,Kt=!1,Ut="",P="",ie=!1,xt=!1,Ve=!1,B=null,So=null,wa=null,ze,Co,We=null,N=null,fr=null,Ta=!1,lt=null,Ln,Ue=!0,U=!1,G=!1,pt=!1;function be(){return de(_t())}function Mn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function K0(t){let e=Mn(ro(t));if(e)return e;let n=Mn(Q(t));if(n)return n;if(!Jt(t))return"";try{let r=t.cloneNode(!0);return r.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(o=>o.remove()),Mn(r.innerText||r.textContent||"")}catch{return""}}function Wf(){try{let t=document.querySelectorAll($u),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Vf(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Yf(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&G0.test(n))return!0}}catch{}return!1}function La(){let t=tr();if(!t)return!1;let e=R();return!e||e===t}function ko(){if(V()||La())return!1;let t=Wf();if(!t)return!0;if(Vf(t)||Yf(t))return!1;try{if(t.querySelector(U0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function W0(){if(z()||hn())return U=!1,!1;if(V()||La())return U=!0,!0;let t=Wf();return t&&(Vf(t)||Yf(t))?(U=!0,!0):U&&!ko()?!0:(U=!1,!1)}function Xf(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return null;let n=e.closest('textarea[name="prompt"], #mobile-composer-prompt, textarea#prompt-textarea');if(n instanceof HTMLElement)return n;let r=e.closest(jt);return r instanceof HTMLElement?r:null}function Ff(t){return Xf(t)??W()}function ka(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Zf(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function V0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?Mn(e.innerText||e.textContent||""):""}catch{return""}}function Y0(){return $f+=1,`pq${Date.now().toString(36)}${$f.toString(36)}`}function X(t){return Ge.get(t)??[]}function Jf(t){return X(t)[0]}function kn(t,e){e.length?Ge.set(t,e):Ge.delete(t)}function Qf(t){if(!X(t).length){G=!1,pt=!1,P="";return}G=!0,pt=!1,U=!0,P=""}function jf(t){if(!Ut||Ut===t)return;let e=Ge.get(Ut);!e?.length||Ge.has(t)||Y(Ut,t)&&(Ge.delete(Ut),Ge.set(t,e),P===Ut&&(P=t),B?.key===Ut&&(B.key=t),Ke.debug("migrated pending",Ut,"\u2192",t))}function Ca(t){let e=be(),n=X(e);if(ql.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),kn(e,n)}else if(n.length>=F0){Ke.debug("queue full",e);return}else n.push({id:Y0(),text:t,at:Date.now()}),kn(e,n);U=!0,B={key:e,text:t,turns:Zf(),ticks:3};let r=W();r&&ge(r,"");try{ct()}catch(o){Ke.error("chip",o)}Ke.debug("queued",e,n.length,t.length)}function tm(t,e){let n=X(t).filter(r=>r.id!==e);if(kn(t,n),N===e&&(N=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}ct()}function jl(){fr?.abort(),fr=null}function X0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function zf(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function Z0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||N||lt)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;fr?.abort();let c=new AbortController;fr=c;let{signal:u}=c,d=!1,f=!1,m=0,p=0,b=0,g=0,E=null,h=[],x=[],gt=()=>{e.classList.add("bloom-pq-settling");for(let y of h)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},bt=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(E?.isConnected?E.before(t):e.append(t)),E?.remove(),E=null,gt(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},J=()=>{Ta=!0;let y=A=>{A.preventDefault(),A.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{Ta=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=zf(h.length,m,p),A=x.length>1?(x[x.length-1].top-x[0].top-x.slice(0,-1).reduce((H,Vt)=>H+Vt.height,0))/(x.length-1):2,ht=new Array(x.length),wt=x[0]?.top??0;for(let H of y)ht[H]=wt,wt+=x[H].height+A;for(let H=0;H<h.length;H++){if(H===m)continue;let Vt=ht[H]-x[H].top;h[H].style.transform=Math.abs(Vt)<.5?"":`translate3d(0,${Math.round(Vt)}px,0)`}},ut=()=>{let y=X(n).slice();if(m<0||m>=y.length)return;let A=zf(y.length,m,p);if(A.every((H,Vt)=>H===Vt))return;let ht=A.map(H=>y[H]).filter(Boolean);if(ht.length!==y.length)return;kn(n,ht);let wt=new Map(h.map(H=>[H.dataset.pqId||"",H]));for(let H of ht){let Vt=wt.get(H.id);Vt&&e.append(Vt)}},Et=y=>{if(f)return;f=!0;let A=d;fr===c&&(fr=null),A&&y&&t.isConnected&&ut(),bt(),A&&J(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;bt(),y&&J()});let ai=()=>{d=!0,h.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=h.indexOf(t),m<0&&(m=h.findIndex(H=>H.dataset.pqId===r)),p=m<0?0:m;let y=t.getBoundingClientRect();b=y.left,g=y.top;let A=getComputedStyle(t);E=document.createElement("div"),E.className="bloom-pq-gap",E.style.height=`${y.height}px`,t.before(E),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=A.color,t.style.font=A.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let ht=e.getBoundingClientRect(),wt=e.scrollTop;x=h.map(H=>{let vs=(H===t?E:H).getBoundingClientRect(),Kc=vs.top-ht.top+wt;return{top:Kc,height:vs.height,mid:Kc+vs.height/2}})},v=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(ai(),!d||m<0)))return;y.preventDefault(),t.style.left=`${b+(y.clientX-s)}px`,t.style.top=`${g+(y.clientY-l)}px`;let A=e.getBoundingClientRect(),ht=y.clientY-A.top+e.scrollTop,wt=X0(ht,x.map(H=>H.mid));wt!==p&&(p=wt,O())},I=y=>{y.pointerId===a&&Et(!0)};window.addEventListener("pointermove",v,{signal:u}),window.addEventListener("pointerup",I,{signal:u}),window.addEventListener("pointercancel",()=>Et(!1),{signal:u})})}function J0(){xt=!0,clearTimeout(Co),Co=setTimeout(()=>{xt=!1,Co=void 0},z0)}function Q0(t){if(lt)return;let e=be(),n=X(e).find(i=>i.id===t);if(!n)return;let r=W();if(!r)return;let o=n.text;lt=t,N===t&&(N=null),jl(),ct(),clearTimeout(Ln),Ln=setTimeout(()=>{if(Ln=void 0,!Kt||lt!==t)return;if(lt=null,be()!==e||!X(e).some(a=>a.id===t)){ct();return}kn(e,X(e).filter(a=>a.id!==t)),ct(),J0(),ge(r,o);let i=Be();i&&!q(i)&&!ta(i)&&(i.click(),xt=!1),Qf(e)},160)}function To(t){if(!Kt||ie||G||lt||V()||be()!==t)return;let e=Jf(t);if(!e){P="";return}if(te())return;let n=W();if(!n)return;if(!Oe(n)){let o=Mn(Q(n));if(o&&o!==e.text)return}let r=Be();!r||q(r)||ta(r)||(ie=!0,ge(n,e.text),clearTimeout(ze),ze=setTimeout(()=>ty(t,e.id,e.text),j0))}function ty(t,e,n){ze=void 0;try{if(!Kt||G||lt)return;let r=Jf(t);if(!r||r.id!==e||r.text!==n||V()||be()!==t)return;let o=W();if(!o)return;let i=Mn(Q(o));if(i&&i!==n&&!Oe(o))return;i!==n&&ge(o,n);let a=Be();if(!a||q(a)||ta(a))return;a.click(),kn(t,X(t).filter(s=>s.id!==e)),ct(),Qf(t),Ke.debug("drained",t,X(t).length)}finally{ie=!1}}function $l(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=dt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Fl(){jl(),We?.remove(),We=null,N=null,Ue=!0}var em="http://www.w3.org/2000/svg";function ey(){let t=document.createElementNS(em,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function Lo(t){let e=ey();for(let n of t){let r=document.createElementNS(em,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function Mo(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&nm(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function ny(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${Ma}`)}function Sa(){let t=We?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function ry(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function je(t,e){if(N!==t)return;if(N=null,e===null){ct();return}let n=Mn(e),r=be();if(!n){tm(r,t);return}let o=X(r).find(i=>i.id===t);o&&(o.text=n),ct()}function Gf(t){lt||N!==t&&(N&&je(N,Sa()),X(be()).some(e=>e.id===t)&&(N=t,Ue=!0,ct()))}function nm(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function Uf(t){return N===t?"edit":lt===t?"send":"text"}function oy(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function iy(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||oy(l)!==Uf(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",Ue?"true":"false"),n.hidden=!Ue;for(let s of e){let l=a.get(s.id);if(Uf(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function ct(){if(jl(),!Kt||!document.body){Fl();return}let t=be(),e=X(t);if(!e.length){Fl();return}N&&!e.some(d=>d.id===N)&&(N=null),lt&&!e.some(d=>d.id===lt)&&(lt=null);let n=We;if(n?.isConnected||(n=document.createElement("div"),n.id=Ma,document.body.appendChild(n),We=n),iy(n,e)){$l(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",Ue?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Ue=!Ue,ct()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",Ue||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=N===d.id,p=lt===d.id;m||(f.setAttribute("role","button"),f.tabIndex=p?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),p&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let b=document.createElement("div");b.className="bloom-pq-body";let g;if(m){let h=document.createElement("textarea");h.className="bloom-pq-text bloom-pq-editing",h.value=d.text,h.rows=2,h.spellcheck=!1,h.setAttribute("aria-label","Queued message text"),h.addEventListener("keydown",x=>{x.stopPropagation(),x.key==="Enter"&&!x.shiftKey?(x.preventDefault(),je(d.id,h.value)):x.key==="Escape"&&(x.preventDefault(),je(d.id,null))}),h.addEventListener("blur",()=>je(d.id,h.value)),g=h,u=h}else{let h=document.createElement("span");h.className="bloom-pq-text line-clamp-2",h.textContent=p?"Sending":d.text,p?nm(h,l,"Sending now"):h.addEventListener("click",x=>{if(Ta){Ta=!1,x.preventDefault(),x.stopPropagation();return}x.preventDefault(),x.stopPropagation(),Gf(d.id)}),g=h}b.append(g),f.append(b);let E=document.createElement("div");if(E.className="bloom-pq-rail",m){let h=Mo("Save",Lo(["M20 6 9 17l-5-5"]),()=>{je(d.id,g instanceof HTMLTextAreaElement?g.value:Sa())},l),x=Mo("Cancel",Lo(["M18 6 6 18","m6 6 12 12"]),()=>{je(d.id,null)},l);E.append(h,x)}else{let h=Mo("Remove from queue",Lo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{N&&N!==d.id&&je(N,Sa()),N=N===d.id?null:N,tm(t,d.id)},l,void 0,p),x=Mo("Edit queued message",Lo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>Gf(d.id),l,"Edit",p),gt=Mo("Send now",Lo(["M12 19V5","M6 11 12 5l6 6"]),()=>{N&&N!==d.id&&je(N,Sa()),Q0(d.id)},l,"Send now (or Enter on empty composer)",p);E.append(h,x,gt)}f.append(E),!m&&!p&&Z0(f,c,t,d.id),c.append(f)}if(n.append(o,c),$l(n),u){let d=u,f=N;queueMicrotask(()=>{N===f&&d.isConnected&&ry(d)})}}function ay(){if(!B)return;B.ticks-=1;let t=X(B.key);if(t.length&&Zf()>B.turns){let e=V0();if(e&&e===B.text){Ke.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),kn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,ct();return}}B.ticks<=0&&(B=null)}function Aa(t){return W0()?K0(t):""}function sy(t){if(!Kt||t.isComposing||t.keyCode===229||t.key!=="Enter"||ny(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||ie)return;let e=Ff(t.target)??Ff(document.activeElement);if(!e)return;if(t.altKey||xt){xt=!1,Ve=!0,queueMicrotask(()=>{Ve=!1});return}let n=Aa(e);n&&(ka(t),Ca(n))}function ly(t){if(!Kt||ie||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Ve){Ve=!1;return}if(xt){xt=!1;return}let e=Xf(t.target);if(!e)return;let n=Aa(e);n&&(ka(t),Ca(n))}function cy(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||q(e))return null;let n=t.closest(Qn);if(n instanceof HTMLElement&&!q(n))return n;let r=Be();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Kf(t){if(!Kt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Ma}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&q(n)||ie||!cy(e))return;if(xt){xt=!1;return}let r=W();if(!r)return;let o=Aa(r);o&&(ka(t),Ca(o))}function uy(t){if(!Kt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(no)&&!e.querySelector(jt)||ie)return;if(Ve){Ve=!1;return}if(xt){xt=!1;return}let n=W()??e.querySelector(jt);if(!n)return;let r=Aa(n);r&&(ka(t),Ca(r))}var rm=w({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:qf,cleanupSelectors:[`#${Ma}`],settings:ql,start(){Kt=!0;let t=ql.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),Ut=be(),P="",ie=!1,xt=!1,Ve=!1,B=null,U=!z()&&!hn()&&(V()||La()),G=!1,pt=!1,N=null,lt=null,clearTimeout(Ln),Ln=void 0,M(qf,_f),So?.abort(),So=new AbortController;let{signal:e}=So,n={capture:!0,signal:e};window.addEventListener("keydown",sy,n),document.addEventListener("beforeinput",ly,n),document.addEventListener("pointerdown",Kf,n),document.addEventListener("click",Kf,n),document.addEventListener("submit",uy,n),wa?.(),wa=ft({onFall(r){if(Kt){if(r.userStopped||r.error){U=!1,G=!1,pt=!1,P="",ct();return}if(!(G&&!pt)){if(G&&pt){if(!ko())return;G=!1,pt=!1,U=!1,P=r.contextKey,To(r.contextKey);return}if(!ko()){Ke.debug("unsettled fall; keep queue window");return}U=!1,P=r.contextKey,To(r.contextKey)}}},onRise(){z()||hn()||(G&&(pt=!0),U=!0)},onContext(r,o){o&&r&&!Y(o,r)&&(U=!1,G=!1,pt=!1,P="",ie=!1,ze!==void 0&&(clearTimeout(ze),ze=void 0)),jf(r),Ut=r,ct()},onTick(r){jf(r.contextKey),Ut=r.contextKey,ay(),(z()||hn())&&(G=!1,pt=!1,U=!1,P=""),G&&(V()||La())&&(pt=!0),G&&pt&&ko()&&(G=!1,pt=!1,U=!1,X(r.contextKey).length&&(P=r.contextKey,To(r.contextKey))),!G&&U&&ko()&&(U=!1,!P&&X(r.contextKey).length&&(P=r.contextKey,To(r.contextKey))),!G&&P&&P===r.contextKey&&To(P),X(r.contextKey).length&&!We?.isConnected?ct():We&&$l(We)}}),ct(),Ke.debug("watch started")},stop(){Kt=!1,wa?.(),wa=null,So?.abort(),So=null,clearTimeout(ze),ze=void 0,clearTimeout(Co),Co=void 0,clearTimeout(Ln),Ln=void 0,lt=null,Ge.clear(),B=null,P="",ie=!1,xt=!1,Ve=!1,U=!1,G=!1,pt=!1,Fl()}});var om=`.bloom-cls {
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
`;var sm=new k("ChatListStatus"),im="chatListStatus",Ra="bloom-cls",fy="bloom-cls",my=1200*1e3,py="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Wt=new Map,ae=!1,At="",he=!1,gr=!1,Ht=0,Ye=null,Ul=null,mr=null,zl=null,Ha=null,Ao=null,pr=!1,Xe=new Set;function Ia(){return Date.now()}function lm(){return ju()||document.querySelector("nav")||null}function ye(t,e,n,r=!0){if(!(!t||!ae)){if(e==="idle")Wt.delete(t);else{let o=Wt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ia():Wt.set(t,{kind:e,at:Ia(),source:n})}r&&gy({v:1,id:t,kind:e,at:Ia()}),Cn()}}function gy(t){try{mr?.postMessage(t)}catch{}}function by(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ye(e.id,e.kind,"bc",!1)}function hy(){let t=Ia();for(let[e,n]of Wt)n.kind==="streaming"&&t-n.at>my&&Wt.delete(e)}function yy(){let t=lm();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll(Bu)){if(r.closest(py))continue;let o=fe(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function am(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Gl(t){let e=t.querySelector(`:scope > .${Ra}`);return e||null}function Kl(){if(!ae)return;hy();let t=R(),e=yy();Ye?.disconnect();try{for(let n of e){let r=fe(n.getAttribute("href")||"");if(!r||!t||r!==t){Gl(n)?.remove();continue}let i=Wt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Gl(n)?.remove();continue}let a=Gl(n);a||(a=document.createElement("span"),a.className=Ra,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(am("streaming")):i==="error"&&a.appendChild(am("error")))}}catch(n){sm.debug("paint failed",n)}cm()}function Cn(){if(ae){if(document.hidden){Ht&&(cancelAnimationFrame(Ht),Ht=0),Kl();return}Ht||(Ht=requestAnimationFrame(()=>{Ht=0,ae&&Kl()}))}}function cm(){let t=lm();if(!(Ye&&Ul===t&&t?.isConnected)){if(Ye?.disconnect(),Ul=t,!t){Ye=null;return}Ye=new MutationObserver(()=>Cn()),Ye.observe(t,{childList:!0,subtree:!0})}}function Na(){return!!(fn()||lo())}function vy(t){return!!(pr||t&&Xe.has(t)||!gr&&!z()&&Na())}function xy(t){if(ae){if(t.type==="post-start"){gr=!1,t.conversationId?(pr=!1,Xe.add(t.conversationId),he=!0,ye(t.conversationId,"streaming","net")):(pr=!0,he=!0);return}if(t.type==="post-end"){if(pr=!1,t.conversationId){Xe.delete(t.conversationId);let e=R(),n=tr();(e?t.conversationId===e:t.conversationId===n)?ye(t.conversationId,t.error?"error":"done","net"):ye(t.conversationId,"idle","net")}Na()||(he=!1)}}}function Ey(t,e){if(!ae)return;if(Y(e,t)){Cn();return}let n=R();if(At&&At!==n){Xe.delete(At);let r=Wt.get(At);r&&r.kind!=="idle"&&ye(At,"idle","local")}pr=!1,he=!1,gr=!0,n&&Wt.get(n)?.kind==="streaming"&&Wt.get(n)?.source==="local"&&!Xe.has(n)&&ye(n,"idle","local"),Cn()}function wy(t){if(!ae)return;let e=t.conversationId||R();if(At&&e&&At!==e){Xe.delete(At);let r=Wt.get(At);r&&r.kind!=="idle"&&ye(At,"idle","local"),he=!!(e&&Xe.has(e))}if(e&&(At=e),gr||z()){if(z()||Na()||t.streaming){Cn();return}gr=!1}if(vy(e)&&(t.streaming||Na())){he=!0,e&&ye(e,"streaming","local"),Cn();return}he&&(he=!1,e&&ye(e,te()?"error":"done","local")),Cn()}var um=w({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ra}`],start(){ae=!0,M(im,om);try{mr=new BroadcastChannel(fy)}catch{mr=null}mr?.addEventListener("message",by),zl=St(xy),Ha?.(),Ha=ft({onTick:wy,onContext:Ey}),Ao?.abort(),Ao=new AbortController,document.addEventListener("visibilitychange",()=>{ae&&(Ht&&(cancelAnimationFrame(Ht),Ht=0),Kl())},{signal:Ao.signal}),cm(),sm.debug("sidebar status watch started")},stop(){ae=!1,Ht&&cancelAnimationFrame(Ht),Ht=0,Ao?.abort(),Ao=null,Ye?.disconnect(),Ye=null,Ul=null,Ha?.(),Ha=null,zl?.(),zl=null;try{mr?.close()}catch{}mr=null,Wt.clear(),Xe.clear(),pr=!1,he=!1,gr=!1,At="",document.querySelectorAll(`.${Ra}`).forEach(t=>t.remove()),L(im)}});var fm="widerChat",mm=40,pm=96,gm=64,bm=C({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:mm,max:pm,default:gm}});function Sy(){return at(Number(bm.store.width??gm),mm,pm)}function dm(){let t=Sy(),e=`min(100%,${t}rem)`;M(fm,`:root,#thread,#thread-bottom-container,#thread-bottom,[data-chatgpt-conversation-selection-target],[data-testid="desktop-app-shell"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var hm=w({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:bm,start:dm,onSettingsChange:dm,stop(){L(fm)}});var Wl="composerOpacity",br='form[data-type="unified-composer"],form.w-full[data-type]',Ty=[`${br} [class*="corner-superellipse"]`,`${br} [class*="bg-token-bg-primary"]`,`${br} [class*="bg-token-main-surface"]`,'form [class*="corner-superellipse"]','#thread-bottom-container [class*="corner-superellipse"]','#thread-bottom [class*="corner-superellipse"]'].join(","),Ly=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),My="#thread-bottom-container,#thread-bottom",ky=`${br} #prompt-textarea,${br} [contenteditable="true"],#mobile-composer-prompt,textarea[name="prompt"]`,Cy="var(--bg-primary,var(--main-surface-primary,#ffffff))",Vl=C({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Ay(){return at(Number(Vl.store.opacity??100),0,100)}function Hy(){return at(Number(Vl.store.blur??16),0,40)}function ym(){let t=Ay();if(t>=100){L(Wl);return}let e=Hy(),n=`color-mix(in srgb,${Cy} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";M(Wl,`${My}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Ly}{display:none!important}${br}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Ty}{background-color:${n}!important;background-image:none!important;${r}}${ky}{background-color:transparent!important;background-image:none!important}`)}var vm=w({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Vl,start:ym,onSettingsChange:ym,stop(){L(Wl)}});var xm=`#bloom-bn-host {
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
`;var Ry=new k("BetterNavigator"),Yl="betterNavigator",Mm="bloom-bn-host",Rn=60,Em=16,Ql=1e3,wm=2400,Ny=80,km=2.5,Py=.4,Ho="\u6B63\u5728\u8F93\u51FA\u2026",tc="Image",Oy="\u2753",By="\u{1F916}",Sm=/file_[0-9a-f]+/gi,Dy="File",_y="Code",qy=".markdown, .whitespace-pre-wrap",ac=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),$y="img, picture, video, canvas",Fy=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,jy=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,qo=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,zy=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Gy=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Uy=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,Ky=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,Wy=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,Vy=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Yy=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Xy=2e3,Zy=40,Jy=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,Cm=_u,Qy=["#thread-bottom-container","#thread-bottom","#prompt-textarea","#mobile-composer-prompt","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']",'textarea[name="prompt"]'].join(", "),tv=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),ev=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),yr=C({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),xe=new Map,Oo=new Map,se=new Set,Ba=0,Nt=!1,Ee=!1,hr=!1,Ze=null,$o=null,vr=null,Da=null,F=[],In="",_a=0,Bo=-1,Do=0,qa="",Rt=0,ve=0,Io,Ro=null,Pa=null,Xl=null,Zl=null,An=null,ec=null,No=null,Hn=null,we=null,Po=null,$a=!1,nc=0;function xr(){return Ii()}function Jl(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function nv(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function rv(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-'], [data-chatgpt-search-message-ids]"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Jy.test(nv(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Jl(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Jl(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Jl(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function _o(t){try{return!!t.closest(Qy)}catch{return!0}}function Tm(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function za(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||Ri(t)||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function sc(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function ov(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Oa(t,e){if(t){Sm.lastIndex=0;for(let n of t.matchAll(Sm))e.add(n[0].toLowerCase())}}function iv(t){try{let e=new Set,n=s=>{ov(s)||(Oa(s.getAttribute("src")||"",e),Oa(s.getAttribute("srcset")||"",e),Oa(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Oa(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=za(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function av(t,e){let n=iv(t),r=Oo.get(e)??0,o=Math.max(r,n);return o>0&&Oo.set(e,o),o>=2?`${tc} x${o}`:tc}function Z(t){return t.replace(/\s+/g," ").trim()}function Am(t,e){let n=t;for(;n&&n!==e;){if(n.matches(tv))return!0;n=n.parentElement}return!1}function Fa(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(Am(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(ac);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return Z(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Rn+20;)e.push(Z(r.textContent||""));return Z(e.join(" "))}function Fo(t){let e=Z(t);return e.length<3||e.length>180||qo.test(e)?!1:Fy.test(e)?!0:jy.test(e)}function Ga(t){let e=Z(t);return e.length<8||e.length>120||/\s/.test(e)||qo.test(e)||Fo(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function sv(t){let e=[],n=i=>{let a=Z(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(Z(s[1])),e.push(Z(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function lv(t){try{return _o(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function lc(t){let e=Z(t);return!e||cc(e)||Ga(e)?!0:Fo(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function cv(t){return!t.length||t.length>4||!t.every(e=>lc(e))?!1:t.some(e=>qo.test(Z(e))||Fo(e)||Ga(e))}function Hm(t){try{let e=null,n=0,r=`${ac}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(lv(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=sv(o);if(!i.length||i.length>4||i.join(" ").length>240||!cv(i))continue;let a=i.some(c=>qo.test(Z(c))),s=i.some(c=>Fo(c)||Ga(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function uv(t){return Hm(t)?Dy:""}function dv(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(zy.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function fv(t){try{for(let e of t.querySelectorAll($y))if(!dv(e))return!0}catch{}return!1}function cc(t){let e=Z(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||Ky.test(e)||Uy.test(e)?!0:e.length<=24&&(Wy.test(e)||qo.test(e))}function mv(t){let e=[],n=new Set,r=o=>{try{if(Am(o,t)||o.closest(ac))return}catch{return}let i=Fa(o);!i||n.has(i)||cc(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>Rn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Fa(o).length<24)&&(r(o),e.join(" ").length>Rn+20))break}}catch{}return Z(e.join(" "))}function pv(t){let e=Hm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=Z(i.innerText||i.textContent||"");!a||a.length>Rn+20||r.has(a)||lc(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return Z(n.join(" "))}function gv(t,e){let n=[];try{for(let o of t.querySelectorAll(qy)){if(_o(o))continue;let i=Fa(o);if(!(!i||e==="assistant"&&cc(i)||lc(i))&&(n.push(i),n.join(" ").length>Rn+20))break}}catch{}let r=Z(n.join(" "));if(e==="user"){let o=pv(t);if(o)return o}return r||(e==="assistant"?mv(t):"")}function bv(t){return t.length>Rn?`${t.slice(0,Rn).trimEnd()}\u2026`:t}function Lm(t){return Vy.test(t)}function hv(t,e,n,r){let o=gv(t,e);if(o)return bv(o);if(r)return Ho;let i=uv(t);if(i)return i;if(sc(t))return av(t,za(t));try{if(fv(t))return tc;if(t.querySelector("pre, code"))return _y}catch{}return`Message ${n+1}`}function yv(){if(Ee)return!0;let t=R();return!!(t&&se.has(t)||!hr&&!z()&&jo())}function jo(){return!!(fn()||lo())}function vv(){Ba=Date.now()}function Im(t){Ee=!1,t&&se.delete(t);let e=R();e&&se.delete(e)}function xv(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Ev(t){if(sc(t)||!jo())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Fa(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function uc(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=Z(e.textContent||"");if(!(n.length>32)&&Gy.test(n))return!0}}catch{}return!1}function Rm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function wv(t,e){try{if(xv(t))return!0;if(!e)return!1;if(Ev(t)||uc(t))return!0}catch{}return!1}function Nm(t){if(!t||jo())return!1;try{if(uc(t)||Rm(t))return!1;if(t.querySelector(Yy)||sc(t))return!0}catch{}return!1}function Sv(t){if(jo()||Ba&&Date.now()-Ba<Xy)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!Nm(e.el)||Im()}function Tv(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(Cm)){if(_o(r))continue;let i=za(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(_o(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function Lv(t){return _s(t)}function Mv(t){let e=yr.store.showAssistant!==!1,n=e&&yv(),r=Tv(t),o=null;if(e)for(let a of r)Tm(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=za(a);if(!s)continue;let l=Tm(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&uc(a),d=c&&Rm(a),f=l==="assistant"&&c&&!Nm(a)&&(u||d||n||wv(a,!0)),m=hv(a,l,i.length,f);if(m&&m!==Ho){let b=xe.get(s),g=!!b&&(Fo(b)||Ga(b));(!b||g||!Lm(m)||Lm(b))&&m!==b&&xe.set(s,m)}let p=f&&m===Ho?Ho:xe.get(s)||m;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return i}function kv(t){let e=new Map;for(let n of t)if(e.set(n.id,n),!!n.el)for(let r of Lv(n.el))e.set(r,n);return e}function Cv(t,e){if(e)return e.text&&e.text!==Ho&&xe.set(t.id,e.text),{...e,id:t.id};let n=xe.get(t.id)||(t.alias?xe.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message"}}function Av(t,e){let n=yr.store.showAssistant!==!1,r=kv(e),o=new Set,i=[];for(let s of t){if(s.role==="assistant"&&!n)continue;let l=r.get(s.id)||(s.alias?r.get(s.alias):void 0),c=Cv(s,l);c.el&&o.add(c.el),i.push(c)}for(let s=0;s<e.length;s++){let l=e[s];if(!l.el||o.has(l.el))continue;let c=i.length;for(let u=s-1;u>=0;u--){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f+1;break}}if(c===i.length)for(let u=s+1;u<e.length;u++){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f;break}}i.splice(c,0,l),o.add(l.el)}let a=-1;for(let s=0;s<i.length;s++)i[s].role==="assistant"&&(a=s);for(let s=0;s<i.length;s++)i[s].live&&s!==a&&(i[s].live=!1);return i}function Hv(){let t=xr();if(!t||t===document.body)return[];let e=Mv(t),n=R(),r=n?jr(n):[],o=r.length?Av(r,e):e;return Sv(o),o}function Pm(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Ua(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function dc(t){return t===window?window.innerHeight:t.clientHeight}function Iv(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(ev)}catch{return!1}}function Om(){Io!==void 0&&(clearTimeout(Io),Io=void 0),Ro?.classList.remove("bloom-bn-flash"),Ro=null}function Bm(t){Om(),t.classList.add("bloom-bn-flash"),Ro=t,Io=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Ro===t&&(Ro=null),Io=void 0},800)}function ja(t){if(!F.length)return;let e=Math.max(0,Math.min(t,F.length-1));_a=e,$o?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),vr?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),Da&&(Da.textContent=`${e+1} / ${F.length}`)}function Dm(t){if($a)return;let e=vr?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function rc(t){let e=F[t];if(!e)return;let n=e.el?.isConnected?e.el:_m(e.id);if(!n){Pv(t);return}e.el=n,Bo=t,Do=Date.now()+Ql,ja(t),Dm(t);let r=we??Ua(n),i=Math.abs(n.getBoundingClientRect().top-Pm())>km*dc(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),yr.store.jumpEffect!=="none"&&Bm(n)}function _m(t){let e=xr();if(!e||e===document.body||!t)return null;let n=[t],r=R(),i=(r?jr(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"], [data-chatgpt-search-message-ids~="${c}"]`)}catch{}if(!s||_o(s))continue;let l=s.closest(Cm);return l instanceof HTMLElement?l:s}return null}function fc(){if(we)return we;let t=xr();return t?Ua(t):window}function Rv(t){let e=fc(),n=dc(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function Nv(t,e){let n=fc();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function Pv(t){let e=++nc,n=F[t];if(!n)return;Bo=t,Do=Date.now()+wm+Ql,ja(t),Dm(t);let r=-1;for(let l=0;l<F.length;l++)F[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+wm,a=0,s=-1;for(;Date.now()<i;){if(e!==nc||!Nt)return;let l=_m(n.id);if(l){n.el=l,Do=Date.now()+Ql;let d=we??Ua(l),m=Math.abs(l.getBoundingClientRect().top-Pm())>km*dc(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),yr.store.jumpEffect!=="none"&&Bm(l),It();return}let c=fc(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&Nv(o,u))break;Rv(o),await new Promise(d=>setTimeout(d,Ny))}}function mc(){if(!Nt||!F.length)return;if(Date.now()<Do&&Bo>=0){ja(Bo);return}let t=window.innerHeight*Py,e=0;for(let n=0;n<F.length;n++){let r=F[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}ja(e)}function Ov(t){let e=Ua(t);if(we===e&&Po)return;Po?.(),we=e;let n=e===window?document:e,r=()=>{mc(),pc()};n.addEventListener("scroll",r,{passive:!0}),Po=()=>n.removeEventListener("scroll",r)}function Bv(t){Hn?.disconnect(),Hn=null;let e=we instanceof HTMLElement?we:null;Hn=new IntersectionObserver(()=>mc(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&Hn.observe(n.el)}function Dv(){if(!document.body)return null;let t=Ze;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Mm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{$a=!0}),n.addEventListener("pointerleave",()=>{$a=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Ze=t,$o=e,vr=i,Da=o,t}function qm(){let t=Ze,e=xr();if(!t||!e||!e.isConnected||F.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=rv(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Zy,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function pc(){!Nt||ve||(ve=requestAnimationFrame(()=>{ve=0,Nt&&qm()}))}function _v(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function qv(t){let e=$o,n=vr;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Em),e.classList.toggle("bloom-bn-fit",t.length>Em),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=_v(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),rc(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?Oy:By;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),rc(o)}),n.appendChild(a)}))}function $v(t){$o?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=vr?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Fv(){let t=R();return t===qa?!1:(qa=t,xe.clear(),Oo.clear(),F=[],In="",_a=0,Bo=-1,Do=0,Ee&&t&&(se.add(t),Ee=!1),!0)}function jv(t){let e=yr.store.showAssistant!==!1?"1":"0";return`${qa}|${e}|${t.map(n=>n.id).join(",")}`}function oc(){if(!Nt)return;Fv();let t=Hv(),e=xr();if(!e||t.length<1){F=t,In="",Ze&&(Ze.hidden=!0),Hn?.disconnect(),ic();return}Dv();let n=jv(t);n!==In?(F=t,In=n,qv(t),Ov(e),Bv(t)):(F=t,$v(t)),qm(),mc(),ic()}function It(){if(Nt){if(document.hidden){Rt&&(cancelAnimationFrame(Rt),Rt=0),oc();return}Rt||(Rt=requestAnimationFrame(()=>{Rt=0,Nt&&oc()}))}}function ic(){let t=xr();if(!(An&&ec===t&&t?.isConnected)){if(An?.disconnect(),No?.disconnect(),ec=t,!t||t===document.body){An=null;return}An=new MutationObserver(()=>It()),An.observe(t,{childList:!0,subtree:!0}),No=new ResizeObserver(()=>pc()),No.observe(t)}}function zv(t){if(Nt){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===R())&&It();return}if(t.type==="post-start"){vv(),hr=!1,t.conversationId?(Ee=!1,se.add(t.conversationId)):Ee=!0,It();return}if(t.type==="post-end"){if(Ee=!1,t.conversationId)se.delete(t.conversationId);else{let e=R();e&&se.delete(e)}It()}}}function Gv(t){if(!Nt||!F.length||Ze?.hidden||t.altKey||t.ctrlKey||t.metaKey||Iv(t.target))return;let e=-1;if(t.key==="ArrowDown")e=_a+1;else if(t.key==="ArrowUp")e=_a-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=F.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),rc(Math.max(0,Math.min(e,F.length-1)))}function Uv(){nc++,Om(),Hn?.disconnect(),Hn=null,An?.disconnect(),An=null,ec=null,No?.disconnect(),No=null,Po?.(),Po=null,we=null,$a=!1,Ze?.remove(),Ze=null,$o=null,vr=null,Da=null}var $m=w({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Yl,cleanupSelectors:[`#${Mm}`],settings:yr,start(){Nt=!0,qa=R(),M(Yl,xm),Pa=new AbortController;let{signal:t}=Pa;window.addEventListener("keydown",Gv,{signal:t}),window.addEventListener("popstate",It,{signal:t}),window.visualViewport?.addEventListener("resize",pc,{signal:t}),document.addEventListener("visibilitychange",()=>{Nt&&(Rt&&(cancelAnimationFrame(Rt),Rt=0),ve&&(cancelAnimationFrame(ve),ve=0),oc())},{signal:t}),Zl=St(zv),Xl=ft({onTick(){if(z()){It();return}hr&&!jo()&&(hr=!1),It()},onFall(e){Im(e.conversationId),It()},onContext(e,n){if(!Y(n,e)){xe.clear(),Oo.clear(),In="",Ee=!1;let r=R();for(let o of[...se])o!==r&&se.delete(o);hr=!0}It()}}),ic(),It(),Ry.debug("navigator started")},stop(){Nt=!1,Rt&&cancelAnimationFrame(Rt),Rt=0,ve&&cancelAnimationFrame(ve),ve=0,Pa?.abort(),Pa=null,Xl?.(),Xl=null,Zl?.(),Zl=null,se.clear(),Ee=!1,hr=!1,Ba=0,Uv(),xe.clear(),Oo.clear(),F=[],In="",L(Yl)},onSettingsChange(){In="",It()}});var Fm=`.bloom-ts {
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
`;function jm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function zm(t){try{return new Date(t).toISOString()}catch{return""}}var Km=new k("MessageTimestamps"),Gm="messageTimestamps",Wa="bloom-ts",Um=1500,Wv="#thread-bottom-container, #thread-bottom, #prompt-textarea, #mobile-composer-prompt, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer'], textarea[name='prompt']",Er=C({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),wr=new Map,On=!1,Pt=0,Je=null,bc=null,gc=null,Ka=null,zo=null,Go=!1,Nn=!1;function Wm(){return Ii()}function yc(){let t=Er.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Vm(){let t={...yc()};for(let[n,r]of wr)t[n]=r;let e=Object.keys(t);if(e.length>Um){let n=e.slice(e.length-Um),r={};for(let o of n)r[o]=t[o];Er.store.stamps=r;return}Er.store.stamps=t}var Vv=eu(Vm,500);function Ym(t,e){!t||!e||wr.get(t)===e||(wr.set(t,e),Vv(),Pn())}function Yv(t){return t?wr.get(t)??yc()[t]??wi(t)??null:null}function Xv(t){On&&t.type==="message-time"&&Ym(t.messageId,t.createTime)}function Zv(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Jv(){let t=Wm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll(qu))n.closest(Wv)||e.push(n)}catch{}return e}function Qv(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function hc(){if(!On)return;let t=Er.store.hideOwnMessages===!0,e=Er.store.showDate!==!1,n=V();Nn&&!z()&&(Nn=!1),Nn&&(n?Go=!1:Nn=!1);let r=Nn?!1:n,o=Jv();Je?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||Ri(i),l=Zv(i),c=i.querySelector(`:scope > .${Wa}`);if(t&&l==="user"){c?.remove();return}if(Qv(i)){c?.remove();return}let u=Yv(s);if(!u&&s&&(r||Go)&&a>=o.length-2&&(u=Date.now(),Ym(s,u)),!u){c?.remove();return}let d=jm(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Wa,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=zm(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){Km.debug("paint failed",i)}Go=r,Xm()}function Pn(){if(On){if(document.hidden){Pt&&(cancelAnimationFrame(Pt),Pt=0),hc();return}Pt||(Pt=requestAnimationFrame(()=>{Pt=0,On&&hc()}))}}function Xm(){let t=Wm();if(!(Je&&bc===t&&t?.isConnected)){if(Je?.disconnect(),bc=t,!t||t===document.body){Je=null;return}Je=new MutationObserver(()=>Pn()),Je.observe(t,{childList:!0,subtree:!0})}}var Zm=w({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Wa}`],settings:Er,start(){On=!0,M(Gm,Fm);let t=yc();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&wr.set(e,n);gc=St(Xv),Ka?.(),Ka=ft({onTick:Pn,onFall:Pn,onContext(e,n){Y(n,e)||(Nn=!0,Go=!1),Pn()}}),zo?.abort(),zo=new AbortController,document.addEventListener("visibilitychange",()=>{On&&(Pt&&(cancelAnimationFrame(Pt),Pt=0),hc())},{signal:zo.signal}),Xm(),Pn(),Km.debug("timestamp watch started")},stop(){On=!1,Pt&&cancelAnimationFrame(Pt),Pt=0,zo?.abort(),zo=null,Je?.disconnect(),Je=null,bc=null,Ka?.(),Ka=null,gc?.(),gc=null,Nn=!1,Go=!1,Vm(),wr.clear(),document.querySelectorAll(`.${Wa}`).forEach(t=>t.remove()),L(Gm)},onSettingsChange:Pn});var vc="streamerMode",tx="filter:blur(6px)!important;transition:filter .2s ease",ex="filter:none!important",Sr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','[data-app-navigation-rail] button[aria-haspopup="menu"]',"[data-bloom-profile-chip]"],Tr=["#stage-slideover-sidebar","#stage-popover-sidebar","nav","#stage-sidebar-tiny-bar","[data-app-navigation-rail]","[data-app-action-sidebar-scroll]"];function Ot(t,e){return t.map(n=>`${n} ${e}`)}var Bn=C({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Lr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${tx}}${e?`${r}{${ex}}`:""}`}function Jm(){let t=[];if(Bn.store.conversations!==!1&&(t.push(Lr([...Ot(Tr,'a[href^="/c/"]'),...Ot(Tr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Bn.store.projects!==!1&&(t.push(Lr([...Ot(Tr,'a[href*="/project"]'),...Ot(Tr,'a[href*="/g/g-p-"]'),...Ot(Tr,'[data-testid="project-name"]'),...Ot(Tr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Bn.store.headerTitle!==!1&&t.push(Lr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Bn.store.accountAvatar!==!1&&t.push(Lr([...Ot(Sr,"img"),...Ot(Sr,'[class*="avatar"]'),...Ot(Sr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Bn.store.accountName!==!1&&t.push(Lr([...Ot(Sr,".min-w-0 > .truncate"),...Ot(Sr,".min-w-0.flex-1 .truncate")],!1)),Bn.store.accountEmail!==!1&&t.push(Lr([...Ot(Sr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *,textarea[name="prompt"],#mobile-composer-prompt{filter:none!important}'),!t.length){L(vc);return}M(vc,t.join(`
`))}var Qm=w({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Bn,start:Jm,onSettingsChange:Jm,stop(){L(vc)}});var tp=`.bloom-gc-panel {
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
}`;var rx=new k("GreetingCustomizer"),Mr="greetingCustomizer",ep="greetingCustomizerUi",Uo=100,Ec=30,ox=120,ix=1e3,ax=50,sx=40,lx=["#page-header","nav","#stage-slideover-sidebar","#stage-popover-sidebar","#stage-sidebar-tiny-bar","[data-app-navigation-rail]","[data-app-action-sidebar-scroll]","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]','textarea[name="prompt"]',"#mobile-composer-prompt"].join(", "),Ko=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ja=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function cx(t){return!!t?.closest(lx)}function ip(t){return!!(cx(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Qo(t){try{for(let e of document.querySelectorAll(t))if(!ip(e))return e}catch{}return null}function xc(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Qo(e))return e;return t}var ap=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],ot=C({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Lx},greetings:{type:0,description:"Greeting texts",hidden:!0,default:ap},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),le=!1,Ar=!1,_n=null,Ya,Wo,kr,Vo,Xa=0,Va=null,Cr=null,Yo=null,Xo=null,Zo=null,Za=null;function Te(){let t=location.pathname||"/";return t==="/"||t===""}function Dn(){let t=ot.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):ap.slice()}function Jo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function np(t){ot.store.greetings=t.slice(0,Ec)}function ti(){let t=String(ot.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function ux(){return ot.store.order==="random"?"random":"sequential"}function dx(){return at(Number(ot.store.intervalSec??10),1,3600)*1e3}function fx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function mx(){return!!Qo(Ja)}function Qa(){return!!(Qo(Ja)||Qo(Ko))}function px(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=mx()?xc(Ja):Qo(Ko)?xc(Ko):xc(Ja),i=e?`${Ko}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function gx(t,e){if(t<=0)return 0;if(t===1)return Number(ot.plain.index)!==0&&(ot.store.index=0),Number(ot.plain.lastRandom)!==0&&(ot.store.lastRandom=0),0;let n=Number(ot.plain.index),r=Number(ot.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(ux()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return ot.store.index=s,ot.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return ot.store.index=i,i}function Se(t){if(!le)return;if(!Te()){L(Mr);return}let e=Dn().map(Jo).filter(Boolean);if(!e.length){L(Mr);return}let n=gx(e.length,t),r=e[n]??e[0],o=ti()==="manual"&&e.length>1;M(Mr,px(fx(r),o)),Za?.()}function wc(){Ya!==void 0&&(clearInterval(Ya),Ya=void 0)}function Sc(){wc(),!(!le||!Te())&&ti()==="interval"&&(Dn().filter(Boolean).length<=1||(Ya=setInterval(()=>Se(!0),dx())))}function Tc(){Vo!==void 0&&(clearTimeout(Vo),Vo=void 0),Xa=0}function rp(){if(Tc(),!le||!Te())return;Xa=sx;let t=()=>{if(Vo=void 0,!(!le||!Te())){if(Qa()){ti()==="refresh"&&!Ar?(Ar=!0,Se(!0)):Se(!1),Sc();return}Xa-=1,Xa>0&&(Vo=setTimeout(t,ax))}};t()}function Lc(){if(_n===!0){Qa()?Se(!1):rp();return}_n=!0,Ar=!1,ti()==="refresh"?(Ar=!0,Se(!0)):Se(!1),Sc(),Qa()||rp()}function Mc(){_n=!1,Ar=!1,wc(),Tc(),L(Mr)}function ts(){kr===void 0&&(kr=window.setTimeout(()=>{kr=void 0,le&&(Te()?Lc():_n!==!1&&Mc())},ox))}function bx(){Cr||(Cr=history.pushState.bind(history),Yo=history.replaceState.bind(history),Xo=function(...e){let n=Cr(...e);return ts(),n},Zo=function(...e){let n=Yo(...e);return ts(),n},history.pushState=Xo,history.replaceState=Zo)}function hx(){Xo&&history.pushState===Xo&&Cr&&(history.pushState=Cr),Zo&&history.replaceState===Zo&&Yo&&(history.replaceState=Yo),Cr=null,Yo=null,Xo=null,Zo=null}function yx(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(ts)}function vx(t){if(!le||!Te()||ti()!=="manual"||Dn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Ko);if(!n||ip(n))return;let r=window.getSelection?.();r&&String(r).trim()||Se(!0)}function xx(){Wo===void 0&&(Wo=setInterval(()=>{if(!le)return;let t=Te();if(t!==(_n===!0)){t?Lc():Mc();return}t&&Qa()&&Se(!1)},ix))}function Ex(){Wo!==void 0&&(clearInterval(Wo),Wo=void 0)}function op(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var wx="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Sx="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Tx(t,e){let n=Jo(t);return n?n.length>Uo?`Keep it to ${Uo} characters.`:Dn().length+(e?1:0)>Ec?`At most ${Ec} greetings.`:null:"Enter a greeting."}function Lx(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=Dn(),s=Number(ot.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Uo,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let g=l.querySelector(".bloom-gc-count");g&&(g.textContent=`${Jo(e).length}/${Uo}`);let E=l.querySelector(".bloom-gc-error");E&&(E.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Jo(e).length}/${Uo}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let g=document.createElement("button");g.type="button",g.className="bloom-gc-btn",g.textContent="Cancel",g.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(g)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let g=n<0,E=Tx(e,g);if(E){r=E,i();return}let h=Jo(e),x=Dn().slice();n>=0&&n<x.length?x[n]=h:x.push(h),np(x),n=-1,e="",r="",i()}),m.appendChild(p),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let g=document.createElement("p");g.className="bloom-gc-empty",g.textContent="No greetings. The official heading stays.",t.appendChild(g);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((g,E)=>{let h=document.createElement("div");h.className="bloom-gc-item",E===s&&(h.dataset.active="true");let x=document.createElement("button");x.type="button",x.className=`bloom-gc-body${o===E?"":" bloom-gc-clamp"}`,x.textContent=g,x.addEventListener("click",()=>{o=o===E?-1:E,i()});let gt=document.createElement("div");gt.className="bloom-gc-item-actions";let bt=op("Edit",wx);bt.addEventListener("click",()=>{n=E,e=g,r="",i()});let J=op("Delete",Sx);J.addEventListener("click",()=>{let O=Dn().filter((ut,Et)=>Et!==E);np(O),n===E?(n=-1,e=""):n>E&&(n-=1),i()}),gt.append(bt,J),h.append(x,gt),b.appendChild(h)}),t.appendChild(b)};return Za=i,i(),()=>{Za===i&&(Za=null),t.replaceChildren()}}var sp=w({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:ep,settings:ot,start(){le=!0,M(ep,tp),bx(),Va=new AbortController;let{signal:t}=Va;window.addEventListener("popstate",ts,{signal:t}),document.addEventListener("click",yx,{capture:!0,signal:t}),document.addEventListener("click",vx,{signal:t}),xx(),_n=null,Te()?Lc():Mc(),rx.debug("started")},stop(){le=!1,Va?.abort(),Va=null,kr!==void 0&&(clearTimeout(kr),kr=void 0),wc(),Tc(),Ex(),hx(),L(Mr),Ar=!1,_n=null},onSettingsChange(){le&&(Te()?(Se(!1),Sc()):L(Mr))}});function Mx(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function es(t){try{return await createImageBitmap(t)}catch{return null}}async function kx(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function ns(t){if(t.startsWith("data:")){let e=Mx(t);if(e){let n=await es(e);if(n)return n}return kx(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?es(await e.blob()):null}catch{return null}}var os="data-bloom-csi-slot",Cx="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Ax=/\bsize-(?:[6-9]|10)\b/,Hx=/\b(?:h|w)-(?:[6-9]|10)\b/,Ix=/^(plus|pro|free|team|go|business|enterprise)$/i,Rx=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function rs(t){return t.getAttribute("class")||""}function cp(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Ax.test(t)?!0:Hx.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Nx(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!up(e)}function up(t){return Ix.test(String(t??"").replace(/\s+/g,""))}function Bt(t){return!!t?.closest(Cx)}function is(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function ei(t){let e=rs(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:up(t.textContent||"")}function as(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function ni(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function dp(t){if(Bt(t)||as(t)||ni(t)||ei(t)||is(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function fp(t){return Bt(t)||as(t)||ni(t)||ei(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Nx(t.textContent||"")}function mp(t){return Bt(t)||ni(t)||is(t)||ei(t)?!1:cp(rs(t))||fp(t)?!0:dp(t)}function lp(t){return!(Bt(t)||is(t)||ni(t)||ei(t)||as(t))}function qn(t,e){let n=as(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(ni(n)||is(n)||ei(n));)Bt(n)||(r=n),n=n.parentElement;return r}function Px(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Bt(e))continue;if(/\bflex\b/.test(rs(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!lp(o))){if(mp(o)||cp(rs(o)))return qn(o,t)??o;r.push(o)}if(r.length===1)return qn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&lp(r))return qn(r,t)??r}}return null}function Ox(t){let e=t.querySelectorAll(Rx);for(let n of e)if(mp(n))return qn(n,t)??n;return null}function Bx(t){for(let e of t.querySelectorAll("span, div, p, i"))if(fp(e))return qn(e,t)??e;return null}function Dx(t){for(let e of t.querySelectorAll("*"))if(dp(e))return qn(e,t)??e;return null}function pp(t,e){if(Bt(t))return null;if(e&&!Bt(e)&&t.contains(e)){let n=qn(e,t);if(n)return n}return Px(t)??Ox(t)??Bx(t)??Dx(t)}function gp(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Hr="data-bloom-csi",ss="data-bloom-csi-orig",$n=new Set,bp=null;function Cc(t){bp=t}function hp(t){return`url(${JSON.stringify(t)})`}function ls(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Ac(t,e,n){let r=hp(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function yp(t,e=os){let n=hp(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function _x(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Ir(t){t.removeEventListener("error",kc);let e=t.getAttribute(ss);t.removeAttribute(Hr),t.removeAttribute(ss),e&&t.getAttribute("src")!==e&&(t.src=e)}function kc(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&$n.add(n),Ir(e),bp?.()}function vp(t,e){if(!e||$n.has(e)){Ir(t);return}_x(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Hr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(ss)&&t.setAttribute(ss,n);t.setAttribute(Hr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",kc),t.addEventListener("error",kc),n!==e&&(t.src=e)}var xp=`/*
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
`;var Ep=new k("CustomSidebarIdentity"),wp="customSidebarIdentityUi",Lp="customSidebarIdentity",$x="bloom-csi-face",Fx="bloom-csi-name",Rr=os,Nc="data-bloom-profile-chip",jx=1024,cs=256,Mp=24,kp=64,Cp=40,Pc=1,Oc=4,ri=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]','[data-app-navigation-rail] button[aria-haspopup="menu"]',"[data-bloom-profile-chip]"],Hc=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=C({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:aE},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Mp,max:kp,default:Cp},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function jn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function zx(){return String(T.store.displayName??"").trim()}function fs(t,e,n,r,o){let i=at(n,Pc,Oc),a=Math.min(t,e)/i,s=at(r,a/2,Math.max(a/2,t-a/2)),l=at(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Gx(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Bc(t){let e=Math.min(1,jx/Math.max(t.width,t.height));return Gx(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Ux(t,e,n,r){let{side:o,x:i,y:a}=fs(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=cs,s.height=cs;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,cs,cs);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Kx(t){let e=await es(t);if(!e)return null;let n=Bc(e);return e.close(),n}async function _c(t,e,n,r){let o=await ns(t);if(!o)return null;let i=Ux(o,e,n,r);return o.close(),i}function qc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function Sp(){T.store.avatarUrl="",T.store.avatarSource="",qc()}var Tp=0;async function Dc(t){let e=++Tp;qc(),T.store.avatarSource=t;let n=await _c(t,.5,.5,1);return e!==Tp?!1:(n&&(T.store.avatarUrl=n),!!n)}function oi(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Ic(t){let e=oi(t);if(!e)return!1;let n=await Kx(e);return n?Dc(n):!1}var Dt=!1,Nr=!1,Pr=0,ms=0,us=null,Qe=new Map,Or=null,Le=null,ps=null,ce=null,gs=null;function bs(t){let e=String(t??"").trim();if(!e||$n.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function Ap(){return bs(T.store.avatarUrl)??bs(T.store.avatarSource)}var ds=!1,Rc=new Set;function Hp(){let t=bs(T.store.avatarSource);if(!t?.startsWith("data:image/")||bs(T.store.avatarUrl)?.startsWith("data:image/")||ds||Rc.has(t))return;ds=!0;let e=jn(T.store.cropX,.5),n=jn(T.store.cropY,.5),r=jn(T.store.cropZoom,1);_c(t,e,n,r).then(o=>{if(ds=!1,!o){Rc.add(t);return}Dt&&(T.store.avatarUrl=o,hs())}).catch(()=>{ds=!1,Rc.add(t)})}function Fn(t,e){return t.map(n=>`${n} ${e}`)}function Wx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Vx(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Wx(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Ip(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Bt(n)||n.closest(".min-w-0")||e.push(n);return e}function Yx(t){let e=Ip(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function $c(){let t=[],e=o=>{if(!o||Bt(o)||!o.isConnected)return;let i=on(o);Bt(i)||t.includes(i)||t.push(i)};e(an());let n=He();if(n){let o=n.querySelector("button[aria-haspopup='menu'] .min-w-0, button[aria-haspopup='menu'] .truncate, button[aria-haspopup='menu'] img");e(o)}let r=Yn();if(r&&!t.some(o=>r.contains(o)||o.contains(r))){let o=r.querySelector(ri.join(","))??r.querySelector("button, a, [role='button']")??r;e(o)}return t}function Rp(t,e){t.setAttribute(Nc,"");let n=Yx(t);if(n)vp(n,e);else for(let o of Ip(t))Ir(o);let r=pp(t,n);for(let o of t.querySelectorAll(`[${Rr}]`))o!==r&&o.removeAttribute(Rr);r&&r.setAttribute(Rr,"")}function Xx(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Zx(t,e){let n=Xx(t);n&&Rp(n,e)}function Jx(){for(let t of document.querySelectorAll(`img[${Hr}]`))Ir(t);for(let t of document.querySelectorAll(`[${Rr}]`))t.removeAttribute(Rr);for(let t of document.querySelectorAll(`[${Nc}]`))t.removeAttribute(Nc)}function Qx(){let t=at(Math.round(jn(T.store.avatarSize,Cp)),Mp,kp),e=Ap(),n=zx(),r=T.store.applyToMenu!==!1,o=[],i=[...Fn(ri,"img"),"#stage-sidebar-tiny-bar img","[data-app-navigation-rail] img"];r&&i.push(...Fn(Hc,"> :first-child img"));let a=[...Fn(ri,".min-w-0 > .truncate"),...Fn(ri,".min-w-0.flex-1 .truncate")];r&&a.push(...Fn(Hc,"> :first-child .truncate"));let s=gp(Rr);o.push(ls([...s.flatMap(l=>Fn(ri,l))].join(","),t)),o.push(ls(s.map(l=>`#stage-sidebar-tiny-bar ${l}, [data-app-navigation-rail] ${l}`).join(","),32)),r&&o.push(ls(s.flatMap(l=>Fn(Hc,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Ac(i.join(","),e,t)),o.push(Ac("#stage-sidebar-tiny-bar img, [data-app-navigation-rail] img",e,32)),o.push(yp(e))),n&&o.push(Vx(a,n)),M(Lp,o.join(""))}function tE(){let t=Ap(),e=$c();for(let n of e)Rp(n,t);if(T.store.applyToMenu!==!1){let n=Xn();n&&Zx(n,t)}for(let n of document.querySelectorAll(`img[${Hr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Ir(n)}function hs(){if(!(!Dt||Nr)){Nr=!0;for(let t of Qe.values())t.disconnect();Le?.disconnect(),ce?.disconnect();try{Qx(),tE()}finally{Nr=!1,Fc(),oE(),Or?.isConnected&&Np(Or),Hp()}}}function ii(){!Dt||Pr||(Pr=requestAnimationFrame(()=>{Pr=0,hs()}))}function eE(){Nr||!Dt||ii()}function nE(t){if(Qe.has(t))return;let e=new MutationObserver(eE);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Qe.set(t,e)}function rE(t){Qe.get(t)?.disconnect(),Qe.delete(t)}function Fc(){let t=new Set;for(let n of $c())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Yn();e&&t.add(e);for(let n of[...Qe.keys()])(!t.has(n)||!n.isConnected)&&rE(n);for(let n of t)n.isConnected&&nE(n)}function oE(){let t=Oi();if(!t){ce?.disconnect(),ce=null,ps=null;return}if(ps===t&&ce){ce.observe(t,{childList:!0});return}ce?.disconnect(),ps=t,ce=new MutationObserver(()=>{Nr||!Dt||(Fc(),ii())}),ce.observe(t,{childList:!0})}function Np(t){Or===t&&Le||(Le?.disconnect(),Or=t,Le=new MutationObserver(()=>{if(!t.isConnected){Le?.disconnect(),Le=null,Or=null;return}Nr||!Dt||ii()}),Le.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Pp(t){if(!Dt||T.store.applyToMenu===!1)return;let e=Xn();if(e){Np(e),ii();return}t<=0||requestAnimationFrame(()=>Pp(t-1))}function Op(t){Dt&&(hs(),!($c().length||t<=0)&&(ms=requestAnimationFrame(()=>Op(t-1))))}function iE(t){Dt&&T.store.applyToMenu!==!1&&(!Bi(t)&&!Xn()||Pp(10))}function aE(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,m.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let g=document.createElement("input");g.type="range",g.className="bloom-csi-zoom",g.min=String(Pc),g.max=String(Oc),g.step="0.05",g.setAttribute("aria-label","Zoom");let E=document.createElement("span");E.className="bloom-csi-zoom-val";let h=document.createElement("button");h.type="button",h.className="bloom-csi-btn",h.textContent="Reset",b.append(g,E,h);let x=document.createElement("p");x.className="bloom-csi-hint",x.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,b,x),t.append(u,d,f);function gt(){let v=String(T.store.avatarSource??""),I=String(T.store.avatarUrl??"");return v.startsWith("data:image/")?v:I.startsWith("data:image/")?I:""}function bt(v,I,y){if(!a)return i.x=v,i.y=I,i.zoom=at(y,Pc,Oc),i;let A=fs(a.w,a.h,y,v*a.w,I*a.h);return i.x=A.x/a.w,i.y=A.y/a.h,i.zoom=A.z,i}function J(){g.value=String(i.zoom),E.textContent=`${Math.round(i.zoom*100)}%`;let v=a?fs(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;v&&a&&(p.style.width=`${a.w/v.side*100}%`,p.style.height=`${a.h/v.side*100}%`,p.style.left=`${(.5-v.x/v.side)*100}%`,p.style.top=`${(.5-v.y/v.side)*100}%`)}function O(v=!1){let I=gt(),y=String(T.store.avatarUrl??"").trim(),A=!!I;s.hidden=!y&&!I,(I||y)&&(s.src=I||y),document.activeElement!==l&&(l.value=A?"":y),l.placeholder=A?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!I,d.hidden=!(e&&/^https?:\/\//.test(y)&&!I),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",I&&(v&&(i.x=jn(T.store.cropX,.5),i.y=jn(T.store.cropY,.5),i.zoom=jn(T.store.cropZoom,1)),p.getAttribute("src")!==I&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},bt(i.x,i.y,i.zoom),J()},p.src=I),J())}function ut(v,I,y,A=!1){bt(v,I,y),J();let ht=gt(),wt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,ht&&_c(ht,i.x,i.y,i.zoom).then(H=>{H&&(T.store.avatarUrl=H)})};r&&clearTimeout(r),A?wt():r=setTimeout(wt,80)}function Et(v){T.store.avatarUrl=v;let I=v.trim();if(n&&clearTimeout(n),!I){T.store.avatarSource="",qc(),e=!1,O(!0);return}if(I.startsWith("data:image/")){e=!1,n=setTimeout(()=>{ns(I).then(y=>{if(!y)return;let A=Bc(y);y.close(),A&&Dc(A).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(I)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{ns(I).then(y=>{if(!y){e=!0,O(!0);return}let A=Bc(y);y.close(),A?(e=!1,Dc(A).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",v=>{oi(v.clipboardData)&&(v.preventDefault(),e=!1,Ic(v.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",v=>{oi(v.dataTransfer)&&v.preventDefault()}),u.addEventListener("drop",v=>{oi(v.dataTransfer)&&(v.preventDefault(),e=!1,Ic(v.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>Et(l.value)),l.addEventListener("paste",v=>{oi(v.clipboardData)&&(v.preventDefault(),e=!1,Ic(v.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",v=>{gt()&&!l.value&&(v.key==="Backspace"||v.key==="Delete")&&(Sp(),e=!1,O(!0))}),c.addEventListener("click",()=>{Sp(),e=!1,O(!0)}),m.addEventListener("pointerdown",v=>{v.button===0&&(m.setPointerCapture(v.pointerId),o.on=!0,o.px=v.clientX,o.py=v.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",v=>{if(!o.on||!a)return;let I=m.clientWidth;if(!I)return;let{side:y}=fs(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);bt(o.x-(v.clientX-o.px)*(y/I)/a.w,o.y-(v.clientY-o.py)*(y/I)/a.h,i.zoom),J()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,ut(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",v=>{v.preventDefault(),ut(i.x,i.y,i.zoom*(v.deltaY<0?1.08:1/1.08))},{passive:!1}),g.addEventListener("input",()=>ut(i.x,i.y,Number(g.value))),g.addEventListener("change",()=>ut(i.x,i.y,Number(g.value),!0)),h.addEventListener("click",()=>ut(.5,.5,1,!0));let ai=()=>O(!1);return gs=ai,O(!0),()=>{gs===ai&&(gs=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Bp=w({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:wp,cleanupSelectors:[`.${$x}`,`.${Fx}`],settings:T,start(){Dt=!0,$n.clear(),Cc(ii),M(wp,xp),us=new AbortController,document.addEventListener("click",iE,{signal:us.signal}),Op(40),Hp(),Ep.debug("started")},onSettingsChange(){$n.clear(),gs?.(),Dt&&(Fc(),hs())},stop(){Dt=!1,us?.abort(),us=null,Pr&&cancelAnimationFrame(Pr),Pr=0,ms&&cancelAnimationFrame(ms),ms=0;for(let t of Qe.values())t.disconnect();Qe.clear(),Le?.disconnect(),Le=null,Or=null,ce?.disconnect(),ce=null,ps=null,Jx(),L(Lp),Cc(null),$n.clear(),Ep.debug("stopped")}});var Br=new k("Bloom"),Dp=!1,sE=Date.now(),lE=[dd,Xd,af,cf,pf,vf,Rf,Pf,Df,rm,um,hm,vm,$m,Zm,Qm,sp,Bp];function ys(t){return new Promise(e=>setTimeout(e,t))}function cE(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function uE(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var qp=8e3,_p=300,dE=250;async function fE(){if(rn())return await ys(_p),!0;for(;Date.now()-sE<qp;)if(await ys(dE),rn())return await ys(_p),!0;return rn()||qs()}function jc(){return Hi()}async function mE(){if(jc())return!0;let t=Date.now()+qp;for(;Date.now()<t;)if(await ys(100),jc())return!0;return jc()}function pE(){try{GM_registerMenuCommand?.("Bloom++ settings",ud)}catch{}}function gE(){Ti(()=>{_r("HostShell"),Br.info("host shell",Tt)}),Li(()=>{Br.info("idle ready",Tt)}),Mi(()=>{Es(),_r("HostReady"),Br.info("chrome ready",Tt)})}async function zc(){await ou()}async function Gc(){if(Dp)return;Dp=!0,Mu();for(let n of lE)try{du(n),Ou(n)}catch(r){Br.error("register failed",n.name,r)}_r("Init"),pE(),gE();let t=()=>_r("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await cE(),Es(),Br.info("styles ready",Tt),await uE(),mE().then(n=>{n&&ki()}),!await fE()){Br.warn("late islands not detected; starting default plugins",Tt),Vn(),Ci();return}await Nu()}var $p=typeof unsafeWindow<"u"?unsafeWindow:window,bE=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||bE){let t=$p.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Tt);try{Object.defineProperty($p,"Bloom",{value:Uc,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}zc().then(()=>Gc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
