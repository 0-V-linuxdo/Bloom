// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260928] v1.4.111
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

/* Bloom++ [20260928] v1.4.111. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Bp=Object.defineProperty;var Dp=(t,e)=>{for(var n in e)Bp(t,n,{get:e[n],enumerable:!0})};var jc={};Dp(jc,{REPO_URL:()=>Iu,Settings:()=>j,VERSION:()=>wt,contextKeyFromUrl:()=>ue,conversationChain:()=>qr,conversationTitle:()=>zn,conversationToken:()=>Ot,currentConversationId:()=>R,ensureConversationChain:()=>Tu,hasDraftText:()=>Xt,hasErrorToast:()=>Qt,hasLateIslands:()=>nn,init:()=>Fc,initSettings:()=>$c,isDocumentInteractive:()=>$u,isStreaming:()=>W,isUserDraftEmpty:()=>Pe,messageCreateTime:()=>hi,plugins:()=>ce,requestChromeReady:()=>Si,requestIdleReady:()=>Gn,requestShellReady:()=>wi,setEditorText:()=>pe,subscribeHarvest:()=>Et,watchStreamingEdge:()=>ut,whenChromeReady:()=>Ei,whenIdleReady:()=>xi,whenShellReady:()=>vi});var Le=new Map,ni=!1;function _p(){return document.getElementById("bloom-root")?.shadowRoot??null}function Gc(){return document.head??null}function qn(){let t=_p();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=qp()}function bs(t,e){if(!ni)return;let n=Gc();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),qn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,qn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,qn()}function k(t,e){let n=Le.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Le.set(t,n)),ni&&bs(t,n)}function hs(){if(!Gc())return!1;ni=!0;for(let[e,n]of Le)bs(e,n);return qn(),!0}function Uc(t){let e=Le.get(t);e&&(e.disabled=!1,ni&&bs(t,e))}function Kc(t){let e=Le.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),qn())}function L(t){let e=Le.get(t);e&&(e.el?.remove(),Le.delete(t),qn())}function qp(){return Array.from(Le.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var C=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function w(t){return t}var ys=new Map;function $n(t,e){let n=ys.get(t);return n||(n=new Set,ys.set(t,n)),n.add(e),()=>n.delete(e)}function Qe(t,e){let n=ys.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var $p="bloompp";function Wc(){return new Promise((t,e)=>{let n=indexedDB.open($p,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Vc(t){try{let e=await Wc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Yc(t,e){try{let n=await Wc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function rt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function ot(t,e,n){return Math.min(n,Math.max(e,t))}function Xc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Zc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Jc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var ri=new C("SettingsStore"),ke="BloomSettings",Fp=100;function oi(t){return t!=null&&typeof t.then=="function"}function jp(t){if(t==null||oi(t))return null;if(rt(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(rt(e)&&!oi(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return rt(n)&&!oi(n)?n:null}return null}catch{return null}}function ai(t){let e=jp(t);if(!e)return null;let n=e.plugins;return!rt(n)||oi(n)||Object.keys(n).length===0?null:e}function xs(t){return rt(t)?t:null}function vs(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:rt(t)?Object.keys(t).length===0:!1}function zp(t){return vs(t)?0:Array.isArray(t)?12+Math.min(t.length,40):rt(t)?12+Math.min(Object.keys(t).length,40):3}function tn(t){if(!t)return-1;let e=t.plugins;if(!rt(e))return-1;let n=0;for(let r of Object.values(e)){let o=xs(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=zp(a))}return n}function Qc(t){let e=t.plugins;if(!rt(e))return 0;let n=0;for(let r of Object.values(e))xs(r)?.enabled===!0&&n++;return n}function tu(t){let e=t.map((i,a)=>({bag:i,index:a,score:tn(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=Qc(a.bag)-Qc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!rt(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(rt(a))for(let[s,l]of Object.entries(a)){let c=xs(l);if(!c)continue;if(!rt(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}vs(u[d])&&!vs(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return rt(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:tn(n)}}var ii=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return rt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){ri.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Fp))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ke,this.plain)}catch{try{GM_setValue(ke,e)}catch(n){ri.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(ke,e)}catch{}Yc(ke,e).catch(n=>ri.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){ri.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Xc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Gp=new C("Settings"),Up={plugins:{}},j=new ii(structuredClone(Up)),Kp=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Wp(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function M(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?Ce(n):{}},get plain(){let n=e.pluginName;return n?j.plain.plugins[n]??{}:{}}};return e}async function Vp(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function eu(){let t=ai(await Vp(ke)),e=ai(await Vc(ke)),n=null;try{n=ai(localStorage.getItem(ke))}catch{n=null}let r=tu([t,e,n]);if(r){let o=r.bag.plugins;o&&(j.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);Gp.info("Loaded settings from",i,"richness",r.score,"gm",tn(t),"idb",tn(e),"ls",tn(n))}j.releasePersist(),r&&(r.index!==0||r.score>tn(t))&&j.persistLoadedBag()}function Ce(t){return j.plain.plugins[t]||(j.plain.plugins[t]={}),j.store.plugins[t]}function nu(t,e){e&&(e.pluginName=t,Ce(t),j.setDefaultGetter(Kp(t),n=>{if(n!=="enabled")return Wp(e.def,n)}))}function ru(){return Ce("Settings")}function si(){return ru().pinnedPlugins??[]}function ou(t){return si().includes(t)}function iu(t){let e=si(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function li(){return ru().starredPlugins??[]}function au(t){return li().includes(t)}function su(t){let e=li(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var ci=new C("PluginManager"),ce={},Pr=new Set;function lu(t){if(ce[t.name]){ci.warn("Duplicate plugin",t.name);return}ce[t.name]=t,nu(t.name,t.settings)}function Fn(t){let e=ce[t];if(!e)return!1;if(e.required)return!0;let n=j.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function cu(t){let e=ce[t];if(!e||e.required)return;let n=!Fn(t);Ce(t),j.store.plugins[t].enabled=n,n?uu(e):Yp(e),Qe("pluginToggle",{name:t,enabled:n})}function uu(t,e=!1){if(!Pr.has(t.name)&&Fn(t.name))try{t.managedStyle&&Uc(t.managedStyle),t.start?.(),Pr.add(t.name),t.settings&&j.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Pr.has(t.name)&&t.onSettingsChange?.()}),e||ci.debug("Started",t.name)}catch(n){ci.error("Failed to start",t.name,n)}}function Yp(t){if(Pr.has(t.name)){try{t.stop?.()}catch(e){ci.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Kc(t.managedStyle),L(t.managedStyle)),Pr.delete(t.name)}}function Or(t){for(let e of Object.values(ce))(e.startAt??"DOMContentLoaded")===t&&uu(e)}var du=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Ot(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function ue(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function de(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(du)?.[1]??""}catch{return t.match(du)?.[1]??""}}function R(){return de(location.pathname)}var ws=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i,Xp=/[?&](?:num_turns|limit|before|after|before_node|after_node|cursor)=/i;function ui(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function Ss(t,e){return e!=="GET"||ui(t)?!1:ws.test(t)}function Ts(t){return ws.test(t)&&Xp.test(t)}function di(t){return t.match(ws)?.[1]??""}function Ls(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ls(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Br(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function mu(t){let e=Br(t);return e?!e.mapping&&Br(e.conversation)?e.conversation:e:null}function fu(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function Zp(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=fu(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?fu(n.text):""}function Jp(t){if(Br(t.metadata)?.is_visually_hidden_from_conversation===!0)return"";let r=Br(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function Qp(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?Ls(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function tg(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null,c=l?Jp(l):"",u=l&&typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:l?Zp(l):""};u!==o&&(d.alias=o);let f=l?Ls(l.create_time??l.createTime):null;f&&(d.at=f),n.push(d)}o=typeof s.parent=="string"?s.parent:null}return n.reverse(),n}function Es(t){return t.length<=480?t:t.slice(t.length-480)}function ks(t,e){if(!e.length)return t;if(!t.length)return Es(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(b=>b.id)),m=n.has(e[e.length-1].id),p=e.filter(b=>!f.has(b.id));return Es(m?[...p,...t]:[...t,...p])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return Es([...s,...l,...u,...d])}function eg(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=Qp(t,n);return r?tg(n,r):[]}function Cs(t){let e=mu(t);if(!e)return[];let n=e.mapping;return!n||typeof n!="object"||Array.isArray(n)?[]:!(typeof e.current_node=="string"||typeof e.current_node_id=="string"||typeof e.currentNode=="string")&&typeof e.title!="string"?[]:eg(e)}function pu(t,e=""){let n=Br(t);if(!n)return e;let r=mu(t)??n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function gu(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var vu=new C("Harvest"),ng=1500,rg=200,og=8,fi=new Set,mi=new Map,pi=new Map,gi=new Map,bu=[],jn=null,bi=null,Dr=null,Bt=0,xu=!1;function ig(){return typeof unsafeWindow<"u"?unsafeWindow:window}function ag(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function sg(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var lg=/"action"\s*:\s*"(next|continue|variant)"/i;function cg(t,e,n){return!(e!=="POST"||ui(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!lg.test(n))}function Eu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function ug(t){return typeof t=="string"?Eu(t):""}function Ms(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ms(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function As(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function hu(t,e,n){!t||!e||pi.get(t)!==e&&(pi.set(t,e),As(pi,ng),fe({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function dg(t,e){let n=e.trim();!t||!n||mi.get(t)!==n&&(mi.set(t,n),As(mi,rg),fe({type:"conversation-meta",conversationId:t,title:n}))}function fg(t,e,n=""){if(n&&Ts(n))return;let r=pu(e,t);if(!r)return;let o=Cs(e);if(!o.length)return;let i=gi.get(r)??[],a=ks(i,o);gu(i,a)||(gi.set(r,a),As(gi,og),fe({type:"conversation-chain",conversationId:r}))}function _r(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)_r(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&dg(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ms(l.create_time??l.createTime??l.created_at);c&&u&&hu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ms(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&hu(a,s,o),r.mapping&&typeof r.mapping=="object")_r(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&_r(l,o,n+1)}function yu(t,e){if(t)try{_r(JSON.parse(t),e)}catch{}}function fe(t){for(let e of Array.from(fi))try{e(t)}catch{}}async function mg(t,e,n,r){if(n===Bt)try{let o=await t.json();if(n!==Bt)return;_r(o,e),fg(e,o,r)}catch{}}async function pg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Bt&&fe({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Bt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=Eu(c);m&&(o=m,fe({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let p=m.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||yu(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Bt&&yu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Bt&&fe({type:"post-end",conversationId:o,error:i})}function gg(t,e,n){let r=ag(e),o=sg(e,n),i=Ss(r,o),a=cg(r,o,n?.body),s=Bt,l="";return a&&(l=ug(n?.body)||di(r)||de(r)||R(),fe({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Bt||!i&&!a)return c;try{let u=c.clone();i?mg(u,di(r)||R(),s,r):pg(u,l,!c.ok,s)}catch{a&&fe({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Bt&&fe({type:"post-end",conversationId:l,error:!0}),c})}function wu(){if(jn)return;let t=ig();Dr=t,jn=t.fetch.bind(t);let e=(n,r)=>gg(jn,n,r);bi=e,t.fetch=e,vu.debug("conversation fetch harvest hooked")}function bg(){Bt+=1,!(!jn||!Dr)&&(bi&&Dr.fetch===bi&&(Dr.fetch=jn),jn=null,bi=null,Dr=null,vu.debug("conversation fetch harvest unhooked"))}function hg(){Bt+=1,!xu&&bg()}function Su(){xu=!0,wu()}function Tu(t){}function Et(t){return fi.add(t),wu(),()=>{fi.delete(t),fi.size===0&&hg()}}function zn(t){return t?mi.get(t)??"":""}function hi(t){return t?pi.get(t)??null:null}function qr(t){return t?gi.get(t)??bu:bu}var $r=!1,yi=!1,Hs=!1,ku=[],Cu=[],Mu=[];function Is(t){let e=t.splice(0);for(let n of e)n()}function Fr(){$r||($r=!0,Is(ku))}function Rs(){yi||(yi=!0,$r||Fr(),Is(Cu))}function Au(){Hs||(Hs=!0,$r||Fr(),yi||Rs(),Is(Mu))}function vi(t){$r?t():ku.push(t)}function xi(t){yi?t():Cu.push(t)}function Ei(t){Hs?t():Mu.push(t)}function wi(){Fr()}function Gn(){Fr(),Rs()}function Si(){Au()}function Lu(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Hu(){await Lu(4e3),Fr(),await Lu(4e3),Rs(),Au()}var S={p:"0-V-linuxdo"},wt="[20260928] v1.4.111",Iu="https://github.com/0-V-linuxdo/Bloom";var yg={BetterNavigator:1790577403e3,ChatListStatus:1790577403e3,ChatStateFavicons:1790233382e3,Cleaner:1790577403e3,ComposerOpacity:1790577403e3,CustomSidebarIdentity:1790577403e3,GreetingCustomizer:1790577403e3,InputHistory:1789858186e3,MessageTimestamps:1790577403e3,NoDictation:1790577403e3,NoShareLink:1790577403e3,NoSidebarIdentity:1790577403e3,PromptQueue:1790577403e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790577403e3,StreamerMode:1790577403e3,WiderChat:1790577403e3};function Ru(t){let e=yg[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}var Ns=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),vg=["#stage-slideover-sidebar","#stage-popover-sidebar","[data-app-action-sidebar-scroll]",'[data-testid="desktop-app-shell"]'].join(","),Ti=["#stage-sidebar-tiny-bar","[data-app-navigation-rail]"].join(","),Nu='a[href^="/c/"], a[href*="/c/"]',Pu=['form[data-type="unified-composer"]',"form.w-full[data-type]","form:has(#prompt-textarea)",'form:has([data-testid="prompt-textarea"])','form:has(textarea[name="prompt"])',"form:has(#mobile-composer-prompt)",'form:has([data-testid="mobile-composer-prompt"])'].join(", "),jr=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]","#mobile-composer-prompt",'[data-testid="mobile-composer-prompt"]','textarea[name="prompt"]','form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]','[contenteditable="true"][role="textbox"]'].join(", "),zE=["#thread",'[data-testid="conversation-panel"]',"[data-chatgpt-conversation-selection-target]","main"].join(", "),Ou=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]',"[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids]","[data-chatgpt-search-message-ids]"].join(", "),Bu=["[data-message-id]","[data-chatgpt-search-message-ids]"].join(", "),Du=['#thread section[data-testid^="conversation-turn-"][data-turn="assistant"]','#thread article[data-testid^="conversation-turn-"][data-turn="assistant"]','[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids] [data-message-author-role="assistant"]','[data-chatgpt-search-message-ids] [data-message-author-role="assistant"]','[data-chatgpt-search-message-ids][data-message-author-role="assistant"]','[data-message-author-role="assistant"]'].join(", "),xg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item, #bloom-bn-host, #bloom-pq-chip, #bloom-rt-host";function en(t){return!!t.closest(xg)}function it(t,e=document){try{let n=e.querySelector(t);return n instanceof HTMLElement?n:null}catch{return null}}function Li(){try{return!!(document.getElementById("stage-slideover-sidebar")||document.getElementById("stage-popover-sidebar")||it(Ti)||it(vg)||it(Ns)||it("[data-sidebar-destination]"))}catch{return!1}}function _u(){try{return!!it(jr)}catch{return!1}}function qu(){let t=document.getElementById("stage-slideover-sidebar");if(t instanceof HTMLElement&&t.isConnected&&!en(t))return t;let e=document.getElementById("stage-popover-sidebar");if(e instanceof HTMLElement&&e.isConnected&&!en(e))return e;let n=it("[data-app-action-sidebar-scroll]");if(n&&!en(n)){let a=n.closest("nav")??n.parentElement??n;return a instanceof HTMLElement&&!en(a)?a:n}let r=it("[data-app-navigation-rail]");if(r&&!en(r))return r;let o=it("nav");if(o&&!en(o))return o;let i=it('[data-testid="desktop-app-shell"]');return i&&!en(i)?i:null}function ki(){let t=document.getElementById("thread");if(t instanceof HTMLElement&&t.isConnected)return t;let e=it('[data-testid="conversation-panel"]');if(e)return e;let n=it("[data-chatgpt-conversation-selection-target]");return n||it("main")}function Ps(t){let e=[],n=o=>{o&&!e.includes(o)&&e.push(o)};n(t.getAttribute("data-message-id")),n(t.getAttribute("data-turn-id"));let r=t.getAttribute("data-chatgpt-search-message-ids")||"";for(let o of r.split(/\s+/))n(o);try{n(t.querySelector("[data-message-id]")?.getAttribute("data-message-id")),n(t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id"))}catch{}return e}function Ci(t){let e=Ps(t);return e[e.length-1]||""}function Me(t){return t instanceof HTMLElement?t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail"):!1}function Eg(){try{return!!document.querySelector('a[href^="/c/"], a[href*="/c/"], a[href^="/g/"]')}catch{return!1}}function wg(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, [data-app-navigation-rail] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Os(){try{return _u()||!!document.querySelector(jr)}catch{return!1}}function nn(){return Os()?Eg()||wg()||Li():!1}function $u(){return nn()}var Ds=Ns,Fu=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Sg=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Tg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Dt(t){return t.id==="bloom-root"||!!t.closest(Tg)}function ju(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Mi(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Bs(t){if(!(t instanceof HTMLElement)||!t.isConnected||Dt(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Mi(e)?!1:t.getClientRects().length>0}function Kt(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-popover-sidebar"||t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail")||t.hasAttribute("data-app-action-sidebar-scroll")}function Lg(t){return t.tagName==="BUTTON"||t.tagName==="A"||t.getAttribute("role")==="button"}function Ai(t){if(Dt(t))return!1;let e=t.getAttribute("data-testid")||"";if(/profile|account/i.test(e))return!0;let n=`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`;if(/profile|account|账号|账户|头像/i.test(n)||t.querySelector("img, [data-bloom-csi-slot], [data-bloom-profile-chip], [class*='rounded-full']")||t.querySelector(".min-w-0, .truncate"))return!0;let r=(t.textContent||"").replace(/\s+/g,"");return!!(r.length>=1&&r.length<=3&&!/^(plus|pro|free|team|go)$/i.test(r)||/\b(plus|pro|free|team|go|business|enterprise)\b/i.test(r)&&r.length<64)}function rn(t){let e=t,n=t;for(;n&&!Dt(n);)Lg(n)&&Ai(n)&&(!Kt(n)||Me(n.parentElement))&&(e=n),n=n.parentElement;return e}function zu(t){let e=Uu(t).filter(Ai);return e.length?(e.sort((n,r)=>{let o=n.getBoundingClientRect(),i=r.getBoundingClientRect();return i.width*i.height-o.width*o.height}),rn(e[0])):null}function Gu(){let t=[];for(let e of document.querySelectorAll(Ds))!(e instanceof HTMLElement)||!e.isConnected||Dt(e)||t.push(e);return t}function zr(t){if(!t.isConnected||Dt(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Uu(t){let e=[];try{for(let n of t.querySelectorAll('button[aria-haspopup="menu"]'))!(n instanceof HTMLElement)||!n.isConnected||Dt(n)||e.push(n)}catch{}return e}function on(){let t=Ae();if(t){let o=zu(t);if(o){let i=o.getBoundingClientRect();if(i.width>16&&i.height>8&&i.left>=-20&&i.left<window.innerWidth/2&&i.bottom>0)return o}}let e=Gu().filter(o=>zr(o)&&Ai(o));if(e[0])return rn(e[0]);let n=Gu().filter(zr);if(n[0])return rn(n[0]);let r=it("[data-app-navigation-rail]");if(r){let i=Uu(r).filter(a=>{let s=a.getBoundingClientRect();return s.width>16&&s.height>16&&s.left>=0&&s.left<window.innerWidth/3&&s.bottom>0}).find(Ai)??zu(r);if(i)return rn(i)}return null}function Un(){for(let t of document.querySelectorAll(Ti)){if(!(t instanceof HTMLElement)||!t.isConnected||Dt(t))continue;let e=t.getBoundingClientRect();if(!(e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3))return t}return null}function Ae(){let t=it("[data-app-action-sidebar-scroll]");if(!t)return null;let e=[t.nextElementSibling,t.parentElement?.nextElementSibling];for(let n of e)if(!(!(n instanceof HTMLElement)||!n.isConnected||Dt(n))&&n.querySelector('button[aria-haspopup="menu"]')){if(Kt(n))try{if(n.getBoundingClientRect().height>240)continue}catch{continue}return n}return null}function _s(t){let e=rn(t),n=Ae();if(n&&n.contains(e)){let s=e.parentElement;return s&&s!==n&&s.children.length===1&&!Dt(s)&&!Kt(s)&&s.parentElement&&!Kt(s.parentElement)?s:e}let r=e.closest(Ti);if(r instanceof HTMLElement){let s=e;for(;s&&s.parentElement!==r;)s=s.parentElement;if(s&&s.parentElement===r)return s}let o=e,i=e.parentElement;i&&i.children.length===1&&!Dt(i)&&!Kt(i)&&i.parentElement&&!Kt(i.parentElement)&&(o=i);let a=o.parentElement;if(a&&!Kt(a)&&!Dt(a)&&a.children.length>1){let s=a.getAttribute("class")||"";if(/\bflex\b/.test(s)&&!/flex-col/.test(s)&&a.parentElement&&!Kt(a.parentElement))return a}return o}function Kn(){let t=document.querySelectorAll(Fu);for(let n of t)if(Bs(n)&&!Mi(n)&&ju(n))return n;let e=document.querySelectorAll(Sg);for(let n of e){if(!Bs(n)||!ju(n)||Mi(n))continue;let r=n.querySelector(Fu);return Bs(r)&&!Mi(r)?r:n}return null}function Hi(){let t=on();if(t){let n=_s(t),r=n.parentElement;if(r&&(!Kt(r)||Me(r)))return r;if(!Kt(n)||Me(n))return n}let e=Ae();return e||Un()}function Ii(t){let e=on();return e?t.composedPath().includes(e):!1}var $s=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],kg={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Cg(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Mg(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function qs(t){let e=Cg(t);return e?Mg(e)>.55?"light":"dark":null}function Ag(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=qs(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=qs(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=qs(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Ri(t){return t==="auto"?Ag():t}function Hg(t){try{let e=getComputedStyle(document.documentElement);for(let n of $s){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Ni(t,e,n){let r=kg[e];if(n){Hg(t);for(let o of $s)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of $s)t.style.setProperty(o,r[o])}function Ku(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Fs=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Rg="bloom-root",Vt="bloom-rail-item",qi="bloom-account-item",sn="bloom-sidebar-panel",Jr="bloom-plugin-dialog",Ki="bloom-plugin-layer",$i="bloom-settings-css",Ng=2e3,Vu=null,Pg=null,Ne=!1,Ks=[],Pi=null,Fi=null,Ie=null,Bi=null,me=null,Yr=null,Gr,Wn=0,Xr=0,Ur=0,Kr=null,Wr=null,ji=null,Yu=null,Vr=null,js=[],zi=!1,Og=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Bg=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Dg=new Set(["chat","ui","privacy"]),_g=10080*60*1e3,Wi="",Zr="all",Wt="all";function Vi(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Xu(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function qg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function $g(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Fg(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function jg(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var zg={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Gg(t){return t.icon||zg[t.name]||Vi()}function zs(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Ni(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Zu(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Gi(){let t="auto",e=Ri(t);zs(Vu,e,!0);let n=document.getElementById(sn);n instanceof HTMLElement&&zs(n,e,!0);let r=document.getElementById(Jr);r instanceof HTMLElement&&zs(r,e,!0);let o=document.getElementById(Vt);o instanceof HTMLElement&&Zu(o),Qe("schemeChange",{scheme:e,pref:t})}function Ju(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Qu(){if(k("settings",Fs),document.getElementById($i)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=$i,t.textContent=Fs,document.head.appendChild(t)}function Ug(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Kg(){for(let t of Ks)t();Ks=[]}function td(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Wg(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Ys(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Vg(t){return Ys(t).length>0}function Di(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Yg(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Wg(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Xg(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Yg(e,n));let i=Ce(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Ks.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Di(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Di(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=td(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Di(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Wu(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Zg(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=Ce(t.name);for(let[n,r]of Ys(t)){if(n==="enabled"||r.type===5)continue;let o=Di(r);o!==void 0&&(e[n]=o)}nd(t)}function ed(t){t.key==="Escape"&&(!document.getElementById(Ki)&&!document.getElementById(Jr)||(t.stopPropagation(),Vn()))}function Jg(){zi||(document.addEventListener("keydown",ed),zi=!0)}function Qg(){zi&&(document.removeEventListener("keydown",ed),zi=!1)}function Vn(){Kg(),Qg(),document.getElementById(Ki)?.remove(),document.getElementById(Jr)?.remove()}function nd(t){if(Vn(),!document.body)return;let e=document.createElement("div");e.id=Ki,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Re),e.addEventListener("pointerup",Re),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Vn()});let n=document.createElement("div");n.id=Jr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Re),n.addEventListener("pointerup",Re),n.addEventListener("click",Re);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Xu(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Vn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Wu("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Wu("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Ys(t);if(c.length)for(let[u,d]of c){let f=Xg(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Zg(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Jg(),Gi()}function tb(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Gg(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=au(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Fg(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let g=su(t.name);Qe("pluginStar",{name:t.name,starred:g})}),s.appendChild(c),!t.required){let b=ou(t.name),g=document.createElement("button");g.type="button",g.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,g.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),g.innerHTML=jg(b),g.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();let h=iu(t.name);Qe("pluginPin",{name:t.name,pinned:h})}),s.appendChild(g)}if(Vg(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=$g(),b.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),nd(t)}),s.appendChild(b)}let u=td(t.name,Fn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{cu(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(p),e.append(n,f,m),e}function rd(){return Object.values(ce).filter(t=>!t.hidden&&t.name!=="Settings")}function eb(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<_g}function od(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return eb(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Dg.has(r)):n.includes(e)}function nb(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function rb(){return Wi.trim()?"No plugins match your search.":Wt==="favorites"?"No favorites yet. Star a plugin to see it here.":Wt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function ob(){let t=rd();return Bg.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>od(n,e.id)))}function ib(){if(Vr){Vr.replaceChildren();for(let t of ob()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Wt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Wt=t.id,an()}),Vr.appendChild(e)}}}function ab(){let t=rd();if(Wt==="favorites"){let e=new Set(li());t=t.filter(n=>e.has(n.name))}else Wt!=="all"&&(t=t.filter(e=>od(e,Wt)));return Zr==="enabled"&&(t=t.filter(e=>Fn(e.name))),Zr==="disabled"&&(t=t.filter(e=>!Fn(e.name))),t}function an(){if(!Kr)return;ib();let t=ab();ji&&(ji.placeholder=`Search ${t.length} plugins...`);let e=t,n=Wi.trim().toLowerCase();if(n&&(e=e.filter(r=>nb(r).includes(n))),Wt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Wt!=="favorites"){let r=si();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Kr.replaceChildren();for(let r of e)Kr.appendChild(tb(r));Wr&&(Wr.hidden=e.length>0,Wr.textContent=rb())}function Re(t){t.stopPropagation()}function Gs(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Xs(){document.getElementById(Vt)?.setAttribute("aria-expanded",Ne?"true":"false")}function sb(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Zs(){Vn(),Wi="",Zr="all",Wt="all",document.getElementById(sn)?.remove(),Ne=!1,Xs()}function lb(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Re),e.addEventListener("pointerup",Re),e.addEventListener("click",Re);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Vi();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=qg();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Xu(),d.addEventListener("click",Zs),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Wi=p.value,an()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let h of Og){let x=document.createElement("option");x.value=h.value,x.textContent=h.label,b.appendChild(x)}b.value=Zr,b.addEventListener("change",()=>{Zr=b.value,an()}),m.append(p,b),n.appendChild(m);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let E=document.createElement("p");return E.className="bloom-tab-empty",E.hidden=!0,n.appendChild(E),e.append(d,n),Kr=g,Wr=E,ji=p,Yu=b,Vr=f,an(),e}function cb(t){t.classList.add("bloom-rail-dock")}function ub(){let t=document.getElementById(Vt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&zr(t)?t:null}function db(){if(document.getElementById(sn)?.remove(),!document.body)return;let t=lb(sn);cb(t),document.body.appendChild(t),Ne=!0,Vn(),Gi(),Xs(),Qe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:wt,dock:"center",rail:!!ub()})}function Js(){let t=document.getElementById(sn);if(t instanceof HTMLElement&&t.isConnected&&sb(t)){Zs();return}t?.remove(),db()}function _i(t){t.style.pointerEvents="auto",t.style.position="relative",t.style.zIndex="2"}function fb(t){let e=t.parentElement?.closest("button, a, [role='button']");return e instanceof HTMLElement&&e!==t?e:null}function mb(){let t=document.createElement("button");t.type="button",t.id=Vt,t.className="bloom-rail-item",t.setAttribute("aria-controls",sn),t.setAttribute("aria-expanded",Ne?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Vi()}</span><span>Bloom++</span>`,_i(t);let e=n=>{n.preventDefault(),n.stopPropagation(),typeof n.stopImmediatePropagation=="function"&&n.stopImmediatePropagation(),Js()};return t.addEventListener("pointerdown",n=>{n.stopPropagation(),typeof n.stopImmediatePropagation=="function"&&n.stopImmediatePropagation()}),t.addEventListener("click",e),t}function Us(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function pb(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function gb(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function He(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function id(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=pb(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&He(t,"padding-top",Math.round(i)),Number.isFinite(a)&&He(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));He(n,"width",l),He(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&He(t,"padding-left",u);let d=gb(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),p=Math.round(f.left-m.right);p>=0&&p<=24&&He(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&He(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&He(t,"gap",Math.round(l))}Zu(t)}function Ws(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-popover-sidebar"||t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail")||t.hasAttribute("data-app-action-sidebar-scroll")}function bb(){if(Yr?.isConnected&&me){me.observe(Yr,{childList:!0});return}Vs()}function hb(t){if(Ws(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function yb(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Ur=0;return}Ur+=1,Xr=Date.now()+Math.min(8e3,250*2**Math.min(Ur,5))})}function vb(){Wn||Date.now()<Xr||(Wn=requestAnimationFrame(()=>{Wn=0,!(Date.now()<Xr)&&(document.getElementById(Vt)?.isConnected||Ui())}))}function Ui(){if(!document.body)return;me?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Vt);t=n instanceof HTMLButtonElement?n:mb();let r=on(),o=Un();if(r){let i=_s(r),a=i.parentElement,s=!!(a&&Me(a));if(Ws(i)&&!Me(i)||a&&Ws(a)&&!s)return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0);let l=fb(t);l&&(l.before(t),e=!0),_i(t);let c=(a?.getBoundingClientRect().width??0)>=80,u=(s||Me(i))&&!c;Us(t,u?!0:void 0),id(t,r)}else if(Ae()){let i=Ae();t.parentElement!==i&&(i.prepend(t),e=!0),_i(t),Us(t)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),_i(t),Us(t,!0)):t.isConnected&&!zr(t)&&(t.remove(),t=null)}finally{yb(t,e),bb(),Xs()}}function Vs(){let t=Hi();!t||!hb(t)||Yr===t&&me||(me?.disconnect(),Yr=t,me=new MutationObserver(()=>{document.getElementById(Vt)?.isConnected||vb()}),me.observe(t,{childList:!0}))}function xb(){Ui(),Vs(),Gr===void 0&&(Gr=window.setInterval(()=>{let t=document.getElementById(Vt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Xr&&Ui();else{Ur=0;let e=on();e&&id(t,e)}Vs()},Ng))}function Eb(){Gr!==void 0&&(clearInterval(Gr),Gr=void 0),Wn&&cancelAnimationFrame(Wn),Wn=0,Xr=0,Ur=0,me?.disconnect(),me=null,Yr=null}function wb(t){Bi===t&&Ie||(Ie?.disconnect(),Bi=t,Ie=new MutationObserver(()=>{if(!t.isConnected){Ie?.disconnect(),Ie=null,Bi=null;return}ad(t)}),Ie.observe(t,{childList:!0}))}function ad(t){if(wb(t),t.querySelector(`#${qi}`))return;let e=document.createElement("button");e.type="button",e.id=qi,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Vi()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Gs),e.addEventListener("pointerup",Gs),e.addEventListener("click",n=>{Gs(n),Js()}),t.insertBefore(e,t.firstChild)}function Oi(){let t=Kn();return t?(ad(t),!0):!1}function Sb(t){Ii(t)&&(queueMicrotask(Oi),requestAnimationFrame(()=>{Oi()}),window.setTimeout(Oi,60),window.setTimeout(Oi,180))}function Tb(){Fi?.abort();let t=new AbortController;Fi=t,document.addEventListener("click",Sb,{signal:t.signal})}function Lb(){Fi?.abort(),Fi=null,Ie?.disconnect(),Ie=null,Bi=null}function sd(){Gn(),Ug(()=>{Qu(),Ju(),Ui(),Js()})}var ld=w({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Rg}`,`#${Vt}`,`#${qi}`,`#${sn}`,`#${Ki}`,`#${Jr}`,`#${$i}`,"#bloom-menu-panel"],start(){Qu(),Ju(),xb(),Tb(),Pi?.(),Pi=Ku(Gi),Gi(),js=[$n("pluginToggle",()=>{Ne&&an()}),$n("pluginPin",()=>{Ne&&an()}),$n("pluginStar",()=>{Ne&&an()})]},stop(){Eb(),Lb(),Pi?.(),Pi=null;for(let t of js)t();js=[],Zs(),document.getElementById(Vt)?.remove(),document.getElementById(qi)?.remove(),document.getElementById($i)?.remove(),Vu=null,Pg=null,Kr=null,Wr=null,ji=null,Yu=null,Vr=null,Ne=!1}});var Yi=Pu,Yt=jr,Yn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]','form button[aria-label^="Send" i]','form button[aria-label="Send prompt"]','form button[aria-label="\u53D1\u9001"]','form button[type="submit"]'].join(", "),cd=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]','form button[aria-label*="Stop streaming" i]','form button[aria-label*="Stop generating" i]','form button[aria-label*="\u505C\u6B62\u751F\u6210"]','form button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),ud=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),kb=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Cb='[contenteditable="false"], button, [role="button"]';function _t(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function ln(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!_t(o)))return o;return null}function dd(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function q(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=dd(t);return!!(kb.test(n)||/^stop$/i.test(n))}function qt(){let e=Array.from(document.querySelectorAll(Yi)).find(_t);if(e instanceof HTMLElement)return e;let n=ln(document,Yt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function at(){let t=Array.from(document.querySelectorAll(Yt));return t.find(_t)??t[0]??null}function Mb(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Cb);return!!n&&n!==e&&e.contains(n)}function Qs(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Mb(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function tl(t){return t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement}function Xt(t){let e=t??at();return e?tl(e)?e.value.replaceAll("\u200B","").trim().length>0:Qs(e,e).replaceAll("\u200B","").trim().length>0:!1}function Pe(t){return!Xt(t)}function Xi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function fd(t){let e=qt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!_t(n))&&t(n))return n;return null}function Oe(){let t=qt(),e=ln(t,Yn)??ln(document,Yn);return e&&!q(e)?e:fd(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!q(n);let o=dd(n);return/^(send|send prompt|发送)$/i.test(o)&&!q(n)?!0:n.getAttribute("type")==="submit"&&!q(n)})}function cn(){let t=qt(),e=ln(t,cd,!0)??ln(document,cd,!0);if(e)return e;let n=ln(t,ud)??ln(document,ud);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&_t(r)&&q(r))return r}return fd(q)}function Zt(t){if(tl(t))return t.value;let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Qs(n,t)).join(`
`):Qs(t,t)}function el(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function pe(t,e,n=!1){if(tl(t)){t.focus(),t.value=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"}));try{let i=n?0:e.length;t.setSelectionRange(i,i)}catch{}return}t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),el(t,n)}var pd=new C("Streaming");function ro(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!_t(e))&&(q(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Ab(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&_t(t))}function Hb(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&_t(t))}function Ib(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Qt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function W(){if(cn()||ro()||Ib())return!0;let t=Oe();return t&&_t(t)&&!q(t)?!1:!!(Ab()||Hb())}var Rb=400,md=3,mn=new Set,Qr,to=null,nl=null,dn=!1,un=0,De="",_e="",qe=!1,eo=!1,no=!1,Jt=!1,J=null,St="",fn=!1;function z(){return Jt}function pn(){return qe}function Xn(){return St}function rl(){return R()||St}function gd(){return ue(Ot())}function Zi(t,e){return{streaming:t,contextKey:e,conversationId:rl()}}function ol(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Nb(t){return!t||t==="/"||t.startsWith("/g/")}function V(t,e){if(!t||t===e)return!1;let n=de(ol(e)||e);return!n||!(t.endsWith("|draft")||Nb(ol(t)))?!1:St?n===St:fn}function Ji(){dn=!1,un=0,De="",qe=!1,eo=!1,no=!1,St="",fn=!1}function Pb(t){for(let e of Array.from(mn))try{e.onFall?.(t)}catch{}}function Ob(t){for(let e of Array.from(mn))try{e.onRise?.(t)}catch{}}function Be(t){for(let e of Array.from(mn))try{e.onTick?.(t)}catch{}}function Bb(t,e){for(let n of Array.from(mn))try{n.onContext?.(t,e)}catch{}}function Db(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&q(n)&&(qe=!0)}function _b(t){if(t.type==="post-start"){let n=R();if(!t.conversationId){n||(fn=!0),(!n||n===St)&&(Jt=!1,qe=!1);return}if(!(t.conversationId===n||t.conversationId===St)&&!(!n&&fn))return;St=t.conversationId,fn=!1,Jt=!1,qe=!1;return}if(t.type!=="post-end"||!dn&&!J)return;let e=R();t.conversationId&&!(e?t.conversationId===e:t.conversationId===St)||(no=!0,t.error&&(eo=!0,J&&(J.error=!0)))}function qb(){let t=gd(),e=W();if(_e&&t&&_e!==t){let o=_e;if(!V(o,t))J=null,Ji(),Jt=e;else{let i=de(ol(t));if(i&&!St&&(St=i,fn=!1),De===o&&(De=t),J&&J.contextKey===o){J.contextKey=t;let a=rl();a&&(J.conversationId=a)}Jt=!1}if(_e=t,Bb(t,o),Jt){Be(Zi(!1,t));return}}else t&&(_e=t);if(Jt){if(e){Be(Zi(!1,t));return}Jt=!1}if(J)if(e||J.contextKey!==t)J=null;else{let o=J;J=null,Ji(),Pb(o),Be(Zi(!1,t));return}let n=Zi(e,t);if(e){let o=!dn;o&&(qe=!1,eo=!1,no=!1),dn=!0,un=0,De=t,o&&Ob(n),Be(n);return}if(!dn){Be(n);return}if(un+=1,no&&(un=Math.max(un,md)),un<md){Be(n);return}if(!(!!De&&De===t)){Ji(),Be(n);return}J={contextKey:De||t,conversationId:rl(),userStopped:qe,error:eo||Qt()},Be(n)}function $b(){Qr===void 0&&(dn=W(),_e=gd(),De=dn?_e:"",un=0,qe=!1,eo=!1,no=!1,Jt=!1,J=null,St="",fn=!1,to?.abort(),to=new AbortController,document.addEventListener("click",Db,{capture:!0,signal:to.signal}),nl=Et(_b),Qr=setInterval(qb,Rb),pd.debug("watchStreamingEdge started"))}function Fb(){mn.size||(Qr!==void 0&&(clearInterval(Qr),Qr=void 0),to?.abort(),to=null,nl?.(),nl=null,Ji(),_e="",Jt=!1,J=null,pd.debug("watchStreamingEdge stopped"))}function ut(t){let e=typeof t=="function"?{onFall:t}:t;return mn.add(e),$b(),()=>{mn.delete(e),Fb()}}var bd="bloom-host-icon",oo="data-bloom-host-rel",il="not all",al=0,hd=0,jb=400;function yd(t){al+=1;try{t()}finally{al-=1}}function Qi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function $e(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function vd(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function zb(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Gb(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-hd<jb||(hd=n,t.appendChild(e))}function Ub(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Qi(n)&&(n.getAttribute(oo)||n.setAttribute(oo,n.rel),n.media!==il&&(n.media=il),n.rel!==bd&&(n.rel=bd))}function Kb(t){for(let e of t.querySelectorAll(`link[${oo}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(oo);n&&(e.rel=n),e.removeAttribute(oo),e.media===il&&e.removeAttribute("media")}}function xd(t,e){let{head:n}=document;!n||!e||yd(()=>{Ub(n,t);let r=vd(t),{type:o,sizes:i}=zb(e);r?Gb(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Ed(t,e){let{head:n}=document;n&&yd(()=>{vd(t)?.remove(),Kb(n)})}function wd(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(al)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Qi(c.target)&&(a=!0,$e(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Qi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Qi(u)&&u.id!==t&&(a=!0,$e(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Wb=["original","badge","dot","hole","bg"],Ld=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],kd={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ta="#FCFCFC",Vb="#111111",Sd="#111111",Yb="#ffffff",Xb="#212121",Zb="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Jb={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ea=32,Td=64;function Cd(t){return typeof t=="string"&&Wb.includes(t)}function Qb(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function na(t){let e=document.createElement("canvas");e.width=ea,e.height=ea;let n=e.getContext("2d");return n?(n.scale(ea/Td,ea/Td),t(n),e.toDataURL("image/png")):""}function th(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ra(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Zb);n&&(t.strokeStyle=Vb,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function eh(t,e,n){let r=kd[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Sd,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Sd,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Yb,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function io(t,e){if(t==="original")return e==="wait"?na(r=>ra(r,ta)):Qb(Jb[e]);let n=e==="wait"?void 0:kd[e];return na(t==="hole"?r=>ra(r,n??ta):t==="bg"?r=>{r.fillStyle=n??Xb,th(r,0,0,64,64,14),r.fill(),ra(r,ta,!1)}:r=>{ra(r,ta),e!=="wait"&&eh(r,e,t==="dot"?"dot":"badge")})}function Md(t){return{wait:io(t,"wait"),rotate:io(t,"rotate"),done:io(t,"done"),ready:io(t,"ready"),error:io(t,"error")}}var nh=new C("ChatStateFavicons"),bn="bloom-chat-state-favicon",Nd=["input","beforeinput","cut","paste","compositionend"],Pd=M({style:{type:3,description:"Favicon overlay",options:Ld}}),te="",cl={wait:"",rotate:"",done:"",ready:"",error:""},ao="wait",dt=!1,Q=!1,D=null,bt="",Tt="",yn=!0,aa=!1,Zn=null,Lt=0,oa=null,ia=null,gn=null,ll=null,Jn=null,$t=!1,Ad=new WeakSet;function rh(){let t=Pd.store.style;return Cd(t)?t:"bg"}function Od(){let e=document.querySelector(`link[rel~="icon"]:not(#${bn}), link[data-bloom-host-rel]:not(#${bn})`)?.href;return $e(e)?e:$e(te)?te:""}function oh(){let t=document.getElementById(bn);return t instanceof HTMLLinkElement?t:null}function ih(){if(!$e(te)){let t=Od();t&&(te=t)}return $e(te)?te:cl.wait}function Bd(t){return t==="wait"?ih():cl[t]}function Dd(){xd(bn,Bd(ao))}function $(t){let e=Bd(t);if(ao===t){let n=oh();if(n&&n.getAttribute("href")===e)return}ao=t,Dd()}function Hd(){cl=Md(rh()),$(ao)}function ul(){return ue(Ot())}function dl(t,e){!t||!e||t===e||(D===t&&(D=e),bt===t&&(bt=e),Tt===t&&(Tt=e))}function ah(){let t=ul();if(!(W()||dt||Q))return bt="",t;if(bt&&t&&bt!==t)if(V(bt,t))dl(bt,t),bt=t;else return bt="",t;else!bt&&t&&(bt=t);return bt||t}function Id(t){return!D||!t?!1:D===t?!0:V(D,t)}function _d(){dt=!1,Q=!1,D=null,bt=""}function qd(t){Tt=t,_d(),yn=!1,aa=!0,$("wait")}function sl(t){return!t&&yn}function sh(){if(!$t)return;let t=ul();if(Tt&&t&&Tt!==t&&!V(Tt,t)){qd(t);return}Tt&&t&&V(Tt,t)&&dl(Tt,t),t&&(Tt=t);let e=W(),n=e&&!z();if(aa){if(z()){$("wait");return}aa=!1}if(z()){$("wait");return}let r=ah(),o=Pe();if(pn()&&!e){dt=!1,Q=!1,D=null,$(o?"wait":sl(o)?"ready":"wait");return}if(Qt()&&!e&&dt){$("error"),dt=!1,Q=!1,D=null;return}if(n){dt||(yn=!1),dt=!0,Q=!1,D=r,$("rotate");return}if(dt)if(!Id(t))dt=!1,Q=!1,D=null;else if(Q){dt=!1,Q=!0,D=t||r,$("done");return}else{$("rotate");return}if(Q)if(D&&t&&!Id(t))Q=!1,D=null;else if(o){D=r||D,$("done");return}else if(sl(o)){Q=!1,$("ready");return}else{Q=!1,$("wait");return}D=null,o?$("wait"):sl(o)?$("ready"):$("wait")}function hn(){$t&&(Gd(),Fd(),jd(),sh())}function $d(){if(Jn){for(let t of Nd)Jn.removeEventListener(t,zd,!0);Jn=null}}function Fd(){let t=qt(),e=t&&t!==document.body?t:null;if(!(Jn===e&&e?.isConnected)&&($d(),!!e)){Jn=e;for(let n of Nd)Jn.addEventListener(n,zd,{capture:!0,passive:!0})}}function jd(){let t=qt();if(!(gn&&ll===t&&t.isConnected)){if(gn?.disconnect(),ll=t,!t||t===document.body){gn=null;return}gn=new MutationObserver(()=>sa()),gn.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function sa(){if($t){if(document.hidden){Lt&&(cancelAnimationFrame(Lt),Lt=0),hn();return}Lt||(Lt=requestAnimationFrame(()=>{Lt=0,$t&&hn()}))}}function zd(){Xt()&&(yn=!0),sa()}function Rd(){Xt()&&(yn=!0),sa()}function lh(){$t&&(Lt&&(cancelAnimationFrame(Lt),Lt=0),hn())}function ch(){$t&&(yn=!1,hn())}function uh(t){if(!$t)return;if(t.userStopped){dt=!1,Q=!1,D=null,$("wait");return}if(t.error){dt=!1,Q=!1,D=null,$("error");return}let e=ul();if(t.contextKey&&e&&t.contextKey!==e&&!V(t.contextKey,e)){dt=!1,Q=!1,D=null,$("wait");return}dt=!1,Q=!0,D=e||t.contextKey,$("done")}function dh(){$t&&hn()}function fh(t,e){if($t){if(V(e,t)){dl(e,t),Tt=t,hn();return}qd(t)}}function Gd(){let t=at();!t||Ad.has(t)||(Ad.add(t),t.addEventListener("input",Rd,{capture:!0,passive:!0}),t.addEventListener("compositionend",Rd,{capture:!0,passive:!0}))}var Ud=w({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Pd,startAt:"DOMContentLoaded",cleanupSelectors:[`#${bn}`],start(){$t=!0,te=Od()||te,Hd(),ia?.disconnect(),ia=wd(bn,t=>{$e(t)&&(te=t),Dd()}),Zn?.abort(),Zn=new AbortController,window.addEventListener("popstate",sa,{signal:Zn.signal}),document.addEventListener("visibilitychange",lh,{signal:Zn.signal}),Gd(),Fd(),jd(),oa?.(),oa=ut({onRise:ch,onFall:uh,onTick:dh,onContext:fh}),hn(),nh.debug("favicon watch started")},stop(){$t=!1,Lt&&cancelAnimationFrame(Lt),Lt=0,oa?.(),oa=null,Zn?.abort(),Zn=null,$d(),gn?.disconnect(),gn=null,ll=null,ia?.disconnect(),ia=null,_d(),Tt="",yn=!0,aa=!1,ao="wait",Ed(bn,te)},onSettingsChange:Hd});var Kd=`.bloom-ih-hud {
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
`;var Gw=new C("InputHistory"),fl=/\u200B/g,Wd=10,Vd=500,Yd=100,ph=8,gh=120,bh=2e3,la=10,ca=M({maxEntries:{type:4,description:"Max stored prompts",min:Wd,max:Vd,default:Yd},history:{type:5,description:"Stored prompts",render:Ih},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ml=new Map,tt=0,pl="",ee=!1,lo=!1,hl=0,so=null,gl,yl=null,Xd=!0;function Ft(){let t=ca.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Zd(t){let e=ot(Number(ca.store.maxEntries??Yd),Wd,Vd);return t.length>e?t.slice(t.length-e):t}function ua(t){ca.store.entries=Zd(t)}function hh(t){return t.replaceAll(fl,"").replace(/\n$/,"").trim()}function bl(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Yt);return n instanceof HTMLElement?n:at()}function yh(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Zt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(fl,"").trim().length===0,last:i.toString().replaceAll(fl,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Jd(t){clearTimeout(gl),gl=setTimeout(()=>{if(t!==hl)return;lo=!1;let e=yl;e&&el(e,Xd)},gh)}function Qd(t,e,n){lo=!0,yl=t,Xd=n;let r=++hl;pe(t,e,n),Jd(r)}function vh(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Qn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function xh(){document.querySelector(".bloom-ih-hud")?.remove()}function Eh(t,e){let n=vh();n.textContent=t;let r=(e.closest("form")??qt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-ph)}px`,n.classList.add("bloom-ih-hud-on")}function vl(t){let e=hh(t);if(!e)return;let n=Date.now(),r=ml.get(e);if(r&&n-r<bh)return;ml.set(e,n);let o=Ft().filter(i=>i!==e);o.push(e),ua(o),tt=Ft().length,ee=!1,Qn()}function wh(t,e){let n=Ft();if(!n.length&&t)return;tt>=n.length&&(pl=Zt(e),tt=n.length);let r=t?tt-1:tt+1;r<0||r>n.length||(tt=r,ee=!0,Qd(e,r===n.length?pl:n[r],t),r<n.length?Eh(`${r+1} / ${n.length}`,e):Qn())}function Sh(t){ee=!1,Qn(),Qd(t,pl,!1),tt=Ft().length}function Th(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=bl(t.target)??bl(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&ee&&!t.altKey&&!t.shiftKey){Sh(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){vl(Zt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=Ft();if(!r){let i=yh(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||tt<=0)||!n&&tt>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),wh(n,e))}function Lh(t){if(bl(t.target)){if(lo){Jd(hl);return}ee&&(ee=!1,Qn(),tt=Ft().length)}}function kh(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Yt);n instanceof HTMLElement&&vl(Zt(n))}function Ch(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Yn);if(!n||!(n instanceof HTMLElement)||q(n))return;let r=at();r&&vl(Zt(r))}function Mh(t){if(!(!ee||lo)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}ee=!1,Qn()}}function Ah(){if(so)return;so=new AbortController;let{signal:t}=so,e={capture:!0,signal:t};window.addEventListener("keydown",Th,e),window.addEventListener("input",Lh,e),window.addEventListener("submit",kh,e),window.addEventListener("click",Ch,e),window.addEventListener("pointerdown",Mh,e)}function Hh(t){let e=Ft().slice();e.splice(t,1),ua(e),tt>e.length&&(tt=e.length)}function Ih(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=Ft().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/la));n>=l&&(n=l-1);let c=s.slice(n*la,n*la+la);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((E,h)=>{let x=i.indexOf(E),mt=Ft().length-1-x,pt=document.createElement("div");pt.className="bloom-ih-item";let Z=document.createElement("button");Z.type="button",Z.className=`bloom-ih-body${r===h?"":" bloom-ih-clamp"}`,Z.textContent=E,Z.addEventListener("click",()=>{r=r===h?-1:h,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let ct=document.createElement("button");ct.type="button",ct.title="Copy",ct.textContent="C",ct.addEventListener("click",()=>{Zc(E)});let vt=document.createElement("button");vt.type="button",vt.title="Delete",vt.textContent="\xD7",vt.addEventListener("click",()=>{Hh(mt),o()}),O.append(ct,vt),pt.append(Z,O),g.appendChild(pt)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(ua([]),tt=0,o())}),d.append(f,m,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var tf=w({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:ca,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",Kd),tt=Ft().length,ee=!1,Ah()},stop(){so?.abort(),so=null,Qn(),xh(),ml.clear(),clearTimeout(gl),lo=!1,yl=null,ee=!1},onSettingsChange(){let t=Ft(),e=Zd(t);e.length!==t.length&&ua(e),tt>e.length&&(tt=e.length)}});var xl="noShareLink",Rh=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share"]','button[aria-label="Share chat"]','button[aria-label="\u5206\u4EAB"]'],Nh=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],El=M({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function ef(t){return`${t.join(",")}{display:none!important}`}function nf(){let t=[];if(El.store.hideShareChat!==!1&&t.push(ef(Rh)),El.store.hideShareProject!==!1&&t.push(ef(Nh)),!t.length){L(xl);return}k(xl,t.join(`
`))}var rf=w({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:El,start:nf,onSettingsChange:nf,stop(){L(xl)}});var sf="noDictation",Ph=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]','form button[aria-label="Dictate button"]','form button[aria-label="Dictate"]','form button[aria-label="Start dictation"]','form button[aria-label="Stop dictation"]','form button[aria-label="Submit dictation"]','form button[aria-label^="Dictate" i]','form button[aria-label="\u542C\u5199"]','form button[aria-label="\u5F00\u59CB\u542C\u5199"]','form button[aria-label="\u505C\u6B62\u542C\u5199"]','form button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form button[data-testid="composer-dictate-button"]','form button[data-testid="dictation-button"]'],Oh=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],lf=M({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function of(t){return`${t.join(",")}{display:none!important}`}function af(){let t=[of(Ph)];lf.store.hideDictationSettings!==!1&&t.push(of(Oh)),k(sf,t.join(`
`))}var cf=w({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:lf,start:af,onSettingsChange:af,stop(){L(sf)}});var wl="noSidebarIdentity",tr=[...Ds.split(","),'[data-app-navigation-rail] button[aria-haspopup="menu"]',"[data-bloom-profile-chip]"],ff=tr.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),mf=tr.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Bh=[...ff,...mf],Dh=[...ff,...tr.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],_h=tr.map(t=>`${t} a[href^="mailto:"]`),qh=tr.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),$h=tr.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),co=M({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function uf(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Fh(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function jh(){return`${$h.join(",")}{margin-block:auto!important}`}function zh(){return`${qh.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function df(){let t=co.store.hideUsername!==!1,e=co.store.hideEmail!==!1,n=t&&co.store.enlargePlan!==!1,r=t&&co.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Fh([...Dh,...mf])),o.push(jh())):o.push(uf(Bh))),e&&o.push(uf(_h)),n&&o.push(zh()),!o.length){L(wl);return}k(wl,o.join(`
`))}var pf=w({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:co,start:df,onSettingsChange:df,stop(){L(wl)}});var gf=`#bloom-rt-host {
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
`;var yf=new C("RecentTopics"),rr="bloom-rt-host",vf="home",xf=/^\/c\/([a-z0-9_-]{8,})/i,Uh=/\/c\/([a-z0-9_-]{8,})/i,Ef=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Kh=new Set(["Backquote","IntlBackslash"]),Wh=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Vh=140,Yh=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),et=M({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Yh},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),da=null,fa=null,ht=!1,bo=!1,uo=!1,ne=0,vn="",er=null,fo=null,nr,Sl=null,Tl=null;function Xh(){let t=Number(et.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function mo(){let t=et.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function kl(){let t=et.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function wf(){let t=et.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Cl(){let t=et.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function pa(t){let e=Xh();return t.length>e?t.slice(0,e):t}function re(t){return t===vf}function po(t,e=Vh){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Ml(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(xf)?.[1]??""}catch{return t.match(Uh)?.[1]??""}}function xn(){let t=(location.pathname||"/").match(xf);if(t?.[1])return t[1];let n=Ot().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return vf}function Al(t){if(re(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Ml(r.getAttribute("href")||"")!==t)continue;let o=po(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return xn()===t&&e&&!/^ChatGPT$/i.test(e)?po(e,80):""}function Zh(t){if(re(t))return"New chat";let e=kl()[t];if(e)return e;let n=zn(t);return n||Al(t)||"Chat"}function Jh(t){return Cl()[t]||""}function Qh(t){return wf()[t]||{}}function Hl(t,e){if(!t||re(t)||!e||/^new chat$/i.test(e.trim()))return;let n=kl();n[t]!==e&&(n[t]=e,et.store.titles=n)}function t0(t){t.type==="conversation-meta"&&(Hl(t.conversationId,t.title),ht&&or())}function e0(t,e){if(!t||re(t)||!e)return;let n=Cl();n[t]!==e&&(n[t]=e,et.store.projects=n)}function n0(t,e){if(!t||re(t)||!e.user&&!e.assistant)return;let n=wf(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,et.store.previews=n)}function Il(t){if(!t||re(t)&&et.store.includeHome===!1)return;let e=mo().filter(n=>n!==t);e.unshift(t),et.store.visits=pa(e)}function ga(){let t=et.store.includeHome!==!1;return pa(mo().filter(n=>t||!re(n))).map(n=>({id:n,title:Zh(n),project:Jh(n),preview:Qh(n)}))}function bf(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return po(o)}catch{return""}}function go(t){if(!t||re(t)||t!==xn())return;let e=Al(t);e&&Hl(t,e);let n=bf("user"),r=bf("assistant");n0(t,{user:n,assistant:r});let o=Tf(t);if(o){let i=Sf(o);i&&e0(t,i)}}function Rl(){let t=kl(),e=Cl(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${rr}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Ml(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=po(c.textContent||"",80);d&&!Ef.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Sf(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(et.store.titles=t),i&&(et.store.projects=e);let a=mo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(et.store.visits=pa([...a,...l]))}function Sf(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=po((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Ef.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Tf(t){if(re(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Ml(e.getAttribute("href")||"")===t)return e}catch{}return null}function r0(t){let e=Tf(t);if(e){e.click();return}if(re(t)){location.assign("/");return}location.assign(`/c/${t}`)}function o0(){let t=xn();vn&&vn!==t&&go(vn),vn=t,Il(t),Rl();let e=Al(t);e&&Hl(t,e),go(t)}function ma(){nr===void 0&&(nr=window.setTimeout(()=>{nr=void 0,o0()},120))}function i0(){er||(er=history.pushState.bind(history),fo=history.replaceState.bind(history),history.pushState=function(...e){let n=er(...e);return ma(),n},history.replaceState=function(...e){let n=fo(...e);return ma(),n})}function a0(){er&&(history.pushState=er),fo&&(history.replaceState=fo),er=null,fo=null}function s0(t){return Kh.has(t.code)||t.keyCode===192?!0:Wh.has(t.key)}function Lf(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function l0(t,e){bo=e,Rl(),go(xn()),ht=!0,ne=0;try{let n=xn();Il(n);let r=ga();r.length>1&&(ne=t?r.length-1:1)}catch(n){yf.error("Failed to open switcher:",n)}or()}function hf(t){let{length:e}=ga();e&&(ne=(ne+(t?-1:1)+e)%e,or())}function Nl(){if(!ht)return;let t=ga()[ne];ht=!1,bo=!1,or(),t&&r0(t.id)}function kf(){ht&&(ht=!1,bo=!1,or())}function c0(t){if(Lf(t)){uo=!0;return}if((t.ctrlKey||uo)&&!t.altKey&&!t.metaKey&&s0(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{ht?hf(t.shiftKey):l0(t.shiftKey,!0)}catch(n){yf.error("Hotkey failed:",n)}return}if(ht){if(t.key==="Escape"){t.preventDefault(),kf();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Nl();return}t.key==="Tab"&&(t.ctrlKey||uo)&&(t.preventDefault(),hf(t.shiftKey))}}function u0(t){Lf(t)&&(uo=!1,ht&&bo&&Nl())}function d0(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ma)}function f0(t){!ht||(t.target instanceof Element?t.target:null)?.closest(`#${rr}`)||kf()}function m0(){document.visibilityState==="hidden"&&go(xn())}function Ll(t=fa){t instanceof HTMLElement&&Ni(t,Ri("auto"),!0)}function p0(){if(!document.body)return null;let t=document.getElementById(rr);if(t instanceof HTMLElement)return fa=t,Ll(t),t;t=document.createElement("div"),t.id=rr;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),fa=t,Ll(t),t}function or(){let t=p0();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!ht){e.dataset.visible="false",e.replaceChildren();return}let n=ga();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}ne>=n.length&&(ne=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===ne?"true":"false",s.setAttribute("aria-selected",a===ne?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{ne=a,Nl()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function g0(){document.getElementById(rr)?.remove(),fa=null}var Cf=w({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${rr}`],settings:et,start(){k("recentTopics",gf),vn=xn(),Il(vn),Rl(),go(vn),Sl=Et(t0),i0(),da=new AbortController;let{signal:t}=da;window.addEventListener("keydown",c0,{capture:!0,signal:t}),window.addEventListener("keyup",u0,{capture:!0,signal:t}),window.addEventListener("popstate",ma,{signal:t}),document.addEventListener("click",d0,{capture:!0,signal:t}),document.addEventListener("click",f0,{signal:t}),document.addEventListener("visibilitychange",m0,{signal:t}),Tl=$n("schemeChange",()=>Ll())},stop(){da?.abort(),da=null,nr!==void 0&&(clearTimeout(nr),nr=void 0),a0(),Sl?.(),Sl=null,Tl?.(),Tl=null,ht=!1,bo=!1,uo=!1,g0()},onSettingsChange(){let t=pa(mo());t.length!==mo().length&&(et.store.visits=t),ht&&or()}});var Pl="cleaner",b0=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],h0=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs",'#thread-bottom [class*="vt-disclaimer"]','[data-testid="desktop-app-shell"] [class*="disclaimer"]'],y0=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],v0=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],x0=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],E0=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],En=M({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function ir(t){return`${t.join(",")}{display:none!important}`}function Mf(){let t=[];if(En.store.hideDownloadApps!==!1&&t.push(ir(b0)),En.store.hideDisclaimer!==!1&&t.push(ir(h0)),En.store.hideUpgrade!==!1&&t.push(ir(y0)),En.store.hideLockedModels!==!1&&t.push(ir(v0)),En.store.hideHomePromo!==!1&&t.push(ir(x0)),En.store.hideAds!==!1&&t.push(ir(E0)),!t.length){L(Pl);return}k(Pl,t.join(`
`))}var Af=w({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:En,start:Mf,onSettingsChange:Mf,stop(){L(Pl)}});var ha=new C("ResponseNotification"),sr=M({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:M0},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ol=!1,ba=null,ar=null,ho=null;function w0(){return document.visibilityState==="hidden"||document.hidden}function S0(){return sr.store.onlyWhenHidden===!1?!0:w0()}function T0(){let t=zn(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Hf(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!ar||ar.state==="closed")&&(ar=new t);let e=ar,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){ha.debug("chime failed",t)}}function L0(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){ha.debug("custom sound failed",e),Hf()}}function If(){let t=String(sr.store.soundUrl||"").trim();t?L0(t):Hf()}function k0(){let t="Bloom++",e=`${T0()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){ha.debug("notification failed",n)}}function C0(){S0()&&(sr.store.sound!==!1&&If(),sr.store.browserNotification!==!1&&k0())}function M0(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>If()),t.appendChild(e),()=>{e.remove()}}var Rf=w({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:sr,start(){Ol=!0,ba?.(),ba=ut(t=>{if(!Ol||t.userStopped||t.error)return;let e=R()||Xn();t.conversationId&&t.conversationId!==e||C0()}),ho?.abort(),ho=new AbortController,sr.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:ho.signal}),ha.debug("watch started")},stop(){Ol=!1,ba?.(),ba=null,ho?.abort(),ho=null;try{ar?.close()}catch{}ar=null}});var Nf=`#bloom-pq-chip {
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
`;var Ue=new C("PromptQueue"),wa="bloom-pq-chip",Pf="promptQueue",H0=8,I0=50,R0=2e3,N0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,P0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Bl=M({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),ze=new Map,Of=0,zt=!1,jt="",P="",oe=!1,yt=!1,We=!1,B=null,yo=null,ya=null,je,So,Ke=null,N=null,lr=null,xa=!1,st=null,wn,Ge=!0,U=!1,G=!1,ft=!1;function ge(){return ue(Ot())}function cr(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function O0(t){let e=cr(Zt(t));if(e)return e;if(!Xt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),cr(n.innerText||n.textContent||"")}catch{return""}}function jf(){try{let t=document.querySelectorAll(Du),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function zf(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Gf(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&N0.test(n))return!0}}catch{}return!1}function Ea(){let t=Xn();if(!t)return!1;let e=R();return!e||e===t}function wo(){if(W()||Ea())return!1;let t=jf();if(!t)return!0;if(zf(t)||Gf(t))return!1;try{if(t.querySelector(P0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function B0(){if(z()||pn())return U=!1,!1;if(W()||Ea())return U=!0,!0;let t=jf();return t&&(zf(t)||Gf(t))?(U=!0,!0):U&&!wo()?!0:(U=!1,!1)}function Uf(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Yt);return n instanceof HTMLElement?n:null}function Bf(t){return Uf(t)??at()}function Sa(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Kf(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function D0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?cr(e.innerText||e.textContent||""):""}catch{return""}}function _0(){return Of+=1,`pq${Date.now().toString(36)}${Of.toString(36)}`}function Y(t){return ze.get(t)??[]}function Wf(t){return Y(t)[0]}function Sn(t,e){e.length?ze.set(t,e):ze.delete(t)}function Vf(t){if(!Y(t).length){G=!1,ft=!1,P="";return}G=!0,ft=!1,U=!0,P=""}function Df(t){if(!jt||jt===t)return;let e=ze.get(jt);!e?.length||ze.has(t)||V(jt,t)&&(ze.delete(jt),ze.set(t,e),P===jt&&(P=t),B?.key===jt&&(B.key=t),Ue.debug("migrated pending",jt,"\u2192",t))}function Ta(t){let e=ge(),n=Y(e);if(Bl.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),Sn(e,n)}else if(n.length>=H0){Ue.debug("queue full",e);return}else n.push({id:_0(),text:t,at:Date.now()}),Sn(e,n);U=!0,B={key:e,text:t,turns:Kf(),ticks:3};let r=at();r&&pe(r,"");try{lt()}catch(o){Ue.error("chip",o)}Ue.debug("queued",e,n.length,t.length)}function Yf(t,e){let n=Y(t).filter(r=>r.id!==e);if(Sn(t,n),N===e&&(N=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}lt()}function ql(){lr?.abort(),lr=null}function q0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function _f(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function $0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||N||st)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;lr?.abort();let c=new AbortController;lr=c;let{signal:u}=c,d=!1,f=!1,m=0,p=0,b=0,g=0,E=null,h=[],x=[],mt=()=>{e.classList.add("bloom-pq-settling");for(let y of h)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},pt=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(E?.isConnected?E.before(t):e.append(t)),E?.remove(),E=null,mt(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},Z=()=>{xa=!0;let y=A=>{A.preventDefault(),A.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{xa=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=_f(h.length,m,p),A=x.length>1?(x[x.length-1].top-x[0].top-x.slice(0,-1).reduce((H,Ut)=>H+Ut.height,0))/(x.length-1):2,gt=new Array(x.length),xt=x[0]?.top??0;for(let H of y)gt[H]=xt,xt+=x[H].height+A;for(let H=0;H<h.length;H++){if(H===m)continue;let Ut=gt[H]-x[H].top;h[H].style.transform=Math.abs(Ut)<.5?"":`translate3d(0,${Math.round(Ut)}px,0)`}},ct=()=>{let y=Y(n).slice();if(m<0||m>=y.length)return;let A=_f(y.length,m,p);if(A.every((H,Ut)=>H===Ut))return;let gt=A.map(H=>y[H]).filter(Boolean);if(gt.length!==y.length)return;Sn(n,gt);let xt=new Map(h.map(H=>[H.dataset.pqId||"",H]));for(let H of gt){let Ut=xt.get(H.id);Ut&&e.append(Ut)}},vt=y=>{if(f)return;f=!0;let A=d;lr===c&&(lr=null),A&&y&&t.isConnected&&ct(),pt(),A&&Z(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;pt(),y&&Z()});let ei=()=>{d=!0,h.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=h.indexOf(t),m<0&&(m=h.findIndex(H=>H.dataset.pqId===r)),p=m<0?0:m;let y=t.getBoundingClientRect();b=y.left,g=y.top;let A=getComputedStyle(t);E=document.createElement("div"),E.className="bloom-pq-gap",E.style.height=`${y.height}px`,t.before(E),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=A.color,t.style.font=A.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let gt=e.getBoundingClientRect(),xt=e.scrollTop;x=h.map(H=>{let gs=(H===t?E:H).getBoundingClientRect(),zc=gs.top-gt.top+xt;return{top:zc,height:gs.height,mid:zc+gs.height/2}})},v=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(ei(),!d||m<0)))return;y.preventDefault(),t.style.left=`${b+(y.clientX-s)}px`,t.style.top=`${g+(y.clientY-l)}px`;let A=e.getBoundingClientRect(),gt=y.clientY-A.top+e.scrollTop,xt=q0(gt,x.map(H=>H.mid));xt!==p&&(p=xt,O())},I=y=>{y.pointerId===a&&vt(!0)};window.addEventListener("pointermove",v,{signal:u}),window.addEventListener("pointerup",I,{signal:u}),window.addEventListener("pointercancel",()=>vt(!1),{signal:u})})}function F0(){yt=!0,clearTimeout(So),So=setTimeout(()=>{yt=!1,So=void 0},R0)}function j0(t){if(st)return;let e=ge(),n=Y(e).find(i=>i.id===t);if(!n)return;let r=at();if(!r)return;let o=n.text;st=t,N===t&&(N=null),ql(),lt(),clearTimeout(wn),wn=setTimeout(()=>{if(wn=void 0,!zt||st!==t)return;if(st=null,ge()!==e||!Y(e).some(a=>a.id===t)){lt();return}Sn(e,Y(e).filter(a=>a.id!==t)),lt(),F0(),pe(r,o);let i=Oe();i&&!q(i)&&!Xi(i)&&(i.click(),yt=!1),Vf(e)},160)}function vo(t){if(!zt||oe||G||st||W()||ge()!==t)return;let e=Wf(t);if(!e){P="";return}if(Qt())return;let n=at();if(!n)return;if(!Pe(n)){let o=cr(Zt(n));if(o&&o!==e.text)return}let r=Oe();!r||q(r)||Xi(r)||(oe=!0,pe(n,e.text),clearTimeout(je),je=setTimeout(()=>z0(t,e.id,e.text),I0))}function z0(t,e,n){je=void 0;try{if(!zt||G||st)return;let r=Wf(t);if(!r||r.id!==e||r.text!==n||W()||ge()!==t)return;let o=at();if(!o)return;let i=cr(Zt(o));if(i&&i!==n&&!Pe(o))return;i!==n&&pe(o,n);let a=Oe();if(!a||q(a)||Xi(a))return;a.click(),Sn(t,Y(t).filter(s=>s.id!==e)),lt(),Vf(t),Ue.debug("drained",t,Y(t).length)}finally{oe=!1}}function Dl(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=qt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function _l(){ql(),Ke?.remove(),Ke=null,N=null,Ge=!0}var Xf="http://www.w3.org/2000/svg";function G0(){let t=document.createElementNS(Xf,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function xo(t){let e=G0();for(let n of t){let r=document.createElementNS(Xf,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function Eo(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&Zf(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function U0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${wa}`)}function va(){let t=Ke?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function K0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function Fe(t,e){if(N!==t)return;if(N=null,e===null){lt();return}let n=cr(e),r=ge();if(!n){Yf(r,t);return}let o=Y(r).find(i=>i.id===t);o&&(o.text=n),lt()}function qf(t){st||N!==t&&(N&&Fe(N,va()),Y(ge()).some(e=>e.id===t)&&(N=t,Ge=!0,lt()))}function Zf(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function $f(t){return N===t?"edit":st===t?"send":"text"}function W0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function V0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||W0(l)!==$f(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",Ge?"true":"false"),n.hidden=!Ge;for(let s of e){let l=a.get(s.id);if($f(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function lt(){if(ql(),!zt||!document.body){_l();return}let t=ge(),e=Y(t);if(!e.length){_l();return}N&&!e.some(d=>d.id===N)&&(N=null),st&&!e.some(d=>d.id===st)&&(st=null);let n=Ke;if(n?.isConnected||(n=document.createElement("div"),n.id=wa,document.body.appendChild(n),Ke=n),V0(n,e)){Dl(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",Ge?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Ge=!Ge,lt()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",Ge||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=N===d.id,p=st===d.id;m||(f.setAttribute("role","button"),f.tabIndex=p?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),p&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let b=document.createElement("div");b.className="bloom-pq-body";let g;if(m){let h=document.createElement("textarea");h.className="bloom-pq-text bloom-pq-editing",h.value=d.text,h.rows=2,h.spellcheck=!1,h.setAttribute("aria-label","Queued message text"),h.addEventListener("keydown",x=>{x.stopPropagation(),x.key==="Enter"&&!x.shiftKey?(x.preventDefault(),Fe(d.id,h.value)):x.key==="Escape"&&(x.preventDefault(),Fe(d.id,null))}),h.addEventListener("blur",()=>Fe(d.id,h.value)),g=h,u=h}else{let h=document.createElement("span");h.className="bloom-pq-text line-clamp-2",h.textContent=p?"Sending":d.text,p?Zf(h,l,"Sending now"):h.addEventListener("click",x=>{if(xa){xa=!1,x.preventDefault(),x.stopPropagation();return}x.preventDefault(),x.stopPropagation(),qf(d.id)}),g=h}b.append(g),f.append(b);let E=document.createElement("div");if(E.className="bloom-pq-rail",m){let h=Eo("Save",xo(["M20 6 9 17l-5-5"]),()=>{Fe(d.id,g instanceof HTMLTextAreaElement?g.value:va())},l),x=Eo("Cancel",xo(["M18 6 6 18","m6 6 12 12"]),()=>{Fe(d.id,null)},l);E.append(h,x)}else{let h=Eo("Remove from queue",xo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{N&&N!==d.id&&Fe(N,va()),N=N===d.id?null:N,Yf(t,d.id)},l,void 0,p),x=Eo("Edit queued message",xo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>qf(d.id),l,"Edit",p),mt=Eo("Send now",xo(["M12 19V5","M6 11 12 5l6 6"]),()=>{N&&N!==d.id&&Fe(N,va()),j0(d.id)},l,"Send now (or Enter on empty composer)",p);E.append(h,x,mt)}f.append(E),!m&&!p&&$0(f,c,t,d.id),c.append(f)}if(n.append(o,c),Dl(n),u){let d=u,f=N;queueMicrotask(()=>{N===f&&d.isConnected&&K0(d)})}}function Y0(){if(!B)return;B.ticks-=1;let t=Y(B.key);if(t.length&&Kf()>B.turns){let e=D0();if(e&&e===B.text){Ue.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),Sn(B.key,t),!t.length&&P===B.key&&(P=""),B=null,lt();return}}B.ticks<=0&&(B=null)}function La(t){return!B0()||!Xt(t)?"":O0(t)}function X0(t){if(!zt||t.isComposing||t.keyCode===229||t.key!=="Enter"||U0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||oe)return;let e=Bf(t.target)??Bf(document.activeElement);if(!e)return;if(t.altKey||yt){yt=!1,We=!0,queueMicrotask(()=>{We=!1});return}let n=La(e);n&&(Sa(t),Ta(n))}function Z0(t){if(!zt||oe||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(We){We=!1;return}if(yt){yt=!1;return}let e=Uf(t.target);if(!e)return;let n=La(e);n&&(Sa(t),Ta(n))}function J0(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||q(e))return null;let n=t.closest(Yn);if(n instanceof HTMLElement&&!q(n))return n;let r=Oe();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Ff(t){if(!zt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${wa}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&q(n)||oe||!J0(e))return;if(yt){yt=!1;return}let r=at();if(!r)return;let o=La(r);o&&(Sa(t),Ta(o))}function Q0(t){if(!zt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Yi)&&!e.querySelector(Yt)||oe)return;if(We){We=!1;return}if(yt){yt=!1;return}let n=at()??e.querySelector(Yt);if(!n)return;let r=La(n);r&&(Sa(t),Ta(r))}var Jf=w({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Pf,cleanupSelectors:[`#${wa}`],settings:Bl,start(){zt=!0;let t=Bl.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),jt=ge(),P="",oe=!1,yt=!1,We=!1,B=null,U=!z()&&!pn()&&(W()||Ea()),G=!1,ft=!1,N=null,st=null,clearTimeout(wn),wn=void 0,k(Pf,Nf),yo?.abort(),yo=new AbortController;let{signal:e}=yo,n={capture:!0,signal:e};window.addEventListener("keydown",X0,n),document.addEventListener("beforeinput",Z0,n),document.addEventListener("pointerdown",Ff,n),document.addEventListener("click",Ff,n),document.addEventListener("submit",Q0,n),ya?.(),ya=ut({onFall(r){if(zt){if(r.userStopped||r.error){U=!1,G=!1,ft=!1,P="",lt();return}if(!(G&&!ft)){if(G&&ft){if(!wo())return;G=!1,ft=!1,U=!1,P=r.contextKey,vo(r.contextKey);return}if(!wo()){Ue.debug("unsettled fall; keep queue window");return}U=!1,P=r.contextKey,vo(r.contextKey)}}},onRise(){z()||pn()||(G&&(ft=!0),U=!0)},onContext(r,o){o&&r&&!V(o,r)&&(U=!1,G=!1,ft=!1,P="",oe=!1,je!==void 0&&(clearTimeout(je),je=void 0)),Df(r),jt=r,lt()},onTick(r){Df(r.contextKey),jt=r.contextKey,Y0(),(z()||pn())&&(G=!1,ft=!1,U=!1,P=""),G&&(W()||Ea())&&(ft=!0),G&&ft&&wo()&&(G=!1,ft=!1,U=!1,Y(r.contextKey).length&&(P=r.contextKey,vo(r.contextKey))),!G&&U&&wo()&&(U=!1,!P&&Y(r.contextKey).length&&(P=r.contextKey,vo(r.contextKey))),!G&&P&&P===r.contextKey&&vo(P),Y(r.contextKey).length&&!Ke?.isConnected?lt():Ke&&Dl(Ke)}}),lt(),Ue.debug("watch started")},stop(){zt=!1,ya?.(),ya=null,yo?.abort(),yo=null,clearTimeout(je),je=void 0,clearTimeout(So),So=void 0,clearTimeout(wn),wn=void 0,st=null,ze.clear(),B=null,P="",oe=!1,yt=!1,We=!1,U=!1,G=!1,ft=!1,_l()}});var Qf=`.bloom-cls {
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
`;var nm=new C("ChatListStatus"),tm="chatListStatus",Ma="bloom-cls",ey="bloom-cls",ny=1200*1e3,ry="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Gt=new Map,ie=!1,kt="",be=!1,fr=!1,Ct=0,Ve=null,jl=null,ur=null,$l=null,ka=null,To=null,dr=!1,Ye=new Set;function Ca(){return Date.now()}function rm(){return qu()||document.querySelector("nav")||null}function he(t,e,n,r=!0){if(!(!t||!ie)){if(e==="idle")Gt.delete(t);else{let o=Gt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ca():Gt.set(t,{kind:e,at:Ca(),source:n})}r&&oy({v:1,id:t,kind:e,at:Ca()}),Tn()}}function oy(t){try{ur?.postMessage(t)}catch{}}function iy(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||he(e.id,e.kind,"bc",!1)}function ay(){let t=Ca();for(let[e,n]of Gt)n.kind==="streaming"&&t-n.at>ny&&Gt.delete(e)}function sy(){let t=rm();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll(Nu)){if(r.closest(ry))continue;let o=de(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function em(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Fl(t){let e=t.querySelector(`:scope > .${Ma}`);return e||null}function zl(){if(!ie)return;ay();let t=R(),e=sy();Ve?.disconnect();try{for(let n of e){let r=de(n.getAttribute("href")||"");if(!r||!t||r!==t){Fl(n)?.remove();continue}let i=Gt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Fl(n)?.remove();continue}let a=Fl(n);a||(a=document.createElement("span"),a.className=Ma,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(em("streaming")):i==="error"&&a.appendChild(em("error")))}}catch(n){nm.debug("paint failed",n)}om()}function Tn(){if(ie){if(document.hidden){Ct&&(cancelAnimationFrame(Ct),Ct=0),zl();return}Ct||(Ct=requestAnimationFrame(()=>{Ct=0,ie&&zl()}))}}function om(){let t=rm();if(!(Ve&&jl===t&&t?.isConnected)){if(Ve?.disconnect(),jl=t,!t){Ve=null;return}Ve=new MutationObserver(()=>Tn()),Ve.observe(t,{childList:!0,subtree:!0})}}function Aa(){return!!(cn()||ro())}function ly(t){return!!(dr||t&&Ye.has(t)||!fr&&!z()&&Aa())}function cy(t){if(ie){if(t.type==="post-start"){fr=!1,t.conversationId?(dr=!1,Ye.add(t.conversationId),be=!0,he(t.conversationId,"streaming","net")):(dr=!0,be=!0);return}if(t.type==="post-end"){if(dr=!1,t.conversationId){Ye.delete(t.conversationId);let e=R(),n=Xn();(e?t.conversationId===e:t.conversationId===n)?he(t.conversationId,t.error?"error":"done","net"):he(t.conversationId,"idle","net")}Aa()||(be=!1)}}}function uy(t,e){if(!ie)return;if(V(e,t)){Tn();return}let n=R();if(kt&&kt!==n){Ye.delete(kt);let r=Gt.get(kt);r&&r.kind!=="idle"&&he(kt,"idle","local")}dr=!1,be=!1,fr=!0,n&&Gt.get(n)?.kind==="streaming"&&Gt.get(n)?.source==="local"&&!Ye.has(n)&&he(n,"idle","local"),Tn()}function dy(t){if(!ie)return;let e=t.conversationId||R();if(kt&&e&&kt!==e){Ye.delete(kt);let r=Gt.get(kt);r&&r.kind!=="idle"&&he(kt,"idle","local"),be=!!(e&&Ye.has(e))}if(e&&(kt=e),fr||z()){if(z()||Aa()||t.streaming){Tn();return}fr=!1}if(ly(e)&&(t.streaming||Aa())){be=!0,e&&he(e,"streaming","local"),Tn();return}be&&(be=!1,e&&he(e,Qt()?"error":"done","local")),Tn()}var im=w({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ma}`],start(){ie=!0,k(tm,Qf);try{ur=new BroadcastChannel(ey)}catch{ur=null}ur?.addEventListener("message",iy),$l=Et(cy),ka?.(),ka=ut({onTick:dy,onContext:uy}),To?.abort(),To=new AbortController,document.addEventListener("visibilitychange",()=>{ie&&(Ct&&(cancelAnimationFrame(Ct),Ct=0),zl())},{signal:To.signal}),om(),nm.debug("sidebar status watch started")},stop(){ie=!1,Ct&&cancelAnimationFrame(Ct),Ct=0,To?.abort(),To=null,Ve?.disconnect(),Ve=null,jl=null,ka?.(),ka=null,$l?.(),$l=null;try{ur?.close()}catch{}ur=null,Gt.clear(),Ye.clear(),dr=!1,be=!1,fr=!1,kt="",document.querySelectorAll(`.${Ma}`).forEach(t=>t.remove()),L(tm)}});var sm="widerChat",lm=40,cm=96,um=64,dm=M({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:lm,max:cm,default:um}});function fy(){return ot(Number(dm.store.width??um),lm,cm)}function am(){let t=fy(),e=`min(100%,${t}rem)`;k(sm,`:root,#thread,#thread-bottom-container,#thread-bottom,[data-chatgpt-conversation-selection-target],[data-testid="desktop-app-shell"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var fm=w({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:dm,start:am,onSettingsChange:am,stop(){L(sm)}});var Gl="composerOpacity",mr='form[data-type="unified-composer"],form.w-full[data-type]',my=[`${mr} [class*="corner-superellipse"]`,`${mr} [class*="bg-token-bg-primary"]`,`${mr} [class*="bg-token-main-surface"]`,'form [class*="corner-superellipse"]','#thread-bottom-container [class*="corner-superellipse"]','#thread-bottom [class*="corner-superellipse"]'].join(","),py=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),gy="#thread-bottom-container,#thread-bottom",by=`${mr} #prompt-textarea,${mr} [contenteditable="true"],#mobile-composer-prompt,textarea[name="prompt"]`,hy="var(--bg-primary,var(--main-surface-primary,#ffffff))",Ul=M({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function yy(){return ot(Number(Ul.store.opacity??100),0,100)}function vy(){return ot(Number(Ul.store.blur??16),0,40)}function mm(){let t=yy();if(t>=100){L(Gl);return}let e=vy(),n=`color-mix(in srgb,${hy} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(Gl,`${gy}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${py}{display:none!important}${mr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${my}{background-color:${n}!important;background-image:none!important;${r}}${by}{background-color:transparent!important;background-image:none!important}`)}var pm=w({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ul,start:mm,onSettingsChange:mm,stop(){L(Gl)}});var gm=`#bloom-bn-host {
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
`;var Ey=new C("BetterNavigator"),Kl="betterNavigator",Em="bloom-bn-host",Mn=60,bm=16,Xl=1e3,hm=2400,wy=80,wm=2.5,Sy=.4,Lo="\u6B63\u5728\u8F93\u51FA\u2026",Zl="Image",Ty="\u2753",Ly="\u{1F916}",ym=/file_[0-9a-f]+/gi,ky="File",Cy="Code",My=".markdown, .whitespace-pre-wrap",rc=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Ay="img, picture, video, canvas",Hy=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,Iy=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Po=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,Ry=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Ny=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Py=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,Oy=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,By=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,Dy=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,_y=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),qy=2e3,$y=40,Fy=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,Sm=Ou,jy=["#thread-bottom-container","#thread-bottom","#prompt-textarea","#mobile-composer-prompt","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']",'textarea[name="prompt"]'].join(", "),zy=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),Gy=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),gr=M({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),ve=new Map,Ho=new Map,ae=new Set,Ra=0,Ht=!1,xe=!1,pr=!1,Xe=null,Oo=null,br=null,Na=null,F=[],Cn="",Pa=0,Io=-1,Ro=0,Oa="",At=0,ye=0,ko,Co=null,Ha=null,Wl=null,Vl=null,Ln=null,Jl=null,Mo=null,kn=null,Ee=null,Ao=null,Ba=!1,Ql=0;function hr(){return ki()}function Yl(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function Uy(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function Ky(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-'], [data-chatgpt-search-message-ids]"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Fy.test(Uy(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Yl(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Yl(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Yl(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function No(t){try{return!!t.closest(jy)}catch{return!0}}function vm(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function qa(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||Ci(t)||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function oc(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function Wy(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Ia(t,e){if(t){ym.lastIndex=0;for(let n of t.matchAll(ym))e.add(n[0].toLowerCase())}}function Vy(t){try{let e=new Set,n=s=>{Wy(s)||(Ia(s.getAttribute("src")||"",e),Ia(s.getAttribute("srcset")||"",e),Ia(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Ia(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=qa(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function Yy(t,e){let n=Vy(t),r=Ho.get(e)??0,o=Math.max(r,n);return o>0&&Ho.set(e,o),o>=2?`${Zl} x${o}`:Zl}function X(t){return t.replace(/\s+/g," ").trim()}function Tm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(zy))return!0;n=n.parentElement}return!1}function Da(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(Tm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(rc);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return X(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Mn+20;)e.push(X(r.textContent||""));return X(e.join(" "))}function Bo(t){let e=X(t);return e.length<3||e.length>180||Po.test(e)?!1:Hy.test(e)?!0:Iy.test(e)}function $a(t){let e=X(t);return e.length<8||e.length>120||/\s/.test(e)||Po.test(e)||Bo(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function Xy(t){let e=[],n=i=>{let a=X(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(X(s[1])),e.push(X(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function Zy(t){try{return No(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function ic(t){let e=X(t);return!e||ac(e)||$a(e)?!0:Bo(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function Jy(t){return!t.length||t.length>4||!t.every(e=>ic(e))?!1:t.some(e=>Po.test(X(e))||Bo(e)||$a(e))}function Lm(t){try{let e=null,n=0,r=`${rc}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(Zy(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=Xy(o);if(!i.length||i.length>4||i.join(" ").length>240||!Jy(i))continue;let a=i.some(c=>Po.test(X(c))),s=i.some(c=>Bo(c)||$a(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function Qy(t){return Lm(t)?ky:""}function tv(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(Ry.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function ev(t){try{for(let e of t.querySelectorAll(Ay))if(!tv(e))return!0}catch{}return!1}function ac(t){let e=X(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||Oy.test(e)||Py.test(e)?!0:e.length<=24&&(By.test(e)||Po.test(e))}function nv(t){let e=[],n=new Set,r=o=>{try{if(Tm(o,t)||o.closest(rc))return}catch{return}let i=Da(o);!i||n.has(i)||ac(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>Mn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Da(o).length<24)&&(r(o),e.join(" ").length>Mn+20))break}}catch{}return X(e.join(" "))}function rv(t){let e=Lm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=X(i.innerText||i.textContent||"");!a||a.length>Mn+20||r.has(a)||ic(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return X(n.join(" "))}function ov(t,e){let n=[];try{for(let o of t.querySelectorAll(My)){if(No(o))continue;let i=Da(o);if(!(!i||e==="assistant"&&ac(i)||ic(i))&&(n.push(i),n.join(" ").length>Mn+20))break}}catch{}let r=X(n.join(" "));if(e==="user"){let o=rv(t);if(o)return o}return r||(e==="assistant"?nv(t):"")}function iv(t){return t.length>Mn?`${t.slice(0,Mn).trimEnd()}\u2026`:t}function xm(t){return Dy.test(t)}function av(t,e,n,r){let o=ov(t,e);if(o)return iv(o);if(r)return Lo;let i=Qy(t);if(i)return i;if(oc(t))return Yy(t,qa(t));try{if(ev(t))return Zl;if(t.querySelector("pre, code"))return Cy}catch{}return`Message ${n+1}`}function sv(){if(xe)return!0;let t=R();return!!(t&&ae.has(t)||!pr&&!z()&&Do())}function Do(){return!!(cn()||ro())}function lv(){Ra=Date.now()}function km(t){xe=!1,t&&ae.delete(t);let e=R();e&&ae.delete(e)}function cv(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function uv(t){if(oc(t)||!Do())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Da(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function sc(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=X(e.textContent||"");if(!(n.length>32)&&Ny.test(n))return!0}}catch{}return!1}function Cm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function dv(t,e){try{if(cv(t))return!0;if(!e)return!1;if(uv(t)||sc(t))return!0}catch{}return!1}function Mm(t){if(!t||Do())return!1;try{if(sc(t)||Cm(t))return!1;if(t.querySelector(_y)||oc(t))return!0}catch{}return!1}function fv(t){if(Do()||Ra&&Date.now()-Ra<qy)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!Mm(e.el)||km()}function mv(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(Sm)){if(No(r))continue;let i=qa(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(No(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function pv(t){return Ps(t)}function gv(t){let e=gr.store.showAssistant!==!1,n=e&&sv(),r=mv(t),o=null;if(e)for(let a of r)vm(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=qa(a);if(!s)continue;let l=vm(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&sc(a),d=c&&Cm(a),f=l==="assistant"&&c&&!Mm(a)&&(u||d||n||dv(a,!0)),m=av(a,l,i.length,f);if(m&&m!==Lo){let b=ve.get(s),g=!!b&&(Bo(b)||$a(b));(!b||g||!xm(m)||xm(b))&&m!==b&&ve.set(s,m)}let p=f&&m===Lo?Lo:ve.get(s)||m;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return i}function bv(t){let e=new Map;for(let n of t)if(e.set(n.id,n),!!n.el)for(let r of pv(n.el))e.set(r,n);return e}function hv(t,e){if(e)return e.text&&e.text!==Lo&&ve.set(t.id,e.text),{...e,id:t.id};let n=ve.get(t.id)||(t.alias?ve.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message"}}function yv(t,e){let n=gr.store.showAssistant!==!1,r=bv(e),o=new Set,i=[];for(let s of t){if(s.role==="assistant"&&!n)continue;let l=r.get(s.id)||(s.alias?r.get(s.alias):void 0),c=hv(s,l);c.el&&o.add(c.el),i.push(c)}for(let s=0;s<e.length;s++){let l=e[s];if(!l.el||o.has(l.el))continue;let c=i.length;for(let u=s-1;u>=0;u--){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f+1;break}}if(c===i.length)for(let u=s+1;u<e.length;u++){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f;break}}i.splice(c,0,l),o.add(l.el)}let a=-1;for(let s=0;s<i.length;s++)i[s].role==="assistant"&&(a=s);for(let s=0;s<i.length;s++)i[s].live&&s!==a&&(i[s].live=!1);return i}function vv(){let t=hr();if(!t||t===document.body)return[];let e=gv(t),n=R(),r=n?qr(n):[],o=r.length?yv(r,e):e;return fv(o),o}function Am(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Fa(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function lc(t){return t===window?window.innerHeight:t.clientHeight}function xv(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(Gy)}catch{return!1}}function Hm(){ko!==void 0&&(clearTimeout(ko),ko=void 0),Co?.classList.remove("bloom-bn-flash"),Co=null}function Im(t){Hm(),t.classList.add("bloom-bn-flash"),Co=t,ko=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Co===t&&(Co=null),ko=void 0},800)}function _a(t){if(!F.length)return;let e=Math.max(0,Math.min(t,F.length-1));Pa=e,Oo?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),br?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),Na&&(Na.textContent=`${e+1} / ${F.length}`)}function Rm(t){if(Ba)return;let e=br?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function tc(t){let e=F[t];if(!e)return;let n=e.el?.isConnected?e.el:Nm(e.id);if(!n){Sv(t);return}e.el=n,Io=t,Ro=Date.now()+Xl,_a(t),Rm(t);let r=Ee??Fa(n),i=Math.abs(n.getBoundingClientRect().top-Am())>wm*lc(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),gr.store.jumpEffect!=="none"&&Im(n)}function Nm(t){let e=hr();if(!e||e===document.body||!t)return null;let n=[t],r=R(),i=(r?qr(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"], [data-chatgpt-search-message-ids~="${c}"]`)}catch{}if(!s||No(s))continue;let l=s.closest(Sm);return l instanceof HTMLElement?l:s}return null}function cc(){if(Ee)return Ee;let t=hr();return t?Fa(t):window}function Ev(t){let e=cc(),n=lc(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function wv(t,e){let n=cc();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function Sv(t){let e=++Ql,n=F[t];if(!n)return;Io=t,Ro=Date.now()+hm+Xl,_a(t),Rm(t);let r=-1;for(let l=0;l<F.length;l++)F[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+hm,a=0,s=-1;for(;Date.now()<i;){if(e!==Ql||!Ht)return;let l=Nm(n.id);if(l){n.el=l,Ro=Date.now()+Xl;let d=Ee??Fa(l),m=Math.abs(l.getBoundingClientRect().top-Am())>wm*lc(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),gr.store.jumpEffect!=="none"&&Im(l),Mt();return}let c=cc(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&wv(o,u))break;Ev(o),await new Promise(d=>setTimeout(d,wy))}}function uc(){if(!Ht||!F.length)return;if(Date.now()<Ro&&Io>=0){_a(Io);return}let t=window.innerHeight*Sy,e=0;for(let n=0;n<F.length;n++){let r=F[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}_a(e)}function Tv(t){let e=Fa(t);if(Ee===e&&Ao)return;Ao?.(),Ee=e;let n=e===window?document:e,r=()=>{uc(),dc()};n.addEventListener("scroll",r,{passive:!0}),Ao=()=>n.removeEventListener("scroll",r)}function Lv(t){kn?.disconnect(),kn=null;let e=Ee instanceof HTMLElement?Ee:null;kn=new IntersectionObserver(()=>uc(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&kn.observe(n.el)}function kv(){if(!document.body)return null;let t=Xe;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Em,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{Ba=!0}),n.addEventListener("pointerleave",()=>{Ba=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Xe=t,Oo=e,br=i,Na=o,t}function Pm(){let t=Xe,e=hr();if(!t||!e||!e.isConnected||F.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=Ky(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||$y,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function dc(){!Ht||ye||(ye=requestAnimationFrame(()=>{ye=0,Ht&&Pm()}))}function Cv(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Mv(t){let e=Oo,n=br;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>bm),e.classList.toggle("bloom-bn-fit",t.length>bm),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Cv(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),tc(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?Ty:Ly;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),tc(o)}),n.appendChild(a)}))}function Av(t){Oo?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=br?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Hv(){let t=R();return t===Oa?!1:(Oa=t,ve.clear(),Ho.clear(),F=[],Cn="",Pa=0,Io=-1,Ro=0,xe&&t&&(ae.add(t),xe=!1),!0)}function Iv(t){let e=gr.store.showAssistant!==!1?"1":"0";return`${Oa}|${e}|${t.map(n=>n.id).join(",")}`}function ec(){if(!Ht)return;Hv();let t=vv(),e=hr();if(!e||t.length<1){F=t,Cn="",Xe&&(Xe.hidden=!0),kn?.disconnect(),nc();return}kv();let n=Iv(t);n!==Cn?(F=t,Cn=n,Mv(t),Tv(e),Lv(t)):(F=t,Av(t)),Pm(),uc(),nc()}function Mt(){if(Ht){if(document.hidden){At&&(cancelAnimationFrame(At),At=0),ec();return}At||(At=requestAnimationFrame(()=>{At=0,Ht&&ec()}))}}function nc(){let t=hr();if(!(Ln&&Jl===t&&t?.isConnected)){if(Ln?.disconnect(),Mo?.disconnect(),Jl=t,!t||t===document.body){Ln=null;return}Ln=new MutationObserver(()=>Mt()),Ln.observe(t,{childList:!0,subtree:!0}),Mo=new ResizeObserver(()=>dc()),Mo.observe(t)}}function Rv(t){if(Ht){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===R())&&Mt();return}if(t.type==="post-start"){lv(),pr=!1,t.conversationId?(xe=!1,ae.add(t.conversationId)):xe=!0,Mt();return}if(t.type==="post-end"){if(xe=!1,t.conversationId)ae.delete(t.conversationId);else{let e=R();e&&ae.delete(e)}Mt()}}}function Nv(t){if(!Ht||!F.length||Xe?.hidden||t.altKey||t.ctrlKey||t.metaKey||xv(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Pa+1;else if(t.key==="ArrowUp")e=Pa-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=F.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),tc(Math.max(0,Math.min(e,F.length-1)))}function Pv(){Ql++,Hm(),kn?.disconnect(),kn=null,Ln?.disconnect(),Ln=null,Jl=null,Mo?.disconnect(),Mo=null,Ao?.(),Ao=null,Ee=null,Ba=!1,Xe?.remove(),Xe=null,Oo=null,br=null,Na=null}var Om=w({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Kl,cleanupSelectors:[`#${Em}`],settings:gr,start(){Ht=!0,Oa=R(),k(Kl,gm),Ha=new AbortController;let{signal:t}=Ha;window.addEventListener("keydown",Nv,{signal:t}),window.addEventListener("popstate",Mt,{signal:t}),window.visualViewport?.addEventListener("resize",dc,{signal:t}),document.addEventListener("visibilitychange",()=>{Ht&&(At&&(cancelAnimationFrame(At),At=0),ye&&(cancelAnimationFrame(ye),ye=0),ec())},{signal:t}),Vl=Et(Rv),Wl=ut({onTick(){if(z()){Mt();return}pr&&!Do()&&(pr=!1),Mt()},onFall(e){km(e.conversationId),Mt()},onContext(e,n){if(!V(n,e)){ve.clear(),Ho.clear(),Cn="",xe=!1;let r=R();for(let o of[...ae])o!==r&&ae.delete(o);pr=!0}Mt()}}),nc(),Mt(),Ey.debug("navigator started")},stop(){Ht=!1,At&&cancelAnimationFrame(At),At=0,ye&&cancelAnimationFrame(ye),ye=0,Ha?.abort(),Ha=null,Wl?.(),Wl=null,Vl?.(),Vl=null,ae.clear(),xe=!1,pr=!1,Ra=0,Pv(),ve.clear(),Ho.clear(),F=[],Cn="",L(Kl)},onSettingsChange(){Cn="",Mt()}});var Bm=`.bloom-ts {
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
`;function Dm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function _m(t){try{return new Date(t).toISOString()}catch{return""}}var Fm=new C("MessageTimestamps"),qm="messageTimestamps",za="bloom-ts",$m=1500,Bv="#thread-bottom-container, #thread-bottom, #prompt-textarea, #mobile-composer-prompt, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer'], textarea[name='prompt']",yr=M({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),vr=new Map,In=!1,It=0,Ze=null,mc=null,fc=null,ja=null,_o=null,qo=!1,An=!1;function jm(){return ki()}function gc(){let t=yr.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function zm(){let t={...gc()};for(let[n,r]of vr)t[n]=r;let e=Object.keys(t);if(e.length>$m){let n=e.slice(e.length-$m),r={};for(let o of n)r[o]=t[o];yr.store.stamps=r;return}yr.store.stamps=t}var Dv=Jc(zm,500);function Gm(t,e){!t||!e||vr.get(t)===e||(vr.set(t,e),Dv(),Hn())}function _v(t){return t?vr.get(t)??gc()[t]??hi(t)??null:null}function qv(t){In&&t.type==="message-time"&&Gm(t.messageId,t.createTime)}function $v(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Fv(){let t=jm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll(Bu))n.closest(Bv)||e.push(n)}catch{}return e}function jv(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function pc(){if(!In)return;let t=yr.store.hideOwnMessages===!0,e=yr.store.showDate!==!1,n=W();An&&!z()&&(An=!1),An&&(n?qo=!1:An=!1);let r=An?!1:n,o=Fv();Ze?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||Ci(i),l=$v(i),c=i.querySelector(`:scope > .${za}`);if(t&&l==="user"){c?.remove();return}if(jv(i)){c?.remove();return}let u=_v(s);if(!u&&s&&(r||qo)&&a>=o.length-2&&(u=Date.now(),Gm(s,u)),!u){c?.remove();return}let d=Dm(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=za,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=_m(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){Fm.debug("paint failed",i)}qo=r,Um()}function Hn(){if(In){if(document.hidden){It&&(cancelAnimationFrame(It),It=0),pc();return}It||(It=requestAnimationFrame(()=>{It=0,In&&pc()}))}}function Um(){let t=jm();if(!(Ze&&mc===t&&t?.isConnected)){if(Ze?.disconnect(),mc=t,!t||t===document.body){Ze=null;return}Ze=new MutationObserver(()=>Hn()),Ze.observe(t,{childList:!0,subtree:!0})}}var Km=w({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${za}`],settings:yr,start(){In=!0,k(qm,Bm);let t=gc();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&vr.set(e,n);fc=Et(qv),ja?.(),ja=ut({onTick:Hn,onFall:Hn,onContext(e,n){V(n,e)||(An=!0,qo=!1),Hn()}}),_o?.abort(),_o=new AbortController,document.addEventListener("visibilitychange",()=>{In&&(It&&(cancelAnimationFrame(It),It=0),pc())},{signal:_o.signal}),Um(),Hn(),Fm.debug("timestamp watch started")},stop(){In=!1,It&&cancelAnimationFrame(It),It=0,_o?.abort(),_o=null,Ze?.disconnect(),Ze=null,mc=null,ja?.(),ja=null,fc?.(),fc=null,An=!1,qo=!1,zm(),vr.clear(),document.querySelectorAll(`.${za}`).forEach(t=>t.remove()),L(qm)},onSettingsChange:Hn});var bc="streamerMode",zv="filter:blur(6px)!important;transition:filter .2s ease",Gv="filter:none!important",xr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','[data-app-navigation-rail] button[aria-haspopup="menu"]',"[data-bloom-profile-chip]"],Er=["#stage-slideover-sidebar","#stage-popover-sidebar","nav","#stage-sidebar-tiny-bar","[data-app-navigation-rail]","[data-app-action-sidebar-scroll]"];function Rt(t,e){return t.map(n=>`${n} ${e}`)}var Rn=M({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function wr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${zv}}${e?`${r}{${Gv}}`:""}`}function Wm(){let t=[];if(Rn.store.conversations!==!1&&(t.push(wr([...Rt(Er,'a[href^="/c/"]'),...Rt(Er,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Rn.store.projects!==!1&&(t.push(wr([...Rt(Er,'a[href*="/project"]'),...Rt(Er,'a[href*="/g/g-p-"]'),...Rt(Er,'[data-testid="project-name"]'),...Rt(Er,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Rn.store.headerTitle!==!1&&t.push(wr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Rn.store.accountAvatar!==!1&&t.push(wr([...Rt(xr,"img"),...Rt(xr,'[class*="avatar"]'),...Rt(xr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Rn.store.accountName!==!1&&t.push(wr([...Rt(xr,".min-w-0 > .truncate"),...Rt(xr,".min-w-0.flex-1 .truncate")],!1)),Rn.store.accountEmail!==!1&&t.push(wr([...Rt(xr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *,textarea[name="prompt"],#mobile-composer-prompt{filter:none!important}'),!t.length){L(bc);return}k(bc,t.join(`
`))}var Vm=w({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Rn,start:Wm,onSettingsChange:Wm,stop(){L(bc)}});var Ym=`.bloom-gc-panel {
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
}`;var Kv=new C("GreetingCustomizer"),Sr="greetingCustomizer",Xm="greetingCustomizerUi",$o=100,yc=30,Wv=120,Vv=1e3,Yv=50,Xv=40,Zv=["#page-header","nav","#stage-slideover-sidebar","#stage-popover-sidebar","#stage-sidebar-tiny-bar","[data-app-navigation-rail]","[data-app-action-sidebar-scroll]","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]','textarea[name="prompt"]',"#mobile-composer-prompt"].join(", "),Fo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Va=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Jv(t){return!!t?.closest(Zv)}function tp(t){return!!(Jv(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Vo(t){try{for(let e of document.querySelectorAll(t))if(!tp(e))return e}catch{}return null}function hc(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Vo(e))return e;return t}var ep=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],nt=M({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:px},greetings:{type:0,description:"Greeting texts",hidden:!0,default:ep},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),se=!1,kr=!1,Pn=null,Ua,jo,Tr,zo,Ka=0,Ga=null,Lr=null,Go=null,Uo=null,Ko=null,Wa=null;function Se(){let t=location.pathname||"/";return t==="/"||t===""}function Nn(){let t=nt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):ep.slice()}function Wo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Zm(t){nt.store.greetings=t.slice(0,yc)}function Yo(){let t=String(nt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Qv(){return nt.store.order==="random"?"random":"sequential"}function tx(){return ot(Number(nt.store.intervalSec??10),1,3600)*1e3}function ex(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function nx(){return!!Vo(Va)}function Ya(){return!!(Vo(Va)||Vo(Fo))}function rx(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=nx()?hc(Va):Vo(Fo)?hc(Fo):hc(Va),i=e?`${Fo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function ox(t,e){if(t<=0)return 0;if(t===1)return Number(nt.plain.index)!==0&&(nt.store.index=0),Number(nt.plain.lastRandom)!==0&&(nt.store.lastRandom=0),0;let n=Number(nt.plain.index),r=Number(nt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Qv()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return nt.store.index=s,nt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return nt.store.index=i,i}function we(t){if(!se)return;if(!Se()){L(Sr);return}let e=Nn().map(Wo).filter(Boolean);if(!e.length){L(Sr);return}let n=ox(e.length,t),r=e[n]??e[0],o=Yo()==="manual"&&e.length>1;k(Sr,rx(ex(r),o)),Wa?.()}function vc(){Ua!==void 0&&(clearInterval(Ua),Ua=void 0)}function xc(){vc(),!(!se||!Se())&&Yo()==="interval"&&(Nn().filter(Boolean).length<=1||(Ua=setInterval(()=>we(!0),tx())))}function Ec(){zo!==void 0&&(clearTimeout(zo),zo=void 0),Ka=0}function Jm(){if(Ec(),!se||!Se())return;Ka=Xv;let t=()=>{if(zo=void 0,!(!se||!Se())){if(Ya()){Yo()==="refresh"&&!kr?(kr=!0,we(!0)):we(!1),xc();return}Ka-=1,Ka>0&&(zo=setTimeout(t,Yv))}};t()}function wc(){if(Pn===!0){Ya()?we(!1):Jm();return}Pn=!0,kr=!1,Yo()==="refresh"?(kr=!0,we(!0)):we(!1),xc(),Ya()||Jm()}function Sc(){Pn=!1,kr=!1,vc(),Ec(),L(Sr)}function Xa(){Tr===void 0&&(Tr=window.setTimeout(()=>{Tr=void 0,se&&(Se()?wc():Pn!==!1&&Sc())},Wv))}function ix(){Lr||(Lr=history.pushState.bind(history),Go=history.replaceState.bind(history),Uo=function(...e){let n=Lr(...e);return Xa(),n},Ko=function(...e){let n=Go(...e);return Xa(),n},history.pushState=Uo,history.replaceState=Ko)}function ax(){Uo&&history.pushState===Uo&&Lr&&(history.pushState=Lr),Ko&&history.replaceState===Ko&&Go&&(history.replaceState=Go),Lr=null,Go=null,Uo=null,Ko=null}function sx(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Xa)}function lx(t){if(!se||!Se()||Yo()!=="manual"||Nn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Fo);if(!n||tp(n))return;let r=window.getSelection?.();r&&String(r).trim()||we(!0)}function cx(){jo===void 0&&(jo=setInterval(()=>{if(!se)return;let t=Se();if(t!==(Pn===!0)){t?wc():Sc();return}t&&Ya()&&we(!1)},Vv))}function ux(){jo!==void 0&&(clearInterval(jo),jo=void 0)}function Qm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var dx="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",fx="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function mx(t,e){let n=Wo(t);return n?n.length>$o?`Keep it to ${$o} characters.`:Nn().length+(e?1:0)>yc?`At most ${yc} greetings.`:null:"Enter a greeting."}function px(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=Nn(),s=Number(nt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=$o,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let g=l.querySelector(".bloom-gc-count");g&&(g.textContent=`${Wo(e).length}/${$o}`);let E=l.querySelector(".bloom-gc-error");E&&(E.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Wo(e).length}/${$o}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let g=document.createElement("button");g.type="button",g.className="bloom-gc-btn",g.textContent="Cancel",g.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(g)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let g=n<0,E=mx(e,g);if(E){r=E,i();return}let h=Wo(e),x=Nn().slice();n>=0&&n<x.length?x[n]=h:x.push(h),Zm(x),n=-1,e="",r="",i()}),m.appendChild(p),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let g=document.createElement("p");g.className="bloom-gc-empty",g.textContent="No greetings. The official heading stays.",t.appendChild(g);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((g,E)=>{let h=document.createElement("div");h.className="bloom-gc-item",E===s&&(h.dataset.active="true");let x=document.createElement("button");x.type="button",x.className=`bloom-gc-body${o===E?"":" bloom-gc-clamp"}`,x.textContent=g,x.addEventListener("click",()=>{o=o===E?-1:E,i()});let mt=document.createElement("div");mt.className="bloom-gc-item-actions";let pt=Qm("Edit",dx);pt.addEventListener("click",()=>{n=E,e=g,r="",i()});let Z=Qm("Delete",fx);Z.addEventListener("click",()=>{let O=Nn().filter((ct,vt)=>vt!==E);Zm(O),n===E?(n=-1,e=""):n>E&&(n-=1),i()}),mt.append(pt,Z),h.append(x,mt),b.appendChild(h)}),t.appendChild(b)};return Wa=i,i(),()=>{Wa===i&&(Wa=null),t.replaceChildren()}}var np=w({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Xm,settings:nt,start(){se=!0,k(Xm,Ym),ix(),Ga=new AbortController;let{signal:t}=Ga;window.addEventListener("popstate",Xa,{signal:t}),document.addEventListener("click",sx,{capture:!0,signal:t}),document.addEventListener("click",lx,{signal:t}),cx(),Pn=null,Se()?wc():Sc(),Kv.debug("started")},stop(){se=!1,Ga?.abort(),Ga=null,Tr!==void 0&&(clearTimeout(Tr),Tr=void 0),vc(),Ec(),ux(),ax(),L(Sr),kr=!1,Pn=null},onSettingsChange(){se&&(Se()?(we(!1),xc()):L(Sr))}});function gx(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Za(t){try{return await createImageBitmap(t)}catch{return null}}async function bx(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Ja(t){if(t.startsWith("data:")){let e=gx(t);if(e){let n=await Za(e);if(n)return n}return bx(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Za(await e.blob()):null}catch{return null}}var ts="data-bloom-csi-slot",hx="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",yx=/\bsize-(?:[6-9]|10)\b/,vx=/\b(?:h|w)-(?:[6-9]|10)\b/,xx=/^(plus|pro|free|team|go|business|enterprise)$/i,Ex=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Qa(t){return t.getAttribute("class")||""}function op(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||yx.test(t)?!0:vx.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function wx(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!ip(e)}function ip(t){return xx.test(String(t??"").replace(/\s+/g,""))}function Nt(t){return!!t?.closest(hx)}function es(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Xo(t){let e=Qa(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:ip(t.textContent||"")}function ns(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Zo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function ap(t){if(Nt(t)||ns(t)||Zo(t)||Xo(t)||es(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function sp(t){return Nt(t)||ns(t)||Zo(t)||Xo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:wx(t.textContent||"")}function lp(t){return Nt(t)||Zo(t)||es(t)||Xo(t)?!1:op(Qa(t))||sp(t)?!0:ap(t)}function rp(t){return!(Nt(t)||es(t)||Zo(t)||Xo(t)||ns(t))}function On(t,e){let n=ns(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Zo(n)||es(n)||Xo(n));)Nt(n)||(r=n),n=n.parentElement;return r}function Sx(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Nt(e))continue;if(/\bflex\b/.test(Qa(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!rp(o))){if(lp(o)||op(Qa(o)))return On(o,t)??o;r.push(o)}if(r.length===1)return On(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&rp(r))return On(r,t)??r}}return null}function Tx(t){let e=t.querySelectorAll(Ex);for(let n of e)if(lp(n))return On(n,t)??n;return null}function Lx(t){for(let e of t.querySelectorAll("span, div, p, i"))if(sp(e))return On(e,t)??e;return null}function kx(t){for(let e of t.querySelectorAll("*"))if(ap(e))return On(e,t)??e;return null}function cp(t,e){if(Nt(t))return null;if(e&&!Nt(e)&&t.contains(e)){let n=On(e,t);if(n)return n}return Sx(t)??Tx(t)??Lx(t)??kx(t)}function up(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Cr="data-bloom-csi",rs="data-bloom-csi-orig",Bn=new Set,dp=null;function Lc(t){dp=t}function fp(t){return`url(${JSON.stringify(t)})`}function os(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function kc(t,e,n){let r=fp(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function mp(t,e=ts){let n=fp(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function Cx(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Mr(t){t.removeEventListener("error",Tc);let e=t.getAttribute(rs);t.removeAttribute(Cr),t.removeAttribute(rs),e&&t.getAttribute("src")!==e&&(t.src=e)}function Tc(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Bn.add(n),Mr(e),dp?.()}function pp(t,e){if(!e||Bn.has(e)){Mr(t);return}Cx(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Cr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(rs)&&t.setAttribute(rs,n);t.setAttribute(Cr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Tc),t.addEventListener("error",Tc),n!==e&&(t.src=e)}var gp=`/*
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
`;var bp=new C("CustomSidebarIdentity"),hp="customSidebarIdentityUi",xp="customSidebarIdentity",Ax="bloom-csi-face",Hx="bloom-csi-name",Ar=ts,Hc="data-bloom-profile-chip",Ix=1024,is=256,Ep=24,wp=64,Sp=40,Ic=1,Rc=4,Jo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]','[data-app-navigation-rail] button[aria-haspopup="menu"]',"[data-bloom-profile-chip]"],Cc=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=M({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Yx},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Ep,max:wp,default:Sp},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function _n(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Rx(){return String(T.store.displayName??"").trim()}function ls(t,e,n,r,o){let i=ot(n,Ic,Rc),a=Math.min(t,e)/i,s=ot(r,a/2,Math.max(a/2,t-a/2)),l=ot(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Nx(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Nc(t){let e=Math.min(1,Ix/Math.max(t.width,t.height));return Nx(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Px(t,e,n,r){let{side:o,x:i,y:a}=ls(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=is,s.height=is;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,is,is);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Ox(t){let e=await Za(t);if(!e)return null;let n=Nc(e);return e.close(),n}async function Oc(t,e,n,r){let o=await Ja(t);if(!o)return null;let i=Px(o,e,n,r);return o.close(),i}function Bc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function yp(){T.store.avatarUrl="",T.store.avatarSource="",Bc()}var vp=0;async function Pc(t){let e=++vp;Bc(),T.store.avatarSource=t;let n=await Oc(t,.5,.5,1);return e!==vp?!1:(n&&(T.store.avatarUrl=n),!!n)}function Qo(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Mc(t){let e=Qo(t);if(!e)return!1;let n=await Ox(e);return n?Pc(n):!1}var Pt=!1,Hr=!1,Ir=0,cs=0,as=null,Je=new Map,Rr=null,Te=null,us=null,le=null,ds=null;function fs(t){let e=String(t??"").trim();if(!e||Bn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function Tp(){return fs(T.store.avatarUrl)??fs(T.store.avatarSource)}var ss=!1,Ac=new Set;function Lp(){let t=fs(T.store.avatarSource);if(!t?.startsWith("data:image/")||fs(T.store.avatarUrl)?.startsWith("data:image/")||ss||Ac.has(t))return;ss=!0;let e=_n(T.store.cropX,.5),n=_n(T.store.cropY,.5),r=_n(T.store.cropZoom,1);Oc(t,e,n,r).then(o=>{if(ss=!1,!o){Ac.add(t);return}Pt&&(T.store.avatarUrl=o,ms())}).catch(()=>{ss=!1,Ac.add(t)})}function Dn(t,e){return t.map(n=>`${n} ${e}`)}function Bx(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Dx(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Bx(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function kp(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Nt(n)||n.closest(".min-w-0")||e.push(n);return e}function _x(t){let e=kp(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Dc(){let t=[],e=o=>{if(!o||Nt(o)||!o.isConnected)return;let i=rn(o);Nt(i)||t.includes(i)||t.push(i)};e(on());let n=Ae();if(n){let o=n.querySelector("button[aria-haspopup='menu'] .min-w-0, button[aria-haspopup='menu'] .truncate, button[aria-haspopup='menu'] img");e(o)}let r=Un();if(r&&!t.some(o=>r.contains(o)||o.contains(r))){let o=r.querySelector(Jo.join(","))??r.querySelector("button, a, [role='button']")??r;e(o)}return t}function Cp(t,e){t.setAttribute(Hc,"");let n=_x(t);if(n)pp(n,e);else for(let o of kp(t))Mr(o);let r=cp(t,n);for(let o of t.querySelectorAll(`[${Ar}]`))o!==r&&o.removeAttribute(Ar);r&&r.setAttribute(Ar,"")}function qx(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function $x(t,e){let n=qx(t);n&&Cp(n,e)}function Fx(){for(let t of document.querySelectorAll(`img[${Cr}]`))Mr(t);for(let t of document.querySelectorAll(`[${Ar}]`))t.removeAttribute(Ar);for(let t of document.querySelectorAll(`[${Hc}]`))t.removeAttribute(Hc)}function jx(){let t=ot(Math.round(_n(T.store.avatarSize,Sp)),Ep,wp),e=Tp(),n=Rx(),r=T.store.applyToMenu!==!1,o=[],i=[...Dn(Jo,"img"),"#stage-sidebar-tiny-bar img","[data-app-navigation-rail] img"];r&&i.push(...Dn(Cc,"> :first-child img"));let a=[...Dn(Jo,".min-w-0 > .truncate"),...Dn(Jo,".min-w-0.flex-1 .truncate")];r&&a.push(...Dn(Cc,"> :first-child .truncate"));let s=up(Ar);o.push(os([...s.flatMap(l=>Dn(Jo,l))].join(","),t)),o.push(os(s.map(l=>`#stage-sidebar-tiny-bar ${l}, [data-app-navigation-rail] ${l}`).join(","),32)),r&&o.push(os(s.flatMap(l=>Dn(Cc,`> :first-child ${l}`)).join(","),t)),e&&(o.push(kc(i.join(","),e,t)),o.push(kc("#stage-sidebar-tiny-bar img, [data-app-navigation-rail] img",e,32)),o.push(mp(e))),n&&o.push(Dx(a,n)),k(xp,o.join(""))}function zx(){let t=Tp(),e=Dc();for(let n of e)Cp(n,t);if(T.store.applyToMenu!==!1){let n=Kn();n&&$x(n,t)}for(let n of document.querySelectorAll(`img[${Cr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Mr(n)}function ms(){if(!(!Pt||Hr)){Hr=!0;for(let t of Je.values())t.disconnect();Te?.disconnect(),le?.disconnect();try{jx(),zx()}finally{Hr=!1,_c(),Wx(),Rr?.isConnected&&Mp(Rr),Lp()}}}function ti(){!Pt||Ir||(Ir=requestAnimationFrame(()=>{Ir=0,ms()}))}function Gx(){Hr||!Pt||ti()}function Ux(t){if(Je.has(t))return;let e=new MutationObserver(Gx);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Je.set(t,e)}function Kx(t){Je.get(t)?.disconnect(),Je.delete(t)}function _c(){let t=new Set;for(let n of Dc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Un();e&&t.add(e);for(let n of[...Je.keys()])(!t.has(n)||!n.isConnected)&&Kx(n);for(let n of t)n.isConnected&&Ux(n)}function Wx(){let t=Hi();if(!t){le?.disconnect(),le=null,us=null;return}if(us===t&&le){le.observe(t,{childList:!0});return}le?.disconnect(),us=t,le=new MutationObserver(()=>{Hr||!Pt||(_c(),ti())}),le.observe(t,{childList:!0})}function Mp(t){Rr===t&&Te||(Te?.disconnect(),Rr=t,Te=new MutationObserver(()=>{if(!t.isConnected){Te?.disconnect(),Te=null,Rr=null;return}Hr||!Pt||ti()}),Te.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Ap(t){if(!Pt||T.store.applyToMenu===!1)return;let e=Kn();if(e){Mp(e),ti();return}t<=0||requestAnimationFrame(()=>Ap(t-1))}function Hp(t){Pt&&(ms(),!(Dc().length||t<=0)&&(cs=requestAnimationFrame(()=>Hp(t-1))))}function Vx(t){Pt&&T.store.applyToMenu!==!1&&(!Ii(t)&&!Kn()||Ap(10))}function Yx(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,m.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let g=document.createElement("input");g.type="range",g.className="bloom-csi-zoom",g.min=String(Ic),g.max=String(Rc),g.step="0.05",g.setAttribute("aria-label","Zoom");let E=document.createElement("span");E.className="bloom-csi-zoom-val";let h=document.createElement("button");h.type="button",h.className="bloom-csi-btn",h.textContent="Reset",b.append(g,E,h);let x=document.createElement("p");x.className="bloom-csi-hint",x.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,b,x),t.append(u,d,f);function mt(){let v=String(T.store.avatarSource??""),I=String(T.store.avatarUrl??"");return v.startsWith("data:image/")?v:I.startsWith("data:image/")?I:""}function pt(v,I,y){if(!a)return i.x=v,i.y=I,i.zoom=ot(y,Ic,Rc),i;let A=ls(a.w,a.h,y,v*a.w,I*a.h);return i.x=A.x/a.w,i.y=A.y/a.h,i.zoom=A.z,i}function Z(){g.value=String(i.zoom),E.textContent=`${Math.round(i.zoom*100)}%`;let v=a?ls(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;v&&a&&(p.style.width=`${a.w/v.side*100}%`,p.style.height=`${a.h/v.side*100}%`,p.style.left=`${(.5-v.x/v.side)*100}%`,p.style.top=`${(.5-v.y/v.side)*100}%`)}function O(v=!1){let I=mt(),y=String(T.store.avatarUrl??"").trim(),A=!!I;s.hidden=!y&&!I,(I||y)&&(s.src=I||y),document.activeElement!==l&&(l.value=A?"":y),l.placeholder=A?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!I,d.hidden=!(e&&/^https?:\/\//.test(y)&&!I),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",I&&(v&&(i.x=_n(T.store.cropX,.5),i.y=_n(T.store.cropY,.5),i.zoom=_n(T.store.cropZoom,1)),p.getAttribute("src")!==I&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},pt(i.x,i.y,i.zoom),Z()},p.src=I),Z())}function ct(v,I,y,A=!1){pt(v,I,y),Z();let gt=mt(),xt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,gt&&Oc(gt,i.x,i.y,i.zoom).then(H=>{H&&(T.store.avatarUrl=H)})};r&&clearTimeout(r),A?xt():r=setTimeout(xt,80)}function vt(v){T.store.avatarUrl=v;let I=v.trim();if(n&&clearTimeout(n),!I){T.store.avatarSource="",Bc(),e=!1,O(!0);return}if(I.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Ja(I).then(y=>{if(!y)return;let A=Nc(y);y.close(),A&&Pc(A).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(I)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{Ja(I).then(y=>{if(!y){e=!0,O(!0);return}let A=Nc(y);y.close(),A?(e=!1,Pc(A).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",v=>{Qo(v.clipboardData)&&(v.preventDefault(),e=!1,Mc(v.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",v=>{Qo(v.dataTransfer)&&v.preventDefault()}),u.addEventListener("drop",v=>{Qo(v.dataTransfer)&&(v.preventDefault(),e=!1,Mc(v.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>vt(l.value)),l.addEventListener("paste",v=>{Qo(v.clipboardData)&&(v.preventDefault(),e=!1,Mc(v.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",v=>{mt()&&!l.value&&(v.key==="Backspace"||v.key==="Delete")&&(yp(),e=!1,O(!0))}),c.addEventListener("click",()=>{yp(),e=!1,O(!0)}),m.addEventListener("pointerdown",v=>{v.button===0&&(m.setPointerCapture(v.pointerId),o.on=!0,o.px=v.clientX,o.py=v.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",v=>{if(!o.on||!a)return;let I=m.clientWidth;if(!I)return;let{side:y}=ls(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);pt(o.x-(v.clientX-o.px)*(y/I)/a.w,o.y-(v.clientY-o.py)*(y/I)/a.h,i.zoom),Z()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,ct(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",v=>{v.preventDefault(),ct(i.x,i.y,i.zoom*(v.deltaY<0?1.08:1/1.08))},{passive:!1}),g.addEventListener("input",()=>ct(i.x,i.y,Number(g.value))),g.addEventListener("change",()=>ct(i.x,i.y,Number(g.value),!0)),h.addEventListener("click",()=>ct(.5,.5,1,!0));let ei=()=>O(!1);return ds=ei,O(!0),()=>{ds===ei&&(ds=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Ip=w({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:hp,cleanupSelectors:[`.${Ax}`,`.${Hx}`],settings:T,start(){Pt=!0,Bn.clear(),Lc(ti),k(hp,gp),as=new AbortController,document.addEventListener("click",Vx,{signal:as.signal}),Hp(40),Lp(),bp.debug("started")},onSettingsChange(){Bn.clear(),ds?.(),Pt&&(_c(),ms())},stop(){Pt=!1,as?.abort(),as=null,Ir&&cancelAnimationFrame(Ir),Ir=0,cs&&cancelAnimationFrame(cs),cs=0;for(let t of Je.values())t.disconnect();Je.clear(),Te?.disconnect(),Te=null,Rr=null,le?.disconnect(),le=null,us=null,Fx(),L(xp),Lc(null),Bn.clear(),bp.debug("stopped")}});var Nr=new C("Bloom"),Rp=!1,Xx=Date.now(),Zx=[ld,Ud,tf,rf,cf,pf,Cf,Af,Rf,Jf,im,fm,pm,Om,Km,Vm,np,Ip];function ps(t){return new Promise(e=>setTimeout(e,t))}function Jx(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function Qx(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Pp=8e3,Np=300,tE=250;async function eE(){if(nn())return await ps(Np),!0;for(;Date.now()-Xx<Pp;)if(await ps(tE),nn())return await ps(Np),!0;return nn()||Os()}function qc(){return Li()}async function nE(){if(qc())return!0;let t=Date.now()+Pp;for(;Date.now()<t;)if(await ps(100),qc())return!0;return qc()}function rE(){try{GM_registerMenuCommand?.("Bloom++ settings",sd)}catch{}}function oE(){vi(()=>{Or("HostShell"),Nr.info("host shell",wt)}),xi(()=>{Nr.info("idle ready",wt)}),Ei(()=>{hs(),Or("HostReady"),Nr.info("chrome ready",wt)})}async function $c(){await eu()}async function Fc(){if(Rp)return;Rp=!0,Su();for(let n of Zx)try{lu(n),Ru(n)}catch(r){Nr.error("register failed",n.name,r)}Or("Init"),rE(),oE();let t=()=>Or("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Jx(),hs(),Nr.info("styles ready",wt),await Qx(),nE().then(n=>{n&&wi()}),!await eE()){Nr.warn("late islands not detected; starting default plugins",wt),Gn(),Si();return}await Hu()}var Op=typeof unsafeWindow<"u"?unsafeWindow:window,iE=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||iE){let t=Op.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",wt);try{Object.defineProperty(Op,"Bloom",{value:jc,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}$c().then(()=>Fc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
