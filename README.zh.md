# Bloom++

[English](README.md) · 中文

面向 `chatgpt.com` 的 [Void++](https://github.com/0-V-linuxdo/Void) 式**插件宿主**：一条油猴脚本、可开关插件、右下角浮层按钮。

v1.1：

| 插件 | 默认 | 说明 |
| --- | --- | --- |
| ChatStateFavicons | 开 | 标签页图标反映会话状态（streaming / done / ready / error），五种叠层样式。 |
| InputHistory | 开 | 在输入框用 ↑ / ↓ 翻看历史提示词，类似终端。 |
| NoShareLink | 开 | 隐藏对话顶栏 Share 和项目里的 Share project。纯 CSS。 |
| NoDictation | 开 | 隐藏输入栏听写（语音转文字）按钮，不隐藏 Voice。纯 CSS。 |

品牌名是 **Bloom++**，仓库名是 `Bloom`，都不含 `ChatGPT`。

## 安装

1. 安装 [Violentmonkey](https://violentmonkey.github.io/) 或 Tampermonkey。
2. 打开 [`userscript/Bloom.user.js`](https://cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/userscript/Bloom.user.js)。
3. 确认安装后刷新 `chatgpt.com`。
4. 右下角可拖动的 blossom 按钮打开插件设置。

自动更新走同一条 jsDelivr 地址。GitHub `raw/refs/heads` 会返回 HTML，Tampermonkey / Violentmonkey 拉不到更新。

外观（自动 / 浅色 / 深色）在设置面板顶部。**自动跟随 `chatgpt.com` 自己的主题**（`html.dark` 与 `--main-surface-primary`），不跟操作系统的深色模式。ChatStateFavicons 在 **wait** 时不替换站点原图标，只在 streaming / done / ready / error 时叠状态。

## NoShareLink / NoDictation

两个插件在 `document-start` 只排队 CSS，真正插入 `document.head` 放到 HostReady，**不**用 `MutationObserver` 扫整棵树，也**不** `querySelectorAll("button")`。

v1.1.2：样式只挂到 `document.head`，没有 head 就等，禁止挂到 `<html>`。

v1.1.3：HostReady 等到 `window` load 再短暂停一下（不再把 `DOMContentLoaded` 当成水合完成）。`#bloom-root` 和 InputHistory HUD 只挂到 `document.body`。

v1.1.4：HostReady 从脚本启动起至少约 8 秒才往 body 挂节点。InputHistory 改到 HostReady。若 React 拆掉 `#bloom-root` 会重挂一次。document-start 仍往 head 插样式，页面能画出来但点不动、输不了字。

v1.1.5：Init 不再往 DOM 插节点，也不观察 `<html>`。样式等检测到 React host 后再进 `head`（8 秒是上限不是下限）。取消 remount。ChatStateFavicons 不再观察整棵 `document.body`。`#bloom-root` 为 `pointer-events: none`，只给花瓣按钮 `auto`。检测不到可交互宿主就不自动往 body 挂节点；Violentmonkey 菜单仍可打开设置。

## 构建

```bash
npm install
npm run build
```

v1 **只出 userscript**，不打浏览器扩展包。

## 许可

[GPL-3.0-or-later](LICENSE)。宿主与插件合同来自 Void++；ChatGPT 检测来自 [Chat-State-Favicons](https://github.com/0-V-linuxdo/Chat-State-Favicons)（MIT）。旧仓保持多站点脚本集合，本次不改。
