import React from 'react'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

export const SiteMain = (props: { children: JSX.Element }): JSX.Element => {
  const [theme, setTheme] = React.useState<'dark' | 'light'>(
    window.localStorage.getItem('theme') as 'dark' | 'light',
  )

  return (
    <div className='main'>
      <SiteHeader
        invertTheme={(): void => {
          const newTheme = { dark: 'light', light: 'dark' }[theme] as 'dark' | 'light'
          ;(document.getElementById('html') as HTMLHtmlElement).classList.replace(theme, newTheme)
          window.localStorage.setItem('theme', newTheme)
          setTheme(newTheme)
          window.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }))
        }}
        theme={theme}
      />
      <div className='site-body'>{props.children}</div>
      <SiteFooter />
    </div>
  )
}
