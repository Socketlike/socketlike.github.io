<script setup lang="ts">
import { ref } from 'vue'

import ChevronDown from '@pictogrammers/memory-svg/svg/chevron-down.svg'
import ChevronUp from '@pictogrammers/memory-svg/svg/chevron-up.svg'

const props = defineProps<{
  type?: string

  collapsible?: boolean
  collapsed?: boolean
}>()

const collapsed = ref(Boolean(props.collapsed))
</script>

<template>
  <div class="section" :data-type="props.type">
    <div
      class="header"
      @click="
        () => {
          if (props.collapsible) collapsed = !collapsed
        }
      "
    >
      <div v-if="$slots.header" class="wrapper">
        <slot name="header" />
      </div>

      <component
        :is="collapsed ? ChevronUp : ChevronDown"
        v-if="props.collapsible"
        class="collapse-button inline"
      />
    </div>

    <div :class="['wrapper', collapsed && 'collapsed']">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="less">
.section .wrapper.collapsed {
  display: none;
}
</style>
