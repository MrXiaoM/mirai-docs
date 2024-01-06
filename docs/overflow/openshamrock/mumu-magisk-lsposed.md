---
title: Mumu Magisk+LSPosed
description: Overflow + OpenShamrock 在有 Root 环境下的安装教程
---

本文将介绍在 Mumu 模拟器中安装 Magisk 和 LSPosed，并安装 OpenShamrock 的方法。

::: tip
前置操作另请参见 [上游文档](mumu.md)。
:::

# 1.获取权限

打开 Mumu 设置
+ 在 `磁盘设置` 开启 `可写系统盘`
+ 在 `其它设置` 开启 `手机Root权限`
保存设置并重启模拟器。

# 2.安装Magisk

根据个人喜好从下方选择一个版本
+ 原版面具 [Magisk](https://github.com/topjohnwu/Magisk/releases)
+ 狐狸面具 [Kitsune Magisk (Magisk Delta)](https://github.com/HuskyDG/magisk-files/releases)

下载其 APK，在 Mumu 安装并打开，请求 Root 权限时选择**始终允许**。

第一次授权 Root 状态不会刷新，退出并重新打开 Magisk，依次点击
+ 安装
+ 直接安装 (直接修改/system)
+ 开始
  
等待安装结束后，**不要点击**重启，手动关闭模拟器再打开模拟器。

再次打开 Magisk，如果 `当前` **没有**显示 `无法获取`，代表 Magisk 安装成功。

模拟器自带 Root 和 Magisk 的 Root 可能会有冲突，若出现相关提示，忽略即可。

点击右上角设置，开启 `Zygisk`，其它设置根据个人喜好修改。

# 3.安装LSPosed

到 [LSPosed 发布页](https://github.com/LSPosed/LSPosed/releases) 下载 `zygisk-release.zip` 结尾的文件，复制到 `此电脑/文档/Mumu共享文件夹` 中。

打开 Magisk，在 `模块` 点击 `从本地安装`，在左上角菜单点击 `下载` **下面那个**设备名选项 (在笔者的模拟器中是 `NCO-AL00`，不保证在别的版本中一致。)。

点击 `$Mumu12Shared`，选择刚刚复制进去的文件，等待安装。

同样的，安装结束后**不要点击**重启，手动关闭模拟器再打开模拟器。

# 4.安装OpenShamrock

选择一个渠道下载 OpenShamrock (下载 `-all` 的那个文件)
+ [发布版](https://github.com/whitechi73/OpenShamrock/releases)
+ [开发版](https://github.com/whitechi73/OpenShamrock/actions/workflows/build-apk.yml)

安装完毕后，**至少启动一遍** Shamrock，在 `状态` 中开启 `主动WebSocket`。

然后使用[上游文档](mumu.md)第3步的方法连接ADB，并在命令窗口执行以下命令打开 LSPosed。

```shell
adb shell am start -a android.intent.action.MAIN -c org.lsposed.manager.LAUNCH_MANAGER -n com.android.shell/.BugreportWarningActivity
```
(需要这么做的原因: [LSPosed discussions#2729](https://github.com/orgs/LSPosed/discussions/2729))

在 `模块` 处启用 `Shamrock`，然后关闭再打开模拟器。启动QQ，返回 Shamrock，主页显示 `已激活` 则代表安装成功。

::: danger
修改 `状态` 中的 `接口信息` 配置需要**完全重启**QQ才生效，建议结束QQ进程或重启模拟器来使配置生效。
:::

# 完成

安装完成，请返回[上游文档](mumu.md)从第5步开始操作。
