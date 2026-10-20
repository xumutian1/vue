<script setup>
import { ref } from 'vue'
import DetailSection from '../components/DetailSection.vue'
import ProfileCard from '../components/ProfileCard.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/article'
import { usePortfolioStore } from '../stores/portfolio'
import { useProjectStore } from '../stores/project'

const showDetail = ref(false)
const portfolioStore = usePortfolioStore()
const projectStore = useProjectStore()
const articleStore = useArticleStore()
const { profile, skills } = storeToRefs(portfolioStore)
const { projects } = storeToRefs(projectStore)
const { articleTimeline } = storeToRefs(articleStore)
</script>

<template>
  <main class="page-content">
    <section class="intro-banner"><p class="eyebrow">WELCOME TO MY SPACE</p><h1>把每一次学习，<em>做成看得见的成长。</em></h1><p>这是徐沐甜的个人主页，记录技能、兴趣与正在发生的前端实践。</p></section>
    <ProfileCard :profile="profile" :show-detail="showDetail" @toggle-detail="showDetail = !showDetail" />
    <DetailSection :detail="profile.detail" :visible="showDetail" />
    <el-row :gutter="20" class="timeline-row">
      <el-col :xs="24" :lg="18">
        <el-card shadow="never" class="timeline-card">
          <p class="eyebrow">LEARNING JOURNAL</p>
          <h2 class="section-title">成长时间线</h2>
          <el-timeline>
            <el-timeline-item v-for="article in articleTimeline" :key="article.id" :timestamp="article.createdAt" placement="top" type="primary">
              <h3>{{ article.title }}</h3>
              <p>{{ article.excerpt }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
    <SkillsSection :skills="skills" />
    <ProjectsSection :projects="projects" />
  </main>
</template>