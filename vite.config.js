import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  // ⚠️ 注意：将下面引号里的内容替换为你真实的 GitHub 仓库名称
  // 比如你的仓库叫 my-vue-app，就改成 base: '/my-vue-app/',
  base: '/vue/', 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})