# Bloom++ 功能文档

基线：Bloom++ v1.4.117（`main` @ `af4ae15`，2026-09-28）。参照：Void++ `dev`（grok.com，约 49 个插件）。

本文件是净室重写的规格：描述 Bloom++ 对用户**做什么**、**存什么**、**在哪些条件下生效**，以及 2026-09 ChatGPT 改版后宿主页面的已知结构。实现细节只在它们是用户可见行为或踩坑约束时才写进来。

---

## 1. 产品概况

| 项 | 值 |
| --- | --- |
| 名称 | Bloom++（仓库 `Bloom`，包名 `bloompp`，全局 `window.Bloom`，CSS 前缀 `bloom-`） |
| 形态 | 单个油猴脚本（Tampermonkey / Violentmonkey），GPL-3.0-or-later |
| 目标站点 | `https://chatgpt.com/*`、`https://*.chatgpt.com/*`、`https://chat.openai.com/*`，以及镜像 `free.share-ai.top`、`chatgpt.aicnm.cc` |
| 运行时机 | `@run-at document-idle`，只在顶层窗口运行（`window === window.top`） |
| 权限 | `GM_addStyle` `GM_getValue` `GM_setValue` `GM_setClipboard` `GM_registerMenuCommand` `GM_notification` `GM_xmlhttpRequest`；`@connect raw.githubusercontent.com`、`cdn.jsdelivr.net` |
| 版本号 | `@version [YYYYMMDD] vX.Y.Z`，日期前缀仅显示用；新版本必须严格大于 `main` 上已发布版本（油猴不降级） |
| 更新地址 | `@updateURL` / `@downloadURL` = `raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update4.user.js`；构建同时写 `Bloom.user.js`、`Bloom.latest.user.js`、`Bloom.update.user.js`、`Bloom.update2.user.js`、`Bloom.update3.user.js`（Fastly 缓存卡旧版时换文件名，旧文件继续写） |
| 发布 | 推到 `main` 后需要同名 tag `vX.Y.Z` 与 GitHub Release（附 `Bloom.latest.user.js`），CI `release-userscript.yml` 缺 tag 时自动补 |

与 Void++ 的关系：沿用 Void++ 的插件模型（`definePlugin`、`definePluginSettings`、PluginManager、SettingsStore、`registerStyle`、设置面板卡片布局），但 ChatGPT 没有 Grok 的 turbopack 模块，不能打补丁、不能读 Zustand store，所以 Bloom++ 全部通过 **DOM + 网络旁路（fetch 包装）** 实现。

---

## 2. 宿主层（所有插件共享的能力）

### 2.1 启动阶段

| 阶段 | 触发 | 用途 |
| --- | --- | --- |
| `Init` | 脚本执行、设置加载完成后立即 | 纯 CSS 插件（隐藏类、宽度、透明度、模糊），越早越好，避免闪一下原样 |
| `DOMContentLoaded` | DOM 就绪 | 无（ChatStateFavicons 改到 HostReady，水合前不碰 `<head>` 里的图标链接） |
| `HostReady` | React 已水合 `<body>`（读 `__reactFiber$` 标记），最长 8 秒兜底；不等 DOMContentLoaded（chatgpt.com 流式输出 HTML，实测 DOMContentLoaded 比水合晚约 2 秒、比首屏晚约 4 秒） | 所有会往 `<body>` 里插节点的插件、设置入口 |

硬约束（历史卡死教训）：
- chatgpt.com 用 `hydrateRoot(document)`。水合结束前不要往 `<body>` 里插节点；任何时候都**不要**给 `<html>` 挂子节点，水合前也不要往 `<head>` 插节点：样式走 `document.adoptedStyleSheets`（不支持时才在解析完后放 `<style>`），UI 只进 `<body>`。往 React 还没水合的元素里（或它前面）插节点，React 19 会报 #418 并把整个根改为客户端重渲染：`<html>` 上的属性被清掉（暗色先变亮再变暗），侧栏内容先出现再被重建。所以每次往宿主元素里插节点前都先查 `isHydrated(el)`，没水合就跳过，等下一次 DOM 变化再试。
- 不要删除 React 管的节点（例如官方 favicon `<link>`），React 会补回，再删再补 → 死循环卡死。
- 观察回调里不要同步改 DOM 然后又触发自己；写入必须幂等（值相同就不写），并合并到下一帧。
- 账号区的身份标记（`data-bloom-profile-*`、`data-bloom-menu-*`）只是属性，生产版 React 水合时不比对属性，所以 `<body>` 一出现就开始打标记，隐藏名字、直播模式模糊从首屏起就生效，不等 HostReady。
- 水合检测失败也必须触发 `HostReady`，默认开启的插件不能“死掉”。
- 同一页面出现第二个实例（重复安装）时替换 `window.Bloom` 并正常初始化，不能静默跳过。

### 2.2 设置存储

