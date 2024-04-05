<script setup lang="ts">
import classNameFactory from '@/util/classNameFactory'

defineProps<{
  label: string
  className: string
}>()
</script>

<template>
  <fieldset :class="classNameFactory('block', className)">
    <legend class="label" v-if="label">{{ label }}</legend>
    <slot />
  </fieldset>
</template>

<style scoped lang="less">
.block {
  border-style: solid;
  border-width: 1px;
  border-color: var(--foreground-unfocused);
  max-width: 100%;

  > legend.label {
    color: var(--foreground-unfocused);
    user-select: none;
  }

  &:hover {
    border-color: var(--foreground-focused);

    > legend.label {
      color: var(--foreground-focused);
    }
  }
}
</style>
