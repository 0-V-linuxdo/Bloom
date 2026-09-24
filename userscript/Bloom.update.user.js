// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.99
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

/* Bloom++ [20260924] v1.4.99. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var yp=Object.defineProperty;var vp=(t,e)=>{for(var n in e)yp(t,n,{get:e[n],enumerable:!0})};var Ac={};vp(Ac,{REPO_URL:()=>Eu,Settings:()=>F,VERSION:()=>Et,contextKeyFromUrl:()=>ce,conversationChain:()=>_r,conversationTitle:()=>Fn,conversationToken:()=>Rt,currentConversationId:()=>A,ensureConversationChain:()=>fe,hasDraftText:()=>Vt,hasErrorToast:()=>Xt,hasLateIslands:()=>Je,init:()=>Mc,initSettings:()=>Cc,isDocumentInteractive:()=>Su,isStreaming:()=>W,isUserDraftEmpty:()=>Ie,messageCreateTime:()=>mi,plugins:()=>le,requestChromeReady:()=>vi,requestIdleReady:()=>zn,requestShellReady:()=>yi,setEditorText:()=>pe,subscribeHarvest:()=>xt,watchStreamingEdge:()=>ct,whenChromeReady:()=>hi,whenIdleReady:()=>bi,whenShellReady:()=>gi});var Te=new Map,Jo=!1;function xp(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ic(){return document.head??null}function On(){let t=xp();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Ep()}function as(t,e){if(!Jo)return;let n=Ic();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),On();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,On();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,On()}function k(t,e){let n=Te.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Te.set(t,n)),Jo&&as(t,n)}function ss(){if(!Ic())return!1;Jo=!0;for(let[e,n]of Te)as(e,n);return On(),!0}function Nc(t){let e=Te.get(t);e&&(e.disabled=!1,Jo&&as(t,e))}function Rc(t){let e=Te.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),On())}function L(t){let e=Te.get(t);e&&(e.el?.remove(),Te.delete(t),On())}function Ep(){return Array.from(Te.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var C=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function w(t){return t}var ls=new Map;function Bn(t,e){let n=ls.get(t);return n||(n=new Set,ls.set(t,n)),n.add(e),()=>n.delete(e)}function Xe(t,e){let n=ls.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var wp="bloompp";function Pc(){return new Promise((t,e)=>{let n=indexedDB.open(wp,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Oc(t){try{let e=await Pc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Bc(t,e){try{let n=await Pc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function rt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function ot(t,e,n){return Math.min(n,Math.max(e,t))}function Dc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function _c(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function qc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Qo=new C("SettingsStore"),Le="BloomSettings",Sp=100;function ti(t){return t!=null&&typeof t.then=="function"}function Tp(t){if(t==null||ti(t))return null;if(rt(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(rt(e)&&!ti(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return rt(n)&&!ti(n)?n:null}return null}catch{return null}}function ni(t){let e=Tp(t);if(!e)return null;let n=e.plugins;return!rt(n)||ti(n)||Object.keys(n).length===0?null:e}function us(t){return rt(t)?t:null}function cs(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:rt(t)?Object.keys(t).length===0:!1}function Lp(t){return cs(t)?0:Array.isArray(t)?12+Math.min(t.length,40):rt(t)?12+Math.min(Object.keys(t).length,40):3}function Ze(t){if(!t)return-1;let e=t.plugins;if(!rt(e))return-1;let n=0;for(let r of Object.values(e)){let o=us(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=Lp(a))}return n}function $c(t){let e=t.plugins;if(!rt(e))return 0;let n=0;for(let r of Object.values(e))us(r)?.enabled===!0&&n++;return n}function Fc(t){let e=t.map((i,a)=>({bag:i,index:a,score:Ze(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=$c(a.bag)-$c(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!rt(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(rt(a))for(let[s,l]of Object.entries(a)){let c=us(l);if(!c)continue;if(!rt(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}cs(u[d])&&!cs(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return rt(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Ze(n)}}var ei=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return rt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Qo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Sp))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Le,this.plain)}catch{try{GM_setValue(Le,e)}catch(n){Qo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Le,e)}catch{}Bc(Le,e).catch(n=>Qo.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){Qo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Dc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var kp=new C("Settings"),Cp={plugins:{}},F=new ei(structuredClone(Cp)),Mp=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Ap(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function M(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?ke(n):{}},get plain(){let n=e.pluginName;return n?F.plain.plugins[n]??{}:{}}};return e}async function Hp(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function zc(){let t=ni(await Hp(Le)),e=ni(await Oc(Le)),n=null;try{n=ni(localStorage.getItem(Le))}catch{n=null}let r=Fc([t,e,n]);if(r){let o=r.bag.plugins;o&&(F.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);kp.info("Loaded settings from",i,"richness",r.score,"gm",Ze(t),"idb",Ze(e),"ls",Ze(n))}F.releasePersist(),r&&(r.index!==0||r.score>Ze(t))&&F.persistLoadedBag()}function ke(t){return F.plain.plugins[t]||(F.plain.plugins[t]={}),F.store.plugins[t]}function jc(t,e){e&&(e.pluginName=t,ke(t),F.setDefaultGetter(Mp(t),n=>{if(n!=="enabled")return Ap(e.def,n)}))}function Gc(){return ke("Settings")}function ri(){return Gc().pinnedPlugins??[]}function Uc(t){return ri().includes(t)}function Kc(t){let e=ri(),n=e.includes(t);return F.store.plugins.Settings={...F.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function oi(){return Gc().starredPlugins??[]}function Vc(t){return oi().includes(t)}function Wc(t){let e=oi(),n=e.includes(t);return F.store.plugins.Settings={...F.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var ii=new C("PluginManager"),le={},Or=new Set;function Yc(t){if(le[t.name]){ii.warn("Duplicate plugin",t.name);return}le[t.name]=t,jc(t.name,t.settings)}function Dn(t){let e=le[t];if(!e)return!1;if(e.required)return!0;let n=F.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Xc(t){let e=le[t];if(!e||e.required)return;let n=!Dn(t);ke(t),F.store.plugins[t].enabled=n,n?Zc(e):Ip(e),Xe("pluginToggle",{name:t,enabled:n})}function Zc(t,e=!1){if(!Or.has(t.name)&&Dn(t.name))try{t.managedStyle&&Nc(t.managedStyle),t.start?.(),Or.add(t.name),t.settings&&F.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Or.has(t.name)&&t.onSettingsChange?.()}),e||ii.debug("Started",t.name)}catch(n){ii.error("Failed to start",t.name,n)}}function Ip(t){if(Or.has(t.name)){try{t.stop?.()}catch(e){ii.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Rc(t.managedStyle),L(t.managedStyle)),Or.delete(t.name)}}function Br(t){for(let e of Object.values(le))(e.startAt??"DOMContentLoaded")===t&&Zc(e)}var Jc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Rt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function ce(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ue(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Jc)?.[1]??""}catch{return t.match(Jc)?.[1]??""}}function A(){return ue(location.pathname)}var tu=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i;function si(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function ms(t,e){return e!=="GET"||si(t)?!1:tu.test(t)}function li(t){return t.match(tu)?.[1]??""}function eu(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return eu(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function jt(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function Qc(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function fs(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=Qc(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?Qc(n.text):""}function ai(t){let e=jt(t.metadata);if(e?.is_visually_hidden_from_conversation===!0||e?.is_user_system_message===!0||e?.user_context_message===!0)return"";let r=jt(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function Np(t){return(jt(t.author)?.role??t.role)==="user"}function nu(t){if(!ai(t))return!1;let n=typeof t.recipient=="string"?t.recipient.toLowerCase():"";if(n&&n!=="all")return!1;let r=jt(t.content),o=(typeof r?.content_type=="string"?r.content_type:"").toLowerCase();if(/thought|reasoning|execution_output|system_error|tether_|computer_|sonic_/.test(o)||o==="code")return!1;let i=typeof t.channel=="string"?t.channel.toLowerCase():"";return!(i&&i!=="final"&&t.end_turn!==!0)}function ru(t){let e=[];for(let n of t){let r=e[e.length-1];if(r&&r.role==="assistant"&&n.role==="assistant"){let o=n.alias||r.alias||(r.id!==n.id?r.id:void 0);e[e.length-1]={id:n.id,role:"assistant",text:n.text||r.text,...o&&o!==n.id?{alias:o}:{}};continue}e.push(n)}return e}function Rp(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?eu(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function Pp(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null;if(l&&nu(l)){let c=ai(l),u=typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:fs(l)};u!==o&&(d.alias=o),n.push(d)}}else l&&Np(l)&&n.push({id:"",role:"user",text:""});o=typeof s.parent=="string"?s.parent:null}return n.reverse(),ru(n).filter(a=>a.id)}function ds(t){return t.length<=480?t:t.slice(t.length-480)}function ps(t,e){if(!e.length)return t;if(!t.length)return ds(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(b=>b.id)),m=n.has(e[e.length-1].id),p=e.filter(b=>!f.has(b.id));return ds(m?[...p,...t]:[...t,...p])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return ds([...s,...l,...u,...d])}function Op(t){let e=[],n=new Set;for(let r of t){let o=jt(r);if(!o)continue;let i=jt(o.message)??o;if(!nu(i))continue;let a=ai(i)||ai(o);if(!a)continue;let s=typeof i.id=="string"&&i.id||typeof o.message_id=="string"&&o.message_id||typeof o.id=="string"&&o.id||"";if(!s||n.has(s))continue;n.add(s);let l={id:s,role:a,text:fs(i)||fs(o)},c=typeof o.id=="string"&&o.id&&o.id!==s?o.id:"";c&&(l.alias=c),e.push(l)}return ru(e)}function Bp(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=Rp(t,n);return r?Pp(n,r):[]}function gs(t){let e=jt(t);if(!e)return[];let n=!e.mapping&&jt(e.conversation)?e.conversation:e,r=Bp(n);if(r.length)return r;let o=Array.isArray(n.turns)?n.turns:Array.isArray(n.messages)?n.messages:Array.isArray(n.items)?n.items:[];return o.length?Op(o):[]}function ou(t,e=""){let n=jt(t);if(!n)return e;let r=!n.mapping&&jt(n.conversation)?n.conversation:n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function iu(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var ys=new C("Harvest"),Dp=1500,_p=200,qp=8,ci=new Set,ui=new Map,di=new Map,_n=new Map,au=[],su=new Set,bs=new Set,qn=null,fi=null,Dr=null,Pt=0,uu=!1;function du(){return typeof unsafeWindow<"u"?unsafeWindow:window}function $p(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Fp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var zp=/"action"\s*:\s*"(next|continue|variant)"/i;function jp(t,e,n){return!(e!=="POST"||si(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!zp.test(n))}function fu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Gp(t){return typeof t=="string"?fu(t):""}function hs(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return hs(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function vs(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function lu(t,e,n){!t||!e||di.get(t)!==e&&(di.set(t,e),vs(di,Dp),de({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Up(t,e){let n=e.trim();!t||!n||ui.get(t)!==n&&(ui.set(t,n),vs(ui,_p),de({type:"conversation-meta",conversationId:t,title:n}))}function mu(t,e){let n=ou(e,t);if(!n)return;let r=gs(e);if(!r.length)return;let o=_n.get(n)??[],i=ps(o,r);iu(o,i)||(_n.set(n,i),vs(_n,qp),de({type:"conversation-chain",conversationId:n}))}function $n(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)$n(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Up(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=hs(l.create_time??l.createTime??l.created_at);c&&u&&lu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=hs(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&lu(a,s,o),r.mapping&&typeof r.mapping=="object")$n(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&$n(l,o,n+1)}function cu(t,e){if(t)try{$n(JSON.parse(t),e)}catch{}}function de(t){for(let e of Array.from(ci))try{e(t)}catch{}}async function Kp(t,e,n){if(n===Pt)try{let r=await t.json();if(n!==Pt)return;$n(r,e),mu(e,r)}catch{}}async function Vp(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Pt&&de({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Pt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=fu(c);m&&(o=m,de({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let p=m.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||cu(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Pt&&cu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Pt&&de({type:"post-end",conversationId:o,error:i})}function Wp(t,e,n){let r=$p(e),o=Fp(e,n),i=ms(r,o),a=jp(r,o,n?.body),s=Pt,l="";return a&&(l=Gp(n?.body)||li(r)||ue(r)||A(),de({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Pt||!i&&!a)return c;try{let u=c.clone();i?Kp(u,li(r)||A(),s):Vp(u,l,!c.ok,s)}catch{a&&de({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Pt&&de({type:"post-end",conversationId:l,error:!0}),c})}function xs(){if(qn)return;let t=du();Dr=t,qn=t.fetch.bind(t);let e=(n,r)=>Wp(qn,n,r);fi=e,t.fetch=e,ys.debug("conversation fetch harvest hooked")}function Yp(){Pt+=1,!(!qn||!Dr)&&(fi&&Dr.fetch===fi&&(Dr.fetch=qn),qn=null,fi=null,Dr=null,ys.debug("conversation fetch harvest unhooked"))}function Xp(){Pt+=1,!uu&&Yp()}function pu(){uu=!0,xs()}function Zp(t,e){return e==="singular"?`/backend-api/conversation/${t}`:`/backend-api/conversations/${t}`}function fe(t){if(!t||su.has(t)||bs.has(t))return;bs.add(t),xs();let e=du(),n=_n.get(t)?.length??0;(async()=>{try{for(let r of["singular","plural"])try{let o=await e.fetch(Zp(t,r),{method:"GET",credentials:"include",headers:{Accept:"application/json"}});if(!o.ok)continue;try{let a=await o.json();$n(a,t),mu(t,a)}catch{}let i=_n.get(t)?.length??0;if(i>0){su.add(t),i!==n&&ys.debug("conversation chain backfill",t,i);return}}catch{}}finally{bs.delete(t)}})()}function xt(t){return ci.add(t),xs(),()=>{ci.delete(t),ci.size===0&&Xp()}}function Fn(t){return t?ui.get(t)??"":""}function mi(t){return t?di.get(t)??null:null}function _r(t){return t?_n.get(t)??au:au}var qr=!1,pi=!1,Es=!1,bu=[],hu=[],yu=[];function ws(t){let e=t.splice(0);for(let n of e)n()}function $r(){qr||(qr=!0,ws(bu))}function Ss(){pi||(pi=!0,qr||$r(),ws(hu))}function vu(){Es||(Es=!0,qr||$r(),pi||Ss(),ws(yu))}function gi(t){qr?t():bu.push(t)}function bi(t){pi?t():hu.push(t)}function hi(t){Es?t():yu.push(t)}function yi(){$r()}function zn(){$r(),Ss()}function vi(){vu()}function gu(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function xu(){await gu(4e3),$r(),await gu(4e3),Ss(),vu()}var S={p:"0-V-linuxdo"},Et="[20260924] v1.4.99",Eu="https://github.com/0-V-linuxdo/Bloom";var Jp={BetterNavigator:1790257468e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790252301e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function wu(t){let e=Jp[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function Qp(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function tg(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ts(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Je(){return Ts()?Qp()||tg():!1}function Su(){return Je()}var eg=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Tu=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),ng=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),rg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Gn(t){return t.id==="bloom-root"||!!t.closest(rg)}function Lu(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function xi(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Ls(t){if(!(t instanceof HTMLElement)||!t.isConnected||Gn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&xi(e)?!1:t.getClientRects().length>0}function jn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function og(){let t=[];for(let e of document.querySelectorAll(eg))!(e instanceof HTMLElement)||!e.isConnected||Gn(e)||t.push(e);return t}function Ei(t){if(!t.isConnected||Gn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Qe(){return og().filter(Ei)[0]??null}function Un(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Gn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function ks(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Gn(n)&&!jn(n)&&n.parentElement&&!jn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!jn(r)&&!Gn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!jn(r.parentElement))return r}return e}function Kn(){let t=document.querySelectorAll(Tu);for(let n of t)if(Ls(n)&&!xi(n)&&Lu(n))return n;let e=document.querySelectorAll(ng);for(let n of e){if(!Ls(n)||!Lu(n)||xi(n))continue;let r=n.querySelector(Tu);return Ls(r)&&!xi(r)?r:n}return null}function wi(){let t=Qe();if(t){let e=ks(t),n=e.parentElement;if(n&&!jn(n))return n;if(!jn(e))return e}return Un()}function Si(t){let e=Qe();return e?t.composedPath().includes(e):!1}var Ms=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],ig={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function ag(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function sg(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Cs(t){let e=ag(t);return e?sg(e)>.55?"light":"dark":null}function lg(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Cs(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Cs(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Cs(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Ti(t){return t==="auto"?lg():t}function cg(t){try{let e=getComputedStyle(document.documentElement);for(let n of Ms){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Li(t,e,n){let r=ig[e];if(n){cg(t);for(let o of Ms)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Ms)t.style.setProperty(o,r[o])}function ku(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var As=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var dg="bloom-root",Ut="bloom-rail-item",Hi="bloom-account-item",en="bloom-sidebar-panel",Yr="bloom-plugin-dialog",Di="bloom-plugin-layer",Ii="bloom-settings-css",fg=2e3,Au=null,mg=null,He=!1,Rs=[],ki=null,Ni=null,Me=null,Mi=null,me=null,Kr=null,Fr,Vn=0,Vr=0,zr=0,jr=null,Gr=null,Ri=null,Hu=null,Ur=null,Hs=[],Pi=!1,pg=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],gg=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],bg=new Set(["chat","ui","privacy"]),hg=10080*60*1e3,_i="",Wr="all",Gt="all";function qi(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Iu(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function yg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function vg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function xg(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Eg(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var wg={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Sg(t){return t.icon||wg[t.name]||qi()}function Is(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Li(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Nu(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Oi(){let t="auto",e=Ti(t);Is(Au,e,!0);let n=document.getElementById(en);n instanceof HTMLElement&&Is(n,e,!0);let r=document.getElementById(Yr);r instanceof HTMLElement&&Is(r,e,!0);let o=document.getElementById(Ut);o instanceof HTMLElement&&Nu(o),Xe("schemeChange",{scheme:e,pref:t})}function Ru(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Pu(){if(k("settings",As),document.getElementById(Ii)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Ii,t.textContent=As,document.head.appendChild(t)}function Tg(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Lg(){for(let t of Rs)t();Rs=[]}function Ou(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function kg(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Bs(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Cg(t){return Bs(t).length>0}function Ai(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Mg(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=kg(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Ag(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Mg(e,n));let i=ke(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Rs.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Ai(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Ai(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Ou(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Ai(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Cu(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Hg(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=ke(t.name);for(let[n,r]of Bs(t)){if(n==="enabled"||r.type===5)continue;let o=Ai(r);o!==void 0&&(e[n]=o)}Du(t)}function Bu(t){t.key==="Escape"&&(!document.getElementById(Di)&&!document.getElementById(Yr)||(t.stopPropagation(),Wn()))}function Ig(){Pi||(document.addEventListener("keydown",Bu),Pi=!0)}function Ng(){Pi&&(document.removeEventListener("keydown",Bu),Pi=!1)}function Wn(){Lg(),Ng(),document.getElementById(Di)?.remove(),document.getElementById(Yr)?.remove()}function Du(t){if(Wn(),!document.body)return;let e=document.createElement("div");e.id=Di,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Ae),e.addEventListener("pointerup",Ae),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Wn()});let n=document.createElement("div");n.id=Yr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ae),n.addEventListener("pointerup",Ae),n.addEventListener("click",Ae);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Iu(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Wn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Cu("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Cu("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Bs(t);if(c.length)for(let[u,d]of c){let f=Ag(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Hg(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Ig(),Oi()}function Rg(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Sg(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Vc(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=xg(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let g=Wc(t.name);Xe("pluginStar",{name:t.name,starred:g})}),s.appendChild(c),!t.required){let b=Uc(t.name),g=document.createElement("button");g.type="button",g.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,g.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),g.innerHTML=Eg(b),g.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();let h=Kc(t.name);Xe("pluginPin",{name:t.name,pinned:h})}),s.appendChild(g)}if(Cg(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=vg(),b.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),Du(t)}),s.appendChild(b)}let u=Ou(t.name,Dn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{Xc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(p),e.append(n,f,m),e}function _u(){return Object.values(le).filter(t=>!t.hidden&&t.name!=="Settings")}function Pg(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<hg}function qu(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Pg(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>bg.has(r)):n.includes(e)}function Og(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Bg(){return _i.trim()?"No plugins match your search.":Gt==="favorites"?"No favorites yet. Star a plugin to see it here.":Gt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Dg(){let t=_u();return gg.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>qu(n,e.id)))}function _g(){if(Ur){Ur.replaceChildren();for(let t of Dg()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Gt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Gt=t.id,tn()}),Ur.appendChild(e)}}}function qg(){let t=_u();if(Gt==="favorites"){let e=new Set(oi());t=t.filter(n=>e.has(n.name))}else Gt!=="all"&&(t=t.filter(e=>qu(e,Gt)));return Wr==="enabled"&&(t=t.filter(e=>Dn(e.name))),Wr==="disabled"&&(t=t.filter(e=>!Dn(e.name))),t}function tn(){if(!jr)return;_g();let t=qg();Ri&&(Ri.placeholder=`Search ${t.length} plugins...`);let e=t,n=_i.trim().toLowerCase();if(n&&(e=e.filter(r=>Og(r).includes(n))),Gt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Gt!=="favorites"){let r=ri();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}jr.replaceChildren();for(let r of e)jr.appendChild(Rg(r));Gr&&(Gr.hidden=e.length>0,Gr.textContent=Bg())}function Ae(t){t.stopPropagation()}function Ns(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ds(){document.getElementById(Ut)?.setAttribute("aria-expanded",He?"true":"false")}function $g(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function _s(){Wn(),_i="",Wr="all",Gt="all",document.getElementById(en)?.remove(),He=!1,Ds()}function Fg(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Ae),e.addEventListener("pointerup",Ae),e.addEventListener("click",Ae);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=qi();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=yg();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Iu(),d.addEventListener("click",_s),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{_i=p.value,tn()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let h of pg){let x=document.createElement("option");x.value=h.value,x.textContent=h.label,b.appendChild(x)}b.value=Wr,b.addEventListener("change",()=>{Wr=b.value,tn()}),m.append(p,b),n.appendChild(m);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let E=document.createElement("p");return E.className="bloom-tab-empty",E.hidden=!0,n.appendChild(E),e.append(d,n),jr=g,Gr=E,Ri=p,Hu=b,Ur=f,tn(),e}function zg(t){t.classList.add("bloom-rail-dock")}function jg(){let t=document.getElementById(Ut);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Ei(t)?t:null}function Gg(){if(document.getElementById(en)?.remove(),!document.body)return;let t=Fg(en);zg(t),document.body.appendChild(t),He=!0,Wn(),Oi(),Ds(),Xe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Et,dock:"center",rail:!!jg()})}function qs(){let t=document.getElementById(en);if(t instanceof HTMLElement&&t.isConnected&&$g(t)){_s();return}t?.remove(),Gg()}function Ug(){let t=document.createElement("button");return t.type="button",t.id=Ut,t.className="bloom-rail-item",t.setAttribute("aria-controls",en),t.setAttribute("aria-expanded",He?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${qi()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),qs()}),t}function Mu(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Kg(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Vg(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Ce(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function $u(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Kg(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Ce(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Ce(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Ce(n,"width",l),Ce(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Ce(t,"padding-left",u);let d=Vg(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),p=Math.round(f.left-m.right);p>=0&&p<=24&&Ce(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Ce(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Ce(t,"gap",Math.round(l))}Nu(t)}function Ps(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Wg(){if(Kr?.isConnected&&me){me.observe(Kr,{childList:!0});return}Os()}function Yg(t){if(Ps(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Xg(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){zr=0;return}zr+=1,Vr=Date.now()+Math.min(8e3,250*2**Math.min(zr,5))})}function Zg(){Vn||Date.now()<Vr||(Vn=requestAnimationFrame(()=>{Vn=0,!(Date.now()<Vr)&&(document.getElementById(Ut)?.isConnected||Bi())}))}function Bi(){if(!document.body)return;me?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Ut);t=n instanceof HTMLButtonElement?n:Ug();let r=Qe(),o=Un();if(r){let i=ks(r),a=i.parentElement;if(Ps(i)||a&&Ps(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Mu(t),$u(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Mu(t,!0)):t.isConnected&&!Ei(t)&&(t.remove(),t=null)}finally{Xg(t,e),Wg(),Ds()}}function Os(){let t=wi();!t||!Yg(t)||Kr===t&&me||(me?.disconnect(),Kr=t,me=new MutationObserver(()=>{document.getElementById(Ut)?.isConnected||Zg()}),me.observe(t,{childList:!0}))}function Jg(){Bi(),Os(),Fr===void 0&&(Fr=window.setInterval(()=>{let t=document.getElementById(Ut);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Vr&&Bi();else{zr=0;let e=Qe();e&&$u(t,e)}Os()},fg))}function Qg(){Fr!==void 0&&(clearInterval(Fr),Fr=void 0),Vn&&cancelAnimationFrame(Vn),Vn=0,Vr=0,zr=0,me?.disconnect(),me=null,Kr=null}function tb(t){Mi===t&&Me||(Me?.disconnect(),Mi=t,Me=new MutationObserver(()=>{if(!t.isConnected){Me?.disconnect(),Me=null,Mi=null;return}Fu(t)}),Me.observe(t,{childList:!0}))}function Fu(t){if(tb(t),t.querySelector(`#${Hi}`))return;let e=document.createElement("button");e.type="button",e.id=Hi,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${qi()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Ns),e.addEventListener("pointerup",Ns),e.addEventListener("click",n=>{Ns(n),qs()}),t.insertBefore(e,t.firstChild)}function Ci(){let t=Kn();return t?(Fu(t),!0):!1}function eb(t){Si(t)&&(queueMicrotask(Ci),requestAnimationFrame(()=>{Ci()}),window.setTimeout(Ci,60),window.setTimeout(Ci,180))}function nb(){Ni?.abort();let t=new AbortController;Ni=t,document.addEventListener("click",eb,{signal:t.signal})}function rb(){Ni?.abort(),Ni=null,Me?.disconnect(),Me=null,Mi=null}function zu(){zn(),Tg(()=>{Pu(),Ru(),Bi(),qs()})}var ju=w({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${dg}`,`#${Ut}`,`#${Hi}`,`#${en}`,`#${Di}`,`#${Yr}`,`#${Ii}`,"#bloom-menu-panel"],start(){Pu(),Ru(),Jg(),nb(),ki?.(),ki=ku(Oi),Oi(),Hs=[Bn("pluginToggle",()=>{He&&tn()}),Bn("pluginPin",()=>{He&&tn()}),Bn("pluginStar",()=>{He&&tn()})]},stop(){Qg(),rb(),ki?.(),ki=null;for(let t of Hs)t();Hs=[],_s(),document.getElementById(Ut)?.remove(),document.getElementById(Hi)?.remove(),document.getElementById(Ii)?.remove(),Au=null,mg=null,jr=null,Gr=null,Ri=null,Hu=null,Ur=null,He=!1}});var $i='form[data-type="unified-composer"], form.w-full[data-type]',Kt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Yn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Gu=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Uu=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),ob=/stop streaming|stop generating|停止生成|停止输出|停止响应/,ib='[contenteditable="false"], button, [role="button"]';function Ot(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function nn(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Ot(o)))return o;return null}function Ku(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function z(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Ku(t);return!!(ob.test(n)||/^stop$/i.test(n))}function Bt(){let e=Array.from(document.querySelectorAll($i)).find(Ot);if(e instanceof HTMLElement)return e;let n=nn(document,Kt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function it(){let t=Array.from(document.querySelectorAll(Kt));return t.find(Ot)??t[0]??null}function ab(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(ib);return!!n&&n!==e&&e.contains(n)}function $s(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&ab(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Vt(t){let e=t??it();return e?$s(e,e).replaceAll("\u200B","").trim().length>0:!1}function Ie(t){return!Vt(t)}function Fi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Vu(t){let e=Bt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Ot(n))&&t(n))return n;return null}function Ne(){let t=Bt(),e=nn(t,Yn)??nn(document,Yn);return e&&!z(e)?e:Vu(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!z(n);let o=Ku(n);return/^(send|send prompt|发送)$/i.test(o)&&!z(n)})}function rn(){let t=Bt(),e=nn(t,Gu,!0)??nn(document,Gu,!0);if(e)return e;let n=nn(t,Uu)??nn(document,Uu);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Ot(r)&&z(r))return r}return Vu(z)}function Wt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>$s(n,t)).join(`
`):$s(t,t)}function Fs(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function pe(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Fs(t,n)}var Yu=new C("Streaming");function to(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Ot(e))&&(z(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function sb(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Ot(t))}function lb(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Ot(t))}function cb(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Xt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function W(){if(rn()||to()||cb())return!0;let t=Ne();return t&&Ot(t)&&!z(t)?!1:!!(sb()||lb())}var ub=400,Wu=3,ln=new Set,Xr,Zr=null,zs=null,an=!1,on=0,Pe="",Oe="",Be=!1,Jr=!1,Qr=!1,Yt=!1,J=null,wt="",sn=!1;function j(){return Yt}function cn(){return Be}function Xn(){return wt}function js(){return A()||wt}function Xu(){return ce(Rt())}function zi(t,e){return{streaming:t,contextKey:e,conversationId:js()}}function Gs(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function db(t){return!t||t==="/"||t.startsWith("/g/")}function Y(t,e){if(!t||t===e)return!1;let n=ue(Gs(e)||e);return!n||!(t.endsWith("|draft")||db(Gs(t)))?!1:wt?n===wt:sn}function ji(){an=!1,on=0,Pe="",Be=!1,Jr=!1,Qr=!1,wt="",sn=!1}function fb(t){for(let e of Array.from(ln))try{e.onFall?.(t)}catch{}}function mb(t){for(let e of Array.from(ln))try{e.onRise?.(t)}catch{}}function Re(t){for(let e of Array.from(ln))try{e.onTick?.(t)}catch{}}function pb(t,e){for(let n of Array.from(ln))try{n.onContext?.(t,e)}catch{}}function gb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&z(n)&&(Be=!0)}function bb(t){if(t.type==="post-start"){let n=A();if(!t.conversationId){n||(sn=!0),(!n||n===wt)&&(Yt=!1,Be=!1);return}if(!(t.conversationId===n||t.conversationId===wt)&&!(!n&&sn))return;wt=t.conversationId,sn=!1,Yt=!1,Be=!1;return}if(t.type!=="post-end"||!an&&!J)return;let e=A();t.conversationId&&!(e?t.conversationId===e:t.conversationId===wt)||(Qr=!0,t.error&&(Jr=!0,J&&(J.error=!0)))}function hb(){let t=Xu(),e=W();if(Oe&&t&&Oe!==t){let o=Oe;if(!Y(o,t))J=null,ji(),Yt=e;else{let i=ue(Gs(t));if(i&&!wt&&(wt=i,sn=!1),Pe===o&&(Pe=t),J&&J.contextKey===o){J.contextKey=t;let a=js();a&&(J.conversationId=a)}Yt=!1}if(Oe=t,pb(t,o),Yt){Re(zi(!1,t));return}}else t&&(Oe=t);if(Yt){if(e){Re(zi(!1,t));return}Yt=!1}if(J)if(e||J.contextKey!==t)J=null;else{let o=J;J=null,ji(),fb(o),Re(zi(!1,t));return}let n=zi(e,t);if(e){let o=!an;o&&(Be=!1,Jr=!1,Qr=!1),an=!0,on=0,Pe=t,o&&mb(n),Re(n);return}if(!an){Re(n);return}if(on+=1,Qr&&(on=Math.max(on,Wu)),on<Wu){Re(n);return}if(!(!!Pe&&Pe===t)){ji(),Re(n);return}J={contextKey:Pe||t,conversationId:js(),userStopped:Be,error:Jr||Xt()},Re(n)}function yb(){Xr===void 0&&(an=W(),Oe=Xu(),Pe=an?Oe:"",on=0,Be=!1,Jr=!1,Qr=!1,Yt=!1,J=null,wt="",sn=!1,Zr?.abort(),Zr=new AbortController,document.addEventListener("click",gb,{capture:!0,signal:Zr.signal}),zs=xt(bb),Xr=setInterval(hb,ub),Yu.debug("watchStreamingEdge started"))}function vb(){ln.size||(Xr!==void 0&&(clearInterval(Xr),Xr=void 0),Zr?.abort(),Zr=null,zs?.(),zs=null,ji(),Oe="",Yt=!1,J=null,Yu.debug("watchStreamingEdge stopped"))}function ct(t){let e=typeof t=="function"?{onFall:t}:t;return ln.add(e),yb(),()=>{ln.delete(e),vb()}}var Zu="bloom-host-icon",eo="data-bloom-host-rel",Us="not all",Ks=0,Ju=0,xb=400;function Qu(t){Ks+=1;try{t()}finally{Ks-=1}}function Gi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function De(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function td(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Eb(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function wb(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Ju<xb||(Ju=n,t.appendChild(e))}function Sb(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Gi(n)&&(n.getAttribute(eo)||n.setAttribute(eo,n.rel),n.media!==Us&&(n.media=Us),n.rel!==Zu&&(n.rel=Zu))}function Tb(t){for(let e of t.querySelectorAll(`link[${eo}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(eo);n&&(e.rel=n),e.removeAttribute(eo),e.media===Us&&e.removeAttribute("media")}}function ed(t,e){let{head:n}=document;!n||!e||Qu(()=>{Sb(n,t);let r=td(t),{type:o,sizes:i}=Eb(e);r?wb(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function nd(t,e){let{head:n}=document;n&&Qu(()=>{td(t)?.remove(),Tb(n)})}function rd(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(Ks)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Gi(c.target)&&(a=!0,De(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Gi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Gi(u)&&u.id!==t&&(a=!0,De(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Lb=["original","badge","dot","hole","bg"],ad=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],sd={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ui="#FCFCFC",kb="#111111",od="#111111",Cb="#ffffff",Mb="#212121",Ab="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Hb={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Ki=32,id=64;function ld(t){return typeof t=="string"&&Lb.includes(t)}function Ib(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Vi(t){let e=document.createElement("canvas");e.width=Ki,e.height=Ki;let n=e.getContext("2d");return n?(n.scale(Ki/id,Ki/id),t(n),e.toDataURL("image/png")):""}function Nb(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function Wi(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Ab);n&&(t.strokeStyle=kb,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Rb(t,e,n){let r=sd[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=od,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=od,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Cb,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function no(t,e){if(t==="original")return e==="wait"?Vi(r=>Wi(r,Ui)):Ib(Hb[e]);let n=e==="wait"?void 0:sd[e];return Vi(t==="hole"?r=>Wi(r,n??Ui):t==="bg"?r=>{r.fillStyle=n??Mb,Nb(r,0,0,64,64,14),r.fill(),Wi(r,Ui,!1)}:r=>{Wi(r,Ui),e!=="wait"&&Rb(r,e,t==="dot"?"dot":"badge")})}function cd(t){return{wait:no(t,"wait"),rotate:no(t,"rotate"),done:no(t,"done"),ready:no(t,"ready"),error:no(t,"error")}}var Pb=new C("ChatStateFavicons"),dn="bloom-chat-state-favicon",pd=["input","beforeinput","cut","paste","compositionend"],gd=M({style:{type:3,description:"Favicon overlay",options:ad}}),Zt="",Ys={wait:"",rotate:"",done:"",ready:"",error:""},ro="wait",ut=!1,Q=!1,D=null,gt="",St="",mn=!0,Zi=!1,Zn=null,Tt=0,Yi=null,Xi=null,un=null,Ws=null,Jn=null,Dt=!1,ud=new WeakSet;function Ob(){let t=gd.store.style;return ld(t)?t:"bg"}function bd(){let e=document.querySelector(`link[rel~="icon"]:not(#${dn}), link[data-bloom-host-rel]:not(#${dn})`)?.href;return De(e)?e:De(Zt)?Zt:""}function Bb(){let t=document.getElementById(dn);return t instanceof HTMLLinkElement?t:null}function Db(){if(!De(Zt)){let t=bd();t&&(Zt=t)}return De(Zt)?Zt:Ys.wait}function hd(t){return t==="wait"?Db():Ys[t]}function yd(){ed(dn,hd(ro))}function q(t){let e=hd(t);if(ro===t){let n=Bb();if(n&&n.getAttribute("href")===e)return}ro=t,yd()}function dd(){Ys=cd(Ob()),q(ro)}function Xs(){return ce(Rt())}function Zs(t,e){!t||!e||t===e||(D===t&&(D=e),gt===t&&(gt=e),St===t&&(St=e))}function _b(){let t=Xs();if(!(W()||ut||Q))return gt="",t;if(gt&&t&&gt!==t)if(Y(gt,t))Zs(gt,t),gt=t;else return gt="",t;else!gt&&t&&(gt=t);return gt||t}function fd(t){return!D||!t?!1:D===t?!0:Y(D,t)}function vd(){ut=!1,Q=!1,D=null,gt=""}function xd(t){St=t,vd(),mn=!1,Zi=!0,q("wait")}function Vs(t){return!t&&mn}function qb(){if(!Dt)return;let t=Xs();if(St&&t&&St!==t&&!Y(St,t)){xd(t);return}St&&t&&Y(St,t)&&Zs(St,t),t&&(St=t);let e=W(),n=e&&!j();if(Zi){if(j()){q("wait");return}Zi=!1}if(j()){q("wait");return}let r=_b(),o=Ie();if(cn()&&!e){ut=!1,Q=!1,D=null,q(o?"wait":Vs(o)?"ready":"wait");return}if(Xt()&&!e&&ut){q("error"),ut=!1,Q=!1,D=null;return}if(n){ut||(mn=!1),ut=!0,Q=!1,D=r,q("rotate");return}if(ut)if(!fd(t))ut=!1,Q=!1,D=null;else if(Q){ut=!1,Q=!0,D=t||r,q("done");return}else{q("rotate");return}if(Q)if(D&&t&&!fd(t))Q=!1,D=null;else if(o){D=r||D,q("done");return}else if(Vs(o)){Q=!1,q("ready");return}else{Q=!1,q("wait");return}D=null,o?q("wait"):Vs(o)?q("ready"):q("wait")}function fn(){Dt&&(Ld(),wd(),Sd(),qb())}function Ed(){if(Jn){for(let t of pd)Jn.removeEventListener(t,Td,!0);Jn=null}}function wd(){let t=Bt(),e=t&&t!==document.body?t:null;if(!(Jn===e&&e?.isConnected)&&(Ed(),!!e)){Jn=e;for(let n of pd)Jn.addEventListener(n,Td,{capture:!0,passive:!0})}}function Sd(){let t=Bt();if(!(un&&Ws===t&&t.isConnected)){if(un?.disconnect(),Ws=t,!t||t===document.body){un=null;return}un=new MutationObserver(()=>Ji()),un.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Ji(){if(Dt){if(document.hidden){Tt&&(cancelAnimationFrame(Tt),Tt=0),fn();return}Tt||(Tt=requestAnimationFrame(()=>{Tt=0,Dt&&fn()}))}}function Td(){Vt()&&(mn=!0),Ji()}function md(){Vt()&&(mn=!0),Ji()}function $b(){Dt&&(Tt&&(cancelAnimationFrame(Tt),Tt=0),fn())}function Fb(){Dt&&(mn=!1,fn())}function zb(t){if(!Dt)return;if(t.userStopped){ut=!1,Q=!1,D=null,q("wait");return}if(t.error){ut=!1,Q=!1,D=null,q("error");return}let e=Xs();if(t.contextKey&&e&&t.contextKey!==e&&!Y(t.contextKey,e)){ut=!1,Q=!1,D=null,q("wait");return}ut=!1,Q=!0,D=e||t.contextKey,q("done")}function jb(){Dt&&fn()}function Gb(t,e){if(Dt){if(Y(e,t)){Zs(e,t),St=t,fn();return}xd(t)}}function Ld(){let t=it();!t||ud.has(t)||(ud.add(t),t.addEventListener("input",md,{capture:!0,passive:!0}),t.addEventListener("compositionend",md,{capture:!0,passive:!0}))}var kd=w({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:gd,startAt:"DOMContentLoaded",cleanupSelectors:[`#${dn}`],start(){Dt=!0,Zt=bd()||Zt,dd(),Xi?.disconnect(),Xi=rd(dn,t=>{De(t)&&(Zt=t),yd()}),Zn?.abort(),Zn=new AbortController,window.addEventListener("popstate",Ji,{signal:Zn.signal}),document.addEventListener("visibilitychange",$b,{signal:Zn.signal}),Ld(),wd(),Sd(),Yi?.(),Yi=ct({onRise:Fb,onFall:zb,onTick:jb,onContext:Gb}),fn(),Pb.debug("favicon watch started")},stop(){Dt=!1,Tt&&cancelAnimationFrame(Tt),Tt=0,Yi?.(),Yi=null,Zn?.abort(),Zn=null,Ed(),un?.disconnect(),un=null,Ws=null,Xi?.disconnect(),Xi=null,vd(),St="",mn=!0,Zi=!1,ro="wait",nd(dn,Zt)},onSettingsChange:dd});var Cd=`.bloom-ih-hud {
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
`;var xw=new C("InputHistory"),Js=/\u200B/g,Md=10,Ad=500,Hd=100,Kb=8,Vb=120,Wb=2e3,Qi=10,ta=M({maxEntries:{type:4,description:"Max stored prompts",min:Md,max:Ad,default:Hd},history:{type:5,description:"Stored prompts",render:ch},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Qs=new Map,tt=0,tl="",Jt=!1,io=!1,rl=0,oo=null,el,ol=null,Id=!0;function _t(){let t=ta.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Nd(t){let e=ot(Number(ta.store.maxEntries??Hd),Md,Ad);return t.length>e?t.slice(t.length-e):t}function ea(t){ta.store.entries=Nd(t)}function Yb(t){return t.replaceAll(Js,"").replace(/\n$/,"").trim()}function nl(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Kt);return n instanceof HTMLElement?n:it()}function Xb(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Wt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(Js,"").trim().length===0,last:i.toString().replaceAll(Js,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Rd(t){clearTimeout(el),el=setTimeout(()=>{if(t!==rl)return;io=!1;let e=ol;e&&Fs(e,Id)},Vb)}function Pd(t,e,n){io=!0,ol=t,Id=n;let r=++rl;pe(t,e,n),Rd(r)}function Zb(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Qn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Jb(){document.querySelector(".bloom-ih-hud")?.remove()}function Qb(t,e){let n=Zb();n.textContent=t;let r=(e.closest("form")??Bt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Kb)}px`,n.classList.add("bloom-ih-hud-on")}function il(t){let e=Yb(t);if(!e)return;let n=Date.now(),r=Qs.get(e);if(r&&n-r<Wb)return;Qs.set(e,n);let o=_t().filter(i=>i!==e);o.push(e),ea(o),tt=_t().length,Jt=!1,Qn()}function th(t,e){let n=_t();if(!n.length&&t)return;tt>=n.length&&(tl=Wt(e),tt=n.length);let r=t?tt-1:tt+1;r<0||r>n.length||(tt=r,Jt=!0,Pd(e,r===n.length?tl:n[r],t),r<n.length?Qb(`${r+1} / ${n.length}`,e):Qn())}function eh(t){Jt=!1,Qn(),Pd(t,tl,!1),tt=_t().length}function nh(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=nl(t.target)??nl(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Jt&&!t.altKey&&!t.shiftKey){eh(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){il(Wt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=_t();if(!r){let i=Xb(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||tt<=0)||!n&&tt>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),th(n,e))}function rh(t){if(nl(t.target)){if(io){Rd(rl);return}Jt&&(Jt=!1,Qn(),tt=_t().length)}}function oh(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Kt);n instanceof HTMLElement&&il(Wt(n))}function ih(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Yn);if(!n||!(n instanceof HTMLElement)||z(n))return;let r=it();r&&il(Wt(r))}function ah(t){if(!(!Jt||io)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Jt=!1,Qn()}}function sh(){if(oo)return;oo=new AbortController;let{signal:t}=oo,e={capture:!0,signal:t};window.addEventListener("keydown",nh,e),window.addEventListener("input",rh,e),window.addEventListener("submit",oh,e),window.addEventListener("click",ih,e),window.addEventListener("pointerdown",ah,e)}function lh(t){let e=_t().slice();e.splice(t,1),ea(e),tt>e.length&&(tt=e.length)}function ch(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=_t().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Qi));n>=l&&(n=l-1);let c=s.slice(n*Qi,n*Qi+Qi);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((E,h)=>{let x=i.indexOf(E),ft=_t().length-1-x,mt=document.createElement("div");mt.className="bloom-ih-item";let Z=document.createElement("button");Z.type="button",Z.className=`bloom-ih-body${r===h?"":" bloom-ih-clamp"}`,Z.textContent=E,Z.addEventListener("click",()=>{r=r===h?-1:h,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let lt=document.createElement("button");lt.type="button",lt.title="Copy",lt.textContent="C",lt.addEventListener("click",()=>{_c(E)});let yt=document.createElement("button");yt.type="button",yt.title="Delete",yt.textContent="\xD7",yt.addEventListener("click",()=>{lh(ft),o()}),O.append(lt,yt),mt.append(Z,O),g.appendChild(mt)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(ea([]),tt=0,o())}),d.append(f,m,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Od=w({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:ta,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",Cd),tt=_t().length,Jt=!1,sh()},stop(){oo?.abort(),oo=null,Qn(),Jb(),Qs.clear(),clearTimeout(el),io=!1,ol=null,Jt=!1},onSettingsChange(){let t=_t(),e=Nd(t);e.length!==t.length&&ea(e),tt>e.length&&(tt=e.length)}});var al="noShareLink",uh=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],dh=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],sl=M({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Bd(t){return`${t.join(",")}{display:none!important}`}function Dd(){let t=[];if(sl.store.hideShareChat!==!1&&t.push(Bd(uh)),sl.store.hideShareProject!==!1&&t.push(Bd(dh)),!t.length){L(al);return}k(al,t.join(`
`))}var _d=w({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:sl,start:Dd,onSettingsChange:Dd,stop(){L(al)}});var Fd="noDictation",fh=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],mh=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],zd=M({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function qd(t){return`${t.join(",")}{display:none!important}`}function $d(){let t=[qd(fh)];zd.store.hideDictationSettings!==!1&&t.push(qd(mh)),k(Fd,t.join(`
`))}var jd=w({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:zd,start:$d,onSettingsChange:$d,stop(){L(Fd)}});var ll="noSidebarIdentity",tr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Kd=tr.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),Vd=tr.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),ph=[...Kd,...Vd],gh=[...Kd,...tr.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],bh=tr.map(t=>`${t} a[href^="mailto:"]`),hh=tr.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),yh=tr.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),ao=M({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Gd(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function vh(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function xh(){return`${yh.join(",")}{margin-block:auto!important}`}function Eh(){return`${hh.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Ud(){let t=ao.store.hideUsername!==!1,e=ao.store.hideEmail!==!1,n=t&&ao.store.enlargePlan!==!1,r=t&&ao.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(vh([...gh,...Vd])),o.push(xh())):o.push(Gd(ph))),e&&o.push(Gd(bh)),n&&o.push(Eh()),!o.length){L(ll);return}k(ll,o.join(`
`))}var Wd=w({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:ao,start:Ud,onSettingsChange:Ud,stop(){L(ll)}});var Yd=`#bloom-rt-host {
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
`;var Jd=new C("RecentTopics"),rr="bloom-rt-host",Qd="home",tf=/^\/c\/([a-z0-9_-]{8,})/i,Sh=/\/c\/([a-z0-9_-]{8,})/i,ef=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Th=new Set(["Backquote","IntlBackslash"]),Lh=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),kh=140,Ch=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),et=M({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Ch},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),na=null,ra=null,bt=!1,mo=!1,so=!1,Qt=0,pn="",er=null,lo=null,nr,cl=null,ul=null;function Mh(){let t=Number(et.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function co(){let t=et.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function fl(){let t=et.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function nf(){let t=et.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ml(){let t=et.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ia(t){let e=Mh();return t.length>e?t.slice(0,e):t}function te(t){return t===Qd}function uo(t,e=kh){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function pl(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(tf)?.[1]??""}catch{return t.match(Sh)?.[1]??""}}function gn(){let t=(location.pathname||"/").match(tf);if(t?.[1])return t[1];let n=Rt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Qd}function gl(t){if(te(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(pl(r.getAttribute("href")||"")!==t)continue;let o=uo(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return gn()===t&&e&&!/^ChatGPT$/i.test(e)?uo(e,80):""}function Ah(t){if(te(t))return"New chat";let e=fl()[t];if(e)return e;let n=Fn(t);return n||gl(t)||"Chat"}function Hh(t){return ml()[t]||""}function Ih(t){return nf()[t]||{}}function bl(t,e){if(!t||te(t)||!e||/^new chat$/i.test(e.trim()))return;let n=fl();n[t]!==e&&(n[t]=e,et.store.titles=n)}function Nh(t){t.type==="conversation-meta"&&(bl(t.conversationId,t.title),bt&&or())}function Rh(t,e){if(!t||te(t)||!e)return;let n=ml();n[t]!==e&&(n[t]=e,et.store.projects=n)}function Ph(t,e){if(!t||te(t)||!e.user&&!e.assistant)return;let n=nf(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,et.store.previews=n)}function hl(t){if(!t||te(t)&&et.store.includeHome===!1)return;let e=co().filter(n=>n!==t);e.unshift(t),et.store.visits=ia(e)}function aa(){let t=et.store.includeHome!==!1;return ia(co().filter(n=>t||!te(n))).map(n=>({id:n,title:Ah(n),project:Hh(n),preview:Ih(n)}))}function Xd(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return uo(o)}catch{return""}}function fo(t){if(!t||te(t)||t!==gn())return;let e=gl(t);e&&bl(t,e);let n=Xd("user"),r=Xd("assistant");Ph(t,{user:n,assistant:r});let o=of(t);if(o){let i=rf(o);i&&Rh(t,i)}}function yl(){let t=fl(),e=ml(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${rr}, #bloom-root, #bloom-sidebar-panel`))continue;let u=pl(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=uo(c.textContent||"",80);d&&!ef.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=rf(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(et.store.titles=t),i&&(et.store.projects=e);let a=co(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(et.store.visits=ia([...a,...l]))}function rf(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=uo((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!ef.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function of(t){if(te(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(pl(e.getAttribute("href")||"")===t)return e}catch{}return null}function Oh(t){let e=of(t);if(e){e.click();return}if(te(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Bh(){let t=gn();pn&&pn!==t&&fo(pn),pn=t,hl(t),yl();let e=gl(t);e&&bl(t,e),fo(t)}function oa(){nr===void 0&&(nr=window.setTimeout(()=>{nr=void 0,Bh()},120))}function Dh(){er||(er=history.pushState.bind(history),lo=history.replaceState.bind(history),history.pushState=function(...e){let n=er(...e);return oa(),n},history.replaceState=function(...e){let n=lo(...e);return oa(),n})}function _h(){er&&(history.pushState=er),lo&&(history.replaceState=lo),er=null,lo=null}function qh(t){return Th.has(t.code)||t.keyCode===192?!0:Lh.has(t.key)}function af(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function $h(t,e){mo=e,yl(),fo(gn()),bt=!0,Qt=0;try{let n=gn();hl(n);let r=aa();r.length>1&&(Qt=t?r.length-1:1)}catch(n){Jd.error("Failed to open switcher:",n)}or()}function Zd(t){let{length:e}=aa();e&&(Qt=(Qt+(t?-1:1)+e)%e,or())}function vl(){if(!bt)return;let t=aa()[Qt];bt=!1,mo=!1,or(),t&&Oh(t.id)}function sf(){bt&&(bt=!1,mo=!1,or())}function Fh(t){if(af(t)){so=!0;return}if((t.ctrlKey||so)&&!t.altKey&&!t.metaKey&&qh(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{bt?Zd(t.shiftKey):$h(t.shiftKey,!0)}catch(n){Jd.error("Hotkey failed:",n)}return}if(bt){if(t.key==="Escape"){t.preventDefault(),sf();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),vl();return}t.key==="Tab"&&(t.ctrlKey||so)&&(t.preventDefault(),Zd(t.shiftKey))}}function zh(t){af(t)&&(so=!1,bt&&mo&&vl())}function jh(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(oa)}function Gh(t){!bt||(t.target instanceof Element?t.target:null)?.closest(`#${rr}`)||sf()}function Uh(){document.visibilityState==="hidden"&&fo(gn())}function dl(t=ra){t instanceof HTMLElement&&Li(t,Ti("auto"),!0)}function Kh(){if(!document.body)return null;let t=document.getElementById(rr);if(t instanceof HTMLElement)return ra=t,dl(t),t;t=document.createElement("div"),t.id=rr;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ra=t,dl(t),t}function or(){let t=Kh();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!bt){e.dataset.visible="false",e.replaceChildren();return}let n=aa();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Qt>=n.length&&(Qt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Qt?"true":"false",s.setAttribute("aria-selected",a===Qt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Qt=a,vl()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Vh(){document.getElementById(rr)?.remove(),ra=null}var lf=w({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${rr}`],settings:et,start(){k("recentTopics",Yd),pn=gn(),hl(pn),yl(),fo(pn),cl=xt(Nh),Dh(),na=new AbortController;let{signal:t}=na;window.addEventListener("keydown",Fh,{capture:!0,signal:t}),window.addEventListener("keyup",zh,{capture:!0,signal:t}),window.addEventListener("popstate",oa,{signal:t}),document.addEventListener("click",jh,{capture:!0,signal:t}),document.addEventListener("click",Gh,{signal:t}),document.addEventListener("visibilitychange",Uh,{signal:t}),ul=Bn("schemeChange",()=>dl())},stop(){na?.abort(),na=null,nr!==void 0&&(clearTimeout(nr),nr=void 0),_h(),cl?.(),cl=null,ul?.(),ul=null,bt=!1,mo=!1,so=!1,Vh()},onSettingsChange(){let t=ia(co());t.length!==co().length&&(et.store.visits=t),bt&&or()}});var xl="cleaner",Wh=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Yh=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Xh=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Zh=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Jh=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Qh=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],bn=M({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function ir(t){return`${t.join(",")}{display:none!important}`}function cf(){let t=[];if(bn.store.hideDownloadApps!==!1&&t.push(ir(Wh)),bn.store.hideDisclaimer!==!1&&t.push(ir(Yh)),bn.store.hideUpgrade!==!1&&t.push(ir(Xh)),bn.store.hideLockedModels!==!1&&t.push(ir(Zh)),bn.store.hideHomePromo!==!1&&t.push(ir(Jh)),bn.store.hideAds!==!1&&t.push(ir(Qh)),!t.length){L(xl);return}k(xl,t.join(`
`))}var uf=w({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:bn,start:cf,onSettingsChange:cf,stop(){L(xl)}});var la=new C("ResponseNotification"),sr=M({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:a0},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),El=!1,sa=null,ar=null,po=null;function t0(){return document.visibilityState==="hidden"||document.hidden}function e0(){return sr.store.onlyWhenHidden===!1?!0:t0()}function n0(){let t=Fn(A());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function df(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!ar||ar.state==="closed")&&(ar=new t);let e=ar,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){la.debug("chime failed",t)}}function r0(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){la.debug("custom sound failed",e),df()}}function ff(){let t=String(sr.store.soundUrl||"").trim();t?r0(t):df()}function o0(){let t="Bloom++",e=`${n0()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){la.debug("notification failed",n)}}function i0(){e0()&&(sr.store.sound!==!1&&ff(),sr.store.browserNotification!==!1&&o0())}function a0(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>ff()),t.appendChild(e),()=>{e.remove()}}var mf=w({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:sr,start(){El=!0,sa?.(),sa=ct(t=>{if(!El||t.userStopped||t.error)return;let e=A()||Xn();t.conversationId&&t.conversationId!==e||i0()}),po?.abort(),po=new AbortController,sr.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:po.signal}),la.debug("watch started")},stop(){El=!1,sa?.(),sa=null,po?.abort(),po=null;try{ar?.close()}catch{}ar=null}});var pf=`#bloom-pq-chip {
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
`;var ze=new C("PromptQueue"),ma="bloom-pq-chip",gf="promptQueue",l0=8,c0=50,u0=2e3,d0='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',f0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,m0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),wl=M({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),$e=new Map,bf=0,$t=!1,qt="",P="",ee=!1,ht=!1,Ge=!1,B=null,go=null,ca=null,qe,xo,je=null,R=null,lr=null,da=!1,at=null,hn,Fe=!0,U=!1,G=!1,dt=!1;function ge(){return ce(Rt())}function cr(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function p0(t){let e=cr(Wt(t));if(e)return e;if(!Vt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),cr(n.innerText||n.textContent||"")}catch{return""}}function Sf(){try{let t=document.querySelectorAll(d0),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Tf(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Lf(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&f0.test(n))return!0}}catch{}return!1}function fa(){let t=Xn();if(!t)return!1;let e=A();return!e||e===t}function vo(){if(W()||fa())return!1;let t=Sf();if(!t)return!0;if(Tf(t)||Lf(t))return!1;try{if(t.querySelector(m0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function g0(){if(j()||cn())return U=!1,!1;if(W()||fa())return U=!0,!0;let t=Sf();return t&&(Tf(t)||Lf(t))?(U=!0,!0):U&&!vo()?!0:(U=!1,!1)}function kf(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Kt);return n instanceof HTMLElement?n:null}function hf(t){return kf(t)??it()}function pa(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Cf(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function b0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?cr(e.innerText||e.textContent||""):""}catch{return""}}function h0(){return bf+=1,`pq${Date.now().toString(36)}${bf.toString(36)}`}function X(t){return $e.get(t)??[]}function Mf(t){return X(t)[0]}function yn(t,e){e.length?$e.set(t,e):$e.delete(t)}function Af(t){if(!X(t).length){G=!1,dt=!1,P="";return}G=!0,dt=!1,U=!0,P=""}function yf(t){if(!qt||qt===t)return;let e=$e.get(qt);!e?.length||$e.has(t)||Y(qt,t)&&($e.delete(qt),$e.set(t,e),P===qt&&(P=t),B?.key===qt&&(B.key=t),ze.debug("migrated pending",qt,"\u2192",t))}function ga(t){let e=ge(),n=X(e);if(wl.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),yn(e,n)}else if(n.length>=l0){ze.debug("queue full",e);return}else n.push({id:h0(),text:t,at:Date.now()}),yn(e,n);U=!0,B={key:e,text:t,turns:Cf(),ticks:3};let r=it();r&&pe(r,"");try{st()}catch(o){ze.error("chip",o)}ze.debug("queued",e,n.length,t.length)}function Hf(t,e){let n=X(t).filter(r=>r.id!==e);if(yn(t,n),R===e&&(R=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}st()}function Ll(){lr?.abort(),lr=null}function y0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function vf(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function v0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||R||at)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;lr?.abort();let c=new AbortController;lr=c;let{signal:u}=c,d=!1,f=!1,m=0,p=0,b=0,g=0,E=null,h=[],x=[],ft=()=>{e.classList.add("bloom-pq-settling");for(let y of h)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},mt=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(E?.isConnected?E.before(t):e.append(t)),E?.remove(),E=null,ft(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},Z=()=>{da=!0;let y=H=>{H.preventDefault(),H.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{da=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=vf(h.length,m,p),H=x.length>1?(x[x.length-1].top-x[0].top-x.slice(0,-1).reduce((I,zt)=>I+zt.height,0))/(x.length-1):2,pt=new Array(x.length),vt=x[0]?.top??0;for(let I of y)pt[I]=vt,vt+=x[I].height+H;for(let I=0;I<h.length;I++){if(I===m)continue;let zt=pt[I]-x[I].top;h[I].style.transform=Math.abs(zt)<.5?"":`translate3d(0,${Math.round(zt)}px,0)`}},lt=()=>{let y=X(n).slice();if(m<0||m>=y.length)return;let H=vf(y.length,m,p);if(H.every((I,zt)=>I===zt))return;let pt=H.map(I=>y[I]).filter(Boolean);if(pt.length!==y.length)return;yn(n,pt);let vt=new Map(h.map(I=>[I.dataset.pqId||"",I]));for(let I of pt){let zt=vt.get(I.id);zt&&e.append(zt)}},yt=y=>{if(f)return;f=!0;let H=d;lr===c&&(lr=null),H&&y&&t.isConnected&&lt(),mt(),H&&Z(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;mt(),y&&Z()});let Zo=()=>{d=!0,h.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=h.indexOf(t),m<0&&(m=h.findIndex(I=>I.dataset.pqId===r)),p=m<0?0:m;let y=t.getBoundingClientRect();b=y.left,g=y.top;let H=getComputedStyle(t);E=document.createElement("div"),E.className="bloom-pq-gap",E.style.height=`${y.height}px`,t.before(E),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=H.color,t.style.font=H.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let pt=e.getBoundingClientRect(),vt=e.scrollTop;x=h.map(I=>{let is=(I===t?E:I).getBoundingClientRect(),Hc=is.top-pt.top+vt;return{top:Hc,height:is.height,mid:Hc+is.height/2}})},v=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(Zo(),!d||m<0)))return;y.preventDefault(),t.style.left=`${b+(y.clientX-s)}px`,t.style.top=`${g+(y.clientY-l)}px`;let H=e.getBoundingClientRect(),pt=y.clientY-H.top+e.scrollTop,vt=y0(pt,x.map(I=>I.mid));vt!==p&&(p=vt,O())},N=y=>{y.pointerId===a&&yt(!0)};window.addEventListener("pointermove",v,{signal:u}),window.addEventListener("pointerup",N,{signal:u}),window.addEventListener("pointercancel",()=>yt(!1),{signal:u})})}function x0(){ht=!0,clearTimeout(xo),xo=setTimeout(()=>{ht=!1,xo=void 0},u0)}function E0(t){if(at)return;let e=ge(),n=X(e).find(i=>i.id===t);if(!n)return;let r=it();if(!r)return;let o=n.text;at=t,R===t&&(R=null),Ll(),st(),clearTimeout(hn),hn=setTimeout(()=>{if(hn=void 0,!$t||at!==t)return;if(at=null,ge()!==e||!X(e).some(a=>a.id===t)){st();return}yn(e,X(e).filter(a=>a.id!==t)),st(),x0(),pe(r,o);let i=Ne();i&&!z(i)&&!Fi(i)&&(i.click(),ht=!1),Af(e)},160)}function bo(t){if(!$t||ee||G||at||W()||ge()!==t)return;let e=Mf(t);if(!e){P="";return}if(Xt())return;let n=it();if(!n)return;if(!Ie(n)){let o=cr(Wt(n));if(o&&o!==e.text)return}let r=Ne();!r||z(r)||Fi(r)||(ee=!0,pe(n,e.text),clearTimeout(qe),qe=setTimeout(()=>w0(t,e.id,e.text),c0))}function w0(t,e,n){qe=void 0;try{if(!$t||G||at)return;let r=Mf(t);if(!r||r.id!==e||r.text!==n||W()||ge()!==t)return;let o=it();if(!o)return;let i=cr(Wt(o));if(i&&i!==n&&!Ie(o))return;i!==n&&pe(o,n);let a=Ne();if(!a||z(a)||Fi(a))return;a.click(),yn(t,X(t).filter(s=>s.id!==e)),st(),Af(t),ze.debug("drained",t,X(t).length)}finally{ee=!1}}function Sl(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Bt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Tl(){Ll(),je?.remove(),je=null,R=null,Fe=!0}var If="http://www.w3.org/2000/svg";function S0(){let t=document.createElementNS(If,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function ho(t){let e=S0();for(let n of t){let r=document.createElementNS(If,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function yo(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&Nf(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function T0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${ma}`)}function ua(){let t=je?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function L0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function _e(t,e){if(R!==t)return;if(R=null,e===null){st();return}let n=cr(e),r=ge();if(!n){Hf(r,t);return}let o=X(r).find(i=>i.id===t);o&&(o.text=n),st()}function xf(t){at||R!==t&&(R&&_e(R,ua()),X(ge()).some(e=>e.id===t)&&(R=t,Fe=!0,st()))}function Nf(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function Ef(t){return R===t?"edit":at===t?"send":"text"}function k0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function C0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||k0(l)!==Ef(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",Fe?"true":"false"),n.hidden=!Fe;for(let s of e){let l=a.get(s.id);if(Ef(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function st(){if(Ll(),!$t||!document.body){Tl();return}let t=ge(),e=X(t);if(!e.length){Tl();return}R&&!e.some(d=>d.id===R)&&(R=null),at&&!e.some(d=>d.id===at)&&(at=null);let n=je;if(n?.isConnected||(n=document.createElement("div"),n.id=ma,document.body.appendChild(n),je=n),C0(n,e)){Sl(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",Fe?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Fe=!Fe,st()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",Fe||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=R===d.id,p=at===d.id;m||(f.setAttribute("role","button"),f.tabIndex=p?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),p&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let b=document.createElement("div");b.className="bloom-pq-body";let g;if(m){let h=document.createElement("textarea");h.className="bloom-pq-text bloom-pq-editing",h.value=d.text,h.rows=2,h.spellcheck=!1,h.setAttribute("aria-label","Queued message text"),h.addEventListener("keydown",x=>{x.stopPropagation(),x.key==="Enter"&&!x.shiftKey?(x.preventDefault(),_e(d.id,h.value)):x.key==="Escape"&&(x.preventDefault(),_e(d.id,null))}),h.addEventListener("blur",()=>_e(d.id,h.value)),g=h,u=h}else{let h=document.createElement("span");h.className="bloom-pq-text line-clamp-2",h.textContent=p?"Sending":d.text,p?Nf(h,l,"Sending now"):h.addEventListener("click",x=>{if(da){da=!1,x.preventDefault(),x.stopPropagation();return}x.preventDefault(),x.stopPropagation(),xf(d.id)}),g=h}b.append(g),f.append(b);let E=document.createElement("div");if(E.className="bloom-pq-rail",m){let h=yo("Save",ho(["M20 6 9 17l-5-5"]),()=>{_e(d.id,g instanceof HTMLTextAreaElement?g.value:ua())},l),x=yo("Cancel",ho(["M18 6 6 18","m6 6 12 12"]),()=>{_e(d.id,null)},l);E.append(h,x)}else{let h=yo("Remove from queue",ho(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{R&&R!==d.id&&_e(R,ua()),R=R===d.id?null:R,Hf(t,d.id)},l,void 0,p),x=yo("Edit queued message",ho(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>xf(d.id),l,"Edit",p),ft=yo("Send now",ho(["M12 19V5","M6 11 12 5l6 6"]),()=>{R&&R!==d.id&&_e(R,ua()),E0(d.id)},l,"Send now (or Enter on empty composer)",p);E.append(h,x,ft)}f.append(E),!m&&!p&&v0(f,c,t,d.id),c.append(f)}if(n.append(o,c),Sl(n),u){let d=u,f=R;queueMicrotask(()=>{R===f&&d.isConnected&&L0(d)})}}function M0(){if(!B)return;B.ticks-=1;let t=X(B.key);if(t.length&&Cf()>B.turns){let e=b0();if(e&&e===B.text){ze.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),yn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,st();return}}B.ticks<=0&&(B=null)}function ba(t){return!g0()||!Vt(t)?"":p0(t)}function A0(t){if(!$t||t.isComposing||t.keyCode===229||t.key!=="Enter"||T0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||ee)return;let e=hf(t.target)??hf(document.activeElement);if(!e)return;if(t.altKey||ht){ht=!1,Ge=!0,queueMicrotask(()=>{Ge=!1});return}let n=ba(e);n&&(pa(t),ga(n))}function H0(t){if(!$t||ee||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Ge){Ge=!1;return}if(ht){ht=!1;return}let e=kf(t.target);if(!e)return;let n=ba(e);n&&(pa(t),ga(n))}function I0(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||z(e))return null;let n=t.closest(Yn);if(n instanceof HTMLElement&&!z(n))return n;let r=Ne();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function wf(t){if(!$t)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${ma}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&z(n)||ee||!I0(e))return;if(ht){ht=!1;return}let r=it();if(!r)return;let o=ba(r);o&&(pa(t),ga(o))}function N0(t){if(!$t)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches($i)&&!e.querySelector(Kt)||ee)return;if(Ge){Ge=!1;return}if(ht){ht=!1;return}let n=it()??e.querySelector(Kt);if(!n)return;let r=ba(n);r&&(pa(t),ga(r))}var Rf=w({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:gf,cleanupSelectors:[`#${ma}`],settings:wl,start(){$t=!0;let t=wl.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),qt=ge(),P="",ee=!1,ht=!1,Ge=!1,B=null,U=!j()&&!cn()&&(W()||fa()),G=!1,dt=!1,R=null,at=null,clearTimeout(hn),hn=void 0,k(gf,pf),go?.abort(),go=new AbortController;let{signal:e}=go,n={capture:!0,signal:e};window.addEventListener("keydown",A0,n),document.addEventListener("beforeinput",H0,n),document.addEventListener("pointerdown",wf,n),document.addEventListener("click",wf,n),document.addEventListener("submit",N0,n),ca?.(),ca=ct({onFall(r){if($t){if(r.userStopped||r.error){U=!1,G=!1,dt=!1,P="",st();return}if(!(G&&!dt)){if(G&&dt){if(!vo())return;G=!1,dt=!1,U=!1,P=r.contextKey,bo(r.contextKey);return}if(!vo()){ze.debug("unsettled fall; keep queue window");return}U=!1,P=r.contextKey,bo(r.contextKey)}}},onRise(){j()||cn()||(G&&(dt=!0),U=!0)},onContext(r,o){o&&r&&!Y(o,r)&&(U=!1,G=!1,dt=!1,P="",ee=!1,qe!==void 0&&(clearTimeout(qe),qe=void 0)),yf(r),qt=r,st()},onTick(r){yf(r.contextKey),qt=r.contextKey,M0(),(j()||cn())&&(G=!1,dt=!1,U=!1,P=""),G&&(W()||fa())&&(dt=!0),G&&dt&&vo()&&(G=!1,dt=!1,U=!1,X(r.contextKey).length&&(P=r.contextKey,bo(r.contextKey))),!G&&U&&vo()&&(U=!1,!P&&X(r.contextKey).length&&(P=r.contextKey,bo(r.contextKey))),!G&&P&&P===r.contextKey&&bo(P),X(r.contextKey).length&&!je?.isConnected?st():je&&Sl(je)}}),st(),ze.debug("watch started")},stop(){$t=!1,ca?.(),ca=null,go?.abort(),go=null,clearTimeout(qe),qe=void 0,clearTimeout(xo),xo=void 0,clearTimeout(hn),hn=void 0,at=null,$e.clear(),B=null,P="",ee=!1,ht=!1,Ge=!1,U=!1,G=!1,dt=!1,Tl()}});var Pf=`.bloom-cls {
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
`;var Df=new C("ChatListStatus"),Of="chatListStatus",va="bloom-cls",P0="bloom-cls",O0=1200*1e3,B0="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Ft=new Map,ne=!1,Lt="",be=!1,fr=!1,kt=0,Ue=null,Ml=null,ur=null,kl=null,ha=null,Eo=null,dr=!1,Ke=new Set;function ya(){return Date.now()}function _f(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function he(t,e,n,r=!0){if(!(!t||!ne)){if(e==="idle")Ft.delete(t);else{let o=Ft.get(t);o&&o.kind===e&&n!=="net"?o.at=ya():Ft.set(t,{kind:e,at:ya(),source:n})}r&&D0({v:1,id:t,kind:e,at:ya()}),vn()}}function D0(t){try{ur?.postMessage(t)}catch{}}function _0(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||he(e.id,e.kind,"bc",!1)}function q0(){let t=ya();for(let[e,n]of Ft)n.kind==="streaming"&&t-n.at>O0&&Ft.delete(e)}function $0(){let t=_f();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(B0))continue;let o=ue(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Bf(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Cl(t){let e=t.querySelector(`:scope > .${va}`);return e||null}function Al(){if(!ne)return;q0();let t=A(),e=$0();Ue?.disconnect();try{for(let n of e){let r=ue(n.getAttribute("href")||"");if(!r||!t||r!==t){Cl(n)?.remove();continue}let i=Ft.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Cl(n)?.remove();continue}let a=Cl(n);a||(a=document.createElement("span"),a.className=va,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Bf("streaming")):i==="error"&&a.appendChild(Bf("error")))}}catch(n){Df.debug("paint failed",n)}qf()}function vn(){if(ne){if(document.hidden){kt&&(cancelAnimationFrame(kt),kt=0),Al();return}kt||(kt=requestAnimationFrame(()=>{kt=0,ne&&Al()}))}}function qf(){let t=_f();if(!(Ue&&Ml===t&&t?.isConnected)){if(Ue?.disconnect(),Ml=t,!t){Ue=null;return}Ue=new MutationObserver(()=>vn()),Ue.observe(t,{childList:!0,subtree:!0})}}function xa(){return!!(rn()||to())}function F0(t){return!!(dr||t&&Ke.has(t)||!fr&&!j()&&xa())}function z0(t){if(ne){if(t.type==="post-start"){fr=!1,t.conversationId?(dr=!1,Ke.add(t.conversationId),be=!0,he(t.conversationId,"streaming","net")):(dr=!0,be=!0);return}if(t.type==="post-end"){if(dr=!1,t.conversationId){Ke.delete(t.conversationId);let e=A(),n=Xn();(e?t.conversationId===e:t.conversationId===n)?he(t.conversationId,t.error?"error":"done","net"):he(t.conversationId,"idle","net")}xa()||(be=!1)}}}function j0(t,e){if(!ne)return;if(Y(e,t)){vn();return}let n=A();if(Lt&&Lt!==n){Ke.delete(Lt);let r=Ft.get(Lt);r&&r.kind!=="idle"&&he(Lt,"idle","local")}dr=!1,be=!1,fr=!0,n&&Ft.get(n)?.kind==="streaming"&&Ft.get(n)?.source==="local"&&!Ke.has(n)&&he(n,"idle","local"),vn()}function G0(t){if(!ne)return;let e=t.conversationId||A();if(Lt&&e&&Lt!==e){Ke.delete(Lt);let r=Ft.get(Lt);r&&r.kind!=="idle"&&he(Lt,"idle","local"),be=!!(e&&Ke.has(e))}if(e&&(Lt=e),fr||j()){if(j()||xa()||t.streaming){vn();return}fr=!1}if(F0(e)&&(t.streaming||xa())){be=!0,e&&he(e,"streaming","local"),vn();return}be&&(be=!1,e&&he(e,Xt()?"error":"done","local")),vn()}var $f=w({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${va}`],start(){ne=!0,k(Of,Pf);try{ur=new BroadcastChannel(P0)}catch{ur=null}ur?.addEventListener("message",_0),kl=xt(z0),ha?.(),ha=ct({onTick:G0,onContext:j0}),Eo?.abort(),Eo=new AbortController,document.addEventListener("visibilitychange",()=>{ne&&(kt&&(cancelAnimationFrame(kt),kt=0),Al())},{signal:Eo.signal}),qf(),Df.debug("sidebar status watch started")},stop(){ne=!1,kt&&cancelAnimationFrame(kt),kt=0,Eo?.abort(),Eo=null,Ue?.disconnect(),Ue=null,Ml=null,ha?.(),ha=null,kl?.(),kl=null;try{ur?.close()}catch{}ur=null,Ft.clear(),Ke.clear(),dr=!1,be=!1,fr=!1,Lt="",document.querySelectorAll(`.${va}`).forEach(t=>t.remove()),L(Of)}});var zf="widerChat",jf=40,Gf=96,Uf=64,Kf=M({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:jf,max:Gf,default:Uf}});function U0(){return ot(Number(Kf.store.width??Uf),jf,Gf)}function Ff(){let t=U0(),e=`min(100%,${t}rem)`;k(zf,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var Vf=w({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Kf,start:Ff,onSettingsChange:Ff,stop(){L(zf)}});var Hl="composerOpacity",mr='form[data-type="unified-composer"],form.w-full[data-type]',K0=[`${mr} [class*="corner-superellipse"]`,`${mr} [class*="bg-token-bg-primary"]`,`${mr} [class*="bg-token-main-surface"]`].join(","),V0=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),W0="#thread-bottom-container,#thread-bottom",Y0=`${mr} #prompt-textarea,${mr} [contenteditable="true"]`,X0="var(--bg-primary,var(--main-surface-primary,#ffffff))",Il=M({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Z0(){return ot(Number(Il.store.opacity??100),0,100)}function J0(){return ot(Number(Il.store.blur??16),0,40)}function Wf(){let t=Z0();if(t>=100){L(Hl);return}let e=J0(),n=`color-mix(in srgb,${X0} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(Hl,`${W0}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${V0}{display:none!important}${mr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${K0}{background-color:${n}!important;background-image:none!important;${r}}${Y0}{background-color:transparent!important;background-image:none!important}`)}var Yf=w({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Il,start:Wf,onSettingsChange:Wf,stop(){L(Hl)}});var Xf=`#bloom-bn-host {
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
`;var ty=new C("BetterNavigator"),Nl="betterNavigator",em="bloom-bn-host",Sn=60,Zf=16,Bl=1e3,Jf=2400,ey=80,nm=2.5,ny=.4,wo="\u6B63\u5728\u8F93\u51FA\u2026",Dl="Image",ry="\u2753",oy="\u{1F916}",Qf=/file_[0-9a-f]+/gi,iy="File",ay="Code",sy=".markdown, .whitespace-pre-wrap",Gl=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),ly="img, picture, video, canvas",cy=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,uy=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Ho=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,dy=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,fy=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,my=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,py=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,gy=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,by=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,hy=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),yy=2e3,vy=40,xy=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,rm=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),Ey=["#prompt-nav-container","[id*='prompt-nav' i]","[data-testid*='prompt-nav' i]","[aria-label='Prompt navigator' i]","[aria-label='Conversation navigator' i]","nav[aria-label*='prompt navigator' i]","nav[aria-label*='conversation navigator' i]"].join(", "),wy=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Sy=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),Ty=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),br=M({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),re=new Map,Co=new Map,oe=new Set,Sa=0,At=!1,ve=!1,pr=!1,Ve=null,Io=null,hr=null,Ta=null,$=[],wn="",La=0,Mo=-1,Ao=0,gr="",Mt=0,ye=0,So,To=null,Ea=null,Rl=null,Pl=null,xn=null,_l=null,Lo=null,En=null,xe=null,ko=null,ka=!1,ql=0;function yr(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Ol(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function Ly(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function ky(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)xy.test(Ly(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Ol(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Ol(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Ol(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Tn(t){try{return!!t.closest(wy)}catch{return!0}}function tm(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Aa(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Ul(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function Cy(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function wa(t,e){if(t){Qf.lastIndex=0;for(let n of t.matchAll(Qf))e.add(n[0].toLowerCase())}}function My(t){try{let e=new Set,n=s=>{Cy(s)||(wa(s.getAttribute("src")||"",e),wa(s.getAttribute("srcset")||"",e),wa(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&wa(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Aa(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function Ay(t,e){let n=My(t),r=Co.get(e)??0,o=Math.max(r,n);return o>0&&Co.set(e,o),o>=2?`${Dl} x${o}`:Dl}function K(t){return t.replace(/\s+/g," ").trim()}function om(t,e){let n=t;for(;n&&n!==e;){if(n.matches(Sy))return!0;n=n.parentElement}return!1}function Ca(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(om(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(Gl);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return K(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Sn+20;)e.push(K(r.textContent||""));return K(e.join(" "))}function No(t){let e=K(t);return e.length<3||e.length>180||Ho.test(e)?!1:cy.test(e)?!0:uy.test(e)}function Ha(t){let e=K(t);return e.length<8||e.length>120||/\s/.test(e)||Ho.test(e)||No(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function Hy(t){let e=[],n=i=>{let a=K(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(K(s[1])),e.push(K(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function Iy(t){try{return Tn(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function Kl(t){let e=K(t);return!e||Vl(e)||Ha(e)?!0:No(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function Ny(t){return!t.length||t.length>4||!t.every(e=>Kl(e))?!1:t.some(e=>Ho.test(K(e))||No(e)||Ha(e))}function im(t){try{let e=null,n=0,r=`${Gl}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(Iy(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=Hy(o);if(!i.length||i.length>4||i.join(" ").length>240||!Ny(i))continue;let a=i.some(c=>Ho.test(K(c))),s=i.some(c=>No(c)||Ha(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function Ry(t){return im(t)?iy:""}function Py(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(dy.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function Oy(t){try{for(let e of t.querySelectorAll(ly))if(!Py(e))return!0}catch{}return!1}function Vl(t){let e=K(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||py.test(e)||my.test(e)?!0:e.length<=24&&(gy.test(e)||Ho.test(e))}function By(t){let e=[],n=new Set,r=o=>{try{if(om(o,t)||o.closest(Gl))return}catch{return}let i=Ca(o);!i||n.has(i)||Vl(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>Sn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Ca(o).length<24)&&(r(o),e.join(" ").length>Sn+20))break}}catch{}return K(e.join(" "))}function Dy(t){let e=im(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=K(i.innerText||i.textContent||"");!a||a.length>Sn+20||r.has(a)||Kl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return K(n.join(" "))}function _y(t,e){let n=[];try{for(let o of t.querySelectorAll(sy)){if(Tn(o))continue;let i=Ca(o);if(!(!i||e==="assistant"&&Vl(i)||Kl(i))&&(n.push(i),n.join(" ").length>Sn+20))break}}catch{}let r=K(n.join(" "));if(e==="user"){let o=Dy(t);if(o)return o}return r||(e==="assistant"?By(t):"")}function am(t){return t.length>Sn?`${t.slice(0,Sn).trimEnd()}\u2026`:t}function $l(t){return by.test(t)}function qy(t,e,n,r){let o=_y(t,e);if(o)return am(o);if(r)return wo;let i=Ry(t);if(i)return i;if(Ul(t))return Ay(t,Aa(t));try{if(Oy(t))return Dl;if(t.querySelector("pre, code"))return ay}catch{}return`Message ${n+1}`}function $y(){if(ve)return!0;let t=A();return!!(t&&oe.has(t)||!pr&&!j()&&Ro())}function Ro(){return!!(rn()||to())}function Fy(){Sa=Date.now()}function sm(t){ve=!1,t&&oe.delete(t);let e=A();e&&oe.delete(e)}function zy(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function jy(t){if(Ul(t)||!Ro())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Ca(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function Wl(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=K(e.textContent||"");if(!(n.length>32)&&fy.test(n))return!0}}catch{}return!1}function lm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function Gy(t,e){try{if(zy(t))return!0;if(!e)return!1;if(jy(t)||Wl(t))return!0}catch{}return!1}function cm(t){if(!t||Ro())return!1;try{if(Wl(t)||lm(t))return!1;if(t.querySelector(hy)||Ul(t))return!0}catch{}return!1}function Uy(t){if(Ro()||Sa&&Date.now()-Sa<yy)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!cm(e.el)||sm()}function Ky(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(rm)){if(Tn(r))continue;let i=Aa(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(Tn(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function um(t){let e=[t.getAttribute("data-message-id"),t.getAttribute("data-turn-id"),t.querySelector("[data-message-id]")?.getAttribute("data-message-id"),t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id")],n=[];for(let r of e)r&&!n.includes(r)&&n.push(r);return n}function Vy(t){let e=br.store.showAssistant!==!1,n=e&&$y(),r=Ky(t),o=null;if(e)for(let a of r)tm(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Aa(a);if(!s)continue;let l=tm(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&Wl(a),d=c&&lm(a),f=l==="assistant"&&c&&!cm(a)&&(u||d||n||Gy(a,!0)),m=qy(a,l,i.length,f);if(m&&m!==wo){let b=re.get(s),g=!!b&&(No(b)||Ha(b));(!b||g||!$l(m)||$l(b))&&m!==b&&re.set(s,m)}let p=f&&m===wo?wo:re.get(s)||m;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return i}function Wy(t){let e=new Map;for(let n of t)if(e.set(n.id,n),!!n.el)for(let r of um(n.el))e.set(r,n);return e}function Yy(t,e){if(e)return e.text&&e.text!==wo&&re.set(t.id,e.text),{...e,id:t.id};let n=re.get(t.id)||(t.alias?re.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message"}}function Xy(t,e){let n=br.store.showAssistant!==!1,r=Wy(e),o=new Set,i=[];for(let s of t){if(s.role==="assistant"&&!n)continue;let l=r.get(s.id)||(s.alias?r.get(s.alias):void 0),c=Yy(s,l);c.el&&o.add(c.el),i.push(c)}for(let s=0;s<e.length;s++){let l=e[s];if(!l.el||o.has(l.el))continue;let c=i.length;for(let u=s-1;u>=0;u--){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f+1;break}}if(c===i.length)for(let u=s+1;u<e.length;u++){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f;break}}i.splice(c,0,l),o.add(l.el)}let a=-1;for(let s=0;s<i.length;s++)i[s].role==="assistant"&&(a=s);for(let s=0;s<i.length;s++)i[s].live&&s!==a&&(i[s].live=!1);return i}function Zy(t){if(Tn(t))return!1;try{if(t.closest("#bloom-bn-host, #bloom-root, #bloom-sidebar-panel, #bloom-plugin-layer"))return!1}catch{return!1}let e=`${t.id} ${t.getAttribute("data-testid")||""} ${t.getAttribute("aria-label")||""}`;return/prompt-nav|promptnav|conversation-nav|prompt navigator|conversation navigator/i.test(e)}function Jy(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.getAttribute("data-goto-message-id")||t.getAttribute("data-messageid")||""}function Qy(t){let e=t.getAttribute("aria-label")||t.getAttribute("title")||t.getAttribute("data-preview")||t.textContent||"";return am(K(e))}function dm(t){return!!t&&!t.startsWith("native:")&&!t.startsWith("anon:")&&!t.startsWith("mid:")}function tv(){let t=[],e=new Set;try{for(let n of document.querySelectorAll(Ey))if(Zy(n))for(let r of n.querySelectorAll("button, a, [role='button']")){if(Tn(r))continue;let o=Jy(r);if(!dm(o)||e.has(o))continue;e.add(o);let i=Qy(r),a=Xl(o);t.push({id:o,el:a?.isConnected?a:null,role:"user",text:i||"Message"})}}catch{}return t}function ev(t,e){if(!e.length)return t;let n=new Map;for(let r of t)if(n.set(r.id,r),r.el)for(let o of um(r.el))n.set(o,r);for(let r of e){if(!dm(r.id))continue;let o=n.get(r.id);o&&(r.text&&(!o.text||$l(o.text))&&(o.text=r.text,re.set(o.id,r.text)),!o.el&&r.el?.isConnected&&(o.el=r.el))}return t}function nv(){let t=yr();if(!t||t===document.body)return[];let e=Vy(t),n=A();n&&fe(n);let r=n?_r(n):[],o=r.length?Xy(r,e):e,i=ev(o,tv());return Uy(i),i}function fm(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Ia(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function Yl(t){return t===window?window.innerHeight:t.clientHeight}function rv(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(Ty)}catch{return!1}}function mm(){So!==void 0&&(clearTimeout(So),So=void 0),To?.classList.remove("bloom-bn-flash"),To=null}function pm(t){mm(),t.classList.add("bloom-bn-flash"),To=t,So=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),To===t&&(To=null),So=void 0},800)}function Ma(t){if(!$.length)return;let e=Math.max(0,Math.min(t,$.length-1));La=e,Io?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),hr?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),Ta&&(Ta.textContent=`${e+1} / ${$.length}`)}function gm(t){if(ka)return;let e=hr?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function Fl(t){let e=$[t];if(!e)return;let n=e.el?.isConnected?e.el:Xl(e.id);if(!n){av(t);return}e.el=n,Mo=t,Ao=Date.now()+Bl,Ma(t),gm(t);let r=xe??Ia(n),i=Math.abs(n.getBoundingClientRect().top-fm())>nm*Yl(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),br.store.jumpEffect!=="none"&&pm(n)}function Xl(t){let e=yr();if(!e||e===document.body||!t)return null;let n=[t],r=A(),i=(r?_r(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"]`)}catch{}if(!s||Tn(s))continue;let l=s.closest(rm);return l instanceof HTMLElement?l:s}return null}function Zl(){if(xe)return xe;let t=yr();return t?Ia(t):window}function ov(t){let e=Zl(),n=Yl(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function iv(t,e){let n=Zl();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function av(t){let e=++ql,n=$[t];if(!n)return;Mo=t,Ao=Date.now()+Jf+Bl,Ma(t),gm(t);let r=-1;for(let l=0;l<$.length;l++)$[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+Jf,a=0,s=-1;for(;Date.now()<i;){if(e!==ql||!At)return;let l=Xl(n.id);if(l){n.el=l,Ao=Date.now()+Bl;let d=xe??Ia(l),m=Math.abs(l.getBoundingClientRect().top-fm())>nm*Yl(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),br.store.jumpEffect!=="none"&&pm(l),Ct();return}let c=Zl(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&iv(o,u))break;ov(o),await new Promise(d=>setTimeout(d,ey))}}function Jl(){if(!At||!$.length)return;if(Date.now()<Ao&&Mo>=0){Ma(Mo);return}let t=window.innerHeight*ny,e=0;for(let n=0;n<$.length;n++){let r=$[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Ma(e)}function sv(t){let e=Ia(t);if(xe===e&&ko)return;ko?.(),xe=e;let n=e===window?document:e,r=()=>{Jl(),Ql()};n.addEventListener("scroll",r,{passive:!0}),ko=()=>n.removeEventListener("scroll",r)}function lv(t){En?.disconnect(),En=null;let e=xe instanceof HTMLElement?xe:null;En=new IntersectionObserver(()=>Jl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&En.observe(n.el)}function cv(){if(!document.body)return null;let t=Ve;if(t?.isConnected)return t;t=document.createElement("div"),t.id=em,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{ka=!0}),n.addEventListener("pointerleave",()=>{ka=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Ve=t,Io=e,hr=i,Ta=o,t}function bm(){let t=Ve,e=yr();if(!t||!e||!e.isConnected||$.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=ky(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||vy,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Ql(){!At||ye||(ye=requestAnimationFrame(()=>{ye=0,At&&bm()}))}function uv(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function dv(t){let e=Io,n=hr;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Zf),e.classList.toggle("bloom-bn-fit",t.length>Zf),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=uv(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Fl(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?ry:oy;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Fl(o)}),n.appendChild(a)}))}function fv(t){Io?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=hr?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function mv(){let t=A();return t===gr?!1:(gr=t,re.clear(),Co.clear(),$=[],wn="",La=0,Mo=-1,Ao=0,ve&&t&&(oe.add(t),ve=!1),t&&fe(t),!0)}function pv(t){let e=br.store.showAssistant!==!1?"1":"0";return`${gr}|${e}|${t.map(n=>n.id).join(",")}`}function zl(){if(!At)return;mv();let t=nv(),e=yr();if(!e||t.length<1){$=t,wn="",Ve&&(Ve.hidden=!0),En?.disconnect(),jl();return}cv();let n=pv(t);n!==wn?($=t,wn=n,dv(t),sv(e),lv(t)):($=t,fv(t)),bm(),Jl(),jl()}function Ct(){if(At){if(document.hidden){Mt&&(cancelAnimationFrame(Mt),Mt=0),zl();return}Mt||(Mt=requestAnimationFrame(()=>{Mt=0,At&&zl()}))}}function jl(){let t=yr();if(!(xn&&_l===t&&t?.isConnected)){if(xn?.disconnect(),Lo?.disconnect(),_l=t,!t||t===document.body){xn=null;return}xn=new MutationObserver(()=>Ct()),xn.observe(t,{childList:!0,subtree:!0}),Lo=new ResizeObserver(()=>Ql()),Lo.observe(t)}}function gv(t){if(At){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===A())&&Ct();return}if(t.type==="post-start"){Fy(),pr=!1,t.conversationId?(ve=!1,oe.add(t.conversationId)):ve=!0,Ct();return}if(t.type==="post-end"){if(ve=!1,t.conversationId)oe.delete(t.conversationId);else{let e=A();e&&oe.delete(e)}Ct()}}}function bv(t){if(!At||!$.length||Ve?.hidden||t.altKey||t.ctrlKey||t.metaKey||rv(t.target))return;let e=-1;if(t.key==="ArrowDown")e=La+1;else if(t.key==="ArrowUp")e=La-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=$.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Fl(Math.max(0,Math.min(e,$.length-1)))}function hv(){ql++,mm(),En?.disconnect(),En=null,xn?.disconnect(),xn=null,_l=null,Lo?.disconnect(),Lo=null,ko?.(),ko=null,xe=null,ka=!1,Ve?.remove(),Ve=null,Io=null,hr=null,Ta=null}var hm=w({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted yet. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Nl,cleanupSelectors:[`#${em}`],settings:br,start(){At=!0,gr=A(),gr&&fe(gr),k(Nl,Xf),Ea=new AbortController;let{signal:t}=Ea;window.addEventListener("keydown",bv,{signal:t}),window.addEventListener("popstate",Ct,{signal:t}),window.visualViewport?.addEventListener("resize",Ql,{signal:t}),document.addEventListener("visibilitychange",()=>{At&&(Mt&&(cancelAnimationFrame(Mt),Mt=0),ye&&(cancelAnimationFrame(ye),ye=0),zl())},{signal:t}),Pl=xt(gv),Rl=ct({onTick(){if(j()){Ct();return}pr&&!Ro()&&(pr=!1),Ct()},onFall(e){sm(e.conversationId),Ct()},onContext(e,n){if(!Y(n,e)){re.clear(),Co.clear(),wn="",ve=!1;let o=A();for(let i of[...oe])i!==o&&oe.delete(i);pr=!0}let r=A();r&&fe(r),Ct()}}),jl(),Ct(),ty.debug("navigator started")},stop(){At=!1,Mt&&cancelAnimationFrame(Mt),Mt=0,ye&&cancelAnimationFrame(ye),ye=0,Ea?.abort(),Ea=null,Rl?.(),Rl=null,Pl?.(),Pl=null,oe.clear(),ve=!1,pr=!1,Sa=0,hv(),re.clear(),Co.clear(),$=[],wn="",L(Nl)},onSettingsChange(){wn="",Ct()}});var ym=`.bloom-ts {
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
`;function vm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function xm(t){try{return new Date(t).toISOString()}catch{return""}}var Sm=new C("MessageTimestamps"),Em="messageTimestamps",Ra="bloom-ts",wm=1500,vv="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",vr=M({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),xr=new Map,Cn=!1,Ht=0,We=null,ec=null,tc=null,Na=null,Po=null,Oo=!1,Ln=!1;function Tm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function rc(){let t=vr.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Lm(){let t={...rc()};for(let[n,r]of xr)t[n]=r;let e=Object.keys(t);if(e.length>wm){let n=e.slice(e.length-wm),r={};for(let o of n)r[o]=t[o];vr.store.stamps=r;return}vr.store.stamps=t}var xv=qc(Lm,500);function km(t,e){!t||!e||xr.get(t)===e||(xr.set(t,e),xv(),kn())}function Ev(t){return t?xr.get(t)??rc()[t]??mi(t)??null:null}function wv(t){Cn&&t.type==="message-time"&&km(t.messageId,t.createTime)}function Sv(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Tv(){let t=Tm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(vv)||e.push(n)}catch{}return e}function Lv(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function nc(){if(!Cn)return;let t=vr.store.hideOwnMessages===!0,e=vr.store.showDate!==!1,n=W();Ln&&!j()&&(Ln=!1),Ln&&(n?Oo=!1:Ln=!1);let r=Ln?!1:n,o=Tv();We?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=Sv(i),c=i.querySelector(`:scope > .${Ra}`);if(t&&l==="user"){c?.remove();return}if(Lv(i)){c?.remove();return}let u=Ev(s);if(!u&&s&&(r||Oo)&&a>=o.length-2&&(u=Date.now(),km(s,u)),!u){c?.remove();return}let d=vm(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Ra,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=xm(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){Sm.debug("paint failed",i)}Oo=r,Cm()}function kn(){if(Cn){if(document.hidden){Ht&&(cancelAnimationFrame(Ht),Ht=0),nc();return}Ht||(Ht=requestAnimationFrame(()=>{Ht=0,Cn&&nc()}))}}function Cm(){let t=Tm();if(!(We&&ec===t&&t?.isConnected)){if(We?.disconnect(),ec=t,!t||t===document.body){We=null;return}We=new MutationObserver(()=>kn()),We.observe(t,{childList:!0,subtree:!0})}}var Mm=w({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ra}`],settings:vr,start(){Cn=!0,k(Em,ym);let t=rc();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&xr.set(e,n);tc=xt(wv),Na?.(),Na=ct({onTick:kn,onFall:kn,onContext(e,n){Y(n,e)||(Ln=!0,Oo=!1),kn()}}),Po?.abort(),Po=new AbortController,document.addEventListener("visibilitychange",()=>{Cn&&(Ht&&(cancelAnimationFrame(Ht),Ht=0),nc())},{signal:Po.signal}),Cm(),kn(),Sm.debug("timestamp watch started")},stop(){Cn=!1,Ht&&cancelAnimationFrame(Ht),Ht=0,Po?.abort(),Po=null,We?.disconnect(),We=null,ec=null,Na?.(),Na=null,tc?.(),tc=null,Ln=!1,Oo=!1,Lm(),xr.clear(),document.querySelectorAll(`.${Ra}`).forEach(t=>t.remove()),L(Em)},onSettingsChange:kn});var oc="streamerMode",kv="filter:blur(6px)!important;transition:filter .2s ease",Cv="filter:none!important",Er=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],wr=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function It(t,e){return t.map(n=>`${n} ${e}`)}var Mn=M({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Sr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${kv}}${e?`${r}{${Cv}}`:""}`}function Am(){let t=[];if(Mn.store.conversations!==!1&&(t.push(Sr([...It(wr,'a[href^="/c/"]'),...It(wr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Mn.store.projects!==!1&&(t.push(Sr([...It(wr,'a[href*="/project"]'),...It(wr,'a[href*="/g/g-p-"]'),...It(wr,'[data-testid="project-name"]'),...It(wr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Mn.store.headerTitle!==!1&&t.push(Sr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Mn.store.accountAvatar!==!1&&t.push(Sr([...It(Er,"img"),...It(Er,'[class*="avatar"]'),...It(Er,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Mn.store.accountName!==!1&&t.push(Sr([...It(Er,".min-w-0 > .truncate"),...It(Er,".min-w-0.flex-1 .truncate")],!1)),Mn.store.accountEmail!==!1&&t.push(Sr([...It(Er,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){L(oc);return}k(oc,t.join(`
`))}var Hm=w({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Mn,start:Am,onSettingsChange:Am,stop(){L(oc)}});var Im=`.bloom-gc-panel {
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
}`;var Av=new C("GreetingCustomizer"),Tr="greetingCustomizer",Nm="greetingCustomizerUi",Bo=100,ac=30,Hv=120,Iv=1e3,Nv=50,Rv=40,Pv=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Do=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),_a=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Ov(t){return!!t?.closest(Pv)}function Bm(t){return!!(Ov(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Go(t){try{for(let e of document.querySelectorAll(t))if(!Bm(e))return e}catch{}return null}function ic(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Go(e))return e;return t}var Dm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],nt=M({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Zv},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Dm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),ie=!1,Cr=!1,Hn=null,Oa,_o,Lr,qo,Ba=0,Pa=null,kr=null,$o=null,Fo=null,zo=null,Da=null;function we(){let t=location.pathname||"/";return t==="/"||t===""}function An(){let t=nt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Dm.slice()}function jo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Rm(t){nt.store.greetings=t.slice(0,ac)}function Uo(){let t=String(nt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Bv(){return nt.store.order==="random"?"random":"sequential"}function Dv(){return ot(Number(nt.store.intervalSec??10),1,3600)*1e3}function _v(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function qv(){return!!Go(_a)}function qa(){return!!(Go(_a)||Go(Do))}function $v(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=qv()?ic(_a):Go(Do)?ic(Do):ic(_a),i=e?`${Do}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Fv(t,e){if(t<=0)return 0;if(t===1)return Number(nt.plain.index)!==0&&(nt.store.index=0),Number(nt.plain.lastRandom)!==0&&(nt.store.lastRandom=0),0;let n=Number(nt.plain.index),r=Number(nt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Bv()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return nt.store.index=s,nt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return nt.store.index=i,i}function Ee(t){if(!ie)return;if(!we()){L(Tr);return}let e=An().map(jo).filter(Boolean);if(!e.length){L(Tr);return}let n=Fv(e.length,t),r=e[n]??e[0],o=Uo()==="manual"&&e.length>1;k(Tr,$v(_v(r),o)),Da?.()}function sc(){Oa!==void 0&&(clearInterval(Oa),Oa=void 0)}function lc(){sc(),!(!ie||!we())&&Uo()==="interval"&&(An().filter(Boolean).length<=1||(Oa=setInterval(()=>Ee(!0),Dv())))}function cc(){qo!==void 0&&(clearTimeout(qo),qo=void 0),Ba=0}function Pm(){if(cc(),!ie||!we())return;Ba=Rv;let t=()=>{if(qo=void 0,!(!ie||!we())){if(qa()){Uo()==="refresh"&&!Cr?(Cr=!0,Ee(!0)):Ee(!1),lc();return}Ba-=1,Ba>0&&(qo=setTimeout(t,Nv))}};t()}function uc(){if(Hn===!0){qa()?Ee(!1):Pm();return}Hn=!0,Cr=!1,Uo()==="refresh"?(Cr=!0,Ee(!0)):Ee(!1),lc(),qa()||Pm()}function dc(){Hn=!1,Cr=!1,sc(),cc(),L(Tr)}function $a(){Lr===void 0&&(Lr=window.setTimeout(()=>{Lr=void 0,ie&&(we()?uc():Hn!==!1&&dc())},Hv))}function zv(){kr||(kr=history.pushState.bind(history),$o=history.replaceState.bind(history),Fo=function(...e){let n=kr(...e);return $a(),n},zo=function(...e){let n=$o(...e);return $a(),n},history.pushState=Fo,history.replaceState=zo)}function jv(){Fo&&history.pushState===Fo&&kr&&(history.pushState=kr),zo&&history.replaceState===zo&&$o&&(history.replaceState=$o),kr=null,$o=null,Fo=null,zo=null}function Gv(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame($a)}function Uv(t){if(!ie||!we()||Uo()!=="manual"||An().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Do);if(!n||Bm(n))return;let r=window.getSelection?.();r&&String(r).trim()||Ee(!0)}function Kv(){_o===void 0&&(_o=setInterval(()=>{if(!ie)return;let t=we();if(t!==(Hn===!0)){t?uc():dc();return}t&&qa()&&Ee(!1)},Iv))}function Vv(){_o!==void 0&&(clearInterval(_o),_o=void 0)}function Om(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var Wv="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Yv="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Xv(t,e){let n=jo(t);return n?n.length>Bo?`Keep it to ${Bo} characters.`:An().length+(e?1:0)>ac?`At most ${ac} greetings.`:null:"Enter a greeting."}function Zv(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=An(),s=Number(nt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Bo,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let g=l.querySelector(".bloom-gc-count");g&&(g.textContent=`${jo(e).length}/${Bo}`);let E=l.querySelector(".bloom-gc-error");E&&(E.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${jo(e).length}/${Bo}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let g=document.createElement("button");g.type="button",g.className="bloom-gc-btn",g.textContent="Cancel",g.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(g)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let g=n<0,E=Xv(e,g);if(E){r=E,i();return}let h=jo(e),x=An().slice();n>=0&&n<x.length?x[n]=h:x.push(h),Rm(x),n=-1,e="",r="",i()}),m.appendChild(p),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let g=document.createElement("p");g.className="bloom-gc-empty",g.textContent="No greetings. The official heading stays.",t.appendChild(g);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((g,E)=>{let h=document.createElement("div");h.className="bloom-gc-item",E===s&&(h.dataset.active="true");let x=document.createElement("button");x.type="button",x.className=`bloom-gc-body${o===E?"":" bloom-gc-clamp"}`,x.textContent=g,x.addEventListener("click",()=>{o=o===E?-1:E,i()});let ft=document.createElement("div");ft.className="bloom-gc-item-actions";let mt=Om("Edit",Wv);mt.addEventListener("click",()=>{n=E,e=g,r="",i()});let Z=Om("Delete",Yv);Z.addEventListener("click",()=>{let O=An().filter((lt,yt)=>yt!==E);Rm(O),n===E?(n=-1,e=""):n>E&&(n-=1),i()}),ft.append(mt,Z),h.append(x,ft),b.appendChild(h)}),t.appendChild(b)};return Da=i,i(),()=>{Da===i&&(Da=null),t.replaceChildren()}}var _m=w({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Nm,settings:nt,start(){ie=!0,k(Nm,Im),zv(),Pa=new AbortController;let{signal:t}=Pa;window.addEventListener("popstate",$a,{signal:t}),document.addEventListener("click",Gv,{capture:!0,signal:t}),document.addEventListener("click",Uv,{signal:t}),Kv(),Hn=null,we()?uc():dc(),Av.debug("started")},stop(){ie=!1,Pa?.abort(),Pa=null,Lr!==void 0&&(clearTimeout(Lr),Lr=void 0),sc(),cc(),Vv(),jv(),L(Tr),Cr=!1,Hn=null},onSettingsChange(){ie&&(we()?(Ee(!1),lc()):L(Tr))}});function Jv(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Fa(t){try{return await createImageBitmap(t)}catch{return null}}async function Qv(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function za(t){if(t.startsWith("data:")){let e=Jv(t);if(e){let n=await Fa(e);if(n)return n}return Qv(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Fa(await e.blob()):null}catch{return null}}var Ga="data-bloom-csi-slot",tx="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",ex=/\bsize-(?:[6-9]|10)\b/,nx=/\b(?:h|w)-(?:[6-9]|10)\b/,rx=/^(plus|pro|free|team|go|business|enterprise)$/i,ox=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function ja(t){return t.getAttribute("class")||""}function $m(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||ex.test(t)?!0:nx.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function ix(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Fm(e)}function Fm(t){return rx.test(String(t??"").replace(/\s+/g,""))}function ae(t){return!!t?.closest(tx)}function Ua(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Ko(t){let e=ja(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Fm(t.textContent||"")}function Ka(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Vo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function ax(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function zm(t){if(ae(t)||Ka(t)||Vo(t)||Ko(t)||Ua(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function jm(t){return ae(t)||Ka(t)||Vo(t)||Ko(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:ix(t.textContent||"")}function Gm(t){return ae(t)||Vo(t)||Ua(t)||Ko(t)?!1:$m(ja(t))||jm(t)?!0:zm(t)}function qm(t){return!(ae(t)||Ua(t)||Vo(t)||Ko(t)||Ka(t))}function In(t,e){let n=Ka(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Vo(n)||Ua(n)||Ko(n));)ae(n)||(r=n),n=n.parentElement;return r}function sx(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||ae(e))continue;if(ax(ja(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!qm(o))){if(Gm(o)||$m(ja(o)))return In(o,t)??o;r.push(o)}if(r.length===1)return In(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&qm(r))return In(r,t)??r}}return null}function lx(t){let e=t.querySelectorAll(ox);for(let n of e)if(Gm(n))return In(n,t)??n;return null}function cx(t){for(let e of t.querySelectorAll("span, div, p, i"))if(jm(e))return In(e,t)??e;return null}function ux(t){for(let e of t.querySelectorAll("*"))if(zm(e))return In(e,t)??e;return null}function Um(t,e){if(ae(t))return null;if(e&&!ae(e)&&t.contains(e)){let n=In(e,t);if(n)return n}return sx(t)??lx(t)??cx(t)??ux(t)}function Km(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Mr="data-bloom-csi",Va="data-bloom-csi-orig",Nn=new Set,Vm=null;function mc(t){Vm=t}function Wm(t){return`url(${JSON.stringify(t)})`}function Wa(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function pc(t,e,n){let r=Wm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Ym(t,e=Ga){let n=Wm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function dx(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Ar(t){t.removeEventListener("error",fc);let e=t.getAttribute(Va);t.removeAttribute(Mr),t.removeAttribute(Va),e&&t.getAttribute("src")!==e&&(t.src=e)}function fc(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Nn.add(n),Ar(e),Vm?.()}function Xm(t,e){if(!e||Nn.has(e)){Ar(t);return}dx(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Mr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Va)&&t.setAttribute(Va,n);t.setAttribute(Mr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",fc),t.addEventListener("error",fc),n!==e&&(t.src=e)}var Zm=`/*
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
`;var Jm=new C("CustomSidebarIdentity"),Qm="customSidebarIdentityUi",np="customSidebarIdentity",mx="bloom-csi-face",px="bloom-csi-name",Hr=Ga,gx=1024,Ya=256,rp=24,op=64,ip=40,yc=1,vc=4,Wo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],gc=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=M({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Rx},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:rp,max:op,default:ip},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Pn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function bx(){return String(T.store.displayName??"").trim()}function Ja(t,e,n,r,o){let i=ot(n,yc,vc),a=Math.min(t,e)/i,s=ot(r,a/2,Math.max(a/2,t-a/2)),l=ot(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function hx(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function xc(t){let e=Math.min(1,gx/Math.max(t.width,t.height));return hx(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function yx(t,e,n,r){let{side:o,x:i,y:a}=Ja(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Ya,s.height=Ya;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,Ya,Ya);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function vx(t){let e=await Fa(t);if(!e)return null;let n=xc(e);return e.close(),n}async function wc(t,e,n,r){let o=await za(t);if(!o)return null;let i=yx(o,e,n,r);return o.close(),i}function Sc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function tp(){T.store.avatarUrl="",T.store.avatarSource="",Sc()}var ep=0;async function Ec(t){let e=++ep;Sc(),T.store.avatarSource=t;let n=await wc(t,.5,.5,1);return e!==ep?!1:(n&&(T.store.avatarUrl=n),!!n)}function Yo(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function bc(t){let e=Yo(t);if(!e)return!1;let n=await vx(e);return n?Ec(n):!1}var Nt=!1,Ir=!1,Nr=0,Qa=0,Xa=null,Ye=new Map,Rr=null,Se=null,ts=null,se=null,es=null;function ns(t){let e=String(t??"").trim();if(!e||Nn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function ap(){return ns(T.store.avatarUrl)??ns(T.store.avatarSource)}var Za=!1,hc=new Set;function sp(){let t=ns(T.store.avatarSource);if(!t?.startsWith("data:image/")||ns(T.store.avatarUrl)?.startsWith("data:image/")||Za||hc.has(t))return;Za=!0;let e=Pn(T.store.cropX,.5),n=Pn(T.store.cropY,.5),r=Pn(T.store.cropZoom,1);wc(t,e,n,r).then(o=>{if(Za=!1,!o){hc.add(t);return}Nt&&(T.store.avatarUrl=o,rs())}).catch(()=>{Za=!1,hc.add(t)})}function Rn(t,e){return t.map(n=>`${n} ${e}`)}function xx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Ex(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=xx(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function lp(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||ae(n)||n.closest(".min-w-0")||e.push(n);return e}function wx(t){let e=lp(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Tc(){let t=[],e=Qe();e&&t.push(e);let n=Un();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Wo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function cp(t,e){let n=wx(t);if(n)Xm(n,e);else for(let o of lp(t))Ar(o);let r=Um(t,n);for(let o of t.querySelectorAll(`[${Hr}]`))o!==r&&o.removeAttribute(Hr);r&&r.setAttribute(Hr,"")}function Sx(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Tx(t,e){let n=Sx(t);n&&cp(n,e)}function Lx(){for(let t of document.querySelectorAll(`img[${Mr}]`))Ar(t);for(let t of document.querySelectorAll(`[${Hr}]`))t.removeAttribute(Hr)}function kx(){let t=ot(Math.round(Pn(T.store.avatarSize,ip)),rp,op),e=ap(),n=bx(),r=T.store.applyToMenu!==!1,o=[],i=[...Rn(Wo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Rn(gc,"> :first-child img"));let a=[...Rn(Wo,".min-w-0 > .truncate"),...Rn(Wo,".min-w-0.flex-1 .truncate")];r&&a.push(...Rn(gc,"> :first-child .truncate"));let s=Km(Hr);o.push(Wa([...s.flatMap(l=>Rn(Wo,l))].join(","),t)),o.push(Wa(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(Wa(s.flatMap(l=>Rn(gc,`> :first-child ${l}`)).join(","),t)),e&&(o.push(pc(i.join(","),e,t)),o.push(pc("#stage-sidebar-tiny-bar img",e,32)),o.push(Ym(e))),n&&o.push(Ex(a,n)),k(np,o.join(""))}function Cx(){let t=ap(),e=Tc();for(let n of e)cp(n,t);if(T.store.applyToMenu!==!1){let n=Kn();n&&Tx(n,t)}for(let n of document.querySelectorAll(`img[${Mr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Ar(n)}function rs(){if(!(!Nt||Ir)){Ir=!0;for(let t of Ye.values())t.disconnect();Se?.disconnect(),se?.disconnect();try{kx(),Cx()}finally{Ir=!1,Lc(),Ix(),Rr?.isConnected&&up(Rr),sp()}}}function Xo(){!Nt||Nr||(Nr=requestAnimationFrame(()=>{Nr=0,rs()}))}function Mx(){Ir||!Nt||Xo()}function Ax(t){if(Ye.has(t))return;let e=new MutationObserver(Mx);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ye.set(t,e)}function Hx(t){Ye.get(t)?.disconnect(),Ye.delete(t)}function Lc(){let t=new Set;for(let n of Tc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Un();e&&t.add(e);for(let n of[...Ye.keys()])(!t.has(n)||!n.isConnected)&&Hx(n);for(let n of t)n.isConnected&&Ax(n)}function Ix(){let t=wi();if(!t){se?.disconnect(),se=null,ts=null;return}if(ts===t&&se){se.observe(t,{childList:!0});return}se?.disconnect(),ts=t,se=new MutationObserver(()=>{Ir||!Nt||(Lc(),Xo())}),se.observe(t,{childList:!0})}function up(t){Rr===t&&Se||(Se?.disconnect(),Rr=t,Se=new MutationObserver(()=>{if(!t.isConnected){Se?.disconnect(),Se=null,Rr=null;return}Ir||!Nt||Xo()}),Se.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function dp(t){if(!Nt||T.store.applyToMenu===!1)return;let e=Kn();if(e){up(e),Xo();return}t<=0||requestAnimationFrame(()=>dp(t-1))}function fp(t){Nt&&(rs(),!(Tc().length||t<=0)&&(Qa=requestAnimationFrame(()=>fp(t-1))))}function Nx(t){Nt&&T.store.applyToMenu!==!1&&(!Si(t)&&!Kn()||dp(10))}function Rx(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,m.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let g=document.createElement("input");g.type="range",g.className="bloom-csi-zoom",g.min=String(yc),g.max=String(vc),g.step="0.05",g.setAttribute("aria-label","Zoom");let E=document.createElement("span");E.className="bloom-csi-zoom-val";let h=document.createElement("button");h.type="button",h.className="bloom-csi-btn",h.textContent="Reset",b.append(g,E,h);let x=document.createElement("p");x.className="bloom-csi-hint",x.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,b,x),t.append(u,d,f);function ft(){let v=String(T.store.avatarSource??""),N=String(T.store.avatarUrl??"");return v.startsWith("data:image/")?v:N.startsWith("data:image/")?N:""}function mt(v,N,y){if(!a)return i.x=v,i.y=N,i.zoom=ot(y,yc,vc),i;let H=Ja(a.w,a.h,y,v*a.w,N*a.h);return i.x=H.x/a.w,i.y=H.y/a.h,i.zoom=H.z,i}function Z(){g.value=String(i.zoom),E.textContent=`${Math.round(i.zoom*100)}%`;let v=a?Ja(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;v&&a&&(p.style.width=`${a.w/v.side*100}%`,p.style.height=`${a.h/v.side*100}%`,p.style.left=`${(.5-v.x/v.side)*100}%`,p.style.top=`${(.5-v.y/v.side)*100}%`)}function O(v=!1){let N=ft(),y=String(T.store.avatarUrl??"").trim(),H=!!N;s.hidden=!y&&!N,(N||y)&&(s.src=N||y),document.activeElement!==l&&(l.value=H?"":y),l.placeholder=H?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!N,d.hidden=!(e&&/^https?:\/\//.test(y)&&!N),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",N&&(v&&(i.x=Pn(T.store.cropX,.5),i.y=Pn(T.store.cropY,.5),i.zoom=Pn(T.store.cropZoom,1)),p.getAttribute("src")!==N&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},mt(i.x,i.y,i.zoom),Z()},p.src=N),Z())}function lt(v,N,y,H=!1){mt(v,N,y),Z();let pt=ft(),vt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,pt&&wc(pt,i.x,i.y,i.zoom).then(I=>{I&&(T.store.avatarUrl=I)})};r&&clearTimeout(r),H?vt():r=setTimeout(vt,80)}function yt(v){T.store.avatarUrl=v;let N=v.trim();if(n&&clearTimeout(n),!N){T.store.avatarSource="",Sc(),e=!1,O(!0);return}if(N.startsWith("data:image/")){e=!1,n=setTimeout(()=>{za(N).then(y=>{if(!y)return;let H=xc(y);y.close(),H&&Ec(H).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(N)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{za(N).then(y=>{if(!y){e=!0,O(!0);return}let H=xc(y);y.close(),H?(e=!1,Ec(H).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",v=>{Yo(v.clipboardData)&&(v.preventDefault(),e=!1,bc(v.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",v=>{Yo(v.dataTransfer)&&v.preventDefault()}),u.addEventListener("drop",v=>{Yo(v.dataTransfer)&&(v.preventDefault(),e=!1,bc(v.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>yt(l.value)),l.addEventListener("paste",v=>{Yo(v.clipboardData)&&(v.preventDefault(),e=!1,bc(v.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",v=>{ft()&&!l.value&&(v.key==="Backspace"||v.key==="Delete")&&(tp(),e=!1,O(!0))}),c.addEventListener("click",()=>{tp(),e=!1,O(!0)}),m.addEventListener("pointerdown",v=>{v.button===0&&(m.setPointerCapture(v.pointerId),o.on=!0,o.px=v.clientX,o.py=v.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",v=>{if(!o.on||!a)return;let N=m.clientWidth;if(!N)return;let{side:y}=Ja(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);mt(o.x-(v.clientX-o.px)*(y/N)/a.w,o.y-(v.clientY-o.py)*(y/N)/a.h,i.zoom),Z()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,lt(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",v=>{v.preventDefault(),lt(i.x,i.y,i.zoom*(v.deltaY<0?1.08:1/1.08))},{passive:!1}),g.addEventListener("input",()=>lt(i.x,i.y,Number(g.value))),g.addEventListener("change",()=>lt(i.x,i.y,Number(g.value),!0)),h.addEventListener("click",()=>lt(.5,.5,1,!0));let Zo=()=>O(!1);return es=Zo,O(!0),()=>{es===Zo&&(es=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var mp=w({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Qm,cleanupSelectors:[`.${mx}`,`.${px}`],settings:T,start(){Nt=!0,Nn.clear(),mc(Xo),k(Qm,Zm),Xa=new AbortController,document.addEventListener("click",Nx,{signal:Xa.signal}),fp(40),sp(),Jm.debug("started")},onSettingsChange(){Nn.clear(),es?.(),Nt&&(Lc(),rs())},stop(){Nt=!1,Xa?.abort(),Xa=null,Nr&&cancelAnimationFrame(Nr),Nr=0,Qa&&cancelAnimationFrame(Qa),Qa=0;for(let t of Ye.values())t.disconnect();Ye.clear(),Se?.disconnect(),Se=null,Rr=null,se?.disconnect(),se=null,ts=null,Lx(),L(np),mc(null),Nn.clear(),Jm.debug("stopped")}});var Pr=new C("Bloom"),pp=!1,Px=Date.now(),Ox=[ju,kd,Od,_d,jd,Wd,lf,uf,mf,Rf,$f,Vf,Yf,hm,Mm,Hm,_m,mp];function os(t){return new Promise(e=>setTimeout(e,t))}function Bx(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function Dx(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var bp=8e3,gp=300,_x=250;async function qx(){if(Je())return await os(gp),!0;for(;Date.now()-Px<bp;)if(await os(_x),Je())return await os(gp),!0;return Je()||Ts()}function kc(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function $x(){if(kc())return!0;let t=Date.now()+bp;for(;Date.now()<t;)if(await os(100),kc())return!0;return kc()}function Fx(){try{GM_registerMenuCommand?.("Bloom++ settings",zu)}catch{}}function zx(){gi(()=>{Br("HostShell"),Pr.info("host shell",Et)}),bi(()=>{Pr.info("idle ready",Et)}),hi(()=>{ss(),Br("HostReady"),Pr.info("chrome ready",Et)})}async function Cc(){await zc()}async function Mc(){if(pp)return;pp=!0,pu();let t=A();t&&fe(t);for(let r of Ox)try{Yc(r),wu(r)}catch(o){Pr.error("register failed",r.name,o)}Br("Init"),Fx(),zx();let e=()=>Br("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Bx(),ss(),Pr.info("styles ready",Et),await Dx(),$x().then(r=>{r&&yi()}),!await qx()){Pr.warn("late islands not detected; starting default plugins",Et),zn(),vi();return}await xu()}var hp=typeof unsafeWindow<"u"?unsafeWindow:window,jx=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||jx){let t=hp.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Et);try{Object.defineProperty(hp,"Bloom",{value:Ac,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Cc().then(()=>Mc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
