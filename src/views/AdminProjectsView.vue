<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/project'

const emptyForm = () => ({ name: '', type: '', description: '', tags: '', status: '进行中' })
const form = reactive(emptyForm())
const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)
const editingId = ref('')
const dialogVisible = ref(false)
const message = ref('')

function startCreate() {
  editingId.value = ''
  Object.assign(form, emptyForm())
  message.value = ''
  dialogVisible.value = true
}

function startEdit(project) {
  editingId.value = project.id
  Object.assign(form, { ...project, tags: project.tags.join(', ') })
  message.value = ''
  dialogVisible.value = true
}
function cancelEdit() {
  editingId.value = ''
  Object.assign(form, emptyForm())
  dialogVisible.value = false
}
function saveProject() {
  if (![form.name, form.type, form.description, form.tags].every((value) => value.trim())) {
    message.value = '请填写名称、类型、简介和至少一个标签。'
    return
  }
  const id = editingId.value || `${Date.now().toString(36)}-${form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const project = { id, name: form.name.trim(), type: form.type.trim(), description: form.description.trim(), tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean), status: form.status }
  const wasEditing = Boolean(editingId.value)
  if (wasEditing) projectStore.updateProject(project)
  else projectStore.addProject(project)
  message.value = wasEditing ? '项目修改已保存。' : '项目已添加到公开主页。'
  editingId.value = ''
  Object.assign(form, emptyForm())
  dialogVisible.value = false
}
function removeProject(id) {
  if (!window.confirm('确定删除这个项目吗？公开项目列表也会同步更新。')) return
  projectStore.deleteProject(id)
  if (editingId.value === id) cancelEdit()
  message.value = '项目已删除。'
}
</script>

<template>
  <section class="admin-heading"><p class="eyebrow">PROJECTS / CONTENT</p><h1>项目管理</h1><p>新增、编辑和删除公开展示的项目。</p></section>
  <div class="table-toolbar"><el-button type="primary" @click="startCreate">新增项目</el-button><span>{{ projects.length }} 个项目</span></div>
  <el-table v-if="projects.length" :data="projects" row-key="id" class="content-table">
    <el-table-column prop="name" label="项目名称" min-width="150" />
    <el-table-column prop="type" label="类型" width="120" />
    <el-table-column prop="status" label="状态" width="110" />
    <el-table-column label="技术标签" min-width="160"><template #default="scope"><el-tag v-for="tag in scope.row.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag></template></el-table-column>
    <el-table-column label="操作" width="130" fixed="right"><template #default="scope"><el-button link type="primary" @click="startEdit(scope.row)">编辑</el-button><el-button link type="danger" @click="removeProject(scope.row.id)">删除</el-button></template></el-table-column>
  </el-table>
  <el-empty v-else description="还没有项目" />
  <el-alert v-if="message" class="admin-alert" :title="message" type="success" :closable="false" show-icon />

  <el-dialog v-model="dialogVisible" :title="editingId ? '编辑项目' : '新增项目'" width="640px">
    <el-form :model="form" label-position="top" class="element-form">
      <el-form-item label="项目名称" required><el-input v-model="form.name" maxlength="40" /></el-form-item>
      <el-form-item label="项目类型" required><el-input v-model="form.type" maxlength="30" /></el-form-item>
      <el-form-item label="项目简介" required><el-input v-model="form.description" type="textarea" :rows="3" maxlength="240" /></el-form-item>
      <el-form-item label="技术标签（逗号分隔）" required><el-input v-model="form.tags" placeholder="Vue, 组件化" /></el-form-item>
      <el-form-item label="项目状态" required><el-select v-model="form.status"><el-option label="进行中" value="进行中" /><el-option label="已完成" value="已完成" /><el-option label="计划中" value="计划中" /></el-select></el-form-item>
    </el-form>
    <template #footer><el-button @click="cancelEdit">取消</el-button><el-button type="primary" @click="saveProject">{{ editingId ? '保存修改' : '新增项目' }}</el-button></template>
  </el-dialog>
</template>