- 存储键 `BloomSettings`，**不能改名**。结构：`{ plugins: { [插件名]: { enabled?: boolean, ...设置项 } } }`。
- 同时写三处：`GM_setValue`、IndexedDB（库 `bloompp`，表 `kv`）、`localStorage`。
- 读取时三处都读，取“内容最丰富”的一份为主（按设置项数量和数组/对象长度打分，`enabled` 不计分），其余只补缺的键；较薄的一份里的 `enabled:false` 不能盖住较厚的一份。
- 启动过程不落盘，只有用户真正改了设置才写。
- 缺 `enabled` 时取插件的 `enabledByDefault`；不要在启动时替用户写 `enabled`。
- 旧版本残留的 `store.appearance` 忽略即可，不清理。

### 2.3 路由与会话

- 当前会话 id 只看 pathname 里的 `/c/{id}`（含 `/g/{gizmo}/c/{id}`）。`/` 和 `/g/{gizmo}`（无 `/c/`）是“草稿落地页”。
- 第一条消息发出后 URL 从 `/` 或 `/g/…` 变成 `/c/{新id}`：这是**同一次对话的迁移**，不是切会话（状态、队列、计时都要跟过去）。
- 点另一条 Recents、点 New chat：这是**真切会话**，离开时正在生成的回复不算“完成”（不响通知、不画完成图标、不发队列）。
- 新对话第一条消息：URL 先变成 `/c/local-{uuid}`（本地占位，按草稿处理），拿到真实 id 后再变成 `/c/{id}`；只有后一步才是迁移。
- 临时聊天：`?temporary-chat=true`；发出第一条后变成 `/c/{id}?temporary-chat=true`。RecentTopics 不记录临时聊天。

### 2.4 生成状态（流式）

插件共同依赖一个宿主状态机，事件：
- `rise`：本页开始生成。
- `fall`：本页生成结束，附 `userStopped`（用户点了 Stop）、`error`（网络/服务错误）、`conversationId`。
- `context`：会话上下文变化（附 prev/next，插件自行判断是迁移还是切换）。
- `tick`：周期性状态快照（隐藏标签页也要跑：Chrome 在后台不跑 rAF，后台超过约 5 分钟后普通定时器每分钟才醒一次，所以用 Worker 计时，并在页面 DOM 变化时直接重新判定）。

判定来源：
1. 网络：生成请求 `POST /backend-api/f/conversation`（旧路径 `/backend-api/conversation`）一开始即生成中；响应出错或 SSE 里有 `error` 即 `error`。`/conversation/init`、`/prepare` 不是生成。2026-09 实测：这个请求只是“接力”流（`stream_handoff`、`resume_sse_endpoint`、`subscribe_ws_topic` 等事件后 `[DONE]`，约 1.6 秒后被页面中止），真正的回复走 WebSocket，所以接力流结束或被中止都不算结束，也不算用户中止，只在 DOM 还没显示过这条回复时保持 5 秒“生成中”等 DOM 接手；短回复（如 Instant）接力流常在 DOM 结束的同时才结束，这时不再保持，否则“完成”会晚约 5 秒。
2. DOM（新版的主判据）：输入框 form 内可见的 Stop 按钮（新版 aria-label 就是 `Stop`，无 `data-testid`），回合内的 `span[role=status][aria-busy=true]`（sr-only “ChatGPT is responding”）。全局的 `aria-busy` 不能用：rail 的头像按钮常驻 `aria-busy="true"`。
3. 用户点 Stop → `userStopped`。只有点了 Stop 才算中止。

规则：离开生成中的会话不算完成；迁移（`/` → `/c/{id}`）不打断；下降沿要稳定一小段时间再确认，避免闪断误报。

### 2.5 网络旁路（harvest）

- 只包一次 `unsafeWindow.fetch`，一律 `response.clone()` 读取，绝不消费页面自己的响应体，也不改请求参数（例如不改 `num_turns`）。
- 采集：会话标题、每条消息的 `create_time`、会话主链（`mapping` 从 `current_node` 回溯到根的 user/assistant 消息）。来源：`GET /backend-api/conversation/{id}`（`mapping` + `current_node`）、窗口化的 `GET /backend-api/conversations/{id}?num_turns=`（`messages: [...]` 数组，按顺序排列）、生成 SSE。
- 不轮询 `/backend-api/conversations` 列表，不为了插件额外去拉会话详情，不要更早的分页。
- 插件订阅宿主事件，不允许自己再包 `fetch`。

### 2.6 输入框

- 读草稿：忽略 `contenteditable=false` 的芯片、提及按钮、零宽字符；只有芯片没有文字 = 空。
- 写草稿：统一的写入函数（`execCommand("insertText")` + `InputEvent`，textarea 则写 `value` 再派 `input`），任何插件都不直接写 `innerHTML`。
- 找 Send / Stop 按钮：`data-testid` 优先（`send-button`、`stop-button`、`composer-submit-button`），其次 aria-label（中英文，含新版的精确 `Send` / `Stop`），限定在输入框 form 内。

### 2.7 主题

