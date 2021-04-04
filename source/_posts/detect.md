---
title: 体验腾讯云万象优图
author: MengXin
avatar: https://cdn.jsdelivr.net/gh/MengXin001/CDN/Head.jpg
authorLink: /
authorAbout: 
authorDesc: 
categories: Shell
date: 2019-12-31 23:16:01
comments: true
toc: true
tags:
 - Note
keywords: 腾讯云万象优图
description: 关于腾讯云万象优图的使用配置和注意事项。获取腾讯云账号APP ID。配置云 API 公钥，配置优图 bucket。首先在终端执行以下命令，创建目录try-pi，然后进入到该目录：创建 init.sh 文件
photos: https://cdn.jsdelivr.net/gh/MengXin001/CDN/pic/IMG_3219.JPG
---
[原文](https://cloud.tencent.com/developer/labs/lab/10071)，本文只作笔记说明下部分地方自己使用时发现的问题，少量步骤省略。
## 初始化配置
使用万象优图图片鉴黄 API 接口
<!--more-->
获取腾讯云账号 APP ID
配置云 API 公钥/密钥
配置优图 bucket
首先在终端执行以下命令，创建目录 /data/try-pi，然后进入到该目录：

```BASH
mkdir -p /data/try-pi && cd $_
```
然后在目录 /data/try-pi 下创建 init.sh 文件

```BASH
#!/bin/bash

#########################################
# 基础配置
#########################################

# 腾讯云账号 APP ID
# 在如下单引号内填入你的 APPID
export APP_ID=''

# 云 API 公钥
# 在如单引号内填入你的 SecretID
export SECRET_ID=''

# 云 API 密钥
# 在如下单引号内填入你的 SecretKey
export SECRET_KEY=''

# 优图 bucket 名称
# 如果你创建的 bucket 名称不叫 trial，替换为自己创建的即可
export BUCKET_NAME='trial'
```
在云Api控制台中创建响应的ID和KEY
## 将配置项导出为环境变量
在终端中执行以下命令，将各配置项导出为 Shell 环境变量：
```BASH
source init.sh
```
## 生成鉴权签名
将创建脚本来生成有效期为 30 天的多次有效的签名。在目录 /data/try-pi 下创建 gen-sign.sh 文件，然后在文件中贴入以下脚本：

```BASH
#!/bin/bash

#########################################
# 生成多次有效的鉴权签名（有效期 30 天） 
# @see https://cloud.tencent.com/document/product/460/6968
#########################################

# 当前时间戳（秒）
current_time=$(date +%s)

# 到期时间戳（秒）
expire_time=$(($current_time + 30 * 24 * 60 * 60))

# 随机串，无符号 10 进制整数（不大于 10 位）
rand='4815162342'

# 历史遗留字段，写死为 0
user_id='0'

# 拼接签名串
str="a=$APP_ID&b=$BUCKET_NAME&k=$SECRET_ID&e=$expire_time&t=$current_time&r=$rand&u=$user_id";

# 使用 HMAC-SHA1 算法对签名串加密
sign=$(echo -n $str | openssl dgst -sha1 -hmac $SECRET_KEY -binary)

# 对加密串进行 Base64 编码
sign=$(echo -n $sign$str | base64)

# 移除多余的空格得到最终的鉴权签名
sign=$(echo -n $sign | tr -d ' ')

# 导出鉴权签名
export AUTH_SIGN=$sign
```
### 将签名导出为环境变量
你应该在执行`source init.sh`后再执行该命令！
```BASH
source gen-sign.sh
```
## 准备鉴黄脚本
仍旧在目录 /data/try-pi 下创建 detect-porn.sh 文件，然后在文件中贴入以下脚本：
```BASH
#!/bin/bash

#########################################
# 鉴黄脚本
# @see https://cloud.tencent.com/document/product/460/6900
#########################################

# 图片鉴黄 API 地址
END_POINT='https://service.image.myqcloud.com/detection/porn_detect'

# 使用帮助
function usage() {
  echo ""
  echo "-h --help"
  echo "-r --remote-image=网络图片地址"
  echo "-l --local-image=本地图片地址"
  echo ""
}

# 对网络图片进行鉴黄
function detect_remote() {
  remote_image=$1

  curl -X POST \
       -H "Content-Type: application/json" \
       -H "Authorization: $AUTH_SIGN" \
       -d '{"appid":'$APP_ID',"bucket":"'$BUCKET_NAME'","url_list":["'$remote_image'"]}' \
       --silent \
       $END_POINT
}

# 对本地图片进行鉴黄
function detect_local() {
  local_image=$1

  curl -X POST \
       -H "Content-Type: multipart/form-data" \
       -H "Authorization: $AUTH_SIGN" \
       -F "appid=$APP_ID" \
       -F "bucket=$BUCKET_NAME" \
       -F "image[0]=@$local_image" \
       --silent \
       $END_POINT
}

# 解析命令入参
while [ "$1" != "" ]; do
  PARAM=`echo $1 | awk -F= '{print $1}'`
  VALUE=`echo $1 | awk -F= '{print $2}'`

  case $PARAM in
    -h | --help)
      usage
      exit
      ;;

    -r | --remote-image)
      detect_remote $VALUE
      ;;

    -l | --local-image)
      detect_local $VALUE
      ;;

    *)
      echo "ERROR: 未知参数 \"$PARAM\""
      exit 1
      ;;
  esac
  shift
done
```
完成后测试该脚本是否可以正常运行
`bash detect-porn.sh --remote-image='https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/event/pc/ci-identify/css/img/demo/demo_8.jpg'`
如果出现Code：5可以再次先后执行`source init.sh`和`source gen-sign.sh`。
在每次重启设备后也要重新执行`source init.sh`和`source gen-sign.sh`。{测试于Raspbian树莓派}
2019最后一篇，再祝新年快乐！
