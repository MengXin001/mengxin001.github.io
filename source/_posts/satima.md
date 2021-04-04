---
title: 配置气象云图绘图工具-SatimaV4
toc: ture
author: MengXin
avatar: https://cdn.jsdelivr.net/gh/MengXin001/CDN/Head3.jpg
categories: Meteorology
date: 2021-2-5 20:36:18
comments: true
tags: 
 - Python
 - Himawari8
keywords: Python,NanoPiK2,Scrapy
description: 在Linux & Windows系统上，配置SatimaV4云图绘制工具开始高效绘图

---

## 关于
SatimaV4由[CyanideCN](https://github.com/CyanideCN/SatimaV4)制作，在Linux和Windows均可实现高效的对Himawari8的DAT数据进行绘制，自带了15种色阶。此外在进行额外的插件补充后支持更多卫星如FY-4A的HDF数据进行绘图。本文将尽可能详细的写出步骤，作为一篇避坑指南。
```
//自带色阶
1.CA 2.NRL89 3.RAMMB 4.CC 5.CWBM 6.O 7.BD 8.RBTOP 9.NHC 10.RB 11.MB 12.AVN 13.BDCOLOR 14.COLOR 15.BW
```

## 配置
### 环境
* Python 3.6+
* Pip3

### 必备库

建议使用华为云开源镜像站作为Pypi安装的软件源，[方法见](https://mirrors.huaweicloud.com/)


``` BASH
sudo apt-get update
sudo apt-get install proj  # Proj 4.9.0
```
``` Python
dask   #可能需要执行 pip3 install "dask[array]" --upgrade
toolz
numpy
netCDF4
matplotlib==3.3.3
cartopy==0.18.0
```

## 安装

``` bash
git clone https://github.com/CyanideCN/SatimaV4.git
```
安装`Courier New`字体到系统中，没有该字体也不会影响正常出图。
`Cartopy`将会从naciscdn获取海岸线数据，在国内访问速度较慢。建议手动下载文件并解压放置于自己当前用户的`/home/pi/.local/share/cartopy/shapefiles/natural_earth/physical`路径，Ps:用户名记得改成自己的！[CoastLine国内下载链接](https://cdn.jsdelivr.net/gh/MengXin001/CDN@1.8.0.2/safe/ne_10m_coastline.zip)
核对文件
```
pi@nanopik2-s905:~$ cd /home/pi/.local/share/cartopy/shapefiles/natural_earth/physical
pi@nanopik2-s905:~/.local/share/cartopy/shapefiles/natural_earth/physical$ ls
ne_10m_coastline.cpg  ne_10m_coastline.dbf  ne_10m_coastline.prj  ne_10m_coastline.README.html  ne_10m_coastline.shp  ne_10m_coastline.shx  ne_10m_coastline.VERSION.txt

```
存档一份H8DAT数据（在P-TREE或NICT下载）进入到SatimaV4目录。
``` Python
pi@nanopik2-s905:~$ cd /Desktop/SatimaV4
pi@nanopik2-s905:~/Desktop/SatimaV4$ python3 Satima.py # 运行
Loaded module satima.satellites.abi
Loaded module satima.satellites.ahi
Loaded module satima.satellites.mersi
Loaded module satima.satellites.microwave
Loaded module satima.satellites.viirs
----------------------------
SatimaV4 restructured by PY. Version 1.0
----------------------------
Enter data directory, press enter to use current directory: /home/pi/Desktop/SatimaV4  # 输入数据所在目录(绝对路径)
1.[H8][TARGET] 2020.12.20 07:45 # 显示数据信息
Enter file index: 1 # 选择绘制数据序号
[IR][BAND13] # 数据通道
1.CA 2.NRL89 3.RAMMB 4.CC 5.CWBM 6.O 7.BD 8.RBTOP 9.NHC 10.RB 11.MB 12.AVN 13.BDCOLOR 14.COLOR 15.BW # 自带色阶
Enter image options, separated by comma: 1# 选择色阶
Task(band=13, georange=None, cmap='CA')
findfont: Font family ['Courier New'] not found. Falling back to DejaVu Sans.
20.620737233577472# 绘制完成，输出在数据同一目录
```
