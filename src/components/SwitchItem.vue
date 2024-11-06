<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  value: boolean
}>()

const state = computed(() => (props.value ? 'on' : 'off'))
</script>

<template>
  <button :class="['switch', state]" :aria-label="`switch, ${state}`" />
</template>
