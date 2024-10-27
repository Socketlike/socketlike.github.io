import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    hidden?: boolean
  }
}

export {}
