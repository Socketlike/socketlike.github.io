import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './components/Main'
import './index.less'

window.addEventListener('DOMContentLoaded', () => {
  if (!window.localStorage.getItem('theme')) window.localStorage.setItem('theme', 'dark')
  document.getElementById('html').classList.add(window.localStorage.getItem('theme'))

  const root = ReactDOM.createRoot(document.getElementById('root'))

  root.render(<Main />)
})
