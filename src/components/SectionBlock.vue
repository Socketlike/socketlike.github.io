<script setup lang="ts">
import classNameFactory from '@/util/classNameFactory'

defineProps<{
  label: string
  className?: string
  variant?: 'info' | 'warning' | 'error'
}>()
</script>

<template>
  <fieldset :class="classNameFactory('section-block', className, variant && `${variant}-variant`)">
    <legend :class="classNameFactory('label', variant && 'bold')" v-if="label">
      {{ `${variant ? `[${variant.toUpperCase()}] ` : ''}${label}` }}
    </legend>
    <slot />
  </fieldset>
</template>

<style scoped lang="less">
.section-block {
  border-style: solid;
  border-width: 1px;
  border-color: var(--foreground-unfocused);
  max-width: 100%;

  > legend.label {
    background-color: var(--foreground-unfocused);
    color: var(--background);
    user-select: none;
  }

  &:hover {
    border-color: var(--foreground-focused);

    > legend.label {
      background-color: var(--foreground-focused);
    }
  }

  &.info-variant {
    border-color: var(--lightblue);

    > legend.label {
      background-color: var(--lightblue);
    }
  }

  &.error-variant {
    border-color: var(--red);

    > legend.label {
      background-color: var(--red);
    }
  }

  &.warning-variant {
    border-color: var(--yellow);

    > legend.label {
      background-color: var(--yellow);
    }
  }
}
</style>
