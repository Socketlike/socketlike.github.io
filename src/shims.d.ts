declare module '*.md' {
  const attributes: Record<string, unknown>

  import { Component, ComponentOptions } from 'vue'

  const VueComponent: ComponentOptions
  const VueComponentWith: (components: Record<string, Component>) => ComponentOptions

  export { attributes, VueComponent, VueComponentWith }
}
