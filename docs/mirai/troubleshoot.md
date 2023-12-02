---
title: Mirai 疑难解答
description: 
---

::: tip
在这里将会有一些常见的问题及其解决方法，不定期更新。如果你有想要添加的内容，请联系QQ 2431208142 或电子信箱 [mrxiaom@qq.com](mailto:mrxiaom@qq.com)  
你也可以滚动到页面底部点击「编辑此页面」并发起一个 Pull Requests。  
撰写者请使用易于辩识、范围较广的标题，以方便阅览者寻找答案。
:::

# EncryptService.alert “报错”
```
2023-08-02 00:00:20 W/EncryptService.alert: Encrypt service was loaded: top.mrxiaom.qsign.QSignService$Factory@23056929
2023-08-02 00:00:20 W/EncryptService.alert: All outgoing message may be leaked by this service.
2023-08-02 00:00:20 W/EncryptService.alert: Use this service if and only if you trusted this service and the service provider.
2023-08-02 00:00:20 W/EncryptService.alert: Service details:
2023-08-02 00:00:20 W/EncryptService.alert:   `- Jvm Class: class top.mrxiaom.qsign.QSignService$Factory
2023-08-02 00:00:20 W/EncryptService.alert:   `- ClassLoader: JvmPluginClassLoader{qsign-dev.mirai2.jar}
2023-08-02 00:00:20 W/EncryptService.alert:   `- Source: file:/D:/Github/unidbg-fetch-qsign/debug-sandbox/plugins/qsign-dev.mirai2.jar
2023-08-02 00:00:20 W/EncryptService.alert:   `- Protected Domain: ProtectionDomain  (file:/D:/Github/unidbg-fetch-qsign/debug-sandbox/plugins/qsign-dev.mirai2.jar <no signer certificates>)
 JvmPluginClassLoader{qsign-dev.mirai2.jar}
 <no principals>
 java.security.Permissions@2b48f45a (
 ("java.io.FilePermission" "D:\Github\unidbg-fetch-qsign\debug-sandbox\plugins\qsign-dev.mirai2.jar" "read")
)
```
这样格式的**不叫报错**，这只是一个警告，同时意味着你的签名服务已经成功注册并使用了。

这个日志是 mirai 在警告你正在使用第三方签名服务，可能有数据泄露危险，并且把签名服务的详细地址打印出来让用户了解。

# 出现“云天明 章北海”信息后卡住了

可能是签名服务所在的机子配置比较差，或者签名服务死锁了。  
等待几分钟，如果一直卡住，重启 mirai 并重启签名服务。

# 请检查 xxx by xxxx:xx 的可用性

签名服务没有启动，或者签名服务地址填写错误。

检查签名服务是否已启动并正常运行，可以在浏览器访问签名服务地址看看能不能连上。

在 `KFCFactory.json` 检查协议对应的`签名服务类型`和`签名服务地址`是否正确。

# 没有找到 8.9.xx 的服务配置

