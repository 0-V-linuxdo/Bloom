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

"use strict";(()=>{var vn=Object.defineProperty;var xn=(e,t)=>{for(var n in t)vn(e,n,{get:t[n],enumerable:!0})};var pt={};xn(pt,{REPO_URL:()=>It,Settings:()=>c,VERSION:()=>Rt,init:()=>mt,initSettings:()=>dt,plugins:()=>E});var D=new Map;function he(e,t){let n=D.get(e);n||(n=document.createElement("style"),n.dataset.bloomStyle=e,(document.head??document.documentElement).appendChild(n),D.set(e,n)),n.textContent=t}function ft(e){let t=D.get(e);t&&(t.disabled=!1)}function gt(e){let t=D.get(e);t&&(t.disabled=!0)}function bt(e){D.get(e)?.remove(),D.delete(e)}var f=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function I(e){return e}var Ke=new Map;function ht(e,t){let n=Ke.get(e);return n||(n=new Set,Ke.set(e,n)),n.add(t),()=>n.delete(t)}function Y(e,t){let n=Ke.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var yn="bloompp";function vt(){return new Promise((e,t)=>{let n=indexedDB.open(yn,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function xt(e){try{let t=await vt();return await new Promise((n,o)=>{let s=t.transaction("kv","readonly").objectStore("kv").get(e);s.onsuccess=()=>n(s.result),s.onerror=()=>o(s.error)})}catch{return}}async function yt(e,t){try{let n=await vt();await new Promise((o,r)=>{let i=n.transaction("kv","readwrite").objectStore("kv").put(t,e);i.onsuccess=()=>o(),i.onerror=()=>r(i.error)})}catch{}}function X(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function St(e,t,n){return Math.min(n,Math.max(t,e))}function Et(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function wt(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var ve=new f("SettingsStore"),P="BloomSettings",Sn=100;function ye(e){if(X(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(X(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return X(n)?n:null}return null}catch{return null}}var xe=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(s,i)=>{let a=s[i];if(a===void 0&&i!=="__proto__"){let l=n?`${n}.${i}`:i;for(let[u,m]of this.defaultGetters)if(l.startsWith(u)){let S=l.slice(u.length+1);if(S&&!S.includes(".")){let g=m(S);g!==void 0&&(s[i]=g,a=g);break}}}return X(a)?this.makeProxy(a,n?`${n}.${i}`:i):a},set:(s,i,a)=>{if(s[i]===a)return!0;s[i]=a;let l=n?`${n}.${i}`:i;return this.notifyListeners(l),!0},deleteProperty:(s,i)=>{if(!(i in s))return!0;delete s[i];let a=n?`${n}.${i}`:i;return this.notifyListeners(a),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){ve.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Sn))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(P,this.plain)}catch{try{GM_setValue(P,t)}catch(n){ve.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(P,t)}catch{}yt(P,t).catch(n=>ve.warn("Failed to save settings to IndexedDB:",n))}catch(t){ve.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Et(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var En=new f("Settings"),wn={plugins:{}},c=new xe(structuredClone(wn)),Ln=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Cn(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function H(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(c.store.plugins[n]||(c.store.plugins[n]={}),c.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?c.plain.plugins[n]??{}:{}}};return t}function kn(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Lt(){let e=null;if(e=ye(kn(P)),e||(e=ye(await xt(P))),!e)try{e=ye(localStorage.getItem(P))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(c.plain.plugins=t),En.debug("Loaded settings")}}function Ct(e,t){t&&(t.pluginName=e,c.plain.plugins[e]||(c.plain.plugins[e]={}),c.setDefaultGetter(Ln(e),n=>{if(n!=="enabled")return Cn(t.def,n)}))}var Se=new f("PluginManager"),E={},J=new Set;function kt(e){if(E[e.name]){Se.warn("Duplicate plugin",e.name);return}E[e.name]=e,Ct(e.name,e.settings)}function Z(e){let t=E[e];if(!t)return!1;if(t.required)return!0;let n=c.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Mt(e){let t=E[e];if(!t||t.required)return;let n=!Z(e);c.plain.plugins[e]||(c.store.plugins[e]={}),c.store.plugins[e].enabled=n,n?Tt(t):Mn(t),Y("pluginToggle",{name:e,enabled:n})}function Tt(e,t=!1){if(!J.has(e.name)&&Z(e.name))try{e.managedStyle&&ft(e.managedStyle),e.start?.(),J.add(e.name),e.settings&&c.addPrefixChangeListener(`plugins.${e.name}.`,()=>{J.has(e.name)&&e.onSettingsChange?.()}),t||Se.debug("Started",e.name)}catch(n){Se.error("Failed to start",e.name,n)}}function Mn(e){if(J.has(e.name)){try{e.stop?.()}catch(t){Se.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(gt(e.managedStyle),bt(e.managedStyle)),J.delete(e.name)}}function Ee(e){for(let t of Object.values(E))(t.startAt??"DOMContentLoaded")===e&&Tt(t)}function Pt(){for(let e of Object.values(E))c.plain.plugins[e.name]||(c.store.plugins[e.name]={enabled:e.enabledByDefault!==!1})}function At(e){return e==="auto"||e==="light"||e==="dark"}function Tn(){let e=document.documentElement;if(e.classList.contains("light"))return"light";if(e.classList.contains("dark"))return"dark";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e).colorScheme||"";if(/\blight\b/.test(n)&&!/\bdark\b/.test(n))return"light";if(/\bdark\b/.test(n)&&!/\blight\b/.test(n))return"dark"}catch{}return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function we(e){return e==="auto"?Tn():e}function Ot(e){let t=document.documentElement,n=new MutationObserver(e);n.observe(t,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","style"]});let o=window.matchMedia("(prefers-color-scheme: dark)");return o.addEventListener("change",e),()=>{n.disconnect(),o.removeEventListener("change",e)}}var F={p:"0-V-linuxdo"},Rt="[20260901] v1.0.0",It="https://github.com/0-V-linuxdo/Bloom";var Bt=`:host {
  all: initial;
}

:host {
  --bloom-bg: #0c0d0c;
  --bloom-surface: #161816;
  --bloom-elevated: #1e211e;
  --bloom-fg: #e8efe9;
  --bloom-muted: #8b958c;
  --bloom-border: rgb(232 239 233 / 14%);
  --bloom-shadow: 0 1px 2px rgb(0 0 0 / 18%), 0 18px 48px rgb(0 0 0 / 38%);
  --bloom-fab-shadow: 0 1px 2px rgb(0 0 0 / 20%), 0 10px 28px rgb(0 0 0 / 28%);
  --bloom-ring: #c5d0c6;
  --bloom-ease: cubic-bezier(0.22, 1, 0.36, 1);
  color-scheme: dark;
  font: 14px/1.45 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--bloom-fg);
  -webkit-font-smoothing: antialiased;
}

:host([data-bloom-scheme="light"]) {
  color-scheme: light;
  --bloom-bg: #f3f1eb;
  --bloom-surface: #fffcf7;
  --bloom-elevated: #ebe7df;
  --bloom-fg: #171816;
  --bloom-muted: #5e635f;
  --bloom-border: rgb(23 24 22 / 12%);
  --bloom-shadow: 0 1px 2px rgb(23 24 22 / 6%), 0 18px 48px rgb(23 24 22 / 14%);
  --bloom-fab-shadow: 0 1px 2px rgb(23 24 22 / 8%), 0 10px 28px rgb(23 24 22 / 12%);
  --bloom-ring: #3d423e;
}

.bloom-settings-fab {
  position: fixed;
  z-index: 2147483645;
  right: 24px;
  bottom: 24px;
  width: 48px;
  height: 48px;
  margin: 0;
  padding: 0;
  border: 1px solid var(--bloom-border);
  border-radius: 999px;
  background: var(--bloom-surface);
  color: var(--bloom-fg);
  box-shadow: var(--bloom-fab-shadow);
  cursor: grab;
  display: grid;
  place-items: center;
  transition:
    transform 180ms var(--bloom-ease),
    box-shadow 180ms var(--bloom-ease),
    background-color 180ms var(--bloom-ease),
    color 180ms var(--bloom-ease);
}

.bloom-settings-fab:hover {
  transform: translateY(-1px);
}

.bloom-settings-fab:active,
.bloom-settings-fab.is-dragging {
  cursor: grabbing;
  transform: scale(0.98);
}

.bloom-settings-fab:focus-visible {
  outline: 2px solid var(--bloom-ring);
  outline-offset: 3px;
}

.bloom-settings-fab svg {
  width: 20px;
  height: 20px;
  display: block;
}

.bloom-settings-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  border: 0;
  padding: 0;
  margin: 0;
  background: rgb(0 0 0 / 46%);
  cursor: pointer;
}

:host([data-bloom-scheme="light"]) .bloom-settings-backdrop {
  background: rgb(23 24 22 / 28%);
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
  border: 1px solid var(--bloom-border);
  border-radius: 28px;
  background: var(--bloom-surface);
  color: var(--bloom-fg);
  box-shadow: var(--bloom-shadow);
}

.bloom-settings-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.bloom-settings-mark {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--bloom-elevated);
  color: var(--bloom-fg);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.bloom-settings-mark svg {
  width: 16px;
  height: 16px;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.bloom-icon-btn {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--bloom-muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 0 0 auto;
}

.bloom-icon-btn:hover {
  color: var(--bloom-fg);
  background: var(--bloom-elevated);
}

.bloom-icon-btn svg {
  width: 16px;
  height: 16px;
}

.bloom-seg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin: 0 0 16px;
  padding: 4px;
  border-radius: 16px;
  background: var(--bloom-elevated);
}

.bloom-seg button {
  height: 36px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--bloom-muted);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
}

.bloom-seg button[aria-pressed="true"] {
  background: var(--bloom-surface);
  color: var(--bloom-fg);
  box-shadow: 0 0 0 1px var(--bloom-border);
}

.bloom-plugin-card {
  padding: 16px;
  border-radius: 20px;
  background: var(--bloom-elevated);
  margin-bottom: 12px;
}

.bloom-plugin-card:last-child {
  margin-bottom: 0;
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
  letter-spacing: -0.02em;
}

.bloom-plugin-card p {
  margin: 4px 0 0;
  color: var(--bloom-muted);
  font-size: 0.8125rem;
}

.bloom-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: var(--bloom-muted);
  cursor: pointer;
  user-select: none;
}

.bloom-switch {
  position: relative;
  width: 44px;
  height: 26px;
  flex: 0 0 auto;
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
  width: 44px;
  height: 26px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--bloom-fg) 16%, transparent);
  border: 1px solid var(--bloom-border);
  transition: background-color 150ms var(--bloom-ease);
}

.bloom-switch span::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: var(--bloom-surface);
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  transition: transform 150ms var(--bloom-ease);
}

.bloom-switch input:checked + span {
  background: var(--bloom-fg);
}

.bloom-switch input:checked + span::after {
  transform: translateX(18px);
  background: var(--bloom-bg);
}

.bloom-switch input:focus-visible + span {
  outline: 2px solid var(--bloom-ring);
  outline-offset: 2px;
}

.bloom-switch input:disabled + span {
  opacity: 0.45;
}

.bloom-field {
  display: grid;
  gap: 6px;
  margin-top: 12px;
}

.bloom-field > span:first-child {
  font-size: 0.75rem;
  color: var(--bloom-muted);
}

.bloom-field select,
.bloom-field input[type="range"] {
  width: 100%;
}

.bloom-field select {
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--bloom-border);
  background: var(--bloom-surface);
  color: inherit;
  padding: 0 10px;
  font: inherit;
}

.bloom-field input[type="range"] {
  accent-color: var(--bloom-fg);
}

@media (prefers-reduced-motion: reduce) {
  .bloom-settings-fab,
  .bloom-settings-modal,
  .bloom-switch span,
  .bloom-switch span::after {
    transition: none;
  }
}
`;var je="bloom-root",Nt="bloom-fab-pos",Ve=H({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),b=null,h=null,Ue=!1,ze=[],Le=null;function Dt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function An(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Ht(){let e=Ve.store.appearance;return At(e)?e:"auto"}function Q(){if(!b)return;let e=Ht(),t=we(e);b.setAttribute("data-bloom-scheme",t),Y("schemeChange",{scheme:t,pref:e})}function On(){try{let e=localStorage.getItem(Nt);if(!e)return null;let t=JSON.parse(e);if(typeof t.x=="number"&&typeof t.y=="number")return{x:t.x,y:t.y}}catch{}return null}function Rn(e,t){try{localStorage.setItem(Nt,JSON.stringify({x:e,y:t}))}catch{}}function Ft(){if(h)return h;if(b=document.getElementById(je),b||(b=document.createElement("div"),b.id=je,document.documentElement.appendChild(b)),h=b.shadowRoot??b.attachShadow({mode:"open"}),!h.querySelector("style[data-bloom]")){let e=document.createElement("style");e.dataset.bloom="1",e.textContent=Bt,h.appendChild(e)}return Q(),h}function ee(){Ue=!1;for(let e of ze)e();ze=[],h?.querySelector(".bloom-settings-backdrop")?.remove(),h?.querySelector(".bloom-settings-modal")?.remove()}function In(e,t,n){if(n.type===5&&n.render){let i=document.createElement("div");return i.className="bloom-field",ze.push(n.render(i)),i}let o=document.createElement("label");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let s=c.store.plugins[e]??(c.store.plugins[e]={});if(n.type===3&&n.options){let i=document.createElement("select");for(let a of n.options){let l=document.createElement("option");l.value=a.value,l.textContent=a.label,i.appendChild(l)}return i.value=String(s[t]??n.options.find(a=>a.default)?.value??n.options[0].value),i.addEventListener("change",()=>{s[t]=i.value}),o.appendChild(i),o}if(n.type===4){let i=document.createElement("input");i.type="range",i.min=String(n.min??0),i.max=String(n.max??100),i.value=String(s[t]??n.min??0);let a=document.createElement("span");return a.textContent=i.value,i.addEventListener("input",()=>{s[t]=Number(i.value),a.textContent=i.value}),o.append(i,a),o}if(n.type===2){let i=document.createElement("label");i.className="bloom-toggle";let a=document.createElement("span");a.className="bloom-switch";let l=document.createElement("input");l.type="checkbox",l.checked=!!s[t],l.addEventListener("change",()=>{s[t]=l.checked});let u=document.createElement("span");return a.append(l,u),i.append(a),o.appendChild(i),o}return o}function Bn(e){let t=Ht(),n=document.createElement("div");n.className="bloom-seg",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Appearance");let o=[{value:"auto",label:"\u81EA\u52A8"},{value:"light",label:"\u6D45\u8272"},{value:"dark",label:"\u6DF1\u8272"}];for(let r of o){let s=document.createElement("button");s.type="button",s.textContent=r.label,s.setAttribute("aria-pressed",String(t===r.value)),s.addEventListener("click",()=>{Ve.store.appearance=r.value,Q(),h&&Ce(h)}),n.appendChild(s)}e.appendChild(n)}function Ce(e){ee(),Ue=!0;let t=document.createElement("button");t.type="button",t.className="bloom-settings-backdrop",t.setAttribute("aria-label","Close settings"),t.addEventListener("click",ee);let n=document.createElement("div");n.className="bloom-settings-modal",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","bloom-settings-title"),n.addEventListener("click",l=>l.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let s=document.createElement("span");s.className="bloom-settings-mark",s.innerHTML=Dt();let i=document.createElement("h2");i.id="bloom-settings-title",i.textContent="Bloom++",r.append(s,i);let a=document.createElement("button");a.type="button",a.className="bloom-icon-btn",a.setAttribute("aria-label","Close"),a.innerHTML=An(),a.addEventListener("click",ee),o.append(r,a),n.appendChild(o),Bn(n);for(let l of Object.values(E)){if(l.hidden||l.name==="Settings")continue;let u=document.createElement("section");u.className="bloom-plugin-card";let m=document.createElement("header"),S=document.createElement("div"),g=document.createElement("h3");g.textContent=l.name;let q=document.createElement("p");q.textContent=l.description,S.append(g,q);let C=document.createElement("label");C.className="bloom-toggle";let k=document.createElement("span");k.className="bloom-switch";let d=document.createElement("input");d.type="checkbox",d.checked=Z(l.name),d.disabled=!!l.required,d.setAttribute("aria-label",`${l.name} enabled`),d.addEventListener("change",()=>{Mt(l.name),Ce(e)});let j=document.createElement("span");if(k.append(d,j),C.append(k,document.createTextNode(d.checked?"On":"Off")),m.append(S,C),u.appendChild(m),Z(l.name)&&l.settings)for(let[z,Fe]of Object.entries(l.settings.def)){let be=In(l.name,z,Fe);be&&u.appendChild(be)}n.appendChild(u)}e.append(t,n),Y("settingsOpen",void 0)}function Nn(){let e=Ft();e.querySelector(".bloom-settings-fab")?.remove();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.innerHTML=Dt();let n=On();n&&(t.style.left=`${n.x}px`,t.style.top=`${n.y}px`,t.style.right="auto",t.style.bottom="auto");let o=!1,r=!1,s=0,i=0;t.addEventListener("pointerdown",a=>{o=!0,r=!1,s=a.clientX-t.getBoundingClientRect().left,i=a.clientY-t.getBoundingClientRect().top,t.classList.add("is-dragging"),t.setPointerCapture(a.pointerId)}),t.addEventListener("pointermove",a=>{if(!o)return;r=!0;let l=Math.max(8,Math.min(window.innerWidth-56,a.clientX-s)),u=Math.max(8,Math.min(window.innerHeight-56,a.clientY-i));t.style.left=`${l}px`,t.style.top=`${u}px`,t.style.right="auto",t.style.bottom="auto"}),t.addEventListener("pointerup",()=>{if(t.classList.remove("is-dragging"),o&&r){let a=t.getBoundingClientRect();Rn(a.left,a.top)}o=!1}),t.addEventListener("click",()=>{r||(Ue?ee():Ce(e))}),e.appendChild(t)}function Dn(){Ce(Ft())}var $t=I({name:"Settings",description:"Floating Bloom++ settings button.",authors:[F.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Ve,startAt:"HostReady",cleanupSelectors:[`#${je}`],start(){he("settings",""),Nn(),Q(),Le?.(),Le=Ot(Q);try{GM_registerMenuCommand?.("Bloom++ settings",Dn)}catch{}},stop(){Le?.(),Le=null,ee(),b?.remove(),b=null,h=null},onSettingsChange:Q});function ke(e){return e instanceof HTMLLinkElement&&(e.relList.contains("icon")||/\bicon\b/i.test(e.rel))}function $(e){return!!e&&!e.startsWith("data:")&&e!=="undefined"}function Hn(e){let{head:t}=document;if(t)for(let n of t.querySelectorAll("link"))n.id!==e&&ke(n)&&n.remove()}function _t(e,t,n="image/svg+xml"){let{head:o}=document;if(!o)return;Hn(e);let r=document.getElementById(e);r?o.firstChild!==r&&o.prepend(r):(r=document.createElement("link"),r.id=e,r.rel="icon shortcut icon",r.type=t.startsWith("data:image/svg")||t.endsWith(".svg")?n:"",r.setAttribute("sizes","any"),o.prepend(r)),r.getAttribute("href")!==t&&r.setAttribute("href",t)}function Me(e,t){let{head:n}=document;if(!n)return;document.getElementById(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(ke);if(o.length){$(t)&&(o[0].href=t);return}if(!$(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.prepend(r)}function Kt(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{for(let s of r){if(s.type==="attributes"&&ke(s.target)&&s.target.id!==e){t(s.target.href);return}for(let i of s.addedNodes)if(ke(i)&&i.id!==e){t(i.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel"]}),o}var qt='form[data-type="unified-composer"], form.w-full[data-type]',A="#prompt-textarea",Te='button[data-testid="send-button"]',Gt='button[data-testid="stop-button"]';function M(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function te(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!M(r)))return r;return null}function O(){let t=Array.from(document.querySelectorAll(qt)).find(M);if(t instanceof HTMLElement)return t;let n=te(document,A),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function B(){let e=Array.from(document.querySelectorAll(A));return e.find(M)??e[0]??null}function We(){let e=B();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Fn(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function ne(){let e=O();return te(e,Te)??te(document,Te)}function Ye(){let e=ne();return!!e&&Fn(e)}function Xe(){let e=O();return te(e,Gt,!0)??te(document,Gt,!0)}function _(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}function Pe(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=u=>{let m=n.indexOf(u);return m>=0&&n[m+1]||""},r=o("c")||o("chat")||o("conversation")||"",s=n.slice(-1)[0]||"",i=/^[a-z0-9_-]{8,}$/i.test(s)?s:"",a=(u,m)=>{try{return document.querySelector(u)?.getAttribute(m)||""}catch{return""}};return[a("[data-conversation-id]","data-conversation-id")||a("[data-thread-id]","data-thread-id")||a("[data-chat-id]","data-chat-id")||"",t,r||i].filter(Boolean).join("|")}function Ae(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function $n(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(M(t)&&/\bStop\b/i.test(t.textContent||""))return t;return null}function _n(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&M(e))}function Kn(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&M(e))}function Je(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Oe(){return Xe()||$n()?!0:ne()&&M(ne())?!1:!!(_n()||Kn())}var Gn=["original","badge","dot","hole","bg"],jt=[{label:"only emoji",value:"original"},{label:"Badge + glyph",value:"badge",default:!0},{label:"Color dot",value:"dot"},{label:"Mark tint",value:"hole"},{label:"Background tint",value:"bg"}],qn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},jn={dark:{plate:"#050505",mark:"#FCFCFC",ring:"#050505",glyph:"#ffffff"},light:{plate:"#F3F1EB",mark:"#171816",ring:"#F3F1EB",glyph:"#ffffff"}},zn="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Vn={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"};function zt(e){return typeof e=="string"&&Gn.includes(e)}function Ze(e){return e==="original"||e==="badge"||e==="dot"}function Un(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function oe(e,t="0 0 64 64"){let n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t}" width="64" height="64">${e}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function Wn(e){return`<g transform="translate(8 8) scale(2)" fill="${e}" fill-rule="evenodd"><path d="${zn}"/></g>`}function re(e,t){return`<rect width="64" height="64" rx="14" fill="${t}"/>${Wn(e)}`}function Yn(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Xn(e){return`<image href="${Yn(e)}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>`}function Jn(e,t){return e==="rotate"?['<g transform="translate(51.5 51.5)"><g>',`<path d="M0-6.1 A6.1 6.1 0 1 1 -5.3 3.05" fill="none" stroke="${t}" stroke-width="2.15" stroke-linecap="round"/>`,'<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.85s" repeatCount="indefinite"/>',"</g></g>"].join(""):e==="done"?`<path d="M46.6 51.7 L50.1 55.3 L56.8 47.4" fill="none" stroke="${t}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`:e==="ready"?[`<path d="M51.5 56.4 V46.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M46.6 51.2 L51.5 46.2 L56.4 51.2" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`].join(""):[`<path d="M47.2 47.2 L55.8 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M55.8 47.2 L47.2 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`].join("")}function ie(e,t,n,o="dark"){let r=jn[o],s=n&&!n.startsWith("data:")?n:"";if(e==="original")return t==="wait"?s||oe(re(r.mark,r.plate)):Un(Vn[t]);let i=t==="wait"?void 0:qn[t];if(e==="hole")return oe(re(i??r.mark,r.plate));if(e==="bg")return oe(re(r.mark,i??r.plate));if(!i||t==="wait")return s||oe(re(r.mark,r.plate));let a=e==="dot"?[`<circle cx="52.2" cy="52.2" r="10.4" fill="${r.ring}"/>`,`<circle cx="52.2" cy="52.2" r="7.7" fill="${i}"/>`].join(""):[`<circle cx="51.5" cy="51.5" r="12.15" fill="${r.ring}"/>`,`<circle cx="51.5" cy="51.5" r="9.55" fill="${i}"/>`,Jn(t,r.glyph)].join(""),l=s?Xn(s):re(r.mark,r.plate);return oe(l+a)}function Qe(e,t,n="dark"){return{wait:ie(e,"wait",t,n),rotate:ie(e,"rotate",t,n),done:ie(e,"done",t,n),ready:ie(e,"ready",t,n),error:ie(e,"error",t,n)}}var Zn=new f("ChatStateFavicons"),N="bloom-chat-state-favicon",Wt=H({style:{type:3,description:"How the blossom mark is overlaid with chat state.",options:jt}}),w="",Ie="dark",Yt=Qe("badge","",Ie),nt="wait",le=!1,T=!1,v=null,ce="",ue="",de=!0,et=null,se=null,R=null,ae=null,tt=null,K=0,me=!1;function ot(){let e=Wt.store.style;return zt(e)?e:"badge"}function Qn(){let e=c.plain.plugins.Settings?.appearance;return e==="light"||e==="dark"?e:"auto"}function Xt(){return we(Qn())}function Vt(){let t=document.querySelector(`link[rel~="icon"]:not(#${N})`)?.href;return $(t)?t:$(w)?w:""}function x(e){nt=e;let t=ot();if(e==="wait"&&Ze(t)){Me(N,w);return}_t(N,Yt[e])}function Re(){Ie=Xt(),Yt=Qe(ot(),w,Ie),x(nt)}function eo(){let e=Pe(),t=e?Ae(e):Ae("");return Oe()?(!ce&&t&&(ce=t),ce||t):(ce="",t)}function Jt(){le=!1,T=!1,v=null,ce=""}function to(e){ue=e,Jt(),de=!1,R?.disconnect(),R=null,x("wait")}function Zt(){if(!me)return;let e=Pe()||location.pathname;if(ue&&e&&ue!==e){to(e);return}e&&(ue=e);let t=eo(),n=Oe(),o=We(),r=Ye();if(Je()&&!n){x("error"),le=!1,T=!1,v=null;return}if(n){le=!0,T=!1,v=t,x("rotate");return}if(le){let s=!!v&&!!t&&v===t;if(le=!1,s){T=!0,v=t,x("done");return}T=!1,v=null}if(T)if(!!(v&&t&&v!==t))T=!1,v=null;else if(o){x("done");return}else if(de){T=!1,x("ready");return}else{T=!1,x("wait");return}v=null,x(o?"wait":de?"ready":"wait")}function Be(){!me||K||(K=requestAnimationFrame(()=>{if(K=0,!me)return;Qt();let e=O();(!R||!e.isConnected)&&en(),Zt()}))}function Ut(){de=!0,Be()}function Qt(){let e=B();!e||e.dataset.bloomCsfBound==="1"||(e.dataset.bloomCsfBound="1",e.addEventListener("input",Ut,{passive:!0}),e.addEventListener("compositionend",Ut,{passive:!0}))}function en(){R?.disconnect();let e=O();R=new MutationObserver(()=>Be()),R.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}var tn=I({name:"ChatStateFavicons",description:"Show streaming, done, ready, and error states on the tab favicon.",authors:[F.p],tags:["chat","ui"],enabledByDefault:!0,settings:Wt,startAt:"HostReady",cleanupSelectors:[`#${N}`],start(){me=!0,Ie=Xt(),w=Vt()||w,Re(),et=Kt(N,e=>{if($(e)&&(w=e),nt==="wait"&&Ze(ot())){Me(N,w);return}Re()}),tt=ht("schemeChange",()=>{let e=Vt();e&&(w=e),Re()}),ae?.abort(),ae=new AbortController,window.addEventListener("popstate",Be,{signal:ae.signal}),se?.disconnect(),se=new MutationObserver(()=>Be()),document.body&&se.observe(document.body,{childList:!0,subtree:!0}),Qt(),en(),Zt(),Zn.debug("favicon watch started")},stop(){me=!1,K&&cancelAnimationFrame(K),K=0,ae?.abort(),ae=null,tt?.(),tt=null,se?.disconnect(),se=null,R?.disconnect(),R=null,et?.disconnect(),et=null,Jt(),ue="",de=!0,Me(N,w)},onSettingsChange:Re});var nn=`.bloom-ih-hud {
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
`;var on=new f("InputHistory"),rt=/\u200B/g,rn=10,sn=500,an=100,oo=8,ro=120,io=2e3,Ne=10,De=H({maxEntries:{type:4,description:"Maximum stored prompts.",min:rn,max:sn,default:an},history:{type:5,description:"Stored prompts.",render:vo}}),it=new Map,p=0,st="",L=!1,ge=!1,lt=0,pe=null,at,ct=null,ln=!0;function y(){let e=De.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function cn(e){let t=St(Number(De.store.maxEntries??an),rn,sn);return e.length>t?e.slice(e.length-t):e}function He(e){De.store.entries=cn(e)}function so(e){return e.replaceAll(rt,"").replace(/\n$/,"").trim()}function fe(e){let n=(e instanceof Element?e:null)?.closest?.(A);return n instanceof HTMLElement?n:B()}function ao(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!_(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let s=document.createRange();return s.selectNodeContents(e),s.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(rt,"").trim().length===0,last:s.toString().replaceAll(rt,"").trim().length===0}}catch{return{first:!0,last:!0}}}function un(e,t){let n=e.pmViewDesc?.view;if(n)try{let s=n.state.selection.constructor,i=t?s.atStart(n.state.doc):s.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(i).scrollIntoView());return}catch(s){on.debug("pm caret failed:",s)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function dn(e){clearTimeout(at),at=setTimeout(()=>{if(e!==lt)return;ge=!1;let t=ct;t&&un(t,ln)},ro)}function mn(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),ge=!0,ct=e,ln=n;let s=++lt;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(i){on.debug("insertText failed:",i),e.textContent=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"}))}un(e,n),dn(s)}function pn(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.documentElement.appendChild(e)),e}function G(){pn().classList.remove("bloom-ih-hud-on")}function lo(e,t){let n=pn();n.textContent=e;let o=(t.closest("form")??O()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-oo)}px`,n.classList.add("bloom-ih-hud-on")}function ut(e){let t=so(e);if(!t)return;let n=Date.now(),o=it.get(t);if(o&&n-o<io)return;it.set(t,n);let r=y().filter(s=>s!==t);r.push(t),He(r),p=y().length,L=!1,G()}function co(e,t){let n=y();if(!n.length&&e)return;p>=n.length&&(st=_(t),p=n.length);let o=e?p-1:p+1;o<0||o>n.length||(p=o,L=!0,mn(t,o===n.length?st:n[o],e),o<n.length?lo(`${o+1} / ${n.length}`,t):G())}function uo(e){L=!1,G(),mn(e,st,!1),p=y().length}function mo(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=fe(e.target);if((!t||!t.contains(e.target)&&e.target!==t)&&(!fe(document.activeElement)||e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"))return;let n=fe(e.target)??fe(document.activeElement);if(!n)return;if(e.key==="Escape"&&L&&!e.altKey&&!e.shiftKey){uo(n),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){ut(_(n));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let o=e.key==="ArrowUp",r=e.altKey,s=y();if(!r){let i=ao(n);if(o&&!i.first||!o&&!i.last)return}o&&(!s.length||p<=0)||!o&&p>=s.length||(e.preventDefault(),e.stopImmediatePropagation(),co(o,n))}function po(e){if(fe(e.target)){if(ge){dn(lt);return}L&&(L=!1,G(),p=y().length)}}function fo(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(A);n instanceof HTMLElement&&ut(_(n))}function go(e){let t=e.target;if(!(t instanceof Element)||!t.closest(Te))return;let o=B();o&&ut(_(o))}function bo(){!L||ge||(L=!1,G())}function ho(e){let t=y().slice();t.splice(e,1),He(t),p>t.length&&(p=t.length)}function vo(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let s=y().slice().reverse(),i=t.trim().toLowerCase(),a=i?s.filter(d=>d.toLowerCase().includes(i)):s,l=Math.max(1,Math.ceil(a.length/Ne));n>=l&&(n=l-1);let u=a.slice(n*Ne,n*Ne+Ne);e.replaceChildren();let m=document.createElement("input");if(m.className="bloom-ih-search",m.placeholder="Search history",m.value=t,m.addEventListener("input",()=>{t=m.value,n=0,r()}),e.appendChild(m),u.length){let d=document.createElement("div");d.className="bloom-ih-list",u.forEach((j,z)=>{let Fe=s.indexOf(j),be=y().length-1-Fe,$e=document.createElement("div");$e.className="bloom-ih-item";let V=document.createElement("button");V.type="button",V.className=`bloom-ih-body${o===z?"":" bloom-ih-clamp"}`,V.textContent=j,V.addEventListener("click",()=>{o=o===z?-1:z,r()});let _e=document.createElement("div");_e.className="bloom-ih-actions";let U=document.createElement("button");U.type="button",U.title="Copy",U.textContent="C",U.addEventListener("click",()=>{wt(j)});let W=document.createElement("button");W.type="button",W.title="Delete",W.textContent="\xD7",W.addEventListener("click",()=>{ho(be),r()}),_e.append(U,W),$e.append(V,_e),d.appendChild($e)}),e.appendChild(d)}else{let d=document.createElement("p");d.className="bloom-ih-empty",d.textContent=a.length?"No matches.":"No stored prompts yet.",e.appendChild(d)}let S=document.createElement("div");S.className="bloom-ih-pager";let g=document.createElement("button");g.type="button",g.textContent="Prev",g.disabled=n<=0,g.addEventListener("click",()=>{n-=1,r()});let q=document.createElement("span");q.textContent=`${n+1} / ${l}`;let C=document.createElement("button");C.type="button",C.textContent="Next",C.disabled=n+1>=l,C.addEventListener("click",()=>{n+=1,r()});let k=document.createElement("button");k.type="button",k.className="bloom-ih-clear",k.textContent="Clear all",k.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(He([]),p=0,r())}),S.append(g,q,C,k),e.appendChild(S)};return r(),()=>{e.replaceChildren()}}var fn=I({name:"InputHistory",description:"Recall previous chat prompts with Arrow Up and Arrow Down, like a shell.",authors:[F.p],tags:["chat"],enabledByDefault:!0,settings:De,managedStyle:"inputHistory",cleanupSelectors:[".bloom-ih-hud"],start(){if(he("inputHistory",nn),pe)return;p=y().length,L=!1,pe=new AbortController;let{signal:e}=pe;document.addEventListener("keydown",mo,{capture:!0,signal:e}),document.addEventListener("input",po,{capture:!0,signal:e}),document.addEventListener("submit",fo,{capture:!0,signal:e}),document.addEventListener("click",go,{capture:!0,signal:e}),document.addEventListener("pointerdown",bo,{capture:!0,signal:e})},stop(){pe?.abort(),pe=null,G(),it.clear(),clearTimeout(at),ge=!1,ct=null,L=!1},onSettingsChange(){let e=y(),t=cn(e);t.length!==e.length&&He(t),p>t.length&&(p=t.length)}});var gn=new f("Bloom"),bn=!1,xo=[$t,tn,fn];function yo(){return new Promise(e=>{let t=()=>document.body?(e(),!0):!1;if(t())return;let n=new MutationObserver(()=>{t()&&n.disconnect()});n.observe(document.documentElement,{childList:!0,subtree:!0}),setTimeout(()=>{n.disconnect(),e()},15e3)})}async function dt(){await Lt()}async function mt(){if(bn)return;bn=!0;for(let t of xo)try{kt(t)}catch(n){gn.error("register failed",t.name,n)}Pt(),Ee("Init");let e=()=>Ee("DOMContentLoaded");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await yo(),Ee("HostReady"),gn.info("ready")}var hn=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!hn.Bloom&&(Object.defineProperty(hn,"Bloom",{value:pt,writable:!1,configurable:!0}),dt().then(()=>mt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
