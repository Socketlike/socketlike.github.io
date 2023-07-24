import ReactDOM from 'react-dom/client'
import { render } from '@pages'
import './index.less'

window.addEventListener('DOMContentLoaded', (): void => {
  if (!window.localStorage.getItem('theme')) window.localStorage.setItem('theme', 'dark')
  document.getElementById('html').classList.add(window.localStorage.getItem('theme'))

  const root = ReactDOM.createRoot(document.getElementById('root'))

  root.render(render())
})
