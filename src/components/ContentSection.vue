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
      <div class="wrapper" v-if="$slots.header">
        <slot name="header" />
      </div>

      <component
        class="collapse-button inline"
        v-if="props.collapsible"
        :is="collapsed ? ChevronUp : ChevronDown"
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
