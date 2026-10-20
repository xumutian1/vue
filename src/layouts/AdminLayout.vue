<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
function logout() {
  authStore.signOut()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="admin-shell">
    <header class="admin-topbar"><RouterLink class="brand" :to="{ name: 'home' }"><span class="brand-mark">徐</span><span>内容管理 <small>个人主页后台</small></span></RouterLink><div class="admin-actions"><RouterLink :to="{ name: 'home' }">查看主页 ↗</RouterLink><button class="admin-button quiet" type="button" @click="logout">退出登录</button></div></header>
    <el-container class="admin-frame admin-layout-frame">
      <el-aside class="admin-sidebar" width="190px">
        <p class="eyebrow">CONTENT SETTINGS</p>
        <el-menu :default-active="route.path" router class="admin-menu">
          <el-menu-item index="/admin/profile">个人简介 <span>01</span></el-menu-item>
          <el-menu-item index="/admin/projects">项目管理 <span>02</span></el-menu-item>
          <el-menu-item index="/admin/articles">文章管理 <span>03</span></el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 管理区嵌套路由只切换内容，侧栏和顶部操作保持不变。 -->
      <el-main class="admin-main"><RouterView /></el-main>
    </el-container>
  </div>
</template>