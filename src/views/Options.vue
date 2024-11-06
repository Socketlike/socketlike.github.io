<script setup lang="ts">
import { ref } from 'vue'
import { theme } from '@/stores'
import * as ls from '@/util/localStorage'

import WaterFill from '@pictogrammers/memory-svg/svg/water-fill.svg'
import AlertRhombusFill from '@pictogrammers/memory-svg/svg/alert-rhombus-fill.svg'
import SwitchItem from '@/components/SwitchItem.vue'

const themeStore = theme.useThemeStore()
</script>

<template>
  <template v-if="!ls.available">
    <content-section type="note">
      <template #header>
        <AlertRhombusFill class="inline" style="width: 16px" />
        warning
      </template>

      <code>localStorage</code> is disabled.
      <brk :for="2" />
      changes will not be saved.
    </content-section>

    <brk />
  </template>

  <content-section type="interactable" collapsible>
    <template #header>
      <WaterFill class="inline" style="width: 16px" />
      theme options
    </template>

    theme:
    <select
      :value="themeStore.theme"
      @change="
        // @ts-expect-error - can't fix this
        (e) => themeStore.setTheme(e.target?.value)
      "
    >
      <option v-for="t in theme.themes" :key="t" :value="t">{{ t }}</option>
    </select>

    <brk :for="2" />

    reduce motion
    <switch-item
      :value="themeStore.reduceMotion"
      @click="() => themeStore.setReduceMotion(!themeStore.reduceMotion)"
    />
  </content-section>
</template>