- 跟随 chatgpt.com 自己的主题，不跟系统：`html[data-theme="dark|light"]`（2026-09 新壳）、`html.dark` / `html.light`（旧壳），再退到 `color-scheme` 计算值。
- Bloom++ 自己的面板从页面复制设计 token（新壳是 `--color-text-primary` 等 `--color-*` 前缀，旧壳是 `--text-primary`、`--main-surface-primary`、`--bg-primary`、`--border-*`），缺的用内置的官方色值兜底。
- 焦点、可见性、系统配色变化时重新取色。

---

## 3. 设置入口与设置面板（核心插件 `Settings`，必需、隐藏）

入口：
- 侧栏账号区上方一行 **Bloom++**（花形图标 + 文字），点开/关设置面板。展开侧栏和收起的窄 rail 两处都放；窄 rail 里只显示图标。rail 第一个子元素是铺满整条的 `button[aria-label="Show sidebar"]`（`absolute inset-0`），rail 入口必须 `position:relative` 叠在它上面，否则点击落到展开侧栏按钮上。
- 账号下拉菜单（点头像弹出的小菜单）第一项 **Bloom++**。
- 油猴菜单命令 “Bloom++ settings”，任何时候都能打开面板（侧栏找不到时的保底）。

面板（挂在 `document.body`，居中卡片，Void++ 设置的外观）：
- 头部：花形图标 + 标题 **Bloom++** + ⓘ 提示（悬停或键盘聚焦立即显示 “Toggle features. Some need a reload. Click the sliders icon to configure.”）+ 右上角关闭。ⓘ 和所有图标按钮的提示用 Bloom 自己的提示气泡（`data-bloom-tip`），不用浏览器 `title`（后者约 1 秒才出现）。
- 分类标签（下划线式）：Favorites / Recent / All / Chat / UI / Privacy / Other。Recent = 最近 7 天有功能性提交的插件（构建时从 git 记录盖章，跳过 chore/docs/ci/style/test/build/brand），按时间倒序；Other = 没有 chat/ui/privacy 标签的插件，没有就不显示该标签。
- 搜索框（占位 “Search N plugins...”）+ 过滤下拉 All / Enabled / Disabled。
- 插件卡片：图标块、名称、两行描述、作者页脚；右上角 ☆收藏、📌置顶（置顶的排最前）、⚙设置（有可见设置项才出现）、开关。
- 点 ⚙ 弹出独立的插件设置小窗（叠在列表上，关掉回到列表）：插件名、描述、作者、各设置项（布尔开关、滑块带数值、下拉、文本/数字输入、自定义组件），底部 Reset（确认后恢复默认）。Esc 关闭。
- 空状态文案：“No plugins match your search.” / “No favorites yet. Star a plugin to see it here.” / “No plugins updated in the last 7 days.”

存储：`plugins.Settings.pinnedPlugins: string[]`、`plugins.Settings.starredPlugins: string[]`。

---

## 4. 插件

表头说明：**默认**＝首次安装是否开启；**时机**＝启动阶段；**标签**＝分类。所有设置键都在 `plugins.<插件名>.<键>`。

### 4.1 ChatStateFavicons — 标签页图标显示对话状态

默认开｜`HostReady`｜chat, ui｜Void++ 同名

用户看到的：
| 状态 | 条件 | 图标 |
| --- | --- | --- |
| wait（空闲） | 没在生成、没有草稿、没有刚完成 | ChatGPT 官方图标 |
| rotate（生成中） | 本页正在生成（即使输入框里还有字） | 叠加样式的蓝色 |
| done（完成） | 本页刚生成完且没被用户中止；保持到用户开始输入或切会话 | 绿色 |
| ready（就绪） | 输入框里有真正的草稿文字（芯片不算），且不是刚生成完那一帧 | 橙色 |
| error（出错） | 生成以错误结束（SSE 错误、错误 toast、重试按钮） | 红色 |

- 用户点 Stop → 回 wait，不画完成。离开生成中的会话 → wait。首条消息迁移 `/`→`/c/{id}` 仍然能画 done。
- 后台标签页也要及时变化（通知响的时候图标必须已经是 done）。

设置：`style` 下拉 —— `original`（Emoji：🔄 ✔️ 👍 🚫）、`badge`（白花 + 右下角带符号的圆徽章）、`dot`（白花 + 右下角圆点）、`hole`（花本身着色）、`bg`（**默认**，圆角色块底 + 白花）。

实现约束：官方 `<link rel=icon>` 永远留在树上，只“停用”（`media="not all"`，`rel` 改名并记住原值）；Bloom 自己的 `#bloom-chat-state-favicon` 永远是最后一个 icon link；wait 时把这条 link 的 href 指向官方图标 URL（不拆 overlay，避免 Chrome 切换延迟）；彩色状态是 32×32 PNG（canvas 绘制）；插件停用时才恢复官方 link。

### 4.2 InputHistory — 输入历史

默认开｜`HostReady`｜chat｜Void++ 同名

