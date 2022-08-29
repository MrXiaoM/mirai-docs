---
title: 开发入门篇 /02/ Hello Mirai!
description: 
published: true
date: 2022-08-29T04:23:43.692Z
tags: 
editor: markdown
dateCreated: 2022-07-24T18:22:15.847Z
---

# Hello Mirai

在上一章中，你学会了如何搭建开发环境，现在，让我们先让插件在测试环境跑起来吧！

# 测试

> 该部分仅适用于 mirai-console
{.is-info}


首先，在 `src/kotlin/test` 目录 (不存在就创建) 新建一个 kotlin 类 `RunTerminal.kt`，代码如下，请复制并按照注释提示自行替换插件主类和补充 import。

如果你是用官方的插件模板开发的，该目录下已有预置的 `RunTerminal.kt`，可直接启动。

```kotlin
@OptIn(ConsoleExperimentalApi::class)
suspend fun main() {
    // 设置工作目录为 ./run/
    val runDir = File("run")
    if (!runDir.exists()) runDir.mkdirs()
    MiraiConsoleTerminalLoader.startAsDaemon(MiraiConsoleImplementationTerminal(runDir.toPath()))

    // 举个例子，假如你的主类叫做 ExamplePlugin
    // kotlin: ExamplePlugin
    // java: ExamplePlugin.INSTANCE
    val pluginInstance = /*将此处替换为插件主类*/

    pluginInstance.load() // 主动加载插件, Console 会调用 插件主类.onLoad
    pluginInstance.enable() // 主动启用插件, Console 会调用 插件主类.onEnable

    //val bot = MiraiConsole.addBot(123456, "").alsoLogin() // 登录一个测试环境的 Bot

    MiraiConsole.job.join()
}
```

点击 `suspend fun main()` 右边绿色的 **▶** 图标，点击*运行*或*调试*均可启动测试，请记住启动测试的方法，按需使用。

# 你好，世界

你已经能进行测试了，接下来编写代码让你的机器人回复你吧！

> 若使用 mirai-console，写到 onEnable 里  
> 若单纯使用 mirai-core，爱写哪里写哪里 (你觉得什么时候该注册监听器就什么时候执行)，保证在机器人登录之前执行就行
{.is-info}


```kotlin
// kotlin

// 获取当前携程的事件频道，用于注册监听器
// 如果是在 mirai-core，请使用 GlobalEventChannel.context(携程)
// 一般来说除非实在没办法，否则必须指定携程上下文
val channel = globalEventChannel()
// 监听好友消息
channel.subscribeAlways<FriendMessageEvent> {
    // do sth you want like this
    if (message.content.contains("hello")) {
        sender.sendMessage("Hello Mirai :)");
    }
}
```

```java
// java

// 获取当前携程的事件频道，用于注册监听器
// 如果是在 mirai-core，请使用 GlobalEventChannel.INSTANCE
// 一般来说除非实在没办法，否则必须指定携程上下文
EventChannel<Event> channel = GlobalEventChannel.INSTANCE.context(this.getCoroutineContext());
channel.subscribeAlways(GroupMessageEvent.class, event -> {
    // do sth you want like this
    if (event.getMessage().contentToString().contains("hello")) {
        event.getSender().sendMessage("Hello Mirai :)");
    }
});
```

你不需要深究这些代码是什么意思，你只需要知道这样写可以实现这个功能就好。详细的解读将在以后的章节中呈现，稍安勿躁。

写好之后，运行测试，登录机器人，并使用你的 QQ 客户端向机器人发送好友消息 `hello` 来检验成果吧！

最后，请尝试修改其中的数值，并尝试利用 IDEA 的代码补全修改代码，获取收到的消息来自的 QQ 号、昵称等信息发送回去，实现比较简单的功能。

# 完成

你已经掌握 mirai 最简单的用法了，接下来通过了解事件系统，一步一步前进吧。

[开发入门篇 /03/ 事件系统](/mirai/开发入门_事件系统)