---
title: 处理风云四号02星AGRI L1数据
toc: ture
author: 萌新
avatar: https://document-1254197101.cos.ap-guangzhou.myqcloud.com/hexo/pic/Head.jpg
categories: Meteorology
date: 2022-06-01
updated: 2022-06-01
comments: true
tags: 
 - FY4B
description: 使用Satpy读取FY-4B AGRIL1级数据......
cover: https://preview.moexin.cn/img/9da82ba5gy1h2u5v8nud0j21cw0xxkjm.jpg
---

## 前言
2022年6月1日，自FY4B发射近整整一年后，国家气象卫星中心正式开放下载数据。目前定位于132.7°E，投影位置于133°E。
## 改造
鉴于Satpy还无正式发布FY-4B AGRI的Reader，所以在4A的Reader基础上临时手搓一份。  
4B的存储路径稍微发生改变，同时4B的轨道静止成像仪新增一个`6.95µm`水汽通道，原先的10通道中心波长换至`7.42µm`。涉及到对于AB星的判断，所以此处没有在YAML里对波段进行增减处理，等待进一步规范。
PS:现阶建议使用GEO文件获得更好的瑞利散射校正。
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Copyright (c) 2019 Satpy developers
#
# This file is part of satpy.
#
# satpy is free software: you can redistribute it and/or modify it under the
# terms of the GNU General Public License as published by the Free Software
# Foundation, either version 3 of the License, or (at your option) any later
# version.
#
# satpy is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along with
# satpy.  If not, see <http://www.gnu.org/licenses/>.
"""Advanced Geostationary Radiation Imager reader for the Level_1 HDF format.
The files read by this reader are described in the official Real Time Data Service:
    http://fy4.nsmc.org.cn/data/en/data/realtime.html
"""

import logging
from datetime import datetime

import dask.array as da
import numpy as np
import xarray as xr

from satpy.readers._geos_area import get_area_definition, get_area_extent
from satpy.readers.hdf5_utils import HDF5FileHandler

logger = logging.getLogger(__name__)

# info of 500 m, 1 km, 2 km and 4 km data
RESOLUTION_LIST = [500, 1000, 2000, 4000]
_COFF_list = [10991.5, 5495.5, 2747.5, 1373.5]
_CFAC_list = [81865099.0, 40932549.0, 20466274.0, 10233137.0]
_LOFF_list = [10991.5, 5495.5, 2747.5, 1373.5]
_LFAC_list = [81865099.0, 40932549.0, 20466274.0, 10233137.0]

CHANS_ID = 'NOMChannel'
SAT_ID = 'NOMSatellite'
SUN_ID = 'NOMSun'

PLATFORM_NAMES = {'FY4A': 'FY-4A',
                  'FY4B': 'FY-4B',
                  'FY4C': 'FY-4C'}


def scale(dn, slope, offset):
    """Convert digital number (DN) to calibrated quantity through scaling.
    Args:
        dn: Raw detector digital number
        slope: Slope
        offset: Offset
    Returns:
        Scaled data
    """
    ref = dn * slope + offset
    ref = ref.clip(min=0)
    ref.attrs = dn.attrs

    return ref


def apply_lut(data, lut):
    """Calibrate digital number (DN) by applying a LUT.
    Args:
        data: Raw detector digital number
        lut: the look up table
    Returns:
        Calibrated quantity
    """
    # append nan to the end of lut for fillvalue
    lut = np.append(lut, np.nan)
    data.data = da.where(data.data > lut.shape[0], lut.shape[0] - 1, data.data)
    res = data.data.map_blocks(_getitem, lut, dtype=lut.dtype)
    res = xr.DataArray(res, dims=data.dims,
                       attrs=data.attrs, coords=data.coords)

    return res


def _getitem(block, lut):
    return lut[block]


