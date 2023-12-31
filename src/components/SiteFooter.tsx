import React from 'react'

import { Block } from './Block'

export const SiteFooter = (): React.ReactElement => (
  <div className='footer'>
    <Block className='text' label='footer'>
      <div className='content'>
        made with <span style={{ color: 'var(--red)' }}>love</span> by evelyn (evie)
      </div>
    </Block>
    <Block className='links' label='links'>
      <div className='content'>
        <a href='https://github.com/Socketlike/socketlike.github.io'>github</a>
      </div>
    </Block>
  </div>
)
