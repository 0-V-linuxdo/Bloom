# Bloom++

[English](README.md) · 中文

面向 `chatgpt.com` 的 [Void++](https://github.com/0-V-linuxdo/Void) 式**插件宿主**：一条油猴脚本、可开关插件、右下角浮层按钮。

第一版：

| 插件 | 默认 | 说明 |
| --- | --- | --- |
| ChatStateFavicons | 开 | 标签页图标反映会话状态（streaming / done / ready / error），五种叠层样式。 |
| InputHistory | 开 | 在输入框用 ↑ / ↓ 翻看历史提示词，类似终端。 |

品牌名是 **Bloom++**，仓库名是 `Bloom`，都不含 `ChatGPT`。

## 安装

1. 安装 [Violentmonkey](https://violentmonkey.github.io/) 或 Tampermonkey。
2. 打开 [`userscript/Bloom.user.js`](https://github.com/0-V-linuxdo/Bloom/raw/refs/heads/main/userscript/Bloom.user.js)。
3. 确认安装后刷新 `chatgpt.com`。
4. 右下角可拖动的 blossom 按钮打开插件设置。

外观（自动 / 浅色 / 深色）在设置面板顶部。**自动跟随 `chatgpt.com` 自己的主题**（`html.dark` 与 `--main-surface-primary`），不跟操作系统的深色模式。ChatStateFavicons 在 **wait** 时不替换站点原图标，只在 streaming / done / ready / error 时叠状态。

## 构建

```bash
npm install
npm run build
```

v1 **只出 userscript**，不打浏览器扩展包。

## 许可

[GPL-3.0-or-later](LICENSE)。宿主与插件合同来自 Void++；ChatGPT 检测来自 [Chat-State-Favicons](https://github.com/0-V-linuxdo/Chat-State-Favicons)（MIT）。旧仓保持多站点脚本集合，本次不改。
