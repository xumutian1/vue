<template>
  <header class="site-header">
    <RouterLink class="brand" :to="{ name: 'home' }" aria-label="返回主页">
      <span class="brand-mark">徐</span>
      <span>Xu Mu Tian</span>
    </RouterLink>

    <nav class="site-nav" aria-label="页面导航">
      <RouterLink :to="{ name: 'home', hash: '#about' }" :class="{ active: isHomeSection('#about') }">关于我</RouterLink>
      <RouterLink :to="{ name: 'home', hash: '#skills' }" :class="{ active: isHomeSection('#skills') }">技能兴趣</RouterLink>
      <RouterLink :to="{ name: 'projects' }" :class="{ active: route.path.startsWith('/projects') }">项目展示</RouterLink>
      <RouterLink :to="{ name: 'articles' }" :class="{ active: route.path === '/articles' }">文章记录</RouterLink>
      <RouterLink :to="{ name: 'home', hash: '#contact' }" :class="{ active: isHomeSection('#contact') }">联系我</RouterLink>
      <RouterLink v-if="isAuthenticated" :to="{ name: 'admin-profile' }">内容管理</RouterLink>
      <RouterLink v-else :to="{ name: 'login' }">管理入口</RouterLink>
    </nav>

    <button class="theme-toggle" type="button" @click="$emit('toggle-theme')">
      {{ theme === 'light' ? '月光模式' : '日光模式' }}
    </button>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const isHomeSection = (hash) => route.name === 'home' && (route.hash === hash || (!route.hash && hash === '#about'))

defineProps({
  theme: {
    type: String,
    required: true
  }
})

defineEmits(['toggle-theme'])
</script>
