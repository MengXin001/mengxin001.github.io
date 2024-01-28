<script lang="ts" setup>
import { useFrontmatter, usePostList } from 'valaxy'

const frontmatter = useFrontmatter()
const posts = usePostList()

interface LinkType {
  avatar: string
  url: string
  color: string
  blog: string
  desc: string
}

const props = defineProps<{
  links: string | LinkType[]
}>()
</script>

<template>
  <article>
    <SakuraNav />
    <SakuraPageHeader :title="frontmatter.title" :cover="frontmatter.cover" :author="frontmatter.author" :date="frontmatter.date" />
    <div class="flinks">
      <ul class="flink-items">
        <li v-for="(link, i) in props.links" :key="i" class="flink-item" :style="`--primary-color: ${link.color}`">
          <a class="flink-url" p="x-4 y-2" :href="link.url" :title="link.blog" alt="portrait" rel="friend" target="_blank">
            <div class="flink-left">
              <img class="flink-avatar" width="64" height="64" w="16" h="16" loading="lazy" :src="link.avatar" :alt="link.blog" />
            </div>
            <div class="flink-info" m="l-2">
              <div class="flink-blog">{{ link.blog }}</div>
              <div class="flink-desc">{{ link.desc }}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.flink-item {
  display: inline-flex;
}

.flinks {
  .flink-items {
    display: flex;
    text-align: center;
    justify-content: center;
    flex-wrap: wrap;
    padding-left: 0;
  }

  .flink-url {
    --smc-link-color: var(--primary-color);
    display: inline-flex;
    text-align: center;
    justify-self: center;
    line-height: 1.5;
    margin: 0.5rem;
    transition: 0.2s;
    color: var(--primary-color, black);
    border: 1px solid var(--primary-color, gray);

    &:hover {
      color: white;
      background-color: var(--primary-color, gray);
      box-shadow: 0 2px 20px var(--primary-color, gray);
    }

    .flink {
      &-left {
        line-height: 0;
      }
      &-blog {
        font-weight: 800;
        font-family: 'HarmonyOS_Regular';
      }
      &-avatar {
        margin: 0;
        display: inline-flex;
        max-width: 100%;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid var(--primary-color, gray);
        transition: 0.5s;

        &:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
      }

      &-desc {
        font-size: 0.8rem;
        width: 10rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-family: 'HarmonyOS_Regular';
      }
    }
  }

  .flink-info {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
<style lang="scss">
@import 'https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css';

html {
  scroll-behavior: smooth;
  --global-font: 'HarmonyOS_Regular'
  --color-accent: #fe9600;
  --color-gray: #666;
  --color-text: #02111d;
  --color-background: #eee;
  --color-border: #d0d7de;
  --code-line-height: 24px;
  --code-font-family: monospace;
  --code-font-size: 15px;
   text-decoration: none
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--global-font);
  font-size: 16px;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
}

hr {
  border: none;
  border-bottom: 1px dashed var(--color-border);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: var(--color-accent);
}
</style>