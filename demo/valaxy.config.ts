/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
import { defineValaxyConfig } from 'valaxy'
import type { ThemeConfig, ThemeUserConfig } from 'valaxy-theme-sakura'
/**
 * User Config
 */
export default defineValaxyConfig<ThemeUserConfig>({
  // site config see site.config.ts

  theme: 'sakura',

  themeConfig: {
    // colors: {
    //   primary: '#e67474',
    // },

    prefixName: '萌の',
    siteName: '新えか',

    homeTitle: 'Hello, Sakura',
    homeMotto: 'You got to put the past behind you before you can move on.',

    favicon: false, // 导航栏图标

    headerWallpaper: {
      // 壁纸类型:
      // - 'video': 视频
      // - 'image': 图片
      type: 'image',
      // 图片壁纸链接
      imageUrl: 'https://preview.moexin.cn/img/bangumi.jpg',
      // 视频壁纸链接
      videoUrl: 'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4',

      // 背景样式选项:
      // - '': 无特效，显示原图
      // - 'filter-dim': 阴影效果
      // - 'filter-grid': 横条效果
      // - 'filter-dot': 点点效果
      backgroundStyle: 'filter-dot',
    },

    // 导航栏
    nav: [
      {
        text: '首页',
        icon: 'i-ri-home-line',
        link: '/',
      },
      {
        text: '归档',
        icon: 'i-ri-checkbox-indeterminate-line',
        link: '/archive',
      },
      {
        text: '留言板',
        icon: 'i-ri-ball-pen-lin',
        link: '/comment',
      },
      {
        text: '友人账',
        link: '/links',
        icon: 'i-ri-links-line',
      },
      {
        text: '关于',
        icon: 'i-ri-discord-fill',
        link: '/about',
      },

      {
        text: 'GitHub',
        icon: 'i-ri-github-fill',
        link: 'https://github.com/MengXin001',
      },
      {
        text: 'RSS',
        icon: 'i-ri-rss-fill',
        link: '/atom.xml',
      },
      {
        text: 'Valaxy →',
        icon: 'i-ri-cloud-fill',
        link: 'https://github.com/YunYouJun/valaxy',
      },
    ],

    // 页脚配置
    footer: {
      since: 2019,

      icon: {
        img: '/favicon.ico',
        animated: true,
        url: 'https://www.moexin.cn',
        title: '萌新',
      },
    },
  },
})

/**
 * generateSafelist by config
 * @param themeConfig
 */
export function generateSafelist(themeConfig: ThemeConfig) {
  const safelist: string[] = []

  const footerIcon = themeConfig.footer?.icon?.name
  if (footerIcon)
    safelist.push(footerIcon)

  return safelist
}
