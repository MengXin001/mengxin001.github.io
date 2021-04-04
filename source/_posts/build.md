---
title: Hexo站点部署教程
author: MengXin
avatar: https://cdn.jsdelivr.net/gh/MengXin001/CDN/Head.jpg
authorLink: /
authorAbout: 
authorDesc: 
categories: Hexo
date: 2019-12-15 12:16:01
comments: true
toc: true
tags:
 - Web
keywords: 部署Hexo和Sakura主题教程
description: 在Hexo上Sakura主题部署教程。准备本地环境，在Node.js官网下载长期支持的Windows版本Node.js，在Git官网下载Windows版Git。部署到Github/腾讯云COS
photos: https://cdn.jsdelivr.net/gh/MengXin001/CDN/pic/IMG_3348.jpg
---
## 准备本地环境
### Nodejs
在Node.js官网下载长期支持的Windows版本Node.js。
###  Git
在Git官网下载Windows版Git
<!--more-->
## 部署到Github/腾讯云COS
### Github
登陆Github创建一个新的仓库，并命名为: *你的用户名.github.io*
![仓库命名](https://cdn.jsdelivr.net/gh/MengXin001/CDN/pic/Repository%20name.png)
打开刚刚安装Git的目录，运行Git-bash。

```BASH
输入 ssh-keygen -t rsa -C "你的Github账号邮箱地址"
```
接下来一直回车，最后提示ssh密钥已经保存在C://Users/电脑用户名/.ssh目录下面。
打开.pub文件，复制内容到Github的用户-个人设置-SSH and GPG Keys-SSH keys里面。选择Add ssh key。
### 安装Hexo
在本地新建一个文件夹并将Sakura主题文件复制到这个文件夹内
进入命令行cd到新建文件夹

```BASH
执行 
npm install hexo-cli -g
```
Hexo安装成功后安装npm的依赖。

```BASH
npm install
```
Hexo已经在本地安装完成，在命令行执行：

```BASH
hexo s
```
就可以在http://localhost中预览当前网页。
#### 主题的基本设置
> 博客根目录下的_config配置
> 以下引用自主题作者的Github说明文档，[原文](https://github.com/honjun/hexo-theme-sakura/blob/master/README-zh_cn.md)

站点
```yml
# Site
title: 你的站点名
subtitle:
description: 站点简介
keywords:
author: 作者名
language: zh-cn
timezone:
```

部署
```yml
deploy:
  type: git
  repo: 
    github: 你的github仓库地址
    # coding: 你的coding仓库地址
  branch: master
```

备份 （使用hexo b发布备份到远程仓库）
```yml
backup:
  type: git
  message: backup my blog of https://honjun.github.io/
  repository:
    # 你的github仓库地址,备份分支名  （建议新建backup分支）
    github: https://github.com/honjun/honjun.github.io.git,backup
    # coding: https://git.coding.net/hojun/hojun.git,backup

```

#### 主题目录下的_config配置

其中标明【改】的是需要修改部门，标明【选】是可改可不改，标明【非】是不用改的部分
```yml
# site name
# 站点名 【改】
prefixName: さくら荘その
siteName: hojun

# favicon and site master avatar
# 站点的favicon和头像 输入图片路径（下面的配置是都是cdn的相对路径，没有cdn请填写完整路径，建议使用jsdeliver搭建一个cdn啦，先去下载我的cdn替换下图片就行了，简单方便~）【改】
favicon: /images/favicon.ico
avatar: /img/custom/avatar.jpg

# 站点url 【改】
url: https://sakura.hojun.cn

# 站点介绍（或者说是个人签名）【改】
description: Live your life with passion! With some drive!

# 站点cdn，没有就为空 【改】  若是cdn为空，一些图片地址就要填完整地址了，比如之前avatar就要填https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/custom/avatar.jpg
cdn: https://cdn.jsdelivr.net/gh/honjun/cdn@1.6

# 开启pjax 【选】
pjax: 1

# 站点首页的公告信息 【改】
notice: hexo-Sakura主题已经开源，目前正在开发中...

# 懒加载的加载中图片 【选】
lazyloadImg: https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/loader/orange.progress-bar-stripe-loader.svg

# 站点菜单配置 【选】
menus:
  首页: { path: /, fa: fa-fort-awesome faa-shake }
  归档: { path: /archives, fa: fa-archive faa-shake, submenus: { 
    技术: {path: /categories/技术/, fa: fa-code }, 
    生活: {path: /categories/生活/, fa: fa-file-text-o }, 
    资源: {path: /categories/资源/, fa: fa-cloud-download }, 
    随想: {path: /categories/随想/, fa: fa-commenting-o },
    转载: {path: /categories/转载/, fa: fa-book }
  } }
  清单: { path: javascript:;, fa: fa-list-ul faa-vertical, submenus: { 
    书单: {path: /tags/悦读/, fa: fa-th-list faa-bounce }, 
    番组: {path: /bangumi/, fa: fa-film faa-vertical }, 
    歌单: {path: /music/, fa: fa-headphones },
    图集: {path: /tags/图集/, fa: fa-photo }
  } }
  留言板: { path: /comment/, fa: fa-pencil-square-o faa-tada }
  友人帐: { path: /links/, fa: fa-link faa-shake }
  赞赏: { path: /donate/, fa: fa-heart faa-pulse }
  关于: { path: /, fa: fa-leaf faa-wrench , submenus: { 
    我？: {path: /about/, fa: fa-meetup}, 
    主题: {path: /theme-sakura/, fa: iconfont icon-sakura },
    Lab: {path: /lab/, fa: fa-cogs },
  } }
  客户端: { path: /client/, fa: fa-android faa-vertical }
  RSS: { path: /atom.xml, fa: fa-rss faa-pulse }

# Home page sort type: -1: newer first，1: older first. 【非】
homePageSortType: -1

# Home page article shown number) 【非】
homeArticleShown: 10

# 背景图片 【选】
bgn: 8

# startdash面板 url, title, desc img 【改】
startdash: 
  - {url: /theme-sakura/, title: Sakura, desc: 本站 hexo 主题, img: /img/startdash/sakura.md.png}
  - {url: http://space.bilibili.com/271849279, title: Bilibili, desc: 博主的b站视频, img: /img/startdash/bilibili.jpg}
  - {url: /, title: hojun的万事屋, desc: 技术服务, img: /img/startdash/wangshiwu.jpg}


# your site build time or founded date
# 你的站点建立日期 【改】
siteBuildingTime: 07/17/2018


# 社交按钮(social)  url, img PC端配置 【改】
social:
  github: {url: http://github.com/honjun, img: /img/social/github.png}
  sina: {url: http://weibo.com/mashirozx?is_all=1, img: /img/social/sina.png}
  wangyiyun: {url: http://weibo.com/mashirozx?is_all=1, img: /img/social/wangyiyun.png}
  zhihu: {url: http://weibo.com/mashirozx?is_all=1, img: /img/social/zhihu.png}
  email: {url: http://weibo.com/mashirozx?is_all=1, img: /img/social/email.svg}
  wechat: {url: /#, qrcode: /img/custom/wechat.jpg, img: /img/social/wechat.png}

# 社交按钮(msocial)  url, img 移动端配置 【改】
msocial:
  github: {url: http://github.com/honjun, fa: fa-github, color: 333}
  weibo: {url: http://weibo.com/mashirozx?is_all=1, fa: fa-weibo, color: dd4b39}
  qq: {url: https://wpa.qq.com/msgrd?v=3&uin=954655431&site=qq&menu=yes, fa: fa-qq, color: 25c6fe}

# 赞赏二维码（其中wechatSQ是赞赏单页面的赞赏码图片）【改】
donate:
  alipay: /img/custom/donate/AliPayQR.jpg
  wechat: /img/custom/donate/WeChanQR.jpg
  wechatSQ: /img/custom/donate/WeChanSQ.jpg

# 首页视频地址为https://cdn.jsdelivr.net/gh/honjun/hojun@1.2/Unbroken.mp4，配置如下 【改】
movies:
  url: https://cdn.jsdelivr.net/gh/honjun/hojun@1.2
  # 多个视频用逗号隔开，随机获取。支持的格式目前已知MP4,Flv。其他的可以试下，不保证有用
  name: Unbroken.mp4

# 左下角aplayer播放器配置 主要改id和server这两项，修改详见[aplayer文档] 【改】
aplayer: 
  id: 2660651585
  server: netease
  type: playlist
  fixed: true
  mini: false
  autoplay: false
  loop: all
  order: random
  preload: auto
  volume: 0.7
  mutex: true

# Valine评论配置【改】
valine: true
v_appId: GyC3NzMvd0hT9Yyd2hYIC0MN-gzGzoHsz
v_appKey: mgOpfzbkHYqU92CV4IDlAUHQ
```
#### 补充：
歌单页面设置

```yml
---
title: music
date: 2018-12-20 23:14:28
keywords: 喜欢的音乐
description: 
comments: true
photos: 背景图地址
---
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=450 src="//music.163.com/outchain/player?type=0&id=网易云音乐歌单ID&auto=1&height=430"></iframe>
```
### 部署到Github
执行
```BASH
hexo g //生成静态页
hexo d //部署到仓库
```
第一次推送会提示输入Github用户名和密码并配置相关信息
推送成功即显示**Deploy done**
### 绑定自己的域名
现在你可以用xxx.github.io访问你的站点或者绑定自己的域名来访问
在source目录下新建一个文件（无后缀）:CNAME
用NotePad(能编辑这个文件的软件就可以)编辑内容为：你要绑定这个博客的域名。同时进入仓库-Settings拉到下面Custom Domain输入上边填写的域名。
### 腾讯云部署和CDN使用
#### COS
腾讯云COS部署你可能需要一个备案的域名，其提供50G免费额度存储+10GCDN流量/月+100w次请求(免费额度请以官网为准)。
你可以使用npm安装hexo的cos部署插件或者直接上传本地生成的public文件夹内容到存储桶内。
腾讯云对象存储的地域对访问速度影响不大。我同时用了成都，广州和北京三个地区的存储(因为之前成都服务区开放可以再嫖到50G的免费存储），在不开CDN的情况下下载大文件可以达到13M/s。
#### CDN
在Wordpress主站上用的是阿里云的全站内容动态加速，Hexo则用静态的CDN加速。这个站点用的是CloudFlare的CDN，对于国内访问延迟还是较大平均500ms但加载速度已经比GithubPage快很多了。用CF还是因为可以AntiDDoS，用Ali那是真的可以硬抗到流量用完。
你可以采用整站接入CDN，把绑定的域名绑定到CF上，再选择Proxy模式解析GithubPage。或者把页面里的图片/视频/Js;css等文件放到对象存储里，加载网页时从对象存储里获取。
### 备份
备份到远程仓库如腾讯云的工蜂Git(原代码托管?)，Github仓库，码云......