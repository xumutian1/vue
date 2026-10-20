<script setup>
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/article'

const articleStore = useArticleStore()
const { articleTimeline, articleCount } = storeToRefs(articleStore)
</script>

<template>
  <main class="page-content projects-page">
    <section class="intro-banner">
      <p class="eyebrow">NOTES / JOURNAL</p>
      <h1>文章记录</h1>
      <p>学习过程中的想法、笔记与项目复盘。共 {{ articleCount }} 篇。</p>
    </section>
    <section class="article-list" aria-label="文章列表">
      <el-card v-for="article in articleTimeline" :key="article.id" shadow="never" class="article-card">
        <div class="article-row">
          <time class="article-date" :datetime="article.createdAt">{{ article.createdAt }}</time>
          <div class="article-copy">
            <el-tag size="small" effect="plain">{{ article.category }}</el-tag>
            <h2>{{ article.title }}</h2>
            <p>{{ article.excerpt }}</p>
            <p class="article-content">{{ article.content }}</p>
          </div>
        </div>
      </el-card>
      <el-empty v-if="!articleTimeline.length" description="暂时还没有文章" />
    </section>
  </main>
</template>