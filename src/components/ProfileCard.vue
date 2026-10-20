<template>
  <section id="about" class="card profile-card">
    <div class="avatar-ring">
      <img class="avatar" :src="profile.avatar" :alt="profile.name">
    </div>

    <div class="profile-info">
      <p class="eyebrow">COMPUTER SCIENCE STUDENT</p>
      <h1>{{ profile.name }}</h1>
      <p class="info-line"><span>学号：{{ profile.studentId }}</span><span>{{ profile.majorClass }}</span></p>
      <p class="intro">{{ profile.intro }}</p>
      <div class="links">
        <a v-for="link in profile.socialLinks" :key="link.name" :href="link.url" target="_blank" rel="noreferrer">{{ link.name }}</a>
      </div>
    </div>

    <div class="profile-actions">
      <button class="mini ghost" type="button" @click="$emit('toggle-detail')">{{ showDetail ? '收起详情' : '查看详情' }}</button>
      <RouterLink class="mini manage-link" :to="{ name: 'login' }">管理入口</RouterLink>
    </div>
  </section>
</template>

<script setup>
defineProps({
  profile: { type: Object, required: true },
  showDetail: { type: Boolean, default: false }
})

defineEmits(['toggle-detail'])
</script>
