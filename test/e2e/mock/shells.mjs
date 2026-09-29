/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const AVATAR = "data:image/gif;base64,R0lGODlhAQABAIAAABnDfQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

const HEAD = theme => `<!doctype html>
<html lang="en" data-theme="${theme}" class="${theme}">
<head>
<meta charset="utf-8">
<title>ChatGPT</title>
<link rel="icon" href="/favicon.ico" sizes="32x32">
<style>
html { --color-text-primary: #0d0d0d; --color-text-secondary: #5d5d5d; --text-primary: #0d0d0d; --padding-row-x: 10px; --thread-content-max-width: 40rem; }
html[data-theme="dark"] { --color-text-primary: #ececec; --color-text-secondary: #b4b4b4; --text-primary: #ececec; background: #212121; color: #ececec; }
body { margin: 0; font-family: system-ui, sans-serif; display: flex; height: 100vh; }
.sidebar { width: 260px; display: flex; flex-direction: column; background: #f9f9f9; }
html[data-theme="dark"] .sidebar { background: #181818; }
[data-app-action-sidebar-scroll], #stage-slideover-sidebar nav { flex: 1; overflow: auto; display: flex; flex-direction: column; padding: 8px; }
[data-app-navigation-rail] { position: fixed; left: 0; top: 0; bottom: 0; width: 52px; display: none; pointer-events: none; }
[data-app-navigation-rail].open { display: block; }
.rail-overlay { position: absolute; inset: 0; pointer-events: auto; }
input[type="range"] { appearance: none; background-color: transparent; }
a { color: inherit; padding: 6px 10px; text-decoration: none; }
main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.timeline { flex: 1; overflow-y: auto; display: flex; flex-direction: column-reverse; }
.column { max-width: var(--thread-content-max-width); margin: 0 auto; width: 100%; }
[data-turn-key], article { padding: 16px; min-height: 120px; }
form { max-width: var(--thread-content-max-width); margin: 8px auto; width: 100%; display: flex; gap: 8px; }
.ProseMirror { flex: 1; min-height: 40px; border: 1px solid #ccc; }
.ComposerLayoutRoot-XCKS7O, .ComposerLayoutInput-KwIAr_ { flex: 1; display: flex; }
.ComposerLayoutRoot-XCKS7O { background: #fff; }
html[data-theme="dark"] .ComposerLayoutRoot-XCKS7O { background: rgb(27, 27, 27); }
.relative { position: relative; }
.profile-overlay { position: absolute; inset: 0; opacity: 0; }
.pointer-events-none { pointer-events: none; display: flex; gap: 8px; align-items: center; padding: 8px; }
.invisible { visibility: hidden; position: absolute; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
[role="menu"] { position: fixed; left: 8px; bottom: 60px; background: #fff; border: 1px solid #ccc; padding: 4px; }
[role="menuitem"] { padding: 6px 10px; }
.rounded-full { border-radius: 50%; display: inline-flex; width: 24px; height: 24px; align-items: center; justify-content: center; background: #19c37d; color: #fff; }
</style>
</head>`;

export const newShell = theme => `${HEAD(theme)}
<body>
<div class="sidebar">
  <nav>
    <div data-app-action-sidebar-scroll>
      <a data-testid="create-new-chat-button" href="/">New chat</a>
      <a href="/c/11111111-1111-4111-8111-111111111111">Everest height</a>
      <a href="/c/22222222-2222-4222-8222-222222222222">Pasta recipe</a>
      <a data-testid="upgrade-button" href="/upgrade">Upgrade plan</a>
    </div>
  </nav>
  <div class="footer">
    <button aria-haspopup="menu" aria-label="Help">?</button>
    <div class="relative">
      <button aria-label="Open profile menu" aria-haspopup="menu" aria-expanded="false" aria-controls="profile-menu" class="profile-overlay"></button>
      <div class="pointer-events-none chip"><img class="rounded-full size-6" alt="" src="${AVATAR}"><span class="truncate text-default"><span class="truncate">Grace Green</span></span> <span class="text-xs text-secondary">Plus</span></div>
    </div>
  </div>
</div>
<div data-app-navigation-rail inert>
  <button aria-label="Show sidebar" class="rail-overlay"></button>
  <div class="row"><a href="/">+</a></div>
  <div class="row"><button aria-haspopup="menu" aria-busy="true"><span class="rounded-full"></span><span class="sr-only">Loading profile</span></button></div>
</div>
<main>
  <h1 aria-hidden="true" class="heading-xl invisible">Ready when you are.</h1>
  <div class="heading-xl"><div class="relative inline-block"><h1 class="inline home-heading">What’s on your mind today?</h1></div></div>
  <div class="timeline" data-app-action-timeline-scroll><div class="column" data-chatgpt-conversation-selection-target></div></div>
  <form class="relative flex flex-col gap-2" data-chatgpt-composer><div class="empty:hidden gpts-notice"><div class="mx-auto mb-3"><aside><div><h3>Migrate your GPTs to plugins by December 11</h3></div><button>Migrate to plugin</button><button aria-label="Dismiss migration notice">×</button></aside></div></div><div class="ComposerLayoutRoot-XCKS7O"><div class="ComposerLayoutInput-KwIAr_"><div class="ProseMirror" contenteditable="true" aria-label="Ask ChatGPT"><p></p></div></div></div><button type="button" class="hover:bg-token-bg-primary" aria-label="Dictate">Mic</button><button aria-label="Send">Send</button></form>
  <div data-testid="thread-disclaimer">ChatGPT can make mistakes.</div>
</main>
<script>document.documentElement.dataset.shell = "new";</script>
<script src="/mock/app.js"></script>
<script src="/mock/slow.js"></script>
</body></html>`;

export const oldShell = theme => `${HEAD(theme)}
<body>
<div class="sidebar" id="stage-slideover-sidebar">
  <nav>
    <a href="/">New chat</a>
    <a href="/c/11111111-1111-4111-8111-111111111111">Everest height</a>
  </nav>
  <div><button data-testid="accounts-profile-button"><span class="rounded-full"><span>OG</span></span><div class="min-w-0"><div class="truncate">Old Name</div><div class="text-xs">Free</div></div></button></div>
</div>
<main>
  <h1>What can I help with?</h1>
  <div id="thread" class="timeline" style="flex-direction: column"></div>
  <form data-type="unified-composer"><div id="prompt-textarea" class="ProseMirror" contenteditable="true"><p></p></div><button data-testid="send-button" aria-label="Send prompt">Send</button></form>
</main>
<script>document.documentElement.dataset.shell = "old";</script>
<script src="/mock/app.js"></script>
</body></html>`;
