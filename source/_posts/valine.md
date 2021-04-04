---
title: 为你的Valine添加评论邮箱提醒
toc: true
author: MengXin
avatar: https://cdn.jsdelivr.net/gh/MengXin001/CDN/Head2.jpg
authorLink: /
authorAbout: 一个好奇的人
authorDesc: 一个好奇的人
categories: Hexo
date: 2020-3-15 15:15:01
comments: true
tags: 
 - Valine
keywords: Valine,邮箱提醒,Hexo
description: 这里以hexo-Sakura主题为例，编辑其中的comments.ejs。在原有的script中添加以下代码来支持邮件回复
headimg: https://i.loli.net/2020/03/20/HM2segWA8tjzldc.png
---
## 前言
作者在1.4.0+的版本中去除了邮件通知。过一段时间再看看commit修改下。
你现在可以使用1.3.10继续实现Valine的邮件通知或Valine-admin<!--more-->
## 主题配置
进入theme目录中你所使用的主题文件夹，这里以`hexo-Sakura`主题为例，编辑`layout/_partial/comments.ejs`。
在原有的`<script>`中添加以下代码
```JavaScript
var notify = 'true' ? true : false;
var verify = 'false' ? true : false;
var GUEST_INFO = ['nick','mail','link'];
var guest_info = 'nick,mail,link'.split(',').filter(function(item){
  return GUEST_INFO.indexOf(item) > -1
});
```
在`valine.init`中添加
```JavaScript
notify:notify
```
![添加](https://s1.ax1x.com/2020/03/15/83M3y4.png)

## 后台配置
访问[LeanCloud控制台](https://Leancloud.cn)
进入应用-设置-邮件模板
编辑`用于重置密码的邮件主题`
这里提供一个内容模板，可以自行修改内容
```HTML
<p>Hi, {{username}}</p>
<p>
你在气象观测/萌新的BLOG的评论收到了新的回复，请点击查看：
</p>
<center><a href="https://moex.club" style="display: inline-block; padding: 10px 20px; border-radius: 4px; background-color: #3090e4; color: #fff; text-decoration: none;">马上查看!</a></center>
```
收到回复的效果如下
![](https://i.loli.net/2020/03/15/HXsR8t4gMEf9dPe.jpg)
注：开启邮件回复提醒会valine自动开启评论验证码验证。

### Ad
气象观测站点上线啦！还不赶紧去看看
[点我直达](https://moex.club)

