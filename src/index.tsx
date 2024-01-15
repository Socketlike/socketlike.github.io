import React from 'react'
import ReactDOM from 'react-dom/client'

import * as components from '@components'
import * as pages from '@pages'
import * as util from '@util'

import './styles/index.less'

export interface CustomWindow extends Window {
  React: typeof React
  ReactDOM: typeof ReactDOM
  components: typeof components
  pages: typeof pages
  util: typeof util
}

declare const window: CustomWindow

window.React = React
window.ReactDOM = ReactDOM
window.components = components
window.pages = pages
window.util = util

document.addEventListener('DOMContentLoaded', () => {
  if (!util.localStorage.available())
    console.error('localStorage access is disabled, options will not be saved')

  util.theme.apply(util.localStorage.get('theme', 'default')!)

  ReactDOM.createRoot(document.getElementById('root')!).render(<pages.PageWrapper />)
})
