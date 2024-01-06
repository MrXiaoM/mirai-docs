---
title: Android Magisk+LSPosed
description: Overflow + OpenShamrock 在有 Root 环境下的安装教程
---

本文将介绍在 Android 中安装 Magisk 和 LSPosed，并安装 OpenShamrock 的方法。

::: tip
前置操作另请参见 [上游文档](android.md)。
:::

::: danger 警告
刷框架有风险，操作需谨慎。
:::

# 1.安装Magisk

根据个人喜好从下方选择一个版本
+ 原版面具 [Magisk](https://github.com/topjohnwu/Magisk/releases)
+ 狐狸面具 [Kitsune Magisk (Magisk Delta)](https://github.com/HuskyDG/magisk-files/releases)

下载其 APK 并打开。

有多种安装方式，由于 Android 高版本的权限极其可怜，仅推荐使用`选择并修补一个文件`。这个方法需要获取刷机包中的 boot 分区镜像，修补后，通过 fastboot 刷入。**不同型号的手机有不同的教程**，请通过搜索引擎搜索相关教程。

::: danger 警告
刷入 Magisk 有可能导致设备变砖，请提前做好相关备灾工作。
:::

安装完成后打开 Magisk，如果 `当前` **没有**显示 `无法获取`，代表 Magisk 安装成功。

点击右上角设置，开启 `Zygisk`，其它设置根据个人喜好修改。
# 3.安装LSPosed

到 [LSPosed 发布页](https://github.com/LSPosed/LSPosed/releases) 下载 `zygisk-release.zip` 结尾的文件。

打开 Magisk，在 `模块` 点击 `从本地安装`，选择刚刚下载的那个文件，等待安装，安装完成后重启。

# 4.安装OpenShamrock

选择一个渠道下载 OpenShamrock (下载 `-all` 的那个文件)
+ [发布版](https://github.com/whitechi73/OpenShamrock/releases)
+ [开发版](https://github.com/whitechi73/OpenShamrock/actions/workflows/build-apk.yml)

安装完毕后，**至少启动一遍** Shamrock，在 `状态` 中开启 `主动WebSocket`。

打开 LSPosed，在 `模块` 处启用 `Shamrock`，然后重启手机。

启动QQ，然后返回 Shamrock，主页显示 `已激活` 则代表安装成功。

::: danger
修改 `状态` 中的 `接口信息` 配置需要**完全重启**QQ才生效，建议结束QQ进程或重启手机来使配置生效。
:::

# 完成

安装完成，请返回[上游文档](mumu.md)从第5步开始操作。
