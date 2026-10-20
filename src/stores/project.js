import { defineStore } from 'pinia'

const STORAGE_KEY = 'xumutian-projects'
const LEGACY_STORAGE_KEY = 'xumutian-portfolio'

const defaults = [
  { id: 'portfolio', name: '个人成长主页', type: 'Vue 3', description: '使用组合式 API、组件通信和响应式数据搭建的个人主页。', tags: ['Vue', '组件化'], status: '进行中' },
  { id: 'skill-finder', name: '技能检索面板', type: '交互练习', description: '支持关键词筛选技能和分类，练习父子组件之间的双向数据同步。', tags: ['defineModel', '搜索'], status: '已完成' },
  { id: 'mobile-practice', name: '移动端页面练习', type: '页面设计', description: '面向移动端阅读场景的页面布局练习，持续完善视觉与交互细节。', tags: ['响应式', 'CSS'], status: '计划中' },
]

function loadProjects() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || '{}')
    return legacy.projects || structuredClone(defaults)
  } catch {
    return structuredClone(defaults)
  }
}

export const useProjectStore = defineStore('projects', {
  state: () => ({ projects: loadProjects() }),
  getters: {
    projectCount: (state) => state.projects.length,
    getProjectById: (state) => (id) => state.projects.find((project) => project.id === id),
  },
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projects))
    },
    addProject(project) {
      this.projects = [project, ...this.projects]
      this.persist()
    },
    updateProject(project) {
      this.projects = this.projects.map((item) => item.id === project.id ? project : item)
      this.persist()
    },
    deleteProject(id) {
      this.projects = this.projects.filter((project) => project.id !== id)
      this.persist()
    },
  },
})