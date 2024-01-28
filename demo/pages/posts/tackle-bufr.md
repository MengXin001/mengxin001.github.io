---
title: 处理中国地区BUFR探空数据
author: 萌新
avatar: https://document-1254197101.cos.ap-guangzhou.myqcloud.com/hexo/pic/Head.jpg
authorLink: /
authorAbout: 
authorDesc: 
categories: Hexo
date: 2022-2-2 11:00:00
comments: true
toc: true
tags:
 - Hexo
description: 安利 Upperair_bufr Lib --- 快速上手处理BUFR气象探空数据
cover: https://document-1254197101.cos.ap-guangzhou.myqcloud.com/hexo/pic/SKEWT_20220202000000_45004.png
---


### # 前情提要
由于种种不明因素<sup>???</sup>，官方渠道的探空数据进一步收紧。Wyoming极为便利的查询网站对于中国境内数据也多数缺少高空部分的数据，少部分渠道数据且用且珍惜。![](https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/valine/aru/aru-17.gif)
CMA每天需要向各国共享基本站点的00/12Z探空数据，其中共享的数据格式为BUFR(数据质量很不错)。先前在Github搜寻一圈使用过ecmwf/eccodes（ECMWF's GRIB and BUFR encoding/decoding library）进行处理，但对于进行探空可视化所需的读取过于繁杂。

前几天Pyy老师开源了**CyanideCN/TaxolLib**包含许多的Libs，其中的 `upperair_bufr.py` 使用pybufrkit进行读取，已经预先处理好了各类要素的编号，大大减轻了处理负担。  
  
稍做处理返回要素数据，配套`metpy`库可以计算各类指数。
```python
	def get_data(self, station_id):
			df = self.query(station_id)
			pres = df['pressure']
			temp = df['temperature']
			dwpt = df['dewpoint']
			wdir = df['wind_direction']
			wspd = df['wind_speed']
			alt = df['geopotential']
			return pres, temp, dwpt, wdir, wspd, alt
```
```python
Sounding = SoundingDecoder('C:/Users/Administrator/Desktop/Sat/SatData/Upper_air/A_IUKN09BABJ300000_C_RJTD_20220130013517_60.bufr')
data = Sounding.query("52836")
pres, temp, dwpt, wdir, wspd, alt = Sounding.get_data("52836")
print(alt)
```

同时也可以使用`to_sharppy`直接生成SHARPPy格式的探空数据，丢入SHARPPy绘制分析。
```python
import datetime
date = "2022013001351"
dtime = datetime.datetime.strptime(date, '%Y%m%d%H%M%S')
outdir = 'C:/Users/Administrator/Desktop/Sat/SatData/Upper_air'
Sounding = SoundingDecoder('C:/Users/Administrator/Desktop/Sat/SatData/Upper_air/A_IUKN09BABJ300000_C_RJTD_20220130013517_60.bufr')
out = Sounding.to_sharppy("52836", dtime, outdir)
```
这里贴一份upperair_bufr.py，还请大家给Pyy老师一个Star！[**CyanideCN/TaxolLib**](https://github.com/CyanideCN/TaxolLib/blob/main/upperair_bufr.py)
```python
# https://github.com/CyanideCN/TaxolLib/blob/main/upperair_bufr.py

import os
from pybufrkit.dataquery import NodePathParser, DataQuerent
from pybufrkit.decoder import Decoder
import numpy as np
from pandas import DataFrame

def dump_msg(msg):
    return np.array(list(msg.values())[0][0], float).ravel()

def safe_number(arr):
    nanpos = np.isnan(arr)
    arr_new = arr.copy()
    if nanpos.any():
        arr_new[nanpos] = -9999
    return arr_new

def decimal_fmt(num):
    return '{:.2f}'.format(num)

def format_str(tup):
    tup = map(decimal_fmt, tup)
    fmt = '{:>7},{:>10},{:>10},{:>10},{:>10},{:>10}\n'.format(*tup)
    return fmt

class SoundingDecoder(object):

    CODE_PRES = '007004'
    CODE_TMP = '012101'
    CODE_TD = '012103'
    CODE_HGT = '010009'
    CODE_WDIR = '011001'
    CODE_WSPD = '011002'
    CODE_BLOCK = '001001'
    CODE_ID = '001002'

    def __init__(self, file):
        decoder = Decoder()
        f = open(file, 'rb')
        self.msg = decoder.process(f.read())
        f.close()
        self.id_list = self._station_list()

    def _station_list(self):
        q = DataQuerent(NodePathParser())
        wmo_block = q.query(self.msg, self.CODE_BLOCK).results
        wmo_id = q.query(self.msg, self.CODE_ID).results
        def ravel(l):
            return [i for j in l for i in j]
        id_list = [str(i) + str(j).zfill(3) for i, j in zip(ravel(wmo_block.values()), ravel(wmo_id.values()))]
        return np.array(id_list)

    def _query(self, subset_num):
        TEMPLATE = '@[{}] > {}'
        q = DataQuerent(NodePathParser())
        df = DataFrame()
        pres_msg = q.query(self.msg, TEMPLATE.format(subset_num, self.CODE_PRES)).results
        df['pressure'] = dump_msg(pres_msg) / 100
        tmp_msg = q.query(self.msg, TEMPLATE.format(subset_num, self.CODE_TMP)).results
        df['temperature'] = dump_msg(tmp_msg) - 273.15
        td_msg = q.query(self.msg, TEMPLATE.format(subset_num, self.CODE_TD)).results
        df['dewpoint'] = dump_msg(td_msg) - 273.15
        hgt_msg = q.query(self.msg, TEMPLATE.format(subset_num, self.CODE_HGT)).results
        df['geopotential'] = dump_msg(hgt_msg)
        wdir_msg = q.query(self.msg, TEMPLATE.format(subset_num, self.CODE_WDIR)).results
        df['wind_direction'] = dump_msg(wdir_msg)
        wspd_msg = q.query(self.msg, TEMPLATE.format(subset_num, self.CODE_WSPD)).results
        df['wind_speed'] = dump_msg(wspd_msg)
        # Basic QC
        df = df.fillna(value={'dewpoint':-9999}) # Fill missing dewpoint at high levels
        df = df.interpolate(method='linear', limit_direction='forward', axis=0).drop_duplicates('geopotential').sort_values(by='geopotential')
        return df.fillna(-9999) # Fill Nans in starting level

    def query(self, station_id):
        if station_id not in self.id_list:
            raise ValueError('Station not found')
        id_idx = (station_id == self.id_list).nonzero()
        subset_num = id_idx[0][0]
        return self._query(subset_num)

    def to_sharppy(self, station_id, dtime, outdir):
        df = self.query(station_id)
        fname = 'SKEWT_' + dtime.strftime('%Y%m%d%H0000') + '_' + station_id +'.txt'
        outpath = os.path.join(outdir, fname)
        f = open(outpath, 'w')
        f.write('%TITLE%\n')
        f.write(' {}   {}\n\n'.format(station_id, dtime.strftime('%y%m%d/%H%M')))
        f.write('   LEVEL       HGHT       TEMP       DWPT       WDIR       WSPD\n')
        f.write('-------------------------------------------------------------------\n')
        f.write('%RAW%\n')
        for data in zip(safe_number(df['pressure']), safe_number(df['geopotential']),
                        safe_number(df['temperature']), safe_number(df['dewpoint']),
                        safe_number(df['wind_direction']), safe_number(df['wind_speed'] * 1.9438)):
            formatted = format_str(data)
            f.write(formatted)
        f.write('%END%')
        f.close()
        return outpath
```