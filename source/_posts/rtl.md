---
title: 食用软件无线电RTL-SDR
toc: ture
author: MengXin
avatar: https://cdn.jsdelivr.net/gh/MengXin001/CDN/Head.jpg
authorLink: /
authorAbout: 一个好奇的人
authorDesc: 一个好奇的人
categories: SDR
date: 2020-1-13 11:30:01
comments: true
tags: 
 - RTL-SDR
keywords: null
description: 一根电视棒RTL2832U+R820T2一根天线，可以使用电视棒送的小天线一台落灰的树莓派或电脑
photos: https://cdn.jsdelivr.net/gh/MengXin001/CDN/pic/download-1.jpg
---
### 关于RTLSDR
RTL-SDR这是一个低廉的家用消费档次的 DVB-T USB 接口的接收机的创新发明，一个完全的软件定义无线电。[^1]
<!--more-->
也就是俗称的电视棒,可以用较低的价格来玩转软件无线电
本文所用到的是RTL2832U+R820T2
### 食材
* 一根电视棒RTL2832U+R820T2（某宝上40左右即可买到）
* 一根天线，可以使用电视棒送的小天线
* 一台落灰的树莓派或电脑（本文两个环境会分别介绍）
### 开始食用
#### 树莓派搭建信号接受平台
系统为官方的Raspbian2018-1103
操作前建议先更换软件源，安利阿里云源

```bash
sudo apt-get update
sudo apt-get install cmake build-essential python-pip libusb-1.0-0-dev python-numpy git  # 安装依赖
git clone git://git.osmocom.org/rtl-sdr.git   #开始安装rtl-sdr
cd rtl-sdr/
mkdir build
cd build
cmake ../ -DINSTALL_UDEV_RULES=ON
make
sudo make install
sudo ldconfig
```
至此rtlsdr接受工作已经完成，接下来你可以食用freqshow直接在树莓派上显示，也可以通过rtl-tcp用windows下的sdrsharp软件来收听（windows和树莓派需位于同一局域网或树莓派所在网络开启了端口转发）。
在这里给出freqshow食用方法[^2]，但更推荐使用第二个操作
```bash
sudo pip install pyrtlsdr
cd ~
git clone https://github.com/adafruit/FreqShow.git
cd FreqShow
```
修改freqshow.py文件如下

```bash
# Initialize pygame and SDL to use the PiTFT display and chscreen.
#os.putenv('SDL_VIDEODRIVER', 'fbcon')
#os.putenv('SDL_FBDEV'      , '/dev/fb1')
#os.putenv('SDL_MOUSEDRV'   , 'TSLIB')
#os.putenv('SDL_MOUSEDEV'   , '/dev/input/touchscreen')
pygame.mouse.set_visible(True)
```
```bash
sudo python freqshow.py
#在freqshow目录里执行这个命令来启动freqshow
```
使用tcp转发操作起来就比较容易
执行`rtl_tcp -a 你的树莓派内网ip`
然后在windows上使用SDRSharp选择RTL_TCP，填入ip即可端口默认1234。


取消勾选RTLAGC
增益可自行拉下面的滑动条，取最合适的就可以。[软件可以进大佬群自取](https://jq.qq.com/?_wv=1027&k=55b9O0W)
#### Windows平台接受
依然要用到上面的软件（大佬群可以拿！）
先运行zadig进入Options选List All Devices就可以看到所有插在电脑上的rtl设备。选择rtl2832u点Reinstall Driver安装驱动。
运行#SDR选择RTL-USB/AM模式调节频率即可收听
### 在树莓派上Dump1090
建议在pi的根目录执行
```
git clone git://github.com/MalcolmRobb/dump1090.git
cd dump1090
make
```
安装完成后执行`./dump1090 -–interactive –-net`后在终端和访问树莓派的内网地址`ip:8080`即可显示上空飞机的信息


[^1]：来自百度百科https://baike.baidu.com/item/RTL-SDR/1338576
[^2]：freqshow安装过程参考https://learn.adafruit.com/freq-show-raspberry-pi-rtl-sdr-scanner/installation

