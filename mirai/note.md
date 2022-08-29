---
title: 公开备忘录
description: 
published: true
date: 2022-07-29T13:17:37.407Z
tags: 
editor: markdown
dateCreated: 2022-07-29T13:17:31.258Z
---

# 公开备忘录

站长没有多少时间继续编写下面的内容，在此存一些在未来会放入维基的未分类内容

# 获取下一个 Event
```java
var channel = GlobalEventChannel.INSTANCE.parentScope(MiraiSeleniumPlugin.INSTANCE);

CompletableFuture<MessageEvent> future = new CompletableFuture<>();

channel.subscribeOnce(MessageEvent.class, future::complete);

MessageEvent event = future.get();
MessageEvent event = future.get(3, TimeUnit.MINUTES);
```
java 堵塞获取下一个 Event 的 比较合适的写法
