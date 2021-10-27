## 用户文档

一般来说，鉴于图形界面类型的 `mirai-console` 不稳定，我推荐使用纯控制台版本。

### 检查 Java

首先，你需要确保运行 `mirai` 的系统上安装有  `java`。首先我们要打开命令窗口。

如果你是 Windows 系统，同时按下键盘上的`微标`键和`R`键，通常微标键是键盘左侧 `Ctrl` 和 `Alt` 之间图案为 微软公司图标 的按键，在弹出的“运行”框中键入`cmd`，点击确定，打开的命令提示符就是命令窗口。

如果你是 Linux 系统或者 Mac 系统，请直接找到终端并打开。

在命令窗口中键入`java -version`并按下`Enter`键。若提示“不是有效的命令…”之类的消息，则代表你没有安装 java 或者环境变量未被正确配置。

如果你没有安装 java 推荐使用 64 位的 `OpenJDK` 或 `OracleJDK` 的 11 或以上版本，如果你不清楚哪个版本更好，哪个方便就用哪个，使用 `OracleJDK` 即可，安装包的下载地址如下，下载后安装即可: [Java Downloads | Oracle](https://www.oracle.com/java/technologies/downloads/#java11-windows)

如果你安装了 java 仍出现“不是有效的命令…”之类的提示，请到搜索引擎搜索关键字`jdk 环境变量配置` 搜寻相关教程

### 选择启动方式

目前要启动 `mirai-console` 有 **原始启动法** 和 **启动器启动法** 两种方法。

使用启动器 Mirai Console Loader (MCL) 可以实现自动更新等功能。

使用原始启动法更朴素，不需要经过启动器这一层，但是没有自动更新等功能。

一般来说推荐使用**启动器启动法**，[点击这里](#启动器启动法)直接转跳到该部分

**在 Windows 下: 所有操作都需要在关闭“隐藏已知文件类型的扩展名”后进行**

#### 原始启动法

先前往 [maven 仓库](https://mvnrepository.com/) 搜索并下载以下几个库，格式是`.jar`，版本要对应：

```
mirai-core-all
mirai-console
mirai-console-terminal
```

在你记得的地方新建一个文件夹 (名字随意，这里名字用 `mirai`)，并在这个文件夹内新建一个 `libraries` 文件夹，将下载的三个库复制到里面，回到 `mirai` 文件夹，新建文本文档并重命名为 `启动.bat`，鼠标右键点击它并点击`编辑`，将以下内容复制并粘贴进去，保存，然后双击打开 `启动.bat` 即可

```bat
@echo off
title Mirai
java -cp ./libraries/* net.mamoe.mirai.console.terminal.MiraiConsoleTerminalLoader
pause
```

#### 启动器启动法

先前往 [MCL 发布地址](https://github.com/iTXTech/mirai-console-loader/releases) 下载最新版启动器，一般点击 `Assets` 下面的 `mcl-*.*.*.zip` 即可

将下载的文件解压到你记得的地方，然后双击打开文件 `mcl.cmd` 即可。

**若提示 `java.lang.UnsupportedClassVersionError` 字样，请确保你已安装 `jdk11`**

如果已安装，请鼠标右键点击 `mcl.cmd`，点击`编辑`，**注意，编辑时不要打开中文输入法，避免输入了程序不认的中文标点符号**，将第二行 `set JAVA_BINARY=java` 中结尾的 java替换为你 jdk11 里面 `java.exe` 的绝对路径，需要加上英文引号。如果你没有接触过编程你可能听不懂。一般该路径都默认在 `C:\Program Files\Java\版本\bin\java.exe`，取决于你安装java时填写的路径，如果你没有修改过路径，就前往上述的默认路径看看有没有这个文件，有的话就填进去，比如我的 `set JAVA_BINARY="C:\Program Files\Java\jdk-11.0.13\bin\java.exe"`，修改完后的完整 `mcl.cmd` 内容如下，**不要直接复制，仅作参考**

```bat
@echo off
set JAVA_BINARY="C:\Program Files\Java\jdk-11.0.13\bin\java.exe"
%JAVA_BINARY% -jar mcl.jar %*
```

改好后再次双击打开文件 `mcl.cmd` 即可

### 登录

在启动 `mirai` 之后，你将进行最麻烦的操作，就是登录。

**登录是 `mirai` 最大的门槛**，过了这道坎后面的路就会轻松得多 (对技术力充足的人来说)

// TODO 未完待续