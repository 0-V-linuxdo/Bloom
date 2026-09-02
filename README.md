# Bloom++

English · [中文](README.zh.md)

A [Void++](https://github.com/0-V-linuxdo/Void)-style **plugin host** for `chatgpt.com`. One userscript, toggleable plugins, a floating settings button.

v1.1 ships:

| Plugin | Default | What it does |
| --- | --- | --- |
| ChatStateFavicons | On | Tab favicon reflects chat state (streaming / done / ready / error) with five overlay styles. |
| InputHistory | On | Recall previous prompts with Arrow Up / Arrow Down, like a shell. |
| NoShareLink | On | Hide the conversation header Share button and the project Share button. CSS-only. |
| NoDictation | On | Hide the composer Dictation (speech-to-text) button. Does not hide Voice mode. CSS-only. |

The product name is **Bloom++**. The GitHub repository is `Bloom`. Nothing in the brand string is `ChatGPT`.

## Install

1. Install [Violentmonkey](https://violentmonkey.github.io/) or Tampermonkey.
2. Open [`userscript/Bloom.user.js`](https://cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/userscript/Bloom.user.js).
3. Confirm install. Reload `chatgpt.com`.
4. Use the blossom button (bottom-right, draggable) to open plugins.

Auto-update uses the same jsDelivr URL (`@updateURL` / `@downloadURL`). GitHub's `raw/refs/heads` URL returns HTML and Tampermonkey / Violentmonkey cannot pull updates from it.

Appearance (auto / light / dark) lives at the top of that panel. **Auto follows chatgpt.com's own theme** (`html.dark` and `--main-surface-primary`), not the operating-system color scheme. ChatStateFavicons **does not replace** the site favicon while idle (`wait`); overlays only appear for streaming / done / ready / error.

## ChatStateFavicons styles

`original` · `badge` (default) · `dot` · `hole` · `bg`

States: wait · rotate (🔄) · done (✔️) · ready (👍) · error (🚫).

The blossom mark is the 24-unit evenodd path from the existing Chat-State-Favicons adapter, **without** the progress bar. Detection stays ChatGPT-specific (composer Stop, Pro trailing Stop, Deep Research, image spinner, `/c/{id}` context lock).

## InputHistory

- ↑ / ↓ at the caret edge (or Alt+arrow to force)
- Esc cancels recall
- Enter (no Shift) and Send both store the prompt
- Slider 10–500 entries (default 100)
- History panel lives in the floating settings shell

## NoShareLink / NoDictation

Both plugins inject CSS at `document-start` and then stop. They do **not** walk the tree with `MutationObserver` or `querySelectorAll("button")`.

v1.1.2: `registerStyle` waits for `document.head` and never appends to `<html>`.

v1.1.3: HostReady waits for `window` load plus a short settle delay (not `DOMContentLoaded`). `#bloom-root` and the InputHistory HUD mount on `document.body` only.

v1.1.4: HostReady waits `max(window load, ~8s from init)` before any body mount. InputHistory starts at HostReady, not `DOMContentLoaded`. If React detaches `#bloom-root`, remount once. `load+1s` was still inside ChatGPT hydration — Recents, avatar, click handlers, and the blossom button all dropped.

- NoShareLink: `button[data-testid="share-chat-button"]` plus header-scoped `aria-label` (Share / 分享). Project: `share-project-button` / Share project / 分享项目. Toggles `hideShareChat` and `hideShareProject`.
- NoDictation: `button[data-testid="composer-speech-button"]` and composer-scoped Dictate / 听写 labels. Leaves `voice-mode-button` alone. Optional `hideDictationSettings` matches settings-dialog testids and aria-labels only.

## Build

```bash
npm install
npm run build
```

Writes `userscript/Bloom.user.js`. v1 is **userscript-only** (no browser-extension pack).

## Architecture

Folder layout and `definePlugin` / PluginManager / SettingsStore follow Void++. Grok-only layers are **not** copied (`src/turbopack`, Grok stores, avatar-menu patches). ChatGPT plugins are DOM-first.

Settings persist `GM_getValue` → IndexedDB → `localStorage` (`BloomSettings`).

## License

[GPL-3.0-or-later](LICENSE). Host and plugins adapted from [Void++](https://github.com/0-V-linuxdo/Void) (GPL-3.0-or-later). ChatGPT detectors adapted from [Chat-State-Favicons](https://github.com/0-V-linuxdo/Chat-State-Favicons) (MIT). That multi-site userscript collection is unchanged.
