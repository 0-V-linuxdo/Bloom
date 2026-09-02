# Bloom++

Plugin host for chatgpt.com. Architecture follows Void++ (`definePlugin`, PluginManager, SettingsStore, Bun/Node userscript build) without Grok turbopack.

- Brand: **Bloom++**. Repo: `Bloom`. Package: `bloompp`. Global: `window.Bloom`. CSS: `bloom-`.
- Do not put `ChatGPT` in the product/repo/package name. `@match` may still target chatgpt.com.
- v1.1 plugins: ChatStateFavicons, InputHistory, NoShareLink, NoDictation, required `_core/settings` (floating button).
- NoShareLink / NoDictation are CSS-only (`registerStyle`). Do not add documentElement MutationObservers or `querySelectorAll("button")` scans. Do not use wrapper `:has()`.
- Userscript `@updateURL` / `@downloadURL` must be jsDelivr (`cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/...`). GitHub raw HTML redirects fail Tampermonkey / Violentmonkey updates.
- Userscript-only. License GPL-3.0-or-later.
- ChatGPT detectors stay in `src/host` + plugin `detect.ts`. Do not `@require` Chat-State-Favicons core.
