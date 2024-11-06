import { ref } from 'vue'

import { defineStore } from 'pinia'

import * as ls from '@/util/localStorage'

export const themes = Object.freeze(['default', 'legacy-like', 'omori'] as const)

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<(typeof themes)[keyof typeof themes]>(
    ls.get('neo-theme', 'default') as (typeof themes)[number],
  )

  const reduceMotion = ref<boolean>(ls.get('reduce-motion', 'false') === 'true')

  const setTheme = (newTheme: (typeof themes)[number]): boolean => {
    if (themes.includes(newTheme)) {
      theme.value = newTheme

      return ls.set('neo-theme', newTheme as string)
    }

    return false
  }

  const setReduceMotion = (state: boolean): boolean => {
    const value = Boolean(state)

    reduceMotion.value = value

    return ls.set('reduce-motion', value ? 'true' : 'false')
  }

  return { theme, setTheme, reduceMotion, setReduceMotion }
})
