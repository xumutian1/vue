<template>
  <article class="project-card">
    <div class="project-card-top">
      <span class="project-type">{{ project.type }}</span>
      <slot name="badge">
        <span class="project-status">{{ project.status }}</span>
      </slot>
    </div>
    <h3>{{ project.name }}</h3>
    <slot>
      <p>{{ project.description }}</p>
    </slot>
    <div class="project-tags">
      <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
    </div>
    <slot name="actions">
      <a :href="project.link">查看项目 <span aria-hidden="true">↗</span></a>
    </slot>
  </article>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true }
})
</script>