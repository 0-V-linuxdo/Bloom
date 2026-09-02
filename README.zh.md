# Bloom++

[English](README.md) · 中文

面向 `chatgpt.com` 的 [Void++](https://github.com/0-V-linuxdo/Void) 式**插件宿主**：一条油猴脚本、可开关插件、右下角浮层按钮。

v1.1：

| 插件 | 默认 | 说明 |
| --- | --- | --- |
| ChatStateFavicons | 开 | 标签页图标反映会话状态（streaming / done / ready / error），五种叠层样式。 |
| InputHistory | 开 | 在输入框用 ↑ / ↓ 翻看历史提示词，类似终端。 |
| NoShareLink | 关 | 隐藏对话顶栏 Share 和项目里的 Share project。纯 CSS。 |
| NoDictation | 关 | 隐藏输入栏听写（语音转文字）按钮，不隐藏 Voice。纯 CSS。 |

品牌名是 **Bloom++**，仓库名是 `Bloom`，都不含 `ChatGPT`。

## 安装

1. 安装 [Violentmonkey](https://violentmonkey.github.io/) 或 Tampermonkey。
2. 打开 [`userscript/Bloom.user.js`](https://cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/userscript/Bloom.user.js)。
3. 确认安装后刷新 `chatgpt.com`。
4. 右下角可拖动的 blossom 按钮打开插件设置。

自动更新走同一条 jsDelivr 地址。GitHub `raw/refs/heads` 会返回 HTML，Tampermonkey / Violentmonkey 拉不到更新。

设置面板**跟随 `chatgpt.com` 自己的主题**（`html.dark` 与 `--main-surface-primary`），不跟操作系统的深色模式。ChatStateFavicons 在 **wait** 时不替换站点原图标，只在 streaming / done / ready / error 时叠状态。

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

## 构建

```bash
npm install
npm run build
```

v1 **只出 userscript**，不打浏览器扩展包。

## 许可

[GPL-3.0-or-later](LICENSE)。宿主与插件合同来自 Void++；ChatGPT 检测来自 [Chat-State-Favicons](https://github.com/0-V-linuxdo/Chat-State-Favicons)（MIT）。旧仓保持多站点脚本集合，本次不改。
