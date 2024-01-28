import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  lang: 'zh-CN',
  title: '萌の新えか',
  favicon: '/favicon.ico',
  url: 'https://www.moexin.cn/',
  author: {
    avatar: 'https://document-1254197101.cos.ap-guangzhou.myqcloud.com/hexo/pic/Head.jpg',
    name: '萌新',
  },
  description: 'Valaxy Theme Sakura Preview.',
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/Mengxin001',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '微博',
      link: 'https://weibo.com/u/5851630216',
      icon: 'i-ri-weibo-line',
      color: '#E6162D',
    },
    {
      name: '豆瓣',
      link: 'https://www.douban.com/people/yunyoujun/',
      icon: 'i-ri-douban-line',
      color: '#007722',
    },
    {
      name: '网易云音乐',
      link: 'https://music.163.com/#/user/home?id=247102977',
      icon: 'i-ri-netease-cloud-music-line',
      color: '#C20C0C',
    },
    {
      name: '知乎',
      link: 'https://www.zhihu.com/people/xinmoe',
      icon: 'i-ri-zhihu-line',
      color: '#0084FF',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/88076801',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/a_tqmbot',
      icon: 'i-ri-twitter-line',
      color: '#1da1f2',
    },
    {
      name: 'E-Mail',
      link: 'mailto:3309939798@qq.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
  ],

  comment: {
    enable: true,
  },
})
