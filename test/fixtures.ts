/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const NEW_SHELL = `
<div id="app">
  <nav>
    <div data-app-action-sidebar-scroll>
      <a href="/c/11111111-1111-4111-8111-111111111111">First chat</a>
      <a href="/g/g-p-abc123-travel/c/22222222-2222-4222-8222-222222222222">Trip plan</a>
      <a href="/g/g-p-abc123-travel/project">Travel</a>
    </div>
  </nav>
  <div class="footer">
    <button aria-haspopup="menu" aria-label="Help">?</button>
    <button aria-haspopup="menu" class="chip">
      <span class="rounded-full" style="border-radius:50%"><span>GG</span></span>
      <span class="min-w-0"><span class="truncate">Grace Green</span><span class="text-xs">Plus</span></span>
    </button>
  </div>
  <div data-app-navigation-rail inert>
    <div class="row"><a href="/">New</a></div>
    <div class="row"><button aria-haspopup="menu"><img alt="Profile" src="data:image/gif;base64,R0lGODlhAQABAAAAACw="></button></div>
  </div>
  <main>
    <div data-app-action-timeline-scroll style="overflow-y:auto;display:flex;flex-direction:column-reverse">
      <div data-chatgpt-conversation-selection-target>
        <div data-turn-key="t1"><div data-chatgpt-search-message-ids="u1"><div class="whitespace-pre-wrap">How tall is Everest?</div></div></div>
        <div data-turn-key="t2"><div data-chatgpt-search-message-ids="a0 a1"><div class="markdown"><p>Web search</p><p>About 8,849 metres.</p></div></div><div class="turn-action-controls"></div></div>
      </div>
    </div>
    <form><textarea name="prompt"></textarea><button data-testid="send-button">Send</button></form>
  </main>
</div>`;

export const OLD_SHELL = `
<div id="stage-slideover-sidebar">
  <nav><a href="/c/33333333-3333-4333-8333-333333333333">Old chat</a></nav>
  <div><button data-testid="accounts-profile-button"><img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACw="><div class="min-w-0"><div class="truncate">Old Name</div><div class="text-xs">Free</div></div></button></div>
</div>
<main>
  <div id="thread">
    <article data-testid="conversation-turn-1" data-turn="user"><div data-message-author-role="user" data-message-id="m1"><div class="whitespace-pre-wrap">Hello</div></div></article>
    <article data-testid="conversation-turn-2" data-turn="assistant"><div data-message-author-role="assistant" data-message-id="m2"><div class="markdown">Hi there</div></div></article>
  </div>
  <form data-type="unified-composer"><div id="prompt-textarea" contenteditable="true" class="ProseMirror"><p>draft <span contenteditable="false">chip</span></p></div><button data-testid="stop-button" aria-label="Stop streaming">Stop</button></form>
</main>`;

export function mount(html: string) {
    document.body.innerHTML = html;
}
