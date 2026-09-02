# Bloom++

English · [中文](README.zh.md)

A [Void++](https://github.com/0-V-linuxdo/Void)-style **plugin host** for `chatgpt.com`. One userscript, toggleable plugins, a floating settings button.

Current release: **[v1.3.3](https://github.com/0-V-linuxdo/Bloom/releases/tag/v1.3.3)** (`userscript/Bloom.user.js`, `@version [20260902] v1.3.3`).

v1.3.0 ships:

| Plugin | Default | What it does |
| --- | --- | --- |
| ChatStateFavicons | On | Tab favicon reflects chat state (streaming / done / ready / error) with five overlay styles. |
| InputHistory | On | Recall previous prompts with Arrow Up / Arrow Down, like a shell. |
| NoShareLink | Off | Hide the conversation header Share button and the project Share button. CSS-only. |
| NoDictation | Off | Hide the composer Dictation (speech-to-text) button. Does not hide Voice mode. CSS-only. |

The product name is **Bloom++**. The GitHub repository is `Bloom`. Nothing in the brand string is `ChatGPT`.

## Install

1. Install [Violentmonkey](https://violentmonkey.github.io/) or Tampermonkey.
2. Open [`userscript/Bloom.user.js`](https://cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/userscript/Bloom.user.js).
3. Confirm install. Reload `chatgpt.com`.
4. Use the blossom button (bottom-right, draggable) to open plugins.

Auto-update uses the same jsDelivr URL (`@updateURL` / `@downloadURL`). GitHub's `raw/refs/heads` URL returns HTML and Tampermonkey / Violentmonkey cannot pull updates from it.

The settings shell **follows chatgpt.com's own theme** (`html.dark` and `--main-surface-primary`), not the operating-system color scheme. ChatStateFavicons draws a **white blossom** (PNG, dark halo, no official black mark) from the first paint.

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

Both plugins stay **off** until you toggle them. They adopt CSS after HostReady and do **not** walk the tree with `MutationObserver` or `querySelectorAll("button")`.

v1.1.2: `registerStyle` waits for `document.head` and never appends to `<html>`.

v1.1.3: HostReady waits for `window` load plus a short settle delay (not `DOMContentLoaded`). `#bloom-root` and the InputHistory HUD mount on `document.body` only.

v1.1.4: HostReady waits `max(window load, ~8s from init)` before any body mount. InputHistory starts at HostReady. Remount-once if React detaches `#bloom-root`. Still injected CSS at document-start, which left chatgpt.com painted but unclickable / untypeable.

v1.1.5: Init does not append nodes or observe `<html>`. Styles flush to `head` after a React-host signal (8s ceiling, not a minimum). No remount. ChatStateFavicons no longer observes `document.body` subtree. `#bloom-root` is `pointer-events: none` (FAB is `auto`). If the host is not interactive, skip the automatic body mount; Violentmonkey menu still opens settings.

v1.1.6: Settings panel no longer has an appearance switch; the shell follows the host theme. NoShareLink and NoDictation default off.

v1.1.7: HostReady waits `max(8s from boot, late islands)` — Recents `a[href^="/c/"]`, profile `img`, or a personalized greeting. 8s is a floor again. No DOM writes (including `flushStyles` / `#bloom-root` / favicon) until that gate. NoShareLink and NoDictation start at HostReady with testid-only CSS via adopted stylesheets. InputHistory listens on the composer, not `document`.

v1.1.8: ScriptReady (8s + islands) only arms the Violentmonkey menu. `flushStyles`, `#bloom-root`, CSF, and InputHistory wait for a trusted click (or the menu) and then run after that event. CSF reuses the host icon `link` (no `head.prepend` / no `head` observer). Page CSS via `GM_addStyle` only. InputHistory HUD lives in the Bloom shadow.

v1.1.9: Settings cards use a Void++ layout (name + authors + switch, options as rows). The blossom docks to the right of ChatGPT's "Download the ChatGPT app" button via `position:fixed` (not inserted into the header tree). Larger petal in the control.

v1.2.0: Plugin cards match Void++ BaseCard (icon tile, gear, switch, 2-line description, author footer). Options open in a nested panel, not inside the card. Two-column grid. Blossom docks to header Download App, then the sidebar store/bag next to the profile.

v1.2.1: Gear swaps the plugin grid for a settings pane (no absolute overlay). Blossom docks to the right of the sidebar footer bag / Download control; it does not fall back to the top-right Share cluster while that row exists.

v1.2.2: HostReady no longer polls islands every 100ms (8s sleep, then sparse checks). FAB is placed once and on resize only — no 400ms timer, no capture-scroll, no `elementsFromPoint`. Gear opens a stacked plugin dialog; the card grid stays.

v1.2.3: PageTouch is gone. The host starts on `requestIdleCallback` after the 8s island gate (`#prompt-textarea` plus Recents or a real avatar), not on the first ChatGPT click. Shell (FAB) and plugins are two idle turns. `@run-at document-idle`. No capture `pointerdown`.

v1.2.4: `#bloom-root` mounts on `document.documentElement`, never `body`. Page CSS is a `<style>` on `<html>`, not `GM_addStyle` / `<head>`. HostReady plugins (CSF, InputHistory, NoShareLink, NoDictation) start after a Bloom-chrome gesture (FAB or menu). CSF does not write ChatGPT's icon link or observe the composer (2s poll). InputHistory uses window bubble listeners only.

v1.3.0: HostReady plugins start after the island gate + idle (blossom is settings only). Page CSS and the state favicon live in `document.head`. `#bloom-root` mounts on `document.body`. CSF uses a head-only FaviconGuard (`removeCompetitors`, insert first) and watches the composer root. InputHistory uses capture-phase `keydown`. NoDictation hides Dictation (`Start dictation` / `Dictate button` / 听写) and leaves Voice (`composer-speech-button`) alone. Composer Stop/Send/editor selectors are a union table in `src/host`.

v1.3.1: Favicon is a white blossom on a dark plate in every state (the official black ChatGPT icon disappears against chat backgrounds). Plugin card icons have no chip background.

v1.3.2: FAB click only toggles a prebuilt modal (does not start HostReady plugins). Favicon is a white blossom rasterized to PNG, last `rel=icon` in `head`, head-subtree guard, no SMIL. CSF starts at DOMContentLoaded.

v1.3.3: Settings is a **non-modal flyout** next to the blossom. No full-viewport backdrop button, so chatgpt.com stays clickable while the panel is open. Gear swaps an in-panel view. Theme watch no longer observes `<html>`.

- NoShareLink: `button[data-testid="share-chat-button"]`. Project: `share-project-button` / `project-share-button`. Toggles `hideShareChat` and `hideShareProject`.
- NoDictation: composer `aria-label` Dictate / Start dictation / 听写 / `composer-dictate-button`. Leaves `composer-speech-button` and `voice-mode-button` alone. Optional `hideDictationSettings` matches settings-dialog testids and aria-labels only.

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
