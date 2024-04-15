<script setup lang="ts">
import { RouterLink, type RouterLinkProps } from 'vue-router'
import classNameFactory from '@/util/classNameFactory'

defineOptions({
  inheritAttrs: false,
})

defineProps<RouterLinkProps>()
</script>

<template>
  <span v-if="to === $route.path" :class="classNameFactory('link-active', activeClass)"
    ><slot
  /></span>
  <RouterLink v-else v-bind="$props" custom v-slot="{ navigate, href }">
    <a v-bind="$attrs" :href="href" @click="navigate" class="link-inactive">
      <slot />
    </a>
  </RouterLink>
</template>

<style scoped lang="less">
.link-active {
  color: var(--foreground-unfocused);
  padding: 0 2px;
}

.link-inactive {
  color: var(--lightblue);
  padding: 0 2px;
}
</style>
