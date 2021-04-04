---
title: 关于Hexo部署报错
author: MengXin
avatar: https://cdn.jsdelivr.net/gh/MengXin001/CDN/Head2.jpg
authorLink: /
authorAbout: 
authorDesc: 
categories: Hexo
date: 2020-3-21 23:16:01
comments: true
toc: true
tags:
 - Note
 - Hexo
keywords: Hexo,index.lock
description: 解决Hexo部署时fatal Unable to create /.deploy_git/.git/index.lock
photos: https://i.loli.net/2020/03/21/ktwgru57FDSf6Oo.png
---

## Hexo部署报错笔记
<!--more-->
```BASH
fatal: Unable to create 'C:/Users/Administrator/Desktop/Hexo-theme-sakura-master/.deploy_git/.git/index.lock': File exists.
Another git process seems to be running in this repository, e.g.
an editor opened by 'git commit'. Please make sure all processes
are terminated then try again. If it still fails, a git process
may have crashed in this repository earlier:
remove the file manually to continue.
FATAL Something's wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html
```
由于上一次部署意外关闭造成该报错，显示隐藏文件夹并删除`.deploy_git/.git/index.lock`文件即可
![](https://i.loli.net/2020/03/21/ktwgru57FDSf6Oo.png)
