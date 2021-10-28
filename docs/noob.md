---
description: 一般来说，鉴于图形界面类型的 mirai-console 不稳定，我推荐使用纯控制台版本。
---

# 用户文档

## 检查 Java

首先，你需要确保运行 `mirai` 的系统上安装有 `java`。首先我们要打开命令窗口。

如果你是 Windows 系统，同时按下键盘上的`微标`键和`R`键，通常微标键是键盘左侧 `Ctrl` 和 `Alt` 之间图案为 微软公司图标 的按键，在弹出的“运行”框中键入`cmd`，点击确定，打开的命令提示符就是命令窗口。

如果你是 Linux 系统或者 Mac 系统，请直接找到终端并打开。

在命令窗口中键入`java -version`并按下`Enter`键。若提示“不是有效的命令…”之类的消息，则代表你没有安装 java 或者环境变量未被正确配置。

如果你没有安装 java 推荐使用 64 位的 `OpenJDK` 或 `OracleJDK` 的 11 或以上版本，如果你不清楚哪个版本更好，哪个方便就用哪个，使用 `OracleJDK` 即可，安装包的下载地址如下，下载后安装即可: [Java Downloads | Oracle](https://www.oracle.com/java/technologies/downloads/#java11-windows)

如果你安装了 java 仍出现“不是有效的命令…”之类的提示，请到搜索引擎搜索关键字`jdk 环境变量配置` 搜寻相关教程

## 选择启动方式

目前要启动 `mirai-console` 有 **原始启动法** 和 **启动器启动法** 两种方法。

使用启动器 [Mirai Console Loader](https://github.com/iTXTech/mirai-console-loader) (简称 MCL) 可以实现自动更新等功能。

使用原始启动法更朴素，不需要经过启动器这一层，但是没有自动更新等功能。

一般来说推荐使用**启动器启动法**，[点击这里](noob.md#启动器启动法)直接转跳到该部分

**在 Windows 下: 所有操作都需要在关闭“隐藏已知文件类型的扩展名”后进行**

### 原始启动法

先前往 [maven 仓库](https://mvnrepository.com) 搜索并下载以下几个库，格式是`.jar`，版本要对应：

```
mirai-core-all
mirai-console
mirai-console-terminal
```

在你记得的地方新建一个文件夹 (名字随意，这里名字用 `mirai`)，并在这个文件夹内新建一个 `libraries` 文件夹，将下载的三个库复制到里面，回到 `mirai` 文件夹，新建文本文档并重命名为 `启动.bat`，鼠标右键点击它并点击`编辑`，将以下内容复制并粘贴进去，保存，然后双击打开 `启动.bat` 即可

```
@echo off
title Mirai
java -cp ./libraries/* net.mamoe.mirai.console.terminal.MiraiConsoleTerminalLoader
pause
```

### 启动器启动法

先前往 [MCL 发布地址](https://github.com/iTXTech/mirai-console-loader/releases) 下载最新版启动器，一般点击 `Assets` 下面的 `mcl-*.*.*.zip` 即可

将下载的文件解压到你记得的地方，然后双击打开文件 `mcl.cmd` (在 Linux 系统是 执行 `./mcl`，下同) 即可。

#### 出现错误

若错误提示前面部分有 `java.lang.UnsupportedClassVersionError` 字样，请确保你已安装 `jdk11`

如果已安装，那么我们需要让 mcl 使用 `jdk11` 来启动，请鼠标右键点击 `mcl.cmd`，点击`编辑`。

(这个错误处理教程仅适合 Windows，Linux 用户如果出现这个问题请先百度，无法解决再来找我)

**注意，编辑时不要打开中文输入法，避免输入了程序不认的中文标点符号！**

将第二行 `set JAVA_BINARY=java` 中结尾的 `java` 替换为你 `jdk11` 里面 `java.exe` 的绝对路径，并且需要加上英文引号。

一般 `java.exe` 路径都默认在 `C:\Program Files\Java\***\bin\java.exe`

取决于你安装 java 时填写的路径，如果你没有修改过路径就是这个，修改过就把\*\*\*以及前面的内容换成安装路径。

按照路径一个一个文件夹点进去看看有没有这个文件，有的话就填进去。

比如我的 `jdk11` 路径是 `C:\Program Files\Java\jdk-11.0.13\bin\java.exe`

修改完后的完整 `mcl.cmd` 内容如下，**不要直接复制，仅作参考**

```
@echo off
set JAVA_BINARY="C:\Program Files\Java\jdk-11.0.13\bin\java.exe"
%JAVA_BINARY% -jar mcl.jar %*
```

改好后再次双击打开文件 `mcl.cmd` 即可

## 登录

在启动 `mirai` 之后，你将进行最麻烦的操作，就是登录。

**登录是 `mirai` 最大的门槛**，过了这道坎后面的路就会轻松得多 (对技术力充足的人来说)

在成功打开 `mirai-console` 之后，在控制台执行命令 `login QQ号 密码`

通常第一次登录都会提示登录失败，或者提示需要滑动验证或设备锁验证，如果你在执行命令后有提示 `Login successfully`，**恭喜你，这个部分没你什么事了**，你可以去看下一部分的内容了。

登录失败一般有以下几种原因 (复制自官方文档 [Bots.md#常见登录失败原因](https://github.com/mamoe/mirai/blob/dev/docs/Bots.md#%E5%B8%B8%E8%A7%81%E7%99%BB%E5%BD%95%E5%A4%B1%E8%B4%A5%E5%8E%9F%E5%9B%A0)，请以官方文档为准)

| 错误信息     | 可能的原因     | 可能的解决方案                                                                                                   |
| -------- | --------- | --------------------------------------------------------------------------------------------------------- |
| 当前版本过低   | 密码错误      | 检查密码或修改密码到 16 位以内                                                                                         |
| 当前上网环境异常 | 设备锁       | 开启或关闭设备锁 (登录保护)                                                                                           |
| 禁止登录     | 需要处理滑块验证码 | [project-mirai/mirai-login-solver-selenium](https://github.com/project-mirai/mirai-login-solver-selenium) |
| 密码错误     | 密码错误或过长   | 手机协议最大支持 16 位密码 ([#993](https://github.com/mamoe/mirai/discussions/993)). 在官方 PC 客户端登录后修改密码               |

有关无法登录的解决方案，[可以前往论坛查看](https://mirai.mamoe.net/topic/223)。

目前要处理滑动验证码，请确保你有一台已登录移动端QQ并且可扫码的设备和一台**安卓手机**，当然**只有一台安卓手机也是可以的**，在该安卓手机上下载并安装 [mzdluo123/MiraiAndroid](https://github.com/mzdluo123/MiraiAndroid) (2021/9/6更新的下载地址: [https://install.appcenter.ms/users/mzdluo123/apps/miraiandroid/distribution\_groups/release](https://install.appcenter.ms/users/mzdluo123/apps/miraiandroid/distribution\_groups/release))

在 `MiraiAndroid` 上使用屏幕右上角的自动登录来进行登录，并点击通知栏提示需要验证的通知来进行滑动验证和扫码通过设备锁验证

在 `MiraiAndroid` 提示 `Login successfully` 之后，点击左上角的三条杠打开**侧边栏菜单**，点击**工具**，在**选择一个bot**处选中机器人QQ号，点击**导出DEVICE.JSON**并想办法把导出的文件发到电脑上。

接着回到 `mirai-console` 所在文件夹(上文“选择启动方式”中提到的 `mirai` 文件夹或者mcl解压路径)

如果文件夹里有 `device.json`1 就把手机发过来的 `device.json` 覆盖过去。(注1: 在更旧版本的 `mirai` 中，`device.json` 也叫做 `deviceInfo.json`)

如果文件夹里没有 `device.json` 而有 `bots` 文件夹，那就打开 `bots` 文件夹里以QQ号命名的文件夹，把手机发过来的 `device.json` 覆盖过去。

在替换好文件之后，再次打开 `mirai-console`，执行命令 `login QQ号 密码` 如果出现 `Login successfully` 就算成功了，你可以进入下一步了。

如果还是出现错误，请根据前文描述来排查问题。实在无法解决可以先去[论坛](https://mirai.mamoe.net)问问。

## 实现功能

本部分更偏向于用户，如果你是开发者请去阅读[开发文档](dev.md)。

在登录QQ到 `mirai` 之后，你就可以到论坛搜寻现成的插件来享受`mirai`带来的便利了

论坛里的插件发布板块：https://mirai.mamoe.net/category/11

除了论坛以外，不要忘记还有互联网中**四处散落的资源**，它们有些可能还**没有被整合**，等着你去探索。

顺便一提，[iTXTech/mirai-native](https://github.com/iTXTech/mirai-native) 可以加载酷Q插件

> 与**大部分**`酷Q`插件兼容，**不支持**`CPK`和解包的`DLL`，需获取`DLL`和`JSON`原文件，`JSON`文件**不支持**注释。

## 结尾

至此，用户文档已到结尾，虽然不编程也能玩 `mirai`，但是具有局限性。

如果你对使用 `mirai` 编写一个机器人感兴趣并具有极客精神，这或许是你学习编程的一个好机会，选择好你想要学的语言，从菜鸟教程开始吧！

[Kotlin 教程 | 菜鸟教程](https://www.runoob.com/kotlin/kotlin-tutorial.html) **(推荐)**

[Java 教程 | 菜鸟教程](https://www.runoob.com/java/java-tutorial.html)
