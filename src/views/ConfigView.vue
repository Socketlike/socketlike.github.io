<script setup lang="ts">
import { reactive, ref } from 'vue'
import { available } from '@/util/localStorage'
import {
  applyTheme,
  getCustomTheme,
  getTheme,
  properties,
  setTheme,
  setCustomTheme,
  themes,
} from '@/util/theme'

const currentTheme = ref(getTheme() || '')
const customTheme = reactive(getCustomTheme())

function onThemeChange(event: Event) {
  event.stopPropagation()

  const newTheme = (event.currentTarget as HTMLSelectElement).value as (typeof themes)[number] | ''

  setTheme(newTheme)

  applyTheme(getTheme())

  currentTheme.value = newTheme || ''
}

function onCustomThemeChange(event: Event) {
  event.preventDefault()
  event.stopPropagation()

  const data = new FormData(event.currentTarget as HTMLFormElement)

  const theme = {} as Record<(typeof properties)[number], string>

  for (const [key, value] of data)
    theme[key as (typeof properties)[number]] = (value as string) || ''

  setCustomTheme({ ...customTheme, ...theme })

  if (currentTheme.value === 'custom') applyTheme('custom')
}

function getCurrentThemeColor(property: (typeof properties)[number]): string {
  return window.getComputedStyle(window.document.documentElement).getPropertyValue(property)
}
</script>
<template>
  <div v-if="!available()">
    <section-block label="localStorage access denied" variant="error"
      >any modifications you make here will not be saved.</section-block
    >
    <br />
  </div>

  <section-block label="theme">
    select:
    <select @change="onThemeChange">
      <option
        v-for="theme in themes"
        :key="theme || ''"
        :selected="(theme || '') === currentTheme"
        :value="theme"
      >
        {{ theme || 'default' }}
      </option>
    </select>
  </section-block>

  <br />

  <section-block v-if="currentTheme !== 'custom'" label="theme colors" variant="info">
    <div
      v-for="[property, value] of properties.map((property) => [
        property,
        getCurrentThemeColor(property),
      ])"
      :key="`${property}-${currentTheme}`"
    >
      {{ property }}:
      <code class="color">
        <div class="swatch" :style="{ backgroundColor: value }" />
        {{ value }}</code
      >
    </div>
  </section-block>
  <section-block v-else label="theme colors">
    <span class="c-red-f">(hexadecimal values, prefixed with a #)</span>
    <br />
    <form @submit="onCustomThemeChange">
      <div v-for="(value, key) in customTheme" :key="key">
        {{ key }}: <input type="text" :name="key" :value="value" />
      </div>
      <button role="submit">save changes</button>
    </form>
  </section-block>
</template>

<style scoped lang="less">
.color {
  align-items: center;
  display: inline-flex;
  gap: 4px;

  .swatch {
    display: inline-block;
    border: 1px solid rgba(0, 0, 0, 0.5);
    height: 10px;
    width: 10px;
    user-select: none;
  }
}
</style>
