import React from 'react'

import { BaseSite } from '@components'
import * as util from '@util'

export const Config: Page = {
  match: (pathname) => pathname[0] === 'config',
  Page: (): React.ReactElement => {
    const [theme, setTheme] = React.useState(util.localStorage.get('theme', 'default')!)
    const [customColors, setCustomColors] = React.useState(util.theme.getCustomColors())
    const localStorageAvailable = React.useMemo(() => util.localStorage.available(), [])

    return (
      <BaseSite>
        <div className='content'>
          <div className='text-bold text-large'>pages configuration</div>
          <br />
          {!localStorageAvailable && (
            <>
              <div>
                <span className='text-yellow text-bold'>warning:</span> <code>localStorage</code> is{' '}
                <span className='text-red text-bold'>off</span>. changes made here will{' '}
                <span className='text-red text-bold'>not be saved</span>.
              </div>
              <br />
            </>
          )}
          <span className='text-bold'>color scheme: </span>
          <select
            value={theme}
            onChange={(event) => {
              util.theme.set(event.currentTarget.value)

              setTheme(event.currentTarget.value)
            }}>
            {[
              ['default', 'default'],
              ['default (light)', 'default-light'],
              ['tokyo night', 'tokyo-night'],
              ['tokyo night (light)', 'tokyo-night-light'],
              ['gruvbox', 'gruvbox'],
              ['gruvbox (light)', 'gruvbox-light'],
              ['custom', 'custom'],
            ].map(([name, key]) => (
              <option value={key} key={key}>
                {name}
              </option>
            ))}
          </select>
          <br />
          <br />
          {theme === 'custom' && (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()

                const data = new FormData(event.currentTarget)

                const theme = {} as Theme

                for (const [key, value] of data) theme[key as keyof Theme] = value as string | null

                util.theme.setCustomColors(theme)

                setCustomColors(theme)
              }}>
              <span className='text-bold'>custom colors (css syntax):</span>
              <ul>
                {[
                  ['background', '--background'],
                  ['foreground', '--foreground'],
                  ['foreground (focused)', '--foreground-focused'],
                  ['foreground (unfocused)', '--foreground-unfocused'],
                  ['red', '--red'],
                  ['green', '--green'],
                  ['yellow', '--yellow'],
                  ['gray', '--gray'],
                  ['light blue', '--lightblue'],
                ].map(([name, key]) => (
                  <li className='margin-tb-6px' key={key}>
                    <span>{name}: </span>
                    <input
                      type='text'
                      name={key}
                      defaultValue={customColors[key as keyof Theme] || ''}
                    />
                  </li>
                ))}
              </ul>
              <input type='submit' value='save colors' />
            </form>
          )}
        </div>
      </BaseSite>
    )
  },
}