- 在输入框里按 ↑ / ↓ 翻看以前发送过的提示词，像 shell。光标不在首行/末行时不拦截（多行编辑照常）；`Alt+↑/↓` 无论光标在哪都翻。
- 翻到历史时输入框上方显示小 HUD “3 / 42”；Esc 放弃翻看并恢复原草稿；翻回最新一条之后恢复原草稿。
- 发送（Enter、点 Send、表单提交）时记录；同一文本 2 秒内去重；重复的旧条目移到最新。
- 输入法组字中（`isComposing`）不处理。

设置：`maxEntries` 滑块 10–500（默认 100）；组件：历史管理（搜索、每页 10 条分页、展开全文、复制、删除单条、Clear all 确认）；隐藏 `entries: string[]`。

### 4.3 NoShareLink — 隐藏分享按钮

默认关｜`Init`｜ui, privacy｜Void++ 同名

CSS 为主。设置：`hideShareChat`（会话头部 Share 和用户消息操作栏的 Share prompt，默认真）、`hideShareProject`（项目页 Share，默认真）。新版项目页（`/g/g-p-…/project`）的 Share 是没有 aria-label、没有 testid 的 `button[aria-haspopup=dialog]`，只能靠文字识别：在项目页（非会话路由）上把文字恰为 Share / 分享 的这种按钮标成 `data-bloom-share="project"`，再由 CSS 隐藏；离开项目页或停用插件时清掉标记。

### 4.4 NoDictation — 隐藏听写按钮

默认关｜`Init`｜chat, ui｜Void++ 同名

纯 CSS。隐藏输入框的 Dictation（语音转文字、中文“听写”）按钮；**绝不隐藏** Voice（语音对话）按钮。设置：`hideDictationSettings`（默认真）同时隐藏 ChatGPT 设置里整行听写开关（新版是独立页面 `/settings/…`，行容器 class 含 `settings-row`；旧版设置对话框同样适用）。

### 4.5 NoSidebarIdentity — 隐藏侧栏显示名

默认开｜`Init`｜ui, privacy｜Void++ 同名

- 隐藏侧栏账号芯片里的显示名（保留占位，头像和芯片可点）。
- 设置：`hideUsername`（默认真）、`hideEmail`（隐藏 mailto，默认真）、`enlargePlan`（名称隐藏时把 Plus/Pro/Free 字号放大到 14px，默认真）、`alignPlanWithAvatar`（名称隐藏时去掉名称那一行，让套餐文字和头像垂直居中，默认假）。
- 不隐藏头像、不隐藏 Bloom++ 行，不改芯片布局。

### 4.6 CustomSidebarIdentity — 自定义侧栏头像和名字

默认关｜`HostReady`｜ui｜Void++ 同名

- 替换侧栏账号芯片的头像和显示名；字段为空则保留官方值。只影响本地显示。
- 头像来源：https 图片 URL、`data:image…`、粘贴图片、拖入/选择文件。https URL 用 `crossOrigin="anonymous"` 的 `<img>` 直接载入画布（chatgpt.com 的 CSP connect-src 会拦 `fetch`，img-src 不拦），要求图床带 CORS 头；`avatarSource` 存原 URL 或 data URL。圆形裁剪器：拖动平移、滚轮或滑块缩放（1–4×），Reset 复位裁剪，Clear 清除图片。裁剪结果烘焙成 256px PNG data URL 保存。
- 设置：`displayName`（字符串）、`avatarSize`（展开侧栏里的头像直径 24–64，默认 40；收起的 rail 固定 32，官方原生是 24）、`applyToMenu`（同时替换账号下拉菜单顶部的头像和名字，默认真）；隐藏：`avatarUrl`（烘焙结果）、`avatarSource`（原图，用于重新裁剪）、`cropX` `cropY`（0–1，默认 0.5）、`cropZoom`（默认 1）。
- 官方头像可能是 `<img>`，也可能是无图片的首字母圆（如青绿色 “18”）；两种都要盖住。
- 不改邮箱、不改套餐文字；StreamerMode 开着时自定义头像同样被模糊。

### 4.7 RecentTopics — 最近会话切换器

默认开｜`HostReady`｜chat, ui｜Void++ 同名

- 按住 `Ctrl` 再按 `` ` ``（兼容中文输入法下的 `·`、日文 `｀` 等同键位）弹出最近打开过的会话列表（Arc 式）；继续按 `` ` `` 往下选，`Shift` 反向，松开 `Ctrl` 跳转。也可 Enter 确认、Esc 取消、点击某项跳转、点外面关闭。
- 每项显示：会话标题、所属项目名（如有）、最后一轮的用户 / 助手预览（截断 140 字）。
- 列表按“最近访问”排序，当前会话排第一，打开时默认选中第二项。
- 标题来源：已缓存 → 网络采集的标题 → 侧栏链接文字 → 页面标题。离开会话、标签页隐藏时记录该会话的预览。
- 跳转优先点击侧栏里对应链接（SPA 内跳转），找不到再 `location.assign`。
- 设置：`maxRecent`（下拉 3–12，默认 5，存字符串）、`includeHome`（把 New chat 首页也算进列表，默认真）；隐藏：`visits: string[]`（`"home"` 代表首页）、`titles: {id: 标题}`、`previews: {id: {user, assistant}}`、`projects: {id: 项目名}`。
- 面板是设置卡片的外观（`--bg-primary` 底、细边框、长阴影），选中行用 hover 底色。

