# Bloom++

English · [中文](README.zh.md)

A [Void++](https://github.com/0-V-linuxdo/Void)-style **plugin host** for `chatgpt.com`. One userscript, toggleable plugins, settings in the account menu.

Version **2.0.0** is a clean-room rewrite for ChatGPT's 2026-09 redesign. It supports both the redesigned shell and the older one that is still in A/B. The feature spec it was written against is [docs/FEATURES.zh.md](docs/FEATURES.zh.md). Settings from 1.4.x are kept (same `BloomSettings` store and keys).

Plugins:

| Plugin | Default | What it does |
| --- | --- | --- |
| ChatStateFavicons | On | Tab favicon reflects chat state (streaming / done / ready / error) with five overlay styles. Idle keeps the official ChatGPT icon. |
| InputHistory | On | Recall previous prompts with Arrow Up / Arrow Down, like a shell. |
| NoShareLink | Off | Hide the conversation header Share button and the project Share button. CSS-only. |
| NoDictation | Off | Hide the composer Dictation (speech-to-text) button. Does not hide Voice mode. CSS-only. |
| NoSidebarIdentity | On | Hide the display name next to the sidebar avatar. Optional: enlarge Plus/Pro/Free type, or collapse the empty name line so the plan sits on the avatar midline. CSS-only. |
| CustomSidebarIdentity | Off | Replace the sidebar avatar and display name. Empty fields keep the official values. Paste or crop an image; optional account-menu header. |
| RecentTopics | On | Switch recently opened chats with Ctrl+` (title + last-turn preview). |
| Cleaner | On | Hide Download apps, the composer “can make mistakes” notice, upgrade CTAs, locked models, home GPT promo, and Free ads. CSS-only. |
| ResponseNotification | On | Sound + browser notification when a reply finishes. Default: only when the tab is hidden. |
| PromptQueue | Off | Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn. |
| ChatListStatus | Off | Spinner on the **open** Recents row while this chat is answering, an error mark if it fails. Synced across tabs. |
| WiderChat | On | Widen the thread and composer (slider 40–96 rem, default 64). CSS-only. |
| ComposerOpacity | On | Composer background opacity and blur, so the thread can show through the input bar. CSS-only. |
| BetterNavigator | On | Notion-style outline of the open chat, including turns ChatGPT has not mounted yet. Hover the ticks, click or ↑/↓ to jump. A dashed tick marks the reply still streaming. |
| MessageTimestamps | On | Show when each turn was sent, from the conversation JSON ChatGPT already loads. |
| StreamerMode | Off | Blur Recents titles, the header chat name, project names, and the account chip. CSS-only. Hover a Recents / switcher row to peek. |
| SidebarIdentityOpacity | On | Fade the account row in the bottom-left of the sidebar (default 50%). The avatar, custom or not, stays at full opacity unless you turn on fadeAvatar. Hover brings the row back. CSS-only. |
| GreetingCustomizer | Off | Replace the home greeting with your own texts. Rotate on each visit, a timer, or a click. |

The product name is **Bloom++**. The GitHub repository is `Bloom`. Nothing in the brand string is `ChatGPT`.

## Install

1. Install [Violentmonkey](https://violentmonkey.github.io/) or Tampermonkey.
2. Open [`userscript/Bloom.update4.user.js`](https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update4.user.js).
3. Confirm install. Reload `chatgpt.com`.
4. Click your avatar in the left sidebar and pick **Bloom++** at the top of the account menu. Tampermonkey / Violentmonkey → **Bloom++ settings** also opens the panel (second click closes it). The panel opens as a centered dialog. Like Void++, the sidebar shows no button until you point at your profile: **Bloom++** then appears above it at once, in both the expanded sidebar and the collapsed rail. Turn on **Settings → showSidebarEntry** to keep it shown.

Prefer Tampermonkey / Violentmonkey **Check for updates** after this install — that keeps the same script UUID and the settings store. Auto-update uses `Bloom.update4.user.js` on `raw.githubusercontent.com/.../refs/heads/main/...`. If the dashboard shows red “获取更新信息失败”, or “脚本已更新” stays on an older `@version`, Fastly is serving a stale or unreadable `Bloom.update3.user.js` / `Bloom.update2.user.js` / `Bloom.update.user.js` / `Bloom.latest.user.js` / `Bloom.user.js`: open the `Bloom.update4.user.js` raw link or [`releases/latest/download/Bloom.update4.user.js`](https://github.com/0-V-linuxdo/Bloom/releases/latest/download/Bloom.update4.user.js). Only remove an old copy if you have two Bloom++ entries. Uninstall wipes the userscript store; Bloom++ will try to restore from this site’s IndexedDB / `localStorage`. Do not use `.../Bloom/main/userscript/Bloom.user.js`, `.../refs/heads/main/userscript/Bloom.user.js`, `.../Bloom.latest.user.js`, `.../Bloom.update.user.js`, `.../Bloom.update2.user.js`, or `.../Bloom.update3.user.js` (Fastly can keep an old script). Do not use jsDelivr `@heads/main` (7-day cache). Do not use `github.com/.../raw/refs/heads/...` (returns HTML).

The settings shell **follows chatgpt.com's own theme**. ChatStateFavicons **keeps the official ChatGPT tab icon while idle**; overlays (white blossom PNG, dark halo) appear only for streaming / done / ready / error.

## Build and test

```bash
bun install
bun run build        # userscript/Bloom.user.js and the update copies
bun run tsc
bun run lint
bun run lint:styles
bun test             # unit tests on fixtures of both ChatGPT shells
bun run e2e          # Chromium against a local mock ChatGPT page
```

## Architecture

- `src/api`: settings store (`BloomSettings` in GM, IndexedDB and `localStorage`; the richest copy wins) and the plugin manager.
- `src/host`: everything Bloom++ knows about chatgpt.com, in one place. Selectors for both shells, routing, the composer, the thread, the sidebar, and a single `fetch` tap that reads the page's own conversation and reply-stream responses. `generation.ts` turns those into rise and fall events that the favicon, notification, queue and Recents status plugins share.
- `src/components`: small DOM controls and icons, themed from ChatGPT's own CSS variables.
- `src/plugins`: one folder per plugin, each built with `definePlugin` and `definePluginSettings` as in Void++.

The script runs at `document-start` so the `fetch` tap sees the first conversation request. It only adds `<style>` to `<head>` early, and waits for the ChatGPT shell to mount and go idle before it touches `<body>`.

## License

[GPL-3.0-or-later](LICENSE). Plugin model from [Void++](https://github.com/0-V-linuxdo/Void) (GPL-3.0-or-later). Favicon states follow [Chat-State-Favicons](https://github.com/0-V-linuxdo/Chat-State-Favicons) (MIT).
