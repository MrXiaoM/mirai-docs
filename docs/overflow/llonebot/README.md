---
title: LLOnebot
---

::: tip
本文已默认你已经成功安装并启动 Overflow，你可以在 [官网](https://mirai.mrxiaom.top) 打包下载 Overflow + mirai-console 整合包。
:::

# 安装 LLOnebot

请参考[官方文档](https://llonebot.github.io/zh-CN/guide/getting-started)

安装完成后，从以下`选择`一个连接方式。

# 连接配置

只需要选择**一种方式**连接即可。

## 正向 WebSocket

1. 在 `QQ设置` 打开 `LLOnebot` 设置，记下 `正向 WebSocket 服务监听端口`，默认是 `3001`
2. 通常不需要配置 `Access token`，如有需求可以配置
3. 打开 Overflow 配置文件 `overflow.json`
4. 将 `ws_host` 的值设为 `ws://127.0.0.1:第一步的端口`，如 `ws://127.0.0.1:端口`
5. 如果你配置了第二步的 `Access token`，把它填进配置文件的 `token` 里面；如果没有配置，留空即可

::: tip 成功
你的配置已完成，启动 Overflow 即可，无需进行下一步配置
:::

## 反向 WebSocket

1. 打开 Overflow 配置文件 `overflow.json`
2. 将 `reversed_ws_port` 的值设为一个端口号，比如 `3002`，把它记下来
3. 通常不需要设置 `token`，如有需求可以设置
4. 在 `QQ设置` 打开 `LLOnebot` 设置，打开 `启用反向 WebSocket 服务`
5. 点击 `反向 WebSocket 监听地址` 右侧的 `添加`，输入地址 `ws://127.0.0.1:第二步的端口`，如 `ws://127.0.0.1:3002`
6. 如果你配置了第三步的 `token`，把它填进 `Access token` 里面；如果没有配置，留空即可

::: tip 成功
你的配置已完成，启动 Overflow 即可，无需进行下一步配置
:::
