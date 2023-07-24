import React from 'react'
import type hljsType from 'highlight.js'

declare global {
  interface Window {
    hljs: typeof hljsType
  }
}

const createThemeElement = (themeElement?: HTMLLinkElement): HTMLLinkElement => {
  const element = themeElement || document.createElement('link')

  element.rel = 'stylesheet'
  element.href = `//cdn.jsdelivr.net/npm/@catppuccin/highlightjs@0.1.2/css/catppuccin-${
    window.localStorage.getItem('theme') === 'light' ? 'latte' : 'mocha'
  }.css`

  return element
}

export const Codeblock = (props: {
  children: React.ReactNode
  preStyle?: React.CSSProperties
  codeStyle?: React.CSSProperties
  lang?: string
  hljs?: boolean
}): JSX.Element => {
  const ref = React.useRef<HTMLElement>(null)
  const hljsTheme = React.useRef<HTMLLinkElement>(createThemeElement())

  React.useEffect((): void => {
    if (props.hljs) window.hljs?.highlightElement?.(ref.current)
  })

  React.useEffect((): void => {
    if (props.hljs) {
      if (!document.head.contains(hljsTheme.current)) document.head.appendChild(hljsTheme.current)

      window.addEventListener('themeChange', (): void => {
        hljsTheme.current.remove()
        createThemeElement(hljsTheme.current)
        document.head.appendChild(hljsTheme.current)
      })
    }
  }, [])

  return (
    <pre className='code' style={props.preStyle}>
      <code ref={ref} className={props.lang} style={props.codeStyle}>
        {props.children}
      </code>
    </pre>
  )
}
