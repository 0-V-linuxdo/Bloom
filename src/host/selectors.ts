/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const Sel = {
    sidebarScroll: "[data-app-action-sidebar-scroll]",
    rail: "[data-app-navigation-rail]",
    menuButton: 'button[aria-haspopup="menu"]',
    oldSidebar: "#stage-slideover-sidebar",
    oldRail: "#stage-sidebar-tiny-bar",
    oldProfile: '[data-testid="accounts-profile-button"]',
    sidebars: "[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",
    conversationLink: 'a[href*="/c/"]',

    timelineScroll: "[data-app-action-timeline-scroll]",
    conversationTarget: "[data-chatgpt-conversation-selection-target]",
    newTurn: "[data-turn-key]",
    oldTurn: 'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',
    turn: '[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',
    messageUnit: "[data-chatgpt-search-message-ids]",
    oldMessage: "[data-message-id]",
    authorRole: "[data-message-author-role]",
    oldThread: "#thread",
    turnActions: '.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',
    generatedImage: '[class~="group/generated-image-preview"], img[alt="Generated image"]',
    markdown: ".markdown, .prose",
    searchUnit: "[data-chatgpt-search-unit-key]",
    turnBusy: '[role="status"][aria-busy="true"], .result-streaming',

    composerInput: 'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',
    oldComposerForm: 'form[data-type="unified-composer"]',
    sendButton: '[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="发送"]',
    stopButton: '[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="停止"], button[aria-label^="停止生成"], button[aria-label^="停止回答"]',
    composerFooter: "#thread-bottom-container",

    homeHeading: 'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',
} as const;
