// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.107
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

/* Bloom++ [20260924] v1.4.107. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Bp=Object.defineProperty;var Dp=(t,e)=>{for(var n in e)Bp(t,n,{get:e[n],enumerable:!0})};var jc={};Dp(jc,{REPO_URL:()=>Du,Settings:()=>z,VERSION:()=>Et,contextKeyFromUrl:()=>ce,conversationChain:()=>Ur,conversationTitle:()=>Gn,conversationToken:()=>Pt,currentConversationId:()=>A,ensureConversationChain:()=>jn,hasDraftText:()=>Vt,hasErrorToast:()=>Zt,hasLateIslands:()=>Qe,init:()=>zc,initSettings:()=>Fc,isDocumentInteractive:()=>qu,isStreaming:()=>Y,isUserDraftEmpty:()=>Ie,messageCreateTime:()=>Si,plugins:()=>le,requestChromeReady:()=>Ai,requestIdleReady:()=>Un,requestShellReady:()=>Mi,setEditorText:()=>me,subscribeHarvest:()=>wt,watchStreamingEdge:()=>dt,whenChromeReady:()=>Ci,whenIdleReady:()=>ki,whenShellReady:()=>Li});var Te=new Map,ii=!1;function _p(){return document.getElementById("bloom-root")?.shadowRoot??null}function Uc(){return document.head??null}function Dn(){let t=_p();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=qp()}function vs(t,e){if(!ii)return;let n=Uc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Dn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Dn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Dn()}function k(t,e){let n=Te.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Te.set(t,n)),ii&&vs(t,n)}function xs(){if(!Uc())return!1;ii=!0;for(let[e,n]of Te)vs(e,n);return Dn(),!0}function Kc(t){let e=Te.get(t);e&&(e.disabled=!1,ii&&vs(t,e))}function Wc(t){let e=Te.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Dn())}function L(t){let e=Te.get(t);e&&(e.el?.remove(),Te.delete(t),Dn())}function qp(){return Array.from(Te.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var C=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function E(t){return t}var ws=new Map;function _n(t,e){let n=ws.get(t);return n||(n=new Set,ws.set(t,n)),n.add(e),()=>n.delete(e)}function Ye(t,e){let n=ws.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var $p="bloompp";function Vc(){return new Promise((t,e)=>{let n=indexedDB.open($p,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Yc(t){try{let e=await Vc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Xc(t,e){try{let n=await Vc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function it(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function at(t,e,n){return Math.min(n,Math.max(e,t))}function Zc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Jc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Qc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var ai=new C("SettingsStore"),Le="BloomSettings",Fp=100;function si(t){return t!=null&&typeof t.then=="function"}function zp(t){if(t==null||si(t))return null;if(it(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(it(e)&&!si(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return it(n)&&!si(n)?n:null}return null}catch{return null}}function ci(t){let e=zp(t);if(!e)return null;let n=e.plugins;return!it(n)||si(n)||Object.keys(n).length===0?null:e}function Ss(t){return it(t)?t:null}function Es(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:it(t)?Object.keys(t).length===0:!1}function jp(t){return Es(t)?0:Array.isArray(t)?12+Math.min(t.length,40):it(t)?12+Math.min(Object.keys(t).length,40):3}function Xe(t){if(!t)return-1;let e=t.plugins;if(!it(e))return-1;let n=0;for(let r of Object.values(e)){let o=Ss(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=jp(a))}return n}function tu(t){let e=t.plugins;if(!it(e))return 0;let n=0;for(let r of Object.values(e))Ss(r)?.enabled===!0&&n++;return n}function eu(t){let e=t.map((i,a)=>({bag:i,index:a,score:Xe(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=tu(a.bag)-tu(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!it(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(it(a))for(let[s,l]of Object.entries(a)){let c=Ss(l);if(!c)continue;if(!it(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}Es(u[d])&&!Es(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return it(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Xe(n)}}var li=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return it(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){ai.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Fp))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Le,this.plain)}catch{try{GM_setValue(Le,e)}catch(n){ai.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Le,e)}catch{}Xc(Le,e).catch(n=>ai.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){ai.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Zc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Gp=new C("Settings"),Up={plugins:{}},z=new li(structuredClone(Up)),Kp=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Wp(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function M(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?ke(n):{}},get plain(){let n=e.pluginName;return n?z.plain.plugins[n]??{}:{}}};return e}async function Vp(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function nu(){let t=ci(await Vp(Le)),e=ci(await Yc(Le)),n=null;try{n=ci(localStorage.getItem(Le))}catch{n=null}let r=eu([t,e,n]);if(r){let o=r.bag.plugins;o&&(z.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);Gp.info("Loaded settings from",i,"richness",r.score,"gm",Xe(t),"idb",Xe(e),"ls",Xe(n))}z.releasePersist(),r&&(r.index!==0||r.score>Xe(t))&&z.persistLoadedBag()}function ke(t){return z.plain.plugins[t]||(z.plain.plugins[t]={}),z.store.plugins[t]}function ru(t,e){e&&(e.pluginName=t,ke(t),z.setDefaultGetter(Kp(t),n=>{if(n!=="enabled")return Wp(e.def,n)}))}function ou(){return ke("Settings")}function ui(){return ou().pinnedPlugins??[]}function iu(t){return ui().includes(t)}function au(t){let e=ui(),n=e.includes(t);return z.store.plugins.Settings={...z.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function di(){return ou().starredPlugins??[]}function su(t){return di().includes(t)}function lu(t){let e=di(),n=e.includes(t);return z.store.plugins.Settings={...z.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var fi=new C("PluginManager"),le={},$r=new Set;function cu(t){if(le[t.name]){fi.warn("Duplicate plugin",t.name);return}le[t.name]=t,ru(t.name,t.settings)}function qn(t){let e=le[t];if(!e)return!1;if(e.required)return!0;let n=z.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function uu(t){let e=le[t];if(!e||e.required)return;let n=!qn(t);ke(t),z.store.plugins[t].enabled=n,n?du(e):Yp(e),Ye("pluginToggle",{name:t,enabled:n})}function du(t,e=!1){if(!$r.has(t.name)&&qn(t.name))try{t.managedStyle&&Kc(t.managedStyle),t.start?.(),$r.add(t.name),t.settings&&z.addPrefixChangeListener(`plugins.${t.name}.`,()=>{$r.has(t.name)&&t.onSettingsChange?.()}),e||fi.debug("Started",t.name)}catch(n){fi.error("Failed to start",t.name,n)}}function Yp(t){if($r.has(t.name)){try{t.stop?.()}catch(e){fi.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Wc(t.managedStyle),L(t.managedStyle)),$r.delete(t.name)}}function Fr(t){for(let e of Object.values(le))(e.startAt??"DOMContentLoaded")===t&&du(e)}var fu=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Pt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function ce(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ue(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(fu)?.[1]??""}catch{return t.match(fu)?.[1]??""}}function A(){return ue(location.pathname)}var pu=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i;function gi(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function Ls(t,e){return e!=="GET"||gi(t)?!1:pu.test(t)}function hi(t){return t.match(pu)?.[1]??""}function bi(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return bi(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function gt(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function ks(t){let e=gt(t);return e?!e.mapping&&gt(e.conversation)?e.conversation:e:null}function Xp(t){let e=t.match(/[?&]num_turns=(\d+)/i);if(!e)return 0;let n=Number(e[1]);return Number.isFinite(n)&&n>0?n:0}function mu(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function Ts(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=mu(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?mu(n.text):""}function pi(t){let e=gt(t.metadata);if(e?.is_visually_hidden_from_conversation===!0||e?.is_user_system_message===!0||e?.user_context_message===!0)return"";let r=gt(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function Zp(t){return(gt(t.author)?.role??t.role)==="user"}function Jp(t){let e=typeof t.recipient=="string"?t.recipient.toLowerCase():"";if(e&&e!=="all"||(gt(t.author)?.role??t.role)==="tool")return!0;let o=gt(t.content),i=(typeof o?.content_type=="string"?o.content_type:"").toLowerCase();if(/thought|reasoning/.test(i)||i==="code"||i==="execution_output"||/^(?:tether_|computer_)/.test(i))return!0;let a=typeof t.channel=="string"?t.channel.toLowerCase():"";return!!(/^(?:commentary|thought|thoughts|reasoning|analysis)$/.test(a)&&t.end_turn!==!0)}function gu(t){return!!pi(t)&&!Jp(t)}function hu(t){let e=[];for(let n of t){let r=e[e.length-1];if(r&&r.role==="assistant"&&n.role==="assistant"){let o=n.alias||r.alias||(r.id!==n.id?r.id:void 0),i=n.at??r.at;e[e.length-1]={id:n.id,role:"assistant",text:n.text||r.text,...o&&o!==n.id?{alias:o}:{},...i?{at:i}:{}};continue}e.push(n)}return e}function Qp(t,e){let n=yu(t,e);if(!n)return!0;let r=new Set,o=n,i=null;for(;o&&e[o]&&!r.has(o);){r.add(o);let a=gt(e[o]);i=a&&typeof a.parent=="string"?a.parent:null,o=i}return!!(i&&!e[i])}function bu(t){let e=ks(t);if(!e)return!1;let n=gt(t);for(let a of[e,n])if(a&&(a.has_more===!0||a.has_more_before===!0||a.truncated===!0))return!0;let r=gt(e.mapping);if(r&&Object.keys(r).length)return Qp(e,r);let o=Array.isArray(e.turns)?e.turns:Array.isArray(e.messages)?e.messages:Array.isArray(e.items)?e.items:[],i=Number(e.num_turns??e.turn_count??e.total_turns??e.total);return Number.isFinite(i)&&i>o.length&&o.length>0}function Cs(t,e=""){return!(bu(t)||!yi(t).length||Xp(e))}function yu(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?bi(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function tg(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null;if(l&&gu(l)){let c=pi(l),u=typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:Ts(l)};u!==o&&(d.alias=o);let f=bi(l.create_time??l.createTime);f&&(d.at=f),n.push(d)}}else l&&Zp(l)&&n.push({id:"",role:"user",text:""});o=typeof s.parent=="string"?s.parent:null}return n.reverse(),hu(n).filter(a=>a.id)}function mi(t){return t.length<=480?t:t.slice(t.length-480)}function Ms(t,e){if(!e.length)return t;if(!t.length)return mi(e);let n=new Map(t.map((f,p)=>[f.id,p])),r=-1,o=-1;for(let f=0;f<e.length;f++){let p=n.get(e[f].id);if(p!==void 0){r=p,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(W=>W.id)),p=n.has(e[e.length-1].id),m=e.filter(W=>!f.has(W.id)),h=e[e.length-1].at,g=e[0].at,v=t[0].at,b=t[t.length-1].at,x=p||!!h&&!!v&&h<=v,ot=!!g&&!!b&&g>=b;return mi(x&&!ot?[...m,...t]:[...t,...m])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,p)=>f.text?f:t[r+p]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return mi([...s,...l,...u,...d])}function eg(t){let e=[],n=new Set;for(let r of t){let o=gt(r);if(!o)continue;let i=gt(o.message)??o;if(!gu(i))continue;let a=pi(i)||pi(o);if(!a)continue;let s=typeof i.id=="string"&&i.id||typeof o.message_id=="string"&&o.message_id||typeof o.id=="string"&&o.id||"";if(!s||n.has(s))continue;n.add(s);let l={id:s,role:a,text:Ts(i)||Ts(o)},c=typeof o.id=="string"&&o.id&&o.id!==s?o.id:"";c&&(l.alias=c);let u=bi(i.create_time??i.createTime??o.create_time??o.createTime);u&&(l.at=u),e.push(l)}return hu(e)}function ng(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=yu(t,n);return r?tg(n,r):[]}function yi(t){let e=ks(t);if(!e)return[];let n=ng(e);if(n.length)return n;let r=Array.isArray(e.turns)?e.turns:Array.isArray(e.messages)?e.messages:Array.isArray(e.items)?e.items:[];return r.length?eg(r):[]}function vu(t,e=""){let n=gt(t);if(!n)return e;let r=ks(t)??n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function xu(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var Ns=new C("Harvest"),rg=1500,og=200,ig=8,vi=new Set,xi=new Map,wi=new Map,Je=new Map,wu=[],Ze=new Set,jr=new Set,$n=new Map,Gr=new Map,Tu={Accept:"application/json"},ag=/^(authorization|oai-|openai-|chatgpt-|x-authorization)/i,As=8e3,sg=6e4,Fn=null,Ei=null,zr=null,Ot=0,Lu=!1;function ku(){return typeof unsafeWindow<"u"?unsafeWindow:window}function lg(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function cg(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var ug=/"action"\s*:\s*"(next|continue|variant)"/i;function dg(t,e,n){return!(e!=="POST"||gi(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!ug.test(n))}function Cu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function fg(t){return typeof t=="string"?Cu(t):""}function Hs(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Hs(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Rs(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function Eu(t,e,n){!t||!e||wi.get(t)!==e&&(wi.set(t,e),Rs(wi,rg),de({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function mg(t,e){let n=e.trim();!t||!n||xi.get(t)!==n&&(xi.set(t,n),Rs(xi,og),de({type:"conversation-meta",conversationId:t,title:n}))}function Is(t){let e=Gr.get(t);e!==void 0&&(clearTimeout(e),Gr.delete(t))}function Mu(t){if(!t||Ze.has(t)||Gr.has(t)||jr.has(t))return;$n.set(t,Date.now()+As);let e=setTimeout(()=>{Gr.delete(t),$n.delete(t),jn(t)},As);Gr.set(t,e)}function Au(t,e,n=""){let r=vu(e,t);if(!r)return;let o=yi(e);if(!o.length)return;let i=Je.get(r)??[],a=Ms(i,o);Cs(e,n)&&(Ze.add(r),Is(r)),xu(i,a)||(Je.set(r,a),Rs(Je,ig),de({type:"conversation-chain",conversationId:r})),!Ze.has(r)&&!jr.has(r)&&Mu(r)}function zn(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)zn(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&mg(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Hs(l.create_time??l.createTime??l.created_at);c&&u&&Eu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Hs(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&Eu(a,s,o),r.mapping&&typeof r.mapping=="object")zn(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&zn(l,o,n+1)}function Su(t,e){if(t)try{zn(JSON.parse(t),e)}catch{}}function de(t){for(let e of Array.from(vi))try{e(t)}catch{}}function pg(t,e){let n=e?.headers??(typeof Request<"u"&&t instanceof Request?t.headers:null);if(!n)return;let r=n instanceof Headers?n.entries():Array.isArray(n)?n:Object.entries(n);for(let[o,i]of r)typeof i=="string"&&ag.test(o)&&(Tu[o]=i)}async function gg(t,e,n,r){if(n===Ot)try{let o=await t.json();if(n!==Ot)return;zn(o,e),Au(e,o,r)}catch{}}async function hg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Ot&&de({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Ot;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let p=Cu(c);p&&(o=p,de({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let p of f){let m=p.replace(/^data:\s*/,"").trim();!m||m==="[DONE]"||Su(m,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Ot&&Su(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Ot&&de({type:"post-end",conversationId:o,error:i})}function bg(t,e,n){let r=lg(e),o=cg(e,n),i=Ls(r,o),a=dg(r,o,n?.body),s=Ot,l="";return a&&(l=fg(n?.body)||hi(r)||ue(r)||A(),de({type:"post-start",conversationId:l,url:r})),i&&pg(e,n),t(e,n).then(c=>{if(s!==Ot||!i&&!a)return c;try{let u=c.clone();i?gg(u,hi(r)||A(),s,r):hg(u,l,!c.ok,s)}catch{a&&de({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Ot&&de({type:"post-end",conversationId:l,error:!0}),c})}function Ps(){if(Fn)return;let t=ku();zr=t,Fn=t.fetch.bind(t);let e=(n,r)=>bg(Fn,n,r);Ei=e,t.fetch=e,Ns.debug("conversation fetch harvest hooked")}function yg(){Ot+=1,!(!Fn||!zr)&&(Ei&&zr.fetch===Ei&&(zr.fetch=Fn),Fn=null,Ei=null,zr=null,Ns.debug("conversation fetch harvest unhooked"))}function vg(){Ot+=1,!Lu&&yg()}function Hu(){Lu=!0,Ps()}function xg(t,e){let n=`include_has_versions=true&num_turns=10&before_node=${encodeURIComponent(e)}`,r=`include_has_versions=true&num_turns=10&before=${encodeURIComponent(e)}`;return[`/backend-api/conversations/${t}?${n}`,`/backend-api/conversations/${t}?${r}`]}async function wg(t,e,n){let r=await t.fetch(e,{method:"GET",credentials:"include",headers:{...Tu}});if(r.status===429)return{status:429,data:null};if(!r.ok)return{status:r.status,data:null};let o=await r.json();return zn(o,n),Au(n,o,e),{status:r.status,data:o}}function jn(t){if(!t||Ze.has(t)||jr.has(t))return;let e=$n.get(t)??0;if(Date.now()<e)return;let n=Je.get(t),r=n?.[0]?.alias||n?.[0]?.id||"";if(!r)return;jr.add(t),Ps();let o=ku();(async()=>{let i=!1,a=!1;try{let s=Je.get(t)?.length??0;for(let l of xg(t,r)){let c;try{c=await wg(o,l,t)}catch{continue}if(c.status===429){i=!0,Is(t),$n.set(t,Date.now()+sg),Ns.debug("conversation chain rate-limited",t);return}if(c.data){if(a=(Je.get(t)?.length??0)>s,Ze.has(t))return;a||(Ze.add(t),Is(t));return}}}finally{if(jr.delete(t),i||Ze.has(t))return;a?Mu(t):($n.get(t)??0)<=Date.now()&&$n.set(t,Date.now()+As)}})()}function wt(t){return vi.add(t),Ps(),()=>{vi.delete(t),vi.size===0&&vg()}}function Gn(t){return t?xi.get(t)??"":""}function Si(t){return t?wi.get(t)??null:null}function Ur(t){return t?Je.get(t)??wu:wu}var Kr=!1,Ti=!1,Os=!1,Nu=[],Ru=[],Pu=[];function Bs(t){let e=t.splice(0);for(let n of e)n()}function Wr(){Kr||(Kr=!0,Bs(Nu))}function Ds(){Ti||(Ti=!0,Kr||Wr(),Bs(Ru))}function Ou(){Os||(Os=!0,Kr||Wr(),Ti||Ds(),Bs(Pu))}function Li(t){Kr?t():Nu.push(t)}function ki(t){Ti?t():Ru.push(t)}function Ci(t){Os?t():Pu.push(t)}function Mi(){Wr()}function Un(){Wr(),Ds()}function Ai(){Ou()}function Iu(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Bu(){await Iu(4e3),Wr(),await Iu(4e3),Ds(),Ou()}var S={p:"0-V-linuxdo"},Et="[20260924] v1.4.107",Du="https://github.com/0-V-linuxdo/Bloom";var Eg={BetterNavigator:1790262743e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790252301e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function _u(t){let e=Eg[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function Sg(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Tg(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function _s(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Qe(){return _s()?Sg()||Tg():!1}function qu(){return Qe()}var Lg=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),$u=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),kg=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Cg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Wn(t){return t.id==="bloom-root"||!!t.closest(Cg)}function Fu(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Hi(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function qs(t){if(!(t instanceof HTMLElement)||!t.isConnected||Wn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Hi(e)?!1:t.getClientRects().length>0}function Kn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Mg(){let t=[];for(let e of document.querySelectorAll(Lg))!(e instanceof HTMLElement)||!e.isConnected||Wn(e)||t.push(e);return t}function Ii(t){if(!t.isConnected||Wn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function tn(){return Mg().filter(Ii)[0]??null}function Vn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Wn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function $s(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Wn(n)&&!Kn(n)&&n.parentElement&&!Kn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!Kn(r)&&!Wn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!Kn(r.parentElement))return r}return e}function Yn(){let t=document.querySelectorAll($u);for(let n of t)if(qs(n)&&!Hi(n)&&Fu(n))return n;let e=document.querySelectorAll(kg);for(let n of e){if(!qs(n)||!Fu(n)||Hi(n))continue;let r=n.querySelector($u);return qs(r)&&!Hi(r)?r:n}return null}function Ni(){let t=tn();if(t){let e=$s(t),n=e.parentElement;if(n&&!Kn(n))return n;if(!Kn(e))return e}return Vn()}function Ri(t){let e=tn();return e?t.composedPath().includes(e):!1}var zs=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Ag={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Hg(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Ig(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Fs(t){let e=Hg(t);return e?Ig(e)>.55?"light":"dark":null}function Ng(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Fs(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Fs(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Fs(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Pi(t){return t==="auto"?Ng():t}function Rg(t){try{let e=getComputedStyle(document.documentElement);for(let n of zs){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Oi(t,e,n){let r=Ag[e];if(n){Rg(t);for(let o of zs)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of zs)t.style.setProperty(o,r[o])}function zu(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var js=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Og="bloom-root",Kt="bloom-rail-item",$i="bloom-account-item",nn="bloom-sidebar-panel",no="bloom-plugin-dialog",Wi="bloom-plugin-layer",Fi="bloom-settings-css",Bg=2e3,Uu=null,Dg=null,He=!1,Ws=[],Bi=null,zi=null,Me=null,_i=null,fe=null,Qr=null,Vr,Xn=0,to=0,Yr=0,Xr=null,Zr=null,ji=null,Ku=null,Jr=null,Gs=[],Gi=!1,_g=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],qg=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],$g=new Set(["chat","ui","privacy"]),Fg=10080*60*1e3,Vi="",eo="all",Ut="all";function Yi(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Wu(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function zg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function jg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Gg(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Ug(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Kg={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Wg(t){return t.icon||Kg[t.name]||Yi()}function Us(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Oi(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Vu(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Ui(){let t="auto",e=Pi(t);Us(Uu,e,!0);let n=document.getElementById(nn);n instanceof HTMLElement&&Us(n,e,!0);let r=document.getElementById(no);r instanceof HTMLElement&&Us(r,e,!0);let o=document.getElementById(Kt);o instanceof HTMLElement&&Vu(o),Ye("schemeChange",{scheme:e,pref:t})}function Yu(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Xu(){if(k("settings",js),document.getElementById(Fi)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Fi,t.textContent=js,document.head.appendChild(t)}function Vg(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Yg(){for(let t of Ws)t();Ws=[]}function Zu(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Xg(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Xs(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Zg(t){return Xs(t).length>0}function qi(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Jg(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Xg(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Qg(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Jg(e,n));let i=ke(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Ws.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??qi(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??qi(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Zu(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??qi(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function ju(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function th(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=ke(t.name);for(let[n,r]of Xs(t)){if(n==="enabled"||r.type===5)continue;let o=qi(r);o!==void 0&&(e[n]=o)}Qu(t)}function Ju(t){t.key==="Escape"&&(!document.getElementById(Wi)&&!document.getElementById(no)||(t.stopPropagation(),Zn()))}function eh(){Gi||(document.addEventListener("keydown",Ju),Gi=!0)}function nh(){Gi&&(document.removeEventListener("keydown",Ju),Gi=!1)}function Zn(){Yg(),nh(),document.getElementById(Wi)?.remove(),document.getElementById(no)?.remove()}function Qu(t){if(Zn(),!document.body)return;let e=document.createElement("div");e.id=Wi,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Ae),e.addEventListener("pointerup",Ae),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Zn()});let n=document.createElement("div");n.id=no,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ae),n.addEventListener("pointerup",Ae),n.addEventListener("click",Ae);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Wu(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Zn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=ju("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=ju("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Xs(t);if(c.length)for(let[u,d]of c){let f=Qg(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>th(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),eh(),Ui()}function rh(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Wg(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=su(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Gg(l),c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let g=lu(t.name);Ye("pluginStar",{name:t.name,starred:g})}),s.appendChild(c),!t.required){let h=iu(t.name),g=document.createElement("button");g.type="button",g.className=`bloom-icon-btn bloom-card-pin${h?" bloom-card-pin-active":""}`,g.setAttribute("aria-label",h?"Unpin from top":"Pin to top"),g.innerHTML=Ug(h),g.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation();let b=au(t.name);Ye("pluginPin",{name:t.name,pinned:b})}),s.appendChild(g)}if(Zg(t)){let h=document.createElement("button");h.type="button",h.className="bloom-icon-btn bloom-card-settings",h.setAttribute("aria-label",`${t.name} settings`),h.innerHTML=jg(),h.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),Qu(t)}),s.appendChild(h)}let u=Zu(t.name,qn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",h=>h.stopPropagation()),d?.addEventListener("change",()=>{uu(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let h=document.createElement("div");h.className="bloom-card-desc",h.textContent=t.description,n.appendChild(h)}let f=document.createElement("div");f.className="bloom-card-separator";let p=document.createElement("div");p.className="bloom-card-footer";let m=document.createElement("div");return m.className="bloom-card-author",m.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",p.appendChild(m),e.append(n,f,p),e}function td(){return Object.values(le).filter(t=>!t.hidden&&t.name!=="Settings")}function oh(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Fg}function ed(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return oh(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>$g.has(r)):n.includes(e)}function ih(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function ah(){return Vi.trim()?"No plugins match your search.":Ut==="favorites"?"No favorites yet. Star a plugin to see it here.":Ut==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function sh(){let t=td();return qg.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>ed(n,e.id)))}function lh(){if(Jr){Jr.replaceChildren();for(let t of sh()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Ut===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Ut=t.id,en()}),Jr.appendChild(e)}}}function ch(){let t=td();if(Ut==="favorites"){let e=new Set(di());t=t.filter(n=>e.has(n.name))}else Ut!=="all"&&(t=t.filter(e=>ed(e,Ut)));return eo==="enabled"&&(t=t.filter(e=>qn(e.name))),eo==="disabled"&&(t=t.filter(e=>!qn(e.name))),t}function en(){if(!Xr)return;lh();let t=ch();ji&&(ji.placeholder=`Search ${t.length} plugins...`);let e=t,n=Vi.trim().toLowerCase();if(n&&(e=e.filter(r=>ih(r).includes(n))),Ut==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Ut!=="favorites"){let r=ui();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Xr.replaceChildren();for(let r of e)Xr.appendChild(rh(r));Zr&&(Zr.hidden=e.length>0,Zr.textContent=ah())}function Ae(t){t.stopPropagation()}function Ks(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Zs(){document.getElementById(Kt)?.setAttribute("aria-expanded",He?"true":"false")}function uh(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Js(){Zn(),Vi="",eo="all",Ut="all",document.getElementById(nn)?.remove(),He=!1,Zs()}function dh(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Ae),e.addEventListener("pointerup",Ae),e.addEventListener("click",Ae);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Yi();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=zg();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Wu(),d.addEventListener("click",Js),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let p=document.createElement("div");p.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{Vi=m.value,en()});let h=document.createElement("select");h.className="bloom-search-filter",h.setAttribute("aria-label","Filter plugins");for(let b of _g){let x=document.createElement("option");x.value=b.value,x.textContent=b.label,h.appendChild(x)}h.value=eo,h.addEventListener("change",()=>{eo=h.value,en()}),p.append(m,h),n.appendChild(p);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let v=document.createElement("p");return v.className="bloom-tab-empty",v.hidden=!0,n.appendChild(v),e.append(d,n),Xr=g,Zr=v,ji=m,Ku=h,Jr=f,en(),e}function fh(t){t.classList.add("bloom-rail-dock")}function mh(){let t=document.getElementById(Kt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Ii(t)?t:null}function ph(){if(document.getElementById(nn)?.remove(),!document.body)return;let t=dh(nn);fh(t),document.body.appendChild(t),He=!0,Zn(),Ui(),Zs(),Ye("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Et,dock:"center",rail:!!mh()})}function Qs(){let t=document.getElementById(nn);if(t instanceof HTMLElement&&t.isConnected&&uh(t)){Js();return}t?.remove(),ph()}function gh(){let t=document.createElement("button");return t.type="button",t.id=Kt,t.className="bloom-rail-item",t.setAttribute("aria-controls",nn),t.setAttribute("aria-expanded",He?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Yi()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Qs()}),t}function Gu(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function hh(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function bh(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Ce(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function nd(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=hh(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Ce(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Ce(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Ce(n,"width",l),Ce(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Ce(t,"padding-left",u);let d=bh(e,r);if(d){let f=d.getBoundingClientRect(),p=n.getBoundingClientRect(),m=Math.round(f.left-p.right);m>=0&&m<=24&&Ce(t,"gap",m)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Ce(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Ce(t,"gap",Math.round(l))}Vu(t)}function Vs(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function yh(){if(Qr?.isConnected&&fe){fe.observe(Qr,{childList:!0});return}Ys()}function vh(t){if(Vs(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function xh(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Yr=0;return}Yr+=1,to=Date.now()+Math.min(8e3,250*2**Math.min(Yr,5))})}function wh(){Xn||Date.now()<to||(Xn=requestAnimationFrame(()=>{Xn=0,!(Date.now()<to)&&(document.getElementById(Kt)?.isConnected||Ki())}))}function Ki(){if(!document.body)return;fe?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Kt);t=n instanceof HTMLButtonElement?n:gh();let r=tn(),o=Vn();if(r){let i=$s(r),a=i.parentElement;if(Vs(i)||a&&Vs(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Gu(t),nd(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Gu(t,!0)):t.isConnected&&!Ii(t)&&(t.remove(),t=null)}finally{xh(t,e),yh(),Zs()}}function Ys(){let t=Ni();!t||!vh(t)||Qr===t&&fe||(fe?.disconnect(),Qr=t,fe=new MutationObserver(()=>{document.getElementById(Kt)?.isConnected||wh()}),fe.observe(t,{childList:!0}))}function Eh(){Ki(),Ys(),Vr===void 0&&(Vr=window.setInterval(()=>{let t=document.getElementById(Kt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=to&&Ki();else{Yr=0;let e=tn();e&&nd(t,e)}Ys()},Bg))}function Sh(){Vr!==void 0&&(clearInterval(Vr),Vr=void 0),Xn&&cancelAnimationFrame(Xn),Xn=0,to=0,Yr=0,fe?.disconnect(),fe=null,Qr=null}function Th(t){_i===t&&Me||(Me?.disconnect(),_i=t,Me=new MutationObserver(()=>{if(!t.isConnected){Me?.disconnect(),Me=null,_i=null;return}rd(t)}),Me.observe(t,{childList:!0}))}function rd(t){if(Th(t),t.querySelector(`#${$i}`))return;let e=document.createElement("button");e.type="button",e.id=$i,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Yi()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Ks),e.addEventListener("pointerup",Ks),e.addEventListener("click",n=>{Ks(n),Qs()}),t.insertBefore(e,t.firstChild)}function Di(){let t=Yn();return t?(rd(t),!0):!1}function Lh(t){Ri(t)&&(queueMicrotask(Di),requestAnimationFrame(()=>{Di()}),window.setTimeout(Di,60),window.setTimeout(Di,180))}function kh(){zi?.abort();let t=new AbortController;zi=t,document.addEventListener("click",Lh,{signal:t.signal})}function Ch(){zi?.abort(),zi=null,Me?.disconnect(),Me=null,_i=null}function od(){Un(),Vg(()=>{Xu(),Yu(),Ki(),Qs()})}var id=E({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Og}`,`#${Kt}`,`#${$i}`,`#${nn}`,`#${Wi}`,`#${no}`,`#${Fi}`,"#bloom-menu-panel"],start(){Xu(),Yu(),Eh(),kh(),Bi?.(),Bi=zu(Ui),Ui(),Gs=[_n("pluginToggle",()=>{He&&en()}),_n("pluginPin",()=>{He&&en()}),_n("pluginStar",()=>{He&&en()})]},stop(){Sh(),Ch(),Bi?.(),Bi=null;for(let t of Gs)t();Gs=[],Js(),document.getElementById(Kt)?.remove(),document.getElementById($i)?.remove(),document.getElementById(Fi)?.remove(),Uu=null,Dg=null,Xr=null,Zr=null,ji=null,Ku=null,Jr=null,He=!1}});var Xi='form[data-type="unified-composer"], form.w-full[data-type]',Wt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Jn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),ad=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),sd=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Mh=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Ah='[contenteditable="false"], button, [role="button"]';function Bt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function rn(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Bt(o)))return o;return null}function ld(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function j(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=ld(t);return!!(Mh.test(n)||/^stop$/i.test(n))}function Dt(){let e=Array.from(document.querySelectorAll(Xi)).find(Bt);if(e instanceof HTMLElement)return e;let n=rn(document,Wt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function st(){let t=Array.from(document.querySelectorAll(Wt));return t.find(Bt)??t[0]??null}function Hh(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Ah);return!!n&&n!==e&&e.contains(n)}function tl(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Hh(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Vt(t){let e=t??st();return e?tl(e,e).replaceAll("\u200B","").trim().length>0:!1}function Ie(t){return!Vt(t)}function Zi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function cd(t){let e=Dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Bt(n))&&t(n))return n;return null}function Ne(){let t=Dt(),e=rn(t,Jn)??rn(document,Jn);return e&&!j(e)?e:cd(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!j(n);let o=ld(n);return/^(send|send prompt|发送)$/i.test(o)&&!j(n)})}function on(){let t=Dt(),e=rn(t,ad,!0)??rn(document,ad,!0);if(e)return e;let n=rn(t,sd)??rn(document,sd);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Bt(r)&&j(r))return r}return cd(j)}function Yt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>tl(n,t)).join(`
`):tl(t,t)}function el(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function me(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),el(t,n)}var dd=new C("Streaming");function so(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Bt(e))&&(j(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Ih(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Bt(t))}function Nh(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Bt(t))}function Rh(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Zt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Y(){if(on()||so()||Rh())return!0;let t=Ne();return t&&Bt(t)&&!j(t)?!1:!!(Ih()||Nh())}var Ph=400,ud=3,cn=new Set,ro,oo=null,nl=null,sn=!1,an=0,Pe="",Oe="",Be=!1,io=!1,ao=!1,Xt=!1,Q=null,St="",ln=!1;function G(){return Xt}function un(){return Be}function Qn(){return St}function rl(){return A()||St}function fd(){return ce(Pt())}function Ji(t,e){return{streaming:t,contextKey:e,conversationId:rl()}}function ol(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Oh(t){return!t||t==="/"||t.startsWith("/g/")}function X(t,e){if(!t||t===e)return!1;let n=ue(ol(e)||e);return!n||!(t.endsWith("|draft")||Oh(ol(t)))?!1:St?n===St:ln}function Qi(){sn=!1,an=0,Pe="",Be=!1,io=!1,ao=!1,St="",ln=!1}function Bh(t){for(let e of Array.from(cn))try{e.onFall?.(t)}catch{}}function Dh(t){for(let e of Array.from(cn))try{e.onRise?.(t)}catch{}}function Re(t){for(let e of Array.from(cn))try{e.onTick?.(t)}catch{}}function _h(t,e){for(let n of Array.from(cn))try{n.onContext?.(t,e)}catch{}}function qh(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&j(n)&&(Be=!0)}function $h(t){if(t.type==="post-start"){let n=A();if(!t.conversationId){n||(ln=!0),(!n||n===St)&&(Xt=!1,Be=!1);return}if(!(t.conversationId===n||t.conversationId===St)&&!(!n&&ln))return;St=t.conversationId,ln=!1,Xt=!1,Be=!1;return}if(t.type!=="post-end"||!sn&&!Q)return;let e=A();t.conversationId&&!(e?t.conversationId===e:t.conversationId===St)||(ao=!0,t.error&&(io=!0,Q&&(Q.error=!0)))}function Fh(){let t=fd(),e=Y();if(Oe&&t&&Oe!==t){let o=Oe;if(!X(o,t))Q=null,Qi(),Xt=e;else{let i=ue(ol(t));if(i&&!St&&(St=i,ln=!1),Pe===o&&(Pe=t),Q&&Q.contextKey===o){Q.contextKey=t;let a=rl();a&&(Q.conversationId=a)}Xt=!1}if(Oe=t,_h(t,o),Xt){Re(Ji(!1,t));return}}else t&&(Oe=t);if(Xt){if(e){Re(Ji(!1,t));return}Xt=!1}if(Q)if(e||Q.contextKey!==t)Q=null;else{let o=Q;Q=null,Qi(),Bh(o),Re(Ji(!1,t));return}let n=Ji(e,t);if(e){let o=!sn;o&&(Be=!1,io=!1,ao=!1),sn=!0,an=0,Pe=t,o&&Dh(n),Re(n);return}if(!sn){Re(n);return}if(an+=1,ao&&(an=Math.max(an,ud)),an<ud){Re(n);return}if(!(!!Pe&&Pe===t)){Qi(),Re(n);return}Q={contextKey:Pe||t,conversationId:rl(),userStopped:Be,error:io||Zt()},Re(n)}function zh(){ro===void 0&&(sn=Y(),Oe=fd(),Pe=sn?Oe:"",an=0,Be=!1,io=!1,ao=!1,Xt=!1,Q=null,St="",ln=!1,oo?.abort(),oo=new AbortController,document.addEventListener("click",qh,{capture:!0,signal:oo.signal}),nl=wt($h),ro=setInterval(Fh,Ph),dd.debug("watchStreamingEdge started"))}function jh(){cn.size||(ro!==void 0&&(clearInterval(ro),ro=void 0),oo?.abort(),oo=null,nl?.(),nl=null,Qi(),Oe="",Xt=!1,Q=null,dd.debug("watchStreamingEdge stopped"))}function dt(t){let e=typeof t=="function"?{onFall:t}:t;return cn.add(e),zh(),()=>{cn.delete(e),jh()}}var md="bloom-host-icon",lo="data-bloom-host-rel",il="not all",al=0,pd=0,Gh=400;function gd(t){al+=1;try{t()}finally{al-=1}}function ta(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function De(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function hd(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Uh(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Kh(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-pd<Gh||(pd=n,t.appendChild(e))}function Wh(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||ta(n)&&(n.getAttribute(lo)||n.setAttribute(lo,n.rel),n.media!==il&&(n.media=il),n.rel!==md&&(n.rel=md))}function Vh(t){for(let e of t.querySelectorAll(`link[${lo}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(lo);n&&(e.rel=n),e.removeAttribute(lo),e.media===il&&e.removeAttribute("media")}}function bd(t,e){let{head:n}=document;!n||!e||gd(()=>{Wh(n,t);let r=hd(t),{type:o,sizes:i}=Uh(e);r?Kh(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function yd(t,e){let{head:n}=document;n&&gd(()=>{hd(t)?.remove(),Vh(n)})}function vd(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(al)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:ta(c.target)&&(a=!0,De(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)ta(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)ta(u)&&u.id!==t&&(a=!0,De(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Yh=["original","badge","dot","hole","bg"],Ed=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Sd={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ea="#FCFCFC",Xh="#111111",xd="#111111",Zh="#ffffff",Jh="#212121",Qh="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",tb={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},na=32,wd=64;function Td(t){return typeof t=="string"&&Yh.includes(t)}function eb(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function ra(t){let e=document.createElement("canvas");e.width=na,e.height=na;let n=e.getContext("2d");return n?(n.scale(na/wd,na/wd),t(n),e.toDataURL("image/png")):""}function nb(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function oa(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Qh);n&&(t.strokeStyle=Xh,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function rb(t,e,n){let r=Sd[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=xd,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=xd,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Zh,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function co(t,e){if(t==="original")return e==="wait"?ra(r=>oa(r,ea)):eb(tb[e]);let n=e==="wait"?void 0:Sd[e];return ra(t==="hole"?r=>oa(r,n??ea):t==="bg"?r=>{r.fillStyle=n??Jh,nb(r,0,0,64,64,14),r.fill(),oa(r,ea,!1)}:r=>{oa(r,ea),e!=="wait"&&rb(r,e,t==="dot"?"dot":"badge")})}function Ld(t){return{wait:co(t,"wait"),rotate:co(t,"rotate"),done:co(t,"done"),ready:co(t,"ready"),error:co(t,"error")}}var ob=new C("ChatStateFavicons"),fn="bloom-chat-state-favicon",Hd=["input","beforeinput","cut","paste","compositionend"],Id=M({style:{type:3,description:"Favicon overlay",options:Ed}}),Jt="",cl={wait:"",rotate:"",done:"",ready:"",error:""},uo="wait",ft=!1,tt=!1,D=null,ht="",Tt="",pn=!0,sa=!1,tr=null,Lt=0,ia=null,aa=null,dn=null,ll=null,er=null,_t=!1,kd=new WeakSet;function ib(){let t=Id.store.style;return Td(t)?t:"bg"}function Nd(){let e=document.querySelector(`link[rel~="icon"]:not(#${fn}), link[data-bloom-host-rel]:not(#${fn})`)?.href;return De(e)?e:De(Jt)?Jt:""}function ab(){let t=document.getElementById(fn);return t instanceof HTMLLinkElement?t:null}function sb(){if(!De(Jt)){let t=Nd();t&&(Jt=t)}return De(Jt)?Jt:cl.wait}function Rd(t){return t==="wait"?sb():cl[t]}function Pd(){bd(fn,Rd(uo))}function $(t){let e=Rd(t);if(uo===t){let n=ab();if(n&&n.getAttribute("href")===e)return}uo=t,Pd()}function Cd(){cl=Ld(ib()),$(uo)}function ul(){return ce(Pt())}function dl(t,e){!t||!e||t===e||(D===t&&(D=e),ht===t&&(ht=e),Tt===t&&(Tt=e))}function lb(){let t=ul();if(!(Y()||ft||tt))return ht="",t;if(ht&&t&&ht!==t)if(X(ht,t))dl(ht,t),ht=t;else return ht="",t;else!ht&&t&&(ht=t);return ht||t}function Md(t){return!D||!t?!1:D===t?!0:X(D,t)}function Od(){ft=!1,tt=!1,D=null,ht=""}function Bd(t){Tt=t,Od(),pn=!1,sa=!0,$("wait")}function sl(t){return!t&&pn}function cb(){if(!_t)return;let t=ul();if(Tt&&t&&Tt!==t&&!X(Tt,t)){Bd(t);return}Tt&&t&&X(Tt,t)&&dl(Tt,t),t&&(Tt=t);let e=Y(),n=e&&!G();if(sa){if(G()){$("wait");return}sa=!1}if(G()){$("wait");return}let r=lb(),o=Ie();if(un()&&!e){ft=!1,tt=!1,D=null,$(o?"wait":sl(o)?"ready":"wait");return}if(Zt()&&!e&&ft){$("error"),ft=!1,tt=!1,D=null;return}if(n){ft||(pn=!1),ft=!0,tt=!1,D=r,$("rotate");return}if(ft)if(!Md(t))ft=!1,tt=!1,D=null;else if(tt){ft=!1,tt=!0,D=t||r,$("done");return}else{$("rotate");return}if(tt)if(D&&t&&!Md(t))tt=!1,D=null;else if(o){D=r||D,$("done");return}else if(sl(o)){tt=!1,$("ready");return}else{tt=!1,$("wait");return}D=null,o?$("wait"):sl(o)?$("ready"):$("wait")}function mn(){_t&&(Fd(),_d(),qd(),cb())}function Dd(){if(er){for(let t of Hd)er.removeEventListener(t,$d,!0);er=null}}function _d(){let t=Dt(),e=t&&t!==document.body?t:null;if(!(er===e&&e?.isConnected)&&(Dd(),!!e)){er=e;for(let n of Hd)er.addEventListener(n,$d,{capture:!0,passive:!0})}}function qd(){let t=Dt();if(!(dn&&ll===t&&t.isConnected)){if(dn?.disconnect(),ll=t,!t||t===document.body){dn=null;return}dn=new MutationObserver(()=>la()),dn.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function la(){if(_t){if(document.hidden){Lt&&(cancelAnimationFrame(Lt),Lt=0),mn();return}Lt||(Lt=requestAnimationFrame(()=>{Lt=0,_t&&mn()}))}}function $d(){Vt()&&(pn=!0),la()}function Ad(){Vt()&&(pn=!0),la()}function ub(){_t&&(Lt&&(cancelAnimationFrame(Lt),Lt=0),mn())}function db(){_t&&(pn=!1,mn())}function fb(t){if(!_t)return;if(t.userStopped){ft=!1,tt=!1,D=null,$("wait");return}if(t.error){ft=!1,tt=!1,D=null,$("error");return}let e=ul();if(t.contextKey&&e&&t.contextKey!==e&&!X(t.contextKey,e)){ft=!1,tt=!1,D=null,$("wait");return}ft=!1,tt=!0,D=e||t.contextKey,$("done")}function mb(){_t&&mn()}function pb(t,e){if(_t){if(X(e,t)){dl(e,t),Tt=t,mn();return}Bd(t)}}function Fd(){let t=st();!t||kd.has(t)||(kd.add(t),t.addEventListener("input",Ad,{capture:!0,passive:!0}),t.addEventListener("compositionend",Ad,{capture:!0,passive:!0}))}var zd=E({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Id,startAt:"DOMContentLoaded",cleanupSelectors:[`#${fn}`],start(){_t=!0,Jt=Nd()||Jt,Cd(),aa?.disconnect(),aa=vd(fn,t=>{De(t)&&(Jt=t),Pd()}),tr?.abort(),tr=new AbortController,window.addEventListener("popstate",la,{signal:tr.signal}),document.addEventListener("visibilitychange",ub,{signal:tr.signal}),Fd(),_d(),qd(),ia?.(),ia=dt({onRise:db,onFall:fb,onTick:mb,onContext:pb}),mn(),ob.debug("favicon watch started")},stop(){_t=!1,Lt&&cancelAnimationFrame(Lt),Lt=0,ia?.(),ia=null,tr?.abort(),tr=null,Dd(),dn?.disconnect(),dn=null,ll=null,aa?.disconnect(),aa=null,Od(),Tt="",pn=!0,sa=!1,uo="wait",yd(fn,Jt)},onSettingsChange:Cd});var jd=`.bloom-ih-hud {
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
`;var XE=new C("InputHistory"),fl=/\u200B/g,Gd=10,Ud=500,Kd=100,hb=8,bb=120,yb=2e3,ca=10,ua=M({maxEntries:{type:4,description:"Max stored prompts",min:Gd,max:Ud,default:Kd},history:{type:5,description:"Stored prompts",render:Rb},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ml=new Map,et=0,pl="",Qt=!1,mo=!1,bl=0,fo=null,gl,yl=null,Wd=!0;function qt(){let t=ua.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Vd(t){let e=at(Number(ua.store.maxEntries??Kd),Gd,Ud);return t.length>e?t.slice(t.length-e):t}function da(t){ua.store.entries=Vd(t)}function vb(t){return t.replaceAll(fl,"").replace(/\n$/,"").trim()}function hl(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Wt);return n instanceof HTMLElement?n:st()}function xb(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Yt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(fl,"").trim().length===0,last:i.toString().replaceAll(fl,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Yd(t){clearTimeout(gl),gl=setTimeout(()=>{if(t!==bl)return;mo=!1;let e=yl;e&&el(e,Wd)},bb)}function Xd(t,e,n){mo=!0,yl=t,Wd=n;let r=++bl;me(t,e,n),Yd(r)}function wb(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function nr(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Eb(){document.querySelector(".bloom-ih-hud")?.remove()}function Sb(t,e){let n=wb();n.textContent=t;let r=(e.closest("form")??Dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-hb)}px`,n.classList.add("bloom-ih-hud-on")}function vl(t){let e=vb(t);if(!e)return;let n=Date.now(),r=ml.get(e);if(r&&n-r<yb)return;ml.set(e,n);let o=qt().filter(i=>i!==e);o.push(e),da(o),et=qt().length,Qt=!1,nr()}function Tb(t,e){let n=qt();if(!n.length&&t)return;et>=n.length&&(pl=Yt(e),et=n.length);let r=t?et-1:et+1;r<0||r>n.length||(et=r,Qt=!0,Xd(e,r===n.length?pl:n[r],t),r<n.length?Sb(`${r+1} / ${n.length}`,e):nr())}function Lb(t){Qt=!1,nr(),Xd(t,pl,!1),et=qt().length}function kb(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=hl(t.target)??hl(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Qt&&!t.altKey&&!t.shiftKey){Lb(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){vl(Yt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=qt();if(!r){let i=xb(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||et<=0)||!n&&et>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Tb(n,e))}function Cb(t){if(hl(t.target)){if(mo){Yd(bl);return}Qt&&(Qt=!1,nr(),et=qt().length)}}function Mb(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Wt);n instanceof HTMLElement&&vl(Yt(n))}function Ab(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Jn);if(!n||!(n instanceof HTMLElement)||j(n))return;let r=st();r&&vl(Yt(r))}function Hb(t){if(!(!Qt||mo)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Qt=!1,nr()}}function Ib(){if(fo)return;fo=new AbortController;let{signal:t}=fo,e={capture:!0,signal:t};window.addEventListener("keydown",kb,e),window.addEventListener("input",Cb,e),window.addEventListener("submit",Mb,e),window.addEventListener("click",Ab,e),window.addEventListener("pointerdown",Hb,e)}function Nb(t){let e=qt().slice();e.splice(t,1),da(e),et>e.length&&(et=e.length)}function Rb(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=qt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/ca));n>=l&&(n=l-1);let c=s.slice(n*ca,n*ca+ca);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((v,b)=>{let x=i.indexOf(v),ot=qt().length-1-x,W=document.createElement("div");W.className="bloom-ih-item";let J=document.createElement("button");J.type="button",J.className=`bloom-ih-body${r===b?"":" bloom-ih-clamp"}`,J.textContent=v,J.addEventListener("click",()=>{r=r===b?-1:b,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let ut=document.createElement("button");ut.type="button",ut.title="Copy",ut.textContent="C",ut.addEventListener("click",()=>{Jc(v)});let vt=document.createElement("button");vt.type="button",vt.title="Delete",vt.textContent="\xD7",vt.addEventListener("click",()=>{Nb(ot),o()}),O.append(ut,vt),W.append(J,O),g.appendChild(W)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let p=document.createElement("span");p.textContent=`${n+1} / ${l}`;let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Next",m.disabled=n+1>=l,m.addEventListener("click",()=>{n+=1,o()});let h=document.createElement("button");h.type="button",h.className="bloom-ih-clear",h.textContent="Clear all",h.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(da([]),et=0,o())}),d.append(f,p,m,h),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Zd=E({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:ua,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",jd),et=qt().length,Qt=!1,Ib()},stop(){fo?.abort(),fo=null,nr(),Eb(),ml.clear(),clearTimeout(gl),mo=!1,yl=null,Qt=!1},onSettingsChange(){let t=qt(),e=Vd(t);e.length!==t.length&&da(e),et>e.length&&(et=e.length)}});var xl="noShareLink",Pb=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Ob=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],wl=M({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Jd(t){return`${t.join(",")}{display:none!important}`}function Qd(){let t=[];if(wl.store.hideShareChat!==!1&&t.push(Jd(Pb)),wl.store.hideShareProject!==!1&&t.push(Jd(Ob)),!t.length){L(xl);return}k(xl,t.join(`
`))}var tf=E({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:wl,start:Qd,onSettingsChange:Qd,stop(){L(xl)}});var rf="noDictation",Bb=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Db=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],of=M({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function ef(t){return`${t.join(",")}{display:none!important}`}function nf(){let t=[ef(Bb)];of.store.hideDictationSettings!==!1&&t.push(ef(Db)),k(rf,t.join(`
`))}var af=E({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:of,start:nf,onSettingsChange:nf,stop(){L(rf)}});var El="noSidebarIdentity",rr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],cf=rr.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),uf=rr.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),_b=[...cf,...uf],qb=[...cf,...rr.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],$b=rr.map(t=>`${t} a[href^="mailto:"]`),Fb=rr.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),zb=rr.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),po=M({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function sf(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function jb(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Gb(){return`${zb.join(",")}{margin-block:auto!important}`}function Ub(){return`${Fb.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function lf(){let t=po.store.hideUsername!==!1,e=po.store.hideEmail!==!1,n=t&&po.store.enlargePlan!==!1,r=t&&po.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(jb([...qb,...uf])),o.push(Gb())):o.push(sf(_b))),e&&o.push(sf($b)),n&&o.push(Ub()),!o.length){L(El);return}k(El,o.join(`
`))}var df=E({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:po,start:lf,onSettingsChange:lf,stop(){L(El)}});var ff=`#bloom-rt-host {
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
`;var gf=new C("RecentTopics"),ar="bloom-rt-host",hf="home",bf=/^\/c\/([a-z0-9_-]{8,})/i,Wb=/\/c\/([a-z0-9_-]{8,})/i,yf=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Vb=new Set(["Backquote","IntlBackslash"]),Yb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Xb=140,Zb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),nt=M({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Zb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),fa=null,ma=null,bt=!1,xo=!1,go=!1,te=0,gn="",or=null,ho=null,ir,Sl=null,Tl=null;function Jb(){let t=Number(nt.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function bo(){let t=nt.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function kl(){let t=nt.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function vf(){let t=nt.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Cl(){let t=nt.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ga(t){let e=Jb();return t.length>e?t.slice(0,e):t}function ee(t){return t===hf}function yo(t,e=Xb){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Ml(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(bf)?.[1]??""}catch{return t.match(Wb)?.[1]??""}}function hn(){let t=(location.pathname||"/").match(bf);if(t?.[1])return t[1];let n=Pt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return hf}function Al(t){if(ee(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Ml(r.getAttribute("href")||"")!==t)continue;let o=yo(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return hn()===t&&e&&!/^ChatGPT$/i.test(e)?yo(e,80):""}function Qb(t){if(ee(t))return"New chat";let e=kl()[t];if(e)return e;let n=Gn(t);return n||Al(t)||"Chat"}function t0(t){return Cl()[t]||""}function e0(t){return vf()[t]||{}}function Hl(t,e){if(!t||ee(t)||!e||/^new chat$/i.test(e.trim()))return;let n=kl();n[t]!==e&&(n[t]=e,nt.store.titles=n)}function n0(t){t.type==="conversation-meta"&&(Hl(t.conversationId,t.title),bt&&sr())}function r0(t,e){if(!t||ee(t)||!e)return;let n=Cl();n[t]!==e&&(n[t]=e,nt.store.projects=n)}function o0(t,e){if(!t||ee(t)||!e.user&&!e.assistant)return;let n=vf(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,nt.store.previews=n)}function Il(t){if(!t||ee(t)&&nt.store.includeHome===!1)return;let e=bo().filter(n=>n!==t);e.unshift(t),nt.store.visits=ga(e)}function ha(){let t=nt.store.includeHome!==!1;return ga(bo().filter(n=>t||!ee(n))).map(n=>({id:n,title:Qb(n),project:t0(n),preview:e0(n)}))}function mf(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return yo(o)}catch{return""}}function vo(t){if(!t||ee(t)||t!==hn())return;let e=Al(t);e&&Hl(t,e);let n=mf("user"),r=mf("assistant");o0(t,{user:n,assistant:r});let o=wf(t);if(o){let i=xf(o);i&&r0(t,i)}}function Nl(){let t=kl(),e=Cl(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${ar}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Ml(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=yo(c.textContent||"",80);d&&!yf.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=xf(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(nt.store.titles=t),i&&(nt.store.projects=e);let a=bo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(nt.store.visits=ga([...a,...l]))}function xf(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=yo((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!yf.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function wf(t){if(ee(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Ml(e.getAttribute("href")||"")===t)return e}catch{}return null}function i0(t){let e=wf(t);if(e){e.click();return}if(ee(t)){location.assign("/");return}location.assign(`/c/${t}`)}function a0(){let t=hn();gn&&gn!==t&&vo(gn),gn=t,Il(t),Nl();let e=Al(t);e&&Hl(t,e),vo(t)}function pa(){ir===void 0&&(ir=window.setTimeout(()=>{ir=void 0,a0()},120))}function s0(){or||(or=history.pushState.bind(history),ho=history.replaceState.bind(history),history.pushState=function(...e){let n=or(...e);return pa(),n},history.replaceState=function(...e){let n=ho(...e);return pa(),n})}function l0(){or&&(history.pushState=or),ho&&(history.replaceState=ho),or=null,ho=null}function c0(t){return Vb.has(t.code)||t.keyCode===192?!0:Yb.has(t.key)}function Ef(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function u0(t,e){xo=e,Nl(),vo(hn()),bt=!0,te=0;try{let n=hn();Il(n);let r=ha();r.length>1&&(te=t?r.length-1:1)}catch(n){gf.error("Failed to open switcher:",n)}sr()}function pf(t){let{length:e}=ha();e&&(te=(te+(t?-1:1)+e)%e,sr())}function Rl(){if(!bt)return;let t=ha()[te];bt=!1,xo=!1,sr(),t&&i0(t.id)}function Sf(){bt&&(bt=!1,xo=!1,sr())}function d0(t){if(Ef(t)){go=!0;return}if((t.ctrlKey||go)&&!t.altKey&&!t.metaKey&&c0(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{bt?pf(t.shiftKey):u0(t.shiftKey,!0)}catch(n){gf.error("Hotkey failed:",n)}return}if(bt){if(t.key==="Escape"){t.preventDefault(),Sf();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Rl();return}t.key==="Tab"&&(t.ctrlKey||go)&&(t.preventDefault(),pf(t.shiftKey))}}function f0(t){Ef(t)&&(go=!1,bt&&xo&&Rl())}function m0(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(pa)}function p0(t){!bt||(t.target instanceof Element?t.target:null)?.closest(`#${ar}`)||Sf()}function g0(){document.visibilityState==="hidden"&&vo(hn())}function Ll(t=ma){t instanceof HTMLElement&&Oi(t,Pi("auto"),!0)}function h0(){if(!document.body)return null;let t=document.getElementById(ar);if(t instanceof HTMLElement)return ma=t,Ll(t),t;t=document.createElement("div"),t.id=ar;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ma=t,Ll(t),t}function sr(){let t=h0();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!bt){e.dataset.visible="false",e.replaceChildren();return}let n=ha();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}te>=n.length&&(te=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===te?"true":"false",s.setAttribute("aria-selected",a===te?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{te=a,Rl()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function b0(){document.getElementById(ar)?.remove(),ma=null}var Tf=E({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${ar}`],settings:nt,start(){k("recentTopics",ff),gn=hn(),Il(gn),Nl(),vo(gn),Sl=wt(n0),s0(),fa=new AbortController;let{signal:t}=fa;window.addEventListener("keydown",d0,{capture:!0,signal:t}),window.addEventListener("keyup",f0,{capture:!0,signal:t}),window.addEventListener("popstate",pa,{signal:t}),document.addEventListener("click",m0,{capture:!0,signal:t}),document.addEventListener("click",p0,{signal:t}),document.addEventListener("visibilitychange",g0,{signal:t}),Tl=_n("schemeChange",()=>Ll())},stop(){fa?.abort(),fa=null,ir!==void 0&&(clearTimeout(ir),ir=void 0),l0(),Sl?.(),Sl=null,Tl?.(),Tl=null,bt=!1,xo=!1,go=!1,b0()},onSettingsChange(){let t=ga(bo());t.length!==bo().length&&(nt.store.visits=t),bt&&sr()}});var Pl="cleaner",y0=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],v0=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],x0=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],w0=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],E0=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],S0=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],bn=M({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function lr(t){return`${t.join(",")}{display:none!important}`}function Lf(){let t=[];if(bn.store.hideDownloadApps!==!1&&t.push(lr(y0)),bn.store.hideDisclaimer!==!1&&t.push(lr(v0)),bn.store.hideUpgrade!==!1&&t.push(lr(x0)),bn.store.hideLockedModels!==!1&&t.push(lr(w0)),bn.store.hideHomePromo!==!1&&t.push(lr(E0)),bn.store.hideAds!==!1&&t.push(lr(S0)),!t.length){L(Pl);return}k(Pl,t.join(`
`))}var kf=E({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:bn,start:Lf,onSettingsChange:Lf,stop(){L(Pl)}});var ya=new C("ResponseNotification"),ur=M({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:H0},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ol=!1,ba=null,cr=null,wo=null;function T0(){return document.visibilityState==="hidden"||document.hidden}function L0(){return ur.store.onlyWhenHidden===!1?!0:T0()}function k0(){let t=Gn(A());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Cf(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!cr||cr.state==="closed")&&(cr=new t);let e=cr,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){ya.debug("chime failed",t)}}function C0(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){ya.debug("custom sound failed",e),Cf()}}function Mf(){let t=String(ur.store.soundUrl||"").trim();t?C0(t):Cf()}function M0(){let t="Bloom++",e=`${k0()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){ya.debug("notification failed",n)}}function A0(){L0()&&(ur.store.sound!==!1&&Mf(),ur.store.browserNotification!==!1&&M0())}function H0(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Mf()),t.appendChild(e),()=>{e.remove()}}var Af=E({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ur,start(){Ol=!0,ba?.(),ba=dt(t=>{if(!Ol||t.userStopped||t.error)return;let e=A()||Qn();t.conversationId&&t.conversationId!==e||A0()}),wo?.abort(),wo=new AbortController,ur.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:wo.signal}),ya.debug("watch started")},stop(){Ol=!1,ba?.(),ba=null,wo?.abort(),wo=null;try{cr?.close()}catch{}cr=null}});var Hf=`#bloom-pq-chip {
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
`;var ze=new C("PromptQueue"),Sa="bloom-pq-chip",If="promptQueue",N0=8,R0=50,P0=2e3,O0='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',B0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,D0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Bl=M({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),$e=new Map,Nf=0,Ft=!1,$t="",P="",ne=!1,yt=!1,Ge=!1,B=null,Eo=null,va=null,qe,Co,je=null,R=null,dr=null,wa=!1,lt=null,yn,Fe=!0,K=!1,U=!1,mt=!1;function pe(){return ce(Pt())}function fr(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function _0(t){let e=fr(Yt(t));if(e)return e;if(!Vt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),fr(n.innerText||n.textContent||"")}catch{return""}}function qf(){try{let t=document.querySelectorAll(O0),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function $f(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Ff(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&B0.test(n))return!0}}catch{}return!1}function Ea(){let t=Qn();if(!t)return!1;let e=A();return!e||e===t}function ko(){if(Y()||Ea())return!1;let t=qf();if(!t)return!0;if($f(t)||Ff(t))return!1;try{if(t.querySelector(D0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function q0(){if(G()||un())return K=!1,!1;if(Y()||Ea())return K=!0,!0;let t=qf();return t&&($f(t)||Ff(t))?(K=!0,!0):K&&!ko()?!0:(K=!1,!1)}function zf(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Wt);return n instanceof HTMLElement?n:null}function Rf(t){return zf(t)??st()}function Ta(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function jf(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function $0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?fr(e.innerText||e.textContent||""):""}catch{return""}}function F0(){return Nf+=1,`pq${Date.now().toString(36)}${Nf.toString(36)}`}function Z(t){return $e.get(t)??[]}function Gf(t){return Z(t)[0]}function vn(t,e){e.length?$e.set(t,e):$e.delete(t)}function Uf(t){if(!Z(t).length){U=!1,mt=!1,P="";return}U=!0,mt=!1,K=!0,P=""}function Pf(t){if(!$t||$t===t)return;let e=$e.get($t);!e?.length||$e.has(t)||X($t,t)&&($e.delete($t),$e.set(t,e),P===$t&&(P=t),B?.key===$t&&(B.key=t),ze.debug("migrated pending",$t,"\u2192",t))}function La(t){let e=pe(),n=Z(e);if(Bl.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),vn(e,n)}else if(n.length>=N0){ze.debug("queue full",e);return}else n.push({id:F0(),text:t,at:Date.now()}),vn(e,n);K=!0,B={key:e,text:t,turns:jf(),ticks:3};let r=st();r&&me(r,"");try{ct()}catch(o){ze.error("chip",o)}ze.debug("queued",e,n.length,t.length)}function Kf(t,e){let n=Z(t).filter(r=>r.id!==e);if(vn(t,n),R===e&&(R=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}ct()}function ql(){dr?.abort(),dr=null}function z0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function Of(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function j0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||R||lt)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;dr?.abort();let c=new AbortController;dr=c;let{signal:u}=c,d=!1,f=!1,p=0,m=0,h=0,g=0,v=null,b=[],x=[],ot=()=>{e.classList.add("bloom-pq-settling");for(let y of b)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},W=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(v?.isConnected?v.before(t):e.append(t)),v?.remove(),v=null,ot(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},J=()=>{wa=!0;let y=H=>{H.preventDefault(),H.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{wa=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=Of(b.length,p,m),H=x.length>1?(x[x.length-1].top-x[0].top-x.slice(0,-1).reduce((I,Gt)=>I+Gt.height,0))/(x.length-1):2,pt=new Array(x.length),xt=x[0]?.top??0;for(let I of y)pt[I]=xt,xt+=x[I].height+H;for(let I=0;I<b.length;I++){if(I===p)continue;let Gt=pt[I]-x[I].top;b[I].style.transform=Math.abs(Gt)<.5?"":`translate3d(0,${Math.round(Gt)}px,0)`}},ut=()=>{let y=Z(n).slice();if(p<0||p>=y.length)return;let H=Of(y.length,p,m);if(H.every((I,Gt)=>I===Gt))return;let pt=H.map(I=>y[I]).filter(Boolean);if(pt.length!==y.length)return;vn(n,pt);let xt=new Map(b.map(I=>[I.dataset.pqId||"",I]));for(let I of pt){let Gt=xt.get(I.id);Gt&&e.append(Gt)}},vt=y=>{if(f)return;f=!0;let H=d;dr===c&&(dr=null),H&&y&&t.isConnected&&ut(),W(),H&&J(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;W(),y&&J()});let oi=()=>{d=!0,b.push(...e.querySelectorAll(":scope > .bloom-pq-row")),p=b.indexOf(t),p<0&&(p=b.findIndex(I=>I.dataset.pqId===r)),m=p<0?0:p;let y=t.getBoundingClientRect();h=y.left,g=y.top;let H=getComputedStyle(t);v=document.createElement("div"),v.className="bloom-pq-gap",v.style.height=`${y.height}px`,t.before(v),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=H.color,t.style.font=H.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let pt=e.getBoundingClientRect(),xt=e.scrollTop;x=b.map(I=>{let ys=(I===t?v:I).getBoundingClientRect(),Gc=ys.top-pt.top+xt;return{top:Gc,height:ys.height,mid:Gc+ys.height/2}})},w=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(oi(),!d||p<0)))return;y.preventDefault(),t.style.left=`${h+(y.clientX-s)}px`,t.style.top=`${g+(y.clientY-l)}px`;let H=e.getBoundingClientRect(),pt=y.clientY-H.top+e.scrollTop,xt=z0(pt,x.map(I=>I.mid));xt!==m&&(m=xt,O())},N=y=>{y.pointerId===a&&vt(!0)};window.addEventListener("pointermove",w,{signal:u}),window.addEventListener("pointerup",N,{signal:u}),window.addEventListener("pointercancel",()=>vt(!1),{signal:u})})}function G0(){yt=!0,clearTimeout(Co),Co=setTimeout(()=>{yt=!1,Co=void 0},P0)}function U0(t){if(lt)return;let e=pe(),n=Z(e).find(i=>i.id===t);if(!n)return;let r=st();if(!r)return;let o=n.text;lt=t,R===t&&(R=null),ql(),ct(),clearTimeout(yn),yn=setTimeout(()=>{if(yn=void 0,!Ft||lt!==t)return;if(lt=null,pe()!==e||!Z(e).some(a=>a.id===t)){ct();return}vn(e,Z(e).filter(a=>a.id!==t)),ct(),G0(),me(r,o);let i=Ne();i&&!j(i)&&!Zi(i)&&(i.click(),yt=!1),Uf(e)},160)}function So(t){if(!Ft||ne||U||lt||Y()||pe()!==t)return;let e=Gf(t);if(!e){P="";return}if(Zt())return;let n=st();if(!n)return;if(!Ie(n)){let o=fr(Yt(n));if(o&&o!==e.text)return}let r=Ne();!r||j(r)||Zi(r)||(ne=!0,me(n,e.text),clearTimeout(qe),qe=setTimeout(()=>K0(t,e.id,e.text),R0))}function K0(t,e,n){qe=void 0;try{if(!Ft||U||lt)return;let r=Gf(t);if(!r||r.id!==e||r.text!==n||Y()||pe()!==t)return;let o=st();if(!o)return;let i=fr(Yt(o));if(i&&i!==n&&!Ie(o))return;i!==n&&me(o,n);let a=Ne();if(!a||j(a)||Zi(a))return;a.click(),vn(t,Z(t).filter(s=>s.id!==e)),ct(),Uf(t),ze.debug("drained",t,Z(t).length)}finally{ne=!1}}function Dl(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Dt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function _l(){ql(),je?.remove(),je=null,R=null,Fe=!0}var Wf="http://www.w3.org/2000/svg";function W0(){let t=document.createElementNS(Wf,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function To(t){let e=W0();for(let n of t){let r=document.createElementNS(Wf,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function Lo(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&Vf(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function V0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${Sa}`)}function xa(){let t=je?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function Y0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function _e(t,e){if(R!==t)return;if(R=null,e===null){ct();return}let n=fr(e),r=pe();if(!n){Kf(r,t);return}let o=Z(r).find(i=>i.id===t);o&&(o.text=n),ct()}function Bf(t){lt||R!==t&&(R&&_e(R,xa()),Z(pe()).some(e=>e.id===t)&&(R=t,Fe=!0,ct()))}function Vf(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function Df(t){return R===t?"edit":lt===t?"send":"text"}function X0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function Z0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||X0(l)!==Df(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",Fe?"true":"false"),n.hidden=!Fe;for(let s of e){let l=a.get(s.id);if(Df(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function ct(){if(ql(),!Ft||!document.body){_l();return}let t=pe(),e=Z(t);if(!e.length){_l();return}R&&!e.some(d=>d.id===R)&&(R=null),lt&&!e.some(d=>d.id===lt)&&(lt=null);let n=je;if(n?.isConnected||(n=document.createElement("div"),n.id=Sa,document.body.appendChild(n),je=n),Z0(n,e)){Dl(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",Fe?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Fe=!Fe,ct()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",Fe||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let p=R===d.id,m=lt===d.id;p||(f.setAttribute("role","button"),f.tabIndex=m?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),m&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let h=document.createElement("div");h.className="bloom-pq-body";let g;if(p){let b=document.createElement("textarea");b.className="bloom-pq-text bloom-pq-editing",b.value=d.text,b.rows=2,b.spellcheck=!1,b.setAttribute("aria-label","Queued message text"),b.addEventListener("keydown",x=>{x.stopPropagation(),x.key==="Enter"&&!x.shiftKey?(x.preventDefault(),_e(d.id,b.value)):x.key==="Escape"&&(x.preventDefault(),_e(d.id,null))}),b.addEventListener("blur",()=>_e(d.id,b.value)),g=b,u=b}else{let b=document.createElement("span");b.className="bloom-pq-text line-clamp-2",b.textContent=m?"Sending":d.text,m?Vf(b,l,"Sending now"):b.addEventListener("click",x=>{if(wa){wa=!1,x.preventDefault(),x.stopPropagation();return}x.preventDefault(),x.stopPropagation(),Bf(d.id)}),g=b}h.append(g),f.append(h);let v=document.createElement("div");if(v.className="bloom-pq-rail",p){let b=Lo("Save",To(["M20 6 9 17l-5-5"]),()=>{_e(d.id,g instanceof HTMLTextAreaElement?g.value:xa())},l),x=Lo("Cancel",To(["M18 6 6 18","m6 6 12 12"]),()=>{_e(d.id,null)},l);v.append(b,x)}else{let b=Lo("Remove from queue",To(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{R&&R!==d.id&&_e(R,xa()),R=R===d.id?null:R,Kf(t,d.id)},l,void 0,m),x=Lo("Edit queued message",To(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>Bf(d.id),l,"Edit",m),ot=Lo("Send now",To(["M12 19V5","M6 11 12 5l6 6"]),()=>{R&&R!==d.id&&_e(R,xa()),U0(d.id)},l,"Send now (or Enter on empty composer)",m);v.append(b,x,ot)}f.append(v),!p&&!m&&j0(f,c,t,d.id),c.append(f)}if(n.append(o,c),Dl(n),u){let d=u,f=R;queueMicrotask(()=>{R===f&&d.isConnected&&Y0(d)})}}function J0(){if(!B)return;B.ticks-=1;let t=Z(B.key);if(t.length&&jf()>B.turns){let e=$0();if(e&&e===B.text){ze.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),vn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,ct();return}}B.ticks<=0&&(B=null)}function ka(t){return!q0()||!Vt(t)?"":_0(t)}function Q0(t){if(!Ft||t.isComposing||t.keyCode===229||t.key!=="Enter"||V0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||ne)return;let e=Rf(t.target)??Rf(document.activeElement);if(!e)return;if(t.altKey||yt){yt=!1,Ge=!0,queueMicrotask(()=>{Ge=!1});return}let n=ka(e);n&&(Ta(t),La(n))}function ty(t){if(!Ft||ne||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Ge){Ge=!1;return}if(yt){yt=!1;return}let e=zf(t.target);if(!e)return;let n=ka(e);n&&(Ta(t),La(n))}function ey(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||j(e))return null;let n=t.closest(Jn);if(n instanceof HTMLElement&&!j(n))return n;let r=Ne();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function _f(t){if(!Ft)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Sa}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&j(n)||ne||!ey(e))return;if(yt){yt=!1;return}let r=st();if(!r)return;let o=ka(r);o&&(Ta(t),La(o))}function ny(t){if(!Ft)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Xi)&&!e.querySelector(Wt)||ne)return;if(Ge){Ge=!1;return}if(yt){yt=!1;return}let n=st()??e.querySelector(Wt);if(!n)return;let r=ka(n);r&&(Ta(t),La(r))}var Yf=E({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:If,cleanupSelectors:[`#${Sa}`],settings:Bl,start(){Ft=!0;let t=Bl.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),$t=pe(),P="",ne=!1,yt=!1,Ge=!1,B=null,K=!G()&&!un()&&(Y()||Ea()),U=!1,mt=!1,R=null,lt=null,clearTimeout(yn),yn=void 0,k(If,Hf),Eo?.abort(),Eo=new AbortController;let{signal:e}=Eo,n={capture:!0,signal:e};window.addEventListener("keydown",Q0,n),document.addEventListener("beforeinput",ty,n),document.addEventListener("pointerdown",_f,n),document.addEventListener("click",_f,n),document.addEventListener("submit",ny,n),va?.(),va=dt({onFall(r){if(Ft){if(r.userStopped||r.error){K=!1,U=!1,mt=!1,P="",ct();return}if(!(U&&!mt)){if(U&&mt){if(!ko())return;U=!1,mt=!1,K=!1,P=r.contextKey,So(r.contextKey);return}if(!ko()){ze.debug("unsettled fall; keep queue window");return}K=!1,P=r.contextKey,So(r.contextKey)}}},onRise(){G()||un()||(U&&(mt=!0),K=!0)},onContext(r,o){o&&r&&!X(o,r)&&(K=!1,U=!1,mt=!1,P="",ne=!1,qe!==void 0&&(clearTimeout(qe),qe=void 0)),Pf(r),$t=r,ct()},onTick(r){Pf(r.contextKey),$t=r.contextKey,J0(),(G()||un())&&(U=!1,mt=!1,K=!1,P=""),U&&(Y()||Ea())&&(mt=!0),U&&mt&&ko()&&(U=!1,mt=!1,K=!1,Z(r.contextKey).length&&(P=r.contextKey,So(r.contextKey))),!U&&K&&ko()&&(K=!1,!P&&Z(r.contextKey).length&&(P=r.contextKey,So(r.contextKey))),!U&&P&&P===r.contextKey&&So(P),Z(r.contextKey).length&&!je?.isConnected?ct():je&&Dl(je)}}),ct(),ze.debug("watch started")},stop(){Ft=!1,va?.(),va=null,Eo?.abort(),Eo=null,clearTimeout(qe),qe=void 0,clearTimeout(Co),Co=void 0,clearTimeout(yn),yn=void 0,lt=null,$e.clear(),B=null,P="",ne=!1,yt=!1,Ge=!1,K=!1,U=!1,mt=!1,_l()}});var Xf=`.bloom-cls {
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
`;var Qf=new C("ChatListStatus"),Zf="chatListStatus",Aa="bloom-cls",oy="bloom-cls",iy=1200*1e3,ay="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",zt=new Map,re=!1,kt="",ge=!1,gr=!1,Ct=0,Ue=null,zl=null,mr=null,$l=null,Ca=null,Mo=null,pr=!1,Ke=new Set;function Ma(){return Date.now()}function tm(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function he(t,e,n,r=!0){if(!(!t||!re)){if(e==="idle")zt.delete(t);else{let o=zt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ma():zt.set(t,{kind:e,at:Ma(),source:n})}r&&sy({v:1,id:t,kind:e,at:Ma()}),xn()}}function sy(t){try{mr?.postMessage(t)}catch{}}function ly(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||he(e.id,e.kind,"bc",!1)}function cy(){let t=Ma();for(let[e,n]of zt)n.kind==="streaming"&&t-n.at>iy&&zt.delete(e)}function uy(){let t=tm();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(ay))continue;let o=ue(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Jf(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Fl(t){let e=t.querySelector(`:scope > .${Aa}`);return e||null}function jl(){if(!re)return;cy();let t=A(),e=uy();Ue?.disconnect();try{for(let n of e){let r=ue(n.getAttribute("href")||"");if(!r||!t||r!==t){Fl(n)?.remove();continue}let i=zt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Fl(n)?.remove();continue}let a=Fl(n);a||(a=document.createElement("span"),a.className=Aa,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Jf("streaming")):i==="error"&&a.appendChild(Jf("error")))}}catch(n){Qf.debug("paint failed",n)}em()}function xn(){if(re){if(document.hidden){Ct&&(cancelAnimationFrame(Ct),Ct=0),jl();return}Ct||(Ct=requestAnimationFrame(()=>{Ct=0,re&&jl()}))}}function em(){let t=tm();if(!(Ue&&zl===t&&t?.isConnected)){if(Ue?.disconnect(),zl=t,!t){Ue=null;return}Ue=new MutationObserver(()=>xn()),Ue.observe(t,{childList:!0,subtree:!0})}}function Ha(){return!!(on()||so())}function dy(t){return!!(pr||t&&Ke.has(t)||!gr&&!G()&&Ha())}function fy(t){if(re){if(t.type==="post-start"){gr=!1,t.conversationId?(pr=!1,Ke.add(t.conversationId),ge=!0,he(t.conversationId,"streaming","net")):(pr=!0,ge=!0);return}if(t.type==="post-end"){if(pr=!1,t.conversationId){Ke.delete(t.conversationId);let e=A(),n=Qn();(e?t.conversationId===e:t.conversationId===n)?he(t.conversationId,t.error?"error":"done","net"):he(t.conversationId,"idle","net")}Ha()||(ge=!1)}}}function my(t,e){if(!re)return;if(X(e,t)){xn();return}let n=A();if(kt&&kt!==n){Ke.delete(kt);let r=zt.get(kt);r&&r.kind!=="idle"&&he(kt,"idle","local")}pr=!1,ge=!1,gr=!0,n&&zt.get(n)?.kind==="streaming"&&zt.get(n)?.source==="local"&&!Ke.has(n)&&he(n,"idle","local"),xn()}function py(t){if(!re)return;let e=t.conversationId||A();if(kt&&e&&kt!==e){Ke.delete(kt);let r=zt.get(kt);r&&r.kind!=="idle"&&he(kt,"idle","local"),ge=!!(e&&Ke.has(e))}if(e&&(kt=e),gr||G()){if(G()||Ha()||t.streaming){xn();return}gr=!1}if(dy(e)&&(t.streaming||Ha())){ge=!0,e&&he(e,"streaming","local"),xn();return}ge&&(ge=!1,e&&he(e,Zt()?"error":"done","local")),xn()}var nm=E({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Aa}`],start(){re=!0,k(Zf,Xf);try{mr=new BroadcastChannel(oy)}catch{mr=null}mr?.addEventListener("message",ly),$l=wt(fy),Ca?.(),Ca=dt({onTick:py,onContext:my}),Mo?.abort(),Mo=new AbortController,document.addEventListener("visibilitychange",()=>{re&&(Ct&&(cancelAnimationFrame(Ct),Ct=0),jl())},{signal:Mo.signal}),em(),Qf.debug("sidebar status watch started")},stop(){re=!1,Ct&&cancelAnimationFrame(Ct),Ct=0,Mo?.abort(),Mo=null,Ue?.disconnect(),Ue=null,zl=null,Ca?.(),Ca=null,$l?.(),$l=null;try{mr?.close()}catch{}mr=null,zt.clear(),Ke.clear(),pr=!1,ge=!1,gr=!1,kt="",document.querySelectorAll(`.${Aa}`).forEach(t=>t.remove()),L(Zf)}});var om="widerChat",im=40,am=96,sm=64,lm=M({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:im,max:am,default:sm}});function gy(){return at(Number(lm.store.width??sm),im,am)}function rm(){let t=gy(),e=`min(100%,${t}rem)`;k(om,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var cm=E({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:lm,start:rm,onSettingsChange:rm,stop(){L(om)}});var Gl="composerOpacity",hr='form[data-type="unified-composer"],form.w-full[data-type]',hy=[`${hr} [class*="corner-superellipse"]`,`${hr} [class*="bg-token-bg-primary"]`,`${hr} [class*="bg-token-main-surface"]`].join(","),by=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),yy="#thread-bottom-container,#thread-bottom",vy=`${hr} #prompt-textarea,${hr} [contenteditable="true"]`,xy="var(--bg-primary,var(--main-surface-primary,#ffffff))",Ul=M({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function wy(){return at(Number(Ul.store.opacity??100),0,100)}function Ey(){return at(Number(Ul.store.blur??16),0,40)}function um(){let t=wy();if(t>=100){L(Gl);return}let e=Ey(),n=`color-mix(in srgb,${xy} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(Gl,`${yy}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${by}{display:none!important}${hr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${hy}{background-color:${n}!important;background-image:none!important;${r}}${vy}{background-color:transparent!important;background-image:none!important}`)}var dm=E({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ul,start:um,onSettingsChange:um,stop(){L(Gl)}});var fm=`#bloom-bn-host {
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
`;var Ty=new C("BetterNavigator"),Kl="betterNavigator",hm="bloom-bn-host",Ln=60,Xl=1e3,mm=2400,Ly=80,bm=2.5,ky=.4,yr="\u6B63\u5728\u8F93\u51FA\u2026",Zl="Image",Cy="\u2753",My="\u{1F916}",pm=/file_[0-9a-f]+/gi,Ay="File",Hy="Code",Iy=".markdown, .whitespace-pre-wrap",ic=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Ny="img, picture, video, canvas",Ry=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,Py=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,_o=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,Oy=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,By=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Dy=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,_y=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,qy=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,$y=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Fy=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),zy=2e3,jy=40,Gy=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,ym=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),Uy=["#prompt-nav-container","[id*='prompt-nav' i]","[data-testid*='prompt-nav' i]","[aria-label='Prompt navigator' i]","[aria-label='Conversation navigator' i]","nav[aria-label*='prompt navigator' i]","nav[aria-label*='conversation navigator' i]"].join(", "),Ky=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Wy=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),Vy=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),xr=M({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),jt=new Map,Po=new Map,oe=new Set,Ra=0,Ht=!1,ye=!1,br=!1,ve=null,wr=null,Er=null,Pa=null,F=[],Sn="",Oa=0,Oo=-1,Bo=0,Ba="",At=0,be=0,Ho,Io=null,Ia=null,Wl=null,Vl=null,wn=null,Jl=null,No=null,En=null,xe=null,Ro=null,Da=!1,Ql=0;function Sr(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Yl(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function Yy(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function Xy(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Gy.test(Yy(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Yl(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Yl(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Yl(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function kn(t){try{return!!t.closest(Ky)}catch{return!0}}function gm(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function $a(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Fa(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function Zy(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Na(t,e){if(t){pm.lastIndex=0;for(let n of t.matchAll(pm))e.add(n[0].toLowerCase())}}function Jy(t){try{let e=new Set,n=s=>{Zy(s)||(Na(s.getAttribute("src")||"",e),Na(s.getAttribute("srcset")||"",e),Na(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Na(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=$a(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function Qy(t,e){let n=Jy(t),r=Po.get(e)??0,o=Math.max(r,n);return o>0&&Po.set(e,o),o>=2?`${Zl} x${o}`:Zl}function _(t){return t.replace(/\s+/g," ").trim()}function vm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(Wy))return!0;n=n.parentElement}return!1}function _a(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(vm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(ic);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return _(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Ln+20;)e.push(_(r.textContent||""));return _(e.join(" "))}function qo(t){let e=_(t);return e.length<3||e.length>180||_o.test(e)?!1:Ry.test(e)?!0:Py.test(e)}function za(t){let e=_(t);return e.length<8||e.length>120||/\s/.test(e)||_o.test(e)||qo(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function tv(t){let e=[],n=i=>{let a=_(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(_(s[1])),e.push(_(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function ev(t){try{return kn(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function ac(t){let e=_(t);return!e||sc(e)||za(e)?!0:qo(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function nv(t){return!t.length||t.length>4||!t.every(e=>ac(e))?!1:t.some(e=>_o.test(_(e))||qo(e)||za(e))}function xm(t){try{let e=null,n=0,r=`${ic}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(ev(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=tv(o);if(!i.length||i.length>4||i.join(" ").length>240||!nv(i))continue;let a=i.some(c=>_o.test(_(c))),s=i.some(c=>qo(c)||za(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function wm(t){return xm(t)?Ay:""}function rv(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(Oy.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function ov(t){try{for(let e of t.querySelectorAll(Ny))if(!rv(e))return!0}catch{}return!1}function sc(t){let e=_(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||_y.test(e)||Dy.test(e)?!0:e.length<=24&&(qy.test(e)||_o.test(e))}function iv(t){let e=[],n=new Set,r=o=>{try{if(vm(o,t)||o.closest(ic))return}catch{return}let i=_a(o);!i||n.has(i)||sc(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>Ln+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(_a(o).length<24)&&(r(o),e.join(" ").length>Ln+20))break}}catch{}return _(e.join(" "))}var av=/^[a-z]{2,3}(?:[-_][a-z0-9]{2,4})+$/i;function Tn(t){return av.test(_(t))}function sv(t){let e=xm(t);if(!e)return"";let n="",r="",o=(i,a)=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let s=_(i.innerText||i.textContent||"");!s||s.length>Ln+20||ac(s)||Tn(s)||!a&&i.matches("button, [role='button']")||(a?n||(n=s):r||(r=s))};try{for(let i of t.querySelectorAll(".whitespace-pre-wrap, .markdown, p, li, h1, h2, h3, blockquote"))if(o(i,!0),n)break;if(!n){for(let i of t.querySelectorAll("div, span"))if(!i.querySelector("div, p, li, button")&&(o(i,!1),r))break}}catch{}return _(n||r)}function Em(t,e){let n=[];try{for(let o of t.querySelectorAll(Iy)){if(kn(o))continue;let i=_a(o);if(!(!i||e==="assistant"&&sc(i)||ac(i))&&(n.push(i),n.join(" ").length>Ln+20))break}}catch{}let r=_(n.join(" "));if(e==="user"){let o=sv(t);if(o)return o}return r||(e==="assistant"?iv(t):"")}function Sm(t){return t.length>Ln?`${t.slice(0,Ln).trimEnd()}\u2026`:t}function tc(t){return $y.test(t)}function lv(t,e,n,r){let o=Em(t,e);if(o)return Sm(o);if(r)return yr;let i=wm(t);if(i)return i;if(Fa(t))return Qy(t,$a(t));try{if(ov(t))return Zl;if(t.querySelector("pre, code"))return Hy}catch{}return`Message ${n+1}`}function cv(){if(ye)return!0;let t=A();return!!(t&&oe.has(t)||!br&&!G()&&$o())}function $o(){return!!(on()||so())}function uv(){Ra=Date.now()}function Tm(t){ye=!1,t&&oe.delete(t);let e=A();e&&oe.delete(e)}function Lm(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function dv(t){if(Fa(t)||!$o())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!_a(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function ja(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=_(e.textContent||"");if(!(n.length>32)&&By.test(n))return!0}}catch{}return!1}function lc(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function fv(t,e){try{if(Lm(t))return!0;if(!e)return!1;if(dv(t)||ja(t))return!0}catch{}return!1}function km(t){if(!t||$o())return!1;try{if(ja(t)||lc(t))return!1;if(t.querySelector(Fy)||Fa(t))return!0}catch{}return!1}function mv(t){if($o()||Ra&&Date.now()-Ra<zy)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!km(e.el)||Tm()}function pv(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(ym)){if(kn(r))continue;let i=$a(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(kn(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function ec(t){let e=[t.getAttribute("data-message-id"),t.getAttribute("data-turn-id"),t.querySelector("[data-message-id]")?.getAttribute("data-message-id"),t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id")],n=[];for(let r of e)r&&!n.includes(r)&&n.push(r);return n}function gv(t,e,n){return!(Fa(t)||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")||Lm(t)||lc(t)||ja(t)||e&&n||Em(t,"assistant")||wm(t))}function hv(t){let e=xr.store.showAssistant!==!1,n=e&&cv(),r=pv(t),o=null;if(e)for(let a of r)gm(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=$a(a);if(!s)continue;let l=gm(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o;if(l==="assistant"&&gv(a,c,n))continue;let u=c&&ja(a),d=c&&lc(a),f=l==="assistant"&&c&&!km(a)&&(u||d||n||fv(a,!0)),p=lv(a,l,i.length,f);if(p&&p!==yr&&!Tn(p)){let h=jt.get(s),g=!!h&&(qo(h)||za(h));(!h||g||!tc(p)||tc(h))&&p!==h&&jt.set(s,p)}let m=f&&p===yr?yr:jt.get(s)||p;i.push({id:s,el:a,role:l,text:m,live:f})}}catch{}return i}function vr(t){return _(t).replace(/…+$/g,"").trim().toLowerCase()}function Ao(t,e){if(t.set(e.id,e),e.alias&&t.set(e.alias,e),!!e.el)for(let n of ec(e.el))t.set(n,e)}function bv(t){let e=new Map;for(let n of t)Ao(e,n);return e}function Do(t,e){!t.el&&e.el?.isConnected&&(t.el=e.el);let n=!!e.text&&!Tn(e.text),r=!t.text||tc(t.text)||Tn(t.text);n&&r&&(t.text=e.text,jt.set(t.id,e.text)),e.id&&e.id!==t.id&&!t.alias&&(t.alias=e.id)}function yv(t,e,n,r){let o=vr(n);if(!o)return;let i=t.filter(s=>s.role===e&&vr(s.text)===o);if(!i.length)return;let a=i.find(s=>!s.el);return a||(r<0?i[0]:i.reduce((s,l)=>{let c=Math.abs(t.indexOf(l)-r),u=Math.abs(t.indexOf(s)-r);return c<u?l:s}))}function vv(t,e){let n=t.text&&!Tn(t.text)?t.text:"";if(e){let a=!!e.text&&e.text!==yr&&!Tn(e.text)?e.text:n||e.text;return a&&a!==yr&&jt.set(t.id,a),{...e,id:t.id,text:a,alias:t.alias||e.alias}}let r=jt.get(t.id)||(t.alias?jt.get(t.alias):"")||"",o=r&&!Tn(r)?r:"";return{id:t.id,el:null,role:t.role,text:o||n||r||"Message",...t.alias?{alias:t.alias}:{}}}function Cm(t,e){if(t.el&&e.el&&t.el===e.el)return!0;let n=new Set;if(t.id&&n.add(t.id),t.alias&&n.add(t.alias),t.el)for(let r of ec(t.el))n.add(r);if(e.id&&n.has(e.id)||e.alias&&n.has(e.alias))return!0;if(e.el){for(let r of ec(e.el))if(n.has(r))return!0}return!1}function xv(t,e,n){return!t.id||!e.id||t.id===e.id||t.alias===e.id||e.alias===t.id?!1:n.has(t.id)&&n.has(e.id)}function wv(t){let e=[];for(let n of t){let r=e[e.length-1];if(r&&r.role==="user"&&n.role==="user"&&Cm(r,n)){Do(r,n);continue}e.push(n)}return e}function Ev(t,e){let n=xr.store.showAssistant!==!1,r=bv(e),o=new Set;for(let l of t)l.id&&o.add(l.id),l.alias&&o.add(l.alias);let i=new Set,a=[];for(let l of t){if(l.role==="assistant"&&!n)continue;let c=r.get(l.id)||(l.alias?r.get(l.alias):void 0)||e.find(d=>d.role===l.role&&!!d.el&&!i.has(d.el)&&vr(d.text)===vr(l.text||"")&&!(d.id&&o.has(d.id)&&d.id!==l.id&&d.id!==l.alias)),u=vv(l,c);u.el&&i.add(u.el),a.push(u)}for(let l=0;l<e.length;l++){let c=e[l];if(!c.el||i.has(c.el))continue;let u=a.length;for(let m=l-1;m>=0;m--){let h=e[m].el;if(!h)continue;let g=a.findIndex(v=>v.el===h);if(g>=0){u=g+1;break}}if(u===a.length)for(let m=l+1;m<e.length;m++){let h=e[m].el;if(!h)continue;let g=a.findIndex(v=>v.el===h);if(g>=0){u=g;break}}let d=a.find(m=>m.role===c.role&&Cm(m,c));if(d&&!xv(d,c,o)){Do(d,c),i.add(c.el);continue}let f=yv(a,c.role,c.text,u),p=!!f&&!!c.id&&o.has(c.id)&&c.id!==f.id&&c.id!==f.alias;if(f&&!p){Do(f,c),i.add(c.el);continue}a.splice(u,0,c),i.add(c.el)}let s=-1;for(let l=0;l<a.length;l++)a[l].role==="assistant"&&(s=l);for(let l=0;l<a.length;l++)a[l].live&&l!==s&&(a[l].live=!1);return a}function Sv(t){if(kn(t))return!1;try{if(t.closest("#bloom-bn-host, #bloom-root, #bloom-sidebar-panel, #bloom-plugin-layer"))return!1}catch{return!1}let e=`${t.id} ${t.getAttribute("data-testid")||""} ${t.getAttribute("aria-label")||""}`;return/prompt-nav|promptnav|conversation-nav|prompt navigator|conversation navigator/i.test(e)}var Mm=/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,Tv=/^(?:go to message(?: \d+)?|message \d+|prompt navigator|conversation navigator|\d+)$/i;function Lv(t){let e=["data-turn-id","data-message-id","data-goto-message-id","data-messageid","data-conversation-turn-id","data-scroll-to-id","data-id"];for(let r of e){let o=t.getAttribute(r)||"";if(o)return o}return(t.getAttribute("href")||"").match(Mm)?.[0]??""}function kv(t){let e=t.getAttribute("aria-label")||t.getAttribute("title")||t.getAttribute("data-preview")||t.textContent||"";return Sm(_(e))}function Am(t){return!t||t.startsWith("native:")||t.startsWith("anon:")||t.startsWith("mid:")?!1:Mm.test(t)?!0:/^[a-zA-Z0-9_-]{8,}$/.test(t)}function Cv(t){return!t||Tv.test(t.trim())}function Mv(){let t=[],e=new Set;try{for(let n of document.querySelectorAll(Uy))if(Sv(n))for(let r of n.querySelectorAll("button, a, [role='button']")){if(kn(r))continue;let o=Lv(r);if(!Am(o)||e.has(o))continue;e.add(o);let i=kv(r),a=uc(o);t.push({id:o,el:a?.isConnected?a:null,role:"user",text:i||"Message"})}}catch{}return t}function Av(t,e){if(!e.length)return t;let n=e.filter(i=>Am(i.id)&&!Cv(i.text));if(!n.length)return t;let r=t.slice(),o=new Map;for(let i of r)Ao(o,i);for(let i=0;i<n.length;i++){let a=n[i],s=r.length;for(let f=i+1;f<n.length;f++){let p=o.get(n[f].id);if(!p)continue;let m=r.indexOf(p);if(m>=0){s=m;break}}let l=o.get(a.id);if(l){Do(l,a),Ao(o,l);continue}let c=vr(a.text),u=c?r.filter(f=>f.role==="user"&&vr(f.text)===c):[];if(u.length===1){Do(u[0],a),Ao(o,u[0]);continue}if(u.length>1)continue;let d={id:a.id,el:a.el,role:"user",text:a.text||"Message"};r.splice(s,0,d),Ao(o,d),jt.set(d.id,d.text)}return r}function Hv(){let t=Sr();if(!t||t===document.body)return[];let e=hv(t),n=A(),r=n?Ur(n):[],o=r.length?Ev(r,e):e,i=wv(Av(o,Mv()));return mv(i),i}function Hm(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Ga(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function cc(t){return t===window?window.innerHeight:t.clientHeight}function Iv(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(Vy)}catch{return!1}}function Im(){Ho!==void 0&&(clearTimeout(Ho),Ho=void 0),Io?.classList.remove("bloom-bn-flash"),Io=null}function Nm(t){Im(),t.classList.add("bloom-bn-flash"),Io=t,Ho=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Io===t&&(Io=null),Ho=void 0},800)}function qa(t){if(!F.length)return;let e=Math.max(0,Math.min(t,F.length-1));Oa=e,wr?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),Er?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),Pa&&(Pa.textContent=`${e+1} / ${F.length}`),Nv(e)}function Nv(t){let e=wr,n=e?.children[t];if(!(e instanceof HTMLElement)||!(n instanceof HTMLElement))return;let r=e.getBoundingClientRect(),o=n.getBoundingClientRect();o.top<r.top?e.scrollTop-=r.top-o.top:o.bottom>r.bottom&&(e.scrollTop+=o.bottom-r.bottom)}function Rm(t){if(Da)return;let e=Er?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function nc(t){let e=F[t];if(!e)return;let n=e.el?.isConnected?e.el:uc(e.id);if(!n){Ov(t);return}e.el=n,Oo=t,Bo=Date.now()+Xl,qa(t),Rm(t);let r=xe??Ga(n),i=Math.abs(n.getBoundingClientRect().top-Hm())>bm*cc(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),xr.store.jumpEffect!=="none"&&Nm(n)}function uc(t){let e=Sr();if(!e||e===document.body||!t)return null;let n=[t],r=A(),i=(r?Ur(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"]`)}catch{}if(!s||kn(s))continue;let l=s.closest(ym);return l instanceof HTMLElement?l:s}return null}function dc(){if(xe)return xe;let t=Sr();return t?Ga(t):window}function Rv(t){let e=dc(),n=cc(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function Pv(t,e){let n=dc();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function Ov(t){let e=++Ql,n=F[t];if(!n)return;if(!n.el){let l=A();l&&jn(l)}Oo=t,Bo=Date.now()+mm+Xl,qa(t),Rm(t);let r=-1;for(let l=0;l<F.length;l++)F[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+mm,a=0,s=-1;for(;Date.now()<i;){if(e!==Ql||!Ht)return;let l=uc(n.id);if(l){n.el=l,Bo=Date.now()+Xl;let d=xe??Ga(l),p=Math.abs(l.getBoundingClientRect().top-Hm())>bm*cc(d);l.scrollIntoView({behavior:p?"auto":"smooth",block:"start"}),xr.store.jumpEffect!=="none"&&Nm(l),Mt();return}let c=dc(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&Pv(o,u))break;Rv(o),await new Promise(d=>setTimeout(d,Ly))}}function fc(){if(!Ht||!F.length)return;if(Date.now()<Bo&&Oo>=0){qa(Oo);return}let t=window.innerHeight*ky,e=0;for(let n=0;n<F.length;n++){let r=F[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}qa(e)}function Bv(t){let e=Ga(t);if(xe===e&&Ro)return;Ro?.(),xe=e;let n=e===window?document:e,r=()=>{fc(),mc()};n.addEventListener("scroll",r,{passive:!0}),Ro=()=>n.removeEventListener("scroll",r)}function Dv(t){En?.disconnect(),En=null;let e=xe instanceof HTMLElement?xe:null;En=new IntersectionObserver(()=>fc(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&En.observe(n.el)}function _v(){if(!document.body)return null;let t=ve;if(t?.isConnected)return t;t=document.createElement("div"),t.id=hm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0,t.addEventListener("pointerenter",()=>{let a=A();a&&jn(a)});let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{Da=!0}),n.addEventListener("pointerleave",()=>{Da=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),ve=t,wr=e,Er=i,Pa=o,t}function Pm(){let t=ve,e=Sr();if(!t||!e||!e.isConnected||F.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=Xy(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||jy,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function mc(){!Ht||be||(be=requestAnimationFrame(()=>{be=0,Ht&&Pm()}))}function qv(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function $v(t){let e=wr,n=Er;if(!e||!n)return;e.replaceChildren(),n.replaceChildren();let r=Number.parseFloat(getComputedStyle(ve??e).getPropertyValue("--bloom-bn-cap"))||0;e.style.justifyContent=r&&t.length*18+16>r?"flex-start":"center",t.forEach((o,i)=>{let a=document.createElement("button");a.type="button",a.className=qv(o),a.setAttribute("aria-label",`Go to message ${i+1} of ${t.length}`),a.addEventListener("click",u=>{u.preventDefault(),nc(i)}),e.appendChild(a);let s=document.createElement("button");s.type="button",s.className=`bloom-bn-item bloom-bn-${o.role}`;let l=document.createElement("span");l.className="bloom-bn-emoji",l.textContent=o.role==="user"?Cy:My;let c=document.createElement("span");c.className="bloom-bn-label",c.textContent=o.text,c.title=o.text,s.append(l,c),s.addEventListener("click",u=>{u.preventDefault(),nc(i)}),n.appendChild(s)})}function Fv(t){wr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Er?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function zv(){let t=A();return t===Ba?!1:(Ba=t,jt.clear(),Po.clear(),F=[],Sn="",Oa=0,Oo=-1,Bo=0,ye&&t&&(oe.add(t),ye=!1),!0)}function jv(t){let e=xr.store.showAssistant!==!1?"1":"0";return`${Ba}|${e}|${t.map(n=>n.id).join(",")}`}function rc(){if(!Ht)return;zv();let t=Hv(),e=Sr();if(!e||t.length<1){F=t,Sn="",ve&&(ve.hidden=!0),En?.disconnect(),oc();return}_v();let n=jv(t);n!==Sn?(F=t,Sn=n,$v(t),Bv(e),Dv(t)):(F=t,Fv(t)),Pm(),fc(),oc()}function Mt(){if(Ht){if(document.hidden){At&&(cancelAnimationFrame(At),At=0),rc();return}At||(At=requestAnimationFrame(()=>{At=0,Ht&&rc()}))}}function oc(){let t=Sr();if(!(wn&&Jl===t&&t?.isConnected)){if(wn?.disconnect(),No?.disconnect(),Jl=t,!t||t===document.body){wn=null;return}wn=new MutationObserver(()=>Mt()),wn.observe(t,{childList:!0,subtree:!0}),No=new ResizeObserver(()=>mc()),No.observe(t)}}function Gv(t){if(Ht){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===A())&&Mt();return}if(t.type==="post-start"){uv(),br=!1,t.conversationId?(ye=!1,oe.add(t.conversationId)):ye=!0,Mt();return}if(t.type==="post-end"){if(ye=!1,t.conversationId)oe.delete(t.conversationId);else{let e=A();e&&oe.delete(e)}Mt()}}}function Uv(t){if(!Ht||!F.length||ve?.hidden||t.altKey||t.ctrlKey||t.metaKey||Iv(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Oa+1;else if(t.key==="ArrowUp")e=Oa-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=F.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),nc(Math.max(0,Math.min(e,F.length-1)))}function Kv(){Ql++,Im(),En?.disconnect(),En=null,wn?.disconnect(),wn=null,Jl=null,No?.disconnect(),No=null,Ro?.(),Ro=null,xe=null,Da=!1,ve?.remove(),ve=null,wr=null,Er=null,Pa=null}var Om=E({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted yet. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Kl,cleanupSelectors:[`#${hm}`],settings:xr,start(){Ht=!0,Ba=A(),k(Kl,fm),Ia=new AbortController;let{signal:t}=Ia;window.addEventListener("keydown",Uv,{signal:t}),window.addEventListener("popstate",Mt,{signal:t}),window.visualViewport?.addEventListener("resize",mc,{signal:t}),document.addEventListener("visibilitychange",()=>{Ht&&(At&&(cancelAnimationFrame(At),At=0),be&&(cancelAnimationFrame(be),be=0),rc())},{signal:t}),Vl=wt(Gv),Wl=dt({onTick(){if(G()){Mt();return}br&&!$o()&&(br=!1),Mt()},onFall(e){Tm(e.conversationId),Mt()},onContext(e,n){if(!X(n,e)){jt.clear(),Po.clear(),Sn="",ye=!1;let r=A();for(let o of[...oe])o!==r&&oe.delete(o);br=!0}Mt()}}),oc(),Mt(),Ty.debug("navigator started")},stop(){Ht=!1,At&&cancelAnimationFrame(At),At=0,be&&cancelAnimationFrame(be),be=0,Ia?.abort(),Ia=null,Wl?.(),Wl=null,Vl?.(),Vl=null,oe.clear(),ye=!1,br=!1,Ra=0,Kv(),jt.clear(),Po.clear(),F=[],Sn="",L(Kl)},onSettingsChange(){Sn="",Mt()}});var Bm=`.bloom-ts {
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
`;function Dm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function _m(t){try{return new Date(t).toISOString()}catch{return""}}var Fm=new C("MessageTimestamps"),qm="messageTimestamps",Ka="bloom-ts",$m=1500,Vv="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Tr=M({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Lr=new Map,An=!1,It=0,We=null,gc=null,pc=null,Ua=null,Fo=null,zo=!1,Cn=!1;function zm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function bc(){let t=Tr.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function jm(){let t={...bc()};for(let[n,r]of Lr)t[n]=r;let e=Object.keys(t);if(e.length>$m){let n=e.slice(e.length-$m),r={};for(let o of n)r[o]=t[o];Tr.store.stamps=r;return}Tr.store.stamps=t}var Yv=Qc(jm,500);function Gm(t,e){!t||!e||Lr.get(t)===e||(Lr.set(t,e),Yv(),Mn())}function Xv(t){return t?Lr.get(t)??bc()[t]??Si(t)??null:null}function Zv(t){An&&t.type==="message-time"&&Gm(t.messageId,t.createTime)}function Jv(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Qv(){let t=zm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Vv)||e.push(n)}catch{}return e}function tx(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function hc(){if(!An)return;let t=Tr.store.hideOwnMessages===!0,e=Tr.store.showDate!==!1,n=Y();Cn&&!G()&&(Cn=!1),Cn&&(n?zo=!1:Cn=!1);let r=Cn?!1:n,o=Qv();We?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=Jv(i),c=i.querySelector(`:scope > .${Ka}`);if(t&&l==="user"){c?.remove();return}if(tx(i)){c?.remove();return}let u=Xv(s);if(!u&&s&&(r||zo)&&a>=o.length-2&&(u=Date.now(),Gm(s,u)),!u){c?.remove();return}let d=Dm(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Ka,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let p=_m(u);p&&f.getAttribute("datetime")!==p&&f.setAttribute("datetime",p)})}catch(i){Fm.debug("paint failed",i)}zo=r,Um()}function Mn(){if(An){if(document.hidden){It&&(cancelAnimationFrame(It),It=0),hc();return}It||(It=requestAnimationFrame(()=>{It=0,An&&hc()}))}}function Um(){let t=zm();if(!(We&&gc===t&&t?.isConnected)){if(We?.disconnect(),gc=t,!t||t===document.body){We=null;return}We=new MutationObserver(()=>Mn()),We.observe(t,{childList:!0,subtree:!0})}}var Km=E({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ka}`],settings:Tr,start(){An=!0,k(qm,Bm);let t=bc();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Lr.set(e,n);pc=wt(Zv),Ua?.(),Ua=dt({onTick:Mn,onFall:Mn,onContext(e,n){X(n,e)||(Cn=!0,zo=!1),Mn()}}),Fo?.abort(),Fo=new AbortController,document.addEventListener("visibilitychange",()=>{An&&(It&&(cancelAnimationFrame(It),It=0),hc())},{signal:Fo.signal}),Um(),Mn(),Fm.debug("timestamp watch started")},stop(){An=!1,It&&cancelAnimationFrame(It),It=0,Fo?.abort(),Fo=null,We?.disconnect(),We=null,gc=null,Ua?.(),Ua=null,pc?.(),pc=null,Cn=!1,zo=!1,jm(),Lr.clear(),document.querySelectorAll(`.${Ka}`).forEach(t=>t.remove()),L(qm)},onSettingsChange:Mn});var yc="streamerMode",ex="filter:blur(6px)!important;transition:filter .2s ease",nx="filter:none!important",kr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Cr=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function Nt(t,e){return t.map(n=>`${n} ${e}`)}var Hn=M({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Mr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${ex}}${e?`${r}{${nx}}`:""}`}function Wm(){let t=[];if(Hn.store.conversations!==!1&&(t.push(Mr([...Nt(Cr,'a[href^="/c/"]'),...Nt(Cr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Hn.store.projects!==!1&&(t.push(Mr([...Nt(Cr,'a[href*="/project"]'),...Nt(Cr,'a[href*="/g/g-p-"]'),...Nt(Cr,'[data-testid="project-name"]'),...Nt(Cr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Hn.store.headerTitle!==!1&&t.push(Mr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Hn.store.accountAvatar!==!1&&t.push(Mr([...Nt(kr,"img"),...Nt(kr,'[class*="avatar"]'),...Nt(kr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Hn.store.accountName!==!1&&t.push(Mr([...Nt(kr,".min-w-0 > .truncate"),...Nt(kr,".min-w-0.flex-1 .truncate")],!1)),Hn.store.accountEmail!==!1&&t.push(Mr([...Nt(kr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){L(yc);return}k(yc,t.join(`
`))}var Vm=E({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Hn,start:Wm,onSettingsChange:Wm,stop(){L(yc)}});var Ym=`.bloom-gc-panel {
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
}`;var ox=new C("GreetingCustomizer"),Ar="greetingCustomizer",Xm="greetingCustomizerUi",jo=100,xc=30,ix=120,ax=1e3,sx=50,lx=40,cx=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Go=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Za=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function ux(t){return!!t?.closest(cx)}function tp(t){return!!(ux(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Zo(t){try{for(let e of document.querySelectorAll(t))if(!tp(e))return e}catch{}return null}function vc(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Zo(e))return e;return t}var ep=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],rt=M({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:kx},greetings:{type:0,description:"Greeting texts",hidden:!0,default:ep},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),ie=!1,Nr=!1,Nn=null,Va,Uo,Hr,Ko,Ya=0,Wa=null,Ir=null,Wo=null,Vo=null,Yo=null,Xa=null;function Ee(){let t=location.pathname||"/";return t==="/"||t===""}function In(){let t=rt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):ep.slice()}function Xo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Zm(t){rt.store.greetings=t.slice(0,xc)}function Jo(){let t=String(rt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function dx(){return rt.store.order==="random"?"random":"sequential"}function fx(){return at(Number(rt.store.intervalSec??10),1,3600)*1e3}function mx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function px(){return!!Zo(Za)}function Ja(){return!!(Zo(Za)||Zo(Go))}function gx(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=px()?vc(Za):Zo(Go)?vc(Go):vc(Za),i=e?`${Go}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function hx(t,e){if(t<=0)return 0;if(t===1)return Number(rt.plain.index)!==0&&(rt.store.index=0),Number(rt.plain.lastRandom)!==0&&(rt.store.lastRandom=0),0;let n=Number(rt.plain.index),r=Number(rt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(dx()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return rt.store.index=s,rt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return rt.store.index=i,i}function we(t){if(!ie)return;if(!Ee()){L(Ar);return}let e=In().map(Xo).filter(Boolean);if(!e.length){L(Ar);return}let n=hx(e.length,t),r=e[n]??e[0],o=Jo()==="manual"&&e.length>1;k(Ar,gx(mx(r),o)),Xa?.()}function wc(){Va!==void 0&&(clearInterval(Va),Va=void 0)}function Ec(){wc(),!(!ie||!Ee())&&Jo()==="interval"&&(In().filter(Boolean).length<=1||(Va=setInterval(()=>we(!0),fx())))}function Sc(){Ko!==void 0&&(clearTimeout(Ko),Ko=void 0),Ya=0}function Jm(){if(Sc(),!ie||!Ee())return;Ya=lx;let t=()=>{if(Ko=void 0,!(!ie||!Ee())){if(Ja()){Jo()==="refresh"&&!Nr?(Nr=!0,we(!0)):we(!1),Ec();return}Ya-=1,Ya>0&&(Ko=setTimeout(t,sx))}};t()}function Tc(){if(Nn===!0){Ja()?we(!1):Jm();return}Nn=!0,Nr=!1,Jo()==="refresh"?(Nr=!0,we(!0)):we(!1),Ec(),Ja()||Jm()}function Lc(){Nn=!1,Nr=!1,wc(),Sc(),L(Ar)}function Qa(){Hr===void 0&&(Hr=window.setTimeout(()=>{Hr=void 0,ie&&(Ee()?Tc():Nn!==!1&&Lc())},ix))}function bx(){Ir||(Ir=history.pushState.bind(history),Wo=history.replaceState.bind(history),Vo=function(...e){let n=Ir(...e);return Qa(),n},Yo=function(...e){let n=Wo(...e);return Qa(),n},history.pushState=Vo,history.replaceState=Yo)}function yx(){Vo&&history.pushState===Vo&&Ir&&(history.pushState=Ir),Yo&&history.replaceState===Yo&&Wo&&(history.replaceState=Wo),Ir=null,Wo=null,Vo=null,Yo=null}function vx(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Qa)}function xx(t){if(!ie||!Ee()||Jo()!=="manual"||In().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Go);if(!n||tp(n))return;let r=window.getSelection?.();r&&String(r).trim()||we(!0)}function wx(){Uo===void 0&&(Uo=setInterval(()=>{if(!ie)return;let t=Ee();if(t!==(Nn===!0)){t?Tc():Lc();return}t&&Ja()&&we(!1)},ax))}function Ex(){Uo!==void 0&&(clearInterval(Uo),Uo=void 0)}function Qm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var Sx="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Tx="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Lx(t,e){let n=Xo(t);return n?n.length>jo?`Keep it to ${jo} characters.`:In().length+(e?1:0)>xc?`At most ${xc} greetings.`:null:"Enter a greeting."}function kx(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=In(),s=Number(rt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=jo,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let g=l.querySelector(".bloom-gc-count");g&&(g.textContent=`${Xo(e).length}/${jo}`);let v=l.querySelector(".bloom-gc-error");v&&(v.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Xo(e).length}/${jo}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let p=document.createElement("div");if(p.className="bloom-gc-actions",n>=0){let g=document.createElement("button");g.type="button",g.className="bloom-gc-btn",g.textContent="Cancel",g.addEventListener("click",()=>{n=-1,e="",r="",i()}),p.appendChild(g)}let m=document.createElement("button");if(m.type="button",m.className="bloom-gc-btn bloom-gc-btn-primary",m.textContent=n>=0?"Update":"Add",m.addEventListener("click",()=>{let g=n<0,v=Lx(e,g);if(v){r=v,i();return}let b=Xo(e),x=In().slice();n>=0&&n<x.length?x[n]=b:x.push(b),Zm(x),n=-1,e="",r="",i()}),p.appendChild(m),u.append(d,f,p),l.appendChild(u),t.appendChild(l),!a.length){let g=document.createElement("p");g.className="bloom-gc-empty",g.textContent="No greetings. The official heading stays.",t.appendChild(g);return}let h=document.createElement("div");h.className="bloom-gc-list",a.forEach((g,v)=>{let b=document.createElement("div");b.className="bloom-gc-item",v===s&&(b.dataset.active="true");let x=document.createElement("button");x.type="button",x.className=`bloom-gc-body${o===v?"":" bloom-gc-clamp"}`,x.textContent=g,x.addEventListener("click",()=>{o=o===v?-1:v,i()});let ot=document.createElement("div");ot.className="bloom-gc-item-actions";let W=Qm("Edit",Sx);W.addEventListener("click",()=>{n=v,e=g,r="",i()});let J=Qm("Delete",Tx);J.addEventListener("click",()=>{let O=In().filter((ut,vt)=>vt!==v);Zm(O),n===v?(n=-1,e=""):n>v&&(n-=1),i()}),ot.append(W,J),b.append(x,ot),h.appendChild(b)}),t.appendChild(h)};return Xa=i,i(),()=>{Xa===i&&(Xa=null),t.replaceChildren()}}var np=E({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Xm,settings:rt,start(){ie=!0,k(Xm,Ym),bx(),Wa=new AbortController;let{signal:t}=Wa;window.addEventListener("popstate",Qa,{signal:t}),document.addEventListener("click",vx,{capture:!0,signal:t}),document.addEventListener("click",xx,{signal:t}),wx(),Nn=null,Ee()?Tc():Lc(),ox.debug("started")},stop(){ie=!1,Wa?.abort(),Wa=null,Hr!==void 0&&(clearTimeout(Hr),Hr=void 0),wc(),Sc(),Ex(),yx(),L(Ar),Nr=!1,Nn=null},onSettingsChange(){ie&&(Ee()?(we(!1),Ec()):L(Ar))}});function Cx(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function ts(t){try{return await createImageBitmap(t)}catch{return null}}async function Mx(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function es(t){if(t.startsWith("data:")){let e=Cx(t);if(e){let n=await ts(e);if(n)return n}return Mx(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?ts(await e.blob()):null}catch{return null}}var rs="data-bloom-csi-slot",Ax="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Hx=/\bsize-(?:[6-9]|10)\b/,Ix=/\b(?:h|w)-(?:[6-9]|10)\b/,Nx=/^(plus|pro|free|team|go|business|enterprise)$/i,Rx=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function ns(t){return t.getAttribute("class")||""}function op(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Hx.test(t)?!0:Ix.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Px(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!ip(e)}function ip(t){return Nx.test(String(t??"").replace(/\s+/g,""))}function ae(t){return!!t?.closest(Ax)}function os(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Qo(t){let e=ns(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:ip(t.textContent||"")}function is(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function ti(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Ox(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function ap(t){if(ae(t)||is(t)||ti(t)||Qo(t)||os(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function sp(t){return ae(t)||is(t)||ti(t)||Qo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Px(t.textContent||"")}function lp(t){return ae(t)||ti(t)||os(t)||Qo(t)?!1:op(ns(t))||sp(t)?!0:ap(t)}function rp(t){return!(ae(t)||os(t)||ti(t)||Qo(t)||is(t))}function Rn(t,e){let n=is(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(ti(n)||os(n)||Qo(n));)ae(n)||(r=n),n=n.parentElement;return r}function Bx(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||ae(e))continue;if(Ox(ns(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!rp(o))){if(lp(o)||op(ns(o)))return Rn(o,t)??o;r.push(o)}if(r.length===1)return Rn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&rp(r))return Rn(r,t)??r}}return null}function Dx(t){let e=t.querySelectorAll(Rx);for(let n of e)if(lp(n))return Rn(n,t)??n;return null}function _x(t){for(let e of t.querySelectorAll("span, div, p, i"))if(sp(e))return Rn(e,t)??e;return null}function qx(t){for(let e of t.querySelectorAll("*"))if(ap(e))return Rn(e,t)??e;return null}function cp(t,e){if(ae(t))return null;if(e&&!ae(e)&&t.contains(e)){let n=Rn(e,t);if(n)return n}return Bx(t)??Dx(t)??_x(t)??qx(t)}function up(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Rr="data-bloom-csi",as="data-bloom-csi-orig",Pn=new Set,dp=null;function Cc(t){dp=t}function fp(t){return`url(${JSON.stringify(t)})`}function ss(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Mc(t,e,n){let r=fp(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function mp(t,e=rs){let n=fp(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function $x(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Pr(t){t.removeEventListener("error",kc);let e=t.getAttribute(as);t.removeAttribute(Rr),t.removeAttribute(as),e&&t.getAttribute("src")!==e&&(t.src=e)}function kc(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Pn.add(n),Pr(e),dp?.()}function pp(t,e){if(!e||Pn.has(e)){Pr(t);return}$x(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Rr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(as)&&t.setAttribute(as,n);t.setAttribute(Rr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",kc),t.addEventListener("error",kc),n!==e&&(t.src=e)}var gp=`/*
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
`;var hp=new C("CustomSidebarIdentity"),bp="customSidebarIdentityUi",xp="customSidebarIdentity",zx="bloom-csi-face",jx="bloom-csi-name",Or=rs,Gx=1024,ls=256,wp=24,Ep=64,Sp=40,Nc=1,Rc=4,ei=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Ac=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=M({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:lw},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:wp,max:Ep,default:Sp},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Bn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Ux(){return String(T.store.displayName??"").trim()}function ds(t,e,n,r,o){let i=at(n,Nc,Rc),a=Math.min(t,e)/i,s=at(r,a/2,Math.max(a/2,t-a/2)),l=at(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Kx(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Pc(t){let e=Math.min(1,Gx/Math.max(t.width,t.height));return Kx(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Wx(t,e,n,r){let{side:o,x:i,y:a}=ds(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=ls,s.height=ls;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,ls,ls);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Vx(t){let e=await ts(t);if(!e)return null;let n=Pc(e);return e.close(),n}async function Bc(t,e,n,r){let o=await es(t);if(!o)return null;let i=Wx(o,e,n,r);return o.close(),i}function Dc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function yp(){T.store.avatarUrl="",T.store.avatarSource="",Dc()}var vp=0;async function Oc(t){let e=++vp;Dc(),T.store.avatarSource=t;let n=await Bc(t,.5,.5,1);return e!==vp?!1:(n&&(T.store.avatarUrl=n),!!n)}function ni(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Hc(t){let e=ni(t);if(!e)return!1;let n=await Vx(e);return n?Oc(n):!1}var Rt=!1,Br=!1,Dr=0,fs=0,cs=null,Ve=new Map,_r=null,Se=null,ms=null,se=null,ps=null;function gs(t){let e=String(t??"").trim();if(!e||Pn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function Tp(){return gs(T.store.avatarUrl)??gs(T.store.avatarSource)}var us=!1,Ic=new Set;function Lp(){let t=gs(T.store.avatarSource);if(!t?.startsWith("data:image/")||gs(T.store.avatarUrl)?.startsWith("data:image/")||us||Ic.has(t))return;us=!0;let e=Bn(T.store.cropX,.5),n=Bn(T.store.cropY,.5),r=Bn(T.store.cropZoom,1);Bc(t,e,n,r).then(o=>{if(us=!1,!o){Ic.add(t);return}Rt&&(T.store.avatarUrl=o,hs())}).catch(()=>{us=!1,Ic.add(t)})}function On(t,e){return t.map(n=>`${n} ${e}`)}function Yx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Xx(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Yx(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function kp(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||ae(n)||n.closest(".min-w-0")||e.push(n);return e}function Zx(t){let e=kp(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function _c(){let t=[],e=tn();e&&t.push(e);let n=Vn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(ei.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function Cp(t,e){let n=Zx(t);if(n)pp(n,e);else for(let o of kp(t))Pr(o);let r=cp(t,n);for(let o of t.querySelectorAll(`[${Or}]`))o!==r&&o.removeAttribute(Or);r&&r.setAttribute(Or,"")}function Jx(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Qx(t,e){let n=Jx(t);n&&Cp(n,e)}function tw(){for(let t of document.querySelectorAll(`img[${Rr}]`))Pr(t);for(let t of document.querySelectorAll(`[${Or}]`))t.removeAttribute(Or)}function ew(){let t=at(Math.round(Bn(T.store.avatarSize,Sp)),wp,Ep),e=Tp(),n=Ux(),r=T.store.applyToMenu!==!1,o=[],i=[...On(ei,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...On(Ac,"> :first-child img"));let a=[...On(ei,".min-w-0 > .truncate"),...On(ei,".min-w-0.flex-1 .truncate")];r&&a.push(...On(Ac,"> :first-child .truncate"));let s=up(Or);o.push(ss([...s.flatMap(l=>On(ei,l))].join(","),t)),o.push(ss(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(ss(s.flatMap(l=>On(Ac,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Mc(i.join(","),e,t)),o.push(Mc("#stage-sidebar-tiny-bar img",e,32)),o.push(mp(e))),n&&o.push(Xx(a,n)),k(xp,o.join(""))}function nw(){let t=Tp(),e=_c();for(let n of e)Cp(n,t);if(T.store.applyToMenu!==!1){let n=Yn();n&&Qx(n,t)}for(let n of document.querySelectorAll(`img[${Rr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Pr(n)}function hs(){if(!(!Rt||Br)){Br=!0;for(let t of Ve.values())t.disconnect();Se?.disconnect(),se?.disconnect();try{ew(),nw()}finally{Br=!1,qc(),aw(),_r?.isConnected&&Mp(_r),Lp()}}}function ri(){!Rt||Dr||(Dr=requestAnimationFrame(()=>{Dr=0,hs()}))}function rw(){Br||!Rt||ri()}function ow(t){if(Ve.has(t))return;let e=new MutationObserver(rw);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ve.set(t,e)}function iw(t){Ve.get(t)?.disconnect(),Ve.delete(t)}function qc(){let t=new Set;for(let n of _c())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Vn();e&&t.add(e);for(let n of[...Ve.keys()])(!t.has(n)||!n.isConnected)&&iw(n);for(let n of t)n.isConnected&&ow(n)}function aw(){let t=Ni();if(!t){se?.disconnect(),se=null,ms=null;return}if(ms===t&&se){se.observe(t,{childList:!0});return}se?.disconnect(),ms=t,se=new MutationObserver(()=>{Br||!Rt||(qc(),ri())}),se.observe(t,{childList:!0})}function Mp(t){_r===t&&Se||(Se?.disconnect(),_r=t,Se=new MutationObserver(()=>{if(!t.isConnected){Se?.disconnect(),Se=null,_r=null;return}Br||!Rt||ri()}),Se.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Ap(t){if(!Rt||T.store.applyToMenu===!1)return;let e=Yn();if(e){Mp(e),ri();return}t<=0||requestAnimationFrame(()=>Ap(t-1))}function Hp(t){Rt&&(hs(),!(_c().length||t<=0)&&(fs=requestAnimationFrame(()=>Hp(t-1))))}function sw(t){Rt&&T.store.applyToMenu!==!1&&(!Ri(t)&&!Yn()||Ap(10))}function lw(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let p=document.createElement("div");p.className="bloom-csi-stage";let m=document.createElement("img");m.className="bloom-csi-stage-img",m.alt="",m.draggable=!1,p.appendChild(m);let h=document.createElement("div");h.className="bloom-csi-zoom-row";let g=document.createElement("input");g.type="range",g.className="bloom-csi-zoom",g.min=String(Nc),g.max=String(Rc),g.step="0.05",g.setAttribute("aria-label","Zoom");let v=document.createElement("span");v.className="bloom-csi-zoom-val";let b=document.createElement("button");b.type="button",b.className="bloom-csi-btn",b.textContent="Reset",h.append(g,v,b);let x=document.createElement("p");x.className="bloom-csi-hint",x.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(p,h,x),t.append(u,d,f);function ot(){let w=String(T.store.avatarSource??""),N=String(T.store.avatarUrl??"");return w.startsWith("data:image/")?w:N.startsWith("data:image/")?N:""}function W(w,N,y){if(!a)return i.x=w,i.y=N,i.zoom=at(y,Nc,Rc),i;let H=ds(a.w,a.h,y,w*a.w,N*a.h);return i.x=H.x/a.w,i.y=H.y/a.h,i.zoom=H.z,i}function J(){g.value=String(i.zoom),v.textContent=`${Math.round(i.zoom*100)}%`;let w=a?ds(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;w&&a&&(m.style.width=`${a.w/w.side*100}%`,m.style.height=`${a.h/w.side*100}%`,m.style.left=`${(.5-w.x/w.side)*100}%`,m.style.top=`${(.5-w.y/w.side)*100}%`)}function O(w=!1){let N=ot(),y=String(T.store.avatarUrl??"").trim(),H=!!N;s.hidden=!y&&!N,(N||y)&&(s.src=N||y),document.activeElement!==l&&(l.value=H?"":y),l.placeholder=H?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!N,d.hidden=!(e&&/^https?:\/\//.test(y)&&!N),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",N&&(w&&(i.x=Bn(T.store.cropX,.5),i.y=Bn(T.store.cropY,.5),i.zoom=Bn(T.store.cropZoom,1)),m.getAttribute("src")!==N&&(a=null,m.onload=()=>{a={w:m.naturalWidth,h:m.naturalHeight},W(i.x,i.y,i.zoom),J()},m.src=N),J())}function ut(w,N,y,H=!1){W(w,N,y),J();let pt=ot(),xt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,pt&&Bc(pt,i.x,i.y,i.zoom).then(I=>{I&&(T.store.avatarUrl=I)})};r&&clearTimeout(r),H?xt():r=setTimeout(xt,80)}function vt(w){T.store.avatarUrl=w;let N=w.trim();if(n&&clearTimeout(n),!N){T.store.avatarSource="",Dc(),e=!1,O(!0);return}if(N.startsWith("data:image/")){e=!1,n=setTimeout(()=>{es(N).then(y=>{if(!y)return;let H=Pc(y);y.close(),H&&Oc(H).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(N)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{es(N).then(y=>{if(!y){e=!0,O(!0);return}let H=Pc(y);y.close(),H?(e=!1,Oc(H).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",w=>{ni(w.clipboardData)&&(w.preventDefault(),e=!1,Hc(w.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",w=>{ni(w.dataTransfer)&&w.preventDefault()}),u.addEventListener("drop",w=>{ni(w.dataTransfer)&&(w.preventDefault(),e=!1,Hc(w.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>vt(l.value)),l.addEventListener("paste",w=>{ni(w.clipboardData)&&(w.preventDefault(),e=!1,Hc(w.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",w=>{ot()&&!l.value&&(w.key==="Backspace"||w.key==="Delete")&&(yp(),e=!1,O(!0))}),c.addEventListener("click",()=>{yp(),e=!1,O(!0)}),p.addEventListener("pointerdown",w=>{w.button===0&&(p.setPointerCapture(w.pointerId),o.on=!0,o.px=w.clientX,o.py=w.clientY,o.x=i.x,o.y=i.y)}),p.addEventListener("pointermove",w=>{if(!o.on||!a)return;let N=p.clientWidth;if(!N)return;let{side:y}=ds(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);W(o.x-(w.clientX-o.px)*(y/N)/a.w,o.y-(w.clientY-o.py)*(y/N)/a.h,i.zoom),J()}),p.addEventListener("pointerup",()=>{o.on&&(o.on=!1,ut(i.x,i.y,i.zoom,!0))}),p.addEventListener("pointercancel",()=>{o.on=!1}),p.addEventListener("wheel",w=>{w.preventDefault(),ut(i.x,i.y,i.zoom*(w.deltaY<0?1.08:1/1.08))},{passive:!1}),g.addEventListener("input",()=>ut(i.x,i.y,Number(g.value))),g.addEventListener("change",()=>ut(i.x,i.y,Number(g.value),!0)),b.addEventListener("click",()=>ut(.5,.5,1,!0));let oi=()=>O(!1);return ps=oi,O(!0),()=>{ps===oi&&(ps=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Ip=E({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:bp,cleanupSelectors:[`.${zx}`,`.${jx}`],settings:T,start(){Rt=!0,Pn.clear(),Cc(ri),k(bp,gp),cs=new AbortController,document.addEventListener("click",sw,{signal:cs.signal}),Hp(40),Lp(),hp.debug("started")},onSettingsChange(){Pn.clear(),ps?.(),Rt&&(qc(),hs())},stop(){Rt=!1,cs?.abort(),cs=null,Dr&&cancelAnimationFrame(Dr),Dr=0,fs&&cancelAnimationFrame(fs),fs=0;for(let t of Ve.values())t.disconnect();Ve.clear(),Se?.disconnect(),Se=null,_r=null,se?.disconnect(),se=null,ms=null,tw(),L(xp),Cc(null),Pn.clear(),hp.debug("stopped")}});var qr=new C("Bloom"),Np=!1,cw=Date.now(),uw=[id,zd,Zd,tf,af,df,Tf,kf,Af,Yf,nm,cm,dm,Om,Km,Vm,np,Ip];function bs(t){return new Promise(e=>setTimeout(e,t))}function dw(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function fw(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Pp=8e3,Rp=300,mw=250;async function pw(){if(Qe())return await bs(Rp),!0;for(;Date.now()-cw<Pp;)if(await bs(mw),Qe())return await bs(Rp),!0;return Qe()||_s()}function $c(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function gw(){if($c())return!0;let t=Date.now()+Pp;for(;Date.now()<t;)if(await bs(100),$c())return!0;return $c()}function hw(){try{GM_registerMenuCommand?.("Bloom++ settings",od)}catch{}}function bw(){Li(()=>{Fr("HostShell"),qr.info("host shell",Et)}),ki(()=>{qr.info("idle ready",Et)}),Ci(()=>{xs(),Fr("HostReady"),qr.info("chrome ready",Et)})}async function Fc(){await nu()}async function zc(){if(Np)return;Np=!0,Hu();for(let n of uw)try{cu(n),_u(n)}catch(r){qr.error("register failed",n.name,r)}Fr("Init"),hw(),bw();let t=()=>Fr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await dw(),xs(),qr.info("styles ready",Et),await fw(),gw().then(n=>{n&&Mi()}),!await pw()){qr.warn("late islands not detected; starting default plugins",Et),Un(),Ai();return}await Bu()}var Op=typeof unsafeWindow<"u"?unsafeWindow:window,yw=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||yw){let t=Op.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Et);try{Object.defineProperty(Op,"Bloom",{value:jc,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Fc().then(()=>zc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
