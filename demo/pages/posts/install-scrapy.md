---
title: 在NanoPi上安装Scrapy框架
toc: ture
author: 萌新
avatar: https://document-1254197101.cos.ap-guangzhou.myqcloud.com/hexo/pic/Head.jpg
authorLink: /
authorAbout: 一个好奇的人
authorDesc: 一个好奇的人
categories: NanoPi
date: 2020-7-27 20:00:00
comments: true
tags: 
 - Python
 - NanoPi K2
keywords: Python,NanoPiK2,Scrapy
description: 使用Armbian系统，已经预装Python3.8安装Scrapy框架
cover: https://preview.moexin.cn/img/f_00019d.jpg
---
以下操作在Armbian系统下进行，系统已经预装完成Python3.8。
1.安装`pip`
``` 
sudo apt-get install python3-pip
```
完成后输入`pip3 -V`检查是否安装成功，如果显示出当前`pip`版本则安装成功
2.安装Dev套件
``` 
sudo apt-get install python3-dev
```
没有开发依赖项在`Twisted`安装中会提示如下报错。被该报错困扰许久......
``` BASH
build/temp.linux-x86_64-2.7/twisted/test/raiser.o 
twisted/test/raiser.c:4:20: fatal error: Python.h: No such file or directory 
#include “Python.h” 
^ 
compilation terminated. 
error: command ‘x86_64-linux-gnu-gcc’ failed with exit status 1
```
3.安装Scarpy
```
pip3 install Scarpy
```
