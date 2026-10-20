<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

function submitLogin() {
  errorMessage.value = ''
  if (!username.value.trim() || !password.value) { errorMessage.value = '请填写账号和密码。'; return }
  if (!authStore.signIn(username.value.trim(), password.value)) { errorMessage.value = '账号或密码不正确，请重试。'; return }
  // 登录后返回守卫拦截前访问的管理页面。
  router.push(typeof route.query.redirect === 'string' ? route.query.redirect : '/admin/profile')
}
</script>

<template>
  <main class="login-page"><RouterLink class="detail-back" :to="{ name: 'home' }">← 返回个人主页</RouterLink><section class="login-panel"><p class="eyebrow">PRIVATE AREA / SIGN IN</p><h1>管理内容</h1><p class="login-copy">登录后可以更新个人简介和项目展示内容。</p><form class="admin-form" @submit.prevent="submitLogin"><label>管理员账号<input v-model="username" autocomplete="username" required placeholder="请输入账号" /></label><label>登录密码<input v-model="password" type="password" autocomplete="current-password" required placeholder="请输入密码" /></label><p v-if="errorMessage" class="admin-error" role="alert">{{ errorMessage }}</p><button class="admin-button" type="submit">登录管理后台 ↗</button></form><p class="demo-hint">演示账号：admin　密码：vue2026</p></section></main>
</template>