### 4.8 Cleaner — 清理界面

默认开｜`Init`｜ui｜Void++ 同名

纯 CSS 隐藏，每项一个开关（默认全开）：
- `hideDownloadApps`：Download apps / Get the app 入口。
- `hideDisclaimer`：输入框下方 “ChatGPT can make mistakes…” 提示。
- `hideUpgrade`：Upgrade / Get Plus / Get Pro / Try Go 等升级按钮和卡片。
- `hideLockedModels`：模型选择器里锁定、不可用的模型。
- `hideHomePromo`：首页的 GPT/应用/Codex 推广横幅。
- `hideAds`：Free 套餐的广告、赞助位。
- `hideNotices`：隐藏 GPT 页面输入框上方的 “Migrate your GPTs to plugins by December 11” 提示（form 里的 `aside`，关闭按钮是 `button[aria-label="Dismiss migration notice"]`）。只用 CSS 隐藏，不替你点关闭。

不能隐藏整个输入框区域、Voice、Share、头像、Bloom++ 行。

### 4.9 ResponseNotification — 回复完成通知

默认开｜`HostReady`｜chat｜Void++ 同名

- 本页回复正常结束时（不是用户中止、不是出错、不是离开会话）播放提示音 + 浏览器通知 “<会话标题> finished answering.”（标题 “Bloom++”，点击通知聚焦标签页）。
- 设置：`sound`（默认真）、`soundUrl`（自定义音频 URL，空则用与 Void++ 相同的默认完成音 `done1`（内嵌 MP3 data URI，Web Audio 解码，音量 0.5；1.4.117 的两音符振荡器提示音已弃用）；chatgpt.com 的 CSP media-src 会拦 `<audio>`，所以用 `GM_xmlhttpRequest`（`@connect *`）下载，再用 Web Audio 解码播放，按 URL 缓存；下载或解码失败时退回默认完成音）、组件 “Preview” 试听按钮（单独一个按钮，无说明行）、`browserNotification`（默认真；优先 `GM_notification`，否则 Web Notification，首次点击页面时请求权限）、`onlyWhenHidden`（仅在标签页隐藏时通知，默认真）。

### 4.10 PromptQueue — 生成中排队追问

默认关｜`HostReady`｜chat｜Void++ BetterQueue 对应

- 回复生成中在输入框按 Enter（或点 Send）时，不打断当前回复，而是把草稿放进队列并清空输入框；当前回复结束后自动发送队首，再等那条回复结束发下一条（每条单独发送，绝不合并）。
- 队列按会话分开，每个会话最多 8 条（满了不再清空输入框）；首条消息迁移 `/`→`/c/{id}` 时整队跟过去；真切会话时不把队列发进离开的会话。
- 用户点 Stop 不触发发送；出错不发送；输入框里有别的草稿时不覆盖。
- `Alt+Enter` 放行一次原生行为（直接打断并发送）。
- 输入框上方的队列托盘（Grok “queued-messages-tray” 骨架、ChatGPT 配色）：
  - 标题按钮 “N Queued messages”（点击折叠/展开列表）。
  - 每行显示全文（最多两行截断），右侧：Remove from queue、Edit（原地变成 textarea，Enter 保存、空内容即删除、Esc 取消）、Send now（立刻打断并发送这一条，也可在空输入框按 Enter；打断后 ChatGPT 要过一会儿才重新启用 Send，所以写入草稿后每 150ms 重试点 Send，直到草稿被发出、开始生成或约 3 秒超时）。Edit 的 Enter/Esc 在 window 捕获阶段处理，因为 ChatGPT 的 React 根会在 document 捕获阶段截停 Esc。标题按钮带 `aria-expanded`。
  - 按住行拖动（超过 6px）重新排序。
  - 按钮悬停提示显示在托盘标题行右侧。
- 设置：`replacePending`（默认假：Enter 追加；真：只替换最后一条，不丢前面的）。

### 4.11 ChatListStatus — 侧栏当前会话状态

默认关（ChatGPT 新版侧栏已原生显示当前会话的生成状态）｜`HostReady`｜chat, ui｜Void++ 同名

- 当前打开的会话正在生成时，在侧栏 Recents 里它那一行显示转圈；以错误结束时显示错误标记。其他行 ChatGPT 自己会画状态，不重复画，也不画“完成点”。
- 打开一个已结束的会话不能转圈；切走的那一行立刻回到空闲。
- 同一浏览器多个标签页之间通过 `BroadcastChannel("bloom-cls")` 同步。
- 无设置项。

### 4.12 WiderChat — 加宽对话

默认开｜`Init`｜ui｜Void++ 同名

纯 CSS：把对话内容列和输入框的最大宽度改成设置值。设置：`width` 滑块 40–96 rem（默认 64；ChatGPT 原生约 40–48 rem）。

