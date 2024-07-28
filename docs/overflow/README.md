---
title: Overflow
description: mirai 迁移计划
---

官网：https://mirai.mrxiaom.top/

仓库地址：https://github.com/MrXiaoM/Overflow

## 部署教程
- ~~[基于 OpenShamrock](/overflow/openshamrock) (XPosed/LSPatch hook)~~ *已失去支持*
- [基于 Gensokyo](/overflow/gensokyo) (官方机器人转 Onebot)
- [基于 LLOnebot](/overflow/llonebot) (注入插件到 QQNT 客户端并放出 Onebot 服务)

## 附属插件
+ [overflow-shamrock-ext](https://github.com/project-tRNA/overflow-shamrock-ext) 将数据上传到 Shamrock 接口，而非使用 base64 方式传输图片、语音、视频等媒体消息
+ [LocalFileService](https://github.com/MrXiaoM/LocalFileService) 以**本地文件路径**而非 base64 方式传输图片、语音、视频等媒体消息
