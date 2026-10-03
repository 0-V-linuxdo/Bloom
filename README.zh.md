# Bloom++

[English](README.md) · 中文

面向 `chatgpt.com` 的 [Void++](https://github.com/0-V-linuxdo/Void) 式**插件宿主**：一条油猴脚本、可开关插件、设置入口在账号菜单里。

**2.0.0** 是针对 ChatGPT 2026-09 改版的净室重写，同时支持新版界面和仍在 A/B 的旧版界面。重写所依据的功能文档见 [docs/FEATURES.zh.md](docs/FEATURES.zh.md)。1.4.x 的设置全部保留（同一个 `BloomSettings` 存储和同样的键）。

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
| Cleaner | 开 | 隐藏 Download apps、「也会犯错」提示、升级入口、锁定模型、首页促销、Free 广告，以及 Team 顶部 “Turn on auto-reload” 横幅。纯 CSS。 |
| ResponseNotification | 开 | 回复结束时响铃 / 浏览器通知。默认只在标签隐藏时通知。 |
| PromptQueue | 关 | 生成中排队后续提示。Enter 追加；队头在本轮结束后再发。每条记住入队时的模型，切会话保持选择器，刷新后灌回未发送的队列。 |
| ChatListStatus | 关 | 当前打开的会话生成中时在 Recents 行转圈，出错时显示错误标记；多个标签页同步。 |
| WiderChat | 开 | 加宽对话和输入栏（滑块 40–96 rem，默认 64）。纯 CSS。 |
| ComposerOpacity | 开 | 输入栏背景透明度和模糊，让对话内容能透过输入条。纯 CSS。 |
| BetterNavigator | 开 | 当前对话的 Notion 式目录，包含 ChatGPT 还没挂上的轮。悬停 tick，点击或 ↑/↓ 跳转。正在输出的回复用虚线 tick 标出。 |
| MessageTimestamps | 开 | 每条消息显示发送时间，读 ChatGPT 已有的会话 JSON。 |
| StreamerMode | 关 | 模糊 Recents 标题、顶栏会话名、项目名和账号芯片。纯 CSS。悬停 Recents / 切换器可看一眼。 |
| SidebarIdentityOpacity | 开 | 降低侧栏左下角账号区的不透明度（默认 50%）。头像（包括自定义头像）默认不变淡，打开 fadeAvatar 才一起淡化。指针移上去立即恢复。纯 CSS。 |
| GreetingCustomizer | 关 | 用自己的文案替换首页问候语。可按访问、定时或点击轮播。项目首页的输入框用第一句。 |

品牌名是 **Bloom++**，仓库名是 `Bloom`，都不含 `ChatGPT`。

## 安装

1. 安装 [Violentmonkey](https://violentmonkey.github.io/) 或 Tampermonkey。
2. 打开 [`userscript/Bloom.update5.user.js`](https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update5.user.js)。
3. 确认安装后刷新 `chatgpt.com`。
4. 点左侧栏头像，账号菜单第一项就是 **Bloom++**。油猴菜单 **Bloom++ settings** 也会打开同一块面板（再点一次关闭）。面板以居中对话框打开。和 Void++ 一样，侧栏平时没有按钮；指针移到头像上时，账号行正上方会立即出现 **Bloom++**（展开侧栏和收起的窄栏都是）。可以按住它左右拖动（默认靠右），**Settings → Reset position** 恢复原位。在 **Settings → showSidebarEntry** 打开后一直显示。

优先用油猴的**检查更新**（同一脚本 UUID，配置还在）。自动更新走 `Bloom.update5.user.js`（`raw.githubusercontent.com/.../refs/heads/main/...`）。如果仪表盘是红字「获取更新信息失败」，或提示「脚本已更新」但 `@version` 还是旧的，那是 Fastly 把 `Bloom.update4.user.js` / `Bloom.update3.user.js` / `Bloom.update2.user.js` / `Bloom.update.user.js` / `Bloom.latest.user.js` / `Bloom.user.js` 卡在旧稿或不可读：改点 `Bloom.update5.user.js` raw 或 [`releases/latest/download/Bloom.update5.user.js`](https://github.com/0-V-linuxdo/Bloom/releases/latest/download/Bloom.update5.user.js)。只有同时装着两条 Bloom++ 时才卸旧的。卸载会清掉油猴 GM 存储；Bloom++ 会尝试从当前站点的 IndexedDB / `localStorage` 救回。不要用 `.../Bloom/main/userscript/Bloom.user.js`、`.../refs/heads/main/userscript/Bloom.user.js`、`Bloom.latest.user.js`、`Bloom.update.user.js`、`Bloom.update2.user.js`、`Bloom.update3.user.js` 或 `Bloom.update4.user.js`（Fastly 会卡住旧脚本）。不要用 jsDelivr `@heads/main`（缓存最多 7 天）。不要用 `github.com/.../raw/refs/heads/...`（会返回 HTML）。

设置面板**跟随 `chatgpt.com` 自己的主题**。ChatStateFavicons **空闲时保持官方 ChatGPT 标签页图标**；只在 streaming / done / ready / error 时叠白色 blossom PNG（深色描边）。

## 构建与测试

```bash
bun install
bun run build        # 生成 userscript/Bloom.user.js 及各更新副本
bun run tsc
bun run lint
bun run lint:styles
bun test             # 新旧两套 ChatGPT 页面结构的单元测试
bun run e2e          # 用 Chromium 跑本地模拟的 ChatGPT 页面
```

## 结构

- `src/api`：设置存储（`BloomSettings` 同时存 GM、IndexedDB、`localStorage`，读取时取内容最全的一份）和插件管理器。
- `src/host`：Bloom++ 对 chatgpt.com 的全部了解都集中在这里：新旧两套界面的选择器、路由、输入框、对话区、侧栏，以及唯一一处 `fetch` 旁路，只读页面自己的会话和回复流响应。`generation.ts` 把这些变成开始/结束事件，供图标、通知、排队、侧栏状态等插件共用。
- `src/components`：小型 DOM 控件和图标，配色取自 ChatGPT 自己的 CSS 变量。
- `src/plugins`：每个插件一个目录，和 Void++ 一样用 `definePlugin`、`definePluginSettings` 编写。

脚本在 `document-start` 运行，这样 `fetch` 旁路能看到页面的第一个会话请求。早期只往 `<head>` 加 `<style>`，等 ChatGPT 外壳挂载并空闲后才动 `<body>`。

## 许可

[GPL-3.0-or-later](LICENSE)。插件模型来自 [Void++](https://github.com/0-V-linuxdo/Void)（GPL-3.0-or-later），图标状态参照 [Chat-State-Favicons](https://github.com/0-V-linuxdo/Chat-State-Favicons)（MIT）。
