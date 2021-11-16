# mirai-docs
[![](https://img.shields.io/badge/核心-mamoe/mirai-blue)](https://github.com/mamoe/mirai) [![](https://img.shields.io/badge/控制台-mamoe/mirai--console-blue)](https://github.com/mamoe/mirai-console) [![](https://img.shields.io/badge/HTTP接口实现-project--mirai/mirai--api--http-blue)](https://github.com/project-mirai/mirai-api-http)

面向初学者<sub>1</sub> 的 `mirai` 非官方帮助文档

在本文档中，我将会按照顺序一步一步地教学，~~就像打怪升级一样~~

**目前正在编写和整理中，敬请期待**

注<sub>1</sub>: `初学者` 指 `new miraier`，刚接触 `mirai` 的人

## 观前须知

请先阅读《[提问的智慧 (How To Ask Questions The Smart Way)](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md#提问的智慧)》以确保你在遇到简单的问题时能够 `STFW` (到网上搜索) 以及 `RTFM` (读软件给出的帮助手册) 来解决问题**而不是去问别人占用别人的时间**，如果你的问题**能搜索得到**，那你得到的回复很可能是**别人搜索了然后发你的**，

> 鲁迅曾经说过：“无端空耗别人的时间其实是无异于谋财害命的。”

所以在没到网上搜索之前不要提问！不要提问！不要提问！

在遇到网上搜索/读手册解决不了 (前提是要读过，要实践过确实不行) 再去以**正确的方式**提问，比如提供尽可能完整的信息，包括但不限于*系统版本/所使用的软件或组件版本/进行的详细操作/输出日志或者弹出信息*等等，而不是你问在吗，别人回答在，你问问题，别人找你要信息，你发信息，别人觉得信息不够推断不出来你的问题然后再进一步找你要信息…… **直接一步到位把信息提供全面难道不好吗？**

如果你有问题，可以在本仓库 [发布 issue](https://github.com/MrXiaoM/mirai-docs/issues/new) (没有 `Github` 账号？[点这里注册](https://github.com/signup))。

也可以向我的邮箱 `coolxiaom95@gmail.com` 发送邮件求助，

或者加我的QQ [2431208142](http://wpa.qq.com/msgrd?v=3&uin=2431208142&site=qq&menu=yes) (我没设加好友验证，申请添加好友之后**请直接说明来意和详细描述问题**)。

不管是在哪个渠道联系我，我看到你的消息之后将会在我空闲时尽快回复。

## 确认你的水平

在查阅这份文档之前，请确保你**已掌握 `kotlin` 或者 `java` 两门语言中的其中一门**

如果你**已掌握一门语言**并能使用这门语言进行**网络操作**，很抱歉目前我没有对这方面的研究，你可以[去查看官方文档](https://github.com/mamoe/mirai/blob/dev/docs/README.md#http-接口)

如果你是**完全不会编程**的人类，你只需要查阅[用户文档](docs/noob.md#用户文档)

> 如果你不是人类…… 能看得懂简体中文并能理解句子的意思的话大概也可以看得懂吧

## 开始吧

适合不会编程的新手: [用户文档](docs/noob.md#用户文档)

**如果你还不会如何安装和登录机器人，也请查阅用户文档**

使用 `kotlin` 或 `java` 来编写 `mirai` 衍生软件: [开发文档](docs/dev.md)

使用其他语言来编写 `mirai` 衍生软件: ~~暂无文档，建议查阅官方文档~~

> 在这个文档发布之前，已经有很多前辈编写了 `mirai-api-http` 或者 `onebot-kotlin` 的其他语言实现，你可以在 [mirai 官方开发文档](https://github.com/mamoe/mirai/blob/dev/docs/README.md#http-接口) 找到相应语言的社区SDK以便快速开始开发

如果你对更新 BlocklyMirai 有兴趣，可以查看 [BlocklyMirai 帮助文档](blocklymirai.md)

## 更新

不定期更新，如果你有意愿更新文档，[PRs welcome](https://github.com/MrXiaoM/mirai-docs/pulls)

## 赞助

**本文档不接受赞助。**

如果你喜欢这个文档并有意资助，开发组比我更需要赞助，请[重定向到 project-mirai/mirai-sponsor](https://github.com/project-mirai/mirai-sponsor/blob/main/README.md)

## 计划
* [ ] 开发文档以循循渐进的形式写，从部署到登录到事件到消息等等
* [ ] 不使用社区 SDK 的非 jvm 语言与 mirai-api-http 交互教程。因为社区 SDK 太多了很难讲明白 XD
* [ ] 考虑到 GitBook 日常前端崩溃，所以在本文档基本上完成之后，会在 MiraiForum 技术交流板块发一贴来备份以方便难以访问 Github 的用户查阅