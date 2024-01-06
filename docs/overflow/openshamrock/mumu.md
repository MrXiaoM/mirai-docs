---
title: Mumu 安装方法
description: Overflow + OpenShamrock 在 Windows 下的使用教程
---

::: tip 前提条件
如果你的 Windows 服务器支持`虚拟化` (右键任务栏 -> 任务管理器 -> 性能 -> CPU -> 虚拟化: 已启用)，且性能足以运行一个模拟器 (CPU性能富余、空闲运行内存大于4GB)，则可以使用该方法安装 OpenShamrock 并连接 Overflow。
:::

# 1.安装模拟器

正常安装 [Mumu 模拟器](https://mumu.163.com/update/)，本文使用版本是 Mumu 12 V3.7.3 (2511)

# 2.安装QQ

选择一个版本相对较低，且可以登录的 QQ，并安装。本文使用的是官方渠道的 [8.9.80.12440](https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_8.9.80_64.apk)。

安装完成后打开**登录**需要做机器人的账号即可。

QQ 版本越高检测越严，不要更新。

# 3.连接ADB

另请参见 [官方教程](https://mumu.163.com/help/20230214/35047_1073151.html)。

简单来说，就是先在右上角菜单点击`问题诊断`，在差不多最下面的`网络信息`中找到`ADB调试端口`，一般是`16384`，有冲突或者多开时端口不一样。

然后打开 Mumu 安装路径，默认的是 `D:\Program Files\Netease\MuMuPlayer-12.0\shell`，打开后编辑地址栏，输入 `cmd` 并回车。

在命令窗口中输入命令 
```shell
adb connect 127.0.0.1:调试端口
```
即可连接到 ADB。

执行完不要关闭命令窗口，先留着，后面要用。

# 4.安装OpenShamrock

从下方选择任意一个方法进行下一步操作。

+ [Magisk+LSPosed](mumu-magisk-lsposed.md) 稳定可靠
+ [LSPatch 修补应用](mumu-lspatch.md) 简单，但已停止维护

::: danger
之后每次启动模拟器，都**必须**要
+ 执行上一步连接ADB
+ 执行下一步设置端口转发
:::

# 5.设置端口转发

在安装完 OpenShamrock 后，需要将模拟器的端口转发到本机，否则本机的程序无法访问模拟器中 OpenShamrock 放出的端口。

首先按照上面的`第3步`连接到ADB，然后再在命令窗口输入命令
```shell
adb forward tcp:5800 tcp:5800
```
即可配置端口转发。

> 具体用法: (将手机端口转发到电脑端口)
> ```shell
> adb forward tcp:手机端口 tcp:电脑端口
> ```
> 假如服务器(电脑)那边的 5800 端口已经被占用了，你可以
> ```shell
> adb forward tcp:5800 tcp:5801
> ```
>
> 如果需要使用 [overflow-shamrock-ext](https://github.com/project-tRNA/overflow-shamrock-ext)，请把 `5700` 端口也配置转发。

# 6.连接到Overflow

在 Overflow 配置文件 `overflow.json` 中，设置 `ws_host` 的值为 `ws://127.0.0.1:端口` 即可。

端口为上一步转发到电脑的端口，如 `ws://127.0.0.1:5800` 或者具体用法例子里的 `ws://127.0.0.1:5801`。
