import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useProjectStore } from './stores/project'
import AdminLayout from './layouts/AdminLayout.vue'
import PublicLayout from './layouts/PublicLayout.vue'
import AdminProfileView from './views/AdminProfileView.vue'
import AdminArticlesView from './views/AdminArticlesView.vue'
import AdminProjectsView from './views/AdminProjectsView.vue'
import ArticlesView from './views/ArticlesView.vue'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import ProjectDetailView from './views/ProjectDetailView.vue'
import ProjectsView from './views/ProjectsView.vue'

// 路由表定义公开页面、项目动态详情、认证页和带子路由的管理后台。
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: PublicLayout, children: [
        { path: '', name: 'home', component: HomeView, meta: { title: '个人主页' } },
        { path: 'projects', name: 'projects', component: ProjectsView, meta: { title: '项目展示' } },
        { path: 'articles', name: 'articles', component: ArticlesView, meta: { title: '文章记录' } },
        { path: 'projects/:id', name: 'project-detail', component: ProjectDetailView, meta: { title: '项目详情' } },
      ],
    },
    { path: '/login', name: 'login', component: LoginView, meta: { title: '身份认证', guestOnly: true } },
    {
      path: '/admin', component: AdminLayout, meta: { requiresAuth: true }, children: [
        { path: '', redirect: { name: 'admin-profile' } },
        { path: 'profile', name: 'admin-profile', component: AdminProfileView, meta: { title: '编辑个人简介' } },
        { path: 'projects', name: 'admin-projects', component: AdminProjectsView, meta: { title: '管理项目' } },
        { path: 'articles', name: 'admin-articles', component: AdminArticlesView, meta: { title: '管理文章' } },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
  ],
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

// 全局守卫拒绝未登录访客，并使用路由元信息更新浏览器标题。
router.beforeEach((to) => {
  const authStore = useAuthStore()
  const projectStore = useProjectStore()
  const project = to.name === 'project-detail'
    ? projectStore.getProjectById(to.params.id)
    : null
  document.title = `${project?.name || to.meta.title || '个人主页'} · 徐沐甜`

  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && authStore.isAuthenticated) return { name: 'admin-profile' }
})

export default router