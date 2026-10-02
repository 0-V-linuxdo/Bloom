# Bloom++

Plugin host for chatgpt.com in the style of Void++ (`definePlugin`, `definePluginSettings`, PluginManager, one userscript). Version 2 is a clean-room rewrite against [docs/FEATURES.zh.md](docs/FEATURES.zh.md), which is the behaviour spec. Pull `v2` before any change; Tampermonkey never downgrades, so a release version must be higher than the one on `v2`.

## Layout

- `src/api`: `Settings.ts` (the `BloomSettings` bag in GM, IndexedDB `bloompp/kv` and `localStorage`), `PluginManager.ts`.
- `src/host`: the only place that knows chatgpt.com. `selectors.ts` holds the selectors for the 2026-09 shell and the old shell side by side. Plugins never keep their own copy of host selectors.
- `src/components`: DOM controls, icons and `base.css` theme tokens (`--bloom-*`, read from ChatGPT's `--color-*` or old `--text-*` variables with fallbacks).
- `src/plugins/<name>/index.ts`, optional `styles.css`; `_core/settings` is the panel and sidebar entry.

## Rules that keep chatgpt.com alive

chatgpt.com hydrates with `hydrateRoot(document)`. These broke earlier versions:

1. Never append to `<html>` and never insert into `<head>` before hydration. Styles go in `document.adoptedStyleSheets` (see `registerStyle`; a `<style>` after parsing is only the fallback), UI goes in `<body>`.
2. Insert nodes into `<body>` only after `StartAt.HostReady` (React has hydrated `<body>`, 8 s cap; it does not wait for DOMContentLoaded, which comes seconds later because chatgpt.com streams its HTML). Attribute marks such as `data-bloom-profile-*` may be set as soon as `<body>` exists (`whenBody`), because production React does not compare attributes when it hydrates. A node inserted into or before a host element that React has not hydrated yet is an extra node: React 19 throws #418, client-renders the whole root, strips `<html>` attributes (the dark theme flashes light) and rebuilds the sidebar. Every insert into a host element checks `isHydrated(el)` first (`host/ready.ts`, reads the `__reactFiber$` expando) and retries on the next mutation.
3. Never remove a React-owned node. The official favicon links are parked (`rel` renamed, `media="not all"`), never removed; the Bloom favicon link stays last in `<head>`.
4. Writes from observers are idempotent and batched per frame (`watchBody`, `frameScheduler`). Ignore mutations of Bloom's own nodes (`hostMutations`).
5. Hidden tabs get no `requestAnimationFrame` and Chrome throttles their timers to once a minute. `nextFrame` falls back to a timer, and HostReady still waits for hydration in a hidden tab; generation state runs on DOM mutations, network events and `every()` (a Worker ticker with a `setInterval` fallback), never on a lone `setTimeout`.
6. Wrap `fetch` once (`host/network.ts`), read `response.clone()` only, never change requests, never add requests or polling of `/backend-api/conversations`.

## Generation state

`host/generation.ts` is the single source for "ChatGPT is answering". It rises when `POST /backend-api/f/conversation` starts and stays true while that stream is open, while a Stop button (`aria-label="Stop"` in the 2026-09 shell) is visible or while a turn holds `[role=status][aria-busy=true]`. In the 2026-09 shell that request is a short relay stream the page aborts; the reply arrives over WebSocket, so a relay that ends before the DOM has shown the reply holds the state for a few seconds until the DOM takes over (a relay that ends after the DOM already showed it, as with short replies, holds nothing), and only a click on Stop counts as stopped. It emits `rise`, `fall` (`done`, `stopped`, `error`, `left`), `context` (with `migrated` for the first message moving `/` → `/c/{id}`) and `tick`. Leaving a chat mid-reply is `left`, never `done`. Plugins subscribe; they do not poll the DOM for Stop themselves.

## Code style

- New files start with the SPDX header that oxlint enforces. No other comments.
- Logger from `@utils/Logger`, never `console`.
- CSS classes use the `bloom-` prefix through `classNameFactory`. rem for spacing.
- Keep settings keys and defaults compatible with the table in `docs/FEATURES.zh.md` section 5.

## Live tests

Live tests on chatgpt.com use the Instant model, never Pro. Pick Instant in the model picker before sending any test message.

## Checks before a push

```bash
bun run tsc && bun run lint && bun run lint:styles && bun test && bun run build && bun run e2e && bun run check:update-urls
```

Commit `userscript/*.user.js` with the source. The update URL stays `userscript/Bloom.update5.user.js` on `refs/heads/v2`. `@version` is plain `X.Y.Z`, because Violentmonkey `parseInt`s each dotted part.
