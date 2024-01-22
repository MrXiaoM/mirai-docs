---
title: Gensokyo
---

::: tip
本文已默认你已经成功安装并启动 Overflow，你可以在 [官网](https://mirai.mrxiaom.top) 打包下载 Overflow + mirai-console 整合包。
:::

首先到 [发布地址](https://github.com/Hoshinonyaruko/Gensokyo/releases) 根据你的系统下载相应构建，在终端或CMD执行 (下载文件的名称)
```shell
gensokyo-xxx
```
以运行 Gensokyo。

## 配置
打开生成的 `config.yml`，将自己的机器人信息填入，比如
- `app_id`
- `uin`
- `token`
- `client_secret`

然后
- 将 `array` 的值设为 `true`

## 配置 正向WS
在 Gensokyo 的配置文件 `config.yml` 中
- 找到 `port`，默认值是 `15630`
- 找到 `ws_server_path`，默认值是 `ws`
- 找到 `ws_server_token`，默认值是 `12345`，推荐修改为更复杂的随机密码

连接地址就是 `ws://127.0.0.1:port/ws_server_path`，比如 `ws://127.0.0.1:15630/ws`

在 Overflow 配置文件 `overflow.json` 中
- 将 `ws_host` 的值设为上面获得的连接地址
- 将 `token` 的值设为上面获得的 `ws_server_token` 的值

接下来启动 Gensokyo 和 Overflow 即可，不需要再进行下一步配置了。

## 配置 反向WS
在 Overflow 配置文件 `overflow.json` 中
- 将 `reversed_ws_port` 的值设为一个空闲的端口号，比如 `23345`
- 将 `token` 的值设为一个随机字符串，越复杂越好，比如 `aHR0cHM6Ly9taXJhaS5tcnhpYW9tLnRvcC8=`

启动 Overflow，如果提示正在等待连接，则端口号没有被占用，进行下一步操作

在 Gensokyo 的配置文件 `config.yml` 中
- 将 `ws_address` 的值设为 `["ws://127.0.0.1:端口/"]`，这里的`端口`是上面 Overflow 设置的 `reversed_ws_port`
- 将 `ws_token` 的值设为 `["令牌"]`，这里的`令牌`是上面 Overflow 设置的 `token`

接下来启动 Gensokyo 和 Overflow 即可，不需要再进行下一步配置了。
