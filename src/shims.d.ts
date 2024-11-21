declare class CustomWindow extends Window {
  public __internals__: {
    App: import('vue').Component
    app: import('vue').App<Element>

    router: import('@/router')
    util: import('@/util')
    stores: import('@/stores')

    vue: import('vue')
    shellQuote: import('shell-quote')
  }
}
