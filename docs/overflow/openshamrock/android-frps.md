---
title: Android 自建Frp服务器
description: Overflow + OpenShamrock 在 Android 下自建 Frp 服务器进行内网穿透
---

::: tip 前提条件
此方法需要服务器有公网IP，且至少有2个公网可访问端口才可使用。
:::

本文将介绍在 Android 中使用 Frps 自建服务器，并内网穿透 OpenShamrock 的主动 WebSocket 端口。

::: tip
前置操作另请参见 [上游文档](android.md)。
:::

# 1.下载Frp

首先下载 [frp](https://github.com/fatedier/frp/releases)，在服务器上解压到你记得的地方。根据服务器系统下载所需的版本。

编辑 `frps.ini`，将 `bind_port` 的值改为公网可访问的端口，默认是 `7000`

# 2.下载Frpc Android

到 [frpc_android 发布页面](https://github.com/mainfunx/frpc_android/releases) 下载 apk 安装并打开，点击右上角 `+`，`新建配置文件`，删除文本框中所有内容，复制以下内容到文本框：
```ini
[common]
server_addr = 服务器公网IP
server_port = 上一步的端口

[OpenShamrock]
type = tcp
local_ip = 127.0.0.1
local_port = 5700
remote_port = 远程端口
```
将上面的内容的中文替换为相应的值即可。如果没有被占用，远程端口也可以是 `5700`。

使用以上填写的内容，按照以下格式拼接一个地址，留着备用：
```
ws://服务器公网IP:远程端口
```

并点击右上角**右数第一个按钮**保存配置。

填写文件名 `OpenShamrock` (或其它你喜欢的名字)，确定，在配置文件列表点击 `▶` 启动即可。若提示是否允许通知，请始终允许。

到手机设置查看 `FRPC_ANDROID` 的应用信息
+ 开启`自启动`
+ 通知管理中开启`允许通知`
+ 省电策略(如果有)改为`无限制`

不同手机的设置不同，做这一步的目的是尽可能让系统不杀死软件，避免无故断连。

# 完成

安装完成，请返回[上游文档](android.md)从第4步开始操作。

本文第2步**让你备用的地址**即上游文档中第4步**需要的地址**。
