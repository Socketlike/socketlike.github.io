import * as localStorage from './localStorage'

const themeProperties: Array<keyof Theme> = [
  '--background',
  '--foreground',
  '--foreground-focused',
  '--foreground-unfocused',
  '--red',
  '--green',
  '--yellow',
  '--gray',
  '--lightblue',
]

export const getCustomColors = (): Theme =>
  themeProperties.reduce<Theme>((acc, prop) => {
    acc[prop] = localStorage.get(prop)

    return acc
  }, {} as Theme)

export const apply = (theme: string): void => {
  document.documentElement.setAttribute('data-theme', theme)

  if (theme === 'custom')
    Object.entries(getCustomColors()).forEach(([prop, value]) =>
      document.documentElement.style.setProperty(prop, value),
    )
  else themeProperties.forEach((prop) => document.documentElement.style.removeProperty(prop))
}

export const setCustomColors = (colors: Theme): void => {
  Object.entries(colors).forEach(([prop, value]) => localStorage.set(prop, value))

  if (document.documentElement.getAttribute('data-theme') === 'custom') apply('custom')
}

export const set = (theme: string): void => {
  localStorage.set('theme', theme)

  apply(theme)
}