class HDF_AGRI_L1(HDF5FileHandler):
    """AGRI l1 file handler."""

    def __init__(self, filename, filename_info, filetype_info):
        """Init filehandler."""
        super(HDF_AGRI_L1, self).__init__(filename, filename_info, filetype_info)

    def get_dataset(self, dataset_id, ds_info):
        """Load a dataset."""
        ds_name = dataset_id['name']
        logger.debug('Reading in get_dataset %s.', ds_name)
        file_key = ds_info.get('file_key', ds_name)
        if "FY4B" in self.filename:
            if CHANS_ID in file_key:
                data = self.get("Data/" + file_key)
            elif SUN_ID in file_key or SAT_ID in file_key:
                data = self.get("Navigation/" + file_key)
        else:
            data = self.get(file_key)

        data = self.get(file_key)

        if data.ndim >= 2:
            data = data.rename({data.dims[-2]: 'y', data.dims[-1]: 'x'})

        data = self.calibrate(data, ds_info, ds_name, file_key)

        self.adjust_attrs(data, ds_info)

        return data

    def adjust_attrs(self, data, ds_info):
        """Adjust the attrs of the data."""
        satname = PLATFORM_NAMES.get(self['/attr/Satellite Name'], self['/attr/Satellite Name'])
        data.attrs.update({'platform_name': satname,
                           'sensor': self['/attr/Sensor Identification Code'].lower(),
                           'orbital_parameters': {
                               'satellite_nominal_latitude': self['/attr/NOMCenterLat'].item(),
                               'satellite_nominal_longitude': self['/attr/NOMCenterLon'].item(),
                               'satellite_nominal_altitude': self['/attr/NOMSatHeight'].item()}})
        data.attrs.update(ds_info)
        # remove attributes that could be confusing later
        data.attrs.pop('FillValue', None)
        data.attrs.pop('Intercept', None)
        data.attrs.pop('Slope', None)

    def calibrate(self, data, ds_info, ds_name, file_key):
        """Calibrate the data."""
        # Check if calibration is present, if not assume dataset is an angle
        calibration = ds_info.get('calibration')
        # Return raw data in case of counts or no calibration
        if calibration in ('counts', None):
            data.attrs['units'] = ds_info['units']
            ds_info['valid_range'] = data.attrs['valid_range']
        elif calibration == 'reflectance':
            channel_index = int(file_key[-2:]) - 1
            data = self.calibrate_to_reflectance(data, channel_index, ds_info)

        elif calibration == 'brightness_temperature':
            data = self.calibrate_to_bt(data, ds_info, ds_name)
        elif calibration == 'radiance':
            raise NotImplementedError("Calibration to radiance is not supported.")
        # Apply range limits, but not for counts or we convert to float!
        if calibration != 'counts':
            data = data.where((data >= min(data.attrs['valid_range'])) &
                              (data <= max(data.attrs['valid_range'])))
        else:
            data.attrs['_FillValue'] = data.attrs['FillValue'].item()
        return data

    def calibrate_to_reflectance(self, data, channel_index, ds_info):
        """Calibrate to reflectance [%]."""
        logger.debug("Calibrating to reflectances")
        # using the corresponding SCALE and OFFSET
        if "FY4B" in self.filename:
            cal_coef = 'Calibration/CALIBRATION_COEF(SCALE+OFFSET)'
        else:
            cal_coef = 'CALIBRATION_COEF(SCALE+OFFSET)'
        num_channel = self.get(cal_coef).shape[0]
        if num_channel == 1:
            # only channel_2, resolution = 500 m
            channel_index = 0
        data.attrs['scale_factor'] = self.get(cal_coef)[channel_index, 0].values.item()
        data.attrs['add_offset'] = self.get(cal_coef)[channel_index, 1].values.item()
        data = scale(data, data.attrs['scale_factor'], data.attrs['add_offset'])
        data *= 100
        ds_info['valid_range'] = (data.attrs['valid_range'] * data.attrs['scale_factor'] + data.attrs['add_offset'])
        ds_info['valid_range'] = ds_info['valid_range'] * 100
        return data

    def calibrate_to_bt(self, data, ds_info, ds_name):
        """Calibrate to Brightness Temperatures [K]."""
        logger.debug("Calibrating to brightness_temperature")
        lut_key = ds_info.get('lut_key', ds_name)
        if "FY4B" in self.filename:
            lut = self.get("Calibration/" + lut_key)
        else:
            lut = self.get(lut_key)
        # the value of dn is the index of brightness_temperature
        data = apply_lut(data, lut)
        ds_info['valid_range'] = lut.attrs['valid_range']
        return data

    def get_area_def(self, key):
        """Get the area definition."""
        res = key['resolution']
        pdict = {}
        pdict['coff'] = _COFF_list[RESOLUTION_LIST.index(res)]
        pdict['loff'] = _LOFF_list[RESOLUTION_LIST.index(res)]
        pdict['cfac'] = _CFAC_list[RESOLUTION_LIST.index(res)]
        pdict['lfac'] = _LFAC_list[RESOLUTION_LIST.index(res)]
        pdict['a'] = self.file_content['/attr/dEA'] * 1E3  # equator radius (m)
        pdict['b'] = pdict['a'] * (1 - 1 / self.file_content['/attr/dObRecFlat'])  # polar radius (m)
        pdict['h'] = self.file_content['/attr/NOMSatHeight']  # the altitude of satellite (m)

        pdict['ssp_lon'] = self.file_content['/attr/NOMCenterLon']
        pdict['nlines'] = self.file_content['/attr/RegLength']
        pdict['ncols'] = self.file_content['/attr/RegWidth']

        pdict['scandir'] = 'S2N'

        b500 = ['C02']
        b1000 = ['C01', 'C03']
        b2000 = ['C04', 'C05', 'C06', 'C07']

        pdict['a_desc'] = "AGRI {} area".format(self.filename_info['observation_type'])

        if key['name'] in b500:
            pdict['a_name'] = self.filename_info['observation_type']+'_500m'
            pdict['p_id'] = 'FY-4A, 500m'
        elif key['name'] in b1000:
            pdict['a_name'] = self.filename_info['observation_type']+'_1000m'
            pdict['p_id'] = 'FY-4A, 1000m'
        elif key['name'] in b2000:
            pdict['a_name'] = self.filename_info['observation_type']+'_2000m'
            pdict['p_id'] = 'FY-4A, 2000m'
        else:
            pdict['a_name'] = self.filename_info['observation_type']+'_4000m'
            pdict['p_id'] = 'FY-4A, 4000m'

        pdict['coff'] = pdict['coff'] + 0.5
        pdict['nlines'] = pdict['nlines'] - 1
        pdict['ncols'] = pdict['ncols'] - 1
        pdict['loff'] = (pdict['loff'] - self.file_content['/attr/End Line Number'] + 0.5)
        area_extent = get_area_extent(pdict)
        area_extent = (area_extent[0], area_extent[1], area_extent[2], area_extent[3])

        pdict['nlines'] = pdict['nlines'] + 1
        pdict['ncols'] = pdict['ncols'] + 1
        area = get_area_definition(pdict, area_extent)

        return area

    @property
    def start_time(self):
        """Get the start time."""
        start_time = self['/attr/Observing Beginning Date'] + 'T' + self['/attr/Observing Beginning Time'] + 'Z'
        return datetime.strptime(start_time, '%Y-%m-%dT%H:%M:%S.%fZ')

    @property
    def end_time(self):
        """Get the end time."""
        end_time = self['/attr/Observing Ending Date'] + 'T' + self['/attr/Observing Ending Time'] + 'Z'
        return datetime.strptime(end_time, '%Y-%m-%dT%H:%M:%S.%fZ')
