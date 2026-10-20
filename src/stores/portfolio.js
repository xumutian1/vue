import { defineStore } from 'pinia'

const STORAGE_KEY = 'xumutian-portfolio'

const defaults = {
  profile: {
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Xumutian',
    name: '徐沐甜',
    studentId: '249981236',
    majorClass: '24计科2班',
    intro: '你好，我是徐沐甜，是一名计科专业的大学生。正在学习 HTML、CSS、JavaScript 和 Vue 3，同时也在兼顾学习西语和英语，希望能够多元化发展。',
    detail: '我喜欢的前端方向是 Vue 与移动端页面开发，平时喜欢听音乐、看电影。本学期的小目标是做一个属于我自己个人页面。',
    socialLinks: [
      { name: 'GitHub', url: 'https://github.com/' },
      { name: '博客', url: 'https://blog.csdn.net/' },
      { name: '邮箱', url: 'mailto:3394118177@qq.com' },
    ],
  },
  skills: [
    { name: 'HTML5', level: '熟练', category: '前端基础' },
    { name: 'CSS3', level: '熟练', category: '前端基础' },
    { name: 'JavaScript', level: '掌握', category: '前端基础' },
    { name: 'Vue 3', level: '入门', category: '前端框架' },
    { name: 'Java', level: '掌握', category: '后端语言' },
    { name: 'MySQL', level: '入门', category: '数据库' },
    { name: 'VS Code', level: '掌握', category: '开发工具' },
    { name: '中文', level: '掌握', category: '语言' },
    { name: '英语', level: '熟练', category: '语言' },
    { name: '西班牙语', level: '入门', category: '语言' },
  ],
}

function loadPortfolio() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return structuredClone(defaults)
    const parsed = JSON.parse(saved)
    return {
      ...structuredClone(defaults),
      profile: parsed.profile || structuredClone(defaults.profile),
      skills: parsed.skills || structuredClone(defaults.skills),
    }
  } catch {
    return structuredClone(defaults)
  }
}

export const usePortfolioStore = defineStore('portfolio', {
  state: () => loadPortfolio(),
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        profile: this.profile,
        skills: this.skills,
      }))
    },
    saveProfile(profile) {
      Object.assign(this.profile, profile)
      this.persist()
    },
  },
})