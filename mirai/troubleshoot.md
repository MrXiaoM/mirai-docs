---
title: Mirai 疑难解答
description: 
published: true
date: 2022-11-25T04:18:11.142Z
tags: 
editor: markdown
dateCreated: 2022-11-15T18:28:30.605Z
---

> 在这里将会有一些常见的问题及其解决方法，不定期更新。如果你有想要添加的内容，请联系QQ 2431208142 或电子信箱 [mrxiaom@qq.com](mailto:mrxiaom@qq.com)  
> 撰写者请使用易于辩识、范围较广的标题，以方便阅览者寻找答案。
{.is-info}

# 启动时插件报错
如果报错日志格式如下所示
```
Exception while enable 插件名
...
Caused by: ...PermissionRegistryConflictException...The base permission
```
100% 是重复安装插件，请到 plugins 文件夹检查是否有重复安装的插件。

------

# 登录失败 -10003
```
Login Failed: Received packet returnCode = -10003, which may mean session expired.
```
这很可能是因为你的登录会话过期了。到 `/bots/qq号/` 文件夹删除除了 `device.json` 以外的所有文件再登录即可。

------

# 登录失败
通常我们在登录失败的时候，会收到一个数字代码和一串中文消息。一般格式是这样的

```
code=数字代码, title=标题, message=中文消息
```

一般标题没什么用，我们需要关心的是 `数字代码` 和 `中文消息`

首先，我们认为你已阅读[常见登录失败原因](https://wiki.mrxiaom.top/zh/mirai/%E4%BD%BF%E7%94%A8_%E5%9C%A8%E6%8E%A7%E5%88%B6%E5%8F%B0%E7%99%BB%E5%BD%95)，这一部分仅对一些不确定的特殊例外情况进行补充。

## 235-版本过低

```
Error(bot=Bot(), code=235, title=温馨提示, message=当前QQ版本过低，请升级至最新版本后再登录。点击进入下载页面, errorInfo=)
```

近期有很多人都出现了这个问题，且按照表格「检查密码是否正确和密码长度是否在16以内」的方法无法解决。

这疑似是最新的风控，解决方法详见[论坛官方公告](https://mirai.mamoe.net/topic/223)

## 237-网络不稳定
```
Error(bot=Bot(), code=237, title=安全提醒, message=当前网络不稳定，登录失败。推荐使用常用设备或通过手机号登录。, errorInfo=)
```
[据 karlatemp 所说](https://github.com/mamoe/mirai/issues/2345#issuecomment-1312446705)，这表明设备信息和账户登录点已经被ban了，是错误的操作滑块验证所导致的。

如果你此前一直电脑使用浏览器通过滑块验证，请尝试在真实的 Android 手机使用[验证处理工具](https://github.com/KasukuSakura/mirai-login-solver-sakura)通过滑块验证。

并不是所有人都有这个问题，据了解，大部分人依然可以通过浏览器开发者工具的设备仿真，使用老方法来通过滑块验证。这个问题仍存在很多不确定性因素。

根据 [WorldLeen 的 issue](https://github.com/mamoe/mirai/issues/2347#issuecomment-1312464615)，登录错误次数过多也会出现这个问题。

## 237-存在安全风险
```
Error(bot=Bot(), code=237, title=安全提醒, message=当前登录存在安全风险，请使用常用设备或通过手机号登录。, errorInfo=)
```

鉴于错误代码与”网络不稳定“一致，请按照以上方法尝试解决。

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