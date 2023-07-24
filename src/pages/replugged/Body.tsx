import React from 'react'
import { Codeblock } from '@components'

export const Body = (): JSX.Element => (
  <div className='replugged-body'>
    <span>
      Welcome to my domain of Replugged shenanigans!
      <br />
      <br />
      There is nothing much here except for JSON schemas at the moment.
      <br />
      <br />
      You can use them by appending <code className='code'>$schema</code> as a key to your{' '}
      <code>manifest.json</code> with one of these as the value:
      <br />
      <ul className='schema-list'>
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
      Example:
      <br />
      <Codeblock hljs={true} lang='language-json' preStyle={{ marginTop: '8px' }}>
        {`{
  "$schema": "https://socketlike.github.io/replugged/plugin.schema.json",
  "name": "test plugin",
  "id": "com.randomdomain.plugin",
  ...
}`}
      </Codeblock>
    </span>
  </div>
)
