# Bloom++

Plugin host for chatgpt.com. Architecture follows Void++ (`definePlugin`, PluginManager, SettingsStore, Bun/Node userscript build) without Grok turbopack.

- Brand: **Bloom++**. Repo: `Bloom`. Package: `bloompp`. Global: `window.Bloom`. CSS: `bloom-`.
- Do not put `ChatGPT` in the product/repo/package name. `@match` may still target chatgpt.com.
- v1 plugins: ChatStateFavicons, InputHistory, required `_core/settings` (floating button).
- Userscript-only. License GPL-3.0-or-later.
- ChatGPT detectors stay in `src/host` + plugin `detect.ts`. Do not `@require` Chat-State-Favicons core.
