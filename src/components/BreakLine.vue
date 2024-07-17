<script setup lang="ts">
defineProps<{
  for?: number
}>()
</script>

<template>
  <br v-for="_ in $props.for || 1" :key="_" />
</template>
