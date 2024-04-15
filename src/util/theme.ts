import localStorage from './localStorage'

export const themes = [
  null,
  'light',
  'gruvbox',
  'gruvbox-light',
  'tokyo-night',
  'tokyo-night-light',
  'custom',
] as const

export const properties = [
  '--background',
  '--foreground',
  '--foreground-focused',
  '--foreground-unfocused',
  '--red',
  '--green',
  '--yellow',
  '--gray',
  '--lightblue',
] as const

export const getTheme = (): (typeof themes)[number] =>
  localStorage.getItem('theme') as (typeof themes)[number]

export const getCustomTheme = (): Record<(typeof properties)[number], string> =>
  localStorage.getMultipleItems(
    properties.reduce<Record<string, string>>((acc, key) => {
      acc[key] = ''
      return acc
    }, {}),
  ) as Record<(typeof properties)[number], string>

export const setTheme = (theme: (typeof themes)[number] | ''): boolean =>
  theme ? localStorage.setItem('theme', theme as string) : localStorage.deleteItem('theme')

export const setCustomTheme = (
  customTheme: Record<(typeof properties)[number], string>,
): Record<string, boolean> => localStorage.setMultipleItems(customTheme)

export const applyTheme = (theme: (typeof themes)[number] | ''): boolean => {
  try {
    if (!theme) window.document.documentElement.removeAttribute('data-theme')
    else window.document.documentElement.setAttribute('data-theme', theme as string)

    if (theme === 'custom')
      Object.entries(getCustomTheme()).forEach(([key, value]) =>
        window.document.documentElement.style.setProperty(key, value || ''),
      )
    else properties.forEach((prop) => window.document.documentElement.style.removeProperty(prop))
  } catch (_) {
    return false
  }

  return true
}

export default {
  themes,
  properties,
  getTheme,
  getCustomTheme,
  setTheme,
  applyTheme,
}
