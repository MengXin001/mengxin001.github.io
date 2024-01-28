---
title: 配置气象云图绘图工具-Satpy
toc: ture
author: 萌新
avatar: https://document-1254197101.cos.ap-guangzhou.myqcloud.com/hexo/pic/Head.jpg
categories: Meteorology
date: 2021-10-22
comments: true
updated: 2021-10-30
description: 一款新鲜的Python气象绘图软件持续更新ing<br>Just A New Toy
---
### 前言
在网上新寻找到的一款工具，目前绘制FY-4A/FY-3D/Sentinel3/
参考[朝曦dawn](https://github.com/zxdawn) & [官方Doc](https://satpy.readthedocs.io/en/stable/overview.html)
* 支持多种合成产品:雾；沙尘；真彩色等

### Install
为了确保安装正确，请使用`conda`; 下载 [Miniconda](https://docs.conda.io/en/latest/miniconda.html)
```
$ conda create -c conda-forge -n my_satpy_env python satpy
$ conda activate my_satpy_env
```
### Start
绘制全圆盘真彩色图像。准备一份FY-4A的4KM全圆盘L1数据。
``` Python
import os, glob
from satpy.scene import Scene
filenames = glob.glob('C://Users/Moe/Desktop/FY4A-_AGRI*4000M_V0001.HDF')
scn = Scene(filenames, reader='agri_l1')
composite = 'true_color'
scn.load([composite])
scn.save_dataset(composite, \filename='{sensor}_{name}.png')
```
### 单通道绘制示例
使用Satpy自带的`scn.crop`框定区域，与使用投影相比使用范围会受到限。
```Python
channel = "C02"
filenames = glob.glob('C:/Users/Administrator/Desktop/FY4A*')
scn = Scene(filenames, reader='agri_l1')
scn.load([channel])
lonmin, latmin, lonmax, latmax = 115, 32, 130, 47
scn_c = scn.crop(ll_bbox=(lonmin, latmin, lonmax, latmax))
sat_w_tb_vis = scn_c[Channel].values
area_def = scn_c[Channel].attrs['area']
crs = area_def.to_cartopy_crs()
fig, ax = plt.subplots(subplot_kw=dict(projection=ccrs.PlateCarree()))
ax.set_extent([lonmin, lonmax, latmin, latmax], crs=ccrs.PlateCarree())
img = plt.imshow(sat_w_tb_vis, origin='upper', cmap=plt.cm.binary_r, extent=crs.bounds, transform=crs)
plt.savefig('4A_AGRI.png', dpi=300, bbox_inches='tight')
```
---

### 拓展阅读 
* **More Useful Skills** https://www.dapiya.top/?p=71
* **Dealing with the problem when lon > 180** https://github.com/pytroll/satpy/issues/1828

![](https://gitee.com//MengXin546/CDN/raw/master/img/FengYun-4A_cartopy_202110210630.jpg)


