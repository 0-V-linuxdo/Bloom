// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.105
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

/* Bloom++ [20260924] v1.4.105. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Hp=Object.defineProperty;var Ip=(t,e)=>{for(var n in e)Hp(t,n,{get:e[n],enumerable:!0})};var _c={};Ip(_c,{REPO_URL:()=>Ru,Settings:()=>j,VERSION:()=>Et,contextKeyFromUrl:()=>ce,conversationChain:()=>jr,conversationTitle:()=>zn,conversationToken:()=>Pt,currentConversationId:()=>A,ensureConversationChain:()=>me,hasDraftText:()=>Vt,hasErrorToast:()=>Zt,hasLateIslands:()=>tn,init:()=>Dc,initSettings:()=>Bc,isDocumentInteractive:()=>Ou,isStreaming:()=>Y,isUserDraftEmpty:()=>Pe,messageCreateTime:()=>xi,plugins:()=>le,requestChromeReady:()=>ki,requestIdleReady:()=>Gn,requestShellReady:()=>Li,setEditorText:()=>ge,subscribeHarvest:()=>wt,watchStreamingEdge:()=>ft,whenChromeReady:()=>Ti,whenIdleReady:()=>Si,whenShellReady:()=>Ei});var ke=new Map,ei=!1;function Np(){return document.getElementById("bloom-root")?.shadowRoot??null}function $c(){return document.head??null}function _n(){let t=Np();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Rp()}function ps(t,e){if(!ei)return;let n=$c();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),_n();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,_n();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,_n()}function k(t,e){let n=ke.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},ke.set(t,n)),ei&&ps(t,n)}function gs(){if(!$c())return!1;ei=!0;for(let[e,n]of ke)ps(e,n);return _n(),!0}function Fc(t){let e=ke.get(t);e&&(e.disabled=!1,ei&&ps(t,e))}function jc(t){let e=ke.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),_n())}function L(t){let e=ke.get(t);e&&(e.el?.remove(),ke.delete(t),_n())}function Rp(){return Array.from(ke.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var C=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function E(t){return t}var hs=new Map;function qn(t,e){let n=hs.get(t);return n||(n=new Set,hs.set(t,n)),n.add(e),()=>n.delete(e)}function Je(t,e){let n=hs.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Pp="bloompp";function zc(){return new Promise((t,e)=>{let n=indexedDB.open(Pp,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Gc(t){try{let e=await zc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Uc(t,e){try{let n=await zc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function it(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function at(t,e,n){return Math.min(n,Math.max(e,t))}function Kc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Wc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Vc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var ni=new C("SettingsStore"),Ce="BloomSettings",Op=100;function ri(t){return t!=null&&typeof t.then=="function"}function Bp(t){if(t==null||ri(t))return null;if(it(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(it(e)&&!ri(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return it(n)&&!ri(n)?n:null}return null}catch{return null}}function ii(t){let e=Bp(t);if(!e)return null;let n=e.plugins;return!it(n)||ri(n)||Object.keys(n).length===0?null:e}function ys(t){return it(t)?t:null}function bs(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:it(t)?Object.keys(t).length===0:!1}function Dp(t){return bs(t)?0:Array.isArray(t)?12+Math.min(t.length,40):it(t)?12+Math.min(Object.keys(t).length,40):3}function Qe(t){if(!t)return-1;let e=t.plugins;if(!it(e))return-1;let n=0;for(let r of Object.values(e)){let o=ys(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=Dp(a))}return n}function Yc(t){let e=t.plugins;if(!it(e))return 0;let n=0;for(let r of Object.values(e))ys(r)?.enabled===!0&&n++;return n}function Xc(t){let e=t.map((i,a)=>({bag:i,index:a,score:Qe(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=Yc(a.bag)-Yc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!it(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(it(a))for(let[s,l]of Object.entries(a)){let c=ys(l);if(!c)continue;if(!it(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}bs(u[d])&&!bs(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return it(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Qe(n)}}var oi=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return it(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){ni.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Op))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Ce,this.plain)}catch{try{GM_setValue(Ce,e)}catch(n){ni.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Ce,e)}catch{}Uc(Ce,e).catch(n=>ni.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){ni.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Kc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var _p=new C("Settings"),qp={plugins:{}},j=new oi(structuredClone(qp)),$p=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Fp(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function M(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?Me(n):{}},get plain(){let n=e.pluginName;return n?j.plain.plugins[n]??{}:{}}};return e}async function jp(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Zc(){let t=ii(await jp(Ce)),e=ii(await Gc(Ce)),n=null;try{n=ii(localStorage.getItem(Ce))}catch{n=null}let r=Xc([t,e,n]);if(r){let o=r.bag.plugins;o&&(j.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);_p.info("Loaded settings from",i,"richness",r.score,"gm",Qe(t),"idb",Qe(e),"ls",Qe(n))}j.releasePersist(),r&&(r.index!==0||r.score>Qe(t))&&j.persistLoadedBag()}function Me(t){return j.plain.plugins[t]||(j.plain.plugins[t]={}),j.store.plugins[t]}function Jc(t,e){e&&(e.pluginName=t,Me(t),j.setDefaultGetter($p(t),n=>{if(n!=="enabled")return Fp(e.def,n)}))}function Qc(){return Me("Settings")}function ai(){return Qc().pinnedPlugins??[]}function tu(t){return ai().includes(t)}function eu(t){let e=ai(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function si(){return Qc().starredPlugins??[]}function nu(t){return si().includes(t)}function ru(t){let e=si(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var li=new C("PluginManager"),le={},_r=new Set;function ou(t){if(le[t.name]){li.warn("Duplicate plugin",t.name);return}le[t.name]=t,Jc(t.name,t.settings)}function $n(t){let e=le[t];if(!e)return!1;if(e.required)return!0;let n=j.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function iu(t){let e=le[t];if(!e||e.required)return;let n=!$n(t);Me(t),j.store.plugins[t].enabled=n,n?au(e):zp(e),Je("pluginToggle",{name:t,enabled:n})}function au(t,e=!1){if(!_r.has(t.name)&&$n(t.name))try{t.managedStyle&&Fc(t.managedStyle),t.start?.(),_r.add(t.name),t.settings&&j.addPrefixChangeListener(`plugins.${t.name}.`,()=>{_r.has(t.name)&&t.onSettingsChange?.()}),e||li.debug("Started",t.name)}catch(n){li.error("Failed to start",t.name,n)}}function zp(t){if(_r.has(t.name)){try{t.stop?.()}catch(e){li.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(jc(t.managedStyle),L(t.managedStyle)),_r.delete(t.name)}}function qr(t){for(let e of Object.values(le))(e.startAt??"DOMContentLoaded")===t&&au(e)}var su=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Pt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function ce(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ue(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(su)?.[1]??""}catch{return t.match(su)?.[1]??""}}function A(){return ue(location.pathname)}var cu=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i;function di(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function xs(t,e){return e!=="GET"||di(t)?!1:cu.test(t)}function fi(t){return t.match(cu)?.[1]??""}function mi(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return mi(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function st(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function pi(t){let e=st(t);return e?!e.mapping&&st(e.conversation)?e.conversation:e:null}function Gp(t){let e=t.match(/[?&]num_turns=(\d+)/i);if(!e)return 0;let n=Number(e[1]);return Number.isFinite(n)&&n>0?n:0}function lu(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function vs(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=lu(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?lu(n.text):""}function ui(t){let e=st(t.metadata);if(e?.is_visually_hidden_from_conversation===!0||e?.is_user_system_message===!0||e?.user_context_message===!0)return"";let r=st(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function Up(t){return(st(t.author)?.role??t.role)==="user"}function Kp(t){let e=typeof t.recipient=="string"?t.recipient.toLowerCase():"";if(e&&e!=="all"||(st(t.author)?.role??t.role)==="tool")return!0;let o=st(t.content),i=(typeof o?.content_type=="string"?o.content_type:"").toLowerCase();if(/thought|reasoning/.test(i)||i==="code"||i==="execution_output"||/^(?:tether_|computer_)/.test(i))return!0;let a=typeof t.channel=="string"?t.channel.toLowerCase():"";return!!(/^(?:commentary|thought|thoughts|reasoning|analysis)$/.test(a)&&t.end_turn!==!0)}function uu(t){return!!ui(t)&&!Kp(t)}function du(t){let e=[];for(let n of t){let r=e[e.length-1];if(r&&r.role==="assistant"&&n.role==="assistant"){let o=n.alias||r.alias||(r.id!==n.id?r.id:void 0),i=n.at??r.at;e[e.length-1]={id:n.id,role:"assistant",text:n.text||r.text,...o&&o!==n.id?{alias:o}:{},...i?{at:i}:{}};continue}e.push(n)}return e}function Wp(t,e){let n=Es(t,e);if(!n)return!0;let r=new Set,o=n,i=null;for(;o&&e[o]&&!r.has(o);){r.add(o);let a=st(e[o]);i=a&&typeof a.parent=="string"?a.parent:null,o=i}return!!(i&&!e[i])}function fu(t){let e=pi(t);if(!e)return!1;let n=st(t);for(let a of[e,n])if(a&&(a.has_more===!0||a.has_more_before===!0||a.truncated===!0))return!0;let r=st(e.mapping);if(r&&Object.keys(r).length)return Wp(e,r);let o=Array.isArray(e.turns)?e.turns:Array.isArray(e.messages)?e.messages:Array.isArray(e.items)?e.items:[],i=Number(e.num_turns??e.turn_count??e.total_turns??e.total);return Number.isFinite(i)&&i>o.length&&o.length>0}function gi(t){let e=pi(t);if(!e)return"";let n=st(e.mapping);if(n&&Object.keys(n).length){let o=Es(e,n),i=new Set,a=o,s=o;for(;a&&n[a]&&!i.has(a);){i.add(a),s=a;let l=st(n[a]),c=l&&typeof l.parent=="string"?l.parent:"";if(c&&!n[c])break;a=c||null}return s}let r=$r(t);return r[0]?.alias||r[0]?.id||""}function ws(t,e=""){if(fu(t))return!1;let n=$r(t);if(!n.length)return!1;let r=Gp(e);return!(r&&n.length>=r)}function Es(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?mi(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function Vp(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null;if(l&&uu(l)){let c=ui(l),u=typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:vs(l)};u!==o&&(d.alias=o);let f=mi(l.create_time??l.createTime);f&&(d.at=f),n.push(d)}}else l&&Up(l)&&n.push({id:"",role:"user",text:""});o=typeof s.parent=="string"?s.parent:null}return n.reverse(),du(n).filter(a=>a.id)}function ci(t){return t.length<=480?t:t.slice(t.length-480)}function Ss(t,e){if(!e.length)return t;if(!t.length)return ci(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(W=>W.id)),m=n.has(e[e.length-1].id),p=e.filter(W=>!f.has(W.id)),h=e[e.length-1].at,g=e[0].at,w=t[0].at,b=t[t.length-1].at,v=m||!!h&&!!w&&h<=w,ot=!!g&&!!b&&g>=b;return ci(v&&!ot?[...p,...t]:[...t,...p])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return ci([...s,...l,...u,...d])}function Yp(t){let e=[],n=new Set;for(let r of t){let o=st(r);if(!o)continue;let i=st(o.message)??o;if(!uu(i))continue;let a=ui(i)||ui(o);if(!a)continue;let s=typeof i.id=="string"&&i.id||typeof o.message_id=="string"&&o.message_id||typeof o.id=="string"&&o.id||"";if(!s||n.has(s))continue;n.add(s);let l={id:s,role:a,text:vs(i)||vs(o)},c=typeof o.id=="string"&&o.id&&o.id!==s?o.id:"";c&&(l.alias=c);let u=mi(i.create_time??i.createTime??o.create_time??o.createTime);u&&(l.at=u),e.push(l)}return du(e)}function Xp(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=Es(t,n);return r?Vp(n,r):[]}function $r(t){let e=pi(t);if(!e)return[];let n=Xp(e);if(n.length)return n;let r=Array.isArray(e.turns)?e.turns:Array.isArray(e.messages)?e.messages:Array.isArray(e.items)?e.items:[];return r.length?Yp(r):[]}function mu(t,e=""){let n=st(t);if(!n)return e;let r=pi(t)??n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function pu(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var ks=new C("Harvest"),Zp=1500,Jp=200,Qp=8,hi=new Set,bi=new Map,yi=new Map,de=new Map,gu=[],Ae=new Set,Ts=new Set,hu=new Map,wu={Accept:"application/json"},tg=/^(authorization|oai-|openai-|chatgpt-|x-authorization)/i,eg=16,ng=1e4,Fn=null,vi=null,Fr=null,Ot=0,Eu=!1;function Su(){return typeof unsafeWindow<"u"?unsafeWindow:window}function rg(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function og(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var ig=/"action"\s*:\s*"(next|continue|variant)"/i;function ag(t,e,n){return!(e!=="POST"||di(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!ig.test(n))}function Tu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function sg(t){return typeof t=="string"?Tu(t):""}function Ls(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ls(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Cs(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function bu(t,e,n){!t||!e||yi.get(t)!==e&&(yi.set(t,e),Cs(yi,Zp),fe({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function lg(t,e){let n=e.trim();!t||!n||bi.get(t)!==n&&(bi.set(t,n),Cs(bi,Jp),fe({type:"conversation-meta",conversationId:t,title:n}))}function Lu(t,e,n=""){let r=mu(e,t);if(!r)return;let o=$r(e);if(!o.length)return;let i=de.get(r)??[],a=Ss(i,o);ws(e,n)&&Ae.add(r),!pu(i,a)&&(de.set(r,a),Cs(de,Qp),fe({type:"conversation-chain",conversationId:r}))}function jn(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)jn(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&lg(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ls(l.create_time??l.createTime??l.created_at);c&&u&&bu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ls(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&bu(a,s,o),r.mapping&&typeof r.mapping=="object")jn(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&jn(l,o,n+1)}function yu(t,e){if(t)try{jn(JSON.parse(t),e)}catch{}}function fe(t){for(let e of Array.from(hi))try{e(t)}catch{}}function cg(t,e){let n=e?.headers??(typeof Request<"u"&&t instanceof Request?t.headers:null);if(!n)return;let r=n instanceof Headers?n.entries():Array.isArray(n)?n:Object.entries(n);for(let[o,i]of r)typeof i=="string"&&tg.test(o)&&(wu[o]=i)}async function ug(t,e,n,r){if(n===Ot)try{let o=await t.json();if(n!==Ot)return;jn(o,e),Lu(e,o,r)}catch{}}async function dg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Ot&&fe({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Ot;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=Tu(c);m&&(o=m,fe({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let p=m.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||yu(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Ot&&yu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Ot&&fe({type:"post-end",conversationId:o,error:i})}function fg(t,e,n){let r=rg(e),o=og(e,n),i=xs(r,o),a=ag(r,o,n?.body),s=Ot,l="";return a&&(l=sg(n?.body)||fi(r)||ue(r)||A(),fe({type:"post-start",conversationId:l,url:r})),i&&cg(e,n),t(e,n).then(c=>{if(s!==Ot||!i&&!a)return c;try{let u=c.clone();i?ug(u,fi(r)||A(),s,r):dg(u,l,!c.ok,s)}catch{a&&fe({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Ot&&fe({type:"post-end",conversationId:l,error:!0}),c})}function Ms(){if(Fn)return;let t=Su();Fr=t,Fn=t.fetch.bind(t);let e=(n,r)=>fg(Fn,n,r);vi=e,t.fetch=e,ks.debug("conversation fetch harvest hooked")}function mg(){Ot+=1,!(!Fn||!Fr)&&(vi&&Fr.fetch===vi&&(Fr.fetch=Fn),Fn=null,vi=null,Fr=null,ks.debug("conversation fetch harvest unhooked"))}function pg(){Ot+=1,!Eu&&mg()}function ku(){Eu=!0,Ms()}function vu(t,e=""){if(e){let n=`include_has_versions=true&num_turns=80&before_node=${encodeURIComponent(e)}`,r=`include_has_versions=true&num_turns=80&before=${encodeURIComponent(e)}`;return[`/backend-api/conversations/${t}?${n}`,`/backend-api/conversations/${t}?${r}`]}return[`/backend-api/conversation/${t}`,`/backend-api/f/conversation/${t}`,`/backend-api/conversations/${t}`,`/backend-api/conversations/${t}?include_has_versions=true`,`/backend-api/conversations/${t}?include_has_versions=true&num_turns=480`]}async function xu(t,e,n){let r=await t.fetch(e,{method:"GET",credentials:"include",headers:{...wu}});if(!r.ok)return null;let o=await r.json();return jn(o,n),Lu(n,o,e),o}function me(t){if(!t||Ae.has(t)||Ts.has(t))return;let e=hu.get(t)??0;if(Date.now()<e)return;Ts.add(t),Ms();let n=Su();(async()=>{try{let r=null,o=!1;for(let l of vu(t))try{let c=await xu(n,l,t);if(!c)continue;if(r=c,o=!0,Ae.has(t)){ks.debug("conversation chain complete",t,de.get(t)?.length??0);return}}catch{}let i=r?gi(r):de.get(t)?.[0]?.alias||de.get(t)?.[0]?.id||"",a=0,s=!0;for(;i&&s&&a++<eg&&!Ae.has(t);){s=!1;let l=de.get(t)?.length??0;for(let c of vu(t,i))try{let u=await xu(n,c,t);if(!u)continue;r=u,o=!0;let d=gi(u);if(d&&d!==i&&(i=d),(de.get(t)?.length??0)>l&&(s=!0),Ae.has(t))return;if(s)break}catch{}}if(Ae.has(t))return;o&&!s&&Ae.add(t)}finally{Ts.delete(t),Ae.has(t)||hu.set(t,Date.now()+ng)}})()}function wt(t){return hi.add(t),Ms(),()=>{hi.delete(t),hi.size===0&&pg()}}function zn(t){return t?bi.get(t)??"":""}function xi(t){return t?yi.get(t)??null:null}function jr(t){return t?de.get(t)??gu:gu}var zr=!1,wi=!1,As=!1,Mu=[],Au=[],Hu=[];function Hs(t){let e=t.splice(0);for(let n of e)n()}function Gr(){zr||(zr=!0,Hs(Mu))}function Is(){wi||(wi=!0,zr||Gr(),Hs(Au))}function Iu(){As||(As=!0,zr||Gr(),wi||Is(),Hs(Hu))}function Ei(t){zr?t():Mu.push(t)}function Si(t){wi?t():Au.push(t)}function Ti(t){As?t():Hu.push(t)}function Li(){Gr()}function Gn(){Gr(),Is()}function ki(){Iu()}function Cu(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Nu(){await Cu(4e3),Gr(),await Cu(4e3),Is(),Iu()}var S={p:"0-V-linuxdo"},Et="[20260924] v1.4.105",Ru="https://github.com/0-V-linuxdo/Bloom";var gg={BetterNavigator:1790260138e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790252301e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function Pu(t){let e=gg[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function hg(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function bg(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ns(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function tn(){return Ns()?hg()||bg():!1}function Ou(){return tn()}var yg=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Bu=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),vg=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),xg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Kn(t){return t.id==="bloom-root"||!!t.closest(xg)}function Du(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Ci(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Rs(t){if(!(t instanceof HTMLElement)||!t.isConnected||Kn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Ci(e)?!1:t.getClientRects().length>0}function Un(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function wg(){let t=[];for(let e of document.querySelectorAll(yg))!(e instanceof HTMLElement)||!e.isConnected||Kn(e)||t.push(e);return t}function Mi(t){if(!t.isConnected||Kn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function en(){return wg().filter(Mi)[0]??null}function Wn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Kn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Ps(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Kn(n)&&!Un(n)&&n.parentElement&&!Un(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!Un(r)&&!Kn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!Un(r.parentElement))return r}return e}function Vn(){let t=document.querySelectorAll(Bu);for(let n of t)if(Rs(n)&&!Ci(n)&&Du(n))return n;let e=document.querySelectorAll(vg);for(let n of e){if(!Rs(n)||!Du(n)||Ci(n))continue;let r=n.querySelector(Bu);return Rs(r)&&!Ci(r)?r:n}return null}function Ai(){let t=en();if(t){let e=Ps(t),n=e.parentElement;if(n&&!Un(n))return n;if(!Un(e))return e}return Wn()}function Hi(t){let e=en();return e?t.composedPath().includes(e):!1}var Bs=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Eg={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Sg(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Tg(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Os(t){let e=Sg(t);return e?Tg(e)>.55?"light":"dark":null}function Lg(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Os(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Os(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Os(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Ii(t){return t==="auto"?Lg():t}function kg(t){try{let e=getComputedStyle(document.documentElement);for(let n of Bs){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Ni(t,e,n){let r=Eg[e];if(n){kg(t);for(let o of Bs)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Bs)t.style.setProperty(o,r[o])}function _u(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Ds=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Mg="bloom-root",Kt="bloom-rail-item",Di="bloom-account-item",rn="bloom-sidebar-panel",Qr="bloom-plugin-dialog",Gi="bloom-plugin-layer",_i="bloom-settings-css",Ag=2e3,Fu=null,Hg=null,Re=!1,Fs=[],Ri=null,qi=null,Ie=null,Oi=null,pe=null,Xr=null,Ur,Yn=0,Zr=0,Kr=0,Wr=null,Vr=null,$i=null,ju=null,Yr=null,_s=[],Fi=!1,Ig=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Ng=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Rg=new Set(["chat","ui","privacy"]),Pg=10080*60*1e3,Ui="",Jr="all",Ut="all";function Ki(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function zu(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Og(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Bg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Dg(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function _g(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var qg={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function $g(t){return t.icon||qg[t.name]||Ki()}function qs(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Ni(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Gu(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function ji(){let t="auto",e=Ii(t);qs(Fu,e,!0);let n=document.getElementById(rn);n instanceof HTMLElement&&qs(n,e,!0);let r=document.getElementById(Qr);r instanceof HTMLElement&&qs(r,e,!0);let o=document.getElementById(Kt);o instanceof HTMLElement&&Gu(o),Je("schemeChange",{scheme:e,pref:t})}function Uu(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Ku(){if(k("settings",Ds),document.getElementById(_i)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=_i,t.textContent=Ds,document.head.appendChild(t)}function Fg(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function jg(){for(let t of Fs)t();Fs=[]}function Wu(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function zg(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Gs(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Gg(t){return Gs(t).length>0}function Bi(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Ug(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=zg(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Kg(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Ug(e,n));let i=Me(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Fs.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Bi(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Bi(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Wu(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Bi(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function qu(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Wg(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=Me(t.name);for(let[n,r]of Gs(t)){if(n==="enabled"||r.type===5)continue;let o=Bi(r);o!==void 0&&(e[n]=o)}Yu(t)}function Vu(t){t.key==="Escape"&&(!document.getElementById(Gi)&&!document.getElementById(Qr)||(t.stopPropagation(),Xn()))}function Vg(){Fi||(document.addEventListener("keydown",Vu),Fi=!0)}function Yg(){Fi&&(document.removeEventListener("keydown",Vu),Fi=!1)}function Xn(){jg(),Yg(),document.getElementById(Gi)?.remove(),document.getElementById(Qr)?.remove()}function Yu(t){if(Xn(),!document.body)return;let e=document.createElement("div");e.id=Gi,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Ne),e.addEventListener("pointerup",Ne),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Xn()});let n=document.createElement("div");n.id=Qr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ne),n.addEventListener("pointerup",Ne),n.addEventListener("click",Ne);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=zu(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Xn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=qu("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=qu("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Gs(t);if(c.length)for(let[u,d]of c){let f=Kg(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Wg(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Vg(),ji()}function Xg(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=$g(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=nu(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Dg(l),c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let g=ru(t.name);Je("pluginStar",{name:t.name,starred:g})}),s.appendChild(c),!t.required){let h=tu(t.name),g=document.createElement("button");g.type="button",g.className=`bloom-icon-btn bloom-card-pin${h?" bloom-card-pin-active":""}`,g.setAttribute("aria-label",h?"Unpin from top":"Pin to top"),g.innerHTML=_g(h),g.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let b=eu(t.name);Je("pluginPin",{name:t.name,pinned:b})}),s.appendChild(g)}if(Gg(t)){let h=document.createElement("button");h.type="button",h.className="bloom-icon-btn bloom-card-settings",h.setAttribute("aria-label",`${t.name} settings`),h.innerHTML=Bg(),h.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),Yu(t)}),s.appendChild(h)}let u=Wu(t.name,$n(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",h=>h.stopPropagation()),d?.addEventListener("change",()=>{iu(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let h=document.createElement("div");h.className="bloom-card-desc",h.textContent=t.description,n.appendChild(h)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(p),e.append(n,f,m),e}function Xu(){return Object.values(le).filter(t=>!t.hidden&&t.name!=="Settings")}function Zg(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Pg}function Zu(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Zg(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Rg.has(r)):n.includes(e)}function Jg(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Qg(){return Ui.trim()?"No plugins match your search.":Ut==="favorites"?"No favorites yet. Star a plugin to see it here.":Ut==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function th(){let t=Xu();return Ng.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Zu(n,e.id)))}function eh(){if(Yr){Yr.replaceChildren();for(let t of th()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Ut===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Ut=t.id,nn()}),Yr.appendChild(e)}}}function nh(){let t=Xu();if(Ut==="favorites"){let e=new Set(si());t=t.filter(n=>e.has(n.name))}else Ut!=="all"&&(t=t.filter(e=>Zu(e,Ut)));return Jr==="enabled"&&(t=t.filter(e=>$n(e.name))),Jr==="disabled"&&(t=t.filter(e=>!$n(e.name))),t}function nn(){if(!Wr)return;eh();let t=nh();$i&&($i.placeholder=`Search ${t.length} plugins...`);let e=t,n=Ui.trim().toLowerCase();if(n&&(e=e.filter(r=>Jg(r).includes(n))),Ut==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Ut!=="favorites"){let r=ai();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Wr.replaceChildren();for(let r of e)Wr.appendChild(Xg(r));Vr&&(Vr.hidden=e.length>0,Vr.textContent=Qg())}function Ne(t){t.stopPropagation()}function $s(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Us(){document.getElementById(Kt)?.setAttribute("aria-expanded",Re?"true":"false")}function rh(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Ks(){Xn(),Ui="",Jr="all",Ut="all",document.getElementById(rn)?.remove(),Re=!1,Us()}function oh(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Ne),e.addEventListener("pointerup",Ne),e.addEventListener("click",Ne);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Ki();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Og();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=zu(),d.addEventListener("click",Ks),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Ui=p.value,nn()});let h=document.createElement("select");h.className="bloom-search-filter",h.setAttribute("aria-label","Filter plugins");for(let b of Ig){let v=document.createElement("option");v.value=b.value,v.textContent=b.label,h.appendChild(v)}h.value=Jr,h.addEventListener("change",()=>{Jr=h.value,nn()}),m.append(p,h),n.appendChild(m);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let w=document.createElement("p");return w.className="bloom-tab-empty",w.hidden=!0,n.appendChild(w),e.append(d,n),Wr=g,Vr=w,$i=p,ju=h,Yr=f,nn(),e}function ih(t){t.classList.add("bloom-rail-dock")}function ah(){let t=document.getElementById(Kt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Mi(t)?t:null}function sh(){if(document.getElementById(rn)?.remove(),!document.body)return;let t=oh(rn);ih(t),document.body.appendChild(t),Re=!0,Xn(),ji(),Us(),Je("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Et,dock:"center",rail:!!ah()})}function Ws(){let t=document.getElementById(rn);if(t instanceof HTMLElement&&t.isConnected&&rh(t)){Ks();return}t?.remove(),sh()}function lh(){let t=document.createElement("button");return t.type="button",t.id=Kt,t.className="bloom-rail-item",t.setAttribute("aria-controls",rn),t.setAttribute("aria-expanded",Re?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Ki()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ws()}),t}function $u(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function ch(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function uh(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function He(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Ju(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=ch(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&He(t,"padding-top",Math.round(i)),Number.isFinite(a)&&He(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));He(n,"width",l),He(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&He(t,"padding-left",u);let d=uh(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),p=Math.round(f.left-m.right);p>=0&&p<=24&&He(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&He(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&He(t,"gap",Math.round(l))}Gu(t)}function js(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function dh(){if(Xr?.isConnected&&pe){pe.observe(Xr,{childList:!0});return}zs()}function fh(t){if(js(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function mh(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Kr=0;return}Kr+=1,Zr=Date.now()+Math.min(8e3,250*2**Math.min(Kr,5))})}function ph(){Yn||Date.now()<Zr||(Yn=requestAnimationFrame(()=>{Yn=0,!(Date.now()<Zr)&&(document.getElementById(Kt)?.isConnected||zi())}))}function zi(){if(!document.body)return;pe?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Kt);t=n instanceof HTMLButtonElement?n:lh();let r=en(),o=Wn();if(r){let i=Ps(r),a=i.parentElement;if(js(i)||a&&js(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),$u(t),Ju(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),$u(t,!0)):t.isConnected&&!Mi(t)&&(t.remove(),t=null)}finally{mh(t,e),dh(),Us()}}function zs(){let t=Ai();!t||!fh(t)||Xr===t&&pe||(pe?.disconnect(),Xr=t,pe=new MutationObserver(()=>{document.getElementById(Kt)?.isConnected||ph()}),pe.observe(t,{childList:!0}))}function gh(){zi(),zs(),Ur===void 0&&(Ur=window.setInterval(()=>{let t=document.getElementById(Kt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Zr&&zi();else{Kr=0;let e=en();e&&Ju(t,e)}zs()},Ag))}function hh(){Ur!==void 0&&(clearInterval(Ur),Ur=void 0),Yn&&cancelAnimationFrame(Yn),Yn=0,Zr=0,Kr=0,pe?.disconnect(),pe=null,Xr=null}function bh(t){Oi===t&&Ie||(Ie?.disconnect(),Oi=t,Ie=new MutationObserver(()=>{if(!t.isConnected){Ie?.disconnect(),Ie=null,Oi=null;return}Qu(t)}),Ie.observe(t,{childList:!0}))}function Qu(t){if(bh(t),t.querySelector(`#${Di}`))return;let e=document.createElement("button");e.type="button",e.id=Di,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Ki()}<span>Bloom++</span>`,e.addEventListener("pointerdown",$s),e.addEventListener("pointerup",$s),e.addEventListener("click",n=>{$s(n),Ws()}),t.insertBefore(e,t.firstChild)}function Pi(){let t=Vn();return t?(Qu(t),!0):!1}function yh(t){Hi(t)&&(queueMicrotask(Pi),requestAnimationFrame(()=>{Pi()}),window.setTimeout(Pi,60),window.setTimeout(Pi,180))}function vh(){qi?.abort();let t=new AbortController;qi=t,document.addEventListener("click",yh,{signal:t.signal})}function xh(){qi?.abort(),qi=null,Ie?.disconnect(),Ie=null,Oi=null}function td(){Gn(),Fg(()=>{Ku(),Uu(),zi(),Ws()})}var ed=E({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Mg}`,`#${Kt}`,`#${Di}`,`#${rn}`,`#${Gi}`,`#${Qr}`,`#${_i}`,"#bloom-menu-panel"],start(){Ku(),Uu(),gh(),vh(),Ri?.(),Ri=_u(ji),ji(),_s=[qn("pluginToggle",()=>{Re&&nn()}),qn("pluginPin",()=>{Re&&nn()}),qn("pluginStar",()=>{Re&&nn()})]},stop(){hh(),xh(),Ri?.(),Ri=null;for(let t of _s)t();_s=[],Ks(),document.getElementById(Kt)?.remove(),document.getElementById(Di)?.remove(),document.getElementById(_i)?.remove(),Fu=null,Hg=null,Wr=null,Vr=null,$i=null,ju=null,Yr=null,Re=!1}});var Wi='form[data-type="unified-composer"], form.w-full[data-type]',Wt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Zn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),nd=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),rd=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),wh=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Eh='[contenteditable="false"], button, [role="button"]';function Bt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function on(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Bt(o)))return o;return null}function od(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function z(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=od(t);return!!(wh.test(n)||/^stop$/i.test(n))}function Dt(){let e=Array.from(document.querySelectorAll(Wi)).find(Bt);if(e instanceof HTMLElement)return e;let n=on(document,Wt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function lt(){let t=Array.from(document.querySelectorAll(Wt));return t.find(Bt)??t[0]??null}function Sh(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Eh);return!!n&&n!==e&&e.contains(n)}function Vs(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Sh(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Vt(t){let e=t??lt();return e?Vs(e,e).replaceAll("\u200B","").trim().length>0:!1}function Pe(t){return!Vt(t)}function Vi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function id(t){let e=Dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Bt(n))&&t(n))return n;return null}function Oe(){let t=Dt(),e=on(t,Zn)??on(document,Zn);return e&&!z(e)?e:id(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!z(n);let o=od(n);return/^(send|send prompt|发送)$/i.test(o)&&!z(n)})}function an(){let t=Dt(),e=on(t,nd,!0)??on(document,nd,!0);if(e)return e;let n=on(t,rd)??on(document,rd);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Bt(r)&&z(r))return r}return id(z)}function Yt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Vs(n,t)).join(`
`):Vs(t,t)}function Ys(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function ge(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Ys(t,n)}var sd=new C("Streaming");function oo(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Bt(e))&&(z(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Th(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Bt(t))}function Lh(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Bt(t))}function kh(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Zt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Y(){if(an()||oo()||kh())return!0;let t=Oe();return t&&Bt(t)&&!z(t)?!1:!!(Th()||Lh())}var Ch=400,ad=3,un=new Set,to,eo=null,Xs=null,ln=!1,sn=0,De="",_e="",qe=!1,no=!1,ro=!1,Xt=!1,Q=null,St="",cn=!1;function G(){return Xt}function dn(){return qe}function Jn(){return St}function Zs(){return A()||St}function ld(){return ce(Pt())}function Yi(t,e){return{streaming:t,contextKey:e,conversationId:Zs()}}function Js(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Mh(t){return!t||t==="/"||t.startsWith("/g/")}function X(t,e){if(!t||t===e)return!1;let n=ue(Js(e)||e);return!n||!(t.endsWith("|draft")||Mh(Js(t)))?!1:St?n===St:cn}function Xi(){ln=!1,sn=0,De="",qe=!1,no=!1,ro=!1,St="",cn=!1}function Ah(t){for(let e of Array.from(un))try{e.onFall?.(t)}catch{}}function Hh(t){for(let e of Array.from(un))try{e.onRise?.(t)}catch{}}function Be(t){for(let e of Array.from(un))try{e.onTick?.(t)}catch{}}function Ih(t,e){for(let n of Array.from(un))try{n.onContext?.(t,e)}catch{}}function Nh(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&z(n)&&(qe=!0)}function Rh(t){if(t.type==="post-start"){let n=A();if(!t.conversationId){n||(cn=!0),(!n||n===St)&&(Xt=!1,qe=!1);return}if(!(t.conversationId===n||t.conversationId===St)&&!(!n&&cn))return;St=t.conversationId,cn=!1,Xt=!1,qe=!1;return}if(t.type!=="post-end"||!ln&&!Q)return;let e=A();t.conversationId&&!(e?t.conversationId===e:t.conversationId===St)||(ro=!0,t.error&&(no=!0,Q&&(Q.error=!0)))}function Ph(){let t=ld(),e=Y();if(_e&&t&&_e!==t){let o=_e;if(!X(o,t))Q=null,Xi(),Xt=e;else{let i=ue(Js(t));if(i&&!St&&(St=i,cn=!1),De===o&&(De=t),Q&&Q.contextKey===o){Q.contextKey=t;let a=Zs();a&&(Q.conversationId=a)}Xt=!1}if(_e=t,Ih(t,o),Xt){Be(Yi(!1,t));return}}else t&&(_e=t);if(Xt){if(e){Be(Yi(!1,t));return}Xt=!1}if(Q)if(e||Q.contextKey!==t)Q=null;else{let o=Q;Q=null,Xi(),Ah(o),Be(Yi(!1,t));return}let n=Yi(e,t);if(e){let o=!ln;o&&(qe=!1,no=!1,ro=!1),ln=!0,sn=0,De=t,o&&Hh(n),Be(n);return}if(!ln){Be(n);return}if(sn+=1,ro&&(sn=Math.max(sn,ad)),sn<ad){Be(n);return}if(!(!!De&&De===t)){Xi(),Be(n);return}Q={contextKey:De||t,conversationId:Zs(),userStopped:qe,error:no||Zt()},Be(n)}function Oh(){to===void 0&&(ln=Y(),_e=ld(),De=ln?_e:"",sn=0,qe=!1,no=!1,ro=!1,Xt=!1,Q=null,St="",cn=!1,eo?.abort(),eo=new AbortController,document.addEventListener("click",Nh,{capture:!0,signal:eo.signal}),Xs=wt(Rh),to=setInterval(Ph,Ch),sd.debug("watchStreamingEdge started"))}function Bh(){un.size||(to!==void 0&&(clearInterval(to),to=void 0),eo?.abort(),eo=null,Xs?.(),Xs=null,Xi(),_e="",Xt=!1,Q=null,sd.debug("watchStreamingEdge stopped"))}function ft(t){let e=typeof t=="function"?{onFall:t}:t;return un.add(e),Oh(),()=>{un.delete(e),Bh()}}var cd="bloom-host-icon",io="data-bloom-host-rel",Qs="not all",tl=0,ud=0,Dh=400;function dd(t){tl+=1;try{t()}finally{tl-=1}}function Zi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function $e(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function fd(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function _h(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function qh(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-ud<Dh||(ud=n,t.appendChild(e))}function $h(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Zi(n)&&(n.getAttribute(io)||n.setAttribute(io,n.rel),n.media!==Qs&&(n.media=Qs),n.rel!==cd&&(n.rel=cd))}function Fh(t){for(let e of t.querySelectorAll(`link[${io}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(io);n&&(e.rel=n),e.removeAttribute(io),e.media===Qs&&e.removeAttribute("media")}}function md(t,e){let{head:n}=document;!n||!e||dd(()=>{$h(n,t);let r=fd(t),{type:o,sizes:i}=_h(e);r?qh(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function pd(t,e){let{head:n}=document;n&&dd(()=>{fd(t)?.remove(),Fh(n)})}function gd(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(tl)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Zi(c.target)&&(a=!0,$e(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Zi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Zi(u)&&u.id!==t&&(a=!0,$e(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var jh=["original","badge","dot","hole","bg"],yd=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],vd={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ji="#FCFCFC",zh="#111111",hd="#111111",Gh="#ffffff",Uh="#212121",Kh="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Wh={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Qi=32,bd=64;function xd(t){return typeof t=="string"&&jh.includes(t)}function Vh(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function ta(t){let e=document.createElement("canvas");e.width=Qi,e.height=Qi;let n=e.getContext("2d");return n?(n.scale(Qi/bd,Qi/bd),t(n),e.toDataURL("image/png")):""}function Yh(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ea(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Kh);n&&(t.strokeStyle=zh,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Xh(t,e,n){let r=vd[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=hd,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=hd,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Gh,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function ao(t,e){if(t==="original")return e==="wait"?ta(r=>ea(r,Ji)):Vh(Wh[e]);let n=e==="wait"?void 0:vd[e];return ta(t==="hole"?r=>ea(r,n??Ji):t==="bg"?r=>{r.fillStyle=n??Uh,Yh(r,0,0,64,64,14),r.fill(),ea(r,Ji,!1)}:r=>{ea(r,Ji),e!=="wait"&&Xh(r,e,t==="dot"?"dot":"badge")})}function wd(t){return{wait:ao(t,"wait"),rotate:ao(t,"rotate"),done:ao(t,"done"),ready:ao(t,"ready"),error:ao(t,"error")}}var Zh=new C("ChatStateFavicons"),mn="bloom-chat-state-favicon",kd=["input","beforeinput","cut","paste","compositionend"],Cd=M({style:{type:3,description:"Favicon overlay",options:yd}}),Jt="",rl={wait:"",rotate:"",done:"",ready:"",error:""},so="wait",mt=!1,tt=!1,D=null,ht="",Tt="",gn=!0,oa=!1,Qn=null,Lt=0,na=null,ra=null,fn=null,nl=null,tr=null,_t=!1,Ed=new WeakSet;function Jh(){let t=Cd.store.style;return xd(t)?t:"bg"}function Md(){let e=document.querySelector(`link[rel~="icon"]:not(#${mn}), link[data-bloom-host-rel]:not(#${mn})`)?.href;return $e(e)?e:$e(Jt)?Jt:""}function Qh(){let t=document.getElementById(mn);return t instanceof HTMLLinkElement?t:null}function tb(){if(!$e(Jt)){let t=Md();t&&(Jt=t)}return $e(Jt)?Jt:rl.wait}function Ad(t){return t==="wait"?tb():rl[t]}function Hd(){md(mn,Ad(so))}function q(t){let e=Ad(t);if(so===t){let n=Qh();if(n&&n.getAttribute("href")===e)return}so=t,Hd()}function Sd(){rl=wd(Jh()),q(so)}function ol(){return ce(Pt())}function il(t,e){!t||!e||t===e||(D===t&&(D=e),ht===t&&(ht=e),Tt===t&&(Tt=e))}function eb(){let t=ol();if(!(Y()||mt||tt))return ht="",t;if(ht&&t&&ht!==t)if(X(ht,t))il(ht,t),ht=t;else return ht="",t;else!ht&&t&&(ht=t);return ht||t}function Td(t){return!D||!t?!1:D===t?!0:X(D,t)}function Id(){mt=!1,tt=!1,D=null,ht=""}function Nd(t){Tt=t,Id(),gn=!1,oa=!0,q("wait")}function el(t){return!t&&gn}function nb(){if(!_t)return;let t=ol();if(Tt&&t&&Tt!==t&&!X(Tt,t)){Nd(t);return}Tt&&t&&X(Tt,t)&&il(Tt,t),t&&(Tt=t);let e=Y(),n=e&&!G();if(oa){if(G()){q("wait");return}oa=!1}if(G()){q("wait");return}let r=eb(),o=Pe();if(dn()&&!e){mt=!1,tt=!1,D=null,q(o?"wait":el(o)?"ready":"wait");return}if(Zt()&&!e&&mt){q("error"),mt=!1,tt=!1,D=null;return}if(n){mt||(gn=!1),mt=!0,tt=!1,D=r,q("rotate");return}if(mt)if(!Td(t))mt=!1,tt=!1,D=null;else if(tt){mt=!1,tt=!0,D=t||r,q("done");return}else{q("rotate");return}if(tt)if(D&&t&&!Td(t))tt=!1,D=null;else if(o){D=r||D,q("done");return}else if(el(o)){tt=!1,q("ready");return}else{tt=!1,q("wait");return}D=null,o?q("wait"):el(o)?q("ready"):q("wait")}function pn(){_t&&(Dd(),Pd(),Od(),nb())}function Rd(){if(tr){for(let t of kd)tr.removeEventListener(t,Bd,!0);tr=null}}function Pd(){let t=Dt(),e=t&&t!==document.body?t:null;if(!(tr===e&&e?.isConnected)&&(Rd(),!!e)){tr=e;for(let n of kd)tr.addEventListener(n,Bd,{capture:!0,passive:!0})}}function Od(){let t=Dt();if(!(fn&&nl===t&&t.isConnected)){if(fn?.disconnect(),nl=t,!t||t===document.body){fn=null;return}fn=new MutationObserver(()=>ia()),fn.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function ia(){if(_t){if(document.hidden){Lt&&(cancelAnimationFrame(Lt),Lt=0),pn();return}Lt||(Lt=requestAnimationFrame(()=>{Lt=0,_t&&pn()}))}}function Bd(){Vt()&&(gn=!0),ia()}function Ld(){Vt()&&(gn=!0),ia()}function rb(){_t&&(Lt&&(cancelAnimationFrame(Lt),Lt=0),pn())}function ob(){_t&&(gn=!1,pn())}function ib(t){if(!_t)return;if(t.userStopped){mt=!1,tt=!1,D=null,q("wait");return}if(t.error){mt=!1,tt=!1,D=null,q("error");return}let e=ol();if(t.contextKey&&e&&t.contextKey!==e&&!X(t.contextKey,e)){mt=!1,tt=!1,D=null,q("wait");return}mt=!1,tt=!0,D=e||t.contextKey,q("done")}function ab(){_t&&pn()}function sb(t,e){if(_t){if(X(e,t)){il(e,t),Tt=t,pn();return}Nd(t)}}function Dd(){let t=lt();!t||Ed.has(t)||(Ed.add(t),t.addEventListener("input",Ld,{capture:!0,passive:!0}),t.addEventListener("compositionend",Ld,{capture:!0,passive:!0}))}var _d=E({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Cd,startAt:"DOMContentLoaded",cleanupSelectors:[`#${mn}`],start(){_t=!0,Jt=Md()||Jt,Sd(),ra?.disconnect(),ra=gd(mn,t=>{$e(t)&&(Jt=t),Hd()}),Qn?.abort(),Qn=new AbortController,window.addEventListener("popstate",ia,{signal:Qn.signal}),document.addEventListener("visibilitychange",rb,{signal:Qn.signal}),Dd(),Pd(),Od(),na?.(),na=ft({onRise:ob,onFall:ib,onTick:ab,onContext:sb}),pn(),Zh.debug("favicon watch started")},stop(){_t=!1,Lt&&cancelAnimationFrame(Lt),Lt=0,na?.(),na=null,Qn?.abort(),Qn=null,Rd(),fn?.disconnect(),fn=null,nl=null,ra?.disconnect(),ra=null,Id(),Tt="",gn=!0,oa=!1,so="wait",pd(mn,Jt)},onSettingsChange:Sd});var qd=`.bloom-ih-hud {
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
`;var jE=new C("InputHistory"),al=/\u200B/g,$d=10,Fd=500,jd=100,cb=8,ub=120,db=2e3,aa=10,sa=M({maxEntries:{type:4,description:"Max stored prompts",min:$d,max:Fd,default:jd},history:{type:5,description:"Stored prompts",render:kb},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),sl=new Map,et=0,ll="",Qt=!1,co=!1,dl=0,lo=null,cl,fl=null,zd=!0;function qt(){let t=sa.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Gd(t){let e=at(Number(sa.store.maxEntries??jd),$d,Fd);return t.length>e?t.slice(t.length-e):t}function la(t){sa.store.entries=Gd(t)}function fb(t){return t.replaceAll(al,"").replace(/\n$/,"").trim()}function ul(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Wt);return n instanceof HTMLElement?n:lt()}function mb(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Yt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(al,"").trim().length===0,last:i.toString().replaceAll(al,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ud(t){clearTimeout(cl),cl=setTimeout(()=>{if(t!==dl)return;co=!1;let e=fl;e&&Ys(e,zd)},ub)}function Kd(t,e,n){co=!0,fl=t,zd=n;let r=++dl;ge(t,e,n),Ud(r)}function pb(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function er(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function gb(){document.querySelector(".bloom-ih-hud")?.remove()}function hb(t,e){let n=pb();n.textContent=t;let r=(e.closest("form")??Dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-cb)}px`,n.classList.add("bloom-ih-hud-on")}function ml(t){let e=fb(t);if(!e)return;let n=Date.now(),r=sl.get(e);if(r&&n-r<db)return;sl.set(e,n);let o=qt().filter(i=>i!==e);o.push(e),la(o),et=qt().length,Qt=!1,er()}function bb(t,e){let n=qt();if(!n.length&&t)return;et>=n.length&&(ll=Yt(e),et=n.length);let r=t?et-1:et+1;r<0||r>n.length||(et=r,Qt=!0,Kd(e,r===n.length?ll:n[r],t),r<n.length?hb(`${r+1} / ${n.length}`,e):er())}function yb(t){Qt=!1,er(),Kd(t,ll,!1),et=qt().length}function vb(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=ul(t.target)??ul(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Qt&&!t.altKey&&!t.shiftKey){yb(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){ml(Yt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=qt();if(!r){let i=mb(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||et<=0)||!n&&et>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),bb(n,e))}function xb(t){if(ul(t.target)){if(co){Ud(dl);return}Qt&&(Qt=!1,er(),et=qt().length)}}function wb(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Wt);n instanceof HTMLElement&&ml(Yt(n))}function Eb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Zn);if(!n||!(n instanceof HTMLElement)||z(n))return;let r=lt();r&&ml(Yt(r))}function Sb(t){if(!(!Qt||co)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Qt=!1,er()}}function Tb(){if(lo)return;lo=new AbortController;let{signal:t}=lo,e={capture:!0,signal:t};window.addEventListener("keydown",vb,e),window.addEventListener("input",xb,e),window.addEventListener("submit",wb,e),window.addEventListener("click",Eb,e),window.addEventListener("pointerdown",Sb,e)}function Lb(t){let e=qt().slice();e.splice(t,1),la(e),et>e.length&&(et=e.length)}function kb(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=qt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/aa));n>=l&&(n=l-1);let c=s.slice(n*aa,n*aa+aa);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((w,b)=>{let v=i.indexOf(w),ot=qt().length-1-v,W=document.createElement("div");W.className="bloom-ih-item";let J=document.createElement("button");J.type="button",J.className=`bloom-ih-body${r===b?"":" bloom-ih-clamp"}`,J.textContent=w,J.addEventListener("click",()=>{r=r===b?-1:b,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let dt=document.createElement("button");dt.type="button",dt.title="Copy",dt.textContent="C",dt.addEventListener("click",()=>{Wc(w)});let vt=document.createElement("button");vt.type="button",vt.title="Delete",vt.textContent="\xD7",vt.addEventListener("click",()=>{Lb(ot),o()}),O.append(dt,vt),W.append(J,O),g.appendChild(W)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let h=document.createElement("button");h.type="button",h.className="bloom-ih-clear",h.textContent="Clear all",h.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(la([]),et=0,o())}),d.append(f,m,p,h),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Wd=E({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:sa,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",qd),et=qt().length,Qt=!1,Tb()},stop(){lo?.abort(),lo=null,er(),gb(),sl.clear(),clearTimeout(cl),co=!1,fl=null,Qt=!1},onSettingsChange(){let t=qt(),e=Gd(t);e.length!==t.length&&la(e),et>e.length&&(et=e.length)}});var pl="noShareLink",Cb=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Mb=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],gl=M({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Vd(t){return`${t.join(",")}{display:none!important}`}function Yd(){let t=[];if(gl.store.hideShareChat!==!1&&t.push(Vd(Cb)),gl.store.hideShareProject!==!1&&t.push(Vd(Mb)),!t.length){L(pl);return}k(pl,t.join(`
`))}var Xd=E({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:gl,start:Yd,onSettingsChange:Yd,stop(){L(pl)}});var Qd="noDictation",Ab=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Hb=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],tf=M({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Zd(t){return`${t.join(",")}{display:none!important}`}function Jd(){let t=[Zd(Ab)];tf.store.hideDictationSettings!==!1&&t.push(Zd(Hb)),k(Qd,t.join(`
`))}var ef=E({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:tf,start:Jd,onSettingsChange:Jd,stop(){L(Qd)}});var hl="noSidebarIdentity",nr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],of=nr.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),af=nr.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Ib=[...of,...af],Nb=[...of,...nr.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Rb=nr.map(t=>`${t} a[href^="mailto:"]`),Pb=nr.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Ob=nr.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),uo=M({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function nf(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Bb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Db(){return`${Ob.join(",")}{margin-block:auto!important}`}function _b(){return`${Pb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function rf(){let t=uo.store.hideUsername!==!1,e=uo.store.hideEmail!==!1,n=t&&uo.store.enlargePlan!==!1,r=t&&uo.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Bb([...Nb,...af])),o.push(Db())):o.push(nf(Ib))),e&&o.push(nf(Rb)),n&&o.push(_b()),!o.length){L(hl);return}k(hl,o.join(`
`))}var sf=E({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:uo,start:rf,onSettingsChange:rf,stop(){L(hl)}});var lf=`#bloom-rt-host {
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
`;var df=new C("RecentTopics"),ir="bloom-rt-host",ff="home",mf=/^\/c\/([a-z0-9_-]{8,})/i,$b=/\/c\/([a-z0-9_-]{8,})/i,pf=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Fb=new Set(["Backquote","IntlBackslash"]),jb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),zb=140,Gb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),nt=M({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Gb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),ca=null,ua=null,bt=!1,bo=!1,fo=!1,te=0,hn="",rr=null,mo=null,or,bl=null,yl=null;function Ub(){let t=Number(nt.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function po(){let t=nt.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function xl(){let t=nt.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function gf(){let t=nt.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function wl(){let t=nt.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function fa(t){let e=Ub();return t.length>e?t.slice(0,e):t}function ee(t){return t===ff}function go(t,e=zb){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function El(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(mf)?.[1]??""}catch{return t.match($b)?.[1]??""}}function bn(){let t=(location.pathname||"/").match(mf);if(t?.[1])return t[1];let n=Pt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return ff}function Sl(t){if(ee(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(El(r.getAttribute("href")||"")!==t)continue;let o=go(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return bn()===t&&e&&!/^ChatGPT$/i.test(e)?go(e,80):""}function Kb(t){if(ee(t))return"New chat";let e=xl()[t];if(e)return e;let n=zn(t);return n||Sl(t)||"Chat"}function Wb(t){return wl()[t]||""}function Vb(t){return gf()[t]||{}}function Tl(t,e){if(!t||ee(t)||!e||/^new chat$/i.test(e.trim()))return;let n=xl();n[t]!==e&&(n[t]=e,nt.store.titles=n)}function Yb(t){t.type==="conversation-meta"&&(Tl(t.conversationId,t.title),bt&&ar())}function Xb(t,e){if(!t||ee(t)||!e)return;let n=wl();n[t]!==e&&(n[t]=e,nt.store.projects=n)}function Zb(t,e){if(!t||ee(t)||!e.user&&!e.assistant)return;let n=gf(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,nt.store.previews=n)}function Ll(t){if(!t||ee(t)&&nt.store.includeHome===!1)return;let e=po().filter(n=>n!==t);e.unshift(t),nt.store.visits=fa(e)}function ma(){let t=nt.store.includeHome!==!1;return fa(po().filter(n=>t||!ee(n))).map(n=>({id:n,title:Kb(n),project:Wb(n),preview:Vb(n)}))}function cf(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return go(o)}catch{return""}}function ho(t){if(!t||ee(t)||t!==bn())return;let e=Sl(t);e&&Tl(t,e);let n=cf("user"),r=cf("assistant");Zb(t,{user:n,assistant:r});let o=bf(t);if(o){let i=hf(o);i&&Xb(t,i)}}function kl(){let t=xl(),e=wl(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${ir}, #bloom-root, #bloom-sidebar-panel`))continue;let u=El(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=go(c.textContent||"",80);d&&!pf.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=hf(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(nt.store.titles=t),i&&(nt.store.projects=e);let a=po(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(nt.store.visits=fa([...a,...l]))}function hf(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=go((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!pf.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function bf(t){if(ee(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(El(e.getAttribute("href")||"")===t)return e}catch{}return null}function Jb(t){let e=bf(t);if(e){e.click();return}if(ee(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Qb(){let t=bn();hn&&hn!==t&&ho(hn),hn=t,Ll(t),kl();let e=Sl(t);e&&Tl(t,e),ho(t)}function da(){or===void 0&&(or=window.setTimeout(()=>{or=void 0,Qb()},120))}function t0(){rr||(rr=history.pushState.bind(history),mo=history.replaceState.bind(history),history.pushState=function(...e){let n=rr(...e);return da(),n},history.replaceState=function(...e){let n=mo(...e);return da(),n})}function e0(){rr&&(history.pushState=rr),mo&&(history.replaceState=mo),rr=null,mo=null}function n0(t){return Fb.has(t.code)||t.keyCode===192?!0:jb.has(t.key)}function yf(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function r0(t,e){bo=e,kl(),ho(bn()),bt=!0,te=0;try{let n=bn();Ll(n);let r=ma();r.length>1&&(te=t?r.length-1:1)}catch(n){df.error("Failed to open switcher:",n)}ar()}function uf(t){let{length:e}=ma();e&&(te=(te+(t?-1:1)+e)%e,ar())}function Cl(){if(!bt)return;let t=ma()[te];bt=!1,bo=!1,ar(),t&&Jb(t.id)}function vf(){bt&&(bt=!1,bo=!1,ar())}function o0(t){if(yf(t)){fo=!0;return}if((t.ctrlKey||fo)&&!t.altKey&&!t.metaKey&&n0(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{bt?uf(t.shiftKey):r0(t.shiftKey,!0)}catch(n){df.error("Hotkey failed:",n)}return}if(bt){if(t.key==="Escape"){t.preventDefault(),vf();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Cl();return}t.key==="Tab"&&(t.ctrlKey||fo)&&(t.preventDefault(),uf(t.shiftKey))}}function i0(t){yf(t)&&(fo=!1,bt&&bo&&Cl())}function a0(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(da)}function s0(t){!bt||(t.target instanceof Element?t.target:null)?.closest(`#${ir}`)||vf()}function l0(){document.visibilityState==="hidden"&&ho(bn())}function vl(t=ua){t instanceof HTMLElement&&Ni(t,Ii("auto"),!0)}function c0(){if(!document.body)return null;let t=document.getElementById(ir);if(t instanceof HTMLElement)return ua=t,vl(t),t;t=document.createElement("div"),t.id=ir;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ua=t,vl(t),t}function ar(){let t=c0();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!bt){e.dataset.visible="false",e.replaceChildren();return}let n=ma();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}te>=n.length&&(te=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===te?"true":"false",s.setAttribute("aria-selected",a===te?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{te=a,Cl()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function u0(){document.getElementById(ir)?.remove(),ua=null}var xf=E({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${ir}`],settings:nt,start(){k("recentTopics",lf),hn=bn(),Ll(hn),kl(),ho(hn),bl=wt(Yb),t0(),ca=new AbortController;let{signal:t}=ca;window.addEventListener("keydown",o0,{capture:!0,signal:t}),window.addEventListener("keyup",i0,{capture:!0,signal:t}),window.addEventListener("popstate",da,{signal:t}),document.addEventListener("click",a0,{capture:!0,signal:t}),document.addEventListener("click",s0,{signal:t}),document.addEventListener("visibilitychange",l0,{signal:t}),yl=qn("schemeChange",()=>vl())},stop(){ca?.abort(),ca=null,or!==void 0&&(clearTimeout(or),or=void 0),e0(),bl?.(),bl=null,yl?.(),yl=null,bt=!1,bo=!1,fo=!1,u0()},onSettingsChange(){let t=fa(po());t.length!==po().length&&(nt.store.visits=t),bt&&ar()}});var Ml="cleaner",d0=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],f0=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],m0=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],p0=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],g0=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],h0=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],yn=M({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function sr(t){return`${t.join(",")}{display:none!important}`}function wf(){let t=[];if(yn.store.hideDownloadApps!==!1&&t.push(sr(d0)),yn.store.hideDisclaimer!==!1&&t.push(sr(f0)),yn.store.hideUpgrade!==!1&&t.push(sr(m0)),yn.store.hideLockedModels!==!1&&t.push(sr(p0)),yn.store.hideHomePromo!==!1&&t.push(sr(g0)),yn.store.hideAds!==!1&&t.push(sr(h0)),!t.length){L(Ml);return}k(Ml,t.join(`
`))}var Ef=E({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:yn,start:wf,onSettingsChange:wf,stop(){L(Ml)}});var ga=new C("ResponseNotification"),cr=M({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:S0},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Al=!1,pa=null,lr=null,yo=null;function b0(){return document.visibilityState==="hidden"||document.hidden}function y0(){return cr.store.onlyWhenHidden===!1?!0:b0()}function v0(){let t=zn(A());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Sf(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!lr||lr.state==="closed")&&(lr=new t);let e=lr,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){ga.debug("chime failed",t)}}function x0(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){ga.debug("custom sound failed",e),Sf()}}function Tf(){let t=String(cr.store.soundUrl||"").trim();t?x0(t):Sf()}function w0(){let t="Bloom++",e=`${v0()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){ga.debug("notification failed",n)}}function E0(){y0()&&(cr.store.sound!==!1&&Tf(),cr.store.browserNotification!==!1&&w0())}function S0(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Tf()),t.appendChild(e),()=>{e.remove()}}var Lf=E({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:cr,start(){Al=!0,pa?.(),pa=ft(t=>{if(!Al||t.userStopped||t.error)return;let e=A()||Jn();t.conversationId&&t.conversationId!==e||E0()}),yo?.abort(),yo=new AbortController,cr.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:yo.signal}),ga.debug("watch started")},stop(){Al=!1,pa?.(),pa=null,yo?.abort(),yo=null;try{lr?.close()}catch{}lr=null}});var kf=`#bloom-pq-chip {
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
`;var Ue=new C("PromptQueue"),xa="bloom-pq-chip",Cf="promptQueue",L0=8,k0=50,C0=2e3,M0='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',A0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,H0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Hl=M({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),ze=new Map,Mf=0,Ft=!1,$t="",P="",ne=!1,yt=!1,We=!1,B=null,vo=null,ha=null,je,To,Ke=null,R=null,ur=null,ya=!1,ct=null,vn,Ge=!0,K=!1,U=!1,pt=!1;function he(){return ce(Pt())}function dr(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function I0(t){let e=dr(Yt(t));if(e)return e;if(!Vt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),dr(n.innerText||n.textContent||"")}catch{return""}}function Of(){try{let t=document.querySelectorAll(M0),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Bf(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Df(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&A0.test(n))return!0}}catch{}return!1}function va(){let t=Jn();if(!t)return!1;let e=A();return!e||e===t}function So(){if(Y()||va())return!1;let t=Of();if(!t)return!0;if(Bf(t)||Df(t))return!1;try{if(t.querySelector(H0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function N0(){if(G()||dn())return K=!1,!1;if(Y()||va())return K=!0,!0;let t=Of();return t&&(Bf(t)||Df(t))?(K=!0,!0):K&&!So()?!0:(K=!1,!1)}function _f(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Wt);return n instanceof HTMLElement?n:null}function Af(t){return _f(t)??lt()}function wa(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function qf(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function R0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?dr(e.innerText||e.textContent||""):""}catch{return""}}function P0(){return Mf+=1,`pq${Date.now().toString(36)}${Mf.toString(36)}`}function Z(t){return ze.get(t)??[]}function $f(t){return Z(t)[0]}function xn(t,e){e.length?ze.set(t,e):ze.delete(t)}function Ff(t){if(!Z(t).length){U=!1,pt=!1,P="";return}U=!0,pt=!1,K=!0,P=""}function Hf(t){if(!$t||$t===t)return;let e=ze.get($t);!e?.length||ze.has(t)||X($t,t)&&(ze.delete($t),ze.set(t,e),P===$t&&(P=t),B?.key===$t&&(B.key=t),Ue.debug("migrated pending",$t,"\u2192",t))}function Ea(t){let e=he(),n=Z(e);if(Hl.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),xn(e,n)}else if(n.length>=L0){Ue.debug("queue full",e);return}else n.push({id:P0(),text:t,at:Date.now()}),xn(e,n);K=!0,B={key:e,text:t,turns:qf(),ticks:3};let r=lt();r&&ge(r,"");try{ut()}catch(o){Ue.error("chip",o)}Ue.debug("queued",e,n.length,t.length)}function jf(t,e){let n=Z(t).filter(r=>r.id!==e);if(xn(t,n),R===e&&(R=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}ut()}function Rl(){ur?.abort(),ur=null}function O0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function If(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function B0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||R||ct)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;ur?.abort();let c=new AbortController;ur=c;let{signal:u}=c,d=!1,f=!1,m=0,p=0,h=0,g=0,w=null,b=[],v=[],ot=()=>{e.classList.add("bloom-pq-settling");for(let y of b)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},W=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(w?.isConnected?w.before(t):e.append(t)),w?.remove(),w=null,ot(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},J=()=>{ya=!0;let y=H=>{H.preventDefault(),H.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{ya=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=If(b.length,m,p),H=v.length>1?(v[v.length-1].top-v[0].top-v.slice(0,-1).reduce((I,Gt)=>I+Gt.height,0))/(v.length-1):2,gt=new Array(v.length),xt=v[0]?.top??0;for(let I of y)gt[I]=xt,xt+=v[I].height+H;for(let I=0;I<b.length;I++){if(I===m)continue;let Gt=gt[I]-v[I].top;b[I].style.transform=Math.abs(Gt)<.5?"":`translate3d(0,${Math.round(Gt)}px,0)`}},dt=()=>{let y=Z(n).slice();if(m<0||m>=y.length)return;let H=If(y.length,m,p);if(H.every((I,Gt)=>I===Gt))return;let gt=H.map(I=>y[I]).filter(Boolean);if(gt.length!==y.length)return;xn(n,gt);let xt=new Map(b.map(I=>[I.dataset.pqId||"",I]));for(let I of gt){let Gt=xt.get(I.id);Gt&&e.append(Gt)}},vt=y=>{if(f)return;f=!0;let H=d;ur===c&&(ur=null),H&&y&&t.isConnected&&dt(),W(),H&&J(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;W(),y&&J()});let ti=()=>{d=!0,b.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=b.indexOf(t),m<0&&(m=b.findIndex(I=>I.dataset.pqId===r)),p=m<0?0:m;let y=t.getBoundingClientRect();h=y.left,g=y.top;let H=getComputedStyle(t);w=document.createElement("div"),w.className="bloom-pq-gap",w.style.height=`${y.height}px`,t.before(w),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=H.color,t.style.font=H.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let gt=e.getBoundingClientRect(),xt=e.scrollTop;v=b.map(I=>{let ms=(I===t?w:I).getBoundingClientRect(),qc=ms.top-gt.top+xt;return{top:qc,height:ms.height,mid:qc+ms.height/2}})},x=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(ti(),!d||m<0)))return;y.preventDefault(),t.style.left=`${h+(y.clientX-s)}px`,t.style.top=`${g+(y.clientY-l)}px`;let H=e.getBoundingClientRect(),gt=y.clientY-H.top+e.scrollTop,xt=O0(gt,v.map(I=>I.mid));xt!==p&&(p=xt,O())},N=y=>{y.pointerId===a&&vt(!0)};window.addEventListener("pointermove",x,{signal:u}),window.addEventListener("pointerup",N,{signal:u}),window.addEventListener("pointercancel",()=>vt(!1),{signal:u})})}function D0(){yt=!0,clearTimeout(To),To=setTimeout(()=>{yt=!1,To=void 0},C0)}function _0(t){if(ct)return;let e=he(),n=Z(e).find(i=>i.id===t);if(!n)return;let r=lt();if(!r)return;let o=n.text;ct=t,R===t&&(R=null),Rl(),ut(),clearTimeout(vn),vn=setTimeout(()=>{if(vn=void 0,!Ft||ct!==t)return;if(ct=null,he()!==e||!Z(e).some(a=>a.id===t)){ut();return}xn(e,Z(e).filter(a=>a.id!==t)),ut(),D0(),ge(r,o);let i=Oe();i&&!z(i)&&!Vi(i)&&(i.click(),yt=!1),Ff(e)},160)}function xo(t){if(!Ft||ne||U||ct||Y()||he()!==t)return;let e=$f(t);if(!e){P="";return}if(Zt())return;let n=lt();if(!n)return;if(!Pe(n)){let o=dr(Yt(n));if(o&&o!==e.text)return}let r=Oe();!r||z(r)||Vi(r)||(ne=!0,ge(n,e.text),clearTimeout(je),je=setTimeout(()=>q0(t,e.id,e.text),k0))}function q0(t,e,n){je=void 0;try{if(!Ft||U||ct)return;let r=$f(t);if(!r||r.id!==e||r.text!==n||Y()||he()!==t)return;let o=lt();if(!o)return;let i=dr(Yt(o));if(i&&i!==n&&!Pe(o))return;i!==n&&ge(o,n);let a=Oe();if(!a||z(a)||Vi(a))return;a.click(),xn(t,Z(t).filter(s=>s.id!==e)),ut(),Ff(t),Ue.debug("drained",t,Z(t).length)}finally{ne=!1}}function Il(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Dt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Nl(){Rl(),Ke?.remove(),Ke=null,R=null,Ge=!0}var zf="http://www.w3.org/2000/svg";function $0(){let t=document.createElementNS(zf,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function wo(t){let e=$0();for(let n of t){let r=document.createElementNS(zf,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function Eo(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&Gf(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function F0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${xa}`)}function ba(){let t=Ke?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function j0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function Fe(t,e){if(R!==t)return;if(R=null,e===null){ut();return}let n=dr(e),r=he();if(!n){jf(r,t);return}let o=Z(r).find(i=>i.id===t);o&&(o.text=n),ut()}function Nf(t){ct||R!==t&&(R&&Fe(R,ba()),Z(he()).some(e=>e.id===t)&&(R=t,Ge=!0,ut()))}function Gf(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function Rf(t){return R===t?"edit":ct===t?"send":"text"}function z0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function G0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||z0(l)!==Rf(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",Ge?"true":"false"),n.hidden=!Ge;for(let s of e){let l=a.get(s.id);if(Rf(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function ut(){if(Rl(),!Ft||!document.body){Nl();return}let t=he(),e=Z(t);if(!e.length){Nl();return}R&&!e.some(d=>d.id===R)&&(R=null),ct&&!e.some(d=>d.id===ct)&&(ct=null);let n=Ke;if(n?.isConnected||(n=document.createElement("div"),n.id=xa,document.body.appendChild(n),Ke=n),G0(n,e)){Il(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",Ge?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Ge=!Ge,ut()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",Ge||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=R===d.id,p=ct===d.id;m||(f.setAttribute("role","button"),f.tabIndex=p?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),p&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let h=document.createElement("div");h.className="bloom-pq-body";let g;if(m){let b=document.createElement("textarea");b.className="bloom-pq-text bloom-pq-editing",b.value=d.text,b.rows=2,b.spellcheck=!1,b.setAttribute("aria-label","Queued message text"),b.addEventListener("keydown",v=>{v.stopPropagation(),v.key==="Enter"&&!v.shiftKey?(v.preventDefault(),Fe(d.id,b.value)):v.key==="Escape"&&(v.preventDefault(),Fe(d.id,null))}),b.addEventListener("blur",()=>Fe(d.id,b.value)),g=b,u=b}else{let b=document.createElement("span");b.className="bloom-pq-text line-clamp-2",b.textContent=p?"Sending":d.text,p?Gf(b,l,"Sending now"):b.addEventListener("click",v=>{if(ya){ya=!1,v.preventDefault(),v.stopPropagation();return}v.preventDefault(),v.stopPropagation(),Nf(d.id)}),g=b}h.append(g),f.append(h);let w=document.createElement("div");if(w.className="bloom-pq-rail",m){let b=Eo("Save",wo(["M20 6 9 17l-5-5"]),()=>{Fe(d.id,g instanceof HTMLTextAreaElement?g.value:ba())},l),v=Eo("Cancel",wo(["M18 6 6 18","m6 6 12 12"]),()=>{Fe(d.id,null)},l);w.append(b,v)}else{let b=Eo("Remove from queue",wo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{R&&R!==d.id&&Fe(R,ba()),R=R===d.id?null:R,jf(t,d.id)},l,void 0,p),v=Eo("Edit queued message",wo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>Nf(d.id),l,"Edit",p),ot=Eo("Send now",wo(["M12 19V5","M6 11 12 5l6 6"]),()=>{R&&R!==d.id&&Fe(R,ba()),_0(d.id)},l,"Send now (or Enter on empty composer)",p);w.append(b,v,ot)}f.append(w),!m&&!p&&B0(f,c,t,d.id),c.append(f)}if(n.append(o,c),Il(n),u){let d=u,f=R;queueMicrotask(()=>{R===f&&d.isConnected&&j0(d)})}}function U0(){if(!B)return;B.ticks-=1;let t=Z(B.key);if(t.length&&qf()>B.turns){let e=R0();if(e&&e===B.text){Ue.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),xn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,ut();return}}B.ticks<=0&&(B=null)}function Sa(t){return!N0()||!Vt(t)?"":I0(t)}function K0(t){if(!Ft||t.isComposing||t.keyCode===229||t.key!=="Enter"||F0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||ne)return;let e=Af(t.target)??Af(document.activeElement);if(!e)return;if(t.altKey||yt){yt=!1,We=!0,queueMicrotask(()=>{We=!1});return}let n=Sa(e);n&&(wa(t),Ea(n))}function W0(t){if(!Ft||ne||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(We){We=!1;return}if(yt){yt=!1;return}let e=_f(t.target);if(!e)return;let n=Sa(e);n&&(wa(t),Ea(n))}function V0(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||z(e))return null;let n=t.closest(Zn);if(n instanceof HTMLElement&&!z(n))return n;let r=Oe();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Pf(t){if(!Ft)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${xa}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&z(n)||ne||!V0(e))return;if(yt){yt=!1;return}let r=lt();if(!r)return;let o=Sa(r);o&&(wa(t),Ea(o))}function Y0(t){if(!Ft)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Wi)&&!e.querySelector(Wt)||ne)return;if(We){We=!1;return}if(yt){yt=!1;return}let n=lt()??e.querySelector(Wt);if(!n)return;let r=Sa(n);r&&(wa(t),Ea(r))}var Uf=E({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Cf,cleanupSelectors:[`#${xa}`],settings:Hl,start(){Ft=!0;let t=Hl.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),$t=he(),P="",ne=!1,yt=!1,We=!1,B=null,K=!G()&&!dn()&&(Y()||va()),U=!1,pt=!1,R=null,ct=null,clearTimeout(vn),vn=void 0,k(Cf,kf),vo?.abort(),vo=new AbortController;let{signal:e}=vo,n={capture:!0,signal:e};window.addEventListener("keydown",K0,n),document.addEventListener("beforeinput",W0,n),document.addEventListener("pointerdown",Pf,n),document.addEventListener("click",Pf,n),document.addEventListener("submit",Y0,n),ha?.(),ha=ft({onFall(r){if(Ft){if(r.userStopped||r.error){K=!1,U=!1,pt=!1,P="",ut();return}if(!(U&&!pt)){if(U&&pt){if(!So())return;U=!1,pt=!1,K=!1,P=r.contextKey,xo(r.contextKey);return}if(!So()){Ue.debug("unsettled fall; keep queue window");return}K=!1,P=r.contextKey,xo(r.contextKey)}}},onRise(){G()||dn()||(U&&(pt=!0),K=!0)},onContext(r,o){o&&r&&!X(o,r)&&(K=!1,U=!1,pt=!1,P="",ne=!1,je!==void 0&&(clearTimeout(je),je=void 0)),Hf(r),$t=r,ut()},onTick(r){Hf(r.contextKey),$t=r.contextKey,U0(),(G()||dn())&&(U=!1,pt=!1,K=!1,P=""),U&&(Y()||va())&&(pt=!0),U&&pt&&So()&&(U=!1,pt=!1,K=!1,Z(r.contextKey).length&&(P=r.contextKey,xo(r.contextKey))),!U&&K&&So()&&(K=!1,!P&&Z(r.contextKey).length&&(P=r.contextKey,xo(r.contextKey))),!U&&P&&P===r.contextKey&&xo(P),Z(r.contextKey).length&&!Ke?.isConnected?ut():Ke&&Il(Ke)}}),ut(),Ue.debug("watch started")},stop(){Ft=!1,ha?.(),ha=null,vo?.abort(),vo=null,clearTimeout(je),je=void 0,clearTimeout(To),To=void 0,clearTimeout(vn),vn=void 0,ct=null,ze.clear(),B=null,P="",ne=!1,yt=!1,We=!1,K=!1,U=!1,pt=!1,Nl()}});var Kf=`.bloom-cls {
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
`;var Yf=new C("ChatListStatus"),Wf="chatListStatus",ka="bloom-cls",Z0="bloom-cls",J0=1200*1e3,Q0="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",jt=new Map,re=!1,kt="",be=!1,pr=!1,Ct=0,Ve=null,Bl=null,fr=null,Pl=null,Ta=null,Lo=null,mr=!1,Ye=new Set;function La(){return Date.now()}function Xf(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ye(t,e,n,r=!0){if(!(!t||!re)){if(e==="idle")jt.delete(t);else{let o=jt.get(t);o&&o.kind===e&&n!=="net"?o.at=La():jt.set(t,{kind:e,at:La(),source:n})}r&&ty({v:1,id:t,kind:e,at:La()}),wn()}}function ty(t){try{fr?.postMessage(t)}catch{}}function ey(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ye(e.id,e.kind,"bc",!1)}function ny(){let t=La();for(let[e,n]of jt)n.kind==="streaming"&&t-n.at>J0&&jt.delete(e)}function ry(){let t=Xf();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Q0))continue;let o=ue(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Vf(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Ol(t){let e=t.querySelector(`:scope > .${ka}`);return e||null}function Dl(){if(!re)return;ny();let t=A(),e=ry();Ve?.disconnect();try{for(let n of e){let r=ue(n.getAttribute("href")||"");if(!r||!t||r!==t){Ol(n)?.remove();continue}let i=jt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Ol(n)?.remove();continue}let a=Ol(n);a||(a=document.createElement("span"),a.className=ka,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Vf("streaming")):i==="error"&&a.appendChild(Vf("error")))}}catch(n){Yf.debug("paint failed",n)}Zf()}function wn(){if(re){if(document.hidden){Ct&&(cancelAnimationFrame(Ct),Ct=0),Dl();return}Ct||(Ct=requestAnimationFrame(()=>{Ct=0,re&&Dl()}))}}function Zf(){let t=Xf();if(!(Ve&&Bl===t&&t?.isConnected)){if(Ve?.disconnect(),Bl=t,!t){Ve=null;return}Ve=new MutationObserver(()=>wn()),Ve.observe(t,{childList:!0,subtree:!0})}}function Ca(){return!!(an()||oo())}function oy(t){return!!(mr||t&&Ye.has(t)||!pr&&!G()&&Ca())}function iy(t){if(re){if(t.type==="post-start"){pr=!1,t.conversationId?(mr=!1,Ye.add(t.conversationId),be=!0,ye(t.conversationId,"streaming","net")):(mr=!0,be=!0);return}if(t.type==="post-end"){if(mr=!1,t.conversationId){Ye.delete(t.conversationId);let e=A(),n=Jn();(e?t.conversationId===e:t.conversationId===n)?ye(t.conversationId,t.error?"error":"done","net"):ye(t.conversationId,"idle","net")}Ca()||(be=!1)}}}function ay(t,e){if(!re)return;if(X(e,t)){wn();return}let n=A();if(kt&&kt!==n){Ye.delete(kt);let r=jt.get(kt);r&&r.kind!=="idle"&&ye(kt,"idle","local")}mr=!1,be=!1,pr=!0,n&&jt.get(n)?.kind==="streaming"&&jt.get(n)?.source==="local"&&!Ye.has(n)&&ye(n,"idle","local"),wn()}function sy(t){if(!re)return;let e=t.conversationId||A();if(kt&&e&&kt!==e){Ye.delete(kt);let r=jt.get(kt);r&&r.kind!=="idle"&&ye(kt,"idle","local"),be=!!(e&&Ye.has(e))}if(e&&(kt=e),pr||G()){if(G()||Ca()||t.streaming){wn();return}pr=!1}if(oy(e)&&(t.streaming||Ca())){be=!0,e&&ye(e,"streaming","local"),wn();return}be&&(be=!1,e&&ye(e,Zt()?"error":"done","local")),wn()}var Jf=E({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ka}`],start(){re=!0,k(Wf,Kf);try{fr=new BroadcastChannel(Z0)}catch{fr=null}fr?.addEventListener("message",ey),Pl=wt(iy),Ta?.(),Ta=ft({onTick:sy,onContext:ay}),Lo?.abort(),Lo=new AbortController,document.addEventListener("visibilitychange",()=>{re&&(Ct&&(cancelAnimationFrame(Ct),Ct=0),Dl())},{signal:Lo.signal}),Zf(),Yf.debug("sidebar status watch started")},stop(){re=!1,Ct&&cancelAnimationFrame(Ct),Ct=0,Lo?.abort(),Lo=null,Ve?.disconnect(),Ve=null,Bl=null,Ta?.(),Ta=null,Pl?.(),Pl=null;try{fr?.close()}catch{}fr=null,jt.clear(),Ye.clear(),mr=!1,be=!1,pr=!1,kt="",document.querySelectorAll(`.${ka}`).forEach(t=>t.remove()),L(Wf)}});var tm="widerChat",em=40,nm=96,rm=64,om=M({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:em,max:nm,default:rm}});function ly(){return at(Number(om.store.width??rm),em,nm)}function Qf(){let t=ly(),e=`min(100%,${t}rem)`;k(tm,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var im=E({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:om,start:Qf,onSettingsChange:Qf,stop(){L(tm)}});var _l="composerOpacity",gr='form[data-type="unified-composer"],form.w-full[data-type]',cy=[`${gr} [class*="corner-superellipse"]`,`${gr} [class*="bg-token-bg-primary"]`,`${gr} [class*="bg-token-main-surface"]`].join(","),uy=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),dy="#thread-bottom-container,#thread-bottom",fy=`${gr} #prompt-textarea,${gr} [contenteditable="true"]`,my="var(--bg-primary,var(--main-surface-primary,#ffffff))",ql=M({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function py(){return at(Number(ql.store.opacity??100),0,100)}function gy(){return at(Number(ql.store.blur??16),0,40)}function am(){let t=py();if(t>=100){L(_l);return}let e=gy(),n=`color-mix(in srgb,${my} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(_l,`${dy}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${uy}{display:none!important}${gr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${cy}{background-color:${n}!important;background-image:none!important;${r}}${fy}{background-color:transparent!important;background-image:none!important}`)}var sm=E({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:ql,start:am,onSettingsChange:am,stop(){L(_l)}});var lm=`#bloom-bn-host {
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
`;var by=new C("BetterNavigator"),$l="betterNavigator",fm="bloom-bn-host",kn=60,Gl=1e3,cm=2400,yy=80,mm=2.5,vy=.4,ko="\u6B63\u5728\u8F93\u51FA\u2026",Ul="Image",xy="\u2753",wy="\u{1F916}",um=/file_[0-9a-f]+/gi,Ey="File",Sy="Code",Ty=".markdown, .whitespace-pre-wrap",Jl=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Ly="img, picture, video, canvas",ky=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,Cy=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Po=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,My=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Ay=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Hy=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,Iy=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,Ny=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,Ry=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Py=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Oy=2e3,By=40,Dy=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,pm=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),_y=["#prompt-nav-container","[id*='prompt-nav' i]","[data-testid*='prompt-nav' i]","[aria-label='Prompt navigator' i]","[aria-label='Conversation navigator' i]","nav[aria-label*='prompt navigator' i]","nav[aria-label*='conversation navigator' i]"].join(", "),qy=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),$y=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),Fy=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),yr=M({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),zt=new Map,Io=new Map,oe=new Set,Ia=0,Ht=!1,xe=!1,hr=!1,we=null,vr=null,xr=null,Na=null,$=[],Tn="",Ra=0,No=-1,Ro=0,br="",At=0,ve=0,Co,Mo=null,Ma=null,Fl=null,jl=null,En=null,Kl=null,Ao=null,Sn=null,Ee=null,Ho=null,Pa=!1,Wl=0;function wr(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function zl(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function jy(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function zy(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Dy.test(jy(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=zl(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||zl(getComputedStyle(t).getPropertyValue("--thread-content-width"))||zl(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Cn(t){try{return!!t.closest(qy)}catch{return!0}}function dm(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Da(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Ql(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function Gy(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Aa(t,e){if(t){um.lastIndex=0;for(let n of t.matchAll(um))e.add(n[0].toLowerCase())}}function Uy(t){try{let e=new Set,n=s=>{Gy(s)||(Aa(s.getAttribute("src")||"",e),Aa(s.getAttribute("srcset")||"",e),Aa(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Aa(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Da(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function Ky(t,e){let n=Uy(t),r=Io.get(e)??0,o=Math.max(r,n);return o>0&&Io.set(e,o),o>=2?`${Ul} x${o}`:Ul}function F(t){return t.replace(/\s+/g," ").trim()}function gm(t,e){let n=t;for(;n&&n!==e;){if(n.matches($y))return!0;n=n.parentElement}return!1}function Oa(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(gm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(Jl);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return F(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<kn+20;)e.push(F(r.textContent||""));return F(e.join(" "))}function Oo(t){let e=F(t);return e.length<3||e.length>180||Po.test(e)?!1:ky.test(e)?!0:Cy.test(e)}function _a(t){let e=F(t);return e.length<8||e.length>120||/\s/.test(e)||Po.test(e)||Oo(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function Wy(t){let e=[],n=i=>{let a=F(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(F(s[1])),e.push(F(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function Vy(t){try{return Cn(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function tc(t){let e=F(t);return!e||ec(e)||_a(e)?!0:Oo(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function Yy(t){return!t.length||t.length>4||!t.every(e=>tc(e))?!1:t.some(e=>Po.test(F(e))||Oo(e)||_a(e))}function hm(t){try{let e=null,n=0,r=`${Jl}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(Vy(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=Wy(o);if(!i.length||i.length>4||i.join(" ").length>240||!Yy(i))continue;let a=i.some(c=>Po.test(F(c))),s=i.some(c=>Oo(c)||_a(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function Xy(t){return hm(t)?Ey:""}function Zy(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(My.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function Jy(t){try{for(let e of t.querySelectorAll(Ly))if(!Zy(e))return!0}catch{}return!1}function ec(t){let e=F(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||Iy.test(e)||Hy.test(e)?!0:e.length<=24&&(Ny.test(e)||Po.test(e))}function Qy(t){let e=[],n=new Set,r=o=>{try{if(gm(o,t)||o.closest(Jl))return}catch{return}let i=Oa(o);!i||n.has(i)||ec(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>kn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Oa(o).length<24)&&(r(o),e.join(" ").length>kn+20))break}}catch{}return F(e.join(" "))}function tv(t){let e=hm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=F(i.innerText||i.textContent||"");!a||a.length>kn+20||r.has(a)||tc(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return F(n.join(" "))}function ev(t,e){let n=[];try{for(let o of t.querySelectorAll(Ty)){if(Cn(o))continue;let i=Oa(o);if(!(!i||e==="assistant"&&ec(i)||tc(i))&&(n.push(i),n.join(" ").length>kn+20))break}}catch{}let r=F(n.join(" "));if(e==="user"){let o=tv(t);if(o)return o}return r||(e==="assistant"?Qy(t):"")}function bm(t){return t.length>kn?`${t.slice(0,kn).trimEnd()}\u2026`:t}function Vl(t){return Ry.test(t)}function nv(t,e,n,r){let o=ev(t,e);if(o)return bm(o);if(r)return ko;let i=Xy(t);if(i)return i;if(Ql(t))return Ky(t,Da(t));try{if(Jy(t))return Ul;if(t.querySelector("pre, code"))return Sy}catch{}return`Message ${n+1}`}function rv(){if(xe)return!0;let t=A();return!!(t&&oe.has(t)||!hr&&!G()&&Bo())}function Bo(){return!!(an()||oo())}function ov(){Ia=Date.now()}function ym(t){xe=!1,t&&oe.delete(t);let e=A();e&&oe.delete(e)}function iv(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function av(t){if(Ql(t)||!Bo())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Oa(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function nc(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=F(e.textContent||"");if(!(n.length>32)&&Ay.test(n))return!0}}catch{}return!1}function vm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function sv(t,e){try{if(iv(t))return!0;if(!e)return!1;if(av(t)||nc(t))return!0}catch{}return!1}function xm(t){if(!t||Bo())return!1;try{if(nc(t)||vm(t))return!1;if(t.querySelector(Py)||Ql(t))return!0}catch{}return!1}function lv(t){if(Bo()||Ia&&Date.now()-Ia<Oy)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!xm(e.el)||ym()}function cv(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(pm)){if(Cn(r))continue;let i=Da(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(Cn(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function uv(t){let e=[t.getAttribute("data-message-id"),t.getAttribute("data-turn-id"),t.querySelector("[data-message-id]")?.getAttribute("data-message-id"),t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id")],n=[];for(let r of e)r&&!n.includes(r)&&n.push(r);return n}function dv(t){let e=yr.store.showAssistant!==!1,n=e&&rv(),r=cv(t),o=null;if(e)for(let a of r)dm(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Da(a);if(!s)continue;let l=dm(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&nc(a),d=c&&vm(a),f=l==="assistant"&&c&&!xm(a)&&(u||d||n||sv(a,!0)),m=nv(a,l,i.length,f);if(m&&m!==ko){let h=zt.get(s),g=!!h&&(Oo(h)||_a(h));(!h||g||!Vl(m)||Vl(h))&&m!==h&&zt.set(s,m)}let p=f&&m===ko?ko:zt.get(s)||m;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return i}function Ln(t){return F(t).replace(/…+$/g,"").trim().toLowerCase()}function Ha(t,e){if(t.set(e.id,e),e.alias&&t.set(e.alias,e),!!e.el)for(let n of uv(e.el))t.set(n,e)}function fv(t){let e=new Map;for(let n of t)Ha(e,n);return e}function rc(t,e){!t.el&&e.el?.isConnected&&(t.el=e.el),e.text&&(!t.text||Vl(t.text))&&(t.text=e.text,zt.set(t.id,e.text)),e.id&&e.id!==t.id&&!t.alias&&(t.alias=e.id)}function wm(t,e,n,r){let o=Ln(n);if(!o)return;let i=t.filter(s=>s.role===e&&Ln(s.text)===o);if(!i.length)return;let a=i.find(s=>!s.el);return a||(r<0?i[0]:i.reduce((s,l)=>{let c=Math.abs(t.indexOf(l)-r),u=Math.abs(t.indexOf(s)-r);return c<u?l:s}))}function mv(t,e){if(e)return e.text&&e.text!==ko&&zt.set(t.id,e.text),{...e,id:t.id,alias:t.alias||e.alias};let n=zt.get(t.id)||(t.alias?zt.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message",...t.alias?{alias:t.alias}:{}}}function pv(t){let e=[];for(let n of t){let r=e[e.length-1];if(r&&r.role==="user"&&n.role==="user"&&Ln(r.text)&&Ln(r.text)===Ln(n.text)){rc(r,n);continue}e.push(n)}return e}function gv(t,e){let n=yr.store.showAssistant!==!1,r=fv(e),o=new Set,i=[];for(let s of t){if(s.role==="assistant"&&!n)continue;let l=r.get(s.id)||(s.alias?r.get(s.alias):void 0)||e.find(u=>u.role===s.role&&!!u.el&&!o.has(u.el)&&Ln(u.text)===Ln(s.text||"")),c=mv(s,l);c.el&&o.add(c.el),i.push(c)}for(let s=0;s<e.length;s++){let l=e[s];if(!l.el||o.has(l.el))continue;let c=i.length;for(let d=s-1;d>=0;d--){let f=e[d].el;if(!f)continue;let m=i.findIndex(p=>p.el===f);if(m>=0){c=m+1;break}}if(c===i.length)for(let d=s+1;d<e.length;d++){let f=e[d].el;if(!f)continue;let m=i.findIndex(p=>p.el===f);if(m>=0){c=m;break}}let u=wm(i,l.role,l.text,c);if(u){rc(u,l),o.add(l.el);continue}i.splice(c,0,l),o.add(l.el)}let a=-1;for(let s=0;s<i.length;s++)i[s].role==="assistant"&&(a=s);for(let s=0;s<i.length;s++)i[s].live&&s!==a&&(i[s].live=!1);return i}function hv(t){if(Cn(t))return!1;try{if(t.closest("#bloom-bn-host, #bloom-root, #bloom-sidebar-panel, #bloom-plugin-layer"))return!1}catch{return!1}let e=`${t.id} ${t.getAttribute("data-testid")||""} ${t.getAttribute("aria-label")||""}`;return/prompt-nav|promptnav|conversation-nav|prompt navigator|conversation navigator/i.test(e)}var Em=/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,bv=/^(?:go to message(?: \d+)?|message \d+|prompt navigator|conversation navigator|\d+)$/i;function yv(t){let e=["data-turn-id","data-message-id","data-goto-message-id","data-messageid","data-conversation-turn-id","data-scroll-to-id","data-id"];for(let r of e){let o=t.getAttribute(r)||"";if(o)return o}return(t.getAttribute("href")||"").match(Em)?.[0]??""}function vv(t){let e=t.getAttribute("aria-label")||t.getAttribute("title")||t.getAttribute("data-preview")||t.textContent||"";return bm(F(e))}function Sm(t){return!t||t.startsWith("native:")||t.startsWith("anon:")||t.startsWith("mid:")?!1:Em.test(t)?!0:/^[a-zA-Z0-9_-]{8,}$/.test(t)}function xv(t){return!t||bv.test(t.trim())}function wv(){let t=[],e=new Set;try{for(let n of document.querySelectorAll(_y))if(hv(n))for(let r of n.querySelectorAll("button, a, [role='button']")){if(Cn(r))continue;let o=yv(r);if(!Sm(o)||e.has(o))continue;e.add(o);let i=vv(r),a=ic(o);t.push({id:o,el:a?.isConnected?a:null,role:"user",text:i||"Message"})}}catch{}return t}function Ev(t,e){if(!e.length)return t;let n=e.filter(i=>Sm(i.id)&&!xv(i.text));if(!n.length)return t;let r=t.slice(),o=new Map;for(let i of r)Ha(o,i);for(let i=0;i<n.length;i++){let a=n[i],s=r.length;for(let u=i+1;u<n.length;u++){let d=o.get(n[u].id);if(!d)continue;let f=r.indexOf(d);if(f>=0){s=f;break}}let l=o.get(a.id)||wm(r,"user",a.text,s);if(l){rc(l,a),Ha(o,l);continue}let c={id:a.id,el:a.el,role:"user",text:a.text||"Message"};r.splice(s,0,c),Ha(o,c),zt.set(c.id,c.text)}return r}function Sv(){let t=wr();if(!t||t===document.body)return[];let e=dv(t),n=A();n&&me(n);let r=n?jr(n):[],o=r.length?gv(r,e):e,i=pv(Ev(o,wv()));return lv(i),i}function Tm(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function qa(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function oc(t){return t===window?window.innerHeight:t.clientHeight}function Tv(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(Fy)}catch{return!1}}function Lm(){Co!==void 0&&(clearTimeout(Co),Co=void 0),Mo?.classList.remove("bloom-bn-flash"),Mo=null}function km(t){Lm(),t.classList.add("bloom-bn-flash"),Mo=t,Co=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Mo===t&&(Mo=null),Co=void 0},800)}function Ba(t){if(!$.length)return;let e=Math.max(0,Math.min(t,$.length-1));Ra=e,vr?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),xr?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),Na&&(Na.textContent=`${e+1} / ${$.length}`),Lv(e)}function Lv(t){let e=vr,n=e?.children[t];if(!(e instanceof HTMLElement)||!(n instanceof HTMLElement))return;let r=e.getBoundingClientRect(),o=n.getBoundingClientRect();o.top<r.top?e.scrollTop-=r.top-o.top:o.bottom>r.bottom&&(e.scrollTop+=o.bottom-r.bottom)}function Cm(t){if(Pa)return;let e=xr?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function Yl(t){let e=$[t];if(!e)return;let n=e.el?.isConnected?e.el:ic(e.id);if(!n){Mv(t);return}e.el=n,No=t,Ro=Date.now()+Gl,Ba(t),Cm(t);let r=Ee??qa(n),i=Math.abs(n.getBoundingClientRect().top-Tm())>mm*oc(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),yr.store.jumpEffect!=="none"&&km(n)}function ic(t){let e=wr();if(!e||e===document.body||!t)return null;let n=[t],r=A(),i=(r?jr(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"]`)}catch{}if(!s||Cn(s))continue;let l=s.closest(pm);return l instanceof HTMLElement?l:s}return null}function ac(){if(Ee)return Ee;let t=wr();return t?qa(t):window}function kv(t){let e=ac(),n=oc(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function Cv(t,e){let n=ac();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function Mv(t){let e=++Wl,n=$[t];if(!n)return;No=t,Ro=Date.now()+cm+Gl,Ba(t),Cm(t);let r=-1;for(let l=0;l<$.length;l++)$[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+cm,a=0,s=-1;for(;Date.now()<i;){if(e!==Wl||!Ht)return;let l=ic(n.id);if(l){n.el=l,Ro=Date.now()+Gl;let d=Ee??qa(l),m=Math.abs(l.getBoundingClientRect().top-Tm())>mm*oc(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),yr.store.jumpEffect!=="none"&&km(l),Mt();return}let c=ac(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&Cv(o,u))break;kv(o),await new Promise(d=>setTimeout(d,yy))}}function sc(){if(!Ht||!$.length)return;if(Date.now()<Ro&&No>=0){Ba(No);return}let t=window.innerHeight*vy,e=0;for(let n=0;n<$.length;n++){let r=$[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Ba(e)}function Av(t){let e=qa(t);if(Ee===e&&Ho)return;Ho?.(),Ee=e;let n=e===window?document:e,r=()=>{sc(),lc()};n.addEventListener("scroll",r,{passive:!0}),Ho=()=>n.removeEventListener("scroll",r)}function Hv(t){Sn?.disconnect(),Sn=null;let e=Ee instanceof HTMLElement?Ee:null;Sn=new IntersectionObserver(()=>sc(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&Sn.observe(n.el)}function Iv(){if(!document.body)return null;let t=we;if(t?.isConnected)return t;t=document.createElement("div"),t.id=fm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{Pa=!0}),n.addEventListener("pointerleave",()=>{Pa=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),we=t,vr=e,xr=i,Na=o,t}function Mm(){let t=we,e=wr();if(!t||!e||!e.isConnected||$.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=zy(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||By,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function lc(){!Ht||ve||(ve=requestAnimationFrame(()=>{ve=0,Ht&&Mm()}))}function Nv(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Rv(t){let e=vr,n=xr;if(!e||!n)return;e.replaceChildren(),n.replaceChildren();let r=Number.parseFloat(getComputedStyle(we??e).getPropertyValue("--bloom-bn-cap"))||0;e.style.justifyContent=r&&t.length*18+16>r?"flex-start":"center",t.forEach((o,i)=>{let a=document.createElement("button");a.type="button",a.className=Nv(o),a.setAttribute("aria-label",`Go to message ${i+1} of ${t.length}`),a.addEventListener("click",u=>{u.preventDefault(),Yl(i)}),e.appendChild(a);let s=document.createElement("button");s.type="button",s.className=`bloom-bn-item bloom-bn-${o.role}`;let l=document.createElement("span");l.className="bloom-bn-emoji",l.textContent=o.role==="user"?xy:wy;let c=document.createElement("span");c.className="bloom-bn-label",c.textContent=o.text,c.title=o.text,s.append(l,c),s.addEventListener("click",u=>{u.preventDefault(),Yl(i)}),n.appendChild(s)})}function Pv(t){vr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=xr?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Ov(){let t=A();return t===br?!1:(br=t,zt.clear(),Io.clear(),$=[],Tn="",Ra=0,No=-1,Ro=0,xe&&t&&(oe.add(t),xe=!1),t&&me(t),!0)}function Bv(t){let e=yr.store.showAssistant!==!1?"1":"0";return`${br}|${e}|${t.map(n=>n.id).join(",")}`}function Xl(){if(!Ht)return;Ov();let t=Sv(),e=wr();if(!e||t.length<1){$=t,Tn="",we&&(we.hidden=!0),Sn?.disconnect(),Zl();return}Iv();let n=Bv(t);n!==Tn?($=t,Tn=n,Rv(t),Av(e),Hv(t)):($=t,Pv(t)),Mm(),sc(),Zl()}function Mt(){if(Ht){if(document.hidden){At&&(cancelAnimationFrame(At),At=0),Xl();return}At||(At=requestAnimationFrame(()=>{At=0,Ht&&Xl()}))}}function Zl(){let t=wr();if(!(En&&Kl===t&&t?.isConnected)){if(En?.disconnect(),Ao?.disconnect(),Kl=t,!t||t===document.body){En=null;return}En=new MutationObserver(()=>Mt()),En.observe(t,{childList:!0,subtree:!0}),Ao=new ResizeObserver(()=>lc()),Ao.observe(t)}}function Dv(t){if(Ht){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===A())&&Mt();return}if(t.type==="post-start"){ov(),hr=!1,t.conversationId?(xe=!1,oe.add(t.conversationId)):xe=!0,Mt();return}if(t.type==="post-end"){if(xe=!1,t.conversationId)oe.delete(t.conversationId);else{let e=A();e&&oe.delete(e)}Mt()}}}function _v(t){if(!Ht||!$.length||we?.hidden||t.altKey||t.ctrlKey||t.metaKey||Tv(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Ra+1;else if(t.key==="ArrowUp")e=Ra-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=$.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Yl(Math.max(0,Math.min(e,$.length-1)))}function qv(){Wl++,Lm(),Sn?.disconnect(),Sn=null,En?.disconnect(),En=null,Kl=null,Ao?.disconnect(),Ao=null,Ho?.(),Ho=null,Ee=null,Pa=!1,we?.remove(),we=null,vr=null,xr=null,Na=null}var Am=E({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted yet. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:$l,cleanupSelectors:[`#${fm}`],settings:yr,start(){Ht=!0,br=A(),br&&me(br),k($l,lm),Ma=new AbortController;let{signal:t}=Ma;window.addEventListener("keydown",_v,{signal:t}),window.addEventListener("popstate",Mt,{signal:t}),window.visualViewport?.addEventListener("resize",lc,{signal:t}),document.addEventListener("visibilitychange",()=>{Ht&&(At&&(cancelAnimationFrame(At),At=0),ve&&(cancelAnimationFrame(ve),ve=0),Xl())},{signal:t}),jl=wt(Dv),Fl=ft({onTick(){if(G()){Mt();return}hr&&!Bo()&&(hr=!1),Mt()},onFall(e){ym(e.conversationId),Mt()},onContext(e,n){if(!X(n,e)){zt.clear(),Io.clear(),Tn="",xe=!1;let o=A();for(let i of[...oe])i!==o&&oe.delete(i);hr=!0}let r=A();r&&me(r),Mt()}}),Zl(),Mt(),by.debug("navigator started")},stop(){Ht=!1,At&&cancelAnimationFrame(At),At=0,ve&&cancelAnimationFrame(ve),ve=0,Ma?.abort(),Ma=null,Fl?.(),Fl=null,jl?.(),jl=null,oe.clear(),xe=!1,hr=!1,Ia=0,qv(),zt.clear(),Io.clear(),$=[],Tn="",L($l)},onSettingsChange(){Tn="",Mt()}});var Hm=`.bloom-ts {
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
`;function Im(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Nm(t){try{return new Date(t).toISOString()}catch{return""}}var Om=new C("MessageTimestamps"),Rm="messageTimestamps",Fa="bloom-ts",Pm=1500,Fv="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Er=M({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Sr=new Map,Hn=!1,It=0,Xe=null,uc=null,cc=null,$a=null,Do=null,_o=!1,Mn=!1;function Bm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function fc(){let t=Er.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Dm(){let t={...fc()};for(let[n,r]of Sr)t[n]=r;let e=Object.keys(t);if(e.length>Pm){let n=e.slice(e.length-Pm),r={};for(let o of n)r[o]=t[o];Er.store.stamps=r;return}Er.store.stamps=t}var jv=Vc(Dm,500);function _m(t,e){!t||!e||Sr.get(t)===e||(Sr.set(t,e),jv(),An())}function zv(t){return t?Sr.get(t)??fc()[t]??xi(t)??null:null}function Gv(t){Hn&&t.type==="message-time"&&_m(t.messageId,t.createTime)}function Uv(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Kv(){let t=Bm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Fv)||e.push(n)}catch{}return e}function Wv(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function dc(){if(!Hn)return;let t=Er.store.hideOwnMessages===!0,e=Er.store.showDate!==!1,n=Y();Mn&&!G()&&(Mn=!1),Mn&&(n?_o=!1:Mn=!1);let r=Mn?!1:n,o=Kv();Xe?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=Uv(i),c=i.querySelector(`:scope > .${Fa}`);if(t&&l==="user"){c?.remove();return}if(Wv(i)){c?.remove();return}let u=zv(s);if(!u&&s&&(r||_o)&&a>=o.length-2&&(u=Date.now(),_m(s,u)),!u){c?.remove();return}let d=Im(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Fa,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=Nm(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){Om.debug("paint failed",i)}_o=r,qm()}function An(){if(Hn){if(document.hidden){It&&(cancelAnimationFrame(It),It=0),dc();return}It||(It=requestAnimationFrame(()=>{It=0,Hn&&dc()}))}}function qm(){let t=Bm();if(!(Xe&&uc===t&&t?.isConnected)){if(Xe?.disconnect(),uc=t,!t||t===document.body){Xe=null;return}Xe=new MutationObserver(()=>An()),Xe.observe(t,{childList:!0,subtree:!0})}}var $m=E({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Fa}`],settings:Er,start(){Hn=!0,k(Rm,Hm);let t=fc();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Sr.set(e,n);cc=wt(Gv),$a?.(),$a=ft({onTick:An,onFall:An,onContext(e,n){X(n,e)||(Mn=!0,_o=!1),An()}}),Do?.abort(),Do=new AbortController,document.addEventListener("visibilitychange",()=>{Hn&&(It&&(cancelAnimationFrame(It),It=0),dc())},{signal:Do.signal}),qm(),An(),Om.debug("timestamp watch started")},stop(){Hn=!1,It&&cancelAnimationFrame(It),It=0,Do?.abort(),Do=null,Xe?.disconnect(),Xe=null,uc=null,$a?.(),$a=null,cc?.(),cc=null,Mn=!1,_o=!1,Dm(),Sr.clear(),document.querySelectorAll(`.${Fa}`).forEach(t=>t.remove()),L(Rm)},onSettingsChange:An});var mc="streamerMode",Vv="filter:blur(6px)!important;transition:filter .2s ease",Yv="filter:none!important",Tr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Lr=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function Nt(t,e){return t.map(n=>`${n} ${e}`)}var In=M({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function kr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Vv}}${e?`${r}{${Yv}}`:""}`}function Fm(){let t=[];if(In.store.conversations!==!1&&(t.push(kr([...Nt(Lr,'a[href^="/c/"]'),...Nt(Lr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),In.store.projects!==!1&&(t.push(kr([...Nt(Lr,'a[href*="/project"]'),...Nt(Lr,'a[href*="/g/g-p-"]'),...Nt(Lr,'[data-testid="project-name"]'),...Nt(Lr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),In.store.headerTitle!==!1&&t.push(kr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),In.store.accountAvatar!==!1&&t.push(kr([...Nt(Tr,"img"),...Nt(Tr,'[class*="avatar"]'),...Nt(Tr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),In.store.accountName!==!1&&t.push(kr([...Nt(Tr,".min-w-0 > .truncate"),...Nt(Tr,".min-w-0.flex-1 .truncate")],!1)),In.store.accountEmail!==!1&&t.push(kr([...Nt(Tr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){L(mc);return}k(mc,t.join(`
`))}var jm=E({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:In,start:Fm,onSettingsChange:Fm,stop(){L(mc)}});var zm=`.bloom-gc-panel {
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
}`;var Zv=new C("GreetingCustomizer"),Cr="greetingCustomizer",Gm="greetingCustomizerUi",qo=100,gc=30,Jv=120,Qv=1e3,tx=50,ex=40,nx=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),$o=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ka=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function rx(t){return!!t?.closest(nx)}function Vm(t){return!!(rx(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Wo(t){try{for(let e of document.querySelectorAll(t))if(!Vm(e))return e}catch{}return null}function pc(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Wo(e))return e;return t}var Ym=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],rt=M({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:vx},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Ym},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),ie=!1,Hr=!1,Rn=null,za,Fo,Mr,jo,Ga=0,ja=null,Ar=null,zo=null,Go=null,Uo=null,Ua=null;function Te(){let t=location.pathname||"/";return t==="/"||t===""}function Nn(){let t=rt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Ym.slice()}function Ko(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Um(t){rt.store.greetings=t.slice(0,gc)}function Vo(){let t=String(rt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function ox(){return rt.store.order==="random"?"random":"sequential"}function ix(){return at(Number(rt.store.intervalSec??10),1,3600)*1e3}function ax(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function sx(){return!!Wo(Ka)}function Wa(){return!!(Wo(Ka)||Wo($o))}function lx(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=sx()?pc(Ka):Wo($o)?pc($o):pc(Ka),i=e?`${$o}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function cx(t,e){if(t<=0)return 0;if(t===1)return Number(rt.plain.index)!==0&&(rt.store.index=0),Number(rt.plain.lastRandom)!==0&&(rt.store.lastRandom=0),0;let n=Number(rt.plain.index),r=Number(rt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(ox()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return rt.store.index=s,rt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return rt.store.index=i,i}function Se(t){if(!ie)return;if(!Te()){L(Cr);return}let e=Nn().map(Ko).filter(Boolean);if(!e.length){L(Cr);return}let n=cx(e.length,t),r=e[n]??e[0],o=Vo()==="manual"&&e.length>1;k(Cr,lx(ax(r),o)),Ua?.()}function hc(){za!==void 0&&(clearInterval(za),za=void 0)}function bc(){hc(),!(!ie||!Te())&&Vo()==="interval"&&(Nn().filter(Boolean).length<=1||(za=setInterval(()=>Se(!0),ix())))}function yc(){jo!==void 0&&(clearTimeout(jo),jo=void 0),Ga=0}function Km(){if(yc(),!ie||!Te())return;Ga=ex;let t=()=>{if(jo=void 0,!(!ie||!Te())){if(Wa()){Vo()==="refresh"&&!Hr?(Hr=!0,Se(!0)):Se(!1),bc();return}Ga-=1,Ga>0&&(jo=setTimeout(t,tx))}};t()}function vc(){if(Rn===!0){Wa()?Se(!1):Km();return}Rn=!0,Hr=!1,Vo()==="refresh"?(Hr=!0,Se(!0)):Se(!1),bc(),Wa()||Km()}function xc(){Rn=!1,Hr=!1,hc(),yc(),L(Cr)}function Va(){Mr===void 0&&(Mr=window.setTimeout(()=>{Mr=void 0,ie&&(Te()?vc():Rn!==!1&&xc())},Jv))}function ux(){Ar||(Ar=history.pushState.bind(history),zo=history.replaceState.bind(history),Go=function(...e){let n=Ar(...e);return Va(),n},Uo=function(...e){let n=zo(...e);return Va(),n},history.pushState=Go,history.replaceState=Uo)}function dx(){Go&&history.pushState===Go&&Ar&&(history.pushState=Ar),Uo&&history.replaceState===Uo&&zo&&(history.replaceState=zo),Ar=null,zo=null,Go=null,Uo=null}function fx(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Va)}function mx(t){if(!ie||!Te()||Vo()!=="manual"||Nn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest($o);if(!n||Vm(n))return;let r=window.getSelection?.();r&&String(r).trim()||Se(!0)}function px(){Fo===void 0&&(Fo=setInterval(()=>{if(!ie)return;let t=Te();if(t!==(Rn===!0)){t?vc():xc();return}t&&Wa()&&Se(!1)},Qv))}function gx(){Fo!==void 0&&(clearInterval(Fo),Fo=void 0)}function Wm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var hx="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",bx="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function yx(t,e){let n=Ko(t);return n?n.length>qo?`Keep it to ${qo} characters.`:Nn().length+(e?1:0)>gc?`At most ${gc} greetings.`:null:"Enter a greeting."}function vx(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=Nn(),s=Number(rt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=qo,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let g=l.querySelector(".bloom-gc-count");g&&(g.textContent=`${Ko(e).length}/${qo}`);let w=l.querySelector(".bloom-gc-error");w&&(w.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Ko(e).length}/${qo}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let g=document.createElement("button");g.type="button",g.className="bloom-gc-btn",g.textContent="Cancel",g.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(g)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let g=n<0,w=yx(e,g);if(w){r=w,i();return}let b=Ko(e),v=Nn().slice();n>=0&&n<v.length?v[n]=b:v.push(b),Um(v),n=-1,e="",r="",i()}),m.appendChild(p),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let g=document.createElement("p");g.className="bloom-gc-empty",g.textContent="No greetings. The official heading stays.",t.appendChild(g);return}let h=document.createElement("div");h.className="bloom-gc-list",a.forEach((g,w)=>{let b=document.createElement("div");b.className="bloom-gc-item",w===s&&(b.dataset.active="true");let v=document.createElement("button");v.type="button",v.className=`bloom-gc-body${o===w?"":" bloom-gc-clamp"}`,v.textContent=g,v.addEventListener("click",()=>{o=o===w?-1:w,i()});let ot=document.createElement("div");ot.className="bloom-gc-item-actions";let W=Wm("Edit",hx);W.addEventListener("click",()=>{n=w,e=g,r="",i()});let J=Wm("Delete",bx);J.addEventListener("click",()=>{let O=Nn().filter((dt,vt)=>vt!==w);Um(O),n===w?(n=-1,e=""):n>w&&(n-=1),i()}),ot.append(W,J),b.append(v,ot),h.appendChild(b)}),t.appendChild(h)};return Ua=i,i(),()=>{Ua===i&&(Ua=null),t.replaceChildren()}}var Xm=E({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Gm,settings:rt,start(){ie=!0,k(Gm,zm),ux(),ja=new AbortController;let{signal:t}=ja;window.addEventListener("popstate",Va,{signal:t}),document.addEventListener("click",fx,{capture:!0,signal:t}),document.addEventListener("click",mx,{signal:t}),px(),Rn=null,Te()?vc():xc(),Zv.debug("started")},stop(){ie=!1,ja?.abort(),ja=null,Mr!==void 0&&(clearTimeout(Mr),Mr=void 0),hc(),yc(),gx(),dx(),L(Cr),Hr=!1,Rn=null},onSettingsChange(){ie&&(Te()?(Se(!1),bc()):L(Cr))}});function xx(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Ya(t){try{return await createImageBitmap(t)}catch{return null}}async function wx(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Xa(t){if(t.startsWith("data:")){let e=xx(t);if(e){let n=await Ya(e);if(n)return n}return wx(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Ya(await e.blob()):null}catch{return null}}var Ja="data-bloom-csi-slot",Ex="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Sx=/\bsize-(?:[6-9]|10)\b/,Tx=/\b(?:h|w)-(?:[6-9]|10)\b/,Lx=/^(plus|pro|free|team|go|business|enterprise)$/i,kx=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Za(t){return t.getAttribute("class")||""}function Jm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Sx.test(t)?!0:Tx.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Cx(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Qm(e)}function Qm(t){return Lx.test(String(t??"").replace(/\s+/g,""))}function ae(t){return!!t?.closest(Ex)}function Qa(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Yo(t){let e=Za(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Qm(t.textContent||"")}function ts(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Xo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Mx(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function tp(t){if(ae(t)||ts(t)||Xo(t)||Yo(t)||Qa(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function ep(t){return ae(t)||ts(t)||Xo(t)||Yo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Cx(t.textContent||"")}function np(t){return ae(t)||Xo(t)||Qa(t)||Yo(t)?!1:Jm(Za(t))||ep(t)?!0:tp(t)}function Zm(t){return!(ae(t)||Qa(t)||Xo(t)||Yo(t)||ts(t))}function Pn(t,e){let n=ts(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Xo(n)||Qa(n)||Yo(n));)ae(n)||(r=n),n=n.parentElement;return r}function Ax(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||ae(e))continue;if(Mx(Za(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Zm(o))){if(np(o)||Jm(Za(o)))return Pn(o,t)??o;r.push(o)}if(r.length===1)return Pn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Zm(r))return Pn(r,t)??r}}return null}function Hx(t){let e=t.querySelectorAll(kx);for(let n of e)if(np(n))return Pn(n,t)??n;return null}function Ix(t){for(let e of t.querySelectorAll("span, div, p, i"))if(ep(e))return Pn(e,t)??e;return null}function Nx(t){for(let e of t.querySelectorAll("*"))if(tp(e))return Pn(e,t)??e;return null}function rp(t,e){if(ae(t))return null;if(e&&!ae(e)&&t.contains(e)){let n=Pn(e,t);if(n)return n}return Ax(t)??Hx(t)??Ix(t)??Nx(t)}function op(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Ir="data-bloom-csi",es="data-bloom-csi-orig",On=new Set,ip=null;function Ec(t){ip=t}function ap(t){return`url(${JSON.stringify(t)})`}function ns(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Sc(t,e,n){let r=ap(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function sp(t,e=Ja){let n=ap(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function Rx(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Nr(t){t.removeEventListener("error",wc);let e=t.getAttribute(es);t.removeAttribute(Ir),t.removeAttribute(es),e&&t.getAttribute("src")!==e&&(t.src=e)}function wc(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&On.add(n),Nr(e),ip?.()}function lp(t,e){if(!e||On.has(e)){Nr(t);return}Rx(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Ir)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(es)&&t.setAttribute(es,n);t.setAttribute(Ir,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",wc),t.addEventListener("error",wc),n!==e&&(t.src=e)}var cp=`/*
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
`;var up=new C("CustomSidebarIdentity"),dp="customSidebarIdentityUi",pp="customSidebarIdentity",Ox="bloom-csi-face",Bx="bloom-csi-name",Rr=Ja,Dx=1024,rs=256,gp=24,hp=64,bp=40,Cc=1,Mc=4,Zo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Tc=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=M({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:ew},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:gp,max:hp,default:bp},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Dn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function _x(){return String(T.store.displayName??"").trim()}function as(t,e,n,r,o){let i=at(n,Cc,Mc),a=Math.min(t,e)/i,s=at(r,a/2,Math.max(a/2,t-a/2)),l=at(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function qx(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Ac(t){let e=Math.min(1,Dx/Math.max(t.width,t.height));return qx(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function $x(t,e,n,r){let{side:o,x:i,y:a}=as(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=rs,s.height=rs;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,rs,rs);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Fx(t){let e=await Ya(t);if(!e)return null;let n=Ac(e);return e.close(),n}async function Ic(t,e,n,r){let o=await Xa(t);if(!o)return null;let i=$x(o,e,n,r);return o.close(),i}function Nc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function fp(){T.store.avatarUrl="",T.store.avatarSource="",Nc()}var mp=0;async function Hc(t){let e=++mp;Nc(),T.store.avatarSource=t;let n=await Ic(t,.5,.5,1);return e!==mp?!1:(n&&(T.store.avatarUrl=n),!!n)}function Jo(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Lc(t){let e=Jo(t);if(!e)return!1;let n=await Fx(e);return n?Hc(n):!1}var Rt=!1,Pr=!1,Or=0,ss=0,os=null,Ze=new Map,Br=null,Le=null,ls=null,se=null,cs=null;function us(t){let e=String(t??"").trim();if(!e||On.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function yp(){return us(T.store.avatarUrl)??us(T.store.avatarSource)}var is=!1,kc=new Set;function vp(){let t=us(T.store.avatarSource);if(!t?.startsWith("data:image/")||us(T.store.avatarUrl)?.startsWith("data:image/")||is||kc.has(t))return;is=!0;let e=Dn(T.store.cropX,.5),n=Dn(T.store.cropY,.5),r=Dn(T.store.cropZoom,1);Ic(t,e,n,r).then(o=>{if(is=!1,!o){kc.add(t);return}Rt&&(T.store.avatarUrl=o,ds())}).catch(()=>{is=!1,kc.add(t)})}function Bn(t,e){return t.map(n=>`${n} ${e}`)}function jx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function zx(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=jx(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function xp(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||ae(n)||n.closest(".min-w-0")||e.push(n);return e}function Gx(t){let e=xp(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Rc(){let t=[],e=en();e&&t.push(e);let n=Wn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Zo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function wp(t,e){let n=Gx(t);if(n)lp(n,e);else for(let o of xp(t))Nr(o);let r=rp(t,n);for(let o of t.querySelectorAll(`[${Rr}]`))o!==r&&o.removeAttribute(Rr);r&&r.setAttribute(Rr,"")}function Ux(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Kx(t,e){let n=Ux(t);n&&wp(n,e)}function Wx(){for(let t of document.querySelectorAll(`img[${Ir}]`))Nr(t);for(let t of document.querySelectorAll(`[${Rr}]`))t.removeAttribute(Rr)}function Vx(){let t=at(Math.round(Dn(T.store.avatarSize,bp)),gp,hp),e=yp(),n=_x(),r=T.store.applyToMenu!==!1,o=[],i=[...Bn(Zo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Bn(Tc,"> :first-child img"));let a=[...Bn(Zo,".min-w-0 > .truncate"),...Bn(Zo,".min-w-0.flex-1 .truncate")];r&&a.push(...Bn(Tc,"> :first-child .truncate"));let s=op(Rr);o.push(ns([...s.flatMap(l=>Bn(Zo,l))].join(","),t)),o.push(ns(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(ns(s.flatMap(l=>Bn(Tc,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Sc(i.join(","),e,t)),o.push(Sc("#stage-sidebar-tiny-bar img",e,32)),o.push(sp(e))),n&&o.push(zx(a,n)),k(pp,o.join(""))}function Yx(){let t=yp(),e=Rc();for(let n of e)wp(n,t);if(T.store.applyToMenu!==!1){let n=Vn();n&&Kx(n,t)}for(let n of document.querySelectorAll(`img[${Ir}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Nr(n)}function ds(){if(!(!Rt||Pr)){Pr=!0;for(let t of Ze.values())t.disconnect();Le?.disconnect(),se?.disconnect();try{Vx(),Yx()}finally{Pr=!1,Pc(),Qx(),Br?.isConnected&&Ep(Br),vp()}}}function Qo(){!Rt||Or||(Or=requestAnimationFrame(()=>{Or=0,ds()}))}function Xx(){Pr||!Rt||Qo()}function Zx(t){if(Ze.has(t))return;let e=new MutationObserver(Xx);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ze.set(t,e)}function Jx(t){Ze.get(t)?.disconnect(),Ze.delete(t)}function Pc(){let t=new Set;for(let n of Rc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Wn();e&&t.add(e);for(let n of[...Ze.keys()])(!t.has(n)||!n.isConnected)&&Jx(n);for(let n of t)n.isConnected&&Zx(n)}function Qx(){let t=Ai();if(!t){se?.disconnect(),se=null,ls=null;return}if(ls===t&&se){se.observe(t,{childList:!0});return}se?.disconnect(),ls=t,se=new MutationObserver(()=>{Pr||!Rt||(Pc(),Qo())}),se.observe(t,{childList:!0})}function Ep(t){Br===t&&Le||(Le?.disconnect(),Br=t,Le=new MutationObserver(()=>{if(!t.isConnected){Le?.disconnect(),Le=null,Br=null;return}Pr||!Rt||Qo()}),Le.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Sp(t){if(!Rt||T.store.applyToMenu===!1)return;let e=Vn();if(e){Ep(e),Qo();return}t<=0||requestAnimationFrame(()=>Sp(t-1))}function Tp(t){Rt&&(ds(),!(Rc().length||t<=0)&&(ss=requestAnimationFrame(()=>Tp(t-1))))}function tw(t){Rt&&T.store.applyToMenu!==!1&&(!Hi(t)&&!Vn()||Sp(10))}function ew(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,m.appendChild(p);let h=document.createElement("div");h.className="bloom-csi-zoom-row";let g=document.createElement("input");g.type="range",g.className="bloom-csi-zoom",g.min=String(Cc),g.max=String(Mc),g.step="0.05",g.setAttribute("aria-label","Zoom");let w=document.createElement("span");w.className="bloom-csi-zoom-val";let b=document.createElement("button");b.type="button",b.className="bloom-csi-btn",b.textContent="Reset",h.append(g,w,b);let v=document.createElement("p");v.className="bloom-csi-hint",v.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,h,v),t.append(u,d,f);function ot(){let x=String(T.store.avatarSource??""),N=String(T.store.avatarUrl??"");return x.startsWith("data:image/")?x:N.startsWith("data:image/")?N:""}function W(x,N,y){if(!a)return i.x=x,i.y=N,i.zoom=at(y,Cc,Mc),i;let H=as(a.w,a.h,y,x*a.w,N*a.h);return i.x=H.x/a.w,i.y=H.y/a.h,i.zoom=H.z,i}function J(){g.value=String(i.zoom),w.textContent=`${Math.round(i.zoom*100)}%`;let x=a?as(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;x&&a&&(p.style.width=`${a.w/x.side*100}%`,p.style.height=`${a.h/x.side*100}%`,p.style.left=`${(.5-x.x/x.side)*100}%`,p.style.top=`${(.5-x.y/x.side)*100}%`)}function O(x=!1){let N=ot(),y=String(T.store.avatarUrl??"").trim(),H=!!N;s.hidden=!y&&!N,(N||y)&&(s.src=N||y),document.activeElement!==l&&(l.value=H?"":y),l.placeholder=H?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!N,d.hidden=!(e&&/^https?:\/\//.test(y)&&!N),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",N&&(x&&(i.x=Dn(T.store.cropX,.5),i.y=Dn(T.store.cropY,.5),i.zoom=Dn(T.store.cropZoom,1)),p.getAttribute("src")!==N&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},W(i.x,i.y,i.zoom),J()},p.src=N),J())}function dt(x,N,y,H=!1){W(x,N,y),J();let gt=ot(),xt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,gt&&Ic(gt,i.x,i.y,i.zoom).then(I=>{I&&(T.store.avatarUrl=I)})};r&&clearTimeout(r),H?xt():r=setTimeout(xt,80)}function vt(x){T.store.avatarUrl=x;let N=x.trim();if(n&&clearTimeout(n),!N){T.store.avatarSource="",Nc(),e=!1,O(!0);return}if(N.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Xa(N).then(y=>{if(!y)return;let H=Ac(y);y.close(),H&&Hc(H).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(N)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{Xa(N).then(y=>{if(!y){e=!0,O(!0);return}let H=Ac(y);y.close(),H?(e=!1,Hc(H).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",x=>{Jo(x.clipboardData)&&(x.preventDefault(),e=!1,Lc(x.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",x=>{Jo(x.dataTransfer)&&x.preventDefault()}),u.addEventListener("drop",x=>{Jo(x.dataTransfer)&&(x.preventDefault(),e=!1,Lc(x.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>vt(l.value)),l.addEventListener("paste",x=>{Jo(x.clipboardData)&&(x.preventDefault(),e=!1,Lc(x.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",x=>{ot()&&!l.value&&(x.key==="Backspace"||x.key==="Delete")&&(fp(),e=!1,O(!0))}),c.addEventListener("click",()=>{fp(),e=!1,O(!0)}),m.addEventListener("pointerdown",x=>{x.button===0&&(m.setPointerCapture(x.pointerId),o.on=!0,o.px=x.clientX,o.py=x.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",x=>{if(!o.on||!a)return;let N=m.clientWidth;if(!N)return;let{side:y}=as(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);W(o.x-(x.clientX-o.px)*(y/N)/a.w,o.y-(x.clientY-o.py)*(y/N)/a.h,i.zoom),J()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,dt(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",x=>{x.preventDefault(),dt(i.x,i.y,i.zoom*(x.deltaY<0?1.08:1/1.08))},{passive:!1}),g.addEventListener("input",()=>dt(i.x,i.y,Number(g.value))),g.addEventListener("change",()=>dt(i.x,i.y,Number(g.value),!0)),b.addEventListener("click",()=>dt(.5,.5,1,!0));let ti=()=>O(!1);return cs=ti,O(!0),()=>{cs===ti&&(cs=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Lp=E({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:dp,cleanupSelectors:[`.${Ox}`,`.${Bx}`],settings:T,start(){Rt=!0,On.clear(),Ec(Qo),k(dp,cp),os=new AbortController,document.addEventListener("click",tw,{signal:os.signal}),Tp(40),vp(),up.debug("started")},onSettingsChange(){On.clear(),cs?.(),Rt&&(Pc(),ds())},stop(){Rt=!1,os?.abort(),os=null,Or&&cancelAnimationFrame(Or),Or=0,ss&&cancelAnimationFrame(ss),ss=0;for(let t of Ze.values())t.disconnect();Ze.clear(),Le?.disconnect(),Le=null,Br=null,se?.disconnect(),se=null,ls=null,Wx(),L(pp),Ec(null),On.clear(),up.debug("stopped")}});var Dr=new C("Bloom"),kp=!1,nw=Date.now(),rw=[ed,_d,Wd,Xd,ef,sf,xf,Ef,Lf,Uf,Jf,im,sm,Am,$m,jm,Xm,Lp];function fs(t){return new Promise(e=>setTimeout(e,t))}function ow(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function iw(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Mp=8e3,Cp=300,aw=250;async function sw(){if(tn())return await fs(Cp),!0;for(;Date.now()-nw<Mp;)if(await fs(aw),tn())return await fs(Cp),!0;return tn()||Ns()}function Oc(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function lw(){if(Oc())return!0;let t=Date.now()+Mp;for(;Date.now()<t;)if(await fs(100),Oc())return!0;return Oc()}function cw(){try{GM_registerMenuCommand?.("Bloom++ settings",td)}catch{}}function uw(){Ei(()=>{qr("HostShell"),Dr.info("host shell",Et)}),Si(()=>{Dr.info("idle ready",Et)}),Ti(()=>{gs(),qr("HostReady"),Dr.info("chrome ready",Et)})}async function Bc(){await Zc()}async function Dc(){if(kp)return;kp=!0,ku();let t=A();t&&me(t);for(let r of rw)try{ou(r),Pu(r)}catch(o){Dr.error("register failed",r.name,o)}qr("Init"),cw(),uw();let e=()=>qr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await ow(),gs(),Dr.info("styles ready",Et),await iw(),lw().then(r=>{r&&Li()}),!await sw()){Dr.warn("late islands not detected; starting default plugins",Et),Gn(),ki();return}await Nu()}var Ap=typeof unsafeWindow<"u"?unsafeWindow:window,dw=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||dw){let t=Ap.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Et);try{Object.defineProperty(Ap,"Bloom",{value:_c,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Bc().then(()=>Dc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
