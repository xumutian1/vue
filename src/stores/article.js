import { defineStore } from 'pinia'

const STORAGE_KEY = 'xumutian-articles'
const LEGACY_STORAGE_KEY = 'xumutian-portfolio'

const defaults = [
  { id: 'vue-learning-notes', title: 'Vue 3 学习记录', category: '前端学习', createdAt: '2026-10-19', excerpt: '整理组合式 API、组件通信与响应式状态管理的阶段性收获。', content: '从组件拆分开始练习 Vue 3，逐步使用组合式 API 管理页面状态，并通过 Pinia 在多个页面之间共享数据。' },
  { id: 'first-portfolio', title: '我的第一个个人主页', category: '项目复盘', createdAt: '2026-10-12', excerpt: '记录从页面结构、样式布局到项目管理功能的实现过程。', content: '这个主页从个人资料和技能展示出发，后来加入项目管理、登录守卫与浏览器本地持久化。' },
]

function loadArticles() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || '{}')
    return legacy.articles || structuredClone(defaults)
  } catch {
    return structuredClone(defaults)
  }
}

export const useArticleStore = defineStore('articles', {
  state: () => ({ articles: loadArticles() }),
  getters: {
    articleCount: (state) => state.articles.length,
    articleTimeline: (state) => [...state.articles].sort((first, second) => second.createdAt.localeCompare(first.createdAt)),
  },
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.articles))
    },
    addArticle(article) {
      this.articles = [article, ...this.articles]
      this.persist()
    },
    updateArticle(article) {
      this.articles = this.articles.map((item) => item.id === article.id ? article : item)
      this.persist()
    },
    deleteArticle(id) {
      this.articles = this.articles.filter((article) => article.id !== id)
      this.persist()
    },
  },
})