// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.108
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

/* Bloom++ [20260924] v1.4.108. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var hp=Object.defineProperty;var bp=(t,e)=>{for(var n in e)hp(t,n,{get:e[n],enumerable:!0})};var kc={};bp(kc,{REPO_URL:()=>xu,Settings:()=>F,VERSION:()=>Et,contextKeyFromUrl:()=>le,conversationChain:()=>Pr,conversationTitle:()=>Dn,conversationToken:()=>Pt,currentConversationId:()=>R,ensureConversationChain:()=>mu,hasDraftText:()=>Wt,hasErrorToast:()=>Xt,hasLateIslands:()=>Ze,init:()=>Lc,initSettings:()=>Tc,isDocumentInteractive:()=>Eu,isStreaming:()=>V,isUserDraftEmpty:()=>He,messageCreateTime:()=>pi,plugins:()=>se,requestChromeReady:()=>xi,requestIdleReady:()=>_n,requestShellReady:()=>vi,setEditorText:()=>fe,subscribeHarvest:()=>wt,watchStreamingEdge:()=>dt,whenChromeReady:()=>yi,whenIdleReady:()=>bi,whenShellReady:()=>hi});var Se=new Map,Yo=!1;function yp(){return document.getElementById("bloom-root")?.shadowRoot??null}function Mc(){return document.head??null}function Nn(){let t=yp();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=vp()}function ls(t,e){if(!Yo)return;let n=Mc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Nn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Nn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Nn()}function k(t,e){let n=Se.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Se.set(t,n)),Yo&&ls(t,n)}function cs(){if(!Mc())return!1;Yo=!0;for(let[e,n]of Se)ls(e,n);return Nn(),!0}function Ac(t){let e=Se.get(t);e&&(e.disabled=!1,Yo&&ls(t,e))}function Hc(t){let e=Se.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Nn())}function L(t){let e=Se.get(t);e&&(e.el?.remove(),Se.delete(t),Nn())}function vp(){return Array.from(Se.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var C=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function E(t){return t}var us=new Map;function Pn(t,e){let n=us.get(t);return n||(n=new Set,us.set(t,n)),n.add(e),()=>n.delete(e)}function Ye(t,e){let n=us.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var xp="bloompp";function Ic(){return new Promise((t,e)=>{let n=indexedDB.open(xp,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Rc(t){try{let e=await Ic();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Nc(t,e){try{let n=await Ic();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function it(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function at(t,e,n){return Math.min(n,Math.max(e,t))}function Pc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Oc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Bc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Xo=new C("SettingsStore"),Te="BloomSettings",wp=100;function Zo(t){return t!=null&&typeof t.then=="function"}function Ep(t){if(t==null||Zo(t))return null;if(it(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(it(e)&&!Zo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return it(n)&&!Zo(n)?n:null}return null}catch{return null}}function Qo(t){let e=Ep(t);if(!e)return null;let n=e.plugins;return!it(n)||Zo(n)||Object.keys(n).length===0?null:e}function fs(t){return it(t)?t:null}function ds(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:it(t)?Object.keys(t).length===0:!1}function Sp(t){return ds(t)?0:Array.isArray(t)?12+Math.min(t.length,40):it(t)?12+Math.min(Object.keys(t).length,40):3}function Xe(t){if(!t)return-1;let e=t.plugins;if(!it(e))return-1;let n=0;for(let r of Object.values(e)){let o=fs(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=Sp(a))}return n}function Dc(t){let e=t.plugins;if(!it(e))return 0;let n=0;for(let r of Object.values(e))fs(r)?.enabled===!0&&n++;return n}function _c(t){let e=t.map((i,a)=>({bag:i,index:a,score:Xe(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=Dc(a.bag)-Dc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!it(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(it(a))for(let[s,l]of Object.entries(a)){let c=fs(l);if(!c)continue;if(!it(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}ds(u[d])&&!ds(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return it(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Xe(n)}}var Jo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return it(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Xo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},wp))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Te,this.plain)}catch{try{GM_setValue(Te,e)}catch(n){Xo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Te,e)}catch{}Nc(Te,e).catch(n=>Xo.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){Xo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Pc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Tp=new C("Settings"),Lp={plugins:{}},F=new Jo(structuredClone(Lp)),kp=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Cp(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function M(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?Le(n):{}},get plain(){let n=e.pluginName;return n?F.plain.plugins[n]??{}:{}}};return e}async function Mp(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function qc(){let t=Qo(await Mp(Te)),e=Qo(await Rc(Te)),n=null;try{n=Qo(localStorage.getItem(Te))}catch{n=null}let r=_c([t,e,n]);if(r){let o=r.bag.plugins;o&&(F.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);Tp.info("Loaded settings from",i,"richness",r.score,"gm",Xe(t),"idb",Xe(e),"ls",Xe(n))}F.releasePersist(),r&&(r.index!==0||r.score>Xe(t))&&F.persistLoadedBag()}function Le(t){return F.plain.plugins[t]||(F.plain.plugins[t]={}),F.store.plugins[t]}function $c(t,e){e&&(e.pluginName=t,Le(t),F.setDefaultGetter(kp(t),n=>{if(n!=="enabled")return Cp(e.def,n)}))}function Fc(){return Le("Settings")}function ti(){return Fc().pinnedPlugins??[]}function zc(t){return ti().includes(t)}function jc(t){let e=ti(),n=e.includes(t);return F.store.plugins.Settings={...F.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function ei(){return Fc().starredPlugins??[]}function Gc(t){return ei().includes(t)}function Uc(t){let e=ei(),n=e.includes(t);return F.store.plugins.Settings={...F.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var ni=new C("PluginManager"),se={},Hr=new Set;function Kc(t){if(se[t.name]){ni.warn("Duplicate plugin",t.name);return}se[t.name]=t,$c(t.name,t.settings)}function On(t){let e=se[t];if(!e)return!1;if(e.required)return!0;let n=F.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Wc(t){let e=se[t];if(!e||e.required)return;let n=!On(t);Le(t),F.store.plugins[t].enabled=n,n?Vc(e):Ap(e),Ye("pluginToggle",{name:t,enabled:n})}function Vc(t,e=!1){if(!Hr.has(t.name)&&On(t.name))try{t.managedStyle&&Ac(t.managedStyle),t.start?.(),Hr.add(t.name),t.settings&&F.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Hr.has(t.name)&&t.onSettingsChange?.()}),e||ni.debug("Started",t.name)}catch(n){ni.error("Failed to start",t.name,n)}}function Ap(t){if(Hr.has(t.name)){try{t.stop?.()}catch(e){ni.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Hc(t.managedStyle),L(t.managedStyle)),Hr.delete(t.name)}}function Ir(t){for(let e of Object.values(se))(e.startAt??"DOMContentLoaded")===t&&Vc(e)}var Yc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Pt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function le(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ce(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Yc)?.[1]??""}catch{return t.match(Yc)?.[1]??""}}function R(){return ce(location.pathname)}var Zc=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i;function ii(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function ps(t,e){return e!=="GET"||ii(t)?!1:Zc.test(t)}function ai(t){return t.match(Zc)?.[1]??""}function si(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return si(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function gt(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function gs(t){let e=gt(t);return e?!e.mapping&&gt(e.conversation)?e.conversation:e:null}function Hp(t){let e=t.match(/[?&]num_turns=(\d+)/i);if(!e)return 0;let n=Number(e[1]);return Number.isFinite(n)&&n>0?n:0}function Xc(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function ms(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=Xc(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?Xc(n.text):""}function oi(t){let e=gt(t.metadata);if(e?.is_visually_hidden_from_conversation===!0||e?.is_user_system_message===!0||e?.user_context_message===!0)return"";let r=gt(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function Ip(t){return(gt(t.author)?.role??t.role)==="user"}function Rp(t){let e=typeof t.recipient=="string"?t.recipient.toLowerCase():"";if(e&&e!=="all"||(gt(t.author)?.role??t.role)==="tool")return!0;let o=gt(t.content),i=(typeof o?.content_type=="string"?o.content_type:"").toLowerCase();if(/thought|reasoning/.test(i)||i==="code"||i==="execution_output"||/^(?:tether_|computer_)/.test(i))return!0;let a=typeof t.channel=="string"?t.channel.toLowerCase():"";return!!(/^(?:commentary|thought|thoughts|reasoning|analysis)$/.test(a)&&t.end_turn!==!0)}function Jc(t){return!!oi(t)&&!Rp(t)}function Qc(t){let e=[];for(let n of t){let r=e[e.length-1];if(r&&r.role==="assistant"&&n.role==="assistant"){let o=n.alias||r.alias||(r.id!==n.id?r.id:void 0),i=n.at??r.at;e[e.length-1]={id:n.id,role:"assistant",text:n.text||r.text,...o&&o!==n.id?{alias:o}:{},...i?{at:i}:{}};continue}e.push(n)}return e}function Np(t,e){let n=eu(t,e);if(!n)return!0;let r=new Set,o=n,i=null;for(;o&&e[o]&&!r.has(o);){r.add(o);let a=gt(e[o]);i=a&&typeof a.parent=="string"?a.parent:null,o=i}return!!(i&&!e[i])}function tu(t){let e=gs(t);if(!e)return!1;let n=gt(t);for(let a of[e,n])if(a&&(a.has_more===!0||a.has_more_before===!0||a.truncated===!0))return!0;let r=gt(e.mapping);if(r&&Object.keys(r).length)return Np(e,r);let o=Array.isArray(e.turns)?e.turns:Array.isArray(e.messages)?e.messages:Array.isArray(e.items)?e.items:[],i=Number(e.num_turns??e.turn_count??e.total_turns??e.total);return Number.isFinite(i)&&i>o.length&&o.length>0}function hs(t,e=""){return!(tu(t)||!li(t).length||Hp(e))}function eu(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?si(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function Pp(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null;if(l&&Jc(l)){let c=oi(l),u=typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:ms(l)};u!==o&&(d.alias=o);let f=si(l.create_time??l.createTime);f&&(d.at=f),n.push(d)}}else l&&Ip(l)&&n.push({id:"",role:"user",text:""});o=typeof s.parent=="string"?s.parent:null}return n.reverse(),Qc(n).filter(a=>a.id)}function ri(t){return t.length<=480?t:t.slice(t.length-480)}function bs(t,e){if(!e.length)return t;if(!t.length)return ri(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(K=>K.id)),m=n.has(e[e.length-1].id),g=e.filter(K=>!f.has(K.id)),h=e[e.length-1].at,p=e[0].at,w=t[0].at,b=t[t.length-1].at,v=m||!!h&&!!w&&h<=w,ot=!!p&&!!b&&p>=b;return ri(v&&!ot?[...g,...t]:[...t,...g])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return ri([...s,...l,...u,...d])}function Op(t){let e=[],n=new Set;for(let r of t){let o=gt(r);if(!o)continue;let i=gt(o.message)??o;if(!Jc(i))continue;let a=oi(i)||oi(o);if(!a)continue;let s=typeof i.id=="string"&&i.id||typeof o.message_id=="string"&&o.message_id||typeof o.id=="string"&&o.id||"";if(!s||n.has(s))continue;n.add(s);let l={id:s,role:a,text:ms(i)||ms(o)},c=typeof o.id=="string"&&o.id&&o.id!==s?o.id:"";c&&(l.alias=c);let u=si(i.create_time??i.createTime??o.create_time??o.createTime);u&&(l.at=u),e.push(l)}return Qc(e)}function Bp(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=eu(t,n);return r?Pp(n,r):[]}function li(t){let e=gs(t);if(!e)return[];let n=Bp(e);if(n.length)return n;let r=Array.isArray(e.turns)?e.turns:Array.isArray(e.messages)?e.messages:Array.isArray(e.items)?e.items:[];return r.length?Op(r):[]}function nu(t,e=""){let n=gt(t);if(!n)return e;let r=gs(t)??n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function ru(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var lu=new C("Harvest"),Dp=1500,_p=200,qp=8,ci=new Set,ui=new Map,di=new Map,fi=new Map,ou=[],$p=new Set;var iu=new Map,Fp={Accept:"application/json"},zp=/^(authorization|oai-|openai-|chatgpt-|x-authorization)/i;var Bn=null,mi=null,Rr=null,Ot=0,cu=!1;function jp(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Gp(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Up(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var Kp=/"action"\s*:\s*"(next|continue|variant)"/i;function Wp(t,e,n){return!(e!=="POST"||ii(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Kp.test(n))}function uu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Vp(t){return typeof t=="string"?uu(t):""}function ys(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return ys(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function vs(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function au(t,e,n){!t||!e||di.get(t)!==e&&(di.set(t,e),vs(di,Dp),ue({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Yp(t,e){let n=e.trim();!t||!n||ui.get(t)!==n&&(ui.set(t,n),vs(ui,_p),ue({type:"conversation-meta",conversationId:t,title:n}))}function Xp(t){let e=iu.get(t);e!==void 0&&(clearTimeout(e),iu.delete(t))}function Zp(t,e,n=""){let r=nu(e,t);if(!r)return;let o=li(e);if(!o.length)return;let i=fi.get(r)??[],a=bs(i,o);hs(e,n)&&($p.add(r),Xp(r)),ru(i,a)||(fi.set(r,a),vs(fi,qp),ue({type:"conversation-chain",conversationId:r}))}function Nr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Nr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Yp(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=ys(l.create_time??l.createTime??l.created_at);c&&u&&au(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=ys(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&au(a,s,o),r.mapping&&typeof r.mapping=="object")Nr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Nr(l,o,n+1)}function su(t,e){if(t)try{Nr(JSON.parse(t),e)}catch{}}function ue(t){for(let e of Array.from(ci))try{e(t)}catch{}}function Jp(t,e){let n=e?.headers??(typeof Request<"u"&&t instanceof Request?t.headers:null);if(!n)return;let r=n instanceof Headers?n.entries():Array.isArray(n)?n:Object.entries(n);for(let[o,i]of r)typeof i=="string"&&zp.test(o)&&(Fp[o]=i)}async function Qp(t,e,n,r){if(n===Ot)try{let o=await t.json();if(n!==Ot)return;Nr(o,e),Zp(e,o,r)}catch{}}async function tg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Ot&&ue({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Ot;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=uu(c);m&&(o=m,ue({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let g=m.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||su(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Ot&&su(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Ot&&ue({type:"post-end",conversationId:o,error:i})}function eg(t,e,n){let r=Gp(e),o=Up(e,n),i=ps(r,o),a=Wp(r,o,n?.body),s=Ot,l="";return a&&(l=Vp(n?.body)||ai(r)||ce(r)||R(),ue({type:"post-start",conversationId:l,url:r})),i&&Jp(e,n),t(e,n).then(c=>{if(s!==Ot||!i&&!a)return c;try{let u=c.clone();i?Qp(u,ai(r)||R(),s,r):tg(u,l,!c.ok,s)}catch{a&&ue({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Ot&&ue({type:"post-end",conversationId:l,error:!0}),c})}function du(){if(Bn)return;let t=jp();Rr=t,Bn=t.fetch.bind(t);let e=(n,r)=>eg(Bn,n,r);mi=e,t.fetch=e,lu.debug("conversation fetch harvest hooked")}function ng(){Ot+=1,!(!Bn||!Rr)&&(mi&&Rr.fetch===mi&&(Rr.fetch=Bn),Bn=null,mi=null,Rr=null,lu.debug("conversation fetch harvest unhooked"))}function rg(){Ot+=1,!cu&&ng()}function fu(){cu=!0,du()}function mu(t){}function wt(t){return ci.add(t),du(),()=>{ci.delete(t),ci.size===0&&rg()}}function Dn(t){return t?ui.get(t)??"":""}function pi(t){return t?di.get(t)??null:null}function Pr(t){return t?fi.get(t)??ou:ou}var Or=!1,gi=!1,xs=!1,gu=[],hu=[],bu=[];function ws(t){let e=t.splice(0);for(let n of e)n()}function Br(){Or||(Or=!0,ws(gu))}function Es(){gi||(gi=!0,Or||Br(),ws(hu))}function yu(){xs||(xs=!0,Or||Br(),gi||Es(),ws(bu))}function hi(t){Or?t():gu.push(t)}function bi(t){gi?t():hu.push(t)}function yi(t){xs?t():bu.push(t)}function vi(){Br()}function _n(){Br(),Es()}function xi(){yu()}function pu(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function vu(){await pu(4e3),Br(),await pu(4e3),Es(),yu()}var S={p:"0-V-linuxdo"},Et="[20260924] v1.4.108",xu="https://github.com/0-V-linuxdo/Bloom";var og={BetterNavigator:1790263934e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790252301e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function wu(t){let e=og[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function ig(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function ag(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ss(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Ze(){return Ss()?ig()||ag():!1}function Eu(){return Ze()}var sg=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Su=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),lg=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),cg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function $n(t){return t.id==="bloom-root"||!!t.closest(cg)}function Tu(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function wi(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Ts(t){if(!(t instanceof HTMLElement)||!t.isConnected||$n(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&wi(e)?!1:t.getClientRects().length>0}function qn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function ug(){let t=[];for(let e of document.querySelectorAll(sg))!(e instanceof HTMLElement)||!e.isConnected||$n(e)||t.push(e);return t}function Ei(t){if(!t.isConnected||$n(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Je(){return ug().filter(Ei)[0]??null}function Fn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||$n(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Ls(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!$n(n)&&!qn(n)&&n.parentElement&&!qn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!qn(r)&&!$n(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!qn(r.parentElement))return r}return e}function zn(){let t=document.querySelectorAll(Su);for(let n of t)if(Ts(n)&&!wi(n)&&Tu(n))return n;let e=document.querySelectorAll(lg);for(let n of e){if(!Ts(n)||!Tu(n)||wi(n))continue;let r=n.querySelector(Su);return Ts(r)&&!wi(r)?r:n}return null}function Si(){let t=Je();if(t){let e=Ls(t),n=e.parentElement;if(n&&!qn(n))return n;if(!qn(e))return e}return Fn()}function Ti(t){let e=Je();return e?t.composedPath().includes(e):!1}var Cs=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],dg={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function fg(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function mg(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function ks(t){let e=fg(t);return e?mg(e)>.55?"light":"dark":null}function pg(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=ks(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=ks(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ks(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Li(t){return t==="auto"?pg():t}function gg(t){try{let e=getComputedStyle(document.documentElement);for(let n of Cs){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function ki(t,e,n){let r=dg[e];if(n){gg(t);for(let o of Cs)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Cs)t.style.setProperty(o,r[o])}function Lu(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Ms=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var bg="bloom-root",Ut="bloom-rail-item",Ii="bloom-account-item",tn="bloom-sidebar-panel",Ur="bloom-plugin-dialog",_i="bloom-plugin-layer",Ri="bloom-settings-css",yg=2e3,Mu=null,vg=null,Ae=!1,Rs=[],Ci=null,Ni=null,Ce=null,Ai=null,de=null,zr=null,Dr,jn=0,jr=0,_r=0,qr=null,$r=null,Pi=null,Au=null,Fr=null,As=[],Oi=!1,xg=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],wg=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Eg=new Set(["chat","ui","privacy"]),Sg=10080*60*1e3,qi="",Gr="all",Gt="all";function $i(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Hu(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Tg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Lg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function kg(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Cg(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Mg={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Ag(t){return t.icon||Mg[t.name]||$i()}function Hs(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),ki(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Iu(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Bi(){let t="auto",e=Li(t);Hs(Mu,e,!0);let n=document.getElementById(tn);n instanceof HTMLElement&&Hs(n,e,!0);let r=document.getElementById(Ur);r instanceof HTMLElement&&Hs(r,e,!0);let o=document.getElementById(Ut);o instanceof HTMLElement&&Iu(o),Ye("schemeChange",{scheme:e,pref:t})}function Ru(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Nu(){if(k("settings",Ms),document.getElementById(Ri)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Ri,t.textContent=Ms,document.head.appendChild(t)}function Hg(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Ig(){for(let t of Rs)t();Rs=[]}function Pu(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Rg(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Os(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Ng(t){return Os(t).length>0}function Hi(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Pg(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Rg(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Og(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Pg(e,n));let i=Le(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Rs.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Hi(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Hi(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Pu(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Hi(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function ku(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Bg(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=Le(t.name);for(let[n,r]of Os(t)){if(n==="enabled"||r.type===5)continue;let o=Hi(r);o!==void 0&&(e[n]=o)}Bu(t)}function Ou(t){t.key==="Escape"&&(!document.getElementById(_i)&&!document.getElementById(Ur)||(t.stopPropagation(),Gn()))}function Dg(){Oi||(document.addEventListener("keydown",Ou),Oi=!0)}function _g(){Oi&&(document.removeEventListener("keydown",Ou),Oi=!1)}function Gn(){Ig(),_g(),document.getElementById(_i)?.remove(),document.getElementById(Ur)?.remove()}function Bu(t){if(Gn(),!document.body)return;let e=document.createElement("div");e.id=_i,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Me),e.addEventListener("pointerup",Me),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Gn()});let n=document.createElement("div");n.id=Ur,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Me),n.addEventListener("pointerup",Me),n.addEventListener("click",Me);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Hu(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Gn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=ku("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=ku("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Os(t);if(c.length)for(let[u,d]of c){let f=Og(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Bg(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Dg(),Bi()}function qg(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Ag(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Gc(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=kg(l),c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let p=Uc(t.name);Ye("pluginStar",{name:t.name,starred:p})}),s.appendChild(c),!t.required){let h=zc(t.name),p=document.createElement("button");p.type="button",p.className=`bloom-icon-btn bloom-card-pin${h?" bloom-card-pin-active":""}`,p.setAttribute("aria-label",h?"Unpin from top":"Pin to top"),p.innerHTML=Cg(h),p.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let b=jc(t.name);Ye("pluginPin",{name:t.name,pinned:b})}),s.appendChild(p)}if(Ng(t)){let h=document.createElement("button");h.type="button",h.className="bloom-icon-btn bloom-card-settings",h.setAttribute("aria-label",`${t.name} settings`),h.innerHTML=Lg(),h.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),Bu(t)}),s.appendChild(h)}let u=Pu(t.name,On(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",h=>h.stopPropagation()),d?.addEventListener("change",()=>{Wc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let h=document.createElement("div");h.className="bloom-card-desc",h.textContent=t.description,n.appendChild(h)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(g),e.append(n,f,m),e}function Du(){return Object.values(se).filter(t=>!t.hidden&&t.name!=="Settings")}function $g(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Sg}function _u(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return $g(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Eg.has(r)):n.includes(e)}function Fg(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function zg(){return qi.trim()?"No plugins match your search.":Gt==="favorites"?"No favorites yet. Star a plugin to see it here.":Gt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function jg(){let t=Du();return wg.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>_u(n,e.id)))}function Gg(){if(Fr){Fr.replaceChildren();for(let t of jg()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Gt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Gt=t.id,Qe()}),Fr.appendChild(e)}}}function Ug(){let t=Du();if(Gt==="favorites"){let e=new Set(ei());t=t.filter(n=>e.has(n.name))}else Gt!=="all"&&(t=t.filter(e=>_u(e,Gt)));return Gr==="enabled"&&(t=t.filter(e=>On(e.name))),Gr==="disabled"&&(t=t.filter(e=>!On(e.name))),t}function Qe(){if(!qr)return;Gg();let t=Ug();Pi&&(Pi.placeholder=`Search ${t.length} plugins...`);let e=t,n=qi.trim().toLowerCase();if(n&&(e=e.filter(r=>Fg(r).includes(n))),Gt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Gt!=="favorites"){let r=ti();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}qr.replaceChildren();for(let r of e)qr.appendChild(qg(r));$r&&($r.hidden=e.length>0,$r.textContent=zg())}function Me(t){t.stopPropagation()}function Is(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Bs(){document.getElementById(Ut)?.setAttribute("aria-expanded",Ae?"true":"false")}function Kg(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Ds(){Gn(),qi="",Gr="all",Gt="all",document.getElementById(tn)?.remove(),Ae=!1,Bs()}function Wg(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Me),e.addEventListener("pointerup",Me),e.addEventListener("click",Me);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=$i();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Tg();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Hu(),d.addEventListener("click",Ds),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let g=document.createElement("input");g.type="search",g.className="bloom-search-input",g.setAttribute("aria-label","Search plugins"),g.placeholder="Search plugins...",g.addEventListener("input",()=>{qi=g.value,Qe()});let h=document.createElement("select");h.className="bloom-search-filter",h.setAttribute("aria-label","Filter plugins");for(let b of xg){let v=document.createElement("option");v.value=b.value,v.textContent=b.label,h.appendChild(v)}h.value=Gr,h.addEventListener("change",()=>{Gr=h.value,Qe()}),m.append(g,h),n.appendChild(m);let p=document.createElement("div");p.className="bloom-plugin-list",n.appendChild(p);let w=document.createElement("p");return w.className="bloom-tab-empty",w.hidden=!0,n.appendChild(w),e.append(d,n),qr=p,$r=w,Pi=g,Au=h,Fr=f,Qe(),e}function Vg(t){t.classList.add("bloom-rail-dock")}function Yg(){let t=document.getElementById(Ut);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Ei(t)?t:null}function Xg(){if(document.getElementById(tn)?.remove(),!document.body)return;let t=Wg(tn);Vg(t),document.body.appendChild(t),Ae=!0,Gn(),Bi(),Bs(),Ye("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Et,dock:"center",rail:!!Yg()})}function _s(){let t=document.getElementById(tn);if(t instanceof HTMLElement&&t.isConnected&&Kg(t)){Ds();return}t?.remove(),Xg()}function Zg(){let t=document.createElement("button");return t.type="button",t.id=Ut,t.className="bloom-rail-item",t.setAttribute("aria-controls",tn),t.setAttribute("aria-expanded",Ae?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${$i()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),_s()}),t}function Cu(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Jg(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Qg(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function ke(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function qu(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Jg(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&ke(t,"padding-top",Math.round(i)),Number.isFinite(a)&&ke(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));ke(n,"width",l),ke(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&ke(t,"padding-left",u);let d=Qg(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),g=Math.round(f.left-m.right);g>=0&&g<=24&&ke(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&ke(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&ke(t,"gap",Math.round(l))}Iu(t)}function Ns(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function th(){if(zr?.isConnected&&de){de.observe(zr,{childList:!0});return}Ps()}function eh(t){if(Ns(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function nh(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){_r=0;return}_r+=1,jr=Date.now()+Math.min(8e3,250*2**Math.min(_r,5))})}function rh(){jn||Date.now()<jr||(jn=requestAnimationFrame(()=>{jn=0,!(Date.now()<jr)&&(document.getElementById(Ut)?.isConnected||Di())}))}function Di(){if(!document.body)return;de?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Ut);t=n instanceof HTMLButtonElement?n:Zg();let r=Je(),o=Fn();if(r){let i=Ls(r),a=i.parentElement;if(Ns(i)||a&&Ns(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Cu(t),qu(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Cu(t,!0)):t.isConnected&&!Ei(t)&&(t.remove(),t=null)}finally{nh(t,e),th(),Bs()}}function Ps(){let t=Si();!t||!eh(t)||zr===t&&de||(de?.disconnect(),zr=t,de=new MutationObserver(()=>{document.getElementById(Ut)?.isConnected||rh()}),de.observe(t,{childList:!0}))}function oh(){Di(),Ps(),Dr===void 0&&(Dr=window.setInterval(()=>{let t=document.getElementById(Ut);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=jr&&Di();else{_r=0;let e=Je();e&&qu(t,e)}Ps()},yg))}function ih(){Dr!==void 0&&(clearInterval(Dr),Dr=void 0),jn&&cancelAnimationFrame(jn),jn=0,jr=0,_r=0,de?.disconnect(),de=null,zr=null}function ah(t){Ai===t&&Ce||(Ce?.disconnect(),Ai=t,Ce=new MutationObserver(()=>{if(!t.isConnected){Ce?.disconnect(),Ce=null,Ai=null;return}$u(t)}),Ce.observe(t,{childList:!0}))}function $u(t){if(ah(t),t.querySelector(`#${Ii}`))return;let e=document.createElement("button");e.type="button",e.id=Ii,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${$i()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Is),e.addEventListener("pointerup",Is),e.addEventListener("click",n=>{Is(n),_s()}),t.insertBefore(e,t.firstChild)}function Mi(){let t=zn();return t?($u(t),!0):!1}function sh(t){Ti(t)&&(queueMicrotask(Mi),requestAnimationFrame(()=>{Mi()}),window.setTimeout(Mi,60),window.setTimeout(Mi,180))}function lh(){Ni?.abort();let t=new AbortController;Ni=t,document.addEventListener("click",sh,{signal:t.signal})}function ch(){Ni?.abort(),Ni=null,Ce?.disconnect(),Ce=null,Ai=null}function Fu(){_n(),Hg(()=>{Nu(),Ru(),Di(),_s()})}var zu=E({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${bg}`,`#${Ut}`,`#${Ii}`,`#${tn}`,`#${_i}`,`#${Ur}`,`#${Ri}`,"#bloom-menu-panel"],start(){Nu(),Ru(),oh(),lh(),Ci?.(),Ci=Lu(Bi),Bi(),As=[Pn("pluginToggle",()=>{Ae&&Qe()}),Pn("pluginPin",()=>{Ae&&Qe()}),Pn("pluginStar",()=>{Ae&&Qe()})]},stop(){ih(),ch(),Ci?.(),Ci=null;for(let t of As)t();As=[],Ds(),document.getElementById(Ut)?.remove(),document.getElementById(Ii)?.remove(),document.getElementById(Ri)?.remove(),Mu=null,vg=null,qr=null,$r=null,Pi=null,Au=null,Fr=null,Ae=!1}});var Fi='form[data-type="unified-composer"], form.w-full[data-type]',Kt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Un=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),ju=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Gu=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),uh=/stop streaming|stop generating|停止生成|停止输出|停止响应/,dh='[contenteditable="false"], button, [role="button"]';function Bt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function en(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Bt(o)))return o;return null}function Uu(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function z(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Uu(t);return!!(uh.test(n)||/^stop$/i.test(n))}function Dt(){let e=Array.from(document.querySelectorAll(Fi)).find(Bt);if(e instanceof HTMLElement)return e;let n=en(document,Kt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function st(){let t=Array.from(document.querySelectorAll(Kt));return t.find(Bt)??t[0]??null}function fh(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(dh);return!!n&&n!==e&&e.contains(n)}function qs(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&fh(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Wt(t){let e=t??st();return e?qs(e,e).replaceAll("\u200B","").trim().length>0:!1}function He(t){return!Wt(t)}function zi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Ku(t){let e=Dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Bt(n))&&t(n))return n;return null}function Ie(){let t=Dt(),e=en(t,Un)??en(document,Un);return e&&!z(e)?e:Ku(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!z(n);let o=Uu(n);return/^(send|send prompt|发送)$/i.test(o)&&!z(n)})}function nn(){let t=Dt(),e=en(t,ju,!0)??en(document,ju,!0);if(e)return e;let n=en(t,Gu)??en(document,Gu);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Bt(r)&&z(r))return r}return Ku(z)}function Vt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>qs(n,t)).join(`
`):qs(t,t)}function $s(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function fe(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),$s(t,n)}var Vu=new C("Streaming");function Xr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Bt(e))&&(z(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function mh(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Bt(t))}function ph(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Bt(t))}function gh(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Xt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function V(){if(nn()||Xr()||gh())return!0;let t=Ie();return t&&Bt(t)&&!z(t)?!1:!!(mh()||ph())}var hh=400,Wu=3,sn=new Set,Kr,Wr=null,Fs=null,on=!1,rn=0,Ne="",Pe="",Oe=!1,Vr=!1,Yr=!1,Yt=!1,Q=null,St="",an=!1;function j(){return Yt}function ln(){return Oe}function Kn(){return St}function zs(){return R()||St}function Yu(){return le(Pt())}function ji(t,e){return{streaming:t,contextKey:e,conversationId:zs()}}function js(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function bh(t){return!t||t==="/"||t.startsWith("/g/")}function Y(t,e){if(!t||t===e)return!1;let n=ce(js(e)||e);return!n||!(t.endsWith("|draft")||bh(js(t)))?!1:St?n===St:an}function Gi(){on=!1,rn=0,Ne="",Oe=!1,Vr=!1,Yr=!1,St="",an=!1}function yh(t){for(let e of Array.from(sn))try{e.onFall?.(t)}catch{}}function vh(t){for(let e of Array.from(sn))try{e.onRise?.(t)}catch{}}function Re(t){for(let e of Array.from(sn))try{e.onTick?.(t)}catch{}}function xh(t,e){for(let n of Array.from(sn))try{n.onContext?.(t,e)}catch{}}function wh(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&z(n)&&(Oe=!0)}function Eh(t){if(t.type==="post-start"){let n=R();if(!t.conversationId){n||(an=!0),(!n||n===St)&&(Yt=!1,Oe=!1);return}if(!(t.conversationId===n||t.conversationId===St)&&!(!n&&an))return;St=t.conversationId,an=!1,Yt=!1,Oe=!1;return}if(t.type!=="post-end"||!on&&!Q)return;let e=R();t.conversationId&&!(e?t.conversationId===e:t.conversationId===St)||(Yr=!0,t.error&&(Vr=!0,Q&&(Q.error=!0)))}function Sh(){let t=Yu(),e=V();if(Pe&&t&&Pe!==t){let o=Pe;if(!Y(o,t))Q=null,Gi(),Yt=e;else{let i=ce(js(t));if(i&&!St&&(St=i,an=!1),Ne===o&&(Ne=t),Q&&Q.contextKey===o){Q.contextKey=t;let a=zs();a&&(Q.conversationId=a)}Yt=!1}if(Pe=t,xh(t,o),Yt){Re(ji(!1,t));return}}else t&&(Pe=t);if(Yt){if(e){Re(ji(!1,t));return}Yt=!1}if(Q)if(e||Q.contextKey!==t)Q=null;else{let o=Q;Q=null,Gi(),yh(o),Re(ji(!1,t));return}let n=ji(e,t);if(e){let o=!on;o&&(Oe=!1,Vr=!1,Yr=!1),on=!0,rn=0,Ne=t,o&&vh(n),Re(n);return}if(!on){Re(n);return}if(rn+=1,Yr&&(rn=Math.max(rn,Wu)),rn<Wu){Re(n);return}if(!(!!Ne&&Ne===t)){Gi(),Re(n);return}Q={contextKey:Ne||t,conversationId:zs(),userStopped:Oe,error:Vr||Xt()},Re(n)}function Th(){Kr===void 0&&(on=V(),Pe=Yu(),Ne=on?Pe:"",rn=0,Oe=!1,Vr=!1,Yr=!1,Yt=!1,Q=null,St="",an=!1,Wr?.abort(),Wr=new AbortController,document.addEventListener("click",wh,{capture:!0,signal:Wr.signal}),Fs=wt(Eh),Kr=setInterval(Sh,hh),Vu.debug("watchStreamingEdge started"))}function Lh(){sn.size||(Kr!==void 0&&(clearInterval(Kr),Kr=void 0),Wr?.abort(),Wr=null,Fs?.(),Fs=null,Gi(),Pe="",Yt=!1,Q=null,Vu.debug("watchStreamingEdge stopped"))}function dt(t){let e=typeof t=="function"?{onFall:t}:t;return sn.add(e),Th(),()=>{sn.delete(e),Lh()}}var Xu="bloom-host-icon",Zr="data-bloom-host-rel",Gs="not all",Us=0,Zu=0,kh=400;function Ju(t){Us+=1;try{t()}finally{Us-=1}}function Ui(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Be(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Qu(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Ch(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Mh(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Zu<kh||(Zu=n,t.appendChild(e))}function Ah(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Ui(n)&&(n.getAttribute(Zr)||n.setAttribute(Zr,n.rel),n.media!==Gs&&(n.media=Gs),n.rel!==Xu&&(n.rel=Xu))}function Hh(t){for(let e of t.querySelectorAll(`link[${Zr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Zr);n&&(e.rel=n),e.removeAttribute(Zr),e.media===Gs&&e.removeAttribute("media")}}function td(t,e){let{head:n}=document;!n||!e||Ju(()=>{Ah(n,t);let r=Qu(t),{type:o,sizes:i}=Ch(e);r?Mh(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function ed(t,e){let{head:n}=document;n&&Ju(()=>{Qu(t)?.remove(),Hh(n)})}function nd(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(Us)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Ui(c.target)&&(a=!0,Be(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Ui(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Ui(u)&&u.id!==t&&(a=!0,Be(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Ih=["original","badge","dot","hole","bg"],id=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],ad={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ki="#FCFCFC",Rh="#111111",rd="#111111",Nh="#ffffff",Ph="#212121",Oh="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Bh={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Wi=32,od=64;function sd(t){return typeof t=="string"&&Ih.includes(t)}function Dh(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Vi(t){let e=document.createElement("canvas");e.width=Wi,e.height=Wi;let n=e.getContext("2d");return n?(n.scale(Wi/od,Wi/od),t(n),e.toDataURL("image/png")):""}function _h(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function Yi(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Oh);n&&(t.strokeStyle=Rh,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function qh(t,e,n){let r=ad[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=rd,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=rd,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Nh,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Jr(t,e){if(t==="original")return e==="wait"?Vi(r=>Yi(r,Ki)):Dh(Bh[e]);let n=e==="wait"?void 0:ad[e];return Vi(t==="hole"?r=>Yi(r,n??Ki):t==="bg"?r=>{r.fillStyle=n??Ph,_h(r,0,0,64,64,14),r.fill(),Yi(r,Ki,!1)}:r=>{Yi(r,Ki),e!=="wait"&&qh(r,e,t==="dot"?"dot":"badge")})}function ld(t){return{wait:Jr(t,"wait"),rotate:Jr(t,"rotate"),done:Jr(t,"done"),ready:Jr(t,"ready"),error:Jr(t,"error")}}var $h=new C("ChatStateFavicons"),un="bloom-chat-state-favicon",md=["input","beforeinput","cut","paste","compositionend"],pd=M({style:{type:3,description:"Favicon overlay",options:id}}),Zt="",Vs={wait:"",rotate:"",done:"",ready:"",error:""},Qr="wait",ft=!1,tt=!1,D=null,ht="",Tt="",fn=!0,Ji=!1,Wn=null,Lt=0,Xi=null,Zi=null,cn=null,Ws=null,Vn=null,_t=!1,cd=new WeakSet;function Fh(){let t=pd.store.style;return sd(t)?t:"bg"}function gd(){let e=document.querySelector(`link[rel~="icon"]:not(#${un}), link[data-bloom-host-rel]:not(#${un})`)?.href;return Be(e)?e:Be(Zt)?Zt:""}function zh(){let t=document.getElementById(un);return t instanceof HTMLLinkElement?t:null}function jh(){if(!Be(Zt)){let t=gd();t&&(Zt=t)}return Be(Zt)?Zt:Vs.wait}function hd(t){return t==="wait"?jh():Vs[t]}function bd(){td(un,hd(Qr))}function q(t){let e=hd(t);if(Qr===t){let n=zh();if(n&&n.getAttribute("href")===e)return}Qr=t,bd()}function ud(){Vs=ld(Fh()),q(Qr)}function Ys(){return le(Pt())}function Xs(t,e){!t||!e||t===e||(D===t&&(D=e),ht===t&&(ht=e),Tt===t&&(Tt=e))}function Gh(){let t=Ys();if(!(V()||ft||tt))return ht="",t;if(ht&&t&&ht!==t)if(Y(ht,t))Xs(ht,t),ht=t;else return ht="",t;else!ht&&t&&(ht=t);return ht||t}function dd(t){return!D||!t?!1:D===t?!0:Y(D,t)}function yd(){ft=!1,tt=!1,D=null,ht=""}function vd(t){Tt=t,yd(),fn=!1,Ji=!0,q("wait")}function Ks(t){return!t&&fn}function Uh(){if(!_t)return;let t=Ys();if(Tt&&t&&Tt!==t&&!Y(Tt,t)){vd(t);return}Tt&&t&&Y(Tt,t)&&Xs(Tt,t),t&&(Tt=t);let e=V(),n=e&&!j();if(Ji){if(j()){q("wait");return}Ji=!1}if(j()){q("wait");return}let r=Gh(),o=He();if(ln()&&!e){ft=!1,tt=!1,D=null,q(o?"wait":Ks(o)?"ready":"wait");return}if(Xt()&&!e&&ft){q("error"),ft=!1,tt=!1,D=null;return}if(n){ft||(fn=!1),ft=!0,tt=!1,D=r,q("rotate");return}if(ft)if(!dd(t))ft=!1,tt=!1,D=null;else if(tt){ft=!1,tt=!0,D=t||r,q("done");return}else{q("rotate");return}if(tt)if(D&&t&&!dd(t))tt=!1,D=null;else if(o){D=r||D,q("done");return}else if(Ks(o)){tt=!1,q("ready");return}else{tt=!1,q("wait");return}D=null,o?q("wait"):Ks(o)?q("ready"):q("wait")}function dn(){_t&&(Td(),wd(),Ed(),Uh())}function xd(){if(Vn){for(let t of md)Vn.removeEventListener(t,Sd,!0);Vn=null}}function wd(){let t=Dt(),e=t&&t!==document.body?t:null;if(!(Vn===e&&e?.isConnected)&&(xd(),!!e)){Vn=e;for(let n of md)Vn.addEventListener(n,Sd,{capture:!0,passive:!0})}}function Ed(){let t=Dt();if(!(cn&&Ws===t&&t.isConnected)){if(cn?.disconnect(),Ws=t,!t||t===document.body){cn=null;return}cn=new MutationObserver(()=>Qi()),cn.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Qi(){if(_t){if(document.hidden){Lt&&(cancelAnimationFrame(Lt),Lt=0),dn();return}Lt||(Lt=requestAnimationFrame(()=>{Lt=0,_t&&dn()}))}}function Sd(){Wt()&&(fn=!0),Qi()}function fd(){Wt()&&(fn=!0),Qi()}function Kh(){_t&&(Lt&&(cancelAnimationFrame(Lt),Lt=0),dn())}function Wh(){_t&&(fn=!1,dn())}function Vh(t){if(!_t)return;if(t.userStopped){ft=!1,tt=!1,D=null,q("wait");return}if(t.error){ft=!1,tt=!1,D=null,q("error");return}let e=Ys();if(t.contextKey&&e&&t.contextKey!==e&&!Y(t.contextKey,e)){ft=!1,tt=!1,D=null,q("wait");return}ft=!1,tt=!0,D=e||t.contextKey,q("done")}function Yh(){_t&&dn()}function Xh(t,e){if(_t){if(Y(e,t)){Xs(e,t),Tt=t,dn();return}vd(t)}}function Td(){let t=st();!t||cd.has(t)||(cd.add(t),t.addEventListener("input",fd,{capture:!0,passive:!0}),t.addEventListener("compositionend",fd,{capture:!0,passive:!0}))}var Ld=E({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:pd,startAt:"DOMContentLoaded",cleanupSelectors:[`#${un}`],start(){_t=!0,Zt=gd()||Zt,ud(),Zi?.disconnect(),Zi=nd(un,t=>{Be(t)&&(Zt=t),bd()}),Wn?.abort(),Wn=new AbortController,window.addEventListener("popstate",Qi,{signal:Wn.signal}),document.addEventListener("visibilitychange",Kh,{signal:Wn.signal}),Td(),wd(),Ed(),Xi?.(),Xi=dt({onRise:Wh,onFall:Vh,onTick:Yh,onContext:Xh}),dn(),$h.debug("favicon watch started")},stop(){_t=!1,Lt&&cancelAnimationFrame(Lt),Lt=0,Xi?.(),Xi=null,Wn?.abort(),Wn=null,xd(),cn?.disconnect(),cn=null,Ws=null,Zi?.disconnect(),Zi=null,yd(),Tt="",fn=!0,Ji=!1,Qr="wait",ed(un,Zt)},onSettingsChange:ud});var kd=`.bloom-ih-hud {
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
`;var SE=new C("InputHistory"),Zs=/\u200B/g,Cd=10,Md=500,Ad=100,Jh=8,Qh=120,tb=2e3,ta=10,ea=M({maxEntries:{type:4,description:"Max stored prompts",min:Cd,max:Md,default:Ad},history:{type:5,description:"Stored prompts",render:gb},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Js=new Map,et=0,Qs="",Jt=!1,eo=!1,nl=0,to=null,tl,rl=null,Hd=!0;function qt(){let t=ea.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Id(t){let e=at(Number(ea.store.maxEntries??Ad),Cd,Md);return t.length>e?t.slice(t.length-e):t}function na(t){ea.store.entries=Id(t)}function eb(t){return t.replaceAll(Zs,"").replace(/\n$/,"").trim()}function el(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Kt);return n instanceof HTMLElement?n:st()}function nb(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Vt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(Zs,"").trim().length===0,last:i.toString().replaceAll(Zs,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Rd(t){clearTimeout(tl),tl=setTimeout(()=>{if(t!==nl)return;eo=!1;let e=rl;e&&$s(e,Hd)},Qh)}function Nd(t,e,n){eo=!0,rl=t,Hd=n;let r=++nl;fe(t,e,n),Rd(r)}function rb(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Yn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ob(){document.querySelector(".bloom-ih-hud")?.remove()}function ib(t,e){let n=rb();n.textContent=t;let r=(e.closest("form")??Dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Jh)}px`,n.classList.add("bloom-ih-hud-on")}function ol(t){let e=eb(t);if(!e)return;let n=Date.now(),r=Js.get(e);if(r&&n-r<tb)return;Js.set(e,n);let o=qt().filter(i=>i!==e);o.push(e),na(o),et=qt().length,Jt=!1,Yn()}function ab(t,e){let n=qt();if(!n.length&&t)return;et>=n.length&&(Qs=Vt(e),et=n.length);let r=t?et-1:et+1;r<0||r>n.length||(et=r,Jt=!0,Nd(e,r===n.length?Qs:n[r],t),r<n.length?ib(`${r+1} / ${n.length}`,e):Yn())}function sb(t){Jt=!1,Yn(),Nd(t,Qs,!1),et=qt().length}function lb(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=el(t.target)??el(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Jt&&!t.altKey&&!t.shiftKey){sb(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){ol(Vt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=qt();if(!r){let i=nb(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||et<=0)||!n&&et>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),ab(n,e))}function cb(t){if(el(t.target)){if(eo){Rd(nl);return}Jt&&(Jt=!1,Yn(),et=qt().length)}}function ub(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Kt);n instanceof HTMLElement&&ol(Vt(n))}function db(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Un);if(!n||!(n instanceof HTMLElement)||z(n))return;let r=st();r&&ol(Vt(r))}function fb(t){if(!(!Jt||eo)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Jt=!1,Yn()}}function mb(){if(to)return;to=new AbortController;let{signal:t}=to,e={capture:!0,signal:t};window.addEventListener("keydown",lb,e),window.addEventListener("input",cb,e),window.addEventListener("submit",ub,e),window.addEventListener("click",db,e),window.addEventListener("pointerdown",fb,e)}function pb(t){let e=qt().slice();e.splice(t,1),na(e),et>e.length&&(et=e.length)}function gb(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=qt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(p=>p.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/ta));n>=l&&(n=l-1);let c=s.slice(n*ta,n*ta+ta);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let p=document.createElement("div");p.className="bloom-ih-list",c.forEach((w,b)=>{let v=i.indexOf(w),ot=qt().length-1-v,K=document.createElement("div");K.className="bloom-ih-item";let J=document.createElement("button");J.type="button",J.className=`bloom-ih-body${r===b?"":" bloom-ih-clamp"}`,J.textContent=w,J.addEventListener("click",()=>{r=r===b?-1:b,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let ut=document.createElement("button");ut.type="button",ut.title="Copy",ut.textContent="C",ut.addEventListener("click",()=>{Oc(w)});let vt=document.createElement("button");vt.type="button",vt.title="Delete",vt.textContent="\xD7",vt.addEventListener("click",()=>{pb(ot),o()}),O.append(ut,vt),K.append(J,O),p.appendChild(K)}),t.appendChild(p)}else{let p=document.createElement("p");p.className="bloom-ih-empty",p.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(p)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let h=document.createElement("button");h.type="button",h.className="bloom-ih-clear",h.textContent="Clear all",h.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(na([]),et=0,o())}),d.append(f,m,g,h),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Pd=E({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:ea,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",kd),et=qt().length,Jt=!1,mb()},stop(){to?.abort(),to=null,Yn(),ob(),Js.clear(),clearTimeout(tl),eo=!1,rl=null,Jt=!1},onSettingsChange(){let t=qt(),e=Id(t);e.length!==t.length&&na(e),et>e.length&&(et=e.length)}});var il="noShareLink",hb=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],bb=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],al=M({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Od(t){return`${t.join(",")}{display:none!important}`}function Bd(){let t=[];if(al.store.hideShareChat!==!1&&t.push(Od(hb)),al.store.hideShareProject!==!1&&t.push(Od(bb)),!t.length){L(il);return}k(il,t.join(`
`))}var Dd=E({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:al,start:Bd,onSettingsChange:Bd,stop(){L(il)}});var $d="noDictation",yb=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],vb=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Fd=M({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function _d(t){return`${t.join(",")}{display:none!important}`}function qd(){let t=[_d(yb)];Fd.store.hideDictationSettings!==!1&&t.push(_d(vb)),k($d,t.join(`
`))}var zd=E({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Fd,start:qd,onSettingsChange:qd,stop(){L($d)}});var sl="noSidebarIdentity",Xn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Ud=Xn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),Kd=Xn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),xb=[...Ud,...Kd],wb=[...Ud,...Xn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Eb=Xn.map(t=>`${t} a[href^="mailto:"]`),Sb=Xn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Tb=Xn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),no=M({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function jd(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Lb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function kb(){return`${Tb.join(",")}{margin-block:auto!important}`}function Cb(){return`${Sb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Gd(){let t=no.store.hideUsername!==!1,e=no.store.hideEmail!==!1,n=t&&no.store.enlargePlan!==!1,r=t&&no.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Lb([...wb,...Kd])),o.push(kb())):o.push(jd(xb))),e&&o.push(jd(Eb)),n&&o.push(Cb()),!o.length){L(sl);return}k(sl,o.join(`
`))}var Wd=E({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:no,start:Gd,onSettingsChange:Gd,stop(){L(sl)}});var Vd=`#bloom-rt-host {
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
`;var Zd=new C("RecentTopics"),Qn="bloom-rt-host",Jd="home",Qd=/^\/c\/([a-z0-9_-]{8,})/i,Ab=/\/c\/([a-z0-9_-]{8,})/i,tf=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Hb=new Set(["Backquote","IntlBackslash"]),Ib=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Rb=140,Nb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),nt=M({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Nb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),ra=null,oa=null,bt=!1,lo=!1,ro=!1,Qt=0,mn="",Zn=null,oo=null,Jn,ll=null,cl=null;function Pb(){let t=Number(nt.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function io(){let t=nt.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function dl(){let t=nt.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ef(){let t=nt.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function fl(){let t=nt.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function aa(t){let e=Pb();return t.length>e?t.slice(0,e):t}function te(t){return t===Jd}function ao(t,e=Rb){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function ml(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Qd)?.[1]??""}catch{return t.match(Ab)?.[1]??""}}function pn(){let t=(location.pathname||"/").match(Qd);if(t?.[1])return t[1];let n=Pt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Jd}function pl(t){if(te(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(ml(r.getAttribute("href")||"")!==t)continue;let o=ao(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return pn()===t&&e&&!/^ChatGPT$/i.test(e)?ao(e,80):""}function Ob(t){if(te(t))return"New chat";let e=dl()[t];if(e)return e;let n=Dn(t);return n||pl(t)||"Chat"}function Bb(t){return fl()[t]||""}function Db(t){return ef()[t]||{}}function gl(t,e){if(!t||te(t)||!e||/^new chat$/i.test(e.trim()))return;let n=dl();n[t]!==e&&(n[t]=e,nt.store.titles=n)}function _b(t){t.type==="conversation-meta"&&(gl(t.conversationId,t.title),bt&&tr())}function qb(t,e){if(!t||te(t)||!e)return;let n=fl();n[t]!==e&&(n[t]=e,nt.store.projects=n)}function $b(t,e){if(!t||te(t)||!e.user&&!e.assistant)return;let n=ef(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,nt.store.previews=n)}function hl(t){if(!t||te(t)&&nt.store.includeHome===!1)return;let e=io().filter(n=>n!==t);e.unshift(t),nt.store.visits=aa(e)}function sa(){let t=nt.store.includeHome!==!1;return aa(io().filter(n=>t||!te(n))).map(n=>({id:n,title:Ob(n),project:Bb(n),preview:Db(n)}))}function Yd(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return ao(o)}catch{return""}}function so(t){if(!t||te(t)||t!==pn())return;let e=pl(t);e&&gl(t,e);let n=Yd("user"),r=Yd("assistant");$b(t,{user:n,assistant:r});let o=rf(t);if(o){let i=nf(o);i&&qb(t,i)}}function bl(){let t=dl(),e=fl(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Qn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=ml(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=ao(c.textContent||"",80);d&&!tf.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=nf(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(nt.store.titles=t),i&&(nt.store.projects=e);let a=io(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(nt.store.visits=aa([...a,...l]))}function nf(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=ao((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!tf.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function rf(t){if(te(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(ml(e.getAttribute("href")||"")===t)return e}catch{}return null}function Fb(t){let e=rf(t);if(e){e.click();return}if(te(t)){location.assign("/");return}location.assign(`/c/${t}`)}function zb(){let t=pn();mn&&mn!==t&&so(mn),mn=t,hl(t),bl();let e=pl(t);e&&gl(t,e),so(t)}function ia(){Jn===void 0&&(Jn=window.setTimeout(()=>{Jn=void 0,zb()},120))}function jb(){Zn||(Zn=history.pushState.bind(history),oo=history.replaceState.bind(history),history.pushState=function(...e){let n=Zn(...e);return ia(),n},history.replaceState=function(...e){let n=oo(...e);return ia(),n})}function Gb(){Zn&&(history.pushState=Zn),oo&&(history.replaceState=oo),Zn=null,oo=null}function Ub(t){return Hb.has(t.code)||t.keyCode===192?!0:Ib.has(t.key)}function of(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Kb(t,e){lo=e,bl(),so(pn()),bt=!0,Qt=0;try{let n=pn();hl(n);let r=sa();r.length>1&&(Qt=t?r.length-1:1)}catch(n){Zd.error("Failed to open switcher:",n)}tr()}function Xd(t){let{length:e}=sa();e&&(Qt=(Qt+(t?-1:1)+e)%e,tr())}function yl(){if(!bt)return;let t=sa()[Qt];bt=!1,lo=!1,tr(),t&&Fb(t.id)}function af(){bt&&(bt=!1,lo=!1,tr())}function Wb(t){if(of(t)){ro=!0;return}if((t.ctrlKey||ro)&&!t.altKey&&!t.metaKey&&Ub(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{bt?Xd(t.shiftKey):Kb(t.shiftKey,!0)}catch(n){Zd.error("Hotkey failed:",n)}return}if(bt){if(t.key==="Escape"){t.preventDefault(),af();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),yl();return}t.key==="Tab"&&(t.ctrlKey||ro)&&(t.preventDefault(),Xd(t.shiftKey))}}function Vb(t){of(t)&&(ro=!1,bt&&lo&&yl())}function Yb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ia)}function Xb(t){!bt||(t.target instanceof Element?t.target:null)?.closest(`#${Qn}`)||af()}function Zb(){document.visibilityState==="hidden"&&so(pn())}function ul(t=oa){t instanceof HTMLElement&&ki(t,Li("auto"),!0)}function Jb(){if(!document.body)return null;let t=document.getElementById(Qn);if(t instanceof HTMLElement)return oa=t,ul(t),t;t=document.createElement("div"),t.id=Qn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),oa=t,ul(t),t}function tr(){let t=Jb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!bt){e.dataset.visible="false",e.replaceChildren();return}let n=sa();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Qt>=n.length&&(Qt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Qt?"true":"false",s.setAttribute("aria-selected",a===Qt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Qt=a,yl()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Qb(){document.getElementById(Qn)?.remove(),oa=null}var sf=E({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Qn}`],settings:nt,start(){k("recentTopics",Vd),mn=pn(),hl(mn),bl(),so(mn),ll=wt(_b),jb(),ra=new AbortController;let{signal:t}=ra;window.addEventListener("keydown",Wb,{capture:!0,signal:t}),window.addEventListener("keyup",Vb,{capture:!0,signal:t}),window.addEventListener("popstate",ia,{signal:t}),document.addEventListener("click",Yb,{capture:!0,signal:t}),document.addEventListener("click",Xb,{signal:t}),document.addEventListener("visibilitychange",Zb,{signal:t}),cl=Pn("schemeChange",()=>ul())},stop(){ra?.abort(),ra=null,Jn!==void 0&&(clearTimeout(Jn),Jn=void 0),Gb(),ll?.(),ll=null,cl?.(),cl=null,bt=!1,lo=!1,ro=!1,Qb()},onSettingsChange(){let t=aa(io());t.length!==io().length&&(nt.store.visits=t),bt&&tr()}});var vl="cleaner",t0=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],e0=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],n0=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],r0=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],o0=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],i0=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],gn=M({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function er(t){return`${t.join(",")}{display:none!important}`}function lf(){let t=[];if(gn.store.hideDownloadApps!==!1&&t.push(er(t0)),gn.store.hideDisclaimer!==!1&&t.push(er(e0)),gn.store.hideUpgrade!==!1&&t.push(er(n0)),gn.store.hideLockedModels!==!1&&t.push(er(r0)),gn.store.hideHomePromo!==!1&&t.push(er(o0)),gn.store.hideAds!==!1&&t.push(er(i0)),!t.length){L(vl);return}k(vl,t.join(`
`))}var cf=E({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:gn,start:lf,onSettingsChange:lf,stop(){L(vl)}});var ca=new C("ResponseNotification"),rr=M({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:f0},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),xl=!1,la=null,nr=null,co=null;function a0(){return document.visibilityState==="hidden"||document.hidden}function s0(){return rr.store.onlyWhenHidden===!1?!0:a0()}function l0(){let t=Dn(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function uf(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!nr||nr.state==="closed")&&(nr=new t);let e=nr,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){ca.debug("chime failed",t)}}function c0(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){ca.debug("custom sound failed",e),uf()}}function df(){let t=String(rr.store.soundUrl||"").trim();t?c0(t):uf()}function u0(){let t="Bloom++",e=`${l0()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){ca.debug("notification failed",n)}}function d0(){s0()&&(rr.store.sound!==!1&&df(),rr.store.browserNotification!==!1&&u0())}function f0(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>df()),t.appendChild(e),()=>{e.remove()}}var ff=E({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:rr,start(){xl=!0,la?.(),la=dt(t=>{if(!xl||t.userStopped||t.error)return;let e=R()||Kn();t.conversationId&&t.conversationId!==e||d0()}),co?.abort(),co=new AbortController,rr.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:co.signal}),ca.debug("watch started")},stop(){xl=!1,la?.(),la=null,co?.abort(),co=null;try{nr?.close()}catch{}nr=null}});var mf=`#bloom-pq-chip {
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
`;var Fe=new C("PromptQueue"),pa="bloom-pq-chip",pf="promptQueue",p0=8,g0=50,h0=2e3,b0='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',y0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,v0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),wl=M({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),qe=new Map,gf=0,Ft=!1,$t="",P="",ee=!1,yt=!1,je=!1,B=null,uo=null,ua=null,_e,ho,ze=null,N=null,or=null,fa=!1,lt=null,hn,$e=!0,U=!1,G=!1,mt=!1;function me(){return le(Pt())}function ir(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function x0(t){let e=ir(Vt(t));if(e)return e;if(!Wt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),ir(n.innerText||n.textContent||"")}catch{return""}}function Ef(){try{let t=document.querySelectorAll(b0),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Sf(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Tf(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&y0.test(n))return!0}}catch{}return!1}function ma(){let t=Kn();if(!t)return!1;let e=R();return!e||e===t}function go(){if(V()||ma())return!1;let t=Ef();if(!t)return!0;if(Sf(t)||Tf(t))return!1;try{if(t.querySelector(v0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function w0(){if(j()||ln())return U=!1,!1;if(V()||ma())return U=!0,!0;let t=Ef();return t&&(Sf(t)||Tf(t))?(U=!0,!0):U&&!go()?!0:(U=!1,!1)}function Lf(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Kt);return n instanceof HTMLElement?n:null}function hf(t){return Lf(t)??st()}function ga(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function kf(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function E0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?ir(e.innerText||e.textContent||""):""}catch{return""}}function S0(){return gf+=1,`pq${Date.now().toString(36)}${gf.toString(36)}`}function X(t){return qe.get(t)??[]}function Cf(t){return X(t)[0]}function bn(t,e){e.length?qe.set(t,e):qe.delete(t)}function Mf(t){if(!X(t).length){G=!1,mt=!1,P="";return}G=!0,mt=!1,U=!0,P=""}function bf(t){if(!$t||$t===t)return;let e=qe.get($t);!e?.length||qe.has(t)||Y($t,t)&&(qe.delete($t),qe.set(t,e),P===$t&&(P=t),B?.key===$t&&(B.key=t),Fe.debug("migrated pending",$t,"\u2192",t))}function ha(t){let e=me(),n=X(e);if(wl.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),bn(e,n)}else if(n.length>=p0){Fe.debug("queue full",e);return}else n.push({id:S0(),text:t,at:Date.now()}),bn(e,n);U=!0,B={key:e,text:t,turns:kf(),ticks:3};let r=st();r&&fe(r,"");try{ct()}catch(o){Fe.error("chip",o)}Fe.debug("queued",e,n.length,t.length)}function Af(t,e){let n=X(t).filter(r=>r.id!==e);if(bn(t,n),N===e&&(N=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}ct()}function Tl(){or?.abort(),or=null}function T0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function yf(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function L0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||N||lt)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;or?.abort();let c=new AbortController;or=c;let{signal:u}=c,d=!1,f=!1,m=0,g=0,h=0,p=0,w=null,b=[],v=[],ot=()=>{e.classList.add("bloom-pq-settling");for(let y of b)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},K=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(w?.isConnected?w.before(t):e.append(t)),w?.remove(),w=null,ot(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},J=()=>{fa=!0;let y=A=>{A.preventDefault(),A.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{fa=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=yf(b.length,m,g),A=v.length>1?(v[v.length-1].top-v[0].top-v.slice(0,-1).reduce((H,jt)=>H+jt.height,0))/(v.length-1):2,pt=new Array(v.length),xt=v[0]?.top??0;for(let H of y)pt[H]=xt,xt+=v[H].height+A;for(let H=0;H<b.length;H++){if(H===m)continue;let jt=pt[H]-v[H].top;b[H].style.transform=Math.abs(jt)<.5?"":`translate3d(0,${Math.round(jt)}px,0)`}},ut=()=>{let y=X(n).slice();if(m<0||m>=y.length)return;let A=yf(y.length,m,g);if(A.every((H,jt)=>H===jt))return;let pt=A.map(H=>y[H]).filter(Boolean);if(pt.length!==y.length)return;bn(n,pt);let xt=new Map(b.map(H=>[H.dataset.pqId||"",H]));for(let H of pt){let jt=xt.get(H.id);jt&&e.append(jt)}},vt=y=>{if(f)return;f=!0;let A=d;or===c&&(or=null),A&&y&&t.isConnected&&ut(),K(),A&&J(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;K(),y&&J()});let Vo=()=>{d=!0,b.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=b.indexOf(t),m<0&&(m=b.findIndex(H=>H.dataset.pqId===r)),g=m<0?0:m;let y=t.getBoundingClientRect();h=y.left,p=y.top;let A=getComputedStyle(t);w=document.createElement("div"),w.className="bloom-pq-gap",w.style.height=`${y.height}px`,t.before(w),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=A.color,t.style.font=A.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let pt=e.getBoundingClientRect(),xt=e.scrollTop;v=b.map(H=>{let ss=(H===t?w:H).getBoundingClientRect(),Cc=ss.top-pt.top+xt;return{top:Cc,height:ss.height,mid:Cc+ss.height/2}})},x=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(Vo(),!d||m<0)))return;y.preventDefault(),t.style.left=`${h+(y.clientX-s)}px`,t.style.top=`${p+(y.clientY-l)}px`;let A=e.getBoundingClientRect(),pt=y.clientY-A.top+e.scrollTop,xt=T0(pt,v.map(H=>H.mid));xt!==g&&(g=xt,O())},I=y=>{y.pointerId===a&&vt(!0)};window.addEventListener("pointermove",x,{signal:u}),window.addEventListener("pointerup",I,{signal:u}),window.addEventListener("pointercancel",()=>vt(!1),{signal:u})})}function k0(){yt=!0,clearTimeout(ho),ho=setTimeout(()=>{yt=!1,ho=void 0},h0)}function C0(t){if(lt)return;let e=me(),n=X(e).find(i=>i.id===t);if(!n)return;let r=st();if(!r)return;let o=n.text;lt=t,N===t&&(N=null),Tl(),ct(),clearTimeout(hn),hn=setTimeout(()=>{if(hn=void 0,!Ft||lt!==t)return;if(lt=null,me()!==e||!X(e).some(a=>a.id===t)){ct();return}bn(e,X(e).filter(a=>a.id!==t)),ct(),k0(),fe(r,o);let i=Ie();i&&!z(i)&&!zi(i)&&(i.click(),yt=!1),Mf(e)},160)}function fo(t){if(!Ft||ee||G||lt||V()||me()!==t)return;let e=Cf(t);if(!e){P="";return}if(Xt())return;let n=st();if(!n)return;if(!He(n)){let o=ir(Vt(n));if(o&&o!==e.text)return}let r=Ie();!r||z(r)||zi(r)||(ee=!0,fe(n,e.text),clearTimeout(_e),_e=setTimeout(()=>M0(t,e.id,e.text),g0))}function M0(t,e,n){_e=void 0;try{if(!Ft||G||lt)return;let r=Cf(t);if(!r||r.id!==e||r.text!==n||V()||me()!==t)return;let o=st();if(!o)return;let i=ir(Vt(o));if(i&&i!==n&&!He(o))return;i!==n&&fe(o,n);let a=Ie();if(!a||z(a)||zi(a))return;a.click(),bn(t,X(t).filter(s=>s.id!==e)),ct(),Mf(t),Fe.debug("drained",t,X(t).length)}finally{ee=!1}}function El(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Dt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Sl(){Tl(),ze?.remove(),ze=null,N=null,$e=!0}var Hf="http://www.w3.org/2000/svg";function A0(){let t=document.createElementNS(Hf,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function mo(t){let e=A0();for(let n of t){let r=document.createElementNS(Hf,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function po(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&If(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function H0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${pa}`)}function da(){let t=ze?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function I0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function De(t,e){if(N!==t)return;if(N=null,e===null){ct();return}let n=ir(e),r=me();if(!n){Af(r,t);return}let o=X(r).find(i=>i.id===t);o&&(o.text=n),ct()}function vf(t){lt||N!==t&&(N&&De(N,da()),X(me()).some(e=>e.id===t)&&(N=t,$e=!0,ct()))}function If(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function xf(t){return N===t?"edit":lt===t?"send":"text"}function R0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function N0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||R0(l)!==xf(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",$e?"true":"false"),n.hidden=!$e;for(let s of e){let l=a.get(s.id);if(xf(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function ct(){if(Tl(),!Ft||!document.body){Sl();return}let t=me(),e=X(t);if(!e.length){Sl();return}N&&!e.some(d=>d.id===N)&&(N=null),lt&&!e.some(d=>d.id===lt)&&(lt=null);let n=ze;if(n?.isConnected||(n=document.createElement("div"),n.id=pa,document.body.appendChild(n),ze=n),N0(n,e)){El(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",$e?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),$e=!$e,ct()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",$e||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=N===d.id,g=lt===d.id;m||(f.setAttribute("role","button"),f.tabIndex=g?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),g&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let h=document.createElement("div");h.className="bloom-pq-body";let p;if(m){let b=document.createElement("textarea");b.className="bloom-pq-text bloom-pq-editing",b.value=d.text,b.rows=2,b.spellcheck=!1,b.setAttribute("aria-label","Queued message text"),b.addEventListener("keydown",v=>{v.stopPropagation(),v.key==="Enter"&&!v.shiftKey?(v.preventDefault(),De(d.id,b.value)):v.key==="Escape"&&(v.preventDefault(),De(d.id,null))}),b.addEventListener("blur",()=>De(d.id,b.value)),p=b,u=b}else{let b=document.createElement("span");b.className="bloom-pq-text line-clamp-2",b.textContent=g?"Sending":d.text,g?If(b,l,"Sending now"):b.addEventListener("click",v=>{if(fa){fa=!1,v.preventDefault(),v.stopPropagation();return}v.preventDefault(),v.stopPropagation(),vf(d.id)}),p=b}h.append(p),f.append(h);let w=document.createElement("div");if(w.className="bloom-pq-rail",m){let b=po("Save",mo(["M20 6 9 17l-5-5"]),()=>{De(d.id,p instanceof HTMLTextAreaElement?p.value:da())},l),v=po("Cancel",mo(["M18 6 6 18","m6 6 12 12"]),()=>{De(d.id,null)},l);w.append(b,v)}else{let b=po("Remove from queue",mo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{N&&N!==d.id&&De(N,da()),N=N===d.id?null:N,Af(t,d.id)},l,void 0,g),v=po("Edit queued message",mo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>vf(d.id),l,"Edit",g),ot=po("Send now",mo(["M12 19V5","M6 11 12 5l6 6"]),()=>{N&&N!==d.id&&De(N,da()),C0(d.id)},l,"Send now (or Enter on empty composer)",g);w.append(b,v,ot)}f.append(w),!m&&!g&&L0(f,c,t,d.id),c.append(f)}if(n.append(o,c),El(n),u){let d=u,f=N;queueMicrotask(()=>{N===f&&d.isConnected&&I0(d)})}}function P0(){if(!B)return;B.ticks-=1;let t=X(B.key);if(t.length&&kf()>B.turns){let e=E0();if(e&&e===B.text){Fe.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),bn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,ct();return}}B.ticks<=0&&(B=null)}function ba(t){return!w0()||!Wt(t)?"":x0(t)}function O0(t){if(!Ft||t.isComposing||t.keyCode===229||t.key!=="Enter"||H0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||ee)return;let e=hf(t.target)??hf(document.activeElement);if(!e)return;if(t.altKey||yt){yt=!1,je=!0,queueMicrotask(()=>{je=!1});return}let n=ba(e);n&&(ga(t),ha(n))}function B0(t){if(!Ft||ee||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(je){je=!1;return}if(yt){yt=!1;return}let e=Lf(t.target);if(!e)return;let n=ba(e);n&&(ga(t),ha(n))}function D0(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||z(e))return null;let n=t.closest(Un);if(n instanceof HTMLElement&&!z(n))return n;let r=Ie();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function wf(t){if(!Ft)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${pa}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&z(n)||ee||!D0(e))return;if(yt){yt=!1;return}let r=st();if(!r)return;let o=ba(r);o&&(ga(t),ha(o))}function _0(t){if(!Ft)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Fi)&&!e.querySelector(Kt)||ee)return;if(je){je=!1;return}if(yt){yt=!1;return}let n=st()??e.querySelector(Kt);if(!n)return;let r=ba(n);r&&(ga(t),ha(r))}var Rf=E({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:pf,cleanupSelectors:[`#${pa}`],settings:wl,start(){Ft=!0;let t=wl.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),$t=me(),P="",ee=!1,yt=!1,je=!1,B=null,U=!j()&&!ln()&&(V()||ma()),G=!1,mt=!1,N=null,lt=null,clearTimeout(hn),hn=void 0,k(pf,mf),uo?.abort(),uo=new AbortController;let{signal:e}=uo,n={capture:!0,signal:e};window.addEventListener("keydown",O0,n),document.addEventListener("beforeinput",B0,n),document.addEventListener("pointerdown",wf,n),document.addEventListener("click",wf,n),document.addEventListener("submit",_0,n),ua?.(),ua=dt({onFall(r){if(Ft){if(r.userStopped||r.error){U=!1,G=!1,mt=!1,P="",ct();return}if(!(G&&!mt)){if(G&&mt){if(!go())return;G=!1,mt=!1,U=!1,P=r.contextKey,fo(r.contextKey);return}if(!go()){Fe.debug("unsettled fall; keep queue window");return}U=!1,P=r.contextKey,fo(r.contextKey)}}},onRise(){j()||ln()||(G&&(mt=!0),U=!0)},onContext(r,o){o&&r&&!Y(o,r)&&(U=!1,G=!1,mt=!1,P="",ee=!1,_e!==void 0&&(clearTimeout(_e),_e=void 0)),bf(r),$t=r,ct()},onTick(r){bf(r.contextKey),$t=r.contextKey,P0(),(j()||ln())&&(G=!1,mt=!1,U=!1,P=""),G&&(V()||ma())&&(mt=!0),G&&mt&&go()&&(G=!1,mt=!1,U=!1,X(r.contextKey).length&&(P=r.contextKey,fo(r.contextKey))),!G&&U&&go()&&(U=!1,!P&&X(r.contextKey).length&&(P=r.contextKey,fo(r.contextKey))),!G&&P&&P===r.contextKey&&fo(P),X(r.contextKey).length&&!ze?.isConnected?ct():ze&&El(ze)}}),ct(),Fe.debug("watch started")},stop(){Ft=!1,ua?.(),ua=null,uo?.abort(),uo=null,clearTimeout(_e),_e=void 0,clearTimeout(ho),ho=void 0,clearTimeout(hn),hn=void 0,lt=null,qe.clear(),B=null,P="",ee=!1,yt=!1,je=!1,U=!1,G=!1,mt=!1,Sl()}});var Nf=`.bloom-cls {
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
`;var Bf=new C("ChatListStatus"),Pf="chatListStatus",xa="bloom-cls",$0="bloom-cls",F0=1200*1e3,z0="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",zt=new Map,ne=!1,kt="",pe=!1,lr=!1,Ct=0,Ge=null,Cl=null,ar=null,Ll=null,ya=null,bo=null,sr=!1,Ue=new Set;function va(){return Date.now()}function Df(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ge(t,e,n,r=!0){if(!(!t||!ne)){if(e==="idle")zt.delete(t);else{let o=zt.get(t);o&&o.kind===e&&n!=="net"?o.at=va():zt.set(t,{kind:e,at:va(),source:n})}r&&j0({v:1,id:t,kind:e,at:va()}),yn()}}function j0(t){try{ar?.postMessage(t)}catch{}}function G0(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ge(e.id,e.kind,"bc",!1)}function U0(){let t=va();for(let[e,n]of zt)n.kind==="streaming"&&t-n.at>F0&&zt.delete(e)}function K0(){let t=Df();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(z0))continue;let o=ce(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Of(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function kl(t){let e=t.querySelector(`:scope > .${xa}`);return e||null}function Ml(){if(!ne)return;U0();let t=R(),e=K0();Ge?.disconnect();try{for(let n of e){let r=ce(n.getAttribute("href")||"");if(!r||!t||r!==t){kl(n)?.remove();continue}let i=zt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){kl(n)?.remove();continue}let a=kl(n);a||(a=document.createElement("span"),a.className=xa,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Of("streaming")):i==="error"&&a.appendChild(Of("error")))}}catch(n){Bf.debug("paint failed",n)}_f()}function yn(){if(ne){if(document.hidden){Ct&&(cancelAnimationFrame(Ct),Ct=0),Ml();return}Ct||(Ct=requestAnimationFrame(()=>{Ct=0,ne&&Ml()}))}}function _f(){let t=Df();if(!(Ge&&Cl===t&&t?.isConnected)){if(Ge?.disconnect(),Cl=t,!t){Ge=null;return}Ge=new MutationObserver(()=>yn()),Ge.observe(t,{childList:!0,subtree:!0})}}function wa(){return!!(nn()||Xr())}function W0(t){return!!(sr||t&&Ue.has(t)||!lr&&!j()&&wa())}function V0(t){if(ne){if(t.type==="post-start"){lr=!1,t.conversationId?(sr=!1,Ue.add(t.conversationId),pe=!0,ge(t.conversationId,"streaming","net")):(sr=!0,pe=!0);return}if(t.type==="post-end"){if(sr=!1,t.conversationId){Ue.delete(t.conversationId);let e=R(),n=Kn();(e?t.conversationId===e:t.conversationId===n)?ge(t.conversationId,t.error?"error":"done","net"):ge(t.conversationId,"idle","net")}wa()||(pe=!1)}}}function Y0(t,e){if(!ne)return;if(Y(e,t)){yn();return}let n=R();if(kt&&kt!==n){Ue.delete(kt);let r=zt.get(kt);r&&r.kind!=="idle"&&ge(kt,"idle","local")}sr=!1,pe=!1,lr=!0,n&&zt.get(n)?.kind==="streaming"&&zt.get(n)?.source==="local"&&!Ue.has(n)&&ge(n,"idle","local"),yn()}function X0(t){if(!ne)return;let e=t.conversationId||R();if(kt&&e&&kt!==e){Ue.delete(kt);let r=zt.get(kt);r&&r.kind!=="idle"&&ge(kt,"idle","local"),pe=!!(e&&Ue.has(e))}if(e&&(kt=e),lr||j()){if(j()||wa()||t.streaming){yn();return}lr=!1}if(W0(e)&&(t.streaming||wa())){pe=!0,e&&ge(e,"streaming","local"),yn();return}pe&&(pe=!1,e&&ge(e,Xt()?"error":"done","local")),yn()}var qf=E({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${xa}`],start(){ne=!0,k(Pf,Nf);try{ar=new BroadcastChannel($0)}catch{ar=null}ar?.addEventListener("message",G0),Ll=wt(V0),ya?.(),ya=dt({onTick:X0,onContext:Y0}),bo?.abort(),bo=new AbortController,document.addEventListener("visibilitychange",()=>{ne&&(Ct&&(cancelAnimationFrame(Ct),Ct=0),Ml())},{signal:bo.signal}),_f(),Bf.debug("sidebar status watch started")},stop(){ne=!1,Ct&&cancelAnimationFrame(Ct),Ct=0,bo?.abort(),bo=null,Ge?.disconnect(),Ge=null,Cl=null,ya?.(),ya=null,Ll?.(),Ll=null;try{ar?.close()}catch{}ar=null,zt.clear(),Ue.clear(),sr=!1,pe=!1,lr=!1,kt="",document.querySelectorAll(`.${xa}`).forEach(t=>t.remove()),L(Pf)}});var Ff="widerChat",zf=40,jf=96,Gf=64,Uf=M({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:zf,max:jf,default:Gf}});function Z0(){return at(Number(Uf.store.width??Gf),zf,jf)}function $f(){let t=Z0(),e=`min(100%,${t}rem)`;k(Ff,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var Kf=E({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Uf,start:$f,onSettingsChange:$f,stop(){L(Ff)}});var Al="composerOpacity",cr='form[data-type="unified-composer"],form.w-full[data-type]',J0=[`${cr} [class*="corner-superellipse"]`,`${cr} [class*="bg-token-bg-primary"]`,`${cr} [class*="bg-token-main-surface"]`].join(","),Q0=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),ty="#thread-bottom-container,#thread-bottom",ey=`${cr} #prompt-textarea,${cr} [contenteditable="true"]`,ny="var(--bg-primary,var(--main-surface-primary,#ffffff))",Hl=M({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function ry(){return at(Number(Hl.store.opacity??100),0,100)}function oy(){return at(Number(Hl.store.blur??16),0,40)}function Wf(){let t=ry();if(t>=100){L(Al);return}let e=oy(),n=`color-mix(in srgb,${ny} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(Al,`${ty}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Q0}{display:none!important}${cr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${J0}{background-color:${n}!important;background-image:none!important;${r}}${ey}{background-color:transparent!important;background-image:none!important}`)}var Vf=E({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Hl,start:Wf,onSettingsChange:Wf,stop(){L(Al)}});var Yf=`#bloom-bn-host {
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
`;var ay=new C("BetterNavigator"),Il="betterNavigator",em="bloom-bn-host",En=60,Xf=16,Ol=1e3,Zf=2400,sy=80,nm=2.5,ly=.4,yo="\u6B63\u5728\u8F93\u51FA\u2026",Bl="Image",cy="\u2753",uy="\u{1F916}",Jf=/file_[0-9a-f]+/gi,dy="File",fy="Code",my=".markdown, .whitespace-pre-wrap",zl=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),py="img, picture, video, canvas",gy=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,hy=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Co=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,by=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,yy=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,vy=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,xy=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,wy=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,Ey=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Sy=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Ty=2e3,Ly=40,ky=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,rm=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),Cy=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),My=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),Ay=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),dr=M({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),be=new Map,So=new Map,re=new Set,Ta=0,Ht=!1,ye=!1,ur=!1,Ke=null,Mo=null,fr=null,La=null,$=[],wn="",ka=0,To=-1,Lo=0,Ca="",At=0,he=0,vo,xo=null,Ea=null,Rl=null,Nl=null,vn=null,Dl=null,wo=null,xn=null,ve=null,Eo=null,Ma=!1,_l=0;function mr(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Pl(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function Hy(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function Iy(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)ky.test(Hy(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Pl(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Pl(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Pl(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function ko(t){try{return!!t.closest(Cy)}catch{return!0}}function Qf(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Ia(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function jl(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function Ry(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Sa(t,e){if(t){Jf.lastIndex=0;for(let n of t.matchAll(Jf))e.add(n[0].toLowerCase())}}function Ny(t){try{let e=new Set,n=s=>{Ry(s)||(Sa(s.getAttribute("src")||"",e),Sa(s.getAttribute("srcset")||"",e),Sa(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Sa(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Ia(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function Py(t,e){let n=Ny(t),r=So.get(e)??0,o=Math.max(r,n);return o>0&&So.set(e,o),o>=2?`${Bl} x${o}`:Bl}function Z(t){return t.replace(/\s+/g," ").trim()}function om(t,e){let n=t;for(;n&&n!==e;){if(n.matches(My))return!0;n=n.parentElement}return!1}function Aa(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(om(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(zl);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return Z(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<En+20;)e.push(Z(r.textContent||""));return Z(e.join(" "))}function Ao(t){let e=Z(t);return e.length<3||e.length>180||Co.test(e)?!1:gy.test(e)?!0:hy.test(e)}function Ra(t){let e=Z(t);return e.length<8||e.length>120||/\s/.test(e)||Co.test(e)||Ao(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function Oy(t){let e=[],n=i=>{let a=Z(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(Z(s[1])),e.push(Z(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function By(t){try{return ko(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function Gl(t){let e=Z(t);return!e||Ul(e)||Ra(e)?!0:Ao(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function Dy(t){return!t.length||t.length>4||!t.every(e=>Gl(e))?!1:t.some(e=>Co.test(Z(e))||Ao(e)||Ra(e))}function im(t){try{let e=null,n=0,r=`${zl}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(By(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=Oy(o);if(!i.length||i.length>4||i.join(" ").length>240||!Dy(i))continue;let a=i.some(c=>Co.test(Z(c))),s=i.some(c=>Ao(c)||Ra(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function _y(t){return im(t)?dy:""}function qy(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(by.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function $y(t){try{for(let e of t.querySelectorAll(py))if(!qy(e))return!0}catch{}return!1}function Ul(t){let e=Z(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||xy.test(e)||vy.test(e)?!0:e.length<=24&&(wy.test(e)||Co.test(e))}function Fy(t){let e=[],n=new Set,r=o=>{try{if(om(o,t)||o.closest(zl))return}catch{return}let i=Aa(o);!i||n.has(i)||Ul(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>En+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Aa(o).length<24)&&(r(o),e.join(" ").length>En+20))break}}catch{}return Z(e.join(" "))}function zy(t){let e=im(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=Z(i.innerText||i.textContent||"");!a||a.length>En+20||r.has(a)||Gl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return Z(n.join(" "))}function jy(t,e){let n=[];try{for(let o of t.querySelectorAll(my)){if(ko(o))continue;let i=Aa(o);if(!(!i||e==="assistant"&&Ul(i)||Gl(i))&&(n.push(i),n.join(" ").length>En+20))break}}catch{}let r=Z(n.join(" "));if(e==="user"){let o=zy(t);if(o)return o}return r||(e==="assistant"?Fy(t):"")}function Gy(t){return t.length>En?`${t.slice(0,En).trimEnd()}\u2026`:t}function tm(t){return Ey.test(t)}function Uy(t,e,n,r){let o=jy(t,e);if(o)return Gy(o);if(r)return yo;let i=_y(t);if(i)return i;if(jl(t))return Py(t,Ia(t));try{if($y(t))return Bl;if(t.querySelector("pre, code"))return fy}catch{}return`Message ${n+1}`}function Ky(){if(ye)return!0;let t=R();return!!(t&&re.has(t)||!ur&&!j()&&Ho())}function Ho(){return!!(nn()||Xr())}function Wy(){Ta=Date.now()}function am(t){ye=!1,t&&re.delete(t);let e=R();e&&re.delete(e)}function Vy(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Yy(t){if(jl(t)||!Ho())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Aa(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function Kl(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=Z(e.textContent||"");if(!(n.length>32)&&yy.test(n))return!0}}catch{}return!1}function sm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function Xy(t,e){try{if(Vy(t))return!0;if(!e)return!1;if(Yy(t)||Kl(t))return!0}catch{}return!1}function lm(t){if(!t||Ho())return!1;try{if(Kl(t)||sm(t))return!1;if(t.querySelector(Sy)||jl(t))return!0}catch{}return!1}function Zy(t){if(Ho()||Ta&&Date.now()-Ta<Ty)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!lm(e.el)||am()}function Jy(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(rm)){if(ko(r))continue;let i=Ia(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(ko(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function Qy(t){let e=[t.getAttribute("data-message-id"),t.getAttribute("data-turn-id"),t.querySelector("[data-message-id]")?.getAttribute("data-message-id"),t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id")],n=[];for(let r of e)r&&!n.includes(r)&&n.push(r);return n}function tv(t){let e=dr.store.showAssistant!==!1,n=e&&Ky(),r=Jy(t),o=null;if(e)for(let a of r)Qf(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Ia(a);if(!s)continue;let l=Qf(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&Kl(a),d=c&&sm(a),f=l==="assistant"&&c&&!lm(a)&&(u||d||n||Xy(a,!0)),m=Uy(a,l,i.length,f);if(m&&m!==yo){let h=be.get(s),p=!!h&&(Ao(h)||Ra(h));(!h||p||!tm(m)||tm(h))&&m!==h&&be.set(s,m)}let g=f&&m===yo?yo:be.get(s)||m;i.push({id:s,el:a,role:l,text:g,live:f})}}catch{}return i}function ev(t){let e=new Map;for(let n of t)if(e.set(n.id,n),!!n.el)for(let r of Qy(n.el))e.set(r,n);return e}function nv(t,e){if(e)return e.text&&e.text!==yo&&be.set(t.id,e.text),{...e,id:t.id};let n=be.get(t.id)||(t.alias?be.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message"}}function rv(t,e){let n=dr.store.showAssistant!==!1,r=ev(e),o=new Set,i=[];for(let s of t){if(s.role==="assistant"&&!n)continue;let l=r.get(s.id)||(s.alias?r.get(s.alias):void 0),c=nv(s,l);c.el&&o.add(c.el),i.push(c)}for(let s=0;s<e.length;s++){let l=e[s];if(!l.el||o.has(l.el))continue;let c=i.length;for(let u=s-1;u>=0;u--){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f+1;break}}if(c===i.length)for(let u=s+1;u<e.length;u++){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f;break}}i.splice(c,0,l),o.add(l.el)}let a=-1;for(let s=0;s<i.length;s++)i[s].role==="assistant"&&(a=s);for(let s=0;s<i.length;s++)i[s].live&&s!==a&&(i[s].live=!1);return i}function ov(){let t=mr();if(!t||t===document.body)return[];let e=tv(t),n=R(),r=n?Pr(n):[],o=r.length?rv(r,e):e;return Zy(o),o}function cm(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Na(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function Wl(t){return t===window?window.innerHeight:t.clientHeight}function iv(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(Ay)}catch{return!1}}function um(){vo!==void 0&&(clearTimeout(vo),vo=void 0),xo?.classList.remove("bloom-bn-flash"),xo=null}function dm(t){um(),t.classList.add("bloom-bn-flash"),xo=t,vo=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),xo===t&&(xo=null),vo=void 0},800)}function Ha(t){if(!$.length)return;let e=Math.max(0,Math.min(t,$.length-1));ka=e,Mo?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),fr?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),La&&(La.textContent=`${e+1} / ${$.length}`)}function fm(t){if(Ma)return;let e=fr?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function ql(t){let e=$[t];if(!e)return;let n=e.el?.isConnected?e.el:mm(e.id);if(!n){lv(t);return}e.el=n,To=t,Lo=Date.now()+Ol,Ha(t),fm(t);let r=ve??Na(n),i=Math.abs(n.getBoundingClientRect().top-cm())>nm*Wl(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),dr.store.jumpEffect!=="none"&&dm(n)}function mm(t){let e=mr();if(!e||e===document.body||!t)return null;let n=[t],r=R(),i=(r?Pr(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"]`)}catch{}if(!s||ko(s))continue;let l=s.closest(rm);return l instanceof HTMLElement?l:s}return null}function Vl(){if(ve)return ve;let t=mr();return t?Na(t):window}function av(t){let e=Vl(),n=Wl(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function sv(t,e){let n=Vl();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function lv(t){let e=++_l,n=$[t];if(!n)return;To=t,Lo=Date.now()+Zf+Ol,Ha(t),fm(t);let r=-1;for(let l=0;l<$.length;l++)$[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+Zf,a=0,s=-1;for(;Date.now()<i;){if(e!==_l||!Ht)return;let l=mm(n.id);if(l){n.el=l,Lo=Date.now()+Ol;let d=ve??Na(l),m=Math.abs(l.getBoundingClientRect().top-cm())>nm*Wl(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),dr.store.jumpEffect!=="none"&&dm(l),Mt();return}let c=Vl(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&sv(o,u))break;av(o),await new Promise(d=>setTimeout(d,sy))}}function Yl(){if(!Ht||!$.length)return;if(Date.now()<Lo&&To>=0){Ha(To);return}let t=window.innerHeight*ly,e=0;for(let n=0;n<$.length;n++){let r=$[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Ha(e)}function cv(t){let e=Na(t);if(ve===e&&Eo)return;Eo?.(),ve=e;let n=e===window?document:e,r=()=>{Yl(),Xl()};n.addEventListener("scroll",r,{passive:!0}),Eo=()=>n.removeEventListener("scroll",r)}function uv(t){xn?.disconnect(),xn=null;let e=ve instanceof HTMLElement?ve:null;xn=new IntersectionObserver(()=>Yl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&xn.observe(n.el)}function dv(){if(!document.body)return null;let t=Ke;if(t?.isConnected)return t;t=document.createElement("div"),t.id=em,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{Ma=!0}),n.addEventListener("pointerleave",()=>{Ma=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Ke=t,Mo=e,fr=i,La=o,t}function pm(){let t=Ke,e=mr();if(!t||!e||!e.isConnected||$.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=Iy(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Ly,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Xl(){!Ht||he||(he=requestAnimationFrame(()=>{he=0,Ht&&pm()}))}function fv(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function mv(t){let e=Mo,n=fr;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Xf),e.classList.toggle("bloom-bn-fit",t.length>Xf),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=fv(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),ql(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?cy:uy;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),ql(o)}),n.appendChild(a)}))}function pv(t){Mo?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=fr?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function gv(){let t=R();return t===Ca?!1:(Ca=t,be.clear(),So.clear(),$=[],wn="",ka=0,To=-1,Lo=0,ye&&t&&(re.add(t),ye=!1),!0)}function hv(t){let e=dr.store.showAssistant!==!1?"1":"0";return`${Ca}|${e}|${t.map(n=>n.id).join(",")}`}function $l(){if(!Ht)return;gv();let t=ov(),e=mr();if(!e||t.length<1){$=t,wn="",Ke&&(Ke.hidden=!0),xn?.disconnect(),Fl();return}dv();let n=hv(t);n!==wn?($=t,wn=n,mv(t),cv(e),uv(t)):($=t,pv(t)),pm(),Yl(),Fl()}function Mt(){if(Ht){if(document.hidden){At&&(cancelAnimationFrame(At),At=0),$l();return}At||(At=requestAnimationFrame(()=>{At=0,Ht&&$l()}))}}function Fl(){let t=mr();if(!(vn&&Dl===t&&t?.isConnected)){if(vn?.disconnect(),wo?.disconnect(),Dl=t,!t||t===document.body){vn=null;return}vn=new MutationObserver(()=>Mt()),vn.observe(t,{childList:!0,subtree:!0}),wo=new ResizeObserver(()=>Xl()),wo.observe(t)}}function bv(t){if(Ht){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===R())&&Mt();return}if(t.type==="post-start"){Wy(),ur=!1,t.conversationId?(ye=!1,re.add(t.conversationId)):ye=!0,Mt();return}if(t.type==="post-end"){if(ye=!1,t.conversationId)re.delete(t.conversationId);else{let e=R();e&&re.delete(e)}Mt()}}}function yv(t){if(!Ht||!$.length||Ke?.hidden||t.altKey||t.ctrlKey||t.metaKey||iv(t.target))return;let e=-1;if(t.key==="ArrowDown")e=ka+1;else if(t.key==="ArrowUp")e=ka-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=$.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),ql(Math.max(0,Math.min(e,$.length-1)))}function vv(){_l++,um(),xn?.disconnect(),xn=null,vn?.disconnect(),vn=null,Dl=null,wo?.disconnect(),wo=null,Eo?.(),Eo=null,ve=null,Ma=!1,Ke?.remove(),Ke=null,Mo=null,fr=null,La=null}var gm=E({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Il,cleanupSelectors:[`#${em}`],settings:dr,start(){Ht=!0,Ca=R(),k(Il,Yf),Ea=new AbortController;let{signal:t}=Ea;window.addEventListener("keydown",yv,{signal:t}),window.addEventListener("popstate",Mt,{signal:t}),window.visualViewport?.addEventListener("resize",Xl,{signal:t}),document.addEventListener("visibilitychange",()=>{Ht&&(At&&(cancelAnimationFrame(At),At=0),he&&(cancelAnimationFrame(he),he=0),$l())},{signal:t}),Nl=wt(bv),Rl=dt({onTick(){if(j()){Mt();return}ur&&!Ho()&&(ur=!1),Mt()},onFall(e){am(e.conversationId),Mt()},onContext(e,n){if(!Y(n,e)){be.clear(),So.clear(),wn="",ye=!1;let r=R();for(let o of[...re])o!==r&&re.delete(o);ur=!0}Mt()}}),Fl(),Mt(),ay.debug("navigator started")},stop(){Ht=!1,At&&cancelAnimationFrame(At),At=0,he&&cancelAnimationFrame(he),he=0,Ea?.abort(),Ea=null,Rl?.(),Rl=null,Nl?.(),Nl=null,re.clear(),ye=!1,ur=!1,Ta=0,vv(),be.clear(),So.clear(),$=[],wn="",L(Il)},onSettingsChange(){wn="",Mt()}});var hm=`.bloom-ts {
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
`;function bm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function ym(t){try{return new Date(t).toISOString()}catch{return""}}var wm=new C("MessageTimestamps"),vm="messageTimestamps",Oa="bloom-ts",xm=1500,wv="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",pr=M({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),gr=new Map,Ln=!1,It=0,We=null,Jl=null,Zl=null,Pa=null,Io=null,Ro=!1,Sn=!1;function Em(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function tc(){let t=pr.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Sm(){let t={...tc()};for(let[n,r]of gr)t[n]=r;let e=Object.keys(t);if(e.length>xm){let n=e.slice(e.length-xm),r={};for(let o of n)r[o]=t[o];pr.store.stamps=r;return}pr.store.stamps=t}var Ev=Bc(Sm,500);function Tm(t,e){!t||!e||gr.get(t)===e||(gr.set(t,e),Ev(),Tn())}function Sv(t){return t?gr.get(t)??tc()[t]??pi(t)??null:null}function Tv(t){Ln&&t.type==="message-time"&&Tm(t.messageId,t.createTime)}function Lv(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function kv(){let t=Em();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(wv)||e.push(n)}catch{}return e}function Cv(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Ql(){if(!Ln)return;let t=pr.store.hideOwnMessages===!0,e=pr.store.showDate!==!1,n=V();Sn&&!j()&&(Sn=!1),Sn&&(n?Ro=!1:Sn=!1);let r=Sn?!1:n,o=kv();We?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=Lv(i),c=i.querySelector(`:scope > .${Oa}`);if(t&&l==="user"){c?.remove();return}if(Cv(i)){c?.remove();return}let u=Sv(s);if(!u&&s&&(r||Ro)&&a>=o.length-2&&(u=Date.now(),Tm(s,u)),!u){c?.remove();return}let d=bm(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Oa,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=ym(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){wm.debug("paint failed",i)}Ro=r,Lm()}function Tn(){if(Ln){if(document.hidden){It&&(cancelAnimationFrame(It),It=0),Ql();return}It||(It=requestAnimationFrame(()=>{It=0,Ln&&Ql()}))}}function Lm(){let t=Em();if(!(We&&Jl===t&&t?.isConnected)){if(We?.disconnect(),Jl=t,!t||t===document.body){We=null;return}We=new MutationObserver(()=>Tn()),We.observe(t,{childList:!0,subtree:!0})}}var km=E({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Oa}`],settings:pr,start(){Ln=!0,k(vm,hm);let t=tc();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&gr.set(e,n);Zl=wt(Tv),Pa?.(),Pa=dt({onTick:Tn,onFall:Tn,onContext(e,n){Y(n,e)||(Sn=!0,Ro=!1),Tn()}}),Io?.abort(),Io=new AbortController,document.addEventListener("visibilitychange",()=>{Ln&&(It&&(cancelAnimationFrame(It),It=0),Ql())},{signal:Io.signal}),Lm(),Tn(),wm.debug("timestamp watch started")},stop(){Ln=!1,It&&cancelAnimationFrame(It),It=0,Io?.abort(),Io=null,We?.disconnect(),We=null,Jl=null,Pa?.(),Pa=null,Zl?.(),Zl=null,Sn=!1,Ro=!1,Sm(),gr.clear(),document.querySelectorAll(`.${Oa}`).forEach(t=>t.remove()),L(vm)},onSettingsChange:Tn});var ec="streamerMode",Mv="filter:blur(6px)!important;transition:filter .2s ease",Av="filter:none!important",hr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],br=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function Rt(t,e){return t.map(n=>`${n} ${e}`)}var kn=M({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function yr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Mv}}${e?`${r}{${Av}}`:""}`}function Cm(){let t=[];if(kn.store.conversations!==!1&&(t.push(yr([...Rt(br,'a[href^="/c/"]'),...Rt(br,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),kn.store.projects!==!1&&(t.push(yr([...Rt(br,'a[href*="/project"]'),...Rt(br,'a[href*="/g/g-p-"]'),...Rt(br,'[data-testid="project-name"]'),...Rt(br,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),kn.store.headerTitle!==!1&&t.push(yr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),kn.store.accountAvatar!==!1&&t.push(yr([...Rt(hr,"img"),...Rt(hr,'[class*="avatar"]'),...Rt(hr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),kn.store.accountName!==!1&&t.push(yr([...Rt(hr,".min-w-0 > .truncate"),...Rt(hr,".min-w-0.flex-1 .truncate")],!1)),kn.store.accountEmail!==!1&&t.push(yr([...Rt(hr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){L(ec);return}k(ec,t.join(`
`))}var Mm=E({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:kn,start:Cm,onSettingsChange:Cm,stop(){L(ec)}});var Am=`.bloom-gc-panel {
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
}`;var Iv=new C("GreetingCustomizer"),vr="greetingCustomizer",Hm="greetingCustomizerUi",No=100,rc=30,Rv=120,Nv=1e3,Pv=50,Ov=40,Bv=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Po=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),$a=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Dv(t){return!!t?.closest(Bv)}function Pm(t){return!!(Dv(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Fo(t){try{for(let e of document.querySelectorAll(t))if(!Pm(e))return e}catch{}return null}function nc(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Fo(e))return e;return t}var Om=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],rt=M({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Qv},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Om},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),oe=!1,Er=!1,Mn=null,Da,Oo,xr,Bo,_a=0,Ba=null,wr=null,Do=null,_o=null,qo=null,qa=null;function we(){let t=location.pathname||"/";return t==="/"||t===""}function Cn(){let t=rt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Om.slice()}function $o(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Im(t){rt.store.greetings=t.slice(0,rc)}function zo(){let t=String(rt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function _v(){return rt.store.order==="random"?"random":"sequential"}function qv(){return at(Number(rt.store.intervalSec??10),1,3600)*1e3}function $v(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Fv(){return!!Fo($a)}function Fa(){return!!(Fo($a)||Fo(Po))}function zv(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Fv()?nc($a):Fo(Po)?nc(Po):nc($a),i=e?`${Po}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function jv(t,e){if(t<=0)return 0;if(t===1)return Number(rt.plain.index)!==0&&(rt.store.index=0),Number(rt.plain.lastRandom)!==0&&(rt.store.lastRandom=0),0;let n=Number(rt.plain.index),r=Number(rt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(_v()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return rt.store.index=s,rt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return rt.store.index=i,i}function xe(t){if(!oe)return;if(!we()){L(vr);return}let e=Cn().map($o).filter(Boolean);if(!e.length){L(vr);return}let n=jv(e.length,t),r=e[n]??e[0],o=zo()==="manual"&&e.length>1;k(vr,zv($v(r),o)),qa?.()}function oc(){Da!==void 0&&(clearInterval(Da),Da=void 0)}function ic(){oc(),!(!oe||!we())&&zo()==="interval"&&(Cn().filter(Boolean).length<=1||(Da=setInterval(()=>xe(!0),qv())))}function ac(){Bo!==void 0&&(clearTimeout(Bo),Bo=void 0),_a=0}function Rm(){if(ac(),!oe||!we())return;_a=Ov;let t=()=>{if(Bo=void 0,!(!oe||!we())){if(Fa()){zo()==="refresh"&&!Er?(Er=!0,xe(!0)):xe(!1),ic();return}_a-=1,_a>0&&(Bo=setTimeout(t,Pv))}};t()}function sc(){if(Mn===!0){Fa()?xe(!1):Rm();return}Mn=!0,Er=!1,zo()==="refresh"?(Er=!0,xe(!0)):xe(!1),ic(),Fa()||Rm()}function lc(){Mn=!1,Er=!1,oc(),ac(),L(vr)}function za(){xr===void 0&&(xr=window.setTimeout(()=>{xr=void 0,oe&&(we()?sc():Mn!==!1&&lc())},Rv))}function Gv(){wr||(wr=history.pushState.bind(history),Do=history.replaceState.bind(history),_o=function(...e){let n=wr(...e);return za(),n},qo=function(...e){let n=Do(...e);return za(),n},history.pushState=_o,history.replaceState=qo)}function Uv(){_o&&history.pushState===_o&&wr&&(history.pushState=wr),qo&&history.replaceState===qo&&Do&&(history.replaceState=Do),wr=null,Do=null,_o=null,qo=null}function Kv(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(za)}function Wv(t){if(!oe||!we()||zo()!=="manual"||Cn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Po);if(!n||Pm(n))return;let r=window.getSelection?.();r&&String(r).trim()||xe(!0)}function Vv(){Oo===void 0&&(Oo=setInterval(()=>{if(!oe)return;let t=we();if(t!==(Mn===!0)){t?sc():lc();return}t&&Fa()&&xe(!1)},Nv))}function Yv(){Oo!==void 0&&(clearInterval(Oo),Oo=void 0)}function Nm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var Xv="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Zv="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Jv(t,e){let n=$o(t);return n?n.length>No?`Keep it to ${No} characters.`:Cn().length+(e?1:0)>rc?`At most ${rc} greetings.`:null:"Enter a greeting."}function Qv(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=Cn(),s=Number(rt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=No,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let p=l.querySelector(".bloom-gc-count");p&&(p.textContent=`${$o(e).length}/${No}`);let w=l.querySelector(".bloom-gc-error");w&&(w.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${$o(e).length}/${No}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let p=document.createElement("button");p.type="button",p.className="bloom-gc-btn",p.textContent="Cancel",p.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(p)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let p=n<0,w=Jv(e,p);if(w){r=w,i();return}let b=$o(e),v=Cn().slice();n>=0&&n<v.length?v[n]=b:v.push(b),Im(v),n=-1,e="",r="",i()}),m.appendChild(g),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let p=document.createElement("p");p.className="bloom-gc-empty",p.textContent="No greetings. The official heading stays.",t.appendChild(p);return}let h=document.createElement("div");h.className="bloom-gc-list",a.forEach((p,w)=>{let b=document.createElement("div");b.className="bloom-gc-item",w===s&&(b.dataset.active="true");let v=document.createElement("button");v.type="button",v.className=`bloom-gc-body${o===w?"":" bloom-gc-clamp"}`,v.textContent=p,v.addEventListener("click",()=>{o=o===w?-1:w,i()});let ot=document.createElement("div");ot.className="bloom-gc-item-actions";let K=Nm("Edit",Xv);K.addEventListener("click",()=>{n=w,e=p,r="",i()});let J=Nm("Delete",Zv);J.addEventListener("click",()=>{let O=Cn().filter((ut,vt)=>vt!==w);Im(O),n===w?(n=-1,e=""):n>w&&(n-=1),i()}),ot.append(K,J),b.append(v,ot),h.appendChild(b)}),t.appendChild(h)};return qa=i,i(),()=>{qa===i&&(qa=null),t.replaceChildren()}}var Bm=E({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Hm,settings:rt,start(){oe=!0,k(Hm,Am),Gv(),Ba=new AbortController;let{signal:t}=Ba;window.addEventListener("popstate",za,{signal:t}),document.addEventListener("click",Kv,{capture:!0,signal:t}),document.addEventListener("click",Wv,{signal:t}),Vv(),Mn=null,we()?sc():lc(),Iv.debug("started")},stop(){oe=!1,Ba?.abort(),Ba=null,xr!==void 0&&(clearTimeout(xr),xr=void 0),oc(),ac(),Yv(),Uv(),L(vr),Er=!1,Mn=null},onSettingsChange(){oe&&(we()?(xe(!1),ic()):L(vr))}});function tx(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function ja(t){try{return await createImageBitmap(t)}catch{return null}}async function ex(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Ga(t){if(t.startsWith("data:")){let e=tx(t);if(e){let n=await ja(e);if(n)return n}return ex(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?ja(await e.blob()):null}catch{return null}}var Ka="data-bloom-csi-slot",nx="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",rx=/\bsize-(?:[6-9]|10)\b/,ox=/\b(?:h|w)-(?:[6-9]|10)\b/,ix=/^(plus|pro|free|team|go|business|enterprise)$/i,ax=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Ua(t){return t.getAttribute("class")||""}function _m(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||rx.test(t)?!0:ox.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function sx(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!qm(e)}function qm(t){return ix.test(String(t??"").replace(/\s+/g,""))}function ie(t){return!!t?.closest(nx)}function Wa(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function jo(t){let e=Ua(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:qm(t.textContent||"")}function Va(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Go(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function lx(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function $m(t){if(ie(t)||Va(t)||Go(t)||jo(t)||Wa(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Fm(t){return ie(t)||Va(t)||Go(t)||jo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:sx(t.textContent||"")}function zm(t){return ie(t)||Go(t)||Wa(t)||jo(t)?!1:_m(Ua(t))||Fm(t)?!0:$m(t)}function Dm(t){return!(ie(t)||Wa(t)||Go(t)||jo(t)||Va(t))}function An(t,e){let n=Va(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Go(n)||Wa(n)||jo(n));)ie(n)||(r=n),n=n.parentElement;return r}function cx(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||ie(e))continue;if(lx(Ua(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Dm(o))){if(zm(o)||_m(Ua(o)))return An(o,t)??o;r.push(o)}if(r.length===1)return An(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Dm(r))return An(r,t)??r}}return null}function ux(t){let e=t.querySelectorAll(ax);for(let n of e)if(zm(n))return An(n,t)??n;return null}function dx(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Fm(e))return An(e,t)??e;return null}function fx(t){for(let e of t.querySelectorAll("*"))if($m(e))return An(e,t)??e;return null}function jm(t,e){if(ie(t))return null;if(e&&!ie(e)&&t.contains(e)){let n=An(e,t);if(n)return n}return cx(t)??ux(t)??dx(t)??fx(t)}function Gm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Sr="data-bloom-csi",Ya="data-bloom-csi-orig",Hn=new Set,Um=null;function uc(t){Um=t}function Km(t){return`url(${JSON.stringify(t)})`}function Xa(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function dc(t,e,n){let r=Km(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Wm(t,e=Ka){let n=Km(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function mx(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Tr(t){t.removeEventListener("error",cc);let e=t.getAttribute(Ya);t.removeAttribute(Sr),t.removeAttribute(Ya),e&&t.getAttribute("src")!==e&&(t.src=e)}function cc(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Hn.add(n),Tr(e),Um?.()}function Vm(t,e){if(!e||Hn.has(e)){Tr(t);return}mx(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Sr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Ya)&&t.setAttribute(Ya,n);t.setAttribute(Sr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",cc),t.addEventListener("error",cc),n!==e&&(t.src=e)}var Ym=`/*
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
`;var Xm=new C("CustomSidebarIdentity"),Zm="customSidebarIdentityUi",tp="customSidebarIdentity",gx="bloom-csi-face",hx="bloom-csi-name",Lr=Ka,bx=1024,Za=256,ep=24,np=64,rp=40,gc=1,hc=4,Uo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],fc=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=M({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Ox},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:ep,max:np,default:rp},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Rn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function yx(){return String(T.store.displayName??"").trim()}function ts(t,e,n,r,o){let i=at(n,gc,hc),a=Math.min(t,e)/i,s=at(r,a/2,Math.max(a/2,t-a/2)),l=at(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function vx(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function bc(t){let e=Math.min(1,bx/Math.max(t.width,t.height));return vx(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function xx(t,e,n,r){let{side:o,x:i,y:a}=ts(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Za,s.height=Za;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,Za,Za);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function wx(t){let e=await ja(t);if(!e)return null;let n=bc(e);return e.close(),n}async function vc(t,e,n,r){let o=await Ga(t);if(!o)return null;let i=xx(o,e,n,r);return o.close(),i}function xc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function Jm(){T.store.avatarUrl="",T.store.avatarSource="",xc()}var Qm=0;async function yc(t){let e=++Qm;xc(),T.store.avatarSource=t;let n=await vc(t,.5,.5,1);return e!==Qm?!1:(n&&(T.store.avatarUrl=n),!!n)}function Ko(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function mc(t){let e=Ko(t);if(!e)return!1;let n=await wx(e);return n?yc(n):!1}var Nt=!1,kr=!1,Cr=0,es=0,Ja=null,Ve=new Map,Mr=null,Ee=null,ns=null,ae=null,rs=null;function os(t){let e=String(t??"").trim();if(!e||Hn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function op(){return os(T.store.avatarUrl)??os(T.store.avatarSource)}var Qa=!1,pc=new Set;function ip(){let t=os(T.store.avatarSource);if(!t?.startsWith("data:image/")||os(T.store.avatarUrl)?.startsWith("data:image/")||Qa||pc.has(t))return;Qa=!0;let e=Rn(T.store.cropX,.5),n=Rn(T.store.cropY,.5),r=Rn(T.store.cropZoom,1);vc(t,e,n,r).then(o=>{if(Qa=!1,!o){pc.add(t);return}Nt&&(T.store.avatarUrl=o,is())}).catch(()=>{Qa=!1,pc.add(t)})}function In(t,e){return t.map(n=>`${n} ${e}`)}function Ex(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Sx(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Ex(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function ap(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||ie(n)||n.closest(".min-w-0")||e.push(n);return e}function Tx(t){let e=ap(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function wc(){let t=[],e=Je();e&&t.push(e);let n=Fn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Uo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function sp(t,e){let n=Tx(t);if(n)Vm(n,e);else for(let o of ap(t))Tr(o);let r=jm(t,n);for(let o of t.querySelectorAll(`[${Lr}]`))o!==r&&o.removeAttribute(Lr);r&&r.setAttribute(Lr,"")}function Lx(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function kx(t,e){let n=Lx(t);n&&sp(n,e)}function Cx(){for(let t of document.querySelectorAll(`img[${Sr}]`))Tr(t);for(let t of document.querySelectorAll(`[${Lr}]`))t.removeAttribute(Lr)}function Mx(){let t=at(Math.round(Rn(T.store.avatarSize,rp)),ep,np),e=op(),n=yx(),r=T.store.applyToMenu!==!1,o=[],i=[...In(Uo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...In(fc,"> :first-child img"));let a=[...In(Uo,".min-w-0 > .truncate"),...In(Uo,".min-w-0.flex-1 .truncate")];r&&a.push(...In(fc,"> :first-child .truncate"));let s=Gm(Lr);o.push(Xa([...s.flatMap(l=>In(Uo,l))].join(","),t)),o.push(Xa(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(Xa(s.flatMap(l=>In(fc,`> :first-child ${l}`)).join(","),t)),e&&(o.push(dc(i.join(","),e,t)),o.push(dc("#stage-sidebar-tiny-bar img",e,32)),o.push(Wm(e))),n&&o.push(Sx(a,n)),k(tp,o.join(""))}function Ax(){let t=op(),e=wc();for(let n of e)sp(n,t);if(T.store.applyToMenu!==!1){let n=zn();n&&kx(n,t)}for(let n of document.querySelectorAll(`img[${Sr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Tr(n)}function is(){if(!(!Nt||kr)){kr=!0;for(let t of Ve.values())t.disconnect();Ee?.disconnect(),ae?.disconnect();try{Mx(),Ax()}finally{kr=!1,Ec(),Nx(),Mr?.isConnected&&lp(Mr),ip()}}}function Wo(){!Nt||Cr||(Cr=requestAnimationFrame(()=>{Cr=0,is()}))}function Hx(){kr||!Nt||Wo()}function Ix(t){if(Ve.has(t))return;let e=new MutationObserver(Hx);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ve.set(t,e)}function Rx(t){Ve.get(t)?.disconnect(),Ve.delete(t)}function Ec(){let t=new Set;for(let n of wc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Fn();e&&t.add(e);for(let n of[...Ve.keys()])(!t.has(n)||!n.isConnected)&&Rx(n);for(let n of t)n.isConnected&&Ix(n)}function Nx(){let t=Si();if(!t){ae?.disconnect(),ae=null,ns=null;return}if(ns===t&&ae){ae.observe(t,{childList:!0});return}ae?.disconnect(),ns=t,ae=new MutationObserver(()=>{kr||!Nt||(Ec(),Wo())}),ae.observe(t,{childList:!0})}function lp(t){Mr===t&&Ee||(Ee?.disconnect(),Mr=t,Ee=new MutationObserver(()=>{if(!t.isConnected){Ee?.disconnect(),Ee=null,Mr=null;return}kr||!Nt||Wo()}),Ee.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function cp(t){if(!Nt||T.store.applyToMenu===!1)return;let e=zn();if(e){lp(e),Wo();return}t<=0||requestAnimationFrame(()=>cp(t-1))}function up(t){Nt&&(is(),!(wc().length||t<=0)&&(es=requestAnimationFrame(()=>up(t-1))))}function Px(t){Nt&&T.store.applyToMenu!==!1&&(!Ti(t)&&!zn()||cp(10))}function Ox(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,m.appendChild(g);let h=document.createElement("div");h.className="bloom-csi-zoom-row";let p=document.createElement("input");p.type="range",p.className="bloom-csi-zoom",p.min=String(gc),p.max=String(hc),p.step="0.05",p.setAttribute("aria-label","Zoom");let w=document.createElement("span");w.className="bloom-csi-zoom-val";let b=document.createElement("button");b.type="button",b.className="bloom-csi-btn",b.textContent="Reset",h.append(p,w,b);let v=document.createElement("p");v.className="bloom-csi-hint",v.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,h,v),t.append(u,d,f);function ot(){let x=String(T.store.avatarSource??""),I=String(T.store.avatarUrl??"");return x.startsWith("data:image/")?x:I.startsWith("data:image/")?I:""}function K(x,I,y){if(!a)return i.x=x,i.y=I,i.zoom=at(y,gc,hc),i;let A=ts(a.w,a.h,y,x*a.w,I*a.h);return i.x=A.x/a.w,i.y=A.y/a.h,i.zoom=A.z,i}function J(){p.value=String(i.zoom),w.textContent=`${Math.round(i.zoom*100)}%`;let x=a?ts(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;x&&a&&(g.style.width=`${a.w/x.side*100}%`,g.style.height=`${a.h/x.side*100}%`,g.style.left=`${(.5-x.x/x.side)*100}%`,g.style.top=`${(.5-x.y/x.side)*100}%`)}function O(x=!1){let I=ot(),y=String(T.store.avatarUrl??"").trim(),A=!!I;s.hidden=!y&&!I,(I||y)&&(s.src=I||y),document.activeElement!==l&&(l.value=A?"":y),l.placeholder=A?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!I,d.hidden=!(e&&/^https?:\/\//.test(y)&&!I),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",I&&(x&&(i.x=Rn(T.store.cropX,.5),i.y=Rn(T.store.cropY,.5),i.zoom=Rn(T.store.cropZoom,1)),g.getAttribute("src")!==I&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},K(i.x,i.y,i.zoom),J()},g.src=I),J())}function ut(x,I,y,A=!1){K(x,I,y),J();let pt=ot(),xt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,pt&&vc(pt,i.x,i.y,i.zoom).then(H=>{H&&(T.store.avatarUrl=H)})};r&&clearTimeout(r),A?xt():r=setTimeout(xt,80)}function vt(x){T.store.avatarUrl=x;let I=x.trim();if(n&&clearTimeout(n),!I){T.store.avatarSource="",xc(),e=!1,O(!0);return}if(I.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Ga(I).then(y=>{if(!y)return;let A=bc(y);y.close(),A&&yc(A).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(I)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{Ga(I).then(y=>{if(!y){e=!0,O(!0);return}let A=bc(y);y.close(),A?(e=!1,yc(A).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",x=>{Ko(x.clipboardData)&&(x.preventDefault(),e=!1,mc(x.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",x=>{Ko(x.dataTransfer)&&x.preventDefault()}),u.addEventListener("drop",x=>{Ko(x.dataTransfer)&&(x.preventDefault(),e=!1,mc(x.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>vt(l.value)),l.addEventListener("paste",x=>{Ko(x.clipboardData)&&(x.preventDefault(),e=!1,mc(x.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",x=>{ot()&&!l.value&&(x.key==="Backspace"||x.key==="Delete")&&(Jm(),e=!1,O(!0))}),c.addEventListener("click",()=>{Jm(),e=!1,O(!0)}),m.addEventListener("pointerdown",x=>{x.button===0&&(m.setPointerCapture(x.pointerId),o.on=!0,o.px=x.clientX,o.py=x.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",x=>{if(!o.on||!a)return;let I=m.clientWidth;if(!I)return;let{side:y}=ts(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);K(o.x-(x.clientX-o.px)*(y/I)/a.w,o.y-(x.clientY-o.py)*(y/I)/a.h,i.zoom),J()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,ut(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",x=>{x.preventDefault(),ut(i.x,i.y,i.zoom*(x.deltaY<0?1.08:1/1.08))},{passive:!1}),p.addEventListener("input",()=>ut(i.x,i.y,Number(p.value))),p.addEventListener("change",()=>ut(i.x,i.y,Number(p.value),!0)),b.addEventListener("click",()=>ut(.5,.5,1,!0));let Vo=()=>O(!1);return rs=Vo,O(!0),()=>{rs===Vo&&(rs=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var dp=E({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Zm,cleanupSelectors:[`.${gx}`,`.${hx}`],settings:T,start(){Nt=!0,Hn.clear(),uc(Wo),k(Zm,Ym),Ja=new AbortController,document.addEventListener("click",Px,{signal:Ja.signal}),up(40),ip(),Xm.debug("started")},onSettingsChange(){Hn.clear(),rs?.(),Nt&&(Ec(),is())},stop(){Nt=!1,Ja?.abort(),Ja=null,Cr&&cancelAnimationFrame(Cr),Cr=0,es&&cancelAnimationFrame(es),es=0;for(let t of Ve.values())t.disconnect();Ve.clear(),Ee?.disconnect(),Ee=null,Mr=null,ae?.disconnect(),ae=null,ns=null,Cx(),L(tp),uc(null),Hn.clear(),Xm.debug("stopped")}});var Ar=new C("Bloom"),fp=!1,Bx=Date.now(),Dx=[zu,Ld,Pd,Dd,zd,Wd,sf,cf,ff,Rf,qf,Kf,Vf,gm,km,Mm,Bm,dp];function as(t){return new Promise(e=>setTimeout(e,t))}function _x(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function qx(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var pp=8e3,mp=300,$x=250;async function Fx(){if(Ze())return await as(mp),!0;for(;Date.now()-Bx<pp;)if(await as($x),Ze())return await as(mp),!0;return Ze()||Ss()}function Sc(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function zx(){if(Sc())return!0;let t=Date.now()+pp;for(;Date.now()<t;)if(await as(100),Sc())return!0;return Sc()}function jx(){try{GM_registerMenuCommand?.("Bloom++ settings",Fu)}catch{}}function Gx(){hi(()=>{Ir("HostShell"),Ar.info("host shell",Et)}),bi(()=>{Ar.info("idle ready",Et)}),yi(()=>{cs(),Ir("HostReady"),Ar.info("chrome ready",Et)})}async function Tc(){await qc()}async function Lc(){if(fp)return;fp=!0,fu();for(let n of Dx)try{Kc(n),wu(n)}catch(r){Ar.error("register failed",n.name,r)}Ir("Init"),jx(),Gx();let t=()=>Ir("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await _x(),cs(),Ar.info("styles ready",Et),await qx(),zx().then(n=>{n&&vi()}),!await Fx()){Ar.warn("late islands not detected; starting default plugins",Et),_n(),xi();return}await vu()}var gp=typeof unsafeWindow<"u"?unsafeWindow:window,Ux=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Ux){let t=gp.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Et);try{Object.defineProperty(gp,"Bloom",{value:kc,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Tc().then(()=>Lc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
