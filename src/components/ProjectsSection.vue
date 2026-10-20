<template>
  <section id="projects" class="card projects-card">
    <div class="projects-header">
      <div>
        <p class="eyebrow">SELECTED WORK</p>
        <h2 class="section-title">项目展示 <span class="count">共 {{ projects.length }} 个</span></h2>
      </div>
      <RouterLink class="project-index" :to="{ name: 'home' }">回到主页</RouterLink>
    </div>

    <div class="projects-grid">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project">
        <p>{{ project.description }}</p>
        <template #badge>
          <span class="project-status" :class="statusClass(project.status)">{{ project.status }}</span>
        </template>
        <template #actions>
          <RouterLink :to="{ name: 'project-detail', params: { id: project.id } }">查看项目 <span aria-hidden="true">↗</span></RouterLink>
        </template>
      </ProjectCard>
    </div>
  </section>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'

defineProps({
  projects: { type: Array, required: true }
})

const statusClass = (status) => ({
  已完成: 'is-done',
  进行中: 'is-active',
  计划中: 'is-planned'
}[status] || '')
</script>