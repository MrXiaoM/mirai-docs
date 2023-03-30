---
title: 贡献文档
---

[PRs welcome](https://github.com/MrXiaoM/mirai-docs/pulls)

PR 标题尽可能简述你作出的变动，语言仅接受中文和英文，commit message 同理。

中文和西文（包括但不限于英文和阿拉伯数字）之间请用空格隔开，西文与中文标点间不需要隔开，示例：  
> 昨天 Tom 给我提交了一份 Pull Request，我还没有来得及看。mirai 2.15.0 好像更新了。

# 元数据

在文件头应当编写元数据，格式如下
```markdown
---
key: value
key: value
---
```
可用的元数据暂时有
| key | 描述 | 默认值 |
| --- | --- | --- |
| title | 页面标题，同时会作为在目录显示的名称 | No Title |
| description | 页面描述 | No Description |

所有元数据会参与模板中 `${key}` 的替换，页面模板文件详见 generator 分支的 template.html

# 额外语法

在引用块的结尾可以添加 `{.class}` 来修改 `<blockquote>` 的 class 属性，从而改变引用块的样式，示例如下。
```markdown
> 默认

> 信息
{.is-info}

> 警告
{.is-warning}

> 危险
{.is-danger}

> 成功
{.is-success}
```
> 默认

> 信息
{.is-info}

> 警告
{.is-warning}

> 危险
{.is-danger}

> 成功
{.is-success}