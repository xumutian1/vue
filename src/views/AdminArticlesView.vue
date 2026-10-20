<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/article'

const emptyForm = () => ({ title: '', category: '', createdAt: new Date().toISOString().slice(0, 10), excerpt: '', content: '' })
const form = reactive(emptyForm())
const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)
const editingId = ref('')
const dialogVisible = ref(false)
const message = ref('')

function startCreate() {
  editingId.value = ''
  Object.assign(form, emptyForm())
  message.value = ''
  dialogVisible.value = true
}

function startEdit(article) {
  editingId.value = article.id
  Object.assign(form, article)
  message.value = ''
  dialogVisible.value = true
}

function saveArticle() {
  if (![form.title, form.category, form.createdAt, form.excerpt, form.content].every((value) => String(value).trim())) {
    message.value = '请完整填写文章信息。'
    return
  }

  const article = {
    id: editingId.value || `${Date.now().toString(36)}-${form.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: form.title.trim(),
    category: form.category.trim(),
    createdAt: form.createdAt,
    excerpt: form.excerpt.trim(),
    content: form.content.trim(),
  }
  const wasEditing = Boolean(editingId.value)
  if (wasEditing) articleStore.updateArticle(article)
  else articleStore.addArticle(article)
  dialogVisible.value = false
  message.value = wasEditing ? '文章修改已保存。' : '文章已发布到公开文章列表。'
  editingId.value = ''
}

function removeArticle(id) {
  if (!window.confirm('确定删除这篇文章吗？此操作无法撤销。')) return
  articleStore.deleteArticle(id)
  message.value = '文章已删除。'
}
</script>

<template>
  <section class="admin-heading">
    <p class="eyebrow">ARTICLES / CONTENT</p>
    <h1>文章管理</h1>
    <p>发布学习笔记与项目复盘，内容会同步到公开文章列表。</p>
  </section>
  <div class="table-toolbar">
    <el-button type="primary" @click="startCreate">撰写文章</el-button>
    <span>{{ articles.length }} 篇文章</span>
  </div>
  <el-table v-if="articles.length" :data="articles" row-key="id" class="content-table">
    <el-table-column prop="title" label="标题" min-width="180" />
    <el-table-column prop="category" label="分类" width="130" />
    <el-table-column prop="createdAt" label="发布日期" width="130" />
    <el-table-column prop="excerpt" label="摘要" min-width="220" show-overflow-tooltip />
    <el-table-column label="操作" width="130" fixed="right">
      <template #default="scope">
        <el-button link type="primary" @click="startEdit(scope.row)">编辑</el-button>
        <el-button link type="danger" @click="removeArticle(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-empty v-else description="还没有文章" />
  <el-alert v-if="message" class="admin-alert" :title="message" type="success" :closable="false" show-icon />

  <el-dialog v-model="dialogVisible" :title="editingId ? '编辑文章' : '撰写文章'" width="640px">
    <el-form :model="form" label-position="top" class="element-form">
      <el-form-item label="文章标题" required><el-input v-model="form.title" maxlength="80" /></el-form-item>
      <el-form-item label="文章分类" required><el-input v-model="form.category" maxlength="30" /></el-form-item>
      <el-form-item label="发布日期" required><el-date-picker v-model="form.createdAt" type="date" value-format="YYYY-MM-DD" format="YYYY-MM-DD" /></el-form-item>
      <el-form-item label="文章摘要" required><el-input v-model="form.excerpt" type="textarea" :rows="2" maxlength="180" /></el-form-item>
      <el-form-item label="正文内容" required><el-input v-model="form.content" type="textarea" :rows="5" /></el-form-item>
    </el-form>
    <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" @click="saveArticle">{{ editingId ? '保存修改' : '发布文章' }}</el-button></template>
  </el-dialog>
</template>