### 4.13 ComposerOpacity — 输入框透明度

默认开｜`Init`｜ui, chat｜Void++ 同名

纯 CSS：输入框背景半透明 + 背景模糊，让对话内容透出来；同时去掉输入框区域底部的实色底板和渐变遮罩。新壳的输入框是 `form[data-chatgpt-composer]`，可见的圆角底板是其中的 `[class*="ComposerLayoutRoot"]`（CSS Modules 类名，后缀是哈希，只按前缀匹配），表单本身透明；有这个底板时只改它，没有时（旧壳）才退回旧的 Tailwind 类名（`corner-superellipse`、`bg-token-*`、`shadow-short`），免得误伤输入框里带这些类的按钮。识别输入框用 `form:has(:is(输入框选择器))`：输入框选择器里的 `form [contenteditable].ProseMirror` 直接放进 `form:has()` 会要求表单里再套一个表单，永远匹配不到。设置：`opacity` 0–100（默认 100 = 原生，不注入任何样式）、`blur` 0–40 px（默认 16，仅在不透明度 < 100 时生效）。不影响点击。

### 4.14 BetterNavigator — 对话目录

默认开｜`HostReady`｜chat, ui｜Void++ 同名（Void++ 用 Grok 原生刻度条，Bloom 自绘）

- 对话区右边缘一列短横线刻度（与 Void++ 相同：贴滚动容器内容区右缘、内缩 0.75rem，在容器顶部和输入框顶部之间垂直居中；不跟随内容列宽度，WiderChat 调宽也不会压到正文），每个回合一条（用户 ❓ / 助手 🤖）；当前阅读位置的刻度更长更亮。与 Void++ 一样只在消息结构（角色、消息 id）变化时重建刻度，流式输出时只原地更新摘要和 streaming 样式；否则每个流式片段都会重建刻度，当前刻度的宽度过渡反复重播，看起来一直在跳。
- 鼠标悬停刻度列展开目录卡片：每行 emoji + 回合摘要（最多 80 字）；顶部显示 “N / M”。
- 点击刻度或目录行跳转到该回合（近的平滑滚动，远的瞬间），跳转后给目标加一个短暂边框高亮（`jumpEffect` = border / none）。
- 焦点不在输入框时 `↑` / `↓` / `Home` / `End` 在回合间跳。跳转（键盘、点刻度或目录行）后当前标记直接落在目标上，`↑` / `↓` 从这个目标往前后走，而不是从阅读线位置算，否则短消息会被跳过（Home 后按 ↓ 曾直接到第 4 条）；用户自己滚动（滚轮、触摸、按住滚动条、翻页键）后标记重新跟随阅读位置。
- 同一回合里连续的多条助手消息（GPT 调用工具时的中间消息，ChatGPT 只显示成折叠的 “Analyzed” 步骤）合成一条，摘要和跳转目标取最后一条（真正显示的回复），与会话主链“连续助手消息只留最后一条”的规则一致。
- 长对话里 ChatGPT 只挂载视口附近的回合（虚拟列表）：目录仍列出已知的全部回合（来自网络采集的会话主链），点未挂载的回合时逐步滚动直到它挂载再定位。
- 正在生成的助手回合刻度画成虚线，结束（出现复制/点赞按钮或生成图片）后恢复实线。
- 摘要规则：用户回合取正文；带文件的用户回合取文件下面的正文，没有正文则 “File”；图片生成回合 “Image” 或 “Image ×N”；助手回合取正文，跳过 “N sources” / “Web search” / 工具行。
- 刻度样式：空闲 1.25rem × 2px，当前 1.75rem × 2px + 微光；颜色是 `--text-primary` 的 40% / 83%。目录卡片宽 `min(18rem, 70vw)`。
- 只有一轮对话也显示。
- 设置：`showAssistant`（刻度和目录里也列出助手回合，默认真；关掉后刻度、目录和 “N / M” 都只算用户消息，与 Void++ 一致）、`jumpEffect`（border 默认 / none）。

### 4.15 MessageTimestamps — 消息时间

默认开｜`HostReady`｜chat｜Void++ 同名

- 在每条消息上方显示发送时间（今天只显示时间，其余显示 “9月27日, 14:05” 这类本地化日期 + 时间，跨年带年份）。
- 时间来自 ChatGPT 自己加载的会话 JSON 里的 `create_time`；刚发出的消息先用本地当前时间。已知时间缓存在设置里（最多 1500 条），刷新后不闪。
- 已有原生 `<time>` 的消息不重复画。
- 设置：`showDate`（非今天时显示日期，默认真）、`hideOwnMessages`（不给自己的消息打时间，默认假）；隐藏 `stamps: {messageId: ms}`。

### 4.16 StreamerMode — 直播模式

默认关｜`Init`｜privacy, ui｜Void++ 同名

