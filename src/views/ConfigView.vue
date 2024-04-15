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
</script>
<template>
  <div class="bold">config</div>
  <div v-if="!available()">
    <br />
    <section-block label="localStorage access denied" variant="error"
      >any modifications you make here will not be saved.</section-block
    >
  </div>
  <ul>
    <li>
      theme:
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
    </li>

    <li v-if="currentTheme === 'custom'">
      theme props
      <span class="c-red">(css values <span class="bold">only</span>, no functions)</span>:
      <br />
      <form @submit="onCustomThemeChange">
        <ul>
          <li v-for="[key, value] of Object.entries(customTheme)" :key="key">
            {{ key }}: <input type="text" :name="key" :value="value" />
          </li>
        </ul>
        <br />
        <button role="submit">save changes</button>
      </form>
    </li>
  </ul>
</template>
