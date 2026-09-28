// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260928] v1.4.110
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

/* Bloom++ [20260928] v1.4.110. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ip=Object.defineProperty;var Rp=(t,e)=>{for(var n in e)Ip(t,n,{get:e[n],enumerable:!0})};var _c={};Rp(_c,{REPO_URL:()=>Cu,Settings:()=>j,VERSION:()=>wt,contextKeyFromUrl:()=>le,conversationChain:()=>Dr,conversationTitle:()=>Fn,conversationToken:()=>Pt,currentConversationId:()=>R,ensureConversationChain:()=>xu,hasDraftText:()=>Wt,hasErrorToast:()=>Xt,hasLateIslands:()=>tn,init:()=>Dc,initSettings:()=>Bc,isDocumentInteractive:()=>Bu,isStreaming:()=>W,isUserDraftEmpty:()=>Ie,messageCreateTime:()=>gi,plugins:()=>se,requestChromeReady:()=>Ei,requestIdleReady:()=>jn,requestShellReady:()=>xi,setEditorText:()=>fe,subscribeHarvest:()=>Et,watchStreamingEdge:()=>ut,whenChromeReady:()=>vi,whenIdleReady:()=>yi,whenShellReady:()=>hi});var Se=new Map,ti=!1;function Np(){return document.getElementById("bloom-root")?.shadowRoot??null}function $c(){return document.head??null}function Dn(){let t=Np();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Pp()}function ms(t,e){if(!ti)return;let n=$c();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Dn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Dn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Dn()}function k(t,e){let n=Se.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Se.set(t,n)),ti&&ms(t,n)}function ps(){if(!$c())return!1;ti=!0;for(let[e,n]of Se)ms(e,n);return Dn(),!0}function Fc(t){let e=Se.get(t);e&&(e.disabled=!1,ti&&ms(t,e))}function jc(t){let e=Se.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Dn())}function L(t){let e=Se.get(t);e&&(e.el?.remove(),Se.delete(t),Dn())}function Pp(){return Array.from(Se.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var C=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function w(t){return t}var gs=new Map;function _n(t,e){let n=gs.get(t);return n||(n=new Set,gs.set(t,n)),n.add(e),()=>n.delete(e)}function Xe(t,e){let n=gs.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Op="bloompp";function zc(){return new Promise((t,e)=>{let n=indexedDB.open(Op,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Gc(t){try{let e=await zc();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Uc(t,e){try{let n=await zc();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function rt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function ot(t,e,n){return Math.min(n,Math.max(e,t))}function Kc(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Wc(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Vc(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var ei=new C("SettingsStore"),Te="BloomSettings",Bp=100;function ni(t){return t!=null&&typeof t.then=="function"}function Dp(t){if(t==null||ni(t))return null;if(rt(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(rt(e)&&!ni(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return rt(n)&&!ni(n)?n:null}return null}catch{return null}}function oi(t){let e=Dp(t);if(!e)return null;let n=e.plugins;return!rt(n)||ni(n)||Object.keys(n).length===0?null:e}function hs(t){return rt(t)?t:null}function bs(t){return t==null||t===""?!0:Array.isArray(t)?t.length===0:rt(t)?Object.keys(t).length===0:!1}function _p(t){return bs(t)?0:Array.isArray(t)?12+Math.min(t.length,40):rt(t)?12+Math.min(Object.keys(t).length,40):3}function Ze(t){if(!t)return-1;let e=t.plugins;if(!rt(e))return-1;let n=0;for(let r of Object.values(e)){let o=hs(r);if(o)for(let[i,a]of Object.entries(o))i==="defaultsRev"||i==="enabled"||(n+=_p(a))}return n}function Yc(t){let e=t.plugins;if(!rt(e))return 0;let n=0;for(let r of Object.values(e))hs(r)?.enabled===!0&&n++;return n}function Xc(t){let e=t.map((i,a)=>({bag:i,index:a,score:Ze(i)})).filter(i=>i.bag!=null&&i.score>=0).sort((i,a)=>{if(a.score!==i.score)return a.score-i.score;if(i.score===0&&a.score===0){let s=Yc(a.bag)-Yc(i.bag);if(s)return s}return i.index-a.index});if(!e.length)return null;let n=structuredClone(e[0].bag),r=n.plugins;if(!rt(r))return null;for(let i of e.slice(1)){let a=i.bag.plugins;if(rt(a))for(let[s,l]of Object.entries(a)){let c=hs(l);if(!c)continue;if(!rt(r[s])){let d=structuredClone(c);delete d.defaultsRev,d.enabled!==!0&&delete d.enabled,Object.keys(d).length&&(r[s]=d);continue}let u=r[s];for(let[d,f]of Object.entries(c))if(d!=="defaultsRev"){if(d==="enabled"){!("enabled"in u)&&f===!0&&(u.enabled=!0);continue}bs(u[d])&&!bs(f)&&(u[d]=structuredClone(f))}}}let o=r.Settings;return rt(o)&&delete o.defaultsRev,{bag:n,index:e[0].index,score:Ze(n)}}var ri=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;persist=!1;dirty=!1;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}releasePersist(){this.dirty=!1,this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.persist=!0}persistLoadedBag(){this.persist&&(this.dirty=!0,this.flush())}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return rt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.dirty=!0,this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){ei.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){!this.persist||!this.dirty||this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Bp))}save(){if(!(!this.persist||!this.dirty))try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Te,this.plain)}catch{try{GM_setValue(Te,e)}catch(n){ei.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Te,e)}catch{}Uc(Te,e).catch(n=>ei.warn("Failed to save settings to IndexedDB:",n)),this.dirty=!1}catch(e){ei.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Kc(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var qp=new C("Settings"),$p={plugins:{}},j=new ri(structuredClone($p)),Fp=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function jp(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function M(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?Le(n):{}},get plain(){let n=e.pluginName;return n?j.plain.plugins[n]??{}:{}}};return e}async function zp(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Zc(){let t=oi(await zp(Te)),e=oi(await Gc(Te)),n=null;try{n=oi(localStorage.getItem(Te))}catch{n=null}let r=Xc([t,e,n]);if(r){let o=r.bag.plugins;o&&(j.plain.plugins=o);let i=["gm","idb","localStorage"][r.index]??String(r.index);qp.info("Loaded settings from",i,"richness",r.score,"gm",Ze(t),"idb",Ze(e),"ls",Ze(n))}j.releasePersist(),r&&(r.index!==0||r.score>Ze(t))&&j.persistLoadedBag()}function Le(t){return j.plain.plugins[t]||(j.plain.plugins[t]={}),j.store.plugins[t]}function Jc(t,e){e&&(e.pluginName=t,Le(t),j.setDefaultGetter(Fp(t),n=>{if(n!=="enabled")return jp(e.def,n)}))}function Qc(){return Le("Settings")}function ii(){return Qc().pinnedPlugins??[]}function tu(t){return ii().includes(t)}function eu(t){let e=ii(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function ai(){return Qc().starredPlugins??[]}function nu(t){return ai().includes(t)}function ru(t){let e=ai(),n=e.includes(t);return j.store.plugins.Settings={...j.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var si=new C("PluginManager"),se={},Rr=new Set;function ou(t){if(se[t.name]){si.warn("Duplicate plugin",t.name);return}se[t.name]=t,Jc(t.name,t.settings)}function qn(t){let e=se[t];if(!e)return!1;if(e.required)return!0;let n=j.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function iu(t){let e=se[t];if(!e||e.required)return;let n=!qn(t);Le(t),j.store.plugins[t].enabled=n,n?au(e):Gp(e),Xe("pluginToggle",{name:t,enabled:n})}function au(t,e=!1){if(!Rr.has(t.name)&&qn(t.name))try{t.managedStyle&&Fc(t.managedStyle),t.start?.(),Rr.add(t.name),t.settings&&j.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Rr.has(t.name)&&t.onSettingsChange?.()}),e||si.debug("Started",t.name)}catch(n){si.error("Failed to start",t.name,n)}}function Gp(t){if(Rr.has(t.name)){try{t.stop?.()}catch(e){si.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(jc(t.managedStyle),L(t.managedStyle)),Rr.delete(t.name)}}function Nr(t){for(let e of Object.values(se))(e.startAt??"DOMContentLoaded")===t&&au(e)}var su=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Pt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function le(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function ce(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(su)?.[1]??""}catch{return t.match(su)?.[1]??""}}function R(){return ce(location.pathname)}var vs=/\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i,Up=/[?&](?:num_turns|limit|before|after|before_node|after_node|cursor)=/i;function li(t){return/\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(t)}function xs(t,e){return e!=="GET"||li(t)?!1:vs.test(t)}function Es(t){return vs.test(t)&&Up.test(t)}function ci(t){return t.match(vs)?.[1]??""}function ws(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return ws(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Pr(t){return!t||typeof t!="object"||Array.isArray(t)?null:t}function cu(t){let e=Pr(t);return e?!e.mapping&&Pr(e.conversation)?e.conversation:e:null}function lu(t){let e=t.replace(/\s+/g," ").trim();return e?e.length>80?`${e.slice(0,79)}\u2026`:e:""}function Kp(t){let e=t.content;if(!e||typeof e!="object"||Array.isArray(e))return"";let n=e,r=Array.isArray(n.parts)?n.parts:[],o=[],i=!1,a=!1;for(let c of r){if(typeof c=="string"){c.trim()&&o.push(c);continue}if(!c||typeof c!="object")continue;let u=c,d=typeof u.content_type=="string"?u.content_type:"";/image/i.test(d)?i=!0:/file|document|attachment/i.test(d)?a=!0:typeof u.text=="string"&&u.text.trim()&&o.push(u.text)}let s=lu(o.join(" "));if(s)return s;let l=typeof n.content_type=="string"?n.content_type:"";return i||/image/i.test(l)?"Image":a?"File":typeof n.text=="string"?lu(n.text):""}function Wp(t){if(Pr(t.metadata)?.is_visually_hidden_from_conversation===!0)return"";let r=Pr(t.author)?.role??t.role;return r==="user"||r==="assistant"?r:""}function Vp(t,e){for(let o of["current_node","current_node_id","currentNode"]){let i=t[o];if(typeof i=="string"&&e[i])return i}let n="",r=-1;for(let[o,i]of Object.entries(e)){if(!i||typeof i!="object"||Array.isArray(i))continue;let a=i;if((Array.isArray(a.children)?a.children:[]).length)continue;let l=a.message,c=l&&typeof l=="object"&&!Array.isArray(l)?ws(l.create_time??l.createTime)??0:0;(!n||c>=r)&&(n=o,r=c)}return n}function Yp(t,e){let n=[],r=new Set,o=e,i=0;for(;o&&t[o]&&i++<800&&!r.has(o);){r.add(o);let a=t[o];if(!a||typeof a!="object"||Array.isArray(a))break;let s=a,l=s.message&&typeof s.message=="object"&&!Array.isArray(s.message)?s.message:null,c=l?Wp(l):"",u=l&&typeof l.id=="string"&&l.id?l.id:o;if(c){let d={id:u,role:c,text:l?Kp(l):""};u!==o&&(d.alias=o);let f=l?ws(l.create_time??l.createTime):null;f&&(d.at=f),n.push(d)}o=typeof s.parent=="string"?s.parent:null}return n.reverse(),n}function ys(t){return t.length<=480?t:t.slice(t.length-480)}function Ss(t,e){if(!e.length)return t;if(!t.length)return ys(e);let n=new Map(t.map((f,m)=>[f.id,m])),r=-1,o=-1;for(let f=0;f<e.length;f++){let m=n.get(e[f].id);if(m!==void 0){r=m,o=f;break}}if(r<0){if(e.length<3&&t.length>e.length)return t;let f=new Set(t.map(b=>b.id)),m=n.has(e[e.length-1].id),p=e.filter(b=>!f.has(b.id));return ys(m?[...p,...t]:[...t,...p])}let i=0;for(;r+i<t.length&&o+i<e.length&&t[r+i].id===e[o+i].id;)i++;let a=new Set(t.slice(0,r).map(f=>f.id)),s=[...t.slice(0,r)];for(let f of e.slice(0,o))a.has(f.id)||(s.push(f),a.add(f.id));let l=e.slice(o,o+i).map((f,m)=>f.text?f:t[r+m]),c=new Set([...s,...l].map(f=>f.id)),u=e.slice(o+i).filter(f=>!c.has(f.id));for(let f of u)c.add(f.id);let d=t.slice(r+i).filter(f=>!c.has(f.id));return ys([...s,...l,...u,...d])}function Xp(t){let e=t.mapping;if(!e||typeof e!="object"||Array.isArray(e))return[];let n=e;if(!Object.keys(n).length)return[];let r=Vp(t,n);return r?Yp(n,r):[]}function Ts(t){let e=cu(t);if(!e)return[];let n=e.mapping;return!n||typeof n!="object"||Array.isArray(n)?[]:!(typeof e.current_node=="string"||typeof e.current_node_id=="string"||typeof e.currentNode=="string")&&typeof e.title!="string"?[]:Xp(e)}function uu(t,e=""){let n=Pr(t);if(!n)return e;let r=cu(t)??n;return typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||typeof n.conversation_id=="string"&&n.conversation_id||typeof n.conversationId=="string"&&n.conversationId||e}function du(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n].id!==e[n].id||t[n].role!==e[n].role||t[n].text!==e[n].text||t[n].alias!==e[n].alias)return!1;return!0}var gu=new C("Harvest"),Zp=1500,Jp=200,Qp=8,ui=new Set,di=new Map,fi=new Map,mi=new Map,fu=[],$n=null,pi=null,Or=null,Ot=0,bu=!1;function tg(){return typeof unsafeWindow<"u"?unsafeWindow:window}function eg(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function ng(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}var rg=/"action"\s*:\s*"(next|continue|variant)"/i;function og(t,e,n){return!(e!=="POST"||li(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!rg.test(n))}function hu(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function ig(t){return typeof t=="string"?hu(t):""}function Ls(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ls(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function ks(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function mu(t,e,n){!t||!e||fi.get(t)!==e&&(fi.set(t,e),ks(fi,Zp),ue({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function ag(t,e){let n=e.trim();!t||!n||di.get(t)!==n&&(di.set(t,n),ks(di,Jp),ue({type:"conversation-meta",conversationId:t,title:n}))}function sg(t,e,n=""){if(n&&Es(n))return;let r=uu(e,t);if(!r)return;let o=Ts(e);if(!o.length)return;let i=mi.get(r)??[],a=Ss(i,o);du(i,a)||(mi.set(r,a),ks(mi,Qp),ue({type:"conversation-chain",conversationId:r}))}function Br(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Br(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&ag(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ls(l.create_time??l.createTime??l.created_at);c&&u&&mu(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ls(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&mu(a,s,o),r.mapping&&typeof r.mapping=="object")Br(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Br(l,o,n+1)}function pu(t,e){if(t)try{Br(JSON.parse(t),e)}catch{}}function ue(t){for(let e of Array.from(ui))try{e(t)}catch{}}async function lg(t,e,n,r){if(n===Ot)try{let o=await t.json();if(n!==Ot)return;Br(o,e),sg(e,o,r)}catch{}}async function cg(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Ot&&ue({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Ot;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let m=hu(c);m&&(o=m,ue({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let m of f){let p=m.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||pu(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Ot&&pu(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Ot&&ue({type:"post-end",conversationId:o,error:i})}function ug(t,e,n){let r=eg(e),o=ng(e,n),i=xs(r,o),a=og(r,o,n?.body),s=Ot,l="";return a&&(l=ig(n?.body)||ci(r)||ce(r)||R(),ue({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Ot||!i&&!a)return c;try{let u=c.clone();i?lg(u,ci(r)||R(),s,r):cg(u,l,!c.ok,s)}catch{a&&ue({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Ot&&ue({type:"post-end",conversationId:l,error:!0}),c})}function yu(){if($n)return;let t=tg();Or=t,$n=t.fetch.bind(t);let e=(n,r)=>ug($n,n,r);pi=e,t.fetch=e,gu.debug("conversation fetch harvest hooked")}function dg(){Ot+=1,!(!$n||!Or)&&(pi&&Or.fetch===pi&&(Or.fetch=$n),$n=null,pi=null,Or=null,gu.debug("conversation fetch harvest unhooked"))}function fg(){Ot+=1,!bu&&dg()}function vu(){bu=!0,yu()}function xu(t){}function Et(t){return ui.add(t),yu(),()=>{ui.delete(t),ui.size===0&&fg()}}function Fn(t){return t?di.get(t)??"":""}function gi(t){return t?fi.get(t)??null:null}function Dr(t){return t?mi.get(t)??fu:fu}var _r=!1,bi=!1,Cs=!1,wu=[],Su=[],Tu=[];function Ms(t){let e=t.splice(0);for(let n of e)n()}function qr(){_r||(_r=!0,Ms(wu))}function As(){bi||(bi=!0,_r||qr(),Ms(Su))}function Lu(){Cs||(Cs=!0,_r||qr(),bi||As(),Ms(Tu))}function hi(t){_r?t():wu.push(t)}function yi(t){bi?t():Su.push(t)}function vi(t){Cs?t():Tu.push(t)}function xi(){qr()}function jn(){qr(),As()}function Ei(){Lu()}function Eu(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function ku(){await Eu(4e3),qr(),await Eu(4e3),As(),Lu()}var S={p:"0-V-linuxdo"},wt="[20260928] v1.4.110",Cu="https://github.com/0-V-linuxdo/Bloom";var mg={BetterNavigator:1790264656e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790252301e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1790243181e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function Mu(t){let e=mg[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}var Hs=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),pg=["#stage-slideover-sidebar","#stage-popover-sidebar","[data-app-action-sidebar-scroll]",'[data-testid="desktop-app-shell"]'].join(","),wi=["#stage-sidebar-tiny-bar","[data-app-navigation-rail]"].join(","),Au='a[href^="/c/"], a[href*="/c/"]',Hu=['form[data-type="unified-composer"]',"form.w-full[data-type]","form:has(#prompt-textarea)",'form:has([data-testid="prompt-textarea"])','form:has(textarea[name="prompt"])',"form:has(#mobile-composer-prompt)",'form:has([data-testid="mobile-composer-prompt"])'].join(", "),$r=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]","#mobile-composer-prompt",'[data-testid="mobile-composer-prompt"]','textarea[name="prompt"]','form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]','[contenteditable="true"][role="textbox"]'].join(", "),_E=["#thread",'[data-testid="conversation-panel"]',"[data-chatgpt-conversation-selection-target]","main"].join(", "),Iu=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]',"[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids]","[data-chatgpt-search-message-ids]"].join(", "),Ru=["[data-message-id]","[data-chatgpt-search-message-ids]"].join(", "),Nu=['#thread section[data-testid^="conversation-turn-"][data-turn="assistant"]','#thread article[data-testid^="conversation-turn-"][data-turn="assistant"]','[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids] [data-message-author-role="assistant"]','[data-chatgpt-search-message-ids] [data-message-author-role="assistant"]','[data-chatgpt-search-message-ids][data-message-author-role="assistant"]','[data-message-author-role="assistant"]'].join(", "),gg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item, #bloom-bn-host, #bloom-pq-chip, #bloom-rt-host";function Je(t){return!!t.closest(gg)}function it(t,e=document){try{let n=e.querySelector(t);return n instanceof HTMLElement?n:null}catch{return null}}function Si(){try{return!!(document.getElementById("stage-slideover-sidebar")||document.getElementById("stage-popover-sidebar")||it(wi)||it(pg)||it(Hs)||it("[data-sidebar-destination]"))}catch{return!1}}function Pu(){try{return!!it($r)}catch{return!1}}function Ou(){let t=document.getElementById("stage-slideover-sidebar");if(t instanceof HTMLElement&&t.isConnected&&!Je(t))return t;let e=document.getElementById("stage-popover-sidebar");if(e instanceof HTMLElement&&e.isConnected&&!Je(e))return e;let n=it("[data-app-action-sidebar-scroll]");if(n&&!Je(n)){let a=n.closest("nav")??n.parentElement??n;return a instanceof HTMLElement&&!Je(a)?a:n}let r=it("[data-app-navigation-rail]");if(r&&!Je(r))return r;let o=it("nav");if(o&&!Je(o))return o;let i=it('[data-testid="desktop-app-shell"]');return i&&!Je(i)?i:null}function Ti(){let t=document.getElementById("thread");if(t instanceof HTMLElement&&t.isConnected)return t;let e=it('[data-testid="conversation-panel"]');if(e)return e;let n=it("[data-chatgpt-conversation-selection-target]");return n||it("main")}function Is(t){let e=[],n=o=>{o&&!e.includes(o)&&e.push(o)};n(t.getAttribute("data-message-id")),n(t.getAttribute("data-turn-id"));let r=t.getAttribute("data-chatgpt-search-message-ids")||"";for(let o of r.split(/\s+/))n(o);try{n(t.querySelector("[data-message-id]")?.getAttribute("data-message-id")),n(t.querySelector("[data-turn-id]")?.getAttribute("data-turn-id"))}catch{}return e}function Li(t){let e=Is(t);return e[e.length-1]||""}function Qe(t){return t instanceof HTMLElement?t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail"):!1}function bg(){try{return!!document.querySelector('a[href^="/c/"], a[href*="/c/"], a[href^="/g/"]')}catch{return!1}}function hg(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, [data-app-navigation-rail] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Rs(){try{return Pu()||!!document.querySelector($r)}catch{return!1}}function tn(){return Rs()?bg()||hg()||Si():!1}function Bu(){return tn()}var Ps=Hs,Du=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),yg=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),vg="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function ke(t){return t.id==="bloom-root"||!!t.closest(vg)}function _u(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function ki(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Ns(t){if(!(t instanceof HTMLElement)||!t.isConnected||ke(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&ki(e)?!1:t.getClientRects().length>0}function en(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-popover-sidebar"||t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail")||t.hasAttribute("data-app-action-sidebar-scroll")}function qu(t){let e=t.getAttribute("data-testid")||"";if(/profile|account/i.test(e))return!0;let n=`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`;return!!(/profile|account|账号|账户|头像/i.test(n)||t.querySelector("img, [data-bloom-csi-slot], [class*='rounded-full']"))}function xg(){let t=[];for(let e of document.querySelectorAll(Ps))!(e instanceof HTMLElement)||!e.isConnected||ke(e)||t.push(e);return t}function Ci(t){if(!t.isConnected||ke(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function $u(t){let e=[];try{for(let n of t.querySelectorAll('button[aria-haspopup="menu"]'))!(n instanceof HTMLElement)||!n.isConnected||ke(n)||e.push(n)}catch{}return e}function nn(){let t=xg().filter(Ci);if(t[0])return t[0];let e=it("[data-app-navigation-rail]");if(e){let r=$u(e).filter(i=>{let a=i.getBoundingClientRect();return a.width>16&&a.height>16&&a.left>=0&&a.left<window.innerWidth/3&&a.bottom>0}),o=r.find(qu)??r.at(-1);if(o)return o}let n=Fr();if(n){let r=$u(n).filter(i=>{let a=i.getBoundingClientRect();return a.width>16&&a.height>16&&a.left>=0&&a.bottom>0}),o=r.find(qu)??r.at(-1);if(o)return o}return null}function zn(){for(let t of document.querySelectorAll(wi)){if(!(t instanceof HTMLElement)||!t.isConnected||ke(t))continue;let e=t.getBoundingClientRect();if(!(e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3))return t}return null}function Fr(){let t=it("[data-app-action-sidebar-scroll]");if(!t)return null;let e=[t.nextElementSibling,t.parentElement?.nextElementSibling];for(let n of e)if(!(!(n instanceof HTMLElement)||!n.isConnected)&&!(ke(n)||en(n))&&n.querySelector('button[aria-haspopup="menu"]'))return n;return null}function Os(t){let e=t.closest(wi);if(e instanceof HTMLElement){let i=t;for(;i&&i.parentElement!==e;)i=i.parentElement;if(i&&i.parentElement===e)return i}let n=t,r=t.parentElement;r&&r.children.length===1&&!ke(r)&&!en(r)&&r.parentElement&&!en(r.parentElement)&&(n=r);let o=n.parentElement;if(o&&!en(o)&&!ke(o)&&o.children.length>1){let i=o.getAttribute("class")||"";if(/\bflex\b/.test(i)&&!/flex-col/.test(i)&&o.parentElement&&!en(o.parentElement))return o}return n}function Gn(){let t=document.querySelectorAll(Du);for(let n of t)if(Ns(n)&&!ki(n)&&_u(n))return n;let e=document.querySelectorAll(yg);for(let n of e){if(!Ns(n)||!_u(n)||ki(n))continue;let r=n.querySelector(Du);return Ns(r)&&!ki(r)?r:n}return null}function Mi(){let t=nn();if(t){let n=Os(t),r=n.parentElement;if(r&&(!en(r)||Qe(r)))return r;if(!en(n)||Qe(n))return n}let e=Fr();return e||zn()}function Ai(t){let e=nn();return e?t.composedPath().includes(e):!1}var Ds=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Eg={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function wg(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Sg(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Bs(t){let e=wg(t);return e?Sg(e)>.55?"light":"dark":null}function Tg(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Bs(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Bs(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Bs(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Hi(t){return t==="auto"?Tg():t}function Lg(t){try{let e=getComputedStyle(document.documentElement);for(let n of Ds){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Ii(t,e,n){let r=Eg[e];if(n){Lg(t);for(let o of Ds)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Ds)t.style.setProperty(o,r[o])}function Fu(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var _s=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Cg="bloom-root",Ut="bloom-rail-item",Bi="bloom-account-item",on="bloom-sidebar-panel",Xr="bloom-plugin-dialog",zi="bloom-plugin-layer",Di="bloom-settings-css",Mg=2e3,zu=null,Ag=null,He=!1,zs=[],Ri=null,_i=null,Me=null,Pi=null,de=null,Wr=null,jr,Un=0,Vr=0,zr=0,Gr=null,Ur=null,qi=null,Gu=null,Kr=null,qs=[],$i=!1,Hg=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Ig=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Rg=new Set(["chat","ui","privacy"]),Ng=10080*60*1e3,Gi="",Yr="all",Gt="all";function Ui(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Uu(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Pg(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Og(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Bg(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Dg(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var _g={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function qg(t){return t.icon||_g[t.name]||Ui()}function $s(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Ii(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Ku(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Fi(){let t="auto",e=Hi(t);$s(zu,e,!0);let n=document.getElementById(on);n instanceof HTMLElement&&$s(n,e,!0);let r=document.getElementById(Xr);r instanceof HTMLElement&&$s(r,e,!0);let o=document.getElementById(Ut);o instanceof HTMLElement&&Ku(o),Xe("schemeChange",{scheme:e,pref:t})}function Wu(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Vu(){if(k("settings",_s),document.getElementById(Di)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Di,t.textContent=_s,document.head.appendChild(t)}function $g(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Fg(){for(let t of zs)t();zs=[]}function Yu(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function jg(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Ks(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function zg(t){return Ks(t).length>0}function Oi(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Gg(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=jg(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Ug(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Gg(e,n));let i=Le(t);if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",zs.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Oi(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Oi(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Yu(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Oi(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function ju(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Kg(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=Le(t.name);for(let[n,r]of Ks(t)){if(n==="enabled"||r.type===5)continue;let o=Oi(r);o!==void 0&&(e[n]=o)}Zu(t)}function Xu(t){t.key==="Escape"&&(!document.getElementById(zi)&&!document.getElementById(Xr)||(t.stopPropagation(),Kn()))}function Wg(){$i||(document.addEventListener("keydown",Xu),$i=!0)}function Vg(){$i&&(document.removeEventListener("keydown",Xu),$i=!1)}function Kn(){Fg(),Vg(),document.getElementById(zi)?.remove(),document.getElementById(Xr)?.remove()}function Zu(t){if(Kn(),!document.body)return;let e=document.createElement("div");e.id=zi,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Ae),e.addEventListener("pointerup",Ae),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Kn()});let n=document.createElement("div");n.id=Xr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ae),n.addEventListener("pointerup",Ae),n.addEventListener("click",Ae);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Uu(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Kn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=ju("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=ju("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Ks(t);if(c.length)for(let[u,d]of c){let f=Ug(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Kg(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Wg(),Fi()}function Yg(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=qg(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=nu(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Bg(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let g=ru(t.name);Xe("pluginStar",{name:t.name,starred:g})}),s.appendChild(c),!t.required){let b=tu(t.name),g=document.createElement("button");g.type="button",g.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,g.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),g.innerHTML=Dg(b),g.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();let h=eu(t.name);Xe("pluginPin",{name:t.name,pinned:h})}),s.appendChild(g)}if(zg(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=Og(),b.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),Zu(t)}),s.appendChild(b)}let u=Yu(t.name,qn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{iu(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let m=document.createElement("div");m.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",m.appendChild(p),e.append(n,f,m),e}function Ju(){return Object.values(se).filter(t=>!t.hidden&&t.name!=="Settings")}function Xg(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Ng}function Qu(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Xg(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Rg.has(r)):n.includes(e)}function Zg(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Jg(){return Gi.trim()?"No plugins match your search.":Gt==="favorites"?"No favorites yet. Star a plugin to see it here.":Gt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Qg(){let t=Ju();return Ig.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Qu(n,e.id)))}function tb(){if(Kr){Kr.replaceChildren();for(let t of Qg()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Gt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Gt=t.id,rn()}),Kr.appendChild(e)}}}function eb(){let t=Ju();if(Gt==="favorites"){let e=new Set(ai());t=t.filter(n=>e.has(n.name))}else Gt!=="all"&&(t=t.filter(e=>Qu(e,Gt)));return Yr==="enabled"&&(t=t.filter(e=>qn(e.name))),Yr==="disabled"&&(t=t.filter(e=>!qn(e.name))),t}function rn(){if(!Gr)return;tb();let t=eb();qi&&(qi.placeholder=`Search ${t.length} plugins...`);let e=t,n=Gi.trim().toLowerCase();if(n&&(e=e.filter(r=>Zg(r).includes(n))),Gt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Gt!=="favorites"){let r=ii();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Gr.replaceChildren();for(let r of e)Gr.appendChild(Yg(r));Ur&&(Ur.hidden=e.length>0,Ur.textContent=Jg())}function Ae(t){t.stopPropagation()}function Fs(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ws(){document.getElementById(Ut)?.setAttribute("aria-expanded",He?"true":"false")}function nb(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Vs(){Kn(),Gi="",Yr="all",Gt="all",document.getElementById(on)?.remove(),He=!1,Ws()}function rb(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",Ae),e.addEventListener("pointerup",Ae),e.addEventListener("click",Ae);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Ui();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Pg();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Uu(),d.addEventListener("click",Vs),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let m=document.createElement("div");m.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Gi=p.value,rn()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let h of Hg){let x=document.createElement("option");x.value=h.value,x.textContent=h.label,b.appendChild(x)}b.value=Yr,b.addEventListener("change",()=>{Yr=b.value,rn()}),m.append(p,b),n.appendChild(m);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let E=document.createElement("p");return E.className="bloom-tab-empty",E.hidden=!0,n.appendChild(E),e.append(d,n),Gr=g,Ur=E,qi=p,Gu=b,Kr=f,rn(),e}function ob(t){t.classList.add("bloom-rail-dock")}function ib(){let t=document.getElementById(Ut);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Ci(t)?t:null}function ab(){if(document.getElementById(on)?.remove(),!document.body)return;let t=rb(on);ob(t),document.body.appendChild(t),He=!0,Kn(),Fi(),Ws(),Xe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:wt,dock:"center",rail:!!ib()})}function Ys(){let t=document.getElementById(on);if(t instanceof HTMLElement&&t.isConnected&&nb(t)){Vs();return}t?.remove(),ab()}function sb(){let t=document.createElement("button");return t.type="button",t.id=Ut,t.className="bloom-rail-item",t.setAttribute("aria-controls",on),t.setAttribute("aria-expanded",He?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Ui()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ys()}),t}function js(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function lb(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function cb(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Ce(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function td(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=lb(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Ce(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Ce(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Ce(n,"width",l),Ce(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Ce(t,"padding-left",u);let d=cb(e,r);if(d){let f=d.getBoundingClientRect(),m=n.getBoundingClientRect(),p=Math.round(f.left-m.right);p>=0&&p<=24&&Ce(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Ce(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Ce(t,"gap",Math.round(l))}Ku(t)}function Gs(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-popover-sidebar"||t.id==="stage-sidebar-tiny-bar"||t.hasAttribute("data-app-navigation-rail")||t.hasAttribute("data-app-action-sidebar-scroll")}function ub(){if(Wr?.isConnected&&de){de.observe(Wr,{childList:!0});return}Us()}function db(t){if(Gs(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function fb(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){zr=0;return}zr+=1,Vr=Date.now()+Math.min(8e3,250*2**Math.min(zr,5))})}function mb(){Un||Date.now()<Vr||(Un=requestAnimationFrame(()=>{Un=0,!(Date.now()<Vr)&&(document.getElementById(Ut)?.isConnected||ji())}))}function ji(){if(!document.body)return;de?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Ut);t=n instanceof HTMLButtonElement?n:sb();let r=nn(),o=zn();if(r){let i=Os(r),a=i.parentElement,s=!!(a&&Qe(a));if(Gs(i)&&!Qe(i)||a&&Gs(a)&&!s)return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),js(t,s||Qe(i)?!0:void 0),td(t,r)}else if(Fr()){let i=Fr();t.parentElement!==i&&(i.prepend(t),e=!0),js(t)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),js(t,!0)):t.isConnected&&!Ci(t)&&(t.remove(),t=null)}finally{fb(t,e),ub(),Ws()}}function Us(){let t=Mi();!t||!db(t)||Wr===t&&de||(de?.disconnect(),Wr=t,de=new MutationObserver(()=>{document.getElementById(Ut)?.isConnected||mb()}),de.observe(t,{childList:!0}))}function pb(){ji(),Us(),jr===void 0&&(jr=window.setInterval(()=>{let t=document.getElementById(Ut);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Vr&&ji();else{zr=0;let e=nn();e&&td(t,e)}Us()},Mg))}function gb(){jr!==void 0&&(clearInterval(jr),jr=void 0),Un&&cancelAnimationFrame(Un),Un=0,Vr=0,zr=0,de?.disconnect(),de=null,Wr=null}function bb(t){Pi===t&&Me||(Me?.disconnect(),Pi=t,Me=new MutationObserver(()=>{if(!t.isConnected){Me?.disconnect(),Me=null,Pi=null;return}ed(t)}),Me.observe(t,{childList:!0}))}function ed(t){if(bb(t),t.querySelector(`#${Bi}`))return;let e=document.createElement("button");e.type="button",e.id=Bi,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Ui()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Fs),e.addEventListener("pointerup",Fs),e.addEventListener("click",n=>{Fs(n),Ys()}),t.insertBefore(e,t.firstChild)}function Ni(){let t=Gn();return t?(ed(t),!0):!1}function hb(t){Ai(t)&&(queueMicrotask(Ni),requestAnimationFrame(()=>{Ni()}),window.setTimeout(Ni,60),window.setTimeout(Ni,180))}function yb(){_i?.abort();let t=new AbortController;_i=t,document.addEventListener("click",hb,{signal:t.signal})}function vb(){_i?.abort(),_i=null,Me?.disconnect(),Me=null,Pi=null}function nd(){jn(),$g(()=>{Vu(),Wu(),ji(),Ys()})}var rd=w({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[S.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Cg}`,`#${Ut}`,`#${Bi}`,`#${on}`,`#${zi}`,`#${Xr}`,`#${Di}`,"#bloom-menu-panel"],start(){Vu(),Wu(),pb(),yb(),Ri?.(),Ri=Fu(Fi),Fi(),qs=[_n("pluginToggle",()=>{He&&rn()}),_n("pluginPin",()=>{He&&rn()}),_n("pluginStar",()=>{He&&rn()})]},stop(){gb(),vb(),Ri?.(),Ri=null;for(let t of qs)t();qs=[],Vs(),document.getElementById(Ut)?.remove(),document.getElementById(Bi)?.remove(),document.getElementById(Di)?.remove(),zu=null,Ag=null,Gr=null,Ur=null,qi=null,Gu=null,Kr=null,He=!1}});var Ki=Hu,Kt=$r,Wn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]','form button[aria-label^="Send" i]','form button[aria-label="Send prompt"]','form button[aria-label="\u53D1\u9001"]','form button[type="submit"]'].join(", "),od=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]','form button[aria-label*="Stop streaming" i]','form button[aria-label*="Stop generating" i]','form button[aria-label*="\u505C\u6B62\u751F\u6210"]','form button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),id=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),xb=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Eb='[contenteditable="false"], button, [role="button"]';function Bt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function an(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!Bt(o)))return o;return null}function ad(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function q(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=ad(t);return!!(xb.test(n)||/^stop$/i.test(n))}function Dt(){let e=Array.from(document.querySelectorAll(Ki)).find(Bt);if(e instanceof HTMLElement)return e;let n=an(document,Kt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function at(){let t=Array.from(document.querySelectorAll(Kt));return t.find(Bt)??t[0]??null}function wb(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Eb);return!!n&&n!==e&&e.contains(n)}function Xs(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&wb(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Zs(t){return t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement}function Wt(t){let e=t??at();return e?Zs(e)?e.value.replaceAll("\u200B","").trim().length>0:Xs(e,e).replaceAll("\u200B","").trim().length>0:!1}function Ie(t){return!Wt(t)}function Wi(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function sd(t){let e=Dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!Bt(n))&&t(n))return n;return null}function Re(){let t=Dt(),e=an(t,Wn)??an(document,Wn);return e&&!q(e)?e:sd(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!q(n);let o=ad(n);return/^(send|send prompt|发送)$/i.test(o)&&!q(n)?!0:n.getAttribute("type")==="submit"&&!q(n)})}function sn(){let t=Dt(),e=an(t,od,!0)??an(document,od,!0);if(e)return e;let n=an(t,id)??an(document,id);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&Bt(r)&&q(r))return r}return sd(q)}function Vt(t){if(Zs(t))return t.value;let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Xs(n,t)).join(`
`):Xs(t,t)}function Js(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function fe(t,e,n=!1){if(Zs(t)){t.focus(),t.value=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"}));try{let i=n?0:e.length;t.setSelectionRange(i,i)}catch{}return}t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Js(t,n)}var cd=new C("Streaming");function eo(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!Bt(e))&&(q(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Sb(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&Bt(t))}function Tb(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&Bt(t))}function Lb(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Xt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function W(){if(sn()||eo()||Lb())return!0;let t=Re();return t&&Bt(t)&&!q(t)?!1:!!(Sb()||Tb())}var kb=400,ld=3,dn=new Set,Zr,Jr=null,Qs=null,cn=!1,ln=0,Pe="",Oe="",Be=!1,Qr=!1,to=!1,Yt=!1,J=null,St="",un=!1;function z(){return Yt}function fn(){return Be}function Vn(){return St}function tl(){return R()||St}function ud(){return le(Pt())}function Vi(t,e){return{streaming:t,contextKey:e,conversationId:tl()}}function el(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Cb(t){return!t||t==="/"||t.startsWith("/g/")}function V(t,e){if(!t||t===e)return!1;let n=ce(el(e)||e);return!n||!(t.endsWith("|draft")||Cb(el(t)))?!1:St?n===St:un}function Yi(){cn=!1,ln=0,Pe="",Be=!1,Qr=!1,to=!1,St="",un=!1}function Mb(t){for(let e of Array.from(dn))try{e.onFall?.(t)}catch{}}function Ab(t){for(let e of Array.from(dn))try{e.onRise?.(t)}catch{}}function Ne(t){for(let e of Array.from(dn))try{e.onTick?.(t)}catch{}}function Hb(t,e){for(let n of Array.from(dn))try{n.onContext?.(t,e)}catch{}}function Ib(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&q(n)&&(Be=!0)}function Rb(t){if(t.type==="post-start"){let n=R();if(!t.conversationId){n||(un=!0),(!n||n===St)&&(Yt=!1,Be=!1);return}if(!(t.conversationId===n||t.conversationId===St)&&!(!n&&un))return;St=t.conversationId,un=!1,Yt=!1,Be=!1;return}if(t.type!=="post-end"||!cn&&!J)return;let e=R();t.conversationId&&!(e?t.conversationId===e:t.conversationId===St)||(to=!0,t.error&&(Qr=!0,J&&(J.error=!0)))}function Nb(){let t=ud(),e=W();if(Oe&&t&&Oe!==t){let o=Oe;if(!V(o,t))J=null,Yi(),Yt=e;else{let i=ce(el(t));if(i&&!St&&(St=i,un=!1),Pe===o&&(Pe=t),J&&J.contextKey===o){J.contextKey=t;let a=tl();a&&(J.conversationId=a)}Yt=!1}if(Oe=t,Hb(t,o),Yt){Ne(Vi(!1,t));return}}else t&&(Oe=t);if(Yt){if(e){Ne(Vi(!1,t));return}Yt=!1}if(J)if(e||J.contextKey!==t)J=null;else{let o=J;J=null,Yi(),Mb(o),Ne(Vi(!1,t));return}let n=Vi(e,t);if(e){let o=!cn;o&&(Be=!1,Qr=!1,to=!1),cn=!0,ln=0,Pe=t,o&&Ab(n),Ne(n);return}if(!cn){Ne(n);return}if(ln+=1,to&&(ln=Math.max(ln,ld)),ln<ld){Ne(n);return}if(!(!!Pe&&Pe===t)){Yi(),Ne(n);return}J={contextKey:Pe||t,conversationId:tl(),userStopped:Be,error:Qr||Xt()},Ne(n)}function Pb(){Zr===void 0&&(cn=W(),Oe=ud(),Pe=cn?Oe:"",ln=0,Be=!1,Qr=!1,to=!1,Yt=!1,J=null,St="",un=!1,Jr?.abort(),Jr=new AbortController,document.addEventListener("click",Ib,{capture:!0,signal:Jr.signal}),Qs=Et(Rb),Zr=setInterval(Nb,kb),cd.debug("watchStreamingEdge started"))}function Ob(){dn.size||(Zr!==void 0&&(clearInterval(Zr),Zr=void 0),Jr?.abort(),Jr=null,Qs?.(),Qs=null,Yi(),Oe="",Yt=!1,J=null,cd.debug("watchStreamingEdge stopped"))}function ut(t){let e=typeof t=="function"?{onFall:t}:t;return dn.add(e),Pb(),()=>{dn.delete(e),Ob()}}var dd="bloom-host-icon",no="data-bloom-host-rel",nl="not all",rl=0,fd=0,Bb=400;function md(t){rl+=1;try{t()}finally{rl-=1}}function Xi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function De(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function pd(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Db(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function _b(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-fd<Bb||(fd=n,t.appendChild(e))}function qb(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Xi(n)&&(n.getAttribute(no)||n.setAttribute(no,n.rel),n.media!==nl&&(n.media=nl),n.rel!==dd&&(n.rel=dd))}function $b(t){for(let e of t.querySelectorAll(`link[${no}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(no);n&&(e.rel=n),e.removeAttribute(no),e.media===nl&&e.removeAttribute("media")}}function gd(t,e){let{head:n}=document;!n||!e||md(()=>{qb(n,t);let r=pd(t),{type:o,sizes:i}=Db(e);r?_b(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function bd(t,e){let{head:n}=document;n&&md(()=>{pd(t)?.remove(),$b(n)})}function hd(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(rl)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Xi(c.target)&&(a=!0,De(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Xi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Xi(u)&&u.id!==t&&(a=!0,De(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Fb=["original","badge","dot","hole","bg"],xd=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Ed={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Zi="#FCFCFC",jb="#111111",yd="#111111",zb="#ffffff",Gb="#212121",Ub="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Kb={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Ji=32,vd=64;function wd(t){return typeof t=="string"&&Fb.includes(t)}function Wb(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Qi(t){let e=document.createElement("canvas");e.width=Ji,e.height=Ji;let n=e.getContext("2d");return n?(n.scale(Ji/vd,Ji/vd),t(n),e.toDataURL("image/png")):""}function Vb(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ta(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Ub);n&&(t.strokeStyle=jb,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Yb(t,e,n){let r=Ed[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=yd,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=yd,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=zb,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function ro(t,e){if(t==="original")return e==="wait"?Qi(r=>ta(r,Zi)):Wb(Kb[e]);let n=e==="wait"?void 0:Ed[e];return Qi(t==="hole"?r=>ta(r,n??Zi):t==="bg"?r=>{r.fillStyle=n??Gb,Vb(r,0,0,64,64,14),r.fill(),ta(r,Zi,!1)}:r=>{ta(r,Zi),e!=="wait"&&Yb(r,e,t==="dot"?"dot":"badge")})}function Sd(t){return{wait:ro(t,"wait"),rotate:ro(t,"rotate"),done:ro(t,"done"),ready:ro(t,"ready"),error:ro(t,"error")}}var Xb=new C("ChatStateFavicons"),pn="bloom-chat-state-favicon",Md=["input","beforeinput","cut","paste","compositionend"],Ad=M({style:{type:3,description:"Favicon overlay",options:xd}}),Zt="",al={wait:"",rotate:"",done:"",ready:"",error:""},oo="wait",dt=!1,Q=!1,D=null,bt="",Tt="",bn=!0,ra=!1,Yn=null,Lt=0,ea=null,na=null,mn=null,il=null,Xn=null,_t=!1,Td=new WeakSet;function Zb(){let t=Ad.store.style;return wd(t)?t:"bg"}function Hd(){let e=document.querySelector(`link[rel~="icon"]:not(#${pn}), link[data-bloom-host-rel]:not(#${pn})`)?.href;return De(e)?e:De(Zt)?Zt:""}function Jb(){let t=document.getElementById(pn);return t instanceof HTMLLinkElement?t:null}function Qb(){if(!De(Zt)){let t=Hd();t&&(Zt=t)}return De(Zt)?Zt:al.wait}function Id(t){return t==="wait"?Qb():al[t]}function Rd(){gd(pn,Id(oo))}function $(t){let e=Id(t);if(oo===t){let n=Jb();if(n&&n.getAttribute("href")===e)return}oo=t,Rd()}function Ld(){al=Sd(Zb()),$(oo)}function sl(){return le(Pt())}function ll(t,e){!t||!e||t===e||(D===t&&(D=e),bt===t&&(bt=e),Tt===t&&(Tt=e))}function th(){let t=sl();if(!(W()||dt||Q))return bt="",t;if(bt&&t&&bt!==t)if(V(bt,t))ll(bt,t),bt=t;else return bt="",t;else!bt&&t&&(bt=t);return bt||t}function kd(t){return!D||!t?!1:D===t?!0:V(D,t)}function Nd(){dt=!1,Q=!1,D=null,bt=""}function Pd(t){Tt=t,Nd(),bn=!1,ra=!0,$("wait")}function ol(t){return!t&&bn}function eh(){if(!_t)return;let t=sl();if(Tt&&t&&Tt!==t&&!V(Tt,t)){Pd(t);return}Tt&&t&&V(Tt,t)&&ll(Tt,t),t&&(Tt=t);let e=W(),n=e&&!z();if(ra){if(z()){$("wait");return}ra=!1}if(z()){$("wait");return}let r=th(),o=Ie();if(fn()&&!e){dt=!1,Q=!1,D=null,$(o?"wait":ol(o)?"ready":"wait");return}if(Xt()&&!e&&dt){$("error"),dt=!1,Q=!1,D=null;return}if(n){dt||(bn=!1),dt=!0,Q=!1,D=r,$("rotate");return}if(dt)if(!kd(t))dt=!1,Q=!1,D=null;else if(Q){dt=!1,Q=!0,D=t||r,$("done");return}else{$("rotate");return}if(Q)if(D&&t&&!kd(t))Q=!1,D=null;else if(o){D=r||D,$("done");return}else if(ol(o)){Q=!1,$("ready");return}else{Q=!1,$("wait");return}D=null,o?$("wait"):ol(o)?$("ready"):$("wait")}function gn(){_t&&(qd(),Bd(),Dd(),eh())}function Od(){if(Xn){for(let t of Md)Xn.removeEventListener(t,_d,!0);Xn=null}}function Bd(){let t=Dt(),e=t&&t!==document.body?t:null;if(!(Xn===e&&e?.isConnected)&&(Od(),!!e)){Xn=e;for(let n of Md)Xn.addEventListener(n,_d,{capture:!0,passive:!0})}}function Dd(){let t=Dt();if(!(mn&&il===t&&t.isConnected)){if(mn?.disconnect(),il=t,!t||t===document.body){mn=null;return}mn=new MutationObserver(()=>oa()),mn.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function oa(){if(_t){if(document.hidden){Lt&&(cancelAnimationFrame(Lt),Lt=0),gn();return}Lt||(Lt=requestAnimationFrame(()=>{Lt=0,_t&&gn()}))}}function _d(){Wt()&&(bn=!0),oa()}function Cd(){Wt()&&(bn=!0),oa()}function nh(){_t&&(Lt&&(cancelAnimationFrame(Lt),Lt=0),gn())}function rh(){_t&&(bn=!1,gn())}function oh(t){if(!_t)return;if(t.userStopped){dt=!1,Q=!1,D=null,$("wait");return}if(t.error){dt=!1,Q=!1,D=null,$("error");return}let e=sl();if(t.contextKey&&e&&t.contextKey!==e&&!V(t.contextKey,e)){dt=!1,Q=!1,D=null,$("wait");return}dt=!1,Q=!0,D=e||t.contextKey,$("done")}function ih(){_t&&gn()}function ah(t,e){if(_t){if(V(e,t)){ll(e,t),Tt=t,gn();return}Pd(t)}}function qd(){let t=at();!t||Td.has(t)||(Td.add(t),t.addEventListener("input",Cd,{capture:!0,passive:!0}),t.addEventListener("compositionend",Cd,{capture:!0,passive:!0}))}var $d=w({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Ad,startAt:"DOMContentLoaded",cleanupSelectors:[`#${pn}`],start(){_t=!0,Zt=Hd()||Zt,Ld(),na?.disconnect(),na=hd(pn,t=>{De(t)&&(Zt=t),Rd()}),Yn?.abort(),Yn=new AbortController,window.addEventListener("popstate",oa,{signal:Yn.signal}),document.addEventListener("visibilitychange",nh,{signal:Yn.signal}),qd(),Bd(),Dd(),ea?.(),ea=ut({onRise:rh,onFall:oh,onTick:ih,onContext:ah}),gn(),Xb.debug("favicon watch started")},stop(){_t=!1,Lt&&cancelAnimationFrame(Lt),Lt=0,ea?.(),ea=null,Yn?.abort(),Yn=null,Od(),mn?.disconnect(),mn=null,il=null,na?.disconnect(),na=null,Nd(),Tt="",bn=!0,ra=!1,oo="wait",bd(pn,Zt)},onSettingsChange:Ld});var Fd=`.bloom-ih-hud {
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
`;var qw=new C("InputHistory"),cl=/\u200B/g,jd=10,zd=500,Gd=100,lh=8,ch=120,uh=2e3,ia=10,aa=M({maxEntries:{type:4,description:"Max stored prompts",min:jd,max:zd,default:Gd},history:{type:5,description:"Stored prompts",render:Lh},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ul=new Map,tt=0,dl="",Jt=!1,ao=!1,pl=0,io=null,fl,gl=null,Ud=!0;function qt(){let t=aa.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Kd(t){let e=ot(Number(aa.store.maxEntries??Gd),jd,zd);return t.length>e?t.slice(t.length-e):t}function sa(t){aa.store.entries=Kd(t)}function dh(t){return t.replaceAll(cl,"").replace(/\n$/,"").trim()}function ml(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Kt);return n instanceof HTMLElement?n:at()}function fh(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Vt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(cl,"").trim().length===0,last:i.toString().replaceAll(cl,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Wd(t){clearTimeout(fl),fl=setTimeout(()=>{if(t!==pl)return;ao=!1;let e=gl;e&&Js(e,Ud)},ch)}function Vd(t,e,n){ao=!0,gl=t,Ud=n;let r=++pl;fe(t,e,n),Wd(r)}function mh(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Zn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ph(){document.querySelector(".bloom-ih-hud")?.remove()}function gh(t,e){let n=mh();n.textContent=t;let r=(e.closest("form")??Dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-lh)}px`,n.classList.add("bloom-ih-hud-on")}function bl(t){let e=dh(t);if(!e)return;let n=Date.now(),r=ul.get(e);if(r&&n-r<uh)return;ul.set(e,n);let o=qt().filter(i=>i!==e);o.push(e),sa(o),tt=qt().length,Jt=!1,Zn()}function bh(t,e){let n=qt();if(!n.length&&t)return;tt>=n.length&&(dl=Vt(e),tt=n.length);let r=t?tt-1:tt+1;r<0||r>n.length||(tt=r,Jt=!0,Vd(e,r===n.length?dl:n[r],t),r<n.length?gh(`${r+1} / ${n.length}`,e):Zn())}function hh(t){Jt=!1,Zn(),Vd(t,dl,!1),tt=qt().length}function yh(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=ml(t.target)??ml(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Jt&&!t.altKey&&!t.shiftKey){hh(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){bl(Vt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=qt();if(!r){let i=fh(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||tt<=0)||!n&&tt>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),bh(n,e))}function vh(t){if(ml(t.target)){if(ao){Wd(pl);return}Jt&&(Jt=!1,Zn(),tt=qt().length)}}function xh(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Kt);n instanceof HTMLElement&&bl(Vt(n))}function Eh(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Wn);if(!n||!(n instanceof HTMLElement)||q(n))return;let r=at();r&&bl(Vt(r))}function wh(t){if(!(!Jt||ao)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Jt=!1,Zn()}}function Sh(){if(io)return;io=new AbortController;let{signal:t}=io,e={capture:!0,signal:t};window.addEventListener("keydown",yh,e),window.addEventListener("input",vh,e),window.addEventListener("submit",xh,e),window.addEventListener("click",Eh,e),window.addEventListener("pointerdown",wh,e)}function Th(t){let e=qt().slice();e.splice(t,1),sa(e),tt>e.length&&(tt=e.length)}function Lh(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=qt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/ia));n>=l&&(n=l-1);let c=s.slice(n*ia,n*ia+ia);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((E,h)=>{let x=i.indexOf(E),mt=qt().length-1-x,pt=document.createElement("div");pt.className="bloom-ih-item";let Z=document.createElement("button");Z.type="button",Z.className=`bloom-ih-body${r===h?"":" bloom-ih-clamp"}`,Z.textContent=E,Z.addEventListener("click",()=>{r=r===h?-1:h,o()});let O=document.createElement("div");O.className="bloom-ih-actions";let ct=document.createElement("button");ct.type="button",ct.title="Copy",ct.textContent="C",ct.addEventListener("click",()=>{Wc(E)});let vt=document.createElement("button");vt.type="button",vt.title="Delete",vt.textContent="\xD7",vt.addEventListener("click",()=>{Th(mt),o()}),O.append(ct,vt),pt.append(Z,O),g.appendChild(pt)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(sa([]),tt=0,o())}),d.append(f,m,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Yd=w({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:aa,startAt:"HostReady",managedStyle:"inputHistory",start(){k("inputHistory",Fd),tt=qt().length,Jt=!1,Sh()},stop(){io?.abort(),io=null,Zn(),ph(),ul.clear(),clearTimeout(fl),ao=!1,gl=null,Jt=!1},onSettingsChange(){let t=qt(),e=Kd(t);e.length!==t.length&&sa(e),tt>e.length&&(tt=e.length)}});var hl="noShareLink",kh=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share"]','button[aria-label="Share chat"]','button[aria-label="\u5206\u4EAB"]'],Ch=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],yl=M({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Xd(t){return`${t.join(",")}{display:none!important}`}function Zd(){let t=[];if(yl.store.hideShareChat!==!1&&t.push(Xd(kh)),yl.store.hideShareProject!==!1&&t.push(Xd(Ch)),!t.length){L(hl);return}k(hl,t.join(`
`))}var Jd=w({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:yl,start:Zd,onSettingsChange:Zd,stop(){L(hl)}});var ef="noDictation",Mh=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]','form button[aria-label="Dictate button"]','form button[aria-label="Dictate"]','form button[aria-label="Start dictation"]','form button[aria-label="Stop dictation"]','form button[aria-label="Submit dictation"]','form button[aria-label^="Dictate" i]','form button[aria-label="\u542C\u5199"]','form button[aria-label="\u5F00\u59CB\u542C\u5199"]','form button[aria-label="\u505C\u6B62\u542C\u5199"]','form button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form button[data-testid="composer-dictate-button"]','form button[data-testid="dictation-button"]'],Ah=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],nf=M({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Qd(t){return`${t.join(",")}{display:none!important}`}function tf(){let t=[Qd(Mh)];nf.store.hideDictationSettings!==!1&&t.push(Qd(Ah)),k(ef,t.join(`
`))}var rf=w({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:nf,start:tf,onSettingsChange:tf,stop(){L(ef)}});var vl="noSidebarIdentity",Jn=[...Ps.split(","),'[data-app-navigation-rail] button[aria-haspopup="menu"]'],sf=Jn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),lf=Jn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Hh=[...sf,...lf],Ih=[...sf,...Jn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Rh=Jn.map(t=>`${t} a[href^="mailto:"]`),Nh=Jn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Ph=Jn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),so=M({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function of(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Oh(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Bh(){return`${Ph.join(",")}{margin-block:auto!important}`}function Dh(){return`${Nh.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function af(){let t=so.store.hideUsername!==!1,e=so.store.hideEmail!==!1,n=t&&so.store.enlargePlan!==!1,r=t&&so.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Oh([...Ih,...lf])),o.push(Bh())):o.push(of(Hh))),e&&o.push(of(Rh)),n&&o.push(Dh()),!o.length){L(vl);return}k(vl,o.join(`
`))}var cf=w({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[S.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:so,start:af,onSettingsChange:af,stop(){L(vl)}});var uf=`#bloom-rt-host {
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
`;var mf=new C("RecentTopics"),er="bloom-rt-host",pf="home",gf=/^\/c\/([a-z0-9_-]{8,})/i,qh=/\/c\/([a-z0-9_-]{8,})/i,bf=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,$h=new Set(["Backquote","IntlBackslash"]),Fh=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),jh=140,zh=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),et=M({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:zh},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),la=null,ca=null,ht=!1,po=!1,lo=!1,Qt=0,hn="",Qn=null,co=null,tr,xl=null,El=null;function Gh(){let t=Number(et.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function uo(){let t=et.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Sl(){let t=et.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function hf(){let t=et.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Tl(){let t=et.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function da(t){let e=Gh();return t.length>e?t.slice(0,e):t}function te(t){return t===pf}function fo(t,e=jh){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Ll(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(gf)?.[1]??""}catch{return t.match(qh)?.[1]??""}}function yn(){let t=(location.pathname||"/").match(gf);if(t?.[1])return t[1];let n=Pt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return pf}function kl(t){if(te(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Ll(r.getAttribute("href")||"")!==t)continue;let o=fo(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return yn()===t&&e&&!/^ChatGPT$/i.test(e)?fo(e,80):""}function Uh(t){if(te(t))return"New chat";let e=Sl()[t];if(e)return e;let n=Fn(t);return n||kl(t)||"Chat"}function Kh(t){return Tl()[t]||""}function Wh(t){return hf()[t]||{}}function Cl(t,e){if(!t||te(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Sl();n[t]!==e&&(n[t]=e,et.store.titles=n)}function Vh(t){t.type==="conversation-meta"&&(Cl(t.conversationId,t.title),ht&&nr())}function Yh(t,e){if(!t||te(t)||!e)return;let n=Tl();n[t]!==e&&(n[t]=e,et.store.projects=n)}function Xh(t,e){if(!t||te(t)||!e.user&&!e.assistant)return;let n=hf(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,et.store.previews=n)}function Ml(t){if(!t||te(t)&&et.store.includeHome===!1)return;let e=uo().filter(n=>n!==t);e.unshift(t),et.store.visits=da(e)}function fa(){let t=et.store.includeHome!==!1;return da(uo().filter(n=>t||!te(n))).map(n=>({id:n,title:Uh(n),project:Kh(n),preview:Wh(n)}))}function df(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return fo(o)}catch{return""}}function mo(t){if(!t||te(t)||t!==yn())return;let e=kl(t);e&&Cl(t,e);let n=df("user"),r=df("assistant");Xh(t,{user:n,assistant:r});let o=vf(t);if(o){let i=yf(o);i&&Yh(t,i)}}function Al(){let t=Sl(),e=Tl(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${er}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Ll(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=fo(c.textContent||"",80);d&&!bf.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=yf(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(et.store.titles=t),i&&(et.store.projects=e);let a=uo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(et.store.visits=da([...a,...l]))}function yf(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=fo((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!bf.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function vf(t){if(te(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Ll(e.getAttribute("href")||"")===t)return e}catch{}return null}function Zh(t){let e=vf(t);if(e){e.click();return}if(te(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Jh(){let t=yn();hn&&hn!==t&&mo(hn),hn=t,Ml(t),Al();let e=kl(t);e&&Cl(t,e),mo(t)}function ua(){tr===void 0&&(tr=window.setTimeout(()=>{tr=void 0,Jh()},120))}function Qh(){Qn||(Qn=history.pushState.bind(history),co=history.replaceState.bind(history),history.pushState=function(...e){let n=Qn(...e);return ua(),n},history.replaceState=function(...e){let n=co(...e);return ua(),n})}function t0(){Qn&&(history.pushState=Qn),co&&(history.replaceState=co),Qn=null,co=null}function e0(t){return $h.has(t.code)||t.keyCode===192?!0:Fh.has(t.key)}function xf(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function n0(t,e){po=e,Al(),mo(yn()),ht=!0,Qt=0;try{let n=yn();Ml(n);let r=fa();r.length>1&&(Qt=t?r.length-1:1)}catch(n){mf.error("Failed to open switcher:",n)}nr()}function ff(t){let{length:e}=fa();e&&(Qt=(Qt+(t?-1:1)+e)%e,nr())}function Hl(){if(!ht)return;let t=fa()[Qt];ht=!1,po=!1,nr(),t&&Zh(t.id)}function Ef(){ht&&(ht=!1,po=!1,nr())}function r0(t){if(xf(t)){lo=!0;return}if((t.ctrlKey||lo)&&!t.altKey&&!t.metaKey&&e0(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{ht?ff(t.shiftKey):n0(t.shiftKey,!0)}catch(n){mf.error("Hotkey failed:",n)}return}if(ht){if(t.key==="Escape"){t.preventDefault(),Ef();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Hl();return}t.key==="Tab"&&(t.ctrlKey||lo)&&(t.preventDefault(),ff(t.shiftKey))}}function o0(t){xf(t)&&(lo=!1,ht&&po&&Hl())}function i0(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ua)}function a0(t){!ht||(t.target instanceof Element?t.target:null)?.closest(`#${er}`)||Ef()}function s0(){document.visibilityState==="hidden"&&mo(yn())}function wl(t=ca){t instanceof HTMLElement&&Ii(t,Hi("auto"),!0)}function l0(){if(!document.body)return null;let t=document.getElementById(er);if(t instanceof HTMLElement)return ca=t,wl(t),t;t=document.createElement("div"),t.id=er;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ca=t,wl(t),t}function nr(){let t=l0();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!ht){e.dataset.visible="false",e.replaceChildren();return}let n=fa();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Qt>=n.length&&(Qt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Qt?"true":"false",s.setAttribute("aria-selected",a===Qt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Qt=a,Hl()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function c0(){document.getElementById(er)?.remove(),ca=null}var wf=w({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${er}`],settings:et,start(){k("recentTopics",uf),hn=yn(),Ml(hn),Al(),mo(hn),xl=Et(Vh),Qh(),la=new AbortController;let{signal:t}=la;window.addEventListener("keydown",r0,{capture:!0,signal:t}),window.addEventListener("keyup",o0,{capture:!0,signal:t}),window.addEventListener("popstate",ua,{signal:t}),document.addEventListener("click",i0,{capture:!0,signal:t}),document.addEventListener("click",a0,{signal:t}),document.addEventListener("visibilitychange",s0,{signal:t}),El=_n("schemeChange",()=>wl())},stop(){la?.abort(),la=null,tr!==void 0&&(clearTimeout(tr),tr=void 0),t0(),xl?.(),xl=null,El?.(),El=null,ht=!1,po=!1,lo=!1,c0()},onSettingsChange(){let t=da(uo());t.length!==uo().length&&(et.store.visits=t),ht&&nr()}});var Il="cleaner",u0=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],d0=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs",'#thread-bottom [class*="vt-disclaimer"]','[data-testid="desktop-app-shell"] [class*="disclaimer"]'],f0=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],m0=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],p0=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],g0=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],vn=M({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function rr(t){return`${t.join(",")}{display:none!important}`}function Sf(){let t=[];if(vn.store.hideDownloadApps!==!1&&t.push(rr(u0)),vn.store.hideDisclaimer!==!1&&t.push(rr(d0)),vn.store.hideUpgrade!==!1&&t.push(rr(f0)),vn.store.hideLockedModels!==!1&&t.push(rr(m0)),vn.store.hideHomePromo!==!1&&t.push(rr(p0)),vn.store.hideAds!==!1&&t.push(rr(g0)),!t.length){L(Il);return}k(Il,t.join(`
`))}var Tf=w({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:vn,start:Sf,onSettingsChange:Sf,stop(){L(Il)}});var pa=new C("ResponseNotification"),ir=M({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:w0},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Rl=!1,ma=null,or=null,go=null;function b0(){return document.visibilityState==="hidden"||document.hidden}function h0(){return ir.store.onlyWhenHidden===!1?!0:b0()}function y0(){let t=Fn(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Lf(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!or||or.state==="closed")&&(or=new t);let e=or,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){pa.debug("chime failed",t)}}function v0(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){pa.debug("custom sound failed",e),Lf()}}function kf(){let t=String(ir.store.soundUrl||"").trim();t?v0(t):Lf()}function x0(){let t="Bloom++",e=`${y0()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){pa.debug("notification failed",n)}}function E0(){h0()&&(ir.store.sound!==!1&&kf(),ir.store.browserNotification!==!1&&x0())}function w0(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>kf()),t.appendChild(e),()=>{e.remove()}}var Cf=w({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ir,start(){Rl=!0,ma?.(),ma=ut(t=>{if(!Rl||t.userStopped||t.error)return;let e=R()||Vn();t.conversationId&&t.conversationId!==e||E0()}),go?.abort(),go=new AbortController,ir.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:go.signal}),pa.debug("watch started")},stop(){Rl=!1,ma?.(),ma=null,go?.abort(),go=null;try{or?.close()}catch{}or=null}});var Mf=`#bloom-pq-chip {
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
`;var je=new C("PromptQueue"),va="bloom-pq-chip",Af="promptQueue",T0=8,L0=50,k0=2e3,C0=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,M0=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Copy"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u590D\u5236"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Nl=M({replacePending:{type:2,description:"Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",default:!1}}),$e=new Map,Hf=0,Ft=!1,$t="",P="",ee=!1,yt=!1,Ge=!1,B=null,bo=null,ga=null,qe,Eo,ze=null,N=null,ar=null,ha=!1,st=null,xn,Fe=!0,U=!1,G=!1,ft=!1;function me(){return le(Pt())}function sr(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function A0(t){let e=sr(Vt(t));if(e)return e;if(!Wt(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),sr(n.innerText||n.textContent||"")}catch{return""}}function Df(){try{let t=document.querySelectorAll(Nu),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function _f(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function qf(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&C0.test(n))return!0}}catch{}return!1}function ya(){let t=Vn();if(!t)return!1;let e=R();return!e||e===t}function xo(){if(W()||ya())return!1;let t=Df();if(!t)return!0;if(_f(t)||qf(t))return!1;try{if(t.querySelector(M0)||t.querySelector('img[alt="Generated image"]'))return!0}catch{}return!1}function H0(){if(z()||fn())return U=!1,!1;if(W()||ya())return U=!0,!0;let t=Df();return t&&(_f(t)||qf(t))?(U=!0,!0):U&&!xo()?!0:(U=!1,!1)}function $f(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Kt);return n instanceof HTMLElement?n:null}function If(t){return $f(t)??at()}function xa(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Ff(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function I0(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?sr(e.innerText||e.textContent||""):""}catch{return""}}function R0(){return Hf+=1,`pq${Date.now().toString(36)}${Hf.toString(36)}`}function Y(t){return $e.get(t)??[]}function jf(t){return Y(t)[0]}function En(t,e){e.length?$e.set(t,e):$e.delete(t)}function zf(t){if(!Y(t).length){G=!1,ft=!1,P="";return}G=!0,ft=!1,U=!0,P=""}function Rf(t){if(!$t||$t===t)return;let e=$e.get($t);!e?.length||$e.has(t)||V($t,t)&&($e.delete($t),$e.set(t,e),P===$t&&(P=t),B?.key===$t&&(B.key=t),je.debug("migrated pending",$t,"\u2192",t))}function Ea(t){let e=me(),n=Y(e);if(Nl.store.replacePending&&n.length){let o=n[n.length-1];o.text=t,o.at=Date.now(),En(e,n)}else if(n.length>=T0){je.debug("queue full",e);return}else n.push({id:R0(),text:t,at:Date.now()}),En(e,n);U=!0,B={key:e,text:t,turns:Ff(),ticks:3};let r=at();r&&fe(r,"");try{lt()}catch(o){je.error("chip",o)}je.debug("queued",e,n.length,t.length)}function Gf(t,e){let n=Y(t).filter(r=>r.id!==e);if(En(t,n),N===e&&(N=null),!n.length)P===t&&(P=""),B?.key===t&&(B=null);else if(B?.key===t){let r=B.text;n.some(o=>o.text===r)||(B=null)}lt()}function Bl(){ar?.abort(),ar=null}function N0(t,e){let n=e.length;for(let r=0;r<e.length;r++)if(t<e[r]){n=r;break}return n}function Nf(t,e,n){let r=Array.from({length:t},(a,s)=>s);if(n===e||n===e+1)return r;let[o]=r.splice(e,1),i=n;return i>e&&(i-=1),r.splice(Math.max(0,Math.min(i,r.length)),0,o),r}function P0(t,e,n,r){t.addEventListener("pointerdown",o=>{if(o.button!==0||N||st)return;let i=o.target;if(i instanceof Element&&i.closest("button, textarea, a, input"))return;let a=o.pointerId,s=o.clientX,l=o.clientY;ar?.abort();let c=new AbortController;ar=c;let{signal:u}=c,d=!1,f=!1,m=0,p=0,b=0,g=0,E=null,h=[],x=[],mt=()=>{e.classList.add("bloom-pq-settling");for(let y of h)y.style.transform="";requestAnimationFrame(()=>e.classList.remove("bloom-pq-settling"))},pt=()=>{t.classList.remove("bloom-pq-lift"),t.style.position="",t.style.left="",t.style.top="",t.style.width="",t.style.margin="",t.style.zIndex="",t.style.boxSizing="",t.style.pointerEvents="",t.style.color="",t.style.font="",t.setAttribute("aria-pressed","false"),t.parentElement!==e&&e.isConnected&&(E?.isConnected?E.before(t):e.append(t)),E?.remove(),E=null,mt(),document.body.style.cursor==="grabbing"&&(document.body.style.cursor="")},Z=()=>{ha=!0;let y=A=>{A.preventDefault(),A.stopPropagation()};window.addEventListener("click",y,!0),setTimeout(()=>{ha=!1,window.removeEventListener("click",y,!0)},0)},O=()=>{let y=Nf(h.length,m,p),A=x.length>1?(x[x.length-1].top-x[0].top-x.slice(0,-1).reduce((H,zt)=>H+zt.height,0))/(x.length-1):2,gt=new Array(x.length),xt=x[0]?.top??0;for(let H of y)gt[H]=xt,xt+=x[H].height+A;for(let H=0;H<h.length;H++){if(H===m)continue;let zt=gt[H]-x[H].top;h[H].style.transform=Math.abs(zt)<.5?"":`translate3d(0,${Math.round(zt)}px,0)`}},ct=()=>{let y=Y(n).slice();if(m<0||m>=y.length)return;let A=Nf(y.length,m,p);if(A.every((H,zt)=>H===zt))return;let gt=A.map(H=>y[H]).filter(Boolean);if(gt.length!==y.length)return;En(n,gt);let xt=new Map(h.map(H=>[H.dataset.pqId||"",H]));for(let H of gt){let zt=xt.get(H.id);zt&&e.append(zt)}},vt=y=>{if(f)return;f=!0;let A=d;ar===c&&(ar=null),A&&y&&t.isConnected&&ct(),pt(),A&&Z(),c.abort()};u.addEventListener("abort",()=>{if(f)return;f=!0;let y=d;pt(),y&&Z()});let Qo=()=>{d=!0,h.push(...e.querySelectorAll(":scope > .bloom-pq-row")),m=h.indexOf(t),m<0&&(m=h.findIndex(H=>H.dataset.pqId===r)),p=m<0?0:m;let y=t.getBoundingClientRect();b=y.left,g=y.top;let A=getComputedStyle(t);E=document.createElement("div"),E.className="bloom-pq-gap",E.style.height=`${y.height}px`,t.before(E),document.body.append(t),t.classList.add("bloom-pq-lift"),t.style.position="fixed",t.style.left=`${y.left}px`,t.style.top=`${y.top}px`,t.style.width=`${y.width}px`,t.style.margin="0",t.style.zIndex="10001",t.style.boxSizing="border-box",t.style.pointerEvents="none",t.style.color=A.color,t.style.font=A.font,t.setAttribute("aria-pressed","true"),document.body.style.cursor="grabbing";let gt=e.getBoundingClientRect(),xt=e.scrollTop;x=h.map(H=>{let fs=(H===t?E:H).getBoundingClientRect(),qc=fs.top-gt.top+xt;return{top:qc,height:fs.height,mid:qc+fs.height/2}})},v=y=>{if(y.pointerId!==a||f||!d&&(Math.hypot(y.clientX-s,y.clientY-l)<6||(Qo(),!d||m<0)))return;y.preventDefault(),t.style.left=`${b+(y.clientX-s)}px`,t.style.top=`${g+(y.clientY-l)}px`;let A=e.getBoundingClientRect(),gt=y.clientY-A.top+e.scrollTop,xt=N0(gt,x.map(H=>H.mid));xt!==p&&(p=xt,O())},I=y=>{y.pointerId===a&&vt(!0)};window.addEventListener("pointermove",v,{signal:u}),window.addEventListener("pointerup",I,{signal:u}),window.addEventListener("pointercancel",()=>vt(!1),{signal:u})})}function O0(){yt=!0,clearTimeout(Eo),Eo=setTimeout(()=>{yt=!1,Eo=void 0},k0)}function B0(t){if(st)return;let e=me(),n=Y(e).find(i=>i.id===t);if(!n)return;let r=at();if(!r)return;let o=n.text;st=t,N===t&&(N=null),Bl(),lt(),clearTimeout(xn),xn=setTimeout(()=>{if(xn=void 0,!Ft||st!==t)return;if(st=null,me()!==e||!Y(e).some(a=>a.id===t)){lt();return}En(e,Y(e).filter(a=>a.id!==t)),lt(),O0(),fe(r,o);let i=Re();i&&!q(i)&&!Wi(i)&&(i.click(),yt=!1),zf(e)},160)}function ho(t){if(!Ft||ee||G||st||W()||me()!==t)return;let e=jf(t);if(!e){P="";return}if(Xt())return;let n=at();if(!n)return;if(!Ie(n)){let o=sr(Vt(n));if(o&&o!==e.text)return}let r=Re();!r||q(r)||Wi(r)||(ee=!0,fe(n,e.text),clearTimeout(qe),qe=setTimeout(()=>D0(t,e.id,e.text),L0))}function D0(t,e,n){qe=void 0;try{if(!Ft||G||st)return;let r=jf(t);if(!r||r.id!==e||r.text!==n||W()||me()!==t)return;let o=at();if(!o)return;let i=sr(Vt(o));if(i&&i!==n&&!Ie(o))return;i!==n&&fe(o,n);let a=Re();if(!a||q(a)||Wi(a))return;a.click(),En(t,Y(t).filter(s=>s.id!==e)),lt(),zf(t),je.debug("drained",t,Y(t).length)}finally{ee=!1}}function Pl(t){t.style.position="fixed",t.style.zIndex="9999",t.style.transform="none";let e=Dt(),n=e&&e!==document.body?e.getBoundingClientRect():null;if(!(!!n&&n.width>=160&&n.bottom>0&&n.top<window.innerHeight)||!n){let a=Math.min(640,window.innerWidth-16);t.style.width=`${Math.round(a)}px`,t.style.left=`${Math.round((window.innerWidth-a)/2)}px`,t.style.bottom="6.5rem";return}let o=Math.round(Math.max(240,Math.min(n.width,window.innerWidth-16))),i=n.left+n.width/2;t.style.left=`${Math.round(i-o/2)}px`,t.style.width=`${o}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`}function Ol(){Bl(),ze?.remove(),ze=null,N=null,Fe=!0}var Uf="http://www.w3.org/2000/svg";function _0(){let t=document.createElementNS(Uf,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t}function yo(t){let e=_0();for(let n of t){let r=document.createElementNS(Uf,"path");r.setAttribute("d",n),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}function vo(t,e,n,r,o,i=!1){let a=document.createElement("button");return a.type="button",a.className="bloom-pq-ico",a.setAttribute("aria-label",t),i&&(a.disabled=!0),a.append(e),r&&Kf(a,r,o??t),a.addEventListener("mousedown",s=>s.preventDefault()),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),n()}),a}function q0(t){return!!(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(`#${va}`)}function ba(){let t=ze?.querySelector(".bloom-pq-editing");return t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLElement?t.innerText:null}function $0(t){if(t.focus(),t instanceof HTMLTextAreaElement){let r=t.value.length;t.setSelectionRange(r,r);return}let e=window.getSelection();if(!e)return;let n=document.createRange();n.selectNodeContents(t),n.collapse(!1),e.removeAllRanges(),e.addRange(n)}function _e(t,e){if(N!==t)return;if(N=null,e===null){lt();return}let n=sr(e),r=me();if(!n){Gf(r,t);return}let o=Y(r).find(i=>i.id===t);o&&(o.text=n),lt()}function Pf(t){st||N!==t&&(N&&_e(N,ba()),Y(me()).some(e=>e.id===t)&&(N=t,Fe=!0,lt()))}function Kf(t,e,n){t.addEventListener("pointerenter",()=>{e.textContent=n,e.hidden=!1}),t.addEventListener("pointerleave",()=>{e.textContent===n&&(e.hidden=!0)})}function Of(t){return N===t?"edit":st===t?"send":"text"}function F0(t){return t.querySelector("textarea.bloom-pq-editing")?"edit":t.dataset.pqState==="sending"?"send":"text"}function j0(t,e){let n=t.querySelector(":scope > .bloom-pq-list"),r=t.querySelector(".bloom-pq-toggle"),o=t.querySelector(".bloom-pq-count");if(!n||!r||!o)return!1;let i=[...n.querySelectorAll(":scope > .bloom-pq-row")];if(i.length!==e.length)return!1;let a=new Map(i.map(s=>[s.dataset.pqId||"",s]));for(let s of e){let l=a.get(s.id);if(!l||F0(l)!==Of(s.id))return!1}o.textContent=String(e.length),r.setAttribute("aria-expanded",Fe?"true":"false"),n.hidden=!Fe;for(let s of e){let l=a.get(s.id);if(Of(s.id)==="text"){let c=l.querySelector(":scope > .bloom-pq-body > .bloom-pq-text");c&&c.textContent!==s.text&&(c.textContent=s.text)}l.getAttribute("aria-pressed")==="true"&&l.setAttribute("aria-pressed","false"),n.append(l)}return!0}function lt(){if(Bl(),!Ft||!document.body){Ol();return}let t=me(),e=Y(t);if(!e.length){Ol();return}N&&!e.some(d=>d.id===N)&&(N=null),st&&!e.some(d=>d.id===st)&&(st=null);let n=ze;if(n?.isConnected||(n=document.createElement("div"),n.id=va,document.body.appendChild(n),ze=n),j0(n,e)){Pl(n);return}n.replaceChildren(),n.setAttribute("role","region"),n.setAttribute("aria-label","Queued messages");let r=e.length,o=document.createElement("div");o.className="bloom-pq-head";let i=document.createElement("button");i.type="button",i.className="bloom-pq-toggle",i.setAttribute("aria-label","Toggle queued messages"),i.setAttribute("aria-expanded",Fe?"true":"false");let a=document.createElement("span");a.className="bloom-pq-count",a.textContent=String(r);let s=document.createElement("span");s.className="bloom-pq-title line-clamp-2",s.textContent="Queued messages",i.append(a,s),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Fe=!Fe,lt()});let l=document.createElement("span");l.className="bloom-pq-tip",l.hidden=!0,o.append(i,l);let c=document.createElement("div");c.className="bloom-pq-list",Fe||(c.hidden=!0);let u=null;for(let d of e){let f=document.createElement("div");f.className="bloom-pq-row",f.dataset.pqId=d.id;let m=N===d.id,p=st===d.id;m||(f.setAttribute("role","button"),f.tabIndex=p?-1:0,f.setAttribute("aria-roledescription","sortable"),f.setAttribute("aria-pressed","false"),p&&(f.dataset.pqState="sending",f.setAttribute("aria-disabled","true")));let b=document.createElement("div");b.className="bloom-pq-body";let g;if(m){let h=document.createElement("textarea");h.className="bloom-pq-text bloom-pq-editing",h.value=d.text,h.rows=2,h.spellcheck=!1,h.setAttribute("aria-label","Queued message text"),h.addEventListener("keydown",x=>{x.stopPropagation(),x.key==="Enter"&&!x.shiftKey?(x.preventDefault(),_e(d.id,h.value)):x.key==="Escape"&&(x.preventDefault(),_e(d.id,null))}),h.addEventListener("blur",()=>_e(d.id,h.value)),g=h,u=h}else{let h=document.createElement("span");h.className="bloom-pq-text line-clamp-2",h.textContent=p?"Sending":d.text,p?Kf(h,l,"Sending now"):h.addEventListener("click",x=>{if(ha){ha=!1,x.preventDefault(),x.stopPropagation();return}x.preventDefault(),x.stopPropagation(),Pf(d.id)}),g=h}b.append(g),f.append(b);let E=document.createElement("div");if(E.className="bloom-pq-rail",m){let h=vo("Save",yo(["M20 6 9 17l-5-5"]),()=>{_e(d.id,g instanceof HTMLTextAreaElement?g.value:ba())},l),x=vo("Cancel",yo(["M18 6 6 18","m6 6 12 12"]),()=>{_e(d.id,null)},l);E.append(h,x)}else{let h=vo("Remove from queue",yo(["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),()=>{N&&N!==d.id&&_e(N,ba()),N=N===d.id?null:N,Gf(t,d.id)},l,void 0,p),x=vo("Edit queued message",yo(["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"]),()=>Pf(d.id),l,"Edit",p),mt=vo("Send now",yo(["M12 19V5","M6 11 12 5l6 6"]),()=>{N&&N!==d.id&&_e(N,ba()),B0(d.id)},l,"Send now (or Enter on empty composer)",p);E.append(h,x,mt)}f.append(E),!m&&!p&&P0(f,c,t,d.id),c.append(f)}if(n.append(o,c),Pl(n),u){let d=u,f=N;queueMicrotask(()=>{N===f&&d.isConnected&&$0(d)})}}function z0(){if(!B)return;B.ticks-=1;let t=Y(B.key);if(t.length&&Ff()>B.turns){let e=I0();if(e&&e===B.text){je.debug("native send leaked; dropping matching item");let n=-1;for(let r=t.length-1;r>=0;r--)if(t[r]?.text===B.text){n=r;break}n>=0&&t.splice(n,1),En(B.key,t),!t.length&&P===B.key&&(P=""),B=null,lt();return}}B.ticks<=0&&(B=null)}function wa(t){return!H0()||!Wt(t)?"":A0(t)}function G0(t){if(!Ft||t.isComposing||t.keyCode===229||t.key!=="Enter"||q0(t.target)||t.shiftKey||t.ctrlKey||t.metaKey||ee)return;let e=If(t.target)??If(document.activeElement);if(!e)return;if(t.altKey||yt){yt=!1,Ge=!0,queueMicrotask(()=>{Ge=!1});return}let n=wa(e);n&&(xa(t),Ea(n))}function U0(t){if(!Ft||ee||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Ge){Ge=!1;return}if(yt){yt=!1;return}let e=$f(t.target);if(!e)return;let n=wa(e);n&&(xa(t),Ea(n))}function K0(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||q(e))return null;let n=t.closest(Wn);if(n instanceof HTMLElement&&!q(n))return n;let r=Re();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Bf(t){if(!Ft)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${va}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&q(n)||ee||!K0(e))return;if(yt){yt=!1;return}let r=at();if(!r)return;let o=wa(r);o&&(xa(t),Ea(o))}function W0(t){if(!Ft)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Ki)&&!e.querySelector(Kt)||ee)return;if(Ge){Ge=!1;return}if(yt){yt=!1;return}let n=at()??e.querySelector(Kt);if(!n)return;let r=wa(n);r&&(xa(t),Ea(r))}var Wf=w({name:"PromptQueue",description:"Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Af,cleanupSelectors:[`#${va}`],settings:Nl,start(){Ft=!0;let t=Nl.store;t.queueModeRev!==1&&(t.replacePending=!1,t.queueModeRev=1),$t=me(),P="",ee=!1,yt=!1,Ge=!1,B=null,U=!z()&&!fn()&&(W()||ya()),G=!1,ft=!1,N=null,st=null,clearTimeout(xn),xn=void 0,k(Af,Mf),bo?.abort(),bo=new AbortController;let{signal:e}=bo,n={capture:!0,signal:e};window.addEventListener("keydown",G0,n),document.addEventListener("beforeinput",U0,n),document.addEventListener("pointerdown",Bf,n),document.addEventListener("click",Bf,n),document.addEventListener("submit",W0,n),ga?.(),ga=ut({onFall(r){if(Ft){if(r.userStopped||r.error){U=!1,G=!1,ft=!1,P="",lt();return}if(!(G&&!ft)){if(G&&ft){if(!xo())return;G=!1,ft=!1,U=!1,P=r.contextKey,ho(r.contextKey);return}if(!xo()){je.debug("unsettled fall; keep queue window");return}U=!1,P=r.contextKey,ho(r.contextKey)}}},onRise(){z()||fn()||(G&&(ft=!0),U=!0)},onContext(r,o){o&&r&&!V(o,r)&&(U=!1,G=!1,ft=!1,P="",ee=!1,qe!==void 0&&(clearTimeout(qe),qe=void 0)),Rf(r),$t=r,lt()},onTick(r){Rf(r.contextKey),$t=r.contextKey,z0(),(z()||fn())&&(G=!1,ft=!1,U=!1,P=""),G&&(W()||ya())&&(ft=!0),G&&ft&&xo()&&(G=!1,ft=!1,U=!1,Y(r.contextKey).length&&(P=r.contextKey,ho(r.contextKey))),!G&&U&&xo()&&(U=!1,!P&&Y(r.contextKey).length&&(P=r.contextKey,ho(r.contextKey))),!G&&P&&P===r.contextKey&&ho(P),Y(r.contextKey).length&&!ze?.isConnected?lt():ze&&Pl(ze)}}),lt(),je.debug("watch started")},stop(){Ft=!1,ga?.(),ga=null,bo?.abort(),bo=null,clearTimeout(qe),qe=void 0,clearTimeout(Eo),Eo=void 0,clearTimeout(xn),xn=void 0,st=null,$e.clear(),B=null,P="",ee=!1,yt=!1,Ge=!1,U=!1,G=!1,ft=!1,Ol()}});var Vf=`.bloom-cls {
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
`;var Zf=new C("ChatListStatus"),Yf="chatListStatus",La="bloom-cls",Y0="bloom-cls",X0=1200*1e3,Z0="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",jt=new Map,ne=!1,kt="",pe=!1,ur=!1,Ct=0,Ue=null,ql=null,lr=null,Dl=null,Sa=null,wo=null,cr=!1,Ke=new Set;function Ta(){return Date.now()}function Jf(){return Ou()||document.querySelector("nav")||null}function ge(t,e,n,r=!0){if(!(!t||!ne)){if(e==="idle")jt.delete(t);else{let o=jt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ta():jt.set(t,{kind:e,at:Ta(),source:n})}r&&J0({v:1,id:t,kind:e,at:Ta()}),wn()}}function J0(t){try{lr?.postMessage(t)}catch{}}function Q0(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ge(e.id,e.kind,"bc",!1)}function ty(){let t=Ta();for(let[e,n]of jt)n.kind==="streaming"&&t-n.at>X0&&jt.delete(e)}function ey(){let t=Jf();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll(Au)){if(r.closest(Z0))continue;let o=ce(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Xf(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function _l(t){let e=t.querySelector(`:scope > .${La}`);return e||null}function $l(){if(!ne)return;ty();let t=R(),e=ey();Ue?.disconnect();try{for(let n of e){let r=ce(n.getAttribute("href")||"");if(!r||!t||r!==t){_l(n)?.remove();continue}let i=jt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){_l(n)?.remove();continue}let a=_l(n);a||(a=document.createElement("span"),a.className=La,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Xf("streaming")):i==="error"&&a.appendChild(Xf("error")))}}catch(n){Zf.debug("paint failed",n)}Qf()}function wn(){if(ne){if(document.hidden){Ct&&(cancelAnimationFrame(Ct),Ct=0),$l();return}Ct||(Ct=requestAnimationFrame(()=>{Ct=0,ne&&$l()}))}}function Qf(){let t=Jf();if(!(Ue&&ql===t&&t?.isConnected)){if(Ue?.disconnect(),ql=t,!t){Ue=null;return}Ue=new MutationObserver(()=>wn()),Ue.observe(t,{childList:!0,subtree:!0})}}function ka(){return!!(sn()||eo())}function ny(t){return!!(cr||t&&Ke.has(t)||!ur&&!z()&&ka())}function ry(t){if(ne){if(t.type==="post-start"){ur=!1,t.conversationId?(cr=!1,Ke.add(t.conversationId),pe=!0,ge(t.conversationId,"streaming","net")):(cr=!0,pe=!0);return}if(t.type==="post-end"){if(cr=!1,t.conversationId){Ke.delete(t.conversationId);let e=R(),n=Vn();(e?t.conversationId===e:t.conversationId===n)?ge(t.conversationId,t.error?"error":"done","net"):ge(t.conversationId,"idle","net")}ka()||(pe=!1)}}}function oy(t,e){if(!ne)return;if(V(e,t)){wn();return}let n=R();if(kt&&kt!==n){Ke.delete(kt);let r=jt.get(kt);r&&r.kind!=="idle"&&ge(kt,"idle","local")}cr=!1,pe=!1,ur=!0,n&&jt.get(n)?.kind==="streaming"&&jt.get(n)?.source==="local"&&!Ke.has(n)&&ge(n,"idle","local"),wn()}function iy(t){if(!ne)return;let e=t.conversationId||R();if(kt&&e&&kt!==e){Ke.delete(kt);let r=jt.get(kt);r&&r.kind!=="idle"&&ge(kt,"idle","local"),pe=!!(e&&Ke.has(e))}if(e&&(kt=e),ur||z()){if(z()||ka()||t.streaming){wn();return}ur=!1}if(ny(e)&&(t.streaming||ka())){pe=!0,e&&ge(e,"streaming","local"),wn();return}pe&&(pe=!1,e&&ge(e,Xt()?"error":"done","local")),wn()}var tm=w({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${La}`],start(){ne=!0,k(Yf,Vf);try{lr=new BroadcastChannel(Y0)}catch{lr=null}lr?.addEventListener("message",Q0),Dl=Et(ry),Sa?.(),Sa=ut({onTick:iy,onContext:oy}),wo?.abort(),wo=new AbortController,document.addEventListener("visibilitychange",()=>{ne&&(Ct&&(cancelAnimationFrame(Ct),Ct=0),$l())},{signal:wo.signal}),Qf(),Zf.debug("sidebar status watch started")},stop(){ne=!1,Ct&&cancelAnimationFrame(Ct),Ct=0,wo?.abort(),wo=null,Ue?.disconnect(),Ue=null,ql=null,Sa?.(),Sa=null,Dl?.(),Dl=null;try{lr?.close()}catch{}lr=null,jt.clear(),Ke.clear(),cr=!1,pe=!1,ur=!1,kt="",document.querySelectorAll(`.${La}`).forEach(t=>t.remove()),L(Yf)}});var nm="widerChat",rm=40,om=96,im=64,am=M({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:rm,max:om,default:im}});function ay(){return ot(Number(am.store.width??im),rm,om)}function em(){let t=ay(),e=`min(100%,${t}rem)`;k(nm,`:root,#thread,#thread-bottom-container,#thread-bottom,[data-chatgpt-conversation-selection-target],[data-testid="desktop-app-shell"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var sm=w({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:am,start:em,onSettingsChange:em,stop(){L(nm)}});var Fl="composerOpacity",dr='form[data-type="unified-composer"],form.w-full[data-type]',sy=[`${dr} [class*="corner-superellipse"]`,`${dr} [class*="bg-token-bg-primary"]`,`${dr} [class*="bg-token-main-surface"]`,'form [class*="corner-superellipse"]','#thread-bottom-container [class*="corner-superellipse"]','#thread-bottom [class*="corner-superellipse"]'].join(","),ly=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),cy="#thread-bottom-container,#thread-bottom",uy=`${dr} #prompt-textarea,${dr} [contenteditable="true"],#mobile-composer-prompt,textarea[name="prompt"]`,dy="var(--bg-primary,var(--main-surface-primary,#ffffff))",jl=M({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function fy(){return ot(Number(jl.store.opacity??100),0,100)}function my(){return ot(Number(jl.store.blur??16),0,40)}function lm(){let t=fy();if(t>=100){L(Fl);return}let e=my(),n=`color-mix(in srgb,${dy} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";k(Fl,`${cy}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${ly}{display:none!important}${dr}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${sy}{background-color:${n}!important;background-image:none!important;${r}}${uy}{background-color:transparent!important;background-image:none!important}`)}var cm=w({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[S.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:jl,start:lm,onSettingsChange:lm,stop(){L(Fl)}});var um=`#bloom-bn-host {
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
`;var gy=new C("BetterNavigator"),zl="betterNavigator",bm="bloom-bn-host",kn=60,dm=16,Wl=1e3,fm=2400,by=80,hm=2.5,hy=.4,So="\u6B63\u5728\u8F93\u51FA\u2026",Vl="Image",yy="\u2753",vy="\u{1F916}",mm=/file_[0-9a-f]+/gi,xy="File",Ey="Code",wy=".markdown, .whitespace-pre-wrap",tc=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Sy="img, picture, video, canvas",Ty=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,Ly=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Ro=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,ky=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Cy=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,My=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,Ay=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,Hy=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,Iy=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Ry=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Ny=2e3,Py=40,Oy=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,ym=Iu,By=["#thread-bottom-container","#thread-bottom","#prompt-textarea","#mobile-composer-prompt","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']",'textarea[name="prompt"]'].join(", "),Dy=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),_y=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),mr=M({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),he=new Map,Mo=new Map,re=new Set,Aa=0,Ht=!1,ye=!1,fr=!1,We=null,No=null,pr=null,Ha=null,F=[],Ln="",Ia=0,Ao=-1,Ho=0,Ra="",At=0,be=0,To,Lo=null,Ca=null,Gl=null,Ul=null,Sn=null,Yl=null,ko=null,Tn=null,ve=null,Co=null,Na=!1,Xl=0;function gr(){return Ti()}function Kl(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function qy(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function $y(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-'], [data-chatgpt-search-message-ids]"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Oy.test(qy(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Kl(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Kl(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Kl(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Io(t){try{return!!t.closest(By)}catch{return!0}}function pm(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Ba(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||Li(t)||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function ec(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function Fy(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Ma(t,e){if(t){mm.lastIndex=0;for(let n of t.matchAll(mm))e.add(n[0].toLowerCase())}}function jy(t){try{let e=new Set,n=s=>{Fy(s)||(Ma(s.getAttribute("src")||"",e),Ma(s.getAttribute("srcset")||"",e),Ma(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Ma(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Ba(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function zy(t,e){let n=jy(t),r=Mo.get(e)??0,o=Math.max(r,n);return o>0&&Mo.set(e,o),o>=2?`${Vl} x${o}`:Vl}function X(t){return t.replace(/\s+/g," ").trim()}function vm(t,e){let n=t;for(;n&&n!==e;){if(n.matches(Dy))return!0;n=n.parentElement}return!1}function Pa(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(vm(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(tc);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return X(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<kn+20;)e.push(X(r.textContent||""));return X(e.join(" "))}function Po(t){let e=X(t);return e.length<3||e.length>180||Ro.test(e)?!1:Ty.test(e)?!0:Ly.test(e)}function Da(t){let e=X(t);return e.length<8||e.length>120||/\s/.test(e)||Ro.test(e)||Po(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function Gy(t){let e=[],n=i=>{let a=X(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(X(s[1])),e.push(X(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function Uy(t){try{return Io(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function nc(t){let e=X(t);return!e||rc(e)||Da(e)?!0:Po(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function Ky(t){return!t.length||t.length>4||!t.every(e=>nc(e))?!1:t.some(e=>Ro.test(X(e))||Po(e)||Da(e))}function xm(t){try{let e=null,n=0,r=`${tc}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(Uy(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=Gy(o);if(!i.length||i.length>4||i.join(" ").length>240||!Ky(i))continue;let a=i.some(c=>Ro.test(X(c))),s=i.some(c=>Po(c)||Da(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function Wy(t){return xm(t)?xy:""}function Vy(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(ky.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function Yy(t){try{for(let e of t.querySelectorAll(Sy))if(!Vy(e))return!0}catch{}return!1}function rc(t){let e=X(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||Ay.test(e)||My.test(e)?!0:e.length<=24&&(Hy.test(e)||Ro.test(e))}function Xy(t){let e=[],n=new Set,r=o=>{try{if(vm(o,t)||o.closest(tc))return}catch{return}let i=Pa(o);!i||n.has(i)||rc(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>kn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Pa(o).length<24)&&(r(o),e.join(" ").length>kn+20))break}}catch{}return X(e.join(" "))}function Zy(t){let e=xm(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=X(i.innerText||i.textContent||"");!a||a.length>kn+20||r.has(a)||nc(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return X(n.join(" "))}function Jy(t,e){let n=[];try{for(let o of t.querySelectorAll(wy)){if(Io(o))continue;let i=Pa(o);if(!(!i||e==="assistant"&&rc(i)||nc(i))&&(n.push(i),n.join(" ").length>kn+20))break}}catch{}let r=X(n.join(" "));if(e==="user"){let o=Zy(t);if(o)return o}return r||(e==="assistant"?Xy(t):"")}function Qy(t){return t.length>kn?`${t.slice(0,kn).trimEnd()}\u2026`:t}function gm(t){return Iy.test(t)}function tv(t,e,n,r){let o=Jy(t,e);if(o)return Qy(o);if(r)return So;let i=Wy(t);if(i)return i;if(ec(t))return zy(t,Ba(t));try{if(Yy(t))return Vl;if(t.querySelector("pre, code"))return Ey}catch{}return`Message ${n+1}`}function ev(){if(ye)return!0;let t=R();return!!(t&&re.has(t)||!fr&&!z()&&Oo())}function Oo(){return!!(sn()||eo())}function nv(){Aa=Date.now()}function Em(t){ye=!1,t&&re.delete(t);let e=R();e&&re.delete(e)}function rv(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function ov(t){if(ec(t)||!Oo())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Pa(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function oc(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=X(e.textContent||"");if(!(n.length>32)&&Cy.test(n))return!0}}catch{}return!1}function wm(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function iv(t,e){try{if(rv(t))return!0;if(!e)return!1;if(ov(t)||oc(t))return!0}catch{}return!1}function Sm(t){if(!t||Oo())return!1;try{if(oc(t)||wm(t))return!1;if(t.querySelector(Ry)||ec(t))return!0}catch{}return!1}function av(t){if(Oo()||Aa&&Date.now()-Aa<Ny)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!Sm(e.el)||Em()}function sv(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(ym)){if(Io(r))continue;let i=Ba(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(Io(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function lv(t){return Is(t)}function cv(t){let e=mr.store.showAssistant!==!1,n=e&&ev(),r=sv(t),o=null;if(e)for(let a of r)pm(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Ba(a);if(!s)continue;let l=pm(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&oc(a),d=c&&wm(a),f=l==="assistant"&&c&&!Sm(a)&&(u||d||n||iv(a,!0)),m=tv(a,l,i.length,f);if(m&&m!==So){let b=he.get(s),g=!!b&&(Po(b)||Da(b));(!b||g||!gm(m)||gm(b))&&m!==b&&he.set(s,m)}let p=f&&m===So?So:he.get(s)||m;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return i}function uv(t){let e=new Map;for(let n of t)if(e.set(n.id,n),!!n.el)for(let r of lv(n.el))e.set(r,n);return e}function dv(t,e){if(e)return e.text&&e.text!==So&&he.set(t.id,e.text),{...e,id:t.id};let n=he.get(t.id)||(t.alias?he.get(t.alias):"")||"";return{id:t.id,el:null,role:t.role,text:n||t.text||"Message"}}function fv(t,e){let n=mr.store.showAssistant!==!1,r=uv(e),o=new Set,i=[];for(let s of t){if(s.role==="assistant"&&!n)continue;let l=r.get(s.id)||(s.alias?r.get(s.alias):void 0),c=dv(s,l);c.el&&o.add(c.el),i.push(c)}for(let s=0;s<e.length;s++){let l=e[s];if(!l.el||o.has(l.el))continue;let c=i.length;for(let u=s-1;u>=0;u--){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f+1;break}}if(c===i.length)for(let u=s+1;u<e.length;u++){let d=e[u].el;if(!d)continue;let f=i.findIndex(m=>m.el===d);if(f>=0){c=f;break}}i.splice(c,0,l),o.add(l.el)}let a=-1;for(let s=0;s<i.length;s++)i[s].role==="assistant"&&(a=s);for(let s=0;s<i.length;s++)i[s].live&&s!==a&&(i[s].live=!1);return i}function mv(){let t=gr();if(!t||t===document.body)return[];let e=cv(t),n=R(),r=n?Dr(n):[],o=r.length?fv(r,e):e;return av(o),o}function Tm(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function _a(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function ic(t){return t===window?window.innerHeight:t.clientHeight}function pv(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(_y)}catch{return!1}}function Lm(){To!==void 0&&(clearTimeout(To),To=void 0),Lo?.classList.remove("bloom-bn-flash"),Lo=null}function km(t){Lm(),t.classList.add("bloom-bn-flash"),Lo=t,To=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Lo===t&&(Lo=null),To=void 0},800)}function Oa(t){if(!F.length)return;let e=Math.max(0,Math.min(t,F.length-1));Ia=e,No?.querySelectorAll(".bloom-bn-tick").forEach((n,r)=>{n.classList.toggle("bloom-bn-current",r===e)}),pr?.querySelectorAll(".bloom-bn-item").forEach((n,r)=>{n.classList.toggle("bloom-bn-active",r===e)}),Ha&&(Ha.textContent=`${e+1} / ${F.length}`)}function Cm(t){if(Na)return;let e=pr?.children[t];e instanceof HTMLElement&&e.scrollIntoView({block:"nearest"})}function Zl(t){let e=F[t];if(!e)return;let n=e.el?.isConnected?e.el:Mm(e.id);if(!n){hv(t);return}e.el=n,Ao=t,Ho=Date.now()+Wl,Oa(t),Cm(t);let r=ve??_a(n),i=Math.abs(n.getBoundingClientRect().top-Tm())>hm*ic(r);n.scrollIntoView({behavior:i?"auto":"smooth",block:"start"}),mr.store.jumpEffect!=="none"&&km(n)}function Mm(t){let e=gr();if(!e||e===document.body||!t)return null;let n=[t],r=R(),i=(r?Dr(r):[]).find(a=>a.id===t||a.alias===t);i?.alias&&!n.includes(i.alias)&&n.push(i.alias),i&&!n.includes(i.id)&&n.push(i.id);for(let a of n){let s=null;try{let c=CSS.escape(a);s=e.querySelector(`[data-turn-id="${c}"], [data-message-id="${c}"], [data-chatgpt-search-message-ids~="${c}"]`)}catch{}if(!s||Io(s))continue;let l=s.closest(ym);return l instanceof HTMLElement?l:s}return null}function ac(){if(ve)return ve;let t=gr();return t?_a(t):window}function gv(t){let e=ac(),n=ic(e);e instanceof HTMLElement?e.scrollBy({top:t*n*.85,behavior:"auto"}):window.scrollBy(0,t*n*.85)}function bv(t,e){let n=ac();if(!(n instanceof HTMLElement)){let r=document.scrollingElement||document.documentElement;return t<0?e<=1:e+window.innerHeight>=r.scrollHeight-2}return t<0?e<=1:e+n.clientHeight>=n.scrollHeight-2}async function hv(t){let e=++Xl,n=F[t];if(!n)return;Ao=t,Ho=Date.now()+fm+Wl,Oa(t),Cm(t);let r=-1;for(let l=0;l<F.length;l++)F[l].el?.isConnected&&(r=l);let o=t>r&&r>=0?1:-1,i=Date.now()+fm,a=0,s=-1;for(;Date.now()<i;){if(e!==Xl||!Ht)return;let l=Mm(n.id);if(l){n.el=l,Ho=Date.now()+Wl;let d=ve??_a(l),m=Math.abs(l.getBoundingClientRect().top-Tm())>hm*ic(d);l.scrollIntoView({behavior:m?"auto":"smooth",block:"start"}),mr.store.jumpEffect!=="none"&&km(l),Mt();return}let c=ac(),u=c instanceof HTMLElement?c.scrollTop:window.scrollY;if(u===s?a++:a=0,s=u,a>=3&&bv(o,u))break;gv(o),await new Promise(d=>setTimeout(d,by))}}function sc(){if(!Ht||!F.length)return;if(Date.now()<Ho&&Ao>=0){Oa(Ao);return}let t=window.innerHeight*hy,e=0;for(let n=0;n<F.length;n++){let r=F[n].el;r?.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Oa(e)}function yv(t){let e=_a(t);if(ve===e&&Co)return;Co?.(),ve=e;let n=e===window?document:e,r=()=>{sc(),lc()};n.addEventListener("scroll",r,{passive:!0}),Co=()=>n.removeEventListener("scroll",r)}function vv(t){Tn?.disconnect(),Tn=null;let e=ve instanceof HTMLElement?ve:null;Tn=new IntersectionObserver(()=>sc(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el?.isConnected&&Tn.observe(n.el)}function xv(){if(!document.body)return null;let t=We;if(t?.isConnected)return t;t=document.createElement("div"),t.id=bm,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu",n.addEventListener("pointerenter",()=>{Na=!0}),n.addEventListener("pointerleave",()=>{Na=!1});let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),We=t,No=e,pr=i,Ha=o,t}function Am(){let t=We,e=gr();if(!t||!e||!e.isConnected||F.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=$y(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Py,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function lc(){!Ht||be||(be=requestAnimationFrame(()=>{be=0,Ht&&Am()}))}function Ev(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function wv(t){let e=No,n=pr;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>dm),e.classList.toggle("bloom-bn-fit",t.length>dm),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Ev(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Zl(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?yy:vy;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Zl(o)}),n.appendChild(a)}))}function Sv(t){No?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=pr?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Tv(){let t=R();return t===Ra?!1:(Ra=t,he.clear(),Mo.clear(),F=[],Ln="",Ia=0,Ao=-1,Ho=0,ye&&t&&(re.add(t),ye=!1),!0)}function Lv(t){let e=mr.store.showAssistant!==!1?"1":"0";return`${Ra}|${e}|${t.map(n=>n.id).join(",")}`}function Jl(){if(!Ht)return;Tv();let t=mv(),e=gr();if(!e||t.length<1){F=t,Ln="",We&&(We.hidden=!0),Tn?.disconnect(),Ql();return}xv();let n=Lv(t);n!==Ln?(F=t,Ln=n,wv(t),yv(e),vv(t)):(F=t,Sv(t)),Am(),sc(),Ql()}function Mt(){if(Ht){if(document.hidden){At&&(cancelAnimationFrame(At),At=0),Jl();return}At||(At=requestAnimationFrame(()=>{At=0,Ht&&Jl()}))}}function Ql(){let t=gr();if(!(Sn&&Yl===t&&t?.isConnected)){if(Sn?.disconnect(),ko?.disconnect(),Yl=t,!t||t===document.body){Sn=null;return}Sn=new MutationObserver(()=>Mt()),Sn.observe(t,{childList:!0,subtree:!0}),ko=new ResizeObserver(()=>lc()),ko.observe(t)}}function kv(t){if(Ht){if(t.type==="conversation-chain"){(!t.conversationId||t.conversationId===R())&&Mt();return}if(t.type==="post-start"){nv(),fr=!1,t.conversationId?(ye=!1,re.add(t.conversationId)):ye=!0,Mt();return}if(t.type==="post-end"){if(ye=!1,t.conversationId)re.delete(t.conversationId);else{let e=R();e&&re.delete(e)}Mt()}}}function Cv(t){if(!Ht||!F.length||We?.hidden||t.altKey||t.ctrlKey||t.metaKey||pv(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Ia+1;else if(t.key==="ArrowUp")e=Ia-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=F.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Zl(Math.max(0,Math.min(e,F.length-1)))}function Mv(){Xl++,Lm(),Tn?.disconnect(),Tn=null,Sn?.disconnect(),Sn=null,Yl=null,ko?.disconnect(),ko=null,Co?.(),Co=null,ve=null,Na=!1,We?.remove(),We=null,No=null,pr=null,Ha=null}var Hm=w({name:"BetterNavigator",description:"Notion-style outline of the open chat, including turns ChatGPT has not mounted. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[S.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:zl,cleanupSelectors:[`#${bm}`],settings:mr,start(){Ht=!0,Ra=R(),k(zl,um),Ca=new AbortController;let{signal:t}=Ca;window.addEventListener("keydown",Cv,{signal:t}),window.addEventListener("popstate",Mt,{signal:t}),window.visualViewport?.addEventListener("resize",lc,{signal:t}),document.addEventListener("visibilitychange",()=>{Ht&&(At&&(cancelAnimationFrame(At),At=0),be&&(cancelAnimationFrame(be),be=0),Jl())},{signal:t}),Ul=Et(kv),Gl=ut({onTick(){if(z()){Mt();return}fr&&!Oo()&&(fr=!1),Mt()},onFall(e){Em(e.conversationId),Mt()},onContext(e,n){if(!V(n,e)){he.clear(),Mo.clear(),Ln="",ye=!1;let r=R();for(let o of[...re])o!==r&&re.delete(o);fr=!0}Mt()}}),Ql(),Mt(),gy.debug("navigator started")},stop(){Ht=!1,At&&cancelAnimationFrame(At),At=0,be&&cancelAnimationFrame(be),be=0,Ca?.abort(),Ca=null,Gl?.(),Gl=null,Ul?.(),Ul=null,re.clear(),ye=!1,fr=!1,Aa=0,Mv(),he.clear(),Mo.clear(),F=[],Ln="",L(zl)},onSettingsChange(){Ln="",Mt()}});var Im=`.bloom-ts {
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
`;function Rm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Nm(t){try{return new Date(t).toISOString()}catch{return""}}var Bm=new C("MessageTimestamps"),Pm="messageTimestamps",$a="bloom-ts",Om=1500,Hv="#thread-bottom-container, #thread-bottom, #prompt-textarea, #mobile-composer-prompt, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer'], textarea[name='prompt']",br=M({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),hr=new Map,An=!1,It=0,Ve=null,uc=null,cc=null,qa=null,Bo=null,Do=!1,Cn=!1;function Dm(){return Ti()}function fc(){let t=br.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function _m(){let t={...fc()};for(let[n,r]of hr)t[n]=r;let e=Object.keys(t);if(e.length>Om){let n=e.slice(e.length-Om),r={};for(let o of n)r[o]=t[o];br.store.stamps=r;return}br.store.stamps=t}var Iv=Vc(_m,500);function qm(t,e){!t||!e||hr.get(t)===e||(hr.set(t,e),Iv(),Mn())}function Rv(t){return t?hr.get(t)??fc()[t]??gi(t)??null:null}function Nv(t){An&&t.type==="message-time"&&qm(t.messageId,t.createTime)}function Pv(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Ov(){let t=Dm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll(Ru))n.closest(Hv)||e.push(n)}catch{}return e}function Bv(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function dc(){if(!An)return;let t=br.store.hideOwnMessages===!0,e=br.store.showDate!==!1,n=W();Cn&&!z()&&(Cn=!1),Cn&&(n?Do=!1:Cn=!1);let r=Cn?!1:n,o=Ov();Ve?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||Li(i),l=Pv(i),c=i.querySelector(`:scope > .${$a}`);if(t&&l==="user"){c?.remove();return}if(Bv(i)){c?.remove();return}let u=Rv(s);if(!u&&s&&(r||Do)&&a>=o.length-2&&(u=Date.now(),qm(s,u)),!u){c?.remove();return}let d=Rm(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=$a,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let m=Nm(u);m&&f.getAttribute("datetime")!==m&&f.setAttribute("datetime",m)})}catch(i){Bm.debug("paint failed",i)}Do=r,$m()}function Mn(){if(An){if(document.hidden){It&&(cancelAnimationFrame(It),It=0),dc();return}It||(It=requestAnimationFrame(()=>{It=0,An&&dc()}))}}function $m(){let t=Dm();if(!(Ve&&uc===t&&t?.isConnected)){if(Ve?.disconnect(),uc=t,!t||t===document.body){Ve=null;return}Ve=new MutationObserver(()=>Mn()),Ve.observe(t,{childList:!0,subtree:!0})}}var Fm=w({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[S.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${$a}`],settings:br,start(){An=!0,k(Pm,Im);let t=fc();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&hr.set(e,n);cc=Et(Nv),qa?.(),qa=ut({onTick:Mn,onFall:Mn,onContext(e,n){V(n,e)||(Cn=!0,Do=!1),Mn()}}),Bo?.abort(),Bo=new AbortController,document.addEventListener("visibilitychange",()=>{An&&(It&&(cancelAnimationFrame(It),It=0),dc())},{signal:Bo.signal}),$m(),Mn(),Bm.debug("timestamp watch started")},stop(){An=!1,It&&cancelAnimationFrame(It),It=0,Bo?.abort(),Bo=null,Ve?.disconnect(),Ve=null,uc=null,qa?.(),qa=null,cc?.(),cc=null,Cn=!1,Do=!1,_m(),hr.clear(),document.querySelectorAll(`.${$a}`).forEach(t=>t.remove()),L(Pm)},onSettingsChange:Mn});var mc="streamerMode",Dv="filter:blur(6px)!important;transition:filter .2s ease",_v="filter:none!important",yr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','[data-app-navigation-rail] button[aria-haspopup="menu"]'],vr=["#stage-slideover-sidebar","#stage-popover-sidebar","nav","#stage-sidebar-tiny-bar","[data-app-navigation-rail]","[data-app-action-sidebar-scroll]"];function Rt(t,e){return t.map(n=>`${n} ${e}`)}var Hn=M({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function xr(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Dv}}${e?`${r}{${_v}}`:""}`}function jm(){let t=[];if(Hn.store.conversations!==!1&&(t.push(xr([...Rt(vr,'a[href^="/c/"]'),...Rt(vr,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Hn.store.projects!==!1&&(t.push(xr([...Rt(vr,'a[href*="/project"]'),...Rt(vr,'a[href*="/g/g-p-"]'),...Rt(vr,'[data-testid="project-name"]'),...Rt(vr,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Hn.store.headerTitle!==!1&&t.push(xr(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Hn.store.accountAvatar!==!1&&t.push(xr([...Rt(yr,"img"),...Rt(yr,'[class*="avatar"]'),...Rt(yr,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Hn.store.accountName!==!1&&t.push(xr([...Rt(yr,".min-w-0 > .truncate"),...Rt(yr,".min-w-0.flex-1 .truncate")],!1)),Hn.store.accountEmail!==!1&&t.push(xr([...Rt(yr,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *,textarea[name="prompt"],#mobile-composer-prompt{filter:none!important}'),!t.length){L(mc);return}k(mc,t.join(`
`))}var zm=w({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[S.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Hn,start:jm,onSettingsChange:jm,stop(){L(mc)}});var Gm=`.bloom-gc-panel {
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
}`;var $v=new C("GreetingCustomizer"),Er="greetingCustomizer",Um="greetingCustomizerUi",_o=100,gc=30,Fv=120,jv=1e3,zv=50,Gv=40,Uv=["#page-header","nav","#stage-slideover-sidebar","#stage-popover-sidebar","#stage-sidebar-tiny-bar","[data-app-navigation-rail]","[data-app-action-sidebar-scroll]","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]','textarea[name="prompt"]',"#mobile-composer-prompt"].join(", "),qo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ua=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Kv(t){return!!t?.closest(Uv)}function Ym(t){return!!(Kv(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Ko(t){try{for(let e of document.querySelectorAll(t))if(!Ym(e))return e}catch{}return null}function pc(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Ko(e))return e;return t}var Xm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],nt=M({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:lx},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Xm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),oe=!1,Tr=!1,Rn=null,ja,$o,wr,Fo,za=0,Fa=null,Sr=null,jo=null,zo=null,Go=null,Ga=null;function Ee(){let t=location.pathname||"/";return t==="/"||t===""}function In(){let t=nt.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Xm.slice()}function Uo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Km(t){nt.store.greetings=t.slice(0,gc)}function Wo(){let t=String(nt.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Wv(){return nt.store.order==="random"?"random":"sequential"}function Vv(){return ot(Number(nt.store.intervalSec??10),1,3600)*1e3}function Yv(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Xv(){return!!Ko(Ua)}function Ka(){return!!(Ko(Ua)||Ko(qo))}function Zv(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Xv()?pc(Ua):Ko(qo)?pc(qo):pc(Ua),i=e?`${qo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Jv(t,e){if(t<=0)return 0;if(t===1)return Number(nt.plain.index)!==0&&(nt.store.index=0),Number(nt.plain.lastRandom)!==0&&(nt.store.lastRandom=0),0;let n=Number(nt.plain.index),r=Number(nt.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Wv()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return nt.store.index=s,nt.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return nt.store.index=i,i}function xe(t){if(!oe)return;if(!Ee()){L(Er);return}let e=In().map(Uo).filter(Boolean);if(!e.length){L(Er);return}let n=Jv(e.length,t),r=e[n]??e[0],o=Wo()==="manual"&&e.length>1;k(Er,Zv(Yv(r),o)),Ga?.()}function bc(){ja!==void 0&&(clearInterval(ja),ja=void 0)}function hc(){bc(),!(!oe||!Ee())&&Wo()==="interval"&&(In().filter(Boolean).length<=1||(ja=setInterval(()=>xe(!0),Vv())))}function yc(){Fo!==void 0&&(clearTimeout(Fo),Fo=void 0),za=0}function Wm(){if(yc(),!oe||!Ee())return;za=Gv;let t=()=>{if(Fo=void 0,!(!oe||!Ee())){if(Ka()){Wo()==="refresh"&&!Tr?(Tr=!0,xe(!0)):xe(!1),hc();return}za-=1,za>0&&(Fo=setTimeout(t,zv))}};t()}function vc(){if(Rn===!0){Ka()?xe(!1):Wm();return}Rn=!0,Tr=!1,Wo()==="refresh"?(Tr=!0,xe(!0)):xe(!1),hc(),Ka()||Wm()}function xc(){Rn=!1,Tr=!1,bc(),yc(),L(Er)}function Wa(){wr===void 0&&(wr=window.setTimeout(()=>{wr=void 0,oe&&(Ee()?vc():Rn!==!1&&xc())},Fv))}function Qv(){Sr||(Sr=history.pushState.bind(history),jo=history.replaceState.bind(history),zo=function(...e){let n=Sr(...e);return Wa(),n},Go=function(...e){let n=jo(...e);return Wa(),n},history.pushState=zo,history.replaceState=Go)}function tx(){zo&&history.pushState===zo&&Sr&&(history.pushState=Sr),Go&&history.replaceState===Go&&jo&&(history.replaceState=jo),Sr=null,jo=null,zo=null,Go=null}function ex(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Wa)}function nx(t){if(!oe||!Ee()||Wo()!=="manual"||In().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(qo);if(!n||Ym(n))return;let r=window.getSelection?.();r&&String(r).trim()||xe(!0)}function rx(){$o===void 0&&($o=setInterval(()=>{if(!oe)return;let t=Ee();if(t!==(Rn===!0)){t?vc():xc();return}t&&Ka()&&xe(!1)},jv))}function ox(){$o!==void 0&&(clearInterval($o),$o=void 0)}function Vm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var ix="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",ax="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function sx(t,e){let n=Uo(t);return n?n.length>_o?`Keep it to ${_o} characters.`:In().length+(e?1:0)>gc?`At most ${gc} greetings.`:null:"Enter a greeting."}function lx(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=In(),s=Number(nt.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=_o,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let g=l.querySelector(".bloom-gc-count");g&&(g.textContent=`${Uo(e).length}/${_o}`);let E=l.querySelector(".bloom-gc-error");E&&(E.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Uo(e).length}/${_o}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let m=document.createElement("div");if(m.className="bloom-gc-actions",n>=0){let g=document.createElement("button");g.type="button",g.className="bloom-gc-btn",g.textContent="Cancel",g.addEventListener("click",()=>{n=-1,e="",r="",i()}),m.appendChild(g)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let g=n<0,E=sx(e,g);if(E){r=E,i();return}let h=Uo(e),x=In().slice();n>=0&&n<x.length?x[n]=h:x.push(h),Km(x),n=-1,e="",r="",i()}),m.appendChild(p),u.append(d,f,m),l.appendChild(u),t.appendChild(l),!a.length){let g=document.createElement("p");g.className="bloom-gc-empty",g.textContent="No greetings. The official heading stays.",t.appendChild(g);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((g,E)=>{let h=document.createElement("div");h.className="bloom-gc-item",E===s&&(h.dataset.active="true");let x=document.createElement("button");x.type="button",x.className=`bloom-gc-body${o===E?"":" bloom-gc-clamp"}`,x.textContent=g,x.addEventListener("click",()=>{o=o===E?-1:E,i()});let mt=document.createElement("div");mt.className="bloom-gc-item-actions";let pt=Vm("Edit",ix);pt.addEventListener("click",()=>{n=E,e=g,r="",i()});let Z=Vm("Delete",ax);Z.addEventListener("click",()=>{let O=In().filter((ct,vt)=>vt!==E);Km(O),n===E?(n=-1,e=""):n>E&&(n-=1),i()}),mt.append(pt,Z),h.append(x,mt),b.appendChild(h)}),t.appendChild(b)};return Ga=i,i(),()=>{Ga===i&&(Ga=null),t.replaceChildren()}}var Zm=w({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Um,settings:nt,start(){oe=!0,k(Um,Gm),Qv(),Fa=new AbortController;let{signal:t}=Fa;window.addEventListener("popstate",Wa,{signal:t}),document.addEventListener("click",ex,{capture:!0,signal:t}),document.addEventListener("click",nx,{signal:t}),rx(),Rn=null,Ee()?vc():xc(),$v.debug("started")},stop(){oe=!1,Fa?.abort(),Fa=null,wr!==void 0&&(clearTimeout(wr),wr=void 0),bc(),yc(),ox(),tx(),L(Er),Tr=!1,Rn=null},onSettingsChange(){oe&&(Ee()?(xe(!1),hc()):L(Er))}});function cx(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Va(t){try{return await createImageBitmap(t)}catch{return null}}async function ux(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Ya(t){if(t.startsWith("data:")){let e=cx(t);if(e){let n=await Va(e);if(n)return n}return ux(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Va(await e.blob()):null}catch{return null}}var Za="data-bloom-csi-slot",dx="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",fx=/\bsize-(?:[6-9]|10)\b/,mx=/\b(?:h|w)-(?:[6-9]|10)\b/,px=/^(plus|pro|free|team|go|business|enterprise)$/i,gx=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Xa(t){return t.getAttribute("class")||""}function Qm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||fx.test(t)?!0:mx.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function bx(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!tp(e)}function tp(t){return px.test(String(t??"").replace(/\s+/g,""))}function ie(t){return!!t?.closest(dx)}function Ja(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Vo(t){let e=Xa(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:tp(t.textContent||"")}function Qa(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Yo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function hx(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function ep(t){if(ie(t)||Qa(t)||Yo(t)||Vo(t)||Ja(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function np(t){return ie(t)||Qa(t)||Yo(t)||Vo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:bx(t.textContent||"")}function rp(t){return ie(t)||Yo(t)||Ja(t)||Vo(t)?!1:Qm(Xa(t))||np(t)?!0:ep(t)}function Jm(t){return!(ie(t)||Ja(t)||Yo(t)||Vo(t)||Qa(t))}function Nn(t,e){let n=Qa(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Yo(n)||Ja(n)||Vo(n));)ie(n)||(r=n),n=n.parentElement;return r}function yx(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||ie(e))continue;if(hx(Xa(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Jm(o))){if(rp(o)||Qm(Xa(o)))return Nn(o,t)??o;r.push(o)}if(r.length===1)return Nn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Jm(r))return Nn(r,t)??r}}return null}function vx(t){let e=t.querySelectorAll(gx);for(let n of e)if(rp(n))return Nn(n,t)??n;return null}function xx(t){for(let e of t.querySelectorAll("span, div, p, i"))if(np(e))return Nn(e,t)??e;return null}function Ex(t){for(let e of t.querySelectorAll("*"))if(ep(e))return Nn(e,t)??e;return null}function op(t,e){if(ie(t))return null;if(e&&!ie(e)&&t.contains(e)){let n=Nn(e,t);if(n)return n}return yx(t)??vx(t)??xx(t)??Ex(t)}function ip(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Lr="data-bloom-csi",ts="data-bloom-csi-orig",Pn=new Set,ap=null;function wc(t){ap=t}function sp(t){return`url(${JSON.stringify(t)})`}function es(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Sc(t,e,n){let r=sp(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function lp(t,e=Za){let n=sp(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function wx(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function kr(t){t.removeEventListener("error",Ec);let e=t.getAttribute(ts);t.removeAttribute(Lr),t.removeAttribute(ts),e&&t.getAttribute("src")!==e&&(t.src=e)}function Ec(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Pn.add(n),kr(e),ap?.()}function cp(t,e){if(!e||Pn.has(e)){kr(t);return}wx(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Lr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(ts)&&t.setAttribute(ts,n);t.setAttribute(Lr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Ec),t.addEventListener("error",Ec),n!==e&&(t.src=e)}var up=`/*
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
`;var dp=new C("CustomSidebarIdentity"),fp="customSidebarIdentityUi",gp="customSidebarIdentity",Tx="bloom-csi-face",Lx="bloom-csi-name",Cr=Za,kx=1024,ns=256,bp=24,hp=64,yp=40,Cc=1,Mc=4,Xo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]','[data-app-navigation-rail] button[aria-haspopup="menu"]'],Tc=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],T=M({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Gx},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:bp,max:hp,default:yp},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Bn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Cx(){return String(T.store.displayName??"").trim()}function is(t,e,n,r,o){let i=ot(n,Cc,Mc),a=Math.min(t,e)/i,s=ot(r,a/2,Math.max(a/2,t-a/2)),l=ot(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Mx(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Ac(t){let e=Math.min(1,kx/Math.max(t.width,t.height));return Mx(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Ax(t,e,n,r){let{side:o,x:i,y:a}=is(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=ns,s.height=ns;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,ns,ns);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Hx(t){let e=await Va(t);if(!e)return null;let n=Ac(e);return e.close(),n}async function Ic(t,e,n,r){let o=await Ya(t);if(!o)return null;let i=Ax(o,e,n,r);return o.close(),i}function Rc(){T.store.cropX=.5,T.store.cropY=.5,T.store.cropZoom=1}function mp(){T.store.avatarUrl="",T.store.avatarSource="",Rc()}var pp=0;async function Hc(t){let e=++pp;Rc(),T.store.avatarSource=t;let n=await Ic(t,.5,.5,1);return e!==pp?!1:(n&&(T.store.avatarUrl=n),!!n)}function Zo(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Lc(t){let e=Zo(t);if(!e)return!1;let n=await Hx(e);return n?Hc(n):!1}var Nt=!1,Mr=!1,Ar=0,as=0,rs=null,Ye=new Map,Hr=null,we=null,ss=null,ae=null,ls=null;function cs(t){let e=String(t??"").trim();if(!e||Pn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function vp(){return cs(T.store.avatarUrl)??cs(T.store.avatarSource)}var os=!1,kc=new Set;function xp(){let t=cs(T.store.avatarSource);if(!t?.startsWith("data:image/")||cs(T.store.avatarUrl)?.startsWith("data:image/")||os||kc.has(t))return;os=!0;let e=Bn(T.store.cropX,.5),n=Bn(T.store.cropY,.5),r=Bn(T.store.cropZoom,1);Ic(t,e,n,r).then(o=>{if(os=!1,!o){kc.add(t);return}Nt&&(T.store.avatarUrl=o,us())}).catch(()=>{os=!1,kc.add(t)})}function On(t,e){return t.map(n=>`${n} ${e}`)}function Ix(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Rx(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Ix(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Ep(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||ie(n)||n.closest(".min-w-0")||e.push(n);return e}function Nx(t){let e=Ep(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Nc(){let t=[],e=nn();e&&t.push(e);let n=zn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Xo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function wp(t,e){let n=Nx(t);if(n)cp(n,e);else for(let o of Ep(t))kr(o);let r=op(t,n);for(let o of t.querySelectorAll(`[${Cr}]`))o!==r&&o.removeAttribute(Cr);r&&r.setAttribute(Cr,"")}function Px(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Ox(t,e){let n=Px(t);n&&wp(n,e)}function Bx(){for(let t of document.querySelectorAll(`img[${Lr}]`))kr(t);for(let t of document.querySelectorAll(`[${Cr}]`))t.removeAttribute(Cr)}function Dx(){let t=ot(Math.round(Bn(T.store.avatarSize,yp)),bp,hp),e=vp(),n=Cx(),r=T.store.applyToMenu!==!1,o=[],i=[...On(Xo,"img"),"#stage-sidebar-tiny-bar img","[data-app-navigation-rail] img"];r&&i.push(...On(Tc,"> :first-child img"));let a=[...On(Xo,".min-w-0 > .truncate"),...On(Xo,".min-w-0.flex-1 .truncate")];r&&a.push(...On(Tc,"> :first-child .truncate"));let s=ip(Cr);o.push(es([...s.flatMap(l=>On(Xo,l))].join(","),t)),o.push(es(s.map(l=>`#stage-sidebar-tiny-bar ${l}, [data-app-navigation-rail] ${l}`).join(","),32)),r&&o.push(es(s.flatMap(l=>On(Tc,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Sc(i.join(","),e,t)),o.push(Sc("#stage-sidebar-tiny-bar img, [data-app-navigation-rail] img",e,32)),o.push(lp(e))),n&&o.push(Rx(a,n)),k(gp,o.join(""))}function _x(){let t=vp(),e=Nc();for(let n of e)wp(n,t);if(T.store.applyToMenu!==!1){let n=Gn();n&&Ox(n,t)}for(let n of document.querySelectorAll(`img[${Lr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||kr(n)}function us(){if(!(!Nt||Mr)){Mr=!0;for(let t of Ye.values())t.disconnect();we?.disconnect(),ae?.disconnect();try{Dx(),_x()}finally{Mr=!1,Pc(),jx(),Hr?.isConnected&&Sp(Hr),xp()}}}function Jo(){!Nt||Ar||(Ar=requestAnimationFrame(()=>{Ar=0,us()}))}function qx(){Mr||!Nt||Jo()}function $x(t){if(Ye.has(t))return;let e=new MutationObserver(qx);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ye.set(t,e)}function Fx(t){Ye.get(t)?.disconnect(),Ye.delete(t)}function Pc(){let t=new Set;for(let n of Nc())t.add(n),n.parentElement&&t.add(n.parentElement);let e=zn();e&&t.add(e);for(let n of[...Ye.keys()])(!t.has(n)||!n.isConnected)&&Fx(n);for(let n of t)n.isConnected&&$x(n)}function jx(){let t=Mi();if(!t){ae?.disconnect(),ae=null,ss=null;return}if(ss===t&&ae){ae.observe(t,{childList:!0});return}ae?.disconnect(),ss=t,ae=new MutationObserver(()=>{Mr||!Nt||(Pc(),Jo())}),ae.observe(t,{childList:!0})}function Sp(t){Hr===t&&we||(we?.disconnect(),Hr=t,we=new MutationObserver(()=>{if(!t.isConnected){we?.disconnect(),we=null,Hr=null;return}Mr||!Nt||Jo()}),we.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Tp(t){if(!Nt||T.store.applyToMenu===!1)return;let e=Gn();if(e){Sp(e),Jo();return}t<=0||requestAnimationFrame(()=>Tp(t-1))}function Lp(t){Nt&&(us(),!(Nc().length||t<=0)&&(as=requestAnimationFrame(()=>Lp(t-1))))}function zx(t){Nt&&T.store.applyToMenu!==!1&&(!Ai(t)&&!Gn()||Tp(10))}function Gx(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let m=document.createElement("div");m.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,m.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let g=document.createElement("input");g.type="range",g.className="bloom-csi-zoom",g.min=String(Cc),g.max=String(Mc),g.step="0.05",g.setAttribute("aria-label","Zoom");let E=document.createElement("span");E.className="bloom-csi-zoom-val";let h=document.createElement("button");h.type="button",h.className="bloom-csi-btn",h.textContent="Reset",b.append(g,E,h);let x=document.createElement("p");x.className="bloom-csi-hint",x.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(m,b,x),t.append(u,d,f);function mt(){let v=String(T.store.avatarSource??""),I=String(T.store.avatarUrl??"");return v.startsWith("data:image/")?v:I.startsWith("data:image/")?I:""}function pt(v,I,y){if(!a)return i.x=v,i.y=I,i.zoom=ot(y,Cc,Mc),i;let A=is(a.w,a.h,y,v*a.w,I*a.h);return i.x=A.x/a.w,i.y=A.y/a.h,i.zoom=A.z,i}function Z(){g.value=String(i.zoom),E.textContent=`${Math.round(i.zoom*100)}%`;let v=a?is(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;v&&a&&(p.style.width=`${a.w/v.side*100}%`,p.style.height=`${a.h/v.side*100}%`,p.style.left=`${(.5-v.x/v.side)*100}%`,p.style.top=`${(.5-v.y/v.side)*100}%`)}function O(v=!1){let I=mt(),y=String(T.store.avatarUrl??"").trim(),A=!!I;s.hidden=!y&&!I,(I||y)&&(s.src=I||y),document.activeElement!==l&&(l.value=A?"":y),l.placeholder=A?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!I,d.hidden=!(e&&/^https?:\/\//.test(y)&&!I),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",I&&(v&&(i.x=Bn(T.store.cropX,.5),i.y=Bn(T.store.cropY,.5),i.zoom=Bn(T.store.cropZoom,1)),p.getAttribute("src")!==I&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},pt(i.x,i.y,i.zoom),Z()},p.src=I),Z())}function ct(v,I,y,A=!1){pt(v,I,y),Z();let gt=mt(),xt=()=>{T.store.cropX=i.x,T.store.cropY=i.y,T.store.cropZoom=i.zoom,gt&&Ic(gt,i.x,i.y,i.zoom).then(H=>{H&&(T.store.avatarUrl=H)})};r&&clearTimeout(r),A?xt():r=setTimeout(xt,80)}function vt(v){T.store.avatarUrl=v;let I=v.trim();if(n&&clearTimeout(n),!I){T.store.avatarSource="",Rc(),e=!1,O(!0);return}if(I.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Ya(I).then(y=>{if(!y)return;let A=Ac(y);y.close(),A&&Hc(A).then(()=>O(!0))})},80);return}if(/^https?:\/\//.test(I)){e=!1,T.store.avatarSource="",n=setTimeout(()=>{Ya(I).then(y=>{if(!y){e=!0,O(!0);return}let A=Ac(y);y.close(),A?(e=!1,Hc(A).then(()=>O(!0))):(e=!0,O(!0))})},400);return}e=!1,T.store.avatarSource="",O(!0)}u.addEventListener("paste",v=>{Zo(v.clipboardData)&&(v.preventDefault(),e=!1,Lc(v.clipboardData).then(()=>O(!0)))}),u.addEventListener("dragover",v=>{Zo(v.dataTransfer)&&v.preventDefault()}),u.addEventListener("drop",v=>{Zo(v.dataTransfer)&&(v.preventDefault(),e=!1,Lc(v.dataTransfer).then(()=>O(!0)))}),l.addEventListener("change",()=>vt(l.value)),l.addEventListener("paste",v=>{Zo(v.clipboardData)&&(v.preventDefault(),e=!1,Lc(v.clipboardData).then(()=>O(!0)))}),l.addEventListener("keydown",v=>{mt()&&!l.value&&(v.key==="Backspace"||v.key==="Delete")&&(mp(),e=!1,O(!0))}),c.addEventListener("click",()=>{mp(),e=!1,O(!0)}),m.addEventListener("pointerdown",v=>{v.button===0&&(m.setPointerCapture(v.pointerId),o.on=!0,o.px=v.clientX,o.py=v.clientY,o.x=i.x,o.y=i.y)}),m.addEventListener("pointermove",v=>{if(!o.on||!a)return;let I=m.clientWidth;if(!I)return;let{side:y}=is(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);pt(o.x-(v.clientX-o.px)*(y/I)/a.w,o.y-(v.clientY-o.py)*(y/I)/a.h,i.zoom),Z()}),m.addEventListener("pointerup",()=>{o.on&&(o.on=!1,ct(i.x,i.y,i.zoom,!0))}),m.addEventListener("pointercancel",()=>{o.on=!1}),m.addEventListener("wheel",v=>{v.preventDefault(),ct(i.x,i.y,i.zoom*(v.deltaY<0?1.08:1/1.08))},{passive:!1}),g.addEventListener("input",()=>ct(i.x,i.y,Number(g.value))),g.addEventListener("change",()=>ct(i.x,i.y,Number(g.value),!0)),h.addEventListener("click",()=>ct(.5,.5,1,!0));let Qo=()=>O(!1);return ls=Qo,O(!0),()=>{ls===Qo&&(ls=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var kp=w({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[S.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:fp,cleanupSelectors:[`.${Tx}`,`.${Lx}`],settings:T,start(){Nt=!0,Pn.clear(),wc(Jo),k(fp,up),rs=new AbortController,document.addEventListener("click",zx,{signal:rs.signal}),Lp(40),xp(),dp.debug("started")},onSettingsChange(){Pn.clear(),ls?.(),Nt&&(Pc(),us())},stop(){Nt=!1,rs?.abort(),rs=null,Ar&&cancelAnimationFrame(Ar),Ar=0,as&&cancelAnimationFrame(as),as=0;for(let t of Ye.values())t.disconnect();Ye.clear(),we?.disconnect(),we=null,Hr=null,ae?.disconnect(),ae=null,ss=null,Bx(),L(gp),wc(null),Pn.clear(),dp.debug("stopped")}});var Ir=new C("Bloom"),Cp=!1,Ux=Date.now(),Kx=[rd,$d,Yd,Jd,rf,cf,wf,Tf,Cf,Wf,tm,sm,cm,Hm,Fm,zm,Zm,kp];function ds(t){return new Promise(e=>setTimeout(e,t))}function Wx(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function Vx(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Ap=8e3,Mp=300,Yx=250;async function Xx(){if(tn())return await ds(Mp),!0;for(;Date.now()-Ux<Ap;)if(await ds(Yx),tn())return await ds(Mp),!0;return tn()||Rs()}function Oc(){return Si()}async function Zx(){if(Oc())return!0;let t=Date.now()+Ap;for(;Date.now()<t;)if(await ds(100),Oc())return!0;return Oc()}function Jx(){try{GM_registerMenuCommand?.("Bloom++ settings",nd)}catch{}}function Qx(){hi(()=>{Nr("HostShell"),Ir.info("host shell",wt)}),yi(()=>{Ir.info("idle ready",wt)}),vi(()=>{ps(),Nr("HostReady"),Ir.info("chrome ready",wt)})}async function Bc(){await Zc()}async function Dc(){if(Cp)return;Cp=!0,vu();for(let n of Kx)try{ou(n),Mu(n)}catch(r){Ir.error("register failed",n.name,r)}Nr("Init"),Jx(),Qx();let t=()=>Nr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Wx(),ps(),Ir.info("styles ready",wt),await Vx(),Zx().then(n=>{n&&xi()}),!await Xx()){Ir.warn("late islands not detected; starting default plugins",wt),jn(),Ei();return}await ku()}var Hp=typeof unsafeWindow<"u"?unsafeWindow:window,tE=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||tE){let t=Hp.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",wt);try{Object.defineProperty(Hp,"Bloom",{value:_c,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Bc().then(()=>Dc()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
