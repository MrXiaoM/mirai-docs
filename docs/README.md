# 开发文档

### 在开发之前

你需要先越过 `mirai` **最大**的门槛：登录

登录部分[已经在用户文档中描述得非常详尽](noob.md#登录)了，请先把机器人QQ号登录到 `mirai` 上再进行开发

**本文档只讲比较基础/浅层的部分，若需深入还是需要去看官方的开发文档**

### 选择类型

在给你的项目新建文件夹之后，你先要决定你要写什么

是 `mirai-core` 衍生程序，还是 `mirai-console` 插件。

它们直接的区别是，`mirai-core` 衍生程序仅引用 `mirai` 核心，如果你的程序做不加载外部库等工作，它的扩展性将会极差；而 `mirai-console` 已经为你实现好了标准的插件接口，可同时加入多个插件，扩展性较强。

我比较推荐写 `mirai-console` 插件，在这里不教如何写 `mirai-core` 衍生程序了，因为只需要直接跳过，从[登录机器人](#登录机器人)部分开始看即可

**新建项目后**，先将下面这老三样作为库导入到项目，

如果是编写 `mirai-core` 衍生程序，只导入需要第一个

```
mirai-core-all
mirai-console
mirai-console-terminal
```

这几个库在 [maven 仓库](https://mvnrepository.com/) 都可以搜索到

### 编写插件特征

既然是 `mirai-console` 的插件，那就需要让 `mirai-console` 把你编译的 jar 给认出来

首先，创建资源文件 `META-INF/services/net.mamoe.mirai.console.plugin.jvm.JvmPlugin`

在里面填写插件主类的路径，格式为纯文本，例子如下，整个文件中的内容只有如下所示的这一行

```
top.mrxiaom.itisme.Natsuko
```

然后创建一个类，包名和类名如上，自己取名。让这个类继承 `JavaPlugin` 或者 `KotlinPlugin`，再填写插件相关信息即可。

在 Java 要**新建一个无参数的构造函数**并在里面将插件描述补上，**必须要无参数**的构造函数，并使用公开静态字段将其实例化

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

### 插件启用时

在你的插件被启用时，将会调用主类的 `onEnable` 方法，同理在插件被加载时会调用主类的 `onLoad` 方法，自行重写即可

### 登录机器人

如果你是使用 `mirai-console` 且不需要或者已有自动登录，你不需要看这一部分

// TODO 未完待续