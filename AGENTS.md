# Bloom++

Plugin host for chatgpt.com in the style of Void++ (`definePlugin`, `definePluginSettings`, PluginManager, one userscript). Version 2 is a clean-room rewrite against [docs/FEATURES.zh.md](docs/FEATURES.zh.md), which is the behaviour spec. Pull `main` before any change; Tampermonkey never downgrades, so a release version must be higher than the one on `main`.

## Layout

- `src/api`: `Settings.ts` (the `BloomSettings` bag in GM, IndexedDB `bloompp/kv` and `localStorage`), `PluginManager.ts`.
- `src/host`: the only place that knows chatgpt.com. `selectors.ts` holds the selectors for the 2026-09 shell and the old shell side by side. Plugins never keep their own copy of host selectors.
- `src/components`: DOM controls, icons and `base.css` theme tokens (`--bloom-*`, read from ChatGPT's `--color-*` or old `--text-*` variables with fallbacks).
- `src/plugins/<name>/index.ts`, optional `styles.css`; `_core/settings` is the panel and sidebar entry.

## Rules that keep chatgpt.com alive

chatgpt.com hydrates with `hydrateRoot(document)`. These broke earlier versions:

1. Never append to `<html>`. `<style>` goes in `<head>` (see `registerStyle`), UI goes in `<body>`.
2. Touch `<body>` only after `StartAt.HostReady` (shell mounted, then idle, 8 s cap).
3. Never remove a React-owned node. The official favicon links are parked (`rel` renamed, `media="not all"`), never removed; the Bloom favicon link stays last in `<head>`.
4. Writes from observers are idempotent and batched per frame (`watchBody`, `frameScheduler`). Ignore mutations of Bloom's own nodes (`hostMutations`).
5. Hidden tabs get no `requestAnimationFrame`. `nextFrame` falls back to a timer; generation state runs on a timer and on network events.
6. Wrap `fetch` once (`host/network.ts`), read `response.clone()` only, never change requests, never add requests or polling of `/backend-api/conversations`.

## Generation state

`host/generation.ts` is the single source for "ChatGPT is answering". It is true while a generate stream (`POST /backend-api/f/conversation`, SSE) is open or a Stop button is visible. It emits `rise`, `fall` (`done`, `stopped`, `error`, `left`), `context` (with `migrated` for the first message moving `/` → `/c/{id}`) and `tick`. Leaving a chat mid-reply is `left`, never `done`. Plugins subscribe; they do not poll the DOM for Stop themselves.

## Code style

- New files start with the SPDX header that oxlint enforces. No other comments.
- Logger from `@utils/Logger`, never `console`.
- CSS classes use the `bloom-` prefix through `classNameFactory`. rem for spacing.
- Keep settings keys and defaults compatible with the table in `docs/FEATURES.zh.md` section 5.

## Checks before a push

```bash
bun run tsc && bun run lint && bun run lint:styles && bun test && bun run build && bun run e2e && bun run check:update-urls
```

Commit `userscript/*.user.js` with the source. The update URL stays `userscript/Bloom.update4.user.js`.
