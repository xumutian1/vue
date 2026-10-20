<template>
  <label class="search-field">
    <span class="sr-only">搜索技能或分类</span>
    <span aria-hidden="true">⌕</span>
    <input v-model="model" placeholder="搜索技能或分类">
  </label>
</template>

<script setup>
const model = defineModel({ type: String, default: '' })
</script>
