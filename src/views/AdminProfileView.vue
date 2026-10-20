<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '../stores/portfolio'

const fields = ['name', 'studentId', 'majorClass', 'intro', 'detail']
const labels = { name: '姓名', studentId: '学号', majorClass: '专业班级', intro: '个人简介', detail: '个人详情' }
const portfolioStore = usePortfolioStore()
const { profile } = storeToRefs(portfolioStore)
const form = reactive({ ...profile.value })
const message = ref('')

function save() {
  if (fields.some((field) => !String(form[field]).trim())) { message.value = '请完整填写所有资料。'; return }
  portfolioStore.saveProfile({ ...form })
  message.value = '资料已保存，并同步到公开主页。'
}
function cancel() {
  Object.assign(form, profile.value)
  message.value = '已取消修改。'
}
</script>

<template>
  <section class="admin-heading"><p class="eyebrow">PROFILE / SETTINGS</p><h1>个人简介</h1><p>修改访客在主页上看到的个人信息。</p></section>
  <form class="editor-panel" @submit.prevent="save"><div class="editor-grid"><label v-for="field in fields" :key="field" :class="{ 'wide-field': ['intro', 'detail'].includes(field) }">{{ labels[field] }}<textarea v-if="['intro', 'detail'].includes(field)" v-model="form[field]" rows="3" required></textarea><input v-else v-model="form[field]" required /></label></div><p class="save-message" role="status">{{ message }}</p><div class="form-actions"><button class="admin-button" type="submit">保存修改</button><button class="admin-button quiet" type="button" @click="cancel">取消修改</button></div></form>
</template>