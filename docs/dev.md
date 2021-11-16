---
description: 本文档只讲比较基础/浅层的部分，若需深入还是需要去看官方的开发文档
---

# 开发文档

文档编写者 MrXiaoM 更倾向于 java 开发，如果本文档提供的 kotlin 代码有错请反馈，谢谢

## 在开发之前

你需要先越过 `mirai` **最大**的门槛：登录

登录部分[已经在用户文档中描述得非常详尽](noob.md#登录)了，请先把机器人QQ号登录到 `mirai` 上再进行开发

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

## 开始新建项目

我比较推荐写 `mirai-console` 插件，在这里不教如何写 `mirai-core` 衍生程序了，因为只需要直接跳过，从[登录机器人](dev.md#登录机器人)部分开始看即可。

如果你要新建 `mirai-console` 插件项目，你可以去 clone 这个模板项目 [project-mirai/mirai-console-plugin-template](https://github.com/project-mirai/mirai-console-plugin-template) 或者直接用 [mirai-console 的 Gradle 插件](https://plugins.gradle.org/plugin/net.mamoe.mirai-console) 并直接从[插件启用时](dev.md#插件启用时)部分开始看即可。

朴素的方法：新建项目后，先将下面这老三样作为库导入到项目，

如果是编写 `mirai-core` 衍生程序，只导入需要第一个

```
mirai-core-all
mirai-console
mirai-console-terminal
```

这几个库在 [maven 仓库](https://mvnrepository.com) 都可以搜索到。

## 编写插件特征

**使用模板项目或者 Gradle 插件大可免除这步，详见上文**

既然是 `mirai-console` 的插件，那就需要让 `mirai-console` 把你编译的 jar 给认出来。

首先，创建资源文件 `META-INF/services/net.mamoe.mirai.console.plugin.jvm.JvmPlugin`

在里面填写插件主类的路径，格式为纯文本，例子如下，整个文件中的内容只有如下所示的这一行：

```
top.mrxiaom.itisme.Natsuko
```

然后创建一个类，包名和类名如上，自己取名。让这个类继承 `JavaPlugin` 或者 `KotlinPlugin`，再填写插件相关信息即可。

在 Java 要**新建一个无参数的构造函数**并在里面将插件描述补上，**必须要无参数**的构造函数，并使用公开静态字段将其实例化。

Java:

```java
public class Natsuko extends JavaPlugin {
    public static final Natsuko INSTANCE = new Natsuko();
    public Natsuko(){
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

## 插件启用时

在你的插件被启用时，将会调用**主类**的 `onEnable` 方法，同理在插件被加载时会调用**主类**的 `onLoad` 方法，自行重写即可。

## 登录机器人

如果你是使用 `mirai-console` 且不需要或者已有自动登录，你不需要看这一部分

首先，想要登录就先要新建一个机器人实例，方法如下

(代码中qq号和密码均为玩梗，请勿当真)

java:

```java
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

kotlin:

```kotlin
// BotFactory.newBot(qq, 密码)
val bot = BotFactory.newBot(114514L, "1919810") {
	// 使用平板协议登录
	setProtocol(MiraiProtocol.ANDROID_PAD);
	// 指定设备信息文件路径，文件不存在将自动生成一个默认的，存在就读取
	fileBasedDeviceInfo("deviceInfo_114514.json");
	// 更多操作自己看代码补全吧
};
```

要登录这个机器人实例，`bot.login();` 就好了

如果你想获取已经登录过的机器人的实例

```java
Bot.getInstance(114514L);
```

## 监听事件

如需深入探究，请见 [mirai 官方文档](https://github.com/mamoe/mirai/blob/dev/docs/Events.md)

现在，我们需要让机器人对某些动作作出回应，这时就需要去监听事件了。

监听的方式多种多样，可以**监听单个事件**，**监听一个类里所有事件**等等

但在这之前，我们需要先选择一个**事件通道**，你可以选择**公共事件通道**(在同一个mirai上登录的所有机器人都能触发)或者**单机器人事件通道**(只有特定的机器人能触发)。如果你的mirai上只登录了一个机器人，随便选。

获取公共事件通道：

```
// Java: GlobalEventChannel.INSTANCE
// Kotlin: GlobalEventChannel
```

获取单机器人事件通道：

```
// Java: bot.getEventChannel();
// Kotlin: bot.eventChannel
```

选择好通道，**并将下面代码中的 channel 替换成你获取的通道**，如

```
channel.registerListenerHost(xwx);
```

在 java，你选择公共事件通道时应该替换为

```
GlobalEventChannel.INSTANCE.registerListenerHost(xwx);
```

清楚规则，就开始吧

**在[这个链接](https://github.com/mamoe/mirai/blob/dev/docs/EventList.md)里有所有事件类的一句话简述，需要监听什么事件请自取**

### 监听一个事件

[在 `EventChannel` 监听事件](https://github.com/mamoe/mirai/blob/dev/docs/Events.md#在-eventchannel-监听事件)

java:

```java
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
```

kotlin:

```kotlin
// channel.subscribeAlways<事件类> { 方法 };
channel.subscribeAlways<FriendMessageEvent> { event ->
    // 此处的 this 和 event 都是事件的实例
    if(message.contentToString().equals("你好")){
        subject.sendMessage("Hello Mirai :)")
    }
};
```

## 监听一个类里所有事件

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
        if(event.getMessage().contentToString().equals("你好")) {
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
        if(message.contentToString().equals("你好")){
        	subject.sendMessage("Hello Mirai :)")
        }
    }
}
```

然后，再去注册监听器即可

```
// channel.registerListenerHost(类实例);
// Java: channel.registerListenerHost(new EventHost());
// Kotlin: channel.registerListenerHost(EventHost);
```

注解 @EventHandler 是附带参数的

```
@EventHandler(priority = 优先级, concurrency = 并发索引, ignoreCancelled = 是否允许事件被取消)
```

优先级

## 生成消息

如需深入探究，请见 [mirai 开发文档](https://github.com/mamoe/mirai/blob/dev/docs/Messages.md)

// TODO 敬请期待

## 联系人&发送消息

如需深入探究，请见 [mirai 开发文档](https://github.com/mamoe/mirai/blob/dev/docs/Contacts.md)

现在，我们该学习如何让机器人发送消息啦。

**这里所有代码中的 `bot` 都是指机器人的实例，请自行新建或获取**

在发送消息之前，我们需要获取到要发送到的地方，在 mirai 里消息的目的地叫做**联系人**。

群聊、好友、群成员都算是联系人，当前获取联系人有两种途径

----

### 机器人主动获取

```
// 获取好友 bot.getFriend(qq);
// 获取群聊 bot.getGroup(群号);
```

### 从事件获取

你肯定有注意到，一些事件里面会有 `event.getGroup()`，`event.getFriend()`，`event.getSender()` 之类的方法，它们就是用来获取联系人的

在 kotlin，由于 this 就是事件，可以直接用 `group`，`friend`，`sender`

----

获取到联系人之后，**我这里统一把联系人用 `contact` 代替**，记得把代码里的 `contact` 替换成你需要发送消息到的哪个联系人

要发送消息非常简单 `contact.sendMessage(消息);`

消息不仅可以用上文提到的方法生成，也可以直接用字符串，就像“监听事件”部分的例子那样。

如果你有仔细看各个联系人实例的代码补全，你会发现还有很多可以获取或者操作的内容，上一部分没有讲的“如何发送图片”就在这些操作中，首先你需要先用 `contact.uploadImage(图片)` 把图片上传到服务器，这个方法的返回值就是图片，要在消息中插入图片把它加进消息链 (MessageChain) 中即可。或者你可以直接用 `contact.sendMessage(图片);` 来发送。但是你会发现 `uploadImage` 的参数类型是 `ExternalResource`，那么我们要怎么指定图片呢？代码如下，上传并发送的例子

```java
// 文件可以是 byte[]、InputStream、File 等
// 因此你在上传网络图片时可以无需保存到本地硬盘直接上传
ExternalResource res = ExternalResource.create(new File("./sunday.jpg"));
Image image = contact.uploadImage(res);
res.close(); // 记得关闭资源
contact.sendMessage(image);
```

// TODO 敬请期待
