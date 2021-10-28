---
description: 本文档只讲比较基础/浅层的部分，若需深入还是需要去看官方的开发文档
---

# 开发文档

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

// TODO 未完待续
