---
title: Mesovortices更新
tags: [测试, 算法]
cover: https://preview.moexin.cn/img/SNOD_6H_2024012310_ec.png
date: 2024-1-28
---

## 代码测试

新版 Mesovortices 采用`Flowbite+TailwindCSS`布局。采用了伟大的`HarmonyOS_Regular`。

导航栏加入了 Avatar 和 Breadcrumb。因为新版布局取消了侧边导航栏，顶部导航栏又采用了多级菜单布局，所以无法直接显示当前页面，因此使用Breadcrumb确定当前页面。

## 登陆验证

```js
import axios from 'axios'

export const checkStatus = async function() {
    let retcode = 1
    let sign = localStorage.getItem('sign')
    let username = localStorage.getItem('username')
    if (sign && username) {
        retcode = await axios.post('api', {
            sign: sign,
            username: username
        }).then(x => x.data.code)
        if (retcode === 0) {
            return true
        } else {
            localStorage.removeItem('sign')
            return false
        }
    } else {
        return false
    }
}
```
使用`checkStatus`获取登录状态，`localStorage`长存储保存登录获取的`sign`与后端校验。
```js
checkStatus().then((res) => {
  if (res) {
    this.logstatus = false;
    this.username = localStorage.getItem("username");
  }
});
```
```js
import { defineStore } from 'pinia'
export const userStatusStore = defineStore('status', {
    state: () => ({ code: 0 }),
    getters: {
        isLogin : (state) => state.code == 1,
    },
    actions: {
        doLogin () {
            this.code = 1
        },
        doLogout () {
            this.code = 0
        }
    },
})
```
## 移动端布局

```js
/*
checkMobile
*/
export const checkMobile = () => {
    const sUserAgent = navigator.userAgent;
    const mobileAgents = [
        "Android",
        "iPhone",
        "Symbian",
        "WindowsPhone",
        "iPod",
        "BlackBerry",
        "Windows CE",
    ];
    let isMoblie = false;
    for (let i = 0; i < mobileAgents.length; i++) {
        if (sUserAgent.indexOf(mobileAgents[i]) > -1) {
            isMoblie = true;
            break;
        }
    }
    return isMoblie;
};
```
除去部分原生组件外，在桌面段虽然有看起来不错的布局，移动端的适应性却很差。同时Flowbite需要自己重新编写组件，Notify和Loading部分还要完善。