---
title: Android LSPatch 修补应用
description: Overflow + OpenShamrock 在无 Root 环境下的安装教程
---

本文将介绍在 Android 中使用 LSPatch 修补 QQ，并安装 OpenShamrock 的方法。

::: tip
前置操作另请参见 [上游文档](android.md)。
:::

::: warning
LSPatch 项目现无人维护，若有条件请使用 Magisk+LSPosed
:::

::: danger
避免造成损失，请勿使用来源不明的已修补APK！  
避免造成损失，请勿使用来源不明的已修补APK！  
避免造成损失，请勿使用来源不明的已修补APK！
:::

# 1.安装LSPatch

从 [LSPatch 发布页](https://github.com/LSPosed/LSPatch/releases) 下载 apk 安装并打开。

在 `管理` -> `应用` 中点击 `+`，选一个自己记得的目录放修补完成的APK，然后在 `新建修补` 点击 `选择已安装的应用程序`。

选择 `本地模式` 并直接 `开始修补`，等待修补完成后卸载原来的 QQ，安装修补后的 QQ。

::: tip
请保持 LSPatch 在后台运行。

到手机设置查看 `LSPatch` 的应用信息
+ 开启`自启动`
+ 通知管理中开启`允许通知`
+ 省电策略(如果有)改为`无限制`

不同手机的设置不同，做这一步的目的是尽可能让系统不杀死软件。
:::

# 2.安装OpenShamrock

选择一个渠道下载 OpenShamrock (下载 `-all` 的那个文件)
+ [发布版](https://github.com/whitechi73/OpenShamrock/releases)
+ [开发版](https://github.com/whitechi73/OpenShamrock/actions/workflows/build-apk.yml)

安装完毕后，**至少启动一遍** Shamrock，在 `状态` 中开启 `主动WebSocket`。

返回 LSPatch，在 `管理` -> `应用` 中点击 QQ，`模块作用域` 选择 Shamrock 并保存，彻底关闭 Shamrock 和 QQ (结束进程)。依次启动 Shamrock 和 QQ，返回 Shamrock，主页显示 `已激活` 则代表安装成功。

::: danger
修改 `状态` 中的 `接口信息` 配置需要**完全重启**QQ才生效，建议结束QQ进程后重启模拟器来使配置生效。
:::

# 完成

安装完成，请返回[上游文档](android.md)从第5步开始操作。
