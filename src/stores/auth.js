import { defineStore } from 'pinia'

const AUTH_STORAGE_KEY = 'portfolio-admin'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  }),
  actions: {
    signIn(username, password) {
      if (username !== 'admin' || password !== 'vue2026') return false
      this.isAuthenticated = true
      localStorage.setItem(AUTH_STORAGE_KEY, 'true')
      return true
    },
    signOut() {
      this.isAuthenticated = false
      localStorage.removeItem(AUTH_STORAGE_KEY)
    },
  },
})