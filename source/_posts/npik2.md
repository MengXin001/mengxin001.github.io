---
title: 给NanoPiK2更换国内软件源
toc: ture
author: MengXin
avatar: https://cdn.jsdelivr.net/gh/MengXin001/CDN/Head3.jpg
authorLink: /
authorAbout: 一个好奇的人
authorDesc: 一个好奇的人
categories: NanoPi
date: 2020-7-26 11:30:01
comments: true
tags: 
 - Armbian
 - NanoPi K2
keywords: Armbian,NanoPiK2
description: 将Armbian系统的Nanopik2软件源更换为国内镜像软件源
headimg: https://i.loli.net/2020/07/26/r8hasf61OoVguU5.png
---
1.使用SSH或者在图形桌面下使用终端连接到你的NanoPiK2上
2.备份官方软件源
```
sudo cp /etc/apt/sources.list /etc/apt/sources.backup.list
```
3.更换软件源
这里使用[华为开源镜像站](https://mirrors.huaweicloud.com/)的镜像
```
sudo nano /etc/apt/sources.list
```
可以单独将`http://ports.ubuntu.com/`替换为`https://mirrors.huaweicloud.com/ubuntu-ports/`
也可以把全部内容用下面的内容替换
```
deb https://mirrors.huaweicloud.com/ubuntu-ports/ focal main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ focal main restricted universe multiverse

deb https://mirrors.huaweicloud.com/ubuntu-ports/ focal-security main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ focal-security main restricted universe multiverse

deb https://mirrors.huaweicloud.com/ubuntu-ports/ focal-updates main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ focal-updates main restricted universe multiverse

deb https://mirrors.huaweicloud.com/ubuntu-ports/ focal-backports main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ focal-backports main restricted universe multiverse
```
4.完成后使用`Ctrl+X`退出并输入`Y`+回车保存文件
5.更新软件源
```
sudo apt-get update
```
* * *
附一份官方源地址备份![](/images/pp-9.png)
``` sources.backup.list
deb http://ports.ubuntu.com/ focal main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ focal main restricted universe multiverse

deb http://ports.ubuntu.com/ focal-security main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ focal-security main restricted universe multiverse

deb http://ports.ubuntu.com/ focal-updates main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ focal-updates main restricted universe multiverse

deb http://ports.ubuntu.com/ focal-backports main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ focal-backports main restricted universe multiverse
```
