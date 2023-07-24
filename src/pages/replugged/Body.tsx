import React from 'react'
import { TooltippedText } from '@components'

export const Body = (): JSX.Element => (
  <div className='replugged-body'>
    <span>
      Welcome to my domain of Replugged shenanigans!
      <br />
      There is nothing much here except for a{' '}
      <TooltippedText tooltip='It is at /addon.schema.json'>JSON schema</TooltippedText> at the
      moment.
    </span>
  </div>
)
