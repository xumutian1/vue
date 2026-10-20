<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../stores/project'

const route = useRoute()
const projectStore = useProjectStore()
const { getProjectById } = storeToRefs(projectStore)
// 动态路由参数 :id 从共享项目数据中定位详情记录。
const project = computed(() => getProjectById.value(route.params.id))
</script>

<template>
  <main v-if="project" class="page-content detail-page">
    <RouterLink class="detail-back" :to="{ name: 'projects' }">← 返回项目列表</RouterLink>
    <section class="detail-hero"><p class="eyebrow">PROJECT DETAIL / {{ project.type }}</p><h1>{{ project.name }}</h1><p>{{ project.description }}</p><div class="project-tags"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div></section>
    <section class="detail-facts"><div><span>项目类型</span><strong>{{ project.type }}</strong></div><div><span>项目状态</span><strong>{{ project.status }}</strong></div><div><span>技术标签</span><strong>{{ project.tags.join(' · ') }}</strong></div></section>
    <section class="detail-note"><p class="eyebrow">PROCESS NOTE</p><p>这里记录我在{{ project.type }}方向上的阶段性实践，后续会继续补充设计思路、实现过程与新的收获。</p></section>
  </main>
  <main v-else class="page-content not-found"><p class="eyebrow">404 / PROJECT NOT FOUND</p><h1>暂时找不到这个项目。</h1><RouterLink class="admin-button" :to="{ name: 'projects' }">返回项目列表</RouterLink></main>
</template>