import React from 'react'

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
          <a href='./addon.schema.json'>https://socketlike.github.io/replugged/addon.schema.json</a>{' '}
          (generic addon, plugins + theme keys)
        </li>
        <li>
          <a href='./plugin.schema.json'>
            https://socketlike.github.io/replugged/plugin.schema.json
          </a>{' '}
          (plugin)
        </li>
        <li>
          <a href='./theme.schema.json'>https://socketlike.github.io/replugged/theme.schema.json</a>{' '}
          (theme)
        </li>
      </ul>
    </div>
  ),
}
