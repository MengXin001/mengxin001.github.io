---
title: 处理HY2/CFOSAT卫星SCA L2B数据
toc: ture
author: 萌新
avatar: https://document-1254197101.cos.ap-guangzhou.myqcloud.com/hexo/pic/Head.jpg
categories: Meteorology
date: 2021-10-30
updated: 2021-10-30
comments: true
tags: 
 - HY2
 - CFOSAT
description: 在处理SCAT微波散射计L2B级数据时的奇技淫巧......
---

## # Introduction

### **HaiYang 2** <sup>[1]</sup>
Operational Sat: HY-2B/HY-2C/HY-2D flying on Sunsynchronous orbit 
Instrument: SCAT (sso) 
Best quality: 50 km resolution; standard quality: 25 km resolution.  
Ku-band (13.25 GHz).  Near-global every day.  
### **Chinese-French Oceanography Satellite** <sup>[2]</sup>
Instrument: SCAT (CFOSAT) 
High quality data: 50 km resolution. Basic sampling: 10 km resolution.  
Rotating Fan-beam Scatterometer (RFSCAT). Ku-band (13.256 GHz), dual polarisation (HH and VV).  Global in one week.
## # Read
国家卫星海洋应用中心已通过实时FTP分发`HY-2B/2C/CFOSAT`卫星数据。  
HaiYang 系列卫星分发的SCA L2B数据为HDF5格式，CFOSAT 则为NetCDF格式。
在处理方式上海洋中心对HY卫星的处理为`OPER业务处理`而CFOSAT同时分发`OPER业务处理`和`EXPR快交付`两种，数据读取上有差异。此处只使用EXPR快交付产品。  
### Wind & Direction
``` python 
import h5py
import netCDF4
hy = h5py.File("H2B_OPER_SCA_L2B_OR_20210828T225139_20210829T003602_14257_pwp_250_07_owv.h5", "r")
cfo = netCDF4.Dataset("CFO_EXPR_SCA_C_L2B_OR_20210723T100441_15127_125_33_owv.nc")
lats = cfo.variables['wvc_lat'][:]
lons = cfo.variables['wvc_lon'][:] 
wind_speed = cfo.variables['wind_speed_selection'][:]
wind_dir = cfo.variables['wind_dir_selection'][:]
u = (wind_speed * np.sin(np.radians(wind_dir))
v = (wind_speed * np.cos(np.radians(wind_dir))
```

**注意:**  
 
* **使用`wind_dir_selection`而不是`wind_dir`以绘制正确风向**  

* **`wind_dir_selection`中的方向不再需要 - 180deg**  

## # Plot
BigShuiTai Plotter https://github.com/BigShuiTai/HY-CFOSAT-ASCAT-Wind-Data-Plotter (请等待使用正式发布的Version 1.0.0)
更多个性化设置详见Readme。
See https://github.com/BigShuiTai/HY-CFOSAT-ASCAT-Wind-Data-Plotter/issues/4