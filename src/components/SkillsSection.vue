<template>
  <section id="skills" class="card skills-card">
    <div class="skills-header">
      <div>
        <p class="eyebrow">MY TOOLKIT</p>
        <h2 class="section-title">技能 / 兴趣 <span class="count">共 {{ filteredSkills.length }} 项</span></h2>
      </div>
      <SkillSearch v-model="searchKeyword" />
    </div>

    <div class="skills-grid">
      <div v-for="skill in filteredSkills" :key="skill.name" class="skill-item">
        <span class="name">{{ skill.name }}</span>
        <span class="tag">{{ skill.category }}</span>
        <span class="level"><span class="dot" :style="{ background: levelColor(skill.level) }"></span>{{ skill.level }}</span>
      </div>
    </div>
    <p v-if="filteredSkills.length === 0" class="empty">没有找到相关技能，换个关键词试试～</p>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import SkillSearch from './SkillSearch.vue'

const props = defineProps({ skills: { type: Array, required: true } })
const searchKeyword = ref('')

const filteredSkills = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()
  if (!keyword) return props.skills
  return props.skills.filter((skill) => skill.name.toLowerCase().includes(keyword) || skill.category.toLowerCase().includes(keyword))
})

const levelColor = (level) => ({ 熟练: '#16866a', 掌握: '#3c6e9e', 入门: '#c27b26' }[level] || '#94a3b8')
</script>
