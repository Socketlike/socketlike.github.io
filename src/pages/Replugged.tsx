import React from 'react'

import { Anchor } from '@components'

export const Replugged: Page = {
  match: (pathname) => pathname[0] === 'replugged' && !pathname[1],
  Page: (): React.ReactElement => (
    <div className='content'>
      Welcome to my domain of <a href='https://replugged.dev'>Replugged</a> shenanigans!
      <br />
      <br />
      There is nothing much here except for JSON schemas at the moment.
      <br />
      You can use them by appending <code>$schema</code> as a key to your <code>manifest.json</code>{' '}
      with one of these as the value:
      <ul>
        <li>
          <Anchor real href='/replugged/addon.schema.json'>
            {location.origin}/replugged/addon.schema.json
          </Anchor>{' '}
          (generic addon, plugins + theme keys)
        </li>
        <li>
          <Anchor real href='/replugged/plugin.schema.json'>
            {location.origin}/replugged/plugin.schema.json
          </Anchor>{' '}
          (plugin)
        </li>
        <li>
          <Anchor real href='/replugged/theme.schema.json'>
            {location.origin}/replugged/theme.schema.json
          </Anchor>{' '}
          (theme)
        </li>
      </ul>
    </div>
  ),
}
