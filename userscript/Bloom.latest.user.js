// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.102
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
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update2.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update2.user.js
// ==/UserScript==

/* Bloom++ [20260924] v1.4.102. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Mp=Object.defineProperty;var Ap=(t,e)=>{for(var n in e)Mp(t,n,{get:e[n],enumerable:!0})};var Oc={};Ap(Oc,{REPO_URL:()=>Hu,Settings:()=>F,VERSION:()=>Et,contextKeyFromUrl:()=>ce,conversationChain:()=>$r,conversationTitle:()=>zn,conversationToken:()=>Pt,currentConversationId:()=>A,ensureConversationChain:()=>me,hasDraftText:()=>Vt,hasErrorToast:()=>Zt,hasLateIslands:()=>tn,init:()=>Pc,initSettings:()=>Rc,isDocumentInteractive:()=>Nu,isStreaming:()=>Y,isUserDraftEmpty:()=>Re,messageCreateTime:()=>vi,plugins:()=>le,requestChromeReady:()=>Li,requestIdleReady:()=>jn,requestShellReady:()=>Ti,setEditorText:()=>ge,subscribeHarvest:()=>wt,watchStreamingEdge:()=>ft,whenChromeReady:()=>Si,whenIdleReady:()=>Ei,whenShellReady:()=>wi});var Le=new Map,ti=!1;function Hp(){return document.getElementById("bloom-root")?.shadowRoot??null}function Dc(){return document.head??null}function Dn(){let t=Hp();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Ip()}function fs(t,e){if(!ti)return;let n=Dc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Dn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Dn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Dn()}function k(t,e){let n=Le.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Le.set(t,n)),ti&&fs(t,n)}function ms(){if(!Dc())return!1;ti=!0;for(let[e,n]of Le)fs(e,n);return Dn(),!0}function _c(t){let e=Le.get(t);e&&(e.disabled=!1,ti&&fs(t,e))}function qc(t){let e=Le.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Dn())}function L(t){let e=Le.get(t);e&&(e.el?.remove(),Le.delete(t),Dn())}function Ip(){return Array.from(Le.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var C=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function E(t){return t}var ps=new Map;function _n(t,e){let n=ps.get(t);return n||(n=new Set,ps.set(t,n)),n.add(e),()=>n.delete(e)}function Je(t,e){let n=ps.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Np="bloompp";function $c(){return new Promise((t,e)=>{let n=indexedDB.open(Np,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Fc(t){try{let e=await $c();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function zc(t,e){try{let n=await $c();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function it(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function at(t,e,n){return Math.min(n,Math.max(e,t))}function jc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Gc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Uc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var ei=new C("SettingsStore"),ke="BloomSettings",Rp=100;function ni(t){return t!=null&&typeof t.then=="function"}function Pp(t){if(t==null||ni(t))return null;if(it(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(it(e)&&!ni(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return it(n)&&!ni(n)?n:null}return null}catch{return null}}function oi(t){let e=Pp(t);if(!e)return null;let n=e.plugins;return!it(n)||ni(n)||Object.keys(n).length===0?null:e}function hs(t){return it(t)?t:null}function gs(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:it(t)?Object.keys(t).length===0:!1}function Op(t){return gs(t)?0:Array.isArray(t)?12+Math.min(t.length,40):it(t)?12+Math.min(Object.keys(t).length,40):3}function Qe(t){if(!t)return-1;let e=t.plugins;if(!it(e))return-1;let n=0;for(let r of Object.values(e)){let o=hs(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=Op(a))}return n}function Kc(t){let e=t.plugins;if(!it(e))return 0;let n=0;for(let r of Object.values(e))hs(r)?.enabled===!0&&n++;return n}function Wc(t){let e=t.map((i,a)=>({bag:i,index:a,score:Qe(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=Kc(a.bag)-Kc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!it(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(it(a))for(let[s,l]of Object.entries(a)){let c=hs(l);if(!c)continue;if(!it(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}gs(u[d])&&!gs(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return it(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Qe(n)}}var ri=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return it(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){ei.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Rp))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ke,this.plain)}catch{try{GM_setValue(ke,e)}catch(n){ei.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(ke,e)}catch{}zc(ke,e).catch(n=>ei.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){ei.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){jc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Bp=new C("Settings"),Dp={plugins:{}},F=new ri(structuredClone(Dp)),_p=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function qp(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function M(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?Ce(n):{}},get plain(){let n=e.pluginName;return n?F.plain.plugins[n]??{}:{}}};return e}async function $p(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Vc(){let t=oi(await $p(ke)),e=oi(await Fc(ke)),n=null;try{n=oi(localStorage.getItem(ke))}catch{n=null}let r=Wc([t,e,n]);if(r){let o=r.bag.plugins;o&&(F.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);Bp.info("Loaded settings from",i,"richness",r.score,"gm",Qe(t),"idb",Qe(e),"ls",Qe(n))}F.releasePersist(),r&&(r.index!==0||r.score>Qe(t))&&F.persistLoadedBag()}function Ce(t){return F.plain.plugins[t]||(F.plain.plugins[t]={}),F.store.plugins[t]}function Yc(t,e){e&&(e.pluginName=t,Ce(t),F.setDefaultGetter(_p(t),n=>{if(n!=="enabled")return qp(e.def,n)}))}function Xc(){return Ce("Settings")}function ii(){return Xc().pinnedPlugins??[]}function Zc(t){return ii().includes(t)}function Jc(t){let e=ii(),n=e.includes(t);return F.store.plugins.Settings={...F.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function ai(){return Xc().starredPlugins??[]}function Qc(t){return ai().includes(t)}function tu(t){let e=ai(),n=e.includes(t);return F.store.plugins.Settings={...F.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var si=new C("PluginManager"),le={},Br=new Set;function eu(t){if(le[t.name]){si.warn("Duplicate plugin",t.name);return}le[t.name]=t,Yc(t.name,t.settings)}function qn(t){let e=le[t];if(!e)return!1;if(e.required)return!0;let n=F.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function nu(t){let e=le[t];if(!e||e.required)return;let n=!qn(t);Ce(t),F.store.plugins[t].enabled=n,n?ru(e):Fp(e),Je("pluginToggle",{name:t,enabled:n})}function ru(t,e=!1){if(!Br.has(t.name)&&qn(t.name))try{t.managedStyle&&_c(t.managedStyle),t.start?.(),Br.add(t.name),t.settings&&F.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Br.has(t.name)&&t.onSettingsChange?.()}),e||si.debug("Started",t.name)}catch(n){si.error("Failed to start",t.name,n)}}function Fp(t){if(Br.has(t.name)){try{t.stop?.()}catch(e){si.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(qc(t.managedStyle),L(t.managedStyle)),Br.delete(t.name)}}function Dr(t){for(let e of Object.values(le))(e.startAt??"DOMContentLoaded")===t&&ru(e)}var ou=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Pt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function ce(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ue(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(ou)?.[1]??""}catch{return t.match(ou)?.[1]??""}}function A(){return ue(location.pathname)}var au=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i;function ui(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function ys(t,e){return e!=="GET"||ui(t)?!1:au.test(t)}function di(t){return t.match(au)?.[1]??""}function fi(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return fi(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function st(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function mi(t){let e=st(t);return e?!e.mapping&&st(e.conversation)?e.conversation:e:null}function zp(t){let e=t.match(/[?&]num_turns=(\d+)/i);if(!e)return 0;let n=Number(e[1]);return Number.isFinite(n)&&n>0?n:0}function iu(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function bs(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=iu(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?iu(n.text):""}function ci(t){let e=st(t.metadata);if(e?.is_visually_hidden_from_conversation===!0||e?.is_user_system_message===!0||e?.user_context_message===!0)return"";let r=st(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function jp(t){return(st(t.author)?.role??t.role)==="user"}function Gp(t){let e=typeof t.recipient=="string"?t.recipient.toLowerCase():"";if(e&&e!=="all"||(st(t.author)?.role??t.role)==="tool")return!0;let o=st(t.content),i=(typeof o?.content_type=="string"?o.content_type:"").toLowerCase();if(/thought|reasoning/.test(i)||i==="code"||i==="execution_output"||/^(?:tether_|computer_)/.test(i))return!0;let a=typeof t.channel=="string"?t.channel.toLowerCase():"";return!!(/^(?:commentary|thought|thoughts|reasoning|analysis)$/.test(a)&&t.end_turn!==!0)}function su(t){return!!ci(t)&&!Gp(t)}function lu(t){let e=[];for(let n of t){let r=e[e.length-1];if(r&&r.role==="assistant"&&n.role==="assistant"){let o=n.alias||r.alias||(r.id!==n.id?r.id:void 0),i=n.at??r.at;e[e.length-1]={id:n.id,role:"assistant",text:n.text||r.text,...o&&o!==n.id?{alias:o}:{},...i?{at:i}:{}};continue}e.push(n)}return e}function Up(t,e){let n=xs(t,e);if(!n)return!0;let r=new Set,o=n,i=null;for(;o&&e[o]&&!r.has(o);){r.add(o);let a=st(e[o]);i=a&&typeof a.parent=="string"?a.parent:null,o=i}return!!(i&&!e[i])}function cu(t){let e=mi(t);if(!e)return!1;let n=st(t);for(let a of[e,n])if(a&&(a.has_more===!0||a.has_more_before===!0||a.truncated===!0))return!0;let r=st(e.mapping);if(r&&Object.keys(r).length)return Up(e,r);let o=Array.isArray(e.turns)?e.turns:Array.isArray(e.messages)?e.messages:Array.isArray(e.items)?e.items:[],i=Number(e.num_turns??e.turn_count??e.total_turns??e.total);return Number.isFinite(i)&&i>o.length&&o.length>0}function pi(t){let e=mi(t);if(!e)return"";let n=st(e.mapping);if(n&&Object.keys(n).length){let o=xs(e,n),i=new Set,a=o,s=o;for(;a&&n[a]&&!i.has(a);){i.add(a),s=a;let l=st(n[a]),c=l&&typeof l.parent=="string"?l.parent:"";if(c&&!n[c])break;a=c||null}return s}let r=_r(t);return r[0]?.alias||r[0]?.id||""}function vs(t,e=""){if(cu(t))return!1;let n=_r(t);if(!n.length)return!1;let r=zp(e);return!(r&&n.length>=r)}function xs(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?fi(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function Kp(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null;if(l&&su(l)){let c=ci(l),u=typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:bs(l)};u!==o&&(d.alias=o);let f=fi(l.create_time??l.createTime);f&&(d.at=f),n.push(d)}}else l&&jp(l)&&n.push({id:"",role:"user",text:""});o=typeof s.parent=="string"?s.parent:null}return n.reverse(),lu(n).filter(a=>a.id)}function li(t){return t.length<=480?t:t.slice(t.length-480)}function ws(t,e){if(!e.length)return t;if(!t.length)return li(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(W=>W.id)),m=n.has(e[e.length-1].id),g=e.filter(W=>!f.has(W.id)),h=e[e.length-1].at,p=e[0].at,w=t[0].at,b=t[t.length-1].at,v=m||!!h&&!!w&&h<=w,ot=!!p&&!!b&&p>=b;return li(v&&!ot?[...g,...t]:[...t,...g])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return li([...s,...l,...u,...d])}function Wp(t){let e=[],n=new Set;for(let r of t){let o=st(r);if(!o)continue;let i=st(o.message)??o;if(!su(i))continue;let a=ci(i)||ci(o);if(!a)continue;let s=typeof i.id=="string"&&i.id||typeof o.message_id=="string"&&o.message_id||typeof o.id=="string"&&o.id||"";if(!s||n.has(s))continue;n.add(s);let l={id:s,role:a,text:bs(i)||bs(o)},c=typeof o.id=="string"&&o.id&&o.id!==s?o.id:"";c&&(l.alias=c);let u=fi(i.create_time??i.createTime??o.create_time??o.createTime);u&&(l.at=u),e.push(l)}return lu(e)}function Vp(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=xs(t,n);return r?Kp(n,r):[]}function _r(t){let e=mi(t);if(!e)return[];let n=Vp(e);if(n.length)return n;let r=Array.isArray(e.turns)?e.turns:Array.isArray(e.messages)?e.messages:Array.isArray(e.items)?e.items:[];return r.length?Wp(r):[]}function uu(t,e=""){let n=st(t);if(!n)return e;let r=mi(t)??n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function du(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var Ts=new C("Harvest"),Yp=1500,Xp=200,Zp=8,gi=new Set,hi=new Map,bi=new Map,de=new Map,fu=[],Me=new Set,Es=new Set,mu=new Map,yu={Accept:"application/json"},Jp=/^(authorization|oai-|openai-|chatgpt-|x-authorization)/i,Qp=16,tg=1e4,$n=null,yi=null,qr=null,Ot=0,vu=!1;function xu(){return typeof unsafeWindow<"u"?unsafeWindow:window}function eg(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function ng(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var rg=/"action"\s*:\s*"(next|continue|variant)"/i;function og(t,e,n){return!(e!=="POST"||ui(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!rg.test(n))}function wu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function ig(t){return typeof t=="string"?wu(t):""}function Ss(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ss(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Ls(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function pu(t,e,n){!t||!e||bi.get(t)!==e&&(bi.set(t,e),Ls(bi,Yp),fe({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function ag(t,e){let n=e.trim();!t||!n||hi.get(t)!==n&&(hi.set(t,n),Ls(hi,Xp),fe({type:"conversation-meta",conversationId:t,title:n}))}function Eu(t,e,n=""){let r=uu(e,t);if(!r)return;let o=_r(e);if(!o.length)return;let i=de.get(r)??[],a=ws(i,o);vs(e,n)&&Me.add(r),!du(i,a)&&(de.set(r,a),Ls(de,Zp),fe({type:"conversation-chain",conversationId:r}))}function Fn(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Fn(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&ag(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ss(l.create_time??l.createTime??l.created_at);c&&u&&pu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ss(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&pu(a,s,o),r.mapping&&typeof r.mapping=="object")Fn(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Fn(l,o,n+1)}function gu(t,e){if(t)try{Fn(JSON.parse(t),e)}catch{}}function fe(t){for(let e of Array.from(gi))try{e(t)}catch{}}function sg(t,e){let n=e?.headers??(typeof Request<"u"&&t instanceof Request?t.headers:null);if(!n)return;let r=n instanceof Headers?n.entries():Array.isArray(n)?n:Object.entries(n);for(let[o,i]of r)typeof i=="string"&&Jp.test(o)&&(yu[o]=i)}async function lg(t,e,n,r){if(n===Ot)try{let o=await t.json();if(n!==Ot)return;Fn(o,e),Eu(e,o,r)}catch{}}async function cg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Ot&&fe({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Ot;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=wu(c);m&&(o=m,fe({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let g=m.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||gu(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Ot&&gu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Ot&&fe({type:"post-end",conversationId:o,error:i})}function ug(t,e,n){let r=eg(e),o=ng(e,n),i=ys(r,o),a=og(r,o,n?.body),s=Ot,l="";return a&&(l=ig(n?.body)||di(r)||ue(r)||A(),fe({type:"post-start",conversationId:l,url:r})),i&&sg(e,n),t(e,n).then(c=>{if(s!==Ot||!i&&!a)return c;try{let u=c.clone();i?lg(u,di(r)||A(),s,r):cg(u,l,!c.ok,s)}catch{a&&fe({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Ot&&fe({type:"post-end",conversationId:l,error:!0}),c})}function ks(){if($n)return;let t=xu();qr=t,$n=t.fetch.bind(t);let e=(n,r)=>ug($n,n,r);yi=e,t.fetch=e,Ts.debug("conversation fetch harvest hooked")}function dg(){Ot+=1,!(!$n||!qr)&&(yi&&qr.fetch===yi&&(qr.fetch=$n),$n=null,yi=null,qr=null,Ts.debug("conversation fetch harvest unhooked"))}function fg(){Ot+=1,!vu&&dg()}function Su(){vu=!0,ks()}function hu(t,e=""){if(e){let n=`include_has_versions=true&num_turns=80&before_node=${encodeURIComponent(e)}`,r=`include_has_versions=true&num_turns=80&before=${encodeURIComponent(e)}`;return[`/backend-api/conversations/${t}?${n}`,`/backend-api/conversations/${t}?${r}`]}return[`/backend-api/conversation/${t}`,`/backend-api/f/conversation/${t}`,`/backend-api/conversations/${t}`,`/backend-api/conversations/${t}?include_has_versions=true`,`/backend-api/conversations/${t}?include_has_versions=true&num_turns=480`]}async function bu(t,e,n){let r=await t.fetch(e,{method:"GET",credentials:"include",headers:{...yu}});if(!r.ok)return null;let o=await r.json();return Fn(o,n),Eu(n,o,e),o}function me(t){if(!t||Me.has(t)||Es.has(t))return;let e=mu.get(t)??0;if(Date.now()<e)return;Es.add(t),ks();let n=xu();(async()=>{try{let r=null,o=!1;for(let l of hu(t))try{let c=await bu(n,l,t);if(!c)continue;if(r=c,o=!0,Me.has(t)){Ts.debug("conversation chain complete",t,de.get(t)?.length??0);return}}catch{}let i=r?pi(r):de.get(t)?.[0]?.alias||de.get(t)?.[0]?.id||"",a=0,s=!0;for(;i&&s&&a++<Qp&&!Me.has(t);){s=!1;let l=de.get(t)?.length??0;for(let c of hu(t,i))try{let u=await bu(n,c,t);if(!u)continue;r=u,o=!0;let d=pi(u);if(d&&d!==i&&(i=d),(de.get(t)?.length??0)>l&&(s=!0),Me.has(t))return;if(s)break}catch{}}if(Me.has(t))return;o&&!s&&Me.add(t)}finally{Es.delete(t),Me.has(t)||mu.set(t,Date.now()+tg)}})()}function wt(t){return gi.add(t),ks(),()=>{gi.delete(t),gi.size===0&&fg()}}function zn(t){return t?hi.get(t)??"":""}function vi(t){return t?bi.get(t)??null:null}function $r(t){return t?de.get(t)??fu:fu}var Fr=!1,xi=!1,Cs=!1,Lu=[],ku=[],Cu=[];function Ms(t){let e=t.splice(0);for(let n of e)n()}function zr(){Fr||(Fr=!0,Ms(Lu))}function As(){xi||(xi=!0,Fr||zr(),Ms(ku))}function Mu(){Cs||(Cs=!0,Fr||zr(),xi||As(),Ms(Cu))}function wi(t){Fr?t():Lu.push(t)}function Ei(t){xi?t():ku.push(t)}function Si(t){Cs?t():Cu.push(t)}function Ti(){zr()}function jn(){zr(),As()}function Li(){Mu()}function Tu(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Au(){await Tu(4e3),zr(),await Tu(4e3),As(),Mu()}var S={p:"0-V-linuxdo"},Et="[20260924] v1.4.102",Hu="https://github.com/0-V-linuxdo/Bloom";var mg={BetterNavigator:1790258636e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790252301e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function Iu(t){let e=mg[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function pg(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function gg(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Hs(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function tn(){return Hs()?pg()||gg():!1}function Nu(){return tn()}var hg=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Ru=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),bg=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),yg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Un(t){return t.id==="bloom-root"||!!t.closest(yg)}function Pu(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function ki(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Is(t){if(!(t instanceof HTMLElement)||!t.isConnected||Un(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&ki(e)?!1:t.getClientRects().length>0}function Gn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function vg(){let t=[];for(let e of document.querySelectorAll(hg))!(e instanceof HTMLElement)||!e.isConnected||Un(e)||t.push(e);return t}function Ci(t){if(!t.isConnected||Un(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function en(){return vg().filter(Ci)[0]??null}function Kn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Un(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Ns(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Un(n)&&!Gn(n)&&n.parentElement&&!Gn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!Gn(r)&&!Un(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!Gn(r.parentElement))return r}return e}function Wn(){let t=document.querySelectorAll(Ru);for(let n of t)if(Is(n)&&!ki(n)&&Pu(n))return n;let e=document.querySelectorAll(bg);for(let n of e){if(!Is(n)||!Pu(n)||ki(n))continue;let r=n.querySelector(Ru);return Is(r)&&!ki(r)?r:n}return null}function Mi(){let t=en();if(t){let e=Ns(t),n=e.parentElement;if(n&&!Gn(n))return n;if(!Gn(e))return e}return Kn()}function Ai(t){let e=en();return e?t.composedPath().includes(e):!1}var Ps=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],xg={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function wg(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Eg(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Rs(t){let e=wg(t);return e?Eg(e)>.55?"light":"dark":null}function Sg(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Rs(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Rs(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Rs(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Hi(t){return t==="auto"?Sg():t}function Tg(t){try{let e=getComputedStyle(document.documentElement);for(let n of Ps){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Ii(t,e,n){let r=xg[e];if(n){Tg(t);for(let o of Ps)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Ps)t.style.setProperty(o,r[o])}function Ou(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Os=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var kg="bloom-root",Kt="bloom-rail-item",Bi="bloom-account-item",rn="bloom-sidebar-panel",Zr="bloom-plugin-dialog",ji="bloom-plugin-layer",Di="bloom-settings-css",Cg=2e3,_u=null,Mg=null,Ne=!1,qs=[],Ni=null,_i=null,He=null,Pi=null,pe=null,Vr=null,jr,Vn=0,Yr=0,Gr=0,Ur=null,Kr=null,qi=null,qu=null,Wr=null,Bs=[],$i=!1,Ag=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Hg=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Ig=new Set(["chat","ui","privacy"]),Ng=10080*60*1e3,Gi="",Xr="all",Ut="all";function Ui(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function $u(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Rg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Pg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Og(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Bg(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Dg={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function _g(t){return t.icon||Dg[t.name]||Ui()}function Ds(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Ii(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Fu(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Fi(){let t="auto",e=Hi(t);Ds(_u,e,!0);let n=document.getElementById(rn);n instanceof HTMLElement&&Ds(n,e,!0);let r=document.getElementById(Zr);r instanceof HTMLElement&&Ds(r,e,!0);let o=document.getElementById(Kt);o instanceof HTMLElement&&Fu(o),Je("schemeChange",{scheme:e,pref:t})}function zu(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function ju(){if(k("settings",Os),document.getElementById(Di)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Di,t.textContent=Os,document.head.appendChild(t)}function qg(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function $g(){for(let t of qs)t();qs=[]}function Gu(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Fg(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function zs(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function zg(t){return zs(t).length>0}function Oi(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function jg(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Fg(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Gg(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(jg(e,n));let i=Ce(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",qs.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Oi(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Oi(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Gu(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Oi(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Bu(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Ug(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=Ce(t.name);for(let[n,r]of zs(t)){if(n==="enabled"||r.type===5)continue;let o=Oi(r);o!==void 0&&(e[n]=o)}Ku(t)}function Uu(t){t.key==="Escape"&&(!document.getElementById(ji)&&!document.getElementById(Zr)||(t.stopPropagation(),Yn()))}function Kg(){$i||(document.addEventListener("keydown",Uu),$i=!0)}function Wg(){$i&&(document.removeEventListener("keydown",Uu),$i=!1)}function Yn(){$g(),Wg(),document.getElementById(ji)?.remove(),document.getElementById(Zr)?.remove()}function Ku(t){if(Yn(),!document.body)return;let e=document.createElement("div");e.id=ji,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Ie),e.addEventListener("pointerup",Ie),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Yn()});let n=document.createElement("div");n.id=Zr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ie),n.addEventListener("pointerup",Ie),n.addEventListener("click",Ie);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=$u(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Yn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Bu("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Bu("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=zs(t);if(c.length)for(let[u,d]of c){let f=Gg(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Ug(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Kg(),Fi()}function Vg(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=_g(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Qc(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Og(l),c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let p=tu(t.name);Je("pluginStar",{name:t.name,starred:p})}),s.appendChild(c),!t.required){let h=Zc(t.name),p=document.createElement("button");p.type="button",p.className=`bloom-icon-btn bloom-card-pin${h?" bloom-card-pin-active":""}`,p.setAttribute("aria-label",h?"Unpin from top":"Pin to top"),p.innerHTML=Bg(h),p.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let b=Jc(t.name);Je("pluginPin",{name:t.name,pinned:b})}),s.appendChild(p)}if(zg(t)){let h=document.createElement("button");h.type="button",h.className="bloom-icon-btn bloom-card-settings",h.setAttribute("aria-label",`${t.name} settings`),h.innerHTML=Pg(),h.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),Ku(t)}),s.appendChild(h)}let u=Gu(t.name,qn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",h=>h.stopPropagation()),d?.addEventListener("change",()=>{nu(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let h=document.createElement("div");h.className="bloom-card-desc",h.textContent=t.description,n.appendChild(h)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(g),e.append(n,f,m),e}function Wu(){return Object.values(le).filter(t=>!t.hidden&&t.name!=="Settings")}function Yg(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Ng}function Vu(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Yg(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Ig.has(r)):n.includes(e)}function Xg(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Zg(){return Gi.trim()?"No plugins match your search.":Ut==="favorites"?"No favorites yet. Star a plugin to see it here.":Ut==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Jg(){let t=Wu();return Hg.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Vu(n,e.id)))}function Qg(){if(Wr){Wr.replaceChildren();for(let t of Jg()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Ut===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Ut=t.id,nn()}),Wr.appendChild(e)}}}function th(){let t=Wu();if(Ut==="favorites"){let e=new Set(ai());t=t.filter(n=>e.has(n.name))}else Ut!=="all"&&(t=t.filter(e=>Vu(e,Ut)));return Xr==="enabled"&&(t=t.filter(e=>qn(e.name))),Xr==="disabled"&&(t=t.filter(e=>!qn(e.name))),t}function nn(){if(!Ur)return;Qg();let t=th();qi&&(qi.placeholder=`Search ${t.length} plugins...`);let e=t,n=Gi.trim().toLowerCase();if(n&&(e=e.filter(r=>Xg(r).includes(n))),Ut==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Ut!=="favorites"){let r=ii();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Ur.replaceChildren();for(let r of e)Ur.appendChild(Vg(r));Kr&&(Kr.hidden=e.length>0,Kr.textContent=Zg())}function Ie(t){t.stopPropagation()}function _s(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function js(){document.getElementById(Kt)?.setAttribute("aria-expanded",Ne?"true":"false")}function eh(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Gs(){Yn(),Gi="",Xr="all",Ut="all",document.getElementById(rn)?.remove(),Ne=!1,js()}function nh(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Ie),e.addEventListener("pointerup",Ie),e.addEventListener("click",Ie);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Ui();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Rg();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=$u(),d.addEventListener("click",Gs),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let g=document.createElement("input");g.type="search",g.className="bloom-search-input",g.setAttribute("aria-label","Search plugins"),g.placeholder="Search plugins...",g.addEventListener("input",()=>{Gi=g.value,nn()});let h=document.createElement("select");h.className="bloom-search-filter",h.setAttribute("aria-label","Filter plugins");for(let b of Ag){let v=document.createElement("option");v.value=b.value,v.textContent=b.label,h.appendChild(v)}h.value=Xr,h.addEventListener("change",()=>{Xr=h.value,nn()}),m.append(g,h),n.appendChild(m);let p=document.createElement("div");p.className="bloom-plugin-list",n.appendChild(p);let w=document.createElement("p");return w.className="bloom-tab-empty",w.hidden=!0,n.appendChild(w),e.append(d,n),Ur=p,Kr=w,qi=g,qu=h,Wr=f,nn(),e}function rh(t){t.classList.add("bloom-rail-dock")}function oh(){let t=document.getElementById(Kt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Ci(t)?t:null}function ih(){if(document.getElementById(rn)?.remove(),!document.body)return;let t=nh(rn);rh(t),document.body.appendChild(t),Ne=!0,Yn(),Fi(),js(),Je("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Et,dock:"center",rail:!!oh()})}function Us(){let t=document.getElementById(rn);if(t instanceof HTMLElement&&t.isConnected&&eh(t)){Gs();return}t?.remove(),ih()}function ah(){let t=document.createElement("button");return t.type="button",t.id=Kt,t.className="bloom-rail-item",t.setAttribute("aria-controls",rn),t.setAttribute("aria-expanded",Ne?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Ui()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Us()}),t}function Du(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function sh(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function lh(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Ae(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Yu(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=sh(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Ae(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Ae(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Ae(n,"width",l),Ae(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Ae(t,"padding-left",u);let d=lh(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),g=Math.round(f.left-m.right);g>=0&&g<=24&&Ae(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Ae(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Ae(t,"gap",Math.round(l))}Fu(t)}function $s(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function ch(){if(Vr?.isConnected&&pe){pe.observe(Vr,{childList:!0});return}Fs()}function uh(t){if($s(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function dh(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Gr=0;return}Gr+=1,Yr=Date.now()+Math.min(8e3,250*2**Math.min(Gr,5))})}function fh(){Vn||Date.now()<Yr||(Vn=requestAnimationFrame(()=>{Vn=0,!(Date.now()<Yr)&&(document.getElementById(Kt)?.isConnected||zi())}))}function zi(){if(!document.body)return;pe?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Kt);t=n instanceof HTMLButtonElement?n:ah();let r=en(),o=Kn();if(r){let i=Ns(r),a=i.parentElement;if($s(i)||a&&$s(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Du(t),Yu(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Du(t,!0)):t.isConnected&&!Ci(t)&&(t.remove(),t=null)}finally{dh(t,e),ch(),js()}}function Fs(){let t=Mi();!t||!uh(t)||Vr===t&&pe||(pe?.disconnect(),Vr=t,pe=new MutationObserver(()=>{document.getElementById(Kt)?.isConnected||fh()}),pe.observe(t,{childList:!0}))}function mh(){zi(),Fs(),jr===void 0&&(jr=window.setInterval(()=>{let t=document.getElementById(Kt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Yr&&zi();else{Gr=0;let e=en();e&&Yu(t,e)}Fs()},Cg))}function ph(){jr!==void 0&&(clearInterval(jr),jr=void 0),Vn&&cancelAnimationFrame(Vn),Vn=0,Yr=0,Gr=0,pe?.disconnect(),pe=null,Vr=null}function gh(t){Pi===t&&He||(He?.disconnect(),Pi=t,He=new MutationObserver(()=>{if(!t.isConnected){He?.disconnect(),He=null,Pi=null;return}Xu(t)}),He.observe(t,{childList:!0}))}function Xu(t){if(gh(t),t.querySelector(`#${Bi}`))return;let e=document.createElement("button");e.type="button",e.id=Bi,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Ui()}<span>Bloom++</span>`,e.addEventListener("pointerdown",_s),e.addEventListener("pointerup",_s),e.addEventListener("click",n=>{_s(n),Us()}),t.insertBefore(e,t.firstChild)}function Ri(){let t=Wn();return t?(Xu(t),!0):!1}function hh(t){Ai(t)&&(queueMicrotask(Ri),requestAnimationFrame(()=>{Ri()}),window.setTimeout(Ri,60),window.setTimeout(Ri,180))}function bh(){_i?.abort();let t=new AbortController;_i=t,document.addEventListener("click",hh,{signal:t.signal})}function yh(){_i?.abort(),_i=null,He?.disconnect(),He=null,Pi=null}function Zu(){jn(),qg(()=>{ju(),zu(),zi(),Us()})}var Ju=E({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${kg}`,`#${Kt}`,`#${Bi}`,`#${rn}`,`#${ji}`,`#${Zr}`,`#${Di}`,"#bloom-menu-panel"],start(){ju(),zu(),mh(),bh(),Ni?.(),Ni=Ou(Fi),Fi(),Bs=[_n("pluginToggle",()=>{Ne&&nn()}),_n("pluginPin",()=>{Ne&&nn()}),_n("pluginStar",()=>{Ne&&nn()})]},stop(){ph(),yh(),Ni?.(),Ni=null;for(let t of Bs)t();Bs=[],Gs(),document.getElementById(Kt)?.remove(),document.getElementById(Bi)?.remove(),document.getElementById(Di)?.remove(),_u=null,Mg=null,Ur=null,Kr=null,qi=null,qu=null,Wr=null,Ne=!1}});var Ki='form[data-type="unified-composer"], form.w-full[data-type]',Wt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Xn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Qu=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),td=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),vh=/stop streaming|stop generating|停止生成|停止输出|停止响应/,xh='[contenteditable="false"], button, [role="button"]';function Bt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function on(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Bt(o)))return o;return null}function ed(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function z(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=ed(t);return!!(vh.test(n)||/^stop$/i.test(n))}function Dt(){let e=Array.from(document.querySelectorAll(Ki)).find(Bt);if(e instanceof HTMLElement)return e;let n=on(document,Wt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function lt(){let t=Array.from(document.querySelectorAll(Wt));return t.find(Bt)??t[0]??null}function wh(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(xh);return!!n&&n!==e&&e.contains(n)}function Ks(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&wh(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Vt(t){let e=t??lt();return e?Ks(e,e).replaceAll("\u200B","").trim().length>0:!1}function Re(t){return!Vt(t)}function Wi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function nd(t){let e=Dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Bt(n))&&t(n))return n;return null}function Pe(){let t=Dt(),e=on(t,Xn)??on(document,Xn);return e&&!z(e)?e:nd(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!z(n);let o=ed(n);return/^(send|send prompt|发送)$/i.test(o)&&!z(n)})}function an(){let t=Dt(),e=on(t,Qu,!0)??on(document,Qu,!0);if(e)return e;let n=on(t,td)??on(document,td);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Bt(r)&&z(r))return r}return nd(z)}function Yt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Ks(n,t)).join(`
`):Ks(t,t)}function Ws(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function ge(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Ws(t,n)}var od=new C("Streaming");function no(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Bt(e))&&(z(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Eh(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Bt(t))}function Sh(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Bt(t))}function Th(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Zt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Y(){if(an()||no()||Th())return!0;let t=Pe();return t&&Bt(t)&&!z(t)?!1:!!(Eh()||Sh())}var Lh=400,rd=3,un=new Set,Jr,Qr=null,Vs=null,ln=!1,sn=0,Be="",De="",_e=!1,to=!1,eo=!1,Xt=!1,Q=null,St="",cn=!1;function j(){return Xt}function dn(){return _e}function Zn(){return St}function Ys(){return A()||St}function id(){return ce(Pt())}function Vi(t,e){return{streaming:t,contextKey:e,conversationId:Ys()}}function Xs(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function kh(t){return!t||t==="/"||t.startsWith("/g/")}function X(t,e){if(!t||t===e)return!1;let n=ue(Xs(e)||e);return!n||!(t.endsWith("|draft")||kh(Xs(t)))?!1:St?n===St:cn}function Yi(){ln=!1,sn=0,Be="",_e=!1,to=!1,eo=!1,St="",cn=!1}function Ch(t){for(let e of Array.from(un))try{e.onFall?.(t)}catch{}}function Mh(t){for(let e of Array.from(un))try{e.onRise?.(t)}catch{}}function Oe(t){for(let e of Array.from(un))try{e.onTick?.(t)}catch{}}function Ah(t,e){for(let n of Array.from(un))try{n.onContext?.(t,e)}catch{}}function Hh(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&z(n)&&(_e=!0)}function Ih(t){if(t.type==="post-start"){let n=A();if(!t.conversationId){n||(cn=!0),(!n||n===St)&&(Xt=!1,_e=!1);return}if(!(t.conversationId===n||t.conversationId===St)&&!(!n&&cn))return;St=t.conversationId,cn=!1,Xt=!1,_e=!1;return}if(t.type!=="post-end"||!ln&&!Q)return;let e=A();t.conversationId&&!(e?t.conversationId===e:t.conversationId===St)||(eo=!0,t.error&&(to=!0,Q&&(Q.error=!0)))}function Nh(){let t=id(),e=Y();if(De&&t&&De!==t){let o=De;if(!X(o,t))Q=null,Yi(),Xt=e;else{let i=ue(Xs(t));if(i&&!St&&(St=i,cn=!1),Be===o&&(Be=t),Q&&Q.contextKey===o){Q.contextKey=t;let a=Ys();a&&(Q.conversationId=a)}Xt=!1}if(De=t,Ah(t,o),Xt){Oe(Vi(!1,t));return}}else t&&(De=t);if(Xt){if(e){Oe(Vi(!1,t));return}Xt=!1}if(Q)if(e||Q.contextKey!==t)Q=null;else{let o=Q;Q=null,Yi(),Ch(o),Oe(Vi(!1,t));return}let n=Vi(e,t);if(e){let o=!ln;o&&(_e=!1,to=!1,eo=!1),ln=!0,sn=0,Be=t,o&&Mh(n),Oe(n);return}if(!ln){Oe(n);return}if(sn+=1,eo&&(sn=Math.max(sn,rd)),sn<rd){Oe(n);return}if(!(!!Be&&Be===t)){Yi(),Oe(n);return}Q={contextKey:Be||t,conversationId:Ys(),userStopped:_e,error:to||Zt()},Oe(n)}function Rh(){Jr===void 0&&(ln=Y(),De=id(),Be=ln?De:"",sn=0,_e=!1,to=!1,eo=!1,Xt=!1,Q=null,St="",cn=!1,Qr?.abort(),Qr=new AbortController,document.addEventListener("click",Hh,{capture:!0,signal:Qr.signal}),Vs=wt(Ih),Jr=setInterval(Nh,Lh),od.debug("watchStreamingEdge started"))}function Ph(){un.size||(Jr!==void 0&&(clearInterval(Jr),Jr=void 0),Qr?.abort(),Qr=null,Vs?.(),Vs=null,Yi(),De="",Xt=!1,Q=null,od.debug("watchStreamingEdge stopped"))}function ft(t){let e=typeof t=="function"?{onFall:t}:t;return un.add(e),Rh(),()=>{un.delete(e),Ph()}}var ad="bloom-host-icon",ro="data-bloom-host-rel",Zs="not all",Js=0,sd=0,Oh=400;function ld(t){Js+=1;try{t()}finally{Js-=1}}function Xi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function qe(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function cd(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Bh(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Dh(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-sd<Oh||(sd=n,t.appendChild(e))}function _h(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Xi(n)&&(n.getAttribute(ro)||n.setAttribute(ro,n.rel),n.media!==Zs&&(n.media=Zs),n.rel!==ad&&(n.rel=ad))}function qh(t){for(let e of t.querySelectorAll(`link[${ro}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(ro);n&&(e.rel=n),e.removeAttribute(ro),e.media===Zs&&e.removeAttribute("media")}}function ud(t,e){let{head:n}=document;!n||!e||ld(()=>{_h(n,t);let r=cd(t),{type:o,sizes:i}=Bh(e);r?Dh(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function dd(t,e){let{head:n}=document;n&&ld(()=>{cd(t)?.remove(),qh(n)})}function fd(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(Js)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Xi(c.target)&&(a=!0,qe(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Xi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Xi(u)&&u.id!==t&&(a=!0,qe(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var $h=["original","badge","dot","hole","bg"],gd=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],hd={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Zi="#FCFCFC",Fh="#111111",md="#111111",zh="#ffffff",jh="#212121",Gh="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Uh={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Ji=32,pd=64;function bd(t){return typeof t=="string"&&$h.includes(t)}function Kh(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Qi(t){let e=document.createElement("canvas");e.width=Ji,e.height=Ji;let n=e.getContext("2d");return n?(n.scale(Ji/pd,Ji/pd),t(n),e.toDataURL("image/png")):""}function Wh(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ta(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Gh);n&&(t.strokeStyle=Fh,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Vh(t,e,n){let r=hd[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=md,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=md,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=zh,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function oo(t,e){if(t==="original")return e==="wait"?Qi(r=>ta(r,Zi)):Kh(Uh[e]);let n=e==="wait"?void 0:hd[e];return Qi(t==="hole"?r=>ta(r,n??Zi):t==="bg"?r=>{r.fillStyle=n??jh,Wh(r,0,0,64,64,14),r.fill(),ta(r,Zi,!1)}:r=>{ta(r,Zi),e!=="wait"&&Vh(r,e,t==="dot"?"dot":"badge")})}function yd(t){return{wait:oo(t,"wait"),rotate:oo(t,"rotate"),done:oo(t,"done"),ready:oo(t,"ready"),error:oo(t,"error")}}var Yh=new C("ChatStateFavicons"),mn="bloom-chat-state-favicon",Sd=["input","beforeinput","cut","paste","compositionend"],Td=M({style:{type:3,description:"Favicon overlay",options:gd}}),Jt="",el={wait:"",rotate:"",done:"",ready:"",error:""},io="wait",mt=!1,tt=!1,D=null,ht="",Tt="",gn=!0,ra=!1,Jn=null,Lt=0,ea=null,na=null,fn=null,tl=null,Qn=null,_t=!1,vd=new WeakSet;function Xh(){let t=Td.store.style;return bd(t)?t:"bg"}function Ld(){let e=document.querySelector(`link[rel~="icon"]:not(#${mn}), link[data-bloom-host-rel]:not(#${mn})`)?.href;return qe(e)?e:qe(Jt)?Jt:""}function Zh(){let t=document.getElementById(mn);return t instanceof HTMLLinkElement?t:null}function Jh(){if(!qe(Jt)){let t=Ld();t&&(Jt=t)}return qe(Jt)?Jt:el.wait}function kd(t){return t==="wait"?Jh():el[t]}function Cd(){ud(mn,kd(io))}function q(t){let e=kd(t);if(io===t){let n=Zh();if(n&&n.getAttribute("href")===e)return}io=t,Cd()}function xd(){el=yd(Xh()),q(io)}function nl(){return ce(Pt())}function rl(t,e){!t||!e||t===e||(D===t&&(D=e),ht===t&&(ht=e),Tt===t&&(Tt=e))}function Qh(){let t=nl();if(!(Y()||mt||tt))return ht="",t;if(ht&&t&&ht!==t)if(X(ht,t))rl(ht,t),ht=t;else return ht="",t;else!ht&&t&&(ht=t);return ht||t}function wd(t){return!D||!t?!1:D===t?!0:X(D,t)}function Md(){mt=!1,tt=!1,D=null,ht=""}function Ad(t){Tt=t,Md(),gn=!1,ra=!0,q("wait")}function Qs(t){return!t&&gn}function tb(){if(!_t)return;let t=nl();if(Tt&&t&&Tt!==t&&!X(Tt,t)){Ad(t);return}Tt&&t&&X(Tt,t)&&rl(Tt,t),t&&(Tt=t);let e=Y(),n=e&&!j();if(ra){if(j()){q("wait");return}ra=!1}if(j()){q("wait");return}let r=Qh(),o=Re();if(dn()&&!e){mt=!1,tt=!1,D=null,q(o?"wait":Qs(o)?"ready":"wait");return}if(Zt()&&!e&&mt){q("error"),mt=!1,tt=!1,D=null;return}if(n){mt||(gn=!1),mt=!0,tt=!1,D=r,q("rotate");return}if(mt)if(!wd(t))mt=!1,tt=!1,D=null;else if(tt){mt=!1,tt=!0,D=t||r,q("done");return}else{q("rotate");return}if(tt)if(D&&t&&!wd(t))tt=!1,D=null;else if(o){D=r||D,q("done");return}else if(Qs(o)){tt=!1,q("ready");return}else{tt=!1,q("wait");return}D=null,o?q("wait"):Qs(o)?q("ready"):q("wait")}function pn(){_t&&(Pd(),Id(),Nd(),tb())}function Hd(){if(Qn){for(let t of Sd)Qn.removeEventListener(t,Rd,!0);Qn=null}}function Id(){let t=Dt(),e=t&&t!==document.body?t:null;if(!(Qn===e&&e?.isConnected)&&(Hd(),!!e)){Qn=e;for(let n of Sd)Qn.addEventListener(n,Rd,{capture:!0,passive:!0})}}function Nd(){let t=Dt();if(!(fn&&tl===t&&t.isConnected)){if(fn?.disconnect(),tl=t,!t||t===document.body){fn=null;return}fn=new MutationObserver(()=>oa()),fn.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function oa(){if(_t){if(document.hidden){Lt&&(cancelAnimationFrame(Lt),Lt=0),pn();return}Lt||(Lt=requestAnimationFrame(()=>{Lt=0,_t&&pn()}))}}function Rd(){Vt()&&(gn=!0),oa()}function Ed(){Vt()&&(gn=!0),oa()}function eb(){_t&&(Lt&&(cancelAnimationFrame(Lt),Lt=0),pn())}function nb(){_t&&(gn=!1,pn())}function rb(t){if(!_t)return;if(t.userStopped){mt=!1,tt=!1,D=null,q("wait");return}if(t.error){mt=!1,tt=!1,D=null,q("error");return}let e=nl();if(t.contextKey&&e&&t.contextKey!==e&&!X(t.contextKey,e)){mt=!1,tt=!1,D=null,q("wait");return}mt=!1,tt=!0,D=e||t.contextKey,q("done")}function ob(){_t&&pn()}function ib(t,e){if(_t){if(X(e,t)){rl(e,t),Tt=t,pn();return}Ad(t)}}function Pd(){let t=lt();!t||vd.has(t)||(vd.add(t),t.addEventListener("input",Ed,{capture:!0,passive:!0}),t.addEventListener("compositionend",Ed,{capture:!0,passive:!0}))}var Od=E({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Td,startAt:"DOMContentLoaded",cleanupSelectors:[`#${mn}`],start(){_t=!0,Jt=Ld()||Jt,xd(),na?.disconnect(),na=fd(mn,t=>{qe(t)&&(Jt=t),Cd()}),Jn?.abort(),Jn=new AbortController,window.addEventListener("popstate",oa,{signal:Jn.signal}),document.addEventListener("visibilitychange",eb,{signal:Jn.signal}),Pd(),Id(),Nd(),ea?.(),ea=ft({onRise:nb,onFall:rb,onTick:ob,onContext:ib}),pn(),Yh.debug("favicon watch started")},stop(){_t=!1,Lt&&cancelAnimationFrame(Lt),Lt=0,ea?.(),ea=null,Jn?.abort(),Jn=null,Hd(),fn?.disconnect(),fn=null,tl=null,na?.disconnect(),na=null,Md(),Tt="",gn=!0,ra=!1,io="wait",dd(mn,Jt)},onSettingsChange:xd});var Bd=`.bloom-ih-hud {
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
`;var DE=new C("InputHistory"),ol=/\u200B/g,Dd=10,_d=500,qd=100,sb=8,lb=120,cb=2e3,ia=10,aa=M({maxEntries:{type:4,description:"Max stored prompts",min:Dd,max:_d,default:qd},history:{type:5,description:"Stored prompts",render:Tb},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),il=new Map,et=0,al="",Qt=!1,so=!1,cl=0,ao=null,sl,ul=null,$d=!0;function qt(){let t=aa.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Fd(t){let e=at(Number(aa.store.maxEntries??qd),Dd,_d);return t.length>e?t.slice(t.length-e):t}function sa(t){aa.store.entries=Fd(t)}function ub(t){return t.replaceAll(ol,"").replace(/\n$/,"").trim()}function ll(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Wt);return n instanceof HTMLElement?n:lt()}function db(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Yt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(ol,"").trim().length===0,last:i.toString().replaceAll(ol,"").trim().length===0}}catch{return{first:!0,last:!0}}}function zd(t){clearTimeout(sl),sl=setTimeout(()=>{if(t!==cl)return;so=!1;let e=ul;e&&Ws(e,$d)},lb)}function jd(t,e,n){so=!0,ul=t,$d=n;let r=++cl;ge(t,e,n),zd(r)}function fb(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function tr(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function mb(){document.querySelector(".bloom-ih-hud")?.remove()}function pb(t,e){let n=fb();n.textContent=t;let r=(e.closest("form")??Dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-sb)}px`,n.classList.add("bloom-ih-hud-on")}function dl(t){let e=ub(t);if(!e)return;let n=Date.now(),r=il.get(e);if(r&&n-r<cb)return;il.set(e,n);let o=qt().filter(i=>i!==e);o.push(e),sa(o),et=qt().length,Qt=!1,tr()}function gb(t,e){let n=qt();if(!n.length&&t)return;et>=n.length&&(al=Yt(e),et=n.length);let r=t?et-1:et+1;r<0||r>n.length||(et=r,Qt=!0,jd(e,r===n.length?al:n[r],t),r<n.length?pb(`${r+1} / ${n.length}`,e):tr())}function hb(t){Qt=!1,tr(),jd(t,al,!1),et=qt().length}function bb(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=ll(t.target)??ll(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Qt&&!t.altKey&&!t.shiftKey){hb(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){dl(Yt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=qt();if(!r){let i=db(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||et<=0)||!n&&et>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),gb(n,e))}function yb(t){if(ll(t.target)){if(so){zd(cl);return}Qt&&(Qt=!1,tr(),et=qt().length)}}function vb(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Wt);n instanceof HTMLElement&&dl(Yt(n))}function xb(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Xn);if(!n||!(n instanceof HTMLElement)||z(n))return;let r=lt();r&&dl(Yt(r))}function wb(t){if(!(!Qt||so)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Qt=!1,tr()}}function Eb(){if(ao)return;ao=new AbortController;let{signal:t}=ao,e={capture:!0,signal:t};window.addEventListener("keydown",bb,e),window.addEventListener("input",yb,e),window.addEventListener("submit",vb,e),window.addEventListener("click",xb,e),window.addEventListener("pointerdown",wb,e)}function Sb(t){let e=qt().slice();e.splice(t,1),sa(e),et>e.length&&(et=e.length)}function Tb(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=qt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(p=>p.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/ia));n>=l&&(n=l-1);let c=s.slice(n*ia,n*ia+ia);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let p=document.createElement("div");p.className="bloom-ih-list",c.forEach((w,b)=>{let v=i.indexOf(w),ot=qt().length-1-v,W=document.createElement("div");W.className="bloom-ih-item";let J=document.createElement("button");J.type="button",J.className=`bloom-ih-body${r===b?"":" bloom-ih-clamp"}`,J.textContent=w,J.addEventListener("click",()=>{r=r===b?-1:b,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let dt=document.createElement("button");dt.type="button",dt.title="Copy",dt.textContent="C",dt.addEventListener("click",()=>{Gc(w)});let vt=document.createElement("button");vt.type="button",vt.title="Delete",vt.textContent="\xD7",vt.addEventListener("click",()=>{Sb(ot),o()}),O.append(dt,vt),W.append(J,O),p.appendChild(W)}),t.appendChild(p)}else{let p=document.createElement("p");p.className="bloom-ih-empty",p.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(p)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let h=document.createElement("button");h.type="button",h.className="bloom-ih-clear",h.textContent="Clear all",h.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(sa([]),et=0,o())}),d.append(f,m,g,h),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Gd=E({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:aa,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",Bd),et=qt().length,Qt=!1,Eb()},stop(){ao?.abort(),ao=null,tr(),mb(),il.clear(),clearTimeout(sl),so=!1,ul=null,Qt=!1},onSettingsChange(){let t=qt(),e=Fd(t);e.length!==t.length&&sa(e),et>e.length&&(et=e.length)}});var fl="noShareLink",Lb=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],kb=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],ml=M({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Ud(t){return`${t.join(",")}{display:none!important}`}function Kd(){let t=[];if(ml.store.hideShareChat!==!1&&t.push(Ud(Lb)),ml.store.hideShareProject!==!1&&t.push(Ud(kb)),!t.length){L(fl);return}k(fl,t.join(`
`))}var Wd=E({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:ml,start:Kd,onSettingsChange:Kd,stop(){L(fl)}});var Xd="noDictation",Cb=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Mb=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Zd=M({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Vd(t){return`${t.join(",")}{display:none!important}`}function Yd(){let t=[Vd(Cb)];Zd.store.hideDictationSettings!==!1&&t.push(Vd(Mb)),k(Xd,t.join(`
`))}var Jd=E({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Zd,start:Yd,onSettingsChange:Yd,stop(){L(Xd)}});var pl="noSidebarIdentity",er=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],ef=er.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),nf=er.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Ab=[...ef,...nf],Hb=[...ef,...er.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Ib=er.map(t=>`${t} a[href^="mailto:"]`),Nb=er.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Rb=er.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),lo=M({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Qd(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Pb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Ob(){return`${Rb.join(",")}{margin-block:auto!important}`}function Bb(){return`${Nb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function tf(){let t=lo.store.hideUsername!==!1,e=lo.store.hideEmail!==!1,n=t&&lo.store.enlargePlan!==!1,r=t&&lo.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Pb([...Hb,...nf])),o.push(Ob())):o.push(Qd(Ab))),e&&o.push(Qd(Ib)),n&&o.push(Bb()),!o.length){L(pl);return}k(pl,o.join(`
`))}var rf=E({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:lo,start:tf,onSettingsChange:tf,stop(){L(pl)}});var of=`#bloom-rt-host {
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
`;var lf=new C("RecentTopics"),or="bloom-rt-host",cf="home",uf=/^\/c\/([a-z0-9_-]{8,})/i,_b=/\/c\/([a-z0-9_-]{8,})/i,df=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,qb=new Set(["Backquote","IntlBackslash"]),$b=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Fb=140,zb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),nt=M({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:zb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),la=null,ca=null,bt=!1,go=!1,co=!1,te=0,hn="",nr=null,uo=null,rr,gl=null,hl=null;function jb(){let t=Number(nt.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function fo(){let t=nt.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function yl(){let t=nt.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ff(){let t=nt.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function vl(){let t=nt.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function da(t){let e=jb();return t.length>e?t.slice(0,e):t}function ee(t){return t===cf}function mo(t,e=Fb){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function xl(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(uf)?.[1]??""}catch{return t.match(_b)?.[1]??""}}function bn(){let t=(location.pathname||"/").match(uf);if(t?.[1])return t[1];let n=Pt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return cf}function wl(t){if(ee(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(xl(r.getAttribute("href")||"")!==t)continue;let o=mo(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return bn()===t&&e&&!/^ChatGPT$/i.test(e)?mo(e,80):""}function Gb(t){if(ee(t))return"New chat";let e=yl()[t];if(e)return e;let n=zn(t);return n||wl(t)||"Chat"}function Ub(t){return vl()[t]||""}function Kb(t){return ff()[t]||{}}function El(t,e){if(!t||ee(t)||!e||/^new chat$/i.test(e.trim()))return;let n=yl();n[t]!==e&&(n[t]=e,nt.store.titles=n)}function Wb(t){t.type==="conversation-meta"&&(El(t.conversationId,t.title),bt&&ir())}function Vb(t,e){if(!t||ee(t)||!e)return;let n=vl();n[t]!==e&&(n[t]=e,nt.store.projects=n)}function Yb(t,e){if(!t||ee(t)||!e.user&&!e.assistant)return;let n=ff(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,nt.store.previews=n)}function Sl(t){if(!t||ee(t)&&nt.store.includeHome===!1)return;let e=fo().filter(n=>n!==t);e.unshift(t),nt.store.visits=da(e)}function fa(){let t=nt.store.includeHome!==!1;return da(fo().filter(n=>t||!ee(n))).map(n=>({id:n,title:Gb(n),project:Ub(n),preview:Kb(n)}))}function af(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return mo(o)}catch{return""}}function po(t){if(!t||ee(t)||t!==bn())return;let e=wl(t);e&&El(t,e);let n=af("user"),r=af("assistant");Yb(t,{user:n,assistant:r});let o=pf(t);if(o){let i=mf(o);i&&Vb(t,i)}}function Tl(){let t=yl(),e=vl(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${or}, #bloom-root, #bloom-sidebar-panel`))continue;let u=xl(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=mo(c.textContent||"",80);d&&!df.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=mf(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(nt.store.titles=t),i&&(nt.store.projects=e);let a=fo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(nt.store.visits=da([...a,...l]))}function mf(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=mo((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!df.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function pf(t){if(ee(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(xl(e.getAttribute("href")||"")===t)return e}catch{}return null}function Xb(t){let e=pf(t);if(e){e.click();return}if(ee(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Zb(){let t=bn();hn&&hn!==t&&po(hn),hn=t,Sl(t),Tl();let e=wl(t);e&&El(t,e),po(t)}function ua(){rr===void 0&&(rr=window.setTimeout(()=>{rr=void 0,Zb()},120))}function Jb(){nr||(nr=history.pushState.bind(history),uo=history.replaceState.bind(history),history.pushState=function(...e){let n=nr(...e);return ua(),n},history.replaceState=function(...e){let n=uo(...e);return ua(),n})}function Qb(){nr&&(history.pushState=nr),uo&&(history.replaceState=uo),nr=null,uo=null}function t0(t){return qb.has(t.code)||t.keyCode===192?!0:$b.has(t.key)}function gf(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function e0(t,e){go=e,Tl(),po(bn()),bt=!0,te=0;try{let n=bn();Sl(n);let r=fa();r.length>1&&(te=t?r.length-1:1)}catch(n){lf.error("Failed to open switcher:",n)}ir()}function sf(t){let{length:e}=fa();e&&(te=(te+(t?-1:1)+e)%e,ir())}function Ll(){if(!bt)return;let t=fa()[te];bt=!1,go=!1,ir(),t&&Xb(t.id)}function hf(){bt&&(bt=!1,go=!1,ir())}function n0(t){if(gf(t)){co=!0;return}if((t.ctrlKey||co)&&!t.altKey&&!t.metaKey&&t0(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{bt?sf(t.shiftKey):e0(t.shiftKey,!0)}catch(n){lf.error("Hotkey failed:",n)}return}if(bt){if(t.key==="Escape"){t.preventDefault(),hf();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Ll();return}t.key==="Tab"&&(t.ctrlKey||co)&&(t.preventDefault(),sf(t.shiftKey))}}function r0(t){gf(t)&&(co=!1,bt&&go&&Ll())}function o0(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ua)}function i0(t){!bt||(t.target instanceof Element?t.target:null)?.closest(`#${or}`)||hf()}function a0(){document.visibilityState==="hidden"&&po(bn())}function bl(t=ca){t instanceof HTMLElement&&Ii(t,Hi("auto"),!0)}function s0(){if(!document.body)return null;let t=document.getElementById(or);if(t instanceof HTMLElement)return ca=t,bl(t),t;t=document.createElement("div"),t.id=or;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ca=t,bl(t),t}function ir(){let t=s0();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!bt){e.dataset.visible="false",e.replaceChildren();return}let n=fa();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}te>=n.length&&(te=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===te?"true":"false",s.setAttribute("aria-selected",a===te?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{te=a,Ll()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function l0(){document.getElementById(or)?.remove(),ca=null}var bf=E({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${or}`],settings:nt,start(){k("recentTopics",of),hn=bn(),Sl(hn),Tl(),po(hn),gl=wt(Wb),Jb(),la=new AbortController;let{signal:t}=la;window.addEventListener("keydown",n0,{capture:!0,signal:t}),window.addEventListener("keyup",r0,{capture:!0,signal:t}),window.addEventListener("popstate",ua,{signal:t}),document.addEventListener("click",o0,{capture:!0,signal:t}),document.addEventListener("click",i0,{signal:t}),document.addEventListener("visibilitychange",a0,{signal:t}),hl=_n("schemeChange",()=>bl())},stop(){la?.abort(),la=null,rr!==void 0&&(clearTimeout(rr),rr=void 0),Qb(),gl?.(),gl=null,hl?.(),hl=null,bt=!1,go=!1,co=!1,l0()},onSettingsChange(){let t=da(fo());t.length!==fo().length&&(nt.store.visits=t),bt&&ir()}});var kl="cleaner",c0=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],u0=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],d0=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],f0=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],m0=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],p0=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],yn=M({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function ar(t){return`${t.join(",")}{display:none!important}`}function yf(){let t=[];if(yn.store.hideDownloadApps!==!1&&t.push(ar(c0)),yn.store.hideDisclaimer!==!1&&t.push(ar(u0)),yn.store.hideUpgrade!==!1&&t.push(ar(d0)),yn.store.hideLockedModels!==!1&&t.push(ar(f0)),yn.store.hideHomePromo!==!1&&t.push(ar(m0)),yn.store.hideAds!==!1&&t.push(ar(p0)),!t.length){L(kl);return}k(kl,t.join(`
`))}var vf=E({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:yn,start:yf,onSettingsChange:yf,stop(){L(kl)}});var pa=new C("ResponseNotification"),lr=M({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:w0},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Cl=!1,ma=null,sr=null,ho=null;function g0(){return document.visibilityState==="hidden"||document.hidden}function h0(){return lr.store.onlyWhenHidden===!1?!0:g0()}function b0(){let t=zn(A());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function xf(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!sr||sr.state==="closed")&&(sr=new t);let e=sr,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){pa.debug("chime failed",t)}}function y0(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){pa.debug("custom sound failed",e),xf()}}function wf(){let t=String(lr.store.soundUrl||"").trim();t?y0(t):xf()}function v0(){let t="Bloom++",e=`${b0()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){pa.debug("notification failed",n)}}function x0(){h0()&&(lr.store.sound!==!1&&wf(),lr.store.browserNotification!==!1&&v0())}function w0(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>wf()),t.appendChild(e),()=>{e.remove()}}var Ef=E({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:lr,start(){Cl=!0,ma?.(),ma=ft(t=>{if(!Cl||t.userStopped||t.error)return;let e=A()||Zn();t.conversationId&&t.conversationId!==e||x0()}),ho?.abort(),ho=new AbortController,lr.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:ho.signal}),pa.debug("watch started")},stop(){Cl=!1,ma?.(),ma=null,ho?.abort(),ho=null;try{sr?.close()}catch{}sr=null}});var Sf=`#bloom-pq-chip {
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
`;var Ge=new C("PromptQueue"),va="bloom-pq-chip",Tf="promptQueue",S0=8,T0=50,L0=2e3,k0='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',C0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,M0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Ml=M({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),ze=new Map,Lf=0,Ft=!1,$t="",P="",ne=!1,yt=!1,Ke=!1,B=null,bo=null,ga=null,Fe,Eo,Ue=null,R=null,cr=null,ba=!1,ct=null,vn,je=!0,U=!1,G=!1,pt=!1;function he(){return ce(Pt())}function ur(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function A0(t){let e=ur(Yt(t));if(e)return e;if(!Vt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),ur(n.innerText||n.textContent||"")}catch{return""}}function Nf(){try{let t=document.querySelectorAll(k0),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Rf(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Pf(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&C0.test(n))return!0}}catch{}return!1}function ya(){let t=Zn();if(!t)return!1;let e=A();return!e||e===t}function wo(){if(Y()||ya())return!1;let t=Nf();if(!t)return!0;if(Rf(t)||Pf(t))return!1;try{if(t.querySelector(M0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function H0(){if(j()||dn())return U=!1,!1;if(Y()||ya())return U=!0,!0;let t=Nf();return t&&(Rf(t)||Pf(t))?(U=!0,!0):U&&!wo()?!0:(U=!1,!1)}function Of(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Wt);return n instanceof HTMLElement?n:null}function kf(t){return Of(t)??lt()}function xa(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Bf(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function I0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?ur(e.innerText||e.textContent||""):""}catch{return""}}function N0(){return Lf+=1,`pq${Date.now().toString(36)}${Lf.toString(36)}`}function Z(t){return ze.get(t)??[]}function Df(t){return Z(t)[0]}function xn(t,e){e.length?ze.set(t,e):ze.delete(t)}function _f(t){if(!Z(t).length){G=!1,pt=!1,P="";return}G=!0,pt=!1,U=!0,P=""}function Cf(t){if(!$t||$t===t)return;let e=ze.get($t);!e?.length||ze.has(t)||X($t,t)&&(ze.delete($t),ze.set(t,e),P===$t&&(P=t),B?.key===$t&&(B.key=t),Ge.debug("migrated pending",$t,"\u2192",t))}function wa(t){let e=he(),n=Z(e);if(Ml.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),xn(e,n)}else if(n.length>=S0){Ge.debug("queue full",e);return}else n.push({id:N0(),text:t,at:Date.now()}),xn(e,n);U=!0,B={key:e,text:t,turns:Bf(),ticks:3};let r=lt();r&&ge(r,"");try{ut()}catch(o){Ge.error("chip",o)}Ge.debug("queued",e,n.length,t.length)}function qf(t,e){let n=Z(t).filter(r=>r.id!==e);if(xn(t,n),R===e&&(R=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}ut()}function Il(){cr?.abort(),cr=null}function R0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function Mf(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function P0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||R||ct)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;cr?.abort();let c=new AbortController;cr=c;let{signal:u}=c,d=!1,f=!1,m=0,g=0,h=0,p=0,w=null,b=[],v=[],ot=()=>{e.classList.add("bloom-pq-settling");for(let y of b)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},W=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(w?.isConnected?w.before(t):e.append(t)),w?.remove(),w=null,ot(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},J=()=>{ba=!0;let y=H=>{H.preventDefault(),H.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{ba=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=Mf(b.length,m,g),H=v.length>1?(v[v.length-1].top-v[0].top-v.slice(0,-1).reduce((I,Gt)=>I+Gt.height,0))/(v.length-1):2,gt=new Array(v.length),xt=v[0]?.top??0;for(let I of y)gt[I]=xt,xt+=v[I].height+H;for(let I=0;I<b.length;I++){if(I===m)continue;let Gt=gt[I]-v[I].top;b[I].style.transform=Math.abs(Gt)<.5?"":`translate3d(0,${Math.round(Gt)}px,0)`}},dt=()=>{let y=Z(n).slice();if(m<0||m>=y.length)return;let H=Mf(y.length,m,g);if(H.every((I,Gt)=>I===Gt))return;let gt=H.map(I=>y[I]).filter(Boolean);if(gt.length!==y.length)return;xn(n,gt);let xt=new Map(b.map(I=>[I.dataset.pqId||"",I]));for(let I of gt){let Gt=xt.get(I.id);Gt&&e.append(Gt)}},vt=y=>{if(f)return;f=!0;let H=d;cr===c&&(cr=null),H&&y&&t.isConnected&&dt(),W(),H&&J(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;W(),y&&J()});let Qo=()=>{d=!0,b.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=b.indexOf(t),m<0&&(m=b.findIndex(I=>I.dataset.pqId===r)),g=m<0?0:m;let y=t.getBoundingClientRect();h=y.left,p=y.top;let H=getComputedStyle(t);w=document.createElement("div"),w.className="bloom-pq-gap",w.style.height=`${y.height}px`,t.before(w),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=H.color,t.style.font=H.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let gt=e.getBoundingClientRect(),xt=e.scrollTop;v=b.map(I=>{let ds=(I===t?w:I).getBoundingClientRect(),Bc=ds.top-gt.top+xt;return{top:Bc,height:ds.height,mid:Bc+ds.height/2}})},x=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(Qo(),!d||m<0)))return;y.preventDefault(),t.style.left=`${h+(y.clientX-s)}px`,t.style.top=`${p+(y.clientY-l)}px`;let H=e.getBoundingClientRect(),gt=y.clientY-H.top+e.scrollTop,xt=R0(gt,v.map(I=>I.mid));xt!==g&&(g=xt,O())},N=y=>{y.pointerId===a&&vt(!0)};window.addEventListener("pointermove",x,{signal:u}),window.addEventListener("pointerup",N,{signal:u}),window.addEventListener("pointercancel",()=>vt(!1),{signal:u})})}function O0(){yt=!0,clearTimeout(Eo),Eo=setTimeout(()=>{yt=!1,Eo=void 0},L0)}function B0(t){if(ct)return;let e=he(),n=Z(e).find(i=>i.id===t);if(!n)return;let r=lt();if(!r)return;let o=n.text;ct=t,R===t&&(R=null),Il(),ut(),clearTimeout(vn),vn=setTimeout(()=>{if(vn=void 0,!Ft||ct!==t)return;if(ct=null,he()!==e||!Z(e).some(a=>a.id===t)){ut();return}xn(e,Z(e).filter(a=>a.id!==t)),ut(),O0(),ge(r,o);let i=Pe();i&&!z(i)&&!Wi(i)&&(i.click(),yt=!1),_f(e)},160)}function yo(t){if(!Ft||ne||G||ct||Y()||he()!==t)return;let e=Df(t);if(!e){P="";return}if(Zt())return;let n=lt();if(!n)return;if(!Re(n)){let o=ur(Yt(n));if(o&&o!==e.text)return}let r=Pe();!r||z(r)||Wi(r)||(ne=!0,ge(n,e.text),clearTimeout(Fe),Fe=setTimeout(()=>D0(t,e.id,e.text),T0))}function D0(t,e,n){Fe=void 0;try{if(!Ft||G||ct)return;let r=Df(t);if(!r||r.id!==e||r.text!==n||Y()||he()!==t)return;let o=lt();if(!o)return;let i=ur(Yt(o));if(i&&i!==n&&!Re(o))return;i!==n&&ge(o,n);let a=Pe();if(!a||z(a)||Wi(a))return;a.click(),xn(t,Z(t).filter(s=>s.id!==e)),ut(),_f(t),Ge.debug("drained",t,Z(t).length)}finally{ne=!1}}function Al(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Dt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Hl(){Il(),Ue?.remove(),Ue=null,R=null,je=!0}var $f="http://www.w3.org/2000/svg";function _0(){let t=document.createElementNS($f,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function vo(t){let e=_0();for(let n of t){let r=document.createElementNS($f,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function xo(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&Ff(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function q0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${va}`)}function ha(){let t=Ue?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function $0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function $e(t,e){if(R!==t)return;if(R=null,e===null){ut();return}let n=ur(e),r=he();if(!n){qf(r,t);return}let o=Z(r).find(i=>i.id===t);o&&(o.text=n),ut()}function Af(t){ct||R!==t&&(R&&$e(R,ha()),Z(he()).some(e=>e.id===t)&&(R=t,je=!0,ut()))}function Ff(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function Hf(t){return R===t?"edit":ct===t?"send":"text"}function F0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function z0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||F0(l)!==Hf(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",je?"true":"false"),n.hidden=!je;for(let s of e){let l=a.get(s.id);if(Hf(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function ut(){if(Il(),!Ft||!document.body){Hl();return}let t=he(),e=Z(t);if(!e.length){Hl();return}R&&!e.some(d=>d.id===R)&&(R=null),ct&&!e.some(d=>d.id===ct)&&(ct=null);let n=Ue;if(n?.isConnected||(n=document.createElement("div"),n.id=va,document.body.appendChild(n),Ue=n),z0(n,e)){Al(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",je?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),je=!je,ut()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",je||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=R===d.id,g=ct===d.id;m||(f.setAttribute("role","button"),f.tabIndex=g?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),g&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let h=document.createElement("div");h.className="bloom-pq-body";let p;if(m){let b=document.createElement("textarea");b.className="bloom-pq-text bloom-pq-editing",b.value=d.text,b.rows=2,b.spellcheck=!1,b.setAttribute("aria-label","Queued message text"),b.addEventListener("keydown",v=>{v.stopPropagation(),v.key==="Enter"&&!v.shiftKey?(v.preventDefault(),$e(d.id,b.value)):v.key==="Escape"&&(v.preventDefault(),$e(d.id,null))}),b.addEventListener("blur",()=>$e(d.id,b.value)),p=b,u=b}else{let b=document.createElement("span");b.className="bloom-pq-text line-clamp-2",b.textContent=g?"Sending":d.text,g?Ff(b,l,"Sending now"):b.addEventListener("click",v=>{if(ba){ba=!1,v.preventDefault(),v.stopPropagation();return}v.preventDefault(),v.stopPropagation(),Af(d.id)}),p=b}h.append(p),f.append(h);let w=document.createElement("div");if(w.className="bloom-pq-rail",m){let b=xo("Save",vo(["M20 6 9 17l-5-5"]),()=>{$e(d.id,p instanceof HTMLTextAreaElement?p.value:ha())},l),v=xo("Cancel",vo(["M18 6 6 18","m6 6 12 12"]),()=>{$e(d.id,null)},l);w.append(b,v)}else{let b=xo("Remove from queue",vo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{R&&R!==d.id&&$e(R,ha()),R=R===d.id?null:R,qf(t,d.id)},l,void 0,g),v=xo("Edit queued message",vo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>Af(d.id),l,"Edit",g),ot=xo("Send now",vo(["M12 19V5","M6 11 12 5l6 6"]),()=>{R&&R!==d.id&&$e(R,ha()),B0(d.id)},l,"Send now (or Enter on empty composer)",g);w.append(b,v,ot)}f.append(w),!m&&!g&&P0(f,c,t,d.id),c.append(f)}if(n.append(o,c),Al(n),u){let d=u,f=R;queueMicrotask(()=>{R===f&&d.isConnected&&$0(d)})}}function j0(){if(!B)return;B.ticks-=1;let t=Z(B.key);if(t.length&&Bf()>B.turns){let e=I0();if(e&&e===B.text){Ge.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),xn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,ut();return}}B.ticks<=0&&(B=null)}function Ea(t){return!H0()||!Vt(t)?"":A0(t)}function G0(t){if(!Ft||t.isComposing||t.keyCode===229||t.key!=="Enter"||q0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||ne)return;let e=kf(t.target)??kf(document.activeElement);if(!e)return;if(t.altKey||yt){yt=!1,Ke=!0,queueMicrotask(()=>{Ke=!1});return}let n=Ea(e);n&&(xa(t),wa(n))}function U0(t){if(!Ft||ne||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Ke){Ke=!1;return}if(yt){yt=!1;return}let e=Of(t.target);if(!e)return;let n=Ea(e);n&&(xa(t),wa(n))}function K0(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||z(e))return null;let n=t.closest(Xn);if(n instanceof HTMLElement&&!z(n))return n;let r=Pe();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function If(t){if(!Ft)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${va}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&z(n)||ne||!K0(e))return;if(yt){yt=!1;return}let r=lt();if(!r)return;let o=Ea(r);o&&(xa(t),wa(o))}function W0(t){if(!Ft)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Ki)&&!e.querySelector(Wt)||ne)return;if(Ke){Ke=!1;return}if(yt){yt=!1;return}let n=lt()??e.querySelector(Wt);if(!n)return;let r=Ea(n);r&&(xa(t),wa(r))}var zf=E({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Tf,cleanupSelectors:[`#${va}`],settings:Ml,start(){Ft=!0;let t=Ml.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),$t=he(),P="",ne=!1,yt=!1,Ke=!1,B=null,U=!j()&&!dn()&&(Y()||ya()),G=!1,pt=!1,R=null,ct=null,clearTimeout(vn),vn=void 0,k(Tf,Sf),bo?.abort(),bo=new AbortController;let{signal:e}=bo,n={capture:!0,signal:e};window.addEventListener("keydown",G0,n),document.addEventListener("beforeinput",U0,n),document.addEventListener("pointerdown",If,n),document.addEventListener("click",If,n),document.addEventListener("submit",W0,n),ga?.(),ga=ft({onFall(r){if(Ft){if(r.userStopped||r.error){U=!1,G=!1,pt=!1,P="",ut();return}if(!(G&&!pt)){if(G&&pt){if(!wo())return;G=!1,pt=!1,U=!1,P=r.contextKey,yo(r.contextKey);return}if(!wo()){Ge.debug("unsettled fall; keep queue window");return}U=!1,P=r.contextKey,yo(r.contextKey)}}},onRise(){j()||dn()||(G&&(pt=!0),U=!0)},onContext(r,o){o&&r&&!X(o,r)&&(U=!1,G=!1,pt=!1,P="",ne=!1,Fe!==void 0&&(clearTimeout(Fe),Fe=void 0)),Cf(r),$t=r,ut()},onTick(r){Cf(r.contextKey),$t=r.contextKey,j0(),(j()||dn())&&(G=!1,pt=!1,U=!1,P=""),G&&(Y()||ya())&&(pt=!0),G&&pt&&wo()&&(G=!1,pt=!1,U=!1,Z(r.contextKey).length&&(P=r.contextKey,yo(r.contextKey))),!G&&U&&wo()&&(U=!1,!P&&Z(r.contextKey).length&&(P=r.contextKey,yo(r.contextKey))),!G&&P&&P===r.contextKey&&yo(P),Z(r.contextKey).length&&!Ue?.isConnected?ut():Ue&&Al(Ue)}}),ut(),Ge.debug("watch started")},stop(){Ft=!1,ga?.(),ga=null,bo?.abort(),bo=null,clearTimeout(Fe),Fe=void 0,clearTimeout(Eo),Eo=void 0,clearTimeout(vn),vn=void 0,ct=null,ze.clear(),B=null,P="",ne=!1,yt=!1,Ke=!1,U=!1,G=!1,pt=!1,Hl()}});var jf=`.bloom-cls {
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
`;var Kf=new C("ChatListStatus"),Gf="chatListStatus",La="bloom-cls",Y0="bloom-cls",X0=1200*1e3,Z0="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",zt=new Map,re=!1,kt="",be=!1,mr=!1,Ct=0,We=null,Pl=null,dr=null,Nl=null,Sa=null,So=null,fr=!1,Ve=new Set;function Ta(){return Date.now()}function Wf(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ye(t,e,n,r=!0){if(!(!t||!re)){if(e==="idle")zt.delete(t);else{let o=zt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ta():zt.set(t,{kind:e,at:Ta(),source:n})}r&&J0({v:1,id:t,kind:e,at:Ta()}),wn()}}function J0(t){try{dr?.postMessage(t)}catch{}}function Q0(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ye(e.id,e.kind,"bc",!1)}function ty(){let t=Ta();for(let[e,n]of zt)n.kind==="streaming"&&t-n.at>X0&&zt.delete(e)}function ey(){let t=Wf();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Z0))continue;let o=ue(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Uf(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Rl(t){let e=t.querySelector(`:scope > .${La}`);return e||null}function Ol(){if(!re)return;ty();let t=A(),e=ey();We?.disconnect();try{for(let n of e){let r=ue(n.getAttribute("href")||"");if(!r||!t||r!==t){Rl(n)?.remove();continue}let i=zt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Rl(n)?.remove();continue}let a=Rl(n);a||(a=document.createElement("span"),a.className=La,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Uf("streaming")):i==="error"&&a.appendChild(Uf("error")))}}catch(n){Kf.debug("paint failed",n)}Vf()}function wn(){if(re){if(document.hidden){Ct&&(cancelAnimationFrame(Ct),Ct=0),Ol();return}Ct||(Ct=requestAnimationFrame(()=>{Ct=0,re&&Ol()}))}}function Vf(){let t=Wf();if(!(We&&Pl===t&&t?.isConnected)){if(We?.disconnect(),Pl=t,!t){We=null;return}We=new MutationObserver(()=>wn()),We.observe(t,{childList:!0,subtree:!0})}}function ka(){return!!(an()||no())}function ny(t){return!!(fr||t&&Ve.has(t)||!mr&&!j()&&ka())}function ry(t){if(re){if(t.type==="post-start"){mr=!1,t.conversationId?(fr=!1,Ve.add(t.conversationId),be=!0,ye(t.conversationId,"streaming","net")):(fr=!0,be=!0);return}if(t.type==="post-end"){if(fr=!1,t.conversationId){Ve.delete(t.conversationId);let e=A(),n=Zn();(e?t.conversationId===e:t.conversationId===n)?ye(t.conversationId,t.error?"error":"done","net"):ye(t.conversationId,"idle","net")}ka()||(be=!1)}}}function oy(t,e){if(!re)return;if(X(e,t)){wn();return}let n=A();if(kt&&kt!==n){Ve.delete(kt);let r=zt.get(kt);r&&r.kind!=="idle"&&ye(kt,"idle","local")}fr=!1,be=!1,mr=!0,n&&zt.get(n)?.kind==="streaming"&&zt.get(n)?.source==="local"&&!Ve.has(n)&&ye(n,"idle","local"),wn()}function iy(t){if(!re)return;let e=t.conversationId||A();if(kt&&e&&kt!==e){Ve.delete(kt);let r=zt.get(kt);r&&r.kind!=="idle"&&ye(kt,"idle","local"),be=!!(e&&Ve.has(e))}if(e&&(kt=e),mr||j()){if(j()||ka()||t.streaming){wn();return}mr=!1}if(ny(e)&&(t.streaming||ka())){be=!0,e&&ye(e,"streaming","local"),wn();return}be&&(be=!1,e&&ye(e,Zt()?"error":"done","local")),wn()}var Yf=E({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${La}`],start(){re=!0,k(Gf,jf);try{dr=new BroadcastChannel(Y0)}catch{dr=null}dr?.addEventListener("message",Q0),Nl=wt(ry),Sa?.(),Sa=ft({onTick:iy,onContext:oy}),So?.abort(),So=new AbortController,document.addEventListener("visibilitychange",()=>{re&&(Ct&&(cancelAnimationFrame(Ct),Ct=0),Ol())},{signal:So.signal}),Vf(),Kf.debug("sidebar status watch started")},stop(){re=!1,Ct&&cancelAnimationFrame(Ct),Ct=0,So?.abort(),So=null,We?.disconnect(),We=null,Pl=null,Sa?.(),Sa=null,Nl?.(),Nl=null;try{dr?.close()}catch{}dr=null,zt.clear(),Ve.clear(),fr=!1,be=!1,mr=!1,kt="",document.querySelectorAll(`.${La}`).forEach(t=>t.remove()),L(Gf)}});var Zf="widerChat",Jf=40,Qf=96,tm=64,em=M({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Jf,max:Qf,default:tm}});function ay(){return at(Number(em.store.width??tm),Jf,Qf)}function Xf(){let t=ay(),e=`min(100%,${t}rem)`;k(Zf,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var nm=E({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:em,start:Xf,onSettingsChange:Xf,stop(){L(Zf)}});var Bl="composerOpacity",pr='form[data-type="unified-composer"],form.w-full[data-type]',sy=[`${pr} [class*="corner-superellipse"]`,`${pr} [class*="bg-token-bg-primary"]`,`${pr} [class*="bg-token-main-surface"]`].join(","),ly=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),cy="#thread-bottom-container,#thread-bottom",uy=`${pr} #prompt-textarea,${pr} [contenteditable="true"]`,dy="var(--bg-primary,var(--main-surface-primary,#ffffff))",Dl=M({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function fy(){return at(Number(Dl.store.opacity??100),0,100)}function my(){return at(Number(Dl.store.blur??16),0,40)}function rm(){let t=fy();if(t>=100){L(Bl);return}let e=my(),n=`color-mix(in srgb,${dy} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(Bl,`${cy}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${ly}{display:none!important}${pr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${sy}{background-color:${n}!important;background-image:none!important;${r}}${uy}{background-color:transparent!important;background-image:none!important}`)}var om=E({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Dl,start:rm,onSettingsChange:rm,stop(){L(Bl)}});var im=`#bloom-bn-host {
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
`;var gy=new C("BetterNavigator"),_l="betterNavigator",um="bloom-bn-host",Ln=60,am=16,zl=1e3,sm=2400,hy=80,dm=2.5,by=.4,To="\u6B63\u5728\u8F93\u51FA\u2026",jl="Image",yy="\u2753",vy="\u{1F916}",lm=/file_[0-9a-f]+/gi,xy="File",wy="Code",Ey=".markdown, .whitespace-pre-wrap",Xl=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Sy="img, picture, video, canvas",Ty=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,Ly=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,No=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,ky=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Cy=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,My=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,Ay=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,Hy=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,Iy=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Ny=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Ry=2e3,Py=40,Oy=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,fm=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),By=["#prompt-nav-container","[id*='prompt-nav' i]","[data-testid*='prompt-nav' i]","[aria-label='Prompt navigator' i]","[aria-label='Conversation navigator' i]","nav[aria-label*='prompt navigator' i]","nav[aria-label*='conversation navigator' i]"].join(", "),Dy=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),_y=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),qy=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),br=M({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),jt=new Map,Ao=new Map,oe=new Set,Aa=0,Ht=!1,xe=!1,gr=!1,Ye=null,Ro=null,yr=null,Ha=null,$=[],Tn="",Ia=0,Ho=-1,Io=0,hr="",At=0,ve=0,Lo,ko=null,Ca=null,ql=null,$l=null,En=null,Gl=null,Co=null,Sn=null,we=null,Mo=null,Na=!1,Ul=0;function vr(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Fl(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function $y(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function Fy(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Oy.test($y(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Fl(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Fl(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Fl(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function kn(t){try{return!!t.closest(Dy)}catch{return!0}}function cm(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Oa(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Zl(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function zy(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Ma(t,e){if(t){lm.lastIndex=0;for(let n of t.matchAll(lm))e.add(n[0].toLowerCase())}}function jy(t){try{let e=new Set,n=s=>{zy(s)||(Ma(s.getAttribute("src")||"",e),Ma(s.getAttribute("srcset")||"",e),Ma(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Ma(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Oa(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function Gy(t,e){let n=jy(t),r=Ao.get(e)??0,o=Math.max(r,n);return o>0&&Ao.set(e,o),o>=2?`${jl} x${o}`:jl}function K(t){return t.replace(/\s+/g," ").trim()}function mm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(_y))return!0;n=n.parentElement}return!1}function Ra(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(mm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(Xl);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return K(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Ln+20;)e.push(K(r.textContent||""));return K(e.join(" "))}function Po(t){let e=K(t);return e.length<3||e.length>180||No.test(e)?!1:Ty.test(e)?!0:Ly.test(e)}function Ba(t){let e=K(t);return e.length<8||e.length>120||/\s/.test(e)||No.test(e)||Po(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function Uy(t){let e=[],n=i=>{let a=K(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(K(s[1])),e.push(K(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function Ky(t){try{return kn(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function Jl(t){let e=K(t);return!e||Ql(e)||Ba(e)?!0:Po(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function Wy(t){return!t.length||t.length>4||!t.every(e=>Jl(e))?!1:t.some(e=>No.test(K(e))||Po(e)||Ba(e))}function pm(t){try{let e=null,n=0,r=`${Xl}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(Ky(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=Uy(o);if(!i.length||i.length>4||i.join(" ").length>240||!Wy(i))continue;let a=i.some(c=>No.test(K(c))),s=i.some(c=>Po(c)||Ba(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function Vy(t){return pm(t)?xy:""}function Yy(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(ky.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function Xy(t){try{for(let e of t.querySelectorAll(Sy))if(!Yy(e))return!0}catch{}return!1}function Ql(t){let e=K(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||Ay.test(e)||My.test(e)?!0:e.length<=24&&(Hy.test(e)||No.test(e))}function Zy(t){let e=[],n=new Set,r=o=>{try{if(mm(o,t)||o.closest(Xl))return}catch{return}let i=Ra(o);!i||n.has(i)||Ql(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>Ln+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Ra(o).length<24)&&(r(o),e.join(" ").length>Ln+20))break}}catch{}return K(e.join(" "))}function Jy(t){let e=pm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=K(i.innerText||i.textContent||"");!a||a.length>Ln+20||r.has(a)||Jl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return K(n.join(" "))}function Qy(t,e){let n=[];try{for(let o of t.querySelectorAll(Ey)){if(kn(o))continue;let i=Ra(o);if(!(!i||e==="assistant"&&Ql(i)||Jl(i))&&(n.push(i),n.join(" ").length>Ln+20))break}}catch{}let r=K(n.join(" "));if(e==="user"){let o=Jy(t);if(o)return o}return r||(e==="assistant"?Zy(t):"")}function gm(t){return t.length>Ln?`${t.slice(0,Ln).trimEnd()}\u2026`:t}function Kl(t){return Iy.test(t)}function tv(t,e,n,r){let o=Qy(t,e);if(o)return gm(o);if(r)return To;let i=Vy(t);if(i)return i;if(Zl(t))return Gy(t,Oa(t));try{if(Xy(t))return jl;if(t.querySelector("pre, code"))return wy}catch{}return`Message ${n+1}`}function ev(){if(xe)return!0;let t=A();return!!(t&&oe.has(t)||!gr&&!j()&&Oo())}function Oo(){return!!(an()||no())}function nv(){Aa=Date.now()}function hm(t){xe=!1,t&&oe.delete(t);let e=A();e&&oe.delete(e)}function rv(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function ov(t){if(Zl(t)||!Oo())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Ra(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function tc(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=K(e.textContent||"");if(!(n.length>32)&&Cy.test(n))return!0}}catch{}return!1}function bm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function iv(t,e){try{if(rv(t))return!0;if(!e)return!1;if(ov(t)||tc(t))return!0}catch{}return!1}function ym(t){if(!t||Oo())return!1;try{if(tc(t)||bm(t))return!1;if(t.querySelector(Ny)||Zl(t))return!0}catch{}return!1}function av(t){if(Oo()||Aa&&Date.now()-Aa<Ry)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!ym(e.el)||hm()}function sv(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(fm)){if(kn(r))continue;let i=Oa(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(kn(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function vm(t){let e=[t.getAttribute("data-message-id"),t.getAttribute("data-turn-id"),t.querySelector("[data-message-id]")?.getAttribute("data-message-id"),t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id")],n=[];for(let r of e)r&&!n.includes(r)&&n.push(r);return n}function lv(t){let e=br.store.showAssistant!==!1,n=e&&ev(),r=sv(t),o=null;if(e)for(let a of r)cm(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Oa(a);if(!s)continue;let l=cm(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&tc(a),d=c&&bm(a),f=l==="assistant"&&c&&!ym(a)&&(u||d||n||iv(a,!0)),m=tv(a,l,i.length,f);if(m&&m!==To){let h=jt.get(s),p=!!h&&(Po(h)||Ba(h));(!h||p||!Kl(m)||Kl(h))&&m!==h&&jt.set(s,m)}let g=f&&m===To?To:jt.get(s)||m;i.push({id:s,el:a,role:l,text:g,live:f})}}catch{}return i}function cv(t){let e=new Map;for(let n of t)if(e.set(n.id,n),!!n.el)for(let r of vm(n.el))e.set(r,n);return e}function uv(t,e){if(e)return e.text&&e.text!==To&&jt.set(t.id,e.text),{...e,id:t.id};let n=jt.get(t.id)||(t.alias?jt.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message"}}function dv(t,e){let n=br.store.showAssistant!==!1,r=cv(e),o=new Set,i=[];for(let s of t){if(s.role==="assistant"&&!n)continue;let l=r.get(s.id)||(s.alias?r.get(s.alias):void 0),c=uv(s,l);c.el&&o.add(c.el),i.push(c)}for(let s=0;s<e.length;s++){let l=e[s];if(!l.el||o.has(l.el))continue;let c=i.length;for(let u=s-1;u>=0;u--){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f+1;break}}if(c===i.length)for(let u=s+1;u<e.length;u++){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f;break}}i.splice(c,0,l),o.add(l.el)}let a=-1;for(let s=0;s<i.length;s++)i[s].role==="assistant"&&(a=s);for(let s=0;s<i.length;s++)i[s].live&&s!==a&&(i[s].live=!1);return i}function fv(t){if(kn(t))return!1;try{if(t.closest("#bloom-bn-host, #bloom-root, #bloom-sidebar-panel, #bloom-plugin-layer"))return!1}catch{return!1}let e=`${t.id} ${t.getAttribute("data-testid")||""} ${t.getAttribute("aria-label")||""}`;return/prompt-nav|promptnav|conversation-nav|prompt navigator|conversation navigator/i.test(e)}var xm=/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,mv=/^(?:go to message(?: \d+)?|message \d+|prompt navigator|conversation navigator|\d+)$/i;function pv(t){let e=["data-turn-id","data-message-id","data-goto-message-id","data-messageid","data-conversation-turn-id","data-scroll-to-id","data-id"];for(let r of e){let o=t.getAttribute(r)||"";if(o)return o}return(t.getAttribute("href")||"").match(xm)?.[0]??""}function gv(t){let e=t.getAttribute("aria-label")||t.getAttribute("title")||t.getAttribute("data-preview")||t.textContent||"";return gm(K(e))}function wm(t){return!t||t.startsWith("native:")||t.startsWith("anon:")||t.startsWith("mid:")?!1:xm.test(t)?!0:/^[a-zA-Z0-9_-]{8,}$/.test(t)}function hv(t){return!t||mv.test(t.trim())}function bv(){let t=[],e=new Set;try{for(let n of document.querySelectorAll(By))if(fv(n))for(let r of n.querySelectorAll("button, a, [role='button']")){if(kn(r))continue;let o=pv(r);if(!wm(o)||e.has(o))continue;e.add(o);let i=gv(r),a=nc(o);t.push({id:o,el:a?.isConnected?a:null,role:"user",text:i||"Message"})}}catch{}return t}function yv(t,e){if(!e.length)return t;let n=e.filter(i=>wm(i.id)&&!hv(i.text));if(!n.length)return t;let r=t.slice(),o=new Map;for(let i of r)if(o.set(i.id,i),i.el)for(let a of vm(i.el))o.set(a,i);for(let i=0;i<n.length;i++){let a=n[i],s=o.get(a.id);if(s){a.text&&(!s.text||Kl(s.text))&&(s.text=a.text,jt.set(s.id,a.text)),!s.el&&a.el?.isConnected&&(s.el=a.el);continue}let l=r.length;for(let u=i+1;u<n.length;u++){let d=o.get(n[u].id);if(!d)continue;let f=r.indexOf(d);if(f>=0){l=f;break}}let c={id:a.id,el:a.el,role:"user",text:a.text||"Message"};r.splice(l,0,c),o.set(c.id,c),jt.set(c.id,c.text)}return r}function vv(){let t=vr();if(!t||t===document.body)return[];let e=lv(t),n=A();n&&me(n);let r=n?$r(n):[],o=r.length?dv(r,e):e,i=yv(o,bv());return av(i),i}function Em(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Da(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function ec(t){return t===window?window.innerHeight:t.clientHeight}function xv(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(qy)}catch{return!1}}function Sm(){Lo!==void 0&&(clearTimeout(Lo),Lo=void 0),ko?.classList.remove("bloom-bn-flash"),ko=null}function Tm(t){Sm(),t.classList.add("bloom-bn-flash"),ko=t,Lo=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),ko===t&&(ko=null),Lo=void 0},800)}function Pa(t){if(!$.length)return;let e=Math.max(0,Math.min(t,$.length-1));Ia=e,Ro?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),yr?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),Ha&&(Ha.textContent=`${e+1} / ${$.length}`)}function Lm(t){if(Na)return;let e=yr?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function Wl(t){let e=$[t];if(!e)return;let n=e.el?.isConnected?e.el:nc(e.id);if(!n){Sv(t);return}e.el=n,Ho=t,Io=Date.now()+zl,Pa(t),Lm(t);let r=we??Da(n),i=Math.abs(n.getBoundingClientRect().top-Em())>dm*ec(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),br.store.jumpEffect!=="none"&&Tm(n)}function nc(t){let e=vr();if(!e||e===document.body||!t)return null;let n=[t],r=A(),i=(r?$r(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"]`)}catch{}if(!s||kn(s))continue;let l=s.closest(fm);return l instanceof HTMLElement?l:s}return null}function rc(){if(we)return we;let t=vr();return t?Da(t):window}function wv(t){let e=rc(),n=ec(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function Ev(t,e){let n=rc();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function Sv(t){let e=++Ul,n=$[t];if(!n)return;Ho=t,Io=Date.now()+sm+zl,Pa(t),Lm(t);let r=-1;for(let l=0;l<$.length;l++)$[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+sm,a=0,s=-1;for(;Date.now()<i;){if(e!==Ul||!Ht)return;let l=nc(n.id);if(l){n.el=l,Io=Date.now()+zl;let d=we??Da(l),m=Math.abs(l.getBoundingClientRect().top-Em())>dm*ec(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),br.store.jumpEffect!=="none"&&Tm(l),Mt();return}let c=rc(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&Ev(o,u))break;wv(o),await new Promise(d=>setTimeout(d,hy))}}function oc(){if(!Ht||!$.length)return;if(Date.now()<Io&&Ho>=0){Pa(Ho);return}let t=window.innerHeight*by,e=0;for(let n=0;n<$.length;n++){let r=$[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Pa(e)}function Tv(t){let e=Da(t);if(we===e&&Mo)return;Mo?.(),we=e;let n=e===window?document:e,r=()=>{oc(),ic()};n.addEventListener("scroll",r,{passive:!0}),Mo=()=>n.removeEventListener("scroll",r)}function Lv(t){Sn?.disconnect(),Sn=null;let e=we instanceof HTMLElement?we:null;Sn=new IntersectionObserver(()=>oc(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&Sn.observe(n.el)}function kv(){if(!document.body)return null;let t=Ye;if(t?.isConnected)return t;t=document.createElement("div"),t.id=um,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{Na=!0}),n.addEventListener("pointerleave",()=>{Na=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Ye=t,Ro=e,yr=i,Ha=o,t}function km(){let t=Ye,e=vr();if(!t||!e||!e.isConnected||$.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=Fy(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Py,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function ic(){!Ht||ve||(ve=requestAnimationFrame(()=>{ve=0,Ht&&km()}))}function Cv(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Mv(t){let e=Ro,n=yr;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>am),e.classList.toggle("bloom-bn-fit",t.length>am),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Cv(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Wl(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?yy:vy;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Wl(o)}),n.appendChild(a)}))}function Av(t){Ro?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=yr?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Hv(){let t=A();return t===hr?!1:(hr=t,jt.clear(),Ao.clear(),$=[],Tn="",Ia=0,Ho=-1,Io=0,xe&&t&&(oe.add(t),xe=!1),t&&me(t),!0)}function Iv(t){let e=br.store.showAssistant!==!1?"1":"0";return`${hr}|${e}|${t.map(n=>n.id).join(",")}`}function Vl(){if(!Ht)return;Hv();let t=vv(),e=vr();if(!e||t.length<1){$=t,Tn="",Ye&&(Ye.hidden=!0),Sn?.disconnect(),Yl();return}kv();let n=Iv(t);n!==Tn?($=t,Tn=n,Mv(t),Tv(e),Lv(t)):($=t,Av(t)),km(),oc(),Yl()}function Mt(){if(Ht){if(document.hidden){At&&(cancelAnimationFrame(At),At=0),Vl();return}At||(At=requestAnimationFrame(()=>{At=0,Ht&&Vl()}))}}function Yl(){let t=vr();if(!(En&&Gl===t&&t?.isConnected)){if(En?.disconnect(),Co?.disconnect(),Gl=t,!t||t===document.body){En=null;return}En=new MutationObserver(()=>Mt()),En.observe(t,{childList:!0,subtree:!0}),Co=new ResizeObserver(()=>ic()),Co.observe(t)}}function Nv(t){if(Ht){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===A())&&Mt();return}if(t.type==="post-start"){nv(),gr=!1,t.conversationId?(xe=!1,oe.add(t.conversationId)):xe=!0,Mt();return}if(t.type==="post-end"){if(xe=!1,t.conversationId)oe.delete(t.conversationId);else{let e=A();e&&oe.delete(e)}Mt()}}}function Rv(t){if(!Ht||!$.length||Ye?.hidden||t.altKey||t.ctrlKey||t.metaKey||xv(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Ia+1;else if(t.key==="ArrowUp")e=Ia-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=$.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Wl(Math.max(0,Math.min(e,$.length-1)))}function Pv(){Ul++,Sm(),Sn?.disconnect(),Sn=null,En?.disconnect(),En=null,Gl=null,Co?.disconnect(),Co=null,Mo?.(),Mo=null,we=null,Na=!1,Ye?.remove(),Ye=null,Ro=null,yr=null,Ha=null}var Cm=E({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted yet. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:_l,cleanupSelectors:[`#${um}`],settings:br,start(){Ht=!0,hr=A(),hr&&me(hr),k(_l,im),Ca=new AbortController;let{signal:t}=Ca;window.addEventListener("keydown",Rv,{signal:t}),window.addEventListener("popstate",Mt,{signal:t}),window.visualViewport?.addEventListener("resize",ic,{signal:t}),document.addEventListener("visibilitychange",()=>{Ht&&(At&&(cancelAnimationFrame(At),At=0),ve&&(cancelAnimationFrame(ve),ve=0),Vl())},{signal:t}),$l=wt(Nv),ql=ft({onTick(){if(j()){Mt();return}gr&&!Oo()&&(gr=!1),Mt()},onFall(e){hm(e.conversationId),Mt()},onContext(e,n){if(!X(n,e)){jt.clear(),Ao.clear(),Tn="",xe=!1;let o=A();for(let i of[...oe])i!==o&&oe.delete(i);gr=!0}let r=A();r&&me(r),Mt()}}),Yl(),Mt(),gy.debug("navigator started")},stop(){Ht=!1,At&&cancelAnimationFrame(At),At=0,ve&&cancelAnimationFrame(ve),ve=0,Ca?.abort(),Ca=null,ql?.(),ql=null,$l?.(),$l=null,oe.clear(),xe=!1,gr=!1,Aa=0,Pv(),jt.clear(),Ao.clear(),$=[],Tn="",L(_l)},onSettingsChange(){Tn="",Mt()}});var Mm=`.bloom-ts {
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
`;function Am(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Hm(t){try{return new Date(t).toISOString()}catch{return""}}var Rm=new C("MessageTimestamps"),Im="messageTimestamps",qa="bloom-ts",Nm=1500,Bv="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",xr=M({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),wr=new Map,An=!1,It=0,Xe=null,sc=null,ac=null,_a=null,Bo=null,Do=!1,Cn=!1;function Pm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function cc(){let t=xr.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Om(){let t={...cc()};for(let[n,r]of wr)t[n]=r;let e=Object.keys(t);if(e.length>Nm){let n=e.slice(e.length-Nm),r={};for(let o of n)r[o]=t[o];xr.store.stamps=r;return}xr.store.stamps=t}var Dv=Uc(Om,500);function Bm(t,e){!t||!e||wr.get(t)===e||(wr.set(t,e),Dv(),Mn())}function _v(t){return t?wr.get(t)??cc()[t]??vi(t)??null:null}function qv(t){An&&t.type==="message-time"&&Bm(t.messageId,t.createTime)}function $v(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Fv(){let t=Pm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Bv)||e.push(n)}catch{}return e}function zv(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function lc(){if(!An)return;let t=xr.store.hideOwnMessages===!0,e=xr.store.showDate!==!1,n=Y();Cn&&!j()&&(Cn=!1),Cn&&(n?Do=!1:Cn=!1);let r=Cn?!1:n,o=Fv();Xe?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=$v(i),c=i.querySelector(`:scope > .${qa}`);if(t&&l==="user"){c?.remove();return}if(zv(i)){c?.remove();return}let u=_v(s);if(!u&&s&&(r||Do)&&a>=o.length-2&&(u=Date.now(),Bm(s,u)),!u){c?.remove();return}let d=Am(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=qa,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=Hm(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){Rm.debug("paint failed",i)}Do=r,Dm()}function Mn(){if(An){if(document.hidden){It&&(cancelAnimationFrame(It),It=0),lc();return}It||(It=requestAnimationFrame(()=>{It=0,An&&lc()}))}}function Dm(){let t=Pm();if(!(Xe&&sc===t&&t?.isConnected)){if(Xe?.disconnect(),sc=t,!t||t===document.body){Xe=null;return}Xe=new MutationObserver(()=>Mn()),Xe.observe(t,{childList:!0,subtree:!0})}}var _m=E({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${qa}`],settings:xr,start(){An=!0,k(Im,Mm);let t=cc();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&wr.set(e,n);ac=wt(qv),_a?.(),_a=ft({onTick:Mn,onFall:Mn,onContext(e,n){X(n,e)||(Cn=!0,Do=!1),Mn()}}),Bo?.abort(),Bo=new AbortController,document.addEventListener("visibilitychange",()=>{An&&(It&&(cancelAnimationFrame(It),It=0),lc())},{signal:Bo.signal}),Dm(),Mn(),Rm.debug("timestamp watch started")},stop(){An=!1,It&&cancelAnimationFrame(It),It=0,Bo?.abort(),Bo=null,Xe?.disconnect(),Xe=null,sc=null,_a?.(),_a=null,ac?.(),ac=null,Cn=!1,Do=!1,Om(),wr.clear(),document.querySelectorAll(`.${qa}`).forEach(t=>t.remove()),L(Im)},onSettingsChange:Mn});var uc="streamerMode",jv="filter:blur(6px)!important;transition:filter .2s ease",Gv="filter:none!important",Er=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Sr=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function Nt(t,e){return t.map(n=>`${n} ${e}`)}var Hn=M({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Tr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${jv}}${e?`${r}{${Gv}}`:""}`}function qm(){let t=[];if(Hn.store.conversations!==!1&&(t.push(Tr([...Nt(Sr,'a[href^="/c/"]'),...Nt(Sr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Hn.store.projects!==!1&&(t.push(Tr([...Nt(Sr,'a[href*="/project"]'),...Nt(Sr,'a[href*="/g/g-p-"]'),...Nt(Sr,'[data-testid="project-name"]'),...Nt(Sr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Hn.store.headerTitle!==!1&&t.push(Tr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Hn.store.accountAvatar!==!1&&t.push(Tr([...Nt(Er,"img"),...Nt(Er,'[class*="avatar"]'),...Nt(Er,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Hn.store.accountName!==!1&&t.push(Tr([...Nt(Er,".min-w-0 > .truncate"),...Nt(Er,".min-w-0.flex-1 .truncate")],!1)),Hn.store.accountEmail!==!1&&t.push(Tr([...Nt(Er,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){L(uc);return}k(uc,t.join(`
`))}var $m=E({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Hn,start:qm,onSettingsChange:qm,stop(){L(uc)}});var Fm=`.bloom-gc-panel {
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
}`;var Kv=new C("GreetingCustomizer"),Lr="greetingCustomizer",zm="greetingCustomizerUi",_o=100,fc=30,Wv=120,Vv=1e3,Yv=50,Xv=40,Zv=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),qo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ga=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Jv(t){return!!t?.closest(Zv)}function Km(t){return!!(Jv(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Ko(t){try{for(let e of document.querySelectorAll(t))if(!Km(e))return e}catch{}return null}function dc(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Ko(e))return e;return t}var Wm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],rt=M({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:px},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Wm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),ie=!1,Mr=!1,Nn=null,Fa,$o,kr,Fo,za=0,$a=null,Cr=null,zo=null,jo=null,Go=null,ja=null;function Se(){let t=location.pathname||"/";return t==="/"||t===""}function In(){let t=rt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Wm.slice()}function Uo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function jm(t){rt.store.greetings=t.slice(0,fc)}function Wo(){let t=String(rt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Qv(){return rt.store.order==="random"?"random":"sequential"}function tx(){return at(Number(rt.store.intervalSec??10),1,3600)*1e3}function ex(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function nx(){return!!Ko(Ga)}function Ua(){return!!(Ko(Ga)||Ko(qo))}function rx(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=nx()?dc(Ga):Ko(qo)?dc(qo):dc(Ga),i=e?`${qo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function ox(t,e){if(t<=0)return 0;if(t===1)return Number(rt.plain.index)!==0&&(rt.store.index=0),Number(rt.plain.lastRandom)!==0&&(rt.store.lastRandom=0),0;let n=Number(rt.plain.index),r=Number(rt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Qv()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return rt.store.index=s,rt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return rt.store.index=i,i}function Ee(t){if(!ie)return;if(!Se()){L(Lr);return}let e=In().map(Uo).filter(Boolean);if(!e.length){L(Lr);return}let n=ox(e.length,t),r=e[n]??e[0],o=Wo()==="manual"&&e.length>1;k(Lr,rx(ex(r),o)),ja?.()}function mc(){Fa!==void 0&&(clearInterval(Fa),Fa=void 0)}function pc(){mc(),!(!ie||!Se())&&Wo()==="interval"&&(In().filter(Boolean).length<=1||(Fa=setInterval(()=>Ee(!0),tx())))}function gc(){Fo!==void 0&&(clearTimeout(Fo),Fo=void 0),za=0}function Gm(){if(gc(),!ie||!Se())return;za=Xv;let t=()=>{if(Fo=void 0,!(!ie||!Se())){if(Ua()){Wo()==="refresh"&&!Mr?(Mr=!0,Ee(!0)):Ee(!1),pc();return}za-=1,za>0&&(Fo=setTimeout(t,Yv))}};t()}function hc(){if(Nn===!0){Ua()?Ee(!1):Gm();return}Nn=!0,Mr=!1,Wo()==="refresh"?(Mr=!0,Ee(!0)):Ee(!1),pc(),Ua()||Gm()}function bc(){Nn=!1,Mr=!1,mc(),gc(),L(Lr)}function Ka(){kr===void 0&&(kr=window.setTimeout(()=>{kr=void 0,ie&&(Se()?hc():Nn!==!1&&bc())},Wv))}function ix(){Cr||(Cr=history.pushState.bind(history),zo=history.replaceState.bind(history),jo=function(...e){let n=Cr(...e);return Ka(),n},Go=function(...e){let n=zo(...e);return Ka(),n},history.pushState=jo,history.replaceState=Go)}function ax(){jo&&history.pushState===jo&&Cr&&(history.pushState=Cr),Go&&history.replaceState===Go&&zo&&(history.replaceState=zo),Cr=null,zo=null,jo=null,Go=null}function sx(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Ka)}function lx(t){if(!ie||!Se()||Wo()!=="manual"||In().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(qo);if(!n||Km(n))return;let r=window.getSelection?.();r&&String(r).trim()||Ee(!0)}function cx(){$o===void 0&&($o=setInterval(()=>{if(!ie)return;let t=Se();if(t!==(Nn===!0)){t?hc():bc();return}t&&Ua()&&Ee(!1)},Vv))}function ux(){$o!==void 0&&(clearInterval($o),$o=void 0)}function Um(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var dx="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",fx="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function mx(t,e){let n=Uo(t);return n?n.length>_o?`Keep it to ${_o} characters.`:In().length+(e?1:0)>fc?`At most ${fc} greetings.`:null:"Enter a greeting."}function px(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=In(),s=Number(rt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=_o,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let p=l.querySelector(".bloom-gc-count");p&&(p.textContent=`${Uo(e).length}/${_o}`);let w=l.querySelector(".bloom-gc-error");w&&(w.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Uo(e).length}/${_o}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let p=document.createElement("button");p.type="button",p.className="bloom-gc-btn",p.textContent="Cancel",p.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(p)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let p=n<0,w=mx(e,p);if(w){r=w,i();return}let b=Uo(e),v=In().slice();n>=0&&n<v.length?v[n]=b:v.push(b),jm(v),n=-1,e="",r="",i()}),m.appendChild(g),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let p=document.createElement("p");p.className="bloom-gc-empty",p.textContent="No greetings. The official heading stays.",t.appendChild(p);return}let h=document.createElement("div");h.className="bloom-gc-list",a.forEach((p,w)=>{let b=document.createElement("div");b.className="bloom-gc-item",w===s&&(b.dataset.active="true");let v=document.createElement("button");v.type="button",v.className=`bloom-gc-body${o===w?"":" bloom-gc-clamp"}`,v.textContent=p,v.addEventListener("click",()=>{o=o===w?-1:w,i()});let ot=document.createElement("div");ot.className="bloom-gc-item-actions";let W=Um("Edit",dx);W.addEventListener("click",()=>{n=w,e=p,r="",i()});let J=Um("Delete",fx);J.addEventListener("click",()=>{let O=In().filter((dt,vt)=>vt!==w);jm(O),n===w?(n=-1,e=""):n>w&&(n-=1),i()}),ot.append(W,J),b.append(v,ot),h.appendChild(b)}),t.appendChild(h)};return ja=i,i(),()=>{ja===i&&(ja=null),t.replaceChildren()}}var Vm=E({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:zm,settings:rt,start(){ie=!0,k(zm,Fm),ix(),$a=new AbortController;let{signal:t}=$a;window.addEventListener("popstate",Ka,{signal:t}),document.addEventListener("click",sx,{capture:!0,signal:t}),document.addEventListener("click",lx,{signal:t}),cx(),Nn=null,Se()?hc():bc(),Kv.debug("started")},stop(){ie=!1,$a?.abort(),$a=null,kr!==void 0&&(clearTimeout(kr),kr=void 0),mc(),gc(),ux(),ax(),L(Lr),Mr=!1,Nn=null},onSettingsChange(){ie&&(Se()?(Ee(!1),pc()):L(Lr))}});function gx(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Wa(t){try{return await createImageBitmap(t)}catch{return null}}async function hx(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Va(t){if(t.startsWith("data:")){let e=gx(t);if(e){let n=await Wa(e);if(n)return n}return hx(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Wa(await e.blob()):null}catch{return null}}var Xa="data-bloom-csi-slot",bx="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",yx=/\bsize-(?:[6-9]|10)\b/,vx=/\b(?:h|w)-(?:[6-9]|10)\b/,xx=/^(plus|pro|free|team|go|business|enterprise)$/i,wx=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Ya(t){return t.getAttribute("class")||""}function Xm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||yx.test(t)?!0:vx.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Ex(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Zm(e)}function Zm(t){return xx.test(String(t??"").replace(/\s+/g,""))}function ae(t){return!!t?.closest(bx)}function Za(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Vo(t){let e=Ya(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Zm(t.textContent||"")}function Ja(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Yo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Sx(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Jm(t){if(ae(t)||Ja(t)||Yo(t)||Vo(t)||Za(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Qm(t){return ae(t)||Ja(t)||Yo(t)||Vo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Ex(t.textContent||"")}function tp(t){return ae(t)||Yo(t)||Za(t)||Vo(t)?!1:Xm(Ya(t))||Qm(t)?!0:Jm(t)}function Ym(t){return!(ae(t)||Za(t)||Yo(t)||Vo(t)||Ja(t))}function Rn(t,e){let n=Ja(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Yo(n)||Za(n)||Vo(n));)ae(n)||(r=n),n=n.parentElement;return r}function Tx(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||ae(e))continue;if(Sx(Ya(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Ym(o))){if(tp(o)||Xm(Ya(o)))return Rn(o,t)??o;r.push(o)}if(r.length===1)return Rn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Ym(r))return Rn(r,t)??r}}return null}function Lx(t){let e=t.querySelectorAll(wx);for(let n of e)if(tp(n))return Rn(n,t)??n;return null}function kx(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Qm(e))return Rn(e,t)??e;return null}function Cx(t){for(let e of t.querySelectorAll("*"))if(Jm(e))return Rn(e,t)??e;return null}function ep(t,e){if(ae(t))return null;if(e&&!ae(e)&&t.contains(e)){let n=Rn(e,t);if(n)return n}return Tx(t)??Lx(t)??kx(t)??Cx(t)}function np(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Ar="data-bloom-csi",Qa="data-bloom-csi-orig",Pn=new Set,rp=null;function vc(t){rp=t}function op(t){return`url(${JSON.stringify(t)})`}function ts(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function xc(t,e,n){let r=op(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function ip(t,e=Xa){let n=op(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function Mx(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Hr(t){t.removeEventListener("error",yc);let e=t.getAttribute(Qa);t.removeAttribute(Ar),t.removeAttribute(Qa),e&&t.getAttribute("src")!==e&&(t.src=e)}function yc(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Pn.add(n),Hr(e),rp?.()}function ap(t,e){if(!e||Pn.has(e)){Hr(t);return}Mx(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Ar)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Qa)&&t.setAttribute(Qa,n);t.setAttribute(Ar,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",yc),t.addEventListener("error",yc),n!==e&&(t.src=e)}var sp=`/*
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
`;var lp=new C("CustomSidebarIdentity"),cp="customSidebarIdentityUi",fp="customSidebarIdentity",Hx="bloom-csi-face",Ix="bloom-csi-name",Ir=Xa,Nx=1024,es=256,mp=24,pp=64,gp=40,Tc=1,Lc=4,Xo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],wc=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=M({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Xx},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:mp,max:pp,default:gp},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Bn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Rx(){return String(T.store.displayName??"").trim()}function os(t,e,n,r,o){let i=at(n,Tc,Lc),a=Math.min(t,e)/i,s=at(r,a/2,Math.max(a/2,t-a/2)),l=at(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Px(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function kc(t){let e=Math.min(1,Nx/Math.max(t.width,t.height));return Px(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Ox(t,e,n,r){let{side:o,x:i,y:a}=os(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=es,s.height=es;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,es,es);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Bx(t){let e=await Wa(t);if(!e)return null;let n=kc(e);return e.close(),n}async function Mc(t,e,n,r){let o=await Va(t);if(!o)return null;let i=Ox(o,e,n,r);return o.close(),i}function Ac(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function up(){T.store.avatarUrl="",T.store.avatarSource="",Ac()}var dp=0;async function Cc(t){let e=++dp;Ac(),T.store.avatarSource=t;let n=await Mc(t,.5,.5,1);return e!==dp?!1:(n&&(T.store.avatarUrl=n),!!n)}function Zo(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Ec(t){let e=Zo(t);if(!e)return!1;let n=await Bx(e);return n?Cc(n):!1}var Rt=!1,Nr=!1,Rr=0,is=0,ns=null,Ze=new Map,Pr=null,Te=null,as=null,se=null,ss=null;function ls(t){let e=String(t??"").trim();if(!e||Pn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function hp(){return ls(T.store.avatarUrl)??ls(T.store.avatarSource)}var rs=!1,Sc=new Set;function bp(){let t=ls(T.store.avatarSource);if(!t?.startsWith("data:image/")||ls(T.store.avatarUrl)?.startsWith("data:image/")||rs||Sc.has(t))return;rs=!0;let e=Bn(T.store.cropX,.5),n=Bn(T.store.cropY,.5),r=Bn(T.store.cropZoom,1);Mc(t,e,n,r).then(o=>{if(rs=!1,!o){Sc.add(t);return}Rt&&(T.store.avatarUrl=o,cs())}).catch(()=>{rs=!1,Sc.add(t)})}function On(t,e){return t.map(n=>`${n} ${e}`)}function Dx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function _x(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Dx(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function yp(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||ae(n)||n.closest(".min-w-0")||e.push(n);return e}function qx(t){let e=yp(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Hc(){let t=[],e=en();e&&t.push(e);let n=Kn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Xo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function vp(t,e){let n=qx(t);if(n)ap(n,e);else for(let o of yp(t))Hr(o);let r=ep(t,n);for(let o of t.querySelectorAll(`[${Ir}]`))o!==r&&o.removeAttribute(Ir);r&&r.setAttribute(Ir,"")}function $x(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Fx(t,e){let n=$x(t);n&&vp(n,e)}function zx(){for(let t of document.querySelectorAll(`img[${Ar}]`))Hr(t);for(let t of document.querySelectorAll(`[${Ir}]`))t.removeAttribute(Ir)}function jx(){let t=at(Math.round(Bn(T.store.avatarSize,gp)),mp,pp),e=hp(),n=Rx(),r=T.store.applyToMenu!==!1,o=[],i=[...On(Xo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...On(wc,"> :first-child img"));let a=[...On(Xo,".min-w-0 > .truncate"),...On(Xo,".min-w-0.flex-1 .truncate")];r&&a.push(...On(wc,"> :first-child .truncate"));let s=np(Ir);o.push(ts([...s.flatMap(l=>On(Xo,l))].join(","),t)),o.push(ts(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(ts(s.flatMap(l=>On(wc,`> :first-child ${l}`)).join(","),t)),e&&(o.push(xc(i.join(","),e,t)),o.push(xc("#stage-sidebar-tiny-bar img",e,32)),o.push(ip(e))),n&&o.push(_x(a,n)),k(fp,o.join(""))}function Gx(){let t=hp(),e=Hc();for(let n of e)vp(n,t);if(T.store.applyToMenu!==!1){let n=Wn();n&&Fx(n,t)}for(let n of document.querySelectorAll(`img[${Ar}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Hr(n)}function cs(){if(!(!Rt||Nr)){Nr=!0;for(let t of Ze.values())t.disconnect();Te?.disconnect(),se?.disconnect();try{jx(),Gx()}finally{Nr=!1,Ic(),Vx(),Pr?.isConnected&&xp(Pr),bp()}}}function Jo(){!Rt||Rr||(Rr=requestAnimationFrame(()=>{Rr=0,cs()}))}function Ux(){Nr||!Rt||Jo()}function Kx(t){if(Ze.has(t))return;let e=new MutationObserver(Ux);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ze.set(t,e)}function Wx(t){Ze.get(t)?.disconnect(),Ze.delete(t)}function Ic(){let t=new Set;for(let n of Hc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Kn();e&&t.add(e);for(let n of[...Ze.keys()])(!t.has(n)||!n.isConnected)&&Wx(n);for(let n of t)n.isConnected&&Kx(n)}function Vx(){let t=Mi();if(!t){se?.disconnect(),se=null,as=null;return}if(as===t&&se){se.observe(t,{childList:!0});return}se?.disconnect(),as=t,se=new MutationObserver(()=>{Nr||!Rt||(Ic(),Jo())}),se.observe(t,{childList:!0})}function xp(t){Pr===t&&Te||(Te?.disconnect(),Pr=t,Te=new MutationObserver(()=>{if(!t.isConnected){Te?.disconnect(),Te=null,Pr=null;return}Nr||!Rt||Jo()}),Te.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function wp(t){if(!Rt||T.store.applyToMenu===!1)return;let e=Wn();if(e){xp(e),Jo();return}t<=0||requestAnimationFrame(()=>wp(t-1))}function Ep(t){Rt&&(cs(),!(Hc().length||t<=0)&&(is=requestAnimationFrame(()=>Ep(t-1))))}function Yx(t){Rt&&T.store.applyToMenu!==!1&&(!Ai(t)&&!Wn()||wp(10))}function Xx(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,m.appendChild(g);let h=document.createElement("div");h.className="bloom-csi-zoom-row";let p=document.createElement("input");p.type="range",p.className="bloom-csi-zoom",p.min=String(Tc),p.max=String(Lc),p.step="0.05",p.setAttribute("aria-label","Zoom");let w=document.createElement("span");w.className="bloom-csi-zoom-val";let b=document.createElement("button");b.type="button",b.className="bloom-csi-btn",b.textContent="Reset",h.append(p,w,b);let v=document.createElement("p");v.className="bloom-csi-hint",v.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,h,v),t.append(u,d,f);function ot(){let x=String(T.store.avatarSource??""),N=String(T.store.avatarUrl??"");return x.startsWith("data:image/")?x:N.startsWith("data:image/")?N:""}function W(x,N,y){if(!a)return i.x=x,i.y=N,i.zoom=at(y,Tc,Lc),i;let H=os(a.w,a.h,y,x*a.w,N*a.h);return i.x=H.x/a.w,i.y=H.y/a.h,i.zoom=H.z,i}function J(){p.value=String(i.zoom),w.textContent=`${Math.round(i.zoom*100)}%`;let x=a?os(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;x&&a&&(g.style.width=`${a.w/x.side*100}%`,g.style.height=`${a.h/x.side*100}%`,g.style.left=`${(.5-x.x/x.side)*100}%`,g.style.top=`${(.5-x.y/x.side)*100}%`)}function O(x=!1){let N=ot(),y=String(T.store.avatarUrl??"").trim(),H=!!N;s.hidden=!y&&!N,(N||y)&&(s.src=N||y),document.activeElement!==l&&(l.value=H?"":y),l.placeholder=H?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!N,d.hidden=!(e&&/^https?:\/\//.test(y)&&!N),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",N&&(x&&(i.x=Bn(T.store.cropX,.5),i.y=Bn(T.store.cropY,.5),i.zoom=Bn(T.store.cropZoom,1)),g.getAttribute("src")!==N&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},W(i.x,i.y,i.zoom),J()},g.src=N),J())}function dt(x,N,y,H=!1){W(x,N,y),J();let gt=ot(),xt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,gt&&Mc(gt,i.x,i.y,i.zoom).then(I=>{I&&(T.store.avatarUrl=I)})};r&&clearTimeout(r),H?xt():r=setTimeout(xt,80)}function vt(x){T.store.avatarUrl=x;let N=x.trim();if(n&&clearTimeout(n),!N){T.store.avatarSource="",Ac(),e=!1,O(!0);return}if(N.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Va(N).then(y=>{if(!y)return;let H=kc(y);y.close(),H&&Cc(H).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(N)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{Va(N).then(y=>{if(!y){e=!0,O(!0);return}let H=kc(y);y.close(),H?(e=!1,Cc(H).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",x=>{Zo(x.clipboardData)&&(x.preventDefault(),e=!1,Ec(x.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",x=>{Zo(x.dataTransfer)&&x.preventDefault()}),u.addEventListener("drop",x=>{Zo(x.dataTransfer)&&(x.preventDefault(),e=!1,Ec(x.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>vt(l.value)),l.addEventListener("paste",x=>{Zo(x.clipboardData)&&(x.preventDefault(),e=!1,Ec(x.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",x=>{ot()&&!l.value&&(x.key==="Backspace"||x.key==="Delete")&&(up(),e=!1,O(!0))}),c.addEventListener("click",()=>{up(),e=!1,O(!0)}),m.addEventListener("pointerdown",x=>{x.button===0&&(m.setPointerCapture(x.pointerId),o.on=!0,o.px=x.clientX,o.py=x.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",x=>{if(!o.on||!a)return;let N=m.clientWidth;if(!N)return;let{side:y}=os(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);W(o.x-(x.clientX-o.px)*(y/N)/a.w,o.y-(x.clientY-o.py)*(y/N)/a.h,i.zoom),J()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,dt(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",x=>{x.preventDefault(),dt(i.x,i.y,i.zoom*(x.deltaY<0?1.08:1/1.08))},{passive:!1}),p.addEventListener("input",()=>dt(i.x,i.y,Number(p.value))),p.addEventListener("change",()=>dt(i.x,i.y,Number(p.value),!0)),b.addEventListener("click",()=>dt(.5,.5,1,!0));let Qo=()=>O(!1);return ss=Qo,O(!0),()=>{ss===Qo&&(ss=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Sp=E({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:cp,cleanupSelectors:[`.${Hx}`,`.${Ix}`],settings:T,start(){Rt=!0,Pn.clear(),vc(Jo),k(cp,sp),ns=new AbortController,document.addEventListener("click",Yx,{signal:ns.signal}),Ep(40),bp(),lp.debug("started")},onSettingsChange(){Pn.clear(),ss?.(),Rt&&(Ic(),cs())},stop(){Rt=!1,ns?.abort(),ns=null,Rr&&cancelAnimationFrame(Rr),Rr=0,is&&cancelAnimationFrame(is),is=0;for(let t of Ze.values())t.disconnect();Ze.clear(),Te?.disconnect(),Te=null,Pr=null,se?.disconnect(),se=null,as=null,zx(),L(fp),vc(null),Pn.clear(),lp.debug("stopped")}});var Or=new C("Bloom"),Tp=!1,Zx=Date.now(),Jx=[Ju,Od,Gd,Wd,Jd,rf,bf,vf,Ef,zf,Yf,nm,om,Cm,_m,$m,Vm,Sp];function us(t){return new Promise(e=>setTimeout(e,t))}function Qx(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function tw(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var kp=8e3,Lp=300,ew=250;async function nw(){if(tn())return await us(Lp),!0;for(;Date.now()-Zx<kp;)if(await us(ew),tn())return await us(Lp),!0;return tn()||Hs()}function Nc(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function rw(){if(Nc())return!0;let t=Date.now()+kp;for(;Date.now()<t;)if(await us(100),Nc())return!0;return Nc()}function ow(){try{GM_registerMenuCommand?.("Bloom++ settings",Zu)}catch{}}function iw(){wi(()=>{Dr("HostShell"),Or.info("host shell",Et)}),Ei(()=>{Or.info("idle ready",Et)}),Si(()=>{ms(),Dr("HostReady"),Or.info("chrome ready",Et)})}async function Rc(){await Vc()}async function Pc(){if(Tp)return;Tp=!0,Su();let t=A();t&&me(t);for(let r of Jx)try{eu(r),Iu(r)}catch(o){Or.error("register failed",r.name,o)}Dr("Init"),ow(),iw();let e=()=>Dr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Qx(),ms(),Or.info("styles ready",Et),await tw(),rw().then(r=>{r&&Ti()}),!await nw()){Or.warn("late islands not detected; starting default plugins",Et),jn(),Li();return}await Au()}var Cp=typeof unsafeWindow<"u"?unsafeWindow:window,aw=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||aw){let t=Cp.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Et);try{Object.defineProperty(Cp,"Bloom",{value:Oc,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Rc().then(()=>Pc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
