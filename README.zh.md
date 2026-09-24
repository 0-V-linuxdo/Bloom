# Bloom++

[English](README.md) · 中文

面向 `chatgpt.com` 的 [Void++](https://github.com/0-V-linuxdo/Void) 式**插件宿主**：一条油猴脚本、可开关插件、设置钉在侧栏头像旁。

当前版本：**[v1.4.105](https://github.com/0-V-linuxdo/Bloom/releases/tag/v1.4.105)**（`userscript/Bloom.update3.user.js`，`@version [20260924] v1.4.105`）。

插件：

| 插件 | 默认 | 说明 |
| --- | --- | --- |
| ChatStateFavicons | 开 | 标签页图标反映会话状态（streaming / done / ready / error），五种叠层样式。空闲时保持官方 ChatGPT 图标。 |
| InputHistory | 开 | 在输入框用 ↑ / ↓ 翻看历史提示词，类似终端。 |
| NoShareLink | 关 | 隐藏对话顶栏 Share 和项目里的 Share project。纯 CSS。 |
| NoDictation | 关 | 隐藏输入栏听写（语音转文字）按钮，不隐藏 Voice。纯 CSS。 |
| NoSidebarIdentity | 开 | 隐藏侧栏头像旁的显示名。可选：只放大 Plus/Pro/Free 字号；可选：收掉空名字行，让订阅等级与头像中线对齐。纯 CSS。 |
| CustomSidebarIdentity | 关 | 替换侧栏头像和显示名。留空则保持官方。可粘贴/裁切图片；可选同步账号下拉顶栏。 |
| RecentTopics | 开 | Ctrl+` 切换最近打开的会话（标题 + 上轮预览）。 |
| Cleaner | 开 | 隐藏 Download apps、「也会犯错」提示、升级入口、锁定模型、首页促销、Free 广告。纯 CSS。 |
| ResponseNotification | 开 | 回复结束时响铃 / 浏览器通知。默认只在标签隐藏时通知。 |
| PromptQueue | 关 | 生成中排队后续提示。Enter 追加；队头在本轮结束后再发。 |
| ChatListStatus | 开 | 只在**当前打开**的 Recents 行转圈。其它行沿用 ChatGPT 自带状态。 |
| WiderChat | 开 | 加宽对话和输入栏（滑块 40–96 rem，默认 64）。纯 CSS。 |
| ComposerOpacity | 开 | 输入栏背景透明度和模糊，让对话内容能透过输入条。纯 CSS。 |
| BetterNavigator | 开 | 当前对话的 Notion 式目录，包含 ChatGPT 还没挂上的轮。悬停 tick，点击或 ↑/↓ 跳转。正在输出的回复用虚线 tick 标出。 |
| MessageTimestamps | 开 | 每条消息显示发送时间，读 ChatGPT 已有的会话 JSON。 |
| StreamerMode | 关 | 模糊 Recents 标题、顶栏会话名、项目名和账号芯片。纯 CSS。悬停 Recents / 切换器可看一眼。 |
| GreetingCustomizer | 关 | 用自己的文案替换首页问候语。可按访问、定时或点击轮播。 |

品牌名是 **Bloom++**，仓库名是 `Bloom`，都不含 `ChatGPT`。

## 安装

1. 安装 [Violentmonkey](https://violentmonkey.github.io/) 或 Tampermonkey。
2. 打开 [`userscript/Bloom.update3.user.js`](https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update3.user.js)。
3. 确认安装后刷新 `chatgpt.com`。
4. 左侧栏头像上方会出现 **Bloom++**。油猴菜单 **Bloom++ settings** 也会打开同一块面板（再点一次关闭）。面板永远停在页面左侧的 `document.body` 上，不会插入侧栏 DOM。插件列表是 **Void++ BaseCard** 栈（图标砖、两行描述、作者栏、齿轮 + 开关）。

优先用油猴的**检查更新**（同一脚本 UUID，配置还在）。自动更新走 `Bloom.update3.user.js`（`raw.githubusercontent.com/.../refs/heads/main/...`）。如果提示「脚本已更新」但 `@version` 还是旧的，那是 Fastly 把 `Bloom.update2.user.js` / `Bloom.update.user.js` / `Bloom.latest.user.js` / `Bloom.user.js` 卡在旧稿：改点 `Bloom.update3.user.js` raw 或 [`releases/latest/download/Bloom.update3.user.js`](https://github.com/0-V-linuxdo/Bloom/releases/latest/download/Bloom.update3.user.js)。只有同时装着两条 Bloom++ 时才卸旧的。卸载会清掉油猴 GM 存储；Bloom++ 会尝试从当前站点的 IndexedDB / `localStorage` 救回。不要用 `.../Bloom/main/userscript/Bloom.user.js`、`.../refs/heads/main/userscript/Bloom.user.js`、`Bloom.latest.user.js`、`Bloom.update.user.js` 或 `Bloom.update2.user.js`（Fastly 会卡住旧脚本）。不要用 jsDelivr `@heads/main`（缓存最多 7 天）。不要用 `github.com/.../raw/refs/heads/...`（会返回 HTML）。

设置面板**跟随 `chatgpt.com` 自己的主题**。ChatStateFavicons **空闲时保持官方 ChatGPT 标签页图标**；只在 streaming / done / ready / error 时叠白色 blossom PNG（深色描边）。

## GreetingCustomizer

默认关闭。只替换 chatgpt.com **首页**（`/`）问候语。

- 只画 CSS（`h1.text-page-header .text-pretty::before`，否则 `main h1 .text-pretty`，再否则首页 `main h1`），不改 React 文本
- 轮播：每次进首页 · 停留在首页时定时 · 点击标题
- 顺序或随机；齿轮页增删改（最多 30 条、每条 100 字）
- 列表为空或插件关闭 → 官方问候
- 请卸掉独立的 `[ChatGPT] Greeting Customizer`，避免两套 overlay 对打

## CustomSidebarIdentity

默认关闭。替换侧栏头像和显示名，**留空则保持官方**。

- 官方头像 `img` 走 src 替换 + Blink `object-position` 把官方像素甩出盒子，再用 `background-image` 画裁切结果（`content:url()` / padding-box 在活的 `<img>` 上看不见）。没有 `img` 的字母圆（Helium 常见：`.min-w-0.flex` 的第一个子节点，`h-8 w-8`，旁边是隐藏的 `.truncate` 和「Pro」）打在那张脸上：`avatarSize` 一直生效；有自定义图再用槽背景 + `::after`。粘贴后页面先用 `avatarSource`（Helium 不能 `fetch(data:)`）。不往芯片插节点、不改 `.truncate` 文本，不把套餐字当头像
- 粘贴、拖入或填 URL；圆形台拖拽平移、滚轮/滑条缩放
- `avatarSize` 放大展开侧栏的官方头像（含无 `img` 的字母圆，24–64px，默认 40），与 Bloom++ 花标对齐；折叠轨仍 32
- 可选同步账号下拉**顶栏**（不改 Settings / 退出）
- 和 NoSidebarIdentity 同时开：官方名仍隐，自定义名仍可见

## PromptQueue

默认关闭。ChatGPT 正在生成时，**Enter / Send 会把下一条提示追加进队列**，而不是按原生行为打断当前回复并立刻发出。

- 每个会话最多 8 条。再按 Enter 是追加，不会把第 1 条换成新的
- 「替换最后一条」默认关，打开也只改最新那条
- 只发出队头，而且要等当前回复结束。后面的条目要等这次新回复真正开始、再结束，才接着发
- Stop 只停止生成，**不会**自动发出队列
- Alt+Enter 或某一行的 **立即发送** 仍立刻打断
- `#bloom-pq-chip` 挂在 `document.body`、贴在输入栏上方。标题是可折叠按钮：灰色条数 + `Queued messages`（永远复数，没有箭头，没有模型按钮）。按住正文拖动，其它行会让开。没有拖拽把手。点正文用 textarea 编辑（保存 / 取消）。右轨是移出队列、编辑、立即发送。按钮悬停时提示在标题右侧
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

v1.4.105：**安装 / `@updateURL` / `@downloadURL` 改走 `userscript/Bloom.update3.user.js`。** 1.4.104 进 `main` 之后 Fastly 仍把 `Bloom.update2.user.js` 卡在 1.4.103。去重规则与 1.4.104 相同。

v1.4.104：**消息导航不再把同一条用户输入列两次。** 官方导航 / 已挂载节点 id 不同但正文相同，并进已有行。连续两条用户、中间没有回复，是重复识别。

v1.4.103：**消息导航刻度保持 1rem 间距。** 长目录不再把刻度压成 0.375rem / 3px。多出来的刻度在条里滚。悬停列表行距也拉开。

v1.4.102：**消息导航补全窗口化长对话。** 页面自己的 `num_turns=10` 不是整条主链。宿主继续要更早的窗口，直到 mapping 走到开头。官方 Prompt Navigator 带真实消息 id 的行补上缺的用户轮。工具和思考仍并进同一条 assistant。

v1.4.101：**安装 / `@updateURL` / `@downloadURL` 改走 `userscript/Bloom.update2.user.js`。** 1.4.100 进 `main` 之后 Fastly 仍把 `Bloom.update.user.js` 卡在 1.4.99。旧文件继续写。目录仍列出未挂载的轮，只排除工具 / 思考。

v1.4.100：**没挂上的轮也留在消息导航里。** 懒加载 / 虚拟化的气泡仍列出。只排除工具调用和思考（并进同一条 assistant）。

v1.4.99：**消息导航一行对应一个可见气泡。** mapping 里的工具调用、思考、隐藏系统行留在同一条 assistant 刻度里。官方 Prompt Navigator 只补标题，不把「跳到第 N 条」插进目录。

v1.4.98：**消息导航打开长对话立刻列出主链。** 长对话气泡懒加载；目录跟宿主 harvest 的 mapping（含窗口化 `conversations/{id}`）走，不跟当前挂载窗口走。`document-idle` 错过首包时宿主回填一次。官方 Prompt Navigator 只读。打开会话仍不整段滚线程。

v1.4.97：**消息导航列出还没挂到页面上的轮。** 目录跟会话记录走，不跟当前屏幕上的气泡走。点一条还没出现的消息，会滚到它加载出来。打开会话时不会把整段对话滚一遍。

v1.4.96：**消息导航的悬停目录不再被拽回底部。** 生成中滑动列表会停在你停的位置。计数仍跟着阅读位置走。只有跳转和 ↑/↓ 才把那一行滚进视野，指针在菜单上时不动。滚动条改成细条。

v1.4.95：**拖拽时拎起的是这一行本身。** 其它行滑开让位，不再多一张半透明幽灵卡。立即发送会先显示 Sending，再发出。悬停提示写明空输入框按 Enter 也会发送。

v1.4.94：**按住整行拖动，不再有拖拽把手。** 行跟着指针走，指针越过另一行中线时那一行让开。右轨只剩移出队列、编辑、立即发送。

v1.4.93：**队列卡片对齐 Grok `queued-messages-tray`。** 标题是条数加 `Queued messages`，没有箭头，也没有模型选择。正文最多两行。删除悬停是和其他图标一样的圆底，不是红色。编辑用 textarea，不再是 `contenteditable`。这一版右轨开头仍是握把。

v1.4.92：**队列拖拽能看见落点。** 仍从握把起拖，幽灵图是整行。指针在行中线以上插到前面，以下插到后面。行与行之间的缝也能松手。卡片不再用 `translateX(-50%)` 居中，避免幽灵图错位。

v1.4.91：**点队列正文就进入编辑。** 对勾保存，× 取消。按钮悬停时，提示出现在标题右侧：拖动排序、移出队列、编辑、立即发送。

v1.4.90：**队列改成 FIFO。** 再按 Enter 会追加（最多 8 条），不再把原来那条换成新的。只发队头；后面的要等这次新回复先忙起来再结束。每一行可以删、改、立即发送、拖动排序。「替换最后一条」默认关，开了也只覆盖最新一条。1.4.89 存下来的旧默认「开」会重置一次。

v1.4.89：**队列图标对齐 ChatGPT。** 删除是 Lucide `trash-2`，悬停才变 `--text-error`，轨上不写 Delete。编辑是 Lucide `pencil`，正在编辑时按钮有填充圆角底。拖拽和上箭头同一套 24 盒。卡片骨架不变。

v1.4.88：**删掉队列后再按 Enter 仍然入队。** 窗口保持到这条回复真正结束（复制 / 好评 / 差评，或成图）、你点了 Stop、或离开对话。尾部变成 Send 不算结束。编辑是预览文字上的光标，不再套一层蓝色输入框。

v1.4.87：**队列卡回到输入条上方。** 1.4.85 锚错了层，卡片画到屏幕外，Enter 像没反应。现在仍是 Grok 骨架（标题、预览行、拖拽 / 删除 / 编辑 / 发送），位置跟以前能看见的那张卡一样，贴着可见的输入条。

v1.4.86：**更新后配置还在，包括 NoShareLink / NoDictation。** 启动不再因为缺 `defaultsRev` 把这两个写成关。GM、IndexedDB、`localStorage` 里更完整的那份胜出，偏薄的出厂袋盖不住它。选完之前不落盘。

v1.4.85：**PromptQueue 改成 Grok 骨架的队列卡。** 跟输入条同宽，标题是 `1 Queued messages`，下面一行预览。图标是拖拽（只有一条，不排序）、删除、行内编辑、上箭头立即发送。不再是胶囊。

v1.4.84：**消息导航保留文件芯片下面的短文字。** `zh-cn` 这种药丸就是标签，不是 File，也不是文件名。语言码不再当成 sources 噪声。外层 attachment 不会把这颗药丸吞进芯片。芯片下没有剩余文字才回退 File。

v1.4.83：**消息导航显示文件芯片下方的正文，正在输出的助手刻度保持虚线。** 不用文件名。没有正文才显示 File。`continue` 仍保留。复制/好评/差评或成图出现之前，最后一条助手是虚线。计划句不算结束。Pro thinking、转圈，或这场生成还武装着，Stop 卸了也继续虚线。

v1.4.82：**PromptQueue 在生成中会真正排队。** 打下一句时尾部 Stop 会换成 Send，`isStreaming()` 因此当成已经结束，Enter 仍打断当前回复。现在只要这场生成还在（或助手轮仍在忙）就入队，并拦住 `beforeinput` 和 Send 的 `pointerdown`。Stop 仍不会发出队列。Alt+Enter 仍立刻打断。

v1.4.81：**消息导航纯文件轮显示芯片上的文件名，不再停在 File。** 文件名可以在普通 div 上，挨着 “File” 副标题，也可以在 `title` / `download` / `alt`。内层 `data-testid` 只有 File 不能抢先。带空格且有扩展名的名字算文件名。短用户句 `continue` 仍保留。

v1.4.80：**消息导航不再把纯文件标成 Message 1、把 Agent/工具回复标成 Image。** 文件芯片用文件名（否则 File）。助手标签用正文，不用搜索图标。底栏还是 Pro thinking 时，最后一条助手刻度保持虚线。工具行仍算在这一条里，不单独占刻度。

v1.4.79：**首页不继承刚离开的对话，点另一条 Recents 也不是同一场。** 当前对话 id 只认 `/c/{id}`。草稿页迁到对话，只迁这场 harvest 的 id。回复结束前 favicon 保持花朵旋转，不再先闪一下官方图标再变完成。

v1.4.78：**残留 Stop 不能吃掉下一条，点 Stop 也不是完成。** 宿主在新的 harvest `post-start` 上解开离开闩。ChatStateFavicons 本页点 Stop 回到空闲，完成态只在宿主确认下降沿之后才画。PromptQueue 不会因为旧 Stop 还在，就把 New chat 的第一条塞进队列。ChatListStatus 不会把离开的对话标成错误。

v1.4.77：**离开正在生成的对话，不是回复完成。** 宿主 `watchStreamingEdge` 在残留 Stop 先变 false 之前不把它当成新的一场，下降沿多等一拍，New chat 或切到别的 `/c/{id}` 会取消这次完成。ResponseNotification 在完成的 id 已不是当前对话时不响。PromptQueue 清掉 drain，不把队列发进正在离开的对话。ChatListStatus 不把那一行标完成，也不让落地页空转。BetterNavigator 不用旧 Stop 给新线程打虚线。MessageTimestamps 不把新线程最后几条盖成「刚刚」。

v1.4.76：**生成中切到 New chat，favicon 回到空闲，不是完成。** `/` 或其他真切会话画 wait（官方图标），不画 done。URL 已经翻走之后，页上还留着的 Stop / `aria-busy` 不能把新页面武装成一场新回复，要等 `isStreaming()` 先变 false。`sameStreamContext` 严格相等；`/` → `/c/{id}` 仍是 draft migrate，首条消息仍可以完成成 done。done 看当前 live key，不看离开前锁住的旧 token。

v1.4.75：**BetterNavigator 回复结束后收回虚线。** 对齐 Void++ `lookSettled`（`c91c194`）：Stop/ProStop 没了，且这一回合已经有复制/好评/差评、markdown 正文、或生成图，下一帧 paint 就把 `live` 摘掉，不等 `onFall`，也不等 SSE `post-end`。还在生成只认回合自己的 `aria-busy` / `.result-streaming`（或最后一条 assistant 仍在对空 markdown 思考），不认子孙引用/胶卷上的 `aria-busy`，也不认留下的 `<details>`。`onFall` 清掉 harvest 闩锁。新的 `post-start` 有 2 秒保持，避免新气泡还没挂上时被上一条已完成回合解除武装。

v1.4.74：**RecentTopics 改用设置弹窗底色。** 切换器原先是 `--main-surface-primary`（暗色页面画布 `#000`）加黑色投影，浮层和对话融在一起。面板改为 `--bg-primary` + `--border-xlight` + `--shadow-long`，和设置弹窗一样。选中行改 `--interactive-bg-secondary-hover`，在 `#353535` 上仍是抬升，不再打出一个 `#212121` 的洞。`#bloom-rt-host` 用 `applySchemeTokens` 抄宿主 token。

v1.4.73：**BetterNavigator 悬停标记对齐 Void++。** 去掉 You/GPT（uppercase 后的 YOU/GPT）。角色列改 `.bloom-bn-emoji` ❓/🤖。空生图标签在同一回合有 2 个以上 unique estuary `file_*` 变体时写成 `Image xN`（大预览和选中缩略图共用一个 id——不要数 img，也不要数 `#image-{turn-id}`）。`n<2` 仍是 `Image`。还是一条 tick 一回合。不要单靠 estuary 做 collect。

v1.4.72：**BetterNavigator 收进 ChatGPT 生图回合。** 生图 assistant 没有 `data-message-id` / `data-message-author-role` / `.markdown`，目录只剩 YOU。改为收集已挂载的 `section[data-testid^="conversation-turn-"][data-turn=user|assistant]`（`article` 兜底；没有 turn 再走 `[data-message-id]`）。按 `data-turn-id` 一条 tick，胶卷缩略图不拆。空生图回合标签为 `Image`。不要单靠 `estuary/content` 或 `[data-conversation-screenshot-content]`（用户上传也用）。

v1.4.71：**设置列表头补上 Void++ InfoHint。** **Bloom++** 旁加圈 i，悬停/聚焦显示原来的副标题（Toggle features…）。列表标题下不再另起一行 DialogDescription（Void 把这段放在 overlay 的 InfoHint 里）。

v1.4.70：**设置列表头按 Void++ Dialog 壳落地。** 标题仍是 **Bloom++**（不改成 Plugins，没有 ChatGPT Settings 左栏可挂）。花标留在标题旁（没有 UnplugIcon 槽）。副标题留着当 DialogDescription（没有 InfoHint），字号跟插件弹层一样（1rem / 0.8125rem）。Recent 按 `plugin.updatedAt` 新到旧排，不再走图钉顺序。

v1.4.69：**设置列表顶栏对齐 Void++。** 关闭钮改绝对定位（`right/top 1rem`），不再被 56rem 卡片甩到最右边。分类 tab 改下划线（Favorites / Recent / All / Chat / UI / Privacy / Other），不再用 ChatGPT General 的 pill。Recent 是近 7 天，时间来自构建时给每个插件目录打的 `plugin.updatedAt`（git log）。Other 只在有未打 chat/ui/privacy 标签、且非 required 的插件时出现。标题仍是 **Bloom++** + 花标 + 原来的副标题。

v1.4.68：**CustomSidebarIdentity 粘贴后 Helium 侧栏真正换脸。** 齿轮裁切台已经能显示粘贴图（`avatarSource`），侧栏仍是官方青绿「18」+「Pro」：一是 `bake()` 走 `fetch(data:image/…)`，Helium 会抛，`avatarUrl` 写不进去，页面只读 `avatarUrl`；二是 Helium 脸在 `.min-w-0.flex` 的第一个子节点（`h-8 w-8`，没有 `<img>`，经常没有 `rounded-full`），`firstClassHit` 看不到 `h-8`，「Pro」又正好 3 个字母。现在 data: 不再 fetch（`bitmap.ts`），`avatarSrc()` 回退 `avatarSource`，槽打在 `.min-w-0.flex` 的脸上（不打套餐字），`h-8`/`w-8` 也跟尺寸。

v1.4.67：**安装 / `@updateURL` / `@downloadURL` 改走 `userscript/Bloom.update.user.js`。** 1.4.66 进 `main` 之后 Fastly 仍把 `Bloom.latest.user.js` 卡在 1.4.65（`x-cache: HIT`，etag 不变），油猴提示「脚本已更新」却停在 `[20260921] v1.4.65`。和 1.4.35 / 1.4.36 同一类问题。`Bloom.latest.user.js` / `Bloom.user.js` 仍会写一份。发布页下载作备用。不要去掉日期前缀（光写 `1.4.67` 会被判比 `[20260921] v1.4.65` 旧）。

v1.4.66：**CustomSidebarIdentity 用自定义图真正盖住官方脸。** Helium 字母圆自带青绿底和「18」；1.4.65 只拉大槽、只画 `::after`，官方圆还能露出来。现在槽自己的 `background-image` 和 `::after` 都画裁切图，官方子节点 `visibility:hidden`。替换测试用附件表情图（白脸 + 青眼睛，不是纯色块）。`img` 仍是 src 替换 + `object-position`。paint 字符串在 `paint.ts`。

v1.4.65：**CustomSidebarIdentity 官方字母圆跟 Bloom++ 对齐。** Helium / 当前 chatgpt.com 的账号脸经常是 1–3 个字的色圆（没有 `<img>`，也不一定有 `rounded-full`）。1.4.64 只给 `img` / `[data-bloom-csi-slot]` 设尺寸，而且要 `getBoundingClientRect` 先落到 16–80px 才打槽，所以官方「18」还是原生小圆、Bloom++ 花标仍是 32。现在槽永远打在 `.min-w-0` 旁边的脸容器（或 `size-6`/`size-8` / 字母节点）上，没自定义图也走 `avatarSize`，`pinRail` 跟 `[data-bloom-csi-slot]`。自定义图仍用槽 `::after`；`img` 仍是 src 替换 + `object-position`。

v1.4.64：**CustomSidebarIdentity 头像在 Blink 里可见。** 1.4.63 的 src 替换 + padding-box 仍被 replaced element 的 `src` 盖住。改为 `object-position` 把官方图甩出盒子，让 `background-image` 露出裁切结果，并继续 Void++ `paintImg` src 替换（清 `srcset`/`sizes`/`<source>`）。字母圆 / 外包圆用非 replaced 节点的 `::after`。观察 `findSidebarHost()` 的 childList（pinRail 口袋），启动时 rAF 寻找芯片。裁切缩放沿用 1.4.62。

v1.4.63：**CustomSidebarIdentity 侧栏头像真正替换。** 给活的 `<img>` 写 `content:url()` / `background-image` 在 Blink 里看不见（replaced element 的 src 盖在上面）。改为：对官方头像 `img` 做 src 替换（Void++ `paintImg`，收窄观察），再用 padding-box CSS 保证 React 改回 src 时自定义图仍在。没有 `img` 的字母圆用 `data-bloom-csi-slot` + `::after`。裁切缩放沿用 1.4.62。

v1.4.62：**CustomSidebarIdentity 真正画到侧栏。** 往 React 芯片里插 `img`/`div` 会被 hydrateRoot 撕掉（缩放条也会被 `paintStage` 从 store 打回 100%）。页面改为纯 CSS：官方头像 `img` 用 `content`/`background-image`，名字用 `.truncate::before`。裁切缩放用内存 `pos`，只在打开/粘贴/Reset 时从 store 同步。折叠轨仍 32。

v1.4.61：**去掉列表壳 Appearance 下拉。** Bloom++ 面板不再提供 Follow host / 浅色 / 深色。壳始终复制 chatgpt.com token（`html.dark`）。blob 里旧的 `store.appearance` 忽略不读（不擦盘）。对齐 Void++ Plugins 页（没有配色行，也不做 Themes 页）。

v1.4.60：**CustomSidebarIdentity**（默认关）。替换侧栏头像和显示名，留空保持官方。齿轮页可粘贴 / 拖入 / 填 URL，圆形台拖拽裁切。叠层 `img.bloom-csi-face` 画在账号芯片内部（官方头像留在树上，`visibility:hidden`）。自定义名是 `div.bloom-csi-name`，不写 React `.truncate`。展开侧栏头像直径 24–64（默认 40），折叠轨仍 32。可选 `applyToMenu` 只改账号下拉顶栏。StreamerMode 也会模糊自定义头像/名。不观察 `html` / `body[subtree]`。

v1.4.59：**脚本更新后配置不再被重置。** GM 读到空对象 / Promise / 没有 `plugins` 时继续落到 IndexedDB 和 `localStorage`。有 GM 也会镜像写 `localStorage`。启动时不再把出厂 `enabled` 写回磁盘（卸装后会盖掉还能用的 IDB）。日常请用原地「检查更新」，不要把「卸掉再装」当常规步骤。

v1.4.58：**BetterNavigator tick 对齐 Notion-style-AI-Navigator。** 闲置 `1.25rem × 2px`，当前项 `1.75rem × 仍 2px` + 3px 辉光（不再加厚成胶囊）。行距 `1rem`（密时 `0.375rem`），圆角 `0.125rem`，取消 user/assistant 宽度差。颜色用 ChatGPT `--text-primary` 的 40%/83% `color-mix`，不灌 Notion `--nav-*`。1.4.57 的列锚、`2.5rem` 热区、中线短栈保持不变。

v1.4.57：**BetterNavigator 目录贴消息列，不贴页面滚动条。** `placeHost` 的 `right` 用内部 `--thread-content-max-width` / 消息包装（沟槽够就外挂，不够则 Void 式叠在列右缘 0.75rem）。悬停菜单 `min(18rem, 70vw)`、单层 card padding；tick 热区 `2.5rem`；`YOU`/`GPT` 不再锁死 `1.1rem`。仍挂 `document.body`，禁止给 `#thread` 加 `position:relative`。

v1.4.56：**隐藏标签页也会画流式状态。** favicon 守卫 `onCompete` 在 `document.hidden` 时同步跑（Chrome 不给后台 rAF，tab 条仍可见）。MessageTimestamps 拆掉 800ms `isStreaming` 轮询，改订 `watchStreamingEdge`。PromptQueue / BetterNavigator / ChatListStatus 用 host `isDraftMigrate`；导航在首条 `/` → `/c/{id}` 时不清大纲 labels。Recents / 导航 / 时间戳隐藏时立刻 paint。

v1.4.55：**ChatStateFavicons 跟 host 流式边沿走，隐藏标签页也会更新。** 订 `watchStreamingEdge`，上升/下降/tick 上同步 evaluate（Chrome 不给后台页调 `requestAnimationFrame`，而 ResponseNotification 默认只在隐藏时响）。首条 `/` → `/c/{id}` 走 `isDraftMigrate`，不当切会话。不再自己轮询 `isStreaming`。空闲 overlay 路径未改。

v1.4.54：**ChatStateFavicons 空闲不再拆 overlay。** `wait` 留下 `#bloom-chat-state-favicon`，href 改成官方 ChatGPT 图标 URL（同一条 link 换 href）。官方节点保持 park。`ready`↔`wait` 不再删 overlay + unpark——Chrome FaviconService 那条路径会慢一拍。只在关插件时 restore。永不删官方 link。

v1.4.53：**ChatStateFavicons 草稿变化下一帧就 evaluate。** 作曲器观察加上 `characterData`（仍不看 `class`）。在 unified-composer form 上捕获委托 `input` / `beforeinput` / `cut` / `paste` / `compositionend`，ProseMirror 换节点也不再卡在 400ms 轮询。`ready` 以真草稿 + `primedReady` 为准；Send 晚一帧变灰不再把图标留在 `wait`。仅剩 App 芯片仍算空。400ms poll 只作兜底。

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
