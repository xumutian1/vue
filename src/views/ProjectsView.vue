<script setup>
import { storeToRefs } from 'pinia'
import ProjectsSection from '../components/ProjectsSection.vue'
import { useProjectStore } from '../stores/project'

const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)
</script>

<template>
  <main class="page-content projects-page"><section class="intro-banner"><p class="eyebrow">SELECTED WORK / 2024—2026</p><h1>项目与练习</h1><p>从课堂练习到独立尝试，把每个阶段的想法和过程认真收好。</p></section><ProjectsSection :projects="projects" /></main>
</template>