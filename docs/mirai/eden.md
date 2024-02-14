---
title: 协议信息提取
description: 
---

本文档为 [MrXiaoM/Eden](https://github.com/MrXiaoM/Eden) 开发日记。

# 各参数位置 in 8983

| 参数 | 类/文件 | 详细位置 |
| --- | --- | --- |
| `app_id` = `sub_app_id` | `com.十美分.common.config.AppSetting` | `e` (phone) 和 `f` (pad) |
| `sort_version_name` | `com.十美分.common.config.AppSetting` | `l`，其值由 `StringBuilder` 生成，如`"8.9.83" + a`。 |
| `app_key` | `oicq.wlogin_sdk.report.event.EventConstant.EventType` | `EVENT_WT_LOGIN_PASSWORD.substring(0, EVENT_WT_LOGIN_PASSWORD.indexOf("_"))` |
| `build_time` | `oicq.wlogin_sdk.tools.util` | `BUILD_TIME` |
| `apk_sign` | `META-INF/ANDROIDR.RSA` | APK 签名 MD5 |
| `sdk_version` | `oicq.wlogin_sdk.tools.util` | `SDK_VERSION` |
| `sso_version` | `oicq.wlogin_sdk.tools.util` | `SSO_VERSION` |
| `misc_bitmap` | `oicq.wlogin_sdk.request.WtloginHelper` | `mMiscBitmap` |
| `main_sig_map` | `oicq.wlogin_sdk.request.WtloginHelper` | `mMainSigMap` |
| `sub_sig_map` | `oicq.wlogin_sdk.request.WtloginHelper` | `mSubSigMap` |
| `qua` | `assets/qua.ini` 或 `cooperation.qzone.QUA` | `QUA` |

APK 中解压出的 `AndroidManifest.xml` 是编码的，需要 [AXMLPrinter2](https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/android4me/AXMLPrinter2.jar) 解码，解码结果将会输出在终端。
```shell
java -cp AXMLPrinter2.jar test.AXMLPrinter AndroidManifest.xml
```
`app_id` 和 `sub_app_id` 也可以在 `AndroidManifest.xml` 中读取，分别为 `AppSetting_params` 和 `AppSetting_params_pad`，两者都值均为`#`之前的数字。  
不同渠道获得的安装包，`app_id`、`sub_app_id` 各不相同，同一个版本，不同渠道出现不同的 id 是正常的。

在 C#，`apk_sign` 可以这样获取
```csharp
var cert = X509Certificate.CreateFromCertFile("META-INF/ANDROIDR.RSA");
var apkSign = cert.GetCertHashString(HashAlgorithmName.MD5).ToLower();
```
在编写 Eden 时，签名 md5 已经很久没变过了，至少在 8983 版本，签名 md5 是 `a6b745bf24a2c277527716f6f36eb68d`。

# QUA 格式

`V1_AND_SQ_`+`版本号`+`_`+`版本代号`+`_`+`版本类型`

* 版本号 (version) 格式为 `#.#.##`
* 版本代号 (code) 为 APK 的纯数字版本号
* 版本类型 `YYB_D` 代表稳定版
* 版本类型 `HDBM_T` 或其它值代表测试版

除了上述表格中的方法，你还可以在内置浏览器中访问网页 https://ie.icoa.cn/，从 UserAgent 中找到 QUA。
