# Bloom++

Plugin host for chatgpt.com in the style of Void++ (`definePlugin`, `definePluginSettings`, PluginManager, one userscript). Version 2 is a clean-room rewrite against [docs/FEATURES.zh.md](docs/FEATURES.zh.md), which is the behaviour spec. Pull `main` before any change; Tampermonkey never downgrades, so a release version must be higher than the one on `main`.

## Layout

- `src/api`: `Settings.ts` (the `BloomSettings` bag in GM, IndexedDB `bloompp/kv` and `localStorage`), `PluginManager.ts`.
- `src/host`: the only place that knows chatgpt.com. `selectors.ts` holds the selectors for the 2026-09 shell and the old shell side by side. Plugins never keep their own copy of host selectors.
- `src/components`: DOM controls, icons and `base.css` theme tokens (`--bloom-*`, read from ChatGPT's `--color-*` or old `--text-*` variables with fallbacks).
- `src/plugins/<name>/index.ts`, optional `styles.css`; `_core/settings` is the panel and sidebar entry.

## Rules that keep chatgpt.com alive

chatgpt.com hydrates with `hydrateRoot(document)`. These broke earlier versions:

1. Never append to `<html>` and never insert into `<head>` before hydration. Styles go in `document.adoptedStyleSheets` (see `registerStyle`; a `<style>` after parsing is only the fallback), UI goes in `<body>`.
2. Touch `<body>` only after `StartAt.HostReady` (shell mounted, then idle, 8 s cap).
3. Never remove a React-owned node. The official favicon links are parked (`rel` renamed, `media="not all"`), never removed; the Bloom favicon link stays last in `<head>`.
4. Writes from observers are idempotent and batched per frame (`watchBody`, `frameScheduler`). Ignore mutations of Bloom's own nodes (`hostMutations`).
5. Hidden tabs get no `requestAnimationFrame` and Chrome throttles their timers to once a minute. `nextFrame` falls back to a timer, and HostReady still waits for idle in a hidden tab so nothing is written before hydration; generation state runs on DOM mutations, network events and `every()` (a Worker ticker with a `setInterval` fallback), never on a lone `setTimeout`.
6. Wrap `fetch` once (`host/network.ts`), read `response.clone()` only, never change requests, never add requests or polling of `/backend-api/conversations`.

## Generation state

`host/generation.ts` is the single source for "ChatGPT is answering". It rises when `POST /backend-api/f/conversation` starts and stays true while that stream is open, while a Stop button (`aria-label="Stop"` in the 2026-09 shell) is visible or while a turn holds `[role=status][aria-busy=true]`. In the 2026-09 shell that request is a short relay stream the page aborts; the reply arrives over WebSocket, so a relay ending holds the state for a few seconds until the DOM takes over, and only a click on Stop counts as stopped. It emits `rise`, `fall` (`done`, `stopped`, `error`, `left`), `context` (with `migrated` for the first message moving `/` → `/c/{id}`) and `tick`. Leaving a chat mid-reply is `left`, never `done`. Plugins subscribe; they do not poll the DOM for Stop themselves.

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
