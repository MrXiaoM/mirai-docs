---
description: 本文档只讲比较基础/浅层的部分，若需深入还是需要去看官方的开发文档
---

# 开发文档

文档编写者 MrXiaoM 更倾向于 java 开发，如果本文档提供的 kotlin 代码有错请反馈，有些示例可能没有贴出 kotlin 代码，望理解

## 在开发之前

你需要先越过 `mirai` **最大**的门槛：登录

登录部分[已经在用户文档中描述得非常详尽](noob.md#登录)了，请先把机器人QQ号登录到 `mirai` 上再进行开发

推荐使用的工具列表，欢迎补充

<!-- 工具之间请用英文逗号 , 再加上一个空格来分隔 -->

<!-- 禁止添加 Notepad++ 等具有争议的工具 -->

| 类型               | 工具名称                                                     |
| ------------------ | ------------------------------------------------------------ |
| 集成开发环境 (IDE) | [IntelliJ IDEA](https://www.jetbrains.com/idea)              |
| 文本编辑器         | [Visual Studio Code](https://code.visualstudio.com/)         |
| 压缩/解压缩工具    | [7-zip](https://sparanoid.com/lab/7z/)                       |
| 下载工具           | [Motrix](https://motrix.app/)                                |
| Git 工具           | [Git](https://git-scm.com/), [GitHub Desktop](https://desktop.github.com) |

----

## 选择类型

在给你的项目新建文件夹之后，你先要决定你要写什么：

是 `mirai-core` 衍生程序，还是 `mirai-console` 插件。

> 用 mirai-core 意味着允许直接运行生成的 jar 或把功能嵌入到一个项目中, 用 mirai-console 意味着要用mcl启动但是允许同时加载多个 mirai-console 插件 [#1](https://github.com/MrXiaoM/mirai-docs/issues/1)

### mirai-core

如果你使用 `mirai-core`，就代表你想让最后编译出来的 jar 可以直接打开运行，不需要 `mirai-console`，但需要这代表着你的项目很大程度上和论坛里大部分的插件不兼容，因为没有 `mirai-console` 无法把其他插件加载进去。(别问为什么你不去写个插件系统，重复造轮子没必要)

### mirai-console

如果你使用 `mirai-console`，就代表你想编写插件，你想让最后编译出来的 jar 要放到 `mirai-console` 中的 `plugins` 文件夹里作为插件被加载才可使用，这样可以让你的项目很大程度上和论坛里的大部分插件兼容，可以同时让你的插件和别人的插件同时运行。

### 混合

当然，人不是死板的，你也可以两种混用，编写既可以让 `mirai-console` 加载又可以单独使用命令行启动的项目，但如果要把 `mirai-core` 打包进混合的“插件”内会增大单个jar包的占用空间，用`mirai-console` 的时候打包进去的核心就没用了；如果不打包而是从外部加载库的话还不如用 `mirai-console`，这貌似多此一举，但我还是要说下可以这么搞。

----

## 开始新建项目

我比较推荐写 `mirai-console` 插件，在这里不教如何写 `mirai-core` 衍生程序了，因为只需要直接跳过，从[登录机器人](dev.md#登录机器人)部分开始看即可。

官方文档指北：[配置 Mirai Console 项目](https://github.com/mamoe/mirai-console/blob/master/docs/ConfiguringProjects.md)

如果你要新建 `mirai-console` 插件项目，你可以去 clone 这个模板项目 [project-mirai/mirai-console-plugin-template](https://github.com/project-mirai/mirai-console-plugin-template) 或者直接用 [mirai-console 的 Gradle 插件](https://plugins.gradle.org/plugin/net.mamoe.mirai-console) 并直接从[插件启用时](dev.md#插件启用时)部分开始看即可。

朴素的方法：新建项目后，先将下面这老三样作为库导入到项目，

如果是编写 `mirai-core` 衍生程序，只导入需要第一个

```
mirai-core-all
mirai-console
mirai-console-terminal
```

这几个库在 [maven 仓库](https://mvnrepository.com) 都可以搜索到。

```
// 上面三个库在 Maven Central Repository 上的链接:
https://repo1.maven.org/maven2/net/mamoe/mirai-core-all
https://repo1.maven.org/maven2/net/mamoe/mirai-console
https://repo1.maven.org/maven2/net/mamoe/mirai-console-terminal
// 上面三个库的 2.8.0 版本在 Maven Central Repository 上的下载直链:
https://repo1.maven.org/maven2/net/mamoe/mirai-core-all/2.8.0/mirai-core-all-2.8.0-all.jar
https://repo1.maven.org/maven2/net/mamoe/mirai-console/2.8.0/mirai-console-2.8.0-all.jar
https://repo1.maven.org/maven2/net/mamoe/mirai-console-terminal/2.8.0/mirai-console-terminal-2.8.0-all.jar
```

其实 `mirai-console-terminal` 导不导没多大影响，看自己需求。如果你要在 maven 仓库下载 .jar 包的话，前两个**必须要下载文件名里版本后面有 -all 结尾**的文件，如 `mirai-core-all-2.8.0-all.jar`

```buildscript
// 你可以直接复制下面的内容来快速导入 2.8.0 到你的 gradle 项目中
// build.gradle
dependencies {
	implementation 'net.mamoe:mirai-core-all:2.8.0:all'
    implementation 'net.mamoe:mirai-console:2.8.0:all'
}
// build.gradle.kts
dependencies {
    implementation('net.mamoe:mirai-core-all:2.8.0:all')
    implementation('net.mamoe:mirai-console:2.8.0:all')
}
```

```pom
// 你可以直接复制下面的内容来快速导入 2.8.0 到你的 Maven POM 中
<dependency>
   <groupId>net.mamoe</groupId>
   <artifactId>mirai-core-all</artifactId>
   <version>2.8.0</version>
   <classifier>all</classifier>
</dependency>
      
<dependency>
   <groupId>net.mamoe</groupId>
   <artifactId>mirai-console</artifactId>
   <version>2.8.0</version>
   <classifier>all</classifier>
</dependency>
```

----

## 编写插件特征

**使用模板项目或者 Gradle 插件大可免除这步，详见上文**

官方文档指北：[手动配置主类服务](https://github.com/mamoe/mirai-console/blob/master/docs/Plugins.md#%E6%89%8B%E5%8A%A8%E9%85%8D%E7%BD%AE%E4%B8%BB%E7%B1%BB%E6%9C%8D%E5%8A%A1)

既然是 `mirai-console` 的插件，那就需要让 `mirai-console` 把你编译的 jar 给认出来。

首先，创建资源文件 `META-INF/services/net.mamoe.mirai.console.plugin.jvm.JvmPlugin`

在里面填写插件主类的路径，格式为纯文本，例子如下，整个文件中的内容只有如下所示的这一行：

```
top.mrxiaom.itisme.Natsuko
```

然后创建一个类，包名和类名如上，自己取名。让这个类继承 `JavaPlugin` 或者 `KotlinPlugin`，再填写插件相关信息即可。

官方文档指北：[主类的完整示例](https://github.com/mamoe/mirai-console/blob/master/docs/Plugins.md#手动配置主类服务)

在 Java 要**新建一个无参数的构造函数**并在里面将插件描述补上，**必须要无参数**的构造函数，并使用公开静态字段将其实例化。

Java:

```java
public class Natsuko extends JavaPlugin {
    public static final Natsuko INSTANCE = new Natsuko();
    public Natsuko() {
        super(new JvmPluginDescriptionBuilder(
            // 插件ID
            "top.mrxiaom.testplugin",
            // 版本
            "1.0.0"
        )
        // 插件名
        .name("Natsuko")
        // 作者
        .author("MrXiaoM")
        // 描述
        .info("An example plugin for tutorial")
        .build());
    }
} 
```

Kotlin:

```kotlin
object Natsuko : KotlinPlugin(
    JvmPluginDescription(
        // 插件ID
        id = "top.mrxiaom.testplugin",
        // 版本
        version = "1.0.0",
    ) {
        // 插件名
        name("Natsuko")
        // 作者
        author("MrXiaoM")
        // 描述
        info("An example plugin for tutorial")
    }
){
    
} 
```

至此，你的插件已经可以编译丢到 plugins 文件夹里运行了。

----

## 插件启用时

在你的插件被启用时，将会调用**主类**的 `onEnable` 方法，同理在插件被加载时会调用**主类**的 `onLoad` 方法，自行重写即可。

官方文档指北：[加载 onLoad](https://github.com/mamoe/mirai-console/blob/master/docs/Plugins.md#%E5%8A%A0%E8%BD%BD) | [启用 onEnable](https://github.com/mamoe/mirai-console/blob/master/docs/Plugins.md#%E5%90%AF%E7%94%A8) | [禁用 onDisable](https://github.com/mamoe/mirai-console/blob/master/docs/Plugins.md#%E7%A6%81%E7%94%A8)

----

## 登录机器人

如果你是使用 `mirai-console` 且不需要或者已有自动登录，你不需要看这一部分

首先，想要登录就先要新建一个机器人实例，方法如下

(代码中qq号和密码均为玩梗，请勿当真)

官方文档指北: [创建和配置 bot](https://github.com/mamoe/mirai/blob/dev/docs/Bots.md#1-%E5%88%9B%E5%BB%BA%E5%92%8C%E9%85%8D%E7%BD%AE-bot)

```java
// java:
// BotFactory.INSTANCE.newBot(qq, 密码, 选项);
Bot bot = BotFactory.INSTANCE.newBot(114514L, "1919810", new BotConfiguration() {
    {
        // 使用平板协议登录
        setProtocol(MiraiProtocol.ANDROID_PAD);
        // 指定设备信息文件路径，文件不存在将自动生成一个默认的，存在就读取
        fileBasedDeviceInfo("deviceInfo_114514.json");
        // 更多操作自己看代码补全吧
    }
});
```

```kotlin
// kotlin:
// BotFactory.newBot(qq, 密码)
val bot = BotFactory.newBot(114514L, "1919810") {
    // 使用平板协议登录
    setProtocol(MiraiProtocol.ANDROID_PAD)
    // 指定设备信息文件路径，文件不存在将自动生成一个默认的，存在就读取
    fileBasedDeviceInfo("deviceInfo_114514.json")
    // 更多操作自己看代码补全吧
}
```

要登录这个机器人实例，`bot.login();` 就好了

如果你想获取已经登录过的机器人的实例

```java
Bot.getInstance(114514L)
```

但是，值得注意，不要在 `onEnable` 方法中直接执行`Bot.getInstance()`获取Bot实例。因为 `mirai-console` 会先加载插件(`onLoad`)，加载完成插件(`onEnable`)后，才会登录 QQ Bot，因此，在执行 `onEnable` 方法时，QQ Bot 还没有登录，获取不到实例。

我们可以使用**公共事件通道**监听QQ机器人在线事件 `BotOnlineEvent`，待 QQ Bot 在线后，再根据QQ号获取 QQ Bot 实例。详见[监听一个事件](#监听一个事件)

----

## 监听事件

官方文档指北:  [事件系统](https://github.com/mamoe/mirai/blob/dev/docs/Events.md)

现在，我们需要让机器人对某些动作作出回应，这时就需要去监听事件了，当然也可以用`mirai-console`自带的[指令](#指令模块)模块来进行判断与回应。

监听的方式多种多样，可以**监听单个事件**，**监听一个类里所有事件**等等

### 获取事件通道
但在这之前，我们需要先选择一个**事件通道**，你可以选择**公共事件通道**(在同一个mirai上登录的所有机器人都能触发)或者**单机器人事件通道**(只有特定的机器人能触发)。如果你的mirai上只登录了一个机器人，随便选。

获取公共事件通道：

```
// Java: GlobalEventChannel.INSTANCE
// Kotlin: GlobalEventChannel
```

获取单机器人事件通道：

```java
// Java: bot.getEventChannel();
// Kotlin: bot.eventChannel
```

以上这是简单的获取方法。本节之后，**本文将把事件通道统统用 `channel` 代替**。

#### 过滤器

如果需要过滤一些事件，你需要在原有事件通道的基础上加 `.filter(function)`，参数 `function` 是返回值是 boolean，参数是 Event 的方法，可用 lambda 表达式。比如**只在消息有 At 的时候才触发事件**的示例通道如下

```java
// java:
// 这样写只是方便理解，实际上可以缩写成下面这句
// GlobalEventChannel.INSTANCE.filter(e -> (e instanceof MessageEvent) && ((MessageEvent)e).getMessage().contains(At.Key));
EventChannel<Event> channel = GlobalEventChannel.INSTANCE.filter(e -> { 
    if (e instanceof MessageEvent) { 
        return ((MessageEvent) e).getMessage().contains(At.Key);
    }
    return false;
});
// 下面这句只是例子，你完全可以忽略
channel.registerListenerHost(xwx);
```

```kotlin
// kotlin:
// 改自官方文档的例子
var channel = GlobalEventChannel.filter { e is MessageEvent && e.message.contains(At.Key) }
// 下面这句只是例子，你完全可以忽略
channel.registerListenerHost(xwx)
```

`.filter` 等方法支持链式，所以你可以在后面再追加几个过滤器。

过滤器将会依次进行检查，有一个过滤器没有通过检查就不会执行后面的检查。

此外，`.filterIsInstance(事件类.class)` 等价于

`.filter(e -> e instanceof 事件类) // java` 

`.filter { e is 事件类 } // kotlin`

#### 给予编程小白的提醒

选择好通道，**以后本文代码中的 channel 要替换成你获取的通道**，如

```java
channel.registerListenerHost(xwx);
```

你选择公共事件通道时应该替换为

```java
// java:
GlobalEventChannel.INSTANCE.registerListenerHost(xwx);
// kotlin:
GlobalEventChannel.registerListenerHost(xwx)
```

清楚规则，就开始吧

### 监听一个事件

**在[这个链接](https://github.com/mamoe/mirai/blob/dev/docs/EventList.md)里有所有事件类的一句话简述，需要监听什么事件请自取**

官方文档指北: [在 `EventChannel` 监听事件](https://github.com/mamoe/mirai/blob/dev/docs/Events.md#在-eventchannel-监听事件)

```java
// java:
// channel.subscribeAlways(事件类, 方法);
// 示例：收到好友消息
channel.subscribeAlways(FriendMessageEvent.class, event -> { 
    // 做些什么，比如
    // 你发送好友消息“你好”给机器人，机器人就会回复你“Hello Mirai :)”
    // 不要着急，有关消息发送的内容会在下一部分讲
    if(event.getMessage().contentToString().equals("你好")) {
        event.getSubject().sendMessage("Hello Mirai :)");
    }
});
// 你也可以像这样
public void onEnable(){
    channel.subscribeAlways(FriendMessageEvent.class, this::onFriendMessage);
}
private void onFriendMessage(FriendMessageEvent event){
    if(event.getMessage().contentToString().equals("你好")) {
        event.getSubject().sendMessage("Hello Mirai :)");
    }
}
// 你也可以这样（通过 公共事件通道 获取 单机器人事件通道），并给单机器人事件通道设置事件的处理方法
public void onEnable() {
    long qqBotNo = long型QQ号;
    /*
    GlobalEventChannel.INSTANCE.subscribeAlways(BotOnlineEvent.class, event -> {
        Bot bot = Bot.getInstance(qqBotNo);
        EventChannel<BotEvent> eventChannel = bot.getEventChannel();
        eventChannel.subscribeAlways(FriendMessageEvent.class, this::onFriendMessage);
    });
    */
    /* 但是 BotOnlineEvent，每个 Bot 上线时都会触发，导致重复获取单机器人事件通道，重复设置事件的处理方法。
     * 所以，可增加判断涉及到的 QQ 号，是否是自己想要的QQ号。
     */
    GlobalEventChannel.INSTANCE.filterIsInstance(BotOnlineEvent.class)
            .filter(e -> event.getBot().getId() == qqBotNo)
	    .subscribeAlways(BotOnlineEvent.class, event -> {
        Bot bot = event.getBot();
        EventChannel<BotEvent> eventChannel = bot.getEventChannel();
        eventChannel.subscribeAlways(FriendMessageEvent.class, this::onFriendMessage);
    });
}
```

```kotlin
// kotlin:
// channel.subscribeAlways<事件类> { 方法 };
channel.subscribeAlways<FriendMessageEvent> { event ->
    // 此处的 this 和 event 都是事件的实例
    if (message.contentToString().equals("你好")) {
        subject.sendMessage("Hello Mirai :)")
    }
}
```

### 监听一个类里所有事件

官方文档指北: [使用 `@EventHandler` 注解标注的方法监听事件](https://github.com/mamoe/mirai/blob/dev/docs/Events.md#使用-eventhandler-注解标注的方法监听事件)

这种方法可以非常大量地监听事件，当你懒得再去找通道注册部分代码的时候可以用这个方法。

先要新建一个类，使其继承 `SimpleListenerHost`(推荐)，或者实现` ListenerHost `，然后在那个类里面写带单个参数的方法，参数的类型要是事件类型，并且方法要加上 `@EventHandler` 注解。如果你想要在执行事件时停止监听事件，需要返回值类型要为 `ListeningStatus`并返回 `ListeningStatus.STOPPED`。代码如下所示

[java 方法加注解](https://github.com/mamoe/mirai/blob/dev/docs/Events.md#java-%E6%96%B9%E6%B3%95)

```java
public class EventHost extends SimpleListenerHost{
    // 所有方法类型
    // T 表示任何 Event 类型.
    // void onEvent(T)
    // Void onEvent(T)
    // ListeningStatus onEvent(T) // 禁止返回 null
    @EventHandler
    private void onFriendMessage(FriendMessageEvent event){
        if (event.getMessage().contentToString().equals("你好")) {
            event.getSubject().sendMessage("Hello Mirai :)");
        }
    }
}
```

或者 [kotlin 函数加注解](https://github.com/mamoe/mirai/blob/dev/docs/Events.md#kotlin-%E5%87%BD%E6%95%B0)

```kotlin
object EventHost : SimpleListenerHost {
    // 所有函数参数, 函数返回值都不允许标记为可空 (带有 '?' 符号)
    // T 表示任何 Event 类型.
    // suspend fun T.onEvent(T)
    // suspend fun T.onEvent(T): ListeningStatus
    // suspend fun T.onEvent(T): Nothing
    // suspend fun onEvent(T)
    // suspend fun onEvent(T): ListeningStatus
    // suspend fun onEvent(T): Nothing
    // suspend fun T.onEvent()
    // suspend fun T.onEvent(): ListeningStatus
    // suspend fun T.onEvent(): Nothing
    // fun T.onEvent(T)
    // fun T.onEvent(T): ListeningStatus
    // fun T.onEvent(T): Nothing
    // fun onEvent(T)
    // fun onEvent(T): ListeningStatus
    // fun onEvent(T): Nothing
    // fun T.onEvent()
    // fun T.onEvent(): ListeningStatus
    // fun T.onEvent(): Nothing
    // 所有 Kotlin 非 suspend 的函数都将会在 Dispatchers.IO 中调用
    @EventHandler
    suspend fun FriendMessageEvent.onFriendMessage() {
        if (message.contentToString().equals("你好")) {
            subject.sendMessage("Hello Mirai :)")
        }
    }
}
```

然后，再去注册监听器即可

```java
// channel.registerListenerHost(类实例);
// Java: channel.registerListenerHost(new EventHost());
// Kotlin: channel.registerListenerHost(EventHost)
```

注解 @EventHandler 是附带参数的

```java
@EventHandler(priority = 优先级, concurrency = 并发索引, ignoreCancelled = 是否允许事件被取消)
```
全都是可选参数。跟上面的例子一样，你直接 `@EventHandler` 都是没问题的

[事件优先级](https://github.com/mamoe/mirai/blob/dev/mirai-core-api/src/commonMain/kotlin/event/Listener.kt#L100) 的注释：在广播时, 事件监听器的调用顺序为 (从左到右):

[HIGHEST] -> [HIGH] -> [NORMAL] -> [LOW] -> [LOWEST] -> [MONITOR]

 - 使用 [MONITOR] 优先级的监听器将会被**并行**调用.
 - 使用其他优先级的监听器都将会**按顺序**调用.
因此一个监听器的挂起可以阻塞事件处理过程而导致低优先级的监听器较晚处理.
当事件被 使用 `Event.intercept()` 拦截后, 优先级较低 (靠右) 的监听器将不会被调用.

### 新建事件

你已经学会怎么监听事件了，那么学一下怎么新建一个自定义事件吧!

本部分是选学部分，你可以直接跳过。~~官方文档[仅用了两行](https://github.com/mamoe/mirai/blob/dev/docs/Events.md#%E5%AE%9E%E7%8E%B0%E4%BA%8B%E4%BB%B6)来描述这一部分，因为这本来就是很简单的几乎不用教~~ ~~有人pr了，那部分被补充了~~ 现在是我pr的了，暂时还没合并，可以先[点击这里](https://github.com/mamoe/mirai/blob/367e9cd5561a85a4ad5512053ab362be95820f85/docs/Events.md#%E5%AE%9E%E7%8E%B0%E4%BA%8B%E4%BB%B6)查看相关内容

如果你有开发过 Bukkit 服务端插件 (Bukkit 是 Minecraft Java Edition 的衍生服务端)，且把[事件系统](https://mineplugin.org/Event_API_Reference)玩通透了，这部分对你来说会相对简单。

----

## 联系人&发送消息

官方文档指北:  [联系人](https://github.com/mamoe/mirai/blob/dev/docs/Contacts.md)

现在，我们该学习如何让机器人发送消息啦。

**这里所有代码中的 `bot` 都是指机器人的实例，请自行新建或获取**

在发送消息之前，我们需要获取到要发送到的地方，在 mirai 里消息的目的地叫做**联系人**。

群聊、好友、群成员都算是联系人，当前获取联系人有两种途径

----

### 机器人主动获取联系人

```java
// 获取好友 bot.getFriend(qq);
// 获取群聊 bot.getGroup(群号);
```

### 从事件获取联系人

你肯定有注意到，一些事件里面会有 `event.getGroup()`，`event.getFriend()`，`event.getSender()` 之类的方法，它们就是用来获取联系人的

在 kotlin，可以直接用 `event.group`，`event.friend`，`event.sender`

----

获取到联系人之后，**我这里统一把联系人用 `contact` 代替**，记得把代码里的 `contact` 替换成你需要发送消息到的哪个联系人

要发送消息非常简单 `contact.sendMessage(消息);`

消息不仅可以用**下文提到的方法**生成，也可以直接用字符串，就像“监听事件”部分的例子那样。详细请见下一部分

如果你有仔细看各个联系人实例的代码补全，你会发现还有很多可以获取或者操作的内容

----

## 生成消息

官方文档指北:  [消息系统](https://github.com/mamoe/mirai/blob/dev/docs/Messages.md)

在发送消息时，你可以发送**消息元素**、**消息链**或者**字符串**，这部分将会讲如何生成各类消息

### 工具: 消息链构建器 MessageChainBuilder

这是个内置的消息链工具类，`MessageChainBuilder msg = new MessageChainBuilder();`

要往里面添加消息元素(如何实例化消息元素会在后面说到)，只需要

```java
// java:
// 在最后追加消息(Message、SignleMessage)，可以追加字符串
builder.add(消息元素);
// 在某处插入消息(SignleMessage)，如果要追加字符串，请追加消息元素 new PlainText("消息");
builder.add(索引, 消息元素);
// 添加列表(Collection)里所有消息，同上
builder.addall(消息元素列表);
// 同上
builder.addall(索引, 消息元素列表);
```

```kotlin
// kotlin:
val builder = MessageChainBuilder()
// 之后同java
builder.add(消息元素)
```

要发送给某人的时候，用 `builder.build()` 来构建消息链，示例如下

```java
// java:
MessageChainBuilder builder = new MessageChainBuilder();
builder.add(new At(2431208142L));
builder.add("Hello Mirai :)");
// 构建出来的消息: @MrXiaoM Hello Mirai :)
MessageChain msg = builder.build();
// 要发送消息，上一部分说了
contact.sendMessage(msg);
```

```kotlin
// kotlin:
val builder = MessageChainBuilder()
builder.add(new At(2431208142L))
builder.add("Hello Mirai :)")
val msg = builder.build() // builder.asMessageChain() 也可以
contact.sendMessage(msg)
```

### 不用构建器也可以

你可以使用消息类中的 `.plus(消息)` 方法来**拼接消息元素**，下面是例子

```java
// @MrXiaoM Hello Mirai :)
MessageChain msg1 = new At(2431208142L).plus("Hello Mirai :)");
// 你好 @MrXiaoM
MessageChain msg2 = new PlainText("你好 ").plus(new At(2431208142L));

contact.sendMessage(msg1);
// contact.sendMessage(msg2);
```

```kotlin
// @MrXiaoM Hello Mirai :)
val msg1 = At(2431208142L).plus("Hello Mirai :)")
// 你好 @MrXiaoM
val msg2 = PlainText("你好 ").plus(new At(2431208142L))
contact.sendMessage(msg1)
// contact.sendMessage(msg2)
```

注意：**在 java 拼接消息不能用加号**，比如 At 和字符串，如果用加号，At 等消息会被转换成字符串，发送出去将不会 At 到人。你可以理解成要用 `String.equals(String)` 而不是 `String == String`

```java
// java:
// 错误示范:
contact.sendMessage(new At(2431208142L) + "测试");
// 正确示范:
contact.sendMessage(new At(2431208142L).plus("测试"));
```

kotlin中也可以直接使用DSL来构建MessageChain
```kotlin
// kotlin:
// 复制自官方文档
val chain = buildMessageChain {
    +PlainText("a")
    +AtAll
    +Image("/f8f1ab55-bf8e-4236-b55e-955848d7069f")
    add(At(123456)) // `+` 和 `add` 作用相同
}
```

### 实例化消息元素

在上面的部分你已经学会如何把各种消息拼起来了，[消息元素的列表在这里](https://github.com/mamoe/mirai/blob/dev/docs/Messages.md#%E6%B6%88%E6%81%AF%E5%85%83%E7%B4%A0)，点击相应的链接即可查看消息元素的源代码，看看构造函数就知道如何将其实例化了。这里提一下常用例子或者比较特殊的类型，比如需要上传或者用构建器构建的。

----

#### 常用消息元素

```java
new PlainText("正常字符串")
new At(114514L) // @某人
AtAll.INSTANCE // @全体成员
new Face(Face.呲牙) // qq自带表情，new Face(Face.ZI_YA) 是一样的
Dice.random() // 随机骰子，要自定义点数请 new Dice(6);
```

----

#### 图片消息

首先要获取到联系人，上一部分讲了，这一部分还是用 `contact` 代表联系人

首先你需要先用 `contact.uploadImage(图片)` 把图片上传到服务器，这个方法的返回值就是图片，要在消息中插入图片把它加进消息链 (MessageChain) 中即可。或者你可以直接用 `contact.sendMessage(图片);` 来发送。但是你会发现 `uploadImage` 的参数类型是 `ExternalResource`，那么我们要怎么指定图片呢？代码如下，上传并发送的例子

```java
// 文件可以是 byte[]、InputStream、File 等
// 因此你在上传网络图片时可以无需保存到本地硬盘直接上传
ExternalResource res = ExternalResource.create(new File("./sunday.jpg"));
Image image = contact.uploadImage(res);
res.close(); // 记得关闭资源
contact.sendMessage(image);
// 更多可选择操作:
// msg.add(image);
// image.plus("图片加文字");
```

----

#### 语音消息

一样，先获取到联系人，然后 `contact.uploadVoice(语音文件)` 把语音上传到服务器，这个方法的返回值就是图片，其他同上，代码如下

```java
ExternalResource res = ExternalResource.create(new File("./kawaii.amr"));
// 如果你使用的 mirai 版本是2.7以前(不包括2.7)，请用下面标注了 2.0+ 那句
Audio audio = contact.uploadAudio(res); // 2.7+
// Voice audio = contact.uploadVoice(res); // 2.0+
res.close(); // 记得关闭资源
contact.sendMessage(audio);
```

[`AudioSupported.uploadAudio(resource)`](https://github.com/mamoe/mirai/blob/dev/mirai-core-api/src/commonMain/kotlin/contact/AudioSupported.kt#L39) 的注释：

语音文件支持 AMR 和 SILK 格式. 若要支持 MP3 格式, 请参考 [mirai-silk-converter](https://github.com/project-mirai/mirai-silk-converter)
当语音文件过大而被服务器拒绝上传时. (最大大小约为 1 MB)
**注意**: 由于服务器不一定会检查大小, 该异常就不一定会因大小超过 1MB 而抛出.

----

#### 文件消息

在该文档编写时 (Release 2.8.0)，mirai 仅支持发送群文件

要获取群文件根目录，则需要使用如下代码，group 代表群聊(联系人)实例

```java
// mirai 版本在2.8或以上的用第一个，否则用第二个
group.getFiles() // 2.8+
group.getFilesRoot() // 2.5+
```

```java
// 上传文件，其中“进度回调”是可选参数，可不填
// 源码中的注释: 文件路径, **包含目标文件名**. 如 `/foo/bar.txt`. 若是相对目录则基于 [根目录][root] 处理.
// group.getFiles().uploadNewFile(路径, 文件, 进度回调) // 2.8+
// group.getFilesRoot().upload(文件, 进度回调) // 2.5+
ExternalResource res = ExternalResource.create("./测试文件.txt");
// 我忘了该不该在执行上传后就关闭文件，如果不放心可以使用
// ExternalResource res = ExternalResource.create("./测试文件.txt").toAutoCloseable();
// 当然这玩意是在 2.8+ 才有的
group.getFiles().uploadNewFile("测试文件.txt", res); // 2.8+
// group.getFilesRoot().upload(res); // 2.5+
```

至于怎么看文件列表嘛… 我在这方面没怎么研究，看源码的注释吧

[2.8+ AbstractFolder](https://github.com/mamoe/mirai/blob/dev/mirai-core-api/src/commonMain/kotlin/contact/file/AbsoluteFolder.kt)，[2.5+ RemoteFile](https://github.com/mamoe/mirai/blob/dev/mirai-core-api/src/commonMain/kotlin/utils/RemoteFile.kt)

----

### 除了这些以外
还有一种生成消息的选择，那就是 Mirai 码
用法非常简单! 因其良好的可序列化和反序列化能力，经常在第三方 SDK 中被使用

```java
// java:
MessageChain msg = MiraiCode.deserializeMiraiCode("字符串", 联系人);
// kotlin:
var msg = "字符串".deserializeMiraiCode(联系人)
// 参数“联系人”可不填
// 但不填“联系人”可能会无法转换图片以及文件等消息
```

只要这样就能解析字符串中的 Mirai 码，将其转换并拼接到一个 MessageChain 中。

反过来，MessageChain 也能转换成 Mirai 码字符串，直接 `message.serializeToMiraiCode()` 即可。

有关 Mirai 码字符串的编写规则，[在这个链接里有](https://github.com/mamoe/mirai/blob/dev/docs/Messages.md#%E7%94%B1-codablemessage-%E5%8F%96%E5%BE%97-mirai-%E7%A0%81%E5%AD%97%E7%AC%A6%E4%B8%B2)。以下是编写例子

```java
// java:
MessageChain msg = MiraiCode.deserializeMiraiCode("[mirai:at:2431208142] Hello Mirai :)"); // @MrXiaoM Hello Mirai :)
group.sendMessage(msg);
```

```kotlin
// kotlin:
var msg = "[mirai:at:2431208142] Hello Mirai :)".deserializeMiraiCode() // @MrXiaoM Hello Mirai :)
group.sendMessage(msg)
```

## 指令模块

官方文档指北：[指令系统](https://github.com/mamoe/mirai-console/blob/master/docs/Commands.md)

使用指令模块的优缺点：

优点：
- 既可以在代码执行，也可以在消息环境中执行（需要[`chat-command`](https://github.com/project-mirai/chat-command)插件作为前置，并授予相关权限）
- 对于简单的命令不需要对事件进行监听并解析，可以直接使用`mirai-console`自带的语法解析
- 可以直接获取发送人等信息

缺点：
- 需要分配权限
- 对复杂语法无能为力
- Java写起来比Kotlin（看起来）更繁琐

下面的例子展示了如何实现一个简单的复读的指令

```kotlin
// Kotlin:
// Plugin.kt
object Plugin: KotlinPlugin(
	JvmPluginDescription(// 此处省略)
){
    override fun onEnable() {
        Echo.register()
    }
}

// Echo.kt
object Echo: SimpleCommand(
    Plugin,
    primaryName = "echo",
    secondaryNames = arrayOf("复读"),
    description = "复读消息"
) {
    @Handler // 标记这是指令处理器  // 函数名随意 
    suspend fun CommandSender.handle(target: User, message: String) { // 这两个参数会被作为指令参数要求
        if (target.id == bot?.id) { // 判断@对象是否是bot
            sendMessage(message) // 复读
        }
    }
}
```
```java
// java:
// Plugin.java
public class Plugin extends JavaPlugin {
    
    public static final Plugin INSTANCE = new Plugin();
    
    private Plugin() {
        super(new JvmPluginDescriptionBuilder(// 此处省略).build());
    }
    
    @Override
    public void onEnable() {
        CommandManager.INSTANCE.registerCommand(Echo.INSTANCE, false);
    }
}

// Echo.java
public class Echo extends JSimpleCommand {
    
    public static final Echo INSTANCE = new Echo();
    
    private Echo() {
        super(Plugin.INSTANCE, "echo", "复读");
        this.setDescription("复读消息");
    }
    
    @Handler // 标记这是指令处理器  // 函数名随意
    public void handle(CommandSender sender, User target, String msg) {
        Bot bot = sender.getBot();
        if (bot != null && target.getId() == bot.getId()) { // 判断@对象是否是bot
            sender.sendMessage(msg); // 复读
        }
    }
}
```
这样在聊天环境（安装`chat-command`并分配权限后）发送`/echo @<bot> <message>`，bot就会复读这个`message`

----

## 你已经学会如何制作机器人了

利用事件系统和消息系统等，制作一个简单的练手作吧!

**请在编写想要发布的插件之前，搜索一下有没有功能类似且更好的插件。如果有的话，除非你能比别人做得更好，否则最好不要发布出去。如果你是做练手作品，为了让自己更熟练操作 mirai 且不发布，那请随意。**

以下是几个可供选择的练习题材，你可以把它们当作关卡，每个题材都去实现

另外我**非常不推荐**你去写复读机，很容易被别有用心的人让机器人复读奇奇怪怪的东西而导致封号 (亲身经历)

~~希望不会有人把一些阴间题材给 PR 上来~~

> **猜数字**
>
> 开始游戏后随机生成一个数字，并告知随机数生成范围，让群员发送数字去猜，离正确答案过大过小都会有提示，最后猜到正确答案的群员胜利

> **群管理**
>
> 关键词自动回复、自动禁言、主动退群自动拒绝加群请求、机器人无管理员权限时的异常处理等等

> **涩图机器人**
>
> 随机发送二次元人物图片，咳咳 论坛那么多色图bot懂的都懂，怎么把它玩出花来又不违规就看你的了

> **问答/抢答游戏**
>
> 开始游戏后机器人给出问题，谁先给出正确答案谁得分，最后得分最高的人获胜，要求在游戏结束后要有积分排行榜，群员超时无响应结束游戏等等。

> **网站/应用爬虫**
>
> 主动或被动爬取互联网上指定站点的资源。因为各个社区定位千差万别，这里很难说要怎么搞。Github 可以搞 issues 发布提醒等 (有人搞过了)，b站可以搞动态发布提醒等 (有人搞过了)

> **游戏对接**
>
> 时qq群内机器人可以与游戏内容进行交互，比如 Minecraft 服务器，具体内容大概为玩家信息查询、聊天转发等等。甚至是让机器人干涉游戏内容或者辅助已绑定qq号的玩家找回密码等，自由发挥想象。



## 在最后的最后

因为开发者往往会比普通用户的自由度和能动性会更高，所以我觉得有必要在开发文档再强调下

### 一切开发旨在学习，请勿用于非法用途

- mirai 是完全免费且开放源代码的软件，仅供学习和娱乐用途使用
- mirai 不会通过任何方式强制收取费用，或对使用者提出物质条件
- mirai 由整个开源社区维护，并不是属于某个个体的作品，所有贡献者都享有其作品的著作权。



`mirai` 采用 `AGPLv3` 协议开源。为了整个社区的良性发展，我们**强烈建议**您做到以下几点：

- **间接接触（包括但不限于使用 `Http API` 或 跨进程技术）到 `mirai` 的软件使用 `AGPLv3` 开源**
- **不鼓励，不支持一切商业使用**

鉴于项目的特殊性，开发团队可能在任何时间**停止更新**或**删除项目**。

### **mirai 的形象图及项目图标都拥有著作权保护。**
**在未经过允许的情况下，任何人都不可以使用形象图和图标，有关 mirai 名称来历的介绍原文，用于商业用途或是放置在项目首页，或其他未许可的行为。**

### 衍生软件需声明引用

- 若引用 mirai 发布的软件包而不修改 mirai，则衍生项目需在描述的任意部位提及使用 mirai。
- 若修改 mirai 源代码再发布，**或参考 mirai 内部实现发布另一个项目**，则衍生项目必须在**文章首部**或 'mirai' 相关内容**首次出现**的位置**明确声明**来源于本仓库 (`https://github.com/mamoe/mirai`)。不得扭曲或隐藏免费且开源的事实。


> —— 来自 mamoe/mirai 的 README.md

