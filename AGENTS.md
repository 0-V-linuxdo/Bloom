# Bloom++

Plugin host for chatgpt.com. Architecture follows Void++ (`definePlugin`, PluginManager, SettingsStore, Bun/Node userscript build) without Grok turbopack.

- Brand: **Bloom++**. Repo: `Bloom`. Package: `bloompp`. Global: `window.Bloom`. CSS: `bloom-`.
- Do not put `ChatGPT` in the product/repo/package name. `@match` may still target chatgpt.com.
- v1 plugins: ChatStateFavicons, InputHistory, NoShareLink, NoDictation, required `_core/settings` (floating button).
- NoShareLink / NoDictation are CSS-only (`registerStyle`). Do not add documentElement MutationObservers or `querySelectorAll("button")` scans. Do not use wrapper `:has()`.
- `registerStyle` queues `<style>` in memory. `flushStyles()` appends to `document.head` at HostReady. Never observe `document.documentElement`. Never append a `<style>` to `document.documentElement` — extra children under `<html>` break ChatGPT React hydration (blank page, dead clicks).
- Never append `#bloom-root`, the InputHistory HUD, or any other host node to `document.documentElement`. Mount on `document.body` only, and only after React internals exist on `document` / `html` / `body`. `#bloom-root` is `pointer-events: none`; the FAB is `pointer-events: auto`.
- HostReady waits for `document.body` (poll + DCL, no html observer), then until React host internals appear, with an 8s **ceiling** (not a minimum). After the island gate + idle, auto-start HostReady plugins (`requestChromeReady`). The blossom is a settings entry, not a feature kill-switch. GM menu still opens settings. ChatStateFavicons must not observe `document.body` with `subtree` (composer-root childList is OK). Do not treat `DOMContentLoaded` or `window` `load` as hydrated. InputHistory must use `StartAt.HostReady` and capture-phase keydown.
- ChatStateFavicons owns `#bloom-chat-state-favicon` in `document.head` with a head-only competitor guard. Always compose a white blossom on a dark plate — never keep ChatGPT's official black favicon (it vanishes against chat backgrounds). Streaming / done / ready / error overlay that same white mark.
- NoDictation hides Dictation (`Start dictation` / `Dictate button` / 听写), never `composer-speech-button` (Voice).
- Userscript `@updateURL` / `@downloadURL` must be jsDelivr (`cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/...`). GitHub raw HTML redirects fail Tampermonkey / Violentmonkey updates.
- Userscript-only. License GPL-3.0-or-later.
- ChatGPT detectors stay in `src/host` + plugin `detect.ts`. Do not `@require` Chat-State-Favicons core.
