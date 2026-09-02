// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.0.0
// @description  Void++-style plugin host for chatgpt.com. Tab favicon reflects chat state; recall prompts with Arrow Up / Down.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://github.com/0-V-linuxdo/Bloom/raw/refs/heads/main/assets/logos/bloom-icon.svg
// @match        https://chatgpt.com/*
// @match        https://*.chatgpt.com/*
// @match        https://chat.openai.com/*
// @match        https://free.share-ai.top/*
// @match        https://chatgpt.aicnm.cc/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @license      GPL-3.0-or-later
// @downloadURL  https://github.com/0-V-linuxdo/Bloom/raw/refs/heads/main/userscript/Bloom.user.js
// @updateURL    https://github.com/0-V-linuxdo/Bloom/raw/refs/heads/main/userscript/Bloom.user.js
// ==/UserScript==

/* Bloom++ [20260902] v1.0.0. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var en=Object.defineProperty;var nn=(t,e)=>{for(var n in e)en(t,n,{get:e[n],enumerable:!0})};var ne={};nn(ne,{REPO_URL:()=>xe,Settings:()=>l,VERSION:()=>ye,init:()=>ee,initSettings:()=>te,plugins:()=>x});var N=new Map;function lt(t,e){let n=N.get(t);n||(n=document.createElement("style"),n.dataset.bloomStyle=t,(document.head??document.documentElement).appendChild(n),N.set(t,n)),n.textContent=e}function oe(t){let e=N.get(t);e&&(e.disabled=!1)}function re(t){let e=N.get(t);e&&(e.disabled=!0)}function ie(t){N.get(t)?.remove(),N.delete(t)}var f=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function I(t){return t}var on=new Map;function ct(t,e){let n=on.get(t);if(n)for(let o of Array.from(n))try{o(e)}catch{}}var rn="bloompp";function se(){return new Promise((t,e)=>{let n=indexedDB.open(rn,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function ae(t){try{let e=await se();return await new Promise((n,o)=>{let s=e.transaction("kv","readonly").objectStore("kv").get(t);s.onsuccess=()=>n(s.result),s.onerror=()=>o(s.error)})}catch{return}}async function le(t,e){try{let n=await se();await new Promise((o,i)=>{let r=n.transaction("kv","readwrite").objectStore("kv").put(e,t);r.onsuccess=()=>o(),r.onerror=()=>i(r.error)})}catch{}}function q(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function ce(t,e,n){return Math.min(n,Math.max(e,t))}function ue(t,e,n){let o=t.get(e);if(o!==void 0)return o;let i=n();return t.set(e,i),i}async function de(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}var ut=new f("SettingsStore"),M="BloomSettings",sn=100;function mt(t){if(q(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(q(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return q(n)?n:null}return null}catch{return null}}var dt=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let o=this.proxyCache.get(e);if(o)return o;let i=new Proxy(e,{get:(s,r)=>{let a=s[r];if(a===void 0&&r!=="__proto__"){let c=n?`${n}.${r}`:r;for(let[m,u]of this.defaultGetters)if(c.startsWith(m)){let y=c.slice(m.length+1);if(y&&!y.includes(".")){let p=u(y);p!==void 0&&(s[r]=p,a=p);break}}}return q(a)?this.makeProxy(a,n?`${n}.${r}`:r):a},set:(s,r,a)=>{if(s[r]===a)return!0;s[r]=a;let c=n?`${n}.${r}`:r;return this.notifyListeners(c),!0},deleteProperty:(s,r)=>{if(!(r in s))return!0;delete s[r];let a=n?`${n}.${r}`:r;return this.notifyListeners(a),!0}});return this.proxyCache.set(e,i),i}invokeListeners(e,n){for(let o of Array.from(e))try{o(n)}catch(i){ut.error("Settings listener error:",i)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[o,i]of Array.from(this.prefixListeners))e.startsWith(o)&&this.invokeListeners(i,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},sn))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(M,this.plain)}catch{try{GM_setValue(M,e)}catch(n){ut.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(M,e)}catch{}le(M,e).catch(n=>ut.warn("Failed to save settings to IndexedDB:",n))}catch(e){ut.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,o){ue(e,n,()=>new Set).add(o)}removeFromMap(e,n,o){let i=e.get(n);i&&(i.delete(o),i.size||e.delete(n))}};var an=new f("Settings"),ln={plugins:{}},l=new dt(structuredClone(ln)),cn=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function un(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(i=>i.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function ft(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(l.store.plugins[n]||(l.store.plugins[n]={}),l.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?l.plain.plugins[n]??{}:{}}};return e}function dn(t){try{if(typeof GM_getValue=="function")return GM_getValue(t)}catch{}}async function me(){let t=null;if(t=mt(dn(M)),t||(t=mt(await ae(M))),!t)try{t=mt(localStorage.getItem(M))}catch{t=null}if(t&&typeof t=="object"){let e=t.plugins;e&&typeof e=="object"&&(l.plain.plugins=e),an.debug("Loaded settings")}}function fe(t,e){e&&(e.pluginName=t,l.plain.plugins[t]||(l.plain.plugins[t]={}),l.setDefaultGetter(cn(t),n=>{if(n!=="enabled")return un(e.def,n)}))}var pt=new f("PluginManager"),x={},z=new Set;function pe(t){if(x[t.name]){pt.warn("Duplicate plugin",t.name);return}x[t.name]=t,fe(t.name,t.settings)}function V(t){let e=x[t];if(!e)return!1;if(e.required)return!0;let n=l.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function ge(t){let e=x[t];if(!e||e.required)return;let n=!V(t);l.plain.plugins[t]||(l.store.plugins[t]={}),l.store.plugins[t].enabled=n,n?be(e):mn(e),ct("pluginToggle",{name:t,enabled:n})}function be(t,e=!1){if(!z.has(t.name)&&V(t.name))try{t.managedStyle&&oe(t.managedStyle),t.start?.(),z.add(t.name),t.settings&&l.addPrefixChangeListener(`plugins.${t.name}.`,()=>{z.has(t.name)&&t.onSettingsChange?.()}),e||pt.debug("Started",t.name)}catch(n){pt.error("Failed to start",t.name,n)}}function mn(t){if(z.has(t.name)){try{t.stop?.()}catch(e){pt.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(re(t.managedStyle),ie(t.managedStyle)),z.delete(t.name)}}function gt(t){for(let e of Object.values(x))(e.startAt??"DOMContentLoaded")===t&&be(e)}function he(){for(let t of Object.values(x))l.plain.plugins[t.name]||(l.store.plugins[t.name]={enabled:t.enabledByDefault!==!1})}var H={p:"0-V-linuxdo"},ye="[20260901] v1.0.0",xe="https://github.com/0-V-linuxdo/Bloom";var ve=`#bloom-root {
    all: initial;
}

.bloom-settings-fab {
    position: fixed;
    z-index: 2147483645;
    right: 20px;
    bottom: 20px;
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 14px;
    background: #0a0b0a;
    color: #e8efe9;
    box-shadow: 0 8px 24px rgb(0 0 0 / 28%);
    cursor: grab;
    display: grid;
    place-items: center;
    padding: 0;
}

.bloom-settings-fab:active {
    cursor: grabbing;
}

.bloom-settings-fab svg {
    width: 22px;
    height: 22px;
}

.bloom-settings-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147483646;
    background: rgb(0 0 0 / 42%);
}

.bloom-settings-modal {
    position: fixed;
    z-index: 2147483647;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(520px, calc(100vw - 32px));
    max-height: min(80vh, 720px);
    overflow: auto;
    padding: 20px;
    border-radius: 24px;
    background: #121412;
    color: #e8efe9;
    box-shadow: 0 24px 64px rgb(0 0 0 / 45%);
    font: 14px/1.45 ui-sans-serif, system-ui, sans-serif;
}

.bloom-settings-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
}

.bloom-settings-head h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.03em;
}

.bloom-settings-head button {
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    opacity: 0.7;
}

.bloom-plugin-card {
    padding: 16px;
    border-radius: 16px;
    background: #1a1d1a;
    margin-bottom: 12px;
}

.bloom-plugin-card header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
}

.bloom-plugin-card h3 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
}

.bloom-plugin-card p {
    margin: 4px 0 0;
    color: #9aa59c;
    font-size: 0.8125rem;
}

.bloom-plugin-card label.bloom-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    color: #9aa59c;
}

.bloom-field {
    display: grid;
    gap: 6px;
    margin-top: 12px;
}

.bloom-field span {
    font-size: 0.75rem;
    color: #9aa59c;
}

.bloom-field select,
.bloom-field input[type="range"] {
    width: 100%;
}

.bloom-field select {
    height: 40px;
    border-radius: 10px;
    border: 1px solid rgb(232 239 233 / 14%);
    background: #121412;
    color: inherit;
    padding: 0 10px;
}

@media (prefers-reduced-motion: reduce) {
    .bloom-settings-modal { transition: none; }
}
`;var Dt="bloom-root",Ee="bloom-fab-pos",S=null,T=null,Ht=!1,Nt=[];function pn(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function gn(){try{let t=localStorage.getItem(Ee);if(!t)return null;let e=JSON.parse(t);if(typeof e.x=="number"&&typeof e.y=="number")return{x:e.x,y:e.y}}catch{}return null}function bn(t,e){try{localStorage.setItem(Ee,JSON.stringify({x:t,y:e}))}catch{}}function Se(){if(T)return T;S=document.getElementById(Dt),S||(S=document.createElement("div"),S.id=Dt,document.documentElement.appendChild(S)),T=S.shadowRoot??S.attachShadow({mode:"open"});let t=document.createElement("style");return t.textContent=ve,T.appendChild(t),T}function U(){Ht=!1;for(let t of Nt)t();Nt=[],T?.querySelector(".bloom-settings-backdrop")?.remove(),T?.querySelector(".bloom-settings-modal")?.remove()}function hn(t,e,n){if(n.type===5&&n.render){let r=document.createElement("div");return r.className="bloom-field",Nt.push(n.render(r)),r}let o=document.createElement("label");o.className="bloom-field";let i=document.createElement("span");i.textContent=n.description||e,o.appendChild(i);let s=l.store.plugins[t]??(l.store.plugins[t]={});if(n.type===3&&n.options){let r=document.createElement("select");for(let a of n.options){let c=document.createElement("option");c.value=a.value,c.textContent=a.label,r.appendChild(c)}return r.value=String(s[e]??n.options.find(a=>a.default)?.value??n.options[0].value),r.addEventListener("change",()=>{s[e]=r.value}),o.appendChild(r),o}if(n.type===4){let r=document.createElement("input");r.type="range",r.min=String(n.min??0),r.max=String(n.max??100),r.value=String(s[e]??n.min??0);let a=document.createElement("span");return a.textContent=r.value,r.addEventListener("input",()=>{s[e]=Number(r.value),a.textContent=r.value}),o.append(r,a),o}if(n.type===2){let r=document.createElement("input");return r.type="checkbox",r.checked=!!s[e],r.addEventListener("change",()=>{s[e]=r.checked}),o.appendChild(r),o}return o}function _t(t){U(),Ht=!0;let e=document.createElement("div");e.className="bloom-settings-backdrop",e.addEventListener("click",U);let n=document.createElement("div");n.className="bloom-settings-modal",n.addEventListener("click",r=>r.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let i=document.createElement("h2");i.textContent="Bloom++";let s=document.createElement("button");s.type="button",s.textContent="Close",s.addEventListener("click",U),o.append(i,s),n.appendChild(o);for(let r of Object.values(x)){if(r.hidden||r.name==="Settings")continue;let a=document.createElement("section");a.className="bloom-plugin-card";let c=document.createElement("header"),m=document.createElement("div"),u=document.createElement("h3");u.textContent=r.name;let y=document.createElement("p");y.textContent=r.description,m.append(u,y);let p=document.createElement("label");p.className="bloom-toggle";let C=document.createElement("input");if(C.type="checkbox",C.checked=V(r.name),C.disabled=!!r.required,C.addEventListener("change",()=>{ge(r.name),_t(t)}),p.append(C,document.createTextNode("On")),c.append(m,p),a.appendChild(c),V(r.name)&&r.settings)for(let[O,R]of Object.entries(r.settings.def)){let g=hn(r.name,O,R);g&&a.appendChild(g)}n.appendChild(a)}t.append(e,n),ct("settingsOpen",void 0)}function yn(){let t=Se();t.querySelector(".bloom-settings-fab")?.remove();let e=document.createElement("button");e.type="button",e.className="bloom-settings-fab",e.setAttribute("aria-label","Bloom++ settings"),e.innerHTML=pn();let n=gn();n&&(e.style.left=`${n.x}px`,e.style.top=`${n.y}px`,e.style.right="auto",e.style.bottom="auto");let o=!1,i=!1,s=0,r=0;e.addEventListener("pointerdown",a=>{o=!0,i=!1,s=a.clientX-e.getBoundingClientRect().left,r=a.clientY-e.getBoundingClientRect().top,e.setPointerCapture(a.pointerId)}),e.addEventListener("pointermove",a=>{if(!o)return;i=!0;let c=Math.max(8,Math.min(window.innerWidth-52,a.clientX-s)),m=Math.max(8,Math.min(window.innerHeight-52,a.clientY-r));e.style.left=`${c}px`,e.style.top=`${m}px`,e.style.right="auto",e.style.bottom="auto"}),e.addEventListener("pointerup",()=>{if(o&&i){let a=e.getBoundingClientRect();bn(a.left,a.top)}o=!1}),e.addEventListener("click",()=>{i||(Ht?U():_t(t))}),t.appendChild(e)}function xn(){_t(Se())}var we=I({name:"Settings",description:"Floating Bloom++ settings button.",authors:[H.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Dt}`],start(){lt("settings",""),yn();try{GM_registerMenuCommand?.("Bloom++ settings",xn)}catch{}},stop(){U(),S?.remove(),S=null,T=null}});function Ft(t){return t instanceof HTMLLinkElement&&(t.relList.contains("icon")||/\bicon\b/i.test(t.rel))}function vn(t){let{head:e}=document;if(e)for(let n of e.querySelectorAll("link"))n.id!==t&&Ft(n)&&n.remove()}function bt(t,e,n="image/svg+xml"){let{head:o}=document;if(!o)return;vn(t);let i=document.getElementById(t);i?o.firstChild!==i&&o.prepend(i):(i=document.createElement("link"),i.id=t,i.rel="icon shortcut icon",i.type=n,i.setAttribute("sizes","any"),o.prepend(i)),i.getAttribute("href")!==e&&i.setAttribute("href",e)}function Le(t,e){let{head:n}=document;if(!n)return null;let o=new MutationObserver(i=>{for(let s of i){if(s.type==="attributes"&&Ft(s.target)&&s.target.id!==t){e();return}for(let r of s.addedNodes)if(Ft(r)&&r.id!==t){e();return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel"]}),o}var Me='form[data-type="unified-composer"], form.w-full[data-type]',k="#prompt-textarea",ht='button[data-testid="send-button"]',Ce='button[data-testid="stop-button"]';function w(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Y(t,e,n=!1){let o=Array.from(t.querySelectorAll(e));for(let i of o)if(i instanceof HTMLElement&&!(n&&!w(i)))return i;return null}function P(){let e=Array.from(document.querySelectorAll(Me)).find(w);if(e instanceof HTMLElement)return e;let n=Y(document,k),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function B(){let t=Array.from(document.querySelectorAll(k));return t.find(w)??t[0]??null}function $t(){let t=B();return t?(t.innerText??t.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function En(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function W(){let t=P();return Y(t,ht)??Y(document,ht)}function Kt(){let t=W();return!!t&&En(t)}function Gt(){let t=P();return Y(t,Ce,!0)??Y(document,Ce,!0)}function _(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>n.textContent??"").join(`
`):t.innerText??t.textContent??""}function yt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=m=>{let u=n.indexOf(m);return u>=0&&n[u+1]||""},i=o("c")||o("chat")||o("conversation")||"",s=n.slice(-1)[0]||"",r=/^[a-z0-9_-]{8,}$/i.test(s)?s:"",a=(m,u)=>{try{return document.querySelector(m)?.getAttribute(u)||""}catch{return""}};return[a("[data-conversation-id]","data-conversation-id")||a("[data-thread-id]","data-thread-id")||a("[data-chat-id]","data-chat-id")||"",e,i||r].filter(Boolean).join("|")}function xt(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function Sn(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(w(e)&&/\bStop\b/i.test(e.textContent||""))return e;return null}function wn(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&w(t))}function Ln(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&w(t))}function jt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function vt(){return Gt()||Sn()?!0:W()&&w(W())?!1:!!(wn()||Ln())}var Cn=["original","badge","dot","hole","bg"],Te=[{label:"only emoji",value:"original"},{label:"Badge + glyph",value:"badge",default:!0},{label:"Color dot",value:"dot"},{label:"Mark tint",value:"hole"},{label:"Background tint",value:"bg"}],Mn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Et="#050505",St="#FCFCFC",Tn="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",kn={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"};function ke(t){return typeof t=="string"&&Cn.includes(t)}function Pn(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function wt(t,e="0 0 64 64"){let n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${e}" width="64" height="64">${t}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function An(t){return[`<g transform="translate(8 8) scale(2)" fill="${t}" fill-rule="evenodd">`,`<path d="${Tn}"/>`,"</g>"].join("")}function Lt(t,e){return`<rect width="64" height="64" rx="14" fill="${e}"/>${An(t)}`}function On(t){return t==="rotate"?['<g transform="translate(51.5 51.5)"><g>','<path d="M0-6.1 A6.1 6.1 0 1 1 -5.3 3.05" fill="none" stroke="#fff" stroke-width="2.15" stroke-linecap="round"/>','<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.85s" repeatCount="indefinite"/>',"</g></g>"].join(""):t==="done"?'<path d="M46.6 51.7 L50.1 55.3 L56.8 47.4" fill="none" stroke="#fff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>':t==="ready"?['<path d="M51.5 56.4 V46.8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>','<path d="M46.6 51.2 L51.5 46.2 L56.4 51.2" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'].join(""):['<path d="M47.2 47.2 L55.8 55.8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>','<path d="M55.8 47.2 L47.2 55.8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>'].join("")}function X(t,e,n){if(t==="original")return e==="wait"?n:Pn(kn[e]);let o=e==="wait"?void 0:Mn[e];if(t==="hole")return wt(Lt(o??St,Et));if(t==="bg")return wt(Lt(St,o??Et));if(!o||e==="wait")return wt(Lt(St,Et));let i=t==="dot"?['<circle cx="52.2" cy="52.2" r="10.4" fill="#050505"/>',`<circle cx="52.2" cy="52.2" r="7.7" fill="${o}"/>`].join(""):['<circle cx="51.5" cy="51.5" r="12.15" fill="#050505"/>',`<circle cx="51.5" cy="51.5" r="9.55" fill="${o}"/>`,On(e)].join("");return wt(Lt(St,Et)+i)}function qt(t,e){return{wait:X(t,"wait",e),rotate:X(t,"rotate",e),done:X(t,"done",e),ready:X(t,"ready",e),error:X(t,"error",e)}}var Rn=new f("ChatStateFavicons"),D="bloom-chat-state-favicon",Oe=ft({style:{type:3,description:"How the blossom mark is overlaid with chat state.",options:Te}}),Re="",nt=qt("badge",""),Vt="wait",Q=!1,L=!1,b=null,tt="",et="",ot=!0,zt=null,J=null,A=null,Z=null,F=0,rt=!1;function In(){let t=Oe.store.style;return ke(t)?t:"badge"}function Bn(){let e=document.querySelector(`link[rel~="icon"]:not(#${D})`)?.href;return e&&!e.startsWith("data:")?e:Dn()}function Dn(){return nt.wait||"/favicon.ico"}function v(t){Vt=t,bt(D,nt[t])}function Pe(){nt=qt(In(),Re),bt(D,nt[Vt])}function Nn(){let t=yt(),e=t?xt(t):xt("");return vt()?(!tt&&e&&(tt=e),tt||e):(tt="",e)}function Ie(){Q=!1,L=!1,b=null,tt=""}function Hn(t){et=t,Ie(),ot=!1,A?.disconnect(),A=null,v("wait")}function Be(){if(!rt)return;let t=yt()||location.pathname;if(et&&t&&et!==t){Hn(t);return}t&&(et=t);let e=Nn(),n=vt(),o=$t(),i=Kt();if(jt()&&!n){v("error"),Q=!1,L=!1,b=null;return}if(n){Q=!0,L=!1,b=e,v("rotate");return}if(Q){let s=!!b&&!!e&&b===e;if(Q=!1,s){L=!0,b=e,v("done");return}L=!1,b=null}if(L)if(!!(b&&e&&b!==e))L=!1,b=null;else if(o){v("done");return}else if(ot){L=!1,v("ready");return}else{L=!1,v("wait");return}b=null,v(o?"wait":ot?"ready":"wait")}function Ct(){!rt||F||(F=requestAnimationFrame(()=>{if(F=0,!rt)return;De();let t=P();(!A||!t.isConnected)&&Ne(),Be()}))}function Ae(){ot=!0,Ct()}function De(){let t=B();!t||t.dataset.bloomCsfBound==="1"||(t.dataset.bloomCsfBound="1",t.addEventListener("input",Ae,{passive:!0}),t.addEventListener("compositionend",Ae,{passive:!0}))}function Ne(){A?.disconnect();let t=P();A=new MutationObserver(()=>Ct()),A.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}var He=I({name:"ChatStateFavicons",description:"Show streaming, done, ready, and error states on the tab favicon.",authors:[H.p],tags:["chat","ui"],enabledByDefault:!0,settings:Oe,startAt:"HostReady",cleanupSelectors:[`#${D}`],start(){rt=!0,Re=Bn(),Pe(),zt=Le(D,()=>bt(D,nt[Vt])),Z?.abort(),Z=new AbortController,window.addEventListener("popstate",Ct,{signal:Z.signal}),J?.disconnect(),J=new MutationObserver(()=>Ct()),document.body&&J.observe(document.body,{childList:!0,subtree:!0}),De(),Ne(),Be(),Rn.debug("favicon watch started")},stop(){rt=!1,F&&cancelAnimationFrame(F),F=0,Z?.abort(),Z=null,J?.disconnect(),J=null,A?.disconnect(),A=null,zt?.disconnect(),zt=null,Ie(),et="",ot=!0,document.getElementById(D)?.remove()},onSettingsChange:Pe});var _e=`.bloom-ih-hud {
    contain: content;
    position: fixed;
    z-index: 2147483646;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--border-light, color-mix(in srgb, currentColor 18%, transparent));
    border-radius: 0.5rem;
    background: var(--main-surface-primary, #212121);
    color: var(--text-secondary, #b4b4b4);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
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
    gap: 0.75rem;
}

.bloom-ih-search {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
    background: color-mix(in srgb, currentColor 6%, transparent);
    color: inherit;
    font: inherit;
}

.bloom-ih-empty {
    margin: 0;
    color: color-mix(in srgb, currentColor 55%, transparent);
    font-size: 0.8125rem;
}

.bloom-ih-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;
    max-height: min(22rem, 45vh);
}

.bloom-ih-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem;
    border: 1px solid transparent;
    border-radius: 0.75rem;
    background: color-mix(in srgb, currentColor 6%, transparent);
    text-align: left;
}

.bloom-ih-item:hover {
    background: color-mix(in srgb, currentColor 10%, transparent);
}

.bloom-ih-body {
    display: block;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-size: 0.8125rem;
    line-height: 1.45;
}

.bloom-ih-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.bloom-ih-actions {
    display: flex;
    gap: 0.25rem;
}

.bloom-ih-actions button {
    width: 2.25rem;
    height: 2.25rem;
    border: 0;
    border-radius: 0.5rem;
    background: color-mix(in srgb, currentColor 10%, transparent);
    color: inherit;
    cursor: pointer;
}

.bloom-ih-pager {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.8125rem;
    font-variant-numeric: tabular-nums;
}

.bloom-ih-clear {
    border: 0;
    background: transparent;
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
    font: inherit;
}

@media (prefers-reduced-motion: reduce) {
    .bloom-ih-hud { transition: none; }
}
`;var Fe=new f("InputHistory"),Ut=/\u200B/g,$e=10,Ke=500,Ge=100,Fn=8,$n=120,Kn=2e3,Mt=10,Tt=ft({maxEntries:{type:4,description:"Maximum stored prompts.",min:$e,max:Ke,default:Ge},history:{type:5,description:"Stored prompts.",render:Qn}}),Yt=new Map,d=0,Wt="",E=!1,at=!1,Jt=0,it=null,Xt,Zt=null,je=!0;function h(){let t=Tt.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function qe(t){let e=ce(Number(Tt.store.maxEntries??Ge),$e,Ke);return t.length>e?t.slice(t.length-e):t}function kt(t){Tt.store.entries=qe(t)}function Gn(t){return t.replaceAll(Ut,"").replace(/\n$/,"").trim()}function st(t){let n=(t instanceof Element?t:null)?.closest?.(k);return n instanceof HTMLElement?n:B()}function jn(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!_(t))return{first:!0,last:!0};try{let o=e.getRangeAt(0),i=document.createRange();i.selectNodeContents(t),i.setEnd(o.startContainer,o.startOffset);let s=document.createRange();return s.selectNodeContents(t),s.setStart(o.endContainer,o.endOffset),{first:i.toString().replaceAll(Ut,"").trim().length===0,last:s.toString().replaceAll(Ut,"").trim().length===0}}catch{return{first:!0,last:!0}}}function ze(t,e){let n=t.pmViewDesc?.view;if(n)try{let s=n.state.selection.constructor,r=e?s.atStart(n.state.doc):s.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(r).scrollIntoView());return}catch(s){Fe.debug("pm caret failed:",s)}let o=window.getSelection();if(!o)return;let i=document.createRange();i.selectNodeContents(t),i.collapse(e),o.removeAllRanges(),o.addRange(i)}function Ve(t){clearTimeout(Xt),Xt=setTimeout(()=>{if(t!==Jt)return;at=!1;let e=Zt;e&&ze(e,je)},$n)}function Ue(t,e,n){t.focus();let o=window.getSelection();if(!o)return;let i=document.createRange();i.selectNodeContents(t),o.removeAllRanges(),o.addRange(i),at=!0,Zt=t,je=n;let s=++Jt;try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch(r){Fe.debug("insertText failed:",r),t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:"insertText"}))}ze(t,n),Ve(s)}function Ye(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.documentElement.appendChild(t)),t}function $(){Ye().classList.remove("bloom-ih-hud-on")}function qn(t,e){let n=Ye();n.textContent=t;let o=(e.closest("form")??P()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Fn)}px`,n.classList.add("bloom-ih-hud-on")}function Qt(t){let e=Gn(t);if(!e)return;let n=Date.now(),o=Yt.get(e);if(o&&n-o<Kn)return;Yt.set(e,n);let i=h().filter(s=>s!==e);i.push(e),kt(i),d=h().length,E=!1,$()}function zn(t,e){let n=h();if(!n.length&&t)return;d>=n.length&&(Wt=_(e),d=n.length);let o=t?d-1:d+1;o<0||o>n.length||(d=o,E=!0,Ue(e,o===n.length?Wt:n[o],t),o<n.length?qn(`${o+1} / ${n.length}`,e):$())}function Vn(t){E=!1,$(),Ue(t,Wt,!1),d=h().length}function Un(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=st(t.target);if((!e||!e.contains(t.target)&&t.target!==e)&&(!st(document.activeElement)||t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"))return;let n=st(t.target)??st(document.activeElement);if(!n)return;if(t.key==="Escape"&&E&&!t.altKey&&!t.shiftKey){Vn(n),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){Qt(_(n));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let o=t.key==="ArrowUp",i=t.altKey,s=h();if(!i){let r=jn(n);if(o&&!r.first||!o&&!r.last)return}o&&(!s.length||d<=0)||!o&&d>=s.length||(t.preventDefault(),t.stopImmediatePropagation(),zn(o,n))}function Yn(t){if(st(t.target)){if(at){Ve(Jt);return}E&&(E=!1,$(),d=h().length)}}function Wn(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(k);n instanceof HTMLElement&&Qt(_(n))}function Xn(t){let e=t.target;if(!(e instanceof Element)||!e.closest(ht))return;let o=B();o&&Qt(_(o))}function Jn(){!E||at||(E=!1,$())}function Zn(t){let e=h().slice();e.splice(t,1),kt(e),d>e.length&&(d=e.length)}function Qn(t){t.className="bloom-ih-panel";let e="",n=0,o=-1,i=()=>{let s=h().slice().reverse(),r=e.trim().toLowerCase(),a=r?s.filter(g=>g.toLowerCase().includes(r)):s,c=Math.max(1,Math.ceil(a.length/Mt));n>=c&&(n=c-1);let m=a.slice(n*Mt,n*Mt+Mt);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.placeholder="Search history",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,i()}),t.appendChild(u),m.length){let g=document.createElement("div");g.className="bloom-ih-list",m.forEach((Pt,At)=>{let Qe=s.indexOf(Pt),tn=h().length-1-Qe,Ot=document.createElement("div");Ot.className="bloom-ih-item";let K=document.createElement("button");K.type="button",K.className=`bloom-ih-body${o===At?"":" bloom-ih-clamp"}`,K.textContent=Pt,K.addEventListener("click",()=>{o=o===At?-1:At,i()});let Rt=document.createElement("div");Rt.className="bloom-ih-actions";let G=document.createElement("button");G.type="button",G.title="Copy",G.textContent="C",G.addEventListener("click",()=>{de(Pt)});let j=document.createElement("button");j.type="button",j.title="Delete",j.textContent="\xD7",j.addEventListener("click",()=>{Zn(tn),i()}),Rt.append(G,j),Ot.append(K,Rt),g.appendChild(Ot)}),t.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=a.length?"No matches.":"No stored prompts yet.",t.appendChild(g)}let y=document.createElement("div");y.className="bloom-ih-pager";let p=document.createElement("button");p.type="button",p.textContent="Prev",p.disabled=n<=0,p.addEventListener("click",()=>{n-=1,i()});let C=document.createElement("span");C.textContent=`${n+1} / ${c}`;let O=document.createElement("button");O.type="button",O.textContent="Next",O.disabled=n+1>=c,O.addEventListener("click",()=>{n+=1,i()});let R=document.createElement("button");R.type="button",R.className="bloom-ih-clear",R.textContent="Clear all",R.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(kt([]),d=0,i())}),y.append(p,C,O,R),t.appendChild(y)};return i(),()=>{t.replaceChildren()}}var We=I({name:"InputHistory",description:"Recall previous chat prompts with Arrow Up and Arrow Down, like a shell.",authors:[H.p],tags:["chat"],enabledByDefault:!0,settings:Tt,managedStyle:"inputHistory",cleanupSelectors:[".bloom-ih-hud"],start(){if(lt("inputHistory",_e),it)return;d=h().length,E=!1,it=new AbortController;let{signal:t}=it;document.addEventListener("keydown",Un,{capture:!0,signal:t}),document.addEventListener("input",Yn,{capture:!0,signal:t}),document.addEventListener("submit",Wn,{capture:!0,signal:t}),document.addEventListener("click",Xn,{capture:!0,signal:t}),document.addEventListener("pointerdown",Jn,{capture:!0,signal:t})},stop(){it?.abort(),it=null,$(),Yt.clear(),clearTimeout(Xt),at=!1,Zt=null,E=!1},onSettingsChange(){let t=h(),e=qe(t);e.length!==t.length&&kt(e),d>e.length&&(d=e.length)}});var Xe=new f("Bloom"),Je=!1,to=[we,He,We];function eo(){return new Promise(t=>{let e=()=>document.body?(t(),!0):!1;if(e())return;let n=new MutationObserver(()=>{e()&&n.disconnect()});n.observe(document.documentElement,{childList:!0,subtree:!0}),setTimeout(()=>{n.disconnect(),t()},15e3)})}async function te(){await me()}async function ee(){if(Je)return;Je=!0;for(let e of to)try{pe(e)}catch(n){Xe.error("register failed",e.name,n)}he(),gt("Init");let t=()=>gt("DOMContentLoaded");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await eo(),gt("HostReady"),Xe.info("ready")}var Ze=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!Ze.Bloom&&(Object.defineProperty(Ze,"Bloom",{value:ne,writable:!1,configurable:!0}),te().then(()=>ee()).catch(t=>console.error("[Bloom++] Fatal init error:",t)));})();