```
## 合成
红色通道校正方案及绿色波段的计算，由[vff](https://github.com/WP19VFF)提供。
新建AGRI合成脚本，BandMath：`(C02-0.13*C03)/0.87`
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Copyright (c) 2015-2017 Satpy developers
#
# This file is part of satpy.
#
# satpy is free software: you can redistribute it and/or modify it under the
# terms of the GNU General Public License as published by the Free Software
# Foundation, either version 3 of the License, or (at your option) any later
# version.
#
# satpy is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along with
# satpy.  If not, see <http://www.gnu.org/licenses/>.
"""Composite classes for the AGRI instrument."""

import logging

from satpy.composites import GenericCompositor

LOG = logging.getLogger(__name__)


class SimulatedGreen(GenericCompositor):

    def __init__(self, name, fractions=(0.7, 0.2, 0.1), **kwargs):
        """Initialize fractions for input channels.

        Args:
            name (str): Name of this composite
            fractions (iterable): Fractions of each input band to include in the result.

        """
        self.fractions = fractions
        super(SimulatedGreen, self).__init__(name, **kwargs)

    def __call__(self, projectables, optional_datasets=None, **attrs):
        """Generate the single band composite."""
        c01, c02, c03 = self.match_data_arrays(projectables)
        res = c01 * self.fractions[0] + c02 * self.fractions[1] + c03 * self.fractions[2]
        res.attrs = c03.attrs.copy()
        return super(SimulatedGreen, self).__call__((res,), **attrs)

class RedCorrection(GenericCompositor):

    def __init__(self, name, fractions=(0.87, 0.13), **kwargs):
        self.fractions = fractions
        super(RedCorrection, self).__init__(name, **kwargs)

    def __call__(self, projectables, optional_datasets=None, **attrs):
        """Generate the single band composite."""
        c02, c03 = self.match_data_arrays(projectables)
        res = (c02 - c03 * self.fractions[1]) / 0.87
        res.attrs = c03.attrs.copy()
        return super(RedCorrection, self).__call__((res,), **attrs)
```
