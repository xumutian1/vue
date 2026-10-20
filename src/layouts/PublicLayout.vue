<script setup>
import { ref, watch } from 'vue'
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'

const theme = ref('light')
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
watch(theme, (value) => {
  document.body.style.background = value === 'dark' ? '#12201d' : '#f3f6f1'
})
</script>

<template>
  <div class="app-root" :class="theme">
    <div id="top" class="page-shell">
      <AppHeader :theme="theme" @toggle-theme="toggleTheme" />
      <!-- 主页、项目列表和详情共享公开站点框架。 -->
      <RouterView />
      <AppFooter />
    </div>
  </div>
</template>