# Bloom++

[English](README.md) · 中文

面向 `chatgpt.com` 的 [Void++](https://github.com/0-V-linuxdo/Void) 式**插件宿主**：一条油猴脚本、可开关插件、设置钉在侧栏头像旁。

当前版本：**[v1.4.10](https://github.com/0-V-linuxdo/Bloom/releases/tag/v1.4.10)**（`userscript/Bloom.user.js`，`@version [20260902] v1.4.10`）。

v1.4.10：

| 插件 | 默认 | 说明 |
| --- | --- | --- |
| ChatStateFavicons | 开 | 标签页图标反映会话状态（streaming / done / ready / error），五种叠层样式。 |
| InputHistory | 开 | 在输入框用 ↑ / ↓ 翻看历史提示词，类似终端。 |
| NoShareLink | 关 | 隐藏对话顶栏 Share 和项目里的 Share project。纯 CSS。 |
| NoDictation | 关 | 隐藏输入栏听写（语音转文字）按钮，不隐藏 Voice。纯 CSS。 |
| NoSidebarIdentity | 开 | 隐藏侧栏头像旁的显示名，头像仍可点。纯 CSS。 |
| RecentTopics | 开 | Ctrl+` 切换最近打开的会话（标题 + 上轮预览）。 |

品牌名是 **Bloom++**，仓库名是 `Bloom`，都不含 `ChatGPT`。

## 安装

1. 安装 [Violentmonkey](https://violentmonkey.github.io/) 或 Tampermonkey。
2. 打开 [`userscript/Bloom.user.js`](https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/userscript/Bloom.user.js)。
3. 确认安装后刷新 `chatgpt.com`。
4. 左侧栏头像上方会出现 **Bloom++**。油猴菜单 **Bloom++ settings** 也会打开同一块面板（再点一次关闭）。面板永远停在页面左侧的 `document.body` 上，不会插入侧栏 DOM。插件列表是 **Void++ BaseCard** 栈（图标砖、两行描述、作者栏、齿轮 + 开关）。

若还装着旧版 Bloom++，先卸掉再从 GitHub raw 装。自动更新走同一条 GitHub raw 地址。不要用 jsDelivr `@heads/main`（缓存最多 7 天）。不要用 `github.com/.../raw/refs/heads/...`（会返回 HTML）。

设置面板**跟随 `chatgpt.com` 自己的主题**（`html.dark` 与 `--main-surface-primary`），不跟操作系统的深色模式。ChatStateFavicons 从首屏起画**白色 blossom**（PNG，深色描边，不用官方黑标）。

## NoShareLink / NoDictation

两个插件默认关闭。HostReady（晚到的岛 + 8 秒下限）之后才采用 CSS，**不**用 `MutationObserver` 扫整棵树，也**不** `querySelectorAll("button")`。

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

## 构建

```bash
npm install
npm run build
```

v1 **只出 userscript**，不打浏览器扩展包。

## 许可

[GPL-3.0-or-later](LICENSE)。宿主与插件合同来自 Void++；ChatGPT 检测来自 [Chat-State-Favicons](https://github.com/0-V-linuxdo/Chat-State-Favicons)（MIT）。旧仓保持多站点脚本集合，本次不改。
