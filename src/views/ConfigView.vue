<script setup lang="ts">
import { available } from '@/util/localStorage'
import {
  customThemeProperties,
  themes,
  type Theme,
  type CustomThemeProperty,
  type CustomTheme,
} from '@/util/theme'
import { useTheme } from '@/composables'

const { theme: currentTheme, customTheme, currentThemeColors } = useTheme()

function onThemeChange(event: Event) {
  event.stopPropagation()

  currentTheme.value = (event.currentTarget as HTMLSelectElement).value as Theme | ''
}

function onCustomThemeChange(event: Event) {
  event.preventDefault()
  event.stopPropagation()

  const data = new FormData(event.currentTarget as HTMLFormElement)

  const theme = Array.from(data.entries())
    .filter(([key]) => customThemeProperties.includes(key as CustomThemeProperty))
    .reduce<CustomTheme>((acc, [key, value]) => {
      acc[key as CustomThemeProperty] = value as string
      return acc
    }, {} as CustomTheme)

  customTheme.value = { ...customTheme.value, ...theme }
}
</script>
<template>
  <template v-if="!available()">
    <section-block label="localStorage access denied" variant="error"
      >any modifications you make here will not be saved.</section-block
    >

    <br />
  </template>

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
      v-for="[prop, color] of Object.entries(currentThemeColors)"
      :key="`${prop}-${currentTheme}`"
    >
      {{ prop }}:
      <code class="color">
        <div class="swatch" :style="{ backgroundColor: color }" />
        {{ color }}</code
      >
    </div>
  </section-block>
  <section-block v-else label="theme colors">
    <span class="c-red-f"
      >(colors can be either a hexadecimal value or any
      <a href="https://developer.mozilla.com/en-US/docs/Web/CSS/named-color">CSS named colors</a
      >)</span
    >
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
