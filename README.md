# Bloom++

English · [中文](README.zh.md)

A [Void++](https://github.com/0-V-linuxdo/Void)-style **plugin host** for `chatgpt.com`. One userscript, toggleable plugins, settings pinned next to the account row.

Current release: **[v1.4.30](https://github.com/0-V-linuxdo/Bloom/releases/tag/v1.4.30)** (`userscript/Bloom.user.js`, `@version [20260919] v1.4.30`).

v1.4.23 ships:

| Plugin | Default | What it does |
| --- | --- | --- |
| ChatStateFavicons | On | Tab favicon reflects chat state (streaming / done / ready / error) with five overlay styles. |
| InputHistory | On | Recall previous prompts with Arrow Up / Arrow Down, like a shell. |
| NoShareLink | Off | Hide the conversation header Share button and the project Share button. CSS-only. |
| NoDictation | Off | Hide the composer Dictation (speech-to-text) button. Does not hide Voice mode. CSS-only. |
| NoSidebarIdentity | On | Hide the display name next to the sidebar avatar. Optional: enlarge Plus/Pro/Free type to match Bloom++. CSS-only. |
| RecentTopics | On | Switch recently opened chats with Ctrl+` (title + last-turn preview). |
| Cleaner | On | Hide Download apps, the composer “can make mistakes” notice, upgrade CTAs, locked models, home GPT promo, and Free ads. CSS-only. |
| ResponseNotification | On | Sound + browser notification when a reply finishes. Default: only when the tab is hidden. |
| ChatListStatus | On | Spinner on the **open** Recents row while this chat is answering. Other rows keep ChatGPT’s own status. |
| WiderChat | On | Widen the thread and composer (slider 40–96 rem, default 64). CSS-only. |
| MessageTimestamps | On | Show when each turn was sent, from the conversation JSON ChatGPT already loads. |
| StreamerMode | Off | Blur Recents titles, project names, and the account chip. CSS-only. Hover a Recents row to peek. |

The product name is **Bloom++**. The GitHub repository is `Bloom`. Nothing in the brand string is `ChatGPT`.

## Install

1. Install [Violentmonkey](https://violentmonkey.github.io/) or Tampermonkey.
2. Open [`userscript/Bloom.user.js`](https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/userscript/Bloom.user.js).
3. Confirm install. Reload `chatgpt.com`.
4. Look for **Bloom++** above your profile in the left sidebar. Tampermonkey / Violentmonkey → **Bloom++ settings** also opens the panel (second click closes it). The panel always docks to the left of the page on `document.body` — it is never inserted into the sidebar tree. Plugins render as a **Void++ BaseCard** stack (icon tile, two-line description, author footer, gear + switch).

If an older Bloom++ is still installed, remove it first, then install from GitHub raw. Auto-update uses the same GitHub raw URL (`@updateURL` / `@downloadURL`). Do not use jsDelivr `@heads/main` (7-day cache). Do not use `github.com/.../raw/refs/heads/...` (returns HTML).

The settings shell **follows chatgpt.com's own theme** (`html.dark` and `--main-surface-primary`), not the operating-system color scheme. ChatStateFavicons draws a **white blossom** (PNG, dark halo, no official black mark) from the first paint.

## ChatStateFavicons styles

`original` · `badge` · `dot` · `hole` · `bg` (Fill, default)

States: wait · rotate (🔄) · done (✔️) · ready (👍) · error (🚫).

The blossom mark is the 24-unit evenodd path from the existing Chat-State-Favicons adapter, **without** the progress bar. Detection stays ChatGPT-specific (composer Stop, Pro trailing Stop, Deep Research, image spinner, `/c/{id}` context lock).

## InputHistory

- ↑ / ↓ at the caret edge (or Alt+arrow to force)
- Esc cancels recall
- Enter (no Shift) and Send both store the prompt
- Slider 10–500 entries (default 100)
- History panel lives in Bloom++ (sidebar rail)

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

v1.3.4: `@updateURL` / `@downloadURL` / install link are GitHub raw (`raw.githubusercontent.com/.../main/userscript/Bloom.user.js`). jsDelivr `@heads/main` is no longer used.

v1.3.5: `#bloom-root` is a zero-size fixed host (cannot cover the page). Settings flyout is ~360px, not full-bleed. Window capture `pointerdown` binds only while the panel is open.

v1.3.6: FAB docks to the header Download / profile control, never the left-rail avatar. Flyout is ~520px so plugin names are not clipped.

v1.3.7: Settings is a CSS-anchored cluster above the composer (no header hunting, no `resize` layout, no capture `pointerdown`). Opening the panel no longer freezes the page or spikes memory. Single-column cards so names are not clipped.

v1.3.8: Settings is a **top-layer popover** (`popover=manual`) anchored to a header FAB. Compact menu rows (no PluginCard / no author footer). Host is a pass-through overlay so the panel cannot expand document overflow.

v1.3.9: Settings is injected into ChatGPT's **account menu** (Void++-style). No FAB, no popover, no viewport overlay. HUD mounts on `document.body`.

v1.4.0: Persistent **Bloom++** row next to the sidebar profile (`accounts-profile-button` / `#stage-slideover-sidebar`, chatgpt-exporter style). The userscript menu always paints (or toggles) the same in-flow panel — it does not click the profile. Island-gate miss still starts default-on plugins. A second installed copy replaces `window.Bloom` instead of exiting silently.

v1.4.1: Bloom++ is the **previous sibling** of the whole account footer (`nav.nextElementSibling` or `.sticky.bottom-0`), never a child of that overflow-hidden sticky box. Profile pick prefers the on-screen left-rail chip. HostShell starts when the sidebar exists (no extra idle wait). Collapsed rail shows the blossom only.

v1.4.2: Pin waits for HostReady (do not mutate `nav` mid-hydration — React #418). Exporter pocket: sibling of the avatar chip inside the footer, never a `nav` / `#stage-slideover-sidebar` direct child. `findProfileButton` has no off-screen fallback. Userscript menu docks to `document.body` when the rail is not on screen. Invisible connected panels are torn down, not toggled shut. Collapsed rail may pin to `#stage-sidebar-tiny-bar`.

v1.4.3: Settings panel always docks on `document.body` (`.bloom-rail-dock`, `z-index: 10000`). Never `rail.before(panel)` — that inflated the account footer and froze long chats. `pinRail` only restores the chip. Sidebar observer disconnects before mutating and only watches `#bloom-rail-item`. Rail poll is 2s and skips when the chip is still connected.

v1.4.4: Bloom++ icon slot is 32px (same as the account avatar). Padding and gap are copied from the live profile chip so the blossom and **Bloom++** line up with the avatar and the display name.

v1.4.5: Settings list is a Void++ **BaseCard** stack again (icon tile, 2-line description, author footer, gear + switch) inside the existing 280px body dock. Gear still swaps an in-panel view. No modal / popover / FAB.

v1.4.7: Settings panel matches Void++ Plugins tab chrome. Centered ~56rem dock so two-column names are not clipped. Card actions use Void++ Settings2 (sliders), pin, and star. Plugin icons sit next to the name.

v1.4.8: **NoSidebarIdentity** (CSS-only, default on) hides the account-chip display name; avatar and the Bloom++ row stay. **RecentTopics** (default on) is Ctrl+` recent-chat switcher. HUD is body-docked (`#bloom-rt-host`), not a popover / inset:0 overlay. Visits come from the URL + Recents links + the current turn in the DOM — no conversations API. `@version` is **1.4.8** (not 1.4.6): Tampermonkey / Violentmonkey will not auto-update from published 1.4.7 down to 1.4.6.

v1.4.9: NoSidebarIdentity keeps the name/email **slot**. Text is `visibility:hidden` (not `display:none`); the `.min-w-0` column stays in flow so the avatar chip does not collapse next to Bloom++.

v1.4.10: Restore the **v1.4.7 settings panel** (centered ~56rem dock, Favorites/All/Chat/UI/Privacy tabs, search, pin, star, Settings2 gear). 1.4.8 had overwritten it with the older 280px left dock.

v1.4.11: **Cleaner** (CSS-only, default on). Hides the Download apps CTA and the composer “can make mistakes” notice. Toggles `hideDownloadApps` and `hideDisclaimer`. Does not hide Voice, Share, the avatar, or Bloom++.

v1.4.12: Cleaner disclaimer selectors match chatgpt.com: `thread-disclaimer` and `--vt-disclaimer` (not the fake `composer-disclaimer` / `form +` sibling). Do not hide `#thread-bottom-container`.

v1.4.13: NoSidebarIdentity `enlargePlan` (default on, only while the name is hidden). Drops the name node so Plus/Pro/Free sits on that baseline at 14px/500, vertically centered with the 32px avatar — same metrics as Bloom++.

v1.4.14: **Revert** 1.4.13 `enlargePlan`. Hiding the name with `display:none` plus restyling `.min-w-0` stacked Pro under the avatar. Name hide is `visibility:hidden` again (keep the slot).

v1.4.15: NoSidebarIdentity `enlargePlan` again — **font size / line-height only** (14px / 1.25 / 500). No flex, no `display:none` on the name, no `.min-w-0` restyle. Pro stays beside the avatar.

v1.4.16: `enlargePlan` selectors expanded. ChatGPT’s plan label is often a second `.truncate` (1.4.15’s `:not(.truncate)` missed it) or a direct `.text-xs` / `.text-token-text-secondary` next to the avatar. Name hide while enlarging is `.truncate:first-child:not(:last-child)` so a lone / last truncate (Plus/Pro/Free) stays visible.

v1.4.17: **Fix** 1.4.16. A lone `.truncate` is the display name — `:first-child:not(:last-child)` left it visible and `:last-child` enlarged it. Hide every `.min-w-0 > .truncate` again. Enlarge only `.text-xs` / `.text-token-text-*:not(.truncate)` / non-truncate siblings — never `.truncate`.

v1.4.18: **Stop the page freeze.** ChatStateFavicons no longer deletes ChatGPT's official `<link rel=icon>` on every evaluate — that fought `hydrateRoot(document)` and locked the tab (Helium / Chromium). Own icon stays last; the head guard only restores **our** link. `pinRail` is no longer synchronous from the footer observer and backs off if React rejects the chip. Composer watch ignores `class`. RecentTopics debounces `history` writes.

v1.4.19: **Settings colors match ChatGPT's native Settings dialog.** Panel uses `--bg-primary` + `shadow-long` (white elevated card, not page `--main-surface-primary`). Switches / sliders use `--bg-primary-inverted` (black / white), not `--text-accent` blue. Tabs use the same hover-pill as General. Host token fallbacks follow current chatgpt.com light / dark.

v1.4.20: **Settings dock no longer covers the composer.** The panel is a left-rail-width box (`20rem`, `left: 0.75rem`) instead of a centered `56rem` overlay that sat on the plus / dictation / Voice buttons. Plugin cards stay a single BaseCard column.

v1.4.30: **Settings header matches Void++ dialog chrome.** One title (Bloom++) plus description; no extra Plugins heading. Close sits on the title row. 1rem stack gap.

v1.4.29: **ChatStateFavicons default overlay is Fill** (`bg`), not Badge.

v1.4.28: **Bloom++ chrome matches the account chip.** Dark surface is the chip fill (`#353535` / live computed background), not `--sidebar-surface-primary`. Rail, settings panel, and plugin popup share it.

v1.4.27: **Plugin settings is an independent popup** (Void++ nested `PluginDialog`), not a reuse of the Bloom++ settings panel. Gear leaves the plugin list open and stacks a 32rem card over it. Close / Escape / click the transparent layer dismiss the popup only. Authors / Settings / `humanizeKey` / Reset stay. No `<dialog>`, popover, `role="dialog"`, or `aria-modal`.

v1.4.26: **Plugin settings pane** matched Void++ `PluginDialog` layout but still swapped the settings panel (Back/Close chrome). Superseded by 1.4.27.

v1.4.25: **Userscript `@icon`** is the same solid mark as the **Bloom++** title (settings `blossomSvg()` outer path): white glyph, transparent, no ChatGPT knot plate. Canonical files under `assets/logos/app-icon/` (`bloom-icon.svg`, `bloom-icon-64.png`, `bloom-icon-256.png`). GitHub raw `@icon` / `@icon64`. Rail mark and ChatStateFavicons compositor unchanged.

v1.4.24: **ChatListStatus** only paints the open Recents row. ChatGPT already shows status on other chats; Bloom was stacking a second spinner. No done-dot.

v1.4.23: **P1 rewrite, not a Grok copy.** **WiderChat** (default on): slider 40–96 rem (default 64) overrides `--thread-content-max-width`. **MessageTimestamps** (default on): `<time class="bloom-ts">` on `[data-message-id]` from conversation JSON / SSE `create_time` (no `/conversations` poll, no MessageStore). **StreamerMode** (default off): CSS blur Recents / projects / account chip; hover Recents to peek; never classes on `<html>`.

v1.4.22: **P0 plugins.** **Cleaner** also hides upgrade CTAs, locked models, home GPT promo, and Free ads (still CSS-only; never Voice / Share / avatar / `#bloom-rail-item` / `#thread-bottom-container`). **ResponseNotification** (default on): falling-edge of `isStreaming()` + 2–3 quiet ticks; sound + browser notification; `onlyWhenHidden` default; skip Stop / error toast / conversation switch. **ChatListStatus** (default on): Recents spinner / blue done-dot / error from current-tab streaming, conversation POST/SSE intercept, and `BroadcastChannel` — no `/conversations` poll.

v1.4.21: **Restore the centered settings dock** (1.4.20 left-rail move was unwanted). **Favicon actually wins:** official `<link rel=icon>` nodes stay in the tree (no React strip-fight) but are parked (`media="not all"` / `bloom-host-icon`) so Chrome stops preferring ChatGPT's SVG over the blossom PNG.

- NoShareLink: `button[data-testid="share-chat-button"]`. Project: `share-project-button` / `project-share-button`. Toggles `hideShareChat` and `hideShareProject`.
- NoDictation: composer `aria-label` Dictate / Start dictation / 听写 / `composer-dictate-button`. Leaves `composer-speech-button` and `voice-mode-button` alone. Optional `hideDictationSettings` matches settings-dialog testids and aria-labels only.
- NoSidebarIdentity: `[data-testid="accounts-profile-button"] .flex.min-w-0 > .truncate`. Toggles `hideUsername` and `hideEmail` (mailto only; Plus/Pro labels are left alone). `enlargePlan` (default on, while the name is hidden) sets the plan label to 14px/1.25/500 via `.text-xs` / `.text-token-text-secondary:not(.truncate)`. Never restyles `.truncate`. Layout unchanged.
- RecentTopics: Ctrl+` / Ctrl+Shift+` / Esc / Enter. `maxRecent` 3–12 (default 5). `includeHome` (default on).
- Cleaner: Download apps via `a[href*="/download"]` / `download-app-button` / aria-label. Disclaimer via `[data-testid="thread-disclaimer"]` and `[class*="--vt-disclaimer"]` inside `#thread-bottom-container`. Upgrade CTAs via `upgrade-button` / `get-plus-button` / `/upgrade` / `/checkout`. Locked models via `aria-disabled` / `data-state="locked"` picker rows. Home promo and ads via `home-promo` / `sponsored` / `ad-slot` testids. `display:none` (those controls should leave the layout).
- ResponseNotification: `isStreaming()` falling-edge, 3 quiet 400ms ticks, `contextKey` lock. Settings `sound`, `soundUrl`, `browserNotification`, `onlyWhenHidden`.
- ChatListStatus: paints only the Recents `a[href^="/c/"]` whose id is the open chat. Intercepts POST `/backend-api/conversation` (not `/conversations`). Channel `bloom-cls`.
- WiderChat: `--thread-content-max-width` + `[class*="thread-content-max-width"]` on `#thread` / `#thread-bottom-container`. Slider `width` 40–96 rem.
- MessageTimestamps: `[data-message-id]` in `#thread`. GET `/backend-api/conversation/{id}` mapping `create_time`. Settings `showDate`, `hideOwnMessages`.
- StreamerMode: `filter:blur(6px)` on Recents `a[href^="/c/"]`, project `/g/g-p-` / `/project`, profile avatar / `.truncate` / mailto. Hover unblurs Recents and projects. Never `#bloom-rail-item`.

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
