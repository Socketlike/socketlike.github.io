import React from 'react'

import { BaseSite } from '@components'

export const Config = (): React.ReactElement => {
  const [theme, setTheme] = React.useState(window.localStorage.getItem('theme') || 'default')

  return (
    <BaseSite>
      <div className='content'>
        <div style={{ fontWeight: 'bold' }}>pages configuration</div>
        <br />
        <span>color scheme (click to select)</span>
        <ul>
          {[
            { value: 'default', name: 'default' },
            { value: 'default-light', name: 'default (light)' },
            { value: 'tokyo-night', name: 'tokyo night' },
            { value: 'tokyo-night-light', name: 'tokyo night (light)' },
            { value: 'gruvbox', name: 'gruvbox' },
            { value: 'gruvbox-light', name: 'gruvbox (light)' },
          ].map(({ value, name }) => (
            <li key={value}>
              {theme === value ? (
                <span style={{ fontWeight: 'bold' }}>{name}</span>
              ) : (
                <a
                  onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()

                    window.localStorage.setItem('theme', value)
                    document.documentElement.setAttribute('data-theme', value)

                    setTheme(value)
                  }}>
                  {name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </BaseSite>
  )
}
