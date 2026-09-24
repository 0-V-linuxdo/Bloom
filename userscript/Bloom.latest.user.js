// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.106
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

/* Bloom++ [20260924] v1.4.106. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Hp=Object.defineProperty;var Ip=(t,e)=>{for(var n in e)Hp(t,n,{get:e[n],enumerable:!0})};var qc={};Ip(qc,{REPO_URL:()=>Nu,Settings:()=>j,VERSION:()=>Et,contextKeyFromUrl:()=>ce,conversationChain:()=>$r,conversationTitle:()=>$n,conversationToken:()=>Pt,currentConversationId:()=>A,ensureConversationChain:()=>qr,hasDraftText:()=>Vt,hasErrorToast:()=>Zt,hasLateIslands:()=>Je,init:()=>_c,initSettings:()=>Dc,isDocumentInteractive:()=>Pu,isStreaming:()=>Y,isUserDraftEmpty:()=>Ie,messageCreateTime:()=>vi,plugins:()=>le,requestChromeReady:()=>Li,requestIdleReady:()=>Fn,requestShellReady:()=>Ti,setEditorText:()=>me,subscribeHarvest:()=>wt,watchStreamingEdge:()=>dt,whenChromeReady:()=>Si,whenIdleReady:()=>Ei,whenShellReady:()=>wi});var Te=new Map,ti=!1;function Np(){return document.getElementById("bloom-root")?.shadowRoot??null}function Fc(){return document.head??null}function On(){let t=Np();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Rp()}function hs(t,e){if(!ti)return;let n=Fc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),On();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,On();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,On()}function k(t,e){let n=Te.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Te.set(t,n)),ti&&hs(t,n)}function bs(){if(!Fc())return!1;ti=!0;for(let[e,n]of Te)hs(e,n);return On(),!0}function jc(t){let e=Te.get(t);e&&(e.disabled=!1,ti&&hs(t,e))}function zc(t){let e=Te.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),On())}function L(t){let e=Te.get(t);e&&(e.el?.remove(),Te.delete(t),On())}function Rp(){return Array.from(Te.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var C=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function E(t){return t}var ys=new Map;function Bn(t,e){let n=ys.get(t);return n||(n=new Set,ys.set(t,n)),n.add(e),()=>n.delete(e)}function Ye(t,e){let n=ys.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Pp="bloompp";function Gc(){return new Promise((t,e)=>{let n=indexedDB.open(Pp,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Uc(t){try{let e=await Gc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Kc(t,e){try{let n=await Gc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function it(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function at(t,e,n){return Math.min(n,Math.max(e,t))}function Wc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Vc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Yc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var ei=new C("SettingsStore"),Le="BloomSettings",Op=100;function ni(t){return t!=null&&typeof t.then=="function"}function Bp(t){if(t==null||ni(t))return null;if(it(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(it(e)&&!ni(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return it(n)&&!ni(n)?n:null}return null}catch{return null}}function oi(t){let e=Bp(t);if(!e)return null;let n=e.plugins;return!it(n)||ni(n)||Object.keys(n).length===0?null:e}function xs(t){return it(t)?t:null}function vs(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:it(t)?Object.keys(t).length===0:!1}function Dp(t){return vs(t)?0:Array.isArray(t)?12+Math.min(t.length,40):it(t)?12+Math.min(Object.keys(t).length,40):3}function Xe(t){if(!t)return-1;let e=t.plugins;if(!it(e))return-1;let n=0;for(let r of Object.values(e)){let o=xs(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=Dp(a))}return n}function Xc(t){let e=t.plugins;if(!it(e))return 0;let n=0;for(let r of Object.values(e))xs(r)?.enabled===!0&&n++;return n}function Zc(t){let e=t.map((i,a)=>({bag:i,index:a,score:Xe(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=Xc(a.bag)-Xc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!it(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(it(a))for(let[s,l]of Object.entries(a)){let c=xs(l);if(!c)continue;if(!it(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}vs(u[d])&&!vs(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return it(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Xe(n)}}var ri=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return it(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){ei.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Op))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Le,this.plain)}catch{try{GM_setValue(Le,e)}catch(n){ei.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Le,e)}catch{}Kc(Le,e).catch(n=>ei.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){ei.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Wc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var _p=new C("Settings"),qp={plugins:{}},j=new ri(structuredClone(qp)),$p=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Fp(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function M(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?ke(n):{}},get plain(){let n=e.pluginName;return n?j.plain.plugins[n]??{}:{}}};return e}async function jp(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Jc(){let t=oi(await jp(Le)),e=oi(await Uc(Le)),n=null;try{n=oi(localStorage.getItem(Le))}catch{n=null}let r=Zc([t,e,n]);if(r){let o=r.bag.plugins;o&&(j.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);_p.info("Loaded settings from",i,"richness",r.score,"gm",Xe(t),"idb",Xe(e),"ls",Xe(n))}j.releasePersist(),r&&(r.index!==0||r.score>Xe(t))&&j.persistLoadedBag()}function ke(t){return j.plain.plugins[t]||(j.plain.plugins[t]={}),j.store.plugins[t]}function Qc(t,e){e&&(e.pluginName=t,ke(t),j.setDefaultGetter($p(t),n=>{if(n!=="enabled")return Fp(e.def,n)}))}function tu(){return ke("Settings")}function ii(){return tu().pinnedPlugins??[]}function eu(t){return ii().includes(t)}function nu(t){let e=ii(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function ai(){return tu().starredPlugins??[]}function ru(t){return ai().includes(t)}function ou(t){let e=ai(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var si=new C("PluginManager"),le={},Or=new Set;function iu(t){if(le[t.name]){si.warn("Duplicate plugin",t.name);return}le[t.name]=t,Qc(t.name,t.settings)}function Dn(t){let e=le[t];if(!e)return!1;if(e.required)return!0;let n=j.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function au(t){let e=le[t];if(!e||e.required)return;let n=!Dn(t);ke(t),j.store.plugins[t].enabled=n,n?su(e):zp(e),Ye("pluginToggle",{name:t,enabled:n})}function su(t,e=!1){if(!Or.has(t.name)&&Dn(t.name))try{t.managedStyle&&jc(t.managedStyle),t.start?.(),Or.add(t.name),t.settings&&j.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Or.has(t.name)&&t.onSettingsChange?.()}),e||si.debug("Started",t.name)}catch(n){si.error("Failed to start",t.name,n)}}function zp(t){if(Or.has(t.name)){try{t.stop?.()}catch(e){si.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(zc(t.managedStyle),L(t.managedStyle)),Or.delete(t.name)}}function Br(t){for(let e of Object.values(le))(e.startAt??"DOMContentLoaded")===t&&su(e)}var lu=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Pt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function ce(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ue(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(lu)?.[1]??""}catch{return t.match(lu)?.[1]??""}}function A(){return ue(location.pathname)}var uu=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i;function ui(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function Es(t,e){return e!=="GET"||ui(t)?!1:uu.test(t)}function di(t){return t.match(uu)?.[1]??""}function fi(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return fi(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function gt(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function Ss(t){let e=gt(t);return e?!e.mapping&&gt(e.conversation)?e.conversation:e:null}function Gp(t){let e=t.match(/[?&]num_turns=(\d+)/i);if(!e)return 0;let n=Number(e[1]);return Number.isFinite(n)&&n>0?n:0}function cu(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function ws(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=cu(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?cu(n.text):""}function ci(t){let e=gt(t.metadata);if(e?.is_visually_hidden_from_conversation===!0||e?.is_user_system_message===!0||e?.user_context_message===!0)return"";let r=gt(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function Up(t){return(gt(t.author)?.role??t.role)==="user"}function Kp(t){let e=typeof t.recipient=="string"?t.recipient.toLowerCase():"";if(e&&e!=="all"||(gt(t.author)?.role??t.role)==="tool")return!0;let o=gt(t.content),i=(typeof o?.content_type=="string"?o.content_type:"").toLowerCase();if(/thought|reasoning/.test(i)||i==="code"||i==="execution_output"||/^(?:tether_|computer_)/.test(i))return!0;let a=typeof t.channel=="string"?t.channel.toLowerCase():"";return!!(/^(?:commentary|thought|thoughts|reasoning|analysis)$/.test(a)&&t.end_turn!==!0)}function du(t){return!!ci(t)&&!Kp(t)}function fu(t){let e=[];for(let n of t){let r=e[e.length-1];if(r&&r.role==="assistant"&&n.role==="assistant"){let o=n.alias||r.alias||(r.id!==n.id?r.id:void 0),i=n.at??r.at;e[e.length-1]={id:n.id,role:"assistant",text:n.text||r.text,...o&&o!==n.id?{alias:o}:{},...i?{at:i}:{}};continue}e.push(n)}return e}function Wp(t,e){let n=pu(t,e);if(!n)return!0;let r=new Set,o=n,i=null;for(;o&&e[o]&&!r.has(o);){r.add(o);let a=gt(e[o]);i=a&&typeof a.parent=="string"?a.parent:null,o=i}return!!(i&&!e[i])}function mu(t){let e=Ss(t);if(!e)return!1;let n=gt(t);for(let a of[e,n])if(a&&(a.has_more===!0||a.has_more_before===!0||a.truncated===!0))return!0;let r=gt(e.mapping);if(r&&Object.keys(r).length)return Wp(e,r);let o=Array.isArray(e.turns)?e.turns:Array.isArray(e.messages)?e.messages:Array.isArray(e.items)?e.items:[],i=Number(e.num_turns??e.turn_count??e.total_turns??e.total);return Number.isFinite(i)&&i>o.length&&o.length>0}function Ts(t,e=""){if(mu(t))return!1;let n=mi(t);if(!n.length)return!1;let r=Gp(e);return!(r&&n.length>=r)}function pu(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?fi(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function Vp(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null;if(l&&du(l)){let c=ci(l),u=typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:ws(l)};u!==o&&(d.alias=o);let f=fi(l.create_time??l.createTime);f&&(d.at=f),n.push(d)}}else l&&Up(l)&&n.push({id:"",role:"user",text:""});o=typeof s.parent=="string"?s.parent:null}return n.reverse(),fu(n).filter(a=>a.id)}function li(t){return t.length<=480?t:t.slice(t.length-480)}function Ls(t,e){if(!e.length)return t;if(!t.length)return li(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(W=>W.id)),m=n.has(e[e.length-1].id),p=e.filter(W=>!f.has(W.id)),h=e[e.length-1].at,g=e[0].at,w=t[0].at,b=t[t.length-1].at,v=m||!!h&&!!w&&h<=w,ot=!!g&&!!b&&g>=b;return li(v&&!ot?[...p,...t]:[...t,...p])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return li([...s,...l,...u,...d])}function Yp(t){let e=[],n=new Set;for(let r of t){let o=gt(r);if(!o)continue;let i=gt(o.message)??o;if(!du(i))continue;let a=ci(i)||ci(o);if(!a)continue;let s=typeof i.id=="string"&&i.id||typeof o.message_id=="string"&&o.message_id||typeof o.id=="string"&&o.id||"";if(!s||n.has(s))continue;n.add(s);let l={id:s,role:a,text:ws(i)||ws(o)},c=typeof o.id=="string"&&o.id&&o.id!==s?o.id:"";c&&(l.alias=c);let u=fi(i.create_time??i.createTime??o.create_time??o.createTime);u&&(l.at=u),e.push(l)}return fu(e)}function Xp(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=pu(t,n);return r?Vp(n,r):[]}function mi(t){let e=Ss(t);if(!e)return[];let n=Xp(e);if(n.length)return n;let r=Array.isArray(e.turns)?e.turns:Array.isArray(e.messages)?e.messages:Array.isArray(e.items)?e.items:[];return r.length?Yp(r):[]}function gu(t,e=""){let n=gt(t);if(!n)return e;let r=Ss(t)??n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function hu(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var Ms=new C("Harvest"),Zp=1500,Jp=200,Qp=8,gi=new Set,hi=new Map,bi=new Map,Ze=new Map,bu=[],Dr=new Set,ks=new Set,pi=new Map,xu={Accept:"application/json"},tg=/^(authorization|oai-|openai-|chatgpt-|x-authorization)/i,eg=8e3,ng=6e4,_n=null,yi=null,_r=null,Ot=0,wu=!1;function Eu(){return typeof unsafeWindow<"u"?unsafeWindow:window}function rg(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function og(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var ig=/"action"\s*:\s*"(next|continue|variant)"/i;function ag(t,e,n){return!(e!=="POST"||ui(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!ig.test(n))}function Su(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function sg(t){return typeof t=="string"?Su(t):""}function Cs(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Cs(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function As(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function yu(t,e,n){!t||!e||bi.get(t)!==e&&(bi.set(t,e),As(bi,Zp),de({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function lg(t,e){let n=e.trim();!t||!n||hi.get(t)!==n&&(hi.set(t,n),As(hi,Jp),de({type:"conversation-meta",conversationId:t,title:n}))}function Tu(t,e,n=""){let r=gu(e,t);if(!r)return;let o=mi(e);if(!o.length)return;let i=Ze.get(r)??[],a=Ls(i,o);Ts(e,n)&&Dr.add(r),!hu(i,a)&&(Ze.set(r,a),As(Ze,Qp),de({type:"conversation-chain",conversationId:r}))}function qn(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)qn(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&lg(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Cs(l.create_time??l.createTime??l.created_at);c&&u&&yu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Cs(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&yu(a,s,o),r.mapping&&typeof r.mapping=="object")qn(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&qn(l,o,n+1)}function vu(t,e){if(t)try{qn(JSON.parse(t),e)}catch{}}function de(t){for(let e of Array.from(gi))try{e(t)}catch{}}function cg(t,e){let n=e?.headers??(typeof Request<"u"&&t instanceof Request?t.headers:null);if(!n)return;let r=n instanceof Headers?n.entries():Array.isArray(n)?n:Object.entries(n);for(let[o,i]of r)typeof i=="string"&&tg.test(o)&&(xu[o]=i)}async function ug(t,e,n,r){if(n===Ot)try{let o=await t.json();if(n!==Ot)return;qn(o,e),Tu(e,o,r)}catch{}}async function dg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Ot&&de({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Ot;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=Su(c);m&&(o=m,de({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let p=m.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||vu(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Ot&&vu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Ot&&de({type:"post-end",conversationId:o,error:i})}function fg(t,e,n){let r=rg(e),o=og(e,n),i=Es(r,o),a=ag(r,o,n?.body),s=Ot,l="";return a&&(l=sg(n?.body)||di(r)||ue(r)||A(),de({type:"post-start",conversationId:l,url:r})),i&&cg(e,n),t(e,n).then(c=>{if(s!==Ot||!i&&!a)return c;try{let u=c.clone();i?ug(u,di(r)||A(),s,r):dg(u,l,!c.ok,s)}catch{a&&de({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Ot&&de({type:"post-end",conversationId:l,error:!0}),c})}function Hs(){if(_n)return;let t=Eu();_r=t,_n=t.fetch.bind(t);let e=(n,r)=>fg(_n,n,r);yi=e,t.fetch=e,Ms.debug("conversation fetch harvest hooked")}function mg(){Ot+=1,!(!_n||!_r)&&(yi&&_r.fetch===yi&&(_r.fetch=_n),_n=null,yi=null,_r=null,Ms.debug("conversation fetch harvest unhooked"))}function pg(){Ot+=1,!wu&&mg()}function Lu(){wu=!0,Hs()}function gg(t,e){let n=`include_has_versions=true&num_turns=10&before_node=${encodeURIComponent(e)}`,r=`include_has_versions=true&num_turns=10&before=${encodeURIComponent(e)}`;return[`/backend-api/conversations/${t}?${n}`,`/backend-api/conversations/${t}?${r}`]}async function hg(t,e,n){let r=await t.fetch(e,{method:"GET",credentials:"include",headers:{...xu}});if(r.status===429)return{status:429,data:null};if(!r.ok)return{status:r.status,data:null};let o=await r.json();return qn(o,n),Tu(n,o,e),{status:r.status,data:o}}function qr(t){if(!t||Dr.has(t)||ks.has(t))return;let e=pi.get(t)??0;if(Date.now()<e)return;let n=Ze.get(t),r=n?.[0]?.alias||n?.[0]?.id||"";if(!r)return;ks.add(t),Hs();let o=Eu();(async()=>{let i=!1;try{let a=Ze.get(t)?.length??0;for(let s of gg(t,r)){let l;try{l=await hg(o,s,t)}catch{continue}if(l.status===429){i=!0,pi.set(t,Date.now()+ng),Ms.debug("conversation chain rate-limited",t);return}if(!l.data)continue;let c=(Ze.get(t)?.length??0)>a;if(Dr.has(t))return;c||Dr.add(t);return}}finally{ks.delete(t),!i&&!Dr.has(t)&&(pi.get(t)??0)<=Date.now()&&pi.set(t,Date.now()+eg)}})()}function wt(t){return gi.add(t),Hs(),()=>{gi.delete(t),gi.size===0&&pg()}}function $n(t){return t?hi.get(t)??"":""}function vi(t){return t?bi.get(t)??null:null}function $r(t){return t?Ze.get(t)??bu:bu}var Fr=!1,xi=!1,Is=!1,Cu=[],Mu=[],Au=[];function Ns(t){let e=t.splice(0);for(let n of e)n()}function jr(){Fr||(Fr=!0,Ns(Cu))}function Rs(){xi||(xi=!0,Fr||jr(),Ns(Mu))}function Hu(){Is||(Is=!0,Fr||jr(),xi||Rs(),Ns(Au))}function wi(t){Fr?t():Cu.push(t)}function Ei(t){xi?t():Mu.push(t)}function Si(t){Is?t():Au.push(t)}function Ti(){jr()}function Fn(){jr(),Rs()}function Li(){Hu()}function ku(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Iu(){await ku(4e3),jr(),await ku(4e3),Rs(),Hu()}var S={p:"0-V-linuxdo"},Et="[20260924] v1.4.106",Nu="https://github.com/0-V-linuxdo/Bloom";var bg={BetterNavigator:1790260138e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790252301e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function Ru(t){let e=bg[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function yg(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function vg(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ps(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Je(){return Ps()?yg()||vg():!1}function Pu(){return Je()}var xg=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Ou=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),wg=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Eg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function zn(t){return t.id==="bloom-root"||!!t.closest(Eg)}function Bu(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function ki(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Os(t){if(!(t instanceof HTMLElement)||!t.isConnected||zn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&ki(e)?!1:t.getClientRects().length>0}function jn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Sg(){let t=[];for(let e of document.querySelectorAll(xg))!(e instanceof HTMLElement)||!e.isConnected||zn(e)||t.push(e);return t}function Ci(t){if(!t.isConnected||zn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Qe(){return Sg().filter(Ci)[0]??null}function Gn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||zn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Bs(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!zn(n)&&!jn(n)&&n.parentElement&&!jn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!jn(r)&&!zn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!jn(r.parentElement))return r}return e}function Un(){let t=document.querySelectorAll(Ou);for(let n of t)if(Os(n)&&!ki(n)&&Bu(n))return n;let e=document.querySelectorAll(wg);for(let n of e){if(!Os(n)||!Bu(n)||ki(n))continue;let r=n.querySelector(Ou);return Os(r)&&!ki(r)?r:n}return null}function Mi(){let t=Qe();if(t){let e=Bs(t),n=e.parentElement;if(n&&!jn(n))return n;if(!jn(e))return e}return Gn()}function Ai(t){let e=Qe();return e?t.composedPath().includes(e):!1}var _s=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Tg={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Lg(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function kg(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Ds(t){let e=Lg(t);return e?kg(e)>.55?"light":"dark":null}function Cg(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Ds(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Ds(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Ds(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Hi(t){return t==="auto"?Cg():t}function Mg(t){try{let e=getComputedStyle(document.documentElement);for(let n of _s){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Ii(t,e,n){let r=Tg[e];if(n){Mg(t);for(let o of _s)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of _s)t.style.setProperty(o,r[o])}function Du(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var qs=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Hg="bloom-root",Kt="bloom-rail-item",Bi="bloom-account-item",en="bloom-sidebar-panel",Zr="bloom-plugin-dialog",zi="bloom-plugin-layer",Di="bloom-settings-css",Ig=2e3,$u=null,Ng=null,He=!1,zs=[],Ni=null,_i=null,Me=null,Pi=null,fe=null,Vr=null,zr,Kn=0,Yr=0,Gr=0,Ur=null,Kr=null,qi=null,Fu=null,Wr=null,$s=[],$i=!1,Rg=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Pg=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Og=new Set(["chat","ui","privacy"]),Bg=10080*60*1e3,Gi="",Xr="all",Ut="all";function Ui(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ju(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Dg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function _g(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function qg(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function $g(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Fg={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function jg(t){return t.icon||Fg[t.name]||Ui()}function Fs(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Ii(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function zu(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Fi(){let t="auto",e=Hi(t);Fs($u,e,!0);let n=document.getElementById(en);n instanceof HTMLElement&&Fs(n,e,!0);let r=document.getElementById(Zr);r instanceof HTMLElement&&Fs(r,e,!0);let o=document.getElementById(Kt);o instanceof HTMLElement&&zu(o),Ye("schemeChange",{scheme:e,pref:t})}function Gu(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Uu(){if(k("settings",qs),document.getElementById(Di)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Di,t.textContent=qs,document.head.appendChild(t)}function zg(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Gg(){for(let t of zs)t();zs=[]}function Ku(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Ug(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Ks(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Kg(t){return Ks(t).length>0}function Oi(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Wg(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Ug(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Vg(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Wg(e,n));let i=ke(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",zs.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Oi(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Oi(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Ku(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Oi(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function _u(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Yg(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=ke(t.name);for(let[n,r]of Ks(t)){if(n==="enabled"||r.type===5)continue;let o=Oi(r);o!==void 0&&(e[n]=o)}Vu(t)}function Wu(t){t.key==="Escape"&&(!document.getElementById(zi)&&!document.getElementById(Zr)||(t.stopPropagation(),Wn()))}function Xg(){$i||(document.addEventListener("keydown",Wu),$i=!0)}function Zg(){$i&&(document.removeEventListener("keydown",Wu),$i=!1)}function Wn(){Gg(),Zg(),document.getElementById(zi)?.remove(),document.getElementById(Zr)?.remove()}function Vu(t){if(Wn(),!document.body)return;let e=document.createElement("div");e.id=zi,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Ae),e.addEventListener("pointerup",Ae),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Wn()});let n=document.createElement("div");n.id=Zr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ae),n.addEventListener("pointerup",Ae),n.addEventListener("click",Ae);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=ju(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Wn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=_u("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=_u("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Ks(t);if(c.length)for(let[u,d]of c){let f=Vg(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Yg(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Xg(),Fi()}function Jg(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=jg(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=ru(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=qg(l),c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let g=ou(t.name);Ye("pluginStar",{name:t.name,starred:g})}),s.appendChild(c),!t.required){let h=eu(t.name),g=document.createElement("button");g.type="button",g.className=`bloom-icon-btn bloom-card-pin${h?" bloom-card-pin-active":""}`,g.setAttribute("aria-label",h?"Unpin from top":"Pin to top"),g.innerHTML=$g(h),g.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let b=nu(t.name);Ye("pluginPin",{name:t.name,pinned:b})}),s.appendChild(g)}if(Kg(t)){let h=document.createElement("button");h.type="button",h.className="bloom-icon-btn bloom-card-settings",h.setAttribute("aria-label",`${t.name} settings`),h.innerHTML=_g(),h.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),Vu(t)}),s.appendChild(h)}let u=Ku(t.name,Dn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",h=>h.stopPropagation()),d?.addEventListener("change",()=>{au(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let h=document.createElement("div");h.className="bloom-card-desc",h.textContent=t.description,n.appendChild(h)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(p),e.append(n,f,m),e}function Yu(){return Object.values(le).filter(t=>!t.hidden&&t.name!=="Settings")}function Qg(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Bg}function Xu(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Qg(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Og.has(r)):n.includes(e)}function th(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function eh(){return Gi.trim()?"No plugins match your search.":Ut==="favorites"?"No favorites yet. Star a plugin to see it here.":Ut==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function nh(){let t=Yu();return Pg.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Xu(n,e.id)))}function rh(){if(Wr){Wr.replaceChildren();for(let t of nh()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Ut===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Ut=t.id,tn()}),Wr.appendChild(e)}}}function oh(){let t=Yu();if(Ut==="favorites"){let e=new Set(ai());t=t.filter(n=>e.has(n.name))}else Ut!=="all"&&(t=t.filter(e=>Xu(e,Ut)));return Xr==="enabled"&&(t=t.filter(e=>Dn(e.name))),Xr==="disabled"&&(t=t.filter(e=>!Dn(e.name))),t}function tn(){if(!Ur)return;rh();let t=oh();qi&&(qi.placeholder=`Search ${t.length} plugins...`);let e=t,n=Gi.trim().toLowerCase();if(n&&(e=e.filter(r=>th(r).includes(n))),Ut==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Ut!=="favorites"){let r=ii();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Ur.replaceChildren();for(let r of e)Ur.appendChild(Jg(r));Kr&&(Kr.hidden=e.length>0,Kr.textContent=eh())}function Ae(t){t.stopPropagation()}function js(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ws(){document.getElementById(Kt)?.setAttribute("aria-expanded",He?"true":"false")}function ih(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Vs(){Wn(),Gi="",Xr="all",Ut="all",document.getElementById(en)?.remove(),He=!1,Ws()}function ah(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Ae),e.addEventListener("pointerup",Ae),e.addEventListener("click",Ae);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Ui();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Dg();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=ju(),d.addEventListener("click",Vs),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Gi=p.value,tn()});let h=document.createElement("select");h.className="bloom-search-filter",h.setAttribute("aria-label","Filter plugins");for(let b of Rg){let v=document.createElement("option");v.value=b.value,v.textContent=b.label,h.appendChild(v)}h.value=Xr,h.addEventListener("change",()=>{Xr=h.value,tn()}),m.append(p,h),n.appendChild(m);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let w=document.createElement("p");return w.className="bloom-tab-empty",w.hidden=!0,n.appendChild(w),e.append(d,n),Ur=g,Kr=w,qi=p,Fu=h,Wr=f,tn(),e}function sh(t){t.classList.add("bloom-rail-dock")}function lh(){let t=document.getElementById(Kt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Ci(t)?t:null}function ch(){if(document.getElementById(en)?.remove(),!document.body)return;let t=ah(en);sh(t),document.body.appendChild(t),He=!0,Wn(),Fi(),Ws(),Ye("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Et,dock:"center",rail:!!lh()})}function Ys(){let t=document.getElementById(en);if(t instanceof HTMLElement&&t.isConnected&&ih(t)){Vs();return}t?.remove(),ch()}function uh(){let t=document.createElement("button");return t.type="button",t.id=Kt,t.className="bloom-rail-item",t.setAttribute("aria-controls",en),t.setAttribute("aria-expanded",He?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Ui()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ys()}),t}function qu(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function dh(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function fh(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Ce(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Zu(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=dh(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Ce(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Ce(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Ce(n,"width",l),Ce(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Ce(t,"padding-left",u);let d=fh(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),p=Math.round(f.left-m.right);p>=0&&p<=24&&Ce(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Ce(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Ce(t,"gap",Math.round(l))}zu(t)}function Gs(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function mh(){if(Vr?.isConnected&&fe){fe.observe(Vr,{childList:!0});return}Us()}function ph(t){if(Gs(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function gh(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Gr=0;return}Gr+=1,Yr=Date.now()+Math.min(8e3,250*2**Math.min(Gr,5))})}function hh(){Kn||Date.now()<Yr||(Kn=requestAnimationFrame(()=>{Kn=0,!(Date.now()<Yr)&&(document.getElementById(Kt)?.isConnected||ji())}))}function ji(){if(!document.body)return;fe?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Kt);t=n instanceof HTMLButtonElement?n:uh();let r=Qe(),o=Gn();if(r){let i=Bs(r),a=i.parentElement;if(Gs(i)||a&&Gs(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),qu(t),Zu(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),qu(t,!0)):t.isConnected&&!Ci(t)&&(t.remove(),t=null)}finally{gh(t,e),mh(),Ws()}}function Us(){let t=Mi();!t||!ph(t)||Vr===t&&fe||(fe?.disconnect(),Vr=t,fe=new MutationObserver(()=>{document.getElementById(Kt)?.isConnected||hh()}),fe.observe(t,{childList:!0}))}function bh(){ji(),Us(),zr===void 0&&(zr=window.setInterval(()=>{let t=document.getElementById(Kt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Yr&&ji();else{Gr=0;let e=Qe();e&&Zu(t,e)}Us()},Ig))}function yh(){zr!==void 0&&(clearInterval(zr),zr=void 0),Kn&&cancelAnimationFrame(Kn),Kn=0,Yr=0,Gr=0,fe?.disconnect(),fe=null,Vr=null}function vh(t){Pi===t&&Me||(Me?.disconnect(),Pi=t,Me=new MutationObserver(()=>{if(!t.isConnected){Me?.disconnect(),Me=null,Pi=null;return}Ju(t)}),Me.observe(t,{childList:!0}))}function Ju(t){if(vh(t),t.querySelector(`#${Bi}`))return;let e=document.createElement("button");e.type="button",e.id=Bi,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Ui()}<span>Bloom++</span>`,e.addEventListener("pointerdown",js),e.addEventListener("pointerup",js),e.addEventListener("click",n=>{js(n),Ys()}),t.insertBefore(e,t.firstChild)}function Ri(){let t=Un();return t?(Ju(t),!0):!1}function xh(t){Ai(t)&&(queueMicrotask(Ri),requestAnimationFrame(()=>{Ri()}),window.setTimeout(Ri,60),window.setTimeout(Ri,180))}function wh(){_i?.abort();let t=new AbortController;_i=t,document.addEventListener("click",xh,{signal:t.signal})}function Eh(){_i?.abort(),_i=null,Me?.disconnect(),Me=null,Pi=null}function Qu(){Fn(),zg(()=>{Uu(),Gu(),ji(),Ys()})}var td=E({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Hg}`,`#${Kt}`,`#${Bi}`,`#${en}`,`#${zi}`,`#${Zr}`,`#${Di}`,"#bloom-menu-panel"],start(){Uu(),Gu(),bh(),wh(),Ni?.(),Ni=Du(Fi),Fi(),$s=[Bn("pluginToggle",()=>{He&&tn()}),Bn("pluginPin",()=>{He&&tn()}),Bn("pluginStar",()=>{He&&tn()})]},stop(){yh(),Eh(),Ni?.(),Ni=null;for(let t of $s)t();$s=[],Vs(),document.getElementById(Kt)?.remove(),document.getElementById(Bi)?.remove(),document.getElementById(Di)?.remove(),$u=null,Ng=null,Ur=null,Kr=null,qi=null,Fu=null,Wr=null,He=!1}});var Ki='form[data-type="unified-composer"], form.w-full[data-type]',Wt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Vn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),ed=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),nd=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Sh=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Th='[contenteditable="false"], button, [role="button"]';function Bt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function nn(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Bt(o)))return o;return null}function rd(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function z(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=rd(t);return!!(Sh.test(n)||/^stop$/i.test(n))}function Dt(){let e=Array.from(document.querySelectorAll(Ki)).find(Bt);if(e instanceof HTMLElement)return e;let n=nn(document,Wt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function st(){let t=Array.from(document.querySelectorAll(Wt));return t.find(Bt)??t[0]??null}function Lh(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Th);return!!n&&n!==e&&e.contains(n)}function Xs(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Lh(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Vt(t){let e=t??st();return e?Xs(e,e).replaceAll("\u200B","").trim().length>0:!1}function Ie(t){return!Vt(t)}function Wi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function od(t){let e=Dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Bt(n))&&t(n))return n;return null}function Ne(){let t=Dt(),e=nn(t,Vn)??nn(document,Vn);return e&&!z(e)?e:od(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!z(n);let o=rd(n);return/^(send|send prompt|发送)$/i.test(o)&&!z(n)})}function rn(){let t=Dt(),e=nn(t,ed,!0)??nn(document,ed,!0);if(e)return e;let n=nn(t,nd)??nn(document,nd);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Bt(r)&&z(r))return r}return od(z)}function Yt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Xs(n,t)).join(`
`):Xs(t,t)}function Zs(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function me(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Zs(t,n)}var ad=new C("Streaming");function no(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Bt(e))&&(z(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function kh(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Bt(t))}function Ch(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Bt(t))}function Mh(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Zt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Y(){if(rn()||no()||Mh())return!0;let t=Ne();return t&&Bt(t)&&!z(t)?!1:!!(kh()||Ch())}var Ah=400,id=3,ln=new Set,Jr,Qr=null,Js=null,an=!1,on=0,Pe="",Oe="",Be=!1,to=!1,eo=!1,Xt=!1,Q=null,St="",sn=!1;function G(){return Xt}function cn(){return Be}function Yn(){return St}function Qs(){return A()||St}function sd(){return ce(Pt())}function Vi(t,e){return{streaming:t,contextKey:e,conversationId:Qs()}}function tl(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Hh(t){return!t||t==="/"||t.startsWith("/g/")}function X(t,e){if(!t||t===e)return!1;let n=ue(tl(e)||e);return!n||!(t.endsWith("|draft")||Hh(tl(t)))?!1:St?n===St:sn}function Yi(){an=!1,on=0,Pe="",Be=!1,to=!1,eo=!1,St="",sn=!1}function Ih(t){for(let e of Array.from(ln))try{e.onFall?.(t)}catch{}}function Nh(t){for(let e of Array.from(ln))try{e.onRise?.(t)}catch{}}function Re(t){for(let e of Array.from(ln))try{e.onTick?.(t)}catch{}}function Rh(t,e){for(let n of Array.from(ln))try{n.onContext?.(t,e)}catch{}}function Ph(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&z(n)&&(Be=!0)}function Oh(t){if(t.type==="post-start"){let n=A();if(!t.conversationId){n||(sn=!0),(!n||n===St)&&(Xt=!1,Be=!1);return}if(!(t.conversationId===n||t.conversationId===St)&&!(!n&&sn))return;St=t.conversationId,sn=!1,Xt=!1,Be=!1;return}if(t.type!=="post-end"||!an&&!Q)return;let e=A();t.conversationId&&!(e?t.conversationId===e:t.conversationId===St)||(eo=!0,t.error&&(to=!0,Q&&(Q.error=!0)))}function Bh(){let t=sd(),e=Y();if(Oe&&t&&Oe!==t){let o=Oe;if(!X(o,t))Q=null,Yi(),Xt=e;else{let i=ue(tl(t));if(i&&!St&&(St=i,sn=!1),Pe===o&&(Pe=t),Q&&Q.contextKey===o){Q.contextKey=t;let a=Qs();a&&(Q.conversationId=a)}Xt=!1}if(Oe=t,Rh(t,o),Xt){Re(Vi(!1,t));return}}else t&&(Oe=t);if(Xt){if(e){Re(Vi(!1,t));return}Xt=!1}if(Q)if(e||Q.contextKey!==t)Q=null;else{let o=Q;Q=null,Yi(),Ih(o),Re(Vi(!1,t));return}let n=Vi(e,t);if(e){let o=!an;o&&(Be=!1,to=!1,eo=!1),an=!0,on=0,Pe=t,o&&Nh(n),Re(n);return}if(!an){Re(n);return}if(on+=1,eo&&(on=Math.max(on,id)),on<id){Re(n);return}if(!(!!Pe&&Pe===t)){Yi(),Re(n);return}Q={contextKey:Pe||t,conversationId:Qs(),userStopped:Be,error:to||Zt()},Re(n)}function Dh(){Jr===void 0&&(an=Y(),Oe=sd(),Pe=an?Oe:"",on=0,Be=!1,to=!1,eo=!1,Xt=!1,Q=null,St="",sn=!1,Qr?.abort(),Qr=new AbortController,document.addEventListener("click",Ph,{capture:!0,signal:Qr.signal}),Js=wt(Oh),Jr=setInterval(Bh,Ah),ad.debug("watchStreamingEdge started"))}function _h(){ln.size||(Jr!==void 0&&(clearInterval(Jr),Jr=void 0),Qr?.abort(),Qr=null,Js?.(),Js=null,Yi(),Oe="",Xt=!1,Q=null,ad.debug("watchStreamingEdge stopped"))}function dt(t){let e=typeof t=="function"?{onFall:t}:t;return ln.add(e),Dh(),()=>{ln.delete(e),_h()}}var ld="bloom-host-icon",ro="data-bloom-host-rel",el="not all",nl=0,cd=0,qh=400;function ud(t){nl+=1;try{t()}finally{nl-=1}}function Xi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function De(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function dd(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function $h(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Fh(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-cd<qh||(cd=n,t.appendChild(e))}function jh(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Xi(n)&&(n.getAttribute(ro)||n.setAttribute(ro,n.rel),n.media!==el&&(n.media=el),n.rel!==ld&&(n.rel=ld))}function zh(t){for(let e of t.querySelectorAll(`link[${ro}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(ro);n&&(e.rel=n),e.removeAttribute(ro),e.media===el&&e.removeAttribute("media")}}function fd(t,e){let{head:n}=document;!n||!e||ud(()=>{jh(n,t);let r=dd(t),{type:o,sizes:i}=$h(e);r?Fh(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function md(t,e){let{head:n}=document;n&&ud(()=>{dd(t)?.remove(),zh(n)})}function pd(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(nl)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Xi(c.target)&&(a=!0,De(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Xi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Xi(u)&&u.id!==t&&(a=!0,De(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Gh=["original","badge","dot","hole","bg"],bd=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],yd={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Zi="#FCFCFC",Uh="#111111",gd="#111111",Kh="#ffffff",Wh="#212121",Vh="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Yh={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Ji=32,hd=64;function vd(t){return typeof t=="string"&&Gh.includes(t)}function Xh(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Qi(t){let e=document.createElement("canvas");e.width=Ji,e.height=Ji;let n=e.getContext("2d");return n?(n.scale(Ji/hd,Ji/hd),t(n),e.toDataURL("image/png")):""}function Zh(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ta(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Vh);n&&(t.strokeStyle=Uh,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Jh(t,e,n){let r=yd[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=gd,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=gd,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Kh,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function oo(t,e){if(t==="original")return e==="wait"?Qi(r=>ta(r,Zi)):Xh(Yh[e]);let n=e==="wait"?void 0:yd[e];return Qi(t==="hole"?r=>ta(r,n??Zi):t==="bg"?r=>{r.fillStyle=n??Wh,Zh(r,0,0,64,64,14),r.fill(),ta(r,Zi,!1)}:r=>{ta(r,Zi),e!=="wait"&&Jh(r,e,t==="dot"?"dot":"badge")})}function xd(t){return{wait:oo(t,"wait"),rotate:oo(t,"rotate"),done:oo(t,"done"),ready:oo(t,"ready"),error:oo(t,"error")}}var Qh=new C("ChatStateFavicons"),dn="bloom-chat-state-favicon",Ld=["input","beforeinput","cut","paste","compositionend"],kd=M({style:{type:3,description:"Favicon overlay",options:bd}}),Jt="",il={wait:"",rotate:"",done:"",ready:"",error:""},io="wait",ft=!1,tt=!1,D=null,ht="",Tt="",mn=!0,ra=!1,Xn=null,Lt=0,ea=null,na=null,un=null,ol=null,Zn=null,_t=!1,wd=new WeakSet;function tb(){let t=kd.store.style;return vd(t)?t:"bg"}function Cd(){let e=document.querySelector(`link[rel~="icon"]:not(#${dn}), link[data-bloom-host-rel]:not(#${dn})`)?.href;return De(e)?e:De(Jt)?Jt:""}function eb(){let t=document.getElementById(dn);return t instanceof HTMLLinkElement?t:null}function nb(){if(!De(Jt)){let t=Cd();t&&(Jt=t)}return De(Jt)?Jt:il.wait}function Md(t){return t==="wait"?nb():il[t]}function Ad(){fd(dn,Md(io))}function q(t){let e=Md(t);if(io===t){let n=eb();if(n&&n.getAttribute("href")===e)return}io=t,Ad()}function Ed(){il=xd(tb()),q(io)}function al(){return ce(Pt())}function sl(t,e){!t||!e||t===e||(D===t&&(D=e),ht===t&&(ht=e),Tt===t&&(Tt=e))}function rb(){let t=al();if(!(Y()||ft||tt))return ht="",t;if(ht&&t&&ht!==t)if(X(ht,t))sl(ht,t),ht=t;else return ht="",t;else!ht&&t&&(ht=t);return ht||t}function Sd(t){return!D||!t?!1:D===t?!0:X(D,t)}function Hd(){ft=!1,tt=!1,D=null,ht=""}function Id(t){Tt=t,Hd(),mn=!1,ra=!0,q("wait")}function rl(t){return!t&&mn}function ob(){if(!_t)return;let t=al();if(Tt&&t&&Tt!==t&&!X(Tt,t)){Id(t);return}Tt&&t&&X(Tt,t)&&sl(Tt,t),t&&(Tt=t);let e=Y(),n=e&&!G();if(ra){if(G()){q("wait");return}ra=!1}if(G()){q("wait");return}let r=rb(),o=Ie();if(cn()&&!e){ft=!1,tt=!1,D=null,q(o?"wait":rl(o)?"ready":"wait");return}if(Zt()&&!e&&ft){q("error"),ft=!1,tt=!1,D=null;return}if(n){ft||(mn=!1),ft=!0,tt=!1,D=r,q("rotate");return}if(ft)if(!Sd(t))ft=!1,tt=!1,D=null;else if(tt){ft=!1,tt=!0,D=t||r,q("done");return}else{q("rotate");return}if(tt)if(D&&t&&!Sd(t))tt=!1,D=null;else if(o){D=r||D,q("done");return}else if(rl(o)){tt=!1,q("ready");return}else{tt=!1,q("wait");return}D=null,o?q("wait"):rl(o)?q("ready"):q("wait")}function fn(){_t&&(Bd(),Rd(),Pd(),ob())}function Nd(){if(Zn){for(let t of Ld)Zn.removeEventListener(t,Od,!0);Zn=null}}function Rd(){let t=Dt(),e=t&&t!==document.body?t:null;if(!(Zn===e&&e?.isConnected)&&(Nd(),!!e)){Zn=e;for(let n of Ld)Zn.addEventListener(n,Od,{capture:!0,passive:!0})}}function Pd(){let t=Dt();if(!(un&&ol===t&&t.isConnected)){if(un?.disconnect(),ol=t,!t||t===document.body){un=null;return}un=new MutationObserver(()=>oa()),un.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function oa(){if(_t){if(document.hidden){Lt&&(cancelAnimationFrame(Lt),Lt=0),fn();return}Lt||(Lt=requestAnimationFrame(()=>{Lt=0,_t&&fn()}))}}function Od(){Vt()&&(mn=!0),oa()}function Td(){Vt()&&(mn=!0),oa()}function ib(){_t&&(Lt&&(cancelAnimationFrame(Lt),Lt=0),fn())}function ab(){_t&&(mn=!1,fn())}function sb(t){if(!_t)return;if(t.userStopped){ft=!1,tt=!1,D=null,q("wait");return}if(t.error){ft=!1,tt=!1,D=null,q("error");return}let e=al();if(t.contextKey&&e&&t.contextKey!==e&&!X(t.contextKey,e)){ft=!1,tt=!1,D=null,q("wait");return}ft=!1,tt=!0,D=e||t.contextKey,q("done")}function lb(){_t&&fn()}function cb(t,e){if(_t){if(X(e,t)){sl(e,t),Tt=t,fn();return}Id(t)}}function Bd(){let t=st();!t||wd.has(t)||(wd.add(t),t.addEventListener("input",Td,{capture:!0,passive:!0}),t.addEventListener("compositionend",Td,{capture:!0,passive:!0}))}var Dd=E({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:kd,startAt:"DOMContentLoaded",cleanupSelectors:[`#${dn}`],start(){_t=!0,Jt=Cd()||Jt,Ed(),na?.disconnect(),na=pd(dn,t=>{De(t)&&(Jt=t),Ad()}),Xn?.abort(),Xn=new AbortController,window.addEventListener("popstate",oa,{signal:Xn.signal}),document.addEventListener("visibilitychange",ib,{signal:Xn.signal}),Bd(),Rd(),Pd(),ea?.(),ea=dt({onRise:ab,onFall:sb,onTick:lb,onContext:cb}),fn(),Qh.debug("favicon watch started")},stop(){_t=!1,Lt&&cancelAnimationFrame(Lt),Lt=0,ea?.(),ea=null,Xn?.abort(),Xn=null,Nd(),un?.disconnect(),un=null,ol=null,na?.disconnect(),na=null,Hd(),Tt="",mn=!0,ra=!1,io="wait",md(dn,Jt)},onSettingsChange:Ed});var _d=`.bloom-ih-hud {
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
`;var GE=new C("InputHistory"),ll=/\u200B/g,qd=10,$d=500,Fd=100,db=8,fb=120,mb=2e3,ia=10,aa=M({maxEntries:{type:4,description:"Max stored prompts",min:qd,max:$d,default:Fd},history:{type:5,description:"Stored prompts",render:Mb},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),cl=new Map,et=0,ul="",Qt=!1,so=!1,ml=0,ao=null,dl,pl=null,jd=!0;function qt(){let t=aa.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function zd(t){let e=at(Number(aa.store.maxEntries??Fd),qd,$d);return t.length>e?t.slice(t.length-e):t}function sa(t){aa.store.entries=zd(t)}function pb(t){return t.replaceAll(ll,"").replace(/\n$/,"").trim()}function fl(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Wt);return n instanceof HTMLElement?n:st()}function gb(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Yt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(ll,"").trim().length===0,last:i.toString().replaceAll(ll,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Gd(t){clearTimeout(dl),dl=setTimeout(()=>{if(t!==ml)return;so=!1;let e=pl;e&&Zs(e,jd)},fb)}function Ud(t,e,n){so=!0,pl=t,jd=n;let r=++ml;me(t,e,n),Gd(r)}function hb(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Jn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function bb(){document.querySelector(".bloom-ih-hud")?.remove()}function yb(t,e){let n=hb();n.textContent=t;let r=(e.closest("form")??Dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-db)}px`,n.classList.add("bloom-ih-hud-on")}function gl(t){let e=pb(t);if(!e)return;let n=Date.now(),r=cl.get(e);if(r&&n-r<mb)return;cl.set(e,n);let o=qt().filter(i=>i!==e);o.push(e),sa(o),et=qt().length,Qt=!1,Jn()}function vb(t,e){let n=qt();if(!n.length&&t)return;et>=n.length&&(ul=Yt(e),et=n.length);let r=t?et-1:et+1;r<0||r>n.length||(et=r,Qt=!0,Ud(e,r===n.length?ul:n[r],t),r<n.length?yb(`${r+1} / ${n.length}`,e):Jn())}function xb(t){Qt=!1,Jn(),Ud(t,ul,!1),et=qt().length}function wb(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=fl(t.target)??fl(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Qt&&!t.altKey&&!t.shiftKey){xb(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){gl(Yt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=qt();if(!r){let i=gb(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||et<=0)||!n&&et>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),vb(n,e))}function Eb(t){if(fl(t.target)){if(so){Gd(ml);return}Qt&&(Qt=!1,Jn(),et=qt().length)}}function Sb(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Wt);n instanceof HTMLElement&&gl(Yt(n))}function Tb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Vn);if(!n||!(n instanceof HTMLElement)||z(n))return;let r=st();r&&gl(Yt(r))}function Lb(t){if(!(!Qt||so)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Qt=!1,Jn()}}function kb(){if(ao)return;ao=new AbortController;let{signal:t}=ao,e={capture:!0,signal:t};window.addEventListener("keydown",wb,e),window.addEventListener("input",Eb,e),window.addEventListener("submit",Sb,e),window.addEventListener("click",Tb,e),window.addEventListener("pointerdown",Lb,e)}function Cb(t){let e=qt().slice();e.splice(t,1),sa(e),et>e.length&&(et=e.length)}function Mb(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=qt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/ia));n>=l&&(n=l-1);let c=s.slice(n*ia,n*ia+ia);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((w,b)=>{let v=i.indexOf(w),ot=qt().length-1-v,W=document.createElement("div");W.className="bloom-ih-item";let J=document.createElement("button");J.type="button",J.className=`bloom-ih-body${r===b?"":" bloom-ih-clamp"}`,J.textContent=w,J.addEventListener("click",()=>{r=r===b?-1:b,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let ut=document.createElement("button");ut.type="button",ut.title="Copy",ut.textContent="C",ut.addEventListener("click",()=>{Vc(w)});let vt=document.createElement("button");vt.type="button",vt.title="Delete",vt.textContent="\xD7",vt.addEventListener("click",()=>{Cb(ot),o()}),O.append(ut,vt),W.append(J,O),g.appendChild(W)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let h=document.createElement("button");h.type="button",h.className="bloom-ih-clear",h.textContent="Clear all",h.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(sa([]),et=0,o())}),d.append(f,m,p,h),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Kd=E({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:aa,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",_d),et=qt().length,Qt=!1,kb()},stop(){ao?.abort(),ao=null,Jn(),bb(),cl.clear(),clearTimeout(dl),so=!1,pl=null,Qt=!1},onSettingsChange(){let t=qt(),e=zd(t);e.length!==t.length&&sa(e),et>e.length&&(et=e.length)}});var hl="noShareLink",Ab=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Hb=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],bl=M({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Wd(t){return`${t.join(",")}{display:none!important}`}function Vd(){let t=[];if(bl.store.hideShareChat!==!1&&t.push(Wd(Ab)),bl.store.hideShareProject!==!1&&t.push(Wd(Hb)),!t.length){L(hl);return}k(hl,t.join(`
`))}var Yd=E({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:bl,start:Vd,onSettingsChange:Vd,stop(){L(hl)}});var Jd="noDictation",Ib=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Nb=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Qd=M({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Xd(t){return`${t.join(",")}{display:none!important}`}function Zd(){let t=[Xd(Ib)];Qd.store.hideDictationSettings!==!1&&t.push(Xd(Nb)),k(Jd,t.join(`
`))}var tf=E({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Qd,start:Zd,onSettingsChange:Zd,stop(){L(Jd)}});var yl="noSidebarIdentity",Qn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],rf=Qn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),of=Qn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Rb=[...rf,...of],Pb=[...rf,...Qn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Ob=Qn.map(t=>`${t} a[href^="mailto:"]`),Bb=Qn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Db=Qn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),lo=M({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function ef(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function _b(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function qb(){return`${Db.join(",")}{margin-block:auto!important}`}function $b(){return`${Bb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function nf(){let t=lo.store.hideUsername!==!1,e=lo.store.hideEmail!==!1,n=t&&lo.store.enlargePlan!==!1,r=t&&lo.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(_b([...Pb,...of])),o.push(qb())):o.push(ef(Rb))),e&&o.push(ef(Ob)),n&&o.push($b()),!o.length){L(yl);return}k(yl,o.join(`
`))}var af=E({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:lo,start:nf,onSettingsChange:nf,stop(){L(yl)}});var sf=`#bloom-rt-host {
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
`;var uf=new C("RecentTopics"),nr="bloom-rt-host",df="home",ff=/^\/c\/([a-z0-9_-]{8,})/i,jb=/\/c\/([a-z0-9_-]{8,})/i,mf=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,zb=new Set(["Backquote","IntlBackslash"]),Gb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Ub=140,Kb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),nt=M({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Kb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),la=null,ca=null,bt=!1,go=!1,co=!1,te=0,pn="",tr=null,uo=null,er,vl=null,xl=null;function Wb(){let t=Number(nt.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function fo(){let t=nt.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function El(){let t=nt.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function pf(){let t=nt.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Sl(){let t=nt.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function da(t){let e=Wb();return t.length>e?t.slice(0,e):t}function ee(t){return t===df}function mo(t,e=Ub){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Tl(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(ff)?.[1]??""}catch{return t.match(jb)?.[1]??""}}function gn(){let t=(location.pathname||"/").match(ff);if(t?.[1])return t[1];let n=Pt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return df}function Ll(t){if(ee(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Tl(r.getAttribute("href")||"")!==t)continue;let o=mo(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return gn()===t&&e&&!/^ChatGPT$/i.test(e)?mo(e,80):""}function Vb(t){if(ee(t))return"New chat";let e=El()[t];if(e)return e;let n=$n(t);return n||Ll(t)||"Chat"}function Yb(t){return Sl()[t]||""}function Xb(t){return pf()[t]||{}}function kl(t,e){if(!t||ee(t)||!e||/^new chat$/i.test(e.trim()))return;let n=El();n[t]!==e&&(n[t]=e,nt.store.titles=n)}function Zb(t){t.type==="conversation-meta"&&(kl(t.conversationId,t.title),bt&&rr())}function Jb(t,e){if(!t||ee(t)||!e)return;let n=Sl();n[t]!==e&&(n[t]=e,nt.store.projects=n)}function Qb(t,e){if(!t||ee(t)||!e.user&&!e.assistant)return;let n=pf(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,nt.store.previews=n)}function Cl(t){if(!t||ee(t)&&nt.store.includeHome===!1)return;let e=fo().filter(n=>n!==t);e.unshift(t),nt.store.visits=da(e)}function fa(){let t=nt.store.includeHome!==!1;return da(fo().filter(n=>t||!ee(n))).map(n=>({id:n,title:Vb(n),project:Yb(n),preview:Xb(n)}))}function lf(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return mo(o)}catch{return""}}function po(t){if(!t||ee(t)||t!==gn())return;let e=Ll(t);e&&kl(t,e);let n=lf("user"),r=lf("assistant");Qb(t,{user:n,assistant:r});let o=hf(t);if(o){let i=gf(o);i&&Jb(t,i)}}function Ml(){let t=El(),e=Sl(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${nr}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Tl(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=mo(c.textContent||"",80);d&&!mf.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=gf(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(nt.store.titles=t),i&&(nt.store.projects=e);let a=fo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(nt.store.visits=da([...a,...l]))}function gf(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=mo((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!mf.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function hf(t){if(ee(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Tl(e.getAttribute("href")||"")===t)return e}catch{}return null}function t0(t){let e=hf(t);if(e){e.click();return}if(ee(t)){location.assign("/");return}location.assign(`/c/${t}`)}function e0(){let t=gn();pn&&pn!==t&&po(pn),pn=t,Cl(t),Ml();let e=Ll(t);e&&kl(t,e),po(t)}function ua(){er===void 0&&(er=window.setTimeout(()=>{er=void 0,e0()},120))}function n0(){tr||(tr=history.pushState.bind(history),uo=history.replaceState.bind(history),history.pushState=function(...e){let n=tr(...e);return ua(),n},history.replaceState=function(...e){let n=uo(...e);return ua(),n})}function r0(){tr&&(history.pushState=tr),uo&&(history.replaceState=uo),tr=null,uo=null}function o0(t){return zb.has(t.code)||t.keyCode===192?!0:Gb.has(t.key)}function bf(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function i0(t,e){go=e,Ml(),po(gn()),bt=!0,te=0;try{let n=gn();Cl(n);let r=fa();r.length>1&&(te=t?r.length-1:1)}catch(n){uf.error("Failed to open switcher:",n)}rr()}function cf(t){let{length:e}=fa();e&&(te=(te+(t?-1:1)+e)%e,rr())}function Al(){if(!bt)return;let t=fa()[te];bt=!1,go=!1,rr(),t&&t0(t.id)}function yf(){bt&&(bt=!1,go=!1,rr())}function a0(t){if(bf(t)){co=!0;return}if((t.ctrlKey||co)&&!t.altKey&&!t.metaKey&&o0(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{bt?cf(t.shiftKey):i0(t.shiftKey,!0)}catch(n){uf.error("Hotkey failed:",n)}return}if(bt){if(t.key==="Escape"){t.preventDefault(),yf();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Al();return}t.key==="Tab"&&(t.ctrlKey||co)&&(t.preventDefault(),cf(t.shiftKey))}}function s0(t){bf(t)&&(co=!1,bt&&go&&Al())}function l0(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ua)}function c0(t){!bt||(t.target instanceof Element?t.target:null)?.closest(`#${nr}`)||yf()}function u0(){document.visibilityState==="hidden"&&po(gn())}function wl(t=ca){t instanceof HTMLElement&&Ii(t,Hi("auto"),!0)}function d0(){if(!document.body)return null;let t=document.getElementById(nr);if(t instanceof HTMLElement)return ca=t,wl(t),t;t=document.createElement("div"),t.id=nr;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ca=t,wl(t),t}function rr(){let t=d0();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!bt){e.dataset.visible="false",e.replaceChildren();return}let n=fa();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}te>=n.length&&(te=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===te?"true":"false",s.setAttribute("aria-selected",a===te?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{te=a,Al()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function f0(){document.getElementById(nr)?.remove(),ca=null}var vf=E({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${nr}`],settings:nt,start(){k("recentTopics",sf),pn=gn(),Cl(pn),Ml(),po(pn),vl=wt(Zb),n0(),la=new AbortController;let{signal:t}=la;window.addEventListener("keydown",a0,{capture:!0,signal:t}),window.addEventListener("keyup",s0,{capture:!0,signal:t}),window.addEventListener("popstate",ua,{signal:t}),document.addEventListener("click",l0,{capture:!0,signal:t}),document.addEventListener("click",c0,{signal:t}),document.addEventListener("visibilitychange",u0,{signal:t}),xl=Bn("schemeChange",()=>wl())},stop(){la?.abort(),la=null,er!==void 0&&(clearTimeout(er),er=void 0),r0(),vl?.(),vl=null,xl?.(),xl=null,bt=!1,go=!1,co=!1,f0()},onSettingsChange(){let t=da(fo());t.length!==fo().length&&(nt.store.visits=t),bt&&rr()}});var Hl="cleaner",m0=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],p0=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],g0=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],h0=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],b0=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],y0=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],hn=M({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function or(t){return`${t.join(",")}{display:none!important}`}function xf(){let t=[];if(hn.store.hideDownloadApps!==!1&&t.push(or(m0)),hn.store.hideDisclaimer!==!1&&t.push(or(p0)),hn.store.hideUpgrade!==!1&&t.push(or(g0)),hn.store.hideLockedModels!==!1&&t.push(or(h0)),hn.store.hideHomePromo!==!1&&t.push(or(b0)),hn.store.hideAds!==!1&&t.push(or(y0)),!t.length){L(Hl);return}k(Hl,t.join(`
`))}var wf=E({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:hn,start:xf,onSettingsChange:xf,stop(){L(Hl)}});var pa=new C("ResponseNotification"),ar=M({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:L0},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Il=!1,ma=null,ir=null,ho=null;function v0(){return document.visibilityState==="hidden"||document.hidden}function x0(){return ar.store.onlyWhenHidden===!1?!0:v0()}function w0(){let t=$n(A());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Ef(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!ir||ir.state==="closed")&&(ir=new t);let e=ir,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){pa.debug("chime failed",t)}}function E0(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){pa.debug("custom sound failed",e),Ef()}}function Sf(){let t=String(ar.store.soundUrl||"").trim();t?E0(t):Ef()}function S0(){let t="Bloom++",e=`${w0()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){pa.debug("notification failed",n)}}function T0(){x0()&&(ar.store.sound!==!1&&Sf(),ar.store.browserNotification!==!1&&S0())}function L0(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Sf()),t.appendChild(e),()=>{e.remove()}}var Tf=E({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ar,start(){Il=!0,ma?.(),ma=dt(t=>{if(!Il||t.userStopped||t.error)return;let e=A()||Yn();t.conversationId&&t.conversationId!==e||T0()}),ho?.abort(),ho=new AbortController,ar.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:ho.signal}),pa.debug("watch started")},stop(){Il=!1,ma?.(),ma=null,ho?.abort(),ho=null;try{ir?.close()}catch{}ir=null}});var Lf=`#bloom-pq-chip {
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
`;var je=new C("PromptQueue"),va="bloom-pq-chip",kf="promptQueue",C0=8,M0=50,A0=2e3,H0='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',I0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,N0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Nl=M({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),$e=new Map,Cf=0,Ft=!1,$t="",P="",ne=!1,yt=!1,Ge=!1,B=null,bo=null,ga=null,qe,Eo,ze=null,R=null,sr=null,ba=!1,lt=null,bn,Fe=!0,K=!1,U=!1,mt=!1;function pe(){return ce(Pt())}function lr(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function R0(t){let e=lr(Yt(t));if(e)return e;if(!Vt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),lr(n.innerText||n.textContent||"")}catch{return""}}function Pf(){try{let t=document.querySelectorAll(H0),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Of(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Bf(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&I0.test(n))return!0}}catch{}return!1}function ya(){let t=Yn();if(!t)return!1;let e=A();return!e||e===t}function wo(){if(Y()||ya())return!1;let t=Pf();if(!t)return!0;if(Of(t)||Bf(t))return!1;try{if(t.querySelector(N0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function P0(){if(G()||cn())return K=!1,!1;if(Y()||ya())return K=!0,!0;let t=Pf();return t&&(Of(t)||Bf(t))?(K=!0,!0):K&&!wo()?!0:(K=!1,!1)}function Df(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Wt);return n instanceof HTMLElement?n:null}function Mf(t){return Df(t)??st()}function xa(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function _f(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function O0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?lr(e.innerText||e.textContent||""):""}catch{return""}}function B0(){return Cf+=1,`pq${Date.now().toString(36)}${Cf.toString(36)}`}function Z(t){return $e.get(t)??[]}function qf(t){return Z(t)[0]}function yn(t,e){e.length?$e.set(t,e):$e.delete(t)}function $f(t){if(!Z(t).length){U=!1,mt=!1,P="";return}U=!0,mt=!1,K=!0,P=""}function Af(t){if(!$t||$t===t)return;let e=$e.get($t);!e?.length||$e.has(t)||X($t,t)&&($e.delete($t),$e.set(t,e),P===$t&&(P=t),B?.key===$t&&(B.key=t),je.debug("migrated pending",$t,"\u2192",t))}function wa(t){let e=pe(),n=Z(e);if(Nl.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),yn(e,n)}else if(n.length>=C0){je.debug("queue full",e);return}else n.push({id:B0(),text:t,at:Date.now()}),yn(e,n);K=!0,B={key:e,text:t,turns:_f(),ticks:3};let r=st();r&&me(r,"");try{ct()}catch(o){je.error("chip",o)}je.debug("queued",e,n.length,t.length)}function Ff(t,e){let n=Z(t).filter(r=>r.id!==e);if(yn(t,n),R===e&&(R=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}ct()}function Ol(){sr?.abort(),sr=null}function D0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function Hf(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function _0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||R||lt)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;sr?.abort();let c=new AbortController;sr=c;let{signal:u}=c,d=!1,f=!1,m=0,p=0,h=0,g=0,w=null,b=[],v=[],ot=()=>{e.classList.add("bloom-pq-settling");for(let y of b)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},W=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(w?.isConnected?w.before(t):e.append(t)),w?.remove(),w=null,ot(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},J=()=>{ba=!0;let y=H=>{H.preventDefault(),H.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{ba=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=Hf(b.length,m,p),H=v.length>1?(v[v.length-1].top-v[0].top-v.slice(0,-1).reduce((I,Gt)=>I+Gt.height,0))/(v.length-1):2,pt=new Array(v.length),xt=v[0]?.top??0;for(let I of y)pt[I]=xt,xt+=v[I].height+H;for(let I=0;I<b.length;I++){if(I===m)continue;let Gt=pt[I]-v[I].top;b[I].style.transform=Math.abs(Gt)<.5?"":`translate3d(0,${Math.round(Gt)}px,0)`}},ut=()=>{let y=Z(n).slice();if(m<0||m>=y.length)return;let H=Hf(y.length,m,p);if(H.every((I,Gt)=>I===Gt))return;let pt=H.map(I=>y[I]).filter(Boolean);if(pt.length!==y.length)return;yn(n,pt);let xt=new Map(b.map(I=>[I.dataset.pqId||"",I]));for(let I of pt){let Gt=xt.get(I.id);Gt&&e.append(Gt)}},vt=y=>{if(f)return;f=!0;let H=d;sr===c&&(sr=null),H&&y&&t.isConnected&&ut(),W(),H&&J(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;W(),y&&J()});let Qo=()=>{d=!0,b.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=b.indexOf(t),m<0&&(m=b.findIndex(I=>I.dataset.pqId===r)),p=m<0?0:m;let y=t.getBoundingClientRect();h=y.left,g=y.top;let H=getComputedStyle(t);w=document.createElement("div"),w.className="bloom-pq-gap",w.style.height=`${y.height}px`,t.before(w),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=H.color,t.style.font=H.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let pt=e.getBoundingClientRect(),xt=e.scrollTop;v=b.map(I=>{let gs=(I===t?w:I).getBoundingClientRect(),$c=gs.top-pt.top+xt;return{top:$c,height:gs.height,mid:$c+gs.height/2}})},x=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(Qo(),!d||m<0)))return;y.preventDefault(),t.style.left=`${h+(y.clientX-s)}px`,t.style.top=`${g+(y.clientY-l)}px`;let H=e.getBoundingClientRect(),pt=y.clientY-H.top+e.scrollTop,xt=D0(pt,v.map(I=>I.mid));xt!==p&&(p=xt,O())},N=y=>{y.pointerId===a&&vt(!0)};window.addEventListener("pointermove",x,{signal:u}),window.addEventListener("pointerup",N,{signal:u}),window.addEventListener("pointercancel",()=>vt(!1),{signal:u})})}function q0(){yt=!0,clearTimeout(Eo),Eo=setTimeout(()=>{yt=!1,Eo=void 0},A0)}function $0(t){if(lt)return;let e=pe(),n=Z(e).find(i=>i.id===t);if(!n)return;let r=st();if(!r)return;let o=n.text;lt=t,R===t&&(R=null),Ol(),ct(),clearTimeout(bn),bn=setTimeout(()=>{if(bn=void 0,!Ft||lt!==t)return;if(lt=null,pe()!==e||!Z(e).some(a=>a.id===t)){ct();return}yn(e,Z(e).filter(a=>a.id!==t)),ct(),q0(),me(r,o);let i=Ne();i&&!z(i)&&!Wi(i)&&(i.click(),yt=!1),$f(e)},160)}function yo(t){if(!Ft||ne||U||lt||Y()||pe()!==t)return;let e=qf(t);if(!e){P="";return}if(Zt())return;let n=st();if(!n)return;if(!Ie(n)){let o=lr(Yt(n));if(o&&o!==e.text)return}let r=Ne();!r||z(r)||Wi(r)||(ne=!0,me(n,e.text),clearTimeout(qe),qe=setTimeout(()=>F0(t,e.id,e.text),M0))}function F0(t,e,n){qe=void 0;try{if(!Ft||U||lt)return;let r=qf(t);if(!r||r.id!==e||r.text!==n||Y()||pe()!==t)return;let o=st();if(!o)return;let i=lr(Yt(o));if(i&&i!==n&&!Ie(o))return;i!==n&&me(o,n);let a=Ne();if(!a||z(a)||Wi(a))return;a.click(),yn(t,Z(t).filter(s=>s.id!==e)),ct(),$f(t),je.debug("drained",t,Z(t).length)}finally{ne=!1}}function Rl(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Dt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Pl(){Ol(),ze?.remove(),ze=null,R=null,Fe=!0}var jf="http://www.w3.org/2000/svg";function j0(){let t=document.createElementNS(jf,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function vo(t){let e=j0();for(let n of t){let r=document.createElementNS(jf,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function xo(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&zf(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function z0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${va}`)}function ha(){let t=ze?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function G0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function _e(t,e){if(R!==t)return;if(R=null,e===null){ct();return}let n=lr(e),r=pe();if(!n){Ff(r,t);return}let o=Z(r).find(i=>i.id===t);o&&(o.text=n),ct()}function If(t){lt||R!==t&&(R&&_e(R,ha()),Z(pe()).some(e=>e.id===t)&&(R=t,Fe=!0,ct()))}function zf(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function Nf(t){return R===t?"edit":lt===t?"send":"text"}function U0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function K0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||U0(l)!==Nf(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",Fe?"true":"false"),n.hidden=!Fe;for(let s of e){let l=a.get(s.id);if(Nf(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function ct(){if(Ol(),!Ft||!document.body){Pl();return}let t=pe(),e=Z(t);if(!e.length){Pl();return}R&&!e.some(d=>d.id===R)&&(R=null),lt&&!e.some(d=>d.id===lt)&&(lt=null);let n=ze;if(n?.isConnected||(n=document.createElement("div"),n.id=va,document.body.appendChild(n),ze=n),K0(n,e)){Rl(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",Fe?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Fe=!Fe,ct()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",Fe||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=R===d.id,p=lt===d.id;m||(f.setAttribute("role","button"),f.tabIndex=p?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),p&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let h=document.createElement("div");h.className="bloom-pq-body";let g;if(m){let b=document.createElement("textarea");b.className="bloom-pq-text bloom-pq-editing",b.value=d.text,b.rows=2,b.spellcheck=!1,b.setAttribute("aria-label","Queued message text"),b.addEventListener("keydown",v=>{v.stopPropagation(),v.key==="Enter"&&!v.shiftKey?(v.preventDefault(),_e(d.id,b.value)):v.key==="Escape"&&(v.preventDefault(),_e(d.id,null))}),b.addEventListener("blur",()=>_e(d.id,b.value)),g=b,u=b}else{let b=document.createElement("span");b.className="bloom-pq-text line-clamp-2",b.textContent=p?"Sending":d.text,p?zf(b,l,"Sending now"):b.addEventListener("click",v=>{if(ba){ba=!1,v.preventDefault(),v.stopPropagation();return}v.preventDefault(),v.stopPropagation(),If(d.id)}),g=b}h.append(g),f.append(h);let w=document.createElement("div");if(w.className="bloom-pq-rail",m){let b=xo("Save",vo(["M20 6 9 17l-5-5"]),()=>{_e(d.id,g instanceof HTMLTextAreaElement?g.value:ha())},l),v=xo("Cancel",vo(["M18 6 6 18","m6 6 12 12"]),()=>{_e(d.id,null)},l);w.append(b,v)}else{let b=xo("Remove from queue",vo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{R&&R!==d.id&&_e(R,ha()),R=R===d.id?null:R,Ff(t,d.id)},l,void 0,p),v=xo("Edit queued message",vo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>If(d.id),l,"Edit",p),ot=xo("Send now",vo(["M12 19V5","M6 11 12 5l6 6"]),()=>{R&&R!==d.id&&_e(R,ha()),$0(d.id)},l,"Send now (or Enter on empty composer)",p);w.append(b,v,ot)}f.append(w),!m&&!p&&_0(f,c,t,d.id),c.append(f)}if(n.append(o,c),Rl(n),u){let d=u,f=R;queueMicrotask(()=>{R===f&&d.isConnected&&G0(d)})}}function W0(){if(!B)return;B.ticks-=1;let t=Z(B.key);if(t.length&&_f()>B.turns){let e=O0();if(e&&e===B.text){je.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),yn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,ct();return}}B.ticks<=0&&(B=null)}function Ea(t){return!P0()||!Vt(t)?"":R0(t)}function V0(t){if(!Ft||t.isComposing||t.keyCode===229||t.key!=="Enter"||z0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||ne)return;let e=Mf(t.target)??Mf(document.activeElement);if(!e)return;if(t.altKey||yt){yt=!1,Ge=!0,queueMicrotask(()=>{Ge=!1});return}let n=Ea(e);n&&(xa(t),wa(n))}function Y0(t){if(!Ft||ne||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Ge){Ge=!1;return}if(yt){yt=!1;return}let e=Df(t.target);if(!e)return;let n=Ea(e);n&&(xa(t),wa(n))}function X0(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||z(e))return null;let n=t.closest(Vn);if(n instanceof HTMLElement&&!z(n))return n;let r=Ne();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Rf(t){if(!Ft)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${va}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&z(n)||ne||!X0(e))return;if(yt){yt=!1;return}let r=st();if(!r)return;let o=Ea(r);o&&(xa(t),wa(o))}function Z0(t){if(!Ft)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Ki)&&!e.querySelector(Wt)||ne)return;if(Ge){Ge=!1;return}if(yt){yt=!1;return}let n=st()??e.querySelector(Wt);if(!n)return;let r=Ea(n);r&&(xa(t),wa(r))}var Gf=E({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:kf,cleanupSelectors:[`#${va}`],settings:Nl,start(){Ft=!0;let t=Nl.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),$t=pe(),P="",ne=!1,yt=!1,Ge=!1,B=null,K=!G()&&!cn()&&(Y()||ya()),U=!1,mt=!1,R=null,lt=null,clearTimeout(bn),bn=void 0,k(kf,Lf),bo?.abort(),bo=new AbortController;let{signal:e}=bo,n={capture:!0,signal:e};window.addEventListener("keydown",V0,n),document.addEventListener("beforeinput",Y0,n),document.addEventListener("pointerdown",Rf,n),document.addEventListener("click",Rf,n),document.addEventListener("submit",Z0,n),ga?.(),ga=dt({onFall(r){if(Ft){if(r.userStopped||r.error){K=!1,U=!1,mt=!1,P="",ct();return}if(!(U&&!mt)){if(U&&mt){if(!wo())return;U=!1,mt=!1,K=!1,P=r.contextKey,yo(r.contextKey);return}if(!wo()){je.debug("unsettled fall; keep queue window");return}K=!1,P=r.contextKey,yo(r.contextKey)}}},onRise(){G()||cn()||(U&&(mt=!0),K=!0)},onContext(r,o){o&&r&&!X(o,r)&&(K=!1,U=!1,mt=!1,P="",ne=!1,qe!==void 0&&(clearTimeout(qe),qe=void 0)),Af(r),$t=r,ct()},onTick(r){Af(r.contextKey),$t=r.contextKey,W0(),(G()||cn())&&(U=!1,mt=!1,K=!1,P=""),U&&(Y()||ya())&&(mt=!0),U&&mt&&wo()&&(U=!1,mt=!1,K=!1,Z(r.contextKey).length&&(P=r.contextKey,yo(r.contextKey))),!U&&K&&wo()&&(K=!1,!P&&Z(r.contextKey).length&&(P=r.contextKey,yo(r.contextKey))),!U&&P&&P===r.contextKey&&yo(P),Z(r.contextKey).length&&!ze?.isConnected?ct():ze&&Rl(ze)}}),ct(),je.debug("watch started")},stop(){Ft=!1,ga?.(),ga=null,bo?.abort(),bo=null,clearTimeout(qe),qe=void 0,clearTimeout(Eo),Eo=void 0,clearTimeout(bn),bn=void 0,lt=null,$e.clear(),B=null,P="",ne=!1,yt=!1,Ge=!1,K=!1,U=!1,mt=!1,Pl()}});var Uf=`.bloom-cls {
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
`;var Vf=new C("ChatListStatus"),Kf="chatListStatus",La="bloom-cls",Q0="bloom-cls",ty=1200*1e3,ey="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",jt=new Map,re=!1,kt="",ge=!1,dr=!1,Ct=0,Ue=null,_l=null,cr=null,Bl=null,Sa=null,So=null,ur=!1,Ke=new Set;function Ta(){return Date.now()}function Yf(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function he(t,e,n,r=!0){if(!(!t||!re)){if(e==="idle")jt.delete(t);else{let o=jt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ta():jt.set(t,{kind:e,at:Ta(),source:n})}r&&ny({v:1,id:t,kind:e,at:Ta()}),vn()}}function ny(t){try{cr?.postMessage(t)}catch{}}function ry(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||he(e.id,e.kind,"bc",!1)}function oy(){let t=Ta();for(let[e,n]of jt)n.kind==="streaming"&&t-n.at>ty&&jt.delete(e)}function iy(){let t=Yf();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(ey))continue;let o=ue(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Wf(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Dl(t){let e=t.querySelector(`:scope > .${La}`);return e||null}function ql(){if(!re)return;oy();let t=A(),e=iy();Ue?.disconnect();try{for(let n of e){let r=ue(n.getAttribute("href")||"");if(!r||!t||r!==t){Dl(n)?.remove();continue}let i=jt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Dl(n)?.remove();continue}let a=Dl(n);a||(a=document.createElement("span"),a.className=La,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Wf("streaming")):i==="error"&&a.appendChild(Wf("error")))}}catch(n){Vf.debug("paint failed",n)}Xf()}function vn(){if(re){if(document.hidden){Ct&&(cancelAnimationFrame(Ct),Ct=0),ql();return}Ct||(Ct=requestAnimationFrame(()=>{Ct=0,re&&ql()}))}}function Xf(){let t=Yf();if(!(Ue&&_l===t&&t?.isConnected)){if(Ue?.disconnect(),_l=t,!t){Ue=null;return}Ue=new MutationObserver(()=>vn()),Ue.observe(t,{childList:!0,subtree:!0})}}function ka(){return!!(rn()||no())}function ay(t){return!!(ur||t&&Ke.has(t)||!dr&&!G()&&ka())}function sy(t){if(re){if(t.type==="post-start"){dr=!1,t.conversationId?(ur=!1,Ke.add(t.conversationId),ge=!0,he(t.conversationId,"streaming","net")):(ur=!0,ge=!0);return}if(t.type==="post-end"){if(ur=!1,t.conversationId){Ke.delete(t.conversationId);let e=A(),n=Yn();(e?t.conversationId===e:t.conversationId===n)?he(t.conversationId,t.error?"error":"done","net"):he(t.conversationId,"idle","net")}ka()||(ge=!1)}}}function ly(t,e){if(!re)return;if(X(e,t)){vn();return}let n=A();if(kt&&kt!==n){Ke.delete(kt);let r=jt.get(kt);r&&r.kind!=="idle"&&he(kt,"idle","local")}ur=!1,ge=!1,dr=!0,n&&jt.get(n)?.kind==="streaming"&&jt.get(n)?.source==="local"&&!Ke.has(n)&&he(n,"idle","local"),vn()}function cy(t){if(!re)return;let e=t.conversationId||A();if(kt&&e&&kt!==e){Ke.delete(kt);let r=jt.get(kt);r&&r.kind!=="idle"&&he(kt,"idle","local"),ge=!!(e&&Ke.has(e))}if(e&&(kt=e),dr||G()){if(G()||ka()||t.streaming){vn();return}dr=!1}if(ay(e)&&(t.streaming||ka())){ge=!0,e&&he(e,"streaming","local"),vn();return}ge&&(ge=!1,e&&he(e,Zt()?"error":"done","local")),vn()}var Zf=E({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${La}`],start(){re=!0,k(Kf,Uf);try{cr=new BroadcastChannel(Q0)}catch{cr=null}cr?.addEventListener("message",ry),Bl=wt(sy),Sa?.(),Sa=dt({onTick:cy,onContext:ly}),So?.abort(),So=new AbortController,document.addEventListener("visibilitychange",()=>{re&&(Ct&&(cancelAnimationFrame(Ct),Ct=0),ql())},{signal:So.signal}),Xf(),Vf.debug("sidebar status watch started")},stop(){re=!1,Ct&&cancelAnimationFrame(Ct),Ct=0,So?.abort(),So=null,Ue?.disconnect(),Ue=null,_l=null,Sa?.(),Sa=null,Bl?.(),Bl=null;try{cr?.close()}catch{}cr=null,jt.clear(),Ke.clear(),ur=!1,ge=!1,dr=!1,kt="",document.querySelectorAll(`.${La}`).forEach(t=>t.remove()),L(Kf)}});var Qf="widerChat",tm=40,em=96,nm=64,rm=M({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:tm,max:em,default:nm}});function uy(){return at(Number(rm.store.width??nm),tm,em)}function Jf(){let t=uy(),e=`min(100%,${t}rem)`;k(Qf,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var om=E({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:rm,start:Jf,onSettingsChange:Jf,stop(){L(Qf)}});var $l="composerOpacity",fr='form[data-type="unified-composer"],form.w-full[data-type]',dy=[`${fr} [class*="corner-superellipse"]`,`${fr} [class*="bg-token-bg-primary"]`,`${fr} [class*="bg-token-main-surface"]`].join(","),fy=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),my="#thread-bottom-container,#thread-bottom",py=`${fr} #prompt-textarea,${fr} [contenteditable="true"]`,gy="var(--bg-primary,var(--main-surface-primary,#ffffff))",Fl=M({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function hy(){return at(Number(Fl.store.opacity??100),0,100)}function by(){return at(Number(Fl.store.blur??16),0,40)}function im(){let t=hy();if(t>=100){L($l);return}let e=by(),n=`color-mix(in srgb,${gy} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k($l,`${my}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${fy}{display:none!important}${fr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${dy}{background-color:${n}!important;background-image:none!important;${r}}${py}{background-color:transparent!important;background-image:none!important}`)}var am=E({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Fl,start:im,onSettingsChange:im,stop(){L($l)}});var sm=`#bloom-bn-host {
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
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
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

.bloom-bn-ticks::-webkit-scrollbar {
    width: 0;
    height: 0;
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
    gap: 0.35rem;
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
    padding: 0.55rem 0.6rem;
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
`;var vy=new C("BetterNavigator"),jl="betterNavigator",dm="bloom-bn-host",Sn=60,Kl=1e3,lm=2400,xy=80,fm=2.5,wy=.4,Lo="\u6B63\u5728\u8F93\u51FA\u2026",Wl="Image",Ey="\u2753",Sy="\u{1F916}",cm=/file_[0-9a-f]+/gi,Ty="File",Ly="Code",ky=".markdown, .whitespace-pre-wrap",ec=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Cy="img, picture, video, canvas",My=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,Ay=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Ro=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,Hy=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Iy=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Ny=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,Ry=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,Py=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,Oy=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,By=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Dy=2e3,_y=40,qy=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,mm=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),$y=["#prompt-nav-container","[id*='prompt-nav' i]","[data-testid*='prompt-nav' i]","[aria-label='Prompt navigator' i]","[aria-label='Conversation navigator' i]","nav[aria-label*='prompt navigator' i]","nav[aria-label*='conversation navigator' i]"].join(", "),Fy=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),jy=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),zy=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),gr=M({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),zt=new Map,Ho=new Map,oe=new Set,Aa=0,Ht=!1,ye=!1,mr=!1,ve=null,hr=null,br=null,Ha=null,$=[],En="",Ia=0,Io=-1,No=0,Na="",At=0,be=0,ko,Co=null,Ca=null,zl=null,Gl=null,xn=null,Vl=null,Mo=null,wn=null,xe=null,Ao=null,Ra=!1,Yl=0;function yr(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Ul(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function Gy(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function Uy(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)qy.test(Gy(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Ul(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Ul(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Ul(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Tn(t){try{return!!t.closest(Fy)}catch{return!0}}function um(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Da(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function _a(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function Ky(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Ma(t,e){if(t){cm.lastIndex=0;for(let n of t.matchAll(cm))e.add(n[0].toLowerCase())}}function Wy(t){try{let e=new Set,n=s=>{Ky(s)||(Ma(s.getAttribute("src")||"",e),Ma(s.getAttribute("srcset")||"",e),Ma(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Ma(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Da(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function Vy(t,e){let n=Wy(t),r=Ho.get(e)??0,o=Math.max(r,n);return o>0&&Ho.set(e,o),o>=2?`${Wl} x${o}`:Wl}function F(t){return t.replace(/\s+/g," ").trim()}function pm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(jy))return!0;n=n.parentElement}return!1}function Pa(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(pm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(ec);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return F(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Sn+20;)e.push(F(r.textContent||""));return F(e.join(" "))}function Po(t){let e=F(t);return e.length<3||e.length>180||Ro.test(e)?!1:My.test(e)?!0:Ay.test(e)}function qa(t){let e=F(t);return e.length<8||e.length>120||/\s/.test(e)||Ro.test(e)||Po(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function Yy(t){let e=[],n=i=>{let a=F(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(F(s[1])),e.push(F(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function Xy(t){try{return Tn(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function nc(t){let e=F(t);return!e||rc(e)||qa(e)?!0:Po(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function Zy(t){return!t.length||t.length>4||!t.every(e=>nc(e))?!1:t.some(e=>Ro.test(F(e))||Po(e)||qa(e))}function gm(t){try{let e=null,n=0,r=`${ec}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(Xy(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=Yy(o);if(!i.length||i.length>4||i.join(" ").length>240||!Zy(i))continue;let a=i.some(c=>Ro.test(F(c))),s=i.some(c=>Po(c)||qa(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function hm(t){return gm(t)?Ty:""}function Jy(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(Hy.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function Qy(t){try{for(let e of t.querySelectorAll(Cy))if(!Jy(e))return!0}catch{}return!1}function rc(t){let e=F(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||Ry.test(e)||Ny.test(e)?!0:e.length<=24&&(Py.test(e)||Ro.test(e))}function tv(t){let e=[],n=new Set,r=o=>{try{if(pm(o,t)||o.closest(ec))return}catch{return}let i=Pa(o);!i||n.has(i)||rc(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>Sn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Pa(o).length<24)&&(r(o),e.join(" ").length>Sn+20))break}}catch{}return F(e.join(" "))}function ev(t){let e=gm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=F(i.innerText||i.textContent||"");!a||a.length>Sn+20||r.has(a)||nc(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return F(n.join(" "))}function bm(t,e){let n=[];try{for(let o of t.querySelectorAll(ky)){if(Tn(o))continue;let i=Pa(o);if(!(!i||e==="assistant"&&rc(i)||nc(i))&&(n.push(i),n.join(" ").length>Sn+20))break}}catch{}let r=F(n.join(" "));if(e==="user"){let o=ev(t);if(o)return o}return r||(e==="assistant"?tv(t):"")}function ym(t){return t.length>Sn?`${t.slice(0,Sn).trimEnd()}\u2026`:t}function Xl(t){return Oy.test(t)}function nv(t,e,n,r){let o=bm(t,e);if(o)return ym(o);if(r)return Lo;let i=hm(t);if(i)return i;if(_a(t))return Vy(t,Da(t));try{if(Qy(t))return Wl;if(t.querySelector("pre, code"))return Ly}catch{}return`Message ${n+1}`}function rv(){if(ye)return!0;let t=A();return!!(t&&oe.has(t)||!mr&&!G()&&Oo())}function Oo(){return!!(rn()||no())}function ov(){Aa=Date.now()}function vm(t){ye=!1,t&&oe.delete(t);let e=A();e&&oe.delete(e)}function xm(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function iv(t){if(_a(t)||!Oo())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Pa(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function $a(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=F(e.textContent||"");if(!(n.length>32)&&Iy.test(n))return!0}}catch{}return!1}function oc(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function av(t,e){try{if(xm(t))return!0;if(!e)return!1;if(iv(t)||$a(t))return!0}catch{}return!1}function wm(t){if(!t||Oo())return!1;try{if($a(t)||oc(t))return!1;if(t.querySelector(By)||_a(t))return!0}catch{}return!1}function sv(t){if(Oo()||Aa&&Date.now()-Aa<Dy)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!wm(e.el)||vm()}function lv(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(mm)){if(Tn(r))continue;let i=Da(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(Tn(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function Zl(t){let e=[t.getAttribute("data-message-id"),t.getAttribute("data-turn-id"),t.querySelector("[data-message-id]")?.getAttribute("data-message-id"),t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id")],n=[];for(let r of e)r&&!n.includes(r)&&n.push(r);return n}function cv(t,e,n){return!(_a(t)||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")||xm(t)||oc(t)||$a(t)||e&&n||bm(t,"assistant")||hm(t))}function uv(t){let e=gr.store.showAssistant!==!1,n=e&&rv(),r=lv(t),o=null;if(e)for(let a of r)um(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Da(a);if(!s)continue;let l=um(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o;if(l==="assistant"&&cv(a,c,n))continue;let u=c&&$a(a),d=c&&oc(a),f=l==="assistant"&&c&&!wm(a)&&(u||d||n||av(a,!0)),m=nv(a,l,i.length,f);if(m&&m!==Lo){let h=zt.get(s),g=!!h&&(Po(h)||qa(h));(!h||g||!Xl(m)||Xl(h))&&m!==h&&zt.set(s,m)}let p=f&&m===Lo?Lo:zt.get(s)||m;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return i}function pr(t){return F(t).replace(/…+$/g,"").trim().toLowerCase()}function To(t,e){if(t.set(e.id,e),e.alias&&t.set(e.alias,e),!!e.el)for(let n of Zl(e.el))t.set(n,e)}function dv(t){let e=new Map;for(let n of t)To(e,n);return e}function Oa(t,e){!t.el&&e.el?.isConnected&&(t.el=e.el),e.text&&(!t.text||Xl(t.text))&&(t.text=e.text,zt.set(t.id,e.text)),e.id&&e.id!==t.id&&!t.alias&&(t.alias=e.id)}function fv(t,e,n,r){let o=pr(n);if(!o)return;let i=t.filter(s=>s.role===e&&pr(s.text)===o);if(!i.length)return;let a=i.find(s=>!s.el);return a||(r<0?i[0]:i.reduce((s,l)=>{let c=Math.abs(t.indexOf(l)-r),u=Math.abs(t.indexOf(s)-r);return c<u?l:s}))}function mv(t,e){if(e)return e.text&&e.text!==Lo&&zt.set(t.id,e.text),{...e,id:t.id,alias:t.alias||e.alias};let n=zt.get(t.id)||(t.alias?zt.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message",...t.alias?{alias:t.alias}:{}}}function pv(t,e){if(t.el&&e.el&&t.el===e.el)return!0;let n=new Set;if(t.id&&n.add(t.id),t.alias&&n.add(t.alias),t.el)for(let r of Zl(t.el))n.add(r);if(e.id&&n.has(e.id)||e.alias&&n.has(e.alias))return!0;if(e.el){for(let r of Zl(e.el))if(n.has(r))return!0}return!1}function gv(t){let e=[];for(let n of t){let r=e[e.length-1];if(r&&r.role==="user"&&n.role==="user"&&pv(r,n)){Oa(r,n);continue}e.push(n)}return e}function hv(t,e){let n=gr.store.showAssistant!==!1,r=dv(e),o=new Set;for(let l of t)l.id&&o.add(l.id),l.alias&&o.add(l.alias);let i=new Set,a=[];for(let l of t){if(l.role==="assistant"&&!n)continue;let c=r.get(l.id)||(l.alias?r.get(l.alias):void 0)||e.find(d=>d.role===l.role&&!!d.el&&!i.has(d.el)&&pr(d.text)===pr(l.text||"")&&!(d.id&&o.has(d.id)&&d.id!==l.id&&d.id!==l.alias)),u=mv(l,c);u.el&&i.add(u.el),a.push(u)}for(let l=0;l<e.length;l++){let c=e[l];if(!c.el||i.has(c.el))continue;let u=a.length;for(let m=l-1;m>=0;m--){let p=e[m].el;if(!p)continue;let h=a.findIndex(g=>g.el===p);if(h>=0){u=h+1;break}}if(u===a.length)for(let m=l+1;m<e.length;m++){let p=e[m].el;if(!p)continue;let h=a.findIndex(g=>g.el===p);if(h>=0){u=h;break}}let d=fv(a,c.role,c.text,u),f=!!d&&!!c.id&&o.has(c.id)&&c.id!==d.id&&c.id!==d.alias;if(d&&!f){Oa(d,c),i.add(c.el);continue}a.splice(u,0,c),i.add(c.el)}let s=-1;for(let l=0;l<a.length;l++)a[l].role==="assistant"&&(s=l);for(let l=0;l<a.length;l++)a[l].live&&l!==s&&(a[l].live=!1);return a}function bv(t){if(Tn(t))return!1;try{if(t.closest("#bloom-bn-host, #bloom-root, #bloom-sidebar-panel, #bloom-plugin-layer"))return!1}catch{return!1}let e=`${t.id} ${t.getAttribute("data-testid")||""} ${t.getAttribute("aria-label")||""}`;return/prompt-nav|promptnav|conversation-nav|prompt navigator|conversation navigator/i.test(e)}var Em=/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,yv=/^(?:go to message(?: \d+)?|message \d+|prompt navigator|conversation navigator|\d+)$/i;function vv(t){let e=["data-turn-id","data-message-id","data-goto-message-id","data-messageid","data-conversation-turn-id","data-scroll-to-id","data-id"];for(let r of e){let o=t.getAttribute(r)||"";if(o)return o}return(t.getAttribute("href")||"").match(Em)?.[0]??""}function xv(t){let e=t.getAttribute("aria-label")||t.getAttribute("title")||t.getAttribute("data-preview")||t.textContent||"";return ym(F(e))}function Sm(t){return!t||t.startsWith("native:")||t.startsWith("anon:")||t.startsWith("mid:")?!1:Em.test(t)?!0:/^[a-zA-Z0-9_-]{8,}$/.test(t)}function wv(t){return!t||yv.test(t.trim())}function Ev(){let t=[],e=new Set;try{for(let n of document.querySelectorAll($y))if(bv(n))for(let r of n.querySelectorAll("button, a, [role='button']")){if(Tn(r))continue;let o=vv(r);if(!Sm(o)||e.has(o))continue;e.add(o);let i=xv(r),a=ac(o);t.push({id:o,el:a?.isConnected?a:null,role:"user",text:i||"Message"})}}catch{}return t}function Sv(t,e){if(!e.length)return t;let n=e.filter(i=>Sm(i.id)&&!wv(i.text));if(!n.length)return t;let r=t.slice(),o=new Map;for(let i of r)To(o,i);for(let i=0;i<n.length;i++){let a=n[i],s=r.length;for(let f=i+1;f<n.length;f++){let m=o.get(n[f].id);if(!m)continue;let p=r.indexOf(m);if(p>=0){s=p;break}}let l=o.get(a.id);if(l){Oa(l,a),To(o,l);continue}let c=pr(a.text),u=c?r.filter(f=>f.role==="user"&&pr(f.text)===c):[];if(u.length===1){Oa(u[0],a),To(o,u[0]);continue}if(u.length>1)continue;let d={id:a.id,el:a.el,role:"user",text:a.text||"Message"};r.splice(s,0,d),To(o,d),zt.set(d.id,d.text)}return r}function Tv(){let t=yr();if(!t||t===document.body)return[];let e=uv(t),n=A(),r=n?$r(n):[],o=r.length?hv(r,e):e,i=gv(Sv(o,Ev()));return sv(i),i}function Tm(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Fa(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function ic(t){return t===window?window.innerHeight:t.clientHeight}function Lv(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(zy)}catch{return!1}}function Lm(){ko!==void 0&&(clearTimeout(ko),ko=void 0),Co?.classList.remove("bloom-bn-flash"),Co=null}function km(t){Lm(),t.classList.add("bloom-bn-flash"),Co=t,ko=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Co===t&&(Co=null),ko=void 0},800)}function Ba(t){if(!$.length)return;let e=Math.max(0,Math.min(t,$.length-1));Ia=e,hr?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),br?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),Ha&&(Ha.textContent=`${e+1} / ${$.length}`),kv(e)}function kv(t){let e=hr,n=e?.children[t];if(!(e instanceof HTMLElement)||!(n instanceof HTMLElement))return;let r=e.getBoundingClientRect(),o=n.getBoundingClientRect();o.top<r.top?e.scrollTop-=r.top-o.top:o.bottom>r.bottom&&(e.scrollTop+=o.bottom-r.bottom)}function Cm(t){if(Ra)return;let e=br?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function Jl(t){let e=$[t];if(!e)return;let n=e.el?.isConnected?e.el:ac(e.id);if(!n){Av(t);return}e.el=n,Io=t,No=Date.now()+Kl,Ba(t),Cm(t);let r=xe??Fa(n),i=Math.abs(n.getBoundingClientRect().top-Tm())>fm*ic(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),gr.store.jumpEffect!=="none"&&km(n)}function ac(t){let e=yr();if(!e||e===document.body||!t)return null;let n=[t],r=A(),i=(r?$r(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"]`)}catch{}if(!s||Tn(s))continue;let l=s.closest(mm);return l instanceof HTMLElement?l:s}return null}function sc(){if(xe)return xe;let t=yr();return t?Fa(t):window}function Cv(t){let e=sc(),n=ic(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function Mv(t,e){let n=sc();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function Av(t){let e=++Yl,n=$[t];if(!n)return;if(!n.el){let l=A();l&&qr(l)}Io=t,No=Date.now()+lm+Kl,Ba(t),Cm(t);let r=-1;for(let l=0;l<$.length;l++)$[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+lm,a=0,s=-1;for(;Date.now()<i;){if(e!==Yl||!Ht)return;let l=ac(n.id);if(l){n.el=l,No=Date.now()+Kl;let d=xe??Fa(l),m=Math.abs(l.getBoundingClientRect().top-Tm())>fm*ic(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),gr.store.jumpEffect!=="none"&&km(l),Mt();return}let c=sc(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&Mv(o,u))break;Cv(o),await new Promise(d=>setTimeout(d,xy))}}function lc(){if(!Ht||!$.length)return;if(Date.now()<No&&Io>=0){Ba(Io);return}let t=window.innerHeight*wy,e=0;for(let n=0;n<$.length;n++){let r=$[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Ba(e)}function Hv(t){let e=Fa(t);if(xe===e&&Ao)return;Ao?.(),xe=e;let n=e===window?document:e,r=()=>{lc(),cc()};n.addEventListener("scroll",r,{passive:!0}),Ao=()=>n.removeEventListener("scroll",r)}function Iv(t){wn?.disconnect(),wn=null;let e=xe instanceof HTMLElement?xe:null;wn=new IntersectionObserver(()=>lc(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&wn.observe(n.el)}function Nv(){if(!document.body)return null;let t=ve;if(t?.isConnected)return t;t=document.createElement("div"),t.id=dm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0,t.addEventListener("pointerenter",()=>{let a=A();a&&qr(a)});let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{Ra=!0}),n.addEventListener("pointerleave",()=>{Ra=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),ve=t,hr=e,br=i,Ha=o,t}function Mm(){let t=ve,e=yr();if(!t||!e||!e.isConnected||$.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=Uy(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||_y,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function cc(){!Ht||be||(be=requestAnimationFrame(()=>{be=0,Ht&&Mm()}))}function Rv(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Pv(t){let e=hr,n=br;if(!e||!n)return;e.replaceChildren(),n.replaceChildren();let r=Number.parseFloat(getComputedStyle(ve??e).getPropertyValue("--bloom-bn-cap"))||0;e.style.justifyContent=r&&t.length*18+16>r?"flex-start":"center",t.forEach((o,i)=>{let a=document.createElement("button");a.type="button",a.className=Rv(o),a.setAttribute("aria-label",`Go to message ${i+1} of ${t.length}`),a.addEventListener("click",u=>{u.preventDefault(),Jl(i)}),e.appendChild(a);let s=document.createElement("button");s.type="button",s.className=`bloom-bn-item bloom-bn-${o.role}`;let l=document.createElement("span");l.className="bloom-bn-emoji",l.textContent=o.role==="user"?Ey:Sy;let c=document.createElement("span");c.className="bloom-bn-label",c.textContent=o.text,c.title=o.text,s.append(l,c),s.addEventListener("click",u=>{u.preventDefault(),Jl(i)}),n.appendChild(s)})}function Ov(t){hr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=br?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Bv(){let t=A();return t===Na?!1:(Na=t,zt.clear(),Ho.clear(),$=[],En="",Ia=0,Io=-1,No=0,ye&&t&&(oe.add(t),ye=!1),!0)}function Dv(t){let e=gr.store.showAssistant!==!1?"1":"0";return`${Na}|${e}|${t.map(n=>n.id).join(",")}`}function Ql(){if(!Ht)return;Bv();let t=Tv(),e=yr();if(!e||t.length<1){$=t,En="",ve&&(ve.hidden=!0),wn?.disconnect(),tc();return}Nv();let n=Dv(t);n!==En?($=t,En=n,Pv(t),Hv(e),Iv(t)):($=t,Ov(t)),Mm(),lc(),tc()}function Mt(){if(Ht){if(document.hidden){At&&(cancelAnimationFrame(At),At=0),Ql();return}At||(At=requestAnimationFrame(()=>{At=0,Ht&&Ql()}))}}function tc(){let t=yr();if(!(xn&&Vl===t&&t?.isConnected)){if(xn?.disconnect(),Mo?.disconnect(),Vl=t,!t||t===document.body){xn=null;return}xn=new MutationObserver(()=>Mt()),xn.observe(t,{childList:!0,subtree:!0}),Mo=new ResizeObserver(()=>cc()),Mo.observe(t)}}function _v(t){if(Ht){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===A())&&Mt();return}if(t.type==="post-start"){ov(),mr=!1,t.conversationId?(ye=!1,oe.add(t.conversationId)):ye=!0,Mt();return}if(t.type==="post-end"){if(ye=!1,t.conversationId)oe.delete(t.conversationId);else{let e=A();e&&oe.delete(e)}Mt()}}}function qv(t){if(!Ht||!$.length||ve?.hidden||t.altKey||t.ctrlKey||t.metaKey||Lv(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Ia+1;else if(t.key==="ArrowUp")e=Ia-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=$.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Jl(Math.max(0,Math.min(e,$.length-1)))}function $v(){Yl++,Lm(),wn?.disconnect(),wn=null,xn?.disconnect(),xn=null,Vl=null,Mo?.disconnect(),Mo=null,Ao?.(),Ao=null,xe=null,Ra=!1,ve?.remove(),ve=null,hr=null,br=null,Ha=null}var Am=E({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted yet. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:jl,cleanupSelectors:[`#${dm}`],settings:gr,start(){Ht=!0,Na=A(),k(jl,sm),Ca=new AbortController;let{signal:t}=Ca;window.addEventListener("keydown",qv,{signal:t}),window.addEventListener("popstate",Mt,{signal:t}),window.visualViewport?.addEventListener("resize",cc,{signal:t}),document.addEventListener("visibilitychange",()=>{Ht&&(At&&(cancelAnimationFrame(At),At=0),be&&(cancelAnimationFrame(be),be=0),Ql())},{signal:t}),Gl=wt(_v),zl=dt({onTick(){if(G()){Mt();return}mr&&!Oo()&&(mr=!1),Mt()},onFall(e){vm(e.conversationId),Mt()},onContext(e,n){if(!X(n,e)){zt.clear(),Ho.clear(),En="",ye=!1;let r=A();for(let o of[...oe])o!==r&&oe.delete(o);mr=!0}Mt()}}),tc(),Mt(),vy.debug("navigator started")},stop(){Ht=!1,At&&cancelAnimationFrame(At),At=0,be&&cancelAnimationFrame(be),be=0,Ca?.abort(),Ca=null,zl?.(),zl=null,Gl?.(),Gl=null,oe.clear(),ye=!1,mr=!1,Aa=0,$v(),zt.clear(),Ho.clear(),$=[],En="",L(jl)},onSettingsChange(){En="",Mt()}});var Hm=`.bloom-ts {
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
`;function Im(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Nm(t){try{return new Date(t).toISOString()}catch{return""}}var Om=new C("MessageTimestamps"),Rm="messageTimestamps",za="bloom-ts",Pm=1500,jv="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",vr=M({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),xr=new Map,Cn=!1,It=0,We=null,dc=null,uc=null,ja=null,Bo=null,Do=!1,Ln=!1;function Bm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function mc(){let t=vr.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Dm(){let t={...mc()};for(let[n,r]of xr)t[n]=r;let e=Object.keys(t);if(e.length>Pm){let n=e.slice(e.length-Pm),r={};for(let o of n)r[o]=t[o];vr.store.stamps=r;return}vr.store.stamps=t}var zv=Yc(Dm,500);function _m(t,e){!t||!e||xr.get(t)===e||(xr.set(t,e),zv(),kn())}function Gv(t){return t?xr.get(t)??mc()[t]??vi(t)??null:null}function Uv(t){Cn&&t.type==="message-time"&&_m(t.messageId,t.createTime)}function Kv(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Wv(){let t=Bm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(jv)||e.push(n)}catch{}return e}function Vv(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function fc(){if(!Cn)return;let t=vr.store.hideOwnMessages===!0,e=vr.store.showDate!==!1,n=Y();Ln&&!G()&&(Ln=!1),Ln&&(n?Do=!1:Ln=!1);let r=Ln?!1:n,o=Wv();We?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=Kv(i),c=i.querySelector(`:scope > .${za}`);if(t&&l==="user"){c?.remove();return}if(Vv(i)){c?.remove();return}let u=Gv(s);if(!u&&s&&(r||Do)&&a>=o.length-2&&(u=Date.now(),_m(s,u)),!u){c?.remove();return}let d=Im(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=za,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=Nm(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){Om.debug("paint failed",i)}Do=r,qm()}function kn(){if(Cn){if(document.hidden){It&&(cancelAnimationFrame(It),It=0),fc();return}It||(It=requestAnimationFrame(()=>{It=0,Cn&&fc()}))}}function qm(){let t=Bm();if(!(We&&dc===t&&t?.isConnected)){if(We?.disconnect(),dc=t,!t||t===document.body){We=null;return}We=new MutationObserver(()=>kn()),We.observe(t,{childList:!0,subtree:!0})}}var $m=E({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${za}`],settings:vr,start(){Cn=!0,k(Rm,Hm);let t=mc();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&xr.set(e,n);uc=wt(Uv),ja?.(),ja=dt({onTick:kn,onFall:kn,onContext(e,n){X(n,e)||(Ln=!0,Do=!1),kn()}}),Bo?.abort(),Bo=new AbortController,document.addEventListener("visibilitychange",()=>{Cn&&(It&&(cancelAnimationFrame(It),It=0),fc())},{signal:Bo.signal}),qm(),kn(),Om.debug("timestamp watch started")},stop(){Cn=!1,It&&cancelAnimationFrame(It),It=0,Bo?.abort(),Bo=null,We?.disconnect(),We=null,dc=null,ja?.(),ja=null,uc?.(),uc=null,Ln=!1,Do=!1,Dm(),xr.clear(),document.querySelectorAll(`.${za}`).forEach(t=>t.remove()),L(Rm)},onSettingsChange:kn});var pc="streamerMode",Yv="filter:blur(6px)!important;transition:filter .2s ease",Xv="filter:none!important",wr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Er=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function Nt(t,e){return t.map(n=>`${n} ${e}`)}var Mn=M({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Sr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Yv}}${e?`${r}{${Xv}}`:""}`}function Fm(){let t=[];if(Mn.store.conversations!==!1&&(t.push(Sr([...Nt(Er,'a[href^="/c/"]'),...Nt(Er,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Mn.store.projects!==!1&&(t.push(Sr([...Nt(Er,'a[href*="/project"]'),...Nt(Er,'a[href*="/g/g-p-"]'),...Nt(Er,'[data-testid="project-name"]'),...Nt(Er,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Mn.store.headerTitle!==!1&&t.push(Sr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Mn.store.accountAvatar!==!1&&t.push(Sr([...Nt(wr,"img"),...Nt(wr,'[class*="avatar"]'),...Nt(wr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Mn.store.accountName!==!1&&t.push(Sr([...Nt(wr,".min-w-0 > .truncate"),...Nt(wr,".min-w-0.flex-1 .truncate")],!1)),Mn.store.accountEmail!==!1&&t.push(Sr([...Nt(wr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){L(pc);return}k(pc,t.join(`
`))}var jm=E({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Mn,start:Fm,onSettingsChange:Fm,stop(){L(pc)}});var zm=`.bloom-gc-panel {
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
}`;var Jv=new C("GreetingCustomizer"),Tr="greetingCustomizer",Gm="greetingCustomizerUi",_o=100,hc=30,Qv=120,tx=1e3,ex=50,nx=40,rx=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),qo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Va=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function ox(t){return!!t?.closest(rx)}function Vm(t){return!!(ox(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Ko(t){try{for(let e of document.querySelectorAll(t))if(!Vm(e))return e}catch{}return null}function gc(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Ko(e))return e;return t}var Ym=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],rt=M({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:xx},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Ym},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),ie=!1,Cr=!1,Hn=null,Ua,$o,Lr,Fo,Ka=0,Ga=null,kr=null,jo=null,zo=null,Go=null,Wa=null;function Ee(){let t=location.pathname||"/";return t==="/"||t===""}function An(){let t=rt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Ym.slice()}function Uo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Um(t){rt.store.greetings=t.slice(0,hc)}function Wo(){let t=String(rt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function ix(){return rt.store.order==="random"?"random":"sequential"}function ax(){return at(Number(rt.store.intervalSec??10),1,3600)*1e3}function sx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function lx(){return!!Ko(Va)}function Ya(){return!!(Ko(Va)||Ko(qo))}function cx(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=lx()?gc(Va):Ko(qo)?gc(qo):gc(Va),i=e?`${qo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function ux(t,e){if(t<=0)return 0;if(t===1)return Number(rt.plain.index)!==0&&(rt.store.index=0),Number(rt.plain.lastRandom)!==0&&(rt.store.lastRandom=0),0;let n=Number(rt.plain.index),r=Number(rt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(ix()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return rt.store.index=s,rt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return rt.store.index=i,i}function we(t){if(!ie)return;if(!Ee()){L(Tr);return}let e=An().map(Uo).filter(Boolean);if(!e.length){L(Tr);return}let n=ux(e.length,t),r=e[n]??e[0],o=Wo()==="manual"&&e.length>1;k(Tr,cx(sx(r),o)),Wa?.()}function bc(){Ua!==void 0&&(clearInterval(Ua),Ua=void 0)}function yc(){bc(),!(!ie||!Ee())&&Wo()==="interval"&&(An().filter(Boolean).length<=1||(Ua=setInterval(()=>we(!0),ax())))}function vc(){Fo!==void 0&&(clearTimeout(Fo),Fo=void 0),Ka=0}function Km(){if(vc(),!ie||!Ee())return;Ka=nx;let t=()=>{if(Fo=void 0,!(!ie||!Ee())){if(Ya()){Wo()==="refresh"&&!Cr?(Cr=!0,we(!0)):we(!1),yc();return}Ka-=1,Ka>0&&(Fo=setTimeout(t,ex))}};t()}function xc(){if(Hn===!0){Ya()?we(!1):Km();return}Hn=!0,Cr=!1,Wo()==="refresh"?(Cr=!0,we(!0)):we(!1),yc(),Ya()||Km()}function wc(){Hn=!1,Cr=!1,bc(),vc(),L(Tr)}function Xa(){Lr===void 0&&(Lr=window.setTimeout(()=>{Lr=void 0,ie&&(Ee()?xc():Hn!==!1&&wc())},Qv))}function dx(){kr||(kr=history.pushState.bind(history),jo=history.replaceState.bind(history),zo=function(...e){let n=kr(...e);return Xa(),n},Go=function(...e){let n=jo(...e);return Xa(),n},history.pushState=zo,history.replaceState=Go)}function fx(){zo&&history.pushState===zo&&kr&&(history.pushState=kr),Go&&history.replaceState===Go&&jo&&(history.replaceState=jo),kr=null,jo=null,zo=null,Go=null}function mx(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Xa)}function px(t){if(!ie||!Ee()||Wo()!=="manual"||An().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(qo);if(!n||Vm(n))return;let r=window.getSelection?.();r&&String(r).trim()||we(!0)}function gx(){$o===void 0&&($o=setInterval(()=>{if(!ie)return;let t=Ee();if(t!==(Hn===!0)){t?xc():wc();return}t&&Ya()&&we(!1)},tx))}function hx(){$o!==void 0&&(clearInterval($o),$o=void 0)}function Wm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var bx="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",yx="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function vx(t,e){let n=Uo(t);return n?n.length>_o?`Keep it to ${_o} characters.`:An().length+(e?1:0)>hc?`At most ${hc} greetings.`:null:"Enter a greeting."}function xx(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=An(),s=Number(rt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=_o,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let g=l.querySelector(".bloom-gc-count");g&&(g.textContent=`${Uo(e).length}/${_o}`);let w=l.querySelector(".bloom-gc-error");w&&(w.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Uo(e).length}/${_o}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let g=document.createElement("button");g.type="button",g.className="bloom-gc-btn",g.textContent="Cancel",g.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(g)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let g=n<0,w=vx(e,g);if(w){r=w,i();return}let b=Uo(e),v=An().slice();n>=0&&n<v.length?v[n]=b:v.push(b),Um(v),n=-1,e="",r="",i()}),m.appendChild(p),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let g=document.createElement("p");g.className="bloom-gc-empty",g.textContent="No greetings. The official heading stays.",t.appendChild(g);return}let h=document.createElement("div");h.className="bloom-gc-list",a.forEach((g,w)=>{let b=document.createElement("div");b.className="bloom-gc-item",w===s&&(b.dataset.active="true");let v=document.createElement("button");v.type="button",v.className=`bloom-gc-body${o===w?"":" bloom-gc-clamp"}`,v.textContent=g,v.addEventListener("click",()=>{o=o===w?-1:w,i()});let ot=document.createElement("div");ot.className="bloom-gc-item-actions";let W=Wm("Edit",bx);W.addEventListener("click",()=>{n=w,e=g,r="",i()});let J=Wm("Delete",yx);J.addEventListener("click",()=>{let O=An().filter((ut,vt)=>vt!==w);Um(O),n===w?(n=-1,e=""):n>w&&(n-=1),i()}),ot.append(W,J),b.append(v,ot),h.appendChild(b)}),t.appendChild(h)};return Wa=i,i(),()=>{Wa===i&&(Wa=null),t.replaceChildren()}}var Xm=E({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Gm,settings:rt,start(){ie=!0,k(Gm,zm),dx(),Ga=new AbortController;let{signal:t}=Ga;window.addEventListener("popstate",Xa,{signal:t}),document.addEventListener("click",mx,{capture:!0,signal:t}),document.addEventListener("click",px,{signal:t}),gx(),Hn=null,Ee()?xc():wc(),Jv.debug("started")},stop(){ie=!1,Ga?.abort(),Ga=null,Lr!==void 0&&(clearTimeout(Lr),Lr=void 0),bc(),vc(),hx(),fx(),L(Tr),Cr=!1,Hn=null},onSettingsChange(){ie&&(Ee()?(we(!1),yc()):L(Tr))}});function wx(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Za(t){try{return await createImageBitmap(t)}catch{return null}}async function Ex(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Ja(t){if(t.startsWith("data:")){let e=wx(t);if(e){let n=await Za(e);if(n)return n}return Ex(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Za(await e.blob()):null}catch{return null}}var ts="data-bloom-csi-slot",Sx="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Tx=/\bsize-(?:[6-9]|10)\b/,Lx=/\b(?:h|w)-(?:[6-9]|10)\b/,kx=/^(plus|pro|free|team|go|business|enterprise)$/i,Cx=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Qa(t){return t.getAttribute("class")||""}function Jm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Tx.test(t)?!0:Lx.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Mx(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Qm(e)}function Qm(t){return kx.test(String(t??"").replace(/\s+/g,""))}function ae(t){return!!t?.closest(Sx)}function es(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Vo(t){let e=Qa(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Qm(t.textContent||"")}function ns(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Yo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Ax(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function tp(t){if(ae(t)||ns(t)||Yo(t)||Vo(t)||es(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function ep(t){return ae(t)||ns(t)||Yo(t)||Vo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Mx(t.textContent||"")}function np(t){return ae(t)||Yo(t)||es(t)||Vo(t)?!1:Jm(Qa(t))||ep(t)?!0:tp(t)}function Zm(t){return!(ae(t)||es(t)||Yo(t)||Vo(t)||ns(t))}function In(t,e){let n=ns(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Yo(n)||es(n)||Vo(n));)ae(n)||(r=n),n=n.parentElement;return r}function Hx(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||ae(e))continue;if(Ax(Qa(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Zm(o))){if(np(o)||Jm(Qa(o)))return In(o,t)??o;r.push(o)}if(r.length===1)return In(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Zm(r))return In(r,t)??r}}return null}function Ix(t){let e=t.querySelectorAll(Cx);for(let n of e)if(np(n))return In(n,t)??n;return null}function Nx(t){for(let e of t.querySelectorAll("span, div, p, i"))if(ep(e))return In(e,t)??e;return null}function Rx(t){for(let e of t.querySelectorAll("*"))if(tp(e))return In(e,t)??e;return null}function rp(t,e){if(ae(t))return null;if(e&&!ae(e)&&t.contains(e)){let n=In(e,t);if(n)return n}return Hx(t)??Ix(t)??Nx(t)??Rx(t)}function op(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Mr="data-bloom-csi",rs="data-bloom-csi-orig",Nn=new Set,ip=null;function Sc(t){ip=t}function ap(t){return`url(${JSON.stringify(t)})`}function os(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Tc(t,e,n){let r=ap(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function sp(t,e=ts){let n=ap(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function Px(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Ar(t){t.removeEventListener("error",Ec);let e=t.getAttribute(rs);t.removeAttribute(Mr),t.removeAttribute(rs),e&&t.getAttribute("src")!==e&&(t.src=e)}function Ec(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Nn.add(n),Ar(e),ip?.()}function lp(t,e){if(!e||Nn.has(e)){Ar(t);return}Px(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Mr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(rs)&&t.setAttribute(rs,n);t.setAttribute(Mr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Ec),t.addEventListener("error",Ec),n!==e&&(t.src=e)}var cp=`/*
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
`;var up=new C("CustomSidebarIdentity"),dp="customSidebarIdentityUi",pp="customSidebarIdentity",Bx="bloom-csi-face",Dx="bloom-csi-name",Hr=ts,_x=1024,is=256,gp=24,hp=64,bp=40,Mc=1,Ac=4,Xo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Lc=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=M({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:nw},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:gp,max:hp,default:bp},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Pn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function qx(){return String(T.store.displayName??"").trim()}function ls(t,e,n,r,o){let i=at(n,Mc,Ac),a=Math.min(t,e)/i,s=at(r,a/2,Math.max(a/2,t-a/2)),l=at(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function $x(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Hc(t){let e=Math.min(1,_x/Math.max(t.width,t.height));return $x(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Fx(t,e,n,r){let{side:o,x:i,y:a}=ls(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=is,s.height=is;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,is,is);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function jx(t){let e=await Za(t);if(!e)return null;let n=Hc(e);return e.close(),n}async function Nc(t,e,n,r){let o=await Ja(t);if(!o)return null;let i=Fx(o,e,n,r);return o.close(),i}function Rc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function fp(){T.store.avatarUrl="",T.store.avatarSource="",Rc()}var mp=0;async function Ic(t){let e=++mp;Rc(),T.store.avatarSource=t;let n=await Nc(t,.5,.5,1);return e!==mp?!1:(n&&(T.store.avatarUrl=n),!!n)}function Zo(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function kc(t){let e=Zo(t);if(!e)return!1;let n=await jx(e);return n?Ic(n):!1}var Rt=!1,Ir=!1,Nr=0,cs=0,as=null,Ve=new Map,Rr=null,Se=null,us=null,se=null,ds=null;function fs(t){let e=String(t??"").trim();if(!e||Nn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function yp(){return fs(T.store.avatarUrl)??fs(T.store.avatarSource)}var ss=!1,Cc=new Set;function vp(){let t=fs(T.store.avatarSource);if(!t?.startsWith("data:image/")||fs(T.store.avatarUrl)?.startsWith("data:image/")||ss||Cc.has(t))return;ss=!0;let e=Pn(T.store.cropX,.5),n=Pn(T.store.cropY,.5),r=Pn(T.store.cropZoom,1);Nc(t,e,n,r).then(o=>{if(ss=!1,!o){Cc.add(t);return}Rt&&(T.store.avatarUrl=o,ms())}).catch(()=>{ss=!1,Cc.add(t)})}function Rn(t,e){return t.map(n=>`${n} ${e}`)}function zx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Gx(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=zx(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function xp(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||ae(n)||n.closest(".min-w-0")||e.push(n);return e}function Ux(t){let e=xp(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Pc(){let t=[],e=Qe();e&&t.push(e);let n=Gn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Xo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function wp(t,e){let n=Ux(t);if(n)lp(n,e);else for(let o of xp(t))Ar(o);let r=rp(t,n);for(let o of t.querySelectorAll(`[${Hr}]`))o!==r&&o.removeAttribute(Hr);r&&r.setAttribute(Hr,"")}function Kx(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Wx(t,e){let n=Kx(t);n&&wp(n,e)}function Vx(){for(let t of document.querySelectorAll(`img[${Mr}]`))Ar(t);for(let t of document.querySelectorAll(`[${Hr}]`))t.removeAttribute(Hr)}function Yx(){let t=at(Math.round(Pn(T.store.avatarSize,bp)),gp,hp),e=yp(),n=qx(),r=T.store.applyToMenu!==!1,o=[],i=[...Rn(Xo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Rn(Lc,"> :first-child img"));let a=[...Rn(Xo,".min-w-0 > .truncate"),...Rn(Xo,".min-w-0.flex-1 .truncate")];r&&a.push(...Rn(Lc,"> :first-child .truncate"));let s=op(Hr);o.push(os([...s.flatMap(l=>Rn(Xo,l))].join(","),t)),o.push(os(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(os(s.flatMap(l=>Rn(Lc,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Tc(i.join(","),e,t)),o.push(Tc("#stage-sidebar-tiny-bar img",e,32)),o.push(sp(e))),n&&o.push(Gx(a,n)),k(pp,o.join(""))}function Xx(){let t=yp(),e=Pc();for(let n of e)wp(n,t);if(T.store.applyToMenu!==!1){let n=Un();n&&Wx(n,t)}for(let n of document.querySelectorAll(`img[${Mr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Ar(n)}function ms(){if(!(!Rt||Ir)){Ir=!0;for(let t of Ve.values())t.disconnect();Se?.disconnect(),se?.disconnect();try{Yx(),Xx()}finally{Ir=!1,Oc(),tw(),Rr?.isConnected&&Ep(Rr),vp()}}}function Jo(){!Rt||Nr||(Nr=requestAnimationFrame(()=>{Nr=0,ms()}))}function Zx(){Ir||!Rt||Jo()}function Jx(t){if(Ve.has(t))return;let e=new MutationObserver(Zx);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ve.set(t,e)}function Qx(t){Ve.get(t)?.disconnect(),Ve.delete(t)}function Oc(){let t=new Set;for(let n of Pc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Gn();e&&t.add(e);for(let n of[...Ve.keys()])(!t.has(n)||!n.isConnected)&&Qx(n);for(let n of t)n.isConnected&&Jx(n)}function tw(){let t=Mi();if(!t){se?.disconnect(),se=null,us=null;return}if(us===t&&se){se.observe(t,{childList:!0});return}se?.disconnect(),us=t,se=new MutationObserver(()=>{Ir||!Rt||(Oc(),Jo())}),se.observe(t,{childList:!0})}function Ep(t){Rr===t&&Se||(Se?.disconnect(),Rr=t,Se=new MutationObserver(()=>{if(!t.isConnected){Se?.disconnect(),Se=null,Rr=null;return}Ir||!Rt||Jo()}),Se.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Sp(t){if(!Rt||T.store.applyToMenu===!1)return;let e=Un();if(e){Ep(e),Jo();return}t<=0||requestAnimationFrame(()=>Sp(t-1))}function Tp(t){Rt&&(ms(),!(Pc().length||t<=0)&&(cs=requestAnimationFrame(()=>Tp(t-1))))}function ew(t){Rt&&T.store.applyToMenu!==!1&&(!Ai(t)&&!Un()||Sp(10))}function nw(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,m.appendChild(p);let h=document.createElement("div");h.className="bloom-csi-zoom-row";let g=document.createElement("input");g.type="range",g.className="bloom-csi-zoom",g.min=String(Mc),g.max=String(Ac),g.step="0.05",g.setAttribute("aria-label","Zoom");let w=document.createElement("span");w.className="bloom-csi-zoom-val";let b=document.createElement("button");b.type="button",b.className="bloom-csi-btn",b.textContent="Reset",h.append(g,w,b);let v=document.createElement("p");v.className="bloom-csi-hint",v.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,h,v),t.append(u,d,f);function ot(){let x=String(T.store.avatarSource??""),N=String(T.store.avatarUrl??"");return x.startsWith("data:image/")?x:N.startsWith("data:image/")?N:""}function W(x,N,y){if(!a)return i.x=x,i.y=N,i.zoom=at(y,Mc,Ac),i;let H=ls(a.w,a.h,y,x*a.w,N*a.h);return i.x=H.x/a.w,i.y=H.y/a.h,i.zoom=H.z,i}function J(){g.value=String(i.zoom),w.textContent=`${Math.round(i.zoom*100)}%`;let x=a?ls(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;x&&a&&(p.style.width=`${a.w/x.side*100}%`,p.style.height=`${a.h/x.side*100}%`,p.style.left=`${(.5-x.x/x.side)*100}%`,p.style.top=`${(.5-x.y/x.side)*100}%`)}function O(x=!1){let N=ot(),y=String(T.store.avatarUrl??"").trim(),H=!!N;s.hidden=!y&&!N,(N||y)&&(s.src=N||y),document.activeElement!==l&&(l.value=H?"":y),l.placeholder=H?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!N,d.hidden=!(e&&/^https?:\/\//.test(y)&&!N),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",N&&(x&&(i.x=Pn(T.store.cropX,.5),i.y=Pn(T.store.cropY,.5),i.zoom=Pn(T.store.cropZoom,1)),p.getAttribute("src")!==N&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},W(i.x,i.y,i.zoom),J()},p.src=N),J())}function ut(x,N,y,H=!1){W(x,N,y),J();let pt=ot(),xt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,pt&&Nc(pt,i.x,i.y,i.zoom).then(I=>{I&&(T.store.avatarUrl=I)})};r&&clearTimeout(r),H?xt():r=setTimeout(xt,80)}function vt(x){T.store.avatarUrl=x;let N=x.trim();if(n&&clearTimeout(n),!N){T.store.avatarSource="",Rc(),e=!1,O(!0);return}if(N.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Ja(N).then(y=>{if(!y)return;let H=Hc(y);y.close(),H&&Ic(H).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(N)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{Ja(N).then(y=>{if(!y){e=!0,O(!0);return}let H=Hc(y);y.close(),H?(e=!1,Ic(H).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",x=>{Zo(x.clipboardData)&&(x.preventDefault(),e=!1,kc(x.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",x=>{Zo(x.dataTransfer)&&x.preventDefault()}),u.addEventListener("drop",x=>{Zo(x.dataTransfer)&&(x.preventDefault(),e=!1,kc(x.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>vt(l.value)),l.addEventListener("paste",x=>{Zo(x.clipboardData)&&(x.preventDefault(),e=!1,kc(x.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",x=>{ot()&&!l.value&&(x.key==="Backspace"||x.key==="Delete")&&(fp(),e=!1,O(!0))}),c.addEventListener("click",()=>{fp(),e=!1,O(!0)}),m.addEventListener("pointerdown",x=>{x.button===0&&(m.setPointerCapture(x.pointerId),o.on=!0,o.px=x.clientX,o.py=x.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",x=>{if(!o.on||!a)return;let N=m.clientWidth;if(!N)return;let{side:y}=ls(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);W(o.x-(x.clientX-o.px)*(y/N)/a.w,o.y-(x.clientY-o.py)*(y/N)/a.h,i.zoom),J()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,ut(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",x=>{x.preventDefault(),ut(i.x,i.y,i.zoom*(x.deltaY<0?1.08:1/1.08))},{passive:!1}),g.addEventListener("input",()=>ut(i.x,i.y,Number(g.value))),g.addEventListener("change",()=>ut(i.x,i.y,Number(g.value),!0)),b.addEventListener("click",()=>ut(.5,.5,1,!0));let Qo=()=>O(!1);return ds=Qo,O(!0),()=>{ds===Qo&&(ds=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Lp=E({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:dp,cleanupSelectors:[`.${Bx}`,`.${Dx}`],settings:T,start(){Rt=!0,Nn.clear(),Sc(Jo),k(dp,cp),as=new AbortController,document.addEventListener("click",ew,{signal:as.signal}),Tp(40),vp(),up.debug("started")},onSettingsChange(){Nn.clear(),ds?.(),Rt&&(Oc(),ms())},stop(){Rt=!1,as?.abort(),as=null,Nr&&cancelAnimationFrame(Nr),Nr=0,cs&&cancelAnimationFrame(cs),cs=0;for(let t of Ve.values())t.disconnect();Ve.clear(),Se?.disconnect(),Se=null,Rr=null,se?.disconnect(),se=null,us=null,Vx(),L(pp),Sc(null),Nn.clear(),up.debug("stopped")}});var Pr=new C("Bloom"),kp=!1,rw=Date.now(),ow=[td,Dd,Kd,Yd,tf,af,vf,wf,Tf,Gf,Zf,om,am,Am,$m,jm,Xm,Lp];function ps(t){return new Promise(e=>setTimeout(e,t))}function iw(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function aw(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Mp=8e3,Cp=300,sw=250;async function lw(){if(Je())return await ps(Cp),!0;for(;Date.now()-rw<Mp;)if(await ps(sw),Je())return await ps(Cp),!0;return Je()||Ps()}function Bc(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function cw(){if(Bc())return!0;let t=Date.now()+Mp;for(;Date.now()<t;)if(await ps(100),Bc())return!0;return Bc()}function uw(){try{GM_registerMenuCommand?.("Bloom++ settings",Qu)}catch{}}function dw(){wi(()=>{Br("HostShell"),Pr.info("host shell",Et)}),Ei(()=>{Pr.info("idle ready",Et)}),Si(()=>{bs(),Br("HostReady"),Pr.info("chrome ready",Et)})}async function Dc(){await Jc()}async function _c(){if(kp)return;kp=!0,Lu();for(let n of ow)try{iu(n),Ru(n)}catch(r){Pr.error("register failed",n.name,r)}Br("Init"),uw(),dw();let t=()=>Br("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await iw(),bs(),Pr.info("styles ready",Et),await aw(),cw().then(n=>{n&&Ti()}),!await lw()){Pr.warn("late islands not detected; starting default plugins",Et),Fn(),Li();return}await Iu()}var Ap=typeof unsafeWindow<"u"?unsafeWindow:window,fw=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||fw){let t=Ap.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Et);try{Object.defineProperty(Ap,"Bloom",{value:qc,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Dc().then(()=>_c()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
