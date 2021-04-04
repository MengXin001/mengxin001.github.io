---
title: 在树莓派上安装AdGuardHome
author: MengXin
avatar: https://cdn.jsdelivr.net/gh/MengXin001/CDN/Head2.jpg
authorLink: /
authorAbout: 
authorDesc: 
categories: Raspberry
date: 2020-3-20 12:16:01
comments: true
toc: true
tags:
 - 树莓派
 - AdGuard
keywords: Ad,AdGuard,AdGuardHome,raspberry,树莓派,Linux
description: 连接你的树莓派，从Github获取发布的AdGuardHome
photos: https://i.loli.net/2020/03/20/PiFQIGW2mnbVD63.png
---
## 下载
连接你的树莓派，从Github获取发布的AdGuardHome
<!--more-->
<center><iframe frameborder="0" scrolling="0" allowtransparency="true" src="https://api.2heng.xin/github-card/?repo=AdguardTeam/AdGuardHome" width="400" height="153" style="margin-left: 50%; transform: translateX(-50%);"></iframe></center>

```BASH
wget https://github.com/AdguardTeam/AdGuardHome/releases/download/v0.101.0/AdGuardHome_linux_arm.tar.gz
```

```BASH
# 解压
tar -xvzf AdGuardHome_linux_arm.tar.gz
cd AdGuardHome
# screen后台运行
screen -S Ad
sudo ./AdGuardHome
```
## AdGuardHome配置
访问`树莓派内网IP:3000`进入后台
设置账户密码，建议在路由器中分配静态内网IP给树莓派。
![Set](https://i.loli.net/2020/03/20/mdPE4kcgeuhax3o.jpg)
完成设置后Login进入控制台
![Main](https://i.loli.net/2020/03/20/PiFQIGW2mnbVD63.png)

## DNS配置
在过滤器中勾选自带的过滤器并应用。
还可以添加Adgk的广告过滤规则。添加以下链接并应用更新规则。建议修改规则自动更新时间为24Hours

```
https://gitee.com/banbendalao/adguard/raw/master/ADgk.txt
```
在DNS设置中设置上游DNS，不推荐使用默认的CloudFlareDNS，可以使用以下国内的公共DNS

```
Ali DNS: 223.5.5.5;223.6.6.6
Baidu DNS: 180.76.76.76
Tencent DNS: 119.29.29.29
oneDNS: 117.50.11.11
CNNIC sDNS: 1.2.4.8
114DNS: 114.114.114.114(推荐设置为备用DNS)
```
点击测试DNS服务器可用后，应用设置。
## 设备接入
将需要接入的设备WIFIDNS设置为树莓派的内网IP即可，在AdGuardHome后台有详细的设置教程。
## 拦截追踪
接入设备后，访问一些网站就可以在AdGuardHome后台看到拦截的情况了。这是使用一晚上拦截追踪的情况。
![](https://i.loli.net/2020/03/20/DZEFyMPQmw9pO2C.png)

|追踪器地址                   |拦截次数 |
|------------------------------|------|
| pingma\.qq\.com              | 121  |
| pos\.baidu\.com              | 97   |
| mqqeve\.beacon\.qq\.com      | 95   |
| ieventlog\.beacon\.qq\.com   | 81   |
| hm\.baidu\.com               | 63   |
| mqqstr\.beacon\.qq\.com      | 51   |
| vortex\.data\.microsoft\.com | 51   |
| mttstr\.beacon\.qq\.com      | 48   |
| sp0\.baidu\.com              | 44   |
| wspeed\.qq\.com              | 41   |
| adashbc\.ut\.taobao\.com     | 41   |
| dup\.baidustatic\.com        | 39   |
| show\-g\.mediav\.com         | 38   |
| sp1\.baidu\.com              | 38   |
| d\.ifengimg\.com             | 37   |
| pingjs\.qq\.com              | 36   |
| e\.crashlytics\.com          | 35   |
| mobilelog\.upqzfile\.com     | 35   |
| www\.google\-analytics\.com  | 34   |
| mtteve\.beacon\.qq\.com      | 33   |
| ulogs\.umeng\.com            | 33   |
| ulogs\.umengcloud\.com       | 31   |
| ios\.bugly\.qq\.com          | 30   |
| app\-measurement\.com        | 30   |
| eclick\.baidu\.com           | 29   |