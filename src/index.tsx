import React from 'react'
import ReactDOM from 'react-dom/client'

import * as MUIBase from '@mui/base'

import * as components from '@components'
import * as pages from '@pages'
import * as util from '@util'

import './index.less'

interface CustomWindow extends Window {
  MUIBase: typeof MUIBase
  React: typeof React
  ReactDOM: typeof ReactDOM
  components: typeof components
  pages: typeof pages
  reactRoot: ReactDOM.Root
  util: typeof util
}

declare const window: CustomWindow

window.MUIBase = MUIBase
window.React = React
window.ReactDOM = ReactDOM
window.components = components
window.pages = pages
window.util = util

document.addEventListener('DOMContentLoaded', () => {
  const theme = window.localStorage.getItem('theme')

  if (!theme) window.localStorage.setItem('theme', 'default')

  document.documentElement.setAttribute('data-theme', theme || 'default')

  const root = ReactDOM.createRoot(document.getElementById('root')!)

  window.reactRoot = root

  root.render(<pages.Page />)
})
