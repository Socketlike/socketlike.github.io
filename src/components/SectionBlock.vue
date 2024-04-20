<script setup lang="ts">
import { computed } from 'vue'
import classNameFactory from '@/util/classNameFactory'

const props = defineProps<{
  label?: string
  className?: string
  variant?: 'info' | 'warning' | 'error'
}>()

const variant = computed(() => {
  if (props.variant === 'info') return { className: 'info important', icon: 'ⓘ' }

  if (props.variant === 'warning') return { className: 'warning important', icon: '⚠' }

  if (props.variant === 'error') return { className: 'error important', icon: '☢' }

  return { className: '', icon: '' }
})
</script>

<template>
  <fieldset v-if="label" :class="classNameFactory('section-block', className, variant.className)">
    <legend :class="classNameFactory('label')" v-if="label">
      {{ `${variant.icon ? `[${variant.icon}] ` : ''}${label}` }}
    </legend>
    <slot />
  </fieldset>
  <div
    v-else
    :aria-label="variant.className"
    :class="classNameFactory('section-block', className, variant.className)"
  >
    <slot />
  </div>
</template>

<style scoped lang="less">
div.section-block {
  margin-inline-start: 2px;
  margin-inline-start: 2px;
  padding-block-start: 0.5em;
  padding-inline-start: 0.75em;
  padding-inline-end: 0.75em;
  padding-block-end: 0.5em;
  min-inline-size: min-content;
}

.section-block {
  border-style: solid;
  border-width: 1px;
  border-color: var(--fg);
  background-color: var(--bg);
  color: var(--fg-focused);
  max-width: 100%;
  filter: brightness(80%);
  box-shadow: var(--bg) 3px 3px;

  > legend.label {
    background-color: var(--fg);
    color: var(--bg);
    user-select: none;
  }

  &:hover,
  &.important {
    border-color: var(--fg-focused);
    filter: brightness(100%);
    box-shadow: var(--bg-focused) 3px 3px;

    > legend.label {
      background-color: var(--fg-focused);
      color: var(--bg-focused);
    }
  }

  &.important > legend.label {
    font-weight: bold;
  }

  &.info {
    border-color: var(--lightblue-focused);

    > legend.label {
      background-color: var(--lightblue-focused);
    }
  }

  &.error {
    border-color: var(--red-focused);

    > legend.label {
      background-color: var(--red-focused);
    }
  }

  &.warning {
    border-color: var(--yellow-focused);

    > legend.label {
      background-color: var(--yellow-focused);
    }
  }
}
</style>
