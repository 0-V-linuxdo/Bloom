# Bloom++

[English](README.md) · 中文

面向 `chatgpt.com` 的 [Void++](https://github.com/0-V-linuxdo/Void) 式**插件宿主**：一条油猴脚本、可开关插件、设置钉在侧栏头像旁。

当前版本：**[v1.4.52](https://github.com/0-V-linuxdo/Bloom/releases/tag/v1.4.52)**（`userscript/Bloom.latest.user.js`，`@version [20260920] v1.4.52`）。

插件：

| 插件 | 默认 | 说明 |
| --- | --- | --- |
| ChatStateFavicons | 开 | 标签页图标反映会话状态（streaming / done / ready / error），五种叠层样式。空闲时保持官方 ChatGPT 图标。 |
| InputHistory | 开 | 在输入框用 ↑ / ↓ 翻看历史提示词，类似终端。 |
| NoShareLink | 关 | 隐藏对话顶栏 Share 和项目里的 Share project。纯 CSS。 |
| NoDictation | 关 | 隐藏输入栏听写（语音转文字）按钮，不隐藏 Voice。纯 CSS。 |
| NoSidebarIdentity | 开 | 隐藏侧栏头像旁的显示名。可选：只放大 Plus/Pro/Free 字号；可选：收掉空名字行，让订阅等级与头像中线对齐。纯 CSS。 |
| RecentTopics | 开 | Ctrl+` 切换最近打开的会话（标题 + 上轮预览）。 |
| Cleaner | 开 | 隐藏 Download apps、「也会犯错」提示、升级入口、锁定模型、首页促销、Free 广告。纯 CSS。 |
| ResponseNotification | 开 | 回复结束时响铃 / 浏览器通知。默认只在标签隐藏时通知。 |
| PromptQueue | 关 | 生成中排队下一条提示。Enter / Send 等本轮结束再发，而不是打断当前回复。 |
| ChatListStatus | 开 | 只在**当前打开**的 Recents 行转圈。其它行沿用 ChatGPT 自带状态。 |
| WiderChat | 开 | 加宽对话和输入栏（滑块 40–96 rem，默认 64）。纯 CSS。 |
| ComposerOpacity | 开 | 输入栏背景透明度和模糊，让对话内容能透过输入条。纯 CSS。 |
| BetterNavigator | 开 | 当前对话的 Notion 式目录。悬停 tick，点击或 ↑/↓ 跳转。正在输出的回复用虚线 tick 标出。 |
| MessageTimestamps | 开 | 每条消息显示发送时间，读 ChatGPT 已有的会话 JSON。 |
| StreamerMode | 关 | 模糊 Recents 标题、顶栏会话名、项目名和账号芯片。纯 CSS。悬停 Recents / 切换器可看一眼。 |
| GreetingCustomizer | 关 | 用自己的文案替换首页问候语。可按访问、定时或点击轮播。 |

品牌名是 **Bloom++**，仓库名是 `Bloom`，都不含 `ChatGPT`。

## 安装

1. 安装 [Violentmonkey](https://violentmonkey.github.io/) 或 Tampermonkey。
2. 打开 [`userscript/Bloom.latest.user.js`](https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.latest.user.js)。
3. 确认安装后刷新 `chatgpt.com`。
4. 左侧栏头像上方会出现 **Bloom++**。油猴菜单 **Bloom++ settings** 也会打开同一块面板（再点一次关闭）。面板永远停在页面左侧的 `document.body` 上，不会插入侧栏 DOM。插件列表是 **Void++ BaseCard** 栈（图标砖、两行描述、作者栏、齿轮 + 开关）。

若还装着旧版 Bloom++，先卸掉再从 GitHub raw 装。自动更新走 `Bloom.latest.user.js`（`raw.githubusercontent.com/.../refs/heads/main/...`）。不要用 `.../Bloom/main/userscript/Bloom.user.js` 或 `.../refs/heads/main/userscript/Bloom.user.js`（Fastly 会卡住旧脚本）。不要用 jsDelivr `@heads/main`（缓存最多 7 天）。不要用 `github.com/.../raw/refs/heads/...`（会返回 HTML）。

设置面板默认**跟随 `chatgpt.com` 自己的主题**（`Appearance: Follow host`）。可在 Bloom++ 面板强制浅色 / 深色。ChatStateFavicons **空闲时保持官方 ChatGPT 标签页图标**；只在 streaming / done / ready / error 时叠白色 blossom PNG（深色描边）。

## GreetingCustomizer

默认关闭。只替换 chatgpt.com **首页**（`/`）问候语。

- 只画 CSS（`h1.text-page-header .text-pretty::before`，否则 `main h1 .text-pretty`，再否则首页 `main h1`），不改 React 文本
- 轮播：每次进首页 · 停留在首页时定时 · 点击标题
- 顺序或随机；齿轮页增删改（最多 30 条、每条 100 字）
- 列表为空或插件关闭 → 官方问候
- 请卸掉独立的 `[ChatGPT] Greeting Customizer`，避免两套 overlay 对打

## PromptQueue

默认关闭。ChatGPT 正在生成时，**Enter / Send 会排队下一条提示**，而不是按原生行为打断当前回复并立刻发出。

- 每个会话只存一条（再按 Enter 覆盖）
- Stop 只停止生成，**不会**自动发出队列
- Alt+Enter 或芯片上的 **立即发送** 仍立刻打断
- `#bloom-pq-chip` 挂在 `document.body`、贴在输入栏上方（× 丢弃）
- 只排队纯文本；刷新页面即丢（session-only）
- 独立于 ResponseNotification / InputHistory / AutoContinue

## NoShareLink / NoDictation

两个插件默认关闭。Init 时排队 CSS，`document.head` 一出现就 `flushStyles`，**不**用 `MutationObserver` 扫整棵树，也**不** `querySelectorAll("button")`。

v1.1.2：样式只挂到 `document.head`，没有 head 就等，禁止挂到 `<html>`。

v1.1.3：HostReady 等到 `window` load 再短暂停一下（不再把 `DOMContentLoaded` 当成水合完成）。`#bloom-root` 和 InputHistory HUD 只挂到 `document.body`。

v1.1.4：HostReady 从脚本启动起至少约 8 秒才往 body 挂节点。InputHistory 改到 HostReady。若 React 拆掉 `#bloom-root` 会重挂一次。document-start 仍往 head 插样式，页面能画出来但点不动、输不了字。

v1.1.5：Init 不再往 DOM 插节点，也不观察 `<html>`。样式等检测到 React host 后再进 `head`（8 秒是上限不是下限）。取消 remount。ChatStateFavicons 不再观察整棵 `document.body`。`#bloom-root` 为 `pointer-events: none`，只给花瓣按钮 `auto`。检测不到可交互宿主就不自动往 body 挂节点；Violentmonkey 菜单仍可打开设置。

v1.1.6：去掉设置顶部的外观切换，面板跟随站点主题。NoShareLink / NoDictation 默认关闭。

v1.1.7：HostReady 等到 `max(启动起 8 秒, 晚到的岛)`——侧栏 `a[href^="/c/"]`、头像 `img`、或个性化问候。8 秒再次作为下限。此前不写 DOM（包括 `flushStyles` / `#bloom-root` / favicon）。NoShareLink / NoDictation 改到 HostReady，只用 testid，走 adopted stylesheets。InputHistory 监听挂在 composer 上，不再捕获整页。

v1.1.8：ScriptReady（8 秒 + 岛）只挂 Violentmonkey 菜单。`flushStyles`、`#bloom-root`、CSF、InputHistory 等到一次可信点击（或菜单）并错开该事件后再跑。CSF 只改已有 icon `link`，不 `prepend`、不观察 `head`。页面 CSS 只用 `GM_addStyle`。InputHistory HUD 进 Bloom 的 shadow。

v1.1.9：设置卡片改成 Void++ 布局（名称 + 作者 + 开关，选项一行一个）。花瓣按钮用 `position:fixed` 贴在「下载 ChatGPT 应用」右侧，不插入顶栏 DOM。按钮里的花瓣更大。

v1.2.0：插件卡片对齐 Void++ BaseCard（图标砖、齿轮、开关、两行描述、底栏作者）。选项进二级面板，不再堆在卡片里。两列网格。花瓣先贴顶栏 Download App，没有则贴侧栏头像旁的商店/袋标。

v1.2.1：齿轮改为切视图（藏网格、显示配置页），不再绝对叠层。花瓣贴侧栏底栏袋标 / 下载按钮右侧；只要这行还在，就不会落到 Share 旁边。

v1.2.2：水合等待改为先睡满 8 秒再稀疏查岛，不再 100ms 轮询。花瓣只在挂上和 resize 时定位，去掉 400ms 定时器、捕获 scroll 和 `elementsFromPoint`。齿轮另开一层配置窗，四张卡留在主窗。

v1.2.3：去掉 PageTouch。不再用第一次点击启动 Host，改为 8 秒岛门（`#prompt-textarea` + Recents 或真头像）之后 `requestIdleCallback`。花瓣和插件分两拍 idle。`@run-at document-idle`。不再捕获 `pointerdown`。

v1.2.4：`#bloom-root` 挂到 `document.documentElement`，不进 `body`。页面 CSS 写在 `<html>` 上，不用 `GM_addStyle` / `<head>`。CSF / InputHistory / NoShareLink / NoDictation 等点花瓣或菜单后才启动。CSF 不改站点 favicon、不观察作曲器（2 秒轮询）。InputHistory 只用 window 冒泡。

v1.3.0：岛门 + idle 之后自动启动 HostReady 插件（花瓣只开设置）。页面 CSS 和状态 favicon 写在 `document.head`。`#bloom-root` 挂 `document.body`。CSF 用 head-only FaviconGuard，并观察 composer root。InputHistory 用捕获阶段 `keydown`。NoDictation 隐藏听写（`Start dictation` / `Dictate button` / 听写），不隐藏 Voice（`composer-speech-button`）。Stop / Send / 编辑器选择器集中在 `src/host`。

v1.3.1：标签页图标各状态都用深色底上的白色 blossom（官方黑色图标在聊天背景上对比度不够）。插件卡片图标去掉灰底。

v1.3.2：点花瓣只切换预建面板，不再启动 HostReady 插件。favicon 改为白色 blossom 栅格成 PNG，插在 `head` 最后一个 `rel=icon`，head subtree 守卫，无 SMIL。CSF 在 DOMContentLoaded 启动。

v1.3.3：设置改为花瓣旁的**非模态 flyout**。去掉全屏 backdrop 按钮，打开面板后 chatgpt.com 仍可点击。齿轮在面板内切视图。主题监听不再观察 `<html>`。

v1.3.4：`@updateURL` / `@downloadURL` / 安装链接改为 GitHub raw。不再使用 jsDelivr `@heads/main`。

v1.3.5：`#bloom-root` 改为零尺寸 fixed host，不再铺满页面。设置面板约 360px。window capture `pointerdown` 仅在面板打开时绑定。

v1.3.6：花瓣锚到顶栏 Download / 头像，不再贴左侧栏。面板约 520px，插件名不再被裁成 “C…”。

v1.3.7：设置改为输入框上方的 CSS 锚簇（不再寻顶栏、不再 `resize` 写布局、不再 capture `pointerdown`）。开面板不再卡死或内存暴涨。单列卡片，插件名完整显示。

v1.3.8：设置改为顶层 **popover**（`popover=manual`），花瓣钉在顶栏右。紧凑菜单行（去掉 PluginCard / 作者条）。host 是穿透 overlay，面板不再撑文档滚动条。

v1.3.9：设置注入到 ChatGPT **头像菜单**（对齐 Void++）。去掉 FAB / popover / 全屏 overlay。HUD 挂在 `document.body`。

v1.4.0：常驻 **Bloom++** 行钉在侧栏头像旁（`accounts-profile-button` / `#stage-slideover-sidebar`，chatgpt-exporter 写法）。油猴菜单无条件画出（或关掉）同一块流式面板，不再去点头像。岛门失败仍启动默认插件。第二份安装会替换 `window.Bloom`，不再静默跳过。

v1.4.1：Bloom++ 是账号 footer 整块（`nav` 的下一个兄弟或 `.sticky.bottom-0`）的**前一个兄弟**，不再写进 sticky 裁剪盒。头像优先选屏内左侧轨。侧栏一出现就钉（不等 idle）。折叠轨只显示花标。

v1.4.2：钉点等到 HostReady（水合中途不改 `nav`，避免 React #418）。exporter 口袋：footer 里头像芯片的兄弟，绝不当 `nav` / `#stage-slideover-sidebar` 的直子。`findProfileButton` 不再退回出屏节点。油猴菜单在没有屏内轨时把面板停到 `document.body`。看不见但仍连着的板先拆再画，不当作已打开。折叠轨可钉到 `#stage-sidebar-tiny-bar`。

v1.4.3：设置面板永远停在 `document.body`（`.bloom-rail-dock`，`z-index: 10000`）。禁止 `rail.before(panel)`，避免把账号 footer 撑开、长对话卡死。`pinRail` 只补芯片。侧栏 observer 改 DOM 前 disconnect，只盯 `#bloom-rail-item`。轮询 2 秒，芯片还在就跳过。

v1.4.4：Bloom++ 图标槽改成 32px（与头像同宽）。内边距和间距跟账号芯片对齐，花标和名称与头像、用户名同一条竖线。

v1.4.5：设置列表在现有 280px body-dock 里改回 Void++ **BaseCard** 栈（图标砖、两行描述、作者栏、齿轮 + 开关）。齿轮仍在同面板切视图。无模态 / popover / FAB。

v1.4.7：设置面板对齐 Void++ Plugins 页。居中约 56rem 宽，两列名称不再被裁。卡片操作是 Void++ 滑块齿轮、图钉、星标。插件图标挨着名称。

v1.4.8：新增 **NoSidebarIdentity**（纯 CSS，默认开）隐藏账号芯片显示名，头像和 Bloom++ 行保留。新增 **RecentTopics**（默认开）：Ctrl+` 切换最近会话。HUD 挂在 `document.body`（`#bloom-rt-host`），不是 popover / 全屏 overlay。访问记录来自 URL + Recents 链接 + 当前轮 DOM，不轮询 conversations API。`@version` 是 **1.4.8**（不是 1.4.6）：油猴不会从已发布的 1.4.7 降级到 1.4.6。

v1.4.9：NoSidebarIdentity **保留名字/邮箱占位**。文字用 `visibility:hidden`（不用 `display:none`），`.min-w-0` 列留在文档流里，头像行不会缩成一颗图标。

v1.4.10：恢复 **v1.4.7 设置面板**（居中约 56rem、Favorites/All/Chat/UI/Privacy 标签、搜索、图钉、星标、滑块齿轮）。1.4.8 合入时被旧的 280px 左侧停靠盖掉了。

v1.4.11：新增 **Cleaner**（纯 CSS，默认开）。隐藏 Download apps 和输入栏下的「也会犯错」提示。开关 `hideDownloadApps` / `hideDisclaimer`。不藏 Voice、Share、头像或 Bloom++。

v1.4.12：Cleaner 的提示选择器对齐 chatgpt.com：`thread-disclaimer` 与 `--vt-disclaimer`（不再用假的 `composer-disclaimer` / `form +` 兄弟）。不藏整个 `#thread-bottom-container`。

v1.4.13：NoSidebarIdentity 新增 `enlargePlan`（默认开，仅在隐藏显示名时生效）。去掉名字节点，让 Plus/Pro/Free 顶到名字那一行，14px/500，与 32px 头像垂直对齐，和 Bloom++ 同一套尺寸。

v1.4.14：**撤回** 1.4.13 的 `enlargePlan`。`display:none` 名字再改 `.min-w-0` 会把 Pro 挤到头像下面。显示名仍用 `visibility:hidden` 保占位。

v1.4.15：NoSidebarIdentity `enlargePlan` 重做——**只改字号/行高**（14px / 1.25 / 500）。不改 flex、不 `display:none` 名字、不重排 `.min-w-0`。Pro 仍在头像右侧。

v1.4.16：扩大 `enlargePlan` 选择器。Plan 经常是第二条 `.truncate`（1.4.15 的 `:not(.truncate)` 打空），或头像旁直接的 `.text-xs` / `.text-token-text-secondary`。隐藏名字时只用 `.truncate:first-child:not(:last-child)`，最后一条 / 唯一一条 truncate（Plus/Pro/Free）保持可见。

v1.4.17：**修正** 1.4.16。唯一的 `.truncate` 是显示名——`:first-child:not(:last-child)` 没藏住，`:last-child` 还把它放大了。恢复隐藏所有 `.min-w-0 > .truncate`。只放大 `.text-xs` / `.text-token-text-*:not(.truncate)` / 非 truncate 兄弟，不动 `.truncate`。

v1.4.18：**修页面卡死。** ChatStateFavicons 不再每次 evaluate 都删掉站点自己的 `<link rel=icon>`——那会和 `hydrateRoot(document)` 对打，整页锁死（Helium / Chromium）。只保证自己的图标在 `head` 最后；守卫只修我们的 link。`pinRail` 不再从 footer observer 同步插入，React 甩掉芯片就退避。Composer 观察不再盯 `class`。RecentTopics 对 `history` 写入做了防抖。

v1.4.19：**设置弹窗配色对齐 ChatGPT 原生 Settings。** 面板用 `--bg-primary` + `shadow-long`（白底浮层，不用页面灰的 `--main-surface-primary`）。开关 / 滑块用 `--bg-primary-inverted`（黑 / 白），不再用 `--text-accent` 蓝。标签用和 General 一样的灰底 pill。宿主 token 回退值跟当前 chatgpt.com 浅色 / 深色。

v1.4.20：**设置面板不再挡住输入框。** 改回左侧轨宽停靠（`20rem`，`left: 0.75rem`），不再居中 `56rem` 盖住右下角的加号 / 听写 / Voice。插件卡保持单列 BaseCard。

v1.4.21：**设置弹窗回到居中**（1.4.20 挪到左侧是误改）。**favicon 重新生效：** 官方 `<link rel=icon>` 仍留在树上（不跟 React 对删），但先停用（`media="not all"` / `bloom-host-icon`），Chrome 不再优先站点 SVG，blossom PNG 才能显示。

v1.4.22：**P0 插件。** **Cleaner** 额外隐藏升级入口、锁定模型、首页促销、Free 广告（仍是纯 CSS；永不藏 Voice / Share / 头像 / `#bloom-rail-item` / `#thread-bottom-container`）。**ResponseNotification**（默认开）：`isStreaming()` 下降沿 + 2–3 个静默 tick；响铃 + 浏览器通知；默认 `onlyWhenHidden`；点 Stop / 出错 toast / 切会话不通知。**ChatListStatus**（默认开）：Recents 转圈 / 完成后蓝点 / 出错，来源是本页 streaming、conversation POST/SSE 拦截、`BroadcastChannel`——不轮询 `/conversations`。

v1.4.52：**NoSidebarIdentity 加载时不再先闪用户名。** CSS-only 插件（NSI、NoShareLink、NoDictation、Cleaner、WiderChat、ComposerOpacity、StreamerMode）在 Init 启动，`document.head` 一出现就 `flushStyles`，不再等 HostReady 岛门 + idle。设置条钉轨仍等 HostReady。隐藏也覆盖首帧还不是 `.truncate` 的名字 `span`/`p`。名字仍是 `visibility:hidden`（永不对 `.min-w-0` 列 `display:none`）。不改 `@run-at document-start`，不往 `<html>` 挂样式。

v1.4.51：**ChatStateFavicons 空闲恢复官方 favicon。** `wait` 去掉 `#bloom-chat-state-favicon` 并 unpark 站点图标（不再画 `#212121` 底板或 32×32 blossom PNG）。rotate / done / ready / error 仍 park 官方节点并叠白色 blossom PNG。切会话、关插件、以及 wait 时的 head 守卫都会恢复。永不删官方 link。

v1.4.50：**BetterNavigator** 正在输出的 assistant tick 改成虚线（对齐 Void++ `void-bn-tick-live`）。只标节点自己在生成（`aria-busy` / `.result-streaming` / 空 markdown + thinking）且本轮 harvest generate 武装或可见 Stop 的行；不用裸 `isStreaming()`，不把上一轮已完成回复画成虚线。摘要为空时显示「正在输出…」。节点空闲且 Stop 消失后立刻收回虚线。

v1.4.49：**ChatListStatus** 打开已结束的历史会话时不再在 Recents 行空转。harvest `post-start` 只认 generate POST `/backend-api/conversation` 或 `/f/conversation`（`action: next|continue|variant`），不认 `/conversation/init`。本地 tick 必须有这次 generate 武装或真实 Stop；hydrate 的 `aria-busy` / 标题栏加载转圈 / Deep Research token 骨架忽略。`onContext` 在没有进行中的 generate 时清掉本地标记。仍然只画当前行、不画完成蓝点。

v1.4.48：**BetterNavigator** 悬停目录在对话列垂直居中（对齐 Void++ `.void-bn-self` 的 `top: 50%` / `translateY(-50%)`），不再贴在页面顶部。

v1.4.47：**BetterNavigator** 从第一条已挂载的消息就开始画轨（一轮对话也显示）。之前要等两条才出现。

v1.4.46：**BetterNavigator**（默认开）。Void++ BetterNavigator 的 ChatGPT 改写（Notion 式 `#thread` 目录）。轨钉在 `document.body` 上对齐对话列；悬停展开摘要；点击或 ↑/↓ 跳转。只列当前挂载的回合。没有 Grok 原生 tick，不用 `:has()`，不观察 html/body subtree。

v1.4.45：**ComposerOpacity**（默认开）。Void++ ComposerOpacity 的 ChatGPT 改写。透明度 100 保持官方输入条；低于 100 时用 `--bg-primary` 的 `color-mix` 画 unified-composer 药丸，可加模糊，并去掉 `#thread-bottom` 渐变遮罩，让对话透出来。不用 Grok `.query-bar` / hsl，不用 `:has()`，不用 `pointer-events:none`。

v1.4.44：**宿主 `watchStreamingEdge`。** 一份 400ms 定时器做回复完成判定：`isStreaming()` 下降沿 + 3 个静默 tick + `contextKey` 锁 + Stop 点击 + harvest `post-end` 武装。ResponseNotification、PromptQueue、ChatListStatus 改为订阅，不再各自轮询。仍然没有 `streamEnd` 事件。给后续 AutoContinue 用。

v1.4.43：**PromptQueue**（默认关）。回复生成中按 Enter / Send 会把下一条提示暂存，而不是按 ChatGPT 原生那样打断当前回合立刻发出。每个会话一条；点 Stop 不出队；Alt+Enter 或芯片 **立即发送** 仍走原生打断。`#bloom-pq-chip` 挂在 `document.body`。写出走宿主 `setEditorText`，完成判定复制 ResponseNotification 的 `isStreaming()` 下降沿。不轮询 `/conversations`，没有 `streamEnd`。

v1.4.42：**现有插件打磨（不加新端口）。** RecentTopics / ResponseNotification 读宿主 `conversationTitle` / `conversation-meta`（仍不轮询 `/conversations`）。StreamerMode 还糊顶栏会话名和 RecentTopics HUD（`headerTitle`；不糊 Voice / Share / 作曲器 / 模型切换）。NoShareLink / NoDictation / Cleaner / WiderChat 补当前 chatgpt.com 选择器和宽度变量。

v1.4.41：**harvest 打磨。** GET `/backend-api/conversation/{id}` 从 API 路径取 id（不再误用 `/c/` href）。最后一个订阅者卸钩时作废进行中的 SSE。标题忽略带 author/content 的消息对象。MessageTimestamps 可回退读宿主 `messageCreateTime` 缓存。

v1.4.40：**宿主 harvest。** `src/host/harvest.ts` 只拦一次 `fetch`，读会话 GET JSON 和 POST SSE（`create_time`、标题、流式起止）。ChatListStatus / MessageTimestamps 改为订阅，不再各自 wrap `window.fetch`。不拦 `/conversations` 列表。没有 `streamEnd` 事件。`conversationTitle` / `messageCreateTime` 留给 PromptQueue / AutoContinue。

v1.4.39：**宿主 P0。** 作曲器 `hasDraftText` / `isUserDraftEmpty` / `setEditorText` 收到 `src/host`（Send 后钉回 `#prompt-textarea` 的 App/@ 芯片不再算草稿；InputHistory 走同一条写出路径）。ChatStateFavicons 的 ready 只在真草稿 + `primedReady` + Send 非灰时成立；流式上升沿清掉 `primedReady`。流式检测优先 Stop + `aria-busy`，Deep Research / 生图 class token 只作兜底。设置 **Appearance**（`auto` / 浅色 / 深色）接上，不再写死 `auto`。

v1.4.38：**GreetingCustomizer 齿轮页。** 编辑 / 删除改成铅笔和垃圾桶图标（带 `aria-label`），不再用看不懂的 `E`。Add / Update 用 `--interactive-label-primary-default` 配 `--bg-primary-inverted`（暗色下原先白底白字）。列表和输入框用设置卡片的 `--bg-secondary`，不再用页面的 `--main-surface-primary`。

v1.4.37：**GreetingCustomizer 能打到现在的首页标题。** 2026-03 的 `h1.text-page-header .text-pretty` 仍保留，但不再作为唯一合同。依次回退到 `main h1 .text-pretty`、`main h1`。跳过 `#page-header`、侧栏、Bloom 壳、Temporary Chat、`sr-only` / `aria-hidden`。`TEXT_SEL` 改成完整选择器列表（旧写法 `${H1_SEL} .text-pretty` 会命中 h1 自己）。

v1.4.36：安装 / `@updateURL` / `@downloadURL` 改走 `userscript/Bloom.latest.user.js`（`refs/heads/main` raw）。Fastly 在新提交进 git 之后仍把 `.../Bloom/main/userscript/Bloom.user.js` 卡在 1.4.33、把 `.../refs/heads/main/userscript/Bloom.user.js` 卡在 1.4.34。

v1.4.35：安装 / `@updateURL` / `@downloadURL` 改到 `raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.user.js`。短路径 `.../Bloom/main/userscript/Bloom.user.js` 在 1.4.34 进 `main` 之后仍被 Fastly 缓存成 1.4.33，油猴点链接无法更新。

v1.4.34：NoSidebarIdentity `alignPlanWithAvatar` 终于会动 Plus/Pro/Free。1.4.33 只把隐藏的 `.truncate` `height:0`，父级行盒还在，订阅等级仍贴在头像下半截。现在只对**名字行** `display:none`（名字节点 / 块级或 `flex-col` 的第一子节点——不是整列 `.min-w-0`，也不是 `.min-w-0.flex > :first-child`，那是头像）。列被拉高时 plan 用 `margin-block: auto`。仍不改芯片 `align-items`、不重排 `.min-w-0`（1.4.13）。

v1.4.33：NoSidebarIdentity 新增 `alignPlanWithAvatar`（默认关，仅在隐藏显示名时生效）。收掉空名字 `.truncate` 的高度。已被 1.4.34 取代——在 Helium 上没有可见效果。

v1.4.32：**侧栏 Bloom++ 行重新对齐账号条。** 休息态透明，和原生 Pro 行一样，不再铺 `#353535` 卡片底。悬停仍用 `--interactive-bg-secondary-hover`。设置面板和插件弹窗继续用 `--bg-primary` + `shadow-long`。

v1.4.31：**GreetingCustomizer**（默认关）。用自己的文案列表替换 chatgpt.com 首页问候。只画 CSS `::before`，不改 React 的 `h1` 文本。可按进入首页 / 定时 / 点击轮播。设置在插件齿轮页。若还装着独立的 `[ChatGPT] Greeting Customizer`，请卸掉，避免两套 `::before` 对打。

v1.4.30：**设置顶栏对齐 Void++。** 只留 Bloom++ 标题 + 说明，去掉重复的 Plugins 小标题。关闭按钮贴标题行。区块间距 1rem。

v1.4.29：**ChatStateFavicons 默认样式改为 Fill**（`bg`），不再默认 Badge。

v1.4.28：**Bloom++ 背景对齐账号条。** 深色用芯片实测填充（`#353535` / 现场计算色），不再用更深的 `--sidebar-surface-primary`。侧栏行、设置面板、插件弹窗同一色。

v1.4.27：**插件设置改为独立弹窗**（对齐 Void++ 的 nested `PluginDialog`），不再复用 Bloom++ 设置面板切页。点齿轮时插件列表仍在，32rem 卡片叠在上面。关闭 / Esc / 点透明层只关弹窗。Authors / Settings / `humanizeKey` / Reset 保留。不用 `<dialog>`、popover、`role="dialog"`、`aria-modal`。

v1.4.26：**插件设置页**对齐了 Void++ `PluginDialog` 布局，但仍在设置面板里切页（返回/关闭）。已被 1.4.27 取代。

v1.4.25：**油猴 `@icon`** 与标题行 **Bloom++** 左边同一枚实心花（`blossomSvg()` 外轮廓）：白标、透明底，不再用官方 knot 圆角砖。文件在 `assets/logos/app-icon/`（`bloom-icon.svg`、`bloom-icon-64.png`、`bloom-icon-256.png`），`@icon` / `@icon64` 走 GitHub raw。侧栏花标和 ChatStateFavicons 合成器未改。

v1.4.24：**ChatListStatus** 只画当前打开的 Recents 行。其它会话 ChatGPT 已经有状态，Bloom 再画会叠两个圈。不再画完成蓝点。

v1.4.23：**P1 重写，不抄 Grok。** **WiderChat**（默认开）：滑块 40–96 rem（默认 64）覆盖 `--thread-content-max-width`。**MessageTimestamps**（默认开）：在 `[data-message-id]` 上画 `<time class="bloom-ts">`，时间来自会话 JSON / SSE `create_time`（不轮询 `/conversations`，不用 MessageStore）。**StreamerMode**（默认关）：CSS 模糊 Recents / 项目 / 账号芯片；悬停 Recents 可看；不往 `<html>` 加 class。

## 构建

```bash
npm install
npm run build
```

v1 **只出 userscript**，不打浏览器扩展包。

## 许可

[GPL-3.0-or-later](LICENSE)。宿主与插件合同来自 Void++；ChatGPT 检测来自 [Chat-State-Favicons](https://github.com/0-V-linuxdo/Chat-State-Favicons)（MIT）。旧仓保持多站点脚本集合，本次不改。
