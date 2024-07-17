<script setup lang="ts">
import { computed } from 'vue'

const pathname = computed(() => window.location.pathname)
</script>

<template>
  <div class="highlight">something is wrong.</div>
  <brk />
  <div>you tried to access a resource that does not exist.</div>
  <brk />
  <div>did you make a typo?</div>
  <brk />
  <div style="color: gray">&gt; could not resolve "{{ pathname }}"</div>
</template>

<style scoped lang="less">
.highlight {
  color: antiquewhite;

  font-weight: 800;
}

* {
  color: darkgray;
}
</style>
