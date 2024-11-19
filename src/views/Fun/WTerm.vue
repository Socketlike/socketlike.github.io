<script setup lang="ts">
import { onMounted, reactive } from 'vue'

const emit = defineEmits<{
  (e: 'overrideBreadcrumbs', value: string): void
}>()

const history = reactive(['hi'])

onMounted(() => {
  emit('overrideBreadcrumbs', ['wterm', 'user'].toString())
})
</script>

<template>
  <div class="terminal-view">
    <div v-for="(line, index) in history" :key="index">{{ line }}</div>
  </div>
</template>
