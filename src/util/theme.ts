import localStorage from './localStorage'

export const themes = [null, 'light', 'gruvbox', 'gruvbox-light', 'tokyo-night', 'custom'] as const

export type Theme = (typeof themes)[number] | ''

export const customThemeProperties = [
  '--bg',
  '--bg-focused',
  '--fg',
  '--fg-focused',
  '--red',
  '--red-focused',
  '--green',
  '--green-focused',
  '--blue',
  '--blue-focused',
  '--yellow',
  '--yellow-focused',
  '--lightblue',
  '--lightblue-focused',
] as const

export type CustomThemeProperty = (typeof customThemeProperties)[number]

export type CustomTheme = Record<CustomThemeProperty, string>

export const getTheme = (): Theme => localStorage.getItem('theme') as Theme

export const getCustomTheme = (): CustomTheme =>
  localStorage.getMultipleItems(
    customThemeProperties.reduce<Record<string, string>>((acc, key) => {
      acc[key] = ''
      return acc
    }, {}),
  ) as CustomTheme

export const setTheme = (theme: Theme): boolean =>
  theme ? localStorage.setItem('theme', theme as string) : localStorage.deleteItem('theme')

export const setCustomTheme = (
  customTheme: Record<CustomThemeProperty, string>,
): Record<string, boolean> => localStorage.setMultipleItems(customTheme)

export const applyTheme = (theme: Theme): boolean => {
  try {
    if (!theme) window.document.documentElement.removeAttribute('data-theme')
    else window.document.documentElement.setAttribute('data-theme', theme as string)

    if (theme === 'custom')
      Object.entries(getCustomTheme()).forEach(([key, value]) =>
        window.document.documentElement.style.setProperty(key, value || ''),
      )
    else
      customThemeProperties.forEach((prop) =>
        window.document.documentElement.style.removeProperty(prop),
      )
  } catch (_) {
    return false
  }

  return true
}

export default {
  applyTheme,
  customThemeProperties,
  getCustomTheme,
  getTheme,
  themes,
  setTheme,
}