纯 CSS 模糊（`blur(6px)`），每项一个开关（默认全开）：
- `conversations`：侧栏 Recents 会话标题，以及 RecentTopics 切换器里的标题和预览（悬停该项时取消模糊）。
- `projects`：侧栏项目名、切换器里的项目名（悬停取消）。旧壳的项目是 `a[href*="/g/g-p-"]` 链接；新壳侧栏没有项目链接，项目行是 `div[role=button][data-app-action-sidebar-project-row]`（带 `data-app-action-sidebar-project-label`），整行模糊，悬停该行取消。项目下的会话是 `/g/g-p-…/c/…` 链接，归 `conversations` 管。
- `accountAvatar`：账号头像（含自定义头像）。
- `accountName`：账号显示名。
- `accountEmail`：账号芯片和下拉菜单里的邮箱。新壳（2026-09 实机）的账号芯片和菜单里都不显示邮箱，这一项只对旧壳生效。
- `headerTitle`：页面顶部当前会话标题。新壳顶栏没有会话标题，这一项只对旧壳生效。两项都保留，因为 ChatGPT 仍在 A/B，旧壳用户还会看到这两处。

不模糊 Bloom++ 行、Bloom++ 面板、输入框、模型选择器、Voice、Share。

### 4.17 GreetingCustomizer — 自定义首页问候语

默认关｜`HostReady`｜ui｜Void++ CustomGreeting

- 只在新对话首页（`/`）把大标题（“What can I help with?” / “有什么可以帮忙的？”等）换成自己的文案；项目页、GPT 页、会话页不动。不修改 React 节点的文字，用 CSS 覆盖显示。
- 轮换：`mode` = `refresh`（每次回到首页换一条，默认）/ `interval`（停留首页时每 `intervalSec` 秒换一条）/ `manual`（点标题换一条，有选中文字时不换）。`order` = `sequential`（默认）/ `random`（不连续重复同一条）。
- 文案管理组件：新增、编辑、删除，最多 30 条，每条最多 100 字，支持换行；列表为空时提示 “No greetings. The official heading stays.”。
- 设置：`mode`、`order`、`intervalSec`（1–3600，默认 10）；隐藏 `greetings: string[]`（默认 3 条名言）、`index`、`lastRandom`。
- 列表为空、离开首页、停用时恢复原标题。

---

## 5. 设置键总表（兼容性清单）

| 插件 | 可见设置 | 隐藏数据 |
| --- | --- | --- |
| Settings | — | `pinnedPlugins` `starredPlugins` |
| ChatStateFavicons | `style` | — |
| InputHistory | `maxEntries` | `entries` |
| NoShareLink | `hideShareChat` `hideShareProject` | — |
| NoDictation | `hideDictationSettings` | — |
| NoSidebarIdentity | `hideUsername` `hideEmail` `enlargePlan` `alignPlanWithAvatar` | — |
| CustomSidebarIdentity | `displayName` `avatarSize` `applyToMenu` | `avatarUrl` `avatarSource` `cropX` `cropY` `cropZoom` |
| RecentTopics | `maxRecent` `includeHome` | `visits` `titles` `previews` `projects` |
| Cleaner | `hideDownloadApps` `hideDisclaimer` `hideUpgrade` `hideLockedModels` `hideHomePromo` `hideAds` `hideNotices` | — |
| ResponseNotification | `sound` `soundUrl` `browserNotification` `onlyWhenHidden` | — |
| PromptQueue | `replacePending` | `queueModeRev` |
| ChatListStatus | — | — |
| WiderChat | `width` | — |
| ComposerOpacity | `opacity` `blur` | — |
| BetterNavigator | `showAssistant` `jumpEffect` | — |
| MessageTimestamps | `showDate` `hideOwnMessages` | `stamps` |
| StreamerMode | `conversations` `projects` `accountAvatar` `accountName` `accountEmail` `headerTitle` | — |
| GreetingCustomizer | `mode` `order` `intervalSec` | `greetings` `index` `lastRandom` |

---

## 6. 2026-09 ChatGPT 改版后的页面结构（已知事实）

来源：chatgpt-exporter 2026-09-20 至 09-27 的提交（在真实 chatgpt.com 上验证过），以及 Bloom 1.4.110–1.4.117 的记录。ChatGPT 在做 A/B，新旧两套壳会同时存在于不同用户，所以两套都要支持。

### 6.1 新壳（2026-09-20 起）

