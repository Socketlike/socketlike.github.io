import { computed, ref, watch } from 'vue'
import * as R from 'remeda'
import {
  applyTheme,
  customThemeProperties,
  getCustomTheme,
  getTheme,
  setCustomTheme,
  setTheme,
  type Theme,
} from '@/util/theme'

export function useTheme() {
  const theme = ref<Theme>(getTheme() || '')
  const customTheme = ref(getCustomTheme())
  const currentThemeColors = computed(() =>
    R.fromKeys(customThemeProperties, (prop) => {
      if (theme.value === 'custom')
        return (
          customTheme.value[prop] ||
          window.getComputedStyle(window.document.documentElement).getPropertyValue(prop) ||
          'unset'
        )

      return (
        window.getComputedStyle(window.document.documentElement).getPropertyValue(prop) || 'unset'
      )
    }),
  )

  watch(theme, () => {
    setTheme(theme.value)
    applyTheme(theme.value)
  })

  watch(customTheme, () => {
    setCustomTheme(customTheme.value)

    if (theme.value === 'custom') applyTheme('custom')
  })

  return { theme, customTheme, currentThemeColors }
}
