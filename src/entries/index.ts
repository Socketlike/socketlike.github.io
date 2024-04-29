import { type Component, type ComponentOptions } from 'vue'

interface Markdown {
  attributes: {
    date: number
    [x: string]: unknown
  }
  VueComponent: ComponentOptions
  VueComponentWith: (components: Record<string, Component>) => ComponentOptions
}

const raw = Object.entries(import.meta.glob('./**/*.md', { eager: true })).map(
  ([key, mod]): [string, Markdown] => [key.replace(/\.\/(.*)\.md$/, '$1'), mod as Markdown],
)

export const entries = raw.reduce<Record<string, Markdown>>((acc, [key, mod]) => {
  acc[key] = mod

  return acc
}, {})

export const entriesCategorized = raw.reduce<Record<string, Record<string, Markdown>>>(
  (acc, [key, mod]) => {
    const category =
      typeof mod.attributes.date === 'number'
        ? new Date(mod.attributes.date).getFullYear()
        : 'uncategorized'

    if (!(category in acc)) acc[category] = {}

    acc[category][key] = mod

    return acc
  },
  {},
)