| 区域 | 结构 |
| --- | --- |
| 主题 | `html[data-theme="dark"|"light"]`；设计 token 改为 `--color-text-primary`、`--color-text-secondary`、`--color-token-border-default` 等 `--color-*`；侧栏行内边距 `--padding-row-x`，侧栏次级底色 `--sidebar-surface-secondary` |
| 侧栏（展开） | 滚动区 `[data-app-action-sidebar-scroll]`；账号/帮助区（footer）是滚动区或其父 `nav` 的**下一个兄弟**，里面有 `button[aria-haspopup="menu"]`（帮助菜单、账号菜单） |
| 侧栏（收起 rail） | `[data-app-navigation-rail]`，本身 `pointer-events:none`，每一行自己开 `auto`；rail 的 footer 也有 `button[aria-haspopup="menu"]` |
| 两种侧栏共存 | 展开侧栏和 rail **同时挂载**，用 `inert` 隐藏其中一个；入口要在两处各放一个 |
| 侧栏目的地 | `[data-sidebar-destination="builtin:automations"]` 等 |
| 会话链接 | `a[href*="/c/{id}"]`，GPT 内会话 `/g/{gizmo}/c/{id}` |
| 对话区 | 滚动容器 `[data-app-action-timeline-scroll]`，**反向滚动**（`scrollTop` 底部为 0，越往上越负）；对话目标 `[data-chatgpt-conversation-selection-target]` |
| 回合 | 虚拟列表，只挂载视口附近；每个回合 `[data-turn-key]`；内容 `[data-virtualized-turn-content]`（`content-visibility`） |
| 消息块 | `[data-chatgpt-search-message-ids="id1 id2 …"]`（一个块可含多条消息，最后一个 id 是用户看到的那条；块可嵌套，取最外层） |
| 历史分页 | 列表顶部有 `[role="status"]` 转圈，滚到顶才加载更早的回合 |
| 日期分隔 | `[role="separator"]`（如 “Yesterday 10:08 AM”） |
| 回合操作条 | `.turn-action-controls`；代码块复制 `[data-markdown-copy="code-block"]`；复制按钮 `[data-testid="copy-turn-action-button"]` |
| 生成图片 | `[class~="group/generated-image-preview"]`、`img[alt="Generated image"]` |
| 输入框 | `textarea[name="prompt"]` 或 `#mobile-composer-prompt`（仍可能是 ProseMirror `#prompt-textarea`） |
| 生成请求 | `POST /backend-api/f/conversation`（接力 SSE，回复走 WebSocket） |
| 回合 | 一个 `[data-turn-key]` 同时含用户和助手两条消息，各在 `[data-chatgpt-search-unit-key$=":user"|":assistant"]` 里 |
| 账号芯片 | `button[aria-haspopup=menu]`（英文 aria-label “Open profile menu”）是空的覆盖按钮，旁边的 `div.pointer-events-none` 里才是头像 img、名字、套餐；打开的菜单是按钮 `aria-controls` 指向的 `[role=menu]` |
| 首页标题 | 不可见的 `h1[aria-hidden=true]` 占位 + 可见的 `h1.inline`；取后者 |
| 发送/停止 | form 内 `button[aria-label="Send"|"Stop"]`，听写是 `Dictate` |

### 6.2 旧壳（仍在 A/B）

`#stage-slideover-sidebar` / `#stage-sidebar-tiny-bar`、`[data-testid="accounts-profile-button"]`、`#thread`、`section|article[data-testid^="conversation-turn-"][data-turn="user|assistant"]`、`[data-message-id]`、`[data-message-author-role]`、`form[data-type="unified-composer"]`、`#prompt-textarea`（ProseMirror）、`#thread-bottom-container`、`button[data-testid="send-button"|"stop-button"]`、`html.dark`、`--text-primary` / `--main-surface-primary` / `--bg-primary`。

### 6.3 仍需在真实页面确认的点

以下在改版后没有可靠来源，重写时用“新旧并集 + 结构特征”兜底，验收时逐项核对：
1. 新壳输入框的 Send / Stop 按钮 testid 和 aria-label。
2. 新壳账号芯片内部结构（头像 `<img>` 或首字母圆、名字和套餐文字的层级）。
3. 新壳首页大标题的元素和类名。
4. 新壳对话内容列的最大宽度变量（是否仍是 `--thread-content-max-width`）。
5. 新壳里 “Thinking / Working” 状态行的结构。
6. 打开会话时页面自己发的是单数 `GET /conversation/{id}` 还是窗口化 `GET /conversations/{id}?num_turns=`。

---

## 7. 1.4.117 在改版后失效的主要原因（诊断）

1. **主题**：只认 `html.dark` 和旧 token，新壳用 `data-theme` 和 `--color-*`，面板、HUD 配色错乱。
2. **对话区**：以 `#thread` / `conversation-turn` / `[data-message-id]` 为主，新壳是 `[data-turn-key]` 虚拟列表 + 反向滚动容器，BetterNavigator、MessageTimestamps、RecentTopics 预览、生成检测的“最后一个助手回合”都失准。
3. **侧栏入口**：只挂一处；新壳展开侧栏和 rail 同时挂载、一个 `inert`，入口常挂在被 `inert` 的那一边，看起来点不动。
4. **生成检测**：主要靠 400ms 轮询 DOM（Stop 按钮、`aria-busy`、Thinking 文字）加大量补丁规则；新壳 Stop 按钮会被换成 Voice/Send，导致 favicon、通知、队列、侧栏转圈一起出错。
5. **选择器堆积**：每个插件各自维护一份宿主选择器并集（数百条），新壳一变就各自漏。

重写方向：宿主结构知识集中到一个适配层；生成状态由网络请求起、DOM（Stop 按钮、回合内 status）判定持续与结束；新旧两套壳并存支持；插件只消费宿主提供的语义接口。
