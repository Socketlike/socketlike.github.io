import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

export default (props: { body: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<'dark' | 'light'>(
    window.localStorage.getItem('theme') as 'dark' | 'light',
  )

  return (
    <div className='main'>
      <SiteHeader
        invertTheme={() => {
          const newTheme = { dark: 'light', light: 'dark' }[theme] as 'dark' | 'light'
          ;(document.getElementById('html') as HTMLHtmlElement).classList.replace(theme, newTheme)
          window.localStorage.setItem('theme', newTheme)
          setTheme(newTheme)
        }}
        theme={theme}
      />
      <div className='site-body'>{props.body}</div>
      <SiteFooter />
    </div>
  )
}
