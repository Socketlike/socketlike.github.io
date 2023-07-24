import React from 'react'

export const Body = (): JSX.Element => (
  <div className='replugged-body'>
    <span>
      Welcome to my domain of Replugged shenanigans!
      <br />
      <br />
      There is nothing much here except for a{' '}
      <a href='./addon.schema.json' className='block'>
        JSON schema
      </a>{' '}
      at the moment.
    </span>
  </div>
)
