---
title: Android 安装方法
description: Overflow + OpenShamrock 在 Android 下的使用教程
---

::: tip
本文已默认你已经成功安装并启动 Overflow，你可以在 [官网](https://mirai.mrxiaom.top) 打包下载 Overflow + mirai-console 整合包。
:::

::: tip 前提条件
服务器没有`虚拟化`条件，你有空闲的 Android 手机，不管有无 Root 都可使用此方法。  
即使服务器没有公网也可以使用，当然，服务器有公网会更方便。
:::

# 1.安装QQ

选择一个版本相对较低，且可以登录的 QQ，并安装。本文使用的是官方渠道的 [8.9.80.12440](https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_8.9.80_64.apk)。

安装完成后打开**登录**需要做机器人的账号即可。

QQ 版本越高检测越严，不要更新。

# 2.安装OpenShamrock

从下方选择任意一个方法进行下一步操作。

+ [Magisk+LSPosed](android-magisk-lsposed.md) 稳定可靠
+ [LSPatch 修补应用](android-lspatch.md) 简单，但已停止维护

# 3.设置内网穿透

::: tip
如果你的服务器(电脑)和手机在同一局域网环境下，**无需设置**内网穿透，地址就是 `ws://手机本地IP:5800`，如 `ws://192.168.1.24:5800`，本地IP请自行查询，通常可以在 WIFI 信息中查看。
:::

::: tip
如果你的服务器**有公网**，也可以在 Overflow 配置文件 `overflow.json` 设置 `reversed_ws_port` 为一个外部可以访问的 `端口`，然后到 OpenShamrock 设置`被动WebSocket地址` 为 `ws://公网地址:端口`，完全重启 QQ 即可，而**无需设置**内网穿透。也**无需进行第4步**。

如果你的服务器**没有公网**，也不想在**手机**设置内网穿透，也可以在**服务器**上设置内网穿透，并使用以上方法设置`被动WebSocket地址`进行连接。
:::

通常你的手机和 Overflow 不在同一局域网环境，则需要进行内网穿透。

由于方法多种多样，难以全部列举，请从以下选择一种方法进行下一步操作
+ [自建Frp服务器](android-frps) (需要公网)
+ [ChmlFrp](android-chmlfrp) (无需公网，免费，不限流量)

# 4.连接到Overflow

在上一步，我们获得了一个地址。

打开 Overflow 配置文件 `overflow.json`，将 `ws_host` 的值设置为上一步获得的地址即可。
