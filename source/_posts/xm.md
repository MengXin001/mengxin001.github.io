---
title: 读取米家蓝牙温湿度计数据
toc: ture
author: MengXin
avatar: https://cdn.jsdelivr.net/gh/MengXin001/CDN/Head3.jpg
authorLink: /
authorAbout: 一个好奇的人
authorDesc: 一个好奇的人
categories: Bluetooth
date: 2021-2-1
comments: true
tags: 
 - Bluetooth
keywords: 
description: 读取米家温湿度计二代LYWSD03MMC数据进行本地存档......
photos: https://tva4.sinaimg.cn/large/0072Vf1pgy1foxkj3yaqcj31kw0w0kgs.jpg
---

## 前言
由于米家APP云端只能存储半年的传感器数据，所以给出一个可以进行本地归档的方案
* 通过BLE连接温湿度计不需要进行米家APP上的配对
* 获取数据的设备需要支持蓝牙4.0或以上协议
* 推荐使用树莓派等各类开发板进行处理归档

## 开始
这里使用iOS端上的`LightBlue`软件进行数据获取
在`Peripherals`页面搜索找到编号为`LYWSD03MMC`的设备连接。
连接传感器成功后找到`Temperature and Humidity`项(`UUID: EBE0CCC1-7A0A-4B0C-8A1A-6FF2997DA3A6`)
{% frame iphone11 | img=https://gitee.com//MengXin546/CDN/raw/master/img/DG0W~SMQYT2@G_{}~PEFB7G.jpg %}
点击`Listen for notifications`监听传感器广播的温湿度数据。数据示例
```
0x240946170B
0x250946170B
0x250946170B
0x240946170B
0x1F0946640B
0x000000 ---空数据
```

## 解码
以Hex数据`1F0946640B`为例
将十六进制数据两两分组得五组数据将其编号
```
1F
09
46
64
0B
```

#### 温度数据
传感器精度为小数点后两位小数，官方取小数点后一位数据，这里可以自行选择精度。
	1.取分组后的数据前两组`1F` `09`。
	2.将数据反序排列为`09` `1F`。（十六进制第一位不能为0，转换时舍去0实际输入`91F`）
	3.转为十进制得到数字`2335`。
	4.十进制数字÷100得`23.35`，此数据即为当前得温度数据
#### 湿度数据
1.取分组后的第三组数据`46`
2.转换为十进制数据得`70`，即为当前湿度数据。
后面两组数据暂时没有摸索出来用途，0B组似乎是固定数值没有变动。

## On Raspberry
推荐使用Gatttool与Bluez组合，[参考文章](https://blog.csdn.net/qq_33433070/article/details/78668105)。
当然上述只是对数据的解码提出的思路，进行本地归档还需要带家用Python或者其他语言进行处理

