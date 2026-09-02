# Bloom++

Plugin host for chatgpt.com. Architecture follows Void++ (`definePlugin`, PluginManager, SettingsStore, Bun/Node userscript build) without Grok turbopack.

- Brand: **Bloom++**. Repo: `Bloom`. Package: `bloompp`. Global: `window.Bloom`. CSS: `bloom-`.
- Do not put `ChatGPT` in the product/repo/package name. `@match` may still target chatgpt.com.
- v1.1 plugins: ChatStateFavicons, InputHistory, NoShareLink, NoDictation, required `_core/settings` (floating button).
- NoShareLink / NoDictation are CSS-only (`registerStyle`). Do not add documentElement MutationObservers or `querySelectorAll("button")` scans. Do not use wrapper `:has()`.
- `registerStyle` must only append to `document.head`. If head is missing at `document-start`, wait with a **childList-only** observer on `document.documentElement` (no `subtree`). Never append a `<style>` to `document.documentElement` — extra children under `<html>` break ChatGPT React hydration (blank page).
- Never append `#bloom-root`, the InputHistory HUD, or any other host node to `document.documentElement`. Mount on `document.body` only.
- `waitForHostReady` waits for `document.body`, then `window` `load` plus a short settle delay, then `StartAt.HostReady`. Do not treat `DOMContentLoaded` as hydrated. Do not observe `documentElement` with `subtree: true` during parse.
- Userscript `@updateURL` / `@downloadURL` must be jsDelivr (`cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/...`). GitHub raw HTML redirects fail Tampermonkey / Violentmonkey updates.
- Userscript-only. License GPL-3.0-or-later.
- ChatGPT detectors stay in `src/host` + plugin `detect.ts`. Do not `@require` Chat-State-Favicons core.
