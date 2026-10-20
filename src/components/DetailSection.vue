<template>
  <section v-show="visible" class="card detail-card">
    <p class="eyebrow">A LITTLE MORE</p>
    <h2 class="section-title">个人详情</h2>
    <p class="detail-text">{{ detail }}</p>
  </section>
</template>

<script setup>
defineProps({
  detail: { type: String, required: true },
  visible: { type: Boolean, default: false }
})
</script>