去 `KFCFactory.json` 里添加配置，详见 [fix-protocol-version](https://github.com/cssxsh/fix-protocol-version) 的文档。

# 启动时插件报错
如果报错日志格式如下所示
```
Exception while enable 插件名
...
Caused by: ...PermissionRegistryConflictException...The base permission
```
100% 是重复安装插件，请到 plugins 文件夹检查是否有重复安装的插件。

------

# TxCaptchaHelper 不显示连接码

输入框内显示
```
java.lang.SocketTimeoutException
```
TxCaptchaHelper 现已弃用，请使用 [mirai-login-solver-sakura](https://github.com/KasukuSakura/mirai-login-solver-sakura)，安装配套的插件和安卓App

------

# 登录失败 -10003
```
Login Failed: Received packet returnCode = -10003, which may mean session expired.
```
这很可能是因为你的登录会话过期了。删除 `/bots/qq号/cache` 文件夹的所有 `session` 开头的文件再登录即可。

------

# 登录失败
通常我们在登录失败的时候，会收到一个数字代码和一串中文消息。一般格式是这样的

```
code=数字代码, title=标题, message=中文消息
```

一般标题没什么用，我们需要关心的是 `数字代码` 和 `中文消息`

首先，我们认为你已阅读[常见登录失败原因](/mirai/1-2)，这一部分仅对一些不确定的特殊例外情况进行补充。

## 40-存在被盗风险
```
Error(bot=Bot(), code=40, title=安全提醒, message=请确认你输入了正确的账号。该账号存在被盗风险，已进入保护模式，请前往安全中心恢复。, errorInfo= )
// code40 通常会伴随 code45
Error(bot=Bot(), code=45, title=禁止登录, message=你的账号涉嫌违规被限制在非常用设备登录，请更换常用设备后重新登录并根据提示进行解封。, errorInfo= )
```

之前踩过坑，说说解决方法吧。  
找你登录过机器人号的手机，登录机器人的号并按照提示解封就行。  

如果你已经没有手机之前登录过这个号了，可能以为这个号大概率已经寄了。 

登录失败提示信息在给你扣字眼，你以为只是限制了在非常用设备登录了，其实是冻结了，它在最后用“并根据提示进行解封”暗示你账号其实已经封了。

当你没有常用设备了，需要解除非常用设备禁止登录的状态有两种途径，一是和客服扯皮，二是等待一个月后再登录解冻。大约一个月时间，非常用设备禁止登录状态会自动解除。

## 45-不支持加密算法
```
Error(bot=Bot(), code=45, title=禁止登录, message=你当前使用的QQ版本过低，请前往QQ官网im.qq.com下载最新版QQ后重试。, errorInfo=)
```
```
Error(bot=Bot(), code=45, title=禁止登录, message=登录失败，建议升级最新版本后重试，或通过问题反馈与我们联系。, errorInfo=)
```

这是目前最常见的风控，由 mirai 没有实现协议所需加密算法所导致。

解决方法详见 [mirai 登录全解](/mirai/45)

## 235-版本过低

```
Error(bot=Bot(), code=235, title=温馨提示, message=当前QQ版本过低，请升级至最新版本后再登录。点击进入下载页面, errorInfo=)
```

近期有很多人都出现了这个问题，且按照表格「检查密码是否正确和密码长度是否在16以内」的方法无法解决。

~~这疑似是最新的风控，解决方法详见[论坛官方公告](https://mirai.mamoe.net/topic/223)~~

现在基本不会出现 code235 了，一般都是 code45

## 237-网络不稳定/存在安全风险
```
Error(bot=Bot(), code=237, title=安全提醒, message=当前网络不稳定，登录失败。推荐使用常用设备或通过手机号登录。, errorInfo=)
```
```
Error(bot=Bot(), code=237, title=安全提醒, message=当前登录存在安全风险，请使用常用设备或通过手机号登录。, errorInfo=)
```

总结，出现 code237 可能有以下问题

* 滑块验证操作被服务器认为不安全，你可以尝试 [mirai/1-2](https://wiki.mrxiaom.top/mirai/1-2) 章节中的方法解决滑块验证，优先用 sakura，一个方法用不了就换一个方法。
* ticket 输入错误，或滑块网页检测到环境异常返回了一个错误的 ticket
* 滑块验证操作速度过慢，被服务器认为用户网络不稳定
* 滑块验证次数过多被暂时拉黑 (过多是由服务器决定的，服务器认为你验证次数过多就是过多)
* 登录错误次数过多被服务器认为不安全
* 访问滑块网页时，滑块地址输入错误 (要完全复制，在终端直接点链接可能会截断)

[据 karlatemp 所说](https://github.com/mamoe/mirai/issues/2345#issuecomment-1312446705)，这表明设备信息和账户登录点已经被ban了，是错误的操作滑块验证所导致的。

如果你此前一直电脑使用浏览器通过滑块验证，请尝试在真实的 Android 手机使用[验证处理工具](https://github.com/KasukuSakura/mirai-login-solver-sakura)通过滑块验证。

并不是所有人都有这个问题，据了解，大部分人依然可以通过浏览器开发者工具的设备仿真，使用老方法来通过滑块验证。这个问题仍存在很多不确定性因素。

根据 [WorldLeen 的 issue](https://github.com/mamoe/mirai/issues/2347#issuecomment-1312464615)，登录错误次数过多也会出现这个问题。

::: tip
你可以使用 `235-版本过低` 的方法解决 237 问题。  
两者同为风控，本质上都是腾讯怀疑你被盗号，237 的风控等级更高。  
你需要把你的设备信息等删除干净 (删除 `bots/qq号` 文件夹) 再进行登录和处理验证。
:::

------

# MCL 初次启动红字

如果你打开 MCL 出现 Failed to xxxxxx 或者 timeout 之类的红字，且通常出现得较慢，内容较短，可能是你的网络无法访问 mirai 网络仓库，请按照以下链接的操作提示进行换源：  
https://mirai.mamoe.net/topic/1084

------

# MCL 无限提示重启更新
症状是每次启动都会弹这个提示
```
mcl 已升级请重新启动
```
该问题是 MCL 默认捆绑插件 mcl-addon 于 2.1.0 ([0bc3dc](https://github.com/iTXTech/mcl-addon/commit/d1ce0bc3dc7e73691d23a22863eb91a85c19c70d)) 引入，原因是有笨比让默认仓库只留了阿里云镜像，导致滑稽360的 fix 变成了 bug。

将 mcl-addon 更新到 2.1.1 或者删除即可解决问题。  
用 PowerShell (Windows) 或 终端 (Linux/MacOS) 在 MCL 所在文件夹下执行以下命令即可执行检查更新。
```
./mcl -u
```
系统没有 PowerShell 的话用 cmd 也行。

------

# 消息发送失败 resultType=46
```
java.lang.IllegalStateException: Send message failed: MessageSvcPbSendMsg.Response.Failed(resultType=46, errorCode=0, errorMessage=)
```
> 该问题将会在 2.14.0 及以后版本[显示解决方案](https://github.com/mamoe/mirai/commit/573f08955cdcf03223ef41c5bec76760bc4140e9)。

问题原因可能是账号被多次举报或被服务器认为不安全，可尝试访问 https://accounts.qq.com/safe/message/unlock?lock_info=5_5 解冻。

俗称风控。
